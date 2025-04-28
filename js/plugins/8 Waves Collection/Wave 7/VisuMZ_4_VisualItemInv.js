//=============================================================================
// VisuStella MZ - Visual Item Inventory
// VisuMZ_4_VisualItemInv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualItemInv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualItemInv = VisuMZ.VisualItemInv || {};
VisuMZ.VisualItemInv.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [VisualItemInv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Item_Inventory_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the item list displayed in-game to become more visual
 * and show bigger images, either as icons or pictures. The enlarged item,
 * weapon, and armor images will show their item quantities next to them while
 * a tooltip window appears above their selected cell to show the item's name.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Changes the item inventory windows to become more visual.
 * * Enlarged item images can be either icons or picture images.
 * * Alter how large you want the images to appear with the Plugin Parameters.
 * * Add different color backgrounds for different items.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Window Columns and Spacing
 * 
 * It should come off as no surprise that these windows will have their usual
 * column counts changed to adjust for the item images shown. The columns will
 * be based on how many of the item icons can fit inside of the window.
 *
 * ---
 * 
 * Item Quantity Positioning
 * 
 * The item quantity will now be positioned to show in the lower right of any
 * window cell with an enlarged icon. Due to this being a much smaller area
 * than what is usually provided, some plugins may have incredibly squished
 * appearances when it comes to displaying item quantity in some areas.
 * 
 * This needs to be adjusted in those plugins individually.
 * 
 * ---
 * 
 * Items and Equips Core
 * 
 * For the Equip Menu, the remove item entry has been changed to show only the
 * enlarged icon. This is to keep consistency with the rest of the plugin.
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
 * === Picture-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Item Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item's icon inside the item windows instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of this plugin, too.
 * - The size used for the image will vary based on the icon size settings.
 * 
 * ---
 * 
 * === Background Colors-Related Notetags ===
 * 
 * ---
 *
 * <Visual Item BG Color 1: x>
 * <Visual Item BG Color 2: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to text color 'x'.
 * - Replace 'x' with a number from 0 to 31 to represent a text color.
 *
 * ---
 *
 * <Visual Item BG Color 1: #rrggbb>
 * <Visual Item BG Color 2: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to a hex color.
 * - Use #rrggbb for custom colors.
 * - You can find out what hex codes belong to which color from this website:
 *   https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Visual Item Inventory Settings
 * ============================================================================
 *
 * These settings allow you to adjust how the Visual Item Inventory windows
 * appear and which ones they appear in.
 *
 * ---
 *
 * General
 * 
 *   Applied Windows:
 *   - Insert the name of their constructors here to apply them.
 *   - Only works with windows made from Window_ItemList.
 * 
 *   Icon Size:
 *   - The icon size used for the Visual Item windows.
 * 
 *   Icon Smoothing?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Item Quantity Outline
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 *   Outline Size:
 *   - How thick are the outlines for the item quantity?
 *
 * ---
 *
 * Tooltip Window
 * 
 *   Show Tooltip Window?:
 *   - Show the tooltip window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Buffer Width:
 *   - How much to buffer this window's width by?
 * 
 *   Font Size:
 *   - What should this window's font size be?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset this window's X/Y position by?
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
 * Version 1.07: May 15, 2025
 * * Compatibility Update!
 * ** Tooltip window now accounts for target window's scaling (ie Frontview
 *    Battle UI). Update made by Arisu.
 * 
 * Version 1.06: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a visual overlapping error. Fix made by Olivia.
 * 
 * Version 1.05: March 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_ItemAmplifySkills! The confirm
 *    icon should now be displayed properly. Update made by Irina.
 * 
 * Version 1.04: July 13, 2023
 * * Compatibility Update!
 * ** Added compatibility with Quest Journal System's newest Quest Label update
 *    in order for the Quest Label to show up in the visual inventory. Update
 *    made by Irina.
 * 
 * Version 1.03: August 25, 2022
 * * Feature Update!
 * ** Updated the boundaries for visual item name display positions to always
 *    fit within the verticality of the game screen. Fix made by Irina.
 * 
 * Version 1.02: July 16, 2021
 * * Bug Fixes!
 * ** Visual glitch fixed that would make item quantity not appear. Fix made
 *    by Arisu.
 * 
 * Version 1.01: February 19, 2021
 * * Feature Update!
 * ** No longer requires VisuStella MZ Items and Equips Core dependency.
 *
 * Version 1.00 Official Release Date: February 26, 2021
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
 * @param VisualItemInv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param General
 *
 * @param Constructors:arraystr
 * @text Applied Windows
 * @parent General
 * @type string[]
 * @desc Insert the name of their constructors here to apply them.
 * Only works with windows made from Window_ItemList.
 * @default ["Window_ItemList","Window_EquipItem","Window_ShopSell","Window_EventItem","Window_BattleItem"]
 *
 * @param IconSize:num
 * @text Icon Size
 * @parent General
 * @desc The icon size used for the Visual Item windows.
 * @default 64
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default false
 * 
 * @param Outline
 * @text Item Quantity Outline
 *
 * @param OutlineColor:num
 * @text Outline Color
 * @parent Outline
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param OutlineSize:num
 * @text Outline Size
 * @parent Outline
 * @desc How thick are the outlines for the item quantity?
 * @default 4
 * 
 * @param Tooltip
 * @text Tooltip Window
 *
 * @param ShowTooltip:eval
 * @text Show Tooltip Window?
 * @parent Tooltip
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the tooltip window?
 * @default true
 *
 * @param TooltipBgType:num
 * @text Background Type
 * @parent Tooltip
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
 * @param TooltipBufferWidth:num
 * @text Buffer Width
 * @parent Tooltip
 * @desc How much to buffer this window's width by?
 * @default 16
 *
 * @param TooltipFontSize:num
 * @text Font Size
 * @parent Tooltip
 * @desc What should this window's font size be?
 * @default 22
 *
 * @param TooltipOffsetX:num
 * @text Offset X
 * @parent Tooltip
 * @desc How much to offset this window's X position by?
 * @default 0
 *
 * @param TooltipOffsetY:num
 * @text Offset Y
 * @parent Tooltip
 * @desc How much to offset this window's Y position by?
 * @default 8
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
//=============================================================================

