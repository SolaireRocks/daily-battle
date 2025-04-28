//=============================================================================
// VisuStella MZ - Battle Cursor
// VisuMZ_4_BattleCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BattleCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCursor = VisuMZ.BattleCursor || {};
VisuMZ.BattleCursor.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [BattleCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set custom cursors when selecting allies and/or
 * enemies for targeting while in battle. This is to help with better visual
 * cues when picking a target if the flashing battler isn't enough.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as battle cursors for selected
 *   actors and enemies.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Customize the battle cursor to appear differently for various actors
 *   and/or enemies through notetags!
 * * Alter the battle cursor mid-battle through Plugin Commands, too!
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
 * Animated Battle Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated battle selection cursors.
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
 * === Cursor Appearance-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific icon.
 * - Replace 'x' with the icon index you wish to use.
 *
 * ---
 *
 * <Battle Cursor Picture: filename>
 * <Battle Cursor System: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the battle select cursor into the specific image.
 * - The 'Picture' variant loads images from img/pictures/.
 * - The 'System' variant loads images from img/system/.
 * - Replace 'filename' with the filename of the image found in the specific
 *   target folder.
 *   - Do not include the file extension.
 *
 * ---
 *
 * <Battle Cursor Frame Delay: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - If using a 'picture' or 'system' image that has the animated format, you
 *   can adjust how much delay there is between each animated frame.
 * - Replace 'x' with a number representing the delay between frames.
 *   Lower is faster. Higher is slower.
 *
 * ---
 * 
 * === Cursor Location-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor Anchor X: Left>
 * <Battle Cursor Anchor X: Center>
 * <Battle Cursor Anchor X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor X location of the battle cursor sprite for
 *   this specific actor/enemy.
 * 
 * ---
 *
 * <Battle Cursor Anchor Y: Top>
 * <Battle Cursor Anchor Y: Middle>
 * <Battle Cursor Anchor Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the origin/anchor Y location of the battle cursor sprite for
 *   this specific actor/enemy.
 *
 * ---
 *
 * <Battle Cursor Position X: Left>
 * <Battle Cursor Position X: Center>
 * <Battle Cursor Position X: Right>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position X location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 * 
 * ---
 *
 * <Battle Cursor Position Y: Top>
 * <Battle Cursor Position Y: Middle>
 * <Battle Cursor Position Y: Bottom>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the position Y location of where the battle cursor sprite
 *   appears on the actor or enemy sprite when targeting them.
 *
 * ---
 *
 * <Battle Cursor Offset X: +x>
 * <Battle Cursor Offset X: -x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the X position of the battle cursor sprite by pixels.
 * - Replace 'x' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go left.
 *   - Positive numbers go right.
 *
 * ---
 *
 * <Battle Cursor Offset Y: +y>
 * <Battle Cursor Offset Y: -y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Offsets the Y position of the battle cursor sprite by pixels.
 * - Replace 'y' with a number representing the pixels to offset the battle
 *   cursor sprite by.
 *   - Negative numbers go up.
 *   - Positive numbers go down.
 *
 * ---
 *
 * === Cursor Wave-Related Notetags ===
 * 
 * ---
 *
 * <Battle Cursor No Wave>
 *
 * - Used for: Actor, Enemy Notetags
 * - Removes any oscillation from the battle cursor.
 *
 * ---
 *
 * <Battle Cursor Horizontal Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth horizontally from the
 *   left to the right.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Vertical Wave: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - The battle cursor will oscillate back and forth vertically from the
 *   top to the bottom.
 * - Replace 'x' with a number representing the pixel distance to oscillate.
 *
 * ---
 *
 * <Battle Cursor Wave Speed: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Select how fast the cursor oscillates.
 * - Lower is slower. Higher is faster.
 * - Replace 'x' with a number representing the speed at which the cursor will
 *   oscillate at.
 * - Use decimal values between 0 and 1 for the best results.
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
 * === Battle Cursor Plugin Commands ===
 * 
 * ---
 *
 * Battle Cursor: Change Actor Cursor
 * - Change target actor's battle cursor settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Party Member Cursor
 * - Change target party member's battle cursor settings.
 *
 *   Party Index(es):
 *   - Select which party member index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * Battle Cursor: Change Enemy Member Cursor
 * - Change target enemy's battle cursor settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy troop index(es) to affect.
 *
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor and Enemy Cursor Settings
 * ============================================================================
 *
 * These are the default battle select cursor settings for actors and enemies.
 * All actors will have the same settings as one another unless notetags are
 * used to customize their settings. The same goes for enemies.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the battle select cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
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
 * Version 1.04: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the battle cursor position could appear on non-rounded
 *    numbers, causing pixel bleeding between frames. Fix made by Olivia.
 * 
 * Version 1.03: December 30, 2021
 * * Compatibility Update!
 * ** Updated better compatibility with Battle Core's most recent changes.
 *    Tints should no longer affect the Battle Cursor.
 * 
 * Version 1.02: June 11, 2021
 * * Bug Fixes!
 * ** Battle Cursor now properly aligns itself when target battlers are not
 *    scaled properly and/or hovering. Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Bug Fixes!
 * ** When using the Battle Cursor for front view actors, the cursor no longer
 *    appears out of synch from the sprite positions in the battle status
 *    window area. Fix made by Irina.
 *
 * Version 1.00: January 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeActorSettings
 * @text Battle Cursor: Change Actor Cursor
 * @desc Change target actor's battle cursor settings.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangePartySettings
 * @text Battle Cursor: Change Party Member Cursor
 * @desc Change target party member's battle cursor settings.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type number[]
 * @desc Select which party member index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleCursorChangeEnemySettings
 * @text Battle Cursor: Change Enemy Member Cursor
 * @desc Change target enemy's battle cursor settings.
 * In-battle only!
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy troop index(es) to affect.
 * @default ["0"]
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param BattleCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorCursor:struct
 * @text Actor Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for actors.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param EnemyCursor:struct
 * @text Enemy Cursor
 * @type struct<BattleCursor>
 * @desc Default battle select cursor settings for enemies.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"right","anchorY:str":"middle","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
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
 * BattleCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the battle select cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default right
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default middle
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @min 1
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
//=============================================================================

const _0x598842=_0x1f06;(function(_0x5de1b2,_0x2d7916){const _0x20a865=_0x1f06,_0x363e8d=_0x5de1b2();while(!![]){try{const _0x14a1ac=-parseInt(_0x20a865(0x94))/0x1*(parseInt(_0x20a865(0xe6))/0x2)+-parseInt(_0x20a865(0xa3))/0x3*(-parseInt(_0x20a865(0x11b))/0x4)+-parseInt(_0x20a865(0xdf))/0x5+parseInt(_0x20a865(0xee))/0x6+parseInt(_0x20a865(0xc2))/0x7+-parseInt(_0x20a865(0x109))/0x8*(-parseInt(_0x20a865(0xfb))/0x9)+-parseInt(_0x20a865(0x89))/0xa;if(_0x14a1ac===_0x2d7916)break;else _0x363e8d['push'](_0x363e8d['shift']());}catch(_0x141180){_0x363e8d['push'](_0x363e8d['shift']());}}}(_0x444e,0xd1a99));var label='BattleCursor',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x598842(0x112)](function(_0x13ff95){const _0x48e5fc=_0x598842;return _0x13ff95['status']&&_0x13ff95[_0x48e5fc(0x110)][_0x48e5fc(0xca)]('['+label+']');})[0x0];function _0x444e(){const _0x31d206=['_battleCursorData','max','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EVAL','updatePosition','map','Sprite_Battler_setBattler','_uiContainer','2029125EGXIir','setBattleCursor','_settings','_enemySprites','system','offsetX','call','vert','includes','extraPositionY','version','_battlerContainer','systemFilename','registerCommand','ANTI_TINT_UI','Spriteset_Battle_createBattleFieldContainer','STRUCT','createBattleSelectCursor','ARRAYSTRUCT','setBattler','FUNC','exit','addChildToUiContainer','top','update','concat','updateScale','BattleCursor','parent','1391375GhHfHV','note','BattleCursorChangeActorSettings','isSideView','_battleSelectCursorSprite','actor','offsetY','22zKaJoo','opacity','battleCursor','BattleCursorChangeEnemySettings','determineFrameColsRows','match','ARRAYNUM','iconIndex','1473816flAZDr','_battleCursorContainer','height','adjustFlippedBattlefield','return\x200','Sprite_Enemy_initMembers','width','toUpperCase','ARRAYJSON','applyBattleCursorNotetags','horz','right','NUM','4874103eElumG','ARRAYEVAL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateFrameIcon','isSelected','findTargetSprite','_baseSprite','anchorY','positionY','setFrame','loadSystem','enemy','bottom','ARRAYFUNC','24Srmbvx','scale','EnemyCursor','round','parameters','updateBattleCursorContainer','BattleCursorChangePartySettings','description','EnemyIndex','filter','Settings','prototype','makeDeepCopy','isActor','updateAnchor','STR','format','ConvertParams','4yqfaEX','_spriteset','_battleField','frameDelay','ActorCursor','isSceneBattle','_frameRows','bind','waveSpeed','ARRAYSTR','Spriteset_Battle_update','updateBattleSelectCursor','_frameMax','parse','iconWidth','Sprite_Actor_initMembers','_baseY','iconHeight','5142030sHshSp','Spriteset_Battle_adjustFlippedBattlefield','_battler','initialize','left','_distortionSprite','middle','center','pictureFilename','updateFrame','trim','152188FOMyyr','addChild','_frameIndex','initMembers','updateWave','createBattleFieldContainer','icon','toLowerCase','updateFrameColsRows','picture','_scene','name','loadBitmap','VisuMZ_1_BattleCore','waveDistance','3495333McpIGT','waveType','type','addLoadListener','ActorIDs','JSON','floor','PartyIndex','updateBattler','create','updateOpacity','cos','anchor','constructor','setBase','anchorX','none','positionX','createBattleCursorData','bitmap','_cache','_frameCols','members'];_0x444e=function(){return _0x31d206;};return _0x444e();}VisuMZ[label][_0x598842(0x113)]=VisuMZ[label][_0x598842(0x113)]||{},VisuMZ[_0x598842(0x11a)]=function(_0x1881fc,_0x265f1b){const _0x5fef59=_0x598842;for(const _0x33d962 in _0x265f1b){if(_0x33d962[_0x5fef59(0xeb)](/(.*):(.*)/i)){const _0x1dbc8f=String(RegExp['$1']),_0x4a4151=String(RegExp['$2'])[_0x5fef59(0xf5)]()[_0x5fef59(0x93)]();let _0x2b848f,_0x45fa5d,_0x174608;switch(_0x4a4151){case _0x5fef59(0xfa):_0x2b848f=_0x265f1b[_0x33d962]!==''?Number(_0x265f1b[_0x33d962]):0x0;break;case _0x5fef59(0xec):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d[_0x5fef59(0xbf)](_0x179748=>Number(_0x179748));break;case _0x5fef59(0xbd):_0x2b848f=_0x265f1b[_0x33d962]!==''?eval(_0x265f1b[_0x33d962]):null;break;case _0x5fef59(0xfc):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d['map'](_0x490d78=>eval(_0x490d78));break;case _0x5fef59(0xa8):_0x2b848f=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):'';break;case _0x5fef59(0xf6):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d[_0x5fef59(0xbf)](_0x3e7341=>JSON[_0x5fef59(0x128)](_0x3e7341));break;case _0x5fef59(0xd6):_0x2b848f=_0x265f1b[_0x33d962]!==''?new Function(JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962])):new Function(_0x5fef59(0xf2));break;case _0x5fef59(0x108):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d[_0x5fef59(0xbf)](_0x53b8ae=>new Function(JSON[_0x5fef59(0x128)](_0x53b8ae)));break;case _0x5fef59(0x118):_0x2b848f=_0x265f1b[_0x33d962]!==''?String(_0x265f1b[_0x33d962]):'';break;case _0x5fef59(0x124):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d['map'](_0x5515e2=>String(_0x5515e2));break;case _0x5fef59(0xd2):_0x174608=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):{},_0x2b848f=VisuMZ[_0x5fef59(0x11a)]({},_0x174608);break;case _0x5fef59(0xd4):_0x45fa5d=_0x265f1b[_0x33d962]!==''?JSON[_0x5fef59(0x128)](_0x265f1b[_0x33d962]):[],_0x2b848f=_0x45fa5d[_0x5fef59(0xbf)](_0x4c4029=>VisuMZ[_0x5fef59(0x11a)]({},JSON['parse'](_0x4c4029)));break;default:continue;}_0x1881fc[_0x1dbc8f]=_0x2b848f;}}return _0x1881fc;},(_0x1195b6=>{const _0x5c964c=_0x598842,_0x57edef=_0x1195b6[_0x5c964c(0x9f)];for(const _0x5272ba of dependencies){if(!Imported[_0x5272ba]){alert(_0x5c964c(0xfd)['format'](_0x57edef,_0x5272ba)),SceneManager[_0x5c964c(0xd7)]();break;}}const _0x5a2206=_0x1195b6[_0x5c964c(0x110)];if(_0x5a2206[_0x5c964c(0xeb)](/\[Version[ ](.*?)\]/i)){const _0x1b4b84=Number(RegExp['$1']);_0x1b4b84!==VisuMZ[label][_0x5c964c(0xcc)]&&(alert(_0x5c964c(0xbc)[_0x5c964c(0x119)](_0x57edef,_0x1b4b84)),SceneManager[_0x5c964c(0xd7)]());}if(_0x5a2206['match'](/\[Tier[ ](\d+)\]/i)){const _0x1050d3=Number(RegExp['$1']);_0x1050d3<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5c964c(0x119)](_0x57edef,_0x1050d3,tier)),SceneManager[_0x5c964c(0xd7)]()):tier=Math['max'](_0x1050d3,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x1195b6[_0x5c964c(0x10d)]);})(pluginData),PluginManager[_0x598842(0xcf)](pluginData[_0x598842(0x9f)],_0x598842(0xe1),_0x57da08=>{const _0x38acb2=_0x598842;VisuMZ['ConvertParams'](_0x57da08,_0x57da08);const _0x2c4648=JsonEx[_0x38acb2(0x115)](_0x57da08);_0x2c4648[_0x38acb2(0xa7)]=undefined;const _0x43a6df=_0x57da08[_0x38acb2(0xa7)][_0x38acb2(0xbf)](_0x231e05=>$gameActors[_0x38acb2(0xe4)](_0x231e05));for(const _0x52f33e of _0x43a6df){if(!_0x52f33e)continue;_0x52f33e['setBattleCursor'](_0x2c4648);if(SceneManager['isSceneBattle']()){const _0x5f583d=SceneManager[_0x38acb2(0x9e)];if(!_0x5f583d)continue;const _0x4d4b35=_0x5f583d[_0x38acb2(0x11c)];if(!_0x4d4b35)continue;const _0x3496ba=_0x4d4b35['findTargetSprite'](_0x52f33e);if(_0x3496ba)_0x3496ba[_0x38acb2(0x126)]();}}}),PluginManager[_0x598842(0xcf)](pluginData[_0x598842(0x9f)],_0x598842(0x10f),_0x192904=>{const _0x942498=_0x598842;VisuMZ['ConvertParams'](_0x192904,_0x192904);const _0x5dd97c=JsonEx[_0x942498(0x115)](_0x192904);_0x5dd97c['PartyIndex']=undefined;const _0x2a0001=_0x192904[_0x942498(0xaa)]['map'](_0x8bada3=>$gameParty[_0x942498(0xb9)]()[_0x8bada3]);for(const _0x2de5cc of _0x2a0001){if(!_0x2de5cc)continue;_0x2de5cc[_0x942498(0xc3)](_0x5dd97c);if(SceneManager[_0x942498(0x120)]()){const _0x2c5113=SceneManager['_scene'];if(!_0x2c5113)continue;const _0x1869a9=_0x2c5113[_0x942498(0x11c)];if(!_0x1869a9)continue;const _0x26ccd8=_0x1869a9[_0x942498(0x100)](_0x2de5cc);if(_0x26ccd8)_0x26ccd8['updateBattleSelectCursor']();}}}),PluginManager[_0x598842(0xcf)](pluginData[_0x598842(0x9f)],_0x598842(0xe9),_0x273029=>{const _0x17dd93=_0x598842;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x17dd93(0x11a)](_0x273029,_0x273029);const _0x176d4e=JsonEx[_0x17dd93(0x115)](_0x273029);_0x176d4e[_0x17dd93(0x111)]=undefined;const _0x54d8fb=_0x273029['EnemyIndex'][_0x17dd93(0xbf)](_0x2860ae=>$gameTroop[_0x17dd93(0xb9)]()[_0x2860ae]);for(const _0xfe4095 of _0x54d8fb){if(!_0xfe4095)continue;_0xfe4095[_0x17dd93(0xc3)](_0x176d4e);if(SceneManager['isSceneBattle']()){const _0x5e0350=SceneManager['_scene'];if(!_0x5e0350)continue;const _0x3c6887=_0x5e0350[_0x17dd93(0x11c)];if(!_0x3c6887)continue;const _0x1f4dab=_0x3c6887[_0x17dd93(0x100)](_0xfe4095);if(_0x1f4dab)_0x1f4dab[_0x17dd93(0x126)]();}}}),SceneManager['isSceneBattle']=function(){const _0x158964=_0x598842;return this[_0x158964(0x9e)]&&this[_0x158964(0x9e)][_0x158964(0xb0)]===Scene_Battle;},Game_BattlerBase[_0x598842(0x114)][_0x598842(0xe8)]=function(){const _0x2c7dc8=_0x598842;return!this[_0x2c7dc8(0xba)]&&this[_0x2c7dc8(0xb5)](),this[_0x2c7dc8(0xba)];},Game_BattlerBase[_0x598842(0x114)][_0x598842(0xb5)]=function(){const _0x212851=_0x598842;this['_battleCursorData']={'type':_0x212851(0x9a),'iconIndex':0x70,'pictureFilename':'','systemFilename':'','frameDelay':0xf4240,'anchorX':'right','anchorY':_0x212851(0x8f),'positionX':_0x212851(0x8d),'positionY':_0x212851(0x8f),'offsetX':0x0,'offsetY':0x0,'waveType':_0x212851(0xf8),'waveSpeed':0.05,'waveDistance':0xa};},Game_BattlerBase[_0x598842(0x114)]['setBattleCursor']=function(_0x133e7c){const _0x4f1c1a=_0x598842;this[_0x4f1c1a(0xba)]=_0x133e7c;},Game_Battler[_0x598842(0x114)][_0x598842(0xf7)]=function(_0xf6a42c){const _0x4bbb29=_0x598842;if(!_0xf6a42c)return;const _0x2b6321=this[_0x4bbb29(0xba)];_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) ICON:[ ](.*)>/i)&&(this['_battleCursorData'][_0x4bbb29(0xa5)]=_0x4bbb29(0x9a),this[_0x4bbb29(0xba)][_0x4bbb29(0xed)]=Number(RegExp['$1']));_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) PICTURE:[ ](.*)>/i)&&(this['_battleCursorData']['type']='picture',this[_0x4bbb29(0xba)][_0x4bbb29(0x91)]=String(RegExp['$1'])[_0x4bbb29(0x93)]());_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) SYSTEM:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0xa5)]=_0x4bbb29(0xc6),this[_0x4bbb29(0xba)][_0x4bbb29(0xce)]=String(RegExp['$1'])[_0x4bbb29(0x93)]());_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) FRAME DELAY:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0x11e)]=Number(RegExp['$1']));if(_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR X:[ ](.*)>/i)){const _0x3384d2=String(RegExp['$1'])[_0x4bbb29(0x9b)]()[_0x4bbb29(0x93)]();[_0x4bbb29(0x8d),'center',_0x4bbb29(0xf9)][_0x4bbb29(0xca)](_0x3384d2)&&(this['_battleCursorData'][_0x4bbb29(0xb2)]=_0x3384d2);}if(_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) ANCHOR Y:[ ](.*)>/i)){const _0x2a9ebb=String(RegExp['$1'])[_0x4bbb29(0x9b)]()[_0x4bbb29(0x93)]();['top','middle',_0x4bbb29(0x107)]['includes'](_0x2a9ebb)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0x102)]=_0x2a9ebb);}if(_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION X:[ ](.*)>/i)){const _0x45df9c=String(RegExp['$1'])[_0x4bbb29(0x9b)]()[_0x4bbb29(0x93)]();[_0x4bbb29(0x8d),_0x4bbb29(0x90),_0x4bbb29(0xf9)][_0x4bbb29(0xca)](_0x45df9c)&&(this['_battleCursorData'][_0x4bbb29(0xb4)]=_0x45df9c);}if(_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) POSITION Y:[ ](.*)>/i)){const _0x22d61e=String(RegExp['$1'])[_0x4bbb29(0x9b)]()[_0x4bbb29(0x93)]();[_0x4bbb29(0xd9),_0x4bbb29(0x8f),_0x4bbb29(0x107)][_0x4bbb29(0xca)](_0x22d61e)&&(this['_battleCursorData']['positionY']=_0x22d61e);}_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET X:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0xc7)]=Number(RegExp['$1'])),_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) OFFSET Y:[ ](.*)>/i)&&(this['_battleCursorData'][_0x4bbb29(0xe5)]=Number(RegExp['$1'])),_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:NO|NONE) WAVE>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0xa4)]=_0x4bbb29(0xb3),this[_0x4bbb29(0xba)]['waveDistance']=0x1),_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:HORZ|HORIZONTAL) WAVE:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0xa4)]='horz',this[_0x4bbb29(0xba)][_0x4bbb29(0xa2)]=Number(RegExp['$1'])),_0xf6a42c['match'](/<BATTLE (?:SELECT CURSOR|CURSOR) (?:VERT|VERTICAL) WAVE:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0xa4)]=_0x4bbb29(0xc9),this[_0x4bbb29(0xba)][_0x4bbb29(0xa2)]=Number(RegExp['$1'])),_0xf6a42c[_0x4bbb29(0xeb)](/<BATTLE (?:SELECT CURSOR|CURSOR) WAVE SPEED:[ ](.*)>/i)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0x123)]=Number(RegExp['$1'])),this[_0x4bbb29(0xba)][_0x4bbb29(0x11e)]=Math[_0x4bbb29(0xbb)](0x1,this[_0x4bbb29(0xba)][_0x4bbb29(0x11e)]),this['_battleCursorData']['type']===_0x4bbb29(0x9a)&&(this[_0x4bbb29(0xba)][_0x4bbb29(0x11e)]=0x186a0);},Game_Actor['prototype'][_0x598842(0xb5)]=function(){const _0x49035d=_0x598842;this['_battleCursorData']=JsonEx['makeDeepCopy'](VisuMZ['BattleCursor'][_0x49035d(0x113)][_0x49035d(0x11f)]),this[_0x49035d(0xf7)](this[_0x49035d(0xe4)]()[_0x49035d(0xe0)]);},Game_Enemy['prototype'][_0x598842(0xb5)]=function(){const _0x36571f=_0x598842;this[_0x36571f(0xba)]=JsonEx[_0x36571f(0x115)](VisuMZ['BattleCursor'][_0x36571f(0x113)][_0x36571f(0x10b)]),this[_0x36571f(0xf7)](this[_0x36571f(0x106)]()[_0x36571f(0xe0)]);},Sprite_Battler[_0x598842(0x114)][_0x598842(0xd3)]=function(){const _0x32443f=_0x598842;this['_battleSelectCursorSprite']=new Sprite_BattleSelectCursor(),this[_0x32443f(0xe3)][_0x32443f(0xb1)](this),Spriteset_Battle[_0x32443f(0xd0)]?BattleManager[_0x32443f(0xd8)](this[_0x32443f(0xe3)]):this['addChild'](this['_battleSelectCursorSprite']);},VisuMZ[_0x598842(0xdd)]['Sprite_Battler_setBattler']=Sprite_Battler[_0x598842(0x114)]['setBattler'],Sprite_Battler[_0x598842(0x114)]['setBattler']=function(_0x4ace81){const _0x103a66=_0x598842;VisuMZ[_0x103a66(0xdd)][_0x103a66(0xc0)][_0x103a66(0xc8)](this,_0x4ace81),this['_battleSelectCursorSprite']&&this['_battleSelectCursorSprite']['setBattler'](_0x4ace81);},Sprite_Battler[_0x598842(0x114)][_0x598842(0x126)]=function(){const _0x4a290d=_0x598842;if(!this[_0x4a290d(0xe3)])return;this[_0x4a290d(0xe3)][_0x4a290d(0xab)]();},VisuMZ[_0x598842(0xdd)][_0x598842(0x86)]=Sprite_Actor['prototype'][_0x598842(0x97)],Sprite_Actor[_0x598842(0x114)]['initMembers']=function(){const _0x30df65=_0x598842;VisuMZ['BattleCursor'][_0x30df65(0x86)][_0x30df65(0xc8)](this);if(Imported['VisuMZ_1_BattleCore']&&this[_0x30df65(0xb0)]===Sprite_SvEnemy)return;this[_0x30df65(0xd3)]();},VisuMZ['BattleCursor']['Sprite_Enemy_initMembers']=Sprite_Enemy[_0x598842(0x114)][_0x598842(0x97)],Sprite_Enemy[_0x598842(0x114)][_0x598842(0x97)]=function(){const _0x2fd54a=_0x598842;VisuMZ['BattleCursor'][_0x2fd54a(0xf3)][_0x2fd54a(0xc8)](this),this['createBattleSelectCursor']();},VisuMZ[_0x598842(0xdd)][_0x598842(0xd1)]=Spriteset_Battle['prototype'][_0x598842(0x99)],Spriteset_Battle[_0x598842(0x114)][_0x598842(0x99)]=function(){const _0x2eb604=_0x598842;VisuMZ['BattleCursor'][_0x2eb604(0xd1)]['call'](this),Spriteset_Battle[_0x2eb604(0xd0)]?this['_battleCursorContainer']=this[_0x2eb604(0xc1)]:(this[_0x2eb604(0xef)]=new Sprite(),this[_0x2eb604(0x11d)][_0x2eb604(0x95)](this[_0x2eb604(0xef)]));},VisuMZ[_0x598842(0xdd)][_0x598842(0x8a)]=Spriteset_Battle[_0x598842(0x114)][_0x598842(0xf1)],Spriteset_Battle[_0x598842(0x114)]['adjustFlippedBattlefield']=function(){const _0x5acc69=_0x598842;VisuMZ[_0x5acc69(0xdd)][_0x5acc69(0x8a)][_0x5acc69(0xc8)](this),this[_0x5acc69(0xef)]&&this['_battlerContainer']&&(this['_battleCursorContainer'][_0x5acc69(0x10a)]['x']=this[_0x5acc69(0xcd)][_0x5acc69(0x10a)]['x'],this[_0x5acc69(0xef)]['scale']['y']=this[_0x5acc69(0xcd)][_0x5acc69(0x10a)]['y'],this[_0x5acc69(0xef)]['x']=this[_0x5acc69(0xcd)]['x'],this[_0x5acc69(0xef)]['y']=this[_0x5acc69(0xcd)]['y']);},VisuMZ[_0x598842(0xdd)][_0x598842(0x125)]=Spriteset_Battle['prototype'][_0x598842(0xda)],Spriteset_Battle[_0x598842(0x114)]['update']=function(){const _0xaf183e=_0x598842;VisuMZ['BattleCursor'][_0xaf183e(0x125)]['call'](this),this['updateBattleCursorContainer']();},Spriteset_Battle[_0x598842(0x114)][_0x598842(0x10e)]=function(){const _0x5156a7=_0x598842;if(!this[_0x5156a7(0xef)])return;let _0x432afe=this[_0x5156a7(0xc5)];$gameSystem[_0x5156a7(0xe2)]()&&(_0x432afe=_0x432afe[_0x5156a7(0xdb)](this['_actorSprites']));for(const _0x3fde36 of _0x432afe){if(!_0x3fde36)continue;const _0x6d832f=_0x3fde36[_0x5156a7(0xe3)];_0x6d832f&&this['_battleCursorContainer'][_0x5156a7(0x95)](_0x6d832f);}};function Sprite_BattleSelectCursor(){const _0x1979d7=_0x598842;this[_0x1979d7(0x8c)](...arguments);}function _0x1f06(_0x59c754,_0x5af47a){const _0x444eae=_0x444e();return _0x1f06=function(_0x1f06a0,_0x97bc85){_0x1f06a0=_0x1f06a0-0x86;let _0x3c48b7=_0x444eae[_0x1f06a0];return _0x3c48b7;},_0x1f06(_0x59c754,_0x5af47a);}Sprite_BattleSelectCursor['prototype']=Object[_0x598842(0xac)](Sprite[_0x598842(0x114)]),Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xb0)]=Sprite_BattleSelectCursor,Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0x8c)]=function(){const _0x1a1e6e=_0x598842;Sprite[_0x1a1e6e(0x114)]['initialize'][_0x1a1e6e(0xc8)](this),this[_0x1a1e6e(0x97)]();},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0x97)]=function(){const _0x3e5b28=_0x598842;this['_battler']=null,this[_0x3e5b28(0xc4)]=null,this[_0x3e5b28(0x96)]=0x0,this['_frameCols']=0x1,this[_0x3e5b28(0x121)]=0x1,this[_0x3e5b28(0x127)]=0x1,this['_cache']={'scale':{'x':0x1,'y':0x1}},this[_0x3e5b28(0xe7)]=0x0;},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xb1)]=function(_0x1a1911){const _0x463b7b=_0x598842;this[_0x463b7b(0x101)]=_0x1a1911;},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xd5)]=function(_0x37e333){const _0x3a66bd=_0x598842;if(this[_0x3a66bd(0x8b)]===_0x37e333)return;this[_0x3a66bd(0x8b)]=_0x37e333,this['_battler']?this[_0x3a66bd(0xab)]():this[_0x3a66bd(0xc4)]=null;},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xab)]=function(){const _0x34bb64=_0x598842;this[_0x34bb64(0xc4)]=this[_0x34bb64(0x8b)][_0x34bb64(0xe8)](),this[_0x34bb64(0x117)](),this[_0x34bb64(0xa0)]();},Sprite_BattleSelectCursor[_0x598842(0x114)]['updateAnchor']=function(){const _0x2779b6=_0x598842;switch(this[_0x2779b6(0xc4)]['anchorX']){case _0x2779b6(0x8d):this[_0x2779b6(0xaf)]['x']=0x0;break;case _0x2779b6(0x90):this['anchor']['x']=0.5;break;case _0x2779b6(0xf9):this[_0x2779b6(0xaf)]['x']=0x1;break;}switch(this['_settings'][_0x2779b6(0x102)]){case _0x2779b6(0xd9):this[_0x2779b6(0xaf)]['y']=0x0;break;case'middle':this[_0x2779b6(0xaf)]['y']=0.5;break;case _0x2779b6(0x107):this[_0x2779b6(0xaf)]['y']=0x1;break;}},Sprite_BattleSelectCursor['prototype']['loadBitmap']=function(){const _0x48901e=_0x598842;if(!this[_0x48901e(0xc4)])return;switch(this[_0x48901e(0xc4)][_0x48901e(0xa5)]){case'icon':this['bitmap']=ImageManager[_0x48901e(0x105)]('IconSet');break;case _0x48901e(0x9d):this['bitmap']=ImageManager['loadPicture'](this[_0x48901e(0xc4)][_0x48901e(0x91)]),this['determineFrameColsRows'](this['_settings'][_0x48901e(0x91)]);break;case'system':this[_0x48901e(0xb6)]=ImageManager[_0x48901e(0x105)](this['_settings'][_0x48901e(0xce)]),this[_0x48901e(0xea)](this[_0x48901e(0xc4)][_0x48901e(0xce)]);break;}this[_0x48901e(0x96)]=0x0,this[_0x48901e(0xb6)][_0x48901e(0xa6)](this['updateFrame'][_0x48901e(0x122)](this,!![]));},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xea)]=function(_0x3d7d58){const _0x4b7d30=_0x598842;_0x3d7d58[_0x4b7d30(0xeb)](/\[(\d+)x(\d+)\]/i)?(this['_frameCols']=Math[_0x4b7d30(0xbb)](0x1,Number(RegExp['$1'])),this[_0x4b7d30(0x121)]=Math[_0x4b7d30(0xbb)](0x1,Number(RegExp['$2']))):(this['_frameCols']=0x1,this[_0x4b7d30(0x121)]=0x1),this[_0x4b7d30(0x127)]=this['_frameCols']*this[_0x4b7d30(0x121)];},Sprite_BattleSelectCursor[_0x598842(0x114)]['update']=function(){const _0x5a6449=_0x598842;Sprite[_0x5a6449(0x114)]['update'][_0x5a6449(0xc8)](this),this[_0x5a6449(0x8b)]&&this[_0x5a6449(0xb6)]&&this[_0x5a6449(0xb6)][_0x5a6449(0xf4)]>0x0?(this[_0x5a6449(0xad)](),this[_0x5a6449(0xdc)](),this[_0x5a6449(0x92)](),this[_0x5a6449(0xbe)](),this[_0x5a6449(0x98)]()):this['opacity']=0x0;},Sprite_BattleSelectCursor[_0x598842(0x114)]['updateOpacity']=function(){const _0x128671=_0x598842;this['opacity']=this[_0x128671(0x8b)][_0x128671(0xff)]()?0xff:0x0;},Sprite_BattleSelectCursor[_0x598842(0x114)]['updateScale']=function(){const _0x255136=_0x598842;if(!this[_0x255136(0xde)])return;if(this[_0x255136(0xe7)]<=0x0)return;if(this[_0x255136(0xb7)][_0x255136(0x10a)]['x']===this[_0x255136(0xde)][_0x255136(0x10a)]['x']&&this[_0x255136(0xb7)][_0x255136(0x10a)]['y']===this[_0x255136(0xde)]['scale']['y'])return;this[_0x255136(0x10a)]['x']=0x1/this[_0x255136(0xde)]['scale']['x'],this[_0x255136(0x10a)]['y']=0x1/this[_0x255136(0xde)]['scale']['y'],this['_cache'][_0x255136(0x10a)]['x']=this['parent'][_0x255136(0x10a)]['x'],this['_cache'][_0x255136(0x10a)]['y']=this[_0x255136(0xde)][_0x255136(0x10a)]['y'];},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0x92)]=function(_0x1ce135){const _0x96bd70=_0x598842;if(!_0x1ce135){if(Graphics['frameCount']%this['_settings'][_0x96bd70(0x11e)]>0x0)return;}switch(this[_0x96bd70(0xc4)][_0x96bd70(0xa5)]){case'icon':this['updateFrameIcon']();break;case'picture':case _0x96bd70(0xc6):this[_0x96bd70(0x9c)]();break;};},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0xfe)]=function(){const _0x3f0709=_0x598842,_0x2bdfa8=this[_0x3f0709(0xc4)]['iconIndex'],_0x75a7d7=ImageManager[_0x3f0709(0x129)],_0x4c3d53=ImageManager[_0x3f0709(0x88)],_0x37b27c=_0x2bdfa8%0x10*_0x75a7d7,_0x1e5a25=Math[_0x3f0709(0xa9)](_0x2bdfa8/0x10)*_0x4c3d53;this[_0x3f0709(0x104)](_0x37b27c,_0x1e5a25,_0x75a7d7,_0x4c3d53);},Sprite_BattleSelectCursor['prototype'][_0x598842(0x9c)]=function(){const _0x40b2df=_0x598842;this['_frameIndex']++;if(this['_frameIndex']>=this[_0x40b2df(0x127)])this['_frameIndex']=0x0;var _0x22469f=this[_0x40b2df(0xb6)][_0x40b2df(0xf4)]/this['_frameCols'],_0x310818=this[_0x40b2df(0xb6)][_0x40b2df(0xf0)]/this['_frameRows'],_0x4ec3da=this['_frameIndex']%this[_0x40b2df(0xb8)]*_0x22469f,_0x3abbc8=Math[_0x40b2df(0xa9)](this[_0x40b2df(0x96)]/this[_0x40b2df(0xb8)])*_0x310818;this['setFrame'](_0x4ec3da,_0x3abbc8,_0x22469f,_0x310818);},Sprite_BattleSelectCursor['prototype'][_0x598842(0xbe)]=function(){const _0x2f749d=_0x598842;if(!this[_0x2f749d(0xde)])return;const _0x3eb214=this[_0x2f749d(0x101)]?this[_0x2f749d(0x101)]:this[_0x2f749d(0xde)];let _0x8c17a2=_0x3eb214['width'],_0x1cec4f=_0x3eb214['height'],_0x52d9e1=_0x3eb214['_baseX']??_0x3eb214['x'],_0x11e641=_0x3eb214[_0x2f749d(0x87)]??_0x3eb214['y'];Imported[_0x2f749d(0xa1)]&&_0x3eb214[_0x2f749d(0x8e)]&&(_0x8c17a2*=_0x3eb214[_0x2f749d(0x8e)][_0x2f749d(0x10a)]['x'],_0x1cec4f*=_0x3eb214[_0x2f749d(0x8e)][_0x2f749d(0x10a)]['y'],_0x11e641+=_0x3eb214[_0x2f749d(0xcb)]());switch(this[_0x2f749d(0xc4)][_0x2f749d(0xb4)]){case'left':this['x']=_0x52d9e1+_0x8c17a2/-0x2;break;case _0x2f749d(0x90):this['x']=_0x52d9e1+0x0;break;case _0x2f749d(0xf9):this['x']=_0x52d9e1+_0x8c17a2/0x2;break;}switch(this['_settings'][_0x2f749d(0x103)]){case'top':this['y']=_0x11e641+_0x1cec4f*-0x1;break;case _0x2f749d(0x8f):this['y']=_0x11e641+_0x1cec4f/-0x2;break;case'bottom':this['y']=_0x11e641+0x0;break;}_0x3eb214&&_0x3eb214[_0x2f749d(0x8b)]&&_0x3eb214[_0x2f749d(0x8b)][_0x2f749d(0x116)]()&&!$gameSystem[_0x2f749d(0xe2)]()&&(this['x']-=_0x3eb214['x'],this['y']-=_0x3eb214['y']),this['x']+=this[_0x2f749d(0xc4)][_0x2f749d(0xc7)],this['y']+=this[_0x2f749d(0xc4)][_0x2f749d(0xe5)],this['x']=Math[_0x2f749d(0x10c)](this['x']),this['y']=Math[_0x2f749d(0x10c)](this['y']);},Sprite_BattleSelectCursor[_0x598842(0x114)][_0x598842(0x98)]=function(){const _0x218a66=_0x598842,_0xe9b704=this[_0x218a66(0xc4)][_0x218a66(0xa4)];if(_0xe9b704===_0x218a66(0xb3))return;if(this[_0x218a66(0xc4)][_0x218a66(0xa2)]<=0x0)return;const _0x40fea4=this[_0x218a66(0xc4)]['waveDistance'],_0x1abc20=this[_0x218a66(0xc4)][_0x218a66(0x123)],_0x147290=Math[_0x218a66(0x10c)](Math[_0x218a66(0xae)](Graphics['frameCount']*_0x1abc20)*_0x40fea4);if(_0xe9b704===_0x218a66(0xf8))this['x']+=_0x147290;else _0xe9b704==='vert'&&(this['y']+=_0x147290);};