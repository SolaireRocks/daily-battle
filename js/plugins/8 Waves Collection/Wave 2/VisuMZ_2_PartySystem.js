//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.32] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 * 
 * Temporary Parties
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 * 
 * === Temporary Parties Plugin Commands ===
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (Normal)
 * - Creates a temporary party with specific actors.
 * - Can't be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to be added to the temporary party until the
 *     temporary party is disbanded.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (JS)
 * - Creates a temporary party selected with JavaScript.
 * - Can't be used in battle.
 * 
 *   JS: Actor ID(s):
 *   - Use JavaScript to determine which actor(s) are added to the temporary
 *     party until disbanded.
 * 
 * ---
 * 
 * Temp: Disband Temporary Party
 * - Clears temporary party.
 * - Can't be used in battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon adding new members if the
 *    VisuStella Core Engine wasn't installed. Fix made by Arisu.
 * 
 * Version 1.31: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added to "Major Changes":
 * *** Temporary Parties
 * **** Temporary parties are very specific parties that will overwrite
 *      whatever the player has set as a party. These can include current party
 *      members or even actors that haven't joined. The temporary party cannot
 *      be changed nor can the positions of said party members can be changed.
 * **** When a temporary party is present, menu and battle commands involving
 *      changing party members will be disabled.
 * **** Once the temporary party is disbanded, the player's selected party will
 *      be available once again as well as all of the functions to change party
 *      members and their positions.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Temp: Create Temporary Party (Normal)
 * **** Creates a temporary party with specific actors.
 * *** Temp: Create Temporary Party (JS)
 * **** Creates a temporary party selected with JavaScript.
 * *** Temp: Disband Temporary Party
 * **** Clears temporary party.
 * 
 * Version 1.30: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with FTB, ETB, and PTB did not replace
 *    the newely added party member on the turn order timeline. Fix by Olivia.
 * 
 * Version 1.29: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with PTB did not register correctly.
 *    Fix made by Olivia.
 * 
 * Version 1.28: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Temp
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyNormal
 * @text Temp: Create Temporary Party (Normal)
 * @desc Creates a temporary party with specific actors.
 * Can't be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to be added to the temporary party
 * until the temporary party is disbanded.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyJS
 * @text Temp: Create Temporary Party (JS)
 * @desc Creates a temporary party selected with JavaScript.
 * Can't be used in battle.
 *
 * @arg ActorsJS:func
 * @text JS: Actor ID(s)
 * @type note
 * @desc Use JavaScript to determine which actor(s) are added to
 * the temporary party until disbanded.
 * @default "// Declare Actor ID's\nconst actorIDs = [];\n\n// Add Actor ID's\nactorIDs.push(1);\nactorIDs.push(2);\nactorIDs.push(3);\nactorIDs.push(4);\n\n// Return Actor IDs\nreturn actorIDs;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempDisbandTempParty
 * @text Temp: Disband Temporary Party
 * @desc Clears temporary party.
 * Can't be used in battle.
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x144c4d=_0x52ee;(function(_0x41e813,_0x2dbece){const _0x36ca61=_0x52ee,_0x2c977d=_0x41e813();while(!![]){try{const _0x30b6b3=-parseInt(_0x36ca61(0x20a))/0x1+parseInt(_0x36ca61(0x24a))/0x2+-parseInt(_0x36ca61(0x218))/0x3+parseInt(_0x36ca61(0x2bf))/0x4+-parseInt(_0x36ca61(0x304))/0x5*(parseInt(_0x36ca61(0x2b3))/0x6)+parseInt(_0x36ca61(0x34d))/0x7*(parseInt(_0x36ca61(0x2b1))/0x8)+parseInt(_0x36ca61(0x2dc))/0x9;if(_0x30b6b3===_0x2dbece)break;else _0x2c977d['push'](_0x2c977d['shift']());}catch(_0xb56a2f){_0x2c977d['push'](_0x2c977d['shift']());}}}(_0x566a,0xf058f));var label='PartySystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x144c4d(0x222)](function(_0x495d1f){const _0x35d58f=_0x144c4d;return _0x495d1f['status']&&_0x495d1f[_0x35d58f(0x185)][_0x35d58f(0x375)]('['+label+']');})[0x0];VisuMZ[label][_0x144c4d(0x2b5)]=VisuMZ[label][_0x144c4d(0x2b5)]||{},VisuMZ[_0x144c4d(0x32b)]=function(_0x3f2c68,_0x84d141){const _0x415a75=_0x144c4d;for(const _0x399118 in _0x84d141){if(_0x399118[_0x415a75(0x280)](/(.*):(.*)/i)){const _0xe7db1b=String(RegExp['$1']),_0x5dc752=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x2b7f05,_0x2b3d25,_0x57ef93;switch(_0x5dc752){case _0x415a75(0x328):_0x2b7f05=_0x84d141[_0x399118]!==''?Number(_0x84d141[_0x399118]):0x0;break;case _0x415a75(0x26e):_0x2b3d25=_0x84d141[_0x399118]!==''?JSON['parse'](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25[_0x415a75(0x347)](_0x39fe0b=>Number(_0x39fe0b));break;case _0x415a75(0x342):_0x2b7f05=_0x84d141[_0x399118]!==''?eval(_0x84d141[_0x399118]):null;break;case _0x415a75(0x360):_0x2b3d25=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25['map'](_0x294f35=>eval(_0x294f35));break;case'JSON':_0x2b7f05=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):'';break;case _0x415a75(0x323):_0x2b3d25=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25[_0x415a75(0x347)](_0x579058=>JSON[_0x415a75(0x193)](_0x579058));break;case _0x415a75(0x208):_0x2b7f05=_0x84d141[_0x399118]!==''?new Function(JSON['parse'](_0x84d141[_0x399118])):new Function('return\x200');break;case _0x415a75(0x1d0):_0x2b3d25=_0x84d141[_0x399118]!==''?JSON['parse'](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25[_0x415a75(0x347)](_0x1baca3=>new Function(JSON[_0x415a75(0x193)](_0x1baca3)));break;case'STR':_0x2b7f05=_0x84d141[_0x399118]!==''?String(_0x84d141[_0x399118]):'';break;case _0x415a75(0x2f2):_0x2b3d25=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25[_0x415a75(0x347)](_0x19c5ef=>String(_0x19c5ef));break;case _0x415a75(0x2c6):_0x57ef93=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):{},_0x2b7f05=VisuMZ[_0x415a75(0x32b)]({},_0x57ef93);break;case'ARRAYSTRUCT':_0x2b3d25=_0x84d141[_0x399118]!==''?JSON[_0x415a75(0x193)](_0x84d141[_0x399118]):[],_0x2b7f05=_0x2b3d25[_0x415a75(0x347)](_0x5d0eb2=>VisuMZ[_0x415a75(0x32b)]({},JSON[_0x415a75(0x193)](_0x5d0eb2)));break;default:continue;}_0x3f2c68[_0xe7db1b]=_0x2b7f05;}}return _0x3f2c68;},(_0x1adfc4=>{const _0x1f0eb8=_0x144c4d,_0x3a6bab=_0x1adfc4[_0x1f0eb8(0x312)];for(const _0x4387b9 of dependencies){if(!Imported[_0x4387b9]){alert(_0x1f0eb8(0x26a)['format'](_0x3a6bab,_0x4387b9)),SceneManager['exit']();break;}}const _0x19c29a=_0x1adfc4[_0x1f0eb8(0x185)];if(_0x19c29a[_0x1f0eb8(0x280)](/\[Version[ ](.*?)\]/i)){const _0x2a984e=Number(RegExp['$1']);_0x2a984e!==VisuMZ[label][_0x1f0eb8(0x1a5)]&&(alert(_0x1f0eb8(0x329)[_0x1f0eb8(0x195)](_0x3a6bab,_0x2a984e)),SceneManager['exit']());}if(_0x19c29a[_0x1f0eb8(0x280)](/\[Tier[ ](\d+)\]/i)){const _0x3b51f9=Number(RegExp['$1']);_0x3b51f9<tier?(alert(_0x1f0eb8(0x31f)[_0x1f0eb8(0x195)](_0x3a6bab,_0x3b51f9,tier)),SceneManager[_0x1f0eb8(0x2ab)]()):tier=Math[_0x1f0eb8(0x386)](_0x3b51f9,tier);}VisuMZ[_0x1f0eb8(0x32b)](VisuMZ[label][_0x1f0eb8(0x2b5)],_0x1adfc4['parameters']);})(pluginData),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x20c),_0x34080b=>{const _0x3c9c57=_0x144c4d;SceneManager[_0x3c9c57(0x1f1)](Scene_Party);}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x34b),_0x55ed02=>{const _0x4b9ac4=_0x144c4d;if($gameParty['inBattle']())return;VisuMZ[_0x4b9ac4(0x32b)](_0x55ed02,_0x55ed02);const _0x165e37=_0x55ed02['Value'];$gameParty[_0x4b9ac4(0x1c7)](_0x165e37);}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x1ee),_0xae1e79=>{const _0x4782f4=_0x144c4d;if(!SceneManager[_0x4782f4(0x325)]())return;VisuMZ[_0x4782f4(0x32b)](_0xae1e79,_0xae1e79);const _0x4c42c7=_0xae1e79[_0x4782f4(0x2cf)];for(const _0x33488e of _0x4c42c7){$gameParty[_0x4782f4(0x210)](_0x33488e);}$gamePlayer['refresh']();}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x2fa),_0x5a07a0=>{const _0x2cc73e=_0x144c4d;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x2cc73e(0x32b)](_0x5a07a0,_0x5a07a0);const _0x3bd5b6=_0x5a07a0[_0x2cc73e(0x2cf)];for(const _0x554a9f of _0x3bd5b6){if($gameParty[_0x2cc73e(0x183)]()[_0x2cc73e(0x255)]<=0x1)break;$gameParty[_0x2cc73e(0x2a0)](_0x554a9f);}$gamePlayer[_0x2cc73e(0x1fb)]();}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x2a8),_0x262aa6=>{const _0x1e6055=_0x144c4d;if(!SceneManager[_0x1e6055(0x325)]())return;if($gameParty['battleMembers']()['length']<=0x1)return;if(!$gameParty['_battleMembers'])return;if($gameParty['_battleMembers'][_0x1e6055(0x255)]<=0x0)return;VisuMZ[_0x1e6055(0x32b)](_0x262aa6,_0x262aa6);const _0x57820e=_0x262aa6[_0x1e6055(0x243)],_0x21feaf=$gameParty[_0x1e6055(0x268)][_0x57820e];$gameParty[_0x1e6055(0x2a0)](_0x21feaf),$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData['name'],'MoveRandomToActive',_0x598358=>{const _0x3b0762=_0x144c4d;if(!SceneManager['isSceneMap']())return;if($gameParty['battleMembers']()[_0x3b0762(0x255)]>=$gameParty[_0x3b0762(0x238)]())return;if($gameParty[_0x3b0762(0x206)]()[_0x3b0762(0x255)]<=0x0)return;const _0x35a0df=$gameParty[_0x3b0762(0x206)](),_0x371c4b=_0x35a0df[Math['floor'](Math[_0x3b0762(0x2f5)]()*_0x35a0df[_0x3b0762(0x255)])],_0x3f8feb=_0x371c4b['actorId']();$gameParty['addActorToBattleMembers'](_0x3f8feb),$gamePlayer['refresh']();}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x25d),_0xf3e297=>{const _0x1a9123=_0x144c4d;VisuMZ[_0x1a9123(0x32b)](_0xf3e297,_0xf3e297);const _0x3f38e4=_0xf3e297[_0x1a9123(0x2cf)]['map'](_0x1736a6=>$gameActors['actor'](_0x1736a6))[_0x1a9123(0x1a7)](null),_0x5a3da6=_0xf3e297[_0x1a9123(0x2d6)];for(const _0x2dcd76 of _0x3f38e4){if(!_0x2dcd76)continue;_0x2dcd76[_0x1a9123(0x256)](_0x5a3da6);}}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x2f4),_0x38908c=>{const _0x3fbb9e=_0x144c4d;VisuMZ[_0x3fbb9e(0x32b)](_0x38908c,_0x38908c);const _0x100c15=_0x38908c[_0x3fbb9e(0x2cf)][_0x3fbb9e(0x347)](_0x666281=>$gameActors[_0x3fbb9e(0x38a)](_0x666281))['remove'](null),_0x3b2dd4=_0x38908c['Require'];for(const _0x2b83af of _0x100c15){if(!_0x2b83af)continue;_0x2b83af[_0x3fbb9e(0x283)](_0x3b2dd4);}}),PluginManager['registerCommand'](pluginData[_0x144c4d(0x312)],_0x144c4d(0x2f0),_0x393b02=>{const _0x38f103=_0x144c4d;if($gameParty[_0x38f103(0x1e4)]())return;VisuMZ['ConvertParams'](_0x393b02,_0x393b02);const _0x3d75b1=_0x393b02[_0x38f103(0x2cf)]||[];if(_0x3d75b1[_0x38f103(0x255)]<=0x0)return;$gameParty[_0x38f103(0x18f)](_0x3d75b1);}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],'TempCreatePartyJS',_0x155e6f=>{const _0x28af89=_0x144c4d;if($gameParty[_0x28af89(0x1e4)]())return;VisuMZ[_0x28af89(0x32b)](_0x155e6f,_0x155e6f);let _0x5749eb=[];try{_0x5749eb=_0x155e6f[_0x28af89(0x20d)]()||[];}catch(_0x4464ea){console[_0x28af89(0x22a)](_0x28af89(0x35f)),console[_0x28af89(0x22a)](_0x4464ea);return;}if(_0x5749eb['length']<=0x0)return;$gameParty[_0x28af89(0x18f)](_0x5749eb);}),PluginManager[_0x144c4d(0x292)](pluginData[_0x144c4d(0x312)],_0x144c4d(0x205),_0x3c0d4f=>{const _0x51907d=_0x144c4d;if($gameParty[_0x51907d(0x1e4)]())return;VisuMZ['ConvertParams'](_0x3c0d4f,_0x3c0d4f),$gameParty[_0x51907d(0x27e)]();}),ImageManager[_0x144c4d(0x1ed)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x192)][_0x144c4d(0x291)],ImageManager[_0x144c4d(0x197)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['General'][_0x144c4d(0x281)],TextManager[_0x144c4d(0x24b)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)][_0x144c4d(0x371)],TextManager['reserveParty']=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab'][_0x144c4d(0x27d)],TextManager['statusParty']=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab'][_0x144c4d(0x2b0)],TextManager[_0x144c4d(0x18c)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab']['Empty'],TextManager[_0x144c4d(0x353)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)]['Remove'],TextManager[_0x144c4d(0x311)]=VisuMZ[_0x144c4d(0x284)]['Settings'][_0x144c4d(0x274)]['AssistSwapPosition'],TextManager[_0x144c4d(0x2ac)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab'][_0x144c4d(0x219)],TextManager[_0x144c4d(0x306)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)][_0x144c4d(0x204)],TextManager[_0x144c4d(0x23b)]=VisuMZ[_0x144c4d(0x284)]['Settings'][_0x144c4d(0x274)][_0x144c4d(0x1b0)],TextManager[_0x144c4d(0x25c)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)][_0x144c4d(0x349)],ColorManager[_0x144c4d(0x21a)]=function(_0x2df589){const _0x4a7a22=_0x144c4d;return _0x2df589=String(_0x2df589),_0x2df589[_0x4a7a22(0x280)](/#(.*)/i)?_0x4a7a22(0x34c)[_0x4a7a22(0x195)](String(RegExp['$1'])):this['textColor'](Number(_0x2df589));},SceneManager[_0x144c4d(0x184)]=function(){const _0x1de403=_0x144c4d;return this[_0x1de403(0x28b)]&&this[_0x1de403(0x28b)]['constructor']===Scene_Battle;},SceneManager['isSceneParty']=function(){const _0x2179a6=_0x144c4d;return this[_0x2179a6(0x28b)]&&this[_0x2179a6(0x28b)][_0x2179a6(0x1e2)]===Scene_Party;},SceneManager['isSceneMap']=function(){const _0x415d56=_0x144c4d;return this[_0x415d56(0x28b)]&&this[_0x415d56(0x28b)]['constructor']===Scene_Map;},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2e9)]=BattleManager['setup'],BattleManager['setup']=function(_0x2ab567,_0x2f5304,_0x2e45c7){const _0x2ca037=_0x144c4d;VisuMZ['PartySystem'][_0x2ca037(0x2e9)]['call'](this,_0x2ab567,_0x2f5304,_0x2e45c7),$gameParty['clearPartyBattleCommandCooldown']();},BattleManager['updateTargetsForPartySwitch']=function(_0x163f3c,_0x4fec75){const _0x24b1a3=_0x144c4d;if(_0x163f3c===_0x4fec75)return;if(!_0x163f3c)return;if(!_0x4fec75)return;if(this[_0x24b1a3(0x290)]===_0x163f3c)this[_0x24b1a3(0x290)]=_0x4fec75;while(this[_0x24b1a3(0x2da)][_0x24b1a3(0x375)](_0x163f3c)){const _0x2bc962=this[_0x24b1a3(0x2da)][_0x24b1a3(0x22d)](_0x163f3c);this['_targets'][_0x2bc962]=_0x4fec75;}},VisuMZ['PartySystem']['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x144c4d(0x1be)],Game_Battler['prototype'][_0x144c4d(0x1be)]=function(_0xd5e8da){const _0x1e9e44=_0x144c4d;VisuMZ[_0x1e9e44(0x284)][_0x1e9e44(0x303)][_0x1e9e44(0x2d7)](this,_0xd5e8da);if(this['isActor']())this[_0x1e9e44(0x1de)]();this[_0x1e9e44(0x2d4)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x18a)]=Game_Battler[_0x144c4d(0x1f9)][_0x144c4d(0x20b)],Game_Battler[_0x144c4d(0x1f9)][_0x144c4d(0x20b)]=function(){const _0x3a3e46=_0x144c4d;VisuMZ[_0x3a3e46(0x284)][_0x3a3e46(0x18a)][_0x3a3e46(0x2d7)](this);if(this[_0x3a3e46(0x346)]()&&$gameParty[_0x3a3e46(0x1e4)]())this[_0x3a3e46(0x229)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x220)]=Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x246)],Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x246)]=function(_0x632a83){const _0x27c98a=_0x144c4d;VisuMZ[_0x27c98a(0x284)][_0x27c98a(0x220)][_0x27c98a(0x2d7)](this,_0x632a83),this[_0x27c98a(0x338)](),this[_0x27c98a(0x1de)]();},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x338)]=function(){const _0x4e2318=_0x144c4d;this['_partyLocked']=![],this[_0x4e2318(0x2c4)]=![];},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x358)]=function(){const _0x2255e2=_0x144c4d;if(this[_0x2255e2(0x26c)]===undefined)this[_0x2255e2(0x338)]();return!this[_0x2255e2(0x26c)];},Game_Actor['prototype'][_0x144c4d(0x256)]=function(_0x1fcff9){const _0x3eb6d9=_0x144c4d;if(this[_0x3eb6d9(0x26c)]===undefined)this[_0x3eb6d9(0x338)]();this[_0x3eb6d9(0x26c)]=_0x1fcff9;},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x2f6)]=function(){const _0x2cbd93=_0x144c4d;if(this[_0x2cbd93(0x2c4)]===undefined)this['initPartySystem']();return this['_partyRequired'];},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x283)]=function(_0x2b1f8c){const _0x59ce60=_0x144c4d;if(this[_0x59ce60(0x2c4)]===undefined)this[_0x59ce60(0x338)]();this[_0x59ce60(0x2c4)]=_0x2b1f8c;},Game_Actor['prototype']['clearPartySwitchCommandCooldown']=function(){const _0x418780=_0x144c4d;this[_0x418780(0x1d6)]=0x0;},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x216)]=function(){const _0x584a3d=_0x144c4d;if(this[_0x584a3d(0x1d6)]===undefined)this[_0x584a3d(0x1de)]();if(!this[_0x584a3d(0x358)]())return![];if(this['isRequiredInParty']())return![];return this[_0x584a3d(0x1d6)]<=0x0;},Game_Actor['prototype'][_0x144c4d(0x2aa)]=function(){const _0x28e9cf=_0x144c4d;if(this[_0x28e9cf(0x1d6)]===undefined)this[_0x28e9cf(0x1de)]();return this[_0x28e9cf(0x1d6)];},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x221)]=function(_0x4845bf){const _0x4ae0e9=_0x144c4d;if(this[_0x4ae0e9(0x1d6)]===undefined)this[_0x4ae0e9(0x1de)]();this[_0x4ae0e9(0x1d6)]=_0x4845bf||0x0;},Game_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x276)]=function(){const _0x34f8a3=_0x144c4d;if(this['_partySwitchBattleCommandCooldown']===undefined)this['clearPartySwitchCommandCooldown']();const _0x1b04ec=VisuMZ['PartySystem'][_0x34f8a3(0x2b5)][_0x34f8a3(0x192)][_0x34f8a3(0x37c)];this[_0x34f8a3(0x221)](_0x1b04ec);},Game_Actor['prototype'][_0x144c4d(0x229)]=function(){const _0x496b79=_0x144c4d;if(this[_0x496b79(0x1d6)]===undefined)this[_0x496b79(0x1de)]();this['_partySwitchBattleCommandCooldown']--;},Game_Actor[_0x144c4d(0x1f9)]['onBattlePartySwitch']=function(_0x22edd1){const _0x4ec1f3=_0x144c4d;Imported[_0x4ec1f3(0x2e7)]&&BattleManager[_0x4ec1f3(0x1e7)]()&&BattleManager[_0x4ec1f3(0x20e)]();Imported[_0x4ec1f3(0x1a0)]&&BattleManager[_0x4ec1f3(0x344)]()&&(BattleManager[_0x4ec1f3(0x187)](),BattleManager['_subject']=this,BattleManager['_currentActor']=this);if(Imported[_0x4ec1f3(0x1f3)]&&BattleManager[_0x4ec1f3(0x254)]()){BattleManager[_0x4ec1f3(0x1e6)]=undefined,BattleManager[_0x4ec1f3(0x314)]=this;const _0x5434b1=BattleManager['_actionBattlers'][_0x4ec1f3(0x22d)](_0x22edd1);BattleManager['_actionBattlers'][_0x5434b1]=this,BattleManager[_0x4ec1f3(0x1bb)]();}Imported[_0x4ec1f3(0x230)]&&BattleManager[_0x4ec1f3(0x30f)]()&&(BattleManager[_0x4ec1f3(0x1e6)]=this,BattleManager['_currentActor']=this,BattleManager[_0x4ec1f3(0x1ac)](_0x22edd1,this));Imported['VisuMZ_2_BattleSystemETB']&&BattleManager[_0x4ec1f3(0x2a6)]()&&(BattleManager['_subject']=this,BattleManager['_currentActor']=this,BattleManager[_0x4ec1f3(0x1ac)](_0x22edd1,this));Imported[_0x4ec1f3(0x2c7)]&&BattleManager[_0x4ec1f3(0x2a2)]()&&(BattleManager['_subject']=this,BattleManager[_0x4ec1f3(0x314)]=this,BattleManager[_0x4ec1f3(0x1ac)](_0x22edd1,this));if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x4ec1f3(0x1bf)]()){BattleManager[_0x4ec1f3(0x1e6)]=this,BattleManager[_0x4ec1f3(0x314)]=this;for(let _0x172028=0x0;_0x172028<BattleManager['_actionBattlers'][_0x4ec1f3(0x255)];_0x172028++){const _0x2c5bd0=BattleManager['_actionBattlers'][_0x172028];_0x2c5bd0===_0x22edd1&&(BattleManager[_0x4ec1f3(0x38b)][_0x172028]=this);}for(let _0x3da2dd=0x0;_0x3da2dd<BattleManager[_0x4ec1f3(0x374)]['length'];_0x3da2dd++){const _0x41552c=BattleManager[_0x4ec1f3(0x374)][_0x3da2dd];_0x41552c===_0x22edd1&&(BattleManager[_0x4ec1f3(0x374)][_0x3da2dd]=this);}}if(Imported['VisuMZ_2_BattleGridSystem']&&BattleManager[_0x4ec1f3(0x33e)]()){const _0x3564e7=_0x22edd1['gridRank'](),_0x5a7ecb=_0x22edd1[_0x4ec1f3(0x1dc)]();this['gridMoveTo'](_0x3564e7,_0x5a7ecb);}},BattleManager[_0x144c4d(0x1ac)]=function(_0x555a98,_0x5bb494){const _0x232213=_0x144c4d;this['_actionBattlers']=this[_0x232213(0x38b)][_0x232213(0x347)](_0x32d79d=>_0x32d79d===_0x555a98?_0x5bb494:_0x32d79d);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x23e)]=Game_Unit[_0x144c4d(0x1f9)][_0x144c4d(0x1e4)],Game_Unit[_0x144c4d(0x1f9)][_0x144c4d(0x1e4)]=function(){const _0x5093bd=_0x144c4d;if(SceneManager[_0x5093bd(0x1db)]())return![];return VisuMZ[_0x5093bd(0x284)]['Game_Unit_inBattle'][_0x5093bd(0x2d7)](this);},Game_Party['defaultMaxBattleMembers']=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x192)][_0x144c4d(0x379)],VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2f7)]=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x33c)],Game_Party[_0x144c4d(0x1f9)]['initialize']=function(){const _0x41267e=_0x144c4d;VisuMZ[_0x41267e(0x284)][_0x41267e(0x2f7)][_0x41267e(0x2d7)](this),this[_0x41267e(0x368)](),this[_0x41267e(0x237)](),this[_0x41267e(0x307)]();},Game_Party['prototype']['clearPartyBattleCommandCooldown']=function(){this['_partySystemBattleCommandCooldown']=0x0;},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x216)]=function(){const _0x376a9c=_0x144c4d;if(this[_0x376a9c(0x32e)]===undefined)this[_0x376a9c(0x368)]();return this[_0x376a9c(0x32e)]<=0x0;},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x2aa)]=function(){const _0x52914a=_0x144c4d;if(this[_0x52914a(0x32e)]===undefined)this['clearPartyBattleCommandCooldown']();return this[_0x52914a(0x32e)];},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x221)]=function(_0x1fe176){const _0x3f5447=_0x144c4d;if(this[_0x3f5447(0x32e)]===undefined)this[_0x3f5447(0x368)]();this[_0x3f5447(0x32e)]=_0x1fe176;},Game_Party['prototype'][_0x144c4d(0x276)]=function(){const _0x2bef63=_0x144c4d;if(this[_0x2bef63(0x32e)]===undefined)this[_0x2bef63(0x368)]();this[_0x2bef63(0x32e)]=VisuMZ[_0x2bef63(0x284)]['Settings'][_0x2bef63(0x192)][_0x2bef63(0x36f)]||0x0;},Game_Party['prototype'][_0x144c4d(0x229)]=function(){const _0x54a792=_0x144c4d;if(this[_0x54a792(0x32e)]===undefined)this[_0x54a792(0x368)]();this[_0x54a792(0x32e)]--;},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x237)]=function(){const _0x5ad882=_0x144c4d;this[_0x5ad882(0x17b)]=0x0;},Game_Party['prototype'][_0x144c4d(0x1c7)]=function(_0x10905b){const _0x3c5c5c=_0x144c4d;this[_0x3c5c5c(0x17b)]=_0x10905b,this[_0x3c5c5c(0x307)](!![]),$gamePlayer&&$gamePlayer[_0x3c5c5c(0x2dd)]()&&$gamePlayer[_0x3c5c5c(0x2dd)]()['changeMaxBattleMembers']();},Game_Followers[_0x144c4d(0x1f9)][_0x144c4d(0x1c7)]=function(){const _0x473b75=_0x144c4d;if(!SceneManager[_0x473b75(0x325)]())return;this[_0x473b75(0x246)]();const _0x3375ef=$gameMap[_0x473b75(0x27a)](),_0x2f3847=$gamePlayer['x'],_0x1e2eca=$gamePlayer['y'],_0x330f79=$gamePlayer[_0x473b75(0x1b5)]();$gameTemp[_0x473b75(0x213)]=!![],$gamePlayer[_0x473b75(0x1f6)](_0x3375ef,_0x2f3847,_0x1e2eca,_0x330f79,0x2),setTimeout(this[_0x473b75(0x24e)][_0x473b75(0x23a)](this),0x7d0);},Game_Followers['prototype'][_0x144c4d(0x24e)]=function(){$gameTemp['_bypassAutoSavePartySystem']=![];},VisuMZ[_0x144c4d(0x284)]['Scene_Base_isAutosaveEnabled']=Scene_Base['prototype']['isAutosaveEnabled'],Scene_Base[_0x144c4d(0x1f9)][_0x144c4d(0x240)]=function(){const _0x21cade=_0x144c4d;if($gameTemp[_0x21cade(0x213)])return![];return VisuMZ[_0x21cade(0x284)][_0x21cade(0x2f9)][_0x21cade(0x2d7)](this);},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x238)]=function(){const _0x1d83a2=_0x144c4d;if(this['_battleMaxSize']===undefined)this[_0x1d83a2(0x307)]();let _0x296ed1=this[_0x1d83a2(0x17b)]||Game_Party[_0x1d83a2(0x2ae)];return Imported[_0x1d83a2(0x2e8)]&&BattleManager[_0x1d83a2(0x37d)]()&&(_0x296ed1=_0x296ed1[_0x1d83a2(0x29c)](0x1,0x14)),_0x296ed1;},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x258)]=function(){const _0x5d06e3=_0x144c4d;if(this[_0x5d06e3(0x17b)]===undefined)this[_0x5d06e3(0x307)]();if(!this[_0x5d06e3(0x268)])this[_0x5d06e3(0x307)]();while(this[_0x5d06e3(0x268)][_0x5d06e3(0x255)]<this[_0x5d06e3(0x17b)]){this[_0x5d06e3(0x268)]['push'](0x0);}},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x307)]=function(_0x3e3362){const _0x5ad054=_0x144c4d;!_0x3e3362&&(this[_0x5ad054(0x17b)]=Game_Party[_0x5ad054(0x2ae)]);this[_0x5ad054(0x268)]=this[_0x5ad054(0x348)][_0x5ad054(0x20f)](0x0,this['_battleMaxSize']);while(this[_0x5ad054(0x268)][_0x5ad054(0x255)]<this[_0x5ad054(0x17b)]){this['_battleMembers'][_0x5ad054(0x1f1)](0x0);}},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x183)]=function(){const _0x445bc0=_0x144c4d;if(Imported[_0x445bc0(0x2e8)]&&SceneManager[_0x445bc0(0x270)]())return this[_0x445bc0(0x19b)](!![]);return this[_0x445bc0(0x19b)]()[_0x445bc0(0x222)](_0x508ef6=>!!_0x508ef6);},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x19b)]=function(_0x27bba3){const _0x521060=_0x144c4d;this[_0x521060(0x258)]();const _0x5e59e9=this[_0x521060(0x268)][_0x521060(0x347)](_0xc97a0e=>$gameActors['actor'](_0xc97a0e));if(_0x27bba3)return _0x5e59e9;return SceneManager['isSceneParty']()?_0x5e59e9:_0x5e59e9['filter'](_0xe9db56=>_0xe9db56&&_0xe9db56['isAppeared']());},Game_Party['prototype'][_0x144c4d(0x206)]=function(){const _0x2dae7a=_0x144c4d,_0x40f6c5=this[_0x2dae7a(0x183)]();return this[_0x2dae7a(0x295)]()['filter'](_0x5875ca=>!_0x40f6c5[_0x2dae7a(0x375)](_0x5875ca));},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x1a1)]=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x263)],Game_Party['prototype'][_0x144c4d(0x263)]=function(){const _0x3a6e4e=_0x144c4d;VisuMZ[_0x3a6e4e(0x284)][_0x3a6e4e(0x1a1)]['call'](this),this[_0x3a6e4e(0x307)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x201)]=Game_Party['prototype']['setupBattleTest'],Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x252)]=function(){const _0x4ad601=_0x144c4d;VisuMZ['PartySystem'][_0x4ad601(0x201)][_0x4ad601(0x2d7)](this),this['addNonBattleTestMembers']();},Game_Party[_0x144c4d(0x1f9)]['setupBattleTestMembers']=function(){const _0x4938bd=_0x144c4d;this[_0x4938bd(0x17b)]=Game_Party['defaultMaxBattleMembers'],this[_0x4938bd(0x268)]=[],this[_0x4938bd(0x348)]=[];for(const _0x26d943 of $dataSystem[_0x4938bd(0x289)]){const _0x3d3382=$gameActors[_0x4938bd(0x38a)](_0x26d943['actorId']);if(!_0x3d3382)continue;_0x3d3382[_0x4938bd(0x2d9)](_0x26d943['level'],![]),_0x3d3382[_0x4938bd(0x339)](_0x26d943[_0x4938bd(0x181)]),_0x3d3382[_0x4938bd(0x17c)](),this[_0x4938bd(0x268)][_0x4938bd(0x1f1)](_0x26d943['actorId']),this[_0x4938bd(0x348)][_0x4938bd(0x1f1)](_0x26d943[_0x4938bd(0x2a5)]);}this[_0x4938bd(0x268)][_0x4938bd(0x1a7)](0x0);while(this[_0x4938bd(0x268)]['length']<this[_0x4938bd(0x17b)]){this[_0x4938bd(0x268)][_0x4938bd(0x1f1)](0x0);}while(this[_0x4938bd(0x268)][_0x4938bd(0x255)]>this[_0x4938bd(0x238)]()){this[_0x4938bd(0x268)][_0x4938bd(0x29a)]();}if($gamePlayer)$gamePlayer[_0x4938bd(0x1fb)]();},Game_Party[_0x144c4d(0x1f9)]['addNonBattleTestMembers']=function(){const _0x588f59=_0x144c4d,_0xe7895f=this[_0x588f59(0x183)]();for(let _0x17ef69=0x1;_0x17ef69<$dataActors[_0x588f59(0x255)];_0x17ef69++){const _0x2e6c95=$gameActors['actor'](_0x17ef69);if(!_0x2e6c95)continue;if(_0x2e6c95[_0x588f59(0x312)]()[_0x588f59(0x255)]<=0x0)continue;if(_0x2e6c95[_0x588f59(0x312)]()['match'](/-----/i))continue;if(_0xe7895f[_0x588f59(0x375)](_0x2e6c95))continue;this[_0x588f59(0x348)]['push'](_0x2e6c95[_0x588f59(0x2a5)]());}},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x1b1)]=Game_Party['prototype'][_0x144c4d(0x38c)],Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x38c)]=function(_0x41ab77){const _0x3bb67b=_0x144c4d;VisuMZ[_0x3bb67b(0x284)][_0x3bb67b(0x1b1)][_0x3bb67b(0x2d7)](this,_0x41ab77),this[_0x3bb67b(0x210)](_0x41ab77),SceneManager[_0x3bb67b(0x184)]()&&(Imported[_0x3bb67b(0x2fc)]&&BattleManager[_0x3bb67b(0x1bf)]()&&(BattleManager[_0x3bb67b(0x214)](),BattleManager[_0x3bb67b(0x362)]($gameActors[_0x3bb67b(0x38a)](_0x41ab77))));},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x210)]=function(_0x46df83){const _0x515a82=_0x144c4d;this[_0x515a82(0x258)]();if(this[_0x515a82(0x268)]['includes'](_0x46df83))return;if(!this[_0x515a82(0x348)]['includes'](_0x46df83))return;if(!this[_0x515a82(0x268)][_0x515a82(0x375)](0x0))return;const _0x1bd940=$gameActors[_0x515a82(0x38a)](_0x46df83);if(!_0x1bd940)return;const _0x1e1db0=this[_0x515a82(0x268)]['indexOf'](0x0);if(_0x1e1db0<0x0)return;this[_0x515a82(0x268)][_0x1e1db0]=_0x46df83,SceneManager[_0x515a82(0x184)]()&&(_0x1bd940[_0x515a82(0x1be)](),_0x1bd940[_0x515a82(0x2c9)]()),this[_0x515a82(0x1c8)]();},Game_Party['prototype'][_0x144c4d(0x380)]=function(_0x23c9c6,_0x1c3b20){const _0x2680ea=_0x144c4d;this[_0x2680ea(0x258)]();if(this['_battleMembers'][_0x2680ea(0x375)](_0x23c9c6))return;if(!this[_0x2680ea(0x268)][_0x2680ea(0x375)](0x0))return;const _0x4d1a33=$gameActors['actor'](_0x23c9c6);if(!_0x4d1a33)return;this[_0x2680ea(0x268)][_0x1c3b20]=_0x23c9c6,_0x4d1a33['makeActions'](),this[_0x2680ea(0x1c8)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2d2)]=Game_Party[_0x144c4d(0x1f9)]['removeActor'],Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x370)]=function(_0x48c7bf){const _0x571e52=_0x144c4d;this['removeActorFromBattleMembers'](_0x48c7bf),VisuMZ[_0x571e52(0x284)]['Game_Party_removeActor']['call'](this,_0x48c7bf);},Game_Party['prototype']['removeActorFromBattleMembers']=function(_0x56c70b){const _0x2e5c55=_0x144c4d;this[_0x2e5c55(0x258)]();if(!this[_0x2e5c55(0x268)][_0x2e5c55(0x375)](_0x56c70b))return;if(_0x56c70b<=0x0)return;const _0x2d5935=this[_0x2e5c55(0x268)][_0x2e5c55(0x22d)](_0x56c70b);this[_0x2e5c55(0x268)][_0x2d5935]=0x0,this[_0x2e5c55(0x348)]['remove'](_0x56c70b),this[_0x2e5c55(0x348)][_0x2e5c55(0x1f1)](_0x56c70b),this[_0x2e5c55(0x1c8)]();},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1c8)]=function(){const _0x82d1d1=_0x144c4d;this[_0x82d1d1(0x2ca)](),$gamePlayer[_0x82d1d1(0x1fb)](),$gameMap[_0x82d1d1(0x2bc)]();},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x2ca)]=function(){const _0x34f913=_0x144c4d;this[_0x34f913(0x258)]();const _0x1337ff=this[_0x34f913(0x183)]()[_0x34f913(0x25a)](this['reserveMembers']());this[_0x34f913(0x348)]=_0x1337ff['map'](_0x1a8f15=>_0x1a8f15?_0x1a8f15[_0x34f913(0x2a5)]():0x0)[_0x34f913(0x1a7)](0x0);},Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x21c)]=function(){const _0x5bf0f8=_0x144c4d;this[_0x5bf0f8(0x348)]['sort']((_0x5455ad,_0x463b67)=>_0x5455ad-_0x463b67),this[_0x5bf0f8(0x2ca)](),this['partyChangeRefresh']();},Game_Party['prototype'][_0x144c4d(0x1d1)]=function(){const _0x5621f2=_0x144c4d;for(const _0x5ad448 of this[_0x5621f2(0x206)]()){if(!_0x5ad448)continue;if(_0x5ad448[_0x5621f2(0x2f6)]())return!![];}return![];},VisuMZ['PartySystem'][_0x144c4d(0x27b)]=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x196)],Game_Party['prototype']['swapOrder']=function(_0x120be9,_0x492306){const _0x33806f=_0x144c4d,_0x5098c9=this[_0x33806f(0x183)]()[_0x33806f(0x1a7)](null)['remove'](undefined)['length'];VisuMZ[_0x33806f(0x284)][_0x33806f(0x27b)]['call'](this,_0x120be9,_0x492306),this[_0x33806f(0x1a3)](_0x120be9,_0x492306,_0x5098c9);},Game_Party['prototype']['swapOrderPartySystemPlugin']=function(_0x5361c5,_0x4fe41b,_0x8b93ce){const _0x28dbfe=_0x144c4d;this['_battleMembers']=[];for(let _0x23ecdb=0x0;_0x23ecdb<this[_0x28dbfe(0x348)][_0x28dbfe(0x255)];_0x23ecdb++){if(this['_battleMembers'][_0x28dbfe(0x255)]>=this[_0x28dbfe(0x238)]())break;if(SceneManager[_0x28dbfe(0x28b)][_0x28dbfe(0x310)]&&SceneManager[_0x28dbfe(0x28b)][_0x28dbfe(0x310)]()){if(this[_0x28dbfe(0x268)][_0x28dbfe(0x255)]>=_0x8b93ce)break;}this[_0x28dbfe(0x268)][_0x23ecdb]=this[_0x28dbfe(0x348)][_0x23ecdb];}$gamePlayer[_0x28dbfe(0x1fb)]();},Scene_MenuBase[_0x144c4d(0x1f9)][_0x144c4d(0x310)]=function(){const _0x3a895c=_0x144c4d;if(this[_0x3a895c(0x1e2)][_0x3a895c(0x312)]==='Scene_BattleGridTactics')return!![];return![];},Game_Party[_0x144c4d(0x1f9)]['createForcedParty']=function(_0x247572){const _0x5f4918=_0x144c4d;if(this[_0x5f4918(0x1e4)]())return;if(!_0x247572)return;if(_0x247572[_0x5f4918(0x255)]<=0x0)return;this[_0x5f4918(0x287)]=_0x247572[_0x5f4918(0x279)](),this[_0x5f4918(0x287)]=this[_0x5f4918(0x287)][_0x5f4918(0x222)](_0xd46ab=>!!$gameActors[_0x5f4918(0x38a)](_0xd46ab));while(this[_0x5f4918(0x287)]['length']>this[_0x5f4918(0x238)]()){this[_0x5f4918(0x287)][_0x5f4918(0x29a)]();}$gamePlayer[_0x5f4918(0x1fb)](),$gameMap[_0x5f4918(0x2bc)]();},Game_Party['prototype'][_0x144c4d(0x27e)]=function(){const _0x2395c2=_0x144c4d;if(this['inBattle']())return;this[_0x2395c2(0x287)]=undefined,$gamePlayer[_0x2395c2(0x1fb)](),$gameMap[_0x2395c2(0x2bc)]();},VisuMZ['PartySystem']['Game_Party_allMembers_FP']=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x295)],Game_Party[_0x144c4d(0x1f9)]['allMembers']=function(){const _0x3af30e=_0x144c4d;if(this['_forcedPartyActors']!==undefined)return this[_0x3af30e(0x287)]['map'](_0x4d0ec3=>$gameActors['actor'](_0x4d0ec3));return VisuMZ[_0x3af30e(0x284)][_0x3af30e(0x1b8)]['call'](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2ee)]=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x19b)],Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x19b)]=function(_0x26aa44){const _0x25b27a=_0x144c4d;if(this['_forcedPartyActors']!==undefined)return this[_0x25b27a(0x287)][_0x25b27a(0x347)](_0x17bc3b=>$gameActors['actor'](_0x17bc3b));return VisuMZ[_0x25b27a(0x284)][_0x25b27a(0x2ee)][_0x25b27a(0x2d7)](this,_0x26aa44);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x315)]=Game_Party[_0x144c4d(0x1f9)]['reserveMembers'],Game_Party[_0x144c4d(0x1f9)]['reserveMembers']=function(){const _0x260720=_0x144c4d;if(this[_0x260720(0x287)]!==undefined)return[];return VisuMZ[_0x260720(0x284)]['Game_Party_reserveMembers_FP'][_0x260720(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x211)]=Game_System['prototype'][_0x144c4d(0x194)],Game_System[_0x144c4d(0x1f9)][_0x144c4d(0x194)]=function(){const _0xbb2766=_0x144c4d;if($gameParty['_forcedPartyActors']!==undefined)return![];if($gameParty[_0xbb2766(0x22b)]!==undefined)return![];return VisuMZ['PartySystem'][_0xbb2766(0x211)][_0xbb2766(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)]['Game_Actor_canSwitchPartyInBattle_FP']=Game_Actor[_0x144c4d(0x1f9)]['canSwitchPartyInBattle'],Game_Actor['prototype'][_0x144c4d(0x216)]=function(){const _0x49414e=_0x144c4d;if($gameParty[_0x49414e(0x287)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x49414e(0x284)][_0x49414e(0x2e2)][_0x49414e(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x357)]=Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x216)],Game_Party[_0x144c4d(0x1f9)][_0x144c4d(0x216)]=function(){const _0x209d5d=_0x144c4d;if($gameParty[_0x209d5d(0x287)]!==undefined)return![];if($gameParty[_0x209d5d(0x22b)]!==undefined)return![];return VisuMZ['PartySystem'][_0x209d5d(0x357)][_0x209d5d(0x2d7)](this);},VisuMZ['PartySystem'][_0x144c4d(0x285)]=Game_Troop[_0x144c4d(0x1f9)][_0x144c4d(0x2e3)],Game_Troop[_0x144c4d(0x1f9)][_0x144c4d(0x2e3)]=function(){const _0x380b1e=_0x144c4d;VisuMZ[_0x380b1e(0x284)]['Game_Troop_increaseTurn']['call'](this),$gameParty[_0x380b1e(0x229)]();},Scene_Menu[_0x144c4d(0x1f9)][_0x144c4d(0x2eb)]=function(){SceneManager['push'](Scene_Party);};function Scene_Party(){const _0xf18f65=_0x144c4d;this[_0xf18f65(0x33c)](...arguments);}Scene_Party['prototype']=Object['create'](Scene_MenuBase[_0x144c4d(0x1f9)]),Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1e2)]=Scene_Party,Scene_Party['prototype'][_0x144c4d(0x33c)]=function(){const _0x142e75=_0x144c4d;this[_0x142e75(0x2e1)](),Scene_MenuBase[_0x142e75(0x1f9)][_0x142e75(0x33c)][_0x142e75(0x2d7)](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x321)]=function(){const _0x2ae3a9=_0x144c4d;if(ConfigManager[_0x2ae3a9(0x29d)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x2ae3a9(0x1ca)];else return ConfigManager[_0x2ae3a9(0x29d)]===![]?![]:Scene_MenuBase[_0x2ae3a9(0x1f9)][_0x2ae3a9(0x321)]['call'](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x2be)]=function(){return 0x0;},Scene_Party[_0x144c4d(0x1f9)]['needsPageButtons']=function(){return!![];},Scene_Party[_0x144c4d(0x1f9)]['createPageButtons']=function(){const _0xe87a6c=_0x144c4d;Scene_MenuBase[_0xe87a6c(0x1f9)][_0xe87a6c(0x1e1)][_0xe87a6c(0x2d7)](this),this[_0xe87a6c(0x2f3)][_0xe87a6c(0x2a1)]=undefined,this['_pagedownButton']['_clickHandler']=undefined;},Scene_Party['prototype'][_0x144c4d(0x2e1)]=function(){const _0x5bf52d=_0x144c4d;for(const _0x177abc of $gameParty['members']()){ImageManager[_0x5bf52d(0x17d)](_0x177abc['faceName']()),ImageManager['loadCharacter'](_0x177abc[_0x5bf52d(0x317)]()),ImageManager['loadSvActor'](_0x177abc[_0x5bf52d(0x366)]());}},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x322)]=function(){const _0x41a574=_0x144c4d;Scene_MenuBase[_0x41a574(0x1f9)][_0x41a574(0x322)][_0x41a574(0x2d7)](this),this[_0x41a574(0x247)](),this[_0x41a574(0x1c4)](),this['createReservePartyLabel'](),this[_0x41a574(0x25f)](),this[_0x41a574(0x225)](),this[_0x41a574(0x1ce)]();},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x247)]=function(){const _0x5363f1=_0x144c4d,_0xa1b31=this[_0x5363f1(0x1f0)]();this[_0x5363f1(0x265)]=new Window_PartyLabel(_0xa1b31,TextManager[_0x5363f1(0x24b)]),this[_0x5363f1(0x265)][_0x5363f1(0x19d)](VisuMZ['PartySystem'][_0x5363f1(0x2b5)][_0x5363f1(0x2a7)][_0x5363f1(0x1ef)]),this['addWindow'](this[_0x5363f1(0x265)]);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1f0)]=function(){const _0x39c531=_0x144c4d;return VisuMZ[_0x39c531(0x284)]['Settings'][_0x39c531(0x2a7)][_0x39c531(0x2db)][_0x39c531(0x2d7)](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1c4)]=function(){const _0x398cbe=_0x144c4d,_0x27e841=this[_0x398cbe(0x2c1)]();this[_0x398cbe(0x2ea)]=new Window_PartyActive(_0x27e841),this[_0x398cbe(0x2ea)][_0x398cbe(0x19d)](VisuMZ[_0x398cbe(0x284)][_0x398cbe(0x2b5)][_0x398cbe(0x2a7)]['ActivePartyWindowBgType']),this[_0x398cbe(0x2ea)][_0x398cbe(0x345)]('ok',this[_0x398cbe(0x275)]['bind'](this)),this[_0x398cbe(0x2ea)]['setHandler']('cancel',this[_0x398cbe(0x223)][_0x398cbe(0x23a)](this)),this['addWindow'](this['_activePartyWindow']);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x2c1)]=function(){const _0x501fbe=_0x144c4d;return VisuMZ[_0x501fbe(0x284)][_0x501fbe(0x2b5)][_0x501fbe(0x2a7)][_0x501fbe(0x1d9)][_0x501fbe(0x2d7)](this);},Scene_Party[_0x144c4d(0x1f9)]['onActiveOk']=function(){const _0x2709ce=_0x144c4d;this[_0x2709ce(0x226)][_0x2709ce(0x191)](),this[_0x2709ce(0x226)]['reselect']();},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x37a)]=function(){const _0x26dcfe=_0x144c4d,_0xc306c5=this[_0x26dcfe(0x259)]();this[_0x26dcfe(0x1fa)]=new Window_PartyLabel(_0xc306c5,TextManager[_0x26dcfe(0x271)]),this[_0x26dcfe(0x1fa)]['setBackgroundType'](VisuMZ[_0x26dcfe(0x284)][_0x26dcfe(0x2b5)][_0x26dcfe(0x2a7)][_0x26dcfe(0x1fd)]),this[_0x26dcfe(0x340)](this[_0x26dcfe(0x1fa)]);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x259)]=function(){const _0x3097f3=_0x144c4d;return VisuMZ[_0x3097f3(0x284)]['Settings'][_0x3097f3(0x2a7)]['ReservePartyLabelRect'][_0x3097f3(0x2d7)](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x25f)]=function(){const _0x53507b=_0x144c4d,_0x29e515=this[_0x53507b(0x1b4)]();this[_0x53507b(0x226)]=new Window_PartyReserve(_0x29e515),this['_reservePartyWindow'][_0x53507b(0x19d)](VisuMZ[_0x53507b(0x284)][_0x53507b(0x2b5)][_0x53507b(0x2a7)][_0x53507b(0x199)]),this[_0x53507b(0x226)][_0x53507b(0x345)]('ok',this[_0x53507b(0x26f)][_0x53507b(0x23a)](this)),this[_0x53507b(0x226)][_0x53507b(0x345)](_0x53507b(0x34a),this[_0x53507b(0x288)][_0x53507b(0x23a)](this)),this[_0x53507b(0x340)](this[_0x53507b(0x226)]);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1b4)]=function(){const _0x3d5a72=_0x144c4d;return VisuMZ[_0x3d5a72(0x284)][_0x3d5a72(0x2b5)]['Window'][_0x3d5a72(0x31a)]['call'](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x26f)]=function(){const _0x446038=_0x144c4d,_0x3154ee=this[_0x446038(0x226)][_0x446038(0x293)](),_0x40139b=this[_0x446038(0x2ea)][_0x446038(0x35c)]();if(_0x3154ee<0x0){if(_0x40139b)$gameParty[_0x446038(0x2a0)](_0x40139b['actorId']());}else{const _0x545a8e=this[_0x446038(0x226)][_0x446038(0x35c)]()['actorId'](),_0x29a1da=this[_0x446038(0x2ea)][_0x446038(0x28e)]();if(_0x40139b)$gameParty[_0x446038(0x2a0)](_0x40139b[_0x446038(0x2a5)]());$gameParty[_0x446038(0x380)](_0x545a8e,_0x29a1da);}this[_0x446038(0x1e8)](),this[_0x446038(0x288)]();},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x1e8)]=function(){const _0x2df362=_0x144c4d;this[_0x2df362(0x2ea)][_0x2df362(0x1fb)](),this['_reservePartyWindow'][_0x2df362(0x1fb)]();},Scene_Party['prototype'][_0x144c4d(0x288)]=function(){const _0x332328=_0x144c4d;this[_0x332328(0x226)][_0x332328(0x26d)](),this[_0x332328(0x226)][_0x332328(0x24d)](),this[_0x332328(0x2ea)][_0x332328(0x191)]();},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x225)]=function(){const _0x4b6f72=_0x144c4d,_0x439c24=this[_0x4b6f72(0x2cb)]();this[_0x4b6f72(0x35a)]=new Window_PartyLabel(_0x439c24,TextManager[_0x4b6f72(0x2d5)]),this[_0x4b6f72(0x35a)][_0x4b6f72(0x19d)](VisuMZ['PartySystem']['Settings'][_0x4b6f72(0x2a7)][_0x4b6f72(0x1ae)]),this[_0x4b6f72(0x340)](this['_statusPartyLabel']);},Scene_Party[_0x144c4d(0x1f9)]['statusLabelRect']=function(){const _0x48c50a=_0x144c4d;return VisuMZ[_0x48c50a(0x284)][_0x48c50a(0x2b5)]['Window'][_0x48c50a(0x332)]['call'](this);},Scene_Party[_0x144c4d(0x1f9)]['createStatusWindow']=function(){const _0x71cbd9=_0x144c4d,_0x346c4b=this[_0x71cbd9(0x1fc)]();this[_0x71cbd9(0x309)]=new Window_PartyStatus(_0x346c4b),this['_statusPartyWindow'][_0x71cbd9(0x19d)](VisuMZ[_0x71cbd9(0x284)][_0x71cbd9(0x2b5)][_0x71cbd9(0x2a7)][_0x71cbd9(0x373)]),this[_0x71cbd9(0x340)](this[_0x71cbd9(0x309)]),this[_0x71cbd9(0x226)][_0x71cbd9(0x231)](this[_0x71cbd9(0x309)]),this['_activePartyWindow'][_0x71cbd9(0x231)](this[_0x71cbd9(0x309)]);},Scene_Party[_0x144c4d(0x1f9)]['statusWindowRect']=function(){const _0x402d76=_0x144c4d;return VisuMZ['PartySystem'][_0x402d76(0x2b5)][_0x402d76(0x2a7)][_0x402d76(0x186)][_0x402d76(0x2d7)](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x18d)]=function(){const _0x501469=_0x144c4d;return TextManager['getInputButtonString'](_0x501469(0x2e0));},Scene_Party[_0x144c4d(0x1f9)]['buttonAssistText1']=function(){return TextManager['assistSwapPositions'];},Scene_Party[_0x144c4d(0x1f9)]['buttonAssistText3']=function(){const _0x288455=_0x144c4d,_0x42a401=this[_0x288455(0x2ea)],_0x1689fa=this[_0x288455(0x226)];if(_0x42a401&&_0x42a401[_0x288455(0x27c)]&&_0x42a401[_0x288455(0x35c)]()&&_0x42a401[_0x288455(0x267)]())return TextManager[_0x288455(0x2ac)];else return _0x1689fa&&_0x1689fa[_0x288455(0x27c)]&&$gameParty['reserveMembers']()[_0x288455(0x255)]>0x0?TextManager['assistSortPartyMembers']:'';},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x365)]=function(){const _0xd3c9f3=_0x144c4d;if(this[_0xd3c9f3(0x2ea)]&&this[_0xd3c9f3(0x2ea)][_0xd3c9f3(0x27c)])return TextManager[_0xd3c9f3(0x25c)];else return this[_0xd3c9f3(0x226)]&&this[_0xd3c9f3(0x226)][_0xd3c9f3(0x27c)]?TextManager['assistSwapInPartyMember']:Scene_MenuBase['prototype'][_0xd3c9f3(0x365)]['call'](this);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x32a)]=function(){const _0x2f56b1=_0x144c4d;Scene_MenuBase[_0x2f56b1(0x1f9)][_0x2f56b1(0x32a)]['call'](this),this[_0x2f56b1(0x2e5)](this[_0x2f56b1(0x1ec)]()),this['createCustomBackgroundImages']();},Scene_Party['prototype'][_0x144c4d(0x1ec)]=function(){const _0x50ac50=_0x144c4d;return VisuMZ[_0x50ac50(0x284)]['Settings'][_0x50ac50(0x2b8)][_0x50ac50(0x37f)];},Scene_Party['prototype'][_0x144c4d(0x2b7)]=function(){const _0x428a8=_0x144c4d,_0x579755={'BgFilename1':VisuMZ[_0x428a8(0x284)][_0x428a8(0x2b5)][_0x428a8(0x2b8)][_0x428a8(0x1eb)],'BgFilename2':VisuMZ[_0x428a8(0x284)][_0x428a8(0x2b5)][_0x428a8(0x2b8)][_0x428a8(0x350)]};_0x579755&&(_0x579755[_0x428a8(0x1eb)]!==''||_0x579755[_0x428a8(0x350)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager['loadTitle1'](_0x579755[_0x428a8(0x1eb)])),this['_backSprite2']=new Sprite(ImageManager[_0x428a8(0x215)](_0x579755[_0x428a8(0x350)])),this[_0x428a8(0x1aa)](this[_0x428a8(0x361)]),this[_0x428a8(0x1aa)](this[_0x428a8(0x30a)]),this[_0x428a8(0x361)][_0x428a8(0x383)]['addLoadListener'](this[_0x428a8(0x249)][_0x428a8(0x23a)](this,this[_0x428a8(0x361)])),this['_backSprite2'][_0x428a8(0x383)][_0x428a8(0x17e)](this[_0x428a8(0x249)][_0x428a8(0x23a)](this,this[_0x428a8(0x30a)])));},Scene_Party['prototype'][_0x144c4d(0x249)]=function(_0x273bcc){this['scaleSprite'](_0x273bcc),this['centerSprite'](_0x273bcc);},Scene_Party[_0x144c4d(0x1f9)][_0x144c4d(0x36b)]=function(){const _0xa9b027=_0x144c4d;Scene_MenuBase[_0xa9b027(0x1f9)][_0xa9b027(0x36b)][_0xa9b027(0x2d7)](this),$gameParty[_0xa9b027(0x1c8)]();},Window_StatusBase['prototype']['drawActorPartyIcons']=function(_0x102914,_0x4c35fa,_0x4e04fa,_0xa02efc){const _0x48bd88=_0x144c4d;if(!_0x102914)return;_0xa02efc?this['drawActorPartyIconsVert'](_0x102914,_0x4c35fa,_0x4e04fa):this[_0x48bd88(0x35b)](_0x102914,_0x4c35fa,_0x4e04fa);},Window_StatusBase[_0x144c4d(0x1f9)]['drawActorPartyIconsHorz']=function(_0x46aa2b,_0x20dae2,_0x5e04ce){const _0x2b58f3=_0x144c4d;_0x5e04ce+=Math[_0x2b58f3(0x31c)]((this[_0x2b58f3(0x305)]()-ImageManager[_0x2b58f3(0x241)])/0x2),!_0x46aa2b[_0x2b58f3(0x358)]()&&(this['drawIcon'](ImageManager[_0x2b58f3(0x1ed)],_0x20dae2,_0x5e04ce),_0x20dae2+=ImageManager['iconWidth']+0x4),_0x46aa2b['isRequiredInParty']()&&(this[_0x2b58f3(0x27f)](ImageManager[_0x2b58f3(0x197)],_0x20dae2,_0x5e04ce),_0x20dae2+=ImageManager[_0x2b58f3(0x28f)]+0x4);},Window_StatusBase[_0x144c4d(0x1f9)]['drawActorPartyIconsVert']=function(_0x56f278,_0x7d00de,_0x4b5327){const _0x622ec4=_0x144c4d;let _0x232f04=0x0;if(!_0x56f278[_0x622ec4(0x358)]())_0x232f04+=0x1;if(_0x56f278[_0x622ec4(0x2f6)]())_0x232f04+=0x1;if(_0x232f04<=0x1)return this['drawActorPartyIconsHorz'](_0x56f278,_0x7d00de,_0x4b5327);_0x4b5327+=Math[_0x622ec4(0x31c)]((this[_0x622ec4(0x305)]()-ImageManager[_0x622ec4(0x241)])/0x2),_0x4b5327-=Math[_0x622ec4(0x31c)](this[_0x622ec4(0x305)]()/0x2),this[_0x622ec4(0x27f)](ImageManager['lockPartyMemberIcon'],_0x7d00de,_0x4b5327),_0x4b5327+=this[_0x622ec4(0x305)](),this[_0x622ec4(0x27f)](ImageManager[_0x622ec4(0x197)],_0x7d00de,_0x4b5327);};function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0x144c4d(0x1f9)]=Object[_0x144c4d(0x322)](Window_Base['prototype']),Window_PartyLabel[_0x144c4d(0x1f9)][_0x144c4d(0x1e2)]=Window_PartyLabel,Window_PartyLabel[_0x144c4d(0x1f9)][_0x144c4d(0x33c)]=function(_0x2444bb,_0x4eda58){const _0x3f55af=_0x144c4d;Window_Base[_0x3f55af(0x1f9)]['initialize']['call'](this,_0x2444bb),this[_0x3f55af(0x30c)](_0x4eda58);},Window_PartyLabel['prototype'][_0x144c4d(0x28d)]=function(){const _0x33b436=_0x144c4d;this[_0x33b436(0x36e)]=0x0;},Window_PartyLabel['prototype']['setText']=function(_0x4a93ef){const _0x123fc7=_0x144c4d;this[_0x123fc7(0x182)]['clear'](),this[_0x123fc7(0x22f)](_0x4a93ef,0x0,0x0,this['innerWidth'],_0x123fc7(0x381));};function Window_PartyActive(){const _0x8c0bfe=_0x144c4d;this[_0x8c0bfe(0x33c)](...arguments);}function _0x566a(){const _0x7b6716=['getBackgroundOpacity','lockPartyMemberIcon','MoveActorsToActive','ActivePartyLabelBgType','activePartyLabelRect','push','battlePartySwitchCmd','VisuMZ_2_BattleSystemBTB','processShiftSortShortcut','isFormationCommandAdded','reserveTransfer','teamBasedFirstAvailableMember','battlePartyChangeCmdHelp','prototype','_reservePartyLabel','refresh','statusWindowRect','ReservePartyLabelBgType','Window_PartyCommand_updateHelp','_partySystemSwitchOut','createPartySwitchWindow','Game_Party_setupBattleTest','Scene_Battle_updateBattleProcess','svbattler','AssistSort','TempDisbandTempParty','reserveMembers','_debug','FUNC','drawDarkRect','1771214FjJhDp','regenerateAll','CallPartyScene','ActorsJS','updateTurnOrderCTB','slice','addActorToBattleMembers','Game_System_isFormationEnabled_FP','isTimeActive','_bypassAutoSavePartySystem','removeActionBattlersOTB','loadTitle2','canSwitchPartyInBattle','tpbImmediateAction','4519128mKvLAL','AssistRemove','getColor','PartyCmdWinAddParty','sortActors','currentSymbol','clear','_rowThickness','Game_Actor_setup','setBattlePartySwitchCooldown','filter','popScene','drawActorSimpleStatus','createStatusLabel','_reservePartyWindow','cursorDown','_tpbSceneChangeCacheActor','updateBattlePartySwitchCooldown','log','_forcedBattleGridTactics','startOpacity','indexOf','postPartySwitchMenuTpb','drawText','VisuMZ_2_BattleSystemFTB','setStatusWindow','BattleSwitchWindowBgType','ActiveBattlerOffsetY','changePaintOpacity','updateBattleProcess','onPartySwitchCancel','initMaxBattleMembers','maxBattleMembers','innerWidth','bind','assistSwapInPartyMember','members','switchStateIconActor','Game_Unit_inBattle','Scene_Battle_isTimeActive','isAutosaveEnabled','iconHeight','cursorPagedown','Index','_partyMemberSwitchWindow','makeActionOrders','setup','createActivePartyLabel','updateHelp','adjustSprite','3194800asbrWS','activeParty','BattleSwitchWindowRect','deselect','clearBypassAutoSave','close','faceHeight','isPartyCommandAdded','setupBattleTest','CoreEngine','isBTB','length','setPartyLock','width','checkInitBattleMembers','reservePartyLabelRect','concat','isPartyCommandEnabled','assistSwapOutPartyMember','LockPartyMembers','onBattlePartySwitch','createReservePartyWindow','nameStartPosition','findSymbol','StatusWindowDraw','setupStartingMembers','ActiveTpbFormationMessage','_activePartyLabel','processOk','isShiftRemoveShortcutEnabled','_battleMembers','innerHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isTpb','_partyLocked','deactivate','ARRAYNUM','onReserveOk','isSceneGridTactics','reserveParty','drawActorFace','cursorPageup','Vocab','onActiveOk','applyBattlePartySwitchCooldown','VisuMZ_1_BattleCore','_statusWindow','clone','mapId','Game_Party_swapOrder','active','ReserveParty','clearForcedParty','drawIcon','match','RequireIcon','sprite','setPartyRequirement','PartySystem','Game_Troop_increaseTurn','addRemoveCommand','_forcedPartyActors','onReserveCancel','testBattlers','processCancel','_scene','faceWidth','updatePadding','index','iconWidth','_target','LockIcon','registerCommand','pendingIndex','addText','allMembers','setActor','drawItemDarkRect','maxItems','SceneManager_isPreviousSceneBattleTransitionable','pop','isPreviousScene','clamp','uiMenuStyle','update','paintOpacity','removeActorFromBattleMembers','_clickHandler','isPTB','drawSvActor','getParamValue','actorId','isETB','Window','MovePartyIndexToReserve','playOkSound','battlePartySwitchCooldown','exit','assistRemovePartyMember','drawActorName','defaultMaxBattleMembers','ActiveSpriteOffsetX','Status','10586552TzQdGv','commandPartyMemberSwitch','96vzMzhY','playCursorSound','Settings','isCancelEnabled','createCustomBackgroundImages','BgSettings','DrawBackRect','drawItemImageSvActor','Scene_Battle_createActorCommandWindow','requestRefresh','VisuMZ_2_BattleSystemETB','helpAreaHeight','5102884JuKdAf','_partySwitchDuration','activePartyWindowRect','addCustomCommands','itemHeight','_partyRequired','clearTpbChargeTime','STRUCT','VisuMZ_2_BattleSystemPTB','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','makeActions','rearrangePartyActors','statusLabelRect','stepForward','fillRect','paramValueByName','Actors','smoothSelect','partySwitchWindowRectBorder','Game_Party_removeActor','_callSceneParty','clearDamagePopup','statusParty','Lock','call','trim','changeLevel','_targets','ActivePartyLabelRect','1229733zLHFlN','followers','setBattler','itemRectWithPadding','shift','loadPartyImages','Game_Actor_canSwitchPartyInBattle_FP','increaseTurn','_actor','setBackgroundOpacity','playEquip','VisuMZ_2_BattleSystemCTB','VisuMZ_2_BattleGridSystem','BattleManager_setup','_activePartyWindow','commandFormation','_logWindow','startSwitchOutAnimation','Game_Party_rawBattleMembers_FP','startMove','TempCreatePartyNormal','onPartySwitchOk','ARRAYSTR','_pageupButton','RequirePartyMembers','random','isRequiredInParty','Game_Party_initialize','splice','Scene_Base_isAutosaveEnabled','MoveActorsToReserve','_lastIndex','VisuMZ_2_BattleSystemOTB','drawItemStatus','isAnyInputWindowActive','processDrawItem','isNextScene','loadFaceImages','height','Game_Battler_onBattleStart','22195UwcYSs','lineHeight','assistSortPartyMembers','initBattleMembers','systemColor','_statusPartyWindow','_backSprite2','BattlePartyCmd','setText','BattleHelpSwitch','drawItem','isFTB','allowEarlySwapOrderBreak','assistSwapPositions','name','text','_currentActor','Game_Party_reserveMembers_FP','isFormationCommandEnabled','characterName','battlePartyChangeIcon','AddRemoveCmd','ReservePartyWindowRect','actorParams','round','DisplayedParams','isPlaytest','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','battler','isRightInputMode','create','ARRAYJSON','updatePartySwitch','isSceneMap','callUpdateHelp','partySwitchWindowRect','NUM','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createBackground','ConvertParams','dimColor2','gradientFillRect','_partySystemBattleCommandCooldown','drawRemoveCommand','\x5cI[%1]%2','openness','StatusLabelRect','itemRect','callPartyMemberSwitch','_inputting','changeTextColor','commandStyle','initPartySystem','initEquips','_battleSystemIncompatibilityError','_tpbChargeTime','initialize','BackRectColor','isUsingGridSystem','drawParamName','addWindow','processPartySwitchMember','EVAL','right','isSTB','setHandler','isActor','map','_actors','AssistSwapOut','cancel','ChangeMaxBattleMembers','#%1','7WUPJQZ','isShiftShortcutEnabled','isEnabled','BgFilename2','ReservePartyGraphic','_helpWindow','removePartyMember','param','_windowLayer','gaugeBackColor','Game_Party_canSwitchPartyInBattle_FP','isFormationChangeOk','charged','_statusPartyLabel','drawActorPartyIconsHorz','currentActor','removePartyCommand','isTriggered','Temp:\x20Create\x20Temporary\x20Party\x20(JS)\x20Error','ARRAYEVAL','_backSprite1','otbReturnBattlerToTurnOrders','isShowPartySwitchOutAnimation','createActorCommandWindow','buttonAssistText4','battlerName','BattleHelpFormation','clearPartyBattleCommandCooldown','ensureCursorVisible','drawItemEmpty','terminate','Scene_Battle_createPartyCommandWindowBattleCore','Window_ActorCommand_updateHelp','padding','PartyCmdCooldown','removeActor','ActiveParty','ActorCmdWinAddParty','StatusWindowBgType','_otb_actionBattlersNext','includes','_callPartyMemberSwitch','_partySwitchTargetActor','Sprite_Actor_update','MaxBattleMembers','createReservePartyLabel','addCommand','ActorCmdCooldown','isUsingBattleGridTactics','min','SnapshotOpacity','addActorToBattleMembersAtIndex','center','createInnerSprite','bitmap','dimColor1','itemLineRect','max','getPartySystemBackColor','drawItemImage','windowPadding','actor','_actionBattlers','addActor','maxCols','_battleMaxSize','recoverAll','loadFace','addLoadListener','addPartyCommand','isQueueFormationMenu','equips','contents','battleMembers','isSceneBattle','description','StatusWindowRect','updateTurnOrderSTB','snapForBackground','battlePartySwitchCmdHelp','Game_Battler_regenerateAll','drawParamText','emptyPartyMember','buttonAssistKey3','drawItemImageFace','createForcedParty','Scene_Battle_createAllWindows','activate','General','parse','isFormationEnabled','format','swapOrder','requiredPartyMemberIcon','faceName','ReservePartyWindowBgType','processShiftRemoveShortcut','rawBattleMembers','BattlePartyIcon','setBackgroundType','hasBattleSystemIncompatibilities','checkShiftRemoveShortcut','VisuMZ_2_BattleSystemSTB','Game_Party_setupStartingMembers','battleLayoutStyle','swapOrderPartySystemPlugin','selectActor','version','isPreviousSceneBattleTransitionable','remove','_actorCommandWindow','itemPadding','addChild','postPartySwitchMenuTurnBased','replaceActionBattlersPartySwitch','hpColor','StatusLabelBgType','ceil','AssistSwapIn','Game_Party_addActor','face','select','reservePartyWindowRect','direction','ActivePartyGraphic','_partyCommandWindow','Game_Party_allMembers_FP','battlePartyChangeCmd','preparePartySwitchMember','sortActionOrdersBTB','drawActorPartyIcons','quickSwap','onBattleStart','isOTB','cursorUp','ReserveCol','VisuMZ_0_CoreEngine','partySwitchWindowRectStandard','createActivePartyWindow','createAllWindows','ReserveItemThickness','changeMaxBattleMembers','partyChangeRefresh','isCurrentItemEnabled','uiInputPosition','ReserveBattlerOffsetX','createPartyCommandWindowBattleCore','addFormationCommand','createStatusWindow','startSwitchInAnimation','ARRAYFUNC','anyRequiredPartyMembersInReserve','processCursorMove','ReserveBattlerOffsetY','toLowerCase','ActiveBattlerOffsetX','_partySwitchBattleCommandCooldown','SceneManager_isNextSceneBattleTransitionable','_actorGraphic','ActivePartyWindowRect','isNextSceneBattleTransitionable','isSceneParty','gridFlank','callFormation','clearPartySwitchCommandCooldown','isImmediateTpb','drawActorClass','createPageButtons','constructor','skillItemWindowRectBorderStyle','inBattle','VisuMZ_1_MainMenuCore','_subject','isCTB','refreshAllWindows','formation','drawItemImageSprite','BgFilename1'];_0x566a=function(){return _0x7b6716;};return _0x566a();}Window_PartyActive[_0x144c4d(0x1f9)]=Object[_0x144c4d(0x322)](Window_StatusBase[_0x144c4d(0x1f9)]),Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x1e2)]=Window_PartyActive,Window_PartyActive[_0x144c4d(0x1d8)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x2a7)][_0x144c4d(0x1b6)],Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x33c)]=function(_0x5f004a){const _0xc86148=_0x144c4d;Window_StatusBase[_0xc86148(0x1f9)][_0xc86148(0x33c)][_0xc86148(0x2d7)](this,_0x5f004a),this[_0xc86148(0x1fb)](),this['activate'](),this[_0xc86148(0x2d0)](0x0);},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x286)]=function(){const _0x531b48=_0x144c4d;return VisuMZ[_0x531b48(0x284)][_0x531b48(0x2b5)][_0x531b48(0x192)][_0x531b48(0x319)];},Window_PartyActive['prototype'][_0x144c4d(0x298)]=function(){const _0x5d1bbb=_0x144c4d;return $gameParty[_0x5d1bbb(0x238)]();},Window_PartyActive[_0x144c4d(0x1f9)]['maxCols']=function(){return $gameParty['maxBattleMembers']();},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x2c3)]=function(){const _0x2e6b15=_0x144c4d;return this[_0x2e6b15(0x269)];},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x38a)]=function(_0xebe03e){const _0x3fcf00=_0x144c4d;return $gameParty[_0x3fcf00(0x19b)]()[_0xebe03e];},Window_PartyActive['prototype'][_0x144c4d(0x35c)]=function(){const _0x196351=_0x144c4d;return this[_0x196351(0x38a)](this[_0x196351(0x28e)]());},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x1c9)]=function(){const _0x4459d5=_0x144c4d,_0x179668=this[_0x4459d5(0x38a)](this['index']());return _0x179668?_0x179668[_0x4459d5(0x358)]():!![];},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x2b6)]=function(){const _0x22450e=_0x144c4d;if($gameParty[_0x22450e(0x23c)]()[_0x22450e(0x255)]<=0x0)return!![];if($gameParty[_0x22450e(0x1d1)]())return![];return $gameParty[_0x22450e(0x183)]()[_0x22450e(0x255)]>0x0;},Window_PartyActive['prototype'][_0x144c4d(0x1d2)]=function(){const _0x265246=_0x144c4d;Window_StatusBase['prototype'][_0x265246(0x1d2)][_0x265246(0x2d7)](this),this[_0x265246(0x19f)]();},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x227)]=function(_0x1435e7){const _0x3bb5a1=_0x144c4d;this['isOkEnabled']()&&this[_0x3bb5a1(0x266)]();},Window_PartyActive['prototype']['cursorPagedown']=function(){const _0x206524=_0x144c4d,_0xeb204f=this[_0x206524(0x28e)](),_0x187b58=_0xeb204f+0x1>=this[_0x206524(0x298)]()?0x0:_0xeb204f+0x1;this['quickSwap'](_0xeb204f,_0x187b58);},Window_PartyActive['prototype'][_0x144c4d(0x273)]=function(){const _0x5d21cc=_0x144c4d,_0x4728a0=this[_0x5d21cc(0x28e)](),_0x1f1de7=_0x4728a0-0x1<0x0?this[_0x5d21cc(0x298)]()-0x1:_0x4728a0-0x1;this['quickSwap'](_0x4728a0,_0x1f1de7);},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x1bd)]=function(_0x3d133a,_0x3858a0){const _0x2f5576=_0x144c4d,_0x3759a0=this[_0x2f5576(0x38a)](_0x3d133a),_0x290d43=this[_0x2f5576(0x38a)](_0x3858a0);if(_0x3759a0&&!_0x3759a0[_0x2f5576(0x358)]())return;if(_0x290d43&&!_0x290d43['isFormationChangeOk']())return;const _0x37517d=$gameParty[_0x2f5576(0x268)];_0x37517d[_0x3d133a]=_0x290d43?_0x290d43[_0x2f5576(0x2a5)]():0x0,_0x37517d[_0x3858a0]=_0x3759a0?_0x3759a0[_0x2f5576(0x2a5)]():0x0,this[_0x2f5576(0x1fb)](),this[_0x2f5576(0x2b4)](),this[_0x2f5576(0x2d0)](_0x3858a0);},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x19f)]=function(){const _0x25e31a=_0x144c4d;if(!this[_0x25e31a(0x267)]())return;if(Input['isTriggered'](_0x25e31a(0x2e0))){const _0x533135=this[_0x25e31a(0x35c)]();this[_0x25e31a(0x19a)]();}},Window_PartyActive['prototype'][_0x144c4d(0x19a)]=function(){const _0x40eda4=_0x144c4d;SoundManager[_0x40eda4(0x2e6)]();const _0x50f4e4=this['currentActor']();$gameParty[_0x40eda4(0x2a0)](_0x50f4e4[_0x40eda4(0x2a5)]()),this[_0x40eda4(0x326)](),SceneManager['_scene'][_0x40eda4(0x1e8)]();},Window_PartyActive['prototype'][_0x144c4d(0x267)]=function(){const _0x379363=_0x144c4d;if(!this['addRemoveCommand']())return![];const _0x2fd6de=this[_0x379363(0x35c)]();return this['active']&&_0x2fd6de&&_0x2fd6de[_0x379363(0x358)]();},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x30e)]=function(_0x35d06a){const _0x370f7b=_0x144c4d,_0x1ce157=this['actor'](_0x35d06a);if(!_0x1ce157)return this[_0x370f7b(0x36a)](_0x35d06a);this['resetFontSettings']();const _0xe6aeb0=this[_0x370f7b(0x333)](_0x35d06a);this[_0x370f7b(0x388)](_0x35d06a);const _0x133664=_0xe6aeb0['y']+_0xe6aeb0[_0x370f7b(0x302)]-this['lineHeight']();this[_0x370f7b(0x209)](_0xe6aeb0['x'],_0x133664,_0xe6aeb0[_0x370f7b(0x257)],0x2),this[_0x370f7b(0x1bc)](_0x1ce157,_0xe6aeb0['x']+0x2,_0xe6aeb0['y']),this[_0x370f7b(0x2ad)](_0x1ce157,_0xe6aeb0['x'],_0x133664,_0xe6aeb0[_0x370f7b(0x257)]);},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x36a)]=function(_0x5e8921){const _0x4ceadb=_0x144c4d;this['resetFontSettings']();const _0x4f8890=this[_0x4ceadb(0x333)](_0x5e8921);this['drawItemDarkRect'](_0x4f8890['x'],_0x4f8890['y'],_0x4f8890[_0x4ceadb(0x257)],_0x4f8890[_0x4ceadb(0x302)]);const _0x4ebe7f=_0x4f8890['y']+Math['round']((_0x4f8890[_0x4ceadb(0x302)]-this[_0x4ceadb(0x305)]())/0x2);this['changeTextColor'](ColorManager[_0x4ceadb(0x308)]()),this[_0x4ceadb(0x22f)](TextManager[_0x4ceadb(0x18c)],_0x4f8890['x'],_0x4ebe7f,_0x4f8890[_0x4ceadb(0x257)],_0x4ceadb(0x381));},Window_PartyActive['prototype'][_0x144c4d(0x297)]=function(_0x215e9b,_0x407f9b,_0x4245c7,_0x5dfba5,_0x79dbca){const _0x92b7e4=_0x144c4d;_0x79dbca=Math['max'](_0x79dbca||0x1,0x1);while(_0x79dbca--){_0x5dfba5=_0x5dfba5||this[_0x92b7e4(0x305)](),this[_0x92b7e4(0x182)][_0x92b7e4(0x29f)]=0xa0;const _0x4d789b=ColorManager[_0x92b7e4(0x356)]();this[_0x92b7e4(0x182)][_0x92b7e4(0x2cd)](_0x215e9b+0x1,_0x407f9b+0x1,_0x4245c7-0x2,_0x5dfba5-0x2,_0x4d789b),this[_0x92b7e4(0x182)][_0x92b7e4(0x29f)]=0xff;}},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x388)]=function(_0x3aa489){const _0x24529d=_0x144c4d;switch(Window_PartyActive['_actorGraphic'][_0x24529d(0x1d4)]()[_0x24529d(0x2d8)]()){case _0x24529d(0x1b2):this[_0x24529d(0x18e)](_0x3aa489);break;case _0x24529d(0x282):this[_0x24529d(0x1ea)](_0x3aa489);break;case'svbattler':Imported[_0x24529d(0x1e5)]&&this['drawItemImageSvActor'](_0x3aa489);break;};},Window_PartyActive[_0x144c4d(0x1f9)]['drawItemImageFace']=function(_0x5c77fa){const _0x4ad3c8=_0x144c4d,_0x44bc0a=this[_0x4ad3c8(0x38a)](_0x5c77fa),_0x1b8e83=this[_0x4ad3c8(0x333)](_0x5c77fa),_0x11f91d=Math[_0x4ad3c8(0x37e)](ImageManager['faceWidth'],_0x1b8e83[_0x4ad3c8(0x257)]-0x2),_0x340c8c=_0x1b8e83['height']-0x2;this['changePaintOpacity'](_0x44bc0a[_0x4ad3c8(0x358)]());const _0xeebfb6=Math[_0x4ad3c8(0x31c)](_0x1b8e83['x']+(_0x1b8e83[_0x4ad3c8(0x257)]-_0x11f91d)/0x2);this['drawActorFace'](_0x44bc0a,_0xeebfb6,_0x1b8e83['y']+0x1,_0x11f91d,_0x340c8c),this['changePaintOpacity'](!![]);},Window_PartyActive['prototype'][_0x144c4d(0x1ea)]=function(_0x3fe58a){const _0x16291d=_0x144c4d,_0x11def2=this[_0x16291d(0x38a)](_0x3fe58a),_0x450c44=this['itemRect'](_0x3fe58a),_0x28d65c=VisuMZ['PartySystem']['Settings']['Window'],_0x407eea=_0x450c44['x']+Math[_0x16291d(0x31c)](_0x450c44[_0x16291d(0x257)]/0x2)+_0x28d65c[_0x16291d(0x2af)],_0x3c7919=_0x450c44['y']+_0x450c44[_0x16291d(0x302)]-this['lineHeight']()-_0x28d65c['ActiveSpriteOffsetY'];this['drawActorCharacter'](_0x11def2,_0x407eea,_0x3c7919);},Window_PartyActive[_0x144c4d(0x1f9)]['drawItemImageSvActor']=function(_0x290106){const _0x365809=_0x144c4d,_0x2671e7=this[_0x365809(0x38a)](_0x290106),_0x3be4d2=_0x2671e7[_0x365809(0x366)](),_0x5321bf=this[_0x365809(0x333)](_0x290106),_0x13f236=VisuMZ[_0x365809(0x284)][_0x365809(0x2b5)]['Window'],_0x2d3ce4=_0x5321bf['x']+Math['round'](_0x5321bf[_0x365809(0x257)]/0x2)+_0x13f236[_0x365809(0x1d5)],_0x2eba9e=_0x5321bf['y']+_0x5321bf[_0x365809(0x302)]-this[_0x365809(0x305)]()-_0x13f236[_0x365809(0x233)];this[_0x365809(0x2a3)](_0x3be4d2,_0x2d3ce4,_0x2eba9e);},Window_PartyActive[_0x144c4d(0x1f9)]['drawDarkRect']=function(_0x1dd0fe,_0x2d17f0,_0x29b788,_0x4a2fcb){const _0x14ac30=_0x144c4d,_0xc14074=ColorManager[_0x14ac30(0x384)](),_0x5877db=ColorManager[_0x14ac30(0x32c)](),_0x27fedc=_0x29b788/0x2,_0x574e0c=this[_0x14ac30(0x305)]();while(_0x4a2fcb--){this[_0x14ac30(0x182)][_0x14ac30(0x32d)](_0x1dd0fe,_0x2d17f0,_0x27fedc,_0x574e0c,_0x5877db,_0xc14074),this['contents'][_0x14ac30(0x32d)](_0x1dd0fe+_0x27fedc,_0x2d17f0,_0x27fedc,_0x574e0c,_0xc14074,_0x5877db);}},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x2ad)]=function(_0x5b928b,_0x396dbe,_0x2bb4d5,_0x159688){const _0x22ff35=_0x144c4d;_0x159688=_0x159688||0xa8,this[_0x22ff35(0x336)](ColorManager[_0x22ff35(0x1ad)](_0x5b928b)),this[_0x22ff35(0x22f)](_0x5b928b[_0x22ff35(0x312)](),_0x396dbe,_0x2bb4d5,_0x159688,_0x22ff35(0x381));},Window_PartyActive['prototype']['setStatusWindow']=function(_0x10de83){const _0x4cd405=_0x144c4d;this[_0x4cd405(0x278)]=_0x10de83,this[_0x4cd405(0x326)]();},Window_PartyActive[_0x144c4d(0x1f9)][_0x144c4d(0x326)]=function(){const _0x3c774a=_0x144c4d;if(this[_0x3c774a(0x278)])this[_0x3c774a(0x278)]['setActor'](this[_0x3c774a(0x38a)](this[_0x3c774a(0x28e)]()));};function Window_PartyReserve(){const _0xfb8c35=_0x144c4d;this[_0xfb8c35(0x33c)](...arguments);}Window_PartyReserve['prototype']=Object[_0x144c4d(0x322)](Window_StatusBase['prototype']),Window_PartyReserve['prototype'][_0x144c4d(0x1e2)]=Window_PartyReserve,Window_PartyReserve[_0x144c4d(0x1d8)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x2a7)][_0x144c4d(0x351)],Window_PartyReserve['_rowThickness']=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x2a7)][_0x144c4d(0x1c6)],Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x33c)]=function(_0x257086){const _0x3a878a=_0x144c4d;Window_StatusBase[_0x3a878a(0x1f9)][_0x3a878a(0x33c)][_0x3a878a(0x2d7)](this,_0x257086),this['_lastIndex']=0x0,this[_0x3a878a(0x1fb)]();},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x17a)]=function(){const _0x591a3b=_0x144c4d;return VisuMZ['PartySystem'][_0x591a3b(0x2b5)][_0x591a3b(0x2a7)][_0x591a3b(0x1c1)]||0x1;},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x2c3)]=function(){const _0x2a6acb=_0x144c4d;return this['lineHeight']()*Window_PartyReserve[_0x2a6acb(0x21f)]+0x6;},Window_PartyReserve['prototype'][_0x144c4d(0x286)]=function(){const _0x562381=_0x144c4d;return VisuMZ[_0x562381(0x284)][_0x562381(0x2b5)][_0x562381(0x192)][_0x562381(0x319)];},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x298)]=function(){const _0x3dc1ec=_0x144c4d;let _0x305368=$gameParty[_0x3dc1ec(0x206)]()['length'];if(this['addRemoveCommand']())_0x305368++;return _0x305368;},Window_PartyReserve['prototype'][_0x144c4d(0x38a)]=function(_0x5c7d39){const _0x654280=_0x144c4d;return $gameParty[_0x654280(0x206)]()[_0x5c7d39];},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x35c)]=function(){const _0x32899d=_0x144c4d;return this['actor'](this[_0x32899d(0x28e)]());},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x2a9)]=function(){const _0x349078=_0x144c4d;SoundManager[_0x349078(0x2e6)]();},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x1c9)]=function(){const _0x5657d6=_0x144c4d,_0x56a5af=this[_0x5657d6(0x38a)](this[_0x5657d6(0x28e)]());return _0x56a5af?_0x56a5af[_0x5657d6(0x358)]():!![];},Window_PartyReserve['prototype'][_0x144c4d(0x1d2)]=function(){const _0x3c8adf=_0x144c4d;Window_StatusBase[_0x3c8adf(0x1f9)][_0x3c8adf(0x1d2)][_0x3c8adf(0x2d7)](this),this['checkShiftSortShortcut']();},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x1c0)]=function(_0x57a606){const _0x4658aa=_0x144c4d;this['index']()<=0x0&&Input[_0x4658aa(0x35e)]('up')?this[_0x4658aa(0x28a)]():Window_StatusBase[_0x4658aa(0x1f9)]['cursorUp'][_0x4658aa(0x2d7)](this,_0x57a606);},Window_PartyReserve['prototype'][_0x144c4d(0x242)]=function(){const _0x2281e6=_0x144c4d,_0x4c71bf=this[_0x2281e6(0x28e)](),_0x574451=_0x4c71bf+0x1>=this[_0x2281e6(0x298)]()-0x1?0x0:_0x4c71bf+0x1;this[_0x2281e6(0x1bd)](_0x4c71bf,_0x574451);},Window_PartyReserve[_0x144c4d(0x1f9)]['cursorPageup']=function(){const _0x1c6c38=this['index'](),_0x396b49=_0x1c6c38-0x1<0x0?this['maxItems']()-0x2:_0x1c6c38-0x1;this['quickSwap'](_0x1c6c38,_0x396b49);},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x1bd)]=function(_0x59a824,_0x4af7cf){const _0x2c88c7=_0x144c4d,_0x2d9822=this[_0x2c88c7(0x38a)](_0x59a824),_0x348362=this['actor'](_0x4af7cf);if(!_0x2d9822?.[_0x2c88c7(0x358)]()||!_0x348362?.['isFormationChangeOk']())return;else{if(!_0x2d9822||!_0x348362)return;}const _0x223430=$gameParty[_0x2c88c7(0x348)],_0x1def7a=_0x223430[_0x2c88c7(0x22d)](_0x2d9822[_0x2c88c7(0x2a5)]()),_0x4f7ea4=_0x223430['indexOf'](_0x348362[_0x2c88c7(0x2a5)]());_0x223430[_0x1def7a]=_0x348362?_0x348362[_0x2c88c7(0x2a5)]():0x0,_0x223430[_0x4f7ea4]=_0x2d9822?_0x2d9822[_0x2c88c7(0x2a5)]():0x0,this['refresh'](),this[_0x2c88c7(0x2b4)](),this[_0x2c88c7(0x2d0)](_0x4af7cf);},Window_PartyReserve[_0x144c4d(0x1f9)]['checkShiftSortShortcut']=function(){const _0x3644d7=_0x144c4d;if(!this[_0x3644d7(0x34e)]())return;Input[_0x3644d7(0x35e)]('shift')&&this[_0x3644d7(0x1f4)]();},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x1f4)]=function(){const _0x5c8a36=_0x144c4d;SoundManager[_0x5c8a36(0x2e6)](),$gameParty[_0x5c8a36(0x21c)](),this[_0x5c8a36(0x2d0)](0x0),SceneManager['_scene']['refreshAllWindows']();},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x34e)]=function(){const _0x25adc3=_0x144c4d;return this[_0x25adc3(0x27c)];},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x293)]=function(){const _0x2dda9f=_0x144c4d,_0x360cd4=this[_0x2dda9f(0x35c)]();return _0x360cd4?_0x360cd4[_0x2dda9f(0x28e)]():-0x1;},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x1b3)]=function(_0x8ad035){const _0xde7ef8=_0x144c4d;Window_StatusBase[_0xde7ef8(0x1f9)]['select'][_0xde7ef8(0x2d7)](this,_0x8ad035);if(_0x8ad035>=0x0)this[_0xde7ef8(0x2fb)]=_0x8ad035;},Window_PartyReserve[_0x144c4d(0x1f9)]['reselect']=function(){const _0x11dc92=_0x144c4d;this[_0x11dc92(0x2fb)]=Math[_0x11dc92(0x37e)](this[_0x11dc92(0x2fb)],this[_0x11dc92(0x298)]()-0x1),this[_0x11dc92(0x2d0)](this[_0x11dc92(0x2fb)]),this[_0x11dc92(0x369)](!![]),this['cursorVisible']=!![];},Window_PartyReserve['prototype'][_0x144c4d(0x30e)]=function(_0x1382ad){const _0x253ec1=_0x144c4d,_0x587e87=this[_0x253ec1(0x38a)](_0x1382ad);if(!_0x587e87)return this[_0x253ec1(0x32f)](_0x1382ad);const _0x1905a5=this[_0x253ec1(0x385)](_0x1382ad);this['drawItemImage'](_0x1382ad);const _0x44422c=0xa8,_0x3d2222=Window_PartyReserve[_0x253ec1(0x21f)]===0x1,_0x89c584=ImageManager['iconWidth']*(_0x3d2222?0x2:0x1),_0x329486=this['nameStartPosition']()+this['itemPadding'](),_0x429ba7=_0x1905a5['width']-_0x44422c,_0x31e484=_0x1905a5['x']+_0x89c584+Math['min'](_0x329486,_0x429ba7),_0x1ef795=_0x3d2222?![]:!![];this[_0x253ec1(0x234)](_0x587e87['isFormationChangeOk']()),this[_0x253ec1(0x1bc)](_0x587e87,_0x1905a5['x'],_0x1905a5['y'],_0x1ef795),this[_0x253ec1(0x2ad)](_0x587e87,_0x31e484,_0x1905a5['y'],_0x44422c),this[_0x253ec1(0x234)](!![]);},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x260)]=function(){const _0x54ebd3=_0x144c4d,_0x43fc31=VisuMZ[_0x54ebd3(0x284)][_0x54ebd3(0x2b5)][_0x54ebd3(0x2a7)];switch(Window_PartyReserve[_0x54ebd3(0x1d8)][_0x54ebd3(0x1d4)]()[_0x54ebd3(0x2d8)]()){case'face':return ImageManager[_0x54ebd3(0x28c)];case _0x54ebd3(0x282):return _0x43fc31['ReserveSpriteOffsetX']*0x2;case _0x54ebd3(0x203):return _0x43fc31[_0x54ebd3(0x1cb)]*0x2;};},Window_PartyReserve['prototype']['drawRemoveCommand']=function(_0x4430e){const _0x43ad17=_0x144c4d,_0x4588c5=this[_0x43ad17(0x385)](_0x4430e);this[_0x43ad17(0x234)](!![]);const _0x1f3515=TextManager[_0x43ad17(0x353)];this[_0x43ad17(0x22f)](_0x1f3515,_0x4588c5['x'],_0x4588c5['y'],_0x4588c5[_0x43ad17(0x257)],'center');},Window_PartyReserve['prototype']['drawItemImage']=function(_0x33ce16){const _0x32279a=_0x144c4d;switch(Window_PartyReserve['_actorGraphic']['toLowerCase']()[_0x32279a(0x2d8)]()){case'face':this[_0x32279a(0x18e)](_0x33ce16);break;case _0x32279a(0x282):this[_0x32279a(0x1ea)](_0x33ce16);break;case _0x32279a(0x203):Imported[_0x32279a(0x1e5)]&&this[_0x32279a(0x2ba)](_0x33ce16);break;};},Window_PartyReserve[_0x144c4d(0x1f9)][_0x144c4d(0x18e)]=function(_0x41da8d){const _0x4814b7=_0x144c4d,_0x51050d=this[_0x4814b7(0x38a)](_0x41da8d),_0x502690=this[_0x4814b7(0x333)](_0x41da8d),_0x3d80c0=Window_PartyReserve['_rowThickness']===0x1;_0x502690['x']+=ImageManager[_0x4814b7(0x28f)]*(_0x3d80c0?0x2:0x1);const _0x553f68=ImageManager[_0x4814b7(0x28c)],_0x73e561=_0x502690[_0x4814b7(0x302)]-0x2;this[_0x4814b7(0x234)](_0x51050d[_0x4814b7(0x358)]()),this['drawActorFace'](_0x51050d,_0x502690['x']+0x1,_0x502690['y']+0x1,_0x553f68,_0x73e561),this[_0x4814b7(0x234)](!![]);},Window_PartyReserve['prototype'][_0x144c4d(0x1ea)]=function(_0x2b3e63){const _0xbf5081=_0x144c4d,_0x4bcc6c=this[_0xbf5081(0x38a)](_0x2b3e63),_0x4c023f=this[_0xbf5081(0x333)](_0x2b3e63),_0x4c859c=Window_PartyReserve[_0xbf5081(0x21f)]===0x1;_0x4c023f['x']+=ImageManager['iconWidth']*(_0x4c859c?0x2:0x1);const _0x458dae=VisuMZ[_0xbf5081(0x284)][_0xbf5081(0x2b5)]['Window'],_0xf0aa0f=_0x4c023f['x']+_0x458dae['ReserveSpriteOffsetX']+this[_0xbf5081(0x1a9)](),_0x254bc3=_0x4c023f['y']+_0x4c023f[_0xbf5081(0x302)]-_0x458dae['ReserveSpriteOffsetY'];this['drawActorCharacter'](_0x4bcc6c,_0xf0aa0f,_0x254bc3);},Window_PartyReserve['prototype'][_0x144c4d(0x2ba)]=function(_0x252c13){const _0x207932=_0x144c4d,_0x32749f=this[_0x207932(0x38a)](_0x252c13),_0x352fc9=_0x32749f['battlerName'](),_0x511832=this[_0x207932(0x333)](_0x252c13),_0x12299b=Window_PartyReserve[_0x207932(0x21f)]===0x1;_0x511832['x']+=ImageManager[_0x207932(0x28f)]*(_0x12299b?0x2:0x1);const _0x4fe15c=VisuMZ[_0x207932(0x284)][_0x207932(0x2b5)][_0x207932(0x2a7)],_0x26fa32=_0x511832['x']+_0x4fe15c[_0x207932(0x1cb)]+this[_0x207932(0x1a9)](),_0x3b67ca=_0x511832['y']+_0x511832['height']-_0x4fe15c[_0x207932(0x1d3)];this['drawSvActor'](_0x352fc9,_0x26fa32,_0x3b67ca);},Window_PartyReserve[_0x144c4d(0x1f9)]['setStatusWindow']=function(_0x234b56){const _0x37b46d=_0x144c4d;this[_0x37b46d(0x278)]=_0x234b56,this[_0x37b46d(0x326)]();},Window_PartyReserve['prototype'][_0x144c4d(0x326)]=function(){const _0x5003bc=_0x144c4d;this['_statusWindow']&&this[_0x5003bc(0x278)]['setActor'](this[_0x5003bc(0x38a)](this[_0x5003bc(0x28e)]()));};function Window_PartyStatus(){const _0x3b0723=_0x144c4d;this[_0x3b0723(0x33c)](...arguments);}Window_PartyStatus[_0x144c4d(0x1f9)]=Object['create'](Window_StatusBase['prototype']),Window_PartyStatus[_0x144c4d(0x1f9)]['constructor']=Window_PartyStatus,Window_PartyStatus['prototype']['initialize']=function(_0x1a685c){const _0x537d84=_0x144c4d;this[_0x537d84(0x2e4)]=null,Window_StatusBase[_0x537d84(0x1f9)][_0x537d84(0x33c)][_0x537d84(0x2d7)](this,_0x1a685c);},Window_PartyStatus[_0x144c4d(0x1f9)][_0x144c4d(0x297)]=function(_0x57292,_0x42b98f,_0x134a73,_0x307c31,_0x3051d6){const _0x3969e0=_0x144c4d;if(VisuMZ[_0x3969e0(0x284)][_0x3969e0(0x2b5)][_0x3969e0(0x192)][_0x3969e0(0x2b9)]===![])return;_0x3051d6=Math[_0x3969e0(0x386)](_0x3051d6||0x1,0x1);while(_0x3051d6--){_0x307c31=_0x307c31||this[_0x3969e0(0x305)](),this[_0x3969e0(0x182)][_0x3969e0(0x29f)]=0xa0;const _0xf187d0=ColorManager[_0x3969e0(0x387)]();this['contents'][_0x3969e0(0x2cd)](_0x57292+0x1,_0x42b98f+0x1,_0x134a73-0x2,_0x307c31-0x2,_0xf187d0),this[_0x3969e0(0x182)][_0x3969e0(0x29f)]=0xff;}},ColorManager[_0x144c4d(0x387)]=function(){const _0x213869=_0x144c4d,_0x3441ce=VisuMZ[_0x213869(0x284)][_0x213869(0x2b5)][_0x213869(0x192)];let _0xc670f1=_0x3441ce[_0x213869(0x33d)]!==undefined?_0x3441ce[_0x213869(0x33d)]:0x13;return ColorManager[_0x213869(0x21a)](_0xc670f1);},Window_PartyStatus[_0x144c4d(0x1f9)][_0x144c4d(0x296)]=function(_0x397afe){const _0x312296=_0x144c4d;if(this['_actor']===_0x397afe)return;this[_0x312296(0x2e4)]=_0x397afe;if(_0x397afe){const _0x14b0e4=ImageManager[_0x312296(0x17d)](_0x397afe[_0x312296(0x198)]());_0x14b0e4[_0x312296(0x17e)](this[_0x312296(0x1fb)][_0x312296(0x23a)](this));}else this[_0x312296(0x1fb)]();},Window_PartyStatus['prototype'][_0x144c4d(0x1fb)]=function(){const _0x16186c=_0x144c4d;Window_StatusBase[_0x16186c(0x1f9)][_0x16186c(0x1fb)]['call'](this),this[_0x16186c(0x182)][_0x16186c(0x21e)](),this['resetFontSettings'](),VisuMZ[_0x16186c(0x284)][_0x16186c(0x2b5)][_0x16186c(0x2a7)][_0x16186c(0x262)]['call'](this);},Window_PartyStatus[_0x144c4d(0x1f9)]['refreshOG']=function(){const _0x370e24=_0x144c4d;if(!this[_0x370e24(0x2e4)]){this[_0x370e24(0x297)](0x0,0x0,this[_0x370e24(0x239)],this[_0x370e24(0x269)]);const _0x3281d3=Math[_0x370e24(0x31c)]((this[_0x370e24(0x269)]-this[_0x370e24(0x305)]())/0x2);this[_0x370e24(0x336)](ColorManager[_0x370e24(0x308)]()),this['drawText'](TextManager[_0x370e24(0x18c)],0x0,_0x3281d3,this[_0x370e24(0x239)],_0x370e24(0x381));return;}this[_0x370e24(0x272)](this[_0x370e24(0x2e4)],0x1,0x0,ImageManager[_0x370e24(0x28c)],ImageManager[_0x370e24(0x250)]),this[_0x370e24(0x224)](this['_actor'],ImageManager[_0x370e24(0x28c)]+0x24,0x0);const _0x500c7d=this[_0x370e24(0x305)](),_0x5b47db=this[_0x370e24(0x31b)](),_0x2fbec5=Math['round'](this[_0x370e24(0x239)]/0x2),_0x368b5f=Math[_0x370e24(0x1af)](_0x5b47db[_0x370e24(0x255)]/0x2)*_0x500c7d,_0x2dadaa=0x0;let _0x1b70d6=0x0,_0x396a5f=ImageManager[_0x370e24(0x250)]+_0x500c7d/0x2;for(const _0x494c42 of _0x5b47db){this[_0x370e24(0x297)](_0x1b70d6,_0x396a5f,_0x2fbec5,_0x500c7d),this[_0x370e24(0x33f)](_0x494c42,_0x1b70d6,_0x396a5f,_0x2fbec5),this['drawParamValue'](_0x494c42,_0x1b70d6,_0x396a5f,_0x2fbec5),_0x1b70d6===_0x2dadaa?_0x1b70d6+=_0x2fbec5:(_0x1b70d6=_0x2dadaa,_0x396a5f+=_0x500c7d);}},Window_PartyStatus[_0x144c4d(0x1f9)][_0x144c4d(0x31b)]=function(){const _0x29921d=_0x144c4d;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x29921d(0x253)]['Settings']['Param'][_0x29921d(0x31d)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0x144c4d(0x1f9)][_0x144c4d(0x33f)]=function(_0x34deea,_0x3060fe,_0x5e0f29,_0xc5c2ad){const _0x5deb8a=_0x144c4d,_0x1dd83d=this[_0x5deb8a(0x1a9)]();_0xc5c2ad-=_0x1dd83d*0x2;if(Imported['VisuMZ_0_CoreEngine'])this[_0x5deb8a(0x18b)](_0x3060fe+_0x1dd83d,_0x5e0f29,_0xc5c2ad,_0x34deea,![]);else{const _0x5d8b47=TextManager[_0x5deb8a(0x354)](_0x34deea);this[_0x5deb8a(0x336)](ColorManager[_0x5deb8a(0x308)]()),this['drawText'](_0x5d8b47,_0x3060fe+_0x1dd83d,_0x5e0f29,_0xc5c2ad);}},Window_PartyStatus[_0x144c4d(0x1f9)]['drawParamValue']=function(_0x2c0719,_0x5193fe,_0x16653d,_0x492391){const _0x2353cd=_0x144c4d;this['resetFontSettings']();const _0x24e10e=this['itemPadding'](),_0x2fe5c9=this['getParamValue'](_0x2c0719);this[_0x2353cd(0x22f)](_0x2fe5c9,_0x5193fe+_0x24e10e,_0x16653d,_0x492391-_0x24e10e*0x2,_0x2353cd(0x343));},Window_PartyStatus[_0x144c4d(0x1f9)][_0x144c4d(0x2a4)]=function(_0x4e4914){const _0x4190fa=_0x144c4d,_0x29f993=this[_0x4190fa(0x2e4)];return Imported[_0x4190fa(0x1c2)]?_0x29f993[_0x4190fa(0x2ce)](_0x4e4914,!![]):_0x29f993['param'](_0x4e4914);};function Window_PartyBattleSwitch(){const _0x5d7081=_0x144c4d;this[_0x5d7081(0x33c)](...arguments);}function _0x52ee(_0x2b45a9,_0x82346a){const _0x566a54=_0x566a();return _0x52ee=function(_0x52ee3b,_0x6df29d){_0x52ee3b=_0x52ee3b-0x17a;let _0x1476e3=_0x566a54[_0x52ee3b];return _0x1476e3;},_0x52ee(_0x2b45a9,_0x82346a);}Window_PartyBattleSwitch['prototype']=Object[_0x144c4d(0x322)](Window_StatusBase[_0x144c4d(0x1f9)]),Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x1e2)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x33c)]=function(_0x47a7aa){const _0x426533=_0x144c4d;Window_StatusBase[_0x426533(0x1f9)][_0x426533(0x33c)]['call'](this,_0x47a7aa),this['setBackgroundType'](VisuMZ[_0x426533(0x284)][_0x426533(0x2b5)][_0x426533(0x2a7)][_0x426533(0x232)]),this[_0x426533(0x331)]=0x0;},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x301)]=function(){const _0x2c5316=_0x144c4d;for(const _0x3500c3 of $gameParty[_0x2c5316(0x295)]()){ImageManager[_0x2c5316(0x17d)](_0x3500c3[_0x2c5316(0x198)]());}},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x17a)]=function(){return 0x1;},Window_PartyBattleSwitch['prototype'][_0x144c4d(0x38a)]=function(_0x4c45cf){const _0x4f0f8a=_0x144c4d;return $gameParty[_0x4f0f8a(0x206)]()[_0x4c45cf];},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x35c)]=function(){const _0x4a6321=_0x144c4d;return this[_0x4a6321(0x38a)](this[_0x4a6321(0x28e)]());},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x2c3)]=function(){const _0x3b6030=_0x144c4d;return this[_0x3b6030(0x305)]()*0x2+0x8;},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x298)]=function(){const _0x24be0e=_0x144c4d;return $gameParty[_0x24be0e(0x206)]()[_0x24be0e(0x255)];},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x191)]=function(){const _0x48bb06=_0x144c4d;Window_StatusBase[_0x48bb06(0x1f9)][_0x48bb06(0x191)]['call'](this),this['open'](),this[_0x48bb06(0x1fb)](),this[_0x48bb06(0x2d0)](0x0);},Window_PartyBattleSwitch[_0x144c4d(0x1f9)]['deactivate']=function(){const _0x511cc8=_0x144c4d;Window_StatusBase[_0x511cc8(0x1f9)][_0x511cc8(0x26d)][_0x511cc8(0x2d7)](this),this[_0x511cc8(0x24f)]();},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x1c9)]=function(){const _0xecd6cb=_0x144c4d;return this[_0xecd6cb(0x34f)](this[_0xecd6cb(0x35c)]());},Window_PartyBattleSwitch[_0x144c4d(0x1f9)]['isEnabled']=function(_0x402ebf){const _0x14c902=_0x144c4d;if(!_0x402ebf)return![];return _0x402ebf[_0x14c902(0x358)]()&&_0x402ebf['isAlive']();},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x30e)]=function(_0x7ba166){const _0x6505a8=_0x144c4d,_0x44b16d=this['actor'](_0x7ba166);if(!_0x44b16d)return;const _0xb90f1d=ImageManager[_0x6505a8(0x17d)](_0x44b16d['faceName']());_0xb90f1d[_0x6505a8(0x17e)](this[_0x6505a8(0x2ff)][_0x6505a8(0x23a)](this,_0x7ba166));},Window_PartyBattleSwitch['prototype'][_0x144c4d(0x2ff)]=function(_0x351b8c){const _0x31be64=_0x144c4d;this[_0x31be64(0x388)](_0x351b8c),this['drawItemStatus'](_0x351b8c);},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x388)]=function(_0x158c87){const _0x24ac14=_0x144c4d,_0x5481bf=this[_0x24ac14(0x38a)](_0x158c87),_0x2a4fdb=this[_0x24ac14(0x333)](_0x158c87);this['changePaintOpacity'](this[_0x24ac14(0x34f)](_0x5481bf)),this['drawActorFace'](_0x5481bf,_0x2a4fdb['x']+0x1,_0x2a4fdb['y']+0x1,ImageManager[_0x24ac14(0x28c)],_0x2a4fdb['height']-0x2),this[_0x24ac14(0x234)](!![]);},Window_PartyBattleSwitch[_0x144c4d(0x1f9)][_0x144c4d(0x2fd)]=function(_0x49fa3f){const _0x261bf9=_0x144c4d,_0x460bf1=this[_0x261bf9(0x38a)](_0x49fa3f),_0x1a0450=this[_0x261bf9(0x2df)](_0x49fa3f),_0x4253f6=_0x1a0450['x']+ImageManager['faceWidth']+0x24,_0x4d224e=_0x4253f6+0xb4;this[_0x261bf9(0x234)](this[_0x261bf9(0x34f)](_0x460bf1)),this[_0x261bf9(0x2ad)](_0x460bf1,_0x4253f6,_0x1a0450['y']),this[_0x261bf9(0x1e0)](_0x460bf1,_0x4253f6,_0x1a0450['y']+this[_0x261bf9(0x305)]()),this['placeBasicGauges'](_0x460bf1,_0x4d224e,_0x1a0450['y']),this[_0x261bf9(0x234)](!![]);};Imported[_0x144c4d(0x277)]&&(ImageManager[_0x144c4d(0x318)]=VisuMZ[_0x144c4d(0x284)]['Settings']['General'][_0x144c4d(0x19c)]??0x4b,TextManager[_0x144c4d(0x1b9)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab'][_0x144c4d(0x30b)],TextManager[_0x144c4d(0x1f8)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Vocab'][_0x144c4d(0x367)],TextManager[_0x144c4d(0x1f2)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)]['BattleSwitchOut'],TextManager[_0x144c4d(0x189)]=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)][_0x144c4d(0x30d)],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x274)]['QueuePartyScene'],VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x299)]=SceneManager[_0x144c4d(0x1a6)],SceneManager['isPreviousSceneBattleTransitionable']=function(){const _0x156fd4=_0x144c4d;if(SceneManager['isPreviousScene'](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x156fd4(0x299)][_0x156fd4(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x1d7)]=SceneManager[_0x144c4d(0x1da)],SceneManager[_0x144c4d(0x1da)]=function(){const _0x4d3ca3=_0x144c4d;if(SceneManager[_0x4d3ca3(0x300)](Scene_Party))return!![];return VisuMZ[_0x4d3ca3(0x284)][_0x4d3ca3(0x1d7)][_0x4d3ca3(0x2d7)](this);},SceneManager['isSceneMap']=function(){const _0x5d560f=_0x144c4d;return this[_0x5d560f(0x28b)]&&this[_0x5d560f(0x28b)][_0x5d560f(0x1e2)]===Scene_Map;},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x190)]=Scene_Battle[_0x144c4d(0x1f9)]['createAllWindows'],Scene_Battle['prototype'][_0x144c4d(0x1c5)]=function(){const _0x209964=_0x144c4d;VisuMZ['PartySystem'][_0x209964(0x190)][_0x209964(0x2d7)](this),this[_0x209964(0x200)](),this[_0x209964(0x22e)](),this[_0x209964(0x1ab)]();},Scene_Battle[_0x144c4d(0x1f9)]['createPartySwitchWindow']=function(){const _0x389211=_0x144c4d,_0x376ed2=this[_0x389211(0x327)]();this[_0x389211(0x244)]=new Window_PartyBattleSwitch(_0x376ed2),this[_0x389211(0x340)](this['_partyMemberSwitchWindow']),this[_0x389211(0x244)][_0x389211(0x345)]('ok',this[_0x389211(0x2f1)][_0x389211(0x23a)](this)),this[_0x389211(0x244)][_0x389211(0x345)](_0x389211(0x34a),this[_0x389211(0x236)][_0x389211(0x23a)](this));},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x327)]=function(){const _0x48aab8=_0x144c4d,_0x5cc877=this[_0x48aab8(0x1a2)]();return _0x5cc877==='border'?this[_0x48aab8(0x2d1)]():this[_0x48aab8(0x1c3)]();},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x1c3)]=function(){const _0x5ce047=_0x144c4d;return VisuMZ[_0x5ce047(0x284)][_0x5ce047(0x2b5)][_0x5ce047(0x2a7)][_0x5ce047(0x24c)][_0x5ce047(0x2d7)](this);},Scene_Battle['prototype']['partySwitchWindowRectBorder']=function(){const _0x271b65=_0x144c4d,_0x30ec76=this[_0x271b65(0x1e3)](),_0x410936=$gameSystem[_0x271b65(0x389)]()*0x2;return _0x30ec76[_0x271b65(0x257)]=0x204+_0x410936,_0x30ec76;},VisuMZ['PartySystem']['Scene_Battle_isAnyInputWindowActive']=Scene_Battle['prototype'][_0x144c4d(0x2fe)],Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x2fe)]=function(){const _0x3d14d6=_0x144c4d;if(this[_0x3d14d6(0x244)]&&this[_0x3d14d6(0x244)][_0x3d14d6(0x27c)])return!![];if(this['_partySystemSwitchOut'])return!![];if(this[_0x3d14d6(0x376)])return!![];if(this[_0x3d14d6(0x2d3)])return!![];return VisuMZ[_0x3d14d6(0x284)]['Scene_Battle_isAnyInputWindowActive'][_0x3d14d6(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x36c)]=Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x1cc)],Scene_Battle['prototype'][_0x144c4d(0x1cc)]=function(){const _0x27faed=_0x144c4d;VisuMZ[_0x27faed(0x284)][_0x27faed(0x36c)][_0x27faed(0x2d7)](this),this[_0x27faed(0x1b7)][_0x27faed(0x345)](_0x27faed(0x1e9),this[_0x27faed(0x2eb)]['bind'](this));},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x2eb)]=function(){const _0x57ade3=_0x144c4d;this['isQueueFormationMenu']()?(this[_0x57ade3(0x2d3)]=!![],this[_0x57ade3(0x2ec)]['addText'](TextManager['ActiveTpbFormationMessage'][_0x57ade3(0x195)](TextManager['formation']))):this[_0x57ade3(0x1dd)]();},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x180)]=function(){return BattleManager['isActiveTpb']();},Scene_Battle[_0x144c4d(0x1f9)]['callFormation']=function(){const _0x19b187=_0x144c4d;this[_0x19b187(0x2d3)]=![],this['_spriteset'][_0x19b187(0x29e)](),this[_0x19b187(0x355)]['visible']=![],SceneManager[_0x19b187(0x188)](),SceneManager[_0x19b187(0x1f1)](Scene_Party),$gameParty[_0x19b187(0x276)](),BattleManager[_0x19b187(0x26b)]()&&(BattleManager[_0x19b187(0x228)]=BattleManager[_0x19b187(0x38a)]());},VisuMZ['PartySystem'][_0x144c4d(0x202)]=Scene_Battle['prototype'][_0x144c4d(0x235)],Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x235)]=function(){const _0x3acb89=_0x144c4d;VisuMZ['PartySystem']['Scene_Battle_updateBattleProcess']['call'](this),this[_0x3acb89(0x2d3)]&&!BattleManager[_0x3acb89(0x1e6)]&&this['callFormation'](),this[_0x3acb89(0x376)]&&!BattleManager[_0x3acb89(0x1e6)]&&this[_0x3acb89(0x334)]();},VisuMZ[_0x144c4d(0x284)]['Scene_Battle_isTimeActive']=Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x212)],Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x212)]=function(){const _0x4e3954=_0x144c4d;if(BattleManager['isActiveTpb']()){if(this[_0x4e3954(0x244)]&&this[_0x4e3954(0x244)][_0x4e3954(0x27c)])return![];}return VisuMZ[_0x4e3954(0x284)][_0x4e3954(0x23f)][_0x4e3954(0x2d7)](this);},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2bb)]=Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x364)],Scene_Battle['prototype'][_0x144c4d(0x364)]=function(){const _0x2ccbcf=_0x144c4d;VisuMZ[_0x2ccbcf(0x284)][_0x2ccbcf(0x2bb)]['call'](this),this[_0x2ccbcf(0x1a8)][_0x2ccbcf(0x345)](_0x2ccbcf(0x1e9),this[_0x2ccbcf(0x2b2)][_0x2ccbcf(0x23a)](this));},Scene_Battle[_0x144c4d(0x1f9)]['commandPartyMemberSwitch']=function(){const _0x288411=_0x144c4d;this[_0x288411(0x180)]()?(this[_0x288411(0x376)]=!![],this[_0x288411(0x2ec)][_0x288411(0x294)](TextManager[_0x288411(0x264)]['format'](TextManager[_0x288411(0x1e9)]))):this[_0x288411(0x334)]();},Scene_Battle[_0x144c4d(0x1f9)]['callPartyMemberSwitch']=function(){const _0x48bcb3=_0x144c4d;this[_0x48bcb3(0x376)]=![],this['_logWindow'][_0x48bcb3(0x21e)](),BattleManager['actor']()&&this[_0x48bcb3(0x244)][_0x48bcb3(0x191)]();},Scene_Battle[_0x144c4d(0x1f9)]['onPartySwitchOk']=function(){const _0x307fcf=_0x144c4d,_0x3327fe=this['_partyMemberSwitchWindow']['currentActor']();_0x3327fe?this[_0x307fcf(0x1ba)](_0x3327fe):(this[_0x307fcf(0x244)]['deactivate'](),this[_0x307fcf(0x1a8)][_0x307fcf(0x191)]());},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x1ba)]=function(_0x554a04){const _0x44fd25=_0x144c4d,_0x4d4fa0=BattleManager['actor'](),_0x58d14e=_0x4d4fa0['battler']();this[_0x44fd25(0x244)]['deactivate'](),this[_0x44fd25(0x363)]()&&_0x58d14e?(this[_0x44fd25(0x1ff)]=!![],_0x58d14e[_0x44fd25(0x2ed)](_0x554a04)):this['processPartySwitchMember'](_0x554a04);},Scene_Battle['prototype'][_0x144c4d(0x363)]=function(){const _0x2fa787=_0x144c4d;return VisuMZ[_0x2fa787(0x284)][_0x2fa787(0x2b5)]['General']['SwitchOutAnimation'];},Scene_Battle[_0x144c4d(0x1f9)]['processPartySwitchMember']=function(_0x2849f9){const _0x21d423=_0x144c4d;this[_0x21d423(0x1ff)]=![];const _0xe0e487=BattleManager[_0x21d423(0x38a)](),_0x424384=_0xe0e487[_0x21d423(0x320)](),_0x3553ab=$gameParty[_0x21d423(0x268)][_0x21d423(0x22d)](_0xe0e487[_0x21d423(0x2a5)]());$gameParty[_0x21d423(0x268)][_0x3553ab]=_0x2849f9[_0x21d423(0x2a5)](),$gameParty['partyChangeRefresh']();if(this[_0x21d423(0x1df)]())_0x2849f9[_0x21d423(0x33b)]=_0xe0e487[_0x21d423(0x33b)],_0x2849f9['_tpbState']=_0x21d423(0x359);else BattleManager['isTpb']()&&_0x2849f9[_0x21d423(0x2c5)]();BattleManager[_0x21d423(0x314)]=_0x2849f9,BattleManager['updateTargetsForPartySwitch'](_0xe0e487,_0x2849f9),_0x2849f9[_0x21d423(0x276)](),_0x2849f9[_0x21d423(0x2c9)](),_0x2849f9[_0x21d423(0x25e)](_0xe0e487),_0x424384&&_0x424384[_0x21d423(0x2de)](_0x2849f9),this['_statusWindow'][_0x21d423(0x23d)](_0xe0e487,_0x2849f9),this[_0x21d423(0x278)]['refresh'](),this[_0x21d423(0x1a8)]['setup'](_0x2849f9),this[_0x21d423(0x1a8)][_0x21d423(0x2d0)](0x0),this['_actorCommandWindow']['activate'](),this[_0x21d423(0x1a8)][_0x21d423(0x207)]=!![];},Scene_Battle['prototype'][_0x144c4d(0x1df)]=function(){const _0x3e90ec=_0x144c4d;if(!BattleManager[_0x3e90ec(0x26b)]())return![];const _0x450169=VisuMZ[_0x3e90ec(0x284)]['Settings']['General'];return _0x450169[_0x3e90ec(0x217)]===undefined&&(_0x450169[_0x3e90ec(0x217)]=!![]),_0x450169[_0x3e90ec(0x217)];},Window_StatusBase[_0x144c4d(0x1f9)][_0x144c4d(0x23d)]=function(_0x54d23f,_0x5592b1){const _0x4e4b66=_0x144c4d,_0x4a51fc='actor%1-stateIcon'['format'](_0x54d23f[_0x4e4b66(0x2a5)]()),_0x8b2f79=this[_0x4e4b66(0x382)](_0x4a51fc,Sprite_StateIcon);_0x8b2f79[_0x4e4b66(0x246)](_0x5592b1);},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x236)]=function(){const _0x2e0693=_0x144c4d;this['_partyMemberSwitchWindow'][_0x2e0693(0x26d)](),this[_0x2e0693(0x1a8)][_0x2e0693(0x191)](),this[_0x2e0693(0x1a8)][_0x2e0693(0x1fb)]();},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x22e)]=function(){const _0x4985ae=_0x144c4d;if(!BattleManager[_0x4985ae(0x26b)]())return;if(!SceneManager[_0x4985ae(0x29b)](Scene_Party))return;this['_partyCommandWindow']['deactivate'](),this[_0x4985ae(0x1b7)][_0x4985ae(0x24f)](),this['_actorCommandWindow'][_0x4985ae(0x26d)](),this[_0x4985ae(0x1a8)]['close'](),BattleManager[_0x4985ae(0x314)]=null,BattleManager[_0x4985ae(0x335)]=![];},Scene_Battle[_0x144c4d(0x1f9)][_0x144c4d(0x1ab)]=function(){const _0x2b492f=_0x144c4d;if(BattleManager['isTpb']())return;if(!SceneManager[_0x2b492f(0x29b)](Scene_Party))return;Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager[_0x2b492f(0x254)]()&&BattleManager[_0x2b492f(0x245)](),Imported[_0x2b492f(0x230)]&&BattleManager['isFTB']()&&(BattleManager[_0x2b492f(0x245)](),BattleManager[_0x2b492f(0x314)]=$gameParty['teamBasedFirstAvailableMember'](),BattleManager[_0x2b492f(0x1e6)]=BattleManager[_0x2b492f(0x38a)](),BattleManager[_0x2b492f(0x335)]=!![],this[_0x2b492f(0x1a8)][_0x2b492f(0x246)](BattleManager['actor']()),this[_0x2b492f(0x278)][_0x2b492f(0x1a4)](BattleManager[_0x2b492f(0x38a)]())),Imported[_0x2b492f(0x2bd)]&&BattleManager['isETB']()&&(BattleManager[_0x2b492f(0x245)](),BattleManager[_0x2b492f(0x314)]=$gameParty[_0x2b492f(0x1f7)](),BattleManager['_subject']=BattleManager[_0x2b492f(0x38a)](),BattleManager[_0x2b492f(0x335)]=!![],this['_actorCommandWindow'][_0x2b492f(0x246)](BattleManager[_0x2b492f(0x38a)]()),this[_0x2b492f(0x278)][_0x2b492f(0x1a4)](BattleManager[_0x2b492f(0x38a)]())),Imported[_0x2b492f(0x2c7)]&&BattleManager[_0x2b492f(0x2a2)]()&&(BattleManager[_0x2b492f(0x245)](),BattleManager[_0x2b492f(0x314)]=$gameParty[_0x2b492f(0x1f7)](),BattleManager['_subject']=BattleManager[_0x2b492f(0x38a)](),BattleManager['_inputting']=!![],this[_0x2b492f(0x1a8)][_0x2b492f(0x246)](BattleManager[_0x2b492f(0x38a)]()),this[_0x2b492f(0x278)][_0x2b492f(0x1a4)](BattleManager['actor']()));},Game_Party[_0x144c4d(0x1f9)]['teamBasedFirstAvailableMember']=function(){let _0x3f745f=this['battleMembers']();return _0x3f745f[0x0];},Sprite_Actor[_0x144c4d(0x2c0)]=0xc,Sprite_Actor['prototype'][_0x144c4d(0x2ed)]=function(_0x32fd57){const _0x3642bc=_0x144c4d;this[_0x3642bc(0x377)]=_0x32fd57;const _0x13f2e8=Sprite_Actor[_0x3642bc(0x2c0)];this[_0x3642bc(0x2ef)](0x12c,0x0,_0x13f2e8),this[_0x3642bc(0x22c)](0x0,_0x13f2e8),this[_0x3642bc(0x2c0)]=_0x13f2e8;},Sprite_Actor[_0x144c4d(0x1f9)]['startSwitchInAnimation']=function(_0x33db89){const _0x1bc13a=_0x144c4d;if(SceneManager['isSceneBattle']()){SceneManager[_0x1bc13a(0x28b)][_0x1bc13a(0x341)](_0x33db89);const _0x62b2aa=Sprite_Actor[_0x1bc13a(0x2c0)];this[_0x1bc13a(0x2cc)](),this[_0x1bc13a(0x22c)](0xff,_0x62b2aa);}this['_partySwitchTargetActor']=null;},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x378)]=Sprite_Actor['prototype']['update'],Sprite_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x29e)]=function(){const _0x240f06=_0x144c4d;VisuMZ['PartySystem'][_0x240f06(0x378)]['call'](this);if(this[_0x240f06(0x2c0)])this[_0x240f06(0x324)]();},Sprite_Actor[_0x144c4d(0x1f9)][_0x144c4d(0x324)]=function(){const _0xc667ab=_0x144c4d;this[_0xc667ab(0x2c0)]=this[_0xc667ab(0x2c0)]||0x0,this[_0xc667ab(0x2c0)]--,this[_0xc667ab(0x2c0)]<=0x0&&this[_0xc667ab(0x1cf)](this[_0xc667ab(0x377)]);},Window_PartyCommand[_0x144c4d(0x1f9)][_0x144c4d(0x2c2)]=function(){const _0x51e140=_0x144c4d;this[_0x51e140(0x1cd)]();},Window_PartyCommand[_0x144c4d(0x1f9)][_0x144c4d(0x1cd)]=function(){const _0x1de7f3=_0x144c4d;if(!this[_0x1de7f3(0x1f5)]())return;if(this[_0x1de7f3(0x19e)]()){$gameTemp[_0x1de7f3(0x31e)]()&&!BattleManager[_0x1de7f3(0x33a)]&&(console[_0x1de7f3(0x22a)](_0x1de7f3(0x2c8)),BattleManager[_0x1de7f3(0x33a)]=!![]);return;}const _0x44a7f7=this[_0x1de7f3(0x337)](),_0x51cb4f=ImageManager['battlePartyChangeIcon'],_0x5e4d7f=_0x44a7f7===_0x1de7f3(0x313)?TextManager[_0x1de7f3(0x1b9)]:_0x1de7f3(0x330)['format'](_0x51cb4f,TextManager['battlePartyChangeCmd']),_0x257be6=this[_0x1de7f3(0x316)]();this[_0x1de7f3(0x37b)](_0x5e4d7f,'formation',_0x257be6);},Window_PartyCommand[_0x144c4d(0x1f9)][_0x144c4d(0x1f5)]=function(){const _0x40973a=_0x144c4d;if(Imported[_0x40973a(0x2fc)]&&BattleManager['isOTB']())return![];if(Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x40973a(0x344)]())return![];if(Imported['VisuMZ_2_BattleGridSystem']&&BattleManager[_0x40973a(0x33e)]())return![];return VisuMZ[_0x40973a(0x284)][_0x40973a(0x2b5)][_0x40973a(0x192)][_0x40973a(0x21b)];},Window_PartyCommand[_0x144c4d(0x1f9)][_0x144c4d(0x19e)]=function(){return![];},Window_PartyCommand[_0x144c4d(0x1f9)][_0x144c4d(0x316)]=function(){const _0x4b4fa1=_0x144c4d;if($gameParty['allMembers']()[_0x4b4fa1(0x255)]<=0x1)return![];if(!$gameParty['canSwitchPartyInBattle']())return![];return $gameSystem[_0x4b4fa1(0x194)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)]['Window_PartyCommand_updateHelp']=Window_PartyCommand[_0x144c4d(0x1f9)]['updateHelp'],Window_PartyCommand['prototype'][_0x144c4d(0x248)]=function(){const _0x5d2718=_0x144c4d,_0x5c9390=this[_0x5d2718(0x21d)]();switch(_0x5c9390){case _0x5d2718(0x1e9):this[_0x5d2718(0x352)][_0x5d2718(0x30c)](TextManager[_0x5d2718(0x1f8)]);break;default:VisuMZ['PartySystem'][_0x5d2718(0x2b5)][_0x5d2718(0x1fe)][_0x5d2718(0x2d7)](this);break;}},Window_ActorCommand[_0x144c4d(0x1f9)][_0x144c4d(0x17f)]=function(){const _0x4fdf88=_0x144c4d;if(!this[_0x4fdf88(0x251)]())return;this[_0x4fdf88(0x261)](_0x4fdf88(0x1e9))>=0x0&&this[_0x4fdf88(0x35d)]();const _0x418c22=this['commandStyle'](),_0x5c65ac=ImageManager[_0x4fdf88(0x318)],_0x16cf3d=_0x418c22===_0x4fdf88(0x313)?TextManager[_0x4fdf88(0x1f2)]:'\x5cI[%1]%2'[_0x4fdf88(0x195)](_0x5c65ac,TextManager[_0x4fdf88(0x1b9)]),_0x23ad07=this[_0x4fdf88(0x25b)]();this['addCommand'](_0x16cf3d,_0x4fdf88(0x1e9),_0x23ad07);},Window_ActorCommand[_0x144c4d(0x1f9)][_0x144c4d(0x251)]=function(){const _0x12f956=_0x144c4d;if(!this[_0x12f956(0x2e4)])return![];return VisuMZ[_0x12f956(0x284)][_0x12f956(0x2b5)][_0x12f956(0x192)][_0x12f956(0x372)];},Window_ActorCommand[_0x144c4d(0x1f9)][_0x144c4d(0x25b)]=function(){const _0x4be1f2=_0x144c4d;if($gameParty[_0x4be1f2(0x295)]()[_0x4be1f2(0x255)]<=0x1)return![];if(!this['_actor'])return![];if(!this['_actor']['canSwitchPartyInBattle']())return![];return this[_0x4be1f2(0x2e4)][_0x4be1f2(0x358)]();},VisuMZ[_0x144c4d(0x284)][_0x144c4d(0x2b5)][_0x144c4d(0x36d)]=Window_ActorCommand[_0x144c4d(0x1f9)][_0x144c4d(0x248)],Window_ActorCommand['prototype']['updateHelp']=function(){const _0x59b7f7=_0x144c4d,_0xb54994=this[_0x59b7f7(0x21d)]();if(!_0xb54994)return;switch(_0xb54994[_0x59b7f7(0x1d4)]()){case _0x59b7f7(0x1e9):this['_helpWindow'][_0x59b7f7(0x30c)](TextManager['battlePartySwitchCmdHelp']);break;default:VisuMZ[_0x59b7f7(0x284)]['Settings'][_0x59b7f7(0x36d)]['call'](this);break;}},Window_ActorCommand['prototype'][_0x144c4d(0x35d)]=function(){const _0x54b2e7=_0x144c4d;while(this['findSymbol']('formation')>=0x0){const _0x16262e=this['findSymbol'](_0x54b2e7(0x1e9));this['_list'][_0x54b2e7(0x2f8)](_0x16262e,0x1);}});;