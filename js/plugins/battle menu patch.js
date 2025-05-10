/*:
 * @plugindesc Customizes battle menu: no MP/TP, fixed actor list, repositioned actor commands.
 * @author YourName (Replace with your name/handle)
 * @target MZ
 * @version 1.3.2
 *
 * @help
 * CustomBattleMenuLayout.js
 * Version 1.3.2
 *
 * This plugin modifies the default RPG Maker MZ battle menu interface:
 *
 * 1.  Removes MP and TP display from Window_BattleStatus:
 *     - Only HP gauge and value are shown alongside the actor's name and face.
 *     - MP and TP bars/values are no longer drawn.
 *
 * 2.  Actor Status List (Window_BattleStatus):
 *     - Item height is adjusted to properly display face graphics.
 *     - Always left-justified (x = 0).
 *     - Width is fixed when actor commands are active (doesn't expand to full screen).
 *
 * 3.  Actor Command Window (Window_ActorCommand):
 *     - Right-justified.
 *     - Occupies space between status window's right edge and screen's right edge.
 *     - Height matches the status window height.
 *
 * This version includes console logging in Window_BattleStatus.drawItem
 * and a post-load check to diagnose why content might not be appearing.
 * Open the console (F8/F12) during playtest to see these logs.
 *
 * Changelog:
 * - v1.3.2:
 *   - Added a post-load console.log check to verify if Window_BattleStatus.prototype.drawItem
 *     is indeed our modified version after all plugins have loaded. This helps identify
 *     if another plugin is overwriting our changes.
 * - v1.3.1:
 *   - Added extensive console.log statements in Window_BattleStatus.drawItem for debugging.
 *   - Added a test fillRect to check if the contents bitmap is drawable.
 *   - Added a Math.max(0, ...) for textWidth to prevent negative widths.
 * - v1.3.0:
 *   - Overhauled Window_BattleStatus.drawItem for explicit control over content.
 *   - Set Window_BattleStatus.itemHeight based on Window_Base.FACE_HEIGHT.
 */

(() => {
    'use strict';

    console.log("CustomBattleMenuLayout v1.3.2 loading...");

    // --- Window_BattleStatus Modifications ---

    // 1. Define the itemHeight to accommodate face graphics properly.
    Window_BattleStatus.prototype.itemHeight = function() {
        return Window_Base.FACE_HEIGHT + this.itemPadding() * 2;
    };

    // 2. Override drawItem to completely control what's drawn for each actor.
    Window_BattleStatus.prototype.drawItem = function(index) {
        console.log(`[CustomBattleMenu] drawItem called for index: ${index}`);
        const actor = this.actor(index);

        if (!actor) {
            console.error(`[CustomBattleMenu] Actor not found for index: ${index}`);
            return;
        }
        console.log(`[CustomBattleMenu] Actor: ${actor.name()}`);

        const rect = this.itemRectWithPadding(index);
        console.log(`[CustomBattleMenu] Item Rect for ${actor.name()}: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`);

        if (rect.width <= 0 || rect.height <= 0) {
            console.error(`[CustomBattleMenu] Rect for ${actor.name()} has zero or negative dimensions. Aborting drawItem.`);
            return;
        }

        // --- Draw Face ---
        this.drawActorFace(actor, rect.x, rect.y, Window_Base.FACE_WIDTH, Window_Base.FACE_HEIGHT);
        console.log(`[CustomBattleMenu] Attempted to draw face for ${actor.name()} at x:${rect.x}, y:${rect.y}`);

        // --- Define area for Name and HP Gauge (to the right of the face) ---
        const faceAreaWidth = Window_Base.FACE_WIDTH + this.itemPadding();
        const textX = rect.x + faceAreaWidth;
        const textY = rect.y;

        let textWidth = rect.width - faceAreaWidth;
        textWidth = Math.max(0, textWidth); // Prevent negative width

        console.log(`[CustomBattleMenu] Text Area for ${actor.name()}: textX=${textX}, textY=${textY}, textWidth=${textWidth}`);

        if (textWidth > 0) {
            // --- Draw Name ---
            this.resetTextColor();
            this.drawActorName(actor, textX, textY, textWidth);
            console.log(`[CustomBattleMenu] Attempted to draw name for ${actor.name()}`);

            // --- Draw HP Gauge ---
            const gaugeY = textY + this.lineHeight() + 4;
            const gaugeWidth = textWidth;

            this.drawActorHp(actor, textX, gaugeY, gaugeWidth);
            console.log(`[CustomBattleMenu] Attempted to draw HP for ${actor.name()} at y:${gaugeY}`);
        } else {
            console.warn(`[CustomBattleMenu] textWidth for ${actor.name()} is zero or less. Skipping name and HP drawing.`);
        }
        console.log(`[CustomBattleMenu] drawItem finished for ${actor.name()}`);
    };


    // --- Scene_Battle Modifications ---

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

    const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const commonY = this.helpWindowRect().y + this.helpWindowRect().height;
        const statusWindowHeight = this.windowAreaHeight();

        const statusWindowX = 0;
        const partyCmdDefaultRect = this.partyCommandWindowRect();
        const statusWindowWidth = Graphics.boxWidth - partyCmdDefaultRect.width;

        const acX = statusWindowX + statusWindowWidth;
        const acY = commonY;
        const acWidth = Graphics.boxWidth - acX;
        const acHeight = statusWindowHeight;

        return new Rectangle(acX, acY, acWidth, acHeight);
    };

    const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
    Scene_Battle.prototype.updateStatusWindowPosition = function() {
        _Scene_Battle_updateStatusWindowPosition.call(this);
        if (this._statusWindow) {
            this._statusWindow.x = 0;
        }
    };
    console.log("CustomBattleMenuLayout v1.3.2 loaded successfully (end of IIFE).");

})(); // End of the plugin's IIFE

// --- Post-Load Diagnostic Check ---
// This runs AFTER the above IIFE has completed.
// We check if our Window_BattleStatus.prototype.drawItem modification is still in place.
// This helps detect if another plugin loaded LATER overwrites our changes.
if (typeof Window_BattleStatus !== 'undefined' && Window_BattleStatus.prototype.drawItem) {
    const isOurDrawItem = Window_BattleStatus.prototype.drawItem.toString().includes("console.log(`[CustomBattleMenu] drawItem called for index: ${index}`);");
    console.log(
        `[CustomBattleMenu Post-Load Check] Is Window_BattleStatus.prototype.drawItem our modified version? ${isOurDrawItem ? 'YES' : 'NO'}`
    );
    if (!isOurDrawItem) {
        console.error(
            "[CustomBattleMenu Post-Load Check] Our drawItem modification on Window_BattleStatus.prototype seems to have been overwritten by another plugin or didn't stick. The current function is:"
        );
        console.log(Window_BattleStatus.prototype.drawItem.toString());
    }
} else {
    console.error("[CustomBattleMenu Post-Load Check] Window_BattleStatus or its drawItem method is undefined. This is highly unusual.");
}