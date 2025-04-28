//=============================================================================
// VisuStella MZ - Battle System - BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
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
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
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
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
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
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
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
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
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
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
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
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.18: April 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where flex fusion combinations did not work properly and
 *    where the strict fusion combinations would draw from flex fusions. Fix
 *    made by Olivia.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where for certain battle layouts, the BTB Action Counter on
 *    the actor command window would start off center. Fix made by Olivia.
 * 
 * Version 1.16: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where strict action fusion combinations would not register.
 *    Fix made by Olivia.
 * 
 * Version 1.15: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where action fusions would consume double the amount of items
 *    if the skills were to cost items. Fix made by Olivia.
 * 
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
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
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
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
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
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
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
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
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
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
 * @option left
 * @option right
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
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
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
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
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
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
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
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
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
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
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
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
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
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x20875d=_0x1af5;(function(_0x4ff33b,_0xd358f1){const _0x51c9e6=_0x1af5,_0x8a9335=_0x4ff33b();while(!![]){try{const _0x3637f4=-parseInt(_0x51c9e6(0x15b))/0x1*(-parseInt(_0x51c9e6(0xfd))/0x2)+parseInt(_0x51c9e6(0x1ab))/0x3+-parseInt(_0x51c9e6(0x2d2))/0x4*(parseInt(_0x51c9e6(0x33e))/0x5)+-parseInt(_0x51c9e6(0x263))/0x6*(-parseInt(_0x51c9e6(0x13d))/0x7)+-parseInt(_0x51c9e6(0x270))/0x8+-parseInt(_0x51c9e6(0x139))/0x9+parseInt(_0x51c9e6(0x236))/0xa;if(_0x3637f4===_0xd358f1)break;else _0x8a9335['push'](_0x8a9335['shift']());}catch(_0x41823d){_0x8a9335['push'](_0x8a9335['shift']());}}}(_0xfa0f,0xb22fc));function _0xfa0f(){const _0x318289=['visible','useItem','7337150uHvujK','setAttack','_containerHeight','BTB_MIN_BRAVEPOINTS_DEFAULT','_scrollX','updateSelectionEffect','Game_System_initialize','modifyBTBActionCounterSprite_Fallback','match','regenerateBravePoints','ConvertParams','isValid','canUse','_isAlive','canProcessActionFusionsBTB','Enemies','Enemy-%1-%2','%1Mute','_ogWindowLayerX','_backgroundSprite','BattleManager_makeActionOrders','ActorBattlerType','_containerWidth','addCommand','_guardUnleash','isAlive','BravePointRegenBase','cancel','_fadeDuration','createBattlerSprites','OrderDirection','create','addChildAt','BravePointsRegenAlive','canActionFusionWithBTB','bind','ItemQuantityFmt','TurnOrder','process_VisuMZ_BattleSystemBTB_Notetags','floor','BTB','UpdateFrames','Game_Unit_makeActions','cancelBrave','BattleManager_isTpb','12DNmBNA','createKeyJS','iconHeight','_graphicSv','Window_Selectable_cursorPageup','btbBravePointsAbbr','getAlignmentBTB','btbActionSlot','_items','Game_BattlerBase_canGuard','drawItemNumberBTB','Game_BattlerBase_canInput','_btbTurnOrderFaceIndex','7866560GnPGKv','boxWidth','_graphicSprite','createGraphicSprite','attackSkillId','BattleManager_startAction','registerCommand','hideBraveTrait','Show_0_BP_Cost','Window','addInnerChild','_skillIDs','Window_BattleStatus_drawItemStatusListStyle','description','_targetHomeX','Game_Enemy_makeActions','MaxHorzSprites','VisuMZ_1_ItemsEquipsCore','getChildIndex','onTurnEndBTB','IconSet','cursorPagedown','brave','createChildren','EnemyBattlerIcon','makeActionTimes','fontFace','predictedBravePointCost','Game_Battler_onBattleStart','_graphicEnemy','battler','_actionFusionRecipe','_bypassAiValidCheck','modifyBTBActionCounterSprite','clear','EnemyBattlerFontSize','needsSelection','processUpdateGraphic','formFlexCombo','guard','applyBattleSystemBTBUserEffect','loadFace','_turnOrderContainer','makeDeepCopy','close','Window_ActorCommand_makeCommandList','_fullHeight','isActor','waitForAnimation','ItemsEquipsCore','useItemBTB','_positionDuration','State-%1-%2','changeEnemyGraphicBitmap','setText','TurnOrderBTBGraphicFaceIndex','remove','Game_Battler_useItem','mainSprite','recalculateHome','drawItemStatusListStyle','Enemy','toUpperCase','isForFriend','Game_BattlerBase_hide','status','getColor','changeSvActorGraphicBitmap','VisuMZ_1_SkillsStatesCore','updateHomePosition','text','JsBravePointsUser','faceWidth','getOffsetX_BTB','%1_display','opacity','BattleManager_startTurn','BraveAnimationID','RegExp','length','%1_offsetY','applyBattleItemWindowBTB','EnemyBattlerType','gainBravePoints','STRUCT','enemy','allowRandomSpeed','ShowMarkerBorder','test','makeActionOrders','Game_BattlerBase_appear','setHandler','SpriteThin','RepositionTopHelpY','iconWidth','Window_Base_close','showBravePoints','DisplayPosition','12424RfYlCD','makeCommandList','_statusWindow','queueBraveAnimationsBTB','clearTurnOrderBTBGraphics','canAddBraveCommand','NUM','BraveShortcuts','CostPosition','_isBattleOver','_positionTargetX','calculateTargetPositions','btbPaySkillFusionCosts','height','_graphicHue','optDisplayTp','CenterHorz','face','note','btbBravePointsFull','_ogWindowLayerY','loadSystem','icon','EnemyActionFusions','updateTurnOrder','addLoadListener','createBattlerRect','update','Window_Base_makeAdditionalSkillCostText','appear','EnemyBattlerFaceIndex','btbCostFormat','setSkill','ShowCostForAttack','updateBattleContainerOrder','faceHeight','center','isActiveTpb','initialize','initMembers','battlerHue','isSideView','inputtingAction','ARRAYSTR','Window_ActorCommand_addGuardCommand','canPayActionFusionCombination','_logWindow','_actorCommandWindow','BravePointSkillCost','Window_Base_drawItemNumber','exit','clearActions','CannotBrave','sort','_btbActionSprite','BtbTurnOrderClearEnemyGraphic','format','%1SystemBg','Class-%1-%2','changeIconGraphicBitmap','_scrollY','ParseItemNotetags','selectNextCommand','BTB_MAX_BRAVEPOINTS_HARD_CAP','itemRectPortraitBTB','BtbTurnOrderEnemyFace','onDatabaseLoaded','skillCostSeparator','FaceIndex','minBravePoints','BTB_MAX_ACTIONS_HARD_CAP','getOffsetY_BTB','parse','EnemyBattlerFaceName','_btbTurnOrderGraphicType','_armors','indexOf','HideBrave','_phase','makeActions','VisuMZ_0_CoreEngine','initHomePositions','reduceBrave','BravePointRegen','splice','top','%1BgColor1','itemLineRect','removeActionFusionIngredients','Mechanics','textSizeEx','ScreenBuffer','createBTBTurnOrderWindow','Scene_Battle_onDisabledPartyCommandSelection','width','btbRegisterFusions','isItem','cannotBraveTrait','_btbTurnOrderIconIndex','_targetIndex','SubjectDistance','predictedBravePoints','_graphicIconIndex','EnemyBattlerFontFace','PositiveColor','refresh','BravePointAlterTarget','NegativeColor','1790VAkpcK','TurnOrderBTBGraphicType','_unit','JsBravePointsTarget','version','checkActionsBTB','FusionFlex','_btbTurnOrderVisible','traitObjects','ShowMarkerBg','_letterSprite','substring','drawActorBravePoints','fontSize','loadSvActor','RepositionTopHelpX','processActionFusionsBTB','trim','General','_graphicFaceName','_homeX','drawText','Game_Party_removeActor','updateGraphicHue','BattleManager_isTurnBased','ItemScene','BravePointSetUser','EVAL','_subject','createAllWindows','_actionBattlers','commandCancelBTB','2LrLKhD','SystemTurnOrderVisibility','padding','Game_Battler_performCollapse','BattleCore','Game_Battler_makeActionTimes','commandBrave','STR','numActions','TurnOrderBTBGraphicFaceName','constructor','_btbTurnOrderFaceName','attack','Actor-%1-%2','clearRect','setActionFusionBTB','\x5cI[%1]%2','StatusPredictFmt','showBraveAnimationBTB','getStrictActionFusionCombinationsBTB','_btbTurnOrderWindow','_btbSkillStrictFusion','CancelAnimationID','right','onBattleStartBTB','updateVisibility','min','updateOpacity','drawItemNumber','createBackgroundSprite','maxBraveActions','BravePointPredictedCost','isBattleSystemBTBTurnOrderVisible','children','BravePointStartNeutral','repositionLogWindowBTB','requestFauxAnimation','Game_Action_setSkill','repeat','Parse_Notetags_BravePointsUserJS','containerWindow','performBrave','_blendColor','subject','isHorz','onBattleStart','textWidth','RepositionLogWindow','actor','includes','RepositionTopForHelp','BravePointCost','join','BattleManager_startInput','waitCount','contents','createInitialPositions','Game_Action_isValid','updatePadding','_targetHomeY','6930855stuPeI','DrawActionCountersJS','MaxVertSprites','FusionStrict','3874976wpPkGm','isBattleItemWindowBTB','battlerName','initBattleSystemBTB','split','MinBravePoints','createTurnOrderBTBGraphicFaceIndex','formAllPossibleFlexCombos','battleSys','_plural','FaceName','isEnemy','Game_Action_allowRandomSpeed','_surprise','allBattleMembers','item','MaxBravePointsDefault','setBTBGraphicIconIndex','calcRegenBravePoints','select','BTB_Help','_weapons','Scene_Battle_createActorCommandWindow','loseBravePoints','IconIndex','bitmapWidth','\x5cI[%1]','battleLayoutStyle','BattleManager_battleSys','bravePointsCost','1097990ILsOLp','_graphicFaceIndex','push','hasSvBattler','blt','BTB_MAX_BRAVEPOINTS_DEFAULT','CannotFusion','createBTBActionCounters','isBTB','isTurnBased','max','_letter','maxBravePoints','applyItemBattleSystemBTBUserEffect','Window_Help_setItem','%1SystemBorder','bottom','NeutralColor','applyItemUserEffect','Scene_Boot_onDatabaseLoaded','Window_Selectable_select','updateGraphic','createActorCommandWindow','removeActionBattlersBTB','_homeDuration','Window_Selectable_cursorPagedown','name','%1_offsetX','process_VisuMZ_BattleSystemBTB_JS','boxHeight','refreshStatusBTB','isTpb','createTurnOrderBTBGraphicFaceName','btbBraveCommand','VisuMZ_1_BattleCore','pop','updateLetter','currentAction','bravePoints','btbMatchesCurrentFusionAction','setup','setGuard','btbPayItemFusionCosts','destroyBTBActionCounters','currentExt','containerPosition','ActorActionFusions','ShowFacesListStyle','_itemIDs','getSkillIdWithName','process_VisuMZ_BattleSystemBTB','braveAnimationTimes','Game_Actor_makeActions','%1-%2','_homeY','startAction','Actor','startInput','EnemyMultiAction','MinBravePointsHardCap','isDrawItemNumber','requestRefresh','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','getActionFusionRecipeItems','%1BorderColor','updateSidePosition','return\x200','loadEnemy','Item-%1-%2','anchor','BTB_MAX_ACTIONS_DEFAULT','startTurn','setBattleSystemBTBTurnOrderVisible','BTB_MIN_BRAVEPOINTS_HARD_CAP','cursorPageup','getBattleSystem','SpriteLength','Window_ActorCommand_setup','isSkipPartyCommandWindow','JSON','1969122vnRUKm','ActorBattlerIcon','startFade','guardSkillId','_fullWidth','members','_actions','faceIndex','index','faceName','StatusDisplayFmt','_turnOrderInnerSprite','BravePointsFull','isSkill','btbActionCurrent','_btbSkillFlexFusion','isAppeared','Armor-%1-%2','_isAppeared','svactor','BravePointsAbbr','sortActionOrdersBTB','%1Mirror','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_Action_applyItemUserEffect','_btbItemFlexFusion','_index','canBrave','payBravePointsCost','canInput','makeAdditionalSkillCostText','prototype','BraveAnimation','_bravePoints','btbBravePointsIcon','_helpWindow','_graphicType','maxBattleMembers','getStateTooltipBattler','canGuard','CalcActionSpeedJS','Actors','getFlexActionFusionCombinationsBTB','AllowRandomSpeed','showNormalAnimation','getTotalActionFusionRecipes','checkTargetPositions','updatePosition','bitmap','_positionTargetY','svActorHorzCells','makeMultiActionsBTB','HideBravePointCost','_actionInputIndex','MinBravePointsDefault','BravePointAlterUser','drawItemStatusXPStyle','speed','call','updateTurnOrderBTB','\x5cC[%1]%2\x5cC[0]','ShowEnemyBrave','_fadeTarget','svBattlerName','getItemIdWithName','_btbItemStrictFusion','Game_Action_speed','ParseAllNotetags','bitmapHeight','setItem','createTurnOrderBTBGraphicType','removeActor','startActionBTB','inBattle','parameters','%1BgColor2','Settings','ARRAYNUM','BravePointStartFavor','ShowCostForGuard','createLetterSprite','BattleManager_isActiveTpb','BravePointSetTarget','Game_Action_setItem','getActionFusionRecipeSkills','active','DisplayOffsetY','changeFaceGraphicBitmap','_scene','BattleSystemBTB','createTurnOrderBTBGraphicIconIndex','resetFontSettings','hide','addChild','ParseSkillNotetags','checkOpacity','performCollapse','TurnOrderBTBGraphicIconIndex','_braveStartupAnimation','ceil','Game_Battler_onTurnEnd','FUNC','BtbTurnOrderActorFace','defaultPosition','round','Window_BattleLog_startAction','makeSpeed','fillRect','commandStyle','clamp','MaxActionsDefault','Show_1_BP_Cost','concat','onDisabledPartyCommandSelection','checkPosition','Window_BattleStatus_drawItemStatusXPStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','btbParseFusionData','svActorVertCells','commandCancel','isUsePageUpDnShortcutBTB','compareBattlerSprites','isSceneBattle','setBravePoints','%1AnimationID','filter','createBorderSprite','BattleLayout','some','Game_BattlerBase_canUse','cannotFusionNotetagBTB','_actor','addBraveCommand','map','addGuardCommand','createActorCommandWindowBTB','_windowLayer'];_0xfa0f=function(){return _0x318289;};return _0xfa0f();}function _0x1af5(_0x528f29,_0x47cc3a){const _0xfa0f42=_0xfa0f();return _0x1af5=function(_0x1af5b5,_0x3379f2){_0x1af5b5=_0x1af5b5-0xe6;let _0x5c6beb=_0xfa0f42[_0x1af5b5];return _0x5c6beb;},_0x1af5(_0x528f29,_0x47cc3a);}var label=_0x20875d(0x204),tier=tier||0x0,dependencies=[_0x20875d(0x322),_0x20875d(0x17d),_0x20875d(0x281),_0x20875d(0x2b4)],pluginData=$plugins[_0x20875d(0x228)](function(_0x4478e1){const _0xcf75ba=_0x20875d;return _0x4478e1[_0xcf75ba(0x2b1)]&&_0x4478e1[_0xcf75ba(0x27d)][_0xcf75ba(0x12e)]('['+label+']');})[0x0];VisuMZ[label][_0x20875d(0x1f7)]=VisuMZ[label][_0x20875d(0x1f7)]||{},VisuMZ[_0x20875d(0x240)]=function(_0x3f0775,_0x5f2a8d){const _0x34d5ea=_0x20875d;for(const _0x5153c1 in _0x5f2a8d){if(_0x5153c1['match'](/(.*):(.*)/i)){const _0x2d0fc2=String(RegExp['$1']),_0x2b9418=String(RegExp['$2'])[_0x34d5ea(0x2ae)]()[_0x34d5ea(0xee)]();let _0x26f17c,_0x1f4ad7,_0x37eba9;switch(_0x2b9418){case _0x34d5ea(0x2d8):_0x26f17c=_0x5f2a8d[_0x5153c1]!==''?Number(_0x5f2a8d[_0x5153c1]):0x0;break;case _0x34d5ea(0x1f8):_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x519f04=>Number(_0x519f04));break;case _0x34d5ea(0xf8):_0x26f17c=_0x5f2a8d[_0x5153c1]!==''?eval(_0x5f2a8d[_0x5153c1]):null;break;case'ARRAYEVAL':_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x9b019f=>eval(_0x9b019f));break;case _0x34d5ea(0x1aa):_0x26f17c=_0x5f2a8d[_0x5153c1]!==''?JSON['parse'](_0x5f2a8d[_0x5153c1]):'';break;case'ARRAYJSON':_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x170674=>JSON[_0x34d5ea(0x31a)](_0x170674));break;case _0x34d5ea(0x210):_0x26f17c=_0x5f2a8d[_0x5153c1]!==''?new Function(JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1])):new Function(_0x34d5ea(0x19d));break;case'ARRAYFUNC':_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x45430e=>new Function(JSON[_0x34d5ea(0x31a)](_0x45430e)));break;case _0x34d5ea(0x104):_0x26f17c=_0x5f2a8d[_0x5153c1]!==''?String(_0x5f2a8d[_0x5153c1]):'';break;case _0x34d5ea(0x2fd):_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x13a039=>String(_0x13a039));break;case _0x34d5ea(0x2c4):_0x37eba9=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):{},_0x26f17c=VisuMZ[_0x34d5ea(0x240)]({},_0x37eba9);break;case'ARRAYSTRUCT':_0x1f4ad7=_0x5f2a8d[_0x5153c1]!==''?JSON[_0x34d5ea(0x31a)](_0x5f2a8d[_0x5153c1]):[],_0x26f17c=_0x1f4ad7[_0x34d5ea(0x230)](_0x261e3c=>VisuMZ[_0x34d5ea(0x240)]({},JSON['parse'](_0x261e3c)));break;default:continue;}_0x3f0775[_0x2d0fc2]=_0x26f17c;}}return _0x3f0775;},(_0x1bcad6=>{const _0x239d11=_0x20875d,_0x286848=_0x1bcad6[_0x239d11(0x175)];for(const _0x1524c1 of dependencies){if(!Imported[_0x1524c1]){alert(_0x239d11(0x199)['format'](_0x286848,_0x1524c1)),SceneManager[_0x239d11(0x304)]();break;}}const _0x10d9b6=_0x1bcad6['description'];if(_0x10d9b6[_0x239d11(0x23e)](/\[Version[ ](.*?)\]/i)){const _0x376315=Number(RegExp['$1']);_0x376315!==VisuMZ[label][_0x239d11(0x342)]&&(alert(_0x239d11(0x21f)['format'](_0x286848,_0x376315)),SceneManager[_0x239d11(0x304)]());}if(_0x10d9b6[_0x239d11(0x23e)](/\[Tier[ ](\d+)\]/i)){const _0x32c4e9=Number(RegExp['$1']);_0x32c4e9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x239d11(0x30a)](_0x286848,_0x32c4e9,tier)),SceneManager[_0x239d11(0x304)]()):tier=Math[_0x239d11(0x165)](_0x32c4e9,tier);}VisuMZ[_0x239d11(0x240)](VisuMZ[label]['Settings'],_0x1bcad6[_0x239d11(0x1f5)]);})(pluginData),PluginManager[_0x20875d(0x276)](pluginData[_0x20875d(0x175)],'BtbTurnOrderActorIcon',_0x3b2f91=>{const _0x158704=_0x20875d;VisuMZ[_0x158704(0x240)](_0x3b2f91,_0x3b2f91);const _0x201dfb=_0x3b2f91['Actors'],_0x5e92d3=_0x3b2f91[_0x158704(0x155)];for(const _0x13af89 of _0x201dfb){const _0x113745=$gameActors[_0x158704(0x12d)](_0x13af89);if(!_0x113745)continue;_0x113745[_0x158704(0x31c)]=_0x158704(0x2e8),_0x113745['_btbTurnOrderIconIndex']=_0x5e92d3;}}),PluginManager[_0x20875d(0x276)](pluginData[_0x20875d(0x175)],_0x20875d(0x211),_0x3b6306=>{const _0x2a3e84=_0x20875d;VisuMZ[_0x2a3e84(0x240)](_0x3b6306,_0x3b6306);const _0x3ef7b6=_0x3b6306[_0x2a3e84(0x1d4)],_0x41b942=_0x3b6306[_0x2a3e84(0x147)],_0x9cb5cd=_0x3b6306[_0x2a3e84(0x316)];for(const _0x51b1df of _0x3ef7b6){const _0x1b08cf=$gameActors[_0x2a3e84(0x12d)](_0x51b1df);if(!_0x1b08cf)continue;_0x1b08cf[_0x2a3e84(0x31c)]=_0x2a3e84(0x2e3),_0x1b08cf['_btbTurnOrderFaceName']=_0x41b942,_0x1b08cf[_0x2a3e84(0x26f)]=_0x9cb5cd;}}),PluginManager['registerCommand'](pluginData['name'],'BtbTurnOrderClearActorGraphic',_0x194807=>{const _0x3a65f1=_0x20875d;VisuMZ[_0x3a65f1(0x240)](_0x194807,_0x194807);const _0x24c50b=_0x194807[_0x3a65f1(0x1d4)];for(const _0x44a299 of _0x24c50b){const _0x28eff5=$gameActors[_0x3a65f1(0x12d)](_0x44a299);if(!_0x28eff5)continue;_0x28eff5['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x20875d(0x276)](pluginData['name'],'BtbTurnOrderEnemyIcon',_0x300067=>{const _0x24dcc8=_0x20875d;VisuMZ['ConvertParams'](_0x300067,_0x300067);const _0x5dcbd9=_0x300067['Enemies'],_0xa8fbb4=_0x300067[_0x24dcc8(0x155)];for(const _0xc3096c of _0x5dcbd9){const _0x43cb15=$gameTroop[_0x24dcc8(0x1b0)]()[_0xc3096c];if(!_0x43cb15)continue;_0x43cb15[_0x24dcc8(0x31c)]=_0x24dcc8(0x2e8),_0x43cb15['_btbTurnOrderIconIndex']=_0xa8fbb4;}}),PluginManager[_0x20875d(0x276)](pluginData[_0x20875d(0x175)],_0x20875d(0x313),_0x118698=>{const _0xe06104=_0x20875d;VisuMZ['ConvertParams'](_0x118698,_0x118698);const _0x24a8f6=_0x118698[_0xe06104(0x245)],_0x258329=_0x118698[_0xe06104(0x147)],_0x51957d=_0x118698[_0xe06104(0x316)];for(const _0x549e3b of _0x24a8f6){const _0x3f21ce=$gameTroop['members']()[_0x549e3b];if(!_0x3f21ce)continue;_0x3f21ce[_0xe06104(0x31c)]=_0xe06104(0x2e3),_0x3f21ce[_0xe06104(0x108)]=_0x258329,_0x3f21ce[_0xe06104(0x26f)]=_0x51957d;}}),PluginManager['registerCommand'](pluginData['name'],_0x20875d(0x309),_0x46309a=>{const _0x22f24a=_0x20875d;VisuMZ[_0x22f24a(0x240)](_0x46309a,_0x46309a);const _0x340092=_0x46309a['Enemies'];for(const _0x5c6ea0 of _0x340092){const _0x2a09e8=$gameTroop[_0x22f24a(0x1b0)]()[_0x5c6ea0];if(!_0x2a09e8)continue;_0x2a09e8['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x20875d(0x276)](pluginData[_0x20875d(0x175)],_0x20875d(0xfe),_0x30dfb3=>{const _0x2a72cf=_0x20875d;VisuMZ[_0x2a72cf(0x240)](_0x30dfb3,_0x30dfb3);const _0x2dd232=_0x30dfb3['Visible'];$gameSystem['setBattleSystemBTBTurnOrderVisible'](_0x2dd232);}),VisuMZ[_0x20875d(0x204)]['RegExp']={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x20875d(0x204)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x20875d(0x1ca)][_0x20875d(0x314)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x22bf35=_0x20875d;VisuMZ[_0x22bf35(0x204)][_0x22bf35(0x16e)][_0x22bf35(0x1e5)](this),this[_0x22bf35(0x18d)]();},Scene_Boot[_0x20875d(0x1ca)]['process_VisuMZ_BattleSystemBTB']=function(){const _0x44dbdd=_0x20875d;this[_0x44dbdd(0x25c)](),this[_0x44dbdd(0x177)]();},Scene_Boot['prototype']['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x4c1a75=_0x20875d;if(VisuMZ[_0x4c1a75(0x1ee)])return;const _0x38d884=$dataSkills[_0x4c1a75(0x21b)]($dataItems);for(const _0x58628e of _0x38d884){if(!_0x58628e)continue;DataManager[_0x4c1a75(0x331)](_0x58628e);}},VisuMZ[_0x20875d(0x204)]['JS']={},Scene_Boot[_0x20875d(0x1ca)][_0x20875d(0x177)]=function(){const _0x124239=_0x20875d;if(VisuMZ[_0x124239(0x1ee)])return;const _0x222071=VisuMZ[_0x124239(0x204)][_0x124239(0x2be)],_0x2902f3=$dataSkills[_0x124239(0x21b)](dataItems);for(const _0x645fe7 of _0x2902f3){if(!_0x645fe7)continue;VisuMZ['BattleSystemBTB'][_0x124239(0x124)](_0x645fe7,_0x124239(0x2b7)),VisuMZ[_0x124239(0x204)]['Parse_Notetags_BravePointsUserJS'](_0x645fe7,_0x124239(0x341));}},VisuMZ[_0x20875d(0x204)][_0x20875d(0x124)]=function(_0x4a4d65,_0x5532a7){const _0x2d1149=_0x20875d,_0x277971=VisuMZ[_0x2d1149(0x204)][_0x2d1149(0x2be)][_0x5532a7],_0xdbb0eb=_0x4a4d65[_0x2d1149(0x2e4)];if(_0xdbb0eb[_0x2d1149(0x23e)](_0x277971)){const _0x2b2f6f=String(RegExp['$1']),_0x2e326b=_0x2d1149(0x1c2)['format'](_0x2b2f6f),_0x4feb29=VisuMZ['BattleSystemBTB'][_0x2d1149(0x264)](_0x4a4d65,_0x5532a7);VisuMZ[_0x2d1149(0x204)]['JS'][_0x4feb29]=new Function(_0x2e326b);}},VisuMZ['BattleSystemBTB'][_0x20875d(0x264)]=function(_0xb87e91,_0xf814db){const _0x54513b=_0x20875d;if(VisuMZ[_0x54513b(0x264)])return VisuMZ[_0x54513b(0x264)](_0xb87e91,_0xf814db);let _0x164861='';if($dataActors[_0x54513b(0x12e)](_0xb87e91))_0x164861=_0x54513b(0x10a)[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataClasses[_0x54513b(0x12e)](_0xb87e91))_0x164861=_0x54513b(0x30c)[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataSkills[_0x54513b(0x12e)](_0xb87e91))_0x164861='Skill-%1-%2'[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataItems[_0x54513b(0x12e)](_0xb87e91))_0x164861=_0x54513b(0x19f)[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataWeapons[_0x54513b(0x12e)](_0xb87e91))_0x164861='Weapon-%1-%2'[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataArmors['includes'](_0xb87e91))_0x164861=_0x54513b(0x1bc)['format'](_0xb87e91['id'],_0xf814db);if($dataEnemies[_0x54513b(0x12e)](_0xb87e91))_0x164861=_0x54513b(0x246)[_0x54513b(0x30a)](_0xb87e91['id'],_0xf814db);if($dataStates[_0x54513b(0x12e)](_0xb87e91))_0x164861=_0x54513b(0x2a4)['format'](_0xb87e91['id'],_0xf814db);return _0x164861;},VisuMZ[_0x20875d(0x204)][_0x20875d(0x209)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x20875d(0x209)]=function(_0x5ac24f){const _0x1be569=_0x20875d;VisuMZ[_0x1be569(0x204)][_0x1be569(0x209)][_0x1be569(0x1e5)](this,_0x5ac24f),DataManager['btbRegisterFusions'](_0x5ac24f),VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'](_0x5ac24f,_0x1be569(0x2b7)),VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'](_0x5ac24f,_0x1be569(0x341));},VisuMZ[_0x20875d(0x204)][_0x20875d(0x30f)]=VisuMZ[_0x20875d(0x30f)],VisuMZ['ParseItemNotetags']=function(_0x19bb6b){const _0x1f8bd6=_0x20875d;VisuMZ[_0x1f8bd6(0x204)]['ParseItemNotetags']['call'](this,_0x19bb6b),DataManager[_0x1f8bd6(0x331)](_0x19bb6b),VisuMZ[_0x1f8bd6(0x204)][_0x1f8bd6(0x124)](_0x19bb6b,_0x1f8bd6(0x2b7)),VisuMZ[_0x1f8bd6(0x204)]['Parse_Notetags_BravePointsUserJS'](_0x19bb6b,_0x1f8bd6(0x341));},DataManager[_0x20875d(0x18c)]=function(_0x481d63){const _0x40c43d=_0x20875d;_0x481d63=_0x481d63[_0x40c43d(0x2ae)]()[_0x40c43d(0xee)](),this[_0x40c43d(0x27b)]=this[_0x40c43d(0x27b)]||{};if(this[_0x40c43d(0x27b)][_0x481d63])return this['_skillIDs'][_0x481d63];for(const _0x5a1c73 of $dataSkills){if(!_0x5a1c73)continue;this[_0x40c43d(0x27b)][_0x5a1c73[_0x40c43d(0x175)]['toUpperCase']()[_0x40c43d(0xee)]()]=_0x5a1c73['id'];}return this[_0x40c43d(0x27b)][_0x481d63]||0x0;},DataManager[_0x20875d(0x1eb)]=function(_0x4e1340){const _0x14dea2=_0x20875d;_0x4e1340=_0x4e1340[_0x14dea2(0x2ae)]()['trim'](),this['_itemIDs']=this[_0x14dea2(0x18b)]||{};if(this[_0x14dea2(0x18b)][_0x4e1340])return this[_0x14dea2(0x18b)][_0x4e1340];for(const _0x1c7ab8 of $dataItems){if(!_0x1c7ab8)continue;this[_0x14dea2(0x18b)][_0x1c7ab8[_0x14dea2(0x175)]['toUpperCase']()[_0x14dea2(0xee)]()]=_0x1c7ab8['id'];}return this['_itemIDs'][_0x4e1340]||0x0;},DataManager[_0x20875d(0x1ba)]={},DataManager[_0x20875d(0x112)]={},DataManager['_btbItemFlexFusion']={},DataManager[_0x20875d(0x1ec)]={},DataManager[_0x20875d(0x331)]=function(_0xbe1403){const _0x562441=_0x20875d;if(!_0xbe1403)return;const _0x302863=VisuMZ[_0x562441(0x204)]['RegExp'],_0x384ca4=_0xbe1403[_0x562441(0x2e4)],_0x9e7911=DataManager['isSkill'](_0xbe1403),_0x5076c4=_0x384ca4[_0x562441(0x23e)](_0x302863[_0x562441(0x344)]);if(_0x5076c4)for(const _0x29118e of _0x5076c4){if(!_0x29118e)continue;_0x29118e[_0x562441(0x23e)](_0x302863[_0x562441(0x344)]);const _0x57c99b=String(RegExp['$1'])[_0x562441(0x141)](','),_0x5b3bd8=this['btbParseFusionData'](_0x57c99b,_0x9e7911)[_0x562441(0x307)]((_0x31ce7f,_0x3139d5)=>_0x31ce7f-_0x3139d5);if(_0x5b3bd8[_0x562441(0x2bf)]<=0x1)continue;const _0x408df9=_0x5b3bd8[_0x562441(0x131)]('-'),_0x2d7a9a=_0x9e7911?DataManager[_0x562441(0x1ba)]:DataManager[_0x562441(0x1c4)];_0x2d7a9a[_0x408df9]=_0xbe1403['id'];}const _0x51b605=_0x384ca4['match'](_0x302863[_0x562441(0x13c)]);if(_0x51b605)for(const _0x528bac of _0x51b605){if(!_0x528bac)continue;_0x528bac[_0x562441(0x23e)](_0x302863[_0x562441(0x13c)]);const _0x34373b=String(RegExp['$1'])['split'](','),_0x4f4e93=this[_0x562441(0x220)](_0x34373b,_0x9e7911);if(_0x4f4e93['length']<=0x1)continue;const _0x1b4896=_0x4f4e93[_0x562441(0x131)]('-'),_0x130f7b=_0x9e7911?DataManager[_0x562441(0x112)]:DataManager['_btbItemStrictFusion'];_0x130f7b[_0x1b4896]=_0xbe1403['id'];}},DataManager['btbParseFusionData']=function(_0x29a054,_0x146445){const _0x56d836=_0x20875d,_0x467c6a=[];for(let _0x3d170a of _0x29a054){_0x3d170a=(String(_0x3d170a)||'')[_0x56d836(0xee)]();const _0x133208=/^\d+$/[_0x56d836(0x2c8)](_0x3d170a);if(_0x133208)_0x467c6a[_0x56d836(0x15d)](Number(_0x3d170a));else _0x146445?_0x467c6a[_0x56d836(0x15d)](DataManager['getSkillIdWithName'](_0x3d170a)):_0x467c6a[_0x56d836(0x15d)](DataManager[_0x56d836(0x1eb)](_0x3d170a));}return _0x467c6a;},ImageManager[_0x20875d(0x1cd)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)]['General']['BravePointsIcon'],ImageManager[_0x20875d(0x1dd)]=ImageManager[_0x20875d(0x1dd)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x20875d(0x221)]||0x6,TextManager[_0x20875d(0x2e5)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0xef)][_0x20875d(0x1b7)],TextManager[_0x20875d(0x268)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0xef)][_0x20875d(0x1bf)],TextManager[_0x20875d(0x2f1)]=VisuMZ[_0x20875d(0x204)]['Settings'][_0x20875d(0xef)]['BravePointCostFmt'],TextManager[_0x20875d(0x17c)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0x279)]['CommandName'],TextManager['btbActionSlot']=VisuMZ['BattleSystemBTB'][_0x20875d(0x1f7)][_0x20875d(0x279)]['ActionSlot'],TextManager[_0x20875d(0x1b9)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0x279)]['ActionCurrent'],SceneManager[_0x20875d(0x225)]=function(){const _0x2aa94c=_0x20875d;return this[_0x2aa94c(0x203)]&&this[_0x2aa94c(0x203)][_0x2aa94c(0x107)]===Scene_Battle;},VisuMZ[_0x20875d(0x204)][_0x20875d(0x159)]=BattleManager[_0x20875d(0x145)],BattleManager[_0x20875d(0x145)]=function(){const _0x2b3bb9=_0x20875d;if(this[_0x2b3bb9(0x163)]())return _0x2b3bb9(0x25e);return VisuMZ[_0x2b3bb9(0x204)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x20875d(0x163)]=function(){const _0x27406e=_0x20875d;return $gameSystem[_0x27406e(0x1a6)]()===_0x27406e(0x25e);},VisuMZ['BattleSystemBTB'][_0x20875d(0x262)]=BattleManager[_0x20875d(0x17a)],BattleManager[_0x20875d(0x17a)]=function(){const _0x2e847a=_0x20875d;if(this[_0x2e847a(0x163)]())return![];return VisuMZ[_0x2e847a(0x204)][_0x2e847a(0x262)]['call'](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x1fc)]=BattleManager[_0x20875d(0x2f7)],BattleManager[_0x20875d(0x2f7)]=function(){const _0x425372=_0x20875d;if(this[_0x425372(0x163)]())return![];return VisuMZ[_0x425372(0x204)][_0x425372(0x1fc)]['call'](this);},VisuMZ[_0x20875d(0x204)]['BattleManager_isTurnBased']=BattleManager[_0x20875d(0x164)],BattleManager[_0x20875d(0x164)]=function(){const _0x27a978=_0x20875d;if(this[_0x27a978(0x163)]())return!![];return VisuMZ[_0x27a978(0x204)][_0x27a978(0xf5)]['call'](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x132)]=BattleManager['startInput'],BattleManager[_0x20875d(0x194)]=function(){const _0x555d8f=_0x20875d;VisuMZ[_0x555d8f(0x204)]['BattleManager_startInput'][_0x555d8f(0x1e5)](this),this[_0x555d8f(0x163)]()&&this[_0x555d8f(0x1a9)]()&&!this[_0x555d8f(0x14a)]&&$gameParty[_0x555d8f(0x1c8)]()&&this[_0x555d8f(0x310)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2bc)]=BattleManager['startTurn'],BattleManager[_0x20875d(0x1a2)]=function(){const _0x1d855e=_0x20875d;VisuMZ[_0x1d855e(0x204)][_0x1d855e(0x2bc)][_0x1d855e(0x1e5)](this),this['refreshStatusBTB']();},BattleManager[_0x20875d(0x179)]=function(){const _0x2d9d83=_0x20875d;if(!SceneManager[_0x2d9d83(0x225)]())return;if(!this['isBTB']())return;const _0x38ee47=SceneManager[_0x2d9d83(0x203)];if(!_0x38ee47)return;const _0x1bcb86=_0x38ee47[_0x2d9d83(0x2d4)];if(!_0x1bcb86)return;_0x1bcb86[_0x2d9d83(0x198)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x24a)]=BattleManager[_0x20875d(0x2c9)],BattleManager[_0x20875d(0x2c9)]=function(){const _0x75dec7=_0x20875d;VisuMZ[_0x75dec7(0x204)][_0x75dec7(0x24a)]['call'](this),this[_0x75dec7(0x163)]()&&(this[_0x75dec7(0xfb)]=this[_0x75dec7(0xfb)][_0x75dec7(0x228)](_0x4a3dd5=>_0x4a3dd5&&_0x4a3dd5[_0x75dec7(0x1b1)][_0x75dec7(0x2bf)]>0x0),this[_0x75dec7(0x1e6)]());},BattleManager['sortActionOrdersBTB']=function(){const _0x13c345=_0x20875d;if(!this[_0x13c345(0x163)]())return;if(!SceneManager[_0x13c345(0x225)]())return;const _0x43a7d3=this[_0x13c345(0xfb)];for(const _0x53b6e9 of _0x43a7d3){_0x53b6e9[_0x13c345(0x215)]();}_0x43a7d3[_0x13c345(0x307)]((_0x40e264,_0x252edd)=>_0x252edd[_0x13c345(0x1e4)]()-_0x40e264[_0x13c345(0x1e4)]()),this[_0x13c345(0x163)]()&&this[_0x13c345(0x1e6)]();},BattleManager['removeActionBattlersBTB']=function(){const _0x59e9bc=_0x20875d;if(!this['isBTB']())return;this[_0x59e9bc(0xfb)]=this[_0x59e9bc(0xfb)]||[],this['_actionBattlers']=this[_0x59e9bc(0xfb)][_0x59e9bc(0x228)](_0x3fc9f1=>_0x3fc9f1&&_0x3fc9f1['isAppeared']()&&_0x3fc9f1[_0x59e9bc(0x24f)]()),this[_0x59e9bc(0x1e6)]();},BattleManager[_0x20875d(0x1e6)]=function(_0x454ed2){const _0x515ed7=_0x20875d;if(!this[_0x515ed7(0x163)]())return;const _0x32225c=SceneManager[_0x515ed7(0x203)][_0x515ed7(0x111)];if(!_0x32225c)return;_0x32225c[_0x515ed7(0x2ea)](_0x454ed2);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x275)]=BattleManager[_0x20875d(0x192)],BattleManager['startAction']=function(){const _0x503961=_0x20875d;BattleManager['isBTB']()&&this['_subject']&&this[_0x503961(0xf9)][_0x503961(0xed)](),VisuMZ['BattleSystemBTB']['BattleManager_startAction'][_0x503961(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x23c)]=Game_System[_0x20875d(0x1ca)][_0x20875d(0x2f8)],Game_System['prototype'][_0x20875d(0x2f8)]=function(){const _0x278404=_0x20875d;VisuMZ[_0x278404(0x204)][_0x278404(0x23c)]['call'](this),this[_0x278404(0x140)]();},Game_System[_0x20875d(0x1ca)]['initBattleSystemBTB']=function(){const _0x433033=_0x20875d;this[_0x433033(0x345)]=!![];},Game_System[_0x20875d(0x1ca)][_0x20875d(0x11d)]=function(){const _0x44cb53=_0x20875d;return this[_0x44cb53(0x345)]===undefined&&this[_0x44cb53(0x140)](),this[_0x44cb53(0x345)];},Game_System[_0x20875d(0x1ca)][_0x20875d(0x1a3)]=function(_0x36707f){const _0x379872=_0x20875d;this[_0x379872(0x345)]===undefined&&this[_0x379872(0x140)](),this['_btbTurnOrderVisible']=_0x36707f;},VisuMZ[_0x20875d(0x204)][_0x20875d(0x136)]=Game_Action[_0x20875d(0x1ca)][_0x20875d(0x241)],Game_Action[_0x20875d(0x1ca)][_0x20875d(0x241)]=function(){const _0x3e0c6b=_0x20875d;if($gameParty[_0x3e0c6b(0x1f4)]()&&BattleManager[_0x3e0c6b(0x163)]()){if(this['item']()===null)return![];}return VisuMZ[_0x3e0c6b(0x204)]['Game_Action_isValid'][_0x3e0c6b(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x1c3)]=Game_Action['prototype'][_0x20875d(0x16d)],Game_Action[_0x20875d(0x1ca)][_0x20875d(0x16d)]=function(_0xbc151a){const _0xe2a3ff=_0x20875d;VisuMZ[_0xe2a3ff(0x204)]['Game_Action_applyItemUserEffect'][_0xe2a3ff(0x1e5)](this,_0xbc151a),this[_0xe2a3ff(0x298)](_0xbc151a);},Game_Action[_0x20875d(0x1ca)][_0x20875d(0x298)]=function(_0x3112f2){const _0x56e3c2=_0x20875d;if(!BattleManager[_0x56e3c2(0x163)]())return;if(this['item']())this['applyItemBattleSystemBTBUserEffect'](_0x3112f2);},Game_Action['prototype'][_0x20875d(0x168)]=function(_0x251ce6){const _0x5868ae=_0x20875d,_0xbc2178=VisuMZ[_0x5868ae(0x204)]['RegExp'],_0x16ef71=this[_0x5868ae(0x14c)]()[_0x5868ae(0x2e4)],_0x5d36a8=this['item']();if(this[_0x5868ae(0x128)]()){if(_0x16ef71['match'](_0xbc2178[_0x5868ae(0xf7)])){const _0x1b337b=Number(RegExp['$1']);this[_0x5868ae(0x128)]()[_0x5868ae(0x226)](_0x1b337b);}if(_0x16ef71[_0x5868ae(0x23e)](_0xbc2178[_0x5868ae(0x1e2)])){const _0x53f3d3=Number(RegExp['$1']);this[_0x5868ae(0x128)]()[_0x5868ae(0x2c3)](_0x53f3d3);}const _0x1655dc=_0x5868ae(0x2b7),_0x42b432=VisuMZ[_0x5868ae(0x204)][_0x5868ae(0x264)](_0x5d36a8,_0x1655dc);if(VisuMZ[_0x5868ae(0x204)]['JS'][_0x42b432]){const _0x560f3e=VisuMZ[_0x5868ae(0x204)]['JS'][_0x42b432][_0x5868ae(0x1e5)](this,this[_0x5868ae(0x128)](),_0x251ce6,this[_0x5868ae(0x128)]()[_0x5868ae(0x181)]());this[_0x5868ae(0x128)]()['setBravePoints'](_0x560f3e);}}if(_0x251ce6){if(_0x16ef71['match'](_0xbc2178[_0x5868ae(0x1fd)])){const _0x1e8a5b=Number(RegExp['$1']);_0x251ce6[_0x5868ae(0x226)](_0x1e8a5b);}if(_0x16ef71[_0x5868ae(0x23e)](_0xbc2178[_0x5868ae(0x33c)])){const _0x21ca40=Number(RegExp['$1']);_0x251ce6[_0x5868ae(0x2c3)](_0x21ca40);}const _0x1812ea=_0x5868ae(0x341),_0x591c2c=VisuMZ[_0x5868ae(0x204)][_0x5868ae(0x264)](_0x5d36a8,_0x1812ea);if(VisuMZ[_0x5868ae(0x204)]['JS'][_0x591c2c]){const _0x5eec6d=VisuMZ[_0x5868ae(0x204)]['JS'][_0x591c2c][_0x5868ae(0x1e5)](this,this[_0x5868ae(0x128)](),_0x251ce6,_0x251ce6[_0x5868ae(0x181)]());_0x251ce6[_0x5868ae(0x226)](_0x5eec6d);}}},VisuMZ['BattleSystemBTB'][_0x20875d(0x1ed)]=Game_Action[_0x20875d(0x1ca)][_0x20875d(0x1e4)],Game_Action['prototype'][_0x20875d(0x1e4)]=function(){const _0x446d4b=_0x20875d;return BattleManager['isBTB']()?VisuMZ[_0x446d4b(0x204)][_0x446d4b(0x1f7)][_0x446d4b(0x32b)][_0x446d4b(0x1d3)][_0x446d4b(0x1e5)](this):VisuMZ[_0x446d4b(0x204)][_0x446d4b(0x1ed)][_0x446d4b(0x1e5)](this);},VisuMZ['BattleSystemBTB'][_0x20875d(0x149)]=Game_Action['prototype'][_0x20875d(0x2c6)],Game_Action[_0x20875d(0x1ca)][_0x20875d(0x2c6)]=function(){const _0x5e4da8=_0x20875d;return BattleManager[_0x5e4da8(0x163)]()?VisuMZ[_0x5e4da8(0x204)][_0x5e4da8(0x1f7)][_0x5e4da8(0x32b)][_0x5e4da8(0x1d6)]:VisuMZ[_0x5e4da8(0x204)][_0x5e4da8(0x149)][_0x5e4da8(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x122)]=Game_Action[_0x20875d(0x1ca)]['setSkill'],Game_Action['prototype']['setSkill']=function(_0x1fbf9d){const _0x465df4=_0x20875d;VisuMZ[_0x465df4(0x204)][_0x465df4(0x122)][_0x465df4(0x1e5)](this,_0x1fbf9d),BattleManager[_0x465df4(0x1c0)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x1fe)]=Game_Action['prototype'][_0x20875d(0x1f0)],Game_Action[_0x20875d(0x1ca)][_0x20875d(0x1f0)]=function(_0xc05d19){const _0x3da6c2=_0x20875d;VisuMZ[_0x3da6c2(0x204)][_0x3da6c2(0x1fe)][_0x3da6c2(0x1e5)](this,_0xc05d19),BattleManager[_0x3da6c2(0x1c0)]();},Game_Action[_0x20875d(0x1ca)]['setActionFusionBTB']=function(_0xd78804){const _0x305467=_0x20875d;this[_0x305467(0x28f)]=_0xd78804;},Game_Action[_0x20875d(0x1ca)]['getTotalActionFusionRecipes']=function(){const _0x3699b1=_0x20875d;if(this['_actionFusionRecipe']===undefined)return 0x0;return this[_0x3699b1(0x28f)][_0x3699b1(0x141)]('-')['length']-0x1;},Game_Action[_0x20875d(0x1ca)]['getActionFusionRecipeSkills']=function(){const _0x7c29e=_0x20875d;if(this[_0x7c29e(0x28f)]===undefined)return[];return this['_actionFusionRecipe']['split']('-')[_0x7c29e(0x230)](_0x4d5a32=>$dataSkills[Number(_0x4d5a32)]);},Game_Action[_0x20875d(0x1ca)][_0x20875d(0x19a)]=function(){const _0x28d3a1=_0x20875d;if(this[_0x28d3a1(0x28f)]===undefined)return[];return this['_actionFusionRecipe'][_0x28d3a1(0x141)]('-')[_0x28d3a1(0x230)](_0x41b5b9=>$dataItems[Number(_0x41b5b9)]);},Game_BattlerBase['prototype'][_0x20875d(0x181)]=function(){const _0x33adfa=_0x20875d;return this[_0x33adfa(0x1cc)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ['BattleSystemBTB'][_0x20875d(0x1f7)][_0x20875d(0x32b)][_0x20875d(0x219)],Game_BattlerBase[_0x20875d(0x318)]=VisuMZ[_0x20875d(0x204)]['Settings'][_0x20875d(0x32b)]['MaxActionsHardCap'],Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x11b)]=function(){const _0x204ccb=_0x20875d;if(this['cannotBraveTrait']())return 0x1;if(this[_0x204ccb(0x277)]())return 0x1;const _0x34d3c2=VisuMZ[_0x204ccb(0x204)]['RegExp'],_0x3aacf8=_0x34d3c2['MaxActions'];let _0x4c0164=Game_BattlerBase[_0x204ccb(0x1a1)];const _0x42a29b=this[_0x204ccb(0x346)]();for(const _0x300a8a of _0x42a29b){if(!_0x300a8a)continue;const _0x1081e6=_0x300a8a[_0x204ccb(0x2e4)];_0x1081e6[_0x204ccb(0x23e)](_0x3aacf8)&&(_0x4c0164+=Number(RegExp['$1']));}return _0x4c0164[_0x204ccb(0x218)](0x1,Game_BattlerBase[_0x204ccb(0x318)]);},Game_BattlerBase[_0x20875d(0x160)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0x32b)][_0x20875d(0x14d)],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_DEFAULT']=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0x32b)][_0x20875d(0x1e1)],Game_BattlerBase[_0x20875d(0x311)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)]['Mechanics']['MaxBravePointsHardCap'],Game_BattlerBase[_0x20875d(0x1a4)]=VisuMZ[_0x20875d(0x204)][_0x20875d(0x1f7)][_0x20875d(0x32b)][_0x20875d(0x196)],Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x167)]=function(){const _0x1a53ec=_0x20875d,_0x53678a=VisuMZ[_0x1a53ec(0x204)]['RegExp'],_0x4be624=_0x53678a['MaxBravePoints'];let _0x5dadaa=Game_BattlerBase[_0x1a53ec(0x160)];const _0x172b34=this[_0x1a53ec(0x346)]();for(const _0x3df524 of _0x172b34){if(!_0x3df524)continue;const _0x54103f=_0x3df524[_0x1a53ec(0x2e4)];_0x54103f[_0x1a53ec(0x23e)](_0x4be624)&&(_0x5dadaa+=Number(RegExp['$1']));}return Math[_0x1a53ec(0x117)](_0x5dadaa,Game_BattlerBase[_0x1a53ec(0x311)]);},Game_BattlerBase[_0x20875d(0x1ca)]['minBravePoints']=function(){const _0x4321fd=_0x20875d,_0x567932=VisuMZ[_0x4321fd(0x204)][_0x4321fd(0x2be)],_0x4e6952=_0x567932[_0x4321fd(0x142)];let _0x1b5c89=Game_BattlerBase[_0x4321fd(0x239)];const _0x385cfc=this[_0x4321fd(0x346)]();for(const _0x4ddbb8 of _0x385cfc){if(!_0x4ddbb8)continue;const _0x2d87aa=_0x4ddbb8['note'];_0x2d87aa[_0x4321fd(0x23e)](_0x4e6952)&&(_0x1b5c89+=Number(RegExp['$1']));}return Math[_0x4321fd(0x165)](_0x1b5c89,Game_BattlerBase[_0x4321fd(0x1a4)]);},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x226)]=function(_0x4e90e1){const _0x3c6286=_0x20875d;this[_0x3c6286(0x1cc)]=Math[_0x3c6286(0x117)](_0x4e90e1,this[_0x3c6286(0x167)]()),this[_0x3c6286(0x33b)]();},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x2c3)]=function(_0x5d1a93){const _0x16370b=_0x20875d;_0x5d1a93+=this[_0x16370b(0x1cc)]||0x0,this['setBravePoints'](_0x5d1a93);},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x154)]=function(_0x2548e4){const _0x59ef69=_0x20875d;this[_0x59ef69(0x2c3)](-_0x2548e4);},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x15a)]=function(_0x788516){const _0x531085=_0x20875d,_0x2cbb08=VisuMZ[_0x531085(0x204)][_0x531085(0x1f7)]['Mechanics'];if(!_0x788516)return _0x2cbb08[_0x531085(0x11c)];if(DataManager['isSkill'](_0x788516)){if(_0x788516['id']===this['guardSkillId']())return 0x0;if(this[_0x531085(0x180)]()&&this[_0x531085(0x180)]()['item']()===_0x788516&&this['currentAction']()[_0x531085(0x24e)])return 0x0;}const _0xf2f460=VisuMZ[_0x531085(0x204)][_0x531085(0x2be)],_0x2d1aa6=_0x788516[_0x531085(0x2e4)];if(_0x2d1aa6[_0x531085(0x23e)](_0xf2f460[_0x531085(0x130)]))return Number(RegExp['$1']);let _0x3c149a=0x0;if(DataManager[_0x531085(0x1b8)](_0x788516))_0x3c149a=_0x2cbb08[_0x531085(0x302)];else DataManager[_0x531085(0x332)](_0x788516)&&(_0x3c149a=_0x2cbb08['BravePointItemCost']);return _0x3c149a['clamp'](0x0,Game_BattlerBase[_0x531085(0x311)]);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x22c)]=Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x242)],Game_BattlerBase['prototype'][_0x20875d(0x242)]=function(_0x364c7f){const _0x448a2a=_0x20875d;if(_0x364c7f&&SceneManager[_0x448a2a(0x225)]()&&BattleManager[_0x448a2a(0x163)]()){const _0x1f0fb4=this[_0x448a2a(0x15a)](_0x364c7f);if(this['bravePoints']()-_0x1f0fb4<this[_0x448a2a(0x317)]())return![];}return VisuMZ[_0x448a2a(0x204)][_0x448a2a(0x22c)][_0x448a2a(0x1e5)](this,_0x364c7f);},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x1c7)]=function(_0x51a0d0){const _0x4af390=_0x20875d;if(!BattleManager[_0x4af390(0x163)]())return;const _0x1d208f=this[_0x4af390(0x15a)](_0x51a0d0);this[_0x4af390(0x154)](_0x1d208f);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2a9)]=Game_Battler[_0x20875d(0x1ca)]['useItem'],Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x235)]=function(_0x4d59a0){const _0xe484b3=_0x20875d;if(this[_0xe484b3(0x182)](_0x4d59a0)){this[_0xe484b3(0x2a2)](_0x4d59a0);return;}VisuMZ[_0xe484b3(0x204)][_0xe484b3(0x2a9)][_0xe484b3(0x1e5)](this,_0x4d59a0),this['payBravePointsCost'](_0x4d59a0);},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x182)]=function(_0x755a1d){const _0x2cd103=_0x20875d;if(!BattleManager['isBTB']())return![];if(!SceneManager['isSceneBattle']())return![];if(!this[_0x2cd103(0x29f)]())return![];if(this!==BattleManager[_0x2cd103(0xf9)])return![];if(!this['currentAction']())return![];if(!this[_0x2cd103(0x180)]()[_0x2cd103(0x14c)]())return![];if(this[_0x2cd103(0x180)]()['item']()!==_0x755a1d)return![];if(this[_0x2cd103(0x180)]()['isSkill']())return this[_0x2cd103(0x180)]()[_0x2cd103(0x1ff)]()[_0x2cd103(0x2bf)]>0x0;else return this['currentAction']()[_0x2cd103(0x332)]()?this['currentAction']()[_0x2cd103(0x19a)]()[_0x2cd103(0x2bf)]>0x0:![];},Game_Battler['prototype'][_0x20875d(0x2a2)]=function(_0x500d53){const _0x3328a1=_0x20875d;if(!SceneManager[_0x3328a1(0x225)]())return;DataManager[_0x3328a1(0x1b8)](_0x500d53)?this[_0x3328a1(0x2de)]():this[_0x3328a1(0x185)]();},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x2de)]=function(){const _0x5bc6dc=_0x20875d,_0x2185ba=this[_0x5bc6dc(0x180)]()[_0x5bc6dc(0x1ff)]();if(!_0x2185ba)return;for(const _0x127e30 of _0x2185ba){if(!_0x127e30)continue;if(!this[_0x5bc6dc(0x242)](_0x127e30))return![];VisuMZ[_0x5bc6dc(0x204)][_0x5bc6dc(0x2a9)][_0x5bc6dc(0x1e5)](this,_0x127e30),this[_0x5bc6dc(0x1c7)](_0x127e30);}return!![];},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x185)]=function(){const _0x3dc4cd=_0x20875d,_0x441842=this[_0x3dc4cd(0x180)]()['getActionFusionRecipeItems']();if(!_0x441842)return;for(const _0x3ba5b0 of _0x441842){if(!_0x3ba5b0)continue;if(!this[_0x3dc4cd(0x242)](_0x3ba5b0))return![];this['payBravePointsCost'](_0x3ba5b0);}return!![];},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x337)]=function(){const _0xa33f4=_0x20875d,_0xcfe832=this[_0xa33f4(0x181)]()-this[_0xa33f4(0x28b)]()+this[_0xa33f4(0x14f)]();return _0xcfe832[_0xa33f4(0x218)](Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this[_0xa33f4(0x167)]());},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x28b)]=function(){const _0x5772c1=_0x20875d;let _0x39c262=0x0;for(const _0x10b413 of this['_actions']){if(!_0x10b413)continue;const _0x5caabf=_0x10b413['item']();_0x39c262+=this[_0x5772c1(0x15a)](_0x5caabf);}return _0x39c262;},VisuMZ[_0x20875d(0x204)][_0x20875d(0x26e)]=Game_BattlerBase['prototype'][_0x20875d(0x1c8)],Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x1c8)]=function(){const _0x2e7215=_0x20875d;return BattleManager[_0x2e7215(0x163)]()&&this[_0x2e7215(0x181)]()<0x0?![]:VisuMZ[_0x2e7215(0x204)][_0x2e7215(0x26e)][_0x2e7215(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x26c)]=Game_BattlerBase['prototype'][_0x20875d(0x1d2)],Game_BattlerBase[_0x20875d(0x1ca)]['canGuard']=function(){const _0x3fa9f4=_0x20875d;return BattleManager[_0x3fa9f4(0x163)]()&&this[_0x3fa9f4(0x105)]()>0x1?![]:VisuMZ[_0x3fa9f4(0x204)][_0x3fa9f4(0x26c)]['call'](this);},Game_BattlerBase['prototype'][_0x20875d(0x1c6)]=function(){const _0x32f899=_0x20875d;if(this[_0x32f899(0x333)]())return![];return this[_0x32f899(0x105)]()<this['maxBraveActions']()&&this[_0x32f899(0x1cc)]>this[_0x32f899(0x317)]();},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x333)]=function(){const _0x34aabc=_0x20875d,_0x5e8782=VisuMZ[_0x34aabc(0x204)][_0x34aabc(0x2be)],_0x359e6=_0x5e8782[_0x34aabc(0x306)];return this[_0x34aabc(0x346)]()['some'](_0x1e479f=>_0x1e479f&&_0x1e479f[_0x34aabc(0x2e4)][_0x34aabc(0x23e)](_0x359e6));},Game_BattlerBase[_0x20875d(0x1ca)]['hideBraveTrait']=function(){const _0x2dd3ee=_0x20875d,_0x510c04=VisuMZ['BattleSystemBTB'][_0x2dd3ee(0x2be)],_0x46d37c=_0x510c04[_0x2dd3ee(0x31f)];return this[_0x2dd3ee(0x346)]()[_0x2dd3ee(0x22b)](_0xe213c5=>_0xe213c5&&_0xe213c5[_0x2dd3ee(0x2e4)][_0x2dd3ee(0x23e)](_0x46d37c));},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x2d6)]=function(){const _0x37c6bf=_0x20875d;delete this['_btbTurnOrderGraphicType'],delete this[_0x37c6bf(0x108)],delete this[_0x37c6bf(0x26f)],delete this[_0x37c6bf(0x334)];},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x33f)]=function(){const _0x20699d=_0x20875d;return this[_0x20699d(0x31c)]===undefined&&(this['_btbTurnOrderGraphicType']=this['createTurnOrderBTBGraphicType']()),this[_0x20699d(0x31c)];},Game_BattlerBase['prototype'][_0x20875d(0x1f1)]=function(){const _0x563edf=_0x20875d;return Window_BTB_TurnOrder[_0x563edf(0x1f7)][_0x563edf(0x2c2)];},Game_BattlerBase[_0x20875d(0x1ca)]['TurnOrderBTBGraphicFaceName']=function(){const _0x304080=_0x20875d;return this[_0x304080(0x108)]===undefined&&(this[_0x304080(0x108)]=this[_0x304080(0x17b)]()),this[_0x304080(0x108)];},Game_BattlerBase['prototype']['createTurnOrderBTBGraphicFaceName']=function(){const _0x5464d7=_0x20875d;return Window_BTB_TurnOrder['Settings'][_0x5464d7(0x31b)];},Game_BattlerBase['prototype'][_0x20875d(0x2a7)]=function(){const _0x169e4f=_0x20875d;return this[_0x169e4f(0x26f)]===undefined&&(this[_0x169e4f(0x26f)]=this[_0x169e4f(0x143)]()),this[_0x169e4f(0x26f)];},Game_BattlerBase['prototype'][_0x20875d(0x143)]=function(){const _0xe185f0=_0x20875d;return Window_BTB_TurnOrder['Settings'][_0xe185f0(0x2f0)];},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x20c)]=function(){const _0xf1808=_0x20875d;return this[_0xf1808(0x334)]===undefined&&(this[_0xf1808(0x334)]=this[_0xf1808(0x205)]()),this['_btbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x20875d(0x205)]=function(){const _0x3c5044=_0x20875d;return Window_BTB_TurnOrder['Settings'][_0x3c5044(0x288)];},Game_BattlerBase['prototype'][_0x20875d(0x14e)]=function(_0x4430e8){const _0x20c3ef=_0x20875d;this[_0x20c3ef(0x334)]=_0x4430e8;},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2b0)]=Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x207)],Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x207)]=function(){const _0x3a2658=_0x20875d;VisuMZ[_0x3a2658(0x204)][_0x3a2658(0x2b0)][_0x3a2658(0x1e5)](this),BattleManager[_0x3a2658(0x172)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2ca)]=Game_BattlerBase[_0x20875d(0x1ca)]['appear'],Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x2ef)]=function(){const _0x83acf9=_0x20875d;VisuMZ[_0x83acf9(0x204)][_0x83acf9(0x2ca)]['call'](this),BattleManager[_0x83acf9(0x172)]();},VisuMZ['BattleSystemBTB']['Game_Battler_performCollapse']=Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x20b)],Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x20b)]=function(){const _0x2a8e37=_0x20875d;VisuMZ[_0x2a8e37(0x204)][_0x2a8e37(0x100)]['call'](this),BattleManager[_0x2a8e37(0x172)]();},VisuMZ['BattleSystemBTB'][_0x20875d(0x102)]=Game_Battler['prototype']['makeActionTimes'],Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x289)]=function(){const _0x2a5aae=_0x20875d;return BattleManager['isBTB']()?0x1:VisuMZ['BattleSystemBTB'][_0x2a5aae(0x102)][_0x2a5aae(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x28c)]=Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x12a)],Game_Battler[_0x20875d(0x1ca)]['onBattleStart']=function(_0xf20f8){const _0x128940=_0x20875d;VisuMZ['BattleSystemBTB']['Game_Battler_onBattleStart'][_0x128940(0x1e5)](this,_0xf20f8),this[_0x128940(0x115)](_0xf20f8);},Game_Battler['prototype'][_0x20875d(0x115)]=function(_0x4f37dd){const _0x26ab32=_0x20875d;if(!BattleManager['isBTB']())return;const _0x2b70d7=VisuMZ[_0x26ab32(0x204)][_0x26ab32(0x1f7)]['Mechanics'],_0x26e813=VisuMZ['BattleSystemBTB'][_0x26ab32(0x2be)];let _0x59448a=_0x4f37dd?_0x2b70d7[_0x26ab32(0x1f9)]:_0x2b70d7[_0x26ab32(0x11f)];const _0x54b794=this[_0x26ab32(0x346)]();for(const _0x50959c of _0x54b794){if(!_0x50959c)continue;const _0x5f1645=_0x50959c[_0x26ab32(0x2e4)];_0x5f1645[_0x26ab32(0x23e)](_0x26e813['BravePointBattleStart'])&&(_0x59448a+=Number(RegExp['$1']));}this[_0x26ab32(0x226)](_0x59448a);},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x126)]=function(){const _0x4feb31=_0x20875d;this[_0x4feb31(0x1b1)][_0x4feb31(0x15d)](new Game_Action(this));const _0x5acd1d=VisuMZ['BattleSystemBTB'][_0x4feb31(0x1f7)][_0x4feb31(0x1cb)];if(_0x5acd1d[_0x4feb31(0x2bd)]){const _0x468a9c='Brave',_0x1b2337=_0x5acd1d['%1AnimationID'[_0x4feb31(0x30a)](_0x468a9c)],_0x3d91d1=_0x5acd1d[_0x4feb31(0x1c1)[_0x4feb31(0x30a)](_0x468a9c)],_0x246193=_0x5acd1d[_0x4feb31(0x247)[_0x4feb31(0x30a)](_0x468a9c)];$gameTemp[_0x4feb31(0x121)]([this],_0x1b2337,_0x3d91d1,_0x246193);}},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x261)]=function(){const _0x3b30f1=_0x20875d;if(this[_0x3b30f1(0x1b1)]['length']<=0x1)return;this['_actions'][_0x3b30f1(0x17e)]();const _0x2bb371=VisuMZ[_0x3b30f1(0x204)][_0x3b30f1(0x1f7)][_0x3b30f1(0x1cb)];if(_0x2bb371[_0x3b30f1(0x113)]){const _0x4449a6='Cancel',_0x363fa9=_0x2bb371[_0x3b30f1(0x227)[_0x3b30f1(0x30a)](_0x4449a6)],_0x2517ef=_0x2bb371[_0x3b30f1(0x1c1)['format'](_0x4449a6)],_0xf02117=_0x2bb371['%1Mute'[_0x3b30f1(0x30a)](_0x4449a6)];$gameTemp[_0x3b30f1(0x121)]([this],_0x363fa9,_0x2517ef,_0xf02117);}},VisuMZ[_0x20875d(0x204)][_0x20875d(0x20f)]=Game_Battler[_0x20875d(0x1ca)]['onTurnEnd'],Game_Battler[_0x20875d(0x1ca)]['onTurnEnd']=function(){const _0x6fb573=_0x20875d;VisuMZ[_0x6fb573(0x204)][_0x6fb573(0x20f)][_0x6fb573(0x1e5)](this),this[_0x6fb573(0x283)]();},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x283)]=function(){const _0x20dd19=_0x20875d;if(!BattleManager[_0x20dd19(0x163)]())return;if(!$gameParty[_0x20dd19(0x1f4)]())return;this[_0x20dd19(0x23f)]();},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x23f)]=function(){const _0xd44be=_0x20875d,_0x53015b=VisuMZ[_0xd44be(0x204)][_0xd44be(0x1f7)][_0xd44be(0x32b)],_0x4edefc=_0x53015b[_0xd44be(0x257)];if(_0x4edefc&&!this['isAlive']())return;const _0x7ddb37=this[_0xd44be(0x14f)]();this[_0xd44be(0x2c3)](_0x7ddb37);},Game_Battler['prototype'][_0x20875d(0x14f)]=function(){const _0x33a26c=_0x20875d,_0x1165e2=VisuMZ[_0x33a26c(0x204)][_0x33a26c(0x2be)],_0x52d211=VisuMZ[_0x33a26c(0x204)][_0x33a26c(0x1f7)][_0x33a26c(0x32b)];let _0x3ca8ad=_0x52d211[_0x33a26c(0x250)]||0x0;const _0x121764=this[_0x33a26c(0x346)]();for(const _0x430c1e of _0x121764){if(!_0x430c1e)continue;const _0x28aa0e=_0x430c1e['note'];_0x28aa0e['match'](_0x1165e2[_0x33a26c(0x325)])&&(_0x3ca8ad+=Number(RegExp['$1']));}return _0x3ca8ad;},Game_Battler['prototype']['processActionFusionsBTB']=function(){const _0x12b3e4=_0x20875d;if(!this[_0x12b3e4(0x244)]())return;if(this[_0x12b3e4(0x105)]()<=0x1)return;if(!this['currentAction']())return;if(!this[_0x12b3e4(0x180)]()[_0x12b3e4(0x14c)]())return;const _0x2bea33=this[_0x12b3e4(0x180)]()[_0x12b3e4(0x1b8)](),_0x1cde0d=_0x2bea33?DataManager[_0x12b3e4(0x1ba)]:DataManager['_btbItemFlexFusion'],_0x226d01=_0x2bea33?DataManager[_0x12b3e4(0x112)]:DataManager['_btbItemStrictFusion'];let _0x4a5539='',_0x849c80=0x0;{const _0x4a0487=this[_0x12b3e4(0x1d5)]();if(_0x4a0487[_0x12b3e4(0x2bf)]>0x0)for(const _0x5c245a of _0x4a0487){if(!_0x5c245a)continue;_0x1cde0d[_0x5c245a]&&_0x1cde0d[_0x5c245a]>=_0x849c80&&(this[_0x12b3e4(0x2ff)](_0x5c245a)&&(_0x4a5539=_0x5c245a,_0x849c80=_0x1cde0d[_0x5c245a]));}}{const _0x465fea=this[_0x12b3e4(0x110)]();if(_0x465fea[_0x12b3e4(0x2bf)]>0x0)for(const _0x4b2550 of _0x465fea){if(!_0x4b2550)continue;_0x226d01[_0x4b2550]&&_0x226d01[_0x4b2550]>=_0x849c80&&(this[_0x12b3e4(0x2ff)](_0x4b2550)&&(_0x4a5539=_0x4b2550,_0x849c80=_0x226d01[_0x4b2550]));}}if(_0x849c80<=0x0)return;this[_0x12b3e4(0x32a)](_0x4a5539),this[_0x12b3e4(0x180)]()[_0x12b3e4(0x10c)](_0x4a5539),_0x2bea33?this[_0x12b3e4(0x180)]()[_0x12b3e4(0x2f2)](_0x849c80):this['currentAction']()[_0x12b3e4(0x1f0)](_0x849c80);},Game_Battler['prototype'][_0x20875d(0x244)]=function(){const _0x21ec1f=_0x20875d;if(this['cannotFusionNotetagBTB']())return![];const _0x1074f5=VisuMZ['BattleSystemBTB'][_0x21ec1f(0x1f7)][_0x21ec1f(0x32b)];if(this['isActor']()){if(_0x1074f5[_0x21ec1f(0x189)]===undefined)return!![];return _0x1074f5[_0x21ec1f(0x189)];}else{if(_0x1074f5[_0x21ec1f(0x2e9)]===undefined)return!![];return _0x1074f5['EnemyActionFusions'];}},Game_BattlerBase[_0x20875d(0x1ca)][_0x20875d(0x22d)]=function(){const _0x3d2ee4=_0x20875d,_0x43b883=VisuMZ[_0x3d2ee4(0x204)][_0x3d2ee4(0x2be)],_0x4cabf9=this[_0x3d2ee4(0x346)]();for(const _0x2cdabe of _0x4cabf9){if(!_0x2cdabe)continue;const _0x4e5d57=_0x2cdabe[_0x3d2ee4(0x2e4)];if(_0x4e5d57[_0x3d2ee4(0x23e)](_0x43b883[_0x3d2ee4(0x161)]))return!![];if(_0x4e5d57[_0x3d2ee4(0x23e)](_0x43b883['EnableFusion']))return![];}return![];},Game_Battler[_0x20875d(0x1ca)]['getFlexActionFusionCombinationsBTB']=function(){const _0x574b7f=_0x20875d,_0x3d8466=this[_0x574b7f(0x180)](),_0x3a588f=this[_0x574b7f(0x1b1)],_0x3a05b5=_0x3a588f[_0x574b7f(0x228)](_0x380f2c=>this[_0x574b7f(0x258)](_0x3d8466,_0x380f2c)),_0x5100ba=_0x3a05b5[_0x574b7f(0x230)](_0x33315a=>_0x33315a[_0x574b7f(0x14c)]()['id']);_0x5100ba[_0x574b7f(0x15d)](_0x3d8466[_0x574b7f(0x14c)]()['id']),_0x5100ba[_0x574b7f(0x307)]((_0x5c3720,_0x2802c6)=>_0x5c3720-_0x2802c6);const _0x27096c=VisuMZ[_0x574b7f(0x204)][_0x574b7f(0x144)](_0x5100ba);return _0x27096c[_0x574b7f(0x228)]((_0x251eb7,_0x176134,_0x2a9cb8)=>_0x2a9cb8[_0x574b7f(0x31e)](_0x251eb7)===_0x176134);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x144)]=function(_0x44065a){const _0x33634d=_0x20875d;_0x44065a['sort']((_0x50e883,_0x3beb98)=>_0x50e883-_0x3beb98);const _0x4a4c12=[],_0x2c728a=function(_0x99a28d,_0x53ac76){const _0x4c7a3f=_0x1af5;_0x53ac76[_0x4c7a3f(0x2bf)]>=0x2&&_0x4a4c12[_0x4c7a3f(0x15d)](_0x53ac76['join']('-'));for(let _0x37caf2=_0x99a28d;_0x37caf2<_0x44065a['length'];_0x37caf2++){_0x2c728a(_0x37caf2+0x1,[..._0x53ac76,_0x44065a[_0x37caf2]]);}};return _0x2c728a(0x0,[]),_0x4a4c12[_0x33634d(0x307)](),_0x4a4c12['filter']((_0x5aff7e,_0x10ae03,_0x533b1f)=>_0x533b1f[_0x33634d(0x31e)](_0x5aff7e)===_0x10ae03);},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x110)]=function(){const _0x599393=_0x20875d,_0xd316c6=this[_0x599393(0x180)](),_0x43ad04=this[_0x599393(0x1b1)],_0x4d5356=[];let _0x2c2f84=String(_0xd316c6[_0x599393(0x14c)]()['id']);for(let _0x259adc=0x1;_0x259adc<_0x43ad04[_0x599393(0x2bf)];_0x259adc++){const _0x12727c=_0x43ad04[_0x259adc];if(this[_0x599393(0x258)](_0xd316c6,_0x12727c))_0x2c2f84=_0x599393(0x190)[_0x599393(0x30a)](_0x2c2f84,_0x12727c[_0x599393(0x14c)]()['id']),_0x4d5356[_0x599393(0x15d)](_0x2c2f84);else break;}return _0x4d5356[_0x599393(0x228)]((_0x453959,_0x57f5a4,_0x169b06)=>_0x169b06[_0x599393(0x31e)](_0x453959)===_0x57f5a4);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x296)]=function(_0x4df442,_0x399d30){const _0x372de8=[],_0x12b2b7=function(_0x3e8dfc,_0x265c1e){const _0x3f9771=_0x1af5;for(var _0x223f3e=0x0;_0x223f3e<_0x265c1e[_0x3f9771(0x2bf)];_0x223f3e++){_0x372de8[_0x3f9771(0x15d)](_0x3e8dfc+'-'+_0x265c1e[_0x223f3e]),_0x12b2b7(_0x3e8dfc+'-'+_0x265c1e[_0x223f3e],_0x265c1e['slice'](_0x223f3e+0x1));}};return _0x12b2b7(_0x4df442,_0x399d30),_0x372de8;},Game_Battler['prototype'][_0x20875d(0x258)]=function(_0x2700df,_0xce22a8){const _0x60d87c=_0x20875d;if(!_0x2700df||!_0xce22a8)return![];if(_0x2700df===_0xce22a8)return![];if(!_0x2700df[_0x60d87c(0x14c)]()||!_0xce22a8['item']())return![];if(_0x2700df[_0x60d87c(0x1b8)]()!==_0xce22a8['isSkill']())return![];return!![];},Game_Battler[_0x20875d(0x1ca)][_0x20875d(0x2ff)]=function(_0x52ed3b){const _0xf2246a=_0x20875d,_0x296440=this[_0xf2246a(0x180)]()[_0xf2246a(0x1b8)](),_0x5f324a=JsonEx['makeDeepCopy'](this);_0x5f324a['_tempBattler']=!![],_0x5f324a[_0xf2246a(0x180)]()[_0xf2246a(0x10c)](_0x52ed3b);const _0x743f10=JsonEx[_0xf2246a(0x29b)]($gameParty[_0xf2246a(0x26b)]),_0x30108d=JsonEx[_0xf2246a(0x29b)]($gameParty['_weapons']),_0x5ee183=JsonEx[_0xf2246a(0x29b)]($gameParty[_0xf2246a(0x31d)]);let _0x413bd2=_0x296440?_0x5f324a[_0xf2246a(0x2de)]():_0x5f324a['btbPayItemFusionCosts']();return $gameParty[_0xf2246a(0x26b)]=_0x743f10,$gameParty[_0xf2246a(0x152)]=_0x30108d,$gameParty[_0xf2246a(0x31d)]=_0x5ee183,_0x413bd2;},Game_Battler['prototype'][_0x20875d(0x32a)]=function(_0x499522){const _0x3eea5a=_0x20875d,_0x45e3da=this[_0x3eea5a(0x180)](),_0x47be88=_0x499522[_0x3eea5a(0x141)]('-')[_0x3eea5a(0x230)](_0x568ccb=>Number(_0x568ccb)),_0x409709=_0x47be88[_0x3eea5a(0x31e)](_0x45e3da[_0x3eea5a(0x14c)]()['id']);_0x47be88[_0x3eea5a(0x326)](_0x409709,0x1);const _0x2526ab=this[_0x3eea5a(0x1b1)],_0x284334=[];for(const _0x1fa92d of _0x2526ab){this[_0x3eea5a(0x258)](_0x45e3da,_0x1fa92d)&&(_0x47be88[_0x3eea5a(0x12e)](_0x1fa92d['item']()['id'])&&(_0x284334[_0x3eea5a(0x15d)](_0x1fa92d),_0x47be88['splice'](_0x47be88[_0x3eea5a(0x31e)](_0x1fa92d[_0x3eea5a(0x14c)]()['id']),0x1)));}for(const _0x155d36 of _0x284334){_0x2526ab['remove'](_0x155d36);}},Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x226)]=function(_0x2801d3){const _0x53f846=_0x20875d;Game_Battler[_0x53f846(0x1ca)]['setBravePoints'][_0x53f846(0x1e5)](this,_0x2801d3);if(!SceneManager[_0x53f846(0x225)]())return;if(!BattleManager[_0x53f846(0x14b)]()[_0x53f846(0x12e)](this))return;BattleManager[_0x53f846(0x179)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x18f)]=Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x321)],Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x321)]=function(){const _0x972a5b=_0x20875d;VisuMZ[_0x972a5b(0x204)][_0x972a5b(0x18f)][_0x972a5b(0x1e5)](this),BattleManager[_0x972a5b(0x163)]()&&this['bravePoints']()<0x0&&this[_0x972a5b(0x305)]();},Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x1f1)]=function(){const _0x5b136e=_0x20875d,_0x6d80a0=this[_0x5b136e(0x12d)]()[_0x5b136e(0x2e4)];if(_0x6d80a0[_0x5b136e(0x23e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x6d80a0['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x5b136e(0x2e8);}return Window_BTB_TurnOrder[_0x5b136e(0x1f7)][_0x5b136e(0x24b)];},Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x17b)]=function(){const _0x54fc4e=_0x20875d,_0x1190f7=this['actor']()[_0x54fc4e(0x2e4)];if(_0x1190f7['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x54fc4e(0x1b4)]();},Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x143)]=function(){const _0x4027a8=_0x20875d,_0x269654=this[_0x4027a8(0x12d)]()['note'];if(_0x269654[_0x4027a8(0x23e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x4027a8(0x1b2)]();},Game_Actor['prototype']['createTurnOrderBTBGraphicIconIndex']=function(){const _0xa09301=_0x20875d,_0x4179d6=this[_0xa09301(0x12d)]()[_0xa09301(0x2e4)];if(_0x4179d6[_0xa09301(0x23e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0xa09301(0x1f7)][_0xa09301(0x1ac)];},Game_Actor[_0x20875d(0x1ca)][_0x20875d(0x258)]=function(_0x7c6c00,_0x1c731e){const _0x4ac2f0=_0x20875d;if(!Game_Battler[_0x4ac2f0(0x1ca)][_0x4ac2f0(0x258)]['call'](this,_0x7c6c00,_0x1c731e))return![];if(_0x7c6c00[_0x4ac2f0(0x294)]()&&_0x1c731e[_0x4ac2f0(0x294)]()){if(_0x7c6c00['isForFriend']()!==_0x1c731e[_0x4ac2f0(0x2af)]())return![];if(_0x7c6c00[_0x4ac2f0(0x335)]!==_0x1c731e[_0x4ac2f0(0x335)])return![];}return!![];},Game_Enemy['prototype'][_0x20875d(0x1f1)]=function(){const _0x120df7=_0x20875d,_0x482b05=this['enemy']()[_0x120df7(0x2e4)];if(_0x482b05['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x482b05[_0x120df7(0x23e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x120df7(0x2e8);}return Window_BTB_TurnOrder[_0x120df7(0x1f7)]['EnemyBattlerType'];},Game_Enemy[_0x20875d(0x1ca)][_0x20875d(0x17b)]=function(){const _0x106ffb=_0x20875d,_0x44b590=this[_0x106ffb(0x2c5)]()['note'];if(_0x44b590[_0x106ffb(0x23e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x106ffb(0x1f7)][_0x106ffb(0x31b)];},Game_Enemy[_0x20875d(0x1ca)][_0x20875d(0x143)]=function(){const _0x26cba6=_0x20875d,_0x305ca2=this[_0x26cba6(0x2c5)]()[_0x26cba6(0x2e4)];if(_0x305ca2[_0x26cba6(0x23e)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder[_0x26cba6(0x1f7)]['EnemyBattlerFaceIndex'];},Game_Enemy['prototype'][_0x20875d(0x205)]=function(){const _0x3e200e=_0x20875d,_0x305a3e=this[_0x3e200e(0x2c5)]()['note'];if(_0x305a3e[_0x3e200e(0x23e)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings']['EnemyBattlerIcon'];},VisuMZ[_0x20875d(0x204)][_0x20875d(0x27f)]=Game_Enemy[_0x20875d(0x1ca)][_0x20875d(0x321)],Game_Enemy[_0x20875d(0x1ca)]['makeActions']=function(){const _0x5ad11b=_0x20875d;VisuMZ[_0x5ad11b(0x204)]['Game_Enemy_makeActions'][_0x5ad11b(0x1e5)](this),this[_0x5ad11b(0x343)](),this[_0x5ad11b(0x1de)]();},Game_Enemy[_0x20875d(0x1ca)][_0x20875d(0x343)]=function(){const _0x57ce8e=_0x20875d;if(!BattleManager['isBTB']())return;if(this['numActions']()<=0x0)return;this[_0x57ce8e(0x20d)]=![],this[_0x57ce8e(0x181)]()<0x0&&this[_0x57ce8e(0x305)]();},Game_Enemy[_0x20875d(0x1ca)][_0x20875d(0x1de)]=function(){const _0x298b66=_0x20875d;if(!BattleManager[_0x298b66(0x163)]())return;if(this['numActions']()<=0x0)return;const _0x69bf1d=this[_0x298b66(0x1b1)][0x0];if(!_0x69bf1d)return;const _0x59cb0e=_0x69bf1d[_0x298b66(0x14c)]();if(!_0x59cb0e)return;const _0x504a5a=VisuMZ[_0x298b66(0x204)]['RegExp'],_0x32d72e=_0x59cb0e[_0x298b66(0x2e4)];let _0x19a841=[];if(_0x32d72e['match'](_0x504a5a[_0x298b66(0x195)])){const _0x55edfd=String(RegExp['$1'])[_0x298b66(0x141)](',');for(let _0x4508e4 of _0x55edfd){_0x4508e4=(String(_0x4508e4)||'')[_0x298b66(0xee)]();const _0x469c6f=/^\d+$/[_0x298b66(0x2c8)](_0x4508e4);_0x469c6f?_0x19a841[_0x298b66(0x15d)](Number(_0x4508e4)):_0x19a841[_0x298b66(0x15d)](DataManager[_0x298b66(0x18c)](_0x4508e4));}}if(_0x19a841['length']<=0x0)return;while(_0x19a841[_0x298b66(0x2bf)]>this[_0x298b66(0x11b)]()){_0x19a841[_0x298b66(0x17e)]();}if(_0x19a841[_0x298b66(0x2bf)]<=0x0)return;this[_0x298b66(0x305)]();for(const _0x2c744e of _0x19a841){const _0x500114=new Game_Action(this);_0x500114[_0x298b66(0x2f2)](_0x2c744e),_0x500114[_0x298b66(0x290)]=!![],this[_0x298b66(0x1b1)]['push'](_0x500114);}},Game_Enemy['prototype'][_0x20875d(0x18e)]=function(){const _0x49bf7c=_0x20875d;let _0x298fb4=this[_0x49bf7c(0x105)]();for(const _0x56a038 of this[_0x49bf7c(0x1b1)]){if(!_0x56a038)continue;_0x298fb4+=_0x56a038[_0x49bf7c(0x1d8)]();}return _0x298fb4-0x1;},VisuMZ[_0x20875d(0x204)]['Game_Unit_makeActions']=Game_Unit[_0x20875d(0x1ca)][_0x20875d(0x321)],Game_Unit['prototype'][_0x20875d(0x321)]=function(){const _0x372f4a=_0x20875d;VisuMZ[_0x372f4a(0x204)][_0x372f4a(0x260)][_0x372f4a(0x1e5)](this),BattleManager[_0x372f4a(0x163)]()&&this===$gameTroop&&SceneManager['isSceneBattle']()&&BattleManager[_0x372f4a(0x2c9)]();},VisuMZ['BattleSystemBTB'][_0x20875d(0xf3)]=Game_Party['prototype'][_0x20875d(0x1f2)],Game_Party[_0x20875d(0x1ca)][_0x20875d(0x1f2)]=function(_0x26db05){const _0x4acfdd=_0x20875d;VisuMZ[_0x4acfdd(0x204)]['Game_Party_removeActor'][_0x4acfdd(0x1e5)](this,_0x26db05),SceneManager[_0x4acfdd(0x225)]()&&BattleManager['isBTB']()&&BattleManager[_0x4acfdd(0xfb)][_0x4acfdd(0x2a8)]($gameActors[_0x4acfdd(0x12d)](_0x26db05));},VisuMZ[_0x20875d(0x204)][_0x20875d(0x32f)]=Scene_Battle['prototype'][_0x20875d(0x21c)],Scene_Battle[_0x20875d(0x1ca)]['onDisabledPartyCommandSelection']=function(){const _0x39b450=_0x20875d;BattleManager[_0x39b450(0x163)]()?this['selectNextCommand']():VisuMZ['BattleSystemBTB']['Scene_Battle_onDisabledPartyCommandSelection'][_0x39b450(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x153)]=Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0x171)],Scene_Battle['prototype']['createActorCommandWindow']=function(){const _0x2854ba=_0x20875d;VisuMZ[_0x2854ba(0x204)]['Scene_Battle_createActorCommandWindow'][_0x2854ba(0x1e5)](this),this[_0x2854ba(0x232)]();},Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0x232)]=function(){const _0x399dd5=_0x20875d;if(!BattleManager['isBTB']())return;const _0x38cd1e=this[_0x399dd5(0x301)];if(!_0x38cd1e)return;_0x38cd1e[_0x399dd5(0x2cb)](_0x399dd5(0x286),this['commandBrave']['bind'](this)),_0x38cd1e['setHandler'](_0x399dd5(0x251),this[_0x399dd5(0xfc)][_0x399dd5(0x259)](this));},Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0x103)]=function(){const _0x1c25a1=_0x20875d;this[_0x1c25a1(0x126)]();},Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0xfc)]=function(){const _0xec0da4=_0x20875d,_0x1ef667=BattleManager[_0xec0da4(0x12d)]();if(!_0x1ef667)this[_0xec0da4(0x222)]();else{if(_0x1ef667[_0xec0da4(0x105)]()<=0x1)this['commandCancel']();else _0x1ef667['_actionInputIndex']>0x0?this[_0xec0da4(0x222)]():this[_0xec0da4(0x324)]();}},Scene_Battle['prototype'][_0x20875d(0x126)]=function(){const _0xa41e95=_0x20875d,_0x283590=BattleManager['actor']();if(!_0x283590)return;_0x283590[_0xa41e95(0x126)]();const _0x13a872=this['_actorCommandWindow'][_0xa41e95(0x23a)],_0x4d13f4=this['_actorCommandWindow'][_0xa41e95(0x30e)],_0x204615=this[_0xa41e95(0x301)]['index']();this['_actorCommandWindow'][_0xa41e95(0x183)](_0x283590),this[_0xa41e95(0x301)]['select'](_0x204615),this[_0xa41e95(0x301)][_0xa41e95(0x23a)]=_0x13a872,this[_0xa41e95(0x301)]['_scrollY']=_0x4d13f4;},Scene_Battle[_0x20875d(0x1ca)]['reduceBrave']=function(){const _0x40ff1f=_0x20875d,_0x404025=BattleManager['actor']();if(!_0x404025)return;_0x404025[_0x40ff1f(0x261)]();const _0xc8dc86=this[_0x40ff1f(0x301)][_0x40ff1f(0x23a)],_0x17a309=this[_0x40ff1f(0x301)][_0x40ff1f(0x30e)],_0x29d774=this[_0x40ff1f(0x301)][_0x40ff1f(0x1b3)]();this['_actorCommandWindow'][_0x40ff1f(0x183)](_0x404025),this['_actorCommandWindow'][_0x40ff1f(0x150)](_0x29d774),this[_0x40ff1f(0x301)][_0x40ff1f(0x23a)]=_0xc8dc86,this['_actorCommandWindow'][_0x40ff1f(0x30e)]=_0x17a309;},VisuMZ[_0x20875d(0x204)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0xfa)],Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0xfa)]=function(){const _0x40efa5=_0x20875d;VisuMZ[_0x40efa5(0x204)]['Scene_Battle_createAllWindows']['call'](this),this[_0x40efa5(0x32e)]();},Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0x32e)]=function(){const _0x5acc0b=_0x20875d;if(!BattleManager[_0x5acc0b(0x163)]())return;this[_0x5acc0b(0x111)]=new Window_BTB_TurnOrder();const _0x35321e=this[_0x5acc0b(0x282)](this[_0x5acc0b(0x233)]);this[_0x5acc0b(0x256)](this[_0x5acc0b(0x111)],_0x35321e),this[_0x5acc0b(0x120)](),BattleManager[_0x5acc0b(0x1e6)](!![]);},Scene_Battle[_0x20875d(0x1ca)][_0x20875d(0x120)]=function(){const _0x50f4b7=_0x20875d,_0x37626e=Window_BTB_TurnOrder[_0x50f4b7(0x1f7)];if(_0x37626e[_0x50f4b7(0x2d1)]!==_0x50f4b7(0x327))return;if(!_0x37626e[_0x50f4b7(0x12c)])return;if(!this[_0x50f4b7(0x300)])return;const _0x1535de=this[_0x50f4b7(0x111)]['y']-Math[_0x50f4b7(0x213)]((Graphics[_0x50f4b7(0x2df)]-Graphics[_0x50f4b7(0x178)])/0x2),_0xdac6bc=_0x1535de+this[_0x50f4b7(0x111)][_0x50f4b7(0x2df)];this[_0x50f4b7(0x300)]['y']=_0xdac6bc+_0x37626e[_0x50f4b7(0x32d)];};function Sprite_BTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]=Object[_0x20875d(0x255)](Sprite_Clickable[_0x20875d(0x1ca)]),Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x107)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x2f8)]=function(_0x45fbeb,_0x129fa8){const _0x227fac=_0x20875d;this[_0x227fac(0x2f9)](_0x45fbeb,_0x129fa8),Sprite_Clickable[_0x227fac(0x1ca)][_0x227fac(0x2f8)][_0x227fac(0x1e5)](this),this[_0x227fac(0x2bb)]=0x0,this[_0x227fac(0x287)](),this['checkOpacity']();},Sprite_BTB_TurnOrder_Battler['prototype']['initMembers']=function(_0x3121a7,_0x370b8a){const _0x421843=_0x20875d;this[_0x421843(0x340)]=_0x3121a7,this[_0x421843(0x1c5)]=_0x370b8a;const _0x44fdff=Window_BTB_TurnOrder[_0x421843(0x1f7)],_0x20cfe0=this[_0x421843(0x129)](),_0x268c53=this[_0x421843(0x212)]();this[_0x421843(0x2a3)]=0x0,this[_0x421843(0x2dc)]=_0x20cfe0?_0x44fdff[_0x421843(0x2cc)]*_0x268c53:0x0,this[_0x421843(0x1dc)]=_0x20cfe0?0x0:_0x44fdff[_0x421843(0x2cc)]*_0x268c53,this[_0x421843(0x252)]=0x0,this['_fadeTarget']=0xff,this[_0x421843(0x243)]=![],this[_0x421843(0x1bd)]=![],this[_0x421843(0x24c)]=0x0,this[_0x421843(0x238)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['createChildren']=function(){const _0x5c316e=_0x20875d;this[_0x5c316e(0x135)](),this[_0x5c316e(0x11a)](),this['createGraphicSprite'](),this[_0x5c316e(0x229)](),this[_0x5c316e(0x1fb)]();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x135)]=function(){const _0x3c79e7=_0x20875d;this['x']=this[_0x3c79e7(0x2dc)],this['y']=this[_0x3c79e7(0x1dc)];},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['isHorz']=function(){const _0x41c96b=_0x20875d,_0x239f51=Window_BTB_TurnOrder[_0x41c96b(0x1f7)],_0x1a361e=['top',_0x41c96b(0x16b)][_0x41c96b(0x12e)](_0x239f51[_0x41c96b(0x2d1)]);return _0x1a361e;},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x156)]=function(){const _0x3529d0=_0x20875d,_0x4186bc=Window_BTB_TurnOrder['Settings'];return this[_0x3529d0(0x129)]()?_0x4186bc[_0x3529d0(0x2cc)]:_0x4186bc[_0x3529d0(0x1a7)];},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x1ef)]=function(){const _0x4dc70a=_0x20875d,_0x82a206=Window_BTB_TurnOrder[_0x4dc70a(0x1f7)];return this[_0x4dc70a(0x129)]()?_0x82a206['SpriteLength']:_0x82a206[_0x4dc70a(0x2cc)];},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['createTestBitmap']=function(){const _0x5b2ad2=_0x20875d;this[_0x5b2ad2(0x1db)]=new Bitmap(0x48,0x24);const _0x5ac5ca=this[_0x5b2ad2(0x28e)]()?this[_0x5b2ad2(0x28e)]()[_0x5b2ad2(0x175)]():'%1\x20%2\x20%3'[_0x5b2ad2(0x30a)](this[_0x5b2ad2(0x340)],this['_index']);this[_0x5b2ad2(0x1db)][_0x5b2ad2(0xf2)](_0x5ac5ca,0x0,0x0,0x48,0x24,_0x5b2ad2(0x2f6));},Sprite_BTB_TurnOrder_Battler['prototype']['createBackgroundSprite']=function(){const _0x4b3d9d=_0x20875d;if(!Window_BTB_TurnOrder[_0x4b3d9d(0x1f7)][_0x4b3d9d(0xe6)])return;const _0x1a1272=Window_BTB_TurnOrder[_0x4b3d9d(0x1f7)],_0x20316b=this[_0x4b3d9d(0x340)]===$gameParty?_0x4b3d9d(0x193):_0x4b3d9d(0x2ad),_0x1b579e=_0x4b3d9d(0x30b)[_0x4b3d9d(0x30a)](_0x20316b),_0x5e4b74=new Sprite();_0x5e4b74['anchor']['x']=this[_0x4b3d9d(0x1a0)]['x'],_0x5e4b74[_0x4b3d9d(0x1a0)]['y']=this['anchor']['y'];if(_0x1a1272[_0x1b579e])_0x5e4b74['bitmap']=ImageManager[_0x4b3d9d(0x2e7)](_0x1a1272[_0x1b579e]);else{const _0x3fbc5a=this[_0x4b3d9d(0x156)](),_0x179a84=this[_0x4b3d9d(0x1ef)]();_0x5e4b74[_0x4b3d9d(0x1db)]=new Bitmap(_0x3fbc5a,_0x179a84);const _0x278762=ColorManager['getColor'](_0x1a1272[_0x4b3d9d(0x328)[_0x4b3d9d(0x30a)](_0x20316b)]),_0xe04d43=ColorManager[_0x4b3d9d(0x2b2)](_0x1a1272[_0x4b3d9d(0x1f6)[_0x4b3d9d(0x30a)](_0x20316b)]);_0x5e4b74[_0x4b3d9d(0x1db)]['gradientFillRect'](0x0,0x0,_0x3fbc5a,_0x179a84,_0x278762,_0xe04d43,!![]);}this['_backgroundSprite']=_0x5e4b74,this[_0x4b3d9d(0x208)](this[_0x4b3d9d(0x249)]);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x273)]=function(){const _0x38f7cc=_0x20875d,_0x416713=new Sprite();_0x416713[_0x38f7cc(0x1a0)]['x']=this[_0x38f7cc(0x1a0)]['x'],_0x416713[_0x38f7cc(0x1a0)]['y']=this[_0x38f7cc(0x1a0)]['y'],this[_0x38f7cc(0x272)]=_0x416713,this['addChild'](this[_0x38f7cc(0x272)]),this['processUpdateGraphic']();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x229)]=function(){const _0x424448=_0x20875d;if(!Window_BTB_TurnOrder[_0x424448(0x1f7)][_0x424448(0x2c7)])return;const _0x5a9858=Window_BTB_TurnOrder[_0x424448(0x1f7)],_0x1a116e=this[_0x424448(0x340)]===$gameParty?'Actor':_0x424448(0x2ad),_0x2652ac=_0x424448(0x16a)[_0x424448(0x30a)](_0x1a116e),_0x2c24d4=new Sprite();_0x2c24d4['anchor']['x']=this['anchor']['x'],_0x2c24d4[_0x424448(0x1a0)]['y']=this['anchor']['y'];if(_0x5a9858[_0x2652ac])_0x2c24d4[_0x424448(0x1db)]=ImageManager['loadSystem'](_0x5a9858[_0x2652ac]);else{let _0x41905e=this[_0x424448(0x156)](),_0xb1c6a9=this[_0x424448(0x1ef)](),_0x188dde=_0x5a9858['BorderThickness'];_0x2c24d4[_0x424448(0x1db)]=new Bitmap(_0x41905e,_0xb1c6a9);const _0x102cf7='#000000',_0x478a96=ColorManager[_0x424448(0x2b2)](_0x5a9858[_0x424448(0x19b)[_0x424448(0x30a)](_0x1a116e)]);_0x2c24d4[_0x424448(0x1db)][_0x424448(0x216)](0x0,0x0,_0x41905e,_0xb1c6a9,_0x102cf7),_0x41905e-=0x2,_0xb1c6a9-=0x2,_0x2c24d4[_0x424448(0x1db)]['fillRect'](0x1,0x1,_0x41905e,_0xb1c6a9,_0x478a96),_0x41905e-=_0x188dde*0x2,_0xb1c6a9-=_0x188dde*0x2,_0x2c24d4[_0x424448(0x1db)][_0x424448(0x216)](0x1+_0x188dde,0x1+_0x188dde,_0x41905e,_0xb1c6a9,_0x102cf7),_0x41905e-=0x2,_0xb1c6a9-=0x2,_0x188dde+=0x1,_0x2c24d4[_0x424448(0x1db)][_0x424448(0x10b)](0x1+_0x188dde,0x1+_0x188dde,_0x41905e,_0xb1c6a9);}this[_0x424448(0x249)]=_0x2c24d4,this['addChild'](this[_0x424448(0x249)]),this[_0x424448(0x330)]=this['_backgroundSprite'][_0x424448(0x330)],this[_0x424448(0x2df)]=this[_0x424448(0x249)][_0x424448(0x2df)];},Sprite_BTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x56b458=_0x20875d,_0x499abf=Window_BTB_TurnOrder[_0x56b458(0x1f7)];if(!_0x499abf['EnemyBattlerDrawLetter'])return;if(this[_0x56b458(0x340)]===$gameParty)return;const _0x416961=this['bitmapWidth'](),_0x415053=this[_0x56b458(0x1ef)](),_0x338a9e=new Sprite();_0x338a9e['anchor']['x']=this[_0x56b458(0x1a0)]['x'],_0x338a9e[_0x56b458(0x1a0)]['y']=this[_0x56b458(0x1a0)]['y'],_0x338a9e[_0x56b458(0x1db)]=new Bitmap(_0x416961,_0x415053),this['_letterSprite']=_0x338a9e,this[_0x56b458(0x208)](this[_0x56b458(0xe7)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x20875d(0x28e)]=function(){const _0x40567b=_0x20875d;return this[_0x40567b(0x340)]?this[_0x40567b(0x340)][_0x40567b(0x1b0)]()[this[_0x40567b(0x1c5)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x2ed)]=function(){const _0x2cfac5=_0x20875d;Sprite_Clickable['prototype']['update'][_0x2cfac5(0x1e5)](this),this[_0x2cfac5(0x21d)](),this[_0x2cfac5(0x1da)](),this['checkOpacity'](),this['updateOpacity'](),this[_0x2cfac5(0x170)](),this[_0x2cfac5(0xf4)](),this[_0x2cfac5(0x17f)](),this[_0x2cfac5(0x23b)]();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x21d)]=function(){const _0x14e1b5=_0x20875d,_0x5a51a1=this[_0x14e1b5(0x188)]();if(this['_position']===_0x5a51a1)return;this['_position']=_0x5a51a1;this[_0x14e1b5(0x2bb)]<0xff&&this[_0x14e1b5(0x28e)]()&&_0x5a51a1!==this['defaultPosition']()&&this[_0x14e1b5(0x1ad)](0xff);if(_0x5a51a1===this[_0x14e1b5(0x212)]()&&this[_0x14e1b5(0x252)]<=0x0&&this['opacity']>0x0)this[_0x14e1b5(0x1ad)](0x0);else this[_0x14e1b5(0x252)]<=0x0&&this[_0x14e1b5(0x2bb)]<0xff&&this[_0x14e1b5(0x20a)]();this[_0x14e1b5(0x2dd)]();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x1d9)]=function(){const _0x29105c=_0x20875d,_0x1483a0=this[_0x29105c(0x125)]();if(!_0x1483a0)return;let _0x3e4c93=![];if(this[_0x29105c(0x24c)]!==_0x1483a0[_0x29105c(0x330)])_0x3e4c93=!![];else this[_0x29105c(0x238)]!==_0x1483a0['height']&&(_0x3e4c93=!![]);_0x3e4c93&&this['calculateTargetPositions']();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['calculateTargetPositions']=function(){const _0x55a52d=_0x20875d,_0x553be4=Window_BTB_TurnOrder['Settings'],_0x39c480=this[_0x55a52d(0x129)](),_0x444f4a=_0x553be4[_0x55a52d(0x254)],_0x5cfea7=_0x553be4[_0x55a52d(0x336)],_0x402b9b=SceneManager[_0x55a52d(0x203)]['_btbTurnOrderWindow'];if(!_0x402b9b)return;const _0x31e2c1=this[_0x55a52d(0x188)]();this[_0x55a52d(0x2a3)]=_0x553be4[_0x55a52d(0x25f)],this[_0x55a52d(0x2dc)]=_0x39c480?_0x553be4[_0x55a52d(0x2cc)]*_0x31e2c1:0x0,this[_0x55a52d(0x1dc)]=_0x39c480?0x0:_0x553be4['SpriteThin']*_0x31e2c1,_0x31e2c1>0x0&&(this[_0x55a52d(0x2dc)]+=_0x39c480?_0x5cfea7:0x0,this[_0x55a52d(0x1dc)]+=_0x39c480?0x0:_0x5cfea7),_0x444f4a?this[_0x55a52d(0x2dc)]=_0x39c480?_0x402b9b[_0x55a52d(0x330)]-this[_0x55a52d(0x2dc)]-_0x553be4[_0x55a52d(0x2cc)]:0x0:this[_0x55a52d(0x1dc)]=_0x39c480?0x0:_0x402b9b['height']-this[_0x55a52d(0x1dc)]-_0x553be4[_0x55a52d(0x2cc)];},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x1da)]=function(){const _0x23b68f=_0x20875d;if(this[_0x23b68f(0x252)]>0x0)return;if(this['_positionDuration']>0x0){const _0x5eb523=this[_0x23b68f(0x2a3)];this['x']=(this['x']*(_0x5eb523-0x1)+this['_positionTargetX'])/_0x5eb523,this['y']=(this['y']*(_0x5eb523-0x1)+this[_0x23b68f(0x1dc)])/_0x5eb523,this[_0x23b68f(0x2a3)]--;}if(this[_0x23b68f(0x2a3)]<=0x0){this['x']=this[_0x23b68f(0x2dc)],this['y']=this[_0x23b68f(0x1dc)];if(this[_0x23b68f(0x2bb)]<0xff&&!this[_0x23b68f(0x2db)]&&this[_0x23b68f(0x252)]<=0x0){const _0x4faaed=this[_0x23b68f(0x28e)]();_0x4faaed&&(this[_0x23b68f(0x1e9)]=_0x4faaed[_0x23b68f(0x24f)]()&&_0x4faaed[_0x23b68f(0x1bb)]()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['defaultPosition']=function(){const _0x3f4803=_0x20875d,_0x2af035=Window_BTB_TurnOrder[_0x3f4803(0x1f7)],_0x29957a=this[_0x3f4803(0x129)]()?_0x2af035[_0x3f4803(0x280)]:_0x2af035[_0x3f4803(0x13b)];return _0x29957a+0x1;},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x125)]=function(){const _0x362962=_0x20875d;return SceneManager[_0x362962(0x203)]['_btbTurnOrderWindow'];},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x188)]=function(){const _0x442b64=_0x20875d,_0x1508cb=this[_0x442b64(0x28e)]();if(!_0x1508cb)return this[_0x442b64(0x212)]();if(_0x1508cb===BattleManager['_subject'])return 0x0;if(BattleManager[_0x442b64(0xfb)][_0x442b64(0x12e)](_0x1508cb)){const _0x376b1c=BattleManager[_0x442b64(0xfb)][_0x442b64(0x31e)](_0x1508cb)+0x1;return _0x376b1c;}return this[_0x442b64(0x212)]();},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x1ad)]=function(_0x2e8ff4){const _0x377972=_0x20875d,_0x456d14=Window_BTB_TurnOrder[_0x377972(0x1f7)];this[_0x377972(0x252)]=_0x456d14['UpdateFrames'],this[_0x377972(0x1e9)]=_0x2e8ff4;},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['checkOpacity']=function(){const _0x3cac36=_0x20875d,_0x49cdc8=this[_0x3cac36(0x28e)]();if(!_0x49cdc8)return;if(this['_isAlive']===_0x49cdc8[_0x3cac36(0x24f)]()&&this[_0x3cac36(0x1bd)]===_0x49cdc8['isAppeared']())return;this[_0x3cac36(0x243)]=_0x49cdc8[_0x3cac36(0x24f)](),this[_0x3cac36(0x1bd)]=_0x49cdc8['isAppeared']();let _0x540177=this[_0x3cac36(0x243)]&&this[_0x3cac36(0x1bd)]?0xff:0x0;this['startFade'](_0x540177);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x20875d(0x118)]=function(){const _0xe7fcc8=_0x20875d;if(this['_fadeDuration']>0x0){const _0x1099bd=this[_0xe7fcc8(0x252)];this['opacity']=(this[_0xe7fcc8(0x2bb)]*(_0x1099bd-0x1)+this[_0xe7fcc8(0x1e9)])/_0x1099bd,this[_0xe7fcc8(0x252)]--,this[_0xe7fcc8(0x252)]<=0x0&&(this[_0xe7fcc8(0x21d)](),this[_0xe7fcc8(0x2a3)]=0x0,this[_0xe7fcc8(0x1da)](),this[_0xe7fcc8(0x2bb)]=this['_fadeTarget']);}if(this[_0xe7fcc8(0x2db)])return;BattleManager[_0xe7fcc8(0x320)]==='battleEnd'&&(this[_0xe7fcc8(0x2db)]=!![],this[_0xe7fcc8(0x1ad)](0x0));},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x170)]=function(){const _0x238443=_0x20875d,_0x14449c=this[_0x238443(0x28e)]();if(!_0x14449c)return;const _0x18e6e0=Window_BTB_TurnOrder[_0x238443(0x1f7)],_0x4632e3=this[_0x238443(0x340)]===$gameParty?_0x238443(0x193):_0x238443(0x2ad);let _0x19e3e6=_0x14449c[_0x238443(0x33f)]();if(_0x14449c[_0x238443(0x29f)]()&&_0x19e3e6===_0x238443(0x2c5))_0x19e3e6=_0x238443(0x2e3);else _0x14449c[_0x238443(0x148)]()&&_0x19e3e6===_0x238443(0x1be)&&(_0x19e3e6='enemy');if(this['_graphicType']!==_0x19e3e6)return this[_0x238443(0x295)]();switch(this['_graphicType']){case'face':if(this[_0x238443(0xf0)]!==_0x14449c['TurnOrderBTBGraphicFaceName']())return this[_0x238443(0x295)]();if(this[_0x238443(0x15c)]!==_0x14449c[_0x238443(0x2a7)]())return this['processUpdateGraphic']();break;case _0x238443(0x2e8):if(this['_graphicIconIndex']!==_0x14449c[_0x238443(0x20c)]())return this[_0x238443(0x295)]();break;case _0x238443(0x2c5):if(_0x14449c[_0x238443(0x15e)]()){if(this['_graphicSv']!==_0x14449c[_0x238443(0x1ea)]())return this[_0x238443(0x295)]();}else{if(this['_graphicEnemy']!==_0x14449c[_0x238443(0x13f)]())return this[_0x238443(0x295)]();}break;case _0x238443(0x1be):if(_0x14449c['isActor']()){if(this[_0x238443(0x266)]!==_0x14449c['battlerName']())return this[_0x238443(0x295)]();}else{if(this[_0x238443(0x28d)]!==_0x14449c['battlerName']())return this[_0x238443(0x295)]();}break;}},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x295)]=function(){const _0x56a719=_0x20875d,_0x5ccd23=this[_0x56a719(0x28e)]();if(!_0x5ccd23)return;this[_0x56a719(0x1cf)]=_0x5ccd23[_0x56a719(0x33f)]();if(_0x5ccd23[_0x56a719(0x29f)]()&&this[_0x56a719(0x1cf)]==='enemy')this['_graphicType']=_0x56a719(0x2e3);else _0x5ccd23[_0x56a719(0x148)]()&&this['_graphicType']===_0x56a719(0x1be)&&(this[_0x56a719(0x1cf)]=_0x56a719(0x2c5));let _0x1ff591;switch(this[_0x56a719(0x1cf)]){case _0x56a719(0x2e3):this['_graphicFaceName']=_0x5ccd23[_0x56a719(0x106)](),this[_0x56a719(0x15c)]=_0x5ccd23['TurnOrderBTBGraphicFaceIndex'](),_0x1ff591=ImageManager[_0x56a719(0x299)](this[_0x56a719(0xf0)]),_0x1ff591[_0x56a719(0x2eb)](this[_0x56a719(0x202)][_0x56a719(0x259)](this,_0x1ff591));break;case'icon':this['_graphicIconIndex']=_0x5ccd23[_0x56a719(0x205)](),_0x1ff591=ImageManager[_0x56a719(0x2e7)](_0x56a719(0x284)),_0x1ff591[_0x56a719(0x2eb)](this[_0x56a719(0x30d)][_0x56a719(0x259)](this,_0x1ff591));break;case _0x56a719(0x2c5):if(_0x5ccd23['hasSvBattler']())this['_graphicSv']=_0x5ccd23[_0x56a719(0x1ea)](),_0x1ff591=ImageManager[_0x56a719(0xeb)](this[_0x56a719(0x266)]),_0x1ff591[_0x56a719(0x2eb)](this['changeSvActorGraphicBitmap']['bind'](this,_0x1ff591));else $gameSystem[_0x56a719(0x2fb)]()?(this[_0x56a719(0x28d)]=_0x5ccd23[_0x56a719(0x13f)](),_0x1ff591=ImageManager['loadSvEnemy'](this['_graphicEnemy']),_0x1ff591['addLoadListener'](this['changeEnemyGraphicBitmap']['bind'](this,_0x1ff591))):(this[_0x56a719(0x28d)]=_0x5ccd23[_0x56a719(0x13f)](),_0x1ff591=ImageManager[_0x56a719(0x19e)](this[_0x56a719(0x28d)]),_0x1ff591[_0x56a719(0x2eb)](this[_0x56a719(0x2a5)]['bind'](this,_0x1ff591)));break;case _0x56a719(0x1be):this[_0x56a719(0x266)]=_0x5ccd23[_0x56a719(0x13f)](),_0x1ff591=ImageManager[_0x56a719(0xeb)](this[_0x56a719(0x266)]),_0x1ff591[_0x56a719(0x2eb)](this[_0x56a719(0x2b3)][_0x56a719(0x259)](this,_0x1ff591));break;}},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['changeFaceGraphicBitmap']=function(_0x5a3318){const _0x102475=_0x20875d,_0x509632=this[_0x102475(0x15c)],_0x5f1f0a=this['bitmapWidth'](),_0x19cae6=this['bitmapHeight'](),_0xcd2b7b=Math[_0x102475(0x165)](_0x5f1f0a,_0x19cae6);this['_graphicSprite'][_0x102475(0x1db)]=new Bitmap(_0x5f1f0a,_0x19cae6);const _0x18b06e=this[_0x102475(0x272)][_0x102475(0x1db)],_0x46634e=ImageManager['faceWidth'],_0x40e911=ImageManager[_0x102475(0x2f5)],_0x1affc7=_0xcd2b7b/Math[_0x102475(0x165)](_0x46634e,_0x40e911),_0x52412a=ImageManager['faceWidth'],_0x2d54c9=ImageManager['faceHeight'],_0x4423d8=_0x509632%0x4*_0x46634e+(_0x46634e-_0x52412a)/0x2,_0x4fc6bf=Math[_0x102475(0x25d)](_0x509632/0x4)*_0x40e911+(_0x40e911-_0x2d54c9)/0x2,_0x1498d6=(_0x5f1f0a-_0x46634e*_0x1affc7)/0x2,_0x44186a=(_0x19cae6-_0x40e911*_0x1affc7)/0x2;_0x18b06e[_0x102475(0x15f)](_0x5a3318,_0x4423d8,_0x4fc6bf,_0x52412a,_0x2d54c9,_0x1498d6,_0x44186a,_0xcd2b7b,_0xcd2b7b);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x30d)]=function(_0x3ef7d8){const _0x207fa5=_0x20875d,_0x1f41dd=this[_0x207fa5(0x338)],_0x141251=this['bitmapWidth'](),_0x9b8afd=this[_0x207fa5(0x1ef)]();this['_graphicSprite'][_0x207fa5(0x1db)]=new Bitmap(_0x141251,_0x9b8afd);const _0x3ade98=this[_0x207fa5(0x272)][_0x207fa5(0x1db)],_0xdf7d73=ImageManager[_0x207fa5(0x2ce)],_0x522cab=ImageManager[_0x207fa5(0x265)],_0x17d6a1=Math[_0x207fa5(0x117)](_0xdf7d73,_0x522cab,_0x141251,_0x9b8afd),_0x1d32c3=_0x1f41dd%0x10*_0xdf7d73,_0x28ea4e=Math['floor'](_0x1f41dd/0x10)*_0x522cab,_0x231830=Math['floor'](Math[_0x207fa5(0x165)](_0x141251-_0x17d6a1,0x0)/0x2),_0x1249c0=Math[_0x207fa5(0x25d)](Math['max'](_0x9b8afd-_0x17d6a1,0x0)/0x2);_0x3ade98[_0x207fa5(0x15f)](_0x3ef7d8,_0x1d32c3,_0x28ea4e,_0xdf7d73,_0x522cab,_0x231830,_0x1249c0,_0x17d6a1,_0x17d6a1);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x2b3)]=function(_0x5c7735){const _0x5f4f91=_0x20875d,_0x3d1014=this[_0x5f4f91(0x156)](),_0x3af01f=this[_0x5f4f91(0x1ef)](),_0x4f9f88=Math[_0x5f4f91(0x117)](_0x3d1014,_0x3af01f);this[_0x5f4f91(0x272)][_0x5f4f91(0x1db)]=new Bitmap(_0x3d1014,_0x3af01f);const _0x559929=this['_graphicSprite']['bitmap'],_0x136f01=this[_0x5f4f91(0x266)][_0x5f4f91(0x23e)](/\$/i),_0x3733dc=_0x136f01?0x1:ImageManager[_0x5f4f91(0x1dd)],_0x5867d3=_0x136f01?0x1:ImageManager[_0x5f4f91(0x221)],_0x585d83=_0x5c7735[_0x5f4f91(0x330)]/_0x3733dc,_0x520820=_0x5c7735[_0x5f4f91(0x2df)]/_0x5867d3,_0xcf58b3=Math['min'](0x1,_0x4f9f88/_0x585d83,_0x4f9f88/_0x520820),_0x3e28a6=_0x585d83*_0xcf58b3,_0x1f11ac=_0x520820*_0xcf58b3,_0x2c12a6=Math[_0x5f4f91(0x213)]((_0x3d1014-_0x3e28a6)/0x2),_0x4a8a76=Math[_0x5f4f91(0x213)]((_0x3af01f-_0x1f11ac)/0x2);_0x559929['blt'](_0x5c7735,0x0,0x0,_0x585d83,_0x520820,_0x2c12a6,_0x4a8a76,_0x3e28a6,_0x1f11ac);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x20875d(0x2a5)]=function(_0x2dc142){const _0x187a2d=_0x20875d,_0x44f092=Window_BTB_TurnOrder[_0x187a2d(0x1f7)],_0x5acb86=this[_0x187a2d(0x156)](),_0x33ac8e=this[_0x187a2d(0x1ef)](),_0x48715a=Math['min'](_0x5acb86,_0x33ac8e);this[_0x187a2d(0x272)][_0x187a2d(0x1db)]=new Bitmap(_0x5acb86,_0x33ac8e);const _0x1973a0=this[_0x187a2d(0x272)][_0x187a2d(0x1db)],_0x1b96b4=Math[_0x187a2d(0x117)](0x1,_0x48715a/_0x2dc142[_0x187a2d(0x330)],_0x48715a/_0x2dc142[_0x187a2d(0x2df)]),_0x26f61d=_0x2dc142[_0x187a2d(0x330)]*_0x1b96b4,_0x502494=_0x2dc142['height']*_0x1b96b4,_0x22f54b=Math[_0x187a2d(0x213)]((_0x5acb86-_0x26f61d)/0x2),_0x1c21a0=Math[_0x187a2d(0x213)]((_0x33ac8e-_0x502494)/0x2);_0x1973a0[_0x187a2d(0x15f)](_0x2dc142,0x0,0x0,_0x2dc142[_0x187a2d(0x330)],_0x2dc142['height'],_0x22f54b,_0x1c21a0,_0x26f61d,_0x502494);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0xf4)]=function(){const _0x7cd763=_0x20875d,_0x3e6dee=this[_0x7cd763(0x28e)]();if(!_0x3e6dee)return;if(!_0x3e6dee[_0x7cd763(0x148)]())return;if(this[_0x7cd763(0x2e0)]===_0x3e6dee[_0x7cd763(0x2fa)]())return;this['_graphicHue']=_0x3e6dee[_0x7cd763(0x2fa)](),this['_graphicSprite']['setHue'](_0x3e6dee[_0x7cd763(0x15e)]()?0x0:this[_0x7cd763(0x2e0)]);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x17f)]=function(){const _0x21b23a=_0x20875d;if(!this[_0x21b23a(0xe7)])return;const _0x3aacee=this['battler']();if(!_0x3aacee)return;if(this[_0x21b23a(0x166)]===_0x3aacee['_letter']&&this[_0x21b23a(0x146)]===_0x3aacee[_0x21b23a(0x146)])return;this[_0x21b23a(0x166)]=_0x3aacee[_0x21b23a(0x166)],this[_0x21b23a(0x146)]=_0x3aacee['_plural'];const _0x278dc2=Window_BTB_TurnOrder[_0x21b23a(0x1f7)],_0x105138=this[_0x21b23a(0x129)](),_0x342193=this['bitmapWidth'](),_0x3b8625=this[_0x21b23a(0x1ef)](),_0x49dd16=this[_0x21b23a(0xe7)][_0x21b23a(0x1db)];_0x49dd16[_0x21b23a(0x292)]();if(!this[_0x21b23a(0x146)])return;_0x49dd16[_0x21b23a(0x28a)]=_0x278dc2[_0x21b23a(0x339)]||$gameSystem['mainFontFace'](),_0x49dd16[_0x21b23a(0xea)]=_0x278dc2[_0x21b23a(0x293)]||0x10,_0x105138?_0x49dd16[_0x21b23a(0xf2)](this[_0x21b23a(0x166)][_0x21b23a(0xee)](),0x0,_0x3b8625/0x2,_0x342193,_0x3b8625/0x2,'center'):_0x49dd16[_0x21b23a(0xf2)](this[_0x21b23a(0x166)][_0x21b23a(0xee)](),0x0,0x2,_0x342193-0x8,_0x3b8625-0x4,_0x21b23a(0x114));},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)]['updateSelectionEffect']=function(){const _0x37d4bf=_0x20875d,_0x154eba=this[_0x37d4bf(0x28e)]();if(!_0x154eba)return;const _0x4ed10e=_0x154eba[_0x37d4bf(0x28e)]();if(!_0x4ed10e)return;const _0x3e6298=_0x4ed10e[_0x37d4bf(0x2aa)]();if(!_0x3e6298)return;this['setBlendColor'](_0x3e6298[_0x37d4bf(0x127)]);},Sprite_BTB_TurnOrder_Battler[_0x20875d(0x1ca)][_0x20875d(0x1d1)]=function(){return this['battler']();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2ee)]=Window_Base[_0x20875d(0x1ca)][_0x20875d(0x1c9)],Window_Base[_0x20875d(0x1ca)][_0x20875d(0x1c9)]=function(_0x42bf42,_0x41eea4,_0x21e99b){const _0x1a808b=_0x20875d;return _0x21e99b=VisuMZ[_0x1a808b(0x204)][_0x1a808b(0x2ee)][_0x1a808b(0x1e5)](this,_0x42bf42,_0x41eea4,_0x21e99b),_0x21e99b=this['makeAdditionalCostTextBTB'](_0x42bf42,_0x41eea4,_0x21e99b),_0x21e99b;},VisuMZ['BattleSystemBTB'][_0x20875d(0x303)]=Window_Base[_0x20875d(0x1ca)]['drawItemNumber'],Window_Base[_0x20875d(0x1ca)][_0x20875d(0x119)]=function(_0x13a8fd,_0x565a36,_0x1c2380,_0x2de971){const _0x5e8887=_0x20875d;BattleManager[_0x5e8887(0x163)]()&&this[_0x5e8887(0x107)]===Window_BattleItem?this[_0x5e8887(0x26d)](_0x13a8fd,_0x565a36,_0x1c2380,_0x2de971):VisuMZ['BattleSystemBTB'][_0x5e8887(0x303)][_0x5e8887(0x1e5)](this,_0x13a8fd,_0x565a36,_0x1c2380,_0x2de971),this[_0x5e8887(0x206)]();},Window_Base[_0x20875d(0x1ca)][_0x20875d(0x26d)]=function(_0x182ef4,_0x3bb992,_0x2d601f,_0x4dd0ca){const _0xe4d956=_0x20875d,_0x2f44e6=VisuMZ['BattleSystemBTB'][_0xe4d956(0x1f7)]['General'],_0x20a163=BattleManager[_0xe4d956(0x22e)]||$gameParty[_0xe4d956(0x1b0)]()[0x0],_0x1f18d3=this['makeAdditionalCostTextBTB'](_0x20a163,_0x182ef4,''),_0x5c5417=this[_0xe4d956(0x32c)](_0x1f18d3)['width'],_0x4a9024=_0x2f44e6[_0xe4d956(0x2da)];let _0x12fc42=_0x3bb992+_0x4dd0ca-_0x5c5417;if(_0x1f18d3==='')VisuMZ[_0xe4d956(0x204)][_0xe4d956(0x303)][_0xe4d956(0x1e5)](this,_0x182ef4,_0x3bb992,_0x2d601f,_0x4dd0ca);else{if(this[_0xe4d956(0x197)](_0x182ef4)){this['resetFontSettings']();const _0x4f9e48=VisuMZ[_0xe4d956(0x2a1)][_0xe4d956(0x1f7)][_0xe4d956(0xf6)];this[_0xe4d956(0x134)]['fontSize']=_0x4f9e48['ItemQuantityFontSize'];if(_0x4a9024){const _0x2d5cf0=_0x4f9e48[_0xe4d956(0x25a)],_0x2cc604=_0x2d5cf0[_0xe4d956(0x30a)]($gameParty['numItems'](_0x182ef4)),_0x1e1ed8=this[_0xe4d956(0x12b)](_0x2cc604+this[_0xe4d956(0x315)]());_0x12fc42-=_0x1e1ed8;}else _0x4dd0ca-=this[_0xe4d956(0x12b)](this[_0xe4d956(0x315)]())+_0x5c5417;VisuMZ[_0xe4d956(0x204)][_0xe4d956(0x303)][_0xe4d956(0x1e5)](this,_0x182ef4,_0x3bb992,_0x2d601f,_0x4dd0ca);}}this['drawTextEx'](_0x1f18d3,_0x12fc42,_0x2d601f);},Window_Base[_0x20875d(0x1ca)]['makeAdditionalCostTextBTB']=function(_0x1a4e70,_0x52df27,_0x2e773e){const _0x3c6665=_0x20875d;if(!BattleManager[_0x3c6665(0x163)]())return _0x2e773e;if(!_0x1a4e70)return _0x2e773e;if(!_0x52df27)return _0x2e773e;if(_0x52df27[_0x3c6665(0x2e4)][_0x3c6665(0x23e)](VisuMZ['BattleSystemBTB'][_0x3c6665(0x2be)][_0x3c6665(0x1df)]))return _0x2e773e;let _0x5368c7=_0x1a4e70['bravePointsCost'](_0x52df27);const _0x219aad=VisuMZ[_0x3c6665(0x204)][_0x3c6665(0x1f7)][_0x3c6665(0xef)],_0x571a6c=_0x219aad['CostPosition'],_0x56f0f1=_0x219aad[_0x3c6665(0x2f3)],_0x46f479=_0x219aad[_0x3c6665(0x1fa)],_0x19af4c=_0x219aad['ReduceShownBPCost']||0x0,_0x54bb9f=_0x219aad[_0x3c6665(0x278)],_0x15e634=_0x219aad[_0x3c6665(0x21a)];if(DataManager[_0x3c6665(0x1b8)](_0x52df27)&&this[_0x3c6665(0x107)]===Window_ActorCommand){if(!_0x56f0f1&&_0x52df27['id']===_0x1a4e70[_0x3c6665(0x274)]())return _0x2e773e;if(!_0x46f479&&_0x52df27['id']===_0x1a4e70[_0x3c6665(0x1ae)]())return _0x2e773e;}_0x5368c7-=_0x19af4c;if(_0x5368c7<0x0)return _0x2e773e;if(!_0x54bb9f&&_0x5368c7===0x0)return _0x2e773e;if(!_0x15e634&&_0x5368c7===0x1)return _0x2e773e;const _0x356754=_0x3c6665(0x157)[_0x3c6665(0x30a)](ImageManager[_0x3c6665(0x1cd)]),_0x41c016=TextManager[_0x3c6665(0x268)];let _0x5aee92=TextManager[_0x3c6665(0x2f1)][_0x3c6665(0x30a)](_0x5368c7,_0x41c016,_0x356754);if(_0x2e773e==='')_0x2e773e+=_0x5aee92;else _0x571a6c?_0x2e773e=_0x5aee92+this[_0x3c6665(0x315)]()+_0x2e773e:_0x2e773e=_0x2e773e+this[_0x3c6665(0x315)]()+_0x5aee92;return _0x2e773e;},Window_Selectable['prototype'][_0x20875d(0x13e)]=function(){return![];},VisuMZ[_0x20875d(0x204)][_0x20875d(0x16f)]=Window_Selectable[_0x20875d(0x1ca)]['select'],Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x150)]=function(_0x2bf7de){const _0x56b195=_0x20875d;VisuMZ[_0x56b195(0x204)]['Window_Selectable_select'][_0x56b195(0x1e5)](this,_0x2bf7de),this[_0x56b195(0x13e)]()&&this[_0x56b195(0x200)]&&this[_0x56b195(0x2c1)]();},Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x2c1)]=function(){const _0x5a57c9=_0x20875d;BattleManager[_0x5a57c9(0x1c0)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x169)]=Window_Help[_0x20875d(0x1ca)][_0x20875d(0x1f0)],Window_Help[_0x20875d(0x1ca)][_0x20875d(0x1f0)]=function(_0x523564){const _0x3e964e=_0x20875d;BattleManager['isBTB']()&&_0x523564&&_0x523564[_0x3e964e(0x2e4)]&&_0x523564[_0x3e964e(0x2e4)][_0x3e964e(0x23e)](VisuMZ['BattleSystemBTB'][_0x3e964e(0x2be)][_0x3e964e(0x151)])?this[_0x3e964e(0x2a6)](String(RegExp['$1'])):VisuMZ['BattleSystemBTB'][_0x3e964e(0x169)]['call'](this,_0x523564);},VisuMZ['BattleSystemBTB']['Window_BattleLog_startAction']=Window_BattleLog[_0x20875d(0x1ca)][_0x20875d(0x192)],Window_BattleLog[_0x20875d(0x1ca)][_0x20875d(0x192)]=function(_0x4a8ad6,_0x254557,_0xde9e99){const _0x4df2db=_0x20875d;this['showBraveAnimationBTB'](_0x4a8ad6)?this[_0x4df2db(0x2d5)](_0x4a8ad6,_0x254557,_0xde9e99):VisuMZ[_0x4df2db(0x204)][_0x4df2db(0x214)]['call'](this,_0x4a8ad6,_0x254557,_0xde9e99);},Window_BattleLog[_0x20875d(0x1ca)]['startActionBTB']=function(_0x414087,_0x19c3bc,_0x2e8697){const _0x3757f4=_0x20875d;VisuMZ[_0x3757f4(0x204)][_0x3757f4(0x214)]['call'](this,_0x414087,_0x19c3bc,_0x2e8697);},Window_BattleLog['prototype'][_0x20875d(0x10f)]=function(_0x358f90){const _0x47f318=_0x20875d;if(!BattleManager['isBTB']())return![];if(!_0x358f90)return![];if(!_0x358f90[_0x47f318(0x148)]())return![];if(_0x358f90['_braveStartupAnimation'])return![];const _0x370bbc=VisuMZ[_0x47f318(0x204)][_0x47f318(0x1f7)]['BraveAnimation'];if(!_0x370bbc['ShowEnemyBrave'])return![];if(_0x370bbc['BraveAnimationID']<=0x0)return![];return VisuMZ[_0x47f318(0x204)][_0x47f318(0x1f7)]['BraveAnimation'][_0x47f318(0x1e8)];},Window_BattleLog['prototype'][_0x20875d(0x2d5)]=function(_0x5b386b,_0x996e3a,_0x33b7fc){const _0x29c051=_0x20875d;_0x5b386b['_braveStartupAnimation']=!![];let _0xfb9c37=_0x5b386b['braveAnimationTimes']();const _0x5ba6cc=VisuMZ['BattleSystemBTB']['Settings']['BraveAnimation'],_0x2db36e=_0x5ba6cc[_0x29c051(0x2bd)],_0x4d085d=_0x5ba6cc['WaitFrames'];while(_0xfb9c37--){this[_0x29c051(0x15d)](_0x29c051(0x1d7),[_0x5b386b],_0x2db36e),_0xfb9c37>0x0?this[_0x29c051(0x15d)](_0x29c051(0x133),_0x4d085d):this[_0x29c051(0x15d)](_0x29c051(0x2a0));}this[_0x29c051(0x15d)](_0x29c051(0x1f3),_0x5b386b,_0x996e3a,_0x33b7fc);},VisuMZ['BattleSystemBTB'][_0x20875d(0x2fe)]=Window_ActorCommand[_0x20875d(0x1ca)]['addGuardCommand'],Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x231)]=function(){const _0x5a16b4=_0x20875d;this[_0x5a16b4(0x22f)](),VisuMZ['BattleSystemBTB'][_0x5a16b4(0x2fe)][_0x5a16b4(0x1e5)](this);},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x22f)]=function(){const _0x474b8a=_0x20875d;if(!this['canAddBraveCommand']())return;const _0x1339dc=this[_0x474b8a(0x217)](),_0x5b6d10=TextManager[_0x474b8a(0x17c)],_0x38d59c=ImageManager[_0x474b8a(0x1cd)],_0x2f370e=_0x1339dc===_0x474b8a(0x2b6)?_0x5b6d10:_0x474b8a(0x10d)['format'](_0x38d59c,_0x5b6d10);this[_0x474b8a(0x24d)](_0x2f370e,_0x474b8a(0x286),this[_0x474b8a(0x22e)][_0x474b8a(0x1c6)]()),BattleManager['refreshStatusBTB']();},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x2d7)]=function(){const _0x1ccc00=_0x20875d;if(!BattleManager['isBTB']())return![];if(!VisuMZ[_0x1ccc00(0x204)]['Settings'][_0x1ccc00(0x279)]['ShowCommand'])return![];if(this[_0x1ccc00(0x22e)]&&this[_0x1ccc00(0x22e)][_0x1ccc00(0x277)]())return![];return!![];},VisuMZ['BattleSystemBTB'][_0x20875d(0x1a8)]=Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x183)],Window_ActorCommand[_0x20875d(0x1ca)]['setup']=function(_0x2d018d){const _0x1a6196=_0x20875d;VisuMZ[_0x1a6196(0x204)][_0x1a6196(0x1a8)][_0x1a6196(0x1e5)](this,_0x2d018d),this[_0x1a6196(0x162)]();},VisuMZ['BattleSystemBTB'][_0x20875d(0x174)]=Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x285)],Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x285)]=function(){const _0x3a6b3f=_0x20875d;this[_0x3a6b3f(0x223)]()?this['_actor']&&!this[_0x3a6b3f(0x22e)][_0x3a6b3f(0x277)]()&&this[_0x3a6b3f(0x22e)]['canBrave']()&&SceneManager[_0x3a6b3f(0x203)][_0x3a6b3f(0x126)]():VisuMZ[_0x3a6b3f(0x204)][_0x3a6b3f(0x174)][_0x3a6b3f(0x1e5)](this);},VisuMZ[_0x20875d(0x204)][_0x20875d(0x267)]=Window_Selectable[_0x20875d(0x1ca)]['cursorPageup'],Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x1a5)]=function(){const _0x3f8b76=_0x20875d;this['isUsePageUpDnShortcutBTB']()?this['_actor']&&!this[_0x3f8b76(0x22e)]['hideBraveTrait']()&&this[_0x3f8b76(0x22e)][_0x3f8b76(0x105)]()>0x1&&SceneManager[_0x3f8b76(0x203)][_0x3f8b76(0x324)]():VisuMZ[_0x3f8b76(0x204)][_0x3f8b76(0x267)][_0x3f8b76(0x1e5)](this);},Window_Selectable[_0x20875d(0x1ca)][_0x20875d(0x223)]=function(){const _0x107ebc=_0x20875d;if(this[_0x107ebc(0x107)]!==Window_ActorCommand)return![];if(!SceneManager[_0x107ebc(0x225)]())return![];if(!BattleManager[_0x107ebc(0x163)]())return![];return VisuMZ[_0x107ebc(0x204)][_0x107ebc(0x1f7)][_0x107ebc(0x279)][_0x107ebc(0x2d9)];},VisuMZ[_0x20875d(0x204)][_0x20875d(0x29d)]=Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x2d3)],Window_ActorCommand['prototype'][_0x20875d(0x2d3)]=function(){const _0x49b965=_0x20875d;VisuMZ[_0x49b965(0x204)][_0x49b965(0x29d)]['call'](this),this[_0x49b965(0x162)]();},VisuMZ[_0x20875d(0x204)][_0x20875d(0x2cf)]=Window_Base['prototype'][_0x20875d(0x29c)],Window_Base[_0x20875d(0x1ca)][_0x20875d(0x29c)]=function(){const _0x545fc9=_0x20875d;VisuMZ[_0x545fc9(0x204)][_0x545fc9(0x2cf)]['call'](this),SceneManager[_0x545fc9(0x225)]()&&this[_0x545fc9(0x186)]&&this[_0x545fc9(0x186)]();},Window_ActorCommand[_0x20875d(0x1ca)]['destroyBTBActionCounters']=function(){const _0x289dd3=_0x20875d;if(!this['_btbActionSprite'])return;this[_0x289dd3(0x308)][_0x289dd3(0x1db)]&&this[_0x289dd3(0x308)][_0x289dd3(0x1db)]['destroy'](),this['removeChild'](this[_0x289dd3(0x308)]),delete this[_0x289dd3(0x308)];},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x162)]=function(){const _0x23b568=_0x20875d;if(!BattleManager[_0x23b568(0x163)]())return;if(!this[_0x23b568(0x22e)])return;this[_0x23b568(0x186)]();if(this[_0x23b568(0x22e)][_0x23b568(0x277)]())return;this[_0x23b568(0x308)]=new Sprite(),this[_0x23b568(0x208)](this[_0x23b568(0x308)]),this['modifyBTBActionCounterSprite']();},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x291)]=function(){const _0x20610e=_0x20875d,_0x117ec6=VisuMZ[_0x20610e(0x204)]['Settings'][_0x20610e(0x279)][_0x20610e(0x13a)];_0x117ec6?_0x117ec6['call'](this,this[_0x20610e(0x308)],this,this[_0x20610e(0x22e)]):this['modifyBTBActionCounterSprite_Fallback'][_0x20610e(0x1e5)](this,this['_btbActionSprite'],this,this[_0x20610e(0x22e)]);},Window_ActorCommand['prototype'][_0x20875d(0x23d)]=function(){const _0x378efa=_0x20875d,_0x5b3d28=arguments[0x0],_0x12a22a=arguments[0x1],_0x2192ff=arguments[0x2];_0x5b3d28['x']=Math[_0x378efa(0x213)](_0x12a22a[_0x378efa(0x330)]/0x2),_0x5b3d28['y']=0x0,_0x5b3d28[_0x378efa(0x1a0)]['x']=0.5,_0x5b3d28['anchor']['y']=0.5;const _0x3aa60b=TextManager[_0x378efa(0x26a)],_0xfd0f8=TextManager[_0x378efa(0x1b9)];let _0x22289a=_0x3aa60b[_0x378efa(0x123)](_0x2192ff[_0x378efa(0x105)]());const _0x576cd1=_0x2192ff[_0x378efa(0x1e0)];_0x22289a=_0x22289a[_0x378efa(0xe8)](0x0,_0x576cd1)+_0xfd0f8+_0x22289a[_0x378efa(0xe8)](_0x576cd1+0x1);const _0x1bd38c=new Bitmap(_0x12a22a['width'],_0x12a22a['lineHeight']());_0x1bd38c['fontSize']=0x24,_0x1bd38c[_0x378efa(0xf2)](_0x22289a,0x0,0x0,_0x1bd38c['width'],_0x1bd38c['height'],_0x378efa(0x2f6)),_0x5b3d28[_0x378efa(0x1db)]=_0x1bd38c;},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x13e)]=function(){const _0x3093a6=_0x20875d;return BattleManager[_0x3093a6(0x163)]();},Window_ActorCommand[_0x20875d(0x1ca)][_0x20875d(0x2c1)]=function(){const _0x459217=_0x20875d,_0x4b8888=BattleManager[_0x459217(0x2fc)]();if(_0x4b8888){const _0x4dad40=this['currentSymbol']();switch(_0x4dad40){case _0x459217(0x109):_0x4b8888[_0x459217(0x237)]();break;case _0x459217(0x297):_0x4b8888[_0x459217(0x184)]();break;case'singleSkill':_0x4b8888['setSkill'](this[_0x459217(0x187)]());break;default:_0x4b8888[_0x459217(0x2f2)](null);break;}}Window_Command[_0x459217(0x1ca)][_0x459217(0x2c1)][_0x459217(0x1e5)](this);},Window_Base[_0x20875d(0x1ca)][_0x20875d(0xe9)]=function(_0x261657,_0x2b52a7,_0x58aba9,_0x67bea,_0x2daf35){const _0x3a6683=_0x20875d;if(!_0x261657)return;if(!BattleManager[_0x3a6683(0x163)]())return;const _0x137c72=VisuMZ[_0x3a6683(0x204)]['Settings'][_0x3a6683(0x279)],_0x5d8df0=BattleManager['isInputting']()?_0x137c72[_0x3a6683(0x10e)]:_0x137c72[_0x3a6683(0x1b5)],_0x62a54=_0x137c72[_0x3a6683(0x16c)],_0x2bcfb4=_0x137c72[_0x3a6683(0x33a)],_0xf78684=_0x137c72[_0x3a6683(0x33d)];let _0x2cc729=0x0,_0x598d8f=0x0;_0x598d8f=_0x261657[_0x3a6683(0x181)]();if(_0x598d8f>0x0)_0x2cc729=_0x2bcfb4;if(_0x598d8f===0x0)_0x2cc729=_0x62a54;if(_0x598d8f<0x0)_0x2cc729=_0xf78684;const _0x276d52=_0x3a6683(0x1e7)['format'](_0x2cc729,_0x598d8f),_0x4528fa=_0x3a6683(0x157)[_0x3a6683(0x30a)](ImageManager[_0x3a6683(0x1cd)]);_0x598d8f=_0x261657[_0x3a6683(0x337)]();if(_0x598d8f>0x0)_0x2cc729=_0x2bcfb4;if(_0x598d8f===0x0)_0x2cc729=_0x62a54;_0x598d8f<0x0&&(_0x2cc729=_0xf78684);const _0x4631ce='\x5cC[%1]%2\x5cC[0]'[_0x3a6683(0x30a)](_0x2cc729,_0x598d8f);let _0xab99f=_0x5d8df0[_0x3a6683(0x30a)](_0x276d52,TextManager[_0x3a6683(0x268)],_0x4528fa,_0x4631ce);const _0x40b269=this[_0x3a6683(0x32c)](_0xab99f)[_0x3a6683(0x330)];if(_0x2daf35===_0x3a6683(0x2f6))_0x2b52a7+=Math[_0x3a6683(0x213)]((_0x67bea-_0x40b269)/0x2);else _0x2daf35==='right'&&(_0x2b52a7+=Math[_0x3a6683(0x213)](_0x67bea-_0x40b269));this['drawTextEx'](_0xab99f,_0x2b52a7,_0x58aba9,_0x67bea);},Window_StatusBase[_0x20875d(0x1ca)]['showBravePoints']=function(_0x2ab813){const _0x14f7d1=_0x20875d;if(!_0x2ab813)return![];if(!BattleManager['isBTB']())return![];if(!this[_0x14f7d1(0x158)])return![];if(_0x2ab813['hideBraveTrait']())return![];const _0x43a301=VisuMZ['BattleSystemBTB'][_0x14f7d1(0x1f7)][_0x14f7d1(0x279)],_0x5e3181=this['battleLayoutStyle']();return _0x43a301[_0x14f7d1(0x2ba)[_0x14f7d1(0x30a)](_0x5e3181)];},VisuMZ['BattleSystemBTB'][_0x20875d(0x27c)]=Window_BattleStatus['prototype'][_0x20875d(0x2ac)],Window_BattleStatus[_0x20875d(0x1ca)][_0x20875d(0x2ac)]=function(_0x516a11){const _0x319569=_0x20875d;VisuMZ[_0x319569(0x204)][_0x319569(0x27c)][_0x319569(0x1e5)](this,_0x516a11);const _0x3b827e=this[_0x319569(0x12d)](_0x516a11);if(this[_0x319569(0x2d0)](_0x3b827e)){const _0x11641a=this[_0x319569(0x329)](_0x516a11),_0x2bcf9a=$dataSystem['optDisplayTp']?0x4:0x3,_0x47aa56=_0x2bcf9a*0x80+(_0x2bcf9a-0x1)*0x8+0x4;let _0x699e3c=_0x11641a['x']+this[_0x319569(0xff)];VisuMZ[_0x319569(0x101)][_0x319569(0x1f7)][_0x319569(0x22a)][_0x319569(0x18a)]?_0x699e3c=_0x11641a['x']+ImageManager['faceWidth']+0x8:_0x699e3c+=ImageManager[_0x319569(0x2ce)];const _0x5376d9=Math[_0x319569(0x213)](Math[_0x319569(0x117)](_0x11641a['x']+_0x11641a[_0x319569(0x330)]-_0x47aa56,_0x699e3c));let _0x112934=_0x5376d9+0x88,_0x464578=_0x11641a['y'];_0x112934+=0x88*($dataSystem[_0x319569(0x2e1)]?0x3:0x2),_0x112934+=this[_0x319569(0x2b9)](),_0x464578+=this[_0x319569(0x319)]();const _0x1ddf10=this['getAlignmentBTB']();if(_0x112934>_0x11641a['x']+_0x11641a[_0x319569(0x330)])return;this[_0x319569(0xe9)](_0x3b827e,_0x112934,_0x464578,_0x11641a[_0x319569(0x330)],_0x1ddf10);}},VisuMZ['BattleSystemBTB'][_0x20875d(0x21e)]=Window_BattleStatus[_0x20875d(0x1ca)][_0x20875d(0x1e3)],Window_BattleStatus['prototype'][_0x20875d(0x1e3)]=function(_0x2c23bf){const _0x35ac14=_0x20875d;VisuMZ[_0x35ac14(0x204)][_0x35ac14(0x21e)][_0x35ac14(0x1e5)](this,_0x2c23bf);const _0x4f1053=this[_0x35ac14(0x12d)](_0x2c23bf);if(this[_0x35ac14(0x2d0)](_0x4f1053)){const _0x345ec9=this[_0x35ac14(0x312)](_0x2c23bf);let _0x49a9fa=_0x345ec9['x'],_0x3a5d7c=_0x345ec9['y'];_0x49a9fa+=this['getOffsetX_BTB'](),_0x3a5d7c+=this[_0x35ac14(0x319)]();const _0x5c50e7=this[_0x35ac14(0x269)]();this['drawActorBravePoints'](_0x4f1053,_0x49a9fa,_0x3a5d7c,_0x345ec9['width'],_0x5c50e7);}},Window_BattleStatus[_0x20875d(0x1ca)][_0x20875d(0x312)]=function(_0x36a629){const _0x588945=_0x20875d,_0x1803fb=this['itemRect'](_0x36a629);if(_0x1803fb['width']<ImageManager[_0x588945(0x2b8)])return _0x1803fb;let _0x3c24c3=Math['round']((_0x1803fb['width']-ImageManager[_0x588945(0x2b8)])/0x2);return _0x1803fb[_0x588945(0x330)]=ImageManager[_0x588945(0x2b8)],_0x1803fb['x']+=_0x3c24c3,_0x1803fb;},Window_BattleStatus['prototype']['getAlignmentBTB']=function(){const _0x343b41=_0x20875d,_0x4a2803=VisuMZ[_0x343b41(0x204)]['Settings']['Window'],_0x59046a=this[_0x343b41(0x158)]();return _0x4a2803['%1_align'[_0x343b41(0x30a)](_0x59046a)]||0x0;},Window_BattleStatus['prototype'][_0x20875d(0x2b9)]=function(){const _0xb74b89=_0x20875d,_0x552f23=VisuMZ['BattleSystemBTB'][_0xb74b89(0x1f7)][_0xb74b89(0x279)],_0x28ae77=this['battleLayoutStyle']();return _0x552f23[_0xb74b89(0x176)[_0xb74b89(0x30a)](_0x28ae77)]||0x0;},Window_BattleStatus[_0x20875d(0x1ca)][_0x20875d(0x319)]=function(){const _0x7205dc=_0x20875d,_0x5cc97d=VisuMZ[_0x7205dc(0x204)][_0x7205dc(0x1f7)][_0x7205dc(0x279)],_0x30e48c=this[_0x7205dc(0x158)]();return _0x5cc97d[_0x7205dc(0x2c0)[_0x7205dc(0x30a)](_0x30e48c)]||0x0;},Window_BattleSkill['prototype'][_0x20875d(0x13e)]=function(){const _0x3d2a3b=_0x20875d;return BattleManager[_0x3d2a3b(0x163)]();},Window_BattleSkill[_0x20875d(0x1ca)][_0x20875d(0x2c1)]=function(){const _0xdd91b1=_0x20875d,_0x4da637=this['item'](),_0x1d0aba=BattleManager[_0xdd91b1(0x2fc)]();if(_0x1d0aba)_0x1d0aba[_0xdd91b1(0x2f2)](_0x4da637?_0x4da637['id']:null);Window_SkillList[_0xdd91b1(0x1ca)][_0xdd91b1(0x2c1)][_0xdd91b1(0x1e5)](this);},Window_BattleItem[_0x20875d(0x1ca)][_0x20875d(0x13e)]=function(){const _0x43518d=_0x20875d;return BattleManager[_0x43518d(0x163)]();},Window_BattleItem['prototype']['applyBattleItemWindowBTB']=function(){const _0x2e6554=_0x20875d,_0x514b59=this['item'](),_0x51b1e2=BattleManager[_0x2e6554(0x2fc)]();if(_0x51b1e2)_0x51b1e2[_0x2e6554(0x1f0)](_0x514b59?_0x514b59['id']:null);Window_ItemList[_0x2e6554(0x1ca)]['applyBattleItemWindowBTB'][_0x2e6554(0x1e5)](this);};function Window_BTB_TurnOrder(){const _0x318c1b=_0x20875d;this[_0x318c1b(0x2f8)](...arguments);}Window_BTB_TurnOrder[_0x20875d(0x1ca)]=Object['create'](Window_Base[_0x20875d(0x1ca)]),Window_BTB_TurnOrder['prototype'][_0x20875d(0x107)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x20875d(0x1f7)]=VisuMZ['BattleSystemBTB'][_0x20875d(0x1f7)][_0x20875d(0x25b)],Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x2f8)]=function(){const _0x5ad5f3=_0x20875d,_0x35ade0=this['windowRect']();this[_0x5ad5f3(0x323)](_0x35ade0),Window_Base[_0x5ad5f3(0x1ca)][_0x5ad5f3(0x2f8)]['call'](this,_0x35ade0),this[_0x5ad5f3(0x253)](),this[_0x5ad5f3(0x116)](),this['opacity']=0x0;},Window_BTB_TurnOrder[_0x20875d(0x1ca)]['windowRect']=function(){const _0xe73a81=_0x20875d;return this[_0xe73a81(0x2ec)]($gameParty[_0xe73a81(0x1d0)](),0x9,!![]);},Window_BTB_TurnOrder['prototype'][_0x20875d(0x323)]=function(_0x3a0418){const _0x2fea8c=_0x20875d;this[_0x2fea8c(0x27e)]=this[_0x2fea8c(0xf1)]=_0x3a0418['x'],this[_0x2fea8c(0x138)]=this[_0x2fea8c(0x191)]=_0x3a0418['y'],this[_0x2fea8c(0x1af)]=_0x3a0418[_0x2fea8c(0x330)],this[_0x2fea8c(0x29e)]=_0x3a0418[_0x2fea8c(0x2df)],this['_homeDuration']=0x0;},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x2ec)]=function(_0x2bf1a5,_0x260d6b,_0xae769){const _0x4c5a79=_0x20875d,_0x5517e2=Window_BTB_TurnOrder[_0x4c5a79(0x1f7)],_0x5a4c57=this['isHorz']()?_0x5517e2[_0x4c5a79(0x280)]:_0x5517e2[_0x4c5a79(0x13b)],_0x500c05=Math[_0x4c5a79(0x117)](_0x5a4c57,_0x2bf1a5+_0x260d6b),_0x40248a=SceneManager[_0x4c5a79(0x203)][_0x4c5a79(0x2d4)][_0x4c5a79(0x2df)],_0x293cd0=SceneManager['_scene'][_0x4c5a79(0x1ce)][_0x4c5a79(0x2df)],_0x27fe83=_0x5517e2['SubjectDistance'],_0x1f4a13=Graphics[_0x4c5a79(0x2df)]-_0x40248a-_0x293cd0;let _0x33bb2f=0x0,_0x21092b=0x0,_0x458637=0x0,_0x342489=0x0;switch(_0x5517e2['DisplayPosition']){case _0x4c5a79(0x327):_0x33bb2f=_0x5517e2['SpriteThin']*_0x500c05+_0x27fe83,_0x21092b=_0x5517e2[_0x4c5a79(0x1a7)],_0x458637=Math[_0x4c5a79(0x20e)]((Graphics[_0x4c5a79(0x330)]-_0x33bb2f)/0x2),_0x342489=_0x5517e2[_0x4c5a79(0x32d)];break;case _0x4c5a79(0x16b):_0x33bb2f=_0x5517e2['SpriteThin']*_0x500c05+_0x27fe83,_0x21092b=_0x5517e2[_0x4c5a79(0x1a7)],_0x458637=Math[_0x4c5a79(0x20e)]((Graphics[_0x4c5a79(0x330)]-_0x33bb2f)/0x2),_0x342489=Graphics[_0x4c5a79(0x2df)]-_0x40248a-_0x21092b-_0x5517e2['ScreenBuffer'];break;case'left':_0x33bb2f=_0x5517e2[_0x4c5a79(0x1a7)],_0x21092b=_0x5517e2[_0x4c5a79(0x2cc)]*_0x500c05+_0x27fe83,_0x458637=_0x5517e2[_0x4c5a79(0x32d)],_0x342489=Math[_0x4c5a79(0x20e)]((_0x1f4a13-_0x21092b)/0x2),_0x342489+=_0x293cd0;break;case _0x4c5a79(0x114):_0x33bb2f=_0x5517e2['SpriteLength'],_0x21092b=_0x5517e2['SpriteThin']*_0x500c05+_0x27fe83,_0x458637=Graphics['width']-_0x33bb2f-_0x5517e2[_0x4c5a79(0x32d)],_0x342489=Math[_0x4c5a79(0x20e)]((_0x1f4a13-_0x21092b)/0x2),_0x342489+=_0x293cd0;break;}if(!_0xae769){const _0x2eec4e=Window_BTB_TurnOrder[_0x4c5a79(0x1f7)]['OrderDirection'];let _0x5b1d3c=Math[_0x4c5a79(0x117)](_0x5a4c57,Math[_0x4c5a79(0x117)]($gameParty['maxBattleMembers']()+0x8)-_0x500c05);switch(_0x5517e2[_0x4c5a79(0x2d1)]){case'top':case'bottom':_0x2eec4e&&(_0x458637-=_0x5b1d3c*_0x5517e2[_0x4c5a79(0x2cc)]);break;}}return _0x458637+=_0x5517e2['DisplayOffsetX'],_0x342489+=_0x5517e2[_0x4c5a79(0x201)],new Rectangle(_0x458637,_0x342489,_0x33bb2f,_0x21092b);},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x137)]=function(){const _0x2ac6e2=_0x20875d;this[_0x2ac6e2(0xff)]=0x0;},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x129)]=function(){const _0x310750=_0x20875d,_0x5d9064=Window_BTB_TurnOrder[_0x310750(0x1f7)],_0x44f82d=[_0x310750(0x327),_0x310750(0x16b)]['includes'](_0x5d9064[_0x310750(0x2d1)]);return _0x44f82d;},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x253)]=function(){const _0x3cef5f=_0x20875d;this['_turnOrderInnerSprite']=new Sprite(),this[_0x3cef5f(0x27a)](this[_0x3cef5f(0x1b6)]),this['_turnOrderContainer']=[];for(let _0x13f81e=0x0;_0x13f81e<$gameParty[_0x3cef5f(0x1d0)]();_0x13f81e++){const _0x13f36e=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x13f81e);this[_0x3cef5f(0x1b6)][_0x3cef5f(0x208)](_0x13f36e),this[_0x3cef5f(0x29a)][_0x3cef5f(0x15d)](_0x13f36e);}for(let _0x45dbef=0x0;_0x45dbef<$gameTroop[_0x3cef5f(0x1b0)]()[_0x3cef5f(0x2bf)];_0x45dbef++){const _0x220a8f=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x45dbef);this[_0x3cef5f(0x1b6)][_0x3cef5f(0x208)](_0x220a8f),this['_turnOrderContainer']['push'](_0x220a8f);}},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x2ed)]=function(){const _0x87aece=_0x20875d;Window_Base[_0x87aece(0x1ca)][_0x87aece(0x2ed)][_0x87aece(0x1e5)](this),this[_0x87aece(0x2b5)](),this['updatePosition'](),this[_0x87aece(0x19c)](),this['updateBattleContainerOrder'](),this[_0x87aece(0x116)]();},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x2b5)]=function(){const _0x26ea46=_0x20875d;if(this[_0x26ea46(0x173)]>0x0){const _0x3cfde5=this[_0x26ea46(0x173)];this[_0x26ea46(0xf1)]=(this[_0x26ea46(0xf1)]*(_0x3cfde5-0x1)+this[_0x26ea46(0x27e)])/_0x3cfde5,this[_0x26ea46(0x191)]=(this['_homeY']*(_0x3cfde5-0x1)+this['_targetHomeY'])/_0x3cfde5,this[_0x26ea46(0x173)]--,this['_homeDuration']<=0x0&&(this[_0x26ea46(0xf1)]=this['_targetHomeX'],this[_0x26ea46(0x191)]=this['_targetHomeY']);}},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x1da)]=function(){const _0x53a632=_0x20875d,_0x105dee=Window_BTB_TurnOrder['Settings'];if(_0x105dee[_0x53a632(0x2d1)]!=='top')return;if(!_0x105dee[_0x53a632(0x12f)])return;const _0x1b0e1e=SceneManager['_scene'][_0x53a632(0x1ce)];if(!_0x1b0e1e)return;_0x1b0e1e[_0x53a632(0x234)]?(this['x']=this[_0x53a632(0xf1)]+(_0x105dee[_0x53a632(0xec)]||0x0),this['y']=this[_0x53a632(0x191)]+(_0x105dee[_0x53a632(0x2cd)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x53a632(0x191)]);const _0x41db42=SceneManager[_0x53a632(0x203)][_0x53a632(0x233)];this[_0x53a632(0x248)]===undefined&&(this[_0x53a632(0x248)]=Math[_0x53a632(0x213)]((Graphics['width']-Math[_0x53a632(0x117)](Graphics[_0x53a632(0x271)],_0x41db42[_0x53a632(0x330)]))/0x2),this['_ogWindowLayerY']=Math[_0x53a632(0x213)]((Graphics[_0x53a632(0x2df)]-Math[_0x53a632(0x117)](Graphics[_0x53a632(0x178)],_0x41db42[_0x53a632(0x2df)]))/0x2)),this['x']+=_0x41db42['x']-this[_0x53a632(0x248)],this['y']+=_0x41db42['y']-this[_0x53a632(0x2e6)];},Window_BTB_TurnOrder[_0x20875d(0x1ca)]['updateSidePosition']=function(){const _0x1eadcc=_0x20875d,_0x340faa=Window_BTB_TurnOrder[_0x1eadcc(0x1f7)];if([_0x1eadcc(0x327)]['includes'](_0x340faa['DisplayPosition']))return;this['x']=this[_0x1eadcc(0xf1)],this['y']=this['_homeY'];const _0x5a5997=SceneManager[_0x1eadcc(0x203)]['_windowLayer'];this['x']+=_0x5a5997['x'],this['y']+=_0x5a5997['y'];},Window_BTB_TurnOrder['prototype'][_0x20875d(0x2f4)]=function(){const _0x1e2491=_0x20875d;if(!this[_0x1e2491(0x1b6)])return;const _0x48797d=this[_0x1e2491(0x1b6)][_0x1e2491(0x11e)];if(!_0x48797d)return;_0x48797d[_0x1e2491(0x307)](this['compareBattlerSprites'][_0x1e2491(0x259)](this));},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x224)]=function(_0x577e43,_0x4de665){const _0x43f721=_0x20875d,_0x1a3b7e=this['isHorz'](),_0x36b718=Window_BTB_TurnOrder[_0x43f721(0x1f7)][_0x43f721(0x254)];if(_0x1a3b7e&&!_0x36b718)return _0x577e43['x']-_0x4de665['x'];else{if(_0x1a3b7e&&_0x36b718)return _0x4de665['x']-_0x577e43['x'];else{if(!_0x1a3b7e&&_0x36b718)return _0x577e43['y']-_0x4de665['y'];else{if(!_0x1a3b7e&&!_0x36b718)return _0x4de665['y']-_0x577e43['y'];}}}},Window_BTB_TurnOrder[_0x20875d(0x1ca)][_0x20875d(0x116)]=function(){const _0x4c8601=_0x20875d;this[_0x4c8601(0x234)]=$gameSystem[_0x4c8601(0x11d)]();},Window_BTB_TurnOrder[_0x20875d(0x1ca)]['updateTurnOrder']=function(_0x5426ab){const _0x12e68d=_0x20875d;this[_0x12e68d(0x29a)][_0x12e68d(0x307)]((_0x39415d,_0x129773)=>{return _0x39415d['containerPosition']()-_0x129773['containerPosition']();}),this[_0x12e68d(0x2ab)]();if(!_0x5426ab)return;for(const _0x40cbdf of this[_0x12e68d(0x29a)]){if(!_0x40cbdf)continue;_0x40cbdf[_0x12e68d(0x2ed)](),_0x40cbdf[_0x12e68d(0x2a3)]=0x0;}},Window_BTB_TurnOrder['prototype']['recalculateHome']=function(){const _0x1f0e1e=_0x20875d;if(!this['isHorz']())return;const _0x30b25c=VisuMZ['BattleSystemBTB'][_0x1f0e1e(0x1f7)][_0x1f0e1e(0x25b)];if(!_0x30b25c[_0x1f0e1e(0x2e2)])return;const _0x5d7626=$gameParty[_0x1f0e1e(0x1b0)]()[_0x1f0e1e(0x228)](_0x7371e5=>_0x7371e5&&_0x7371e5['isAlive']()&&_0x7371e5[_0x1f0e1e(0x1bb)]())[_0x1f0e1e(0x2bf)],_0x2aebbb=$gameTroop['members']()[_0x1f0e1e(0x228)](_0xefd78a=>_0xefd78a&&_0xefd78a[_0x1f0e1e(0x24f)]()&&_0xefd78a[_0x1f0e1e(0x1bb)]())['length'],_0x33c262=this[_0x1f0e1e(0x2ec)](_0x5d7626,_0x2aebbb);this[_0x1f0e1e(0x27e)]=_0x33c262['x'],this['_targetHomeY']=_0x33c262['y'],(this[_0x1f0e1e(0x27e)]!==this[_0x1f0e1e(0xf1)]||this[_0x1f0e1e(0x138)]!==this[_0x1f0e1e(0x191)])&&(this[_0x1f0e1e(0x173)]=_0x30b25c['UpdateFrames']);};