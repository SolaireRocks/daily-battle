//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
 * 
 * ---
 * 
 * Turn Count for Enemies
 * 
 * Because the turn structure is changed, enemies will now have a different
 * turn count structure. Their turn count only raises when the enemy troops
 * have a turn instead of every battle turn. This means if an enemy skill page
 * has a Turn Count condition of 3, it'll mean when the enemy team has gotten
 * 3 turns, which will usually be around turn 6 for the whole battle.
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Current Turn Revival Act?:
 *   - Allow revived actors to act the current turn they're revived?
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.13: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if the entire party is completely restricted via stun,
 *    charm, confusion, or berserk, entire turns would be skipped for both
 *    actors and enemies. Fix made by Irina.
 * 
 * Version 1.12: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Mechanics > Current Turn Revival Act?:
 * **** Allow revived actors to act the current turn they're revived?
 * 
 * Version 1.11: December 14, 2023
 * * Bug Fixes!
 * ** Enemy skills with Turn Count conditions will now apply a local turn count
 *    instead of the battle turn count. Fix made by Olivia.
 * * Documentation Update!
 * ** Updated "Major Changes" section:
 * *** Turn Count for Enemies
 * **** Because the turn structure is changed, enemies will now have a
 *      different turn count structure. Their turn count only raises when the
 *      enemy troops have a turn instead of every battle turn. This means if an
 *      enemy skill page has a Turn Count condition of 3, it'll mean when the
 *      enemy team has gotten 3 turns, which will usually be around turn 6 for
 *      the whole battle.
 * 
 * Version 1.10: October 20, 2022
 * * Bug Fixes!
 * ** Fixed problem with the Action Count Display's Actor Offset Y not working
 *    properly. Fix made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.08: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.07: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.06: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param RevivalAct:eval
 * @text Current Revival Act?
 * @parent Main
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow revived actors to act the current turn they're revived?
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x5cc726=_0x5870;(function(_0x18f9ab,_0x3fd530){const _0x4353c5=_0x5870,_0x1aaa50=_0x18f9ab();while(!![]){try{const _0x517ca5=parseInt(_0x4353c5(0x2ba))/0x1+parseInt(_0x4353c5(0x24c))/0x2*(parseInt(_0x4353c5(0x1da))/0x3)+parseInt(_0x4353c5(0x24e))/0x4*(parseInt(_0x4353c5(0x30b))/0x5)+parseInt(_0x4353c5(0x1be))/0x6*(-parseInt(_0x4353c5(0x229))/0x7)+-parseInt(_0x4353c5(0x1a6))/0x8+-parseInt(_0x4353c5(0x1cd))/0x9+parseInt(_0x4353c5(0x2f5))/0xa;if(_0x517ca5===_0x3fd530)break;else _0x1aaa50['push'](_0x1aaa50['shift']());}catch(_0x2eaa5f){_0x1aaa50['push'](_0x1aaa50['shift']());}}}(_0x4c9d,0xa8f7f));function _0x4c9d(){const _0x5a94aa=['ShowCostForGuard','setBattleSystem','refresh','BattleManager_isTurnBased','Game_Action_speed','highest\x20agi','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_storedBitmaps','cursorPageup','createActorCommandWindowFTB','Game_Battler_forceAction','addText','ftbPartyTeamShift','imageSmoothingEnabled','ImageSize','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','commandCancelFTB','width','EnemyOffsetX','getBattleSystem','_preemptive','canUse','_actorCommandWindow','checkNeedsUpdate','Game_Battler_useItem','endTurn','payActionCostFTB','LoseDiff','initialize','_FTB_COST_SHOW_0','Game_Enemy_transform','ActionCountDisplay','Game_BattlerBase_updateStateTurns','FUNC','sort','_maxActions','_FTB_BETWEEN_TEAMS_WAIT','isTurnBased','guardSkillId','startInput','1217258HHvmjv','isTpb','getActionCostFTB','endActionFTB','reduce','releaseUnequippableItems','length','BattleManager_battleSys','GenerateBase','clamp','_currentActor','updateStateTurns','ftbHighestAgility','battler','ActionCountAbbr','startDamagePopup','_doubleTouch','screenX','VisuMZ_3_BattleAI','ActionPointCost','speed','battleSys','selectNextActor','Game_Actor_changeEquip','filter','changeClass','isSkill','average\x20agi','ActionsRemainingOffsetY','BattleManager_isActiveTpb','STR','some','agi','addLoadListener','_ftbActionsMax','_FTB_RESET_INDEX','status','clearStates','ActorOffsetX','concat','ARRAYJSON','padding','create','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','removeBuff','prototype','startBattleFTB','_partyCommandWindow','EVAL','Scene_Battle_createAllWindows','_ftbTeamOdd','makeActionOrders','forceChangeEquip','ItemQuantityFontSize','MaxActions','selectNextActorFTB','resetTurnCountFTB','ActorActionsIcon','constructor','10097390PnyCOQ','inBattle','Game_Battler_addDebuff','skillCostSeparator','processTouchFTB','currentAction','MaxVisible','unshift','ARRAYFUNC','addState','BattleManager_endAction','isDead','_scene','_ftbPartyActionCountWindow','startTurnFTB','canActorBeSelectedFTB','Show_1_Action_Cost','_ftbTeamEven','AllowOverflow','removeActionBattlersFTB','index','createActionsFTB','5620RIxqOw','_ftbLastIndex','isAlive','Game_Actor_forceChangeEquip','initMembers','_inputting','note','setTarget','indexOf','Scene_Battle_commandCancel','_action','Game_BattlerBase_appear','performTurnEndFTB','actors','isTeamBased','decideRandomTarget','Visible','isOpen','description','loseCurrentActionsFTB','loadPicture','keepPrevSubjectFTB','finishActorInput','Current','StateBuffUpdate','Game_System_initialize','recalculateActionsFTB','clearPassTurnFTB','BattleManager_selectNextActor','ftbActorActionsIcon','item','CostPosition','Window_Selectable_cursorPageup','drawActionsRemaining','addChildAt','_subject','ActorOffsetY','BattleManager_endAllBattlersTurn','endTurnFTB','Game_BattlerBase_updateBuffTurns','allMembers','format','processSwitchActors','ftbActionPointsAbbr','STRUCT','playCursorSound','reduceActionsFTB','push','contents','ActionsRemainingOffsetX','randomInt','_actor','repositionLogWindowFTB','Nothing','hide','_forcedBattlers','applyGlobalFTB','NUM','makeActions','textWidth','_statusWindow','getMaxActionsFTB','EnemyOffsetY','DefaultCostItem','VisuMZ_1_ItemsEquipsCore','useItem','Game_BattlerBase_canUse','EmptyActionsIcon','canDrawActionsRemaining','applyGlobal','makeAdditionalSkillCostText','loadSystem','gainCurrentActionsFTB','_FTB_COST_SHOW_1','Game_Party_canInput','createContentsArray','drawBigIcon','setCurrentActionsFTB','windowRect','DrawActionsRemaining','_handlers','BattleManager_isTpb','transform','ftbTroopTeamShift','JSON','DefaultCostSkill','forceActionFTB','setMaxActionsFTB','startActorInput','increaseTurnFTB','round','numItems','5599368FQQhii','BattleManager_endTurn','addBuff','pop','cursorLeft','processTouch','match','ftbCreateTeamSwitchText','_FTB_ACTION_AGI_BUFF','_ftbTurnAdvantageUnit','BattleManager_startBattle','addDebuff','getNextSubject','includes','_context','update','%1ActionPicture','initMembersFTB','Scene_Battle_commandFight','drawItemNumberFTB','selectNextCommand','canActFTB','BattleManager_startInput','createAllWindows','18ehOLBh','ConvertParams','registerCommand','_buffs','ftbEnemyActionsIcon','maxCols','attackSkillId','updatePadding','Game_Troop_increaseTurn','updatePosition','Game_Battler_onTurnEnd','Window_Selectable_cursorRight','BattleManager_invokeCounterAttack','setText','FTB','8166978mpxEtz','ActionsRemainingFontSize','PictureSmoothing','ScreenBufferY','_turnCountFTB','setUnit','Game_Battler_addState','_bypassStateTurnUpdatesFTB','AgiBuff','ftbTotalAgility','makeActionOrdersFTB','_ftbActionCountVisible','KeepPrevActor','139137FAdcZv','isActiveTpb','setup','FreeChange','isFTB','EnemyActionPicture','call','aliveMembers','createActorCommandWindow','commandFight','Actor','getChildIndex','processTurn','TroopTeamShiftFmt','appear','BattleManager_isTeamBased','onTurnEnd','_logWindow','Game_Actor_selectNextCommand','_FTB_ACTION_BASE','PartyTeamShiftFmt','Window_Base_drawItemNumber','max','General','total\x20agi','setLastFtbIndex','discardEquip','_FTB_NEUTRAL_TURN_ADVANTAGE','BattleManager_processTurn','resetFontSettings','Mechanics','BattleSystemFTB','forceAction','updateTurn','bind','_FTB_GUARD_PASS','ScreenBufferX','_actionBattlers','cancel','fontSize','ARRAYSTRUCT','getCurrentActionsFTB','BattleManager_setup','VisuMZ_0_CoreEngine','Game_Battler_removeState','ftbFreeRangeSwitch','drawImage','innerWidth','ftbActionPointsFull','_currentActions','BattleManager_finishActorInput','ShowActionPointCost','members','setSkill','startActorCommandSelection','createActionCountWindowsFTB','_unit','ftbSwitchActorDirection','_FTB_COST_POSITION','canMove','NewTurnResetIndex','_FTB_COST_SHOW_GUARD','shift','isTriggered','Game_Battler_addBuff','Game_Actor_discardEquip','updateStateTurnsFTB','initBattleSystemFTB','_inBattle','setBackgroundType','createStartingCoordinates','stepBack','textSizeEx','_FTB_MIN_ACTIONS','VisuMZ_3_BattleAI\x20needs\x20to\x20be\x20updated\x20','meetEndTurnConditionsFTB','Game_Battler_onBattleStart','\x5cI[%1]','ftbLowestAgility','2515289QjWICc','changeEquip','drawItemNumber','removeStatesAuto','RevivalAct','ImageGapDistance','_FTB_MAX_ACTIONS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawText','endAllBattlersTurn','_passedTurnFTB','parameters','EnemyActionsIcon','onBattleStart','friendsUnit','onTouchSelectFTB','Game_Action_applyGlobal','IconSmoothing','Window_Selectable_cursorPagedown','subject','Window_Selectable_cursorLeft','Game_Battler_removeBuff','_forceAction','map','PassTurn','cursorPagedown','select','agility','return\x200','DrawHorz','LogWindowTopOffsetY','Game_Unit_onBattleStart','startBattle','setBattleSystemFTBActionCountVisible','blt','4zPBizu','exit','3764IYnZJl','IconSet','ActorActionPicture','_actions','battleEnd','ItemQuantityFmt','random','Game_Battler_performCollapse','drawPicture','setItem','in\x20order\x20for\x20VisuMZ_2_BattleSystemFTB\x20to\x20work.','Window_Base_makeAdditionalSkillCostText','_FTB_KEEP_PREV_ACTOR','Scene_Battle_createActorCommandWindow','_FTB_FREE_CHANGE','Game_Actor_changeEquipById','SystemActionCountVisibility','enemies','isBattleSystemFTBActionCountVisible','clear','DTB','performCollapse','toLowerCase','isSideView','processTurnFTB','turnCount','updateBuffTurns','ftbEmptyActionsIcon','startTurn','battleMembers','_FTB_RECALC_ADD_DIFF','iconHeight','startInputFTB','opacity','canInput','Window_Help_setItem','Game_Actor_releaseUnequippableItems','ARRAYNUM','RegExp','Game_Battler_turnCount','_ftbCurrentUnit','isPassingTurnFTB','_FTB_RECALC_SUB_DIFF','_ftbTroopActionCountWindow','version','height','Game_BattlerBase_clearStates','ftbAliveMembers','passTurnFTB','makeAdditionalCostTextFTB','min','Window_Selectable_processTouch','RepositionTopHelpY','BattleManager_forceAction','isActor','_FTB_ACTION_AGI_DEBUFF','parse','_FTB_ACTION_OVERFLOW','ActionPointTraitPlus','BottomPosition','BattleAI','NeutralAdvantage','name','BattleManager_makeActionOrders','_ftbActionsCur','BattleManager_startTurn','Settings','Game_Actor_changeClass'];_0x4c9d=function(){return _0x5a94aa;};return _0x4c9d();}var label='BattleSystemFTB',tier=tier||0x0,dependencies=[_0x5cc726(0x205),'VisuMZ_1_BattleCore',_0x5cc726(0x34b),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x5cc726(0x2d2)](function(_0x59b0d8){const _0x39d24d=_0x5cc726;return _0x59b0d8[_0x39d24d(0x2de)]&&_0x59b0d8['description'][_0x39d24d(0x1b3)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5cc726(0x290)]||{},VisuMZ[_0x5cc726(0x1bf)]=function(_0x13b6b6,_0x4d84a8){const _0xd5496f=_0x5cc726;for(const _0x48853a in _0x4d84a8){if(_0x48853a[_0xd5496f(0x1ac)](/(.*):(.*)/i)){const _0x48d3d6=String(RegExp['$1']),_0x358925=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x9c2e0f,_0x354a57,_0x606dff;switch(_0x358925){case _0xd5496f(0x344):_0x9c2e0f=_0x4d84a8[_0x48853a]!==''?Number(_0x4d84a8[_0x48853a]):0x0;break;case _0xd5496f(0x273):_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57[_0xd5496f(0x240)](_0x10280d=>Number(_0x10280d));break;case _0xd5496f(0x2ea):_0x9c2e0f=_0x4d84a8[_0x48853a]!==''?eval(_0x4d84a8[_0x48853a]):null;break;case'ARRAYEVAL':_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57[_0xd5496f(0x240)](_0x320207=>eval(_0x320207));break;case _0xd5496f(0x35f):_0x9c2e0f=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):'';break;case _0xd5496f(0x2e2):_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57[_0xd5496f(0x240)](_0x5b1bad=>JSON[_0xd5496f(0x286)](_0x5b1bad));break;case _0xd5496f(0x2b3):_0x9c2e0f=_0x4d84a8[_0x48853a]!==''?new Function(JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a])):new Function(_0xd5496f(0x245));break;case _0xd5496f(0x2fd):_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57[_0xd5496f(0x240)](_0x4c99b4=>new Function(JSON[_0xd5496f(0x286)](_0x4c99b4)));break;case _0xd5496f(0x2d8):_0x9c2e0f=_0x4d84a8[_0x48853a]!==''?String(_0x4d84a8[_0x48853a]):'';break;case'ARRAYSTR':_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57[_0xd5496f(0x240)](_0x247247=>String(_0x247247));break;case _0xd5496f(0x337):_0x606dff=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):{},_0x9c2e0f=VisuMZ[_0xd5496f(0x1bf)]({},_0x606dff);break;case _0xd5496f(0x202):_0x354a57=_0x4d84a8[_0x48853a]!==''?JSON[_0xd5496f(0x286)](_0x4d84a8[_0x48853a]):[],_0x9c2e0f=_0x354a57['map'](_0x53c92c=>VisuMZ[_0xd5496f(0x1bf)]({},JSON[_0xd5496f(0x286)](_0x53c92c)));break;default:continue;}_0x13b6b6[_0x48d3d6]=_0x9c2e0f;}}return _0x13b6b6;},(_0x222015=>{const _0x10897f=_0x5cc726,_0x20bc45=_0x222015[_0x10897f(0x28c)];for(const _0x5be3f2 of dependencies){if(!Imported[_0x5be3f2]){alert(_0x10897f(0x2a1)['format'](_0x20bc45,_0x5be3f2)),SceneManager[_0x10897f(0x24d)]();break;}}const _0x5ed6ab=_0x222015[_0x10897f(0x31d)];if(_0x5ed6ab[_0x10897f(0x1ac)](/\[Version[ ](.*?)\]/i)){const _0x216db2=Number(RegExp['$1']);_0x216db2!==VisuMZ[label][_0x10897f(0x27a)]&&(alert(_0x10897f(0x298)['format'](_0x20bc45,_0x216db2)),SceneManager[_0x10897f(0x24d)]());}if(_0x5ed6ab['match'](/\[Tier[ ](\d+)\]/i)){const _0x140d45=Number(RegExp['$1']);_0x140d45<tier?(alert(_0x10897f(0x230)[_0x10897f(0x334)](_0x20bc45,_0x140d45,tier)),SceneManager['exit']()):tier=Math['max'](_0x140d45,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x10897f(0x290)],_0x222015[_0x10897f(0x234)]);})(pluginData),PluginManager[_0x5cc726(0x1c0)](pluginData[_0x5cc726(0x28c)],_0x5cc726(0x25e),_0xc241f9=>{const _0x4bc2b2=_0x5cc726;VisuMZ[_0x4bc2b2(0x1bf)](_0xc241f9,_0xc241f9);const _0x59782e=_0xc241f9[_0x4bc2b2(0x31b)];$gameSystem[_0x4bc2b2(0x24a)](_0x59782e);}),VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x274)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x5cc726(0x2bc)]=function(_0x4e7cbf){const _0x94c793=_0x5cc726;if(!_0x4e7cbf)return 0x0;const _0x3891f7=VisuMZ['BattleSystemFTB'][_0x94c793(0x290)]['Mechanics'],_0x50a95f=VisuMZ[_0x94c793(0x1f9)][_0x94c793(0x274)],_0x44bac4=_0x4e7cbf[_0x94c793(0x311)];if(_0x44bac4[_0x94c793(0x1ac)](_0x50a95f[_0x94c793(0x2cd)]))return Number(RegExp['$1']);else{if(DataManager[_0x94c793(0x2d4)](_0x4e7cbf))return _0x3891f7[_0x94c793(0x360)];else return DataManager['isItem'](_0x4e7cbf)?_0x3891f7[_0x94c793(0x34a)]:0x0;}},ImageManager[_0x5cc726(0x328)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f1)][_0x5cc726(0x2f3)],ImageManager[_0x5cc726(0x1c2)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f1)][_0x5cc726(0x235)],ImageManager[_0x5cc726(0x269)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f1)][_0x5cc726(0x34e)],TextManager[_0x5cc726(0x20a)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f1)]['ActionCountFull'],TextManager['ftbActionPointsAbbr']=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f1)][_0x5cc726(0x2c8)],TextManager['ftbCostFormat']=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f1)]['ActionCountCostFmt'],TextManager[_0x5cc726(0x29e)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f1)][_0x5cc726(0x1ee)],TextManager[_0x5cc726(0x35e)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f1)][_0x5cc726(0x1e7)],SceneManager['isSceneBattle']=function(){const _0x3e1f95=_0x5cc726;return this['_scene']&&this[_0x3e1f95(0x301)]['constructor']===Scene_Battle;},BattleManager[_0x5cc726(0x25c)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x1dd)],BattleManager[_0x5cc726(0x25a)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x1d9)],BattleManager[_0x5cc726(0x2dd)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x216)]??![],BattleManager[_0x5cc726(0x1fd)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f8)]['GuardPass'],BattleManager[_0x5cc726(0x26c)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f8)]['GainDiff'],BattleManager[_0x5cc726(0x278)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x2ad)],BattleManager[_0x5cc726(0x1f5)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x28b)],BattleManager[_0x5cc726(0x2b6)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f1)]['TeamShiftWait'],BattleManager[_0x5cc726(0x2e5)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x323)],VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2c1)]=BattleManager[_0x5cc726(0x2cf)],BattleManager[_0x5cc726(0x2cf)]=function(){const _0x2bad8a=_0x5cc726;if(this[_0x2bad8a(0x1de)]())return'FTB';return VisuMZ[_0x2bad8a(0x1f9)]['BattleManager_battleSys'][_0x2bad8a(0x1e0)](this);},BattleManager[_0x5cc726(0x1de)]=function(){const _0x4ef262=_0x5cc726;return $gameSystem[_0x4ef262(0x2a5)]()===_0x4ef262(0x1cc);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x35c)]=BattleManager['isTpb'],BattleManager[_0x5cc726(0x2bb)]=function(){const _0x9df5f0=_0x5cc726;if(this[_0x9df5f0(0x1de)]())return![];return VisuMZ[_0x9df5f0(0x1f9)]['BattleManager_isTpb'][_0x9df5f0(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2d7)]=BattleManager[_0x5cc726(0x1db)],BattleManager[_0x5cc726(0x1db)]=function(){const _0x37f12c=_0x5cc726;if(this['isFTB']())return![];return VisuMZ[_0x37f12c(0x1f9)][_0x37f12c(0x2d7)]['call'](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x295)]=BattleManager[_0x5cc726(0x2b7)],BattleManager[_0x5cc726(0x2b7)]=function(){const _0x282869=_0x5cc726;if(this[_0x282869(0x1de)]())return!![];return VisuMZ[_0x282869(0x1f9)][_0x282869(0x295)][_0x282869(0x1e0)](this);},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1e9)]=BattleManager[_0x5cc726(0x319)],BattleManager[_0x5cc726(0x319)]=function(){const _0x35f8ce=_0x5cc726;if(this[_0x35f8ce(0x1de)]())return!![];return VisuMZ[_0x35f8ce(0x1f9)][_0x35f8ce(0x1e9)][_0x35f8ce(0x1e0)](this);},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1bc)]=BattleManager[_0x5cc726(0x2b9)],BattleManager['startInput']=function(){const _0x1bb0c2=_0x5cc726;if(this[_0x1bb0c2(0x1de)]())this['_surprise']=![];VisuMZ[_0x1bb0c2(0x1f9)][_0x1bb0c2(0x1bc)][_0x1bb0c2(0x1e0)](this);if(this[_0x1bb0c2(0x1de)]()&&$gameParty[_0x1bb0c2(0x270)]())this['startInputFTB']();},BattleManager[_0x5cc726(0x26e)]=function(){const _0x38e808=_0x5cc726;this[_0x38e808(0x26a)]();},VisuMZ['BattleSystemFTB']['BattleManager_processTurn']=BattleManager[_0x5cc726(0x1e6)],BattleManager['processTurn']=function(){const _0x3ec4cb=_0x5cc726;this[_0x3ec4cb(0x1de)]()?this[_0x3ec4cb(0x266)]():VisuMZ['BattleSystemFTB'][_0x3ec4cb(0x1f6)]['call'](this);},BattleManager[_0x5cc726(0x266)]=function(){const _0x344e73=_0x5cc726,_0x3f8790=this[_0x344e73(0x32e)];if(_0x3f8790&&!_0x3f8790[_0x344e73(0x237)]()[_0x344e73(0x1bb)]())this['endAction'](),this[_0x344e73(0x32e)]=null,this[_0x344e73(0x1fb)](![]);else{if(_0x3f8790&&_0x3f8790[_0x344e73(0x284)]()&&_0x3f8790['canInput']()){const _0x392cf1=_0x3f8790[_0x344e73(0x2fa)]();if(!_0x392cf1)VisuMZ[_0x344e73(0x1f9)][_0x344e73(0x1f6)][_0x344e73(0x1e0)](this);else _0x392cf1[_0x344e73(0x23f)]?VisuMZ['BattleSystemFTB'][_0x344e73(0x1f6)]['call'](this):(this['_currentActor']=_0x3f8790,this[_0x344e73(0x1a2)]());}else VisuMZ[_0x344e73(0x1f9)]['BattleManager_processTurn'][_0x344e73(0x1e0)](this);}},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x20c)]=BattleManager[_0x5cc726(0x321)],BattleManager[_0x5cc726(0x321)]=function(){const _0xb7b095=_0x5cc726;this[_0xb7b095(0x1de)]()?VisuMZ['BattleSystemFTB'][_0xb7b095(0x1f6)]['call'](this):VisuMZ['BattleSystemFTB'][_0xb7b095(0x20c)][_0xb7b095(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x327)]=BattleManager[_0x5cc726(0x2d0)],BattleManager[_0x5cc726(0x2d0)]=function(){const _0x187bc3=_0x5cc726;this[_0x187bc3(0x1de)]()?this[_0x187bc3(0x2f1)]():VisuMZ[_0x187bc3(0x1f9)][_0x187bc3(0x327)]['call'](this);},BattleManager[_0x5cc726(0x2f1)]=function(){const _0x4affd1=_0x5cc726;this[_0x4affd1(0x2c4)]=null,this[_0x4affd1(0x310)]=![];},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2ff)]=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x5c40b5=_0x5cc726,_0x3c02a9=this['_subject'];VisuMZ[_0x5c40b5(0x1f9)][_0x5c40b5(0x2ff)][_0x5c40b5(0x1e0)](this),this[_0x5c40b5(0x2bd)](_0x3c02a9);},BattleManager[_0x5cc726(0x2bd)]=function(_0x584e85){const _0x2cebbd=_0x5cc726;if(!this[_0x2cebbd(0x1de)]())return;if(_0x584e85){const _0x1f47c4=_0x584e85[_0x2cebbd(0x251)][_0x2cebbd(0x2d2)](_0x4f1670=>_0x4f1670[_0x2cebbd(0x23f)]);_0x584e85[_0x2cebbd(0x345)]();if(_0x1f47c4){let _0x5765cf=_0x1f47c4[_0x2cebbd(0x2c0)];while(_0x5765cf--){_0x584e85[_0x2cebbd(0x251)][_0x2cebbd(0x1a9)]();}_0x584e85[_0x2cebbd(0x251)]=_0x1f47c4[_0x2cebbd(0x2e1)](_0x584e85[_0x2cebbd(0x251)]);}}if(this[_0x2cebbd(0x342)]['length']>0x0)this['_subject']&&(!this['_actionBattlers'][_0x2cebbd(0x1b3)](this[_0x2cebbd(0x32e)])&&this[_0x2cebbd(0x1ff)][_0x2cebbd(0x2fc)](this[_0x2cebbd(0x32e)])),this[_0x2cebbd(0x32e)]=this[_0x2cebbd(0x1b2)]();else this[_0x2cebbd(0x320)](_0x584e85)&&(this[_0x2cebbd(0x32e)]=_0x584e85);_0x584e85[_0x2cebbd(0x237)]()[_0x2cebbd(0x1f3)](_0x584e85);},BattleManager['keepPrevSubjectFTB']=function(_0x47f5c5){const _0x156585=_0x5cc726;if(!_0x47f5c5)return![];if(!_0x47f5c5['isActor']())return![];if(!_0x47f5c5[_0x156585(0x215)]())return![];if(!_0x47f5c5['canInput']())return![];if(_0x47f5c5[_0x156585(0x277)]())return![];return BattleManager[_0x156585(0x25c)]&&BattleManager[_0x156585(0x25a)];},VisuMZ[_0x5cc726(0x1f9)]['BattleManager_startBattle']=BattleManager[_0x5cc726(0x249)],BattleManager[_0x5cc726(0x249)]=function(){const _0x52c7bc=_0x5cc726;VisuMZ[_0x52c7bc(0x1f9)][_0x52c7bc(0x1b0)][_0x52c7bc(0x1e0)](this),this[_0x52c7bc(0x2e8)]();},BattleManager['startBattleFTB']=function(){const _0x9a2bad=_0x5cc726;if(!this[_0x9a2bad(0x1de)]())return;if(this[_0x9a2bad(0x2a6)])this[_0x9a2bad(0x1af)]=_0x9a2bad(0x318);else this['_surprise']?this[_0x9a2bad(0x1af)]=_0x9a2bad(0x25f):this['_ftbTurnAdvantageUnit']=BattleManager['_FTB_NEUTRAL_TURN_ADVANTAGE'];this['_ftbTurnAdvantageUnit']=this[_0x9a2bad(0x1af)]||'random';let _0x42029f=0x0,_0xfdd586=0x0;switch(this['_ftbTurnAdvantageUnit'][_0x9a2bad(0x264)]()['trim']()){case _0x9a2bad(0x254):let _0x33cf39=['actors',_0x9a2bad(0x25f)];this[_0x9a2bad(0x1af)]=_0x33cf39[Math[_0x9a2bad(0x33d)](_0x33cf39[_0x9a2bad(0x2c0)])];break;case'player':this[_0x9a2bad(0x1af)]='actors';break;case'enemy':this[_0x9a2bad(0x1af)]=_0x9a2bad(0x25f);break;case'lowest\x20agi':_0x42029f=$gameParty['ftbLowestAgility'](),_0xfdd586=$gameTroop[_0x9a2bad(0x228)](),this[_0x9a2bad(0x1af)]=_0x42029f>=_0xfdd586?_0x9a2bad(0x318):_0x9a2bad(0x25f);break;case _0x9a2bad(0x2d5):_0x42029f=$gameParty[_0x9a2bad(0x244)](),_0xfdd586=$gameTroop['agility'](),this[_0x9a2bad(0x1af)]=_0x42029f>=_0xfdd586?_0x9a2bad(0x318):_0x9a2bad(0x25f);break;case _0x9a2bad(0x297):_0x42029f=$gameParty[_0x9a2bad(0x2c6)](),_0xfdd586=$gameTroop[_0x9a2bad(0x2c6)](),this[_0x9a2bad(0x1af)]=_0x42029f>=_0xfdd586?'actors':_0x9a2bad(0x25f);break;case _0x9a2bad(0x1f2):_0x42029f=$gameParty[_0x9a2bad(0x1d6)](),_0xfdd586=$gameTroop[_0x9a2bad(0x1d6)](),this[_0x9a2bad(0x1af)]=_0x42029f>=_0xfdd586?'actors':_0x9a2bad(0x25f);break;}this[_0x9a2bad(0x2ec)]=this[_0x9a2bad(0x1af)]===_0x9a2bad(0x318)?$gameParty:$gameTroop,this['_ftbTeamEven']=this['_ftbTurnAdvantageUnit']===_0x9a2bad(0x318)?$gameTroop:$gameParty;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x28d)]=BattleManager[_0x5cc726(0x2ed)],BattleManager[_0x5cc726(0x2ed)]=function(){const _0x7db213=_0x5cc726;this['isFTB']()?this['makeActionOrdersFTB']():VisuMZ[_0x7db213(0x1f9)][_0x7db213(0x28d)]['call'](this);},BattleManager[_0x5cc726(0x1d7)]=function(){const _0x45f2ad=_0x5cc726;let _0x4cf950=[],_0xb67077=[],_0x3f9e3c=0x0;const _0x31f641=$gameTroop[_0x45f2ad(0x267)]();let _0x42e5fc=_0x31f641%0x2===0x0?this[_0x45f2ad(0x306)]:this['_ftbTeamOdd'];this['_ftbCurrentUnit']=_0x42e5fc;const _0x41ea1a=VisuMZ[_0x45f2ad(0x1f9)][_0x45f2ad(0x290)][_0x45f2ad(0x1f8)];if(_0x42e5fc===$gameParty){const _0x624fc8=_0x41ea1a['RevivalAct']?$gameParty[_0x45f2ad(0x26b)]():$gameParty[_0x45f2ad(0x27d)]();let _0x4d1193=_0x624fc8[_0x45f2ad(0x2d2)](_0x5ed3a1=>_0x5ed3a1[_0x45f2ad(0x215)]()&&!_0x5ed3a1['canInput']()),_0x226475=_0x624fc8[_0x45f2ad(0x2d2)](_0x1a8b62=>_0x1a8b62[_0x45f2ad(0x215)]()&&_0x1a8b62[_0x45f2ad(0x270)]());_0x4cf950=_0x4cf950['concat'](_0x4d1193),_0x3f9e3c=Game_Unit[_0x45f2ad(0x22f)];while(_0x3f9e3c--){_0x4cf950=_0x4cf950[_0x45f2ad(0x2e1)](_0x226475);}_0x3f9e3c=Game_Unit[_0x45f2ad(0x22f)]-0x1;while(_0x3f9e3c--){_0x4cf950=_0x4cf950[_0x45f2ad(0x2e1)](_0x4d1193);}}if(_0x42e5fc===$gameTroop){const _0x489b06=_0x41ea1a[_0x45f2ad(0x22d)]?$gameTroop['members']():$gameTroop[_0x45f2ad(0x27d)]();let _0x1ddc5e=_0x489b06['filter'](_0x51a9b3=>_0x51a9b3[_0x45f2ad(0x215)]());$gameSystem[_0x45f2ad(0x265)]()?_0x1ddc5e[_0x45f2ad(0x2b4)]((_0x57d376,_0x2d4d1b)=>_0x2d4d1b[_0x45f2ad(0x2cb)]()-_0x57d376[_0x45f2ad(0x2cb)]()):_0x1ddc5e[_0x45f2ad(0x2b4)]((_0x5a07e0,_0x146c62)=>_0x5a07e0[_0x45f2ad(0x2cb)]()-_0x146c62[_0x45f2ad(0x2cb)]());_0x3f9e3c=Game_Unit[_0x45f2ad(0x22f)];while(_0x3f9e3c--){_0xb67077=_0xb67077[_0x45f2ad(0x2e1)](_0x1ddc5e);}$gameTroop[_0x45f2ad(0x345)]();}this['_actionBattlers']=_0x4cf950['concat'](_0xb67077);},BattleManager[_0x5cc726(0x308)]=function(){const _0x4bce26=_0x5cc726;if(!this[_0x4bce26(0x1de)]())return;this[_0x4bce26(0x1ff)]=this[_0x4bce26(0x1ff)]||[],this[_0x4bce26(0x1ff)]=this[_0x4bce26(0x1ff)][_0x4bce26(0x2d2)](_0x239f5d=>_0x239f5d[_0x4bce26(0x215)]()&&!_0x239f5d[_0x4bce26(0x277)]());},VisuMZ['BattleSystemFTB'][_0x5cc726(0x204)]=BattleManager[_0x5cc726(0x1dc)],BattleManager[_0x5cc726(0x1dc)]=function(_0x29c08a,_0x5bb6b8,_0x10da26){const _0x4698a3=_0x5cc726;VisuMZ['BattleSystemFTB'][_0x4698a3(0x204)][_0x4698a3(0x1e0)](this,_0x29c08a,_0x5bb6b8,_0x10da26),this[_0x4698a3(0x1b7)]();},BattleManager[_0x5cc726(0x1b7)]=function(){const _0x205049=_0x5cc726;if(!BattleManager['isFTB']())return;this[_0x205049(0x276)]=undefined,$gameParty[_0x205049(0x303)](),$gameTroop[_0x205049(0x303)]();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x28f)]=BattleManager[_0x5cc726(0x26a)],BattleManager[_0x5cc726(0x26a)]=function(){const _0x4e69a5=_0x5cc726;this[_0x4e69a5(0x303)](),VisuMZ['BattleSystemFTB']['BattleManager_startTurn']['call'](this),this['ftbCreateTeamSwitchText']();},BattleManager[_0x5cc726(0x303)]=function(){const _0x1aebb4=_0x5cc726;if(!BattleManager[_0x1aebb4(0x1de)]())return;$gameParty[_0x1aebb4(0x326)](),$gameTroop[_0x1aebb4(0x326)]();const _0x2c39bf=$gameTroop['turnCount']()+0x1;let _0x108cb3=_0x2c39bf%0x2===0x0?this[_0x1aebb4(0x306)]:this[_0x1aebb4(0x2ec)],_0x3ae3ba=_0x2c39bf%0x2===0x0?this[_0x1aebb4(0x2ec)]:this['_ftbTeamEven'];_0x2c39bf>0x1&&_0x3ae3ba[_0x1aebb4(0x317)](),_0x108cb3[_0x1aebb4(0x21c)](),_0x108cb3[_0x1aebb4(0x303)]();},VisuMZ[_0x5cc726(0x1f9)]['BattleManager_endTurn']=BattleManager[_0x5cc726(0x2ab)],BattleManager[_0x5cc726(0x2ab)]=function(){const _0x4e931a=_0x5cc726;VisuMZ[_0x4e931a(0x1f9)][_0x4e931a(0x1a7)]['call'](this),this[_0x4e931a(0x331)]();},BattleManager[_0x5cc726(0x331)]=function(){const _0x246326=_0x5cc726;if(!BattleManager[_0x246326(0x1de)]())return;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x355)]=Game_Party['prototype'][_0x5cc726(0x270)],Game_Party[_0x5cc726(0x2e7)][_0x5cc726(0x270)]=function(){const _0x5ece3a=_0x5cc726;if(BattleManager['isFTB']())return!![];return VisuMZ['BattleSystemFTB'][_0x5ece3a(0x355)][_0x5ece3a(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x330)]=BattleManager[_0x5cc726(0x232)],BattleManager['endAllBattlersTurn']=function(){const _0x52719e=_0x5cc726;if(this[_0x52719e(0x1de)]())return;VisuMZ[_0x52719e(0x1f9)][_0x52719e(0x330)][_0x52719e(0x1e0)](this);},BattleManager[_0x5cc726(0x1ad)]=function(){const _0xf6adf3=_0x5cc726;if(!BattleManager[_0xf6adf3(0x1de)]())return;let _0x56f3dc='';if(this['_ftbCurrentUnit']===$gameParty){let _0x36a9a1=$gameParty['name']();_0x56f3dc=TextManager[_0xf6adf3(0x29e)][_0xf6adf3(0x334)](_0x36a9a1);}else _0x56f3dc=TextManager[_0xf6adf3(0x35e)];if(_0x56f3dc!==''){this['_logWindow']['push'](_0xf6adf3(0x29d),_0x56f3dc);const _0x14d6f2=BattleManager[_0xf6adf3(0x2b6)];this[_0xf6adf3(0x1eb)][_0xf6adf3(0x33a)]('waitCount',_0x14d6f2),this[_0xf6adf3(0x1eb)][_0xf6adf3(0x33a)](_0xf6adf3(0x261));}},VisuMZ[_0x5cc726(0x1f9)]['Game_Battler_onBattleStart']=Game_Battler[_0x5cc726(0x2e7)]['onBattleStart'],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x236)]=function(_0x46dc15){const _0x4727cc=_0x5cc726;VisuMZ[_0x4727cc(0x1f9)][_0x4727cc(0x226)][_0x4727cc(0x1e0)](this,_0x46dc15),this[_0x4727cc(0x2f2)]();},Game_Battler['prototype'][_0x5cc726(0x2f2)]=function(){const _0x49b38a=_0x5cc726;if(!BattleManager[_0x49b38a(0x1de)]())return;this[_0x49b38a(0x1d1)]=0x0;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x275)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x267)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x267)]=function(){const _0x4c8558=_0x5cc726;return BattleManager['isFTB']()?this[_0x4c8558(0x1d1)]||0x0:VisuMZ['BattleSystemFTB'][_0x4c8558(0x275)][_0x4c8558(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x1c6)]=Game_Troop[_0x5cc726(0x2e7)]['increaseTurn'],Game_Troop[_0x5cc726(0x2e7)]['increaseTurn']=function(){const _0x3fed8d=_0x5cc726;VisuMZ[_0x3fed8d(0x1f9)][_0x3fed8d(0x1c6)][_0x3fed8d(0x1e0)](this),this[_0x3fed8d(0x1a3)]();},Game_Troop['prototype'][_0x5cc726(0x1a3)]=function(){const _0x39a192=_0x5cc726;if(!BattleManager[_0x39a192(0x1de)]())return;if(Imported[_0x39a192(0x2cc)]&&VisuMZ[_0x39a192(0x28a)][_0x39a192(0x27a)]<1.22){let _0xa90e71='';_0xa90e71+=_0x39a192(0x224),_0xa90e71+=_0x39a192(0x258),alert(_0xa90e71),SceneManager['exit']();}let _0x3c545f=[];BattleManager['_ftbCurrentUnit']===$gameParty?_0x3c545f=$gameParty[_0x39a192(0x333)]():_0x3c545f=$gameTroop['members']();for(const _0x381e7c of _0x3c545f){_0x381e7c['_turnCountFTB']=_0x381e7c[_0x39a192(0x1d1)]||0x0,_0x381e7c[_0x39a192(0x1d1)]++;}},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1ca)]=BattleManager['invokeCounterAttack'],BattleManager['invokeCounterAttack']=function(_0x57dce7,_0x2ec608){const _0x48142c=_0x5cc726,_0x212e6e=BattleManager['isFTB']();if(_0x212e6e)$gameSystem['setBattleSystem'](_0x48142c(0x262));VisuMZ[_0x48142c(0x1f9)][_0x48142c(0x1ca)][_0x48142c(0x1e0)](this,_0x57dce7,_0x2ec608);if(_0x212e6e)$gameSystem[_0x48142c(0x293)]('FTB');},VisuMZ['BattleSystemFTB'][_0x5cc726(0x324)]=Game_System[_0x5cc726(0x2e7)][_0x5cc726(0x2ae)],Game_System['prototype']['initialize']=function(){const _0x1044a2=_0x5cc726;VisuMZ['BattleSystemFTB'][_0x1044a2(0x324)]['call'](this),this[_0x1044a2(0x21d)]();},Game_System[_0x5cc726(0x2e7)]['initBattleSystemFTB']=function(){const _0x2e6934=_0x5cc726;this[_0x2e6934(0x1d8)]=!![];},Game_System[_0x5cc726(0x2e7)][_0x5cc726(0x260)]=function(){const _0x17ac74=_0x5cc726;if(BattleManager['_phase']===_0x17ac74(0x252))return![];return this['_ftbActionCountVisible']===undefined&&this['initBattleSystemFTB'](),this[_0x17ac74(0x1d8)];},Game_System[_0x5cc726(0x2e7)][_0x5cc726(0x24a)]=function(_0x1e4694){const _0x5b2fb1=_0x5cc726;this[_0x5b2fb1(0x1d8)]===undefined&&this[_0x5b2fb1(0x21d)](),this['_ftbActionCountVisible']=_0x1e4694;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x296)]=Game_Action['prototype']['speed'],Game_Action[_0x5cc726(0x2e7)][_0x5cc726(0x2ce)]=function(){const _0x8fbc6d=_0x5cc726;return BattleManager[_0x8fbc6d(0x1de)]()?0x0:VisuMZ['BattleSystemFTB']['Game_Action_speed']['call'](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x239)]=Game_Action[_0x5cc726(0x2e7)][_0x5cc726(0x350)],Game_Action[_0x5cc726(0x2e7)]['applyGlobal']=function(){const _0x589b7b=_0x5cc726;VisuMZ[_0x589b7b(0x1f9)][_0x589b7b(0x239)][_0x589b7b(0x1e0)](this),this[_0x589b7b(0x343)]();},Game_Action['prototype'][_0x5cc726(0x343)]=function(){const _0x27541f=_0x5cc726;if(!BattleManager[_0x27541f(0x1de)]())return;if(!this[_0x27541f(0x23c)]())return;if(!this[_0x27541f(0x329)]())return;this[_0x27541f(0x2d4)]()&&this[_0x27541f(0x329)]()['id']===this[_0x27541f(0x23c)]()[_0x27541f(0x2b8)]()&&(BattleManager[_0x27541f(0x1fd)]&&this[_0x27541f(0x23c)]()[_0x27541f(0x27e)]());const _0x3a5182=VisuMZ[_0x27541f(0x1f9)][_0x27541f(0x274)],_0x2b236f=this[_0x27541f(0x329)]()[_0x27541f(0x311)];_0x2b236f['match'](_0x3a5182[_0x27541f(0x241)])&&this[_0x27541f(0x23c)]()[_0x27541f(0x27e)]();},VisuMZ[_0x5cc726(0x1f9)]['Game_BattlerBase_hide']=Game_BattlerBase['prototype']['hide'],Game_BattlerBase['prototype'][_0x5cc726(0x341)]=function(){const _0x2cbfea=_0x5cc726;VisuMZ['BattleSystemFTB']['Game_BattlerBase_hide'][_0x2cbfea(0x1e0)](this),BattleManager['removeActionBattlersFTB'](),this[_0x2cbfea(0x237)]()['recalculateActionsFTB']();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x316)]=Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x1e8)],Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x1e8)]=function(){const _0x4b2930=_0x5cc726;VisuMZ[_0x4b2930(0x1f9)][_0x4b2930(0x316)][_0x4b2930(0x1e0)](this),BattleManager[_0x4b2930(0x308)](),this['friendsUnit']()[_0x4b2930(0x325)]();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x255)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x263)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x263)]=function(){const _0x33d262=_0x5cc726;VisuMZ[_0x33d262(0x1f9)][_0x33d262(0x255)][_0x33d262(0x1e0)](this),BattleManager[_0x33d262(0x308)](),this[_0x33d262(0x237)]()[_0x33d262(0x325)]();},Game_BattlerBase['prototype'][_0x5cc726(0x27e)]=function(){const _0x4c6a9c=_0x5cc726;this[_0x4c6a9c(0x233)]=!![],BattleManager['removeActionBattlersFTB']();},Game_BattlerBase['prototype'][_0x5cc726(0x277)]=function(){const _0x4e354b=_0x5cc726;return!!this[_0x4e354b(0x233)];},Game_BattlerBase[_0x5cc726(0x1ed)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x2c2)],Game_BattlerBase[_0x5cc726(0x1ae)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x1d5)],Game_BattlerBase[_0x5cc726(0x285)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f8)]['AgiDebuff'],Game_BattlerBase[_0x5cc726(0x2e7)]['ftbActionCount']=function(){const _0x40756c=_0x5cc726;let _0x2ffa50=Game_BattlerBase[_0x40756c(0x1ed)];if(this['_buffs']===undefined)this['clearBuffs']();const _0x4bc1db=this[_0x40756c(0x1c1)][0x6]||0x0;if(_0x4bc1db>0x0&&Game_BattlerBase['_FTB_ACTION_AGI_BUFF'])_0x2ffa50+=_0x4bc1db;else _0x4bc1db<0x0&&Game_BattlerBase[_0x40756c(0x285)]&&(_0x2ffa50+=_0x4bc1db);const _0x1ed612=VisuMZ['BattleSystemFTB']['RegExp'],_0x57431d=this['traitObjects']();for(const _0x1b89bf of _0x57431d){if(!_0x1b89bf)continue;const _0x1427b3=_0x1b89bf['note'];_0x1427b3[_0x40756c(0x1ac)](_0x1ed612[_0x40756c(0x288)])&&(_0x2ffa50+=Number(RegExp['$1']));}return Math[_0x40756c(0x1f0)](0x0,_0x2ffa50);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x27c)]=Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x2df)],Game_BattlerBase['prototype'][_0x5cc726(0x2df)]=function(){const _0x5e7bcf=_0x5cc726;VisuMZ['BattleSystemFTB'][_0x5e7bcf(0x27c)][_0x5e7bcf(0x1e0)](this),this[_0x5e7bcf(0x237)]()[_0x5e7bcf(0x325)]();},VisuMZ['BattleSystemFTB'][_0x5cc726(0x34d)]=Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x2a7)],Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x2a7)]=function(_0x2124db){const _0x2e64b9=_0x5cc726;if(SceneManager['isSceneBattle']()&&BattleManager[_0x2e64b9(0x1de)]()){const _0x420ad1=DataManager[_0x2e64b9(0x2bc)](_0x2124db);if(_0x420ad1>this['friendsUnit']()[_0x2e64b9(0x203)]())return![];}return VisuMZ['BattleSystemFTB'][_0x2e64b9(0x34d)]['call'](this,_0x2124db);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2aa)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x34c)],Game_Battler['prototype']['useItem']=function(_0x18bdc3){const _0x54b6f9=_0x5cc726;VisuMZ[_0x54b6f9(0x1f9)]['Game_Battler_useItem'][_0x54b6f9(0x1e0)](this,_0x18bdc3),this[_0x54b6f9(0x2ac)](_0x18bdc3);},Game_Battler['prototype'][_0x5cc726(0x2ac)]=function(_0xb5a370){const _0x3f236a=_0x5cc726;if(!_0xb5a370)return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x3f236a(0x1de)]())return;const _0x19b04a=BattleManager[_0x3f236a(0x315)];if(_0x19b04a&&_0x19b04a[_0x3f236a(0x23f)])return;const _0x3c38ab=DataManager[_0x3f236a(0x2bc)](_0xb5a370);this['friendsUnit']()[_0x3f236a(0x339)](_0x3c38ab);},VisuMZ[_0x5cc726(0x1f9)]['Game_Battler_onTurnEnd']=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1ea)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1ea)]=function(){const _0x242d58=_0x5cc726;this['_bypassStateTurnUpdatesFTB']=BattleManager[_0x242d58(0x1de)]()&&BattleManager['_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS'],VisuMZ[_0x242d58(0x1f9)][_0x242d58(0x1c8)][_0x242d58(0x1e0)](this),delete this[_0x242d58(0x1d4)];},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2b2)]=Game_BattlerBase['prototype'][_0x5cc726(0x2c5)],Game_BattlerBase[_0x5cc726(0x2e7)]['updateStateTurns']=function(){const _0x135414=_0x5cc726;if(this[_0x135414(0x1d4)])return;VisuMZ[_0x135414(0x1f9)][_0x135414(0x2b2)][_0x135414(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)]['Game_BattlerBase_updateBuffTurns']=Game_BattlerBase[_0x5cc726(0x2e7)]['updateBuffTurns'],Game_BattlerBase[_0x5cc726(0x2e7)][_0x5cc726(0x268)]=function(){const _0x4436a4=_0x5cc726;if(this[_0x4436a4(0x1d4)])return;VisuMZ['BattleSystemFTB'][_0x4436a4(0x332)][_0x4436a4(0x1e0)](this);},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1d3)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x2fe)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x2fe)]=function(_0x3e532f){const _0x4d6ac1=_0x5cc726;VisuMZ['BattleSystemFTB']['Game_Battler_addState'][_0x4d6ac1(0x1e0)](this,_0x3e532f),this[_0x4d6ac1(0x237)]()[_0x4d6ac1(0x325)]();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x206)]=Game_Battler[_0x5cc726(0x2e7)]['removeState'],Game_Battler['prototype']['removeState']=function(_0x2f4f03){const _0x302a67=_0x5cc726;VisuMZ[_0x302a67(0x1f9)][_0x302a67(0x206)]['call'](this,_0x2f4f03),this[_0x302a67(0x237)]()[_0x302a67(0x325)]();},VisuMZ[_0x5cc726(0x1f9)]['Game_Battler_addBuff']=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1a8)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1a8)]=function(_0x4a144a,_0x20587d){const _0xc41b6c=_0x5cc726;VisuMZ[_0xc41b6c(0x1f9)][_0xc41b6c(0x21a)]['call'](this,_0x4a144a,_0x20587d),this['friendsUnit']()[_0xc41b6c(0x325)]();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2f7)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1b1)],Game_Battler[_0x5cc726(0x2e7)]['addDebuff']=function(_0x315b2f,_0x383ac7){const _0xd1d9b=_0x5cc726;VisuMZ[_0xd1d9b(0x1f9)]['Game_Battler_addDebuff'][_0xd1d9b(0x1e0)](this,_0x315b2f,_0x383ac7),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x23e)]=Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x2e6)],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x2e6)]=function(_0x510793){const _0x4dffa0=_0x5cc726;VisuMZ[_0x4dffa0(0x1f9)][_0x4dffa0(0x23e)][_0x4dffa0(0x1e0)](this,_0x510793),this['friendsUnit']()[_0x4dffa0(0x325)]();},VisuMZ['BattleSystemFTB'][_0x5cc726(0x29c)]=Game_Battler[_0x5cc726(0x2e7)]['forceAction'],Game_Battler[_0x5cc726(0x2e7)][_0x5cc726(0x1fa)]=function(_0x47d6b0,_0x3ef739){const _0x3c1da5=_0x5cc726;BattleManager['isFTB']()?this[_0x3c1da5(0x361)](_0x47d6b0,_0x3ef739):VisuMZ['BattleSystemFTB'][_0x3c1da5(0x29c)][_0x3c1da5(0x1e0)](this,_0x47d6b0,_0x3ef739);},Game_Battler['prototype']['forceActionFTB']=function(_0x114aab,_0x43b365){const _0x2551e3=_0x5cc726,_0x2968fc=new Game_Action(this,!![]);_0x2968fc[_0x2551e3(0x20f)](_0x114aab),_0x2968fc['_forceAction']=!![];if(_0x43b365===-0x2)_0x2968fc[_0x2551e3(0x312)](this['_lastTargetIndex']);else _0x43b365===-0x1?_0x2968fc[_0x2551e3(0x31a)]():_0x2968fc['setTarget'](_0x43b365);this[_0x2551e3(0x251)][_0x2551e3(0x2fc)](_0x2968fc);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x283)]=BattleManager['forceAction'],BattleManager[_0x5cc726(0x1fa)]=function(_0x25f900){const _0x2f1d44=_0x5cc726;BattleManager[_0x2f1d44(0x1de)]()?this[_0x2f1d44(0x361)](_0x25f900):VisuMZ['BattleSystemFTB'][_0x2f1d44(0x283)][_0x2f1d44(0x1e0)](this,_0x25f900);},BattleManager[_0x5cc726(0x361)]=function(_0x22d395){const _0x256cea=_0x5cc726,_0x2e0fc1=JsonEx['makeDeepCopy'](_0x22d395[_0x256cea(0x2fa)]());this[_0x256cea(0x342)][_0x256cea(0x33a)]([_0x22d395,_0x2e0fc1]);},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1ec)]=Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x1ba)],Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x1ba)]=function(){const _0x5ec135=_0x5cc726;if(BattleManager[_0x5ec135(0x1de)]()){if(this[_0x5ec135(0x2c7)]())this['battler']()['stepForward']();return![];}return VisuMZ[_0x5ec135(0x1f9)][_0x5ec135(0x1ec)]['call'](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x2d1)]=Game_Actor[_0x5cc726(0x2e7)]['changeEquip'],Game_Actor['prototype'][_0x5cc726(0x22a)]=function(_0x29b603,_0x4277ae){const _0x4ad943=_0x5cc726;VisuMZ['BattleSystemFTB']['Game_Actor_changeEquip'][_0x4ad943(0x1e0)](this,_0x29b603,_0x4277ae),this[_0x4ad943(0x237)]()[_0x4ad943(0x325)]();},VisuMZ[_0x5cc726(0x1f9)]['Game_Actor_forceChangeEquip']=Game_Actor['prototype'][_0x5cc726(0x2ee)],Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x2ee)]=function(_0x21de1f,_0xbcd339){const _0x58ff9d=_0x5cc726;VisuMZ[_0x58ff9d(0x1f9)][_0x58ff9d(0x30e)][_0x58ff9d(0x1e0)](this,_0x21de1f,_0xbcd339),this[_0x58ff9d(0x237)]()['recalculateActionsFTB']();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x25d)]=Game_Actor[_0x5cc726(0x2e7)]['changeEquipById'],Game_Actor[_0x5cc726(0x2e7)]['changeEquipById']=function(_0x340b91,_0xdfef90){const _0x4abada=_0x5cc726;VisuMZ[_0x4abada(0x1f9)][_0x4abada(0x25d)][_0x4abada(0x1e0)](this,_0x340b91,_0xdfef90),this['friendsUnit']()[_0x4abada(0x325)]();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x21b)]=Game_Actor[_0x5cc726(0x2e7)]['discardEquip'],Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x1f4)]=function(_0x2fd877){const _0x3e5c8b=_0x5cc726;VisuMZ[_0x3e5c8b(0x1f9)]['Game_Actor_discardEquip'][_0x3e5c8b(0x1e0)](this,_0x2fd877),this['friendsUnit']()[_0x3e5c8b(0x325)]();},VisuMZ[_0x5cc726(0x1f9)]['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x2bf)],Game_Actor[_0x5cc726(0x2e7)]['releaseUnequippableItems']=function(_0x4f5d36){const _0x1d2af4=_0x5cc726;VisuMZ['BattleSystemFTB'][_0x1d2af4(0x272)][_0x1d2af4(0x1e0)](this,_0x4f5d36),this[_0x1d2af4(0x237)]()[_0x1d2af4(0x325)]();},VisuMZ['BattleSystemFTB']['Game_Actor_changeClass']=Game_Actor[_0x5cc726(0x2e7)][_0x5cc726(0x2d3)],Game_Actor[_0x5cc726(0x2e7)]['changeClass']=function(_0x45f5e1,_0x5c3f47){const _0x54726c=_0x5cc726;VisuMZ[_0x54726c(0x1f9)][_0x54726c(0x291)]['call'](this,_0x45f5e1,_0x5c3f47),this[_0x54726c(0x237)]()[_0x54726c(0x325)]();},VisuMZ['BattleSystemFTB'][_0x5cc726(0x2b0)]=Game_Enemy['prototype'][_0x5cc726(0x35d)],Game_Enemy['prototype']['transform']=function(_0x4b42ec){const _0x3683f2=_0x5cc726;VisuMZ[_0x3683f2(0x1f9)][_0x3683f2(0x2b0)][_0x3683f2(0x1e0)](this,_0x4b42ec),this['friendsUnit']()[_0x3683f2(0x325)]();},Game_Unit[_0x5cc726(0x22f)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)][_0x5cc726(0x2f0)],Game_Unit[_0x5cc726(0x223)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f8)]['MinActions'],Game_Unit[_0x5cc726(0x287)]=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f8)][_0x5cc726(0x307)],Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x303)]=function(){this['createActionsFTB'](),this['setCurrentActionsFTB'](this['getMaxActionsFTB']());},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x30a)]=function(){const _0x3d53e6=_0x5cc726;this[_0x3d53e6(0x21e)]=!![];let _0x545b62=0x0,_0x10c241=this[_0x3d53e6(0x1e1)]()[_0x3d53e6(0x2d2)](_0x197de8=>_0x197de8['canMove']());_0x545b62=_0x10c241[_0x3d53e6(0x2be)]((_0x20bbeb,_0x5c9cc4)=>_0x20bbeb+_0x5c9cc4['ftbActionCount'](),_0x545b62),_0x545b62=_0x545b62[_0x3d53e6(0x2c3)](Game_Unit[_0x3d53e6(0x223)],Game_Unit[_0x3d53e6(0x22f)]),this[_0x3d53e6(0x2dc)]=_0x545b62;},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x325)]=function(){const _0x33fac5=_0x5cc726;if(!BattleManager[_0x33fac5(0x1de)]())return;if(!$gameParty[_0x33fac5(0x2f6)]())return;const _0x559656=this['getMaxActionsFTB']();this['createActionsFTB']();let _0x6698ff=this[_0x33fac5(0x203)]();const _0x4ccd85=this['getMaxActionsFTB']()-_0x559656;if(BattleManager['_FTB_RECALC_ADD_DIFF']&&_0x4ccd85>0x0)_0x6698ff+=_0x4ccd85;if(BattleManager[_0x33fac5(0x278)]&&_0x4ccd85<0x0)_0x6698ff+=_0x4ccd85;_0x6698ff=Math[_0x33fac5(0x280)](_0x6698ff,Game_Unit[_0x33fac5(0x22f)]),this[_0x33fac5(0x358)](_0x6698ff);},Game_Unit[_0x5cc726(0x2e7)]['getCurrentActionsFTB']=function(){const _0x2c340f=_0x5cc726;return this[_0x2c340f(0x28e)]||0x0;},Game_Unit[_0x5cc726(0x2e7)]['setCurrentActionsFTB']=function(_0x5b2287){const _0x5319f0=_0x5cc726;this[_0x5319f0(0x28e)]=Math[_0x5319f0(0x1a4)](_0x5b2287)['clamp'](0x0,Game_Unit[_0x5319f0(0x22f)]),!Game_Unit[_0x5319f0(0x287)]&&(this['_ftbActionsCur']=Math[_0x5319f0(0x280)](this['_ftbActionsCur'],this[_0x5319f0(0x348)]()));},Game_Unit[_0x5cc726(0x2e7)]['gainCurrentActionsFTB']=function(_0x247212){const _0x2febc1=_0x5cc726;this['setCurrentActionsFTB'](this[_0x2febc1(0x203)]()+_0x247212);},Game_Unit['prototype'][_0x5cc726(0x31e)]=function(_0x340960){const _0x184ec5=_0x5cc726;this[_0x184ec5(0x353)](-_0x340960);},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x348)]=function(){const _0x30b5af=_0x5cc726;return this[_0x30b5af(0x2dc)]||0x0;},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x1a1)]=function(_0x52f1d2){const _0x486e78=_0x5cc726;this['_ftbActionsMax']=_0x52f1d2['clamp'](Game_Unit['_FTB_MIN_ACTIONS'],Game_Unit[_0x486e78(0x22f)]);},Game_Unit[_0x5cc726(0x2e7)]['reduceActionsFTB']=function(_0x1f1176){const _0x103d12=_0x5cc726;this[_0x103d12(0x31e)](_0x1f1176);},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x1bb)]=function(){const _0x69384c=_0x5cc726;if(BattleManager[_0x69384c(0x32e)]){if(this['members']()[_0x69384c(0x1b3)](BattleManager[_0x69384c(0x32e)])){const _0x4abd92=BattleManager['_subject'][_0x69384c(0x2fa)]();if(_0x4abd92&&_0x4abd92['_forceAction'])return!![];}}return this[_0x69384c(0x28e)]=this[_0x69384c(0x28e)]||0x0,this[_0x69384c(0x28e)]>0x0;},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x317)]=function(){const _0x13ea6e=_0x5cc726;for(const _0x36100c of this[_0x13ea6e(0x20e)]()){if(!_0x36100c)continue;const _0x75d101=_0x36100c[_0x13ea6e(0x30d)]();_0x36100c['onTurnEnd'](),_0x36100c[_0x13ea6e(0x2c9)](),_0x75d101&&_0x36100c[_0x13ea6e(0x300)]()&&_0x36100c[_0x13ea6e(0x263)]();}},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x225)]=function(){const _0x3a25f6=_0x5cc726;if(this[_0x3a25f6(0x203)]()<=0x0)return!![];if(!this[_0x3a25f6(0x1e1)]()['some'](_0x15d4a1=>_0x15d4a1[_0x3a25f6(0x215)]()))return!![];return![];},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x21c)]=function(){const _0x120fea=_0x5cc726;for(const _0x5d1f97 of this[_0x120fea(0x20e)]()){if(!_0x5d1f97)continue;_0x5d1f97[_0x120fea(0x2c5)](),_0x5d1f97[_0x120fea(0x22c)](0x2),_0x5d1f97['updateBuffTurns'](),_0x5d1f97[_0x120fea(0x2c9)]();}},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x326)]=function(){for(const _0x299c41 of this['members']()){if(!_0x299c41)continue;_0x299c41['_passedTurnFTB']=![];}},Game_Unit['prototype']['ftbLowestAgility']=function(){const _0x36358d=_0x5cc726,_0x3abec5=this[_0x36358d(0x20e)]();return Math[_0x36358d(0x280)](..._0x3abec5[_0x36358d(0x240)](_0x1035b2=>_0x1035b2[_0x36358d(0x2da)]));},Game_Unit[_0x5cc726(0x2e7)]['ftbHighestAgility']=function(){const _0x1a4e94=_0x5cc726,_0x46fa3d=this[_0x1a4e94(0x20e)]();return Math[_0x1a4e94(0x1f0)](..._0x46fa3d[_0x1a4e94(0x240)](_0x177235=>_0x177235['agi']));},Game_Unit['prototype']['ftbTotalAgility']=function(){const _0x59674d=_0x5cc726,_0x48ab44=this[_0x59674d(0x20e)]();return _0x48ab44[_0x59674d(0x2be)]((_0x56bae5,_0x528e1b)=>_0x56bae5+_0x528e1b['agi'],0x0);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x248)]=Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x236)],Game_Unit[_0x5cc726(0x2e7)]['onBattleStart']=function(_0x34ab23){const _0x3d9bd1=_0x5cc726;VisuMZ[_0x3d9bd1(0x1f9)][_0x3d9bd1(0x248)]['call'](this,_0x34ab23),BattleManager[_0x3d9bd1(0x1de)]()&&(this[_0x3d9bd1(0x30c)]=0x0);},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x27d)]=function(){const _0xf2cf5b=_0x5cc726,_0x528cf4=this['aliveMembers']();if(BattleManager[_0xf2cf5b(0x2dd)])return _0x528cf4;if(BattleManager[_0xf2cf5b(0x25c)])return _0x528cf4;this[_0xf2cf5b(0x30c)]=this[_0xf2cf5b(0x30c)]||0x0;while(!_0x528cf4[_0xf2cf5b(0x2d9)](_0x577bbb=>_0x577bbb[_0xf2cf5b(0x309)]()===this[_0xf2cf5b(0x30c)])){const _0x2c2703=this['members'](),_0x60d057=_0x2c2703[this[_0xf2cf5b(0x30c)]];let _0x56851b=_0x2c2703[_0xf2cf5b(0x313)](_0x60d057)+0x1;if(_0x56851b>=_0x2c2703[_0xf2cf5b(0x2c0)])_0x56851b=0x0;this['_ftbLastIndex']=_0x56851b;}for(;;){const _0x5ba67b=_0x528cf4[0x0][_0xf2cf5b(0x309)]();if(_0x5ba67b===this[_0xf2cf5b(0x30c)])break;_0x528cf4['push'](_0x528cf4[_0xf2cf5b(0x218)]());}return _0x528cf4;},Game_Unit[_0x5cc726(0x2e7)][_0x5cc726(0x1f3)]=function(_0x50d27d){const _0x5ed72d=_0x5cc726;this[_0x5ed72d(0x30c)]=_0x50d27d?_0x50d27d['index']():0x0,this['_ftbLastIndex']++;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x25b)]=Scene_Battle[_0x5cc726(0x2e7)][_0x5cc726(0x1e2)],Scene_Battle[_0x5cc726(0x2e7)]['createActorCommandWindow']=function(){const _0x5ed761=_0x5cc726;VisuMZ[_0x5ed761(0x1f9)]['Scene_Battle_createActorCommandWindow'][_0x5ed761(0x1e0)](this),BattleManager[_0x5ed761(0x1de)]()&&this[_0x5ed761(0x29b)]();},Scene_Battle[_0x5cc726(0x2e7)][_0x5cc726(0x29b)]=function(){const _0x4616a6=_0x5cc726,_0x347f61=this[_0x4616a6(0x2a8)];this['isPartyCommandWindowDisabled']()&&delete _0x347f61[_0x4616a6(0x35b)][_0x4616a6(0x200)];},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x314)]=Scene_Battle['prototype']['commandCancel'],Scene_Battle['prototype']['commandCancel']=function(){const _0x5d089a=_0x5cc726;BattleManager[_0x5d089a(0x1de)]()?this[_0x5d089a(0x2a2)]():VisuMZ['BattleSystemFTB'][_0x5d089a(0x314)][_0x5d089a(0x1e0)](this);},Scene_Battle[_0x5cc726(0x2e7)]['commandCancelFTB']=function(){const _0xaf3e6f=_0x5cc726;this[_0xaf3e6f(0x2e9)][_0xaf3e6f(0x1dc)](),this[_0xaf3e6f(0x2a8)]['close']();},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x1b8)]=Scene_Battle[_0x5cc726(0x2e7)][_0x5cc726(0x1e3)],Scene_Battle[_0x5cc726(0x2e7)]['commandFight']=function(){const _0x4f38a7=_0x5cc726;BattleManager[_0x4f38a7(0x1de)]()?this['startActorCommandSelection']():VisuMZ['BattleSystemFTB'][_0x4f38a7(0x1b8)][_0x4f38a7(0x1e0)](this);},VisuMZ[_0x5cc726(0x1f9)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x5cc726(0x2e7)][_0x5cc726(0x1bd)],Scene_Battle['prototype']['createAllWindows']=function(){const _0x4ba740=_0x5cc726;VisuMZ[_0x4ba740(0x1f9)][_0x4ba740(0x2eb)]['call'](this),this[_0x4ba740(0x211)]();},Scene_Battle[_0x5cc726(0x2e7)][_0x5cc726(0x211)]=function(){const _0x50ca8f=_0x5cc726;if(!BattleManager[_0x50ca8f(0x1de)]())return;const _0x522571=this[_0x50ca8f(0x1e5)](this['_windowLayer']);this['_ftbTroopActionCountWindow']=new Window_FTB_ActionCount(),this[_0x50ca8f(0x279)]['setUnit']($gameTroop),this[_0x50ca8f(0x32d)](this['_ftbTroopActionCountWindow'],_0x522571),this['_ftbPartyActionCountWindow']=new Window_FTB_ActionCount(),this[_0x50ca8f(0x302)][_0x50ca8f(0x1d2)]($gameParty),this[_0x50ca8f(0x32d)](this[_0x50ca8f(0x302)],_0x522571),this[_0x50ca8f(0x33f)]();},Scene_Battle['prototype'][_0x5cc726(0x33f)]=function(){const _0x52eb49=_0x5cc726;if(!BattleManager[_0x52eb49(0x1de)]())return;if(!this[_0x52eb49(0x1eb)])return;const _0x11b0f8=Window_FTB_ActionCount[_0x52eb49(0x290)];if(_0x11b0f8[_0x52eb49(0x289)])return;this[_0x52eb49(0x1eb)]['y']+=_0x11b0f8[_0x52eb49(0x247)];},Window_Base[_0x5cc726(0x214)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x1f1)][_0x5cc726(0x32a)],Window_Base['_FTB_COST_SHOW_ATTACK']=VisuMZ[_0x5cc726(0x1f9)]['Settings'][_0x5cc726(0x1f1)]['ShowCostForAttack'],Window_Base[_0x5cc726(0x217)]=VisuMZ[_0x5cc726(0x1f9)]['Settings']['General'][_0x5cc726(0x292)],Window_Base[_0x5cc726(0x2af)]=VisuMZ['BattleSystemFTB']['Settings'][_0x5cc726(0x1f1)]['Show_0_Action_Cost'],Window_Base[_0x5cc726(0x354)]=VisuMZ['BattleSystemFTB'][_0x5cc726(0x290)][_0x5cc726(0x1f1)][_0x5cc726(0x305)],VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x259)]=Window_Base[_0x5cc726(0x2e7)][_0x5cc726(0x351)],Window_Base[_0x5cc726(0x2e7)][_0x5cc726(0x351)]=function(_0x4ed4fb,_0x42f09c,_0x58e9a2){const _0x4c0847=_0x5cc726;return _0x58e9a2=VisuMZ[_0x4c0847(0x1f9)]['Window_Base_makeAdditionalSkillCostText']['call'](this,_0x4ed4fb,_0x42f09c,_0x58e9a2),_0x58e9a2=this[_0x4c0847(0x27f)](_0x4ed4fb,_0x42f09c,_0x58e9a2),_0x58e9a2;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x1ef)]=Window_Base[_0x5cc726(0x2e7)][_0x5cc726(0x22b)],Window_Base[_0x5cc726(0x2e7)][_0x5cc726(0x22b)]=function(_0x43cd97,_0x23ee8b,_0x50522f,_0x540302){const _0x4c1b3a=_0x5cc726;BattleManager[_0x4c1b3a(0x1de)]()&&this[_0x4c1b3a(0x2f4)]===Window_BattleItem?this[_0x4c1b3a(0x1b9)](_0x43cd97,_0x23ee8b,_0x50522f,_0x540302):VisuMZ[_0x4c1b3a(0x1f9)][_0x4c1b3a(0x1ef)]['call'](this,_0x43cd97,_0x23ee8b,_0x50522f,_0x540302),this[_0x4c1b3a(0x1f7)]();},Window_Base[_0x5cc726(0x2e7)]['drawItemNumberFTB']=function(_0x53b98e,_0x6dca8b,_0x106d5a,_0x2665e4){const _0x3dadc9=_0x5cc726,_0xef1bac=BattleManager[_0x3dadc9(0x33e)]||$gameParty[_0x3dadc9(0x20e)]()[0x0],_0x1222e9=this[_0x3dadc9(0x27f)](_0xef1bac,_0x53b98e,''),_0x2ac59b=this[_0x3dadc9(0x222)](_0x1222e9)[_0x3dadc9(0x2a3)],_0x167296=Window_Base[_0x3dadc9(0x214)];let _0x356411=_0x6dca8b+_0x2665e4-_0x2ac59b;if(_0x1222e9==='')VisuMZ[_0x3dadc9(0x1f9)][_0x3dadc9(0x1ef)][_0x3dadc9(0x1e0)](this,_0x53b98e,_0x6dca8b,_0x106d5a,_0x2665e4);else{if(this['isDrawItemNumber'](_0x53b98e)){this[_0x3dadc9(0x1f7)]();const _0x9feaf1=VisuMZ['ItemsEquipsCore'][_0x3dadc9(0x290)]['ItemScene'];this[_0x3dadc9(0x33b)][_0x3dadc9(0x201)]=_0x9feaf1[_0x3dadc9(0x2ef)];if(_0x167296){const _0x1cfce1=_0x9feaf1[_0x3dadc9(0x253)],_0x4fae1e=_0x1cfce1[_0x3dadc9(0x334)]($gameParty[_0x3dadc9(0x1a5)](_0x53b98e)),_0x3bba86=this[_0x3dadc9(0x346)](_0x4fae1e+this[_0x3dadc9(0x2f8)]());_0x356411-=_0x3bba86;}else _0x2665e4-=this[_0x3dadc9(0x346)](this[_0x3dadc9(0x2f8)]())+_0x2ac59b;VisuMZ[_0x3dadc9(0x1f9)][_0x3dadc9(0x1ef)][_0x3dadc9(0x1e0)](this,_0x53b98e,_0x6dca8b,_0x106d5a,_0x2665e4);}}this['drawTextEx'](_0x1222e9,_0x356411,_0x106d5a);},Window_Base[_0x5cc726(0x2e7)][_0x5cc726(0x27f)]=function(_0x213bb5,_0x5bc71e,_0x366eaa){const _0x16c859=_0x5cc726;if(!BattleManager[_0x16c859(0x1de)]())return _0x366eaa;if(!_0x213bb5)return _0x366eaa;if(!_0x5bc71e)return _0x366eaa;if(_0x5bc71e[_0x16c859(0x311)][_0x16c859(0x1ac)](VisuMZ['BattleSystemFTB'][_0x16c859(0x274)]['HideActionPointCost']))return _0x366eaa;let _0x24d600=DataManager[_0x16c859(0x2bc)](_0x5bc71e);const _0x301feb=Window_Base['_FTB_COST_POSITION'],_0x1cb45f=Window_Base['_FTB_COST_SHOW_ATTACK'],_0x2d2d63=Window_Base[_0x16c859(0x217)],_0x29237a=Window_Base[_0x16c859(0x2af)],_0x57b210=Window_Base[_0x16c859(0x354)];if(_0x5bc71e['note'][_0x16c859(0x1ac)](VisuMZ[_0x16c859(0x1f9)][_0x16c859(0x274)][_0x16c859(0x20d)])){if(_0x24d600<0x0)return _0x366eaa;}else{if(DataManager[_0x16c859(0x2d4)](_0x5bc71e)&&this[_0x16c859(0x2f4)]===Window_ActorCommand){if(!_0x1cb45f&&_0x5bc71e['id']===_0x213bb5[_0x16c859(0x1c4)]())return _0x366eaa;if(!_0x2d2d63&&_0x5bc71e['id']===_0x213bb5['guardSkillId']())return _0x366eaa;}if(_0x24d600<0x0)return _0x366eaa;if(!_0x29237a&&_0x24d600===0x0)return _0x366eaa;if(!_0x57b210&&_0x24d600===0x1)return _0x366eaa;}const _0x5e1693=_0x16c859(0x227)[_0x16c859(0x334)](ImageManager[_0x16c859(0x328)]),_0x1d4cf4=TextManager[_0x16c859(0x336)];let _0x136c3a=TextManager['ftbCostFormat'][_0x16c859(0x334)](_0x24d600,_0x1d4cf4,_0x5e1693);if(_0x366eaa==='')_0x366eaa+=_0x136c3a;else _0x301feb?_0x366eaa=_0x136c3a+this['skillCostSeparator']()+_0x366eaa:_0x366eaa=_0x366eaa+this[_0x16c859(0x2f8)]()+_0x136c3a;return _0x366eaa;},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x271)]=Window_Help[_0x5cc726(0x2e7)][_0x5cc726(0x257)],Window_Help[_0x5cc726(0x2e7)]['setItem']=function(_0x5d926a){const _0xf3af88=_0x5cc726;BattleManager[_0xf3af88(0x1de)]()&&_0x5d926a&&_0x5d926a[_0xf3af88(0x311)]&&_0x5d926a[_0xf3af88(0x311)][_0xf3af88(0x1ac)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0xf3af88(0x1cb)](String(RegExp['$1'])):VisuMZ[_0xf3af88(0x1f9)][_0xf3af88(0x271)][_0xf3af88(0x1e0)](this,_0x5d926a);},Window_Selectable['prototype'][_0x5cc726(0x207)]=function(){const _0x85e0b=_0x5cc726;return this[_0x85e0b(0x2f4)]===Window_ActorCommand&&BattleManager['isFTB']()&&BattleManager[_0x85e0b(0x25c)];},VisuMZ['BattleSystemFTB'][_0x5cc726(0x1c9)]=Window_Selectable[_0x5cc726(0x2e7)]['cursorRight'],Window_Selectable[_0x5cc726(0x2e7)]['cursorRight']=function(_0x532f0c){const _0x314695=_0x5cc726;this[_0x314695(0x207)]()&&this[_0x314695(0x1c3)]()===0x1?this[_0x314695(0x213)](!![]):VisuMZ[_0x314695(0x1f9)][_0x314695(0x1c9)][_0x314695(0x1e0)](this,_0x532f0c);},VisuMZ['BattleSystemFTB'][_0x5cc726(0x23d)]=Window_Selectable['prototype'][_0x5cc726(0x1aa)],Window_Selectable[_0x5cc726(0x2e7)][_0x5cc726(0x1aa)]=function(_0x1e4167){const _0x49cb42=_0x5cc726;this[_0x49cb42(0x207)]()&&this[_0x49cb42(0x1c3)]()===0x1?this['ftbSwitchActorDirection'](![]):VisuMZ['BattleSystemFTB'][_0x49cb42(0x23d)][_0x49cb42(0x1e0)](this,_0x1e4167);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x23b)]=Window_Selectable[_0x5cc726(0x2e7)][_0x5cc726(0x242)],Window_Selectable[_0x5cc726(0x2e7)]['cursorPagedown']=function(){const _0x49f320=_0x5cc726;this[_0x49f320(0x207)]()?this[_0x49f320(0x213)](!![]):VisuMZ[_0x49f320(0x1f9)][_0x49f320(0x23b)]['call'](this);},VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x32b)]=Window_Selectable[_0x5cc726(0x2e7)][_0x5cc726(0x29a)],Window_Selectable[_0x5cc726(0x2e7)]['cursorPageup']=function(){const _0x416686=_0x5cc726;this[_0x416686(0x207)]()?this[_0x416686(0x213)](![]):VisuMZ[_0x416686(0x1f9)]['Window_Selectable_cursorPageup']['call'](this);},Window_ActorCommand[_0x5cc726(0x2e7)][_0x5cc726(0x213)]=function(_0x450faa){const _0x35602b=_0x5cc726,_0x3e2614=BattleManager[_0x35602b(0x2c4)];let _0x5a9416=$gameParty[_0x35602b(0x26b)]()[_0x35602b(0x313)](_0x3e2614);const _0x34a02c=$gameParty['battleMembers']()[_0x35602b(0x2c0)]-0x1;let _0x397c27=$gameParty[_0x35602b(0x26b)]()[_0x5a9416];for(;;){_0x5a9416+=_0x450faa?0x1:-0x1;if(_0x5a9416<0x0)_0x5a9416=_0x34a02c;if(_0x5a9416>_0x34a02c)_0x5a9416=0x0;_0x397c27=$gameParty['battleMembers']()[_0x5a9416];if(_0x397c27&&_0x397c27[_0x35602b(0x270)]()&&!_0x397c27[_0x35602b(0x277)]())break;if(_0x397c27===_0x3e2614)break;}this[_0x35602b(0x335)](_0x3e2614,_0x397c27);},Window_ActorCommand[_0x5cc726(0x2e7)][_0x5cc726(0x335)]=function(_0x12d94c,_0x12c4a5){const _0x2679e4=_0x5cc726;if(_0x12d94c===_0x12c4a5)return;if(_0x12d94c[_0x2679e4(0x2c7)]())_0x12d94c[_0x2679e4(0x2c7)]()[_0x2679e4(0x221)]();this[_0x2679e4(0x338)](),BattleManager[_0x2679e4(0x32e)]=_0x12c4a5,BattleManager['_currentActor']=_0x12c4a5,BattleManager['startActorInput'](),SceneManager[_0x2679e4(0x301)][_0x2679e4(0x210)]();},VisuMZ[_0x5cc726(0x1f9)]['Window_Selectable_processTouch']=Window_Selectable[_0x5cc726(0x2e7)][_0x5cc726(0x1ab)],Window_Selectable['prototype'][_0x5cc726(0x1ab)]=function(){const _0x4f2513=_0x5cc726;BattleManager[_0x4f2513(0x1de)]()&&BattleManager[_0x4f2513(0x25c)]&&this[_0x4f2513(0x2f4)]===Window_BattleStatus?this[_0x4f2513(0x2f9)]():VisuMZ[_0x4f2513(0x1f9)][_0x4f2513(0x281)][_0x4f2513(0x1e0)](this);},Window_BattleStatus[_0x5cc726(0x2e7)][_0x5cc726(0x2f9)]=function(){const _0x113306=_0x5cc726;this[_0x113306(0x31c)]()&&(TouchInput[_0x113306(0x219)]()&&this[_0x113306(0x238)](!![]));},Window_BattleStatus['prototype'][_0x5cc726(0x238)]=function(_0x5226c7){const _0x13fe4b=_0x5cc726,_0x389601=SceneManager[_0x13fe4b(0x301)]['_actorCommandWindow'];if(!_0x389601)return;if(!_0x389601['active'])return;this[_0x13fe4b(0x2ca)]=![];const _0x5af47a=this['index'](),_0x52b5cd=this['hitIndex']();if(_0x52b5cd>=0x0){const _0x2fd855=$gameParty['battleMembers']()[_0x5af47a],_0x110e98=$gameParty[_0x13fe4b(0x26b)]()[_0x52b5cd];this[_0x13fe4b(0x304)](_0x110e98)&&(_0x52b5cd===this['index']()&&(this['_doubleTouch']=!![]),this[_0x13fe4b(0x243)](_0x52b5cd),_0x389601[_0x13fe4b(0x335)](_0x2fd855,_0x110e98));}},Window_BattleStatus[_0x5cc726(0x2e7)]['canActorBeSelectedFTB']=function(_0x6b7878){const _0x2902de=_0x5cc726;if(!_0x6b7878)return![];if(!_0x6b7878[_0x2902de(0x215)]())return![];if(!_0x6b7878[_0x2902de(0x270)]())return![];if(_0x6b7878[_0x2902de(0x277)]())return![];return!![];};function Window_FTB_ActionCount(){const _0x41b176=_0x5cc726;this[_0x41b176(0x2ae)](...arguments);}function _0x5870(_0x5b7ea4,_0xbf05bb){const _0x4c9d67=_0x4c9d();return _0x5870=function(_0x58703c,_0x56467c){_0x58703c=_0x58703c-0x1a1;let _0x9b62fb=_0x4c9d67[_0x58703c];return _0x9b62fb;},_0x5870(_0x5b7ea4,_0xbf05bb);}Window_FTB_ActionCount[_0x5cc726(0x2e7)]=Object[_0x5cc726(0x2e4)](Window_Base[_0x5cc726(0x2e7)]),Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x2f4)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0x5cc726(0x290)]=VisuMZ[_0x5cc726(0x1f9)][_0x5cc726(0x290)][_0x5cc726(0x2b1)],Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x2ae)]=function(){const _0x5470cb=_0x5cc726,_0x4dada5=this[_0x5470cb(0x359)]();Window_Base[_0x5470cb(0x2e7)]['initialize'][_0x5470cb(0x1e0)](this,_0x4dada5),this[_0x5470cb(0x21f)](0x0),this[_0x5470cb(0x30f)](),this[_0x5470cb(0x26f)]=0x0;},Window_FTB_ActionCount['prototype'][_0x5cc726(0x359)]=function(){const _0x1c9b07=_0x5cc726;return new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x1c9b07(0x27b)]);},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x30f)]=function(){const _0xd35915=_0x5cc726;this[_0xd35915(0x212)]=null,this[_0xd35915(0x20b)]=0x0,this[_0xd35915(0x2b5)]=0x0;const _0x418c1d=Window_FTB_ActionCount[_0xd35915(0x290)];this[_0xd35915(0x299)]={'ActorPicture':_0x418c1d[_0xd35915(0x250)]?ImageManager[_0xd35915(0x31f)](_0x418c1d[_0xd35915(0x250)]):'','EnemyPicture':_0x418c1d[_0xd35915(0x1df)]?ImageManager['loadPicture'](_0x418c1d['EnemyActionPicture']):'','EmptyPicture':_0x418c1d['EmptyActionPicture']?ImageManager['loadPicture'](_0x418c1d['EmptyActionPicture']):''};},Window_FTB_ActionCount['prototype'][_0x5cc726(0x1c5)]=function(){const _0x5e9538=_0x5cc726;this[_0x5e9538(0x2e3)]=0x0;},Window_FTB_ActionCount['prototype'][_0x5cc726(0x1d2)]=function(_0x2193cb){const _0x5b9fb2=_0x5cc726;this['_unit']=_0x2193cb,this[_0x5b9fb2(0x1b5)]();},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x1b5)]=function(){const _0x42ea64=_0x5cc726;Window_Base[_0x42ea64(0x2e7)][_0x42ea64(0x1b5)]['call'](this),this[_0x42ea64(0x2a9)](),this['updatePosition'](),this['updateVisibility']();},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x2a9)]=function(){const _0x278994=_0x5cc726;if(!this[_0x278994(0x212)])return;(this[_0x278994(0x20b)]!==this[_0x278994(0x212)][_0x278994(0x203)]()||this[_0x278994(0x2b5)]!==this['_unit'][_0x278994(0x348)]())&&(this[_0x278994(0x20b)]=this[_0x278994(0x212)][_0x278994(0x203)](),this[_0x278994(0x2b5)]=this[_0x278994(0x212)][_0x278994(0x348)](),this['refresh']());},Window_FTB_ActionCount[_0x5cc726(0x2e7)]['updateVisibility']=function(){const _0x54b77b=_0x5cc726;this['visible']=$gameSystem[_0x54b77b(0x260)]();},Window_FTB_ActionCount['prototype'][_0x5cc726(0x294)]=function(){const _0x2d08fe=_0x5cc726;this['contents'][_0x2d08fe(0x261)]();if(!this[_0x2d08fe(0x212)])return;const _0x50d965=Window_FTB_ActionCount[_0x2d08fe(0x290)];if(!_0x50d965)return;const _0x2c58d6=this[_0x2d08fe(0x220)](),_0x585b82=this[_0x2d08fe(0x356)](),_0x2fff5d=_0x50d965[_0x2d08fe(0x2a0)]+_0x50d965[_0x2d08fe(0x22e)],_0x4b2985=_0x50d965[_0x2d08fe(0x246)];let _0x32fb53=_0x2c58d6['x'],_0x18e518=_0x2c58d6['y'];while(_0x585b82[_0x2d08fe(0x2c0)]>_0x50d965['MaxVisible']){_0x585b82[_0x2d08fe(0x218)]();}while(_0x585b82[_0x2d08fe(0x2c0)]>0x0){const _0x3282d7=_0x585b82[_0x2d08fe(0x218)]();this[_0x2d08fe(0x208)](_0x3282d7,_0x32fb53,_0x18e518,_0x585b82[_0x2d08fe(0x2c0)]),_0x4b2985?_0x32fb53+=_0x2fff5d:_0x18e518+=_0x2fff5d;}},Window_FTB_ActionCount[_0x5cc726(0x2e7)]['createStartingCoordinates']=function(){const _0x3e33a2=_0x5cc726,_0x15a765=Window_FTB_ActionCount[_0x3e33a2(0x290)],_0x55cf5c=this[_0x3e33a2(0x212)]===$gameParty,_0x136d56=_0x15a765[_0x3e33a2(0x2a0)],_0xd21ecb=_0x136d56*(_0x15a765[_0x3e33a2(0x2fb)]-0x1)+_0x15a765[_0x3e33a2(0x22e)]*(_0x15a765[_0x3e33a2(0x2fb)]-0x2),_0x14b747=_0x15a765[_0x3e33a2(0x246)],_0xca35c0=SceneManager['_scene'][_0x3e33a2(0x347)][_0x3e33a2(0x27b)];let _0x5cf2ff=0x0,_0x40c8a0=0x0;const _0x274d6d=_0x15a765[_0x3e33a2(0x289)];if(_0x274d6d){_0x40c8a0=this['innerHeight']-_0xca35c0-_0x15a765[_0x3e33a2(0x1d0)]-_0x136d56,_0x5cf2ff=_0x55cf5c?this[_0x3e33a2(0x209)]-_0x15a765['ScreenBufferX']-_0x136d56:_0x15a765[_0x3e33a2(0x1fe)];if(_0x14b747&&_0x55cf5c)_0x5cf2ff-=_0xd21ecb;else!_0x14b747&&(_0x40c8a0-=_0xd21ecb);}else _0x40c8a0=_0x15a765[_0x3e33a2(0x1d0)],_0x5cf2ff=_0x55cf5c?this[_0x3e33a2(0x209)]-_0x15a765['ScreenBufferX']-_0x136d56:_0x15a765[_0x3e33a2(0x1fe)],_0x14b747&&_0x55cf5c&&(_0x5cf2ff-=_0xd21ecb);return _0x5cf2ff+=_0x55cf5c?_0x15a765[_0x3e33a2(0x2e0)]:_0x15a765[_0x3e33a2(0x2a4)],_0x40c8a0+=_0x55cf5c?_0x15a765[_0x3e33a2(0x32f)]:_0x15a765[_0x3e33a2(0x349)],new Point(Math['round'](_0x5cf2ff),Math['round'](_0x40c8a0));},Window_FTB_ActionCount['prototype'][_0x5cc726(0x356)]=function(){const _0x4922fd=_0x5cc726,_0x529e21=Window_FTB_ActionCount['Settings'];let _0x309552=!![];if(_0x529e21[_0x4922fd(0x246)]){if(this['_unit']===$gameParty)_0x309552=!_0x309552;}else _0x309552=!_0x529e21[_0x4922fd(0x289)];let _0x1fa8eb=this['_unit']['getCurrentActionsFTB'](),_0x3f2d0b=Math[_0x4922fd(0x1f0)](0x0,this['_unit']['getMaxActionsFTB']()-_0x1fa8eb);const _0x5e1947=[];while(_0x1fa8eb--){const _0x495b43=_0x4922fd(0x322);_0x5e1947[_0x4922fd(0x33a)](_0x495b43);}while(_0x3f2d0b--){const _0x1c6347='Empty';_0x309552?_0x5e1947['push'](_0x1c6347):_0x5e1947[_0x4922fd(0x2fc)](_0x1c6347);}while(_0x5e1947[_0x4922fd(0x2c0)]<0xa){const _0x336f5a=_0x4922fd(0x340);_0x309552?_0x5e1947[_0x4922fd(0x33a)](_0x336f5a):_0x5e1947[_0x4922fd(0x2fc)](_0x336f5a);}return _0x5e1947;},Window_FTB_ActionCount['prototype'][_0x5cc726(0x208)]=function(_0x255210,_0x25ddc4,_0x25c266,_0x5c3d31){const _0x2ee2d4=_0x5cc726;if(_0x255210===_0x2ee2d4(0x340))return;if(_0x255210==='Current')_0x255210=this['_unit']===$gameParty?_0x2ee2d4(0x1e4):'Enemy';const _0xa9b30=Window_FTB_ActionCount[_0x2ee2d4(0x290)];if(_0xa9b30[_0x2ee2d4(0x1b6)['format'](_0x255210)]){const _0x337adc=_0xa9b30[_0x2ee2d4(0x1b6)[_0x2ee2d4(0x334)](_0x255210)],_0x30e1bb=ImageManager[_0x2ee2d4(0x31f)](_0x337adc);_0x30e1bb[_0x2ee2d4(0x2db)](this[_0x2ee2d4(0x256)][_0x2ee2d4(0x1fc)](this,_0x30e1bb,_0x25ddc4,_0x25c266,_0x5c3d31));}else{const _0x50f691=ImageManager['ftb%1ActionsIcon'[_0x2ee2d4(0x334)](_0x255210)];this[_0x2ee2d4(0x357)](_0x50f691,_0x25ddc4,_0x25c266),this[_0x2ee2d4(0x34f)](_0x5c3d31)&&this[_0x2ee2d4(0x32c)](_0x25ddc4,_0x25c266);}},Window_FTB_ActionCount['prototype'][_0x5cc726(0x256)]=function(_0x399c00,_0x49f529,_0x5d2b9d,_0x41668b){const _0x293408=_0x5cc726;if(!_0x399c00)return;const _0x2572f2=Window_FTB_ActionCount[_0x293408(0x290)],_0x253c24=_0x2572f2['ImageSize'],_0x4c4e17=_0x253c24/_0x399c00[_0x293408(0x2a3)],_0x126bc4=_0x253c24/_0x399c00[_0x293408(0x27b)],_0xbdfdaa=Math[_0x293408(0x280)](_0x4c4e17,_0x126bc4,0x1),_0x1d3421=_0x399c00[_0x293408(0x27b)],_0x43da08=_0x399c00[_0x293408(0x27b)],_0x45844c=Math[_0x293408(0x1a4)](_0x1d3421*_0xbdfdaa),_0x1ddfe6=Math[_0x293408(0x1a4)](_0x43da08*_0xbdfdaa),_0x220dfe=Math['round'](_0x49f529+(_0x253c24-_0x45844c)/0x2),_0x40036f=Math[_0x293408(0x1a4)](_0x5d2b9d+(_0x253c24-_0x1ddfe6)/0x2);this[_0x293408(0x33b)][_0x293408(0x1b4)][_0x293408(0x29f)]=_0x2572f2[_0x293408(0x1cf)],this[_0x293408(0x33b)][_0x293408(0x24b)](_0x399c00,0x0,0x0,_0x1d3421,_0x43da08,_0x220dfe,_0x40036f,_0x45844c,_0x1ddfe6),this['contents'][_0x293408(0x1b4)][_0x293408(0x29f)]=!![],this[_0x293408(0x34f)](_0x41668b)&&this[_0x293408(0x32c)](_0x49f529,_0x5d2b9d);},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x357)]=function(_0x50807c,_0x52322b,_0x5893b9){const _0x369b3a=_0x5cc726,_0x4362d1=Window_FTB_ActionCount[_0x369b3a(0x290)];let _0x42428=_0x4362d1['ImageSize'];const _0x5942f5=ImageManager[_0x369b3a(0x352)](_0x369b3a(0x24f)),_0x231178=ImageManager['iconWidth'],_0x38f9ca=ImageManager[_0x369b3a(0x26d)],_0x2c02d2=_0x50807c%0x10*_0x231178,_0x6c3233=Math['floor'](_0x50807c/0x10)*_0x38f9ca;this[_0x369b3a(0x33b)][_0x369b3a(0x1b4)]['imageSmoothingEnabled']=_0x4362d1[_0x369b3a(0x23a)],this[_0x369b3a(0x33b)]['blt'](_0x5942f5,_0x2c02d2,_0x6c3233,_0x231178,_0x38f9ca,_0x52322b,_0x5893b9,_0x42428,_0x42428),this['contents'][_0x369b3a(0x1b4)][_0x369b3a(0x29f)]=!![];},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x1c7)]=function(){const _0x24bc96=_0x5cc726,_0x28f6d0=Window_FTB_ActionCount[_0x24bc96(0x290)];if(_0x28f6d0['BottomPosition'])return;if(!_0x28f6d0['RepositionTopForHelp'])return;const _0x4e66ce=SceneManager[_0x24bc96(0x301)]['_helpWindow'];if(!_0x4e66ce)return;_0x4e66ce['visible']?(this['x']=_0x28f6d0['RepositionTopHelpX']||0x0,this['y']=_0x28f6d0[_0x24bc96(0x282)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_FTB_ActionCount['prototype']['canDrawActionsRemaining']=function(_0x2022fb){const _0x72c9db=_0x5cc726,_0x287535=Window_FTB_ActionCount['Settings'];if(!_0x287535[_0x72c9db(0x35a)])return![];const _0x3a734a=_0x287535[_0x72c9db(0x289)],_0x2e4d84=_0x287535[_0x72c9db(0x246)],_0x29e3b7=this['_unit']===$gameParty;if(_0x2e4d84)return _0x29e3b7?_0x2022fb===0x0:_0x2022fb===_0x287535['MaxVisible']-0x1;else return _0x3a734a?_0x2022fb===0x0:_0x2022fb===_0x287535[_0x72c9db(0x2fb)]-0x1;},Window_FTB_ActionCount[_0x5cc726(0x2e7)][_0x5cc726(0x32c)]=function(_0x43bc41,_0x29bc3e){const _0xde2fd2=_0x5cc726;this['resetFontSettings']();const _0xc066dc=Window_FTB_ActionCount[_0xde2fd2(0x290)],_0x16a5b7=new Rectangle(_0x43bc41,_0x29bc3e,_0xc066dc[_0xde2fd2(0x2a0)],_0xc066dc[_0xde2fd2(0x2a0)]);_0x16a5b7['x']+=_0xc066dc[_0xde2fd2(0x33c)],_0x16a5b7['y']+=_0xc066dc[_0xde2fd2(0x2d6)];const _0x25fd57=this[_0xde2fd2(0x212)][_0xde2fd2(0x203)]();this[_0xde2fd2(0x33b)]['fontSize']=_0xc066dc[_0xde2fd2(0x1ce)],this[_0xde2fd2(0x33b)][_0xde2fd2(0x231)](_0x25fd57,_0x16a5b7['x'],_0x16a5b7['y'],_0x16a5b7[_0xde2fd2(0x2a3)],_0x16a5b7[_0xde2fd2(0x27b)],'center'),this[_0xde2fd2(0x1f7)]();};