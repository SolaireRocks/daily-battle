/*:
 * @target MZ
 * @plugindesc Displays rounds taken, total damage dealt, and average damage per round for each battler. Uses '-' as separator.
 * @author YourName (e.g., OpenAI)
 * @version 1.0.3
 * @help
 * BattleDpsMeter.js
 *
 * This plugin tracks and displays combat statistics for actors and enemies
 * during battle. For each battler, it shows:
 * 1. Number of rounds/turns they have taken (actions performed).
 * 2. Total HP damage they have dealt.
 * 3. Average HP damage dealt per round/action they have taken.
 *
 * The format is: Rounds-TotalDamage-AverageDamage
 * Example: 2-8,000-4,000 (Numbers use comma separators, groups separated by hyphens)
 *
 * The stats are displayed to the right of each battler sprite.
 * Stats are reset at the beginning of each new battle.
 * Handles mirrored enemy sprites for text positioning.
 *
 * Plugin Parameters:
 *   Font Size: The size of the font for the DPS text.
 *   Text Color: The color of the DPS text (CSS format, e.g., #FFFFFF or white).
 *   X Offset: Horizontal offset from the visual right edge of the battler.
 *             Positive values move text further right.
 *   Y Offset: Vertical offset from the visual vertical center of the battler.
 *             Positive values move text down, negative move up.
 *   Text Width: Max width for the text bitmap. Adjust if numbers get very large
 *               and are cut off.
 *   Text Height: Max height for the text bitmap. Should be >= Font Size.
 *   Enable Debug Logs: Output detailed logs to console (F8/F12) for troubleshooting.
 *
 * Changelog:
 * v1.0.3:
 *  - Changed display separator from ',' to '-'. (e.g., "2-8,000-4,000")
 *  - Switched damage tracking to Game_Action.executeDamage, using target.result().hpDamage.
 *    This is more accurate for formula-based damage and multi-target skills.
 *  - Added handling for mirrored enemy sprites (this.scale.x < 0) to position
 *    text correctly on their visual right side, with appropriate text alignment.
 *  - Adjusted default Text Width to 200.
 * v1.0.2:
 *  - Fixed error "this.subject is not a function" in BattleManager.endAction.
 *  - Added extensive console logging for troubleshooting, toggleable via plugin parameter.
 * v1.0.1:
 *  - Initial release.
 *
 * @param fontSize
 * @text Font Size
 * @desc The size of the font for the DPS text.
 * @type number
 * @min 1
 * @default 16
 *
 * @param textColor
 * @text Text Color
 * @desc The color of the DPS text (CSS format, e.g., #FFFFFF or white).
 * @type string
 * @default #FFFFFF
 *
 * @param offsetX
 * @text X Offset
 * @desc Horizontal offset from the visual right edge of the battler.
 * @type number
 * @min -200
 * @max 200
 * @default 10
 *
 * @param offsetY
 * @text Y Offset
 * @desc Vertical offset from the visual vertical center of the battler.
 * @type number
 * @min -200
 * @max 200
 * @default -50 
 * 
 * @param textWidth
 * @text Text Width
 * @desc Max width for the text bitmap. Increase if large numbers get cut off.
 * @type number
 * @min 50
 * @default 200 
 *
 * @param textHeight
 * @text Text Height
 * @desc Max height for the text bitmap. Should be >= Font Size.
 * @type number
 * @min 10
 * @default 24
 *
 * @param enableDebugLogs
 * @text Enable Debug Logs
 * @desc Set to true to output detailed logs to the console (F8 or F12 in game).
 * @type boolean
 * @default false
 */

