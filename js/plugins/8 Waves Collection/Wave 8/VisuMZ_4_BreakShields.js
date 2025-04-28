//=============================================================================
// VisuStella MZ - Break Shields
// VisuMZ_4_BreakShields.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BreakShields = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BreakShields = VisuMZ.BreakShields || {};
VisuMZ.BreakShields.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [BreakShields]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Break_Shields_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin introduces a new mechanic called Break Shields. Actors and/or
 * enemies can have them. Whenever a battler is struck with an elemental
 * weakness, their Break Shield is reduced by 1 (unless modified by a notetag).
 * Once the battler's Break Shield reaches a score of 0, a state is then
 * applied to the battler (usually a stun state). Once the Break state wears
 * off, the battler will regain their Break Shields again. This can be used to
 * create complex battle depth for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Control how Break Shields are calculated alongside how many hits are
 *   required for each actor and/or enemy to enter the Break Stun state.
 * * Display the Break Shields on the screen and relay the information to your
 *   players through icons.
 * * Play animations when hitting a weakness and reducing Break Shields.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 *
 * Two of the animation Plugin Parameters require the Core Engine to play them.
 * This is due to how the Core Engine allows playing animations without halting
 * the battle system to allow for a seamless flow despite relaying the Break
 * Shield reduction visual feedback.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_2_BattleSystemSTB
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === Break Shield Calculation-Related Notetags ===
 * 
 * ---
 *
 * <Break Shields: x>
 *
 * - Used for: Actor, Class, Enemy Notetags
 * - Declares the base amount of Break Shields this battler will have.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number representing the base amount of Break Shields to
 *   give this battler.
 * - If both the Actor and Class database object has this notetag, priority
 *   will be given to the Class before the Actor.
 *
 * ---
 *
 * <Break Shields: +x>
 * <Break Shields: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Allows trait objects to alter the amount of Break Shields battlers have
 *   whenever their Break Shields are reset.
 * - Replace 'x' with a number representing the Break Shields to increase or
 *   decrease the amount by.
 * - Total Break Shields cannot go under 1 and cannot go whatever the maximum
 *   is declared inside the Plugin Parameters.
 *
 * ---
 * 
 * === Break Shield Alteration-Related Notetags ===
 * 
 * ---
 *
 * <Break Reduce: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reduces the target's Break Shield by x if this action hits a weakness.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number to determine how many Break Shields to reduce.
 * - If Break Shields reach 0, the target will enter a Stun state.
 *
 * ---
 *
 * <Change Break Shield: x>
 *
 * - Used for: Skill, Item Notetags
 * - This will change the target battler's Break Shield value to x if the
 *   battler isn't currently stunned.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value to change the target battler's Break
 *   Shield value to.
 *
 * ---
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 *
 * - Used for: Skill, Item Notetags
 * - This will either increase the target battler's break shield by x or
 *   decrease the target battler's break shield by x.
 * - Happens after the Change Break Shield notetag.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value representing the amount to alter the
 *   target's Break Shields by.
 *
 * ---
 * 
 * === Element-Related Notetags ===
 * 
 * ---
 *
 * <Protect Element: id>
 * <Protect Elements: id, id, id>
 * 
 * <Protect Element: name>
 * <Protect Elements: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Specified element(s) will be guarded and Break Shields cannot be reduced
 *   when struck with that element (as long as the requirement is above 100%).
 * - The element rate for those will cap at 100%, preventing extra damage from
 *   being dealt despite having weaknesses, although custom JS effects will
 *   bypass this.
 * - Replace 'id' with a number value representing the ID(s) of the element(s).
 * - Replace 'name' with the name(s) of the element(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Customize the mechanical settings for Break Shields.
 *
 * ---
 *
 * Break Shields
 * 
 *   Affect: Actors?:
 *   - Do Break Shields affect actors?
 * 
 *   Affect: Enemies?:
 *   - Do Break Shields affect actors?
 * 
 *   Base Shield Value:
 *   - The starting amount of shields a battler has.
 *   - Can be altered through notetags.
 * 
 *   Maximum Shields:
 *   - The maximum amount of shields a battler can have.
 *   - This is a hard cap.
 * 
 *   Stun State ID:
 *   - This is the state to be applied when all Break Shields are reduced to 0.
 * 
 *   JS: On Break Stun:
 *   - Runs this code when a battler loses all Break Shields.
 *   - user = attacker; target = break stun target
 *
 * ---
 *
 * Animation
 * 
 *   Reduce Animation ID:
 *   - Play this animation when Break Shields are reduced.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Stun Animation ID:
 *   - Play this animation when Break Stun is achieved.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Weaknesses
 * 
 *   Minimum Rate:
 *   - What is the minimum element rate for an attack to be considered striking
 *     a weakness?
 * 
 *   Default Reduction:
 *   - Default reduction amount for Break Shields when striking an elemental
 *     weakness.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * Customize the UI settings for Break Shields.
 *
 * ---
 *
 * Icons
 * 
 *   Break Shield Icon:
 *   - Icon used to represent Break Shields.
 * 
 *   Stun State Icon:
 *   - Icon used to represent Break Stun if the Break Stun state does NOT have
 *     an icon assigned to it.
 * 
 *     Show Turns?:
 *     - Show how many turns are remaining with the Break Stun?
 * 
 *     Stun Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Protect Icon:
 *   - Icon used to represent Protected Elements.
 *   - Used for other plugins.
 * 
 *   Font Size:
 *   - What is the font size used to display the turns and Break Shields
 *     remaining?
 *
 * ---
 *
 * Battlers > Actors/Enemies
 * 
 *   Show Battler Icon?:
 *   - Show Break Shield icons on the SV_Actor/enemy battlers?
 * 
 *   Position:
 *   - Where on the battler would you like to place the icon?
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 * 
 *   Name: Attach Shields (Enemies Only)
 *   - Attach the Break Shield icon to the enemy name?
 *   - Overrides direct attachment.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *     Attach: Offset X:
 *     - How much to offset the attached icon's X position by?
 *     - Negative goes left. Positive goes right.
 * 
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's Y position by?
 *     - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the Battle Status?
 * 
 *   Auto-Position?:
 *   - Automatically position the Break Shield icon?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Menu Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the menu scenes?
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
 * Version 1.07: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.06: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where turn color would not update even if break stun is over.
 *    Fix made by Olivia.
 * * Feature Update!
 * ** Updated Break Shield icon to no longer be frame dependent in order to
 *    avoid pixel bleeding during zooms. Update made by Olivia.
 * 
 * Version 1.05: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Mechanics > JS: On Break Stun
 * **** Runs this code when a battler loses all Break Shields.
 * *** Plugin Parameters > UI > Stun Text Color
 * **** Changes the text color used for stun turns left.
 * 
 * Version 1.04: November 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug where a crash would occur if a non-actor type finds its way
 *    into the status window. Fix made by Olivia.
 * 
 * Version 1.03: March 16, 2023
 * * Bug Fixes!
 * ** Notetags from Elements and Status Menu Core for increasing Dealt Element
 *    damage will no longer force a Break Shield reduction when an attack has
 *    an attached element that the enemy is not weak to. Fix made by Arisu.
 * 
 * Version 1.02: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.01: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: April 30, 2021
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
 * @param BreakShields
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
 * @desc Customize the mechanical settings for Break Shields.
 * @default {"BreakShields":"","AffectActors:eval":"true","AffectEnemies:eval":"true","Base:num":"1","Max:num":"99","StunState:num":"13","Animation":"","ReduceAniID:num":"2","StunAniID:num":"15","Weaknesses":"","MinRate:num":"1.05","Reduction:num":"1"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Customize the UI settings for Break Shields.
 * @default {"Icons":"","ShieldIcon:num":"81","StunIcon:num":"6","ShowStunTurns:eval":"false","ProtectIcon:num":"128","FontSize:num":"22","Battlers":"","Actors":"","ActorDisplayIcon:eval":"false","ActorDisplayPosition:str":"bottom center","ActorOffsetX:num":"+0","ActorOffsetY:num":"+8","Enemies":"","EnemyDisplayIcon:eval":"true","EnemyDisplayPosition:str":"bottom center","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+8","NameAttachShieldIcon:eval":"true","AttachShieldOffsetX:num":"+0","AttachShieldOffsetY:num":"+0","BattleStatus":"","BattleStatusDisplayIcons:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0","MenuStatus":"","MenuStatusBreakShieldIcons:eval":"true"}
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
 * @param BreakShields
 * @text Break Shields
 *
 * @param AffectActors:eval
 * @text Affect: Actors?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param AffectEnemies:eval
 * @text Affect: Enemies?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param Base:num
 * @text Base Shield Value
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The starting amount of shields a battler has.
 * Can be altered through notetags.
 * @default 1
 *
 * @param Max:num
 * @text Maximum Shields
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have.
 * This is a hard cap.
 * @default 99
 *
 * @param StunState:num
 * @text Stun State ID
 * @parent BreakShields
 * @type state
 * @desc This is the state to be applied when all Break Shields
 * are reduced to 0.
 * @default 13
 *
 * @param OnBreakStunJS:func
 * @text JS: On Break Stun
 * @parent BreakShields
 * @type note
 * @desc Runs this code when a battler loses all Break Shields.
 * user = attacker; target = break stun target
 * @default "// Insert Code Here"
 *
 * @param Animation
 *
 * @param ReduceAniID:num
 * @text Reduce Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Shields are reduced.
 * Requires VisuMZ_0_CoreEngine.
 * @default 2
 *
 * @param StunAniID:num
 * @text Stun Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Stun is achieved.
 * Requires VisuMZ_0_CoreEngine.
 * @default 15
 *
 * @param Weaknesses
 *
 * @param MinRate:num
 * @text Minimum Rate
 * @parent Weaknesses
 * @desc What is the minimum element rate for an attack to be
 * considered striking a weakness?
 * @default 1.05
 *
 * @param Reduction:num
 * @text Default Reduction
 * @parent Weaknesses
 * @type number
 * @min 1
 * @desc Default reduction amount for Break Shields when striking
 * an elemental weakness.
 * @default 1
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
 * @param ShieldIcon:num
 * @text Break Shield Icon
 * @parent Icons
 * @desc Icon used to represent Break Shields.
 * @default 81
 *
 * @param StunIcon:num
 * @text Stun State Icon
 * @parent Icons
 * @desc Icon used to represent Break Stun if the Break Stun state
 * does NOT have an icon assigned to it.
 * @default 6
 *
 * @param ShowStunTurns:eval
 * @text Show Turns?
 * @parent StunIcon:num
 * @type boolean
 * @on Show Turns
 * @off Hide Turns
 * @desc Show how many turns are remaining with the Break Stun?
 * @default false
 *
 * @param StunTextColor:str
 * @text Stun Text Color
 * @parent StunIcon:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ProtectIcon:num
 * @text Protect Icon
 * @parent Icons
 * @desc Icon used to represent Protected Elements.
 * Used for other plugins.
 * @default 128
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Icons
 * @number
 * @min 1
 * @desc What is the font size used to display the turns and
 * Break Shields remaining?
 * @default 22
 *
 * @param Battlers
 * 
 * @param Actors
 * @parent Battlers
 *
 * @param ActorDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the SV_Actor battlers?
 * @default false
 *
 * @param ActorDisplayPosition:str
 * @text Position
 * @parent Actors
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param ActorOffsetX:num
 * @text Offset X
 * @parent Actors
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param ActorOffsetY:num
 * @text Offset Y
 * @parent Actors
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 * 
 * @param Enemies
 * @parent Battlers
 *
 * @param EnemyDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the enemy battlers?
 * @default true
 *
 * @param EnemyDisplayPosition:str
 * @text Position
 * @parent Enemies
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param EnemyOffsetX:num
 * @text Offset X
 * @parent Enemies
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param EnemyOffsetY:num
 * @text Offset Y
 * @parent Enemies
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 *
 * @param NameAttachShieldIcon:eval
 * @text Name: Attach Shields
 * @parent Enemies
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the Break Shield icon to the enemy name?
 * Overrides direct attachment. Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param AttachShieldOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachShieldOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusDisplayIcons:eval
 * @text Show Break Shields?
 * @parent BattleStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the Battle Status?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Break Shield icon?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param MenuStatus
 * @text Menu Status
 *
 * @param MenuStatusBreakShieldIcons:eval
 * @text Show Break Shields?
 * @parent MenuStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the menu scenes?
 * @default true
 *
 */
//=============================================================================

const _0x2ad534=_0x5f58;(function(_0x1eb590,_0x232eef){const _0x862092=_0x5f58,_0x5d7479=_0x1eb590();while(!![]){try{const _0x3f3a5f=-parseInt(_0x862092(0xe8))/0x1+parseInt(_0x862092(0x129))/0x2+parseInt(_0x862092(0xbb))/0x3+-parseInt(_0x862092(0x138))/0x4*(parseInt(_0x862092(0x177))/0x5)+-parseInt(_0x862092(0x143))/0x6*(parseInt(_0x862092(0x108))/0x7)+-parseInt(_0x862092(0x13f))/0x8+parseInt(_0x862092(0x158))/0x9;if(_0x3f3a5f===_0x232eef)break;else _0x5d7479['push'](_0x5d7479['shift']());}catch(_0x152f6f){_0x5d7479['push'](_0x5d7479['shift']());}}}(_0xdab4,0x4c1d3));var label=_0x2ad534(0xdf),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2ad534(0xb8)](function(_0x2c8cc7){const _0x27a15c=_0x2ad534;return _0x2c8cc7[_0x27a15c(0xcf)]&&_0x2c8cc7[_0x27a15c(0xab)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0xcebeaa,_0x5a1465){const _0x32639d=_0x2ad534;for(const _0x4a5e94 in _0x5a1465){if(_0x4a5e94[_0x32639d(0x18e)](/(.*):(.*)/i)){const _0x294bfb=String(RegExp['$1']),_0x2680f4=String(RegExp['$2'])['toUpperCase']()[_0x32639d(0x137)]();let _0x34058d,_0x71c55e,_0x50a8ef;switch(_0x2680f4){case _0x32639d(0xaf):_0x34058d=_0x5a1465[_0x4a5e94]!==''?Number(_0x5a1465[_0x4a5e94]):0x0;break;case _0x32639d(0x182):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e['map'](_0x5023b4=>Number(_0x5023b4));break;case _0x32639d(0x11d):_0x34058d=_0x5a1465[_0x4a5e94]!==''?eval(_0x5a1465[_0x4a5e94]):null;break;case _0x32639d(0x154):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e[_0x32639d(0x102)](_0x20bbc7=>eval(_0x20bbc7));break;case'JSON':_0x34058d=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):'';break;case _0x32639d(0x11a):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e['map'](_0x53750c=>JSON[_0x32639d(0xf7)](_0x53750c));break;case _0x32639d(0xf6):_0x34058d=_0x5a1465[_0x4a5e94]!==''?new Function(JSON['parse'](_0x5a1465[_0x4a5e94])):new Function('return\x200');break;case _0x32639d(0x113):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e[_0x32639d(0x102)](_0x3d2e67=>new Function(JSON[_0x32639d(0xf7)](_0x3d2e67)));break;case _0x32639d(0xc3):_0x34058d=_0x5a1465[_0x4a5e94]!==''?String(_0x5a1465[_0x4a5e94]):'';break;case _0x32639d(0xd1):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON['parse'](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e[_0x32639d(0x102)](_0x40764e=>String(_0x40764e));break;case _0x32639d(0xe3):_0x50a8ef=_0x5a1465[_0x4a5e94]!==''?JSON['parse'](_0x5a1465[_0x4a5e94]):{},_0x34058d=VisuMZ[_0x32639d(0xb2)]({},_0x50a8ef);break;case _0x32639d(0x17d):_0x71c55e=_0x5a1465[_0x4a5e94]!==''?JSON[_0x32639d(0xf7)](_0x5a1465[_0x4a5e94]):[],_0x34058d=_0x71c55e['map'](_0x3039da=>VisuMZ[_0x32639d(0xb2)]({},JSON[_0x32639d(0xf7)](_0x3039da)));break;default:continue;}_0xcebeaa[_0x294bfb]=_0x34058d;}}return _0xcebeaa;},(_0x318215=>{const _0x1bd788=_0x2ad534,_0x416ede=_0x318215['name'];for(const _0x5d0bf9 of dependencies){if(!Imported[_0x5d0bf9]){alert(_0x1bd788(0x179)[_0x1bd788(0x16c)](_0x416ede,_0x5d0bf9)),SceneManager['exit']();break;}}const _0x6092c8=_0x318215[_0x1bd788(0xab)];if(_0x6092c8[_0x1bd788(0x18e)](/\[Version[ ](.*?)\]/i)){const _0x53d94e=Number(RegExp['$1']);_0x53d94e!==VisuMZ[label][_0x1bd788(0xed)]&&(alert(_0x1bd788(0x128)[_0x1bd788(0x16c)](_0x416ede,_0x53d94e)),SceneManager[_0x1bd788(0x88)]());}if(_0x6092c8[_0x1bd788(0x18e)](/\[Tier[ ](\d+)\]/i)){const _0x5374ca=Number(RegExp['$1']);_0x5374ca<tier?(alert(_0x1bd788(0x8b)['format'](_0x416ede,_0x5374ca,tier)),SceneManager['exit']()):tier=Math['max'](_0x5374ca,tier);}VisuMZ[_0x1bd788(0xb2)](VisuMZ[label][_0x1bd788(0x109)],_0x318215[_0x1bd788(0xda)]);})(pluginData),VisuMZ['BreakShields'][_0x2ad534(0x16e)]={'BreakReduce':/<BREAK (?:REDUCE|REDUCTION):[ ](\d+)>/i,'SetBreakShield':/<(?:SET|CHANGE) BREAK (?:SHIELD|SHIELDS): (\d+)>/i,'AlterBreakShield':/<(?:INCREASE|DECREASE|ALTER) BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'ProtectedElements':/<PROTECT (?:ELEMENT|ELEMENTS):[ ](.*)>/i,'AddedBreakShields':/<BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'BaseBreakShields':/<BREAK (?:SHIELD|SHIELDS): (\d+)>/i},DataManager[_0x2ad534(0x99)]=function(_0x22a2f5){const _0x33204e=_0x2ad534;_0x22a2f5=_0x22a2f5[_0x33204e(0xa1)]()[_0x33204e(0x137)](),this[_0x33204e(0x112)]=this[_0x33204e(0x112)]||{};if(this[_0x33204e(0x112)][_0x22a2f5])return this[_0x33204e(0x112)][_0x22a2f5];let _0x2727ef=0x1;for(const _0x35d298 of $dataSystem['elements']){if(!_0x35d298)continue;let _0x2f5be1=_0x35d298[_0x33204e(0xa1)]();_0x2f5be1=_0x2f5be1[_0x33204e(0x11c)](/\x1I\[(\d+)\]/gi,''),_0x2f5be1=_0x2f5be1[_0x33204e(0x11c)](/\\I\[(\d+)\]/gi,''),this[_0x33204e(0x112)][_0x2f5be1]=_0x2727ef,_0x2727ef++;}return this['_elementIDs'][_0x22a2f5]||0x0;},ImageManager[_0x2ad534(0x18d)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0x160)],ImageManager[_0x2ad534(0x92)]=VisuMZ['BreakShields']['Settings']['UI'][_0x2ad534(0xaa)],ImageManager['breakShield_StunTurns']=VisuMZ[_0x2ad534(0xdf)]['Settings']['UI']['ShowStunTurns'],ImageManager[_0x2ad534(0x189)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0xd8)],ColorManager[_0x2ad534(0xb1)]=function(_0x2e27de){const _0x8a771f=_0x2ad534;return _0x2e27de=String(_0x2e27de),_0x2e27de[_0x8a771f(0x18e)](/#(.*)/i)?_0x8a771f(0x15e)[_0x8a771f(0x16c)](String(RegExp['$1'])):this[_0x8a771f(0x17f)](Number(_0x2e27de));},SceneManager[_0x2ad534(0xa2)]=function(){const _0x7d8dde=_0x2ad534;return this[_0x7d8dde(0x147)]&&this[_0x7d8dde(0x147)][_0x7d8dde(0x142)]===Scene_Battle;},VisuMZ[_0x2ad534(0xdf)]['BattleManager_setup']=BattleManager[_0x2ad534(0xdc)],BattleManager[_0x2ad534(0xdc)]=function(_0x110598,_0x53a28c,_0x543234){const _0x4505da=_0x2ad534;VisuMZ[_0x4505da(0xdf)][_0x4505da(0xc7)][_0x4505da(0xe5)](this,_0x110598,_0x53a28c,_0x543234),$gameParty[_0x4505da(0x12a)](),$gameTroop['resetBreakShields']();},Game_Action[_0x2ad534(0x11f)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)]['MinRate'],Game_Action['BREAK_SHIELDS_DEFAULT_REDUCTION']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0x15c)],VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x89)]=Game_Action['prototype'][_0x2ad534(0xfd)],Game_Action['prototype'][_0x2ad534(0xfd)]=function(_0x1d9abf,_0xc4f720){const _0x2a383e=_0x2ad534;VisuMZ[_0x2a383e(0xdf)][_0x2a383e(0x89)]['call'](this,_0x1d9abf,_0xc4f720),!!_0x1d9abf&&_0xc4f720>0x0&&_0x1d9abf[_0x2a383e(0x13a)]()&&this[_0x2a383e(0x98)]()&&this[_0x2a383e(0x181)](_0x1d9abf,_0xc4f720);},Game_Action[_0x2ad534(0xf2)][_0x2ad534(0x181)]=function(_0x1e94a9,_0x90f7a1){const _0x816387=_0x2ad534;if(!_0x1e94a9['isBreakStunned']()){var _0x1898e2=this['calcRawBreakShieldElementRate'](_0x1e94a9);if(_0x1898e2>=Game_Action[_0x816387(0x11f)]){var _0x90f7a1=-0x1*this[_0x816387(0x186)]();_0x1e94a9[_0x816387(0x164)](),_0x1e94a9[_0x816387(0x91)](_0x90f7a1);}}},Game_Action[_0x2ad534(0xf2)]['calcRawBreakShieldElementRate']=function(_0x357211){const _0x148e1d=_0x2ad534;this[_0x148e1d(0xeb)]=!![];const _0x2d51e3=this[_0x148e1d(0x107)](_0x357211);return this[_0x148e1d(0xeb)]=undefined,_0x2d51e3;},VisuMZ[_0x2ad534(0xdf)]['Game_Action_calcUserElementDamagePlus']=Game_Action[_0x2ad534(0xf2)][_0x2ad534(0x12c)],Game_Action[_0x2ad534(0xf2)][_0x2ad534(0x12c)]=function(_0x3441ee,_0x598aba){const _0xcd9226=_0x2ad534;if(this[_0xcd9226(0xeb)])return 0x0;return VisuMZ['BreakShields'][_0xcd9226(0x14b)][_0xcd9226(0xe5)](this,_0x3441ee,_0x598aba);},VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x10f)]=Game_Action[_0x2ad534(0xf2)][_0x2ad534(0xbc)],Game_Action[_0x2ad534(0xf2)][_0x2ad534(0xbc)]=function(_0x589326,_0x45f6fa){const _0x45ce86=_0x2ad534;if(this[_0x45ce86(0xeb)])return 0x1;return VisuMZ[_0x45ce86(0xdf)][_0x45ce86(0x10f)][_0x45ce86(0xe5)](this,_0x589326,_0x45f6fa);},VisuMZ[_0x2ad534(0xdf)]['Game_Action_calcUserElementDamageFlat']=Game_Action['prototype'][_0x2ad534(0xa9)],Game_Action[_0x2ad534(0xf2)][_0x2ad534(0xa9)]=function(_0x54aa02,_0x3b8c79){const _0x1f8741=_0x2ad534;if(this['_calcRawBreakShieldEleRate'])return 0x0;return VisuMZ[_0x1f8741(0xdf)][_0x1f8741(0x162)][_0x1f8741(0xe5)](this,_0x54aa02,_0x3b8c79);},Game_Action[_0x2ad534(0xf2)][_0x2ad534(0x186)]=function(){const _0x9891bb=_0x2ad534,_0x53a171=VisuMZ[_0x9891bb(0xdf)][_0x9891bb(0x16e)];return this[_0x9891bb(0x169)]()[_0x9891bb(0xfc)][_0x9891bb(0x18e)](_0x53a171['BreakReduce'])?parseInt(RegExp['$1']):Game_Action[_0x9891bb(0x116)];},VisuMZ['BreakShields'][_0x2ad534(0xfb)]=Game_Action[_0x2ad534(0xf2)][_0x2ad534(0x8c)],Game_Action['prototype'][_0x2ad534(0x8c)]=function(_0x3d8770){const _0x55e2b3=_0x2ad534;VisuMZ[_0x55e2b3(0xdf)][_0x55e2b3(0xfb)][_0x55e2b3(0xe5)](this,_0x3d8770),!!_0x3d8770&&_0x3d8770[_0x55e2b3(0x13a)]()&&this[_0x55e2b3(0xcd)](_0x3d8770);},Game_Action[_0x2ad534(0xf2)][_0x2ad534(0xcd)]=function(_0x5fb4b){const _0xebab4a=_0x2ad534;if(!_0x5fb4b[_0xebab4a(0x133)]()){const _0x36dcb7=VisuMZ['BreakShields'][_0xebab4a(0x16e)];this[_0xebab4a(0x169)]()[_0xebab4a(0xfc)][_0xebab4a(0x18e)](_0x36dcb7[_0xebab4a(0x16d)])&&(_0x5fb4b[_0xebab4a(0x15d)](parseInt(RegExp['$1'])),$gameTemp[_0xebab4a(0xdd)]=!![]),this[_0xebab4a(0x169)]()['note'][_0xebab4a(0x18e)](_0x36dcb7[_0xebab4a(0x155)])&&(_0x5fb4b['alterBreakShield'](parseInt(RegExp['$1'])),$gameTemp[_0xebab4a(0xdd)]=!![]);}},VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x170)]=Game_BattlerBase[_0x2ad534(0xf2)][_0x2ad534(0x165)],Game_BattlerBase[_0x2ad534(0xf2)][_0x2ad534(0x165)]=function(_0x4410ea){const _0x17d932=_0x2ad534;var _0x34932d=VisuMZ[_0x17d932(0xdf)]['Game_BattlerBase_elementRate'][_0x17d932(0xe5)](this,_0x4410ea);return this['getProtectedWeaknessElements']()[_0x17d932(0x140)](_0x4410ea)?Math[_0x17d932(0x183)](0x1,_0x34932d):_0x34932d;},Game_BattlerBase['prototype'][_0x2ad534(0x12d)]=function(_0x50b3b6){const _0x27423c=_0x2ad534;return VisuMZ[_0x27423c(0xdf)][_0x27423c(0x170)]['call'](this,_0x50b3b6);},Game_Battler[_0x2ad534(0x144)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0xc0)],Game_Battler['BREAK_SHIELDS_MAX']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['Mechanics'][_0x2ad534(0x153)],Game_Battler[_0x2ad534(0xe0)]=VisuMZ[_0x2ad534(0xdf)]['Settings'][_0x2ad534(0x16b)][_0x2ad534(0x13c)],Game_Battler[_0x2ad534(0xc8)]=VisuMZ['BreakShields'][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0x11b)],Game_Battler[_0x2ad534(0x14f)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0xd7)],Game_Battler[_0x2ad534(0x111)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0x93)],Game_Battler[_0x2ad534(0x12f)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)][_0x2ad534(0x16b)][_0x2ad534(0x8d)],VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x191)]=Game_Battler['prototype']['removeBattleStates'],Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0xa7)]=function(){const _0x50364e=_0x2ad534;VisuMZ[_0x50364e(0xdf)][_0x50364e(0x191)]['call'](this),this['resetBreakShield']();},Game_Battler['prototype']['isAffectedByBreakShield']=function(){return![];},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0xa0)]=function(){const _0x35b786=_0x2ad534;this[_0x35b786(0x13a)]()&&this[_0x35b786(0x15d)](this['topBreakShield']());},Game_Battler[_0x2ad534(0xf2)]['baseBreakShield']=function(){const _0x21c7a3=_0x2ad534;return Game_Battler[_0x21c7a3(0x144)];},Game_Battler[_0x2ad534(0xf2)]['topBreakShield']=function(){var _0x47686c=this['baseBreakShield']();return _0x47686c=this['addedBreakShields'](_0x47686c),_0x47686c['clamp'](0x1,Game_Battler['BREAK_SHIELDS_MAX']);},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0x8f)]=function(_0x26699d){const _0x2a890e=_0x2ad534,_0x4c7ac4=VisuMZ['BreakShields'][_0x2a890e(0x16e)];for(const _0xd58971 of this[_0x2a890e(0x167)]()){if(!_0xd58971)continue;_0xd58971[_0x2a890e(0xfc)][_0x2a890e(0x18e)](_0x4c7ac4['AddedBreakShields'])&&(_0x26699d+=Number(RegExp['$1'])||0x0);}return _0x26699d;},Game_Battler['prototype'][_0x2ad534(0x18b)]=function(){const _0x434451=_0x2ad534;return this[_0x434451(0x166)]===undefined&&this[_0x434451(0x15d)](this[_0x434451(0x101)]()),this[_0x434451(0x166)];},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0x15d)]=function(_0x30bf38){const _0x533600=_0x2ad534;this['isAffectedByBreakShield']()&&(this[_0x533600(0x166)]=Math[_0x533600(0x104)](_0x30bf38),this['_currentBreakShield']=this[_0x533600(0x166)][_0x533600(0xae)](0x0,Game_Battler[_0x533600(0x10a)]),this[_0x533600(0x166)]<=0x0&&this[_0x533600(0xbd)](),this[_0x533600(0x9a)]());},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0x91)]=function(_0x22f122){const _0x2d3d4d=_0x2ad534;this[_0x2d3d4d(0x15d)](this[_0x2d3d4d(0x18b)]()+_0x22f122);},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0xbd)]=function(){const _0x2f1597=_0x2ad534;this[_0x2f1597(0x15d)](this[_0x2f1597(0x101)]());var _0x117ddf=Game_Battler[_0x2f1597(0xe0)];this['addState'](_0x117ddf),this[_0x2f1597(0xb6)](),this[_0x2f1597(0xf1)]();},Game_Battler['prototype'][_0x2ad534(0x133)]=function(){const _0x2a4542=_0x2ad534;return this[_0x2a4542(0x13d)](Game_Battler[_0x2a4542(0xe0)]);},Game_Battler['prototype'][_0x2ad534(0x164)]=function(){const _0x385f96=_0x2ad534;if(Imported[_0x385f96(0x8e)]&&Game_Battler[_0x385f96(0xc8)]){var _0x35d082=Game_Battler['BREAK_SHIELDS_REDUCE_ANIMATION'];$gameTemp['requestFauxAnimation']([this],_0x35d082,![],![]);}},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0xb6)]=function(){const _0xc92bb0=_0x2ad534;if(Imported[_0xc92bb0(0x8e)]&&Game_Battler['BREAK_SHIELDS_STUN_ANIMATION']){var _0x12988f=Game_Battler[_0xc92bb0(0x14f)];$gameTemp[_0xc92bb0(0x10b)]([this],_0x12988f,![],![]);}},Game_Battler[_0x2ad534(0xf2)]['onBreakStunJS']=function(){const _0x289990=_0x2ad534;window[_0x289990(0x150)]=BattleManager[_0x289990(0xad)],window['target']=BattleManager[_0x289990(0xad)],window['a']=BattleManager['_subject'],window['b']=this,VisuMZ[_0x289990(0xdf)]['Settings'][_0x289990(0x16b)][_0x289990(0x185)]&&VisuMZ['BreakShields'][_0x289990(0x109)][_0x289990(0x16b)][_0x289990(0x185)][_0x289990(0xe5)](this),window[_0x289990(0x150)]=undefined,window[_0x289990(0xd6)]=undefined,window['a']=undefined,window['b']=undefined;},Game_Battler[_0x2ad534(0xf2)][_0x2ad534(0xba)]=function(){const _0x340594=_0x2ad534,_0x1fe72f=VisuMZ[_0x340594(0xdf)]['RegExp'];let _0xeb6135=[];for(const _0x5174d7 of this[_0x340594(0x167)]()){if(!_0x5174d7)continue;if(_0x5174d7['note'][_0x340594(0x18e)](_0x1fe72f['ProtectedElements'])){const _0x12fe5d=RegExp['$1']['split'](',')[_0x340594(0x102)](_0x42055a=>_0x42055a[_0x340594(0x137)]());for(const _0x5294c3 of _0x12fe5d){const _0x139b1d=/^\d+$/[_0x340594(0x119)](_0x5294c3);if(_0x139b1d)_0xeb6135[_0x340594(0xfe)](Number(_0x5294c3));else{const _0x59fe95=DataManager[_0x340594(0x99)](_0x5294c3);if(_0x59fe95)_0xeb6135[_0x340594(0xfe)](_0x59fe95);}}}}return _0xeb6135[_0x340594(0x193)](function(_0x1eacc3,_0x4923c3){return _0x1eacc3-_0x4923c3;}),_0xeb6135;},Game_Actor[_0x2ad534(0xf2)][_0x2ad534(0x13a)]=function(){const _0x3fa100=_0x2ad534;if(Imported[_0x3fa100(0x161)]&&BattleManager[_0x3fa100(0xc6)]()&&BattleManager['isSTBExploitSystemEnabled']())return this[_0x3fa100(0x187)]()?!![]:![];return Game_Battler['BREAK_SHIELDS_ACTORS'];},Game_Actor[_0x2ad534(0xf2)]['baseBreakShield']=function(){const _0x53adc8=_0x2ad534,_0x545922=VisuMZ[_0x53adc8(0xdf)][_0x53adc8(0x16e)];let _0xf79982=Game_Battler['prototype']['baseBreakShield']['call'](this);if(!!this[_0x53adc8(0x139)]()&&this['currentClass']()[_0x53adc8(0xfc)][_0x53adc8(0x18e)](_0x545922[_0x53adc8(0x134)]))_0xf79982=parseInt(RegExp['$1']);else this[_0x53adc8(0x168)]()&&this[_0x53adc8(0x168)]()[_0x53adc8(0xfc)][_0x53adc8(0x18e)](_0x545922[_0x53adc8(0x134)])&&(_0xf79982=parseInt(RegExp['$1']));return Math['max'](0x1,_0xf79982);},VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x174)]=Game_Actor[_0x2ad534(0xf2)][_0x2ad534(0x9a)],Game_Actor[_0x2ad534(0xf2)][_0x2ad534(0x9a)]=function(){const _0x49d6ae=_0x2ad534;VisuMZ['BreakShields'][_0x49d6ae(0x174)][_0x49d6ae(0xe5)](this),!$gameParty[_0x49d6ae(0xa6)]()&&!this[_0x49d6ae(0xd2)]&&(this['_resettingBreakShield']=!![],this['resetBreakShield'](),this[_0x49d6ae(0xd2)]=undefined);},Game_Enemy['prototype'][_0x2ad534(0x13a)]=function(){const _0x48d2bc=_0x2ad534;if(Imported[_0x48d2bc(0x161)]&&BattleManager['isSTB']()&&BattleManager[_0x48d2bc(0x172)]())return this[_0x48d2bc(0x187)]()?!![]:![];return Game_Battler[_0x48d2bc(0x12f)];},Game_Enemy[_0x2ad534(0xf2)][_0x2ad534(0x18a)]=function(){const _0x5c90d1=_0x2ad534,_0x34ddb6=VisuMZ[_0x5c90d1(0xdf)][_0x5c90d1(0x16e)];let _0x3b8048=Game_Battler[_0x5c90d1(0xf2)][_0x5c90d1(0x18a)]['call'](this);return this[_0x5c90d1(0xbe)]()&&this['enemy']()[_0x5c90d1(0xfc)][_0x5c90d1(0x18e)](_0x34ddb6[_0x5c90d1(0x134)])&&(_0x3b8048=parseInt(RegExp['$1'])),Math[_0x5c90d1(0xee)](0x1,_0x3b8048);},Game_Unit[_0x2ad534(0xf2)][_0x2ad534(0x12a)]=function(){const _0xa1ebf=_0x2ad534;var _0x3d0278=this['_inBattle'];this[_0xa1ebf(0x135)]=![];for(const _0x4d01aa of this['members']()){_0x4d01aa&&_0x4d01aa[_0xa1ebf(0xa0)]();}this[_0xa1ebf(0x135)]=_0x3d0278;},Sprite_Battler[_0x2ad534(0xf2)][_0x2ad534(0x118)]=function(){const _0x3246df=_0x2ad534;this[_0x3246df(0xa3)]=new Sprite_BreakShieldIcon(),this[_0x3246df(0xfa)](this['_breakShieldSprite']);},Sprite_Actor['BREAK_SHIELD_BATTLER_DISPLAY_ICON']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0x14d)],Sprite_Actor[_0x2ad534(0x159)]=VisuMZ[_0x2ad534(0xdf)]['Settings']['UI'][_0x2ad534(0x136)],Sprite_Actor[_0x2ad534(0xb0)]=VisuMZ['BreakShields'][_0x2ad534(0x109)]['UI'][_0x2ad534(0x173)],Sprite_Actor[_0x2ad534(0x17e)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0xf8)],VisuMZ['BreakShields'][_0x2ad534(0x16a)]=Sprite_Actor['prototype']['initMembers'],Sprite_Actor['prototype']['initMembers']=function(){const _0x4de6f0=_0x2ad534;VisuMZ[_0x4de6f0(0xdf)][_0x4de6f0(0x16a)]['call'](this),this[_0x4de6f0(0x12e)]()&&this['createBreakShieldIconSprite']();},Sprite_Actor['prototype'][_0x2ad534(0x12e)]=function(){const _0x3574c1=_0x2ad534;return Sprite_Actor[_0x3574c1(0x8a)]&&this['constructor']===Sprite_Actor;},VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x13e)]=Sprite_Actor['prototype']['setBattler'],Sprite_Actor[_0x2ad534(0xf2)][_0x2ad534(0x145)]=function(_0xfa93fe){const _0x540ba5=_0x2ad534;VisuMZ['BreakShields'][_0x540ba5(0x13e)][_0x540ba5(0xe5)](this,_0xfa93fe),this[_0x540ba5(0xa3)]&&this['_breakShieldSprite']['setup'](this[_0x540ba5(0xea)],!![]);},Sprite_Enemy['BREAK_SHIELD_BATTLER_DISPLAY_ICON']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI']['EnemyDisplayIcon'],Sprite_Enemy[_0x2ad534(0x159)]=VisuMZ['BreakShields']['Settings']['UI'][_0x2ad534(0x14c)],Sprite_Enemy['BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X']=VisuMZ['BreakShields'][_0x2ad534(0x109)]['UI'][_0x2ad534(0xec)],Sprite_Enemy[_0x2ad534(0x17e)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI']['EnemyOffsetY'],Sprite_Enemy[_0x2ad534(0xac)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0x100)],Sprite_Enemy[_0x2ad534(0x9d)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI']['AttachShieldOffsetX'],Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y']=VisuMZ['BreakShields'][_0x2ad534(0x109)]['UI'][_0x2ad534(0x96)],VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x106)]=Sprite_Enemy['prototype'][_0x2ad534(0xdb)],Sprite_Enemy['prototype'][_0x2ad534(0xdb)]=function(){const _0x254bcd=_0x2ad534;VisuMZ[_0x254bcd(0xdf)]['Sprite_Enemy_initMembers']['call'](this),this[_0x254bcd(0x12e)]()&&this[_0x254bcd(0x118)]();},Sprite_Enemy[_0x2ad534(0xf2)][_0x2ad534(0x12e)]=function(){const _0x11902d=_0x2ad534;return Imported[_0x11902d(0xf5)]&&Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME']?![]:Sprite_Enemy[_0x11902d(0x8a)];},VisuMZ['BreakShields'][_0x2ad534(0x10d)]=Sprite_Enemy[_0x2ad534(0xf2)][_0x2ad534(0x145)],Sprite_Enemy[_0x2ad534(0xf2)][_0x2ad534(0x145)]=function(_0x503b4b){const _0x13faa6=_0x2ad534;VisuMZ['BreakShields']['Sprite_Enemy_setBattler'][_0x13faa6(0xe5)](this,_0x503b4b),this[_0x13faa6(0xa3)]&&this[_0x13faa6(0xa3)][_0x13faa6(0xdc)](this['_enemy'],!![]);};function Sprite_BreakShieldIcon(){const _0x2eb23e=_0x2ad534;this[_0x2eb23e(0xf0)](...arguments);}function _0xdab4(){const _0x515234=['user','_spriteset','BREAK_SHIELDS_MENU_ICONS','Max','ARRAYEVAL','AlterBreakShield','border','Sprite_EnemyName_createAttachedSprites','6716403pkJTjX','BREAK_SHIELD_BATTLER_DISPLAY_POSITION','MultiLayerHpGauge','isDead','Reduction','setBreakShield','#%1','lineHeight','ShieldIcon','VisuMZ_2_BattleSystemSTB','Game_Action_calcUserElementDamageFlat','isActor','startBreakShieldReduceAnimation','elementRate','_currentBreakShield','traitObjects','actor','item','Sprite_Actor_initMembers','Mechanics','format','SetBreakShield','RegExp','_displayValue','Game_BattlerBase_elementRate','StunTextColor','isSTBExploitSystemEnabled','ActorOffsetX','Game_Actor_refresh','updateAutoPosition','BREAK_SHIELDS_DISPLAY_OFFSET_Y','1185VWIAri','drawActorBreakShields','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','round','SETTINGS','Sprite_EnemyName_updateAttachedSprites','ARRAYSTRUCT','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_Y','textColor','default','executeBreakShieldReduction','ARRAYNUM','min','_numberSprite','OnBreakStunJS','itemBreakShieldReduction','stbCannotBeExploited','update','breakShield_ProtectIcon','baseBreakShield','currentBreakShield','bitmap','breakShield_ShieldIcon','match','BattleStatusOffsetX','height','Game_Battler_removeBattleStates','loadBitmap','sort','Window_BattleStatus_drawItemStatus','ShowFacesListStyle','exit','Game_Action_executeDamage','BREAK_SHIELD_BATTLER_DISPLAY_ICON','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','applyItemUserEffect','AffectEnemies','VisuMZ_0_CoreEngine','addedBreakShields','_battler','alterBreakShield','breakShield_StunIcon','AffectActors','breakShield_StunTurns','fontSize','AttachShieldOffsetY','BREAK_SHIELDS_DISPLAY_OFFSET_X','isHpEffect','getElementIdWithName','refresh','drawIcon','BattleLayout','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_X','create','standardIconHeight','resetBreakShield','toUpperCase','isSceneBattle','_breakShieldSprite','isAppeared','drawItemStatus','inBattle','removeBattleStates','actorId','calcUserElementDamageFlat','StunIcon','description','BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME','_subject','clamp','NUM','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X','getColor','ConvertParams','_lineHeight','shouldDisplay','_lastIconIndex','startBreakShieldBrokenAnimation','_srcBitmap','filter','updateAttachedSprites','getProtectedWeaknessElements','1750533aloWQh','calcUserElementDamageRate','applyBreakStun','enemy','_breakStunned','Base','normalColor','updateBreakShieldIconSprite','STR','isEnemy','drawText','isSTB','BattleManager_setup','BREAK_SHIELDS_REDUCE_ANIMATION','_numberValue','standardIconWidth','actor%1-breakShieldIcon','MenuStatusBreakShieldIcons','applyChangeBreakShield','contents','status','list','ARRAYSTR','_resettingBreakShield','drawItemStatusBreakShields','breakStunTextColor','_autoPositioning','target','StunAniID','ProtectIcon','anchor','parameters','initMembers','setup','_needRefreshAllEnemyWeaknessWindows','resetFontSettings','BreakShields','BREAK_SHIELDS_STUN_STATE','VisuMZ_4_MultiLayerHpGauge','updateNumber','STRUCT','BattleStatusDisplayIcons','call','IconSet','itemRectWithPadding','351999gVOlKp','blt','_actor','_calcRawBreakShieldEleRate','EnemyOffsetX','version','max','opacity','initialize','onBreakStunJS','prototype','reduceRedundancy','breakShields','VisuMZ_1_BattleCore','FUNC','parse','ActorOffsetY','iconIndex','addChild','Game_Action_applyItemUserEffect','note','executeDamage','push','show','NameAttachShieldIcon','topBreakShield','map','_iconIndex','ceil','BREAK_SHIELDS_DISPLAY_AUTO','Sprite_Enemy_initMembers','calcElementRate','849436itCIsz','Settings','BREAK_SHIELDS_MAX','requestFauxAnimation','loadSystem','Sprite_Enemy_setBattler','clear','Game_Action_calcUserElementDamageRate','updateBreakShieldMultiLayerHpGauge','BREAK_SHIELDS_ACTORS','_elementIDs','ARRAYFUNC','Compatibility','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y','BREAK_SHIELDS_DEFAULT_REDUCTION','_stateTurns','createBreakShieldIconSprite','test','ARRAYJSON','ReduceAniID','replace','EVAL','placeBreakShieldIcon','BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE','numberFontFace','updateIcon','iconWidth','drawActorIcons','FontSize','width','iconHeight','portrait','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','647306wigfhw','resetBreakShields','createAttachedSprites','calcUserElementDamagePlus','originalElementRate','isBreakShieldIconDisplayed','BREAK_SHIELDS_ENEMIES','findTargetSprite','BattleStatusAutoPosition','fontFace','isBreakStunned','BaseBreakShields','_inBattle','ActorDisplayPosition','trim','7908BqTkBC','currentClass','isAffectedByBreakShield','floor','StunState','isStateAffected','Sprite_Actor_setBattler','3198176ydLTaZ','contains','center','constructor','6XgHoKe','BREAK_SHIELDS_BASE','setBattler','BattleCore','_scene','shouldDisplayBreakShields','createNumberDisplay','drawItemStatusBreakShieldsDefault','Game_Action_calcUserElementDamagePlus','EnemyDisplayPosition','ActorDisplayIcon','deathStateId','BREAK_SHIELDS_STUN_ANIMATION'];_0xdab4=function(){return _0x515234;};return _0xdab4();}Sprite_BreakShieldIcon[_0x2ad534(0xf2)]=Object[_0x2ad534(0x9e)](Sprite['prototype']),Sprite_BreakShieldIcon[_0x2ad534(0xf2)]['constructor']=Sprite_BreakShieldIcon,Sprite_BreakShieldIcon['prototype']['initialize']=function(){const _0x50d618=_0x2ad534;Sprite['prototype'][_0x50d618(0xf0)]['call'](this),this[_0x50d618(0xdb)](),this[_0x50d618(0x192)](),this[_0x50d618(0x149)]();},Sprite_BreakShieldIcon[_0x2ad534(0xf2)][_0x2ad534(0xdb)]=function(){const _0xe03cc8=_0x2ad534;this[_0xe03cc8(0x90)]=null,this['_autoPositioning']=![],this[_0xe03cc8(0x103)]=0x0,this[_0xe03cc8(0xc9)]='',this['_displayValue']='',this[_0xe03cc8(0xd9)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_BreakShieldIcon[_0x2ad534(0xf2)]['loadBitmap']=function(){const _0x13cef6=_0x2ad534;this['bitmap']=new Bitmap(ImageManager[_0x13cef6(0x122)],ImageManager[_0x13cef6(0x126)]),this['_srcBitmap']=ImageManager[_0x13cef6(0x10c)](_0x13cef6(0xe6));},Sprite_BreakShieldIcon[_0x2ad534(0xf2)]['createNumberDisplay']=function(){const _0x3237a7=_0x2ad534;this['_numberSprite']=new Sprite(),this[_0x3237a7(0x184)][_0x3237a7(0x18c)]=new Bitmap(ImageManager['iconWidth'],ImageManager[_0x3237a7(0x126)]),this[_0x3237a7(0x184)][_0x3237a7(0xd9)]['x']=0.5,this['_numberSprite'][_0x3237a7(0xd9)]['y']=0.5,this[_0x3237a7(0xfa)](this[_0x3237a7(0x184)]);},Sprite_BreakShieldIcon[_0x2ad534(0xf2)]['setup']=function(_0x1714e5,_0x48f611){const _0x4d7c7e=_0x2ad534;this[_0x4d7c7e(0x90)]!==_0x1714e5&&(this[_0x4d7c7e(0x90)]=_0x1714e5),this['_autoPositioning']=_0x48f611;},Sprite_BreakShieldIcon[_0x2ad534(0xf2)][_0x2ad534(0x188)]=function(){const _0x25fd09=_0x2ad534;Sprite[_0x25fd09(0xf2)][_0x25fd09(0x188)][_0x25fd09(0xe5)](this),this[_0x25fd09(0xb4)]()?(this[_0x25fd09(0xef)]=0xff,this[_0x25fd09(0x121)](),this['updateFrame'](),this[_0x25fd09(0xe2)](),this['updateAutoPosition']()):this['opacity']=0x0;},Sprite_BreakShieldIcon[_0x2ad534(0xf2)][_0x2ad534(0xb4)]=function(){const _0x5906d2=_0x2ad534;return this[_0x5906d2(0x90)]&&this['_battler'][_0x5906d2(0xa4)]()&&this[_0x5906d2(0x90)][_0x5906d2(0x13a)]();},Sprite_BreakShieldIcon[_0x2ad534(0xf2)][_0x2ad534(0x121)]=function(){const _0xf36447=_0x2ad534;if(this['_battler'][_0xf36447(0x15b)]()){const _0x50e09c=$dataStates[this['_battler'][_0xf36447(0x14e)]()];_0x50e09c&&_0x50e09c[_0xf36447(0xf9)]>0x0?this[_0xf36447(0x103)]=_0x50e09c[_0xf36447(0xf9)]:this[_0xf36447(0x103)]=0x0,this[_0xf36447(0xc9)]='';}else{if(this[_0xf36447(0x90)][_0xf36447(0x133)]()){const _0x16bc4b=$dataStates[Game_Battler[_0xf36447(0xe0)]];_0x16bc4b&&_0x16bc4b[_0xf36447(0xf9)]>0x0?this[_0xf36447(0x103)]=_0x16bc4b['iconIndex']:this[_0xf36447(0x103)]=ImageManager[_0xf36447(0x92)];if(ImageManager[_0xf36447(0x94)]){this[_0xf36447(0xc9)]=this[_0xf36447(0x90)][_0xf36447(0x117)][_0x16bc4b['id']]||0x0;if(this[_0xf36447(0xc9)]<=0x0)this[_0xf36447(0xc9)]='';}else this[_0xf36447(0xc9)]='';}else this[_0xf36447(0x103)]=ImageManager[_0xf36447(0x18d)],this[_0xf36447(0xc9)]=this[_0xf36447(0x90)]['currentBreakShield']();}},Sprite_BreakShieldIcon[_0x2ad534(0xf2)]['updateFrame']=function(){const _0x16da45=_0x2ad534;if(this[_0x16da45(0xb5)]===this[_0x16da45(0x103)])return;this[_0x16da45(0xb5)]=this[_0x16da45(0x103)];const _0x194eb0=ImageManager[_0x16da45(0x122)],_0xdff74b=ImageManager[_0x16da45(0x126)],_0x353468=this[_0x16da45(0x103)]%0x10*_0x194eb0,_0x2d1f1f=Math[_0x16da45(0x13b)](this[_0x16da45(0x103)]/0x10)*_0xdff74b,_0x54d0b3=this[_0x16da45(0xb7)],_0x4082b6=this[_0x16da45(0x18c)];_0x4082b6[_0x16da45(0x10e)](),_0x4082b6[_0x16da45(0xe9)](_0x54d0b3,_0x353468,_0x2d1f1f,_0x194eb0,_0xdff74b,0x0,0x0,_0x4082b6[_0x16da45(0x125)],_0x4082b6[_0x16da45(0x190)]);},Sprite_BreakShieldIcon['prototype']['updateNumber']=function(){const _0x93bec0=_0x2ad534;if(this[_0x93bec0(0x16f)]===this[_0x93bec0(0xc9)]&&this['_breakStunned']===this['_battler']['isBreakStunned']())return;this[_0x93bec0(0x16f)]=this['_numberValue'],this[_0x93bec0(0xbf)]=this[_0x93bec0(0x90)][_0x93bec0(0x133)]();const _0x177111=this[_0x93bec0(0x184)][_0x93bec0(0x18c)];_0x177111[_0x93bec0(0x132)]=$gameSystem['numberFontFace'](),_0x177111['fontSize']=VisuMZ[_0x93bec0(0xdf)][_0x93bec0(0x109)]['UI'][_0x93bec0(0x124)],_0x177111[_0x93bec0(0x10e)](),_0x177111[_0x93bec0(0x17f)]=this[_0x93bec0(0xd4)](),_0x177111[_0x93bec0(0xc5)](this[_0x93bec0(0x16f)],0x0,0x0,_0x177111['width'],_0x177111[_0x93bec0(0x190)],_0x93bec0(0x141));},Sprite_BreakShieldIcon['prototype'][_0x2ad534(0xd4)]=function(){const _0x135003=_0x2ad534;if(this[_0x135003(0x90)][_0x135003(0x133)]()){const _0x147f7f=VisuMZ['BreakShields'][_0x135003(0x109)]['UI'][_0x135003(0x171)]??0x12;return ColorManager[_0x135003(0xb1)](_0x147f7f);}else return ColorManager[_0x135003(0xc1)]();},Sprite_BreakShieldIcon['prototype'][_0x2ad534(0x175)]=function(){const _0x4ffd90=_0x2ad534;if(!this[_0x4ffd90(0xd5)])return;if(!SceneManager['isSceneBattle']())return;if(!SceneManager['_scene'][_0x4ffd90(0x151)])return;const _0x4f166d=SceneManager[_0x4ffd90(0x147)][_0x4ffd90(0x151)][_0x4ffd90(0x130)](this[_0x4ffd90(0x90)]);if(!_0x4f166d)return;const _0x2bfc90=this['_battler']['isActor']()?Sprite_Actor:Sprite_Enemy,_0x262739=_0x2bfc90['BREAK_SHIELD_BATTLER_DISPLAY_POSITION'];this['x']=0x0;if(_0x262739[_0x4ffd90(0x18e)](/left/i))this['x']=Math[_0x4ffd90(0x13b)](_0x4f166d[_0x4ffd90(0x125)]/-0x2);else _0x262739['match'](/right/i)&&(this['x']=Math[_0x4ffd90(0x104)](_0x4f166d[_0x4ffd90(0x125)]/0x2));this['x']+=_0x2bfc90[_0x4ffd90(0xb0)],this['y']=0x0;if(_0x262739[_0x4ffd90(0x18e)](/top/i))this['y']=_0x4f166d[_0x4ffd90(0x190)]*-0x1;else _0x262739[_0x4ffd90(0x18e)](/middle/i)&&(this['y']=Math[_0x4ffd90(0x17a)](_0x4f166d[_0x4ffd90(0x190)]*-0.5));this['y']+=_0x2bfc90[_0x4ffd90(0x17e)];};Imported[_0x2ad534(0xf5)]&&Sprite_Enemy[_0x2ad534(0xac)]&&(VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x157)]=Sprite_EnemyName[_0x2ad534(0xf2)][_0x2ad534(0x12b)],Sprite_EnemyName['prototype']['createAttachedSprites']=function(){const _0x5496e6=_0x2ad534;VisuMZ[_0x5496e6(0xdf)]['Sprite_EnemyName_createAttachedSprites'][_0x5496e6(0xe5)](this),this[_0x5496e6(0xa3)]=new Sprite_BreakShieldIcon(),this[_0x5496e6(0xfa)](this[_0x5496e6(0xa3)]);},VisuMZ['BreakShields'][_0x2ad534(0x17c)]=Sprite_EnemyName[_0x2ad534(0xf2)]['updateAttachedSprites'],Sprite_EnemyName[_0x2ad534(0xf2)][_0x2ad534(0xb9)]=function(){const _0x13f36b=_0x2ad534;VisuMZ[_0x13f36b(0xdf)][_0x13f36b(0x17c)][_0x13f36b(0xe5)](this),this[_0x13f36b(0xc2)]();},Sprite_EnemyName[_0x2ad534(0xf2)]['updateBreakShieldIconSprite']=function(){const _0x181cd4=_0x2ad534;if(!this[_0x181cd4(0xa3)])return;this[_0x181cd4(0x90)]!==this[_0x181cd4(0xa3)]['_battler']&&this[_0x181cd4(0xa3)][_0x181cd4(0xdc)](this[_0x181cd4(0x90)],![]);const _0x44c0ed=this['textWidth']();this[_0x181cd4(0xb3)]=this[_0x181cd4(0xb3)]||Window_Base[_0x181cd4(0xf2)][_0x181cd4(0x15f)](),this['_breakShieldSprite']['x']=Math[_0x181cd4(0x17a)]((_0x44c0ed+ImageManager[_0x181cd4(0x122)])/-0x2)-0x8,this['_breakShieldSprite']['y']=this[_0x181cd4(0xb3)]/0x2,this[_0x181cd4(0xa3)]['x']+=Sprite_Enemy[_0x181cd4(0x9d)]||0x0,this[_0x181cd4(0xa3)]['y']+=Sprite_Enemy[_0x181cd4(0x115)]||0x0,this['updateBreakShieldMultiLayerHpGauge']();},Sprite_EnemyName[_0x2ad534(0xf2)][_0x2ad534(0x110)]=function(){const _0x359f40=_0x2ad534;if(!Imported[_0x359f40(0xe1)])return;if(!this[_0x359f40(0x90)]['showMultiLayerHpGauge']())return;if(!Sprite_MultiLayerHpStates[_0x359f40(0x17b)]['breakShields'])return;const _0x4b6d73=VisuMZ[_0x359f40(0x15a)][_0x359f40(0x114)]['battler'][_0x359f40(0xf3)];_0x4b6d73[_0x359f40(0xf4)]&&Sprite_MultiLayerHpStates[_0x359f40(0x17b)]['show']&&(this[_0x359f40(0xa3)]['y']+=Graphics[_0x359f40(0x190)]*0xa);});;function _0x5f58(_0x238d56,_0x185693){const _0xdab4bc=_0xdab4();return _0x5f58=function(_0x5f585e,_0x40ffca){_0x5f585e=_0x5f585e-0x87;let _0x4e5bd4=_0xdab4bc[_0x5f585e];return _0x4e5bd4;},_0x5f58(_0x238d56,_0x185693);}Window_Base[_0x2ad534(0xf2)][_0x2ad534(0x178)]=function(_0x4d6e03,_0x360496,_0x2f77df){const _0x7e4d22=_0x2ad534;if(!_0x4d6e03)return;const _0x39829a=this[_0x7e4d22(0x90)],_0x35a67a=this[_0x7e4d22(0x103)],_0x4ebe93=this['_numberValue'];this['_battler']=_0x4d6e03,Sprite_BreakShieldIcon['prototype'][_0x7e4d22(0x121)][_0x7e4d22(0xe5)](this),this[_0x7e4d22(0x9b)](this['_iconIndex'],_0x360496,_0x2f77df),this[_0x7e4d22(0xde)](),this[_0x7e4d22(0xce)][_0x7e4d22(0x132)]=$gameSystem[_0x7e4d22(0x120)](),this[_0x7e4d22(0xce)][_0x7e4d22(0x95)]=VisuMZ['BreakShields'][_0x7e4d22(0x109)]['UI'][_0x7e4d22(0x124)],this['contents']['textColor']=this[_0x7e4d22(0x90)]['isBreakStunned']()?ColorManager[_0x7e4d22(0xb1)](VisuMZ[_0x7e4d22(0xdf)][_0x7e4d22(0x109)]['UI'][_0x7e4d22(0x171)]):ColorManager[_0x7e4d22(0xc1)](),this[_0x7e4d22(0xce)][_0x7e4d22(0xc5)](this[_0x7e4d22(0xc9)],_0x360496,_0x2f77df,ImageManager[_0x7e4d22(0x122)],ImageManager[_0x7e4d22(0x126)],_0x7e4d22(0x141)),this['_battler']=_0x39829a,this[_0x7e4d22(0x103)]=_0x35a67a,this[_0x7e4d22(0xc9)]=_0x4ebe93,this[_0x7e4d22(0xde)]();},Window_StatusBase[_0x2ad534(0x152)]=VisuMZ['BreakShields'][_0x2ad534(0x109)]['UI'][_0x2ad534(0xcc)],VisuMZ[_0x2ad534(0xdf)]['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x2ad534(0xf2)][_0x2ad534(0x123)],Window_StatusBase['prototype'][_0x2ad534(0x123)]=function(_0x5e822c,_0x3de481,_0x2f33a3,_0x394d85){const _0x4ad9c0=_0x2ad534;_0x394d85=_0x394d85||0x90;if(this[_0x4ad9c0(0x148)](_0x5e822c)){const _0x3512d8=ImageManager[_0x4ad9c0(0xca)]||0x20,_0x2210d3=ImageManager[_0x4ad9c0(0x9f)]||0x20,_0x52b37f=_0x3de481+Math['round'](_0x3512d8/0x2),_0x75d43b=_0x2f33a3+Math[_0x4ad9c0(0x17a)](_0x2210d3/0x2)+0x2;this[_0x4ad9c0(0x11e)](_0x5e822c,_0x52b37f,_0x75d43b),_0x3de481+=_0x3512d8,_0x394d85-=_0x3512d8;}VisuMZ[_0x4ad9c0(0xdf)]['Window_StatusBase_drawActorIcons'][_0x4ad9c0(0xe5)](this,_0x5e822c,_0x3de481,_0x2f33a3,_0x394d85);},Window_StatusBase[_0x2ad534(0xf2)]['shouldDisplayBreakShields']=function(_0xea973d){const _0x11f93f=_0x2ad534;if(!_0xea973d)return![];if(!Window_StatusBase[_0x11f93f(0x152)])return![];if(_0xea973d[_0x11f93f(0x163)]())return Game_Battler['BREAK_SHIELDS_ACTORS'];else return _0xea973d[_0x11f93f(0xc4)]()?Game_Battler[_0x11f93f(0x12f)]:!![];},Window_StatusBase[_0x2ad534(0xf2)][_0x2ad534(0x11e)]=function(_0x3e3692,_0x1c992e,_0x65f964){const _0x3f675a=_0x2ad534,_0x483c17=(_0x3e3692[_0x3f675a(0x163)]()?_0x3e3692[_0x3f675a(0xa8)]():_0x3e3692['_enemyId'])||0x0,_0x6670c2=_0x3f675a(0xcb)[_0x3f675a(0x16c)](_0x483c17),_0x4b46d2=this['createInnerSprite'](_0x6670c2,Sprite_BreakShieldIcon);_0x4b46d2[_0x3f675a(0xdc)](_0x3e3692,![]),_0x4b46d2['move'](_0x1c992e,_0x65f964),_0x4b46d2[_0x3f675a(0xff)]();},Window_BattleStatus['BREAK_SHIELDS_DISPLAY_ICONS']=VisuMZ[_0x2ad534(0xdf)]['Settings']['UI'][_0x2ad534(0xe4)],Window_BattleStatus['BREAK_SHIELDS_DISPLAY_AUTO']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0x131)],Window_BattleStatus[_0x2ad534(0x97)]=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI'][_0x2ad534(0x18f)],Window_BattleStatus['BREAK_SHIELDS_DISPLAY_OFFSET_Y']=VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x109)]['UI']['BattleStatusOffsetY'],VisuMZ[_0x2ad534(0xdf)][_0x2ad534(0x194)]=Window_BattleStatus[_0x2ad534(0xf2)][_0x2ad534(0xa5)],Window_BattleStatus[_0x2ad534(0xf2)][_0x2ad534(0xa5)]=function(_0x13da45){const _0x3f001d=_0x2ad534;VisuMZ['BreakShields'][_0x3f001d(0x194)][_0x3f001d(0xe5)](this,_0x13da45),this[_0x3f001d(0xd3)](_0x13da45);},Window_BattleStatus[_0x2ad534(0xf2)]['drawItemStatusBreakShields']=function(_0x542f89){const _0x3baa45=_0x2ad534;if(!Window_BattleStatus['BREAK_SHIELDS_DISPLAY_ICONS'])return;if(!Game_Battler[_0x3baa45(0x111)])return;const _0x257f79=this[_0x3baa45(0x168)](_0x542f89);if(!_0x257f79['isAffectedByBreakShield']())return;if(!Window_BattleStatus[_0x3baa45(0x105)])this[_0x3baa45(0x14a)](_0x542f89);else!Imported[_0x3baa45(0xf5)]?this[_0x3baa45(0x14a)](_0x542f89):this['drawItemStatusBreakBattleCore'](_0x542f89);},Window_BattleStatus['prototype'][_0x2ad534(0x14a)]=function(_0x59c012){const _0x5b53b4=_0x2ad534,_0x1a5936=ImageManager[_0x5b53b4(0xca)]||0x20,_0xe1b310=ImageManager[_0x5b53b4(0x9f)]||0x20,_0x4a0c18=this[_0x5b53b4(0x168)](_0x59c012),_0x19b9aa=this[_0x5b53b4(0xe7)](_0x59c012),_0x96c137=Math[_0x5b53b4(0x17a)](_0x1a5936/0x2);let _0x5343ee=_0x19b9aa['x']+_0x96c137-0x4+Window_BattleStatus[_0x5b53b4(0x97)],_0xb60082=_0x19b9aa['y']+_0x96c137+0x4+Window_BattleStatus[_0x5b53b4(0x176)];this[_0x5b53b4(0x11e)](_0x4a0c18,_0x5343ee,_0xb60082);},Window_BattleStatus[_0x2ad534(0xf2)]['drawItemStatusBreakBattleCore']=function(_0x5c3892){const _0x200da3=_0x2ad534,_0x10fb69=ImageManager[_0x200da3(0xca)]||0x20,_0x248307=ImageManager['standardIconHeight']||0x20,_0x12cf9a=this[_0x200da3(0x168)](_0x5c3892),_0x164e75=this['itemRect'](_0x5c3892),_0x5b2c55=Math[_0x200da3(0x17a)](_0x164e75['x']+(_0x164e75['width']-0x80)/0x2),_0x4c70db=this['nameY'](_0x164e75),_0xb615af=Math[_0x200da3(0x17a)](_0x10fb69/0x2);let _0x3d4881=_0x5b2c55-_0xb615af-0x4,_0x2a2526=_0x4c70db+_0xb615af;_0x3d4881-_0x10fb69/0x2<_0x164e75['x']&&(_0x3d4881=_0x5b2c55+_0xb615af-0x4,_0x2a2526=_0x4c70db-_0xb615af);let _0x393144=_0x164e75['x']+_0xb615af+0x4,_0x489316=_0x164e75['y']+_0xb615af+0x4;const _0x1d352b=this['battleLayoutStyle']();switch(_0x1d352b){case _0x200da3(0xd0):!VisuMZ[_0x200da3(0x146)][_0x200da3(0x109)][_0x200da3(0x9c)][_0x200da3(0x87)]&&(_0x393144=_0x164e75['x']+_0x164e75[_0x200da3(0x125)]-_0x10fb69);break;case'xp':case _0x200da3(0x127):case _0x200da3(0x180):case _0x200da3(0x156):_0x393144=_0x3d4881,_0x489316=_0x2a2526+_0x248307;break;}_0x393144+=Window_BattleStatus[_0x200da3(0x97)],_0x489316+=Window_BattleStatus[_0x200da3(0x176)],this[_0x200da3(0x11e)](_0x12cf9a,_0x393144,_0x489316);};