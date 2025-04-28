/*:
 * @plugindesc v3.0 Displays Variable 1 as MM:SS in the top-right during battle.
 * @author Your Name / AI Assistant
 * @target MZ
 * @help VariableClockDisplay.js
 *
 * Displays the value of a specified game variable, formatted as MM:SS,
 * in the top-right corner of the battle screen only. Updates when the
 * variable changes. Every 60 units in the variable counts as one minute.
 *
 * @param variableId
 * @text Variable ID
 * @desc The ID of the game variable to use as the counter.
 * @type variable
 * @default 1
 *
 * @param labelText
 * @text Label Text
 * @desc The text to display before the time value (e.g., "Count: ").
 * @type string
 * @default Count:
 *
 * @param xMargin
 * @text X Margin
 * @desc Margin from the right edge of the screen.
 * @type number
 * @default 10
 *
 * @param yMargin
 * @text Y Margin
 * @desc Margin from the top edge of the screen.
 * @type number
 * @default 10
 *
 * @param fontSize
 * @text Font Size
 * @desc The font size for the display. Use 0 for default game font size.
 * @type number
 * @min 0
 * @default 0
 *
 * @param windowOpacity
 * @text Window Opacity
 * @desc Opacity of the background window (0=transparent, 255=opaque).
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @param windowPadding
 * @text Window Padding
 * @desc Padding around the text inside the window background.
 * @type number
 * @min 0
 * @default 6
 */

(() => {
    const pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1] || "VariableClockDisplay";
    const parameters = PluginManager.parameters(pluginName);
    const variableId = parseInt(parameters['variableId'] || 1); // Use the configured variable ID
    const labelText = parameters['labelText'] || "Count: "; // Default label changed
    const xMargin = parseInt(parameters['xMargin'] || 10);
    const yMargin = parseInt(parameters['yMargin'] || 10);
    const settingFontSize = parseInt(parameters['fontSize'] || 0);
    const settingOpacity = parseInt(parameters['windowOpacity'] || 0);
    const settingPadding = parseInt(parameters['windowPadding'] || 6);

    // We don't need battleStartFrame anymore

    //-----------------------------------------------------------------------------
    // Ensure Scene_Battle Exists
    //-----------------------------------------------------------------------------
     if (typeof Scene_Battle === 'undefined' || typeof Scene_Battle.prototype === 'undefined') {
        console.error(`[${pluginName}] CRITICAL: Scene_Battle is undefined! Cannot modify.`);
        return; // Stop if core scene class is missing
    }

    //-----------------------------------------------------------------------------
    // Window_VariableClockDisplay
    //
    // The window for displaying the variable value as MM:SS.

    function Window_VariableClockDisplay() {
        this.initialize(...arguments);
    }

    Window_VariableClockDisplay.prototype = Object.create(Window_Base.prototype);
    Window_VariableClockDisplay.prototype.constructor = Window_VariableClockDisplay;

    Window_VariableClockDisplay.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._variableId = variableId; // Store variable ID for easy access
        this._lastVariableValue = -1; // Store the last known value to detect changes
        this._lastFormattedTime = "0:00"; // Store the last displayed string
        this.opacity = settingOpacity;
        this.padding = settingPadding;
        this.updateValueAndRefresh(); // Initial draw based on current variable value
    };

    Window_VariableClockDisplay.prototype.totalPadding = function() {
         return (this.padding || Window_Base.prototype.padding) * 2;
    }

    // --- Calculate required width ---
    Window_VariableClockDisplay.prototype.windowWidth = function() {
        // Estimate width based on label and "MM:SS" format (e.g., "999:59")
        // Adjust the "999" if you expect the variable to go into thousands often
        const estimatedTime = "999:59";
        const text = labelText + estimatedTime;
        const fontSize = this.contentsFontSize();
        const padding = this.totalPadding();
        const textPadding = this.itemPadding() * 2;

        const tempBitmap = new Bitmap(1, 1);
        tempBitmap.fontSize = fontSize;
        const textWidth = tempBitmap.measureTextWidth(text);
        tempBitmap.destroy();

        return Math.ceil(textWidth + padding + textPadding);
    };

    Window_VariableClockDisplay.prototype.windowHeight = function() {
        return this.fittingHeight(1); // Height for one line
    };

    // --- Font Size Handling (same as before) ---
    Window_VariableClockDisplay.prototype.contentsFontSize = function() {
        if (settingFontSize > 0) { return settingFontSize; }
        if ($gameSystem && typeof $gameSystem.mainFontSize === 'function') {
            return $gameSystem.mainFontSize();
        }
        return 26; // Fallback MZ default
    };

    Window_VariableClockDisplay.prototype.lineHeight = function() {
         const usedFontSize = this.contentsFontSize();
         return usedFontSize + 8; // Standard calculation
    };

    // --- Update based on Variable Change ---
    Window_VariableClockDisplay.prototype.update = function() {
        Window_Base.prototype.update.call(this); // Perform base window updates

        // Check if the variable's value has changed
        const currentValue = $gameVariables.value(this._variableId);
        if (currentValue !== this._lastVariableValue) {
            this.updateValueAndRefresh(currentValue);
        }
    };

    // --- Calculate MM:SS and Refresh Display ---
    Window_VariableClockDisplay.prototype.updateValueAndRefresh = function(currentValue = null) {
        // If currentValue wasn't passed, get it now
        if (currentValue === null) {
            currentValue = $gameVariables.value(this._variableId);
        }

        this._lastVariableValue = currentValue; // Store the new value

        // Calculate "Minutes" and "Seconds" based on the variable value
        const totalValue = Math.max(0, currentValue); // Ensure non-negative
        const minutes = Math.floor(totalValue / 60);
        const seconds = totalValue % 60;

        // Format MM:SS with leading zeros for seconds
        this._lastFormattedTime = String(minutes) + ":" + String(seconds).padStart(2, '0');

        // Now refresh the window contents
        this.refresh();
    };


    // --- Refresh drawing ---
    Window_VariableClockDisplay.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            const text = labelText + this._lastFormattedTime; // Display the formatted value
            const width = this.contentsWidth();

            this.resetFontSettings();
            this.contents.fontSize = this.contentsFontSize();

            this.drawText(text, 0, 0, width, 'left');
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle Modifications
    //
    // Create and add the window.
    //-----------------------------------------------------------------------------

    // Keep the alias to ensure window creation happens correctly
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this); // Call original first
        this.createVariableClockDisplayWindow();
    };

    Scene_Battle.prototype.createVariableClockDisplayWindow = function() {
        // Calculate Rect
        const dummyRect = new Rectangle(0, 0, 100, 50);
        // Use the correct window constructor name here
        const tempWindow = new Window_VariableClockDisplay(dummyRect);
        const width = tempWindow.windowWidth();
        const height = tempWindow.windowHeight();
        const x = Graphics.boxWidth - width - xMargin;
        const y = yMargin;
        const finalRect = new Rectangle(x, y, width, height);
        if (tempWindow.contents) tempWindow.contents.destroy();

        // Create the actual window (using the correct constructor)
        this._variableClockDisplayWindow = new Window_VariableClockDisplay(finalRect);
        this.addWindow(this._variableClockDisplayWindow);
    };

    // Ensure terminate alias is still safe (though we removed specific logic)
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
    };

    console.log(`[${pluginName}] Plugin loaded successfully.`);

})();