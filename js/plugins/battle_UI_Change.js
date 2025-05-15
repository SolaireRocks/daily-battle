/*:
@target MZ
@plugindesc Removes Actor Status Window and modifies Battle Skill Menu.
@author YourName (Modified by AI)
@version 1.1.0
@help
This plugin has two main functions:

1. Hides and effectively removes the actor status window
   (the one that displays actor faces, HP, MP, TP) from the battle scene.

2. Modifies the battle skill menu (Window_BattleSkill) to:
   - Be wider, occupying approximately the left half of the screen.
   - Display skills in two columns.
   - Maintain its original calculated height.

Simply install and enable this plugin. No configuration needed.
*/

(() => {
'use strict';

// --- Original Plugin: Remove Window_BattleStatus ---
// This is the window responsible for displaying party member statuses in battle.

const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
    _Window_BattleStatus_initialize.call(this, rect);
    this.openness = 0;      // Start fully closed/invisible
    this.visible = false;   // Explicitly set to not visible
    this.width = 0;         // Make it take no actual screen space
    this.height = 0;        // Make it take no actual screen space
    this.active = false;    // Ensure it doesn't become active
    
    if (this.contents) {
        this.contents.clear();
    }
    if (this.contentsBack) {
        this.contentsBack.clear();
    }
};

Window_BattleStatus.prototype.open = function() {
    this.openness = 0;
    this.visible = false;
};

Window_BattleStatus.prototype.show = function() {
    this.visible = false;
};

Window_BattleStatus.prototype.refresh = function() {
    if (this.contents) {
        this.contents.clear();
    }
    if (this.contentsBack) {
        this.contentsBack.clear();
    }
};

Window_BattleStatus.prototype.drawItem = function(/*index*/) {
    // Do nothing
};

const _Window_BattleStatus_selectActor = Window_BattleStatus.prototype.selectActor;
Window_BattleStatus.prototype.selectActor = function(actor) {
    if (this.width === 0 && this.height === 0) {
         _Window_BattleStatus_selectActor.call(this,actor);
         this.visible = false;
         this.openness = 0;
        return;
    }
   _Window_BattleStatus_selectActor.call(this,actor);
};

const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
Window_BattleStatus.prototype.update = function() {
    _Window_BattleStatus_update.call(this);
    this.visible = false;
    this.openness = 0;
    this.width = 0;
    this.height = 0;
    this.active = false;
};

// --- New Modifications: Adjust Window_BattleSkill ---

// Modify the rectangle for the Skill Window
const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
Scene_Battle.prototype.skillWindowRect = function() {
    // Call the original function to get the default y and height.
    // The original skillWindowRect logic:
    // const ww = this.statusWindowRect().width;
    // const wh = this.windowAreaHeight();
    // const wx = this._partyCommandWindow.active ? this._partyCommandWindow.width : 0;
    // const wy = this.helpWindowRect().y + this.helpWindowRect().height;
    // return new Rectangle(wx, wy, ww, wh);
    // So, originalRect.height will be this.windowAreaHeight()
    // and originalRect.y will be below the help window.
    const originalRect = _Scene_Battle_skillWindowRect.call(this);

    const newX = 0; // Position at the left edge of the screen
    const newWidth = Math.floor(Graphics.boxWidth / 2); // Half of the screen width
    const newY = originalRect.y; // Keep original Y (below help window)
    const newHeight = originalRect.height; // Keep original height (usually windowAreaHeight)

    return new Rectangle(newX, newY, newWidth, newHeight);
};

// Modify Window_BattleSkill to have 2 columns
const _Window_BattleSkill_maxCols = Window_BattleSkill.prototype.maxCols;
Window_BattleSkill.prototype.maxCols = function() {
    return 2;
};

// Optional: Adjust item width if necessary, though default calculation should work.
// If skill names are too long and get cut off with two columns, you might
// want to reduce padding or adjust how items are drawn.
// For now, we assume default itemWidth calculation is sufficient.
/*
const _Window_BattleSkill_itemWidth = Window_BattleSkill.prototype.itemWidth;
Window_BattleSkill.prototype.itemWidth = function() {
    // Default logic from Window_Selectable:
    // return Math.floor((this.innerWidth - this.itemPadding() * (this.maxCols() - 1)) / this.maxCols());
    // This should automatically adjust based on maxCols() and the new window width.
    // You could make it slightly smaller if needed:
    // return Math.floor((this.innerWidth - this.itemPadding() * (this.maxCols() - 1)) / this.maxCols()) - some_value;
    return _Window_BattleSkill_itemWidth.call(this); // Or just rely on inheritance
};
*/

// Ensure the skill window refreshes its layout properly when it's created with the new rect.
// This is generally handled by the engine, as the new rect is passed to its constructor.

})();