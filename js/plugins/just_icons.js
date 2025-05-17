//=============================================================================
// AA_IconOnlyActorSkillCommands_Hardcoded.js
//=============================================================================
/*
 * @target MZ
 * @plugindesc Displays only icons for specific skill commands, with custom selection border and no item background. Configuration is hardcoded.
 * @author YourName (Archeia/Aeria, or your alias)
 * @url (Your URL)
 * @version 1.4.3 (Attempt forced refresh for border)
 *
 * @help (Help text remains the same)
 *
 * Changelog:
 *   1.4.3:
 *     - Added a forced refresh in Window_ActorCommand.select if index changes,
 *       to ensure border redraws correctly.
 *   1.4.2:
 *     - Added deeper debugging for selection index.
 *   (Previous logs omitted)
 */

(() => {
    const pluginName = "AA_IconOnlyActorSkillCommands_Hardcoded";

    // CONFIGURABLE VALUES
    const SCRIPT_TARGET_SKILL_SYMBOL = "singleSkill";
    const SCRIPT_CENTER_ICONS = true;
    const SCRIPT_ICON_SCALE = 2;
    const SCRIPT_SELECTION_BORDER_WIDTH = 5;
    const SCRIPT_SELECTION_BORDER_COLOR = "white";

    // console.log(`[${pluginName}] Loaded. Config: Symbol=${SCRIPT_TARGET_SKILL_SYMBOL}, Center=${SCRIPT_CENTER_ICONS}, Scale=${SCRIPT_ICON_SCALE}, BorderW=${SCRIPT_SELECTION_BORDER_WIDTH}, BorderC=${SCRIPT_SELECTION_BORDER_COLOR}`);

    const targetSkillSymbolNormalized = SCRIPT_TARGET_SKILL_SYMBOL.toLowerCase();
    const centerIcons = SCRIPT_CENTER_ICONS;
    let iconScale = Number(SCRIPT_ICON_SCALE) || 1;
    const selectionBorderWidth = Number(SCRIPT_SELECTION_BORDER_WIDTH) || 0;
    const selectionBorderColor = SCRIPT_SELECTION_BORDER_COLOR;

    if (iconScale <= 0) iconScale = 1;

    function isIconOnlySkillCommand(command) {
        if (!command) return false;
        if (command.symbol && command.symbol.toLowerCase() === targetSkillSymbolNormalized) {
            const skillId = command.ext;
            return skillId && $dataSkills[skillId];
        }
        return false;
    }

    const _Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function(index) {
        const oldIndex = this.index(); // Get index BEFORE it's changed by the original call
        _Window_Selectable_select.call(this, index); // Original selection logic

        if (this instanceof Window_ActorCommand) {
            // If the index actually changed and the window is active, force a full refresh.
            // This is a bit heavy-handed but should ensure the border updates.
            if (this.index() !== oldIndex && this.active) {
                // console.log(`[${pluginName}] ActorCommand index changed from ${oldIndex} to ${this.index()}. Forcing refresh.`);
                this.refresh();
            }
        }
    };
    
    // Remove the callUpdateHelp alias, as it served its diagnostic purpose
    // const _Window_Selectable_callUpdateHelp = Window_Selectable.prototype.callUpdateHelp;
    // Window_Selectable.prototype.callUpdateHelp = function() { ... };


    const _Window_Selectable_drawItemBackground = Window_Selectable.prototype.drawItemBackground;
    Window_Selectable.prototype.drawItemBackground = function(index) {
        if (this instanceof Window_ActorCommand && this._list && this._list[index]) {
            const command = this._list[index];
            if (isIconOnlySkillCommand(command)) {
                return;
            }
        }
        _Window_Selectable_drawItemBackground.call(this, index);
    };

    const _Window_ActorCommand_itemHeight = Window_ActorCommand.prototype.itemHeight;
    Window_ActorCommand.prototype.itemHeight = function() {
        let originalHeight = _Window_ActorCommand_itemHeight.call(this);
        let newHeight = originalHeight;
        if (iconScale > 1 || selectionBorderWidth > 0) {
            let hasIconSkill = false;
            if (this._list) {
                for (const command of this._list) {
                    if (isIconOnlySkillCommand(command)) {
                        hasIconSkill = true;
                        break;
                    }
                }
            }
            if (hasIconSkill) {
                const scaledIconHeight = ImageManager.iconHeight * iconScale;
                const verticalPadding = 8;
                let requiredHeight = scaledIconHeight + verticalPadding + (selectionBorderWidth * 2);
                newHeight = Math.max(requiredHeight, originalHeight);
            }
        }
        return newHeight;
    };

    const _Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
    Window_ActorCommand.prototype.drawItem = function(index) {
        const command = this._list[index];

        if (command && isIconOnlySkillCommand(command)) {
            const skillId = command.ext;
            const skill = $dataSkills[skillId];

            if (skill && skill.iconIndex > 0) {
                const rect = this.itemLineRect(index);
                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));
                
                const iconSetBitmap = ImageManager.loadSystem("IconSet");
                const pw = ImageManager.iconWidth;
                const ph = ImageManager.iconHeight;
                const sx = (skill.iconIndex % 16) * pw;
                const sy = Math.floor(skill.iconIndex / 16) * ph;
                
                const scaledWidth = pw * iconScale;
                const scaledHeight = ph * iconScale;

                let iconDrawX = rect.x;
                if (centerIcons) {
                    iconDrawX = rect.x + (rect.width - scaledWidth) / 2;
                }
                let iconDrawY = rect.y + (rect.height - scaledHeight) / 2;
                
                if (iconSetBitmap.isReady()) {
                    this.contents.blt(iconSetBitmap, sx, sy, pw, ph, iconDrawX, iconDrawY, scaledWidth, scaledHeight);

                    // The condition "this.index() === index" should now work correctly
                    // because refresh() will call drawItem for all items *after* this.index() is updated.
                    if (this.index() === index && selectionBorderWidth > 0) {
                        const bWidth = selectionBorderWidth;
                        const bColor = selectionBorderColor;
                        const borderX = iconDrawX - bWidth;
                        const borderY = iconDrawY - bWidth;
                        const outerRectWidth = scaledWidth + bWidth * 2;
                        const outerRectHeight = scaledHeight + bWidth * 2;
                        this.contents.fillRect(borderX, borderY, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + outerRectHeight - bWidth, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                        this.contents.fillRect(borderX + outerRectWidth - bWidth, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                    }
                }
            } else {
                _Window_ActorCommand_drawItem.call(this, index);
            }
        } else {
            _Window_ActorCommand_drawItem.call(this, index);
        }
    };
    
    const _Window_ActorCommand_updateHelp = Window_ActorCommand.prototype.updateHelp;
    Window_ActorCommand.prototype.updateHelp = function() {
        const command = this.currentData(); 
        if (command && isIconOnlySkillCommand(command)) {
            if (this._helpWindow) {
                this._helpWindow.setText("");
            }
        } else {
            _Window_ActorCommand_updateHelp.call(this);
        }
    };

    const _Window_Command_initialize = Window_Command.prototype.initialize;
    Window_Command.prototype.initialize = function(rect) {
        _Window_Command_initialize.call(this, rect);
        this._aaIconOnlyCmd_IconSetReadyListener = () => {
            if (this._destroyed) return; this.refresh();
        };
        const iconSetBitmap = ImageManager.loadSystem("IconSet");
        if (!iconSetBitmap.isReady()) {
            iconSetBitmap.addLoadListener(this._aaIconOnlyCmd_IconSetReadyListener);
        }
    };

    const _Window_Command_destroy = Window_Command.prototype.destroy;
    Window_Command.prototype.destroy = function(options) {
        if (this._aaIconOnlyCmd_IconSetReadyListener) {
            this._aaIconOnlyCmd_IconSetReadyListener = null;
        }
        _Window_Command_destroy.call(this, options);
    };

})();