/*:
 * @target MZ
 * @plugindesc Overrides Window_Command.drawItem to show only icons for selected commands.
 * @author YourName (Based on your solution)
 * @version 1.0.0
 *
 * @help
 * CommandIconOnlySelectedFix.js
 * Version 1.0.0
 *
 * This plugin directly modifies the Window_Command.prototype.drawItem method
 * based on the solution you provided.
 *
 * Behavior:
 * - When a command is selected and enabled:
 *   Only its icon will be displayed, centered within the command item.
 *   The command name will not be shown.
 *
 * - When a command is not selected, or is disabled:
 *   It will be drawn with an icon (if one is associated with the command)
 *   followed by its name. If no icon is present, only the name is drawn.
 *
 * This change is global and will affect all windows that inherit from
 * Window_Command (e.g., Actor Command, Party Command, Title Command),
 * unless those windows have highly specific `drawItem` overrides that
 * do not call the parent/original `drawItem` method.
 *
 * Plugin Order:
 * Place this plugin below other plugins that modify command window appearances
 * or add skills/commands if you want this plugin's drawing behavior
 * to take precedence.
 *
 * Important Note:
 * Because this plugin defines a specific way to draw unselected items
 * (icon + text), it might override an "icon-only" style for *unselected*
 * items if another plugin was previously achieving that. This plugin primarily
 * addresses the issue of selected items showing text when only an icon is desired.
 */

(() => {
    // --- Main override for Window_Command.prototype.drawItem ---
    Window_Command.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));

        if (this.isCommandEnabled(index) && this.index() === index) {
            // If the item is selected and enabled, draw only the icon
            this.drawIconOnlyForSelectedCommand(index, rect);
        } else {
            // For other states (not selected, or disabled), draw icon and text
            this.drawIconAndTextForCommand(index, rect, align);
        }
    };

    // --- Helper function to draw only the icon for a command ---
    // (Based on your `drawIconOnlyIfSelected` function)
    Window_Command.prototype.drawIconOnlyForSelectedCommand = function(index, rect) {
        const iconIndex = this.commandIcon(index); // Get icon index for the command
        if (iconIndex && iconIndex > 0) { // Check if iconIndex is valid
            // Calculate position to center the icon
            const iconX = rect.x + (rect.width - ImageManager.iconWidth) / 2;
            const iconY = rect.y + (rect.height - ImageManager.iconHeight) / 2;
            this.drawIcon(iconIndex, iconX, iconY);
        }
        // Crucially, do not draw text here
    };

    // --- Helper function to draw icon and text for a command ---
    // (Based on your `drawIconAndText` function)
    Window_Command.prototype.drawIconAndTextForCommand = function(index, rect, align) {
        const iconIndex = this.commandIcon(index);
        const name = this.commandName(index);

        let currentX = rect.x; // Starting X position for drawing content
        const iconY = rect.y + (rect.height - ImageManager.iconHeight) / 2; // Vertically center icon
        let textDrawableWidth = rect.width; // Initial width available for text

        const spaceAfterIcon = 4; // Standard spacing between icon and text

        if (iconIndex && iconIndex > 0) {
            this.drawIcon(iconIndex, currentX, iconY);
            currentX += ImageManager.iconWidth + spaceAfterIcon;
            textDrawableWidth -= (ImageManager.iconWidth + spaceAfterIcon);
        }

        // Draw the command name if it exists and there's space
        if (name) {
            if (textDrawableWidth > 0) {
                this.drawText(name, currentX, rect.y, textDrawableWidth, align);
            } else if (!iconIndex) {
                // If no icon was drawn (e.g. iconIndex was 0), draw text using full rect width
                this.drawText(name, rect.x, rect.y, rect.width, align);
            }
        }
    };

    // (Optional but good practice)
    // Ensure commandIcon method exists on Window_Command if it doesn't.
    // MZ's default Window_Command already has this, typically returning command._iconIndex.
    if (typeof Window_Command.prototype.commandIcon !== 'function') {
        Window_Command.prototype.commandIcon = function(index) {
            const command = this._list[index];
            return command ? command.iconIndex || 0 : 0;
        };
    }
})();