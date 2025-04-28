//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.16: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.15: August 29, 2024
 * * Feature Update!
 * ** Added failsafes for Bad JavaScript TP Formulas to prevent them from
 *    becoming NaN values, undefined values, or null values. Bad values will
 *    default to 0 and an error message will appear telling which actor, mode,
 *    and key's formula has bad code. Update made by Arisu.
 * 
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
 * 
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x4bbd7b=_0x17ac;function _0x17ac(_0x4755ee,_0x385b9e){const _0x396756=_0x3967();return _0x17ac=function(_0x17ac24,_0x15a78b){_0x17ac24=_0x17ac24-0x106;let _0x4e17a4=_0x396756[_0x17ac24];return _0x4e17a4;},_0x17ac(_0x4755ee,_0x385b9e);}(function(_0x2c1fe6,_0x2db6e4){const _0x1e34f1=_0x17ac,_0x1df9bf=_0x2c1fe6();while(!![]){try{const _0x508b7d=-parseInt(_0x1e34f1(0x1c7))/0x1+parseInt(_0x1e34f1(0x1d6))/0x2*(parseInt(_0x1e34f1(0x1b3))/0x3)+-parseInt(_0x1e34f1(0x133))/0x4+-parseInt(_0x1e34f1(0x18a))/0x5*(parseInt(_0x1e34f1(0x187))/0x6)+parseInt(_0x1e34f1(0x1dd))/0x7*(parseInt(_0x1e34f1(0x16a))/0x8)+parseInt(_0x1e34f1(0x1f2))/0x9*(-parseInt(_0x1e34f1(0x188))/0xa)+parseInt(_0x1e34f1(0x1b7))/0xb;if(_0x508b7d===_0x2db6e4)break;else _0x1df9bf['push'](_0x1df9bf['shift']());}catch(_0x21f0dc){_0x1df9bf['push'](_0x1df9bf['shift']());}}}(_0x3967,0xa1c69));var label=_0x4bbd7b(0x145),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x339644){const _0x338a6b=_0x4bbd7b;return _0x339644[_0x338a6b(0x1ea)]&&_0x339644[_0x338a6b(0x15f)][_0x338a6b(0x230)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x4bbd7b(0x1c4)]=function(_0x47305e,_0x4962d1){const _0x4fa99e=_0x4bbd7b;for(const _0x5e030c in _0x4962d1){if(_0x5e030c[_0x4fa99e(0x186)](/(.*):(.*)/i)){const _0x48d298=String(RegExp['$1']),_0x458e9f=String(RegExp['$2'])[_0x4fa99e(0x184)]()[_0x4fa99e(0x192)]();let _0x30d3d6,_0x248650,_0x26ac21;switch(_0x458e9f){case _0x4fa99e(0x106):_0x30d3d6=_0x4962d1[_0x5e030c]!==''?Number(_0x4962d1[_0x5e030c]):0x0;break;case _0x4fa99e(0x214):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON[_0x4fa99e(0x20d)](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650[_0x4fa99e(0x235)](_0x3cd2dd=>Number(_0x3cd2dd));break;case'EVAL':_0x30d3d6=_0x4962d1[_0x5e030c]!==''?eval(_0x4962d1[_0x5e030c]):null;break;case _0x4fa99e(0x113):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON['parse'](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650[_0x4fa99e(0x235)](_0xee1001=>eval(_0xee1001));break;case _0x4fa99e(0x1aa):_0x30d3d6=_0x4962d1[_0x5e030c]!==''?JSON['parse'](_0x4962d1[_0x5e030c]):'';break;case _0x4fa99e(0x124):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON[_0x4fa99e(0x20d)](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650[_0x4fa99e(0x235)](_0x29831e=>JSON['parse'](_0x29831e));break;case'FUNC':_0x30d3d6=_0x4962d1[_0x5e030c]!==''?new Function(JSON[_0x4fa99e(0x20d)](_0x4962d1[_0x5e030c])):new Function(_0x4fa99e(0x24f));break;case _0x4fa99e(0x1f0):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON['parse'](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650['map'](_0x2f889b=>new Function(JSON[_0x4fa99e(0x20d)](_0x2f889b)));break;case _0x4fa99e(0x1d4):_0x30d3d6=_0x4962d1[_0x5e030c]!==''?String(_0x4962d1[_0x5e030c]):'';break;case _0x4fa99e(0x182):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON[_0x4fa99e(0x20d)](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650[_0x4fa99e(0x235)](_0x20b40e=>String(_0x20b40e));break;case'STRUCT':_0x26ac21=_0x4962d1[_0x5e030c]!==''?JSON[_0x4fa99e(0x20d)](_0x4962d1[_0x5e030c]):{},_0x30d3d6=VisuMZ[_0x4fa99e(0x1c4)]({},_0x26ac21);break;case _0x4fa99e(0x246):_0x248650=_0x4962d1[_0x5e030c]!==''?JSON['parse'](_0x4962d1[_0x5e030c]):[],_0x30d3d6=_0x248650[_0x4fa99e(0x235)](_0x99e1c2=>VisuMZ[_0x4fa99e(0x1c4)]({},JSON[_0x4fa99e(0x20d)](_0x99e1c2)));break;default:continue;}_0x47305e[_0x48d298]=_0x30d3d6;}}return _0x47305e;},(_0x21d469=>{const _0x1545ed=_0x4bbd7b,_0x19a023=_0x21d469['name'];for(const _0x54d435 of dependencies){if(!Imported[_0x54d435]){alert(_0x1545ed(0x189)[_0x1545ed(0x117)](_0x19a023,_0x54d435)),SceneManager[_0x1545ed(0x1e5)]();break;}}const _0x412097=_0x21d469[_0x1545ed(0x15f)];if(_0x412097['match'](/\[Version[ ](.*?)\]/i)){const _0x4cc92a=Number(RegExp['$1']);_0x4cc92a!==VisuMZ[label][_0x1545ed(0x1a1)]&&(alert(_0x1545ed(0x144)[_0x1545ed(0x117)](_0x19a023,_0x4cc92a)),SceneManager[_0x1545ed(0x1e5)]());}if(_0x412097[_0x1545ed(0x186)](/\[Tier[ ](\d+)\]/i)){const _0x1f35e8=Number(RegExp['$1']);_0x1f35e8<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1545ed(0x117)](_0x19a023,_0x1f35e8,tier)),SceneManager[_0x1545ed(0x1e5)]()):tier=Math[_0x1545ed(0x1b5)](_0x1f35e8,tier);}VisuMZ[_0x1545ed(0x1c4)](VisuMZ[label][_0x1545ed(0x180)],_0x21d469[_0x1545ed(0x1fe)]);})(pluginData),PluginManager[_0x4bbd7b(0x18b)](pluginData[_0x4bbd7b(0x11d)],_0x4bbd7b(0x185),_0x4b1c85=>{const _0x10fb63=_0x4bbd7b;VisuMZ['ConvertParams'](_0x4b1c85,_0x4b1c85);const _0x296026=_0x4b1c85['Actors'][_0x10fb63(0x235)](_0x121d43=>$gameActors['actor'](_0x121d43))[_0x10fb63(0x1bd)](null),_0x2bbf51=_0x4b1c85[_0x10fb63(0x1de)];for(const _0x471a38 of _0x296026){if(!_0x471a38)continue;_0x471a38[_0x10fb63(0x1a0)](_0x2bbf51);}}),PluginManager[_0x4bbd7b(0x18b)](pluginData[_0x4bbd7b(0x11d)],'ActorUnlockTPMode',_0x3d200d=>{const _0x4ee0bd=_0x4bbd7b;VisuMZ[_0x4ee0bd(0x1c4)](_0x3d200d,_0x3d200d);const _0x3c708b=_0x3d200d[_0x4ee0bd(0x130)][_0x4ee0bd(0x235)](_0x598ea5=>$gameActors[_0x4ee0bd(0x1fc)](_0x598ea5))['remove'](null),_0x46b3e2=_0x3d200d['TPModes'];for(const _0x551142 of _0x3c708b){if(!_0x551142)continue;for(const _0x539f19 of _0x46b3e2){_0x551142['learnTpMode'](_0x539f19);}}}),PluginManager[_0x4bbd7b(0x18b)](pluginData['name'],_0x4bbd7b(0x178),_0x598b92=>{const _0x2bde85=_0x4bbd7b;VisuMZ[_0x2bde85(0x1c4)](_0x598b92,_0x598b92);const _0x39ba00=_0x598b92['Actors'][_0x2bde85(0x235)](_0x30c927=>$gameActors[_0x2bde85(0x1fc)](_0x30c927))[_0x2bde85(0x1bd)](null),_0x3652be=VisuMZ[_0x2bde85(0x145)][_0x2bde85(0x1a4)];for(const _0x5d2494 of _0x39ba00){if(!_0x5d2494)continue;for(const _0x57e774 of _0x3652be){_0x5d2494[_0x2bde85(0x1dc)](_0x57e774);}}}),PluginManager[_0x4bbd7b(0x18b)](pluginData[_0x4bbd7b(0x11d)],_0x4bbd7b(0x1c1),_0x423e5e=>{const _0x56fe33=_0x4bbd7b;VisuMZ[_0x56fe33(0x1c4)](_0x423e5e,_0x423e5e);const _0x2595b3=_0x423e5e['Enemies']['map'](_0x5269d8=>$gameTroop['members']()[_0x5269d8])['remove'](null),_0x633b13=_0x423e5e['TPModeName'];for(const _0x31aea7 of _0x2595b3){if(!_0x31aea7)continue;_0x31aea7['changeTpMode'](_0x633b13);}}),PluginManager[_0x4bbd7b(0x18b)](pluginData['name'],_0x4bbd7b(0x22d),_0xeed8ac=>{const _0x214745=_0x4bbd7b;VisuMZ[_0x214745(0x1c4)](_0xeed8ac,_0xeed8ac),$gameSystem[_0x214745(0x13c)](_0xeed8ac[_0x214745(0x18d)]);}),VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1ca)]=Scene_Boot[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1ba)],Scene_Boot['prototype'][_0x4bbd7b(0x1ba)]=function(){const _0x57941a=_0x4bbd7b;VisuMZ[_0x57941a(0x145)][_0x57941a(0x1ca)][_0x57941a(0x1da)](this),this['process_VisuMZ_EnhancedTP_Settings']();},Scene_Boot[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x111)]=function(){const _0x553a34=_0x4bbd7b;VisuMZ[_0x553a34(0x145)]['TpModes']={},VisuMZ['EnhancedTP'][_0x553a34(0x1a4)]=[];for(const _0x5ea708 of VisuMZ[_0x553a34(0x145)][_0x553a34(0x180)][_0x553a34(0x127)]){if(!_0x5ea708)continue;_0x5ea708['description']=_0x5ea708[_0x553a34(0x1e9)]['format'](TextManager['tp']),this[_0x553a34(0x174)](_0x5ea708);const _0x51c4a7=_0x5ea708[_0x553a34(0x155)][_0x553a34(0x184)]()[_0x553a34(0x192)]();VisuMZ[_0x553a34(0x145)][_0x553a34(0x1c3)][_0x51c4a7]=_0x5ea708,VisuMZ['EnhancedTP'][_0x553a34(0x1a4)][_0x553a34(0x209)](_0x51c4a7);}},Scene_Boot[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x174)]=function(_0x1f30b3){const _0x100b00=_0x4bbd7b,_0xcbe8b7=[_0x100b00(0x148),_0x100b00(0x1c8),_0x100b00(0x14e),_0x100b00(0x151),_0x100b00(0x241),_0x100b00(0x1f6),'TpRegen',_0x100b00(0x208),_0x100b00(0x23f),_0x100b00(0x198),'FullMp',_0x100b00(0x1cc),_0x100b00(0x244),'DealHpDmg',_0x100b00(0x16f),_0x100b00(0x240),'DealHpHeal',_0x100b00(0x168),_0x100b00(0x121),'DealMpDmg',_0x100b00(0x17a),'TakeMpHeal',_0x100b00(0x1b0),_0x100b00(0x229),_0x100b00(0x1e6),_0x100b00(0x119),'GainAllyBuff',_0x100b00(0x1e0),_0x100b00(0x17b),'DealEnemyDebuff',_0x100b00(0x166),_0x100b00(0x243),_0x100b00(0x15d),_0x100b00(0x217),_0x100b00(0x1d5),_0x100b00(0x14a),_0x100b00(0x1c6),'KillEnemy',_0x100b00(0x225),_0x100b00(0x223),_0x100b00(0x1e1)];for(const _0x25929b of _0xcbe8b7){const _0x1ad6e0=_0x100b00(0x176)[_0x100b00(0x117)](_0x1f30b3[_0x25929b]);_0x1f30b3[_0x100b00(0x1a5)['format'](_0x25929b)]=new Function(_0x100b00(0x1ed),_0x100b00(0x125),'value',_0x1ad6e0);}},TextManager[_0x4bbd7b(0x1ee)]=VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x180)][_0x4bbd7b(0x11b)][_0x4bbd7b(0x152)],ColorManager[_0x4bbd7b(0x1d3)]=function(_0x28f1cb){const _0x2bf1f6=_0x4bbd7b;return _0x28f1cb=String(_0x28f1cb),_0x28f1cb[_0x2bf1f6(0x186)](/#(.*)/i)?_0x2bf1f6(0x19a)[_0x2bf1f6(0x117)](String(RegExp['$1'])):this[_0x2bf1f6(0x196)](Number(_0x28f1cb));},ImageManager[_0x4bbd7b(0x20a)]=VisuMZ['EnhancedTP'][_0x4bbd7b(0x180)][_0x4bbd7b(0x11b)][_0x4bbd7b(0x175)],VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1d8)]=BattleManager[_0x4bbd7b(0x11a)],BattleManager[_0x4bbd7b(0x11a)]=function(){const _0xe3ee4f=_0x4bbd7b;VisuMZ['EnhancedTP'][_0xe3ee4f(0x1d8)][_0xe3ee4f(0x1da)](this),$gameParty[_0xe3ee4f(0x19c)](_0xe3ee4f(0x225),$gameParty[_0xe3ee4f(0x142)](),0x0);},VisuMZ['EnhancedTP'][_0x4bbd7b(0x23a)]=BattleManager[_0x4bbd7b(0x132)],BattleManager['onEscapeSuccess']=function(){const _0x118881=_0x4bbd7b;VisuMZ[_0x118881(0x145)][_0x118881(0x23a)]['call'](this),$gameParty['gainTpFromTpMode'](_0x118881(0x223),$gameParty[_0x118881(0x142)](),0x0);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x10f)]=BattleManager[_0x4bbd7b(0x21c)],BattleManager[_0x4bbd7b(0x21c)]=function(){const _0xe1ef11=_0x4bbd7b;VisuMZ[_0xe1ef11(0x145)][_0xe1ef11(0x10f)][_0xe1ef11(0x1da)](this),$gameParty[_0xe1ef11(0x19c)](_0xe1ef11(0x1e1),$gameParty[_0xe1ef11(0x142)](),0x0);},VisuMZ[_0x4bbd7b(0x145)]['Game_System_initialize']=Game_System[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x118)],Game_System[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x118)]=function(){const _0x5ddd8e=_0x4bbd7b;VisuMZ[_0x5ddd8e(0x145)][_0x5ddd8e(0x157)][_0x5ddd8e(0x1da)](this),this[_0x5ddd8e(0x13e)]();},Game_System[_0x4bbd7b(0x1ab)]['initEnhancedTP']=function(){const _0x4a239d=_0x4bbd7b;this['_tpMode_SceneSkill']=VisuMZ[_0x4a239d(0x145)][_0x4a239d(0x180)][_0x4a239d(0x11b)][_0x4a239d(0x19f)];},Game_System[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x173)]=function(){const _0x50feeb=_0x4bbd7b;if(this[_0x50feeb(0x12f)]===undefined)this[_0x50feeb(0x13e)]();return this['_tpMode_SceneSkill'];},Game_System[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x13c)]=function(_0x2d8e7f){const _0x5d6493=_0x4bbd7b;if(this[_0x5d6493(0x12f)]===undefined)this[_0x5d6493(0x13e)]();this[_0x5d6493(0x12f)]=_0x2d8e7f;},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1c2)]=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1f5)],Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1f5)]=function(_0x4c59cf){const _0x4a447d=_0x4bbd7b;VisuMZ[_0x4a447d(0x145)]['Game_Action_apply'][_0x4a447d(0x1da)](this,_0x4c59cf),this['applyEnhancedTP'](_0x4c59cf);},Game_Action[_0x4bbd7b(0x1ab)]['applyEnhancedTP']=function(_0x25f294){const _0x3040dd=_0x4bbd7b,_0x3e1047=_0x25f294[_0x3040dd(0x21d)]();_0x3e1047[_0x3040dd(0x138)]&&this['subject']()[_0x3040dd(0x19c)]('CriticalHit',_0x25f294,0x0),(_0x3e1047[_0x3040dd(0x10c)]||_0x3e1047[_0x3040dd(0x1c0)])&&_0x25f294['gainTpFromTpMode'](_0x3040dd(0x151),_0x25f294,0x0);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x245)]=Game_Action['prototype'][_0x4bbd7b(0x22c)],Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x22c)]=function(_0x13c19b,_0x35a1b4){const _0x430a52=_0x4bbd7b;VisuMZ[_0x430a52(0x145)][_0x430a52(0x245)]['call'](this,_0x13c19b,_0x35a1b4);const _0x4947aa=this['subject']();_0x35a1b4>0x0?(_0x13c19b['gainTpFromTpMode'](_0x430a52(0x244),_0x13c19b,_0x35a1b4),_0x4947aa[_0x430a52(0x19c)](_0x430a52(0x17e),_0x13c19b,_0x35a1b4),_0x13c19b[_0x430a52(0x14d)]()[_0x430a52(0x19c)](_0x430a52(0x16f),_0x13c19b,_0x35a1b4)):(_0x35a1b4=Math[_0x430a52(0x137)](_0x35a1b4),_0x13c19b['gainTpFromTpMode'](_0x430a52(0x240),_0x13c19b,_0x35a1b4),_0x4947aa[_0x430a52(0x19c)](_0x430a52(0x1e8),_0x13c19b,_0x35a1b4),_0x13c19b[_0x430a52(0x14d)]()[_0x430a52(0x19c)](_0x430a52(0x168),_0x13c19b,_0x35a1b4));},VisuMZ[_0x4bbd7b(0x145)]['Game_Action_executeMpDamage']=Game_Action['prototype'][_0x4bbd7b(0x1fb)],Game_Action['prototype'][_0x4bbd7b(0x1fb)]=function(_0x459c09,_0x28aaa3){const _0x2d4732=_0x4bbd7b;VisuMZ[_0x2d4732(0x145)][_0x2d4732(0x1ac)][_0x2d4732(0x1da)](this,_0x459c09,_0x28aaa3);const _0x1bb292=this[_0x2d4732(0x1af)]();_0x28aaa3>0x0?(_0x459c09[_0x2d4732(0x19c)](_0x2d4732(0x121),_0x459c09,_0x28aaa3),_0x1bb292['gainTpFromTpMode'](_0x2d4732(0x126),_0x459c09,_0x28aaa3),_0x459c09['friendsUnit']()['gainTpFromTpMode'](_0x2d4732(0x17a),_0x459c09,_0x28aaa3)):(_0x28aaa3=Math[_0x2d4732(0x137)](_0x28aaa3),_0x459c09['gainTpFromTpMode']('TakeMpHeal',_0x459c09,_0x28aaa3),_0x1bb292[_0x2d4732(0x19c)](_0x2d4732(0x1b0),_0x459c09,_0x28aaa3),_0x459c09[_0x2d4732(0x14d)]()[_0x2d4732(0x19c)](_0x2d4732(0x229),_0x459c09,_0x28aaa3));},VisuMZ['EnhancedTP'][_0x4bbd7b(0x122)]=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x228)],Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x228)]=function(_0x88be40,_0x16be5c){const _0x1b84d9=_0x4bbd7b;VisuMZ[_0x1b84d9(0x145)]['Game_Action_itemEffectAddBuff'][_0x1b84d9(0x1da)](this,_0x88be40,_0x16be5c);if(!_0x88be40[_0x1b84d9(0x21d)]()[_0x1b84d9(0x1a3)])return;const _0x1d67db=this[_0x1b84d9(0x1af)]();_0x1d67db[_0x1b84d9(0x1d0)]()===_0x88be40[_0x1b84d9(0x1d0)]()?(_0x1d67db[_0x1b84d9(0x19c)]('DealAllyBuff',_0x88be40,0x0),_0x88be40[_0x1b84d9(0x19c)](_0x1b84d9(0x232),_0x88be40,0x0)):(_0x1d67db[_0x1b84d9(0x19c)]('DealEnemyBuff',_0x88be40,0x0),_0x88be40[_0x1b84d9(0x19c)]('GainEnemyBuff',_0x88be40,0x0));},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1c5)]=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x231)],Game_Action[_0x4bbd7b(0x1ab)]['itemEffectAddDebuff']=function(_0x290a38,_0x2c260d){const _0x22a19b=_0x4bbd7b;VisuMZ[_0x22a19b(0x145)][_0x22a19b(0x1c5)][_0x22a19b(0x1da)](this,_0x290a38,_0x2c260d);if(!_0x290a38['result']()[_0x22a19b(0x1a3)])return;const _0x1474e5=this['subject']();_0x1474e5[_0x22a19b(0x1d0)]()===_0x290a38['isActor']()?(_0x1474e5[_0x22a19b(0x19c)](_0x22a19b(0x17b),_0x290a38,0x0),_0x290a38[_0x22a19b(0x19c)](_0x22a19b(0x166),_0x290a38,0x0)):(_0x1474e5['gainTpFromTpMode'](_0x22a19b(0x10e),_0x290a38,0x0),_0x290a38[_0x22a19b(0x19c)](_0x22a19b(0x243),_0x290a38,0x0));},VisuMZ[_0x4bbd7b(0x145)]['Game_Action_itemEffectAddState']=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1b2)],Game_Action[_0x4bbd7b(0x1ab)]['itemEffectAddState']=function(_0xb58205,_0x35defe){const _0x349dcd=_0x4bbd7b,_0x18e255=_0xb58205['result']()['success'];_0xb58205[_0x349dcd(0x21d)]()[_0x349dcd(0x1a3)]=![],VisuMZ[_0x349dcd(0x145)]['Game_Action_itemEffectAddState']['call'](this,_0xb58205,_0x35defe);if(!_0xb58205[_0x349dcd(0x21d)]()['success']){_0xb58205[_0x349dcd(0x21d)]()[_0x349dcd(0x1a3)]=_0x18e255;return;}const _0x503f17=this[_0x349dcd(0x1af)]();_0x503f17['isActor']()===_0xb58205[_0x349dcd(0x1d0)]()?(_0x503f17['gainTpFromTpMode']('DealAllyState',_0xb58205,0x0),_0xb58205[_0x349dcd(0x19c)](_0x349dcd(0x1d5),_0xb58205,0x0)):(_0x503f17[_0x349dcd(0x19c)](_0x349dcd(0x217),_0xb58205,0x0),_0xb58205[_0x349dcd(0x19c)](_0x349dcd(0x14a),_0xb58205,0x0));},VisuMZ[_0x4bbd7b(0x145)]['Game_Action_applyItemUserEffect']=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x190)],Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x190)]=function(_0x58bd3a){const _0x4c6bf0=_0x4bbd7b;VisuMZ[_0x4c6bf0(0x145)][_0x4c6bf0(0x149)]['call'](this,_0x58bd3a),this[_0x4c6bf0(0x20b)](_0x58bd3a);},Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x20b)]=function(_0x4d2101){const _0x8b13d2=_0x4bbd7b;if(!_0x4d2101)return;const _0x138b07=this[_0x8b13d2(0x165)]()['note'],_0x28b2dc=this[_0x8b13d2(0x1af)]();_0x138b07[_0x8b13d2(0x186)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x4d2101['changeTpMode'](String(RegExp['$1']));if(!_0x4d2101[_0x8b13d2(0x1d0)]())return;const _0x176ecc=_0x138b07[_0x8b13d2(0x186)](/<UNLOCK TP MODE: (.*)>/gi);if(_0x176ecc)for(const _0x13a2a3 of _0x176ecc){_0x13a2a3[_0x8b13d2(0x186)](/<UNLOCK TP MODE: (.*)>/i),_0x4d2101[_0x8b13d2(0x1dc)](String(RegExp['$1']));}if(_0x138b07[_0x8b13d2(0x186)](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x3ad657=String(RegExp['$1'])[_0x8b13d2(0x1db)](/[\r\n]+/);for(const _0x46dade of _0x3ad657){_0x4d2101['learnTpMode'](_0x46dade);}}},VisuMZ['EnhancedTP']['Game_Action_applyGlobal']=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1b1)],Game_Action['prototype'][_0x4bbd7b(0x1b1)]=function(){const _0x2a8a77=_0x4bbd7b;VisuMZ[_0x2a8a77(0x145)][_0x2a8a77(0x247)][_0x2a8a77(0x1da)](this),this[_0x2a8a77(0x12a)]();},Game_Action['prototype'][_0x4bbd7b(0x12a)]=function(){const _0x41474a=_0x4bbd7b,_0x1b58e7=this[_0x41474a(0x165)]()[_0x41474a(0x131)],_0x5043e6=this[_0x41474a(0x1af)]();_0x1b58e7[_0x41474a(0x186)](/<CHANGE USER TP MODE: (.*)>/i)&&_0x5043e6[_0x41474a(0x1a0)](String(RegExp['$1']));},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x159)]=Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x21b)],Game_Action['prototype'][_0x4bbd7b(0x21b)]=function(_0x1d3d45){const _0x9f224c=_0x4bbd7b;if(this[_0x9f224c(0x1eb)](_0x1d3d45))return!![];return VisuMZ['EnhancedTP']['Game_Action_testApply'][_0x9f224c(0x1da)](this,_0x1d3d45);},Game_Action[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1eb)]=function(_0x29bedd){const _0x528f31=_0x4bbd7b;if(!this[_0x528f31(0x165)]())return![];const _0x5d2a03=this['item']()['note'],_0x5758cd=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x35ab6f of _0x5758cd){if(_0x5d2a03[_0x528f31(0x186)](_0x35ab6f))return!![];}return![];},Game_BattlerBase['prototype']['initEnhancedTP']=function(){const _0x4cc235=_0x4bbd7b;this['changeTpMode'](this[_0x4cc235(0x143)]());},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1a0)]=function(_0x52505b){const _0x261514=_0x4bbd7b;_0x52505b=_0x52505b[_0x261514(0x184)]()[_0x261514(0x192)]();if(!VisuMZ[_0x261514(0x145)]['TpModes'][_0x52505b])return;this[_0x261514(0x1fd)]=_0x52505b,this[_0x261514(0x1cd)](_0x52505b);},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x143)]=function(){const _0x48e692=_0x4bbd7b;return VisuMZ[_0x48e692(0x145)][_0x48e692(0x180)]['General']['DefaultTpMode'][_0x48e692(0x184)]()[_0x48e692(0x192)]();},Game_BattlerBase[_0x4bbd7b(0x1ab)]['tpMode']=function(){const _0x59da45=_0x4bbd7b;if(this[_0x59da45(0x1fd)]===undefined)this[_0x59da45(0x13e)]();let _0xa97e2a=this[_0x59da45(0x1fd)];for(const _0x332b87 of this[_0x59da45(0x22e)]()){if(!_0x332b87)continue;if(_0x332b87[_0x59da45(0x131)][_0x59da45(0x186)](/<FORCE TP MODE: (.*)>/i)){const _0x166858=String(RegExp['$1'])[_0x59da45(0x184)]()[_0x59da45(0x192)]();if(!VisuMZ['EnhancedTP'][_0x59da45(0x1c3)][_0x166858])continue;_0xa97e2a=_0x166858;break;}}return VisuMZ['EnhancedTP']['TpModes'][_0xa97e2a['toUpperCase']()[_0x59da45(0x192)]()];},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x15a)]=function(_0x4b50c6,_0xf54a0,_0x18a9ad){const _0x1c0199=_0x4bbd7b,_0x18ca56=this['tpMode']();if(!_0x18ca56)return 0x0;_0x4b50c6=_0x1c0199(0x1a5)[_0x1c0199(0x117)](_0x4b50c6);if(!_0x18ca56[_0x4b50c6])return 0x0;try{let _0x58b915=_0x18ca56[_0x4b50c6](this,_0xf54a0,_0x18a9ad);if(isNaN(_0x58b915)||_0x58b915===undefined||_0x58b915===null){if($gameTemp['isPlaytest']()){const _0x2a6579=_0xf54a0[_0x1c0199(0x1fd)]||_0x1c0199(0x24e);console[_0x1c0199(0x1ef)](_0x1c0199(0x129)[_0x1c0199(0x117)](_0xf54a0[_0x1c0199(0x11d)](),_0x2a6579,_0x4b50c6));}_0x58b915=0x0;}return _0x58b915;}catch(_0x12a894){if($gameTemp[_0x1c0199(0x12c)]()){const _0x14f2b8=_0xf54a0['_tpMode']||_0x1c0199(0x24e);console[_0x1c0199(0x1ef)](_0x1c0199(0x129)[_0x1c0199(0x117)](_0xf54a0['name'](),_0x14f2b8,_0x4b50c6));}return 0x0;}},VisuMZ['EnhancedTP']['Game_Battler_gainSilentTp']=Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x227)],Game_Battler['prototype']['gainSilentTp']=function(_0x3deaae){const _0x5e50d3=_0x4bbd7b;this[_0x5e50d3(0x19b)]?this[_0x5e50d3(0x16b)]=(this[_0x5e50d3(0x16b)]+_0x3deaae)[_0x5e50d3(0x236)](0x0,this[_0x5e50d3(0x1e4)]()):VisuMZ[_0x5e50d3(0x145)]['Game_Battler_gainSilentTp'][_0x5e50d3(0x1da)](this,_0x3deaae);},Game_BattlerBase['prototype'][_0x4bbd7b(0x19c)]=function(_0x2eff58,_0x45a90a,_0x3cc6ce){const _0x3b8c35=_0x4bbd7b,_0x37b1bf=Math[_0x3b8c35(0x1cf)](this['tpModeValue'](_0x2eff58,_0x45a90a,_0x3cc6ce));this[_0x3b8c35(0x227)](_0x37b1bf);},VisuMZ['EnhancedTP'][_0x4bbd7b(0x15b)]=Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1e4)],Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1e4)]=function(){const _0xc8613c=_0x4bbd7b;if(this['tpMode']())return Math[_0xc8613c(0x1cf)](this[_0xc8613c(0x164)]()[_0xc8613c(0x140)](this,this,0x0));return VisuMZ[_0xc8613c(0x145)]['Game_BattlerBase_maxTp'][_0xc8613c(0x1da)](this);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x162)]=Game_BattlerBase['prototype']['isPreserveTp'],Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x248)]=function(){const _0x41f5e6=_0x4bbd7b;if(!$gameParty['inBattle']())return!![];if(this[_0x41f5e6(0x164)]())return this[_0x41f5e6(0x164)]()[_0x41f5e6(0x134)];return VisuMZ[_0x41f5e6(0x145)][_0x41f5e6(0x162)]['call'](this);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1f8)]=Game_BattlerBase[_0x4bbd7b(0x1ab)]['sparam'],Game_BattlerBase[_0x4bbd7b(0x1ab)]['sparam']=function(_0x3913c0){const _0x4e5f30=_0x4bbd7b;let _0x1d025a=VisuMZ[_0x4e5f30(0x145)][_0x4e5f30(0x1f8)]['call'](this,_0x3913c0);return _0x3913c0===0x5&&this['tpMode']()&&(_0x1d025a*=this[_0x4e5f30(0x164)]()[_0x4e5f30(0x1bb)]),_0x1d025a;},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1ec)]=function(){const _0x4c6516=_0x4bbd7b;if(!Imported[_0x4c6516(0x136)])return![];const _0x2309a9=this[_0x4c6516(0x164)]();if(!_0x2309a9)return![];if(!_0x2309a9[_0x4c6516(0x1a8)])return![];const _0x4b681e=_0x2309a9[_0x4c6516(0x20e)]||0x0;return this[_0x4c6516(0x15e)]()>=_0x4b681e;},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x167)]=function(){const _0x4703ba=_0x4bbd7b,_0xd83f96=this[_0x4703ba(0x164)]();if(!_0xd83f96)return![];return(_0xd83f96['FlashSpeed']||0x1)['clamp'](0x1,0xff);},Game_BattlerBase[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x12d)]=function(){const _0x55b5cb=_0x4bbd7b,_0x19e567=this[_0x55b5cb(0x164)]();if(!_0x19e567)return![];return(_0x19e567[_0x55b5cb(0x23d)]||0x0)[_0x55b5cb(0x236)](0x0,0xff);},Game_Battler['prototype'][_0x4bbd7b(0x195)]=function(){},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1c9)]=Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x211)],Game_Battler[_0x4bbd7b(0x1ab)]['onBattleStart']=function(_0x477b7d){const _0x48f8cf=_0x4bbd7b;VisuMZ[_0x48f8cf(0x145)][_0x48f8cf(0x1c9)][_0x48f8cf(0x1da)](this,_0x477b7d),this[_0x48f8cf(0x19c)](_0x48f8cf(0x1c8),this,0x0);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x177)]=Game_Battler['prototype'][_0x4bbd7b(0x12e)],Game_Battler['prototype'][_0x4bbd7b(0x12e)]=function(_0x170547){const _0x1854d4=_0x4bbd7b;VisuMZ['EnhancedTP'][_0x1854d4(0x177)][_0x1854d4(0x1da)](this,_0x170547),this[_0x1854d4(0x158)](_0x170547)&&this[_0x1854d4(0x19c)](_0x1854d4(0x1f6),this,0x0),DataManager['isItem'](_0x170547)&&this[_0x1854d4(0x19c)](_0x1854d4(0x241),this,0x0);},Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x158)]=function(_0x5d4471){const _0x5be92d=_0x4bbd7b;if(!_0x5d4471)return![];if(!DataManager[_0x5be92d(0x1b8)](_0x5d4471))return![];if(_0x5d4471['id']===this[_0x5be92d(0x1f9)]())return![];if(_0x5d4471['id']===this[_0x5be92d(0x23c)]())return![];return!![];},VisuMZ['EnhancedTP'][_0x4bbd7b(0x1d9)]=Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x21a)],Game_Battler['prototype'][_0x4bbd7b(0x21a)]=function(){const _0x37d4ab=_0x4bbd7b;if(!$gameParty[_0x37d4ab(0x22a)]())return![];;this[_0x37d4ab(0x19b)]=!![];const _0x165b64=Math[_0x37d4ab(0x1cf)](this['maxTp']()*this[_0x37d4ab(0x116)]);this[_0x37d4ab(0x227)](_0x165b64),this[_0x37d4ab(0x19c)](_0x37d4ab(0x13b),this,0x0),this[_0x37d4ab(0x1f1)]<this['mhp']/0x4&&this[_0x37d4ab(0x19c)](_0x37d4ab(0x208),this,0x0),this[_0x37d4ab(0x1f1)]>=this['mhp']&&this[_0x37d4ab(0x19c)](_0x37d4ab(0x23f),this,0x0),this[_0x37d4ab(0x205)]<this[_0x37d4ab(0x22f)]/0x4&&this[_0x37d4ab(0x19c)](_0x37d4ab(0x198),this,0x0),this[_0x37d4ab(0x205)]>=this[_0x37d4ab(0x22f)]&&this[_0x37d4ab(0x19c)](_0x37d4ab(0x19d),this,0x0),this[_0x37d4ab(0x14d)]()['aliveMembers']()[_0x37d4ab(0x1f3)]<=0x1&&this[_0x37d4ab(0x19c)](_0x37d4ab(0x1cc),this,0x0),this[_0x37d4ab(0x19b)]=undefined,this[_0x37d4ab(0x210)]();},Game_Battler['prototype'][_0x4bbd7b(0x14b)]=function(_0x2d768b){},VisuMZ['EnhancedTP'][_0x4bbd7b(0x202)]=Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x234)],Game_Battler[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x234)]=function(_0x238085){const _0x1001bc=_0x4bbd7b,_0x4322d6=this[_0x1001bc(0x1ad)]();VisuMZ[_0x1001bc(0x145)][_0x1001bc(0x202)][_0x1001bc(0x1da)](this,_0x238085),_0x238085===this['deathStateId']()&&this[_0x1001bc(0x17d)]()&&_0x4322d6&&(this[_0x1001bc(0x14d)]()[_0x1001bc(0x19c)](_0x1001bc(0x1c6),this,0x0),this[_0x1001bc(0x19e)]()[_0x1001bc(0x19c)](_0x1001bc(0x226),this,0x0));},Game_Battler[_0x4bbd7b(0x1ab)]['onChangeTpMode']=function(_0x5d2915){const _0x5a1394=_0x4bbd7b;this[_0x5a1394(0x222)]={},this['_tp']=Math['min'](this[_0x5a1394(0x16b)],this[_0x5a1394(0x1e4)]());},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x18f)]=Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x221)],Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x221)]=function(_0x1bb260){const _0x226cc4=_0x4bbd7b;VisuMZ[_0x226cc4(0x145)][_0x226cc4(0x18f)]['call'](this,_0x1bb260),this[_0x226cc4(0x13e)]();},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x13e)]=function(){const _0x56a71d=_0x4bbd7b;this[_0x56a71d(0x1d7)]=[],Game_Battler[_0x56a71d(0x1ab)]['initEnhancedTP'][_0x56a71d(0x1da)](this),this['learnAvailablePartyTpModes'](),this[_0x56a71d(0x13a)]();},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x143)]=function(){const _0x5e0540=_0x4bbd7b;return this[_0x5e0540(0x1fc)]()&&this[_0x5e0540(0x1fc)]()[_0x5e0540(0x131)][_0x5e0540(0x186)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x5e0540(0x184)]()['trim']():Game_Battler[_0x5e0540(0x1ab)][_0x5e0540(0x143)]['call'](this);},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1cd)]=function(_0x1cdda6){const _0xe5a86e=_0x4bbd7b;_0x1cdda6=_0x1cdda6['toUpperCase']()['trim'](),Game_Battler[_0xe5a86e(0x1ab)][_0xe5a86e(0x1cd)][_0xe5a86e(0x1da)](this,_0x1cdda6),this[_0xe5a86e(0x1dc)](_0x1cdda6);},Game_Actor['prototype'][_0x4bbd7b(0x1dc)]=function(_0x4dcef9){const _0x4b3fa4=_0x4bbd7b;_0x4dcef9=_0x4dcef9['toUpperCase']()[_0x4b3fa4(0x192)]();if(!VisuMZ[_0x4b3fa4(0x145)][_0x4b3fa4(0x1c3)][_0x4dcef9])return;this['_availableTpModes']=this['_availableTpModes']||[],!this[_0x4b3fa4(0x1d7)][_0x4b3fa4(0x230)](_0x4dcef9)&&(this[_0x4b3fa4(0x1d7)][_0x4b3fa4(0x209)](_0x4dcef9),this[_0x4b3fa4(0x146)]());},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x146)]=function(_0x18c171){const _0x24a2df=_0x4bbd7b,_0x14603b=[];for(const _0x5073bd of VisuMZ['EnhancedTP'][_0x24a2df(0x1a4)]){if(_0x18c171[_0x24a2df(0x230)](_0x5073bd))_0x14603b[_0x24a2df(0x209)](_0x5073bd);}return _0x14603b;},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x146)]=function(){const _0x5b7716=_0x4bbd7b;if(this[_0x5b7716(0x1d7)]===undefined)this[_0x5b7716(0x13e)]();this[_0x5b7716(0x1d7)]=VisuMZ['EnhancedTP'][_0x5b7716(0x146)](this['_availableTpModes']);},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x191)]=function(){const _0x5f0884=_0x4bbd7b;if(this[_0x5f0884(0x1d7)]===undefined)this[_0x5f0884(0x13e)]();this[_0x5f0884(0x215)]();let _0x329be8=this[_0x5f0884(0x1d7)][_0x5f0884(0x235)](_0x52b04c=>VisuMZ[_0x5f0884(0x145)]['TpModes'][_0x52b04c]);return _0x329be8[_0x5f0884(0x1bd)](null);},Game_Actor[_0x4bbd7b(0x1ab)]['learnAvailablePartyTpModes']=function(){const _0x409a83=_0x4bbd7b;for(const _0x240860 of $gameParty[_0x409a83(0x172)]()){this['learnTpMode'](_0x240860['toUpperCase']()[_0x409a83(0x192)]());}},Game_Actor['prototype'][_0x4bbd7b(0x13a)]=function(){const _0x53243d=_0x4bbd7b;if(this['actor']()&&this['actor']()['note'][_0x53243d(0x186)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x41186d=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x33259e of _0x41186d){this['learnTpMode'](_0x33259e[_0x53243d(0x184)]()['trim']());}}},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x169)]=Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x109)],Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x109)]=function(_0x2d48c0){const _0x1a1e47=_0x4bbd7b;VisuMZ[_0x1a1e47(0x145)][_0x1a1e47(0x169)]['call'](this,_0x2d48c0),this[_0x1a1e47(0x171)](_0x2d48c0);},Game_Actor[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x171)]=function(_0x17e2c7){const _0x876156=_0x4bbd7b;if(!$dataSkills[_0x17e2c7])return;const _0x4653c3=$dataSkills[_0x17e2c7]['note'],_0x55d78e=_0x4653c3[_0x876156(0x186)](/<LEARN TP MODE: (.*)>/gi);if(_0x55d78e)for(const _0x4976db of _0x55d78e){_0x4976db[_0x876156(0x186)](/<LEARN TP MODE: (.*)>/i),this[_0x876156(0x1dc)](String(RegExp['$1']));}if(_0x4653c3[_0x876156(0x186)](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x23114c=String(RegExp['$1'])[_0x876156(0x1db)](/[\r\n]+/);for(const _0x3e475b of _0x23114c){this[_0x876156(0x1dc)](_0x3e475b);}}},Game_Enemy['prototype'][_0x4bbd7b(0x143)]=function(){const _0x37ae78=_0x4bbd7b;return this[_0x37ae78(0x1e3)]()[_0x37ae78(0x131)][_0x37ae78(0x186)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x37ae78(0x184)]()['trim']():Game_Battler[_0x37ae78(0x1ab)][_0x37ae78(0x143)][_0x37ae78(0x1da)](this);},Game_Unit['prototype']['gainTpFromTpMode']=function(_0x5cd450,_0x26605e,_0x348a87){const _0x1f1298=_0x4bbd7b;for(const _0x569236 of this[_0x1f1298(0x154)]()){if(!_0x569236)continue;_0x569236['gainTpFromTpMode'](_0x5cd450,_0x26605e,_0x348a87);}},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x24c)]=Game_Party['prototype']['initialize'],Game_Party['prototype'][_0x4bbd7b(0x118)]=function(){const _0x5ab8b0=_0x4bbd7b;VisuMZ[_0x5ab8b0(0x145)]['Game_Party_initialize'][_0x5ab8b0(0x1da)](this),this[_0x5ab8b0(0x21e)]();},Game_Party[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x21e)]=function(){const _0x3c2a3e=_0x4bbd7b;this['_tpModes']=[];for(const _0x24cf58 of VisuMZ['EnhancedTP']['Settings'][_0x3c2a3e(0x11b)][_0x3c2a3e(0x170)]){this[_0x3c2a3e(0x203)][_0x3c2a3e(0x209)](_0x24cf58[_0x3c2a3e(0x184)]()[_0x3c2a3e(0x192)]());}},Game_Party[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x172)]=function(){const _0x35316a=_0x4bbd7b;if(this[_0x35316a(0x203)]===undefined)this[_0x35316a(0x21e)]();return this[_0x35316a(0x203)];},VisuMZ['EnhancedTP']['Scene_Skill_create']=Scene_Skill['prototype'][_0x4bbd7b(0x233)],Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x233)]=function(){const _0x238af4=_0x4bbd7b;VisuMZ[_0x238af4(0x145)]['Scene_Skill_create'][_0x238af4(0x1da)](this),this[_0x238af4(0x18c)]();},VisuMZ['EnhancedTP']['Scene_Skill_createSkillTypeWindow']=Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1b4)],Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1b4)]=function(){const _0x32ff6f=_0x4bbd7b;VisuMZ[_0x32ff6f(0x145)]['Scene_Skill_createSkillTypeWindow'][_0x32ff6f(0x1da)](this),this[_0x32ff6f(0x161)]['setHandler'](_0x32ff6f(0x164),this[_0x32ff6f(0x147)][_0x32ff6f(0x1d2)](this));},Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x18c)]=function(){const _0x1365f4=_0x4bbd7b,_0x16eaa1=this[_0x1365f4(0x239)]();this[_0x1365f4(0x216)]=new Window_TpModes(_0x16eaa1),this['_tpModeWindow'][_0x1365f4(0x204)](this[_0x1365f4(0x1cb)]),this[_0x1365f4(0x216)][_0x1365f4(0x13f)]('ok',this['onTpModeOk'][_0x1365f4(0x1d2)](this)),this['_tpModeWindow']['setHandler'](_0x1365f4(0x128),this[_0x1365f4(0x1a9)][_0x1365f4(0x1d2)](this)),this['addWindow'](this[_0x1365f4(0x216)]);const _0x22adca=VisuMZ[_0x1365f4(0x145)]['Settings'][_0x1365f4(0x11b)][_0x1365f4(0x24b)];this[_0x1365f4(0x216)][_0x1365f4(0x1e7)](_0x22adca||0x0);},Scene_Skill[_0x4bbd7b(0x1ab)]['tpModeWindowRect']=function(){const _0x4da83e=_0x4bbd7b,_0x2113fa=0x0,_0x32141d=this['_statusWindow']['y']+this[_0x4da83e(0x150)][_0x4da83e(0x17f)],_0x30b75e=Graphics[_0x4da83e(0x156)],_0x24e7e3=this['mainAreaHeight']()-this[_0x4da83e(0x150)][_0x4da83e(0x17f)];return new Rectangle(_0x2113fa,_0x32141d,_0x30b75e,_0x24e7e3);},Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x147)]=function(){const _0x4ae855=_0x4bbd7b;this['_tpModeWindow']['activate'](),this[_0x4ae855(0x216)][_0x4ae855(0x181)]();},Scene_Skill['prototype']['onTpModeOk']=function(){const _0x2cc603=_0x4bbd7b;this[_0x2cc603(0x216)]['activate']();const _0x1c494a=this[_0x2cc603(0x216)]['item']();if(!_0x1c494a)return;this[_0x2cc603(0x1fc)]()[_0x2cc603(0x1a0)](_0x1c494a['Name']),this[_0x2cc603(0x216)][_0x2cc603(0x210)](),this[_0x2cc603(0x150)][_0x2cc603(0x210)]();},Scene_Skill['prototype']['onTpModeCancel']=function(){const _0x10e03e=_0x4bbd7b;this['_tpModeWindow']['deselect'](),this['_skillTypeWindow'][_0x10e03e(0x10d)]();},VisuMZ['EnhancedTP'][_0x4bbd7b(0x21f)]=Scene_Skill[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x23e)],Scene_Skill[_0x4bbd7b(0x1ab)]['refreshActor']=function(){const _0xe1824=_0x4bbd7b;VisuMZ[_0xe1824(0x145)][_0xe1824(0x21f)][_0xe1824(0x1da)](this);if(this['_tpModeWindow'])this[_0xe1824(0x216)]['setActor'](this[_0xe1824(0x1fc)]());},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x179)]=Sprite_Gauge[_0x4bbd7b(0x1ab)]['setup'],Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x221)]=function(_0x5c0cd8,_0x4637f4){const _0x21dd68=_0x4bbd7b;VisuMZ[_0x21dd68(0x145)][_0x21dd68(0x179)][_0x21dd68(0x1da)](this,_0x5c0cd8,_0x4637f4),this['_statusType']==='tp'&&(this[_0x21dd68(0x183)](),this[_0x21dd68(0x14c)]());},Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x183)]=function(){const _0x3f9bdd=_0x4bbd7b;!this[_0x3f9bdd(0x16c)]&&(this[_0x3f9bdd(0x16c)]=new Sprite(),this[_0x3f9bdd(0x220)](this[_0x3f9bdd(0x16c)])),!this[_0x3f9bdd(0x224)]&&(this[_0x3f9bdd(0x224)]=new Sprite(),this[_0x3f9bdd(0x220)](this['_tpGaugeSprite'])),!this['_tpTextSprite']&&(this['_tpTextSprite']=new Sprite(),this[_0x3f9bdd(0x220)](this['_tpTextSprite']));},VisuMZ['EnhancedTP'][_0x4bbd7b(0x135)]=Sprite_Gauge[_0x4bbd7b(0x1ab)]['redraw'],Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x23b)]=function(){const _0x3ce404=_0x4bbd7b;let _0x41be52=$dataSystem[_0x3ce404(0x153)][_0x3ce404(0x141)][0x7];this[_0x3ce404(0x212)]==='tp'&&this['changeBattlerTpLabel'](),VisuMZ['EnhancedTP'][_0x3ce404(0x135)][_0x3ce404(0x1da)](this),this['_statusType']==='tp'&&this[_0x3ce404(0x120)](),this[_0x3ce404(0x212)]==='tp'&&($dataSystem['terms']['basic'][0x7]=_0x41be52);},Sprite_Gauge[_0x4bbd7b(0x1ab)]['redrawEnhancedTp']=function(){const _0x13142c=_0x4bbd7b;this[_0x13142c(0x249)]&&(this[_0x13142c(0x249)][_0x13142c(0x194)]=this[_0x13142c(0x194)]),this[_0x13142c(0x242)](0x0,0x0,0x0,0x0);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1ce)]=Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x199)],Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x199)]=function(_0x535771,_0x56471d,_0x6acff5,_0x4d6d48,_0x5abe4d,_0xd7e6e5){const _0x2f67e6=_0x4bbd7b;this['_statusType']==='tp'&&this['_tpGaugeSprite']?this[_0x2f67e6(0x1ae)](_0x535771,_0x56471d,_0x6acff5,_0x4d6d48,_0x5abe4d,_0xd7e6e5):VisuMZ[_0x2f67e6(0x145)][_0x2f67e6(0x1ce)]['call'](this,_0x535771,_0x56471d,_0x6acff5,_0x4d6d48,_0x5abe4d,_0xd7e6e5);},Sprite_Gauge[_0x4bbd7b(0x1ab)]['createTpGaugeBitmaps']=function(_0x53f7f1){const _0x9f546f=_0x4bbd7b;!this['_tpGaugeBack'][_0x9f546f(0x194)]&&(this[_0x9f546f(0x16c)][_0x9f546f(0x194)]=new Bitmap(this[_0x9f546f(0x194)][_0x9f546f(0x22b)],this[_0x9f546f(0x194)][_0x9f546f(0x17f)])),!this[_0x9f546f(0x224)][_0x9f546f(0x194)]&&(this[_0x9f546f(0x224)][_0x9f546f(0x194)]=new Bitmap(this[_0x9f546f(0x194)][_0x9f546f(0x22b)],this[_0x9f546f(0x194)]['height'])),_0x53f7f1&&(this[_0x9f546f(0x16c)]['bitmap'][_0x9f546f(0x112)](),this[_0x9f546f(0x224)][_0x9f546f(0x194)][_0x9f546f(0x112)]());},Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1ae)]=function(_0x126f63,_0x137489,_0x5a1cf2,_0x23e864,_0x2c0e9f,_0x49a3b0){const _0x36ab65=_0x4bbd7b;this['createTpGaugeBitmaps'](!![]);const _0x57cd5d=this[_0x36ab65(0x115)](),_0x2f1722=Math[_0x36ab65(0x1cf)]((_0x2c0e9f-0x2)*_0x57cd5d),_0x55b81e=_0x49a3b0-0x2,_0x23d6a9=this[_0x36ab65(0x123)]();this[_0x36ab65(0x16c)][_0x36ab65(0x194)][_0x36ab65(0x160)](_0x5a1cf2,_0x23e864,_0x2c0e9f,_0x49a3b0,_0x23d6a9),_0x126f63=this['changeTpCustomColor'](_0x126f63,0x1),_0x137489=this['changeTpCustomColor'](_0x137489,0x2),this['_tpGaugeSprite'][_0x36ab65(0x194)]['gradientFillRect'](_0x5a1cf2+0x1,_0x23e864+0x1,_0x2f1722,_0x55b81e,_0x126f63,_0x137489);},VisuMZ[_0x4bbd7b(0x145)][_0x4bbd7b(0x1fa)]=Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x10b)],Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x10b)]=function(_0x1ebcb8,_0x45a975,_0x21dc7b,_0x29239a){const _0x313af0=_0x4bbd7b;this[_0x313af0(0x212)]==='tp'&&this[_0x313af0(0x224)]?this[_0x313af0(0x20c)](_0x1ebcb8,_0x45a975,_0x21dc7b,_0x29239a):VisuMZ[_0x313af0(0x145)][_0x313af0(0x1fa)]['call'](this,_0x1ebcb8,_0x45a975,_0x21dc7b,_0x29239a);},Sprite_Gauge['prototype'][_0x4bbd7b(0x20c)]=function(_0x311c04,_0x57b6bd,_0x2650cd,_0x1269fd){const _0x16a7e4=_0x4bbd7b;this[_0x16a7e4(0x1bf)](!![]);const _0x11a1bd=this['gaugeRate'](),_0x1d8d7c=Math[_0x16a7e4(0x1cf)]((_0x2650cd-0x2)*_0x11a1bd),_0x3bf63a=_0x1269fd-0x2,_0x5d2370=this[_0x16a7e4(0x123)](),_0x59ceeb=this[_0x16a7e4(0x193)](this['gaugeColor1'](),0x1),_0x3db171=this[_0x16a7e4(0x193)](this[_0x16a7e4(0x1ff)](),0x2);this[_0x16a7e4(0x16c)][_0x16a7e4(0x194)][_0x16a7e4(0x160)](_0x311c04,_0x57b6bd,_0x2650cd,_0x1269fd,_0x5d2370),this[_0x16a7e4(0x224)][_0x16a7e4(0x194)][_0x16a7e4(0x1b9)](_0x311c04+0x1,_0x57b6bd+0x1,_0x1d8d7c,_0x3bf63a,_0x59ceeb,_0x3db171);},VisuMZ['EnhancedTP'][_0x4bbd7b(0x213)]=Sprite_Gauge[_0x4bbd7b(0x1ab)]['update'],Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x14c)]=function(){const _0x1eb294=_0x4bbd7b;VisuMZ[_0x1eb294(0x145)]['Sprite_Gauge_update'][_0x1eb294(0x1da)](this),this[_0x1eb294(0x197)]();},Sprite_Gauge['prototype'][_0x4bbd7b(0x197)]=function(){const _0x7b661e=_0x4bbd7b;if(this[_0x7b661e(0x212)]!=='tp')return;if(!this[_0x7b661e(0x224)])return;if(!this['_battler'])return;const _0x142fa9=this[_0x7b661e(0x11f)][_0x7b661e(0x164)]();this[_0x7b661e(0x1be)]!==_0x142fa9&&(this[_0x7b661e(0x1be)]=_0x142fa9,this[_0x7b661e(0x23b)]());if(this['_battler'][_0x7b661e(0x1ec)]()){const _0x106a34=this[_0x7b661e(0x11f)][_0x7b661e(0x167)]();this[_0x7b661e(0x224)][_0x7b661e(0x201)](this[_0x7b661e(0x224)]['_hue']+_0x106a34);const _0x418e6c=this['_battler'][_0x7b661e(0x12d)]();this['_tpGaugeSprite'][_0x7b661e(0x17c)]([0xff,0xff,0xff,_0x418e6c]);}else this[_0x7b661e(0x224)][_0x7b661e(0x17c)]([0xff,0xff,0xff,0x0]),this[_0x7b661e(0x224)][_0x7b661e(0x201)](0x0);},Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x163)]=function(){const _0x270dff=_0x4bbd7b;if(!this[_0x270dff(0x11f)])return;const _0x370cde=this[_0x270dff(0x11f)][_0x270dff(0x164)]();_0x370cde['CustomLabel']&&($dataSystem[_0x270dff(0x153)][_0x270dff(0x141)][0x7]=_0x370cde[_0x270dff(0x110)][_0x270dff(0x192)]());},Sprite_Gauge[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x193)]=function(_0x1d0fc5,_0x27d85f){const _0x48bb4b=_0x4bbd7b;if(!this[_0x48bb4b(0x11f)])return _0x1d0fc5;const _0x133959=this[_0x48bb4b(0x11f)][_0x48bb4b(0x164)](),_0x151662=_0x48bb4b(0x1b6)[_0x48bb4b(0x117)](_0x27d85f);return _0x133959[_0x151662]?ColorManager[_0x48bb4b(0x1d3)](_0x133959[_0x151662]):_0x1d0fc5;},Window_Base['prototype'][_0x4bbd7b(0x16d)]=function(_0x2c00c3,_0x4ba9d7,_0x6c9c0d,_0x391ff8,_0x40fd5f){const _0x100230=_0x4bbd7b;if(!_0x2c00c3)return;const _0x24cf49=ImageManager[_0x100230(0x1a6)]||0x20,_0xfbea7f=_0x24cf49-ImageManager['iconWidth'],_0x153c82=_0x24cf49+0x4,_0x50e18f=_0x6c9c0d+(this[_0x100230(0x16e)]()-ImageManager[_0x100230(0x1d1)])/0x2,_0x4c69da=Math['max'](0x0,_0x391ff8-_0x153c82);this[_0x100230(0x18e)](),_0x40fd5f&&_0x40fd5f['tpMode']()===_0x2c00c3&&this[_0x100230(0x114)](ColorManager['tpCostColor']()),this[_0x100230(0x238)](_0x2c00c3[_0x100230(0x200)],_0x4ba9d7+Math[_0x100230(0x13d)](_0xfbea7f/0x2),_0x50e18f),this['drawText'](_0x2c00c3[_0x100230(0x155)],_0x4ba9d7+_0x153c82,_0x6c9c0d,_0x4c69da);},VisuMZ['EnhancedTP'][_0x4bbd7b(0x237)]=Window_SkillType[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x207)],Window_SkillType[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x207)]=function(){const _0x38fe65=_0x4bbd7b;VisuMZ[_0x38fe65(0x145)][_0x38fe65(0x237)][_0x38fe65(0x1da)](this),this[_0x38fe65(0x206)]();},Window_SkillType['prototype']['addTpModeCommand']=function(){const _0x265b85=_0x4bbd7b;if(!this[_0x265b85(0x139)]())return;let _0x2be36e=TextManager['tpModesCommandText'][_0x265b85(0x117)](TextManager['tp']);Imported[_0x265b85(0x136)]&&(this[_0x265b85(0x1f4)]()!=='text'&&(_0x2be36e='\x5cI[%1]%2'[_0x265b85(0x117)](ImageManager[_0x265b85(0x20a)],_0x2be36e))),this[_0x265b85(0x24a)](_0x2be36e,'tpMode',!![],_0x265b85(0x164));},Window_SkillType[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x139)]=function(){return $gameSystem['showTpModeInSceneSkill']();},VisuMZ[_0x4bbd7b(0x145)]['Window_SkillList_setStypeId']=Window_SkillList[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x219)],Window_SkillList[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x219)]=function(_0x57819a){const _0x224ac5=_0x4bbd7b,_0x121faa=this[_0x224ac5(0x1a2)]!==_0x57819a;if(!_0x121faa)return;this['show']();const _0x5810a8=SceneManager[_0x224ac5(0x1bc)][_0x224ac5(0x216)];if(_0x5810a8)_0x5810a8['hide']();const _0x581f62=this[_0x224ac5(0x150)];if(_0x581f62)_0x581f62[_0x224ac5(0x1a7)]();VisuMZ[_0x224ac5(0x145)][_0x224ac5(0x10a)]['call'](this,_0x57819a);if(_0x121faa&&_0x5810a8&&_0x57819a==='tpMode'){if(_0x581f62)_0x581f62[_0x224ac5(0x1e2)]();this['hide'](),_0x5810a8[_0x224ac5(0x1a7)]();}};function Window_TpModes(){const _0xa52051=_0x4bbd7b;this[_0xa52051(0x118)](...arguments);}function _0x3967(){const _0x31f40e=['remove','_tpModeCache','createTpGaugeBitmaps','missed','EnemyChangeTPMode','Game_Action_apply','TpModes','ConvertParams','Game_Action_itemEffectAddDebuff','KillAlly','391037JErHUY','Initial','Game_Battler_onBattleStart','Scene_Boot_onDatabaseLoaded','_helpWindow','OnlyMember','onChangeTpMode','Sprite_Gauge_drawFullGauge','floor','isActor','iconHeight','bind','getColor','STR','GainAllyState','4QEuNMp','_availableTpModes','BattleManager_processVictory','Game_Battler_regenerateTp','call','split','learnTpMode','161mvRFCG','TPModeName','makeItemList','GainEnemyBuff','LoseBattle','hide','enemy','maxTp','exit','DealAllyBuff','setBackgroundType','DealHpHeal','Help','status','testApplyEnhancedTP','isTpGaugeFlashing','user','tpModesCommandText','log','ARRAYFUNC','_hp','383382KHURsF','length','commandStyle','apply','UseSkill','constructor','Game_BattlerBase_sparam','attackSkillId','Sprite_Gauge_drawGaugeRect','executeMpDamage','actor','_tpMode','parameters','gaugeColor2','Icon','setHue','Game_Battler_addState','_tpModes','setHelpWindow','_mp','addTpModeCommand','makeCommandList','CriticalHp','push','tpModesCommandIcon','applyItemEnhancedTPEffect','drawGaugeRectEnhancedTp','parse','FlashRequirement','colSpacing','refresh','onBattleStart','_statusType','Sprite_Gauge_update','ARRAYNUM','learnAvailablePartyTpModes','_tpModeWindow','DealEnemyState','itemAt','setStypeId','regenerateTp','testApply','processDefeat','result','initTpModes','Scene_Skill_refreshActor','addChild','setup','_cache','FleeBattle','_tpGaugeSprite','WinBattle','KillEnemy','gainSilentTp','itemEffectAddBuff','AllyMpHeal','inBattle','width','executeHpDamage','SceneSkillTpMode','traitObjects','mmp','includes','itemEffectAddDebuff','GainAllyBuff','create','addState','map','clamp','Window_SkillType_makeCommandList','drawIcon','tpModeWindowRect','BattleManager_onEscapeSuccess','redraw','guardSkillId','FlashLightness','refreshActor','FullHp','TakeHpHeal','UseItem','setFrame','GainEnemyDebuff','TakeHpDmg','Game_Action_executeHpDamage','ARRAYSTRUCT','Game_Action_applyGlobal','isPreserveTp','_tpTextSprite','addCommand','TpWindowBgType','Game_Party_initialize','updateHelp','Unnamed\x20Mode','return\x200','NUM','playEquip','_actor','learnSkill','Window_SkillList_setStypeId','drawGaugeRect','evaded','activate','DealEnemyDebuff','BattleManager_processDefeat','CustomLabel','process_VisuMZ_EnhancedTP_Settings','clear','ARRAYEVAL','changeTextColor','gaugeRate','trg','format','initialize','DealEnemyBuff','processVictory','General','itemLineRect','name','scrollTo','_battler','redrawEnhancedTp','TakeMpDmg','Game_Action_itemEffectAddBuff','gaugeBackColor','ARRAYJSON','target','DealMpDmg','TpMode','cancel','ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3','applyGlobalEnhancedTP','_data','isPlaytest','tpGaugeFlashLightness','useItem','_tpMode_SceneSkill','Actors','note','onEscapeSuccess','4445480ukRffF','Preserve','Sprite_Gauge_redraw','VisuMZ_1_SkillsStatesCore','abs','critical','isTpModeCommandVisible','learnAvailableActorTpModes','TpRegen','setTpModeInSceneSkill','ceil','initEnhancedTP','setHandler','MaxFormulaFunc','basic','leader','defaultTpMode','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EnhancedTP','sortTpModes','commandTpMode','MaxFormula','Game_Action_applyItemUserEffect','GainEnemyState','chargeTpByDamage','update','friendsUnit','CriticalHit','index','_statusWindow','Evasion','TpModeCmdName','terms','aliveMembers','Name','boxWidth','Game_System_initialize','skillIsNotAttackGuard','Game_Action_testApply','tpModeValue','Game_BattlerBase_maxTp','drawItem','DealAllyState','tpRate','description','fillRect','_skillTypeWindow','Game_BattlerBase_isPreserveTp','changeBattlerTpLabel','tpMode','item','GainAllyDebuff','tpGaugeFlashSpeed','AllyHpHeal','Game_Actor_learnSkill','266856BAJPAP','_tp','_tpGaugeBack','drawTpMode','lineHeight','AllyHpDmg','GlobalTPModes','learnSkillEnhancedTP','tpModes','showTpModeInSceneSkill','convertEnhancedTpFunctions','TpModeIcon','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_Battler_useItem','ActorUnlockAllTPModes','Sprite_Gauge_setup','AllyMpDmg','DealAllyDebuff','setBlendColor','isDead','DealHpDmg','height','Settings','selectLast','ARRAYSTR','createEnhancedTpChildSprites','toUpperCase','ActorChangeTPMode','match','327786mRNasR','110wkRaNi','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','95gpcFnG','registerCommand','createTpModeWindow','Show','resetTextColor','Game_Actor_setup','applyItemUserEffect','availableTpModes','trim','changeTpCustomColor','bitmap','initTp','textColor','updateEnhancedTp','CriticalMp','drawFullGauge','#%1','_regeneratingTp','gainTpFromTpMode','FullMp','opponentsUnit','ShowTpMode','changeTpMode','version','_stypeId','success','TpModeOrder','%1Func','standardIconWidth','show','FlashGauge','onTpModeCancel','JSON','prototype','Game_Action_executeMpDamage','isAlive','drawFullGaugeEnhancedTp','subject','DealMpHeal','applyGlobal','itemEffectAddState','1463934QNZvuy','createSkillTypeWindow','max','CustomColor%1','21212840YECpdI','isSkill','gradientFillRect','onDatabaseLoaded','MultiplierTCR','_scene'];_0x3967=function(){return _0x31f40e;};return _0x3967();}Window_TpModes[_0x4bbd7b(0x1ab)]=Object['create'](Window_Selectable[_0x4bbd7b(0x1ab)]),Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1f7)]=Window_TpModes,Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x118)]=function(_0x2579d5){const _0x56b455=_0x4bbd7b;Window_Selectable['prototype']['initialize']['call'](this,_0x2579d5),this['_actor']=null,this['_data']=[],this[_0x56b455(0x1e2)]();},Window_TpModes['prototype']['setActor']=function(_0x2105bf){const _0x4dfa95=_0x4bbd7b;this[_0x4dfa95(0x108)]!==_0x2105bf&&(this[_0x4dfa95(0x108)]=_0x2105bf,this[_0x4dfa95(0x210)](),this[_0x4dfa95(0x11e)](0x0,0x0));},Window_TpModes['prototype']['maxCols']=function(){return 0x2;},Window_TpModes['prototype'][_0x4bbd7b(0x20f)]=function(){return 0x10;},Window_TpModes[_0x4bbd7b(0x1ab)]['maxItems']=function(){const _0x4d819c=_0x4bbd7b;return this[_0x4d819c(0x12b)]?this['_data'][_0x4d819c(0x1f3)]:0x1;},Window_TpModes[_0x4bbd7b(0x1ab)]['item']=function(){const _0x5b201e=_0x4bbd7b;return this[_0x5b201e(0x218)](this[_0x5b201e(0x14f)]());},Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x218)]=function(_0x564336){const _0x2d25d0=_0x4bbd7b;return this['_data']&&_0x564336>=0x0?this[_0x2d25d0(0x12b)][_0x564336]:null;},Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x1df)]=function(){const _0x22d634=_0x4bbd7b;this[_0x22d634(0x108)]?this[_0x22d634(0x12b)]=this[_0x22d634(0x108)][_0x22d634(0x191)]():this[_0x22d634(0x12b)]=[];},Window_TpModes[_0x4bbd7b(0x1ab)]['selectLast']=function(){this['forceSelect'](0x0);},Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x15c)]=function(_0x446e34){const _0x33ad72=_0x4bbd7b,_0x5edc03=this[_0x33ad72(0x218)](_0x446e34);if(!_0x5edc03)return;const _0x1c0191=this[_0x33ad72(0x11c)](_0x446e34);this['drawTpMode'](_0x5edc03,_0x1c0191['x'],_0x1c0191['y'],_0x1c0191[_0x33ad72(0x22b)],this[_0x33ad72(0x108)]);},Window_TpModes[_0x4bbd7b(0x1ab)][_0x4bbd7b(0x24d)]=function(){this['setHelpWindowItem'](this['item']());},Window_TpModes['prototype']['refresh']=function(){const _0x1cc48e=_0x4bbd7b;this[_0x1cc48e(0x1df)](),Window_Selectable['prototype'][_0x1cc48e(0x210)][_0x1cc48e(0x1da)](this);},Window_TpModes[_0x4bbd7b(0x1ab)]['playOkSound']=function(){const _0x1b84d0=_0x4bbd7b;SoundManager[_0x1b84d0(0x107)]();};