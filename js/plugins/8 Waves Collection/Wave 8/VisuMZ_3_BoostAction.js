//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.12] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
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
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Sealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost{text}         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0{text}        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x{text}      The text inside the brackets will only appear if at
 *                      least x Boosts are used. In battle use only!
 * 
 * \boost>x{text}       The text inside the brackets will only appear if more
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost=x{text}       The text inside the brackets will only appear if
 *                      exactly x Boosts are used. In battle use only!
 * 
 * \boost<x{text}       The text inside the brackets will only appear if less
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost<=x{text}      The text inside the brackets will only appear if at
 *                      most x Boosts are used. In battle use only!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - This is used for on boost.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - This is used for on boost.
 * 
 *   Repeat Animation?:
 *   - Repeat boost animation played?
 *   - Only repeated during command input.
 * 
 *     Repeat Cycle:
 *     - How many frames to wait between each animation?
 *     - 60 frames = 1 second.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation when repeated?
 *     - Overrides on boost Mirror setting.
 * 
 *     Mute Animation:
 *     - Mute the effect animation when repeated?
 *     - Overrides on boost Mute setting.
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.12: April 17, 2025
 * * Compatibility Update!
 * ** Better compatibility with Message Core's wordwrap.
 * * Documentation Update!
 * ** The follow text codes now have added notes to them:
 * *** \boost>=x[text]
 * *** \boost>x[text]
 * *** \boost=x[text]
 * *** \boost<x[text]
 * *** \boost<=x[text]
 * **** Added note: In battle use only!
 * * Feature Update!
 * ** \boost=0[x] now functions the same as \boost0[x] and does not require
 *    being in battle. Update made by Arisu.
 * 
 * Version 1.11: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Mechanics > Boost Animations > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Mute Animation
 * **** Mirror/Mute the effect animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat Animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat > Repeat Cycle
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mute Animation
 * **** Allows repeating animations while boosted and inputting.
 * **** Only repeated during command input.
 * 
 * Version 1.10: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where boost would cause softlocks in certain menus. Fix made
 *    by Olivia.
 * 
 * Version 1.09: March 14, 2024
 * * Feature Update!
 * ** Removed VisuMZ_1_MessageCore dependency.
 * 
 * Version 1.08: October 12, 2023
 * * Documentation Update!
 * ** Fixed a typo found within a notetag:
 * *** <Boost Stealed> should be <Boost Sealed>.
 * **** That is some massive Engrish there, Olivia.
 * ***** Don't sneak these kinds of comments in. They're not funny.
 * 
 * Version 1.07: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles. Update made by Olivia.
 * 
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 *
 * @param BoostAniMirror:eval
 * @text Mirror Animation
 * @parent Animations
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param BoostAniMute:eval
 * @text Mute Animation
 * @parent Animations
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param RepeatBoostAni:eval
 * @text Repeat Animation?
 * @parent Animations
 * @type boolean
 * @on Repeat
 * @off Single
 * @desc Repeat boost animation played?
 * Only repeated during command input.
 * @default false
 * 
 * @param RepeatAniCycle:num
 * @text Repeat Cycle
 * @parent RepeatBoostAni:eval
 * @desc How many frames to wait between each animation?
 * 60 frames = 1 second.
 * @default 120
 *
 * @param RepeatAniMirror:eval
 * @text Mirror Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation when repeated?
 * Overrides on boost Mirror setting.
 * @default false
 *
 * @param RepeatAniMute:eval
 * @text Mute Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation when repeated?
 * Overrides on boost Mute setting.
 * @default true
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0xff1982=_0x5ac2;function _0x5ee5(){const _0xb671da=['RefreshHelpWindowInBattle','note','bitmap','BOOST_ACTION_BYPASS_CONSTRUCTORS','randomInt','battleLayoutStyle','BOOST_POINTS_START_BATTLE','actor%1-boostPoints','BOOST_POINTS_ANIMATION_DELAY','actorId','35IQNDxO','toLowerCase','regenerateBoostPoints','map','enemy','placeBoostPoints','VisuMZ_1_BattleCore','shouldDrawBoostIcons','traitObjects','resetStateCounts','move','isEnemy','regenerateAll','isBoostSealed','DmgAddition','setupBoostAI','setup','applyGuard','EmptyIcon','unboost','Game_Battler_removeBattleStates','update','floor','cursorPageup','MaxStored','_repeatBoostAnimationTimer','SmoothIcons','BOOST_POINTS_ADDITION','_logWindow','BoostIcon','item','itemRect','UnboostCmd','8quqsKJ','boostTransferBitmap','BoostGainPoints','convertBoostEqualEscape','Require','RepeatMultiply','loadSystem','Turn','RepeatBoostAni','EVAL','PgUpDnShortcuts','_boostAI','drawItemStatusBoostPoints','RegExp','boostAddition','Analyze','startChangeBoostPointsAnimation','meetsUsableItemConditions','Game_Battler_addState','selectNextCommand','status','_slot','startActorCommandSelection','add','BoostAction','DeathRegen','FUNC','isUsingRepeatBoostAnimation','BOOST_POINTS_DISPLAY_OFFSET_Y','_storedBoostPoints','Game_Action_apply','Game_Party_partyChangeRefresh','Window_Base_postConvertEscapeCharacters','_turnUsedBoostPoints','Amount','TurnAddition','convertBoostTurnEscape','default','_previousBattleChainBoostActions','BoostDamage','name','isDead','setToUseBoostPoints','boostMultiplier','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setStoredBoostPoints','isBTB','TargetBoostPoints','ARRAYJSON','createFallbackBoostSubject','removeBattleStates','processtoUseBoostPoints','itemRectWithPadding','lineHeight','_iconIndex','IconSet','4072326mAQeKd','processEnemyUseBoost','Game_Party_removeActor','_toUseBoostPoints','prototype','allowBoostAction','numRepeats','canUseBoostPoints','scale','ARRAYSTRUCT','replace','_waitCount','partyChangeRefresh','initBoostAction','_actor','_bpSubject','height','getActiveChainSkillSelected','ICON_SIZE_RATE','Window_ActorCommand_addGuardCommand','removeActor','initMembers','LessEqual','BOOST_POINTS_DISPLAY_BATTLE_STATUS','VisuMZ_2_BattleSystemBTB','addUnboostCommand','border','Repeat','addChild','Game_BattlerBase_initialize','bpRegenMultipliers','_icons','IconSizeRate','190346hYuNbP','postConvertEscapeCharacters','EffectAddition','canUndoBoostPoints','smooth','addState','BoostBattleStartFlat','addActor','regenerateTp','2008840OxNgRB','currentAction','portrait','boostIconsheetBitmap','text','BattleStatusOffsetY','setupBattleBoostPointsMultiplier','BypassConstructors','convertBoostAnalyzeEscape','convertBoostGreaterEqualEscape','convertBoostEffectEscape','exit','clearBoostSubject','trim','Window_BattleStatus_drawItemStatus','call','boost','convertBoostLessEscape','BoostAniMute','EffectMultiply','format','_boostIconSheet','commandBoost','144474oWsjDz','BpEffect','BattleManager_processTurn','VisuMZ_1_SkillsStatesCore','applyBoostPointRepeats','Scene_Battle_selectNextCommand','ARRAYNUM','callUpdateHelp','convertBoostRepeatEscape','TurnMultiply','endAction','BattleManager_endAction','create','Skill\x20','convertBoostLessEqualEscape','BoostBattleStartRate','subject','iconHeight','ceil','BOOST_POINTS_DEATH_REGEN','_inBattle','clearRepeatBoostAnimation','Game_BattlerBase_resetStateCounts','BoostRepeat','GreaterEqual','addBuff','calculateBPtoUse','version','applyBPEffects','Damage','_scene','1432053gpVFmD','BOOST_POINTS_MAX_TOUSE','BattleCore','processTurn','endActionBoostPoints','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','applyItemUserEffect','toUpperCase','BOOST_ACTION_SHOW','_helpWindow','actor','setupBattleBoostPoints','Window_Selectable_cursorPageup','filter','ShowBoostCmd','includes','Scene_Battle_startActorCommandSelection','width','meetstoUseBoostPointsRequirement','refresh','boostPointsRegenValue','requestFauxAnimation','isHidden','max','canUseBoostShortcut','__Game_Action_applyItemUserEffect','gainStoredBoostPoints','_bpTurnFlat','BOOST_POINTS_DISPLAY_AUTO_POS','boostIcon','convertBoostUpEscape','Game_Action_numRepeats','_actorCommandWindow','createChildSprites','BoostPointsRegenFlat','inBattle','RepeatAniMirror','RepeatAniCycle','updateFrame','meetsBoostShortcutRequirements','commandStyle','VisuMZ_3_ActiveChainSkills','match','show','6DMfGrY','2327353EFfCYd','boostSmooth','isActor','initialize','activate','applyBoostPointTurns','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_Battler_addBuff','description','ShowUnboostCmd','createActorCommandWindow','bind','convertBoostEscapeCharacters','Usable','BOOST_POINTS_MAX_STORED','convertBoost0Escape','Game_Battler_regenerateTp','12idzaYf','18wGtSSL','unboostIcon','playOkSound','convertBoostGreaterEscape','convertEscapeCharacters','createInnerSprite','EnemyBoostSkillID','parameters','VisuMZ_1_MessageCore','Animations','STR','currentSymbol','setBoostSubject','_stateTurns','_battler','round','Game_BattlerBase_meetsUsableItemConditions','clamp','VisuMZ_0_CoreEngine','BOOST_POINTS_TURN_REGEN','convertBoostDamageEscape','drawItemStatusBoostPointsDefault','_bpTurnRate','RepeatAddition','BoostTurns','_customModified','Mechanics','BOOST_POINTS_ANIMATIONS','EnemyBoostSkillName','AlwaysRegen','iconWidth','startRepeatBoostAnimation','setupBattleBoostPointsAdded','clear','storedBoostPoints','Scene_Battle_update','blt','drawItemStatusBoostPointsAuto','BattleStatusAutoPosition','drawItemStatus','loadBitmap','BoostAniMirror','commandUnboost','Window_Base_convertEscapeCharacters','setHandler','applyBoostPointDamage','Window_Selectable_cursorPagedown','gainToUseBoostPoints','constructor','BP\x20Effect','AnimationDelay','AnalyzeMultiply','Game_Battler_regenerateAll','_subject','BattleStatusOffsetX','154352FYtVOS','BOOST_POINTS_MULTIPLIERS','Scene_Battle_createActorCommandWindow','boostCommandName','parse','unboostCommandName','apply','Game_Action_applyGuard','Game_Enemy_setup','ConvertParams','BOOST_POINTS_DISPLAY_OFFSET_X','some','setFrame','cursorPagedown','Game_Battler_addDebuff','toUseBoostPoints','Settings','BattleManager_setup','Regen','maxTurns','addCommand','BOOST_POINTS_REGEN_ALWAYS'];_0x5ee5=function(){return _0xb671da;};return _0x5ee5();}(function(_0x2a2ef4,_0x2c9312){const _0x5c9649=_0x5ac2,_0x384460=_0x2a2ef4();while(!![]){try{const _0x113aaa=parseInt(_0x5c9649(0x20b))/0x1*(-parseInt(_0x5c9649(0x1a0))/0x2)+parseInt(_0x5c9649(0x1df))/0x3+parseInt(_0x5c9649(0x255))/0x4*(-parseInt(_0x5c9649(0x275))/0x5)+parseInt(_0x5c9649(0x17f))/0x6+parseInt(_0x5c9649(0x20c))/0x7*(-parseInt(_0x5c9649(0x147))/0x8)+parseInt(_0x5c9649(0x21e))/0x9*(parseInt(_0x5c9649(0x1a9))/0xa)+parseInt(_0x5c9649(0x1c0))/0xb*(parseInt(_0x5c9649(0x21d))/0xc);if(_0x113aaa===_0x2c9312)break;else _0x384460['push'](_0x384460['shift']());}catch(_0x291f05){_0x384460['push'](_0x384460['shift']());}}}(_0x5ee5,0x6101d));var label=_0xff1982(0x15f),tier=tier||0x0,dependencies=[_0xff1982(0x230),_0xff1982(0x27b),_0xff1982(0x1c3)],pluginData=$plugins[_0xff1982(0x1ec)](function(_0x59140c){const _0x2edb18=_0xff1982;return _0x59140c[_0x2edb18(0x15b)]&&_0x59140c[_0x2edb18(0x214)][_0x2edb18(0x1ee)]('['+label+']');})[0x0];VisuMZ[label][_0xff1982(0x265)]=VisuMZ[label][_0xff1982(0x265)]||{},VisuMZ[_0xff1982(0x25e)]=function(_0x4d5003,_0x1af9d7){const _0xec98fa=_0xff1982;for(const _0x2da5e7 in _0x1af9d7){if(_0x2da5e7[_0xec98fa(0x209)](/(.*):(.*)/i)){const _0x101698=String(RegExp['$1']),_0x4bd847=String(RegExp['$2'])[_0xec98fa(0x1e6)]()[_0xec98fa(0x1b6)]();let _0x4647dd,_0x1a16ea,_0x290ca1;switch(_0x4bd847){case'NUM':_0x4647dd=_0x1af9d7[_0x2da5e7]!==''?Number(_0x1af9d7[_0x2da5e7]):0x0;break;case _0xec98fa(0x1c6):_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea['map'](_0x2857c5=>Number(_0x2857c5));break;case _0xec98fa(0x150):_0x4647dd=_0x1af9d7[_0x2da5e7]!==''?eval(_0x1af9d7[_0x2da5e7]):null;break;case'ARRAYEVAL':_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea['map'](_0x26e78d=>eval(_0x26e78d));break;case'JSON':_0x4647dd=_0x1af9d7[_0x2da5e7]!==''?JSON['parse'](_0x1af9d7[_0x2da5e7]):'';break;case _0xec98fa(0x177):_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea[_0xec98fa(0x278)](_0x490ccd=>JSON[_0xec98fa(0x259)](_0x490ccd));break;case _0xec98fa(0x161):_0x4647dd=_0x1af9d7[_0x2da5e7]!==''?new Function(JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7])):new Function('return\x200');break;case'ARRAYFUNC':_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea[_0xec98fa(0x278)](_0x4bb2aa=>new Function(JSON['parse'](_0x4bb2aa)));break;case _0xec98fa(0x228):_0x4647dd=_0x1af9d7[_0x2da5e7]!==''?String(_0x1af9d7[_0x2da5e7]):'';break;case'ARRAYSTR':_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON['parse'](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea[_0xec98fa(0x278)](_0x2de87d=>String(_0x2de87d));break;case'STRUCT':_0x290ca1=_0x1af9d7[_0x2da5e7]!==''?JSON['parse'](_0x1af9d7[_0x2da5e7]):{},_0x4647dd=VisuMZ[_0xec98fa(0x25e)]({},_0x290ca1);break;case _0xec98fa(0x188):_0x1a16ea=_0x1af9d7[_0x2da5e7]!==''?JSON[_0xec98fa(0x259)](_0x1af9d7[_0x2da5e7]):[],_0x4647dd=_0x1a16ea[_0xec98fa(0x278)](_0x568534=>VisuMZ[_0xec98fa(0x25e)]({},JSON[_0xec98fa(0x259)](_0x568534)));break;default:continue;}_0x4d5003[_0x101698]=_0x4647dd;}}return _0x4d5003;},(_0x595cab=>{const _0x4f11e6=_0xff1982,_0x585dee=_0x595cab[_0x4f11e6(0x16f)];for(const _0x2190f1 of dependencies){if(!Imported[_0x2190f1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x585dee,_0x2190f1)),SceneManager[_0x4f11e6(0x1b4)]();break;}}const _0x1935a4=_0x595cab[_0x4f11e6(0x214)];if(_0x1935a4['match'](/\[Version[ ](.*?)\]/i)){const _0x58d40d=Number(RegExp['$1']);_0x58d40d!==VisuMZ[label][_0x4f11e6(0x1db)]&&(alert(_0x4f11e6(0x212)[_0x4f11e6(0x1bd)](_0x585dee,_0x58d40d)),SceneManager[_0x4f11e6(0x1b4)]());}if(_0x1935a4[_0x4f11e6(0x209)](/\[Tier[ ](\d+)\]/i)){const _0x4377b4=Number(RegExp['$1']);_0x4377b4<tier?(alert(_0x4f11e6(0x173)[_0x4f11e6(0x1bd)](_0x585dee,_0x4377b4,tier)),SceneManager[_0x4f11e6(0x1b4)]()):tier=Math[_0x4f11e6(0x1f6)](_0x4377b4,tier);}VisuMZ[_0x4f11e6(0x25e)](VisuMZ[label][_0x4f11e6(0x265)],_0x595cab[_0x4f11e6(0x225)]);})(pluginData),VisuMZ['BoostAction'][_0xff1982(0x154)]={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager[_0xff1982(0x1fc)]=VisuMZ['BoostAction'][_0xff1982(0x265)]['UI'][_0xff1982(0x143)],ImageManager[_0xff1982(0x21f)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI'][_0xff1982(0x138)],ImageManager[_0xff1982(0x20d)]=VisuMZ['BoostAction'][_0xff1982(0x265)]['UI'][_0xff1982(0x140)],ImageManager['boostIconsheetBitmap']=function(){const _0x16baec=_0xff1982;if(!this[_0x16baec(0x1be)]){this['_boostIconSheet']=new Bitmap();const _0x619e68=ImageManager[_0x16baec(0x14d)](_0x16baec(0x17e));_0x619e68['addLoadListener'](this[_0x16baec(0x148)][_0x16baec(0x217)](this,_0x619e68));}return this[_0x16baec(0x1be)];},ImageManager[_0xff1982(0x148)]=function(_0x52de46){const _0x5e6445=_0xff1982;this['_boostIconSheet']['resize'](_0x52de46[_0x5e6445(0x1f0)],_0x52de46['height']),this[_0x5e6445(0x1be)][_0x5e6445(0x242)](_0x52de46,0x0,0x0,_0x52de46[_0x5e6445(0x1f0)],_0x52de46[_0x5e6445(0x18f)],0x0,0x0),this[_0x5e6445(0x1be)][_0x5e6445(0x1a4)]=ImageManager['boostSmooth'],this['_boostIconSheet'][_0x5e6445(0x237)]=![];},TextManager['boostCommandName']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI']['BoostCmd'],TextManager[_0xff1982(0x25a)]=VisuMZ['BoostAction'][_0xff1982(0x265)]['UI'][_0xff1982(0x146)],VisuMZ[_0xff1982(0x15f)][_0xff1982(0x266)]=BattleManager[_0xff1982(0x136)],BattleManager[_0xff1982(0x136)]=function(_0x303cb5,_0x11efd6,_0x19aace){const _0x5df5d9=_0xff1982;VisuMZ[_0x5df5d9(0x15f)]['BattleManager_setup'][_0x5df5d9(0x1b8)](this,_0x303cb5,_0x11efd6,_0x19aace),$gameParty[_0x5df5d9(0x1ea)](),$gameTroop[_0x5df5d9(0x1ea)]();},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1c2)]=BattleManager['processTurn'],BattleManager[_0xff1982(0x1e2)]=function(){const _0x39bcb6=_0xff1982;this['processEnemyUseBoost'](),VisuMZ[_0x39bcb6(0x15f)]['BattleManager_processTurn'][_0x39bcb6(0x1b8)](this);},BattleManager[_0xff1982(0x180)]=function(){const _0x3e5dec=_0xff1982;var _0xdd0967=this[_0x3e5dec(0x253)],_0x26b957=_0xdd0967[_0x3e5dec(0x1aa)]();!!_0xdd0967&&_0xdd0967[_0x3e5dec(0x280)]()&&!!_0x26b957&&_0x26b957['isSkill']()&&_0xdd0967[_0x3e5dec(0x240)]()>0x0&&!_0xdd0967[_0x3e5dec(0x282)]()&&_0xdd0967['processtoUseBoostPoints'](_0x26b957[_0x3e5dec(0x144)]());},BattleManager[_0xff1982(0x184)]=function(){const _0x3ef71d=_0xff1982;if(Imported[_0x3ef71d(0x197)]&&this[_0x3ef71d(0x175)]())return![];return!![];},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1fe)]=Game_Action[_0xff1982(0x183)][_0xff1982(0x185)],Game_Action['prototype'][_0xff1982(0x185)]=function(){const _0x236659=_0xff1982;var _0x5cc247=VisuMZ[_0x236659(0x15f)][_0x236659(0x1fe)][_0x236659(0x1b8)](this);_0x5cc247=this[_0x236659(0x1c4)](_0x5cc247);return Math[_0x236659(0x22d)](_0x5cc247);;},Game_Action[_0xff1982(0x183)][_0xff1982(0x1c4)]=function(_0x5fe817){const _0x47466b=_0xff1982,_0x1a7330=VisuMZ['BoostAction'][_0x47466b(0x154)];if(!!this[_0x47466b(0x1d0)]()&&!!this['item']()&&this[_0x47466b(0x144)]()[_0x47466b(0x26c)][_0x47466b(0x209)](_0x1a7330[_0x47466b(0x1d7)])){var _0x23363c=this['subject']()['boostMultiplier'](_0x47466b(0x19a));_0x5fe817=Math[_0x47466b(0x22d)](_0x5fe817*_0x23363c),_0x5fe817+=this['subject']()[_0x47466b(0x155)](_0x47466b(0x19a));}return _0x5fe817;},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x25c)]=Game_Action[_0xff1982(0x183)][_0xff1982(0x137)],Game_Action[_0xff1982(0x183)][_0xff1982(0x137)]=function(_0x1e3f17,_0xc0e932){const _0x1ce745=_0xff1982;return _0x1e3f17=this[_0x1ce745(0x24b)](_0x1e3f17),VisuMZ[_0x1ce745(0x15f)]['Game_Action_applyGuard'][_0x1ce745(0x1b8)](this,_0x1e3f17,_0xc0e932);},Game_Action[_0xff1982(0x183)][_0xff1982(0x24b)]=function(_0x383254){const _0x54888f=_0xff1982,_0x80648c=VisuMZ['BoostAction'][_0x54888f(0x154)];if(!!this[_0x54888f(0x1d0)]()&&this[_0x54888f(0x144)]()[_0x54888f(0x26c)]['match'](_0x80648c[_0x54888f(0x16e)])){var _0x568092=this[_0x54888f(0x1d0)]()['boostMultiplier'](_0x54888f(0x1dd));_0x383254=Math[_0x54888f(0x22d)](_0x383254*_0x568092),_0x383254+=this[_0x54888f(0x1d0)]()[_0x54888f(0x155)]('Damage');}return _0x383254;},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x165)]=Game_Action[_0xff1982(0x183)][_0xff1982(0x25b)],Game_Action[_0xff1982(0x183)][_0xff1982(0x25b)]=function(_0x5e6eda){const _0x3b2e3c=_0xff1982;this[_0x3b2e3c(0x211)](![]),VisuMZ[_0x3b2e3c(0x15f)][_0x3b2e3c(0x165)][_0x3b2e3c(0x1b8)](this,_0x5e6eda),this[_0x3b2e3c(0x211)](!![]);},Game_Action[_0xff1982(0x183)][_0xff1982(0x211)]=function(_0x4444aa){const _0x11307b=_0xff1982,_0x1278f6=VisuMZ[_0x11307b(0x15f)][_0x11307b(0x154)];if(!!this[_0x11307b(0x1d0)]()&&this[_0x11307b(0x144)]()['note'][_0x11307b(0x209)](_0x1278f6[_0x11307b(0x236)])){var _0x1e3886=this[_0x11307b(0x1d0)]()[_0x11307b(0x172)]('Turn');$gameTemp['_bpTurnRate']=_0x1e3886,$gameTemp[_0x11307b(0x1fa)]=this[_0x11307b(0x1d0)]()[_0x11307b(0x155)](_0x11307b(0x14e));}_0x4444aa&&($gameTemp[_0x11307b(0x234)]=undefined,$gameTemp[_0x11307b(0x1fa)]=undefined);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1f8)]=Game_Action[_0xff1982(0x183)][_0xff1982(0x1e5)],Game_Action[_0xff1982(0x183)][_0xff1982(0x1e5)]=function(_0xbbc645){const _0x307d22=_0xff1982;VisuMZ[_0x307d22(0x15f)][_0x307d22(0x1f8)][_0x307d22(0x1b8)](this,_0xbbc645),this[_0x307d22(0x1dc)](_0xbbc645);},Game_Action[_0xff1982(0x183)][_0xff1982(0x1dc)]=function(_0x3c3434){const _0x175434=_0xff1982,_0x47ee4d=VisuMZ[_0x175434(0x15f)][_0x175434(0x154)];if(!!_0x3c3434&&this['item']()[_0x175434(0x26c)][_0x175434(0x209)](_0x47ee4d[_0x175434(0x176)])){var _0x591eca=parseInt(RegExp['$1']);this[_0x175434(0x144)]()['note']['match'](_0x47ee4d[_0x175434(0x149)])&&(_0x591eca=Math['round'](this[_0x175434(0x1d0)]()[_0x175434(0x172)](_0x175434(0x24f))*_0x591eca),_0x591eca+=this[_0x175434(0x1d0)]()['boostAddition'](_0x175434(0x24f))),_0x3c3434[_0x175434(0x1f9)](_0x591eca);}if(!!this[_0x175434(0x1d0)]()&&this[_0x175434(0x144)]()[_0x175434(0x26c)][_0x175434(0x209)](_0x47ee4d['UserBoostPoints'])){var _0x591eca=parseInt(RegExp['$1']);this[_0x175434(0x144)]()[_0x175434(0x26c)][_0x175434(0x209)](_0x47ee4d['BoostGainPoints'])&&(_0x591eca=Math[_0x175434(0x22d)](this[_0x175434(0x1d0)]()[_0x175434(0x172)]('BP\x20Effect')*_0x591eca),_0x591eca+=this[_0x175434(0x1d0)]()[_0x175434(0x155)]('BP\x20Effect')),this[_0x175434(0x1d0)]()[_0x175434(0x1f9)](_0x591eca);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x13e)],Game_BattlerBase[_0xff1982(0x1e0)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x219)],Game_BattlerBase[_0xff1982(0x1d3)]=VisuMZ['BoostAction']['Settings'][_0xff1982(0x238)][_0xff1982(0x160)],Game_BattlerBase['BOOST_POINTS_DEATH_REMOVE']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)]['DeathRemoval'],Game_BattlerBase['BOOST_POINTS_REGEN_ALWAYS']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['Mechanics'][_0xff1982(0x23b)],Game_BattlerBase['BOOST_POINTS_TURN_REGEN']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x267)],Game_BattlerBase[_0xff1982(0x271)]=VisuMZ[_0xff1982(0x15f)]['Settings'][_0xff1982(0x238)]['StartBattle'],VisuMZ['BoostAction']['Game_BattlerBase_initialize']=Game_BattlerBase['prototype'][_0xff1982(0x20f)],Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x20f)]=function(){const _0x3c8e7c=_0xff1982;VisuMZ[_0x3c8e7c(0x15f)][_0x3c8e7c(0x19c)][_0x3c8e7c(0x1b8)](this),this[_0x3c8e7c(0x18c)]();},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x18c)]=function(){const _0x5ae5fa=_0xff1982;this[_0x5ae5fa(0x164)]=this['_storedBoostPoints']||0x0,this[_0x5ae5fa(0x182)]=this[_0x5ae5fa(0x182)]||0x0,this['_turnUsedBoostPoints']=this[_0x5ae5fa(0x168)]||0x0;},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x240)]=function(){const _0x19201b=_0xff1982;return this[_0x19201b(0x164)]===undefined&&this[_0x19201b(0x18c)](),this[_0x19201b(0x164)];},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x174)]=function(_0x7a89a9){const _0x508a96=_0xff1982;this['_storedBoostPoints']===undefined&&this[_0x508a96(0x18c)](),_0x7a89a9=Math[_0x508a96(0x22d)](_0x7a89a9),this[_0x508a96(0x164)]=_0x7a89a9[_0x508a96(0x22f)](0x0,Game_BattlerBase[_0x508a96(0x21a)]),this['refresh']();},Game_BattlerBase[_0xff1982(0x183)]['toUseBoostPoints']=function(){const _0x6b4ab1=_0xff1982;if($gameParty['inBattle']())return 0x0;return this[_0x6b4ab1(0x182)]===undefined&&this[_0x6b4ab1(0x18c)](),this[_0x6b4ab1(0x182)];},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x171)]=function(_0x3f2799){const _0x538e5f=_0xff1982;this[_0x538e5f(0x182)]===undefined&&this[_0x538e5f(0x18c)](),_0x3f2799=Math[_0x538e5f(0x22d)](_0x3f2799),this['_toUseBoostPoints']=_0x3f2799['clamp'](0x0,Game_BattlerBase[_0x538e5f(0x1e0)]),this['refresh']();},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x1f3)]=function(){const _0x23d970=_0xff1982;if(!Game_BattlerBase[_0x23d970(0x1d3)]&&(this[_0x23d970(0x170)]()||this[_0x23d970(0x1f5)]()))return 0x0;else{var _0x27befd=Game_BattlerBase[_0x23d970(0x231)];return _0x27befd=this[_0x23d970(0x19d)](_0x27befd),_0x27befd=this['bpRegenAdded'](_0x27befd),_0x27befd;}},Game_BattlerBase['prototype'][_0xff1982(0x282)]=function(){const _0xd2fd3e=_0xff1982,_0x57b013=this['traitObjects'](),_0x14fc7b=VisuMZ[_0xd2fd3e(0x15f)]['RegExp'];return _0x57b013[_0xd2fd3e(0x260)](_0x3430e0=>_0x3430e0&&_0x3430e0[_0xd2fd3e(0x26c)]['match'](_0x14fc7b['BoostSealed']));},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1d6)]=Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x27e)],Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x27e)]=function(_0x2c3009){const _0x4401a8=_0xff1982;var _0x42e0d6=this[_0x4401a8(0x22b)][_0x2c3009]||0x0;VisuMZ[_0x4401a8(0x15f)][_0x4401a8(0x1d6)][_0x4401a8(0x1b8)](this,_0x2c3009);if(!!$gameTemp['_bpTurnRate']){$gameTemp['_bpTurnFlat']=$gameTemp[_0x4401a8(0x1fa)]||0x0;var _0x113cf7=$dataStates[_0x2c3009],_0x4c74ea=Math['round'](_0x113cf7[_0x4401a8(0x268)]*$gameTemp[_0x4401a8(0x234)])+$gameTemp[_0x4401a8(0x1fa)],_0x5a357e=Math[_0x4401a8(0x22d)](_0x113cf7['minTurns']*$gameTemp[_0x4401a8(0x234)])+$gameTemp['_bpTurnFlat'],_0x2dd2c1=0x1+Math[_0x4401a8(0x1f6)](_0x4c74ea-_0x5a357e,0x0);const _0x263e63=this['getStateReapplyRulings'](_0x113cf7)[_0x4401a8(0x276)]()[_0x4401a8(0x1b6)]();switch(_0x263e63){case'reset':this['_stateTurns'][_0x2c3009]=_0x5a357e+Math['randomInt'](_0x2dd2c1);break;case'greater':const _0x594766=this[_0x4401a8(0x22b)][_0x2c3009],_0x4edb80=_0x5a357e+Math[_0x4401a8(0x26f)](_0x2dd2c1);this[_0x4401a8(0x22b)][_0x2c3009]=Math[_0x4401a8(0x1f6)](_0x594766,_0x4edb80);break;case _0x4401a8(0x15e):this[_0x4401a8(0x22b)][_0x2c3009]=_0x5a357e+Math[_0x4401a8(0x26f)](_0x2dd2c1)+_0x42e0d6;break;}}},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x22e)]=Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x158)],Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x158)]=function(_0x332524){const _0x28b32a=_0xff1982;return VisuMZ[_0x28b32a(0x15f)]['Game_BattlerBase_meetsUsableItemConditions'][_0x28b32a(0x1b8)](this,_0x332524)?this['meetstoUseBoostPointsRequirement'](_0x332524):![];},Game_BattlerBase[_0xff1982(0x183)][_0xff1982(0x1f1)]=function(_0x3a280c){const _0x199ddb=_0xff1982,_0x61b8ab=VisuMZ[_0x199ddb(0x15f)][_0x199ddb(0x154)];var _0x577872=_0x3a280c['note'];if(_0x577872['match'](_0x61b8ab[_0x199ddb(0x14b)][_0x199ddb(0x169)])||_0x577872['match'](_0x61b8ab[_0x199ddb(0x14b)][_0x199ddb(0x1d8)])){var _0x2dfbcf=parseInt(RegExp['$1']);return this['isActor']()?this[_0x199ddb(0x264)]()>=_0x2dfbcf:this[_0x199ddb(0x240)]()>=_0x2dfbcf;}else{if(_0x3a280c[_0x199ddb(0x26c)][_0x199ddb(0x209)](_0x61b8ab['Require'][_0x199ddb(0x1d8)])){var _0x2dfbcf=parseInt(RegExp['$1']);return this[_0x199ddb(0x20e)]()?this['toUseBoostPoints']()>_0x2dfbcf:this[_0x199ddb(0x240)]()>_0x2dfbcf;}else{if(_0x3a280c[_0x199ddb(0x26c)]['match'](_0x61b8ab[_0x199ddb(0x14b)]['Equal'])){var _0x2dfbcf=parseInt(RegExp['$1']);return this[_0x199ddb(0x20e)]()?this['toUseBoostPoints']()===_0x2dfbcf:this[_0x199ddb(0x240)]()===_0x2dfbcf;}else{if(_0x3a280c[_0x199ddb(0x26c)][_0x199ddb(0x209)](_0x61b8ab['Require']['Less'])){var _0x2dfbcf=parseInt(RegExp['$1']);return this[_0x199ddb(0x20e)]()?this[_0x199ddb(0x264)]()<_0x2dfbcf:this[_0x199ddb(0x240)]()<_0x2dfbcf;}else{if(_0x3a280c['note']['match'](_0x61b8ab['Require'][_0x199ddb(0x195)])){var _0x2dfbcf=parseInt(RegExp['$1']);return this[_0x199ddb(0x20e)]()?this[_0x199ddb(0x264)]()<=_0x2dfbcf:this['storedBoostPoints']()<=_0x2dfbcf;}else return!![];}}}}},Game_Battler[_0xff1982(0x256)]={'Damage':VisuMZ[_0xff1982(0x15f)]['Settings'][_0xff1982(0x238)]['DmgMultiply'],'Turn':VisuMZ['BoostAction'][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x1c9)],'Repeat':VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x14c)],'BpEffect':VisuMZ[_0xff1982(0x15f)]['Settings'][_0xff1982(0x238)][_0xff1982(0x1bc)],'Analyze':VisuMZ[_0xff1982(0x15f)]['Settings']['Mechanics'][_0xff1982(0x251)]},Game_Battler['BOOST_POINTS_ADDITION']={'Damage':VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x283)],'Turn':VisuMZ['BoostAction'][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x16a)],'Repeat':VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x235)],'BpEffect':VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['Mechanics'][_0xff1982(0x1a2)],'Analyze':VisuMZ[_0xff1982(0x15f)]['Settings'][_0xff1982(0x238)]['AnalyzeAddition']},Game_Battler['BOOST_POINTS_ANIMATIONS']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)][_0xff1982(0x238)][_0xff1982(0x227)],Game_Battler[_0xff1982(0x183)][_0xff1982(0x1f9)]=function(_0x2e62de){const _0x41286e=_0xff1982;this[_0x41286e(0x174)](this['storedBoostPoints']()+_0x2e62de);},Game_Battler[_0xff1982(0x183)][_0xff1982(0x24d)]=function(_0x37ec60){const _0x18df62=_0xff1982;this[_0x18df62(0x171)](this[_0x18df62(0x264)]()+_0x37ec60);},Game_Battler[_0xff1982(0x183)][_0xff1982(0x172)]=function(_0x26a39c){const _0xeef869=_0xff1982,_0xdbee38=Game_Battler['BOOST_POINTS_MULTIPLIERS'];if(_0x26a39c['match'](/Damage/i))var _0x3730f2=_0xdbee38[_0xeef869(0x1dd)];else{if(_0x26a39c[_0xeef869(0x209)](/Turn/i))var _0x3730f2=_0xdbee38[_0xeef869(0x14e)];else{if(_0x26a39c[_0xeef869(0x209)](/Repeat/i))var _0x3730f2=_0xdbee38[_0xeef869(0x19a)];else{if(_0x26a39c[_0xeef869(0x209)](/BP Effect/i))var _0x3730f2=_0xdbee38[_0xeef869(0x1c1)];else{if(_0x26a39c[_0xeef869(0x209)](/Analyze/i))var _0x3730f2=_0xdbee38['Analyze'];else return this['toUseBoostPoints']();}}}}var _0x1723b3=this['toUseBoostPoints']();return _0x3730f2[_0x1723b3]||_0x3730f2[0x0];},Game_Battler[_0xff1982(0x183)][_0xff1982(0x155)]=function(_0x41ee79){const _0x2e662a=_0xff1982,_0x42292d=Game_Battler[_0x2e662a(0x141)];if(_0x41ee79[_0x2e662a(0x209)](/Damage/i))var _0x58938d=_0x42292d[_0x2e662a(0x1dd)];else{if(_0x41ee79['match'](/Turn/i))var _0x58938d=_0x42292d[_0x2e662a(0x14e)];else{if(_0x41ee79[_0x2e662a(0x209)](/Repeat/i))var _0x58938d=_0x42292d[_0x2e662a(0x19a)];else{if(_0x41ee79['match'](/BP Effect/i))var _0x58938d=_0x42292d[_0x2e662a(0x1c1)];else{if(_0x41ee79[_0x2e662a(0x209)](/Analyze/i))var _0x58938d=_0x42292d[_0x2e662a(0x156)];else return this[_0x2e662a(0x264)]();}}}}var _0x1e3b27=this[_0x2e662a(0x264)]();return parseInt(_0x58938d[_0x1e3b27]||_0x58938d[0x0]);},Game_Battler['prototype'][_0xff1982(0x1ea)]=function(){const _0xc533f3=_0xff1982;if(this[_0xc533f3(0x16d)]){this[_0xc533f3(0x16d)]=undefined;return;}var _0x5be8a3=Game_BattlerBase['BOOST_POINTS_START_BATTLE'];_0x5be8a3=this['setupBattleBoostPointsMultiplier'](_0x5be8a3),_0x5be8a3=this[_0xc533f3(0x23e)](_0x5be8a3),_0x5be8a3=Math[_0xc533f3(0x22d)](_0x5be8a3),this[_0xc533f3(0x174)](_0x5be8a3);},Game_Battler[_0xff1982(0x183)][_0xff1982(0x1af)]=function(_0x191935){const _0x1c6bef=_0xff1982,_0xa0a161=this[_0x1c6bef(0x27d)](),_0x3beb45=VisuMZ['BoostAction'][_0x1c6bef(0x154)];for(const _0x35c5de of _0xa0a161){if(!_0x35c5de)continue;_0x35c5de['note']['match'](_0x3beb45[_0x1c6bef(0x1cf)])&&(_0x191935*=Number(RegExp['$1'])*0.01);}return _0x191935;},Game_Battler[_0xff1982(0x183)]['setupBattleBoostPointsAdded']=function(_0x411257){const _0xbadca1=_0xff1982,_0xf7204a=this[_0xbadca1(0x27d)](),_0x5d3c8b=VisuMZ[_0xbadca1(0x15f)][_0xbadca1(0x154)];for(const _0x3d3363 of _0xf7204a){if(!_0x3d3363)continue;_0x3d3363['note'][_0xbadca1(0x209)](_0x5d3c8b[_0xbadca1(0x1a6)])&&(_0x411257+=Number(RegExp['$1']));}return _0x411257;},Game_Battler[_0xff1982(0x183)][_0xff1982(0x157)]=function(_0xd5c03c){const _0x1d3fa4=_0xff1982;var _0x30454a=this[_0x1d3fa4(0x264)]()[_0x1d3fa4(0x22f)](0x0,Game_BattlerBase[_0x1d3fa4(0x1e0)]);const _0x2d5a3c=Game_Battler[_0x1d3fa4(0x239)];var _0x222aea=Number(_0x2d5a3c[_0x30454a]||_0x2d5a3c[0x0]);if(_0x222aea>0x0){const _0x2b2d62=VisuMZ[_0x1d3fa4(0x15f)]['Settings'][_0x1d3fa4(0x238)],_0x3b550c=_0xd5c03c?_0x2b2d62[_0x1d3fa4(0x203)]||![]:_0x2b2d62[_0x1d3fa4(0x247)]||![],_0x1a68e2=_0xd5c03c?_0x2b2d62['RepeatAniMute']||![]:_0x2b2d62[_0x1d3fa4(0x1bb)]||![];$gameTemp[_0x1d3fa4(0x1f4)]([this],_0x222aea,_0x3b550c,_0x1a68e2);}},Game_Battler['prototype']['canUseBoostPoints']=function(){const _0x131152=_0xff1982;if(this[_0x131152(0x282)]())return![];return this[_0x131152(0x264)]()<Game_BattlerBase[_0x131152(0x1e0)]&&this['storedBoostPoints']()>0x0;},Game_Battler['prototype'][_0xff1982(0x1a3)]=function(){return this['toUseBoostPoints']()>0x0;},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x13a)]=Game_Battler[_0xff1982(0x183)][_0xff1982(0x179)],Game_Battler[_0xff1982(0x183)][_0xff1982(0x179)]=function(){const _0x2dadb7=_0xff1982;VisuMZ[_0x2dadb7(0x15f)]['Game_Battler_removeBattleStates'][_0x2dadb7(0x1b8)](this),this[_0x2dadb7(0x164)]=0x0,this[_0x2dadb7(0x182)]=0x0;},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x21c)]=Game_Battler['prototype'][_0xff1982(0x1a8)],Game_Battler[_0xff1982(0x183)][_0xff1982(0x1a8)]=function(){const _0x410c37=_0xff1982;VisuMZ[_0x410c37(0x15f)][_0x410c37(0x21c)][_0x410c37(0x1b8)](this),this[_0x410c37(0x277)]();},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x252)]=Game_Battler[_0xff1982(0x183)]['regenerateAll'],Game_Battler[_0xff1982(0x183)][_0xff1982(0x281)]=function(){const _0x32d7e4=_0xff1982;VisuMZ[_0x32d7e4(0x15f)][_0x32d7e4(0x252)][_0x32d7e4(0x1b8)](this),Game_BattlerBase[_0x32d7e4(0x1d3)]&&this['isDead']()&&$gameParty[_0x32d7e4(0x202)]()&&this[_0x32d7e4(0x277)]();},Game_Battler[_0xff1982(0x183)][_0xff1982(0x277)]=function(){const _0x14b28c=_0xff1982;(Game_BattlerBase[_0x14b28c(0x26a)]||this[_0x14b28c(0x168)]<=0x0)&&this[_0x14b28c(0x1f9)](this[_0x14b28c(0x1f3)]()),this[_0x14b28c(0x168)]=0x0;},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1cb)]=BattleManager[_0xff1982(0x1ca)],BattleManager[_0xff1982(0x1ca)]=function(){const _0x53bee9=_0xff1982;this['_subject']&&this[_0x53bee9(0x253)][_0x53bee9(0x1e3)](),VisuMZ[_0x53bee9(0x15f)][_0x53bee9(0x1cb)][_0x53bee9(0x1b8)](this);},Game_Battler[_0xff1982(0x183)]['endActionBoostPoints']=function(){const _0x1c3f89=_0xff1982;if(Imported[_0x1c3f89(0x208)]&&$gameTemp[_0x1c3f89(0x190)]())return;this[_0x1c3f89(0x168)]+=this[_0x1c3f89(0x264)](),this[_0x1c3f89(0x171)](0x0);},Game_Battler[_0xff1982(0x183)][_0xff1982(0x19d)]=function(_0x217b58){const _0x16ed27=_0xff1982,_0x294003=this[_0x16ed27(0x27d)](),_0x32b92a=VisuMZ[_0x16ed27(0x15f)][_0x16ed27(0x154)];for(const _0x5019f7 of _0x294003){if(!_0x5019f7)continue;_0x5019f7[_0x16ed27(0x26c)][_0x16ed27(0x209)](_0x32b92a['BoostPointsRegenRate'])&&(_0x217b58*=Number(RegExp['$1'])*0.01);}return _0x217b58;},Game_Battler[_0xff1982(0x183)]['bpRegenAdded']=function(_0x5caf0d){const _0x128160=_0xff1982,_0x502577=this[_0x128160(0x27d)](),_0x3cdb29=VisuMZ['BoostAction']['RegExp'];for(const _0x4730df of _0x502577){if(!_0x4730df)continue;_0x4730df[_0x128160(0x26c)][_0x128160(0x209)](_0x3cdb29[_0x128160(0x201)])&&(_0x5caf0d+=Number(RegExp['$1']));}return _0x5caf0d;},VisuMZ['BoostAction'][_0xff1982(0x159)]=Game_Battler['prototype'][_0xff1982(0x1a5)],Game_Battler[_0xff1982(0x183)][_0xff1982(0x1a5)]=function(_0x1d276c){const _0x4c0895=_0xff1982;var _0x159fe6=this['isDead']();VisuMZ[_0x4c0895(0x15f)][_0x4c0895(0x159)][_0x4c0895(0x1b8)](this,_0x1d276c),Game_BattlerBase['BOOST_POINTS_DEATH_REMOVE']&&!_0x159fe6&&this[_0x4c0895(0x170)]()&&this[_0x4c0895(0x174)](0x0);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x213)]=Game_Battler[_0xff1982(0x183)][_0xff1982(0x1d9)],Game_Battler['prototype']['addBuff']=function(_0x538085,_0x89594e){const _0x4fd81a=_0xff1982;!!$gameTemp[_0x4fd81a(0x234)]&&($gameTemp['_bpTurnFlat']=$gameTemp[_0x4fd81a(0x1fa)]||0x0,_0x89594e=Math['round']($gameTemp[_0x4fd81a(0x234)]*_0x89594e)+$gameTemp[_0x4fd81a(0x1fa)]),VisuMZ[_0x4fd81a(0x15f)]['Game_Battler_addBuff'][_0x4fd81a(0x1b8)](this,_0x538085,_0x89594e);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x263)]=Game_Battler[_0xff1982(0x183)]['addDebuff'],Game_Battler[_0xff1982(0x183)]['addDebuff']=function(_0x2324fe,_0x483b09){const _0x1df717=_0xff1982;!!$gameTemp['_bpTurnRate']&&($gameTemp[_0x1df717(0x1fa)]=$gameTemp[_0x1df717(0x1fa)]||0x0,_0x483b09=Math[_0x1df717(0x22d)]($gameTemp['_bpTurnRate']*_0x483b09)+$gameTemp[_0x1df717(0x1fa)]),VisuMZ[_0x1df717(0x15f)]['Game_Battler_addDebuff'][_0x1df717(0x1b8)](this,_0x2324fe,_0x483b09);},Game_Enemy[_0xff1982(0x273)]=VisuMZ['BoostAction']['Settings']['Mechanics'][_0xff1982(0x250)],VisuMZ[_0xff1982(0x15f)][_0xff1982(0x25d)]=Game_Enemy['prototype'][_0xff1982(0x136)],Game_Enemy[_0xff1982(0x183)][_0xff1982(0x136)]=function(_0x2360a7,_0x1741fc,_0x20c476){const _0x11aece=_0xff1982;VisuMZ[_0x11aece(0x15f)][_0x11aece(0x25d)][_0x11aece(0x1b8)](this,_0x2360a7,_0x1741fc,_0x20c476),this[_0x11aece(0x284)]();},Game_Enemy[_0xff1982(0x183)]['setupBoostAI']=function(){const _0x13bdad=_0xff1982,_0x1ce199=VisuMZ[_0x13bdad(0x15f)][_0x13bdad(0x154)];if(this[_0x13bdad(0x279)]()[_0x13bdad(0x152)]===undefined){this[_0x13bdad(0x279)]()[_0x13bdad(0x152)]={};var _0x51d266=this[_0x13bdad(0x279)]()[_0x13bdad(0x26c)]['split'](/[\r\n]+/);for(var _0xc86975=0x0;_0xc86975<_0x51d266['length'];_0xc86975++){var _0x45e65c=_0x51d266[_0xc86975];if(_0x45e65c[_0x13bdad(0x209)](_0x1ce199[_0x13bdad(0x224)])){var _0x4f3936=_0x13bdad(0x1cd)+parseInt(RegExp['$1']),_0x35cf0d=String(RegExp['$2'])['toLowerCase']();this['enemy']()['_boostAI'][_0x4f3936]=_0x35cf0d;}else{if(_0x45e65c[_0x13bdad(0x209)](_0x1ce199[_0x13bdad(0x23a)])){var _0x46e5cd=String(RegExp['$1']),_0x35cf0d=String(RegExp['$2'])[_0x13bdad(0x276)]();this['enemy']()[_0x13bdad(0x152)][_0x46e5cd]=_0x35cf0d;}}}}},Game_Enemy[_0xff1982(0x183)][_0xff1982(0x17a)]=function(_0x51739f){const _0x32f784=_0xff1982;this[_0x32f784(0x284)]();var _0x3a8907=this[_0x32f784(0x1da)](_0x51739f);_0x3a8907>0x0&&(this['processEnemyBPUsage'](_0x3a8907),this[_0x32f784(0x157)]());},Game_Enemy[_0xff1982(0x183)][_0xff1982(0x1da)]=function(_0x1f4ae5){const _0x3facee=_0xff1982;if(this[_0x3facee(0x240)]()<=0x0)return 0x0;var _0xe36fa2=_0x1f4ae5[_0x3facee(0x16f)],_0x1ad329=_0x3facee(0x1cd)+_0x1f4ae5['id'],_0x5806a7=0x0;if(this[_0x3facee(0x279)]()[_0x3facee(0x152)][_0xe36fa2]||this[_0x3facee(0x279)]()[_0x3facee(0x152)][_0x1ad329]){var _0x21a9ea=this[_0x3facee(0x279)]()[_0x3facee(0x152)][_0xe36fa2]||this['enemy']()[_0x3facee(0x152)][_0x1ad329];if(_0x21a9ea[_0x3facee(0x209)](/(?:ALL|FULL)/i))_0x5806a7=this[_0x3facee(0x240)]();else{if(_0x21a9ea[_0x3facee(0x209)](/AT LEAST (\d+)/i)){var _0x376a24=parseInt(RegExp['$1']);this['storedBoostPoints']()>=_0x376a24&&(_0x5806a7=this['storedBoostPoints']());}else{if(_0x21a9ea[_0x3facee(0x209)](/AT MOST (\d+)/i)){var _0x376a24=parseInt(RegExp['$1']);this[_0x3facee(0x240)]()<=_0x376a24&&(_0x5806a7=this[_0x3facee(0x240)]());}else{if(_0x21a9ea[_0x3facee(0x209)](/EXACTLY (\d+)/i)){var _0x376a24=parseInt(RegExp['$1']);this[_0x3facee(0x240)]()===_0x376a24&&(_0x5806a7=_0x376a24);}}}}}return _0x5806a7[_0x3facee(0x22f)](0x0,Game_BattlerBase[_0x3facee(0x1e0)]);},Game_Enemy[_0xff1982(0x183)]['processEnemyBPUsage']=function(_0x465b67){const _0x464e55=_0xff1982;_0x465b67=_0x465b67[_0x464e55(0x22f)](0x0,this['storedBoostPoints']()),_0x465b67=_0x465b67[_0x464e55(0x22f)](0x0,Game_BattlerBase[_0x464e55(0x1e0)]),this[_0x464e55(0x1f9)](-_0x465b67),this[_0x464e55(0x24d)](_0x465b67);},Game_Enemy[_0xff1982(0x183)][_0xff1982(0x157)]=function(){const _0x153dbb=_0xff1982;var _0xd4b769=0x0,_0x5929a1=this[_0x153dbb(0x264)]()['clamp'](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);const _0x1dd2e5=Game_Battler[_0x153dbb(0x239)],_0x112855=Game_Enemy[_0x153dbb(0x273)],_0x32abff=0x3e8/0x3c;for(var _0x2721c7=0x1;_0x2721c7<=_0x5929a1;_0x2721c7++){var _0x3f05a3=_0x1dd2e5[_0x2721c7]||_0x1dd2e5[0x0];if(_0x3f05a3>0x0){let _0x563c7c=_0x112855*(_0x2721c7-0x1);setTimeout($gameTemp[_0x153dbb(0x1f4)][_0x153dbb(0x217)]($gameTemp,[this],_0x3f05a3,![],![]),_0x563c7c);}_0xd4b769+=_0x112855/_0x32abff;}_0xd4b769=Math['ceil'](_0xd4b769),SceneManager[_0x153dbb(0x1de)][_0x153dbb(0x142)][_0x153dbb(0x18a)]=_0xd4b769;},Game_Unit[_0xff1982(0x183)]['setupBattleBoostPoints']=function(){const _0x476350=_0xff1982;var _0x5487d5=this[_0x476350(0x1d4)];this[_0x476350(0x1d4)]=![];for(const _0x454c56 of this['members']()){if(!_0x454c56)continue;_0x454c56[_0x476350(0x1ea)]();}this[_0x476350(0x1d4)]=_0x5487d5;},VisuMZ[_0xff1982(0x15f)]['Game_Party_addActor']=Game_Party[_0xff1982(0x183)]['addActor'],Game_Party[_0xff1982(0x183)][_0xff1982(0x1a7)]=function(_0x46b865){const _0x37e6fe=_0xff1982;VisuMZ['BoostAction']['Game_Party_addActor']['call'](this,_0x46b865),setTimeout(VisuMZ[_0x37e6fe(0x15f)][_0x37e6fe(0x26b)][_0x37e6fe(0x217)](this),0x32);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x181)]=Game_Party[_0xff1982(0x183)][_0xff1982(0x193)],Game_Party[_0xff1982(0x183)]['removeActor']=function(_0x42598d){const _0x229114=_0xff1982;VisuMZ[_0x229114(0x15f)][_0x229114(0x181)]['call'](this,_0x42598d),setTimeout(VisuMZ['BoostAction'][_0x229114(0x26b)][_0x229114(0x217)](this),0x32);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x166)]=Game_Party[_0xff1982(0x183)][_0xff1982(0x18b)],Game_Party[_0xff1982(0x183)][_0xff1982(0x18b)]=function(){const _0x522a32=_0xff1982;VisuMZ[_0x522a32(0x15f)][_0x522a32(0x166)][_0x522a32(0x1b8)](this),setTimeout(VisuMZ[_0x522a32(0x15f)]['RefreshHelpWindowInBattle']['bind'](this),0x32);},VisuMZ[_0xff1982(0x15f)]['RefreshHelpWindowInBattle']=function(){const _0x4097f8=_0xff1982;if(!SceneManager['isSceneBattle']())return;const _0x428d39=SceneManager[_0x4097f8(0x1de)][_0x4097f8(0x1e8)];if(!_0x428d39)return;_0x428d39['setBoostSubject'](BattleManager[_0x4097f8(0x1e9)]()),_0x428d39[_0x4097f8(0x1f2)]();},VisuMZ['BoostAction'][_0xff1982(0x257)]=Scene_Battle[_0xff1982(0x183)][_0xff1982(0x216)],Scene_Battle[_0xff1982(0x183)]['createActorCommandWindow']=function(){const _0x1ca9fc=_0xff1982;VisuMZ[_0x1ca9fc(0x15f)][_0x1ca9fc(0x257)][_0x1ca9fc(0x1b8)](this),this[_0x1ca9fc(0x1ff)][_0x1ca9fc(0x24a)](_0x1ca9fc(0x1b9),this[_0x1ca9fc(0x1bf)]['bind'](this)),this['_actorCommandWindow'][_0x1ca9fc(0x24a)](_0x1ca9fc(0x139),this[_0x1ca9fc(0x248)][_0x1ca9fc(0x217)](this));},Scene_Battle['prototype'][_0xff1982(0x1bf)]=function(_0x3dc061){const _0x3e1550=_0xff1982;BattleManager['actor']()['gainStoredBoostPoints'](-0x1),BattleManager[_0x3e1550(0x1e9)]()[_0x3e1550(0x24d)](0x1),BattleManager[_0x3e1550(0x1e9)]()['startChangeBoostPointsAnimation'](),this['startRepeatBoostAnimation'](),this[_0x3e1550(0x1e8)][_0x3e1550(0x1f2)](),!_0x3dc061&&this['_actorCommandWindow'][_0x3e1550(0x210)](),this[_0x3e1550(0x1ff)]['refresh']();},Scene_Battle[_0xff1982(0x183)][_0xff1982(0x248)]=function(_0x5d6885){const _0x3889d2=_0xff1982;BattleManager[_0x3889d2(0x1e9)]()[_0x3889d2(0x24d)](-0x1),BattleManager[_0x3889d2(0x1e9)]()[_0x3889d2(0x1f9)](0x1),BattleManager[_0x3889d2(0x1e9)]()['startChangeBoostPointsAnimation'](),this['startRepeatBoostAnimation'](),this['_helpWindow'][_0x3889d2(0x1f2)](),!_0x5d6885&&this[_0x3889d2(0x1ff)][_0x3889d2(0x210)](),this[_0x3889d2(0x1ff)][_0x3889d2(0x1f2)]();},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1c5)]=Scene_Battle[_0xff1982(0x183)][_0xff1982(0x15a)],Scene_Battle[_0xff1982(0x183)][_0xff1982(0x15a)]=function(){const _0x392e6a=_0xff1982;this[_0x392e6a(0x1e8)]&&(this[_0x392e6a(0x1e8)]['clearBoostSubject'](),this['clearRepeatBoostAnimation']()),VisuMZ[_0x392e6a(0x15f)][_0x392e6a(0x1c5)][_0x392e6a(0x1b8)](this);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1ef)]=Scene_Battle[_0xff1982(0x183)][_0xff1982(0x15d)],Scene_Battle['prototype']['startActorCommandSelection']=function(){const _0x5b3766=_0xff1982;VisuMZ[_0x5b3766(0x15f)]['Scene_Battle_startActorCommandSelection']['call'](this),this[_0x5b3766(0x1e8)]&&(this[_0x5b3766(0x1e8)][_0x5b3766(0x22a)](BattleManager['actor']()),this[_0x5b3766(0x1d5)]());},VisuMZ['BoostAction'][_0xff1982(0x241)]=Scene_Battle['prototype'][_0xff1982(0x13b)],Scene_Battle[_0xff1982(0x183)]['update']=function(){const _0x9ac07c=_0xff1982;VisuMZ[_0x9ac07c(0x15f)][_0x9ac07c(0x241)]['call'](this),this['updateRepeatBoostAnimation']();},Scene_Battle[_0xff1982(0x183)][_0xff1982(0x162)]=function(){const _0x4a4448=_0xff1982;return this['_repeatBoostAnimationTimer']===undefined&&this[_0x4a4448(0x1d5)](),VisuMZ[_0x4a4448(0x15f)][_0x4a4448(0x265)]['Mechanics'][_0x4a4448(0x14f)]??![];},Scene_Battle['prototype'][_0xff1982(0x1d5)]=function(){const _0x472e2f=_0xff1982;this[_0x472e2f(0x13f)]=-0x1;},Scene_Battle[_0xff1982(0x183)][_0xff1982(0x23d)]=function(){const _0x268ea0=_0xff1982,_0x2c4154=BattleManager[_0x268ea0(0x1e9)]()[_0x268ea0(0x264)]();this[_0x268ea0(0x13f)]=_0x2c4154>0x0?VisuMZ['BoostAction'][_0x268ea0(0x265)][_0x268ea0(0x238)][_0x268ea0(0x204)]||0x1:-0x1;},Scene_Battle['prototype']['updateRepeatBoostAnimation']=function(){const _0x56d3d3=_0xff1982;if(!this['isUsingRepeatBoostAnimation']())return;if(this['_repeatBoostAnimationTimer']<=0x0)return;this[_0x56d3d3(0x13f)]--,this['_repeatBoostAnimationTimer']<=0x0&&BattleManager[_0x56d3d3(0x1e9)]()&&(BattleManager[_0x56d3d3(0x1e9)]()[_0x56d3d3(0x157)](!![]),BattleManager['actor']()[_0x56d3d3(0x264)]()>0x0&&this[_0x56d3d3(0x23d)]());};function Sprite_BoostContainer(){const _0x5b0765=_0xff1982;this[_0x5b0765(0x20f)](...arguments);}function _0x5ac2(_0x41a363,_0x199e45){const _0x5ee568=_0x5ee5();return _0x5ac2=function(_0x5ac2bf,_0x3f1b10){_0x5ac2bf=_0x5ac2bf-0x136;let _0x1d09de=_0x5ee568[_0x5ac2bf];return _0x1d09de;},_0x5ac2(_0x41a363,_0x199e45);}Sprite_BoostContainer[_0xff1982(0x183)]=Object[_0xff1982(0x1cc)](Sprite[_0xff1982(0x183)]),Sprite_BoostContainer[_0xff1982(0x183)][_0xff1982(0x24e)]=Sprite_BoostContainer,Sprite_BoostContainer[_0xff1982(0x191)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI'][_0xff1982(0x19f)],Sprite_BoostContainer[_0xff1982(0x183)][_0xff1982(0x20f)]=function(){const _0x1542d3=_0xff1982;Sprite['prototype'][_0x1542d3(0x20f)][_0x1542d3(0x1b8)](this),this[_0x1542d3(0x194)](),this[_0x1542d3(0x200)]();},Sprite_BoostContainer['prototype']['initMembers']=function(){const _0x1933cb=_0xff1982;this[_0x1933cb(0x187)]['x']=Sprite_BoostContainer[_0x1933cb(0x191)],this[_0x1933cb(0x187)]['y']=Sprite_BoostContainer[_0x1933cb(0x191)];},Sprite_BoostContainer['prototype'][_0xff1982(0x200)]=function(){const _0x14cf42=_0xff1982;this[_0x14cf42(0x19e)]=[];for(let _0x5752d8=0x1;_0x5752d8<=Game_BattlerBase[_0x14cf42(0x21a)];_0x5752d8++){const _0x50ab4e=new Sprite_BoostIcon(_0x5752d8);this[_0x14cf42(0x19b)](_0x50ab4e),this['_icons']['push'](_0x50ab4e);}},Sprite_BoostContainer[_0xff1982(0x183)][_0xff1982(0x136)]=function(_0x30a43f){const _0x551220=_0xff1982;if(!this[_0x551220(0x19e)])return;for(const _0x590cfc of this[_0x551220(0x19e)]){_0x590cfc[_0x551220(0x136)](_0x30a43f);}};function Sprite_BoostIcon(){const _0x5299ab=_0xff1982;this[_0x5299ab(0x20f)](...arguments);}Sprite_BoostIcon[_0xff1982(0x183)]=Object[_0xff1982(0x1cc)](Sprite['prototype']),Sprite_BoostIcon[_0xff1982(0x183)][_0xff1982(0x24e)]=Sprite_BoostIcon,Sprite_BoostIcon[_0xff1982(0x183)][_0xff1982(0x20f)]=function(_0x1bb918){const _0x3ac609=_0xff1982;this[_0x3ac609(0x15c)]=_0x1bb918,Sprite[_0x3ac609(0x183)][_0x3ac609(0x20f)]['call'](this),this[_0x3ac609(0x194)](),this[_0x3ac609(0x246)]();},Sprite_BoostIcon[_0xff1982(0x183)][_0xff1982(0x194)]=function(){const _0x1c2e46=_0xff1982;this[_0x1c2e46(0x17d)]=ImageManager[_0x1c2e46(0x21f)],this['x']=ImageManager[_0x1c2e46(0x23c)]*(this['_slot']-0x1);},Sprite_BoostIcon[_0xff1982(0x183)]['loadBitmap']=function(){const _0x18419d=_0xff1982;this[_0x18419d(0x26d)]=ImageManager[_0x18419d(0x1ac)](),this[_0x18419d(0x261)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon['prototype'][_0xff1982(0x136)]=function(_0x2f9b04){const _0x4e6c0a=_0xff1982;this[_0x4e6c0a(0x22c)]!==_0x2f9b04&&(this['_battler']=_0x2f9b04);},Sprite_BoostIcon[_0xff1982(0x183)][_0xff1982(0x13b)]=function(){const _0x46a56d=_0xff1982;Sprite[_0x46a56d(0x183)][_0x46a56d(0x13b)][_0x46a56d(0x1b8)](this),this['updateIcon'](),this[_0x46a56d(0x205)]();},Sprite_BoostIcon['prototype']['updateIcon']=function(){const _0x1a14e6=_0xff1982;if(this['_battler']){let _0x101c12=this['_battler'][_0x1a14e6(0x240)]();_0x101c12>=this[_0x1a14e6(0x15c)]?this['_iconIndex']=ImageManager[_0x1a14e6(0x1fc)]:this[_0x1a14e6(0x17d)]=ImageManager[_0x1a14e6(0x21f)];}else this[_0x1a14e6(0x17d)]=0x0;},Sprite_BoostIcon[_0xff1982(0x183)][_0xff1982(0x205)]=function(){const _0x2dd914=_0xff1982,_0xc04de=ImageManager[_0x2dd914(0x23c)],_0x3bcf6b=ImageManager[_0x2dd914(0x1d1)],_0x4fcc36=this[_0x2dd914(0x17d)]%0x10*_0xc04de,_0x1a361e=Math[_0x2dd914(0x13c)](this[_0x2dd914(0x17d)]/0x10)*_0x3bcf6b;this[_0x2dd914(0x261)](_0x4fcc36,_0x1a361e,_0xc04de,_0x3bcf6b);},VisuMZ[_0xff1982(0x15f)]['Window_Base_convertEscapeCharacters']=Window_Base[_0xff1982(0x183)][_0xff1982(0x222)],Window_Base[_0xff1982(0x183)][_0xff1982(0x222)]=function(_0x3e2f58){const _0x70dbbd=_0xff1982;return _0x3e2f58=VisuMZ['BoostAction'][_0x70dbbd(0x249)][_0x70dbbd(0x1b8)](this,_0x3e2f58),!Imported[_0x70dbbd(0x226)]&&(_0x3e2f58=this['convertBoostEscapeCharacters'](_0x3e2f58)),_0x3e2f58;},VisuMZ[_0xff1982(0x15f)]['Window_Base_postConvertEscapeCharacters']=Window_Base[_0xff1982(0x183)][_0xff1982(0x1a1)],Window_Base['prototype'][_0xff1982(0x1a1)]=function(_0x4d49d2){const _0x1a9495=_0xff1982;return _0x4d49d2=VisuMZ[_0x1a9495(0x15f)][_0x1a9495(0x167)][_0x1a9495(0x1b8)](this,_0x4d49d2),_0x4d49d2=this[_0x1a9495(0x218)](_0x4d49d2),_0x4d49d2;},Window_Base[_0xff1982(0x183)][_0xff1982(0x178)]=function(){const _0x2e5ecc=_0xff1982;if(!!this['_bpSubject'])return;if($gameParty[_0x2e5ecc(0x202)]())this[_0x2e5ecc(0x18e)]=BattleManager['actor']()||BattleManager[_0x2e5ecc(0x253)];else{const _0x3a5801=SceneManager[_0x2e5ecc(0x1de)];this[_0x2e5ecc(0x18e)]=_0x3a5801[_0x2e5ecc(0x18d)];}},Window_Base[_0xff1982(0x183)]['convertBoostEscapeCharacters']=function(_0x334257){const _0x260d61=_0xff1982;return _0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x1e046c=_0x260d61;return this[_0x1e046c(0x232)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x283b14=_0x260d61;return this[_0x283b14(0x232)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x13046b=_0x260d61;return this[_0x13046b(0x16b)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){return this['convertBoostTurnEscape'](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){const _0x499796=_0x260d61;return this[_0x499796(0x1c8)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x247978=_0x260d61;return this[_0x247978(0x1c8)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x3b5bcb=_0x260d61;return this[_0x3b5bcb(0x1c8)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x21488e=_0x260d61;return this[_0x21488e(0x1b1)](parseInt(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x31d3f6=_0x260d61;return this[_0x31d3f6(0x1b3)](parseInt(arguments[0x1]));}['bind'](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x257639=_0x260d61;return this[_0x257639(0x1fd)](String(arguments[0x1]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0xfaaf32=_0x260d61;return this[_0xfaaf32(0x21b)](String(arguments[0x1]));}['bind'](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x1025e4=_0x260d61;return this[_0x1025e4(0x14a)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x2e8a66=_0x260d61;return this[_0x2e8a66(0x14a)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostLessEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257[_0x260d61(0x189)](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x266784=_0x260d61;return this[_0x266784(0x1ba)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x3d2327=_0x260d61;return this[_0x3d2327(0x1b2)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257=_0x334257['replace'](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){return this['convertBoostGreaterEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x260d61(0x217)](this)),_0x334257;},Window_Base[_0xff1982(0x183)][_0xff1982(0x232)]=function(_0x5eb8a5){const _0x8acf5e=_0xff1982;if(!!this[_0x8acf5e(0x18e)]){var _0x9fa54c=this['_bpSubject']['boostMultiplier'](_0x8acf5e(0x1dd));_0x5eb8a5=Math['round'](_0x5eb8a5*_0x9fa54c),_0x5eb8a5+=this[_0x8acf5e(0x18e)][_0x8acf5e(0x155)](_0x8acf5e(0x1dd));}return _0x5eb8a5;},Window_Base[_0xff1982(0x183)][_0xff1982(0x16b)]=function(_0x7b101e){const _0x4d5859=_0xff1982;if(!!this[_0x4d5859(0x18e)]){var _0x11518e=this[_0x4d5859(0x18e)]['boostMultiplier']('Turn');_0x7b101e=Math['round'](_0x7b101e*_0x11518e),_0x7b101e+=this[_0x4d5859(0x18e)]['boostAddition'](_0x4d5859(0x14e));}return _0x7b101e;},Window_Base[_0xff1982(0x183)][_0xff1982(0x1c8)]=function(_0xfcdec1){const _0x10b0bc=_0xff1982;if(!!this[_0x10b0bc(0x18e)]){var _0x4332f4=this[_0x10b0bc(0x18e)][_0x10b0bc(0x172)](_0x10b0bc(0x19a));_0xfcdec1=Math['round'](_0xfcdec1*_0x4332f4),_0xfcdec1+=this[_0x10b0bc(0x18e)][_0x10b0bc(0x155)]('Repeat');}return _0xfcdec1;},Window_Base['prototype']['convertBoostAnalyzeEscape']=function(_0x456048){const _0x3fb145=_0xff1982;if(!!this[_0x3fb145(0x18e)]){var _0x12338a=this[_0x3fb145(0x18e)][_0x3fb145(0x172)](_0x3fb145(0x156));_0x456048=Math[_0x3fb145(0x22d)](_0x456048*_0x12338a),_0x456048+=this[_0x3fb145(0x18e)][_0x3fb145(0x155)]('Analyze');}return _0x456048;},Window_Base[_0xff1982(0x183)][_0xff1982(0x1b3)]=function(_0x49adea){const _0x3ab10a=_0xff1982;if(!!this[_0x3ab10a(0x18e)]){var _0x159796=this[_0x3ab10a(0x18e)][_0x3ab10a(0x172)](_0x3ab10a(0x24f));_0x49adea=Math[_0x3ab10a(0x22d)](_0x49adea*_0x159796),_0x49adea+=this[_0x3ab10a(0x18e)]['boostAddition'](_0x3ab10a(0x24f));}return _0x49adea;},Window_Base[_0xff1982(0x183)][_0xff1982(0x1fd)]=function(_0x56f01a){const _0x1049b5=_0xff1982;return!!this[_0x1049b5(0x18e)]&&this['_bpSubject'][_0x1049b5(0x264)]()>0x0?_0x56f01a:'';},Window_Base['prototype'][_0xff1982(0x21b)]=function(_0xa55a29){const _0x58aca9=_0xff1982;return!this['_bpSubject']||this[_0x58aca9(0x18e)]['toUseBoostPoints']()<=0x0?_0xa55a29:'';},Window_Base[_0xff1982(0x183)][_0xff1982(0x14a)]=function(_0x4d547b,_0x22c10c){const _0x36bd63=_0xff1982;this[_0x36bd63(0x178)]();if(!!this[_0x36bd63(0x18e)]&&this[_0x36bd63(0x18e)][_0x36bd63(0x264)]()===_0x4d547b)return _0x22c10c;else return _0x4d547b===0x0?_0x22c10c:'';},Window_Base[_0xff1982(0x183)][_0xff1982(0x1ce)]=function(_0x4a7c5b,_0x18004d){const _0x9e40b8=_0xff1982;return this[_0x9e40b8(0x178)](),!!this[_0x9e40b8(0x18e)]&&this[_0x9e40b8(0x18e)][_0x9e40b8(0x264)]()<=_0x4a7c5b?_0x18004d:'';},Window_Base['prototype']['convertBoostLessEscape']=function(_0x2c3979,_0x45a276){const _0x2f52a5=_0xff1982;return this[_0x2f52a5(0x178)](),!!this[_0x2f52a5(0x18e)]&&this['_bpSubject'][_0x2f52a5(0x264)]()<_0x2c3979?_0x45a276:'';},Window_Base[_0xff1982(0x183)][_0xff1982(0x1b2)]=function(_0x20d65a,_0xfaeb3){const _0x19c165=_0xff1982;return this[_0x19c165(0x178)](),!!this[_0x19c165(0x18e)]&&this[_0x19c165(0x18e)][_0x19c165(0x264)]()>=_0x20d65a?_0xfaeb3:'';},Window_Base['prototype'][_0xff1982(0x221)]=function(_0x4e3c2d,_0x4e2f95){const _0x5982e1=_0xff1982;return this['createFallbackBoostSubject'](),!!this[_0x5982e1(0x18e)]&&this[_0x5982e1(0x18e)][_0x5982e1(0x264)]()>_0x4e3c2d?_0x4e2f95:'';},Window_Selectable['BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN']=VisuMZ[_0xff1982(0x15f)]['Settings']['UI'][_0xff1982(0x151)],Window_Selectable[_0xff1982(0x26e)]=VisuMZ['BoostAction'][_0xff1982(0x265)]['UI'][_0xff1982(0x1b0)],Window_Selectable[_0xff1982(0x183)][_0xff1982(0x1f7)]=function(){const _0x1cc208=_0xff1982,_0x133fc9=this['constructor'][_0x1cc208(0x16f)];return Window_Selectable[_0x1cc208(0x26e)][_0x1cc208(0x1ee)](_0x133fc9)?![]:!![];},Window_Selectable[_0xff1982(0x183)]['meetsBoostShortcutRequirements']=function(){const _0x60edd0=_0xff1982;if(!SceneManager['isSceneBattle']())return![];if(!Window_Selectable[_0x60edd0(0x1e4)])return![];if(!BattleManager[_0x60edd0(0x184)]())return![];return this[_0x60edd0(0x1f7)]();},VisuMZ['BoostAction']['Window_Selectable_cursorPagedown']=Window_Selectable[_0xff1982(0x183)]['cursorPagedown'],Window_Selectable['prototype'][_0xff1982(0x262)]=function(){const _0x36d726=_0xff1982;if(this[_0x36d726(0x206)]()){const _0x10b2f2=BattleManager[_0x36d726(0x1e9)]();_0x10b2f2&&_0x10b2f2[_0x36d726(0x186)]()&&(SceneManager[_0x36d726(0x1de)][_0x36d726(0x1bf)](!![]),this[_0x36d726(0x1f2)](),this[_0x36d726(0x1c7)]()),Input[_0x36d726(0x23f)]();}else VisuMZ[_0x36d726(0x15f)][_0x36d726(0x24c)]['call'](this);},VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1eb)]=Window_Selectable['prototype'][_0xff1982(0x13d)],Window_Selectable[_0xff1982(0x183)][_0xff1982(0x13d)]=function(){const _0x1e9f6a=_0xff1982;if(this[_0x1e9f6a(0x206)]()){const _0x4e0932=BattleManager[_0x1e9f6a(0x1e9)]();_0x4e0932&&_0x4e0932[_0x1e9f6a(0x1a3)]()&&(SceneManager[_0x1e9f6a(0x1de)][_0x1e9f6a(0x248)](!![]),this[_0x1e9f6a(0x1f2)](),this[_0x1e9f6a(0x1c7)]()),Input[_0x1e9f6a(0x23f)]();}else VisuMZ[_0x1e9f6a(0x15f)]['Window_Selectable_cursorPageup'][_0x1e9f6a(0x1b8)](this);},Window_Help[_0xff1982(0x183)][_0xff1982(0x22a)]=function(_0x9cfca8){this['_bpSubject']=_0x9cfca8;},Window_Help[_0xff1982(0x183)][_0xff1982(0x1b5)]=function(){const _0x1f0724=_0xff1982;this[_0x1f0724(0x18e)]=undefined;},Window_StatusBase[_0xff1982(0x183)][_0xff1982(0x27c)]=function(){const _0x4b2393=_0xff1982;return BattleManager[_0x4b2393(0x184)]();},Window_StatusBase[_0xff1982(0x183)]['placeBoostPoints']=function(_0x2cc7b1,_0x8211c2,_0xa3d996){const _0x9eaf16=_0xff1982;if(!this[_0x9eaf16(0x27c)]())return;const _0x51ebae=_0x9eaf16(0x272)[_0x9eaf16(0x1bd)](_0x2cc7b1[_0x9eaf16(0x274)]()),_0x193b28=this[_0x9eaf16(0x223)](_0x51ebae,Sprite_BoostContainer);_0x193b28[_0x9eaf16(0x136)](_0x2cc7b1),_0x193b28[_0x9eaf16(0x27f)](_0x8211c2,_0xa3d996),_0x193b28[_0x9eaf16(0x20a)]();},Window_ActorCommand[_0xff1982(0x1e7)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI'][_0xff1982(0x1ed)],Window_ActorCommand['UNBOOST_ACTION_SHOW']=VisuMZ[_0xff1982(0x15f)]['Settings']['UI'][_0xff1982(0x215)],VisuMZ[_0xff1982(0x15f)]['Window_ActorCommand_addGuardCommand']=Window_ActorCommand['prototype']['addGuardCommand'],Window_ActorCommand[_0xff1982(0x183)]['addGuardCommand']=function(){const _0x415acd=_0xff1982;BattleManager[_0x415acd(0x184)]()&&(this['addBoostCommand'](),this[_0x415acd(0x198)]()),VisuMZ['BoostAction'][_0x415acd(0x192)][_0x415acd(0x1b8)](this);},Window_ActorCommand['prototype']['addBoostCommand']=function(){const _0x14c4b4=_0xff1982;if(!Window_ActorCommand[_0x14c4b4(0x1e7)])return;const _0x32cd56=this[_0x14c4b4(0x207)](),_0x35c62c=TextManager[_0x14c4b4(0x258)],_0x624584=ImageManager[_0x14c4b4(0x1fc)],_0x2ad850=_0x32cd56===_0x14c4b4(0x1ad)?_0x35c62c:'\x5cI[%1]%2'[_0x14c4b4(0x1bd)](_0x624584,_0x35c62c);var _0x5a6ed9=this[_0x14c4b4(0x18d)][_0x14c4b4(0x186)]();this[_0x14c4b4(0x269)](_0x2ad850,'boost',_0x5a6ed9);},Window_ActorCommand[_0xff1982(0x183)]['addUnboostCommand']=function(){const _0x482887=_0xff1982;if(!Window_ActorCommand['UNBOOST_ACTION_SHOW'])return;const _0x41d301=this[_0x482887(0x207)](),_0x5d903d=TextManager[_0x482887(0x25a)],_0x189eb0=ImageManager[_0x482887(0x21f)],_0x4a8fd5=_0x41d301===_0x482887(0x1ad)?_0x5d903d:'\x5cI[%1]%2'[_0x482887(0x1bd)](_0x189eb0,_0x5d903d);var _0x52b26e=this[_0x482887(0x18d)][_0x482887(0x1a3)]();this[_0x482887(0x269)](_0x4a8fd5,'unboost',_0x52b26e);},Window_ActorCommand[_0xff1982(0x183)][_0xff1982(0x220)]=function(){const _0x5993f8=_0xff1982;this[_0x5993f8(0x229)]()!==_0x5993f8(0x1b9)&&this['currentSymbol']()!=='unboost'&&Window_Selectable[_0x5993f8(0x183)]['playOkSound'][_0x5993f8(0x1b8)](this);},Window_BattleStatus['BOOST_POINTS_DISPLAY_BATTLE_STATUS']=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI']['BattleStatusShow'],Window_BattleStatus[_0xff1982(0x1fb)]=VisuMZ['BoostAction'][_0xff1982(0x265)]['UI'][_0xff1982(0x244)],Window_BattleStatus[_0xff1982(0x25f)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI'][_0xff1982(0x254)],Window_BattleStatus[_0xff1982(0x163)]=VisuMZ[_0xff1982(0x15f)][_0xff1982(0x265)]['UI'][_0xff1982(0x1ae)],VisuMZ[_0xff1982(0x15f)][_0xff1982(0x1b7)]=Window_BattleStatus['prototype'][_0xff1982(0x245)],Window_BattleStatus[_0xff1982(0x183)]['drawItemStatus']=function(_0x43575e){const _0x58f99f=_0xff1982;VisuMZ[_0x58f99f(0x15f)][_0x58f99f(0x1b7)][_0x58f99f(0x1b8)](this,_0x43575e),this['drawItemStatusBoostPoints'](_0x43575e);},Window_BattleStatus[_0xff1982(0x183)][_0xff1982(0x153)]=function(_0x290e20){const _0x42822a=_0xff1982;if(!Window_BattleStatus[_0x42822a(0x196)])return;const _0x5bdbcb=this['actor'](_0x290e20);if(!_0x5bdbcb)return;!Window_BattleStatus['BOOST_POINTS_DISPLAY_AUTO_POS']?this['drawItemStatusBoostPointsDefault'](_0x290e20):this[_0x42822a(0x243)](_0x290e20);},Window_BattleStatus['prototype'][_0xff1982(0x233)]=function(_0x573c2c){const _0x19520b=_0xff1982,_0x4b478a=this[_0x19520b(0x1e9)](_0x573c2c),_0x58b3b7=this[_0x19520b(0x17b)](_0x573c2c);let _0x54651b=_0x58b3b7['x']-0x4+Window_BattleStatus[_0x19520b(0x25f)],_0x4c6870=_0x58b3b7['y']+0x4+Window_BattleStatus[_0x19520b(0x163)];this[_0x19520b(0x27a)](_0x4b478a,_0x54651b,_0x4c6870);},Window_BattleStatus['prototype'][_0xff1982(0x243)]=function(_0x46efba){const _0x10d17c=_0xff1982,_0x3b206f=this[_0x10d17c(0x1e9)](_0x46efba),_0x560464=this[_0x10d17c(0x145)](_0x46efba),_0x547153=Math[_0x10d17c(0x1d2)](ImageManager[_0x10d17c(0x23c)]*Game_BattlerBase[_0x10d17c(0x21a)]*Sprite_BoostContainer['ICON_SIZE_RATE']),_0x2ae40c=Math[_0x10d17c(0x1d2)](ImageManager[_0x10d17c(0x1d1)]*Sprite_BoostContainer[_0x10d17c(0x191)]);let _0x2a08d8=_0x560464['x']+0x4,_0x2d3952=_0x560464['y']+0x4;const _0x28f480=this[_0x10d17c(0x270)]();switch(_0x28f480){case'list':VisuMZ[_0x10d17c(0x1e1)][_0x10d17c(0x265)]['BattleLayout']['ShowFacesListStyle']?_0x2a08d8+=ImageManager['faceWidth']+0x8:_0x2a08d8+=ImageManager[_0x10d17c(0x23c)]+0x8;_0x2a08d8+=0x88,_0x2a08d8+=0x88*0x2;$dataSystem['optDisplayTp']&&(_0x2a08d8+=0x88);_0x2d3952+=Math[_0x10d17c(0x1f6)](0x0,Math[_0x10d17c(0x22d)]((this[_0x10d17c(0x17c)]()-_0x2ae40c)/0x2));break;case'xp':case _0x10d17c(0x16c):case _0x10d17c(0x199):_0x2a08d8=Math[_0x10d17c(0x22d)](_0x560464['x']+(_0x560464['width']-_0x547153)/0x2);break;case _0x10d17c(0x1ab):_0x2a08d8=Math[_0x10d17c(0x22d)](_0x560464['x']+(_0x560464['width']-_0x547153)/0x2);const _0x41ab5d=$dataSystem['optDisplayTp']?0x4:0x3;_0x2d3952=Math[_0x10d17c(0x22d)](_0x560464['y']+_0x560464[_0x10d17c(0x18f)]-0x4-this['lineHeight']()*_0x41ab5d);break;}_0x2a08d8+=Window_BattleStatus[_0x10d17c(0x25f)],_0x2d3952+=Window_BattleStatus[_0x10d17c(0x163)],this[_0x10d17c(0x27a)](_0x3b206f,_0x2a08d8,_0x2d3952);};