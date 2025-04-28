//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 * 
 * ---
 * 
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 * ---
 * 
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.18: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where adding states with Action Times+ would add too many
 *    actions. Fix made by Olivia.
 * 
 * Version 1.17: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <OTB Target Follow Turn: +x> and similar notetags
 *    altered the following turn regardless of the presence of the target in 
 *    current turn order. Fix made by Olivia.
 * 
 * Version 1.16: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Auto Skill Triggers. Update by Arisu.
 * 
 * Version 1.15: May 16, 2024
 * * Feature Update!
 * ** Direct removal of stun states will restore actions for battlers for
 *    current turns and follow up turns. Update made by Olivia.
 * 
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

function _0x4816(_0x4d643e,_0x336989){const _0x383b75=_0x383b();return _0x4816=function(_0x4816af,_0x14101c){_0x4816af=_0x4816af-0x153;let _0x5401be=_0x383b75[_0x4816af];return _0x5401be;},_0x4816(_0x4d643e,_0x336989);}const _0x5e0d52=_0x4816;(function(_0x3152e7,_0x203b91){const _0x22f491=_0x4816,_0x1dfa28=_0x3152e7();while(!![]){try{const _0x556efb=parseInt(_0x22f491(0x2c3))/0x1+-parseInt(_0x22f491(0x21c))/0x2*(parseInt(_0x22f491(0x178))/0x3)+parseInt(_0x22f491(0x368))/0x4+parseInt(_0x22f491(0x35e))/0x5+parseInt(_0x22f491(0x2f8))/0x6+parseInt(_0x22f491(0x277))/0x7*(parseInt(_0x22f491(0x2cc))/0x8)+-parseInt(_0x22f491(0x243))/0x9;if(_0x556efb===_0x203b91)break;else _0x1dfa28['push'](_0x1dfa28['shift']());}catch(_0x24d818){_0x1dfa28['push'](_0x1dfa28['shift']());}}}(_0x383b,0xe3ada));function _0x383b(){const _0x13ca9d=['removeActionBattlersOTB','checkOpacity','ARRAYEVAL','otbShiftTurnOrderForSubject','updateSelectionEffect','_last_otb_actionPlusSetLength','includes','_tempBattler','prototype','setSkill','defaultPosition','commandAttack','onTurnEnd','OtbTurnOrderClearActorGraphic','_otbTurnOrderWindow','_spriteContainer','_previewNext','_otbTurnOrderIconIndex','otbAddBattlerToTurnOrderAtStart','isTpb','index','active','_nextTurn','sortContainer','UiCurrentOffsetY','_graphicHue','%1SystemBorder','BattleManager_battleSys','battlerName','_homeY','RepositionTopForHelp','iconWidth','Mechanics','ActionBattlersFilter','isBattleSystemOTBTurnOrderVisible','ConvertAgiBuffNext','BattleManager_selectNextActor','ActionBattlersNextFilter','addState','Game_Battler_onBattleStart','refresh','Scene_Battle_onItemOk','makeActionOrdersOTB','exit','ARRAYFUNC','loadSvActor','setBattleSystemOTBTurnOrderVisible','startActorCommandSelection','Game_Action_applyGlobal','removeUnableTurnOrderSprites','createTurnOrderOTBGraphicFaceName','_graphicFaceName','_positionDuration','updateStateTurns','ConvertAgiDebuffCurrent','InitialSpeedJS','Scene_Battle_commandCancel','boxHeight','calculateTargetPositions','ConvertAgiBuffCurrent','parse','TurnOrderOTBGraphicType','repositionLogWindowOTB','randomInt','map','battleSys','EnemyBattlerFaceIndex','_actorWindow','_nextX','attack','fillRect','svActorHorzCells','EnemyBattlerIcon','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','RepositionLogWindow','BgDimStyle','onBattleStart','auto','bind','Scene_Battle_onSkillCancel','applyBattleItemWindowOTB','BgImageOffsetX','UiCurrentOffsetX','_otbTurnOrderVisible','bitmap','_blendColor','gradient','_isAlive','_bgImageSprite','JSON','otbUnshiftBattlerToTurnOrders','Game_Battler_removeState','processSpriteRemoval','137890dZFVjH','UserCurrOrder','svBattlerName','PostStunInfinitySpeed','BattleManager_isTpb','getBorderThickness','reduce','EnemyBattlerDrawLetter','makeDeepCopy','LogWindowOffsetY','BgImageFilename','battleMembers','addBattlerToTurnOrderAtStart','create','isAppeared','_windowLayer','drawDimmedArea','windowRect','_subjectX','BattleSystemOTB','Scene_Battle_commandGuard','_containerWidth','initialize','getStateIdWithName','makeOTBSpeed','isTurnBased','_cache_makeActionTimesOTB','clearRect','BattleManager_isActiveTpb','right','concat','applyGlobalBattleSystemOTB','Game_Battler_onTurnEnd','faceHeight','UiFontSize','enemy','addForceActionBattler','InfinityClamp','ShowMarkerBg','30755772eAEbGX','contents','Scene_Battle_onEnemyOk','TargetAddActionCurrent','Game_Action_applyItemUserEffect','isUsingSideviewUiLayout','createOrderPreview','BattleManager_processTurn','_handlers','SubjectDistance','_index','performActionEndOTB','otbCalcUserNextOrderChange','currentSymbol','onActorOk','stepForward','updateLetter','refreshTurnOrder','_positionTargetY','Scene_Battle_commandAttack','STRUCT','createBorderSprite','IconIndex','TargetCurrOrder','StatusWindow','RepositionTopHelpY','UiSubjectText','getBattleSystem','icon','EVAL','onSkillOk','call','status','Scene_Battle_onActorCancel','shiftNextTurnSpritesToCurrentTurn','ARRAYSTRUCT','currentExt','_otb_actionBattlersNext','transparent','inputtingAction','return\x200','drawBgImage','OrderDirection','setOTBGraphicIconIndex','otbAddForceActionBattler','_instance','ShowMarkerBorder','onBattleEndOTB','Game_Party_addActor','clear','onBattleStartOTB','clearOrderPreview','202853XgAqoK','turnOrderChangeOTB','postEndActionOTB','trim','#000000','close','requestUpdateTurnOrders','image','isNextOtbSubject','decideRandomTarget','_homeX','Window_Help_setItem','_previewCurrent','PreviewScale','description','DisplayOffsetX','battler','startInput','VisuMZ_3_SideviewBattleUI','face','center','_ogWindowLayerY','UserAddActionNext','BattleManager_setup','setItem','createTurnOrderOTBGraphicIconIndex','NUM','blt','lineHeight','left','visible','otbShiftNextTurnSpritesToCurrentTurn','ceil','anchor','_graphicSprite','makeActionTimesOTB','clearMakeActionTimesCacheOTB','Enemy','boxWidth','BattleManager_getNextSubject','updatePosition','removeStatesAuto','dimColor1','isStateAffected','RegExp','%1BgColor1','isActor','canInput','BattleManager_endTurn','processUpdateGraphic','isInfinitySpeedOTB','BattleManager_makeActionOrders','TargetFollOrder','_spriteGroupWidth','onEnemyOk','allBattleMembers','updateTurnOrders','Scene_Battle_createAllWindows','selectNextActor','TurnOrderOTBGraphicFaceIndex','initMembers','ConvertAgiDebuffNext','Game_Battler_addState','addChild','endAction','registerCommand','makeNextActionOrdersOTB','_letter','BattleManager_startInput','addBattlerToTurnOrderAtEnd','bitmapHeight','format','_inputting','match','otbRemoveUnableTurnOrderSprites','width','1259557izhDVJ','_hidden','calculateTargetIndex','mainFontFace','note','UserNextOrder','Game_BattlerBase_recoverAll','_fadeDuration','_sourceArray','184DSJoKx','applyGlobal','Game_Battler_makeSpeed','BattleManager_isTurnBased','changeSvActorGraphicBitmap','Game_Battler_makeActionTimes','selectNextCommand','EnableActionTimes','createOTBTurnOrderWindow','allowRandomSpeed','_graphicFaceIndex','additionalTargetXAdjustments','isHorz','_graphicType','otbCalcUserCurrentOrderChange','drawUiText','isPartyCommandWindowDisabled','createTurnOrderSprites','push','actionPlusSet','_statusWindow','recoverAll','_fadeSpeed','canChangeOtbTurnOrder','_phase','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','appear','PreviewOffsetY','setText','_preemptive','EnemyBattlerFontSize','UserFollOrder','ARRAYJSON','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Battler_forceAction','setup','adjustForPreview','resetFontSettings','_contentsBackSprite','currentAction','isBattleMember','STR','_letterSprite','Scene_Battle_onEnemyCancel','7590300iKRIVB','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','splice','otbAddBattlerToTurnOrderAtEnd','needsSelection','_surprise','_speed','_currentTurn','_otbTurnOrderFaceIndex','otbReturnBattlerToTurnOrders','filter','SpriteThin','UiNextText','getInfinityClamp','onItemCancel','item','toUpperCase','OTB_STUN_INFINITY_SPEED','previewOrderByAction','opacity','max','OTB_CONVERT_AGI_BUFF_NEXT_TURN','changeSourceArray','createTurnOrderOTBGraphicFaceIndex','clearTurnOrderOTBGraphics','otbApplyActionTimes','actor','_previewContainer','svactor','findIndex','initHomePositions','actorCommandSingleSkill','_logWindow','name','drawText','_otb_createdFirstTurnOrders','VisuMZ_1_BattleCore','commandGuard','BorderThickness','_graphicIconIndex','ConvertSpeedJS','MoveDistance','otbPreviewOrderClear','removeCurrentSubject','createActorCommandWindow','Scene_Battle_onItemCancel','loadSvEnemy','ARRAYNUM','_tempActor','effects','_backgroundSprite','otbProcessActionCheck','OtbTurnOrderEnemyFace','_requestTurnOrderUpdate','makeActions','select','OtbTurnOrderActorIcon','otbAddActions','forceActionOTB','initBattleSystemOTB','loadSystem','AllowRandomSpeed','EnemyBattlerFaceName','isSceneBattle','ActorBattlerIcon','makeActionOrders','_plural','getStateTooltipBattler','commandCancelOTB','isEnemy','remove','otbCreateNewTurnOrderSprites','iconHeight','applyItemUserEffect','subject','_otbTurnOrderFaceName','preEndActionOTB','Game_Actor_selectNextCommand','removeState','BattleManager_finishActorInput','Conversion','_offset','WidthBase','otbPreviewOrderChange','code','IconSet','canMove','addLoadListener','makeSpeed','finishActorInput','forceAction','TurnOrderOTBGraphicIconIndex','getNextSubject','_otbTimesActedThisTurn','update','resumeTurnOrderSprites','updateOpacity','unshift','Game_Party_removeActor','UiSubjectOffsetY','updateVisibility','createInitialPositions','6042175WyJIck','makeActionTimes','Game_BattlerBase_hide','Game_Battler_onBattleEnd','UiSubjectOffsetX','FaceName','getColor','round','processTurnOTB','_graphicEnemy','352836oGvEpR','Settings','onItemOk','changeFaceGraphicBitmap','DisplayPosition','battleEnd','isSideView','top','Actors','_graphicSv','floor','_actions','Actor','changeEnemyGraphicBitmap','TurnOrder','containerWindow','isBattleItemWindowOTB','dimColor2','_fadeTarget','Scene_Battle_onSkillOk','updatePadding','Game_System_initialize','_unit','Enemies','faceIndex','Scene_Battle_commandFight','speed','pop','otbCalcTargetNextOrderChange','gradientFillRect','contentsOpacity','dataId','createActorCommandWindowOTB','Game_Battler_performCollapse','otbGainInstant','_isBattleOver','members','ScreenBuffer','PreviewOffsetX','deathStateId','setHue','cancel','_ogWindowLayerX','Scene_Battle_actorCommandSingleSkill','height','startInputOTB','isActiveTpb','_containerHeight','battlerHue','applyItemAddedActionOTB','moveToPosition','parameters','bitmapWidth','OtbTurnOrderClearEnemyGraphic','VisuMZ_0_CoreEngine','fontSize','BgImageOffsetY','constructor','createOrderPreviewSprite','updateGraphic','Window_Selectable_select','startTurn','_otbTurnOrderGraphicType','_stateIDs','otbRemoveCurrentSubject','EFFECT_ADD_DEBUFF','endTurn','isPreviousSceneBattleTransitionable','GetAllIndicies','6eHkBhw','ConvertParams','createBackgroundSprite','EnemyBattlerFontFace','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','isOTB','onTurnEndOTB','changeIconGraphicBitmap','SpriteLength','bottom','shift','EnemyBattlerType','createTurnOrderOTBGraphicType','containerPosition','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processTurn','Game_Action_speed','removeSprite','UpdateFrames','children','_actionBattlers','otbCalcTargetCurrentOrderChange','%1BgColor2','Game_Action_allowRandomSpeed','EFFECT_ADD_BUFF','commandCancel','_currentActor','OTB_ADDED_ACTION_TIMES','SystemTurnOrderVisibility','onActorCancel','length','createSpriteContainers','getUnitSideSide','PreviewActor','indexOf','_forcedBattlers','_scene','_currentX','onBattleEnd','VisuMZ_2_PartySystem','createGraphicSprite','applyItemTargetEffectOTB','hide','performCollapse','initMembersOTB','shiftTurnOrderForSubject','scale','svActorVertCells','createAllWindows','startFade','createNewTurnOrderSprites','UiCurrentText','_forceAction','sort','min','faceWidth','setBlendColor','commandFight','isAlive','createChildren','OtbTurnOrderEnemyIcon','UiAlignment','RepositionTopHelpX','_isAppeared','_positionTargetX','hasSvBattler','_actorCommandWindow','_subject','onSkillCancel','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','TurnOrderOTBGraphicFaceName'];_0x383b=function(){return _0x13ca9d;};return _0x383b();}var label=_0x5e0d52(0x22f),tier=tier||0x0,dependencies=[_0x5e0d52(0x169),_0x5e0d52(0x31c)],pluginData=$plugins[_0x5e0d52(0x302)](function(_0x38f890){const _0x534c65=_0x5e0d52;return _0x38f890[_0x534c65(0x263)]&&_0x38f890[_0x534c65(0x285)][_0x534c65(0x1c5)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5e0d52(0x369)]||{},VisuMZ['ConvertParams']=function(_0x435f25,_0x1ee5e0){const _0x58234a=_0x5e0d52;for(const _0x5b1936 in _0x1ee5e0){if(_0x5b1936['match'](/(.*):(.*)/i)){const _0x177102=String(RegExp['$1']),_0x491656=String(RegExp['$2'])['toUpperCase']()[_0x58234a(0x27a)]();let _0xc15ca7,_0x2d6440,_0x498a9c;switch(_0x491656){case _0x58234a(0x291):_0xc15ca7=_0x1ee5e0[_0x5b1936]!==''?Number(_0x1ee5e0[_0x5b1936]):0x0;break;case _0x58234a(0x327):_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0x1caea8=>Number(_0x1caea8));break;case _0x58234a(0x260):_0xc15ca7=_0x1ee5e0[_0x5b1936]!==''?eval(_0x1ee5e0[_0x5b1936]):null;break;case _0x58234a(0x1c1):_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON['parse'](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0x2b2700=>eval(_0x2b2700));break;case _0x58234a(0x218):_0xc15ca7=_0x1ee5e0[_0x5b1936]!==''?JSON['parse'](_0x1ee5e0[_0x5b1936]):'';break;case _0x58234a(0x2ec):_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0x246a1f=>JSON[_0x58234a(0x1fb)](_0x246a1f));break;case'FUNC':_0xc15ca7=_0x1ee5e0[_0x5b1936]!==''?new Function(JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936])):new Function(_0x58234a(0x26b));break;case _0x58234a(0x1eb):_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0x4b0bbc=>new Function(JSON[_0x58234a(0x1fb)](_0x4b0bbc)));break;case _0x58234a(0x2f5):_0xc15ca7=_0x1ee5e0[_0x5b1936]!==''?String(_0x1ee5e0[_0x5b1936]):'';break;case'ARRAYSTR':_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0xa89775=>String(_0xa89775));break;case _0x58234a(0x257):_0x498a9c=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):{},_0xc15ca7=VisuMZ['ConvertParams']({},_0x498a9c);break;case _0x58234a(0x266):_0x2d6440=_0x1ee5e0[_0x5b1936]!==''?JSON[_0x58234a(0x1fb)](_0x1ee5e0[_0x5b1936]):[],_0xc15ca7=_0x2d6440[_0x58234a(0x1ff)](_0x1ec679=>VisuMZ[_0x58234a(0x179)]({},JSON[_0x58234a(0x1fb)](_0x1ec679)));break;default:continue;}_0x435f25[_0x177102]=_0xc15ca7;}}return _0x435f25;},(_0x67a28a=>{const _0x2b3a67=_0x5e0d52,_0x1ee8f7=_0x67a28a['name'];for(const _0x39d112 of dependencies){if(!Imported[_0x39d112]){alert(_0x2b3a67(0x2ed)[_0x2b3a67(0x2be)](_0x1ee8f7,_0x39d112)),SceneManager['exit']();break;}}const _0x20b0fb=_0x67a28a[_0x2b3a67(0x285)];if(_0x20b0fb[_0x2b3a67(0x2c0)](/\[Version[ ](.*?)\]/i)){const _0xec359=Number(RegExp['$1']);_0xec359!==VisuMZ[label]['version']&&(alert(_0x2b3a67(0x2e5)[_0x2b3a67(0x2be)](_0x1ee8f7,_0xec359)),SceneManager[_0x2b3a67(0x1ea)]());}if(_0x20b0fb[_0x2b3a67(0x2c0)](/\[Tier[ ](\d+)\]/i)){const _0x409e7d=Number(RegExp['$1']);_0x409e7d<tier?(alert(_0x2b3a67(0x186)[_0x2b3a67(0x2be)](_0x1ee8f7,_0x409e7d,tier)),SceneManager[_0x2b3a67(0x1ea)]()):tier=Math[_0x2b3a67(0x30c)](_0x409e7d,tier);}VisuMZ[_0x2b3a67(0x179)](VisuMZ[label][_0x2b3a67(0x369)],_0x67a28a[_0x2b3a67(0x166)]);})(pluginData),PluginManager[_0x5e0d52(0x2b8)](pluginData[_0x5e0d52(0x319)],_0x5e0d52(0x330),_0x40c14c=>{const _0xa90c10=_0x5e0d52;VisuMZ['ConvertParams'](_0x40c14c,_0x40c14c);const _0x701e8=_0x40c14c[_0xa90c10(0x370)],_0x202192=_0x40c14c['IconIndex'];for(const _0x1176ef of _0x701e8){const _0xc4998a=$gameActors[_0xa90c10(0x312)](_0x1176ef);if(!_0xc4998a)continue;_0xc4998a[_0xa90c10(0x171)]=_0xa90c10(0x25f),_0xc4998a[_0xa90c10(0x1d0)]=_0x202192;}}),PluginManager[_0x5e0d52(0x2b8)](pluginData['name'],'OtbTurnOrderActorFace',_0x220432=>{const _0x2544b5=_0x5e0d52;VisuMZ[_0x2544b5(0x179)](_0x220432,_0x220432);const _0xeec99=_0x220432['Actors'],_0x5b1f5b=_0x220432[_0x2544b5(0x363)],_0x1e8db6=_0x220432['FaceIndex'];for(const _0x573cee of _0xeec99){const _0x4ef341=$gameActors[_0x2544b5(0x312)](_0x573cee);if(!_0x4ef341)continue;_0x4ef341['_otbTurnOrderGraphicType']=_0x2544b5(0x28a),_0x4ef341['_otbTurnOrderFaceName']=_0x5b1f5b,_0x4ef341[_0x2544b5(0x300)]=_0x1e8db6;}}),PluginManager[_0x5e0d52(0x2b8)](pluginData[_0x5e0d52(0x319)],_0x5e0d52(0x1cc),_0x5d85cd=>{const _0x4b6374=_0x5e0d52;VisuMZ[_0x4b6374(0x179)](_0x5d85cd,_0x5d85cd);const _0x35cea3=_0x5d85cd[_0x4b6374(0x370)];for(const _0x5f0546 of _0x35cea3){const _0x41b570=$gameActors[_0x4b6374(0x312)](_0x5f0546);if(!_0x41b570)continue;_0x41b570[_0x4b6374(0x310)]();}}),PluginManager[_0x5e0d52(0x2b8)](pluginData[_0x5e0d52(0x319)],_0x5e0d52(0x1b4),_0x908ce2=>{const _0x56692c=_0x5e0d52;VisuMZ[_0x56692c(0x179)](_0x908ce2,_0x908ce2);const _0x362704=_0x908ce2[_0x56692c(0x37f)],_0x5dfca6=_0x908ce2[_0x56692c(0x259)];for(const _0xeaf61c of _0x362704){const _0x4b6557=$gameTroop[_0x56692c(0x157)]()[_0xeaf61c];if(!_0x4b6557)continue;_0x4b6557[_0x56692c(0x171)]='icon',_0x4b6557['_otbTurnOrderIconIndex']=_0x5dfca6;}}),PluginManager[_0x5e0d52(0x2b8)](pluginData['name'],_0x5e0d52(0x32c),_0x4bb562=>{const _0x208339=_0x5e0d52;VisuMZ[_0x208339(0x179)](_0x4bb562,_0x4bb562);const _0x15e89e=_0x4bb562['Enemies'],_0x1c2921=_0x4bb562[_0x208339(0x363)],_0x8757b7=_0x4bb562['FaceIndex'];for(const _0x36b04e of _0x15e89e){const _0x249b34=$gameTroop['members']()[_0x36b04e];if(!_0x249b34)continue;_0x249b34[_0x208339(0x171)]=_0x208339(0x28a),_0x249b34[_0x208339(0x343)]=_0x1c2921,_0x249b34[_0x208339(0x300)]=_0x8757b7;}}),PluginManager[_0x5e0d52(0x2b8)](pluginData[_0x5e0d52(0x319)],_0x5e0d52(0x168),_0x1335a9=>{const _0x3d19f8=_0x5e0d52;VisuMZ[_0x3d19f8(0x179)](_0x1335a9,_0x1335a9);const _0x551f43=_0x1335a9['Enemies'];for(const _0x27d5a4 of _0x551f43){const _0x42bf7c=$gameTroop[_0x3d19f8(0x157)]()[_0x27d5a4];if(!_0x42bf7c)continue;_0x42bf7c[_0x3d19f8(0x310)]();}}),PluginManager[_0x5e0d52(0x2b8)](pluginData[_0x5e0d52(0x319)],_0x5e0d52(0x194),_0x1f56e0=>{const _0x25f490=_0x5e0d52;VisuMZ[_0x25f490(0x179)](_0x1f56e0,_0x1f56e0);const _0x454a5e=_0x1f56e0['Visible'];$gameSystem[_0x25f490(0x1ed)](_0x454a5e);}),VisuMZ['BattleSystemOTB']['RegExp']={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x5e0d52(0x233)]=function(_0x4d1693){const _0x5220ca=_0x5e0d52;_0x4d1693=_0x4d1693['toUpperCase']()[_0x5220ca(0x27a)](),this[_0x5220ca(0x172)]=this['_stateIDs']||{};if(this[_0x5220ca(0x172)][_0x4d1693])return this[_0x5220ca(0x172)][_0x4d1693];for(const _0x38d7f5 of $dataStates){if(!_0x38d7f5)continue;this[_0x5220ca(0x172)][_0x38d7f5['name'][_0x5220ca(0x308)]()[_0x5220ca(0x27a)]()]=_0x38d7f5['id'];}return this[_0x5220ca(0x172)][_0x4d1693]||0x0;},ImageManager[_0x5e0d52(0x206)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x5e0d52(0x1a7)]=ImageManager[_0x5e0d52(0x1a7)]||0x6,SceneManager['isSceneBattle']=function(){const _0x113403=_0x5e0d52;return this['_scene']&&this[_0x113403(0x19c)][_0x113403(0x16c)]===Scene_Battle;},VisuMZ['BattleSystemOTB']['BattleManager_setup']=BattleManager['setup'],BattleManager[_0x5e0d52(0x2ef)]=function(_0x50c09c,_0x20da5b,_0x570d5b){const _0x1b2d88=_0x5e0d52;VisuMZ[_0x1b2d88(0x22f)][_0x1b2d88(0x28e)][_0x1b2d88(0x262)](this,_0x50c09c,_0x20da5b,_0x570d5b),this[_0x1b2d88(0x1a4)]();},BattleManager[_0x5e0d52(0x1a4)]=function(){const _0x52cc45=_0x5e0d52;if(!this[_0x52cc45(0x17d)]())return;this[_0x52cc45(0x268)]=[],this[_0x52cc45(0x31b)]=![];},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1da)]=BattleManager[_0x5e0d52(0x200)],BattleManager['battleSys']=function(){const _0x3944c8=_0x5e0d52;if(this[_0x3944c8(0x17d)]())return'OTB';return VisuMZ[_0x3944c8(0x22f)][_0x3944c8(0x1da)][_0x3944c8(0x262)](this);},BattleManager['isOTB']=function(){const _0x4c6a0c=_0x5e0d52;return $gameSystem[_0x4c6a0c(0x25e)]()==='OTB';},VisuMZ[_0x5e0d52(0x22f)]['BattleManager_isTpb']=BattleManager[_0x5e0d52(0x1d2)],BattleManager[_0x5e0d52(0x1d2)]=function(){const _0x131415=_0x5e0d52;if(this['isOTB']())return![];return VisuMZ[_0x131415(0x22f)][_0x131415(0x220)][_0x131415(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x238)]=BattleManager['isActiveTpb'],BattleManager[_0x5e0d52(0x161)]=function(){const _0x53da02=_0x5e0d52;if(this['isOTB']())return![];return VisuMZ[_0x53da02(0x22f)][_0x53da02(0x238)][_0x53da02(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2cf)]=BattleManager['isTurnBased'],BattleManager[_0x5e0d52(0x235)]=function(){const _0x31d6c7=_0x5e0d52;if(this[_0x31d6c7(0x17d)]())return!![];return VisuMZ['BattleSystemOTB']['BattleManager_isTurnBased']['call'](this);},VisuMZ[_0x5e0d52(0x22f)]['BattleManager_startInput']=BattleManager[_0x5e0d52(0x288)],BattleManager[_0x5e0d52(0x288)]=function(){const _0x1f2552=_0x5e0d52;VisuMZ['BattleSystemOTB'][_0x1f2552(0x2bb)]['call'](this),this[_0x1f2552(0x17d)]()&&$gameParty[_0x1f2552(0x2a6)]()&&!this[_0x1f2552(0x2fd)]&&this[_0x1f2552(0x160)]();},BattleManager[_0x5e0d52(0x160)]=function(){const _0x5974c0=_0x5e0d52;this[_0x5974c0(0x170)]();},VisuMZ[_0x5e0d52(0x22f)]['BattleManager_processTurn']=BattleManager[_0x5e0d52(0x187)],BattleManager[_0x5e0d52(0x187)]=function(){const _0xcd6dbf=_0x5e0d52;this['isOTB']()?this['processTurnOTB']():VisuMZ[_0xcd6dbf(0x22f)]['BattleManager_processTurn'][_0xcd6dbf(0x262)](this);},BattleManager[_0x5e0d52(0x366)]=function(){const _0x38a0bb=_0x5e0d52,_0x191db7=this[_0x38a0bb(0x1bb)];if(_0x191db7[_0x38a0bb(0x2a5)]()&&_0x191db7[_0x38a0bb(0x2a6)]()){const _0x2fe501=_0x191db7[_0x38a0bb(0x2f3)]();if(!_0x2fe501)VisuMZ[_0x38a0bb(0x22f)]['BattleManager_processTurn'][_0x38a0bb(0x262)](this);else _0x2fe501[_0x38a0bb(0x1ac)]?VisuMZ[_0x38a0bb(0x22f)]['BattleManager_processTurn'][_0x38a0bb(0x262)](this):(this[_0x38a0bb(0x192)]=_0x191db7,this['startActorInput']());}else VisuMZ['BattleSystemOTB'][_0x38a0bb(0x24a)][_0x38a0bb(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x347)]=BattleManager[_0x5e0d52(0x351)],BattleManager[_0x5e0d52(0x351)]=function(){const _0x4e60a7=_0x5e0d52;this[_0x4e60a7(0x17d)]()?VisuMZ[_0x4e60a7(0x22f)][_0x4e60a7(0x24a)][_0x4e60a7(0x262)](this):VisuMZ[_0x4e60a7(0x22f)]['BattleManager_finishActorInput'][_0x4e60a7(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1e3)]=BattleManager['selectNextActor'],BattleManager[_0x5e0d52(0x2b1)]=function(){const _0x520a4e=_0x5e0d52;this[_0x520a4e(0x17d)]()?this['selectNextActorOTB']():VisuMZ[_0x520a4e(0x22f)][_0x520a4e(0x1e3)][_0x520a4e(0x262)](this);},BattleManager['selectNextActorOTB']=function(){const _0x5ca55e=_0x5e0d52;this[_0x5ca55e(0x192)]=null,this[_0x5ca55e(0x2bf)]=![];},VisuMZ[_0x5e0d52(0x22f)]['BattleManager_endAction']=BattleManager[_0x5e0d52(0x2b7)],BattleManager[_0x5e0d52(0x2b7)]=function(){const _0x532192=_0x5e0d52;this['preEndActionOTB'](),VisuMZ[_0x532192(0x22f)]['BattleManager_endAction'][_0x532192(0x262)](this),this[_0x532192(0x279)]();},BattleManager[_0x5e0d52(0x344)]=function(){const _0x1febf5=_0x5e0d52;if(!this[_0x1febf5(0x17d)]())return;this[_0x1febf5(0x1bf)]();this[_0x1febf5(0x1bb)]&&this['_subject'][_0x1febf5(0x24e)]();if(this[_0x1febf5(0x1bb)]&&this[_0x1febf5(0x1bb)][_0x1febf5(0x34e)]()&&this[_0x1febf5(0x18c)]['includes'](this['_subject'])){const _0x372275=this[_0x1febf5(0x1bb)][_0x1febf5(0x373)][_0x1febf5(0x302)](_0x30a2a8=>_0x30a2a8['_forceAction']);this[_0x1febf5(0x1bb)]['makeActions']();if(_0x372275){let _0x17d76f=_0x372275[_0x1febf5(0x196)];while(_0x17d76f--){this[_0x1febf5(0x1bb)][_0x1febf5(0x373)][_0x1febf5(0x383)]();}this['_subject'][_0x1febf5(0x373)]=_0x372275[_0x1febf5(0x23a)](this[_0x1febf5(0x1bb)][_0x1febf5(0x373)]);}}},BattleManager[_0x5e0d52(0x279)]=function(){const _0x339676=_0x5e0d52;if(!this[_0x339676(0x17d)]())return;this[_0x339676(0x1bf)]();this['_subject']&&(this['endBattlerActions'](this['_subject']),this[_0x339676(0x1bb)]=null);this[_0x339676(0x19b)]['length']>0x0&&(this['_subject']=this[_0x339676(0x354)]());;},BattleManager[_0x5e0d52(0x193)]=VisuMZ['BattleSystemOTB'][_0x5e0d52(0x369)][_0x5e0d52(0x1df)][_0x5e0d52(0x2d3)],BattleManager[_0x5e0d52(0x1bd)]=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x1df)]['RandomizeActionTimesOrder'],BattleManager['OTB_STUN_INFINITY_CLAMP']=VisuMZ['BattleSystemOTB']['Settings']['Mechanics'][_0x5e0d52(0x241)],VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2aa)]=BattleManager[_0x5e0d52(0x339)],BattleManager[_0x5e0d52(0x339)]=function(){const _0x579216=_0x5e0d52;this[_0x579216(0x17d)]()?this[_0x579216(0x1e9)]():VisuMZ[_0x579216(0x22f)][_0x579216(0x2aa)]['call'](this);},BattleManager[_0x5e0d52(0x1e9)]=function(){const _0x5d5ac0=_0x5e0d52;let _0x468bfc=this[_0x5d5ac0(0x31b)]?0x1:0x2;while(_0x468bfc--){this[_0x5d5ac0(0x2b9)]();}const _0x37d9ee=!this[_0x5d5ac0(0x31b)];this[_0x5d5ac0(0x31b)]=!![];},BattleManager[_0x5e0d52(0x2b9)]=function(){const _0x277acd=_0x5e0d52;this[_0x277acd(0x18c)]=this['_otb_actionBattlersNext'],this[_0x277acd(0x296)]();const _0x513874=[];_0x513874[_0x277acd(0x2de)](...$gameParty[_0x277acd(0x227)]()),_0x513874[_0x277acd(0x2de)](...$gameTroop[_0x277acd(0x157)]());for(const _0x20c091 of _0x513874){_0x20c091[_0x277acd(0x350)]();}_0x513874[_0x277acd(0x1ad)]((_0x340c61,_0x230a08)=>_0x230a08[_0x277acd(0x382)]()-_0x340c61[_0x277acd(0x382)]()),this[_0x277acd(0x268)]=_0x513874,this[_0x277acd(0x311)](),this['removeActionBattlersOTB'](),this[_0x277acd(0x33f)]();},BattleManager[_0x5e0d52(0x311)]=function(){const _0x3387f4=_0x5e0d52;if(!BattleManager[_0x3387f4(0x193)])return;const _0x3f9c25=this[_0x3387f4(0x268)],_0x2f1828=this[_0x3387f4(0x2ae)]();for(const _0xdd202b of _0x2f1828){if(!_0xdd202b)continue;if(!_0xdd202b[_0x3387f4(0x22a)]())continue;if(!_0xdd202b[_0x3387f4(0x1b2)]())continue;if(!_0x3f9c25[_0x3387f4(0x1c5)](_0xdd202b))continue;const _0x5d77ab=_0x3f9c25[_0x3387f4(0x19a)](_0xdd202b);let _0x46486c=_0xdd202b['makeActionTimes']()-0x1;while(_0x46486c--){let _0x5dc8fd=_0x5d77ab;BattleManager[_0x3387f4(0x1bd)]&&(_0x5dc8fd=Math[_0x3387f4(0x1fe)](_0x3f9c25['length']-_0x5d77ab)+_0x5d77ab),_0x3f9c25['splice'](_0x5dc8fd,0x0,_0xdd202b);}}},BattleManager[_0x5e0d52(0x1bf)]=function(){const _0x42524d=_0x5e0d52;if(!this[_0x42524d(0x17d)]())return;this[_0x42524d(0x18c)]=this[_0x42524d(0x18c)]||[],this[_0x42524d(0x18c)][_0x42524d(0x33e)](null),this[_0x42524d(0x18c)]['remove'](undefined),this[_0x42524d(0x18c)]=this['_actionBattlers'][_0x42524d(0x302)](_0x25af72=>_0x25af72[_0x42524d(0x2f4)]()),this['_actionBattlers']=this[_0x42524d(0x18c)]['filter'](_0x31f2b5=>VisuMZ[_0x42524d(0x22f)][_0x42524d(0x1e0)](_0x31f2b5)),this[_0x42524d(0x2fd)]&&(this[_0x42524d(0x18c)]=this[_0x42524d(0x18c)][_0x42524d(0x302)](_0x42da9a=>!_0x42da9a[_0x42524d(0x2a5)]())),this[_0x42524d(0x2e9)]&&(this[_0x42524d(0x18c)]=this['_actionBattlers'][_0x42524d(0x302)](_0x118327=>!_0x118327[_0x42524d(0x33d)]())),this[_0x42524d(0x268)]=this[_0x42524d(0x268)]||[],this[_0x42524d(0x268)][_0x42524d(0x33e)](null),this[_0x42524d(0x268)]['remove'](undefined),this['_otb_actionBattlersNext']=this[_0x42524d(0x268)][_0x42524d(0x302)](_0x14a3ca=>_0x14a3ca[_0x42524d(0x2f4)]()),this[_0x42524d(0x268)]=this[_0x42524d(0x268)][_0x42524d(0x302)](_0x5c34d8=>VisuMZ[_0x42524d(0x22f)][_0x42524d(0x1e4)](_0x5c34d8)),this[_0x42524d(0x2c1)](),this[_0x42524d(0x254)]();},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1e0)]=function(_0x28d9fe){const _0x119186=_0x5e0d52;if(!_0x28d9fe)return![];if(!_0x28d9fe[_0x119186(0x1b2)]())return![];if(!_0x28d9fe[_0x119186(0x22a)]())return![];return _0x28d9fe[_0x119186(0x34e)]();},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1e4)]=function(_0x3de986){const _0xf72f37=_0x5e0d52;if(!_0x3de986)return![];const _0x122a9e=JsonEx[_0xf72f37(0x224)](_0x3de986);return _0x122a9e['_tempActor']=!![],_0x122a9e[_0xf72f37(0x1c6)]=!![],_0x122a9e[_0xf72f37(0x1f4)](),_0x122a9e[_0xf72f37(0x2a0)](0x1),_0x122a9e[_0xf72f37(0x2a0)](0x2),_0x122a9e[_0xf72f37(0x1e7)](),VisuMZ['BattleSystemOTB'][_0xf72f37(0x1e0)](_0x122a9e);},BattleManager['turnOrderChangeOTB']=function(_0x268847,_0x30e4b2,_0x853f79){const _0x2c5647=_0x5e0d52;if(!_0x30e4b2)return;const _0x2d23bc=_0x853f79?this['_otb_actionBattlersNext']:this[_0x2c5647(0x18c)];if(!_0x2d23bc)return;if(!_0x2d23bc['includes'](_0x268847))return;const _0x1a9fa2=VisuMZ[_0x2c5647(0x22f)]['GetAllIndicies'](_0x268847,_0x2d23bc),_0x56941a=_0x853f79?VisuMZ[_0x2c5647(0x22f)]['getInfinityClamp'](_0x2d23bc):0x0,_0x2ac04f=_0x1a9fa2[_0x2c5647(0x196)]-0x1;for(let _0x28a59f=_0x2ac04f;_0x28a59f>=0x0;_0x28a59f--){_0x2d23bc[_0x2c5647(0x2fa)](_0x1a9fa2[_0x28a59f],0x1);}for(var _0x454679=0x0;_0x454679<_0x1a9fa2[_0x2c5647(0x196)];_0x454679++){var _0x3513de=(_0x1a9fa2[_0x454679]-_0x30e4b2)['clamp'](_0x56941a,_0x2d23bc[_0x2c5647(0x196)]);_0x2d23bc[_0x2c5647(0x2fa)](_0x3513de,0x0,_0x268847);}this[_0x2c5647(0x1bf)](),this[_0x2c5647(0x254)]();},VisuMZ['BattleSystemOTB']['GetAllIndicies']=function(_0x152399,_0x118e8e){const _0x2ab6f3=_0x5e0d52,_0x17bc57=[],_0x25b5a7=_0x118e8e[_0x2ab6f3(0x196)];for(let _0x1d67ae=0x0;_0x1d67ae<_0x25b5a7;_0x1d67ae++){if(_0x118e8e[_0x1d67ae]===_0x152399)_0x17bc57[_0x2ab6f3(0x2de)](_0x1d67ae);}return _0x17bc57;},VisuMZ[_0x5e0d52(0x22f)]['getInfinityClamp']=function(_0x5afce7){const _0x9fe447=_0x5e0d52;if(!BattleManager['OTB_STUN_INFINITY_CLAMP'])return 0x0;if(!_0x5afce7)return 0x0;let _0x40cab3=0x0;const _0x712d2f=_0x5afce7[_0x9fe447(0x196)];for(let _0x40a90b=0x0;_0x40a90b<_0x712d2f;_0x40a90b++){const _0x3df79d=_0x5afce7[_0x40a90b];if(!_0x3df79d)continue;if(_0x3df79d[_0x9fe447(0x382)]()!==Infinity)return _0x40a90b;else _0x40cab3++;}return _0x40cab3;},BattleManager[_0x5e0d52(0x296)]=function(){const _0x3fd3f9=_0x5e0d52;if(!this[_0x3fd3f9(0x17d)]())return;const _0x5735a1=SceneManager[_0x3fd3f9(0x19c)]['_otbTurnOrderWindow'];if(!_0x5735a1)return;_0x5735a1[_0x3fd3f9(0x265)]();},BattleManager[_0x5e0d52(0x33f)]=function(){const _0x1ef168=_0x5e0d52;if(!this[_0x1ef168(0x17d)]())return;const _0x397898=SceneManager[_0x1ef168(0x19c)][_0x1ef168(0x1cd)];if(!_0x397898)return;_0x397898['createNewTurnOrderSprites']();},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x29e)]=BattleManager['getNextSubject'],BattleManager['getNextSubject']=function(){const _0x14a682=_0x5e0d52;return this[_0x14a682(0x1bb)]=VisuMZ['BattleSystemOTB']['BattleManager_getNextSubject'][_0x14a682(0x262)](this),this[_0x14a682(0x17d)]()&&this['_subject']&&this['otbShiftTurnOrderForSubject'](this[_0x14a682(0x1bb)]),this[_0x14a682(0x1bb)];},BattleManager[_0x5e0d52(0x1c2)]=function(_0x323b51){const _0x20b8a0=_0x5e0d52;if(!this['isOTB']())return;const _0x3476c8=SceneManager[_0x20b8a0(0x19c)][_0x20b8a0(0x1cd)];if(!_0x3476c8)return;if(!_0x323b51)return;_0x3476c8[_0x20b8a0(0x1a5)](_0x323b51);},BattleManager[_0x5e0d52(0x254)]=function(){const _0x50c5ba=_0x5e0d52;if(!this[_0x50c5ba(0x17d)]())return;const _0x148773=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x148773)return;_0x148773[_0x50c5ba(0x27d)]();},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2a7)]=BattleManager[_0x5e0d52(0x175)],BattleManager[_0x5e0d52(0x175)]=function(){const _0x360e6d=_0x5e0d52;VisuMZ['BattleSystemOTB'][_0x360e6d(0x2a7)]['call'](this),this[_0x360e6d(0x17d)]()&&(this[_0x360e6d(0x173)](),$gameParty[_0x360e6d(0x29b)](),$gameTroop[_0x360e6d(0x29b)]());},BattleManager[_0x5e0d52(0x173)]=function(){if(!this['isOTB']())return;const _0x57507c=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x57507c)return;_0x57507c['removeCurrentSubject']();},BattleManager[_0x5e0d52(0x2c1)]=function(){const _0x3bc35a=_0x5e0d52;if(!this[_0x3bc35a(0x17d)]())return;const _0xfb4c25=SceneManager[_0x3bc35a(0x19c)][_0x3bc35a(0x1cd)];if(!_0xfb4c25)return;_0xfb4c25[_0x3bc35a(0x1f0)]();},BattleManager[_0x5e0d52(0x301)]=function(_0x1bafcc){const _0x3b1007=_0x5e0d52;if(!_0x1bafcc)return;const _0x15a8fe=_0x1bafcc['makeActionTimes']();_0x1bafcc[_0x3b1007(0x32e)]();if(!this[_0x3b1007(0x18c)][_0x3b1007(0x1c5)](_0x1bafcc)){const _0x3dcb87=Math[_0x3b1007(0x30c)](0x0,_0x15a8fe-(_0x1bafcc[_0x3b1007(0x355)]||0x0));this[_0x3b1007(0x2fb)](_0x1bafcc,_0x3dcb87,this[_0x3b1007(0x18c)]);}if(!this[_0x3b1007(0x268)][_0x3b1007(0x1c5)](_0x1bafcc)){const _0x5ad6a5=_0x15a8fe;this[_0x3b1007(0x2fb)](_0x1bafcc,_0x5ad6a5,this['_otb_actionBattlersNext']);}},BattleManager[_0x5e0d52(0x2fb)]=function(_0x2f390d,_0x559a87,_0x1e2e47){const _0x33cd14=_0x5e0d52;if(!this[_0x33cd14(0x17d)]())return;const _0x5314c0=SceneManager[_0x33cd14(0x19c)][_0x33cd14(0x1cd)];_0x2f390d[_0x33cd14(0x32e)]();while(_0x559a87--){_0x1e2e47[_0x33cd14(0x2de)](_0x2f390d),_0x5314c0&&_0x5314c0['addBattlerToTurnOrderAtEnd'](_0x2f390d,_0x1e2e47);}},BattleManager[_0x5e0d52(0x219)]=function(_0xfb7be5){const _0xd25de5=_0x5e0d52;if(!_0xfb7be5)return;const _0x709906=_0xfb7be5[_0xd25de5(0x35f)]();_0xfb7be5[_0xd25de5(0x32e)]();if(!this[_0xd25de5(0x18c)][_0xd25de5(0x1c5)](_0xfb7be5)){const _0x2a002a=Math[_0xd25de5(0x30c)](0x0,_0x709906-(_0xfb7be5[_0xd25de5(0x355)]||0x0));this[_0xd25de5(0x228)](_0xfb7be5,_0x2a002a,this['_actionBattlers']);}if(!this['_otb_actionBattlersNext']['includes'](_0xfb7be5)){const _0x777335=_0x709906;this[_0xd25de5(0x228)](_0xfb7be5,_0x777335,this['_otb_actionBattlersNext']);}},BattleManager[_0x5e0d52(0x1d1)]=function(_0x2c3934,_0x214cf9,_0x59eac3){const _0x22126f=_0x5e0d52;if(!this[_0x22126f(0x17d)]())return;const _0x89c56d=SceneManager[_0x22126f(0x19c)]['_otbTurnOrderWindow'];while(_0x214cf9--){_0x59eac3['unshift'](_0x2c3934),_0x89c56d&&_0x89c56d[_0x22126f(0x228)](_0x2c3934,_0x59eac3);}},BattleManager[_0x5e0d52(0x26f)]=function(_0x258d6a){const _0x315db8=_0x5e0d52;if(!this[_0x315db8(0x17d)]())return;const _0x30d443=this[_0x315db8(0x18c)],_0x3d504a=_0x258d6a===this[_0x315db8(0x1bb)]?0x0:0x1;let _0x1bea1b=0x0;for(let _0x774a5f=0x0;_0x774a5f<_0x30d443[_0x315db8(0x196)];_0x774a5f++){const _0x4c50ae=_0x30d443[_0x774a5f];if(!_0x4c50ae)continue;if(!_0x4c50ae['_actions'])continue;if(!_0x4c50ae[_0x315db8(0x373)][_0x3d504a])continue;if(!_0x4c50ae[_0x315db8(0x373)][_0x3d504a][_0x315db8(0x1ac)])continue;_0x1bea1b=_0x774a5f;}this['_actionBattlers'][_0x315db8(0x2fa)](_0x1bea1b,0x0,_0x258d6a);const _0x503d31=SceneManager[_0x315db8(0x19c)][_0x315db8(0x1cd)];_0x503d31&&_0x503d31[_0x315db8(0x240)](_0x258d6a,_0x1bea1b);},BattleManager[_0x5e0d52(0x322)]=function(){const _0x11e42c=_0x5e0d52;if(!this['isOTB']())return;const _0x4abc29=SceneManager[_0x11e42c(0x19c)][_0x11e42c(0x1cd)];if(!_0x4abc29)return;_0x4abc29[_0x11e42c(0x30a)](null);},BattleManager[_0x5e0d52(0x34b)]=function(){const _0x352ce2=_0x5e0d52;if(!this[_0x352ce2(0x17d)]())return;const _0x4ae5e1=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x4ae5e1)return;_0x4ae5e1[_0x352ce2(0x30a)](this['inputtingAction']());},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x37d)]=Game_System[_0x5e0d52(0x1c7)][_0x5e0d52(0x232)],Game_System['prototype'][_0x5e0d52(0x232)]=function(){const _0x57eafc=_0x5e0d52;VisuMZ['BattleSystemOTB'][_0x57eafc(0x37d)][_0x57eafc(0x262)](this),this[_0x57eafc(0x333)]();},Game_System['prototype'][_0x5e0d52(0x333)]=function(){const _0x15c023=_0x5e0d52;this[_0x15c023(0x212)]=!![];},Game_System[_0x5e0d52(0x1c7)][_0x5e0d52(0x1e1)]=function(){const _0x5f091f=_0x5e0d52;return this[_0x5f091f(0x212)]===undefined&&this[_0x5f091f(0x333)](),this[_0x5f091f(0x212)];},Game_System['prototype'][_0x5e0d52(0x1ed)]=function(_0x1cb4d1){const _0x35d9a3=_0x5e0d52;this[_0x35d9a3(0x212)]===undefined&&this[_0x35d9a3(0x333)](),this['_otbTurnOrderVisible']=_0x1cb4d1;},Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN']=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x348)][_0x5e0d52(0x1fa)],Game_Action[_0x5e0d52(0x17c)]=VisuMZ['BattleSystemOTB'][_0x5e0d52(0x369)][_0x5e0d52(0x348)][_0x5e0d52(0x1f5)],Game_Action[_0x5e0d52(0x30d)]=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x348)][_0x5e0d52(0x1e2)],Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN']=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x348)][_0x5e0d52(0x2b4)],VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x188)]=Game_Action[_0x5e0d52(0x1c7)]['speed'],Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x382)]=function(){const _0x1de4b5=_0x5e0d52;return BattleManager['isOTB']()?0x0:VisuMZ[_0x1de4b5(0x22f)][_0x1de4b5(0x188)][_0x1de4b5(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1ef)]=Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x2cd)],Game_Action[_0x5e0d52(0x1c7)]['applyGlobal']=function(){const _0x39090c=_0x5e0d52;VisuMZ[_0x39090c(0x22f)][_0x39090c(0x1ef)][_0x39090c(0x262)](this),this['applyGlobalBattleSystemOTB']();},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x23b)]=function(){const _0x2e41b4=_0x5e0d52;if(!SceneManager[_0x2e41b4(0x337)]())return;if(!BattleManager[_0x2e41b4(0x17d)]())return;if(!this['item']())return;if(!this[_0x2e41b4(0x342)]())return;const _0x20dd59=VisuMZ[_0x2e41b4(0x22f)][_0x2e41b4(0x2a3)],_0x4675d9=this[_0x2e41b4(0x307)]()[_0x2e41b4(0x2c7)];_0x4675d9[_0x2e41b4(0x2c0)](_0x20dd59['Instant'])&&this[_0x2e41b4(0x342)]()[_0x2e41b4(0x155)](0x1);let _0xce4910=this['otbCalcUserCurrentOrderChange'](),_0xf4709a=this[_0x2e41b4(0x24f)]();_0xce4910!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x2e41b4(0x342)](),-_0xce4910,![]),_0xf4709a!==0x0&&BattleManager['turnOrderChangeOTB'](this[_0x2e41b4(0x342)](),-_0xf4709a,!![]);},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x2da)]=function(){const _0x6e13ae=_0x5e0d52;if(!SceneManager[_0x6e13ae(0x337)]())return 0x0;if(!BattleManager[_0x6e13ae(0x17d)]())return 0x0;if(!this[_0x6e13ae(0x307)]())return 0x0;if(!this['subject']())return 0x0;if(!this['subject']()['canChangeOtbTurnOrder']())return 0x0;const _0x20a71a=VisuMZ[_0x6e13ae(0x22f)]['RegExp'],_0x41f1eb=this['item']()['note'],_0x35fc7e=BattleManager['_actionBattlers']||[];let _0x4765d6=0x0;return _0x41f1eb[_0x6e13ae(0x2c0)](_0x20a71a[_0x6e13ae(0x2eb)])&&(_0x35fc7e['includes'](this['subject']())&&(_0x4765d6+=Number(RegExp['$1']))),_0x41f1eb[_0x6e13ae(0x2c0)](_0x20a71a[_0x6e13ae(0x21d)])&&(_0x4765d6+=Number(RegExp['$1'])),_0x4765d6;},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x24f)]=function(){const _0x83e027=_0x5e0d52;if(!SceneManager[_0x83e027(0x337)]())return 0x0;if(!BattleManager[_0x83e027(0x17d)]())return 0x0;if(!this[_0x83e027(0x307)]())return 0x0;if(!this[_0x83e027(0x342)]())return 0x0;if(!this[_0x83e027(0x342)]()['canChangeOtbTurnOrder']())return 0x0;const _0x369624=VisuMZ['BattleSystemOTB']['Settings'][_0x83e027(0x1df)],_0x408b45=VisuMZ[_0x83e027(0x22f)][_0x83e027(0x2a3)],_0x51b18b=this[_0x83e027(0x307)]()[_0x83e027(0x2c7)],_0xd007b2=BattleManager[_0x83e027(0x18c)]||[],_0x4e1fd5=BattleManager[_0x83e027(0x268)]||[];let _0x43767c=0x0;return _0x369624[_0x83e027(0x320)]&&(_0x43767c+=_0x369624[_0x83e027(0x320)][_0x83e027(0x262)](this)),_0x51b18b[_0x83e027(0x2c0)](_0x408b45[_0x83e027(0x2eb)])&&(_0x4e1fd5['includes'](this[_0x83e027(0x342)]())&&!_0xd007b2[_0x83e027(0x1c5)](this['subject']())&&(_0x43767c+=Number(RegExp['$1']))),_0x51b18b['match'](_0x408b45[_0x83e027(0x2c8)])&&(_0x43767c+=Number(RegExp['$1'])),_0x43767c;},VisuMZ['BattleSystemOTB']['Game_Action_applyItemUserEffect']=Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x341)],Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x341)]=function(_0x2900a6){const _0x3a351f=_0x5e0d52;VisuMZ[_0x3a351f(0x22f)][_0x3a351f(0x247)][_0x3a351f(0x262)](this,_0x2900a6),this[_0x3a351f(0x164)](_0x2900a6),this['applyItemTargetEffectOTB'](_0x2900a6);},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x164)]=function(_0x1a5f20){const _0x5833e4=_0x5e0d52;if(!SceneManager[_0x5833e4(0x337)]())return;if(!BattleManager[_0x5833e4(0x17d)]())return;if(!this['item']())return;if(!_0x1a5f20)return;const _0x568bd1=VisuMZ[_0x5833e4(0x22f)]['RegExp'],_0x4f6f30=this['item']()[_0x5833e4(0x2c7)];if(_0x4f6f30[_0x5833e4(0x2c0)](_0x568bd1['UserAddActionCurrent'])){const _0x50cb63=!![],_0x3730d0=Number(RegExp['$1'])||0x0;this[_0x5833e4(0x342)]()[_0x5833e4(0x331)](_0x3730d0,_0x50cb63);}if(_0x4f6f30[_0x5833e4(0x2c0)](_0x568bd1[_0x5833e4(0x28d)])){const _0x4dcda8=![],_0x1236b0=Number(RegExp['$1'])||0x0;this[_0x5833e4(0x342)]()['otbAddActions'](_0x1236b0,_0x4dcda8);}if(_0x4f6f30[_0x5833e4(0x2c0)](_0x568bd1[_0x5833e4(0x246)])){const _0x3375c4=!![],_0x135569=Number(RegExp['$1'])||0x0;_0x1a5f20[_0x5833e4(0x331)](_0x135569,_0x3375c4);}if(_0x4f6f30[_0x5833e4(0x2c0)](_0x568bd1['TargetAddActionNext'])){const _0x1d68e1=![],_0x24ab9a=Number(RegExp['$1'])||0x0;_0x1a5f20[_0x5833e4(0x331)](_0x24ab9a,_0x1d68e1);}},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a1)]=function(_0x29f80a){const _0x109430=_0x5e0d52;if(!SceneManager[_0x109430(0x337)]())return;if(!BattleManager[_0x109430(0x17d)]())return;if(!this[_0x109430(0x307)]())return;if(!_0x29f80a)return;if(!_0x29f80a['canChangeOtbTurnOrder']())return 0x0;let _0x5af1ba=this[_0x109430(0x18d)](_0x29f80a),_0x16fb16=this['otbCalcTargetNextOrderChange'](_0x29f80a);_0x5af1ba!==0x0&&BattleManager[_0x109430(0x278)](_0x29f80a,-_0x5af1ba,![]),_0x16fb16!==0x0&&BattleManager[_0x109430(0x278)](_0x29f80a,-_0x16fb16,!![]);},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x18d)]=function(_0x1982d0){const _0x55b1c6=_0x5e0d52;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x55b1c6(0x17d)]())return 0x0;if(!this['item']())return 0x0;if(!_0x1982d0)return 0x0;if(!_0x1982d0[_0x55b1c6(0x2e3)]())return 0x0;const _0x2b3e61=VisuMZ[_0x55b1c6(0x22f)][_0x55b1c6(0x2a3)],_0x43c69f=this[_0x55b1c6(0x307)]()[_0x55b1c6(0x2c7)],_0x416f00=BattleManager[_0x55b1c6(0x18c)]||[];let _0x4ea695=0x0;_0x43c69f['match'](_0x2b3e61[_0x55b1c6(0x2ab)])&&(_0x416f00['includes'](_0x1982d0)&&(_0x4ea695+=Number(RegExp['$1'])));_0x43c69f[_0x55b1c6(0x2c0)](_0x2b3e61[_0x55b1c6(0x25a)])&&(_0x4ea695+=Number(RegExp['$1']));const _0x3044a7=this['item']()[_0x55b1c6(0x329)];for(const _0x4cb3ad of _0x3044a7){if(!_0x4cb3ad)continue;if(_0x4cb3ad['code']===Game_Action[_0x55b1c6(0x190)]&&_0x4cb3ad[_0x55b1c6(0x387)]===0x6){if(Game_Action[_0x55b1c6(0x208)])_0x4ea695-=0x1;}if(_0x4cb3ad[_0x55b1c6(0x34c)]===Game_Action[_0x55b1c6(0x174)]&&_0x4cb3ad[_0x55b1c6(0x387)]===0x6){if(Game_Action[_0x55b1c6(0x17c)])_0x4ea695+=0x1;}}return _0x4ea695;},Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x384)]=function(_0x1d734d){const _0x26f97c=_0x5e0d52;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x26f97c(0x17d)]())return 0x0;if(!this['item']())return 0x0;if(!_0x1d734d)return 0x0;if(!_0x1d734d[_0x26f97c(0x2e3)]())return 0x0;const _0xba95bd=VisuMZ[_0x26f97c(0x22f)]['RegExp'],_0x23eb5c=this[_0x26f97c(0x307)]()['note'],_0x2d4aa3=BattleManager[_0x26f97c(0x18c)]||[],_0x4e8d64=BattleManager[_0x26f97c(0x268)]||[];let _0xa5e5f6=0x0;_0x23eb5c[_0x26f97c(0x2c0)](_0xba95bd[_0x26f97c(0x2ab)])&&(_0x4e8d64['includes'](_0x1d734d)&&!_0x2d4aa3[_0x26f97c(0x1c5)](_0x1d734d)&&(_0xa5e5f6+=Number(RegExp['$1'])));_0x23eb5c[_0x26f97c(0x2c0)](_0xba95bd['TargetNextOrder'])&&(_0xa5e5f6+=Number(RegExp['$1']));const _0x591ae3=this[_0x26f97c(0x307)]()[_0x26f97c(0x329)];for(const _0x25d6f6 of _0x591ae3){if(!_0x25d6f6)continue;if(_0x25d6f6[_0x26f97c(0x34c)]===Game_Action['EFFECT_ADD_BUFF']&&_0x25d6f6[_0x26f97c(0x387)]===0x6){if(Game_Action['OTB_CONVERT_AGI_BUFF_NEXT_TURN'])_0xa5e5f6-=0x1;}if(_0x25d6f6[_0x26f97c(0x34c)]===Game_Action[_0x26f97c(0x174)]&&_0x25d6f6[_0x26f97c(0x387)]===0x6){if(Game_Action[_0x26f97c(0x2f9)])_0xa5e5f6+=0x1;}}return _0xa5e5f6;},Game_BattlerBase[_0x5e0d52(0x1c7)]['clearTurnOrderOTBGraphics']=function(){const _0x4920a7=_0x5e0d52;delete this['_otbTurnOrderGraphicType'],delete this[_0x4920a7(0x343)],delete this[_0x4920a7(0x300)],delete this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x1fc)]=function(){const _0x4bbcd7=_0x5e0d52;return this[_0x4bbcd7(0x171)]===undefined&&(this[_0x4bbcd7(0x171)]=this[_0x4bbcd7(0x184)]()),this[_0x4bbcd7(0x171)];},Game_BattlerBase[_0x5e0d52(0x1c7)]['createTurnOrderOTBGraphicType']=function(){const _0xf21bc=_0x5e0d52;return Window_OTB_TurnOrder[_0xf21bc(0x369)][_0xf21bc(0x183)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x1be)]=function(){const _0x251e36=_0x5e0d52;return this['_otbTurnOrderFaceName']===undefined&&(this[_0x251e36(0x343)]=this[_0x251e36(0x1f1)]()),this[_0x251e36(0x343)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x1f1)]=function(){const _0x80c30b=_0x5e0d52;return Window_OTB_TurnOrder[_0x80c30b(0x369)][_0x80c30b(0x336)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x2b2)]=function(){const _0x16acae=_0x5e0d52;return this['_otbTurnOrderFaceIndex']===undefined&&(this[_0x16acae(0x300)]=this[_0x16acae(0x30f)]()),this[_0x16acae(0x300)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x30f)]=function(){const _0x31ccf6=_0x5e0d52;return Window_OTB_TurnOrder[_0x31ccf6(0x369)][_0x31ccf6(0x201)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x353)]=function(){const _0x31793b=_0x5e0d52;return this[_0x31793b(0x1d0)]===undefined&&(this['_otbTurnOrderIconIndex']=this['createTurnOrderOTBGraphicIconIndex']()),this[_0x31793b(0x1d0)];},Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x290)]=function(){const _0x37eab8=_0x5e0d52;return Window_OTB_TurnOrder[_0x37eab8(0x369)]['EnemyBattlerIcon'];},Game_BattlerBase['prototype'][_0x5e0d52(0x26e)]=function(_0x53780b){this['_otbTurnOrderIconIndex']=_0x53780b;},VisuMZ[_0x5e0d52(0x22f)]['Game_BattlerBase_hide']=Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a2)],Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a2)]=function(){const _0x461db1=_0x5e0d52;VisuMZ[_0x461db1(0x22f)][_0x461db1(0x360)][_0x461db1(0x262)](this),BattleManager[_0x461db1(0x1bf)]();},VisuMZ[_0x5e0d52(0x22f)]['Game_BattlerBase_appear']=Game_BattlerBase['prototype'][_0x5e0d52(0x2e6)],Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x2e6)]=function(){const _0x3c34e9=_0x5e0d52,_0x4846cb=this[_0x3c34e9(0x2c4)];VisuMZ[_0x3c34e9(0x22f)]['Game_BattlerBase_appear']['call'](this),BattleManager[_0x3c34e9(0x17d)]()&&SceneManager['isSceneBattle']()&&_0x4846cb&&!this[_0x3c34e9(0x2c4)]&&BattleManager[_0x3c34e9(0x301)](this);},VisuMZ['BattleSystemOTB']['Game_Battler_performCollapse']=Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a3)],Game_Battler['prototype'][_0x5e0d52(0x1a3)]=function(){const _0x679764=_0x5e0d52;VisuMZ[_0x679764(0x22f)][_0x679764(0x154)]['call'](this),BattleManager[_0x679764(0x1bf)]();},Game_Battler[_0x5e0d52(0x309)]=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x1df)][_0x5e0d52(0x21f)],VisuMZ['BattleSystemOTB']['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x5e0d52(0x20b)],Game_Battler['prototype'][_0x5e0d52(0x20b)]=function(_0x3c1b57){const _0x57defa=_0x5e0d52;VisuMZ['BattleSystemOTB'][_0x57defa(0x1e6)][_0x57defa(0x262)](this,_0x3c1b57),this[_0x57defa(0x275)](_0x3c1b57);},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x275)]=function(_0xe58950){const _0x274767=_0x5e0d52;if(!BattleManager[_0x274767(0x17d)]())return;this[_0x274767(0x355)]=0x0,this[_0x274767(0x236)]=undefined;},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x361)]=Game_Battler[_0x5e0d52(0x1c7)]['onBattleEnd'],Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x19e)]=function(){const _0x17d7ec=_0x5e0d52;VisuMZ[_0x17d7ec(0x22f)][_0x17d7ec(0x361)][_0x17d7ec(0x262)](this),this[_0x17d7ec(0x272)]();},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x272)]=function(){const _0x5426b6=_0x5e0d52;if(!BattleManager[_0x5426b6(0x17d)]())return;this['_otbTimesActedThisTurn']=0x0;},Game_Battler['prototype']['performActionEndOTB']=function(){const _0x585067=_0x5e0d52;if(!BattleManager[_0x585067(0x17d)]())return;this['_otbTimesActedThisTurn']=this[_0x585067(0x355)]||0x0,this[_0x585067(0x355)]++;if(this['numActions']()>0x0&&this===BattleManager[_0x585067(0x1bb)]){const _0x1c0a77=BattleManager['_forcedBattlers'];if(_0x1c0a77[_0x585067(0x196)]>0x0&&_0x1c0a77[0x0]!==this)return;const _0x410be3=this[_0x585067(0x287)]();if(_0x410be3&&BattleManager[_0x585067(0x27f)](this))_0x410be3['stepForward']();}},BattleManager['isNextOtbSubject']=function(_0x4f1d7a){const _0x20f15d=_0x5e0d52;if(!_0x4f1d7a)return![];return this[_0x20f15d(0x18c)][0x0]===_0x4f1d7a;},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x23c)]=Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1cb)],Game_Battler['prototype'][_0x5e0d52(0x1cb)]=function(){const _0x45b3bb=_0x5e0d52;VisuMZ[_0x45b3bb(0x22f)][_0x45b3bb(0x23c)]['call'](this),this[_0x45b3bb(0x17e)]();},Game_Battler[_0x5e0d52(0x1c7)]['onTurnEndOTB']=function(){const _0x44988a=_0x5e0d52;if(!BattleManager[_0x44988a(0x17d)]())return;this[_0x44988a(0x355)]=0x0;},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2ce)]=Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x350)],Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x350)]=function(){const _0x5fa83b=_0x5e0d52;BattleManager[_0x5fa83b(0x17d)]()?this[_0x5fa83b(0x234)]():VisuMZ['BattleSystemOTB'][_0x5fa83b(0x2ce)]['call'](this);},Game_Battler[_0x5e0d52(0x1c7)]['makeOTBSpeed']=function(){const _0x30682d=_0x5e0d52;if(this[_0x30682d(0x2a9)]())this[_0x30682d(0x2fe)]=Infinity;else{const _0x3d4505=this[_0x30682d(0x2f3)]()||new Game_Action(this);this[_0x30682d(0x2fe)]=VisuMZ[_0x30682d(0x22f)][_0x30682d(0x369)][_0x30682d(0x1df)][_0x30682d(0x1f6)][_0x30682d(0x262)](_0x3d4505);}},Game_Battler[_0x5e0d52(0x1c7)]['isInfinitySpeedOTB']=function(){const _0x534af3=_0x5e0d52;if(!Game_Battler[_0x534af3(0x309)])return![];if(!this[_0x534af3(0x1b2)]())return![];if(!this[_0x534af3(0x22a)]())return![];if(this[_0x534af3(0x34e)]())return![];const _0x1ffdab=JsonEx['makeDeepCopy'](this);return _0x1ffdab['_tempActor']=!![],_0x1ffdab[_0x534af3(0x1c6)]=!![],_0x1ffdab[_0x534af3(0x1f4)](),_0x1ffdab[_0x534af3(0x2a0)](0x1),_0x1ffdab[_0x534af3(0x2a0)](0x2),_0x1ffdab[_0x534af3(0x1e7)](),_0x1ffdab['canMove']();},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x18f)]=Game_Action[_0x5e0d52(0x1c7)][_0x5e0d52(0x2d5)],Game_Action[_0x5e0d52(0x1c7)]['allowRandomSpeed']=function(){const _0x1c868d=_0x5e0d52;return BattleManager['isOTB']()?VisuMZ[_0x1c868d(0x22f)]['Settings'][_0x1c868d(0x1df)][_0x1c868d(0x335)]:VisuMZ[_0x1c868d(0x22f)][_0x1c868d(0x18f)][_0x1c868d(0x262)](this);},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x155)]=function(_0x337470){const _0x5a2b3e=_0x5e0d52;if(!this[_0x5a2b3e(0x34e)]())return;this[_0x5a2b3e(0x355)]=this['_otbTimesActedThisTurn']||0x0,this[_0x5a2b3e(0x355)]--,BattleManager[_0x5a2b3e(0x1d1)](this,_0x337470,BattleManager[_0x5a2b3e(0x18c)]);},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x331)]=function(_0x378f30,_0x269459){const _0x912f49=_0x5e0d52;if(!this[_0x912f49(0x34e)]())return;_0x269459?BattleManager[_0x912f49(0x2fb)](this,_0x378f30,BattleManager[_0x912f49(0x18c)]):BattleManager[_0x912f49(0x2fb)](this,_0x378f30,BattleManager[_0x912f49(0x268)]);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2d1)]=Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x35f)],Game_Battler['prototype'][_0x5e0d52(0x35f)]=function(){const _0x24eecb=_0x5e0d52;return BattleManager[_0x24eecb(0x17d)]()?this[_0x24eecb(0x29a)]():VisuMZ[_0x24eecb(0x22f)][_0x24eecb(0x2d1)][_0x24eecb(0x262)](this);},Game_Battler['prototype'][_0x5e0d52(0x29a)]=function(){const _0x15ed61=_0x5e0d52;if(this['_cache_makeActionTimesOTB']!==undefined)return this[_0x15ed61(0x236)];this[_0x15ed61(0x1c4)]=this[_0x15ed61(0x2df)]()['length'];const _0x20a5fb=this['actionPlusSet'](),_0x25802a=_0x20a5fb[_0x15ed61(0x222)]((_0x31b13b,_0x37a75e)=>Math['random']()<_0x37a75e?_0x31b13b+0x1:_0x31b13b,0x1);return this[_0x15ed61(0x236)]=_0x25802a,this[_0x15ed61(0x236)];},Game_Unit['prototype'][_0x5e0d52(0x29b)]=function(){const _0x583932=_0x5e0d52;for(const _0xf2acbf of this[_0x583932(0x157)]()){_0xf2acbf&&(_0xf2acbf[_0x583932(0x236)]=undefined);}},Game_Battler['prototype'][_0x5e0d52(0x2e3)]=function(){const _0x2d1f19=_0x5e0d52;if(this[_0x2d1f19(0x382)]()===Infinity)return![];return!![];},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x32b)]=function(_0x14657c,_0x3d5e80){const _0x4c156e=_0x5e0d52;if(this[_0x4c156e(0x1c6)]||this[_0x4c156e(0x328)])return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isOTB']())return;if(this[_0x4c156e(0x1c4)]!==this[_0x4c156e(0x2df)]()[_0x4c156e(0x196)])this[_0x4c156e(0x1c4)]=this[_0x4c156e(0x2df)]()[_0x4c156e(0x196)],this[_0x4c156e(0x236)]=undefined;else return;if(_0x14657c&&!this[_0x4c156e(0x34e)]())BattleManager[_0x4c156e(0x1bf)]();else!_0x14657c&&this[_0x4c156e(0x34e)]()&&BattleManager['otbReturnBattlerToTurnOrders'](this);if(this['canMove']()){const _0x3a5c09=this[_0x4c156e(0x35f)]()-_0x3d5e80;_0x3a5c09>0x0&&(BattleManager[_0x4c156e(0x2fb)](this,_0x3a5c09,BattleManager[_0x4c156e(0x18c)]),BattleManager[_0x4c156e(0x2fb)](this,_0x3a5c09,BattleManager[_0x4c156e(0x268)]));}},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x2b5)]=Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1e5)],Game_Battler['prototype']['addState']=function(_0x10e573){const _0x419f25=_0x5e0d52,_0x342126=this[_0x419f25(0x34e)](),_0x2ebb31=this[_0x419f25(0x35f)]();VisuMZ[_0x419f25(0x22f)][_0x419f25(0x2b5)][_0x419f25(0x262)](this,_0x10e573),this[_0x419f25(0x1c4)]=undefined,this['otbProcessActionCheck'](_0x342126,_0x2ebb31);},VisuMZ[_0x5e0d52(0x22f)]['Game_Battler_removeState']=Game_Battler[_0x5e0d52(0x1c7)]['removeState'],Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x346)]=function(_0x3ac368){const _0x506ec1=_0x5e0d52,_0x3cb086=this[_0x506ec1(0x34e)](),_0x46fd05=this[_0x506ec1(0x35f)](),_0x47adcd=this[_0x506ec1(0x2a2)](_0x3ac368);VisuMZ[_0x506ec1(0x22f)][_0x506ec1(0x21a)]['call'](this,_0x3ac368),_0x47adcd&&!this[_0x506ec1(0x2a2)](_0x3ac368)&&(this[_0x506ec1(0x1c4)]=undefined,this[_0x506ec1(0x32b)](_0x3cb086,_0x46fd05));},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x2c9)]=Game_BattlerBase[_0x5e0d52(0x1c7)]['recoverAll'],Game_BattlerBase[_0x5e0d52(0x1c7)][_0x5e0d52(0x2e1)]=function(){const _0x456baa=_0x5e0d52;if(BattleManager[_0x456baa(0x17d)]())this['removeState'](this[_0x456baa(0x15a)]());VisuMZ[_0x456baa(0x22f)][_0x456baa(0x2c9)]['call'](this);if(BattleManager[_0x456baa(0x17d)]())this[_0x456baa(0x1e7)]();},VisuMZ['BattleSystemOTB']['Game_Battler_forceAction']=Game_Battler['prototype']['forceAction'],Game_Battler['prototype']['forceAction']=function(_0x3c61c6,_0xa1a6cc){const _0x3951ae=_0x5e0d52;BattleManager[_0x3951ae(0x17d)]()?this[_0x3951ae(0x332)](_0x3c61c6,_0xa1a6cc):VisuMZ['BattleSystemOTB'][_0x3951ae(0x2ee)][_0x3951ae(0x262)](this,_0x3c61c6,_0xa1a6cc);},Game_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x332)]=function(_0x9e858f,_0x37079a){const _0x4d75a7=_0x5e0d52,_0x328276=new Game_Action(this,!![]);_0x328276[_0x4d75a7(0x1c8)](_0x9e858f),_0x328276[_0x4d75a7(0x1ac)]=!![];if(_0x37079a===-0x2)_0x328276['setTarget'](this['_lastTargetIndex']);else _0x37079a===-0x1?_0x328276[_0x4d75a7(0x280)]():_0x328276['setTarget'](_0x37079a);let _0x53f6a4=this['_actions'][_0x4d75a7(0x315)](_0xd21c32=>_0xd21c32['_forceAction']);if(this===BattleManager[_0x4d75a7(0x1bb)])_0x53f6a4=Math[_0x4d75a7(0x30c)](_0x53f6a4,0x0);_0x53f6a4++,this['_actions'][_0x4d75a7(0x2fa)](_0x53f6a4,0x0,_0x328276);},VisuMZ[_0x5e0d52(0x22f)]['BattleManager_forceAction']=BattleManager[_0x5e0d52(0x352)],BattleManager[_0x5e0d52(0x352)]=function(_0x2bc386){const _0x52891d=_0x5e0d52;BattleManager[_0x52891d(0x17d)]()?this[_0x52891d(0x332)](_0x2bc386):VisuMZ[_0x52891d(0x22f)]['BattleManager_forceAction'][_0x52891d(0x262)](this,_0x2bc386);},BattleManager['forceActionOTB']=function(_0x47e49f){BattleManager['otbAddForceActionBattler'](_0x47e49f);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x345)]=Game_Actor[_0x5e0d52(0x1c7)][_0x5e0d52(0x2d2)],Game_Actor[_0x5e0d52(0x1c7)][_0x5e0d52(0x2d2)]=function(){const _0x2923fd=_0x5e0d52;if(BattleManager[_0x2923fd(0x17d)]()){if(this['battler']())this[_0x2923fd(0x287)]()[_0x2923fd(0x252)]();return![];}return VisuMZ[_0x2923fd(0x22f)][_0x2923fd(0x345)][_0x2923fd(0x262)](this);},Game_Actor[_0x5e0d52(0x1c7)][_0x5e0d52(0x184)]=function(){const _0x4bf847=_0x5e0d52,_0x213ff2=this['actor']()['note'];if(_0x213ff2[_0x4bf847(0x2c0)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x213ff2[_0x4bf847(0x2c0)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x4bf847(0x25f);}return Window_OTB_TurnOrder['Settings']['ActorBattlerType'];},Game_Actor[_0x5e0d52(0x1c7)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x3870c6=_0x5e0d52,_0x3b4fbb=this[_0x3870c6(0x312)]()['note'];if(_0x3b4fbb[_0x3870c6(0x2c0)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor['prototype'][_0x5e0d52(0x30f)]=function(){const _0x34c57f=_0x5e0d52,_0x3c6679=this[_0x34c57f(0x312)]()['note'];if(_0x3c6679['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x34c57f(0x380)]();},Game_Actor['prototype'][_0x5e0d52(0x290)]=function(){const _0x158e67=_0x5e0d52,_0x39ae8e=this[_0x158e67(0x312)]()[_0x158e67(0x2c7)];if(_0x39ae8e[_0x158e67(0x2c0)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x158e67(0x369)][_0x158e67(0x338)];},Game_Enemy['prototype'][_0x5e0d52(0x184)]=function(){const _0x4cb225=_0x5e0d52,_0x3c1613=this[_0x4cb225(0x23f)]()[_0x4cb225(0x2c7)];if(_0x3c1613['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4cb225(0x28a);else{if(_0x3c1613[_0x4cb225(0x2c0)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x4cb225(0x25f);}return Window_OTB_TurnOrder[_0x4cb225(0x369)][_0x4cb225(0x183)];},Game_Enemy[_0x5e0d52(0x1c7)][_0x5e0d52(0x1f1)]=function(){const _0x4cae80=this['enemy']()['note'];if(_0x4cae80['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_Enemy['prototype'][_0x5e0d52(0x30f)]=function(){const _0x46ed9f=_0x5e0d52,_0x4b6ec8=this[_0x46ed9f(0x23f)]()[_0x46ed9f(0x2c7)];if(_0x4b6ec8[_0x46ed9f(0x2c0)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x46ed9f(0x369)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x5e0d52(0x1c7)][_0x5e0d52(0x290)]=function(){const _0x66a03=_0x5e0d52,_0x3907a4=this['enemy']()[_0x66a03(0x2c7)];if(_0x3907a4[_0x66a03(0x2c0)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x66a03(0x369)][_0x66a03(0x207)];},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x273)]=Game_Party['prototype']['addActor'],Game_Party[_0x5e0d52(0x1c7)]['addActor']=function(_0x22af55){const _0xeb0832=_0x5e0d52;VisuMZ[_0xeb0832(0x22f)]['Game_Party_addActor']['call'](this,_0x22af55);if(Imported[_0xeb0832(0x19f)])return;SceneManager[_0xeb0832(0x337)]()&&BattleManager[_0xeb0832(0x17d)]()&&(BattleManager[_0xeb0832(0x1bf)](),BattleManager['otbReturnBattlerToTurnOrders']($gameActors['actor'](_0x22af55)));},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x35a)]=Game_Party['prototype']['removeActor'],Game_Party[_0x5e0d52(0x1c7)]['removeActor']=function(_0x3f5062){const _0x250dd7=_0x5e0d52;VisuMZ['BattleSystemOTB'][_0x250dd7(0x35a)][_0x250dd7(0x262)](this,_0x3f5062),SceneManager[_0x250dd7(0x337)]()&&BattleManager[_0x250dd7(0x17d)]()&&BattleManager[_0x250dd7(0x1bf)]();},VisuMZ['BattleSystemOTB']['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x324)],Scene_Battle['prototype'][_0x5e0d52(0x324)]=function(){const _0x2c5eb5=_0x5e0d52;VisuMZ[_0x2c5eb5(0x22f)]['Scene_Battle_createActorCommandWindow'][_0x2c5eb5(0x262)](this),BattleManager['isOTB']()&&this[_0x2c5eb5(0x153)]();},Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x153)]=function(){const _0x1b6e0e=_0x5e0d52,_0x4b2f45=this['_actorCommandWindow'];this[_0x1b6e0e(0x2dc)]()&&delete _0x4b2f45[_0x1b6e0e(0x24b)][_0x1b6e0e(0x15c)];},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1f7)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x191)],Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x191)]=function(){const _0x4c8f22=_0x5e0d52;BattleManager[_0x4c8f22(0x17d)]()?this['commandCancelOTB']():VisuMZ['BattleSystemOTB'][_0x4c8f22(0x1f7)][_0x4c8f22(0x262)](this);},Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x33c)]=function(){const _0x4f0bbe=_0x5e0d52;BattleManager[_0x4f0bbe(0x322)](),this['_partyCommandWindow'][_0x4f0bbe(0x2ef)](),this[_0x4f0bbe(0x1ba)][_0x4f0bbe(0x27c)]();},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x381)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x1b1)],Scene_Battle['prototype'][_0x5e0d52(0x1b1)]=function(){const _0x2250bf=_0x5e0d52;BattleManager['isOTB']()?this[_0x2250bf(0x1ee)]():VisuMZ['BattleSystemOTB'][_0x2250bf(0x381)]['call'](this);},VisuMZ[_0x5e0d52(0x22f)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a8)],Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a8)]=function(){const _0x57d4ad=_0x5e0d52;VisuMZ[_0x57d4ad(0x22f)][_0x57d4ad(0x2b0)][_0x57d4ad(0x262)](this),this[_0x57d4ad(0x2d4)]();},Scene_Battle[_0x5e0d52(0x1c7)]['createOTBTurnOrderWindow']=function(){const _0x43ace0=_0x5e0d52;if(!BattleManager[_0x43ace0(0x17d)]())return;this[_0x43ace0(0x1cd)]=new Window_OTB_TurnOrder();const _0x55c6b2=this['getChildIndex'](this[_0x43ace0(0x22b)]);this['addChildAt'](this[_0x43ace0(0x1cd)],_0x55c6b2),this['repositionLogWindowOTB'](),SceneManager[_0x43ace0(0x176)]()&&this[_0x43ace0(0x1cd)]['resumeTurnOrderSprites']();},Scene_Battle['prototype'][_0x5e0d52(0x1fd)]=function(){const _0xc82e16=_0x5e0d52,_0x2f888d=Window_OTB_TurnOrder['Settings'];if(_0x2f888d['DisplayPosition']!==_0xc82e16(0x36f))return;if(!_0x2f888d[_0xc82e16(0x209)])return;if(!this[_0xc82e16(0x318)])return;const _0x5f485c=this[_0xc82e16(0x1cd)]['y']-Math['round']((Graphics['height']-Graphics[_0xc82e16(0x1f8)])/0x2),_0x5045b0=_0x5f485c+this[_0xc82e16(0x1cd)][_0xc82e16(0x15f)];this['_logWindow']['y']=_0x5045b0+(_0x2f888d[_0xc82e16(0x225)]||0x0);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x256)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x1ca)],Scene_Battle['prototype'][_0x5e0d52(0x1ca)]=function(){const _0x43fb33=_0x5e0d52;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x43fb33(0x22f)][_0x43fb33(0x256)][_0x43fb33(0x262)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_commandGuard']=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x31d)],Scene_Battle[_0x5e0d52(0x1c7)]['commandGuard']=function(){const _0x17c071=_0x5e0d52;BattleManager[_0x17c071(0x322)](),VisuMZ[_0x17c071(0x22f)][_0x17c071(0x230)][_0x17c071(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)]['Scene_Battle_onActorOk']=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x251)],Scene_Battle[_0x5e0d52(0x1c7)]['onActorOk']=function(){const _0x1d14d5=_0x5e0d52;BattleManager[_0x1d14d5(0x322)](),VisuMZ[_0x1d14d5(0x22f)]['Scene_Battle_onActorOk'][_0x1d14d5(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x264)]=Scene_Battle['prototype'][_0x5e0d52(0x195)],Scene_Battle['prototype'][_0x5e0d52(0x195)]=function(){const _0x48ff62=_0x5e0d52;BattleManager[_0x48ff62(0x322)](),VisuMZ[_0x48ff62(0x22f)]['Scene_Battle_onActorCancel'][_0x48ff62(0x262)](this);},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x245)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x2ad)],Scene_Battle['prototype'][_0x5e0d52(0x2ad)]=function(){const _0x9fb8de=_0x5e0d52;BattleManager[_0x9fb8de(0x322)](),VisuMZ['BattleSystemOTB'][_0x9fb8de(0x245)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x2f7)]=Scene_Battle[_0x5e0d52(0x1c7)]['onEnemyCancel'],Scene_Battle[_0x5e0d52(0x1c7)]['onEnemyCancel']=function(){const _0x40a1d8=_0x5e0d52;BattleManager[_0x40a1d8(0x322)](),VisuMZ[_0x40a1d8(0x22f)]['Scene_Battle_onEnemyCancel'][_0x40a1d8(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x37b)]=Scene_Battle['prototype'][_0x5e0d52(0x261)],Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x261)]=function(){const _0x110d18=_0x5e0d52;BattleManager[_0x110d18(0x322)](),VisuMZ[_0x110d18(0x22f)][_0x110d18(0x37b)][_0x110d18(0x262)](this);},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x20e)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x1bc)],Scene_Battle['prototype'][_0x5e0d52(0x1bc)]=function(){const _0x54e101=_0x5e0d52;BattleManager[_0x54e101(0x322)](),VisuMZ[_0x54e101(0x22f)][_0x54e101(0x20e)][_0x54e101(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x1e8)]=Scene_Battle[_0x5e0d52(0x1c7)]['onItemOk'],Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x36a)]=function(){const _0x1b48bf=_0x5e0d52;BattleManager[_0x1b48bf(0x322)](),VisuMZ[_0x1b48bf(0x22f)][_0x1b48bf(0x1e8)][_0x1b48bf(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x325)]=Scene_Battle['prototype'][_0x5e0d52(0x306)],Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x306)]=function(){const _0x1e0188=_0x5e0d52;BattleManager[_0x1e0188(0x322)](),VisuMZ[_0x1e0188(0x22f)][_0x1e0188(0x325)][_0x1e0188(0x262)](this);},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x15e)]=Scene_Battle[_0x5e0d52(0x1c7)][_0x5e0d52(0x317)],Scene_Battle['prototype'][_0x5e0d52(0x317)]=function(){const _0x547ba6=_0x5e0d52;BattleManager[_0x547ba6(0x322)](),VisuMZ[_0x547ba6(0x22f)]['Scene_Battle_actorCommandSingleSkill'][_0x547ba6(0x262)](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x118249=_0x5e0d52;this[_0x118249(0x232)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]=Object[_0x5e0d52(0x229)](Sprite_Clickable[_0x5e0d52(0x1c7)]),Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['constructor']=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x232)]=function(_0x34441d,_0x532b05,_0x1fda4f){const _0x58d36b=_0x5e0d52;this[_0x58d36b(0x2b3)](_0x34441d,_0x532b05,_0x1fda4f),Sprite_Clickable[_0x58d36b(0x1c7)][_0x58d36b(0x232)][_0x58d36b(0x262)](this),this[_0x58d36b(0x30b)]=0x0,this[_0x58d36b(0x1b3)](),this[_0x58d36b(0x1c0)]();},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x2b3)]=function(_0x32e031,_0x5e87c3,_0x441275){const _0x4caac8=_0x5e0d52;this[_0x4caac8(0x37e)]=_0x32e031[_0x4caac8(0x2a5)]()?$gameParty:$gameTroop,this['_index']=_0x32e031[_0x4caac8(0x1d3)](),this['_instance']=_0x5e87c3,this[_0x4caac8(0x2cb)]=_0x441275;const _0xfaf258=Window_OTB_TurnOrder[_0x4caac8(0x369)],_0x313687=this[_0x4caac8(0x2d8)]();this[_0x4caac8(0x1f3)]=0x0,this[_0x4caac8(0x1b8)]=_0xfaf258[_0x4caac8(0x26d)]?-_0xfaf258[_0x4caac8(0x303)]:this[_0x4caac8(0x377)]()[_0x4caac8(0x2c2)],this[_0x4caac8(0x255)]=0x0,this[_0x4caac8(0x2ca)]=0x0,this['_fadeTarget']=0xff,this['_isAlive']=![],this['_isAppeared']=![],this[_0x4caac8(0x231)]=0x0,this[_0x4caac8(0x162)]=0x0;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1b3)]=function(){const _0x8856c4=_0x5e0d52;this['createInitialPositions'](),this[_0x8856c4(0x17a)](),this['createGraphicSprite'](),this['createBorderSprite'](),this['createLetterSprite']();},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x35d)]=function(){const _0x21cb1d=_0x5e0d52;this['x']=this[_0x21cb1d(0x1b8)],this['y']=this[_0x21cb1d(0x255)];},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x2d8)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x167)]=function(){const _0xbd3904=_0x5e0d52,_0x2b3747=Window_OTB_TurnOrder['Settings'];return _0x2b3747[_0xbd3904(0x303)];},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x2bd)]=function(){const _0x3445fd=_0x5e0d52,_0x3dc8db=Window_OTB_TurnOrder['Settings'];return _0x3dc8db[_0x3445fd(0x180)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x198)]=function(){const _0x556daf=_0x5e0d52;return this['_unit']===$gameParty?_0x556daf(0x374):_0x556daf(0x29c);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x17a)]=function(){const _0x1e6781=_0x5e0d52;if(!Window_OTB_TurnOrder[_0x1e6781(0x369)][_0x1e6781(0x242)])return;const _0xfaffc5=Window_OTB_TurnOrder[_0x1e6781(0x369)],_0x439536=this[_0x1e6781(0x198)](),_0x1aa00c='%1SystemBg'[_0x1e6781(0x2be)](_0x439536),_0x5b844f=new Sprite();_0x5b844f['anchor']['x']=this[_0x1e6781(0x298)]['x'],_0x5b844f[_0x1e6781(0x298)]['y']=this[_0x1e6781(0x298)]['y'];if(_0xfaffc5[_0x1aa00c])_0x5b844f[_0x1e6781(0x213)]=ImageManager[_0x1e6781(0x334)](_0xfaffc5[_0x1aa00c]);else{const _0x3286b7=this[_0x1e6781(0x167)](),_0x1f51bd=this['bitmapHeight']();_0x5b844f[_0x1e6781(0x213)]=new Bitmap(_0x3286b7,_0x1f51bd);const _0x3e2fac=ColorManager[_0x1e6781(0x364)](_0xfaffc5[_0x1e6781(0x2a4)['format'](_0x439536)]),_0x47bf93=ColorManager[_0x1e6781(0x364)](_0xfaffc5[_0x1e6781(0x18e)[_0x1e6781(0x2be)](_0x439536)]);_0x5b844f[_0x1e6781(0x213)][_0x1e6781(0x385)](0x0,0x0,_0x3286b7,_0x1f51bd,_0x3e2fac,_0x47bf93,!![]);}this['_backgroundSprite']=_0x5b844f,this[_0x1e6781(0x2b6)](this['_backgroundSprite']),this[_0x1e6781(0x2c2)]=this[_0x1e6781(0x32a)]['width'],this[_0x1e6781(0x15f)]=this[_0x1e6781(0x32a)][_0x1e6781(0x15f)];},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a0)]=function(){const _0x2eb2a6=_0x5e0d52,_0x546da1=new Sprite();_0x546da1[_0x2eb2a6(0x298)]['x']=this['anchor']['x'],_0x546da1['anchor']['y']=this['anchor']['y'],this[_0x2eb2a6(0x299)]=_0x546da1,this['addChild'](this['_graphicSprite']),this[_0x2eb2a6(0x2a8)]();},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x258)]=function(){const _0x53074d=_0x5e0d52;if(!Window_OTB_TurnOrder[_0x53074d(0x369)][_0x53074d(0x271)])return;const _0x1989e0=Window_OTB_TurnOrder[_0x53074d(0x369)],_0xc4c81d=this['getUnitSideSide'](),_0x126dc8=_0x53074d(0x1d9)['format'](_0xc4c81d),_0x41af10=new Sprite();_0x41af10[_0x53074d(0x298)]['x']=this[_0x53074d(0x298)]['x'],_0x41af10['anchor']['y']=this['anchor']['y'];if(_0x1989e0[_0x126dc8])_0x41af10[_0x53074d(0x213)]=ImageManager[_0x53074d(0x334)](_0x1989e0[_0x126dc8]);else{let _0x1a30f6=this[_0x53074d(0x167)](),_0x465070=this[_0x53074d(0x2bd)](),_0xbe2e9a=this[_0x53074d(0x221)]();_0x41af10[_0x53074d(0x213)]=new Bitmap(_0x1a30f6,_0x465070);const _0x4bbaac=_0x53074d(0x27b),_0x405555=ColorManager[_0x53074d(0x364)](_0x1989e0['%1BorderColor'[_0x53074d(0x2be)](_0xc4c81d)]);_0x41af10['bitmap']['fillRect'](0x0,0x0,_0x1a30f6,_0x465070,_0x4bbaac),_0x1a30f6-=0x2,_0x465070-=0x2,_0x41af10[_0x53074d(0x213)][_0x53074d(0x205)](0x1,0x1,_0x1a30f6,_0x465070,_0x405555),_0x1a30f6-=_0xbe2e9a*0x2,_0x465070-=_0xbe2e9a*0x2,_0x41af10[_0x53074d(0x213)][_0x53074d(0x205)](0x1+_0xbe2e9a,0x1+_0xbe2e9a,_0x1a30f6,_0x465070,_0x4bbaac),_0x1a30f6-=0x2,_0x465070-=0x2,_0xbe2e9a+=0x1,_0x41af10[_0x53074d(0x213)][_0x53074d(0x237)](0x1+_0xbe2e9a,0x1+_0xbe2e9a,_0x1a30f6,_0x465070);}this[_0x53074d(0x32a)]=_0x41af10,this[_0x53074d(0x2b6)](this[_0x53074d(0x32a)]);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x221)]=function(){const _0x319e06=_0x5e0d52,_0x48ba93=Window_OTB_TurnOrder[_0x319e06(0x369)];return _0x48ba93[_0x319e06(0x31e)];},Sprite_OTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x2c8847=_0x5e0d52,_0x1cbeaa=Window_OTB_TurnOrder[_0x2c8847(0x369)];if(!_0x1cbeaa[_0x2c8847(0x223)])return;if(this[_0x2c8847(0x37e)]===$gameParty)return;const _0x2a6b77=this[_0x2c8847(0x167)](),_0x60d352=this[_0x2c8847(0x2bd)](),_0x135866=new Sprite();_0x135866[_0x2c8847(0x298)]['x']=this[_0x2c8847(0x298)]['x'],_0x135866[_0x2c8847(0x298)]['y']=this['anchor']['y'],_0x135866[_0x2c8847(0x213)]=new Bitmap(_0x2a6b77,_0x60d352),this['_letterSprite']=_0x135866,this['addChild'](this[_0x2c8847(0x2f6)]);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x287)]=function(){const _0x485e02=_0x5e0d52;return this[_0x485e02(0x37e)]?this['_unit'][_0x485e02(0x157)]()[this[_0x485e02(0x24d)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x356)]=function(){const _0x1f45ad=_0x5e0d52;Sprite_Clickable['prototype'][_0x1f45ad(0x356)]['call'](this),this[_0x1f45ad(0x29f)](),this['checkOpacity'](),this[_0x1f45ad(0x358)](),this['updateGraphic'](),this['updateGraphicHue'](),this['updateLetter'](),this['updateSelectionEffect']();},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x165)]=function(_0x2d5d77,_0x4b1f6a){const _0x347bba=_0x5e0d52,_0x5cb6a4=Window_OTB_TurnOrder[_0x347bba(0x369)];this[_0x347bba(0x1f3)]=_0x5cb6a4['UpdateFrames'],this['_positionTargetX']=_0x2d5d77,this[_0x347bba(0x255)]=_0x4b1f6a;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x29f)]=function(){const _0x49bc83=_0x5e0d52;if(this[_0x49bc83(0x1f3)]>0x0){const _0x3f9df3=this[_0x49bc83(0x1f3)];this['x']=(this['x']*(_0x3f9df3-0x1)+this['_positionTargetX'])/_0x3f9df3,this['y']=(this['y']*(_0x3f9df3-0x1)+this[_0x49bc83(0x255)])/_0x3f9df3,this[_0x49bc83(0x1f3)]--;}if(this[_0x49bc83(0x1f3)]<=0x0){this['x']=this[_0x49bc83(0x1b8)],this['y']=this[_0x49bc83(0x255)];if(this[_0x49bc83(0x30b)]<0xff&&!this[_0x49bc83(0x156)]&&this['_fadeDuration']<=0x0){const _0x46938a=this[_0x49bc83(0x287)]();_0x46938a&&(this[_0x49bc83(0x37a)]=_0x46938a[_0x49bc83(0x1b2)]()&&_0x46938a[_0x49bc83(0x22a)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1c9)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x377)]=function(){const _0x1f75d5=_0x5e0d52;return SceneManager[_0x1f75d5(0x19c)][_0x1f75d5(0x1cd)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x185)]=function(){const _0x227b02=_0x5e0d52,_0x102fd8=this[_0x227b02(0x287)]();if(!_0x102fd8)return this['defaultPosition']();if(_0x102fd8===BattleManager[_0x227b02(0x1bb)])return 0x0;if(BattleManager[_0x227b02(0x18c)]['includes'](_0x102fd8)){const _0x1d31a4=BattleManager['_actionBattlers'][_0x227b02(0x19a)](_0x102fd8)+0x1;return _0x1d31a4;}return this[_0x227b02(0x1c9)]();},Sprite_OTB_TurnOrder_Battler['prototype']['startFade']=function(_0x3733b6){const _0x743734=_0x5e0d52,_0xa9cc79=Window_OTB_TurnOrder[_0x743734(0x369)];this['_fadeDuration']=_0xa9cc79[_0x743734(0x18a)],this[_0x743734(0x37a)]=_0x3733b6;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x1c0)]=function(){const _0x4b9495=_0x5e0d52,_0x5dcf2=this[_0x4b9495(0x287)]();if(!_0x5dcf2)return;if(this[_0x4b9495(0x216)]===_0x5dcf2[_0x4b9495(0x1b2)]()&&this['_isAppeared']===_0x5dcf2['isAppeared']())return;this[_0x4b9495(0x216)]=_0x5dcf2[_0x4b9495(0x1b2)](),this[_0x4b9495(0x1b7)]=_0x5dcf2[_0x4b9495(0x22a)]();let _0x57b6a4=this[_0x4b9495(0x216)]&&this['_isAppeared']?0xff:0x0;this[_0x4b9495(0x1a9)](_0x57b6a4);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x358)]=function(){const _0x31261f=_0x5e0d52;if(this[_0x31261f(0x2ca)]>0x0){const _0x2533ab=this['_fadeDuration'];this[_0x31261f(0x30b)]=(this['opacity']*(_0x2533ab-0x1)+this[_0x31261f(0x37a)])/_0x2533ab,this[_0x31261f(0x2ca)]--,this[_0x31261f(0x2ca)]<=0x0&&(this[_0x31261f(0x30b)]=this[_0x31261f(0x37a)]);}if(this[_0x31261f(0x156)])return;BattleManager[_0x31261f(0x2e4)]===_0x31261f(0x36d)&&(this[_0x31261f(0x156)]=!![],this['startFade'](0x0));},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x16e)]=function(){const _0x16670c=_0x5e0d52,_0x27aa7f=this[_0x16670c(0x287)]();if(!_0x27aa7f)return;const _0x23efdb=Window_OTB_TurnOrder['Settings'],_0x221fef=this[_0x16670c(0x37e)]===$gameParty?_0x16670c(0x374):'Enemy';let _0x2f93c3=_0x27aa7f[_0x16670c(0x1fc)]();if(_0x27aa7f[_0x16670c(0x2a5)]()&&_0x2f93c3===_0x16670c(0x23f))_0x2f93c3='face';else _0x27aa7f['isEnemy']()&&_0x2f93c3===_0x16670c(0x314)&&(_0x2f93c3=_0x16670c(0x23f));if(this[_0x16670c(0x2d9)]!==_0x2f93c3)return this['processUpdateGraphic']();switch(this['_graphicType']){case _0x16670c(0x28a):if(this[_0x16670c(0x1f2)]!==_0x27aa7f[_0x16670c(0x1be)]())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x27aa7f['TurnOrderOTBGraphicFaceIndex']())return this['processUpdateGraphic']();break;case _0x16670c(0x25f):if(this[_0x16670c(0x31f)]!==_0x27aa7f[_0x16670c(0x353)]())return this['processUpdateGraphic']();break;case'enemy':if(_0x27aa7f[_0x16670c(0x1b9)]()){if(this['_graphicSv']!==_0x27aa7f[_0x16670c(0x21e)]())return this[_0x16670c(0x2a8)]();}else{if(this[_0x16670c(0x367)]!==_0x27aa7f[_0x16670c(0x1db)]())return this[_0x16670c(0x2a8)]();}break;case _0x16670c(0x314):if(_0x27aa7f[_0x16670c(0x2a5)]()){if(this[_0x16670c(0x371)]!==_0x27aa7f[_0x16670c(0x1db)]())return this[_0x16670c(0x2a8)]();}else{if(this[_0x16670c(0x367)]!==_0x27aa7f[_0x16670c(0x1db)]())return this[_0x16670c(0x2a8)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x2a8)]=function(){const _0x613091=_0x5e0d52,_0x47229f=this['battler']();if(!_0x47229f)return;this[_0x613091(0x2d9)]=_0x47229f[_0x613091(0x1fc)]();if(_0x47229f[_0x613091(0x2a5)]()&&this['_graphicType']===_0x613091(0x23f))this[_0x613091(0x2d9)]='face';else _0x47229f[_0x613091(0x33d)]()&&this['_graphicType']===_0x613091(0x314)&&(this['_graphicType']=_0x613091(0x23f));let _0x2e7df5;switch(this[_0x613091(0x2d9)]){case _0x613091(0x28a):this[_0x613091(0x1f2)]=_0x47229f['TurnOrderOTBGraphicFaceName'](),this[_0x613091(0x2d6)]=_0x47229f[_0x613091(0x2b2)](),_0x2e7df5=ImageManager['loadFace'](this[_0x613091(0x1f2)]),_0x2e7df5[_0x613091(0x34f)](this[_0x613091(0x36b)][_0x613091(0x20d)](this,_0x2e7df5));break;case'icon':this['_graphicIconIndex']=_0x47229f[_0x613091(0x290)](),_0x2e7df5=ImageManager[_0x613091(0x334)](_0x613091(0x34d)),_0x2e7df5[_0x613091(0x34f)](this[_0x613091(0x17f)][_0x613091(0x20d)](this,_0x2e7df5));break;case _0x613091(0x23f):if(_0x47229f[_0x613091(0x1b9)]())this[_0x613091(0x371)]=_0x47229f[_0x613091(0x21e)](),_0x2e7df5=ImageManager[_0x613091(0x1ec)](this[_0x613091(0x371)]),_0x2e7df5['addLoadListener'](this[_0x613091(0x2d0)][_0x613091(0x20d)](this,_0x2e7df5));else $gameSystem[_0x613091(0x36e)]()?(this[_0x613091(0x367)]=_0x47229f[_0x613091(0x1db)](),_0x2e7df5=ImageManager[_0x613091(0x326)](this['_graphicEnemy']),_0x2e7df5[_0x613091(0x34f)](this['changeEnemyGraphicBitmap'][_0x613091(0x20d)](this,_0x2e7df5))):(this[_0x613091(0x367)]=_0x47229f[_0x613091(0x1db)](),_0x2e7df5=ImageManager['loadEnemy'](this['_graphicEnemy']),_0x2e7df5[_0x613091(0x34f)](this[_0x613091(0x375)][_0x613091(0x20d)](this,_0x2e7df5)));break;case _0x613091(0x314):this[_0x613091(0x371)]=_0x47229f[_0x613091(0x1db)](),_0x2e7df5=ImageManager[_0x613091(0x1ec)](this[_0x613091(0x371)]),_0x2e7df5[_0x613091(0x34f)](this[_0x613091(0x2d0)][_0x613091(0x20d)](this,_0x2e7df5));break;}},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x36b)]=function(_0x5c137d){const _0x2b1e29=_0x5e0d52,_0x22e1cf=this[_0x2b1e29(0x2d6)],_0x241490=this[_0x2b1e29(0x167)](),_0x4ec599=this[_0x2b1e29(0x2bd)](),_0x55d59c=Math[_0x2b1e29(0x30c)](_0x241490,_0x4ec599);this[_0x2b1e29(0x299)][_0x2b1e29(0x213)]=new Bitmap(_0x241490,_0x4ec599);const _0x2653af=this[_0x2b1e29(0x299)][_0x2b1e29(0x213)],_0x328a31=ImageManager[_0x2b1e29(0x1af)],_0x139b49=ImageManager[_0x2b1e29(0x23d)],_0x3ec8a6=_0x55d59c/Math['max'](_0x328a31,_0x139b49),_0x83000d=ImageManager['faceWidth'],_0x38f902=ImageManager[_0x2b1e29(0x23d)],_0x1ff1ed=_0x22e1cf%0x4*_0x328a31+(_0x328a31-_0x83000d)/0x2,_0x59ec2f=Math[_0x2b1e29(0x372)](_0x22e1cf/0x4)*_0x139b49+(_0x139b49-_0x38f902)/0x2,_0x5d2a9e=(_0x241490-_0x328a31*_0x3ec8a6)/0x2,_0x176799=(_0x4ec599-_0x139b49*_0x3ec8a6)/0x2;_0x2653af[_0x2b1e29(0x292)](_0x5c137d,_0x1ff1ed,_0x59ec2f,_0x83000d,_0x38f902,_0x5d2a9e,_0x176799,_0x55d59c,_0x55d59c);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['changeIconGraphicBitmap']=function(_0x78f11){const _0x4a0d07=_0x5e0d52,_0x1192d6=this['_graphicIconIndex'],_0x493908=this['bitmapWidth'](),_0x4b93fe=this[_0x4a0d07(0x2bd)]();this[_0x4a0d07(0x299)][_0x4a0d07(0x213)]=new Bitmap(_0x493908,_0x4b93fe);const _0x1d8f95=this['_graphicSprite'][_0x4a0d07(0x213)],_0x4ce1f8=ImageManager[_0x4a0d07(0x1de)],_0x1491a3=ImageManager[_0x4a0d07(0x340)],_0x10ac8d=Math['min'](_0x4ce1f8,_0x1491a3,_0x493908,_0x4b93fe),_0x165e04=_0x1192d6%0x10*_0x4ce1f8,_0x1cc124=Math[_0x4a0d07(0x372)](_0x1192d6/0x10)*_0x1491a3,_0x449c65=Math[_0x4a0d07(0x372)](Math[_0x4a0d07(0x30c)](_0x493908-_0x10ac8d,0x0)/0x2),_0x5d8eeb=Math['floor'](Math[_0x4a0d07(0x30c)](_0x4b93fe-_0x10ac8d,0x0)/0x2);_0x1d8f95[_0x4a0d07(0x292)](_0x78f11,_0x165e04,_0x1cc124,_0x4ce1f8,_0x1491a3,_0x449c65,_0x5d8eeb,_0x10ac8d,_0x10ac8d);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['changeSvActorGraphicBitmap']=function(_0x46945a){const _0x2b41ff=_0x5e0d52,_0x2fb107=this[_0x2b41ff(0x167)](),_0x152840=this[_0x2b41ff(0x2bd)](),_0x3fe702=Math[_0x2b41ff(0x1ae)](_0x2fb107,_0x152840);this['_graphicSprite']['bitmap']=new Bitmap(_0x2fb107,_0x152840);const _0x55c055=this[_0x2b41ff(0x299)][_0x2b41ff(0x213)],_0x1cb36f=this[_0x2b41ff(0x371)][_0x2b41ff(0x2c0)](/\$/i),_0x4c260e=_0x1cb36f?0x1:ImageManager[_0x2b41ff(0x206)],_0x48504d=_0x1cb36f?0x1:ImageManager[_0x2b41ff(0x1a7)],_0x1f3c3a=_0x46945a[_0x2b41ff(0x2c2)]/_0x4c260e,_0x441513=_0x46945a[_0x2b41ff(0x15f)]/_0x48504d,_0x1f7608=Math['min'](0x1,_0x3fe702/_0x1f3c3a,_0x3fe702/_0x441513),_0x204e46=_0x1f3c3a*_0x1f7608,_0x4bdddb=_0x441513*_0x1f7608,_0x2a7020=Math[_0x2b41ff(0x365)]((_0x2fb107-_0x204e46)/0x2),_0x2d0b49=Math[_0x2b41ff(0x365)]((_0x152840-_0x4bdddb)/0x2);_0x55c055[_0x2b41ff(0x292)](_0x46945a,0x0,0x0,_0x1f3c3a,_0x441513,_0x2a7020,_0x2d0b49,_0x204e46,_0x4bdddb);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x375)]=function(_0x5d4de5){const _0x532831=_0x5e0d52,_0x58467c=Window_OTB_TurnOrder[_0x532831(0x369)],_0x1e1265=this['bitmapWidth'](),_0x365f8c=this['bitmapHeight'](),_0x3e796e=Math[_0x532831(0x1ae)](_0x1e1265,_0x365f8c);this['_graphicSprite'][_0x532831(0x213)]=new Bitmap(_0x1e1265,_0x365f8c);const _0x2d69c6=this[_0x532831(0x299)]['bitmap'],_0x27d029=Math['min'](0x1,_0x3e796e/_0x5d4de5['width'],_0x3e796e/_0x5d4de5[_0x532831(0x15f)]),_0x3be672=_0x5d4de5[_0x532831(0x2c2)]*_0x27d029,_0x51a8ca=_0x5d4de5['height']*_0x27d029,_0x2a9bb2=Math[_0x532831(0x365)]((_0x1e1265-_0x3be672)/0x2),_0x4da3b0=Math[_0x532831(0x365)]((_0x365f8c-_0x51a8ca)/0x2);_0x2d69c6[_0x532831(0x292)](_0x5d4de5,0x0,0x0,_0x5d4de5[_0x532831(0x2c2)],_0x5d4de5[_0x532831(0x15f)],_0x2a9bb2,_0x4da3b0,_0x3be672,_0x51a8ca);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['updateGraphicHue']=function(){const _0x1dfd72=_0x5e0d52,_0x168513=this[_0x1dfd72(0x287)]();if(!_0x168513)return;if(!_0x168513[_0x1dfd72(0x33d)]())return;if(this[_0x1dfd72(0x1d8)]===_0x168513[_0x1dfd72(0x163)]())return;this[_0x1dfd72(0x1d8)]=_0x168513[_0x1dfd72(0x163)](),this[_0x1dfd72(0x299)][_0x1dfd72(0x15b)](_0x168513[_0x1dfd72(0x1b9)]()?0x0:this[_0x1dfd72(0x1d8)]);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x253)]=function(){const _0x24cd1a=_0x5e0d52;if(!this[_0x24cd1a(0x2f6)])return;const _0x1df43c=this[_0x24cd1a(0x287)]();if(!_0x1df43c)return;if(this[_0x24cd1a(0x2ba)]===_0x1df43c[_0x24cd1a(0x2ba)]&&this[_0x24cd1a(0x33a)]===_0x1df43c[_0x24cd1a(0x33a)])return;this[_0x24cd1a(0x2ba)]=_0x1df43c[_0x24cd1a(0x2ba)],this[_0x24cd1a(0x33a)]=_0x1df43c[_0x24cd1a(0x33a)];const _0x1caa2e=Window_OTB_TurnOrder['Settings'],_0x5ba8b9=this[_0x24cd1a(0x167)](),_0x1e75f3=this['bitmapHeight'](),_0x4372e1=this['_letterSprite']['bitmap'];_0x4372e1[_0x24cd1a(0x274)]();if(!this[_0x24cd1a(0x33a)])return;_0x4372e1['fontFace']=_0x1caa2e[_0x24cd1a(0x17b)]||$gameSystem[_0x24cd1a(0x2c6)](),_0x4372e1[_0x24cd1a(0x16a)]=_0x1caa2e[_0x24cd1a(0x2ea)]||0x10,_0x1caa2e[_0x24cd1a(0x26d)]?_0x4372e1['drawText'](this[_0x24cd1a(0x2ba)][_0x24cd1a(0x27a)](),_0x5ba8b9*0x1/0x8,_0x1e75f3/0x2,_0x5ba8b9,_0x1e75f3/0x2,_0x24cd1a(0x294)):_0x4372e1[_0x24cd1a(0x31a)](this[_0x24cd1a(0x2ba)][_0x24cd1a(0x27a)](),0x0,_0x1e75f3/0x2,_0x5ba8b9*0x7/0x8,_0x1e75f3/0x2,_0x24cd1a(0x239));},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['updateSelectionEffect']=function(){const _0x19a038=_0x5e0d52,_0x3c69f2=this[_0x19a038(0x287)]();if(!_0x3c69f2)return;const _0x465d88=_0x3c69f2[_0x19a038(0x287)]();if(!_0x465d88)return;const _0x5bc58e=_0x465d88['mainSprite']();if(!_0x5bc58e)return;this[_0x19a038(0x1b0)](_0x5bc58e[_0x19a038(0x214)]);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e0d52(0x33b)]=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x30e)]=function(_0x3695b0){const _0x1e92c8=_0x5e0d52;this['_sourceArray']=_0x3695b0,this['calculateTargetPositions'](),this[_0x1e92c8(0x2cb)]===null&&(this['_instance']=-0x1);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x1f9)]=function(){const _0xaf01a3=_0x5e0d52,_0x1260a1=this['containerWindow']();if(!_0x1260a1)return;const _0x5d0a00=Window_OTB_TurnOrder[_0xaf01a3(0x369)],_0x4962b5=_0x5d0a00[_0xaf01a3(0x26d)],_0x5ca41e=this[_0xaf01a3(0x2cb)]===_0x1260a1[_0xaf01a3(0x1d5)]?!![]:![],_0x18c0de=this['_instance']===-0x1&&BattleManager[_0xaf01a3(0x1bb)]===this[_0xaf01a3(0x287)](),_0x49e1a2=_0x1260a1[_0xaf01a3(0x2ac)]-_0x5d0a00[_0xaf01a3(0x303)];let _0x466d46=Math[_0xaf01a3(0x297)](_0x49e1a2/(this[_0xaf01a3(0x2cb)][_0xaf01a3(0x196)]-0x1||0x1));_0x466d46=Math[_0xaf01a3(0x1ae)](_0x5d0a00[_0xaf01a3(0x303)],_0x466d46);let _0x88d872=0x0,_0x432762=0x0,_0xcda7cd=_0x18c0de?-0x1:this[_0xaf01a3(0x2cb)]['indexOf'](this);!_0x18c0de&&(_0xcda7cd=this[_0xaf01a3(0x2c5)]());if(_0x18c0de)_0x88d872=_0x1260a1['_subjectX'];else _0x4962b5?(_0x88d872=(_0x5ca41e?_0x1260a1['_nextX']:_0x1260a1['_currentX'])+_0x49e1a2,_0x88d872-=_0xcda7cd*_0x466d46):(_0x88d872=_0x5ca41e?_0x1260a1[_0xaf01a3(0x203)]:_0x1260a1['_currentX'],_0x88d872+=_0xcda7cd*_0x466d46);_0x88d872+=this[_0xaf01a3(0x2d7)](_0xcda7cd,_0x5d0a00[_0xaf01a3(0x303)]-_0x466d46),!_0x18c0de&&_0xcda7cd<0x0&&(_0x88d872=this['x'],_0x432762=this['y'],this['startFade'](0x0)),this['moveToPosition'](_0x88d872,_0x432762);},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]['additionalTargetXAdjustments']=function(_0x8df025,_0x4d92cc){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)][_0x5e0d52(0x2c5)]=function(){const _0x4a783d=_0x5e0d52,_0x5f323c=this[_0x4a783d(0x377)]();if(!_0x5f323c)return 0x0;const _0x4be7f8=this[_0x4a783d(0x2cb)]===_0x5f323c[_0x4a783d(0x1d5)]?!![]:![],_0x459486=_0x4be7f8?BattleManager[_0x4a783d(0x268)]:BattleManager[_0x4a783d(0x18c)],_0x5885ab=this[_0x4a783d(0x287)](),_0x301b7d=VisuMZ[_0x4a783d(0x22f)][_0x4a783d(0x177)](_0x5885ab,_0x459486);return _0x301b7d[this[_0x4a783d(0x270)]]??_0x301b7d[_0x301b7d['length']-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){const _0x436293=_0x5e0d52;this[_0x436293(0x232)](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)]=Object[_0x5e0d52(0x229)](Sprite_OTB_TurnOrder_Battler[_0x5e0d52(0x1c7)]),Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x16c)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x232)]=function(_0x45f46b,_0x4976ed,_0x160cde,_0x2e480f){const _0x34961e=_0x5e0d52;this[_0x34961e(0x349)]=_0x2e480f,Sprite_OTB_TurnOrder_Battler[_0x34961e(0x1c7)][_0x34961e(0x232)][_0x34961e(0x262)](this,_0x45f46b,_0x4976ed,_0x160cde),this[_0x34961e(0x2f0)]();},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x2f0)]=function(){const _0x49705f=_0x5e0d52,_0x2b42d5=Window_OTB_TurnOrder[_0x49705f(0x369)];this[_0x49705f(0x1a6)]['x']=this[_0x49705f(0x1a6)]['y']=_0x2b42d5[_0x49705f(0x284)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x5e0d52(0x198)]=function(){const _0x32b40e=_0x5e0d52;return this[_0x32b40e(0x37e)]===$gameParty?_0x32b40e(0x199):'PreviewEnemy';},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x221)]=function(){const _0x484b3d=_0x5e0d52,_0x312d88=Window_OTB_TurnOrder[_0x484b3d(0x369)];return Math[_0x484b3d(0x297)](_0x312d88[_0x484b3d(0x31e)]/(_0x312d88[_0x484b3d(0x284)]||0.01));},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x165)]=function(_0x278188,_0x3ddc9e){const _0x45aebb=_0x5e0d52;Sprite_OTB_TurnOrder_Battler[_0x45aebb(0x1c7)][_0x45aebb(0x165)][_0x45aebb(0x262)](this,_0x278188,_0x3ddc9e),this['x']=this[_0x45aebb(0x1b8)],this['y']=this[_0x45aebb(0x255)];},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a9)]=function(_0x2d39fe){const _0x448edb=_0x5e0d52;Sprite_OTB_TurnOrder_Battler[_0x448edb(0x1c7)][_0x448edb(0x1a9)]['call'](this,_0x2d39fe),_0x2d39fe>0x0?this[_0x448edb(0x2ca)]=0x1:(this[_0x448edb(0x2ca)]/=0x2,this[_0x448edb(0x2ca)]=Math[_0x448edb(0x372)](this['_fadeDuration']));},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x2d7)]=function(_0x13451c,_0x5a2165){const _0x57560a=_0x5e0d52,_0x3654c4=Window_OTB_TurnOrder[_0x57560a(0x369)];if(_0x13451c>0x0){if(this[_0x57560a(0x349)]>0x0)return _0x3654c4[_0x57560a(0x26d)]?-_0x3654c4[_0x57560a(0x303)]:_0x3654c4[_0x57560a(0x303)];else{if(this['_offset']<0x0)return _0x3654c4[_0x57560a(0x26d)]?-_0x5a2165:_0x5a2165;}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x2c5)]=function(){const _0x69cc7e=_0x5e0d52,_0x2835d6=this[_0x69cc7e(0x377)](),_0x45b99a=this[_0x69cc7e(0x2cb)]===_0x2835d6[_0x69cc7e(0x1d5)]?!![]:![],_0x2afc42=_0x45b99a?BattleManager[_0x69cc7e(0x268)]:BattleManager[_0x69cc7e(0x18c)];let _0x1cdb9f=0x0,_0x41b303=_0x2afc42[_0x69cc7e(0x196)]-0x1;_0x45b99a&&(_0x1cdb9f=Math[_0x69cc7e(0x30c)](0x0,VisuMZ['BattleSystemOTB'][_0x69cc7e(0x305)](_0x2afc42)));let _0x388288=Sprite_OTB_TurnOrder_Battler[_0x69cc7e(0x1c7)][_0x69cc7e(0x2c5)][_0x69cc7e(0x262)](this);return _0x388288+=this[_0x69cc7e(0x349)],_0x388288['clamp'](_0x1cdb9f,_0x41b303);},Sprite_OTB_TurnOrder_Preview[_0x5e0d52(0x1c7)][_0x5e0d52(0x1c3)]=function(){},Window_Selectable['prototype'][_0x5e0d52(0x378)]=function(){return![];},VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x16f)]=Window_Selectable['prototype'][_0x5e0d52(0x32f)],Window_Selectable['prototype'][_0x5e0d52(0x32f)]=function(_0x2b0faf){const _0x15ccbf=_0x5e0d52;VisuMZ[_0x15ccbf(0x22f)][_0x15ccbf(0x16f)][_0x15ccbf(0x262)](this,_0x2b0faf),this[_0x15ccbf(0x378)]()&&this[_0x15ccbf(0x1d4)]&&this['applyBattleItemWindowOTB']();},Window_Selectable[_0x5e0d52(0x1c7)]['applyBattleItemWindowOTB']=function(){const _0x562a31=_0x5e0d52;BattleManager[_0x562a31(0x34b)]();},VisuMZ['BattleSystemOTB'][_0x5e0d52(0x282)]=Window_Help[_0x5e0d52(0x1c7)][_0x5e0d52(0x28f)],Window_Help[_0x5e0d52(0x1c7)]['setItem']=function(_0xe78feb){const _0x146d75=_0x5e0d52;BattleManager['isOTB']()&&_0xe78feb&&_0xe78feb[_0x146d75(0x2c7)]&&_0xe78feb[_0x146d75(0x2c7)]['match'](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0x146d75(0x2e8)](String(RegExp['$1'])):VisuMZ['BattleSystemOTB']['Window_Help_setItem'][_0x146d75(0x262)](this,_0xe78feb);},Window_ActorCommand[_0x5e0d52(0x1c7)][_0x5e0d52(0x378)]=function(){const _0x5711e8=_0x5e0d52;return BattleManager[_0x5711e8(0x17d)]();},Window_ActorCommand[_0x5e0d52(0x1c7)][_0x5e0d52(0x20f)]=function(){const _0x1bfc82=_0x5e0d52,_0x30bfd2=BattleManager[_0x1bfc82(0x26a)]();if(_0x30bfd2){const _0x3a2ad4=this[_0x1bfc82(0x250)]();switch(_0x3a2ad4){case _0x1bfc82(0x204):_0x30bfd2['setAttack']();break;case'guard':_0x30bfd2['setGuard']();break;case'singleSkill':_0x30bfd2[_0x1bfc82(0x1c8)](this[_0x1bfc82(0x267)]());break;default:_0x30bfd2[_0x1bfc82(0x1c8)](null);break;}}Window_Command[_0x1bfc82(0x1c7)][_0x1bfc82(0x20f)][_0x1bfc82(0x262)](this);},Window_BattleSkill[_0x5e0d52(0x1c7)][_0x5e0d52(0x378)]=function(){const _0x27f563=_0x5e0d52;return BattleManager[_0x27f563(0x17d)]();},Window_BattleSkill[_0x5e0d52(0x1c7)][_0x5e0d52(0x20f)]=function(){const _0x1e7e60=_0x5e0d52,_0x53a8f2=this[_0x1e7e60(0x307)](),_0x34bc6d=BattleManager[_0x1e7e60(0x26a)]();if(_0x34bc6d)_0x34bc6d['setSkill'](_0x53a8f2?_0x53a8f2['id']:null);Window_SkillList[_0x1e7e60(0x1c7)][_0x1e7e60(0x20f)][_0x1e7e60(0x262)](this);},Window_BattleItem[_0x5e0d52(0x1c7)][_0x5e0d52(0x378)]=function(){const _0x494ee9=_0x5e0d52;return BattleManager[_0x494ee9(0x17d)]();},Window_BattleItem[_0x5e0d52(0x1c7)]['applyBattleItemWindowOTB']=function(){const _0x593ff0=_0x5e0d52,_0x3d3179=this['item'](),_0x156fb6=BattleManager['inputtingAction']();if(_0x156fb6)_0x156fb6['setItem'](_0x3d3179?_0x3d3179['id']:null);Window_ItemList[_0x593ff0(0x1c7)][_0x593ff0(0x20f)]['call'](this);},Window_BattleActor['prototype'][_0x5e0d52(0x378)]=function(){const _0x2a7006=_0x5e0d52;return BattleManager[_0x2a7006(0x17d)]();},Window_BattleEnemy[_0x5e0d52(0x1c7)]['isBattleItemWindowOTB']=function(){const _0x2436e5=_0x5e0d52;return BattleManager[_0x2436e5(0x17d)]();};function Window_OTB_TurnOrder(){const _0x52e586=_0x5e0d52;this[_0x52e586(0x232)](...arguments);}Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]=Object[_0x5e0d52(0x229)](Window_Base[_0x5e0d52(0x1c7)]),Window_OTB_TurnOrder['prototype']['constructor']=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x5e0d52(0x369)]=VisuMZ[_0x5e0d52(0x22f)][_0x5e0d52(0x369)][_0x5e0d52(0x376)],Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x232)]=function(){const _0x36d99c=_0x5e0d52,_0x295887=this[_0x36d99c(0x22d)]();this[_0x36d99c(0x316)](_0x295887),Window_Base[_0x36d99c(0x1c7)][_0x36d99c(0x232)][_0x36d99c(0x262)](this,_0x295887),this[_0x36d99c(0x30b)]=0x0,this['drawDimmedArea'](),this[_0x36d99c(0x2db)](),this[_0x36d99c(0x197)](),this[_0x36d99c(0x35c)]();},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x22d)]=function(){const _0x34040c=_0x5e0d52,_0x4f46a7=Window_OTB_TurnOrder[_0x34040c(0x369)],_0x4964b7=SceneManager[_0x34040c(0x19c)][_0x34040c(0x2e0)][_0x34040c(0x15f)];let _0x51c196=Graphics[_0x34040c(0x2c2)]-_0x4f46a7[_0x34040c(0x158)]*0x2,_0x34e55a=_0x4f46a7[_0x34040c(0x180)]+this[_0x34040c(0x293)](),_0x3a3924=_0x4f46a7[_0x34040c(0x158)],_0x3e03c4=0x0;switch(_0x4f46a7[_0x34040c(0x36c)]){case _0x34040c(0x181):_0x3e03c4=Graphics[_0x34040c(0x15f)]-_0x4964b7-_0x4f46a7[_0x34040c(0x158)]-_0x34e55a;break;default:_0x3e03c4=_0x4f46a7[_0x34040c(0x158)];break;}if(Imported[_0x34040c(0x289)]&&BattleManager[_0x34040c(0x248)]()){const _0x2efb70=VisuMZ['SideviewBattleUI'][_0x34040c(0x369)][_0x34040c(0x25b)];_0x51c196-=_0x2efb70[_0x34040c(0x34a)]+_0x2efb70[_0x34040c(0x321)],_0x51c196-=_0x4f46a7[_0x34040c(0x158)];}return _0x3a3924+=_0x4f46a7[_0x34040c(0x286)]||0x0,_0x3e03c4+=_0x4f46a7['DisplayOffsetY']||0x0,new Rectangle(_0x3a3924,_0x3e03c4,_0x51c196,_0x34e55a);},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x316)]=function(_0x54f6b9){const _0x4ca4bf=_0x5e0d52;this['_targetHomeX']=this[_0x4ca4bf(0x281)]=_0x54f6b9['x'],this['_targetHomeY']=this[_0x4ca4bf(0x1dc)]=_0x54f6b9['y'],this['_homeDuration']=0x0;const _0x37687a=Window_OTB_TurnOrder[_0x4ca4bf(0x369)];this[_0x4ca4bf(0x2ac)]=Math[_0x4ca4bf(0x297)]((_0x54f6b9[_0x4ca4bf(0x2c2)]-_0x37687a[_0x4ca4bf(0x303)]-_0x37687a[_0x4ca4bf(0x24c)]*0x2)/0x2),_0x37687a['OrderDirection']?(this['_subjectX']=_0x54f6b9[_0x4ca4bf(0x2c2)]-_0x37687a['SpriteThin'],this['_currentX']=this[_0x4ca4bf(0x2ac)]+_0x37687a[_0x4ca4bf(0x24c)],this[_0x4ca4bf(0x203)]=0x0):(this[_0x4ca4bf(0x22e)]=0x0,this[_0x4ca4bf(0x19d)]=_0x37687a[_0x4ca4bf(0x303)]+_0x37687a[_0x4ca4bf(0x24c)],this['_nextX']=this['_currentX']+_0x37687a[_0x4ca4bf(0x24c)]+this[_0x4ca4bf(0x2ac)]);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x37c)]=function(){this['padding']=0x0;},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x22c)]=function(){const _0x2f8037=_0x5e0d52,_0x3da0c7=Window_OTB_TurnOrder[_0x2f8037(0x369)];if(_0x3da0c7[_0x2f8037(0x20a)]===_0x2f8037(0x269))return;if(_0x3da0c7[_0x2f8037(0x20a)]===_0x2f8037(0x27e)&&_0x3da0c7[_0x2f8037(0x226)]!==''){const _0x33cf06=ImageManager[_0x2f8037(0x334)](_0x3da0c7[_0x2f8037(0x226)]);_0x33cf06[_0x2f8037(0x34f)](this[_0x2f8037(0x26c)][_0x2f8037(0x20d)](this,_0x33cf06));return;};const _0x5b39dc=this['contentsBack'],_0x31bd3d=ColorManager[_0x2f8037(0x2a1)](),_0x3e8e37=ColorManager[_0x2f8037(0x379)](),_0x4c9322=this[_0x2f8037(0x22e)],_0x96a58f=_0x3da0c7['SpriteThin'],_0x3be7b9=0x0,_0x55abb2=_0x3da0c7[_0x2f8037(0x180)],_0x26a848=this['_currentX'],_0x4d0e5d=this[_0x2f8037(0x203)],_0x8eece3=this[_0x2f8037(0x2ac)];switch(_0x3da0c7['BgDimStyle']){case _0x2f8037(0x215):_0x3da0c7[_0x2f8037(0x26d)]?(_0x5b39dc['gradientFillRect'](_0x4c9322,_0x3be7b9,_0x96a58f/0x2,_0x55abb2,_0x3e8e37,_0x31bd3d,![]),_0x5b39dc[_0x2f8037(0x205)](_0x4c9322+_0x96a58f/0x2,_0x3be7b9,_0x96a58f/0x2,_0x55abb2,_0x31bd3d),_0x5b39dc['gradientFillRect'](_0x26a848,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x3e8e37,_0x31bd3d,![]),_0x5b39dc[_0x2f8037(0x205)](_0x26a848+_0x8eece3/0x2,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x385)](_0x4d0e5d,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x3e8e37,_0x31bd3d,![]),_0x5b39dc['fillRect'](_0x4d0e5d+_0x8eece3/0x2,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d)):(_0x5b39dc[_0x2f8037(0x205)](_0x4c9322,_0x3be7b9,_0x96a58f/0x2,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x385)](_0x4c9322+_0x96a58f/0x2,_0x3be7b9,_0x96a58f/0x2,_0x55abb2,_0x31bd3d,_0x3e8e37,![]),_0x5b39dc[_0x2f8037(0x205)](_0x26a848,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x385)](_0x26a848+_0x8eece3/0x2,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d,_0x3e8e37,![]),_0x5b39dc[_0x2f8037(0x205)](_0x4d0e5d,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x385)](_0x4d0e5d+_0x8eece3/0x2,_0x3be7b9,_0x8eece3/0x2,_0x55abb2,_0x31bd3d,_0x3e8e37,![]));break;default:_0x5b39dc[_0x2f8037(0x205)](_0x4c9322,_0x3be7b9,_0x96a58f,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x205)](_0x26a848,_0x3be7b9,_0x8eece3,_0x55abb2,_0x31bd3d),_0x5b39dc[_0x2f8037(0x205)](_0x4d0e5d,_0x3be7b9,_0x8eece3,_0x55abb2,_0x31bd3d);break;}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]['drawBgImage']=function(_0x295b0f){const _0xc9fac9=_0x5e0d52;this[_0xc9fac9(0x217)]=new Sprite(),this['_bgImageSprite'][_0xc9fac9(0x213)]=_0x295b0f,this['addChildToBack'](this['_bgImageSprite']);const _0x424131=Window_OTB_TurnOrder['Settings'];this['_bgImageSprite']['x']=_0x424131[_0xc9fac9(0x210)],this[_0xc9fac9(0x217)]['y']=_0x424131[_0xc9fac9(0x16b)];},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x2db)]=function(){const _0x4bdf43=_0x5e0d52;this['contents'][_0x4bdf43(0x274)](),this[_0x4bdf43(0x2f1)]();const _0x4a8c37=Window_OTB_TurnOrder[_0x4bdf43(0x369)];this[_0x4bdf43(0x244)][_0x4bdf43(0x16a)]=_0x4a8c37[_0x4bdf43(0x23e)];let _0x38b1a9=_0x4a8c37[_0x4bdf43(0x1b5)];_0x38b1a9===_0x4bdf43(0x20c)&&(_0x38b1a9=_0x4a8c37['OrderDirection']?_0x4bdf43(0x239):'left');let _0x1c290a=_0x4a8c37['SpriteLength'];if(_0x4a8c37[_0x4bdf43(0x25d)]!==''){const _0x27414b=this[_0x4bdf43(0x22e)]+_0x4a8c37[_0x4bdf43(0x362)],_0x5d0286=_0x1c290a+_0x4a8c37[_0x4bdf43(0x35b)],_0x592bab=_0x4a8c37['SpriteThin'];this[_0x4bdf43(0x31a)](_0x4a8c37['UiSubjectText'],_0x27414b,_0x5d0286,_0x592bab,_0x4bdf43(0x28b));}if(_0x4a8c37[_0x4bdf43(0x1ab)]!==''){const _0x287416=this[_0x4bdf43(0x19d)]+_0x4a8c37[_0x4bdf43(0x211)],_0x22cd21=_0x1c290a+_0x4a8c37[_0x4bdf43(0x1d7)],_0xe94455=this['_spriteGroupWidth'];this[_0x4bdf43(0x31a)](_0x4a8c37[_0x4bdf43(0x1ab)],_0x287416,_0x22cd21,_0xe94455,_0x38b1a9);}if(_0x4a8c37[_0x4bdf43(0x304)]!==''){const _0x3b6d34=this[_0x4bdf43(0x203)]+_0x4a8c37['UiNextOffsetX'],_0x417b6b=_0x1c290a+_0x4a8c37['UiNextOffsetY'],_0x562c8c=this[_0x4bdf43(0x2ac)];this[_0x4bdf43(0x31a)](_0x4a8c37['UiNextText'],_0x3b6d34,_0x417b6b,_0x562c8c,_0x38b1a9);}},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x197)]=function(){const _0x64c140=_0x5e0d52,_0x425542=Window_OTB_TurnOrder[_0x64c140(0x369)];this[_0x64c140(0x1ce)]=new Sprite(),this[_0x64c140(0x2b6)](this[_0x64c140(0x1ce)]),this[_0x64c140(0x1bb)]=null,this[_0x64c140(0x2ff)]=[],this[_0x64c140(0x1d5)]=[],this[_0x64c140(0x313)]=new Sprite(),this[_0x64c140(0x313)]['x']=_0x425542[_0x64c140(0x159)],this[_0x64c140(0x313)]['y']=_0x425542[_0x64c140(0x2e7)],this[_0x64c140(0x313)]['x']-=Math[_0x64c140(0x297)](_0x425542[_0x64c140(0x303)]*0.5*_0x425542['PreviewScale']),_0x425542[_0x64c140(0x26d)]&&(this[_0x64c140(0x313)]['x']+=_0x425542['SpriteThin']),this[_0x64c140(0x313)]['y']-=Math['ceil'](_0x425542[_0x64c140(0x180)]*0.5*_0x425542[_0x64c140(0x284)]),this['addChild'](this[_0x64c140(0x313)]),this[_0x64c140(0x283)]=[],this['_previewNext']=[];},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x356)]=function(){const _0x2f99a7=_0x5e0d52;Window_Base[_0x2f99a7(0x1c7)][_0x2f99a7(0x356)][_0x2f99a7(0x262)](this),this[_0x2f99a7(0x2af)](),this[_0x2f99a7(0x29f)](),this[_0x2f99a7(0x35c)](),this['sortContainer']();},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x27d)]=function(){const _0x28d288=_0x5e0d52;this[_0x28d288(0x32d)]=!![];},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x2af)]=function(){const _0xa5d83=_0x5e0d52;if(!this['_requestTurnOrderUpdate'])return;this[_0xa5d83(0x32d)]=![];for(const _0x32e758 of this[_0xa5d83(0x2ff)]){if(!_0x32e758)continue;_0x32e758['calculateTargetPositions']();}for(const _0x2c3fd1 of this[_0xa5d83(0x1d5)]){if(!_0x2c3fd1)continue;_0x2c3fd1[_0xa5d83(0x1f9)]();}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x29f)]=function(){const _0x441ba2=_0x5e0d52,_0x427699=Window_OTB_TurnOrder[_0x441ba2(0x369)];if(_0x427699[_0x441ba2(0x36c)]!==_0x441ba2(0x36f))return;if(!_0x427699[_0x441ba2(0x1dd)])return;const _0x2f5d87=SceneManager[_0x441ba2(0x19c)]['_helpWindow'];if(!_0x2f5d87)return;_0x2f5d87['visible']?(this['x']=this[_0x441ba2(0x281)]+(_0x427699[_0x441ba2(0x1b6)]||0x0),this['y']=this[_0x441ba2(0x1dc)]+(_0x427699[_0x441ba2(0x25c)]||0x0)):(this['x']=this[_0x441ba2(0x281)],this['y']=this[_0x441ba2(0x1dc)]);const _0x499755=SceneManager[_0x441ba2(0x19c)][_0x441ba2(0x22b)];Window_OTB_TurnOrder[_0x441ba2(0x15d)]===undefined&&(Window_OTB_TurnOrder[_0x441ba2(0x15d)]=Math[_0x441ba2(0x365)]((Graphics[_0x441ba2(0x2c2)]-Math[_0x441ba2(0x1ae)](Graphics[_0x441ba2(0x29d)],_0x499755[_0x441ba2(0x2c2)]))/0x2));Window_OTB_TurnOrder[_0x441ba2(0x28c)]===undefined&&(Window_OTB_TurnOrder[_0x441ba2(0x28c)]=Math[_0x441ba2(0x365)]((Graphics['height']-Math[_0x441ba2(0x1ae)](Graphics[_0x441ba2(0x1f8)],_0x499755[_0x441ba2(0x15f)]))/0x2));;this['x']+=_0x499755['x']-Window_OTB_TurnOrder[_0x441ba2(0x15d)],this['y']+=_0x499755['y']-Window_OTB_TurnOrder['_ogWindowLayerY'];},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]['updateVisibility']=function(){const _0x57fd4=_0x5e0d52;this[_0x57fd4(0x295)]=$gameSystem['isBattleSystemOTBTurnOrderVisible']();if(BattleManager[_0x57fd4(0x2e4)]===_0x57fd4(0x36d)){if(!this[_0x57fd4(0x2e2)]){const _0x473575=Window_OTB_TurnOrder['Settings'];this[_0x57fd4(0x2e2)]=Math[_0x57fd4(0x297)](0xff/(_0x473575[_0x57fd4(0x18a)]||0x1));}this[_0x57fd4(0x30b)]-=this['_fadeSpeed'],this[_0x57fd4(0x386)]-=this['_fadeSpeed'],this[_0x57fd4(0x2f2)][_0x57fd4(0x30b)]-=this[_0x57fd4(0x2e2)];}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x1d6)]=function(){const _0x3a4422=_0x5e0d52;if(!this['_spriteContainer'])return;const _0x42a5ec=Window_OTB_TurnOrder[_0x3a4422(0x369)],_0x27b63c=_0x42a5ec[_0x3a4422(0x26d)];_0x27b63c?this[_0x3a4422(0x1ce)][_0x3a4422(0x18b)]['sort']((_0x75f01b,_0x25204e)=>_0x75f01b['x']-_0x25204e['x']):this[_0x3a4422(0x1ce)]['children'][_0x3a4422(0x1ad)]((_0x11dfc1,_0x3c29ad)=>_0x3c29ad['x']-_0x11dfc1['x']);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]['removeSprite']=function(_0x14d802){const _0x22f39e=_0x5e0d52;if(!_0x14d802)return;_0x14d802[_0x22f39e(0x2cb)]&&_0x14d802['_sourceArray'][_0x22f39e(0x33e)](_0x14d802);const _0x2284ae=Window_OTB_TurnOrder[_0x22f39e(0x369)],_0x3a0fdb=0x3e8/0x3c*_0x2284ae[_0x22f39e(0x18a)]+0x1f4;_0x14d802[_0x22f39e(0x1a9)](0x0),setTimeout(this['processSpriteRemoval']['bind'](this,_0x14d802),_0x3a0fdb);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x21b)]=function(_0x4e03b6){const _0x3d6123=_0x5e0d52;_0x4e03b6[_0x3d6123(0x2cb)]&&_0x4e03b6[_0x3d6123(0x2cb)][_0x3d6123(0x33e)](_0x4e03b6),this[_0x3d6123(0x1ce)]['removeChild'](_0x4e03b6),this['_previewContainer']['removeChild'](_0x4e03b6);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x323)]=function(){const _0x5444c0=_0x5e0d52;if(!this[_0x5444c0(0x1bb)])return;this[_0x5444c0(0x189)](this[_0x5444c0(0x1bb)]);},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x265)]=function(){const _0x56fff2=_0x5e0d52;while(this[_0x56fff2(0x2ff)]['length']){const _0x2b3f9c=this[_0x56fff2(0x2ff)][_0x56fff2(0x182)]();_0x2b3f9c[_0x56fff2(0x1a9)](0x0);}while(this['_nextTurn']['length']){const _0x45b61e=this[_0x56fff2(0x1d5)][_0x56fff2(0x182)]();if(!_0x45b61e)continue;this['_currentTurn'][_0x56fff2(0x2de)](_0x45b61e);}for(const _0x29d12b of this['_currentTurn']){if(!_0x29d12b)continue;_0x29d12b[_0x56fff2(0x30e)](this[_0x56fff2(0x2ff)]);}},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x2dd)]=function(_0x4524ab,_0x43a20d){const _0x4ec57d=_0x5e0d52,_0xee2ca9=_0x4524ab===BattleManager['_actionBattlers']?this['_currentTurn']:this[_0x4ec57d(0x1d5)],_0x20b81f={};for(const _0x2fde3a of _0x4524ab){const _0x48423c='%1-%2'['format'](_0x2fde3a[_0x4ec57d(0x2a5)]()?_0x4ec57d(0x312):_0x4ec57d(0x23f),_0x2fde3a['index']());_0x20b81f[_0x48423c]=_0x20b81f[_0x48423c]||0x0;const _0x3f8f78=_0x20b81f[_0x48423c]++,_0x5d7636=new Sprite_OTB_TurnOrder_Battler(_0x2fde3a,_0x3f8f78,_0xee2ca9);this[_0x4ec57d(0x1ce)][_0x4ec57d(0x2b6)](_0x5d7636),_0xee2ca9[_0x4ec57d(0x2de)](_0x5d7636);}for(const _0x165fdb of _0xee2ca9){if(!_0x165fdb)continue;_0x165fdb[_0x4ec57d(0x1a9)](0xff),_0x165fdb[_0x4ec57d(0x1f9)](),_0x43a20d&&(_0x165fdb[_0x4ec57d(0x30b)]=0xff,_0x165fdb['x']=_0x165fdb[_0x4ec57d(0x1b8)],_0x165fdb['_positionDuration']=0x0);}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x1aa)]=function(){const _0x4cbd57=_0x5e0d52,_0x3c8f00=BattleManager[_0x4cbd57(0x268)];this[_0x4cbd57(0x2dd)](_0x3c8f00);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x1a5)]=function(_0x2af271,_0x3a7999){const _0x1e38e3=_0x5e0d52;this['removeCurrentSubject']();for(const _0x8f7632 of this[_0x1e38e3(0x2ff)]){if(!_0x8f7632)continue;_0x8f7632[_0x1e38e3(0x287)]()===_0x2af271&&(_0x8f7632[_0x1e38e3(0x270)]=_0x8f7632[_0x1e38e3(0x270)]||0x0,_0x8f7632[_0x1e38e3(0x270)]--);}const _0x569d87=this[_0x1e38e3(0x2ff)][_0x1e38e3(0x315)](_0x521aff=>_0x521aff[_0x1e38e3(0x287)]()===_0x2af271);if(this['_currentTurn'][_0x569d87])this[_0x1e38e3(0x1bb)]=this[_0x1e38e3(0x2ff)][_0x569d87],this[_0x1e38e3(0x2ff)][_0x569d87][_0x1e38e3(0x1f9)](),this['_currentTurn']['splice'](_0x569d87,0x1);else{if(_0x2af271){const _0x2554c3=new Sprite_OTB_TurnOrder_Battler(_0x2af271,-0x1,null);this[_0x1e38e3(0x1ce)]['addChild'](_0x2554c3),this['_subject']=_0x2554c3,_0x2554c3['startFade'](0xff),_0x2554c3[_0x1e38e3(0x1f3)]=0x258,_0x2554c3['x']=this[_0x1e38e3(0x22e)],_0x2554c3['_positionTargetX']=this['_subjectX'],_0x3a7999&&(_0x2554c3['opacity']=0xff);}}for(const _0x3e2860 of this[_0x1e38e3(0x2ff)]){if(!_0x3e2860)continue;_0x3e2860[_0x1e38e3(0x1f9)]();}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x1f0)]=function(){const _0x2656c4=_0x5e0d52;for(const _0x5113b2 of this[_0x2656c4(0x2ff)]){if(!_0x5113b2)continue;const _0xa2b77f=_0x5113b2['battler']();if(BattleManager[_0x2656c4(0x18c)][_0x2656c4(0x1c5)](_0xa2b77f))continue;this[_0x2656c4(0x189)](_0x5113b2);}for(const _0x26f413 of this[_0x2656c4(0x1d5)]){if(!_0x26f413)continue;const _0x1b18e5=_0x26f413[_0x2656c4(0x287)]();if(BattleManager['_otb_actionBattlersNext'][_0x2656c4(0x1c5)](_0x1b18e5))continue;this[_0x2656c4(0x189)](_0x26f413);}},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x2bc)]=function(_0x258ebd,_0x115089){const _0x486e85=_0x5e0d52,_0x2dcb77=_0x115089===BattleManager['_actionBattlers']?this[_0x486e85(0x2ff)]:this[_0x486e85(0x1d5)];if(!_0x2dcb77)return;const _0x243da9=VisuMZ[_0x486e85(0x22f)][_0x486e85(0x177)](_0x258ebd,_0x115089),_0xcee209=_0x243da9['length']-0x1,_0x1c317f=new Sprite_OTB_TurnOrder_Battler(_0x258ebd,_0xcee209,_0x2dcb77);this[_0x486e85(0x1ce)][_0x486e85(0x2b6)](_0x1c317f),_0x2dcb77['push'](_0x1c317f),_0x1c317f[_0x486e85(0x1a9)](0xff),this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x228)]=function(_0x213d60,_0x5505ef){const _0x4c453f=_0x5e0d52,_0x318b65=_0x5505ef===BattleManager[_0x4c453f(0x18c)]?this['_currentTurn']:this[_0x4c453f(0x1d5)];if(!_0x318b65)return;for(const _0x19996e of _0x318b65){if(!_0x19996e)continue;_0x19996e[_0x4c453f(0x287)]()===_0x213d60&&(_0x19996e[_0x4c453f(0x270)]=_0x19996e[_0x4c453f(0x270)]||0x0,_0x19996e[_0x4c453f(0x270)]++);}const _0x10e4cc=0x0,_0x5e6648=new Sprite_OTB_TurnOrder_Battler(_0x213d60,_0x10e4cc,_0x318b65);this['_spriteContainer'][_0x4c453f(0x2b6)](_0x5e6648),_0x318b65[_0x4c453f(0x359)](_0x5e6648),_0x5e6648['startFade'](0xff),_0x5e6648[_0x4c453f(0x1f3)]=0x258,_0x5e6648['x']=this[_0x4c453f(0x22e)],this[_0x4c453f(0x27d)]();},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]['addForceActionBattler']=function(_0x1c2da1,_0x207ced){const _0x39dd7b=_0x5e0d52,_0x173dfd=this['_currentTurn'];if(!_0x173dfd)return;let _0x15a180=0x0;for(let _0x35b58d=0x0;_0x35b58d<_0x207ced;_0x35b58d++){const _0x96e72=_0x173dfd[_0x35b58d];if(!_0x96e72)continue;if(_0x96e72[_0x39dd7b(0x287)]()!==_0x1c2da1)continue;_0x15a180=_0x96e72['_instance']+0x1;}for(let _0x179226=_0x207ced;_0x179226<_0x173dfd[_0x39dd7b(0x196)];_0x179226++){const _0x931a17=_0x173dfd[_0x179226];if(!_0x931a17)continue;if(_0x931a17[_0x39dd7b(0x287)]()!==_0x1c2da1)continue;_0x931a17[_0x39dd7b(0x270)]=_0x931a17[_0x39dd7b(0x270)]||0x0,_0x931a17[_0x39dd7b(0x270)]++;}const _0x4f414d=new Sprite_OTB_TurnOrder_Battler(_0x1c2da1,_0x15a180,_0x173dfd);this[_0x39dd7b(0x1ce)][_0x39dd7b(0x2b6)](_0x4f414d),_0x173dfd['splice'](_0x207ced,0x0,_0x4f414d),_0x4f414d['startFade'](0xff),_0x4f414d[_0x39dd7b(0x1f3)]=0x258,_0x4f414d['x']=this[_0x39dd7b(0x22e)],this[_0x39dd7b(0x27d)]();},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x357)]=function(){const _0x25dd3a=_0x5e0d52;this[_0x25dd3a(0x2dd)](BattleManager[_0x25dd3a(0x18c)],!![]),this[_0x25dd3a(0x2dd)](BattleManager[_0x25dd3a(0x268)],!![]),this[_0x25dd3a(0x1a5)](BattleManager['_subject'],!![]),this[_0x25dd3a(0x1d6)]();},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)]['previewOrderByAction']=function(_0x310ea2){const _0x1465c1=_0x5e0d52;this[_0x1465c1(0x276)](),_0x310ea2&&_0x310ea2[_0x1465c1(0x307)]()!==null&&this[_0x1465c1(0x249)](_0x310ea2);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x276)]=function(){const _0x13b9e9=_0x5e0d52;for(const _0x2ce081 of this[_0x13b9e9(0x313)][_0x13b9e9(0x18b)]){if(!_0x2ce081)continue;this[_0x13b9e9(0x189)](_0x2ce081);}},Window_OTB_TurnOrder['prototype'][_0x5e0d52(0x249)]=function(_0x45a511){const _0x5f36cb=_0x5e0d52,_0x4c1e10=_0x45a511['subject'](),_0x53553e=_0x45a511['otbCalcUserCurrentOrderChange'](),_0x3ac792=_0x45a511['otbCalcUserNextOrderChange']();_0x53553e!==0x0&&this[_0x5f36cb(0x16d)](_0x4c1e10,![],_0x53553e);_0x3ac792!==0x0&&this[_0x5f36cb(0x16d)](_0x4c1e10,!![],_0x3ac792);if(!_0x45a511[_0x5f36cb(0x2fc)]())return;const _0x166f21=SceneManager['_scene'][_0x5f36cb(0x202)],_0x20797e=SceneManager[_0x5f36cb(0x19c)]['_enemyWindow'];let _0xe4018a=null;if(_0x166f21&&_0x166f21['active'])_0xe4018a=_0x166f21[_0x5f36cb(0x312)](_0x166f21[_0x5f36cb(0x1d3)]());else _0x20797e&&_0x20797e[_0x5f36cb(0x1d4)]&&(_0xe4018a=_0x20797e[_0x5f36cb(0x23f)]());if(!_0xe4018a)return;const _0x28f2c8=_0x45a511[_0x5f36cb(0x18d)](_0xe4018a),_0x3f89eb=_0x45a511[_0x5f36cb(0x384)](_0xe4018a);_0x28f2c8!==0x0&&this[_0x5f36cb(0x16d)](_0xe4018a,![],_0x28f2c8),_0x3f89eb!==0x0&&this[_0x5f36cb(0x16d)](_0xe4018a,!![],_0x3f89eb);},Window_OTB_TurnOrder[_0x5e0d52(0x1c7)][_0x5e0d52(0x16d)]=function(_0x27d11c,_0x253a2f,_0x264ae5){const _0x5c3e74=_0x5e0d52;if(!_0x27d11c)return;if(_0x264ae5===0x0)return;const _0x33653d=_0x253a2f?BattleManager[_0x5c3e74(0x268)]:BattleManager[_0x5c3e74(0x18c)],_0x50bf50=VisuMZ[_0x5c3e74(0x22f)][_0x5c3e74(0x177)](_0x27d11c,_0x33653d),_0x3812c7=_0x253a2f?this['_nextTurn']:this[_0x5c3e74(0x2ff)],_0x1e5f6c=_0x253a2f?this[_0x5c3e74(0x1cf)]:this[_0x5c3e74(0x283)];if(_0x50bf50['length']<=0x0)return;for(let _0x5135df=0x0;_0x5135df<_0x50bf50[_0x5c3e74(0x196)];_0x5135df++){const _0x4aa535=new Sprite_OTB_TurnOrder_Preview(_0x27d11c,_0x5135df,_0x3812c7,_0x264ae5);this[_0x5c3e74(0x313)][_0x5c3e74(0x2b6)](_0x4aa535),_0x1e5f6c[_0x5c3e74(0x2de)](_0x4aa535),_0x4aa535[_0x5c3e74(0x1f9)](),_0x4aa535[_0x5c3e74(0x1a9)](0xff);}};