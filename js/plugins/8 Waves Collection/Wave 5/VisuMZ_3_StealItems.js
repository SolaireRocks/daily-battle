//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
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
 * Version 1.10: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if an enemy has no items that can be
 *    stolen when using snatch functionality. Fix made by Arisu.
 * 
 * Version 1.09: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Frontview Battle UI.
 * 
 * Version 1.08: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for action crash during Active TPB/ATB. Fix by Olivia.
 * 
 * Version 1.07: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.06: January 13, 2022
 * * Compatibility Update!
 * ** Better compatibility update with Extra Enemy Drops. Update made by Irina.
 * 
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

function _0x3df8(){const _0x2b902f=['%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','JsStealRateItem','Auto','fail','Game_Action_applyItemUserEffect','toUpperCase','1792pdrFCo','addWindow','_enemy','Weapon-%1-%2','processStealItemsSuccessJS','onStealSnatchOk','JSON','makeDropItems','registerSnatchTarget','weapon','textSizeEx','EmptyTextColor','_action','JsStealResist','2312328UojHcN','JsStealRateArmor','Parse_Notetags_JS','ShuffleArray','ITEM','CoreEngine','hide','processStealItemsSuccessEquipDebuff','filter','VisuMZ_4_ExtraEnemyDrops','drawItemNumber','DisplaySuccess','initialize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BattleLog','isEnemy','WEAPON','enemyIndex','_enemyWindow','ARRAYEVAL','_cache','_data','format','armor','itemWindowRect','toLowerCase','4277100rflNYM','isEnabled','type','createStealPlus','exit','setupStealableItems','JsOnStealEmpty','Scene_Battle_hideSubInputWindows','parse','Scene_Battle_onEnemyOk','StealFail','random','dataId','indexOf','EmptyFlashColor','_visualDrops','VisualGoldDisplay','2338ucnMJm','JsStealRate','ItemRemoval','GoldRemoval','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','adjustForFrontviewUi','empty','deactivate','2042912lkVbDa','JsOnStealNothing','processStealItemsSuccessPopup','drop','setItem','processStealItemsNothingPopup','ShowMessages','startStealSnatchSelection','trim','autoSelect','rate','constructor','_logWindow','processStealItemsFailureSFX','stealRate','ParseAllNotetags','7167250lubVTx','stolen','Game_Enemy_setup','createStealRateJS','isForOpponent','3771336WKkiCW','kind','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','StealableItemSingle','return\x200','ARRAYSTR','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Class-%1-%2','EVAL','9lkuyph','activate','name','applyItemUserEffect','setHandler','match','FUNC','concat','drawItemName','_stealableItems','processStealItemsSuccessLogWindow','VisuMZ_0_CoreEngine','createStealSnatchWindow','createKeyJS','_scene','show','clamp','Mechanics','includes','NUM','Actor-%1-%2','Game_Enemy_makeDropItems','gold','setupEnemyLevels','JsBonusSteal','%1_pitch','drawTextEx','prototype','_snatchItemIndex','_weaponIDs','currencyUnit','processStealItemsFailure','_snatchEnemyIndex','hideSubInputWindows','Sound','inputtingAction','processStealItemsSuccess','setText','playSe','item','createEnemyWindow','_helpWindow','description','isSnatchEffect','\x5cI[%1]','params','ARRAYNUM','StealData','Scene_Battle_createEnemyWindow','JsStealRateGold','EmptyPopupText','Gold','processStealItemsNothingJS','_armorIDs','iconIndex','SuccessPopupText','AutoItem','_itemIDs','processStealItemsNothingLogWindow','processStealItemsFailureLogWindow','setHelpWindowItem','%1_name','makeDeepCopy','call','AutoGold','types','88.88%','none','gainItem','makeSuccess','traitObjects','StealAction1','FailureFlashDuration','StealItem','ItemRate','split','snatchGoldIcon','createStealResist','createStealRate','processStealItemsAttempt','GoldRate','addStealText','Game_Enemy_gold','snatchGoldHelpText','FailureFlashColor','members','FailurePopupText','JsOnStealFail','StealableItemBatch','checkCacheKey','startStealItemsUserEffect','GoldIcon','StealableItems','VisuMZ_3_EnemyLevels','onStealSnatchCancel','ARRAYJSON','process_VisuMZ_StealItems','1dpOgFJ','_stealSnatchWindow','isForOne','getWeaponIdWithName','ParseItemNotetags','Settings','VisuMZ_3_VisualGoldDisplay','onEnemyOk','Scene_Battle_isAnyInputWindowActive','%1_volume','setup','map','active','ParseStealObject','GoldNameFmt','length','cancel','create','stealPlus','getSnatchTarget','createOnStealJS','ARMOR','status','ConvertParams','getStealableItems','width','JsStealRateWeapon','processStealItemsFailureJS','StealAction2','Scene_Boot_onDatabaseLoaded','dropItems','AlreadyStolen','SuccessTextColor','FailureTextColor','refresh','needsSelection','Game_BattlerBase_refresh','StealRate','enemy','plus','STR','_numberWidth','setupTextPopup','ParseSkillNotetags','getArmorIdWithName','all','Snatch','parameters','onDatabaseLoaded','StealEmpty','max','Armor-%1-%2','SuccessItemName','bind','processStealItemsNothingSFX','GoldHelp','floor','EmptyFlashDuration','subject','snatchAlreadyStolen','note','DetermineStealData','VisuMZ_1_BattleCore','RegExp','process_VisuMZ_StealItems_JS','textWidth','Game_Enemy_setupEnemyLevels','denominator','numberWidth','%1_pan','processStealItemsFailurePopup','setupIconTextPopup','snatchGoldNameFmt','GOLD','StealItems','853458HjGIvC','STRUCT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','VisuMZ_3_FrontviewBattleUI','push','processStealItemsSuccessSFX','SuccessFlashDuration','JsOnStealSuccess','Skill-%1-%2','stealResist'];_0x3df8=function(){return _0x2b902f;};return _0x3df8();}function _0x390b(_0x392358,_0x502b3f){const _0x3df8e6=_0x3df8();return _0x390b=function(_0x390b23,_0x21e082){_0x390b23=_0x390b23-0x125;let _0x1e4e34=_0x3df8e6[_0x390b23];return _0x1e4e34;},_0x390b(_0x392358,_0x502b3f);}const _0x297cc1=_0x390b;(function(_0x5736af,_0x79c651){const _0x346328=_0x390b,_0x4d91b9=_0x5736af();while(!![]){try{const _0x2cc9f0=parseInt(_0x346328(0x1f8))/0x1*(-parseInt(_0x346328(0x128))/0x2)+parseInt(_0x346328(0x146))/0x3+parseInt(_0x346328(0x179))/0x4+parseInt(_0x346328(0x160))/0x5+-parseInt(_0x346328(0x18e))/0x6+-parseInt(_0x346328(0x171))/0x7*(-parseInt(_0x346328(0x138))/0x8)+-parseInt(_0x346328(0x197))/0x9*(parseInt(_0x346328(0x189))/0xa);if(_0x2cc9f0===_0x79c651)break;else _0x4d91b9['push'](_0x4d91b9['shift']());}catch(_0x30ab2d){_0x4d91b9['push'](_0x4d91b9['shift']());}}}(_0x3df8,0x6b5b2));var label=_0x297cc1(0x127),tier=tier||0x0,dependencies=[_0x297cc1(0x236)],pluginData=$plugins[_0x297cc1(0x14e)](function(_0x17cc13){const _0xb948cb=_0x297cc1;return _0x17cc13[_0xb948cb(0x20e)]&&_0x17cc13[_0xb948cb(0x1c1)][_0xb948cb(0x1a9)]('['+label+']');})[0x0];VisuMZ[label][_0x297cc1(0x1fd)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x4e1771,_0x517887){const _0x583a7b=_0x297cc1;for(const _0x1ec091 in _0x517887){if(_0x1ec091['match'](/(.*):(.*)/i)){const _0x2ae1a9=String(RegExp['$1']),_0x30cbac=String(RegExp['$2'])['toUpperCase']()[_0x583a7b(0x181)]();let _0x46b791,_0x42402d,_0x1dd2c6;switch(_0x30cbac){case _0x583a7b(0x1aa):_0x46b791=_0x517887[_0x1ec091]!==''?Number(_0x517887[_0x1ec091]):0x0;break;case _0x583a7b(0x1c5):_0x42402d=_0x517887[_0x1ec091]!==''?JSON['parse'](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d['map'](_0x2dd975=>Number(_0x2dd975));break;case _0x583a7b(0x196):_0x46b791=_0x517887[_0x1ec091]!==''?eval(_0x517887[_0x1ec091]):null;break;case _0x583a7b(0x159):_0x42402d=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d['map'](_0x297d20=>eval(_0x297d20));break;case _0x583a7b(0x13e):_0x46b791=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):'';break;case _0x583a7b(0x1f6):_0x42402d=_0x517887[_0x1ec091]!==''?JSON['parse'](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d[_0x583a7b(0x203)](_0xedf190=>JSON[_0x583a7b(0x168)](_0xedf190));break;case _0x583a7b(0x19d):_0x46b791=_0x517887[_0x1ec091]!==''?new Function(JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091])):new Function(_0x583a7b(0x192));break;case'ARRAYFUNC':_0x42402d=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d[_0x583a7b(0x203)](_0x5bd6b7=>new Function(JSON[_0x583a7b(0x168)](_0x5bd6b7)));break;case _0x583a7b(0x220):_0x46b791=_0x517887[_0x1ec091]!==''?String(_0x517887[_0x1ec091]):'';break;case _0x583a7b(0x193):_0x42402d=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d[_0x583a7b(0x203)](_0x1ac5f5=>String(_0x1ac5f5));break;case _0x583a7b(0x129):_0x1dd2c6=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):{},_0x46b791=VisuMZ[_0x583a7b(0x20f)]({},_0x1dd2c6);break;case'ARRAYSTRUCT':_0x42402d=_0x517887[_0x1ec091]!==''?JSON[_0x583a7b(0x168)](_0x517887[_0x1ec091]):[],_0x46b791=_0x42402d[_0x583a7b(0x203)](_0x4f5751=>VisuMZ[_0x583a7b(0x20f)]({},JSON[_0x583a7b(0x168)](_0x4f5751)));break;default:continue;}_0x4e1771[_0x2ae1a9]=_0x46b791;}}return _0x4e1771;},(_0x156631=>{const _0x185124=_0x297cc1,_0x5ab106=_0x156631[_0x185124(0x199)];for(const _0x48efef of dependencies){if(!Imported[_0x48efef]){alert(_0x185124(0x132)[_0x185124(0x15c)](_0x5ab106,_0x48efef)),SceneManager[_0x185124(0x164)]();break;}}const _0x5d48af=_0x156631[_0x185124(0x1c1)];if(_0x5d48af[_0x185124(0x19c)](/\[Version[ ](.*?)\]/i)){const _0x5ec281=Number(RegExp['$1']);_0x5ec281!==VisuMZ[label]['version']&&(alert(_0x185124(0x190)[_0x185124(0x15c)](_0x5ab106,_0x5ec281)),SceneManager[_0x185124(0x164)]());}if(_0x5d48af[_0x185124(0x19c)](/\[Tier[ ](\d+)\]/i)){const _0x1c1bea=Number(RegExp['$1']);_0x1c1bea<tier?(alert(_0x185124(0x153)[_0x185124(0x15c)](_0x5ab106,_0x1c1bea,tier)),SceneManager[_0x185124(0x164)]()):tier=Math['max'](_0x1c1bea,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x185124(0x1fd)],_0x156631[_0x185124(0x227)]);})(pluginData),VisuMZ['StealItems'][_0x297cc1(0x215)]=Scene_Boot[_0x297cc1(0x1b2)][_0x297cc1(0x228)],Scene_Boot[_0x297cc1(0x1b2)][_0x297cc1(0x228)]=function(){const _0x17a41b=_0x297cc1;VisuMZ[_0x17a41b(0x127)][_0x17a41b(0x215)][_0x17a41b(0x1d6)](this),this[_0x17a41b(0x1f7)]();},Scene_Boot[_0x297cc1(0x1b2)]['process_VisuMZ_StealItems']=function(){const _0xf7db6a=_0x297cc1;if(VisuMZ[_0xf7db6a(0x188)])return;this['process_VisuMZ_StealItems_JS']();},VisuMZ[_0x297cc1(0x127)]['RegExp']={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot['prototype'][_0x297cc1(0x238)]=function(){const _0x20fa86=_0x297cc1,_0x2a7ccb=$dataSkills[_0x20fa86(0x19e)]($dataItems);for(const _0xace9b3 of _0x2a7ccb){if(!_0xace9b3)continue;VisuMZ['StealItems'][_0x20fa86(0x148)](_0xace9b3);}},VisuMZ[_0x297cc1(0x127)]['ParseSkillNotetags']=VisuMZ[_0x297cc1(0x223)],VisuMZ[_0x297cc1(0x223)]=function(_0x511ac9){const _0x5662f4=_0x297cc1;VisuMZ[_0x5662f4(0x127)][_0x5662f4(0x223)][_0x5662f4(0x1d6)](this,_0x511ac9),VisuMZ[_0x5662f4(0x127)][_0x5662f4(0x148)](_0x511ac9);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1fc)]=VisuMZ[_0x297cc1(0x1fc)],VisuMZ[_0x297cc1(0x1fc)]=function(_0xaf6f56){const _0x9c86fc=_0x297cc1;VisuMZ[_0x9c86fc(0x127)]['ParseItemNotetags']['call'](this,_0xaf6f56),VisuMZ[_0x9c86fc(0x127)][_0x9c86fc(0x148)](_0xaf6f56);},VisuMZ[_0x297cc1(0x127)]['Parse_Notetags_JS']=function(_0x5d1fd6){const _0x4b1d78=_0x297cc1,_0xb63cb6=VisuMZ['StealItems']['RegExp'];let _0x8fba7=_0x4b1d78(0x172),_0xc64e84=_0xb63cb6[_0x4b1d78(0x172)];VisuMZ[_0x4b1d78(0x127)][_0x4b1d78(0x18c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7=_0x4b1d78(0x1c8),_0xc64e84=_0xb63cb6[_0x4b1d78(0x1c8)],VisuMZ[_0x4b1d78(0x127)][_0x4b1d78(0x18c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7='JsStealRateItem',_0xc64e84=_0xb63cb6[_0x4b1d78(0x133)],VisuMZ[_0x4b1d78(0x127)][_0x4b1d78(0x18c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7=_0x4b1d78(0x212),_0xc64e84=_0xb63cb6['JsStealRateWeapon'],VisuMZ['StealItems'][_0x4b1d78(0x18c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7=_0x4b1d78(0x147),_0xc64e84=_0xb63cb6[_0x4b1d78(0x147)],VisuMZ[_0x4b1d78(0x127)]['createStealRateJS'](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7='JsOnStealSuccess',_0xc64e84=_0xb63cb6['JsOnStealSuccess'],VisuMZ[_0x4b1d78(0x127)][_0x4b1d78(0x20c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7=_0x4b1d78(0x1ee),_0xc64e84=_0xb63cb6[_0x4b1d78(0x1ee)],VisuMZ['StealItems'][_0x4b1d78(0x20c)](_0x5d1fd6,_0x8fba7,_0xc64e84),_0x8fba7=_0x4b1d78(0x17a),_0xc64e84=_0xb63cb6[_0x4b1d78(0x17a)],VisuMZ[_0x4b1d78(0x127)][_0x4b1d78(0x20c)](_0x5d1fd6,_0x8fba7,_0xc64e84);},VisuMZ[_0x297cc1(0x127)]['JS']={},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x18c)]=function(_0x58f0d7,_0xfd5c3b,_0x57f663){const _0x441fa4=_0x297cc1,_0x30d369=_0x58f0d7[_0x441fa4(0x234)];if(_0x30d369[_0x441fa4(0x19c)](_0x57f663)){const _0x11a77a=String(RegExp['$1']),_0x5d2695=_0x441fa4(0x12a)[_0x441fa4(0x15c)](_0x11a77a),_0x4d3c1c=VisuMZ[_0x441fa4(0x127)][_0x441fa4(0x1a4)](_0x58f0d7,_0xfd5c3b);VisuMZ[_0x441fa4(0x127)]['JS'][_0x4d3c1c]=new Function(_0x5d2695);}},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x20c)]=function(_0x432a22,_0x12e27e,_0x1e6e65){const _0x499b49=_0x297cc1,_0x50ed1a=_0x432a22['note'];if(_0x50ed1a[_0x499b49(0x19c)](_0x1e6e65)){const _0x1461ae=String(RegExp['$1']),_0xda5f3e=_0x499b49(0x194)[_0x499b49(0x15c)](_0x1461ae),_0x1c0e98=VisuMZ[_0x499b49(0x127)][_0x499b49(0x1a4)](_0x432a22,_0x12e27e);VisuMZ['StealItems']['JS'][_0x1c0e98]=new Function(_0xda5f3e);}},VisuMZ[_0x297cc1(0x127)]['createKeyJS']=function(_0x5970c6,_0x2f3ce1){const _0x510dc2=_0x297cc1;if(VisuMZ[_0x510dc2(0x1a4)])return VisuMZ[_0x510dc2(0x1a4)](_0x5970c6,_0x2f3ce1);let _0x44e93f='';if($dataActors[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f=_0x510dc2(0x1ab)[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataClasses[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f=_0x510dc2(0x195)[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataSkills['includes'](_0x5970c6))_0x44e93f=_0x510dc2(0x130)[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataItems[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f='Item-%1-%2'[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataWeapons[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f=_0x510dc2(0x13b)[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataArmors[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f=_0x510dc2(0x22b)[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataEnemies[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f='Enemy-%1-%2'[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);if($dataStates[_0x510dc2(0x1a9)](_0x5970c6))_0x44e93f='State-%1-%2'[_0x510dc2(0x15c)](_0x5970c6['id'],_0x2f3ce1);return _0x44e93f;},DataManager['getItemIdWithName']=function(_0x8d1b3a){const _0x4a94cf=_0x297cc1;_0x8d1b3a=_0x8d1b3a[_0x4a94cf(0x137)]()[_0x4a94cf(0x181)](),this[_0x4a94cf(0x1d0)]=this[_0x4a94cf(0x1d0)]||{};if(this[_0x4a94cf(0x1d0)][_0x8d1b3a])return this[_0x4a94cf(0x1d0)][_0x8d1b3a];for(const _0x75397c of $dataItems){if(!_0x75397c)continue;this[_0x4a94cf(0x1d0)][_0x75397c[_0x4a94cf(0x199)]['toUpperCase']()['trim']()]=_0x75397c['id'];}return this[_0x4a94cf(0x1d0)][_0x8d1b3a]||0x0;},DataManager['getWeaponIdWithName']=function(_0x1075cc){const _0x3a3d00=_0x297cc1;_0x1075cc=_0x1075cc[_0x3a3d00(0x137)]()[_0x3a3d00(0x181)](),this[_0x3a3d00(0x1b4)]=this['_weaponIDs']||{};if(this[_0x3a3d00(0x1b4)][_0x1075cc])return this[_0x3a3d00(0x1b4)][_0x1075cc];for(const _0x1a8a29 of $dataWeapons){if(!_0x1a8a29)continue;this['_weaponIDs'][_0x1a8a29[_0x3a3d00(0x199)][_0x3a3d00(0x137)]()[_0x3a3d00(0x181)]()]=_0x1a8a29['id'];}return this['_weaponIDs'][_0x1075cc]||0x0;},DataManager['getArmorIdWithName']=function(_0x1619a1){const _0x4cf81b=_0x297cc1;_0x1619a1=_0x1619a1[_0x4cf81b(0x137)]()[_0x4cf81b(0x181)](),this['_armorIDs']=this['_armorIDs']||{};if(this[_0x4cf81b(0x1cc)][_0x1619a1])return this[_0x4cf81b(0x1cc)][_0x1619a1];for(const _0x426d8d of $dataArmors){if(!_0x426d8d)continue;this['_armorIDs'][_0x426d8d[_0x4cf81b(0x199)]['toUpperCase']()[_0x4cf81b(0x181)]()]=_0x426d8d['id'];}return this['_armorIDs'][_0x1619a1]||0x0;},ImageManager[_0x297cc1(0x1e3)]=Imported[_0x297cc1(0x1a2)]?VisuMZ[_0x297cc1(0x14b)][_0x297cc1(0x1fd)][_0x297cc1(0x1ca)][_0x297cc1(0x1f2)]:VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1fd)]['Snatch']['GoldIcon'],TextManager['snatchGoldNameFmt']=VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1fd)][_0x297cc1(0x226)][_0x297cc1(0x206)],TextManager[_0x297cc1(0x1ea)]=VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1fd)][_0x297cc1(0x226)][_0x297cc1(0x22f)],TextManager['snatchAlreadyStolen']=VisuMZ[_0x297cc1(0x127)]['Settings'][_0x297cc1(0x226)][_0x297cc1(0x217)],VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x136)]=Game_Action['prototype'][_0x297cc1(0x19a)],Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x19a)]=function(_0x21d93d){const _0x1a3296=_0x297cc1;VisuMZ[_0x1a3296(0x127)][_0x1a3296(0x136)]['call'](this,_0x21d93d),this['startStealItemsUserEffect'](_0x21d93d);},Game_Action['prototype'][_0x297cc1(0x1f1)]=function(_0x489951){const _0x2dae3c=_0x297cc1;if(!this['item']())return;if(!_0x489951[_0x2dae3c(0x155)]())return;if(this[_0x2dae3c(0x232)]()[_0x2dae3c(0x155)]())return;const _0x1d6660=VisuMZ[_0x2dae3c(0x127)][_0x2dae3c(0x235)](this,_0x489951);if(_0x1d6660[_0x2dae3c(0x1d8)]['length']<=0x0)return;const _0xef10cf=_0x489951[_0x2dae3c(0x210)]();if(_0xef10cf[_0x2dae3c(0x207)]<=0x0)return;let _0xcbd9ba=[];this[_0x2dae3c(0x1c2)]()?_0xcbd9ba=this[_0x2dae3c(0x20b)](_0x489951):_0xcbd9ba=_0xef10cf[_0x2dae3c(0x14e)](_0x3100fa=>{const _0x5e7f00=_0x2dae3c;return _0x1d6660[_0x5e7f00(0x1d8)]['includes'](_0x3100fa['type']);});_0xcbd9ba=_0xcbd9ba[_0x2dae3c(0x14e)](_0x160e74=>{const _0x433ac1=_0x2dae3c;return!_0x160e74[_0x433ac1(0x18a)];});if(_0xcbd9ba[_0x2dae3c(0x207)]<=0x0)return this['processStealItemsNothing'](_0x489951);this[_0x2dae3c(0x1e6)](_0x489951,_0x1d6660,_0xcbd9ba);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x235)]=function(_0x137093,_0x513600){const _0x112e03=_0x297cc1,_0x1b0518=VisuMZ[_0x112e03(0x127)][_0x112e03(0x237)],_0xd554d4=_0x137093[_0x112e03(0x1be)]()[_0x112e03(0x234)];let _0x6dbf0a=[],_0xeaa4e7={'all':_0x137093['subject']()[_0x112e03(0x187)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x374be9={'all':_0x137093[_0x112e03(0x232)]()['stealPlus']()-_0x513600[_0x112e03(0x131)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0xd554d4[_0x112e03(0x19c)](_0x1b0518[_0x112e03(0x1de)])&&(_0x6dbf0a=[_0x112e03(0x126),_0x112e03(0x14a),_0x112e03(0x156),_0x112e03(0x20d)]);const _0x4b3ab6=_0xd554d4[_0x112e03(0x19c)](_0x1b0518[_0x112e03(0x214)]);if(_0x4b3ab6)for(const _0x11f292 of _0x4b3ab6){if(!_0x11f292)continue;if(_0x11f292['match'](/ALL/i)){_0x6dbf0a=['GOLD',_0x112e03(0x14a),_0x112e03(0x156),_0x112e03(0x20d)];if(_0x11f292[_0x112e03(0x19c)](/([\+\-]\d+)([%％])/i))_0x374be9[_0x112e03(0x225)]+=Number(RegExp['$1'])*0.01;else _0x11f292[_0x112e03(0x19c)](/(\d+)([%％])/i)&&(_0xeaa4e7['all']*=Number(RegExp['$1'])*0.01);}if(_0x11f292[_0x112e03(0x19c)](/GOLD/i)){_0x6dbf0a[_0x112e03(0x12c)](_0x112e03(0x126));if(_0x11f292[_0x112e03(0x19c)](/([\+\-]\d+)([%％])/i))_0x374be9[_0x112e03(0x1ad)]+=Number(RegExp['$1'])*0.01;else _0x11f292[_0x112e03(0x19c)](/(\d+)([%％])/i)&&(_0xeaa4e7[_0x112e03(0x1ad)]*=Number(RegExp['$1'])*0.01);}if(_0x11f292[_0x112e03(0x19c)](/ITEM/i)){_0x6dbf0a['push'](_0x112e03(0x14a));if(_0x11f292[_0x112e03(0x19c)](/([\+\-]\d+)([%％])/i))_0x374be9['item']+=Number(RegExp['$1'])*0.01;else _0x11f292[_0x112e03(0x19c)](/(\d+)([%％])/i)&&(_0xeaa4e7[_0x112e03(0x1be)]*=Number(RegExp['$1'])*0.01);}if(_0x11f292[_0x112e03(0x19c)](/WEAPON/i)){_0x6dbf0a[_0x112e03(0x12c)](_0x112e03(0x156));if(_0x11f292['match'](/([\+\-]\d+)([%％])/i))_0x374be9[_0x112e03(0x141)]+=Number(RegExp['$1'])*0.01;else _0x11f292[_0x112e03(0x19c)](/(\d+)([%％])/i)&&(_0xeaa4e7[_0x112e03(0x141)]*=Number(RegExp['$1'])*0.01);}if(_0x11f292[_0x112e03(0x19c)](/ARMOR/i)){_0x6dbf0a['push']('ARMOR');if(_0x11f292['match'](/([\+\-]\d+)([%％])/i))_0x374be9['armor']+=Number(RegExp['$1'])*0.01;else _0x11f292[_0x112e03(0x19c)](/(\d+)([%％])/i)&&(_0xeaa4e7[_0x112e03(0x15d)]*=Number(RegExp['$1'])*0.01);}}let _0x546ac4=VisuMZ[_0x112e03(0x127)][_0x112e03(0x1a4)](_0x137093['item'](),_0x112e03(0x172));return VisuMZ['StealItems']['JS'][_0x546ac4]&&(_0xeaa4e7[_0x112e03(0x225)]=VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4]['call'](_0x137093,_0x137093[_0x112e03(0x232)](),_0x513600,_0xeaa4e7['all'])),_0x546ac4=VisuMZ[_0x112e03(0x127)]['createKeyJS'](_0x137093[_0x112e03(0x1be)](),_0x112e03(0x1c8)),VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4]&&(_0xeaa4e7[_0x112e03(0x1ad)]=VisuMZ['StealItems']['JS'][_0x546ac4][_0x112e03(0x1d6)](_0x137093,_0x137093[_0x112e03(0x232)](),_0x513600,_0xeaa4e7['gold'])),_0x546ac4=VisuMZ[_0x112e03(0x127)][_0x112e03(0x1a4)](_0x137093[_0x112e03(0x1be)](),_0x112e03(0x133)),VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4]&&(_0xeaa4e7[_0x112e03(0x1be)]=VisuMZ['StealItems']['JS'][_0x546ac4][_0x112e03(0x1d6)](_0x137093,_0x137093[_0x112e03(0x232)](),_0x513600,_0xeaa4e7['item'])),_0x546ac4=VisuMZ[_0x112e03(0x127)][_0x112e03(0x1a4)](_0x137093[_0x112e03(0x1be)](),'JsStealRateWeapon'),VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4]&&(_0xeaa4e7['weapon']=VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4][_0x112e03(0x1d6)](_0x137093,_0x137093[_0x112e03(0x232)](),_0x513600,_0xeaa4e7[_0x112e03(0x141)])),_0x546ac4=VisuMZ[_0x112e03(0x127)]['createKeyJS'](_0x137093[_0x112e03(0x1be)](),_0x112e03(0x147)),VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4]&&(_0xeaa4e7[_0x112e03(0x15d)]=VisuMZ[_0x112e03(0x127)]['JS'][_0x546ac4][_0x112e03(0x1d6)](_0x137093,_0x137093[_0x112e03(0x232)](),_0x513600,_0xeaa4e7[_0x112e03(0x15d)])),{'types':_0x6dbf0a,'rate':_0xeaa4e7,'plus':_0x374be9};},VisuMZ['StealItems'][_0x297cc1(0x149)]=function(_0x3470e3){const _0x5942af=_0x297cc1;var _0xc05be9,_0x5bb82b,_0xf197b9;for(_0xf197b9=_0x3470e3[_0x5942af(0x207)]-0x1;_0xf197b9>0x0;_0xf197b9--){_0xc05be9=Math[_0x5942af(0x230)](Math[_0x5942af(0x16b)]()*(_0xf197b9+0x1)),_0x5bb82b=_0x3470e3[_0xf197b9],_0x3470e3[_0xf197b9]=_0x3470e3[_0xc05be9],_0x3470e3[_0xc05be9]=_0x5bb82b;}return _0x3470e3;},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x1e6)]=function(_0x45f4ae,_0x12dfa6,_0xe7420){const _0x2341ed=_0x297cc1;VisuMZ['StealItems'][_0x2341ed(0x149)](_0xe7420),this[_0x2341ed(0x1dc)](_0x45f4ae);for(const _0x100bb9 of _0xe7420){if(!_0x100bb9)continue;let _0xdec668=_0x12dfa6['rate']['all']*_0x100bb9[_0x2341ed(0x183)],_0x5b41c9=_0x12dfa6['plus'][_0x2341ed(0x225)];_0xdec668*=_0x12dfa6[_0x2341ed(0x183)][_0x100bb9['type'][_0x2341ed(0x15f)]()],_0x5b41c9+=_0x12dfa6[_0x2341ed(0x21f)][_0x100bb9[_0x2341ed(0x162)][_0x2341ed(0x15f)]()];const _0x54f712=_0xdec668+_0x5b41c9;if(Math[_0x2341ed(0x16b)]()<_0x54f712)return this[_0x2341ed(0x1bb)](_0x45f4ae,_0x100bb9);}this[_0x2341ed(0x1b6)](_0x45f4ae);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x1c2)]=function(){const _0xf2d5cc=_0x297cc1;if(!this[_0xf2d5cc(0x1be)]())return![];if(!this[_0xf2d5cc(0x1fa)]())return![];if(!this[_0xf2d5cc(0x18d)]())return![];if(!this[_0xf2d5cc(0x21b)]())return![];const _0x47a591=VisuMZ['StealItems'][_0xf2d5cc(0x237)],_0x10419f=this[_0xf2d5cc(0x1be)]()[_0xf2d5cc(0x234)];return _0x10419f['match'](_0x47a591['Snatch'])&&(_0x10419f[_0xf2d5cc(0x19c)](_0x47a591['StealAction1'])||_0x10419f[_0xf2d5cc(0x19c)](_0x47a591[_0xf2d5cc(0x214)]));},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x140)]=function(_0x1e628c,_0x2f55f2){const _0x3686b8=_0x297cc1;this[_0x3686b8(0x1b7)]=_0x1e628c['index']();const _0x140938=_0x1e628c[_0x3686b8(0x210)]();this[_0x3686b8(0x1b3)]=_0x140938[_0x3686b8(0x16d)](_0x2f55f2);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x20b)]=function(_0x4106b9){const _0x23ccb9=_0x297cc1;if(_0x4106b9['index']()!==this[_0x23ccb9(0x1b7)])return[];this['_snatchItemIndex']=this[_0x23ccb9(0x1b3)]||0x0;const _0x588956=_0x4106b9[_0x23ccb9(0x210)]();return[_0x588956[this[_0x23ccb9(0x1b3)]]];},Game_Action['prototype']['processStealItemsSuccess']=function(_0x3f2032,_0xf03415){const _0x1eacc5=_0x297cc1;_0xf03415['stolen']=!![],this[_0x1eacc5(0x1a1)](_0x3f2032,_0xf03415),this[_0x1eacc5(0x12d)](_0xf03415),this[_0x1eacc5(0x17b)](_0x3f2032,_0xf03415),this['processStealItemsSuccessEquipDebuff'](_0x3f2032,_0xf03415),this[_0x1eacc5(0x13c)](_0x3f2032,_0xf03415);},Game_Action['prototype']['processStealItemsSuccessLogWindow']=function(_0x185b85,_0x137275){const _0x3a903b=_0x297cc1,_0x2ddbed=VisuMZ[_0x3a903b(0x127)][_0x3a903b(0x1fd)][_0x3a903b(0x154)];let _0x34d469=_0x2ddbed[_0x3a903b(0x1e0)],_0x1e9060='';if(_0x137275['type']==='GOLD'){$gameParty['gainGold'](_0x137275['id']);if(Imported[_0x3a903b(0x1fe)]){const _0x397290=Window_Base[_0x3a903b(0x175)],_0x4b6df0=VisuMZ[_0x3a903b(0x170)]['CreateVisualGoldText'](_0x137275['id'],_0x397290,![]);_0x1e9060=_0x34d469[_0x3a903b(0x15c)](_0x4b6df0,'');}else _0x34d469=_0x2ddbed['StealGold'],_0x1e9060=_0x34d469[_0x3a903b(0x15c)](TextManager['currencyUnit'],_0x137275['id']);if(Imported[_0x3a903b(0x14f)]){const _0x1f37c2=VisuMZ[_0x3a903b(0x127)][_0x3a903b(0x1fd)][_0x3a903b(0x134)];_0x1f37c2[_0x3a903b(0x1d7)]&&_0x1f37c2[_0x3a903b(0x174)]&&(_0x185b85[_0x3a903b(0x16f)]=_0x185b85[_0x3a903b(0x16f)]||{},_0x185b85[_0x3a903b(0x16f)][_0x3a903b(0x1ad)]=0x0);}}else{if(_0x137275[_0x3a903b(0x162)]===_0x3a903b(0x14a)){const _0xdd80af=$dataItems[_0x137275['id']];if(!_0xdd80af)return;$gameParty['gainItem'](_0xdd80af,0x1);const _0x1a64d6=_0x3a903b(0x1c3)[_0x3a903b(0x15c)](_0xdd80af[_0x3a903b(0x1cd)]);_0x1e9060=_0x34d469[_0x3a903b(0x15c)](_0xdd80af['name'],_0x1a64d6);}else{if(_0x137275[_0x3a903b(0x162)]===_0x3a903b(0x156)){const _0x5f5b2b=$dataWeapons[_0x137275['id']];if(!_0x5f5b2b)return;$gameParty[_0x3a903b(0x1db)](_0x5f5b2b,0x1);const _0x303d59=_0x3a903b(0x1c3)[_0x3a903b(0x15c)](_0x5f5b2b[_0x3a903b(0x1cd)]);_0x1e9060=_0x34d469[_0x3a903b(0x15c)](_0x5f5b2b[_0x3a903b(0x199)],_0x303d59);}else{if(_0x137275[_0x3a903b(0x162)]===_0x3a903b(0x20d)){const _0x50f315=$dataArmors[_0x137275['id']];if(!_0x50f315)return;$gameParty[_0x3a903b(0x1db)](_0x50f315,0x1);const _0x1582bc=_0x3a903b(0x1c3)[_0x3a903b(0x15c)](_0x50f315['iconIndex']);_0x1e9060=_0x34d469[_0x3a903b(0x15c)](_0x50f315[_0x3a903b(0x199)],_0x1582bc);}}}}if(_0x2ddbed['ShowMessages']){const _0x113903=SceneManager[_0x3a903b(0x1a5)][_0x3a903b(0x185)];if(_0x113903&&_0x1e9060!=='')_0x113903[_0x3a903b(0x1e8)](_0x1e9060);}},Game_Action['prototype'][_0x297cc1(0x12d)]=function(_0x334e82){const _0xdd485c=_0x297cc1,_0x5c84b7=VisuMZ[_0xdd485c(0x127)]['Settings']['Sound'];if(!_0x5c84b7)return;const _0x3138a5=_0x334e82[_0xdd485c(0x162)][_0xdd485c(0x15f)]()[_0xdd485c(0x181)](),_0x41ed45={'name':_0x5c84b7['%1_name'['format'](_0x3138a5)]||'','volume':_0x5c84b7[_0xdd485c(0x201)['format'](_0x3138a5)]||0x0,'pitch':_0x5c84b7[_0xdd485c(0x1b0)[_0xdd485c(0x15c)](_0x3138a5)]||0x0,'pan':_0x5c84b7[_0xdd485c(0x23d)['format'](_0x3138a5)]||0x0};if(_0x41ed45[_0xdd485c(0x199)]!=='')AudioManager[_0xdd485c(0x1bd)](_0x41ed45);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x17b)]=function(_0x33a506,_0x4aa3f3){const _0x466c68=_0x297cc1;if(!_0x4aa3f3)return;if(!_0x33a506)return;const _0x194009=VisuMZ['StealItems'][_0x466c68(0x1fd)]['Popup'];if(!_0x194009)return;if(_0x194009[_0x466c68(0x1ce)]==='')return;const _0xd72cd3=_0x194009[_0x466c68(0x1ce)],_0x18fb5b={'textColor':_0x194009[_0x466c68(0x218)]||0x0,'flashColor':_0x194009['SuccessFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x194009[_0x466c68(0x12e)]||0x3c};_0x33a506[_0x466c68(0x222)](_0xd72cd3,_0x18fb5b);if(_0x194009[_0x466c68(0x22c)]&&_0x4aa3f3[_0x466c68(0x162)]!==_0x466c68(0x126)){let _0xd67b43=null;if(_0x4aa3f3[_0x466c68(0x162)]==='ITEM')_0xd67b43=$dataItems[_0x4aa3f3['id']];else{if(_0x4aa3f3[_0x466c68(0x162)]===_0x466c68(0x156))_0xd67b43=$dataWeapons[_0x4aa3f3['id']];else _0x4aa3f3[_0x466c68(0x162)]===_0x466c68(0x20d)&&(_0xd67b43=$dataArmors[_0x4aa3f3['id']]);}_0xd67b43&&_0x33a506[_0x466c68(0x23f)](_0xd67b43['iconIndex'],_0xd67b43['name'],_0x18fb5b);}},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x14d)]=function(_0x3de4a1,_0x2daf60){const _0x59211d=_0x297cc1;if(!_0x3de4a1)return;const _0x13508a=VisuMZ[_0x59211d(0x127)]['Settings'][_0x59211d(0x1a8)];if(!_0x13508a)return;if(!_0x13508a['EquipDebuff'])return;if(![_0x59211d(0x156),_0x59211d(0x20d)]['includes'](_0x2daf60[_0x59211d(0x162)]))return;let _0x16eb83=null;if(_0x2daf60[_0x59211d(0x162)]===_0x59211d(0x156))_0x16eb83=$dataWeapons[_0x2daf60['id']];else _0x2daf60['type']===_0x59211d(0x20d)&&(_0x16eb83=$dataArmors[_0x2daf60['id']]);if(!_0x16eb83)return;for(let _0x43499d=0x0;_0x43499d<0x8;_0x43499d++){const _0x209b32=_0x16eb83[_0x59211d(0x1c4)][_0x43499d];_0x3de4a1['addParam'](_0x43499d,-_0x209b32);}},Game_Action['prototype'][_0x297cc1(0x13c)]=function(_0x44d9c1,_0x16545c){const _0x4937dc=_0x297cc1;if(!_0x44d9c1)return;let _0x1c406e=null,_0x1e17da=0x0;if(_0x16545c[_0x4937dc(0x162)]===_0x4937dc(0x126))_0x1e17da=_0x16545c['id'];else{if(_0x16545c['type']===_0x4937dc(0x14a))_0x1c406e=$dataItems[_0x16545c['id']];else{if(_0x16545c[_0x4937dc(0x162)]===_0x4937dc(0x156))_0x1c406e=$dataWeapons[_0x16545c['id']];else _0x16545c[_0x4937dc(0x162)]===_0x4937dc(0x20d)&&(_0x1c406e=$dataArmors[_0x16545c['id']]);}}const _0x4f7aa3=VisuMZ['StealItems'][_0x4937dc(0x1fd)][_0x4937dc(0x1a8)];_0x4f7aa3&&_0x4f7aa3[_0x4937dc(0x12f)]&&_0x4f7aa3[_0x4937dc(0x12f)]['call'](this,this[_0x4937dc(0x232)](),_0x44d9c1,_0x1c406e,_0x1e17da);const _0x552e2b=VisuMZ[_0x4937dc(0x127)][_0x4937dc(0x1a4)](this[_0x4937dc(0x1be)](),_0x4937dc(0x12f));VisuMZ[_0x4937dc(0x127)]['JS'][_0x552e2b]&&VisuMZ[_0x4937dc(0x127)]['JS'][_0x552e2b]['call'](this,this['subject'](),_0x44d9c1,_0x1c406e,_0x1e17da);},Game_Action['prototype'][_0x297cc1(0x1b6)]=function(_0x14ab6d){const _0x4d394b=_0x297cc1;this[_0x4d394b(0x1d2)](_0x14ab6d),this[_0x4d394b(0x186)](),this[_0x4d394b(0x23e)](_0x14ab6d),this[_0x4d394b(0x213)](_0x14ab6d);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x1d2)]=function(_0x977ec0){const _0x1ba78f=_0x297cc1,_0x218795=VisuMZ[_0x1ba78f(0x127)][_0x1ba78f(0x1fd)][_0x1ba78f(0x154)];if(_0x218795[_0x1ba78f(0x17f)]){const _0x29ff96=_0x218795[_0x1ba78f(0x16a)],_0x4db515=SceneManager[_0x1ba78f(0x1a5)][_0x1ba78f(0x185)];if(_0x4db515&&_0x29ff96!=='')_0x4db515[_0x1ba78f(0x1e8)](_0x29ff96);}},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x186)]=function(){const _0x4b11bb=_0x297cc1,_0x1c8840=VisuMZ[_0x4b11bb(0x127)][_0x4b11bb(0x1fd)]['Sound'];if(!_0x1c8840)return;const _0xd9d22e=_0x4b11bb(0x135),_0x43deb8={'name':_0x1c8840['%1_name'[_0x4b11bb(0x15c)](_0xd9d22e)]||'','volume':_0x1c8840[_0x4b11bb(0x201)['format'](_0xd9d22e)]||0x0,'pitch':_0x1c8840['%1_pitch'[_0x4b11bb(0x15c)](_0xd9d22e)]||0x0,'pan':_0x1c8840[_0x4b11bb(0x23d)['format'](_0xd9d22e)]||0x0};if(_0x43deb8[_0x4b11bb(0x199)]!=='')AudioManager[_0x4b11bb(0x1bd)](_0x43deb8);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x23e)]=function(_0x3e302d){const _0x5273b2=_0x297cc1;if(!_0x3e302d)return;const _0x1a2acb=VisuMZ[_0x5273b2(0x127)]['Settings']['Popup'];if(!_0x1a2acb)return;if(_0x1a2acb[_0x5273b2(0x1ed)]==='')return;const _0x373a2e=_0x1a2acb['FailurePopupText'],_0xebb6e5={'textColor':_0x1a2acb[_0x5273b2(0x219)]||0x0,'flashColor':_0x1a2acb[_0x5273b2(0x1eb)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x1a2acb[_0x5273b2(0x1df)]||0x3c};_0x3e302d[_0x5273b2(0x222)](_0x373a2e,_0xebb6e5);},Game_Action[_0x297cc1(0x1b2)]['processStealItemsFailureJS']=function(_0x244841){const _0x2376d2=_0x297cc1;if(!_0x244841)return;const _0x389d08=VisuMZ[_0x2376d2(0x127)][_0x2376d2(0x1fd)][_0x2376d2(0x1a8)];_0x389d08&&_0x389d08[_0x2376d2(0x1ee)]&&_0x389d08[_0x2376d2(0x1ee)]['call'](this,this[_0x2376d2(0x232)](),_0x244841);const _0x2fb39f=VisuMZ[_0x2376d2(0x127)]['createKeyJS'](this[_0x2376d2(0x1be)](),_0x2376d2(0x1ee));VisuMZ[_0x2376d2(0x127)]['JS'][_0x2fb39f]&&VisuMZ['StealItems']['JS'][_0x2fb39f][_0x2376d2(0x1d6)](this,this['subject'](),_0x244841);},Game_Action[_0x297cc1(0x1b2)]['processStealItemsNothing']=function(_0x2455bf){const _0x7f985c=_0x297cc1;this[_0x7f985c(0x1d1)](_0x2455bf),this['processStealItemsNothingSFX'](),this['processStealItemsNothingPopup'](_0x2455bf),this[_0x7f985c(0x1cb)](_0x2455bf);},Game_Action['prototype'][_0x297cc1(0x1d1)]=function(_0x1b9af5){const _0x2db6b2=_0x297cc1,_0x5396a0=VisuMZ[_0x2db6b2(0x127)]['Settings']['BattleLog'];if(_0x5396a0[_0x2db6b2(0x17f)]){const _0x30fd28=_0x5396a0[_0x2db6b2(0x229)],_0x228b2b=SceneManager[_0x2db6b2(0x1a5)][_0x2db6b2(0x185)];if(_0x228b2b&&_0x30fd28!=='')_0x228b2b[_0x2db6b2(0x1e8)](_0x30fd28);}},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x22e)]=function(){const _0x57817d=_0x297cc1,_0x40bbde=VisuMZ[_0x57817d(0x127)][_0x57817d(0x1fd)][_0x57817d(0x1b9)];if(!_0x40bbde)return;const _0x3455ee=_0x57817d(0x177),_0x30ed75={'name':_0x40bbde[_0x57817d(0x1d4)[_0x57817d(0x15c)](_0x3455ee)]||'','volume':_0x40bbde[_0x57817d(0x201)[_0x57817d(0x15c)](_0x3455ee)]||0x0,'pitch':_0x40bbde['%1_pitch'[_0x57817d(0x15c)](_0x3455ee)]||0x0,'pan':_0x40bbde[_0x57817d(0x23d)[_0x57817d(0x15c)](_0x3455ee)]||0x0};if(_0x30ed75[_0x57817d(0x199)]!=='')AudioManager[_0x57817d(0x1bd)](_0x30ed75);},Game_Action[_0x297cc1(0x1b2)][_0x297cc1(0x17e)]=function(_0x54edcd){const _0x1e3e0f=_0x297cc1;if(!_0x54edcd)return;const _0x18c6cd=VisuMZ['StealItems'][_0x1e3e0f(0x1fd)]['Popup'];if(!_0x18c6cd)return;if(_0x18c6cd['FailurePopupText']==='')return;const _0x516b8c=_0x18c6cd[_0x1e3e0f(0x1c9)],_0xda129={'textColor':_0x18c6cd[_0x1e3e0f(0x143)]||0x0,'flashColor':_0x18c6cd[_0x1e3e0f(0x16e)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x18c6cd[_0x1e3e0f(0x231)]||0x3c};_0x54edcd[_0x1e3e0f(0x222)](_0x516b8c,_0xda129);},Game_Action['prototype'][_0x297cc1(0x1cb)]=function(_0x215aeb){const _0x529c04=_0x297cc1;if(!_0x215aeb)return;const _0x297850=VisuMZ[_0x529c04(0x127)][_0x529c04(0x1fd)]['Mechanics'];_0x297850&&_0x297850['JsOnStealEmpty']&&_0x297850[_0x529c04(0x166)]['call'](this,this[_0x529c04(0x232)](),_0x215aeb);const _0x540598=VisuMZ[_0x529c04(0x127)]['createKeyJS'](this['item'](),_0x529c04(0x17a));VisuMZ[_0x529c04(0x127)]['JS'][_0x540598]&&VisuMZ[_0x529c04(0x127)]['JS'][_0x540598][_0x529c04(0x1d6)](this,this['subject'](),_0x215aeb);},VisuMZ['StealItems']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x297cc1(0x1b2)][_0x297cc1(0x21a)],Game_BattlerBase[_0x297cc1(0x1b2)][_0x297cc1(0x21a)]=function(){const _0x534a73=_0x297cc1;this[_0x534a73(0x15a)]={},VisuMZ['StealItems'][_0x534a73(0x21c)]['call'](this);},Game_BattlerBase[_0x297cc1(0x1b2)][_0x297cc1(0x1f0)]=function(_0x48b162){const _0x14099f=_0x297cc1;return this['_cache']=this['_cache']||{},this[_0x14099f(0x15a)][_0x48b162]!==undefined;},Game_BattlerBase[_0x297cc1(0x1b2)][_0x297cc1(0x187)]=function(){const _0x144ae7=_0x297cc1;let _0x52505b=_0x144ae7(0x187);if(this[_0x144ae7(0x1f0)](_0x52505b))return this[_0x144ae7(0x15a)][_0x52505b];return this['_cache'][_0x52505b]=this[_0x144ae7(0x1e5)](),this[_0x144ae7(0x15a)][_0x52505b];},Game_BattlerBase['prototype'][_0x297cc1(0x1e5)]=function(){const _0x5da26b=_0x297cc1,_0x16b349=VisuMZ[_0x5da26b(0x127)][_0x5da26b(0x237)];let _0x977dfa=0x1;for(const _0x42a2bd of this[_0x5da26b(0x1dd)]()){if(!_0x42a2bd)continue;const _0x3d4f83=_0x42a2bd[_0x5da26b(0x234)];_0x3d4f83[_0x5da26b(0x19c)](_0x16b349[_0x5da26b(0x21d)])&&(_0x977dfa*=Number(RegExp['$1'])*0.01);}return Math[_0x5da26b(0x22a)](0x0,_0x977dfa);},Game_BattlerBase[_0x297cc1(0x1b2)][_0x297cc1(0x20a)]=function(){const _0x197eeb=_0x297cc1;let _0x1e74ab=_0x197eeb(0x20a);if(this[_0x197eeb(0x1f0)](_0x1e74ab))return this[_0x197eeb(0x15a)][_0x1e74ab];return this[_0x197eeb(0x15a)][_0x1e74ab]=this[_0x197eeb(0x163)](),this[_0x197eeb(0x15a)][_0x1e74ab];},Game_BattlerBase['prototype'][_0x297cc1(0x163)]=function(){const _0xe7d58f=_0x297cc1,_0x1beb05=VisuMZ[_0xe7d58f(0x127)][_0xe7d58f(0x237)];let _0x50b96e=0x0;const _0x5c66fc=VisuMZ[_0xe7d58f(0x127)][_0xe7d58f(0x1fd)][_0xe7d58f(0x1a8)];_0x5c66fc&&_0x5c66fc[_0xe7d58f(0x1af)]&&(_0x50b96e+=_0x5c66fc[_0xe7d58f(0x1af)][_0xe7d58f(0x1d6)](this));for(const _0x2487fb of this[_0xe7d58f(0x1dd)]()){if(!_0x2487fb)continue;const _0x1fe8a2=_0x2487fb[_0xe7d58f(0x234)];_0x1fe8a2['match'](_0x1beb05['StealPlus'])&&(_0x50b96e+=Number(RegExp['$1'])*0.01);}return _0x50b96e;},Game_BattlerBase[_0x297cc1(0x1b2)]['stealResist']=function(){const _0x28ccd0=_0x297cc1;let _0x4d8a02=_0x28ccd0(0x131);if(this[_0x28ccd0(0x1f0)](_0x4d8a02))return this['_cache'][_0x4d8a02];return this[_0x28ccd0(0x15a)][_0x4d8a02]=this[_0x28ccd0(0x1e4)](),this[_0x28ccd0(0x15a)][_0x4d8a02];},Game_BattlerBase['prototype']['createStealResist']=function(){const _0x4dcc02=_0x297cc1,_0x59bd95=VisuMZ[_0x4dcc02(0x127)][_0x4dcc02(0x237)];let _0x1d38f4=0x0;const _0x75239f=VisuMZ[_0x4dcc02(0x127)][_0x4dcc02(0x1fd)][_0x4dcc02(0x1a8)];_0x75239f&&_0x75239f[_0x4dcc02(0x145)]&&(_0x1d38f4+=_0x75239f[_0x4dcc02(0x145)]['call'](this));for(const _0x1a66ea of this['traitObjects']()){if(!_0x1a66ea)continue;const _0x5325d7=_0x1a66ea[_0x4dcc02(0x234)];_0x5325d7[_0x4dcc02(0x19c)](_0x59bd95['StealResist'])&&(_0x1d38f4+=Number(RegExp['$1'])*0.01);}return _0x1d38f4;},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x18b)]=Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x202)],Game_Enemy[_0x297cc1(0x1b2)]['setup']=function(_0x208a71,_0x856c02,_0xbdf4ed){const _0x4141fc=_0x297cc1;VisuMZ[_0x4141fc(0x127)][_0x4141fc(0x18b)][_0x4141fc(0x1d6)](this,_0x208a71,_0x856c02,_0xbdf4ed),!Imported[_0x4141fc(0x1f4)]&&this[_0x4141fc(0x165)]();},VisuMZ['StealItems'][_0x297cc1(0x23a)]=Game_Enemy['prototype']['setupEnemyLevels'],Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x1ae)]=function(){const _0xe1ba16=_0x297cc1;VisuMZ[_0xe1ba16(0x127)][_0xe1ba16(0x23a)][_0xe1ba16(0x1d6)](this),this['setupStealableItems']();},Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x210)]=function(){const _0x4537cd=_0x297cc1;if(this[_0x4537cd(0x1a0)]===undefined)this['setupStealableItems']();return this[_0x4537cd(0x1a0)];},Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x165)]=function(){const _0x5d6454=_0x297cc1,_0xa5c7db=this['enemy']();if(!_0xa5c7db)return;this[_0x5d6454(0x1a0)]=VisuMZ['StealItems'][_0x5d6454(0x1f3)](this,_0xa5c7db);},VisuMZ[_0x297cc1(0x127)]['StealData']={},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1f3)]=function(_0x3534cb,_0x2dcd28){const _0x5b09a9=_0x297cc1;if(!_0x2dcd28)return[];if(VisuMZ['StealItems'][_0x5b09a9(0x1c6)][_0x2dcd28['id']])return JsonEx[_0x5b09a9(0x1d5)](VisuMZ['StealItems'][_0x5b09a9(0x1c6)][_0x2dcd28['id']]);VisuMZ[_0x5b09a9(0x127)][_0x5b09a9(0x1c6)][_0x2dcd28['id']]=[];const _0x5b6920=VisuMZ[_0x5b09a9(0x127)][_0x5b09a9(0x1fd)][_0x5b09a9(0x134)],_0x560e8c=VisuMZ[_0x5b09a9(0x127)]['RegExp'],_0x4f5795=_0x2dcd28[_0x5b09a9(0x234)];if(_0x5b6920[_0x5b09a9(0x1d7)]&&_0x2dcd28[_0x5b09a9(0x1ad)]>0x0){const _0xb79c23={'type':'GOLD','id':_0x2dcd28[_0x5b09a9(0x1ad)],'rate':_0x5b6920[_0x5b09a9(0x1e7)],'stolen':![],'drop':!![]};VisuMZ['StealItems'][_0x5b09a9(0x1c6)][_0x2dcd28['id']][_0x5b09a9(0x12c)](_0xb79c23);}if(_0x5b6920['AutoItem']){const _0x2eaa06=_0x2dcd28['dropItems'];for(const _0x41c838 of _0x2eaa06){if(_0x41c838){const _0xec4ae9={'type':'none','id':_0x41c838[_0x5b09a9(0x16c)],'rate':0x1/Math[_0x5b09a9(0x22a)](0x1,_0x41c838[_0x5b09a9(0x23b)])*_0x5b6920[_0x5b09a9(0x1e1)],'stolen':![],'drop':!![],'dropIndex':_0x2eaa06['indexOf'](_0x41c838)};_0xec4ae9['type']=['none','ITEM',_0x5b09a9(0x156),'ARMOR'][_0x41c838[_0x5b09a9(0x18f)]];if(_0xec4ae9['type']===_0x5b09a9(0x1da))continue;VisuMZ['StealItems'][_0x5b09a9(0x1c6)][_0x2dcd28['id']][_0x5b09a9(0x12c)](_0xec4ae9);}}}const _0x470a62=_0x4f5795['match'](_0x560e8c[_0x5b09a9(0x191)]);if(_0x470a62)for(const _0xe089e1 of _0x470a62){if(!_0xe089e1)continue;_0xe089e1['match'](_0x560e8c[_0x5b09a9(0x191)]);const _0x196049=String(RegExp['$1'])['trim'](),_0x5781b6=Number(RegExp['$2'])*0.01,_0x7653af=VisuMZ['StealItems'][_0x5b09a9(0x205)](_0x196049,_0x5781b6);if(!!_0x7653af)VisuMZ[_0x5b09a9(0x127)][_0x5b09a9(0x1c6)][_0x2dcd28['id']][_0x5b09a9(0x12c)](_0x7653af);}if(_0x4f5795['match'](_0x560e8c[_0x5b09a9(0x1ef)])){const _0x265643=String(RegExp['$1'])[_0x5b09a9(0x1e2)](/[\r\n]+/);for(const _0x3eca24 of _0x265643){if(_0x3eca24[_0x5b09a9(0x19c)](/(.*):[ ](.*)([%％])/i)){const _0x5ad3c0=String(RegExp['$1'])[_0x5b09a9(0x181)](),_0x541fd3=Number(RegExp['$2'])*0.01,_0x46db1e=VisuMZ[_0x5b09a9(0x127)]['ParseStealObject'](_0x5ad3c0,_0x541fd3);if(!!_0x46db1e)VisuMZ['StealItems']['StealData'][_0x2dcd28['id']]['push'](_0x46db1e);}}}return JsonEx[_0x5b09a9(0x1d5)](VisuMZ['StealItems'][_0x5b09a9(0x1c6)][_0x2dcd28['id']]);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x205)]=function(_0x464e9e,_0x321c77){const _0x4667af=_0x297cc1,_0x305088={'type':_0x4667af(0x1da),'id':0x0,'rate':_0x321c77,'stolen':![],'drop':![]};_0x464e9e[_0x4667af(0x19c)](/GOLD[ ](\d+)/i)&&(_0x305088[_0x4667af(0x162)]=_0x4667af(0x126),_0x305088['id']=Number(RegExp['$1']));if(_0x464e9e[_0x4667af(0x19c)](/ITEM[ ](\d+)/i))_0x305088[_0x4667af(0x162)]=_0x4667af(0x14a),_0x305088['id']=Number(RegExp['$1']);else _0x464e9e[_0x4667af(0x19c)](/ITEM[ ](.*)/i)&&(_0x305088[_0x4667af(0x162)]=_0x4667af(0x14a),_0x305088['id']=DataManager['getItemIdWithName'](RegExp['$1']));if(_0x464e9e['match'](/WEAPON[ ](\d+)/i))_0x305088['type']=_0x4667af(0x156),_0x305088['id']=Number(RegExp['$1']);else _0x464e9e[_0x4667af(0x19c)](/WEAPON[ ](.*)/i)&&(_0x305088[_0x4667af(0x162)]=_0x4667af(0x156),_0x305088['id']=DataManager[_0x4667af(0x1fb)](RegExp['$1']));if(_0x464e9e[_0x4667af(0x19c)](/ARMOR[ ](\d+)/i))_0x305088[_0x4667af(0x162)]='ARMOR',_0x305088['id']=Number(RegExp['$1']);else _0x464e9e[_0x4667af(0x19c)](/ARMOR[ ](.*)/i)&&(_0x305088[_0x4667af(0x162)]=_0x4667af(0x20d),_0x305088['id']=DataManager[_0x4667af(0x224)](RegExp['$1']));return _0x305088;},VisuMZ['StealItems']['Game_Enemy_gold']=Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x1ad)],Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x1ad)]=function(){const _0x2580b8=_0x297cc1,_0x517ed7=VisuMZ[_0x2580b8(0x127)]['Settings'][_0x2580b8(0x134)];if(_0x517ed7[_0x2580b8(0x1d7)]&&_0x517ed7[_0x2580b8(0x174)]){const _0x34a0f4=this['getStealableItems']();for(const _0x5929ef of _0x34a0f4){if(!_0x5929ef)continue;if(_0x5929ef[_0x2580b8(0x17c)]&&_0x5929ef[_0x2580b8(0x162)]===_0x2580b8(0x126)){if(_0x5929ef[_0x2580b8(0x18a)])return 0x0;}}}return VisuMZ[_0x2580b8(0x127)][_0x2580b8(0x1e9)][_0x2580b8(0x1d6)](this);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1ac)]=Game_Enemy[_0x297cc1(0x1b2)]['makeDropItems'],Game_Enemy[_0x297cc1(0x1b2)][_0x297cc1(0x13f)]=function(){const _0x5b41c1=_0x297cc1,_0x5a38f9=JsonEx[_0x5b41c1(0x1d5)](this[_0x5b41c1(0x21e)]()[_0x5b41c1(0x216)]),_0x56bb0f=VisuMZ[_0x5b41c1(0x127)][_0x5b41c1(0x1fd)][_0x5b41c1(0x134)];if(_0x56bb0f[_0x5b41c1(0x1cf)]&&_0x56bb0f[_0x5b41c1(0x173)]){const _0x2b036e=this[_0x5b41c1(0x210)]();for(const _0x36298c of _0x2b036e){if(!_0x36298c)continue;if(_0x36298c[_0x5b41c1(0x17c)]&&_0x36298c['type']!==_0x5b41c1(0x126)){if(!_0x36298c[_0x5b41c1(0x18a)])continue;const _0x27ad11=_0x36298c['dropIndex'],_0x59bcf9=this[_0x5b41c1(0x21e)]()[_0x5b41c1(0x216)][_0x27ad11];_0x59bcf9[_0x5b41c1(0x18f)]=0x0;}}}let _0x58b1a6=VisuMZ[_0x5b41c1(0x127)]['Game_Enemy_makeDropItems'][_0x5b41c1(0x1d6)](this);return this[_0x5b41c1(0x21e)]()[_0x5b41c1(0x216)]=_0x5a38f9,_0x58b1a6;},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x1c7)]=Scene_Battle['prototype']['createEnemyWindow'],Scene_Battle[_0x297cc1(0x1b2)][_0x297cc1(0x1bf)]=function(){const _0x52252e=_0x297cc1;VisuMZ[_0x52252e(0x127)]['Scene_Battle_createEnemyWindow'][_0x52252e(0x1d6)](this),this[_0x52252e(0x1a3)]();},Scene_Battle['prototype'][_0x297cc1(0x1a3)]=function(){const _0xdc6be4=_0x297cc1,_0x34a0f6=this[_0xdc6be4(0x15e)]();this['_stealSnatchWindow']=new Window_StealSnatch(_0x34a0f6),this[_0xdc6be4(0x1f9)]['setHelpWindow'](this['_helpWindow']),this[_0xdc6be4(0x1f9)]['setHandler']('ok',this[_0xdc6be4(0x13d)][_0xdc6be4(0x22d)](this)),this[_0xdc6be4(0x1f9)][_0xdc6be4(0x19b)](_0xdc6be4(0x208),this[_0xdc6be4(0x1f5)][_0xdc6be4(0x22d)](this)),this[_0xdc6be4(0x139)](this[_0xdc6be4(0x1f9)]);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x200)]=Scene_Battle[_0x297cc1(0x1b2)]['isAnyInputWindowActive'],Scene_Battle[_0x297cc1(0x1b2)]['isAnyInputWindowActive']=function(){const _0xb92887=_0x297cc1;if(this[_0xb92887(0x1f9)]&&this['_stealSnatchWindow'][_0xb92887(0x204)])return!![];return VisuMZ['StealItems'][_0xb92887(0x200)][_0xb92887(0x1d6)](this);},VisuMZ[_0x297cc1(0x127)][_0x297cc1(0x167)]=Scene_Battle[_0x297cc1(0x1b2)][_0x297cc1(0x1b8)],Scene_Battle[_0x297cc1(0x1b2)]['hideSubInputWindows']=function(){const _0x485786=_0x297cc1;VisuMZ[_0x485786(0x127)]['Scene_Battle_hideSubInputWindows'][_0x485786(0x1d6)](this),this[_0x485786(0x1f9)]&&(this[_0x485786(0x1f9)][_0x485786(0x178)](),this[_0x485786(0x1f9)][_0x485786(0x14c)]());},VisuMZ[_0x297cc1(0x127)]['Scene_Battle_onEnemyOk']=Scene_Battle[_0x297cc1(0x1b2)][_0x297cc1(0x1ff)],Scene_Battle[_0x297cc1(0x1b2)]['onEnemyOk']=function(){const _0xfdc3b1=_0x297cc1,_0x174d29=BattleManager['inputtingAction']();this[_0xfdc3b1(0x1f9)]&&_0x174d29[_0xfdc3b1(0x1c2)]()?this[_0xfdc3b1(0x180)]():VisuMZ[_0xfdc3b1(0x127)][_0xfdc3b1(0x169)][_0xfdc3b1(0x1d6)](this);},Scene_Battle[_0x297cc1(0x1b2)][_0x297cc1(0x180)]=function(){const _0x3d7012=_0x297cc1,_0x502dd9=$gameTroop['members']()[this[_0x3d7012(0x158)][_0x3d7012(0x157)]()],_0x4fd55f=BattleManager[_0x3d7012(0x1ba)]();this[_0x3d7012(0x1f9)]['setDetails'](_0x502dd9,_0x4fd55f),this['_stealSnatchWindow'][_0x3d7012(0x21a)](),this[_0x3d7012(0x1f9)]['show'](),this[_0x3d7012(0x1f9)][_0x3d7012(0x198)]();},Scene_Battle['prototype'][_0x297cc1(0x13d)]=function(){const _0x4d4888=_0x297cc1,_0x1a0e80=BattleManager[_0x4d4888(0x1ba)](),_0x1925f8=$gameTroop[_0x4d4888(0x1ec)]()[this[_0x4d4888(0x158)][_0x4d4888(0x157)]()],_0x17f6e2=this[_0x4d4888(0x1f9)][_0x4d4888(0x1be)]();_0x1a0e80[_0x4d4888(0x140)](_0x1925f8,_0x17f6e2),VisuMZ['StealItems']['Scene_Battle_onEnemyOk'][_0x4d4888(0x1d6)](this);},Scene_Battle[_0x297cc1(0x1b2)][_0x297cc1(0x1f5)]=function(){const _0x3e9776=_0x297cc1;this[_0x3e9776(0x1f9)][_0x3e9776(0x14c)](),this[_0x3e9776(0x1f9)]['deactivate'](),this[_0x3e9776(0x158)][_0x3e9776(0x1a6)](),this['_enemyWindow'][_0x3e9776(0x198)](),Imported[_0x3e9776(0x236)]&&this[_0x3e9776(0x158)][_0x3e9776(0x182)]();},Window_BattleLog[_0x297cc1(0x1b2)][_0x297cc1(0x1e8)]=function(_0x251923){const _0x49982f=_0x297cc1;this['_lines'][_0x49982f(0x12c)](_0x251923),this[_0x49982f(0x21a)]();};function Window_StealSnatch(){this['initialize'](...arguments);}Window_StealSnatch[_0x297cc1(0x1b2)]=Object[_0x297cc1(0x209)](Window_ItemList['prototype']),Window_StealSnatch['prototype'][_0x297cc1(0x184)]=Window_StealSnatch,Window_StealSnatch[_0x297cc1(0x1b2)][_0x297cc1(0x152)]=function(_0x3eac51){const _0x520b52=_0x297cc1;Window_ItemList[_0x520b52(0x1b2)][_0x520b52(0x152)][_0x520b52(0x1d6)](this,_0x3eac51),this[_0x520b52(0x14c)](),this[_0x520b52(0x13a)]=null,this['_action']=null;},Window_StealSnatch['prototype']['setDetails']=function(_0x38b5e6,_0x253ca6){const _0x3dda7d=_0x297cc1;this[_0x3dda7d(0x13a)]=_0x38b5e6,this[_0x3dda7d(0x144)]=_0x253ca6,this[_0x3dda7d(0x21a)](),this[_0x3dda7d(0x1a6)](),this['forceSelect'](0x0);},Window_StealSnatch['prototype']['makeItemList']=function(){const _0x5f31ce=_0x297cc1;this[_0x5f31ce(0x15b)]=[];if(!this[_0x5f31ce(0x13a)])return;const _0x147082=VisuMZ[_0x5f31ce(0x127)][_0x5f31ce(0x235)](this[_0x5f31ce(0x144)],this[_0x5f31ce(0x13a)]);if(_0x147082['types']['length']<=0x0)return;this[_0x5f31ce(0x15b)]=this[_0x5f31ce(0x13a)][_0x5f31ce(0x210)]()[_0x5f31ce(0x14e)](_0x4aa73a=>{const _0x3bdc54=_0x5f31ce;return _0x147082[_0x3bdc54(0x1d8)][_0x3bdc54(0x1a9)](_0x4aa73a[_0x3bdc54(0x162)]);}),Imported[_0x5f31ce(0x12b)]&&this[_0x5f31ce(0x176)]();},Window_StealSnatch[_0x297cc1(0x1b2)][_0x297cc1(0x161)]=function(_0x6b3ef5){const _0x4cf961=_0x297cc1;return _0x6b3ef5&&!_0x6b3ef5[_0x4cf961(0x18a)];},Window_StealSnatch[_0x297cc1(0x1b2)][_0x297cc1(0x23c)]=function(){const _0x4ffb0e=_0x297cc1;if(this[_0x4ffb0e(0x221)])return this[_0x4ffb0e(0x221)];return this[_0x4ffb0e(0x221)]=this[_0x4ffb0e(0x239)](_0x4ffb0e(0x1d9)),this[_0x4ffb0e(0x221)]=Math[_0x4ffb0e(0x22a)](this[_0x4ffb0e(0x221)],this[_0x4ffb0e(0x142)](TextManager['snatchAlreadyStolen'])[_0x4ffb0e(0x211)]),this[_0x4ffb0e(0x221)];},Window_StealSnatch['prototype'][_0x297cc1(0x19f)]=function(_0x3dcbd4,_0x130e3f,_0x1b1b4f,_0x520d56){const _0x19af63=_0x297cc1;if(!_0x3dcbd4)return;switch(_0x3dcbd4[_0x19af63(0x162)]['toUpperCase']()[_0x19af63(0x181)]()){case'GOLD':const _0x13b555=TextManager[_0x19af63(0x125)][_0x19af63(0x15c)](_0x19af63(0x1c3)[_0x19af63(0x15c)](ImageManager[_0x19af63(0x1e3)]),_0x3dcbd4['id'],TextManager[_0x19af63(0x1b5)]);this[_0x19af63(0x1b1)](_0x13b555,_0x130e3f,_0x1b1b4f);break;case _0x19af63(0x14a):Window_Base[_0x19af63(0x1b2)][_0x19af63(0x19f)][_0x19af63(0x1d6)](this,$dataItems[_0x3dcbd4['id']],_0x130e3f,_0x1b1b4f,_0x520d56);break;case _0x19af63(0x156):Window_Base[_0x19af63(0x1b2)][_0x19af63(0x19f)][_0x19af63(0x1d6)](this,$dataWeapons[_0x3dcbd4['id']],_0x130e3f,_0x1b1b4f,_0x520d56);break;case'ARMOR':Window_Base[_0x19af63(0x1b2)]['drawItemName'][_0x19af63(0x1d6)](this,$dataArmors[_0x3dcbd4['id']],_0x130e3f,_0x1b1b4f,_0x520d56);break;}},Window_StealSnatch[_0x297cc1(0x1b2)][_0x297cc1(0x150)]=function(_0x5ccccd,_0x27e87f,_0x5c41c3,_0xa6e5b1){const _0xf45486=_0x297cc1;if(_0x5ccccd[_0xf45486(0x18a)]){const _0x4dadbc=TextManager[_0xf45486(0x233)];_0x27e87f+=_0xa6e5b1-this['textSizeEx'](_0x4dadbc)[_0xf45486(0x211)],this['drawTextEx'](_0x4dadbc,_0x27e87f,_0x5c41c3);}else{if(VisuMZ[_0xf45486(0x127)]['Settings'][_0xf45486(0x226)][_0xf45486(0x151)]){const _0x28b4e3=VisuMZ[_0xf45486(0x127)][_0xf45486(0x235)](this[_0xf45486(0x144)],this[_0xf45486(0x13a)]);let _0xedce38=_0x28b4e3[_0xf45486(0x183)][_0xf45486(0x225)]*_0x5ccccd[_0xf45486(0x183)],_0x1da816=_0x28b4e3['plus'][_0xf45486(0x225)];_0xedce38*=_0x28b4e3[_0xf45486(0x183)][_0x5ccccd[_0xf45486(0x162)]['toLowerCase']()],_0x1da816+=_0x28b4e3[_0xf45486(0x21f)][_0x5ccccd['type'][_0xf45486(0x15f)]()];let _0x19fda9=(_0xedce38+_0x1da816)[_0xf45486(0x1a7)](0x0,0x1)*0x64;_0x19fda9>0x0&&_0x19fda9<0x64&&(_0x19fda9=_0x19fda9['toFixed'](0x2)),_0x19fda9=String(_0x19fda9)+'%',_0x27e87f+=_0xa6e5b1-this['textSizeEx'](_0x19fda9)[_0xf45486(0x211)],this[_0xf45486(0x1b1)](_0x19fda9,_0x27e87f,_0x5c41c3);}}},Window_StealSnatch[_0x297cc1(0x1b2)][_0x297cc1(0x1d3)]=function(_0x1e9c83){const _0x570c52=_0x297cc1;if(this[_0x570c52(0x1c0)]&&_0x1e9c83)switch(_0x1e9c83[_0x570c52(0x162)]['toUpperCase']()['trim']()){case _0x570c52(0x126):this[_0x570c52(0x1c0)][_0x570c52(0x1bc)](TextManager[_0x570c52(0x1ea)]);break;case _0x570c52(0x14a):this[_0x570c52(0x1c0)][_0x570c52(0x17d)]($dataItems[_0x1e9c83['id']]);break;case _0x570c52(0x156):this[_0x570c52(0x1c0)]['setItem']($dataWeapons[_0x1e9c83['id']]);break;case _0x570c52(0x20d):this[_0x570c52(0x1c0)][_0x570c52(0x17d)]($dataArmors[_0x1e9c83['id']]);break;}};