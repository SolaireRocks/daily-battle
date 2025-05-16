//=============================================================================
// DisableAllyActorSelectionWindow.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Disables the ally actor selection window (Window_BattleActor) in battle.
 * @author YourName (based on AI analysis and user feedback)
 * @version 1.1.0
 * @help
 * DisableAllyActorSelectionWindow.js
 * Version 1.1.0
 *
 * This plugin modifies the battle scene to prevent the actor selection
 * window (Window_BattleActor) from appearing when a skill or item is used
 * that would normally require selecting a single ally or a single dead ally.
 *
 * This plugin is intended for users who plan to implement their own custom
 * targeting logic for such skills using JavaScript (e.g., in the skill's
 * damage formula, or via other plugins that allow custom effect/targeting
 * sequences).
 *
 * How it works:
 * The plugin overrides the `Scene_Battle.prototype.startActorSelection` method.
 * This method is normally responsible for showing and activating the
 * `Window_BattleActor`. The override prevents the window from appearing
 * and instead immediately calls `this.selectNextCommand()`. This advances
 * the battle turn input phase as if the targeting step for the current
 * action was completed.
 *
 * The actual skill's JavaScript (e.g., in its damage formula or effect
 * notetags) will then be responsible for determining and applying effects
 * to the intended target(s) when the skill is executed during the action phase.
 * The `_targetIndex` on the `Game_Action` object for the skill may not be
 * set as it normally would by the window, so your custom JS should not
 * rely on it being pre-filled by the window selection.
 *
 * Scopes Affected:
 * This plugin primarily affects skills/items with scopes that trigger
 * `Window_BattleActor`, such as:
 * - "One Ally"
 * - "One Ally (Dead)"
 *
 * It does NOT directly affect:
 * - "User" (no selection window needed)
 * - "All Allies" / "All Allies (Dead)" (engine handles these without this specific window)
 * - Enemy-targeting scopes
 *
 * Compatibility:
 * This plugin might conflict with other plugins that heavily modify
 * `Scene_Battle.prototype.startActorSelection` or the general battle
 * command input flow.
 *
 * No plugin commands or parameters are provided.
 */

(() => {
    'use strict';

    // Alias the original method. While not strictly called in this override's
    // main path, it's good practice for potential future conditional logic or debugging.
    const _Scene_Battle_startActorSelection_alias = Scene_Battle.prototype.startActorSelection;

    Scene_Battle.prototype.startActorSelection = function() {
        // --- Original behavior that we are bypassing: ---
        // this._actorWindow.refresh();
        // this._actorWindow.show();
        // this._actorWindow.activate();
        // --- End of original behavior ---

        // --- New behavior: ---
        // Instead of showing the actor selection window, we immediately proceed
        // to the next step in the command input sequence.
        // The BattleManager.inputtingAction() (the current skill/item) will
        // proceed without a target selected via the UI.
        // Your custom JS in the skill's formula or effects will handle targeting.

        this.selectNextCommand();
    };

})();