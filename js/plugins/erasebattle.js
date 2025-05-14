/*:
 * @target MZ
 * @plugindesc Removes the Actor Status Window in Battle
 * @author YourName
 * @version 1.0.0
 * @help
 * This plugin hides and effectively removes the actor status window
 * (the one that displays actor faces, HP, MP, TP) from the battle scene.
 *
 * Simply install and enable this plugin. No configuration needed.
 */

(() => {
    'use strict';

    // --- Window_BattleStatus ---
    // This is the window responsible for displaying party member statuses in battle.

    // We will override its initialize method to make it invisible and take no space.
    // We also override methods that might make it visible or draw its contents.

    const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function(rect) {
        _Window_BattleStatus_initialize.call(this, rect);
        this.openness = 0;      // Start fully closed/invisible
        this.visible = false;   // Explicitly set to not visible
        this.width = 0;         // Make it take no actual screen space
        this.height = 0;        // Make it take no actual screen space
        this.active = false;    // Ensure it doesn't become active
        
        // Clear any contents that might have been drawn by the original initialize or its chain
        if (this.contents) {
            this.contents.clear();
        }
        if (this.contentsBack) {
            this.contentsBack.clear();
        }
    };

    // Prevent the window from opening (becoming visible via openness)
    Window_BattleStatus.prototype.open = function() {
        this.openness = 0; // Ensure it stays closed
        this.visible = false;
        // Do not call the original Window.prototype.open or Window_StatusBase.prototype.open
    };

    // Prevent the window from being shown (made visible directly)
    Window_BattleStatus.prototype.show = function() {
        this.visible = false; // Ensure it stays hidden
        // Do not call the original Window.prototype.show or Window_StatusBase.prototype.show
    };

    // Prevent the window from refreshing its contents (drawing faces, gauges, etc.)
    Window_BattleStatus.prototype.refresh = function() {
        // Do nothing. This stops any drawing.
        // If contents were created, they would be on a 0x0 window.
        // Clear them just in case, though initialize should handle this too.
        if (this.contents) {
            this.contents.clear();
        }
        if (this.contentsBack) {
            this.contentsBack.clear();
        }
        // Also prevent parent's refresh from doing anything complex if needed
        // Window_StatusBase.prototype.refresh calls Window_Selectable.prototype.refresh.
        // Window_Selectable.prototype.refresh calls paint, which calls drawAllItems.
        // By doing nothing here, we stop that chain.
    };

    // Prevent drawing individual items (redundant if refresh is empty and window is 0x0, but safe)
    Window_BattleStatus.prototype.drawItem = function(/*index*/) {
        // Do nothing
    };
    
    // Prevent it from trying to select an actor, which might have side effects
    // (though unlikely to cause issues if window is 0x0 and inactive)
    const _Window_BattleStatus_selectActor = Window_BattleStatus.prototype.selectActor;
    Window_BattleStatus.prototype.selectActor = function(actor) {
        if (this.width === 0 && this.height === 0) {
            // If our window is "removed", don't try to select.
            // The game might still try to select the first actor for targeting.
            // This might need adjustment if it breaks actor selection for skills/items.
            // For now, let's allow the base selection logic but ensure the window itself doesn't show.
             _Window_BattleStatus_selectActor.call(this,actor);
             this.visible = false; // ensure it stays hidden even if selected
             this.openness = 0;
            return;
        }
       _Window_BattleStatus_selectActor.call(this,actor);
    };

    // The update method might try to make it visible.
    // Overriding it to ensure it stays hidden and takes no space.
    // This also prevents preparePartyRefresh from causing visible refreshes.
    const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
    Window_BattleStatus.prototype.update = function() {
        _Window_BattleStatus_update.call(this); // Allow parent updates for basic window management
        this.visible = false;   // Re-assert invisibility
        this.openness = 0;      // Re-assert closed state
        this.width = 0;         // Re-assert zero size
        this.height = 0;        // Re-assert zero size
        this.active = false;    // Re-assert inactivity

        // If $gameTemp.isBattleRefreshRequested() is true, preparePartyRefresh is called
        // which eventually calls our overridden refresh(), which does nothing. This is fine.
    };

})();