(() => {
    const pluginName = "BattleDpsMeter";
    const params = PluginManager.parameters(pluginName);

    const FONT_SIZE = parseInt(params.fontSize) || 16;
    const TEXT_COLOR = params.textColor || "#FFFFFF";
    const OFFSET_X = parseInt(params.offsetX) || 10;
    const OFFSET_Y = parseInt(params.offsetY) || -50;
    const TEXT_WIDTH = parseInt(params.textWidth) || 200;
    const TEXT_HEIGHT = parseInt(params.textHeight) || 24;
    const DEBUG_MODE = String(params.enableDebugLogs) === "true";

    if (DEBUG_MODE) console.log(`${pluginName}: Initializing. Debug Mode ON. v1.0.3`);

    // --- Data Storage & Reset ---

    const Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        Game_Battler_initMembers.call(this);
        this.clearDpsData();
    };

    Game_Battler.prototype.clearDpsData = function() {
        this._dpsRounds = 0;
        this._dpsTotalDamage = 0;
        if (DEBUG_MODE && this.name && typeof this.name === 'function') {
             console.log(`${pluginName}: Cleared DPS data for ${this.name()}`);
        } else if (DEBUG_MODE) {
            console.log(`${pluginName}: Cleared DPS data for a battler (name unknown).`);
        }
    };

    const BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        if (DEBUG_MODE) console.log(`${pluginName}: BattleManager.setup called. Clearing all DPS data.`);
        $gameParty.battleMembers().forEach(actor => actor && actor.clearDpsData());
        $gameTroop.members().forEach(enemy => enemy && enemy.clearDpsData());
        
        BattleManager_setup.call(this, troopId, canEscape, canLose);
        
        if (DEBUG_MODE) console.log(`${pluginName}: Clearing DPS data for newly setup troop & party members post-core setup.`);
        $gameTroop.members().forEach(enemy => enemy && enemy.clearDpsData());
        $gameParty.battleMembers().forEach(actor => actor && actor.clearDpsData());
    };
    
    // --- Round Tracking ---
    const BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        const subject = this._subject; 
        if (subject && subject.isAppeared && subject.isAppeared()) {
            const oldRounds = subject._dpsRounds || 0;
            subject._dpsRounds = oldRounds + 1;
            if (DEBUG_MODE) console.log(`${pluginName}: Action ended for ${subject.name()}. Rounds: ${oldRounds} -> ${subject._dpsRounds}`);
        } else if (DEBUG_MODE) {
            const subjectName = subject && subject.name ? subject.name() : "Unknown Subject";
            if (!subject) console.log(`${pluginName}: BattleManager.endAction - this._subject is null.`);
            else console.log(`${pluginName}: BattleManager.endAction - Subject ${subjectName} is not appeared or 'isAppeared' method missing.`);
        }
        BattleManager_endAction.call(this);
    };

    // --- Damage Tracking ---
    const Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        const subject = this.subject();
        
        // Call original function first, this allows target.result() to be populated with hpDamage.
        Game_Action_executeDamage.call(this, target, value);
        
        // Now, read the actual damage from the target's result.
        if (subject && target && target.result().isHit() && target.result().hpDamage > 0) {
            const actualDamageDealt = target.result().hpDamage;
            const oldDamage = subject._dpsTotalDamage || 0;
            subject._dpsTotalDamage = oldDamage + actualDamageDealt;
            if (DEBUG_MODE) {
                const targetName = target.name ? target.name() : "Unknown Target";
                console.log(`${pluginName}: [executeDamage] ${subject.name()} caused ${actualDamageDealt} HP damage to ${targetName}. Total for ${subject.name()}: ${oldDamage} -> ${subject._dpsTotalDamage}`);
            }
        } else if (DEBUG_MODE && subject && target) {
            const subjectName = subject.name ? subject.name() : "Unknown Subject";
            const targetName = target.name ? target.name() : "Unknown Target";
            if (!target.result().isHit()) {
                 console.log(`${pluginName}: [executeDamage] ${subjectName}'s attack missed or was evaded by ${targetName}.`);
            } else if (target.result().hpDamage <= 0) {
                 console.log(`${pluginName}: [executeDamage] ${subjectName}'s attack resulted in 0 or less HP damage to ${targetName} (Damage: ${target.result().hpDamage}).`);
            }
        }
    };

    // --- Display ---
    const Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function() {
        Sprite_Battler_initMembers.call(this);
        this.createDpsDisplaySprite();
        this._dpsLastRounds = -1; 
        this._dpsLastTotalDamage = -1;
        if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Sprite_Battler_initMembers for ${this._battler.name()}, DPS sprite created.`);
    };

    Sprite_Battler.prototype.createDpsDisplaySprite = function() {
        this._dpsTextSprite = new Sprite(new Bitmap(TEXT_WIDTH, TEXT_HEIGHT));
        // Anchor X will be set dynamically based on mirroring. Default to 0.
        this._dpsTextSprite.anchor.x = 0; 
        this._dpsTextSprite.anchor.y = 0.5;
        this.addChild(this._dpsTextSprite);
    };

    const Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        Sprite_Battler_update.call(this);
        if (this._battler && this._dpsTextSprite) {
            this.updateDpsText();
        } else if (this._dpsTextSprite && this._dpsTextSprite.visible) {
            if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Hiding DPS text for ${this._battler.name()} (no battler or sprite).`);
            this._dpsTextSprite.visible = false;
        }
    };

    Sprite_Battler.prototype.updateDpsText = function() {
        if (!this._battler || !this._battler.isAppeared() || !this._battler.isAlive()) {
            if (this._dpsTextSprite.visible) {
                if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Hiding DPS text for ${this._battler.name()} (not appeared or not alive).`);
                this._dpsTextSprite.visible = false;
            }
            return;
        }
        
        if (!this._dpsTextSprite.visible) {
            if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Making DPS text visible for ${this._battler.name()}.`);
            this._dpsTextSprite.visible = true;
        }

        const rounds = this._battler._dpsRounds || 0;
        const totalDamage = this._battler._dpsTotalDamage || 0;

        if (rounds === this._dpsLastRounds && totalDamage === this._dpsLastTotalDamage) {
            this.updateDpsTextPositionIfNeeded();
            return;
        }

        if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Updating DPS text for ${this._battler.name()}. R: ${rounds}, D: ${totalDamage}. LastR: ${this._dpsLastRounds}, LastD: ${this._dpsLastTotalDamage}`);

        this._dpsLastRounds = rounds;
        this._dpsLastTotalDamage = totalDamage;

        const avgDmg = rounds > 0 ? Math.round(totalDamage / rounds) : 0;
        // Format with commas for numbers, but hyphens as separators between R-D-A
        const text = `${rounds.toLocaleString()}-${totalDamage.toLocaleString()}-${avgDmg.toLocaleString()}`;

        const bitmap = this._dpsTextSprite.bitmap;
        bitmap.clear();
        bitmap.fontSize = FONT_SIZE;
        bitmap.textColor = TEXT_COLOR;

        // Determine text alignment based on mirroring (for enemies)
        // Actors (Sprite_Actor) usually aren't mirrored this way (this.scale.x). SV actors handle facing via different sprites.
        // Enemies (Sprite_Enemy) use this.scale.x = -1 for mirroring.
        const isMirrored = this.scale.x < 0 && this._battler.isEnemy();
        const textAlign = isMirrored ? 'right' : 'left';
        
        bitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, textAlign);

        this.updateDpsTextPosition(); // Always update position after text content changes
    };
    
    Sprite_Battler.prototype.updateDpsTextPositionIfNeeded = function() {
        if (this._battler && (this._dpsTextSprite._cachedBattlerX !== this.x || this._dpsTextSprite._cachedBattlerY !== this.y || this._dpsTextSprite._cachedBattlerScaleX !== this.scale.x)) {
            this.updateDpsTextPosition();
        }
    };

    Sprite_Battler.prototype.updateDpsTextPosition = function() {
        if (!this._battler) return;

        let battlerVisualWidth = 0;
        let battlerVisualHeight = 0;

        if (this._mainSprite && this._mainSprite.bitmap) { // SV Actors
            battlerVisualWidth = this._mainSprite.width * (this._mainSprite.scale ? this._mainSprite.scale.x : 1);
            battlerVisualHeight = this._mainSprite.height * (this._mainSprite.scale ? this._mainSprite.scale.y : 1);
        } else if (this.bitmap) { // Static enemies or non-SV actors
            battlerVisualWidth = this.width; 
            battlerVisualHeight = this.height;
        } else { 
            battlerVisualWidth = 64; 
            battlerVisualHeight = 64;
            if (DEBUG_MODE && this._battler && this._battler.name) console.warn(`${pluginName}: Could not determine visual size for ${this._battler.name()}, using fallback 64x64.`);
        }
        
        const isMirrored = this.scale.x < 0 && this._battler.isEnemy();

        if (isMirrored) {
            this._dpsTextSprite.anchor.x = 1; // Anchor to the right of the text sprite
            // Position text's right anchor to the (visual) right of the enemy.
            // Enemy's visual right (when mirrored) is at its local -width/2.
            // OFFSET_X (positive) moves it further "visually right" (i.e., more negative locally).
            this._dpsTextSprite.x = -(battlerVisualWidth / 2) - OFFSET_X;
        } else {
            this._dpsTextSprite.anchor.x = 0; // Anchor to the left of the text sprite
            // Position text's left anchor to the (visual) right of the actor/enemy.
            // Battler's visual right is at its local +width/2.
            // OFFSET_X (positive) moves it further "visually right" (i.e., more positive locally).
            this._dpsTextSprite.x = (battlerVisualWidth / 2) + OFFSET_X;
        }
        
        // Y position: Anchor Y is 0.5. Place text's vertical center relative to battler's visual center.
        // (-battlerVisualHeight / 2) is the battler's visual vertical center from its origin (feet).
        // OFFSET_Y (negative) moves text up, (positive) moves it down.
        this._dpsTextSprite.y = (-battlerVisualHeight / 2) + OFFSET_Y; 

        // Cache battler's state for updateDpsTextPositionIfNeeded
        this._dpsTextSprite._cachedBattlerX = this.x;
        this._dpsTextSprite._cachedBattlerY = this.y;
        this._dpsTextSprite._cachedBattlerScaleX = this.scale.x;

        if (DEBUG_MODE && this._battler && this._battler.name && Math.random() < 0.01) { // Log occasionally
             console.log(`${pluginName}: Position for ${this._battler.name()}: Mirrored=${isMirrored}, AnchorX=${this._dpsTextSprite.anchor.x}, SpriteX=${this.x}, TextRelX=${this._dpsTextSprite.x}, OffsetX=${OFFSET_X}`);
        }
    };

    const Sprite_Battler_destroy = Sprite_Battler.prototype.destroy;
    Sprite_Battler.prototype.destroy = function(options) {
        if (this._dpsTextSprite) {
            if (DEBUG_MODE && this._battler && this._battler.name) console.log(`${pluginName}: Destroying DPS sprite for ${this._battler.name()}`);
            if (this._dpsTextSprite.bitmap) {
                this._dpsTextSprite.bitmap.destroy();
            }
            this.removeChild(this._dpsTextSprite);
            this._dpsTextSprite.destroy();
            this._dpsTextSprite = null;
        }
        Sprite_Battler_destroy.call(this, options);
    };

})();