/*:
 * @plugindesc Customizes battle menu: no MP/TP, fixed actor list, repositioned actor commands.
 * @author YourName (Replace with your name/handle)
 * @target MZ
 * @version 1.2.2
 *
 * @help
 * CustomBattleMenuLayout.js
 * Version 1.2.2
 *
 * This plugin modifies the default RPG Maker MZ battle menu interface:
 *
 * 1.  Removes MP and TP display from Window_BattleStatus:
 *     - MP and TP bars/values are no longer shown.
 *     - Only HP gauge is displayed.
 *     - Status items are laid out with Name on one line, HP gauge on the next,
 *       with a small padding, resulting in a taller item.
 *
 * 2.  Actor Status List (Window_BattleStatus):
 *     - Always left-justified (x = 0).
 *     - Width is fixed when actor commands are active (doesn't expand to full screen).
 *     - Height is adjusted to fit the new taller status items.
 *
 * 3.  Actor Command Window (Window_ActorCommand):
 *     - Right-justified.
 *     - Occupies space between status window's right edge and screen's right edge.
 *     - Height matches the (newly adjusted) status window height.
 *
 * No plugin parameters. Install and enable.
 * Replace "YourName" in the header.
 *
 * Compatibility:
 * - Modifies core battle scene/window methods.
 * - Potential conflicts with other battle UI plugins. Test thoroughly.
 * - Tested for compatibility with VisuStella MZ plugin modifications to padding.
 *
 * Changelog:
 * - v1.2.2:
 *   - Revised getCalculatedStatusWindowHeight to use temporary window instantiation
 *     for fetching padding values. This makes it more robust and compatible with
 *     plugins (like VisuStella MZ) that modify how default padding is determined or stored.
 * - v1.2.1:
 *   - Fixed TypeError in getCalculatedStatusWindowHeight by correctly using
 *     Window_Base.prototype.defaultPadding() and Window_Selectable.prototype.itemPadding()
 *     to retrieve default padding values. (This approach was still susceptible to prototype modifications).
 * - v1.2.0 (Based on your v1.1.0):
 *   - Overhauled gauge drawing: Switched to overriding Window_BattleStatus.drawActorGauges
 *     to definitively remove MP/TP and correctly position HP.
 *   - Corrected height calculations in Scene_Battle.
 * - v1.1.0 (Original by user):
 *   - Initial layout changes.
 */

(() => {
    'use strict';

    // --- Window_BattleStatus Modifications ---

    Window_BattleStatus.prototype.gaugeAreaHeight = function() {
        return this.lineHeight();
    };

    Window_BattleStatus.prototype.drawActorGauges = function(actor, x, y, width) {
        const hpGaugeTextY = y + this.lineHeight() + 4;
        const gaugeDrawX = x + this.gaugeAreaOffsetX();
        const gaugeContentsWidth = width - this.gaugeAreaOffsetX() * 2;
        this.drawActorHp(actor, gaugeDrawX, hpGaugeTextY, gaugeContentsWidth);
    };

    Window_BattleStatus.prototype.itemHeight = function() {
        const nameAreaHeight = this.lineHeight();
        const gaugeAreaHeight = this.gaugeAreaHeight();
        const paddingBelowName = 4;
        const contentHeight = nameAreaHeight + paddingBelowName + gaugeAreaHeight;
        // this.itemPadding() gets the padding for one side (e.g. top) of the item's content area
        return contentHeight + (this.itemPadding() * 2);
    };

    const _Window_BattleStatus_windowWidth = Window_BattleStatus.prototype.windowWidth;
    Window_BattleStatus.prototype.windowWidth = function() {
        const scene = SceneManager._scene;
        if (
            scene instanceof Scene_Battle &&
            scene._actorCommandWindow &&
            (scene._actorCommandWindow.isOpen() || scene._actorCommandWindow.isActive())
        ) {
            if (scene.partyCommandWindowRect) {
                const partyCommandRect = scene.partyCommandWindowRect();
                return Graphics.boxWidth - partyCommandRect.width;
            } else {
                return Math.round(Graphics.boxWidth * 0.65);
            }
        }
        return _Window_BattleStatus_windowWidth.call(this);
    };


    // --- Scene_Battle Modifications ---

    // Helper function to calculate the new required height for Window_BattleStatus
    Scene_Battle.prototype.getCalculatedStatusWindowHeight = function() {
        // lineHeight is generally safe as a direct prototype call.
        const lineHeight = Window_Base.prototype.lineHeight(); // Core RMMZ returns 36

        let actualWindowFramePadding;
        let actualItemInternalPadding;

        try {
            // Create temporary instances to get their effective padding values.
            // This respects modifications to initialize or padding methods by other plugins.
            const tempBase = new Window_Base(new Rectangle(0, 0, 1, 1)); // Rect is minimal but valid
            actualWindowFramePadding = tempBase.padding; // this.padding is a getter for _padding

            const tempSelectable = new Window_Selectable(new Rectangle(0, 0, 1, 1));
            actualItemInternalPadding = tempSelectable.itemPadding(); // Calls the itemPadding method
        } catch (e) {
            // Fallback if instantiation or property access fails (highly unlikely for core functionality)
            console.error("CustomBattleMenuLayout: Critical error getting padding values via temp windows.", e);
            console.warn("CustomBattleMenuLayout: Using hardcoded default RMMZ padding values as a fallback.");
            actualWindowFramePadding = 12; // Core RMMZ default padding
            actualItemInternalPadding = 6;  // Core RMMZ default itemPadding
        }

        // Based on our Window_BattleStatus.prototype.itemHeight structure:
        const nameAreaHeight = lineHeight;
        const gaugeAreaHeight = lineHeight; // As per our Window_BattleStatus.gaugeAreaHeight
        const paddingBelowName = 4;         // Custom padding between name and gauge

        const singleItemContentHeight = nameAreaHeight + paddingBelowName + gaugeAreaHeight;
        // Each item's total height includes its internal top/bottom padding
        const singleItemTotalHeight = singleItemContentHeight + actualItemInternalPadding * 2;
        
        const numActors = $gameParty.maxBattleMembers(); // Typically 4
        const allItemsHeight = numActors * singleItemTotalHeight; // Total height of all items' content areas
        
        // Final window height = sum of all item heights + top/bottom window frame padding
        return allItemsHeight + actualWindowFramePadding * 2;
    };

    const _Scene_Battle_statusWindowRect = Scene_Battle.prototype.statusWindowRect;
    Scene_Battle.prototype.statusWindowRect = function() {
        const rect = _Scene_Battle_statusWindowRect.call(this);
        rect.height = this.getCalculatedStatusWindowHeight();
        return rect;
    };

    const _Scene_Battle_actorCommandWindowRect_alias = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const commonY = this.helpWindowRect().y + this.helpWindowRect().height;
        const newStatusWindowHeight = this.getCalculatedStatusWindowHeight();
        const statusWindowX = 0;
        const partyCmdDefaultRect = this.partyCommandWindowRect();
        const statusWindowWidth = Graphics.boxWidth - partyCmdDefaultRect.width;
        const acX = statusWindowX + statusWindowWidth;
        const acY = commonY;
        const acWidth = Graphics.boxWidth - acX;
        const acHeight = newStatusWindowHeight;
        return new Rectangle(acX, acY, acWidth, acHeight);
    };

    const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
    Scene_Battle.prototype.updateStatusWindowPosition = function() {
        _Scene_Battle_updateStatusWindowPosition.call(this);
        if (this._statusWindow) {
            this._statusWindow.x = 0; 
        }
    };

})();