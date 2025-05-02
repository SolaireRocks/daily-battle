/*:
 * @plugindesc v3.1 Displays Variable 1 as a raw number in the top-right during battle.
 * @author Your Name / AI Assistant
 * @target MZ
 * @help VariableClockDisplay.js
 *
 * Displays the raw numerical value of a specified game variable
 * in the top-right corner of the battle screen only. Updates when the
 * variable changes.
 *
 * @param variableId
 * @text Variable ID
 * @desc The ID of the game variable to display.
 * @type variable
 * @default 1
 *
 * @param labelText
 * @text Label Text
 * @desc The text to display before the variable value (e.g., "Score: ").
 * @type string
 * @default Value:
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
    const variableId = parseInt(parameters['variableId'] || 1);
    const labelText = parameters['labelText'] || "Value: "; // Default label changed
    const xMargin = parseInt(parameters['xMargin'] || 10);
    const yMargin = parseInt(parameters['yMargin'] || 10);
    const settingFontSize = parseInt(parameters['fontSize'] || 0);
    const settingOpacity = parseInt(parameters['windowOpacity'] || 0);
    const settingPadding = parseInt(parameters['windowPadding'] || 6);

    //-----------------------------------------------------------------------------
    // Ensure Scene_Battle Exists
    //-----------------------------------------------------------------------------
     if (typeof Scene_Battle === 'undefined' || typeof Scene_Battle.prototype === 'undefined') {
        console.error(`[${pluginName}] CRITICAL: Scene_Battle is undefined! Cannot modify.`);
        return; // Stop if core scene class is missing
    }

    //-----------------------------------------------------------------------------
    // Window_VariableValueDisplay
    //
    // The window for displaying the variable value as a raw number.
    // Renamed class for clarity from Window_VariableClockDisplay

    function Window_VariableValueDisplay() {
        this.initialize(...arguments);
    }

    Window_VariableValueDisplay.prototype = Object.create(Window_Base.prototype);
    Window_VariableValueDisplay.prototype.constructor = Window_VariableValueDisplay;

    Window_VariableValueDisplay.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._variableId = variableId;
        this._lastVariableValue = -1; // Store the last known value to detect changes
        this._lastDisplayValue = "0"; // Store the last displayed string (raw number)
        this.opacity = settingOpacity;
        this.padding = settingPadding;
        this.updateValueAndRefresh(); // Initial draw
    };

    Window_VariableValueDisplay.prototype.totalPadding = function() {
         return (this.padding || Window_Base.prototype.padding) * 2;
    }

    // --- Calculate required width ---
    Window_VariableValueDisplay.prototype.windowWidth = function() {
        // Estimate width based on label and a reasonable max number (e.g., 5-6 digits)
        const estimatedValue = "99999"; // Adjust if you expect larger numbers
        const text = labelText + estimatedValue;
        const fontSize = this.contentsFontSize();
        const padding = this.totalPadding();
        const textPadding = this.itemPadding() * 2;

        const tempBitmap = new Bitmap(1, 1);
        tempBitmap.fontSize = fontSize;
        const textWidth = tempBitmap.measureTextWidth(text);
        tempBitmap.destroy();

        return Math.ceil(textWidth + padding + textPadding);
    };

    Window_VariableValueDisplay.prototype.windowHeight = function() {
        return this.fittingHeight(1); // Height for one line
    };

    // --- Font Size Handling (same as before) ---
    Window_VariableValueDisplay.prototype.contentsFontSize = function() {
        if (settingFontSize > 0) { return settingFontSize; }
        if ($gameSystem && typeof $gameSystem.mainFontSize === 'function') {
            return $gameSystem.mainFontSize();
        }
        return 26; // Fallback MZ default
    };

    Window_VariableValueDisplay.prototype.lineHeight = function() {
         const usedFontSize = this.contentsFontSize();
         return usedFontSize + 8; // Standard calculation
    };

    // --- Update based on Variable Change ---
    Window_VariableValueDisplay.prototype.update = function() {
        Window_Base.prototype.update.call(this); // Perform base window updates

        const currentValue = $gameVariables.value(this._variableId);
        if (currentValue !== this._lastVariableValue) {
            this.updateValueAndRefresh(currentValue);
        }
    };

    // --- Store Value and Refresh Display ---
    Window_VariableValueDisplay.prototype.updateValueAndRefresh = function(currentValue = null) {
        if (currentValue === null) {
            currentValue = $gameVariables.value(this._variableId);
        }

        this._lastVariableValue = currentValue; // Store the new value

        // *** CHANGE: Directly use the variable value as a string ***
        this._lastDisplayValue = String(Math.max(0, currentValue)); // Ensure non-negative and convert to string

        this.refresh(); // Refresh the window contents
    };


    // --- Refresh drawing ---
    Window_VariableValueDisplay.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            // *** CHANGE: Use the stored raw value string ***
            const text = labelText + this._lastDisplayValue;
            const width = this.contentsWidth();

            this.resetFontSettings();
            this.contents.fontSize = this.contentsFontSize();

            this.drawText(text, 0, 0, width, 'left');
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle Modifications
    //-----------------------------------------------------------------------------

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createVariableValueDisplayWindow(); // Renamed function call
    };

    // Renamed function for clarity
    Scene_Battle.prototype.createVariableValueDisplayWindow = function() {
        // Calculate Rect using the updated window class
        const dummyRect = new Rectangle(0, 0, 100, 50);
        // *** CHANGE: Use the correct window constructor name ***
        const tempWindow = new Window_VariableValueDisplay(dummyRect);
        const width = tempWindow.windowWidth();
        const height = tempWindow.windowHeight();
        const x = Graphics.boxWidth - width - xMargin;
        const y = yMargin;
        const finalRect = new Rectangle(x, y, width, height);
        if (tempWindow.contents) tempWindow.contents.destroy(); // Clean up temp contents

        // Create the actual window
        // *** CHANGE: Use the correct window constructor name ***
        this._variableValueDisplayWindow = new Window_VariableValueDisplay(finalRect);
        this.addWindow(this._variableValueDisplayWindow);
    };

    // Terminate alias remains safe, though no specific logic needs removing here now
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        // Clean up reference if the window exists (good practice)
        this._variableValueDisplayWindow = null;
    };

    console.log(`[${pluginName}] Plugin loaded successfully (Displays raw variable value).`);

})();