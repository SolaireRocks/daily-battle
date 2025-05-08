/*:
 * @plugindesc v4.0 Displays the last two digits of a variable in the top-right of the battle screen,
 * with a box, large numbers, and dynamic color changes.
 * @author Your Name / AI Assistant (Modified from v3.1)
 * @target MZ
 * @help VariableLastTwoDigitsDisplay.js
 *
 * Displays the last two digits (00-99) of a specified game variable
 * in the top-right corner of the battle screen only.
 * Updates when the variable changes.
 *
 * Features:
 * - Shows only the last two digits (e.g., 123 becomes "23", 5 becomes "05").
 * - Numbers are large by default.
 * - A visible box is drawn around the numbers.
 * - Number color changes from green (00) through yellow (50) to red (99).
 *
 * @param variableId
 * @text Variable ID
 * @desc The ID of the game variable to display.
 * @type variable
 * @default 1
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
 * @param digitFontSize
 * @text Digit Font Size
 * @desc The font size for the two digits.
 * @type number
 * @min 12
 * @default 48
 *
 * @param windowOpacity
 * @text Window Opacity
 * @desc Opacity of the background window (0=transparent, 255=opaque).
 * For a visible box, use a high value like 192 or 255.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param windowPadding
 * @text Window Padding
 * @desc Padding around the digits inside the window.
 * @type number
 * @min 0
 * @default 8
 */

