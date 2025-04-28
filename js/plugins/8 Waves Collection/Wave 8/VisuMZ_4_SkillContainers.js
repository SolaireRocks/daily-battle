//=============================================================================
// VisuStella MZ - Skill Containers
// VisuMZ_4_SkillContainers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillContainers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillContainers = VisuMZ.SkillContainers || {};
VisuMZ.SkillContainers.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [SkillContainers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Containers_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Containers let you transform skills in-game to contain an inner list
 * of skills, accessible to players. These container skills will draw from a
 * list of skills that either require the player to already have them or allow
 * them to even use skills they don't normally have access to.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill Containers let you condense skills to become containers for lists of
 *   other skills accessible to the player.
 * * Reduce the size of a skill library by grouping them together.
 * * Skill Containers can contain skills that require the actor to already know
 *   them (either through learning or traits) or forcefully allow them to be
 *   accessible regardless.
 * * These container skills don't appear unless the container itself has access
 *   to at least one skill.
 * * These container skills are usable from the skill menu or in-battle!
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Container-Related Notetags ===
 * 
 * ---
 *
 * <Known Skill List: id>
 * <Known Skills List: id, id, id>
 *
 * <Known Skill List: name>
 * <Known Skills List: name, name, name>
 * 
 * <Known Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills require the actor to have learned the skill or to have access
 *   to the skill 
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * - If you do not want known skills that should be in the Skill Container to
 *   be displayed in other skill menus, you will need to change those skills
 *   to have either a different Skill Type or "None" as the Skill Type.
 * 
 *   Examples:
 * 
 *   <Known Skills List: 51, 52, 53>
 *   <Known Skills List: Heal I, Heal II, Heal III>
 *   <Known Skills List: 51 To 53>
 *
 * ---
 *
 * <Force Skill List: id>
 * <Force Skills List: id, id, id>
 *
 * <Force Skill List: name>
 * <Force Skills List: name, name, name>
 * 
 * <Force Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills do NOT require the actor to have learned the skill. These
 *   listed skills will always be accessible.
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * - If you do not want known skills that should be in the Skill Container to
 *   be displayed in other skill menus, you will need to change those skills
 *   to have either a different Skill Type or "None" as the Skill Type.
 * 
 *   Examples:
 * 
 *   <Force Skills List: 51, 52, 53>
 *   <Force Skills List: Heal I, Heal II, Heal III>
 *   <Force Skills List: 51 To 53>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The Plugin Parameters allow you to adjust how the text for Skill Containers
 * appear in-game. This way, you can help your players differentiate them from
 * regular skills.
 *
 * ---
 *
 * General
 * 
 *   Skill Container Text:
 *   - Determines the text that appears where the skill costs normally would
 *     appear instead.
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
 * Version 1.06: August 29, 2024
 * * Documentation Update!
 * ** Added new instructions to notetags available:
 * *** If you do not want known skills that should be in the Skill Container to
 *     be displayed in other skill menus, you will need to change those skills
 *     to have either a different Skill Type or "None" as the Skill Type.
 * 
 * Version 1.05: May 16, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Skill Learn System, allowing actors to
 *    learn skill containers. Update made by Irina.
 * 
 * Version 1.04: September 8, 2022
 * * Feature Update!
 * ** Removed function dependency on Skills & States Core to prevent crash.
 *    Update made by Irina.
 * 
 * Version 1.03: December 9, 2021
 * * Bug Fixes!
 * ** Plugin Parameter for Skill Container Text should now work properly.
 * 
 * Version 1.02: June 4, 2021
 * * Compatibility Update!
 * ** Skill containers should now work with Auto Battle. This does not apply
 *    to enemies, however. Enemies will still require the actual skills to be
 *    used properly. Update made by Olivia.
 * 
 * Version 1.01: April 30, 2021
 * * Compatibility Update!
 * ** Skills displayed inside the containers are now affected by the visibility
 *    notetags such as <Show Switch: x> and <Hide Switch :x> as well as the
 *    <JS Skill Visible> notetags. Update made by Arisu.
 * * Feature Update!
 * ** When using the VisuMZ_3_SideviewBattleUI plugin, resize the window
 *    according to the title items inside of the container window instead of
 *    basing it off the skill window's size. Update made by Olivia.
 *
 * Version 1.00 Official Release Date: May 7, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableSkillContainersMenu
 * @text System: Enable SkillContainers in Menu?
 * @desc Enables/disables SkillContainers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables SkillContainers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillContainersMenu
 * @text System: Show SkillContainers in Menu?
 * @desc Shows/hides SkillContainers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides SkillContainers menu inside the main menu.
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
 * @param SkillContainers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ContainerText:str
 * @text Skill Container Text
 * @desc Determines the text that appears where the skill costs
 * normally would appear instead.
 * @default \FS[22]...
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

const _0x20a10c=_0x4d4a;(function(_0x241027,_0x526523){const _0x5d525c=_0x4d4a,_0x461d42=_0x241027();while(!![]){try{const _0x3cbd5f=parseInt(_0x5d525c(0x9d))/0x1*(parseInt(_0x5d525c(0x80))/0x2)+parseInt(_0x5d525c(0x71))/0x3*(parseInt(_0x5d525c(0x93))/0x4)+parseInt(_0x5d525c(0xb8))/0x5*(parseInt(_0x5d525c(0xb3))/0x6)+-parseInt(_0x5d525c(0xd3))/0x7+parseInt(_0x5d525c(0xac))/0x8*(-parseInt(_0x5d525c(0xc6))/0x9)+parseInt(_0x5d525c(0x76))/0xa+-parseInt(_0x5d525c(0xc7))/0xb;if(_0x3cbd5f===_0x526523)break;else _0x461d42['push'](_0x461d42['shift']());}catch(_0x98791c){_0x461d42['push'](_0x461d42['shift']());}}}(_0x2082,0x392b5));function _0x4d4a(_0x20c5f1,_0xe119e9){const _0x208251=_0x2082();return _0x4d4a=function(_0x4d4a29,_0x5de256){_0x4d4a29=_0x4d4a29-0x66;let _0x468a2d=_0x208251[_0x4d4a29];return _0x468a2d;},_0x4d4a(_0x20c5f1,_0xe119e9);}function _0x2082(){const _0x45021b=['push','makeItemList','_skillIDs','match','STR','width','ForceList','refresh','call','addSkillContainerStack','version','481880eyorCu','usableSkills','onSkillCancel','containerIncludes','FUNC','ForceListRange','Window_ActorCommand_canAddSkillCommand','skill','Scene_Battle_onSkillOk','activate','skillContainerText','textSizeEx','_itemWindow','Scene_Skill_onItemOk','Game_Actor_usableSkills','3Nofsxg','updateSideviewUiPosition','isShowingSkillContainerList','JSON','indexOf','238370SPFEJg','Window_SkillList_makeItemList','note','name','item','removeSkillContainerStack','hasSkill','exit','forceSelect','drawSkillCost','102374itwfOH','Window_SkillList_includes','VisuMZ_2_SkillLearnSystem','Scene_Battle_onSkillCancel','ARRAYFUNC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','resetFontSettings','Scene_Skill_onItemCancel','addSkillContainerSkills','RegExp','initialize','status','processSkillContainerOk','Window_SkillList_drawSkillCost','KnownListRange','getSkillContainerList','map','ARRAYNUM','checkShowHideJS','1449304ajtMab','trim','ConvertParams','split','SkillContainers','selectNextCommand','STRUCT','parse','concat','adjustSideviewUiHeight','5CUTymP','KnownList','onItemCancel','_skillContainerLoops','length','makeSkillContainerList','_skillWindow','includes','pop','checkShowHideNotetags','_skillContainerStack','canAddSkillCommand','ARRAYJSON','_data','Window_SkillList_initialize','8sDPWaV','onItemOk','clearSkillContainerStacks','Settings','NUM','_actor','parameters','581004LVCXfW','index','parseSkillContainerList','ContainerText','isSkillContainer','5hpjuXI','onSkillOk','isSkillLearnMode','ARRAYEVAL','getSkillIdWithName','processSkillContainerCancel','format','prototype','filter','Scene_Battle_selectNextCommand','VisuMZ_1_SkillsStatesCore','VisuMZ_1_BattleCore','description','toUpperCase','416088RryhlP','4286645neZpky'];_0x2082=function(){return _0x45021b;};return _0x2082();}var label=_0x20a10c(0x97),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x20a10c(0xc0)](function(_0x1b1add){const _0x19440f=_0x20a10c;return _0x1b1add[_0x19440f(0x8b)]&&_0x1b1add[_0x19440f(0xc4)][_0x19440f(0xa4)]('['+label+']');})[0x0];VisuMZ[label][_0x20a10c(0xaf)]=VisuMZ[label][_0x20a10c(0xaf)]||{},VisuMZ['ConvertParams']=function(_0x2477fe,_0x532f29){const _0x59a259=_0x20a10c;for(const _0x28a4c2 in _0x532f29){if(_0x28a4c2['match'](/(.*):(.*)/i)){const _0x568b9e=String(RegExp['$1']),_0x22aa22=String(RegExp['$2'])[_0x59a259(0xc5)]()['trim']();let _0x5aafe2,_0xcafb53,_0x3b0ab0;switch(_0x22aa22){case _0x59a259(0xb0):_0x5aafe2=_0x532f29[_0x28a4c2]!==''?Number(_0x532f29[_0x28a4c2]):0x0;break;case _0x59a259(0x91):_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53['map'](_0x2e5277=>Number(_0x2e5277));break;case'EVAL':_0x5aafe2=_0x532f29[_0x28a4c2]!==''?eval(_0x532f29[_0x28a4c2]):null;break;case _0x59a259(0xbb):_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53['map'](_0x367826=>eval(_0x367826));break;case _0x59a259(0x74):_0x5aafe2=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):'';break;case _0x59a259(0xa9):_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON['parse'](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53[_0x59a259(0x90)](_0x43e518=>JSON[_0x59a259(0x9a)](_0x43e518));break;case _0x59a259(0x66):_0x5aafe2=_0x532f29[_0x28a4c2]!==''?new Function(JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2])):new Function('return\x200');break;case _0x59a259(0x84):_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON['parse'](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53[_0x59a259(0x90)](_0x4f7e3b=>new Function(JSON[_0x59a259(0x9a)](_0x4f7e3b)));break;case _0x59a259(0xcc):_0x5aafe2=_0x532f29[_0x28a4c2]!==''?String(_0x532f29[_0x28a4c2]):'';break;case'ARRAYSTR':_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53[_0x59a259(0x90)](_0x372d03=>String(_0x372d03));break;case _0x59a259(0x99):_0x3b0ab0=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):{},_0x5aafe2=VisuMZ[_0x59a259(0x95)]({},_0x3b0ab0);break;case'ARRAYSTRUCT':_0xcafb53=_0x532f29[_0x28a4c2]!==''?JSON[_0x59a259(0x9a)](_0x532f29[_0x28a4c2]):[],_0x5aafe2=_0xcafb53['map'](_0x4185ae=>VisuMZ[_0x59a259(0x95)]({},JSON[_0x59a259(0x9a)](_0x4185ae)));break;default:continue;}_0x2477fe[_0x568b9e]=_0x5aafe2;}}return _0x2477fe;},(_0x12bcab=>{const _0x35ca7b=_0x20a10c,_0x2d5f60=_0x12bcab[_0x35ca7b(0x79)];for(const _0x28ae22 of dependencies){if(!Imported[_0x28ae22]){alert(_0x35ca7b(0x85)[_0x35ca7b(0xbe)](_0x2d5f60,_0x28ae22)),SceneManager[_0x35ca7b(0x7d)]();break;}}const _0x2a2740=_0x12bcab[_0x35ca7b(0xc4)];if(_0x2a2740[_0x35ca7b(0xcb)](/\[Version[ ](.*?)\]/i)){const _0x2670b4=Number(RegExp['$1']);_0x2670b4!==VisuMZ[label][_0x35ca7b(0xd2)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x35ca7b(0xbe)](_0x2d5f60,_0x2670b4)),SceneManager[_0x35ca7b(0x7d)]());}if(_0x2a2740[_0x35ca7b(0xcb)](/\[Tier[ ](\d+)\]/i)){const _0x1d966e=Number(RegExp['$1']);_0x1d966e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x35ca7b(0xbe)](_0x2d5f60,_0x1d966e,tier)),SceneManager['exit']()):tier=Math['max'](_0x1d966e,tier);}VisuMZ[_0x35ca7b(0x95)](VisuMZ[label][_0x35ca7b(0xaf)],_0x12bcab[_0x35ca7b(0xb2)]);})(pluginData),VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x89)]={'KnownList':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'KnownListRange':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'ForceList':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'ForceListRange':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi},DataManager[_0x20a10c(0xb7)]=function(_0x43fbcb){const _0x293172=_0x20a10c;if(!_0x43fbcb)return![];typeof _0x43fbcb===Number&&(_0x43fbcb=$dataSkills[_0x43fbcb]);const _0xd434cf=VisuMZ['SkillContainers']['RegExp'],_0x2ce034=_0x43fbcb['note'];return _0x2ce034[_0x293172(0xcb)](_0xd434cf[_0x293172(0x9e)])||_0x2ce034[_0x293172(0xcb)](_0xd434cf[_0x293172(0xce)]);},DataManager[_0x20a10c(0x8f)]=function(_0x2c03b0,_0x11f950){const _0x3858eb=_0x20a10c;if(!_0x11f950)return[];const _0xeaf181=VisuMZ[_0x3858eb(0x97)]['RegExp'],_0x278c26=_0x11f950[_0x3858eb(0x78)];let _0x2bbb8b=[];if(_0x2c03b0){if(!![]){const _0x211469=_0x278c26['match'](_0xeaf181[_0x3858eb(0x9e)]);if(_0x211469)for(const _0xc7de56 of _0x211469){_0xc7de56[_0x3858eb(0xcb)](_0xeaf181[_0x3858eb(0x9e)]);let _0x6c4b32=DataManager[_0x3858eb(0xb5)](RegExp['$1']);_0x6c4b32=_0x6c4b32[_0x3858eb(0xc0)](_0x5d22ca=>_0x2c03b0[_0x3858eb(0x7c)](_0x5d22ca)),_0x2bbb8b=_0x2bbb8b['concat'](_0x6c4b32);}}if(!![]){const _0x9a7d7b=_0x278c26[_0x3858eb(0xcb)](_0xeaf181[_0x3858eb(0x8e)]);if(_0x9a7d7b)for(const _0x22e75b of _0x9a7d7b){_0x22e75b['match'](_0xeaf181['KnownListRange']);const _0x49ac53=Number(RegExp['$1']),_0x1f968f=Number(RegExp['$2']);let _0x387b64=[];for(let _0x4f8115=_0x49ac53;_0x4f8115<=_0x1f968f;_0x4f8115++){_0x387b64[_0x3858eb(0xc8)](_0x4f8115);}_0x387b64=_0x387b64[_0x3858eb(0xc0)](_0x4a864d=>_0x2c03b0[_0x3858eb(0x7c)](_0x4a864d)),_0x2bbb8b=_0x2bbb8b[_0x3858eb(0x9b)](_0x387b64);}}}if(!![]){if(!![]){const _0x4af066=_0x278c26['match'](_0xeaf181['ForceList']);if(_0x4af066)for(const _0x22374d of _0x4af066){_0x22374d[_0x3858eb(0xcb)](_0xeaf181[_0x3858eb(0xce)]);let _0x56aa7e=DataManager[_0x3858eb(0xb5)](RegExp['$1']);_0x2bbb8b=_0x2bbb8b[_0x3858eb(0x9b)](_0x56aa7e);}}if(!![]){const _0x28dca9=_0x278c26[_0x3858eb(0xcb)](_0xeaf181[_0x3858eb(0x67)]);if(_0x28dca9)for(const _0x1871c9 of _0x28dca9){_0x1871c9[_0x3858eb(0xcb)](_0xeaf181[_0x3858eb(0x67)]);const _0x4cb71b=Number(RegExp['$1']),_0x356ed3=Number(RegExp['$2']);let _0x85e5ab=[];for(let _0x20aeb0=_0x4cb71b;_0x20aeb0<=_0x356ed3;_0x20aeb0++){_0x85e5ab['push'](_0x20aeb0);}_0x2bbb8b=_0x2bbb8b[_0x3858eb(0x9b)](_0x85e5ab);}}}return _0x2bbb8b=_0x2bbb8b[_0x3858eb(0xc0)](_0x3b2db7=>!!$dataSkills[_0x3b2db7]),_0x2bbb8b=_0x2bbb8b[_0x3858eb(0xc0)](_0x4391a9=>_0x4391a9!==_0x11f950['id']),_0x2bbb8b=_0x2bbb8b['filter'](_0x40f0a4=>$dataSkills[_0x40f0a4][_0x3858eb(0x79)][_0x3858eb(0x94)]()!==''),_0x2bbb8b=_0x2bbb8b[_0x3858eb(0xc0)](_0x3efdfc=>!$dataSkills[_0x3efdfc]['name'][_0x3858eb(0xcb)](/-----/i)),_0x2bbb8b=_0x2bbb8b['filter']((_0x477663,_0x54c4e2,_0x1b0a43)=>_0x1b0a43[_0x3858eb(0x75)](_0x477663)===_0x54c4e2),_0x2bbb8b['sort']((_0x567c49,_0x23e6c2)=>_0x567c49-_0x23e6c2),_0x2bbb8b;},DataManager[_0x20a10c(0xb5)]=function(_0x5a17a1){const _0x3475fe=_0x20a10c;_0x5a17a1=_0x5a17a1[_0x3475fe(0x96)](',')['map'](_0x35a154=>_0x35a154[_0x3475fe(0x94)]());let _0x5b8235=[];for(let _0x37b13f of _0x5a17a1){_0x37b13f=(String(_0x37b13f)||'')[_0x3475fe(0x94)]();const _0x38de26=/^\d+$/['test'](_0x37b13f);_0x38de26?_0x5b8235['push'](Number(_0x37b13f)):_0x5b8235[_0x3475fe(0xc8)](DataManager[_0x3475fe(0xbc)](_0x37b13f));}return _0x5b8235;},DataManager['getSkillIdWithName']=function(_0x170e4c){const _0x127448=_0x20a10c;_0x170e4c=_0x170e4c[_0x127448(0xc5)]()[_0x127448(0x94)](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x127448(0xca)][_0x170e4c])return this[_0x127448(0xca)][_0x170e4c];for(const _0x4b4ec4 of $dataSkills){if(!_0x4b4ec4)continue;this[_0x127448(0xca)][_0x4b4ec4['name'][_0x127448(0xc5)]()[_0x127448(0x94)]()]=_0x4b4ec4['id'];}return this[_0x127448(0xca)][_0x170e4c]||0x0;},TextManager[_0x20a10c(0x6c)]=VisuMZ['SkillContainers']['Settings'][_0x20a10c(0xb6)],VisuMZ[_0x20a10c(0x97)]['Scene_Skill_onItemOk']=Scene_Skill[_0x20a10c(0xbf)]['onItemOk'],Scene_Skill[_0x20a10c(0xbf)][_0x20a10c(0xad)]=function(){const _0xa5e971=_0x20a10c,_0x4ff48a=this[_0xa5e971(0x7a)]();if(DataManager[_0xa5e971(0xb7)](_0x4ff48a)){if(Imported[_0xa5e971(0x82)]&&this['_itemWindow']['isSkillLearnMode']())return VisuMZ[_0xa5e971(0x97)][_0xa5e971(0x6f)][_0xa5e971(0xd0)](this);this['processSkillContainerOk']();}else VisuMZ[_0xa5e971(0x97)][_0xa5e971(0x6f)][_0xa5e971(0xd0)](this);},Scene_Skill['prototype'][_0x20a10c(0x8c)]=function(){const _0x5e555a=_0x20a10c,_0xad7757={'skill':this['_itemWindow']['item'](),'index':this[_0x5e555a(0x6e)]['index']()};this[_0x5e555a(0x6e)]['addSkillContainerStack'](_0xad7757),this[_0x5e555a(0x6e)][_0x5e555a(0x6b)]();},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x87)]=Scene_Skill[_0x20a10c(0xbf)][_0x20a10c(0x9f)],Scene_Skill[_0x20a10c(0xbf)][_0x20a10c(0x9f)]=function(){const _0x9041c2=_0x20a10c;this[_0x9041c2(0x6e)][_0x9041c2(0x73)]()?this['processSkillContainerCancel']():VisuMZ[_0x9041c2(0x97)]['Scene_Skill_onItemCancel'][_0x9041c2(0xd0)](this);},Scene_Skill[_0x20a10c(0xbf)]['processSkillContainerCancel']=function(){const _0x1d5511=_0x20a10c;this[_0x1d5511(0x6e)][_0x1d5511(0x7b)](),this[_0x1d5511(0x6e)][_0x1d5511(0x6b)]();},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x6a)]=Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0xb9)],Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0xb9)]=function(){const _0x461eb4=_0x20a10c,_0x4caf21=this[_0x461eb4(0xa3)][_0x461eb4(0x7a)]();DataManager[_0x461eb4(0xb7)](_0x4caf21)?this['processSkillContainerOk']():VisuMZ[_0x461eb4(0x97)]['Scene_Battle_onSkillOk']['call'](this);},Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0x8c)]=function(){const _0x10b605=_0x20a10c,_0x4131fb={'skill':this[_0x10b605(0xa3)]['item'](),'index':this[_0x10b605(0xa3)][_0x10b605(0xb4)]()};this[_0x10b605(0xa3)][_0x10b605(0xd1)](_0x4131fb),this[_0x10b605(0xa3)][_0x10b605(0x6b)]();},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x83)]=Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0xd5)],Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0xd5)]=function(){const _0x44bcfd=_0x20a10c;this[_0x44bcfd(0xa3)][_0x44bcfd(0x73)]()?this[_0x44bcfd(0xbd)]():VisuMZ[_0x44bcfd(0x97)]['Scene_Battle_onSkillCancel'][_0x44bcfd(0xd0)](this);},Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0xbd)]=function(){const _0x3a3c73=_0x20a10c;this['_skillWindow'][_0x3a3c73(0x7b)](),this['_skillWindow'][_0x3a3c73(0x6b)]();},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0xc1)]=Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0x98)],Scene_Battle[_0x20a10c(0xbf)][_0x20a10c(0x98)]=function(){const _0x2c29b0=_0x20a10c;this[_0x2c29b0(0xa3)]&&this['_skillWindow'][_0x2c29b0(0xae)](![]),VisuMZ[_0x2c29b0(0x97)][_0x2c29b0(0xc1)][_0x2c29b0(0xd0)](this);},VisuMZ['SkillContainers'][_0x20a10c(0x70)]=Game_Actor['prototype'][_0x20a10c(0xd4)],Game_Actor['prototype'][_0x20a10c(0xd4)]=function(){const _0x43cf59=_0x20a10c;let _0x25447e=VisuMZ[_0x43cf59(0x97)][_0x43cf59(0x70)][_0x43cf59(0xd0)](this);return this['_skillContainerLoops']=0x0,_0x25447e=this[_0x43cf59(0x88)](_0x25447e),_0x25447e;},Game_Actor['prototype'][_0x20a10c(0x88)]=function(_0x109a22){const _0xba765=_0x20a10c;if(this[_0xba765(0xa0)]>=0x64)return _0x109a22;for(const _0xab53d4 of _0x109a22){if(!_0xab53d4)continue;if(DataManager[_0xba765(0xb7)](_0xab53d4)){let _0xb45d25=DataManager['getSkillContainerList'](this,_0xab53d4);_0xb45d25=_0xb45d25[_0xba765(0x90)](_0x4aecc1=>$dataSkills[_0x4aecc1]),_0xb45d25=_0xb45d25[_0xba765(0xc0)](_0x5b1f62=>!!_0x5b1f62),_0xb45d25=this[_0xba765(0x88)](_0xb45d25),_0x109a22=_0x109a22[_0xba765(0x9b)](_0xb45d25);}}return _0x109a22;},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0xab)]=Window_SkillList[_0x20a10c(0xbf)]['initialize'],Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0x8a)]=function(_0x12c6d1){const _0x2a80e1=_0x20a10c;VisuMZ[_0x2a80e1(0x97)]['Window_SkillList_initialize'][_0x2a80e1(0xd0)](this,_0x12c6d1),this[_0x2a80e1(0xa7)]=[];},Window_SkillList[_0x20a10c(0xbf)]['addSkillContainerStack']=function(_0x45985e){const _0x10110a=_0x20a10c;this['_skillContainerStack']['push'](_0x45985e),this[_0x10110a(0xcf)](),this['forceSelect'](0x0);},Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0x7b)]=function(){const _0x513909=_0x20a10c;if(this['_skillContainerStack']['length']<=0x0)return;const _0x57a888=this[_0x513909(0xa7)][this['_skillContainerStack'][_0x513909(0xa1)]-0x1],_0x3dc187=_0x57a888['index']||0x0;this[_0x513909(0xa7)][_0x513909(0xa5)](),this[_0x513909(0xcf)](),this[_0x513909(0x7e)](_0x3dc187);},Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0xae)]=function(_0x435cf9){const _0x5e3a9b=_0x20a10c;if(this['_skillContainerStack'][_0x5e3a9b(0xa1)]<=0x0)return;const _0x221436=this[_0x5e3a9b(0xa7)][0x0],_0x2e9e1d=_0x221436[_0x5e3a9b(0xb4)]||0x0;this[_0x5e3a9b(0xa7)]=[],_0x435cf9&&(this[_0x5e3a9b(0xcf)](),this[_0x5e3a9b(0x7e)](_0x2e9e1d));},Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0x73)]=function(){const _0x1817a8=_0x20a10c;return this['_skillContainerStack'][_0x1817a8(0xa1)]>0x0;},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x77)]=Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0xc9)],Window_SkillList['prototype'][_0x20a10c(0xc9)]=function(){const _0x58431d=_0x20a10c;this[_0x58431d(0x73)]()?this[_0x58431d(0xa2)]():VisuMZ[_0x58431d(0x97)][_0x58431d(0x77)][_0x58431d(0xd0)](this);},VisuMZ['SkillContainers'][_0x20a10c(0x81)]=Window_SkillList['prototype'][_0x20a10c(0xa4)],Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0xa4)]=function(_0x53cea1){const _0x53630a=_0x20a10c;if(_0x53cea1&&DataManager[_0x53630a(0xb7)](_0x53cea1)){if(Imported[_0x53630a(0x82)]&&this[_0x53630a(0xba)]())return VisuMZ[_0x53630a(0x97)][_0x53630a(0x81)]['call'](this,_0x53cea1);const _0xf1f821=DataManager['getSkillContainerList'](this[_0x53630a(0xb1)],_0x53cea1);if(_0xf1f821[_0x53630a(0xa1)]<=0x0)return![];}return VisuMZ[_0x53630a(0x97)][_0x53630a(0x81)][_0x53630a(0xd0)](this,_0x53cea1);},Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0xa2)]=function(){const _0x3ba051=_0x20a10c,_0x316cc4=this['_skillContainerStack'][this['_skillContainerStack'][_0x3ba051(0xa1)]-0x1],_0x4857c1=_0x316cc4[_0x3ba051(0x69)],_0x26ead4=DataManager[_0x3ba051(0x8f)](this[_0x3ba051(0xb1)],_0x4857c1);this[_0x3ba051(0xaa)]=_0x26ead4[_0x3ba051(0x90)](_0x123747=>$dataSkills[_0x123747])[_0x3ba051(0xc0)](_0x2f268b=>!!_0x2f268b&&this[_0x3ba051(0xd6)](_0x2f268b)),Imported['VisuMZ_3_SideviewBattleUI']&&(this['adjustSideviewUiWidth'](),this[_0x3ba051(0x9c)](),this[_0x3ba051(0x72)]());},Window_SkillList[_0x20a10c(0xbf)]['containerIncludes']=function(_0x2bb649){const _0x49fa47=_0x20a10c;if(Imported[_0x49fa47(0xc2)]){if(!this[_0x49fa47(0xa6)](_0x2bb649))return![];if(!this[_0x49fa47(0x92)](_0x2bb649))return![];}return!![];},VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x8d)]=Window_SkillList[_0x20a10c(0xbf)][_0x20a10c(0x7f)],Window_SkillList['prototype'][_0x20a10c(0x7f)]=function(_0x45775d,_0x41006e,_0x4df534,_0x516a64){const _0x250a7c=_0x20a10c;if(DataManager[_0x250a7c(0xb7)](_0x45775d)){if(Imported[_0x250a7c(0x82)]&&this[_0x250a7c(0xba)]())return VisuMZ['SkillContainers'][_0x250a7c(0x8d)][_0x250a7c(0xd0)](this,_0x45775d,_0x41006e,_0x4df534,_0x516a64);this['drawSkillContainerText'](_0x45775d,_0x41006e,_0x4df534,_0x516a64);}else VisuMZ[_0x250a7c(0x97)]['Window_SkillList_drawSkillCost'][_0x250a7c(0xd0)](this,_0x45775d,_0x41006e,_0x4df534,_0x516a64);},Window_SkillList['prototype']['drawSkillContainerText']=function(_0x17ed56,_0x2c4d88,_0x10542a,_0x132f54){const _0x5feef3=_0x20a10c;if(!_0x17ed56)return;this[_0x5feef3(0x86)]();const _0x1f75fd=TextManager[_0x5feef3(0x6c)],_0x8808f2=this[_0x5feef3(0x6d)](_0x1f75fd)[_0x5feef3(0xcd)];_0x2c4d88+=_0x132f54-_0x8808f2,this['drawTextEx'](_0x1f75fd,_0x2c4d88,_0x10542a,_0x8808f2),this['resetFontSettings']();};Imported[_0x20a10c(0xc3)]&&(VisuMZ[_0x20a10c(0x97)][_0x20a10c(0x68)]=Window_ActorCommand[_0x20a10c(0xbf)][_0x20a10c(0xa8)],Window_ActorCommand[_0x20a10c(0xbf)][_0x20a10c(0xa8)]=function(_0x586d58){const _0x521dee=_0x20a10c;return DataManager[_0x521dee(0xb7)](_0x586d58)?![]:VisuMZ[_0x521dee(0x97)][_0x521dee(0x68)][_0x521dee(0xd0)](this,_0x586d58);});;