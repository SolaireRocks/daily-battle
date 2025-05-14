/*:
 * @target MZ
 * @plugindesc Removes Actor Status Window and goes directly to Skill Menu in Battle.
 * @author YourName
 * @version 1.1.2
 * @help
 * This plugin does two things:
 * 1. Hides and effectively removes the actor status window
 *    (the one that displays actor faces, HP, MP, TP) from the battle scene.
 * 2. When an actor's turn begins and they can input commands,
 *    it bypasses the standard actor command window (Attack, Skill, Guard, Item)
 *    and directly opens their skill selection menu.
 *
 * If an actor has multiple skill types, it will open the skill list for the
 * first skill type defined for that actor.
 *
 * If an actor cancels from this directly-opened skill menu (e.g., if the
 * skill list is empty or they change their mind), they will perform Guard.
 *
 * Simply install and enable this plugin. No configuration needed.
 *
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_2_BattleSystemCTB
 * @orderAfter VisuMZ_0_CoreEngine
 */

(() => {
    'use strict';

    // --- Window_BattleStatus ---
    // (This part is from the previous version to remove the status window)
    const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function(rect) {
        _Window_BattleStatus_initialize.call(this, rect);
        this.openness = 0;
        this.visible = false;
        this.width = 0;
        this.height = 0;
        this.active = false;
        if (this.contents) this.contents.clear();
        if (this.contentsBack) this.contentsBack.clear();
    };

    Window_BattleStatus.prototype.open = function() {
        this.openness = 0;
        this.visible = false;
    };

    Window_BattleStatus.prototype.show = function() {
        this.visible = false;
    };

    Window_BattleStatus.prototype.refresh = function() {
        if (this.contents) this.contents.clear();
        if (this.contentsBack) this.contentsBack.clear();
    };

    Window_BattleStatus.prototype.drawItem = function(/*index*/) {
        // Do nothing
    };
    
    const _Window_BattleStatus_selectActor = Window_BattleStatus.prototype.selectActor;
    Window_BattleStatus.prototype.selectActor = function(actor) {
       _Window_BattleStatus_selectActor.call(this,actor); // Allow internal selection logic
       this.visible = false; // ensure it stays hidden
       this.openness = 0;
    };

    const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
    Window_BattleStatus.prototype.update = function() {
        _Window_BattleStatus_update.call(this);
        this.visible = false;
        this.openness = 0;
        this.width = 0;
        this.height = 0;
        this.active = false;
    };

    // --- Direct to Skill Menu Logic ---

    // --- BattleManager ---
    const _BattleManager_initMembers_addFlag = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers_addFlag.call(this);
        this._wentDirectlyToSkills = false;
    };

    // --- Scene_Battle ---
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        const actor = BattleManager.actor();

        if (actor && actor.canInput() && this._skillWindow && this._actorCommandWindow && this._partyCommandWindow) {
            // Check if conditions are met for direct-to-skill
            // For instance, actor is inputting and not under some special VisuStella state
            // that would require the normal command window. This might need refinement
            // based on specific VisuStella states if this is too broad.

            // Set flag to indicate we're attempting direct-to-skill
            BattleManager._wentDirectlyToSkills = true;
            // console.log(`Attempting direct skill for ${actor.name()}`);

            this._partyCommandWindow.close();
            this._actorCommandWindow.close(); // Ensure actor command is closed
            this._actorCommandWindow.deactivate();
            
            // The status window is visually removed by this plugin, but selecting an actor on it
            // might be important for other logic or plugins. This call is from the original.
            // VisuStella might handle this differently, but it's generally safe.
            if (this._statusWindow) {
                this._statusWindow.selectActor(actor);
            }

            // Setup and show the skill window directly
            this._skillWindow.setActor(actor);
            let stypeId = 0; 
            const skillTypes = actor.skillTypes();
            if (skillTypes && skillTypes.length > 0) {
                stypeId = skillTypes[0]; // Use the first skill type listed for the actor
            }
            this._skillWindow.setStypeId(stypeId);
            this._skillWindow.refresh();
            this._skillWindow.show();
            this._skillWindow.activate();
            return; // IMPORTANT: Bypass the original startActorCommandSelection which would open _actorCommandWindow
        } else {
            // Conditions not met, or actor cannot input. Fallback to original.
            BattleManager._wentDirectlyToSkills = false;
            // console.log(`Falling back to original startActorCommandSelection for ${actor ? actor.name() : 'N/A'}`);
            _Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    const _Scene_Battle_onSkillCancel_directToSkills = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
        if (BattleManager._wentDirectlyToSkills) {
            this._skillWindow.hide();
            BattleManager.inputtingAction().setGuard();
            BattleManager._wentDirectlyToSkills = false; // Reset flag
            this.selectNextCommand(); 
        } else {
            _Scene_Battle_onSkillCancel_directToSkills.call(this);
        }
    };

    const _Scene_Battle_onSkillOk_directToSkills = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        BattleManager._wentDirectlyToSkills = false; // Reset flag regardless
        _Scene_Battle_onSkillOk_directToSkills.call(this);
    };

    // --- Window_ActorCommand ---
    // Make its open/setup methods conditional.
    // If we're going direct-to-skills, this window should not interfere.

    const _Window_ActorCommand_open_directToSkills = Window_ActorCommand.prototype.open;
    Window_ActorCommand.prototype.open = function() {
        if (BattleManager._wentDirectlyToSkills && BattleManager.isInputting() && BattleManager.actor() === this._actor) {
            // If direct-to-skill is active for the current inputting actor,
            // and this window instance is for that actor, don't open.
            this.close(); // Ensure it's kept closed
            this.active = false;
            return;
        }
        _Window_ActorCommand_open_directToSkills.call(this);
    };

    const _Window_ActorCommand_setup_directToSkills = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        // Call original setup first to populate lists etc.
        _Window_ActorCommand_setup_directToSkills.call(this, actor);
        
        // Then, if we are in direct-to-skill mode for this actor, ensure this window is non-interactive.
        if (BattleManager._wentDirectlyToSkills && BattleManager.isInputting() && BattleManager.actor() === actor) {
            this.close();
            this.active = false;
        }
    };

})();