(() => {
    const pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1] || "VariableLastTwoDigitsDisplay";
    const parameters = PluginManager.parameters(pluginName);
    const variableIdParameter = parseInt(parameters['variableId'] || 1);
    const xMarginParameter = parseInt(parameters['xMargin'] || 10);
    const yMarginParameter = parseInt(parameters['yMargin'] || 10);
    const digitFontSizeParameter = parseInt(parameters['digitFontSize'] || 48);
    const windowOpacityParameter = parseInt(parameters['windowOpacity'] || 255);
    const windowPaddingParameter = parseInt(parameters['windowPadding'] || 8);

    //-----------------------------------------------------------------------------
    // Ensure Scene_Battle Exists
    //-----------------------------------------------------------------------------
    if (typeof Scene_Battle === 'undefined' || typeof Scene_Battle.prototype === 'undefined') {
        console.error(`[${pluginName}] CRITICAL: Scene_Battle is undefined! Cannot modify.`);
        return;
    }

    //-----------------------------------------------------------------------------
    // Window_VariableLastTwoDigits
    //
    // The window for displaying the last two digits of the variable.
    function Window_VariableLastTwoDigits() {
        this.initialize(...arguments);
    }

    Window_VariableLastTwoDigits.prototype = Object.create(Window_Base.prototype);
    Window_VariableLastTwoDigits.prototype.constructor = Window_VariableLastTwoDigits;

    Window_VariableLastTwoDigits.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect); // Base setup first

        this._variableId = variableIdParameter;
        this._lastVariableValue = null; // Ensures first update runs if variable starts at 0
        this._lastDisplayedString = "00"; // Store the last displayed string (e.g., "05", "99")

        this.opacity = windowOpacityParameter;     // Overall window opacity including frame
        this.backOpacity = windowOpacityParameter; // Opacity of the window's background fill

        // If padding parameter is different from what Window_Base set up by default,
        // update padding and recreate contents bitmap.
        if (this.padding !== windowPaddingParameter) {
            this.padding = windowPaddingParameter;
            this.createContents(); // Recreate contents bitmap with the new padding.
        }
        
        this.updateValueAndRefresh(); // Initial draw
    };

    // --- Calculate required width ---
    Window_VariableLastTwoDigits.prototype.windowWidth = function() {
        // Width to fit "00" or "99" with the specified font size and padding.
        const textWidth = this.calculateTextWidth("00"); // "00" is usually as wide or wider than "99"
        return Math.ceil(textWidth + this.padding * 2);
    };

    Window_VariableLastTwoDigits.prototype.windowHeight = function() {
        return this.fittingHeight(1); // Height for one line of text.
    };
    
    Window_VariableLastTwoDigits.prototype.calculateTextWidth = function(text) {
        // Create a temporary bitmap to measure text.
        // This is necessary because 'this.contents' might not be the final size yet,
        // especially when this method is called on a temporary window for layout calculation.
        const tempBitmap = new Bitmap(1, 1);
        tempBitmap.fontSize = this.contentsFontSize();
        const width = tempBitmap.measureTextWidth(text);
        tempBitmap.destroy();
        return width;
    };

    // --- Font Size Handling ---
    Window_VariableLastTwoDigits.prototype.contentsFontSize = function() {
        return digitFontSizeParameter > 0 ? digitFontSizeParameter : 48; // Default large font size
    };

    // --- Update based on Variable Change ---
    Window_VariableLastTwoDigits.prototype.update = function() {
        Window_Base.prototype.update.call(this); // Perform base window updates

        const currentValue = $gameVariables.value(this._variableId);
        if (currentValue !== this._lastVariableValue) {
            this.updateValueAndRefresh(currentValue);
        }
    };

    // --- Store Value and Refresh Display ---
    Window_VariableLastTwoDigits.prototype.updateValueAndRefresh = function(currentValue = null) {
        if (currentValue === null) {
            currentValue = $gameVariables.value(this._variableId);
        }

        this._lastVariableValue = currentValue;

        // Get last two digits: ( (N % 100) + 100 ) % 100 handles negative numbers correctly too
        const displayNum = ((currentValue % 100) + 100) % 100;
        this._lastDisplayedString = String(displayNum).padStart(2, '0');

        this.refresh(); // Refresh the window contents
    };

    // --- Determine Number Color (Green -> Yellow -> Red) ---
    Window_VariableLastTwoDigits.prototype.getNumberColor = function(value) {
        // value is 0-99
        let r, g, b;
        value = Math.max(0, Math.min(99, value)); // Clamp value to 0-99

        if (value < 50) { // Green to Yellow
            // As value goes from 0 to 49, R goes from 0 to 255. G stays 255.
            const normSegment = value / 49.0; // Normalized (0.0 to 1.0 for this segment)
            r = Math.round(255 * normSegment);
            g = 255;
            b = 0;
        } else { // Yellow to Red
            // As value goes from 50 to 99, G goes from 255 to 0. R stays 255.
            const normSegment = (value - 50) / 49.0; // Normalized (0.0 to 1.0 for this segment)
            r = 255;
            g = Math.round(255 * (1 - normSegment));
            b = 0;
        }
        return `rgb(${r},${g},${b})`;
    };

    // --- Refresh drawing ---
    Window_VariableLastTwoDigits.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            
            const valueToColor = parseInt(this._lastDisplayedString, 10);
            const color = this.getNumberColor(valueToColor);
            const text = this._lastDisplayedString;

            this.resetFontSettings(); // Apply game's default font settings
            this.contents.fontSize = this.contentsFontSize(); // Set our custom large font size
            this.changeTextColor(color); // Set the dynamic color

            // Draw text centered in the content area
            // The y-coordinate 0 is correct for the first line.
            // Vertical centering within the line height is handled by font metrics.
            this.drawText(text, 0, 0, this.contentsWidth(), 'center');
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle Modifications
    //-----------------------------------------------------------------------------

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createVariableDisplayWindow();
    };

    Scene_Battle.prototype.createVariableDisplayWindow = function() {
        // Use a temporary dummy window to calculate dimensions with correct parameters
        const tempRect = new Rectangle(0, 0, 100, 50); // Arbitrary small rect
        const tempWindow = new Window_VariableLastTwoDigits(tempRect);
        
        const width = tempWindow.windowWidth();
        const height = tempWindow.windowHeight();
        const x = Graphics.boxWidth - width - xMarginParameter;
        const y = yMarginParameter;
        
        // Important: Destroy the temporary window's contents if it created any persistent bitmaps
        // (Window_Base.initialize creates this.contents)
        if (tempWindow.contents) {
            tempWindow.contents.destroy();
        }
        // The tempWindow object itself will be garbage collected as it's not added to any scene.

        const finalRect = new Rectangle(x, y, width, height);
        this._variableDisplayWindow = new Window_VariableLastTwoDigits(finalRect);
        this.addWindow(this._variableDisplayWindow);
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        // Clean up reference if the window exists (good practice)
        // The window itself will be destroyed as part of the scene's window layer
        this._variableDisplayWindow = null;
    };

    console.log(`[${pluginName}] Plugin loaded successfully.`);

})();