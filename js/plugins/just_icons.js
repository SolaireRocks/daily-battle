//=============================================================================
// AA_IconOnlyActorSkillCommands_Hardcoded.js
//=============================================================================
/*
 * @target MZ
 * @plugindesc Displays icons for skill commands, custom border, no item bg, cooldown/warmup display, and controllable disabled opacity. Hardcoded config.
 * @author YourName (Archeia/Aeria, or your alias)
 * @url (Your URL)
 * @version 1.8.0
 *
 * @help (Help text remains the same)
 *
 * Changelog:
 *   1.8.0:
 *     - Added SCRIPT_DISABLED_COMMAND_OPACITY to control dimness of disabled commands.
 *       Set lower than 160 for darker, higher for less dim (0-255).
 *       This affects icons, selection borders, and timers for disabled skills.
 *   1.7.0:
 *     - Added display of skill warmup numbers, styled identically to cooldowns.
 *     - Warmup display takes precedence if a skill is warming up.
 *   1.6.0:
 *     - Added display of skill cooldown numbers in the lower-right corner of skill icons.
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

    // Timer Display Config (shared for cooldown/warmup)
    const SCRIPT_TIMER_FONT_SIZE_RATIO = 2.2; 
    const SCRIPT_TIMER_MIN_FONT_SIZE = 14;    
    const SCRIPT_TIMER_TEXT_COLOR = "white";  
    const SCRIPT_TIMER_BG_COLOR = "rgba(0, 0, 0, 0.65)"; 
    const SCRIPT_TIMER_PADDING = 2;           
    const SCRIPT_TIMER_BG_PADDING = 1;        

    // New: Opacity for Disabled Commands
    // RPG Maker MZ default for disabled items is an opacity of 160.
    // Lower values (e.g., 100) make them darker/more dim. Higher values (e.g., 200) make them less dim.
    // Value is out of 255 (0 = fully transparent, 255 = fully opaque).
    const SCRIPT_DISABLED_COMMAND_OPACITY = 60; 

    const targetSkillSymbolNormalized = SCRIPT_TARGET_SKILL_SYMBOL.toLowerCase();
    const centerIcons = SCRIPT_CENTER_ICONS;
    let iconScale = Number(SCRIPT_ICON_SCALE) || 1;
    const selectionBorderWidth = Number(SCRIPT_SELECTION_BORDER_WIDTH) || 0;
    const selectionBorderColor = SCRIPT_SELECTION_BORDER_COLOR; 

    if (iconScale <= 0) iconScale = 1;

    // --- START: Dimming control for disabled commands ---
    // Override translucentOpacity for Window_ActorCommand to use our custom value
    Window_ActorCommand.prototype.translucentOpacity = function() {
        return SCRIPT_DISABLED_COMMAND_OPACITY;
    };
    // --- END: Dimming control for disabled commands ---

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
                // this.changePaintOpacity will now use our SCRIPT_DISABLED_COMMAND_OPACITY
                // for disabled items because we overrode translucentOpacity()
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
                    // Icon will be drawn with the (potentially dimmed) paintOpacity
                    this.contents.blt(iconSetBitmap, sx, sy, pw, ph, iconDrawX, iconDrawY, scaledWidth, scaledHeight);

                    if (this.index() === index && selectionBorderWidth > 0) {
                        const bWidth = selectionBorderWidth;
                        const bColor = selectionBorderColor;
                        const borderX = iconDrawX - bWidth;
                        const borderY = iconDrawY - bWidth;
                        const outerRectWidth = scaledWidth + bWidth * 2;
                        const outerRectHeight = scaledHeight + bWidth * 2;
                        // Selection border will also be drawn with the (potentially dimmed) paintOpacity
                        this.contents.fillRect(borderX, borderY, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + outerRectHeight - bWidth, outerRectWidth, bWidth, bColor);
                        this.contents.fillRect(borderX, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                        this.contents.fillRect(borderX + outerRectWidth - bWidth, borderY + bWidth, bWidth, outerRectHeight - (bWidth * 2), bColor);
                    }

                    // --- START: Draw Warmup/Cooldown Number ---
                    let turnsToDisplay = 0;
                    if (this._actor && this._actor._skillWarmups && typeof this._actor._skillWarmups === 'object') {
                        const warmupTurns = this._actor._skillWarmups[skillId];
                        if (warmupTurns > 0) turnsToDisplay = warmupTurns;
                    }
                    if (turnsToDisplay === 0 && this._actor && this._actor._skillCooldowns && typeof this._actor._skillCooldowns === 'object') {
                        const cooldownTurns = this._actor._skillCooldowns[skillId];
                        if (cooldownTurns > 0) turnsToDisplay = cooldownTurns;
                    }

                    if (turnsToDisplay > 0) {
                        const timerText = String(turnsToDisplay);
                        const originalFontSize = this.contents.fontSize;
                        const originalTextColor = this.contents.textColor; // Save true text color
                        
                        const timerFontSize = Math.max(SCRIPT_TIMER_MIN_FONT_SIZE, Math.floor(scaledHeight / SCRIPT_TIMER_FONT_SIZE_RATIO));
                        this.contents.fontSize = timerFontSize;

                        const textWidth = this.contents.measureTextWidth(timerText);
                        const textHeight = timerFontSize; 
                        const textDrawX = iconDrawX + scaledWidth - textWidth - SCRIPT_TIMER_PADDING;
                        const textDrawY = iconDrawY + scaledHeight - textHeight - SCRIPT_TIMER_PADDING;

                        if (SCRIPT_TIMER_BG_COLOR && SCRIPT_TIMER_BG_COLOR.toLowerCase() !== "none") {
                            // Timer BG will also be drawn with the (potentially dimmed) paintOpacity
                            this.contents.fillRect(
                                textDrawX - SCRIPT_TIMER_BG_PADDING, textDrawY - SCRIPT_TIMER_BG_PADDING,
                                textWidth + SCRIPT_TIMER_BG_PADDING * 2, textHeight + SCRIPT_TIMER_BG_PADDING * 2,
                                SCRIPT_TIMER_BG_COLOR
                            );
                        }
                        
                        this.changeTextColor(SCRIPT_TIMER_TEXT_COLOR); // Set the intended color
                        // Timer text will also be drawn with the (potentially dimmed) paintOpacity
                        this.contents.drawText(timerText, textDrawX, textDrawY, textWidth, textHeight, 'left');

                        this.contents.fontSize = originalFontSize;
                        this.changeTextColor(originalTextColor); // Restore true text color
                    }
                    // --- END: Draw Warmup/Cooldown Number ---

                } else {
                     _Window_ActorCommand_drawItem.call(this, index);
                }
            } else {
                _Window_ActorCommand_drawItem.call(this, index);
            }
        } else {
            // For non-icon-only commands, this will also use the new dimmed opacity
            // due to the translucentOpacity override.
            _Window_ActorCommand_drawItem.call(this, index);
        }
    };
    
    const _Window_ActorCommand_updateHelp = Window_ActorCommand.prototype.updateHelp;
    Window_ActorCommand.prototype.updateHelp = function() {
        const command = this.currentData(); 
        if (command && isIconOnlySkillCommand(command)) {
            if (this._helpWindow) this._helpWindow.setText("");
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
        if (this instanceof Window_ActorCommand && this._aaIconOnlyCmd_IconSetReadyListener) {
            this._aaIconOnlyCmd_IconSetReadyListener = null; 
        }
        _Window_Command_destroy.call(this, options);
    };

})();