const _0x3b72d0=_0x11a3;(function(_0x47fa20,_0xf3fc36){const _0x2f64a5=_0x11a3,_0x2517ef=_0x47fa20();while(!![]){try{const _0x4d9f91=parseInt(_0x2f64a5(0x186))/0x1*(-parseInt(_0x2f64a5(0x1b9))/0x2)+-parseInt(_0x2f64a5(0x1ce))/0x3*(parseInt(_0x2f64a5(0x191))/0x4)+parseInt(_0x2f64a5(0x14e))/0x5+-parseInt(_0x2f64a5(0x193))/0x6+-parseInt(_0x2f64a5(0x1a1))/0x7*(-parseInt(_0x2f64a5(0x1af))/0x8)+parseInt(_0x2f64a5(0x17b))/0x9+-parseInt(_0x2f64a5(0x16d))/0xa;if(_0x4d9f91===_0xf3fc36)break;else _0x2517ef['push'](_0x2517ef['shift']());}catch(_0x1f9c6b){_0x2517ef['push'](_0x2517ef['shift']());}}}(_0x1808,0xddc2d));var label=_0x3b72d0(0x133),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3b72d0(0x1b6)](function(_0x5598ff){const _0x4999c9=_0x3b72d0;return _0x5598ff['status']&&_0x5598ff['description'][_0x4999c9(0x14b)]('['+label+']');})[0x0];VisuMZ[label][_0x3b72d0(0x1ae)]=VisuMZ[label][_0x3b72d0(0x1ae)]||{},VisuMZ[_0x3b72d0(0x116)]=function(_0x57215a,_0x33508f){const _0x305882=_0x3b72d0;for(const _0x116e33 in _0x33508f){if(_0x116e33['match'](/(.*):(.*)/i)){const _0x53b6d6=String(RegExp['$1']),_0x30ecf0=String(RegExp['$2'])['toUpperCase']()[_0x305882(0x182)]();let _0x1426dd,_0x594c06,_0x22c6de;switch(_0x30ecf0){case'NUM':_0x1426dd=_0x33508f[_0x116e33]!==''?Number(_0x33508f[_0x116e33]):0x0;break;case _0x305882(0x18b):_0x594c06=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06[_0x305882(0x141)](_0x241c94=>Number(_0x241c94));break;case _0x305882(0x125):_0x1426dd=_0x33508f[_0x116e33]!==''?eval(_0x33508f[_0x116e33]):null;break;case'ARRAYEVAL':_0x594c06=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06['map'](_0x381e35=>eval(_0x381e35));break;case _0x305882(0x114):_0x1426dd=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):'';break;case _0x305882(0x176):_0x594c06=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06['map'](_0xdebc97=>JSON[_0x305882(0x15f)](_0xdebc97));break;case _0x305882(0x115):_0x1426dd=_0x33508f[_0x116e33]!==''?new Function(JSON[_0x305882(0x15f)](_0x33508f[_0x116e33])):new Function(_0x305882(0x151));break;case _0x305882(0x199):_0x594c06=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06['map'](_0x56d4f6=>new Function(JSON['parse'](_0x56d4f6)));break;case _0x305882(0x16e):_0x1426dd=_0x33508f[_0x116e33]!==''?String(_0x33508f[_0x116e33]):'';break;case _0x305882(0x12b):_0x594c06=_0x33508f[_0x116e33]!==''?JSON['parse'](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06['map'](_0x3d2cd0=>String(_0x3d2cd0));break;case'STRUCT':_0x22c6de=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):{},_0x1426dd=VisuMZ[_0x305882(0x116)]({},_0x22c6de);break;case _0x305882(0x16a):_0x594c06=_0x33508f[_0x116e33]!==''?JSON[_0x305882(0x15f)](_0x33508f[_0x116e33]):[],_0x1426dd=_0x594c06[_0x305882(0x141)](_0x56a596=>VisuMZ['ConvertParams']({},JSON[_0x305882(0x15f)](_0x56a596)));break;default:continue;}_0x57215a[_0x53b6d6]=_0x1426dd;}}return _0x57215a;},(_0xaf3f3a=>{const _0x11351c=_0x3b72d0,_0x395ad8=_0xaf3f3a['name'];for(const _0x9138e0 of dependencies){if(!Imported[_0x9138e0]){alert(_0x11351c(0x11d)[_0x11351c(0x1b5)](_0x395ad8,_0x9138e0)),SceneManager[_0x11351c(0x11a)]();break;}}const _0x481b96=_0xaf3f3a[_0x11351c(0x139)];if(_0x481b96[_0x11351c(0x14f)](/\[Version[ ](.*?)\]/i)){const _0x130a24=Number(RegExp['$1']);_0x130a24!==VisuMZ[label]['version']&&(alert(_0x11351c(0x19b)[_0x11351c(0x1b5)](_0x395ad8,_0x130a24)),SceneManager[_0x11351c(0x11a)]());}if(_0x481b96[_0x11351c(0x14f)](/\[Tier[ ](\d+)\]/i)){const _0x22173d=Number(RegExp['$1']);_0x22173d<tier?(alert(_0x11351c(0x123)[_0x11351c(0x1b5)](_0x395ad8,_0x22173d,tier)),SceneManager[_0x11351c(0x11a)]()):tier=Math[_0x11351c(0x159)](_0x22173d,tier);}VisuMZ[_0x11351c(0x116)](VisuMZ[label][_0x11351c(0x1ae)],_0xaf3f3a[_0x11351c(0x19c)]);})(pluginData),VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x11e)]={'visualPicture':/<(?:VISUAL|VISUAL ITEM) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'bgColorNum1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ](\d+)>/i,'bgColorNum2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ](\d+)>/i,'bgColorHex1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ]#(.*)>/i,'bgColorHex2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ]#(.*)>/i},Window_ItemList['VISUAL_ITEM_ICON_SIZE']=VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ae)][_0x3b72d0(0x121)]||0x40,Window_ItemList[_0x3b72d0(0x1b7)]=VisuMZ['VisualItemInv'][_0x3b72d0(0x1ae)][_0x3b72d0(0x19a)]||![],Window_ItemList[_0x3b72d0(0x130)]=VisuMZ['VisualItemInv'][_0x3b72d0(0x1ae)][_0x3b72d0(0x1cb)]||'rgba(0,\x200,\x200,\x201.0)',Window_ItemList[_0x3b72d0(0x1bf)]=VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ae)]['OutlineSize']||0x0,Window_ItemList[_0x3b72d0(0x170)]=VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ae)]['Constructors']||0x0,Window_ItemList['prototype'][_0x3b72d0(0x18e)]=function(){const _0x494f80=_0x3b72d0;return Window_ItemList['VISUAL_ITEM_CONSTRUCTORS'][_0x494f80(0x14b)](this[_0x494f80(0x1c0)][_0x494f80(0x14d)]);},VisuMZ['VisualItemInv'][_0x3b72d0(0x1ca)]=Window_Selectable[_0x3b72d0(0x138)][_0x3b72d0(0x181)],Window_ItemList['prototype']['itemHeight']=function(){const _0x38e77f=_0x3b72d0;if(this[_0x38e77f(0x18e)]()){if(this[_0x38e77f(0x146)]!==undefined)return this[_0x38e77f(0x146)];const _0xb9d95e=Math[_0x38e77f(0x16b)](Window_ItemList['VISUAL_ITEM_ICON_SIZE']/this[_0x38e77f(0x1a3)]());return this['_visualItemHeight']=Math[_0x38e77f(0x15b)](_0xb9d95e*this[_0x38e77f(0x1a3)]())+0x8,this[_0x38e77f(0x146)];}else return VisuMZ[_0x38e77f(0x133)][_0x38e77f(0x1ca)][_0x38e77f(0x1b0)](this);},VisuMZ['VisualItemInv'][_0x3b72d0(0x118)]=Window_ItemList['prototype'][_0x3b72d0(0x12a)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x12a)]=function(){const _0x15700b=_0x3b72d0;return this[_0x15700b(0x18e)]()?Math[_0x15700b(0x16b)](this[_0x15700b(0x131)]/this[_0x15700b(0x181)]()):VisuMZ['VisualItemInv']['Window_ItemList_maxCols']['call'](this);},VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x12e)]=Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x15a)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x15a)]=function(){const _0x70bb25=_0x3b72d0;return this[_0x70bb25(0x18e)]()?0x0:VisuMZ[_0x70bb25(0x133)][_0x70bb25(0x12e)][_0x70bb25(0x1b0)](this);},VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x13e)]=Window_ItemList[_0x3b72d0(0x138)]['rowSpacing'],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x14c)]=function(){const _0x10200a=_0x3b72d0;return this[_0x10200a(0x18e)]()?0x0:VisuMZ[_0x10200a(0x133)]['Window_ItemList_rowSpacing'][_0x10200a(0x1b0)](this);},VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x119)]=Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x134)],Window_ItemList['prototype'][_0x3b72d0(0x134)]=function(_0x541584){const _0x2bd91d=_0x3b72d0;this[_0x2bd91d(0x18e)]()?this[_0x2bd91d(0x166)](_0x541584):VisuMZ[_0x2bd91d(0x133)][_0x2bd91d(0x119)]['call'](this,_0x541584);},Window_ItemList[_0x3b72d0(0x138)]['drawItemVisualItemInventory']=function(_0x5ed06d){const _0x16b76b=_0x3b72d0,_0x4e48ec=this[_0x16b76b(0x195)](_0x5ed06d);if(this[_0x16b76b(0x178)]&&_0x4e48ec===null)return this[_0x16b76b(0x1c7)](_0x5ed06d);if(!_0x4e48ec)return;const _0x186cc3=VisuMZ['VisualItemInv'][_0x16b76b(0x11e)],_0x4a653f=_0x4e48ec[_0x16b76b(0x152)],_0x3a2852=this[_0x16b76b(0x1aa)](_0x5ed06d);if(_0x4a653f['match'](_0x186cc3[_0x16b76b(0x188)])||_0x4a653f['match'](_0x186cc3[_0x16b76b(0x1c8)])){const _0x3241e9=String(RegExp['$1'])['trim'](),_0x1cec0d=ImageManager[_0x16b76b(0x1b1)](_0x3241e9);_0x1cec0d[_0x16b76b(0x136)](this[_0x16b76b(0x126)]['bind'](this,_0x4e48ec,_0x1cec0d,_0x3a2852));}else this[_0x16b76b(0x16f)](this[_0x16b76b(0x189)](_0x4e48ec)),this[_0x16b76b(0x143)](_0x4e48ec,_0x3a2852),this[_0x16b76b(0x127)](_0x4e48ec,_0x3a2852['x'],_0x3a2852['y']+_0x3a2852[_0x16b76b(0x135)]-this[_0x16b76b(0x1a3)](),_0x3a2852[_0x16b76b(0x12d)]),this['resetFontSettings'](),this[_0x16b76b(0x16f)](!![]);this[_0x16b76b(0x187)](_0x5ed06d),this[_0x16b76b(0x1b2)](_0x5ed06d);},Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x126)]=function(_0x36e2a8,_0x232b04,_0x331979){const _0x497a7f=_0x3b72d0;this[_0x497a7f(0x16f)](this['isEnabled'](_0x36e2a8));let _0x119309=_0x331979['x']+0x2,_0x56f0b3=_0x331979['y']+0x2,_0xe025e9=_0x331979[_0x497a7f(0x12d)]-0x4,_0x5b5851=_0x331979[_0x497a7f(0x135)]-0x4,_0x2de381=Math['min'](_0xe025e9,_0x5b5851);const _0x7be63=_0x2de381/_0x232b04[_0x497a7f(0x12d)],_0x4bf3ed=_0x2de381/_0x232b04[_0x497a7f(0x135)],_0x28902d=Math['min'](_0x7be63,_0x4bf3ed,0x1);let _0x32e396=Math['round'](_0x232b04[_0x497a7f(0x12d)]*_0x28902d),_0x4df06b=Math['round'](_0x232b04[_0x497a7f(0x135)]*_0x28902d);_0x119309+=Math[_0x497a7f(0x15b)]((_0xe025e9-_0x32e396)/0x2),_0x56f0b3+=Math[_0x497a7f(0x15b)]((_0x5b5851-_0x4df06b)/0x2);const _0x4ddaf7=_0x232b04[_0x497a7f(0x12d)],_0x208890=_0x232b04[_0x497a7f(0x135)],_0x1e35e6=this[_0x497a7f(0x15c)][_0x497a7f(0x13a)][_0x497a7f(0x1c5)];this[_0x497a7f(0x15c)][_0x497a7f(0x13a)]['imageSmoothingEnabled']=!![],this['contents'][_0x497a7f(0x12c)](_0x232b04,0x0,0x0,_0x4ddaf7,_0x208890,_0x119309,_0x56f0b3,_0x32e396,_0x4df06b),this[_0x497a7f(0x15c)][_0x497a7f(0x13a)]['imageSmoothingEnabled']=_0x1e35e6,this['drawItemNumber'](_0x36e2a8,_0x331979['x'],_0x331979['y']+_0x331979[_0x497a7f(0x135)]-this[_0x497a7f(0x1a3)](),_0x331979[_0x497a7f(0x12d)]),this['resetFontSettings'](),this['changePaintOpacity'](!![]);},Window_ItemList['prototype'][_0x3b72d0(0x143)]=function(_0x436ca0,_0x2416f0){const _0x4ec7e1=_0x3b72d0,_0x1ca260=_0x436ca0[_0x4ec7e1(0x15d)];this[_0x4ec7e1(0x1a8)](_0x1ca260,_0x2416f0);},Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x1a8)]=function(_0xffca49,_0x3bd32e){const _0x240cad=_0x3b72d0;let _0x2318fa=_0x3bd32e['x'],_0x336655=_0x3bd32e['y'],_0x364a14=Window_ItemList['VISUAL_ITEM_ICON_SIZE'];_0x2318fa+=Math['round']((_0x3bd32e['width']-_0x364a14)/0x2),_0x336655+=Math['round']((_0x3bd32e[_0x240cad(0x135)]-_0x364a14)/0x2);const _0xf94f86=ImageManager['loadSystem'](_0x240cad(0x1a9)),_0x3d0ced=ImageManager[_0x240cad(0x180)],_0x31ac27=ImageManager['iconHeight'],_0x259680=_0xffca49%0x10*_0x3d0ced,_0x29aee4=Math[_0x240cad(0x171)](_0xffca49/0x10)*_0x31ac27;this[_0x240cad(0x15c)][_0x240cad(0x13a)][_0x240cad(0x1c5)]=Window_ItemList['VISUAL_ITEM_ICON_SMOOTHING'],this[_0x240cad(0x15c)][_0x240cad(0x12c)](_0xf94f86,_0x259680,_0x29aee4,_0x3d0ced,_0x31ac27,_0x2318fa,_0x336655,_0x364a14,_0x364a14),this['contents'][_0x240cad(0x13a)][_0x240cad(0x1c5)]=!![];},VisuMZ[_0x3b72d0(0x133)]['Window_ItemList_drawItemNumber']=Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x127)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x127)]=function(_0x509045,_0x8bb9,_0x3b561d,_0x2ad7b3){const _0x24fa61=_0x3b72d0;this[_0x24fa61(0x18e)]()?(this[_0x24fa61(0x19e)](),VisuMZ['VisualItemInv']['Window_ItemList_drawItemNumber'][_0x24fa61(0x1b0)](this,_0x509045,_0x8bb9,_0x3b561d,_0x2ad7b3),this['resetFontSettings']()):VisuMZ['VisualItemInv']['Window_ItemList_drawItemNumber'][_0x24fa61(0x1b0)](this,_0x509045,_0x8bb9,_0x3b561d,_0x2ad7b3);},Window_Base['prototype'][_0x3b72d0(0x19e)]=function(){const _0x128b79=_0x3b72d0;this[_0x128b79(0x175)](),this[_0x128b79(0x15c)]['outlineColor']=Window_ItemList['VISUAL_ITEM_OUTLINE_COLOR'],this['contents'][_0x128b79(0x145)]=Window_ItemList['VISUAL_ITEM_OUTLINE_SIZE'];},VisuMZ['VisualItemInv'][_0x3b72d0(0x137)]=Window_ItemList[_0x3b72d0(0x138)]['initialize'],Window_ItemList['prototype'][_0x3b72d0(0x1c3)]=function(_0x128d4a){const _0x3fe2a2=_0x3b72d0;VisuMZ['VisualItemInv'][_0x3fe2a2(0x137)]['call'](this,_0x128d4a),this[_0x3fe2a2(0x184)]();},Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x184)]=function(){const _0x3494bd=_0x3b72d0;if(!this[_0x3494bd(0x18e)]())return;if(!VisuMZ[_0x3494bd(0x133)]['Settings'][_0x3494bd(0x154)])return;this[_0x3494bd(0x1cc)]=new Window_VisualItemTooltip(this),SceneManager['_scene'][_0x3494bd(0x197)](this['_visualItemInventoryTooltipWindow']);},VisuMZ['VisualItemInv'][_0x3b72d0(0x18a)]=Window_ItemList['prototype']['callUpdateHelp'],Window_ItemList[_0x3b72d0(0x138)]['callUpdateHelp']=function(){const _0x5209c0=_0x3b72d0;VisuMZ[_0x5209c0(0x133)][_0x5209c0(0x18a)]['call'](this),this[_0x5209c0(0x1cc)]&&(this[_0x5209c0(0x1cc)]['setItem'](this[_0x5209c0(0x1c4)]()),this['_amplifySkill']&&this[_0x5209c0(0x1cc)][_0x5209c0(0x172)]());},VisuMZ[_0x3b72d0(0x133)]['Window_ItemList_drawItemBackground']=Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x1a0)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x1a0)]=function(_0x59275f){const _0x23da89=_0x3b72d0;this[_0x23da89(0x18e)]()?this[_0x23da89(0x149)](_0x59275f):VisuMZ[_0x23da89(0x133)][_0x23da89(0x1be)][_0x23da89(0x1b0)](this,_0x59275f);const _0x589520=this[_0x23da89(0x129)](_0x59275f);this[_0x23da89(0x132)](_0x589520);},Window_ItemList[_0x3b72d0(0x138)]['drawItemBackgroundVisualItemInventory']=function(_0x21a108){const _0x1eb468=_0x3b72d0,_0x5cc3f9=this[_0x1eb468(0x195)](_0x21a108);if(!_0x5cc3f9){VisuMZ[_0x1eb468(0x133)][_0x1eb468(0x1be)]['call'](this,_0x21a108);return;}const _0x5b1385=VisuMZ[_0x1eb468(0x133)][_0x1eb468(0x11e)],_0x44bf09=_0x5cc3f9[_0x1eb468(0x152)];let _0x4051c6=ColorManager[_0x1eb468(0x165)](),_0x3ce643=ColorManager[_0x1eb468(0x16c)]();_0x44bf09['match'](_0x5b1385['bgColorNum1'])&&(_0x4051c6=ColorManager[_0x1eb468(0x17a)](Number(RegExp['$1'])));_0x44bf09[_0x1eb468(0x14f)](_0x5b1385[_0x1eb468(0x173)])&&(_0x3ce643=ColorManager[_0x1eb468(0x17a)](Number(RegExp['$1'])));_0x44bf09[_0x1eb468(0x14f)](_0x5b1385['bgColorHex1'])&&(_0x4051c6='#'+String(RegExp['$1']));_0x44bf09['match'](_0x5b1385['bgColorHex2'])&&(_0x3ce643='#'+String(RegExp['$1']));const _0x2cafb9=this[_0x1eb468(0x129)](_0x21a108),_0x4b4484=_0x2cafb9['x'],_0x2851c5=_0x2cafb9['y'],_0x257fe6=_0x2cafb9[_0x1eb468(0x12d)],_0x76e1ac=_0x2cafb9[_0x1eb468(0x135)];this[_0x1eb468(0x1a4)][_0x1eb468(0x194)]=0xff,this[_0x1eb468(0x1a4)]['gradientFillRect'](_0x4b4484,_0x2851c5,_0x257fe6,_0x76e1ac,_0x4051c6,_0x3ce643,!![]),this[_0x1eb468(0x1a4)][_0x1eb468(0x15e)](_0x4b4484,_0x2851c5,_0x257fe6,_0x76e1ac,_0x4051c6);},VisuMZ[_0x3b72d0(0x133)]['ConvertHexToRgba']=function(_0x296d24){const _0x8e769f=_0x3b72d0;_0x296d24=_0x296d24['replace']('#','');_0x296d24[_0x8e769f(0x117)]===0x3&&(_0x296d24=_0x296d24[0x0]+_0x296d24[0x0]+_0x296d24[0x1]+_0x296d24[0x1]+_0x296d24[0x2]+_0x296d24[0x2]);var _0x12a84d=parseInt(_0x296d24[_0x8e769f(0x169)](0x0,0x2),0x10),_0x1c6299=parseInt(_0x296d24[_0x8e769f(0x169)](0x2,0x4),0x10),_0x4cd8ac=parseInt(_0x296d24[_0x8e769f(0x169)](0x4,0x6),0x10);return _0x8e769f(0x160)+_0x12a84d+','+_0x1c6299+','+_0x4cd8ac+','+_0x8e769f(0x185)+')';},VisuMZ[_0x3b72d0(0x133)]['Window_Base_drawItemNumber']=Window_Base[_0x3b72d0(0x138)]['drawItemNumber'],Window_Base['prototype'][_0x3b72d0(0x127)]=function(_0x27a445,_0x28d6f1,_0x5d6d35,_0x42a17a){const _0x41e869=_0x3b72d0;this[_0x41e869(0x18e)]&&this[_0x41e869(0x18e)]()?this['drawItemNumberVisualItemInventory'](_0x27a445,_0x28d6f1,_0x5d6d35,_0x42a17a):VisuMZ['VisualItemInv'][_0x41e869(0x150)][_0x41e869(0x1b0)](this,_0x27a445,_0x28d6f1,_0x5d6d35,_0x42a17a);},Window_Base[_0x3b72d0(0x138)][_0x3b72d0(0x17e)]=function(_0x5a5f70,_0x450b3c,_0x5191ba,_0x1f1d0f){const _0x3dfa29=_0x3b72d0;if(this['isDrawItemNumber'](_0x5a5f70)){this[_0x3dfa29(0x19e)]();const _0x15655e=VisuMZ[_0x3dfa29(0x14a)]['Settings']['ItemScene'],_0x21e900=_0x15655e[_0x3dfa29(0x128)],_0x27e0e9=_0x21e900['format']($gameParty[_0x3dfa29(0x140)](_0x5a5f70));this['contents'][_0x3dfa29(0x168)]=_0x15655e[_0x3dfa29(0x163)],this[_0x3dfa29(0x19f)](_0x27e0e9,_0x450b3c,_0x5191ba,_0x1f1d0f,_0x3dfa29(0x1a6)),this[_0x3dfa29(0x175)]();}},VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ab)]=Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x187)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x187)]=function(_0x4af281){const _0x20f6fd=_0x3b72d0;this[_0x20f6fd(0x18e)]()?this[_0x20f6fd(0x19d)](_0x4af281):VisuMZ[_0x20f6fd(0x133)][_0x20f6fd(0x1ab)][_0x20f6fd(0x1b0)](this,_0x4af281);},Window_ItemList[_0x3b72d0(0x138)]['placeItemNewLabelVisualItemInventory']=function(_0x30e3e9){const _0x210d81=_0x3b72d0;if(!Imported[_0x210d81(0x17f)])return;const _0x38e3cf=this[_0x210d81(0x195)](_0x30e3e9);if(!_0x38e3cf||!this[_0x210d81(0x144)]())return;if(!$gameParty['isNewItem'](_0x38e3cf))return;const _0x444bf2=this[_0x210d81(0x1aa)](_0x30e3e9),_0x1c3f8e=_0x444bf2['x'],_0x9a1496=_0x444bf2['y'],_0x8dd91e=VisuMZ['ItemsEquipsCore']['Settings'][_0x210d81(0x153)][_0x210d81(0x113)],_0x29fbeb=VisuMZ[_0x210d81(0x14a)]['Settings']['New']['OffsetY'];this[_0x210d81(0x179)](_0x38e3cf,_0x1c3f8e+_0x8dd91e,_0x9a1496+_0x29fbeb);},VisuMZ['VisualItemInv'][_0x3b72d0(0x174)]=Window_ItemList['prototype'][_0x3b72d0(0x1b2)],Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x1b2)]=function(_0x245272){const _0x431b29=_0x3b72d0;this[_0x431b29(0x18e)]()?this[_0x431b29(0x1ac)](_0x245272):VisuMZ[_0x431b29(0x133)]['Window_ItemList_placeItemQuestLabel'][_0x431b29(0x1b0)](this,_0x245272);},Window_ItemList['prototype'][_0x3b72d0(0x1ac)]=function(_0x1e71c5){const _0x15fd2c=_0x3b72d0;if(!Imported[_0x15fd2c(0x161)])return;const _0x52c439=this[_0x15fd2c(0x195)](_0x1e71c5);if(!_0x52c439||!this['isShowQuest']())return;if(!$gameParty['isQuestItem'](_0x52c439))return;const _0x4af540=this[_0x15fd2c(0x1aa)](_0x1e71c5),_0x437d34=_0x4af540['x'],_0x59e444=_0x4af540['y'],_0x3ff88c=VisuMZ['QuestSystem']['Settings']['Label'][_0x15fd2c(0x113)],_0x1a034f=VisuMZ[_0x15fd2c(0x157)][_0x15fd2c(0x1ae)][_0x15fd2c(0x1c2)][_0x15fd2c(0x1a2)];this['placeQuestLabel'](_0x52c439,_0x437d34+_0x3ff88c,_0x59e444+_0x1a034f);},Window_ItemList[_0x3b72d0(0x138)][_0x3b72d0(0x1c7)]=function(_0x548064){const _0x355d3a=_0x3b72d0,_0x5f6024=this['itemRectWithPadding'](_0x548064);this[_0x355d3a(0x16f)](this['isEnabled'](null)),this[_0x355d3a(0x175)]();const _0x4b7abe=Window_BattleItem[_0x355d3a(0x196)][_0x355d3a(0x1ad)];this[_0x355d3a(0x1a8)](_0x4b7abe,_0x5f6024);},VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x155)]=Window_EquipItem[_0x3b72d0(0x138)][_0x3b72d0(0x12a)],Window_EquipItem[_0x3b72d0(0x138)][_0x3b72d0(0x12a)]=function(){const _0x84982=_0x3b72d0;return this[_0x84982(0x18e)]()?Window_ItemList[_0x84982(0x138)][_0x84982(0x12a)][_0x84982(0x1b0)](this):VisuMZ[_0x84982(0x133)][_0x84982(0x155)]['call'](this);},VisuMZ[_0x3b72d0(0x133)]['Window_EquipItem_colSpacing']=Window_EquipItem[_0x3b72d0(0x138)][_0x3b72d0(0x15a)],Window_EquipItem[_0x3b72d0(0x138)][_0x3b72d0(0x15a)]=function(){const _0x603bca=_0x3b72d0;return this['usesVisualItemInventory']()?Window_ItemList[_0x603bca(0x138)][_0x603bca(0x15a)][_0x603bca(0x1b0)](this):VisuMZ[_0x603bca(0x133)][_0x603bca(0x177)][_0x603bca(0x1b0)](this);},Window_EquipItem[_0x3b72d0(0x138)][_0x3b72d0(0x124)]=function(_0x29793f){const _0x24a5a=_0x3b72d0,_0x27e8a8=this['itemRectWithPadding'](_0x29793f),_0x43cd13=VisuMZ[_0x24a5a(0x14a)]['Settings'][_0x24a5a(0x1bc)],_0x413295=_0x43cd13[_0x24a5a(0x13c)];this[_0x24a5a(0x16f)](![]),this[_0x24a5a(0x1a8)](_0x413295,_0x27e8a8),this[_0x24a5a(0x16f)](!![]);},VisuMZ['VisualItemInv'][_0x3b72d0(0x167)]=Window_ShopSell[_0x3b72d0(0x138)]['maxCols'],Window_ShopSell[_0x3b72d0(0x138)][_0x3b72d0(0x12a)]=function(){const _0x47354e=_0x3b72d0;return this[_0x47354e(0x18e)]()?Window_ItemList[_0x47354e(0x138)][_0x47354e(0x12a)]['call'](this):VisuMZ[_0x47354e(0x133)]['Window_ShopSell_maxCols'][_0x47354e(0x1b0)](this);},VisuMZ['VisualItemInv']['Window_ShopSell_colSpacing']=Window_ShopSell[_0x3b72d0(0x138)][_0x3b72d0(0x15a)],Window_ShopSell[_0x3b72d0(0x138)][_0x3b72d0(0x15a)]=function(){const _0x52b50b=_0x3b72d0;return this[_0x52b50b(0x18e)]()?Window_ItemList[_0x52b50b(0x138)][_0x52b50b(0x15a)]['call'](this):VisuMZ[_0x52b50b(0x133)][_0x52b50b(0x183)]['call'](this);};function _0x11a3(_0x1e63a5,_0x435d28){const _0x180891=_0x1808();return _0x11a3=function(_0x11a3f6,_0x283b85){_0x11a3f6=_0x11a3f6-0x113;let _0x5d5a9f=_0x180891[_0x11a3f6];return _0x5d5a9f;},_0x11a3(_0x1e63a5,_0x435d28);}function Window_VisualItemTooltip(){this['initialize'](...arguments);}function _0x1808(){const _0x2421a3=['visualPicture','isEnabled','Window_ItemList_callUpdateHelp','ARRAYNUM','getItemColor','changeTextColor','usesVisualItemInventory','TooltipOffsetY','_parentWindow','150340OcpaEN','getItemName','7621620XtbkVa','paintOpacity','itemAt','ITEM_AMPLIFY_SETTINGS','addChild','_item','ARRAYFUNC','IconSmoothing','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','parameters','placeItemNewLabelVisualItemInventory','setupVisualItemInvFontSettings','drawText','drawItemBackground','1673KTHzUn','OffsetY','lineHeight','contentsBack','clamp','right','update','drawBigIcon','IconSet','itemRectWithPadding','Window_ItemList_placeItemNewLabel','placeItemQuestLabelVisualItemInventory','confirmIcon','Settings','22808rEzCoF','call','loadPicture','placeItemQuestLabel','TooltipOffsetX','FONT_SIZE','format','filter','VISUAL_ITEM_ICON_SMOOTHING','active','1366aIuAFA','BG_TYPE','OFFSET_Y','EquipScene','refreshReturnCheck','Window_ItemList_drawItemBackground','VISUAL_ITEM_OUTLINE_SIZE','constructor','TooltipBgType','Label','initialize','item','imageSmoothingEnabled','center','drawItemAmplifyConfirm','bigPicture','scale','Window_Selectable_itemHeight','OutlineColor','_visualItemInventoryTooltipWindow','TooltipBufferWidth','18LjKlaj','OffsetX','JSON','FUNC','ConvertParams','length','Window_ItemList_maxCols','Window_ItemList_drawItem','exit','resetTextColor','setBackgroundType','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','RegExp','backOpacity','visible','IconSize','OFFSET_X','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawRemoveItem','EVAL','drawBigItemPicture','drawItemNumber','ItemQuantityFmt','itemRect','maxCols','ARRAYSTR','blt','width','Window_ItemList_colSpacing','_cursorRect','VISUAL_ITEM_OUTLINE_COLOR','innerWidth','drawBackgroundRect','VisualItemInv','drawItem','height','addLoadListener','Window_ItemList_initialize','prototype','description','_context','updatePosition','RemoveEquipIcon','create','Window_ItemList_rowSpacing','isOpen','numItems','map','ITEM_AMPLIFY_CONFIRM','drawBigItemIcon','isShowNew','outlineWidth','_visualItemHeight','textWidth','updateVisibility','drawItemBackgroundVisualItemInventory','ItemsEquipsCore','includes','rowSpacing','name','3620325lRplYX','match','Window_Base_drawItemNumber','return\x200','note','New','ShowTooltip','Window_EquipItem_maxCols','clear','QuestSystem','updatePadding','max','colSpacing','round','contents','iconIndex','strokeRect','parse','rgba(','VisuMZ_2_QuestSystem','TooltipFontSize','ItemQuantityFontSize','_scene','itemBackColor1','drawItemVisualItemInventory','Window_ShopSell_maxCols','fontSize','substring','ARRAYSTRUCT','ceil','itemBackColor2','477870kXZSAR','STR','changePaintOpacity','VISUAL_ITEM_CONSTRUCTORS','floor','refresh','bgColorNum2','Window_ItemList_placeItemQuestLabel','resetFontSettings','ARRAYJSON','Window_EquipItem_colSpacing','_amplifySkill','placeNewLabel','textColor','10254006DZPPrI','_clientArea','BUFFER_WIDTH','drawItemNumberVisualItemInventory','VisuMZ_1_ItemsEquipsCore','iconWidth','itemHeight','trim','Window_ShopSell_colSpacing','createVisualItemInventoryTooltipWindow','0.5','136bvQofN','placeItemNewLabel'];_0x1808=function(){return _0x2421a3;};return _0x1808();}Window_VisualItemTooltip[_0x3b72d0(0x138)]=Object[_0x3b72d0(0x13d)](Window_Base[_0x3b72d0(0x138)]),Window_VisualItemTooltip[_0x3b72d0(0x138)]['constructor']=Window_VisualItemTooltip,Window_VisualItemTooltip['BG_TYPE']=VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ae)][_0x3b72d0(0x1c1)],Window_VisualItemTooltip[_0x3b72d0(0x17d)]=VisuMZ[_0x3b72d0(0x133)][_0x3b72d0(0x1ae)][_0x3b72d0(0x1cd)],Window_VisualItemTooltip[_0x3b72d0(0x1b4)]=VisuMZ['VisualItemInv']['Settings'][_0x3b72d0(0x162)],Window_VisualItemTooltip[_0x3b72d0(0x122)]=VisuMZ['VisualItemInv'][_0x3b72d0(0x1ae)][_0x3b72d0(0x1b3)],Window_VisualItemTooltip[_0x3b72d0(0x1bb)]=VisuMZ[_0x3b72d0(0x133)]['Settings'][_0x3b72d0(0x18f)],Window_VisualItemTooltip[_0x3b72d0(0x138)][_0x3b72d0(0x1c3)]=function(_0x318d03){const _0x1e73ee=_0x3b72d0;this[_0x1e73ee(0x190)]=_0x318d03;const _0x102a67=new Rectangle(0x0,0x0,0x0,this[_0x1e73ee(0x1a3)]());Window_Base[_0x1e73ee(0x138)][_0x1e73ee(0x1c3)]['call'](this,_0x102a67),this[_0x1e73ee(0x120)]=![],this[_0x1e73ee(0x11f)]=0xff,this['opacity']=0xff,this['_item']=null;},Window_VisualItemTooltip[_0x3b72d0(0x138)][_0x3b72d0(0x158)]=function(){this['padding']=0x0;},Window_VisualItemTooltip[_0x3b72d0(0x138)]['setItem']=function(_0x39447c){const _0xf5436e=_0x3b72d0;if(this[_0xf5436e(0x198)]===_0x39447c&&!this['_amplifySkill'])return;this[_0xf5436e(0x198)]=_0x39447c,this[_0xf5436e(0x172)]();},Window_VisualItemTooltip[_0x3b72d0(0x138)]['refreshReturnCheck']=function(){const _0x5505dd=_0x3b72d0;if(this[_0x5505dd(0x190)]&&this['_parentWindow'][_0x5505dd(0x178)]){if(!this[_0x5505dd(0x198)])return!![];}return!!this[_0x5505dd(0x198)];},Window_VisualItemTooltip[_0x3b72d0(0x138)][_0x3b72d0(0x192)]=function(){const _0x3844db=_0x3b72d0;if(this[_0x3844db(0x190)]&&this[_0x3844db(0x190)][_0x3844db(0x178)]&&!this[_0x3844db(0x198)])return TextManager[_0x3844db(0x142)];return this[_0x3844db(0x198)]?this[_0x3844db(0x198)][_0x3844db(0x14d)]:'';},Window_VisualItemTooltip[_0x3b72d0(0x138)][_0x3b72d0(0x172)]=function(){const _0x1891af=_0x3b72d0;this[_0x1891af(0x15c)][_0x1891af(0x156)]();if(!this[_0x1891af(0x1bd)]())return;this[_0x1891af(0x175)](),this[_0x1891af(0x15c)][_0x1891af(0x168)]=Window_VisualItemTooltip[_0x1891af(0x1b4)];const _0x1238f6=this['getItemName'](),_0x4f9a42=this[_0x1891af(0x147)](_0x1238f6)+Window_VisualItemTooltip['BUFFER_WIDTH'];this[_0x1891af(0x12d)]=Math[_0x1891af(0x16b)](_0x4f9a42),this['createContents'](),this[_0x1891af(0x15c)][_0x1891af(0x168)]=Window_VisualItemTooltip[_0x1891af(0x1b4)];if(Imported['VisuMZ_1_ItemsEquipsCore']){const _0xed971a=ColorManager[_0x1891af(0x18c)](this[_0x1891af(0x198)]);this[_0x1891af(0x18d)](_0xed971a);}this[_0x1891af(0x19f)](_0x1238f6,0x0,0x0,this[_0x1891af(0x131)],_0x1891af(0x1c6)),this[_0x1891af(0x11b)](),this[_0x1891af(0x11c)](Window_VisualItemTooltip[_0x1891af(0x1ba)]);},Window_VisualItemTooltip['prototype'][_0x3b72d0(0x1a7)]=function(){const _0x23e0df=_0x3b72d0;Window_Base[_0x23e0df(0x138)][_0x23e0df(0x1a7)]['call'](this),this[_0x23e0df(0x148)](),this[_0x23e0df(0x13b)]();},Window_VisualItemTooltip['prototype'][_0x3b72d0(0x148)]=function(){const _0x38fe4c=_0x3b72d0,_0x26a61a=this[_0x38fe4c(0x120)];this[_0x38fe4c(0x120)]=this['_item']&&this[_0x38fe4c(0x190)][_0x38fe4c(0x1b8)]&&this[_0x38fe4c(0x190)][_0x38fe4c(0x13f)](),this[_0x38fe4c(0x190)]&&this[_0x38fe4c(0x190)][_0x38fe4c(0x178)]&&!this[_0x38fe4c(0x198)]&&(this[_0x38fe4c(0x120)]=!![]),_0x26a61a!==this['visible']&&SceneManager[_0x38fe4c(0x164)]['addChild'](this);},Window_VisualItemTooltip['prototype'][_0x3b72d0(0x13b)]=function(){const _0x3b7635=_0x3b72d0;if(!this['visible'])return;const _0x2631ed=SceneManager[_0x3b7635(0x164)]['_windowLayer'],_0x52fe58=this['_parentWindow'];let _0x13b2c1=_0x52fe58['x']+_0x2631ed['x'],_0x18c234=_0x52fe58['y']+_0x2631ed['y'];const _0x2b88ba=_0x52fe58[_0x3b7635(0x12f)],_0x44fb41=_0x52fe58[_0x3b7635(0x17c)],_0x16956b=_0x52fe58[_0x3b7635(0x1c9)]['x'],_0x542611=_0x52fe58[_0x3b7635(0x1c9)]['y'];_0x13b2c1+=_0x2b88ba['x']*_0x16956b+_0x2b88ba['width']*_0x16956b/0x2-this[_0x3b7635(0x12d)]/0x2+_0x44fb41['x']*_0x16956b,_0x18c234+=_0x2b88ba['y']*_0x542611-this[_0x3b7635(0x135)]+_0x44fb41['y']*_0x542611;let _0xedbe3a=_0x52fe58['y']+_0x2631ed['y']-this[_0x3b7635(0x135)]+_0x52fe58['padding']*_0x542611;_0xedbe3a+=Window_VisualItemTooltip[_0x3b7635(0x1bb)],_0x13b2c1+=Window_VisualItemTooltip[_0x3b7635(0x122)],_0x18c234+=Window_VisualItemTooltip['OFFSET_Y'],this['x']=Math[_0x3b7635(0x15b)](_0x13b2c1)[_0x3b7635(0x1a5)](0x0,Graphics[_0x3b7635(0x12d)]-this[_0x3b7635(0x12d)]),this['y']=Math[_0x3b7635(0x15b)](_0x18c234)['clamp'](0x0,Graphics[_0x3b7635(0x135)]-this[_0x3b7635(0x135)]);};