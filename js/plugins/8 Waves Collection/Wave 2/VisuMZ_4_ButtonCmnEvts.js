//=============================================================================
// VisuStella MZ - Button Common Events
// VisuMZ_4_ButtonCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ButtonCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonCommonEvents = VisuMZ.ButtonCommonEvents || {};
VisuMZ.ButtonCommonEvents.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.09] [ButtonCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Button_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, there's only a few keys on your keyboard that perform any kind
 * of action when pressed on the map screen. This plugin allows you to bind
 * Common Events to various other keys to expand the keyboard's functionality.
 * Plugin Commands can be used during the middle of a playthrough to change up
 * which Common Events are bound to each key as well, allowing you, the game
 * dev, to have full control over which keys can be used during the map screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to the number keys, alphabet keys,
 *   symbols, numpad, and more.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from keys to remove any bindings.
 * * Show visible buttons on the screen to indicate which buttons can be
 *   pressed on the keyboard (or with the mouse on the screen).
 * * Apply icons to the visible buttons and change them over time.
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
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner. If you
 * are using another plugin that does something with keystrokes on the map
 * screen, the likelihood of clashing can occur if these plugins utilize the
 * same keystrokes and we will not be held accountable for that as it is
 * something within your power to change by simply picking different keys.
 * 
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * As of Options Core's version 1.26 update, which allows for key rebindings.
 * If key rebindings are enabled, then the A through Z and symbol keys will be
 * disabled from having common events being able to be bound to them in order
 * to ensure the key bindings will follow through.
 * 
 * The number keys for 1 through 9/0 can still bind common events to them. In
 * return, these keys CANNOT be rebinded in the Options Core scene for both the
 * keyboard and gamepad options. Keep this in mind if you wish to use Button
 * Common Events and Options Core with the rebinding option together in the
 * same RPG Maker MZ project.
 * 
 * ---
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the keys that you can
 * bind to a Common Event. If that number is something other than 0, then the
 * number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a Common Event
 * to these keys and the 'Forbid Default Bound Keys?' Plugin Parameter is set
 * to 'false', then the native function of the key will be removed in favor of
 * the Common Event you've assigned.
 *
 * Here is a list of the keys that already have a command assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign Common Events to these keys, the Common Event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map and if the 'Forbid Default Bound Keys?'
 * Plugin Parameter is set to 'false'. Being inside of a menu or battle system
 * will restore the previously native functions.
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
 * === Assign Button-Related Notetags ===
 * 
 * ---
 *
 * <Assign Button Common Event: id>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Makes this object selectable in the Item scene or Skill scene and have it
 *   become assignable to a button slot.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'id' with a number representing the ID of the Common Event you
 *   wish to assign to a button.
 * - This needs to be used together with the <Assign Button Slots: x, x, x>
 *   notetag in order to have any effect.
 *
 * ---
 *
 * <Assign Button Slot: x>
 * <Assign Button Slot: x, x, x>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Lists the keyboard keys that can be assigned a Common Event when pressed.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'x' with a number or letter representing the button you wish to
 *   assign a Common Event to.
 * - This needs to be used together with the <Assign Button Common Event: id>
 *   notetag in order to have any effect.
 * - The choices that become available will be listed in the order found in
 *   this notetag.
 * - Forbidden, non-existent, and non-valid keys will be filtered out of this
 *   list and cannot be assigned a Common Event.
 * 
 *   Example:
 * 
 *   <Assign Button Slot: A, S, D, F>
 *   <Assign Button Slot: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0>
 *
 * ---
 * 
 * <Assign Button Show Cost>
 * 
 * - Used for: Skill Notetags
 * - If a skill can be assigned, show the cost of the skill if it has one.
 * - Using this assigned button will not pay the cost. If you want to the pay
 *   the cost, use the following notetag.
 * 
 * ---
 * 
 * <Assign Button Pay Cost>
 * 
 * - Used for: Skill Notetags
 * - If a skill can be assigned, show the cost of the skill if it has one and
 *   pays the cost when pressed and activated.
 *   - If the cost cannot be paid, due to lacking resources or other reasons,
 *     then the button will be disabled.
 * - The actor that will pay the cost will be the actor that the button was
 *   assigned from in the first place.
 *   - As such, if the actor is not in the party, this will also be disabled.
 * 
 * ---
 * 
 * <Assign Button Show Quantity>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - If an item, weapon, or armor can be assigned, show the quantity of the
 *   party has of that item, weapon, or armor.
 * - Using this assigned button will not consume the item, weapon, or armor.
 *   If you want to consume the quantity, use the following notetag.
 * 
 * ---
 * 
 * <Assign Button Consume Quantity>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - If an item, weapon, or armor can be assigned, show the quantity of the
 *   party has of that item, weapon, or armor. This will also consume one of
 *   the item, weapon, or armor when pressed.
 *   - This also applies to Key Items. If you don't want Key Items to be
 *     consumed but have their quantity displayed, use the previous notetag.
 *   - If the cost cannot be paid, due to lacking resources or other reasons,
 *     then the button will be disabled.
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
 * System: Change Button Common Event
 * - Change the Common Event bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific key(s).
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 *
 * ---
 * 
 * System: Change Visibility
 * - Determines whether or not buttons are shown on screen.
 * 
 *   Visible?
 *   - Show or hide the visible Button Common Events on the screen?
 * 
 * ---
 *
 * System: Clear All Button Common Events
 * - Clears Common Events from all keys.
 *
 * ---
 *
 * System: Clear Button Common Event
 * - Clears any Common Events bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to clear.
 *
 * ---
 *
 * System: Clear Common Event ID(s)
 * - Clears any keys with the marked Common Event ID(s).
 * 
 *   Common Event ID(s):
 *   - Clears any keys with the marked Common Event ID(s).
 *
 * ---
 * 
 * System: Run Stored Button Common Event
 * - Run the Common Event stored on a specific key.
 * 
 *   Target Key:
 *   - Run the Common Event stored in this key.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the Plugin Parameters for this plugin. They manage all the key
 * bindings and which Common Events are linked by default to which keys. These
 * links are not permanent as they can be changed/cleared with Plugin Commands.
 *
 * ---
 *
 * Restriction
 * 
 *   Forbid Default Bound Keys?:
 *   - Forbid already bound input keys?
 *   - Allowing them may cause clashes.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show On Screen?:
 *   - Show buttons on screen by default?
 * 
 *   Change Tone on Hover?:
 *   - Change the tone of the button on hover?
 * 
 *   Hover Tone:
 *   - Tone settings upon hovering.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Button Width:
 *   - The width of the visible button on screen.
 * 
 *   Button Height:
 *   - The height of the visible button on screen.
 * 
 *   Picture Filename:
 *   - Picture used as a button background.
 *   - If left empty, ignore drawing a picture.
 * 
 *   Undeclared Icons:
 *   - If a Button Common Event doesn't have an assigned icon,
 *     use one of these instead.
 * 
 *   JS: Draw Data:
 *   - JavaScript code that determines how to draw the visible button.
 *
 * ---
 * 
 * Button Positions
 * 
 *   JS: Bottom Point:
 *   JS: Above Point:
 *   JS: Left Point:
 *   JS: Right Point:
 *   - The X and Y coordinates for where the specific side buttons start.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Assignment Settings
 * ============================================================================
 *
 * The Assignment Settings Plugin Parameters apply to whenever you use the
 * Assign Button-Related Notetags in-game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Instructions:
 *   - The instruction text that appears when assigning a Common Event to
 *     a button.
 *
 * ---
 *
 * Window
 * 
 *   Key Align:
 *   - Text alignment for the button assignment window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the button assignment window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cost Settings
 * ============================================================================
 *
 * Adjust the settings involving button press costs.
 *
 * ---
 *
 * Item Cost Offsets:
 * 
 *   Offset X:
 *   - Offsets the cost x position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offsets the cost y position.
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Skill Cost Offsets:
 * 
 *   Offset X:
 *   - Offsets the cost x position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offsets the cost y position.
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Misc Settings:
 * 
 *   Disabled Opacity:
 *   - Opacity used for buttons that are unable to meet cost requirements.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Key Settings
 * ============================================================================
 *
 * The Key Settings allow you to adjust the Common Event you want to bind to
 * each keyboard key along with whether or not you want the said key to appear
 * visibly on the screen.
 *
 * ---
 *
 * Key Settings
 * 
 *   Common Event ID:
 *   - The default common event tied to this key.
 *   - Leave it at 0 for no common event.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show Button?:
 *   - Show the button visibly on the screen?
 * 
 *   Requires Bind?:
 *   - If the button is shown, does it require a Common Event to be shown?
 * 
 *   Button Label:
 *   - What text do you want to display as the button label?
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 * 
 *   JS: Position:
 *   - The X and Y coordinates for where this button is positioned.
 *
 * ---
 * 
 * Custom Settings
 * 
 *   Custom Width:
 *   Custom Height:
 *   - Change the width/height of this button specifically.
 *   - Use 0 for the default size.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with Options Core's new key rebindings. This will
 *    impose some restrictions if you allow for key rebindings.
 * *** As of Options Core's version 1.26 update, which allows for key
 *     rebindings. If key rebindings are enabled, then the A through Z and
 *     symbol keys will be disabled from having common events being able to be
 *     bound to them in order to ensure the key bindings will follow through.
 * *** The number keys for 1 through 9/0 can still bind common events to them.
 *     In return, these keys CANNOT be rebinded in the Options Core scene for
 *     both the keyboard and gamepad options. Keep this in mind if you wish to
 *     use Button Common Events and Options Core with the rebinding option
 *     together in the same RPG Maker MZ project.
 * 
 * Version 1.08: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where certain buttons would not register properly. Fix made
 *    by Arisu.
 * 
 * Version 1.07: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon mouse click. Fix made by Arisu.
 * 
 * Version 1.06: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** Skill: <Assign Button Show Cost>
 * *** Skill: <Assign Button Pay Cost>
 * *** Items, Weapon, Armor: <Assign Button Show Quantity>
 * *** Items, Weapon, Armor: <Assign Button Consume Quantity>
 * **** Read the helpfile for more information.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Cost Settings
 * **** Adjust how costs are displayed for the plugin.
 * *** Parameters > Key Settings > Custom Settings > Custom Width
 * *** Parameters > Key Settings > Custom Settings > Custom Height
 * **** Allows buttons to have custom width and height.
 * 
 * Version 1.05: September 1, 2022
 * * Bug Fixes!
 * ** System: Run Stored Button Common Event plugin command should now be
 *    working properly. Fix made by Irina.
 * 
 * Version 1.04: January 20, 2022
 * * Feature Update!
 * ** Button Common Event key presses on top of below priority touch events
 *    will only be forbidden in the context of a common event assigned to the
 *    usual OK buttons instead. Update made by Arisu.
 * 
 * Version 1.03: February 12, 2021
 * * Bug Fixes!
 * ** Pressing a Button Common Event key while stepping onto a below priority
 *    touch event will no longer give priority to the Button Common Event. Fix
 *    made by Arisu.
 * 
 * Version 1.02: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When pressing Button Common Events with the keyboard, any visible buttons
 *    on the screen will also flash their color tone briefly to show that they
 *    are being pressed. This is only if the Hover Tone Plugin Parameter is
 *    enabled. Update made by Yanfly.
 * * New Features!
 * ** New Notetags Added by Yanfly!
 * *** <Assign Button Common Event: id>
 * *** <Assign Button Slot: x, x, x>
 * ** New Plugin Command added by Yanfly!
 * *** System: Clear Common Event ID(s)
 * **** Clears any keys with the marked Common Event ID(s).
 * *** System: Run Stored Button Common Event
 * **** Run the Common Event stored on a specific key.
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Assignment Settings
 * 
 * Version 1.01: December 4, 2020
 * * Feature Update!
 * ** Plugin Command "System: Change Button Common Event" can now use code for
 *    icons. You can insert $gameVariables.value(50) in it and it will use
 *    whichever number is stored inside it as an icon. Update made by Irina.
 *
 * Version 1.00: August 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeButtonCommonEvent
 * @text System: Change Button Common Event
 * @desc Change the Common Event bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to change.
 * @default []
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific key(s).
 * @default 0
 *
 * @arg Icon:eval
 * @text Button Icon
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ButtonCommonEventsVisibility
 * @text System: Change Visibility
 * @desc Determines whether or not buttons are shown on screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the visible Button Common Events on the screen?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllButtonCommonEvents
 * @text System: Clear All Button Common Events
 * @desc Clears Common Events from all keys.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEvent
 * @text System: Clear Button Common Event
 * @desc Clears any Common Events bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to clear.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEventID
 * @text System: Clear Common Event ID(s)
 * @desc Clears any keys with the marked Common Event ID(s).
 *
 * @arg CommonEventID:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Clears any keys with the marked Common Event ID(s).
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RunButtonCommonEvent
 * @text System: Run Stored Button Common Event
 * @desc Run the Common Event stored on a specific key.
 *
 * @arg Key:str
 * @text Target Key
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Run the Common Event stored in this key.
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
 * @param ButtonCommonEvents
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
 * @desc Adjust the general settings for this plugin.
 * @default {"ForbidInputKeys:eval":"true","Buttons":"","ShowButtonsOnScreen:eval":"true","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","ButtonWidth:num":"60","ButtonHeight:num":"60","ButtonFilename:str":"","IconsUsed:arraynum":"[\"160\",\"161\",\"162\",\"163\",\"164\",\"165\"]","DrawJS:func":"\"// Declare Constants\\nconst w = this.width;\\nconst h = this.height;\\n\\n// Draw Background\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\\n\\n// Draw Picture\\nif (this.pictureBitmap()) {\\n    const picBitmap = this.pictureBitmap();\\n    const pw = picBitmap.width;\\n    const ph = picBitmap.height;\\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\\n}\\n\\n// Draw Icon\\nconst iconIndex = this.buttonIcon();\\nconst iconBitmap = ImageManager.loadSystem(\\\"IconSet\\\");\\nconst iw = ImageManager.iconWidth;\\nconst ih = ImageManager.iconHeight;\\nconst ix = (iconIndex % 16) * iw;\\nconst iy = Math.floor(iconIndex / 16) * ih;\\nconst jw = Math.floor(this.width / iw) * iw;\\nconst jh = Math.floor(this.height / ih) * ih;\\nconst jx = Math.floor((this.width - jw) / 2);\\nconst jy = Math.floor((this.height - jh) / 2);\\nthis.bitmap._context.imageSmoothingEnabled = false;\\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\\nthis.bitmap._context.imageSmoothingEnabled = true;\\n\\n// Draw Button Label\\nconst text = this.buttonLabel();\\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');\"","Positions":"","BottomPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\\nlet y = container.height - buttonHeight;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","AbovePointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\\nlet y = container.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","LeftPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","RightPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.width;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param Assign:struct
 * @text Assignment Settings
 * @type struct<Assign>
 * @desc Adjust the assignment settings for this plugin.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Cost:struct
 * @text Cost Settings
 * @type struct<Cost>
 * @desc Adjust the settings involving button press costs.
 * @default {"ItemOffsets":"","ItemOffsetX:num":"+0","ItemOffsetY:num":"+0","SkillOffsets":"","SkillOffsetX:num":"+0","SkillOffsetY:num":"+0","Misc":"","DisabledOpacity:num":"160"}
 *
 * @param NumberKeys
 * @text Number Keys
 *
 * @param KeyCode49:struct
 * @text Key: 1
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 0;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode50:struct
 * @text Key: 2
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode51:struct
 * @text Key: 3
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 2;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode52:struct
 * @text Key: 4
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 3;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode53:struct
 * @text Key: 5
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 4;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode54:struct
 * @text Key: 6
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 5;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode55:struct
 * @text Key: 7
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 6;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode56:struct
 * @text Key: 8
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 7;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode57:struct
 * @text Key: 9
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 8;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode48:struct
 * @text Key: 0
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 9;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param LetterKeys
 * @text Letter Keys
 *
 * @param KeyCode65:struct
 * @text Key: A
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"A","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode66:struct
 * @text Key: B
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"B","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode67:struct
 * @text Key: C
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"C","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode68:struct
 * @text Key: D
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"D","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode69:struct
 * @text Key: E
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"E","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode70:struct
 * @text Key: F
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"F","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode71:struct
 * @text Key: G
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"G","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode72:struct
 * @text Key: H
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"H","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode73:struct
 * @text Key: I
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"I","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode74:struct
 * @text Key: J
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"J","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode75:struct
 * @text Key: K
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"K","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode76:struct
 * @text Key: L
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"L","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode77:struct
 * @text Key: M
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"M","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode78:struct
 * @text Key: N
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"N","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode79:struct
 * @text Key: O
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"O","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode80:struct
 * @text Key: P
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"P","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode81:struct
 * @text Key: Q (PgUp)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Q","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode82:struct
 * @text Key: R
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"R","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode83:struct
 * @text Key: S
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"S","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode84:struct
 * @text Key: T
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"T","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode85:struct
 * @text Key: U
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"U","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode86:struct
 * @text Key: V
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"V","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode87:struct
 * @text Key: W (PgDn)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"W","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode88:struct
 * @text Key: X (Cancel)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"X","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode89:struct
 * @text Key: Y
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Y","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode90:struct
 * @text Key: Z (OK)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Z","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param SymbolKeys
 * @text Symbol Keys
 *
 * @param KeyCode192:struct
 * @text Key: ` ~
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"~","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x - buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode189:struct
 * @text Key: - _
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 10;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode187:struct
 * @text Key: = +
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 11;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode219:struct
 * @text Key: [ {
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"[","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode221:struct
 * @text Key: ] }
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"]","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 11;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode220:struct
 * @text Key: \ |
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\\","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 12;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode186:struct
 * @text Key: ; :
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":";","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode222:struct
 * @text Key: ' "
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\"","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode188:struct
 * @text Key: , <
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode190:struct
 * @text Key: . >
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode191:struct
 * @text Key: / ?
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"?","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param MiscKeys
 * @text Misc Keys
 *
 * @param KeyCode32:struct
 * @text Key: Space (OK)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Space","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode37:struct
 * @text Key: Left (Left)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 3;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode38:struct
 * @text Key: Up (Up)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"^","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode39:struct
 * @text Key: Right (Right)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">>","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 1;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode40:struct
 * @text Key: Down (Down)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"v","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode45:struct
 * @text Key: Insert
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Ins","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode46:struct
 * @text Key: Delete
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Del","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode36:struct
 * @text Key: Home
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Home","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode35:struct
 * @text Key: End
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"End","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode33:struct
 * @text Key: Page Up (PgUp)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgUp","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode34:struct
 * @text Key: Page Down (PgDn)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgDn","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumPadKeys
 * @text NumPad Keys
 *
 * @param KeyCode96:struct
 * @text Key: NumPad 0 (Cancel)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode97:struct
 * @text Key: NumPad 1
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode98:struct
 * @text Key: NumPad 2 (Down)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode99:struct
 * @text Key: NumPad 3
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode100:struct
 * @text Key: NumPad 4 (Left)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode101:struct
 * @text Key: NumPad 5
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode102:struct
 * @text Key: NumPad 6 (Right)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode103:struct
 * @text Key: NumPad 7
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode104:struct
 * @text Key: NumPad 8 (Up)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode105:struct
 * @text Key: NumPad 9
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode110:struct
 * @text Key: NumPad .
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":".","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode107:struct
 * @text Key: NumPad +
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode109:struct
 * @text Key: NumPad -
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode106:struct
 * @text Key: NumPad *
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"*","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode111:struct
 * @text Key: NumPad /
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"/","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
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
 * @param ForbidInputKeys:eval
 * @text Forbid Default Keys?
 * @parent Forbidden
 * @type boolean
 * @on Forbid
 * @off Allow
 * @desc Forbid already bound input keys?
 * Allowing them may cause clashes.
 * @default true
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButtonsOnScreen:eval
 * @text Show On Screen?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show buttons on screen by default?
 * @default true
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Buttons
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the button on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param ButtonWidth:num
 * @text Button Width
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The width of the visible button on screen.
 * @default 80
 *
 * @param ButtonHeight:num
 * @text Button Height
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The height of the visible button on screen.
 * @default 80
 *
 * @param ButtonFilename:str
 * @text Picture Filename
 * @parent Buttons
 * @type file
 * @dir img/pictures/
 * @desc Picture used as a button background.
 * If left empty, ignore drawing a picture.
 * @default 
 *
 * @param IconsUsed:arraynum
 * @text Undeclared Icons
 * @parent Buttons
 * @type string[]
 * @desc If a Button Common Event doesn't have an assigned icon, use one of these instead.
 * @default ["160","161","162","163","164","165"]
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @parent Buttons
 * @type note
 * @desc JavaScript code that determines how to draw the visible button.
 * @default "// Declare Constants\nconst w = this.width;\nconst h = this.height;\n\n// Draw Background\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\n\n// Draw Picture\nif (this.pictureBitmap()) {\n    const picBitmap = this.pictureBitmap();\n    const pw = picBitmap.width;\n    const ph = picBitmap.height;\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\n}\n\n// Draw Icon\nconst iconIndex = this.buttonIcon();\nconst iconBitmap = ImageManager.loadSystem(\"IconSet\");\nconst iw = ImageManager.iconWidth;\nconst ih = ImageManager.iconHeight;\nconst ix = (iconIndex % 16) * iw;\nconst iy = Math.floor(iconIndex / 16) * ih;\nconst jw = Math.floor(this.width / iw) * iw;\nconst jh = Math.floor(this.height / ih) * ih;\nconst jx = Math.floor((this.width - jw) / 2);\nconst jy = Math.floor((this.height - jh) / 2);\nthis.bitmap._context.imageSmoothingEnabled = false;\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\nthis.bitmap._context.imageSmoothingEnabled = true;\n\n// Draw Button Label\nconst text = this.buttonLabel();\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');"
 * 
 * @param Positions
 * @text Button Positions
 *
 * @param BottomPointJS:func
 * @text JS: Bottom Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the bottom buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\nlet y = container.height - buttonHeight;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param AbovePointJS:func
 * @text JS: Above Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the upper buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\nlet y = container.y;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param LeftPointJS:func
 * @text JS: Left Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the left-side buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.x;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param RightPointJS:func
 * @text JS: Right Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the right-side buttons end.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.width;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Assign Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Assign:
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Instruction:str
 * @text Instructions
 * @parent Vocab
 * @desc The instruction text that appears when assigning a Common Event to a button.
 * @default Assign to which button slot?
 * 
 * @param Window
 *
 * @param AssignWindow_KeyAlign:str
 * @text Key Align
 * @parent Window
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the button assignment window?
 * @default center
 *
 * @param AssignWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window
 * @type note
 * @desc Code used to determine the dimensions for the button assignment window.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param ItemOffsets
 * @text Item Cost Offsets
 *
 * @param ItemOffsetX:num
 * @text Offset X
 * @parent ItemOffsets
 * @desc Offsets the cost x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param ItemOffsetY:num
 * @text Offset Y
 * @parent ItemOffsets
 * @desc Offsets the cost y position.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param SkillOffsets
 * @text Skill Cost Offsets
 *
 * @param SkillOffsetX:num
 * @text Offset X
 * @parent SkillOffsets
 * @desc Offsets the cost x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param SkillOffsetY:num
 * @text Offset Y
 * @parent SkillOffsets
 * @desc Offsets the cost y position.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Misc
 * @text Misc Settings
 *
 * @param DisabledOpacity:num
 * @text Disabled Opacity
 * @parent Misc
 * @desc Opacity used for buttons that are unable to meet cost requirements.
 * @default 160
 *
 */
/* ----------------------------------------------------------------------------
 * Key Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeySettings:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The default common event tied to this key.
 * Leave it at 0 for no common event.
 * @default 0
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButton:eval
 * @text Show Button?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the button visibly on the screen?
 * @default false
 *
 * @param ShowOnlyIfCePresent:eval
 * @text Requires Bind?
 * @parent ShowButton:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If the button is shown, does it require a Common Event to be shown?
 * @default true
 *
 * @param ButtonText:str
 * @text Button Label
 * @parent Buttons
 * @desc What text do you want to display as the button label?
 * @default Untitled
 *
 * @param ButtonIcon:num
 * @text Button Icon
 * @parent Buttons
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @param PositionJS:func
 * @text JS: Position
 * @parent Buttons
 * @type note
 * @desc The X and Y coordinates for where this button is positioned.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\nconst bottomPoint = this.bottomPoint();\nconst abovePoint = this.abovePoint();\nconst leftPoint = this.leftPoint();\nconst rightPoint = this.rightPoint();\n\n// Calculate Coordinates\nlet x = 0;\nlet y = 0;\n\n// Return Coordinates\nreturn new Point(x, y);"
 * 
 * @param Custom
 * @text Custom Settings
 *
 * @param CustomWidth:num
 * @text Custom Width
 * @parent Custom
 * @desc Change the width of this button specifically.
 * Use 0 for the default size.
 * @default 0
 *
 * @param CustomHeight:num
 * @text Custom Height
 * @parent Custom
 * @desc Change the height of this button specifically.
 * Use 0 for the default size.
 * @default 0
 *
 */
//=============================================================================

const _0x2a5a15=_0x208a;function _0x2e83(){const _0x28c29a=['drawTitle','setShowButtonCommonEventButtons','isAnyButtonPressed','DIVIDE','initMembers','forceSelect','clearButtonCommonEvent','ENTER_SPECIAL','WIN_OEM_PA3','AssignSkillShowQuantity','imageSmoothingEnabled','F19','RIGHT','makeCommandList','createAllSkillCostText','VOLUME_DOWN','WIN_OEM_FJ_MASSHOU','!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!','85JBblYg','actorId','makeDefaultButtonCommonEvents','IconSet','QUESTION_MARK','stringKeyMap','WIN_OEM_ENLW','boxHeight','OS_KEY','note','IconsUsed','changePaintOpacity','Scene_Map_createSpriteset','VisuMZ_1_OptionsCore','children','AssignWindow_RectJS','F17','ALT','drawDisplaySkillCost','AssignItemPayCost','assign','item','9hCgbrK','exit','NUM','105xBcQpt','isButtonCommonEventOk','CANCEL','_context','itemHeight','ItemQuantityFontSize','ButtonText','CanAssignButtonCommonEvent','F14','INSERT','ShowButtonsOnScreen','map','PRINT','VisuMZ_1_ItemsEquipsCore','ARRAYNUM','isClickEnabled','return\x200','SkillOffsetY','setButtonCommonEvent','iconIndex','_commonEventID','Instruction','Window_ItemList_isEnabled','isButtonCommonEventForbidden','includes','DECIMAL','isWeapon','MINUS','drawDisplayType','boxWidth','updateIcon','parameters','addChild','SPACE','General','RightPointJS','4247030PHvWJm','F15','update','isEventRunning','ZOOM','setColorTone','Icon','DELETE','onMouseExit','drawBaseJS','isCommonEventPressed','ChangeButtonCommonEvent','updateOpacity','WIN_OEM_CLEAR','mainFontSize','DOWN','GetObject','paintOpacity','KeysArray','constructor','CONVERT','loadButtomCommonEventImage','flashButtonPress','description','ConvertParams','createButtonSprites','DrawJS','getButtonCommonEvent','refreshCursor','SkillOffsetX','_scene','SEMICOLON','reserveCommonEvent','BUTTON_LABEL_ALIGN','requiresCost','isActive','processButtonCommonEvent','EXECUTE','NUMPAD6','CAPSLOCK','consumable','ItemOffsetX','setupButtonCommonEventDisplays','fontSize','bind','buttonCommonEventPayCost','isPlaytest','buttonIcon','assignButtonCommonEventWindowTitle','ForbidInputKeys','AssignSkillPayCost','SceneManager_onKeyDown','drawDisplayItemQuantity','process_VisuMZ_ButtonCommonEvents_Parameters','onClick','Scene_RebindKeyboard_isForbiddenKeycode','Window_SkillList_isEnabled','WIN_OEM_RESET','buttonLabel','HoverTone','commonEventID','Scene_Boot_onDatabaseLoaded','actorID','_buttomCommonEventImage','WIN_OEM_FINISH','leftPoint','getButtonCommonEventIcon','isEnabled','itemBackColor2','assignButtonCommonEventsWindowRect','_list','SLEEP','clamp','armor','onDatabaseLoaded','PERCENT','keySettings','MODECHANGE','WIN_OEM_JUMP','OPEN_CURLY_BRACKET','SLASH','STR','isForbiddenKeycode','WIN_ICO_HELP','pictureBitmap','isSceneMap','CustomWidth','loadSystem','drawText','HELP','parse','32709039wxgTbj','ClearButtonCommonEventID','ButtonCommonEvents','Scene_Item_onItemOk','NUMPAD4','_buttonCommonEventKeyCodes','TILDE','Settings','createSpriteset','keyCode','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','AbovePointJS','initialize','onButtonAssistAssign','LeftPointJS','initButtonCommonEvents','KeyCode%1','WIN_OEM_FJ_TOUROKU','SEPARATOR','WIN_OEM_PA2','commandName','ARRAYSTR','iconHeight','WIN_OEM_FJ_LOYA','AssignItemShowQuantity','F16','payCost','_actor','CustomHeight','BottomPointJS','resetFontSettings','log','onKeyDown','EXCLAMATION','FINAL','registerCommand','max','abovePoint','callCommonEvent','WIN_OEM_ATTN','buttonCommonEventRequiresCost','isKeyButtonCommonEventValid','clearButtonCommonEventDisplayFor','weapon','flashColorTone','refresh','CLOSE_CURLY_BRACKET','CLOSE_PAREN','toUpperCase','Game_System_initialize','TAB','Key','_assignButtonCommonEventsWindow','height','activate','Keys','canPayCost','ACCEPT','trim','AMPERSAND','WIN_ICO_CLEAR','buttonCommonEventCanPayCost','innerWidth','format','playOkSound','drawItem','_buttonCommonEventShowButtons','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','windowPadding','center','clear','clearButtonCommonEventID','canPaySkillCost','ARRAYEVAL','call','NUMPAD9','fontFace','JUNJA','currentExt','iconWidth','CIRCUMFLEX','setupPaintOpacity','101396eWSlpB','F10','_buttonCommonEventDisplay','paySkillCost','ShowOnlyIfCePresent','ButtonWidth','itemRect','RegExp','_currentKey','NONCONVERT','BACK_SLASH','isShowButtonCommonEventButtons','ButtonFilename','WIN_OEM_PA1','replace','263464DVpgAB','57542uksuze','GREATER_THAN','numberFontFace','onItemOk','_slots','type','isSkill','WIN_OEM_FJ_JISHO','PERIOD','CONTEXT_MENU','ItemOffsetY','eventsXy','F24','contents','_buttonCommonEventIcons','push','createBitmap','onButtonAssistCancel','STRUCT','itemRectWithPadding','SHIFT','removeChild','needsRefresh','WIN_OEM_AUTO','round','lineHeight','drawIcon','width','floor','EREOF','isSceneChanging','createAssignButtonCommonEventsWindow','LEFT','name','indexOf','CommonEventID','F18','VOLUME_UP','ClearAllButtonCommonEvents','Scene_Item','PAUSE','F20','EVAL','targetOpacity','keyMapper','ClearButtonCommonEvent','NUMPAD8','updateRefreshCache','ButtonHeight','bitmap','actor','match','PLAY','ChangeTone','isBusy','buttonHeight','F22','VOLUME_MUTE','length','QUOTE','ADD','loadPicture','rightPoint','split','createButtonCommonEventsSpriteContainer','RunButtonCommonEvent','NUMPAD1','ESC','blt','maxCols','isCommandEnabled','prototype','Scene_Map_isAnyButtonPressed','VisuMZ_1_SkillsStatesCore','ARRAYJSON','WIN_OEM_CUSEL','setButtonCommonEventIcon','_icon','ADD_REBIND_OPTIONS','META','colSpacing','clearColorTone','Scene_Skill_onItemOk','cancel','ItemsEquipsCore','_key','numItems','F21','NUMPAD5','AssignCommonEvent','clearButtonCommonEventIcon','PositionJS','ASTERISK','Visible','bottomPoint','BACKSPACE','itemBackColor1','onColorTone','WIN_OEM_BACKTAB','ARRAYSTRUCT','WIN_ICO_00','isPressed','F12','checkEventTriggerTouchInForwardLocation','onPress','playEquip','isTriggerIn','opacity','status','rowSpacing','END','isItem','_buttonCommonEventsSpriteContainer','_lastDisplayCanPay','settings','AssignButtonSlots','filter','PGUP','setData','mainFontFace','calcWindowHeight','onMouseEnter','scrollBaseY','2178492KGGIvU','_lastDisplayQuantity','HANJA','F23','PRINTSCREEN','callUpdateHelp','MULTIPLY','4702602DRhYOM','create','ButtonIcon','checkMatchingButtonCommonEventDisplayTypeClear','CRSEL','19gHBiLZ','ItemScene','NUMPAD2','Assign','skill','getButtonCommonEventDisplayData','SUBTRACT','DOLLAR','drawData'];_0x2e83=function(){return _0x28c29a;};return _0x2e83();}(function(_0x38de00,_0x44a109){const _0x48e84f=_0x208a,_0x3aea98=_0x38de00();while(!![]){try{const _0xa25115=-parseInt(_0x48e84f(0x2d8))/0x1*(parseInt(_0x48e84f(0x251))/0x2)+-parseInt(_0x48e84f(0x2cc))/0x3+parseInt(_0x48e84f(0x241))/0x4*(parseInt(_0x48e84f(0x2f3))/0x5)+-parseInt(_0x48e84f(0x2d3))/0x6+parseInt(_0x48e84f(0x30c))/0x7*(-parseInt(_0x48e84f(0x250))/0x8)+parseInt(_0x48e84f(0x309))/0x9*(-parseInt(_0x48e84f(0x194))/0xa)+parseInt(_0x48e84f(0x1ef))/0xb;if(_0xa25115===_0x44a109)break;else _0x3aea98['push'](_0x3aea98['shift']());}catch(_0x5aa385){_0x3aea98['push'](_0x3aea98['shift']());}}}(_0x2e83,0x68c94));var label=_0x2a5a15(0x1f1),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2a5a15(0x2c5)](function(_0x4714b0){const _0x4608ad=_0x2a5a15;return _0x4714b0[_0x4608ad(0x2bd)]&&_0x4714b0[_0x4608ad(0x1ab)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2a5a15(0x1f6)]=VisuMZ[label][_0x2a5a15(0x1f6)]||{},VisuMZ[_0x2a5a15(0x1ac)]=function(_0x2e185e,_0x108c83){const _0xea71f1=_0x2a5a15;for(const _0x4c8a0d in _0x108c83){if(_0x4c8a0d[_0xea71f1(0x284)](/(.*):(.*)/i)){const _0x4b1fca=String(RegExp['$1']),_0x154e37=String(RegExp['$2'])[_0xea71f1(0x21f)]()[_0xea71f1(0x229)]();let _0x1e4954,_0x5d5ad1,_0x1f59b7;switch(_0x154e37){case _0xea71f1(0x30b):_0x1e4954=_0x108c83[_0x4c8a0d]!==''?Number(_0x108c83[_0x4c8a0d]):0x0;break;case _0xea71f1(0x31a):_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x2cfada=>Number(_0x2cfada));break;case _0xea71f1(0x27b):_0x1e4954=_0x108c83[_0x4c8a0d]!==''?eval(_0x108c83[_0x4c8a0d]):null;break;case _0xea71f1(0x238):_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x278ce0=>eval(_0x278ce0));break;case'JSON':_0x1e4954=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):'';break;case _0xea71f1(0x29b):_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x432141=>JSON[_0xea71f1(0x1ee)](_0x432141));break;case'FUNC':_0x1e4954=_0x108c83[_0x4c8a0d]!==''?new Function(JSON['parse'](_0x108c83[_0x4c8a0d])):new Function(_0xea71f1(0x31c));break;case'ARRAYFUNC':_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x14f346=>new Function(JSON[_0xea71f1(0x1ee)](_0x14f346)));break;case _0xea71f1(0x1e5):_0x1e4954=_0x108c83[_0x4c8a0d]!==''?String(_0x108c83[_0x4c8a0d]):'';break;case _0xea71f1(0x204):_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x172a00=>String(_0x172a00));break;case _0xea71f1(0x263):_0x1f59b7=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):{},_0x1e4954=VisuMZ[_0xea71f1(0x1ac)]({},_0x1f59b7);break;case _0xea71f1(0x2b4):_0x5d5ad1=_0x108c83[_0x4c8a0d]!==''?JSON[_0xea71f1(0x1ee)](_0x108c83[_0x4c8a0d]):[],_0x1e4954=_0x5d5ad1[_0xea71f1(0x317)](_0x2fbe48=>VisuMZ[_0xea71f1(0x1ac)]({},JSON[_0xea71f1(0x1ee)](_0x2fbe48)));break;default:continue;}_0x2e185e[_0x4b1fca]=_0x1e4954;}}return _0x2e185e;},(_0x4d3aad=>{const _0x2ac37f=_0x2a5a15,_0x1b2fcb=_0x4d3aad['name'];for(const _0x313d68 of dependencies){if(!Imported[_0x313d68]){alert(_0x2ac37f(0x232)[_0x2ac37f(0x22e)](_0x1b2fcb,_0x313d68)),SceneManager[_0x2ac37f(0x30a)]();break;}}const _0x5aed07=_0x4d3aad[_0x2ac37f(0x1ab)];if(_0x5aed07[_0x2ac37f(0x284)](/\[Version[ ](.*?)\]/i)){const _0x39fd15=Number(RegExp['$1']);_0x39fd15!==VisuMZ[label]['version']&&(alert(_0x2ac37f(0x1f9)['format'](_0x1b2fcb,_0x39fd15)),SceneManager['exit']());}if(_0x5aed07[_0x2ac37f(0x284)](/\[Tier[ ](\d+)\]/i)){const _0x414c09=Number(RegExp['$1']);_0x414c09<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2ac37f(0x22e)](_0x1b2fcb,_0x414c09,tier)),SceneManager[_0x2ac37f(0x30a)]()):tier=Math[_0x2ac37f(0x213)](_0x414c09,tier);}VisuMZ[_0x2ac37f(0x1ac)](VisuMZ[label][_0x2ac37f(0x1f6)],_0x4d3aad[_0x2ac37f(0x18f)]);})(pluginData),PluginManager[_0x2a5a15(0x212)](pluginData[_0x2a5a15(0x272)],_0x2a5a15(0x19f),_0x4ad671=>{const _0x22a71b=_0x2a5a15;VisuMZ[_0x22a71b(0x1ac)](_0x4ad671,_0x4ad671);const _0x28e641=_0x4ad671[_0x22a71b(0x226)],_0x129516=_0x4ad671[_0x22a71b(0x274)],_0x56da8d=_0x4ad671[_0x22a71b(0x19a)];for(let _0x222674 of _0x28e641){_0x222674=_0x222674[_0x22a71b(0x24f)](/\s*\(.*?\)\s*/g,'')[_0x22a71b(0x21f)]()[_0x22a71b(0x229)]();const _0x35e645=TextManager[_0x22a71b(0x2f8)][_0x22a71b(0x273)](_0x222674);_0x35e645>0x0&&($gameSystem[_0x22a71b(0x31e)](_0x35e645,_0x129516),$gameSystem[_0x22a71b(0x29d)](_0x35e645,_0x56da8d));}}),PluginManager['registerCommand'](pluginData[_0x2a5a15(0x272)],'ButtonCommonEventsVisibility',_0x482fd4=>{const _0x128f50=_0x2a5a15;VisuMZ[_0x128f50(0x1ac)](_0x482fd4,_0x482fd4);const _0x54fa1c=_0x482fd4[_0x128f50(0x2ae)];$gameSystem[_0x128f50(0x2e2)](_0x54fa1c);}),PluginManager[_0x2a5a15(0x212)](pluginData['name'],_0x2a5a15(0x27e),_0x113bb5=>{const _0x45970c=_0x2a5a15;VisuMZ[_0x45970c(0x1ac)](_0x113bb5,_0x113bb5);const _0x3b3b1d=_0x113bb5[_0x45970c(0x226)];for(let _0x33808e of _0x3b3b1d){_0x33808e=_0x33808e['replace'](/\s*\(.*?\)\s*/g,'')[_0x45970c(0x21f)]()['trim']();const _0x219c23=TextManager[_0x45970c(0x2f8)]['indexOf'](_0x33808e);if(_0x219c23>0x0)$gameSystem[_0x45970c(0x31e)](_0x219c23,0x0);}}),PluginManager[_0x2a5a15(0x212)](pluginData['name'],_0x2a5a15(0x277),_0x591489=>{const _0xa8c927=_0x2a5a15;$gameSystem[_0xa8c927(0x1f4)]={};}),PluginManager['registerCommand'](pluginData['name'],_0x2a5a15(0x1f0),_0x31deee=>{const _0x33fdb1=_0x2a5a15;VisuMZ[_0x33fdb1(0x1ac)](_0x31deee,_0x31deee);const _0x11d58b=_0x31deee['CommonEventID'];for(const _0x1a5d2e of _0x11d58b){$gameSystem[_0x33fdb1(0x236)](_0x1a5d2e);}}),PluginManager[_0x2a5a15(0x212)](pluginData[_0x2a5a15(0x272)],_0x2a5a15(0x292),_0x262312=>{const _0x51b677=_0x2a5a15;VisuMZ[_0x51b677(0x1ac)](_0x262312,_0x262312);let _0x5a0076=_0x262312[_0x51b677(0x222)]['toUpperCase']()[_0x51b677(0x229)]();_0x5a0076=_0x5a0076[_0x51b677(0x24f)](/\s*\(.*?\)\s*/g,'')[_0x51b677(0x21f)]()[_0x51b677(0x229)]();const _0x13de52=TextManager[_0x51b677(0x2f8)][_0x51b677(0x273)](_0x5a0076),_0x5e1636=$gameSystem[_0x51b677(0x1af)](_0x13de52);_0x5e1636>0x0&&$gameTemp[_0x51b677(0x1b4)](_0x5e1636);}),VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x248)]={'AssignCommonEvent':/<ASSIGN BUTTON COMMON EVENT:[ ](.*)>/i,'AssignButtonSlots':/<ASSIGN BUTTON (?:SLOT|SLOTS):[ ](.*)>/i,'AssignSkillShowQuantity':/<ASSIGN BUTTON SHOW COST>/i,'AssignSkillPayCost':/<ASSIGN BUTTON PAY COST>/i,'AssignItemShowQuantity':/<ASSIGN BUTTON SHOW (?:COST|QUANTITY)>/i,'AssignItemPayCost':/<ASSIGN BUTTON (?:CONSUME QUANTITY|PAY COST)>/i},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x1d1)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x2a5a15(0x298)][_0x2a5a15(0x1de)]=function(){const _0x1eb6d1=_0x2a5a15;VisuMZ['ButtonCommonEvents'][_0x1eb6d1(0x1d1)]['call'](this),this['process_VisuMZ_ButtonCommonEvents_Parameters'](),ImageManager[_0x1eb6d1(0x1a9)]();},Scene_Boot[_0x2a5a15(0x298)][_0x2a5a15(0x1c9)]=function(){const _0x2ba953=_0x2a5a15,_0x351886=[];for(let _0x3b1fa5=0x30;_0x3b1fa5<=0x39;_0x3b1fa5++){_0x351886[_0x2ba953(0x260)](_0x3b1fa5);}for(let _0x7fdb62=0x41;_0x7fdb62<=0x5a;_0x7fdb62++){_0x351886[_0x2ba953(0x260)](_0x7fdb62);}for(let _0x417c6e=0xba;_0x417c6e<=0xc0;_0x417c6e++){_0x351886[_0x2ba953(0x260)](_0x417c6e);}for(let _0x3f82c0=0xdb;_0x3f82c0<=0xde;_0x3f82c0++){_0x351886[_0x2ba953(0x260)](_0x3f82c0);}for(let _0x2bcaf8=0x20;_0x2bcaf8<=0x28;_0x2bcaf8++){_0x351886[_0x2ba953(0x260)](_0x2bcaf8);}for(let _0x3a3de5=0x2d;_0x3a3de5<=0x2e;_0x3a3de5++){_0x351886[_0x2ba953(0x260)](_0x3a3de5);}for(let _0x15a399=0x60;_0x15a399<=0x6f;_0x15a399++){_0x351886['push'](_0x15a399);}VisuMZ[_0x2ba953(0x1f1)]['KeysArray']=_0x351886;},Input['isButtonCommonEventForbidden']=function(_0x2bc2fb){const _0x662c07=_0x2a5a15;if(!VisuMZ['ButtonCommonEvents'][_0x662c07(0x1f6)]['General'][_0x662c07(0x1c5)])return![];return!!Input[_0x662c07(0x27d)][_0x2bc2fb];},ImageManager[_0x2a5a15(0x1a9)]=function(){const _0x524db9=_0x2a5a15,_0x4eb4ab=VisuMZ['ButtonCommonEvents']['Settings'][_0x524db9(0x192)][_0x524db9(0x24d)];this[_0x524db9(0x1d3)]=_0x4eb4ab?ImageManager[_0x524db9(0x28e)](_0x4eb4ab):new Bitmap(0x1,0x1);},TextManager[_0x2a5a15(0x2f8)]=['','','',_0x2a5a15(0x30e),'','',_0x2a5a15(0x1ed),'',_0x2a5a15(0x2b0),_0x2a5a15(0x221),'','','CLEAR','ENTER',_0x2a5a15(0x2e8),'',_0x2a5a15(0x265),'CTRL',_0x2a5a15(0x304),_0x2a5a15(0x279),_0x2a5a15(0x1bb),'KANA','EISU',_0x2a5a15(0x23c),_0x2a5a15(0x211),_0x2a5a15(0x2ce),'',_0x2a5a15(0x294),_0x2a5a15(0x1a8),_0x2a5a15(0x24a),_0x2a5a15(0x228),_0x2a5a15(0x1e1),_0x2a5a15(0x191),_0x2a5a15(0x2c6),'PGDN',_0x2a5a15(0x2bf),'HOME',_0x2a5a15(0x271),'UP',_0x2a5a15(0x2ed),_0x2a5a15(0x1a3),'SELECT',_0x2a5a15(0x318),_0x2a5a15(0x1b9),_0x2a5a15(0x2d0),_0x2a5a15(0x315),_0x2a5a15(0x19b),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x2a5a15(0x1b3),'LESS_THAN','EQUALS',_0x2a5a15(0x252),_0x2a5a15(0x2f7),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2a5a15(0x2fb),'',_0x2a5a15(0x25a),'',_0x2a5a15(0x1db),'NUMPAD0',_0x2a5a15(0x293),_0x2a5a15(0x2da),'NUMPAD3',_0x2a5a15(0x1f3),_0x2a5a15(0x2a9),_0x2a5a15(0x1ba),'NUMPAD7',_0x2a5a15(0x27f),_0x2a5a15(0x23a),_0x2a5a15(0x2d2),_0x2a5a15(0x28d),_0x2a5a15(0x201),_0x2a5a15(0x2de),_0x2a5a15(0x325),_0x2a5a15(0x2e4),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x2a5a15(0x242),'F11',_0x2a5a15(0x2b7),'F13',_0x2a5a15(0x314),_0x2a5a15(0x195),_0x2a5a15(0x208),_0x2a5a15(0x303),_0x2a5a15(0x275),_0x2a5a15(0x2ec),_0x2a5a15(0x27a),_0x2a5a15(0x2a8),_0x2a5a15(0x289),_0x2a5a15(0x2cf),_0x2a5a15(0x25d),'','','','','','','','','NUM_LOCK','SCROLL_LOCK',_0x2a5a15(0x258),_0x2a5a15(0x2f1),_0x2a5a15(0x200),_0x2a5a15(0x206),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x2a5a15(0x23f),_0x2a5a15(0x210),'DOUBLE_QUOTE','HASH',_0x2a5a15(0x2df),_0x2a5a15(0x1df),_0x2a5a15(0x22a),'UNDERSCORE','OPEN_PAREN',_0x2a5a15(0x21e),_0x2a5a15(0x2ad),'PLUS','PIPE','HYPHEN_MINUS',_0x2a5a15(0x1e3),_0x2a5a15(0x21d),_0x2a5a15(0x1f5),'','','','',_0x2a5a15(0x28a),_0x2a5a15(0x2f0),_0x2a5a15(0x276),'','',_0x2a5a15(0x1b3),'EQUALS','COMMA',_0x2a5a15(0x327),_0x2a5a15(0x259),_0x2a5a15(0x1e4),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x2a5a15(0x24b),'CLOSE_BRACKET',_0x2a5a15(0x28c),'',_0x2a5a15(0x2a0),'ALTGR','',_0x2a5a15(0x1e7),_0x2a5a15(0x2b5),'',_0x2a5a15(0x22b),'','',_0x2a5a15(0x1cd),_0x2a5a15(0x1e2),_0x2a5a15(0x24e),_0x2a5a15(0x202),_0x2a5a15(0x2e9),'WIN_OEM_WSCTRL',_0x2a5a15(0x29c),_0x2a5a15(0x216),_0x2a5a15(0x1d4),'WIN_OEM_COPY',_0x2a5a15(0x268),_0x2a5a15(0x2f9),_0x2a5a15(0x2b3),'ATTN',_0x2a5a15(0x2d7),'EXSEL',_0x2a5a15(0x26e),_0x2a5a15(0x285),_0x2a5a15(0x198),'','PA1',_0x2a5a15(0x1a1),''],VisuMZ['ButtonCommonEvents'][_0x2a5a15(0x1c7)]=SceneManager[_0x2a5a15(0x20f)],SceneManager[_0x2a5a15(0x20f)]=function(_0x94a9d1){const _0x78dbd7=_0x2a5a15;this[_0x78dbd7(0x1e9)]()&&this[_0x78dbd7(0x218)](_0x94a9d1)&&this[_0x78dbd7(0x1b2)][_0x78dbd7(0x1b8)](_0x94a9d1[_0x78dbd7(0x1f8)]),VisuMZ['ButtonCommonEvents'][_0x78dbd7(0x1c7)][_0x78dbd7(0x239)](this,_0x94a9d1);},SceneManager[_0x2a5a15(0x1e9)]=function(){const _0xcc9961=_0x2a5a15;return this[_0xcc9961(0x1b2)]&&this[_0xcc9961(0x1b2)][_0xcc9961(0x1a7)]===Scene_Map;},SceneManager[_0x2a5a15(0x218)]=function(_0xae12da){const _0x309e8a=_0x2a5a15;return!Input['isButtonCommonEventForbidden'](_0xae12da[_0x309e8a(0x1f8)]);},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x220)]=Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x1fb)],Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x1fb)]=function(){const _0x401387=_0x2a5a15;VisuMZ['ButtonCommonEvents'][_0x401387(0x220)]['call'](this),this[_0x401387(0x1fe)]();},Game_System[_0x2a5a15(0x298)]['initButtonCommonEvents']=function(){const _0x4db7aa=_0x2a5a15;this[_0x4db7aa(0x1f4)]={},this[_0x4db7aa(0x25f)]={},this[_0x4db7aa(0x231)]=VisuMZ[_0x4db7aa(0x1f1)][_0x4db7aa(0x1f6)][_0x4db7aa(0x192)][_0x4db7aa(0x316)],this[_0x4db7aa(0x2f5)]();},Game_System['prototype'][_0x2a5a15(0x2f5)]=function(){const _0x25c373=_0x2a5a15,_0x27591e=VisuMZ[_0x25c373(0x1f1)][_0x25c373(0x1f6)],_0x4d3b1f=_0x25c373(0x1ff);for(const _0x5e8d1d of VisuMZ['ButtonCommonEvents'][_0x25c373(0x1a6)]){const _0x5ef1c6=_0x4d3b1f[_0x25c373(0x22e)](_0x5e8d1d);!!_0x27591e[_0x5ef1c6]&&(this[_0x25c373(0x31e)](_0x5e8d1d,_0x27591e[_0x5ef1c6][_0x25c373(0x274)]),this[_0x25c373(0x29d)](_0x5e8d1d,_0x27591e[_0x5ef1c6][_0x25c373(0x2d5)]));}},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x1af)]=function(_0x5da197){const _0x47936a=_0x2a5a15;if(this[_0x47936a(0x1f4)]===undefined)this[_0x47936a(0x1fe)]();return this['_buttonCommonEventKeyCodes'][_0x5da197]||0x0;},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x31e)]=function(_0x481eff,_0x6ced8a){const _0x236edc=_0x2a5a15;if(this[_0x236edc(0x1f4)]===undefined)this[_0x236edc(0x1fe)]();if($gameTemp[_0x236edc(0x1c2)]()&&Input[_0x236edc(0x323)](_0x481eff)&&_0x6ced8a!==0x0){const _0x319075=_0x236edc(0x2f2)[_0x236edc(0x22e)](TextManager[_0x236edc(0x2f8)][_0x481eff]);alert(_0x319075);return;}this[_0x236edc(0x1f4)][_0x481eff]=_0x6ced8a;},Game_System[_0x2a5a15(0x298)]['clearButtonCommonEvent']=function(_0x22a7ab){const _0x8a4a5=_0x2a5a15;if(this['_buttonCommonEventKeyCodes']===undefined)this[_0x8a4a5(0x1fe)]();delete this[_0x8a4a5(0x1f4)][_0x22a7ab],this['clearButtonCommonEventDisplayFor'](_0x22a7ab);},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x1d6)]=function(_0x597226){const _0x25a42d=_0x2a5a15;if(this[_0x25a42d(0x25f)]===undefined)this[_0x25a42d(0x1fe)]();return this['_buttonCommonEventIcons'][_0x597226]||0x0;},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x29d)]=function(_0x2789e7,_0x210ca6){const _0xe134a1=_0x2a5a15;if(this[_0xe134a1(0x25f)]===undefined)this[_0xe134a1(0x1fe)]();this[_0xe134a1(0x25f)][_0x2789e7]=_0x210ca6;},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x2ab)]=function(_0x1dd370){const _0x4e976c=_0x2a5a15;if(this['_buttonCommonEventIcons']===undefined)this[_0x4e976c(0x1fe)]();delete this['_buttonCommonEventIcons'][_0x1dd370];},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x24c)]=function(){const _0x135ece=_0x2a5a15;if(this['_buttonCommonEventShowButtons']===undefined)this['initButtonCommonEvents']();return this[_0x135ece(0x231)];},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x2e2)]=function(_0xad74ee){const _0x3047cb=_0x2a5a15;if(this[_0x3047cb(0x231)]===undefined)this[_0x3047cb(0x1fe)]();this[_0x3047cb(0x231)]=_0xad74ee;},Game_System['prototype'][_0x2a5a15(0x236)]=function(_0x5a7945,_0x9894){const _0x5f0491=_0x2a5a15;for(const _0x4f14cf of VisuMZ[_0x5f0491(0x1f1)]['KeysArray']){if(!this[_0x5f0491(0x2d6)](_0x9894,_0x4f14cf))continue;this[_0x5f0491(0x1af)](_0x4f14cf)===_0x5a7945&&(this[_0x5f0491(0x2e7)](_0x4f14cf),this['clearButtonCommonEventIcon'](_0x4f14cf),this[_0x5f0491(0x219)](_0x4f14cf));}},Game_System[_0x2a5a15(0x298)]['checkMatchingButtonCommonEventDisplayTypeClear']=function(_0x5e9528,_0x22f446){const _0x1bfe0f=_0x2a5a15;if(!_0x5e9528)return!![];const _0x203eaa=this[_0x1bfe0f(0x2dd)](_0x22f446);if(!_0x203eaa)return!![];for(const _0x8d0732 in _0x203eaa){if(_0x203eaa[_0x8d0732]!==_0x5e9528[_0x8d0732])return![];}return!![];},Game_System['prototype'][_0x2a5a15(0x1be)]=function(_0x3ac29b,_0x19688c){const _0x2887e2=_0x2a5a15;if(!_0x19688c)return;this[_0x2887e2(0x243)]=this[_0x2887e2(0x243)]||{},this[_0x2887e2(0x243)][_0x3ac29b]=undefined;const _0x275ae8=VisuMZ[_0x2887e2(0x1f1)][_0x2887e2(0x248)],_0x53f911=_0x19688c['note']||'';let _0x4953fa='';if(DataManager[_0x2887e2(0x257)](_0x19688c))_0x4953fa=_0x2887e2(0x2dc);else{if(DataManager[_0x2887e2(0x2c0)](_0x19688c))_0x4953fa=_0x2887e2(0x308);else{if(DataManager[_0x2887e2(0x326)](_0x19688c))_0x4953fa=_0x2887e2(0x21a);else DataManager['isArmor'](_0x19688c)&&(_0x4953fa=_0x2887e2(0x1dd));}}if(!_0x4953fa)return;if(_0x4953fa===_0x2887e2(0x2dc)){const _0xb8c8c2=SceneManager[_0x2887e2(0x1b2)][_0x2887e2(0x20a)];_0x53f911['match'](_0x275ae8[_0x2887e2(0x2ea)])&&(this[_0x2887e2(0x243)][_0x3ac29b]={'type':_0x4953fa,'id':_0x19688c['id'],'actorID':_0xb8c8c2?_0xb8c8c2[_0x2887e2(0x2f4)]():0x0}),_0x53f911[_0x2887e2(0x284)](_0x275ae8[_0x2887e2(0x1c6)])&&(this[_0x2887e2(0x243)][_0x3ac29b]={'type':_0x4953fa,'id':_0x19688c['id'],'actorID':_0xb8c8c2?_0xb8c8c2[_0x2887e2(0x2f4)]():0x0,'payCost':!![]});}else _0x53f911[_0x2887e2(0x284)](_0x275ae8[_0x2887e2(0x207)])&&(this[_0x2887e2(0x243)][_0x3ac29b]={'type':_0x4953fa,'id':_0x19688c['id']}),_0x53f911[_0x2887e2(0x284)](_0x275ae8[_0x2887e2(0x306)])&&_0x19688c[_0x2887e2(0x1bc)]!==![]&&(this['_buttonCommonEventDisplay'][_0x3ac29b]={'type':_0x4953fa,'id':_0x19688c['id'],'payCost':!![]});},Game_System[_0x2a5a15(0x298)][_0x2a5a15(0x2dd)]=function(_0x3e836e){const _0x393dab=_0x2a5a15;return this[_0x393dab(0x243)]=this[_0x393dab(0x243)]||{},this[_0x393dab(0x243)][_0x3e836e];},Game_System['prototype']['clearButtonCommonEventDisplayFor']=function(_0x15b978){const _0x3b2fe7=_0x2a5a15;this[_0x3b2fe7(0x243)]=this[_0x3b2fe7(0x243)]||{},delete this[_0x3b2fe7(0x243)][_0x15b978];},Game_System[_0x2a5a15(0x298)]['buttonCommonEventRequiresCost']=function(_0x1ed5a5){const _0x3d5b77=_0x2a5a15,_0x29374e=this[_0x3d5b77(0x2dd)](_0x1ed5a5);if(!_0x29374e)return![];if(_0x29374e[_0x3d5b77(0x209)])return!![];return![];},Game_System['prototype'][_0x2a5a15(0x22c)]=function(_0x3758fb){const _0x4a093d=_0x2a5a15;if(!this[_0x4a093d(0x217)](_0x3758fb))return!![];const _0x23a3b4=this[_0x4a093d(0x2dd)](_0x3758fb);if(!_0x23a3b4)return!![];const _0x5b2b7e=_0x23a3b4[_0x4a093d(0x256)],_0x38c416=_0x23a3b4['id'],_0x269c5c=VisuMZ[_0x4a093d(0x1f1)]['GetObject'](_0x5b2b7e,_0x38c416);if(!_0x269c5c)return![];if(_0x5b2b7e===_0x4a093d(0x2dc)){const _0x20a8d4=$gameActors['actor'](_0x23a3b4[_0x4a093d(0x1d2)]);if(!_0x20a8d4)return![];if(!_0x20a8d4[_0x4a093d(0x237)](_0x269c5c))return![];if(!$gameParty['allMembers']()[_0x4a093d(0x324)](_0x20a8d4))return![];}else{const _0x4e6eaf=$gameParty[_0x4a093d(0x2a7)](_0x269c5c);if(_0x4e6eaf<=0x0)return![];}return!![];},Game_System['prototype'][_0x2a5a15(0x1c1)]=function(_0x32dbcb){const _0x13618f=_0x2a5a15;if(!this[_0x13618f(0x217)](_0x32dbcb))return;const _0x56edd0=this['getButtonCommonEventDisplayData'](_0x32dbcb);if(!_0x56edd0)return;const _0x107964=_0x56edd0[_0x13618f(0x256)],_0x4a09a4=_0x56edd0['id'],_0x3cf376=VisuMZ[_0x13618f(0x1f1)][_0x13618f(0x1a4)](_0x107964,_0x4a09a4);if(!_0x3cf376)return;if(_0x107964===_0x13618f(0x2dc)){const _0x9256bb=$gameActors[_0x13618f(0x283)](_0x56edd0[_0x13618f(0x1d2)]);if(_0x9256bb)_0x9256bb[_0x13618f(0x244)](_0x3cf376);}else $gameParty['loseItem'](_0x3cf376,0x1);return!![];},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x2ff)]=Scene_Map[_0x2a5a15(0x298)][_0x2a5a15(0x1f7)],Scene_Map[_0x2a5a15(0x298)][_0x2a5a15(0x1f7)]=function(){const _0x3671c0=_0x2a5a15;VisuMZ['ButtonCommonEvents']['Scene_Map_createSpriteset'][_0x3671c0(0x239)](this),this['createButtonCommonEventsSpriteContainer']();},Scene_Map[_0x2a5a15(0x298)][_0x2a5a15(0x291)]=function(){const _0xda55ed=_0x2a5a15;if(this[_0xda55ed(0x1a7)]!==Scene_Map)return;this[_0xda55ed(0x2c1)]=new Sprite_ButtonCommonEventsContainer(),this[_0xda55ed(0x190)](this[_0xda55ed(0x2c1)]);},Scene_Map['prototype'][_0x2a5a15(0x1b8)]=function(_0x3a3344){const _0x16dd65=_0x2a5a15;if(!this[_0x16dd65(0x30d)](_0x3a3344))return;if($gameMap&&$gameMap['isEventRunning']())return;const _0x3fa31e=$gameSystem['getButtonCommonEvent'](_0x3a3344)||0x0;_0x3fa31e>0x0&&$dataCommonEvents[_0x3fa31e]&&($gameSystem[_0x16dd65(0x22c)](_0x3a3344)&&($gameSystem[_0x16dd65(0x1c1)](_0x3a3344),$gameTemp[_0x16dd65(0x1b4)](_0x3fa31e)),this[_0x16dd65(0x2c1)][_0x16dd65(0x1aa)](_0x3a3344));},Scene_Map[_0x2a5a15(0x298)][_0x2a5a15(0x30d)]=function(_0x2fbd7f){const _0x30cfbc=_0x2a5a15;if(!this[_0x30cfbc(0x1b7)]())return![];if($gameMessage[_0x30cfbc(0x287)]())return![];if(SceneManager[_0x30cfbc(0x26f)]())return![];if(Input[_0x30cfbc(0x27d)][_0x2fbd7f]==='ok'){if($gamePlayer['checkEventTriggerTouchInForwardLocation']())return![];}return!![];},VisuMZ['ButtonCommonEvents']['Scene_Map_isAnyButtonPressed']=Scene_Map['prototype'][_0x2a5a15(0x2e3)],Scene_Map[_0x2a5a15(0x298)]['isAnyButtonPressed']=function(){const _0x5e9885=_0x2a5a15,_0x1156dd=this[_0x5e9885(0x2c1)];if(_0x1156dd){if(_0x1156dd[_0x5e9885(0x2e3)]())return!![];}return VisuMZ[_0x5e9885(0x1f1)][_0x5e9885(0x299)][_0x5e9885(0x239)](this);},Game_Player['prototype'][_0x2a5a15(0x2b8)]=function(){const _0xc6485a=_0x2a5a15;let _0x23f7db=this['x'],_0x5743f0=this['y'];for(const _0x2bfd80 of $gameMap[_0xc6485a(0x25c)](_0x23f7db,_0x5743f0)){if(!_0x2bfd80)continue;if(_0x2bfd80[_0xc6485a(0x2bb)]([0x1,0x2]))return!![];}return![];};function Sprite_ButtonCommonEventsContainer(){const _0x50735a=_0x2a5a15;this[_0x50735a(0x1fb)](...arguments);}function _0x208a(_0x2a27f7,_0x102553){const _0x2e8352=_0x2e83();return _0x208a=function(_0x208a9f,_0x42ad9d){_0x208a9f=_0x208a9f-0x18c;let _0x19481f=_0x2e8352[_0x208a9f];return _0x19481f;},_0x208a(_0x2a27f7,_0x102553);}Sprite_ButtonCommonEventsContainer['prototype']=Object[_0x2a5a15(0x2d4)](Sprite[_0x2a5a15(0x298)]),Sprite_ButtonCommonEventsContainer['prototype'][_0x2a5a15(0x1a7)]=Sprite_ButtonCommonEventsContainer,Sprite_ButtonCommonEventsContainer['prototype'][_0x2a5a15(0x1fb)]=function(){const _0x204fba=_0x2a5a15;Sprite['prototype'][_0x204fba(0x1fb)][_0x204fba(0x239)](this),this[_0x204fba(0x2e5)](),this['createButtonSprites']();},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x2e5)]=function(){const _0x39ec82=_0x2a5a15;this[_0x39ec82(0x26c)]=Graphics['width'],this[_0x39ec82(0x224)]=Graphics[_0x39ec82(0x224)];},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x1e0)]=function(){const _0x41d095=_0x2a5a15;if(!this['_currentKey'])return{};return VisuMZ[_0x41d095(0x1f1)][_0x41d095(0x1f6)][this[_0x41d095(0x249)]||'']||{};},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)]['buttonWidth']=function(){const _0x50aa78=_0x2a5a15;return this[_0x50aa78(0x1e0)]()[_0x50aa78(0x1ea)]||VisuMZ['ButtonCommonEvents'][_0x50aa78(0x1f6)]['General'][_0x50aa78(0x246)];},Sprite_ButtonCommonEventsContainer['prototype'][_0x2a5a15(0x288)]=function(){const _0xe2f13b=_0x2a5a15;return this[_0xe2f13b(0x1e0)]()[_0xe2f13b(0x20b)]||VisuMZ[_0xe2f13b(0x1f1)]['Settings'][_0xe2f13b(0x192)][_0xe2f13b(0x281)];},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x2af)]=function(){const _0x3dadcc=_0x2a5a15;try{return VisuMZ[_0x3dadcc(0x1f1)][_0x3dadcc(0x1f6)]['General'][_0x3dadcc(0x20c)][_0x3dadcc(0x239)](this);}catch(_0xc65789){if($gameTemp[_0x3dadcc(0x1c2)]())console[_0x3dadcc(0x20e)](_0xc65789);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x1d5)]=function(){const _0xbf89e8=_0x2a5a15;try{return VisuMZ[_0xbf89e8(0x1f1)][_0xbf89e8(0x1f6)][_0xbf89e8(0x192)][_0xbf89e8(0x1fd)][_0xbf89e8(0x239)](this);}catch(_0x1ddffa){if($gameTemp[_0xbf89e8(0x1c2)]())console[_0xbf89e8(0x20e)](_0x1ddffa);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x28f)]=function(){const _0xb3cb31=_0x2a5a15;try{return VisuMZ['ButtonCommonEvents'][_0xb3cb31(0x1f6)][_0xb3cb31(0x192)][_0xb3cb31(0x193)][_0xb3cb31(0x239)](this);}catch(_0x5dd02f){if($gameTemp[_0xb3cb31(0x1c2)]())console[_0xb3cb31(0x20e)](_0x5dd02f);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer['prototype'][_0x2a5a15(0x214)]=function(){const _0x122498=_0x2a5a15;try{return VisuMZ['ButtonCommonEvents'][_0x122498(0x1f6)][_0x122498(0x192)][_0x122498(0x1fa)][_0x122498(0x239)](this);}catch(_0x1cfdf5){if($gameTemp[_0x122498(0x1c2)]())console['log'](_0x1cfdf5);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x1ad)]=function(){const _0x2d768c=_0x2a5a15,_0x5c6c23=VisuMZ[_0x2d768c(0x1f1)][_0x2d768c(0x1f6)],_0x173e8a=_0x2d768c(0x1ff);for(const _0x1d6131 of VisuMZ[_0x2d768c(0x1f1)][_0x2d768c(0x1a6)]){const _0xea1915=_0x173e8a[_0x2d768c(0x22e)](_0x1d6131);if(!_0x5c6c23[_0xea1915])continue;if(!_0x5c6c23[_0xea1915]['ShowButton'])continue;const _0x50aec2=new Sprite_ButtonCommonEvent(_0x1d6131);this[_0x2d768c(0x190)](_0x50aec2),this['_currentKey']=_0xea1915;const _0xcf3da8=_0x50aec2['settings']()[_0x2d768c(0x2ac)][_0x2d768c(0x239)](this)||new Point(0x0,0x0);_0x50aec2['x']=_0xcf3da8['x'],_0x50aec2['y']=_0xcf3da8['y'];}},Sprite_ButtonCommonEventsContainer['prototype']['isAnyButtonPressed']=function(){const _0x238d1c=_0x2a5a15;return this[_0x238d1c(0x301)]['some'](_0x253558=>_0x253558[_0x238d1c(0x19e)]());},Sprite_ButtonCommonEventsContainer[_0x2a5a15(0x298)][_0x2a5a15(0x1aa)]=function(_0x4499b5){const _0x5683f6=_0x2a5a15,_0x4204d9=this[_0x5683f6(0x301)][_0x5683f6(0x2c5)](_0x417b21=>_0x417b21&&_0x417b21[_0x5683f6(0x2a6)]===_0x4499b5);for(const _0x5939f2 of _0x4204d9){if(!_0x5939f2)continue;_0x5939f2[_0x5683f6(0x21b)]();}};function Sprite_ButtonCommonEvent(){const _0x1e246d=_0x2a5a15;this[_0x1e246d(0x1fb)](...arguments);}Sprite_ButtonCommonEvent['prototype']=Object[_0x2a5a15(0x2d4)](Sprite_Clickable['prototype']),Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x1a7)]=Sprite_ButtonCommonEvent,Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1fb)]=function(_0x29e417){const _0x69896a=_0x2a5a15;this[_0x69896a(0x2a6)]=_0x29e417,Sprite_Clickable[_0x69896a(0x298)][_0x69896a(0x1fb)][_0x69896a(0x239)](this),this[_0x69896a(0x261)](),this[_0x69896a(0x2bc)]=this[_0x69896a(0x27c)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['settings']=function(){const _0x300fbf=_0x2a5a15,_0x59c0cb='KeyCode%1'[_0x300fbf(0x22e)](this[_0x300fbf(0x2a6)]);return VisuMZ[_0x300fbf(0x1f1)]['Settings'][_0x59c0cb]||{};},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x261)]=function(){const _0x496113=_0x2a5a15,_0x29bd4a=VisuMZ[_0x496113(0x1f1)][_0x496113(0x1f6)][_0x496113(0x192)],_0x210d64=this['settings'](),_0x48c3e0=_0x210d64['CustomWidth']||_0x29bd4a['ButtonWidth'],_0x5d7af7=_0x210d64[_0x496113(0x20b)]||_0x29bd4a[_0x496113(0x281)];this['bitmap']=new Bitmap(_0x48c3e0,_0x5d7af7),this[_0x496113(0x29e)]=this[_0x496113(0x1c3)](),this[_0x496113(0x21c)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['pictureBitmap']=function(){return ImageManager['_buttomCommonEventImage'];},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x1d0)]=function(){const _0x1a89f5=_0x2a5a15;return $gameSystem[_0x1a89f5(0x1af)](this[_0x1a89f5(0x2a6)]);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1ce)]=function(){const _0x37da25=_0x2a5a15;if(!this[_0x37da25(0x2c3)]())return'';return this['settings']()[_0x37da25(0x312)];},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x1c3)]=function(){const _0x296318=_0x2a5a15;if(!this[_0x296318(0x1d0)]())return 0x0;const _0x4b0eaa=$gameSystem['getButtonCommonEventIcon'](this[_0x296318(0x2a6)]);if(_0x4b0eaa!==0x0)return _0x4b0eaa;const _0x15ca92=VisuMZ['ButtonCommonEvents'][_0x296318(0x1f6)][_0x296318(0x192)],_0x1d29e9=_0x15ca92[_0x296318(0x2fd)],_0x83f6b9=Math[_0x296318(0x213)](_0x1d29e9[_0x296318(0x28b)],0x1);let _0x5a6edb=_0x1d29e9[this['_key']%_0x83f6b9]||0x0;return _0x5a6edb;},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x21c)]=function(){const _0x15c100=_0x2a5a15;this[_0x15c100(0x282)][_0x15c100(0x235)](),this[_0x15c100(0x240)](),this[_0x15c100(0x19d)](),this[_0x15c100(0x18c)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x240)]=function(){const _0x20cd7c=_0x2a5a15;let _0x44ee95=0xff;if(this[_0x20cd7c(0x1b6)]()){if(!this[_0x20cd7c(0x227)]()){const _0x5571ff=VisuMZ['ButtonCommonEvents'][_0x20cd7c(0x1f6)]['Cost']||{};_0x44ee95=_0x5571ff['DisabledOpacity']??0xa0;}}this[_0x20cd7c(0x282)][_0x20cd7c(0x1a5)]=_0x44ee95;},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x19d)]=function(){const _0x13a0f8=_0x2a5a15,_0x50a1db=VisuMZ[_0x13a0f8(0x1f1)][_0x13a0f8(0x1f6)][_0x13a0f8(0x192)];_0x50a1db[_0x13a0f8(0x1ae)][_0x13a0f8(0x239)](this);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['drawDisplayType']=function(){const _0x25d5b7=_0x2a5a15,_0x19d2af=$gameSystem[_0x25d5b7(0x2dd)](this[_0x25d5b7(0x2a6)]);if(!_0x19d2af)return;const _0x2266b5=_0x19d2af['id']||0x0,_0x534601=_0x19d2af['type'];let _0x5e2da2=VisuMZ['ButtonCommonEvents']['GetObject'](_0x534601,_0x2266b5);if(!_0x5e2da2)return;if(DataManager['isSkill'](_0x5e2da2)&&Imported[_0x25d5b7(0x29a)])this[_0x25d5b7(0x305)](_0x5e2da2,_0x19d2af[_0x25d5b7(0x1d2)]);else!DataManager[_0x25d5b7(0x257)](_0x5e2da2)&&Imported[_0x25d5b7(0x319)]&&this[_0x25d5b7(0x1c8)](_0x5e2da2);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x305)]=function(_0xebd834,_0x28b200){const _0x1415f8=_0x2a5a15;if(!_0xebd834)return;if(!Imported[_0x1415f8(0x29a)])return;const _0x2dfaa9=$gameActors['actor'](_0x28b200);if(!_0x2dfaa9)return;const _0xe433a4=this[_0x1415f8(0x282)][_0x1415f8(0x26c)],_0x2a2f0d=this['bitmap'][_0x1415f8(0x224)],_0x492a3d=$gameSystem['windowPadding'](),_0x4c7c1f=new Rectangle(0x0,0x0,_0xe433a4+_0x492a3d*0x2,_0x2a2f0d+_0x492a3d*0x2),_0xbb17c1=new Window_Base(_0x4c7c1f);if(!_0xbb17c1[_0x1415f8(0x2ef)])return;let _0x8f96d9=_0xbb17c1[_0x1415f8(0x2ef)](_0x2dfaa9,_0xebd834);if(!_0x8f96d9)return;const _0x1d3c68=_0xbb17c1['textSizeEx'](_0x8f96d9),_0x1cc071=Math[_0x1415f8(0x26d)]((_0xe433a4-_0x1d3c68['width'])/0x2),_0xa6efa3=_0x2a2f0d-_0x1d3c68[_0x1415f8(0x224)];_0xbb17c1['drawTextEx'](_0x8f96d9,_0x1cc071,_0xa6efa3);const _0x21c39d=VisuMZ[_0x1415f8(0x1f1)][_0x1415f8(0x1f6)]['Cost']||{};let _0x2a24e9=_0x21c39d[_0x1415f8(0x1b1)]||0x0,_0x4e5c62=_0x21c39d[_0x1415f8(0x31d)]||0x0;this[_0x1415f8(0x282)][_0x1415f8(0x295)](_0xbb17c1['contents'],0x0,0x0,_0xe433a4,_0x2a2f0d,_0x2a24e9,_0x4e5c62);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1c8)]=function(_0x467baa){const _0x296761=_0x2a5a15;if(!_0x467baa)return;if(!Imported[_0x296761(0x319)])return;const _0x308080=this[_0x296761(0x282)][_0x296761(0x26c)],_0x2418af=this['bitmap']['height'],_0x4c5d49=VisuMZ[_0x296761(0x2a5)][_0x296761(0x1f6)][_0x296761(0x2d9)],_0x284dc0=_0x4c5d49['ItemQuantityFmt'],_0x170f29=_0x284dc0[_0x296761(0x22e)]($gameParty[_0x296761(0x2a7)](_0x467baa)),_0x28eabf=VisuMZ[_0x296761(0x1f1)][_0x296761(0x1f6)]['Cost']||{};let _0x43c50d=_0x28eabf[_0x296761(0x1bd)]||0x0,_0x449d58=(_0x28eabf[_0x296761(0x25b)]||0x0)+Math[_0x296761(0x26d)](_0x2418af/0x2);this[_0x296761(0x282)][_0x296761(0x23b)]=$gameSystem[_0x296761(0x2c8)](),this[_0x296761(0x282)]['fontSize']=_0x4c5d49[_0x296761(0x311)],this[_0x296761(0x282)][_0x296761(0x1ec)](_0x170f29,_0x43c50d,_0x449d58,_0x308080,Math[_0x296761(0x26d)](_0x2418af/0x2),_0x296761(0x234)),this[_0x296761(0x282)][_0x296761(0x23b)]=$gameSystem[_0x296761(0x253)](),this[_0x296761(0x282)][_0x296761(0x1bf)]=$gameSystem[_0x296761(0x1a2)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x31b)]=function(){const _0x2971a9=_0x2a5a15;if(this[_0x2971a9(0x2bc)]<0xff)return![];if(this[_0x2971a9(0x1d0)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['requiresCost']=function(){const _0x3467b5=_0x2a5a15;return $gameSystem[_0x3467b5(0x217)](this[_0x3467b5(0x2a6)]);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x227)]=function(){const _0x406f2d=_0x2a5a15;return $gameSystem[_0x406f2d(0x22c)](this[_0x406f2d(0x2a6)]);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x209)]=function(){const _0x139d52=_0x2a5a15;return $gameSystem[_0x139d52(0x1c1)](this[_0x139d52(0x2a6)]);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2ca)]=function(){const _0x360903=_0x2a5a15;Sprite_Clickable[_0x360903(0x298)]['onMouseEnter'][_0x360903(0x239)](this),this['onColorTone']();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['onMouseExit']=function(){const _0x1be66b=_0x2a5a15;Sprite_Clickable[_0x1be66b(0x298)][_0x1be66b(0x19c)][_0x1be66b(0x239)](this),this['clearColorTone']();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2b9)]=function(){const _0x59b31a=_0x2a5a15;Sprite_Clickable[_0x59b31a(0x298)]['onPress'][_0x59b31a(0x239)](this),this[_0x59b31a(0x2b2)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1ca)]=function(){const _0x3ede04=_0x2a5a15;Sprite_Clickable[_0x3ede04(0x298)][_0x3ede04(0x1ca)][_0x3ede04(0x239)](this),this['canPayCost']()&&(this[_0x3ede04(0x209)](),this[_0x3ede04(0x215)]()),TouchInput[_0x3ede04(0x235)](),this[_0x3ede04(0x19c)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['onColorTone']=function(){const _0x3f142b=_0x2a5a15,_0x43fe65=VisuMZ[_0x3f142b(0x1f1)]['Settings']['General'];_0x43fe65[_0x3f142b(0x286)]&&this['setColorTone'](_0x43fe65[_0x3f142b(0x1cf)]);},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x2a2)]=function(){const _0x2a563d=_0x2a5a15;this[_0x2a563d(0x199)]([0x0,0x0,0x0,0x0]);},Sprite_ButtonCommonEvent['prototype']['flashColorTone']=function(){const _0x48a9be=_0x2a5a15;this['onColorTone'](),setTimeout(this[_0x48a9be(0x2a2)][_0x48a9be(0x1c0)](this),0x64);},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x215)]=function(){const _0xa117e9=_0x2a5a15;if(!SceneManager[_0xa117e9(0x1b2)][_0xa117e9(0x30d)]())return;if($gameMap&&$gameMap[_0xa117e9(0x197)]())return;const _0x228cc0=this[_0xa117e9(0x1d0)]();$gameTemp[_0xa117e9(0x1b4)](_0x228cc0),this[_0xa117e9(0x19c)](),this[_0xa117e9(0x21b)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x19e)]=function(){const _0x42e504=_0x2a5a15;if(!this[_0x42e504(0x2b6)]())return![];if(this[_0x42e504(0x1d0)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x196)]=function(){const _0x332db4=_0x2a5a15;Sprite_Clickable[_0x332db4(0x298)][_0x332db4(0x196)][_0x332db4(0x239)](this),this[_0x332db4(0x267)]()&&(this['updateRefreshCache'](),this[_0x332db4(0x21c)]()),this[_0x332db4(0x1a0)](),this[_0x332db4(0x18e)]();},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x267)]=function(){const _0x13d79a=_0x2a5a15,_0x2ae506=$gameSystem['getButtonCommonEventDisplayData'](this[_0x13d79a(0x2a6)]);if(_0x2ae506){const _0x2957c8=_0x2ae506['id']||0x0,_0x392f7b=_0x2ae506['type']||'';if([_0x13d79a(0x308),_0x13d79a(0x21a),_0x13d79a(0x1dd)][_0x13d79a(0x324)](_0x2ae506['type'])){const _0x3b4b16=VisuMZ[_0x13d79a(0x1f1)]['GetObject'](_0x392f7b,_0x2957c8);if(_0x3b4b16){const _0x3d3117=$gameParty[_0x13d79a(0x2a7)](_0x3b4b16);if(this['_lastDisplayQuantity']!==_0x3d3117)return!![];}}if(this[_0x13d79a(0x1b6)]()){if(this['_lastDisplayCanPay']!==this[_0x13d79a(0x227)]())return!![];}}return![];},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x280)]=function(){const _0x28cf09=_0x2a5a15,_0x15d925=$gameSystem[_0x28cf09(0x2dd)](this[_0x28cf09(0x2a6)]);if(!_0x15d925)return;const _0x11c6be=_0x15d925['id']||0x0,_0x6d0409=_0x15d925[_0x28cf09(0x256)]||'';if([_0x28cf09(0x308),'weapon',_0x28cf09(0x1dd)][_0x28cf09(0x324)](_0x15d925[_0x28cf09(0x256)])){const _0x389a42=VisuMZ[_0x28cf09(0x1f1)]['GetObject'](_0x6d0409,_0x11c6be);if(_0x389a42){const _0x106d1d=$gameParty[_0x28cf09(0x2a7)](_0x389a42);this[_0x28cf09(0x2cd)]=_0x106d1d;}}this[_0x28cf09(0x1b6)]()&&(this[_0x28cf09(0x2c2)]=this['canPayCost']());},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1a0)]=function(){const _0x2f9aa7=_0x2a5a15,_0x584148=this['targetOpacity']();if(this['opacity']>_0x584148)this['opacity']-=0x10;else this[_0x2f9aa7(0x2bc)]<_0x584148&&(this[_0x2f9aa7(0x2bc)]+=0x10);},Sprite_ButtonCommonEvent[_0x2a5a15(0x298)]['targetOpacity']=function(){const _0x1b22d8=_0x2a5a15;if($gameMessage&&$gameMessage['isBusy']())return 0x0;if(!$gameSystem[_0x1b22d8(0x24c)]())return 0x0;if(this['settings']()[_0x1b22d8(0x245)]){const _0x542f28=this[_0x1b22d8(0x1d0)]();if(!$dataCommonEvents[_0x542f28])return 0x0;}return 0xff;},Sprite_ButtonCommonEvent['prototype'][_0x2a5a15(0x18e)]=function(){const _0x33ad5b=_0x2a5a15;if(this[_0x33ad5b(0x29e)]===this['buttonIcon']())return;this['_icon']=this[_0x33ad5b(0x1c3)](),this[_0x33ad5b(0x21c)]();},VisuMZ['ButtonCommonEvents'][_0x2a5a15(0x2e0)]=function(){const _0x40ce94=_0x2a5a15,_0x3bfd2f=this[_0x40ce94(0x26c)],_0x2f9ec3=this[_0x40ce94(0x224)],_0x351d66=ColorManager[_0x40ce94(0x2b1)](),_0x37b9fa=ColorManager[_0x40ce94(0x1d8)]();this[_0x40ce94(0x282)]['gradientFillRect'](0x1,0x1,_0x3bfd2f-0x2,_0x2f9ec3-0x2,_0x351d66,_0x37b9fa,!![]),this[_0x40ce94(0x282)]['strokeRect'](0x1,0x1,_0x3bfd2f-0x2,_0x2f9ec3-0x2,_0x351d66);if(this[_0x40ce94(0x1e8)]()){const _0x36f8b0=this[_0x40ce94(0x1e8)](),_0x2dc1dd=_0x36f8b0[_0x40ce94(0x26c)],_0x1cb5d3=_0x36f8b0[_0x40ce94(0x224)];this['bitmap'][_0x40ce94(0x295)](_0x36f8b0,0x0,0x0,_0x2dc1dd,_0x1cb5d3,0x0,0x0,_0x3bfd2f,_0x2f9ec3);}const _0x13b61f=this[_0x40ce94(0x1c3)](),_0x44c9d5=ImageManager[_0x40ce94(0x1eb)](_0x40ce94(0x2f6)),_0x15300f=ImageManager[_0x40ce94(0x23e)],_0x5ef817=ImageManager['iconHeight'],_0xe3304=_0x13b61f%0x10*_0x15300f,_0x4ec62e=Math[_0x40ce94(0x26d)](_0x13b61f/0x10)*_0x5ef817,_0xa1b7b5=Math[_0x40ce94(0x26d)](this[_0x40ce94(0x26c)]/_0x15300f)*_0x15300f,_0x17af92=Math[_0x40ce94(0x26d)](this[_0x40ce94(0x224)]/_0x5ef817)*_0x5ef817,_0x4e3f18=Math[_0x40ce94(0x26d)]((this['width']-_0xa1b7b5)/0x2),_0x516778=Math[_0x40ce94(0x26d)]((this[_0x40ce94(0x224)]-_0x17af92)/0x2);this[_0x40ce94(0x282)][_0x40ce94(0x30f)][_0x40ce94(0x2eb)]=![],this['bitmap'][_0x40ce94(0x295)](_0x44c9d5,_0xe3304,_0x4ec62e,_0x15300f,_0x5ef817,_0x4e3f18,_0x516778,_0xa1b7b5,_0x17af92),this[_0x40ce94(0x282)][_0x40ce94(0x30f)][_0x40ce94(0x2eb)]=!![];const _0x103115=this['buttonLabel']();this[_0x40ce94(0x282)][_0x40ce94(0x23b)]=$gameSystem[_0x40ce94(0x253)](),this[_0x40ce94(0x282)]['fontSize']=$gameSystem[_0x40ce94(0x1a2)](),this[_0x40ce94(0x282)]['drawText'](_0x103115,0x0,0x0,_0x3bfd2f,this[_0x40ce94(0x282)][_0x40ce94(0x1bf)]+0x4,'center');},VisuMZ[_0x2a5a15(0x1f1)]['CanAssignButtonCommonEvent']=function(_0x23b42d){const _0x506304=_0x2a5a15;if(!_0x23b42d)return![];if(![_0x506304(0x278),'Scene_Skill'][_0x506304(0x324)](SceneManager[_0x506304(0x1b2)][_0x506304(0x1a7)]['name']))return![];const _0x16a1bd=VisuMZ['ButtonCommonEvents']['RegExp'],_0x507b01=_0x23b42d[_0x506304(0x2fc)];return _0x507b01[_0x506304(0x284)](_0x16a1bd[_0x506304(0x2aa)])&&_0x507b01['match'](_0x16a1bd[_0x506304(0x2c4)]);},TextManager[_0x2a5a15(0x1c4)]=VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x1f6)][_0x2a5a15(0x2db)][_0x2a5a15(0x321)],Scene_ItemBase[_0x2a5a15(0x298)]['createAssignButtonCommonEventsWindow']=function(){const _0x3f4142=_0x2a5a15,_0x3f0359=VisuMZ[_0x3f4142(0x1f1)][_0x3f4142(0x248)],_0x26dcd3=this['item']()[_0x3f4142(0x2fc)];_0x26dcd3[_0x3f4142(0x284)](_0x3f0359[_0x3f4142(0x2c4)]);const _0xab65b7=String(RegExp['$1'])[_0x3f4142(0x290)](',')[_0x3f4142(0x317)](_0x115f69=>String(_0x115f69)[_0x3f4142(0x21f)]()[_0x3f4142(0x229)]())[_0x3f4142(0x2c5)](_0x3f3410=>TextManager[_0x3f4142(0x2f8)][_0x3f4142(0x324)](_0x3f3410))[_0x3f4142(0x2c5)](_0x1d981e=>VisuMZ[_0x3f4142(0x1f1)][_0x3f4142(0x1a6)][_0x3f4142(0x324)](TextManager['stringKeyMap'][_0x3f4142(0x273)](_0x1d981e)))[_0x3f4142(0x2c5)](_0x2a137f=>!Input['isButtonCommonEventForbidden'](TextManager[_0x3f4142(0x2f8)][_0x3f4142(0x273)](_0x2a137f)));_0x26dcd3[_0x3f4142(0x284)](_0x3f0359[_0x3f4142(0x2aa)]);const _0x53f82d=eval(RegExp['$1']),_0x389bb5=this['assignButtonCommonEventsWindowRect'](_0xab65b7),_0x51bcbd=new Window_AssignButtonCommonEvent(_0x389bb5);_0x51bcbd[_0x3f4142(0x2c7)](_0x53f82d,_0xab65b7),this[_0x3f4142(0x190)](_0x51bcbd),this[_0x3f4142(0x223)]=_0x51bcbd,_0x51bcbd['setHandler']('assign',this['onButtonAssistAssign'][_0x3f4142(0x1c0)](this)),_0x51bcbd['setHandler'](_0x3f4142(0x2a4),this['onButtonAssistCancel']['bind'](this));},Scene_ItemBase[_0x2a5a15(0x298)][_0x2a5a15(0x1d9)]=function(_0x26fa38){const _0xc665f6=_0x2a5a15,_0x2e32f7=VisuMZ[_0xc665f6(0x1f1)][_0xc665f6(0x1f6)][_0xc665f6(0x2db)];if(_0x2e32f7&&_0x2e32f7[_0xc665f6(0x302)])return _0x2e32f7[_0xc665f6(0x302)][_0xc665f6(0x239)](this,_0x26fa38);const _0x31611b=Window_Base[_0xc665f6(0x298)][_0xc665f6(0x26a)]()*0x2+0x8;let _0x255d2b=$gameSystem[_0xc665f6(0x233)]()*0x2+_0x26fa38[_0xc665f6(0x28b)]*_0x31611b;_0x255d2b=_0x255d2b[_0xc665f6(0x1dc)](Graphics[_0xc665f6(0x18d)]/0x3,Graphics[_0xc665f6(0x18d)]);let _0x27a19a=this[_0xc665f6(0x2c9)](0x3,!![]),_0x12e2c1=Math['round']((Graphics[_0xc665f6(0x18d)]-_0x255d2b)/0x2),_0x3c779f=Math['round']((Graphics[_0xc665f6(0x2fa)]-_0x27a19a)/0x2);return new Rectangle(_0x12e2c1,_0x3c779f,_0x255d2b,_0x27a19a);},Scene_ItemBase[_0x2a5a15(0x298)][_0x2a5a15(0x1fc)]=function(){const _0x2f8896=_0x2a5a15,_0x38c1a3=this[_0x2f8896(0x223)][_0x2f8896(0x23d)](),_0x495f2f=this[_0x2f8896(0x223)][_0x2f8896(0x320)],_0x25025f=this['item']()[_0x2f8896(0x31f)];$gameSystem[_0x2f8896(0x1be)](_0x38c1a3,this[_0x2f8896(0x308)]());const _0x3b7504=$gameSystem[_0x2f8896(0x2dd)](_0x38c1a3);_0x3b7504&&_0x3b7504[_0x2f8896(0x256)]?$gameSystem[_0x2f8896(0x236)](_0x495f2f,_0x3b7504):$gameSystem[_0x2f8896(0x236)](_0x495f2f),$gameSystem['setButtonCommonEvent'](_0x38c1a3,_0x495f2f),$gameSystem[_0x2f8896(0x29d)](_0x38c1a3,_0x25025f),this[_0x2f8896(0x223)][_0x2f8896(0x21c)](),setTimeout(this[_0x2f8896(0x262)][_0x2f8896(0x1c0)](this),0x1f4);},Scene_ItemBase[_0x2a5a15(0x298)]['onButtonAssistCancel']=function(){const _0x47731b=_0x2a5a15;this['_windowLayer'][_0x47731b(0x266)](this[_0x47731b(0x223)]),this[_0x47731b(0x223)]['destroy'](),this[_0x47731b(0x223)]=undefined,this['_itemWindow'][_0x47731b(0x225)](),this['_itemWindow'][_0x47731b(0x2d1)]();},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x1f2)]=Scene_Item['prototype'][_0x2a5a15(0x254)],Scene_Item['prototype'][_0x2a5a15(0x254)]=function(){const _0x55c5f1=_0x2a5a15;VisuMZ[_0x55c5f1(0x1f1)][_0x55c5f1(0x313)](this[_0x55c5f1(0x308)]())?this[_0x55c5f1(0x270)]():VisuMZ[_0x55c5f1(0x1f1)]['Scene_Item_onItemOk']['call'](this);},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x2a3)]=Scene_Skill['prototype'][_0x2a5a15(0x254)],Scene_Skill[_0x2a5a15(0x298)][_0x2a5a15(0x254)]=function(){const _0x459159=_0x2a5a15;VisuMZ[_0x459159(0x1f1)]['CanAssignButtonCommonEvent'](this[_0x459159(0x308)]())?this['createAssignButtonCommonEventsWindow']():VisuMZ[_0x459159(0x1f1)]['Scene_Skill_onItemOk']['call'](this);},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x322)]=Window_ItemList[_0x2a5a15(0x298)]['isEnabled'],Window_ItemList[_0x2a5a15(0x298)]['isEnabled']=function(_0x2d8c49){const _0x1c0cce=_0x2a5a15;return VisuMZ[_0x1c0cce(0x1f1)][_0x1c0cce(0x313)](_0x2d8c49)?!![]:VisuMZ[_0x1c0cce(0x1f1)][_0x1c0cce(0x322)][_0x1c0cce(0x239)](this,_0x2d8c49);},VisuMZ['ButtonCommonEvents'][_0x2a5a15(0x1cc)]=Window_SkillList['prototype'][_0x2a5a15(0x1d7)],Window_SkillList[_0x2a5a15(0x298)]['isEnabled']=function(_0x26d4b4){const _0x42c211=_0x2a5a15;return VisuMZ['ButtonCommonEvents']['CanAssignButtonCommonEvent'](_0x26d4b4)?!![]:VisuMZ[_0x42c211(0x1f1)]['Window_SkillList_isEnabled'][_0x42c211(0x239)](this,_0x26d4b4);};function Window_AssignButtonCommonEvent(){const _0x553675=_0x2a5a15;this[_0x553675(0x1fb)](...arguments);}Window_AssignButtonCommonEvent[_0x2a5a15(0x298)]=Object[_0x2a5a15(0x2d4)](Window_HorzCommand[_0x2a5a15(0x298)]),Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1a7)]=Window_AssignButtonCommonEvent,Window_AssignButtonCommonEvent[_0x2a5a15(0x1b5)]=VisuMZ[_0x2a5a15(0x1f1)]['Settings'][_0x2a5a15(0x2db)]['AssignWindow_KeyAlign'],Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x1fb)]=function(_0x1962e8){const _0x50e3a5=_0x2a5a15;this['_commonEventID']=0x0,this[_0x50e3a5(0x255)]=[],Window_HorzCommand[_0x50e3a5(0x298)][_0x50e3a5(0x1fb)][_0x50e3a5(0x239)](this,_0x1962e8);},Window_AssignButtonCommonEvent['prototype'][_0x2a5a15(0x296)]=function(){const _0xf51e9d=_0x2a5a15;return this[_0xf51e9d(0x255)][_0xf51e9d(0x28b)]||0x1;},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2a1)]=function(){return 0x0;},Window_AssignButtonCommonEvent['prototype'][_0x2a5a15(0x310)]=function(){const _0x34a4c3=_0x2a5a15;return Window_Scrollable['prototype']['itemHeight'][_0x34a4c3(0x239)](this)*0x2+0x8;},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2c7)]=function(_0x296442,_0x36e956){const _0x1d3560=_0x2a5a15;this[_0x1d3560(0x320)]=_0x296442,this['_slots']=_0x36e956,this['refresh']();let _0x4efc7b=0x0;for(const _0x4d78b2 of this['_slots']){const _0x374083=TextManager[_0x1d3560(0x2f8)]['indexOf'](_0x4d78b2);$gameSystem[_0x1d3560(0x1af)](_0x374083)===this[_0x1d3560(0x320)]&&(_0x4efc7b=this['_slots'][_0x1d3560(0x273)](_0x4d78b2));}this[_0x1d3560(0x2e6)](_0x4efc7b),this[_0x1d3560(0x1b0)]();},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2ee)]=function(){const _0x4e36ba=_0x2a5a15;if(!this['_slots'])return;for(const _0x1c8474 of this[_0x4e36ba(0x255)]){const _0x71a6d0=TextManager[_0x4e36ba(0x2f8)]['indexOf'](_0x1c8474),_0x20a4d3=VisuMZ[_0x4e36ba(0x1f1)][_0x4e36ba(0x1f6)][_0x4e36ba(0x1ff)[_0x4e36ba(0x22e)](_0x71a6d0)],_0x598e5f=_0x20a4d3[_0x4e36ba(0x312)];this['addCommand'](_0x598e5f,_0x4e36ba(0x307),!![],_0x71a6d0);}},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x247)]=function(_0x53aaeb){const _0x381f3e=_0x2a5a15,_0x16b904=Window_HorzCommand['prototype'][_0x381f3e(0x247)][_0x381f3e(0x239)](this,_0x53aaeb);return _0x16b904['y']+=this[_0x381f3e(0x26a)]()+0x8-this[_0x381f3e(0x2be)]()/0x2-this[_0x381f3e(0x2cb)](),_0x16b904;},Window_AssignButtonCommonEvent['prototype'][_0x2a5a15(0x21c)]=function(){const _0x41126e=_0x2a5a15;Window_HorzCommand[_0x41126e(0x298)][_0x41126e(0x21c)]['call'](this);if(!this[_0x41126e(0x255)])return;this[_0x41126e(0x2e1)]();},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x2e1)]=function(){const _0x28fe27=_0x2a5a15;this[_0x28fe27(0x20d)](),this['changePaintOpacity'](!![]);const _0x42e812=TextManager[_0x28fe27(0x1c4)];this[_0x28fe27(0x1ec)](_0x42e812,0x0,0x0,this[_0x28fe27(0x22d)],'center');},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x230)]=function(_0x4cc040){const _0x586b6f=_0x2a5a15,_0x490150=this[_0x586b6f(0x264)](_0x4cc040),_0x490929=this[_0x586b6f(0x1da)][_0x4cc040]['ext'],_0x467973=$gameSystem[_0x586b6f(0x1d6)](_0x490929),_0xa322aa=_0x490150['x']+Math[_0x586b6f(0x269)]((_0x490150['width']-ImageManager[_0x586b6f(0x23e)])/0x2),_0x53c1c5=_0x490150['y']+Math[_0x586b6f(0x269)]((_0x490150[_0x586b6f(0x224)]-ImageManager[_0x586b6f(0x205)]/0x2)/0x2);this[_0x586b6f(0x26b)](_0x467973,_0xa322aa,_0x53c1c5),this[_0x586b6f(0x20d)](),this[_0x586b6f(0x25e)]['fontFace']=$gameSystem[_0x586b6f(0x253)](),this[_0x586b6f(0x25e)][_0x586b6f(0x1bf)]=$gameSystem['mainFontSize'](),this[_0x586b6f(0x2fe)](this[_0x586b6f(0x297)](_0x4cc040));const _0x270e2a=Window_AssignButtonCommonEvent[_0x586b6f(0x1b5)];this['drawText'](this[_0x586b6f(0x203)](_0x4cc040),_0x490150['x'],_0x490150['y'],_0x490150[_0x586b6f(0x26c)],_0x270e2a);},Window_AssignButtonCommonEvent[_0x2a5a15(0x298)][_0x2a5a15(0x22f)]=function(){const _0x8beb07=_0x2a5a15;SoundManager[_0x8beb07(0x2ba)]();},VisuMZ[_0x2a5a15(0x1f1)][_0x2a5a15(0x1a4)]=function(_0x3a2676,_0x2b13e1){const _0x4f18c9=_0x2a5a15;if(_0x3a2676===_0x4f18c9(0x2dc))return $dataSkills[_0x2b13e1];if(_0x3a2676===_0x4f18c9(0x308))return $dataItems[_0x2b13e1];if(_0x3a2676===_0x4f18c9(0x21a))return $dataWeapons[_0x2b13e1];if(_0x3a2676===_0x4f18c9(0x1dd))return $dataArmors[_0x2b13e1];return null;};Imported[_0x2a5a15(0x300)]&&Scene_Options[_0x2a5a15(0x29f)]&&(VisuMZ['ButtonCommonEvents'][_0x2a5a15(0x1cb)]=Scene_RebindKeyboard['prototype'][_0x2a5a15(0x1e6)],Scene_RebindKeyboard[_0x2a5a15(0x298)]['isForbiddenKeycode']=function(_0x29bf61){const _0xc164c0=_0x2a5a15;if(_0x29bf61>=0x30&&_0x29bf61<=0x39)return!![];return VisuMZ[_0xc164c0(0x1f1)]['Scene_RebindKeyboard_isForbiddenKeycode'][_0xc164c0(0x239)](this,_0x29bf61);},VisuMZ['ButtonCommonEvents']['Input_isButtonCommonEventForbidden_Rebind']=Input[_0x2a5a15(0x323)],Input[_0x2a5a15(0x323)]=function(_0xaa75f5){const _0x141467=_0x2a5a15;if(_0xaa75f5>=0x41&&_0xaa75f5<=0x5a)return!![];if(_0xaa75f5>=0xba&&_0xaa75f5<=0xc0)return!![];if(_0xaa75f5>=0xdb&&_0xaa75f5<=0xde)return!![];return VisuMZ[_0x141467(0x1f1)]['Input_isButtonCommonEventForbidden_Rebind'][_0x141467(0x239)](this,_0xaa75f5);});