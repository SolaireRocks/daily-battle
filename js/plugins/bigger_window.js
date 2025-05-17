/*:
 * @plugindesc Makes the actor command window 2x wider with 2 columns (hardcoded).
 * @author AI & You
 * @target MZ
 * @version 1.0.0
 * @help
 * BiggerActorCommandHardcoded.js
 *
 * This plugin modifies the actor command window in battle:
 * - Sets the width to 384 pixels (double the default 192).
 * - Arranges commands in 2 columns.
 * - Adjusts height to fit 2 rows of commands (suitable for the default 4 commands
 *   arranged as 2x2).
 *
 * This version has no plugin parameters; all settings are hardcoded.
 * Includes console logs for debugging. Open your game's developer console
 * (usually F8 or F12 during playtest) to see them.
 */

(() => {
    const PLUGIN_NAME = "BiggerActorCommandHardcoded";
    console.log(`[${PLUGIN_NAME}] Initializing.`);

    // --- Hardcoded Configuration ---
    const NEW_WINDOW_WIDTH = 450; // Original default is 192
    const NUM_COLUMNS = 6;
    // For a 2-column layout displaying the usual 4 commands, we need 2 visual rows.
    const NUM_VISIBLE_ROWS_FOR_HEIGHT = 4;

    if (!Scene_Battle) {
        console.error(`[${PLUGIN_NAME}] Scene_Battle is not defined. Plugin may not work.`);
        return;
    }
    if (!Window_ActorCommand) {
        console.error(`[${PLUGIN_NAME}] Window_ActorCommand is not defined. Plugin may not work.`);
        return;
    }

    // --- Modify the Actor Command Window Rectangle (Size and Position) ---
    const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {


        const ww = NEW_WINDOW_WIDTH;
        // Calculate height based on the number of rows we want to visibly support in the new layout
        const wh = this.calcWindowHeight(NUM_VISIBLE_ROWS_FOR_HEIGHT, true); // true for isCommand

        // Original positioning logic, but using new ww and wh
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        // Ensure status window height is considered correctly if it changes
        const statusWindowRect = this.statusWindowRect();
        const wy = Graphics.boxHeight - statusWindowRect.height - wh;



        if (wy < 0) {
            console.warn(`[${PLUGIN_NAME}] Calculated wy (${wy}) is negative. Window might be too tall for the screen or overlap with status window. Consider adjusting NUM_VISIBLE_ROWS_FOR_HEIGHT or ensuring status window isn't too large.`);
        }


        return new Rectangle(wx, wy, ww, wh);
    };

    // --- Adjust Window_ActorCommand properties ---

    // Override numVisibleRows to reflect the new visual row count for height calculation.
    // This affects how Window_Selectable interprets its content area.
    const _Window_ActorCommand_numVisibleRows = Window_ActorCommand.prototype.numVisibleRows;
    Window_ActorCommand.prototype.numVisibleRows = function() {
        // This should match the number of rows used in calcWindowHeight for consistency
        return NUM_VISIBLE_ROWS_FOR_HEIGHT;
    };

    // Override maxCols to set the number of columns.
    const _Window_ActorCommand_maxCols = Window_ActorCommand.prototype.maxCols;
    Window_ActorCommand.prototype.maxCols = function() {
        return NUM_COLUMNS;
    };

    // Override itemWidth to ensure items fit within the new column structure.
    // This is crucial for multi-column layouts.
    const _Window_ActorCommand_itemWidth = Window_ActorCommand.prototype.itemWidth;
    Window_ActorCommand.prototype.itemWidth = function() {
        // this.innerWidth is the content width (window width - padding)
        const width = Math.floor(this.innerWidth / this.maxCols());
        return width;
    };

    // Ensure window refreshes correctly when commands change (e.g. actor changes)
    // This is often handled, but good to be mindful of.
    // When the command list is made (makeCommandList), Window_Command calls refresh,
    // which calls drawAllItems, which uses maxCols and itemWidth.
    // The size is set at creation by actorCommandWindowRect.

  

})();