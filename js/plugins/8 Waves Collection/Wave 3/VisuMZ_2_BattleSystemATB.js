//=============================================================================
// VisuStella MZ - Battle System - ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.34] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
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
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 *     - Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 * Marker Sprites
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
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
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
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
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
 * Version 1.34: March 20, 2025
 * * Bug Fixes!
 * ** Field ATB Gauge no longer stays visible during victory sequence. Fix
 *    made by Olivia.
 * 
 * Version 1.33: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an actor softlock issue where if charm, berserk, and confusion can
 *    lock a 100% charged actor for Active ATB.
 * * Documentation Update!
 * ** Added extra clarification for Plugin Parameter "Stuns Reset Gauge?":
 * *** Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a few features that bled over into CTB if the game project used
 *    both ATB and CTB battle systems simultaneously. Fix made by Olivia.
 * * Feature Update!
 * ** "Stuns Reset Gauge" set to "Don't Reset" should now work as expected for
 *    both actors and enemies, instead of just actors, while they are in the
 *    casting state. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.31: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where sideview battlers would have misplaced ATB gauge
 *    positions. Fix made by Olivia.
 * 
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 * 
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 * 
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 * 
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 * 
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 * 
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 * 
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
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
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"true","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default true
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
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
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
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
 * @default 10
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
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x4d3181=_0x1db9;(function(_0x59ae61,_0x3e7924){const _0x4726cf=_0x1db9,_0x57bbee=_0x59ae61();while(!![]){try{const _0x1196b9=-parseInt(_0x4726cf(0x15e))/0x1*(-parseInt(_0x4726cf(0x110))/0x2)+-parseInt(_0x4726cf(0x243))/0x3*(-parseInt(_0x4726cf(0xf8))/0x4)+-parseInt(_0x4726cf(0x14f))/0x5+-parseInt(_0x4726cf(0x212))/0x6*(-parseInt(_0x4726cf(0x23c))/0x7)+parseInt(_0x4726cf(0x26c))/0x8+-parseInt(_0x4726cf(0x14d))/0x9+-parseInt(_0x4726cf(0x8e))/0xa;if(_0x1196b9===_0x3e7924)break;else _0x57bbee['push'](_0x57bbee['shift']());}catch(_0x37e72e){_0x57bbee['push'](_0x57bbee['shift']());}}}(_0x451d,0x99908));var label=_0x4d3181(0x142),tier=tier||0x0,dependencies=[_0x4d3181(0xaa)],pluginData=$plugins[_0x4d3181(0x128)](function(_0x34a08e){const _0x2c9b0e=_0x4d3181;return _0x34a08e[_0x2c9b0e(0x1e4)]&&_0x34a08e[_0x2c9b0e(0xfd)][_0x2c9b0e(0xf6)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4d3181(0x10d)]||{},VisuMZ[_0x4d3181(0x252)]=function(_0x2044e7,_0x3ce29c){const _0x842159=_0x4d3181;for(const _0x33a3c5 in _0x3ce29c){if(_0x33a3c5[_0x842159(0x217)](/(.*):(.*)/i)){const _0x8945a4=String(RegExp['$1']),_0x33752e=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x2021e9,_0x191f4b,_0x2e40ef;switch(_0x33752e){case _0x842159(0xd1):_0x2021e9=_0x3ce29c[_0x33a3c5]!==''?Number(_0x3ce29c[_0x33a3c5]):0x0;break;case _0x842159(0x251):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b[_0x842159(0xb7)](_0x404bdb=>Number(_0x404bdb));break;case _0x842159(0x20f):_0x2021e9=_0x3ce29c[_0x33a3c5]!==''?eval(_0x3ce29c[_0x33a3c5]):null;break;case _0x842159(0x113):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON['parse'](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b[_0x842159(0xb7)](_0x49bedc=>eval(_0x49bedc));break;case'JSON':_0x2021e9=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):'';break;case _0x842159(0x1c4):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b[_0x842159(0xb7)](_0x413eb3=>JSON['parse'](_0x413eb3));break;case _0x842159(0x24e):_0x2021e9=_0x3ce29c[_0x33a3c5]!==''?new Function(JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5])):new Function('return\x200');break;case _0x842159(0x1cf):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON['parse'](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b['map'](_0x5c7e21=>new Function(JSON['parse'](_0x5c7e21)));break;case'STR':_0x2021e9=_0x3ce29c[_0x33a3c5]!==''?String(_0x3ce29c[_0x33a3c5]):'';break;case _0x842159(0x12d):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b[_0x842159(0xb7)](_0x1acd05=>String(_0x1acd05));break;case _0x842159(0x263):_0x2e40ef=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):{},_0x2021e9=VisuMZ[_0x842159(0x252)]({},_0x2e40ef);break;case _0x842159(0x19a):_0x191f4b=_0x3ce29c[_0x33a3c5]!==''?JSON[_0x842159(0x13e)](_0x3ce29c[_0x33a3c5]):[],_0x2021e9=_0x191f4b[_0x842159(0xb7)](_0x443082=>VisuMZ[_0x842159(0x252)]({},JSON[_0x842159(0x13e)](_0x443082)));break;default:continue;}_0x2044e7[_0x8945a4]=_0x2021e9;}}return _0x2044e7;},(_0x87b54e=>{const _0xe291c1=_0x4d3181,_0x3b30d2=_0x87b54e[_0xe291c1(0x242)];for(const _0x2b8207 of dependencies){if(!Imported[_0x2b8207]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x3b30d2,_0x2b8207)),SceneManager['exit']();break;}}const _0x562288=_0x87b54e[_0xe291c1(0xfd)];if(_0x562288['match'](/\[Version[ ](.*?)\]/i)){const _0x16d7d3=Number(RegExp['$1']);_0x16d7d3!==VisuMZ[label][_0xe291c1(0x9c)]&&(alert(_0xe291c1(0x9b)['format'](_0x3b30d2,_0x16d7d3)),SceneManager[_0xe291c1(0x214)]());}if(_0x562288[_0xe291c1(0x217)](/\[Tier[ ](\d+)\]/i)){const _0x4cec41=Number(RegExp['$1']);_0x4cec41<tier?(alert(_0xe291c1(0x260)[_0xe291c1(0xf0)](_0x3b30d2,_0x4cec41,tier)),SceneManager[_0xe291c1(0x214)]()):tier=Math['max'](_0x4cec41,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0xe291c1(0x10d)],_0x87b54e[_0xe291c1(0xf3)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x4d3181(0x137),_0x52f479=>{const _0x43ac08=_0x4d3181;VisuMZ[_0x43ac08(0x252)](_0x52f479,_0x52f479);const _0x4b8215=_0x52f479['Actors'],_0x3acf96=_0x52f479[_0x43ac08(0x101)];for(const _0x2cbc19 of _0x4b8215){const _0x21db17=$gameActors[_0x43ac08(0x221)](_0x2cbc19);if(!_0x21db17)continue;_0x21db17[_0x43ac08(0xf2)]=_0x43ac08(0x195),_0x21db17[_0x43ac08(0x12a)]=_0x3acf96;}}),PluginManager['registerCommand'](pluginData['name'],_0x4d3181(0x15c),_0x126d8b=>{const _0x5bfb4b=_0x4d3181;VisuMZ['ConvertParams'](_0x126d8b,_0x126d8b);const _0x2c2c1b=_0x126d8b[_0x5bfb4b(0xc8)],_0x35f3de=_0x126d8b[_0x5bfb4b(0x25c)],_0x7f1c5e=_0x126d8b['FaceIndex'];for(const _0x67a713 of _0x2c2c1b){const _0x11be85=$gameActors[_0x5bfb4b(0x221)](_0x67a713);if(!_0x11be85)continue;_0x11be85[_0x5bfb4b(0xf2)]='face',_0x11be85['_fieldAtbGaugeFaceName']=_0x35f3de,_0x11be85[_0x5bfb4b(0x169)]=_0x7f1c5e;}}),PluginManager[_0x4d3181(0x165)](pluginData[_0x4d3181(0x242)],_0x4d3181(0x161),_0x4cb459=>{const _0xa7fcb7=_0x4d3181;VisuMZ['ConvertParams'](_0x4cb459,_0x4cb459);const _0x596d60=_0x4cb459['Actors'];for(const _0xa65fde of _0x596d60){const _0x5dfa40=$gameActors[_0xa7fcb7(0x221)](_0xa65fde);if(!_0x5dfa40)continue;_0x5dfa40[_0xa7fcb7(0x152)]();}}),PluginManager[_0x4d3181(0x165)](pluginData['name'],_0x4d3181(0x1a7),_0x8de23=>{const _0x5c0168=_0x4d3181;VisuMZ[_0x5c0168(0x252)](_0x8de23,_0x8de23);const _0x4213eb=_0x8de23[_0x5c0168(0x157)],_0x253299=_0x8de23[_0x5c0168(0x101)];for(const _0x27e97b of _0x4213eb){const _0x4b945e=$gameTroop[_0x5c0168(0x1f1)]()[_0x27e97b];if(!_0x4b945e)continue;_0x4b945e[_0x5c0168(0xf2)]=_0x5c0168(0x195),_0x4b945e['_fieldAtbGaugeIconIndex']=_0x253299;}}),PluginManager[_0x4d3181(0x165)](pluginData[_0x4d3181(0x242)],_0x4d3181(0x261),_0x1b0b98=>{const _0x2a81a4=_0x4d3181;VisuMZ[_0x2a81a4(0x252)](_0x1b0b98,_0x1b0b98);const _0x261a9e=_0x1b0b98['Enemies'],_0x197449=_0x1b0b98[_0x2a81a4(0x25c)],_0x55562d=_0x1b0b98['FaceIndex'];for(const _0x564d3f of _0x261a9e){const _0x3390e5=$gameTroop[_0x2a81a4(0x1f1)]()[_0x564d3f];if(!_0x3390e5)continue;_0x3390e5[_0x2a81a4(0xf2)]=_0x2a81a4(0x170),_0x3390e5['_fieldAtbGaugeFaceName']=_0x197449,_0x3390e5[_0x2a81a4(0x169)]=_0x55562d;}}),PluginManager[_0x4d3181(0x165)](pluginData[_0x4d3181(0x242)],_0x4d3181(0x1de),_0x19bf54=>{const _0x330fc5=_0x4d3181;VisuMZ['ConvertParams'](_0x19bf54,_0x19bf54);const _0x9d3db8=_0x19bf54[_0x330fc5(0x157)];for(const _0x18abe8 of _0x9d3db8){const _0x4d163f=$gameTroop[_0x330fc5(0x1f1)]()[_0x18abe8];if(!_0x4d163f)continue;_0x4d163f[_0x330fc5(0x152)]();}}),PluginManager[_0x4d3181(0x165)](pluginData[_0x4d3181(0x242)],_0x4d3181(0xa6),_0x19fdcb=>{const _0x294fc9=_0x4d3181;VisuMZ[_0x294fc9(0x252)](_0x19fdcb,_0x19fdcb);const _0x14f4c2=_0x19fdcb[_0x294fc9(0x16c)];$gameSystem[_0x294fc9(0x194)](_0x14f4c2);}),VisuMZ[_0x4d3181(0x142)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x4d3181(0x130)],Scene_Boot[_0x4d3181(0x1ff)][_0x4d3181(0x130)]=function(){const _0x136d35=_0x4d3181;this[_0x136d35(0x153)](),VisuMZ[_0x136d35(0x142)][_0x136d35(0x14e)][_0x136d35(0x1c0)](this),this[_0x136d35(0x116)]();},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x1d2)]={},Scene_Boot['prototype'][_0x4d3181(0x153)]=function(){const _0x4b7313=_0x4d3181,_0x297c16=VisuMZ[_0x4b7313(0x1af)][_0x4b7313(0x1d2)],_0x34cc5a=_0x4b7313(0x12f),_0x43e1e8=['Charge',_0x4b7313(0x1d9),_0x4b7313(0x148)];for(const _0x26975b of _0x43e1e8){const _0x40b761=_0x34cc5a[_0x4b7313(0xf0)](_0x26975b[_0x4b7313(0x24c)]()['trim'](),_0x4b7313(0x1e0),'(?:GAUGE|TIME|SPEED)'),_0x3c8409=new RegExp(_0x40b761,'i');VisuMZ[_0x4b7313(0x142)][_0x4b7313(0x1d2)][_0x26975b]=_0x3c8409;}},Scene_Boot[_0x4d3181(0x1ff)][_0x4d3181(0x116)]=function(){const _0x5864ef=_0x4d3181;if(VisuMZ['ParseAllNotetags'])return;const _0x25b326=$dataSkills[_0x5864ef(0x264)]($dataItems);for(const _0x2a835b of _0x25b326){if(!_0x2a835b)continue;VisuMZ[_0x5864ef(0x142)][_0x5864ef(0x215)](_0x2a835b);}},VisuMZ[_0x4d3181(0x142)]['ParseSkillNotetags']=VisuMZ[_0x4d3181(0x237)],VisuMZ['ParseSkillNotetags']=function(_0x30cf32){const _0x2e4a6c=_0x4d3181;VisuMZ['BattleSystemATB'][_0x2e4a6c(0x237)][_0x2e4a6c(0x1c0)](this,_0x30cf32),VisuMZ[_0x2e4a6c(0x142)][_0x2e4a6c(0x215)](_0x30cf32);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xcf)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x4d3181(0xcf)]=function(_0x229d26){const _0x2a81ca=_0x4d3181;VisuMZ[_0x2a81ca(0x142)]['ParseItemNotetags'][_0x2a81ca(0x1c0)](this,_0x229d26),VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x229d26);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x215)]=function(_0x51758e){const _0xf1a84e=_0x4d3181,_0x544950=[_0xf1a84e(0x20a),'Cast',_0xf1a84e(0x148)];for(const _0x350c50 of _0x544950){VisuMZ['BattleSystemATB'][_0xf1a84e(0x234)](_0x51758e,_0x350c50);}},VisuMZ[_0x4d3181(0x142)]['JS']={},VisuMZ[_0x4d3181(0x142)]['createJS']=function(_0x190e68,_0x5c698d){const _0x467834=_0x4d3181,_0x1de873=_0x190e68[_0x467834(0xec)];if(_0x1de873[_0x467834(0x217)](VisuMZ[_0x467834(0x142)][_0x467834(0x1d2)][_0x5c698d])){const _0x200eae=String(RegExp['$1']),_0x1a7da3=_0x467834(0xb6)[_0x467834(0xf0)](_0x200eae,_0x5c698d),_0x53f304=VisuMZ[_0x467834(0x142)][_0x467834(0xca)](_0x190e68,_0x5c698d);VisuMZ[_0x467834(0x142)]['JS'][_0x53f304]=new Function(_0x1a7da3);}},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xca)]=function(_0x2afb4b,_0x33a25f){const _0x58f430=_0x4d3181;if(VisuMZ['createKeyJS'])return VisuMZ[_0x58f430(0xca)](_0x2afb4b,_0x33a25f);let _0xff4ab9='';if($dataActors[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9=_0x58f430(0x18a)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataClasses[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9=_0x58f430(0x1a2)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataSkills['includes'](_0x2afb4b))_0xff4ab9=_0x58f430(0x16e)['format'](_0x2afb4b['id'],_0x33a25f);if($dataItems[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9=_0x58f430(0xd5)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataWeapons[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9='Weapon-%1-%2'[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataArmors['includes'](_0x2afb4b))_0xff4ab9=_0x58f430(0xef)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataEnemies[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9=_0x58f430(0x1cd)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);if($dataStates[_0x58f430(0xf6)](_0x2afb4b))_0xff4ab9=_0x58f430(0x24a)[_0x58f430(0xf0)](_0x2afb4b['id'],_0x33a25f);return _0xff4ab9;},ConfigManager[_0x4d3181(0xb3)]=!![],VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x18f)]=ConfigManager[_0x4d3181(0x179)],ConfigManager[_0x4d3181(0x179)]=function(){const _0x45d544=_0x4d3181,_0x409988=VisuMZ[_0x45d544(0x142)][_0x45d544(0x18f)][_0x45d544(0x1c0)](this);return _0x409988[_0x45d544(0xb3)]=this[_0x45d544(0xb3)],_0x409988;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x225)]=ConfigManager[_0x4d3181(0x14a)],ConfigManager[_0x4d3181(0x14a)]=function(_0x53acdf){const _0x3b03df=_0x4d3181;VisuMZ[_0x3b03df(0x142)][_0x3b03df(0x225)][_0x3b03df(0x1c0)](this,_0x53acdf),'visualAtbGauge'in _0x53acdf?this[_0x3b03df(0xb3)]=_0x53acdf['visualAtbGauge']:this[_0x3b03df(0xb3)]=!![];},ImageManager[_0x4d3181(0x1a1)]=ImageManager[_0x4d3181(0x1a1)]||0x9,ImageManager[_0x4d3181(0xce)]=ImageManager['svActorVertCells']||0x6,TextManager[_0x4d3181(0xb3)]=VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x10d)][_0x4d3181(0x18b)][_0x4d3181(0x1c2)],VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x127)]=ColorManager[_0x4d3181(0x20e)],ColorManager['loadWindowskin']=function(){const _0x268684=_0x4d3181;VisuMZ['BattleSystemATB'][_0x268684(0x127)][_0x268684(0x1c0)](this),this[_0x268684(0x151)][_0x268684(0x23d)](this[_0x268684(0xc1)][_0x268684(0x20d)](this));},ColorManager[_0x4d3181(0x1e3)]=function(_0x43e154){const _0x125500=_0x4d3181;return _0x43e154=String(_0x43e154),_0x43e154['match'](/#(.*)/i)?_0x125500(0x149)[_0x125500(0xf0)](String(RegExp['$1'])):this[_0x125500(0x18d)](Number(_0x43e154));},ColorManager['setupBattleSystemATBColors']=function(){const _0x571a27=_0x4d3181,_0x1cbc08=[_0x571a27(0xad),'full',_0x571a27(0x138),_0x571a27(0xb1),_0x571a27(0x1dd),_0x571a27(0x22c)],_0x2cd415=VisuMZ[_0x571a27(0x142)][_0x571a27(0x10d)][_0x571a27(0x11a)];this['_atbColors']={};for(const _0x30d677 of _0x1cbc08){for(let _0x2dbfd2=0x1;_0x2dbfd2<=0x2;_0x2dbfd2++){const _0x5f4497=_0x30d677+_0x2dbfd2;this[_0x571a27(0x1bb)][_0x5f4497]=this[_0x571a27(0x1e3)](_0x2cd415[_0x5f4497]);}}},ColorManager[_0x4d3181(0x17b)]=function(_0x4a6f48){const _0x46361d=_0x4d3181;if(this[_0x46361d(0x1bb)]===undefined)this['setupBattleSystemATBColors']();return this[_0x46361d(0x1bb)][_0x4a6f48]||_0x46361d(0xbf);},SceneManager[_0x4d3181(0x96)]=function(){const _0x199568=_0x4d3181;return this[_0x199568(0x135)]&&this[_0x199568(0x135)][_0x199568(0x11c)]===Scene_Battle;},BattleManager[_0x4d3181(0x131)]=function(){const _0x314c76=_0x4d3181;if(Imported[_0x314c76(0x181)]&&this[_0x314c76(0x1c3)]())return![];return this[_0x314c76(0x17f)]();},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xb9)]=BattleManager[_0x4d3181(0xbd)],BattleManager['isActiveTpb']=function(){const _0x5dcea4=_0x4d3181;if(!this[_0x5dcea4(0x17f)]())return![];else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager['atbActive']:VisuMZ[_0x5dcea4(0x142)][_0x5dcea4(0xb9)][_0x5dcea4(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)]['Game_System_initialize']=Game_System[_0x4d3181(0x1ff)][_0x4d3181(0xa0)],Game_System[_0x4d3181(0x1ff)][_0x4d3181(0xa0)]=function(){const _0x59d97f=_0x4d3181;VisuMZ[_0x59d97f(0x142)][_0x59d97f(0xf1)][_0x59d97f(0x1c0)](this),this[_0x59d97f(0x216)]();},Game_System[_0x4d3181(0x1ff)][_0x4d3181(0x216)]=function(){this['_atbFieldGaugeVisible']=!![];},Game_System[_0x4d3181(0x1ff)][_0x4d3181(0x1b0)]=function(){const _0x4c297d=_0x4d3181;return this['_atbFieldGaugeVisible']===undefined&&this['initBattleSystemATB'](),this[_0x4c297d(0xa9)];},Game_System[_0x4d3181(0x1ff)]['setBattleSystemATBFieldGaugeVisible']=function(_0x45092a){const _0x571e22=_0x4d3181;this[_0x571e22(0xa9)]===undefined&&this[_0x571e22(0x216)](),this['_atbFieldGaugeVisible']=_0x45092a;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x1d5)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x4d3181(0x1ff)][_0x4d3181(0xc4)]=function(_0xc122f9){const _0x4e610a=_0x4d3181;VisuMZ['BattleSystemATB'][_0x4e610a(0x1d5)][_0x4e610a(0x1c0)](this,_0xc122f9),this['applyBattleSystemATBUserEffect'](_0xc122f9);},Game_Action['prototype'][_0x4d3181(0x188)]=function(_0x11be10){const _0x124382=_0x4d3181;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x124382(0x131)]())return;if(this[_0x124382(0x187)]())this[_0x124382(0x13f)](_0x11be10);},Game_Action[_0x4d3181(0x1ff)][_0x4d3181(0x13f)]=function(_0x151dd7){const _0x49e597=_0x4d3181,_0x4df018=this[_0x49e597(0x187)]()['note'];if(_0x151dd7['isAtbChargingState']()){const _0x182da6=VisuMZ[_0x49e597(0x142)][_0x49e597(0xca)](this[_0x49e597(0x187)](),_0x49e597(0x20a));if(VisuMZ[_0x49e597(0x142)]['JS'][_0x182da6]){const _0x1f9b11=VisuMZ[_0x49e597(0x142)]['JS'][_0x182da6][_0x49e597(0x1c0)](this,this['subject'](),_0x151dd7);_0x151dd7['setAtbChargeTime'](_0x1f9b11);}_0x4df018['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x151dd7[_0x49e597(0x191)](Number(RegExp['$1'])*0.01),_0x4df018['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x151dd7[_0x49e597(0x1ab)](Number(RegExp['$1'])*0.01);}else{if(_0x151dd7['isAtbCastingState']()){const _0x39cd9c=VisuMZ[_0x49e597(0x142)][_0x49e597(0xca)](this[_0x49e597(0x187)](),_0x49e597(0x1d9));if(VisuMZ[_0x49e597(0x142)]['JS'][_0x39cd9c]){const _0xe5d415=VisuMZ[_0x49e597(0x142)]['JS'][_0x39cd9c][_0x49e597(0x1c0)](this,this[_0x49e597(0x98)](),_0x151dd7);_0x151dd7[_0x49e597(0xe1)](_0xe5d415);}_0x4df018[_0x49e597(0x217)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x151dd7[_0x49e597(0xe1)](Number(RegExp['$1'])*0.01),_0x4df018[_0x49e597(0x217)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x151dd7['changeAtbCastTime'](Number(RegExp['$1'])*0.01),_0x4df018['match'](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x151dd7[_0x49e597(0x21e)]();}}},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x262)]=Game_Action[_0x4d3181(0x1ff)][_0x4d3181(0xd8)],Game_Action[_0x4d3181(0x1ff)][_0x4d3181(0xd8)]=function(){const _0x4f82a2=_0x4d3181;VisuMZ[_0x4f82a2(0x142)][_0x4f82a2(0x262)][_0x4f82a2(0x1c0)](this),this[_0x4f82a2(0x21b)]();},Game_Action[_0x4d3181(0x1ff)]['applyGlobalBattleSystemATBEffects']=function(){const _0x4a525c=_0x4d3181;if(!this[_0x4a525c(0x187)]())return;if(!BattleManager[_0x4a525c(0x131)]())return;const _0x4e4d97=this[_0x4a525c(0x187)]()[_0x4a525c(0xec)];let _0x231fad=0x0;this[_0x4a525c(0x213)]&&(_0x231fad=this[_0x4a525c(0x98)]()[_0x4a525c(0xfa)]);const _0x19aff1=VisuMZ[_0x4a525c(0x142)][_0x4a525c(0xca)](this[_0x4a525c(0x187)](),_0x4a525c(0x148));VisuMZ[_0x4a525c(0x142)]['JS'][_0x19aff1]&&(_0x231fad=VisuMZ[_0x4a525c(0x142)]['JS'][_0x19aff1][_0x4a525c(0x1c0)](this,this[_0x4a525c(0x98)](),this['subject']()));let _0x4ddee1=this['item']()[_0x4a525c(0x228)]>0x0?this[_0x4a525c(0x187)]()[_0x4a525c(0x228)]:0x0;if(this[_0x4a525c(0x145)]())_0x4ddee1+=this[_0x4a525c(0x98)]()['attackSpeed']();_0x231fad+=(_0x4ddee1/0xfa0)[_0x4a525c(0x26e)](0x0,0x1);this['item']()[_0x4a525c(0xec)][_0x4a525c(0x217)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x231fad=Number(RegExp['$1'])*0.01);const _0x2320d3=this[_0x4a525c(0x98)]()[_0x4a525c(0xa5)]()[_0x4a525c(0x264)](this[_0x4a525c(0x98)]()[_0x4a525c(0x117)]()),_0x1d4e88=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x29eec6=_0x2320d3['map'](_0xd74d8e=>_0xd74d8e&&_0xd74d8e[_0x4a525c(0xec)]['match'](_0x1d4e88)?Number(RegExp['$1'])*0.01:0x0);_0x231fad=_0x29eec6[_0x4a525c(0x1ce)]((_0x537fa1,_0xfb763b)=>_0x537fa1+_0xfb763b,_0x231fad),this[_0x4a525c(0x187)]()[_0x4a525c(0xec)][_0x4a525c(0x217)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x231fad=0xa),this['subject']()['setAtbAfterSpeed'](_0x231fad);},Game_BattlerBase[_0x4d3181(0x1ff)]['setAtbChargeTime']=function(_0x55b515){const _0x178e63=_0x4d3181;this[_0x178e63(0xfa)]=_0x55b515['clamp'](0x0,0x1);},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x1ab)]=function(_0x165ce1){const _0x3a2ed8=_0x4d3181;this[_0x3a2ed8(0x191)](this[_0x3a2ed8(0xfa)]+_0x165ce1);},Game_BattlerBase['prototype']['setAtbCastTime']=function(_0x5b10dd){const _0x59e0ba=_0x4d3181,_0xb19002=this[_0x59e0ba(0x15f)]();this[_0x59e0ba(0x9e)]=(_0xb19002*_0x5b10dd)[_0x59e0ba(0x26e)](0x0,_0xb19002);},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0xbe)]=function(_0x15ba77){const _0x831fce=_0x4d3181,_0x505600=this[_0x831fce(0x15f)](),_0x180581=_0x505600*_0x15ba77;this[_0x831fce(0x9e)]=(this[_0x831fce(0x9e)]+_0x180581)[_0x831fce(0x26e)](0x0,_0x505600);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xba)]=Game_BattlerBase['prototype'][_0x4d3181(0x16f)],Game_BattlerBase[_0x4d3181(0x1ff)]['die']=function(){const _0x26da77=_0x4d3181;VisuMZ[_0x26da77(0x142)][_0x26da77(0xba)][_0x26da77(0x1c0)](this),BattleManager[_0x26da77(0x131)]()&&this[_0x26da77(0x24d)]();},VisuMZ[_0x4d3181(0x142)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x10f)],Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x10f)]=function(){const _0x5d1ade=_0x4d3181;VisuMZ[_0x5d1ade(0x142)][_0x5d1ade(0x1f9)][_0x5d1ade(0x1c0)](this),BattleManager['isATB']()&&this[_0x5d1ade(0x24d)]();},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x12b)]=Game_Battler['prototype']['initTpbChargeTime'],Game_Battler['prototype'][_0x4d3181(0x1f7)]=function(_0x2e250c){const _0x2050e5=_0x4d3181;BattleManager['isATB']()?this[_0x2050e5(0x200)](_0x2e250c):VisuMZ[_0x2050e5(0x142)][_0x2050e5(0x12b)][_0x2050e5(0x1c0)](this,_0x2e250c);},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x200)]=function(_0x950011){const _0x5caf7f=_0x4d3181,_0xb6c0c7=VisuMZ['BattleSystemATB']['Settings'][_0x5caf7f(0x204)];let _0x1211e4=this['tpbRelativeSpeed']()*eval(_0xb6c0c7[_0x5caf7f(0x1b2)]);const _0x3ffc86=this[_0x5caf7f(0xa5)]()[_0x5caf7f(0x264)](this[_0x5caf7f(0x117)]()),_0x1de46d=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0xbdb742=_0x3ffc86[_0x5caf7f(0xb7)](_0x31619a=>_0x31619a&&_0x31619a[_0x5caf7f(0xec)][_0x5caf7f(0x217)](_0x1de46d)?Number(RegExp['$1'])*0.01:0x0);_0x1211e4=_0xbdb742[_0x5caf7f(0x1ce)]((_0x365c69,_0x505d70)=>_0x365c69+_0x505d70,_0x1211e4),this[_0x5caf7f(0x10c)]='charging',this['_tpbChargeTime']=(_0x950011?0x1:_0x1211e4)[_0x5caf7f(0x26e)](0x0,0x1),this[_0x5caf7f(0x1b1)]()&&(this[_0x5caf7f(0xfa)]=0x0);},Game_Battler['prototype'][_0x4d3181(0x105)]=function(){const _0x5ae1b7=_0x4d3181;return this['_tpbState']===_0x5ae1b7(0x107);},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x18e)]=function(){const _0x53c5e3=_0x4d3181;return this[_0x53c5e3(0x10c)]===_0x53c5e3(0x19d)&&this[_0x53c5e3(0xcc)]()&&this[_0x53c5e3(0xcc)]()[_0x53c5e3(0x187)]()&&this['currentAction']()[_0x53c5e3(0x187)]()[_0x53c5e3(0x228)]<0x0;},Game_BattlerBase['prototype']['getAtbCastTimeRate']=function(){const _0x220462=_0x4d3181;return this[_0x220462(0x18e)]()?this[_0x220462(0x9e)]/this[_0x220462(0x15f)]():0x0;},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0xe0)]=function(){return!this['canMove']();},Game_Battler['prototype'][_0x4d3181(0x22a)]=function(_0x3b9480){const _0x1761e1=_0x4d3181;this[_0x1761e1(0xe7)]=_0x3b9480;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xeb)]=BattleManager[_0x4d3181(0x241)],BattleManager[_0x4d3181(0x241)]=function(_0x103462){const _0x29ab01=_0x4d3181;this[_0x29ab01(0x131)]()&&!_0x103462['canMove']()&&(_0x103462[_0x29ab01(0x22d)]=!![]),VisuMZ['BattleSystemATB'][_0x29ab01(0xeb)][_0x29ab01(0x1c0)](this,_0x103462),_0x103462[_0x29ab01(0x17d)]()&&this['isATB']()&&!_0x103462[_0x29ab01(0x1d8)]()&&(_0x103462[_0x29ab01(0x22d)]=![]);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x156)]=Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x24d)],Game_Battler[_0x4d3181(0x1ff)]['clearTpbChargeTime']=function(){const _0x434886=_0x4d3181;if(this[_0x434886(0x22d)])return;VisuMZ[_0x434886(0x142)][_0x434886(0x156)][_0x434886(0x1c0)](this),this[_0x434886(0xfa)]+=this['_atbAfterSpeed']||0x0;},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x21e)]=function(){const _0x46a979=_0x4d3181;if(!this[_0x46a979(0x18e)]())return;if(!this[_0x46a979(0xcc)]())return;if(!this[_0x46a979(0xcc)]()[_0x46a979(0x187)]())return;if(this[_0x46a979(0xcc)]()[_0x46a979(0x187)]()[_0x46a979(0xec)][_0x46a979(0x217)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x46a979(0x103)](),this[_0x46a979(0x24d)](),this['_tpbCastTime']=0x0,this[_0x46a979(0x20b)]();},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x20b)]=function(){const _0x3b8249=_0x4d3181,_0x3c9709=VisuMZ[_0x3b8249(0x142)][_0x3b8249(0x10d)]['Interrupt'];if(Imported[_0x3b8249(0xf5)]){const _0x392458=_0x3c9709['InterruptAnimationID'],_0x349a49=_0x3c9709[_0x3b8249(0x168)],_0x37f753=_0x3c9709['InterruptMute'];$gameTemp[_0x3b8249(0xc0)]([this],_0x392458,_0x349a49,_0x37f753);}if(this['battler']()&&_0x3c9709[_0x3b8249(0x10b)][_0x3b8249(0x223)]>0x0){const _0x2c7c09=_0x3c9709[_0x3b8249(0x10b)],_0x1cb269={'textColor':ColorManager[_0x3b8249(0x1e3)](_0x3c9709[_0x3b8249(0x129)]),'flashColor':_0x3c9709[_0x3b8249(0xfe)],'flashDuration':_0x3c9709['InterruptFlashDuration']};this[_0x3b8249(0x21a)](_0x2c7c09,_0x1cb269);}},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xd9)]=Game_Battler[_0x4d3181(0x1ff)]['startTpbCasting'],Game_Battler[_0x4d3181(0x1ff)]['startTpbCasting']=function(){const _0x547f30=_0x4d3181;VisuMZ['BattleSystemATB'][_0x547f30(0xd9)][_0x547f30(0x1c0)](this),BattleManager[_0x547f30(0x131)]()&&(this['_tpbCastTime']>=this[_0x547f30(0x15f)]()&&(this[_0x547f30(0x10c)]=_0x547f30(0x203)));},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x108)]=Game_Unit[_0x4d3181(0x1ff)]['updateTpb'],Game_Unit[_0x4d3181(0x1ff)]['updateTpb']=function(){const _0x5009b3=_0x4d3181;if(BattleManager['isATB']()){if(BattleManager[_0x5009b3(0x22e)]()[_0x5009b3(0x1c9)](_0x2917ef=>_0x2917ef&&_0x2917ef['isAlive']()&&_0x2917ef[_0x5009b3(0x19e)]()&&_0x2917ef['_tpbState']===_0x5009b3(0x203)))return;}VisuMZ[_0x5009b3(0x142)]['Game_Unit_updateTpb'][_0x5009b3(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xfc)]=Game_Battler['prototype']['onRestrict'],Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x177)]=function(){const _0x247fdb=_0x4d3181,_0x51cb7d=VisuMZ[_0x247fdb(0x142)][_0x247fdb(0x10d)][_0x247fdb(0x204)],_0x3a581a=this[_0x247fdb(0xc2)]();!_0x51cb7d[_0x247fdb(0x136)]&&_0x3a581a>=0x4&&(this['_onRestrictBypassAtbReset']=BattleManager[_0x247fdb(0x131)]()),VisuMZ['BattleSystemATB']['Game_Battler_onRestrict'][_0x247fdb(0x1c0)](this),BattleManager[_0x247fdb(0x131)]()&&this[_0x247fdb(0x10c)]===_0x247fdb(0x173)&&this[_0x247fdb(0x17d)]()&&(this[_0x247fdb(0x222)]=!![]),this[_0x247fdb(0x22d)]=undefined;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x125)]=Game_Battler[_0x4d3181(0x1ff)]['clearActions'],Game_Battler['prototype']['clearActions']=function(){const _0x489afd=_0x4d3181;if(this[_0x489afd(0x22d)]&&BattleManager[_0x489afd(0x131)]())return;VisuMZ[_0x489afd(0x142)][_0x489afd(0x125)]['call'](this);},VisuMZ['BattleSystemATB'][_0x4d3181(0x1bc)]=Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0xd7)],Game_Battler['prototype']['removeState']=function(_0x478800){const _0x5be880=_0x4d3181,_0x34c9d5=!this[_0x5be880(0x1d8)]()&&BattleManager[_0x5be880(0x131)](),_0x1eb405=this[_0x5be880(0x8f)](_0x478800);VisuMZ['BattleSystemATB']['Game_Battler_removeState'][_0x5be880(0x1c0)](this,_0x478800);if(!BattleManager[_0x5be880(0x131)]())return;if(this[_0x5be880(0x17d)]()&&_0x1eb405&&!this[_0x5be880(0x8f)](_0x478800))_0x34c9d5&&this[_0x5be880(0x1d8)]()&&this[_0x5be880(0x222)]&&(this[_0x5be880(0x24d)](),this[_0x5be880(0x103)](),this['_tpbCastTime']=0x0),this['setActionState']('undecided');else _0x34c9d5&&this[_0x5be880(0x1d8)]()&&this[_0x5be880(0x265)]()<=0x0&&(this[_0x5be880(0x1d4)](),this['_tpbState']='charging',this['_onRestrictBypassAtbReset']=undefined);},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x250)]=function(){const _0x5252ac=_0x4d3181;this[_0x5252ac(0xdb)]('PreStartTurnJS'),this[_0x5252ac(0x22f)]=![],this[_0x5252ac(0x266)]++,this[_0x5252ac(0x198)]=0x0,this[_0x5252ac(0xa7)]()&&this[_0x5252ac(0x258)](),this[_0x5252ac(0xdb)](_0x5252ac(0x235));},Game_Battler['prototype'][_0x4d3181(0xa7)]=function(){const _0x3cf845=_0x4d3181;if(this[_0x3cf845(0x265)]()!==0x0)return![];if(BattleManager[_0x3cf845(0x131)]()){if(this[_0x3cf845(0x17d)]()){if(!this[_0x3cf845(0x1c7)]())return![];}}return!![];},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xd6)]=Game_Battler[_0x4d3181(0x1ff)]['applyTpbPenalty'],Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x150)]=function(){const _0x4a991e=_0x4d3181;BattleManager['isATB']()?this[_0x4a991e(0x1ca)]():VisuMZ[_0x4a991e(0x142)][_0x4a991e(0xd6)]['call'](this);},Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x1ca)]=function(){const _0xa6d0ae=_0x4d3181;this[_0xa6d0ae(0x10c)]='charging',this[_0xa6d0ae(0xfa)]+=VisuMZ['BattleSystemATB']['Settings'][_0xa6d0ae(0x204)][_0xa6d0ae(0x211)]||0x0;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x206)]=Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x109)],Game_Battler['prototype'][_0x4d3181(0x109)]=function(){const _0x456fa7=_0x4d3181;return BattleManager[_0x456fa7(0x131)]()?VisuMZ[_0x456fa7(0x142)][_0x456fa7(0x10d)][_0x456fa7(0x204)][_0x456fa7(0xe2)][_0x456fa7(0x1c0)](this,this):VisuMZ[_0x456fa7(0x142)][_0x456fa7(0x206)][_0x456fa7(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x171)]=Game_Battler['prototype'][_0x4d3181(0x1a0)],Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x1a0)]=function(){const _0x266661=_0x4d3181;return BattleManager[_0x266661(0x131)]()?VisuMZ['BattleSystemATB'][_0x266661(0x10d)][_0x266661(0x204)]['TpbBaseSpeedCalcJS'][_0x266661(0x1c0)](this,this):VisuMZ[_0x266661(0x142)][_0x266661(0x171)][_0x266661(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)]['Game_Battler_tpbRelativeSpeed']=Game_Battler['prototype'][_0x4d3181(0x9a)],Game_Battler[_0x4d3181(0x1ff)]['tpbRelativeSpeed']=function(){const _0x351622=_0x4d3181;return BattleManager[_0x351622(0x131)]()?VisuMZ[_0x351622(0x142)][_0x351622(0x10d)][_0x351622(0x204)][_0x351622(0x1a8)][_0x351622(0x1c0)](this,this):VisuMZ[_0x351622(0x142)][_0x351622(0x99)][_0x351622(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x246)]=Game_Battler['prototype']['tpbAcceleration'],Game_Battler['prototype']['tpbAcceleration']=function(){const _0x32bec5=_0x4d3181;return BattleManager[_0x32bec5(0x131)]()?this[_0x32bec5(0x13a)]():VisuMZ['BattleSystemATB'][_0x32bec5(0x246)][_0x32bec5(0x1c0)](this);},Game_Battler[_0x4d3181(0x1ff)]['atbAcceleration']=function(){const _0x33b754=_0x4d3181;let _0x378f07=VisuMZ[_0x33b754(0x142)][_0x33b754(0x10d)][_0x33b754(0x204)][_0x33b754(0x267)]['call'](this,this);if(ConfigManager&&ConfigManager['atbSpeed']!==undefined){const _0x25f4d9=ConfigManager[_0x33b754(0xb0)]-0x3;if(_0x25f4d9>0x0)return _0x378f07*(_0x25f4d9*0x2);else{if(_0x25f4d9<0x0)return _0x378f07*(0x1/(_0x25f4d9*-0x2));}}return _0x378f07;},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x91)]=Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x15f)],Game_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x15f)]=function(){const _0x28974e=_0x4d3181;if(BattleManager[_0x28974e(0x131)]()){const _0xa181e6=this['_actions']['map'](_0x4bb2df=>_0x4bb2df[_0x28974e(0x187)]());for(const _0x17d64b of _0xa181e6){if(!_0x17d64b)continue;_0x17d64b['_originalSpeed']=_0x17d64b[_0x28974e(0xb2)]??_0x17d64b[_0x28974e(0x228)];}let _0x5d4655=VisuMZ['BattleSystemATB']['Settings'][_0x28974e(0x204)]['TpbCastTimeJS'][_0x28974e(0x1c0)](this,this);for(const _0x4c6b12 of _0xa181e6){if(!_0x4c6b12)continue;_0x4c6b12[_0x28974e(0x228)]=_0x4c6b12[_0x28974e(0xb2)];}return _0x5d4655;}else return VisuMZ[_0x28974e(0x142)][_0x28974e(0x91)]['call'](this);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xf9)]=Scene_Options[_0x4d3181(0x1ff)][_0x4d3181(0x1fc)],Scene_Options[_0x4d3181(0x1ff)][_0x4d3181(0x1fc)]=function(){const _0x21f714=_0x4d3181;let _0x285ec6=VisuMZ['BattleSystemATB'][_0x21f714(0xf9)][_0x21f714(0x1c0)](this);const _0x482c52=VisuMZ[_0x21f714(0x142)][_0x21f714(0x10d)];if(_0x482c52[_0x21f714(0x18b)][_0x21f714(0xd4)]&&_0x482c52[_0x21f714(0x18b)]['AdjustRect']&&BattleManager[_0x21f714(0x131)]())_0x285ec6++;return _0x285ec6;},Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x23a)]=function(){const _0xb8e7ac=_0x4d3181;if(!BattleManager['isATB']())return;if(!ConfigManager['visualAtbGauge'])return;const _0x302876=VisuMZ[_0xb8e7ac(0x142)][_0xb8e7ac(0x10d)]['Gauge'],_0x8c050e=new Sprite_Gauge();_0x8c050e['anchor']['x']=_0x302876['AnchorX'],_0x8c050e['anchor']['y']=_0x302876[_0xb8e7ac(0x14b)],_0x8c050e[_0xb8e7ac(0x17e)]['x']=_0x8c050e[_0xb8e7ac(0x17e)]['y']=_0x302876[_0xb8e7ac(0x24f)],this[_0xb8e7ac(0x25a)]=_0x8c050e,this[_0xb8e7ac(0x155)](this['_atbGaugeSprite']);},VisuMZ[_0x4d3181(0x142)]['Sprite_Battler_setBattler']=Sprite_Battler['prototype'][_0x4d3181(0x257)],Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x257)]=function(_0x5421d5){const _0x2764c6=_0x4d3181;VisuMZ['BattleSystemATB']['Sprite_Battler_setBattler']['call'](this,_0x5421d5),this[_0x2764c6(0xcb)](_0x5421d5),this[_0x2764c6(0x16b)]();},Sprite_Battler[_0x4d3181(0x1ff)]['setupAtbGaugeSprite']=function(_0x4cbf92){const _0x13cbe7=_0x4d3181;if(!_0x4cbf92)return;if(!this[_0x13cbe7(0x25a)])return;if(_0x4cbf92[_0x13cbe7(0x1b8)]()){}else{if(_0x4cbf92[_0x13cbe7(0x17d)]()){if(this[_0x13cbe7(0x11c)]===Sprite_Enemy&&_0x4cbf92[_0x13cbe7(0x1f5)]())return;if(this[_0x13cbe7(0x11c)]===Sprite_SvEnemy&&!_0x4cbf92[_0x13cbe7(0x1f5)]())return;}}this[_0x13cbe7(0x25a)][_0x13cbe7(0x26b)](_0x4cbf92,'time');},Sprite_Battler['prototype'][_0x4d3181(0x16b)]=function(){const _0x3b1992=_0x4d3181;if(!this[_0x3b1992(0x25a)])return;const _0x4c7bd1=this[_0x3b1992(0x184)]&&this['_battler'][_0x3b1992(0x19e)]()&&!this['_battler'][_0x3b1992(0x1fe)]();this[_0x3b1992(0x25a)][_0x3b1992(0xf4)]=_0x4c7bd1,this[_0x3b1992(0xdc)]&&this[_0x3b1992(0xdc)]['_atbGaugeSprite']&&(this['_svBattlerSprite'][_0x3b1992(0x25a)][_0x3b1992(0xf4)]=_0x4c7bd1);},VisuMZ[_0x4d3181(0x142)]['Sprite_Battler_updateMain']=Sprite_Battler['prototype']['updateMain'],Sprite_Battler[_0x4d3181(0x1ff)]['updateMain']=function(){const _0x352307=_0x4d3181;VisuMZ[_0x352307(0x142)][_0x352307(0x122)][_0x352307(0x1c0)](this),this[_0x352307(0xbb)]();},Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0xbb)]=function(){const _0x1108c3=_0x4d3181;if(!this[_0x1108c3(0x184)])return;if(!this['_atbGaugeSprite'])return;if(this[_0x1108c3(0x184)]&&this[_0x1108c3(0x184)][_0x1108c3(0x17d)]()&&this[_0x1108c3(0x184)]['hasSvBattler']()){if(this[_0x1108c3(0x11c)]===Sprite_Enemy)return;}const _0x9988db=VisuMZ[_0x1108c3(0x142)]['Settings'][_0x1108c3(0xbc)],_0x16683d=this['_atbGaugeSprite'];let _0x926cc8=_0x9988db[_0x1108c3(0x230)];this[_0x1108c3(0x184)]['battleUIOffsetX']&&(_0x926cc8+=this[_0x1108c3(0x184)][_0x1108c3(0x104)]());let _0x3b411e=_0x9988db[_0x1108c3(0xdf)];this[_0x1108c3(0x184)][_0x1108c3(0xf7)]&&(_0x3b411e+=this[_0x1108c3(0x184)]['battleUIOffsetY']());_0x16683d['x']=_0x926cc8;let _0x5cb706=this[_0x1108c3(0x244)];this[_0x1108c3(0x184)]&&this[_0x1108c3(0x184)][_0x1108c3(0x17d)]()&&this['_battler'][_0x1108c3(0x1f5)]()&&(_0x5cb706=this[_0x1108c3(0x184)][_0x1108c3(0x118)]()['height']||0x1),_0x16683d['y']=-_0x5cb706+_0x3b411e,this['_battler']['isEnemy']()&&(this[_0x1108c3(0x184)][_0x1108c3(0x158)]()[_0x1108c3(0xec)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x16683d[_0x1108c3(0xf4)]=![])),this[_0x1108c3(0x18c)]()&&(_0x16683d['y']+=_0x16683d[_0x1108c3(0xfb)]()*_0x9988db[_0x1108c3(0x24f)]-0x1),this[_0x1108c3(0x17e)]['x']<0x0&&(_0x16683d['scale']['x']=-Math[_0x1108c3(0x15b)](_0x16683d[_0x1108c3(0x17e)]['x']));},Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x18c)]=function(){const _0x22c2aa=_0x4d3181;if(!Imported[_0x22c2aa(0x16d)])return![];if(this[_0x22c2aa(0x184)]&&this[_0x22c2aa(0x184)][_0x22c2aa(0x17d)]())return![];const _0x286f22=VisuMZ[_0x22c2aa(0x182)]['Settings']['Aggro'];if(!_0x286f22['VisibleGauge'])return![];if(!ConfigManager['aggroGauge'])return![];const _0x35b828=VisuMZ['BattleSystemATB'][_0x22c2aa(0x10d)][_0x22c2aa(0xbc)];return _0x286f22[_0x22c2aa(0x24f)]===_0x35b828[_0x22c2aa(0x24f)]&&_0x286f22[_0x22c2aa(0x176)]===_0x35b828[_0x22c2aa(0x176)]&&_0x286f22['AnchorY']===_0x35b828[_0x22c2aa(0x14b)]&&_0x286f22[_0x22c2aa(0x230)]===_0x35b828[_0x22c2aa(0x230)]&&_0x286f22[_0x22c2aa(0xdf)]===_0x35b828[_0x22c2aa(0xdf)]&&!![];},VisuMZ[_0x4d3181(0x142)]['Sprite_Battler_update']=Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x201)],Sprite_Battler[_0x4d3181(0x1ff)][_0x4d3181(0x201)]=function(){const _0x4fd124=_0x4d3181;VisuMZ[_0x4fd124(0x142)][_0x4fd124(0x1f3)][_0x4fd124(0x1c0)](this),!this['_battler']&&this[_0x4fd124(0x25a)]&&(this[_0x4fd124(0x25a)][_0x4fd124(0xf4)]=![],this[_0x4fd124(0xdc)]&&(this['_svBattlerSprite'][_0x4fd124(0x25a)]['visible']=![]));},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x207)]=Sprite_Actor[_0x4d3181(0x1ff)][_0x4d3181(0x227)],Sprite_Actor[_0x4d3181(0x1ff)][_0x4d3181(0x227)]=function(){const _0xdd2353=_0x4d3181;VisuMZ[_0xdd2353(0x142)][_0xdd2353(0x207)][_0xdd2353(0x1c0)](this),this[_0xdd2353(0x1c8)]()&&this[_0xdd2353(0x23a)]();},Sprite_Actor[_0x4d3181(0x1ff)]['isShowAtbGauge']=function(){const _0x3551c1=_0x4d3181;return VisuMZ[_0x3551c1(0x142)][_0x3551c1(0x10d)][_0x3551c1(0xbc)][_0x3551c1(0x26a)];},Sprite_SvEnemy[_0x4d3181(0x1ff)][_0x4d3181(0x1c8)]=function(){const _0x4a1f5f=_0x4d3181;return VisuMZ[_0x4a1f5f(0x142)]['Settings']['Gauge'][_0x4a1f5f(0x247)];},VisuMZ[_0x4d3181(0x142)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy['prototype'][_0x4d3181(0xda)],Sprite_Enemy[_0x4d3181(0x1ff)][_0x4d3181(0xda)]=function(){const _0x2e8d34=_0x4d3181;VisuMZ[_0x2e8d34(0x142)][_0x2e8d34(0x10d)][_0x2e8d34(0xbc)][_0x2e8d34(0x247)]&&this[_0x2e8d34(0x23a)](),VisuMZ[_0x2e8d34(0x142)]['Sprite_Enemy_createStateIconSprite']['call'](this);},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x1f0)]=Sprite_Enemy[_0x4d3181(0x1ff)]['startEffect'],Sprite_Enemy[_0x4d3181(0x1ff)][_0x4d3181(0x229)]=function(_0x3c00e0){const _0x29fd67=_0x4d3181;VisuMZ[_0x29fd67(0x142)][_0x29fd67(0x1f0)][_0x29fd67(0x1c0)](this,_0x3c00e0),(_0x3c00e0==='appear'||_0x29fd67(0x24b))&&this[_0x29fd67(0x16b)]();},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0x21c)]=Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x253)],Game_BattlerBase['prototype'][_0x4d3181(0x253)]=function(){const _0x5e0a78=_0x4d3181;VisuMZ[_0x5e0a78(0x142)][_0x5e0a78(0x21c)][_0x5e0a78(0x1c0)](this),this[_0x5e0a78(0x17d)]()&&BattleManager[_0x5e0a78(0x131)]()&&this[_0x5e0a78(0x121)]()&&this['battler']()['updateAtbGaugeSpriteVisibility']();},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xc9)]=Sprite_Gauge[_0x4d3181(0x1ff)]['gaugeColor1'],Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x1aa)]=function(){const _0x19b8c7=_0x4d3181;if(this[_0x19b8c7(0x13b)]===_0x19b8c7(0x12e))return this[_0x19b8c7(0x16a)](0x1);return VisuMZ['BattleSystemATB'][_0x19b8c7(0xc9)][_0x19b8c7(0x1c0)](this);},VisuMZ['BattleSystemATB'][_0x4d3181(0x141)]=Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x1d6)],Sprite_Gauge['prototype'][_0x4d3181(0x1d6)]=function(){const _0x13daec=_0x4d3181;if(this[_0x13daec(0x13b)]==='time')return this[_0x13daec(0x16a)](0x2);return VisuMZ[_0x13daec(0x142)][_0x13daec(0x141)][_0x13daec(0x1c0)](this);},Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x16a)]=function(_0x2a6331){const _0x2de69f=_0x4d3181;if(!this[_0x2de69f(0x184)])return ColorManager[_0x2de69f(0x17b)]('default%1'[_0x2de69f(0xf0)](_0x2a6331));if(this['_battler'][_0x2de69f(0xe0)]())return ColorManager[_0x2de69f(0x17b)](_0x2de69f(0xd2)[_0x2de69f(0xf0)](_0x2a6331));if(this['_battler'][_0x2de69f(0x18e)]())return ColorManager[_0x2de69f(0x17b)]('cast%1'[_0x2de69f(0xf0)](_0x2a6331));if(this['gaugeRate']()>=0x1)return ColorManager[_0x2de69f(0x17b)]('full%1'['format'](_0x2a6331));const _0xf0e7b=VisuMZ[_0x2de69f(0x142)]['Settings']['Gauge'],_0xf0474f=this[_0x2de69f(0x184)][_0x2de69f(0xde)](0x6)*this[_0x2de69f(0x184)][_0x2de69f(0x21d)](0x6);if(_0xf0474f<=_0xf0e7b[_0x2de69f(0xe6)])return ColorManager[_0x2de69f(0x17b)](_0x2de69f(0xe4)['format'](_0x2a6331));if(_0xf0474f>=_0xf0e7b[_0x2de69f(0x162)])return ColorManager[_0x2de69f(0x17b)](_0x2de69f(0x209)['format'](_0x2a6331));return ColorManager['atbColor'](_0x2de69f(0x1f8)[_0x2de69f(0xf0)](_0x2a6331));},VisuMZ[_0x4d3181(0x142)][_0x4d3181(0xae)]=Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x19b)],Sprite_Gauge['prototype']['currentValue']=function(){const _0x2d04cc=_0x4d3181;if(this['_battler']&&this[_0x2d04cc(0x13b)]===_0x2d04cc(0x12e))return this[_0x2d04cc(0x100)]();return VisuMZ[_0x2d04cc(0x142)][_0x2d04cc(0xae)]['call'](this);},Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x100)]=function(){const _0x581973=_0x4d3181;return this[_0x581973(0x184)][_0x581973(0x18e)]()?Math[_0x581973(0xb8)](this[_0x581973(0x184)][_0x581973(0x9e)],0x0):VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue'][_0x581973(0x1c0)](this);},VisuMZ[_0x4d3181(0x142)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge['prototype']['currentMaxValue'],Sprite_Gauge[_0x4d3181(0x1ff)]['currentMaxValue']=function(){const _0x18b126=_0x4d3181;if(this[_0x18b126(0x184)]&&this[_0x18b126(0x13b)]==='time')return this['atbCurrentMaxValue']();return VisuMZ[_0x18b126(0x142)][_0x18b126(0x9f)][_0x18b126(0x1c0)](this);},Sprite_Gauge[_0x4d3181(0x1ff)][_0x4d3181(0x22b)]=function(){const _0x369c6a=_0x4d3181;return this[_0x369c6a(0x184)][_0x369c6a(0x18e)]()?Math[_0x369c6a(0xb8)](this[_0x369c6a(0x184)][_0x369c6a(0x15f)](),1e-9):VisuMZ[_0x369c6a(0x142)][_0x369c6a(0x9f)][_0x369c6a(0x1c0)](this);},VisuMZ['BattleSystemATB'][_0x4d3181(0x175)]=Window_Help['prototype']['setItem'],Window_Help[_0x4d3181(0x1ff)][_0x4d3181(0x15d)]=function(_0x1d2193){const _0x2114a0=_0x4d3181;BattleManager[_0x2114a0(0x131)]()&&_0x1d2193&&_0x1d2193[_0x2114a0(0xec)]&&_0x1d2193[_0x2114a0(0xec)][_0x2114a0(0x217)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x2114a0(0x268)](String(RegExp['$1'])):VisuMZ[_0x2114a0(0x142)][_0x2114a0(0x175)]['call'](this,_0x1d2193);},VisuMZ[_0x4d3181(0x142)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x4d3181(0x1ff)][_0x4d3181(0x8d)],Window_StatusBase[_0x4d3181(0x1ff)][_0x4d3181(0x8d)]=function(_0x283327,_0x410614,_0x4ab86c,_0x239759){const _0x47aa22=_0x4d3181;if(!this[_0x47aa22(0x1e1)](_0x410614))return;VisuMZ[_0x47aa22(0x142)]['Window_StatusBase_placeGauge'][_0x47aa22(0x1c0)](this,_0x283327,_0x410614,_0x4ab86c,_0x239759);},Window_StatusBase['prototype'][_0x4d3181(0x1e1)]=function(_0x1dfca5){const _0x194f6d=_0x4d3181;if(_0x1dfca5!==_0x194f6d(0x12e))return!![];if(![_0x194f6d(0x9d),_0x194f6d(0x112)][_0x194f6d(0xf6)](this[_0x194f6d(0x11c)][_0x194f6d(0x242)]))return![];if(!BattleManager[_0x194f6d(0x131)]())return![];if(!ConfigManager[_0x194f6d(0xb3)])return![];return VisuMZ[_0x194f6d(0x142)][_0x194f6d(0x10d)][_0x194f6d(0xbc)][_0x194f6d(0x1b7)];},VisuMZ['BattleSystemATB']['Window_Options_addGeneralOptions']=Window_Options[_0x4d3181(0x1ff)][_0x4d3181(0x190)],Window_Options['prototype'][_0x4d3181(0x190)]=function(){const _0x105c2d=_0x4d3181;VisuMZ[_0x105c2d(0x142)][_0x105c2d(0x1c5)][_0x105c2d(0x1c0)](this),this['addBattleSystemATBCommands']();},Window_Options['prototype'][_0x4d3181(0x1f6)]=function(){const _0x145aad=_0x4d3181;if(!BattleManager[_0x145aad(0x131)]())return;VisuMZ[_0x145aad(0x142)][_0x145aad(0x10d)]['Options'][_0x145aad(0xd4)]&&this['addBattleSystemATBShowGaugeCommand']();},Window_Options['prototype'][_0x4d3181(0x219)]=function(){const _0x212cae=_0x4d3181,_0x30dd14=TextManager['visualAtbGauge'],_0x4540d8='visualAtbGauge';this[_0x212cae(0x1ee)](_0x30dd14,_0x4540d8);},Game_BattlerBase[_0x4d3181(0x1ff)]['clearFieldAtbGraphics']=function(){const _0x3483ba=_0x4d3181;delete this['_fieldAtbGaugeGraphicType'],delete this['_fieldAtbGaugeFaceName'],delete this[_0x3483ba(0x169)],delete this[_0x3483ba(0x12a)];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x140)]=function(){const _0x540ca3=_0x4d3181;return this['_fieldAtbGaugeGraphicType']===undefined&&(this[_0x540ca3(0xf2)]=this[_0x540ca3(0x1b4)]()),this[_0x540ca3(0xf2)];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x1b4)]=function(){const _0x118b47=_0x4d3181;return Sprite_FieldGaugeATB[_0x118b47(0x10d)][_0x118b47(0x220)];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x1fd)]=function(){const _0x2b212d=_0x4d3181;return this[_0x2b212d(0x23b)]===undefined&&(this['_fieldAtbGaugeFaceName']=this['createFieldAtbGraphicFaceName']()),this[_0x2b212d(0x23b)];},Game_BattlerBase['prototype'][_0x4d3181(0x1d7)]=function(){const _0x3140e1=_0x4d3181;return Sprite_FieldGaugeATB[_0x3140e1(0x10d)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x226)]=function(){return this['_fieldAtbGaugeFaceIndex']===undefined&&(this['_fieldAtbGaugeFaceIndex']=this['createFieldAtbGraphicFaceIndex']()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0xe3)]=function(){const _0x520cf5=_0x4d3181;return Sprite_FieldGaugeATB[_0x520cf5(0x10d)][_0x520cf5(0xb4)];},Game_BattlerBase[_0x4d3181(0x1ff)]['fieldAtbGraphicIconIndex']=function(){const _0x1be78b=_0x4d3181;return this[_0x1be78b(0x12a)]===undefined&&(this[_0x1be78b(0x12a)]=this[_0x1be78b(0x144)]()),this[_0x1be78b(0x12a)];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0x144)]=function(){const _0x1fc125=_0x4d3181;return Sprite_FieldGaugeATB[_0x1fc125(0x10d)][_0x1fc125(0x124)];},Game_BattlerBase[_0x4d3181(0x1ff)][_0x4d3181(0xe5)]=function(_0x1589c3){this['_fieldAtbGaugeIconIndex']=_0x1589c3;},Game_Actor[_0x4d3181(0x1ff)][_0x4d3181(0x1b4)]=function(){const _0x3f27ff=_0x4d3181,_0x4d49c5=this['actor']()[_0x3f27ff(0xec)];if(_0x4d49c5[_0x3f27ff(0x217)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x4d49c5[_0x3f27ff(0x217)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x3f27ff(0x195);}return Sprite_FieldGaugeATB[_0x3f27ff(0x10d)][_0x3f27ff(0x1b5)];},Game_Actor[_0x4d3181(0x1ff)]['createFieldAtbGraphicFaceName']=function(){const _0x1910fb=_0x4d3181,_0x1bddf1=this[_0x1910fb(0x221)]()[_0x1910fb(0xec)];if(_0x1bddf1['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x1910fb(0xd3)]();},Game_Actor[_0x4d3181(0x1ff)]['createFieldAtbGraphicFaceIndex']=function(){const _0xe800ba=_0x4d3181,_0x12693d=this['actor']()[_0xe800ba(0xec)];if(_0x12693d[_0xe800ba(0x217)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0xe800ba(0xed)]();},Game_Actor[_0x4d3181(0x1ff)][_0x4d3181(0x144)]=function(){const _0x1fbea2=_0x4d3181,_0x425f80=this[_0x1fbea2(0x221)]()[_0x1fbea2(0xec)];if(_0x425f80[_0x1fbea2(0x217)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x1fbea2(0x10d)]['ActorBattlerIcon'];},Game_Enemy[_0x4d3181(0x1ff)][_0x4d3181(0x1b4)]=function(){const _0xaf3187=_0x4d3181,_0x316410=this[_0xaf3187(0x158)]()['note'];if(_0x316410[_0xaf3187(0x217)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0xaf3187(0x170);else{if(_0x316410[_0xaf3187(0x217)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0xaf3187(0x195);}return Sprite_FieldGaugeATB[_0xaf3187(0x10d)][_0xaf3187(0x220)];},Game_Enemy[_0x4d3181(0x1ff)][_0x4d3181(0x1d7)]=function(){const _0x9f220c=_0x4d3181,_0x245d68=this[_0x9f220c(0x158)]()[_0x9f220c(0xec)];if(_0x245d68[_0x9f220c(0x217)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x9f220c(0x10d)][_0x9f220c(0x192)];},Game_Enemy[_0x4d3181(0x1ff)][_0x4d3181(0xe3)]=function(){const _0x49d484=_0x4d3181,_0x105fec=this['enemy']()[_0x49d484(0xec)];if(_0x105fec['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x49d484(0x10d)][_0x49d484(0xb4)];},Game_Enemy['prototype'][_0x4d3181(0x144)]=function(){const _0x5656b4=_0x4d3181,_0x6e8d6b=this[_0x5656b4(0x158)]()[_0x5656b4(0xec)];if(_0x6e8d6b[_0x5656b4(0x217)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x5656b4(0x10d)][_0x5656b4(0x124)];},VisuMZ['BattleSystemATB']['Scene_Battle_createAllWindows']=Scene_Battle[_0x4d3181(0x1ff)][_0x4d3181(0x1bd)],Scene_Battle[_0x4d3181(0x1ff)][_0x4d3181(0x1bd)]=function(){const _0x569635=_0x4d3181;this[_0x569635(0x1db)](),VisuMZ[_0x569635(0x142)][_0x569635(0xc7)][_0x569635(0x1c0)](this),this['createFieldGaugeSpriteATB']();},Scene_Battle['prototype'][_0x4d3181(0x1db)]=function(){const _0x4b448b=_0x4d3181;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x4b448b(0x10d)][_0x4b448b(0x1e8)])return;if(!ConfigManager['visualAtbGauge'])return;this[_0x4b448b(0x13c)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x2f4e80=this[_0x4b448b(0x123)](this[_0x4b448b(0x106)]);this[_0x4b448b(0x193)](this[_0x4b448b(0x13c)],_0x2f4e80);},Scene_Battle[_0x4d3181(0x1ff)][_0x4d3181(0x1d1)]=function(){const _0x41ff9a=_0x4d3181;if(!BattleManager[_0x41ff9a(0x131)]())return;if(!Sprite_FieldGaugeATB[_0x41ff9a(0x10d)][_0x41ff9a(0x1e8)])return;if(!ConfigManager[_0x41ff9a(0xb3)])return;this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x41ff9a(0x13c)]['addChild'](this['_fieldGaugeATB']);};function Sprite_FieldGaugeATB(){const _0x5f0386=_0x4d3181;this[_0x5f0386(0xa0)](...arguments);}Sprite_FieldGaugeATB[_0x4d3181(0x1ff)]=Object[_0x4d3181(0xab)](Sprite[_0x4d3181(0x1ff)]),Sprite_FieldGaugeATB['prototype'][_0x4d3181(0x11c)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x4d3181(0x10d)]=JsonEx[_0x4d3181(0x115)](VisuMZ['BattleSystemATB'][_0x4d3181(0x10d)][_0x4d3181(0x1f4)]),Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0xa0)]=function(){const _0xda5e9f=_0x4d3181;Sprite[_0xda5e9f(0x1ff)][_0xda5e9f(0xa0)]['call'](this),this[_0xda5e9f(0xa4)](),this[_0xda5e9f(0x1e9)](),this['createChildren']();},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0xa4)]=function(){const _0x5f0292=_0x4d3181;this[_0x5f0292(0x25e)]['x']=0.5,this[_0x5f0292(0x25e)]['y']=0.5;},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x205)]=function(){const _0x18c782=_0x4d3181;if(this[_0x18c782(0x134)]!==undefined)return this[_0x18c782(0x134)];const _0x3d5a04=Sprite_FieldGaugeATB['Settings'][_0x18c782(0x197)];return this[_0x18c782(0x134)]=['top',_0x18c782(0x164)]['includes'](_0x3d5a04),this[_0x18c782(0x134)];},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x1e9)]=function(){const _0x51962f=_0x4d3181,_0x250771=Sprite_FieldGaugeATB[_0x51962f(0x10d)][_0x51962f(0x197)]['toLowerCase']()[_0x51962f(0x1d3)](),_0x21b895=Window_Base['prototype'][_0x51962f(0x1ac)](),_0x331314=SceneManager[_0x51962f(0x135)][_0x51962f(0x256)][_0x51962f(0x244)]+Math['round'](_0x21b895*0.5);this['_homeX']=0x0,this['_homeY']=0x0;switch(_0x250771){case _0x51962f(0x1df):this[_0x51962f(0x238)]=Math[_0x51962f(0x210)](Graphics[_0x51962f(0x232)]*0.5),this[_0x51962f(0x1b9)]=0x60;break;case _0x51962f(0x164):this[_0x51962f(0x238)]=Math[_0x51962f(0x210)](Graphics['boxWidth']*0.5),this['_homeY']=Graphics[_0x51962f(0x92)]-_0x331314;break;case _0x51962f(0x1ad):this[_0x51962f(0x238)]=0x50,this['_homeY']=Math[_0x51962f(0x210)]((Graphics['boxHeight']-_0x331314)/0x2);break;case _0x51962f(0x160):this[_0x51962f(0x238)]=Graphics['boxWidth']-0x50,this[_0x51962f(0x1b9)]=Math['round']((Graphics['boxHeight']-_0x331314)/0x2);break;}this[_0x51962f(0x238)]+=Sprite_FieldGaugeATB['Settings']['DisplayOffsetX']||0x0,this['_homeY']+=Sprite_FieldGaugeATB[_0x51962f(0x10d)]['DisplayOffsetY']||0x0,this['x']=this['_homeX'],this['y']=this[_0x51962f(0x1b9)];},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0xa2)]=function(){const _0x30caca=_0x4d3181;this[_0x30caca(0x19f)](),this[_0x30caca(0x1e6)](),this[_0x30caca(0xaf)]();},Sprite_FieldGaugeATB['prototype']['createFieldGaugeSkin']=function(){const _0x5a318c=_0x4d3181;this[_0x5a318c(0x10e)]=new Sprite(),this[_0x5a318c(0x10e)][_0x5a318c(0x25e)]['x']=0.5,this[_0x5a318c(0x10e)][_0x5a318c(0x25e)]['y']=0.5,this[_0x5a318c(0x155)](this[_0x5a318c(0x10e)]);const _0x3d797b=Sprite_FieldGaugeATB[_0x5a318c(0x10d)][_0x5a318c(0x11f)];if(_0x3d797b)this[_0x5a318c(0x10e)]['bitmap']=ImageManager[_0x5a318c(0x1e5)](_0x3d797b);},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x1e6)]=function(){const _0x19d603=_0x4d3181;this[_0x19d603(0x249)]=new Sprite(),this[_0x19d603(0x155)](this[_0x19d603(0x249)]),this['createGaugeBitmap']();},Sprite_FieldGaugeATB['prototype'][_0x4d3181(0x1a9)]=function(){const _0x487332=_0x4d3181,_0x5192d5=Sprite_FieldGaugeATB[_0x487332(0x10d)],_0x4b071e=this['isGaugeHorizontal'](),_0x3ff11a=_0x4b071e?_0x5192d5[_0x487332(0x1ea)]:_0x5192d5[_0x487332(0x254)],_0x203110=_0x4b071e?_0x5192d5[_0x487332(0x254)]:_0x5192d5[_0x487332(0x90)];this['_gaugeSprite']['bitmap']=new Bitmap(_0x3ff11a,_0x203110),this[_0x487332(0x25b)](),this[_0x487332(0x249)]['x']=Math[_0x487332(0xd0)](_0x3ff11a/-0x2),this[_0x487332(0x249)]['y']=Math[_0x487332(0xd0)](_0x203110/-0x2);},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x25b)]=function(){const _0x460b35=_0x4d3181;if(!Sprite_FieldGaugeATB[_0x460b35(0x10d)]['DrawGauge'])return;const _0x1e5ef0=Sprite_FieldGaugeATB[_0x460b35(0x10d)],_0x5ad22c=this[_0x460b35(0x249)][_0x460b35(0x218)],_0x171387=_0x5ad22c['width'],_0x2191ac=_0x5ad22c[_0x460b35(0x244)],_0x2f4e15=ColorManager[_0x460b35(0x111)](),_0x358f8a=ColorManager['ctGaugeColor1'](),_0x17d59c=ColorManager[_0x460b35(0x1e2)](),_0xec9a1b=ColorManager[_0x460b35(0x17b)]('cast1'),_0x3a4a2d=ColorManager['atbColor']('cast2'),_0x13907c=this[_0x460b35(0x205)](),_0x4a8783=_0x1e5ef0[_0x460b35(0x114)],_0x2192bb=_0x1e5ef0['GaugeSplit'][_0x460b35(0x26e)](0x0,0x1),_0x37a909=Math['ceil'](((_0x13907c?_0x171387:_0x2191ac)-0x2)*_0x2192bb);_0x5ad22c['fillRect'](0x0,0x0,_0x171387,_0x2191ac,_0x2f4e15);let _0x1e597a=0x0,_0x548774=0x0,_0x238a68=0x0,_0x432f78=0x0;if(_0x13907c&&_0x4a8783)_0x1e597a=_0x37a909-0x1,_0x238a68=_0x171387-0x3-_0x1e597a,_0x5ad22c['gradientFillRect'](0x1,0x1,_0x1e597a,_0x2191ac-0x2,_0x358f8a,_0x17d59c,![]),_0x5ad22c[_0x460b35(0x1dc)](0x2+_0x1e597a,0x1,_0x238a68,_0x2191ac-0x2,_0xec9a1b,_0x3a4a2d,![]);else{if(_0x13907c&&!_0x4a8783)_0x1e597a=_0x37a909-0x1,_0x238a68=_0x171387-0x3-_0x1e597a,_0x5ad22c[_0x460b35(0x1dc)](0x2+_0x238a68,0x1,_0x1e597a,_0x2191ac-0x2,_0x358f8a,_0x17d59c,![]),_0x5ad22c[_0x460b35(0x1dc)](0x1,0x1,_0x238a68,_0x2191ac-0x2,_0xec9a1b,_0x3a4a2d,![]);else{if(!_0x13907c&&_0x4a8783)_0x548774=_0x37a909-0x1,_0x432f78=_0x2191ac-0x3-_0x548774,_0x5ad22c[_0x460b35(0x1dc)](0x1,0x1,_0x171387-0x2,_0x548774,_0x358f8a,_0x17d59c,!![]),_0x5ad22c[_0x460b35(0x1dc)](0x1,0x2+_0x548774,_0x171387-0x2,_0x432f78,_0xec9a1b,_0x3a4a2d,!![]);else!_0x13907c&&!_0x4a8783&&(_0x548774=_0x37a909-0x1,_0x432f78=_0x2191ac-0x3-_0x548774,_0x5ad22c['gradientFillRect'](0x1,0x2+_0x432f78,_0x171387-0x2,_0x548774,_0x358f8a,_0x17d59c,!![]),_0x5ad22c[_0x460b35(0x1dc)](0x1,0x1,_0x171387-0x2,_0x432f78,_0xec9a1b,_0x3a4a2d,!![]));}}},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0xaf)]=function(){const _0x1c2f9e=_0x4d3181;this[_0x1c2f9e(0x1d0)]&&this[_0x1c2f9e(0x249)][_0x1c2f9e(0x1ae)](this[_0x1c2f9e(0x1d0)]),this['_battlerContainer']=new Sprite(),this[_0x1c2f9e(0x249)][_0x1c2f9e(0x155)](this[_0x1c2f9e(0x1d0)]),this[_0x1c2f9e(0x15a)]();},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x15a)]=function(){const _0x20f1ff=_0x4d3181;this['createEnemySprites'](),this[_0x20f1ff(0x196)]();},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)]['createEnemySprites']=function(){const _0x3b823c=_0x4d3181,_0x1e2051=$gameTroop[_0x3b823c(0x1f1)](),_0x50564e=_0x1e2051[_0x3b823c(0x223)];for(let _0x706fe0=0x0;_0x706fe0<_0x50564e;_0x706fe0++){this['createBattlerSprite'](_0x706fe0,$gameTroop);}},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x196)]=function(){const _0x5ae574=_0x4d3181,_0x3cd738=$gameParty[_0x5ae574(0xc5)]();for(let _0x1a568d=0x0;_0x1a568d<_0x3cd738;_0x1a568d++){this[_0x5ae574(0x154)](_0x1a568d,$gameParty);}},Sprite_FieldGaugeATB['prototype'][_0x4d3181(0x154)]=function(_0x26a5d1,_0x34b1c8){const _0x3999b3=_0x4d3181,_0x249dfa=new Sprite_FieldMarkerATB(_0x26a5d1,_0x34b1c8,this[_0x3999b3(0x249)]);this['_battlerContainer'][_0x3999b3(0x155)](_0x249dfa);},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x201)]=function(){const _0x4b683f=_0x4d3181;Sprite['prototype'][_0x4b683f(0x201)]['call'](this),this['updatePosition'](),this[_0x4b683f(0x1f2)](),this[_0x4b683f(0x126)]();},Sprite_FieldGaugeATB['prototype'][_0x4d3181(0x25f)]=function(){const _0x126d1d=_0x4d3181,_0x12e498=Sprite_FieldGaugeATB[_0x126d1d(0x10d)];if(_0x12e498[_0x126d1d(0x197)]!==_0x126d1d(0x1df))return;if(!_0x12e498[_0x126d1d(0xa1)])return;const _0x152a54=SceneManager[_0x126d1d(0x135)]['_helpWindow'];if(!_0x152a54)return;_0x152a54[_0x126d1d(0xf4)]?(this['x']=this['_homeX']+(_0x12e498[_0x126d1d(0x163)]||0x0),this['y']=this[_0x126d1d(0x1b9)]+(_0x12e498['RepositionTopHelpY']||0x0)):(this['x']=this[_0x126d1d(0x238)],this['y']=this[_0x126d1d(0x1b9)]);const _0x41cfb2=SceneManager[_0x126d1d(0x135)][_0x126d1d(0x106)];this['x']+=_0x41cfb2['x'],this['y']+=_0x41cfb2['y'];},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)]['updateBattleContainerOrder']=function(){const _0x1b7179=_0x4d3181;if(!this[_0x1b7179(0x1d0)])return;const _0x1d67fe=this[_0x1b7179(0x1d0)][_0x1b7179(0x183)];if(!_0x1d67fe)return;_0x1d67fe[_0x1b7179(0x19c)](this['compareBattlerSprites'][_0x1b7179(0x20d)](this));},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)][_0x4d3181(0x12c)]=function(_0x22dd18,_0x275b08){const _0x636dd=_0x4d3181,_0x5221c8=this['isGaugeHorizontal'](),_0x143ce8=Sprite_FieldGaugeATB['Settings'][_0x636dd(0x114)];if(_0x5221c8&&_0x143ce8)return _0x22dd18['x']-_0x275b08['x'];else{if(_0x5221c8&&!_0x143ce8)return _0x275b08['x']-_0x22dd18['x'];else{if(!_0x5221c8&&_0x143ce8)return _0x22dd18['y']-_0x275b08['y'];else{if(!_0x5221c8&&!_0x143ce8)return _0x275b08['y']-_0x22dd18['y'];}}}},Sprite_FieldGaugeATB[_0x4d3181(0x1ff)]['updateVisibility']=function(){const _0xddd0cb=_0x4d3181;BattleManager[_0xddd0cb(0x132)]?this['visible']=![]:this['visible']=$gameSystem[_0xddd0cb(0x1b0)]();};function _0x1db9(_0x24792f,_0xe6ca38){const _0x451d64=_0x451d();return _0x1db9=function(_0x1db948,_0x56d09b){_0x1db948=_0x1db948-0x8d;let _0x2f2ffa=_0x451d64[_0x1db948];return _0x2f2ffa;},_0x1db9(_0x24792f,_0xe6ca38);}function _0x451d(){const _0x1c5c63=['ARRAYSTRUCT','currentValue','sort','casting','isAppeared','createFieldGaugeSkin','tpbBaseSpeed','svActorHorzCells','Class-%1-%2','_graphicSv','createArrowSprite','%1SystemBorder','_graphicFaceName','FieldGaugeEnemyIcon','BattlerRelativeSpeedJS','createGaugeBitmap','gaugeColor1','changeAtbChargeTime','lineHeight','left','removeChild','BattleCore','isBattleSystemATBFieldGaugeVisible','isRestricted','InitialGaugeJS','changeIconGraphicBitmap','createFieldAtbGraphicType','ActorBattlerType','Actor','ShowStatusGauge','isActor','_homeY','_letterSprite','_atbColors','Game_Battler_removeState','createAllWindows','faceHeight','opacity','call','battlerName','Name','isCTB','ARRAYJSON','Window_Options_addGeneralOptions','%1BgColor2','isTpbCharged','isShowAtbGauge','some','applyATBPenalty','_index','processUpdateGraphic','Enemy-%1-%2','reduce','ARRAYFUNC','_battlerContainer','createFieldGaugeSpriteATB','RegExp','trim','makeActions','Game_Action_applyItemUserEffect','gaugeColor2','createFieldAtbGraphicFaceName','canMove','Cast','BorderThickness','createFieldGaugeContainerATB','gradientFillRect','slow','FieldGaugeClearEnemyGraphic','top','(?:ATB|TPB)','showVisualAtbGauge','ctGaugeColor2','getColor','status','loadSystem','createGaugeSprite','iconHeight','UseFieldGauge','setHomeLocation','GaugeLengthHorz','%1Side','IconSet','createLetterSprite','addCommand','_subject','Sprite_Enemy_startEffect','members','updateBattleContainerOrder','Sprite_Battler_update','FieldGauge','hasSvBattler','addBattleSystemATBCommands','initTpbChargeTime','default%1','Game_BattlerBase_revive','svactor','targetOpacity','maxCommands','fieldAtbGraphicFaceName','isHidden','prototype','initTpbChargeTimeATB','update','changeFaceGraphicBitmap','ready','Mechanics','isGaugeHorizontal','Game_Battler_tpbSpeed','Sprite_Actor_createStateSprite','OpacityRate','fast%1','Charge','onAtbInterrupt','_graphicIconIndex','bind','loadWindowskin','EVAL','round','EscapeFailPenalty','1159806GrufGv','_forcing','exit','Parse_Notetags_CreateJS','initBattleSystemATB','match','bitmap','addBattleSystemATBShowGaugeCommand','setupTextPopup','applyGlobalBattleSystemATBEffects','Game_BattlerBase_appear','paramBuffRate','atbInterrupt','fillRect','EnemyBattlerType','actor','_needsAtbClear','length','_graphicHue','ConfigManager_applyData','fieldAtbGraphicFaceIndex','createStateSprite','speed','startEffect','setAtbAfterSpeed','atbCurrentMaxValue','stop','_onRestrictBypassAtbReset','allBattleMembers','_tpbTurnEnd','OffsetX','clearRect','boxWidth','svBattlerName','createJS','PostStartTurnJS','_plural','ParseSkillNotetags','_homeX','setFrame','createAtbGaugeSprite','_fieldAtbGaugeFaceName','35lZDVWk','addLoadListener','isSideView','_letter','fieldAtbGraphicIconIndex','endBattlerActions','name','3uegixa','height','mainFontFace','Game_Battler_tpbAcceleration','ShowEnemyGauge','updateOpacity','_gaugeSprite','State-%1-%2','disappear','toUpperCase','clearTpbChargeTime','FUNC','Scale','startTpbTurn','ARRAYNUM','ConvertParams','appear','GaugeThick','loadFace','_statusWindow','setBattler','makeTpbActions','min','_atbGaugeSprite','drawGaugeBitmap','FaceName','changeSvActorGraphicBitmap','anchor','updatePosition','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','FieldGaugeEnemyFace','Game_Action_applyGlobal','STRUCT','concat','numActions','_tpbTurnCount','TpbAccelerationJS','setText','setupArrowSprite','ShowActorGauge','setup','4889728gcQWDW','floor','clamp','%1BgColor1','setHue','placeGauge','3037780LpsKez','isStateAffected','GaugeLengthVert','Game_Battler_tpbRequiredCastTime','boxHeight','battlerHue','battleMembers','ShowMarkerBorder','isSceneBattle','updateSelectionEffect','subject','Game_Battler_tpbRelativeSpeed','tpbRelativeSpeed','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','version','Window_BattleStatus','_tpbCastTime','Sprite_Gauge_currentMaxValue','initialize','RepositionTopForHelp','createChildren','MarkerSize','initMembers','traitObjects','SystemFieldGaugeVisibility','canMakeTpbActionsAtStartTpbTurn','updatePositionOnGauge','_atbFieldGaugeVisible','VisuMZ_1_BattleCore','create','mainSprite','default','Sprite_Gauge_currentValue','createBattlerContainer','atbSpeed','fast','_originalSpeed','visualAtbGauge','EnemyBattlerFaceIndex','_graphicFaceIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','map','max','BattleManager_isActiveTpb','Game_BattlerBase_die','updateAtbGaugeSpritePosition','Gauge','isActiveTpb','changeAtbCastTime','#000000','requestFauxAnimation','setupBattleSystemATBColors','restriction','GaugeSplit','applyItemUserEffect','maxBattleMembers','%1BorderColor','Scene_Battle_createAllWindows','Actors','Sprite_Gauge_gaugeColor1','createKeyJS','setupAtbGaugeSprite','currentAction','createBackgroundSprite','svActorVertCells','ParseItemNotetags','ceil','NUM','stop%1','faceName','AddOption','Item-%1-%2','Game_Battler_applyTpbPenalty','removeState','applyGlobal','Game_Battler_startTpbCasting','createStateIconSprite','processBattleCoreJS','_svBattlerSprite','EnemyBattlerDrawLetter','paramRate','OffsetY','atbStopped','setAtbCastTime','TpbSpeedCalcJS','createFieldAtbGraphicFaceIndex','slow%1','setAtbGraphicIconIndex','SlowRate','_atbAfterSpeed','fontSize','MarkerArrowWindowSkin','changeEnemyGraphicBitmap','BattleManager_endBattlerActions','note','faceIndex','updateLetter','Armor-%1-%2','format','Game_System_initialize','_fieldAtbGaugeGraphicType','parameters','visible','VisuMZ_0_CoreEngine','includes','battleUIOffsetY','2727512ZyAyPL','Scene_Options_maxCommands','_tpbChargeTime','gaugeHeight','Game_Battler_onRestrict','description','InterruptFlashColor','setBlendColor','atbCurrentValue','IconIndex','loadSvEnemy','clearActions','battleUIOffsetX','isAtbChargingState','_windowLayer','charging','Game_Unit_updateTpb','tpbSpeed','ShowMarkerArrow','InterruptText','_tpbState','Settings','_skinSprite','revive','4MNsFRi','gaugeBackColor','Window_SideviewUiBattleStatus','ARRAYEVAL','GaugeDirection','makeDeepCopy','process_VisuMZ_BattleSystemATB_JS_Notetags','skills','svBattlerData','_graphicSprite','Color','blt','constructor','EnemyBattlerFontSize','%1SystemBg','GaugeSystemSkin','_unit','battler','Sprite_Battler_updateMain','getChildIndex','EnemyBattlerIcon','Game_Battler_clearActions','updateVisibility','ColorManager_loadWindowskin','filter','InterruptTextColor','_fieldAtbGaugeIconIndex','Game_Battler_initTpbChargeTime','compareBattlerSprites','ARRAYSTR','time','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','onDatabaseLoaded','isATB','_endingBattle','fontFace','_horz','_scene','StunsResetGauge','FieldGaugeActorIcon','cast','MarkerOffset','atbAcceleration','_statusType','_fieldGaugeATB_Container','updateGraphicHue','parse','applyItemBattleSystemATBUserEffect','fieldAtbGraphicType','Sprite_Gauge_gaugeColor2','BattleSystemATB','width','createFieldAtbGraphicIconIndex','isAttack','drawText','updateGraphic','After','#%1','applyData','AnchorY','_backgroundSprite','5118921GfkcXO','Scene_Boot_onDatabaseLoaded','4669670QvDwzD','applyTpbPenalty','_windowskin','clearFieldAtbGraphics','process_VisuMZ_BattleSystemATB_CreateRegExp','createBattlerSprite','addChild','Game_Battler_clearTpbChargeTime','Enemies','enemy','iconWidth','createBattlerSprites','abs','FieldGaugeActorFace','setItem','87941xlxPSv','tpbRequiredCastTime','right','FieldGaugeClearActorGraphic','FastRate','RepositionTopHelpX','bottom','registerCommand','Enemy','EnemyBattlerFontFace','InterruptMirror','_fieldAtbGaugeFaceIndex','atbGaugeColor','updateAtbGaugeSpriteVisibility','Visible','VisuMZ_2_AggroControlSystem','Skill-%1-%2','die','face','Game_Battler_tpbBaseSpeed','_arrowSprite','acting','getAtbCastTimeRate','Window_Help_setItem','AnchorX','onRestrict','updatePositionOffset','makeData','loadSvActor','atbColor','_graphicEnemy','isEnemy','scale','isTpb','_graphicType','VisuMZ_2_BattleSystemCTB','AggroControlSystem','children','_battler','faceWidth','getStateTooltipBattler','item','applyBattleSystemATBUserEffect','loadEnemy','Actor-%1-%2','Options','checkAggroControlSystemOffsetYAdjustment','textColor','isAtbCastingState','ConfigManager_makeData','addGeneralOptions','setAtbChargeTime','EnemyBattlerFaceName','addChildAt','setBattleSystemATBFieldGaugeVisible','icon','createActorSprites','DisplayPosition','_tpbIdleTime','createGraphicSprite'];_0x451d=function(){return _0x1c5c63;};return _0x451d();}function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]=Object['create'](Sprite_Clickable[_0x4d3181(0x1ff)]),Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x11c)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['initialize']=function(_0x1e9474,_0x5c5c4c,_0x362621){const _0x40de9c=_0x4d3181;this[_0x40de9c(0x1cb)]=_0x1e9474,this[_0x40de9c(0x120)]=_0x5c5c4c,this[_0x40de9c(0x249)]=_0x362621,Sprite_Clickable[_0x40de9c(0x1ff)]['initialize'][_0x40de9c(0x1c0)](this),this[_0x40de9c(0xa4)](),this['createChildren'](),this[_0x40de9c(0x1bf)]=this[_0x40de9c(0x1fb)]();},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0xa4)]=function(){const _0x93963b=_0x4d3181;this['anchor']['x']=0.5,this[_0x93963b(0x25e)]['y']=0.5;},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0xa2)]=function(){const _0x15536c=_0x4d3181;this[_0x15536c(0xcd)](),this[_0x15536c(0x199)](),this['createBorderSprite'](),this[_0x15536c(0x1ed)](),this['createArrowSprite'](),this[_0x15536c(0xa8)](!![]);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0xcd)]=function(){const _0xe0a35d=_0x4d3181;if(!Sprite_FieldGaugeATB[_0xe0a35d(0x10d)]['ShowMarkerBg'])return;const _0x2c5d3b=Sprite_FieldGaugeATB[_0xe0a35d(0x10d)],_0x413ef3=this[_0xe0a35d(0x120)]===$gameParty?_0xe0a35d(0x1b6):_0xe0a35d(0x166),_0x211618=_0xe0a35d(0x11e)[_0xe0a35d(0xf0)](_0x413ef3),_0x496ff3=new Sprite();_0x496ff3[_0xe0a35d(0x25e)]['x']=this['anchor']['x'],_0x496ff3[_0xe0a35d(0x25e)]['y']=this[_0xe0a35d(0x25e)]['y'];if(_0x2c5d3b[_0x211618])_0x496ff3[_0xe0a35d(0x218)]=ImageManager[_0xe0a35d(0x1e5)](_0x2c5d3b[_0x211618]);else{const _0x413183=_0x2c5d3b[_0xe0a35d(0xa3)];_0x496ff3[_0xe0a35d(0x218)]=new Bitmap(_0x413183,_0x413183);const _0x1b6eea=ColorManager['getColor'](_0x2c5d3b[_0xe0a35d(0x26f)[_0xe0a35d(0xf0)](_0x413ef3)]),_0x38deb1=ColorManager[_0xe0a35d(0x1e3)](_0x2c5d3b[_0xe0a35d(0x1c6)[_0xe0a35d(0xf0)](_0x413ef3)]);_0x496ff3[_0xe0a35d(0x218)][_0xe0a35d(0x1dc)](0x0,0x0,_0x413183,_0x413183,_0x1b6eea,_0x38deb1,!![]);}this[_0xe0a35d(0x14c)]=_0x496ff3,this[_0xe0a35d(0x155)](this[_0xe0a35d(0x14c)]),this[_0xe0a35d(0x143)]=this['_backgroundSprite'][_0xe0a35d(0x143)],this[_0xe0a35d(0x244)]=this[_0xe0a35d(0x14c)][_0xe0a35d(0x244)];},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['createGraphicSprite']=function(){const _0x2b0209=_0x4d3181,_0x4a719f=new Sprite();_0x4a719f[_0x2b0209(0x25e)]['x']=this[_0x2b0209(0x25e)]['x'],_0x4a719f[_0x2b0209(0x25e)]['y']=this[_0x2b0209(0x25e)]['y'],this['_graphicSprite']=_0x4a719f,this[_0x2b0209(0x155)](this[_0x2b0209(0x119)]),this['processUpdateGraphic']();},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['createBorderSprite']=function(){const _0x23ba9e=_0x4d3181;if(!Sprite_FieldGaugeATB['Settings'][_0x23ba9e(0x95)])return;const _0x33a772=Sprite_FieldGaugeATB['Settings'],_0x5d8b84=this[_0x23ba9e(0x120)]===$gameParty?_0x23ba9e(0x1b6):'Enemy',_0x27760f=_0x23ba9e(0x1a5)[_0x23ba9e(0xf0)](_0x5d8b84),_0x15dd9c=new Sprite();_0x15dd9c[_0x23ba9e(0x25e)]['x']=this[_0x23ba9e(0x25e)]['x'],_0x15dd9c['anchor']['y']=this[_0x23ba9e(0x25e)]['y'];if(_0x33a772[_0x27760f])_0x15dd9c[_0x23ba9e(0x218)]=ImageManager['loadSystem'](_0x33a772[_0x27760f]);else{let _0x56c98f=_0x33a772[_0x23ba9e(0xa3)],_0x31d1eb=_0x33a772[_0x23ba9e(0x1da)];_0x15dd9c[_0x23ba9e(0x218)]=new Bitmap(_0x56c98f,_0x56c98f);const _0xe328a=_0x23ba9e(0xbf),_0x32d71a=ColorManager[_0x23ba9e(0x1e3)](_0x33a772[_0x23ba9e(0xc6)[_0x23ba9e(0xf0)](_0x5d8b84)]);_0x15dd9c[_0x23ba9e(0x218)][_0x23ba9e(0x21f)](0x0,0x0,_0x56c98f,_0x56c98f,_0xe328a),_0x56c98f-=0x2,_0x15dd9c[_0x23ba9e(0x218)][_0x23ba9e(0x21f)](0x1,0x1,_0x56c98f,_0x56c98f,_0x32d71a),_0x56c98f-=_0x31d1eb*0x2,_0x15dd9c[_0x23ba9e(0x218)]['fillRect'](0x1+_0x31d1eb,0x1+_0x31d1eb,_0x56c98f,_0x56c98f,_0xe328a),_0x56c98f-=0x2,_0x31d1eb+=0x1,_0x15dd9c[_0x23ba9e(0x218)][_0x23ba9e(0x231)](0x1+_0x31d1eb,0x1+_0x31d1eb,_0x56c98f,_0x56c98f);}this['_backgroundSprite']=_0x15dd9c,this[_0x23ba9e(0x155)](this[_0x23ba9e(0x14c)]);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x1ed)]=function(){const _0x3f915b=_0x4d3181,_0x577bf0=Sprite_FieldGaugeATB[_0x3f915b(0x10d)];if(!_0x577bf0[_0x3f915b(0xdd)])return;if(this[_0x3f915b(0x120)]===$gameParty)return;const _0x27b398=_0x577bf0['MarkerSize'],_0x53dfc4=new Sprite();_0x53dfc4[_0x3f915b(0x25e)]['x']=this[_0x3f915b(0x25e)]['x'],_0x53dfc4[_0x3f915b(0x25e)]['y']=this[_0x3f915b(0x25e)]['y'],_0x53dfc4[_0x3f915b(0x218)]=new Bitmap(_0x27b398,_0x27b398),this[_0x3f915b(0x1ba)]=_0x53dfc4,this[_0x3f915b(0x155)](this[_0x3f915b(0x1ba)]);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x1a4)]=function(){const _0x312b12=_0x4d3181,_0x2c468a=Sprite_FieldGaugeATB[_0x312b12(0x10d)];if(!_0x2c468a[_0x312b12(0x10a)])return;const _0x4e6771=new Sprite();_0x4e6771[_0x312b12(0x25e)]['x']=this[_0x312b12(0x25e)]['x'],_0x4e6771[_0x312b12(0x25e)]['y']=this[_0x312b12(0x25e)]['y'],this[_0x312b12(0x269)](_0x4e6771),this['_arrowSprite']=_0x4e6771,this['addChild'](this[_0x312b12(0x172)]);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x269)]=function(_0x3f3c53){const _0x2d6dce=_0x4d3181,_0xdfc00e=Sprite_FieldGaugeATB[_0x2d6dce(0x10d)],_0x48e9cb=_0xdfc00e[_0x2d6dce(0xa3)],_0x3c380c=Math['round'](_0x48e9cb/0x2),_0x3fb5c1=this[_0x2d6dce(0x205)](),_0x2b59f0=this[_0x2d6dce(0x120)]===$gameParty?_0x2d6dce(0x1b6):_0x2d6dce(0x166),_0x40a3e3=_0xdfc00e[_0x2d6dce(0x1eb)['format'](_0x2b59f0)];_0x3f3c53[_0x2d6dce(0x218)]=ImageManager[_0x2d6dce(0x1e5)](_0xdfc00e[_0x2d6dce(0xe9)]);const _0x504ad8=0x18,_0xfc4e57=_0x504ad8/0x2,_0x497a13=0x60+_0x504ad8,_0x49dc63=0x0+_0x504ad8;if(_0x3fb5c1&&_0x40a3e3)_0x3f3c53[_0x2d6dce(0x239)](_0x497a13+_0xfc4e57,_0x49dc63+_0xfc4e57+_0x504ad8,_0x504ad8,_0xfc4e57),_0x3f3c53['y']+=_0x3c380c,_0x3f3c53[_0x2d6dce(0x25e)]['y']=0x0;else{if(_0x3fb5c1&&!_0x40a3e3)_0x3f3c53[_0x2d6dce(0x239)](_0x497a13+_0xfc4e57,_0x49dc63,_0x504ad8,_0xfc4e57),_0x3f3c53['y']-=_0x3c380c,_0x3f3c53[_0x2d6dce(0x25e)]['y']=0x1;else{if(!_0x3fb5c1&&_0x40a3e3)_0x3f3c53[_0x2d6dce(0x239)](_0x497a13,_0x49dc63+_0xfc4e57,_0xfc4e57,_0x504ad8),_0x3f3c53['x']-=Math[_0x2d6dce(0xd0)](_0x3c380c*1.75),_0x3f3c53[_0x2d6dce(0x25e)]['x']=0x0;else!_0x3fb5c1&&!_0x40a3e3&&(_0x3f3c53['setFrame'](_0x497a13+_0x504ad8+_0xfc4e57,_0x49dc63+_0xfc4e57,_0xfc4e57,_0x504ad8),_0x3f3c53['x']+=Math[_0x2d6dce(0xd0)](_0x3c380c*1.75),_0x3f3c53['anchor']['x']=0x1);}}},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x121)]=function(){const _0x515f53=_0x4d3181;return this[_0x515f53(0x120)]===$gameParty?$gameParty[_0x515f53(0x94)]()[this['_index']]:$gameTroop[_0x515f53(0x1f1)]()[this[_0x515f53(0x1cb)]];},Sprite_FieldMarkerATB['prototype']['update']=function(){const _0x30eedc=_0x4d3181;Sprite_Clickable[_0x30eedc(0x1ff)][_0x30eedc(0x201)][_0x30eedc(0x1c0)](this),this[_0x30eedc(0x248)](),this[_0x30eedc(0x178)](),this['updatePositionOnGauge'](),this[_0x30eedc(0x147)](),this['updateGraphicHue'](),this[_0x30eedc(0xee)](),this[_0x30eedc(0x97)]();},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x248)]=function(){const _0x1c19a7=_0x4d3181,_0x16f8ce=this[_0x1c19a7(0x1fb)](),_0x1878a5=Sprite_FieldGaugeATB[_0x1c19a7(0x10d)][_0x1c19a7(0x208)];if(this[_0x1c19a7(0x1bf)]>_0x16f8ce)this[_0x1c19a7(0x1bf)]=Math[_0x1c19a7(0xb8)](_0x16f8ce,this[_0x1c19a7(0x1bf)]-_0x1878a5);else this['opacity']<_0x16f8ce&&(this[_0x1c19a7(0x1bf)]=Math[_0x1c19a7(0x259)](_0x16f8ce,this[_0x1c19a7(0x1bf)]+_0x1878a5));},Sprite_FieldMarkerATB['prototype'][_0x4d3181(0x1fb)]=function(){const _0x267675=_0x4d3181,_0x1ca8c3=this['battler']();if(!_0x1ca8c3)return 0x0;if(_0x1ca8c3[_0x267675(0x1fe)]())return 0x0;if(_0x1ca8c3['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['isGaugeHorizontal']=function(){const _0x3ec1dd=_0x4d3181;if(this[_0x3ec1dd(0x134)]!==undefined)return this['_horz'];const _0x8fbf45=Sprite_FieldGaugeATB[_0x3ec1dd(0x10d)]['DisplayPosition'];return this[_0x3ec1dd(0x134)]=[_0x3ec1dd(0x1df),_0x3ec1dd(0x164)][_0x3ec1dd(0xf6)](_0x8fbf45),this['_horz'];},Sprite_FieldMarkerATB['prototype']['updatePositionOffset']=function(){const _0x3353aa=_0x4d3181,_0x8d98a4=Sprite_FieldGaugeATB['Settings'],_0x34abb4=this[_0x3353aa(0x205)](),_0x3eca6f=this[_0x3353aa(0x120)]===$gameParty?_0x3353aa(0x1b6):_0x3353aa(0x166),_0x543cfd=_0x8d98a4[_0x3353aa(0x139)],_0x4b63f3=_0x8d98a4['%1Side'[_0x3353aa(0xf0)](_0x3eca6f)];_0x34abb4?(this['y']=_0x8d98a4[_0x3353aa(0x254)]/0x2,this['y']+=_0x4b63f3?-_0x543cfd:_0x543cfd):(this['x']=_0x8d98a4[_0x3353aa(0x254)]/0x2,this['x']+=_0x4b63f3?_0x543cfd:-_0x543cfd);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0xa8)]=function(_0x93c104){const _0x4ba427=_0x4d3181,_0x2d480a=this[_0x4ba427(0x121)]();if(!_0x2d480a)return;const _0x62a72=_0x2d480a['getAtbCastTimeRate']();if(_0x62a72>=Infinity)return;const _0x57949e=Sprite_FieldGaugeATB[_0x4ba427(0x10d)],_0x4047cc=this[_0x4ba427(0x205)](),_0x3eb77b=this['targetPositionOnGauge'](),_0x4c0a7b=_0x93c104?Infinity:_0x57949e['MarkerSpeed'];if(_0x4047cc&&this['x']!==_0x3eb77b){if(this['x']>_0x3eb77b)this['x']=Math[_0x4ba427(0xb8)](_0x3eb77b,this['x']-_0x4c0a7b);if(this['x']<_0x3eb77b)this['x']=Math[_0x4ba427(0x259)](_0x3eb77b,this['x']+_0x4c0a7b);}else{if(!_0x4047cc&&this['x']!==_0x3eb77b){if(this['y']>_0x3eb77b)this['y']=Math[_0x4ba427(0xb8)](_0x3eb77b,this['y']-_0x4c0a7b);if(this['y']<_0x3eb77b)this['y']=Math[_0x4ba427(0x259)](_0x3eb77b,this['y']+_0x4c0a7b);}}},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['targetPositionOnGauge']=function(){const _0x93c4cc=_0x4d3181,_0x1e0a4f=Sprite_FieldGaugeATB[_0x93c4cc(0x10d)],_0x9ae558=this['battler'](),_0x403a44=this['isGaugeHorizontal'](),_0x464234=this['_gaugeSprite'][_0x93c4cc(0x218)][_0x93c4cc(0x143)],_0x48c134=this[_0x93c4cc(0x249)][_0x93c4cc(0x218)][_0x93c4cc(0x244)],_0x3a6535=_0x1e0a4f[_0x93c4cc(0xc3)][_0x93c4cc(0x26e)](0x0,0x1),_0x322441=_0x1e0a4f[_0x93c4cc(0x114)];let _0x5b490a=_0x9ae558['tpbChargeTime']()*_0x3a6535;_0x5b490a+=(0x1-_0x3a6535)*_0x9ae558[_0x93c4cc(0x174)]();if(_0x9ae558===BattleManager[_0x93c4cc(0x1ef)])_0x5b490a=0x1;if(!_0x322441)_0x5b490a=0x1-_0x5b490a;let _0x50ab7e=0x0;if(_0x403a44)_0x50ab7e=_0x5b490a*_0x464234;else!_0x403a44&&(_0x50ab7e=_0x5b490a*_0x48c134);return Math[_0x93c4cc(0x210)](_0x50ab7e);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x147)]=function(){const _0x48be1c=_0x4d3181,_0x4a1fa4=this[_0x48be1c(0x121)]();if(!_0x4a1fa4)return;const _0x2424f6=Sprite_FieldGaugeATB[_0x48be1c(0x10d)],_0x2059c5=this[_0x48be1c(0x120)]===$gameParty?_0x48be1c(0x1b6):_0x48be1c(0x166);let _0x27c74f=_0x4a1fa4[_0x48be1c(0x140)]();if(_0x4a1fa4[_0x48be1c(0x1b8)]()&&_0x27c74f===_0x48be1c(0x158))_0x27c74f=_0x48be1c(0x170);else _0x4a1fa4[_0x48be1c(0x17d)]()&&_0x27c74f===_0x48be1c(0x1fa)&&(_0x27c74f='enemy');if(this[_0x48be1c(0x180)]!==_0x27c74f)return this[_0x48be1c(0x1cc)]();switch(this[_0x48be1c(0x180)]){case _0x48be1c(0x170):if(this[_0x48be1c(0x1a6)]!==_0x4a1fa4[_0x48be1c(0x1fd)]())return this['processUpdateGraphic']();if(this[_0x48be1c(0xb5)]!==_0x4a1fa4['fieldAtbGraphicFaceIndex']())return this[_0x48be1c(0x1cc)]();break;case'icon':if(this[_0x48be1c(0x20c)]!==_0x4a1fa4[_0x48be1c(0x240)]())return this[_0x48be1c(0x1cc)]();break;case _0x48be1c(0x158):if(_0x4a1fa4[_0x48be1c(0x1f5)]()){if(this['_graphicSv']!==_0x4a1fa4[_0x48be1c(0x233)]())return this[_0x48be1c(0x1cc)]();}else{if(this[_0x48be1c(0x17c)]!==_0x4a1fa4['battlerName']())return this[_0x48be1c(0x1cc)]();}break;case _0x48be1c(0x1fa):if(_0x4a1fa4[_0x48be1c(0x1b8)]()){if(this['_graphicSv']!==_0x4a1fa4[_0x48be1c(0x1c1)]())return this[_0x48be1c(0x1cc)]();}else{if(this[_0x48be1c(0x17c)]!==_0x4a1fa4[_0x48be1c(0x1c1)]())return this[_0x48be1c(0x1cc)]();}break;}},Sprite_FieldMarkerATB['prototype']['processUpdateGraphic']=function(){const _0x344005=_0x4d3181,_0x3a3bb5=this[_0x344005(0x121)]();if(!_0x3a3bb5)return;this[_0x344005(0x180)]=_0x3a3bb5[_0x344005(0x140)]();if(_0x3a3bb5[_0x344005(0x1b8)]()&&this[_0x344005(0x180)]==='enemy')this[_0x344005(0x180)]='face';else _0x3a3bb5[_0x344005(0x17d)]()&&this[_0x344005(0x180)]==='svactor'&&(this[_0x344005(0x180)]='enemy');let _0x2c59d5;switch(this[_0x344005(0x180)]){case _0x344005(0x170):this[_0x344005(0x1a6)]=_0x3a3bb5[_0x344005(0x1fd)](),this[_0x344005(0xb5)]=_0x3a3bb5[_0x344005(0x226)](),_0x2c59d5=ImageManager[_0x344005(0x255)](this[_0x344005(0x1a6)]),_0x2c59d5['addLoadListener'](this[_0x344005(0x202)][_0x344005(0x20d)](this,_0x2c59d5));break;case'icon':this[_0x344005(0x20c)]=_0x3a3bb5['fieldAtbGraphicIconIndex'](),_0x2c59d5=ImageManager[_0x344005(0x1e5)](_0x344005(0x1ec)),_0x2c59d5[_0x344005(0x23d)](this['changeIconGraphicBitmap'][_0x344005(0x20d)](this,_0x2c59d5));break;case _0x344005(0x158):if(_0x3a3bb5[_0x344005(0x1f5)]())this['_graphicSv']=_0x3a3bb5[_0x344005(0x233)](),_0x2c59d5=ImageManager[_0x344005(0x17a)](this[_0x344005(0x1a3)]),_0x2c59d5[_0x344005(0x23d)](this[_0x344005(0x25d)][_0x344005(0x20d)](this,_0x2c59d5));else $gameSystem[_0x344005(0x23e)]()?(this[_0x344005(0x17c)]=_0x3a3bb5[_0x344005(0x1c1)](),_0x2c59d5=ImageManager[_0x344005(0x102)](this[_0x344005(0x17c)]),_0x2c59d5[_0x344005(0x23d)](this['changeEnemyGraphicBitmap'][_0x344005(0x20d)](this,_0x2c59d5))):(this[_0x344005(0x17c)]=_0x3a3bb5['battlerName'](),_0x2c59d5=ImageManager[_0x344005(0x189)](this[_0x344005(0x17c)]),_0x2c59d5[_0x344005(0x23d)](this[_0x344005(0xea)][_0x344005(0x20d)](this,_0x2c59d5)));break;case'svactor':this[_0x344005(0x1a3)]=_0x3a3bb5[_0x344005(0x1c1)](),_0x2c59d5=ImageManager[_0x344005(0x17a)](this['_graphicSv']),_0x2c59d5['addLoadListener'](this[_0x344005(0x25d)]['bind'](this,_0x2c59d5));break;}},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x202)]=function(_0x540379){const _0x32d920=_0x4d3181,_0x3ed6fd=Sprite_FieldGaugeATB[_0x32d920(0x10d)],_0x12e43a=_0x3ed6fd[_0x32d920(0xa3)],_0x26b992=this[_0x32d920(0xb5)];this[_0x32d920(0x119)][_0x32d920(0x218)]=new Bitmap(_0x12e43a,_0x12e43a);const _0x5405c0=this[_0x32d920(0x119)][_0x32d920(0x218)],_0x28d699=ImageManager[_0x32d920(0x185)],_0x16983a=ImageManager['faceHeight'],_0x2b39e5=ImageManager['faceWidth'],_0x429cc2=ImageManager[_0x32d920(0x1be)],_0xc33389=_0x26b992%0x4*_0x28d699+(_0x28d699-_0x2b39e5)/0x2,_0x2d29ba=Math[_0x32d920(0x26d)](_0x26b992/0x4)*_0x16983a+(_0x16983a-_0x429cc2)/0x2;_0x5405c0[_0x32d920(0x11b)](_0x540379,_0xc33389,_0x2d29ba,_0x2b39e5,_0x429cc2,0x0,0x0,_0x12e43a,_0x12e43a);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x1b3)]=function(_0x41f1f9){const _0x17e555=_0x4d3181,_0x5772c2=Sprite_FieldGaugeATB[_0x17e555(0x10d)],_0x133109=_0x5772c2[_0x17e555(0xa3)],_0x5971af=this['_graphicIconIndex'];this[_0x17e555(0x119)][_0x17e555(0x218)]=new Bitmap(_0x133109,_0x133109);const _0x2ea238=this['_graphicSprite'][_0x17e555(0x218)],_0x113832=ImageManager[_0x17e555(0x159)],_0x24b569=ImageManager[_0x17e555(0x1e7)],_0x2336ff=_0x5971af%0x10*_0x113832,_0x5d4bdc=Math[_0x17e555(0x26d)](_0x5971af/0x10)*_0x24b569;_0x2ea238[_0x17e555(0x11b)](_0x41f1f9,_0x2336ff,_0x5d4bdc,_0x113832,_0x24b569,0x0,0x0,_0x133109,_0x133109);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)]['changeSvActorGraphicBitmap']=function(_0x40f315){const _0x364e33=_0x4d3181,_0x3b427a=Sprite_FieldGaugeATB[_0x364e33(0x10d)],_0x1c786d=_0x3b427a[_0x364e33(0xa3)];this['_graphicSprite']['bitmap']=new Bitmap(_0x1c786d,_0x1c786d);const _0x20a278=this['_graphicSprite']['bitmap'],_0x3158a4=this[_0x364e33(0x1a3)][_0x364e33(0x217)](/\$/i),_0x299a15=_0x3158a4?0x1:ImageManager['svActorHorzCells'],_0xc06530=_0x3158a4?0x1:ImageManager[_0x364e33(0xce)],_0x830f85=_0x40f315[_0x364e33(0x143)]/_0x299a15,_0x6018a1=_0x40f315[_0x364e33(0x244)]/_0xc06530,_0x59db86=Math[_0x364e33(0x259)](0x1,_0x1c786d/_0x830f85,_0x1c786d/_0x6018a1),_0x4d83ee=_0x830f85*_0x59db86,_0x357f72=_0x6018a1*_0x59db86,_0x470048=Math[_0x364e33(0x210)]((_0x1c786d-_0x4d83ee)/0x2),_0x593b2b=Math[_0x364e33(0x210)]((_0x1c786d-_0x357f72)/0x2);_0x20a278[_0x364e33(0x11b)](_0x40f315,0x0,0x0,_0x830f85,_0x6018a1,_0x470048,_0x593b2b,_0x4d83ee,_0x357f72);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0xea)]=function(_0x10d9a3){const _0x47d5b6=_0x4d3181,_0x46788d=Sprite_FieldGaugeATB['Settings'],_0x5ec6c5=_0x46788d['MarkerSize'];this[_0x47d5b6(0x119)]['bitmap']=new Bitmap(_0x5ec6c5,_0x5ec6c5);const _0x290dca=this[_0x47d5b6(0x119)][_0x47d5b6(0x218)],_0x1dd749=Math[_0x47d5b6(0x259)](0x1,_0x5ec6c5/_0x10d9a3[_0x47d5b6(0x143)],_0x5ec6c5/_0x10d9a3[_0x47d5b6(0x244)]),_0x3d71d0=_0x10d9a3[_0x47d5b6(0x143)]*_0x1dd749,_0x5d8cd6=_0x10d9a3['height']*_0x1dd749,_0x5da92f=Math[_0x47d5b6(0x210)]((_0x5ec6c5-_0x3d71d0)/0x2),_0x1ac0bc=Math[_0x47d5b6(0x210)]((_0x5ec6c5-_0x5d8cd6)/0x2);_0x290dca[_0x47d5b6(0x11b)](_0x10d9a3,0x0,0x0,_0x10d9a3['width'],_0x10d9a3[_0x47d5b6(0x244)],_0x5da92f,_0x1ac0bc,_0x3d71d0,_0x5d8cd6);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x13d)]=function(){const _0xb0b3cd=_0x4d3181,_0x5d3de2=this['battler']();if(!_0x5d3de2)return;if(!_0x5d3de2[_0xb0b3cd(0x17d)]())return;if(this[_0xb0b3cd(0x224)]===_0x5d3de2[_0xb0b3cd(0x93)]())return;this[_0xb0b3cd(0x224)]=_0x5d3de2[_0xb0b3cd(0x93)](),this['_graphicSprite'][_0xb0b3cd(0x270)](_0x5d3de2['hasSvBattler']()?0x0:this[_0xb0b3cd(0x224)]);},Sprite_FieldMarkerATB['prototype'][_0x4d3181(0xee)]=function(){const _0x356af0=_0x4d3181;if(!this[_0x356af0(0x1ba)])return;const _0x268a75=this[_0x356af0(0x121)]();if(!_0x268a75)return;if(this[_0x356af0(0x23f)]===_0x268a75['_letter']&&this[_0x356af0(0x236)]===_0x268a75[_0x356af0(0x236)])return;this[_0x356af0(0x23f)]=_0x268a75[_0x356af0(0x23f)],this[_0x356af0(0x236)]=_0x268a75['_plural'];const _0x5289a7=Sprite_FieldGaugeATB[_0x356af0(0x10d)],_0x23a434=_0x5289a7[_0x356af0(0xa3)],_0x2cc946=Math[_0x356af0(0x26d)](_0x23a434/0x2),_0x4dfe3d=this[_0x356af0(0x1ba)][_0x356af0(0x218)];_0x4dfe3d['clear']();if(!this[_0x356af0(0x236)])return;_0x4dfe3d[_0x356af0(0x133)]=_0x5289a7[_0x356af0(0x167)]||$gameSystem[_0x356af0(0x245)](),_0x4dfe3d[_0x356af0(0xe8)]=_0x5289a7[_0x356af0(0x11d)]||0x10,_0x4dfe3d[_0x356af0(0x146)](this[_0x356af0(0x23f)],0x2,_0x2cc946,_0x23a434-0x4,_0x2cc946-0x2,_0x356af0(0x160));},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x97)]=function(){const _0x12e4e0=_0x4d3181,_0x5b759a=this['battler']();if(!_0x5b759a)return;const _0x3dc29b=_0x5b759a[_0x12e4e0(0x121)]();if(!_0x3dc29b)return;const _0x13b652=_0x3dc29b[_0x12e4e0(0xac)]();if(!_0x13b652)return;this[_0x12e4e0(0xff)](_0x13b652['_blendColor']);},Sprite_FieldMarkerATB[_0x4d3181(0x1ff)][_0x4d3181(0x186)]=function(){const _0x22f272=_0x4d3181;return this[_0x22f272(0x121)]();};