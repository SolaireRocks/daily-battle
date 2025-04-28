//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.19] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * Version 1.19: April 18, 2024
 * * Feature Update!
 * ** Altered TGR and Aggro-related stats so that they cannot dip too deep into
 *    the negatives and prevent randomized targeting altogether. Update made
 *    by Olivia.
 * 
 * Version 1.18: March 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for other plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 17, 2023
 * * Compatibility Update!
 * ** When enemies use skills with VisuStella MZ Battle A.I. installed, aggro
 *    settings will no longer automatically target "highest aggro targets" if
 *    there are <AI Targets: x> notetags.
 * 
 * Version 1.16: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an issue with non-weighted aggro selected actions that will cause
 *    actors (instead of just enemies) to also target highest TGR enemies.
 *    Fix made by Irina.
 * 
 * Version 1.15: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused <All Taunt> to not work properly.
 *    Fix made by Irina.
 * 
 * Version 1.14: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause cached battlers from a previous save file to
 *    not load up properly when actions are used for highest aggro actors.
 *    Fix made by Irina.
 * 
 * Version 1.13: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a problem that would cause a crash when exiting the Options menu in
 *    battle when used with specific battle systems. Fix made by Irina.
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x10e456=_0x4f21;(function(_0x549c9c,_0x4b1a12){const _0x1dd025=_0x4f21,_0x5114b8=_0x549c9c();while(!![]){try{const _0x4e0bcc=parseInt(_0x1dd025(0x21f))/0x1+-parseInt(_0x1dd025(0x256))/0x2*(parseInt(_0x1dd025(0x1b8))/0x3)+-parseInt(_0x1dd025(0x267))/0x4+parseInt(_0x1dd025(0x192))/0x5*(-parseInt(_0x1dd025(0x2ce))/0x6)+-parseInt(_0x1dd025(0x338))/0x7+-parseInt(_0x1dd025(0x1c4))/0x8+parseInt(_0x1dd025(0x2dd))/0x9;if(_0x4e0bcc===_0x4b1a12)break;else _0x5114b8['push'](_0x5114b8['shift']());}catch(_0x2dae49){_0x5114b8['push'](_0x5114b8['shift']());}}}(_0x452a,0xdefd8));function _0x452a(){const _0x31a2aa=['cgBXk','smoothTarget','opponentsUnit','bypassProvoke','highestTgrMember','Settings','matchTauntType','AggroPerDmg','_menuAggroType','parentContainer','setHandler','ocMID','taunting','Sprite_Battler_update','_magicalTauntAnimation','checkCacheKey','addState','ZZnGH','_provokeSprite','createProvokeSprite','isAggroType','nameX','Sprite_Gauge_gaugeColor1','drawValue','optDisplayTp','wfBsV','drawCircle','Scale','_tauntAnimationTimer','isNotEnemySelectAction','gainAggro','tgrMax','VqCPA','actorId','Sprite_Battler_initMembers','1665383lXDJwq','EnemyChangeAggro','hkJhQ','OffsetY','_provokeContainer','value','sparam','Game_Action_applyItemUserEffect','padding','oZfUg','EnemySetAggro','gaugeRate','createBattleField','AniCertain','executeHpDamageAggroControl','isCertainHit','target','Sprite_Gauge_currentValue','blendMode','AniMagical','ARRAYSTR','width','AdjustOptionsRect','SVmnB','isStateAffected','physical','setAggro','isMagical','Game_Action_targetsForAlive','AggroControlSystem','leftwardAnimation','certainHitTaunt','update','pxwLY','Battle\x20Actor\x20%1','_aggro','needsSelection','Game_BattlerBase_initMembers','Window_Options_addGeneralOptions','provokeHeightOrigin','hitType','subject','magicalTauntMembers','targetsForAlive','applySubjectAggro','traitObjects','BattleManager_endAction','xJCLA','initAggroControl','filter','ShowFacesListStyle','VisuMZ_1_BattleCore','Game_Battler_onBattleEnd','friendsUnit','ARRAYFUNC','14hjdiFn','Sprite_Gauge_gaugeRate','convertBattleTargetToString','battleUIOffsetX','MHRvx','aggroGauge','certainHit','battleAggro','faceWidth','ARRAYJSON','AnchorX','vMlJV','magical','convertStringToBattleTarget','ekOay','tgrMin','item','7257792pkhxqr','WbIHF','ARRAYSTRUCT','endBattle','createInnerSprite','Game_Battler_onBattleStart','partsSize','call','BattleManager_invokeMagicReflection','_mirrorActorTauntAnimations','onBattleStart','gaugeX','push','ONQBu','isDead','provokeBitmap','drawAggroGauge','YyjHt','create','abs','applyItemUserEffectAggroControl','isEnemy','bypassTaunt','VisuMZ_2_BattleSystemATB','MirrorActorAni','HITTYPE_CERTAIN','isPhysical','isBypassProvoke','pagedown','_sprites','Ujzqv','bitmap','tauntTargetsForAlive','_spriteset','fBLbY','_animationCycleTime','registerCommand','rggQO','time','itemRect','indexOf','startNewTauntAnimation','AniPhysical','_muteTauntAnimations','note','isAggroGaugeVisible','isfjg','ConvertParams','some','EnemyIndex','aliveMembers','_homeX','applyProvokeFilters','tgrSumFromGroup','Sprite_Gauge_drawValue','applyItemUserEffect','BattleLayout','initTauntAnimations','getColorDataFromPluginParameters','_battleField','status','isSceneBattle','BlendMode','opacity','feEnr','prototype','addAggroControlSystemProvokeCommand','Provoke','updateChildrenOpacity','length','stateHasProvoke','ARRAYEVAL','clearTgrCache','updateOpacity','Sprite_Gauge_gaugeX','max','_tauntAnimationCycle','EVAL','addGeneralOptions','pow','actor%1-gauge-aggro','Game_BattlerBase_sparam','_enemies','updateAggroControl','BattleStatusOffsetY','trim','Xcjbv','aggroGaugeColor1','version','arcHeight','_targetY','Game_Action_applyGlobal','actor','name','removeDeadProvokerStates','isBypassHighestAggro','provokeLineColor','log','isForAnyone','isProvokeAffected','map','ElUVw','toUpperCase','456636aOwfiV','getBattlerKeyTargets','endAction','aggroGaugeX','_scene','visible','addAggroControlSystemAggroCommand','_highestTgrMember','format','_regexp','aiTarget','wQtdg','HITTYPE_PHYSICAL','updateTauntAnimations','Spriteset_Battle_createBattleField','51115113xtROjZ','currentValue','Taunt','_physicalTauntAnimation','_cache','clearProvokers','BaWYZ','executeHpDamage','_homeY','round','AggroPerHeal','bitmapWidth','addCommand','match','Window_BattleEnemy_refresh','maxSprites','BattleStatusOffsetX','Game_Unit_onBattleStart','inputtingAction','_subject','bypassHighestAggro','textColor','createAggroGauge','eHbfI','NUM','boxWidth','currentMaxValue','ARRAYNUM','Game_Action_getSpecificBattlerKeyTarget','ActorChangeAggro','Game_Action_executeHpDamage','UcGtS','provoker','AddOption','isTpb','_lowestTgrMember','sQwvR','Sprite_Gauge_currentMaxValue','CnOIV','physicalTauntMembers','findTgrMember','Window_StatusBase_placeActorName','_counterAttackingTarget','lKSJB','AnchorY','applyTauntFilters','Sprite_Actor_update','list','gaugeColor1','isAggroGaugeShown','initMembers','invokeCounterAttack','XWWhi','magicalTaunt','battler','isSideView','OffsetX','enemy','addAggroControlSystemCommands','OpacitySpeed','xjUas','addChild','currentMaxValueAggroControl','ActorID','isTargetHighestTGR','OptionName','aggroGaugeY','applyGlobal','selectAllActors','showVisualAtbGauge','JLBja','qCjxw','STiZq','min','bind','gaugeHeight','loseAggro','_certainHitTauntAnimation','getTauntMembers','boxHeight','VisuMZ_3_BattleAI','updateSubPositions','gaugeColor2','gGnUp','_checkingAggroTarget','PartsSize','isAtbGaugeVisible','parse','STRUCT','anchor','user','9737448dMWrIx','maxOpacity','isAlive','placeGauge','hSsFZ','sortEnemies','VisuMZ_0_CoreEngine','shift','maxCommands','jbKMx','MYExb','GaugeColor2','randomTarget','aggro-gauge-color-1','55GHekCs','itemRectWithPadding','setup','canSingleOrMultipleSelect','BattleManager_invokeCounterAttack','setFrame','Game_Battler_addState','constructor','ONubE','createProvokeHeightOrigin','randomInt','HeightOrigin','Tcfgy','BattleManager_endBattle','_battler','aggroMultiplier','scale','bitmapHeight','_targetX','ConfigManager_makeData','_provokeBitmap','initialize','provokeOrigin','placeActorName','battleLayoutStyle','Sprite_Actor_createStateSprite','ActorSetAggro','currentValueAggroControl','randomTauntTarget','Spriteset_Battle_update','_damageContainer','pVyhS','clearAggro','FUNC','isAggroAffected','isActor','isPlaytest','MuteAnimations','549075NfTMFH','Game_BattlerBase_refresh','updateOpacityAggroControl','_statusWindow','_statusType','index','_opacitySpeed','CycleTime','exit','Sprite_Gauge_gaugeColor2','_%1TauntAnimation','SsGIo','8860952zuXXcJ','inBattle','iconWidth','applyProvokeEffect','invokeMagicReflection','concat','members','ArcHeight','tgr','aggroGaugeColor2','physicalTaunt','UcXGB','isTauntAffected','LineColor','omYsl','dzieJ','RNtTb','VisibleGauge','lowestTgrMember','states','refresh','_provoker','setBattler','onBattleEnd','makeProvokeTarget','Sprite_Battler_setBattler','Sprite_Battler_initialize','height','makeData','heightOrigin','_targetIndex','random','_colorCache','isShowPriorityLines','aggro','alwaysTargetHighestAggro','requestFauxAnimation','certainHitTauntMembers','Aggro','getSpecificBattlerKeyTarget','_aggroGaugeSprite','ConfigManager_applyData','battleUIOffsetY','XsUqv','updateAggroGaugeSprite','_mainSprite','applyData','description','baseAggro','reduce','includes','ShowLines','lpted','HITTYPE_MAGICAL','updateBattlerPositions','%1Taunt'];_0x452a=function(){return _0x31a2aa;};return _0x452a();}var label=_0x10e456(0x23c),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4e00c0){const _0x5dc8ef=_0x10e456;return _0x4e00c0[_0x5dc8ef(0x2a3)]&&_0x4e00c0[_0x5dc8ef(0x1f3)][_0x5dc8ef(0x1f6)]('['+label+']');})[0x0];VisuMZ[label][_0x10e456(0x201)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x10e456(0x296)]=function(_0x34f8ff,_0x55c952){const _0x4b7eb2=_0x10e456;for(const _0x277378 in _0x55c952){if(_0x277378['match'](/(.*):(.*)/i)){if(_0x4b7eb2(0x301)!==_0x4b7eb2(0x301)){if(!_0x34e019['isTpb']())return![];if(_0x4c5f50[_0x4b7eb2(0x27e)])return this[_0x4b7eb2(0x322)](_0x4b7eb2(0x28d));return!![];}else{const _0x330546=String(RegExp['$1']),_0x5925be=String(RegExp['$2'])[_0x4b7eb2(0x2cd)]()[_0x4b7eb2(0x2bc)]();let _0x311a81,_0x25e4e8,_0x2291a6;switch(_0x5925be){case _0x4b7eb2(0x2f5):_0x311a81=_0x55c952[_0x277378]!==''?Number(_0x55c952[_0x277378]):0x0;break;case _0x4b7eb2(0x2f8):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON['parse'](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x5f0346=>Number(_0x5f0346));break;case _0x4b7eb2(0x2b4):_0x311a81=_0x55c952[_0x277378]!==''?eval(_0x55c952[_0x277378]):null;break;case _0x4b7eb2(0x2ae):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON[_0x4b7eb2(0x334)](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x3c690c=>eval(_0x3c690c));break;case'JSON':_0x311a81=_0x55c952[_0x277378]!==''?JSON[_0x4b7eb2(0x334)](_0x55c952[_0x277378]):'';break;case _0x4b7eb2(0x25f):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON['parse'](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x3a3fcc=>JSON[_0x4b7eb2(0x334)](_0x3a3fcc));break;case _0x4b7eb2(0x1b3):_0x311a81=_0x55c952[_0x277378]!==''?new Function(JSON['parse'](_0x55c952[_0x277378])):new Function('return\x200');break;case _0x4b7eb2(0x255):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON[_0x4b7eb2(0x334)](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x4c42b8=>new Function(JSON[_0x4b7eb2(0x334)](_0x4c42b8)));break;case'STR':_0x311a81=_0x55c952[_0x277378]!==''?String(_0x55c952[_0x277378]):'';break;case _0x4b7eb2(0x233):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON[_0x4b7eb2(0x334)](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x3a7aa0=>String(_0x3a7aa0));break;case _0x4b7eb2(0x335):_0x2291a6=_0x55c952[_0x277378]!==''?JSON[_0x4b7eb2(0x334)](_0x55c952[_0x277378]):{},_0x311a81=VisuMZ[_0x4b7eb2(0x296)]({},_0x2291a6);break;case _0x4b7eb2(0x269):_0x25e4e8=_0x55c952[_0x277378]!==''?JSON['parse'](_0x55c952[_0x277378]):[],_0x311a81=_0x25e4e8[_0x4b7eb2(0x2cb)](_0x3876b9=>VisuMZ[_0x4b7eb2(0x296)]({},JSON['parse'](_0x3876b9)));break;default:continue;}_0x34f8ff[_0x330546]=_0x311a81;}}}return _0x34f8ff;},(_0x369ef0=>{const _0x44c2b3=_0x10e456,_0x1f7a1d=_0x369ef0[_0x44c2b3(0x2c4)];for(const _0xd41a55 of dependencies){if(!Imported[_0xd41a55]){if(_0x44c2b3(0x264)!==_0x44c2b3(0x1b1)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x44c2b3(0x2d6)](_0x1f7a1d,_0xd41a55)),SceneManager['exit']();break;}else return _0x15594b[_0x44c2b3(0x23c)][_0x44c2b3(0x201)][_0x44c2b3(0x2aa)][_0x44c2b3(0x19d)];}}const _0x4b419b=_0x369ef0[_0x44c2b3(0x1f3)];if(_0x4b419b[_0x44c2b3(0x2ea)](/\[Version[ ](.*?)\]/i)){const _0x3ef248=Number(RegExp['$1']);if(_0x3ef248!==VisuMZ[label][_0x44c2b3(0x2bf)]){if(_0x44c2b3(0x2cc)!==_0x44c2b3(0x295))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x44c2b3(0x2d6)](_0x1f7a1d,_0x3ef248)),SceneManager[_0x44c2b3(0x1c0)]();else{const _0x4421c3=_0x1e813e[_0x44c2b3(0x203)];this[_0x44c2b3(0x248)]()['gainAggro'](_0x4421c3*_0x4ea04b);}}}if(_0x4b419b[_0x44c2b3(0x2ea)](/\[Tier[ ](\d+)\]/i)){const _0x4087b8=Number(RegExp['$1']);if(_0x4087b8<tier){if('ocMID'!==_0x44c2b3(0x207)){let _0x3df5d8=_0x5e9fb1['AggroControlSystem'][_0x44c2b3(0x257)][_0x44c2b3(0x26e)](this);if(this['isAggroType']()&&this[_0x44c2b3(0x1a0)]){if(this[_0x44c2b3(0x1a0)][_0x44c2b3(0x275)]())return 0x0;if(this[_0x44c2b3(0x1a0)][_0x44c2b3(0x33a)]()&&this[_0x44c2b3(0x1a0)][_0x44c2b3(0x254)]()['aliveMembers']()[_0x44c2b3(0x2ac)]===0x1)return 0x1;}return _0x3df5d8['clamp'](0x0,0x1);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x44c2b3(0x2d6)](_0x1f7a1d,_0x4087b8,tier)),SceneManager[_0x44c2b3(0x1c0)]();}else{if(_0x44c2b3(0x325)==='STiZq')tier=Math[_0x44c2b3(0x2b2)](_0x4087b8,tier);else{if(_0x242910['isPlaytest']())_0x17571e[_0x44c2b3(0x2c8)](_0x19b734);}}}VisuMZ[_0x44c2b3(0x296)](VisuMZ[label]['Settings'],_0x369ef0['parameters']);})(pluginData),PluginManager[_0x10e456(0x28b)](pluginData['name'],_0x10e456(0x2fa),_0x28a66e=>{const _0x1bca61=_0x10e456;if(!$gameParty[_0x1bca61(0x1c5)]())return;VisuMZ['ConvertParams'](_0x28a66e,_0x28a66e);const _0x3901ad=$gameActors[_0x1bca61(0x2c3)](_0x28a66e[_0x1bca61(0x31c)]),_0xf4ba3d=_0x28a66e[_0x1bca61(0x1ea)];if(_0x3901ad)_0x3901ad[_0x1bca61(0x21a)](_0xf4ba3d);}),PluginManager['registerCommand'](pluginData[_0x10e456(0x2c4)],_0x10e456(0x1ac),_0x523994=>{const _0x373973=_0x10e456;if(!$gameParty[_0x373973(0x1c5)]())return;VisuMZ[_0x373973(0x296)](_0x523994,_0x523994);const _0x1cd926=$gameActors[_0x373973(0x2c3)](_0x523994[_0x373973(0x31c)]),_0x176601=_0x523994['Aggro'];if(_0x1cd926)_0x1cd926[_0x373973(0x239)](_0x176601);}),PluginManager[_0x10e456(0x28b)](pluginData[_0x10e456(0x2c4)],_0x10e456(0x220),_0x58ee8d=>{const _0x269a8f=_0x10e456;if(!$gameParty[_0x269a8f(0x1c5)]())return;VisuMZ[_0x269a8f(0x296)](_0x58ee8d,_0x58ee8d);const _0x10b3c4=$gameTroop['members']()[_0x58ee8d[_0x269a8f(0x298)]],_0x172b20=_0x58ee8d[_0x269a8f(0x1ea)];if(_0x10b3c4)_0x10b3c4[_0x269a8f(0x21a)](_0x172b20);}),PluginManager[_0x10e456(0x28b)](pluginData[_0x10e456(0x2c4)],_0x10e456(0x229),_0x3f269c=>{const _0x491132=_0x10e456;if(!$gameParty[_0x491132(0x1c5)]())return;VisuMZ[_0x491132(0x296)](_0x3f269c,_0x3f269c);const _0x99484c=$gameTroop[_0x491132(0x1ca)]()[_0x3f269c[_0x491132(0x298)]],_0x360ac8=_0x3f269c[_0x491132(0x1ea)];if(_0x99484c)_0x99484c[_0x491132(0x239)](_0x360ac8);}),DataManager[_0x10e456(0x2ad)]=function(_0x1ff62e){const _0xcccf8a=_0x10e456;if(!_0x1ff62e)return![];return _0x1ff62e['note'][_0xcccf8a(0x2ea)](/<PROVOKE>/i);},DataManager[_0x10e456(0x282)]=function(_0x1c823d){const _0x3c7c91=_0x10e456;if(!_0x1c823d)return![];return _0x1c823d[_0x3c7c91(0x293)][_0x3c7c91(0x2ea)](/<BYPASS PROVOKE>/i);},DataManager['isBypassTaunt']=function(_0x455400){const _0x259f48=_0x10e456;if(!_0x455400)return![];return _0x455400['note'][_0x259f48(0x2ea)](/<BYPASS TAUNT>/i);},DataManager[_0x10e456(0x2c6)]=function(_0x392620){const _0xb0d250=_0x10e456;if(!_0x392620)return![];return _0x392620[_0xb0d250(0x293)][_0xb0d250(0x2ea)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager['alwaysTargetHighestAggro']=function(_0x17135b){const _0x336140=_0x10e456;if(!_0x17135b)return![];return _0x17135b[_0x336140(0x293)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x10e456(0x276)]=function(){const _0x102a2c=_0x10e456;if(this[_0x102a2c(0x1a6)])return this[_0x102a2c(0x1a6)];return this['_provokeBitmap']=new Bitmap(0x64,0x64),this[_0x102a2c(0x1a6)][_0x102a2c(0x216)](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this[_0x102a2c(0x1a6)]['_customModified']=![],this[_0x102a2c(0x1a6)];},ConfigManager[_0x10e456(0x25b)]=!![],ConfigManager['provokeOrigin']=!![],VisuMZ['AggroControlSystem'][_0x10e456(0x1a5)]=ConfigManager[_0x10e456(0x1e0)],ConfigManager[_0x10e456(0x1e0)]=function(){const _0x22a5ef=_0x10e456,_0x38f141=VisuMZ['AggroControlSystem'][_0x22a5ef(0x1a5)][_0x22a5ef(0x26e)](this);return _0x38f141['aggroGauge']=this['aggroGauge'],_0x38f141['provokeOrigin']=this['provokeOrigin'],_0x38f141;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x1ed)]=ConfigManager[_0x10e456(0x1f2)],ConfigManager['applyData']=function(_0xdb41bd){const _0x44493f=_0x10e456;VisuMZ[_0x44493f(0x23c)][_0x44493f(0x1ed)][_0x44493f(0x26e)](this,_0xdb41bd),_0x44493f(0x25b)in _0xdb41bd?this[_0x44493f(0x25b)]=_0xdb41bd[_0x44493f(0x25b)]:_0x44493f(0x240)!==_0x44493f(0x240)?(_0x34ff28[_0x44493f(0x23c)][_0x44493f(0x2fb)][_0x44493f(0x26e)](this,_0x4069d4,_0x13e68b),this[_0x44493f(0x22d)](_0x3faec1,_0x44a026)):this[_0x44493f(0x25b)]=!![],_0x44493f(0x1a8)in _0xdb41bd?this[_0x44493f(0x1a8)]=_0xdb41bd[_0x44493f(0x1a8)]:this[_0x44493f(0x1a8)]=!![];},TextManager['aggroGauge']=VisuMZ['AggroControlSystem'][_0x10e456(0x201)]['Aggro']['OptionName'],TextManager[_0x10e456(0x1a8)]=VisuMZ['AggroControlSystem'][_0x10e456(0x201)][_0x10e456(0x2aa)][_0x10e456(0x31e)],ColorManager['getColorDataFromPluginParameters']=function(_0x29880a,_0x175096){const _0x37826a=_0x10e456;return _0x175096=String(_0x175096),this['_colorCache']=this[_0x37826a(0x1e4)]||{},_0x175096[_0x37826a(0x2ea)](/#(.*)/i)?this['_colorCache'][_0x29880a]='#%1'[_0x37826a(0x2d6)](String(RegExp['$1'])):this[_0x37826a(0x1e4)][_0x29880a]=this[_0x37826a(0x2f2)](Number(_0x175096)),this[_0x37826a(0x1e4)][_0x29880a];},ColorManager['getColor']=function(_0x573346){const _0x55cde3=_0x10e456;_0x573346=String(_0x573346);if(_0x573346[_0x55cde3(0x2ea)](/#(.*)/i))return'#%1'[_0x55cde3(0x2d6)](String(RegExp['$1']));else{if(_0x55cde3(0x319)===_0x55cde3(0x319))return this[_0x55cde3(0x2f2)](Number(_0x573346));else _0x33960f[_0x55cde3(0x23c)][_0x55cde3(0x2eb)]['call'](this);}},ColorManager[_0x10e456(0x2c7)]=function(){const _0x142177=_0x10e456,_0x54f8e9='provoke-line-color';this['_colorCache']=this[_0x142177(0x1e4)]||{};if(this[_0x142177(0x1e4)][_0x54f8e9])return this[_0x142177(0x1e4)][_0x54f8e9];const _0x88cda2=VisuMZ[_0x142177(0x23c)]['Settings'][_0x142177(0x2aa)][_0x142177(0x1d1)];return this[_0x142177(0x2a1)](_0x54f8e9,_0x88cda2);},ColorManager['aggroGaugeColor1']=function(){const _0x260927=_0x10e456,_0xb9dd27=_0x260927(0x191);this[_0x260927(0x1e4)]=this[_0x260927(0x1e4)]||{};if(this[_0x260927(0x1e4)][_0xb9dd27])return this[_0x260927(0x1e4)][_0xb9dd27];const _0x120a5a=VisuMZ[_0x260927(0x23c)][_0x260927(0x201)][_0x260927(0x1ea)]['GaugeColor1'];return this[_0x260927(0x2a1)](_0xb9dd27,_0x120a5a);},ColorManager[_0x10e456(0x1cd)]=function(){const _0x439fb0=_0x10e456,_0x45fbca='aggro-gauge-color-2';this[_0x439fb0(0x1e4)]=this['_colorCache']||{};if(this['_colorCache'][_0x45fbca])return this[_0x439fb0(0x1e4)][_0x45fbca];const _0x19f8e5=VisuMZ['AggroControlSystem'][_0x439fb0(0x201)][_0x439fb0(0x1ea)][_0x439fb0(0x18f)];return this[_0x439fb0(0x2a1)](_0x45fbca,_0x19f8e5);},SceneManager['isSceneBattle']=function(){const _0x50088a=_0x10e456;return this[_0x50088a(0x2d2)]&&this[_0x50088a(0x2d2)]['constructor']===Scene_Battle;},BattleManager['convertBattleTargetToString']=function(_0x55467e){const _0x492dc8=_0x10e456;let _0x54c3f1=this[_0x492dc8(0x2f0)];this[_0x492dc8(0x307)]&&(_0x54c3f1=this[_0x492dc8(0x307)]);if(!_0x54c3f1){if(_0x492dc8(0x268)!==_0x492dc8(0x268))_0x3efb10[_0x492dc8(0x23c)][_0x492dc8(0x24d)][_0x492dc8(0x26e)](this),_0x4644a5[_0x492dc8(0x2af)](),_0x8f30b0[_0x492dc8(0x2af)]();else return null;}if(_0x54c3f1[_0x492dc8(0x1b5)]()&&_0x55467e[_0x492dc8(0x27c)]())return _0x492dc8(0x241)[_0x492dc8(0x2d6)](_0x54c3f1[_0x492dc8(0x21d)]());else{if(_0x54c3f1[_0x492dc8(0x27c)]()&&_0x55467e['isActor']())return'Battle\x20Enemy\x20%1'[_0x492dc8(0x2d6)](_0x54c3f1[_0x492dc8(0x1bd)]());}return null;},BattleManager[_0x10e456(0x263)]=function(_0x1b0463){const _0x5f4999=_0x10e456;if(!_0x1b0463)return null;if(_0x1b0463[_0x5f4999(0x2ea)](/BATTLE ACTOR (\d+)/i))return $gameActors['actor'](Number(RegExp['$1']));else{if(_0x1b0463['match'](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x5f4999(0x1ca)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x10e456(0x31d)]=function(){const _0x2830fc=_0x10e456;return VisuMZ[_0x2830fc(0x23c)][_0x2830fc(0x201)][_0x2830fc(0x1ea)]['PriorityHighest'];},VisuMZ['AggroControlSystem'][_0x10e456(0x2f9)]=Game_Action[_0x10e456(0x2a8)][_0x10e456(0x1eb)],Game_Action[_0x10e456(0x2a8)][_0x10e456(0x1eb)]=function(){const _0x5c6eac=_0x10e456;let _0x3e6596=VisuMZ['AggroControlSystem']['Game_Action_getSpecificBattlerKeyTarget'][_0x5c6eac(0x26e)](this);if(this[_0x5c6eac(0x331)])return _0x3e6596;this[_0x5c6eac(0x331)]=!![];if(_0x3e6596&&_0x3e6596['isActor']()!==this[_0x5c6eac(0x248)]()['isActor']()){if(_0x5c6eac(0x261)!==_0x5c6eac(0x1cf)){this[_0x5c6eac(0x1e2)]=-0x1;if(this['isProvokeAffected']())_0x3e6596=this['subject']()[_0x5c6eac(0x2fd)]();else{if(this['isTauntAffected']()){this[_0x5c6eac(0x331)]=![];const _0x59e607=this[_0x5c6eac(0x266)]()[_0x5c6eac(0x247)],_0x11ccff=this[_0x5c6eac(0x1fe)]()[_0x5c6eac(0x32b)](_0x59e607);!_0x11ccff[_0x5c6eac(0x1f6)](_0x3e6596)&&(_0x3e6596=_0x11ccff[Math[_0x5c6eac(0x19c)](_0x11ccff[_0x5c6eac(0x2ac)])]);}else this[_0x5c6eac(0x1b4)]()&&(this[_0x5c6eac(0x331)]=![],_0x3e6596=this[_0x5c6eac(0x1fe)]()[_0x5c6eac(0x200)]());}}else{const _0x465d58=_0x355dce[_0x5c6eac(0x214)]?0x4:0x3,_0x46a65c=_0x465d58*0x80+(_0x465d58-0x1)*0x8+0x4,_0x248b28=this['actor'](_0x90330);let _0x1145b5=_0x160b82['x']+this[_0x5c6eac(0x227)];_0x418dce['BattleCore'][_0x5c6eac(0x201)]['BattleLayout'][_0x5c6eac(0x251)]?_0x1145b5=_0x4651b3['x']+_0x615db[_0x5c6eac(0x25e)]+0x8:_0x1145b5+=_0x18bbb5[_0x5c6eac(0x1c6)],_0x30fecc=_0x48cac7['round'](_0x35ef69[_0x5c6eac(0x326)](_0x4a1c2f['x']+_0x58c881[_0x5c6eac(0x234)]-_0x46a65c,_0x1145b5)),_0x119ea2-=0x4;}}return this[_0x5c6eac(0x331)]=![],_0x3e6596;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x23b)]=Game_Action[_0x10e456(0x2a8)][_0x10e456(0x24a)],Game_Action['prototype'][_0x10e456(0x24a)]=function(_0x336057){const _0x5c5c31=_0x10e456;if(this[_0x5c5c31(0x2ca)]())return this[_0x5c5c31(0x1dc)]();else{if(this[_0x5c5c31(0x1d0)]())return this[_0x5c5c31(0x287)](_0x336057);else{if(this[_0x5c5c31(0x1b4)]()){if(_0x5c5c31(0x2fc)!==_0x5c5c31(0x2fc))this[_0x5c5c31(0x1d9)]={};else return _0x336057[_0x5c5c31(0x2af)](),[_0x336057[_0x5c5c31(0x200)]()];}else return VisuMZ[_0x5c5c31(0x23c)][_0x5c5c31(0x23b)]['call'](this,_0x336057);}}},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x219)]=function(){const _0x3150d2=_0x10e456;if(this['isForAnyone']&&this[_0x3150d2(0x2c9)]()&&this[_0x3150d2(0x243)]()){const _0x14450e=this[_0x3150d2(0x2cf)]();return _0x14450e[_0x3150d2(0x2ac)]>=0x1&&_0x14450e[0x0]&&_0x14450e[0x0]['isActor']()===this[_0x3150d2(0x248)]()['isActor']();}else{if(this[_0x3150d2(0x266)]()['scope']!==0x1)return!![];}return![];},Game_Action['prototype'][_0x10e456(0x2ca)]=function(){const _0x2ebac7=_0x10e456;if(!$gameParty[_0x2ebac7(0x1c5)]())return![];if(!this[_0x2ebac7(0x266)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this[_0x2ebac7(0x243)]())return![];if(DataManager['isBypassProvoke'](this[_0x2ebac7(0x266)]()))return![];if(this[_0x2ebac7(0x248)]()['bypassProvoke']())return![];if(!this[_0x2ebac7(0x248)]()[_0x2ebac7(0x2ca)]())return![];const _0x13e579=this['subject']()[_0x2ebac7(0x2fd)]();if(_0x13e579['isDead']())return![];return!![];},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x1dc)]=function(){const _0x2ba4ae=_0x10e456;return[this[_0x2ba4ae(0x248)]()[_0x2ba4ae(0x2fd)]()];},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x1d0)]=function(){const _0x250e50=_0x10e456;if(!$gameParty[_0x250e50(0x1c5)]())return![];if(!this[_0x250e50(0x266)]())return![];if(this[_0x250e50(0x219)]())return![];if(!this[_0x250e50(0x243)]())return![];if(DataManager['isBypassTaunt'](this[_0x250e50(0x266)]()))return![];if(this[_0x250e50(0x248)]()[_0x250e50(0x27d)]())return![];const _0x19e3c0=this['opponentsUnit']();let _0x47e375=![];if(this['isPhysical']()&&_0x19e3c0[_0x250e50(0x304)]()[_0x250e50(0x2ac)]>0x0)_0x47e375=!![];if(this[_0x250e50(0x23a)]()&&_0x19e3c0[_0x250e50(0x249)]()['length']>0x0)_0x47e375=!![];if(this[_0x250e50(0x22e)]()&&_0x19e3c0['certainHitTauntMembers']()['length']>0x0)_0x47e375=!![];return _0x47e375;},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x287)]=function(_0x40db1a){const _0x4b786f=_0x10e456;if(this[_0x4b786f(0x1e2)]<0x0)return[_0x40db1a[_0x4b786f(0x1ae)](this[_0x4b786f(0x266)]()['hitType'])];else{if(_0x4b786f(0x1d3)!==_0x4b786f(0x324)){const _0xfb8a16=_0x40db1a[_0x4b786f(0x1fd)](this[_0x4b786f(0x1e2)]);if(_0xfb8a16['matchTauntType'](this[_0x4b786f(0x266)]()[_0x4b786f(0x247)]))return[_0xfb8a16];else{if(_0x4b786f(0x278)==='YyjHt')return[_0x40db1a[_0x4b786f(0x1ae)]()];else{if(!_0x4afde5['VisuMZ_1_BattleCore'])return![];if(![_0x14f465,_0x55b620]['includes'](this['constructor']))return![];return _0x146cef[_0x4b786f(0x1a8)]&&_0x27496d[_0x4b786f(0x23c)][_0x4b786f(0x201)][_0x4b786f(0x2aa)][_0x4b786f(0x1f7)];}}}else{if(_0x29a0c4['VisuMZ_1_BattleCore']&&this[_0x4b786f(0x199)]===_0x18f622)return![];return _0x2bf411['aggroGauge']&&_0x3c4e5d[_0x4b786f(0x23c)][_0x4b786f(0x201)]['Aggro']['VisibleGauge'];}}},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x1b4)]=function(){const _0x2530d0=_0x10e456;if(!$gameParty['inBattle']())return![];if(this['isNotEnemySelectAction']())return![];if(this['_targetIndex']>=0x0)return![];if(Imported[_0x2530d0(0x32d)]&&this[_0x2530d0(0x248)]()[_0x2530d0(0x27c)]()){if('PKhnq'!==_0x2530d0(0x285)){const _0x4f64af=this[_0x2530d0(0x266)]()[_0x2530d0(0x293)]||'',_0x56ecd1=AIManager[_0x2530d0(0x2d7)];if(_0x4f64af['match'](_0x56ecd1[_0x2530d0(0x2d8)]))return![];}else _0x5c7685[_0x2530d0(0x23c)][_0x2530d0(0x245)][_0x2530d0(0x26e)](this),this['addAggroControlSystemCommands']();}if(DataManager[_0x2530d0(0x2c6)](this[_0x2530d0(0x266)]()))return![];if(this['subject']()[_0x2530d0(0x2f1)]())return![];if(DataManager[_0x2530d0(0x1e7)](this[_0x2530d0(0x266)]()))return!![];if(this['subject']()[_0x2530d0(0x1e7)]())return!![];if(this[_0x2530d0(0x248)]()[_0x2530d0(0x1b5)]())return![];return BattleManager[_0x2530d0(0x31d)]();},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x2c2)]=Game_Action[_0x10e456(0x2a8)][_0x10e456(0x320)],Game_Action[_0x10e456(0x2a8)]['applyGlobal']=function(){const _0x4a5dd0=_0x10e456;VisuMZ[_0x4a5dd0(0x23c)][_0x4a5dd0(0x2c2)][_0x4a5dd0(0x26e)](this),this[_0x4a5dd0(0x24b)]();},Game_Action['prototype'][_0x10e456(0x24b)]=function(){const _0x4431d6=_0x10e456,_0x461138=this['item']()[_0x4431d6(0x293)];if(_0x461138[_0x4431d6(0x2ea)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x1f0aa4=Number(RegExp['$1']);this[_0x4431d6(0x248)]()['gainAggro'](_0x1f0aa4);}if(_0x461138[_0x4431d6(0x2ea)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x3f4d87=String(RegExp['$1']);window[_0x4431d6(0x337)]=this[_0x4431d6(0x248)](),window[_0x4431d6(0x266)]=this[_0x4431d6(0x266)](),window['a']=this[_0x4431d6(0x248)](),window['b']=a,window[_0x4431d6(0x224)]=user[_0x4431d6(0x25d)]();try{eval(_0x3f4d87);}catch(_0x559225){if(_0x4431d6(0x25a)!=='Ehhkq'){if($gameTemp[_0x4431d6(0x1b6)]())console[_0x4431d6(0x2c8)](_0x559225);}else return this[_0x4431d6(0x299)]()[_0x4431d6(0x250)](_0x4d4a5e=>_0x4d4a5e&&_0x4d4a5e[_0x4431d6(0x312)]());}user[_0x4431d6(0x239)](window[_0x4431d6(0x224)]),window[_0x4431d6(0x337)]=undefined,window[_0x4431d6(0x22f)]=undefined,window[_0x4431d6(0x266)]=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x226)]=Game_Action[_0x10e456(0x2a8)][_0x10e456(0x29e)],Game_Action[_0x10e456(0x2a8)][_0x10e456(0x29e)]=function(_0x3921b8){const _0x532c09=_0x10e456;VisuMZ[_0x532c09(0x23c)][_0x532c09(0x226)][_0x532c09(0x26e)](this,_0x3921b8),this[_0x532c09(0x27b)](_0x3921b8);},Game_Action[_0x10e456(0x2a8)]['applyItemUserEffectAggroControl']=function(_0x1a8bfd){const _0x505366=_0x10e456;if(!this[_0x505366(0x266)]())return;if(!SceneManager[_0x505366(0x2a4)]())return;const _0x1a3dad=this['item']()[_0x505366(0x293)];if(_0x1a3dad[_0x505366(0x2ea)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x4cecdb=Number(RegExp['$1']);_0x1a8bfd[_0x505366(0x21a)](_0x4cecdb);}if(_0x1a3dad['match'](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x44543f=String(RegExp['$1']);window[_0x505366(0x337)]=this[_0x505366(0x248)](),window[_0x505366(0x22f)]=_0x1a8bfd,window[_0x505366(0x266)]=this[_0x505366(0x266)](),window['a']=this[_0x505366(0x248)](),window['b']=_0x1a8bfd,window[_0x505366(0x224)]=_0x1a8bfd[_0x505366(0x25d)]();try{eval(_0x44543f);}catch(_0x17b194){if($gameTemp[_0x505366(0x1b6)]())console['log'](_0x17b194);}_0x1a8bfd[_0x505366(0x239)](window[_0x505366(0x224)]),window[_0x505366(0x337)]=undefined,window['target']=undefined,window[_0x505366(0x266)]=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x2fb)]=Game_Action['prototype'][_0x10e456(0x2e4)],Game_Action[_0x10e456(0x2a8)][_0x10e456(0x2e4)]=function(_0x316328,_0x1566f6){const _0x16f0c3=_0x10e456;VisuMZ[_0x16f0c3(0x23c)]['Game_Action_executeHpDamage'][_0x16f0c3(0x26e)](this,_0x316328,_0x1566f6),this[_0x16f0c3(0x22d)](_0x316328,_0x1566f6);},Game_Action[_0x10e456(0x2a8)][_0x10e456(0x22d)]=function(_0x55fc5f,_0x3fee18){const _0x2488a7=_0x10e456,_0x33b2f2=VisuMZ[_0x2488a7(0x23c)][_0x2488a7(0x201)]['Aggro'];if(_0x3fee18>0x0&&_0x55fc5f['isActor']()!==this[_0x2488a7(0x248)]()['isActor']()){const _0x32f616=_0x33b2f2[_0x2488a7(0x203)];this[_0x2488a7(0x248)]()['gainAggro'](_0x32f616*_0x3fee18);}if(_0x3fee18<0x0&&_0x55fc5f[_0x2488a7(0x1b5)]()===this[_0x2488a7(0x248)]()['isActor']()){if(_0x2488a7(0x2a7)!=='feEnr'){if(!_0x2af05b[_0x2488a7(0x1c5)]())return![];if(!this[_0x2488a7(0x266)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this['needsSelection']())return![];if(_0xefb18d[_0x2488a7(0x282)](this[_0x2488a7(0x266)]()))return![];if(this[_0x2488a7(0x248)]()[_0x2488a7(0x1ff)]())return![];if(!this[_0x2488a7(0x248)]()['isProvokeAffected']())return![];const _0x25038d=this['subject']()[_0x2488a7(0x2fd)]();if(_0x25038d['isDead']())return![];return!![];}else{const _0x166e00=_0x33b2f2['AggroPerHeal'];this[_0x2488a7(0x248)]()[_0x2488a7(0x21a)](_0x166e00*Math['abs'](_0x3fee18));}}},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x244)]=Game_BattlerBase[_0x10e456(0x2a8)]['initMembers'],Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x30f)]=function(){const _0x1688b3=_0x10e456;this[_0x1688b3(0x2e1)]={},VisuMZ[_0x1688b3(0x23c)][_0x1688b3(0x244)]['call'](this),this['initAggroControl']();},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x24f)]=function(){const _0x1b1d2b=_0x10e456;this[_0x1b1d2b(0x2e2)](),this[_0x1b1d2b(0x1b2)]();},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x2e2)]=function(){const _0x45676c=_0x10e456;this[_0x45676c(0x1d9)]={};},VisuMZ[_0x10e456(0x23c)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x10e456(0x2a8)]['refresh'],Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1d8)]=function(){const _0x1e0e7f=_0x10e456;this[_0x1e0e7f(0x2e1)]={},VisuMZ[_0x1e0e7f(0x23c)][_0x1e0e7f(0x1b9)][_0x1e0e7f(0x26e)](this),this[_0x1e0e7f(0x2c5)]();},Game_BattlerBase['prototype'][_0x10e456(0x20b)]=function(_0x64a14){const _0x40f0f0=_0x10e456;return this[_0x40f0f0(0x2e1)]=this[_0x40f0f0(0x2e1)]||{},this[_0x40f0f0(0x2e1)][_0x64a14]!==undefined;},Game_BattlerBase[_0x10e456(0x2a8)]['provoker']=function(){const _0x2e982a=_0x10e456;for(const _0x13ab1a of this['states']()){if(DataManager['stateHasProvoke'](_0x13ab1a)){if(this[_0x2e982a(0x1d9)]===undefined)this['clearProvokers']();const _0x1c209a=this[_0x2e982a(0x1d9)][_0x13ab1a['id']],_0x24518b=BattleManager[_0x2e982a(0x263)](_0x1c209a);if(_0x24518b&&_0x24518b['isAlive']())return _0x24518b;}}return null;},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x2ca)]=function(){const _0x11581c=_0x10e456;return!!this[_0x11581c(0x2fd)]();},Game_BattlerBase[_0x10e456(0x2a8)]['bypassProvoke']=function(){const _0x2dc65a=_0x10e456;return this[_0x2dc65a(0x24c)]()[_0x2dc65a(0x297)](_0x5239b7=>_0x5239b7&&_0x5239b7[_0x2dc65a(0x293)][_0x2dc65a(0x2ea)](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x10e456(0x2a8)]['provokeHeightOrigin']=function(){const _0xbbde2a=_0x10e456;let _0x4f3dfe='provokeHeightOrigin';if(this[_0xbbde2a(0x20b)](_0x4f3dfe))return this['_cache'][_0x4f3dfe];return this[_0xbbde2a(0x2e1)][_0x4f3dfe]=this[_0xbbde2a(0x19b)](),this[_0xbbde2a(0x2e1)][_0x4f3dfe];},Game_BattlerBase[_0x10e456(0x2a8)]['createProvokeHeightOrigin']=function(){const _0x4013fd=_0x10e456,_0x1ab5c9=this[_0x4013fd(0x1b5)]()?this[_0x4013fd(0x2c3)]()[_0x4013fd(0x293)]:this[_0x4013fd(0x27c)]()?this[_0x4013fd(0x316)]()['note']:'';if(_0x1ab5c9[_0x4013fd(0x2ea)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x4013fd(0x23c)][_0x4013fd(0x201)][_0x4013fd(0x2aa)][_0x4013fd(0x19d)];},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x2c5)]=function(){const _0x2f7107=_0x10e456;for(const _0x44c46c of this[_0x2f7107(0x1d7)]()){if(DataManager['stateHasProvoke'](_0x44c46c)){if(this['_provoker']===undefined)this['clearProvokers']();const _0xafccd5=this[_0x2f7107(0x1d9)][_0x44c46c['id']],_0x528b34=BattleManager[_0x2f7107(0x263)](_0xafccd5);_0x528b34&&_0x528b34[_0x2f7107(0x275)]()&&this['removeState'](_0x44c46c['id']);}}},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x202)]=function(_0x5972db){const _0x3dc9e4=_0x10e456;switch(_0x5972db){case Game_Action[_0x3dc9e4(0x2da)]:return this[_0x3dc9e4(0x1ce)]();break;case Game_Action[_0x3dc9e4(0x1f9)]:return this['magicalTaunt']();break;case Game_Action['HITTYPE_CERTAIN']:return this['certainHitTaunt']();break;}},Game_BattlerBase['prototype'][_0x10e456(0x208)]=function(){const _0x50056e=_0x10e456;return this[_0x50056e(0x1ce)]()||this[_0x50056e(0x312)]()||this[_0x50056e(0x23e)]();},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1ce)]=function(){const _0x3e378e=_0x10e456;return this[_0x3e378e(0x24c)]()['some'](_0x133df4=>_0x133df4&&_0x133df4['note'][_0x3e378e(0x2ea)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x312)]=function(){const _0x3bcc68=_0x10e456;return this[_0x3bcc68(0x24c)]()['some'](_0xab2729=>_0xab2729&&_0xab2729['note']['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype']['certainHitTaunt']=function(){const _0xa5d456=_0x10e456;return this[_0xa5d456(0x24c)]()[_0xa5d456(0x297)](_0x248e58=>_0x248e58&&_0x248e58[_0xa5d456(0x293)][_0xa5d456(0x2ea)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x10e456(0x2a8)]['bypassTaunt']=function(){const _0xc05ce9=_0x10e456;return this[_0xc05ce9(0x24c)]()[_0xc05ce9(0x297)](_0x480512=>_0x480512&&_0x480512[_0xc05ce9(0x293)][_0xc05ce9(0x2ea)](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1b2)]=function(){const _0x270bb3=_0x10e456;this[_0x270bb3(0x242)]=0x1;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x2b8)]=Game_BattlerBase['prototype'][_0x10e456(0x225)],Game_BattlerBase['prototype'][_0x10e456(0x225)]=function(_0x3505ec){const _0x1dc558=_0x10e456;let _0x22ec64=VisuMZ[_0x1dc558(0x23c)][_0x1dc558(0x2b8)][_0x1dc558(0x26e)](this,_0x3505ec);if(_0x3505ec===0x0){if(this['_aggro']===undefined)this[_0x1dc558(0x1b2)]();_0x22ec64*=this[_0x1dc558(0x1e6)](),_0x22ec64=Math[_0x1dc558(0x2b2)](_0x22ec64,0x0);}return _0x22ec64;},Game_BattlerBase['prototype'][_0x10e456(0x239)]=function(_0x2eaec0){const _0x4ead21=_0x10e456;if(this['_aggro']===undefined)this[_0x4ead21(0x1b2)]();this[_0x4ead21(0x242)]=Math[_0x4ead21(0x2b2)](0x1,Math['round'](this['_aggro']));},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x21a)]=function(_0x4e111f){const _0x409506=_0x10e456;if(this[_0x409506(0x242)]===undefined)this[_0x409506(0x1b2)]();this[_0x409506(0x242)]=Math[_0x409506(0x2b2)](0x1,this[_0x409506(0x242)]+Math['round'](_0x4e111f));},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x329)]=function(_0x57b499){const _0x2af6b3=_0x10e456;this[_0x2af6b3(0x21a)](-_0x57b499);},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1e6)]=function(){const _0x4af9b8=_0x10e456;if(this[_0x4af9b8(0x275)]())return 0x0;return this[_0x4af9b8(0x1f4)]()*this[_0x4af9b8(0x1a1)]();},Game_BattlerBase[_0x10e456(0x2a8)]['battleAggro']=function(){const _0x4a1f01=_0x10e456;return this[_0x4a1f01(0x242)]===undefined&&this['clearAggro'](),this[_0x4a1f01(0x242)];},Game_BattlerBase[_0x10e456(0x2a8)]['baseAggro']=function(){const _0x1834bc=_0x10e456;return this[_0x1834bc(0x24c)]()['reduce']((_0x3ce18a,_0x247d33)=>{const _0x3e86e7=_0x1834bc;if(_0x3e86e7(0x2f4)!==_0x3e86e7(0x2f4))_0x549b38[_0x3e86e7(0x23c)][_0x3e86e7(0x1af)]['call'](this),this[_0x3e86e7(0x2ba)]();else return _0x247d33&&_0x247d33[_0x3e86e7(0x293)][_0x3e86e7(0x2ea)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x3ce18a+Number(RegExp['$1'])/0x64:_0x3ce18a;},this[_0x1834bc(0x25d)]());},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1a1)]=function(){const _0x48f02f=_0x10e456;return this[_0x48f02f(0x24c)]()[_0x48f02f(0x1f5)]((_0x1a4725,_0x310b24)=>{const _0xf3b7ae=_0x48f02f;if(_0xf3b7ae(0x2e3)===_0xf3b7ae(0x24e))this[_0xf3b7ae(0x2d4)]();else return _0x310b24&&_0x310b24[_0xf3b7ae(0x293)][_0xf3b7ae(0x2ea)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x1a4725+Number(RegExp['$1'])/0x64:_0x1a4725;},0x1);},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x2f1)]=function(){const _0x131f85=_0x10e456;return this['traitObjects']()[_0x131f85(0x297)](_0x5b0347=>_0x5b0347&&_0x5b0347[_0x131f85(0x293)][_0x131f85(0x2ea)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x10e456(0x2a8)][_0x10e456(0x1e7)]=function(){const _0x1a9aa5=_0x10e456;return this[_0x1a9aa5(0x24c)]()[_0x1a9aa5(0x297)](_0x22a402=>_0x22a402&&_0x22a402[_0x1a9aa5(0x293)][_0x1a9aa5(0x2ea)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x26c)]=Game_Battler[_0x10e456(0x2a8)]['onBattleStart'],Game_Battler[_0x10e456(0x2a8)]['onBattleStart']=function(_0x2879e6){const _0xfdd6a8=_0x10e456;VisuMZ[_0xfdd6a8(0x23c)]['Game_Battler_onBattleStart'][_0xfdd6a8(0x26e)](this,_0x2879e6),this['clearAggro']();},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x253)]=Game_Battler[_0x10e456(0x2a8)][_0x10e456(0x1db)],Game_Battler[_0x10e456(0x2a8)][_0x10e456(0x1db)]=function(){const _0x4e44ea=_0x10e456;VisuMZ[_0x4e44ea(0x23c)]['Game_Battler_onBattleEnd'][_0x4e44ea(0x26e)](this),this[_0x4e44ea(0x1b2)]();},VisuMZ[_0x10e456(0x23c)]['Game_Battler_addState']=Game_Battler[_0x10e456(0x2a8)][_0x10e456(0x20c)],Game_Battler['prototype']['addState']=function(_0x229ad9){const _0x46691f=_0x10e456;VisuMZ['AggroControlSystem'][_0x46691f(0x198)][_0x46691f(0x26e)](this,_0x229ad9),this[_0x46691f(0x1c7)](_0x229ad9);},Game_Battler[_0x10e456(0x2a8)]['applyProvokeEffect']=function(_0x2570a5){const _0x53a941=_0x10e456;if(this[_0x53a941(0x237)](_0x2570a5)){if(this['_provoker']===undefined)this['clearProvokers']();const _0x3f309d=BattleManager[_0x53a941(0x258)](this);this[_0x53a941(0x1d9)][_0x2570a5]=_0x3f309d,!this[_0x53a941(0x1d9)][_0x2570a5]&&delete this[_0x53a941(0x1d9)][_0x2570a5];}},VisuMZ['AggroControlSystem'][_0x10e456(0x196)]=BattleManager[_0x10e456(0x310)],BattleManager[_0x10e456(0x310)]=function(_0x3b7b04,_0x1fc9a1){const _0x22e862=_0x10e456;this['_counterAttackingTarget']=_0x1fc9a1,VisuMZ[_0x22e862(0x23c)]['BattleManager_invokeCounterAttack']['call'](this,_0x3b7b04,_0x1fc9a1),this[_0x22e862(0x307)]=undefined;},VisuMZ[_0x10e456(0x23c)]['BattleManager_invokeMagicReflection']=BattleManager['invokeMagicReflection'],BattleManager[_0x10e456(0x1c8)]=function(_0x416a73,_0x5355d3){const _0x307cfa=_0x10e456;this[_0x307cfa(0x307)]=_0x5355d3,VisuMZ[_0x307cfa(0x23c)][_0x307cfa(0x26f)]['call'](this,_0x416a73,_0x5355d3),this[_0x307cfa(0x307)]=undefined;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x2ee)]=Game_Unit['prototype'][_0x10e456(0x271)],Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x271)]=function(_0xc41629){const _0x3c8ddb=_0x10e456;this[_0x3c8ddb(0x2af)](),VisuMZ[_0x3c8ddb(0x23c)][_0x3c8ddb(0x2ee)][_0x3c8ddb(0x26e)](this,_0xc41629);},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x304)]=function(){const _0x56fb04=_0x10e456;return this[_0x56fb04(0x299)]()[_0x56fb04(0x250)](_0x4eb435=>_0x4eb435&&_0x4eb435[_0x56fb04(0x1ce)]());},Game_Unit[_0x10e456(0x2a8)]['magicalTauntMembers']=function(){const _0x4ec6f8=_0x10e456;return this[_0x4ec6f8(0x299)]()[_0x4ec6f8(0x250)](_0x4b1e2b=>_0x4b1e2b&&_0x4b1e2b[_0x4ec6f8(0x312)]());},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x1e9)]=function(){const _0x44abef=_0x10e456;return this[_0x44abef(0x299)]()[_0x44abef(0x250)](_0x2f6ea3=>_0x2f6ea3&&_0x2f6ea3['certainHitTaunt']());},Game_Unit[_0x10e456(0x2a8)]['getTauntMembers']=function(_0x28eb83){const _0x59442c=_0x10e456;switch(_0x28eb83){case Game_Action[_0x59442c(0x2da)]:return this['physicalTauntMembers']();break;case Game_Action[_0x59442c(0x1f9)]:return this[_0x59442c(0x249)]();break;case Game_Action[_0x59442c(0x280)]:return this[_0x59442c(0x1e9)]();break;}return[];},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x1ae)]=function(_0x41653d){const _0x48d6fb=_0x10e456;let _0x1315e8=[];switch(_0x41653d){case Game_Action[_0x48d6fb(0x2da)]:_0x1315e8=this[_0x48d6fb(0x304)]();break;case Game_Action[_0x48d6fb(0x1f9)]:_0x1315e8=this[_0x48d6fb(0x249)]();break;case Game_Action[_0x48d6fb(0x280)]:_0x1315e8=this[_0x48d6fb(0x1e9)]();break;}let _0x5a7f52=Math[_0x48d6fb(0x1e3)]()*this[_0x48d6fb(0x29c)](_0x1315e8),_0x4f1230=null;if(BattleManager['isTargetHighestTGR']()){const _0x273d83=!![];return this[_0x48d6fb(0x305)](_0x1315e8,_0x273d83);}else{for(const _0x45670a of _0x1315e8){if(_0x48d6fb(0x1ef)!==_0x48d6fb(0x1ef)){for(const _0x3f485b of _0x1a56aa){_0x5122a2-=_0x3f485b['tgr'],_0x1fae39<=0x0&&!_0xdf15a7&&(_0x48eba9=_0x3f485b);}return _0x3c321a||this['randomTarget']();}else{_0x5a7f52-=_0x45670a['tgr'];if(_0x5a7f52<=0x0&&!_0x4f1230){if(_0x48d6fb(0x1fc)!==_0x48d6fb(0x1fc))return _0x58bbbd['AggroControlSystem'][_0x48d6fb(0x2b1)][_0x48d6fb(0x26e)](this);else _0x4f1230=_0x45670a;}}}return _0x4f1230||this[_0x48d6fb(0x190)]();}},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x29c)]=function(_0x1feb3c){const _0x3aae8b=_0x10e456;return _0x1feb3c[_0x3aae8b(0x1f5)]((_0x547c12,_0x59e5aa)=>_0x547c12+_0x59e5aa['tgr'],0x0);},Game_Unit['prototype']['tgrMax']=function(){const _0x264f1a=_0x10e456,_0x3a68e9=this['aliveMembers']()[_0x264f1a(0x2cb)](_0x7a2e11=>_0x7a2e11['tgr']);return Math[_0x264f1a(0x2b2)](..._0x3a68e9);},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x265)]=function(){const _0x3f7582=_0x10e456,_0x1e4278=this['aliveMembers']()[_0x3f7582(0x2cb)](_0x25c19d=>_0x25c19d[_0x3f7582(0x1cc)]);return Math[_0x3f7582(0x326)](..._0x1e4278);},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x2af)]=function(){const _0x2a3771=_0x10e456;this['_highestTgrMember']=undefined,this[_0x2a3771(0x300)]=undefined;},Game_Unit[_0x10e456(0x2a8)]['highestTgrMember']=function(){const _0x3b2570=_0x10e456;if(!this[_0x3b2570(0x2d5)]){const _0x3d88d9=this[_0x3b2570(0x21b)](),_0x11ff44=this['aliveMembers']()[_0x3b2570(0x250)](_0x4cb12a=>_0x4cb12a[_0x3b2570(0x1cc)]===_0x3d88d9);this['_highestTgrMember']=_0x11ff44[Math['randomInt'](_0x11ff44[_0x3b2570(0x2ac)])]||this[_0x3b2570(0x190)]();}return this[_0x3b2570(0x2d5)];},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x1d6)]=function(){const _0x30da06=_0x10e456;if(!this[_0x30da06(0x300)]){if('toxrp'==='toxrp'){const _0x120d83=this[_0x30da06(0x265)](),_0x3e8e4f=this['aliveMembers']()[_0x30da06(0x250)](_0x1777e8=>_0x1777e8[_0x30da06(0x1cc)]===_0x120d83);this[_0x30da06(0x300)]=_0x3e8e4f[Math[_0x30da06(0x19c)](_0x3e8e4f[_0x30da06(0x2ac)])]||this[_0x30da06(0x190)]();}else{if(this['_provoker']===_0x4b7017)this['clearProvokers']();const _0x1d41dc=this[_0x30da06(0x1d9)][_0x87829d['id']],_0x59b3de=_0x924d9f[_0x30da06(0x263)](_0x1d41dc);if(_0x59b3de&&_0x59b3de[_0x30da06(0x33a)]())return _0x59b3de;}}return this['_lowestTgrMember'];},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x24d)]=BattleManager[_0x10e456(0x2d0)],BattleManager[_0x10e456(0x2d0)]=function(){const _0x3d7ee2=_0x10e456;VisuMZ[_0x3d7ee2(0x23c)][_0x3d7ee2(0x24d)][_0x3d7ee2(0x26e)](this),$gameParty['clearTgrCache'](),$gameTroop['clearTgrCache']();},VisuMZ['AggroControlSystem'][_0x10e456(0x19f)]=BattleManager[_0x10e456(0x26a)],BattleManager[_0x10e456(0x26a)]=function(_0x1f82a8){const _0x50d661=_0x10e456;VisuMZ[_0x50d661(0x23c)][_0x50d661(0x19f)]['call'](this,_0x1f82a8),$gameParty[_0x50d661(0x2af)](),$gameTroop['clearTgrCache']();},Game_Unit[_0x10e456(0x2a8)][_0x10e456(0x305)]=function(_0x3b6843,_0x423b6e){const _0x444352=_0x10e456,_0x1b54a0=_0x3b6843[_0x444352(0x2cb)](_0x415603=>_0x415603[_0x444352(0x1cc)]),_0x3228f1=_0x423b6e?Math[_0x444352(0x2b2)](..._0x1b54a0):Math[_0x444352(0x326)](..._0x1b54a0),_0x511cdb=_0x3b6843[_0x444352(0x250)](_0x29d6a5=>_0x29d6a5[_0x444352(0x1cc)]===_0x3228f1);return _0x511cdb[Math['randomInt'](_0x511cdb['length'])]||this[_0x444352(0x190)]();},VisuMZ[_0x10e456(0x23c)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x10e456(0x340)],Scene_Options[_0x10e456(0x2a8)][_0x10e456(0x340)]=function(){const _0x256bd3=_0x10e456;let _0x4d2609=VisuMZ['AggroControlSystem']['Scene_Options_maxCommands']['call'](this);const _0xa08e29=VisuMZ[_0x256bd3(0x23c)][_0x256bd3(0x201)];if(_0xa08e29[_0x256bd3(0x2aa)][_0x256bd3(0x2fe)]&&_0xa08e29[_0x256bd3(0x2aa)][_0x256bd3(0x235)])_0x4d2609++;if(_0xa08e29[_0x256bd3(0x1ea)][_0x256bd3(0x2fe)]&&_0xa08e29['Aggro'][_0x256bd3(0x235)])_0x4d2609++;return _0x4d2609;},Sprite_Battler[_0x10e456(0x28a)]=VisuMZ[_0x10e456(0x23c)]['Settings']['Taunt'][_0x10e456(0x1bf)],Sprite_Battler[_0x10e456(0x2e0)]=VisuMZ[_0x10e456(0x23c)][_0x10e456(0x201)]['Taunt'][_0x10e456(0x291)],Sprite_Battler[_0x10e456(0x20a)]=VisuMZ[_0x10e456(0x23c)][_0x10e456(0x201)][_0x10e456(0x2df)][_0x10e456(0x232)],Sprite_Battler[_0x10e456(0x32a)]=VisuMZ[_0x10e456(0x23c)][_0x10e456(0x201)][_0x10e456(0x2df)][_0x10e456(0x22c)],Sprite_Battler[_0x10e456(0x270)]=VisuMZ[_0x10e456(0x23c)][_0x10e456(0x201)]['Taunt'][_0x10e456(0x27f)],Sprite_Battler[_0x10e456(0x292)]=VisuMZ[_0x10e456(0x23c)][_0x10e456(0x201)][_0x10e456(0x2df)][_0x10e456(0x1b7)],VisuMZ[_0x10e456(0x23c)][_0x10e456(0x1de)]=Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x1a7)],Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x1a7)]=function(_0x34d42f){const _0x207c2f=_0x10e456;VisuMZ[_0x207c2f(0x23c)][_0x207c2f(0x1de)][_0x207c2f(0x26e)](this,_0x34d42f),this[_0x207c2f(0x1e5)]()&&setTimeout(this[_0x207c2f(0x20f)][_0x207c2f(0x327)](this),0x3e8);},VisuMZ['AggroControlSystem'][_0x10e456(0x21e)]=Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x30f)],Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x30f)]=function(){const _0x7904d9=_0x10e456;VisuMZ['AggroControlSystem']['Sprite_Battler_initMembers'][_0x7904d9(0x26e)](this),this[_0x7904d9(0x2a0)]();},Sprite_Battler[_0x10e456(0x2a8)]['initTauntAnimations']=function(){const _0x5e649b=_0x10e456;this[_0x5e649b(0x218)]=VisuMZ['AggroControlSystem']['Settings'][_0x5e649b(0x2df)][_0x5e649b(0x1bf)],this['_tauntAnimationCycle']=[_0x5e649b(0x238),_0x5e649b(0x262),_0x5e649b(0x25c)];},Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x1e5)]=function(){const _0x23183e=_0x10e456;if(!Imported['VisuMZ_1_BattleCore'])return![];if(![Sprite_Actor,Sprite_Enemy][_0x23183e(0x1f6)](this[_0x23183e(0x199)]))return![];return ConfigManager[_0x23183e(0x1a8)]&&VisuMZ[_0x23183e(0x23c)][_0x23183e(0x201)][_0x23183e(0x2aa)]['ShowLines'];},Sprite_Battler[_0x10e456(0x2a8)]['createProvokeSprite']=function(){const _0x1ca452=_0x10e456;if(!SceneManager[_0x1ca452(0x2a4)]())return;this[_0x1ca452(0x20e)]=new Sprite_ProvokeTrail(this),this[_0x1ca452(0x20e)][_0x1ca452(0x205)]()[_0x1ca452(0x31a)](this[_0x1ca452(0x20e)]);},VisuMZ[_0x10e456(0x23c)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x1da)],Sprite_Battler[_0x10e456(0x2a8)]['setBattler']=function(_0x5936d1){const _0x4b77d3=_0x10e456;VisuMZ['AggroControlSystem'][_0x4b77d3(0x1dd)]['call'](this,_0x5936d1);if(this[_0x4b77d3(0x1ec)])this['_aggroGaugeSprite'][_0x4b77d3(0x1a0)]=_0x5936d1;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x209)]=Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x23f)],Sprite_Battler[_0x10e456(0x2a8)]['update']=function(){const _0x211b80=_0x10e456;VisuMZ[_0x211b80(0x23c)]['Sprite_Battler_update'][_0x211b80(0x26e)](this),this[_0x211b80(0x2db)]();},Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x2db)]=function(){const _0x4207bf=_0x10e456;if(!Imported[_0x4207bf(0x33e)])return;if(!Imported['VisuMZ_1_BattleCore'])return;if(!VisuMZ[_0x4207bf(0x23c)]['Settings'][_0x4207bf(0x2df)]['ShowAnimation'])return;if(!this[_0x4207bf(0x1a0)])return;this[_0x4207bf(0x218)]--,this[_0x4207bf(0x218)]<=0x0&&(_0x4207bf(0x308)!==_0x4207bf(0x308)?this['provokeOrigin']=_0x3580fa[_0x4207bf(0x1a8)]:this['startNewTauntAnimation']());},Sprite_Battler[_0x10e456(0x2a8)][_0x10e456(0x290)]=function(){const _0x448678=_0x10e456;this[_0x448678(0x218)]=Sprite_Battler[_0x448678(0x28a)];if(!this[_0x448678(0x1a0)])return;if(!this[_0x448678(0x1a0)][_0x448678(0x208)]())return;const _0x472390=[this['_battler']],_0x4ef2a7=this['getNextTauntAnimation'](),_0x3e6c2f=this[_0x448678(0x1a0)][_0x448678(0x1b5)]()&&Sprite_Battler[_0x448678(0x270)],_0x487eb3=Sprite_Battler['_muteTauntAnimations'];$gameTemp[_0x448678(0x1e8)](_0x472390,_0x4ef2a7,_0x3e6c2f,_0x487eb3);},Sprite_Battler[_0x10e456(0x2a8)]['getNextTauntAnimation']=function(){const _0x136975=_0x10e456;let _0x3fd33f=this[_0x136975(0x2b3)][_0x136975(0x2ac)];while(_0x3fd33f){const _0x39e12f=this[_0x136975(0x2b3)][_0x136975(0x33f)]();this[_0x136975(0x2b3)]['push'](_0x39e12f);const _0x29b6c7=_0x136975(0x1fb)[_0x136975(0x2d6)](_0x39e12f);if(this[_0x136975(0x1a0)][_0x29b6c7]()){const _0x14eb90=_0x136975(0x1c2)['format'](_0x39e12f),_0x5aa8b3=Sprite_Battler[_0x14eb90];if(_0x5aa8b3)return _0x5aa8b3;}_0x3fd33f--;}return Sprite_Battler[_0x136975(0x32a)];},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x1ab)]=Sprite_Actor[_0x10e456(0x2a8)]['createStateSprite'],Sprite_Actor[_0x10e456(0x2a8)]['createStateSprite']=function(){const _0x562146=_0x10e456;VisuMZ[_0x562146(0x23c)][_0x562146(0x1ab)][_0x562146(0x26e)](this),this[_0x562146(0x2f3)]();},Sprite_Actor[_0x10e456(0x2a8)][_0x10e456(0x2f3)]=function(){const _0x3264a1=_0x10e456;if(this[_0x3264a1(0x199)]!==Sprite_Actor)return;if(!this['isAggroGaugeVisible']())return;if(!SceneManager[_0x3264a1(0x2a4)]())return;const _0x18219b=VisuMZ['AggroControlSystem']['Settings'][_0x3264a1(0x1ea)],_0x58a980=new Sprite_Gauge();_0x58a980[_0x3264a1(0x336)]['x']=_0x18219b[_0x3264a1(0x260)],_0x58a980[_0x3264a1(0x336)]['y']=_0x18219b[_0x3264a1(0x309)];const _0xbf3ca6=Sprite_Gauge['prototype'][_0x3264a1(0x2e8)]();_0x58a980['scale']['x']=_0x58a980['scale']['y']=_0x18219b[_0x3264a1(0x217)],this[_0x3264a1(0x1ec)]=_0x58a980,this[_0x3264a1(0x31a)](_0x58a980);},Sprite_Actor[_0x10e456(0x2a8)][_0x10e456(0x294)]=function(){const _0x501fd1=_0x10e456;if(Imported['VisuMZ_1_BattleCore']&&this[_0x501fd1(0x199)]===Sprite_SvEnemy)return![];return ConfigManager[_0x501fd1(0x25b)]&&VisuMZ['AggroControlSystem']['Settings'][_0x501fd1(0x1ea)][_0x501fd1(0x1d5)];},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x30b)]=Sprite_Actor[_0x10e456(0x2a8)][_0x10e456(0x23f)],Sprite_Actor[_0x10e456(0x2a8)][_0x10e456(0x23f)]=function(){const _0x4236e2=_0x10e456;VisuMZ[_0x4236e2(0x23c)][_0x4236e2(0x30b)][_0x4236e2(0x26e)](this),this[_0x4236e2(0x1f0)]();},Sprite_Actor[_0x10e456(0x2a8)]['updateAggroGaugeSprite']=function(){const _0x40dfc1=_0x10e456;if(!this[_0x40dfc1(0x1a0)])return;if(!this[_0x40dfc1(0x1ec)])return;const _0x3af567=VisuMZ[_0x40dfc1(0x23c)][_0x40dfc1(0x201)][_0x40dfc1(0x1ea)],_0xc0abe=this[_0x40dfc1(0x1ec)];let _0x2dad01=_0x3af567[_0x40dfc1(0x315)];if(this[_0x40dfc1(0x1a0)][_0x40dfc1(0x259)]){if(_0x40dfc1(0x33c)!==_0x40dfc1(0x28c))_0x2dad01+=this[_0x40dfc1(0x1a0)][_0x40dfc1(0x259)]();else return this['isAggroType']()?_0x6c2f46['aggroGaugeColor2']():_0xf6f5ec[_0x40dfc1(0x23c)][_0x40dfc1(0x1c1)]['call'](this);}let _0x21da3f=_0x3af567[_0x40dfc1(0x222)];this['_battler']['battleUIOffsetY']&&(_0x21da3f+=this['_battler'][_0x40dfc1(0x1ee)]());_0xc0abe['x']=_0x2dad01,_0xc0abe['y']=-this['height']+_0x21da3f;this[_0x40dfc1(0x1a0)]&&_0xc0abe[_0x40dfc1(0x1bc)]!==_0x40dfc1(0x1e6)&&(_0x40dfc1(0x236)===_0x40dfc1(0x236)?(_0xc0abe[_0x40dfc1(0x2d3)]=!![],_0xc0abe[_0x40dfc1(0x194)](this['_battler'],_0x40dfc1(0x1e6))):_0x241479+=this['_battler'][_0x40dfc1(0x1ee)]());if(this['scale']['x']<0x0){if(_0x40dfc1(0x19a)===_0x40dfc1(0x215))return this[_0x40dfc1(0x210)]()?0x0:_0x598b20['AggroControlSystem'][_0x40dfc1(0x2b1)][_0x40dfc1(0x26e)](this);else _0xc0abe[_0x40dfc1(0x1a2)]['x']=-Math[_0x40dfc1(0x27a)](_0xc0abe[_0x40dfc1(0x1a2)]['x']);}},Sprite_Gauge[_0x10e456(0x2a8)]['isAggroType']=function(){const _0x2ec5b2=_0x10e456;return this[_0x2ec5b2(0x1a0)]&&this[_0x2ec5b2(0x1bc)]===_0x2ec5b2(0x1e6);},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x2b1)]=Sprite_Gauge['prototype'][_0x10e456(0x272)],Sprite_Gauge['prototype']['gaugeX']=function(){const _0x44c164=_0x10e456;if(this['isAggroType']())return 0x0;else{if(_0x44c164(0x18e)==='uTHhp'){if(_0x556e8c['stateHasProvoke'](_0x304d51)){if(this['_provoker']===_0x321ab0)this['clearProvokers']();const _0x4934d6=this[_0x44c164(0x1d9)][_0xd8ee95['id']],_0xdada4b=_0xff09ac[_0x44c164(0x263)](_0x4934d6);if(_0xdada4b&&_0xdada4b['isAlive']())return _0xdada4b;}}else return VisuMZ[_0x44c164(0x23c)][_0x44c164(0x2b1)][_0x44c164(0x26e)](this);}},VisuMZ['AggroControlSystem'][_0x10e456(0x257)]=Sprite_Gauge['prototype'][_0x10e456(0x22a)],Sprite_Gauge[_0x10e456(0x2a8)]['gaugeRate']=function(){const _0x41611d=_0x10e456;let _0x15c342=VisuMZ[_0x41611d(0x23c)][_0x41611d(0x257)][_0x41611d(0x26e)](this);if(this[_0x41611d(0x210)]()&&this['_battler']){if(_0x41611d(0x1d2)!==_0x41611d(0x303)){if(this['_battler'][_0x41611d(0x275)]())return 0x0;if(this[_0x41611d(0x1a0)]['isAlive']()&&this[_0x41611d(0x1a0)][_0x41611d(0x254)]()[_0x41611d(0x299)]()[_0x41611d(0x2ac)]===0x1)return 0x1;}else{if(!this[_0x41611d(0x210)]())return;if(!_0x533936[_0x41611d(0x252)])return;const _0x401f20=this[_0x41611d(0x1a0)]['battler']();if(this['_menuAggroType'])this[_0x41611d(0x2a6)]=0xff;else _0x401f20&&_0x401f20[_0x41611d(0x2a6)]>0x0?this[_0x41611d(0x2a6)]=0xff:this[_0x41611d(0x2a6)]=0x0;}}return _0x15c342['clamp'](0x0,0x1);},VisuMZ[_0x10e456(0x23c)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x10e456(0x2de)],Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x2de)]=function(){const _0x12bf1d=_0x10e456;if(this[_0x12bf1d(0x210)]())return this[_0x12bf1d(0x1ad)]();else{if(_0x12bf1d(0x274)!=='ONQBu')this['_enemies']=_0x33f2c5['magicalTauntMembers']();else return VisuMZ[_0x12bf1d(0x23c)][_0x12bf1d(0x230)][_0x12bf1d(0x26e)](this);}},Sprite_Gauge['prototype'][_0x10e456(0x1ad)]=function(){const _0x1d8627=_0x10e456,_0x29e1b1=this[_0x1d8627(0x1a0)][_0x1d8627(0x254)](),_0x11d157=this[_0x1d8627(0x1a0)][_0x1d8627(0x1cc)]-_0x29e1b1['tgrMin'](),_0x725591=_0x29e1b1[_0x1d8627(0x21b)]()-_0x29e1b1[_0x1d8627(0x265)]();if(_0x11d157>=_0x725591)return 0x64;return _0x11d157/Math['max'](_0x725591,0x1)*0x64;},VisuMZ[_0x10e456(0x23c)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x10e456(0x2a8)]['currentMaxValue'],Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x2f7)]=function(){const _0x376eec=_0x10e456;return this[_0x376eec(0x210)]()?this[_0x376eec(0x31b)]():VisuMZ[_0x376eec(0x23c)][_0x376eec(0x302)]['call'](this);},Sprite_Gauge['prototype']['currentMaxValueAggroControl']=function(){return 0x64;},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x212)]=Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x30d)],Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x30d)]=function(){const _0x3d1da9=_0x10e456;if(this[_0x3d1da9(0x210)]())return ColorManager[_0x3d1da9(0x2be)]();else{if(_0x3d1da9(0x2d9)!==_0x3d1da9(0x2d9))_0x3b2fce=_0x4adcd6[_0x3d1da9(0x2e6)](_0x1e8300['x']+(_0x2690ae[_0x3d1da9(0x234)]-0x80)/0x2);else return VisuMZ['AggroControlSystem'][_0x3d1da9(0x212)][_0x3d1da9(0x26e)](this);}},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x1c1)]=Sprite_Gauge['prototype'][_0x10e456(0x32f)],Sprite_Gauge[_0x10e456(0x2a8)]['gaugeColor2']=function(){const _0x3fed51=_0x10e456;if(this[_0x3fed51(0x210)]())return ColorManager[_0x3fed51(0x1cd)]();else{if(_0x3fed51(0x330)!==_0x3fed51(0x330)){const _0x59ab2a=_0x46065f[_0x3fed51(0x2e7)];this['subject']()['gainAggro'](_0x59ab2a*_0x1eca02[_0x3fed51(0x27a)](_0x380107));}else return VisuMZ['AggroControlSystem']['Sprite_Gauge_gaugeColor2']['call'](this);}},VisuMZ[_0x10e456(0x23c)]['Sprite_Gauge_update']=Sprite_Gauge['prototype'][_0x10e456(0x23f)],Sprite_Gauge[_0x10e456(0x2a8)]['update']=function(){const _0x10f4f6=_0x10e456;VisuMZ['AggroControlSystem']['Sprite_Gauge_update'][_0x10f4f6(0x26e)](this),this['updateOpacityAggroControl']();},Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x1ba)]=function(){const _0x40fbfa=_0x10e456;if(!this['isAggroType']())return;if(!Imported[_0x40fbfa(0x252)])return;const _0x41aadd=this[_0x40fbfa(0x1a0)][_0x40fbfa(0x313)]();if(this[_0x40fbfa(0x204)])this[_0x40fbfa(0x2a6)]=0xff;else{if(_0x41aadd&&_0x41aadd[_0x40fbfa(0x2a6)]>0x0)this[_0x40fbfa(0x2a6)]=0xff;else{if('WnBHb'!==_0x40fbfa(0x2bd))this[_0x40fbfa(0x2a6)]=0x0;else{if(!_0x1ba9a3)return![];return _0x592156['note']['match'](/<BYPASS PROVOKE>/i);}}}},VisuMZ['AggroControlSystem'][_0x10e456(0x29d)]=Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x213)],Sprite_Gauge[_0x10e456(0x2a8)][_0x10e456(0x213)]=function(){const _0x196b70=_0x10e456;if(this[_0x196b70(0x210)]())return;VisuMZ[_0x196b70(0x23c)]['Sprite_Gauge_drawValue']['call'](this);};function Sprite_ProvokeTrail(){const _0x39c530=_0x10e456;this[_0x39c530(0x1a7)](...arguments);}function _0x4f21(_0x217b92,_0x100bf6){const _0x452a88=_0x452a();return _0x4f21=function(_0x4f2116,_0x23b041){_0x4f2116=_0x4f2116-0x18d;let _0x55c8f7=_0x452a88[_0x4f2116];return _0x55c8f7;},_0x4f21(_0x217b92,_0x100bf6);}Sprite_ProvokeTrail[_0x10e456(0x2a8)]=Object[_0x10e456(0x279)](Sprite[_0x10e456(0x2a8)]),Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x199)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x10e456(0x2a8)]['initialize']=function(_0x3c4f77){const _0x15cdc4=_0x10e456;this[_0x15cdc4(0x1f1)]=_0x3c4f77,Sprite['prototype'][_0x15cdc4(0x1a7)][_0x15cdc4(0x26e)](this),this[_0x15cdc4(0x30f)](),this['createChildSprites']();},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x30f)]=function(){const _0x58593a=_0x10e456,_0x42a23b=VisuMZ[_0x58593a(0x23c)][_0x58593a(0x201)][_0x58593a(0x2aa)];this[_0x58593a(0x336)]['x']=0.5,this[_0x58593a(0x336)]['y']=0.5,this[_0x58593a(0x29a)]=0x0,this[_0x58593a(0x2e5)]=0x0,this[_0x58593a(0x1a4)]=0x0,this[_0x58593a(0x2c1)]=0x0,this[_0x58593a(0x2a6)]=0x0,this[_0x58593a(0x1be)]=_0x42a23b[_0x58593a(0x318)],this['blendMode']=_0x42a23b[_0x58593a(0x2a5)];},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x2ec)]=function(){const _0x5ea441=_0x10e456;return VisuMZ[_0x5ea441(0x23c)][_0x5ea441(0x201)][_0x5ea441(0x2aa)]['Parts'];},Sprite_ProvokeTrail[_0x10e456(0x2a8)]['partsSize']=function(){const _0xadc4c3=_0x10e456;return VisuMZ['AggroControlSystem']['Settings'][_0xadc4c3(0x2aa)][_0xadc4c3(0x332)]/0x64;},Sprite_ProvokeTrail[_0x10e456(0x2a8)]['createChildSprites']=function(){const _0x5f43bc=_0x10e456;this[_0x5f43bc(0x284)]=[];let _0x1abe10=0x0;for(let _0x39776c=0x0;_0x39776c<=this[_0x5f43bc(0x2ec)]();_0x39776c++){const _0x23508e=new Sprite();_0x23508e[_0x5f43bc(0x286)]=ImageManager[_0x5f43bc(0x276)](),_0x23508e['anchor']['x']=0.5,_0x23508e[_0x5f43bc(0x336)]['y']=0.5,_0x23508e[_0x5f43bc(0x1a2)]['x']=_0x23508e[_0x5f43bc(0x1a2)]['y']=this[_0x5f43bc(0x26d)](),_0x23508e[_0x5f43bc(0x2a6)]=_0x1abe10,_0x23508e[_0x5f43bc(0x231)]=this['blendMode'],this[_0x5f43bc(0x31a)](_0x23508e),this['_sprites'][_0x5f43bc(0x273)](_0x23508e),_0x1abe10+=this[_0x5f43bc(0x1be)];if(_0x1abe10>=0xff)_0x1abe10=0x0;}},Sprite_ProvokeTrail['prototype'][_0x10e456(0x23d)]=function(){const _0x2fa577=_0x10e456;return this[_0x2fa577(0x1f1)][_0x2fa577(0x199)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x205)]=function(){const _0xf2164c=_0x10e456;return SceneManager[_0xf2164c(0x2d2)][_0xf2164c(0x288)]['_provokeContainer'];},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x23f)]=function(){const _0xa29597=_0x10e456;Sprite['prototype'][_0xa29597(0x23f)][_0xa29597(0x26e)](this),this[_0xa29597(0x1fa)](),this['updateSubPositions'](),this['updateOpacity'](),this[_0xa29597(0x2ab)]();},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x1e1)]=function(){const _0x93b20e=_0x10e456;return VisuMZ['AggroControlSystem'][_0x93b20e(0x201)]['Provoke']['HeightOrigin'];},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x1fa)]=function(){const _0x574ad6=_0x10e456;if(!this['_mainSprite'][_0x574ad6(0x1a0)])return;if(!this['_mainSprite'][_0x574ad6(0x1a0)]['provoker']())return;const _0x56eec4=this['_mainSprite'][_0x574ad6(0x1a0)]['provoker']()[_0x574ad6(0x313)]();if(!_0x56eec4)return;const _0x92304e=this['_mainSprite'][_0x574ad6(0x1a0)]['provokeHeightOrigin'](),_0x42a7f3=this[_0x574ad6(0x1f1)][_0x574ad6(0x1a0)][_0x574ad6(0x2fd)]()[_0x574ad6(0x246)]();this[_0x574ad6(0x29a)]=this['_mainSprite']['x'],this[_0x574ad6(0x2e5)]=this[_0x574ad6(0x1f1)]['y']-this[_0x574ad6(0x1f1)][_0x574ad6(0x1df)]*_0x92304e,this[_0x574ad6(0x1a4)]=_0x56eec4['x'],this['_targetY']=_0x56eec4['y']-_0x56eec4[_0x574ad6(0x1df)]*_0x42a7f3,this[_0x574ad6(0x29a)]+=Math[_0x574ad6(0x2e6)]((Graphics['width']-Graphics[_0x574ad6(0x2f6)])/0x2),this['_homeY']+=Math[_0x574ad6(0x2e6)]((Graphics[_0x574ad6(0x1df)]-Graphics[_0x574ad6(0x32c)])/0x2),this[_0x574ad6(0x1a4)]+=Math['round']((Graphics['width']-Graphics[_0x574ad6(0x2f6)])/0x2),this[_0x574ad6(0x2c1)]+=Math[_0x574ad6(0x2e6)]((Graphics['height']-Graphics['boxHeight'])/0x2);if(!$gameSystem[_0x574ad6(0x314)]()){if(_0x56eec4['_battler'][_0x574ad6(0x1b5)]()){if(_0x574ad6(0x289)!==_0x574ad6(0x289)){if(![_0x2493fd,_0x553dce]['includes'](this[_0x574ad6(0x199)]))return![];if(!_0x23bb76[_0x574ad6(0x2a4)]())return![];return _0x18ec65[_0x574ad6(0x25b)]&&_0x4ea64f[_0x574ad6(0x23c)][_0x574ad6(0x201)][_0x574ad6(0x1ea)]['StatusGauge'];}else visible=!![],this[_0x574ad6(0x1a4)]+=SceneManager['_scene']['_statusWindow']['x'],this['_targetY']+=SceneManager[_0x574ad6(0x2d2)]['_statusWindow']['y'];}else _0x56eec4['_battler']['isEnemy']()&&(_0x574ad6(0x1c3)!==_0x574ad6(0x1c3)?this[_0x574ad6(0x242)]=0x1:(visible=!![],this[_0x574ad6(0x29a)]+=SceneManager[_0x574ad6(0x2d2)][_0x574ad6(0x1bb)]['x'],this[_0x574ad6(0x2e5)]+=SceneManager[_0x574ad6(0x2d2)]['_statusWindow']['y']));}},Sprite_ProvokeTrail[_0x10e456(0x2a8)]['arcHeight']=function(){const _0x1e04ef=_0x10e456;return VisuMZ[_0x1e04ef(0x23c)][_0x1e04ef(0x201)][_0x1e04ef(0x2aa)][_0x1e04ef(0x1cb)];},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x32e)]=function(){const _0xe80385=_0x10e456;if(!this[_0xe80385(0x1f1)][_0xe80385(0x1a0)])return;if(!this[_0xe80385(0x1f1)][_0xe80385(0x1a0)]['provoker']())return;if(!this[_0xe80385(0x284)])return;if(this['_sprites'][_0xe80385(0x2ac)]<=0x0)return;const _0x4c76ab=(this[_0xe80385(0x1a4)]-this[_0xe80385(0x29a)])/this[_0xe80385(0x2ec)](),_0x385be4=(this[_0xe80385(0x2c1)]-this[_0xe80385(0x2e5)])/this[_0xe80385(0x2ec)]();for(let _0x461fb8=0x0;_0x461fb8<=this[_0xe80385(0x2ec)]();_0x461fb8++){const _0x5c12b3=this['_sprites'][_0x461fb8];if(!_0x5c12b3)continue;_0x5c12b3['x']=this[_0xe80385(0x29a)]+_0x4c76ab*_0x461fb8;const _0xb87684=this[_0xe80385(0x2ec)]()-_0x461fb8,_0x4888ea=this['maxSprites']()/0x2,_0x332f06=this[_0xe80385(0x2c0)](),_0x5d7def=-_0x332f06/Math['pow'](_0x4888ea,0x2),_0x56c49f=_0x5d7def*Math[_0xe80385(0x2b6)](_0xb87684-_0x4888ea,0x2)+_0x332f06;_0x5c12b3['y']=this[_0xe80385(0x2e5)]+_0x385be4*_0x461fb8-_0x56c49f;}},Sprite_ProvokeTrail['prototype'][_0x10e456(0x339)]=function(){const _0x3418a7=_0x10e456;return VisuMZ[_0x3418a7(0x23c)][_0x3418a7(0x201)][_0x3418a7(0x2aa)]['Opacity'];},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x2b0)]=function(){const _0x406b02=_0x10e456,_0x527153=this[_0x406b02(0x1f1)][_0x406b02(0x1a0)];if(!_0x527153)this[_0x406b02(0x2a6)]=0x0;else{if(_0x527153['isAlive']()&&_0x527153[_0x406b02(0x2fd)]())this[_0x406b02(0x2a6)]=0xff;else{if(_0x406b02(0x1d4)===_0x406b02(0x1d4))this[_0x406b02(0x2a6)]=0x0;else return _0x4c4287['AggroControlSystem'][_0x406b02(0x201)][_0x406b02(0x2aa)]['Parts'];}}},Sprite_ProvokeTrail[_0x10e456(0x2a8)][_0x10e456(0x2ab)]=function(){const _0x4e1ee2=_0x10e456;if(!this[_0x4e1ee2(0x1f1)][_0x4e1ee2(0x1a0)])return;if(!this['_mainSprite'][_0x4e1ee2(0x1a0)][_0x4e1ee2(0x2fd)]())return;if(!this['_sprites'])return;if(this[_0x4e1ee2(0x284)][_0x4e1ee2(0x2ac)]<=0x0)return;for(let _0x1644ed=0x0;_0x1644ed<=this['maxSprites']();_0x1644ed++){const _0xb9165d=this[_0x4e1ee2(0x284)][this['leftwardAnimation']()?this[_0x4e1ee2(0x2ec)]()-_0x1644ed:_0x1644ed];if(!_0xb9165d)continue;_0xb9165d[_0x4e1ee2(0x2a6)]-=this['_opacitySpeed'];if(_0xb9165d['opacity']<=0x0)_0xb9165d[_0x4e1ee2(0x2a6)]=0xff;}},VisuMZ[_0x10e456(0x23c)]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x10e456(0x2a8)][_0x10e456(0x22b)],Spriteset_Battle[_0x10e456(0x2a8)][_0x10e456(0x22b)]=function(){const _0x1850f4=_0x10e456;VisuMZ[_0x1850f4(0x23c)][_0x1850f4(0x2dc)][_0x1850f4(0x26e)](this),this['createBattleFieldAggroControl']();},Spriteset_Battle[_0x10e456(0x2a8)]['createBattleFieldAggroControl']=function(){const _0x1a7c4b=_0x10e456;if(!Imported[_0x1a7c4b(0x252)])return;const _0x1db212=this['_battleField']['x'],_0x1b2773=this[_0x1a7c4b(0x2a2)]['y'],_0x58c533=this[_0x1a7c4b(0x2a2)]['width'],_0x4f4b49=this['_battleField'][_0x1a7c4b(0x1df)];this[_0x1a7c4b(0x223)]=new Sprite(),this[_0x1a7c4b(0x223)][_0x1a7c4b(0x197)](0x0,0x0,_0x58c533,_0x4f4b49),this[_0x1a7c4b(0x223)]['x']=_0x1db212,this[_0x1a7c4b(0x223)]['y']=_0x1b2773;if(Imported[_0x1a7c4b(0x252)]){const _0x285db7=this['children'][_0x1a7c4b(0x28f)](this['_damageContainer']);this['addChildAt'](this['_provokeContainer'],_0x285db7);}else this[_0x1a7c4b(0x31a)](this[_0x1a7c4b(0x223)]);},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x1af)]=Spriteset_Battle[_0x10e456(0x2a8)]['update'],Spriteset_Battle[_0x10e456(0x2a8)][_0x10e456(0x23f)]=function(){const _0x2f4bd3=_0x10e456;VisuMZ[_0x2f4bd3(0x23c)][_0x2f4bd3(0x1af)][_0x2f4bd3(0x26e)](this),this['updateAggroControl']();},Spriteset_Battle[_0x10e456(0x2a8)][_0x10e456(0x2ba)]=function(){const _0x7b45eb=_0x10e456;if(!this[_0x7b45eb(0x223)])return;if(!this['_damageContainer'])return;this[_0x7b45eb(0x223)]['x']=this['_damageContainer']['x'],this[_0x7b45eb(0x223)]['y']=this[_0x7b45eb(0x1b0)]['y'];},VisuMZ['AggroControlSystem'][_0x10e456(0x2eb)]=Window_BattleEnemy[_0x10e456(0x2a8)][_0x10e456(0x1d8)],Window_BattleEnemy[_0x10e456(0x2a8)][_0x10e456(0x1d8)]=function(){const _0x2cfd29=_0x10e456;if(this[_0x2cfd29(0x29b)]())Imported[_0x2cfd29(0x252)]&&this[_0x2cfd29(0x33d)](),Window_Selectable[_0x2cfd29(0x2a8)][_0x2cfd29(0x1d8)][_0x2cfd29(0x26e)](this);else this[_0x2cfd29(0x30a)]()?(Imported[_0x2cfd29(0x252)]&&this[_0x2cfd29(0x33d)](),Window_Selectable[_0x2cfd29(0x2a8)][_0x2cfd29(0x1d8)][_0x2cfd29(0x26e)](this)):VisuMZ['AggroControlSystem'][_0x2cfd29(0x2eb)]['call'](this);},Window_BattleEnemy[_0x10e456(0x2a8)][_0x10e456(0x29b)]=function(){const _0xa80865=_0x10e456,_0xa93fc8=BattleManager[_0xa80865(0x2ef)](),_0x5ab4c8=BattleManager[_0xa80865(0x2c3)]();if(!_0xa93fc8)return![];if(!_0x5ab4c8)return![];if(DataManager['isBypassProvoke'](_0xa93fc8[_0xa80865(0x266)]()))return![];if(_0x5ab4c8[_0xa80865(0x1ff)]())return![];if(!_0xa93fc8[_0xa80865(0x2ca)]())return![];if(_0x5ab4c8['isProvokeAffected']()){if('lpted'===_0xa80865(0x1f8)){this['_enemies']=[_0x5ab4c8[_0xa80865(0x2fd)]()];if(_0xa93fc8[_0xa80865(0x2c9)]&&_0xa93fc8['isForAnyone']()){const _0x43578a=$gameParty[_0xa80865(0x299)]();this['_enemies']=this[_0xa80865(0x2b9)][_0xa80865(0x1c9)](_0x43578a),_0xa93fc8[_0xa80865(0x195)]&&_0xa93fc8['canSingleOrMultipleSelect']()&&_0x43578a['length']>0x1&&this[_0xa80865(0x206)](_0xa80865(0x283),this[_0xa80865(0x321)]['bind'](this));}return!![];}else return!!this[_0xa80865(0x2fd)]();}else return![];},Window_BattleEnemy[_0x10e456(0x2a8)][_0x10e456(0x30a)]=function(){const _0x134fa9=_0x10e456,_0x2d9a8b=BattleManager[_0x134fa9(0x2ef)](),_0x16ac13=BattleManager[_0x134fa9(0x2c3)](),_0x8a3996=$gameTroop;if(!_0x2d9a8b)return![];if(!_0x16ac13)return![];if(!_0x2d9a8b['item']())return![];if(DataManager['isBypassTaunt'](_0x2d9a8b[_0x134fa9(0x266)]()))return![];if(_0x16ac13['bypassTaunt']())return![];if(!_0x2d9a8b['isTauntAffected']())return![];if(_0x2d9a8b[_0x134fa9(0x281)]()&&_0x8a3996[_0x134fa9(0x304)]()[_0x134fa9(0x2ac)]>0x0)this[_0x134fa9(0x2b9)]=_0x8a3996[_0x134fa9(0x304)]();else{if(_0x2d9a8b[_0x134fa9(0x23a)]()&&_0x8a3996['magicalTauntMembers']()[_0x134fa9(0x2ac)]>0x0)this[_0x134fa9(0x2b9)]=_0x8a3996[_0x134fa9(0x249)]();else{if(_0x2d9a8b['isCertainHit']()&&_0x8a3996[_0x134fa9(0x1e9)]()[_0x134fa9(0x2ac)]>0x0)this['_enemies']=_0x8a3996[_0x134fa9(0x1e9)]();else return![];}}if(_0x2d9a8b[_0x134fa9(0x2c9)]&&_0x2d9a8b['isForAnyone']()){if(_0x134fa9(0x221)===_0x134fa9(0x18d))this[_0x134fa9(0x31a)](this['_provokeContainer']);else{const _0x1cb683=$gameParty['aliveMembers']();this[_0x134fa9(0x2b9)]=this['_enemies'][_0x134fa9(0x1c9)](_0x1cb683),_0x2d9a8b[_0x134fa9(0x195)]&&_0x2d9a8b[_0x134fa9(0x195)]()&&_0x1cb683[_0x134fa9(0x2ac)]>0x1&&this[_0x134fa9(0x206)]('pagedown',this[_0x134fa9(0x321)][_0x134fa9(0x327)](this));}}return!![];},VisuMZ[_0x10e456(0x23c)][_0x10e456(0x245)]=Window_Options[_0x10e456(0x2a8)][_0x10e456(0x2b5)],Window_Options[_0x10e456(0x2a8)]['addGeneralOptions']=function(){const _0x2690fe=_0x10e456;VisuMZ['AggroControlSystem']['Window_Options_addGeneralOptions'][_0x2690fe(0x26e)](this),this[_0x2690fe(0x317)]();},Window_Options[_0x10e456(0x2a8)]['addAggroControlSystemCommands']=function(){const _0x3894a2=_0x10e456;VisuMZ[_0x3894a2(0x23c)][_0x3894a2(0x201)]['Provoke'][_0x3894a2(0x2fe)]&&this[_0x3894a2(0x2a9)](),VisuMZ[_0x3894a2(0x23c)][_0x3894a2(0x201)][_0x3894a2(0x1ea)][_0x3894a2(0x2fe)]&&(_0x3894a2(0x20d)!==_0x3894a2(0x228)?this[_0x3894a2(0x2d4)]():(_0x6d0f90[_0x3894a2(0x23c)]['Settings']['Provoke'][_0x3894a2(0x2fe)]&&this[_0x3894a2(0x2a9)](),_0xe565d0['AggroControlSystem'][_0x3894a2(0x201)][_0x3894a2(0x1ea)][_0x3894a2(0x2fe)]&&this['addAggroControlSystemAggroCommand']()));},Window_Options[_0x10e456(0x2a8)]['addAggroControlSystemProvokeCommand']=function(){const _0x460c7e=_0x10e456,_0x5508f5=TextManager[_0x460c7e(0x1a8)],_0x4bd60a=_0x460c7e(0x1a8);this[_0x460c7e(0x2e9)](_0x5508f5,_0x4bd60a);},Window_Options[_0x10e456(0x2a8)]['addAggroControlSystemAggroCommand']=function(){const _0x5bce69=_0x10e456,_0x27a30c=TextManager[_0x5bce69(0x25b)],_0x1b0222=_0x5bce69(0x25b);this[_0x5bce69(0x2e9)](_0x27a30c,_0x1b0222);},VisuMZ[_0x10e456(0x23c)]['Window_StatusBase_placeActorName']=Window_StatusBase[_0x10e456(0x2a8)][_0x10e456(0x1a9)],Window_StatusBase['prototype']['placeActorName']=function(_0x1ad2cf,_0x1f0bb8,_0x5c713b){const _0x1513ba=_0x10e456;if(this['isAggroGaugeShown']())this['drawAggroGauge'](_0x1ad2cf['index']());VisuMZ[_0x1513ba(0x23c)][_0x1513ba(0x306)][_0x1513ba(0x26e)](this,_0x1ad2cf,_0x1f0bb8,_0x5c713b);},Window_StatusBase[_0x10e456(0x2a8)][_0x10e456(0x30e)]=function(){const _0x315844=_0x10e456;if(![Window_BattleActor,Window_BattleStatus][_0x315844(0x1f6)](this[_0x315844(0x199)]))return![];if(!SceneManager[_0x315844(0x2a4)]())return![];return ConfigManager[_0x315844(0x25b)]&&VisuMZ[_0x315844(0x23c)][_0x315844(0x201)]['Aggro']['StatusGauge'];},Window_StatusBase[_0x10e456(0x2a8)]['placeAggroGauge']=function(_0x4c9c07,_0x7f91f4,_0x11a4d5){const _0x29c77e=_0x10e456;this[_0x29c77e(0x33b)](_0x4c9c07,_0x29c77e(0x1e6),_0x7f91f4,_0x11a4d5);},Window_BattleStatus[_0x10e456(0x2a8)][_0x10e456(0x277)]=function(_0x486d3c){const _0x10087e=_0x10e456,_0x51d8de=this['actor'](_0x486d3c),_0x3c06ee=this[_0x10087e(0x2d1)](_0x486d3c),_0x1cefcc=this[_0x10087e(0x31f)](_0x486d3c),_0x126d1a=_0x10087e(0x2b7)['format'](_0x51d8de[_0x10087e(0x21d)]()),_0x4da210=this[_0x10087e(0x26b)](_0x126d1a,Sprite_Gauge),_0x34dd27=VisuMZ['AggroControlSystem']['Settings']['Aggro'];_0x4da210['x']=_0x3c06ee+(_0x34dd27[_0x10087e(0x2ed)]||0x0),_0x4da210['y']=_0x1cefcc+(_0x34dd27[_0x10087e(0x2bb)]||0x0),_0x4da210[_0x10087e(0x204)]=!![],_0x4da210[_0x10087e(0x194)](_0x51d8de,_0x10087e(0x1e6)),_0x4da210[_0x10087e(0x2d3)]=!![];},Window_BattleStatus[_0x10e456(0x2a8)]['aggroGaugeX']=function(_0x1f8806){const _0x1699a1=_0x10e456;let _0x202c12=this[_0x1699a1(0x193)](_0x1f8806),_0x1c4b09=this[_0x1699a1(0x211)](_0x202c12);if(Imported[_0x1699a1(0x252)]){let _0x3e80b0=this[_0x1699a1(0x28e)](_0x1f8806);if(this[_0x1699a1(0x1aa)]()===_0x1699a1(0x30c)){if(_0x1699a1(0x21c)!==_0x1699a1(0x19e)){const _0x20fc03=$dataSystem['optDisplayTp']?0x4:0x3,_0x5770b6=_0x20fc03*0x80+(_0x20fc03-0x1)*0x8+0x4,_0x1f1809=this[_0x1699a1(0x2c3)](_0x1f8806);let _0x3a5c39=_0x3e80b0['x']+this[_0x1699a1(0x227)];if(VisuMZ['BattleCore'][_0x1699a1(0x201)][_0x1699a1(0x29f)][_0x1699a1(0x251)])_0x3a5c39=_0x3e80b0['x']+ImageManager['faceWidth']+0x8;else{if(_0x1699a1(0x311)!=='vUgtK')_0x3a5c39+=ImageManager[_0x1699a1(0x1c6)];else{const _0x1ffbf9=this['getBattlerKeyTargets']();return _0x1ffbf9[_0x1699a1(0x2ac)]>=0x1&&_0x1ffbf9[0x0]&&_0x1ffbf9[0x0][_0x1699a1(0x1b5)]()===this[_0x1699a1(0x248)]()['isActor']();}}_0x1c4b09=Math[_0x1699a1(0x2e6)](Math[_0x1699a1(0x326)](_0x3e80b0['x']+_0x3e80b0[_0x1699a1(0x234)]-_0x5770b6,_0x3a5c39)),_0x1c4b09-=0x4;}else return _0xb67522[_0x1699a1(0x23c)][_0x1699a1(0x302)][_0x1699a1(0x26e)](this);}else _0x1c4b09=Math[_0x1699a1(0x2e6)](_0x3e80b0['x']+(_0x3e80b0['width']-0x80)/0x2);}return _0x1c4b09;},Window_BattleStatus[_0x10e456(0x2a8)]['aggroGaugeY']=function(_0x32b498){const _0x144272=_0x10e456,_0x2ac39f=this[_0x144272(0x28e)](_0x32b498);let _0x3768cb=this['nameY'](_0x2ac39f);if(Imported[_0x144272(0x252)]){if(_0x144272(0x323)!==_0x144272(0x323)){let _0x1ecea1=_0x21ad5b[_0x144272(0x23c)][_0x144272(0x2b8)][_0x144272(0x26e)](this,_0x483ede);if(_0x34586f===0x0){if(this[_0x144272(0x242)]===_0x29648c)this[_0x144272(0x1b2)]();_0x1ecea1*=this[_0x144272(0x1e6)](),_0x1ecea1=_0x2caf09[_0x144272(0x2b2)](_0x1ecea1,0x0);}return _0x1ecea1;}else{if(this[_0x144272(0x1aa)]()===_0x144272(0x30c)){let _0x3483f6=this[_0x144272(0x28e)](_0x32b498);_0x3768cb=Math[_0x144272(0x2e6)](_0x3483f6['y']+(_0x3483f6['height']-Sprite_Name[_0x144272(0x2a8)][_0x144272(0x1a3)]())/0x2);}}}if(this[_0x144272(0x333)]())_0x3768cb-=Sprite_Gauge[_0x144272(0x2a8)][_0x144272(0x328)]()-0x1;return _0x3768cb;},Window_BattleStatus[_0x10e456(0x2a8)]['isAtbGaugeVisible']=function(){const _0x11cd34=_0x10e456;if(!BattleManager[_0x11cd34(0x2ff)]())return![];if(Imported[_0x11cd34(0x27e)])return this[_0x11cd34(0x322)]('time');return!![];};