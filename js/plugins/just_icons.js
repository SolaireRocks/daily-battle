//=============================================================================
// AA_IconOnlyActorSkillCommands_Hardcoded.js
//=============================================================================
/*
 * @target MZ
 * @plugindesc Displays only icons for specific skill commands, with custom selection border and no item background. Configuration is hardcoded.
 * @author YourName (Archeia/Aeria, or your alias)
 * @url (Your URL)
 * @version 1.5.2 (Fix TypeError with contentsColor)
 *
 * @help (Help text remains the same)
 *
 * Changelog:
 *   1.5.2:
 *     - Fixed TypeError: this.contentsColor is not a function.
 *       The fillRect color argument can directly take CSS color strings.
 *   1.5.1:
 *     - Fixed TypeError: this.commandAt is not a function in drawItem.
 *       Reverted to using this._list[index] to get command data.
 *   1.5.0:
 *     - Fixed initial cursor position and improved "select last skill".
 *   (Previous logs omitted)
 */

(() => {
    const pluginName = "AA_IconOnlyActorSkillCommands_Hardcoded";

    // CONFIGURABLE VALUES
    const SCRIPT_TARGET_SKILL_SYMBOL = "singleSkill";
    const SCRIPT_CENTER_ICONS = true;
    const SCRIPT_ICON_SCALE = 2;
    const SCRIPT_SELECTION_BORDER_WIDTH = 5;
    const SCRIPT_SELECTION_BORDER_COLOR = "white"; // This will be used directly

    const targetSkillSymbolNormalized = SCRIPT_TARGET_SKILL_SYMBOL.toLowerCase();
    const centerIcons = SCRIPT_CENTER_ICONS;
    let iconScale = Number(SCRIPT_ICON_SCALE) || 1;
    const selectionBorderWidth = Number(SCRIPT_SELECTION_BORDER_WIDTH) || 0;
    const selectionBorderColor = SCRIPT_SELECTION_BORDER_COLOR; // This is "white"

    if (iconScale <= 0) iconScale = 1;

    function isIconOnlySkillCommand(command) {
        if (!command) return false;
        const commandSymbol = command.symbol ? String(command.symbol).toLowerCase() : "";
        if (commandSymbol === targetSkillSymbolNormalized) {
            const skillId = command.ext;
            return skillId && $dataSkills[skillId];
        }
        return false;
    }

    const _Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        this._actor = actor;
        this.clearCommandList();
        this.makeCommandList();
        this.selectLast();
        this.refresh();
        this.activate();
        this.open();
    };

    const _Window_ActorCommand_selectLast = Window_ActorCommand.prototype.selectLast;
    Window_ActorCommand.prototype.selectLast = function() {
        let handledByCustomLogic = false;
        if (this._actor) {
            const lastSymbol = this._actor.lastCommandSymbol();
            const lastSymbolNormalized = lastSymbol ? String(lastSymbol).toLowerCase() : "";

            if (lastSymbolNormalized === targetSkillSymbolNormalized) {
                const lastSkillId = this._actor.lastBattleSkillId();
                if (lastSkillId) {
                    const commandIndex = this._list.findIndex(command =>
                        command.symbol && String(command.symbol).toLowerCase() === targetSkillSymbolNormalized &&
                        command.ext === lastSkillId
                    );

                    if (commandIndex >= 0) {
                        this.select(commandIndex);
                        handledByCustomLogic = true;
                    }
                }
            }
        }
        if (!handledByCustomLogic) {
            _Window_ActorCommand_selectLast.call(this);
        }
    };

    const _Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function(index) {
        const oldIndex = this.index();
        _Window_Selectable_select.call(this, index);

        if (this instanceof Window_ActorCommand) {
            if (this.index() !== oldIndex && this.active) {
                this.refresh();
            }
        }
    };
    
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

                    if (this.index() === index && selectionBorderWidth > 0) {
                        const bWidth = selectionBorderWidth;
                        // --- THIS IS THE CORRECTED LINE ---
                        const bColor = selectionBorderColor; // Directly use the string "white" (or whatever is configured)
                        // --- END CORRECTION ---
                        const borderX = iconDrawX - bWidth;
                        const borderY = iconDrawY - bWidth;
                        const outerRectWidth = scaledWidth + bWidth * 2;
                        const outerRectHeight = scaledHeight + bWidth * 2;
                        this.contents.fillRect(borderX, borderY, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + outerRectHeight - bWidth, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                        this.contents.fillRect(borderX + outerRectWidth - bWidth, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                    }
                } else {
                     _Window_ActorCommand_drawItem.call(this, index); // Fallback if iconset not ready
                }
            } else {
                _Window_ActorCommand_drawItem.call(this, index); // Fallback if skill has no icon
            }
        } else {
            _Window_ActorCommand_drawItem.call(this, index); // Fallback for non-icon-only commands
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
        if (this instanceof Window_ActorCommand) { 
            this._aaIconOnlyCmd_IconSetReadyListener = () => {
                if (this._destroyed || !this.isOpenAndActive()) return;
                this.refresh();
            };
            const iconSetBitmap = ImageManager.loadSystem("IconSet");
            if (!iconSetBitmap.isReady()) {
                iconSetBitmap.addLoadListener(this._aaIconOnlyCmd_IconSetReadyListener);
            }
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