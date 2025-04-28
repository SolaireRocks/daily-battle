//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   Separate Skill Type?:
 *   - Separate learnable skills by skill type?
 * 
 *   Hide Learned Skills
 *   - Hide skills after they are learned?
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * 
 *   Separation:
 * 
 *     Indent Skills:
 *     - When separated, indent skills by this many pixels.
 * 
 *     Category Format:
 *     - Skill type category name format
 *     - %1 - Name
 * 
 *     Collapse Format:
 *     - Format for command to collapse skill type.
 *     - %1 - Name
 * 
 *     Expand Format:
 *     - Format for command to expand skill type.
 *     - %1 - Name
 * 
 *     Font Color:
 *     - When separated, indent skills by this many pixels.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.16: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a compatibility bug that would cause the last skill of a list to be
 *    removed from learning. Fix made by Irina.
 * 
 * Version 1.15: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Skills and States Core features!
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Added new Plugin Parameter by Irina:
 * *** Parameters > General Settings > Hide Learned Skills
 * **** Hide skills after they are learned?
 * 
 * Version 1.14: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where skill ID's could clash with state ID's from Equip
 *    Passive System and preventing states from being learned. Fixed by Irina.
 * 
 * Version 1.13: March 14, 2024
 * * Compatibility Update!
 * ** Fixed a problem where the learn passive notetags from the Equip Passive
 *    System plugin could be blocked by other plugins. Fix made by Irina.
 * 
 * Version 1.12: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: May 18, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a visual listing bug effect when 'CP' and 'JP' are listed under
 *    costs but the VisuMZ Class Change System plugin isn't present. Fix made
 *    by Olivia.
 * 
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param SeparateByStypeID:eval
 * @text Separate Skill Type?
 * @parent Visual
 * @type boolean
 * @on Separate
 * @off Don't
 * @desc Separate learnable skills by skill type?
 * @default false
 *
 * @param HideLearned:eval
 * @text Hide Learned Skills
 * @parent Visual
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Hide skills after they are learned?
 * @default false
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 * @param Separation
 * @parent Vocabulary
 *
 * @param SeparateIndent:num
 * @text Indent Skills
 * @parent Separation
 * @desc When separated, indent skills by this many pixels.
 * @default 16
 *
 * @param SeparateCategoryFmt:str
 * @text Category Format
 * @parent Separation
 * @desc Skill type category name format
 * %1 - Name
 * @default %1
 *
 * @param SeparateCollapseFmt:str
 * @text Collapse Format
 * @parent Separation
 * @desc Format for command to collapse skill type.
 * %1 - Name
 * @default %1 [-]
 *
 * @param SeparateExpandFmt:str
 * @text Expand Format
 * @parent Separation
 * @desc Format for command to expand skill type.
 * %1 - Name
 * @default %1 [+]
 *
 * @param StypeCategoryColor:str
 * @text Font Color
 * @parent Separation
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x21fdcc=_0x1b68;(function(_0x487d47,_0x5862c5){const _0x46494e=_0x1b68,_0x5c9a6b=_0x487d47();while(!![]){try{const _0x3babf5=parseInt(_0x46494e(0x30d))/0x1+-parseInt(_0x46494e(0x291))/0x2+parseInt(_0x46494e(0x320))/0x3+-parseInt(_0x46494e(0x26f))/0x4*(parseInt(_0x46494e(0x382))/0x5)+-parseInt(_0x46494e(0x180))/0x6+parseInt(_0x46494e(0x1eb))/0x7+parseInt(_0x46494e(0x1d5))/0x8*(parseInt(_0x46494e(0x261))/0x9);if(_0x3babf5===_0x5862c5)break;else _0x5c9a6b['push'](_0x5c9a6b['shift']());}catch(_0x52f46d){_0x5c9a6b['push'](_0x5c9a6b['shift']());}}}(_0x5b34,0xc7437));function _0x1b68(_0x29c8c8,_0x31078a){const _0x5b34fa=_0x5b34();return _0x1b68=function(_0x1b688d,_0x2c1797){_0x1b688d=_0x1b688d-0x15f;let _0x3ad4bf=_0x5b34fa[_0x1b688d];return _0x3ad4bf;},_0x1b68(_0x29c8c8,_0x31078a);}var label=_0x21fdcc(0x1e3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21fdcc(0x301)](function(_0x195827){const _0x1f6486=_0x21fdcc;return _0x195827[_0x1f6486(0x241)]&&_0x195827['description'][_0x1f6486(0x37e)]('['+label+']');})[0x0];VisuMZ[label][_0x21fdcc(0x339)]=VisuMZ[label][_0x21fdcc(0x339)]||{},VisuMZ[_0x21fdcc(0x163)]=function(_0x1cb2ad,_0x34d98a){const _0x5edf31=_0x21fdcc;for(const _0x5ec858 in _0x34d98a){if(_0x5ec858['match'](/(.*):(.*)/i)){const _0x483fec=String(RegExp['$1']),_0x312a0d=String(RegExp['$2'])['toUpperCase']()[_0x5edf31(0x313)]();let _0x4f98a8,_0x475039,_0x4793a7;switch(_0x312a0d){case _0x5edf31(0x227):_0x4f98a8=_0x34d98a[_0x5ec858]!==''?Number(_0x34d98a[_0x5ec858]):0x0;break;case'ARRAYNUM':_0x475039=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039[_0x5edf31(0x362)](_0x1b5f8f=>Number(_0x1b5f8f));break;case _0x5edf31(0x305):_0x4f98a8=_0x34d98a[_0x5ec858]!==''?eval(_0x34d98a[_0x5ec858]):null;break;case'ARRAYEVAL':_0x475039=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039[_0x5edf31(0x362)](_0x286f33=>eval(_0x286f33));break;case _0x5edf31(0x283):_0x4f98a8=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):'';break;case'ARRAYJSON':_0x475039=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039[_0x5edf31(0x362)](_0xbf393f=>JSON['parse'](_0xbf393f));break;case'FUNC':_0x4f98a8=_0x34d98a[_0x5ec858]!==''?new Function(JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858])):new Function(_0x5edf31(0x2b4));break;case _0x5edf31(0x302):_0x475039=_0x34d98a[_0x5ec858]!==''?JSON['parse'](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039[_0x5edf31(0x362)](_0x13659c=>new Function(JSON[_0x5edf31(0x2aa)](_0x13659c)));break;case'STR':_0x4f98a8=_0x34d98a[_0x5ec858]!==''?String(_0x34d98a[_0x5ec858]):'';break;case _0x5edf31(0x1a4):_0x475039=_0x34d98a[_0x5ec858]!==''?JSON['parse'](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039[_0x5edf31(0x362)](_0x3ede9f=>String(_0x3ede9f));break;case'STRUCT':_0x4793a7=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):{},_0x4f98a8=VisuMZ[_0x5edf31(0x163)]({},_0x4793a7);break;case'ARRAYSTRUCT':_0x475039=_0x34d98a[_0x5ec858]!==''?JSON[_0x5edf31(0x2aa)](_0x34d98a[_0x5ec858]):[],_0x4f98a8=_0x475039['map'](_0x5462b6=>VisuMZ[_0x5edf31(0x163)]({},JSON[_0x5edf31(0x2aa)](_0x5462b6)));break;default:continue;}_0x1cb2ad[_0x483fec]=_0x4f98a8;}}return _0x1cb2ad;},(_0x57367c=>{const _0x285e42=_0x21fdcc,_0x48ae59=_0x57367c[_0x285e42(0x29e)];for(const _0x202836 of dependencies){if(!Imported[_0x202836]){alert(_0x285e42(0x28d)[_0x285e42(0x1ba)](_0x48ae59,_0x202836)),SceneManager['exit']();break;}}const _0x302c8a=_0x57367c['description'];if(_0x302c8a[_0x285e42(0x2de)](/\[Version[ ](.*?)\]/i)){const _0x1c7171=Number(RegExp['$1']);_0x1c7171!==VisuMZ[label][_0x285e42(0x232)]&&(alert(_0x285e42(0x161)[_0x285e42(0x1ba)](_0x48ae59,_0x1c7171)),SceneManager[_0x285e42(0x222)]());}if(_0x302c8a[_0x285e42(0x2de)](/\[Tier[ ](\d+)\]/i)){const _0x469e5f=Number(RegExp['$1']);_0x469e5f<tier?(alert(_0x285e42(0x370)[_0x285e42(0x1ba)](_0x48ae59,_0x469e5f,tier)),SceneManager[_0x285e42(0x222)]()):tier=Math[_0x285e42(0x35b)](_0x469e5f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x57367c[_0x285e42(0x211)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x21fdcc(0x25b),_0x4a507b=>{const _0x5a6bca=_0x21fdcc;VisuMZ[_0x5a6bca(0x163)](_0x4a507b,_0x4a507b);const _0x1eb89a=_0x4a507b[_0x5a6bca(0x2a6)][_0x5a6bca(0x362)](_0x3ba7a9=>$gameActors[_0x5a6bca(0x34f)](_0x3ba7a9)),_0x1f1dc0=_0x4a507b['Classes'],_0x3d4335=_0x4a507b[_0x5a6bca(0x29d)];for(const _0x24ba92 of _0x1eb89a){if(!_0x24ba92)continue;for(const _0x4ac922 of _0x1f1dc0){_0x24ba92['gainAbilityPoints'](_0x3d4335,_0x4ac922);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],_0x21fdcc(0x264),_0x3838c0=>{const _0x29744a=_0x21fdcc;VisuMZ[_0x29744a(0x163)](_0x3838c0,_0x3838c0);const _0x4e6d40=_0x3838c0[_0x29744a(0x2a6)][_0x29744a(0x362)](_0x7829eb=>$gameActors[_0x29744a(0x34f)](_0x7829eb)),_0x4aa723=_0x3838c0[_0x29744a(0x2df)],_0x1c693b=_0x3838c0[_0x29744a(0x29d)];for(const _0x5b7837 of _0x4e6d40){if(!_0x5b7837)continue;for(const _0x567bec of _0x4aa723){_0x5b7837['addAbilityPoints'](_0x1c693b,_0x567bec);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],_0x21fdcc(0x37f),_0x46c9bf=>{const _0x2ff364=_0x21fdcc;VisuMZ[_0x2ff364(0x163)](_0x46c9bf,_0x46c9bf);const _0x6e9e1d=_0x46c9bf[_0x2ff364(0x2a6)][_0x2ff364(0x362)](_0x2a29e9=>$gameActors[_0x2ff364(0x34f)](_0x2a29e9)),_0x2a9973=_0x46c9bf[_0x2ff364(0x2df)],_0x34b3a9=_0x46c9bf[_0x2ff364(0x29d)];for(const _0x6bea68 of _0x6e9e1d){if(!_0x6bea68)continue;for(const _0x94ceca of _0x2a9973){_0x6bea68[_0x2ff364(0x1b4)](_0x34b3a9,_0x94ceca);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],'AbilityPointsSet',_0x4d5ef6=>{const _0x2c2689=_0x21fdcc;VisuMZ[_0x2c2689(0x163)](_0x4d5ef6,_0x4d5ef6);const _0x292552=_0x4d5ef6[_0x2c2689(0x2a6)][_0x2c2689(0x362)](_0x3145e0=>$gameActors['actor'](_0x3145e0)),_0x1ab889=_0x4d5ef6[_0x2c2689(0x2df)],_0x1b0edd=_0x4d5ef6['Points'];for(const _0x4da758 of _0x292552){if(!_0x4da758)continue;for(const _0xb73648 of _0x1ab889){_0x4da758[_0x2c2689(0x16a)](_0x1b0edd,_0xb73648);}}}),PluginManager[_0x21fdcc(0x273)](pluginData['name'],'SkillPointsGain',_0x3d30f6=>{const _0x202740=_0x21fdcc;VisuMZ[_0x202740(0x163)](_0x3d30f6,_0x3d30f6);const _0x499683=_0x3d30f6[_0x202740(0x2a6)][_0x202740(0x362)](_0xfa985f=>$gameActors[_0x202740(0x34f)](_0xfa985f)),_0x4ab7b5=_0x3d30f6[_0x202740(0x2df)],_0x258b71=_0x3d30f6[_0x202740(0x29d)];for(const _0x3e150e of _0x499683){if(!_0x3e150e)continue;for(const _0x409bee of _0x4ab7b5){_0x3e150e[_0x202740(0x20a)](_0x258b71,_0x409bee);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],_0x21fdcc(0x263),_0x124d2c=>{const _0x3c72ae=_0x21fdcc;VisuMZ['ConvertParams'](_0x124d2c,_0x124d2c);const _0x4d6ee7=_0x124d2c[_0x3c72ae(0x2a6)]['map'](_0x5b5964=>$gameActors[_0x3c72ae(0x34f)](_0x5b5964)),_0x21385c=_0x124d2c[_0x3c72ae(0x2df)],_0x15c5bf=_0x124d2c[_0x3c72ae(0x29d)];for(const _0x51cde6 of _0x4d6ee7){if(!_0x51cde6)continue;for(const _0x427a75 of _0x21385c){_0x51cde6[_0x3c72ae(0x271)](_0x15c5bf,_0x427a75);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],_0x21fdcc(0x194),_0xa2d298=>{const _0x25419c=_0x21fdcc;VisuMZ[_0x25419c(0x163)](_0xa2d298,_0xa2d298);const _0x1f90e0=_0xa2d298[_0x25419c(0x2a6)]['map'](_0x37fefe=>$gameActors[_0x25419c(0x34f)](_0x37fefe)),_0x545d2=_0xa2d298[_0x25419c(0x2df)],_0x41342a=_0xa2d298[_0x25419c(0x29d)];for(const _0x170f52 of _0x1f90e0){if(!_0x170f52)continue;for(const _0x893542 of _0x545d2){_0x170f52[_0x25419c(0x284)](_0x41342a,_0x893542);}}}),PluginManager['registerCommand'](pluginData[_0x21fdcc(0x29e)],'SkillPointsSet',_0x3d41b2=>{const _0x407777=_0x21fdcc;VisuMZ['ConvertParams'](_0x3d41b2,_0x3d41b2);const _0x27f466=_0x3d41b2['Actors'][_0x407777(0x362)](_0xc25108=>$gameActors[_0x407777(0x34f)](_0xc25108)),_0x66ad6=_0x3d41b2['Classes'],_0x4b6f11=_0x3d41b2['Points'];for(const _0x18a2cc of _0x27f466){if(!_0x18a2cc)continue;for(const _0x326309 of _0x66ad6){_0x18a2cc[_0x407777(0x34a)](_0x4b6f11,_0x326309);}}}),PluginManager[_0x21fdcc(0x273)](pluginData[_0x21fdcc(0x29e)],_0x21fdcc(0x25d),_0x4ba6fa=>{VisuMZ['ConvertParams'](_0x4ba6fa,_0x4ba6fa),$gameSystem['setSkillLearnSystemMenuAccess'](_0x4ba6fa['Show']);}),VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2a3)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN SKILL(?:|S):[ ](.*)>/gi,'LearnSkillB':/<LEARN SKILL(?:|S)>\s*([\s\S]*)\s*<\/LEARN SKILL(?:|S)>/i,'LearnSkillPassiveA':/<LEARN (?:SKILL |)PASSIVE(?:|S):[ ](.*)>/gi,'LearnSkillPassiveB':/<LEARN (?:SKILL |)PASSIVE(?:|S)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL |)PASSIVE(?:|S)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ['SkillLearnSystem'][_0x21fdcc(0x280)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x21fdcc(0x325)][_0x21fdcc(0x2d2)]=function(){const _0x3c8c8c=_0x21fdcc;VisuMZ['SkillLearnSystem'][_0x3c8c8c(0x280)][_0x3c8c8c(0x162)](this),this[_0x3c8c8c(0x2d0)]();},Scene_Boot[_0x21fdcc(0x325)][_0x21fdcc(0x2d0)]=function(){const _0xb7f5fc=_0x21fdcc;if(VisuMZ[_0xb7f5fc(0x1d6)])return;this[_0xb7f5fc(0x2c2)]();},VisuMZ[_0x21fdcc(0x1e3)]['JS']={},Scene_Boot[_0x21fdcc(0x325)]['process_VisuMZ_SkillLearnSystem_JS']=function(){const _0x33ce5a=_0x21fdcc,_0x122a06=$dataActors[_0x33ce5a(0x19e)]($dataSkills);for(const _0x1fdf86 of _0x122a06){if(!_0x1fdf86)continue;VisuMZ[_0x33ce5a(0x1e3)][_0x33ce5a(0x15f)](_0x1fdf86);}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2db)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x21fdcc(0x2db)]=function(_0x7360ef){const _0x378a8b=_0x21fdcc;VisuMZ[_0x378a8b(0x1e3)][_0x378a8b(0x2db)][_0x378a8b(0x162)](this,_0x7360ef),VisuMZ[_0x378a8b(0x1e3)][_0x378a8b(0x15f)](_0x7360ef);},VisuMZ['SkillLearnSystem']['Parse_Notetags_CreateJS']=function(_0xdf7847){const _0x2e7086=_0x21fdcc,_0x1e4f04=VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x2a3)];VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x244)](_0xdf7847,_0x2e7086(0x1f7),_0x1e4f04[_0x2e7086(0x1f7)]),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x244)](_0xdf7847,'jsLearnCpCost',_0x1e4f04[_0x2e7086(0x34b)]),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x244)](_0xdf7847,_0x2e7086(0x289),_0x1e4f04['jsLearnJpCost']),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x244)](_0xdf7847,'jsLearnSpCost',_0x1e4f04[_0x2e7086(0x1cb)]),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x31e)](_0xdf7847,_0x2e7086(0x2b9),_0x1e4f04[_0x2e7086(0x2b9)]),VisuMZ['SkillLearnSystem'][_0x2e7086(0x1e5)](_0xdf7847,_0x2e7086(0x2ab),_0x1e4f04[_0x2e7086(0x2ab)]),VisuMZ[_0x2e7086(0x1e3)]['createTextJS'](_0xdf7847,_0x2e7086(0x2bd),_0x1e4f04['jsLearnShowListTxt']),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x1f6)](_0xdf7847,_0x2e7086(0x33f),_0x1e4f04[_0x2e7086(0x33f)]),VisuMZ[_0x2e7086(0x1e3)]['createTextJS'](_0xdf7847,'jsLearnReqListTxt',_0x1e4f04[_0x2e7086(0x24f)]),VisuMZ[_0x2e7086(0x1e3)][_0x2e7086(0x1f6)](_0xdf7847,'jsLearnReqDetailTxt',_0x1e4f04[_0x2e7086(0x27d)]),VisuMZ[_0x2e7086(0x1e3)]['createActionJS'](_0xdf7847,_0x2e7086(0x2be),_0x1e4f04['jsOnLearn']);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x244)]=function(_0x4fe4cb,_0x2ccc71,_0x4f7b20){const _0x44a54c=_0x21fdcc,_0x47d64e=_0x4fe4cb[_0x44a54c(0x19f)];if(_0x47d64e[_0x44a54c(0x2de)](_0x4f7b20)){const _0x4c842d=String(RegExp['$1']),_0x14fba1='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x4c842d),_0x4537e8=VisuMZ[_0x44a54c(0x1e3)][_0x44a54c(0x355)](_0x4fe4cb,_0x2ccc71);VisuMZ[_0x44a54c(0x1e3)]['JS'][_0x4537e8]=new Function(_0x14fba1);}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x31e)]=function(_0x33fadd,_0xe622fe,_0x17a883){const _0x1510ee=_0x21fdcc,_0x1a222c=_0x33fadd[_0x1510ee(0x19f)];if(_0x1a222c[_0x1510ee(0x2de)](_0x17a883)){const _0x2db5b1=String(RegExp['$1']),_0x500019=_0x1510ee(0x225)[_0x1510ee(0x1ba)](_0x2db5b1),_0x1a754c=VisuMZ[_0x1510ee(0x1e3)][_0x1510ee(0x355)](_0x33fadd,_0xe622fe);VisuMZ[_0x1510ee(0x1e3)]['JS'][_0x1a754c]=new Function(_0x500019);}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x1e5)]=function(_0x50778e,_0x3352cc,_0x188897){const _0xeb5f9=_0x21fdcc,_0x330d9d=_0x50778e['note'];if(_0x330d9d['match'](_0x188897)){const _0x5f33fd=String(RegExp['$1']),_0x51a529='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x5f33fd),_0x52557c=VisuMZ[_0xeb5f9(0x1e3)][_0xeb5f9(0x355)](_0x50778e,_0x3352cc);VisuMZ[_0xeb5f9(0x1e3)]['JS'][_0x52557c]=new Function(_0x51a529);}},VisuMZ['SkillLearnSystem'][_0x21fdcc(0x1f6)]=function(_0x12c110,_0x3c39e0,_0x592463){const _0x5ec827=_0x21fdcc,_0x39e34f=_0x12c110['note'];if(_0x39e34f[_0x5ec827(0x2de)](_0x592463)){const _0x487e2e=String(RegExp['$1']),_0xafa69e=_0x5ec827(0x2a2)['format'](_0x487e2e),_0x8354b9=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x12c110,_0x3c39e0);VisuMZ[_0x5ec827(0x1e3)]['JS'][_0x8354b9]=new Function(_0xafa69e);}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2ae)]=function(_0x106c71,_0x39bb30,_0x4a5798){const _0xbeca92=_0x21fdcc,_0x1cd9c8=_0x106c71['note'];if(_0x1cd9c8['match'](_0x4a5798)){const _0x3517b8=String(RegExp['$1']),_0x190b08=_0xbeca92(0x2bb)[_0xbeca92(0x1ba)](_0x3517b8),_0x50d2d5=VisuMZ[_0xbeca92(0x1e3)]['createKeyJS'](_0x106c71,_0x39bb30);VisuMZ['SkillLearnSystem']['JS'][_0x50d2d5]=new Function(_0x190b08);}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x355)]=function(_0x4220b3,_0x36bd58){const _0x39312d=_0x21fdcc;if(VisuMZ[_0x39312d(0x355)])return VisuMZ[_0x39312d(0x355)](_0x4220b3,_0x36bd58);let _0x3e55af='';if($dataActors[_0x39312d(0x37e)](_0x4220b3))_0x3e55af=_0x39312d(0x239)[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);if($dataClasses[_0x39312d(0x37e)](_0x4220b3))_0x3e55af=_0x39312d(0x2b6)[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);if($dataSkills[_0x39312d(0x37e)](_0x4220b3))_0x3e55af=_0x39312d(0x164)['format'](_0x4220b3['id'],_0x36bd58);if($dataItems['includes'](_0x4220b3))_0x3e55af=_0x39312d(0x376)['format'](_0x4220b3['id'],_0x36bd58);if($dataWeapons[_0x39312d(0x37e)](_0x4220b3))_0x3e55af=_0x39312d(0x20d)[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);if($dataArmors[_0x39312d(0x37e)](_0x4220b3))_0x3e55af='Armor-%1-%2'[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);if($dataEnemies[_0x39312d(0x37e)](_0x4220b3))_0x3e55af=_0x39312d(0x16e)[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);if($dataStates['includes'](_0x4220b3))_0x3e55af='State-%1-%2'[_0x39312d(0x1ba)](_0x4220b3['id'],_0x36bd58);return _0x3e55af;},DataManager[_0x21fdcc(0x1c2)]=function(_0x57e7b7){const _0x16df77=_0x21fdcc;if(!_0x57e7b7)return![];return _0x57e7b7[_0x16df77(0x1aa)]!==undefined&&_0x57e7b7[_0x16df77(0x2a4)]!==undefined;},DataManager[_0x21fdcc(0x311)]=function(_0x2f8f0e){const _0x48aa91=_0x21fdcc;_0x2f8f0e=_0x2f8f0e['toUpperCase']()['trim'](),this[_0x48aa91(0x366)]=this['_classIDs']||{};if(this[_0x48aa91(0x366)][_0x2f8f0e])return this[_0x48aa91(0x366)][_0x2f8f0e];for(const _0x110f26 of $dataClasses){if(!_0x110f26)continue;let _0x39c4fa=_0x110f26['name'];_0x39c4fa=_0x39c4fa['replace'](/\x1I\[(\d+)\]/gi,''),_0x39c4fa=_0x39c4fa[_0x48aa91(0x21c)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x39c4fa[_0x48aa91(0x33a)]()[_0x48aa91(0x313)]()]=_0x110f26['id'];}return this[_0x48aa91(0x366)][_0x2f8f0e]||0x0;},DataManager['getSkillIdWithName']=function(_0x38baff){const _0x2108cc=_0x21fdcc;_0x38baff=_0x38baff[_0x2108cc(0x33a)]()['trim'](),this[_0x2108cc(0x2c7)]=this[_0x2108cc(0x2c7)]||{};if(this[_0x2108cc(0x2c7)][_0x38baff])return this[_0x2108cc(0x2c7)][_0x38baff];for(const _0x5e67dd of $dataSkills){if(!_0x5e67dd)continue;this['_skillIDs'][_0x5e67dd[_0x2108cc(0x29e)]['toUpperCase']()['trim']()]=_0x5e67dd['id'];}return this['_skillIDs'][_0x38baff]||0x0;},DataManager[_0x21fdcc(0x2fd)]=function(_0x5cb3a6){const _0x496364=_0x21fdcc;_0x5cb3a6=_0x5cb3a6['toUpperCase']()[_0x496364(0x313)](),this[_0x496364(0x1af)]=this[_0x496364(0x1af)]||{};if(this[_0x496364(0x1af)][_0x5cb3a6])return this[_0x496364(0x1af)][_0x5cb3a6];for(const _0x4ef456 of $dataItems){if(!_0x4ef456)continue;this[_0x496364(0x1af)][_0x4ef456[_0x496364(0x29e)][_0x496364(0x33a)]()[_0x496364(0x313)]()]=_0x4ef456['id'];}return this[_0x496364(0x1af)][_0x5cb3a6]||0x0;},DataManager[_0x21fdcc(0x27c)]=function(_0xcf0726){const _0x532c57=_0x21fdcc;_0xcf0726=_0xcf0726[_0x532c57(0x33a)]()[_0x532c57(0x313)](),this['_weaponIDs']=this[_0x532c57(0x26e)]||{};if(this['_weaponIDs'][_0xcf0726])return this[_0x532c57(0x26e)][_0xcf0726];for(const _0xe7f34e of $dataWeapons){if(!_0xe7f34e)continue;this[_0x532c57(0x26e)][_0xe7f34e['name'][_0x532c57(0x33a)]()['trim']()]=_0xe7f34e['id'];}return this[_0x532c57(0x26e)][_0xcf0726]||0x0;},DataManager[_0x21fdcc(0x1e4)]=function(_0x474475){const _0x169928=_0x21fdcc;_0x474475=_0x474475[_0x169928(0x33a)]()['trim'](),this[_0x169928(0x295)]=this[_0x169928(0x295)]||{};if(this[_0x169928(0x295)][_0x474475])return this[_0x169928(0x295)][_0x474475];for(const _0x1e5c6e of $dataArmors){if(!_0x1e5c6e)continue;this[_0x169928(0x295)][_0x1e5c6e['name']['toUpperCase']()[_0x169928(0x313)]()]=_0x1e5c6e['id'];}return this[_0x169928(0x295)][_0x474475]||0x0;},DataManager[_0x21fdcc(0x321)]=function(_0x3346d2){const _0x2c1e73=_0x21fdcc;if(!$dataClasses[_0x3346d2])return[];const _0x2109b2=[],_0x272f1b=$dataClasses[_0x3346d2][_0x2c1e73(0x19f)],_0x686af6=VisuMZ[_0x2c1e73(0x1e3)]['RegExp'],_0x253ea9=_0x272f1b[_0x2c1e73(0x2de)](_0x686af6[_0x2c1e73(0x1ab)]);if(_0x253ea9)for(const _0x48328d of _0x253ea9){if(!_0x48328d)continue;_0x48328d[_0x2c1e73(0x2de)](_0x686af6[_0x2c1e73(0x1ab)]);const _0x2dc38b=String(RegExp['$1'])[_0x2c1e73(0x2f8)](',')[_0x2c1e73(0x362)](_0xba286e=>_0xba286e[_0x2c1e73(0x313)]());;for(let _0x4e7d50 of _0x2dc38b){_0x4e7d50=(String(_0x4e7d50)||'')[_0x2c1e73(0x313)]();if(_0x4e7d50[_0x2c1e73(0x2de)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0xe4e2cb=Math[_0x2c1e73(0x375)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x13edfa=Math[_0x2c1e73(0x35b)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x466b66=_0xe4e2cb;_0x466b66<=_0x13edfa;_0x466b66++)_0x2109b2['push'](_0x466b66);continue;}_0x4e7d50=(String(_0x4e7d50)||'')[_0x2c1e73(0x313)]();const _0x36e8fd=/^\d+$/[_0x2c1e73(0x356)](_0x4e7d50);_0x36e8fd?_0x2109b2[_0x2c1e73(0x1dd)](Number(_0x4e7d50)):_0x2109b2[_0x2c1e73(0x1dd)](DataManager[_0x2c1e73(0x1b2)](_0x4e7d50));}}const _0x174be1=_0x272f1b['match'](_0x686af6['LearnSkillB']);if(_0x174be1)for(const _0x554fd3 of _0x174be1){if(!_0x554fd3)continue;_0x554fd3[_0x2c1e73(0x2de)](_0x686af6[_0x2c1e73(0x332)]);const _0x3082ce=String(RegExp['$1'])[_0x2c1e73(0x2f8)](/[\r\n]+/);for(let _0x528a67 of _0x3082ce){_0x528a67=(String(_0x528a67)||'')[_0x2c1e73(0x313)]();if(_0x528a67[_0x2c1e73(0x2de)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x176b5a=Math[_0x2c1e73(0x375)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x49a39e=Math['max'](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x1b6cc8=_0x176b5a;_0x1b6cc8<=_0x49a39e;_0x1b6cc8++)_0x2109b2[_0x2c1e73(0x1dd)](_0x1b6cc8);continue;}const _0x29def7=/^\d+$/['test'](_0x528a67);_0x29def7?_0x2109b2[_0x2c1e73(0x1dd)](Number(_0x528a67)):_0x2109b2[_0x2c1e73(0x1dd)](DataManager[_0x2c1e73(0x1b2)](_0x528a67));}}return VisuMZ[_0x2c1e73(0x23b)]&&(_0x2109b2[_0x2c1e73(0x182)]((_0x41c32a,_0xa366b0)=>_0x41c32a-_0xa366b0),VisuMZ[_0x2c1e73(0x23b)][_0x2c1e73(0x210)]&&VisuMZ[_0x2c1e73(0x23b)]['SortByIDandPriorityUsingIDs'](_0x2109b2)),_0x2109b2[_0x2c1e73(0x301)](_0x11312b=>$dataSkills[_0x11312b]&&$dataSkills[_0x11312b][_0x2c1e73(0x29e)]['trim']()!=='')[_0x2c1e73(0x301)]((_0x3b8211,_0x5244f2,_0x1eda03)=>_0x1eda03[_0x2c1e73(0x1fe)](_0x3b8211)===_0x5244f2);},DataManager[_0x21fdcc(0x20e)]=function(_0x409b9a){const _0x567e3d=_0x21fdcc;if(!_0x409b9a)return 0x0;if(!DataManager[_0x567e3d(0x205)](_0x409b9a)&&!DataManager[_0x567e3d(0x1c2)](_0x409b9a))return 0x0;const _0x5e3542=VisuMZ[_0x567e3d(0x1e3)][_0x567e3d(0x2a3)],_0x3f45a3=_0x409b9a[_0x567e3d(0x19f)];if(_0x3f45a3['match'](_0x5e3542[_0x567e3d(0x29c)]))return Number(RegExp['$1']);if(_0x3f45a3['match'](_0x5e3542[_0x567e3d(0x1c9)])){const _0xe5ce2b=String(RegExp['$1'])[_0x567e3d(0x2f8)](/[\r\n]+/);for(const _0xff0527 of _0xe5ce2b){if(_0xff0527[_0x567e3d(0x2de)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x3ab1b4=VisuMZ['SkillLearnSystem'][_0x567e3d(0x355)](_0x409b9a,_0x567e3d(0x1f7));if(VisuMZ[_0x567e3d(0x1e3)]['JS'][_0x3ab1b4]){const _0x3430e8=SceneManager[_0x567e3d(0x27f)][_0x567e3d(0x1ed)]();return VisuMZ['SkillLearnSystem']['JS'][_0x3ab1b4]['call'](this,_0x3430e8,_0x409b9a);}return VisuMZ[_0x567e3d(0x1e3)][_0x567e3d(0x339)][_0x567e3d(0x1e9)][_0x567e3d(0x168)]||0x0;},DataManager['getSkillLearnClassPointCost']=function(_0x150645){const _0x18f14b=_0x21fdcc;if(!_0x150645)return 0x0;if(!DataManager['isSkill'](_0x150645)&&!DataManager[_0x18f14b(0x1c2)](_0x150645))return 0x0;const _0x30f5d5=VisuMZ[_0x18f14b(0x1e3)][_0x18f14b(0x2a3)],_0x14c66a=_0x150645['note'];if(_0x14c66a[_0x18f14b(0x2de)](_0x30f5d5[_0x18f14b(0x37b)]))return Number(RegExp['$1']);if(_0x14c66a['match'](_0x30f5d5['LearnCostBatch'])){const _0x18d1b3=String(RegExp['$1'])[_0x18f14b(0x2f8)](/[\r\n]+/);for(const _0x967e6 of _0x18d1b3){if(_0x967e6[_0x18f14b(0x2de)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x42f9ae=VisuMZ[_0x18f14b(0x1e3)][_0x18f14b(0x355)](_0x150645,_0x18f14b(0x34b));if(VisuMZ[_0x18f14b(0x1e3)]['JS'][_0x42f9ae]){const _0x219d6e=SceneManager[_0x18f14b(0x27f)][_0x18f14b(0x1ed)]();return VisuMZ[_0x18f14b(0x1e3)]['JS'][_0x42f9ae]['call'](this,_0x219d6e,_0x150645)||0x0;}return VisuMZ[_0x18f14b(0x1ec)][_0x18f14b(0x339)][_0x18f14b(0x224)][_0x18f14b(0x168)]||0x0;},DataManager[_0x21fdcc(0x317)]=function(_0x409f89){const _0x53b301=_0x21fdcc;if(!_0x409f89)return 0x0;if(!DataManager[_0x53b301(0x205)](_0x409f89)&&!DataManager[_0x53b301(0x1c2)](_0x409f89))return 0x0;const _0x49c424=VisuMZ['SkillLearnSystem'][_0x53b301(0x2a3)],_0xfa5590=_0x409f89[_0x53b301(0x19f)];if(_0xfa5590[_0x53b301(0x2de)](_0x49c424[_0x53b301(0x315)]))return Number(RegExp['$1']);if(_0xfa5590[_0x53b301(0x2de)](_0x49c424[_0x53b301(0x1c9)])){const _0x222b4d=String(RegExp['$1'])[_0x53b301(0x2f8)](/[\r\n]+/);for(const _0x5b3a08 of _0x222b4d){if(_0x5b3a08[_0x53b301(0x2de)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x124706=VisuMZ['SkillLearnSystem'][_0x53b301(0x355)](_0x409f89,_0x53b301(0x289));if(VisuMZ[_0x53b301(0x1e3)]['JS'][_0x124706]){const _0x5e3ea8=SceneManager[_0x53b301(0x27f)]['user']();return VisuMZ[_0x53b301(0x1e3)]['JS'][_0x124706][_0x53b301(0x162)](this,_0x5e3ea8,_0x409f89);}return VisuMZ[_0x53b301(0x1ec)][_0x53b301(0x339)][_0x53b301(0x28e)][_0x53b301(0x168)]||0x0;},DataManager[_0x21fdcc(0x374)]=function(_0x3cc8c1){const _0x13c98a=_0x21fdcc;if(!_0x3cc8c1)return 0x0;if(!DataManager[_0x13c98a(0x205)](_0x3cc8c1)&&!DataManager['isState'](_0x3cc8c1))return 0x0;const _0x2d5b18=VisuMZ[_0x13c98a(0x1e3)]['RegExp'],_0x5990d2=_0x3cc8c1[_0x13c98a(0x19f)];if(_0x5990d2[_0x13c98a(0x2de)](_0x2d5b18['LearnSpCost']))return Number(RegExp['$1']);if(_0x5990d2[_0x13c98a(0x2de)](_0x2d5b18[_0x13c98a(0x1c9)])){const _0x1ec881=String(RegExp['$1'])[_0x13c98a(0x2f8)](/[\r\n]+/);for(const _0x8f1fb1 of _0x1ec881){if(_0x8f1fb1[_0x13c98a(0x2de)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x1eee01=VisuMZ[_0x13c98a(0x1e3)][_0x13c98a(0x355)](_0x3cc8c1,'jsLearnSpCost');if(VisuMZ['SkillLearnSystem']['JS'][_0x1eee01]){const _0x318883=SceneManager[_0x13c98a(0x27f)]['user']();return VisuMZ[_0x13c98a(0x1e3)]['JS'][_0x1eee01][_0x13c98a(0x162)](this,_0x318883,_0x3cc8c1);}return VisuMZ[_0x13c98a(0x1e3)][_0x13c98a(0x339)]['SkillPoints'][_0x13c98a(0x168)]||0x0;},DataManager[_0x21fdcc(0x24b)]=function(_0x3289c1){const _0x6d3dd8=_0x21fdcc;if(!_0x3289c1)return[];if(!DataManager['isSkill'](_0x3289c1)&&!DataManager[_0x6d3dd8(0x1c2)](_0x3289c1))return[];const _0xa4dd4=VisuMZ[_0x6d3dd8(0x1e3)]['RegExp'],_0x2bc517=_0x3289c1['note'],_0x69fe54=[],_0x5cc394=_0x2bc517[_0x6d3dd8(0x2de)](_0xa4dd4[_0x6d3dd8(0x340)]);if(_0x5cc394)for(const _0x2b1caa of _0x5cc394){if(!_0x2b1caa)continue;_0x2b1caa['match'](_0xa4dd4['LearnItemCost']);const _0x4b074a=String(RegExp['$1']),_0xcdc281={'id':0x0,'quantity':Number(RegExp['$2'])},_0x308e8f=/^\d+$/[_0x6d3dd8(0x356)](_0x4b074a);_0x308e8f?_0xcdc281['id']=Number(_0x4b074a):_0xcdc281['id']=DataManager[_0x6d3dd8(0x2fd)](_0x4b074a),_0xcdc281['id']>0x0&&_0x69fe54[_0x6d3dd8(0x1dd)](_0xcdc281);}if(_0x2bc517['match'](_0xa4dd4[_0x6d3dd8(0x1c9)])){const _0x1c7bd7=String(RegExp['$1'])[_0x6d3dd8(0x2f8)](/[\r\n]+/);for(const _0x301541 of _0x1c7bd7){if(_0x301541[_0x6d3dd8(0x2de)](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x3e22ed=String(RegExp['$1']),_0x444a03={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1ec38d=/^\d+$/[_0x6d3dd8(0x356)](_0x3e22ed);_0x1ec38d?_0x444a03['id']=Number(_0x3e22ed):_0x444a03['id']=DataManager['getItemIdWithName'](_0x3e22ed),_0x444a03['id']>0x0&&_0x69fe54[_0x6d3dd8(0x1dd)](_0x444a03);}}}return _0x69fe54;},DataManager[_0x21fdcc(0x329)]=function(_0x4747a7){const _0x172c6b=_0x21fdcc;if(!_0x4747a7)return[];if(!DataManager['isSkill'](_0x4747a7)&&!DataManager['isState'](_0x4747a7))return[];const _0x1bdda6=VisuMZ[_0x172c6b(0x1e3)][_0x172c6b(0x2a3)],_0x5cafb7=_0x4747a7[_0x172c6b(0x19f)],_0x49ec34=[],_0x3cfabb=_0x5cafb7[_0x172c6b(0x2de)](_0x1bdda6[_0x172c6b(0x323)]);if(_0x3cfabb)for(const _0x353baa of _0x3cfabb){if(!_0x353baa)continue;_0x353baa['match'](_0x1bdda6[_0x172c6b(0x323)]);const _0x485655=String(RegExp['$1']),_0x5ede46={'id':0x0,'quantity':Number(RegExp['$2'])},_0x26d6be=/^\d+$/[_0x172c6b(0x356)](_0x485655);_0x26d6be?_0x5ede46['id']=Number(_0x485655):_0x5ede46['id']=DataManager[_0x172c6b(0x27c)](_0x485655),_0x5ede46['id']>0x0&&_0x49ec34['push'](_0x5ede46);}if(_0x5cafb7[_0x172c6b(0x2de)](_0x1bdda6[_0x172c6b(0x1c9)])){const _0x84654d=String(RegExp['$1'])[_0x172c6b(0x2f8)](/[\r\n]+/);for(const _0x27d474 of _0x84654d){if(_0x27d474[_0x172c6b(0x2de)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x35848d=String(RegExp['$1']),_0x5ac47d={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1ad691=/^\d+$/[_0x172c6b(0x356)](_0x35848d);_0x1ad691?_0x5ac47d['id']=Number(_0x35848d):_0x5ac47d['id']=DataManager[_0x172c6b(0x27c)](_0x35848d),_0x5ac47d['id']>0x0&&_0x49ec34['push'](_0x5ac47d);}}}return _0x49ec34;},DataManager[_0x21fdcc(0x318)]=function(_0x5202ce){const _0x3386a1=_0x21fdcc;if(!_0x5202ce)return[];if(!DataManager[_0x3386a1(0x205)](_0x5202ce)&&!DataManager['isState'](_0x5202ce))return[];const _0x53a19b=VisuMZ[_0x3386a1(0x1e3)][_0x3386a1(0x2a3)],_0x448144=_0x5202ce['note'],_0x3d1789=[],_0x37bc0a=_0x448144[_0x3386a1(0x2de)](_0x53a19b[_0x3386a1(0x2ca)]);if(_0x37bc0a)for(const _0x1c8eb6 of _0x37bc0a){if(!_0x1c8eb6)continue;_0x1c8eb6['match'](_0x53a19b[_0x3386a1(0x2ca)]);const _0x2cdc95=String(RegExp['$1']),_0x2511e4={'id':0x0,'quantity':Number(RegExp['$2'])},_0x33ce0b=/^\d+$/['test'](_0x2cdc95);_0x33ce0b?_0x2511e4['id']=Number(_0x2cdc95):_0x2511e4['id']=DataManager['getArmorIdWithName'](_0x2cdc95),_0x2511e4['id']>0x0&&_0x3d1789[_0x3386a1(0x1dd)](_0x2511e4);}if(_0x448144[_0x3386a1(0x2de)](_0x53a19b[_0x3386a1(0x1c9)])){const _0x37ce6f=String(RegExp['$1'])[_0x3386a1(0x2f8)](/[\r\n]+/);for(const _0x27c734 of _0x37ce6f){if(_0x27c734['match'](/ARMOR[ ](.*):[ ](\d+)/gi)){const _0x4cf0ef=String(RegExp['$1']),_0x2b9e6f={'id':0x0,'quantity':Number(RegExp['$2'])},_0x2fcd44=/^\d+$/[_0x3386a1(0x356)](_0x4cf0ef);_0x2fcd44?_0x2b9e6f['id']=Number(_0x4cf0ef):_0x2b9e6f['id']=DataManager[_0x3386a1(0x1e4)](_0x4cf0ef),_0x2b9e6f['id']>0x0&&_0x3d1789[_0x3386a1(0x1dd)](_0x2b9e6f);}}}return _0x3d1789;},DataManager['getSkillLearnGoldCost']=function(_0x23ac5a){const _0x5829bd=_0x21fdcc;if(!_0x23ac5a)return 0x0;if(!DataManager[_0x5829bd(0x205)](_0x23ac5a)&&!DataManager[_0x5829bd(0x1c2)](_0x23ac5a))return 0x0;const _0x311561=VisuMZ[_0x5829bd(0x1e3)][_0x5829bd(0x2a3)],_0x42de6a=_0x23ac5a[_0x5829bd(0x19f)];if(_0x42de6a[_0x5829bd(0x2de)](_0x311561[_0x5829bd(0x341)]))return Number(RegExp['$1']);if(_0x42de6a[_0x5829bd(0x2de)](_0x311561[_0x5829bd(0x1c9)])){const _0x2440e2=String(RegExp['$1'])[_0x5829bd(0x2f8)](/[\r\n]+/);for(const _0x371728 of _0x2440e2){if(_0x371728['match'](/GOLD:[ ](\d+)/gi))return Number(RegExp['$1']);}}return 0x0;},TextManager[_0x21fdcc(0x235)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)]['MenuAccess'][_0x21fdcc(0x249)],ImageManager[_0x21fdcc(0x2f2)]=VisuMZ[_0x21fdcc(0x1e3)]['Settings']['AbilityPoints']['Icon'],ImageManager[_0x21fdcc(0x2ce)]=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x31b)]['Icon'],SoundManager[_0x21fdcc(0x34e)]=function(){const _0x6a1a43=_0x21fdcc;AudioManager[_0x6a1a43(0x359)](VisuMZ[_0x6a1a43(0x1e3)][_0x6a1a43(0x339)][_0x6a1a43(0x17d)]);},TextManager[_0x21fdcc(0x2d7)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x36a)][_0x21fdcc(0x328)],TextManager[_0x21fdcc(0x30b)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x36a)][_0x21fdcc(0x21b)],TextManager['skillLearnReqSeparatorFmt']=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)]['General']['ReqSeparateFmt'],TextManager[_0x21fdcc(0x23c)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)]['General']['ReqLevelFmt'],TextManager['skillLearnReqSkillFmt']=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x36a)][_0x21fdcc(0x32b)],TextManager['skillLearnReqSwitchFmt']=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)]['General'][_0x21fdcc(0x373)],TextManager['skillLearnSeparationFmt']=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x36a)]['SeparationFmt'],TextManager[_0x21fdcc(0x1bd)]=VisuMZ['SkillLearnSystem']['Settings'][_0x21fdcc(0x36a)][_0x21fdcc(0x25f)],TextManager[_0x21fdcc(0x257)]=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x36a)]['WeaponFmt'],TextManager[_0x21fdcc(0x361)]=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x36a)]['ArmorFmt'],TextManager[_0x21fdcc(0x2f7)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x36a)][_0x21fdcc(0x1b0)],TextManager[_0x21fdcc(0x174)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x2ba)][_0x21fdcc(0x27b)],TextManager[_0x21fdcc(0x2fc)]=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x2b7)][_0x21fdcc(0x195)],TextManager['skillLearnReqMet']=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x2b7)]['ReqMetFmt'],TextManager[_0x21fdcc(0x2e2)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)]['Window'][_0x21fdcc(0x19a)],TextManager[_0x21fdcc(0x251)]=VisuMZ['SkillLearnSystem']['Settings'][_0x21fdcc(0x2b7)]['ReqLevelFmt'],TextManager['skillLearnReqListSkill']=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x2b7)][_0x21fdcc(0x32b)],TextManager[_0x21fdcc(0x21a)]=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)]['Window'][_0x21fdcc(0x373)],TextManager[_0x21fdcc(0x2bc)]=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x2b7)]['LearningTitle'],TextManager[_0x21fdcc(0x234)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x2b7)][_0x21fdcc(0x2c0)],TextManager['skillLearningCost']=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x2b7)][_0x21fdcc(0x312)],TextManager[_0x21fdcc(0x1e0)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x2b7)][_0x21fdcc(0x368)],TextManager['skillLearnConfirmCmd']=VisuMZ[_0x21fdcc(0x1e3)]['Settings'][_0x21fdcc(0x2b7)][_0x21fdcc(0x32d)],TextManager[_0x21fdcc(0x1fb)]=VisuMZ['SkillLearnSystem']['Settings'][_0x21fdcc(0x2b7)][_0x21fdcc(0x217)],TextManager[_0x21fdcc(0x226)]=VisuMZ['SkillLearnSystem']['Settings']['AbilityPoints']['FullText'],TextManager[_0x21fdcc(0x269)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x1e9)][_0x21fdcc(0x1b9)],TextManager[_0x21fdcc(0x277)]=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x1e9)][_0x21fdcc(0x334)],TextManager[_0x21fdcc(0x1cf)]=VisuMZ['SkillLearnSystem']['Settings'][_0x21fdcc(0x31b)]['FullText'],TextManager[_0x21fdcc(0x307)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)]['SkillPoints'][_0x21fdcc(0x1b9)],TextManager['skillPointsFmt']=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x31b)][_0x21fdcc(0x334)],TextManager[_0x21fdcc(0x34d)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x31b)][_0x21fdcc(0x1c4)]??'%1',TextManager['skillLearnStypeCategoryCollapse']=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x31b)][_0x21fdcc(0x252)]??_0x21fdcc(0x367),TextManager[_0x21fdcc(0x1bc)]=VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x339)][_0x21fdcc(0x31b)]['SeparateExpandFmt']??'%1\x20[+]',TextManager[_0x21fdcc(0x2d6)]=VisuMZ['SkillLearnSystem'][_0x21fdcc(0x339)][_0x21fdcc(0x31b)][_0x21fdcc(0x350)]??'16',VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x1c3)]=BattleManager[_0x21fdcc(0x28c)],BattleManager['makeRewards']=function(){const _0x2e59bd=_0x21fdcc;VisuMZ[_0x2e59bd(0x1e3)][_0x2e59bd(0x1c3)][_0x2e59bd(0x162)](this),this['makeRewardsAbilityPoints'](),this[_0x2e59bd(0x189)](),this['makeRewardsSkillPoints'](),this[_0x2e59bd(0x25a)]();},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x35c)]=BattleManager[_0x21fdcc(0x345)],BattleManager[_0x21fdcc(0x345)]=function(){const _0x480fac=_0x21fdcc;VisuMZ['SkillLearnSystem']['BattleManager_displayRewards']['call'](this),this[_0x480fac(0x351)](),this[_0x480fac(0x1e6)]();},BattleManager[_0x21fdcc(0x24e)]=function(){const _0x11c2e0=_0x21fdcc;this['_rewards'][_0x11c2e0(0x223)]=$gameTroop['abilityPointsTotal']();},BattleManager['displayRewardsAbilityPoints']=function(){const _0x77f42c=_0x21fdcc;if(!this[_0x77f42c(0x2dd)]())return;$gameMessage[_0x77f42c(0x19d)]();const _0x869541=$gameParty[_0x77f42c(0x299)](),_0x90b47=VisuMZ['SkillLearnSystem'][_0x77f42c(0x339)]['AbilityPoints'],_0x319aae=_0x90b47[_0x77f42c(0x2d9)];for(const _0x23bba1 of _0x869541){if(!_0x23bba1)continue;const _0x492543=_0x319aae[_0x77f42c(0x1ba)](_0x23bba1['name'](),_0x23bba1[_0x77f42c(0x2c1)](),TextManager['abilityPointsAbbr'],TextManager['abilityPointsFmt']);$gameMessage['add']('\x5c.'+_0x492543);}},BattleManager[_0x21fdcc(0x189)]=function(){const _0x3dbf40=_0x21fdcc;this[_0x3dbf40(0x21d)][_0x3dbf40(0x223)]=this[_0x3dbf40(0x21d)][_0x3dbf40(0x223)]||0x0;let _0x30e5f7=$gameParty[_0x3dbf40(0x303)]();VisuMZ['SkillLearnSystem'][_0x3dbf40(0x339)][_0x3dbf40(0x1e9)][_0x3dbf40(0x1c7)]&&(_0x30e5f7=_0x30e5f7[_0x3dbf40(0x301)](_0x273c95=>_0x273c95[_0x3dbf40(0x2ac)]()));for(const _0x13e71d of _0x30e5f7){if(!_0x13e71d)continue;if(!$dataSystem[_0x3dbf40(0x2a0)]&&!_0x13e71d[_0x3dbf40(0x33d)]())continue;_0x13e71d[_0x3dbf40(0x170)](this[_0x3dbf40(0x21d)]['abilityPoints']),_0x13e71d['gainAbilityPointsForMulticlasses'](this[_0x3dbf40(0x21d)][_0x3dbf40(0x223)]);}},BattleManager[_0x21fdcc(0x2dd)]=function(){const _0x5586fb=_0x21fdcc;return VisuMZ[_0x5586fb(0x1e3)][_0x5586fb(0x339)][_0x5586fb(0x1e9)][_0x5586fb(0x1ca)];},BattleManager[_0x21fdcc(0x30e)]=function(){const _0x350e14=_0x21fdcc;this[_0x350e14(0x21d)][_0x350e14(0x1ce)]=$gameTroop[_0x350e14(0x2eb)]();},BattleManager[_0x21fdcc(0x1e6)]=function(){const _0x2ea66c=_0x21fdcc;if(!this[_0x2ea66c(0x206)]())return;$gameMessage[_0x2ea66c(0x19d)]();const _0x4a0801=$gameParty['members'](),_0x1bd66d=VisuMZ[_0x2ea66c(0x1e3)][_0x2ea66c(0x339)][_0x2ea66c(0x31b)],_0x4f7504=_0x1bd66d[_0x2ea66c(0x2d9)];for(const _0x111ab6 of _0x4a0801){if(!_0x111ab6)continue;const _0xc2a799=_0x4f7504['format'](_0x111ab6[_0x2ea66c(0x29e)](),_0x111ab6[_0x2ea66c(0x288)](),TextManager[_0x2ea66c(0x307)],TextManager[_0x2ea66c(0x20f)]);$gameMessage[_0x2ea66c(0x26b)]('\x5c.'+_0xc2a799);}},BattleManager[_0x21fdcc(0x25a)]=function(){const _0x3d72f8=_0x21fdcc;this[_0x3d72f8(0x21d)][_0x3d72f8(0x1ce)]=this['_rewards'][_0x3d72f8(0x1ce)]||0x0;let _0x82ced5=$gameParty['allMembers']();VisuMZ[_0x3d72f8(0x1e3)][_0x3d72f8(0x339)][_0x3d72f8(0x31b)][_0x3d72f8(0x1c7)]&&(_0x82ced5=_0x82ced5[_0x3d72f8(0x301)](_0x3fc777=>_0x3fc777[_0x3d72f8(0x2ac)]()));for(const _0x189d39 of _0x82ced5){if(!_0x189d39)continue;if(!$dataSystem[_0x3d72f8(0x2a0)]&&!_0x189d39['isBattleMember']())continue;_0x189d39[_0x3d72f8(0x20a)](this['_rewards'][_0x3d72f8(0x1ce)]),_0x189d39['gainSkillPointsForMulticlasses'](this[_0x3d72f8(0x21d)]['skillPoints']);}},BattleManager[_0x21fdcc(0x206)]=function(){const _0x3c6e44=_0x21fdcc;return VisuMZ[_0x3c6e44(0x1e3)]['Settings'][_0x3c6e44(0x31b)][_0x3c6e44(0x1ca)];},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2d8)]=Game_System[_0x21fdcc(0x325)][_0x21fdcc(0x1f0)],Game_System['prototype'][_0x21fdcc(0x1f0)]=function(){const _0x3d3254=_0x21fdcc;VisuMZ[_0x3d3254(0x1e3)][_0x3d3254(0x2d8)]['call'](this),this[_0x3d3254(0x229)]();},Game_System[_0x21fdcc(0x325)][_0x21fdcc(0x229)]=function(){const _0x1f9187=_0x21fdcc;this[_0x1f9187(0x33b)]=VisuMZ['SkillLearnSystem']['Settings'][_0x1f9187(0x2ba)][_0x1f9187(0x33c)];},Game_System['prototype'][_0x21fdcc(0x1a8)]=function(){const _0x2a5ead=_0x21fdcc;return this[_0x2a5ead(0x33b)]===undefined&&this[_0x2a5ead(0x229)](),this[_0x2a5ead(0x33b)];},Game_System['prototype'][_0x21fdcc(0x1bf)]=function(_0x5a9b92){const _0x1b2c45=_0x21fdcc;this[_0x1b2c45(0x33b)]===undefined&&this[_0x1b2c45(0x229)](),this[_0x1b2c45(0x33b)]=_0x5a9b92;},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2e1)]=Game_Action[_0x21fdcc(0x325)][_0x21fdcc(0x32c)],Game_Action[_0x21fdcc(0x325)][_0x21fdcc(0x32c)]=function(_0x240b3f){const _0x47063a=_0x21fdcc;VisuMZ['SkillLearnSystem'][_0x47063a(0x2e1)][_0x47063a(0x162)](this,_0x240b3f),this[_0x47063a(0x316)](_0x240b3f);},Game_Action[_0x21fdcc(0x325)][_0x21fdcc(0x316)]=function(_0x5aa4d2){const _0x15cdbb=_0x21fdcc;if(this[_0x15cdbb(0x2e5)]())this[_0x15cdbb(0x23f)](_0x5aa4d2);},Game_Action[_0x21fdcc(0x325)][_0x21fdcc(0x23f)]=function(_0x2525db){const _0x1f3f7d=_0x21fdcc,_0x13be2b=VisuMZ[_0x1f3f7d(0x1e3)][_0x1f3f7d(0x2a3)],_0x21452e=this[_0x1f3f7d(0x2e5)]()[_0x1f3f7d(0x19f)];if($gameParty['inBattle']()){if(this[_0x1f3f7d(0x2e4)]()[_0x1f3f7d(0x1d3)]()&&_0x21452e[_0x1f3f7d(0x2de)](_0x13be2b[_0x1f3f7d(0x2cb)])){const _0x1f1bad=eval(RegExp['$1']);this[_0x1f3f7d(0x2e4)]()[_0x1f3f7d(0x170)](_0x1f1bad);}else this['applyAbilityPoints']();if(_0x2525db['isActor']()&&_0x21452e[_0x1f3f7d(0x2de)](_0x13be2b['TargetGainAbilityPoints'])){const _0x5b7788=eval(RegExp['$1']);_0x2525db[_0x1f3f7d(0x170)](_0x5b7788);}}if($gameParty[_0x1f3f7d(0x2a1)]()){if(this[_0x1f3f7d(0x2e4)]()['isActor']()&&_0x21452e[_0x1f3f7d(0x2de)](_0x13be2b['UserGainSkillPoints'])){const _0x41a2da=eval(RegExp['$1']);this['subject']()['gainSkillPoints'](_0x41a2da);}else this[_0x1f3f7d(0x198)]();if(_0x2525db['isActor']()&&_0x21452e[_0x1f3f7d(0x2de)](_0x13be2b[_0x1f3f7d(0x1a2)])){const _0x56082d=eval(RegExp['$1']);_0x2525db[_0x1f3f7d(0x20a)](_0x56082d);}}if(_0x21452e[_0x1f3f7d(0x2de)](/<NOTETAG>/i)){}},Game_Action[_0x21fdcc(0x325)]['applyAbilityPoints']=function(){const _0x457bfc=_0x21fdcc;if(!$gameParty[_0x457bfc(0x2a1)]())return;if(!this['subject']()['isActor']())return;const _0x1a3261=VisuMZ[_0x457bfc(0x1e3)][_0x457bfc(0x339)][_0x457bfc(0x1e9)];let _0x20688a=0x0;try{_0x20688a=eval(_0x1a3261['PerAction']);}catch(_0x50d264){if($gameTemp[_0x457bfc(0x1ae)]())console[_0x457bfc(0x36b)](_0x50d264);}this['subject']()[_0x457bfc(0x170)](_0x20688a);},Game_Action[_0x21fdcc(0x325)][_0x21fdcc(0x198)]=function(){const _0x3f484a=_0x21fdcc;if(!$gameParty[_0x3f484a(0x2a1)]())return;if(!this[_0x3f484a(0x2e4)]()[_0x3f484a(0x1d3)]())return;const _0x39b0a6=VisuMZ[_0x3f484a(0x1e3)][_0x3f484a(0x339)][_0x3f484a(0x31b)];let _0x2939f2=0x0;try{_0x2939f2=eval(_0x39b0a6[_0x3f484a(0x203)]);}catch(_0x47734b){if($gameTemp[_0x3f484a(0x1ae)]())console['log'](_0x47734b);}this[_0x3f484a(0x2e4)]()[_0x3f484a(0x20a)](_0x2939f2);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x1c0)]=Game_Battler['prototype'][_0x21fdcc(0x1d7)],Game_Battler[_0x21fdcc(0x325)][_0x21fdcc(0x1d7)]=function(_0x36b3ec){const _0xe55aaa=_0x21fdcc;VisuMZ['SkillLearnSystem'][_0xe55aaa(0x1c0)]['call'](this,_0x36b3ec),this['isActor']()&&(this[_0xe55aaa(0x2b0)]=this[_0xe55aaa(0x1fc)](),this[_0xe55aaa(0x2e6)]=this[_0xe55aaa(0x32a)]());},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x365)]=Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x1bb)],Game_Actor[_0x21fdcc(0x325)]['setup']=function(_0x29ea27){const _0x1be368=_0x21fdcc;VisuMZ['SkillLearnSystem']['Game_Actor_setup'][_0x1be368(0x162)](this,_0x29ea27),this['initAbilityPoints'](),this[_0x1be368(0x386)](),this['initSkillPoints'](),this[_0x1be368(0x16d)]();},VisuMZ[_0x21fdcc(0x1e3)]['Game_Actor_changeClass']=Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x281)],Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x281)]=function(_0x378415,_0x1969f6){const _0x331ef6=_0x21fdcc;this['_SkillLearnSystem_preventLevelUpGain']=!![],VisuMZ['SkillLearnSystem']['Game_Actor_changeClass']['call'](this,_0x378415,_0x1969f6),this[_0x331ef6(0x279)]=undefined;},VisuMZ[_0x21fdcc(0x1e3)]['Game_Actor_levelUp']=Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x298)],Game_Actor['prototype'][_0x21fdcc(0x298)]=function(){const _0x3a404a=_0x21fdcc;VisuMZ[_0x3a404a(0x1e3)][_0x3a404a(0x2fa)][_0x3a404a(0x162)](this),this[_0x3a404a(0x190)](this[_0x3a404a(0x383)]()['id']),this[_0x3a404a(0x330)](this[_0x3a404a(0x383)]()['id']);},Game_Actor['prototype']['initAbilityPoints']=function(){this['_abilityPoints']={};},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x386)]=function(){const _0x592855=_0x21fdcc,_0x1a66a6=VisuMZ[_0x592855(0x1e3)][_0x592855(0x2a3)],_0x48c2be=this[_0x592855(0x34f)]()[_0x592855(0x19f)];if(_0x48c2be[_0x592855(0x2de)](_0x1a66a6[_0x592855(0x286)])){const _0x5b6f28=eval(RegExp['$1']);this[_0x592855(0x170)](_0x5b6f28);}const _0x343400=VisuMZ[_0x592855(0x1e3)][_0x592855(0x339)][_0x592855(0x1e9)];if(!_0x343400[_0x592855(0x185)])return;const _0x24f02b=_0x48c2be[_0x592855(0x2de)](_0x1a66a6[_0x592855(0x2c3)]);if(_0x24f02b)for(const _0x3b6d9f of _0x24f02b){if(!_0x3b6d9f)continue;_0x3b6d9f[_0x592855(0x2de)](_0x1a66a6[_0x592855(0x2c3)]);const _0x2b406e=String(RegExp['$1']),_0x4eef68=eval(RegExp['$2']),_0x24b3a7=/^\d+$/[_0x592855(0x356)](_0x2b406e);let _0x32f715=0x0;_0x24b3a7?_0x32f715=Number(_0x2b406e):_0x32f715=DataManager[_0x592855(0x311)](_0x2b406e),this[_0x592855(0x170)](_0x4eef68,_0x32f715);}},Game_Actor[_0x21fdcc(0x325)]['getAbilityPoints']=function(_0x5583c3){const _0x3740c8=_0x21fdcc;this[_0x3740c8(0x30c)]===undefined&&this[_0x3740c8(0x1ef)]();const _0x55f3f7=VisuMZ[_0x3740c8(0x1e3)][_0x3740c8(0x339)][_0x3740c8(0x1e9)];return _0x55f3f7[_0x3740c8(0x185)]?_0x5583c3=0x0:_0x5583c3=_0x5583c3||this[_0x3740c8(0x383)]()['id'],this['_abilityPoints'][_0x5583c3]=this[_0x3740c8(0x30c)][_0x5583c3]||0x0,Math['round'](this[_0x3740c8(0x30c)][_0x5583c3]);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x16a)]=function(_0x5483a9,_0x25cbc1){const _0x4c3ac2=_0x21fdcc;this[_0x4c3ac2(0x30c)]===undefined&&this[_0x4c3ac2(0x1ef)]();const _0x590f81=VisuMZ['SkillLearnSystem'][_0x4c3ac2(0x339)][_0x4c3ac2(0x1e9)];_0x590f81[_0x4c3ac2(0x185)]?_0x25cbc1=0x0:_0x25cbc1=_0x25cbc1||this['currentClass']()['id'];this[_0x4c3ac2(0x30c)][_0x25cbc1]=this[_0x4c3ac2(0x30c)][_0x25cbc1]||0x0,this['_abilityPoints'][_0x25cbc1]=Math['round'](_0x5483a9||0x0);const _0x37b916=_0x590f81[_0x4c3ac2(0x1c1)]||Number[_0x4c3ac2(0x169)];this[_0x4c3ac2(0x30c)][_0x25cbc1]=this[_0x4c3ac2(0x30c)][_0x25cbc1][_0x4c3ac2(0x30a)](0x0,_0x37b916);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x170)]=function(_0x264d03,_0x48b448){const _0x257b4b=_0x21fdcc;_0x264d03>0x0&&(_0x264d03*=this['abilityPointsRate']()),this[_0x257b4b(0x360)](_0x264d03,_0x48b448);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x300)]=function(_0x2668fa){const _0x4f1b5e=_0x21fdcc;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x2668fa>0x0&&(_0x2668fa*=this[_0x4f1b5e(0x338)]()),this[_0x4f1b5e(0x37a)](_0x2668fa,_0x4f1b5e(0x2a8));},Game_Actor['prototype']['addAbilityPoints']=function(_0x4e4604,_0x5b3475){const _0x4fdfa2=_0x21fdcc,_0x38260d=VisuMZ[_0x4fdfa2(0x1e3)][_0x4fdfa2(0x339)]['AbilityPoints'];_0x38260d[_0x4fdfa2(0x185)]?_0x5b3475=0x0:_0x5b3475=_0x5b3475||this[_0x4fdfa2(0x383)]()['id'],_0x4e4604+=this[_0x4fdfa2(0x1fc)](_0x5b3475),this[_0x4fdfa2(0x16a)](_0x4e4604,_0x5b3475);},Game_Actor['prototype'][_0x21fdcc(0x1b4)]=function(_0x1d93af,_0x190162){const _0x43186c=_0x21fdcc;this[_0x43186c(0x360)](-_0x1d93af,_0x190162);},Game_Actor[_0x21fdcc(0x325)]['abilityPointsRate']=function(){const _0x2bdc55=_0x21fdcc;return this[_0x2bdc55(0x2e3)]()[_0x2bdc55(0x216)]((_0x380399,_0x1e7aca)=>{const _0x724ba5=_0x2bdc55;return _0x1e7aca&&_0x1e7aca[_0x724ba5(0x19f)][_0x724ba5(0x2de)](VisuMZ[_0x724ba5(0x1e3)][_0x724ba5(0x2a3)][_0x724ba5(0x2c8)])?_0x380399*(Number(RegExp['$1'])*0.01):_0x380399;},0x1);},Game_Actor['prototype'][_0x21fdcc(0x190)]=function(_0x2fa517){const _0x50ec45=_0x21fdcc;if(this[_0x50ec45(0x279)])return;const _0xaabdc7=VisuMZ[_0x50ec45(0x1e3)][_0x50ec45(0x339)][_0x50ec45(0x1e9)];let _0x13b015=0x0;try{_0x13b015=eval(_0xaabdc7[_0x50ec45(0x2b8)]);}catch(_0x3ea17c){if($gameTemp[_0x50ec45(0x1ae)]())console[_0x50ec45(0x36b)](_0x3ea17c);}this['gainAbilityPoints'](_0x13b015,_0x2fa517);},Game_Actor['prototype'][_0x21fdcc(0x2c1)]=function(){const _0x45de08=_0x21fdcc;return this[_0x45de08(0x2b0)]=this['_earnedAbilityPoints']||0x0,this['getAbilityPoints']()-this[_0x45de08(0x2b0)];},Game_Actor['prototype']['initSkillPoints']=function(){this['_skillPoints']={};},Game_Actor['prototype']['gainStartingSkillPoints']=function(){const _0x5cc39f=_0x21fdcc,_0x5a545b=VisuMZ['SkillLearnSystem'][_0x5cc39f(0x2a3)],_0x36d9fc=this[_0x5cc39f(0x34f)]()[_0x5cc39f(0x19f)];if(_0x36d9fc[_0x5cc39f(0x2de)](_0x5a545b['StartingSkillPoints'])){const _0x778542=eval(RegExp['$1']);this[_0x5cc39f(0x20a)](_0x778542);}const _0xc0d2bb=VisuMZ[_0x5cc39f(0x1e3)][_0x5cc39f(0x339)][_0x5cc39f(0x31b)];if(!_0xc0d2bb[_0x5cc39f(0x185)])return;const _0x2bab60=_0x36d9fc['match'](_0x5a545b[_0x5cc39f(0x380)]);if(_0x2bab60)for(const _0x2276ba of _0x2bab60){if(!_0x2276ba)continue;_0x2276ba[_0x5cc39f(0x2de)](_0x5a545b[_0x5cc39f(0x380)]);const _0x59b31a=String(RegExp['$1']),_0x3e7dd3=eval(RegExp['$2']),_0x211fb5=/^\d+$/[_0x5cc39f(0x356)](_0x59b31a);let _0x8ed01f=0x0;_0x211fb5?_0x8ed01f=Number(_0x59b31a):_0x8ed01f=DataManager['getClassIdWithName'](_0x59b31a),this[_0x5cc39f(0x20a)](_0x3e7dd3,_0x8ed01f);}},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x32a)]=function(_0x45e893){const _0x36e352=_0x21fdcc;this['_skillPoints']===undefined&&this[_0x36e352(0x346)]();const _0x7f1880=VisuMZ['SkillLearnSystem'][_0x36e352(0x339)][_0x36e352(0x31b)];return _0x7f1880[_0x36e352(0x185)]?_0x45e893=0x0:_0x45e893=_0x45e893||this[_0x36e352(0x383)]()['id'],this['_skillPoints'][_0x45e893]=this[_0x36e352(0x26d)][_0x45e893]||0x0,Math[_0x36e352(0x2c4)](this[_0x36e352(0x26d)][_0x45e893]);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x34a)]=function(_0x48e032,_0x3bf781){const _0x14d6c6=_0x21fdcc;this['_skillPoints']===undefined&&this[_0x14d6c6(0x346)]();const _0x50ea12=VisuMZ[_0x14d6c6(0x1e3)][_0x14d6c6(0x339)][_0x14d6c6(0x31b)];_0x50ea12[_0x14d6c6(0x185)]?_0x3bf781=0x0:_0x3bf781=_0x3bf781||this[_0x14d6c6(0x383)]()['id'];this[_0x14d6c6(0x26d)][_0x3bf781]=this[_0x14d6c6(0x26d)][_0x3bf781]||0x0,this[_0x14d6c6(0x26d)][_0x3bf781]=Math[_0x14d6c6(0x2c4)](_0x48e032||0x0);const _0x2d82fb=_0x50ea12['MaxResource']||Number[_0x14d6c6(0x169)];this[_0x14d6c6(0x26d)][_0x3bf781]=this[_0x14d6c6(0x26d)][_0x3bf781][_0x14d6c6(0x30a)](0x0,_0x2d82fb);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x20a)]=function(_0x4a6e39,_0x4bd1d1){const _0x514ac3=_0x21fdcc;_0x4a6e39>0x0&&(_0x4a6e39*=this[_0x514ac3(0x1a9)]()),this['addSkillPoints'](_0x4a6e39,_0x4bd1d1);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x1e7)]=function(_0x31479d){const _0x1b97b5=_0x21fdcc;if(!Imported[_0x1b97b5(0x1ff)])return;_0x31479d>0x0&&(_0x31479d*=this[_0x1b97b5(0x1a9)]()),this['gainMulticlassRewardPoints'](_0x31479d,_0x1b97b5(0x1b8));},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x271)]=function(_0x1fa948,_0x5d4f7c){const _0x477689=_0x21fdcc,_0x3f0172=VisuMZ['SkillLearnSystem']['Settings'][_0x477689(0x31b)];_0x3f0172[_0x477689(0x185)]?_0x5d4f7c=0x0:_0x5d4f7c=_0x5d4f7c||this[_0x477689(0x383)]()['id'],_0x1fa948+=this[_0x477689(0x32a)](_0x5d4f7c),this['setSkillPoints'](_0x1fa948,_0x5d4f7c);},Game_Actor[_0x21fdcc(0x325)]['loseSkillPoints']=function(_0x4397f8,_0x5b763e){const _0x4fce54=_0x21fdcc;this[_0x4fce54(0x271)](-_0x4397f8,_0x5b763e);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x1a9)]=function(){const _0xdb7358=_0x21fdcc;return this[_0xdb7358(0x2e3)]()[_0xdb7358(0x216)]((_0x457d7c,_0x3bd479)=>{const _0x1fc8b0=_0xdb7358;return _0x3bd479&&_0x3bd479[_0x1fc8b0(0x19f)][_0x1fc8b0(0x2de)](VisuMZ[_0x1fc8b0(0x1e3)][_0x1fc8b0(0x2a3)]['SkillPointsRate'])?_0x457d7c*(Number(RegExp['$1'])*0.01):_0x457d7c;},0x1);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x330)]=function(_0x2cd709){const _0x55dbc0=_0x21fdcc;if(this[_0x55dbc0(0x279)])return;const _0x3aea6f=VisuMZ[_0x55dbc0(0x1e3)][_0x55dbc0(0x339)]['SkillPoints'];let _0x2fa07b=0x0;try{_0x2fa07b=eval(_0x3aea6f['PerLevelUp']);}catch(_0x13eb43){if($gameTemp[_0x55dbc0(0x1ae)]())console[_0x55dbc0(0x36b)](_0x13eb43);}this[_0x55dbc0(0x20a)](_0x2fa07b,_0x2cd709);},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x288)]=function(){const _0x2042eb=_0x21fdcc;return this[_0x2042eb(0x2e6)]=this['_earnedSkillPoints']||0x0,this['getSkillPoints']()-this[_0x2042eb(0x2e6)];},Game_Actor['prototype']['meetRequirementsForSkillLearnSystem']=function(_0x5798af){const _0x154bfb=_0x21fdcc;if(!_0x5798af)return![];const _0x4e0469=VisuMZ[_0x154bfb(0x1e3)][_0x154bfb(0x355)](_0x5798af,_0x154bfb(0x2ab));if(VisuMZ[_0x154bfb(0x1e3)]['JS'][_0x4e0469]){if(!VisuMZ[_0x154bfb(0x1e3)]['JS'][_0x4e0469][_0x154bfb(0x162)](this,this,_0x5798af))return![];}const _0x2b6b23=VisuMZ[_0x154bfb(0x1e3)][_0x154bfb(0x2a3)],_0x366704=_0x5798af['note'];if(_0x366704[_0x154bfb(0x2de)](_0x2b6b23[_0x154bfb(0x2cf)])){const _0x596f3f=Number(RegExp['$1']);if(_0x596f3f>this['level'])return![];}if(_0x366704['match'](_0x2b6b23[_0x154bfb(0x1f8)])){const _0x12e108=String(RegExp['$1'])[_0x154bfb(0x2f8)](',')['map'](_0x47fb61=>_0x47fb61[_0x154bfb(0x313)]());for(const _0x597b79 of _0x12e108){let _0x3bf5aa=0x0;const _0x5002ff=/^\d+$/[_0x154bfb(0x356)](_0x597b79);_0x5002ff?_0x3bf5aa=Number(_0x597b79):_0x3bf5aa=DataManager[_0x154bfb(0x1b2)](_0x597b79);if(!this['isLearnedSkill'](_0x3bf5aa))return![];}}if(_0x366704[_0x154bfb(0x2de)](_0x2b6b23['LearnReqSkillsAny'])){const _0x7f7291=String(RegExp['$1'])[_0x154bfb(0x2f8)](',')['map'](_0x2c737a=>_0x2c737a[_0x154bfb(0x313)]());let _0x4b872d=![];for(const _0x33efed of _0x7f7291){let _0x3ddf8c=0x0;const _0x5b1f11=/^\d+$/[_0x154bfb(0x356)](_0x33efed);_0x5b1f11?_0x3ddf8c=Number(_0x33efed):_0x3ddf8c=DataManager[_0x154bfb(0x1b2)](_0x33efed);if(this['isLearnedSkill'](_0x3ddf8c)){_0x4b872d=!![];break;}}if(!_0x4b872d)return![];}if(_0x366704[_0x154bfb(0x2de)](_0x2b6b23[_0x154bfb(0x214)])){const _0x4b9cc2=String(RegExp['$1'])[_0x154bfb(0x2f8)](',')[_0x154bfb(0x362)](_0xbb209d=>Number(_0xbb209d));for(const _0x90e395 of _0x4b9cc2){if(!$gameSwitches[_0x154bfb(0x17b)](_0x90e395))return![];}}if(_0x366704[_0x154bfb(0x2de)](_0x2b6b23['LearnReqSwitchesAny'])){const _0xa3e15=String(RegExp['$1'])[_0x154bfb(0x2f8)](',')[_0x154bfb(0x362)](_0x58a345=>Number(_0x58a345));let _0x4588df=![];for(const _0xdf3d8b of _0xa3e15){if($gameSwitches[_0x154bfb(0x17b)](_0xdf3d8b)){_0x4588df=!![];break;}}if(!_0x4588df)return![];}return!![];},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x207)]=function(_0x4f4277){const _0x59a5bf=_0x21fdcc;if(!_0x4f4277)return![];const _0x411942=DataManager[_0x59a5bf(0x20e)](_0x4f4277);if(_0x411942>this[_0x59a5bf(0x1fc)]())return![];const _0x4e3bba=DataManager[_0x59a5bf(0x374)](_0x4f4277);if(_0x4e3bba>this['getSkillPoints']())return![];const _0x5d884c=DataManager[_0x59a5bf(0x385)](_0x4f4277);if(_0x5d884c>$gameParty['gold']())return![];if(Imported[_0x59a5bf(0x1ff)]){const _0x3cc743=DataManager[_0x59a5bf(0x16f)](_0x4f4277);if(_0x3cc743>this[_0x59a5bf(0x322)]())return![];const _0x294495=DataManager[_0x59a5bf(0x317)](_0x4f4277);if(_0x294495>this[_0x59a5bf(0x265)]())return![];}const _0x5114b5=DataManager['getSkillLearnItemCost'](_0x4f4277);for(const _0x280faf of _0x5114b5){if(!_0x280faf)continue;const _0x2f97e9=$dataItems[_0x280faf['id']];if(_0x2f97e9&&_0x280faf[_0x59a5bf(0x19c)]>$gameParty[_0x59a5bf(0x381)](_0x2f97e9))return![];}const _0x76927a=DataManager[_0x59a5bf(0x329)](_0x4f4277);for(const _0x306baa of _0x76927a){if(!_0x306baa)continue;const _0x220905=$dataWeapons[_0x306baa['id']];if(_0x220905&&_0x306baa[_0x59a5bf(0x19c)]>$gameParty[_0x59a5bf(0x381)](_0x220905))return![];}const _0x20bf27=DataManager['getSkillLearnArmorCost'](_0x4f4277);for(const _0x3f7960 of _0x20bf27){if(!_0x3f7960)continue;const _0x270ca0=$dataArmors[_0x3f7960['id']];if(_0x270ca0&&_0x3f7960[_0x59a5bf(0x19c)]>$gameParty[_0x59a5bf(0x381)](_0x270ca0))return![];}return!![];},Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x218)]=function(_0x19631c){const _0x1d2f96=_0x21fdcc;if(!_0x19631c)return;const _0x5c6ae=DataManager[_0x1d2f96(0x20e)](_0x19631c);this[_0x1d2f96(0x1b4)](_0x5c6ae);const _0x258cf6=DataManager[_0x1d2f96(0x374)](_0x19631c);this[_0x1d2f96(0x284)](_0x258cf6);const _0x2b0887=DataManager[_0x1d2f96(0x385)](_0x19631c);$gameParty[_0x1d2f96(0x18c)](_0x2b0887);if(Imported[_0x1d2f96(0x1ff)]){const _0xc042ac=DataManager[_0x1d2f96(0x16f)](_0x19631c);this[_0x1d2f96(0x294)](_0xc042ac);const _0x4f2f7c=DataManager[_0x1d2f96(0x317)](_0x19631c);this['loseJobPoints'](_0x4f2f7c);}const _0x47f3f6=DataManager[_0x1d2f96(0x24b)](_0x19631c);for(const _0x230abd of _0x47f3f6){if(!_0x230abd)continue;const _0x48d6e5=$dataItems[_0x230abd['id']],_0xcd7f8b=_0x230abd[_0x1d2f96(0x19c)];$gameParty[_0x1d2f96(0x171)](_0x48d6e5,_0xcd7f8b);}const _0xecac8d=DataManager[_0x1d2f96(0x329)](_0x19631c);for(const _0x5636d6 of _0xecac8d){if(!_0x5636d6)continue;const _0x1617e7=$dataWeapons[_0x5636d6['id']],_0x13066d=_0x5636d6['quantity'];$gameParty[_0x1d2f96(0x171)](_0x1617e7,_0x13066d);}const _0x2d7e02=DataManager[_0x1d2f96(0x318)](_0x19631c);for(const _0x1a1e30 of _0x2d7e02){if(!_0x1a1e30)continue;const _0x1fedbc=$dataArmors[_0x1a1e30['id']],_0x505910=_0x1a1e30['quantity'];$gameParty[_0x1d2f96(0x171)](_0x1fedbc,_0x505910);}if(DataManager[_0x1d2f96(0x205)](_0x19631c))this[_0x1d2f96(0x236)](_0x19631c['id']);else DataManager[_0x1d2f96(0x1c2)](_0x19631c)&&Imported[_0x1d2f96(0x2f6)]&&this[_0x1d2f96(0x196)](_0x19631c,!![]);this[_0x1d2f96(0x176)]();},VisuMZ['SkillLearnSystem'][_0x21fdcc(0x29a)]=Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x236)],Game_Actor[_0x21fdcc(0x325)][_0x21fdcc(0x236)]=function(_0x32f2f0){const _0x5abb4b=_0x21fdcc,_0x369405=!this['isLearnedSkill'](_0x32f2f0);VisuMZ[_0x5abb4b(0x1e3)][_0x5abb4b(0x29a)][_0x5abb4b(0x162)](this,_0x32f2f0);if(_0x369405&&this['isLearnedSkill'](_0x32f2f0)){const _0x19ef7b=$dataSkills[_0x32f2f0],_0x19cf9d=VisuMZ['SkillLearnSystem'][_0x5abb4b(0x355)](_0x19ef7b,_0x5abb4b(0x2be));VisuMZ[_0x5abb4b(0x1e3)]['JS'][_0x19cf9d]&&VisuMZ[_0x5abb4b(0x1e3)]['JS'][_0x19cf9d][_0x5abb4b(0x162)](this,this,_0x19ef7b);}},Game_Actor['prototype']['onLoadBattleTestSkillLearnSystem']=function(){const _0x9d5496=_0x21fdcc,_0x15daa6=DataManager[_0x9d5496(0x321)](this['currentClass']()['id']);for(const _0x17f550 of _0x15daa6){const _0x113d8e=$dataSkills[_0x17f550];if(!_0x113d8e)continue;if(_0x113d8e['name'][_0x9d5496(0x313)]()==='')continue;if(_0x113d8e[_0x9d5496(0x29e)][_0x9d5496(0x2de)](/-----/i))continue;this[_0x9d5496(0x236)](_0x17f550);}},Game_Enemy[_0x21fdcc(0x325)]['abilityPoints']=function(){const _0x292ba3=_0x21fdcc,_0x175f99=VisuMZ[_0x292ba3(0x1e3)][_0x292ba3(0x339)][_0x292ba3(0x1e9)],_0x24cfeb=VisuMZ[_0x292ba3(0x1e3)][_0x292ba3(0x2a3)],_0x151ebb=this[_0x292ba3(0x293)]()[_0x292ba3(0x19f)];if(_0x151ebb[_0x292ba3(0x2de)](_0x24cfeb[_0x292ba3(0x2ee)]))try{return eval(RegExp['$1']);}catch(_0x58a756){if($gameTemp[_0x292ba3(0x1ae)]())console[_0x292ba3(0x36b)](_0x58a756);return 0x0;}try{return eval(_0x175f99[_0x292ba3(0x378)]);}catch(_0xe60b01){if($gameTemp['isPlaytest']())console[_0x292ba3(0x36b)](_0xe60b01);return 0x0;}},Game_Enemy[_0x21fdcc(0x325)][_0x21fdcc(0x1ce)]=function(){const _0x52cbb3=_0x21fdcc,_0x588744=VisuMZ[_0x52cbb3(0x1e3)][_0x52cbb3(0x339)][_0x52cbb3(0x31b)],_0x4b4525=VisuMZ[_0x52cbb3(0x1e3)][_0x52cbb3(0x2a3)],_0x23998c=this[_0x52cbb3(0x293)]()[_0x52cbb3(0x19f)];if(_0x23998c['match'](_0x4b4525[_0x52cbb3(0x29f)]))try{return eval(RegExp['$1']);}catch(_0x14a25f){if($gameTemp[_0x52cbb3(0x1ae)]())console[_0x52cbb3(0x36b)](_0x14a25f);return 0x0;}try{return eval(_0x588744[_0x52cbb3(0x378)]);}catch(_0xaf1068){if($gameTemp[_0x52cbb3(0x1ae)]())console[_0x52cbb3(0x36b)](_0xaf1068);return 0x0;}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x202)]=Game_Party['prototype']['setupBattleTestMembers'],Game_Party[_0x21fdcc(0x325)][_0x21fdcc(0x287)]=function(){const _0x46cb2f=_0x21fdcc;VisuMZ[_0x46cb2f(0x1e3)][_0x46cb2f(0x202)][_0x46cb2f(0x162)](this),this[_0x46cb2f(0x18b)]();},Game_Party[_0x21fdcc(0x325)]['setupBattleTestMembersSkillLearnSystem']=function(){const _0x400bba=_0x21fdcc;for(const _0x35a709 of this['allMembers']()){if(!_0x35a709)continue;_0x35a709[_0x400bba(0x262)]();}},Game_Troop[_0x21fdcc(0x325)][_0x21fdcc(0x184)]=function(){const _0x1702ed=_0x21fdcc;return this['deadMembers']()[_0x1702ed(0x216)]((_0x503237,_0x788c42)=>_0x503237+_0x788c42[_0x1702ed(0x223)](),0x0);},Game_Troop[_0x21fdcc(0x325)][_0x21fdcc(0x2eb)]=function(){const _0x1a34e3=_0x21fdcc;return this['deadMembers']()[_0x1a34e3(0x216)]((_0x13a7d7,_0x2007be)=>_0x13a7d7+_0x2007be[_0x1a34e3(0x1ce)](),0x0);},VisuMZ[_0x21fdcc(0x1e3)]['Scene_Skill_create']=Scene_Skill['prototype']['create'],Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x243)]=function(){const _0x5a879d=_0x21fdcc;VisuMZ[_0x5a879d(0x1e3)][_0x5a879d(0x1b6)]['call'](this),this['createSkillLearnSystemWindows']();},Scene_Skill['prototype']['createSkillLearnSystemWindows']=function(){const _0x200488=_0x21fdcc;this[_0x200488(0x173)](),this[_0x200488(0x2e8)]();},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x173)]=function(){const _0x42ccac=_0x21fdcc,_0x3a84ed=this['skillLearnIngredientsWindowRect']();this[_0x42ccac(0x333)]=new Window_SkillLearnIngredients(_0x3a84ed),this[_0x42ccac(0x347)](this['_skillLearnIngredientsWindow']),this[_0x42ccac(0x333)][_0x42ccac(0x1b7)]();const _0x35e207=VisuMZ[_0x42ccac(0x1e3)]['Settings']['Window'][_0x42ccac(0x212)];this['_skillLearnIngredientsWindow'][_0x42ccac(0x248)](_0x35e207);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x35d)]=function(){const _0x18d2c4=_0x21fdcc;if(VisuMZ[_0x18d2c4(0x1e3)]['Settings'][_0x18d2c4(0x2b7)][_0x18d2c4(0x35e)])return VisuMZ['SkillLearnSystem']['Settings']['Window'][_0x18d2c4(0x35e)][_0x18d2c4(0x162)](this);const _0x6486aa=this[_0x18d2c4(0x354)](),_0x5dac1e=_0x6486aa['x'],_0xabd800=_0x6486aa['y'],_0x2d8e6b=_0x6486aa[_0x18d2c4(0x2fb)],_0x2e4670=_0x6486aa[_0x18d2c4(0x23a)]-this[_0x18d2c4(0x25e)](0x2,![]);return new Rectangle(_0x5dac1e,_0xabd800,_0x2d8e6b,_0x2e4670);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x2e8)]=function(){const _0x3b4523=_0x21fdcc,_0x2172ed=this[_0x3b4523(0x371)]();this[_0x3b4523(0x17a)]=new Window_SkillLearnConfirm(_0x2172ed),this[_0x3b4523(0x347)](this[_0x3b4523(0x17a)]),this['_skillLearnConfirmWindow']['setHandler']('ok',this[_0x3b4523(0x1ea)]['bind'](this)),this[_0x3b4523(0x17a)]['setHandler']('cancel',this['onSkillLearnConfirmCancel']['bind'](this)),this['_skillLearnConfirmWindow'][_0x3b4523(0x1b7)]();const _0x213a60=VisuMZ[_0x3b4523(0x1e3)]['Settings']['Window'][_0x3b4523(0x242)];this['_skillLearnConfirmWindow'][_0x3b4523(0x248)](_0x213a60);},Scene_Skill[_0x21fdcc(0x325)]['skillLearnConfirmWindow']=function(){const _0xa69f51=_0x21fdcc;if(VisuMZ[_0xa69f51(0x1e3)][_0xa69f51(0x339)][_0xa69f51(0x2b7)][_0xa69f51(0x2f1)])return VisuMZ[_0xa69f51(0x1e3)][_0xa69f51(0x339)][_0xa69f51(0x2b7)][_0xa69f51(0x2f1)][_0xa69f51(0x162)](this);const _0x43ed88=this[_0xa69f51(0x354)](),_0x4a4765=_0x43ed88[_0xa69f51(0x2fb)],_0xf568b=this[_0xa69f51(0x25e)](0x2,![]),_0xfa851c=_0x43ed88['x'],_0x3190b7=_0x43ed88['y']+_0x43ed88[_0xa69f51(0x23a)]-_0xf568b;return new Rectangle(_0xfa851c,_0x3190b7,_0x4a4765,_0xf568b);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x282)]=Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x272)],Scene_Skill['prototype'][_0x21fdcc(0x272)]=function(){const _0x5ae818=_0x21fdcc;this[_0x5ae818(0x247)][_0x5ae818(0x213)]()?this[_0x5ae818(0x247)][_0x5ae818(0x2e5)]()&&this[_0x5ae818(0x247)][_0x5ae818(0x2e5)]()[_0x5ae818(0x256)]?this[_0x5ae818(0x31d)]():this['onSkillLearnItemOk']():VisuMZ[_0x5ae818(0x1e3)][_0x5ae818(0x282)]['call'](this);},Scene_Skill['prototype'][_0x21fdcc(0x31d)]=function(){const _0x27a9b0=_0x21fdcc;this[_0x27a9b0(0x247)][_0x27a9b0(0x1d1)](),this[_0x27a9b0(0x247)][_0x27a9b0(0x2ec)]();},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x2b2)]=function(){const _0x3e11a5=_0x21fdcc;this['_itemWindow'][_0x3e11a5(0x1b7)](),this[_0x3e11a5(0x333)][_0x3e11a5(0x308)](),this['_skillLearnIngredientsWindow'][_0x3e11a5(0x176)](),this[_0x3e11a5(0x17a)][_0x3e11a5(0x308)](),this[_0x3e11a5(0x17a)][_0x3e11a5(0x176)](),this[_0x3e11a5(0x17a)][_0x3e11a5(0x2ec)](),this[_0x3e11a5(0x17a)][_0x3e11a5(0x327)](0x0);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x1ea)]=function(){const _0x40fa15=_0x21fdcc;VisuMZ['SkillLearnSystem'][_0x40fa15(0x339)][_0x40fa15(0x2e0)][_0x40fa15(0x228)]?this[_0x40fa15(0x344)]():this[_0x40fa15(0x2b5)]();},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x31a)]=function(){const _0x159383=_0x21fdcc;this[_0x159383(0x247)][_0x159383(0x308)](),this[_0x159383(0x247)][_0x159383(0x2ec)](),this[_0x159383(0x333)][_0x159383(0x1b7)](),this[_0x159383(0x17a)][_0x159383(0x1b7)]();},Scene_Skill[_0x21fdcc(0x325)]['finishSkillLearnAnimation']=function(){const _0x599cd0=_0x21fdcc;this['_windowLayer'][_0x599cd0(0x208)]=!![],this[_0x599cd0(0x335)]=![],SoundManager[_0x599cd0(0x34e)](),this[_0x599cd0(0x1ed)]()[_0x599cd0(0x218)](this[_0x599cd0(0x2e5)]()),this[_0x599cd0(0x31a)](),this[_0x599cd0(0x247)]['refresh'](),this[_0x599cd0(0x2ea)][_0x599cd0(0x176)]();for(;;){if(this[_0x599cd0(0x247)][_0x599cd0(0x240)]()<=0x0)break;if(this['_itemWindow'][_0x599cd0(0x2e5)]())break;this[_0x599cd0(0x247)][_0x599cd0(0x16b)](Math[_0x599cd0(0x35b)](this[_0x599cd0(0x247)][_0x599cd0(0x240)]()-0x1,0x0));}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x18e)]=Scene_Skill['prototype'][_0x21fdcc(0x304)],Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x304)]=function(){const _0xa0a764=_0x21fdcc;VisuMZ[_0xa0a764(0x1e3)][_0xa0a764(0x18e)][_0xa0a764(0x162)](this),this[_0xa0a764(0x259)]();},Scene_Skill[_0x21fdcc(0x325)]['startSkillLearnAnimation']=function(){const _0x208772=_0x21fdcc;this['_skillLearnAnimationPlaying']=!![],this['_skillLearnAnimationWait']=0x14,this[_0x208772(0x2b1)][_0x208772(0x208)]=VisuMZ[_0x208772(0x1e3)][_0x208772(0x339)][_0x208772(0x2e0)][_0x208772(0x254)]||![],this[_0x208772(0x2ef)]();},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x2ef)]=function(){const _0x8215bd=_0x21fdcc;this[_0x8215bd(0x267)]=new Sprite(),this[_0x8215bd(0x17f)](this[_0x8215bd(0x267)]),this[_0x8215bd(0x2f0)](),this[_0x8215bd(0x250)](),this[_0x8215bd(0x309)](),this['setSkillLearnSkillSpriteOpacity'](),this[_0x8215bd(0x1c6)](),this[_0x8215bd(0x231)](this[_0x8215bd(0x34c)][_0x8215bd(0x2c6)]());},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x2f0)]=function(){const _0x1748f0=_0x21fdcc,_0x211202=VisuMZ[_0x1748f0(0x1e3)][_0x1748f0(0x2a3)],_0x2bae7d=this[_0x1748f0(0x2e5)]()[_0x1748f0(0x19f)];this[_0x1748f0(0x2f9)]='';if(_0x2bae7d[_0x1748f0(0x2de)](_0x211202[_0x1748f0(0x237)]))this['_learnPicture']=String(RegExp['$1']);else _0x2bae7d['match'](_0x211202[_0x1748f0(0x1a3)])&&(this[_0x1748f0(0x2f9)]=String(RegExp['$1']));this['_skillLearnBitmapSprite']=new Sprite();this['_learnPicture']?this['_skillLearnBitmapSprite'][_0x1748f0(0x369)]=ImageManager[_0x1748f0(0x26a)](this[_0x1748f0(0x2f9)]):(this[_0x1748f0(0x1f5)][_0x1748f0(0x369)]=ImageManager[_0x1748f0(0x21e)](_0x1748f0(0x32e)),this['_skillLearnBitmapSprite'][_0x1748f0(0x369)]['smooth']=![]);this[_0x1748f0(0x1f5)][_0x1748f0(0x36f)]['x']=0.5,this[_0x1748f0(0x1f5)]['anchor']['y']=0.5;if(!this['_learnPicture']){const _0x4f98d9=VisuMZ['SkillLearnSystem']['Settings'][_0x1748f0(0x2e0)][_0x1748f0(0x24d)]||0x8;this['_skillLearnBitmapSprite'][_0x1748f0(0x2e7)]['x']=_0x4f98d9,this[_0x1748f0(0x1f5)][_0x1748f0(0x2e7)]['y']=_0x4f98d9;}this['_skillLearnIconSprite'][_0x1748f0(0x17f)](this[_0x1748f0(0x1f5)]);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x250)]=function(){const _0x5e39e3=_0x21fdcc;if(this[_0x5e39e3(0x2f9)])return;const _0x5e4b86=this['item'](),_0x3a12ab=_0x5e4b86[_0x5e39e3(0x233)],_0x31c8a5=ImageManager[_0x5e39e3(0x36e)],_0x3303cd=ImageManager[_0x5e39e3(0x22f)],_0x15d9af=_0x3a12ab%0x10*_0x31c8a5,_0x5af577=Math[_0x5e39e3(0x2c9)](_0x3a12ab/0x10)*_0x3303cd;this[_0x5e39e3(0x1f5)]['setFrame'](_0x15d9af,_0x5af577,_0x31c8a5,_0x3303cd);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x309)]=function(){const _0x34aaa9=_0x21fdcc;this[_0x34aaa9(0x267)]['x']=Math[_0x34aaa9(0x2c4)](Graphics[_0x34aaa9(0x2fb)]/0x2);const _0x315fa3=Math['round'](ImageManager[_0x34aaa9(0x22f)]*this[_0x34aaa9(0x267)]['scale']['y']);this[_0x34aaa9(0x267)]['y']=Math['round']((Graphics[_0x34aaa9(0x23a)]+_0x315fa3)/0x2);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x166)]=function(){const _0x168f30=_0x21fdcc;this[_0x168f30(0x179)]=VisuMZ[_0x168f30(0x1e3)][_0x168f30(0x339)]['Animation'][_0x168f30(0x204)]||0x1,this['item']()[_0x168f30(0x19f)][_0x168f30(0x2de)](VisuMZ[_0x168f30(0x1e3)][_0x168f30(0x2a3)][_0x168f30(0x17c)])&&(this['_skillLearnIconSpriteOpacitySpeed']=Math[_0x168f30(0x35b)](Number(RegExp['$1']),0x1)),this[_0x168f30(0x267)][_0x168f30(0x2dc)]=0x0;},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x1c6)]=function(){const _0x9e8d7a=_0x21fdcc;this[_0x9e8d7a(0x34c)]=[],this[_0x9e8d7a(0x2e5)]()[_0x9e8d7a(0x19f)]['match'](VisuMZ[_0x9e8d7a(0x1e3)][_0x9e8d7a(0x2a3)]['animationIDs'])?this[_0x9e8d7a(0x34c)]=RegExp['$1'][_0x9e8d7a(0x2f8)](',')[_0x9e8d7a(0x362)](_0x2e6836=>Number(_0x2e6836)):this['_skillLearnAnimationIDs']=this[_0x9e8d7a(0x34c)]['concat'](VisuMZ[_0x9e8d7a(0x1e3)][_0x9e8d7a(0x339)][_0x9e8d7a(0x2e0)]['Animations']);},Scene_Skill[_0x21fdcc(0x325)]['createSkillLearnAnimation']=function(_0x51b2ec){const _0x560089=_0x21fdcc,_0x24c4de=$dataAnimations[_0x51b2ec];if(!_0x24c4de)return;const _0x117576=this[_0x560089(0x1d4)](_0x24c4de);this['_skillLearnAnimationSprite']=new(_0x117576?Sprite_AnimationMV:Sprite_Animation)();const _0xbf0303=[this[_0x560089(0x267)]],_0x3ca23a=0x0;this[_0x560089(0x32f)][_0x560089(0x1bb)](_0xbf0303,_0x24c4de,![],_0x3ca23a,null),this[_0x560089(0x17f)](this[_0x560089(0x32f)]);},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x1d4)]=function(_0x8394c7){const _0x292cce=_0x21fdcc;return!!_0x8394c7[_0x292cce(0x238)];},Scene_Skill[_0x21fdcc(0x325)]['updateSkillLearnAnimation']=function(){const _0x1acd79=_0x21fdcc;if(!this['_skillLearnAnimationPlaying'])return;this[_0x1acd79(0x278)](),this[_0x1acd79(0x28f)](),this['isFinishedSkillLearnAnimating']()&&this[_0x1acd79(0x343)]();},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x278)]=function(){const _0x2dbbf5=_0x21fdcc;this[_0x2dbbf5(0x267)]['opacity']+=this['_skillLearnIconSpriteOpacitySpeed'];},Scene_Skill[_0x21fdcc(0x325)]['updateSkillLearnAnimationSprite']=function(){const _0x572c54=_0x21fdcc;if(!this[_0x572c54(0x32f)])return;if(this[_0x572c54(0x32f)][_0x572c54(0x24a)]())return;this[_0x572c54(0x19b)](),this[_0x572c54(0x231)](this[_0x572c54(0x34c)][_0x572c54(0x2c6)]());},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x19b)]=function(){const _0xc553dc=_0x21fdcc;if(!this[_0xc553dc(0x32f)])return;this[_0xc553dc(0x26c)](this[_0xc553dc(0x32f)]),this[_0xc553dc(0x32f)]['destroy'](),this[_0xc553dc(0x32f)]=undefined;},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x22b)]=function(){const _0x5463b0=_0x21fdcc;if(!this[_0x5463b0(0x267)])return;this[_0x5463b0(0x26c)](this['_skillLearnIconSprite']),this[_0x5463b0(0x267)]['destroy'](),this[_0x5463b0(0x267)]=undefined;},Scene_Skill['prototype'][_0x21fdcc(0x363)]=function(){const _0x24805d=_0x21fdcc;if(TouchInput['isReleased']())return!![];if(Input[_0x24805d(0x18f)]('ok'))return!![];if(Input['isTriggered'](_0x24805d(0x221)))return!![];if(this[_0x24805d(0x267)]['opacity']<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this['_skillLearnAnimationWait']--<=0x0;},Scene_Skill[_0x21fdcc(0x325)][_0x21fdcc(0x343)]=function(){const _0x3d6082=_0x21fdcc;this['destroySkillLearnAnimationSprite'](),this[_0x3d6082(0x22b)](),this[_0x3d6082(0x2b5)](),TouchInput[_0x3d6082(0x326)](),Input['clear']();},Window_Base[_0x21fdcc(0x325)][_0x21fdcc(0x16c)]=function(_0x369a4b,_0xa2d4fe,_0x14319a,_0x1a3a73,_0x4b1418){const _0x1eb5e9=_0x21fdcc;_0x4b1418=_0x4b1418||_0x1eb5e9(0x2cc);const _0x228e60='\x5cI[%1]'[_0x1eb5e9(0x1ba)](ImageManager[_0x1eb5e9(0x2f2)]),_0x2c5e78=TextManager['abilityPointsFmt'],_0x26e3ff=_0x2c5e78[_0x1eb5e9(0x1ba)](_0x369a4b,TextManager[_0x1eb5e9(0x269)],_0x228e60,TextManager['abilityPointsFull']),_0x2bff52=this[_0x1eb5e9(0x377)](_0x26e3ff)[_0x1eb5e9(0x2fb)];if(_0x4b1418===_0x1eb5e9(0x2cc))_0xa2d4fe+=0x0;else _0x4b1418==='center'?_0xa2d4fe+=Math[_0x1eb5e9(0x2c4)]((_0x1a3a73-_0x2bff52)/0x2):_0xa2d4fe+=_0x1a3a73-_0x2bff52;this['drawTextEx'](_0x26e3ff,_0xa2d4fe,_0x14319a);},Window_Base[_0x21fdcc(0x325)]['drawActorAbilityPoints']=function(_0xea1da,_0x4a68a1,_0x30042e,_0x5b493e,_0x31d282,_0x588a1c){const _0x19add0=_0x21fdcc,_0x599e24=_0xea1da[_0x19add0(0x1fc)](_0x4a68a1);this[_0x19add0(0x16c)](_0x599e24,_0x30042e,_0x5b493e,_0x31d282,_0x588a1c);},Window_Base[_0x21fdcc(0x325)][_0x21fdcc(0x192)]=function(_0x2beb0c,_0x3b0ccf,_0xa02f42,_0x3ee430,_0x1f26d8){const _0xe524e2=_0x21fdcc;_0x1f26d8=_0x1f26d8||_0xe524e2(0x2cc);const _0x58e0c7=_0xe524e2(0x297)[_0xe524e2(0x1ba)](ImageManager[_0xe524e2(0x2ce)]),_0x3bd133=TextManager[_0xe524e2(0x20f)],_0x3d32be=_0x3bd133[_0xe524e2(0x1ba)](_0x2beb0c,TextManager[_0xe524e2(0x307)],_0x58e0c7,TextManager['skillPointsFull']),_0x5510e5=this[_0xe524e2(0x377)](_0x3d32be)[_0xe524e2(0x2fb)];if(_0x1f26d8===_0xe524e2(0x2cc))_0x3b0ccf+=0x0;else _0x1f26d8===_0xe524e2(0x290)?_0x3b0ccf+=Math[_0xe524e2(0x2c4)]((_0x3ee430-_0x5510e5)/0x2):_0x3b0ccf+=_0x3ee430-_0x5510e5;this['drawTextEx'](_0x3d32be,_0x3b0ccf,_0xa02f42);},Window_Base[_0x21fdcc(0x325)][_0x21fdcc(0x2a5)]=function(_0xf30805,_0x431f61,_0x2752a0,_0x1d7ca7,_0x4ce522,_0xab4853){const _0x5438fb=_0x21fdcc,_0x148256=_0xf30805['getSkillPoints'](_0x431f61);this[_0x5438fb(0x192)](_0x148256,_0x2752a0,_0x1d7ca7,_0x4ce522,_0xab4853);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x175)]=Window_SkillType['prototype'][_0x21fdcc(0x2d4)],Window_SkillType[_0x21fdcc(0x325)][_0x21fdcc(0x2d4)]=function(){const _0x2b58eb=_0x21fdcc;VisuMZ[_0x2b58eb(0x1e3)][_0x2b58eb(0x175)][_0x2b58eb(0x162)](this),this['addSkillLearnSystemCommand']();},Window_SkillType[_0x21fdcc(0x325)][_0x21fdcc(0x200)]=function(){const _0x4ee382=_0x21fdcc;if(!$gameSystem[_0x4ee382(0x1a8)]())return;if(!this[_0x4ee382(0x199)])return;let _0x3df7ae=this['skillLearnSystemCommandName']();const _0x31a85e=this['_actor'][_0x4ee382(0x230)]()[0x0];this[_0x4ee382(0x1a0)](_0x3df7ae,'skill',!![],_0x4ee382(0x2f4));},Window_SkillType[_0x21fdcc(0x325)]['skillLearnSystemCommandName']=function(){const _0x3e3d63=_0x21fdcc;let _0x4105cd=TextManager[_0x3e3d63(0x174)];if(_0x4105cd[_0x3e3d63(0x2de)](/\\I\[(\d+)\]/i))return _0x4105cd;if(!Imported[_0x3e3d63(0x2bf)])return _0x4105cd;if(this['commandStyle']()===_0x3e3d63(0x268))return _0x4105cd;const _0x1e4cca=TextManager[_0x3e3d63(0x235)];return'\x5cI[%1]%2'[_0x3e3d63(0x1ba)](_0x1e4cca,_0x4105cd);},VisuMZ[_0x21fdcc(0x1e3)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x21fdcc(0x325)][_0x21fdcc(0x176)],Window_SkillStatus[_0x21fdcc(0x325)][_0x21fdcc(0x176)]=function(){const _0x27e7a6=_0x21fdcc;this[_0x27e7a6(0x193)](),this[_0x27e7a6(0x213)]()?this[_0x27e7a6(0x23e)]():VisuMZ['SkillLearnSystem'][_0x27e7a6(0x188)][_0x27e7a6(0x162)](this);},Window_SkillStatus['prototype'][_0x21fdcc(0x213)]=function(){const _0x16afe0=_0x21fdcc,_0xd3d33d=SceneManager[_0x16afe0(0x27f)];if(!_0xd3d33d)return![];const _0xed6d9c=_0xd3d33d[_0x16afe0(0x247)];if(!_0xed6d9c)return![];return _0xed6d9c[_0x16afe0(0x213)]&&_0xed6d9c[_0x16afe0(0x213)]();},Window_SkillStatus['prototype'][_0x21fdcc(0x23e)]=function(){const _0x17f51d=_0x21fdcc;if(!this[_0x17f51d(0x199)])return;Window_StatusBase[_0x17f51d(0x325)]['refresh'][_0x17f51d(0x162)](this);if(VisuMZ[_0x17f51d(0x1e3)][_0x17f51d(0x339)][_0x17f51d(0x36a)][_0x17f51d(0x1b5)]){VisuMZ[_0x17f51d(0x1e3)][_0x17f51d(0x339)][_0x17f51d(0x36a)][_0x17f51d(0x1b5)][_0x17f51d(0x162)](this);return;}const _0xb53373=this['colSpacing']()/0x2,_0x2ae28a=this[_0x17f51d(0x1c8)],_0x12e4fc=_0x2ae28a/0x2-this['lineHeight']()*1.5;this['drawActorFace'](this[_0x17f51d(0x199)],_0xb53373+0x1,0x0,0x90,_0x2ae28a),this[_0x17f51d(0x349)](this[_0x17f51d(0x199)],_0xb53373+0xb4,_0x12e4fc);let _0x3d43b5=this[_0x17f51d(0x1c5)]()/0x2+0xb4+0xb4+0xb4,_0x105617=this[_0x17f51d(0x1a1)]-_0x3d43b5-0x2;if(_0x105617<0x12c)return;const _0x267af0=this[_0x17f51d(0x372)](),_0x54edd7=Math['floor'](this['innerHeight']/this[_0x17f51d(0x187)]()),_0x3c26d3=Math[_0x17f51d(0x1d2)](_0x267af0[_0x17f51d(0x310)]/_0x54edd7);let _0x49d6ca=_0x3d43b5,_0xc4d4b2=Math[_0x17f51d(0x35b)](Math[_0x17f51d(0x2c4)]((this[_0x17f51d(0x1c8)]-this[_0x17f51d(0x187)]()*Math[_0x17f51d(0x1d2)](_0x267af0[_0x17f51d(0x310)]/_0x3c26d3))/0x2),0x0);const _0x3fd6ea=_0xc4d4b2;let _0x5d3633=(this[_0x17f51d(0x1a1)]-_0x49d6ca-this[_0x17f51d(0x1f1)]()*0x2*_0x3c26d3)/_0x3c26d3;_0x3c26d3===0x1&&(_0x5d3633=Math[_0x17f51d(0x375)](ImageManager[_0x17f51d(0x1ee)],_0x5d3633),_0x49d6ca+=Math[_0x17f51d(0x2c4)]((this[_0x17f51d(0x1a1)]-_0x49d6ca-this[_0x17f51d(0x1f1)]()*0x2-_0x5d3633)/0x2));for(const _0x27d1f3 of _0x267af0){switch(_0x27d1f3){case'AP':this[_0x17f51d(0x292)](this[_0x17f51d(0x199)],this[_0x17f51d(0x199)]['currentClass']()['id'],_0x49d6ca,_0xc4d4b2,_0x5d3633,_0x17f51d(0x37c));break;case'CP':Imported[_0x17f51d(0x1ff)]&&this[_0x17f51d(0x36d)](this['_actor'],this[_0x17f51d(0x199)][_0x17f51d(0x383)]()['id'],_0x49d6ca,_0xc4d4b2,_0x5d3633,'right');break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x17f51d(0x22d)](this[_0x17f51d(0x199)],this[_0x17f51d(0x199)][_0x17f51d(0x383)]()['id'],_0x49d6ca,_0xc4d4b2,_0x5d3633,_0x17f51d(0x37c));break;case'SP':this['drawActorSkillPoints'](this['_actor'],this[_0x17f51d(0x199)]['currentClass']()['id'],_0x49d6ca,_0xc4d4b2,_0x5d3633,'right');break;case _0x17f51d(0x1a5):this['drawCurrencyValue']($gameParty[_0x17f51d(0x2cd)](),TextManager['currencyUnit'],_0x49d6ca,_0xc4d4b2,_0x5d3633);break;default:continue;}_0xc4d4b2+=this[_0x17f51d(0x187)](),_0xc4d4b2+this['lineHeight']()>this[_0x17f51d(0x1c8)]&&(_0xc4d4b2=_0x3fd6ea,_0x49d6ca+=_0x5d3633+this['itemPadding']()*0x2);}},Window_SkillStatus[_0x21fdcc(0x325)][_0x21fdcc(0x372)]=function(){const _0x89270b=_0x21fdcc,_0x305005=JsonEx[_0x89270b(0x167)](VisuMZ['SkillLearnSystem'][_0x89270b(0x339)][_0x89270b(0x36a)][_0x89270b(0x253)]);return!Imported[_0x89270b(0x1ff)]&&(_0x305005[_0x89270b(0x353)]('CP'),_0x305005[_0x89270b(0x353)]('JP')),_0x305005[_0x89270b(0x353)](_0x89270b(0x1f3))[_0x89270b(0x353)](_0x89270b(0x1cc))['remove'](_0x89270b(0x358));},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x1be)]=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x1f0)],Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x1f0)]=function(_0x27546c){const _0x2ec1d0=_0x21fdcc;this[_0x2ec1d0(0x245)]=[],VisuMZ['SkillLearnSystem'][_0x2ec1d0(0x1be)][_0x2ec1d0(0x162)](this,_0x27546c);},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x213)]=function(){const _0x188e0f=_0x21fdcc;return this[_0x188e0f(0x1f4)]===_0x188e0f(0x2f4);},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x266)]=function(){const _0x3924f9=_0x21fdcc;return VisuMZ[_0x3924f9(0x1e3)][_0x3924f9(0x339)][_0x3924f9(0x36a)][_0x3924f9(0x2d3)]??![];},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x1e8)]=function(){const _0xb0c039=_0x21fdcc;return VisuMZ[_0xb0c039(0x1e3)]['Settings'][_0xb0c039(0x36a)]['SeparateIndent']??0x10;},VisuMZ[_0x21fdcc(0x1e3)]['Window_SkillList_setActor']=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x181)],Window_SkillList['prototype'][_0x21fdcc(0x181)]=function(_0x47623b){const _0xe2b731=_0x21fdcc;this['_actor']!==_0x47623b&&(this[_0xe2b731(0x245)]=[]),VisuMZ[_0xe2b731(0x1e3)][_0xe2b731(0x1d8)][_0xe2b731(0x162)](this,_0x47623b);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x274)]=Window_SkillList['prototype'][_0x21fdcc(0x255)],Window_SkillList[_0x21fdcc(0x325)]['setStypeId']=function(_0x2cf2ba){const _0x51e01e=_0x21fdcc,_0x19a95f=this[_0x51e01e(0x213)]();VisuMZ[_0x51e01e(0x1e3)]['Window_SkillList_setStypeId'][_0x51e01e(0x162)](this,_0x2cf2ba);if(_0x19a95f!==this[_0x51e01e(0x213)]()){const _0x5986fd=SceneManager[_0x51e01e(0x27f)];if(!_0x5986fd)return;const _0x251b48=_0x5986fd['_statusWindow'];if(_0x251b48)_0x251b48[_0x51e01e(0x176)]();}},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x2ad)]=Window_SkillList[_0x21fdcc(0x325)]['maxCols'],Window_SkillList['prototype'][_0x21fdcc(0x2c5)]=function(){const _0x4ed0a4=_0x21fdcc;return this['isSkillLearnMode']()?0x1:VisuMZ[_0x4ed0a4(0x1e3)]['Window_SkillList_maxCols']['call'](this);},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x28a)]=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x276)],Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x276)]=function(){const _0x55027b=_0x21fdcc;this[_0x55027b(0x199)]&&this[_0x55027b(0x213)]()?this['makeSkillLearnList']():VisuMZ['SkillLearnSystem']['Window_SkillList_makeItemList'][_0x55027b(0x162)](this);},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x2d1)]=function(){const _0x4b44b2=_0x21fdcc,_0x522f9f=this[_0x4b44b2(0x266)](),_0x5ef306=DataManager[_0x4b44b2(0x321)](this['_actor'][_0x4b44b2(0x383)]()['id']);_0x522f9f?this[_0x4b44b2(0x28b)](_0x5ef306):this[_0x4b44b2(0x306)]=_0x5ef306[_0x4b44b2(0x362)](_0x2cf9f4=>$dataSkills[_0x2cf9f4])[_0x4b44b2(0x301)](_0x379bce=>this[_0x4b44b2(0x37e)](_0x379bce));if(Imported[_0x4b44b2(0x2f6)]){let _0x3cd136=!![];if(this[_0x4b44b2(0x266)]()){this[_0x4b44b2(0x352)](_0x4b44b2(0x246));if(this[_0x4b44b2(0x245)][_0x4b44b2(0x37e)](_0x4b44b2(0x246)))_0x3cd136=![];}const _0x641852=DataManager['getSkillLearnPassiveSkillsFromClass'](this[_0x4b44b2(0x199)][_0x4b44b2(0x383)]()['id']),_0x3c1e6c=_0x641852[_0x4b44b2(0x362)](_0x1194a3=>$dataStates[_0x1194a3])[_0x4b44b2(0x301)](_0x465053=>this[_0x4b44b2(0x37e)](_0x465053));if(_0x3c1e6c[_0x4b44b2(0x310)]>0x0&&_0x3cd136)this[_0x4b44b2(0x1fa)]();else this[_0x4b44b2(0x266)]()&&_0x3c1e6c[_0x4b44b2(0x310)]<=0x0&&this['_data'][_0x4b44b2(0x2af)]();}},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x28b)]=function(_0x32f551){const _0xffeb63=_0x21fdcc;this[_0xffeb63(0x306)]=[];const _0x4ed2e8=_0x32f551[_0xffeb63(0x362)](_0x598791=>$dataSkills[_0x598791]?$dataSkills[_0x598791][_0xffeb63(0x20c)]:0x0)[_0xffeb63(0x353)](0x0)['filter']((_0x411f9b,_0x30718d,_0x2ea9a8)=>_0x2ea9a8[_0xffeb63(0x1fe)](_0x411f9b)===_0x30718d)['sort']((_0x3099d0,_0x21c8f6)=>_0x3099d0-_0x21c8f6);for(const _0x1fe762 of _0x4ed2e8){this['makeSkillLearnStypeCategory'](_0x1fe762);const _0x334eed=_0x32f551[_0xffeb63(0x362)](_0x1536fb=>$dataSkills[_0x1536fb])[_0xffeb63(0x301)](_0x9d3a46=>this[_0xffeb63(0x37e)](_0x9d3a46)&&_0x9d3a46[_0xffeb63(0x20c)]===_0x1fe762);_0x334eed[_0xffeb63(0x310)]<=0x0&&this['_data'][_0xffeb63(0x2af)]();if(this[_0xffeb63(0x245)][_0xffeb63(0x37e)](_0x1fe762))continue;this[_0xffeb63(0x306)]=this[_0xffeb63(0x306)][_0xffeb63(0x19e)](_0x334eed);}},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x352)]=function(_0x366be9){const _0x4ef72a=_0x21fdcc,_0x2f0e97=Imported[_0x4ef72a(0x2bf)]?VisuMZ[_0x4ef72a(0x23b)][_0x4ef72a(0x339)][_0x4ef72a(0x1ac)]:{},_0x4c0f25=$dataSystem[_0x4ef72a(0x219)]['includes'](_0x366be9);let _0x4dca7b=_0x4c0f25?_0x2f0e97[_0x4ef72a(0x384)]:_0x2f0e97['IconStypeNorm'];_0x366be9===_0x4ef72a(0x246)&&(_0x4dca7b=ImageManager[_0x4ef72a(0x1de)]['icon']);let _0x587f20=$dataSystem[_0x4ef72a(0x230)][_0x366be9];_0x366be9==='passives'&&(_0x587f20=TextManager[_0x4ef72a(0x1de)][_0x4ef72a(0x1b1)]),_0x587f20[_0x4ef72a(0x2de)](/\\I\[(\d+)\]/i)&&(_0x4dca7b=Number(RegExp['$1']),_0x587f20=_0x587f20['replace'](/\\I\[(\d+)\]/gi,'')[_0x4ef72a(0x313)]()),_0x366be9!==_0x4ef72a(0x246)&&(_0x587f20=TextManager[_0x4ef72a(0x34d)][_0x4ef72a(0x1ba)](_0x587f20)),this[_0x4ef72a(0x306)]['push']({'id':-0x1,'name':_0x587f20,'iconIndex':_0x4dca7b||0x0,'description':'','disabled':!![],'stypeCategory':!![],'stypeId':_0x366be9,'note':_0x4ef72a(0x18a)[_0x4ef72a(0x1ba)](TextManager[_0x4ef72a(0x2d6)])});},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x1ad)]=Window_SkillList[_0x21fdcc(0x325)]['alterSkillName'],Window_SkillList['prototype'][_0x21fdcc(0x22c)]=function(_0x2a0f62){const _0x42b4d6=_0x21fdcc;VisuMZ[_0x42b4d6(0x1e3)][_0x42b4d6(0x1ad)][_0x42b4d6(0x162)](this,_0x2a0f62);if(!_0x2a0f62)return;if(!_0x2a0f62[_0x42b4d6(0x256)])return;let _0x20644d=_0x2a0f62[_0x42b4d6(0x29e)];const _0x133617=this[_0x42b4d6(0x245)]['includes'](_0x2a0f62[_0x42b4d6(0x20c)]);_0x133617?_0x20644d=TextManager[_0x42b4d6(0x1bc)]['format'](_0x20644d):_0x20644d=TextManager[_0x42b4d6(0x23d)][_0x42b4d6(0x1ba)](_0x20644d),_0x2a0f62[_0x42b4d6(0x29e)]=_0x20644d;},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x1d1)]=function(){const _0x270b95=_0x21fdcc,_0x27c21c=this[_0x270b95(0x2e5)](),_0x21e8ba=_0x27c21c['stypeId'];this[_0x270b95(0x245)][_0x270b95(0x37e)](_0x21e8ba)?this[_0x270b95(0x245)][_0x270b95(0x353)](_0x21e8ba):this[_0x270b95(0x245)]['push'](_0x21e8ba),this[_0x270b95(0x176)]();},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x296)]=Window_SkillList['prototype'][_0x21fdcc(0x37e)],Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x37e)]=function(_0x449a27){const _0x57f9ed=_0x21fdcc;return this[_0x57f9ed(0x213)]()?this['skillLearnIncludes'](_0x449a27):VisuMZ[_0x57f9ed(0x1e3)]['Window_SkillList_includes'][_0x57f9ed(0x162)](this,_0x449a27);},Window_SkillList[_0x21fdcc(0x325)]['skillLearnIncludes']=function(_0x319b61){const _0x338e27=_0x21fdcc;if(!_0x319b61)return![];if(_0x319b61['name'][_0x338e27(0x310)]<=0x0)return![];if(_0x319b61['name']['match'](/-----/i))return![];if(VisuMZ['SkillLearnSystem'][_0x338e27(0x339)][_0x338e27(0x36a)][_0x338e27(0x197)]){if(DataManager[_0x338e27(0x205)](_0x319b61)){if(this[_0x338e27(0x199)]['isLearnedSkill'](_0x319b61['id']))return![];}if(_0x319b61&&_0x319b61[_0x338e27(0x1aa)]!==undefined&&Imported[_0x338e27(0x2f6)]){if(this[_0x338e27(0x199)][_0x338e27(0x2fe)](_0x319b61))return![];}}const _0x5bcfec=VisuMZ[_0x338e27(0x1e3)][_0x338e27(0x355)](_0x319b61,'jsLearnShow');if(VisuMZ[_0x338e27(0x1e3)]['JS'][_0x5bcfec]){if(!VisuMZ['SkillLearnSystem']['JS'][_0x5bcfec][_0x338e27(0x162)](this,this['_actor'],_0x319b61))return![];}const _0x3500ce=VisuMZ['SkillLearnSystem']['RegExp'],_0x15b12d=_0x319b61[_0x338e27(0x19f)];if(_0x15b12d[_0x338e27(0x2de)](_0x3500ce[_0x338e27(0x342)])){const _0x67bd60=Number(RegExp['$1']);if(_0x67bd60>this[_0x338e27(0x199)][_0x338e27(0x2d5)])return![];}if(_0x15b12d[_0x338e27(0x2de)](_0x3500ce[_0x338e27(0x1cd)])){const _0x514c33=String(RegExp['$1'])[_0x338e27(0x2f8)](',')['map'](_0x4bde43=>_0x4bde43[_0x338e27(0x313)]());;for(const _0x1591d2 of _0x514c33){let _0x51d0e3=0x0;const _0x57c06d=/^\d+$/['test'](_0x1591d2);_0x57c06d?_0x51d0e3=Number(_0x1591d2):_0x51d0e3=DataManager[_0x338e27(0x1b2)](_0x1591d2);if(!this[_0x338e27(0x199)][_0x338e27(0x177)](_0x51d0e3))return![];}}if(_0x15b12d[_0x338e27(0x2de)](_0x3500ce[_0x338e27(0x364)])){const _0x214fb8=String(RegExp['$1'])[_0x338e27(0x2f8)](',')[_0x338e27(0x362)](_0x1066ef=>_0x1066ef[_0x338e27(0x313)]());;let _0x91ad4a=![];for(const _0x1341bc of _0x214fb8){let _0x3ce90f=0x0;const _0x49c124=/^\d+$/[_0x338e27(0x356)](_0x1341bc);_0x49c124?_0x3ce90f=Number(_0x1341bc):_0x3ce90f=DataManager[_0x338e27(0x1b2)](_0x1341bc);if(this[_0x338e27(0x199)][_0x338e27(0x177)](_0x3ce90f)){_0x91ad4a=!![];break;}}if(!_0x91ad4a)return![];}if(_0x15b12d[_0x338e27(0x2de)](_0x3500ce[_0x338e27(0x336)])){const _0xa5ec83=String(RegExp['$1'])[_0x338e27(0x2f8)](',')[_0x338e27(0x362)](_0x4d91f1=>Number(_0x4d91f1));for(const _0x58ce75 of _0xa5ec83){if(!$gameSwitches['value'](_0x58ce75))return![];}}if(_0x15b12d['match'](_0x3500ce[_0x338e27(0x348)])){const _0x521d1b=String(RegExp['$1'])[_0x338e27(0x2f8)](',')[_0x338e27(0x362)](_0x225cab=>Number(_0x225cab));let _0x3266bf=![];for(const _0x5b997b of _0x521d1b){if($gameSwitches[_0x338e27(0x17b)](_0x5b997b)){_0x3266bf=!![];break;}}if(!_0x3266bf)return![];}return _0x319b61;},VisuMZ[_0x21fdcc(0x1e3)][_0x21fdcc(0x17e)]=Window_SkillList[_0x21fdcc(0x325)]['isEnabled'],Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x319)]=function(_0x1c42e3){const _0x449256=_0x21fdcc;return this[_0x449256(0x199)]&&this[_0x449256(0x213)]()?this[_0x449256(0x2f3)](_0x1c42e3):VisuMZ[_0x449256(0x1e3)]['Window_SkillList_isEnabled'][_0x449256(0x162)](this,_0x1c42e3);},VisuMZ['SkillLearnSystem']['Window_SkillList_drawItem']=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x29b)],Window_SkillList['prototype']['drawItem']=function(_0x597c76){const _0x2524bd=_0x21fdcc;this['_skillLearnSystem_drawItemMode']=this[_0x2524bd(0x213)]();if(this[_0x2524bd(0x213)]()&&this[_0x2524bd(0x266)]()){const _0x3885c4=this[_0x2524bd(0x306)][_0x597c76];this[_0x2524bd(0x1d9)]=!_0x3885c4[_0x2524bd(0x256)];}VisuMZ[_0x2524bd(0x1e3)][_0x2524bd(0x260)][_0x2524bd(0x162)](this,_0x597c76),this[_0x2524bd(0x27e)]=![],this[_0x2524bd(0x213)]()&&this['separateSkillLearnByStypeID']()&&(this['_indentSkillLearnRect']=undefined);},VisuMZ['SkillLearnSystem']['Window_SkillList_itemLineRect']=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x24c)],Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x24c)]=function(_0x40e86c){const _0x56b8df=_0x21fdcc,_0x1265f9=VisuMZ['SkillLearnSystem'][_0x56b8df(0x37d)]['call'](this,_0x40e86c);if(this['_indentSkillLearnRect']){const _0x5da0ba=this['separateSkillLearnStypeIndent']();_0x1265f9['x']+=_0x5da0ba,_0x1265f9[_0x56b8df(0x2fb)]-=_0x5da0ba;}return _0x1265f9;},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x2f3)]=function(_0x301372){const _0x472f90=_0x21fdcc;if(!_0x301372)return![];if(_0x301372[_0x472f90(0x29e)][_0x472f90(0x310)]<=0x0)return![];if(_0x301372['name'][_0x472f90(0x2de)](/-----/i))return![];if(DataManager[_0x472f90(0x205)](_0x301372)){if(this[_0x472f90(0x199)][_0x472f90(0x177)](_0x301372['id']))return![];}if(Imported[_0x472f90(0x2f6)]&&DataManager['isState'](_0x301372)){if(this[_0x472f90(0x199)][_0x472f90(0x2fe)](_0x301372))return![];}if(this[_0x472f90(0x27e)]){if(!this[_0x472f90(0x199)]['meetRequirementsForSkillLearnSystem'](_0x301372))return![];return this[_0x472f90(0x199)][_0x472f90(0x207)](_0x301372);}return!![];},VisuMZ['SkillLearnSystem'][_0x21fdcc(0x22e)]=Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x30f)],Window_SkillList['prototype'][_0x21fdcc(0x30f)]=function(_0x98183,_0x31c224,_0x2bbffb,_0x4f6de5){const _0x2fbb78=_0x21fdcc;this[_0x2fbb78(0x213)]()?this['shouldDrawSkillLearnRequirements'](_0x98183)?this['drawSkillLearnRequirements'](_0x98183,_0x31c224,_0x2bbffb,_0x4f6de5):this[_0x2fbb78(0x387)](_0x98183,_0x31c224,_0x2bbffb,_0x4f6de5):VisuMZ[_0x2fbb78(0x1e3)][_0x2fbb78(0x22e)][_0x2fbb78(0x162)](this,_0x98183,_0x31c224,_0x2bbffb,_0x4f6de5);},Window_SkillList[_0x21fdcc(0x325)]['shouldDrawSkillLearnRequirements']=function(_0x4931ef){const _0xfafbca=_0x21fdcc;return this[_0xfafbca(0x199)]&&!this['_actor']['meetRequirementsForSkillLearnSystem'](_0x4931ef);},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x165)]=function(_0x44d3d7,_0x5e0812,_0x4e0ff4,_0x56f46c){const _0x653f01=_0x21fdcc,_0x2acff7=this['getSkillLearnRequirementText'](_0x44d3d7),_0x272471=this[_0x653f01(0x377)](_0x2acff7)['width'];_0x5e0812+=_0x56f46c-_0x272471,this[_0x653f01(0x1b3)](_0x2acff7,_0x5e0812,_0x4e0ff4);},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x270)]=function(_0x4c40e8){const _0x3bd549=_0x21fdcc,_0x4d85ce=VisuMZ[_0x3bd549(0x1e3)][_0x3bd549(0x339)][_0x3bd549(0x36a)],_0x42a278=TextManager[_0x3bd549(0x1e1)],_0xb64399=VisuMZ['SkillLearnSystem'][_0x3bd549(0x2a3)],_0x55f337=_0x4c40e8[_0x3bd549(0x19f)];let _0x52723e='',_0x3b1473='';const _0x2b8979=['LEVEL',_0x3bd549(0x33e),_0x3bd549(0x2a9),_0x3bd549(0x36c)];for(const _0x3d3398 of _0x2b8979){switch(_0x3d3398){case _0x3bd549(0x215):if(_0x55f337[_0x3bd549(0x2de)](_0xb64399[_0x3bd549(0x2cf)])){const _0xa317c2=Number(RegExp['$1']);_0x3b1473=TextManager[_0x3bd549(0x23c)][_0x3bd549(0x1ba)](_0xa317c2,TextManager[_0x3bd549(0x2d5)],TextManager[_0x3bd549(0x31f)]),_0x3b1473[_0x3bd549(0x310)]>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473);}break;case _0x3bd549(0x33e):if(_0x55f337['match'](_0xb64399[_0x3bd549(0x1f8)])){const _0x49cdcf=String(RegExp['$1'])['split'](',')[_0x3bd549(0x362)](_0x3b6a6f=>_0x3b6a6f[_0x3bd549(0x313)]());;for(const _0x4eefba of _0x49cdcf){let _0x1c469a=0x0;const _0x34b9f9=/^\d+$/[_0x3bd549(0x356)](_0x4eefba);_0x34b9f9?_0x1c469a=Number(_0x4eefba):_0x1c469a=DataManager[_0x3bd549(0x1b2)](_0x4eefba);if($dataSkills[_0x1c469a]){const _0x480ac3=$dataSkills[_0x1c469a];_0x3b1473=TextManager[_0x3bd549(0x1d0)][_0x3bd549(0x1ba)]('\x5cI[%1]'[_0x3bd549(0x1ba)](_0x480ac3[_0x3bd549(0x233)]),_0x480ac3[_0x3bd549(0x29e)]),_0x3b1473[_0x3bd549(0x310)]>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473);}}}if(_0x55f337[_0x3bd549(0x2de)](_0xb64399['LearnReqSkillsAny'])){const _0x60ab35=String(RegExp['$1'])[_0x3bd549(0x2f8)](',')[_0x3bd549(0x362)](_0x4a7067=>_0x4a7067[_0x3bd549(0x313)]());;for(const _0x1b4802 of _0x60ab35){let _0x521aee=0x0;const _0x425c82=/^\d+$/['test'](_0x1b4802);_0x425c82?_0x521aee=Number(_0x1b4802):_0x521aee=DataManager['getSkillIdWithName'](_0x1b4802);if($dataSkills[_0x521aee]){const _0xffb87c=$dataSkills[_0x521aee];_0x3b1473=TextManager[_0x3bd549(0x1d0)][_0x3bd549(0x1ba)]('\x5cI[%1]'[_0x3bd549(0x1ba)](_0xffb87c[_0x3bd549(0x233)]),_0xffb87c[_0x3bd549(0x29e)]),_0x3b1473['length']>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473);}}}break;case _0x3bd549(0x2a9):if(_0x55f337[_0x3bd549(0x2de)](_0xb64399[_0x3bd549(0x214)])){const _0x3eb2db=String(RegExp['$1'])['split'](',')['map'](_0x26b585=>_0x26b585[_0x3bd549(0x313)]());;for(const _0x55cd8b of _0x3eb2db){$dataSystem[_0x3bd549(0x2a7)][_0x55cd8b]&&(_0x3b1473=TextManager[_0x3bd549(0x357)]['format']($dataSystem[_0x3bd549(0x2a7)][_0x55cd8b]||''),_0x3b1473[_0x3bd549(0x310)]>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473));}}if(_0x55f337[_0x3bd549(0x2de)](_0xb64399[_0x3bd549(0x314)])){const _0x26e59d=String(RegExp['$1'])['split'](',')[_0x3bd549(0x362)](_0x23948d=>_0x23948d[_0x3bd549(0x313)]());;for(const _0x2d7e5a of _0x26e59d){$dataSystem[_0x3bd549(0x2a7)][_0x2d7e5a]&&(_0x3b1473=TextManager[_0x3bd549(0x357)][_0x3bd549(0x1ba)]($dataSystem[_0x3bd549(0x2a7)][_0x2d7e5a]||''),_0x3b1473[_0x3bd549(0x310)]>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473));}}break;case _0x3bd549(0x36c):const _0x1939a7=VisuMZ[_0x3bd549(0x1e3)][_0x3bd549(0x355)](_0x4c40e8,'jsLearnReqListTxt');VisuMZ[_0x3bd549(0x1e3)]['JS'][_0x1939a7]&&(_0x3b1473=VisuMZ[_0x3bd549(0x1e3)]['JS'][_0x1939a7][_0x3bd549(0x162)](this,this[_0x3bd549(0x199)],_0x4c40e8),_0x3b1473[_0x3bd549(0x310)]>0x0&&(_0x52723e!==''?_0x52723e=_0x42a278[_0x3bd549(0x1ba)](_0x52723e,_0x3b1473):_0x52723e=_0x3b1473));break;}}return _0x52723e=TextManager[_0x3bd549(0x30b)]['format'](_0x52723e),_0x52723e[_0x3bd549(0x313)]();},Window_SkillList[_0x21fdcc(0x325)][_0x21fdcc(0x387)]=function(_0x2aabda,_0x1c7c0c,_0x5f3278,_0x37ac82){const _0x402609=_0x21fdcc,_0x35cf4d=this['getSkillLearnCostText'](_0x2aabda),_0x25f709=this['textSizeEx'](_0x35cf4d)[_0x402609(0x2fb)];_0x1c7c0c+=_0x37ac82-_0x25f709,this[_0x402609(0x1b3)](_0x35cf4d,_0x1c7c0c,_0x5f3278);},Window_SkillList['prototype']['getSkillLearnCostText']=function(_0xc720f2){const _0x17da14=_0x21fdcc;if(this[_0x17da14(0x199)]){if(DataManager[_0x17da14(0x205)](_0xc720f2)&&this[_0x17da14(0x199)][_0x17da14(0x177)](_0xc720f2['id']))return TextManager[_0x17da14(0x2d7)];if(DataManager[_0x17da14(0x1c2)](_0xc720f2)&&this[_0x17da14(0x199)]['isLearnedEquippedPassive'](_0xc720f2))return TextManager[_0x17da14(0x2d7)];}const _0x43e039=VisuMZ['SkillLearnSystem'][_0x17da14(0x339)]['General'],_0x13e51b=TextManager[_0x17da14(0x1db)];let _0x10003b='';const _0x3df1f5=JsonEx[_0x17da14(0x167)](_0x43e039[_0x17da14(0x253)]);_0x3df1f5[_0x17da14(0x1dd)](_0x17da14(0x21f));for(const _0x4a44b2 of _0x3df1f5){if(!_0x4a44b2)continue;const _0x2580ea=this[_0x17da14(0x178)](_0xc720f2,_0x4a44b2)[_0x17da14(0x313)]();_0x2580ea[_0x17da14(0x310)]>0x0&&(_0x10003b!==''?_0x10003b=_0x13e51b['format'](_0x10003b,_0x2580ea):_0x10003b=_0x2580ea);}return _0x10003b['trim']();},Window_SkillList[_0x21fdcc(0x325)]['createSkillLearnCostText']=function(_0x45834d,_0x11ebe9){const _0x365fee=_0x21fdcc;let _0x5e0e96=0x0,_0x29aef8='',_0x36739c='';switch(_0x11ebe9[_0x365fee(0x33a)]()[_0x365fee(0x313)]()){case'AP':_0x5e0e96=DataManager['getSkillLearnAbilityPointCost'](_0x45834d);if(_0x5e0e96>0x0)return _0x29aef8=TextManager[_0x365fee(0x277)],_0x29aef8[_0x365fee(0x1ba)](_0x5e0e96,TextManager['abilityPointsAbbr'],'\x5cI[%1]'[_0x365fee(0x1ba)](ImageManager['abilityPointsIcon']),TextManager[_0x365fee(0x226)]);break;case'SP':_0x5e0e96=DataManager[_0x365fee(0x374)](_0x45834d);if(_0x5e0e96>0x0)return _0x29aef8=TextManager['skillPointsFmt'],_0x29aef8[_0x365fee(0x1ba)](_0x5e0e96,TextManager[_0x365fee(0x307)],'\x5cI[%1]'[_0x365fee(0x1ba)](ImageManager[_0x365fee(0x2ce)]),TextManager[_0x365fee(0x1cf)]);break;case _0x365fee(0x160):_0x5e0e96=DataManager[_0x365fee(0x24b)](_0x45834d),_0x29aef8=TextManager[_0x365fee(0x1bd)];for(const _0x1c20ab of _0x5e0e96){if(!_0x1c20ab)continue;const _0x54af83=$dataItems[_0x1c20ab['id']];if(!_0x54af83)continue;const _0x28e82b=_0x29aef8[_0x365fee(0x1ba)](_0x1c20ab[_0x365fee(0x19c)],_0x365fee(0x297)[_0x365fee(0x1ba)](_0x54af83['iconIndex']),_0x54af83[_0x365fee(0x29e)]);_0x36739c!==''?_0x36739c=TextManager[_0x365fee(0x1db)][_0x365fee(0x1ba)](_0x36739c,_0x28e82b):_0x36739c=_0x28e82b;}return _0x36739c;case _0x365fee(0x209):_0x5e0e96=DataManager['getSkillLearnWeaponCost'](_0x45834d),_0x29aef8=TextManager[_0x365fee(0x257)];for(const _0x29fa8c of _0x5e0e96){if(!_0x29fa8c)continue;const _0x41a9f0=$dataWeapons[_0x29fa8c['id']];if(!_0x41a9f0)continue;const _0x27d96d=_0x29aef8[_0x365fee(0x1ba)](_0x29fa8c['quantity'],_0x365fee(0x297)[_0x365fee(0x1ba)](_0x41a9f0[_0x365fee(0x233)]),_0x41a9f0[_0x365fee(0x29e)]);_0x36739c!==''?_0x36739c=TextManager[_0x365fee(0x1db)]['format'](_0x36739c,_0x27d96d):_0x36739c=_0x27d96d;}return _0x36739c;case _0x365fee(0x337):_0x5e0e96=DataManager[_0x365fee(0x318)](_0x45834d),_0x29aef8=TextManager[_0x365fee(0x361)];for(const _0x30276d of _0x5e0e96){if(!_0x30276d)continue;const _0x330687=$dataArmors[_0x30276d['id']];if(!_0x330687)continue;const _0x2bb12e=_0x29aef8['format'](_0x30276d[_0x365fee(0x19c)],_0x365fee(0x297)['format'](_0x330687[_0x365fee(0x233)]),_0x330687[_0x365fee(0x29e)]);_0x36739c!==''?_0x36739c=TextManager['skillLearnSeparationFmt'][_0x365fee(0x1ba)](_0x36739c,_0x2bb12e):_0x36739c=_0x2bb12e;}return _0x36739c;case'GOLD':_0x5e0e96=DataManager[_0x365fee(0x385)](_0x45834d);if(_0x5e0e96>0x0)return _0x29aef8=TextManager[_0x365fee(0x2f7)],_0x29aef8[_0x365fee(0x1ba)](_0x5e0e96,Imported[_0x365fee(0x1fd)]?'\x5cI[%1]'[_0x365fee(0x1ba)](VisuMZ['CoreEngine'][_0x365fee(0x339)][_0x365fee(0x1a5)][_0x365fee(0x1e2)]):TextManager['currencyUnit'],TextManager[_0x365fee(0x31c)]);break;case _0x365fee(0x36c):const _0x10e11c=VisuMZ[_0x365fee(0x1e3)]['createKeyJS'](_0x45834d,'jsLearnShowListTxt');if(VisuMZ['SkillLearnSystem']['JS'][_0x10e11c])return VisuMZ[_0x365fee(0x1e3)]['JS'][_0x10e11c][_0x365fee(0x162)](this,this[_0x365fee(0x199)],_0x45834d);break;case'CP':if(Imported[_0x365fee(0x1ff)]){_0x5e0e96=DataManager[_0x365fee(0x16f)](_0x45834d);if(_0x5e0e96>0x0)return _0x29aef8=TextManager[_0x365fee(0x2ff)],_0x29aef8[_0x365fee(0x1ba)](_0x5e0e96,TextManager[_0x365fee(0x1a7)],_0x365fee(0x297)['format'](ImageManager[_0x365fee(0x275)]),TextManager['classPointsFull']);break;}case'JP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x5e0e96=DataManager[_0x365fee(0x317)](_0x45834d);if(_0x5e0e96>0x0)return _0x29aef8=TextManager['jobPointsFmt'],_0x29aef8[_0x365fee(0x1ba)](_0x5e0e96,TextManager[_0x365fee(0x2da)],'\x5cI[%1]'['format'](ImageManager[_0x365fee(0x2ed)]),TextManager[_0x365fee(0x20b)]);break;}}return'';},Window_ActorCommand[_0x21fdcc(0x325)]['isSkillLearnMode']=function(){return![];};function Window_SkillLearnIngredients(){const _0x4a0b9d=_0x21fdcc;this[_0x4a0b9d(0x1f0)](...arguments);}Window_SkillLearnIngredients['prototype']=Object[_0x21fdcc(0x243)](Window_Base['prototype']),Window_SkillLearnIngredients['prototype'][_0x21fdcc(0x172)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x21fdcc(0x325)]['initialize']=function(_0x36e49e){const _0x24583e=_0x21fdcc;Window_Base[_0x24583e(0x325)][_0x24583e(0x1f0)][_0x24583e(0x162)](this,_0x36e49e);},Window_SkillLearnIngredients[_0x21fdcc(0x325)]['refresh']=function(){const _0x5e5050=_0x21fdcc;this['contents'][_0x5e5050(0x326)](),this['resetFontSettings'](),this['shouldDrawRequirements']()?this[_0x5e5050(0x1f2)]():this[_0x5e5050(0x324)]();},Window_SkillLearnIngredients['prototype'][_0x21fdcc(0x285)]=function(_0x17f7c4,_0x3028e8,_0x5ee9b4,_0x4fda39){const _0xcc16ba=_0x21fdcc,_0x4eb374=this[_0xcc16ba(0x377)](_0x17f7c4)['width'],_0x2d2a8b=_0x3028e8+Math['round']((_0x4fda39-_0x4eb374)/0x2);this['drawTextEx'](_0x17f7c4,_0x2d2a8b,_0x5ee9b4);},Window_SkillLearnIngredients[_0x21fdcc(0x325)][_0x21fdcc(0x18d)]=function(_0x3d82b2,_0x26cd2b,_0x40c5c6,_0x1053fd){const _0x22df2f=_0x21fdcc,_0x554c8c=this[_0x22df2f(0x377)](_0x3d82b2)[_0x22df2f(0x2fb)],_0x590bbb=_0x26cd2b+Math[_0x22df2f(0x2c4)](_0x1053fd-_0x554c8c);this['drawTextEx'](_0x3d82b2,_0x590bbb,_0x40c5c6);},Window_SkillLearnIngredients[_0x21fdcc(0x325)][_0x21fdcc(0x183)]=function(){const _0x5c9227=_0x21fdcc,_0x585aaf=SceneManager[_0x5c9227(0x27f)][_0x5c9227(0x2e5)](),_0x43325a=SceneManager[_0x5c9227(0x27f)]['user']();return _0x43325a&&!_0x43325a['meetRequirementsForSkillLearnSystem'](_0x585aaf);},Window_SkillLearnIngredients[_0x21fdcc(0x325)]['drawRequirements']=function(){const _0x50754d=_0x21fdcc,_0x4d0674=SceneManager[_0x50754d(0x27f)][_0x50754d(0x2e5)](),_0x1a5389=VisuMZ['SkillLearnSystem'][_0x50754d(0x2a3)],_0x4021bd=_0x4d0674['note'],_0x243dba=SceneManager['_scene'][_0x50754d(0x1ed)](),_0x354a3c=this['lineHeight'](),_0x275506=TextManager[_0x50754d(0x379)],_0x490bf7=TextManager[_0x50754d(0x2e2)];let _0x5ae247=0x0,_0x5ae5e1=0x0;const _0x3b70fa=_0x50754d(0x297)['format'](_0x4d0674[_0x50754d(0x233)]),_0x3a3fa8=TextManager[_0x50754d(0x2fc)]['format'](_0x3b70fa,_0x4d0674[_0x50754d(0x29e)]);this['drawTextExCenterAlign'](_0x3a3fa8,_0x5ae247,_0x5ae5e1,this['innerWidth']),_0x5ae5e1+=Math[_0x50754d(0x2c4)](_0x354a3c*1.5);let _0x4ff6b6='';if(_0x4021bd['match'](_0x1a5389[_0x50754d(0x2cf)])){const _0x1bad5e=Number(RegExp['$1']),_0x471fe2=TextManager[_0x50754d(0x251)][_0x50754d(0x1ba)](_0x1bad5e,TextManager[_0x50754d(0x2d5)],TextManager[_0x50754d(0x31f)]),_0x529ac5=_0x243dba[_0x50754d(0x2d5)]>=_0x1bad5e?_0x275506:_0x490bf7;_0x4ff6b6+=_0x529ac5[_0x50754d(0x1ba)](_0x471fe2)+'\x0a';}if(_0x4021bd[_0x50754d(0x2de)](_0x1a5389[_0x50754d(0x1f8)])){const _0x14bca6=String(RegExp['$1'])[_0x50754d(0x2f8)](',')[_0x50754d(0x362)](_0x391b2e=>_0x391b2e[_0x50754d(0x313)]());;for(const _0x2b1a24 of _0x14bca6){let _0x312037=0x0;const _0x94e0d1=/^\d+$/[_0x50754d(0x356)](_0x2b1a24);_0x94e0d1?_0x312037=Number(_0x2b1a24):_0x312037=DataManager[_0x50754d(0x1b2)](_0x2b1a24);const _0x2eb3f6=$dataSkills[_0x312037];if(_0x2eb3f6){const _0x39a9fa=TextManager['skillLearnReqListSkill'][_0x50754d(0x1ba)](_0x50754d(0x297)['format'](_0x2eb3f6[_0x50754d(0x233)]),_0x2eb3f6[_0x50754d(0x29e)]),_0x483d93=_0x243dba[_0x50754d(0x177)](_0x312037)?_0x275506:_0x490bf7;_0x4ff6b6+=_0x483d93[_0x50754d(0x1ba)](_0x39a9fa)+'\x0a';}}}if(_0x4021bd[_0x50754d(0x2de)](_0x1a5389[_0x50754d(0x2b3)])){const _0x3eb4d1=String(RegExp['$1'])[_0x50754d(0x2f8)](',')[_0x50754d(0x362)](_0x448034=>_0x448034[_0x50754d(0x313)]());;for(const _0x22182d of _0x3eb4d1){let _0x4eac75=0x0;const _0xfeb0e9=/^\d+$/['test'](_0x22182d);_0xfeb0e9?_0x4eac75=Number(_0x22182d):_0x4eac75=DataManager['getSkillIdWithName'](_0x22182d);const _0x569ee1=$dataSkills[_0x4eac75];if(_0x569ee1){const _0x4ed7f7=TextManager['skillLearnReqListSkill']['format'](_0x50754d(0x297)[_0x50754d(0x1ba)](_0x569ee1[_0x50754d(0x233)]),_0x569ee1[_0x50754d(0x29e)]),_0x4877d0=_0x243dba[_0x50754d(0x177)](_0x4eac75)?_0x275506:_0x490bf7;_0x4ff6b6+=_0x4877d0['format'](_0x4ed7f7)+'\x0a';}}}if(_0x4021bd[_0x50754d(0x2de)](_0x1a5389[_0x50754d(0x214)])){const _0x4f71b1=String(RegExp['$1'])[_0x50754d(0x2f8)](',')['map'](_0x2496fd=>Number(_0x2496fd));for(const _0x5280f9 of _0x4f71b1){const _0x30f048=$dataSystem['switches'][_0x5280f9],_0x5073c6=$gameSwitches['value'](_0x5280f9)?_0x275506:_0x490bf7;_0x4ff6b6+=_0x5073c6[_0x50754d(0x1ba)](_0x30f048)+'\x0a';}}if(_0x4021bd['match'](_0x1a5389[_0x50754d(0x314)])){const _0x448260=String(RegExp['$1'])[_0x50754d(0x2f8)](',')[_0x50754d(0x362)](_0x4de960=>Number(_0x4de960));for(const _0x13c10b of _0x448260){const _0x5ac5f4=$dataSystem[_0x50754d(0x2a7)][_0x13c10b],_0x2eb918=$gameSwitches[_0x50754d(0x17b)](_0x13c10b)?_0x275506:_0x490bf7;_0x4ff6b6+=_0x2eb918[_0x50754d(0x1ba)](_0x5ac5f4)+'\x0a';}}const _0x235dfa=VisuMZ[_0x50754d(0x1e3)][_0x50754d(0x355)](_0x4d0674,_0x50754d(0x27d));if(VisuMZ['SkillLearnSystem']['JS'][_0x235dfa]){const _0x4a6725=VisuMZ['SkillLearnSystem']['JS'][_0x235dfa][_0x50754d(0x162)](this,_0x243dba,_0x4d0674);_0x4ff6b6+=_0x4a6725+'\x0a';}this[_0x50754d(0x285)](_0x4ff6b6,_0x5ae247,_0x5ae5e1,this['innerWidth']);},Window_SkillLearnIngredients[_0x21fdcc(0x325)]['drawIngredients']=function(){const _0x1dda16=_0x21fdcc,_0xd6782f=SceneManager[_0x1dda16(0x27f)][_0x1dda16(0x2e5)](),_0x36fbd7=SceneManager[_0x1dda16(0x27f)]['user'](),_0x590bef=this[_0x1dda16(0x372)]();let _0xdc0f5=0x0,_0x280a17=0x0;const _0x4e0874=this[_0x1dda16(0x187)](),_0x584b69=Math['round'](this[_0x1dda16(0x1a1)]/0x2),_0x33b6da=Math['round'](this[_0x1dda16(0x1a1)]/0x4),_0x47bd4b=0x0,_0x1374c8=_0x584b69,_0x4add76=_0x584b69+_0x33b6da;let _0x3c7d93='\x5cI[%1]'[_0x1dda16(0x1ba)](_0xd6782f[_0x1dda16(0x233)]),_0x360288=_0xd6782f[_0x1dda16(0x29e)];Imported['VisuMZ_2_EquipPassiveSys']&&DataManager[_0x1dda16(0x1c2)](_0xd6782f)&&(_0x3c7d93=_0x1dda16(0x297)['format'](DataManager[_0x1dda16(0x2f5)](_0xd6782f)),_0x360288=DataManager[_0x1dda16(0x186)](_0xd6782f));let _0x38be0e=TextManager['skillLearningTitle'][_0x1dda16(0x1ba)](_0x3c7d93,_0x360288);this['drawTextExCenterAlign'](_0x38be0e,_0xdc0f5,_0x280a17,this[_0x1dda16(0x1a1)]),_0x280a17+=_0x4e0874,this['drawTextExCenterAlign'](TextManager[_0x1dda16(0x234)],_0x47bd4b,_0x280a17,_0x584b69),this[_0x1dda16(0x285)](TextManager[_0x1dda16(0x220)],_0x1374c8,_0x280a17,_0x33b6da),this['drawTextExCenterAlign'](TextManager[_0x1dda16(0x1e0)],_0x4add76,_0x280a17,_0x33b6da),_0x280a17+=_0x4e0874;const _0x54b6c8=_0x47bd4b+this['itemPadding']();for(const _0x538e44 of _0x590bef){this[_0x1dda16(0x193)]();let _0xa724f='',_0x587619=0x0,_0x25edee=0x0,_0x57b8b2='';switch(_0x538e44[_0x1dda16(0x33a)]()[_0x1dda16(0x313)]()){case'AP':_0x587619=DataManager[_0x1dda16(0x20e)](_0xd6782f);if(_0x587619<=0x0)continue;this[_0x1dda16(0x16c)](_0x587619,_0x1374c8,_0x280a17,_0x33b6da,_0x1dda16(0x37c)),_0xa724f=_0x1dda16(0x1a6)[_0x1dda16(0x1ba)](ImageManager['abilityPointsIcon'],TextManager[_0x1dda16(0x226)]),this[_0x1dda16(0x1b3)](_0xa724f,_0x54b6c8,_0x280a17),_0x25edee=_0x36fbd7[_0x1dda16(0x1fc)](),this[_0x1dda16(0x16c)](_0x25edee,_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)](),'right');break;case'SP':_0x587619=DataManager['getSkillLearnSkillPointCost'](_0xd6782f);if(_0x587619<=0x0)continue;this[_0x1dda16(0x192)](_0x587619,_0x1374c8,_0x280a17,_0x33b6da,_0x1dda16(0x37c)),_0xa724f=_0x1dda16(0x1a6)[_0x1dda16(0x1ba)](ImageManager[_0x1dda16(0x2ce)],TextManager[_0x1dda16(0x1cf)]),this[_0x1dda16(0x1b3)](_0xa724f,_0x54b6c8,_0x280a17),_0x25edee=_0x36fbd7[_0x1dda16(0x32a)](),this['drawSkillPoints'](_0x25edee,_0x4add76,_0x280a17,_0x33b6da-this['itemPadding'](),_0x1dda16(0x37c));break;case'GOLD':_0x587619=DataManager[_0x1dda16(0x385)](_0xd6782f);if(_0x587619<=0x0)continue;this[_0x1dda16(0x331)](_0x587619,TextManager[_0x1dda16(0x31c)],_0x1374c8,_0x280a17,_0x33b6da);const _0x537df1=Imported[_0x1dda16(0x1fd)]?_0x1dda16(0x297)['format'](VisuMZ[_0x1dda16(0x201)][_0x1dda16(0x339)][_0x1dda16(0x1a5)]['GoldIcon']):TextManager[_0x1dda16(0x31c)];_0xa724f=_0x1dda16(0x1dc)[_0x1dda16(0x1ba)](_0x537df1,TextManager[_0x1dda16(0x31c)]),this['drawTextEx'](_0xa724f,_0x54b6c8,_0x280a17),_0x25edee=$gameParty[_0x1dda16(0x2cd)](),this[_0x1dda16(0x331)](_0x25edee,TextManager['currencyUnit'],_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)]());break;case _0x1dda16(0x160):const _0x11f454=DataManager['getSkillLearnItemCost'](_0xd6782f);if(_0x11f454[_0x1dda16(0x310)]<=0x0)continue;for(const _0x1b1c16 of _0x11f454){if(!_0x1b1c16)continue;const _0x490ef6=$dataItems[_0x1b1c16['id']];_0x57b8b2=TextManager['skillLearnItemFmt'],this[_0x1dda16(0x27a)](_0x490ef6,_0x54b6c8,_0x280a17,_0x584b69-_0x54b6c8),_0xa724f=_0x57b8b2['format'](_0x1b1c16['quantity'],_0x1dda16(0x297)['format'](_0x490ef6['iconIndex']),_0x490ef6['name']),this[_0x1dda16(0x18d)](_0xa724f,_0x1374c8,_0x280a17,_0x33b6da),_0xa724f=_0x57b8b2[_0x1dda16(0x1ba)]($gameParty['numItems'](_0x490ef6),_0x1dda16(0x297)[_0x1dda16(0x1ba)](_0x490ef6[_0x1dda16(0x233)]),_0x490ef6[_0x1dda16(0x29e)]),this['drawTextExRightAlign'](_0xa724f,_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)]()),_0x280a17+=_0x4e0874;if(_0x280a17+_0x4e0874>this[_0x1dda16(0x1c8)])return;}continue;break;case'WEAPON':const _0x537374=DataManager[_0x1dda16(0x329)](_0xd6782f);if(_0x537374[_0x1dda16(0x310)]<=0x0)continue;for(const _0x14b161 of _0x537374){if(!_0x14b161)continue;const _0x37da03=$dataWeapons[_0x14b161['id']];_0x57b8b2=TextManager[_0x1dda16(0x257)],this[_0x1dda16(0x27a)](_0x37da03,_0x54b6c8,_0x280a17,_0x584b69-_0x54b6c8),_0xa724f=_0x57b8b2['format'](_0x14b161['quantity'],_0x1dda16(0x297)[_0x1dda16(0x1ba)](_0x37da03[_0x1dda16(0x233)]),_0x37da03[_0x1dda16(0x29e)]),this['drawTextExRightAlign'](_0xa724f,_0x1374c8,_0x280a17,_0x33b6da),_0xa724f=_0x57b8b2[_0x1dda16(0x1ba)]($gameParty[_0x1dda16(0x381)](_0x37da03),_0x1dda16(0x297)[_0x1dda16(0x1ba)](_0x37da03[_0x1dda16(0x233)]),_0x37da03['name']),this['drawTextExRightAlign'](_0xa724f,_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)]()),_0x280a17+=_0x4e0874;if(_0x280a17+_0x4e0874>this['innerHeight'])return;}continue;break;case'ARMOR':const _0x275cbf=DataManager[_0x1dda16(0x318)](_0xd6782f);if(_0x275cbf['length']<=0x0)continue;for(const _0x56c8e0 of _0x275cbf){if(!_0x56c8e0)continue;const _0x77c9d9=$dataArmors[_0x56c8e0['id']];_0x57b8b2=TextManager[_0x1dda16(0x361)],this[_0x1dda16(0x27a)](_0x77c9d9,_0x54b6c8,_0x280a17,_0x584b69-_0x54b6c8),_0xa724f=_0x57b8b2[_0x1dda16(0x1ba)](_0x56c8e0[_0x1dda16(0x19c)],_0x1dda16(0x297)[_0x1dda16(0x1ba)](_0x77c9d9[_0x1dda16(0x233)]),_0x77c9d9[_0x1dda16(0x29e)]),this['drawTextExRightAlign'](_0xa724f,_0x1374c8,_0x280a17,_0x33b6da),_0xa724f=_0x57b8b2['format']($gameParty[_0x1dda16(0x381)](_0x77c9d9),_0x1dda16(0x297)[_0x1dda16(0x1ba)](_0x77c9d9['iconIndex']),_0x77c9d9[_0x1dda16(0x29e)]),this[_0x1dda16(0x18d)](_0xa724f,_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)]()),_0x280a17+=_0x4e0874;if(_0x280a17+_0x4e0874>this[_0x1dda16(0x1c8)])return;}continue;break;case _0x1dda16(0x36c):const _0x3e3602=VisuMZ['SkillLearnSystem']['createKeyJS'](_0xd6782f,_0x1dda16(0x33f));if(VisuMZ[_0x1dda16(0x1e3)]['JS'][_0x3e3602])_0xa724f=VisuMZ[_0x1dda16(0x1e3)]['JS'][_0x3e3602][_0x1dda16(0x162)](this,_0x36fbd7,_0xd6782f),this[_0x1dda16(0x1b3)](_0xa724f,_0x54b6c8,_0x280a17);else continue;break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x587619=DataManager[_0x1dda16(0x16f)](_0xd6782f)||0x0;if(_0x587619<=0x0)continue;this[_0x1dda16(0x1f9)](_0x587619,_0x1374c8,_0x280a17,_0x33b6da,_0x1dda16(0x37c)),_0xa724f=_0x1dda16(0x1a6)[_0x1dda16(0x1ba)](ImageManager[_0x1dda16(0x275)],TextManager['classPointsFull']),this['drawTextEx'](_0xa724f,_0x54b6c8,_0x280a17),_0x25edee=_0x36fbd7[_0x1dda16(0x322)](),this['drawClassPoints'](_0x25edee,_0x4add76,_0x280a17,_0x33b6da-this[_0x1dda16(0x1f1)](),_0x1dda16(0x37c));}else continue;break;case'JP':if(Imported[_0x1dda16(0x1ff)]){_0x587619=DataManager[_0x1dda16(0x317)](_0xd6782f)||0x0;if(_0x587619<=0x0)continue;this['drawJobPoints'](_0x587619,_0x1374c8,_0x280a17,_0x33b6da,_0x1dda16(0x37c)),_0xa724f=_0x1dda16(0x1a6)['format'](ImageManager[_0x1dda16(0x2ed)],TextManager['jobPointsFull']),this[_0x1dda16(0x1b3)](_0xa724f,_0x54b6c8,_0x280a17),_0x25edee=_0x36fbd7[_0x1dda16(0x265)](),this['drawJobPoints'](_0x25edee,_0x4add76,_0x280a17,_0x33b6da-this['itemPadding'](),_0x1dda16(0x37c));}else continue;break;default:continue;}_0x280a17+=_0x4e0874;if(_0x280a17+_0x4e0874>this[_0x1dda16(0x1c8)])return;}},Window_SkillLearnIngredients[_0x21fdcc(0x325)][_0x21fdcc(0x372)]=function(){const _0x4c87d6=_0x21fdcc,_0xad1fcd=JsonEx[_0x4c87d6(0x167)](VisuMZ[_0x4c87d6(0x1e3)][_0x4c87d6(0x339)][_0x4c87d6(0x36a)][_0x4c87d6(0x253)]);return _0xad1fcd[_0x4c87d6(0x1dd)](_0x4c87d6(0x21f)),_0xad1fcd;},Window_SkillLearnIngredients[_0x21fdcc(0x325)][_0x21fdcc(0x25c)]=function(){return![];};function Window_SkillLearnConfirm(){const _0x3570ab=_0x21fdcc;this[_0x3570ab(0x1f0)](...arguments);}function _0x5b34(){const _0x58db84=['isActor','isMVAnimation','8rtyENc','ParseAllNotetags','onBattleStart','Window_SkillList_setActor','_indentSkillLearnRect','currentSymbol','skillLearnSeparationFmt','%1%2','push','EQUIP_PASSIVE_SYS','playOkSound','skillLearningOwned','skillLearnReqSeparatorFmt','GoldIcon','SkillLearnSystem','getArmorIdWithName','createConditionJS','displayRewardsSkillPoints','gainSkillPointsForMulticlasses','separateSkillLearnStypeIndent','AbilityPoints','onSkillLearnConfirmOk','6173650enkTzg','ClassChangeSystem','user','faceWidth','initAbilityPoints','initialize','itemPadding','drawRequirements','Item','_stypeId','_skillLearnBitmapSprite','createTextJS','jsLearnApCost','LearnReqSkillsAll','drawClassPoints','makeSkillLearnPassivesList','skillLearnCancelCmd','getAbilityPoints','VisuMZ_0_CoreEngine','indexOf','VisuMZ_2_ClassChangeSystem','addSkillLearnSystemCommand','CoreEngine','Game_Party_setupBattleTestMembers','PerAction','FadeSpeed','isSkill','skillPointsVisible','canPayForSkillLearnSystem','visible','WEAPON','gainSkillPoints','jobPointsFull','stypeId','Weapon-%1-%2','getSkillLearnAbilityPointCost','skillPointsFmt','SortByIDandPriorityUsingIDs','parameters','DetailWindow_BgType','isSkillLearnMode','LearnReqSwitchesAll','LEVEL','reduce','CancelCmd','processPayForSkillLearnSystem','magicSkills','skillLearnReqListSwitch','RequireFmt','replace','_rewards','loadSystem','Custom','skillLearningCost','cancel','exit','abilityPoints','ClassPoints','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','abilityPointsFull','NUM','ShowAnimations','initSkillLearnSystemMenuAccess','skillLearnConfirmCmd','destroySkillLearnSprite','alterSkillName','drawActorJobPoints','Window_SkillList_drawSkillCost','iconHeight','skillTypes','createSkillLearnAnimation','version','iconIndex','skillLearningName','skillLearnIcon','learnSkill','learnPicture','frames','Actor-%1-%2','height','SkillsStatesCore','skillLearnReqLevelFmt','skillLearnStypeCategoryCollapse','refreshSkillLearnSystem','applyItemSkillLearnSystemUserEffect','index','status','ConfirmWindow_BgType','create','createCostJS','_collapsedStypeIDs','passives','_itemWindow','setBackgroundType','Icon','isPlaying','getSkillLearnItemCost','itemLineRect','Scale','makeRewardsAbilityPoints','jsLearnReqListTxt','setSkillLearnSkillSpriteFrame','skillLearnReqListLevel','SeparateCollapseFmt','DisplayedCosts','ShowWindows','setStypeId','stypeCategory','skillLearnWeaponFmt','isConfirmEnabled','updateSkillLearnAnimation','gainRewardsSkillPoints','AbilityPointsGain','showVisualGoldDisplay','SystemShowSkillLearnSystemMenu','calcWindowHeight','ItemFmt','Window_SkillList_drawItem','16336989nBNOrh','onLoadBattleTestSkillLearnSystem','SkillPointsAdd','AbilityPointsAdd','getJobPoints','separateSkillLearnByStypeID','_skillLearnIconSprite','text','abilityPointsAbbr','loadPicture','add','removeChild','_skillPoints','_weaponIDs','116CqUzTQ','getSkillLearnRequirementText','addSkillPoints','onItemOk','registerCommand','Window_SkillList_setStypeId','classPointsIcon','makeItemList','abilityPointsFmt','updateSkillLearnSpriteOpacity','_SkillLearnSystem_preventLevelUpGain','drawItemName','Name','getWeaponIdWithName','jsLearnReqDetailTxt','_skillLearnSystem_drawItemMode','_scene','Scene_Boot_onDatabaseLoaded','changeClass','Scene_Skill_onItemOk','JSON','loseSkillPoints','drawTextExCenterAlign','StartingAbilityPoints','setupBattleTestMembers','earnedSkillPoints','jsLearnJpCost','Window_SkillList_makeItemList','makeSeparatedSkillLearnList','makeRewards','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','JobPoints','updateSkillLearnAnimationSprite','center','2668256bAmxVW','drawActorAbilityPoints','enemy','loseClassPoints','_armorIDs','Window_SkillList_includes','\x5cI[%1]','levelUp','members','Game_Actor_learnSkill','drawItem','LearnApCost','Points','name','EnemySkillPoints','optExtraExp','inBattle','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','RegExp','maxTurns','drawActorSkillPoints','Actors','switches','Ability','SWITCHES','parse','jsLearnReq','isAlive','Window_SkillList_maxCols','createActionJS','pop','_earnedAbilityPoints','_windowLayer','onSkillLearnItemOk','LearnReqSkillsAny','return\x200','finishSkillLearnAnimation','Class-%1-%2','Window','PerLevelUp','jsLearnShow','MenuAccess','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','skillLearningTitle','jsLearnShowListTxt','jsOnLearn','VisuMZ_1_SkillsStatesCore','IngredientName','earnedAbilityPoints','process_VisuMZ_SkillLearnSystem_JS','StartClassAbilityPoints','round','maxCols','shift','_skillIDs','AbilityPointsRate','floor','LearnArmorCost','UserGainAbilityPoints','left','gold','skillPointsIcon','LearnReqLevel','process_VisuMZ_SkillLearnSystem_Notetags','makeSkillLearnList','onDatabaseLoaded','SeparateByStypeID','makeCommandList','level','skillLearnStypeColor','skillLearnAlreadyLearned','Game_System_initialize','VictoryText','jobPointsAbbr','ParseSkillNotetags','opacity','abilityPointsVisible','match','Classes','Animation','Game_Action_applyItemUserEffect','skillLearnReqNotMet','traitObjects','subject','item','_earnedSkillPoints','scale','createSkillLearnConfirmWindow','resetTextColor','_statusWindow','skillPointsTotal','activate','jobPointsIcon','EnemyAbilityPoints','createSkillLearnSkillSprite','setSkillLearnSkillSpriteBitmap','ConfirmWindow_RectJS','abilityPointsIcon','isSkillLearnEnabled','skillLearn','getEquipPassiveIcon','VisuMZ_2_EquipPassiveSys','skillLearnGoldFmt','split','_learnPicture','Game_Actor_levelUp','width','skillLearnReqTitle','getItemIdWithName','isLearnedEquippedPassive','classPointsFmt','gainAbilityPointsForMulticlasses','filter','ARRAYFUNC','allMembers','update','EVAL','_data','skillPointsAbbr','show','setSkillLearnSkillSpritePosition','clamp','skillLearnReqHeaderFmt','_abilityPoints','1259274qztsXZ','makeRewardsSkillPoints','drawSkillCost','length','getClassIdWithName','IngredientCost','trim','LearnReqSwitchesAny','LearnJpCost','applySkillLearnSystemUserEffect','getSkillLearnJobPointCost','getSkillLearnArmorCost','isEnabled','onSkillLearnConfirmCancel','SkillPoints','currencyUnit','onSkillLearnCollapseStypeID','createVisibleJS','levelA','1786272NQIwRm','getSkillLearnSkillsFromClass','getClassPoints','LearnWeaponCost','drawIngredients','prototype','clear','select','Learned','getSkillLearnWeaponCost','getSkillPoints','ReqSkillFmt','applyItemUserEffect','ConfirmCmd','IconSet','_skillLearnAnimationSprite','levelUpGainSkillPoints','drawCurrencyValue','LearnSkillB','_skillLearnIngredientsWindow','TextFmt','_skillLearnAnimationPlaying','LearnShowSwitchesAll','ARMOR','abilityPointsRate','Settings','toUpperCase','_SkillLearnSystem_MenuAccess','ShowMenu','isBattleMember','SKILLS','jsLearnShowDetailTxt','LearnItemCost','LearnGoldCost','LearnShowLevel','processFinishSkillLearnAnimation','startSkillLearnAnimation','displayRewards','initSkillPoints','addWindow','LearnShowSwitchesAny','drawActorSimpleStatus','setSkillPoints','jsLearnCpCost','_skillLearnAnimationIDs','skillLearnStypeCategory','playSkillLearn','actor','StypeCategoryColor','displayRewardsAbilityPoints','makeSkillLearnStypeCategory','remove','itemWindowRect','createKeyJS','test','skillLearnReqSwitchFmt','Armor','playStaticSe','changePaintOpacity','max','BattleManager_displayRewards','skillLearnIngredientsWindowRect','DetailWindow_RectJS','meetRequirementsForSkillLearnSystem','addAbilityPoints','skillLearnArmorFmt','map','isFinishedSkillLearnAnimating','LearnShowSkillsAny','Game_Actor_setup','_classIDs','%1\x20[-]','IngredientOwned','bitmap','General','log','CUSTOM','drawActorClassPoints','iconWidth','anchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','skillLearnConfirmWindow','getSkillLearnDisplayedCosts','ReqSwitchFmt','getSkillLearnSkillPointCost','min','Item-%1-%2','textSizeEx','PerEnemy','skillLearnReqMet','gainMulticlassRewardPoints','LearnCpCost','right','Window_SkillList_itemLineRect','includes','AbilityPointsLose','StartClassSkillPoints','numItems','226155kCeaKj','currentClass','IconStypeMagic','getSkillLearnGoldCost','gainStartingAbilityPoints','drawSkillLearnCost','Parse_Notetags_CreateJS','ITEM','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','call','ConvertParams','Skill-%1-%2','drawSkillLearnRequirements','setSkillLearnSkillSpriteOpacity','makeDeepCopy','DefaultCost','MAX_SAFE_INTEGER','setAbilityPoints','smoothSelect','drawAbilityPoints','gainStartingSkillPoints','Enemy-%1-%2','getSkillLearnClassPointCost','gainAbilityPoints','loseItem','constructor','createSkillLearnIngredientsWindow','skillLearnCmd','Window_SkillType_makeCommandList','refresh','isLearnedSkill','createSkillLearnCostText','_skillLearnIconSpriteOpacitySpeed','_skillLearnConfirmWindow','value','opacitySpeed','Sound','Window_SkillList_isEnabled','addChild','6539154xrcWjF','setActor','sort','shouldDrawRequirements','abilityPointsTotal','SharedResource','getEquipPassiveName','lineHeight','Window_SkillStatus_refresh','gainRewardsAbilityPoints','<Color:\x20%1>','setupBattleTestMembersSkillLearnSystem','loseGold','drawTextExRightAlign','Scene_Skill_update','isTriggered','levelUpGainAbilityPoints','isCommandEnabled','drawSkillPoints','resetFontSettings','SkillPointsLose','RequirementTitle','learnEquippedPassive','HideLearned','applySkillPoints','_actor','ReqNotMetFmt','destroySkillLearnAnimationSprite','quantity','newPage','concat','note','addCommand','innerWidth','TargetGainSkillPoints','bigPicture','ARRAYSTR','Gold','\x5cI[%1]%2','classPointsAbbr','isSkillLearnSystemMenuAccess','skillPointsRate','autoRemovalTiming','LearnSkillA','Skills','Window_SkillList_alterSkillName','isPlaytest','_itemIDs','GoldFmt','command','getSkillIdWithName','drawTextEx','loseAbilityPoints','StatusWindowDrawJS','Scene_Skill_create','hide','Skill','AbbrText','format','setup','skillLearnStypeCategoryExpand','skillLearnItemFmt','Window_SkillList_initialize','setSkillLearnSystemMenuAccess','Game_Battler_onBattleStart','MaxResource','isState','BattleManager_makeRewards','SeparateCategoryFmt','colSpacing','createSkillLearnAnimationIDs','AliveActors','innerHeight','LearnCostBatch','ShowVictory','jsLearnSpCost','Weapon','LearnShowSkillsAll','skillPoints','skillPointsFull','skillLearnReqSkillFmt','toggleSkillLearnStypeCollapse','ceil'];_0x5b34=function(){return _0x58db84;};return _0x5b34();}Window_SkillLearnConfirm['prototype']=Object['create'](Window_HorzCommand[_0x21fdcc(0x325)]),Window_SkillLearnConfirm[_0x21fdcc(0x325)]['constructor']=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x21fdcc(0x325)][_0x21fdcc(0x1f0)]=function(_0x201651){const _0x316597=_0x21fdcc;Window_HorzCommand[_0x316597(0x325)]['initialize']['call'](this,_0x201651);},Window_SkillLearnConfirm[_0x21fdcc(0x325)][_0x21fdcc(0x2c5)]=function(){return 0x2;},Window_SkillLearnConfirm[_0x21fdcc(0x325)]['itemHeight']=function(){return this['innerHeight'];},Window_SkillLearnConfirm[_0x21fdcc(0x325)][_0x21fdcc(0x2d4)]=function(){const _0x2859e6=_0x21fdcc;this['addCommand'](TextManager[_0x2859e6(0x22a)],'ok',this[_0x2859e6(0x258)]()),this[_0x2859e6(0x1a0)](TextManager['skillLearnCancelCmd'],_0x2859e6(0x221));},Window_SkillLearnConfirm[_0x21fdcc(0x325)][_0x21fdcc(0x258)]=function(){const _0x439b7c=_0x21fdcc,_0x57e540=SceneManager[_0x439b7c(0x27f)];if(!_0x57e540)return![];const _0x7399fa=_0x57e540['user']();if(!_0x7399fa)return![];const _0x191b4d=_0x57e540[_0x439b7c(0x2e5)]();if(!_0x191b4d)return![];if(!_0x7399fa[_0x439b7c(0x35f)](_0x191b4d))return![];return _0x7399fa['canPayForSkillLearnSystem'](_0x191b4d);},Window_SkillLearnConfirm['prototype'][_0x21fdcc(0x29b)]=function(_0x1d88d5){const _0x3931d4=_0x21fdcc,_0x415d3e=this[_0x3931d4(0x24c)](_0x1d88d5);this[_0x3931d4(0x2e9)](),this[_0x3931d4(0x35a)](this[_0x3931d4(0x191)](_0x1d88d5));const _0x39e8d2=this['commandName'](_0x1d88d5),_0x4cd2b1=this[_0x3931d4(0x377)](_0x39e8d2)[_0x3931d4(0x2fb)];_0x415d3e['x']+=Math[_0x3931d4(0x2c4)]((_0x415d3e[_0x3931d4(0x2fb)]-_0x4cd2b1)/0x2),this[_0x3931d4(0x1b3)](_0x39e8d2,_0x415d3e['x'],_0x415d3e['y'],_0x4cd2b1);},Window_SkillLearnConfirm[_0x21fdcc(0x325)][_0x21fdcc(0x1df)]=function(){const _0x485f5c=_0x21fdcc;if(this[_0x485f5c(0x1da)]()==='ok'){}else Window_HorzCommand[_0x485f5c(0x325)]['playOkSound']['call'](this);};