//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.87;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.87] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x288220=_0x3bc1;(function(_0x73497c,_0x4283c9){const _0x257899=_0x3bc1,_0x35d750=_0x73497c();while(!![]){try{const _0x221eeb=-parseInt(_0x257899(0x481))/0x1*(-parseInt(_0x257899(0x27d))/0x2)+-parseInt(_0x257899(0x2af))/0x3+-parseInt(_0x257899(0x3f8))/0x4+parseInt(_0x257899(0x1f9))/0x5*(-parseInt(_0x257899(0x39d))/0x6)+parseInt(_0x257899(0x95c))/0x7*(parseInt(_0x257899(0x6df))/0x8)+parseInt(_0x257899(0x48f))/0x9+parseInt(_0x257899(0x406))/0xa;if(_0x221eeb===_0x4283c9)break;else _0x35d750['push'](_0x35d750['shift']());}catch(_0x1b2df0){_0x35d750['push'](_0x35d750['shift']());}}}(_0x71fa,0x9b5a4));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x288220(0x2d7)](function(_0x10cedb){const _0x11ae15=_0x288220;return _0x10cedb[_0x11ae15(0x491)]&&_0x10cedb[_0x11ae15(0x8bb)][_0x11ae15(0x479)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x288220(0x1e9)]=function(_0x2423a0,_0x58b6dc){const _0x4c8418=_0x288220;for(const _0x23f2f8 in _0x58b6dc){if(_0x23f2f8['match'](/(.*):(.*)/i)){const _0xe78360=String(RegExp['$1']),_0x21850d=String(RegExp['$2'])[_0x4c8418(0x489)]()[_0x4c8418(0x91c)]();let _0x337cb5,_0x1b13d6,_0x5848c6;switch(_0x21850d){case'NUM':_0x337cb5=_0x58b6dc[_0x23f2f8]!==''?Number(_0x58b6dc[_0x23f2f8]):0x0;break;case _0x4c8418(0x83a):_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6[_0x4c8418(0x972)](_0x1eeb2d=>Number(_0x1eeb2d));break;case _0x4c8418(0x7b9):_0x337cb5=_0x58b6dc[_0x23f2f8]!==''?eval(_0x58b6dc[_0x23f2f8]):null;break;case'ARRAYEVAL':_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6[_0x4c8418(0x972)](_0x12c8ac=>eval(_0x12c8ac));break;case _0x4c8418(0x277):_0x337cb5=_0x58b6dc[_0x23f2f8]!==''?JSON['parse'](_0x58b6dc[_0x23f2f8]):'';break;case _0x4c8418(0x261):_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6[_0x4c8418(0x972)](_0x4d14b7=>JSON['parse'](_0x4d14b7));break;case _0x4c8418(0x548):_0x337cb5=_0x58b6dc[_0x23f2f8]!==''?new Function(JSON['parse'](_0x58b6dc[_0x23f2f8])):new Function(_0x4c8418(0x29a));break;case _0x4c8418(0x276):_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6['map'](_0x4d188e=>new Function(JSON[_0x4c8418(0x804)](_0x4d188e)));break;case _0x4c8418(0x7b2):_0x337cb5=_0x58b6dc[_0x23f2f8]!==''?String(_0x58b6dc[_0x23f2f8]):'';break;case _0x4c8418(0x974):_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6[_0x4c8418(0x972)](_0x146814=>String(_0x146814));break;case _0x4c8418(0x300):_0x5848c6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):{},_0x2423a0[_0xe78360]={},VisuMZ['ConvertParams'](_0x2423a0[_0xe78360],_0x5848c6);continue;case'ARRAYSTRUCT':_0x1b13d6=_0x58b6dc[_0x23f2f8]!==''?JSON[_0x4c8418(0x804)](_0x58b6dc[_0x23f2f8]):[],_0x337cb5=_0x1b13d6[_0x4c8418(0x972)](_0x549a39=>VisuMZ['ConvertParams']({},JSON['parse'](_0x549a39)));break;default:continue;}_0x2423a0[_0xe78360]=_0x337cb5;}}return _0x2423a0;},VisuMZ[_0x288220(0x665)]['SceneManager_exit']=SceneManager[_0x288220(0x3fe)],SceneManager[_0x288220(0x3fe)]=function(){const _0x29b82e=_0x288220;VisuMZ[_0x29b82e(0x665)][_0x29b82e(0x690)][_0x29b82e(0x6c3)](this);if(Utils['RPGMAKER_VERSION']>=_0x29b82e(0x387)){if(typeof nw===_0x29b82e(0x309))nw[_0x29b82e(0x456)]['quit']();}},(_0x55069f=>{const _0x1ce91c=_0x288220,_0x50aaf2=_0x55069f[_0x1ce91c(0x392)];for(const _0x12a7dd of dependencies){if(!Imported[_0x12a7dd]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1ce91c(0x857)](_0x50aaf2,_0x12a7dd)),SceneManager[_0x1ce91c(0x3fe)]();break;}}const _0x31aecb=_0x55069f[_0x1ce91c(0x8bb)];if(_0x31aecb[_0x1ce91c(0x54b)](/\[Version[ ](.*?)\]/i)){const _0x2870a2=Number(RegExp['$1']);_0x2870a2!==VisuMZ[label][_0x1ce91c(0x8ab)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x50aaf2,_0x2870a2)),SceneManager[_0x1ce91c(0x3fe)]());}if(_0x31aecb[_0x1ce91c(0x54b)](/\[Tier[ ](\d+)\]/i)){const _0x479993=Number(RegExp['$1']);_0x479993<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1ce91c(0x857)](_0x50aaf2,_0x479993,tier)),SceneManager[_0x1ce91c(0x3fe)]()):tier=Math[_0x1ce91c(0x6de)](_0x479993,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x55069f[_0x1ce91c(0x7e4)]);})(pluginData),((()=>{const _0x522383=_0x288220;if(VisuMZ[_0x522383(0x665)][_0x522383(0x30a)][_0x522383(0x23d)]['SubfolderParse']??!![])for(const _0x258848 in $plugins){const _0x112def=$plugins[_0x258848];_0x112def[_0x522383(0x392)][_0x522383(0x54b)](/(.*)\/(.*)/i)&&(_0x112def[_0x522383(0x392)]=String(RegExp['$2'][_0x522383(0x91c)]()));}})()),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'AnimationPoint',_0x1d852f=>{const _0x4d72f4=_0x288220;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x4d72f4(0x5de)])return;VisuMZ[_0x4d72f4(0x1e9)](_0x1d852f,_0x1d852f);const _0x534491=Math[_0x4d72f4(0x3ff)](_0x1d852f[_0x4d72f4(0x42b)]),_0x2c22c5=Math[_0x4d72f4(0x3ff)](_0x1d852f['pointY']);$gameTemp[_0x4d72f4(0x5e5)](_0x534491,_0x2c22c5,_0x1d852f[_0x4d72f4(0x53f)],_0x1d852f[_0x4d72f4(0x680)],_0x1d852f['Mute']);}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x7b8),_0x326c64=>{const _0x1f2bd6=_0x288220;VisuMZ[_0x1f2bd6(0x1e9)](_0x326c64,_0x326c64);const _0x3d5b18=Math[_0x1f2bd6(0x3ff)](_0x326c64['volume'])[_0x1f2bd6(0x5d6)](0x0,0x64),_0xe1795e=AudioManager[_0x1f2bd6(0x297)];_0xe1795e&&(_0xe1795e[_0x1f2bd6(0x698)]=_0x3d5b18,_0xe1795e[_0x1f2bd6(0x888)]=AudioManager['_bgmBuffer'][_0x1f2bd6(0x846)](),AudioManager[_0x1f2bd6(0x63e)](_0xe1795e),AudioManager['playBgm'](_0xe1795e,_0xe1795e[_0x1f2bd6(0x888)]),AudioManager[_0x1f2bd6(0x3e8)]['_startPlaying'](_0xe1795e[_0x1f2bd6(0x888)]));}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x3b7),_0x56fdde=>{const _0x341e7e=_0x288220;VisuMZ[_0x341e7e(0x1e9)](_0x56fdde,_0x56fdde);const _0x3f1bc5=Math[_0x341e7e(0x3ff)](_0x56fdde[_0x341e7e(0x705)])['clamp'](0x32,0x96),_0x20bbc8=AudioManager[_0x341e7e(0x297)];_0x20bbc8&&(_0x20bbc8[_0x341e7e(0x705)]=_0x3f1bc5,_0x20bbc8[_0x341e7e(0x888)]=AudioManager[_0x341e7e(0x3e8)][_0x341e7e(0x846)](),AudioManager[_0x341e7e(0x63e)](_0x20bbc8),AudioManager[_0x341e7e(0x36a)](_0x20bbc8,_0x20bbc8[_0x341e7e(0x888)]),AudioManager[_0x341e7e(0x3e8)][_0x341e7e(0x37b)](_0x20bbc8['pos']));}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x2c2),_0x36cab7=>{const _0x6e7f1d=_0x288220;VisuMZ[_0x6e7f1d(0x1e9)](_0x36cab7,_0x36cab7);const _0x1a4c55=Math[_0x6e7f1d(0x3ff)](_0x36cab7[_0x6e7f1d(0x2b1)])[_0x6e7f1d(0x5d6)](-0x64,0x64),_0x3841f6=AudioManager['_currentBgm'];_0x3841f6&&(_0x3841f6[_0x6e7f1d(0x2b1)]=_0x1a4c55,_0x3841f6[_0x6e7f1d(0x888)]=AudioManager[_0x6e7f1d(0x3e8)][_0x6e7f1d(0x846)](),AudioManager['updateBgmParameters'](_0x3841f6),AudioManager['playBgm'](_0x3841f6,_0x3841f6[_0x6e7f1d(0x888)]),AudioManager[_0x6e7f1d(0x3e8)][_0x6e7f1d(0x37b)](_0x3841f6[_0x6e7f1d(0x888)]));}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x753),_0x28f12a=>{const _0x70b456=_0x288220;VisuMZ[_0x70b456(0x1e9)](_0x28f12a,_0x28f12a);const _0x4bbd2e=Math[_0x70b456(0x3ff)](_0x28f12a[_0x70b456(0x698)])[_0x70b456(0x5d6)](0x0,0x64),_0x5e771d=AudioManager[_0x70b456(0x6e1)];_0x5e771d&&(_0x5e771d[_0x70b456(0x698)]=_0x4bbd2e,_0x5e771d[_0x70b456(0x888)]=AudioManager[_0x70b456(0x8da)][_0x70b456(0x846)](),AudioManager[_0x70b456(0x37e)](_0x5e771d),AudioManager[_0x70b456(0x391)](_0x5e771d,_0x5e771d[_0x70b456(0x888)]),AudioManager[_0x70b456(0x8da)][_0x70b456(0x37b)](_0x5e771d['pos']));}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'AudioChangeBgsPitch',_0x3511da=>{const _0xd7dc37=_0x288220;VisuMZ['ConvertParams'](_0x3511da,_0x3511da);const _0x5143c7=Math[_0xd7dc37(0x3ff)](_0x3511da[_0xd7dc37(0x705)])['clamp'](0x32,0x96),_0x425f6d=AudioManager[_0xd7dc37(0x6e1)];_0x425f6d&&(_0x425f6d[_0xd7dc37(0x705)]=_0x5143c7,_0x425f6d[_0xd7dc37(0x888)]=AudioManager[_0xd7dc37(0x8da)]['seek'](),AudioManager[_0xd7dc37(0x37e)](_0x425f6d),AudioManager['playBgs'](_0x425f6d,_0x425f6d['pos']),AudioManager[_0xd7dc37(0x8da)]['_startPlaying'](_0x425f6d['pos']));}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'AudioChangeBgsPan',_0x450978=>{const _0x2b25ff=_0x288220;VisuMZ[_0x2b25ff(0x1e9)](_0x450978,_0x450978);const _0x423dd9=Math['round'](_0x450978[_0x2b25ff(0x2b1)])[_0x2b25ff(0x5d6)](-0x64,0x64),_0xd1e81c=AudioManager[_0x2b25ff(0x6e1)];_0xd1e81c&&(_0xd1e81c['pan']=_0x423dd9,_0xd1e81c['pos']=AudioManager[_0x2b25ff(0x8da)][_0x2b25ff(0x846)](),AudioManager[_0x2b25ff(0x37e)](_0xd1e81c),AudioManager['playBgs'](_0xd1e81c,_0xd1e81c[_0x2b25ff(0x888)]),AudioManager[_0x2b25ff(0x8da)][_0x2b25ff(0x37b)](_0xd1e81c[_0x2b25ff(0x888)]));}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x610),_0x2bcfa0=>{const _0xbe44c6=_0x288220;if(!$gameTemp[_0xbe44c6(0x813)]())return;const _0x2e63cd=Input[_0xbe44c6(0x98a)]();console[_0xbe44c6(0x94a)](_0x2e63cd);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'ExportAllMapText',_0x38f566=>{const _0x5b083d=_0x288220;if(!$gameTemp[_0x5b083d(0x813)]())return;if(!Utils[_0x5b083d(0x9a4)]())return;SceneManager[_0x5b083d(0x482)]['_active']=![],VisuMZ[_0x5b083d(0x665)]['ExportStrFromAllMaps']();}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x61f),_0x34707e=>{const _0x6b4b7e=_0x288220;if(!$gameTemp[_0x6b4b7e(0x813)]())return;if(!Utils[_0x6b4b7e(0x9a4)]())return;SceneManager[_0x6b4b7e(0x482)]['_active']=![],VisuMZ['CoreEngine'][_0x6b4b7e(0x8d7)]();}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x311),_0x30bd44=>{const _0x5147bb=_0x288220;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5147bb(0x9a4)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ['ConvertParams'](_0x30bd44,_0x30bd44);const _0x5bf229=_0x5147bb(0x4a1)[_0x5147bb(0x857)]($gameMap[_0x5147bb(0x4ca)]()[_0x5147bb(0x36d)](0x3)),_0x5d0d03=VisuMZ[_0x5147bb(0x665)][_0x5147bb(0x3e4)]($gameMap['mapId']());VisuMZ['CoreEngine'][_0x5147bb(0x8eb)](_0x5d0d03,_0x5bf229,!![]);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'ExportCurTroopText',_0x2adb78=>{const _0x585fb1=_0x288220;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x585fb1(0x9a4)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x585fb1(0x1e9)](_0x2adb78,_0x2adb78);const _0x53b5bf=_0x585fb1(0x327)[_0x585fb1(0x857)]($gameTroop[_0x585fb1(0x79b)][_0x585fb1(0x36d)](0x4)),_0x5c1da0=VisuMZ[_0x585fb1(0x665)]['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ[_0x585fb1(0x665)][_0x585fb1(0x8eb)](_0x5c1da0,_0x53b5bf,!![]);}),VisuMZ[_0x288220(0x665)][_0x288220(0x8eb)]=function(_0x7993f4,_0x2692f6,_0x42ba67){const _0xa01c98=_0x288220,_0x7784b1=require('fs');let _0x15ce0d='Exported_Script_%1.txt'[_0xa01c98(0x857)](_0x2692f6||'0');_0x7784b1['writeFile'](_0x15ce0d,_0x7993f4,_0x28b0e9=>{const _0x169afa=_0xa01c98;if(_0x28b0e9)throw err;else _0x42ba67&&alert(_0x169afa(0x321)[_0x169afa(0x857)](_0x15ce0d));});},VisuMZ['CoreEngine'][_0x288220(0x336)]=function(){const _0x41db05=_0x288220,_0x3bb409=[];for(const _0x413aff of $dataMapInfos){if(!_0x413aff)continue;_0x3bb409[_0x41db05(0x597)](_0x413aff['id']);}const _0x300302=_0x3bb409[_0x41db05(0x2cd)]*0x64+Math['randomInt'](0x64);alert(_0x41db05(0x7ee)[_0x41db05(0x857)](_0x300302)),this[_0x41db05(0x55c)]=[],this['_currentMap']=$dataMap;for(const _0x3bb903 of _0x3bb409){VisuMZ[_0x41db05(0x665)][_0x41db05(0x87e)](_0x3bb903);}setTimeout(VisuMZ['CoreEngine'][_0x41db05(0x1f5)][_0x41db05(0x3c9)](this),_0x300302);},VisuMZ[_0x288220(0x665)][_0x288220(0x87e)]=function(_0x4691d9){const _0x20b289=_0x288220,_0x7a0e71=_0x20b289(0x65f)[_0x20b289(0x857)](_0x4691d9['padZero'](0x3)),_0x2ebbab=new XMLHttpRequest(),_0x2451eb=_0x20b289(0x542)+_0x7a0e71;_0x2ebbab[_0x20b289(0x4fc)](_0x20b289(0x6ba),_0x2451eb),_0x2ebbab[_0x20b289(0x23b)](_0x20b289(0x5fc)),_0x2ebbab[_0x20b289(0x863)]=()=>this[_0x20b289(0x776)](_0x2ebbab,_0x4691d9,_0x7a0e71,_0x2451eb),_0x2ebbab[_0x20b289(0x637)]=()=>DataManager['onXhrError'](_0x20b289(0x3fa),_0x7a0e71,_0x2451eb),_0x2ebbab['send']();},VisuMZ[_0x288220(0x665)]['storeMapData']=function(_0x474b59,_0x880bc9,_0x46f086,_0x223cd8){const _0x1c30c5=_0x288220;$dataMap=JSON[_0x1c30c5(0x804)](_0x474b59[_0x1c30c5(0x60c)]),DataManager['onLoad']($dataMap),this['_storedMapText'][_0x880bc9]=VisuMZ[_0x1c30c5(0x665)][_0x1c30c5(0x3e4)](_0x880bc9),$dataMap=this[_0x1c30c5(0x5c9)];},VisuMZ[_0x288220(0x665)][_0x288220(0x1f5)]=function(){const _0x48930d=_0x288220,_0x4fa47a='AllMaps';this['_storedMapText'][_0x48930d(0x712)](undefined)[_0x48930d(0x712)]('')['remove'](null);const _0x32dd4c=this[_0x48930d(0x55c)]['join'](_0x48930d(0x8ea))['trim']();VisuMZ['CoreEngine']['ExportString'](_0x32dd4c,_0x4fa47a,!![]),SceneManager[_0x48930d(0x482)][_0x48930d(0x563)]=!![];},VisuMZ['CoreEngine'][_0x288220(0x3e4)]=function(_0x39b343){const _0x5a8e6c=_0x288220;if(!$dataMap)return'';let _0x378b45='█'[_0x5a8e6c(0x419)](0x46)+'\x0a\x0a',_0x2ea506='═'[_0x5a8e6c(0x419)](0x46)+'\x0a\x0a',_0x36353c='';this[_0x5a8e6c(0x376)]=0x0;for(const _0x48d12e of $dataMap[_0x5a8e6c(0x763)]){if(!_0x48d12e)continue;let _0x145146=_0x48d12e['id'],_0x5957fa=_0x48d12e[_0x5a8e6c(0x392)],_0x2e729d=_0x48d12e['pages'];for(const _0x1528b4 of _0x2e729d){const _0x245576=_0x2e729d[_0x5a8e6c(0x301)](_0x1528b4)+0x1;let _0x4603e4=_0x2ea506+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x3f8ac8=VisuMZ[_0x5a8e6c(0x665)]['ExtractStrFromList'](_0x1528b4['list']);if(_0x3f8ac8[_0x5a8e6c(0x2cd)]>0x0){if(_0x36353c[_0x5a8e6c(0x2cd)]>0x0)_0x36353c+=_0x2ea506+'\x0a\x0a\x0a\x0a\x0a';else{const _0x276c7e=$dataMapInfos[_0x39b343][_0x5a8e6c(0x392)];_0x36353c+=_0x378b45+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x5a8e6c(0x857)](_0x39b343,_0x276c7e||_0x5a8e6c(0x5b9))+_0x378b45;}_0x36353c+=_0x4603e4[_0x5a8e6c(0x857)](_0x145146,_0x5957fa,_0x245576,_0x3f8ac8);}}}return _0x36353c['length']>0x0&&(_0x36353c+=_0x2ea506),_0x36353c;},VisuMZ[_0x288220(0x665)][_0x288220(0x8d7)]=function(){const _0x4495bf=_0x288220,_0x5e3c93=$dataTroops[_0x4495bf(0x2cd)]*0xa+Math[_0x4495bf(0x82f)](0xa);alert(_0x4495bf(0x664)[_0x4495bf(0x857)](_0x5e3c93));const _0x1c429d=[];for(const _0x171bb6 of $dataTroops){if(!_0x171bb6)continue;const _0x1522f3=_0x171bb6['id'];_0x1c429d[_0x1522f3]=VisuMZ[_0x4495bf(0x665)][_0x4495bf(0x7d5)](_0x1522f3);}setTimeout(VisuMZ[_0x4495bf(0x665)][_0x4495bf(0x595)][_0x4495bf(0x3c9)](this,_0x1c429d),_0x5e3c93);},VisuMZ[_0x288220(0x665)][_0x288220(0x7d5)]=function(_0x61cabd){const _0x346dc4=_0x288220;if(!$dataTroops[_0x61cabd])return'';let _0x273f20='█'[_0x346dc4(0x419)](0x46)+'\x0a\x0a',_0x6a9240='═'[_0x346dc4(0x419)](0x46)+'\x0a\x0a',_0x2b04f6='';this[_0x346dc4(0x376)]=0x0;const _0x2335db=$dataTroops[_0x61cabd];let _0x1390b7=_0x2335db['pages'];for(const _0x33df3a of _0x1390b7){const _0x13fcc4=_0x1390b7[_0x346dc4(0x301)](_0x33df3a)+0x1;let _0x4f6a2b=_0x6a9240+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0xc2857c=VisuMZ[_0x346dc4(0x665)][_0x346dc4(0x211)](_0x33df3a[_0x346dc4(0x74d)]);_0xc2857c[_0x346dc4(0x2cd)]>0x0&&(_0x2b04f6['length']>0x0?_0x2b04f6+=_0x6a9240+_0x346dc4(0x8ea):_0x2b04f6+=_0x273f20+_0x346dc4(0x3d2)['format'](_0x61cabd,_0x2335db[_0x346dc4(0x392)]||_0x346dc4(0x5b9))+_0x273f20,_0x2b04f6+=_0x4f6a2b['format'](_0x13fcc4,_0xc2857c));}return _0x2b04f6['length']>0x0&&(_0x2b04f6+=_0x6a9240),_0x2b04f6;},VisuMZ[_0x288220(0x665)][_0x288220(0x595)]=function(_0x579445){const _0x1109e8=_0x288220,_0x533c18='AllTroops';_0x579445[_0x1109e8(0x712)](undefined)['remove']('')[_0x1109e8(0x712)](null);const _0x2c80ba=_0x579445[_0x1109e8(0x8c6)](_0x1109e8(0x8ea))[_0x1109e8(0x91c)]();VisuMZ[_0x1109e8(0x665)][_0x1109e8(0x8eb)](_0x2c80ba,_0x533c18,!![]),SceneManager[_0x1109e8(0x482)][_0x1109e8(0x563)]=!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x211)]=function(_0x510442){const _0x37442f=_0x288220;let _0xee4073='\x0a'+'─'[_0x37442f(0x419)](0x46)+'\x0a',_0xfa38f4='\x0a'+'┄'[_0x37442f(0x419)](0x46)+'\x0a',_0x12a88e='';for(const _0x1de58a of _0x510442){if(!_0x1de58a)continue;if(_0x1de58a['code']===0x65)_0x12a88e+=_0xee4073+'\x0a',_0x12a88e+='〘Show\x20Text〙\x0a',_0x1de58a[_0x37442f(0x7e4)][0x4]!==''&&_0x1de58a[_0x37442f(0x7e4)][0x4]!==undefined&&(_0x12a88e+=_0x37442f(0x44c)[_0x37442f(0x857)](_0x1de58a['parameters'][0x4]));else{if(_0x1de58a['code']===0x191)_0x12a88e+=_0x37442f(0x709)[_0x37442f(0x857)](_0x1de58a[_0x37442f(0x7e4)][0x0]);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x192)_0x12a88e+=_0xee4073,_0x12a88e+=_0x37442f(0x823)[_0x37442f(0x857)](_0xfa38f4,_0x1de58a[_0x37442f(0x7e4)][0x0]+0x1,_0x1de58a[_0x37442f(0x7e4)][0x1]);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x193)_0x12a88e+=_0xee4073,_0x12a88e+=_0x37442f(0x3e5)['format'](_0xfa38f4);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x194)_0x12a88e+=_0xee4073,_0x12a88e+=_0x37442f(0x645)['format'](_0xfa38f4);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x69)_0x12a88e+=_0xee4073+'\x0a',_0x12a88e+=_0x37442f(0x6c6);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x6c)_0x12a88e+=_0xee4073+'\x0a',_0x12a88e+=_0x37442f(0x512)[_0x37442f(0x857)](_0x1de58a[_0x37442f(0x7e4)][0x0]);else{if(_0x1de58a['code']===0x198)_0x12a88e+=_0x37442f(0x709)[_0x37442f(0x857)](_0x1de58a['parameters'][0x0]);else{if(_0x1de58a[_0x37442f(0x1fd)]===0x75){const _0x5a8735=$dataCommonEvents[_0x1de58a[_0x37442f(0x7e4)][0x0]];if(_0x5a8735&&this[_0x37442f(0x376)]<=0xa){this[_0x37442f(0x376)]++;let _0x2a411c=VisuMZ[_0x37442f(0x665)][_0x37442f(0x211)](_0x5a8735['list']);_0x2a411c[_0x37442f(0x2cd)]>0x0&&(_0x12a88e+=_0xee4073,_0x12a88e+=_0xfa38f4,_0x12a88e+=_0x37442f(0x2b7)[_0x37442f(0x857)](_0x5a8735['id'],_0x5a8735[_0x37442f(0x392)]),_0x12a88e+=_0xfa38f4,_0x12a88e+=_0x2a411c,_0x12a88e+=_0xfa38f4,_0x12a88e+=_0x37442f(0x999)[_0x37442f(0x857)](_0x5a8735['id'],_0x5a8735[_0x37442f(0x392)]),_0x12a88e+=_0xfa38f4),this[_0x37442f(0x376)]--;}}}}}}}}}}}return _0x12a88e[_0x37442f(0x2cd)]>0x0&&(_0x12a88e+=_0xee4073),_0x12a88e;},PluginManager['registerCommand'](pluginData[_0x288220(0x392)],'OpenURL',_0x373b74=>{const _0x2df715=_0x288220;VisuMZ['ConvertParams'](_0x373b74,_0x373b74);const _0x4549fb=_0x373b74[_0x2df715(0x5cd)];VisuMZ[_0x2df715(0x465)](_0x4549fb);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x772),_0x4d76cc=>{const _0x1cdbe2=_0x288220;VisuMZ[_0x1cdbe2(0x1e9)](_0x4d76cc,_0x4d76cc);const _0x459fae=_0x4d76cc['value']||0x0;$gameParty['gainGold'](_0x459fae);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x7e6),_0x1b1abe=>{const _0x36088a=_0x288220;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x36088a(0x1e9)](_0x1b1abe,_0x1b1abe);const _0x53a790=_0x1b1abe[_0x36088a(0x7f5)];SceneManager[_0x36088a(0x482)][_0x36088a(0x886)](_0x53a790);}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x331),_0x5eb928=>{const _0x5eda91=_0x288220;if(!$gameTemp[_0x5eda91(0x813)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x5eda91(0x1e9)](_0x5eb928,_0x5eb928);const _0x245d65=_0x5eb928[_0x5eda91(0x4a9)]||0x1;$gameTemp[_0x5eda91(0x344)]=_0x245d65;}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x672),_0x52d97d=>{const _0x297bd1=_0x288220;VisuMZ[_0x297bd1(0x1e9)](_0x52d97d,_0x52d97d);const _0x376bae=_0x52d97d[_0x297bd1(0x509)]||0x1,_0x59448b=_0x52d97d[_0x297bd1(0x8c0)]||_0x297bd1(0x828),_0x33d8b4=$gameScreen['picture'](_0x376bae);_0x33d8b4&&_0x33d8b4[_0x297bd1(0x43e)](_0x59448b);}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],'PictureEraseAll',_0x499a5d=>{const _0x4bebc7=_0x288220;for(let _0x49ac8e=0x1;_0x49ac8e<=$gameScreen[_0x4bebc7(0x40d)]();_0x49ac8e++){$gameScreen[_0x4bebc7(0x825)](_0x49ac8e);}}),PluginManager['registerCommand'](pluginData['name'],_0x288220(0x73d),_0x57d035=>{const _0x3f4c1d=_0x288220;VisuMZ[_0x3f4c1d(0x1e9)](_0x57d035,_0x57d035);const _0x4beb2c=Math[_0x3f4c1d(0x2e1)](_0x57d035[_0x3f4c1d(0x305)],_0x57d035[_0x3f4c1d(0x855)]),_0x5bd3d1=Math[_0x3f4c1d(0x6de)](_0x57d035[_0x3f4c1d(0x305)],_0x57d035['EndingID']);for(let _0x35511c=_0x4beb2c;_0x35511c<=_0x5bd3d1;_0x35511c++){$gameScreen[_0x3f4c1d(0x825)](_0x35511c);}}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x809),_0x1cf693=>{const _0x58e59b=_0x288220;VisuMZ[_0x58e59b(0x1e9)](_0x1cf693,_0x1cf693);const _0x2d1d7c=Math[_0x58e59b(0x3ff)](_0x1cf693[_0x58e59b(0x4a9)])[_0x58e59b(0x5d6)](0x1,0x64),_0x2261da=-Number(_0x1cf693[_0x58e59b(0x3a9)]||0x0),_0x58063c=Math['max'](_0x1cf693[_0x58e59b(0x569)]||0x0,0x0),_0x51bb5d=_0x1cf693[_0x58e59b(0x8c0)]||_0x58e59b(0x828),_0x43be62=_0x1cf693[_0x58e59b(0x28b)],_0xed5fac=$gameScreen[_0x58e59b(0x816)](_0x2d1d7c);if(!_0xed5fac)return;_0xed5fac[_0x58e59b(0x2aa)](_0x2261da,_0x58063c,_0x51bb5d);if(_0x43be62){const _0x1be6ab=$gameTemp[_0x58e59b(0x95f)]();if(_0x1be6ab)_0x1be6ab[_0x58e59b(0x812)](_0x58063c);}}),PluginManager[_0x288220(0x72b)](pluginData['name'],'PictureRotate',_0x1adde1=>{const _0x450e79=_0x288220;VisuMZ['ConvertParams'](_0x1adde1,_0x1adde1);const _0x12d329=Math[_0x450e79(0x3ff)](_0x1adde1[_0x450e79(0x4a9)])[_0x450e79(0x5d6)](0x1,0x64),_0x5b9a17=-Number(_0x1adde1[_0x450e79(0x7af)]||0x0),_0x2ecbde=Math[_0x450e79(0x6de)](_0x1adde1[_0x450e79(0x569)]||0x0,0x0),_0x5122f6=_0x1adde1[_0x450e79(0x8c0)]||_0x450e79(0x828),_0x56941c=_0x1adde1[_0x450e79(0x28b)],_0x3b3676=$gameScreen[_0x450e79(0x816)](_0x12d329);if(!_0x3b3676)return;_0x3b3676[_0x450e79(0x546)](_0x5b9a17,_0x2ecbde,_0x5122f6);if(_0x56941c){const _0x34f707=$gameTemp[_0x450e79(0x95f)]();if(_0x34f707)_0x34f707[_0x450e79(0x812)](_0x2ecbde);}}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x66e),_0x440435=>{const _0x23c3ee=_0x288220;VisuMZ[_0x23c3ee(0x1e9)](_0x440435,_0x440435);const _0x6a1d0=Math[_0x23c3ee(0x3ff)](_0x440435[_0x23c3ee(0x4a9)])[_0x23c3ee(0x5d6)](0x1,0x64),_0x3e0029=_0x440435['Settings'],_0x107972=_0x3e0029[_0x23c3ee(0x93a)][_0x23c3ee(0x5d6)](0x0,0x1),_0x71af67=Math[_0x23c3ee(0x3ff)](_0x3e0029[_0x23c3ee(0x537)]||0x0),_0x2f6a93=Math[_0x23c3ee(0x3ff)](_0x3e0029[_0x23c3ee(0x423)]||0x0),_0x2c8c2b=Math[_0x23c3ee(0x3ff)](_0x3e0029[_0x23c3ee(0x592)]||0x0),_0x580ae3=Math['round'](_0x3e0029[_0x23c3ee(0x8a6)]||0x0),_0x18fd35=Math[_0x23c3ee(0x3ff)](_0x3e0029[_0x23c3ee(0x808)])[_0x23c3ee(0x5d6)](0x0,0xff),_0x2c5313=_0x3e0029[_0x23c3ee(0x751)],_0x5a8fe1='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x180e94=_0x440435[_0x23c3ee(0x2e9)]?_0x23c3ee(0x2e9):_0x23c3ee(0x6c4),_0x5ccf38=_0x5a8fe1['format'](_0x440435[_0x23c3ee(0x33a)],_0x180e94);$gameScreen[_0x23c3ee(0x8e2)](_0x6a1d0,_0x5ccf38,_0x107972,_0x71af67,_0x2f6a93,_0x2c8c2b,_0x580ae3,_0x18fd35,_0x2c5313);}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x64a),_0x101b77=>{const _0x4acfdf=_0x288220;VisuMZ[_0x4acfdf(0x1e9)](_0x101b77,_0x101b77);const _0x781e18=_0x101b77['Type']||_0x4acfdf(0x45b),_0x34a022=_0x101b77[_0x4acfdf(0x5f5)][_0x4acfdf(0x5d6)](0x1,0x9),_0x26e2f9=_0x101b77[_0x4acfdf(0x618)]['clamp'](0x1,0x9),_0x5a142f=_0x101b77[_0x4acfdf(0x569)]||0x1,_0x50d005=_0x101b77[_0x4acfdf(0x28b)];$gameScreen[_0x4acfdf(0x8f8)](_0x781e18),$gameScreen['startShake'](_0x34a022,_0x26e2f9,_0x5a142f);if(_0x50d005){const _0x5f07d0=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5f07d0)_0x5f07d0[_0x4acfdf(0x812)](_0x5a142f);}}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x674),_0x3c37b5=>{const _0x49c946=_0x288220;if($gameParty[_0x49c946(0x8e9)]())return;VisuMZ[_0x49c946(0x1e9)](_0x3c37b5,_0x3c37b5);const _0x2b2c8a=_0x3c37b5['IDs'],_0x402702=(_0x3c37b5['Chance']||0x0)/0x64;for(const _0x48c1a7 of _0x2b2c8a){const _0x2373c3=Math['random']()<=_0x402702;$gameSwitches[_0x49c946(0x7b7)](_0x48c1a7,_0x2373c3);}}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'SwitchRandomizeRange',_0x4d1c98=>{const _0x53b32d=_0x288220;if($gameParty[_0x53b32d(0x8e9)]())return;VisuMZ[_0x53b32d(0x1e9)](_0x4d1c98,_0x4d1c98);const _0xe6e251=Math['min'](_0x4d1c98['StartID'],_0x4d1c98[_0x53b32d(0x855)]),_0x4c496b=Math[_0x53b32d(0x6de)](_0x4d1c98[_0x53b32d(0x305)],_0x4d1c98[_0x53b32d(0x855)]),_0x328655=(_0x4d1c98['Chance']||0x0)/0x64;for(let _0x464c19=_0xe6e251;_0x464c19<=_0x4c496b;_0x464c19++){const _0x1e8a4c=Math['random']()<=_0x328655;$gameSwitches[_0x53b32d(0x7b7)](_0x464c19,_0x1e8a4c);}}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x881),_0x12b9e6=>{const _0x2e4c44=_0x288220;if($gameParty[_0x2e4c44(0x8e9)]())return;VisuMZ[_0x2e4c44(0x1e9)](_0x12b9e6,_0x12b9e6);const _0xa2dd2c=_0x12b9e6[_0x2e4c44(0x54a)];for(const _0x87bdb of _0xa2dd2c){const _0x4573dc=$gameSwitches[_0x2e4c44(0x74b)](_0x87bdb);$gameSwitches[_0x2e4c44(0x7b7)](_0x87bdb,!_0x4573dc);}}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x4be),_0xc286ad=>{const _0x57c78b=_0x288220;if($gameParty[_0x57c78b(0x8e9)]())return;VisuMZ[_0x57c78b(0x1e9)](_0xc286ad,_0xc286ad);const _0x5d177e=Math[_0x57c78b(0x2e1)](_0xc286ad[_0x57c78b(0x305)],_0xc286ad[_0x57c78b(0x855)]),_0x223534=Math['max'](_0xc286ad['StartID'],_0xc286ad[_0x57c78b(0x855)]);for(let _0x55b954=_0x5d177e;_0x55b954<=_0x223534;_0x55b954++){const _0x40e47f=$gameSwitches[_0x57c78b(0x74b)](_0x55b954);$gameSwitches[_0x57c78b(0x7b7)](_0x55b954,!_0x40e47f);}}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x822),_0x2a72ec=>{const _0x5ef227=_0x288220;VisuMZ[_0x5ef227(0x1e9)](_0x2a72ec,_0x2a72ec);const _0x2d766a=_0x2a72ec[_0x5ef227(0x85d)]||0x1;$gameSystem['setMainFontSize'](_0x2d766a);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x2a1),_0x5615cb=>{const _0x5c0f28=_0x288220;if($gameParty[_0x5c0f28(0x8e9)]())return;VisuMZ[_0x5c0f28(0x1e9)](_0x5615cb,_0x5615cb);const _0x45ca9f=_0x5615cb[_0x5c0f28(0x85d)];if(_0x45ca9f[_0x5c0f28(0x54b)](/Front/i))$gameSystem[_0x5c0f28(0x46e)](![]);else _0x45ca9f[_0x5c0f28(0x54b)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x5c0f28(0x46e)](!$gameSystem[_0x5c0f28(0x69d)]());}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x2f0),_0x51e5bd=>{const _0x157a39=_0x288220;if($gameParty[_0x157a39(0x8e9)]())return;VisuMZ[_0x157a39(0x1e9)](_0x51e5bd,_0x51e5bd);const _0x170ae2=[_0x157a39(0x45a),_0x157a39(0x68d),'me','se'];for(const _0x3c971e of _0x170ae2){const _0x14d8cd=_0x51e5bd[_0x3c971e],_0x5a66c3='%1/'[_0x157a39(0x857)](_0x3c971e);for(const _0x3303a1 of _0x14d8cd){AudioManager[_0x157a39(0x6fb)](_0x5a66c3,_0x3303a1);}}}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],_0x288220(0x30f),_0x3bc62b=>{const _0x4ec8ba=_0x288220;if($gameParty[_0x4ec8ba(0x8e9)]())return;VisuMZ[_0x4ec8ba(0x1e9)](_0x3bc62b,_0x3bc62b);const _0xecd95c=[_0x4ec8ba(0x45f),_0x4ec8ba(0x352),_0x4ec8ba(0x49e),'characters',_0x4ec8ba(0x5f6),_0x4ec8ba(0x731),_0x4ec8ba(0x65d),_0x4ec8ba(0x5d8),_0x4ec8ba(0x787),_0x4ec8ba(0x63a),'system',_0x4ec8ba(0x5ec),_0x4ec8ba(0x8a7),_0x4ec8ba(0x7ca)];for(const _0x24609d of _0xecd95c){const _0x27ca49=_0x3bc62b[_0x24609d],_0x1a6fb2=_0x4ec8ba(0x90e)['format'](_0x24609d);for(const _0x57d088 of _0x27ca49){ImageManager[_0x4ec8ba(0x365)](_0x1a6fb2,_0x57d088);}}}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x21d),_0x6f0167=>{const _0x3bcd87=_0x288220;if($gameParty[_0x3bcd87(0x8e9)]())return;VisuMZ[_0x3bcd87(0x1e9)](_0x6f0167,_0x6f0167);const _0x18e1fd=_0x6f0167[_0x3bcd87(0x85d)][_0x3bcd87(0x489)]()[_0x3bcd87(0x91c)](),_0x1c7fdc=VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x18e1fd);$gameSystem[_0x3bcd87(0x85e)](_0x1c7fdc);}),VisuMZ[_0x288220(0x665)][_0x288220(0x6a7)]=function(_0x472763){const _0x2910ab=_0x288220;_0x472763=_0x472763||'DATABASE',_0x472763=String(_0x472763)[_0x2910ab(0x489)]()[_0x2910ab(0x91c)]();switch(_0x472763){case _0x2910ab(0x60e):return 0x0;case'TPB\x20ACTIVE':Imported[_0x2910ab(0x8e3)]&&(ConfigManager[_0x2910ab(0x91a)]=!![]);return 0x1;case _0x2910ab(0x513):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x2910ab(0x91a)]=![]);return 0x2;case _0x2910ab(0x865):if(Imported[_0x2910ab(0x7cb)])return'CTB';break;case'STB':if(Imported[_0x2910ab(0x40a)])return _0x2910ab(0x1f1);break;case _0x2910ab(0x2ce):if(Imported[_0x2910ab(0x56c)])return _0x2910ab(0x2ce);break;case _0x2910ab(0x4ed):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x2910ab(0x4ed);break;case'OTB':if(Imported['VisuMZ_2_BattleSystemOTB'])return _0x2910ab(0x3c1);break;case _0x2910ab(0x876):if(Imported[_0x2910ab(0x461)])return _0x2910ab(0x876);break;case'PTB':if(Imported[_0x2910ab(0x8d6)])return _0x2910ab(0x847);break;}return $dataSystem[_0x2910ab(0x682)];},PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],_0x288220(0x749),_0x185941=>{const _0x478217=_0x288220;VisuMZ['ConvertParams'](_0x185941,_0x185941);const _0x460884=_0x185941[_0x478217(0x85d)]||0x1;$gameSystem[_0x478217(0x7b4)](_0x460884);}),PluginManager[_0x288220(0x72b)](pluginData[_0x288220(0x392)],'TextPopupShow',_0x2a052e=>{const _0x50c4ad=_0x288220;VisuMZ[_0x50c4ad(0x1e9)](_0x2a052e,_0x2a052e);const _0x2fb083=_0x2a052e[_0x50c4ad(0x477)]||'';$textPopup(_0x2fb083);}),PluginManager['registerCommand'](pluginData[_0x288220(0x392)],'VariableEvalReference',_0x3fd649=>{const _0x34a3a4=_0x288220;VisuMZ[_0x34a3a4(0x1e9)](_0x3fd649,_0x3fd649);const _0x36cd19=_0x3fd649['id']||0x1,_0x1c957c=_0x3fd649[_0x34a3a4(0x348)],_0x30fed5=_0x3fd649['operand']||0x0;let _0x66fde4=$gameVariables['value'](_0x36cd19)||0x0;switch(_0x1c957c){case'=':_0x66fde4=_0x30fed5;break;case'+':_0x66fde4+=_0x30fed5;break;case'-':_0x66fde4-=_0x30fed5;break;case'*':_0x66fde4*=_0x30fed5;break;case'/':_0x66fde4/=_0x30fed5;break;case'%':_0x66fde4%=_0x30fed5;break;}_0x66fde4=_0x66fde4||0x0,$gameVariables['setValue'](_0x36cd19,_0x66fde4);}),PluginManager[_0x288220(0x72b)](pluginData['name'],_0x288220(0x721),_0x1cb018=>{const _0x1c2fb3=_0x288220;VisuMZ[_0x1c2fb3(0x1e9)](_0x1cb018,_0x1cb018);const _0x17ae5d=_0x1cb018['id']()||0x1,_0x43109b=_0x1cb018['operation'],_0x12c41a=_0x1cb018[_0x1c2fb3(0x987)]()||0x0;let _0x3c2bc9=$gameVariables[_0x1c2fb3(0x74b)](_0x17ae5d)||0x0;switch(_0x43109b){case'=':_0x3c2bc9=_0x12c41a;break;case'+':_0x3c2bc9+=_0x12c41a;break;case'-':_0x3c2bc9-=_0x12c41a;break;case'*':_0x3c2bc9*=_0x12c41a;break;case'/':_0x3c2bc9/=_0x12c41a;break;case'%':_0x3c2bc9%=_0x12c41a;break;}_0x3c2bc9=_0x3c2bc9||0x0,$gameVariables[_0x1c2fb3(0x7b7)](_0x17ae5d,_0x3c2bc9);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x288220(0x959)],Scene_Boot['prototype'][_0x288220(0x959)]=function(){const _0xfeb46a=_0x288220;VisuMZ[_0xfeb46a(0x665)][_0xfeb46a(0x588)][_0xfeb46a(0x6c3)](this),this[_0xfeb46a(0x87c)](),this[_0xfeb46a(0x6d8)](),this[_0xfeb46a(0x71c)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0xfeb46a(0x4eb)](),this[_0xfeb46a(0x44b)](),VisuMZ[_0xfeb46a(0x275)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x550)]={},Scene_Boot[_0x288220(0x93f)][_0x288220(0x87c)]=function(){const _0x358d3f=_0x288220,_0x5d27db=[_0x358d3f(0x887),'MAXMP',_0x358d3f(0x46c),_0x358d3f(0x8bd),_0x358d3f(0x445),_0x358d3f(0x65a),_0x358d3f(0x908),'LUK'],_0x182817=[_0x358d3f(0x452),_0x358d3f(0x89b),'CRI',_0x358d3f(0x7ef),_0x358d3f(0x671),_0x358d3f(0x5e9),_0x358d3f(0x3f4),'HRG',_0x358d3f(0x58b),_0x358d3f(0x5ef)],_0x402bb4=['TGR',_0x358d3f(0x820),_0x358d3f(0x7e1),'PHA',_0x358d3f(0x925),_0x358d3f(0x6bd),_0x358d3f(0x463),'MDR',_0x358d3f(0x247),_0x358d3f(0x2d5)],_0x3e7593=[_0x5d27db,_0x182817,_0x402bb4],_0x3177c8=[_0x358d3f(0x223),_0x358d3f(0x349),'Plus2',_0x358d3f(0x328),_0x358d3f(0x868),_0x358d3f(0x26a),_0x358d3f(0x839),_0x358d3f(0x37a),_0x358d3f(0x3af),_0x358d3f(0x1d8)];for(const _0xa6479f of _0x3e7593){let _0x1c4892='';if(_0xa6479f===_0x5d27db)_0x1c4892=_0x358d3f(0x367);if(_0xa6479f===_0x182817)_0x1c4892=_0x358d3f(0x2e4);if(_0xa6479f===_0x402bb4)_0x1c4892='sparam';for(const _0x2b3a32 of _0x3177c8){let _0x2c203d='%1%2'[_0x358d3f(0x857)](_0x1c4892,_0x2b3a32);VisuMZ[_0x358d3f(0x665)][_0x358d3f(0x550)][_0x2c203d]=[],VisuMZ[_0x358d3f(0x665)][_0x358d3f(0x550)][_0x2c203d+'JS']=[];let _0x5775d8=_0x358d3f(0x2e6);if(['Plus',_0x358d3f(0x37a)][_0x358d3f(0x479)](_0x2b3a32))_0x5775d8+=_0x358d3f(0x77b);else{if([_0x358d3f(0x349),_0x358d3f(0x3af)][_0x358d3f(0x479)](_0x2b3a32))_0x5775d8+=_0x358d3f(0x87b);else{if([_0x358d3f(0x691),_0x358d3f(0x1d8)][_0x358d3f(0x479)](_0x2b3a32))_0x5775d8+=_0x358d3f(0x5db);else{if(_0x2b3a32===_0x358d3f(0x328))_0x5775d8+=_0x358d3f(0x766);else{if(_0x2b3a32===_0x358d3f(0x26a))_0x5775d8+='(\x5cd+)([%％])>';else _0x2b3a32===_0x358d3f(0x839)&&(_0x5775d8+=_0x358d3f(0x2ec));}}}}for(const _0x5c0680 of _0xa6479f){let _0x1625a0=_0x2b3a32[_0x358d3f(0x207)](/[\d+]/g,'')[_0x358d3f(0x489)]();const _0x181b6f=_0x5775d8['format'](_0x5c0680,_0x1625a0);VisuMZ[_0x358d3f(0x665)][_0x358d3f(0x550)][_0x2c203d][_0x358d3f(0x597)](new RegExp(_0x181b6f,'i'));const _0x15904f=_0x358d3f(0x2b5)[_0x358d3f(0x857)](_0x5c0680,_0x1625a0);VisuMZ['CoreEngine'][_0x358d3f(0x550)][_0x2c203d+'JS'][_0x358d3f(0x597)](new RegExp(_0x15904f,'i'));}}}},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x599e28=_0x288220;if(VisuMZ[_0x599e28(0x275)])return;},Scene_Boot[_0x288220(0x93f)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x54b915=_0x288220,_0x294c0b=VisuMZ['CoreEngine'][_0x54b915(0x30a)];_0x294c0b[_0x54b915(0x23d)][_0x54b915(0x75c)]&&VisuMZ['ShowDevTools'](!![]);_0x294c0b[_0x54b915(0x23d)][_0x54b915(0x470)]&&(Input[_0x54b915(0x75b)][0x23]='end',Input['keyMapper'][0x24]='home');if(_0x294c0b[_0x54b915(0x5ad)]){const _0x32af65=_0x294c0b[_0x54b915(0x5ad)];_0x32af65[_0x54b915(0x3c6)]=_0x32af65[_0x54b915(0x3c6)]||_0x54b915(0x56d),_0x32af65[_0x54b915(0x72a)]=_0x32af65[_0x54b915(0x72a)]||'\x5c}❪TAB❫\x5c{';}_0x294c0b['KeyboardInput'][_0x54b915(0x2c5)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x54b915(0x441),Input[_0x54b915(0x75b)][0x53]=_0x54b915(0x1d2),Input[_0x54b915(0x75b)][0x44]=_0x54b915(0x711),Input[_0x54b915(0x75b)][0x45]='pagedown'),_0x294c0b[_0x54b915(0x31a)]['DashToggleR']&&(Input[_0x54b915(0x75b)][0x52]=_0x54b915(0x2fa)),_0x294c0b[_0x54b915(0x6dd)]['DisplayedParams']=_0x294c0b[_0x54b915(0x6dd)][_0x54b915(0x97b)][_0x54b915(0x972)](_0x5150b1=>_0x5150b1[_0x54b915(0x489)]()['trim']()),_0x294c0b['Param'][_0x54b915(0x6f8)]=_0x294c0b[_0x54b915(0x6dd)][_0x54b915(0x6f8)][_0x54b915(0x972)](_0x2f2246=>_0x2f2246[_0x54b915(0x489)]()[_0x54b915(0x91c)]()),_0x294c0b[_0x54b915(0x23d)][_0x54b915(0x944)]=_0x294c0b[_0x54b915(0x23d)][_0x54b915(0x944)]??!![],_0x294c0b['QoL']['ShiftT_Toggle']=_0x294c0b[_0x54b915(0x23d)][_0x54b915(0x4a6)]??!![],_0x294c0b['ButtonAssist']['SplitEscape']&&VisuMZ[_0x54b915(0x665)][_0x54b915(0x3ca)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x3ca)]=function(){const _0x183bf6=_0x288220;let _0xb6f4ea=![],_0x40c4d8=![];for(let _0x520d2e in Input[_0x183bf6(0x75b)]){const _0x5762a9=Input[_0x183bf6(0x75b)][_0x520d2e];if(_0x5762a9===_0x183bf6(0x741))_0xb6f4ea=!![];if(_0x5762a9===_0x183bf6(0x4df))_0x40c4d8=!![];if(_0xb6f4ea&&_0x40c4d8)return;}let _0x12c63='ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a';_0x12c63+=_0x183bf6(0x84f),_0x12c63+=_0x183bf6(0x551),_0x12c63+=_0x183bf6(0x72c),_0x12c63+=_0x183bf6(0x1ec),alert(_0x12c63),SceneManager['exit']();},Scene_Boot['prototype'][_0x288220(0x3ea)]=function(){const _0x21c772=_0x288220;this[_0x21c772(0x250)]();},Scene_Boot[_0x288220(0x93f)][_0x288220(0x250)]=function(){const _0x2f0dc4=_0x288220,_0x2f92e3=VisuMZ[_0x2f0dc4(0x665)]['Settings'][_0x2f0dc4(0x656)];for(const _0x2c8104 of _0x2f92e3){const _0x318248=_0x2c8104['FunctionName'][_0x2f0dc4(0x207)](/[ ]/g,''),_0x5f1e23=_0x2c8104[_0x2f0dc4(0x48d)];VisuMZ[_0x2f0dc4(0x665)][_0x2f0dc4(0x576)](_0x318248,_0x5f1e23);}},VisuMZ[_0x288220(0x665)]['createJsQuickFunction']=function(_0x6544fa,_0x316631){const _0x59e1e5=_0x288220;if(!!window[_0x6544fa]){if($gameTemp[_0x59e1e5(0x813)]())console[_0x59e1e5(0x94a)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x59e1e5(0x857)](_0x6544fa));}const _0x3fc887=_0x59e1e5(0x5ac)['format'](_0x6544fa,_0x316631);window[_0x6544fa]=new Function(_0x3fc887);},Scene_Boot[_0x288220(0x93f)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x3003b1=_0x288220,_0x271186=VisuMZ[_0x3003b1(0x665)][_0x3003b1(0x30a)]['CustomParam'];if(!_0x271186)return;for(const _0x3cac5b of _0x271186){if(!_0x3cac5b)continue;VisuMZ['CoreEngine'][_0x3003b1(0x33f)](_0x3cac5b);}},VisuMZ[_0x288220(0x665)][_0x288220(0x68e)]={},VisuMZ[_0x288220(0x665)]['CustomParamIcons']={},VisuMZ[_0x288220(0x665)]['CustomParamType']={},VisuMZ[_0x288220(0x665)][_0x288220(0x7db)]={},VisuMZ[_0x288220(0x665)]['createCustomParameter']=function(_0x34cab2){const _0x2b0216=_0x288220,_0x5a63af=_0x34cab2['Abbreviation'],_0x12bd77=_0x34cab2['ParamName'],_0x44b12c=_0x34cab2['Icon'],_0x24cab1=_0x34cab2[_0x2b0216(0x403)],_0x52ca66=new Function(_0x34cab2[_0x2b0216(0x6a8)]);VisuMZ[_0x2b0216(0x665)][_0x2b0216(0x68e)][_0x5a63af[_0x2b0216(0x489)]()[_0x2b0216(0x91c)]()]=_0x12bd77,VisuMZ['CoreEngine'][_0x2b0216(0x54c)][_0x5a63af[_0x2b0216(0x489)]()['trim']()]=_0x44b12c,VisuMZ['CoreEngine'][_0x2b0216(0x2d0)][_0x5a63af[_0x2b0216(0x489)]()[_0x2b0216(0x91c)]()]=_0x24cab1,VisuMZ[_0x2b0216(0x665)][_0x2b0216(0x7db)][_0x5a63af[_0x2b0216(0x489)]()[_0x2b0216(0x91c)]()]=_0x5a63af,Object[_0x2b0216(0x82c)](Game_BattlerBase['prototype'],_0x5a63af,{'get'(){const _0x574e74=_0x2b0216,_0x4f4c05=_0x52ca66[_0x574e74(0x6c3)](this);return _0x24cab1==='integer'?Math[_0x574e74(0x3ff)](_0x4f4c05):_0x4f4c05;}});},VisuMZ[_0x288220(0x665)]['ControllerButtons']={},VisuMZ[_0x288220(0x665)][_0x288220(0x7fd)]={},Scene_Boot[_0x288220(0x93f)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x388164=_0x288220,_0x1b1a7c=VisuMZ[_0x388164(0x665)]['Settings']['ControllerButtons'];for(const _0x2bf4a2 of _0x1b1a7c){const _0x3927ff=(_0x2bf4a2[_0x388164(0x714)]||'')['toLowerCase']()[_0x388164(0x91c)](),_0x25c017=(_0x2bf4a2[_0x388164(0x950)]||'')[_0x388164(0x357)]()['trim']();VisuMZ['CoreEngine']['ControllerButtons'][_0x3927ff]=_0x2bf4a2,VisuMZ['CoreEngine']['ControllerMatches'][_0x25c017]=_0x3927ff;}},VisuMZ['ParseAllNotetags']=function(){const _0x3f48a0=_0x288220;for(const _0x1cd1ca of $dataActors){if(_0x1cd1ca)VisuMZ[_0x3f48a0(0x4f7)](_0x1cd1ca);}for(const _0x3f97c9 of $dataClasses){if(_0x3f97c9)VisuMZ['ParseClassNotetags'](_0x3f97c9);}for(const _0x25f945 of $dataSkills){if(_0x25f945)VisuMZ[_0x3f48a0(0x66b)](_0x25f945);}for(const _0xe27c09 of $dataItems){if(_0xe27c09)VisuMZ['ParseItemNotetags'](_0xe27c09);}for(const _0x14efda of $dataWeapons){if(_0x14efda)VisuMZ['ParseWeaponNotetags'](_0x14efda);}for(const _0x329630 of $dataArmors){if(_0x329630)VisuMZ[_0x3f48a0(0x5a0)](_0x329630);}for(const _0x53bdd7 of $dataEnemies){if(_0x53bdd7)VisuMZ['ParseEnemyNotetags'](_0x53bdd7);}for(const _0x4164c8 of $dataStates){if(_0x4164c8)VisuMZ[_0x3f48a0(0x203)](_0x4164c8);}for(const _0x4f3127 of $dataTilesets){if(_0x4f3127)VisuMZ[_0x3f48a0(0x573)](_0x4f3127);}},VisuMZ[_0x288220(0x4f7)]=function(_0x5d3131){},VisuMZ[_0x288220(0x5b6)]=function(_0x47c823){},VisuMZ[_0x288220(0x66b)]=function(_0x3f1a5a){},VisuMZ[_0x288220(0x765)]=function(_0x269072){},VisuMZ['ParseWeaponNotetags']=function(_0x185817){},VisuMZ['ParseArmorNotetags']=function(_0x2a3caf){},VisuMZ[_0x288220(0x3dc)]=function(_0x4857b4){},VisuMZ[_0x288220(0x203)]=function(_0xbeb08b){},VisuMZ[_0x288220(0x573)]=function(_0x460276){},VisuMZ[_0x288220(0x665)][_0x288220(0x4f7)]=VisuMZ[_0x288220(0x4f7)],VisuMZ['ParseActorNotetags']=function(_0x3a2e77){const _0xa1b98e=_0x288220;VisuMZ[_0xa1b98e(0x665)][_0xa1b98e(0x4f7)][_0xa1b98e(0x6c3)](this,_0x3a2e77);const _0x2fb386=_0x3a2e77['note'];if(_0x2fb386['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x3a2e77[_0xa1b98e(0x602)]=Number(RegExp['$1']);if(_0x3a2e77[_0xa1b98e(0x602)]===0x0)_0x3a2e77[_0xa1b98e(0x602)]=Number[_0xa1b98e(0x32e)];}_0x2fb386[_0xa1b98e(0x54b)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x3a2e77[_0xa1b98e(0x347)]=Math[_0xa1b98e(0x2e1)](Number(RegExp['$1']),_0x3a2e77['maxLevel']));},VisuMZ['CoreEngine'][_0x288220(0x5b6)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x288220(0x5b6)]=function(_0x51bafc){const _0x4b588d=_0x288220;VisuMZ[_0x4b588d(0x665)][_0x4b588d(0x5b6)][_0x4b588d(0x6c3)](this,_0x51bafc);if(_0x51bafc[_0x4b588d(0x909)])for(const _0x552772 of _0x51bafc[_0x4b588d(0x909)]){_0x552772['note'][_0x4b588d(0x54b)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x552772['level']=Math[_0x4b588d(0x6de)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x288220(0x665)][_0x288220(0x3dc)]=VisuMZ[_0x288220(0x3dc)],VisuMZ[_0x288220(0x3dc)]=function(_0x1418cf){const _0x8a8405=_0x288220;VisuMZ['CoreEngine'][_0x8a8405(0x3dc)][_0x8a8405(0x6c3)](this,_0x1418cf),_0x1418cf[_0x8a8405(0x867)]=0x1;const _0x453a53=_0x1418cf[_0x8a8405(0x8d8)];if(_0x453a53[_0x8a8405(0x54b)](/<LEVEL:[ ](\d+)>/i))_0x1418cf['level']=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<MAXHP:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x7be)][0x0]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<MAXMP:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x7be)][0x1]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<ATK:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x7be)][0x2]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<DEF:[ ](\d+)>/i))_0x1418cf['params'][0x3]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<MAT:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x7be)][0x4]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<MDF:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x7be)][0x5]=Number(RegExp['$1']);if(_0x453a53['match'](/<AGI:[ ](\d+)>/i))_0x1418cf['params'][0x6]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<LUK:[ ](\d+)>/i))_0x1418cf['params'][0x7]=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<EXP:[ ](\d+)>/i))_0x1418cf['exp']=Number(RegExp['$1']);if(_0x453a53[_0x8a8405(0x54b)](/<GOLD:[ ](\d+)>/i))_0x1418cf[_0x8a8405(0x3ad)]=Number(RegExp['$1']);},VisuMZ[_0x288220(0x665)][_0x288220(0x66f)]=Graphics[_0x288220(0x666)],Graphics[_0x288220(0x666)]=function(){const _0x563db1=_0x288220;switch(VisuMZ[_0x563db1(0x665)][_0x563db1(0x30a)][_0x563db1(0x23d)][_0x563db1(0x641)]){case'stretch':return!![];case'normal':return![];default:return VisuMZ[_0x563db1(0x665)][_0x563db1(0x66f)]['call'](this);}},VisuMZ[_0x288220(0x665)][_0x288220(0x88f)]=Graphics['printError'],Graphics[_0x288220(0x21e)]=function(_0x1887e6,_0x1b912b,_0x33cfa1=null){const _0x38f50d=_0x288220;VisuMZ[_0x38f50d(0x665)][_0x38f50d(0x88f)][_0x38f50d(0x6c3)](this,_0x1887e6,_0x1b912b,_0x33cfa1),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x288220(0x665)][_0x288220(0x586)]=Graphics[_0x288220(0x44d)],Graphics[_0x288220(0x44d)]=function(_0x596c7a){const _0x118269=_0x288220;VisuMZ[_0x118269(0x665)][_0x118269(0x586)]['call'](this,_0x596c7a),this[_0x118269(0x6c9)](_0x596c7a);},Graphics[_0x288220(0x6c9)]=function(_0x42c25e){const _0x17e1f8=_0x288220;VisuMZ['CoreEngine'][_0x17e1f8(0x30a)]['QoL']['FontSmoothing']&&(_0x42c25e[_0x17e1f8(0x487)][_0x17e1f8(0x294)]=_0x17e1f8(0x663));VisuMZ[_0x17e1f8(0x665)][_0x17e1f8(0x30a)][_0x17e1f8(0x23d)][_0x17e1f8(0x204)]&&(_0x42c25e[_0x17e1f8(0x487)][_0x17e1f8(0x946)]='pixelated');const _0x4902b3=Math['max'](0x0,Math['floor'](_0x42c25e[_0x17e1f8(0x426)]*this[_0x17e1f8(0x3bc)])),_0x2fe4eb=Math['max'](0x0,Math['floor'](_0x42c25e[_0x17e1f8(0x4b9)]*this[_0x17e1f8(0x3bc)]));_0x42c25e[_0x17e1f8(0x487)][_0x17e1f8(0x426)]=_0x4902b3+'px',_0x42c25e[_0x17e1f8(0x487)]['height']=_0x2fe4eb+'px';},VisuMZ['CoreEngine'][_0x288220(0x5f8)]=Bitmap[_0x288220(0x93f)][_0x288220(0x501)],Bitmap[_0x288220(0x93f)][_0x288220(0x501)]=function(_0x39019d,_0xbe444b){const _0x23b801=_0x288220;VisuMZ[_0x23b801(0x665)]['Bitmap_initialize'][_0x23b801(0x6c3)](this,_0x39019d,_0xbe444b),this[_0x23b801(0x623)]=!(VisuMZ[_0x23b801(0x665)]['Settings'][_0x23b801(0x23d)]['PixelateImageRendering']??!![]);},Bitmap[_0x288220(0x93f)][_0x288220(0x6fe)]=function(){this['_customModified']=!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x5e0)]=Sprite[_0x288220(0x93f)]['destroy'],Sprite['prototype'][_0x288220(0x337)]=function(){const _0x1220f6=_0x288220;if(this[_0x1220f6(0x3dd)])VisuMZ[_0x1220f6(0x665)][_0x1220f6(0x5e0)][_0x1220f6(0x6c3)](this);this[_0x1220f6(0x8f2)]();},Sprite[_0x288220(0x93f)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x42cac9=_0x288220;if(!this[_0x42cac9(0x421)])return;if(!this[_0x42cac9(0x421)]['_customModified'])return;this['bitmap'][_0x42cac9(0x1e7)]&&!this[_0x42cac9(0x4d0)][_0x42cac9(0x1e7)]['destroyed']&&this[_0x42cac9(0x421)]['destroy']();},VisuMZ[_0x288220(0x665)][_0x288220(0x51b)]=Bitmap[_0x288220(0x93f)]['resize'],Bitmap[_0x288220(0x93f)][_0x288220(0x689)]=function(_0x32db7e,_0x229cbc){const _0x437f10=_0x288220;VisuMZ[_0x437f10(0x665)]['Bitmap_resize'][_0x437f10(0x6c3)](this,_0x32db7e,_0x229cbc),this[_0x437f10(0x6fe)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x1d5)]=Bitmap[_0x288220(0x93f)][_0x288220(0x7a1)],Bitmap[_0x288220(0x93f)][_0x288220(0x7a1)]=function(_0x98fbf0,_0x679878,_0x4becb8,_0x51cf30,_0x3e5462,_0x5babf7,_0x2b653a,_0x5de583,_0x296763){const _0x2ddc40=_0x288220;_0x679878=Math[_0x2ddc40(0x3ff)](_0x679878),_0x4becb8=Math[_0x2ddc40(0x3ff)](_0x4becb8),_0x51cf30=Math[_0x2ddc40(0x3ff)](_0x51cf30),_0x3e5462=Math['round'](_0x3e5462),_0x5babf7=Math[_0x2ddc40(0x3ff)](_0x5babf7),_0x2b653a=Math['round'](_0x2b653a),VisuMZ[_0x2ddc40(0x665)]['Bitmap_blt']['call'](this,_0x98fbf0,_0x679878,_0x4becb8,_0x51cf30,_0x3e5462,_0x5babf7,_0x2b653a,_0x5de583,_0x296763),this[_0x2ddc40(0x6fe)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x627)]=Bitmap[_0x288220(0x93f)][_0x288220(0x7c4)],Bitmap['prototype'][_0x288220(0x7c4)]=function(_0x4242a1,_0x153bc9,_0x16e926,_0x2c548f){const _0x5945b1=_0x288220;VisuMZ['CoreEngine']['Bitmap_clearRect'][_0x5945b1(0x6c3)](this,_0x4242a1,_0x153bc9,_0x16e926,_0x2c548f),this[_0x5945b1(0x6fe)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x32a)]=Bitmap[_0x288220(0x93f)][_0x288220(0x363)],Bitmap[_0x288220(0x93f)]['fillRect']=function(_0x1d1809,_0x287c14,_0x24c654,_0x224fe6,_0x854be5){const _0x5d228b=_0x288220;VisuMZ[_0x5d228b(0x665)]['Bitmap_fillRect'][_0x5d228b(0x6c3)](this,_0x1d1809,_0x287c14,_0x24c654,_0x224fe6,_0x854be5),this[_0x5d228b(0x6fe)]();},VisuMZ[_0x288220(0x665)]['Bitmap_strokeRect']=Bitmap[_0x288220(0x93f)][_0x288220(0x59f)],Bitmap[_0x288220(0x93f)][_0x288220(0x59f)]=function(_0x1cae44,_0xfb9fc5,_0x245c7c,_0x91123c,_0x2afb78){const _0x1aaed2=_0x288220;VisuMZ[_0x1aaed2(0x665)][_0x1aaed2(0x914)]['call'](this,_0x1cae44,_0xfb9fc5,_0x245c7c,_0x91123c,_0x2afb78),this[_0x1aaed2(0x6fe)]();},VisuMZ['CoreEngine']['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x288220(0x5f7)],Bitmap[_0x288220(0x93f)][_0x288220(0x5f7)]=function(_0x226682,_0x55a627,_0x266fd5,_0x333fa7,_0x3e81d7,_0x364dba,_0x451cbf){const _0x186777=_0x288220;VisuMZ[_0x186777(0x665)][_0x186777(0x439)][_0x186777(0x6c3)](this,_0x226682,_0x55a627,_0x266fd5,_0x333fa7,_0x3e81d7,_0x364dba,_0x451cbf),this[_0x186777(0x6fe)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x2bf)]=Bitmap[_0x288220(0x93f)][_0x288220(0x44a)],Bitmap['prototype']['drawCircle']=function(_0x26f4a3,_0x3afd3d,_0x38b40d,_0x1a1737){const _0x221061=_0x288220;_0x26f4a3=Math[_0x221061(0x3ff)](_0x26f4a3),_0x3afd3d=Math['round'](_0x3afd3d),_0x38b40d=Math[_0x221061(0x3ff)](_0x38b40d),VisuMZ['CoreEngine'][_0x221061(0x2bf)]['call'](this,_0x26f4a3,_0x3afd3d,_0x38b40d,_0x1a1737),this[_0x221061(0x6fe)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x96b)]=Bitmap[_0x288220(0x93f)][_0x288220(0x948)],Bitmap[_0x288220(0x93f)][_0x288220(0x948)]=function(_0x4d3cfd){const _0x88ca71=_0x288220;return Math['ceil'](VisuMZ[_0x88ca71(0x665)]['Bitmap_measureTextWidth'][_0x88ca71(0x6c3)](this,_0x4d3cfd));},VisuMZ[_0x288220(0x665)]['Bitmap_drawText']=Bitmap[_0x288220(0x93f)][_0x288220(0x3d0)],Bitmap['prototype'][_0x288220(0x3d0)]=function(_0x27700d,_0x36e7b8,_0x2363ac,_0x5f47d3,_0x52bb2c,_0x5360b7){const _0x561762=_0x288220;_0x36e7b8=Math['round'](_0x36e7b8),_0x2363ac=Math[_0x561762(0x3ff)](_0x2363ac),_0x5f47d3=Math['ceil'](_0x5f47d3),_0x52bb2c=Math[_0x561762(0x3eb)](_0x52bb2c),VisuMZ[_0x561762(0x665)][_0x561762(0x1f2)][_0x561762(0x6c3)](this,_0x27700d,_0x36e7b8,_0x2363ac,_0x5f47d3,_0x52bb2c,_0x5360b7),this['markCoreEngineModified']();},VisuMZ[_0x288220(0x665)][_0x288220(0x29b)]=Bitmap['prototype'][_0x288220(0x1f0)],Bitmap[_0x288220(0x93f)][_0x288220(0x1f0)]=function(_0xfbcd0b,_0x2317ce,_0x18f103,_0x1ab398){const _0x491ad9=_0x288220;VisuMZ['CoreEngine'][_0x491ad9(0x30a)][_0x491ad9(0x23d)][_0x491ad9(0x843)]?this[_0x491ad9(0x8e6)](_0xfbcd0b,_0x2317ce,_0x18f103,_0x1ab398):VisuMZ['CoreEngine'][_0x491ad9(0x29b)][_0x491ad9(0x6c3)](this,_0xfbcd0b,_0x2317ce,_0x18f103,_0x1ab398);},Bitmap[_0x288220(0x93f)][_0x288220(0x8e6)]=function(_0xa1fa59,_0x3a1030,_0x406506,_0x18a496){const _0x58b164=_0x288220,_0x374548=this[_0x58b164(0x635)];_0x374548['fillStyle']=this[_0x58b164(0x500)],_0x374548[_0x58b164(0x632)](_0xa1fa59,_0x3a1030+0x2,_0x406506+0x2,_0x18a496);},VisuMZ['CoreEngine'][_0x288220(0x716)]=Input[_0x288220(0x895)],Input['clear']=function(){const _0x4c924f=_0x288220;VisuMZ[_0x4c924f(0x665)][_0x4c924f(0x716)][_0x4c924f(0x6c3)](this),this[_0x4c924f(0x3a5)]=undefined,this['_inputSpecialKeyCode']=undefined,this['_gamepadWait']=Input[_0x4c924f(0x5ed)];},VisuMZ[_0x288220(0x665)]['Input_update']=Input[_0x288220(0x508)],Input[_0x288220(0x508)]=function(){const _0x445ddf=_0x288220;VisuMZ[_0x445ddf(0x665)][_0x445ddf(0x1ea)]['call'](this);if(this[_0x445ddf(0x2d3)])this[_0x445ddf(0x2d3)]--;},VisuMZ[_0x288220(0x665)][_0x288220(0x341)]=Input[_0x288220(0x3d5)],Input[_0x288220(0x3d5)]=function(){const _0x13cd77=_0x288220;if(this[_0x13cd77(0x2d3)])return;VisuMZ[_0x13cd77(0x665)][_0x13cd77(0x341)]['call'](this);},VisuMZ[_0x288220(0x665)]['Input_setupEventHandlers']=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x360b85=_0x288220;VisuMZ[_0x360b85(0x665)][_0x360b85(0x46b)][_0x360b85(0x6c3)](this),document[_0x360b85(0x1f3)](_0x360b85(0x8e5),this[_0x360b85(0x4ab)][_0x360b85(0x3c9)](this));},VisuMZ[_0x288220(0x665)][_0x288220(0x8d2)]=Input[_0x288220(0x473)],Input[_0x288220(0x473)]=function(_0xa6b9f5){const _0x4cd8f6=_0x288220;this[_0x4cd8f6(0x338)]=_0xa6b9f5['keyCode'],VisuMZ[_0x4cd8f6(0x665)]['Input_onKeyDown'][_0x4cd8f6(0x6c3)](this,_0xa6b9f5),this[_0x4cd8f6(0x4cb)](null);},Input['_onKeyPress']=function(_0x2a76f6){const _0x3bc9d6=_0x288220;this[_0x3bc9d6(0x253)](_0x2a76f6);},Input['_registerKeyInput']=function(_0x50d366){const _0x573666=_0x288220;this[_0x573666(0x338)]=_0x50d366[_0x573666(0x7f3)];let _0x44da1a=String['fromCharCode'](_0x50d366[_0x573666(0x3ba)]);this['_inputString']===undefined?this[_0x573666(0x3a5)]=_0x44da1a:this[_0x573666(0x3a5)]+=_0x44da1a;},VisuMZ[_0x288220(0x665)][_0x288220(0x8c4)]=Input[_0x288220(0x343)],Input[_0x288220(0x343)]=function(_0x1bcdd2){const _0x486e59=_0x288220;if(_0x1bcdd2===0x8)return![];return VisuMZ[_0x486e59(0x665)][_0x486e59(0x8c4)][_0x486e59(0x6c3)](this,_0x1bcdd2);},Input[_0x288220(0x6ef)]=function(_0x54914b){const _0x22d023=_0x288220;if(_0x54914b[_0x22d023(0x54b)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x54914b[_0x22d023(0x54b)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x54914b['match'](/escape/i))return this[_0x22d023(0x338)]===0x1b;},Input['isNumpadPressed']=function(){const _0x24c7c7=_0x288220;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x24c7c7(0x3c5)](this['_inputSpecialKeyCode']);},Input[_0x288220(0x4b0)]=function(){const _0x545955=_0x288220;return[0x25,0x26,0x27,0x28]['contains'](this[_0x545955(0x338)]);},Input['isGamepadConnected']=function(){const _0x12e5a6=_0x288220;if(navigator[_0x12e5a6(0x6b9)]){const _0x333347=navigator[_0x12e5a6(0x6b9)]();if(_0x333347)for(const _0x4d6a1f of _0x333347){if(_0x4d6a1f&&_0x4d6a1f['connected'])return!![];}}return![];},Input[_0x288220(0x282)]=function(){const _0x3266d5=_0x288220;if(navigator[_0x3266d5(0x6b9)]){const _0x5b2eea=navigator[_0x3266d5(0x6b9)]();if(_0x5b2eea)for(const _0x5cd291 of _0x5b2eea){if(_0x5cd291&&_0x5cd291[_0x3266d5(0x59d)]){if(this[_0x3266d5(0x88d)](_0x5cd291))return!![];if(this['isGamepadAxisMoved'](_0x5cd291))return!![];}}}return![];},Input[_0x288220(0x88d)]=function(_0x2ef11d){const _0x540ba7=_0x288220,_0x29c5ed=_0x2ef11d[_0x540ba7(0x386)];for(let _0x2bf33a=0x0;_0x2bf33a<_0x29c5ed[_0x540ba7(0x2cd)];_0x2bf33a++){if(_0x29c5ed[_0x2bf33a][_0x540ba7(0x307)])return!![];}return![];},Input[_0x288220(0x8be)]=function(_0x55b73b){const _0x469a1d=_0x288220,_0x91b176=_0x55b73b[_0x469a1d(0x7f9)],_0x35496a=0.5;if(_0x91b176[0x0]<-_0x35496a)return!![];if(_0x91b176[0x0]>_0x35496a)return!![];if(_0x91b176[0x1]<-_0x35496a)return!![];if(_0x91b176[0x1]>_0x35496a)return!![];return![];},Input[_0x288220(0x934)]=function(){const _0x53dc6b=_0x288220;return this[_0x53dc6b(0x4de)]||null;},Input[_0x288220(0x4cb)]=function(_0x2bc01f){const _0x25acd6=_0x288220;this[_0x25acd6(0x4de)]=_0x2bc01f;},VisuMZ[_0x288220(0x665)]['Input_updateGamepadState']=Input[_0x288220(0x901)],Input[_0x288220(0x901)]=function(_0x4ef8c5){const _0x336cab=_0x288220;VisuMZ[_0x336cab(0x665)][_0x336cab(0x5cf)][_0x336cab(0x6c3)](this,_0x4ef8c5),(this[_0x336cab(0x88d)](_0x4ef8c5)||this[_0x336cab(0x8be)](_0x4ef8c5))&&this[_0x336cab(0x4cb)](_0x4ef8c5);},Input[_0x288220(0x98a)]=function(){const _0x39f71f=_0x288220;return this[_0x39f71f(0x4de)]?this[_0x39f71f(0x4de)]['id']:_0x39f71f(0x8aa);},VisuMZ['CoreEngine'][_0x288220(0x377)]=Tilemap[_0x288220(0x93f)][_0x288220(0x71f)],Tilemap['prototype'][_0x288220(0x71f)]=function(_0x1a63a3,_0x4b7b00,_0x3a1f87,_0x4aaa1e){const _0x217045=_0x288220;if($gameMap&&$gameMap[_0x217045(0x4fd)]())return;VisuMZ['CoreEngine']['Tilemap_addShadow']['call'](this,_0x1a63a3,_0x4b7b00,_0x3a1f87,_0x4aaa1e);},Tilemap[_0x288220(0x2de)][_0x288220(0x93f)][_0x288220(0x205)]=function(){const _0x27b55d=_0x288220;this['_destroyInternalTextures']();for(let _0x6f9fd7=0x0;_0x6f9fd7<Tilemap[_0x27b55d(0x64e)][_0x27b55d(0x48b)];_0x6f9fd7++){const _0x1cfc22=new PIXI['BaseTexture']();_0x1cfc22['setSize'](0x800,0x800),VisuMZ['CoreEngine'][_0x27b55d(0x30a)][_0x27b55d(0x23d)]['PixelateImageRendering']&&(_0x1cfc22[_0x27b55d(0x7a6)]=PIXI['SCALE_MODES'][_0x27b55d(0x2c7)]),this[_0x27b55d(0x447)]['push'](_0x1cfc22);}},WindowLayer[_0x288220(0x93f)][_0x288220(0x3db)]=function(){const _0xc74e7f=_0x288220;return SceneManager&&SceneManager[_0xc74e7f(0x482)]?SceneManager[_0xc74e7f(0x482)][_0xc74e7f(0x997)]():!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x6c1)]=WindowLayer[_0x288220(0x93f)][_0x288220(0x80b)],WindowLayer[_0x288220(0x93f)][_0x288220(0x80b)]=function render(_0x6f0bc3){const _0x43f7a5=_0x288220;this[_0x43f7a5(0x3db)]()?VisuMZ[_0x43f7a5(0x665)][_0x43f7a5(0x6c1)][_0x43f7a5(0x6c3)](this,_0x6f0bc3):this[_0x43f7a5(0x3cc)](_0x6f0bc3);},WindowLayer[_0x288220(0x93f)][_0x288220(0x3cc)]=function render(_0x41f5d7){const _0x3b9b1a=_0x288220;if(!this[_0x3b9b1a(0x91f)])return;const _0xebbbdc=new PIXI[(_0x3b9b1a(0x7c9))](),_0x23059b=_0x41f5d7['gl'],_0x4e28a1=this[_0x3b9b1a(0x493)][_0x3b9b1a(0x73e)]();_0x41f5d7['framebuffer'][_0x3b9b1a(0x535)](),_0xebbbdc[_0x3b9b1a(0x68f)]=this[_0x3b9b1a(0x68f)],_0x41f5d7['batch']['flush'](),_0x23059b[_0x3b9b1a(0x2ee)](_0x23059b[_0x3b9b1a(0x95a)]);while(_0x4e28a1['length']>0x0){const _0x2cce93=_0x4e28a1['shift']();_0x2cce93[_0x3b9b1a(0x322)]&&_0x2cce93[_0x3b9b1a(0x91f)]&&_0x2cce93['openness']>0x0&&(_0x23059b[_0x3b9b1a(0x284)](_0x23059b[_0x3b9b1a(0x879)],0x0,~0x0),_0x23059b['stencilOp'](_0x23059b['KEEP'],_0x23059b[_0x3b9b1a(0x522)],_0x23059b[_0x3b9b1a(0x522)]),_0x2cce93[_0x3b9b1a(0x80b)](_0x41f5d7),_0x41f5d7[_0x3b9b1a(0x805)][_0x3b9b1a(0x662)](),_0xebbbdc[_0x3b9b1a(0x895)](),_0x23059b[_0x3b9b1a(0x284)](_0x23059b['ALWAYS'],0x1,~0x0),_0x23059b[_0x3b9b1a(0x306)](_0x23059b['REPLACE'],_0x23059b[_0x3b9b1a(0x236)],_0x23059b[_0x3b9b1a(0x236)]),_0x23059b[_0x3b9b1a(0x79c)](_0x23059b['ZERO'],_0x23059b[_0x3b9b1a(0x2e0)]),_0xebbbdc[_0x3b9b1a(0x80b)](_0x41f5d7),_0x41f5d7['batch'][_0x3b9b1a(0x662)](),_0x23059b[_0x3b9b1a(0x79c)](_0x23059b[_0x3b9b1a(0x2e0)],_0x23059b[_0x3b9b1a(0x449)]));}_0x23059b['disable'](_0x23059b[_0x3b9b1a(0x95a)]),_0x23059b[_0x3b9b1a(0x895)](_0x23059b[_0x3b9b1a(0x986)]),_0x23059b[_0x3b9b1a(0x785)](0x0),_0x41f5d7[_0x3b9b1a(0x805)][_0x3b9b1a(0x662)]();for(const _0xaca1a1 of this[_0x3b9b1a(0x493)]){!_0xaca1a1[_0x3b9b1a(0x322)]&&_0xaca1a1[_0x3b9b1a(0x91f)]&&_0xaca1a1[_0x3b9b1a(0x80b)](_0x41f5d7);}_0x41f5d7[_0x3b9b1a(0x805)][_0x3b9b1a(0x662)]();},DataManager[_0x288220(0x33c)]=function(_0x4ea0d8){const _0x3f6eef=_0x288220;return this[_0x3f6eef(0x254)](_0x4ea0d8)&&_0x4ea0d8[_0x3f6eef(0x468)]===0x2;},VisuMZ[_0x288220(0x665)][_0x288220(0x8b6)]=DataManager['setupNewGame'],DataManager[_0x288220(0x472)]=function(){const _0x5eb624=_0x288220;VisuMZ[_0x5eb624(0x665)][_0x5eb624(0x8b6)][_0x5eb624(0x6c3)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x5eb624(0x99c)]();},DataManager[_0x288220(0x8dd)]=function(){const _0xa7983=_0x288220;if($gameTemp[_0xa7983(0x813)]()){const _0x48e169=VisuMZ[_0xa7983(0x665)][_0xa7983(0x30a)][_0xa7983(0x23d)][_0xa7983(0x505)];if(_0x48e169>0x0)$gameTemp[_0xa7983(0x6d1)](_0x48e169);}},DataManager[_0x288220(0x99c)]=function(){const _0x2276a9=_0x288220,_0x47eb83=VisuMZ['CoreEngine']['Settings'][_0x2276a9(0x23d)]['NewGameCommonEventAll']||0x0;if(_0x47eb83>0x0)$gameTemp['reserveCommonEvent'](_0x47eb83);},DataManager[_0x288220(0x978)]=function(_0x12dc85){const _0x121a3d=_0x288220,_0x1f0f90=$dataTroops[_0x12dc85];if(!_0x1f0f90)return'';let _0x530f82='';_0x530f82+=_0x1f0f90[_0x121a3d(0x392)];for(const _0x25764e of _0x1f0f90[_0x121a3d(0x2ff)]){for(const _0x420f59 of _0x25764e['list']){[0x6c,0x198][_0x121a3d(0x479)](_0x420f59[_0x121a3d(0x1fd)])&&(_0x530f82+='\x0a',_0x530f82+=_0x420f59[_0x121a3d(0x7e4)][0x0]);}}return _0x530f82;};(VisuMZ['CoreEngine'][_0x288220(0x30a)][_0x288220(0x23d)][_0x288220(0x571)]??!![])&&($scene=null,VisuMZ[_0x288220(0x665)]['Scene_Base_create']=Scene_Base['prototype'][_0x288220(0x898)],Scene_Base['prototype'][_0x288220(0x898)]=function(){VisuMZ['CoreEngine']['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x288220(0x665)][_0x288220(0x707)]=Scene_Map[_0x288220(0x93f)][_0x288220(0x428)],Scene_Map[_0x288220(0x93f)]['createSpriteset']=function(){const _0x4a655d=_0x288220;VisuMZ['CoreEngine']['Scene_Map_createSpriteset']['call'](this),$spriteset=this[_0x4a655d(0x5de)];},VisuMZ[_0x288220(0x665)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x288220(0x93f)]['createSpriteset'],Scene_Battle[_0x288220(0x93f)]['createSpriteset']=function(){const _0x49cadc=_0x288220;VisuMZ[_0x49cadc(0x665)][_0x49cadc(0x869)]['call'](this),$spriteset=this[_0x49cadc(0x5de)];},VisuMZ['CoreEngine'][_0x288220(0x7fe)]=Scene_Base[_0x288220(0x93f)][_0x288220(0x791)],Scene_Base[_0x288220(0x93f)][_0x288220(0x791)]=function(){const _0x1217b3=_0x288220;VisuMZ['CoreEngine']['Scene_Base_terminate'][_0x1217b3(0x6c3)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x288220(0x665)][_0x288220(0x7d4)]=BattleManager[_0x288220(0x508)],BattleManager['update']=function(_0x11c783){const _0x175f49=_0x288220;VisuMZ[_0x175f49(0x665)][_0x175f49(0x7d4)][_0x175f49(0x6c3)](this,_0x11c783),this[_0x175f49(0x20c)]();},BattleManager['updateBattleVariables']=function(){const _0x2978b0=_0x288220;$subject=this[_0x2978b0(0x520)],$targets=this[_0x2978b0(0x24a)],$target=this[_0x2978b0(0x351)]||this[_0x2978b0(0x24a)][0x0];},$event=null,VisuMZ[_0x288220(0x665)][_0x288220(0x953)]=Game_Event[_0x288220(0x93f)][_0x288220(0x740)],Game_Event[_0x288220(0x93f)][_0x288220(0x740)]=function(){const _0x43feac=_0x288220;VisuMZ['CoreEngine'][_0x43feac(0x953)][_0x43feac(0x6c3)](this),$event=this;},VisuMZ['CoreEngine'][_0x288220(0x983)]=Scene_Map[_0x288220(0x93f)][_0x288220(0x508)],Scene_Map[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x410357=_0x288220;VisuMZ['CoreEngine'][_0x410357(0x983)]['call'](this),$gameMap[_0x410357(0x687)]();},Game_Map[_0x288220(0x93f)][_0x288220(0x687)]=function(){const _0x3587bf=_0x288220;!this[_0x3587bf(0x2a0)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x8b707c){const _0x185ddc=_0x288220;if($gameTemp)$gameTemp[_0x185ddc(0x6d1)](_0x8b707c);});;$onceParallel=function(_0x2ecb8e,_0x5a6ae6){const _0x56731c=_0x288220;if(SceneManager[_0x56731c(0x875)]())SceneManager['_scene']['playOnceParallelInterpreter'](_0x2ecb8e,_0x5a6ae6);else{if(SceneManager[_0x56731c(0x52a)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager['_scene'][_0x56731c(0x886)](_0x2ecb8e);else $gameTemp&&$gameTemp['isPlaytest']()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x56731c(0x813)]()&&alert(_0x56731c(0x747));}},StorageManager['jsonToZip']=function(_0x2e25c5){return new Promise((_0x50e04a,_0x17aa76)=>{const _0x563193=_0x3bc1;try{const _0x14cc22=pako[_0x563193(0x5b2)](_0x2e25c5,{'to':_0x563193(0x8cc),'level':0x1});if(_0x14cc22['length']>=0xc350){}_0x50e04a(_0x14cc22);}catch(_0xec53b7){_0x17aa76(_0xec53b7);}});},TextManager[_0x288220(0x775)]=['','','','CANCEL','','',_0x288220(0x756),'','BACKSPACE',_0x288220(0x622),'','','CLEAR','ENTER',_0x288220(0x815),'',_0x288220(0x5c2),_0x288220(0x52c),_0x288220(0x97a),_0x288220(0x572),_0x288220(0x6f7),_0x288220(0x989),_0x288220(0x559),_0x288220(0x885),_0x288220(0x50b),_0x288220(0x2f2),'',_0x288220(0x51f),_0x288220(0x97d),_0x288220(0x23a),_0x288220(0x96a),_0x288220(0x996),_0x288220(0x3a8),'PGUP',_0x288220(0x920),_0x288220(0x5bf),_0x288220(0x788),_0x288220(0x708),'UP','RIGHT','DOWN',_0x288220(0x514),_0x288220(0x31c),'EXECUTE','PRINTSCREEN','INSERT','DELETE','','0','1','2','3','4','5','6','7','8','9',_0x288220(0x84b),_0x288220(0x5b7),_0x288220(0x971),'EQUALS',_0x288220(0x717),_0x288220(0x72e),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x288220(0x218),'','CONTEXT_MENU','','SLEEP',_0x288220(0x7c6),_0x288220(0x23c),_0x288220(0x325),_0x288220(0x56a),_0x288220(0x4ba),_0x288220(0x7d8),_0x288220(0x937),_0x288220(0x28d),_0x288220(0x575),_0x288220(0x7a5),_0x288220(0x51a),_0x288220(0x86c),_0x288220(0x7a2),'SUBTRACT',_0x288220(0x361),_0x288220(0x48a),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0x288220(0x960),_0x288220(0x539),_0x288220(0x43d),_0x288220(0x7a4),'F16',_0x288220(0x1ce),_0x288220(0x3a1),'F19',_0x288220(0x41f),_0x288220(0x5eb),'F22',_0x288220(0x52f),'F24','','','','','','','','',_0x288220(0x2b8),'SCROLL_LOCK',_0x288220(0x3bf),_0x288220(0x2da),_0x288220(0x83f),_0x288220(0x1ef),_0x288220(0x640),'','','','','','','','','',_0x288220(0x237),_0x288220(0x2b3),_0x288220(0x5bb),'HASH',_0x288220(0x395),'PERCENT',_0x288220(0x381),_0x288220(0x59c),_0x288220(0x267),_0x288220(0x7c3),_0x288220(0x1de),'PLUS','PIPE',_0x288220(0x4af),_0x288220(0x962),_0x288220(0x2ef),_0x288220(0x259),'','','','',_0x288220(0x24b),_0x288220(0x89a),_0x288220(0x6fd),'','',_0x288220(0x5b7),'EQUALS',_0x288220(0x6ec),_0x288220(0x467),_0x288220(0x39e),_0x288220(0x82e),_0x288220(0x78f),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x288220(0x41d),_0x288220(0x2ae),_0x288220(0x703),'QUOTE','','META',_0x288220(0x64c),'',_0x288220(0x803),_0x288220(0x3f0),'',_0x288220(0x62b),'','',_0x288220(0x918),_0x288220(0x608),_0x288220(0x366),_0x288220(0x85f),_0x288220(0x362),_0x288220(0x25f),'WIN_OEM_CUSEL',_0x288220(0x6bb),_0x288220(0x4a7),_0x288220(0x1cf),_0x288220(0x616),'WIN_OEM_ENLW',_0x288220(0x1f6),_0x288220(0x802),_0x288220(0x866),_0x288220(0x841),_0x288220(0x378),_0x288220(0x646),_0x288220(0x89c),'','PA1',_0x288220(0x22e),''],TextManager['buttonAssistOk']=VisuMZ['CoreEngine']['Settings'][_0x288220(0x5ad)][_0x288220(0x745)],TextManager[_0x288220(0x53d)]=VisuMZ[_0x288220(0x665)]['Settings'][_0x288220(0x5ad)][_0x288220(0x596)],TextManager['buttonAssistSwitch']=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x5ad)][_0x288220(0x3e0)],VisuMZ['CoreEngine'][_0x288220(0x94f)]=TextManager[_0x288220(0x367)],TextManager[_0x288220(0x367)]=function(_0x32ebb4){const _0x34baf6=_0x288220;return typeof _0x32ebb4===_0x34baf6(0x6be)?VisuMZ['CoreEngine'][_0x34baf6(0x94f)][_0x34baf6(0x6c3)](this,_0x32ebb4):this[_0x34baf6(0x23f)](_0x32ebb4);},TextManager[_0x288220(0x23f)]=function(_0x58765b){const _0x4539bf=_0x288220;_0x58765b=String(_0x58765b||'')[_0x4539bf(0x489)]();const _0x35d330=VisuMZ[_0x4539bf(0x665)][_0x4539bf(0x30a)][_0x4539bf(0x6dd)];if(_0x58765b===_0x4539bf(0x887))return $dataSystem['terms'][_0x4539bf(0x7be)][0x0];if(_0x58765b===_0x4539bf(0x283))return $dataSystem[_0x4539bf(0x4e0)][_0x4539bf(0x7be)][0x1];if(_0x58765b===_0x4539bf(0x46c))return $dataSystem[_0x4539bf(0x4e0)][_0x4539bf(0x7be)][0x2];if(_0x58765b==='DEF')return $dataSystem[_0x4539bf(0x4e0)][_0x4539bf(0x7be)][0x3];if(_0x58765b===_0x4539bf(0x445))return $dataSystem[_0x4539bf(0x4e0)]['params'][0x4];if(_0x58765b===_0x4539bf(0x65a))return $dataSystem[_0x4539bf(0x4e0)][_0x4539bf(0x7be)][0x5];if(_0x58765b===_0x4539bf(0x908))return $dataSystem[_0x4539bf(0x4e0)][_0x4539bf(0x7be)][0x6];if(_0x58765b===_0x4539bf(0x293))return $dataSystem[_0x4539bf(0x4e0)]['params'][0x7];if(_0x58765b===_0x4539bf(0x452))return _0x35d330[_0x4539bf(0x3e2)];if(_0x58765b==='EVA')return _0x35d330['XParamVocab1'];if(_0x58765b==='CRI')return _0x35d330[_0x4539bf(0x213)];if(_0x58765b===_0x4539bf(0x7ef))return _0x35d330['XParamVocab3'];if(_0x58765b===_0x4539bf(0x671))return _0x35d330[_0x4539bf(0x6af)];if(_0x58765b===_0x4539bf(0x5e9))return _0x35d330[_0x4539bf(0x515)];if(_0x58765b===_0x4539bf(0x3f4))return _0x35d330['XParamVocab6'];if(_0x58765b==='HRG')return _0x35d330[_0x4539bf(0x35d)];if(_0x58765b===_0x4539bf(0x58b))return _0x35d330[_0x4539bf(0x471)];if(_0x58765b===_0x4539bf(0x5ef))return _0x35d330[_0x4539bf(0x967)];if(_0x58765b===_0x4539bf(0x87f))return _0x35d330[_0x4539bf(0x526)];if(_0x58765b===_0x4539bf(0x820))return _0x35d330['SParamVocab1'];if(_0x58765b===_0x4539bf(0x7e1))return _0x35d330[_0x4539bf(0x1dd)];if(_0x58765b===_0x4539bf(0x3cd))return _0x35d330[_0x4539bf(0x54f)];if(_0x58765b===_0x4539bf(0x925))return _0x35d330[_0x4539bf(0x8d5)];if(_0x58765b===_0x4539bf(0x6bd))return _0x35d330[_0x4539bf(0x241)];if(_0x58765b===_0x4539bf(0x463))return _0x35d330[_0x4539bf(0x3b3)];if(_0x58765b===_0x4539bf(0x496))return _0x35d330['SParamVocab7'];if(_0x58765b==='FDR')return _0x35d330['SParamVocab8'];if(_0x58765b===_0x4539bf(0x2d5))return _0x35d330['SParamVocab9'];if(VisuMZ[_0x4539bf(0x665)][_0x4539bf(0x68e)][_0x58765b])return VisuMZ['CoreEngine'][_0x4539bf(0x68e)][_0x58765b];return'';},TextManager[_0x288220(0x81b)]=function(_0x469a59){const _0x365ef6=_0x288220,_0x52b937=Input[_0x365ef6(0x98a)]();return _0x52b937===_0x365ef6(0x8aa)?this[_0x365ef6(0x2e2)](_0x469a59):this[_0x365ef6(0x6a0)](_0x52b937,_0x469a59);},TextManager[_0x288220(0x2e2)]=function(_0x1aa395){const _0x446cb7=_0x288220;let _0x27ff86=VisuMZ[_0x446cb7(0x665)]['Settings'][_0x446cb7(0x5ad)][_0x446cb7(0x41e)];if(!_0x27ff86){if(_0x1aa395===_0x446cb7(0x4df))_0x1aa395=_0x446cb7(0x5d2);if(_0x1aa395==='menu')_0x1aa395=_0x446cb7(0x5d2);}let _0x34b7c9=[];for(let _0x3e8ed8 in Input[_0x446cb7(0x75b)]){_0x3e8ed8=Number(_0x3e8ed8);if(_0x3e8ed8>=0x60&&_0x3e8ed8<=0x69)continue;if([0x12,0x20]['includes'](_0x3e8ed8))continue;_0x1aa395===Input['keyMapper'][_0x3e8ed8]&&_0x34b7c9[_0x446cb7(0x597)](_0x3e8ed8);}for(let _0x3594fe=0x0;_0x3594fe<_0x34b7c9[_0x446cb7(0x2cd)];_0x3594fe++){_0x34b7c9[_0x3594fe]=TextManager[_0x446cb7(0x775)][_0x34b7c9[_0x3594fe]];}return this[_0x446cb7(0x93b)](_0x34b7c9);},TextManager['makeInputButtonString']=function(_0x557c73){const _0x18cde3=_0x288220,_0x3f3fdc=VisuMZ[_0x18cde3(0x665)][_0x18cde3(0x30a)][_0x18cde3(0x5ad)],_0x3890eb=_0x3f3fdc[_0x18cde3(0x811)];let _0x1f2ae3='';if(_0x557c73[_0x18cde3(0x479)]('UP'))_0x1f2ae3='UP';else{if(_0x557c73[_0x18cde3(0x479)](_0x18cde3(0x4ea)))_0x1f2ae3=_0x18cde3(0x4ea);else{if(_0x557c73['includes'](_0x18cde3(0x708)))_0x1f2ae3=_0x18cde3(0x708);else _0x557c73['includes'](_0x18cde3(0x8ff))?_0x1f2ae3=_0x18cde3(0x8ff):_0x1f2ae3=_0x557c73[_0x18cde3(0x1d3)]();}}const _0x1e2ae6=_0x18cde3(0x897)['format'](_0x1f2ae3);return _0x3f3fdc[_0x1e2ae6]?_0x3f3fdc[_0x1e2ae6]:_0x3890eb[_0x18cde3(0x857)](_0x1f2ae3);},TextManager[_0x288220(0x230)]=function(_0xf0d609,_0x32650a){const _0xa8870b=_0x288220,_0x128862=VisuMZ[_0xa8870b(0x665)][_0xa8870b(0x30a)][_0xa8870b(0x5ad)],_0x55b2e2=_0x128862[_0xa8870b(0x5a7)],_0x24daba=this[_0xa8870b(0x81b)](_0xf0d609),_0x58f55d=this[_0xa8870b(0x81b)](_0x32650a);return _0x55b2e2[_0xa8870b(0x857)](_0x24daba,_0x58f55d);},TextManager['getControllerInputButtonString']=function(_0x3b34ba,_0x562e26){const _0x465ad8=_0x288220,_0x362d3e=_0x3b34ba[_0x465ad8(0x357)]()[_0x465ad8(0x91c)](),_0x4b65e4=VisuMZ[_0x465ad8(0x665)][_0x465ad8(0x8de)][_0x362d3e];if(!_0x4b65e4)return this[_0x465ad8(0x519)](_0x3b34ba,_0x562e26);return _0x4b65e4[_0x562e26]||this[_0x465ad8(0x2e2)](_0x3b34ba,_0x562e26);},TextManager[_0x288220(0x519)]=function(_0x3b38f8,_0x262eba){const _0x1d23c4=_0x288220,_0x4ad122=_0x3b38f8['toLowerCase']()[_0x1d23c4(0x91c)]();for(const _0x3d65f1 in VisuMZ['CoreEngine'][_0x1d23c4(0x7fd)]){if(_0x4ad122['includes'](_0x3d65f1)){const _0x3466a3=VisuMZ[_0x1d23c4(0x665)][_0x1d23c4(0x7fd)][_0x3d65f1],_0x33817a=VisuMZ[_0x1d23c4(0x665)][_0x1d23c4(0x8de)][_0x3466a3];return _0x33817a[_0x262eba]||this[_0x1d23c4(0x2e2)](_0x262eba);}}return this[_0x1d23c4(0x2e2)](_0x262eba);},VisuMZ['CoreEngine'][_0x288220(0x565)]=ColorManager[_0x288220(0x360)],ColorManager[_0x288220(0x360)]=function(){const _0x5a4fa4=_0x288220;VisuMZ['CoreEngine'][_0x5a4fa4(0x565)][_0x5a4fa4(0x6c3)](this),this[_0x5a4fa4(0x436)]=this['_colorCache']||{};},ColorManager[_0x288220(0x941)]=function(_0x22d388,_0x2d18bc){const _0x64056=_0x288220;return _0x2d18bc=String(_0x2d18bc),this['_colorCache']=this[_0x64056(0x436)]||{},_0x2d18bc[_0x64056(0x54b)](/#(.*)/i)?this[_0x64056(0x436)][_0x22d388]=_0x64056(0x79f)[_0x64056(0x857)](String(RegExp['$1'])):this[_0x64056(0x436)][_0x22d388]=this['textColor'](Number(_0x2d18bc)),this['_colorCache'][_0x22d388];},ColorManager['getColor']=function(_0x5e8c45){const _0x3291cb=_0x288220;return _0x5e8c45=String(_0x5e8c45),_0x5e8c45[_0x3291cb(0x54b)](/#(.*)/i)?'#%1'[_0x3291cb(0x857)](String(RegExp['$1'])):this[_0x3291cb(0x626)](Number(_0x5e8c45));},ColorManager[_0x288220(0x688)]=function(){const _0x3229ee=_0x288220;this[_0x3229ee(0x436)]={};},ColorManager[_0x288220(0x7aa)]=function(){const _0x11b754=_0x288220,_0x1b5696=_0x11b754(0x229);this['_colorCache']=this[_0x11b754(0x436)]||{};if(this[_0x11b754(0x436)][_0x1b5696])return this[_0x11b754(0x436)][_0x1b5696];const _0x564ec2=VisuMZ['CoreEngine'][_0x11b754(0x30a)][_0x11b754(0x24e)][_0x11b754(0x7dd)];return this['getColorDataFromPluginParameters'](_0x1b5696,_0x564ec2);},ColorManager[_0x288220(0x319)]=function(){const _0x2cf5a1=_0x288220,_0x5be53f=_0x2cf5a1(0x606);this[_0x2cf5a1(0x436)]=this[_0x2cf5a1(0x436)]||{};if(this['_colorCache'][_0x5be53f])return this[_0x2cf5a1(0x436)][_0x5be53f];const _0x396b9e=VisuMZ['CoreEngine'][_0x2cf5a1(0x30a)][_0x2cf5a1(0x24e)][_0x2cf5a1(0x6c2)];return this[_0x2cf5a1(0x941)](_0x5be53f,_0x396b9e);},ColorManager['crisisColor']=function(){const _0x332d93=_0x288220,_0x599aa3='_stored_crisisColor';this['_colorCache']=this[_0x332d93(0x436)]||{};if(this['_colorCache'][_0x599aa3])return this[_0x332d93(0x436)][_0x599aa3];const _0x13df93=VisuMZ[_0x332d93(0x665)][_0x332d93(0x30a)][_0x332d93(0x24e)]['ColorCrisis'];return this[_0x332d93(0x941)](_0x599aa3,_0x13df93);},ColorManager[_0x288220(0x744)]=function(){const _0x1536be=_0x288220,_0x5b3231=_0x1536be(0x235);this[_0x1536be(0x436)]=this[_0x1536be(0x436)]||{};if(this[_0x1536be(0x436)][_0x5b3231])return this[_0x1536be(0x436)][_0x5b3231];const _0x1de7d0=VisuMZ[_0x1536be(0x665)][_0x1536be(0x30a)][_0x1536be(0x24e)][_0x1536be(0x3d4)];return this[_0x1536be(0x941)](_0x5b3231,_0x1de7d0);},ColorManager[_0x288220(0x7de)]=function(){const _0x2be7c4=_0x288220,_0x2af5df=_0x2be7c4(0x850);this[_0x2be7c4(0x436)]=this[_0x2be7c4(0x436)]||{};if(this[_0x2be7c4(0x436)][_0x2af5df])return this['_colorCache'][_0x2af5df];const _0x399368=VisuMZ[_0x2be7c4(0x665)]['Settings'][_0x2be7c4(0x24e)]['ColorGaugeBack'];return this[_0x2be7c4(0x941)](_0x2af5df,_0x399368);},ColorManager[_0x288220(0x1d7)]=function(){const _0x120113=_0x288220,_0x1bc009=_0x120113(0x7c8);this[_0x120113(0x436)]=this[_0x120113(0x436)]||{};if(this[_0x120113(0x436)][_0x1bc009])return this[_0x120113(0x436)][_0x1bc009];const _0x529a33=VisuMZ[_0x120113(0x665)][_0x120113(0x30a)][_0x120113(0x24e)]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x1bc009,_0x529a33);},ColorManager[_0x288220(0x981)]=function(){const _0x1fa7eb=_0x288220,_0x2f4143=_0x1fa7eb(0x6f1);this[_0x1fa7eb(0x436)]=this[_0x1fa7eb(0x436)]||{};if(this[_0x1fa7eb(0x436)][_0x2f4143])return this[_0x1fa7eb(0x436)][_0x2f4143];const _0x85b4d6=VisuMZ[_0x1fa7eb(0x665)][_0x1fa7eb(0x30a)][_0x1fa7eb(0x24e)][_0x1fa7eb(0x6b2)];return this['getColorDataFromPluginParameters'](_0x2f4143,_0x85b4d6);},ColorManager[_0x288220(0x225)]=function(){const _0x4bb0fc=_0x288220,_0x1fd806=_0x4bb0fc(0x629);this['_colorCache']=this[_0x4bb0fc(0x436)]||{};if(this[_0x4bb0fc(0x436)][_0x1fd806])return this['_colorCache'][_0x1fd806];const _0x486d9f=VisuMZ[_0x4bb0fc(0x665)]['Settings']['Color'][_0x4bb0fc(0x589)];return this[_0x4bb0fc(0x941)](_0x1fd806,_0x486d9f);},ColorManager[_0x288220(0x1e8)]=function(){const _0x1d1927=_0x288220,_0x36bd60=_0x1d1927(0x991);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x36bd60])return this[_0x1d1927(0x436)][_0x36bd60];const _0x7bde25=VisuMZ['CoreEngine'][_0x1d1927(0x30a)][_0x1d1927(0x24e)]['ColorMPGauge2'];return this[_0x1d1927(0x941)](_0x36bd60,_0x7bde25);},ColorManager[_0x288220(0x736)]=function(){const _0x224c94=_0x288220,_0x386232='_stored_mpCostColor';this[_0x224c94(0x436)]=this[_0x224c94(0x436)]||{};if(this[_0x224c94(0x436)][_0x386232])return this['_colorCache'][_0x386232];const _0x1413dc=VisuMZ[_0x224c94(0x665)][_0x224c94(0x30a)][_0x224c94(0x24e)][_0x224c94(0x5e6)];return this[_0x224c94(0x941)](_0x386232,_0x1413dc);},ColorManager[_0x288220(0x355)]=function(){const _0xd16478=_0x288220,_0x3be57c=_0xd16478(0x6ac);this['_colorCache']=this[_0xd16478(0x436)]||{};if(this['_colorCache'][_0x3be57c])return this['_colorCache'][_0x3be57c];const _0x3dcf22=VisuMZ[_0xd16478(0x665)][_0xd16478(0x30a)][_0xd16478(0x24e)][_0xd16478(0x6ff)];return this['getColorDataFromPluginParameters'](_0x3be57c,_0x3dcf22);},ColorManager[_0x288220(0x97c)]=function(){const _0x395503=_0x288220,_0x293cd1=_0x395503(0x302);this[_0x395503(0x436)]=this['_colorCache']||{};if(this[_0x395503(0x436)][_0x293cd1])return this['_colorCache'][_0x293cd1];const _0xcca25=VisuMZ[_0x395503(0x665)][_0x395503(0x30a)]['Color']['ColorPowerDown'];return this['getColorDataFromPluginParameters'](_0x293cd1,_0xcca25);},ColorManager[_0x288220(0x3fb)]=function(){const _0x135cdf=_0x288220,_0x1bcaaf=_0x135cdf(0x4cf);this[_0x135cdf(0x436)]=this[_0x135cdf(0x436)]||{};if(this['_colorCache'][_0x1bcaaf])return this[_0x135cdf(0x436)][_0x1bcaaf];const _0x49d9aa=VisuMZ[_0x135cdf(0x665)][_0x135cdf(0x30a)][_0x135cdf(0x24e)][_0x135cdf(0x1cd)];return this[_0x135cdf(0x941)](_0x1bcaaf,_0x49d9aa);},ColorManager[_0x288220(0x973)]=function(){const _0x4af073=_0x288220,_0x28f430=_0x4af073(0x57f);this[_0x4af073(0x436)]=this['_colorCache']||{};if(this[_0x4af073(0x436)][_0x28f430])return this[_0x4af073(0x436)][_0x28f430];const _0x264c6c=VisuMZ[_0x4af073(0x665)][_0x4af073(0x30a)]['Color'][_0x4af073(0x21a)];return this[_0x4af073(0x941)](_0x28f430,_0x264c6c);},ColorManager[_0x288220(0x3b8)]=function(){const _0x7c5f41=_0x288220,_0x298a81=_0x7c5f41(0x7f4);this[_0x7c5f41(0x436)]=this['_colorCache']||{};if(this[_0x7c5f41(0x436)][_0x298a81])return this['_colorCache'][_0x298a81];const _0x1ea640=VisuMZ[_0x7c5f41(0x665)][_0x7c5f41(0x30a)][_0x7c5f41(0x24e)]['ColorTPGauge1'];return this[_0x7c5f41(0x941)](_0x298a81,_0x1ea640);},ColorManager['tpGaugeColor2']=function(){const _0x59d046=_0x288220,_0x3e6722=_0x59d046(0x52d);this['_colorCache']=this[_0x59d046(0x436)]||{};if(this[_0x59d046(0x436)][_0x3e6722])return this[_0x59d046(0x436)][_0x3e6722];const _0x1e278f=VisuMZ[_0x59d046(0x665)]['Settings']['Color']['ColorTPGauge2'];return this[_0x59d046(0x941)](_0x3e6722,_0x1e278f);},ColorManager[_0x288220(0x4c9)]=function(){const _0x5b8614=_0x288220,_0xedd742='_stored_tpCostColor';this[_0x5b8614(0x436)]=this['_colorCache']||{};if(this[_0x5b8614(0x436)][_0xedd742])return this['_colorCache'][_0xedd742];const _0x309c81=VisuMZ['CoreEngine'][_0x5b8614(0x30a)][_0x5b8614(0x24e)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0xedd742,_0x309c81);},ColorManager[_0x288220(0x375)]=function(){const _0x5d8aa7=_0x288220,_0x1f8900=_0x5d8aa7(0x8ed);this[_0x5d8aa7(0x436)]=this[_0x5d8aa7(0x436)]||{};if(this[_0x5d8aa7(0x436)][_0x1f8900])return this[_0x5d8aa7(0x436)][_0x1f8900];const _0x206fb6=VisuMZ[_0x5d8aa7(0x665)][_0x5d8aa7(0x30a)]['Color'][_0x5d8aa7(0x5d7)];return this['getColorDataFromPluginParameters'](_0x1f8900,_0x206fb6);},ColorManager['expGaugeColor1']=function(){const _0x798df6=_0x288220,_0x5c9411='_stored_expGaugeColor1';this[_0x798df6(0x436)]=this[_0x798df6(0x436)]||{};if(this[_0x798df6(0x436)][_0x5c9411])return this[_0x798df6(0x436)][_0x5c9411];const _0x1cd82b=VisuMZ[_0x798df6(0x665)][_0x798df6(0x30a)]['Color']['ColorExpGauge1'];return this[_0x798df6(0x941)](_0x5c9411,_0x1cd82b);},ColorManager[_0x288220(0x2c4)]=function(){const _0x51e0e7=_0x288220,_0x473020=_0x51e0e7(0x22f);this[_0x51e0e7(0x436)]=this[_0x51e0e7(0x436)]||{};if(this[_0x51e0e7(0x436)][_0x473020])return this[_0x51e0e7(0x436)][_0x473020];const _0x5ccf62=VisuMZ['CoreEngine'][_0x51e0e7(0x30a)]['Color']['ColorExpGauge2'];return this[_0x51e0e7(0x941)](_0x473020,_0x5ccf62);},ColorManager['maxLvGaugeColor1']=function(){const _0x4db386=_0x288220,_0x481cc7=_0x4db386(0x88e);this[_0x4db386(0x436)]=this[_0x4db386(0x436)]||{};if(this[_0x4db386(0x436)][_0x481cc7])return this['_colorCache'][_0x481cc7];const _0x241e05=VisuMZ['CoreEngine'][_0x4db386(0x30a)][_0x4db386(0x24e)][_0x4db386(0x8ec)];return this['getColorDataFromPluginParameters'](_0x481cc7,_0x241e05);},ColorManager[_0x288220(0x8ba)]=function(){const _0x3c3e08=_0x288220,_0x3580f6=_0x3c3e08(0x394);this[_0x3c3e08(0x436)]=this['_colorCache']||{};if(this['_colorCache'][_0x3580f6])return this[_0x3c3e08(0x436)][_0x3580f6];const _0x433e54=VisuMZ['CoreEngine']['Settings'][_0x3c3e08(0x24e)][_0x3c3e08(0x95b)];return this[_0x3c3e08(0x941)](_0x3580f6,_0x433e54);},ColorManager[_0x288220(0x43f)]=function(_0x494b0a){const _0x1f5da3=_0x288220;return VisuMZ[_0x1f5da3(0x665)][_0x1f5da3(0x30a)][_0x1f5da3(0x24e)][_0x1f5da3(0x48c)][_0x1f5da3(0x6c3)](this,_0x494b0a);},ColorManager[_0x288220(0x2a4)]=function(_0x2e2731){const _0x561064=_0x288220;return VisuMZ[_0x561064(0x665)][_0x561064(0x30a)]['Color'][_0x561064(0x4bb)][_0x561064(0x6c3)](this,_0x2e2731);},ColorManager['tpColor']=function(_0x359d6c){const _0x1abdb9=_0x288220;return VisuMZ[_0x1abdb9(0x665)][_0x1abdb9(0x30a)][_0x1abdb9(0x24e)][_0x1abdb9(0x695)][_0x1abdb9(0x6c3)](this,_0x359d6c);},ColorManager[_0x288220(0x2c3)]=function(_0x1eb2ab){const _0x48616c=_0x288220;return VisuMZ['CoreEngine']['Settings']['Color'][_0x48616c(0x488)]['call'](this,_0x1eb2ab);},ColorManager['damageColor']=function(_0x45265a){const _0x9c8d1c=_0x288220;return VisuMZ[_0x9c8d1c(0x665)][_0x9c8d1c(0x30a)][_0x9c8d1c(0x24e)]['DamageColor'][_0x9c8d1c(0x6c3)](this,_0x45265a);},ColorManager[_0x288220(0x500)]=function(){const _0x52a66b=_0x288220;return VisuMZ['CoreEngine']['Settings'][_0x52a66b(0x24e)][_0x52a66b(0x995)];},ColorManager['outlineColorDmg']=function(){const _0xc18c=_0x288220;return VisuMZ[_0xc18c(0x665)][_0xc18c(0x30a)][_0xc18c(0x24e)]['OutlineColorDmg']||_0xc18c(0x507);},ColorManager[_0x288220(0x62f)]=function(){const _0x20caa0=_0x288220;return VisuMZ['CoreEngine'][_0x20caa0(0x30a)][_0x20caa0(0x24e)][_0x20caa0(0x98f)]||_0x20caa0(0x7f1);},ColorManager[_0x288220(0x1ca)]=function(){const _0x20eba4=_0x288220;return VisuMZ[_0x20eba4(0x665)]['Settings'][_0x20eba4(0x24e)][_0x20eba4(0x248)];},ColorManager['dimColor2']=function(){const _0x397445=_0x288220;return VisuMZ[_0x397445(0x665)][_0x397445(0x30a)]['Color'][_0x397445(0x884)];},ColorManager[_0x288220(0x8d1)]=function(){const _0x208d05=_0x288220;return VisuMZ['CoreEngine'][_0x208d05(0x30a)][_0x208d05(0x24e)][_0x208d05(0x370)];},ColorManager[_0x288220(0x76b)]=function(){const _0xd9964c=_0x288220;return VisuMZ['CoreEngine'][_0xd9964c(0x30a)][_0xd9964c(0x24e)][_0xd9964c(0x82a)];},SceneManager[_0x288220(0x840)]=[],SceneManager['isSceneBattle']=function(){const _0x6f5d5=_0x288220;return this[_0x6f5d5(0x482)]&&this[_0x6f5d5(0x482)][_0x6f5d5(0x5e4)]===Scene_Battle;},SceneManager[_0x288220(0x875)]=function(){const _0x27fef0=_0x288220;return this['_scene']&&this[_0x27fef0(0x482)]['constructor']===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x28870d=_0x288220;return this[_0x28870d(0x482)]&&this[_0x28870d(0x482)]instanceof Scene_Map;},VisuMZ[_0x288220(0x665)][_0x288220(0x39c)]=SceneManager[_0x288220(0x501)],SceneManager['initialize']=function(){const _0x563572=_0x288220;VisuMZ[_0x563572(0x665)][_0x563572(0x39c)][_0x563572(0x6c3)](this),this[_0x563572(0x432)]();},VisuMZ['CoreEngine'][_0x288220(0x5e3)]=SceneManager[_0x288220(0x574)],SceneManager[_0x288220(0x574)]=function(_0x4e5b64){const _0x4fbe36=_0x288220;if($gameTemp)this[_0x4fbe36(0x6f9)](_0x4e5b64);VisuMZ[_0x4fbe36(0x665)][_0x4fbe36(0x5e3)][_0x4fbe36(0x6c3)](this,_0x4e5b64);},SceneManager['onKeyDownKeysF6F7']=function(_0x4efd80){const _0x3ba323=_0x288220;if(!_0x4efd80[_0x3ba323(0x6d4)]&&!_0x4efd80['altKey'])switch(_0x4efd80[_0x3ba323(0x7f3)]){case 0x52:this[_0x3ba323(0x40f)]();break;case 0x54:this[_0x3ba323(0x988)]();break;case 0x75:this[_0x3ba323(0x206)]();break;case 0x76:if(Input[_0x3ba323(0x933)](_0x3ba323(0x907))||Input[_0x3ba323(0x933)]('ctrl'))return;this[_0x3ba323(0x961)]();break;}else{if(_0x4efd80[_0x3ba323(0x6d4)]){let _0x164f94=_0x4efd80[_0x3ba323(0x7f3)];if(_0x164f94>=0x31&&_0x164f94<=0x39){const _0x3e00ef=_0x164f94-0x30;return SceneManager[_0x3ba323(0x956)](_0x3e00ef);}else{if(_0x164f94>=0x61&&_0x164f94<=0x69){const _0x4e5403=_0x164f94-0x60;return SceneManager[_0x3ba323(0x956)](_0x4e5403);}}}}},SceneManager[_0x288220(0x206)]=function(){const _0x59b5fe=_0x288220;if($gameTemp[_0x59b5fe(0x813)]()&&VisuMZ[_0x59b5fe(0x665)][_0x59b5fe(0x30a)][_0x59b5fe(0x23d)][_0x59b5fe(0x583)]){ConfigManager[_0x59b5fe(0x935)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x59b5fe(0x47e)]=0x0,ConfigManager[_0x59b5fe(0x3d6)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0x59b5fe(0x227)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x59b5fe(0x3d6)]=0x64,ConfigManager[_0x59b5fe(0x935)]=0x64);ConfigManager[_0x59b5fe(0x7f0)]();if(this['_scene'][_0x59b5fe(0x5e4)]===Scene_Options){if(this['_scene']['_optionsWindow'])this[_0x59b5fe(0x482)][_0x59b5fe(0x76f)][_0x59b5fe(0x80c)]();if(this[_0x59b5fe(0x482)][_0x59b5fe(0x7a8)])this[_0x59b5fe(0x482)][_0x59b5fe(0x7a8)][_0x59b5fe(0x80c)]();}}},SceneManager[_0x288220(0x961)]=function(){const _0x2d9e46=_0x288220;$gameTemp[_0x2d9e46(0x813)]()&&VisuMZ['CoreEngine']['Settings']['QoL']['F7key']&&($gameTemp[_0x2d9e46(0x4bc)]=!$gameTemp[_0x2d9e46(0x4bc)]);},SceneManager['playTestShiftR']=function(){const _0x1c5b64=_0x288220;if(!VisuMZ[_0x1c5b64(0x665)][_0x1c5b64(0x30a)][_0x1c5b64(0x23d)][_0x1c5b64(0x944)])return;if(!$gameTemp[_0x1c5b64(0x813)]())return;if(!SceneManager[_0x1c5b64(0x52a)]())return;if(!Input[_0x1c5b64(0x933)](_0x1c5b64(0x907)))return;for(const _0x32101d of $gameParty[_0x1c5b64(0x8e8)]()){if(!_0x32101d)continue;_0x32101d[_0x1c5b64(0x561)]();}},SceneManager['playTestShiftT']=function(){const _0x5c68bf=_0x288220;if(!VisuMZ[_0x5c68bf(0x665)][_0x5c68bf(0x30a)][_0x5c68bf(0x23d)][_0x5c68bf(0x4a6)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x5c68bf(0x933)]('shift'))return;for(const _0x7ecb94 of $gameParty['members']()){if(!_0x7ecb94)continue;_0x7ecb94[_0x5c68bf(0x274)](_0x7ecb94[_0x5c68bf(0x62a)]());}},SceneManager[_0x288220(0x956)]=function(_0xb3cd1b){const _0x20d220=_0x288220;if(!$gameTemp[_0x20d220(0x813)]())return;if(!DataManager[_0x20d220(0x20f)](_0xb3cd1b))return;if(!(VisuMZ[_0x20d220(0x665)][_0x20d220(0x30a)][_0x20d220(0x23d)]['CtrlQuickLoad']??!![]))return;this[_0x20d220(0x597)](Scene_QuickLoad),this[_0x20d220(0x7eb)](_0xb3cd1b);},SceneManager[_0x288220(0x432)]=function(){const _0x43ee20=_0x288220;this[_0x43ee20(0x3b0)]=![],this[_0x43ee20(0x2b0)]=!VisuMZ[_0x43ee20(0x665)][_0x43ee20(0x30a)]['UI']['ShowButtons'];},SceneManager[_0x288220(0x7c7)]=function(_0x505b99){const _0x498ea0=_0x288220;VisuMZ[_0x498ea0(0x665)][_0x498ea0(0x30a)]['UI']['SideButtons']&&(this[_0x498ea0(0x3b0)]=_0x505b99);},SceneManager[_0x288220(0x251)]=function(){const _0x188a63=_0x288220;return this[_0x188a63(0x3b0)];},SceneManager[_0x288220(0x6b1)]=function(){return this['_hideButtons'];},SceneManager[_0x288220(0x43a)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ[_0x288220(0x665)]['SceneManager_isGameActive']=SceneManager[_0x288220(0x96d)],SceneManager[_0x288220(0x96d)]=function(){const _0x4c532d=_0x288220;return VisuMZ[_0x4c532d(0x665)]['Settings'][_0x4c532d(0x23d)]['RequireFocus']?VisuMZ[_0x4c532d(0x665)]['SceneManager_isGameActive']['call'](this):!![];},SceneManager[_0x288220(0x51d)]=function(_0x17a940){const _0x3a9e32=_0x288220;if(_0x17a940 instanceof Error)this[_0x3a9e32(0x99e)](_0x17a940);else _0x17a940 instanceof Array&&_0x17a940[0x0]===_0x3a9e32(0x835)?this[_0x3a9e32(0x591)](_0x17a940):this[_0x3a9e32(0x224)](_0x17a940);this[_0x3a9e32(0x713)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x2c8)]=BattleManager[_0x288220(0x524)],BattleManager[_0x288220(0x524)]=function(){const _0x3753c2=_0x288220;return VisuMZ[_0x3753c2(0x665)]['Settings']['QoL']['EscapeAlways']?this[_0x3753c2(0x562)]():VisuMZ[_0x3753c2(0x665)]['BattleManager_processEscape']['call'](this);},BattleManager[_0x288220(0x562)]=function(){const _0xcd6177=_0x288220;return $gameParty['performEscape'](),SoundManager[_0xcd6177(0x53b)](),this[_0xcd6177(0x5af)](),!![];},BattleManager['isTpb']=function(){const _0x3416e5=_0x288220;return $gameSystem[_0x3416e5(0x3e9)]()>=0x1;},BattleManager[_0x288220(0x210)]=function(){const _0x124c91=_0x288220;return $gameSystem[_0x124c91(0x3e9)]()===0x1;},VisuMZ['CoreEngine'][_0x288220(0x792)]=Game_Temp[_0x288220(0x93f)][_0x288220(0x501)],Game_Temp[_0x288220(0x93f)][_0x288220(0x501)]=function(){const _0x57aae3=_0x288220;VisuMZ[_0x57aae3(0x665)][_0x57aae3(0x792)][_0x57aae3(0x6c3)](this),this[_0x57aae3(0x268)](),this['createFauxAnimationQueue'](),this[_0x57aae3(0x431)]();},Game_Temp[_0x288220(0x93f)][_0x288220(0x268)]=function(){const _0x2a2d55=_0x288220;VisuMZ[_0x2a2d55(0x665)][_0x2a2d55(0x30a)][_0x2a2d55(0x23d)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x288220(0x7d1)]=function(_0x18f12d){this['_lastPluginCommandInterpreter']=_0x18f12d;},Game_Temp[_0x288220(0x93f)]['getLastPluginCommandInterpreter']=function(){const _0x2de0bf=_0x288220;return this[_0x2de0bf(0x3c7)];},Game_Temp['prototype'][_0x288220(0x2e7)]=function(){const _0x2b8210=_0x288220;this[_0x2b8210(0x86f)]=undefined,this[_0x2b8210(0x7d7)]=undefined,this[_0x2b8210(0x2c0)]=undefined;},Game_Temp[_0x288220(0x93f)][_0x288220(0x800)]=function(_0x12a671){const _0x25b369=_0x288220;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x25b369(0x24f)]($dataMap['note']);const _0x349e98=$dataTroops[_0x12a671];if(_0x349e98){let _0x17dbb4=DataManager[_0x25b369(0x978)](_0x349e98['id']);this[_0x25b369(0x24f)](_0x17dbb4);}},Game_Temp[_0x288220(0x93f)][_0x288220(0x24f)]=function(_0x3251ac){const _0x2b18c9=_0x288220;if(!_0x3251ac)return;if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x2b18c9(0x86f)]='SV';else{if(_0x3251ac['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2dd8e3=String(RegExp['$1']);if(_0x2dd8e3['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x2dd8e3['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x3251ac['match'](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x2b18c9(0x7d7)]=0x1;else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x2b18c9(0x7d7)]=0x2;else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:TPB|ATB)>/i))this[_0x2b18c9(0x7d7)]=0x2;else{if(_0x3251ac['match'](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x2b18c9(0x7d7)]='CTB');else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x2b18c9(0x7d7)]='STB');else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x2ce));else{if(_0x3251ac['match'](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x4ed));else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:OTB)>/i))Imported[_0x2b18c9(0x584)]&&(this['_forcedBattleSys']='OTB');else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:ETB)>/i))Imported[_0x2b18c9(0x461)]&&(this['_forcedBattleSys']=_0x2b18c9(0x876));else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:PTB)>/i))Imported[_0x2b18c9(0x8d6)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x847));else{if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x468a21=String(RegExp['$1']);if(_0x468a21['match'](/DTB/i))this[_0x2b18c9(0x7d7)]=0x0;else{if(_0x468a21[_0x2b18c9(0x54b)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x2b18c9(0x7d7)]=0x1;else{if(_0x468a21[_0x2b18c9(0x54b)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x2b18c9(0x7d7)]=0x2;else{if(_0x468a21['match'](/CTB/i))Imported[_0x2b18c9(0x7cb)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x865));else{if(_0x468a21[_0x2b18c9(0x54b)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x1f1));else{if(_0x468a21[_0x2b18c9(0x54b)](/BTB/i))Imported[_0x2b18c9(0x56c)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x2ce));else{if(_0x468a21[_0x2b18c9(0x54b)](/FTB/i))Imported[_0x2b18c9(0x4e9)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x4ed));else{if(_0x468a21['match'](/OTB/i))Imported[_0x2b18c9(0x584)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x3c1));else{if(_0x468a21['match'](/ETB/i))Imported[_0x2b18c9(0x461)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x876));else _0x468a21[_0x2b18c9(0x54b)](/PTB/i)&&(Imported[_0x2b18c9(0x8d6)]&&(this[_0x2b18c9(0x7d7)]=_0x2b18c9(0x847)));}}}}}}}}}}}}}}}}}}}}if(_0x3251ac[_0x2b18c9(0x54b)](/<(?:|BATTLE )GRID>/i))this[_0x2b18c9(0x2c0)]=!![];else _0x3251ac[_0x2b18c9(0x54b)](/<NO (?:|BATTLE )GRID>/i)&&(this['_forcedBattleGridSystem']=![]);},Game_Temp[_0x288220(0x93f)][_0x288220(0x434)]=function(){const _0x96f1=_0x288220;this[_0x96f1(0x393)]=[];},Game_Temp[_0x288220(0x93f)]['requestFauxAnimation']=function(_0x349347,_0x446f90,_0x5b4747,_0x1bdb96){const _0x3b95ab=_0x288220;if(!this[_0x3b95ab(0x9a2)]())return;_0x5b4747=_0x5b4747||![],_0x1bdb96=_0x1bdb96||![];if($dataAnimations[_0x446f90]){const _0x3f44e9={'targets':_0x349347,'animationId':_0x446f90,'mirror':_0x5b4747,'mute':_0x1bdb96};this[_0x3b95ab(0x393)][_0x3b95ab(0x597)](_0x3f44e9);for(const _0x4c0aa8 of _0x349347){_0x4c0aa8['startAnimation']&&_0x4c0aa8['startAnimation']();}}},Game_Temp[_0x288220(0x93f)][_0x288220(0x9a2)]=function(){return!![];},Game_Temp['prototype'][_0x288220(0x8b0)]=function(){const _0x3f485b=_0x288220;return this[_0x3f485b(0x393)][_0x3f485b(0x907)]();},Game_Temp[_0x288220(0x93f)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x288220(0x93f)]['requestPointAnimation']=function(_0x97d7d8,_0x373f93,_0x313ad3,_0x1fe5cc,_0x179a80){const _0x5504dd=_0x288220;if(!this['showPointAnimations']())return;_0x1fe5cc=_0x1fe5cc||![],_0x179a80=_0x179a80||![];if($dataAnimations[_0x313ad3]){const _0x5d38e9={'x':_0x97d7d8,'y':_0x373f93,'animationId':_0x313ad3,'mirror':_0x1fe5cc,'mute':_0x179a80};this[_0x5504dd(0x6cc)][_0x5504dd(0x597)](_0x5d38e9);}},Game_Temp['prototype'][_0x288220(0x289)]=function(){return!![];},Game_Temp[_0x288220(0x93f)][_0x288220(0x7cd)]=function(){const _0x1238eb=_0x288220;return this[_0x1238eb(0x6cc)][_0x1238eb(0x907)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x429)]=Game_System[_0x288220(0x93f)][_0x288220(0x501)],Game_System['prototype'][_0x288220(0x501)]=function(){const _0x1d16c1=_0x288220;VisuMZ['CoreEngine']['Game_System_initialize']['call'](this),this[_0x1d16c1(0x8a8)]();},Game_System[_0x288220(0x93f)][_0x288220(0x8a8)]=function(){const _0x237e47=_0x288220;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x237e47(0x4d2)],'BattleSystem':this[_0x237e47(0x46a)](),'FontSize':$dataSystem[_0x237e47(0x902)][_0x237e47(0x4d6)],'Padding':0xc};},Game_System['prototype'][_0x288220(0x69d)]=function(){const _0x594747=_0x288220;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x594747(0x86f)]==='FV')return![];}if(this[_0x594747(0x702)]===undefined)this[_0x594747(0x8a8)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x594747(0x8a8)]();return this[_0x594747(0x702)][_0x594747(0x544)];},Game_System['prototype'][_0x288220(0x46e)]=function(_0x1a80d9){const _0x359d24=_0x288220;if(this['_CoreEngineSettings']===undefined)this[_0x359d24(0x8a8)]();if(this[_0x359d24(0x702)][_0x359d24(0x544)]===undefined)this['initCoreEngine']();this[_0x359d24(0x702)][_0x359d24(0x544)]=_0x1a80d9;},Game_System[_0x288220(0x93f)][_0x288220(0x862)]=function(){const _0x54eca0=_0x288220;if(this[_0x54eca0(0x702)]===undefined)this[_0x54eca0(0x8a8)]();this[_0x54eca0(0x702)][_0x54eca0(0x819)]=this['initialBattleSystem']();},Game_System['prototype'][_0x288220(0x46a)]=function(){const _0x4c4f1f=_0x288220,_0x29d12b=(VisuMZ[_0x4c4f1f(0x665)][_0x4c4f1f(0x30a)][_0x4c4f1f(0x819)]||_0x4c4f1f(0x2c1))[_0x4c4f1f(0x489)]()['trim']();return VisuMZ[_0x4c4f1f(0x665)][_0x4c4f1f(0x6a7)](_0x29d12b);},Game_System[_0x288220(0x93f)]['getBattleSystem']=function(){const _0x3967be=_0x288220;if($gameTemp[_0x3967be(0x7d7)]!==undefined)return $gameTemp[_0x3967be(0x7d7)];if(this[_0x3967be(0x702)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x3967be(0x862)]();return this[_0x3967be(0x702)][_0x3967be(0x819)];},Game_System[_0x288220(0x93f)][_0x288220(0x85e)]=function(_0x5edd0a){const _0x157f2e=_0x288220;if(this[_0x157f2e(0x702)]===undefined)this[_0x157f2e(0x8a8)]();if(this['_CoreEngineSettings'][_0x157f2e(0x819)]===undefined)this[_0x157f2e(0x862)]();this[_0x157f2e(0x702)]['BattleSystem']=_0x5edd0a;},Game_System[_0x288220(0x93f)]['mainFontSize']=function(){const _0x4ef331=_0x288220;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x4ef331(0x702)][_0x4ef331(0x332)]===undefined)this[_0x4ef331(0x8a8)]();return this[_0x4ef331(0x702)][_0x4ef331(0x332)];},Game_System[_0x288220(0x93f)][_0x288220(0x7d9)]=function(_0x177a3f){const _0x472f31=_0x288220;if(this[_0x472f31(0x702)]===undefined)this[_0x472f31(0x8a8)]();if(this[_0x472f31(0x702)][_0x472f31(0x658)]===undefined)this[_0x472f31(0x8a8)]();this[_0x472f31(0x702)]['FontSize']=_0x177a3f;},Game_System[_0x288220(0x93f)][_0x288220(0x913)]=function(){const _0x5b813e=_0x288220;if(this['_CoreEngineSettings']===undefined)this[_0x5b813e(0x8a8)]();if(this[_0x5b813e(0x702)]['Padding']===undefined)this[_0x5b813e(0x8a8)]();return this['_CoreEngineSettings'][_0x5b813e(0x706)];},Game_System[_0x288220(0x93f)][_0x288220(0x7b4)]=function(_0x1679ef){const _0x2399fd=_0x288220;if(this[_0x2399fd(0x702)]===undefined)this[_0x2399fd(0x8a8)]();if(this['_CoreEngineSettings'][_0x2399fd(0x658)]===undefined)this['initCoreEngine']();this[_0x2399fd(0x702)][_0x2399fd(0x706)]=_0x1679ef;},VisuMZ[_0x288220(0x665)][_0x288220(0x779)]=Game_Screen[_0x288220(0x93f)][_0x288220(0x501)],Game_Screen[_0x288220(0x93f)][_0x288220(0x501)]=function(){const _0x26dd03=_0x288220;VisuMZ[_0x26dd03(0x665)][_0x26dd03(0x779)][_0x26dd03(0x6c3)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x288220(0x93f)][_0x288220(0x669)]=function(){const _0xd273d2=_0x288220,_0x3b9953=VisuMZ[_0xd273d2(0x665)][_0xd273d2(0x30a)]['ScreenShake'];this[_0xd273d2(0x889)]=_0x3b9953?.[_0xd273d2(0x29d)]||'random';},Game_Screen[_0x288220(0x93f)][_0x288220(0x4fe)]=function(){const _0x2d34b1=_0x288220;if(this['_coreEngineShakeStyle']===undefined)this[_0x2d34b1(0x669)]();return this[_0x2d34b1(0x889)];},Game_Screen[_0x288220(0x93f)][_0x288220(0x8f8)]=function(_0x53d5fc){const _0x54f18b=_0x288220;if(this[_0x54f18b(0x889)]===undefined)this[_0x54f18b(0x669)]();this[_0x54f18b(0x889)]=_0x53d5fc[_0x54f18b(0x357)]()['trim']();},Game_Picture[_0x288220(0x93f)][_0x288220(0x727)]=function(){const _0x1ac049=_0x288220;if($gameParty[_0x1ac049(0x8e9)]())return![];return this[_0x1ac049(0x661)]()&&this[_0x1ac049(0x661)]()[_0x1ac049(0x34d)](0x0)==='!';},Game_Picture['prototype'][_0x288220(0x661)]=function(){const _0x11ad41=_0x288220;return this[_0x11ad41(0x68a)][_0x11ad41(0x200)]('/')[_0x11ad41(0x1d3)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x649)]=Game_Picture['prototype']['x'],Game_Picture[_0x288220(0x93f)]['x']=function(){const _0x4b7bfe=_0x288220;return this[_0x4b7bfe(0x727)]()?this[_0x4b7bfe(0x35f)]():VisuMZ[_0x4b7bfe(0x665)][_0x4b7bfe(0x649)][_0x4b7bfe(0x6c3)](this);},Game_Picture[_0x288220(0x93f)][_0x288220(0x35f)]=function(){const _0x22f25d=_0x288220,_0x5d6e28=$gameMap[_0x22f25d(0x851)]()*$gameMap[_0x22f25d(0x8db)]();return(this['_x']-_0x5d6e28)*$gameScreen[_0x22f25d(0x72f)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x5c1)]=Game_Picture['prototype']['y'],Game_Picture[_0x288220(0x93f)]['y']=function(){const _0x27e973=_0x288220;return this[_0x27e973(0x727)]()?this[_0x27e973(0x31b)]():VisuMZ['CoreEngine']['Game_Picture_y']['call'](this);},Game_Picture[_0x288220(0x93f)]['yScrollLinkedOffset']=function(){const _0x4a0b3f=_0x288220,_0x48e446=$gameMap[_0x4a0b3f(0x233)]()*$gameMap['tileHeight']();return(this['_y']-_0x48e446)*$gameScreen[_0x4a0b3f(0x72f)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x729)]=Game_Picture[_0x288220(0x93f)][_0x288220(0x8a5)],Game_Picture[_0x288220(0x93f)][_0x288220(0x8a5)]=function(){const _0x5a6bb8=_0x288220;let _0x3d9dff=VisuMZ[_0x5a6bb8(0x665)][_0x5a6bb8(0x729)][_0x5a6bb8(0x6c3)](this);return this[_0x5a6bb8(0x727)]()&&(_0x3d9dff*=$gameScreen[_0x5a6bb8(0x72f)]()),_0x3d9dff;},VisuMZ[_0x288220(0x665)]['Game_Picture_scaleY']=Game_Picture[_0x288220(0x93f)][_0x288220(0x555)],Game_Picture['prototype'][_0x288220(0x555)]=function(){const _0x52b14d=_0x288220;let _0x265848=VisuMZ[_0x52b14d(0x665)][_0x52b14d(0x3f2)][_0x52b14d(0x6c3)](this);return this['isMapScrollLinked']()&&(_0x265848*=$gameScreen[_0x52b14d(0x72f)]()),_0x265848;},Game_Picture['prototype'][_0x288220(0x43e)]=function(_0xf90b73){this['_coreEasingType']=_0xf90b73;},VisuMZ[_0x288220(0x665)]['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x288220(0x1fb)],Game_Picture[_0x288220(0x93f)][_0x288220(0x1fb)]=function(_0x22b951){const _0x31bc86=_0x288220;return this[_0x31bc86(0x37c)]=this[_0x31bc86(0x37c)]||0x0,[0x0,0x1,0x2,0x3][_0x31bc86(0x479)](this['_coreEasingType'])?VisuMZ[_0x31bc86(0x665)]['Game_Picture_calcEasing'][_0x31bc86(0x6c3)](this,_0x22b951):VisuMZ[_0x31bc86(0x693)](_0x22b951,this[_0x31bc86(0x37c)]);},VisuMZ[_0x288220(0x665)]['Game_Picture_initRotation']=Game_Picture[_0x288220(0x93f)][_0x288220(0x6e7)],Game_Picture[_0x288220(0x93f)][_0x288220(0x6e7)]=function(){const _0x1fce9e=_0x288220;VisuMZ[_0x1fce9e(0x665)][_0x1fce9e(0x718)][_0x1fce9e(0x6c3)](this),this[_0x1fce9e(0x883)]();},Game_Picture[_0x288220(0x93f)][_0x288220(0x883)]=function(){const _0x34d3d4=_0x288220;this[_0x34d3d4(0x7bc)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x34d3d4(0x828)};},VisuMZ['CoreEngine'][_0x288220(0x396)]=Game_Picture[_0x288220(0x93f)]['angle'],Game_Picture[_0x288220(0x93f)][_0x288220(0x870)]=function(){const _0x355eaa=_0x288220;let _0x1580a2=VisuMZ[_0x355eaa(0x665)][_0x355eaa(0x396)][_0x355eaa(0x6c3)](this);return _0x1580a2+=this[_0x355eaa(0x26e)](),_0x1580a2;},Game_Picture[_0x288220(0x93f)][_0x288220(0x26e)]=function(){const _0x306551=_0x288220;if(this['_anglePlus']===undefined)this[_0x306551(0x883)]();return this[_0x306551(0x7bc)][_0x306551(0x299)]||0x0;},Game_Picture[_0x288220(0x93f)][_0x288220(0x546)]=function(_0x1d4778,_0x4e4097,_0x122b35){const _0x566a2b=_0x288220;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this[_0x566a2b(0x7bc)]['target']=_0x1d4778||0x0,this[_0x566a2b(0x7bc)][_0x566a2b(0x35a)]=_0x4e4097||0x0,this[_0x566a2b(0x7bc)][_0x566a2b(0x4f5)]=_0x4e4097||0x0,this[_0x566a2b(0x7bc)][_0x566a2b(0x8c0)]=_0x122b35||_0x566a2b(0x828),_0x4e4097<=0x0&&(this[_0x566a2b(0x7bc)]['current']=this[_0x566a2b(0x7bc)][_0x566a2b(0x81e)]);},Game_Picture[_0x288220(0x93f)]['changeAnglePlusData']=function(_0x4b8dbd,_0x1be37d,_0x186e59){const _0xca990a=_0x288220;if(this['_anglePlus']===undefined)this[_0xca990a(0x883)]();this[_0xca990a(0x7bc)]['target']+=_0x4b8dbd||0x0,this[_0xca990a(0x7bc)]['duration']=_0x1be37d||0x0,this[_0xca990a(0x7bc)][_0xca990a(0x4f5)]=_0x1be37d||0x0,this[_0xca990a(0x7bc)][_0xca990a(0x8c0)]=_0x186e59||'Linear',_0x1be37d<=0x0&&(this[_0xca990a(0x7bc)][_0xca990a(0x299)]=this[_0xca990a(0x7bc)][_0xca990a(0x81e)]);},VisuMZ[_0x288220(0x665)][_0x288220(0x70a)]=Game_Picture['prototype'][_0x288220(0x29f)],Game_Picture[_0x288220(0x93f)]['updateRotation']=function(){const _0x4b35d5=_0x288220;VisuMZ['CoreEngine'][_0x4b35d5(0x70a)]['call'](this),this['updateAnglePlus']();},Game_Picture[_0x288220(0x93f)][_0x288220(0x222)]=function(){const _0x2d0ad2=_0x288220;if(this['_anglePlus']===undefined)this[_0x2d0ad2(0x883)]();const _0x326748=this['_anglePlus'];if(_0x326748['duration']<=0x0)return;_0x326748[_0x2d0ad2(0x299)]=this[_0x2d0ad2(0x877)](_0x326748[_0x2d0ad2(0x299)],_0x326748[_0x2d0ad2(0x81e)]),_0x326748['duration']--,_0x326748[_0x2d0ad2(0x35a)]<=0x0&&(_0x326748[_0x2d0ad2(0x299)]=_0x326748[_0x2d0ad2(0x81e)]);},Game_Picture[_0x288220(0x93f)][_0x288220(0x877)]=function(_0x4e10b1,_0x410643){const _0x1907c4=_0x288220,_0x5696c3=this[_0x1907c4(0x7bc)],_0x5227fa=_0x5696c3[_0x1907c4(0x8c0)],_0x17141a=_0x5696c3[_0x1907c4(0x35a)],_0x208b23=_0x5696c3[_0x1907c4(0x4f5)],_0x54f536=VisuMZ['ApplyEasing']((_0x208b23-_0x17141a)/_0x208b23,_0x5227fa),_0xc4cecf=VisuMZ[_0x1907c4(0x693)]((_0x208b23-_0x17141a+0x1)/_0x208b23,_0x5227fa),_0x3942b5=(_0x4e10b1-_0x410643*_0x54f536)/(0x1-_0x54f536);return _0x3942b5+(_0x410643-_0x3942b5)*_0xc4cecf;},VisuMZ['CoreEngine'][_0x288220(0x899)]=Game_Action['prototype']['itemHit'],Game_Action['prototype'][_0x288220(0x2d8)]=function(_0x591af3){const _0x5d7b2a=_0x288220;return VisuMZ[_0x5d7b2a(0x665)][_0x5d7b2a(0x30a)][_0x5d7b2a(0x23d)]['ImprovedAccuracySystem']?this['itemHitImprovedAccuracy'](_0x591af3):VisuMZ[_0x5d7b2a(0x665)][_0x5d7b2a(0x899)][_0x5d7b2a(0x6c3)](this,_0x591af3);},Game_Action[_0x288220(0x93f)][_0x288220(0x7ab)]=function(_0x36626e){const _0x1a94ac=_0x288220,_0x247a69=this[_0x1a94ac(0x3c8)](_0x36626e),_0x4fa2db=this[_0x1a94ac(0x4b8)](_0x36626e),_0x438de3=this[_0x1a94ac(0x837)](_0x36626e);return _0x247a69*(_0x4fa2db-_0x438de3);},VisuMZ[_0x288220(0x665)][_0x288220(0x358)]=Game_Action['prototype'][_0x288220(0x654)],Game_Action[_0x288220(0x93f)]['itemEva']=function(_0x4d4177){const _0x1873fa=_0x288220;return VisuMZ['CoreEngine'][_0x1873fa(0x30a)][_0x1873fa(0x23d)][_0x1873fa(0x7b3)]?0x0:VisuMZ[_0x1873fa(0x665)][_0x1873fa(0x358)][_0x1873fa(0x6c3)](this,_0x4d4177);},Game_Action['prototype'][_0x288220(0x3c8)]=function(_0x372694){const _0x18fd95=_0x288220;return this['item']()[_0x18fd95(0x715)]*0.01;},Game_Action['prototype']['subjectHitRate']=function(_0x274a22){const _0x399f3b=_0x288220;if(VisuMZ['CoreEngine'][_0x399f3b(0x30a)][_0x399f3b(0x23d)][_0x399f3b(0x2e8)]&&this[_0x399f3b(0x254)]())return 0x1;return this[_0x399f3b(0x3f9)]()?VisuMZ[_0x399f3b(0x665)][_0x399f3b(0x30a)][_0x399f3b(0x23d)][_0x399f3b(0x2e8)]&&this[_0x399f3b(0x5a1)]()[_0x399f3b(0x323)]()?this[_0x399f3b(0x5a1)]()[_0x399f3b(0x57e)]+0.05:this[_0x399f3b(0x5a1)]()[_0x399f3b(0x57e)]:0x1;},Game_Action[_0x288220(0x93f)][_0x288220(0x837)]=function(_0x22a59a){const _0x48956f=_0x288220;if(this[_0x48956f(0x5a1)]()['isActor']()===_0x22a59a[_0x48956f(0x323)]())return 0x0;if(this[_0x48956f(0x3f9)]())return VisuMZ[_0x48956f(0x665)][_0x48956f(0x30a)]['QoL'][_0x48956f(0x2e8)]&&_0x22a59a[_0x48956f(0x60a)]()?_0x22a59a[_0x48956f(0x896)]-0.05:_0x22a59a[_0x48956f(0x896)];else return this[_0x48956f(0x893)]()?_0x22a59a['mev']:0x0;},VisuMZ['CoreEngine'][_0x288220(0x269)]=Game_Action[_0x288220(0x93f)][_0x288220(0x614)],Game_Action['prototype'][_0x288220(0x614)]=function(_0x295e57){const _0x470ff8=_0x288220;VisuMZ[_0x470ff8(0x665)][_0x470ff8(0x269)][_0x470ff8(0x6c3)](this,_0x295e57);if(VisuMZ[_0x470ff8(0x665)][_0x470ff8(0x30a)][_0x470ff8(0x23d)][_0x470ff8(0x7b3)])return;const _0x15aac9=_0x295e57[_0x470ff8(0x806)]();_0x15aac9[_0x470ff8(0x263)]&&(0x1-this[_0x470ff8(0x654)](_0x295e57)>this[_0x470ff8(0x2d8)](_0x295e57)&&(_0x15aac9[_0x470ff8(0x263)]=![],_0x15aac9['evaded']=!![]));},VisuMZ[_0x288220(0x665)][_0x288220(0x339)]=Game_BattlerBase[_0x288220(0x93f)]['initMembers'],Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x911)]=function(){const _0x386a7a=_0x288220;this[_0x386a7a(0x28a)]={},VisuMZ['CoreEngine'][_0x386a7a(0x339)][_0x386a7a(0x6c3)](this);},VisuMZ[_0x288220(0x665)][_0x288220(0x7f8)]=Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x80c)],Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x80c)]=function(){const _0x4c9096=_0x288220;this[_0x4c9096(0x28a)]={},VisuMZ['CoreEngine'][_0x4c9096(0x7f8)]['call'](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x510e08){const _0x13c87f=_0x288220;return this[_0x13c87f(0x28a)]=this['_cache']||{},this[_0x13c87f(0x28a)][_0x510e08]!==undefined;},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x201)]=function(_0x4998fe){const _0x500639=_0x288220,_0x7680df=(_0x3eba20,_0x4f6540)=>{const _0x56a9be=_0x3bc1;if(!_0x4f6540)return _0x3eba20;if(_0x4f6540[_0x56a9be(0x8d8)][_0x56a9be(0x54b)](VisuMZ['CoreEngine'][_0x56a9be(0x550)][_0x56a9be(0x201)][_0x4998fe])){var _0xa3142d=Number(RegExp['$1']);_0x3eba20+=_0xa3142d;}if(_0x4f6540[_0x56a9be(0x8d8)][_0x56a9be(0x54b)](VisuMZ[_0x56a9be(0x665)][_0x56a9be(0x550)]['paramPlusJS'][_0x4998fe])){var _0x2c56dd=String(RegExp['$1']);try{_0x3eba20+=eval(_0x2c56dd);}catch(_0x4a35c9){if($gameTemp[_0x56a9be(0x813)]())console[_0x56a9be(0x94a)](_0x4a35c9);}}return _0x3eba20;};return this['traitObjects']()['reduce'](_0x7680df,this[_0x500639(0x659)][_0x4998fe]);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x767)]=function(_0x1600c3){const _0x28acd2=_0x288220;var _0x544b7b=_0x28acd2(0x6f2)+(this[_0x28acd2(0x323)]()?_0x28acd2(0x409):_0x28acd2(0x89f))+_0x28acd2(0x8ef)+_0x1600c3;if(this['checkCacheKey'](_0x544b7b))return this[_0x28acd2(0x28a)][_0x544b7b];this[_0x28acd2(0x28a)][_0x544b7b]=eval(VisuMZ[_0x28acd2(0x665)][_0x28acd2(0x30a)][_0x28acd2(0x6dd)][_0x544b7b]);const _0x5dcab6=(_0x134b73,_0x5a8adb)=>{const _0x581a56=_0x28acd2;if(!_0x5a8adb)return _0x134b73;if(_0x5a8adb[_0x581a56(0x8d8)][_0x581a56(0x54b)](VisuMZ[_0x581a56(0x665)][_0x581a56(0x550)]['paramMax'][_0x1600c3])){var _0x472a2d=Number(RegExp['$1']);if(_0x472a2d===0x0)_0x472a2d=Number['MAX_SAFE_INTEGER'];_0x134b73=Math[_0x581a56(0x6de)](_0x134b73,_0x472a2d);}if(_0x5a8adb['note'][_0x581a56(0x54b)](VisuMZ[_0x581a56(0x665)][_0x581a56(0x550)]['paramMaxJS'][_0x1600c3])){var _0x17fd5d=String(RegExp['$1']);try{_0x134b73=Math[_0x581a56(0x6de)](_0x134b73,Number(eval(_0x17fd5d)));}catch(_0x4cb7bc){if($gameTemp[_0x581a56(0x813)]())console[_0x581a56(0x94a)](_0x4cb7bc);}}return _0x134b73;};if(this[_0x28acd2(0x28a)][_0x544b7b]===0x0)this[_0x28acd2(0x28a)][_0x544b7b]=Number[_0x28acd2(0x32e)];return this[_0x28acd2(0x28a)][_0x544b7b]=this['traitObjects']()[_0x28acd2(0x824)](_0x5dcab6,this[_0x28acd2(0x28a)][_0x544b7b]),this[_0x28acd2(0x28a)][_0x544b7b];},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x5b3)]=function(_0x5ef2fd){const _0xafc190=_0x288220,_0x4e973c=this[_0xafc190(0x5c4)](Game_BattlerBase[_0xafc190(0x603)],_0x5ef2fd),_0x1391ef=(_0x33c1d9,_0x23ca5d)=>{const _0x25146e=_0xafc190;if(!_0x23ca5d)return _0x33c1d9;if(_0x23ca5d[_0x25146e(0x8d8)]['match'](VisuMZ[_0x25146e(0x665)][_0x25146e(0x550)]['paramRate1'][_0x5ef2fd])){var _0x388c13=Number(RegExp['$1'])/0x64;_0x33c1d9*=_0x388c13;}if(_0x23ca5d[_0x25146e(0x8d8)][_0x25146e(0x54b)](VisuMZ[_0x25146e(0x665)][_0x25146e(0x550)][_0x25146e(0x7ba)][_0x5ef2fd])){var _0x388c13=Number(RegExp['$1']);_0x33c1d9*=_0x388c13;}if(_0x23ca5d[_0x25146e(0x8d8)][_0x25146e(0x54b)](VisuMZ[_0x25146e(0x665)][_0x25146e(0x550)][_0x25146e(0x53a)][_0x5ef2fd])){var _0x575b01=String(RegExp['$1']);try{_0x33c1d9*=eval(_0x575b01);}catch(_0x353dcc){if($gameTemp[_0x25146e(0x813)]())console[_0x25146e(0x94a)](_0x353dcc);}}return _0x33c1d9;};return this[_0xafc190(0x21f)]()['reduce'](_0x1391ef,_0x4e973c);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x3b2)]=function(_0x2226df){const _0x3ff2c9=_0x288220,_0xb4ec97=(_0x36bf98,_0x473a83)=>{const _0x36e4dd=_0x3bc1;if(!_0x473a83)return _0x36bf98;if(_0x473a83[_0x36e4dd(0x8d8)]['match'](VisuMZ[_0x36e4dd(0x665)][_0x36e4dd(0x550)][_0x36e4dd(0x2ea)][_0x2226df])){var _0x265fd9=Number(RegExp['$1']);_0x36bf98+=_0x265fd9;}if(_0x473a83['note'][_0x36e4dd(0x54b)](VisuMZ[_0x36e4dd(0x665)]['RegExp'][_0x36e4dd(0x678)][_0x2226df])){var _0x1695e5=String(RegExp['$1']);try{_0x36bf98+=eval(_0x1695e5);}catch(_0x308751){if($gameTemp['isPlaytest']())console['log'](_0x308751);}}return _0x36bf98;};return this[_0x3ff2c9(0x21f)]()[_0x3ff2c9(0x824)](_0xb4ec97,0x0);},Game_BattlerBase[_0x288220(0x93f)]['param']=function(_0x8fed72){const _0x2db1fa=_0x288220;let _0x22540e=_0x2db1fa(0x367)+_0x8fed72+_0x2db1fa(0x3fd);if(this['checkCacheKey'](_0x22540e))return this['_cache'][_0x22540e];return this[_0x2db1fa(0x28a)][_0x22540e]=Math[_0x2db1fa(0x3ff)](VisuMZ[_0x2db1fa(0x665)]['Settings']['Param'][_0x2db1fa(0x4f9)]['call'](this,_0x8fed72)),this[_0x2db1fa(0x28a)][_0x22540e];},Game_BattlerBase['prototype'][_0x288220(0x568)]=function(_0x5dde2c){const _0x226f3f=_0x288220,_0x2fc2ee=(_0x4659ec,_0x3234d7)=>{const _0x620c6e=_0x3bc1;if(!_0x3234d7)return _0x4659ec;if(_0x3234d7['note'][_0x620c6e(0x54b)](VisuMZ['CoreEngine']['RegExp']['xparamPlus1'][_0x5dde2c])){var _0x286a64=Number(RegExp['$1'])/0x64;_0x4659ec+=_0x286a64;}if(_0x3234d7[_0x620c6e(0x8d8)][_0x620c6e(0x54b)](VisuMZ['CoreEngine'][_0x620c6e(0x550)][_0x620c6e(0x2dd)][_0x5dde2c])){var _0x286a64=Number(RegExp['$1']);_0x4659ec+=_0x286a64;}if(_0x3234d7[_0x620c6e(0x8d8)][_0x620c6e(0x54b)](VisuMZ[_0x620c6e(0x665)]['RegExp'][_0x620c6e(0x975)][_0x5dde2c])){var _0x16713d=String(RegExp['$1']);try{_0x4659ec+=eval(_0x16713d);}catch(_0x497aab){if($gameTemp['isPlaytest']())console[_0x620c6e(0x94a)](_0x497aab);}}return _0x4659ec;};return this[_0x226f3f(0x21f)]()[_0x226f3f(0x824)](_0x2fc2ee,0x0);},Game_BattlerBase[_0x288220(0x93f)]['xparamRate']=function(_0x1ebf94){const _0x44b7bd=_0x288220,_0x3b6b1d=(_0x2f4e3e,_0x59f032)=>{const _0x4cf36c=_0x3bc1;if(!_0x59f032)return _0x2f4e3e;if(_0x59f032[_0x4cf36c(0x8d8)][_0x4cf36c(0x54b)](VisuMZ['CoreEngine']['RegExp'][_0x4cf36c(0x57a)][_0x1ebf94])){var _0x5c1f52=Number(RegExp['$1'])/0x64;_0x2f4e3e*=_0x5c1f52;}if(_0x59f032[_0x4cf36c(0x8d8)][_0x4cf36c(0x54b)](VisuMZ[_0x4cf36c(0x665)][_0x4cf36c(0x550)][_0x4cf36c(0x8fc)][_0x1ebf94])){var _0x5c1f52=Number(RegExp['$1']);_0x2f4e3e*=_0x5c1f52;}if(_0x59f032['note'][_0x4cf36c(0x54b)](VisuMZ['CoreEngine'][_0x4cf36c(0x550)][_0x4cf36c(0x556)][_0x1ebf94])){var _0x561cb0=String(RegExp['$1']);try{_0x2f4e3e*=eval(_0x561cb0);}catch(_0x557820){if($gameTemp[_0x4cf36c(0x813)]())console['log'](_0x557820);}}return _0x2f4e3e;};return this['traitObjects']()[_0x44b7bd(0x824)](_0x3b6b1d,0x1);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x8ce)]=function(_0x5752a1){const _0xf92482=_0x288220,_0x5f1b47=(_0x56ec,_0x3b7874)=>{const _0x8a9384=_0x3bc1;if(!_0x3b7874)return _0x56ec;if(_0x3b7874[_0x8a9384(0x8d8)][_0x8a9384(0x54b)](VisuMZ['CoreEngine'][_0x8a9384(0x550)][_0x8a9384(0x55d)][_0x5752a1])){var _0x33f248=Number(RegExp['$1'])/0x64;_0x56ec+=_0x33f248;}if(_0x3b7874[_0x8a9384(0x8d8)][_0x8a9384(0x54b)](VisuMZ[_0x8a9384(0x665)][_0x8a9384(0x550)][_0x8a9384(0x60f)][_0x5752a1])){var _0x33f248=Number(RegExp['$1']);_0x56ec+=_0x33f248;}if(_0x3b7874[_0x8a9384(0x8d8)][_0x8a9384(0x54b)](VisuMZ[_0x8a9384(0x665)][_0x8a9384(0x550)]['xparamFlatJS'][_0x5752a1])){var _0x335b1f=String(RegExp['$1']);try{_0x56ec+=eval(_0x335b1f);}catch(_0xe4e8b4){if($gameTemp[_0x8a9384(0x813)]())console[_0x8a9384(0x94a)](_0xe4e8b4);}}return _0x56ec;};return this[_0xf92482(0x21f)]()[_0xf92482(0x824)](_0x5f1b47,0x0);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x2e4)]=function(_0x500dc6){const _0x5dda8d=_0x288220;let _0xe346a1=_0x5dda8d(0x2e4)+_0x500dc6+'Total';if(this[_0x5dda8d(0x929)](_0xe346a1))return this[_0x5dda8d(0x28a)][_0xe346a1];return this[_0x5dda8d(0x28a)][_0xe346a1]=VisuMZ[_0x5dda8d(0x665)]['Settings']['Param'][_0x5dda8d(0x398)][_0x5dda8d(0x6c3)](this,_0x500dc6),this[_0x5dda8d(0x28a)][_0xe346a1];},Game_BattlerBase[_0x288220(0x93f)]['sparamPlus']=function(_0x46e94b){const _0x1b5e78=_0x288220,_0x54ebe7=(_0x4430cc,_0xfc5ab2)=>{const _0x1b71eb=_0x3bc1;if(!_0xfc5ab2)return _0x4430cc;if(_0xfc5ab2[_0x1b71eb(0x8d8)][_0x1b71eb(0x54b)](VisuMZ[_0x1b71eb(0x665)]['RegExp']['sparamPlus1'][_0x46e94b])){var _0x297c13=Number(RegExp['$1'])/0x64;_0x4430cc+=_0x297c13;}if(_0xfc5ab2[_0x1b71eb(0x8d8)][_0x1b71eb(0x54b)](VisuMZ[_0x1b71eb(0x665)]['RegExp'][_0x1b71eb(0x864)][_0x46e94b])){var _0x297c13=Number(RegExp['$1']);_0x4430cc+=_0x297c13;}if(_0xfc5ab2[_0x1b71eb(0x8d8)][_0x1b71eb(0x54b)](VisuMZ[_0x1b71eb(0x665)][_0x1b71eb(0x550)][_0x1b71eb(0x78e)][_0x46e94b])){var _0x4b232f=String(RegExp['$1']);try{_0x4430cc+=eval(_0x4b232f);}catch(_0x4f7f03){if($gameTemp[_0x1b71eb(0x813)]())console[_0x1b71eb(0x94a)](_0x4f7f03);}}return _0x4430cc;};return this[_0x1b5e78(0x21f)]()[_0x1b5e78(0x824)](_0x54ebe7,0x0);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x3e6)]=function(_0x4f46fe){const _0x1e0d63=_0x288220,_0x45edc5=(_0x32c8a5,_0x1db7db)=>{const _0x52ae47=_0x3bc1;if(!_0x1db7db)return _0x32c8a5;if(_0x1db7db[_0x52ae47(0x8d8)][_0x52ae47(0x54b)](VisuMZ['CoreEngine'][_0x52ae47(0x550)][_0x52ae47(0x57d)][_0x4f46fe])){var _0x224e61=Number(RegExp['$1'])/0x64;_0x32c8a5*=_0x224e61;}if(_0x1db7db['note']['match'](VisuMZ[_0x52ae47(0x665)]['RegExp']['sparamRate2'][_0x4f46fe])){var _0x224e61=Number(RegExp['$1']);_0x32c8a5*=_0x224e61;}if(_0x1db7db[_0x52ae47(0x8d8)]['match'](VisuMZ[_0x52ae47(0x665)][_0x52ae47(0x550)][_0x52ae47(0x3ae)][_0x4f46fe])){var _0x314af2=String(RegExp['$1']);try{_0x32c8a5*=eval(_0x314af2);}catch(_0x11be8b){if($gameTemp[_0x52ae47(0x813)]())console[_0x52ae47(0x94a)](_0x11be8b);}}return _0x32c8a5;};return this[_0x1e0d63(0x21f)]()[_0x1e0d63(0x824)](_0x45edc5,0x1);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x8e1)]=function(_0x1b2b09){const _0x103a2d=_0x288220,_0x3a18f6=(_0x47fafa,_0x44ceb1)=>{const _0x16bd84=_0x3bc1;if(!_0x44ceb1)return _0x47fafa;if(_0x44ceb1[_0x16bd84(0x8d8)][_0x16bd84(0x54b)](VisuMZ[_0x16bd84(0x665)][_0x16bd84(0x550)][_0x16bd84(0x4ee)][_0x1b2b09])){var _0x14fc92=Number(RegExp['$1'])/0x64;_0x47fafa+=_0x14fc92;}if(_0x44ceb1[_0x16bd84(0x8d8)][_0x16bd84(0x54b)](VisuMZ['CoreEngine'][_0x16bd84(0x550)][_0x16bd84(0x6bc)][_0x1b2b09])){var _0x14fc92=Number(RegExp['$1']);_0x47fafa+=_0x14fc92;}if(_0x44ceb1[_0x16bd84(0x8d8)][_0x16bd84(0x54b)](VisuMZ[_0x16bd84(0x665)][_0x16bd84(0x550)][_0x16bd84(0x3f1)][_0x1b2b09])){var _0x262a13=String(RegExp['$1']);try{_0x47fafa+=eval(_0x262a13);}catch(_0x42a69b){if($gameTemp[_0x16bd84(0x813)]())console[_0x16bd84(0x94a)](_0x42a69b);}}return _0x47fafa;};return this[_0x103a2d(0x21f)]()['reduce'](_0x3a18f6,0x0);},Game_BattlerBase[_0x288220(0x93f)][_0x288220(0x374)]=function(_0x1ab58a){const _0x1c34a5=_0x288220;let _0x10500e=_0x1c34a5(0x374)+_0x1ab58a+'Total';if(this['checkCacheKey'](_0x10500e))return this[_0x1c34a5(0x28a)][_0x10500e];return this[_0x1c34a5(0x28a)][_0x10500e]=VisuMZ['CoreEngine'][_0x1c34a5(0x30a)][_0x1c34a5(0x6dd)][_0x1c34a5(0x215)][_0x1c34a5(0x6c3)](this,_0x1ab58a),this[_0x1c34a5(0x28a)][_0x10500e];},Game_BattlerBase[_0x288220(0x93f)]['paramValueByName']=function(_0x452294,_0x4ff8cf){const _0x6eb27c=_0x288220;if(typeof paramId===_0x6eb27c(0x6be))return this['param'](_0x452294);_0x452294=String(_0x452294||'')[_0x6eb27c(0x489)]();if(_0x452294===_0x6eb27c(0x887))return this['param'](0x0);if(_0x452294===_0x6eb27c(0x283))return this[_0x6eb27c(0x367)](0x1);if(_0x452294==='ATK')return this[_0x6eb27c(0x367)](0x2);if(_0x452294===_0x6eb27c(0x8bd))return this[_0x6eb27c(0x367)](0x3);if(_0x452294===_0x6eb27c(0x445))return this[_0x6eb27c(0x367)](0x4);if(_0x452294===_0x6eb27c(0x65a))return this[_0x6eb27c(0x367)](0x5);if(_0x452294===_0x6eb27c(0x908))return this[_0x6eb27c(0x367)](0x6);if(_0x452294===_0x6eb27c(0x293))return this[_0x6eb27c(0x367)](0x7);if(_0x452294===_0x6eb27c(0x452))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x0)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x0);if(_0x452294===_0x6eb27c(0x89b))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x1)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x1);if(_0x452294===_0x6eb27c(0x807))return _0x4ff8cf?String(Math['round'](this[_0x6eb27c(0x2e4)](0x2)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x2);if(_0x452294==='CEV')return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x3)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x3);if(_0x452294===_0x6eb27c(0x671))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x4)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x4);if(_0x452294===_0x6eb27c(0x5e9))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this['xparam'](0x5)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x5);if(_0x452294===_0x6eb27c(0x3f4))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x452294===_0x6eb27c(0x625))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x7)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x7);if(_0x452294===_0x6eb27c(0x58b))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x452294===_0x6eb27c(0x5ef))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x2e4)](0x9)*0x64))+'%':this[_0x6eb27c(0x2e4)](0x9);if(_0x452294===_0x6eb27c(0x87f))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x374)](0x0)*0x64))+'%':this[_0x6eb27c(0x374)](0x0);if(_0x452294===_0x6eb27c(0x820))return _0x4ff8cf?String(Math['round'](this['sparam'](0x1)*0x64))+'%':this[_0x6eb27c(0x374)](0x1);if(_0x452294===_0x6eb27c(0x7e1))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x374)](0x2)*0x64))+'%':this[_0x6eb27c(0x374)](0x2);if(_0x452294===_0x6eb27c(0x3cd))return _0x4ff8cf?String(Math['round'](this['sparam'](0x3)*0x64))+'%':this[_0x6eb27c(0x374)](0x3);if(_0x452294===_0x6eb27c(0x925))return _0x4ff8cf?String(Math['round'](this['sparam'](0x4)*0x64))+'%':this[_0x6eb27c(0x374)](0x4);if(_0x452294===_0x6eb27c(0x6bd))return _0x4ff8cf?String(Math['round'](this['sparam'](0x5)*0x64))+'%':this[_0x6eb27c(0x374)](0x5);if(_0x452294==='PDR')return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x374)](0x6)*0x64))+'%':this[_0x6eb27c(0x374)](0x6);if(_0x452294==='MDR')return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x374)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x452294===_0x6eb27c(0x247))return _0x4ff8cf?String(Math['round'](this[_0x6eb27c(0x374)](0x8)*0x64))+'%':this[_0x6eb27c(0x374)](0x8);if(_0x452294===_0x6eb27c(0x2d5))return _0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](this[_0x6eb27c(0x374)](0x9)*0x64))+'%':this[_0x6eb27c(0x374)](0x9);if(VisuMZ[_0x6eb27c(0x665)][_0x6eb27c(0x7db)][_0x452294]){const _0x1661b4=VisuMZ[_0x6eb27c(0x665)]['CustomParamAbb'][_0x452294],_0x1986b7=this[_0x1661b4];return VisuMZ['CoreEngine'][_0x6eb27c(0x2d0)][_0x452294]===_0x6eb27c(0x722)?_0x1986b7:_0x4ff8cf?String(Math[_0x6eb27c(0x3ff)](_0x1986b7*0x64))+'%':_0x1986b7;}return'';},Game_BattlerBase[_0x288220(0x93f)]['isDying']=function(){const _0x3abad6=_0x288220;return this[_0x3abad6(0x52b)]()&&this[_0x3abad6(0x49f)]<this['mhp']*VisuMZ[_0x3abad6(0x665)][_0x3abad6(0x30a)][_0x3abad6(0x6dd)][_0x3abad6(0x1e1)];},Game_Battler[_0x288220(0x93f)][_0x288220(0x6e5)]=function(){const _0x4035f2=_0x288220;SoundManager['playMiss'](),this[_0x4035f2(0x262)]('evade');},VisuMZ[_0x288220(0x665)]['Game_Actor_isPreserveTp']=Game_Actor['prototype'][_0x288220(0x579)],Game_Actor[_0x288220(0x93f)]['isPreserveTp']=function(){const _0x23d7bd=_0x288220;if(!$gameParty[_0x23d7bd(0x8e9)]())return!![];return VisuMZ['CoreEngine']['Game_Actor_isPreserveTp']['call'](this);},VisuMZ[_0x288220(0x665)][_0x288220(0x719)]=Game_Actor['prototype'][_0x288220(0x6c8)],Game_Actor[_0x288220(0x93f)]['paramBase']=function(_0x40ead7){const _0x1fd469=_0x288220;if(this[_0x1fd469(0x867)]>0x63)return this[_0x1fd469(0x71d)](_0x40ead7);return VisuMZ[_0x1fd469(0x665)][_0x1fd469(0x719)][_0x1fd469(0x6c3)](this,_0x40ead7);},Game_Actor[_0x288220(0x93f)]['paramBaseAboveLevel99']=function(_0x460e0c){const _0x4663e3=_0x288220,_0x337618=this[_0x4663e3(0x54d)]()[_0x4663e3(0x7be)][_0x460e0c][0x63],_0x3745de=this['currentClass']()[_0x4663e3(0x7be)][_0x460e0c][0x62];return _0x337618+(_0x337618-_0x3745de)*(this[_0x4663e3(0x867)]-0x63);},VisuMZ[_0x288220(0x665)]['Game_Actor_changeClass']=Game_Actor['prototype']['changeClass'],Game_Actor[_0x288220(0x93f)][_0x288220(0x7bf)]=function(_0x293484,_0xf1447c){const _0x55b9c0=_0x288220;$gameTemp[_0x55b9c0(0x8fb)]=!![],VisuMZ[_0x55b9c0(0x665)][_0x55b9c0(0x5f1)][_0x55b9c0(0x6c3)](this,_0x293484,_0xf1447c),$gameTemp[_0x55b9c0(0x8fb)]=undefined;},VisuMZ[_0x288220(0x665)][_0x288220(0x720)]=Game_Actor[_0x288220(0x93f)]['levelUp'],Game_Actor[_0x288220(0x93f)]['levelUp']=function(){const _0x3fbfcf=_0x288220;VisuMZ[_0x3fbfcf(0x665)]['Game_Actor_levelUp'][_0x3fbfcf(0x6c3)](this);if(!$gameTemp[_0x3fbfcf(0x8fb)])this[_0x3fbfcf(0x794)]();},Game_Actor[_0x288220(0x93f)]['levelUpRecovery']=function(){const _0x28ffc4=_0x288220;this[_0x28ffc4(0x28a)]={};if(VisuMZ[_0x28ffc4(0x665)][_0x28ffc4(0x30a)]['QoL']['LevelUpFullHp'])this[_0x28ffc4(0x49f)]=this[_0x28ffc4(0x1fc)];if(VisuMZ[_0x28ffc4(0x665)][_0x28ffc4(0x30a)]['QoL']['LevelUpFullMp'])this[_0x28ffc4(0x77e)]=this['mmp'];},Game_Actor[_0x288220(0x93f)]['expRate']=function(){const _0xdea034=_0x288220;if(this['isMaxLevel']())return 0x1;const _0xd0c22f=this[_0xdea034(0x6a6)]()-this[_0xdea034(0x2fc)](),_0x433d4b=this[_0xdea034(0x80f)]()-this[_0xdea034(0x2fc)]();return(_0x433d4b/_0xd0c22f)['clamp'](0x0,0x1);},Game_Actor[_0x288220(0x93f)][_0x288220(0x21f)]=function(){const _0x3476f1=_0x288220,_0x4da42b=Game_Battler[_0x3476f1(0x93f)][_0x3476f1(0x21f)][_0x3476f1(0x6c3)](this);for(const _0x24cf73 of this[_0x3476f1(0x609)]()){_0x24cf73&&_0x4da42b[_0x3476f1(0x597)](_0x24cf73);}return _0x4da42b[_0x3476f1(0x597)](this[_0x3476f1(0x54d)](),this['actor']()),_0x4da42b;},Object[_0x288220(0x82c)](Game_Enemy[_0x288220(0x93f)],'level',{'get':function(){const _0x15d6ce=_0x288220;return this[_0x15d6ce(0x63d)]();},'configurable':!![]}),Game_Enemy[_0x288220(0x93f)][_0x288220(0x63d)]=function(){const _0x23a6ae=_0x288220;return this['enemy']()[_0x23a6ae(0x867)];},Game_Enemy['prototype'][_0x288220(0x30d)]=function(){const _0x3b70ff=_0x288220;!this[_0x3b70ff(0x70b)]&&(this['_screenY']+=Math[_0x3b70ff(0x3ff)]((Graphics['height']-0x270)/0x2),this[_0x3b70ff(0x469)]-=Math['floor']((Graphics[_0x3b70ff(0x4b9)]-Graphics[_0x3b70ff(0x415)])/0x2),$gameSystem[_0x3b70ff(0x69d)]()?this[_0x3b70ff(0x854)]-=Math[_0x3b70ff(0x25e)]((Graphics[_0x3b70ff(0x426)]-Graphics[_0x3b70ff(0x878)])/0x2):this[_0x3b70ff(0x854)]+=Math[_0x3b70ff(0x3ff)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x3b70ff(0x70b)]=!![];},Game_Party[_0x288220(0x93f)][_0x288220(0x3e3)]=function(){const _0x4b4ba2=_0x288220;return VisuMZ[_0x4b4ba2(0x665)][_0x4b4ba2(0x30a)][_0x4b4ba2(0x552)][_0x4b4ba2(0x833)];},VisuMZ[_0x288220(0x665)][_0x288220(0x35b)]=Game_Party[_0x288220(0x93f)][_0x288220(0x3b4)],Game_Party['prototype'][_0x288220(0x3b4)]=function(_0xd7165b){const _0x4abaf8=_0x288220;if(VisuMZ[_0x4abaf8(0x665)][_0x4abaf8(0x30a)][_0x4abaf8(0x23d)][_0x4abaf8(0x910)]&&DataManager[_0x4abaf8(0x33c)](_0xd7165b))return;VisuMZ['CoreEngine']['Game_Party_consumeItem'][_0x4abaf8(0x6c3)](this,_0xd7165b);},Game_Party['prototype'][_0x288220(0x900)]=function(){const _0x380adb=_0x288220,_0x202eb4=VisuMZ['CoreEngine'][_0x380adb(0x30a)][_0x380adb(0x23d)],_0x5725ee=_0x202eb4[_0x380adb(0x2f8)]??0x63;let _0x3b4499=[];(_0x202eb4['BTestItems']??!![])&&(_0x3b4499=_0x3b4499['concat']($dataItems));(_0x202eb4[_0x380adb(0x31f)]??!![])&&(_0x3b4499=_0x3b4499[_0x380adb(0x6ad)]($dataWeapons));(_0x202eb4['BTestArmors']??!![])&&(_0x3b4499=_0x3b4499[_0x380adb(0x6ad)]($dataArmors));for(const _0x2c9378 of _0x3b4499){if(!_0x2c9378)continue;if(_0x2c9378[_0x380adb(0x392)][_0x380adb(0x91c)]()<=0x0)continue;if(_0x2c9378[_0x380adb(0x392)][_0x380adb(0x54b)](/-----/i))continue;this[_0x380adb(0x424)](_0x2c9378,_0x5725ee);}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop[_0x288220(0x93f)][_0x288220(0x540)],Game_Troop['prototype'][_0x288220(0x540)]=function(_0x14ae87){const _0x385130=_0x288220;$gameTemp[_0x385130(0x2e7)](),$gameTemp[_0x385130(0x800)](_0x14ae87),VisuMZ['CoreEngine'][_0x385130(0x49a)][_0x385130(0x6c3)](this,_0x14ae87);},VisuMZ[_0x288220(0x665)][_0x288220(0x4e8)]=Game_Map[_0x288220(0x93f)][_0x288220(0x540)],Game_Map[_0x288220(0x93f)]['setup']=function(_0x198ddd){const _0x2992f3=_0x288220;VisuMZ[_0x2992f3(0x665)][_0x2992f3(0x4e8)][_0x2992f3(0x6c3)](this,_0x198ddd),this[_0x2992f3(0x231)](),this['setupCoreEngine'](_0x198ddd),this[_0x2992f3(0x8a0)]();},Game_Map[_0x288220(0x93f)][_0x288220(0x95d)]=function(){const _0x11c27d=_0x288220;this['_hideTileShadows']=VisuMZ['CoreEngine'][_0x11c27d(0x30a)][_0x11c27d(0x23d)][_0x11c27d(0x1da)]||![];const _0x2b4b68=VisuMZ[_0x11c27d(0x665)][_0x11c27d(0x30a)][_0x11c27d(0x8d4)],_0x104d8c=$dataMap?$dataMap['note']||'':'';if(_0x104d8c[_0x11c27d(0x54b)](/<SHOW TILE SHADOWS>/i))this[_0x11c27d(0x92f)]=![];else _0x104d8c['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x11c27d(0x92f)]=!![]);if(_0x104d8c[_0x11c27d(0x54b)](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()[_0x11c27d(0x4b5)]=!![],this[_0x11c27d(0x58f)]()[_0x11c27d(0x851)]=_0x2b4b68[_0x11c27d(0x1ff)];else _0x104d8c['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x11c27d(0x58f)]()[_0x11c27d(0x4b5)]=!![],this['centerCameraCheckData']()['displayX']=Number(RegExp['$1']));if(_0x104d8c[_0x11c27d(0x54b)](/<SCROLL LOCK Y>/i))this[_0x11c27d(0x58f)]()[_0x11c27d(0x8b9)]=!![],this[_0x11c27d(0x58f)]()['displayY']=_0x2b4b68[_0x11c27d(0x778)];else _0x104d8c['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this['centerCameraCheckData']()['centerY']=!![],this[_0x11c27d(0x58f)]()[_0x11c27d(0x233)]=Number(RegExp['$1']));},Game_Map['prototype'][_0x288220(0x4fd)]=function(){const _0x597576=_0x288220;if(this[_0x597576(0x92f)]===undefined)this['setupCoreEngine']();return this[_0x597576(0x92f)];},Game_Map[_0x288220(0x93f)][_0x288220(0x231)]=function(){const _0x9fdbd6=_0x288220,_0x349741=VisuMZ[_0x9fdbd6(0x665)]['Settings'][_0x9fdbd6(0x8d4)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x349741[_0x9fdbd6(0x6b5)]){const _0x2d896e=Graphics[_0x9fdbd6(0x426)]/this[_0x9fdbd6(0x8db)]();_0x2d896e%0x1!==0x0&&Math['ceil'](_0x2d896e)===this[_0x9fdbd6(0x426)]()&&!this[_0x9fdbd6(0x657)]()&&(this[_0x9fdbd6(0x7c0)][_0x9fdbd6(0x4b5)]=!![],this[_0x9fdbd6(0x7c0)][_0x9fdbd6(0x851)]=_0x349741[_0x9fdbd6(0x1ff)]||0x0);}if(_0x349741[_0x9fdbd6(0x818)]){const _0x2f6ad4=Graphics[_0x9fdbd6(0x4b9)]/this[_0x9fdbd6(0x648)]();_0x2f6ad4%0x1!==0x0&&Math[_0x9fdbd6(0x3eb)](_0x2f6ad4)===this['height']()&&!this[_0x9fdbd6(0x1eb)]()&&(this['_centerCameraCheck']['centerY']=!![],this[_0x9fdbd6(0x7c0)]['displayY']=_0x349741[_0x9fdbd6(0x778)]||0x0);}$gameScreen['zoomScale']()===0x1&&(this[_0x9fdbd6(0x58f)]()['centerX']&&(this['_displayX']=this[_0x9fdbd6(0x58f)]()[_0x9fdbd6(0x851)]),this[_0x9fdbd6(0x58f)]()[_0x9fdbd6(0x8b9)]&&(this[_0x9fdbd6(0x49d)]=this[_0x9fdbd6(0x58f)]()[_0x9fdbd6(0x233)]));},VisuMZ['CoreEngine']['Game_Map_setDisplayPos']=Game_Map['prototype'][_0x288220(0x74f)],Game_Map[_0x288220(0x93f)][_0x288220(0x74f)]=function(_0x2e3268,_0xc3d014){const _0x1aec9f=_0x288220;VisuMZ['CoreEngine']['Game_Map_setDisplayPos'][_0x1aec9f(0x6c3)](this,_0x2e3268,_0xc3d014),$gameScreen['zoomScale']()===0x1&&(!this['isLoopHorizontal']()&&this[_0x1aec9f(0x58f)]()[_0x1aec9f(0x4b5)]&&(this['_displayX']=this[_0x1aec9f(0x58f)]()['displayX']),!this[_0x1aec9f(0x1eb)]()&&this['centerCameraCheckData']()[_0x1aec9f(0x8b9)]&&(this[_0x1aec9f(0x49d)]=this['centerCameraCheckData']()[_0x1aec9f(0x233)]));},Game_Map[_0x288220(0x93f)][_0x288220(0x58f)]=function(){const _0x3cba3d=_0x288220;if(this[_0x3cba3d(0x7c0)]===undefined)this[_0x3cba3d(0x231)]();return this[_0x3cba3d(0x7c0)];},VisuMZ[_0x288220(0x665)][_0x288220(0x77c)]=Game_Map[_0x288220(0x93f)]['scrollDown'],Game_Map['prototype'][_0x288220(0x460)]=function(_0x47d906){const _0x2d6a89=_0x288220;if(this[_0x2d6a89(0x58f)]()[_0x2d6a89(0x8b9)]&&$gameScreen[_0x2d6a89(0x72f)]()===0x1){this[_0x2d6a89(0x49d)]=this[_0x2d6a89(0x58f)]()[_0x2d6a89(0x233)];return;}VisuMZ[_0x2d6a89(0x665)][_0x2d6a89(0x77c)][_0x2d6a89(0x6c3)](this,_0x47d906);},VisuMZ[_0x288220(0x665)][_0x288220(0x723)]=Game_Map[_0x288220(0x93f)][_0x288220(0x498)],Game_Map[_0x288220(0x93f)][_0x288220(0x498)]=function(_0x2d06da){const _0x496e11=_0x288220;if(this['centerCameraCheckData']()[_0x496e11(0x4b5)]&&$gameScreen['zoomScale']()===0x1){this[_0x496e11(0x437)]=this[_0x496e11(0x58f)]()[_0x496e11(0x851)];return;}VisuMZ[_0x496e11(0x665)][_0x496e11(0x723)][_0x496e11(0x6c3)](this,_0x2d06da);},VisuMZ[_0x288220(0x665)]['Game_Map_scrollRight']=Game_Map['prototype'][_0x288220(0x6e4)],Game_Map[_0x288220(0x93f)][_0x288220(0x6e4)]=function(_0x3d124b){const _0x36da1a=_0x288220;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x36da1a(0x72f)]()===0x1){this[_0x36da1a(0x437)]=this[_0x36da1a(0x58f)]()[_0x36da1a(0x851)];return;}VisuMZ[_0x36da1a(0x665)][_0x36da1a(0x2c6)]['call'](this,_0x3d124b);},VisuMZ[_0x288220(0x665)]['Game_Map_scrollUp']=Game_Map[_0x288220(0x93f)]['scrollUp'],Game_Map[_0x288220(0x93f)][_0x288220(0x1e2)]=function(_0x497b64){const _0x1da6af=_0x288220;if(this[_0x1da6af(0x58f)]()['centerY']&&$gameScreen[_0x1da6af(0x72f)]()===0x1){this[_0x1da6af(0x49d)]=this[_0x1da6af(0x58f)]()[_0x1da6af(0x233)];return;}VisuMZ[_0x1da6af(0x665)][_0x1da6af(0x446)][_0x1da6af(0x6c3)](this,_0x497b64);},Game_Map['prototype'][_0x288220(0x8a0)]=function(){const _0x248990=_0x288220;this['_tileExtendTerrainTags']={};const _0x478f5c=this['tileset']();if(!_0x478f5c)return{};const _0x5d31a1=_0x478f5c['note']||'',_0x12fa1e=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x20cebd={};const _0x59fc9f=_0x5d31a1[_0x248990(0x54b)](_0x12fa1e);if(_0x59fc9f)for(const _0x57c583 of _0x59fc9f){_0x57c583['match'](_0x12fa1e);const _0x30becf=Number(RegExp['$1'])[_0x248990(0x5d6)](0x1,0x10),_0x2e7439=String(RegExp['$2'])[_0x248990(0x200)](',')[_0x248990(0x972)](_0x3a67eb=>Number(_0x3a67eb)[_0x248990(0x5d6)](0x1,0x7));for(const _0x462343 of _0x2e7439){_0x20cebd[_0x462343]=_0x30becf;}}this['_tileExtendTerrainTags']=_0x20cebd;},Game_Map[_0x288220(0x93f)][_0x288220(0x5a5)]=function(){const _0x29f9db=_0x288220;if(this['_tileExtendTerrainTags']===undefined)this['setupTileExtendTerrainTags']();return this[_0x29f9db(0x288)];},Game_Map[_0x288220(0x93f)]['isTileExtended']=function(_0x2e0f8d){const _0x380a6f=_0x288220;if(_0x2e0f8d>=0x400)return![];const _0x40d393=$gameMap[_0x380a6f(0x5a5)]();if(Object[_0x380a6f(0x916)](_0x40d393)['length']<=0x0)return![];const _0x48a336=this['tilesetFlags'](),_0x3d8c29=_0x48a336[_0x2e0f8d]>>0xc,_0x261213=_0x40d393[_0x3d8c29]||0x0;return _0x261213>0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x5f0)]=Game_Map['prototype']['changeTileset'],Game_Map[_0x288220(0x93f)][_0x288220(0x38a)]=function(_0x2d15e0){const _0x41ae72=_0x288220;VisuMZ['CoreEngine'][_0x41ae72(0x5f0)][_0x41ae72(0x6c3)](this,_0x2d15e0),this[_0x41ae72(0x2a7)](),SceneManager['_scene']['_spriteset'][_0x41ae72(0x508)]();},Game_Map[_0x288220(0x93f)][_0x288220(0x2a7)]=function(){const _0x4f47dd=_0x288220,_0x18f59a=this[_0x4f47dd(0x5a5)]();if(Object[_0x4f47dd(0x916)](_0x18f59a)['length']<=0x0)return;const _0xc1cbf5=SceneManager[_0x4f47dd(0x482)][_0x4f47dd(0x5de)];_0xc1cbf5&&(_0xc1cbf5[_0x4f47dd(0x94c)]&&_0xc1cbf5[_0x4f47dd(0x94c)](),_0xc1cbf5[_0x4f47dd(0x4b6)]&&_0xc1cbf5[_0x4f47dd(0x4b6)]());},VisuMZ[_0x288220(0x665)]['Game_Character_processMoveCommand']=Game_Character[_0x288220(0x93f)][_0x288220(0x532)],Game_Character['prototype'][_0x288220(0x532)]=function(_0x2d2bf5){const _0x14131b=_0x288220;try{VisuMZ['CoreEngine'][_0x14131b(0x2b6)][_0x14131b(0x6c3)](this,_0x2d2bf5);}catch(_0x3a79aa){if($gameTemp['isPlaytest']())console[_0x14131b(0x94a)](_0x3a79aa);}},Game_Player['prototype']['makeEncounterCount']=function(){const _0x52e5ac=_0x288220,_0x5b87da=$gameMap[_0x52e5ac(0x462)]();this[_0x52e5ac(0x3ab)]=Math[_0x52e5ac(0x82f)](_0x5b87da)+Math[_0x52e5ac(0x82f)](_0x5b87da)+this[_0x52e5ac(0x7ac)]();},Game_Player[_0x288220(0x93f)]['encounterStepsMinimum']=function(){const _0x527e27=_0x288220;return $dataMap&&$dataMap['note']&&$dataMap[_0x527e27(0x8d8)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x527e27(0x30a)][_0x527e27(0x23d)][_0x527e27(0x6ae)];},VisuMZ['CoreEngine'][_0x288220(0x346)]=Game_Event['prototype']['isCollidedWithEvents'],Game_Event[_0x288220(0x93f)][_0x288220(0x333)]=function(_0x44d9b8,_0x672692){const _0x5954a6=_0x288220;return this[_0x5954a6(0x4a4)]()?this[_0x5954a6(0x316)](_0x44d9b8,_0x672692):VisuMZ[_0x5954a6(0x665)][_0x5954a6(0x346)]['call'](this,_0x44d9b8,_0x672692);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x2ed5a5=_0x288220;return VisuMZ['CoreEngine']['Settings'][_0x2ed5a5(0x23d)]['SmartEventCollisionPriority'];},Game_Event[_0x288220(0x93f)][_0x288220(0x316)]=function(_0x206d31,_0x538a43){const _0x23c01a=_0x288220;if(!this[_0x23c01a(0x4dc)]())return![];else{const _0x59f674=$gameMap[_0x23c01a(0x673)](_0x206d31,_0x538a43)['filter'](_0x1f8093=>_0x1f8093[_0x23c01a(0x4dc)]());return _0x59f674[_0x23c01a(0x2cd)]>0x0;}},VisuMZ[_0x288220(0x665)]['Game_Interpreter_command105']=Game_Interpreter[_0x288220(0x93f)][_0x288220(0x492)],Game_Interpreter[_0x288220(0x93f)][_0x288220(0x492)]=function(_0x131625){const _0x28fc60=_0x288220,_0x2fede5=this[_0x28fc60(0x47a)]();return _0x2fede5[_0x28fc60(0x54b)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x28fc60(0x860)](_0x2fede5):VisuMZ[_0x28fc60(0x665)][_0x28fc60(0x7a9)][_0x28fc60(0x6c3)](this,_0x131625);},Game_Interpreter[_0x288220(0x93f)][_0x288220(0x47a)]=function(){const _0x430e6b=_0x288220;let _0x3f83e5='',_0x51dc62=this['_index']+0x1;while(this[_0x430e6b(0x31e)][_0x51dc62]&&this[_0x430e6b(0x31e)][_0x51dc62][_0x430e6b(0x1fd)]===0x195){_0x3f83e5+=this[_0x430e6b(0x31e)][_0x51dc62][_0x430e6b(0x7e4)][0x0]+'\x0a',_0x51dc62++;}return _0x3f83e5;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x4eeca1){const _0x7fb751=_0x288220;try{eval(_0x4eeca1);}catch(_0x50d3b7){$gameTemp[_0x7fb751(0x813)]()&&(console[_0x7fb751(0x94a)](_0x7fb751(0x8fe)),console[_0x7fb751(0x94a)](_0x50d3b7));}return!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x56b)]=Game_Interpreter[_0x288220(0x93f)]['command111'],Game_Interpreter['prototype'][_0x288220(0x924)]=function(_0xf419f5){const _0x37b940=_0x288220;try{VisuMZ[_0x37b940(0x665)][_0x37b940(0x56b)][_0x37b940(0x6c3)](this,_0xf419f5);}catch(_0x32a404){$gameTemp[_0x37b940(0x813)]()&&(console['log'](_0x37b940(0x20a)),console[_0x37b940(0x94a)](_0x32a404)),this[_0x37b940(0x5b8)]();}return!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x91e)]=Game_Interpreter[_0x288220(0x93f)][_0x288220(0x590)],Game_Interpreter['prototype'][_0x288220(0x590)]=function(_0x164e5c){const _0x5e52f5=_0x288220;try{VisuMZ['CoreEngine']['Game_Interpreter_command122'][_0x5e52f5(0x6c3)](this,_0x164e5c);}catch(_0x42ed7e){$gameTemp[_0x5e52f5(0x813)]()&&(console['log'](_0x5e52f5(0x266)),console['log'](_0x42ed7e));}return!![];},VisuMZ[_0x288220(0x665)][_0x288220(0x6fc)]=Game_Interpreter['prototype'][_0x288220(0x789)],Game_Interpreter[_0x288220(0x93f)]['command355']=function(){const _0x36f3bd=_0x288220;try{VisuMZ['CoreEngine']['Game_Interpreter_command355']['call'](this);}catch(_0x103744){$gameTemp['isPlaytest']()&&(console[_0x36f3bd(0x94a)](_0x36f3bd(0x4ae)),console[_0x36f3bd(0x94a)](_0x103744));}return!![];},VisuMZ['CoreEngine'][_0x288220(0x725)]=Game_Interpreter[_0x288220(0x93f)][_0x288220(0x4c0)],Game_Interpreter[_0x288220(0x93f)][_0x288220(0x4c0)]=function(_0xe9e0a5){const _0x2796de=_0x288220;return $gameTemp[_0x2796de(0x7d1)](this),VisuMZ[_0x2796de(0x665)][_0x2796de(0x725)][_0x2796de(0x6c3)](this,_0xe9e0a5);},Scene_Base[_0x288220(0x93f)][_0x288220(0x443)]=function(){const _0x335626=_0x288220;return VisuMZ[_0x335626(0x665)][_0x335626(0x30a)]['UI'][_0x335626(0x2f6)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x220)]=function(){const _0x511b60=_0x288220;return VisuMZ['CoreEngine'][_0x511b60(0x30a)]['UI'][_0x511b60(0x1f7)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x62d)]=function(){const _0x378a95=_0x288220;return VisuMZ[_0x378a95(0x665)][_0x378a95(0x30a)]['UI'][_0x378a95(0x4e2)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x8c8)]=function(){const _0x3bf828=_0x288220;return VisuMZ[_0x3bf828(0x665)][_0x3bf828(0x30a)]['UI'][_0x3bf828(0x611)];},Scene_Base[_0x288220(0x93f)]['mainCommandWidth']=function(){const _0x1e642f=_0x288220;return VisuMZ[_0x1e642f(0x665)][_0x1e642f(0x30a)]['UI'][_0x1e642f(0x728)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x770)]=function(){const _0x12efc6=_0x288220;return VisuMZ[_0x12efc6(0x665)][_0x12efc6(0x30a)]['UI'][_0x12efc6(0x82b)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x997)]=function(){const _0x3cce1d=_0x288220;return VisuMZ[_0x3cce1d(0x665)][_0x3cce1d(0x30a)][_0x3cce1d(0x34b)][_0x3cce1d(0x2d1)];},VisuMZ[_0x288220(0x665)][_0x288220(0x564)]=Scene_Base['prototype']['createWindowLayer'],Scene_Base['prototype'][_0x288220(0x98c)]=function(){const _0x5341ea=_0x288220;VisuMZ[_0x5341ea(0x665)]['Scene_Base_createWindowLayer'][_0x5341ea(0x6c3)](this),this[_0x5341ea(0x630)](),this[_0x5341ea(0x634)](),this[_0x5341ea(0x601)]['x']=Math[_0x5341ea(0x3ff)](this[_0x5341ea(0x601)]['x']),this[_0x5341ea(0x601)]['y']=Math[_0x5341ea(0x3ff)](this[_0x5341ea(0x601)]['y']);},Scene_Base['prototype']['createButtonAssistWindow']=function(){},Scene_Base[_0x288220(0x93f)]['createTextPopupWindow']=function(){const _0x57930f=_0x288220;this[_0x57930f(0x217)]=new Window_TextPopup(),this[_0x57930f(0x912)](this[_0x57930f(0x217)]);},$textPopup=function(_0x3cca97){const _0x74b4d1=_0x288220,_0x27f850=SceneManager[_0x74b4d1(0x482)][_0x74b4d1(0x217)];_0x27f850&&_0x27f850['addQueue'](_0x3cca97);},Scene_Base['prototype'][_0x288220(0x518)]=function(){const _0x3d4a26=_0x288220;return TextManager[_0x3d4a26(0x230)](_0x3d4a26(0x7ce),'pagedown');},Scene_Base['prototype'][_0x288220(0x6eb)]=function(){const _0x291cc5=_0x288220;return TextManager['getInputButtonString'](_0x291cc5(0x368));},Scene_Base[_0x288220(0x93f)][_0x288220(0x22b)]=function(){const _0x43c5da=_0x288220;return TextManager['getInputButtonString'](_0x43c5da(0x907));},Scene_Base[_0x288220(0x93f)][_0x288220(0x2eb)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x288220(0x93f)][_0x288220(0x4f4)]=function(){const _0xf62607=_0x288220;return TextManager[_0xf62607(0x81b)](_0xf62607(0x4df));},Scene_Base['prototype'][_0x288220(0x667)]=function(){const _0x48af0e=_0x288220;return this[_0x48af0e(0x95e)]&&this['_pageupButton'][_0x48af0e(0x91f)]?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x288220(0x93f)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x288220(0x93f)][_0x288220(0x334)]=function(){return'';},Scene_Base[_0x288220(0x93f)][_0x288220(0x970)]=function(){const _0x1c8204=_0x288220;return TextManager[_0x1c8204(0x7f6)];},Scene_Base[_0x288220(0x93f)][_0x288220(0x4c1)]=function(){const _0x2c2989=_0x288220;return TextManager[_0x2c2989(0x53d)];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x288220(0x93f)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base['prototype'][_0x288220(0x3d7)]=function(){return 0x0;},Scene_Base[_0x288220(0x93f)][_0x288220(0x6b0)]=function(){return 0x0;},Scene_Base[_0x288220(0x93f)][_0x288220(0x7dc)]=function(){return 0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x59e)]=Scene_Boot[_0x288220(0x93f)][_0x288220(0x382)],Scene_Boot[_0x288220(0x93f)][_0x288220(0x382)]=function(){const _0x46f251=_0x288220;VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']['call'](this),this[_0x46f251(0x56f)]();},Scene_Boot[_0x288220(0x93f)][_0x288220(0x56f)]=function(){const _0x23979c=_0x288220,_0x40ecd2=[_0x23979c(0x45f),'battlebacks1',_0x23979c(0x49e),_0x23979c(0x6e0),_0x23979c(0x5f6),_0x23979c(0x731),'parallaxes',_0x23979c(0x5d8),_0x23979c(0x787),_0x23979c(0x63a),_0x23979c(0x287),'tilesets',_0x23979c(0x8a7),_0x23979c(0x7ca)];for(const _0x226cab of _0x40ecd2){const _0x1bbe7b=VisuMZ['CoreEngine'][_0x23979c(0x30a)][_0x23979c(0x8fd)][_0x226cab],_0x1643ff=_0x23979c(0x90e)[_0x23979c(0x857)](_0x226cab);for(const _0x417a4a of _0x1bbe7b){ImageManager[_0x23979c(0x365)](_0x1643ff,_0x417a4a);}}},VisuMZ[_0x288220(0x665)][_0x288220(0x359)]=Scene_Boot[_0x288220(0x93f)][_0x288220(0x4dd)],Scene_Boot[_0x288220(0x93f)][_0x288220(0x4dd)]=function(){const _0x3e8bdd=_0x288220;Utils[_0x3e8bdd(0x783)]('test')&&VisuMZ[_0x3e8bdd(0x665)][_0x3e8bdd(0x30a)][_0x3e8bdd(0x23d)]['NewGameBoot']?this[_0x3e8bdd(0x495)]():VisuMZ[_0x3e8bdd(0x665)][_0x3e8bdd(0x359)][_0x3e8bdd(0x6c3)](this);},Scene_Boot[_0x288220(0x93f)][_0x288220(0x495)]=function(){const _0x47e56f=_0x288220;this[_0x47e56f(0x844)](),DataManager[_0x47e56f(0x472)](),SceneManager[_0x47e56f(0x459)](Scene_Map);},Scene_Boot[_0x288220(0x93f)][_0x288220(0x529)]=function(){const _0x4ffef2=_0x288220,_0x181716=$dataSystem[_0x4ffef2(0x902)][_0x4ffef2(0x79a)],_0x5cd7d2=$dataSystem[_0x4ffef2(0x902)]['uiAreaHeight'],_0x1bbd36=VisuMZ[_0x4ffef2(0x665)][_0x4ffef2(0x30a)]['UI'][_0x4ffef2(0x8f3)];Graphics[_0x4ffef2(0x878)]=_0x181716-_0x1bbd36*0x2,Graphics[_0x4ffef2(0x415)]=_0x5cd7d2-_0x1bbd36*0x2,this[_0x4ffef2(0x41b)]();},VisuMZ[_0x288220(0x665)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x288220(0x93f)][_0x288220(0x78d)],Scene_Boot[_0x288220(0x93f)][_0x288220(0x78d)]=function(){const _0x4f6cc7=_0x288220;this[_0x4f6cc7(0x6ea)]()?this[_0x4f6cc7(0x8d3)]():VisuMZ[_0x4f6cc7(0x665)][_0x4f6cc7(0x249)]['call'](this);},Scene_Boot['prototype'][_0x288220(0x6ea)]=function(){const _0x4ea808=_0x288220;if(Scene_Title[_0x4ea808(0x6a1)]==='')return![];if(Scene_Title[_0x4ea808(0x6a1)]===_0x4ea808(0x642))return![];if(Scene_Title[_0x4ea808(0x8ab)]==='')return![];if(Scene_Title[_0x4ea808(0x8ab)]==='0.00')return![];return!![];},Scene_Boot[_0x288220(0x93f)][_0x288220(0x8d3)]=function(){const _0x271c70=_0x288220,_0x5a198a=$dataSystem[_0x271c70(0x8c5)],_0x2175e1=Scene_Title[_0x271c70(0x6a1)]||'',_0x1e4368=Scene_Title[_0x271c70(0x8ab)]||'',_0x44267c=VisuMZ['CoreEngine'][_0x271c70(0x30a)]['MenuLayout'][_0x271c70(0x48e)][_0x271c70(0x257)],_0x4c7de5=_0x44267c[_0x271c70(0x857)](_0x5a198a,_0x2175e1,_0x1e4368);document[_0x271c70(0x76d)]=_0x4c7de5;},Scene_Boot[_0x288220(0x93f)]['determineSideButtonLayoutValid']=function(){const _0x1267b3=_0x288220;if(VisuMZ[_0x1267b3(0x665)][_0x1267b3(0x30a)]['UI'][_0x1267b3(0x1e5)]){const _0x4c16bb=Graphics['width']-Graphics[_0x1267b3(0x878)]-VisuMZ[_0x1267b3(0x665)][_0x1267b3(0x30a)]['UI'][_0x1267b3(0x8f3)]*0x2,_0x29f2ac=Sprite_Button[_0x1267b3(0x93f)][_0x1267b3(0x8ae)]['call'](this)*0x4;if(_0x4c16bb>=_0x29f2ac)SceneManager[_0x1267b3(0x7c7)](!![]);}},Scene_Title[_0x288220(0x6a1)]=VisuMZ[_0x288220(0x665)]['Settings'][_0x288220(0x418)][_0x288220(0x48e)][_0x288220(0x642)],Scene_Title[_0x288220(0x8ab)]=VisuMZ['CoreEngine'][_0x288220(0x30a)][_0x288220(0x418)][_0x288220(0x48e)][_0x288220(0x324)],Scene_Title[_0x288220(0x66a)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x4ac)],VisuMZ[_0x288220(0x665)][_0x288220(0x958)]=Scene_Title[_0x288220(0x93f)]['drawGameTitle'],Scene_Title[_0x288220(0x93f)]['drawGameTitle']=function(){const _0x1fdcf3=_0x288220;VisuMZ['CoreEngine']['Settings'][_0x1fdcf3(0x418)]['Title']['drawGameTitle'][_0x1fdcf3(0x6c3)](this);if(Scene_Title['subtitle']!==''&&Scene_Title['subtitle']!==_0x1fdcf3(0x642))this['drawGameSubtitle']();if(Scene_Title[_0x1fdcf3(0x8ab)]!==''&&Scene_Title['version']!=='0.00')this['drawGameVersion']();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x2fc86c=_0x288220;VisuMZ[_0x2fc86c(0x665)]['Settings']['MenuLayout'][_0x2fc86c(0x48e)][_0x2fc86c(0x5e7)][_0x2fc86c(0x6c3)](this);},Scene_Title[_0x288220(0x93f)][_0x288220(0x53e)]=function(){const _0x49c83b=_0x288220;VisuMZ['CoreEngine'][_0x49c83b(0x30a)][_0x49c83b(0x418)][_0x49c83b(0x48e)][_0x49c83b(0x53e)]['call'](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x29df1d=_0x288220;this[_0x29df1d(0x1ee)]();const _0x35937b=$dataSystem['titleCommandWindow'][_0x29df1d(0x67d)],_0x1ee703=this['commandWindowRect']();this[_0x29df1d(0x55b)]=new Window_TitleCommand(_0x1ee703),this[_0x29df1d(0x55b)][_0x29df1d(0x8c1)](_0x35937b);const _0x300fe5=this['commandWindowRect']();this[_0x29df1d(0x55b)]['move'](_0x300fe5['x'],_0x300fe5['y'],_0x300fe5['width'],_0x300fe5[_0x29df1d(0x4b9)]),this['_commandWindow'][_0x29df1d(0x903)](),this[_0x29df1d(0x55b)][_0x29df1d(0x80c)](),this[_0x29df1d(0x55b)][_0x29df1d(0x7e5)](),this[_0x29df1d(0x46f)](this[_0x29df1d(0x55b)]);},Scene_Title[_0x288220(0x93f)][_0x288220(0x8c2)]=function(){const _0x28dd8a=_0x288220;return this[_0x28dd8a(0x55b)]?this[_0x28dd8a(0x55b)][_0x28dd8a(0x599)]():VisuMZ[_0x28dd8a(0x665)][_0x28dd8a(0x30a)][_0x28dd8a(0x7fb)][_0x28dd8a(0x2cd)];},Scene_Title[_0x288220(0x93f)]['commandWindowRect']=function(){const _0x4d8c82=_0x288220;return VisuMZ[_0x4d8c82(0x665)]['Settings'][_0x4d8c82(0x418)][_0x4d8c82(0x48e)][_0x4d8c82(0x474)]['call'](this);},Scene_Title[_0x288220(0x93f)][_0x288220(0x1ee)]=function(){const _0x3d2c83=_0x288220;for(const _0x54a549 of Scene_Title[_0x3d2c83(0x66a)]){const _0x3265ba=new Sprite_TitlePictureButton(_0x54a549);this['addChild'](_0x3265ba);}},VisuMZ['CoreEngine']['Scene_Map_initialize']=Scene_Map[_0x288220(0x93f)][_0x288220(0x501)],Scene_Map[_0x288220(0x93f)][_0x288220(0x501)]=function(){const _0x423f50=_0x288220;VisuMZ[_0x423f50(0x665)][_0x423f50(0x557)][_0x423f50(0x6c3)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x423f50(0x6e2)]();},VisuMZ[_0x288220(0x665)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x288220(0x93f)][_0x288220(0x503)],Scene_Map[_0x288220(0x93f)][_0x288220(0x503)]=function(){const _0x414afc=_0x288220;VisuMZ[_0x414afc(0x665)][_0x414afc(0x710)][_0x414afc(0x6c3)](this),$gameTemp[_0x414afc(0x4bc)]&&!$gameMessage[_0x414afc(0x521)]()&&(this[_0x414afc(0x942)](),SceneManager['updateEffekseer']());},Scene_Map[_0x288220(0x93f)][_0x288220(0x791)]=function(){const _0x5bbb8c=_0x288220;Scene_Message['prototype'][_0x5bbb8c(0x791)][_0x5bbb8c(0x6c3)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x5bbb8c(0x5de)][_0x5bbb8c(0x508)](),this[_0x5bbb8c(0x4b1)][_0x5bbb8c(0x6d0)](),this[_0x5bbb8c(0x601)][_0x5bbb8c(0x91f)]=![],SceneManager[_0x5bbb8c(0x510)]()),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x288220(0x65e)]=Scene_Map[_0x288220(0x93f)]['createMenuButton'],Scene_Map[_0x288220(0x93f)][_0x288220(0x6a9)]=function(){const _0x572f72=_0x288220;VisuMZ[_0x572f72(0x665)][_0x572f72(0x65e)][_0x572f72(0x6c3)](this),SceneManager['isSideButtonLayout']()&&this[_0x572f72(0x906)]();},Scene_Map[_0x288220(0x93f)][_0x288220(0x906)]=function(){const _0x49e494=_0x288220;this[_0x49e494(0x27e)]['x']=Graphics[_0x49e494(0x878)]+0x4;},VisuMZ[_0x288220(0x665)][_0x288220(0x55e)]=Scene_Map[_0x288220(0x93f)]['updateScene'],Scene_Map[_0x288220(0x93f)][_0x288220(0x1e0)]=function(){const _0x2dd143=_0x288220;VisuMZ[_0x2dd143(0x665)][_0x2dd143(0x55e)][_0x2dd143(0x6c3)](this),this[_0x2dd143(0x41a)]();},Scene_Map[_0x288220(0x93f)][_0x288220(0x41a)]=function(){const _0x4d7b11=_0x288220;Input[_0x4d7b11(0x71a)](_0x4d7b11(0x2fa))&&(ConfigManager[_0x4d7b11(0x25b)]=!ConfigManager[_0x4d7b11(0x25b)],ConfigManager['save']());},VisuMZ[_0x288220(0x665)][_0x288220(0x47d)]=Scene_Map[_0x288220(0x93f)]['updateMain'],Scene_Map[_0x288220(0x93f)][_0x288220(0x942)]=function(){const _0x18ff8e=_0x288220;VisuMZ[_0x18ff8e(0x665)][_0x18ff8e(0x47d)][_0x18ff8e(0x6c3)](this),this[_0x18ff8e(0x777)]();},Scene_Map['prototype'][_0x288220(0x6e2)]=function(){const _0x2c82be=_0x288220;this[_0x2c82be(0x260)]=[];},Scene_Map[_0x288220(0x93f)][_0x288220(0x777)]=function(){const _0x5000f0=_0x288220;if(!this[_0x5000f0(0x260)])return;for(const _0xaae947 of this[_0x5000f0(0x260)]){_0xaae947&&_0xaae947['update']();}},Scene_Map['prototype']['playOnceParallelInterpreter']=function(_0x584ae6,_0x2ea891){const _0x1a15e1=_0x288220,_0x472749=$dataCommonEvents[_0x584ae6];if(!_0x472749)return;const _0x1e3836=new Game_OnceParallelInterpreter();this[_0x1a15e1(0x587)](_0x1e3836),_0x1e3836[_0x1a15e1(0x834)](_0x584ae6),_0x1e3836[_0x1a15e1(0x3b1)](_0x2ea891);},Scene_Map[_0x288220(0x93f)]['addOnceParallelInterpreter']=function(_0x50784f){const _0x356e60=_0x288220;this[_0x356e60(0x260)]=this[_0x356e60(0x260)]||[],this[_0x356e60(0x260)][_0x356e60(0x597)](_0x50784f);},Scene_Map['prototype'][_0x288220(0x761)]=function(_0xf0d1e9){const _0x190f21=_0x288220;this[_0x190f21(0x260)]=this[_0x190f21(0x260)]||[],this[_0x190f21(0x260)]['remove'](_0xf0d1e9);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x288220(0x93f)]=Object[_0x288220(0x898)](Game_Interpreter[_0x288220(0x93f)]),Game_OnceParallelInterpreter['prototype'][_0x288220(0x5e4)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype']['setCommonEvent']=function(_0x385f10){const _0xe03618=_0x288220,_0x44186c=$dataCommonEvents[_0x385f10];_0x44186c?this[_0xe03618(0x540)](_0x44186c[_0xe03618(0x74d)],0x0):this[_0xe03618(0x791)]();},Game_OnceParallelInterpreter[_0x288220(0x93f)][_0x288220(0x3b1)]=function(_0x4d5f1b){const _0x376133=_0x288220;this[_0x376133(0x27f)]=_0x4d5f1b||0x0;},Game_OnceParallelInterpreter[_0x288220(0x93f)][_0x288220(0x791)]=function(){const _0xec758a=_0x288220;if(!SceneManager[_0xec758a(0x875)]())return;SceneManager[_0xec758a(0x482)][_0xec758a(0x761)](this),Game_Interpreter['prototype'][_0xec758a(0x791)][_0xec758a(0x6c3)](this);},VisuMZ[_0x288220(0x665)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x38e)],Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x38e)]=function(){const _0x4b0d82=_0x288220;let _0x36630e=0x0;return SceneManager[_0x4b0d82(0x43a)]()?_0x36630e=this[_0x4b0d82(0x8c9)]():_0x36630e=VisuMZ[_0x4b0d82(0x665)]['Scene_MenuBase_helpAreaTop']['call'](this),_0x36630e;},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x8c9)]=function(){const _0xa0f9fe=_0x288220;return this[_0xa0f9fe(0x220)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x836)]=Scene_MenuBase[_0x288220(0x93f)]['mainAreaTop'],Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x3fc)]=function(){const _0x2c6c19=_0x288220;return SceneManager['areButtonsOutsideMainUI']()?this[_0x2c6c19(0x22c)]():VisuMZ[_0x2c6c19(0x665)][_0x2c6c19(0x836)][_0x2c6c19(0x6c3)](this);},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x22c)]=function(){const _0xc889fc=_0x288220;if(!this[_0xc889fc(0x220)]())return this[_0xc889fc(0x32b)]();else return this['isMenuButtonAssistEnabled']()&&this[_0xc889fc(0x8dc)]()===_0xc889fc(0x265)?Window_ButtonAssist['prototype'][_0xc889fc(0x91b)]():0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x80a)]=Scene_MenuBase['prototype'][_0x288220(0x214)],Scene_MenuBase['prototype'][_0x288220(0x214)]=function(){const _0x69b088=_0x288220;let _0x47336b=0x0;return SceneManager[_0x69b088(0x43a)]()?_0x47336b=this[_0x69b088(0x5a4)]():_0x47336b=VisuMZ[_0x69b088(0x665)]['Scene_MenuBase_mainAreaHeight']['call'](this),this['isMenuButtonAssistEnabled']()&&this[_0x69b088(0x8dc)]()!=='button'&&(_0x47336b-=Window_ButtonAssist[_0x69b088(0x93f)]['lineHeight']()),_0x47336b;},Scene_MenuBase['prototype'][_0x288220(0x5a4)]=function(){const _0x5e3fa7=_0x288220;return Graphics[_0x5e3fa7(0x415)]-this[_0x5e3fa7(0x315)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x379)]=Scene_MenuBase[_0x288220(0x93f)]['createBackground'],Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x3ee)]=function(){const _0x45c112=_0x288220,_0x3d130d=VisuMZ['CoreEngine'][_0x45c112(0x30a)][_0x45c112(0x5cb)][_0x45c112(0x402)]??0x8;this[_0x45c112(0x530)]=new PIXI[(_0x45c112(0x86b))][(_0x45c112(0x3bd))](_0x3d130d),this[_0x45c112(0x3ed)]=new Sprite(),this[_0x45c112(0x3ed)][_0x45c112(0x421)]=SceneManager[_0x45c112(0x8cb)](),this[_0x45c112(0x3ed)][_0x45c112(0x86b)]=[this[_0x45c112(0x530)]],this['addChild'](this['_backgroundSprite']),this[_0x45c112(0x8ee)](0xc0),this[_0x45c112(0x8ee)](this[_0x45c112(0x97f)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x97f)]=function(){const _0x8a6e2=_0x288220,_0x383600=String(this[_0x8a6e2(0x5e4)][_0x8a6e2(0x392)]),_0x27d207=this[_0x8a6e2(0x38f)](_0x383600);return _0x27d207?_0x27d207[_0x8a6e2(0x354)]:0xc0;},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x560)]=function(){const _0x1675bf=_0x288220,_0x3a1206=String(this[_0x1675bf(0x5e4)]['name']),_0x205da9=this[_0x1675bf(0x38f)](_0x3a1206);_0x205da9&&(_0x205da9['BgFilename1']!==''||_0x205da9[_0x1675bf(0x832)]!=='')&&(this[_0x1675bf(0x74c)]=new Sprite(ImageManager[_0x1675bf(0x4d7)](_0x205da9['BgFilename1'])),this[_0x1675bf(0x894)]=new Sprite(ImageManager[_0x1675bf(0x724)](_0x205da9[_0x1675bf(0x832)])),this[_0x1675bf(0x912)](this['_backSprite1']),this[_0x1675bf(0x912)](this[_0x1675bf(0x894)]),this['_backSprite1'][_0x1675bf(0x421)][_0x1675bf(0x400)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x1675bf(0x894)][_0x1675bf(0x421)][_0x1675bf(0x400)](this[_0x1675bf(0x951)]['bind'](this,this['_backSprite2'])));},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x38f)]=function(_0x3d201e){const _0x331a72=_0x288220;return VisuMZ[_0x331a72(0x665)][_0x331a72(0x30a)]['MenuBg'][_0x3d201e]||VisuMZ[_0x331a72(0x665)][_0x331a72(0x30a)][_0x331a72(0x5cb)]['Scene_Unlisted'];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x2336c0){const _0x42a23d=_0x288220;this[_0x42a23d(0x83b)](_0x2336c0),this[_0x42a23d(0x69f)](_0x2336c0);},VisuMZ[_0x288220(0x665)][_0x288220(0x3d8)]=Scene_MenuBase[_0x288220(0x93f)]['createCancelButton'],Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x670)]=function(){const _0x7bfe50=_0x288220;VisuMZ[_0x7bfe50(0x665)]['Scene_MenuBase_createCancelButton'][_0x7bfe50(0x6c3)](this),SceneManager['isSideButtonLayout']()&&this[_0x7bfe50(0x67a)]();},Scene_MenuBase[_0x288220(0x93f)]['moveCancelButtonSideButtonLayout']=function(){const _0x3c823c=_0x288220;this[_0x3c823c(0x730)]['x']=Graphics[_0x3c823c(0x878)]+0x4;},VisuMZ[_0x288220(0x665)][_0x288220(0x697)]=Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x89e)],Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x89e)]=function(){const _0x1d9e5a=_0x288220;VisuMZ['CoreEngine'][_0x1d9e5a(0x697)][_0x1d9e5a(0x6c3)](this),SceneManager[_0x1d9e5a(0x251)]()&&this[_0x1d9e5a(0x3cb)]();},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x3cb)]=function(){const _0x1e64ea=_0x288220;this[_0x1e64ea(0x95e)]['x']=-0x1*(this['_pageupButton']['width']+this['_pagedownButton'][_0x1e64ea(0x426)]+0x8),this[_0x1e64ea(0x499)]['x']=-0x1*(this[_0x1e64ea(0x499)]['width']+0x4);},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x598)]=function(){const _0x2d3e6a=_0x288220;return VisuMZ[_0x2d3e6a(0x665)][_0x2d3e6a(0x30a)][_0x2d3e6a(0x5ad)]['Enable'];},Scene_MenuBase['prototype'][_0x288220(0x8dc)]=function(){const _0x55a598=_0x288220;return SceneManager[_0x55a598(0x251)]()||SceneManager[_0x55a598(0x6b1)]()?VisuMZ[_0x55a598(0x665)][_0x55a598(0x30a)][_0x55a598(0x5ad)][_0x55a598(0x356)]:_0x55a598(0x852);},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x630)]=function(){const _0x541018=_0x288220;if(!this[_0x541018(0x598)]())return;const _0x58d9b0=this[_0x541018(0x858)]();this[_0x541018(0x525)]=new Window_ButtonAssist(_0x58d9b0),this['addWindow'](this[_0x541018(0x525)]);},Scene_MenuBase[_0x288220(0x93f)]['buttonAssistWindowRect']=function(){const _0x309d2c=_0x288220;return this[_0x309d2c(0x8dc)]()===_0x309d2c(0x852)?this[_0x309d2c(0x931)]():this[_0x309d2c(0x1cc)]();},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x931)]=function(){const _0x9ea512=_0x288220,_0x4b3a5d=ConfigManager[_0x9ea512(0x4e1)]?(Sprite_Button['prototype']['blockWidth']()+0x6)*0x2:0x0,_0x3b32f5=this[_0x9ea512(0x6b6)](),_0x1c8db2=Graphics[_0x9ea512(0x878)]-_0x4b3a5d*0x2,_0x66da0f=this[_0x9ea512(0x770)]();return new Rectangle(_0x4b3a5d,_0x3b32f5,_0x1c8db2,_0x66da0f);},Scene_MenuBase[_0x288220(0x93f)][_0x288220(0x1cc)]=function(){const _0x5a14a1=_0x288220,_0x4b92ef=Graphics[_0x5a14a1(0x878)],_0x216abd=Window_ButtonAssist['prototype'][_0x5a14a1(0x91b)](),_0x5e4aec=0x0;let _0x8d3ca4=0x0;return this[_0x5a14a1(0x8dc)]()===_0x5a14a1(0x265)?_0x8d3ca4=0x0:_0x8d3ca4=Graphics[_0x5a14a1(0x415)]-_0x216abd,new Rectangle(_0x5e4aec,_0x8d3ca4,_0x4b92ef,_0x216abd);},Scene_Menu[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x418)][_0x288220(0x240)],VisuMZ['CoreEngine'][_0x288220(0x55a)]=Scene_Menu[_0x288220(0x93f)][_0x288220(0x898)],Scene_Menu[_0x288220(0x93f)]['create']=function(){const _0x1787fa=_0x288220;VisuMZ[_0x1787fa(0x665)][_0x1787fa(0x55a)][_0x1787fa(0x6c3)](this),this[_0x1787fa(0x3b5)]();},Scene_Menu['prototype'][_0x288220(0x3b5)]=function(){const _0x14977c=_0x288220;this['_commandWindow']&&this[_0x14977c(0x55b)]['setBackgroundType'](Scene_Menu[_0x14977c(0x3a7)][_0x14977c(0x6da)]),this['_goldWindow']&&this[_0x14977c(0x2fb)][_0x14977c(0x8c1)](Scene_Menu['layoutSettings'][_0x14977c(0x607)]),this[_0x14977c(0x228)]&&this[_0x14977c(0x228)][_0x14977c(0x8c1)](Scene_Menu[_0x14977c(0x3a7)]['StatusBgType']);},Scene_Menu['prototype'][_0x288220(0x3ef)]=function(){const _0x26bf3d=_0x288220;return Scene_Menu[_0x26bf3d(0x3a7)]['CommandRect'][_0x26bf3d(0x6c3)](this);},Scene_Menu['prototype']['goldWindowRect']=function(){const _0x43de38=_0x288220;return Scene_Menu[_0x43de38(0x3a7)][_0x43de38(0x51e)]['call'](this);},Scene_Menu[_0x288220(0x93f)][_0x288220(0x486)]=function(){const _0x2a01b7=_0x288220;return Scene_Menu[_0x2a01b7(0x3a7)][_0x2a01b7(0x790)][_0x2a01b7(0x6c3)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x418)][_0x288220(0x71e)],VisuMZ[_0x288220(0x665)]['Scene_Item_create']=Scene_Item['prototype'][_0x288220(0x898)],Scene_Item[_0x288220(0x93f)]['create']=function(){const _0x5375d0=_0x288220;VisuMZ[_0x5375d0(0x665)]['Scene_Item_create'][_0x5375d0(0x6c3)](this),this[_0x5375d0(0x3b5)]();},Scene_Item[_0x288220(0x93f)]['setCoreEngineUpdateWindowBg']=function(){const _0x73ed7e=_0x288220;this[_0x73ed7e(0x8f6)]&&this['_helpWindow']['setBackgroundType'](Scene_Item[_0x73ed7e(0x3a7)]['HelpBgType']),this[_0x73ed7e(0x5b5)]&&this[_0x73ed7e(0x5b5)][_0x73ed7e(0x8c1)](Scene_Item[_0x73ed7e(0x3a7)][_0x73ed7e(0x738)]),this[_0x73ed7e(0x90f)]&&this[_0x73ed7e(0x90f)]['setBackgroundType'](Scene_Item[_0x73ed7e(0x3a7)][_0x73ed7e(0x617)]),this['_actorWindow']&&this[_0x73ed7e(0x7cc)][_0x73ed7e(0x8c1)](Scene_Item[_0x73ed7e(0x3a7)][_0x73ed7e(0x466)]);},Scene_Item[_0x288220(0x93f)][_0x288220(0x2e5)]=function(){const _0x38915c=_0x288220;return Scene_Item[_0x38915c(0x3a7)]['HelpRect']['call'](this);},Scene_Item[_0x288220(0x93f)][_0x288220(0x6ce)]=function(){const _0x118637=_0x288220;return Scene_Item[_0x118637(0x3a7)][_0x118637(0x4b2)][_0x118637(0x6c3)](this);},Scene_Item[_0x288220(0x93f)][_0x288220(0x926)]=function(){const _0x11ee9c=_0x288220;return Scene_Item[_0x11ee9c(0x3a7)][_0x11ee9c(0x23e)]['call'](this);},Scene_Item[_0x288220(0x93f)][_0x288220(0x829)]=function(){const _0x20e0ab=_0x288220;return Scene_Item[_0x20e0ab(0x3a7)][_0x20e0ab(0x242)][_0x20e0ab(0x6c3)](this);},Scene_Skill[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x418)][_0x288220(0x4aa)],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill['prototype'][_0x288220(0x898)],Scene_Skill[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x36ffd5=_0x288220;VisuMZ[_0x36ffd5(0x665)][_0x36ffd5(0x873)][_0x36ffd5(0x6c3)](this),this[_0x36ffd5(0x3b5)]();},Scene_Skill[_0x288220(0x93f)][_0x288220(0x3b5)]=function(){const _0x22dfaf=_0x288220;this[_0x22dfaf(0x8f6)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x22dfaf(0x3a7)][_0x22dfaf(0x746)]),this[_0x22dfaf(0x5c8)]&&this[_0x22dfaf(0x5c8)][_0x22dfaf(0x8c1)](Scene_Skill[_0x22dfaf(0x3a7)][_0x22dfaf(0x827)]),this[_0x22dfaf(0x228)]&&this['_statusWindow'][_0x22dfaf(0x8c1)](Scene_Skill[_0x22dfaf(0x3a7)][_0x22dfaf(0x298)]),this[_0x22dfaf(0x90f)]&&this['_itemWindow'][_0x22dfaf(0x8c1)](Scene_Skill[_0x22dfaf(0x3a7)][_0x22dfaf(0x617)]),this[_0x22dfaf(0x7cc)]&&this[_0x22dfaf(0x7cc)][_0x22dfaf(0x8c1)](Scene_Skill[_0x22dfaf(0x3a7)][_0x22dfaf(0x466)]);},Scene_Skill[_0x288220(0x93f)][_0x288220(0x2e5)]=function(){const _0x3ff91d=_0x288220;return Scene_Skill[_0x3ff91d(0x3a7)][_0x3ff91d(0x7d3)][_0x3ff91d(0x6c3)](this);},Scene_Skill[_0x288220(0x93f)]['skillTypeWindowRect']=function(){const _0x28b97f=_0x288220;return Scene_Skill['layoutSettings'][_0x28b97f(0x651)][_0x28b97f(0x6c3)](this);},Scene_Skill[_0x288220(0x93f)][_0x288220(0x486)]=function(){const _0xfa52d7=_0x288220;return Scene_Skill[_0xfa52d7(0x3a7)][_0xfa52d7(0x790)]['call'](this);},Scene_Skill[_0x288220(0x93f)][_0x288220(0x926)]=function(){const _0x23c202=_0x288220;return Scene_Skill[_0x23c202(0x3a7)][_0x23c202(0x23e)]['call'](this);},Scene_Skill['prototype'][_0x288220(0x829)]=function(){const _0x301bc0=_0x288220;return Scene_Skill[_0x301bc0(0x3a7)][_0x301bc0(0x242)][_0x301bc0(0x6c3)](this);},Scene_Equip[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['MenuLayout'][_0x288220(0x6b7)],VisuMZ['CoreEngine'][_0x288220(0x2f3)]=Scene_Equip[_0x288220(0x93f)][_0x288220(0x898)],Scene_Equip[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x8cd191=_0x288220;VisuMZ['CoreEngine'][_0x8cd191(0x2f3)][_0x8cd191(0x6c3)](this),this[_0x8cd191(0x3b5)]();},Scene_Equip['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x5cfac3=_0x288220;this[_0x5cfac3(0x8f6)]&&this[_0x5cfac3(0x8f6)][_0x5cfac3(0x8c1)](Scene_Equip[_0x5cfac3(0x3a7)]['HelpBgType']),this[_0x5cfac3(0x228)]&&this[_0x5cfac3(0x228)][_0x5cfac3(0x8c1)](Scene_Equip[_0x5cfac3(0x3a7)][_0x5cfac3(0x298)]),this['_commandWindow']&&this[_0x5cfac3(0x55b)][_0x5cfac3(0x8c1)](Scene_Equip[_0x5cfac3(0x3a7)][_0x5cfac3(0x6da)]),this[_0x5cfac3(0x256)]&&this[_0x5cfac3(0x256)][_0x5cfac3(0x8c1)](Scene_Equip[_0x5cfac3(0x3a7)][_0x5cfac3(0x92a)]),this[_0x5cfac3(0x90f)]&&this[_0x5cfac3(0x90f)][_0x5cfac3(0x8c1)](Scene_Equip[_0x5cfac3(0x3a7)][_0x5cfac3(0x617)]);},Scene_Equip[_0x288220(0x93f)]['helpWindowRect']=function(){const _0x4d1356=_0x288220;return Scene_Equip[_0x4d1356(0x3a7)]['HelpRect']['call'](this);},Scene_Equip['prototype'][_0x288220(0x486)]=function(){const _0x178523=_0x288220;return Scene_Equip[_0x178523(0x3a7)][_0x178523(0x790)]['call'](this);},Scene_Equip[_0x288220(0x93f)][_0x288220(0x3ef)]=function(){const _0x73369=_0x288220;return Scene_Equip[_0x73369(0x3a7)]['CommandRect'][_0x73369(0x6c3)](this);},Scene_Equip[_0x288220(0x93f)][_0x288220(0x397)]=function(){const _0xb8f622=_0x288220;return Scene_Equip['layoutSettings'][_0xb8f622(0x6f0)][_0xb8f622(0x6c3)](this);},Scene_Equip[_0x288220(0x93f)][_0x288220(0x926)]=function(){const _0xa2d41e=_0x288220;return Scene_Equip[_0xa2d41e(0x3a7)][_0xa2d41e(0x23e)][_0xa2d41e(0x6c3)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x418)]['StatusMenu'],VisuMZ['CoreEngine'][_0x288220(0x39a)]=Scene_Status[_0x288220(0x93f)][_0x288220(0x898)],Scene_Status[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x576f9e=_0x288220;VisuMZ['CoreEngine'][_0x576f9e(0x39a)]['call'](this),this[_0x576f9e(0x3b5)]();},Scene_Status[_0x288220(0x93f)]['setCoreEngineUpdateWindowBg']=function(){const _0x56867d=_0x288220;this[_0x56867d(0x5ca)]&&this[_0x56867d(0x5ca)][_0x56867d(0x8c1)](Scene_Status['layoutSettings']['ProfileBgType']),this[_0x56867d(0x228)]&&this[_0x56867d(0x228)]['setBackgroundType'](Scene_Status[_0x56867d(0x3a7)][_0x56867d(0x298)]),this['_statusParamsWindow']&&this[_0x56867d(0x7b0)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x56867d(0x304)]),this[_0x56867d(0x318)]&&this[_0x56867d(0x318)][_0x56867d(0x8c1)](Scene_Status[_0x56867d(0x3a7)][_0x56867d(0x330)]);},Scene_Status[_0x288220(0x93f)]['profileWindowRect']=function(){const _0x301a4f=_0x288220;return Scene_Status[_0x301a4f(0x3a7)][_0x301a4f(0x874)]['call'](this);},Scene_Status['prototype'][_0x288220(0x486)]=function(){const _0x4dfbf4=_0x288220;return Scene_Status[_0x4dfbf4(0x3a7)][_0x4dfbf4(0x790)][_0x4dfbf4(0x6c3)](this);},Scene_Status[_0x288220(0x93f)]['statusParamsWindowRect']=function(){const _0x7ae341=_0x288220;return Scene_Status[_0x7ae341(0x3a7)][_0x7ae341(0x8f7)][_0x7ae341(0x6c3)](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0x41b346=_0x288220;return Scene_Status[_0x41b346(0x3a7)][_0x41b346(0x938)][_0x41b346(0x6c3)](this);},Scene_Options[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)]['Settings'][_0x288220(0x418)]['OptionsMenu'],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x288220(0x93f)][_0x288220(0x898)],Scene_Options['prototype'][_0x288220(0x898)]=function(){const _0xf2130d=_0x288220;VisuMZ[_0xf2130d(0x665)][_0xf2130d(0x385)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x288220(0x93f)][_0x288220(0x3b5)]=function(){const _0x1a4aaa=_0x288220;this[_0x1a4aaa(0x76f)]&&this[_0x1a4aaa(0x76f)][_0x1a4aaa(0x8c1)](Scene_Options['layoutSettings'][_0x1a4aaa(0x36e)]);},Scene_Options['prototype'][_0x288220(0x420)]=function(){const _0x17d9f4=_0x288220;return Scene_Options[_0x17d9f4(0x3a7)][_0x17d9f4(0x3d1)]['call'](this);},Scene_Save['layoutSettings']=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x418)][_0x288220(0x20d)],Scene_Save[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x52fc81=_0x288220;Scene_File[_0x52fc81(0x93f)][_0x52fc81(0x898)][_0x52fc81(0x6c3)](this),this[_0x52fc81(0x3b5)]();},Scene_Save[_0x288220(0x93f)]['setCoreEngineUpdateWindowBg']=function(){const _0x1d586b=_0x288220;this[_0x1d586b(0x8f6)]&&this[_0x1d586b(0x8f6)]['setBackgroundType'](Scene_Save[_0x1d586b(0x3a7)][_0x1d586b(0x746)]),this[_0x1d586b(0x7a8)]&&this[_0x1d586b(0x7a8)][_0x1d586b(0x8c1)](Scene_Save[_0x1d586b(0x3a7)]['ListBgType']);},Scene_Save[_0x288220(0x93f)][_0x288220(0x2e5)]=function(){const _0x43115b=_0x288220;return Scene_Save['layoutSettings'][_0x43115b(0x7d3)]['call'](this);},Scene_Save[_0x288220(0x93f)]['listWindowRect']=function(){const _0x2c0bed=_0x288220;return Scene_Save['layoutSettings'][_0x2c0bed(0x60d)]['call'](this);},Scene_Load[_0x288220(0x3a7)]=VisuMZ['CoreEngine'][_0x288220(0x30a)]['MenuLayout'][_0x288220(0x982)],Scene_Load[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x1fbf29=_0x288220;Scene_File[_0x1fbf29(0x93f)][_0x1fbf29(0x898)][_0x1fbf29(0x6c3)](this),this[_0x1fbf29(0x3b5)]();},Scene_Load[_0x288220(0x93f)][_0x288220(0x3b5)]=function(){const _0x5d9bfe=_0x288220;this[_0x5d9bfe(0x8f6)]&&this[_0x5d9bfe(0x8f6)][_0x5d9bfe(0x8c1)](Scene_Load[_0x5d9bfe(0x3a7)][_0x5d9bfe(0x746)]),this[_0x5d9bfe(0x7a8)]&&this[_0x5d9bfe(0x7a8)][_0x5d9bfe(0x8c1)](Scene_Load[_0x5d9bfe(0x3a7)][_0x5d9bfe(0x97e)]);},Scene_Load['prototype'][_0x288220(0x2e5)]=function(){const _0x3dc57e=_0x288220;return Scene_Load['layoutSettings'][_0x3dc57e(0x7d3)][_0x3dc57e(0x6c3)](this);},Scene_Load[_0x288220(0x93f)][_0x288220(0x6cf)]=function(){const _0x2bf8c7=_0x288220;return Scene_Load['layoutSettings'][_0x2bf8c7(0x60d)][_0x2bf8c7(0x6c3)](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x288220(0x93f)]=Object[_0x288220(0x898)](Scene_Load['prototype']),Scene_QuickLoad[_0x288220(0x93f)]['constructor']=Scene_QuickLoad,Scene_QuickLoad[_0x288220(0x93f)][_0x288220(0x501)]=function(){const _0xc1b549=_0x288220;Scene_Load[_0xc1b549(0x93f)][_0xc1b549(0x501)]['call'](this);},Scene_QuickLoad[_0x288220(0x93f)]['create']=function(){const _0x51dc5c=_0x288220;this['executeLoad'](this[_0x51dc5c(0x37f)]);},Scene_QuickLoad[_0x288220(0x93f)][_0x288220(0x342)]=function(_0x41d5d2){const _0xf1ca=_0x288220;this[_0xf1ca(0x37f)]=_0x41d5d2;},Scene_QuickLoad[_0x288220(0x93f)][_0x288220(0x740)]=function(){const _0x464e20=_0x288220;Scene_MenuBase[_0x464e20(0x93f)][_0x464e20(0x740)][_0x464e20(0x6c3)](this);},Scene_GameEnd[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['MenuLayout'][_0x288220(0x75e)],VisuMZ[_0x288220(0x665)][_0x288220(0x582)]=Scene_GameEnd['prototype'][_0x288220(0x3ee)],Scene_GameEnd[_0x288220(0x93f)][_0x288220(0x3ee)]=function(){const _0x713dfe=_0x288220;Scene_MenuBase[_0x713dfe(0x93f)][_0x713dfe(0x3ee)]['call'](this);},Scene_GameEnd[_0x288220(0x93f)]['createCommandWindow']=function(){const _0x19735d=_0x288220,_0x2d6d9e=this[_0x19735d(0x3ef)]();this[_0x19735d(0x55b)]=new Window_GameEnd(_0x2d6d9e),this[_0x19735d(0x55b)][_0x19735d(0x681)]('cancel',this[_0x19735d(0x796)][_0x19735d(0x3c9)](this)),this[_0x19735d(0x46f)](this[_0x19735d(0x55b)]),this[_0x19735d(0x55b)]['setBackgroundType'](Scene_GameEnd[_0x19735d(0x3a7)][_0x19735d(0x6da)]);},Scene_GameEnd[_0x288220(0x93f)][_0x288220(0x3ef)]=function(){const _0x29edf=_0x288220;return Scene_GameEnd[_0x29edf(0x3a7)][_0x29edf(0x474)][_0x29edf(0x6c3)](this);},Scene_Shop[_0x288220(0x3a7)]=VisuMZ[_0x288220(0x665)]['Settings'][_0x288220(0x418)][_0x288220(0x4b7)],VisuMZ[_0x288220(0x665)]['Scene_Shop_create']=Scene_Shop[_0x288220(0x93f)][_0x288220(0x898)],Scene_Shop[_0x288220(0x93f)][_0x288220(0x898)]=function(){const _0x2d33b4=_0x288220;VisuMZ[_0x2d33b4(0x665)][_0x2d33b4(0x8df)][_0x2d33b4(0x6c3)](this),this[_0x2d33b4(0x3b5)]();},Scene_Shop['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2c6302=_0x288220;this[_0x2c6302(0x8f6)]&&this[_0x2c6302(0x8f6)][_0x2c6302(0x8c1)](Scene_Shop['layoutSettings'][_0x2c6302(0x746)]),this[_0x2c6302(0x2fb)]&&this[_0x2c6302(0x2fb)]['setBackgroundType'](Scene_Shop[_0x2c6302(0x3a7)][_0x2c6302(0x607)]),this['_commandWindow']&&this[_0x2c6302(0x55b)]['setBackgroundType'](Scene_Shop[_0x2c6302(0x3a7)][_0x2c6302(0x6da)]),this[_0x2c6302(0x296)]&&this[_0x2c6302(0x296)][_0x2c6302(0x8c1)](Scene_Shop[_0x2c6302(0x3a7)][_0x2c6302(0x2f9)]),this[_0x2c6302(0x208)]&&this[_0x2c6302(0x208)][_0x2c6302(0x8c1)](Scene_Shop[_0x2c6302(0x3a7)][_0x2c6302(0x34a)]),this[_0x2c6302(0x228)]&&this['_statusWindow'][_0x2c6302(0x8c1)](Scene_Shop['layoutSettings'][_0x2c6302(0x298)]),this['_buyWindow']&&this[_0x2c6302(0x3c2)][_0x2c6302(0x8c1)](Scene_Shop[_0x2c6302(0x3a7)]['BuyBgType']),this['_categoryWindow']&&this[_0x2c6302(0x5b5)][_0x2c6302(0x8c1)](Scene_Shop[_0x2c6302(0x3a7)]['CategoryBgType']),this[_0x2c6302(0x8cf)]&&this['_sellWindow']['setBackgroundType'](Scene_Shop[_0x2c6302(0x3a7)][_0x2c6302(0x752)]);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x2e5)]=function(){const _0x26608c=_0x288220;return Scene_Shop[_0x26608c(0x3a7)]['HelpRect'][_0x26608c(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x3d3)]=function(){const _0x8cbfa4=_0x288220;return Scene_Shop[_0x8cbfa4(0x3a7)]['GoldRect']['call'](this);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x3ef)]=function(){const _0x778fd6=_0x288220;return Scene_Shop['layoutSettings'][_0x778fd6(0x474)][_0x778fd6(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x504)]=function(){const _0x36e98f=_0x288220;return Scene_Shop[_0x36e98f(0x3a7)][_0x36e98f(0x2d9)][_0x36e98f(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x5f4)]=function(){const _0xacd7df=_0x288220;return Scene_Shop[_0xacd7df(0x3a7)][_0xacd7df(0x3f3)][_0xacd7df(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)]['statusWindowRect']=function(){const _0x375f61=_0x288220;return Scene_Shop[_0x375f61(0x3a7)][_0x375f61(0x790)][_0x375f61(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)][_0x288220(0x566)]=function(){const _0x571e50=_0x288220;return Scene_Shop['layoutSettings']['BuyRect'][_0x571e50(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)]['categoryWindowRect']=function(){const _0x2c92b1=_0x288220;return Scene_Shop[_0x2c92b1(0x3a7)][_0x2c92b1(0x4b2)][_0x2c92b1(0x6c3)](this);},Scene_Shop[_0x288220(0x93f)]['sellWindowRect']=function(){const _0x383e60=_0x288220;return Scene_Shop[_0x383e60(0x3a7)][_0x383e60(0x2ed)][_0x383e60(0x6c3)](this);},Scene_Name[_0x288220(0x3a7)]=VisuMZ['CoreEngine'][_0x288220(0x30a)][_0x288220(0x418)]['NameMenu'],VisuMZ[_0x288220(0x665)][_0x288220(0x615)]=Scene_Name[_0x288220(0x93f)][_0x288220(0x898)],Scene_Name[_0x288220(0x93f)]['create']=function(){const _0x1698bd=_0x288220;VisuMZ['CoreEngine'][_0x1698bd(0x615)]['call'](this),this[_0x1698bd(0x3b5)]();},Scene_Name[_0x288220(0x93f)][_0x288220(0x3b5)]=function(){const _0x4e2d88=_0x288220;this['_editWindow']&&this[_0x4e2d88(0x605)][_0x4e2d88(0x8c1)](Scene_Name[_0x4e2d88(0x3a7)][_0x4e2d88(0x502)]),this[_0x4e2d88(0x84d)]&&this[_0x4e2d88(0x84d)][_0x4e2d88(0x8c1)](Scene_Name[_0x4e2d88(0x3a7)][_0x4e2d88(0x919)]);},Scene_Name[_0x288220(0x93f)][_0x288220(0x315)]=function(){return 0x0;},Scene_Name['prototype'][_0x288220(0x412)]=function(){const _0x9c334f=_0x288220;return Scene_Name['layoutSettings']['EditRect'][_0x9c334f(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x932)]=function(){const _0x224fdb=_0x288220;return Scene_Name[_0x224fdb(0x3a7)][_0x224fdb(0x42a)][_0x224fdb(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x631)]=function(){const _0x53714d=_0x288220;if(!this['_inputWindow'])return![];return VisuMZ[_0x53714d(0x665)][_0x53714d(0x30a)][_0x53714d(0x31a)]['EnableNameInput'];},Scene_Name[_0x288220(0x93f)][_0x288220(0x518)]=function(){const _0x25ff46=_0x288220;if(this[_0x25ff46(0x631)]()&&this['_inputWindow'][_0x25ff46(0x739)]!=='keyboard')return TextManager[_0x25ff46(0x230)](_0x25ff46(0x7ce),_0x25ff46(0x527));return Scene_MenuBase[_0x25ff46(0x93f)]['buttonAssistKey1'][_0x25ff46(0x6c3)](this);},Scene_Name['prototype'][_0x288220(0x22b)]=function(){const _0x3e5a93=_0x288220;return this[_0x3e5a93(0x631)]()?TextManager[_0x3e5a93(0x81b)](_0x3e5a93(0x368)):Scene_MenuBase[_0x3e5a93(0x93f)][_0x3e5a93(0x22b)][_0x3e5a93(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x2eb)]=function(){const _0x290185=_0x288220;if(this[_0x290185(0x631)]()&&this[_0x290185(0x84d)][_0x290185(0x739)]===_0x290185(0x701))return TextManager[_0x290185(0x93b)]([_0x290185(0x872)]);return Scene_MenuBase[_0x290185(0x93f)][_0x290185(0x2eb)][_0x290185(0x6c3)](this);},Scene_Name[_0x288220(0x93f)]['buttonAssistKey5']=function(){const _0x406836=_0x288220;if(this['EnableNameInput']()&&this[_0x406836(0x84d)][_0x406836(0x739)]===_0x406836(0x701))return TextManager[_0x406836(0x93b)]([_0x406836(0x408)]);return Scene_MenuBase[_0x406836(0x93f)][_0x406836(0x4f4)][_0x406836(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x667)]=function(){const _0x420cc9=_0x288220;if(this[_0x420cc9(0x631)]()&&this[_0x420cc9(0x84d)][_0x420cc9(0x739)]!==_0x420cc9(0x701)){const _0x31140d=VisuMZ['CoreEngine'][_0x420cc9(0x30a)]['KeyboardInput'];return _0x31140d[_0x420cc9(0x968)]||_0x420cc9(0x6d2);}return Scene_MenuBase[_0x420cc9(0x93f)][_0x420cc9(0x667)][_0x420cc9(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x334)]=function(){const _0x3486f7=_0x288220;if(this[_0x3486f7(0x631)]()){const _0x407c35=VisuMZ[_0x3486f7(0x665)][_0x3486f7(0x30a)][_0x3486f7(0x31a)];return this[_0x3486f7(0x84d)][_0x3486f7(0x739)]===_0x3486f7(0x701)?_0x407c35[_0x3486f7(0x8aa)]||_0x3486f7(0x8aa):_0x407c35[_0x3486f7(0x50e)]||_0x3486f7(0x50e);}else return Scene_MenuBase[_0x3486f7(0x93f)]['buttonAssistText3']['call'](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x970)]=function(){const _0x264bd0=_0x288220;if(this['EnableNameInput']()){const _0x51536e=VisuMZ['CoreEngine']['Settings']['KeyboardInput'];if(this[_0x264bd0(0x84d)][_0x264bd0(0x739)]==='keyboard')return _0x51536e[_0x264bd0(0x580)]||_0x264bd0(0x580);}return Scene_MenuBase[_0x264bd0(0x93f)][_0x264bd0(0x970)]['call'](this);},VisuMZ[_0x288220(0x665)]['Scene_Name_onInputOk']=Scene_Name['prototype']['onInputOk'],Scene_Name[_0x288220(0x93f)][_0x288220(0x6fa)]=function(){const _0x30c9da=_0x288220;this[_0x30c9da(0x73a)]()?this[_0x30c9da(0x88b)]():VisuMZ[_0x30c9da(0x665)][_0x30c9da(0x5ea)][_0x30c9da(0x6c3)](this);},Scene_Name[_0x288220(0x93f)][_0x288220(0x73a)]=function(){const _0x5afb38=_0x288220,_0x5b07b4=VisuMZ[_0x5afb38(0x665)][_0x5afb38(0x30a)]['KeyboardInput'];if(!_0x5b07b4)return![];const _0xcf49e8=_0x5b07b4[_0x5afb38(0x3df)];if(!_0xcf49e8)return![];const _0x20346a=this[_0x5afb38(0x605)][_0x5afb38(0x392)]()[_0x5afb38(0x357)]();for(const _0x5c77de of _0xcf49e8){if(_0x20346a[_0x5afb38(0x479)](_0x5c77de[_0x5afb38(0x357)]()))return!![];}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ[_0x288220(0x665)][_0x288220(0x4f6)]=Scene_Battle[_0x288220(0x93f)][_0x288220(0x508)],Scene_Battle[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x210323=_0x288220;VisuMZ['CoreEngine'][_0x210323(0x4f6)][_0x210323(0x6c3)](this);if($gameTemp[_0x210323(0x4bc)])this[_0x210323(0x5bd)]();},Scene_Battle[_0x288220(0x93f)][_0x288220(0x5bd)]=function(){const _0x4f4bce=_0x288220;!BattleManager[_0x4f4bce(0x943)]()&&!this[_0x4f4bce(0x4fb)]&&!$gameMessage['isBusy']()&&(this['_playtestF7Looping']=!![],this[_0x4f4bce(0x508)](),SceneManager[_0x4f4bce(0x578)](),this[_0x4f4bce(0x4fb)]=![]);},VisuMZ[_0x288220(0x665)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x288220(0x93f)][_0x288220(0x670)],Scene_Battle[_0x288220(0x93f)][_0x288220(0x670)]=function(){const _0x565997=_0x288220;VisuMZ['CoreEngine'][_0x565997(0x9a6)][_0x565997(0x6c3)](this),SceneManager[_0x565997(0x251)]()&&this[_0x565997(0x668)]();},Scene_Battle[_0x288220(0x93f)][_0x288220(0x668)]=function(){const _0x1cc7cf=_0x288220;this[_0x1cc7cf(0x730)]['x']=Graphics[_0x1cc7cf(0x878)]+0x4,this[_0x1cc7cf(0x62d)]()?this[_0x1cc7cf(0x730)]['y']=Graphics['boxHeight']-this[_0x1cc7cf(0x770)]():this[_0x1cc7cf(0x730)]['y']=0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x6cb)]=Sprite_Button['prototype'][_0x288220(0x501)],Sprite_Button['prototype']['initialize']=function(_0xd2511a){const _0x5449e2=_0x288220;VisuMZ[_0x5449e2(0x665)][_0x5449e2(0x6cb)]['call'](this,_0xd2511a),this[_0x5449e2(0x21b)]();},Sprite_Button[_0x288220(0x93f)][_0x288220(0x21b)]=function(){const _0x445aa2=_0x288220,_0x16beed=VisuMZ[_0x445aa2(0x665)][_0x445aa2(0x30a)]['UI'];this['_isButtonHidden']=![];switch(this[_0x445aa2(0x798)]){case'cancel':this[_0x445aa2(0x928)]=!_0x16beed[_0x445aa2(0x47b)];break;case _0x445aa2(0x7ce):case'pagedown':this[_0x445aa2(0x928)]=!_0x16beed[_0x445aa2(0x84a)];break;case _0x445aa2(0x1d2):case'up':case _0x445aa2(0x8d0):case _0x445aa2(0x5d3):case'ok':this['_isButtonHidden']=!_0x16beed[_0x445aa2(0x5b0)];break;case'menu':this[_0x445aa2(0x928)]=!_0x16beed[_0x445aa2(0x22a)];break;}},VisuMZ[_0x288220(0x665)][_0x288220(0x732)]=Sprite_Button[_0x288220(0x93f)][_0x288220(0x7f2)],Sprite_Button[_0x288220(0x93f)][_0x288220(0x7f2)]=function(){const _0x2a75ed=_0x288220;SceneManager[_0x2a75ed(0x6b1)]()||this[_0x2a75ed(0x928)]?this[_0x2a75ed(0x7da)]():VisuMZ[_0x2a75ed(0x665)][_0x2a75ed(0x732)][_0x2a75ed(0x6c3)](this);},Sprite_Button[_0x288220(0x93f)][_0x288220(0x7da)]=function(){const _0x2cac59=_0x288220;this[_0x2cac59(0x91f)]=![],this['opacity']=0x0,this['x']=Graphics[_0x2cac59(0x426)]*0xa,this['y']=Graphics[_0x2cac59(0x4b9)]*0xa;},VisuMZ[_0x288220(0x665)]['Sprite_Battler_startMove']=Sprite_Battler[_0x288220(0x93f)][_0x288220(0x764)],Sprite_Battler[_0x288220(0x93f)]['startMove']=function(_0x416d0c,_0xfcda80,_0x43bfe8){const _0xf10cc4=_0x288220;(this[_0xf10cc4(0x2ad)]!==_0x416d0c||this['_targetOffsetY']!==_0xfcda80)&&(this['setMoveEasingType']('Linear'),this['_movementWholeDuration']=_0x43bfe8),VisuMZ[_0xf10cc4(0x665)][_0xf10cc4(0x258)]['call'](this,_0x416d0c,_0xfcda80,_0x43bfe8);},Sprite_Battler[_0x288220(0x93f)]['setMoveEasingType']=function(_0x3cc32f){const _0x31c2b8=_0x288220;this[_0x31c2b8(0x34f)]=_0x3cc32f;},Sprite_Battler[_0x288220(0x93f)][_0x288220(0x4a8)]=function(){const _0x14e575=_0x288220;if(this['_movementDuration']<=0x0)return;const _0x265dac=this[_0x14e575(0x6cd)],_0xd0e265=this[_0x14e575(0x990)],_0xfa4b43=this[_0x14e575(0x34f)];this['_offsetX']=this[_0x14e575(0x39b)](this['_offsetX'],this[_0x14e575(0x2ad)],_0x265dac,_0xd0e265,_0xfa4b43),this[_0x14e575(0x768)]=this[_0x14e575(0x39b)](this[_0x14e575(0x768)],this[_0x14e575(0x5e8)],_0x265dac,_0xd0e265,_0xfa4b43),this['_movementDuration']--;if(this[_0x14e575(0x6cd)]<=0x0)this[_0x14e575(0x848)]();},Sprite_Battler[_0x288220(0x93f)]['applyEasing']=function(_0x5f4a2b,_0x214d94,_0x534949,_0x27427a,_0x42c4a8){const _0x518037=_0x288220,_0x45e02a=VisuMZ[_0x518037(0x693)]((_0x27427a-_0x534949)/_0x27427a,_0x42c4a8||_0x518037(0x828)),_0xdb893f=VisuMZ[_0x518037(0x693)]((_0x27427a-_0x534949+0x1)/_0x27427a,_0x42c4a8||_0x518037(0x828)),_0x57f68a=(_0x5f4a2b-_0x214d94*_0x45e02a)/(0x1-_0x45e02a);return _0x57f68a+(_0x214d94-_0x57f68a)*_0xdb893f;},VisuMZ[_0x288220(0x665)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x288220(0x93f)][_0x288220(0x4da)],Sprite_Actor[_0x288220(0x93f)][_0x288220(0x4da)]=function(_0x39ca91){const _0x421652=_0x288220;VisuMZ[_0x421652(0x665)]['Settings']['UI']['RepositionActors']?this[_0x421652(0x78c)](_0x39ca91):VisuMZ['CoreEngine'][_0x421652(0x6e3)]['call'](this,_0x39ca91);},Sprite_Actor['prototype'][_0x288220(0x78c)]=function(_0x48bc70){const _0x35c8ce=_0x288220;let _0x195362=Math[_0x35c8ce(0x3ff)](Graphics[_0x35c8ce(0x426)]/0x2+0xc0);_0x195362-=Math['floor']((Graphics[_0x35c8ce(0x426)]-Graphics[_0x35c8ce(0x878)])/0x2),_0x195362+=_0x48bc70*0x20;let _0x382281=Graphics['height']-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x382281-=Math[_0x35c8ce(0x25e)]((Graphics['height']-Graphics[_0x35c8ce(0x415)])/0x2),_0x382281+=_0x48bc70*0x30,this[_0x35c8ce(0x6bf)](_0x195362,_0x382281);},Sprite_Actor[_0x288220(0x93f)][_0x288220(0x61b)]=function(){const _0x11818e=_0x288220;this[_0x11818e(0x764)](0x4b0,0x0,0x78);},Sprite_Animation[_0x288220(0x93f)][_0x288220(0x67f)]=function(_0x56da50){const _0x4e70e2=_0x288220;this[_0x4e70e2(0x494)]=_0x56da50;},VisuMZ[_0x288220(0x665)][_0x288220(0x2d6)]=Sprite_Animation[_0x288220(0x93f)][_0x288220(0x3da)],Sprite_Animation[_0x288220(0x93f)][_0x288220(0x3da)]=function(){const _0x42b17e=_0x288220;if(this[_0x42b17e(0x494)])return;VisuMZ[_0x42b17e(0x665)][_0x42b17e(0x2d6)][_0x42b17e(0x6c3)](this);},VisuMZ['CoreEngine'][_0x288220(0x6b4)]=Sprite_Animation[_0x288220(0x93f)][_0x288220(0x55f)],Sprite_Animation[_0x288220(0x93f)][_0x288220(0x55f)]=function(_0x248cc7){const _0x5b2edd=_0x288220;this[_0x5b2edd(0x350)]()?this['setViewportCoreEngineFix'](_0x248cc7):VisuMZ[_0x5b2edd(0x665)][_0x5b2edd(0x6b4)][_0x5b2edd(0x6c3)](this,_0x248cc7);},Sprite_Animation[_0x288220(0x93f)][_0x288220(0x350)]=function(){const _0x558d9f=_0x288220;if(!this[_0x558d9f(0x273)])return![];const _0x462971=this[_0x558d9f(0x273)][_0x558d9f(0x392)]||'';if(_0x462971['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x462971['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x558d9f(0x30a)][_0x558d9f(0x23d)][_0x558d9f(0x954)];},Sprite_Animation[_0x288220(0x93f)][_0x288220(0x4d3)]=function(_0x798f2c){const _0x423577=_0x288220,_0x4f3865=this[_0x423577(0x6dc)],_0xb53bfc=this[_0x423577(0x6dc)],_0x1f80c7=this[_0x423577(0x273)][_0x423577(0x831)]*(this['_mirror']?-0x1:0x1)-_0x4f3865/0x2,_0x53a6da=this[_0x423577(0x273)][_0x423577(0x99a)]-_0xb53bfc/0x2,_0x1f148b=this[_0x423577(0x6b3)](_0x798f2c);_0x798f2c['gl'][_0x423577(0x92d)](_0x1f80c7+_0x1f148b['x'],_0x53a6da+_0x1f148b['y'],_0x4f3865,_0xb53bfc);},Sprite_Animation[_0x288220(0x93f)][_0x288220(0x5ce)]=function(_0x1d757b){const _0x3de31d=_0x288220;if(_0x1d757b[_0x3de31d(0x480)]){}const _0x5946b3=this[_0x3de31d(0x273)]['name'];let _0x2fb92f=_0x1d757b[_0x3de31d(0x4b9)]*_0x1d757b[_0x3de31d(0x451)]['y'],_0x38d6af=0x0,_0x38276a=-_0x2fb92f/0x2;if(_0x5946b3[_0x3de31d(0x54b)](/<(?:HEAD|HEADER|TOP)>/i))_0x38276a=-_0x2fb92f;if(_0x5946b3[_0x3de31d(0x54b)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x38276a=0x0;if(this[_0x3de31d(0x273)][_0x3de31d(0x6ab)])_0x38276a=0x0;if(_0x5946b3[_0x3de31d(0x54b)](/<(?:LEFT)>/i))_0x38d6af=-_0x1d757b[_0x3de31d(0x426)]/0x2;if(_0x5946b3[_0x3de31d(0x54b)](/<(?:RIGHT)>/i))_0x38d6af=_0x1d757b['width']/0x2;_0x5946b3['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x38d6af=Number(RegExp['$1'])*_0x1d757b[_0x3de31d(0x426)]);_0x5946b3[_0x3de31d(0x54b)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x38276a=(0x1-Number(RegExp['$1']))*-_0x2fb92f);_0x5946b3[_0x3de31d(0x54b)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x38d6af=Number(RegExp['$1'])*_0x1d757b[_0x3de31d(0x426)],_0x38276a=(0x1-Number(RegExp['$2']))*-_0x2fb92f);if(_0x5946b3['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x38d6af+=Number(RegExp['$1']);if(_0x5946b3[_0x3de31d(0x54b)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x38276a+=Number(RegExp['$1']);_0x5946b3['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x38d6af+=Number(RegExp['$1']),_0x38276a+=Number(RegExp['$2']));const _0x239e29=new Point(_0x38d6af,_0x38276a);return _0x1d757b[_0x3de31d(0x945)](),_0x1d757b[_0x3de31d(0x5ff)][_0x3de31d(0x58c)](_0x239e29);},Sprite_AnimationMV['prototype'][_0x288220(0x286)]=function(){const _0x18aca2=_0x288220;this[_0x18aca2(0x5f9)]=VisuMZ[_0x18aca2(0x665)][_0x18aca2(0x30a)][_0x18aca2(0x23d)][_0x18aca2(0x83d)]??0x4,this[_0x18aca2(0x458)](),this[_0x18aca2(0x5f9)]=this[_0x18aca2(0x5f9)][_0x18aca2(0x5d6)](0x1,0xa);},Sprite_AnimationMV[_0x288220(0x93f)]['setupCustomRateCoreEngine']=function(){const _0x52fcf7=_0x288220;if(!this[_0x52fcf7(0x273)]);const _0x173641=this['_animation'][_0x52fcf7(0x392)]||'';_0x173641[_0x52fcf7(0x54b)](/<RATE:[ ](\d+)>/i)&&(this[_0x52fcf7(0x5f9)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x288220(0x67f)]=function(_0x51aab8){const _0x465a83=_0x288220;this[_0x465a83(0x494)]=_0x51aab8;},VisuMZ['CoreEngine'][_0x288220(0x1ed)]=Sprite_AnimationMV[_0x288220(0x93f)][_0x288220(0x6d5)],Sprite_AnimationMV[_0x288220(0x93f)][_0x288220(0x6d5)]=function(_0x516cb6){const _0x4713b2=_0x288220;this[_0x4713b2(0x494)]&&(_0x516cb6=JsonEx['makeDeepCopy'](_0x516cb6),_0x516cb6['se']&&(_0x516cb6['se'][_0x4713b2(0x698)]=0x0)),VisuMZ[_0x4713b2(0x665)][_0x4713b2(0x1ed)][_0x4713b2(0x6c3)](this,_0x516cb6);},VisuMZ[_0x288220(0x665)][_0x288220(0x51c)]=Sprite_AnimationMV[_0x288220(0x93f)][_0x288220(0x523)],Sprite_AnimationMV['prototype'][_0x288220(0x523)]=function(){const _0x321e96=_0x288220;VisuMZ[_0x321e96(0x665)][_0x321e96(0x51c)]['call'](this);if(this[_0x321e96(0x273)][_0x321e96(0x4cd)]===0x3){if(this['x']===0x0)this['x']=Math[_0x321e96(0x3ff)](Graphics[_0x321e96(0x426)]/0x2);if(this['y']===0x0)this['y']=Math[_0x321e96(0x3ff)](Graphics[_0x321e96(0x4b9)]/0x2);}},Sprite_Damage[_0x288220(0x93f)][_0x288220(0x43c)]=function(_0x512f4d){const _0x4e6f71=_0x288220;let _0x4309d7=Math['abs'](_0x512f4d)[_0x4e6f71(0x7a7)]();this[_0x4e6f71(0x7e7)]()&&(_0x4309d7=VisuMZ[_0x4e6f71(0x67e)](_0x4309d7));const _0x518ca7=this[_0x4e6f71(0x4d6)](),_0x58ec85=Math[_0x4e6f71(0x25e)](_0x518ca7*0.75);for(let _0x5407bc=0x0;_0x5407bc<_0x4309d7[_0x4e6f71(0x2cd)];_0x5407bc++){const _0x39af68=this[_0x4e6f71(0x226)](_0x58ec85,_0x518ca7);_0x39af68[_0x4e6f71(0x421)][_0x4e6f71(0x3d0)](_0x4309d7[_0x5407bc],0x0,0x0,_0x58ec85,_0x518ca7,_0x4e6f71(0x295)),_0x39af68['x']=(_0x5407bc-(_0x4309d7['length']-0x1)/0x2)*_0x58ec85,_0x39af68['dy']=-_0x5407bc;}},Sprite_Damage[_0x288220(0x93f)]['useDigitGrouping']=function(){const _0x46c343=_0x288220;return VisuMZ[_0x46c343(0x665)]['Settings'][_0x46c343(0x23d)]['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x288220(0x84e)]=function(){const _0x22c0f8=_0x288220;return ColorManager[_0x22c0f8(0x56e)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x2b2)]=Sprite_Gauge[_0x288220(0x93f)][_0x288220(0x96e)],Sprite_Gauge[_0x288220(0x93f)][_0x288220(0x96e)]=function(){const _0x111192=_0x288220;return VisuMZ['CoreEngine'][_0x111192(0x2b2)][_0x111192(0x6c3)](this)[_0x111192(0x5d6)](0x0,0x1);},VisuMZ['CoreEngine'][_0x288220(0x39f)]=Sprite_Gauge[_0x288220(0x93f)][_0x288220(0x454)],Sprite_Gauge[_0x288220(0x93f)][_0x288220(0x454)]=function(){const _0xd681d0=_0x288220;let _0x4a0013=VisuMZ['CoreEngine'][_0xd681d0(0x39f)][_0xd681d0(0x6c3)](this);return _0x4a0013;},Sprite_Gauge['prototype']['drawValue']=function(){const _0x31e2a9=_0x288220;let _0x37a601=this[_0x31e2a9(0x454)]();this[_0x31e2a9(0x7e7)]()&&(_0x37a601=VisuMZ[_0x31e2a9(0x67e)](_0x37a601));const _0x203b51=this['bitmapWidth']()-0x1,_0x4b4564=this[_0x31e2a9(0x2cc)]?this['textHeight']():this[_0x31e2a9(0x2ba)]();this[_0x31e2a9(0x3ec)](),this[_0x31e2a9(0x421)]['drawText'](_0x37a601,0x0,0x0,_0x203b51,_0x4b4564,_0x31e2a9(0x711));},Sprite_Gauge[_0x288220(0x93f)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x288220(0x93f)]['useDigitGrouping']=function(){const _0x5c5e60=_0x288220;return VisuMZ[_0x5c5e60(0x665)][_0x5c5e60(0x30a)][_0x5c5e60(0x23d)][_0x5c5e60(0x50f)];},Sprite_Gauge[_0x288220(0x93f)][_0x288220(0x84e)]=function(){const _0x1a42dc=_0x288220;return ColorManager[_0x1a42dc(0x62f)]();},Sprite_StateIcon[_0x288220(0x54e)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['UI'][_0x288220(0x5d4)]??!![],VisuMZ[_0x288220(0x665)][_0x288220(0x25a)]=Sprite_StateIcon[_0x288220(0x93f)][_0x288220(0x365)],Sprite_StateIcon[_0x288220(0x93f)]['loadBitmap']=function(){const _0x35f4cd=_0x288220;Sprite_StateIcon[_0x35f4cd(0x54e)]?this[_0x35f4cd(0x2db)]():VisuMZ[_0x35f4cd(0x665)]['Sprite_StateIcon_loadBitmap'][_0x35f4cd(0x6c3)](this);},Sprite_StateIcon[_0x288220(0x93f)]['loadBitmapCoreEngine']=function(){const _0x2ef573=_0x288220;this[_0x2ef573(0x421)]=new Bitmap(ImageManager[_0x2ef573(0x882)],ImageManager[_0x2ef573(0x5ae)]),this[_0x2ef573(0x61a)]=ImageManager[_0x2ef573(0x2a3)](_0x2ef573(0x65b));},VisuMZ[_0x288220(0x665)][_0x288220(0x8cd)]=Sprite_StateIcon[_0x288220(0x93f)][_0x288220(0x2a6)],Sprite_StateIcon[_0x288220(0x93f)][_0x288220(0x2a6)]=function(){const _0x2230e0=_0x288220;Sprite_StateIcon[_0x2230e0(0x54e)]?this['updateFrameCoreEngine']():VisuMZ[_0x2230e0(0x665)]['Sprite_StateIcon_updateFrame'][_0x2230e0(0x6c3)](this);},Sprite_StateIcon['prototype'][_0x288220(0x830)]=function(){const _0x5a2c73=_0x288220;if(this['_lastIconIndex']===this['_iconIndex'])return;this['_lastIconIndex']=this[_0x5a2c73(0x33d)];const _0x55291f=ImageManager['iconWidth'],_0x35c680=ImageManager[_0x5a2c73(0x5ae)],_0x34f1d5=this[_0x5a2c73(0x33d)]%0x10*_0x55291f,_0xf55b7a=Math[_0x5a2c73(0x25e)](this['_iconIndex']/0x10)*_0x35c680,_0x178198=this['_srcBitmap'],_0x392bf8=this[_0x5a2c73(0x421)];_0x392bf8[_0x5a2c73(0x895)](),_0x392bf8[_0x5a2c73(0x7a1)](_0x178198,_0x34f1d5,_0xf55b7a,_0x55291f,_0x35c680,0x0,0x0,_0x392bf8[_0x5a2c73(0x426)],_0x392bf8[_0x5a2c73(0x4b9)]);},VisuMZ[_0x288220(0x665)][_0x288220(0x69e)]=Sprite_Picture[_0x288220(0x93f)][_0x288220(0x365)],Sprite_Picture['prototype'][_0x288220(0x365)]=function(){const _0x4bce47=_0x288220;this[_0x4bce47(0x6a2)]&&this['_pictureName'][_0x4bce47(0x54b)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x4bce47(0x644)](Number(RegExp['$1'])):VisuMZ[_0x4bce47(0x665)]['Sprite_Picture_loadBitmap']['call'](this);},Sprite_Picture[_0x288220(0x93f)]['loadIconBitmap']=function(_0x3fafd5){const _0x2d00e0=_0x288220,_0x569620=ImageManager[_0x2d00e0(0x882)],_0x49d10f=ImageManager[_0x2d00e0(0x5ae)],_0x1e9c9f=this[_0x2d00e0(0x6a2)][_0x2d00e0(0x54b)](/SMOOTH/i);this[_0x2d00e0(0x421)]=new Bitmap(_0x569620,_0x49d10f);const _0x4b5e81=ImageManager[_0x2d00e0(0x2a3)](_0x2d00e0(0x65b)),_0x4aa1fb=_0x3fafd5%0x10*_0x569620,_0x3dbe02=Math['floor'](_0x3fafd5/0x10)*_0x49d10f;this[_0x2d00e0(0x421)][_0x2d00e0(0x50d)]=_0x1e9c9f,this[_0x2d00e0(0x421)][_0x2d00e0(0x7a1)](_0x4b5e81,_0x4aa1fb,_0x3dbe02,_0x569620,_0x49d10f,0x0,0x0,_0x569620,_0x49d10f);};function Sprite_TitlePictureButton(){const _0x22629b=_0x288220;this[_0x22629b(0x501)](...arguments);}Sprite_TitlePictureButton[_0x288220(0x93f)]=Object[_0x288220(0x898)](Sprite_Clickable[_0x288220(0x93f)]),Sprite_TitlePictureButton['prototype'][_0x288220(0x5e4)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x288220(0x93f)]['initialize']=function(_0x691d8c){const _0x541f53=_0x288220;Sprite_Clickable[_0x541f53(0x93f)]['initialize'][_0x541f53(0x6c3)](this),this[_0x541f53(0x221)]=_0x691d8c,this[_0x541f53(0x484)]=null,this[_0x541f53(0x540)]();},Sprite_TitlePictureButton[_0x288220(0x93f)][_0x288220(0x540)]=function(){const _0x1d5719=_0x288220;this['x']=Graphics[_0x1d5719(0x426)],this['y']=Graphics[_0x1d5719(0x4b9)],this[_0x1d5719(0x91f)]=![],this[_0x1d5719(0x7a0)]();},Sprite_TitlePictureButton[_0x288220(0x93f)][_0x288220(0x7a0)]=function(){const _0x22518b=_0x288220;this[_0x22518b(0x421)]=ImageManager[_0x22518b(0x757)](this[_0x22518b(0x221)][_0x22518b(0x68c)]),this[_0x22518b(0x421)][_0x22518b(0x400)](this[_0x22518b(0x5d9)][_0x22518b(0x3c9)](this));},Sprite_TitlePictureButton[_0x288220(0x93f)][_0x288220(0x5d9)]=function(){const _0x40c4d9=_0x288220;this[_0x40c4d9(0x221)]['OnLoadJS'][_0x40c4d9(0x6c3)](this),this[_0x40c4d9(0x221)][_0x40c4d9(0x3a2)]['call'](this),this[_0x40c4d9(0x8f5)](this[_0x40c4d9(0x221)][_0x40c4d9(0x371)]['bind'](this));},Sprite_TitlePictureButton[_0x288220(0x93f)]['update']=function(){const _0x3083b3=_0x288220;Sprite_Clickable['prototype'][_0x3083b3(0x508)][_0x3083b3(0x6c3)](this),this[_0x3083b3(0x7f2)](),this[_0x3083b3(0x2cb)]();},Sprite_TitlePictureButton[_0x288220(0x93f)][_0x288220(0x443)]=function(){const _0x1da62f=_0x288220;return VisuMZ['CoreEngine'][_0x1da62f(0x30a)]['MenuLayout'][_0x1da62f(0x48e)][_0x1da62f(0x976)];},Sprite_TitlePictureButton['prototype'][_0x288220(0x7f2)]=function(){const _0x2ab87f=_0x288220;this[_0x2ab87f(0x762)]||this[_0x2ab87f(0x3a6)]?this[_0x2ab87f(0x411)]=0xff:(this[_0x2ab87f(0x411)]+=this[_0x2ab87f(0x91f)]?this[_0x2ab87f(0x443)]():-0x1*this[_0x2ab87f(0x443)](),this['opacity']=Math[_0x2ab87f(0x2e1)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x288220(0x93f)][_0x288220(0x8f5)]=function(_0x5ae9ac){const _0x4a585f=_0x288220;this[_0x4a585f(0x484)]=_0x5ae9ac;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0x5ac04e=_0x288220;this['_clickHandler']&&this[_0x5ac04e(0x484)]();};function Sprite_ExtendedTile(){this['initialize'](...arguments);}Sprite_ExtendedTile['prototype']=Object[_0x288220(0x898)](Sprite[_0x288220(0x93f)]),Sprite_ExtendedTile['prototype'][_0x288220(0x5e4)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x288220(0x93f)]['initialize']=function(_0x6baff8,_0x4130be,_0x3f9f81,_0x1dd0da){const _0x2d053d=_0x288220;this['_shiftY']=Game_CharacterBase[_0x2d053d(0x77a)]||-0x6,this[_0x2d053d(0x5fd)]=_0x6baff8,this[_0x2d053d(0x57c)]=_0x4130be,this['_tile']=_0x3f9f81,this[_0x2d053d(0x5a3)]=_0x1dd0da,Sprite[_0x2d053d(0x93f)][_0x2d053d(0x501)][_0x2d053d(0x6c3)](this),this[_0x2d053d(0x45e)](),this[_0x2d053d(0x915)](),this[_0x2d053d(0x2d2)](),this[_0x2d053d(0x508)]();},Sprite_ExtendedTile['prototype'][_0x288220(0x45e)]=function(){const _0x25b093=_0x288220;this['_tileSprite']=new Sprite(),this[_0x25b093(0x212)][_0x25b093(0x781)]['x']=0.5,this[_0x25b093(0x212)][_0x25b093(0x781)]['y']=0x1,this[_0x25b093(0x212)]['y']=-this[_0x25b093(0x28e)]+0x1,this['addChild'](this[_0x25b093(0x212)]);},Sprite_ExtendedTile[_0x288220(0x93f)][_0x288220(0x915)]=function(){const _0x503420=_0x288220,_0x2e8f29=$gameMap[_0x503420(0x30e)](),_0x2248db=0x5+Math[_0x503420(0x25e)](this['_tile']/0x100);this[_0x503420(0x212)][_0x503420(0x421)]=ImageManager[_0x503420(0x88a)](_0x2e8f29[_0x503420(0x5f2)][_0x2248db]);},Sprite_ExtendedTile[_0x288220(0x93f)][_0x288220(0x2d2)]=function(){const _0x39fa69=_0x288220,_0x14f595=this[_0x39fa69(0x577)],_0x1ba9e9=$gameMap[_0x39fa69(0x8db)](),_0x2c587b=$gameMap[_0x39fa69(0x648)](),_0x1953f8=(Math[_0x39fa69(0x25e)](_0x14f595/0x80)%0x2*0x8+_0x14f595%0x8)*_0x1ba9e9,_0x242f13=Math[_0x39fa69(0x25e)](_0x14f595%0x100/0x8)%0x10*_0x2c587b,_0x39920b=this[_0x39fa69(0x5a3)]*_0x2c587b;this[_0x39fa69(0x212)][_0x39fa69(0x3b9)](_0x1953f8,_0x242f13-_0x39920b,_0x1ba9e9,_0x2c587b+_0x39920b);},Sprite_ExtendedTile[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x23a2bd=_0x288220;Sprite[_0x23a2bd(0x93f)][_0x23a2bd(0x508)][_0x23a2bd(0x6c3)](this),this['updatePosition']();},Sprite_ExtendedTile[_0x288220(0x93f)][_0x288220(0x523)]=function(){const _0x1318c5=_0x288220,_0x1c3eb6=$gameMap['tileWidth'](),_0xb90aac=$gameMap[_0x1318c5(0x648)](),_0x540f63=this[_0x1318c5(0x5fd)],_0x1445ef=this[_0x1318c5(0x57c)];this['x']=Math[_0x1318c5(0x25e)](($gameMap[_0x1318c5(0x930)](_0x540f63)+0.5)*_0x1c3eb6),this['y']=Math[_0x1318c5(0x25e)](($gameMap[_0x1318c5(0x5c6)](_0x1445ef)+0x1)*_0xb90aac)+this[_0x1318c5(0x28e)]-0x1;},VisuMZ[_0x288220(0x665)][_0x288220(0x4d4)]=Spriteset_Base['prototype'][_0x288220(0x501)],Spriteset_Base['prototype']['initialize']=function(){const _0x369d12=_0x288220;VisuMZ[_0x369d12(0x665)][_0x369d12(0x4d4)][_0x369d12(0x6c3)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x288220(0x93f)]['initMembersCoreEngine']=function(){const _0x97c0f8=_0x288220;this[_0x97c0f8(0x239)]=[],this[_0x97c0f8(0x24c)]=[],this[_0x97c0f8(0x3a4)]=this[_0x97c0f8(0x451)]['x'],this['_cacheScaleY']=this[_0x97c0f8(0x451)]['y'];},VisuMZ[_0x288220(0x665)][_0x288220(0x890)]=Spriteset_Base[_0x288220(0x93f)][_0x288220(0x337)],Spriteset_Base[_0x288220(0x93f)]['destroy']=function(_0x37e490){const _0x4e4edd=_0x288220;this[_0x4e4edd(0x2df)](),this['removeAllPointAnimations'](),VisuMZ['CoreEngine']['Spriteset_Base_destroy'][_0x4e4edd(0x6c3)](this,_0x37e490);},VisuMZ[_0x288220(0x665)][_0x288220(0x89d)]=Spriteset_Base[_0x288220(0x93f)][_0x288220(0x508)],Spriteset_Base[_0x288220(0x93f)]['update']=function(){const _0x30afb4=_0x288220;VisuMZ[_0x30afb4(0x665)]['Spriteset_Base_update']['call'](this),this[_0x30afb4(0x353)](),this[_0x30afb4(0x26c)](),this[_0x30afb4(0x613)](),this[_0x30afb4(0x24d)]();},Spriteset_Base['prototype'][_0x288220(0x353)]=function(){},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x26c)]=function(){const _0x1de1d2=_0x288220;if(!VisuMZ[_0x1de1d2(0x665)][_0x1de1d2(0x30a)][_0x1de1d2(0x23d)]['AntiZoomPictures'])return;if(this[_0x1de1d2(0x3a4)]===this[_0x1de1d2(0x451)]['x']&&this[_0x1de1d2(0x3e1)]===this[_0x1de1d2(0x451)]['y'])return;this['adjustPictureAntiZoom'](),this['_cacheScaleX']=this[_0x1de1d2(0x451)]['x'],this[_0x1de1d2(0x3e1)]=this[_0x1de1d2(0x451)]['y'];},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x7e9)]=function(){const _0x39d25e=_0x288220;if(SceneManager[_0x39d25e(0x875)]()&&Spriteset_Map[_0x39d25e(0x5aa)])return;else{if(SceneManager[_0x39d25e(0x52a)]()&&Spriteset_Battle[_0x39d25e(0x5aa)])return;}this['scale']['x']!==0x0&&(this[_0x39d25e(0x554)][_0x39d25e(0x451)]['x']=0x1/this[_0x39d25e(0x451)]['x'],this[_0x39d25e(0x554)]['x']=-(this['x']/this[_0x39d25e(0x451)]['x'])),this[_0x39d25e(0x451)]['y']!==0x0&&(this[_0x39d25e(0x554)][_0x39d25e(0x451)]['y']=0x1/this[_0x39d25e(0x451)]['y'],this[_0x39d25e(0x554)]['y']=-(this['y']/this[_0x39d25e(0x451)]['y']));},VisuMZ[_0x288220(0x665)][_0x288220(0x313)]=Spriteset_Base[_0x288220(0x93f)][_0x288220(0x523)],Spriteset_Base[_0x288220(0x93f)]['updatePosition']=function(){const _0x1d590f=_0x288220;VisuMZ[_0x1d590f(0x665)][_0x1d590f(0x313)][_0x1d590f(0x6c3)](this),this[_0x1d590f(0x416)]();},Spriteset_Base[_0x288220(0x93f)]['updatePositionCoreEngine']=function(){const _0x392a43=_0x288220;if(!$gameScreen)return;if($gameScreen[_0x392a43(0x2ca)]<=0x0)return;this['x']-=Math['round']($gameScreen['shake']());const _0x6ebd3=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x392a43(0x4fe)]()){case'original':this[_0x392a43(0x73c)]();break;case _0x392a43(0x94d):this['updatePositionCoreEngineShakeHorz']();break;case'vertical':this['updatePositionCoreEngineShakeVert']();break;default:this[_0x392a43(0x8e4)]();break;}},Spriteset_Base[_0x288220(0x93f)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x19d948=_0x288220,_0x37c56d=VisuMZ['CoreEngine'][_0x19d948(0x30a)][_0x19d948(0x64a)];if(_0x37c56d&&_0x37c56d[_0x19d948(0x272)])return _0x37c56d[_0x19d948(0x272)][_0x19d948(0x6c3)](this);this['x']+=Math[_0x19d948(0x3ff)]($gameScreen[_0x19d948(0x957)]());},Spriteset_Base['prototype']['updatePositionCoreEngineShakeRand']=function(){const _0x54f1c9=_0x288220,_0x224d25=VisuMZ[_0x54f1c9(0x665)][_0x54f1c9(0x30a)]['ScreenShake'];if(_0x224d25&&_0x224d25[_0x54f1c9(0x69a)])return _0x224d25[_0x54f1c9(0x69a)]['call'](this);const _0xdeac42=$gameScreen[_0x54f1c9(0x290)]*0.75,_0x2bf4db=$gameScreen[_0x54f1c9(0x278)]*0.6,_0x578242=$gameScreen['_shakeDuration'];this['x']+=Math[_0x54f1c9(0x3ff)](Math[_0x54f1c9(0x82f)](_0xdeac42)-Math[_0x54f1c9(0x82f)](_0x2bf4db))*(Math['min'](_0x578242,0x1e)*0.5),this['y']+=Math['round'](Math[_0x54f1c9(0x82f)](_0xdeac42)-Math[_0x54f1c9(0x82f)](_0x2bf4db))*(Math[_0x54f1c9(0x2e1)](_0x578242,0x1e)*0.5);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x2b9)]=function(){const _0x22a7f3=_0x288220,_0x451782=VisuMZ[_0x22a7f3(0x665)][_0x22a7f3(0x30a)][_0x22a7f3(0x64a)];if(_0x451782&&_0x451782[_0x22a7f3(0x8bc)])return _0x451782['horzJS'][_0x22a7f3(0x6c3)](this);const _0x1bd2e4=$gameScreen[_0x22a7f3(0x290)]*0.75,_0x33aad2=$gameScreen['_shakeSpeed']*0.6,_0x251e6f=$gameScreen['_shakeDuration'];this['x']+=Math[_0x22a7f3(0x3ff)](Math[_0x22a7f3(0x82f)](_0x1bd2e4)-Math['randomInt'](_0x33aad2))*(Math[_0x22a7f3(0x2e1)](_0x251e6f,0x1e)*0.5);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x26b)]=function(){const _0x1a674a=_0x288220,_0xa25a88=VisuMZ['CoreEngine'][_0x1a674a(0x30a)][_0x1a674a(0x64a)];if(_0xa25a88&&_0xa25a88[_0x1a674a(0x246)])return _0xa25a88[_0x1a674a(0x246)]['call'](this);const _0x4430b6=$gameScreen[_0x1a674a(0x290)]*0.75,_0x3cd53c=$gameScreen[_0x1a674a(0x278)]*0.6,_0x17d62e=$gameScreen['_shakeDuration'];this['y']+=Math[_0x1a674a(0x3ff)](Math[_0x1a674a(0x82f)](_0x4430b6)-Math[_0x1a674a(0x82f)](_0x3cd53c))*(Math[_0x1a674a(0x2e1)](_0x17d62e,0x1e)*0.5);},Spriteset_Base['prototype'][_0x288220(0x613)]=function(){const _0x6059ef=_0x288220;for(const _0x51bcb7 of this[_0x6059ef(0x239)]){!_0x51bcb7[_0x6059ef(0x621)]()&&this['removeFauxAnimation'](_0x51bcb7);}this[_0x6059ef(0x8fa)]();},Spriteset_Base[_0x288220(0x93f)]['processFauxAnimationRequests']=function(){const _0x53c4f9=_0x288220;for(;;){const _0x11496c=$gameTemp[_0x53c4f9(0x8b0)]();if(_0x11496c)this[_0x53c4f9(0x2a8)](_0x11496c);else break;}},Spriteset_Base[_0x288220(0x93f)]['createFauxAnimation']=function(_0x14d43f){const _0xb2b15d=_0x288220,_0x2f7bb5=$dataAnimations[_0x14d43f[_0xb2b15d(0x8e7)]],_0x314bbd=_0x14d43f['targets'],_0x6f4890=_0x14d43f['mirror'],_0x7fff15=_0x14d43f[_0xb2b15d(0x5d0)];let _0x432d0f=this['animationBaseDelay']();const _0x2b5638=this[_0xb2b15d(0x92b)]();if(this[_0xb2b15d(0x8ac)](_0x2f7bb5))for(const _0x130e8d of _0x314bbd){this[_0xb2b15d(0x73b)]([_0x130e8d],_0x2f7bb5,_0x6f4890,_0x432d0f,_0x7fff15),_0x432d0f+=_0x2b5638;}else this[_0xb2b15d(0x73b)](_0x314bbd,_0x2f7bb5,_0x6f4890,_0x432d0f,_0x7fff15);},Spriteset_Base['prototype'][_0x288220(0x79e)]=function(_0x51bc6a,_0x149496,_0x437e83,_0x81fdd4){const _0xc34145=_0x288220,_0x3bfacf=this[_0xc34145(0x74a)](_0x149496),_0xdc74b5=new(_0x3bfacf?Sprite_AnimationMV:Sprite_Animation)(),_0x3ea3d6=this[_0xc34145(0x748)](_0x51bc6a),_0x31c6b1=this[_0xc34145(0x61c)](),_0x8c48bc=_0x81fdd4>_0x31c6b1?this['lastAnimationSprite']():null;this[_0xc34145(0x25d)](_0x51bc6a[0x0])&&(_0x437e83=!_0x437e83),_0xdc74b5['targetObjects']=_0x51bc6a,_0xdc74b5[_0xc34145(0x540)](_0x3ea3d6,_0x149496,_0x437e83,_0x81fdd4,_0x8c48bc),this['addAnimationSpriteToContainer'](_0xdc74b5),this[_0xc34145(0x7c2)][_0xc34145(0x597)](_0xdc74b5);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x73b)]=function(_0x220d55,_0x384cb8,_0x5b3e8b,_0x4922b0,_0x43db42){const _0x59eead=_0x288220,_0x3a36a0=this[_0x59eead(0x74a)](_0x384cb8),_0x1d014f=new(_0x3a36a0?Sprite_AnimationMV:Sprite_Animation)(),_0x823224=this[_0x59eead(0x748)](_0x220d55);this[_0x59eead(0x25d)](_0x220d55[0x0])&&(_0x5b3e8b=!_0x5b3e8b);_0x1d014f[_0x59eead(0x7d2)]=_0x220d55,_0x1d014f[_0x59eead(0x540)](_0x823224,_0x384cb8,_0x5b3e8b,_0x4922b0),_0x1d014f[_0x59eead(0x67f)](_0x43db42),this[_0x59eead(0x604)](_0x1d014f);if(this[_0x59eead(0x7c2)])this[_0x59eead(0x7c2)]['remove'](_0x1d014f);this[_0x59eead(0x239)][_0x59eead(0x597)](_0x1d014f);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x604)]=function(_0x394e7a){const _0xa4e370=_0x288220;this[_0xa4e370(0x8c7)][_0xa4e370(0x912)](_0x394e7a);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x737)]=function(_0x4a4694){const _0x161932=_0x288220;this[_0x161932(0x7c2)]['remove'](_0x4a4694),this[_0x161932(0x7e0)](_0x4a4694);for(const _0x447de9 of _0x4a4694[_0x161932(0x7d2)]){_0x447de9['endAnimation']&&_0x447de9[_0x161932(0x34e)]();}_0x4a4694[_0x161932(0x337)]();},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x46d)]=function(_0x48b6e8){const _0xc9ccad=_0x288220;this[_0xc9ccad(0x239)]['remove'](_0x48b6e8),this[_0xc9ccad(0x7e0)](_0x48b6e8);for(const _0x68568a of _0x48b6e8[_0xc9ccad(0x7d2)]){_0x68568a['endAnimation']&&_0x68568a['endAnimation']();}_0x48b6e8[_0xc9ccad(0x337)]();},Spriteset_Base['prototype'][_0x288220(0x7e0)]=function(_0x2c48d8){const _0x173df5=_0x288220;this[_0x173df5(0x8c7)]['removeChild'](_0x2c48d8);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x2df)]=function(){const _0x23c96d=_0x288220;for(const _0x451fc0 of this[_0x23c96d(0x239)]){this[_0x23c96d(0x46d)](_0x451fc0);}},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x533)]=function(){const _0x2c5643=_0x288220;return this[_0x2c5643(0x239)]['length']>0x0;},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x24d)]=function(){const _0x39b3fb=_0x288220;for(const _0x955abb of this[_0x39b3fb(0x24c)]){!_0x955abb[_0x39b3fb(0x621)]()&&this[_0x39b3fb(0x782)](_0x955abb);}this['processPointAnimationRequests']();},Spriteset_Base[_0x288220(0x93f)]['processPointAnimationRequests']=function(){const _0x2e259d=_0x288220;for(;;){const _0x121429=$gameTemp[_0x2e259d(0x7cd)]();if(_0x121429)this[_0x2e259d(0x821)](_0x121429);else break;}},Spriteset_Base['prototype'][_0x288220(0x821)]=function(_0x36cf3a){const _0xd5f74b=_0x288220,_0x1f205d=$dataAnimations[_0x36cf3a[_0xd5f74b(0x8e7)]],_0x558bb0=this[_0xd5f74b(0x567)](_0x36cf3a),_0x13ea59=_0x36cf3a[_0xd5f74b(0x67c)],_0xc11b20=_0x36cf3a[_0xd5f74b(0x5d0)];let _0x522f2b=this['animationBaseDelay']();const _0xe1780c=this[_0xd5f74b(0x92b)]();if(this[_0xd5f74b(0x8ac)](_0x1f205d))for(const _0xfd0397 of _0x558bb0){this[_0xd5f74b(0x372)]([_0xfd0397],_0x1f205d,_0x13ea59,_0x522f2b,_0xc11b20),_0x522f2b+=_0xe1780c;}else this[_0xd5f74b(0x372)](_0x558bb0,_0x1f205d,_0x13ea59,_0x522f2b,_0xc11b20);},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x567)]=function(_0x22ec8c){const _0x1b35fb=_0x288220,_0x215a6f=new Sprite_Clickable(),_0x6e2cf0=this['getPointAnimationLayer']();_0x215a6f['x']=_0x22ec8c['x']-_0x6e2cf0['x'],_0x215a6f['y']=_0x22ec8c['y']-_0x6e2cf0['y'],_0x215a6f['z']=0x64;const _0x2d898f=this[_0x1b35fb(0x3d9)]();return _0x2d898f['addChild'](_0x215a6f),[_0x215a6f];},Spriteset_Base['prototype'][_0x288220(0x3d9)]=function(){return this;},Spriteset_Map[_0x288220(0x93f)][_0x288220(0x3d9)]=function(){const _0x4bc0a5=_0x288220;return this[_0x4bc0a5(0x83e)]||this;},Spriteset_Battle['prototype'][_0x288220(0x3d9)]=function(){const _0x1e091b=_0x288220;return this[_0x1e091b(0x9a5)]||this;},Spriteset_Base[_0x288220(0x93f)]['createPointAnimationSprite']=function(_0x5690d1,_0x5d8bea,_0x14fae3,_0x3b9272,_0x324733){const _0x592f69=_0x288220,_0x137d08=this[_0x592f69(0x74a)](_0x5d8bea),_0x50d44b=new(_0x137d08?Sprite_AnimationMV:Sprite_Animation)();_0x50d44b[_0x592f69(0x7d2)]=_0x5690d1,_0x50d44b[_0x592f69(0x540)](_0x5690d1,_0x5d8bea,_0x14fae3,_0x3b9272),_0x50d44b['setMute'](_0x324733),this['addAnimationSpriteToContainer'](_0x50d44b),this[_0x592f69(0x24c)][_0x592f69(0x597)](_0x50d44b);},Spriteset_Base[_0x288220(0x93f)]['removePointAnimation']=function(_0x2d1403){const _0x1c6a0d=_0x288220;this[_0x1c6a0d(0x24c)][_0x1c6a0d(0x712)](_0x2d1403),this[_0x1c6a0d(0x8c7)][_0x1c6a0d(0x2a9)](_0x2d1403);for(const _0x493369 of _0x2d1403[_0x1c6a0d(0x7d2)]){_0x493369[_0x1c6a0d(0x34e)]&&_0x493369[_0x1c6a0d(0x34e)]();const _0x84cda6=this[_0x1c6a0d(0x3d9)]();if(_0x84cda6)_0x84cda6[_0x1c6a0d(0x2a9)](_0x493369);}_0x2d1403[_0x1c6a0d(0x337)]();},Spriteset_Base[_0x288220(0x93f)][_0x288220(0x90d)]=function(){const _0x398a24=_0x288220;for(const _0x1add2e of this[_0x398a24(0x24c)]){this[_0x398a24(0x782)](_0x1add2e);}},Spriteset_Base[_0x288220(0x93f)]['isPointAnimationPlaying']=function(){const _0x4f1354=_0x288220;return this[_0x4f1354(0x24c)]['length']>0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x37d)]=Spriteset_Base['prototype'][_0x288220(0x497)],Spriteset_Base[_0x288220(0x93f)][_0x288220(0x497)]=function(){const _0x193282=_0x288220;return VisuMZ[_0x193282(0x665)]['Spriteset_Base_isAnimationPlaying'][_0x193282(0x6c3)](this)||this[_0x193282(0x979)]();},Spriteset_Map[_0x288220(0x5aa)]=VisuMZ['CoreEngine']['Settings'][_0x288220(0x23d)][_0x288220(0x8b3)]||![],VisuMZ['CoreEngine'][_0x288220(0x33b)]=Scene_Map[_0x288220(0x93f)]['createSpriteset'],Scene_Map['prototype'][_0x288220(0x428)]=function(){const _0x255701=_0x288220;VisuMZ[_0x255701(0x665)][_0x255701(0x33b)][_0x255701(0x6c3)](this);if(!Spriteset_Map[_0x255701(0x5aa)])return;const _0x158d9e=this[_0x255701(0x5de)];if(!_0x158d9e)return;this[_0x255701(0x554)]=_0x158d9e[_0x255701(0x554)];if(!this['_pictureContainer'])return;this[_0x255701(0x912)](this[_0x255701(0x554)]);},VisuMZ['CoreEngine']['Spriteset_Map_createTilemap']=Spriteset_Map[_0x288220(0x93f)][_0x288220(0x410)],Spriteset_Map[_0x288220(0x93f)][_0x288220(0x410)]=function(){const _0x5c6254=_0x288220;VisuMZ['CoreEngine'][_0x5c6254(0x93d)]['call'](this),this[_0x5c6254(0x4b6)]();},Spriteset_Map[_0x288220(0x93f)][_0x288220(0x4b6)]=function(){const _0x2748ca=_0x288220,_0x4a9da5=$gameMap[_0x2748ca(0x30e)]();if(!_0x4a9da5)return;const _0x211d2a=$gameMap['getTileExtendTerrainTags']();if(Object[_0x2748ca(0x916)](_0x211d2a)[_0x2748ca(0x2cd)]<=0x0)return;const _0x55eb0d=$gameMap[_0x2748ca(0x4e7)]();this[_0x2748ca(0x2f4)]=this[_0x2748ca(0x2f4)]||[];for(let _0x2ec4df=0x0;_0x2ec4df<$gameMap['height']();_0x2ec4df++){for(let _0x1e35e0=0x0;_0x1e35e0<$gameMap[_0x2748ca(0x426)]();_0x1e35e0++){for(const _0x295306 of $gameMap[_0x2748ca(0x7d0)](_0x1e35e0,_0x2ec4df)){const _0x18816a=_0x55eb0d[_0x295306]>>0xc,_0x106290=_0x211d2a[_0x18816a]||0x0;if(_0x106290<=0x0)continue;this[_0x2748ca(0x921)](_0x1e35e0,_0x2ec4df,_0x295306,_0x106290);}}}},Spriteset_Map[_0x288220(0x93f)][_0x288220(0x94c)]=function(){const _0x3fd5be=_0x288220;this[_0x3fd5be(0x2f4)]=this['_tileExtendSprites']||[];for(const _0x40cb11 of this[_0x3fd5be(0x2f4)]){this[_0x3fd5be(0x83e)]['removeChild'](_0x40cb11);}this[_0x3fd5be(0x2f4)]=[];},Spriteset_Map[_0x288220(0x93f)]['createExtendedTileSprite']=function(_0x4c4778,_0x25d080,_0x107455,_0x39b394){const _0x297d17=_0x288220,_0x91d2e2=new Sprite_ExtendedTile(_0x4c4778,_0x25d080,_0x107455,_0x39b394),_0x12773c=$gameMap[_0x297d17(0x4e7)]();_0x12773c[_0x107455]&0x10?_0x91d2e2['z']=0x4:_0x91d2e2['z']=0x3,this[_0x297d17(0x83e)]['addChild'](_0x91d2e2),this[_0x297d17(0x2f4)][_0x297d17(0x597)](_0x91d2e2);},VisuMZ['CoreEngine'][_0x288220(0x1fa)]=Tilemap[_0x288220(0x93f)]['_addSpotTile'],Tilemap[_0x288220(0x93f)][_0x288220(0x369)]=function(_0xa72346,_0x5061d7,_0x576707){const _0x422097=_0x288220;if($gameMap['isTileExtended'](_0xa72346))return;VisuMZ['CoreEngine']['Tilemap_addSpotTile'][_0x422097(0x6c3)](this,_0xa72346,_0x5061d7,_0x576707);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x23d)]['DetachBattlePictureContainer']||![],VisuMZ['CoreEngine'][_0x288220(0x414)]=Scene_Battle[_0x288220(0x93f)][_0x288220(0x428)],Scene_Battle['prototype'][_0x288220(0x428)]=function(){const _0x296f28=_0x288220;VisuMZ[_0x296f28(0x665)][_0x296f28(0x414)][_0x296f28(0x6c3)](this);if(!Spriteset_Battle[_0x296f28(0x5aa)])return;const _0x529d90=this[_0x296f28(0x5de)];if(!_0x529d90)return;this[_0x296f28(0x554)]=_0x529d90[_0x296f28(0x554)];if(!this[_0x296f28(0x554)])return;this['addChild'](this[_0x296f28(0x554)]);},Spriteset_Battle[_0x288220(0x93f)][_0x288220(0x3ee)]=function(){const _0x53cf16=_0x288220;this[_0x53cf16(0x530)]=new PIXI[(_0x53cf16(0x86b))][(_0x53cf16(0x3bd))](clamp=!![]),this[_0x53cf16(0x3ed)]=new Sprite(),this[_0x53cf16(0x3ed)][_0x53cf16(0x421)]=SceneManager[_0x53cf16(0x8cb)](),this[_0x53cf16(0x3ed)]['filters']=[this[_0x53cf16(0x530)]],this['_baseSprite']['addChild'](this['_backgroundSprite']);},VisuMZ[_0x288220(0x665)][_0x288220(0x7b5)]=Spriteset_Battle[_0x288220(0x93f)][_0x288220(0x3f5)],Spriteset_Battle[_0x288220(0x93f)][_0x288220(0x3f5)]=function(){const _0x1d7121=_0x288220;this[_0x1d7121(0x75f)]()&&this[_0x1d7121(0x5f3)](),VisuMZ[_0x1d7121(0x665)]['Spriteset_Battle_createEnemies'][_0x1d7121(0x6c3)](this);},Spriteset_Battle[_0x288220(0x93f)][_0x288220(0x75f)]=function(){const _0x8c50a2=_0x288220,_0x53d490=VisuMZ['CoreEngine']['Settings'][_0x8c50a2(0x8d4)];if(!_0x53d490)return![];if(Utils[_0x8c50a2(0x7bd)]>='1.3.0'&&!_0x53d490[_0x8c50a2(0x4bf)])return![];return _0x53d490['RepositionEnemies'];},Spriteset_Battle['prototype'][_0x288220(0x5f3)]=function(){const _0xb2ed21=_0x288220;for(member of $gameTroop[_0xb2ed21(0x8e8)]()){member[_0xb2ed21(0x30d)]();}},VisuMZ[_0x288220(0x665)][_0x288220(0x547)]=Window_Base[_0x288220(0x93f)][_0x288220(0x501)],Window_Base[_0x288220(0x93f)][_0x288220(0x501)]=function(_0x2c1021){const _0x3fb66f=_0x288220;_0x2c1021['x']=Math['round'](_0x2c1021['x']),_0x2c1021['y']=Math['round'](_0x2c1021['y']),_0x2c1021[_0x3fb66f(0x426)]=Math['round'](_0x2c1021[_0x3fb66f(0x426)]),_0x2c1021['height']=Math['round'](_0x2c1021[_0x3fb66f(0x4b9)]),this[_0x3fb66f(0x4cc)](),VisuMZ[_0x3fb66f(0x665)]['Window_Base_initialize'][_0x3fb66f(0x6c3)](this,_0x2c1021),this[_0x3fb66f(0x5bc)]();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x104b8d=_0x288220;this['_digitGrouping']=VisuMZ[_0x104b8d(0x665)][_0x104b8d(0x30a)]['QoL'][_0x104b8d(0x440)],this[_0x104b8d(0x310)]=VisuMZ[_0x104b8d(0x665)][_0x104b8d(0x30a)]['QoL'][_0x104b8d(0x545)];},Window_Base[_0x288220(0x93f)][_0x288220(0x91b)]=function(){const _0xbc093f=_0x288220;return VisuMZ[_0xbc093f(0x665)][_0xbc093f(0x30a)][_0xbc093f(0x34b)]['LineHeight'];},Window_Base[_0x288220(0x93f)][_0x288220(0x8a9)]=function(){const _0x2d6ece=_0x288220;return VisuMZ[_0x2d6ece(0x665)]['Settings'][_0x2d6ece(0x34b)]['ItemPadding'];},Window_Base['prototype']['updateBackOpacity']=function(){const _0x1241ab=_0x288220;$gameSystem[_0x1241ab(0x202)]?this[_0x1241ab(0x1d9)]=$gameSystem[_0x1241ab(0x202)]():this[_0x1241ab(0x1d9)]=VisuMZ[_0x1241ab(0x665)]['Settings'][_0x1241ab(0x34b)]['BackOpacity'];},Window_Base[_0x288220(0x93f)][_0x288220(0x892)]=function(){const _0x3824d0=_0x288220;return VisuMZ[_0x3824d0(0x665)][_0x3824d0(0x30a)][_0x3824d0(0x34b)][_0x3824d0(0x5fb)];},Window_Base[_0x288220(0x93f)][_0x288220(0x6ca)]=function(){const _0x103a04=_0x288220;return VisuMZ[_0x103a04(0x665)][_0x103a04(0x30a)][_0x103a04(0x34b)]['OpenSpeed'];},VisuMZ[_0x288220(0x665)][_0x288220(0x5a8)]=Window_Base[_0x288220(0x93f)][_0x288220(0x508)],Window_Base[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x5f0705=_0x288220;VisuMZ[_0x5f0705(0x665)][_0x5f0705(0x5a8)][_0x5f0705(0x6c3)](this),this[_0x5f0705(0x3ce)]();},Window_Base[_0x288220(0x93f)][_0x288220(0x543)]=function(){const _0x1496ba=_0x288220;this[_0x1496ba(0x814)]&&(this[_0x1496ba(0x280)]+=this['openingSpeed'](),this[_0x1496ba(0x98d)]()&&(this[_0x1496ba(0x814)]=![]));},Window_Base[_0x288220(0x93f)][_0x288220(0x3de)]=function(){const _0x43f85a=_0x288220;this[_0x43f85a(0x647)]&&(this['openness']-=this['openingSpeed'](),this[_0x43f85a(0x936)]()&&(this['_closing']=![]));},VisuMZ['CoreEngine'][_0x288220(0x26d)]=Window_Base[_0x288220(0x93f)]['drawText'],Window_Base[_0x288220(0x93f)][_0x288220(0x3d0)]=function(_0x4ccaa4,_0x41a76c,_0x26d272,_0x547b92,_0x22c74a){const _0x40c9d0=_0x288220;if(this[_0x40c9d0(0x7e7)]())_0x4ccaa4=VisuMZ[_0x40c9d0(0x67e)](_0x4ccaa4);VisuMZ[_0x40c9d0(0x665)][_0x40c9d0(0x26d)][_0x40c9d0(0x6c3)](this,_0x4ccaa4,_0x41a76c,_0x26d272,_0x547b92,_0x22c74a);},Window_Base['prototype'][_0x288220(0x7e7)]=function(){return this['_digitGrouping'];},VisuMZ[_0x288220(0x665)][_0x288220(0x50a)]=Window_Base[_0x288220(0x93f)][_0x288220(0x639)],Window_Base['prototype'][_0x288220(0x639)]=function(_0x2d2c47,_0x3d7ec5,_0x5cb1a8,_0x10644c){const _0x4728a9=_0x288220;var _0xde8b29=VisuMZ[_0x4728a9(0x665)][_0x4728a9(0x50a)]['call'](this,_0x2d2c47,_0x3d7ec5,_0x5cb1a8,_0x10644c);if(this[_0x4728a9(0x5e2)]())_0xde8b29[_0x4728a9(0x477)]=String(VisuMZ['GroupDigits'](_0xde8b29['text']))||'';return _0xde8b29;},Window_Base['prototype'][_0x288220(0x5e2)]=function(){const _0xa60a7a=_0x288220;return this[_0xa60a7a(0x310)];},Window_Base[_0x288220(0x93f)]['enableDigitGrouping']=function(_0x50780a){this['_digitGrouping']=_0x50780a;},Window_Base[_0x288220(0x93f)]['enableDigitGroupingEx']=function(_0x21badd){this['_digitGroupingEx']=_0x21badd;},VisuMZ[_0x288220(0x665)][_0x288220(0x399)]=Window_Base[_0x288220(0x93f)][_0x288220(0x1df)],Window_Base[_0x288220(0x93f)]['drawIcon']=function(_0x12d1cf,_0x1f77af,_0x4213f7){const _0x4241a7=_0x288220;_0x1f77af=Math['round'](_0x1f77af),_0x4213f7=Math[_0x4241a7(0x3ff)](_0x4213f7),VisuMZ['CoreEngine'][_0x4241a7(0x399)][_0x4241a7(0x6c3)](this,_0x12d1cf,_0x1f77af,_0x4213f7);},VisuMZ['CoreEngine'][_0x288220(0x80d)]=Window_Base['prototype'][_0x288220(0x3a3)],Window_Base[_0x288220(0x93f)][_0x288220(0x3a3)]=function(_0x4d7f1a,_0x1cd976,_0x5e7b66,_0x1109c4,_0x138700,_0x5b1f36){const _0x406d66=_0x288220;_0x138700=_0x138700||ImageManager[_0x406d66(0x26f)],_0x5b1f36=_0x5b1f36||ImageManager[_0x406d66(0x53c)],_0x5e7b66=Math[_0x406d66(0x3ff)](_0x5e7b66),_0x1109c4=Math[_0x406d66(0x3ff)](_0x1109c4),_0x138700=Math[_0x406d66(0x3ff)](_0x138700),_0x5b1f36=Math[_0x406d66(0x3ff)](_0x5b1f36),VisuMZ['CoreEngine'][_0x406d66(0x80d)]['call'](this,_0x4d7f1a,_0x1cd976,_0x5e7b66,_0x1109c4,_0x138700,_0x5b1f36);},VisuMZ['CoreEngine'][_0x288220(0x817)]=Window_Base[_0x288220(0x93f)][_0x288220(0x281)],Window_Base[_0x288220(0x93f)][_0x288220(0x281)]=function(_0x1d607e,_0x14c36,_0x5c5249,_0x5d611c){const _0x35312d=_0x288220;_0x5c5249=Math['round'](_0x5c5249),_0x5d611c=Math['round'](_0x5d611c),VisuMZ['CoreEngine'][_0x35312d(0x817)][_0x35312d(0x6c3)](this,_0x1d607e,_0x14c36,_0x5c5249,_0x5d611c);},VisuMZ[_0x288220(0x665)][_0x288220(0x726)]=Window_Selectable[_0x288220(0x93f)][_0x288220(0x291)],Window_Selectable[_0x288220(0x93f)][_0x288220(0x291)]=function(_0x2848ff){const _0x4eee59=_0x288220;let _0x5a75e6=VisuMZ[_0x4eee59(0x665)][_0x4eee59(0x726)][_0x4eee59(0x6c3)](this,_0x2848ff);return _0x5a75e6['x']=Math['round'](_0x5a75e6['x']),_0x5a75e6['y']=Math['round'](_0x5a75e6['y']),_0x5a75e6[_0x4eee59(0x426)]=Math['round'](_0x5a75e6[_0x4eee59(0x426)]),_0x5a75e6[_0x4eee59(0x4b9)]=Math['round'](_0x5a75e6[_0x4eee59(0x4b9)]),_0x5a75e6;},VisuMZ[_0x288220(0x665)][_0x288220(0x62c)]=Window_StatusBase[_0x288220(0x93f)][_0x288220(0x6d6)],Window_StatusBase[_0x288220(0x93f)]['drawActorSimpleStatus']=function(_0x104b2,_0x34db72,_0x5e7211){const _0xaca937=_0x288220;_0x34db72=Math[_0xaca937(0x3ff)](_0x34db72),_0x5e7211=Math[_0xaca937(0x3ff)](_0x5e7211),VisuMZ[_0xaca937(0x665)][_0xaca937(0x62c)][_0xaca937(0x6c3)](this,_0x104b2,_0x34db72,_0x5e7211);},Window_Base['prototype'][_0x288220(0x5bc)]=function(){const _0x5c6d7=_0x288220;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x5c6d7(0x451)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x5c6d7(0x1d9)],'targetContentsOpacity':this[_0x5c6d7(0x93e)]};},Window_Base[_0x288220(0x93f)][_0x288220(0x3ce)]=function(){const _0x2e5be7=_0x288220;if(!this[_0x2e5be7(0x1f4)])return;if(this[_0x2e5be7(0x1f4)][_0x2e5be7(0x35a)]<=0x0)return;this['x']=this[_0x2e5be7(0x984)](this['x'],this[_0x2e5be7(0x1f4)][_0x2e5be7(0x859)]),this['y']=this[_0x2e5be7(0x984)](this['y'],this['_coreEasing'][_0x2e5be7(0x430)]),this[_0x2e5be7(0x451)]['x']=this[_0x2e5be7(0x984)](this[_0x2e5be7(0x451)]['x'],this[_0x2e5be7(0x1f4)][_0x2e5be7(0x389)]),this['scale']['y']=this[_0x2e5be7(0x984)](this[_0x2e5be7(0x451)]['y'],this[_0x2e5be7(0x1f4)]['targetScaleY']),this['opacity']=this[_0x2e5be7(0x984)](this['opacity'],this['_coreEasing'][_0x2e5be7(0x8b4)]),this['backOpacity']=this['applyCoreEasing'](this['backOpacity'],this[_0x2e5be7(0x1f4)][_0x2e5be7(0x99b)]),this[_0x2e5be7(0x93e)]=this[_0x2e5be7(0x984)](this[_0x2e5be7(0x93e)],this[_0x2e5be7(0x1f4)][_0x2e5be7(0x758)]),this[_0x2e5be7(0x1f4)][_0x2e5be7(0x35a)]--;},Window_Base[_0x288220(0x93f)]['applyCoreEasing']=function(_0x8ee7cd,_0x3e422f){const _0x5caa2e=_0x288220;if(!this[_0x5caa2e(0x1f4)])return _0x3e422f;const _0x188fde=this[_0x5caa2e(0x1f4)][_0x5caa2e(0x35a)],_0x56a511=this[_0x5caa2e(0x1f4)][_0x5caa2e(0x4f5)],_0x4bf6f2=this[_0x5caa2e(0x36f)]((_0x56a511-_0x188fde)/_0x56a511),_0x8c557d=this[_0x5caa2e(0x36f)]((_0x56a511-_0x188fde+0x1)/_0x56a511),_0x58223a=(_0x8ee7cd-_0x3e422f*_0x4bf6f2)/(0x1-_0x4bf6f2);return _0x58223a+(_0x3e422f-_0x58223a)*_0x8c557d;},Window_Base[_0x288220(0x93f)][_0x288220(0x36f)]=function(_0x5392dc){const _0x255d9a=_0x288220;if(!this['_coreEasing'])return _0x5392dc;return VisuMZ[_0x255d9a(0x693)](_0x5392dc,this['_coreEasing']['type']||'LINEAR');},Window_Base['prototype'][_0x288220(0x85c)]=function(_0x1c4476,_0x566448){const _0x12cea8=_0x288220;if(!this['_coreEasing'])return;this['x']=this[_0x12cea8(0x1f4)][_0x12cea8(0x859)],this['y']=this['_coreEasing'][_0x12cea8(0x430)],this[_0x12cea8(0x451)]['x']=this[_0x12cea8(0x1f4)][_0x12cea8(0x389)],this[_0x12cea8(0x451)]['y']=this[_0x12cea8(0x1f4)][_0x12cea8(0x992)],this[_0x12cea8(0x411)]=this[_0x12cea8(0x1f4)]['targetOpacity'],this[_0x12cea8(0x1d9)]=this[_0x12cea8(0x1f4)][_0x12cea8(0x99b)],this['contentsOpacity']=this[_0x12cea8(0x1f4)][_0x12cea8(0x758)],this[_0x12cea8(0x4f1)](_0x1c4476,_0x566448,this['x'],this['y'],this['scale']['x'],this['scale']['y'],this['opacity'],this['backOpacity'],this[_0x12cea8(0x93e)]);},Window_Base[_0x288220(0x93f)][_0x288220(0x4f1)]=function(_0x3ab0fb,_0x147137,_0x47721e,_0x299308,_0x297a3a,_0xea7058,_0x3bb8a6,_0x1d06fb,_0x15d217){const _0x1f3c0b=_0x288220;this[_0x1f3c0b(0x1f4)]={'duration':_0x3ab0fb,'wholeDuration':_0x3ab0fb,'type':_0x147137,'targetX':_0x47721e,'targetY':_0x299308,'targetScaleX':_0x297a3a,'targetScaleY':_0xea7058,'targetOpacity':_0x3bb8a6,'targetBackOpacity':_0x1d06fb,'targetContentsOpacity':_0x15d217};},Window_Base[_0x288220(0x93f)][_0x288220(0x760)]=function(_0x3c5f92,_0x387aef,_0x2e6a94,_0x22cb52,_0x42ca03){const _0x27a9a8=_0x288220;this[_0x27a9a8(0x90a)](),this[_0x27a9a8(0x244)][_0x27a9a8(0x4d6)]=VisuMZ[_0x27a9a8(0x665)][_0x27a9a8(0x30a)][_0x27a9a8(0x552)][_0x27a9a8(0x455)];const _0x3d26ee=VisuMZ[_0x27a9a8(0x665)][_0x27a9a8(0x30a)]['Gold']['GoldIcon'];if(_0x3d26ee>0x0&&_0x387aef===TextManager['currencyUnit']){const _0x20e9c0=_0x22cb52+(this[_0x27a9a8(0x91b)]()-ImageManager[_0x27a9a8(0x5ae)])/0x2;this[_0x27a9a8(0x1df)](_0x3d26ee,_0x2e6a94+(_0x42ca03-ImageManager[_0x27a9a8(0x882)]),_0x20e9c0),_0x42ca03-=ImageManager[_0x27a9a8(0x882)]+0x4;}else this[_0x27a9a8(0x433)](ColorManager['systemColor']()),this[_0x27a9a8(0x3d0)](_0x387aef,_0x2e6a94,_0x22cb52,_0x42ca03,'right'),_0x42ca03-=this[_0x27a9a8(0x5a9)](_0x387aef)+0x6;this[_0x27a9a8(0x5fa)]();const _0x560efe=this[_0x27a9a8(0x5a9)](this['_digitGrouping']?VisuMZ[_0x27a9a8(0x67e)](_0x3c5f92):_0x3c5f92);_0x560efe>_0x42ca03?this[_0x27a9a8(0x3d0)](VisuMZ['CoreEngine']['Settings'][_0x27a9a8(0x552)][_0x27a9a8(0x7bb)],_0x2e6a94,_0x22cb52,_0x42ca03,_0x27a9a8(0x711)):this[_0x27a9a8(0x3d0)](_0x3c5f92,_0x2e6a94,_0x22cb52,_0x42ca03,'right'),this[_0x27a9a8(0x90a)]();},Window_Base[_0x288220(0x93f)][_0x288220(0x94e)]=function(_0x260aca,_0x30e78d,_0x5def8f,_0x1508f8,_0x46fc6a){const _0x36bb9a=_0x288220,_0x4be876=ImageManager['loadSystem']('IconSet'),_0x17717d=ImageManager['iconWidth'],_0x2c93fa=ImageManager[_0x36bb9a(0x5ae)],_0x8ac965=_0x260aca%0x10*_0x17717d,_0x318b98=Math[_0x36bb9a(0x25e)](_0x260aca/0x10)*_0x2c93fa,_0x2451c8=_0x1508f8,_0x5e5b6b=_0x1508f8;this[_0x36bb9a(0x244)][_0x36bb9a(0x3bb)][_0x36bb9a(0x4ec)]=_0x46fc6a,this[_0x36bb9a(0x244)][_0x36bb9a(0x7a1)](_0x4be876,_0x8ac965,_0x318b98,_0x17717d,_0x2c93fa,_0x30e78d,_0x5def8f,_0x2451c8,_0x5e5b6b),this['contents']['_context'][_0x36bb9a(0x4ec)]=!![];},Window_Base[_0x288220(0x93f)][_0x288220(0x38d)]=function(_0x449300,_0x2c6c25,_0x152f2a,_0x2d09b0,_0x2fb46c,_0xf30e2c){const _0x3df855=_0x288220,_0x486344=Math[_0x3df855(0x25e)]((_0x152f2a-0x2)*_0x2d09b0),_0x187b28=Sprite_Gauge[_0x3df855(0x93f)][_0x3df855(0x4c6)][_0x3df855(0x6c3)](this),_0x26be6f=_0x2c6c25+this[_0x3df855(0x91b)]()-_0x187b28-0x2;this['contents'][_0x3df855(0x363)](_0x449300,_0x26be6f,_0x152f2a,_0x187b28,ColorManager[_0x3df855(0x7de)]()),this[_0x3df855(0x244)]['gradientFillRect'](_0x449300+0x1,_0x26be6f+0x1,_0x486344,_0x187b28-0x2,_0x2fb46c,_0xf30e2c);},Window_Scrollable[_0x288220(0x4a0)]={'enabled':VisuMZ['CoreEngine'][_0x288220(0x30a)][_0x288220(0x34b)][_0x288220(0x1e4)]??!![],'thickness':VisuMZ['CoreEngine'][_0x288220(0x30a)][_0x288220(0x34b)]['BarThickness']??0x2,'offset':VisuMZ['CoreEngine']['Settings']['Window']['BarOffset']??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x288220(0x30a)]['Window'][_0x288220(0x216)]??0x0,'offColor':VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x34b)]['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['Window'][_0x288220(0x5da)]??0x80},Window_Base['prototype'][_0x288220(0x939)]=function(){const _0x1b11f0=_0x288220;return Window_Scrollable['SCROLLBAR'][_0x1b11f0(0x969)]&&Window_Scrollable['SCROLLBAR'][_0x1b11f0(0x28c)]>0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x61d)]=Window_Base[_0x288220(0x93f)][_0x288220(0x903)],Window_Base[_0x288220(0x93f)]['createContents']=function(){const _0x1e006e=_0x288220;VisuMZ[_0x1e006e(0x665)][_0x1e006e(0x61d)][_0x1e006e(0x6c3)](this),this['createScrollBarSprites'](),this['setupScrollBarBitmap'](!![]),this[_0x1e006e(0x2be)](![]);},Window_Base['prototype']['createScrollBarSprites']=function(){const _0x15d912=_0x288220;if(!this[_0x15d912(0x939)]())return;if(this[_0x15d912(0x4e3)]||this['_scrollBarVert'])return;this[_0x15d912(0x784)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x15d912(0x4e3)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x15d912(0x912)](this[_0x15d912(0x4e3)]),this['addChild'](this[_0x15d912(0x5a6)]);},Window_Base[_0x288220(0x93f)][_0x288220(0x2be)]=function(_0x585a39){const _0x1b1aee=_0x288220,_0x5eb79d=_0x585a39?this[_0x1b1aee(0x4e3)]:this['_scrollBarVert'];if(!_0x5eb79d)return;const _0x1687e8=Window_Scrollable[_0x1b1aee(0x4a0)],_0x176b20=_0x1687e8[_0x1b1aee(0x28c)],_0xa2cb81=_0x585a39?this[_0x1b1aee(0x5d5)]-_0x176b20*0x2:_0x176b20,_0x20daf1=_0x585a39?_0x176b20:this[_0x1b1aee(0x81a)]-_0x176b20*0x2;_0x5eb79d[_0x1b1aee(0x421)]=new Bitmap(_0xa2cb81,_0x20daf1),_0x5eb79d[_0x1b1aee(0x3b9)](0x0,0x0,_0xa2cb81,_0x20daf1),this[_0x1b1aee(0x93c)](_0x585a39);},VisuMZ[_0x288220(0x665)][_0x288220(0x1d0)]=Window_Base[_0x288220(0x93f)][_0x288220(0x2fe)],Window_Base['prototype'][_0x288220(0x2fe)]=function(){const _0x557062=_0x288220;VisuMZ[_0x557062(0x665)][_0x557062(0x1d0)]['call'](this),this[_0x557062(0x270)]();},Window_Base[_0x288220(0x93f)][_0x288220(0x270)]=function(){const _0x5ac90e=_0x288220,_0xa0b4bd=[this['_scrollBarHorz'],this[_0x5ac90e(0x5a6)]];for(const _0x241e82 of _0xa0b4bd){if(_0x241e82&&_0x241e82[_0x5ac90e(0x421)])_0x241e82['bitmap'][_0x5ac90e(0x337)]();}},VisuMZ[_0x288220(0x665)][_0x288220(0x842)]=Window_Scrollable[_0x288220(0x93f)][_0x288220(0x508)],Window_Scrollable[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x9c5621=_0x288220;VisuMZ[_0x9c5621(0x665)][_0x9c5621(0x842)][_0x9c5621(0x6c3)](this),this['updateScrollBars']();},Window_Scrollable['prototype'][_0x288220(0x536)]=function(){const _0xe69596=_0x288220;this['updateScrollBarVisibility'](),this['checkScrollBarBitmap'](!![]),this['checkScrollBarBitmap'](![]),this['updateScrollBarPosition'](!![]),this[_0xe69596(0x93c)](![]);},Window_Scrollable['prototype']['updateScrollBarVisibility']=function(){const _0x3b48c3=_0x288220,_0x2081e4=[this[_0x3b48c3(0x4e3)],this[_0x3b48c3(0x5a6)]];for(const _0x497f81 of _0x2081e4){_0x497f81&&(_0x497f81['visible']=this[_0x3b48c3(0x939)]()&&this[_0x3b48c3(0x98d)]());}},Window_Scrollable['prototype'][_0x288220(0x3b6)]=function(_0xeecb0){const _0x1c0ac9=_0x288220;if(!this[_0x1c0ac9(0x784)])return;const _0x25400d=this[_0x1c0ac9(0x5b4)](_0xeecb0),_0x22ca2b=this[_0x1c0ac9(0x243)](_0xeecb0),_0x228b20=_0xeecb0?'horz':'vert',_0x10948f=_0xeecb0?'maxHorz':_0x1c0ac9(0x733);(this[_0x1c0ac9(0x784)][_0x228b20]!==_0x25400d||this[_0x1c0ac9(0x784)][_0x10948f]!==_0x22ca2b)&&(this['_lastScrollBarValues'][_0x228b20]=_0x25400d,this[_0x1c0ac9(0x784)][_0x10948f]=_0x22ca2b,this[_0x1c0ac9(0x4b3)](_0xeecb0,_0x25400d,_0x22ca2b));},Window_Scrollable[_0x288220(0x93f)][_0x288220(0x5b4)]=function(_0x14acd5){const _0x228d79=_0x288220;if(this[_0x228d79(0x66d)]!==undefined)return _0x14acd5?this[_0x228d79(0x799)]():this[_0x228d79(0x5be)]['y'];return _0x14acd5?this[_0x228d79(0x799)]():this[_0x228d79(0x7b1)]();},Window_Scrollable[_0x288220(0x93f)][_0x288220(0x243)]=function(_0x50821e){const _0x371119=_0x288220;if(this[_0x371119(0x66d)]!==undefined)return _0x50821e?this[_0x371119(0x4d5)]():Math[_0x371119(0x6de)](0x0,this[_0x371119(0x66d)]-this[_0x371119(0x81a)]);return _0x50821e?this[_0x371119(0x4d5)]():this['maxScrollY']();},Window_Scrollable[_0x288220(0x93f)]['scrollbarHeight']=function(){const _0x28b235=_0x288220;if(this[_0x28b235(0x66d)]!==undefined)return Math['max'](0x0,this[_0x28b235(0x66d)]);return this[_0x28b235(0x49b)]();},Window_Scrollable[_0x288220(0x93f)][_0x288220(0x4b3)]=function(_0x446504,_0x500515,_0x3bd170){const _0x3199e4=_0x288220,_0x12a849=_0x446504?this[_0x3199e4(0x4e3)]:this[_0x3199e4(0x5a6)];if(!_0x12a849)return;if(!_0x12a849['bitmap'])return;const _0x4fe145=_0x12a849[_0x3199e4(0x421)];_0x4fe145[_0x3199e4(0x895)]();if(_0x3bd170<=0x0)return;const _0x15cfc3=_0x446504?this[_0x3199e4(0x5d5)]/this['overallWidth']():this[_0x3199e4(0x81a)]/this['scrollbarHeight'](),_0x36e5ce=_0x446504?Math['round'](_0x500515*_0x15cfc3):0x0,_0x5e2859=_0x446504?0x0:Math[_0x3199e4(0x3ff)](_0x500515*_0x15cfc3),_0xb39cf9=_0x446504?Math[_0x3199e4(0x3ff)](_0x4fe145[_0x3199e4(0x426)]*_0x15cfc3):_0x4fe145['width'],_0xb86de1=_0x446504?_0x4fe145[_0x3199e4(0x4b9)]:Math[_0x3199e4(0x3ff)](_0x4fe145[_0x3199e4(0x4b9)]*_0x15cfc3),_0x5160d6=Window_Scrollable[_0x3199e4(0x4a0)],_0x588b41=ColorManager[_0x3199e4(0x76c)](_0x5160d6[_0x3199e4(0x966)]),_0x2fb4c6=ColorManager[_0x3199e4(0x76c)](_0x5160d6[_0x3199e4(0x8a3)]),_0x452d1d=_0x5160d6['offOpacity'];_0x4fe145['paintOpacity']=_0x452d1d,_0x4fe145[_0x3199e4(0x21c)](_0x588b41),_0x4fe145[_0x3199e4(0x5fe)]=0xff,_0x4fe145[_0x3199e4(0x363)](_0x36e5ce,_0x5e2859,_0xb39cf9,_0xb86de1,_0x2fb4c6);},Window_Base[_0x288220(0x93f)][_0x288220(0x93c)]=function(_0x323ca2){const _0x120566=_0x288220,_0x33811=_0x323ca2?this[_0x120566(0x4e3)]:this[_0x120566(0x5a6)];if(!_0x33811)return;const _0x5204fa=Window_Scrollable['SCROLLBAR'],_0x1f5648=_0x5204fa[_0x120566(0x28c)],_0xc481da=_0x5204fa[_0x120566(0x5c7)];if(!_0x33811[_0x120566(0x68f)])return;_0x33811['x']=this['padding']+(_0x323ca2?_0x1f5648:this[_0x120566(0x5d5)]+_0xc481da),_0x33811['y']=this[_0x120566(0x35e)]+(_0x323ca2?this[_0x120566(0x81a)]+_0xc481da:_0x1f5648);},Window_Selectable[_0x288220(0x93f)][_0x288220(0x773)]=function(_0x20e933){const _0x393493=_0x288220;let _0x143db5=this['index']();const _0x578634=this[_0x393493(0x599)](),_0x4b5867=this['maxCols']();if(this[_0x393493(0x22d)]()&&(_0x143db5<_0x578634||_0x20e933&&_0x4b5867===0x1)){_0x143db5+=_0x4b5867;if(_0x143db5>=_0x578634)_0x143db5=_0x578634-0x1;this['smoothSelect'](_0x143db5);}else!this[_0x393493(0x22d)]()&&((_0x143db5<_0x578634-_0x4b5867||_0x20e933&&_0x4b5867===0x1)&&this[_0x393493(0x793)]((_0x143db5+_0x4b5867)%_0x578634));},VisuMZ[_0x288220(0x665)][_0x288220(0x32f)]=Window_Selectable['prototype'][_0x288220(0x773)],Window_Selectable[_0x288220(0x93f)]['cursorDown']=function(_0x43e56f){const _0xcc908b=_0x288220;this[_0xcc908b(0x22d)]()&&_0x43e56f&&this[_0xcc908b(0x3a0)]()===0x1&&this[_0xcc908b(0x8bf)]()===this[_0xcc908b(0x599)]()-0x1?this[_0xcc908b(0x793)](0x0):VisuMZ[_0xcc908b(0x665)][_0xcc908b(0x32f)][_0xcc908b(0x6c3)](this,_0x43e56f);},Window_Selectable['prototype'][_0x288220(0x998)]=function(_0x2e934d){const _0x2662fc=_0x288220;let _0x16929d=Math[_0x2662fc(0x6de)](0x0,this[_0x2662fc(0x8bf)]());const _0x5b9f57=this['maxItems'](),_0x5964b9=this[_0x2662fc(0x3a0)]();if(this[_0x2662fc(0x22d)]()&&_0x16929d>0x0||_0x2e934d&&_0x5964b9===0x1){_0x16929d-=_0x5964b9;if(_0x16929d<=0x0)_0x16929d=0x0;this[_0x2662fc(0x793)](_0x16929d);}else!this[_0x2662fc(0x22d)]()&&((_0x16929d>=_0x5964b9||_0x2e934d&&_0x5964b9===0x1)&&this[_0x2662fc(0x793)]((_0x16929d-_0x5964b9+_0x5b9f57)%_0x5b9f57));},VisuMZ[_0x288220(0x665)][_0x288220(0x4ff)]=Window_Selectable[_0x288220(0x93f)][_0x288220(0x998)],Window_Selectable['prototype']['cursorUp']=function(_0x2d8ee8){const _0x3e6154=_0x288220;this[_0x3e6154(0x22d)]()&&_0x2d8ee8&&this[_0x3e6154(0x3a0)]()===0x1&&this[_0x3e6154(0x8bf)]()===0x0?this[_0x3e6154(0x793)](this[_0x3e6154(0x599)]()-0x1):VisuMZ[_0x3e6154(0x665)][_0x3e6154(0x4ff)][_0x3e6154(0x6c3)](this,_0x2d8ee8);},Window_Selectable['prototype'][_0x288220(0x22d)]=function(){const _0x13282a=_0x288220;return VisuMZ[_0x13282a(0x665)][_0x13282a(0x30a)][_0x13282a(0x23d)]['ModernControls'];},VisuMZ[_0x288220(0x665)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x288220(0x93f)][_0x288220(0x742)],Window_Selectable[_0x288220(0x93f)][_0x288220(0x742)]=function(){const _0x4bf97d=_0x288220;this[_0x4bf97d(0x22d)]()?(this[_0x4bf97d(0x64f)](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine'][_0x4bf97d(0x5ab)][_0x4bf97d(0x6c3)](this);},Window_Selectable[_0x288220(0x93f)][_0x288220(0x558)]=function(){return!![];},Window_Selectable[_0x288220(0x93f)]['processCursorMoveModernControls']=function(){const _0x45b85d=_0x288220;if(this[_0x45b85d(0x314)]()){const _0x22eed4=this[_0x45b85d(0x8bf)]();Input[_0x45b85d(0x5dc)](_0x45b85d(0x1d2))&&(Input[_0x45b85d(0x933)]('shift')&&this[_0x45b85d(0x558)]()?this[_0x45b85d(0x655)]():this[_0x45b85d(0x773)](Input[_0x45b85d(0x71a)](_0x45b85d(0x1d2)))),Input[_0x45b85d(0x5dc)]('up')&&(Input[_0x45b85d(0x933)](_0x45b85d(0x907))&&this[_0x45b85d(0x558)]()?this['cursorPageup']():this[_0x45b85d(0x998)](Input[_0x45b85d(0x71a)]('up'))),Input[_0x45b85d(0x5dc)](_0x45b85d(0x711))&&this[_0x45b85d(0x7ec)](Input[_0x45b85d(0x71a)](_0x45b85d(0x711))),Input[_0x45b85d(0x5dc)](_0x45b85d(0x441))&&this[_0x45b85d(0x6c5)](Input[_0x45b85d(0x71a)](_0x45b85d(0x441))),!this['isHandled'](_0x45b85d(0x527))&&Input[_0x45b85d(0x5dc)](_0x45b85d(0x527))&&this[_0x45b85d(0x655)](),!this[_0x45b85d(0x422)]('pageup')&&Input[_0x45b85d(0x5dc)](_0x45b85d(0x7ce))&&this[_0x45b85d(0x795)](),this['index']()!==_0x22eed4&&this[_0x45b85d(0x3f7)]();}},Window_Selectable['prototype'][_0x288220(0x891)]=function(){const _0x530c0f=_0x288220;if(this[_0x530c0f(0x314)]()){const _0x2cf2e3=this[_0x530c0f(0x8bf)]();Input[_0x530c0f(0x71a)](_0x530c0f(0x99d))&&this['smoothSelect'](Math['min'](this[_0x530c0f(0x8bf)](),0x0)),Input[_0x530c0f(0x71a)](_0x530c0f(0x8b8))&&this[_0x530c0f(0x793)](Math[_0x530c0f(0x6de)](this['index'](),this[_0x530c0f(0x599)]()-0x1)),this[_0x530c0f(0x8bf)]()!==_0x2cf2e3&&this[_0x530c0f(0x3f7)]();}},VisuMZ[_0x288220(0x665)][_0x288220(0x45d)]=Window_Selectable[_0x288220(0x93f)][_0x288220(0x2cb)],Window_Selectable['prototype'][_0x288220(0x2cb)]=function(){const _0x43de86=_0x288220;this[_0x43de86(0x22d)]()?this[_0x43de86(0x38b)]():VisuMZ['CoreEngine'][_0x43de86(0x45d)][_0x43de86(0x6c3)](this);},Window_Selectable[_0x288220(0x93f)][_0x288220(0x38b)]=function(){const _0x103c68=_0x288220;VisuMZ[_0x103c68(0x665)][_0x103c68(0x45d)]['call'](this);},Window_Selectable['prototype'][_0x288220(0x30c)]=function(){const _0x565cc2=_0x288220;return VisuMZ[_0x565cc2(0x665)][_0x565cc2(0x30a)][_0x565cc2(0x34b)][_0x565cc2(0x7f7)];},Window_Selectable[_0x288220(0x93f)][_0x288220(0x6e9)]=function(){const _0x5abbe2=_0x288220;return VisuMZ[_0x5abbe2(0x665)][_0x5abbe2(0x30a)][_0x5abbe2(0x34b)]['RowSpacing'];},Window_Selectable[_0x288220(0x93f)][_0x288220(0x643)]=function(){const _0xa1c3c9=_0x288220;return Window_Scrollable['prototype']['itemHeight'][_0xa1c3c9(0x6c3)](this)+VisuMZ[_0xa1c3c9(0x665)]['Settings'][_0xa1c3c9(0x34b)]['ItemHeight'];;},VisuMZ[_0x288220(0x665)][_0x288220(0x700)]=Window_Selectable[_0x288220(0x93f)][_0x288220(0x7fc)],Window_Selectable[_0x288220(0x93f)]['drawBackgroundRect']=function(_0x387b50){const _0x6c87da=_0x288220,_0x3b79d2=VisuMZ['CoreEngine'][_0x6c87da(0x30a)]['Window'];if(_0x3b79d2[_0x6c87da(0x8b1)]===![])return;_0x3b79d2[_0x6c87da(0x47c)]?_0x3b79d2['DrawItemBackgroundJS'][_0x6c87da(0x6c3)](this,_0x387b50):VisuMZ[_0x6c87da(0x665)][_0x6c87da(0x700)]['call'](this,_0x387b50);},VisuMZ[_0x288220(0x665)][_0x288220(0x743)]=Window_Gold[_0x288220(0x93f)][_0x288220(0x80c)],Window_Gold['prototype'][_0x288220(0x80c)]=function(){const _0x17c717=_0x288220;this[_0x17c717(0x44e)]()?this[_0x17c717(0x5c5)]():VisuMZ[_0x17c717(0x665)]['Window_Gold_refresh'][_0x17c717(0x6c3)](this);},Window_Gold[_0x288220(0x93f)][_0x288220(0x44e)]=function(){const _0x5158ae=_0x288220;if(TextManager['currencyUnit']!==this['currencyUnit']())return![];return VisuMZ[_0x5158ae(0x665)][_0x5158ae(0x30a)]['Gold'][_0x5158ae(0x6ed)];},Window_Gold[_0x288220(0x93f)]['drawGoldItemStyle']=function(){const _0x26c481=_0x288220;this[_0x26c481(0x90a)](),this[_0x26c481(0x244)][_0x26c481(0x895)](),this[_0x26c481(0x244)][_0x26c481(0x4d6)]=VisuMZ[_0x26c481(0x665)][_0x26c481(0x30a)][_0x26c481(0x552)][_0x26c481(0x455)];const _0x2b71e8=VisuMZ[_0x26c481(0x665)][_0x26c481(0x30a)]['Gold'][_0x26c481(0x36c)],_0x5a3afe=this[_0x26c481(0x5ba)](0x0);if(_0x2b71e8>0x0){const _0x5bcf69=ImageManager[_0x26c481(0x8a2)]||0x20,_0xbcd044=_0x5bcf69-ImageManager[_0x26c481(0x882)],_0x28c72f=_0x5a3afe['y']+(this[_0x26c481(0x91b)]()-ImageManager[_0x26c481(0x5ae)])/0x2;this[_0x26c481(0x1df)](_0x2b71e8,_0x5a3afe['x']+Math[_0x26c481(0x3eb)](_0xbcd044/0x2),_0x28c72f);const _0x26a33c=_0x5bcf69+0x4;_0x5a3afe['x']+=_0x26a33c,_0x5a3afe[_0x26c481(0x426)]-=_0x26a33c;}this[_0x26c481(0x433)](ColorManager[_0x26c481(0x319)]()),this[_0x26c481(0x3d0)](this[_0x26c481(0x4f3)](),_0x5a3afe['x'],_0x5a3afe['y'],_0x5a3afe['width'],'left');const _0x12a8ae=this[_0x26c481(0x5a9)](this[_0x26c481(0x4f3)]())+0x6;;_0x5a3afe['x']+=_0x12a8ae,_0x5a3afe[_0x26c481(0x426)]-=_0x12a8ae,this['resetTextColor']();const _0x1300cc=this[_0x26c481(0x74b)](),_0x1e2065=this[_0x26c481(0x5a9)](this[_0x26c481(0x404)]?VisuMZ[_0x26c481(0x67e)](this[_0x26c481(0x74b)]()):this[_0x26c481(0x74b)]());_0x1e2065>_0x5a3afe[_0x26c481(0x426)]?this[_0x26c481(0x3d0)](VisuMZ[_0x26c481(0x665)]['Settings'][_0x26c481(0x552)][_0x26c481(0x7bb)],_0x5a3afe['x'],_0x5a3afe['y'],_0x5a3afe[_0x26c481(0x426)],_0x26c481(0x711)):this[_0x26c481(0x3d0)](this['value'](),_0x5a3afe['x'],_0x5a3afe['y'],_0x5a3afe[_0x26c481(0x426)],_0x26c481(0x711)),this['resetFontSettings']();},Window_StatusBase[_0x288220(0x93f)][_0x288220(0x87d)]=function(_0x2effce,_0x441b44,_0x2857e5,_0xfce062,_0x51c38b){const _0x10d30a=_0x288220;_0xfce062=String(_0xfce062||'')[_0x10d30a(0x489)]();if(VisuMZ['CoreEngine']['Settings']['Param'][_0x10d30a(0x871)]){const _0x2977ad=VisuMZ[_0x10d30a(0x42d)](_0xfce062);if(_0x51c38b)this[_0x10d30a(0x94e)](_0x2977ad,_0x2effce,_0x441b44,this['gaugeLineHeight']()),_0x2857e5-=this[_0x10d30a(0x7ae)]()+0x2,_0x2effce+=this[_0x10d30a(0x7ae)]()+0x2;else{const _0x265898=ImageManager[_0x10d30a(0x8a2)]||0x20,_0x35c5a3=ImageManager[_0x10d30a(0x905)]||0x20,_0x90fb31=_0x265898-ImageManager['iconWidth'],_0x2dc33f=_0x35c5a3-ImageManager[_0x10d30a(0x5ae)];let _0x59b225=0x2,_0x3b0a7=0x2;this['lineHeight']()!==0x24&&(_0x3b0a7=Math['floor']((this[_0x10d30a(0x91b)]()-_0x35c5a3)/0x2));const _0x1ce685=_0x2effce+Math[_0x10d30a(0x25e)](_0x90fb31/0x2)+_0x59b225,_0x4a8d56=_0x441b44+Math[_0x10d30a(0x25e)](_0x2dc33f/0x2)+_0x3b0a7;this['drawIcon'](_0x2977ad,_0x1ce685,_0x4a8d56),_0x2857e5-=_0x265898+0x4,_0x2effce+=_0x265898+0x4;}}const _0x3bd519=TextManager[_0x10d30a(0x367)](_0xfce062);this[_0x10d30a(0x90a)](),this['changeTextColor'](ColorManager['systemColor']()),_0x51c38b?(this[_0x10d30a(0x244)][_0x10d30a(0x4d6)]=this[_0x10d30a(0x476)](),this['contents']['drawText'](_0x3bd519,_0x2effce,_0x441b44,_0x2857e5,this['gaugeLineHeight'](),_0x10d30a(0x441))):this['drawText'](_0x3bd519,_0x2effce,_0x441b44,_0x2857e5),this[_0x10d30a(0x90a)]();},Window_StatusBase[_0x288220(0x93f)][_0x288220(0x476)]=function(){const _0x672b3b=_0x288220;return $gameSystem[_0x672b3b(0x4fa)]()-0x8;},Window_StatusBase['prototype'][_0x288220(0x2e3)]=function(_0x15355d,_0x65140b,_0x3dbec0,_0x62e409){const _0x158821=_0x288220;_0x62e409=_0x62e409||0xa8,this['resetTextColor']();if(VisuMZ[_0x158821(0x665)][_0x158821(0x30a)]['UI'][_0x158821(0x5c3)])this[_0x158821(0x506)](_0x15355d[_0x158821(0x54d)]()[_0x158821(0x392)],_0x65140b,_0x3dbec0,_0x62e409);else{const _0x24d28b=_0x15355d[_0x158821(0x54d)]()[_0x158821(0x392)][_0x158821(0x207)](/\\I\[(\d+)\]/gi,'');this[_0x158821(0x3d0)](_0x24d28b,_0x65140b,_0x3dbec0,_0x62e409);}},Window_StatusBase['prototype'][_0x288220(0x63f)]=function(_0x317b18,_0x13d2f4,_0x293efb,_0x4ac99e){const _0x2fc944=_0x288220;_0x4ac99e=_0x4ac99e||0x10e,this['resetTextColor']();if(VisuMZ[_0x2fc944(0x665)]['Settings']['UI'][_0x2fc944(0x490)])this[_0x2fc944(0x506)](_0x317b18[_0x2fc944(0x964)](),_0x13d2f4,_0x293efb,_0x4ac99e);else{const _0x3bbb31=_0x317b18[_0x2fc944(0x964)]()[_0x2fc944(0x207)](/\\I\[(\d+)\]/gi,'');this[_0x2fc944(0x3d0)](_0x317b18[_0x2fc944(0x964)](),_0x13d2f4,_0x293efb,_0x4ac99e);}},VisuMZ[_0x288220(0x665)][_0x288220(0x52e)]=Window_StatusBase[_0x288220(0x93f)][_0x288220(0x245)],Window_StatusBase[_0x288220(0x93f)]['drawActorLevel']=function(_0x11ddb0,_0x1abe52,_0xba19c9){const _0x4eff80=_0x288220;if(VisuMZ[_0x4eff80(0x665)]['Settings'][_0x4eff80(0x6dd)]['ShowActorLevel']===![])return;if(this[_0x4eff80(0x450)]())this['drawActorExpGauge'](_0x11ddb0,_0x1abe52,_0xba19c9);VisuMZ[_0x4eff80(0x665)]['Window_StatusBase_drawActorLevel'][_0x4eff80(0x6c3)](this,_0x11ddb0,_0x1abe52,_0xba19c9);},Window_StatusBase[_0x288220(0x93f)]['isExpGaugeDrawn']=function(){const _0x20b040=_0x288220;return VisuMZ[_0x20b040(0x665)][_0x20b040(0x30a)]['UI'][_0x20b040(0x94b)];},Window_StatusBase[_0x288220(0x93f)]['drawActorExpGauge']=function(_0x1b4a52,_0x31f286,_0x68c8d7){const _0x37de33=_0x288220;if(!_0x1b4a52)return;if(!_0x1b4a52['isActor']())return;const _0x3dc405=0x80,_0x50d2c6=_0x1b4a52[_0x37de33(0x581)]();let _0x127b24=ColorManager[_0x37de33(0x797)](),_0x58a36a=ColorManager['expGaugeColor2']();_0x50d2c6>=0x1&&(_0x127b24=ColorManager['maxLvGaugeColor1'](),_0x58a36a=ColorManager[_0x37de33(0x8ba)]()),this[_0x37de33(0x38d)](_0x31f286,_0x68c8d7,_0x3dc405,_0x50d2c6,_0x127b24,_0x58a36a);},Window_EquipStatus[_0x288220(0x93f)]['drawAllParams']=function(){const _0x16a865=_0x288220;let _0x212fef=0x0;for(const _0x41ed7a of VisuMZ[_0x16a865(0x665)]['Settings']['Param'][_0x16a865(0x97b)]){const _0x1bc031=this[_0x16a865(0x8a9)](),_0xf16c32=this['paramY'](_0x212fef);this[_0x16a865(0x96c)](_0x1bc031,_0xf16c32,_0x41ed7a),_0x212fef++;}},Window_EquipStatus[_0x288220(0x93f)]['drawParamName']=function(_0x3f48c6,_0x5c4598,_0x42a7f8){const _0x4c615d=_0x288220,_0x3dbc99=this[_0x4c615d(0x58a)]()-this['itemPadding']()*0x2;this[_0x4c615d(0x87d)](_0x3f48c6,_0x5c4598,_0x3dbc99,_0x42a7f8,![]);},Window_EquipStatus['prototype']['drawCurrentParam']=function(_0x1b702e,_0x886324,_0x5e9ff7){const _0x3b1004=_0x288220,_0x5325ec=this[_0x3b1004(0x8b5)]();this[_0x3b1004(0x5fa)](),this[_0x3b1004(0x3d0)](this[_0x3b1004(0x373)][_0x3b1004(0x3ac)](_0x5e9ff7,!![]),_0x1b702e,_0x886324,_0x5325ec,'right');},Window_EquipStatus[_0x288220(0x93f)]['drawRightArrow']=function(_0x527729,_0x26f4ae){const _0x27e25b=_0x288220,_0x3eee17=this[_0x27e25b(0x754)]();this[_0x27e25b(0x433)](ColorManager[_0x27e25b(0x319)]());const _0x2353d5=VisuMZ['CoreEngine']['Settings']['UI'][_0x27e25b(0x390)];this[_0x27e25b(0x3d0)](_0x2353d5,_0x527729,_0x26f4ae,_0x3eee17,_0x27e25b(0x295));},Window_EquipStatus['prototype']['drawNewParam']=function(_0x18a250,_0x3ecd76,_0x3df628){const _0x16c7ec=_0x288220,_0x329894=this[_0x16c7ec(0x8b5)](),_0x279fd7=this[_0x16c7ec(0x92e)][_0x16c7ec(0x3ac)](_0x3df628),_0x179fdb=_0x279fd7-this[_0x16c7ec(0x373)][_0x16c7ec(0x3ac)](_0x3df628);this[_0x16c7ec(0x433)](ColorManager[_0x16c7ec(0x2c3)](_0x179fdb)),this[_0x16c7ec(0x3d0)](this[_0x16c7ec(0x92e)][_0x16c7ec(0x3ac)](_0x3df628,!![]),_0x18a250,_0x3ecd76,_0x329894,'right');},VisuMZ[_0x288220(0x665)][_0x288220(0x78b)]=Window_EquipItem[_0x288220(0x93f)]['isEnabled'],Window_EquipItem[_0x288220(0x93f)][_0x288220(0x977)]=function(_0x4eb32c){const _0x370d46=_0x288220;return _0x4eb32c&&this[_0x370d46(0x373)]?this['_actor'][_0x370d46(0x40c)](_0x4eb32c):VisuMZ['CoreEngine'][_0x370d46(0x78b)]['call'](this,_0x4eb32c);},Window_StatusParams[_0x288220(0x93f)][_0x288220(0x599)]=function(){const _0x45f5fd=_0x288220;return VisuMZ[_0x45f5fd(0x665)][_0x45f5fd(0x30a)][_0x45f5fd(0x6dd)][_0x45f5fd(0x97b)][_0x45f5fd(0x2cd)];},Window_StatusParams[_0x288220(0x93f)][_0x288220(0x96c)]=function(_0x4a4d42){const _0x2205e9=_0x288220,_0x368677=this[_0x2205e9(0x5ba)](_0x4a4d42),_0x2e0adb=VisuMZ[_0x2205e9(0x665)][_0x2205e9(0x30a)][_0x2205e9(0x6dd)][_0x2205e9(0x97b)][_0x4a4d42],_0x1fa98e=TextManager[_0x2205e9(0x367)](_0x2e0adb),_0x41abb6=this[_0x2205e9(0x373)][_0x2205e9(0x3ac)](_0x2e0adb,!![]);this[_0x2205e9(0x87d)](_0x368677['x'],_0x368677['y'],0xa0,_0x2e0adb,![]),this[_0x2205e9(0x5fa)](),this[_0x2205e9(0x3d0)](_0x41abb6,_0x368677['x']+0xa0,_0x368677['y'],0x3c,'right');};function _0x3bc1(_0x3d3c9a,_0x263421){const _0x71fa05=_0x71fa();return _0x3bc1=function(_0x3bc144,_0xb4d72c){_0x3bc144=_0x3bc144-0x1ca;let _0x363101=_0x71fa05[_0x3bc144];return _0x363101;},_0x3bc1(_0x3d3c9a,_0x263421);}if(VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x31a)]['EnableNameInput']){VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x31a)][_0x288220(0x949)]&&(Window_NameInput[_0x288220(0x7c1)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x288220(0x6d2),'OK']);;VisuMZ[_0x288220(0x665)][_0x288220(0x64d)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x501)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x501)]=function(_0x12734f){const _0x40bd09=_0x288220;this[_0x40bd09(0x739)]=this[_0x40bd09(0x438)](),VisuMZ['CoreEngine'][_0x40bd09(0x64d)]['call'](this,_0x12734f),this[_0x40bd09(0x739)]==='default'?this[_0x40bd09(0x769)](0x0):(Input[_0x40bd09(0x895)](),this[_0x40bd09(0x88c)]());},Window_NameInput[_0x288220(0x93f)]['defaultInputMode']=function(){const _0x3adac=_0x288220;if(Input[_0x3adac(0x68b)]())return'default';return VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x3adac(0x6f4)]||_0x3adac(0x701);},VisuMZ[_0x288220(0x665)][_0x288220(0x620)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x425)],Window_NameInput['prototype'][_0x288220(0x425)]=function(){const _0x54a458=_0x288220;if(!this[_0x54a458(0x98d)]())return;if(!this['active'])return;if(this[_0x54a458(0x739)]===_0x54a458(0x701)&&Input[_0x54a458(0x282)]())this['switchModes']('default');else{if(Input['isSpecialCode'](_0x54a458(0x7e2)))Input['clear'](),this[_0x54a458(0x29c)]();else{if(Input[_0x54a458(0x71a)]('tab'))Input['clear'](),this[_0x54a458(0x739)]===_0x54a458(0x701)?this[_0x54a458(0x963)](_0x54a458(0x8f4)):this[_0x54a458(0x963)]('keyboard');else{if(this[_0x54a458(0x739)]===_0x54a458(0x701))this[_0x54a458(0x317)]();else Input['isSpecialCode'](_0x54a458(0x5d2))?(Input[_0x54a458(0x895)](),this[_0x54a458(0x963)](_0x54a458(0x701))):VisuMZ[_0x54a458(0x665)][_0x54a458(0x620)][_0x54a458(0x6c3)](this);}}}},VisuMZ[_0x288220(0x665)][_0x288220(0x57b)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x2cb)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x2cb)]=function(){const _0x4a23eb=_0x288220;if(!this[_0x4a23eb(0x383)]())return;if(this[_0x4a23eb(0x739)]===_0x4a23eb(0x701)){if(TouchInput['isTriggered']()&&this[_0x4a23eb(0x594)]())this[_0x4a23eb(0x963)](_0x4a23eb(0x8f4));else TouchInput['isCancelled']()&&this['switchModes'](_0x4a23eb(0x8f4));}else VisuMZ[_0x4a23eb(0x665)][_0x4a23eb(0x57b)][_0x4a23eb(0x6c3)](this);},Window_NameInput[_0x288220(0x93f)][_0x288220(0x317)]=function(){const _0x200303=_0x288220;if(Input['isSpecialCode'](_0x200303(0x2f7)))Input[_0x200303(0x895)](),this[_0x200303(0x694)]();else{if(Input[_0x200303(0x3a5)]!==undefined){let _0x45a982=Input[_0x200303(0x3a5)],_0x3a3ae1=_0x45a982[_0x200303(0x2cd)];for(let _0x48ae85=0x0;_0x48ae85<_0x3a3ae1;++_0x48ae85){this[_0x200303(0x605)][_0x200303(0x61e)](_0x45a982[_0x48ae85])?SoundManager['playOk']():SoundManager[_0x200303(0x448)]();}Input[_0x200303(0x895)]();}}},Window_NameInput['prototype'][_0x288220(0x963)]=function(_0x16cec4){const _0x45b3f0=_0x288220;let _0x5bc5f9=this[_0x45b3f0(0x739)];this[_0x45b3f0(0x739)]=_0x16cec4,_0x5bc5f9!==this[_0x45b3f0(0x739)]&&(this[_0x45b3f0(0x80c)](),SoundManager[_0x45b3f0(0x8af)](),this[_0x45b3f0(0x739)]===_0x45b3f0(0x8f4)?this[_0x45b3f0(0x769)](0x0):this[_0x45b3f0(0x769)](-0x1));},VisuMZ[_0x288220(0x665)]['Window_NameInput_cursorDown']=Window_NameInput['prototype'][_0x288220(0x773)],Window_NameInput['prototype'][_0x288220(0x773)]=function(_0x992a2b){const _0x580488=_0x288220;if(this[_0x580488(0x739)]===_0x580488(0x701)&&!Input[_0x580488(0x4b0)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x580488(0x665)][_0x580488(0x5cc)]['call'](this,_0x992a2b),this[_0x580488(0x963)]('default');},VisuMZ['CoreEngine'][_0x288220(0x6c7)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x998)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x998)]=function(_0x21e7e6){const _0x15a9a7=_0x288220;if(this['_mode']===_0x15a9a7(0x701)&&!Input['isArrowPressed']())return;if(Input[_0x15a9a7(0x699)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorUp'][_0x15a9a7(0x6c3)](this,_0x21e7e6),this[_0x15a9a7(0x963)]('default');},VisuMZ[_0x288220(0x665)][_0x288220(0x7a3)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x7ec)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x7ec)]=function(_0x44f324){const _0x945100=_0x288220;if(this['_mode']===_0x945100(0x701)&&!Input[_0x945100(0x4b0)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x945100(0x665)]['Window_NameInput_cursorRight'][_0x945100(0x6c3)](this,_0x44f324),this[_0x945100(0x963)](_0x945100(0x8f4));},VisuMZ['CoreEngine'][_0x288220(0x1fe)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x6c5)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x6c5)]=function(_0x4f5690){const _0x13e108=_0x288220;if(this[_0x13e108(0x739)]==='keyboard'&&!Input[_0x13e108(0x4b0)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x13e108(0x665)][_0x13e108(0x1fe)][_0x13e108(0x6c3)](this,_0x4f5690),this[_0x13e108(0x963)](_0x13e108(0x8f4));},VisuMZ[_0x288220(0x665)][_0x288220(0x35c)]=Window_NameInput[_0x288220(0x93f)][_0x288220(0x655)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x655)]=function(){const _0x3d9cb0=_0x288220;if(this[_0x3d9cb0(0x739)]==='keyboard')return;if(Input[_0x3d9cb0(0x699)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']['call'](this),this['switchModes'](_0x3d9cb0(0x8f4));},VisuMZ[_0x288220(0x665)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x288220(0x93f)][_0x288220(0x795)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x795)]=function(){const _0x5bc477=_0x288220;if(this['_mode']===_0x5bc477(0x701))return;if(Input[_0x5bc477(0x699)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']['call'](this),this[_0x5bc477(0x963)](_0x5bc477(0x8f4));},VisuMZ[_0x288220(0x665)][_0x288220(0x692)]=Window_NameInput['prototype'][_0x288220(0x80c)],Window_NameInput[_0x288220(0x93f)][_0x288220(0x80c)]=function(){const _0x147f07=_0x288220;if(this['_mode']==='keyboard'){this[_0x147f07(0x244)][_0x147f07(0x895)](),this[_0x147f07(0x44f)][_0x147f07(0x895)](),this['resetTextColor']();let _0x20e370=VisuMZ[_0x147f07(0x665)][_0x147f07(0x30a)][_0x147f07(0x31a)][_0x147f07(0x1e6)][_0x147f07(0x200)]('\x0a'),_0x594442=_0x20e370[_0x147f07(0x2cd)],_0x57f37f=(this[_0x147f07(0x81a)]-_0x594442*this[_0x147f07(0x91b)]())/0x2;for(let _0x2983af=0x0;_0x2983af<_0x594442;++_0x2983af){let _0x66611e=_0x20e370[_0x2983af],_0x30041a=this[_0x147f07(0x922)](_0x66611e)[_0x147f07(0x426)],_0x5e1aef=Math[_0x147f07(0x25e)]((this[_0x147f07(0x244)]['width']-_0x30041a)/0x2);this['drawTextEx'](_0x66611e,_0x5e1aef,_0x57f37f),_0x57f37f+=this[_0x147f07(0x91b)]();}}else VisuMZ[_0x147f07(0x665)][_0x147f07(0x692)][_0x147f07(0x6c3)](this);};};VisuMZ[_0x288220(0x665)][_0x288220(0x955)]=Window_ShopSell['prototype'][_0x288220(0x977)],Window_ShopSell['prototype'][_0x288220(0x977)]=function(_0x289f41){const _0x598f42=_0x288220;return VisuMZ[_0x598f42(0x665)]['Settings']['QoL']['KeyItemProtect']&&DataManager[_0x598f42(0x33c)](_0x289f41)?![]:VisuMZ['CoreEngine'][_0x598f42(0x955)][_0x598f42(0x6c3)](this,_0x289f41);},Window_NumberInput[_0x288220(0x93f)]['isUseModernControls']=function(){return![];};VisuMZ[_0x288220(0x665)]['Settings'][_0x288220(0x31a)]['EnableNumberInput']&&(VisuMZ[_0x288220(0x665)][_0x288220(0x453)]=Window_NumberInput['prototype'][_0x288220(0x740)],Window_NumberInput[_0x288220(0x93f)]['start']=function(){const _0x16eee0=_0x288220;VisuMZ[_0x16eee0(0x665)][_0x16eee0(0x453)][_0x16eee0(0x6c3)](this),this[_0x16eee0(0x769)](this[_0x16eee0(0x2ac)]-0x1),Input[_0x16eee0(0x895)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x75a)]=Window_NumberInput[_0x288220(0x93f)][_0x288220(0x677)],Window_NumberInput[_0x288220(0x93f)]['processDigitChange']=function(){const _0x14a8a9=_0x288220;if(!this[_0x14a8a9(0x383)]())return;if(Input['isNumpadPressed']())this[_0x14a8a9(0x58e)]();else{if(Input[_0x14a8a9(0x6ef)]('backspace'))this[_0x14a8a9(0x2f5)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x14a8a9(0x77f)]();else{if(Input[_0x14a8a9(0x338)]===0x24)this[_0x14a8a9(0x734)]();else Input[_0x14a8a9(0x338)]===0x23?this[_0x14a8a9(0x528)]():VisuMZ[_0x14a8a9(0x665)][_0x14a8a9(0x75a)][_0x14a8a9(0x6c3)](this);}}}},Window_NumberInput[_0x288220(0x93f)][_0x288220(0x742)]=function(){const _0x2fc649=_0x288220;if(!this[_0x2fc649(0x314)]())return;Input['isNumpadPressed']()?this[_0x2fc649(0x58e)]():Window_Selectable[_0x2fc649(0x93f)][_0x2fc649(0x742)][_0x2fc649(0x6c3)](this);},Window_NumberInput[_0x288220(0x93f)][_0x288220(0x891)]=function(){},Window_NumberInput['prototype'][_0x288220(0x58e)]=function(){const _0x3cd891=_0x288220;if(String(this[_0x3cd891(0x67b)])[_0x3cd891(0x2cd)]>=this[_0x3cd891(0x2ac)])return;const _0x2a4502=Number(String(this[_0x3cd891(0x67b)])+Input[_0x3cd891(0x3a5)]);if(isNaN(_0x2a4502))return;this['_number']=_0x2a4502;const _0x115bd0='9'[_0x3cd891(0x419)](this[_0x3cd891(0x2ac)]);this['_number']=this[_0x3cd891(0x67b)][_0x3cd891(0x5d6)](0x0,_0x115bd0),Input[_0x3cd891(0x895)](),this[_0x3cd891(0x80c)](),SoundManager[_0x3cd891(0x696)](),this[_0x3cd891(0x769)](this[_0x3cd891(0x2ac)]-0x1);},Window_NumberInput['prototype'][_0x288220(0x2f5)]=function(){const _0x2fac13=_0x288220;this[_0x2fac13(0x67b)]=Number(String(this[_0x2fac13(0x67b)])[_0x2fac13(0x538)](0x0,-0x1)),this[_0x2fac13(0x67b)]=Math[_0x2fac13(0x6de)](0x0,this[_0x2fac13(0x67b)]),Input[_0x2fac13(0x895)](),this[_0x2fac13(0x80c)](),SoundManager[_0x2fac13(0x696)](),this[_0x2fac13(0x769)](this[_0x2fac13(0x2ac)]-0x1);},Window_NumberInput[_0x288220(0x93f)][_0x288220(0x77f)]=function(){const _0x52dcc7=_0x288220;this[_0x52dcc7(0x67b)]=Number(String(this[_0x52dcc7(0x67b)])[_0x52dcc7(0x675)](0x1)),this[_0x52dcc7(0x67b)]=Math['max'](0x0,this['_number']),Input[_0x52dcc7(0x895)](),this['refresh'](),SoundManager['playCursor'](),this[_0x52dcc7(0x769)](this[_0x52dcc7(0x2ac)]-0x1);},Window_NumberInput['prototype'][_0x288220(0x734)]=function(){const _0x2089c5=_0x288220;if(this['index']()===0x0)return;Input[_0x2089c5(0x895)](),this[_0x2089c5(0x80c)](),SoundManager['playCursor'](),this[_0x2089c5(0x769)](0x0);},Window_NumberInput[_0x288220(0x93f)][_0x288220(0x528)]=function(){const _0x4f7d75=_0x288220;if(this[_0x4f7d75(0x8bf)]()===this['_maxDigits']-0x1)return;Input['clear'](),this[_0x4f7d75(0x80c)](),SoundManager[_0x4f7d75(0x696)](),this['select'](this[_0x4f7d75(0x2ac)]-0x1);});;function _0x71fa(){const _0x5139d1=['Rate','Scene_Battle_createSpriteset','endAction','filters','ADD','setAction','makeActionList','_forcedTroopView','angle','DrawIcons','ENTER','Scene_Skill_create','ProfileRect','isSceneMap','ETB','applyEasingAnglePlus','boxWidth','EQUAL','updateOrigin','([\x5c+\x5c-]\x5cd+)([%％])>','process_VisuMZ_CoreEngine_RegExp','drawParamText','loadMapData','TGR','INOUTBACK','SwitchToggleOne','iconWidth','initRotationCoreEngine','DimColor2','JUNJA','playOnceParallelInterpreter','MAXHP','pos','_coreEngineShakeStyle','loadTileset','onInputBannedWords','deselect','isGamepadButtonPressed','_stored_maxLvGaugeColor1','Graphics_printError','Spriteset_Base_destroy','processCursorHomeEndTrigger','translucentOpacity','isMagical','_backSprite2','clear','eva','Key%1','create','Game_Action_itemHit','VOLUME_DOWN','EVA','ZOOM','Spriteset_Base_update','createPageButtons','Enemy','setupTileExtendTerrainTags','bitmapWidth','standardIconWidth','bodyColor','setGuard','scaleX','ScaleY','titles1','initCoreEngine','itemPadding','Keyboard','version','isAnimationForEach','_timeDuration','blockWidth','playOk','retrieveFauxAnimation','ShowItemBackground','alphabetic','DetachMapPictureContainer','targetOpacity','paramWidth','DataManager_setupNewGame','drawSegment','end','centerY','maxLvGaugeColor2','description','horzJS','DEF','isGamepadAxisMoved','index','easingType','setBackgroundType','commandWindowRows','_showDevTools','Input_shouldPreventDefault','gameTitle','join','_effectsContainer','isRightInputMode','helpAreaTopSideButtonLayout','_bypassCanCounterCheck','backgroundBitmap','string','Sprite_StateIcon_updateFrame','xparamFlatBonus','_sellWindow','down2','itemBackColor1','Input_onKeyDown','makeDocumentTitle','ScreenResolution','SParamVocab4','VisuMZ_2_BattleSystemPTB','ExportStrFromAllTroops','note','SETTINGS','_bgsBuffer','tileWidth','getButtonAssistLocation','reservePlayTestNewGameCommonEvent','ControllerButtons','Scene_Shop_create','_timerSprite','sparamFlatBonus','showPicture','VisuMZ_1_OptionsCore','updatePositionCoreEngineShakeRand','keypress','_drawTextShadow','animationId','members','inBattle','\x0a\x0a\x0a\x0a\x0a','ExportString','ColorMaxLvGauge1','_stored_pendingColor','setBackgroundOpacity','ParamMax','setActionState','_lastY','destroyCoreEngineMarkedBitmaps','BoxMargin','default','setClickHandler','_helpWindow','StatusParamsRect','setCoreEngineScreenShakeStyle','makeDeepCopy','processFauxAnimationRequests','_changingClass','xparamRate2','ImgLoad','Show\x20Scrolling\x20Text\x20Script\x20Error','RIGHT','setupBattleTestItems','_updateGamepadState','advanced','createContents','_action','standardIconHeight','moveMenuButtonSideButtonLayout','shift','AGI','learnings','resetFontSettings','OUTBACK','focus','removeAllPointAnimations','img/%1/','_itemWindow','KeyItemProtect','initMembers','addChild','windowPadding','Bitmap_strokeRect','loadTileBitmap','keys','MapNameTextCode','WIN_OEM_RESET','InputBgType','atbActive','lineHeight','trim','makeFontSmaller','Game_Interpreter_command122','visible','PGDN','createExtendedTileSprite','textSizeEx','TextFmt','command111','MCR','itemWindowRect','drawBackground','_isButtonHidden','checkCacheKey','SlotBgType','animationNextDelay','makeCoreEngineCommandList','viewport','_tempActor','_hideTileShadows','adjustX','buttonAssistWindowButtonRect','inputWindowRect','isPressed','getLastGamepadUsed','seVolume','isClosed','NUMPAD6','StatusEquipRect','isScrollBarVisible','Origin','makeInputButtonString','updateScrollBarPosition','Spriteset_Map_createTilemap','contentsOpacity','prototype','sqrt','getColorDataFromPluginParameters','updateMain','isInputting','ShiftR_Toggle','updateTransform','image-rendering','RevertPreserveNumbers','measureTextWidth','QwertyLayout','log','LvExpGauge','removeTileExtendSprites','horizontal','drawIconBySize','TextManager_param','Match','adjustSprite','drawActorIcons','Game_Event_start','AnimationMirrorOffset','Window_ShopSell_isEnabled','playtestQuickLoad','shake','Scene_Title_drawGameTitle','onDatabaseLoaded','STENCIL_TEST','ColorMaxLvGauge2','7BkgbgA','setupCoreEngine','_pageupButton','getLastPluginCommandInterpreter','F12','playTestF7','OPEN_CURLY_BRACKET','switchModes','nickname','BattleManager_invokeCounterAttack','offColor','XParamVocab9','PageChange','enabled','ACCEPT','Bitmap_measureTextWidth','drawItem','isGameActive','gaugeRate','_duration','buttonAssistText4','LESS_THAN','map','ctGaugeColor2','ARRAYSTR','xparamPlusJS','ButtonFadeSpeed','isEnabled','createTroopNote','isPointAnimationPlaying','ALT','DisplayedParams','powerDownColor','CONVERT','ListBgType','getBackgroundOpacity','_onLoad','hpGaugeColor2','LoadMenu','Scene_Map_update','applyCoreEasing','_width','STENCIL_BUFFER_BIT','operand','playTestShiftT','KANA','getLastUsedGamepadType','inbounce','createWindowLayer','isOpen','TextStr','OutlineColorGauge','_movementWholeDuration','_stored_mpGaugeColor2','targetScaleY','measureText','skills','OutlineColor','MODECHANGE','isWindowMaskingEnabled','cursorUp','〘Common\x20Event\x20%1:\x20%2〙\x20End','offsetY','targetBackOpacity','reserveNewGameCommonEvent','home','catchNormalError','isCancelled','updateWaitMode','buttonAssistKey%1','showFauxAnimations','OUTSINE','isNwjs','_battleField','Scene_Battle_createCancelButton','dimColor1','initBasic','buttonAssistWindowSideRect','ColorCTGauge1','F17','WIN_OEM_COPY','Window_Base_destroyContents','BgType','down','pop','Window_refreshBack','Bitmap_blt','makeFontBigger','hpGaugeColor1','Flat2','backOpacity','NoTileShadows','Scene_Base_terminateAnimationClearBugFix','Scene_Map_shouldAutosave','SParamVocab2','ASTERISK','drawIcon','updateScene','CrisisRate','scrollUp','windowRect','ShowScrollBar','SideButtons','NameInputMessage','_baseTexture','mpGaugeColor2','ConvertParams','Input_update','isLoopVertical','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','Sprite_AnimationMV_processTimingData','createTitleButtons','WIN_OEM_FJ_LOYA','_drawTextOutline','STB','Bitmap_drawText','addEventListener','_coreEasing','exportAllMapStrings','WIN_OEM_BACKTAB','BottomHelp','INOUTQUAD','5DYZgtk','Tilemap_addSpotTile','calcEasing','mhp','code','Window_NameInput_cursorLeft','DisplayLockX','split','paramPlus','windowOpacity','ParseStateNotetags','PixelateImageRendering','_createInternalTextures','playTestF6','replace','_numberWindow','IconParam6','Conditional\x20Branch\x20Script\x20Error','IconSParam8','updateBattleVariables','SaveMenu','outbounce','savefileInfo','isActiveTpb','ExtractStrFromList','_tileSprite','XParamVocab2','mainAreaHeight','SParameterFormula','BarBodyColor','_textPopupWindow','OS_KEY','IconParam7','ColorCTGauge2','initButtonHidden','fillAll','SystemSetBattleSystem','printError','traitObjects','isBottomHelpMode','_data','updateAnglePlus','Plus','catchUnknownError','mpGaugeColor1','createChildSprite','bgmVolume','_statusWindow','_stored_normalColor','menuShowButton','buttonAssistKey3','mainAreaTopSideButtonLayout','isUseModernControls','WIN_OEM_CLEAR','_stored_expGaugeColor2','getInputMultiButtonStrings','checkCoreEngineDisplayCenter','darwin','displayY','child_process','_stored_deathColor','REPLACE','CIRCUMFLEX','requiredWtypeId1','_fauxAnimationSprites','NONCONVERT','overrideMimeType','NUMPAD1','QoL','ItemRect','paramName','MainMenu','SParamVocab5','ActorRect','maxScrollbar','contents','drawActorLevel','vertJS','FDR','DimColor1','Scene_Boot_updateDocumentTitle','_targets','VOLUME_MUTE','_pointAnimationSprites','updatePointAnimations','Color','parseForcedGameTroopSettingsCoreEngine','process_VisuMZ_CoreEngine_jsQuickFunctions','isSideButtonLayout','_backSprite','_registerKeyInput','isItem','checkPassage','_slotWindow','DocumentTitleFmt','Sprite_Battler_startMove','TILDE','Sprite_StateIcon_loadBitmap','alwaysDash','isForFriend','animationShouldMirror','floor','WIN_OEM_WSCTRL','_onceParallelInterpreters','ARRAYJSON','requestMotion','missed','MinDuration','top','Control\x20Variables\x20Script\x20Error','OPEN_PAREN','forceOutOfPlaytest','Game_Action_updateLastTarget','Rate1','updatePositionCoreEngineShakeVert','updatePictureAntiZoom','Window_Base_drawText','anglePlus','faceWidth','destroyScrollBarBitmaps','numRepeats','originalJS','_animation','gainSilentTp','ParseAllNotetags','ARRAYFUNC','JSON','_shakeSpeed','ShowJS','IconXParam6','updateDuration','Actor-%1-%2','4jceSVz','_menuButton','_eventId','openness','drawCharacter','isGamepadTriggered','MAXMP','stencilFunc','_dimmerSprite','setupRate','system','_tileExtendTerrainTags','showPointAnimations','_cache','Wait','thickness','NUMPAD7','_shiftY','OUTCIRC','_shakePower','itemRect','nah','LUK','font-smooth','center','_dummyWindow','_currentBgm','StatusBgType','current','return\x200','Bitmap_drawTextOutline','processBack','DefaultStyle','UpdatePictureCoordinates','updateRotation','isEventRunning','SystemSetSideView','BattleManager_checkSubstitute','loadSystem','mpColor','Weapon-%1-%2','updateFrame','refreshSpritesetForExtendedTiles','createFauxAnimation','removeChild','changeAnglePlusData','loading','_maxDigits','_targetOffsetX','BACK_SLASH','3731022AhEQLH','_hideButtons','pan','Sprite_Gauge_gaugeRate','EXCLAMATION','isClosing','<JS\x20%1\x20%2:[\x20](.*)>','Game_Character_processMoveCommand','〘Common\x20Event\x20%1:\x20%2〙\x20Start','NUM_LOCK','updatePositionCoreEngineShakeHorz','bitmapHeight','OUTELASTIC','showDevTools','xdg-open','setupScrollBarBitmap','Bitmap_drawCircle','_forcedBattleGridSystem','DATABASE','AudioChangeBgmPan','paramchangeTextColor','expGaugeColor2','WASD','Game_Map_scrollRight','NEAREST','BattleManager_processEscape','INOUTELASTIC','_shakeDuration','processTouch','textHeight','length','BTB','_pauseSignSprite','CustomParamType','EnableMasking','setTileFrame','_gamepadWait','_commandList','EXR','Sprite_Animation_processSoundTimings','filter','itemHit','DummyRect','WIN_OEM_FJ_MASSHOU','loadBitmapCoreEngine','_lastX','xparamPlus2','Renderer','removeAllFauxAnimations','ONE','min','getKeyboardInputButtonString','drawActorClass','xparam','helpWindowRect','<%1\x20%2:[\x20]','clearForcedGameTroopSettingsCoreEngine','AccuracyBoost','Smooth','paramFlat','buttonAssistKey4','(\x5cd+\x5c.?\x5cd+)>','SellRect','enable','CLOSE_CURLY_BRACKET','SystemLoadAudio','setTopRow','HANJA','Scene_Equip_create','_tileExtendSprites','processKeyboardBackspace','FadeSpeed','enter','BTestAddedQuantity','DummyBgType','dashToggle','_goldWindow','currentLevelExp','_upArrowSprite','destroyContents','pages','STRUCT','indexOf','_stored_powerDownColor','makeCommandList','StatusParamsBgType','StartID','stencilOp','pressed','updateMotion','object','Settings','_colorTone','colSpacing','moveRelativeToResolutionChange','tileset','SystemLoadImages','_digitGroupingEx','ExportCurMapText','Scene_Title','Spriteset_Base_updatePosition','isCursorMovable','helpAreaHeight','checkSmartEventCollision','processKeyboardHandling','_statusEquipWindow','systemColor','KeyboardInput','yScrollLinkedOffset','PRINT','IconSParam7','_list','BTestWeapons','_loadingState','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','_isWindow','isActor','Version','NUMPAD2','text%1','Troop%1','Max','drawTextTopAligned','Bitmap_fillRect','helpAreaBottom','IconSParam1','framesMax','MAX_SAFE_INTEGER','Window_Selectable_cursorDown','StatusEquipBgType','PictureCoordinatesMode','FontSize','isCollidedWithEvents','buttonAssistText3','IconXParam3','ExportStrFromAllMaps','destroy','_inputSpecialKeyCode','Game_BattlerBase_initMembers','IconIndex','Scene_Map_createSpriteset_detach','isKeyItem','_iconIndex','IconSParam2','createCustomParameter','asin','Input_pollGamepads','prepare','_shouldPreventDefault','_pictureCoordinatesMode','IconSParam3','Game_Event_isCollidedWithEvents','initialLevel','operation','Plus1','NumberBgType','Window','etypeId','charAt','endAnimation','_moveEasingType','isAnimationOffsetXMirrored','_target','battlebacks1','updatePictureSettings','SnapshotOpacity','powerUpColor','Location','toLowerCase','Game_Action_itemEva','Scene_Boot_startNormalGame','duration','Game_Party_consumeItem','Window_NameInput_cursorPagedown','XParamVocab7','padding','xScrollLinkedOffset','loadWindowskin','DECIMAL','WIN_OEM_PA3','fillRect','Symbol','loadBitmap','WIN_OEM_PA1','param','tab','_addSpotTile','playBgm','INELASTIC','GoldIcon','padZero','OptionsBgType','calcCoreEasing','ItemBackColor1','CallHandlerJS','createPointAnimationSprite','_actor','sparam','pendingColor','_commonEventLayers','Tilemap_addShadow','EREOF','Scene_MenuBase_createBackground','Flat','_startPlaying','_coreEasingType','Spriteset_Base_isAnimationPlaying','updateBgsParameters','_saveFileID','IconSParam5','AMPERSAND','loadSystemImages','isOpenAndActive','_stypeId','Scene_Options_create','buttons','1.4.4','needsUpdate','targetScaleX','changeTileset','processTouchModernControls','Scene_Load','drawGauge','helpAreaTop','getCustomBackgroundSettings','ParamArrow','playBgs','name','_fauxAnimationQueue','_stored_maxLvGaugeColor2','DOLLAR','Game_Picture_angle','slotWindowRect','XParameterFormula','Window_Base_drawIcon','Scene_Status_create','applyEasing','SceneManager_initialize','4580292ZMnGJb','PERIOD','Sprite_Gauge_currentValue','maxCols','F18','PositionJS','drawFace','_cacheScaleX','_inputString','_hovered','layoutSettings','SPACE','AdjustAngle','Game_Action_numRepeats','_encounterCount','paramValueByName','gold','sparamRateJS','Flat1','_sideButtonLayout','setEvent','paramFlatBonus','SParamVocab6','consumeItem','setCoreEngineUpdateWindowBg','checkScrollBarBitmap','AudioChangeBgmPitch','tpGaugeColor1','setFrame','charCode','_context','_realScale','BlurFilter','useFontWidthFix','WIN_OEM_FJ_JISHO','INBACK','OTB','_buyWindow','Item-%1-%2','Skill-%1-%2','contains','KeySHIFT','_lastPluginCommandInterpreter','itemSuccessRate','bind','CheckSplitEscape','movePageButtonSideButtonLayout','renderNoMask','PHA','updateCoreEasing','font','drawText','OptionsRect','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','goldWindowRect','ColorDeath','_pollGamepads','meVolume','buttonAssistOffset3','Scene_MenuBase_createCancelButton','getPointAnimationLayer','processSoundTimings','isMaskingEnabled','ParseEnemyNotetags','_texture','updateClose','BannedWords','SwitchActorText','_cacheScaleY','XParamVocab0','maxGold','ExtractStrFromMap','%1〘Choice\x20Cancel〙%1','sparamRate','VIEWPORT','_bgmBuffer','getBattleSystem','process_VisuMZ_CoreEngine_Functions','ceil','setupValueFont','_backgroundSprite','createBackground','commandWindowRect','WIN_ICO_00','sparamFlatJS','Game_Picture_scaleY','NumberRect','CNT','createEnemies','attackSkillId','playCursorSound','1962448sRgamn','isPhysical','$dataMap','ctGaugeColor1','mainAreaTop','Total','exit','round','addLoadListener','X:\x20%1','BlurStrength','Type','_digitGrouping','deactivate','8036970TPApWu','showIncompleteTilesetError','BKSP','Actor','VisuMZ_2_BattleSystemSTB','MaxDuration','canEquip','maxPictures','_scrollDuration','playTestShiftR','createTilemap','opacity','editWindowRect','Scene_Map_createSpritesetFix','Scene_Battle_createSpriteset_detach','boxHeight','updatePositionCoreEngine','onActorChange','MenuLayout','repeat','updateDashToggle','determineSideButtonLayoutValid','IconParam0','OPEN_BRACKET','SplitEscape','F20','optionsWindowRect','bitmap','isHandled','PositionY','gainItem','processHandling','width','_downArrowSprite','createSpriteset','Game_System_initialize','InputRect','pointX','stypeId','GetParamIcon','setAttack','createKeyJS','targetY','createPointAnimationQueue','initVisuMZCoreEngine','changeTextColor','createFauxAnimationQueue','displayName','_colorCache','_displayX','defaultInputMode','Bitmap_gradientFillRect','areButtonsOutsideMainUI','_targetScaleY','createDigits','F14','setEasingType','hpColor','DigitGroupingStandardText','left','updatePictureCoordinates','fadeSpeed','INQUART','MAT','Game_Map_scrollUp','_internalTextures','playBuzzer','ONE_MINUS_SRC_ALPHA','drawCircle','process_VisuMZ_CoreEngine_ControllerButtons','【%1】\x0a','_centerElement','isItemStyle','contentsBack','isExpGaugeDrawn','scale','HIT','Window_NumberInput_start','currentValue','GoldFontSize','App','actor','setupCustomRateCoreEngine','goto','bgm','random','ExtJS','Window_Selectable_processTouch','createSubSprite','animations','scrollDown','VisuMZ_2_BattleSystemETB','encounterStep','PDR','shouldAutosave','openURL','ActorBgType','MINUS','itypeId','_screenY','initialBattleSystem','Input_setupEventHandlers','ATK','removeFauxAnimation','setSideView','addWindow','ModernControls','XParamVocab8','setupNewGame','_onKeyDown','CommandRect','cos','smallParamFontSize','text','_lastCommandSymbol','includes','getCombinedScrollingText','cancelShowButton','DrawItemBackgroundJS','Scene_Map_updateMain','bgsVolume','_refreshArrows','_mainSprite','25171JTJLIt','_scene','OUTCUBIC','_clickHandler','autoRemovalTiming','statusWindowRect','style','ParamChange','toUpperCase','DIVIDE','MAX_GL_TEXTURES','ActorHPColor','CodeJS','Title','10271574eekMgi','TextCodeNicknames','status','command105','children','_muteSound','startAutoNewGame','MDR','isAnimationPlaying','scrollLeft','_pagedownButton','Game_Troop_setup','overallHeight','IconParam3','_displayY','battlebacks2','_hp','SCROLLBAR','Map%1','atypeId','usableSkills','isSmartEventCollisionOn','INCUBIC','ShiftT_Toggle','WIN_OEM_FINISH','updateMove','PictureID','SkillMenu','_onKeyPress','TitlePicButtons','OUTEXPO','Script\x20Call\x20Error','HYPHEN_MINUS','isArrowPressed','_mapNameWindow','CategoryRect','refreshScrollBarBitmap','Upper\x20Left','centerX','createTileExtendSprites','ShopMenu','subjectHitRate','height','NUMPAD4','ActorMPColor','_playTestFastMode','wtypeId','SwitchToggleRange','RepositionEnemies130','command357','buttonAssistText5','setEnemyAction','isOpening','test','maxVisibleItems','gaugeHeight','Class-%1-%2','processDrawIcon','tpCostColor','mapId','setLastGamepadUsed','initDigitGrouping','position','EnableJS','_stored_ctGaugeColor1','_bitmap','ShowDevTools','optSideView','setViewportCoreEngineFix','Spriteset_Base_initialize','maxScrollX','fontSize','loadTitle1','key%1','Game_Picture_move','setActorHome','buttonAssistText%1','isNormalPriority','startNormalGame','_lastGamepad','cancel','terms','touchUI','BottomButtons','_scrollBarHorz','baseTextRect','refreshDimmerBitmap','saveViewport','tilesetFlags','Game_Map_setup','VisuMZ_2_BattleSystemFTB','DOWN','process_VisuMZ_CoreEngine_CustomParameters','imageSmoothingEnabled','FTB','sparamFlat1','Enemy-%1-%2','measureTextWidthNoRounding','setupCoreEasing','Window_TitleCommand_selectLast','currencyUnit','buttonAssistKey5','wholeDuration','Scene_Battle_update','ParseActorNotetags','_origin','BasicParameterFormula','mainFontSize','_playtestF7Looping','open','areTileShadowsHidden','getCoreEngineScreenShakeStyle','Window_Selectable_cursorUp','outlineColor','initialize','EditBgType','updateMainMultiply','dummyWindowRect','NewGameCommonEvent','drawTextEx','rgba(0,\x200,\x200,\x200.7)','update','pictureId','Window_Base_createTextState','FINAL','INOUTSINE','smooth','Manual','DigitGroupingGaugeSprites','snapForBackground','Untitled','》Comment《\x0a%1\x0a','TPB\x20WAIT','SELECT','XParamVocab5','get','close','buttonAssistKey1','getControllerInputButtonMatch','MULTIPLY','Bitmap_resize','Sprite_AnimationMV_updatePosition','catchException','GoldRect','ESC','_subject','isBusy','KEEP','updatePosition','processEscape','_buttonAssistWindow','SParamVocab0','pagedown','processKeyboardEnd','adjustBoxSize','isSceneBattle','isAlive','CTRL','_stored_tpGaugeColor2','Window_StatusBase_drawActorLevel','F23','_backgroundFilter','IconSParam0','processMoveCommand','isFauxAnimationPlaying','INOUTCIRC','forceStencil','updateScrollBars','PositionX','slice','F13','paramRateJS','playEscape','faceHeight','buttonAssistCancel','drawGameVersion','AnimationID','setup','_originalViewport','data/','updateOpen','SideView','DigitGroupingExText','setAnglePlusData','Window_Base_initialize','FUNC','nw.gui','IDs','match','CustomParamIcons','currentClass','NON_FRAME','SParamVocab3','RegExp','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','Gold','\x20Origin:\x20%1','_pictureContainer','scaleY','xparamRateJS','Scene_Map_initialize','allowShiftScrolling','EISU','Scene_Menu_create','_commandWindow','_storedMapText','xparamFlat1','Scene_Map_updateScene','setViewport','createCustomBackgroundImages','recoverAll','processAlwaysEscape','_active','Scene_Base_createWindowLayer','ColorManager_loadWindowskin','buyWindowRect','createPointAnimationTargets','xparamPlus','Duration','NUMPAD3','Game_Interpreter_command111','VisuMZ_2_BattleSystemBTB','\x5c}❪SHIFT❫\x5c{','outlineColorDmg','loadGameImagesCoreEngine','_refreshBack','ShortcutScripts','PAUSE','ParseTilesetNotetags','onKeyDown','NUMPAD8','createJsQuickFunction','_tile','updateEffekseer','isPreserveTp','xparamRate1','Window_NameInput_processTouch','_mapY','sparamRate1','hit','_stored_ctGaugeColor2','Finish','expRate','Scene_GameEnd_createBackground','F6key','VisuMZ_2_BattleSystemOTB','FontWidthFix','Graphics_centerElement','addOnceParallelInterpreter','Scene_Boot_onDatabaseLoaded','ColorMPGauge1','paramX','MRG','apply','_scaleX','processKeyboardDigitChange','centerCameraCheckData','command122','catchLoadError','ScaleX','IconXParam8','isTouchedInsideFrame','exportAllTroopStrings','CancelText','push','isMenuButtonAssistEnabled','maxItems','OUTQUINT','sin','UNDERSCORE','connected','Scene_Boot_loadSystemImages','strokeRect','ParseArmorNotetags','subject','_startLoading','_patternHeight','mainAreaHeightSideButtonLayout','getTileExtendTerrainTags','_scrollBarVert','MultiKeyFmt','Window_Base_update','textWidth','DETACH_PICTURE_CONTAINER','Window_Selectable_processCursorMove','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ButtonAssist','iconHeight','onEscapeSuccess','numberShowButton','filterArea','deflate','paramRate','scrollbar','_categoryWindow','ParseClassNotetags','SEMICOLON','skipBranch','Unnamed','itemLineRect','DOUBLE_QUOTE','initCoreEasing','updatePlayTestF7','origin','END','battlerHue','Game_Picture_y','SHIFT','TextCodeClassNames','traitsPi','drawGoldItemStyle','adjustY','offset','_skillTypeWindow','_currentMap','_profileWindow','MenuBg','Window_NameInput_cursorDown','URL','targetSpritePosition','Input_updateGamepadState','mute','Armor-%1-%2','escape','up2','StateIconsNonFrame','innerWidth','clamp','ColorTPCost','pictures','onButtonImageLoad','OffBarOpacity','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','isRepeated','_updateFilterArea','_spriteset','_makeFontNameText','Sprite_destroy','%1:\x20Exit\x20','useDigitGroupingEx','SceneManager_onKeyDown','constructor','requestPointAnimation','ColorMPCost','drawGameSubtitle','_targetOffsetY','MRF','Scene_Name_onInputOk','F21','tilesets','keyRepeatWait','INOUTQUART','TRG','Game_Map_changeTileset','Game_Actor_changeClass','tilesetNames','repositionEnemiesByResolution','numberWindowRect','Power','enemies','gradientFillRect','Bitmap_initialize','_rate','resetTextColor','TranslucentOpacity','application/json','_mapX','paintOpacity','worldTransform','win32','_windowLayer','maxLevel','TRAIT_PARAM','addAnimationSpriteToContainer','_editWindow','_stored_systemColor','GoldBgType','WIN_OEM_JUMP','equips','isEnemy','endBattlerActions','responseText','ListRect','DTB','xparamFlat2','DebugConsoleLastControllerID','RightMenus','canAttack','updateFauxAnimations','updateLastTarget','Scene_Name_create','WIN_OEM_AUTO','ItemBgType','Speed','setupFont','_srcBitmap','retreat','animationBaseDelay','Window_Base_createContents','add','ExportAllTroopText','Window_NameInput_processHandling','isPlaying','TAB','_smooth','Window_MapName_refresh','HRG','textColor','Bitmap_clearRect','_pictureCoordinatesWindow','_stored_mpGaugeColor1','maxTp','WIN_ICO_CLEAR','Window_StatusBase_drawActorSimpleStatus','isBottomButtonMode','getParameter','outlineColorGauge','createButtonAssistWindow','EnableNameInput','fillText','PRESERVCONVERSION(%1)','createTextPopupWindow','context','Game_Picture_updateMove','onerror','updateSmoothScroll','createTextState','sv_enemies','show','baseId','getLevel','updateBgmParameters','drawActorNickname','WIN_OEM_FJ_ROYA','AutoStretch','Subtitle','itemHeight','loadIconBitmap','%1〘End\x20Choice\x20Selection〙%1','PLAY','_closing','tileHeight','Game_Picture_x','ScreenShake','_image','ALTGR','Window_NameInput_initialize','Layer','processCursorMoveModernControls','VisuMZ_3_EventChainReact','SkillTypeRect','updateText','allTiles','itemEva','cursorPagedown','jsQuickFunc','isLoopHorizontal','TimeProgress','_paramPlus','MDF','IconSet','_clientArea','parallaxes','Scene_Map_createMenuButton','Map%1.json','Game_Picture_show','onlyfilename','flush','none','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','CoreEngine','_defaultStretchMode','buttonAssistText1','repositionCancelButtonSideButtonLayout','initCoreEngineScreenShake','pictureButtons','ParseSkillNotetags','_startDecrypting','_allTextHeight','PictureShowIcon','Graphics_defaultStretchMode','createCancelButton','MEV','PictureEasingType','eventsXyNt','SwitchRandomizeOne','substring','_previousClass','processDigitChange','paramFlatJS','Sprite_Picture_updateOrigin','moveCancelButtonSideButtonLayout','_number','mirror','background','GroupDigits','setMute','Mirror','setHandler','battleSystem','createDimmerSprite','consumable','toFixed','globalAlpha','updateCurrentEvent','clearCachedKeys','resize','_name','isGamepadConnected','PictureFilename','bgs','CustomParamNames','transform','SceneManager_exit','Plus2','Window_NameInput_refresh','ApplyEasing','onNameOk','ActorTPColor','playCursor','Scene_MenuBase_createPageButtons','volume','isNumpadPressed','randomJS','_url','updatePadding','isSideView','Sprite_Picture_loadBitmap','centerSprite','getControllerInputButtonString','subtitle','_pictureName','IconSParam6','_margin','DurationPerChat','nextLevelExp','CreateBattleSystemID','ValueJS','createMenuButton','refreshActor','alignBottom','_stored_powerUpColor','concat','EncounterRateMinimum','XParamVocab4','buttonAssistOffset4','areButtonsHidden','ColorHPGauge2','targetPosition','Sprite_Animation_setViewport','AutoScrollLockX','buttonY','EquipMenu','%2%1%3','getGamepads','GET','WIN_OEM_ATTN','sparamFlat2','TCR','number','setHome','isAutoColorAffected','WindowLayer_render','ColorSystem','call','Pixelated','cursorLeft','〘Scrolling\x20Text〙\x0a','Window_NameInput_cursorUp','paramBase','_centerElementCoreEngine','openingSpeed','Sprite_Button_initialize','_pointAnimationQueue','_movementDuration','categoryWindowRect','listWindowRect','hide','reserveCommonEvent','Page','Center','ctrlKey','processTimingData','drawActorSimpleStatus','IconParam1','process_VisuMZ_CoreEngine_Notetags','_destroyCanvas','CommandBgType','INEXPO','_viewportSize','Param','max','9109336sRMTkG','characters','_currentBgs','clearOnceParallelInterpreters','Sprite_Actor_setActorHome','scrollRight','performMiss','VisuMZ_4_UniqueTileEffects','initRotation','Scene_TitleTransition','rowSpacing','isFullDocumentTitle','buttonAssistKey2','COMMA','ItemStyle','_anchor','isSpecialCode','SlotRect','_stored_hpGaugeColor2','Basic','playLoad','DefaultMode','_windowskin','toLocaleString','CAPSLOCK','ExtDisplayedParams','onKeyDownKeysF6F7','onInputOk','createBuffer','Game_Interpreter_command355','VOLUME_UP','markCoreEngineModified','ColorPowerUp','Window_Selectable_drawBackgroundRect','keyboard','_CoreEngineSettings','CLOSE_BRACKET','Scene_SingleLoadTransition','pitch','Padding','Scene_Map_createSpriteset','LEFT','%1\x0a','Game_Picture_updateRotation','_repositioned','arePageButtonsEnabled','platform','sceneTerminationClearEffects','active','Scene_Map_updateMainMultiply','right','remove','stop','Name','successRate','Input_clear','GREATER_THAN','Game_Picture_initRotation','Game_Actor_paramBase','isTriggered','updateData','process_VisuMZ_CoreEngine_Settings','paramBaseAboveLevel99','ItemMenu','_addShadow','Game_Actor_levelUp','VariableJsBlock','integer','Game_Map_scrollLeft','loadTitle2','Game_Interpreter_PluginCommand','Window_Selectable_itemRect','isMapScrollLinked','CommandWidth','Game_Picture_scaleX','KeyTAB','registerCommand','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','_height','QUESTION_MARK','zoomScale','_cancelButton','faces','Sprite_Button_updateOpacity','maxVert','processKeyboardHome','canUse','mpCostColor','removeAnimation','CategoryBgType','_mode','doesNameContainBannedWords','createFauxAnimationSprite','updatePositionCoreEngineShakeOriginal','PictureEraseRange','clone','_lastOrigin','start','menu','processCursorMove','Window_Gold_refresh','deathColor','OkText','HelpBgType','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','makeTargetSprites','SystemSetWindowPadding','isMVAnimation','value','_backSprite1','list','playCancel','setDisplayPos','pow','BlendMode','SellBgType','AudioChangeBgsVolume','rightArrowWidth','framesMin','HELP','loadPicture','targetContentsOpacity','textBaseline','Window_NumberInput_processDigitChange','keyMapper','OpenConsole','restore','GameEnd','coreEngineRepositionEnemies','drawCurrencyValue','removeOnceParallelInterpreter','_pressed','events','startMove','ParseItemNotetags','(\x5cd+)>','paramMax','_offsetY','select','INCIRC','itemBackColor2','getColor','title','hasEncryptedImages','_optionsWindow','buttonAreaHeight','Game_Interpreter_updateWaitMode','GoldChange','cursorDown','setTargetAnchor','stringKeyMap','storeMapData','updateOnceParallelInterpreters','DisplayLockY','Game_Screen_initialize','DEFAULT_SHIFT_Y','([\x5c+\x5c-]\x5cd+)>','Game_Map_scrollDown','updateKeyText','_mp','processKeyboardDelete','move','anchor','removePointAnimation','isOptionValid','_lastScrollBarValues','clearStencil','TextJS','sv_actors','HOME','command355','addCommand','Window_EquipItem_isEnabled','setActorHomeRepositioned','updateDocumentTitle','sparamPlusJS','BACK_QUOTE','StatusRect','terminate','Game_Temp_initialize','smoothSelect','levelUpRecovery','cursorPageup','popScene','expGaugeColor1','_buttonType','scrollX','uiAreaWidth','_troopId','blendFunc','refreshWithTextCodeSupport','createAnimationSprite','#%1','setupButtonImage','blt','SEPARATOR','Window_NameInput_cursorRight','F15','NUMPAD9','scaleMode','toString','_listWindow','Game_Interpreter_command105','normalColor','itemHitImprovedAccuracy','encounterStepsMinimum','updateAnchor','gaugeLineHeight','TargetAngle','_statusParamsWindow','scrollY','STR','ImprovedAccuracySystem','setWindowPadding','Spriteset_Battle_createEnemies','IconXParam9','setValue','AudioChangeBgmVolume','EVAL','paramRate2','GoldOverlap','_anglePlus','RPGMAKER_VERSION','params','changeClass','_centerCameraCheck','LATIN1','_animationSprites','CLOSE_PAREN','clearRect','IconSParam9','NUMPAD0','setSideButtonLayout','_stored_hpGaugeColor1','Graphics','titles2','VisuMZ_2_BattleSystemCTB','_actorWindow','retrievePointAnimation','pageup','setAnchor','layeredTiles','setLastPluginCommandInterpreter','targetObjects','HelpRect','BattleManager_update','ExtractStrFromTroop','_text','_forcedBattleSys','NUMPAD5','setMainFontSize','hideButtonFromView','CustomParamAbb','buttonAssistOffset5','ColorNormal','gaugeBackColor','PreserveNumbers','removeAnimationFromContainer','REC','backspace','textAlign','parameters','selectLast','MapOnceParallel','useDigitGrouping','Y:\x20%1','adjustPictureAntiZoom','invokeCounterAttack','prepareNextScene','cursorRight','LINEAR','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','CEV','save','rgba(0,\x200,\x200,\x201.0)','updateOpacity','keyCode','_stored_tpGaugeColor1','CommonEventID','buttonAssistOk','ColSpacing','Game_BattlerBase_refresh','axes','OUTBOUNCE','TitleCommandList','drawBackgroundRect','ControllerMatches','Scene_Base_terminate','_balloonQueue','applyForcedGameTroopSettingsCoreEngine','alpha','ATTN','WIN_ICO_HELP','parse','batch','result','CRI','Opacity','PictureRotateBy','Scene_MenuBase_mainAreaHeight','render','refresh','Window_Base_drawFace','redraw','currentExp','_textQueue','KeyUnlisted','wait','isPlaytest','_opening','ENTER_SPECIAL','picture','Window_Base_drawCharacter','AutoScrollLockY','BattleSystem','innerHeight','getInputButtonString','MIN_SAFE_INTEGER','CorrectSkinBleeding','target','Game_Picture_initBasic','GRD','createPointAnimation','SystemSetFontSize','%1〘Choice\x20%2〙\x20%3%1','reduce','erasePicture','Game_Action_setAttack','SkillTypeBgType','Linear','actorWindowRect','ItemBackColor2','ButtonHeight','defineProperty','INQUAD','SLASH','randomInt','updateFrameCoreEngine','offsetX','BgFilename2','GoldMax','setCommonEvent','LoadError','Scene_MenuBase_mainAreaTop','targetEvaRate','numActions','Rate2','ARRAYNUM','scaleSprite','checkSubstitute','MvAnimationRate','_tilemap','WIN_OEM_FJ_TOUROKU','_storedStack','EXSEL','Window_Scrollable_update','FontShadows','checkPlayerLocation','IconParam5','seek','PTB','onMoveEnd','turn','pagedownShowButton','COLON','IconXParam7','_inputWindow','valueOutlineColor','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','_stored_gaugeBackColor','displayX','button','_refreshPauseSign','_screenX','EndingID','_targetAnchor','format','buttonAssistWindowRect','targetX','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','Window_SkillList_includes','anchorCoreEasing','option','setBattleSystem','WIN_OEM_PA2','runCombinedScrollingTextAsCode','_drawTextBody','resetBattleSystem','onload','sparamPlus2','CTB','CRSEL','level'];_0x71fa=function(){return _0x5139d1;};return _0x71fa();}VisuMZ[_0x288220(0x665)][_0x288220(0x624)]=Window_MapName[_0x288220(0x93f)]['refresh'],Window_MapName[_0x288220(0x93f)]['refresh']=function(){const _0xbcb4d8=_0x288220;VisuMZ[_0xbcb4d8(0x665)][_0xbcb4d8(0x30a)]['QoL'][_0xbcb4d8(0x917)]?this[_0xbcb4d8(0x79d)]():VisuMZ[_0xbcb4d8(0x665)]['Window_MapName_refresh'][_0xbcb4d8(0x6c3)](this);},Window_MapName[_0x288220(0x93f)][_0x288220(0x79d)]=function(){const _0x3cc900=_0x288220;this[_0x3cc900(0x244)][_0x3cc900(0x895)]();if($gameMap[_0x3cc900(0x435)]()){const _0x3d3b2e=this['innerWidth'];this[_0x3cc900(0x927)](0x0,0x0,_0x3d3b2e,this['lineHeight']());const _0x4c05c1=this['textSizeEx']($gameMap[_0x3cc900(0x435)]())[_0x3cc900(0x426)];this[_0x3cc900(0x506)]($gameMap[_0x3cc900(0x435)](),Math[_0x3cc900(0x25e)]((_0x3d3b2e-_0x4c05c1)/0x2),0x0);}},Window_TitleCommand[_0x288220(0x2d4)]=VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['TitleCommandList'],Window_TitleCommand[_0x288220(0x93f)][_0x288220(0x303)]=function(){const _0x3925f4=_0x288220;this[_0x3925f4(0x92c)]();},Window_TitleCommand[_0x288220(0x93f)][_0x288220(0x92c)]=function(){const _0x4fda2a=_0x288220;for(const _0x47ecae of Window_TitleCommand[_0x4fda2a(0x2d4)]){if(_0x47ecae[_0x4fda2a(0x279)][_0x4fda2a(0x6c3)](this)){const _0x1911cd=_0x47ecae['Symbol'];let _0x29fb55=_0x47ecae[_0x4fda2a(0x98e)];if(['',_0x4fda2a(0x511)]['includes'](_0x29fb55))_0x29fb55=_0x47ecae[_0x4fda2a(0x786)][_0x4fda2a(0x6c3)](this);const _0x58af8a=_0x47ecae[_0x4fda2a(0x4ce)][_0x4fda2a(0x6c3)](this),_0x48bfc5=_0x47ecae[_0x4fda2a(0x45c)][_0x4fda2a(0x6c3)](this);this[_0x4fda2a(0x78a)](_0x29fb55,_0x1911cd,_0x58af8a,_0x48bfc5),this[_0x4fda2a(0x681)](_0x1911cd,_0x47ecae[_0x4fda2a(0x371)][_0x4fda2a(0x3c9)](this,_0x48bfc5));}}},VisuMZ[_0x288220(0x665)][_0x288220(0x4f2)]=Window_TitleCommand[_0x288220(0x93f)]['selectLast'],Window_TitleCommand[_0x288220(0x93f)]['selectLast']=function(){const _0x45ee12=_0x288220;VisuMZ[_0x45ee12(0x665)][_0x45ee12(0x4f2)][_0x45ee12(0x6c3)](this);if(!Window_TitleCommand[_0x45ee12(0x478)])return;const _0x4a072a=this['findSymbol'](Window_TitleCommand[_0x45ee12(0x478)]),_0x48d6a7=Math['floor'](this[_0x45ee12(0x4c5)]()/0x2)-0x1;this['smoothSelect'](_0x4a072a),this[_0x45ee12(0x40e)]>0x1&&(this[_0x45ee12(0x40e)]=0x1,this[_0x45ee12(0x638)]()),this[_0x45ee12(0x2f1)](_0x4a072a-_0x48d6a7);},Window_GameEnd[_0x288220(0x2d4)]=VisuMZ['CoreEngine'][_0x288220(0x30a)]['MenuLayout'][_0x288220(0x75e)]['CommandList'],Window_GameEnd[_0x288220(0x93f)]['makeCommandList']=function(){const _0x208664=_0x288220;this[_0x208664(0x92c)]();},Window_GameEnd[_0x288220(0x93f)]['makeCoreEngineCommandList']=function(){const _0x27a8c8=_0x288220;for(const _0x557fa0 of Window_GameEnd['_commandList']){if(_0x557fa0[_0x27a8c8(0x279)]['call'](this)){const _0x51b900=_0x557fa0[_0x27a8c8(0x364)];let _0x47d8a8=_0x557fa0['TextStr'];if(['',_0x27a8c8(0x511)]['includes'](_0x47d8a8))_0x47d8a8=_0x557fa0[_0x27a8c8(0x786)][_0x27a8c8(0x6c3)](this);const _0x5b1e91=_0x557fa0[_0x27a8c8(0x4ce)][_0x27a8c8(0x6c3)](this),_0x47da63=_0x557fa0[_0x27a8c8(0x45c)][_0x27a8c8(0x6c3)](this);this[_0x27a8c8(0x78a)](_0x47d8a8,_0x51b900,_0x5b1e91,_0x47da63),this['setHandler'](_0x51b900,_0x557fa0[_0x27a8c8(0x371)][_0x27a8c8(0x3c9)](this,_0x47da63));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x288220(0x93f)]=Object['create'](Window_Base['prototype']),Window_ButtonAssist['prototype'][_0x288220(0x5e4)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x288220(0x501)]=function(_0x5992af){const _0x49e527=_0x288220;this['_data']={},Window_Base[_0x49e527(0x93f)][_0x49e527(0x501)][_0x49e527(0x6c3)](this,_0x5992af),this[_0x49e527(0x8c1)](VisuMZ[_0x49e527(0x665)]['Settings'][_0x49e527(0x5ad)][_0x49e527(0x1d1)]||0x0),this[_0x49e527(0x80c)]();},Window_ButtonAssist[_0x288220(0x93f)][_0x288220(0x91b)]=function(){const _0x3c3fe1=_0x288220;return this[_0x3c3fe1(0x81a)]||Window_Base[_0x3c3fe1(0x93f)]['lineHeight']['call'](this);},Window_ButtonAssist[_0x288220(0x93f)][_0x288220(0x1d6)]=function(){const _0x2a8035=_0x288220;this['contents'][_0x2a8035(0x4d6)]<=0x60&&(this[_0x2a8035(0x244)]['fontSize']+=0x6);},Window_ButtonAssist[_0x288220(0x93f)][_0x288220(0x91d)]=function(){const _0x280b4a=_0x288220;this['contents'][_0x280b4a(0x4d6)]>=0x18&&(this[_0x280b4a(0x244)][_0x280b4a(0x4d6)]-=0x6);},Window_ButtonAssist[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0x37b2cb=_0x288220;Window_Base[_0x37b2cb(0x93f)][_0x37b2cb(0x508)][_0x37b2cb(0x6c3)](this),this[_0x37b2cb(0x77d)]();},Window_ButtonAssist[_0x288220(0x93f)][_0x288220(0x69c)]=function(){const _0x2fcab3=_0x288220;this[_0x2fcab3(0x35e)]=SceneManager['_scene'][_0x2fcab3(0x8dc)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x288220(0x93f)]['updateKeyText']=function(){const _0x31a674=_0x288220,_0x74eaf4=SceneManager[_0x31a674(0x482)];for(let _0x7d98ec=0x1;_0x7d98ec<=0x5;_0x7d98ec++){if(this[_0x31a674(0x221)][_0x31a674(0x4d8)['format'](_0x7d98ec)]!==_0x74eaf4[_0x31a674(0x9a1)[_0x31a674(0x857)](_0x7d98ec)]())return this[_0x31a674(0x80c)]();if(this[_0x31a674(0x221)][_0x31a674(0x326)['format'](_0x7d98ec)]!==_0x74eaf4[_0x31a674(0x4db)[_0x31a674(0x857)](_0x7d98ec)]())return this['refresh']();}},Window_ButtonAssist['prototype'][_0x288220(0x80c)]=function(){const _0x210a45=_0x288220;this[_0x210a45(0x244)][_0x210a45(0x895)]();for(let _0x4c8822=0x1;_0x4c8822<=0x5;_0x4c8822++){this['drawSegment'](_0x4c8822);}},Window_ButtonAssist['prototype'][_0x288220(0x8b7)]=function(_0x10fd92){const _0x5b960d=_0x288220,_0x360435=this['innerWidth']/0x5,_0x39170f=SceneManager[_0x5b960d(0x482)],_0x2a788d=_0x39170f[_0x5b960d(0x9a1)[_0x5b960d(0x857)](_0x10fd92)](),_0x122290=_0x39170f[_0x5b960d(0x4db)[_0x5b960d(0x857)](_0x10fd92)]();this['_data'][_0x5b960d(0x4d8)['format'](_0x10fd92)]=_0x2a788d,this[_0x5b960d(0x221)]['text%1'[_0x5b960d(0x857)](_0x10fd92)]=_0x122290;if(_0x2a788d==='')return;if(_0x122290==='')return;const _0x51a434=_0x39170f['buttonAssistOffset%1'[_0x5b960d(0x857)](_0x10fd92)](),_0x5467c9=this[_0x5b960d(0x8a9)](),_0x39c661=_0x360435*(_0x10fd92-0x1)+_0x5467c9+_0x51a434,_0x2443e9=VisuMZ[_0x5b960d(0x665)][_0x5b960d(0x30a)][_0x5b960d(0x5ad)][_0x5b960d(0x923)];this[_0x5b960d(0x506)](_0x2443e9['format'](_0x2a788d,_0x122290),_0x39c661,0x0,_0x360435-_0x5467c9*0x2);},VisuMZ[_0x288220(0x665)][_0x288220(0x771)]=Game_Interpreter[_0x288220(0x93f)]['updateWaitMode'],Game_Interpreter['prototype'][_0x288220(0x9a0)]=function(){const _0x485a59=_0x288220;if($gameTemp[_0x485a59(0x344)]!==undefined)return VisuMZ[_0x485a59(0x665)][_0x485a59(0x29e)]();return VisuMZ[_0x485a59(0x665)][_0x485a59(0x771)][_0x485a59(0x6c3)](this);},VisuMZ[_0x288220(0x665)][_0x288220(0x29e)]=function(){const _0xf57d14=_0x288220,_0x318749=$gameTemp[_0xf57d14(0x344)]||0x0;(_0x318749<0x0||_0x318749>0x64||TouchInput[_0xf57d14(0x99f)]()||Input[_0xf57d14(0x71a)](_0xf57d14(0x4df)))&&($gameTemp[_0xf57d14(0x344)]=undefined,Input['clear'](),TouchInput[_0xf57d14(0x895)]());const _0x229892=$gameScreen[_0xf57d14(0x816)](_0x318749);return _0x229892&&(_0x229892['_x']=TouchInput['_x'],_0x229892['_y']=TouchInput['_y']),VisuMZ[_0xf57d14(0x665)]['updatePictureCoordinates'](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x288220(0x665)][_0x288220(0x442)]=function(){const _0x31da76=_0x288220,_0x12d96a=SceneManager['_scene'];if(!_0x12d96a)return;!_0x12d96a[_0x31da76(0x628)]&&(SoundManager[_0x31da76(0x6f3)](),_0x12d96a[_0x31da76(0x628)]=new Window_PictureCoordinates(),_0x12d96a['addChild'](_0x12d96a['_pictureCoordinatesWindow'])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x31da76(0x74e)](),_0x12d96a['removeChild'](_0x12d96a[_0x31da76(0x628)]),_0x12d96a[_0x31da76(0x628)]=undefined);};function Window_PictureCoordinates(){const _0x59ee3b=_0x288220;this[_0x59ee3b(0x501)](...arguments);}Window_PictureCoordinates[_0x288220(0x93f)]=Object[_0x288220(0x898)](Window_Base['prototype']),Window_PictureCoordinates['prototype'][_0x288220(0x5e4)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype']['initialize']=function(){const _0x2d3081=_0x288220;this[_0x2d3081(0x73f)]=_0x2d3081(0x292),this[_0x2d3081(0x2dc)]=_0x2d3081(0x292),this[_0x2d3081(0x8f1)]=_0x2d3081(0x292);const _0x1eeaae=this[_0x2d3081(0x1e3)]();Window_Base[_0x2d3081(0x93f)]['initialize'][_0x2d3081(0x6c3)](this,_0x1eeaae),this[_0x2d3081(0x8c1)](0x2);},Window_PictureCoordinates[_0x288220(0x93f)][_0x288220(0x1e3)]=function(){const _0x47308c=_0x288220;let _0x356d18=0x0,_0x5897de=Graphics[_0x47308c(0x4b9)]-this[_0x47308c(0x91b)](),_0x52302a=Graphics[_0x47308c(0x426)],_0x185f79=this['lineHeight']();return new Rectangle(_0x356d18,_0x5897de,_0x52302a,_0x185f79);},Window_PictureCoordinates[_0x288220(0x93f)][_0x288220(0x69c)]=function(){const _0x39fbd2=_0x288220;this[_0x39fbd2(0x35e)]=0x0;},Window_PictureCoordinates[_0x288220(0x93f)]['update']=function(){const _0x3743b4=_0x288220;Window_Base[_0x3743b4(0x93f)][_0x3743b4(0x508)][_0x3743b4(0x6c3)](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x288220(0x71b)]=function(){const _0x3c0150=_0x288220;if(!this[_0x3c0150(0x388)]())return;this[_0x3c0150(0x80c)]();},Window_PictureCoordinates[_0x288220(0x93f)][_0x288220(0x388)]=function(){const _0xeee614=_0x288220,_0xebcc48=$gameTemp[_0xeee614(0x344)],_0x2f811a=$gameScreen[_0xeee614(0x816)](_0xebcc48);return _0x2f811a?this[_0xeee614(0x73f)]!==_0x2f811a[_0xeee614(0x4f8)]||this['_lastX']!==_0x2f811a['_x']||this[_0xeee614(0x8f1)]!==_0x2f811a['_y']:![];},Window_PictureCoordinates[_0x288220(0x93f)]['refresh']=function(){const _0x5b2865=_0x288220;this[_0x5b2865(0x244)]['clear']();const _0x18dc96=$gameTemp[_0x5b2865(0x344)],_0x139b4b=$gameScreen['picture'](_0x18dc96);if(!_0x139b4b)return;this[_0x5b2865(0x73f)]=_0x139b4b['_origin'],this['_lastX']=_0x139b4b['_x'],this['_lastY']=_0x139b4b['_y'];const _0x29811b=ColorManager[_0x5b2865(0x8d1)]();this['contents'][_0x5b2865(0x363)](0x0,0x0,this[_0x5b2865(0x5d5)],this[_0x5b2865(0x81a)],_0x29811b);const _0x102d41=_0x5b2865(0x553)['format'](_0x139b4b[_0x5b2865(0x4f8)]===0x0?_0x5b2865(0x4b4):_0x5b2865(0x6d3)),_0x1db988=_0x5b2865(0x401)['format'](_0x139b4b['_x']),_0x51767c=_0x5b2865(0x7e8)[_0x5b2865(0x857)](_0x139b4b['_y']),_0xc22bb8=_0x5b2865(0x5e1)[_0x5b2865(0x857)](TextManager[_0x5b2865(0x81b)](_0x5b2865(0x4df)));let _0x4ecdc5=Math[_0x5b2865(0x25e)](this[_0x5b2865(0x5d5)]/0x4);this[_0x5b2865(0x3d0)](_0x102d41,_0x4ecdc5*0x0,0x0,_0x4ecdc5),this[_0x5b2865(0x3d0)](_0x1db988,_0x4ecdc5*0x1,0x0,_0x4ecdc5,_0x5b2865(0x295)),this['drawText'](_0x51767c,_0x4ecdc5*0x2,0x0,_0x4ecdc5,_0x5b2865(0x295));const _0x484dfe=this[_0x5b2865(0x922)](_0xc22bb8)[_0x5b2865(0x426)],_0x266b4a=this[_0x5b2865(0x5d5)]-_0x484dfe;this[_0x5b2865(0x506)](_0xc22bb8,_0x266b4a,0x0,_0x484dfe);};function Window_TextPopup(){const _0x5e72f8=_0x288220;this[_0x5e72f8(0x501)](...arguments);}Window_TextPopup['prototype']=Object[_0x288220(0x898)](Window_Base[_0x288220(0x93f)]),Window_TextPopup[_0x288220(0x93f)][_0x288220(0x5e4)]=Window_TextPopup,Window_TextPopup[_0x288220(0x8d9)]={'framesPerChar':VisuMZ[_0x288220(0x665)][_0x288220(0x30a)]['Window'][_0x288220(0x6a5)]??1.5,'framesMin':VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x34b)][_0x288220(0x264)]??0x5a,'framesMax':VisuMZ[_0x288220(0x665)][_0x288220(0x30a)][_0x288220(0x34b)][_0x288220(0x40b)]??0x12c},Window_TextPopup[_0x288220(0x93f)][_0x288220(0x501)]=function(){const _0x1dffb0=_0x288220,_0x5c7b2c=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x1dffb0(0x93f)][_0x1dffb0(0x501)][_0x1dffb0(0x6c3)](this,_0x5c7b2c),this[_0x1dffb0(0x280)]=0x0,this[_0x1dffb0(0x7d6)]='',this[_0x1dffb0(0x810)]=[],this[_0x1dffb0(0x8ad)]=0x0;},Window_TextPopup[_0x288220(0x93f)][_0x288220(0x6c0)]=function(){return!![];},Window_TextPopup[_0x288220(0x93f)]['addQueue']=function(_0x24936c){const _0x58fefc=_0x288220;if(this[_0x58fefc(0x810)][this[_0x58fefc(0x810)][_0x58fefc(0x2cd)]-0x1]===_0x24936c)return;this[_0x58fefc(0x810)][_0x58fefc(0x597)](_0x24936c),SceneManager['_scene'][_0x58fefc(0x912)](this);},Window_TextPopup[_0x288220(0x93f)][_0x288220(0x508)]=function(){const _0xa6f45a=_0x288220;Window_Base[_0xa6f45a(0x93f)]['update']['call'](this),this['updateText'](),this[_0xa6f45a(0x27b)]();},Window_TextPopup[_0x288220(0x93f)][_0x288220(0x652)]=function(){const _0x36ffe3=_0x288220;if(this[_0x36ffe3(0x7d6)]!=='')return;if(this[_0x36ffe3(0x810)][_0x36ffe3(0x2cd)]<=0x0)return;if(!this[_0x36ffe3(0x936)]())return;this[_0x36ffe3(0x7d6)]=this[_0x36ffe3(0x810)]['shift']();const _0x2d84a3=Window_TextPopup[_0x36ffe3(0x8d9)],_0x57cb4f=Math['ceil'](this[_0x36ffe3(0x7d6)][_0x36ffe3(0x2cd)]*_0x2d84a3['framesPerChar']);this[_0x36ffe3(0x8ad)]=_0x57cb4f['clamp'](_0x2d84a3[_0x36ffe3(0x755)],_0x2d84a3[_0x36ffe3(0x32d)]);const _0x323531=this['textSizeEx'](this[_0x36ffe3(0x7d6)]);let _0x1a9ebc=_0x323531['width']+this[_0x36ffe3(0x8a9)]()*0x2;_0x1a9ebc+=$gameSystem['windowPadding']()*0x2;let _0x1ecbc0=Math[_0x36ffe3(0x6de)](_0x323531[_0x36ffe3(0x4b9)],this[_0x36ffe3(0x91b)]());_0x1ecbc0+=$gameSystem[_0x36ffe3(0x913)]()*0x2;const _0x25a138=Math[_0x36ffe3(0x3ff)]((Graphics[_0x36ffe3(0x426)]-_0x1a9ebc)/0x2),_0x247c92=Math[_0x36ffe3(0x3ff)]((Graphics[_0x36ffe3(0x4b9)]-_0x1ecbc0)/0x2),_0xa9e5a7=new Rectangle(_0x25a138,_0x247c92,_0x1a9ebc,_0x1ecbc0);this[_0x36ffe3(0x780)](_0xa9e5a7['x'],_0xa9e5a7['y'],_0xa9e5a7['width'],_0xa9e5a7[_0x36ffe3(0x4b9)]),this[_0x36ffe3(0x903)](),this[_0x36ffe3(0x80c)](),this['open'](),SceneManager[_0x36ffe3(0x482)][_0x36ffe3(0x912)](this);},Window_TextPopup[_0x288220(0x93f)]['refresh']=function(){const _0x322da8=_0x288220,_0x139f58=this[_0x322da8(0x4e4)]();this[_0x322da8(0x244)][_0x322da8(0x895)](),this[_0x322da8(0x506)](this['_text'],_0x139f58['x'],_0x139f58['y'],_0x139f58[_0x322da8(0x426)]);},Window_TextPopup['prototype'][_0x288220(0x27b)]=function(){const _0x21d330=_0x288220;if(this[_0x21d330(0x4c3)]()||this[_0x21d330(0x2b4)]())return;if(this[_0x21d330(0x8ad)]<=0x0)return;this[_0x21d330(0x8ad)]--,this[_0x21d330(0x8ad)]<=0x0&&(this[_0x21d330(0x517)](),this['_text']='');},VisuMZ[_0x288220(0x4d1)]=function(_0xfb8e01){const _0x4dd759=_0x288220;if(Utils[_0x4dd759(0x783)](_0x4dd759(0x4c4))){var _0x211bbb=require(_0x4dd759(0x549))['Window'][_0x4dd759(0x516)]();SceneManager[_0x4dd759(0x2bc)]();if(_0xfb8e01)setTimeout(_0x211bbb[_0x4dd759(0x90c)][_0x4dd759(0x3c9)](_0x211bbb),0x190);}},VisuMZ[_0x288220(0x693)]=function(_0x113fc9,_0x47e055){const _0x241890=_0x288220;_0x47e055=_0x47e055[_0x241890(0x489)]();var _0xd0acb0=1.70158,_0x3e39bb=0.7;switch(_0x47e055){case _0x241890(0x7ed):return _0x113fc9;case'INSINE':return-0x1*Math[_0x241890(0x475)](_0x113fc9*(Math['PI']/0x2))+0x1;case _0x241890(0x9a3):return Math[_0x241890(0x59b)](_0x113fc9*(Math['PI']/0x2));case _0x241890(0x50c):return-0.5*(Math[_0x241890(0x475)](Math['PI']*_0x113fc9)-0x1);case _0x241890(0x82d):return _0x113fc9*_0x113fc9;case'OUTQUAD':return _0x113fc9*(0x2-_0x113fc9);case _0x241890(0x1f8):return _0x113fc9<0.5?0x2*_0x113fc9*_0x113fc9:-0x1+(0x4-0x2*_0x113fc9)*_0x113fc9;case _0x241890(0x4a5):return _0x113fc9*_0x113fc9*_0x113fc9;case _0x241890(0x483):var _0x89ea62=_0x113fc9-0x1;return _0x89ea62*_0x89ea62*_0x89ea62+0x1;case'INOUTCUBIC':return _0x113fc9<0.5?0x4*_0x113fc9*_0x113fc9*_0x113fc9:(_0x113fc9-0x1)*(0x2*_0x113fc9-0x2)*(0x2*_0x113fc9-0x2)+0x1;case _0x241890(0x444):return _0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9;case'OUTQUART':var _0x89ea62=_0x113fc9-0x1;return 0x1-_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62;case _0x241890(0x5ee):var _0x89ea62=_0x113fc9-0x1;return _0x113fc9<0.5?0x8*_0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9:0x1-0x8*_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62;case'INQUINT':return _0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9;case _0x241890(0x59a):var _0x89ea62=_0x113fc9-0x1;return 0x1+_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62;case'INOUTQUINT':var _0x89ea62=_0x113fc9-0x1;return _0x113fc9<0.5?0x10*_0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9*_0x113fc9:0x1+0x10*_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62*_0x89ea62;case _0x241890(0x6db):if(_0x113fc9===0x0)return 0x0;return Math[_0x241890(0x750)](0x2,0xa*(_0x113fc9-0x1));case _0x241890(0x4ad):if(_0x113fc9===0x1)return 0x1;return-Math[_0x241890(0x750)](0x2,-0xa*_0x113fc9)+0x1;case'INOUTEXPO':if(_0x113fc9===0x0||_0x113fc9===0x1)return _0x113fc9;var _0x4db7e5=_0x113fc9*0x2,_0x5d2345=_0x4db7e5-0x1;if(_0x4db7e5<0x1)return 0.5*Math[_0x241890(0x750)](0x2,0xa*_0x5d2345);return 0.5*(-Math[_0x241890(0x750)](0x2,-0xa*_0x5d2345)+0x2);case _0x241890(0x76a):var _0x4db7e5=_0x113fc9/0x1;return-0x1*(Math[_0x241890(0x940)](0x1-_0x4db7e5*_0x113fc9)-0x1);case _0x241890(0x28f):var _0x89ea62=_0x113fc9-0x1;return Math[_0x241890(0x940)](0x1-_0x89ea62*_0x89ea62);case _0x241890(0x534):var _0x4db7e5=_0x113fc9*0x2,_0x5d2345=_0x4db7e5-0x2;if(_0x4db7e5<0x1)return-0.5*(Math['sqrt'](0x1-_0x4db7e5*_0x4db7e5)-0x1);return 0.5*(Math[_0x241890(0x940)](0x1-_0x5d2345*_0x5d2345)+0x1);case _0x241890(0x3c0):return _0x113fc9*_0x113fc9*((_0xd0acb0+0x1)*_0x113fc9-_0xd0acb0);case _0x241890(0x90b):var _0x4db7e5=_0x113fc9/0x1-0x1;return _0x4db7e5*_0x4db7e5*((_0xd0acb0+0x1)*_0x4db7e5+_0xd0acb0)+0x1;break;case _0x241890(0x880):var _0x4db7e5=_0x113fc9*0x2,_0x217c4=_0x4db7e5-0x2,_0x4aa16b=_0xd0acb0*1.525;if(_0x4db7e5<0x1)return 0.5*_0x4db7e5*_0x4db7e5*((_0x4aa16b+0x1)*_0x4db7e5-_0x4aa16b);return 0.5*(_0x217c4*_0x217c4*((_0x4aa16b+0x1)*_0x217c4+_0x4aa16b)+0x2);case _0x241890(0x36b):if(_0x113fc9===0x0||_0x113fc9===0x1)return _0x113fc9;var _0x4db7e5=_0x113fc9/0x1,_0x5d2345=_0x4db7e5-0x1,_0x118cad=0x1-_0x3e39bb,_0x4aa16b=_0x118cad/(0x2*Math['PI'])*Math[_0x241890(0x340)](0x1);return-(Math[_0x241890(0x750)](0x2,0xa*_0x5d2345)*Math[_0x241890(0x59b)]((_0x5d2345-_0x4aa16b)*(0x2*Math['PI'])/_0x118cad));case _0x241890(0x2bb):var _0x118cad=0x1-_0x3e39bb,_0x4db7e5=_0x113fc9*0x2;if(_0x113fc9===0x0||_0x113fc9===0x1)return _0x113fc9;var _0x4aa16b=_0x118cad/(0x2*Math['PI'])*Math[_0x241890(0x340)](0x1);return Math['pow'](0x2,-0xa*_0x4db7e5)*Math['sin']((_0x4db7e5-_0x4aa16b)*(0x2*Math['PI'])/_0x118cad)+0x1;case _0x241890(0x2c9):var _0x118cad=0x1-_0x3e39bb;if(_0x113fc9===0x0||_0x113fc9===0x1)return _0x113fc9;var _0x4db7e5=_0x113fc9*0x2,_0x5d2345=_0x4db7e5-0x1,_0x4aa16b=_0x118cad/(0x2*Math['PI'])*Math[_0x241890(0x340)](0x1);if(_0x4db7e5<0x1)return-0.5*(Math[_0x241890(0x750)](0x2,0xa*_0x5d2345)*Math['sin']((_0x5d2345-_0x4aa16b)*(0x2*Math['PI'])/_0x118cad));return Math[_0x241890(0x750)](0x2,-0xa*_0x5d2345)*Math['sin']((_0x5d2345-_0x4aa16b)*(0x2*Math['PI'])/_0x118cad)*0.5+0x1;case _0x241890(0x7fa):var _0x4db7e5=_0x113fc9/0x1;if(_0x4db7e5<0x1/2.75)return 7.5625*_0x4db7e5*_0x4db7e5;else{if(_0x4db7e5<0x2/2.75){var _0x217c4=_0x4db7e5-1.5/2.75;return 7.5625*_0x217c4*_0x217c4+0.75;}else{if(_0x4db7e5<2.5/2.75){var _0x217c4=_0x4db7e5-2.25/2.75;return 7.5625*_0x217c4*_0x217c4+0.9375;}else{var _0x217c4=_0x4db7e5-2.625/2.75;return 7.5625*_0x217c4*_0x217c4+0.984375;}}}case'INBOUNCE':var _0x4bccdf=0x1-VisuMZ[_0x241890(0x693)](0x1-_0x113fc9,_0x241890(0x20e));return _0x4bccdf;case'INOUTBOUNCE':if(_0x113fc9<0.5)var _0x4bccdf=VisuMZ[_0x241890(0x693)](_0x113fc9*0x2,_0x241890(0x98b))*0.5;else var _0x4bccdf=VisuMZ[_0x241890(0x693)](_0x113fc9*0x2-0x1,_0x241890(0x20e))*0.5+0.5;return _0x4bccdf;default:return _0x113fc9;}},VisuMZ[_0x288220(0x42d)]=function(_0x5e79fc){const _0x203848=_0x288220;_0x5e79fc=String(_0x5e79fc)[_0x203848(0x489)]();const _0x4c26e0=VisuMZ['CoreEngine']['Settings'][_0x203848(0x6dd)];if(_0x5e79fc===_0x203848(0x887))return _0x4c26e0[_0x203848(0x41c)];if(_0x5e79fc===_0x203848(0x283))return _0x4c26e0[_0x203848(0x6d7)];if(_0x5e79fc===_0x203848(0x46c))return _0x4c26e0['IconParam2'];if(_0x5e79fc===_0x203848(0x8bd))return _0x4c26e0[_0x203848(0x49c)];if(_0x5e79fc===_0x203848(0x445))return _0x4c26e0['IconParam4'];if(_0x5e79fc==='MDF')return _0x4c26e0[_0x203848(0x845)];if(_0x5e79fc===_0x203848(0x908))return _0x4c26e0[_0x203848(0x209)];if(_0x5e79fc===_0x203848(0x293))return _0x4c26e0[_0x203848(0x219)];if(_0x5e79fc===_0x203848(0x452))return _0x4c26e0['IconXParam0'];if(_0x5e79fc==='EVA')return _0x4c26e0['IconXParam1'];if(_0x5e79fc===_0x203848(0x807))return _0x4c26e0['IconXParam2'];if(_0x5e79fc==='CEV')return _0x4c26e0[_0x203848(0x335)];if(_0x5e79fc===_0x203848(0x671))return _0x4c26e0['IconXParam4'];if(_0x5e79fc===_0x203848(0x5e9))return _0x4c26e0['IconXParam5'];if(_0x5e79fc===_0x203848(0x3f4))return _0x4c26e0[_0x203848(0x27a)];if(_0x5e79fc==='HRG')return _0x4c26e0[_0x203848(0x84c)];if(_0x5e79fc===_0x203848(0x58b))return _0x4c26e0[_0x203848(0x593)];if(_0x5e79fc===_0x203848(0x5ef))return _0x4c26e0[_0x203848(0x7b6)];if(_0x5e79fc==='TGR')return _0x4c26e0[_0x203848(0x531)];if(_0x5e79fc===_0x203848(0x820))return _0x4c26e0[_0x203848(0x32c)];if(_0x5e79fc==='REC')return _0x4c26e0[_0x203848(0x33e)];if(_0x5e79fc==='PHA')return _0x4c26e0[_0x203848(0x345)];if(_0x5e79fc===_0x203848(0x925))return _0x4c26e0['IconSParam4'];if(_0x5e79fc===_0x203848(0x6bd))return _0x4c26e0[_0x203848(0x380)];if(_0x5e79fc===_0x203848(0x463))return _0x4c26e0[_0x203848(0x6a3)];if(_0x5e79fc===_0x203848(0x496))return _0x4c26e0[_0x203848(0x31d)];if(_0x5e79fc==='FDR')return _0x4c26e0[_0x203848(0x20b)];if(_0x5e79fc===_0x203848(0x2d5))return _0x4c26e0[_0x203848(0x7c5)];if(VisuMZ[_0x203848(0x665)][_0x203848(0x54c)][_0x5e79fc])return VisuMZ[_0x203848(0x665)][_0x203848(0x54c)][_0x5e79fc]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x5722ea,_0x5e9070,_0x29d61f){const _0x397551=_0x288220;if(_0x29d61f===undefined&&_0x5722ea%0x1===0x0)return _0x5722ea;if(_0x29d61f!==undefined&&[_0x397551(0x887),_0x397551(0x283),_0x397551(0x46c),_0x397551(0x8bd),'MAT',_0x397551(0x65a),_0x397551(0x908),_0x397551(0x293)][_0x397551(0x479)](String(_0x29d61f)[_0x397551(0x489)]()[_0x397551(0x91c)]()))return _0x5722ea;_0x5e9070=_0x5e9070||0x0;if(VisuMZ[_0x397551(0x665)][_0x397551(0x7db)][_0x29d61f])return VisuMZ[_0x397551(0x665)]['CustomParamType'][_0x29d61f]===_0x397551(0x722)?_0x5722ea:String((_0x5722ea*0x64)[_0x397551(0x685)](_0x5e9070))+'%';return String((_0x5722ea*0x64)[_0x397551(0x685)](_0x5e9070))+'%';},VisuMZ[_0x288220(0x67e)]=function(_0x16d3e6){const _0x24ef7d=_0x288220;_0x16d3e6=String(_0x16d3e6);if(!_0x16d3e6)return _0x16d3e6;if(typeof _0x16d3e6!=='string')return _0x16d3e6;const _0x58d881=VisuMZ['CoreEngine'][_0x24ef7d(0x30a)][_0x24ef7d(0x23d)]['DigitGroupingLocale']||'en-US',_0x2a0f97={'maximumFractionDigits':0x6};_0x16d3e6=_0x16d3e6[_0x24ef7d(0x207)](/\[(.*?)\]/g,(_0x35c5ec,_0x198f84)=>{const _0x2deb5e=_0x24ef7d;return VisuMZ[_0x2deb5e(0x7df)](_0x198f84,'[',']');}),_0x16d3e6=_0x16d3e6[_0x24ef7d(0x207)](/<(.*?)>/g,(_0x4d77e6,_0x18f728)=>{const _0x5954ca=_0x24ef7d;return VisuMZ[_0x5954ca(0x7df)](_0x18f728,'<','>');}),_0x16d3e6=_0x16d3e6[_0x24ef7d(0x207)](/\{\{(.*?)\}\}/g,(_0x407bf3,_0x2ee10f)=>{return VisuMZ['PreserveNumbers'](_0x2ee10f,'','');}),_0x16d3e6=_0x16d3e6['replace'](/(\d+\.?\d*)/g,(_0xcc0427,_0x426a79)=>{const _0x22ba43=_0x24ef7d;let _0x53210d=_0x426a79;if(_0x53210d[0x0]==='0')return _0x53210d;if(_0x53210d[_0x53210d[_0x22ba43(0x2cd)]-0x1]==='.')return Number(_0x53210d)['toLocaleString'](_0x58d881,_0x2a0f97)+'.';else return _0x53210d[_0x53210d[_0x22ba43(0x2cd)]-0x1]===','?Number(_0x53210d)[_0x22ba43(0x6f6)](_0x58d881,_0x2a0f97)+',':Number(_0x53210d)[_0x22ba43(0x6f6)](_0x58d881,_0x2a0f97);});let _0x59e184=0x3;while(_0x59e184--){_0x16d3e6=VisuMZ[_0x24ef7d(0x947)](_0x16d3e6);}return _0x16d3e6;},VisuMZ['PreserveNumbers']=function(_0x7dd9e9,_0x5bcc54,_0x104303){const _0x34234b=_0x288220;return _0x7dd9e9=_0x7dd9e9['replace'](/(\d)/gi,(_0x5a9eb0,_0x412631)=>_0x34234b(0x633)[_0x34234b(0x857)](Number(_0x412631))),_0x34234b(0x6b8)[_0x34234b(0x857)](_0x7dd9e9,_0x5bcc54,_0x104303);},VisuMZ[_0x288220(0x947)]=function(_0x20aa5f){const _0x12c948=_0x288220;return _0x20aa5f=_0x20aa5f[_0x12c948(0x207)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5b1c3d,_0x3ccfdf)=>Number(parseInt(_0x3ccfdf))),_0x20aa5f;},VisuMZ[_0x288220(0x465)]=function(_0x1118b5){const _0x59ca5d=_0x288220;SoundManager[_0x59ca5d(0x8af)]();if(!Utils[_0x59ca5d(0x9a4)]()){const _0x2be6fe=window[_0x59ca5d(0x4fc)](_0x1118b5,'_blank');}else{const _0x5050ec=process[_0x59ca5d(0x70d)]==_0x59ca5d(0x232)?_0x59ca5d(0x4fc):process[_0x59ca5d(0x70d)]==_0x59ca5d(0x600)?_0x59ca5d(0x740):_0x59ca5d(0x2bd);require(_0x59ca5d(0x234))['exec'](_0x5050ec+'\x20'+_0x1118b5);}},VisuMZ[_0x288220(0x42f)]=function(_0x40c43c,_0x32e952){const _0x6509c6=_0x288220;if(!_0x40c43c)return'';const _0x177453=_0x40c43c[_0x6509c6(0x63c)]||_0x40c43c['id'];let _0x5239eb='';return _0x40c43c[_0x6509c6(0x347)]!==undefined&&_0x40c43c[_0x6509c6(0x964)]!==undefined&&(_0x5239eb=_0x6509c6(0x27c)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c['expParams']!==undefined&&_0x40c43c[_0x6509c6(0x909)]!==undefined&&(_0x5239eb=_0x6509c6(0x4c7)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c[_0x6509c6(0x42c)]!==undefined&&_0x40c43c[_0x6509c6(0x238)]!==undefined&&(_0x5239eb=_0x6509c6(0x3c4)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c[_0x6509c6(0x468)]!==undefined&&_0x40c43c[_0x6509c6(0x684)]!==undefined&&(_0x5239eb=_0x6509c6(0x3c3)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c[_0x6509c6(0x4bd)]!==undefined&&_0x40c43c[_0x6509c6(0x34c)]===0x1&&(_0x5239eb=_0x6509c6(0x2a5)['format'](_0x177453,_0x32e952)),_0x40c43c[_0x6509c6(0x4a2)]!==undefined&&_0x40c43c[_0x6509c6(0x34c)]>0x1&&(_0x5239eb=_0x6509c6(0x5d1)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c['dropItems']!==undefined&&_0x40c43c[_0x6509c6(0x5c0)]!==undefined&&(_0x5239eb=_0x6509c6(0x4ef)[_0x6509c6(0x857)](_0x177453,_0x32e952)),_0x40c43c[_0x6509c6(0x485)]!==undefined&&_0x40c43c['maxTurns']!==undefined&&(_0x5239eb='State-%1-%2'['format'](_0x177453,_0x32e952)),_0x5239eb;},Window_Base[_0x288220(0x93f)][_0x288220(0x4c8)]=function(_0x1b3866,_0x4e6063){const _0x336fd8=_0x288220,_0x327cde=ImageManager[_0x336fd8(0x8a2)]||0x20,_0x379e3e=ImageManager[_0x336fd8(0x905)]||0x20;if(_0x4e6063['drawing']){const _0x25d1a9=_0x327cde-ImageManager[_0x336fd8(0x882)],_0x329776=_0x379e3e-ImageManager[_0x336fd8(0x5ae)];let _0x48d4bd=0x2,_0x55e88f=0x2;this['lineHeight']()!==0x24&&(_0x55e88f=Math[_0x336fd8(0x25e)]((this[_0x336fd8(0x91b)]()-_0x379e3e)/0x2));const _0x4d259c=_0x4e6063['x']+Math[_0x336fd8(0x25e)](_0x25d1a9/0x2)+_0x48d4bd,_0x155eab=_0x4e6063['y']+Math[_0x336fd8(0x25e)](_0x329776/0x2)+_0x55e88f;this[_0x336fd8(0x1df)](_0x1b3866,_0x4d259c,_0x155eab);}_0x4e6063['x']+=_0x327cde+0x4;},Window_StatusBase[_0x288220(0x93f)][_0x288220(0x952)]=function(_0x485ee4,_0x4f7a6b,_0x15c8c7,_0x4e6976){const _0x1dfda4=_0x288220;_0x4e6976=_0x4e6976||0x90;const _0x403d13=ImageManager['standardIconWidth']||0x20,_0x3dea7f=ImageManager['standardIconHeight']||0x20,_0x1abcd9=_0x403d13-ImageManager[_0x1dfda4(0x882)],_0xf7dae1=_0x3dea7f-ImageManager[_0x1dfda4(0x5ae)],_0x429fca=_0x403d13,_0x2c99b0=_0x485ee4['allIcons']()[_0x1dfda4(0x538)](0x0,Math[_0x1dfda4(0x25e)](_0x4e6976/_0x429fca));let _0x10f6e6=_0x4f7a6b+Math[_0x1dfda4(0x3eb)](_0x1abcd9/0x2),_0x27e71c=_0x15c8c7+Math['ceil'](_0xf7dae1/0x2);for(const _0x41a149 of _0x2c99b0){this[_0x1dfda4(0x1df)](_0x41a149,_0x10f6e6,_0x27e71c),_0x10f6e6+=_0x429fca;}},Game_Picture[_0x288220(0x93f)][_0x288220(0x781)]=function(){const _0x3658a7=_0x288220;return this[_0x3658a7(0x6ee)];},VisuMZ[_0x288220(0x665)]['Game_Picture_initBasic']=Game_Picture['prototype'][_0x288220(0x1cb)],Game_Picture[_0x288220(0x93f)]['initBasic']=function(){const _0x410791=_0x288220;VisuMZ[_0x410791(0x665)][_0x410791(0x81f)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x288220(0x665)][_0x288220(0x636)]=Game_Picture[_0x288220(0x93f)][_0x288220(0x4a8)],Game_Picture[_0x288220(0x93f)]['updateMove']=function(){const _0x398899=_0x288220;this['updateAnchor']();const _0x3f1d80=this[_0x398899(0x96f)];VisuMZ[_0x398899(0x665)][_0x398899(0x636)][_0x398899(0x6c3)](this),_0x3f1d80>0x0&&this[_0x398899(0x96f)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this['_targetY'],this[_0x398899(0x58d)]=this['_targetScaleX'],this['_scaleY']=this[_0x398899(0x43b)],this['_opacity']=this['_targetOpacity'],this['_anchor']&&(this[_0x398899(0x6ee)]['x']=this[_0x398899(0x856)]['x'],this[_0x398899(0x6ee)]['y']=this[_0x398899(0x856)]['y']));},VisuMZ[_0x288220(0x665)]['Game_Picture_show']=Game_Picture[_0x288220(0x93f)][_0x288220(0x63b)],Game_Picture[_0x288220(0x93f)][_0x288220(0x63b)]=function(_0x30e444,_0x5ebd86,_0x186a8d,_0x3f7c0c,_0x2bf368,_0x1c8ab7,_0x4a0b64,_0x51a9a5){const _0x2f548b=_0x288220;VisuMZ[_0x2f548b(0x665)][_0x2f548b(0x660)][_0x2f548b(0x6c3)](this,_0x30e444,_0x5ebd86,_0x186a8d,_0x3f7c0c,_0x2bf368,_0x1c8ab7,_0x4a0b64,_0x51a9a5),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5ebd86]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x288220(0x4d9)]=Game_Picture['prototype'][_0x288220(0x780)],Game_Picture[_0x288220(0x93f)]['move']=function(_0x5460d9,_0x48785d,_0x1d7d84,_0x48f258,_0x481c53,_0x58b99b,_0x50d16c,_0x8ed35b,_0x2a1e2e){const _0x3abd03=_0x288220;VisuMZ['CoreEngine'][_0x3abd03(0x4d9)]['call'](this,_0x5460d9,_0x48785d,_0x1d7d84,_0x48f258,_0x481c53,_0x58b99b,_0x50d16c,_0x8ed35b,_0x2a1e2e),this[_0x3abd03(0x774)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5460d9]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x288220(0x7ad)]=function(){const _0x39e279=_0x288220;this[_0x39e279(0x96f)]>0x0&&(this[_0x39e279(0x6ee)]['x']=this[_0x39e279(0x39b)](this[_0x39e279(0x6ee)]['x'],this[_0x39e279(0x856)]['x']),this[_0x39e279(0x6ee)]['y']=this[_0x39e279(0x39b)](this[_0x39e279(0x6ee)]['y'],this['_targetAnchor']['y']));},Game_Picture['prototype'][_0x288220(0x7cf)]=function(_0x10f8e0){const _0x5f1323=_0x288220;this[_0x5f1323(0x6ee)]=_0x10f8e0,this[_0x5f1323(0x856)]=JsonEx[_0x5f1323(0x8f9)](this['_anchor']);},Game_Picture['prototype'][_0x288220(0x774)]=function(_0x4146ef){const _0xf250fc=_0x288220;this[_0xf250fc(0x856)]=_0x4146ef;},VisuMZ[_0x288220(0x665)]['Sprite_Picture_updateOrigin']=Sprite_Picture['prototype'][_0x288220(0x87a)],Sprite_Picture[_0x288220(0x93f)]['updateOrigin']=function(){const _0x536445=_0x288220,_0x1da555=this[_0x536445(0x816)]();!_0x1da555['anchor']()?VisuMZ['CoreEngine'][_0x536445(0x679)][_0x536445(0x6c3)](this):(this[_0x536445(0x781)]['x']=_0x1da555['anchor']()['x'],this[_0x536445(0x781)]['y']=_0x1da555['anchor']()['y']);},Game_Action['prototype'][_0x288220(0x4c2)]=function(_0x4abcbc){const _0xbbd7b6=_0x288220;if(_0x4abcbc){const _0x385599=_0x4abcbc['skillId'];if(_0x385599===0x1&&this['subject']()[_0xbbd7b6(0x3f6)]()!==0x1)this[_0xbbd7b6(0x42e)]();else _0x385599===0x2&&this['subject']()['guardSkillId']()!==0x2?this[_0xbbd7b6(0x8a4)]():this['setSkill'](_0x385599);}else this['clear']();},Game_Actor[_0x288220(0x93f)][_0x288220(0x4a3)]=function(){const _0x380039=_0x288220;return this[_0x380039(0x994)]()[_0x380039(0x2d7)](_0x868227=>this['canUse'](_0x868227)&&this['skillTypes']()[_0x380039(0x479)](_0x868227[_0x380039(0x42c)]));},Window_Base[_0x288220(0x93f)][_0x288220(0x683)]=function(){const _0x3891b4=_0x288220;this[_0x3891b4(0x285)]=new Sprite(),this[_0x3891b4(0x285)]['bitmap']=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x3891b4(0x285)]);},Window_Base['prototype'][_0x288220(0x4e5)]=function(){const _0x1aca4b=_0x288220;if(this[_0x1aca4b(0x285)]){const _0x9cb7d8=this[_0x1aca4b(0x285)][_0x1aca4b(0x421)],_0x1dfa40=this[_0x1aca4b(0x426)],_0x1390bb=this[_0x1aca4b(0x4b9)],_0x444ec9=this['padding'],_0x4047cf=ColorManager[_0x1aca4b(0x1ca)](),_0x527bb6=ColorManager['dimColor2']();_0x9cb7d8[_0x1aca4b(0x689)](_0x1dfa40,_0x1390bb),_0x9cb7d8['gradientFillRect'](0x0,0x0,_0x1dfa40,_0x444ec9,_0x527bb6,_0x4047cf,!![]),_0x9cb7d8[_0x1aca4b(0x363)](0x0,_0x444ec9,_0x1dfa40,_0x1390bb-_0x444ec9*0x2,_0x4047cf),_0x9cb7d8['gradientFillRect'](0x0,_0x1390bb-_0x444ec9,_0x1dfa40,_0x444ec9,_0x4047cf,_0x527bb6,!![]),this['_dimmerSprite'][_0x1aca4b(0x3b9)](0x0,0x0,_0x1dfa40,_0x1390bb);}},Game_Actor[_0x288220(0x93f)]['makeAutoBattleActions']=function(){const _0xeac33=_0x288220;for(let _0x545a7b=0x0;_0x545a7b<this[_0xeac33(0x838)]();_0x545a7b++){const _0x313e0b=this[_0xeac33(0x86e)]();let _0x3f812a=Number[_0xeac33(0x81c)];this[_0xeac33(0x86d)](_0x545a7b,_0x313e0b[0x0]);for(const _0x4f7f73 of _0x313e0b){const _0x5efb5c=_0x4f7f73['evaluate']();_0x5efb5c>_0x3f812a&&(_0x3f812a=_0x5efb5c,this[_0xeac33(0x86d)](_0x545a7b,_0x4f7f73));}}this[_0xeac33(0x8f0)]('waiting');},Window_BattleItem[_0x288220(0x93f)][_0x288220(0x977)]=function(_0x4dd460){const _0x428d6d=_0x288220;return BattleManager[_0x428d6d(0x457)]()?BattleManager[_0x428d6d(0x457)]()[_0x428d6d(0x735)](_0x4dd460):Window_ItemList[_0x428d6d(0x93f)]['isEnabled'][_0x428d6d(0x6c3)](this,_0x4dd460);},VisuMZ[_0x288220(0x665)][_0x288220(0x413)]=Scene_Map['prototype']['createSpriteset'],Scene_Map['prototype'][_0x288220(0x428)]=function(){const _0x3c8411=_0x288220;VisuMZ[_0x3c8411(0x665)][_0x3c8411(0x413)][_0x3c8411(0x6c3)](this);const _0x203e72=this[_0x3c8411(0x5de)][_0x3c8411(0x8e0)];if(_0x203e72)this['addChild'](_0x203e72);},VisuMZ[_0x288220(0x665)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x288220(0x93f)]['createSpriteset'],Scene_Battle[_0x288220(0x93f)][_0x288220(0x428)]=function(){const _0x3594f3=_0x288220;VisuMZ['CoreEngine']['Scene_Battle_createSpritesetFix']['call'](this);const _0x3c2692=this[_0x3594f3(0x5de)]['_timerSprite'];if(_0x3c2692)this[_0x3594f3(0x912)](_0x3c2692);},Sprite_Actor['prototype']['update']=function(){const _0x21b9b0=_0x288220;Sprite_Battler[_0x21b9b0(0x93f)][_0x21b9b0(0x508)][_0x21b9b0(0x6c3)](this),this['updateShadow']();if(this['_actor'])this[_0x21b9b0(0x308)]();else this['_battlerName']!==''&&(this['_battlerName']='');},Window[_0x288220(0x93f)][_0x288220(0x47f)]=function(){const _0x2ff3c9=_0x288220,_0xaa005f=this[_0x2ff3c9(0x985)],_0x531d27=this[_0x2ff3c9(0x72d)],_0x2d8f0e=0x18,_0x371688=_0x2d8f0e/0x2,_0x5b711b=0x60+_0x2d8f0e,_0x103aeb=0x0+_0x2d8f0e;this[_0x2ff3c9(0x427)][_0x2ff3c9(0x421)]=this[_0x2ff3c9(0x6f5)],this[_0x2ff3c9(0x427)]['anchor']['x']=0.5,this[_0x2ff3c9(0x427)][_0x2ff3c9(0x781)]['y']=0.5,this['_downArrowSprite'][_0x2ff3c9(0x3b9)](_0x5b711b+_0x371688,_0x103aeb+_0x371688+_0x2d8f0e,_0x2d8f0e,_0x371688),this['_downArrowSprite'][_0x2ff3c9(0x780)](Math[_0x2ff3c9(0x3ff)](_0xaa005f/0x2),Math[_0x2ff3c9(0x3ff)](_0x531d27-_0x371688)),this['_upArrowSprite'][_0x2ff3c9(0x421)]=this['_windowskin'],this[_0x2ff3c9(0x2fd)]['anchor']['x']=0.5,this[_0x2ff3c9(0x2fd)]['anchor']['y']=0.5,this[_0x2ff3c9(0x2fd)]['setFrame'](_0x5b711b+_0x371688,_0x103aeb,_0x2d8f0e,_0x371688),this[_0x2ff3c9(0x2fd)][_0x2ff3c9(0x780)](Math[_0x2ff3c9(0x3ff)](_0xaa005f/0x2),Math['round'](_0x371688));},Window[_0x288220(0x93f)][_0x288220(0x853)]=function(){const _0x59854c=_0x288220,_0x4636dd=0x90,_0x45253c=0x60,_0x5acc9c=0x18;this[_0x59854c(0x2cf)][_0x59854c(0x421)]=this['_windowskin'],this[_0x59854c(0x2cf)]['anchor']['x']=0.5,this[_0x59854c(0x2cf)][_0x59854c(0x781)]['y']=0x1,this[_0x59854c(0x2cf)][_0x59854c(0x780)](Math[_0x59854c(0x3ff)](this[_0x59854c(0x985)]/0x2),this[_0x59854c(0x72d)]),this[_0x59854c(0x2cf)]['setFrame'](_0x4636dd,_0x45253c,_0x5acc9c,_0x5acc9c),this[_0x59854c(0x2cf)][_0x59854c(0x801)]=0xff;},Window[_0x288220(0x93f)][_0x288220(0x5dd)]=function(){const _0x58200c=_0x288220,_0x31ac8b=this[_0x58200c(0x65c)][_0x58200c(0x5ff)][_0x58200c(0x58c)](new Point(0x0,0x0)),_0x43eaea=this[_0x58200c(0x65c)][_0x58200c(0x5b1)];_0x43eaea['x']=_0x31ac8b['x']+this[_0x58200c(0x5be)]['x'],_0x43eaea['y']=_0x31ac8b['y']+this[_0x58200c(0x5be)]['y'],_0x43eaea[_0x58200c(0x426)]=Math[_0x58200c(0x3eb)](this[_0x58200c(0x5d5)]*this[_0x58200c(0x451)]['x']),_0x43eaea[_0x58200c(0x4b9)]=Math[_0x58200c(0x3eb)](this[_0x58200c(0x81a)]*this['scale']['y']);},VisuMZ[_0x288220(0x665)][_0x288220(0x1d4)]=Window[_0x288220(0x93f)][_0x288220(0x570)],Window[_0x288220(0x93f)][_0x288220(0x570)]=function(){const _0xf0f2b3=_0x288220,_0x49fa80=VisuMZ['CoreEngine'][_0xf0f2b3(0x30a)]['Window'][_0xf0f2b3(0x81d)]??!![];if(!_0x49fa80)return VisuMZ['CoreEngine'][_0xf0f2b3(0x1d4)][_0xf0f2b3(0x6c3)](this);const _0x450bac=this[_0xf0f2b3(0x6a4)],_0x2a5d54=Math[_0xf0f2b3(0x6de)](0x0,this['_width']-_0x450bac*0x2),_0x2ed3c1=Math[_0xf0f2b3(0x6de)](0x0,this[_0xf0f2b3(0x72d)]-_0x450bac*0x2),_0x5d81c0=this[_0xf0f2b3(0x252)],_0x4d7b57=_0x5d81c0['children'][0x0];_0x5d81c0[_0xf0f2b3(0x421)]=this[_0xf0f2b3(0x6f5)],_0x5d81c0[_0xf0f2b3(0x3b9)](0x0,0x0,0x60,0x60),_0x5d81c0[_0xf0f2b3(0x780)](_0x450bac,_0x450bac),_0x5d81c0[_0xf0f2b3(0x451)]['x']=_0x2a5d54/0x60,_0x5d81c0[_0xf0f2b3(0x451)]['y']=_0x2ed3c1/0x60,_0x4d7b57['bitmap']=this[_0xf0f2b3(0x6f5)],_0x4d7b57[_0xf0f2b3(0x3b9)](0x0,0x60,0x60,0x60),_0x4d7b57[_0xf0f2b3(0x780)](0x0,0x0,_0x2a5d54,_0x2ed3c1),_0x4d7b57[_0xf0f2b3(0x451)]['x']=0x1/_0x5d81c0['scale']['x'],_0x4d7b57['scale']['y']=0x1/_0x5d81c0[_0xf0f2b3(0x451)]['y'],_0x5d81c0['setColorTone'](this[_0xf0f2b3(0x30b)]);},Game_Temp[_0x288220(0x93f)]['sceneTerminationClearEffects']=function(){const _0x10ee62=_0x288220;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this['_pointAnimationQueue']=[],this[_0x10ee62(0x7ff)]=[];},VisuMZ[_0x288220(0x665)][_0x288220(0x1db)]=Scene_Base[_0x288220(0x93f)][_0x288220(0x791)],Scene_Base['prototype'][_0x288220(0x791)]=function(){const _0x5adb66=_0x288220;if($gameTemp)$gameTemp[_0x5adb66(0x70e)]();VisuMZ[_0x5adb66(0x665)][_0x5adb66(0x1db)][_0x5adb66(0x6c3)](this);},Bitmap['prototype'][_0x288220(0x4f0)]=function(_0x15754c){const _0x4c4221=_0x288220,_0x22e6b0=this[_0x4c4221(0x635)];_0x22e6b0[_0x4c4221(0x7f0)](),_0x22e6b0[_0x4c4221(0x3cf)]=this[_0x4c4221(0x5df)]();const _0x6a6fa1=_0x22e6b0[_0x4c4221(0x993)](_0x15754c)[_0x4c4221(0x426)];return _0x22e6b0['restore'](),_0x6a6fa1;},Window_Message['prototype']['textWidth']=function(_0x330587){const _0x60d435=_0x288220;return this[_0x60d435(0x3be)]()?this[_0x60d435(0x244)]['measureTextWidthNoRounding'](_0x330587):Window_Base[_0x60d435(0x93f)][_0x60d435(0x5a9)][_0x60d435(0x6c3)](this,_0x330587);},Window_Message['prototype'][_0x288220(0x3be)]=function(){const _0x10d909=_0x288220;return VisuMZ[_0x10d909(0x665)][_0x10d909(0x30a)][_0x10d909(0x23d)][_0x10d909(0x585)]??!![];},VisuMZ['CoreEngine'][_0x288220(0x3aa)]=Game_Action['prototype'][_0x288220(0x271)],Game_Action[_0x288220(0x93f)][_0x288220(0x271)]=function(){const _0x1214a7=_0x288220;return this['item']()?VisuMZ[_0x1214a7(0x665)][_0x1214a7(0x3aa)][_0x1214a7(0x6c3)](this):0x0;},VisuMZ[_0x288220(0x665)][_0x288220(0x826)]=Game_Action[_0x288220(0x93f)][_0x288220(0x42e)],Game_Action[_0x288220(0x93f)]['setAttack']=function(){const _0xc1c9ba=_0x288220;if(this[_0xc1c9ba(0x5a1)]()&&this[_0xc1c9ba(0x5a1)]()[_0xc1c9ba(0x612)]())VisuMZ[_0xc1c9ba(0x665)][_0xc1c9ba(0x826)]['call'](this);else BattleManager[_0xc1c9ba(0x8ca)]?VisuMZ[_0xc1c9ba(0x665)]['Game_Action_setAttack'][_0xc1c9ba(0x6c3)](this):this[_0xc1c9ba(0x895)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x965)]=BattleManager[_0x288220(0x7ea)],BattleManager['invokeCounterAttack']=function(_0x4ffda9,_0x4494bb){const _0x1e77b=_0x288220;this[_0x1e77b(0x8ca)]=!![],VisuMZ[_0x1e77b(0x665)]['BattleManager_invokeCounterAttack'][_0x1e77b(0x6c3)](this,_0x4ffda9,_0x4494bb),this[_0x1e77b(0x8ca)]=undefined;},Sprite_Name[_0x288220(0x93f)][_0x288220(0x2ba)]=function(){return 0x24;},Sprite_Name[_0x288220(0x93f)][_0x288220(0x80e)]=function(){const _0x8cbfe2=_0x288220,_0x45d9a3=this[_0x8cbfe2(0x392)](),_0x693811=this[_0x8cbfe2(0x8a1)](),_0x173c58=this['bitmapHeight']();this[_0x8cbfe2(0x619)](),this[_0x8cbfe2(0x421)][_0x8cbfe2(0x895)](),this['bitmap'][_0x8cbfe2(0x329)](_0x45d9a3,0x4,0x0,_0x693811-0xa,_0x173c58,'left');},Bitmap[_0x288220(0x93f)][_0x288220(0x329)]=function(_0x522619,_0x3282cd,_0x370a60,_0x222742,_0x45b19f,_0xb4ef33){const _0x30d0dc=_0x288220,_0x6f645b=this[_0x30d0dc(0x635)],_0x419dec=_0x6f645b[_0x30d0dc(0x686)];_0x222742=_0x222742||0xffffffff;let _0xe5d4e=_0x3282cd,_0x3def6e=Math[_0x30d0dc(0x3ff)](_0x370a60+0x18/0x2+this[_0x30d0dc(0x4d6)]*0.35);_0xb4ef33===_0x30d0dc(0x295)&&(_0xe5d4e+=_0x222742/0x2),_0xb4ef33===_0x30d0dc(0x711)&&(_0xe5d4e+=_0x222742),_0x6f645b[_0x30d0dc(0x7f0)](),_0x6f645b['font']=this[_0x30d0dc(0x5df)](),_0x6f645b[_0x30d0dc(0x7e3)]=_0xb4ef33,_0x6f645b[_0x30d0dc(0x759)]=_0x30d0dc(0x8b2),_0x6f645b[_0x30d0dc(0x686)]=0x1,this['_drawTextOutline'](_0x522619,_0xe5d4e,_0x3def6e,_0x222742),_0x6f645b[_0x30d0dc(0x686)]=_0x419dec,this[_0x30d0dc(0x861)](_0x522619,_0xe5d4e,_0x3def6e,_0x222742),_0x6f645b[_0x30d0dc(0x75d)](),this[_0x30d0dc(0x1e7)][_0x30d0dc(0x508)]();},VisuMZ[_0x288220(0x665)][_0x288220(0x2a2)]=BattleManager['checkSubstitute'],BattleManager[_0x288220(0x83c)]=function(_0x338cbb){const _0x38314e=_0x288220;if(this[_0x38314e(0x904)][_0x38314e(0x25c)]())return![];return VisuMZ[_0x38314e(0x665)]['BattleManager_checkSubstitute'][_0x38314e(0x6c3)](this,_0x338cbb);},BattleManager[_0x288220(0x86a)]=function(){const _0x57260e=_0x288220;if(this[_0x57260e(0x520)])this['_logWindow'][_0x57260e(0x86a)](this[_0x57260e(0x520)]);this['_phase']=_0x57260e(0x849),this['_subject']&&this[_0x57260e(0x520)][_0x57260e(0x838)]()===0x0&&(this[_0x57260e(0x60b)](this[_0x57260e(0x520)]),this[_0x57260e(0x520)]=null);},Bitmap[_0x288220(0x93f)][_0x288220(0x5a2)]=function(){const _0x18c47f=_0x288220;this[_0x18c47f(0x64b)]=new Image(),this[_0x18c47f(0x64b)][_0x18c47f(0x863)]=this['_onLoad'][_0x18c47f(0x3c9)](this),this[_0x18c47f(0x64b)]['onerror']=this['_onError'][_0x18c47f(0x3c9)](this),this[_0x18c47f(0x6d9)](),this[_0x18c47f(0x320)]=_0x18c47f(0x2ab),Utils[_0x18c47f(0x76e)]()?this[_0x18c47f(0x66c)]():(this[_0x18c47f(0x64b)]['src']=this[_0x18c47f(0x69b)],![]&&this['_image']['width']>0x0&&(this['_image'][_0x18c47f(0x863)]=null,this[_0x18c47f(0x980)]()));},Scene_Skill['prototype']['onActorChange']=function(){const _0x5529db=_0x288220;Scene_MenuBase[_0x5529db(0x93f)][_0x5529db(0x417)][_0x5529db(0x6c3)](this),this[_0x5529db(0x6aa)](),this[_0x5529db(0x90f)][_0x5529db(0x405)](),this[_0x5529db(0x90f)][_0x5529db(0x88c)](),this[_0x5529db(0x5c8)]['activate']();},Scene_Skill[_0x288220(0x93f)][_0x288220(0x70c)]=function(){const _0xfcb35d=_0x288220;return this[_0xfcb35d(0x5c8)]&&this[_0xfcb35d(0x5c8)][_0xfcb35d(0x70f)];},Game_Map[_0x288220(0x93f)][_0x288220(0x255)]=function(_0x4fb437,_0x23d3cc,_0x5cad2d){const _0x5df2f0=_0x288220,_0x50f7ca=this['tilesetFlags'](),_0x3dd97a=this[_0x5df2f0(0x653)](_0x4fb437,_0x23d3cc);for(const _0x49ecde of _0x3dd97a){const _0x2a7eb5=_0x50f7ca[_0x49ecde];if(_0x2a7eb5===undefined||_0x2a7eb5===null){if($gameTemp[_0x5df2f0(0x813)]()&&!DataManager['isEventTest']()){let _0x1b4d57='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x1b4d57+=_0x5df2f0(0x85a)+'\x0a',_0x1b4d57+='and\x20add\x20it\x20onto\x20this\x20one.',this['showIncompleteTilesetError']()?(alert(_0x1b4d57),SceneManager['exit']()):(console['log'](_0x1b4d57),!$gameTemp[_0x5df2f0(0x8c3)]&&($gameTemp[_0x5df2f0(0x8c3)]=!![],SceneManager['showDevTools']()));}}if((_0x2a7eb5&0x10)!==0x0)continue;if((_0x2a7eb5&_0x5cad2d)===0x0)return!![];if((_0x2a7eb5&_0x5cad2d)===_0x5cad2d)return![];}return![];},Game_Map['prototype'][_0x288220(0x407)]=function(){const _0x4ec4a4=_0x288220;if(Imported[_0x4ec4a4(0x650)])return!![];if(Imported[_0x4ec4a4(0x6e6)])return!![];return![];},Sprite_Animation[_0x288220(0x93f)][_0x288220(0x4e6)]=function(_0x117b69){const _0xbeaa02=_0x288220;!this[_0xbeaa02(0x541)]&&(this[_0xbeaa02(0x541)]=_0x117b69['gl'][_0xbeaa02(0x62e)](_0x117b69['gl'][_0xbeaa02(0x3e7)]));},VisuMZ['CoreEngine'][_0x288220(0x1dc)]=Scene_Map[_0x288220(0x93f)][_0x288220(0x464)],Scene_Map[_0x288220(0x93f)][_0x288220(0x464)]=function(){const _0x15567a=_0x288220,_0x16e88d=SceneManager[_0x15567a(0x676)]['name'];if([_0x15567a(0x312),_0x15567a(0x38c),_0x15567a(0x6e8),_0x15567a(0x704)][_0x15567a(0x479)](_0x16e88d))return![];return VisuMZ[_0x15567a(0x665)]['Scene_Map_shouldAutosave'][_0x15567a(0x6c3)](this);},VisuMZ[_0x288220(0x665)]['Window_SkillList_includes']=Window_SkillList[_0x288220(0x93f)]['includes'],Window_SkillList[_0x288220(0x93f)][_0x288220(0x479)]=function(_0x3a7861){const _0xb9924=_0x288220;if(this[_0xb9924(0x384)]<=0x0)return![];return VisuMZ[_0xb9924(0x665)][_0xb9924(0x85b)][_0xb9924(0x6c3)](this,_0x3a7861);};