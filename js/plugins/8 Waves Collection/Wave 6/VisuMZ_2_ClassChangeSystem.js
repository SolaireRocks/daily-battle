//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
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
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
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
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 *    depending on the primary class and how they're set up. To avoid
 *    conflicting with subclass resources and requirements, the Skill Learn
 *    System only makes it available for the primary class to learn skills from
 *    at a time. To learn skills from a subclass through the Skill Learn System
 *    the player would have to change to the subclass' class as the primary and
 *    then learn from it.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Class Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Job Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * 
 *   Select Same Subclass?:
 *   - Allow selecting the same subclass that's already equipped in that slot?
 *   - Mostly an aesthetic thing to allow/prevent the same subclass from being
 *     selected if that's what you want to control.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
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
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
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
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *     Play for Unassign?:
 *     - Play animation for unassigning a subclass?
 *     - Mostly an aesthetic thing to play/not play animations when unassigning
 *       a subclass if that's what you want to control.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
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
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
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
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
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
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
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
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon loading a save game that was made
 *    before Class Change System was installed. Fix made by Olivia.
 * 
 * Version 1.16: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameters added by Irina:
 * *** Parameters > General Settings > Select Same Subclass?
 * **** Allow selecting the same subclass that's already equipped in that slot?
 * **** Mostly an aesthetic thing to allow/prevent the same subclass from being
 *      selected if that's what you want to control.
 * *** Parameters > Window Settings > Confirm Animation ID > Play for Unassign?
 * **** Play animation for unassigning a subclass?
 * **** Mostly an aesthetic thing to play/not play animations when unassigning
 *      a subclass if that's what you want to control.
 * 
 * Version 1.15: December 14, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with the \Class[x] textcode from the VisuStella
 *    MZ message core. Fix made by Irina.
 * 
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
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
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
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
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 *
 * @param AllowSameSubclassSelect:eval
 * @text Select Same Subclass?
 * @parent Basics
 * @type boolean
 * @on Allow Selection
 * @off Disallow Selection
 * @desc Allow selecting the same subclass that's already equipped in that slot?
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
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
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
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
 * @default Equip2
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
 * @max 100
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
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param AllowClearClassAni:eval
 * @text Play for Unassign?
 * @parent ConfirmAnimationID:num
 * @type boolean
 * @on Play Animation
 * @off Don't Play
 * @desc Play animation for unassigning a subclass?
 * @default true
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
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
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
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
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
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
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
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
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
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
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
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
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
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
 * @desc Show how much CP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
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
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
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
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
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
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
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
 * @desc Show how much JP an actor has earned in battle during the
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
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
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
//=============================================================================

const _0x24e0d4=_0x556f;(function(_0x3225e5,_0x17d484){const _0x5c82f6=_0x556f,_0x465f87=_0x3225e5();while(!![]){try{const _0x357894=parseInt(_0x5c82f6(0xb5))/0x1+-parseInt(_0x5c82f6(0x258))/0x2*(parseInt(_0x5c82f6(0x126))/0x3)+parseInt(_0x5c82f6(0x22a))/0x4+-parseInt(_0x5c82f6(0x2a7))/0x5+parseInt(_0x5c82f6(0xb4))/0x6*(parseInt(_0x5c82f6(0xbf))/0x7)+parseInt(_0x5c82f6(0x206))/0x8+-parseInt(_0x5c82f6(0x190))/0x9*(parseInt(_0x5c82f6(0x203))/0xa);if(_0x357894===_0x17d484)break;else _0x465f87['push'](_0x465f87['shift']());}catch(_0x24f30d){_0x465f87['push'](_0x465f87['shift']());}}}(_0x5cea,0x238cc));var label=_0x24e0d4(0x219),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x24e0d4(0x240)](function(_0x45c7db){const _0x543ae4=_0x24e0d4;return _0x45c7db['status']&&_0x45c7db[_0x543ae4(0x1aa)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x24e0d4(0x2ba)]=VisuMZ[label][_0x24e0d4(0x2ba)]||{},VisuMZ[_0x24e0d4(0x164)]=function(_0x414e24,_0xaa65ce){const _0x5b8b80=_0x24e0d4;for(const _0x576b4c in _0xaa65ce){if(_0x576b4c['match'](/(.*):(.*)/i)){const _0x355d7c=String(RegExp['$1']),_0x4d199e=String(RegExp['$2'])[_0x5b8b80(0x35b)]()[_0x5b8b80(0x12d)]();let _0x96332d,_0x45a6d1,_0x120083;switch(_0x4d199e){case _0x5b8b80(0x25b):_0x96332d=_0xaa65ce[_0x576b4c]!==''?Number(_0xaa65ce[_0x576b4c]):0x0;break;case'ARRAYNUM':_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON['parse'](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1[_0x5b8b80(0x1f0)](_0x16857d=>Number(_0x16857d));break;case _0x5b8b80(0x200):_0x96332d=_0xaa65ce[_0x576b4c]!==''?eval(_0xaa65ce[_0x576b4c]):null;break;case'ARRAYEVAL':_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1['map'](_0x14f187=>eval(_0x14f187));break;case _0x5b8b80(0x2ae):_0x96332d=_0xaa65ce[_0x576b4c]!==''?JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c]):'';break;case'ARRAYJSON':_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1['map'](_0x1affc4=>JSON[_0x5b8b80(0x250)](_0x1affc4));break;case _0x5b8b80(0xbe):_0x96332d=_0xaa65ce[_0x576b4c]!==''?new Function(JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c])):new Function('return\x200');break;case _0x5b8b80(0x15a):_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON['parse'](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1[_0x5b8b80(0x1f0)](_0x5e35a7=>new Function(JSON[_0x5b8b80(0x250)](_0x5e35a7)));break;case _0x5b8b80(0x115):_0x96332d=_0xaa65ce[_0x576b4c]!==''?String(_0xaa65ce[_0x576b4c]):'';break;case'ARRAYSTR':_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON['parse'](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1['map'](_0x4cc25e=>String(_0x4cc25e));break;case _0x5b8b80(0x354):_0x120083=_0xaa65ce[_0x576b4c]!==''?JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c]):{},_0x96332d=VisuMZ[_0x5b8b80(0x164)]({},_0x120083);break;case _0x5b8b80(0x17c):_0x45a6d1=_0xaa65ce[_0x576b4c]!==''?JSON[_0x5b8b80(0x250)](_0xaa65ce[_0x576b4c]):[],_0x96332d=_0x45a6d1[_0x5b8b80(0x1f0)](_0x4ecac0=>VisuMZ[_0x5b8b80(0x164)]({},JSON['parse'](_0x4ecac0)));break;default:continue;}_0x414e24[_0x355d7c]=_0x96332d;}}return _0x414e24;},(_0x59e352=>{const _0x386d5a=_0x24e0d4,_0x3042fe=_0x59e352[_0x386d5a(0x2c5)];for(const _0x5120c8 of dependencies){if(!Imported[_0x5120c8]){alert(_0x386d5a(0x204)['format'](_0x3042fe,_0x5120c8)),SceneManager[_0x386d5a(0x264)]();break;}}const _0x5f24db=_0x59e352[_0x386d5a(0x1aa)];if(_0x5f24db[_0x386d5a(0xc3)](/\[Version[ ](.*?)\]/i)){const _0x466990=Number(RegExp['$1']);_0x466990!==VisuMZ[label]['version']&&(alert(_0x386d5a(0x191)['format'](_0x3042fe,_0x466990)),SceneManager[_0x386d5a(0x264)]());}if(_0x5f24db[_0x386d5a(0xc3)](/\[Tier[ ](\d+)\]/i)){const _0xf2f495=Number(RegExp['$1']);_0xf2f495<tier?(alert(_0x386d5a(0x26d)[_0x386d5a(0x369)](_0x3042fe,_0xf2f495,tier)),SceneManager[_0x386d5a(0x264)]()):tier=Math[_0x386d5a(0x1f1)](_0xf2f495,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x386d5a(0x2ba)],_0x59e352[_0x386d5a(0x29b)]);})(pluginData),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],_0x24e0d4(0x265),_0x2ed1a8=>{const _0x2c7146=_0x24e0d4;VisuMZ[_0x2c7146(0x164)](_0x2ed1a8,_0x2ed1a8);const _0x4374a5=_0x2ed1a8[_0x2c7146(0x333)][_0x2c7146(0x1f0)](_0x1ddd18=>$gameActors[_0x2c7146(0x334)](_0x1ddd18)),_0x4e5184=_0x2ed1a8['Classes'];for(const _0x48525a of _0x4374a5){if(!_0x48525a)continue;for(const _0x3826a0 of _0x4e5184){_0x48525a[_0x2c7146(0x192)](_0x3826a0);}}}),PluginManager['registerCommand'](pluginData[_0x24e0d4(0x2c5)],'ClassUnlockForGlobal',_0x54329e=>{const _0x32c6ff=_0x24e0d4;VisuMZ[_0x32c6ff(0x164)](_0x54329e,_0x54329e);const _0x3ba4c1=_0x54329e[_0x32c6ff(0x281)];for(const _0x523c8 of _0x3ba4c1){$gameParty['unlockClass'](_0x523c8);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],_0x24e0d4(0x2f2),_0x9b302e=>{const _0x172a4d=_0x24e0d4;VisuMZ['ConvertParams'](_0x9b302e,_0x9b302e);const _0x5304be=_0x9b302e['Actors'][_0x172a4d(0x1f0)](_0x325730=>$gameActors[_0x172a4d(0x334)](_0x325730)),_0x4d4c13=_0x9b302e[_0x172a4d(0x281)];for(const _0xda045e of _0x5304be){if(!_0xda045e)continue;for(const _0x19f521 of _0x4d4c13){_0xda045e[_0x172a4d(0x304)](_0x19f521);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x111),_0x238ac6=>{const _0x50143e=_0x24e0d4;VisuMZ[_0x50143e(0x164)](_0x238ac6,_0x238ac6);const _0x16fec5=_0x238ac6['Classes'];for(const _0x238147 of _0x16fec5){$gameParty[_0x50143e(0x304)](_0x238147);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],_0x24e0d4(0x174),_0x3ae9b5=>{const _0x42096c=_0x24e0d4;VisuMZ['ConvertParams'](_0x3ae9b5,_0x3ae9b5);const _0x6827d5=_0x3ae9b5[_0x42096c(0x333)]['map'](_0x153a87=>$gameActors[_0x42096c(0x334)](_0x153a87)),_0x5bccb4=_0x3ae9b5['Tiers'];for(const _0x5d702e of _0x6827d5){if(!_0x5d702e)continue;for(const _0xa56fe4 of _0x5bccb4){_0x5d702e[_0x42096c(0x1fd)](_0xa56fe4);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x145),_0x111bfb=>{const _0x992963=_0x24e0d4;VisuMZ[_0x992963(0x164)](_0x111bfb,_0x111bfb);const _0x57468c=_0x111bfb[_0x992963(0x333)][_0x992963(0x1f0)](_0x2910a8=>$gameActors[_0x992963(0x334)](_0x2910a8)),_0x45eebc=_0x111bfb[_0x992963(0x30c)];for(const _0x5170c of _0x57468c){if(!_0x5170c)continue;for(const _0x5c1aae of _0x45eebc){_0x5170c[_0x992963(0xdb)](_0x5c1aae);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],_0x24e0d4(0x105),_0x553c6a=>{const _0x266bf4=_0x24e0d4;VisuMZ[_0x266bf4(0x164)](_0x553c6a,_0x553c6a);const _0x26f25d=_0x553c6a[_0x266bf4(0x333)][_0x266bf4(0x1f0)](_0xef1c2e=>$gameActors[_0x266bf4(0x334)](_0xef1c2e)),_0x42ed29=_0x553c6a[_0x266bf4(0x21f)],_0x48cd5e=_0x553c6a[_0x266bf4(0x1da)];for(const _0x440439 of _0x26f25d){if(!_0x440439)continue;_0x440439[_0x266bf4(0xc7)](_0x48cd5e,_0x42ed29);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x268),_0x2eea8c=>{const _0x4bb0d4=_0x24e0d4;VisuMZ[_0x4bb0d4(0x164)](_0x2eea8c,_0x2eea8c);const _0x461696=_0x2eea8c[_0x4bb0d4(0x333)]['map'](_0x420d02=>$gameActors[_0x4bb0d4(0x334)](_0x420d02)),_0x3d7770=_0x2eea8c['Limit'];for(const _0x978c4e of _0x461696){if(!_0x978c4e)continue;_0x978c4e['addMulticlassTiers'](_0x3d7770);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],'MulticlassLowerLimit',_0x57f17e=>{const _0x3276d1=_0x24e0d4;VisuMZ['ConvertParams'](_0x57f17e,_0x57f17e);const _0x23a722=_0x57f17e[_0x3276d1(0x333)][_0x3276d1(0x1f0)](_0x4f804d=>$gameActors['actor'](_0x4f804d)),_0x5bef24=_0x57f17e[_0x3276d1(0x172)];for(const _0x586b40 of _0x23a722){if(!_0x586b40)continue;_0x586b40['loseMulticlassTiers'](_0x5bef24);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],_0x24e0d4(0x238),_0x814a9a=>{const _0x1c7be3=_0x24e0d4;VisuMZ[_0x1c7be3(0x164)](_0x814a9a,_0x814a9a);const _0x1b7eee=_0x814a9a['Actors'][_0x1c7be3(0x1f0)](_0x431ac6=>$gameActors['actor'](_0x431ac6)),_0x42d0cc=_0x814a9a['Limit'];for(const _0x34e3ff of _0x1b7eee){if(!_0x34e3ff)continue;_0x34e3ff[_0x1c7be3(0x15e)](_0x42d0cc);}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x12a),_0x23e8c8=>{const _0x3e04ff=_0x24e0d4;VisuMZ[_0x3e04ff(0x164)](_0x23e8c8,_0x23e8c8);const _0x3325c3=_0x23e8c8[_0x3e04ff(0x333)][_0x3e04ff(0x1f0)](_0x1d56c1=>$gameActors['actor'](_0x1d56c1)),_0x14362c=_0x23e8c8[_0x3e04ff(0x281)],_0x1afc72=_0x23e8c8[_0x3e04ff(0x171)];for(const _0x45a1f4 of _0x3325c3){if(!_0x45a1f4)continue;for(const _0x40fc5f of _0x14362c){_0x45a1f4[_0x3e04ff(0x1a7)](_0x1afc72,_0x40fc5f);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],'ClassPointsAdd',_0x42736f=>{const _0x5a7697=_0x24e0d4;VisuMZ[_0x5a7697(0x164)](_0x42736f,_0x42736f);const _0x212dd6=_0x42736f[_0x5a7697(0x333)][_0x5a7697(0x1f0)](_0x158262=>$gameActors['actor'](_0x158262)),_0x46fdf4=_0x42736f[_0x5a7697(0x281)],_0x3be9a6=_0x42736f['Points'];for(const _0x2fd8ff of _0x212dd6){if(!_0x2fd8ff)continue;for(const _0x455fd5 of _0x46fdf4){_0x2fd8ff['addClassPoints'](_0x3be9a6,_0x455fd5);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData['name'],'ClassPointsLose',_0x5468e1=>{const _0xc6977d=_0x24e0d4;VisuMZ[_0xc6977d(0x164)](_0x5468e1,_0x5468e1);const _0x260339=_0x5468e1[_0xc6977d(0x333)][_0xc6977d(0x1f0)](_0xcb0c6b=>$gameActors[_0xc6977d(0x334)](_0xcb0c6b)),_0x23799=_0x5468e1[_0xc6977d(0x281)],_0x9cc604=_0x5468e1['Points'];for(const _0x5ae543 of _0x260339){if(!_0x5ae543)continue;for(const _0x3dd07d of _0x23799){_0x5ae543['loseClassPoints'](_0x9cc604,_0x3dd07d);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],'ClassPointsSet',_0x1578fc=>{const _0x57e842=_0x24e0d4;VisuMZ['ConvertParams'](_0x1578fc,_0x1578fc);const _0x52f727=_0x1578fc[_0x57e842(0x333)]['map'](_0x366921=>$gameActors[_0x57e842(0x334)](_0x366921)),_0x4fe0e8=_0x1578fc['Classes'],_0x3f8c1a=_0x1578fc[_0x57e842(0x171)];for(const _0x34cd34 of _0x52f727){if(!_0x34cd34)continue;for(const _0x287eb0 of _0x4fe0e8){_0x34cd34['setClassPoints'](_0x3f8c1a,_0x287eb0);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x153),_0x129d1e=>{const _0x45a3f0=_0x24e0d4;VisuMZ['ConvertParams'](_0x129d1e,_0x129d1e);const _0x48dac5=_0x129d1e[_0x45a3f0(0x333)]['map'](_0xcc157e=>$gameActors[_0x45a3f0(0x334)](_0xcc157e)),_0x47aa5d=_0x129d1e['Classes'],_0x29860a=_0x129d1e[_0x45a3f0(0x171)];for(const _0x5b87cc of _0x48dac5){if(!_0x5b87cc)continue;for(const _0x578569 of _0x47aa5d){_0x5b87cc['gainJobPoints'](_0x29860a,_0x578569);}}}),PluginManager['registerCommand'](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0xdd),_0x1865fd=>{const _0x3b7817=_0x24e0d4;VisuMZ[_0x3b7817(0x164)](_0x1865fd,_0x1865fd);const _0x7ba589=_0x1865fd['Actors'][_0x3b7817(0x1f0)](_0x195301=>$gameActors[_0x3b7817(0x334)](_0x195301)),_0x40169c=_0x1865fd[_0x3b7817(0x281)],_0x3c131f=_0x1865fd[_0x3b7817(0x171)];for(const _0x959e63 of _0x7ba589){if(!_0x959e63)continue;for(const _0x2e0dd4 of _0x40169c){_0x959e63[_0x3b7817(0xb0)](_0x3c131f,_0x2e0dd4);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x1dc),_0x4ab0e0=>{const _0x405536=_0x24e0d4;VisuMZ[_0x405536(0x164)](_0x4ab0e0,_0x4ab0e0);const _0x429a4c=_0x4ab0e0['Actors'][_0x405536(0x1f0)](_0x3b185c=>$gameActors[_0x405536(0x334)](_0x3b185c)),_0x2d0469=_0x4ab0e0[_0x405536(0x281)],_0xcc99fe=_0x4ab0e0[_0x405536(0x171)];for(const _0x1ea2a3 of _0x429a4c){if(!_0x1ea2a3)continue;for(const _0x3a9795 of _0x2d0469){_0x1ea2a3['loseJobPoints'](_0xcc99fe,_0x3a9795);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x1d1),_0x39cfa5=>{const _0x332020=_0x24e0d4;VisuMZ[_0x332020(0x164)](_0x39cfa5,_0x39cfa5);const _0x40dd94=_0x39cfa5[_0x332020(0x333)][_0x332020(0x1f0)](_0x3b1a46=>$gameActors[_0x332020(0x334)](_0x3b1a46)),_0x49bce9=_0x39cfa5[_0x332020(0x281)],_0x28e639=_0x39cfa5[_0x332020(0x171)];for(const _0x2edb84 of _0x40dd94){if(!_0x2edb84)continue;for(const _0x3fa900 of _0x49bce9){_0x2edb84['setJobPoints'](_0x28e639,_0x3fa900);}}}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],'SystemEnableClassChangeSystemMenu',_0x320cdb=>{const _0x570a97=_0x24e0d4;VisuMZ[_0x570a97(0x164)](_0x320cdb,_0x320cdb),$gameSystem[_0x570a97(0x208)](_0x320cdb['Enable']);}),PluginManager[_0x24e0d4(0x1a4)](pluginData[_0x24e0d4(0x2c5)],_0x24e0d4(0x125),_0x315aa7=>{const _0x186144=_0x24e0d4;VisuMZ[_0x186144(0x164)](_0x315aa7,_0x315aa7),$gameSystem['setMainMenuClassChangeSystemVisible'](_0x315aa7['Show']);}),VisuMZ[_0x24e0d4(0x219)]['functionName']=function(){const _0x549785=_0x24e0d4;try{}catch(_0x2e004a){if($gameTemp[_0x549785(0x280)]())console['log'](_0x2e004a);}},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2f5)]=Scene_Boot[_0x24e0d4(0x13f)][_0x24e0d4(0x220)],Scene_Boot[_0x24e0d4(0x13f)][_0x24e0d4(0x220)]=function(){const _0x3e30ee=_0x24e0d4;VisuMZ[_0x3e30ee(0x219)][_0x3e30ee(0x2f5)][_0x3e30ee(0x146)](this),this[_0x3e30ee(0x18a)]();},Scene_Boot['prototype'][_0x24e0d4(0x18a)]=function(){const _0x1d1962=_0x24e0d4;this[_0x1d1962(0xbc)]();},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x36d)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},Scene_Boot[_0x24e0d4(0x13f)][_0x24e0d4(0xbc)]=function(){const _0x15e7ef=_0x24e0d4;if(VisuMZ[_0x15e7ef(0x21b)])return;for(const _0x24af4b of $dataActors){if(!_0x24af4b)continue;ImageManager[_0x15e7ef(0x272)](_0x24af4b);}for(const _0x36748b of $dataClasses){if(!_0x36748b)continue;VisuMZ['ClassChangeSystem'][_0x15e7ef(0x357)](_0x36748b);}},VisuMZ[_0x24e0d4(0x219)]['JS']={},VisuMZ['ClassChangeSystem']['createJS']=function(_0x2b70eb,_0x5cbf0f,_0x533715){const _0x34b626=_0x24e0d4,_0xa530ce=_0x2b70eb[_0x34b626(0x24a)];if(_0xa530ce[_0x34b626(0xc3)](_0x533715)){const _0x3e94c9=String(RegExp['$1']),_0x5b87cd=_0x34b626(0x2dd)[_0x34b626(0x369)](_0x3e94c9),_0x4ec477=VisuMZ[_0x34b626(0x219)]['createKeyJS'](_0x2b70eb,_0x5cbf0f);VisuMZ['ClassChangeSystem']['JS'][_0x4ec477]=new Function(_0x5b87cd);}},VisuMZ['ClassChangeSystem']['createKeyJS']=function(_0x2123cc,_0x3b7716){const _0x397f2d=_0x24e0d4;let _0x512460='';if($dataActors[_0x397f2d(0xe9)](_0x2123cc))_0x512460=_0x397f2d(0x23e)[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataClasses[_0x397f2d(0xe9)](_0x2123cc))_0x512460=_0x397f2d(0x1b5)[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataSkills['includes'](_0x2123cc))_0x512460=_0x397f2d(0xd3)[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataItems['includes'](_0x2123cc))_0x512460='Item-%1-%2'[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataWeapons['includes'](_0x2123cc))_0x512460='Weapon-%1-%2'[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataArmors[_0x397f2d(0xe9)](_0x2123cc))_0x512460=_0x397f2d(0x1f5)[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);if($dataEnemies[_0x397f2d(0xe9)](_0x2123cc))_0x512460='Enemy-%1-%2'['format'](_0x2123cc['id'],_0x3b7716);if($dataStates[_0x397f2d(0xe9)](_0x2123cc))_0x512460='State-%1-%2'[_0x397f2d(0x369)](_0x2123cc['id'],_0x3b7716);return _0x512460;},VisuMZ[_0x24e0d4(0x219)]['ParseActorNotetags']=VisuMZ['ParseActorNotetags'],VisuMZ[_0x24e0d4(0x147)]=function(_0x5f58dc){const _0x419f3f=_0x24e0d4;VisuMZ[_0x419f3f(0x219)][_0x419f3f(0x147)][_0x419f3f(0x146)](this,_0x5f58dc),ImageManager[_0x419f3f(0x272)](_0x5f58dc);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x20e)]=VisuMZ[_0x24e0d4(0x20e)],VisuMZ[_0x24e0d4(0x20e)]=function(_0x5e13a){const _0x271723=_0x24e0d4;VisuMZ['ClassChangeSystem'][_0x271723(0x20e)][_0x271723(0x146)](this,_0x5e13a),VisuMZ['ClassChangeSystem'][_0x271723(0x357)](_0x5e13a),VisuMZ[_0x271723(0x219)][_0x271723(0x2eb)](_0x5e13a);},VisuMZ[_0x24e0d4(0x219)]['Parse_Notetags_Basic']=function(_0x5259db){const _0xf5b133=_0x24e0d4;_0x5259db[_0xf5b133(0x12c)]=ImageManager[_0xf5b133(0xe1)]||0x0,_0x5259db['description']=TextManager[_0xf5b133(0x19b)]['format'](_0x5259db[_0xf5b133(0x2c5)]||'');const _0x5440e3=VisuMZ[_0xf5b133(0x219)][_0xf5b133(0x36d)],_0x3854b9=_0x5259db[_0xf5b133(0x24a)];_0x3854b9[_0xf5b133(0xc3)](_0x5440e3[_0xf5b133(0x124)])&&(_0x5259db[_0xf5b133(0x12c)]=Number(RegExp['$1'])),_0x3854b9['match'](_0x5440e3['ClassDescription'])&&(_0x5259db[_0xf5b133(0x1aa)]=String(RegExp['$1']));},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2eb)]=function(_0x36c1ec){const _0x492408=_0x24e0d4;_0x36c1ec[_0x492408(0x2c5)]['match'](/\\I\[(\d+)\]/i)&&(_0x36c1ec[_0x492408(0x12c)]=Number(RegExp['$1']));if(Imported[_0x492408(0x18e)]){if(VisuMZ[_0x492408(0x2d5)][_0x492408(0x2ba)]['UI'][_0x492408(0x230)]){const _0x4d7e6f=_0x492408(0x2f7);_0x36c1ec[_0x492408(0x2c5)]=_0x4d7e6f['format'](_0x36c1ec[_0x492408(0x12c)],_0x36c1ec['name']);}else _0x36c1ec['name']=_0x36c1ec[_0x492408(0x2c5)][_0x492408(0x21a)](/\x1bI\[(\d+)\]/gi,''),_0x36c1ec['name']=_0x36c1ec[_0x492408(0x2c5)][_0x492408(0x21a)](/\\I\[(\d+)\]/gi,'');}},DataManager['getActorUnlockedClasses']=function(_0x3a0586){const _0x433257=_0x24e0d4;if(!_0x3a0586)return[];let _0x159a30=[];return _0x159a30=_0x159a30[_0x433257(0x213)](_0x3a0586['getMulticlasses']()[_0x433257(0x1f0)](_0x795c25=>_0x795c25['id'])),_0x159a30=_0x159a30[_0x433257(0x213)](_0x3a0586[_0x433257(0x25a)]()),_0x159a30=_0x159a30[_0x433257(0x213)]($gameParty[_0x433257(0x25a)]()),_0x159a30=_0x159a30[_0x433257(0x213)](VisuMZ[_0x433257(0x219)]['Settings'][_0x433257(0x2bc)][_0x433257(0x182)]),_0x159a30=_0x159a30['filter']((_0x209667,_0x594e98,_0x2790b6)=>_0x2790b6[_0x433257(0x340)](_0x209667)===_0x594e98),_0x159a30['sort'](function(_0x567a5c,_0x20691d){return _0x567a5c-_0x20691d;}),_0x159a30[_0x433257(0x1f0)](_0x1f8cde=>$dataClasses[_0x1f8cde])['remove'](null);},DataManager['checkForNewUnlockedClasses']=function(_0x39ae79){const _0x16e294=_0x24e0d4,_0x5ba55d=[],_0x401aec=DataManager[_0x16e294(0x121)](_0x39ae79);for(const _0x11db4f of $dataClasses){if(!_0x11db4f)continue;if(_0x401aec[_0x16e294(0xe9)](_0x11db4f))continue;this[_0x16e294(0x2ac)](_0x39ae79,_0x11db4f)&&_0x5ba55d['push'](_0x11db4f['id']);}return _0x5ba55d;},DataManager['isClassAutoUnlockRequirementsMet']=function(_0x273a62,_0x44b2e4){const _0x277f52=_0x24e0d4;if(!_0x273a62)return![];if(!_0x44b2e4)return![];const _0x1c505a=VisuMZ[_0x277f52(0x219)][_0x277f52(0x36d)],_0x3de6f8=_0x44b2e4['note'];if(_0x3de6f8[_0x277f52(0xc3)](_0x1c505a[_0x277f52(0x26b)])){const _0x546963=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x5ddc37 of _0x546963){let _0x431f81=0x0;if(_0x5ddc37[_0x277f52(0xc3)](/(.*):[ ](.*)/i)){const _0x41bda3=String(RegExp['$1']),_0x134717=String(RegExp['$2']);if(_0x41bda3[_0x277f52(0xc3)](/CLASS[ ](\d+)/i))_0x431f81=Number(RegExp['$1']);else{if(_0x41bda3['match'](/CLASS[ ](.*)/i))_0x431f81=this[_0x277f52(0x195)](RegExp['$1']);else{if(_0x41bda3[_0x277f52(0xc3)](/\b(?:AP|CP|JP|SP)\b/i)){const _0xd6e41b=_0x41bda3['toUpperCase']()[_0x277f52(0x12d)](),_0x55a3a1=Number(_0x134717)||0x0;if(Imported[_0x277f52(0x10c)]){if(_0xd6e41b==='AP'){const _0x5103bb=_0x273a62[_0x277f52(0x319)]();if(_0x5103bb<_0x55a3a1)return![];}else{if(_0xd6e41b==='SP'){const _0x33fc98=_0x273a62[_0x277f52(0x320)]();if(_0x33fc98<_0x55a3a1)return![];}}}if(Imported[_0x277f52(0x34f)]){if(_0xd6e41b==='CP'){const _0x311651=_0x273a62[_0x277f52(0xb2)]();if(_0x311651<_0x55a3a1)return![];}else{if(_0xd6e41b==='JP'){const _0x4395df=_0x273a62[_0x277f52(0x2d1)]();if(_0x4395df<_0x55a3a1)return![];}}}}}}if(_0x134717[_0x277f52(0xc3)](/LEVEL[ ](\d+)/i)){const _0x1b59e3=Number(RegExp['$1']);if(_0x273a62[_0x277f52(0x16a)](_0x431f81)<_0x1b59e3)return![];}else{if(_0x134717[_0x277f52(0xc3)](/(\d+)[ ]CP/i)){const _0x340786=Number(RegExp['$1']);if(_0x273a62['getClassPoints'](_0x431f81)<_0x340786)return![];}else{if(_0x134717['match'](/(\d+)[ ]JP/i)){const _0x527293=Number(RegExp['$1']);if(_0x273a62[_0x277f52(0x2d1)](_0x431f81)<_0x527293)return![];}else{if(_0x134717[_0x277f52(0xc3)](/(\d+)[ ]AP/i)){if(!Imported[_0x277f52(0x10c)])continue;const _0x5c93f7=Number(RegExp['$1']);if(_0x273a62[_0x277f52(0x319)](_0x431f81)<_0x5c93f7)return![];}else{if(_0x134717['match'](/(\d+)[ ]SP/i)){const _0x43b320=Number(RegExp['$1']);if(_0x273a62['getSkillPoints'](_0x431f81)<_0x43b320)return![];}}}}}}}return!![];}return![];},DataManager['getClassChangeTiersOnly']=function(_0x4a8fcf){const _0xc491a1=_0x24e0d4;if(!_0x4a8fcf)return[];const _0x18d399=VisuMZ[_0xc491a1(0x219)][_0xc491a1(0x36d)],_0x20a12f=_0x4a8fcf['note'];let _0x133309=[];const _0x25add3=_0x20a12f['match'](_0x18d399[_0xc491a1(0x1f8)]);if(_0x25add3){for(const _0x40a3ce of _0x25add3){if(!_0x40a3ce)continue;_0x40a3ce['match'](_0x18d399[_0xc491a1(0x1f8)]);const _0x5a2190=String(RegExp['$1'])[_0xc491a1(0x143)](',')[_0xc491a1(0x1f0)](_0x2a765e=>Number(_0x2a765e))['remove'](null)[_0xc491a1(0xb1)](undefined)['remove'](NaN);_0x133309=_0x133309[_0xc491a1(0x213)](_0x5a2190);}return _0x133309;}else{const _0x57a2eb=VisuMZ[_0xc491a1(0x219)][_0xc491a1(0x2ba)][_0xc491a1(0x2d3)][_0xc491a1(0x1d9)];return Array[_0xc491a1(0x349)]({'length':_0x57a2eb},(_0x2350b8,_0x55851a)=>_0x55851a+0x1);}},DataManager['getClassIdWithName']=function(_0x4a4886){const _0x10aafc=_0x24e0d4;_0x4a4886=_0x4a4886[_0x10aafc(0x35b)]()[_0x10aafc(0x12d)](),this[_0x10aafc(0xea)]=this[_0x10aafc(0xea)]||{};if(this['_classIDs'][_0x4a4886])return this['_classIDs'][_0x4a4886];for(const _0x1bf8de of $dataClasses){if(!_0x1bf8de)continue;let _0x20826c=_0x1bf8de[_0x10aafc(0x2c5)];_0x20826c=_0x20826c[_0x10aafc(0x21a)](/\x1I\[(\d+)\]/gi,''),_0x20826c=_0x20826c[_0x10aafc(0x21a)](/\\I\[(\d+)\]/gi,''),this[_0x10aafc(0xea)][_0x20826c[_0x10aafc(0x35b)]()[_0x10aafc(0x12d)]()]=_0x1bf8de['id'];}return this['_classIDs'][_0x4a4886]||0x0;},ImageManager[_0x24e0d4(0x221)]=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x1e8)][_0x24e0d4(0x324)],ImageManager['jobPointsIcon']=VisuMZ[_0x24e0d4(0x219)]['Settings']['JobPoints']['Icon'],ImageManager['classIcon']=VisuMZ['ClassChangeSystem']['Settings'][_0x24e0d4(0x2bc)]['Icon'],ImageManager[_0x24e0d4(0x2f9)]={},ImageManager['actorClassFaceIndex']={},ImageManager[_0x24e0d4(0x1b8)]={},ImageManager['actorClassCharacterIndex']={},ImageManager[_0x24e0d4(0x22c)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x24e0d4(0x135)]={},ImageManager[_0x24e0d4(0x272)]=function(_0x1528a3){const _0x59461c=_0x24e0d4;if(!_0x1528a3)return;const _0x32b8a9=VisuMZ[_0x59461c(0x219)][_0x59461c(0x36d)],_0x14bb07=_0x1528a3[_0x59461c(0x24a)],_0x368966=_0x1528a3['id'],_0x3fae0b=_0x14bb07[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x161)]);if(_0x3fae0b)for(const _0x4971ec of _0x3fae0b){if(!_0x4971ec)continue;_0x4971ec[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x161)]);const _0x4cf179=String(RegExp['$1']),_0x4f4108=String(RegExp['$2'])[_0x59461c(0x12d)](),_0x3f48ff=Number(RegExp['$3']);let _0x24e473=0x0;if(_0x4cf179[_0x59461c(0xc3)](/CLASS[ ](\d+)/i))_0x24e473=Number(RegExp['$1']);else _0x4cf179['match'](/CLASS[ ](.*)/i)?_0x24e473=DataManager[_0x59461c(0x195)](RegExp['$1']):_0x24e473=DataManager[_0x59461c(0x195)](_0x4cf179);if(_0x24e473>0x0){const _0x45f28f='Actor-%1-Class-%2'[_0x59461c(0x369)](_0x368966,_0x24e473);ImageManager[_0x59461c(0x2f9)][_0x45f28f]=_0x4f4108,ImageManager[_0x59461c(0xdf)][_0x45f28f]=_0x3f48ff;}}const _0x50a807=_0x14bb07['match'](_0x32b8a9['ClassCharaName']);if(_0x50a807)for(const _0x32c9f7 of _0x50a807){if(!_0x32c9f7)continue;_0x32c9f7[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x197)]);const _0x2cc5f4=String(RegExp['$1']),_0x165553=String(RegExp['$2'])[_0x59461c(0x12d)](),_0x8f16fc=Number(RegExp['$3']);let _0x25ae4e=0x0;if(_0x2cc5f4['match'](/CLASS[ ](\d+)/i))_0x25ae4e=Number(RegExp['$1']);else _0x2cc5f4['match'](/CLASS[ ](.*)/i)?_0x25ae4e=DataManager[_0x59461c(0x195)](RegExp['$1']):_0x25ae4e=DataManager[_0x59461c(0x195)](_0x2cc5f4);if(_0x25ae4e>0x0){const _0x28b0b3=_0x59461c(0x102)[_0x59461c(0x369)](_0x368966,_0x25ae4e);ImageManager[_0x59461c(0x1b8)][_0x28b0b3]=_0x165553,ImageManager[_0x59461c(0x116)][_0x28b0b3]=_0x8f16fc;}}const _0xcea63=_0x14bb07['match'](_0x32b8a9[_0x59461c(0x2f8)]);if(_0xcea63)for(const _0x47f7ee of _0xcea63){if(!_0x47f7ee)continue;_0x47f7ee[_0x59461c(0xc3)](_0x32b8a9['ClassBattlerName']);const _0x172b5b=String(RegExp['$1']),_0x3dcd9b=String(RegExp['$2'])[_0x59461c(0x12d)]();let _0x58aac5=0x0;if(_0x172b5b[_0x59461c(0xc3)](/CLASS[ ](\d+)/i))_0x58aac5=Number(RegExp['$1']);else _0x172b5b[_0x59461c(0xc3)](/CLASS[ ](.*)/i)?_0x58aac5=DataManager[_0x59461c(0x195)](RegExp['$1']):_0x58aac5=DataManager[_0x59461c(0x195)](_0x172b5b);if(_0x58aac5>0x0){const _0x47d243=_0x59461c(0x102)[_0x59461c(0x369)](_0x368966,_0x58aac5);ImageManager['actorClassBattlerName'][_0x47d243]=_0x3dcd9b;}}const _0x42bd38=_0x14bb07[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x1e9)]);if(_0x42bd38)for(const _0x4c1d10 of _0x42bd38){if(!_0x4c1d10)continue;_0x4c1d10[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x1e9)]);const _0x3d58c5=String(RegExp['$1']),_0x1a3668=String(RegExp['$2'])['trim']();let _0x3a82e3=0x0;if(_0x3d58c5['match'](/CLASS[ ](\d+)/i))_0x3a82e3=Number(RegExp['$1']);else _0x3d58c5[_0x59461c(0xc3)](/CLASS[ ](.*)/i)?_0x3a82e3=DataManager['getClassIdWithName'](RegExp['$1']):_0x3a82e3=DataManager[_0x59461c(0x195)](_0x3d58c5);if(_0x3a82e3>0x0){const _0x4a6ed1='Actor-%1-Class-%2'[_0x59461c(0x369)](_0x368966,_0x3a82e3);ImageManager[_0x59461c(0xf9)][_0x4a6ed1]=_0x1a3668;}}const _0x527f85=_0x14bb07[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x2b8)]);if(_0x527f85)for(const _0x19f529 of _0x527f85){if(!_0x19f529)continue;_0x19f529[_0x59461c(0xc3)](_0x32b8a9[_0x59461c(0x2b8)]);const _0x39d6c7=String(RegExp['$1']),_0x7724db=String(RegExp['$2'])[_0x59461c(0x12d)]();let _0x525fd5=0x0;if(_0x39d6c7[_0x59461c(0xc3)](/CLASS[ ](\d+)/i))_0x525fd5=Number(RegExp['$1']);else _0x39d6c7[_0x59461c(0xc3)](/CLASS[ ](.*)/i)?_0x525fd5=DataManager[_0x59461c(0x195)](RegExp['$1']):_0x525fd5=DataManager[_0x59461c(0x195)](_0x39d6c7);if(_0x525fd5>0x0){const _0x35f4c8=_0x59461c(0x102)['format'](_0x368966,_0x525fd5);ImageManager[_0x59461c(0x135)][_0x35f4c8]=_0x7724db;}}},ImageManager['getActorClassFaceName']=function(_0x536847){const _0x3ea211=_0x24e0d4;if(!_0x536847)return'';const _0x2b0586=_0x3ea211(0x102)[_0x3ea211(0x369)](_0x536847[_0x3ea211(0x166)](),_0x536847[_0x3ea211(0x1d0)]()['id']);return ImageManager[_0x3ea211(0x2f9)][_0x2b0586]??'';},ImageManager['getActorClassFaceIndex']=function(_0x48bf67){const _0x581833=_0x24e0d4;if(!_0x48bf67)return undefined;const _0x30728a=_0x581833(0x102)['format'](_0x48bf67[_0x581833(0x166)](),_0x48bf67[_0x581833(0x1d0)]()['id']);return ImageManager[_0x581833(0xdf)][_0x30728a]??undefined;},ImageManager[_0x24e0d4(0x31e)]=function(_0x218c63){const _0x1f0a3f=_0x24e0d4;if(!_0x218c63)return'';const _0x1ad28a='Actor-%1-Class-%2'[_0x1f0a3f(0x369)](_0x218c63['actorId'](),_0x218c63[_0x1f0a3f(0x1d0)]()['id']);return ImageManager[_0x1f0a3f(0x1b8)][_0x1ad28a]??'';},ImageManager[_0x24e0d4(0x234)]=function(_0x446c89){const _0x7b81b4=_0x24e0d4;if(!_0x446c89)return undefined;const _0x5122ad='Actor-%1-Class-%2'[_0x7b81b4(0x369)](_0x446c89[_0x7b81b4(0x166)](),_0x446c89[_0x7b81b4(0x1d0)]()['id']);return ImageManager[_0x7b81b4(0x116)][_0x5122ad]??undefined;},ImageManager[_0x24e0d4(0x1c6)]=function(_0x25494e){const _0x39a648=_0x24e0d4;if(!_0x25494e)return'';const _0x10658b=_0x39a648(0x102)[_0x39a648(0x369)](_0x25494e[_0x39a648(0x166)](),_0x25494e[_0x39a648(0x1d0)]()['id']);return ImageManager['actorClassBattlerName'][_0x10658b]??'';},ImageManager[_0x24e0d4(0xe4)]=function(_0x5a95c1){const _0x4b518f=_0x24e0d4;if(!_0x5a95c1)return'';const _0x3d63b4=_0x4b518f(0x102)[_0x4b518f(0x369)](_0x5a95c1[_0x4b518f(0x166)](),_0x5a95c1[_0x4b518f(0x1d0)]()['id']);return ImageManager['actorClassMenuPortrait'][_0x3d63b4]??'';},ImageManager[_0x24e0d4(0x341)]=function(_0x86ce59){const _0x148085=_0x24e0d4;if(!_0x86ce59)return'';const _0x521669='Actor-%1-Class-%2'[_0x148085(0x369)](_0x86ce59[_0x148085(0x166)](),_0x86ce59['currentClass']()['id']);return ImageManager[_0x148085(0x135)][_0x521669]??'';},SoundManager['playClassChange']=function(_0x4afe3a){const _0x330d59=_0x24e0d4;AudioManager[_0x330d59(0x261)](VisuMZ['ClassChangeSystem']['Settings'][_0x330d59(0x127)]);},TextManager[_0x24e0d4(0xaf)]=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)]['MainMenu'][_0x24e0d4(0x2c3)],TextManager[_0x24e0d4(0x16f)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0x1e8)][_0x24e0d4(0x23d)],TextManager['classPointsAbbr']=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x1e8)][_0x24e0d4(0x1a8)],TextManager[_0x24e0d4(0x36b)]=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x1e8)][_0x24e0d4(0x13e)],TextManager[_0x24e0d4(0x18b)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0xd8)][_0x24e0d4(0x23d)],TextManager['jobPointsAbbr']=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0xd8)][_0x24e0d4(0x1a8)],TextManager['jobPointsFmt']=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0xd8)]['TextFmt'],TextManager['classDescription']=VisuMZ[_0x24e0d4(0x219)]['Settings']['General'][_0x24e0d4(0x1cb)],TextManager[_0x24e0d4(0xc6)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0x273)][_0x24e0d4(0x33a)],TextManager['classChange_multiclass_ShiftHelp']=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)]['Window'][_0x24e0d4(0x21c)],TextManager[_0x24e0d4(0x237)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0x273)][_0x24e0d4(0x1b9)],TextManager['classChange_multiclass_remove_help']=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x273)][_0x24e0d4(0xec)],ColorManager[_0x24e0d4(0x28c)]=function(_0x32fce8){const _0x34efda=_0x24e0d4;return _0x32fce8=String(_0x32fce8),_0x32fce8[_0x34efda(0xc3)](/#(.*)/i)?_0x34efda(0x2ea)['format'](String(RegExp['$1'])):this[_0x34efda(0x297)](Number(_0x32fce8));},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x110)]=BattleManager[_0x24e0d4(0x27e)],BattleManager[_0x24e0d4(0x27e)]=function(){const _0x4a0edf=_0x24e0d4;VisuMZ[_0x4a0edf(0x219)]['BattleManager_makeRewards'][_0x4a0edf(0x146)](this),this['makeRewardsClassPoints'](),this[_0x4a0edf(0x1fe)](),this[_0x4a0edf(0x2d7)](),this[_0x4a0edf(0xcb)]();},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x25d)]=BattleManager[_0x24e0d4(0x33b)],BattleManager[_0x24e0d4(0x33b)]=function(){const _0x5e60c2=_0x24e0d4;VisuMZ[_0x5e60c2(0x219)]['BattleManager_displayRewards'][_0x5e60c2(0x146)](this),this[_0x5e60c2(0x327)](),this[_0x5e60c2(0x205)]();},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0xed)]=BattleManager[_0x24e0d4(0x225)],BattleManager['gainExp']=function(){const _0x409760=_0x24e0d4;VisuMZ[_0x409760(0x219)][_0x409760(0xed)][_0x409760(0x146)](this);const _0x50e2cd=this[_0x409760(0x28a)][_0x409760(0x1ac)];for(const _0x1033a2 of $gameParty[_0x409760(0x34d)]()){_0x1033a2[_0x409760(0x2e2)](_0x50e2cd);}},VisuMZ['ClassChangeSystem']['BattleManager_endBattle']=BattleManager['endBattle'],BattleManager[_0x24e0d4(0x2c8)]=function(_0x3efbcc){const _0x195ff3=_0x24e0d4;VisuMZ[_0x195ff3(0x219)]['BattleManager_endBattle'][_0x195ff3(0x146)](this,_0x3efbcc);for(const _0x422c19 of $gameParty['allMembers']()){_0x422c19[_0x195ff3(0x2d6)]();}},BattleManager[_0x24e0d4(0xae)]=function(){const _0x45ed6a=_0x24e0d4;this[_0x45ed6a(0x28a)][_0x45ed6a(0x2fe)]=$gameTroop[_0x45ed6a(0x184)]();},BattleManager[_0x24e0d4(0x327)]=function(){const _0x2a2140=_0x24e0d4;if(!this['classPointsVisible']())return;$gameMessage[_0x2a2140(0x188)]();const _0x5b6353=$gameParty[_0x2a2140(0x2d0)](),_0x225639=VisuMZ[_0x2a2140(0x219)]['Settings']['ClassPoints'],_0x189505=_0x225639['VictoryText'];for(const _0xe2d6c of _0x5b6353){if(!_0xe2d6c)continue;const _0x172542=_0x189505[_0x2a2140(0x369)](_0xe2d6c['name'](),_0xe2d6c['earnedClassPoints'](),TextManager[_0x2a2140(0x16c)],TextManager[_0x2a2140(0x36b)]);$gameMessage[_0x2a2140(0x11c)]('\x5c.'+_0x172542);}},BattleManager[_0x24e0d4(0x1fe)]=function(){const _0x533222=_0x24e0d4;this[_0x533222(0x28a)][_0x533222(0x2fe)]=this['_rewards']['classPoints']||0x0;let _0x498cd9=$gameParty[_0x533222(0x34d)]();VisuMZ['ClassChangeSystem'][_0x533222(0x2ba)][_0x533222(0x1e8)][_0x533222(0x303)]&&(_0x498cd9=_0x498cd9[_0x533222(0x240)](_0x5451ae=>_0x5451ae[_0x533222(0x21e)]()));for(const _0x194426 of _0x498cd9){if(!_0x194426)continue;if(!$dataSystem['optExtraExp']&&!_0x194426[_0x533222(0x1be)]())continue;_0x194426[_0x533222(0x1a7)](this[_0x533222(0x28a)][_0x533222(0x2fe)]),_0x194426[_0x533222(0x149)](this[_0x533222(0x28a)][_0x533222(0x2fe)]);}},BattleManager[_0x24e0d4(0x279)]=function(){const _0x44fac7=_0x24e0d4;return VisuMZ[_0x44fac7(0x219)]['Settings'][_0x44fac7(0x1e8)][_0x44fac7(0xe7)];},BattleManager['makeRewardsJobPoints']=function(){const _0x92a8c4=_0x24e0d4;this[_0x92a8c4(0x28a)]['jobPoints']=$gameTroop['jobPointsTotal']();},BattleManager[_0x24e0d4(0x205)]=function(){const _0x443158=_0x24e0d4;if(!this['jobPointsVisible']())return;$gameMessage['newPage']();const _0x3dc253=$gameParty[_0x443158(0x2d0)](),_0x451f53=VisuMZ['ClassChangeSystem'][_0x443158(0x2ba)][_0x443158(0xd8)],_0x46dce6=_0x451f53[_0x443158(0x179)];for(const _0x9b88a of _0x3dc253){if(!_0x9b88a)continue;const _0x304737=_0x46dce6['format'](_0x9b88a[_0x443158(0x2c5)](),_0x9b88a[_0x443158(0x19e)](),TextManager[_0x443158(0x361)],TextManager[_0x443158(0x101)]);$gameMessage[_0x443158(0x11c)]('\x5c.'+_0x304737);}},BattleManager['gainRewardsJobPoints']=function(){const _0x9ed1ee=_0x24e0d4;this[_0x9ed1ee(0x28a)][_0x9ed1ee(0x23c)]=this[_0x9ed1ee(0x28a)][_0x9ed1ee(0x23c)]||0x0;let _0x1a2e17=$gameParty[_0x9ed1ee(0x34d)]();VisuMZ[_0x9ed1ee(0x219)]['Settings'][_0x9ed1ee(0xd8)]['AliveActors']&&(_0x1a2e17=_0x1a2e17[_0x9ed1ee(0x240)](_0x113150=>_0x113150[_0x9ed1ee(0x21e)]()));for(const _0x4f019d of _0x1a2e17){if(!_0x4f019d)continue;if(!$dataSystem[_0x9ed1ee(0xdc)]&&!_0x4f019d['isBattleMember']())continue;_0x4f019d[_0x9ed1ee(0xe3)](this['_rewards']['jobPoints']),_0x4f019d[_0x9ed1ee(0x1b6)](this['_rewards']['jobPoints']);}},BattleManager[_0x24e0d4(0x34a)]=function(){const _0x2147d0=_0x24e0d4;return VisuMZ[_0x2147d0(0x219)][_0x2147d0(0x2ba)][_0x2147d0(0xd8)]['ShowVictory'];},VisuMZ[_0x24e0d4(0x219)]['Game_System_initialize']=Game_System[_0x24e0d4(0x13f)][_0x24e0d4(0x187)],Game_System['prototype'][_0x24e0d4(0x187)]=function(){const _0x322693=_0x24e0d4;VisuMZ[_0x322693(0x219)][_0x322693(0x173)][_0x322693(0x146)](this),this[_0x322693(0x139)]();},Game_System[_0x24e0d4(0x13f)][_0x24e0d4(0x139)]=function(){const _0x192e38=_0x24e0d4;this[_0x192e38(0x306)]={'shown':VisuMZ[_0x192e38(0x219)][_0x192e38(0x2ba)][_0x192e38(0x165)]['ShowMainMenu'],'enabled':VisuMZ[_0x192e38(0x219)][_0x192e38(0x2ba)]['MainMenu'][_0x192e38(0x229)]};},Game_System['prototype']['isMainMenuClassChangeSystemVisible']=function(){const _0x13a970=_0x24e0d4;if(this[_0x13a970(0x306)]===undefined)this[_0x13a970(0x139)]();return this[_0x13a970(0x306)]['shown'];},Game_System[_0x24e0d4(0x13f)][_0x24e0d4(0xd5)]=function(_0x220603){const _0x7166ce=_0x24e0d4;if(this[_0x7166ce(0x306)]===undefined)this[_0x7166ce(0x139)]();this['_ClassChangeSystem_MainMenu'][_0x7166ce(0xfc)]=_0x220603;},Game_System[_0x24e0d4(0x13f)][_0x24e0d4(0x313)]=function(){const _0x628c88=_0x24e0d4;if(this['_ClassChangeSystem_MainMenu']===undefined)this['initClassChangeSystemMainMenu']();return this[_0x628c88(0x306)][_0x628c88(0x317)];},Game_System[_0x24e0d4(0x13f)]['setMainMenuClassChangeSystemEnabled']=function(_0x34bcc7){const _0x3d2386=_0x24e0d4;if(this[_0x3d2386(0x306)]===undefined)this[_0x3d2386(0x139)]();this[_0x3d2386(0x306)][_0x3d2386(0x317)]=_0x34bcc7;},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x163)]=Game_Action[_0x24e0d4(0x13f)][_0x24e0d4(0x1c4)],Game_Action[_0x24e0d4(0x13f)][_0x24e0d4(0x1c4)]=function(_0x195333){const _0x307ce9=_0x24e0d4;VisuMZ[_0x307ce9(0x219)][_0x307ce9(0x163)][_0x307ce9(0x146)](this,_0x195333),this['applyClassChangeSystemUserEffect'](_0x195333);},Game_Action[_0x24e0d4(0x13f)]['applyClassChangeSystemUserEffect']=function(_0x2e202d){const _0x55a84f=_0x24e0d4;if(this[_0x55a84f(0x20a)]())this[_0x55a84f(0x12e)](_0x2e202d);},Game_Action[_0x24e0d4(0x13f)][_0x24e0d4(0x12e)]=function(_0x5edcde){const _0x4c962b=_0x24e0d4,_0xa0301f=VisuMZ['ClassChangeSystem'][_0x4c962b(0x36d)],_0xd037cd=this[_0x4c962b(0x20a)]()[_0x4c962b(0x24a)];if($gameParty[_0x4c962b(0x353)]()){if(this[_0x4c962b(0x20b)]()[_0x4c962b(0x26e)]()&&_0xd037cd[_0x4c962b(0xc3)](_0xa0301f[_0x4c962b(0x128)])){const _0x4cb952=eval(RegExp['$1']);this[_0x4c962b(0x20b)]()[_0x4c962b(0x1a7)](_0x4cb952);}else this[_0x4c962b(0x314)]();if(_0x5edcde[_0x4c962b(0x26e)]()&&_0xd037cd['match'](_0xa0301f['TargetGainClassPoints'])){const _0xaa49f2=eval(RegExp['$1']);_0x5edcde[_0x4c962b(0x1a7)](_0xaa49f2);}}if($gameParty[_0x4c962b(0x353)]()){if(this[_0x4c962b(0x20b)]()[_0x4c962b(0x26e)]()&&_0xd037cd[_0x4c962b(0xc3)](_0xa0301f[_0x4c962b(0xd2)])){const _0x598ef9=eval(RegExp['$1']);this[_0x4c962b(0x20b)]()[_0x4c962b(0xe3)](_0x598ef9);}else this[_0x4c962b(0x25c)]();if(_0x5edcde[_0x4c962b(0x26e)]()&&_0xd037cd[_0x4c962b(0xc3)](_0xa0301f[_0x4c962b(0x1dd)])){const _0x4cb67b=eval(RegExp['$1']);_0x5edcde[_0x4c962b(0xe3)](_0x4cb67b);}}if(_0xd037cd[_0x4c962b(0xc3)](/<NOTETAG>/i)){}},Game_Action[_0x24e0d4(0x13f)]['applyClassPoints']=function(){const _0x16d6e1=_0x24e0d4;if(!$gameParty[_0x16d6e1(0x353)]())return;if(!this[_0x16d6e1(0x20b)]()[_0x16d6e1(0x26e)]())return;const _0x267dca=VisuMZ[_0x16d6e1(0x219)][_0x16d6e1(0x2ba)]['ClassPoints'];let _0x45e5e9=0x0;try{_0x45e5e9=eval(_0x267dca[_0x16d6e1(0x2fa)]);}catch(_0x2c87ba){if($gameTemp['isPlaytest']())console[_0x16d6e1(0x363)](_0x2c87ba);}this[_0x16d6e1(0x20b)]()['gainClassPoints'](_0x45e5e9);},Game_Action[_0x24e0d4(0x13f)][_0x24e0d4(0x25c)]=function(){const _0x161874=_0x24e0d4;if(!$gameParty[_0x161874(0x353)]())return;if(!this[_0x161874(0x20b)]()[_0x161874(0x26e)]())return;const _0x3f8084=VisuMZ[_0x161874(0x219)][_0x161874(0x2ba)]['JobPoints'];let _0x57dc02=0x0;try{_0x57dc02=eval(_0x3f8084[_0x161874(0x2fa)]);}catch(_0x5cc56b){if($gameTemp[_0x161874(0x280)]())console['log'](_0x5cc56b);}this[_0x161874(0x20b)]()[_0x161874(0xe3)](_0x57dc02);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0xfe)]=Game_Battler['prototype']['gainSilentTp'],Game_Battler[_0x24e0d4(0x13f)][_0x24e0d4(0x106)]=function(_0x1530a6){const _0x3e16c5=_0x24e0d4;this[_0x3e16c5(0x2e8)]&&this[_0x3e16c5(0x26e)]()&&$gameParty[_0x3e16c5(0x353)]()?this['_tp']=(this[_0x3e16c5(0x194)]+_0x1530a6)['clamp'](0x0,this['maxTp']()):VisuMZ[_0x3e16c5(0x219)][_0x3e16c5(0xfe)][_0x3e16c5(0x146)](this,_0x1530a6);},VisuMZ[_0x24e0d4(0x219)]['Game_Actor_equips']=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x176)],Game_Actor[_0x24e0d4(0x13f)]['equips']=function(){const _0x39d57b=_0x24e0d4;return VisuMZ[_0x39d57b(0x219)][_0x39d57b(0x22f)](this)?VisuMZ['BattleCore'][_0x39d57b(0x20c)][_0x39d57b(0x146)](this):VisuMZ[_0x39d57b(0x219)][_0x39d57b(0x20c)]['call'](this);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x22f)]=function(_0x4dc961){const _0x83ee14=_0x24e0d4;return Imported[_0x83ee14(0x2b7)]&&_0x4dc961['isActor']()&&_0x4dc961[_0x83ee14(0x27c)]!==undefined&&_0x4dc961===BattleManager['_subject']&&$gameParty['inBattle']();},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2be)]=Game_Battler['prototype'][_0x24e0d4(0x17d)],Game_Battler[_0x24e0d4(0x13f)][_0x24e0d4(0x17d)]=function(_0x4d8a76){const _0x883848=_0x24e0d4;VisuMZ['ClassChangeSystem']['Game_Battler_onBattleStart'][_0x883848(0x146)](this,_0x4d8a76),this['isActor']()&&(this[_0x883848(0x29e)]=this[_0x883848(0xb2)](),this['_earnedJobPoints']=this[_0x883848(0x2d1)]());},Game_Actor[_0x24e0d4(0x160)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0x2bc)][_0x24e0d4(0x1df)],VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0xe8)]=Game_Actor['prototype'][_0x24e0d4(0x301)],Game_Actor['prototype'][_0x24e0d4(0x301)]=function(_0x5fbfe5){const _0xb4cb35=_0x24e0d4;VisuMZ[_0xb4cb35(0x219)][_0xb4cb35(0xe8)]['call'](this,_0x5fbfe5),this[_0xb4cb35(0x2ab)](),this['gainStartingClassPoints'](),this[_0xb4cb35(0x1c1)](),this[_0xb4cb35(0xee)](),this[_0xb4cb35(0x32a)]();},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x32a)]=function(){const _0x4987c3=_0x24e0d4;this[_0x4987c3(0x257)](),this[_0x4987c3(0x2de)](),this[_0x4987c3(0x239)](),this[_0x4987c3(0x1b2)](),this['updateClassLearnedSkills'](),this['refresh'](),this[_0x4987c3(0x364)](),this[_0x4987c3(0x28e)]();},VisuMZ['ClassChangeSystem']['Game_Actor_changeClass']=Game_Actor[_0x24e0d4(0x13f)]['changeClass'],Game_Actor['prototype']['changeClass']=function(_0x933c2d,_0x3a3796){const _0x429ad9=_0x24e0d4;_0x3a3796=this['maintainLevels']();_0x3a3796&&(this[_0x429ad9(0x32f)]=this[_0x429ad9(0x32f)]||{},this[_0x429ad9(0x32f)][_0x933c2d]=this[_0x429ad9(0x32f)][this[_0x429ad9(0x222)]]||0x0,_0x3a3796=![]);this[_0x429ad9(0x2a0)]=!![];const _0x9cee9b=JsonEx[_0x429ad9(0x1c5)](this);_0x9cee9b['_tempActor']=!![],VisuMZ['ClassChangeSystem'][_0x429ad9(0x138)][_0x429ad9(0x146)](this,_0x933c2d,_0x3a3796),this[_0x429ad9(0xc2)](_0x9cee9b),this[_0x429ad9(0x2c4)](),this['naturalUnlockClass'](_0x933c2d),this[_0x429ad9(0x2a0)]=undefined;if($gamePlayer)$gamePlayer['refresh']();},VisuMZ[_0x24e0d4(0x219)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x34c)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x34c)]=function(_0x2760ce,_0x45e607){const _0x379470=_0x24e0d4;if(this[_0x379470(0x289)])return![];return VisuMZ['ClassChangeSystem'][_0x379470(0x11d)][_0x379470(0x146)](this,_0x2760ce,_0x45e607);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x13d)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x305)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x305)]=function(_0x1c301a){const _0x2bdaae=_0x24e0d4;if($gameParty['inBattle']())return;VisuMZ[_0x2bdaae(0x219)][_0x2bdaae(0x13d)][_0x2bdaae(0x146)](this,_0x1c301a);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x10e)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x104)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x104)]=function(){const _0x20a037=_0x24e0d4;VisuMZ[_0x20a037(0x219)][_0x20a037(0x10e)][_0x20a037(0x146)](this);const _0x28915d=this['currentClass']()['id'];this[_0x20a037(0x31f)](_0x28915d),this[_0x20a037(0x322)](_0x28915d),this[_0x20a037(0xf1)]=this[_0x20a037(0xf1)]||{},this[_0x20a037(0xf1)][_0x28915d]=this['level'],this[_0x20a037(0x307)]()&&this[_0x20a037(0x1a1)]();},Game_Actor[_0x24e0d4(0x13f)]['classAdjustHpMp']=function(_0x3a1404){const _0x4e2316=_0x24e0d4;if(!Game_Actor[_0x4e2316(0x160)])return;const _0x182d74=Math[_0x4e2316(0xb3)](_0x3a1404[_0x4e2316(0xf6)]()*this[_0x4e2316(0x2c0)]),_0x10672e=Math[_0x4e2316(0xb3)](_0x3a1404['mpRate']()*this[_0x4e2316(0x17e)]);if(this['hp']>0x0)this[_0x4e2316(0xfd)](_0x182d74);if(this['mp']>0x0)this['setMp'](_0x10672e);},Game_Actor['prototype'][_0x24e0d4(0x2ab)]=function(){const _0xecb9b3=_0x24e0d4;this[_0xecb9b3(0xf8)]={};},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x312)]=function(){const _0x2630c1=_0x24e0d4,_0x2130a5=VisuMZ[_0x2630c1(0x219)]['RegExp'],_0x4545da=this['actor']()[_0x2630c1(0x24a)];if(_0x4545da[_0x2630c1(0xc3)](_0x2130a5[_0x2630c1(0x2f0)])){const _0x39a159=eval(RegExp['$1']);this['gainClassPoints'](_0x39a159);}const _0x1dff98=VisuMZ[_0x2630c1(0x219)]['Settings'][_0x2630c1(0x1e8)];if(!_0x1dff98[_0x2630c1(0x1fb)])return;const _0x4d1836=_0x4545da[_0x2630c1(0xc3)](_0x2130a5['StartClassClassPoints']);if(_0x4d1836)for(const _0x1a4bfe of _0x4d1836){if(!_0x1a4bfe)continue;_0x1a4bfe[_0x2630c1(0xc3)](_0x2130a5[_0x2630c1(0x2bb)]);const _0x21da66=String(RegExp['$1']),_0x143b34=eval(RegExp['$2']),_0x21cc9c=/^\d+$/['test'](_0x21da66);let _0x220259=0x0;_0x21cc9c?_0x220259=Number(_0x21da66):_0x220259=DataManager[_0x2630c1(0x195)](_0x21da66),this[_0x2630c1(0x1a7)](_0x143b34,_0x220259);}},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0xb2)]=function(_0x75ef7c){const _0x1c748f=_0x24e0d4;this[_0x1c748f(0xf8)]===undefined&&this[_0x1c748f(0x2ab)]();const _0x590236=VisuMZ['ClassChangeSystem']['Settings']['ClassPoints'];return _0x590236['SharedResource']?_0x75ef7c=0x0:_0x75ef7c=_0x75ef7c||this['currentClass']()['id'],this['_classPoints'][_0x75ef7c]=this[_0x1c748f(0xf8)][_0x75ef7c]||0x0,Math[_0x1c748f(0xb3)](this['_classPoints'][_0x75ef7c]);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x243)]=function(_0x515491,_0x5d6219){const _0x4a1652=_0x24e0d4;this[_0x4a1652(0xf8)]===undefined&&this[_0x4a1652(0x2ab)]();const _0x39eb94=VisuMZ[_0x4a1652(0x219)]['Settings'][_0x4a1652(0x1e8)];_0x39eb94['SharedResource']?_0x5d6219=0x0:_0x5d6219=_0x5d6219||this['currentClass']()['id'];this['_classPoints'][_0x5d6219]=this[_0x4a1652(0xf8)][_0x5d6219]||0x0,this[_0x4a1652(0xf8)][_0x5d6219]=Math['round'](_0x515491||0x0);const _0xa97241=_0x39eb94[_0x4a1652(0x343)]||Number['MAX_SAFE_INTEGER'];this['_classPoints'][_0x5d6219]=this[_0x4a1652(0xf8)][_0x5d6219]['clamp'](0x0,_0xa97241);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1a7)]=function(_0x1f3eb9,_0x266bf8){const _0xa785b1=_0x24e0d4;_0x1f3eb9>0x0&&(_0x1f3eb9*=this[_0xa785b1(0x28d)]()),this[_0xa785b1(0x108)](_0x1f3eb9,_0x266bf8);},Game_Actor['prototype'][_0x24e0d4(0x149)]=function(_0x329495){const _0x145364=_0x24e0d4;if(!Imported[_0x145364(0x34f)])return;_0x329495>0x0&&(_0x329495*=this[_0x145364(0x28d)]()),this[_0x145364(0x30e)](_0x329495,'Class');},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x108)]=function(_0x563cfe,_0x398a40){const _0x512963=_0x24e0d4,_0x2e10e6=VisuMZ[_0x512963(0x219)]['Settings']['ClassPoints'];_0x2e10e6[_0x512963(0x1fb)]?_0x398a40=0x0:_0x398a40=_0x398a40||this[_0x512963(0x1d0)]()['id'],_0x563cfe+=this[_0x512963(0xb2)](_0x398a40),this[_0x512963(0x243)](_0x563cfe,_0x398a40);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2a4)]=function(_0x587e93,_0x454d97){const _0x321689=_0x24e0d4;this[_0x321689(0x108)](-_0x587e93,_0x454d97);},Game_Actor[_0x24e0d4(0x13f)]['classPointsRate']=function(){const _0x3c8f5c=_0x24e0d4;return this[_0x3c8f5c(0x199)]()[_0x3c8f5c(0x302)]((_0x4b20b0,_0x1c7e73)=>{const _0x39a5b9=_0x3c8f5c;return _0x1c7e73&&_0x1c7e73[_0x39a5b9(0x24a)][_0x39a5b9(0xc3)](VisuMZ[_0x39a5b9(0x219)]['RegExp'][_0x39a5b9(0x228)])?_0x4b20b0*(Number(RegExp['$1'])*0.01):_0x4b20b0;},0x1);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x31f)]=function(_0x5b20db){const _0x1b883f=_0x24e0d4;if(this[_0x1b883f(0x2a0)])return;const _0x103987=VisuMZ['ClassChangeSystem'][_0x1b883f(0x2ba)]['ClassPoints'];let _0x3e397c=0x0;try{_0x3e397c=eval(_0x103987[_0x1b883f(0x13c)]);}catch(_0xf91b53){if($gameTemp[_0x1b883f(0x280)]())console[_0x1b883f(0x363)](_0xf91b53);}this[_0x1b883f(0x1a7)](_0x3e397c,_0x5b20db);},Game_Actor['prototype']['earnedClassPoints']=function(){const _0x3f1cbb=_0x24e0d4;return this[_0x3f1cbb(0x29e)]=this[_0x3f1cbb(0x29e)]||0x0,this[_0x3f1cbb(0xb2)]()-this[_0x3f1cbb(0x29e)];},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1c1)]=function(){const _0x5d0e6a=_0x24e0d4;this[_0x5d0e6a(0x2af)]={};},Game_Actor[_0x24e0d4(0x13f)]['gainStartingJobPoints']=function(){const _0x792476=_0x24e0d4,_0x4a2723=VisuMZ[_0x792476(0x219)][_0x792476(0x36d)],_0x2b46cc=this[_0x792476(0x334)]()[_0x792476(0x24a)];if(_0x2b46cc[_0x792476(0xc3)](_0x4a2723[_0x792476(0x2e1)])){const _0xe8b813=eval(RegExp['$1']);this[_0x792476(0xe3)](_0xe8b813);}const _0x1419ca=VisuMZ['ClassChangeSystem'][_0x792476(0x2ba)][_0x792476(0xd8)];if(!_0x1419ca[_0x792476(0x1fb)])return;const _0x347a91=_0x2b46cc['match'](_0x4a2723['StartClassJobPoints']);if(_0x347a91)for(const _0x33dae3 of _0x347a91){if(!_0x33dae3)continue;_0x33dae3[_0x792476(0xc3)](_0x4a2723[_0x792476(0x207)]);const _0x18e7a5=String(RegExp['$1']),_0x50d6c7=eval(RegExp['$2']),_0x5695df=/^\d+$/['test'](_0x18e7a5);let _0x128b1d=0x0;_0x5695df?_0x128b1d=Number(_0x18e7a5):_0x128b1d=DataManager['getClassIdWithName'](_0x18e7a5),this[_0x792476(0xe3)](_0x50d6c7,_0x128b1d);}},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2d1)]=function(_0x16c7fb){const _0x3c8f2c=_0x24e0d4;this[_0x3c8f2c(0x2af)]===undefined&&this['initJobPoints']();const _0x3851f0=VisuMZ[_0x3c8f2c(0x219)][_0x3c8f2c(0x2ba)][_0x3c8f2c(0xd8)];return _0x3851f0[_0x3c8f2c(0x1fb)]?_0x16c7fb=0x0:_0x16c7fb=_0x16c7fb||this[_0x3c8f2c(0x1d0)]()['id'],this[_0x3c8f2c(0x2af)][_0x16c7fb]=this['_jobPoints'][_0x16c7fb]||0x0,Math[_0x3c8f2c(0xb3)](this[_0x3c8f2c(0x2af)][_0x16c7fb]);},Game_Actor['prototype']['setJobPoints']=function(_0x37691c,_0x62de76){const _0x46c8ac=_0x24e0d4;this[_0x46c8ac(0x2af)]===undefined&&this['initJobPoints']();const _0x32491d=VisuMZ['ClassChangeSystem']['Settings'][_0x46c8ac(0xd8)];_0x32491d[_0x46c8ac(0x1fb)]?_0x62de76=0x0:_0x62de76=_0x62de76||this[_0x46c8ac(0x1d0)]()['id'];this[_0x46c8ac(0x2af)][_0x62de76]=this[_0x46c8ac(0x2af)][_0x62de76]||0x0,this[_0x46c8ac(0x2af)][_0x62de76]=Math[_0x46c8ac(0xb3)](_0x37691c||0x0);const _0x5e84ba=_0x32491d[_0x46c8ac(0x343)]||Number[_0x46c8ac(0xda)];this[_0x46c8ac(0x2af)][_0x62de76]=this[_0x46c8ac(0x2af)][_0x62de76][_0x46c8ac(0x123)](0x0,_0x5e84ba);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0xe3)]=function(_0xaef8f7,_0x3c288c){const _0x459b9c=_0x24e0d4;_0xaef8f7>0x0&&(_0xaef8f7*=this[_0x459b9c(0x1ba)]()),this[_0x459b9c(0xb0)](_0xaef8f7,_0x3c288c);},Game_Actor['prototype'][_0x24e0d4(0x1b6)]=function(_0x400aca){const _0x320248=_0x24e0d4;if(!Imported[_0x320248(0x34f)])return;_0x400aca>0x0&&(_0x400aca*=this[_0x320248(0x1ba)]()),this[_0x320248(0x30e)](_0x400aca,'Job');},Game_Actor['prototype'][_0x24e0d4(0xb0)]=function(_0x5e52f9,_0x3da1d2){const _0x564eba=_0x24e0d4,_0x10cbee=VisuMZ[_0x564eba(0x219)][_0x564eba(0x2ba)][_0x564eba(0xd8)];_0x10cbee[_0x564eba(0x1fb)]?_0x3da1d2=0x0:_0x3da1d2=_0x3da1d2||this[_0x564eba(0x1d0)]()['id'],_0x5e52f9+=this[_0x564eba(0x2d1)](_0x3da1d2),this[_0x564eba(0x11b)](_0x5e52f9,_0x3da1d2);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x119)]=function(_0xb30f77,_0x53f51d){this['addJobPoints'](-_0xb30f77,_0x53f51d);},Game_Actor[_0x24e0d4(0x13f)]['jobPointsRate']=function(){const _0x3f9c4c=_0x24e0d4;return this['traitObjects']()[_0x3f9c4c(0x302)]((_0x57a07b,_0x377581)=>{const _0xf21f20=_0x3f9c4c;return _0x377581&&_0x377581[_0xf21f20(0x24a)]['match'](VisuMZ[_0xf21f20(0x219)][_0xf21f20(0x36d)]['JobPointsRate'])?_0x57a07b*(Number(RegExp['$1'])*0.01):_0x57a07b;},0x1);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x322)]=function(_0x3f87fb){const _0x14ea15=_0x24e0d4;if(this[_0x14ea15(0x2a0)])return;const _0x238268=VisuMZ['ClassChangeSystem'][_0x14ea15(0x2ba)][_0x14ea15(0xd8)];let _0x246af2=0x0;try{_0x246af2=eval(_0x238268[_0x14ea15(0x13c)]);}catch(_0x2f62c8){if($gameTemp[_0x14ea15(0x280)]())console['log'](_0x2f62c8);}this[_0x14ea15(0xe3)](_0x246af2,_0x3f87fb);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x19e)]=function(){const _0xfd6ce7=_0x24e0d4;return this[_0xfd6ce7(0x1ee)]=this[_0xfd6ce7(0x1ee)]||0x0,this[_0xfd6ce7(0x2d1)]()-this['_earnedJobPoints'];},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x12b)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x344)],Game_Actor[_0x24e0d4(0x13f)]['setFaceImage']=function(_0x3c2da1,_0x162363){const _0xa5d7ea=_0x24e0d4;_0x3c2da1!==''?(this['_priorityFaceName']=_0x3c2da1,this[_0xa5d7ea(0x2e9)]=_0x162363):(this[_0xa5d7ea(0x1ab)]=undefined,this[_0xa5d7ea(0x2e9)]=undefined);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x1bb)]=Game_Actor['prototype'][_0x24e0d4(0x20d)],Game_Actor['prototype']['faceName']=function(){const _0x217905=_0x24e0d4;if(this[_0x217905(0x1ab)]!==undefined)return this[_0x217905(0x1ab)];return ImageManager['getActorClassFaceName'](this)||VisuMZ[_0x217905(0x219)][_0x217905(0x1bb)][_0x217905(0x146)](this);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0xf4)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x13b)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x13b)]=function(){const _0x43f94e=_0x24e0d4;if(this[_0x43f94e(0x2e9)]!==undefined)return this['_priorityFaceIndex'];const _0x35e73d=ImageManager[_0x43f94e(0xba)](this);if(_0x35e73d!==undefined)return _0x35e73d;return VisuMZ['ClassChangeSystem'][_0x43f94e(0xf4)][_0x43f94e(0x146)](this);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x132)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x189)],Game_Actor[_0x24e0d4(0x13f)]['setCharacterImage']=function(_0xc88dac,_0xb5adb6){const _0x22872f=_0x24e0d4;_0xc88dac!==''?(this[_0x22872f(0x2a1)]=_0xc88dac,this[_0x22872f(0x1b4)]=_0xb5adb6):(this['_priorityCharacterName']=undefined,this[_0x22872f(0x1b4)]=undefined);},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2b6)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x318)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x318)]=function(){const _0x24e873=_0x24e0d4;if(this['_priorityCharacterName']!==undefined)return this['_priorityCharacterName'];return ImageManager[_0x24e873(0x31e)](this)||VisuMZ[_0x24e873(0x219)][_0x24e873(0x2b6)][_0x24e873(0x146)](this);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x223)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1f3)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1f3)]=function(){const _0x2f9df9=_0x24e0d4;if(this[_0x2f9df9(0x1b4)]!==undefined)return this[_0x2f9df9(0x1b4)];const _0x146488=ImageManager['getActorClassCharacterIndex'](this);if(_0x146488!==undefined)return _0x146488;return VisuMZ[_0x2f9df9(0x219)][_0x2f9df9(0x223)][_0x2f9df9(0x146)](this);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x117)]=Game_Actor['prototype']['setBattlerImage'],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2a9)]=function(_0x19e6cd){const _0x233ace=_0x24e0d4;_0x19e6cd!==''?this[_0x233ace(0x114)]=_0x19e6cd:this[_0x233ace(0x114)]=undefined;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x259)]=Game_Actor[_0x24e0d4(0x13f)]['battlerName'],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0xcf)]=function(){const _0x447700=_0x24e0d4;if(this['_priorityBattlerName']!==undefined)return this[_0x447700(0x114)];return ImageManager['getActorClassBattlerName'](this)||VisuMZ[_0x447700(0x219)][_0x447700(0x259)][_0x447700(0x146)](this);;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x167)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x368)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x368)]=function(_0x218eaa){const _0x21c28d=_0x24e0d4;_0x218eaa!==''?this[_0x21c28d(0x2ad)]=_0x218eaa:this['_priorityMenuImage']=undefined;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x244)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1d8)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1d8)]=function(){const _0x1fa7d4=_0x24e0d4;if(this[_0x1fa7d4(0x2ad)]!==undefined)return this[_0x1fa7d4(0x2ad)];if(!Imported['VisuMZ_1_MainMenuCore'])return'';return ImageManager['getActorClassMenuPortrait'](this)||VisuMZ[_0x1fa7d4(0x219)][_0x1fa7d4(0x244)][_0x1fa7d4(0x146)](this);;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x10a)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x339)],Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x339)]=function(_0x364cda){const _0x3ebb65=_0x24e0d4;_0x364cda!==''?this[_0x3ebb65(0x1ff)]=_0x364cda:this[_0x3ebb65(0x1ff)]=undefined;if(SceneManager[_0x3ebb65(0x20f)]()&&$gameParty[_0x3ebb65(0x118)]()[_0x3ebb65(0xe9)](this)){const _0x5d81de=SceneManager['_scene'][_0x3ebb65(0x201)];if(_0x5d81de)_0x5d81de[_0x3ebb65(0xff)](this);}},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2f4)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x293)],Game_Actor[_0x24e0d4(0x13f)]['getBattlePortraitFilename']=function(){const _0x2fd38c=_0x24e0d4;if(this[_0x2fd38c(0x1ff)]!==undefined)return this[_0x2fd38c(0x1ff)];return ImageManager['getActorClassBattlePortrait'](this)||VisuMZ['ClassChangeSystem']['Game_Actor_getBattlePortraitFilename'][_0x2fd38c(0x146)](this);;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x257)]=function(){const _0x41c6de=_0x24e0d4;this[_0x41c6de(0x27b)]=[this[_0x41c6de(0x1d0)]()['id']];const _0x238a44=VisuMZ['ClassChangeSystem'][_0x41c6de(0x36d)],_0x552593=this['actor']()['note'],_0x1ad25c=_0x552593['match'](_0x238a44['ActorUnlockedClasses']);if(_0x1ad25c)for(const _0x523a58 of _0x1ad25c){if(!_0x523a58)continue;_0x523a58[_0x41c6de(0xc3)](_0x238a44['ActorUnlockedClasses']);const _0x746005=String(RegExp['$1'])[_0x41c6de(0x143)](',');for(let _0x3a5090 of _0x746005){_0x3a5090=(String(_0x3a5090)||'')[_0x41c6de(0x12d)]();const _0x9b318e=/^\d+$/['test'](_0x3a5090);_0x9b318e?this[_0x41c6de(0x27b)][_0x41c6de(0x2d4)](Number(_0x3a5090)):this[_0x41c6de(0x27b)][_0x41c6de(0x2d4)](DataManager[_0x41c6de(0x195)](_0x3a5090));}}},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x25a)]=function(){const _0xffc215=_0x24e0d4;if(this['_unlockedClasses']===undefined)this[_0xffc215(0x257)]();return this[_0xffc215(0x27b)];},Game_Actor[_0x24e0d4(0x13f)]['unlockClass']=function(_0x11f7cc){const _0x2be668=_0x24e0d4;if(this[_0x2be668(0x27b)]===undefined)this[_0x2be668(0x257)]();if(this[_0x2be668(0x27b)][_0x2be668(0xe9)](_0x11f7cc))return;this['_unlockedClasses'][_0x2be668(0x2d4)](_0x11f7cc),this[_0x2be668(0x27b)][_0x2be668(0xb1)](0x0),this[_0x2be668(0x27b)]['sort'](function(_0xd7bae3,_0x4535cd){return _0xd7bae3-_0x4535cd;});},Game_Actor['prototype']['removeUnlockedClass']=function(_0x1ffcc8){const _0x4975f6=_0x24e0d4;if(this['_unlockedClasses']===undefined)this[_0x4975f6(0x257)]();if(!this[_0x4975f6(0x27b)][_0x4975f6(0xe9)](_0x1ffcc8))return;this[_0x4975f6(0x27b)][_0x4975f6(0xb1)](_0x1ffcc8)[_0x4975f6(0xb1)](null),this[_0x4975f6(0x27b)][_0x4975f6(0x270)](function(_0x55fe53,_0x2f3eca){return _0x55fe53-_0x2f3eca;});},Game_Actor['prototype']['naturalUnlockClass']=function(_0x362084){const _0x41ca86=_0x24e0d4;this[_0x41ca86(0x192)](_0x362084);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2de)]=function(){const _0x2f66f=_0x24e0d4;this[_0x2f66f(0x252)]=VisuMZ[_0x2f66f(0x219)][_0x2f66f(0x2ba)][_0x2f66f(0x2bc)]['StartingMulticlasses'],this[_0x2f66f(0xfa)]=[this['_classId']];const _0x2e8065=this[_0x2f66f(0x334)]()[_0x2f66f(0x24a)],_0x5c6fc1=VisuMZ['ClassChangeSystem']['RegExp'];_0x2e8065[_0x2f66f(0xc3)](_0x5c6fc1[_0x2f66f(0x32e)])&&(this[_0x2f66f(0x252)]=Number(RegExp['$1']));const _0x3f7ecf=_0x2e8065['match'](_0x5c6fc1['StartingClassTier']);if(_0x3f7ecf)for(const _0xf1063d of _0x3f7ecf){if(!_0xf1063d)continue;_0xf1063d['match'](_0x5c6fc1[_0x2f66f(0x255)]);const _0x1fa5e0=Number(RegExp['$1'])-0x1;if(_0x1fa5e0+0x1>this[_0x2f66f(0x252)])continue;let _0x55c7b4=(String(RegExp['$2'])||'')['trim']();const _0xd3a10b=/^\d+$/[_0x2f66f(0x242)](_0x55c7b4);_0xd3a10b?this[_0x2f66f(0xfa)][_0x1fa5e0]=Number(_0x55c7b4):this[_0x2f66f(0xfa)][_0x1fa5e0]=DataManager[_0x2f66f(0x195)](_0x55c7b4);}this[_0x2f66f(0x2c4)](),this[_0x2f66f(0x252)]=this[_0x2f66f(0x252)][_0x2f66f(0x123)](0x1,VisuMZ[_0x2f66f(0x219)][_0x2f66f(0x2ba)][_0x2f66f(0x2d3)][_0x2f66f(0x1d9)]||0x1);for(const _0x150ee1 of this['_multiclasses']){this[_0x2f66f(0x192)](_0x150ee1);}},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1d6)]=function(){const _0x47a521=_0x24e0d4;if(this[_0x47a521(0xfa)]===undefined)this[_0x47a521(0x2de)]();return this['_multiclasses'][0x0]=this[_0x47a521(0x222)],this[_0x47a521(0xfa)]['filter'](_0x3d6cb1=>!!$dataClasses[_0x3d6cb1])['map'](_0x8cf1c6=>$dataClasses[_0x8cf1c6]);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x260)]=function(){const _0x56ffc8=_0x24e0d4;return this[_0x56ffc8(0x1d6)]();},Game_Actor[_0x24e0d4(0x13f)]['getMulticlassAtTier']=function(_0xe8b3e5){const _0x37c48c=_0x24e0d4;if(this[_0x37c48c(0xfa)]===undefined)this[_0x37c48c(0x2de)]();return _0xe8b3e5-=0x1,$dataClasses[this['_multiclasses'][_0xe8b3e5]]||null;},Game_Actor['prototype'][_0x24e0d4(0x299)]=function(_0x5205ce){const _0x3a923e=_0x24e0d4;return this[_0x3a923e(0x18c)](_0x5205ce);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x236)]=function(_0x3c40c0){const _0xb1fff2=_0x24e0d4,_0x525669=this[_0xb1fff2(0x18c)](_0x3c40c0);return _0x525669?_0x525669['id']:0x0;},Game_Actor[_0x24e0d4(0x13f)]['totalMulticlass']=function(){const _0x2d63cd=_0x24e0d4;if(this['_multiclassTiers']===undefined)this[_0x2d63cd(0x2de)]();return this[_0x2d63cd(0x252)]=this[_0x2d63cd(0x252)][_0x2d63cd(0x123)](0x1,VisuMZ[_0x2d63cd(0x219)][_0x2d63cd(0x2ba)][_0x2d63cd(0x2d3)][_0x2d63cd(0x1d9)]||0x1),this[_0x2d63cd(0x252)];},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x15e)]=function(_0x28514a){const _0x63fd0=_0x24e0d4;if(this[_0x63fd0(0x252)]===undefined)this[_0x63fd0(0x2de)]();this[_0x63fd0(0x252)]=_0x28514a[_0x63fd0(0x123)](0x1,VisuMZ['ClassChangeSystem'][_0x63fd0(0x2ba)]['Multiclass'][_0x63fd0(0x1d9)]||0x1);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x358)]=function(_0x2db0a7){const _0x530cf9=_0x24e0d4;_0x2db0a7+=this[_0x530cf9(0x162)](),this[_0x530cf9(0x15e)](_0x2db0a7);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0xc8)]=function(_0x2b709f){const _0x4f51f3=_0x24e0d4;_0x2b709f=this['totalMulticlass']()-_0x2b709f,this[_0x4f51f3(0x15e)](_0x2b709f);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2c4)]=function(){const _0x194d33=_0x24e0d4;if(this[_0x194d33(0xfa)]===undefined)this[_0x194d33(0x2de)]();let _0x53cced=![];const _0x3e4c78=this['totalMulticlass']();while(this[_0x194d33(0xfa)][_0x194d33(0x1d9)]>_0x3e4c78){_0x53cced=!![],this[_0x194d33(0xfa)][_0x194d33(0x1b0)]();}this[_0x194d33(0xfa)][0x0]=this[_0x194d33(0x1d0)]()['id'];const _0x2603c0=this[_0x194d33(0xfa)]['length'];for(let _0x4fd83e=0x1;_0x4fd83e<_0x2603c0;_0x4fd83e++){this[_0x194d33(0xfa)][_0x4fd83e]===this[_0x194d33(0x1d0)]()['id']&&(this[_0x194d33(0xfa)][_0x4fd83e]=0x0,_0x53cced=!![]);}if(_0x53cced)this[_0x194d33(0x33d)]();},VisuMZ[_0x24e0d4(0x219)]['Game_BattlerBase_elementRate']=Game_BattlerBase['prototype']['elementRate'],Game_BattlerBase[_0x24e0d4(0x13f)]['elementRate']=function(_0x1cd9f6){const _0x43a670=_0x24e0d4;if(this[_0x43a670(0x26e)]())this['_multiclassCheck']=_0x43a670(0xd1);let _0x49792d=VisuMZ[_0x43a670(0x219)][_0x43a670(0x337)][_0x43a670(0x146)](this,_0x1cd9f6);if(this['isActor']())this[_0x43a670(0x27c)]=undefined;return _0x49792d;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2e7)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x248)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x248)]=function(_0x4a0f11){const _0x23d93a=_0x24e0d4;if(this['isActor']())this['_multiclassCheck']=_0x23d93a(0x2ce);let _0x12b0a4=VisuMZ[_0x23d93a(0x219)][_0x23d93a(0x2e7)][_0x23d93a(0x146)](this,_0x4a0f11);if(this[_0x23d93a(0x26e)]())this[_0x23d93a(0x27c)]=undefined;return _0x12b0a4;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x22e)]=Game_BattlerBase['prototype'][_0x24e0d4(0x329)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x329)]=function(_0x6f76b9){const _0x525222=_0x24e0d4;if(this[_0x525222(0x26e)]())this[_0x525222(0x27c)]=_0x525222(0x227);let _0x50c018=VisuMZ[_0x525222(0x219)]['Game_BattlerBase_stateRate'][_0x525222(0x146)](this,_0x6f76b9);if(this[_0x525222(0x26e)]())this['_multiclassCheck']=undefined;return _0x50c018;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x311)]=Game_BattlerBase['prototype'][_0x24e0d4(0x2df)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x2df)]=function(){const _0x761ff5=_0x24e0d4;if(this['isActor']())this[_0x761ff5(0x27c)]='StateResistance';let _0x438994=VisuMZ[_0x761ff5(0x219)][_0x761ff5(0x311)][_0x761ff5(0x146)](this);if(this[_0x761ff5(0x26e)]())this[_0x761ff5(0x27c)]=undefined;return _0x438994;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x16d)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x15c)],Game_BattlerBase[_0x24e0d4(0x13f)]['paramRate']=function(_0x20990b){const _0x24c16b=_0x24e0d4;if(this[_0x24c16b(0x26e)]())this['_multiclassCheck']=_0x24c16b(0x196);let _0x50a9e5=VisuMZ['ClassChangeSystem']['Game_BattlerBase_paramRate']['call'](this,_0x20990b);if(this['isActor']())this['_multiclassCheck']=undefined;return _0x50a9e5;},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x144)]=Game_BattlerBase['prototype']['xparam'],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x2dc)]=function(_0x5d7be3){const _0x42220e=_0x24e0d4;if(this[_0x42220e(0x26e)]())this[_0x42220e(0x27c)]=_0x42220e(0xb7);let _0x497716=VisuMZ[_0x42220e(0x219)]['Game_BattlerBase_xparam'][_0x42220e(0x146)](this,_0x5d7be3);if(this[_0x42220e(0x26e)]())this['_multiclassCheck']=undefined;return _0x497716;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x35a)]=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase[_0x24e0d4(0x13f)]['sparam']=function(_0x10286b){const _0x2b1e96=_0x24e0d4;if(this[_0x2b1e96(0x26e)]())this[_0x2b1e96(0x27c)]=_0x2b1e96(0x2cd);let _0x595a1b=VisuMZ[_0x2b1e96(0x219)][_0x2b1e96(0x35a)][_0x2b1e96(0x146)](this,_0x10286b);if(this[_0x2b1e96(0x26e)]())this['_multiclassCheck']=undefined;return _0x595a1b;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0xc9)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x1cd)],Game_BattlerBase[_0x24e0d4(0x13f)]['attackElements']=function(){const _0x30d020=_0x24e0d4;if(this[_0x30d020(0x26e)]())this['_multiclassCheck']=_0x30d020(0x10d);let _0x36e9ae=VisuMZ[_0x30d020(0x219)]['Game_BattlerBase_attackElements'][_0x30d020(0x146)](this);if(this['isActor']())this[_0x30d020(0x27c)]=undefined;return _0x36e9ae;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x292)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x1f4)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x1f4)]=function(){const _0x26f56a=_0x24e0d4;if(this[_0x26f56a(0x26e)]())this['_multiclassCheck']=_0x26f56a(0x1eb);let _0x4687a7=VisuMZ[_0x26f56a(0x219)][_0x26f56a(0x292)][_0x26f56a(0x146)](this);if(this[_0x26f56a(0x26e)]())this[_0x26f56a(0x27c)]=undefined;return _0x4687a7;},VisuMZ[_0x24e0d4(0x219)]['Game_BattlerBase_attackStatesRate']=Game_BattlerBase['prototype'][_0x24e0d4(0x181)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x181)]=function(_0x4dfcb9){const _0x812cf0=_0x24e0d4;if(this['isActor']())this[_0x812cf0(0x27c)]=_0x812cf0(0x1eb);let _0x2950e6=VisuMZ[_0x812cf0(0x219)]['Game_BattlerBase_attackStatesRate'][_0x812cf0(0x146)](this,_0x4dfcb9);if(this[_0x812cf0(0x26e)]())this[_0x812cf0(0x27c)]=undefined;return _0x2950e6;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x351)]=Game_BattlerBase[_0x24e0d4(0x13f)]['addedSkillTypes'],Game_BattlerBase[_0x24e0d4(0x13f)]['addedSkillTypes']=function(){const _0x37e1ea=_0x24e0d4;if(this[_0x37e1ea(0x26e)]())this[_0x37e1ea(0x27c)]=_0x37e1ea(0x217);let _0x12128c=VisuMZ[_0x37e1ea(0x219)]['Game_BattlerBase_addedSkillTypes']['call'](this);if(this[_0x37e1ea(0x26e)]())this[_0x37e1ea(0x27c)]=undefined;return _0x12128c;},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x1a9)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x23a)],Game_BattlerBase['prototype'][_0x24e0d4(0x23a)]=function(){const _0x3a5426=_0x24e0d4;if(this[_0x3a5426(0x26e)]())this[_0x3a5426(0x27c)]=_0x3a5426(0x29c);let _0x5c8778=VisuMZ[_0x3a5426(0x219)][_0x3a5426(0x1a9)][_0x3a5426(0x146)](this);if(this['isActor']())this[_0x3a5426(0x27c)]=undefined;return _0x5c8778;},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x18d)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x359)],Game_BattlerBase[_0x24e0d4(0x13f)]['isEquipWtypeOk']=function(_0x1c300a){const _0x423999=_0x24e0d4;if(this[_0x423999(0x26e)]())this['_multiclassCheck']=_0x423999(0xbd);let _0x5ccf85=VisuMZ['ClassChangeSystem'][_0x423999(0x18d)][_0x423999(0x146)](this,_0x1c300a);if(this['isActor']())this[_0x423999(0x27c)]=undefined;return _0x5ccf85;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x19f)]=Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x22b)],Game_BattlerBase[_0x24e0d4(0x13f)][_0x24e0d4(0x22b)]=function(_0x276d8e){const _0x2af58b=_0x24e0d4;if(this[_0x2af58b(0x26e)]())this[_0x2af58b(0x27c)]=_0x2af58b(0x10b);let _0x48db54=VisuMZ[_0x2af58b(0x219)][_0x2af58b(0x19f)][_0x2af58b(0x146)](this,_0x276d8e);if(this[_0x2af58b(0x26e)]())this['_multiclassCheck']=undefined;return _0x48db54;},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x1a6)]=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x199)],Game_Actor['prototype']['traitObjects']=function(){const _0x304a19=_0x24e0d4;let _0x34e0f3=VisuMZ['ClassChangeSystem']['Game_Actor_traitObjects'][_0x304a19(0x146)](this);return this['_multiclassCheck']&&(_0x34e0f3=this[_0x304a19(0x2bd)](_0x34e0f3)),_0x34e0f3;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2bd)]=function(_0x304f23){const _0x52f127=_0x24e0d4;if(this['_multiclasses']===undefined)this[_0x52f127(0x2de)]();const _0x316b78=this[_0x52f127(0x27c)];let _0x9fceaa=_0x304f23['indexOf'](this[_0x52f127(0x1d0)]());const _0x4f4804=VisuMZ[_0x52f127(0x219)]['Settings'][_0x52f127(0x2d3)],_0x2f1812=_0x4f4804['length'];for(let _0xa66189=0x1;_0xa66189<_0x2f1812;_0xa66189++){let _0x340c4f=$dataClasses[this['_multiclasses'][_0xa66189]||0x0];if(!_0x340c4f)continue;if(_0x340c4f===this[_0x52f127(0x1d0)]())continue;const _0x162e9d=_0x4f4804[_0xa66189];if(!_0x162e9d)continue;_0x162e9d[this[_0x52f127(0x27c)]]&&_0x304f23[_0x52f127(0x15d)](++_0x9fceaa,0x0,_0x340c4f);}return _0x304f23;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x30e)]=function(_0x9df101,_0x4db232){const _0x54ddaa=_0x24e0d4;if(_0x9df101<=0x0)return;if(!_0x4db232)return;if(!$dataSystem[_0x54ddaa(0xdc)]&&!this[_0x54ddaa(0x1be)]())return;this[_0x54ddaa(0x1d6)]();const _0x23ed55=VisuMZ[_0x54ddaa(0x219)][_0x54ddaa(0x2ba)][_0x54ddaa(0x2d3)],_0x550f3e=_0x23ed55[_0x54ddaa(0x1d9)];for(let _0x40f2d1=0x1;_0x40f2d1<_0x550f3e;_0x40f2d1++){let _0x47a7e3=$dataClasses[this['_multiclasses'][_0x40f2d1]||0x0];if(!_0x47a7e3)continue;if(_0x47a7e3===this[_0x54ddaa(0x1d0)]())continue;const _0x5ccf49=_0x23ed55[_0x40f2d1];if(!_0x5ccf49)continue;if(this['gain%1Points'[_0x54ddaa(0x369)](_0x4db232)]){const _0x200f93=_0x5ccf49[_0x54ddaa(0xe2)],_0x303fe1=_0x200f93*_0x9df101;this[_0x54ddaa(0xc5)[_0x54ddaa(0x369)](_0x4db232)](_0x303fe1,this[_0x54ddaa(0xfa)][_0x40f2d1]);}}},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2e2)]=function(_0x756c64){const _0x12606e=_0x24e0d4;if(!_0x756c64)return;if(this[_0x12606e(0x307)]())return;this[_0x12606e(0x1d6)]();const _0x125d19=VisuMZ['ClassChangeSystem'][_0x12606e(0x2ba)][_0x12606e(0x2d3)],_0x33c126=_0x125d19['length'];for(let _0x2acf86=0x1;_0x2acf86<_0x33c126;_0x2acf86++){let _0x36c3a3=$dataClasses[this[_0x12606e(0xfa)][_0x2acf86]||0x0];if(!_0x36c3a3)continue;if(_0x36c3a3===this[_0x12606e(0x1d0)]())continue;const _0x3d4acf=_0x125d19[_0x2acf86];if(!_0x3d4acf)continue;const _0x231582=_0x3d4acf[_0x12606e(0x14e)],_0x3c9c1f=Math[_0x12606e(0xb3)](_0x756c64*_0x231582*this[_0x12606e(0x26c)]()),_0x42c411=this[_0x12606e(0xfa)][_0x2acf86];this[_0x12606e(0x32f)][_0x42c411]=this['_exp'][_0x42c411]||0x0;const _0x2589d4=this[_0x12606e(0x32f)][_0x42c411]+_0x3c9c1f;this[_0x12606e(0x30b)](_0x2589d4,_0x42c411);}},Game_Actor['prototype'][_0x24e0d4(0xc7)]=function(_0x4272de,_0x228992){const _0x4d5ccc=_0x24e0d4;if(this[_0x4d5ccc(0xfa)]===undefined)this['initMulticlass']();_0x228992-=0x1;if(_0x4272de<=0x0&&_0x228992<=0x0)return;this[_0x4d5ccc(0x192)](_0x4272de);const _0x198b39=this[_0x4d5ccc(0xfa)][_0x4d5ccc(0x1d9)];for(let _0x4375c7=0x0;_0x4375c7<_0x198b39;_0x4375c7++){this[_0x4d5ccc(0xfa)][_0x4375c7]===_0x4272de&&(this['_multiclasses'][_0x4375c7]=0x0);}this[_0x4d5ccc(0xfa)][0x0]=this[_0x4d5ccc(0x1d0)]()['id'];if(_0x228992<=0x0){this['changeClass'](_0x4272de);return;}const _0x5a387c=JsonEx[_0x4d5ccc(0x1c5)](this);_0x5a387c[_0x4d5ccc(0x289)]=!![],this[_0x4d5ccc(0xfa)][_0x228992]=_0x4272de,this[_0x4d5ccc(0x2c4)](),this['refresh'](),this[_0x4d5ccc(0xc2)](_0x5a387c),this[_0x4d5ccc(0x2c4)]();},Game_Actor['prototype'][_0x24e0d4(0x235)]=function(_0x38738c){const _0x35039c=_0x24e0d4;if(this[_0x35039c(0xfa)]===undefined)this[_0x35039c(0x2de)]();return this[_0x35039c(0xfa)][0x0]=this[_0x35039c(0x1d0)]()['id'],this[_0x35039c(0xfa)][_0x35039c(0x340)](_0x38738c)+0x1;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x239)]=function(){const _0xb6dbfe=_0x24e0d4;this['_classLevel']={},this[_0xb6dbfe(0xf1)][this[_0xb6dbfe(0x1d0)]()['id']]=this['level'];},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x307)]=function(){const _0x50c3dc=_0x24e0d4;return VisuMZ[_0x50c3dc(0x219)][_0x50c3dc(0x2ba)][_0x50c3dc(0x2bc)][_0x50c3dc(0x1de)];},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x16a)]=function(_0x13a644){const _0x2a7338=_0x24e0d4;if(this[_0x2a7338(0x307)]())return this[_0x2a7338(0x24f)];return this[_0x2a7338(0x2a6)](_0x13a644),this['_classLevel'][_0x13a644];},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x30b)]=function(_0x350ba0,_0x559e59){const _0x5046f8=_0x24e0d4;if(this[_0x5046f8(0x307)]())return this[_0x5046f8(0xde)](_0x350ba0);this['_exp'][_0x559e59]=Math['max'](_0x350ba0,0x0),this[_0x5046f8(0x2a6)](_0x559e59);if(_0x559e59===this['currentClass']()['id'])this[_0x5046f8(0x33d)]();},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2a6)]=function(_0x310f51){const _0x222a29=_0x24e0d4;if(this[_0x222a29(0x307)]())return;this[_0x222a29(0x32f)][_0x310f51]=this[_0x222a29(0x32f)][_0x310f51]||0x0,this[_0x222a29(0xf1)]=this['_classLevel']||{},this[_0x222a29(0xf1)][_0x310f51]=this[_0x222a29(0xf1)][_0x310f51]||0x1;while(!(this[_0x222a29(0xf1)][_0x310f51]>=this[_0x222a29(0x2c2)]())&&this[_0x222a29(0x32f)][_0x310f51]>=this[_0x222a29(0x36c)](_0x310f51,this['_classLevel'][_0x310f51])){this[_0x222a29(0xf1)][_0x310f51]+=0x1,this['classLevelUp'](_0x310f51);}while(this['_exp'][_0x310f51]<this['currentClassLevelExp'](_0x310f51,this[_0x222a29(0xf1)][_0x310f51])){this['_classLevel'][_0x310f51]-=0x1;}this['updateClassLearnedSkills']();},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x31b)]=function(_0x592c81,_0x3bc0a2){const _0x5f043b=_0x24e0d4,_0x39ac3a=$dataClasses[_0x592c81],_0x5081a7=_0x39ac3a[_0x5f043b(0x27d)][0x0],_0x414c18=_0x39ac3a[_0x5f043b(0x27d)][0x1],_0x533079=_0x39ac3a[_0x5f043b(0x27d)][0x2],_0x526d28=_0x39ac3a[_0x5f043b(0x27d)][0x3];return Math[_0x5f043b(0xb3)](_0x5081a7*Math[_0x5f043b(0x1fa)](_0x3bc0a2-0x1,0.9+_0x533079/0xfa)*_0x3bc0a2*(_0x3bc0a2+0x1)/(0x6+Math['pow'](_0x3bc0a2,0x2)/0x32/_0x526d28)+(_0x3bc0a2-0x1)*_0x414c18);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x36c)]=function(_0x3d09b2,_0x59e53f){const _0x31458b=_0x24e0d4;return this[_0x31458b(0x31b)](_0x3d09b2,_0x59e53f+0x1);},Game_Actor[_0x24e0d4(0x13f)]['currentClassLevelExp']=function(_0x24c0b5,_0x357cdc){const _0x3bd471=_0x24e0d4;return this[_0x3bd471(0x31b)](_0x24c0b5,_0x357cdc);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x362)]=function(_0x3c817a){const _0x349923=_0x24e0d4;this[_0x349923(0x31f)](_0x3c817a),this[_0x349923(0x322)](_0x3c817a),Imported[_0x349923(0x10c)]&&(this[_0x349923(0x15b)](_0x3c817a),this[_0x349923(0x2f1)](_0x3c817a));},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1a1)]=function(){const _0x548b0f=_0x24e0d4;if(this['_updateClassLearnedSkills'])return;this['_updateClassLearnedSkills']=!![];const _0x27df07=DataManager[_0x548b0f(0x121)](this);for(const _0x5680d3 of _0x27df07){if(!_0x5680d3)continue;const _0xab7938=_0x5680d3[_0x548b0f(0x291)];if(!_0xab7938)continue;for(const _0xdd490d of _0xab7938){if(this[_0x548b0f(0x25f)](_0xdd490d['skillId']))continue;if(this[_0x548b0f(0x16a)](_0x5680d3['id'])>=_0xdd490d[_0x548b0f(0x24f)]){const _0x1fd29f=this[_0x548b0f(0x2e8)]||{};this[_0x548b0f(0x275)](_0xdd490d[_0x548b0f(0x16b)]),this[_0x548b0f(0x2e8)]=_0x1fd29f;}}}this[_0x548b0f(0x29f)]=![];},VisuMZ[_0x24e0d4(0x219)]['Game_Actor_paramBase']=Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x19a)],Game_Actor[_0x24e0d4(0x13f)]['paramBase']=function(_0x45176a){const _0x3a01ee=_0x24e0d4;let _0x3d337e=VisuMZ[_0x3a01ee(0x219)][_0x3a01ee(0x33e)]['call'](this,_0x45176a);this[_0x3a01ee(0x1d6)]();const _0x276d59=VisuMZ[_0x3a01ee(0x219)]['Settings'][_0x3a01ee(0x2d3)],_0x4c572b=_0x3a01ee(0x298)['format'](_0x45176a),_0x11b230=_0x276d59[_0x3a01ee(0x1d9)];for(let _0x5e76e2=0x1;_0x5e76e2<_0x11b230;_0x5e76e2++){let _0x4bb3f0=$dataClasses[this['_multiclasses'][_0x5e76e2]||0x0];if(!_0x4bb3f0)continue;if(_0x4bb3f0===this['currentClass']())continue;const _0x4670b1=_0x276d59[_0x5e76e2];if(!_0x4670b1)continue;const _0x283e05=_0x4670b1[_0x4c572b];_0x3d337e+=_0x283e05*this[_0x3a01ee(0x32c)](this['_multiclasses'][_0x5e76e2],_0x45176a);}return _0x3d337e;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x32c)]=function(_0x34fe49,_0x93f630){const _0x3a168f=_0x24e0d4,_0x884b42=$dataClasses[_0x34fe49],_0x335d04=this[_0x3a168f(0x16a)](_0x34fe49);if(_0x335d04>0x63){const _0x43ab44=_0x884b42[_0x3a168f(0x360)][_0x93f630][0x63],_0x410baf=_0x884b42[_0x3a168f(0x360)][_0x93f630][0x62];return _0x43ab44+(_0x43ab44-_0x410baf)*(_0x335d04-0x63);}else return _0x884b42['params'][_0x93f630][_0x335d04];},Game_Actor[_0x24e0d4(0x13f)]['classExpRate']=function(_0x4cc869){const _0x4df7ed=_0x24e0d4;if(this[_0x4df7ed(0xf1)][_0x4cc869]>=this[_0x4df7ed(0x2c2)]())return 0x1;const _0x5b0352=this[_0x4df7ed(0x16a)](_0x4cc869),_0x34a093=this[_0x4df7ed(0x36c)](_0x4cc869,_0x5b0352)-this[_0x4df7ed(0x17f)](_0x4cc869,_0x5b0352);this[_0x4df7ed(0x32f)][_0x4cc869]=this[_0x4df7ed(0x32f)][_0x4cc869]||0x0;const _0x4c6bbd=this[_0x4df7ed(0x32f)][_0x4cc869]-this[_0x4df7ed(0x17f)](_0x4cc869,_0x5b0352);return(_0x4c6bbd/_0x34a093)[_0x4df7ed(0x123)](0x0,0x1);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x2d6)]=function(){const _0x2a2f15=_0x24e0d4;for(;;){const _0x3beb6e=DataManager[_0x2a2f15(0x27a)](this);if(_0x3beb6e[_0x2a2f15(0x1d9)]>0x0)for(const _0x461a0d of _0x3beb6e){this['unlockClass'](_0x461a0d);}else break;}},Game_Actor[_0x24e0d4(0x13f)]['initClassChangeRestrictions']=function(){const _0x476da2=_0x24e0d4;let _0x2f1d71=[];const _0x136cd7=VisuMZ[_0x476da2(0x219)][_0x476da2(0x36d)],_0x107bef=this[_0x476da2(0x334)]()[_0x476da2(0x24a)],_0x38de7b=_0x107bef[_0x476da2(0xc3)](_0x136cd7['RestrictClassChangeTier']);if(_0x38de7b)for(const _0x3bd19e of _0x38de7b){if(!_0x3bd19e)continue;_0x3bd19e[_0x476da2(0xc3)](_0x136cd7[_0x476da2(0x1e0)]);const _0x3686c6=String(RegExp['$1'])[_0x476da2(0x143)](',')[_0x476da2(0x1f0)](_0x1b5486=>Number(_0x1b5486));_0x2f1d71=_0x2f1d71[_0x476da2(0x213)](_0x3686c6);}_0x2f1d71=_0x2f1d71[_0x476da2(0x240)]((_0x41ad5d,_0x3fc3a7,_0x4296a8)=>_0x4296a8[_0x476da2(0x340)](_0x41ad5d)===_0x3fc3a7),_0x2f1d71[_0x476da2(0xb1)](null)[_0x476da2(0xb1)](undefined),_0x2f1d71['sort']((_0xa378d8,_0x551190)=>_0xa378d8-_0x551190),this[_0x476da2(0xd4)]=_0x2f1d71;},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x13a)]=function(_0x47a95e){const _0x2ad899=_0x24e0d4;return this['_classChangeTierRestrictions']===undefined&&this[_0x2ad899(0x1b2)](),this['_classChangeTierRestrictions'][_0x2ad899(0xe9)](_0x47a95e);},Game_Actor[_0x24e0d4(0x13f)][_0x24e0d4(0x1fd)]=function(_0x1861b7){const _0x26a1a1=_0x24e0d4;this[_0x26a1a1(0xd4)]===undefined&&this[_0x26a1a1(0x1b2)]();if(this['_classChangeTierRestrictions'][_0x26a1a1(0xe9)](_0x1861b7))return;this[_0x26a1a1(0xd4)][_0x26a1a1(0x2d4)](_0x1861b7),this[_0x26a1a1(0xd4)][_0x26a1a1(0x270)]((_0x4fa84a,_0x111b45)=>_0x4fa84a-_0x111b45);},Game_Actor[_0x24e0d4(0x13f)]['removeClassChangeTierRestriction']=function(_0x5c6c2d){const _0x5d52cf=_0x24e0d4;this['_classChangeTierRestrictions']===undefined&&this[_0x5d52cf(0x1b2)]();if(!this[_0x5d52cf(0xd4)][_0x5d52cf(0xe9)](_0x5c6c2d))return;this[_0x5d52cf(0xd4)][_0x5d52cf(0xb1)](_0x5c6c2d),this[_0x5d52cf(0xd4)][_0x5d52cf(0x270)]((_0x3d50f7,_0x34aeb5)=>_0x3d50f7-_0x34aeb5);},Game_Enemy['prototype'][_0x24e0d4(0x2fe)]=function(){const _0x5a1e54=_0x24e0d4,_0x4ee51f=VisuMZ[_0x5a1e54(0x219)][_0x5a1e54(0x2ba)][_0x5a1e54(0x1e8)],_0x326743=VisuMZ[_0x5a1e54(0x219)][_0x5a1e54(0x36d)],_0x13a7b7=this['enemy']()[_0x5a1e54(0x24a)];if(_0x13a7b7[_0x5a1e54(0xc3)](_0x326743[_0x5a1e54(0x330)]))try{return eval(RegExp['$1']);}catch(_0x4c6a85){if($gameTemp['isPlaytest']())console[_0x5a1e54(0x363)](_0x4c6a85);return 0x0;}try{return eval(_0x4ee51f[_0x5a1e54(0x1ad)]);}catch(_0x295883){if($gameTemp['isPlaytest']())console[_0x5a1e54(0x363)](_0x295883);return 0x0;}},Game_Enemy[_0x24e0d4(0x13f)][_0x24e0d4(0x23c)]=function(){const _0x4b67b7=_0x24e0d4,_0x34bad9=VisuMZ[_0x4b67b7(0x219)][_0x4b67b7(0x2ba)][_0x4b67b7(0xd8)],_0x12f6e2=VisuMZ[_0x4b67b7(0x219)][_0x4b67b7(0x36d)],_0x5e3154=this[_0x4b67b7(0x332)]()['note'];if(_0x5e3154[_0x4b67b7(0xc3)](_0x12f6e2[_0x4b67b7(0x1bc)]))try{return eval(RegExp['$1']);}catch(_0x189962){if($gameTemp[_0x4b67b7(0x280)]())console[_0x4b67b7(0x363)](_0x189962);return 0x0;}try{return eval(_0x34bad9[_0x4b67b7(0x1ad)]);}catch(_0x57437a){if($gameTemp[_0x4b67b7(0x280)]())console['log'](_0x57437a);return 0x0;}},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x11f)]=Game_Party[_0x24e0d4(0x13f)][_0x24e0d4(0x187)],Game_Party[_0x24e0d4(0x13f)]['initialize']=function(){const _0x595bd9=_0x24e0d4;VisuMZ[_0x595bd9(0x219)][_0x595bd9(0x11f)][_0x595bd9(0x146)](this),this['initClassChangeUnlocks']();},Game_Party[_0x24e0d4(0x13f)][_0x24e0d4(0x257)]=function(){const _0x273ef3=_0x24e0d4;this[_0x273ef3(0x27b)]=[];},Game_Party[_0x24e0d4(0x13f)]['getUnlockedClasses']=function(){const _0x2fc597=_0x24e0d4;if(this['_unlockedClasses']===undefined)this[_0x2fc597(0x257)]();return this[_0x2fc597(0x27b)];},Game_Party[_0x24e0d4(0x13f)][_0x24e0d4(0x192)]=function(_0x534a45){const _0x1b3b31=_0x24e0d4;for(const _0x978ac5 of this[_0x1b3b31(0x34d)]()){if(!_0x978ac5)continue;_0x978ac5[_0x1b3b31(0x192)](_0x534a45);}if(this['_unlockedClasses']===undefined)this[_0x1b3b31(0x257)]();if(this[_0x1b3b31(0x27b)]['includes'](_0x534a45))return;this[_0x1b3b31(0x27b)][_0x1b3b31(0x2d4)](_0x534a45),this[_0x1b3b31(0x27b)][_0x1b3b31(0x270)](function(_0x279a07,_0x49b978){return _0x279a07-_0x49b978;});},Game_Party[_0x24e0d4(0x13f)]['removeUnlockedClass']=function(_0xf3c0f1){const _0x17afbb=_0x24e0d4;for(const _0x428d06 of this['allMembers']()){if(!_0x428d06)continue;_0x428d06[_0x17afbb(0x304)](_0xf3c0f1);}if(this[_0x17afbb(0x27b)]===undefined)this[_0x17afbb(0x257)]();if(!this[_0x17afbb(0x27b)][_0x17afbb(0xe9)](_0xf3c0f1))return;this['_unlockedClasses']['remove'](_0xf3c0f1)[_0x17afbb(0xb1)](null),this['_unlockedClasses'][_0x17afbb(0x270)](function(_0x58a819,_0xa759e1){return _0x58a819-_0xa759e1;});},Game_Party['prototype'][_0x24e0d4(0x2e5)]=function(){const _0xa2520c=_0x24e0d4,_0x30ab7c=this[_0xa2520c(0x34d)]();return Math[_0xa2520c(0x1f1)](...this[_0xa2520c(0x2d0)]()[_0xa2520c(0x1f0)](_0x5bbbb0=>_0x5bbbb0[_0xa2520c(0x162)]()));},Game_Troop[_0x24e0d4(0x13f)][_0x24e0d4(0x184)]=function(){const _0x1875f8=_0x24e0d4;return this['deadMembers']()[_0x1875f8(0x302)]((_0x1ba35d,_0xde5a73)=>_0x1ba35d+_0xde5a73[_0x1875f8(0x2fe)](),0x0);},Game_Troop[_0x24e0d4(0x13f)][_0x24e0d4(0x34e)]=function(){const _0x2f2daf=_0x24e0d4;return this[_0x2f2daf(0x155)]()['reduce']((_0x40eb87,_0x1d14ab)=>_0x40eb87+_0x1d14ab[_0x2f2daf(0x23c)](),0x0);},VisuMZ['ClassChangeSystem'][_0x24e0d4(0x183)]=Scene_Menu[_0x24e0d4(0x13f)][_0x24e0d4(0x30d)],Scene_Menu[_0x24e0d4(0x13f)][_0x24e0d4(0x30d)]=function(){const _0x33f897=_0x24e0d4;VisuMZ[_0x33f897(0x219)][_0x33f897(0x183)][_0x33f897(0x146)](this);const _0xd9d4=this[_0x33f897(0x2da)];_0xd9d4['setHandler']('ClassChangeSystem',this[_0x33f897(0x262)][_0x33f897(0x1d3)](this));},VisuMZ[_0x24e0d4(0x219)]['Scene_Menu_onPersonalOk']=Scene_Menu[_0x24e0d4(0x13f)][_0x24e0d4(0x211)],Scene_Menu['prototype'][_0x24e0d4(0x211)]=function(){const _0x144686=_0x24e0d4;this[_0x144686(0x2da)][_0x144686(0x224)]()===_0x144686(0x219)?SceneManager[_0x144686(0x2d4)](Scene_ClassChange):VisuMZ['ClassChangeSystem'][_0x144686(0x274)][_0x144686(0x146)](this);};function Scene_ClassChange(){const _0x537480=_0x24e0d4;this[_0x537480(0x187)](...arguments);}Scene_ClassChange[_0x24e0d4(0x13f)]=Object[_0x24e0d4(0xef)](Scene_MenuBase[_0x24e0d4(0x13f)]),Scene_ClassChange[_0x24e0d4(0x13f)]['constructor']=Scene_ClassChange,Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x187)]=function(){const _0x5b79cb=_0x24e0d4;Scene_MenuBase[_0x5b79cb(0x13f)][_0x5b79cb(0x187)][_0x5b79cb(0x146)](this),this[_0x5b79cb(0x2a2)]=this[_0x5b79cb(0x2a2)]||[];},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0xcc)]=function(){return!![];},Scene_ClassChange[_0x24e0d4(0x13f)]['arePageButtonsEnabled']=function(){const _0xa32d09=_0x24e0d4;return this[_0xa32d09(0x1ae)]()>0x1?this[_0xa32d09(0x331)]&&this[_0xa32d09(0x331)][_0xa32d09(0x32d)]:this['_classListWindow']&&this[_0xa32d09(0x23b)][_0xa32d09(0x32d)];},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0xf3)]=function(){const _0x1e90b8=_0x24e0d4;Scene_MenuBase['prototype'][_0x1e90b8(0xf3)]['call'](this),this[_0x1e90b8(0x370)]();},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x100)]=function(){return!![];},Scene_ClassChange[_0x24e0d4(0x13f)]['isBottomHelpMode']=function(){const _0x35593a=_0x24e0d4;if(ConfigManager[_0x35593a(0x35e)]&&ConfigManager[_0x35593a(0x2cc)]!==undefined)return ConfigManager[_0x35593a(0x2cc)];else{if(this[_0x35593a(0x178)]())return this['updatedLayoutStyle']()[_0x35593a(0xc3)](/LOWER/i);else Scene_MenuBase['prototype']['isRightInputMode'][_0x35593a(0x146)](this);}},Scene_ClassChange[_0x24e0d4(0x13f)]['isRightInputMode']=function(){const _0x4d69df=_0x24e0d4;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x4d69df(0x129)];else{if(this[_0x4d69df(0x178)]())return this[_0x4d69df(0x346)]()[_0x4d69df(0xc3)](/RIGHT/i);else Scene_MenuBase[_0x4d69df(0x13f)]['isRightInputMode'][_0x4d69df(0x146)](this);}},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x346)]=function(){const _0x2f2314=_0x24e0d4;return VisuMZ[_0x2f2314(0x219)][_0x2f2314(0x2ba)][_0x2f2314(0x273)]['LayoutStyle'];},Scene_ClassChange['prototype'][_0x24e0d4(0x178)]=function(){const _0x260ce4=_0x24e0d4;return VisuMZ[_0x260ce4(0x219)][_0x260ce4(0x2ba)][_0x260ce4(0x273)]['EnableLayout'];},Scene_ClassChange['prototype']['create']=function(){const _0x3ebaa6=_0x24e0d4;Scene_MenuBase[_0x3ebaa6(0x13f)][_0x3ebaa6(0xef)][_0x3ebaa6(0x146)](this),this['createHelpWindow'](),this[_0x3ebaa6(0x193)](),this[_0x3ebaa6(0x325)](),this[_0x3ebaa6(0x1af)](),this[_0x3ebaa6(0x35d)](),this[_0x3ebaa6(0x218)]();},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x193)]=function(){const _0xd2f0a7=_0x24e0d4,_0x5a70be=this['statusWindowRect']();this[_0xd2f0a7(0x201)]=new Window_ClassStatus(_0x5a70be),this['addWindow'](this[_0xd2f0a7(0x201)]),this['_statusWindow'][_0xd2f0a7(0x1e4)](VisuMZ[_0xd2f0a7(0x219)][_0xd2f0a7(0x2ba)][_0xd2f0a7(0x273)][_0xd2f0a7(0x142)]);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x1fc)]=function(){const _0x278f1c=_0x24e0d4,_0x7441a0=VisuMZ[_0x278f1c(0x219)][_0x278f1c(0x2ba)]['Window'];if(_0x7441a0['Window_ClassStatus_RectJS'])return _0x7441a0[_0x278f1c(0x1bf)][_0x278f1c(0x146)](this);const _0x168e8a=Math[_0x278f1c(0x2b4)](Graphics[_0x278f1c(0x263)]/0x2),_0xf11d36=this[_0x278f1c(0x1bd)](),_0x2177cb=this[_0x278f1c(0x1c9)]()?0x0:_0x168e8a,_0x40eb00=this[_0x278f1c(0x373)]();return new Rectangle(_0x2177cb,_0x40eb00,_0x168e8a,_0xf11d36);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x325)]=function(){const _0x45e3ec=_0x24e0d4,_0xf4c071=this[_0x45e3ec(0x24e)](),_0x34267e=new Window_ClassTier(_0xf4c071);_0x34267e[_0x45e3ec(0x154)](this[_0x45e3ec(0x249)]),_0x34267e[_0x45e3ec(0x1e4)](VisuMZ[_0x45e3ec(0x219)][_0x45e3ec(0x2ba)][_0x45e3ec(0x273)][_0x45e3ec(0x269)]),this[_0x45e3ec(0x150)](_0x34267e),this[_0x45e3ec(0x331)]=_0x34267e,_0x34267e[_0x45e3ec(0xd6)]('cancel',this[_0x45e3ec(0x2b0)][_0x45e3ec(0x1d3)](this)),this[_0x45e3ec(0x1ae)]()>0x1&&(_0x34267e['setHandler'](_0x45e3ec(0x352),this[_0x45e3ec(0x175)][_0x45e3ec(0x1d3)](this)),_0x34267e[_0x45e3ec(0xd6)]('pageup',this['previousActor'][_0x45e3ec(0x1d3)](this))),_0x34267e[_0x45e3ec(0xd6)](_0x45e3ec(0x282),this['onMulticlassOk']['bind'](this));},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x24e)]=function(){const _0x1486c1=_0x24e0d4,_0x1d1f0e=VisuMZ[_0x1486c1(0x219)]['Settings']['Window'];if(_0x1d1f0e[_0x1486c1(0x24b)])return _0x1d1f0e['Window_ClassTier_RectJS'][_0x1486c1(0x146)](this);const _0x3e6909=Graphics[_0x1486c1(0x263)]-this[_0x1486c1(0x201)][_0x1486c1(0x347)],_0x5bf521=this[_0x1486c1(0x1bd)](),_0x20c065=this[_0x1486c1(0x1c9)]()?_0x3e6909:0x0,_0x5b9fed=this[_0x1486c1(0x373)]();return new Rectangle(_0x20c065,_0x5b9fed,_0x3e6909,_0x5bf521);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x1af)]=function(){const _0x13bd2b=_0x24e0d4,_0x4d7028=this['classListWindowRect'](),_0x3ce59b=new Window_ClassList(_0x4d7028);_0x3ce59b[_0x13bd2b(0x154)](this[_0x13bd2b(0x249)]),_0x3ce59b[_0x13bd2b(0x1f6)](this[_0x13bd2b(0x201)]),_0x3ce59b[_0x13bd2b(0x1e4)](VisuMZ[_0x13bd2b(0x219)][_0x13bd2b(0x2ba)][_0x13bd2b(0x273)][_0x13bd2b(0x1b3)]),this[_0x13bd2b(0x150)](_0x3ce59b),this[_0x13bd2b(0x23b)]=_0x3ce59b,_0x3ce59b[_0x13bd2b(0xd6)](_0x13bd2b(0x15f),this[_0x13bd2b(0x2f3)][_0x13bd2b(0x1d3)](this)),this[_0x13bd2b(0x1ae)]()<=0x1&&(_0x3ce59b[_0x13bd2b(0xd6)](_0x13bd2b(0x352),this[_0x13bd2b(0x175)][_0x13bd2b(0x1d3)](this)),_0x3ce59b['setHandler'](_0x13bd2b(0xb8),this[_0x13bd2b(0x29a)]['bind'](this))),_0x3ce59b['setHandler'](_0x13bd2b(0x2c1),this[_0x13bd2b(0x2b2)]['bind'](this));},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x295)]=function(){const _0x3a5589=_0x24e0d4,_0x12de01=VisuMZ[_0x3a5589(0x219)][_0x3a5589(0x2ba)]['Window'];if(_0x12de01[_0x3a5589(0x2d9)])return _0x12de01['Window_ClassList_RectJS'][_0x3a5589(0x146)](this);const _0x8b8eab=Graphics[_0x3a5589(0x263)]-this[_0x3a5589(0x201)][_0x3a5589(0x347)],_0x33710e=this['mainAreaHeight'](),_0x44a894=this[_0x3a5589(0x1c9)]()?_0x8b8eab:0x0,_0x4d589a=this[_0x3a5589(0x373)]();return new Rectangle(_0x44a894,_0x4d589a,_0x8b8eab,_0x33710e);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x1ae)]=function(){const _0x5e6aa1=_0x24e0d4;if(this[_0x5e6aa1(0x113)]!==undefined)return this[_0x5e6aa1(0x113)];return this['_highestTier']=$gameParty[_0x5e6aa1(0x2e5)](),this['_highestTier'];},Scene_ClassChange[_0x24e0d4(0x13f)]['determineActiveWindow']=function(){const _0x4e4eee=_0x24e0d4;this['highestTier']()>0x1?(this[_0x4e4eee(0x331)][_0x4e4eee(0x120)](0x0),this['_classTierWindow'][_0x4e4eee(0x2aa)](),this['_classTierWindow'][_0x4e4eee(0x1d7)](),this[_0x4e4eee(0x23b)][_0x4e4eee(0x22d)](),this[_0x4e4eee(0x23b)][_0x4e4eee(0x1b1)]()):(this['_classListWindow'][_0x4e4eee(0x120)](0x0),this[_0x4e4eee(0x23b)][_0x4e4eee(0x315)](0x1),this[_0x4e4eee(0x23b)][_0x4e4eee(0x2aa)](),this[_0x4e4eee(0x23b)][_0x4e4eee(0x1d7)](),this[_0x4e4eee(0x331)][_0x4e4eee(0x22d)](),this[_0x4e4eee(0x331)][_0x4e4eee(0x1b1)]());},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x218)]=function(){const _0x2f724d=_0x24e0d4,_0x4f37b4=this['actor']();_0x4f37b4[_0x2f724d(0x2d6)](),this['_statusWindow'][_0x2f724d(0x35f)](_0x4f37b4),this['_classTierWindow'][_0x2f724d(0x35f)](_0x4f37b4),this[_0x2f724d(0x23b)]['setActor'](_0x4f37b4);},Scene_ClassChange['prototype'][_0x24e0d4(0x33c)]=function(){const _0x2af554=_0x24e0d4;Scene_MenuBase[_0x2af554(0x13f)]['onActorChange']['call'](this),this[_0x2af554(0x218)](),this[_0x2af554(0x35d)]();},Scene_ClassChange[_0x24e0d4(0x13f)]['onMulticlassOk']=function(){const _0x42b0a3=_0x24e0d4,_0x148dca=this['_classTierWindow'][_0x42b0a3(0x251)]();this[_0x42b0a3(0x23b)]['setTier'](_0x148dca),this['_classListWindow'][_0x42b0a3(0x2aa)](),this[_0x42b0a3(0x23b)][_0x42b0a3(0x1d7)](),this['_classListWindow']['forceSelect'](0x0),this[_0x42b0a3(0x331)][_0x42b0a3(0x22d)](),this[_0x42b0a3(0x331)]['deactivate'](),this['forceRemoveClassChangeAnimations']();},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x2f3)]=function(){const _0x4cc02a=_0x24e0d4;this[_0x4cc02a(0x1ae)]()>0x1?(this[_0x4cc02a(0x331)]['show'](),this['_classTierWindow']['activate'](),this[_0x4cc02a(0x23b)][_0x4cc02a(0x22d)](),this[_0x4cc02a(0x23b)][_0x4cc02a(0x1b1)](),this[_0x4cc02a(0x201)][_0x4cc02a(0x2ff)](null)):this[_0x4cc02a(0x2b0)]();},Scene_ClassChange[_0x24e0d4(0x13f)]['onClassListOk']=function(){const _0x5b3dbb=_0x24e0d4,_0x14640d=this[_0x5b3dbb(0x23b)]['_tier'],_0x2c1d3b=this[_0x5b3dbb(0x23b)]['currentExt'](),_0x5d570b=this['_classListWindow'][_0x5b3dbb(0x2cf)](),_0x9f46aa=_0x2c1d3b?_0x2c1d3b['id']:0x0;this[_0x5b3dbb(0x180)][_0x5b3dbb(0xc7)](_0x9f46aa,_0x14640d),this[_0x5b3dbb(0x331)][_0x5b3dbb(0x33d)](),this[_0x5b3dbb(0x23b)][_0x5b3dbb(0x33d)](),this['_statusWindow'][_0x5b3dbb(0x2ff)](null),this['startClassChangeAnimation'](_0x9f46aa,_0x14640d),this['determineActiveWindow']();if(this[_0x5b3dbb(0x331)][_0x5b3dbb(0x32d)])this[_0x5b3dbb(0x331)][_0x5b3dbb(0x170)](_0x14640d-0x1);else this[_0x5b3dbb(0x23b)][_0x5b3dbb(0x32d)]&&this['_classListWindow'][_0x5b3dbb(0x170)](_0x5d570b);},Scene_ClassChange['prototype'][_0x24e0d4(0x308)]=function(_0x57ef61,_0x517f14){const _0x52fe50=_0x24e0d4,_0x298cfd=this[_0x52fe50(0x1e1)](_0x517f14);this[_0x52fe50(0x372)](_0x57ef61,_0x517f14,_0x298cfd);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x1e1)]=function(_0x1e59fc){const _0x369e83=_0x24e0d4,_0x51d9e9=new Sprite(),_0x21736b=VisuMZ['ClassChangeSystem']['Settings'][_0x369e83(0x273)];if(_0x1e59fc<=0x1){const _0x4c11ad=this[_0x369e83(0x201)];_0x51d9e9['x']=_0x4c11ad['x']+Math[_0x369e83(0xb3)](_0x4c11ad[_0x369e83(0x347)]/0x2),_0x51d9e9['y']=_0x4c11ad['y']+Math['round'](_0x4c11ad[_0x369e83(0x232)]/0x2),_0x51d9e9['x']+=_0x21736b[_0x369e83(0x2d8)]||0x0,_0x51d9e9['y']+=_0x21736b[_0x369e83(0xcd)]||0x0;}else{const _0x53224e=this[_0x369e83(0x331)],_0x3fb568=_0x53224e[_0x369e83(0x355)](_0x53224e[_0x369e83(0x2cf)]()),_0x387de3=_0x53224e[_0x369e83(0x271)]||0x0;_0x51d9e9['x']=_0x53224e['x']+_0x3fb568['x']+Math[_0x369e83(0xb3)](_0x3fb568['width']/0x2)+_0x387de3,_0x51d9e9['y']=_0x53224e['y']+_0x3fb568['y']+Math[_0x369e83(0xb3)](_0x3fb568[_0x369e83(0x232)]/0x2)+_0x387de3,_0x51d9e9['x']+=_0x21736b[_0x369e83(0x309)]||0x0,_0x51d9e9['y']+=_0x21736b[_0x369e83(0x137)]||0x0;}return _0x51d9e9['x']+=this[_0x369e83(0x2ee)]['x'],_0x51d9e9['y']+=this[_0x369e83(0x2ee)]['y'],_0x51d9e9;},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x372)]=function(_0x4f0118,_0x4cd7ed,_0x1d003c){const _0x366a07=_0x24e0d4,_0x33d539=this[_0x366a07(0x1c2)](_0x4f0118),_0x4d0e29=$dataAnimations[_0x33d539];if(!_0x4d0e29)return;const _0x2c29b7=this[_0x366a07(0x14a)](_0x4d0e29),_0x30c2cf=new(_0x2c29b7?Sprite_AnimationMV:Sprite_Animation)(),_0x15c664=[_0x1d003c],_0x2c3429=0x0;_0x30c2cf[_0x366a07(0x301)](_0x15c664,_0x4d0e29,![],_0x2c3429,null),_0x30c2cf[_0x366a07(0x31c)]=_0x4cd7ed,this[_0x366a07(0xca)](_0x1d003c),this[_0x366a07(0xca)](_0x30c2cf),this[_0x366a07(0x2a2)][_0x366a07(0x2d4)](_0x30c2cf);},Scene_ClassChange[_0x24e0d4(0x23f)]=VisuMZ['ClassChangeSystem'][_0x24e0d4(0x2ba)][_0x24e0d4(0x273)]['AllowClearClassAni']??!![],Scene_ClassChange[_0x24e0d4(0x13f)]['getClassChangeAnimationID']=function(_0x3f3a24){const _0x280629=_0x24e0d4,_0x40b83a=$dataClasses[_0x3f3a24];if(_0x40b83a){const _0x1b58bc=VisuMZ[_0x280629(0x219)][_0x280629(0x36d)],_0x5a7655=_0x40b83a[_0x280629(0x24a)];if(_0x5a7655[_0x280629(0xc3)](_0x1b58bc['ClassChangeAnimation']))return Number(RegExp['$1']);}else{if(!Scene_ClassChange['PLAY_ANI_FOR_UNASSIGN'])return 0x0;}return VisuMZ[_0x280629(0x219)]['Settings'][_0x280629(0x273)][_0x280629(0xf0)];},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x14a)]=function(_0x4d40b5){const _0x333dd3=_0x24e0d4;return!!_0x4d40b5[_0x333dd3(0x21d)];},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x370)]=function(){const _0x1c6cce=_0x24e0d4,_0x1216a6=[];for(const _0x36cb5f of this[_0x1c6cce(0x2a2)]){if(!_0x36cb5f)continue;if(_0x36cb5f[_0x1c6cce(0x1ce)]())continue;_0x1216a6[_0x1c6cce(0x2d4)](_0x36cb5f);}for(const _0x39e7ab of _0x1216a6){if(!_0x39e7ab)continue;for(const _0x26eeac of _0x39e7ab[_0x1c6cce(0x1c3)]){this['removeChild'](_0x26eeac);}this[_0x1c6cce(0x2a2)]['remove'](_0x39e7ab),this[_0x1c6cce(0x2b1)](_0x39e7ab);};},Scene_ClassChange[_0x24e0d4(0x13f)]['forceRemoveClassChangeAnimations']=function(){const _0x56de93=_0x24e0d4,_0x5a765b=[];for(const _0x2af2c1 of this[_0x56de93(0x2a2)]){if(!_0x2af2c1)continue;if(_0x2af2c1[_0x56de93(0x31c)]<=0x1)continue;_0x5a765b[_0x56de93(0x2d4)](_0x2af2c1);}for(const _0x412ae2 of _0x5a765b){if(!_0x412ae2)continue;for(const _0x16a950 of _0x412ae2[_0x56de93(0x1c3)]){this[_0x56de93(0x2b1)](_0x16a950);}this[_0x56de93(0x2a2)][_0x56de93(0xb1)](_0x412ae2),this[_0x56de93(0x2b1)](_0x412ae2);};},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x151)]=function(){const _0x63abe4=_0x24e0d4;if(!this[_0x63abe4(0x331)])return![];if(!this[_0x63abe4(0x331)][_0x63abe4(0x32d)])return![];return this[_0x63abe4(0x331)][_0x63abe4(0x141)]();},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x276)]=function(){const _0x5e9bc8=_0x24e0d4;if(this[_0x5e9bc8(0x151)]())return TextManager[_0x5e9bc8(0x2e6)](_0x5e9bc8(0x109));return Scene_MenuBase[_0x5e9bc8(0x13f)][_0x5e9bc8(0x276)][_0x5e9bc8(0x146)](this);},Scene_ClassChange['prototype'][_0x24e0d4(0x1e5)]=function(){const _0x360862=_0x24e0d4;if(this[_0x360862(0x151)]())return TextManager[_0x360862(0x2e0)];return Scene_MenuBase['prototype'][_0x360862(0x1e5)]['call'](this);},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x26a)]=function(){const _0x32c18c=_0x24e0d4;if(this[_0x32c18c(0x151)]())return this[_0x32c18c(0x267)][_0x32c18c(0x347)]/0x5/-0x3;return Scene_MenuBase[_0x32c18c(0x13f)][_0x32c18c(0x26a)][_0x32c18c(0x146)](this);},Scene_ClassChange['prototype']['createBackground']=function(){const _0x1a5e88=_0x24e0d4;Scene_MenuBase[_0x1a5e88(0x13f)][_0x1a5e88(0x1a2)][_0x1a5e88(0x146)](this),this['setBackgroundOpacity'](this[_0x1a5e88(0xfb)]()),this['createCustomBackgroundImages']();},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0xfb)]=function(){const _0x343176=_0x24e0d4;return VisuMZ[_0x343176(0x219)][_0x343176(0x2ba)]['BgSettings'][_0x343176(0x17a)];},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x2b5)]=function(){const _0x38dfff=_0x24e0d4,_0x322db4=VisuMZ[_0x38dfff(0x219)]['Settings']['BgSettings'];_0x322db4&&(_0x322db4[_0x38dfff(0x1cc)]!==''||_0x322db4[_0x38dfff(0x1a0)]!=='')&&(this[_0x38dfff(0x2ef)]=new Sprite(ImageManager['loadTitle1'](_0x322db4[_0x38dfff(0x1cc)]||'')),this[_0x38dfff(0xc4)]=new Sprite(ImageManager[_0x38dfff(0x14b)](_0x322db4[_0x38dfff(0x1a0)]||'')),this[_0x38dfff(0xca)](this['_backSprite1']),this[_0x38dfff(0xca)](this[_0x38dfff(0xc4)]),this[_0x38dfff(0x2ef)][_0x38dfff(0x287)][_0x38dfff(0x233)](this[_0x38dfff(0x246)][_0x38dfff(0x1d3)](this,this[_0x38dfff(0x2ef)])),this[_0x38dfff(0xc4)][_0x38dfff(0x287)]['addLoadListener'](this['adjustSprite']['bind'](this,this[_0x38dfff(0xc4)])));},Scene_ClassChange[_0x24e0d4(0x13f)][_0x24e0d4(0x246)]=function(_0xc482fe){const _0xf3e3f1=_0x24e0d4;this[_0xf3e3f1(0x356)](_0xc482fe),this['centerSprite'](_0xc482fe);},Window_Base['CLASS_CHANGE_SHOW_CLASS_LEVEL']=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x273)][_0x24e0d4(0x24c)]??!![],Window_Base['prototype'][_0x24e0d4(0x214)]=function(_0x499930,_0x3766a0,_0x401022,_0x16f621,_0x1cd012){const _0x311624=_0x24e0d4;_0x1cd012=_0x1cd012||'left';const _0x4f445e='\x5cI[%1]'[_0x311624(0x369)](ImageManager[_0x311624(0x221)]),_0x562097=TextManager[_0x311624(0x36b)],_0x2b9ff5=_0x562097[_0x311624(0x369)](_0x499930,TextManager[_0x311624(0x16c)],_0x4f445e,TextManager[_0x311624(0x16f)]),_0x33081c=this[_0x311624(0x24d)](_0x2b9ff5)[_0x311624(0x347)];if(_0x1cd012===_0x311624(0x36e))_0x3766a0+=0x0;else _0x1cd012===_0x311624(0x256)?_0x3766a0+=Math[_0x311624(0xb3)]((_0x16f621-_0x33081c)/0x2):_0x3766a0+=_0x16f621-_0x33081c;this[_0x311624(0x374)](_0x2b9ff5,_0x3766a0,_0x401022);},Window_Base[_0x24e0d4(0x13f)][_0x24e0d4(0x1db)]=function(_0x54c7b1,_0x101e7e,_0x43775c,_0xb7fb13,_0xba13c,_0x5ae2df){const _0x4b65b5=_0x54c7b1['getClassPoints'](_0x101e7e);this['drawClassPoints'](_0x4b65b5,_0x43775c,_0xb7fb13,_0xba13c,_0x5ae2df);},Window_Base[_0x24e0d4(0x13f)][_0x24e0d4(0x316)]=function(_0x43717b,_0x5b6fb7,_0x169cea,_0x291c72,_0x3d2f40){const _0x1f46c5=_0x24e0d4;_0x3d2f40=_0x3d2f40||_0x1f46c5(0x36e);const _0x2b8553=_0x1f46c5(0x33f)[_0x1f46c5(0x369)](ImageManager[_0x1f46c5(0x26f)]),_0x29c4ab=TextManager[_0x1f46c5(0x101)],_0x4f783e=_0x29c4ab['format'](_0x43717b,TextManager['jobPointsAbbr'],_0x2b8553,TextManager[_0x1f46c5(0x18b)]),_0x150d72=this[_0x1f46c5(0x24d)](_0x4f783e)[_0x1f46c5(0x347)];if(_0x3d2f40===_0x1f46c5(0x36e))_0x5b6fb7+=0x0;else _0x3d2f40===_0x1f46c5(0x256)?_0x5b6fb7+=Math[_0x1f46c5(0xb3)]((_0x291c72-_0x150d72)/0x2):_0x5b6fb7+=_0x291c72-_0x150d72;this['drawTextEx'](_0x4f783e,_0x5b6fb7,_0x169cea);},Window_Base['prototype'][_0x24e0d4(0x335)]=function(_0x53e8f0,_0x3cc8f2,_0x4d72c4,_0xcc3a96,_0x2b4b07,_0x23e608){const _0x8533f4=_0x24e0d4,_0x52acf4=_0x53e8f0[_0x8533f4(0x2d1)](_0x3cc8f2);this[_0x8533f4(0x316)](_0x52acf4,_0x4d72c4,_0xcc3a96,_0x2b4b07,_0x23e608);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x365)]=Window_Base[_0x24e0d4(0x13f)][_0x24e0d4(0x156)],Window_Base[_0x24e0d4(0x13f)][_0x24e0d4(0x156)]=function(_0x3dd524,_0x227c9d,_0x3183a4){const _0x10f3a6=_0x24e0d4;if(_0x3dd524===$dataClasses){const _0xded2f0=_0x3dd524[_0x227c9d];let _0x58f8dd='';if(_0xded2f0&&_0x3183a4&&_0xded2f0[_0x10f3a6(0x12c)]){const _0x10d371=_0x10f3a6(0x158);let _0x2f0824=_0xded2f0[_0x10f3a6(0x2c5)];_0x2f0824=_0x2f0824[_0x10f3a6(0x21a)](/\\I\[(\d+)\]/gi,''),_0x58f8dd=_0x10d371[_0x10f3a6(0x369)](_0xded2f0[_0x10f3a6(0x12c)],_0x2f0824);}else{if(_0xded2f0){let _0x2e17ee=_0xded2f0['name'];_0x2e17ee=_0x2e17ee[_0x10f3a6(0x21a)](/\\I\[(\d+)\]/gi,''),_0x58f8dd=_0x2e17ee;}else _0x58f8dd='';}return this['isAutoColorAffected']()&&(_0x58f8dd=this[_0x10f3a6(0x2c9)](_0x58f8dd,_0x3dd524)),_0x58f8dd;}return VisuMZ[_0x10f3a6(0x219)][_0x10f3a6(0x365)][_0x10f3a6(0x146)](this,_0x3dd524,_0x227c9d,_0x3183a4);},Window_Base[_0x24e0d4(0x13f)][_0x24e0d4(0x1d2)]=function(_0x190bf2,_0x153d21,_0x2c6020,_0x4a9867){const _0x245923=_0x24e0d4;if(!Window_Base[_0x245923(0x284)])return;if(!$dataClasses[_0x153d21])return;this['isClassExpGaugeDrawn']()&&this['drawClassExpGauge'](_0x190bf2,_0x153d21,_0x2c6020,_0x4a9867),this[_0x245923(0x2b9)](ColorManager[_0x245923(0x2e3)]()),this[_0x245923(0x28f)](TextManager[_0x245923(0x1ed)],_0x2c6020,_0x4a9867,0x30),this[_0x245923(0x209)](),this[_0x245923(0x28f)](_0x190bf2[_0x245923(0x16a)](_0x153d21),_0x2c6020+0x54,_0x4a9867,0x24,'right');},Window_Base['prototype'][_0x24e0d4(0x168)]=function(){const _0x5023c4=_0x24e0d4;return Imported[_0x5023c4(0x18e)]&&VisuMZ[_0x5023c4(0x2d5)][_0x5023c4(0x2ba)]['UI'][_0x5023c4(0x266)];},Window_Base['prototype'][_0x24e0d4(0x1c8)]=function(_0x1f4fe1,_0x441d49,_0x181065,_0x485590){const _0x447961=_0x24e0d4;if(!_0x1f4fe1)return;if(!_0x1f4fe1[_0x447961(0x26e)]())return;const _0x1cbdc3=0x80,_0x51e8a5=_0x1f4fe1[_0x447961(0x2a8)](_0x441d49);let _0x57b505=ColorManager[_0x447961(0x323)](),_0x2e95cf=ColorManager['expGaugeColor2']();_0x51e8a5>=0x1&&(_0x57b505=ColorManager[_0x447961(0xbb)](),_0x2e95cf=ColorManager[_0x447961(0x1ec)]()),this[_0x447961(0x367)](_0x181065,_0x485590,_0x1cbdc3,_0x51e8a5,_0x57b505,_0x2e95cf);},VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ed)]=Window_MenuCommand['prototype']['addOriginalCommands'],Window_MenuCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x328)]=function(){const _0x5a4359=_0x24e0d4;VisuMZ['ClassChangeSystem'][_0x5a4359(0x2ed)][_0x5a4359(0x146)](this),this[_0x5a4359(0x2c7)]();},Window_MenuCommand['prototype'][_0x24e0d4(0x2c7)]=function(){const _0x41184f=_0x24e0d4;if(!this['addClassChangeSystemCommandAutomatically']())return;if(!this['isClassChangeCommandVisible']())return;const _0x4b678c=TextManager[_0x41184f(0xaf)],_0x4e0e31=this[_0x41184f(0x2f6)]();this['addCommand'](_0x4b678c,_0x41184f(0x219),_0x4e0e31);},Window_MenuCommand[_0x24e0d4(0x13f)]['addClassChangeSystemCommandAutomatically']=function(){const _0x4ef707=_0x24e0d4;return Imported[_0x4ef707(0x2db)]?![]:!![];},Window_MenuCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x278)]=function(){const _0x1da6fd=_0x24e0d4;return $gameSystem[_0x1da6fd(0x336)]();},Window_MenuCommand['prototype'][_0x24e0d4(0x2f6)]=function(){const _0x9f8dc0=_0x24e0d4;return $gameSystem[_0x9f8dc0(0x313)]();};function _0x5cea(){const _0xc15860=['drawClassResources','updateClassLevel','1122065RowKeC','classExpRate','setBattlerImage','show','initClassPoints','isClassAutoUnlockRequirementsMet','_priorityMenuImage','JSON','_jobPoints','popScene','removeChild','onClassListOk','skill','floor','createCustomBackgroundImages','Game_Actor_characterName','VisuMZ_1_BattleCore','ClassBattlePortrait','changeTextColor','Settings','StartClassClassPoints','General','applyMulticlassObjects','Game_Battler_onBattleStart','ALLOW_SELECT_SAME_SUBCLASS','mhp','classChange','maxLevel','Name','checkMulticlasses','name','bigPicture','addClassChangeSystemCommand','endBattle','applyDatabaseAutoColor','itemPadding','drawExtraContents','uiHelpPosition','SParamRates','DebuffRates','index','members','getJobPoints','AllowSameSubclassSelect','Multiclass','push','CoreEngine','checkForAutoClassUnlocks','makeRewardsJobPoints','ConfirmAniPrimaryOffsetX','Window_ClassList_RectJS','_commandWindow','VisuMZ_1_MainMenuCore','xparam','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','initMulticlass','stateResistSet','classChange_multiclass_ShiftHelp','StartingJobPoints','gainMulticlassExp','systemColor','paramValueByName','highestMulticlassTier','getInputButtonString','Game_BattlerBase_debuffRate','_cache','_priorityFaceIndex','#%1','Parse_ClassIcons','drawActorAbilityPoints','Window_MenuCommand_addOriginalCommands','_windowLayer','_backSprite1','StartingClassPoints','levelUpGainSkillPoints','ClassUnlockRemoveActor','onClassListCancel','Game_Actor_getBattlePortraitFilename','Scene_Boot_onDatabaseLoaded','isClassChangeCommandEnabled','\x5cI[%1]%2','ClassBattlerName','actorClassFaceName','PerAction','skillTypes','Window_ClassTier_ExtraJS','actorParams','classPoints','setTempActor','drawUpdatedParamName','setup','reduce','AliveActors','removeUnlockedClass','releaseUnequippableItems','_ClassChangeSystem_MainMenu','maintainLevels','startClassChangeAnimation','ConfirmAniSubclassOffsetX','<WordWrap>','changeClassExp','Tiers','createCommandWindow','gainMulticlassRewardPoints','innerHeight','drawActorResources','Game_BattlerBase_stateResistSet','gainStartingClassPoints','isMainMenuClassChangeSystemEnabled','applyClassPoints','setTier','drawJobPoints','enabled','characterName','getAbilityPoints','getClassChangeTiersOnly','expForClassLevel','_classChangeTier','clear','getActorClassCharacterName','levelUpGainClassPoints','getSkillPoints','resetFontSettings','levelUpGainJobPoints','expGaugeColor1','Icon','createClassTierWindow','drawParameterList','displayRewardsClassPoints','addOriginalCommands','stateRate','setupClassChangeSystem','hideAdditionalSprites','paramBaseForClass','active','StartingMulticlasses','_exp','EnemyClassPoints','_classTierWindow','enemy','Actors','actor','drawActorJobPoints','isMainMenuClassChangeSystemVisible','Game_BattlerBase_elementRate','contents','setBattlePortrait','VocabNoClassAssigned','displayRewards','onActorChange','refresh','Game_Actor_paramBase','\x5cI[%1]','indexOf','getActorClassBattlePortrait','TRAIT_STYPE_ADD','MaxResource','setFaceImage','(+%1)','updatedLayoutStyle','width','playBuzzerSound','from','jobPointsVisible','colSpacing','tradeItemWithParty','allMembers','jobPointsTotal','VisuMZ_2_ClassChangeSystem','updateHelp','Game_BattlerBase_addedSkillTypes','pagedown','inBattle','STRUCT','itemRect','scaleSprite','Parse_Notetags_Basic','addMulticlassTiers','isEquipWtypeOk','Game_BattlerBase_sparam','toUpperCase','loadPicture','determineActiveWindow','uiMenuStyle','setActor','params','jobPointsAbbr','classLevelUp','log','clearParamPlus','Window_Base_databaseObjectName','visibleResources','drawGauge','setMenuImage','format','right','classPointsFmt','nextClassLevelExp','RegExp','left','isWordWrapEnabled','updateClassChangeAnimations','drawItem','createClassChangeAnimation','mainAreaTop','drawTextEx','makeRewardsClassPoints','classChangeMenuCommand','addJobPoints','remove','getClassPoints','round','1119438knFupR','100519bbLUEH','BackRectColor','XParamRates','pageup','DrawParamJS','getActorClassFaceIndex','maxLvGaugeColor1','process_VisuMZ_ClassChangeSystem_Notetags','EquipWeapons','FUNC','7UkHemp','paintOpacity','canShiftRemoveClass','classAdjustHpMp','match','_backSprite2','gain%1Points','classChange_multiclass_noClass','changeMulticlass','loseMulticlassTiers','Game_BattlerBase_attackElements','addChild','gainRewardsJobPoints','needsPageButtons','ConfirmAniPrimaryOffsetY','paramValueFontSize','battlerName','TRAIT_EQUIP_ATYPE','ElementRates','UserGainJobPoints','Skill-%1-%2','_classChangeTierRestrictions','setMainMenuClassChangeSystemVisible','setHandler','constructor','JobPoints','_wordWrap','MAX_SAFE_INTEGER','removeClassChangeTierRestriction','optExtraExp','JobPointsAdd','changeExp','actorClassFaceIndex','SkillPoints','classIcon','resourceRate','gainJobPoints','getActorClassMenuPortrait','itemRectWithPadding','apply','ShowVictory','Game_Actor_setup','includes','_classIDs','graphicType','UnassignHelpDescription','BattleManager_gainExp','gainStartingJobPoints','create','ConfirmAnimationID','_classLevel','svbattler','update','Game_Actor_faceIndex','none','hpRate','DrawFaceJS','_classPoints','actorClassMenuPortrait','_multiclasses','getBackgroundOpacity','shown','setHp','Game_Battler_gainSilentTp','refreshActorPortrait','isRecommendedLayout','jobPointsFmt','Actor-%1-Class-%2','Param','levelUp','MulticlassChangeActorClass','gainSilentTp','VisuMZ_1_MessageCore','addClassPoints','shift','Game_Actor_setBattlePortrait','EquipArmors','VisuMZ_2_SkillLearnSystem','AttackElements','Game_Actor_levelUp','_tier','BattleManager_makeRewards','ClassUnlockRemoveGlobal','updateStatusWindow','_highestTier','_priorityBattlerName','STR','actorClassCharacterIndex','Game_Actor_setBattlerImage','battleMembers','loseJobPoints','drawUpdatedBeforeParamValue','setJobPoints','add','Game_Actor_tradeItemWithParty','TextColor','Game_Party_initialize','forceSelect','getActorUnlockedClasses','MenuPortraits','clamp','ClassIcon','SystemShowClassChangeSystemMenu','555DHjfMH','ChangeClassSound','UserGainClassPoints','uiInputPosition','ClassPointsGain','Game_Actor_setFaceImage','iconIndex','trim','applyItemClassChangeSystemUserEffect','armor','changePaintOpacity','join','Game_Actor_setCharacterImage','playClassChange','drawItemDarkRect','actorClassBattlePortrait','DrawPortraitJS','ConfirmAniSubclassOffsetY','Game_Actor_changeClass','initClassChangeSystemMainMenu','isClassChangeTierRestricted','faceIndex','PerLevelUp','Game_Actor_releaseUnequippableItems','TextFmt','prototype','isTriggered','isShiftRemoveShortcutEnabled','Window_ClassStatus_BgType','split','Game_BattlerBase_xparam','ClassChangeRemoveRestrictTier','call','ParseActorNotetags','drawRightArrow','gainClassPointsForMulticlasses','isMVAnimation','loadTitle2','drawPicture','isEnabled','expRate','sprite','addWindow','buttonAssistSlotWindowShift','IconSet','JobPointsGain','setHelpWindow','deadMembers','databaseObjectName','SkillLearnSystem','\x1bi[%1]%2','prepareDrawActorFace','ARRAYFUNC','levelUpGainAbilityPoints','paramRate','splice','setMulticlassTiers','cancel','CLASS_CHANGE_ADJUST_HP_MP','ClassFaceName','totalMulticlass','Game_Action_applyItemUserEffect','ConvertParams','MainMenu','actorId','Game_Actor_setMenuImage','isClassExpGaugeDrawn','dimColor2','classLevel','skillId','classPointsAbbr','Game_BattlerBase_paramRate','ShiftShortcutKey','classPointsFull','smoothSelect','Points','Limit','Game_System_initialize','ClassChangeAddRestrictTier','nextActor','equips','DrawBackRect','isUseSkillsStatesCoreUpdatedLayout','VictoryText','SnapshotOpacity','getClassChangeBackColor2','ARRAYSTRUCT','onBattleStart','mmp','currentClassLevelExp','_actor','attackStatesRate','AlwaysUnlocked','Scene_Menu_createCommandWindow','classPointsTotal','TRAIT_EQUIP_WTYPE','addCommand','initialize','newPage','setCharacterImage','process_VisuMZ_ClassChangeSystem','jobPointsFull','getMulticlassAtTier','Game_BattlerBase_isEquipWtypeOk','VisuMZ_0_CoreEngine','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','338598CAliFi','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','unlockClass','createStatusWindow','_tp','getClassIdWithName','ParamRates','ClassCharaName','_context','traitObjects','paramBase','classDescription','drawFadedItemBackground','traits','earnedJobPoints','Game_BattlerBase_isEquipAtypeOk','BgFilename2','updateClassLearnedSkills','createBackground','imageSmoothingEnabled','registerCommand','callUpdateHelp','Game_Actor_traitObjects','gainClassPoints','AbbrText','Game_BattlerBase_addedSkills','description','_priorityFaceName','exp','PerEnemy','highestTier','createClassListWindow','pop','deactivate','initClassChangeRestrictions','Window_ClassList_BgType','_priorityCharacterIndex','Class-%1-%2','gainJobPointsForMulticlasses','_list','actorClassCharacterName','VocabUnassignClass','jobPointsRate','Game_Actor_faceName','EnemyJobPoints','mainAreaHeight','isBattleMember','Window_ClassStatus_RectJS','ext','initJobPoints','getClassChangeAnimationID','_targets','applyItemUserEffect','makeDeepCopy','getActorClassBattlerName','rightArrowWidth','drawClassExpGauge','isRightInputMode','drawBigItemImage','HelpDescription','BgFilename1','attackElements','isPlaying','loadSystem','currentClass','JobPointsSet','drawClassLevel','bind','deselect','itemHeight','getMulticlasses','activate','getMenuImage','length','ClassID','drawActorClassPoints','JobPointsLose','TargetGainJobPoints','MaintainLevels','ChangeAdjusHpMp','RestrictClassChangeTier','createAnimationDummySprite','lineHeight','makeCommandList','setBackgroundType','buttonAssistText3','checkShiftRemoveShortcut','drawActorSkillPoints','ClassPoints','ClassMenuPortrait','drawItemActorSvBattler','AttackStates','maxLvGaugeColor2','levelA','_earnedJobPoints','AbilityPoints','map','max','dataId','characterIndex','attackStates','Armor-%1-%2','setStatusWindow','drawUpdatedAfterParamValue','TierOnlyClass','drawActorFace','pow','SharedResource','statusWindowRect','addClassChangeTierRestriction','gainRewardsClassPoints','_priorityBattlePortrait','EVAL','_statusWindow','DisplayedResources','40MLqcza','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','displayRewardsJobPoints','1846304KaYdIn','StartClassJobPoints','setMainMenuClassChangeSystemEnabled','resetTextColor','item','subject','Game_Actor_equips','faceName','ParseClassNotetags','isSceneBattle','ParamValueFontSize','onPersonalOk','loadFace','concat','drawClassPoints','refreshCursor','dimColor1','AddedStypes','refreshActor','ClassChangeSystem','replace','ParseAllNotetags','ShiftButtonAssistText','frames','isAlive','Tier','onDatabaseLoaded','classPointsIcon','_classId','Game_Actor_characterIndex','currentSymbol','gainExp','classPicture','StateRates','ClassPointsRate','EnableMainMenu','934792YjjsGd','isEquipAtypeOk','actorClassBattlerName','hide','Game_BattlerBase_stateRate','antiEquipsCacheClear_BattleCore_ClassChangeSystem','TextCodeClassNames','setText','height','addLoadListener','getActorClassCharacterIndex','findMulticlassTier','multiclassId','classChange_multiclass_remove','MulticlassSetLimit','initClassLevels','addedSkills','_classListWindow','jobPoints','FullText','Actor-%1-%2','PLAY_ANI_FOR_UNASSIGN','filter','prepareRefreshItemsEquipsCoreLayout','test','setClassPoints','Game_Actor_getMenuImage','classChange_multiclass_remove_help','adjustSprite','armorTypes','debuffRate','_helpWindow','note','Window_ClassTier_RectJS','ShowClassLevel','textSizeEx','classTierWindowRect','level','parse','currentExt','_multiclassTiers','drawItemActorMenuImage','code','StartingClassTier','center','initClassChangeUnlocks','2498yTMcwf','Game_Actor_battlerName','getUnlockedClasses','NUM','applyJobPoints','BattleManager_displayRewards','param','isLearnedSkill','multiclasses','playStaticSe','commandPersonal','boxWidth','exit','ClassUnlockForActor','LvExpGauge','_buttonAssistWindow','MulticlassRaiseLimit','Window_ClassTier_BgType','buttonAssistOffset3','AutoUnlockRequirements','finalExpRate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isActor','jobPointsIcon','sort','padding','registerActorClassImages','Window','Scene_Menu_onPersonalOk','learnSkill','buttonAssistKey3','_scene','isClassChangeCommandVisible','classPointsVisible','checkForNewUnlockedClasses','_unlockedClasses','_multiclassCheck','expParams','makeRewards','paramchangeTextColor','isPlaytest','Classes','tier','min','CLASS_CHANGE_SHOW_CLASS_LEVEL','drawBigItemIcon','blt','bitmap','processShiftRemoveShortcut','_tempActor','_rewards','gradientFillRect','getColor','classPointsRate','recoverAll','drawText','isMainMenuCoreMenuImageOptionAvailable','learnings','Game_BattlerBase_attackStates','getBattlePortraitFilename','weapon','classListWindowRect','onMenuImageLoad','textColor','paramRate%1','multiclass','previousActor','parameters','AddedSkills','iconWidth','_earnedClassPoints','_updateClassLearnedSkills','_ClassChangeSystem_preventLevelUpGain','_priorityCharacterName','_animations','drawParamText','loseClassPoints'];_0x5cea=function(){return _0xc15860;};return _0x5cea();}function Window_ClassStatus(){const _0x285d4e=_0x24e0d4;this[_0x285d4e(0x187)](...arguments);}Window_ClassStatus[_0x24e0d4(0x13f)]=Object[_0x24e0d4(0xef)](Window_StatusBase['prototype']),Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0xd7)]=Window_ClassStatus,Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x187)]=function(_0x54c63b){const _0x1a6ab2=_0x24e0d4;Window_StatusBase['prototype'][_0x1a6ab2(0x187)][_0x1a6ab2(0x146)](this,_0x54c63b),this[_0x1a6ab2(0x180)]=null,this[_0x1a6ab2(0x289)]=null,this[_0x1a6ab2(0x33d)]();},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x35f)]=function(_0x455006){const _0x210c6e=_0x24e0d4;this[_0x210c6e(0x180)]!==_0x455006&&(this['_actor']=_0x455006,this[_0x210c6e(0x33d)]());},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x34b)]=function(){return 0x0;},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x2ff)]=function(_0x5df09c){const _0x3b76cc=_0x24e0d4;this[_0x3b76cc(0x289)]!==_0x5df09c&&(this[_0x3b76cc(0x289)]=_0x5df09c,this['refresh']());},Window_ClassStatus['prototype'][_0x24e0d4(0x33d)]=function(){const _0x24aef9=_0x24e0d4;this[_0x24aef9(0x32b)](),this[_0x24aef9(0x321)]();if(this['_actor'])this[_0x24aef9(0x180)][_0x24aef9(0x33d)]();this[_0x24aef9(0x241)]();},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x241)]=function(){const _0x3ab232=_0x24e0d4;this[_0x3ab232(0x338)][_0x3ab232(0x31d)]();if(!this[_0x3ab232(0x180)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x4ba7d3=ImageManager[_0x3ab232(0x35c)](this[_0x3ab232(0x180)][_0x3ab232(0x1d8)]());_0x4ba7d3[_0x3ab232(0x233)](this[_0x3ab232(0x296)][_0x3ab232(0x1d3)](this));}else this['refreshNoMenuImage']();},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x290)]=function(){const _0x173d3d=_0x24e0d4;return Imported[_0x173d3d(0x2db)]&&this[_0x173d3d(0x180)][_0x173d3d(0x1d8)]()!==''&&VisuMZ[_0x173d3d(0x219)]['Settings'][_0x173d3d(0x273)][_0x173d3d(0x122)];},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x296)]=function(){const _0x449136=_0x24e0d4;VisuMZ[_0x449136(0x219)]['Settings'][_0x449136(0x273)][_0x449136(0x136)]['call'](this),this['drawParameterList']();},Window_ClassStatus[_0x24e0d4(0x13f)]['drawItemActorMenuImage']=function(_0xad9f8d,_0x34f94e,_0x37afd4,_0x4b3a5e,_0x2ea055){const _0x3a5682=_0x24e0d4,_0x56f05c=ImageManager[_0x3a5682(0x35c)](_0xad9f8d[_0x3a5682(0x1d8)]()),_0x47fb61=this['innerWidth']-_0x56f05c[_0x3a5682(0x347)];_0x34f94e+=_0x47fb61/0x2;if(_0x47fb61<0x0)_0x4b3a5e-=_0x47fb61;Window_StatusBase[_0x3a5682(0x13f)][_0x3a5682(0x253)]['call'](this,_0xad9f8d,_0x34f94e,_0x37afd4,_0x4b3a5e,_0x2ea055);},Window_ClassStatus[_0x24e0d4(0x13f)]['refreshNoMenuImage']=function(){const _0x1a9e66=_0x24e0d4;VisuMZ[_0x1a9e66(0x219)]['Settings']['Window'][_0x1a9e66(0xf7)][_0x1a9e66(0x146)](this),this[_0x1a9e66(0x326)]();},Window_ClassStatus['prototype']['drawParameterList']=function(){const _0x14bfc1=_0x24e0d4;this['resetFontSettings'](),VisuMZ[_0x14bfc1(0x219)][_0x14bfc1(0x2ba)][_0x14bfc1(0x273)][_0x14bfc1(0xb9)]['call'](this);},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x2fd)]=function(){const _0x4a71de=_0x24e0d4;return Imported[_0x4a71de(0x18e)]?VisuMZ[_0x4a71de(0x2d5)][_0x4a71de(0x2ba)][_0x4a71de(0x103)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus['prototype'][_0x24e0d4(0xce)]=function(){const _0x4eea00=_0x24e0d4;return VisuMZ[_0x4eea00(0x219)][_0x4eea00(0x2ba)][_0x4eea00(0x273)][_0x4eea00(0x210)];},Window_ClassStatus[_0x24e0d4(0x13f)]['isUseParamNamesWithIcons']=function(){const _0x4d2687=_0x24e0d4;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x4d2687(0x2d5)]['Settings'][_0x4d2687(0x103)]['DrawIcons'];},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x1f9)]=function(_0x37b94b,_0x21c393,_0x1b1f7b,_0x27a6e0,_0x192c70){const _0x150ef8=_0x24e0d4;if(Imported[_0x150ef8(0x2db)])switch(this[_0x150ef8(0xeb)]()){case _0x150ef8(0xf5):break;case _0x150ef8(0x14f):this['drawItemActorSprite'](_0x37b94b,_0x21c393,_0x1b1f7b,_0x27a6e0,_0x192c70);break;case _0x150ef8(0xf2):this[_0x150ef8(0x1ea)](_0x37b94b,_0x21c393,_0x1b1f7b,_0x27a6e0,_0x192c70);break;default:this[_0x150ef8(0x159)](_0x37b94b,_0x21c393,_0x1b1f7b,_0x27a6e0,_0x192c70);break;}else this[_0x150ef8(0x159)](_0x37b94b,_0x21c393,_0x1b1f7b,_0x27a6e0,_0x192c70);},Window_ClassStatus[_0x24e0d4(0x13f)]['prepareDrawActorFace']=function(_0x3626ff,_0x52b21e,_0x5363e2,_0x265018,_0x174cc3){const _0x442660=_0x24e0d4,_0xde6f69=ImageManager[_0x442660(0x212)](_0x3626ff['faceName']());_0xde6f69[_0x442660(0x233)](Window_StatusBase[_0x442660(0x13f)][_0x442660(0x1f9)][_0x442660(0x1d3)](this,_0x3626ff,_0x52b21e,_0x5363e2,_0x265018,_0x174cc3));},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x148)]=function(_0xe59e13,_0x54bf7a){const _0x329675=_0x24e0d4,_0x3c3d2e=this[_0x329675(0x1c7)]();this[_0x329675(0x2b9)](ColorManager[_0x329675(0x2e3)]());if(Imported['VisuMZ_0_CoreEngine']){const _0x485b37=VisuMZ['CoreEngine'][_0x329675(0x2ba)]['UI']['ParamArrow'];this[_0x329675(0x28f)](_0x485b37,_0xe59e13,_0x54bf7a,_0x3c3d2e,_0x329675(0x256));}else this[_0x329675(0x28f)]('→',_0xe59e13,_0x54bf7a,_0x3c3d2e,_0x329675(0x256));},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x1c7)]=function(){return 0x20;},Window_ClassStatus['prototype'][_0x24e0d4(0x300)]=function(_0x1ee36a,_0x1ee029,_0x3282c5,_0x33126a){const _0x32de95=_0x24e0d4,_0x3ece87=this[_0x32de95(0x2ca)]();Imported['VisuMZ_0_CoreEngine']?this[_0x32de95(0x2a3)](_0x1ee029+_0x3ece87,_0x3282c5,_0x33126a,_0x1ee36a,![]):(this['changeTextColor'](ColorManager[_0x32de95(0x2e3)]()),this['drawText'](TextManager['param'](_0x1ee36a),_0x1ee029+_0x3ece87,_0x3282c5,_0x33126a),this[_0x32de95(0x209)]());},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x11a)]=function(_0x352502,_0x5d4ed1,_0x27f95a,_0x171590){const _0x162a59=_0x24e0d4,_0x18e0bf=this[_0x162a59(0x2ca)]();let _0x169024=0x0;Imported[_0x162a59(0x18e)]?_0x169024=this[_0x162a59(0x180)]['paramValueByName'](_0x352502,!![]):_0x169024=this[_0x162a59(0x180)][_0x162a59(0x25e)](_0x352502);const _0x1d5e70=_0x169024;this[_0x162a59(0x28f)](_0x169024,_0x5d4ed1,_0x27f95a,_0x171590-_0x18e0bf,'right'),this['resetTextColor']();},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x1f7)]=function(_0x557663,_0x10cb21,_0x5d6418,_0x5cf9c2){const _0x432291=_0x24e0d4,_0x283dac=this[_0x432291(0x2ca)]();let _0x1dcec7=0x0,_0x5ddd67=0x0,_0x33bd61='';if(this['_tempActor']){Imported[_0x432291(0x18e)]?(_0x1dcec7=this['_actor']['paramValueByName'](_0x557663,![]),_0x5ddd67=this[_0x432291(0x289)][_0x432291(0x2e4)](_0x557663,![]),_0x33bd61=this['_tempActor'][_0x432291(0x2e4)](_0x557663,!![])):(_0x1dcec7=this[_0x432291(0x180)][_0x432291(0x25e)](_0x557663),_0x5ddd67=this[_0x432291(0x289)][_0x432291(0x25e)](_0x557663),_0x33bd61=this[_0x432291(0x289)][_0x432291(0x25e)](_0x557663));const _0x558d64=_0x1dcec7,_0x337f5a=_0x5ddd67;diffValue=_0x337f5a-_0x558d64,this[_0x432291(0x2b9)](ColorManager['paramchangeTextColor'](diffValue)),this[_0x432291(0x28f)](_0x33bd61,_0x10cb21,_0x5d6418,_0x5cf9c2-_0x283dac,'right');}this[_0x432291(0x209)]();},Window_ClassStatus[_0x24e0d4(0x13f)]['drawUpdatedParamValueDiff']=function(_0x572769,_0x25c718,_0x448d1c,_0x209a68){const _0x347f92=_0x24e0d4,_0x114c85=this['itemPadding']();let _0x426234=0x0,_0x572210=0x0,_0x79d75e=![];if(this[_0x347f92(0x289)]){Imported[_0x347f92(0x18e)]?(_0x426234=this[_0x347f92(0x180)][_0x347f92(0x2e4)](_0x572769,![]),_0x572210=this[_0x347f92(0x289)]['paramValueByName'](_0x572769,![]),_0x79d75e=String(this['_actor'][_0x347f92(0x2e4)](_0x572769,!![]))[_0x347f92(0xc3)](/([%％])/i)):(_0x426234=this[_0x347f92(0x180)][_0x347f92(0x25e)](_0x572769),_0x572210=this['_tempActor'][_0x347f92(0x25e)](_0x572769),_0x79d75e=_0x426234%0x1!==0x0||_0x572210%0x1!==0x0);const _0x19ef7f=_0x426234,_0x4116ed=_0x572210,_0x128060=_0x4116ed-_0x19ef7f;let _0x57cd54=_0x128060;if(_0x79d75e)_0x57cd54=Math[_0x347f92(0xb3)](_0x128060*0x64)+'%';_0x128060!==0x0&&(this[_0x347f92(0x2b9)](ColorManager[_0x347f92(0x27f)](_0x128060)),_0x57cd54=(_0x128060>0x0?_0x347f92(0x345):'(%1)')[_0x347f92(0x369)](_0x57cd54),this[_0x347f92(0x28f)](_0x57cd54,_0x25c718+_0x114c85,_0x448d1c,_0x209a68,'left'));}this['resetTextColor']();},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x134)]=function(_0x437cd0,_0x1f3784,_0x2f1b2c,_0x33de7c,_0x27f85f){const _0x259862=_0x24e0d4;if(VisuMZ['ClassChangeSystem'][_0x259862(0x2ba)][_0x259862(0x273)][_0x259862(0x177)]===![])return;_0x27f85f=Math[_0x259862(0x1f1)](_0x27f85f||0x1,0x1);while(_0x27f85f--){_0x33de7c=_0x33de7c||this[_0x259862(0x1e2)](),this[_0x259862(0x338)][_0x259862(0xc0)]=0xa0;const _0x1fb5b9=ColorManager[_0x259862(0x17b)]();this[_0x259862(0x338)]['fillRect'](_0x437cd0+0x1,_0x1f3784+0x1,_0x2f1b2c-0x2,_0x33de7c-0x2,_0x1fb5b9),this[_0x259862(0x338)][_0x259862(0xc0)]=0xff;}},ColorManager[_0x24e0d4(0x17b)]=function(){const _0xdb453b=_0x24e0d4,_0x2739cf=VisuMZ[_0xdb453b(0x219)]['Settings'][_0xdb453b(0x273)];let _0x271b5c=_0x2739cf[_0xdb453b(0xb6)]!==undefined?_0x2739cf[_0xdb453b(0xb6)]:0x13;return ColorManager[_0xdb453b(0x28c)](_0x271b5c);},Window_ClassStatus[_0x24e0d4(0x13f)][_0x24e0d4(0x310)]=function(_0x37493a,_0x335822,_0x2cb720){const _0x334dd1=_0x24e0d4,_0x2a4eca=VisuMZ['ClassChangeSystem'][_0x334dd1(0x2ba)][_0x334dd1(0x273)][_0x334dd1(0x202)],_0x207b51=this['_actor'][_0x334dd1(0x1d0)]()['id'];for(const _0x900cdd of _0x2a4eca){switch(_0x900cdd[_0x334dd1(0x35b)]()[_0x334dd1(0x12d)]()){case'AP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x334dd1(0x2ec)](this[_0x334dd1(0x180)],_0x207b51,_0x37493a,_0x335822,_0x2cb720,_0x334dd1(0x36a)),_0x335822+=this['lineHeight']();break;case'CP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;this[_0x334dd1(0x1db)](this[_0x334dd1(0x180)],_0x207b51,_0x37493a,_0x335822,_0x2cb720,_0x334dd1(0x36a)),_0x335822+=this[_0x334dd1(0x1e2)]();break;case'JP':if(!Imported[_0x334dd1(0x34f)])continue;this[_0x334dd1(0x335)](this[_0x334dd1(0x180)],_0x207b51,_0x37493a,_0x335822,_0x2cb720,_0x334dd1(0x36a)),_0x335822+=this[_0x334dd1(0x1e2)]();break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;this[_0x334dd1(0x1e7)](this[_0x334dd1(0x180)],_0x207b51,_0x37493a,_0x335822,_0x2cb720,_0x334dd1(0x36a)),_0x335822+=this[_0x334dd1(0x1e2)]();break;}}};function Window_ClassCommand(){const _0x53aecc=_0x24e0d4;this[_0x53aecc(0x187)](...arguments);}Window_ClassCommand['prototype']=Object[_0x24e0d4(0xef)](Window_Command[_0x24e0d4(0x13f)]),Window_ClassCommand[_0x24e0d4(0x13f)]['constructor']=Window_ClassCommand,Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x187)]=function(_0x9e6ce7){const _0x416483=_0x24e0d4;Window_Command[_0x416483(0x13f)]['initialize'][_0x416483(0x146)](this,_0x9e6ce7),this[_0x416483(0x1d4)](),this[_0x416483(0x1b1)]();},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x1d5)]=function(){const _0x195383=_0x24e0d4;return this[_0x195383(0x1e2)]()*0x3+0x8;},Window_ClassCommand['prototype'][_0x24e0d4(0x35f)]=function(_0x8497be){const _0x4b128f=_0x24e0d4;this['_actor']!==_0x8497be&&(this['_actor']=_0x8497be,this[_0x4b128f(0x33d)]());},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x33d)]=function(){const _0x400b87=_0x24e0d4;Window_Command['prototype']['refresh'][_0x400b87(0x146)](this),this[_0x400b87(0x215)]();if(this[_0x400b87(0x32d)])this[_0x400b87(0x350)]();},Window_ClassCommand[_0x24e0d4(0x13f)]['drawFadedItemBackground']=function(_0x50564c,_0x3a2d4f){const _0x57aebc=_0x24e0d4;_0x3a2d4f=_0x3a2d4f||0x1,this[_0x57aebc(0x130)](![]);const _0x542a83=ColorManager[_0x57aebc(0x216)](),_0x2e48f9=ColorManager[_0x57aebc(0x169)](),_0x4997ad=_0x50564c[_0x57aebc(0x347)]/0x2,_0x622193=this[_0x57aebc(0x1e2)]();while(_0x3a2d4f--){this[_0x57aebc(0x338)][_0x57aebc(0x28b)](_0x50564c['x'],_0x50564c['y'],_0x4997ad,_0x622193,_0x2e48f9,_0x542a83),this[_0x57aebc(0x338)][_0x57aebc(0x28b)](_0x50564c['x']+_0x4997ad,_0x50564c['y'],_0x4997ad,_0x622193,_0x542a83,_0x2e48f9);}this[_0x57aebc(0x130)](!![]);},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x1ca)]=function(_0x12850c,_0x39c5ad,_0x15ee17){const _0x2e8dbc=_0x24e0d4;if(!_0x39c5ad)return;const _0x14b105=VisuMZ['ClassChangeSystem'][_0x2e8dbc(0x36d)],_0x3d13b2=_0x39c5ad[_0x2e8dbc(0x24a)];let _0xe7c25a='';if(_0x3d13b2['match'](_0x14b105[_0x2e8dbc(0x226)]))_0xe7c25a=String(RegExp['$1']);else _0x3d13b2[_0x2e8dbc(0xc3)](_0x14b105[_0x2e8dbc(0x2c6)])&&(_0xe7c25a=String(RegExp['$1']));if(_0xe7c25a){const _0x434137=ImageManager[_0x2e8dbc(0x35c)](_0xe7c25a);_0x434137[_0x2e8dbc(0x233)](this[_0x2e8dbc(0x14c)][_0x2e8dbc(0x1d3)](this,_0x12850c,_0x434137));}else this[_0x2e8dbc(0x285)](_0x39c5ad,_0x15ee17);},Window_ClassCommand['prototype'][_0x24e0d4(0x14c)]=function(_0x1d276e,_0x123118){const _0x12c7a4=_0x24e0d4,_0x2e4df9=this[_0x12c7a4(0xe5)](_0x1d276e);let _0x4848bc=_0x2e4df9['x']+this['itemPadding'](),_0x1a488a=_0x2e4df9['y']+0x4,_0x3c7b4b=_0x2e4df9[_0x12c7a4(0x347)]-this[_0x12c7a4(0x2ca)]()*0x2,_0x35ff8e=Math[_0x12c7a4(0x283)](this[_0x12c7a4(0x1e2)]()*0x3,_0x2e4df9[_0x12c7a4(0x232)])-0x4,_0x4c6c5c=Math[_0x12c7a4(0x283)](_0x3c7b4b,_0x35ff8e);const _0x2ec836=_0x4c6c5c/_0x123118[_0x12c7a4(0x347)],_0x3bad85=_0x4c6c5c/_0x123118[_0x12c7a4(0x232)],_0x16c047=Math[_0x12c7a4(0x283)](_0x2ec836,_0x3bad85,0x1);let _0x44a835=Math[_0x12c7a4(0xb3)](_0x123118[_0x12c7a4(0x347)]*_0x16c047),_0x441f2f=Math[_0x12c7a4(0xb3)](_0x123118[_0x12c7a4(0x232)]*_0x16c047);_0x4848bc+=Math[_0x12c7a4(0xb3)]((_0x4c6c5c-_0x44a835)/0x2),_0x1a488a+=Math['round']((_0x4c6c5c-_0x441f2f)/0x2);const _0x54bc69=_0x123118[_0x12c7a4(0x347)],_0x5147bc=_0x123118[_0x12c7a4(0x232)];this[_0x12c7a4(0x338)]['_context'][_0x12c7a4(0x1a3)]=!![],this[_0x12c7a4(0x338)][_0x12c7a4(0x286)](_0x123118,0x0,0x0,_0x54bc69,_0x5147bc,_0x4848bc,_0x1a488a,_0x44a835,_0x441f2f),this['contents'][_0x12c7a4(0x198)]['imageSmoothingEnabled']=!![];},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x285)]=function(_0x2bd9dc,_0x5e12c0){const _0x29dcbd=_0x24e0d4;if(!_0x2bd9dc)return;const _0x2374d2=_0x2bd9dc[_0x29dcbd(0x12c)];let _0x109bfb=_0x5e12c0['x']+this[_0x29dcbd(0x2ca)](),_0x2784fc=_0x5e12c0['y']+0x4,_0xa7ca12=_0x5e12c0['width']-this[_0x29dcbd(0x2ca)]()*0x2,_0x41544f=Math[_0x29dcbd(0x283)](this['lineHeight']()*0x3,_0x5e12c0[_0x29dcbd(0x232)]),_0x2c3f06=Math[_0x29dcbd(0x283)](_0xa7ca12,_0x41544f);_0x2c3f06=Math[_0x29dcbd(0x2b4)](_0x2c3f06/ImageManager[_0x29dcbd(0x29d)])*ImageManager[_0x29dcbd(0x29d)],_0x2784fc+=(_0x41544f-_0x2c3f06)/0x2;const _0x2ab2a9=ImageManager[_0x29dcbd(0x1cf)](_0x29dcbd(0x152)),_0x842bb8=ImageManager['iconWidth'],_0x1c4a03=ImageManager['iconHeight'],_0x440f72=_0x2374d2%0x10*_0x842bb8,_0x588ed7=Math[_0x29dcbd(0x2b4)](_0x2374d2/0x10)*_0x1c4a03;this['contents']['_context']['imageSmoothingEnabled']=![],this[_0x29dcbd(0x338)]['blt'](_0x2ab2a9,_0x440f72,_0x588ed7,_0x842bb8,_0x1c4a03,_0x109bfb,_0x2784fc,_0x2c3f06,_0x2c3f06),this[_0x29dcbd(0x338)]['_context'][_0x29dcbd(0x1a3)]=!![];},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x366)]=function(){const _0x4168e1=_0x24e0d4;return VisuMZ['ClassChangeSystem'][_0x4168e1(0x2ba)][_0x4168e1(0x273)][_0x4168e1(0x202)]||[];},Window_ClassCommand[_0x24e0d4(0x13f)][_0x24e0d4(0x2a5)]=function(_0x553813,_0x5d0dc7){const _0x5d3ac2=_0x24e0d4,_0x21d823=this[_0x5d3ac2(0x366)]();let _0x2af30=_0x5d0dc7['y']+this['lineHeight'](),_0x4c1f4f=0x0;const _0x337262=_0x5d0dc7[_0x5d3ac2(0x347)]-this[_0x5d3ac2(0x2ca)]()*0x2;for(const _0x5c5c74 of _0x21d823){if(_0x4c1f4f>=0x2)return;switch(_0x5c5c74){case'AP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0x5db8d3=VisuMZ[_0x5d3ac2(0x157)]['Settings'][_0x5d3ac2(0x1ef)];if(!_0x5db8d3)continue;if(_0x5db8d3[_0x5d3ac2(0x1fb)])continue;this[_0x5d3ac2(0x2ec)](this[_0x5d3ac2(0x180)],_0x553813,_0x5d0dc7['x'],_0x2af30,_0x337262,_0x5d3ac2(0x36a)),_0x2af30+=this['lineHeight'](),_0x4c1f4f++;break;case'CP':if(!Imported[_0x5d3ac2(0x34f)])continue;let _0x4ff197=VisuMZ[_0x5d3ac2(0x219)][_0x5d3ac2(0x2ba)][_0x5d3ac2(0x1e8)];if(!_0x4ff197)continue;if(_0x4ff197[_0x5d3ac2(0x1fb)])continue;this[_0x5d3ac2(0x1db)](this[_0x5d3ac2(0x180)],_0x553813,_0x5d0dc7['x'],_0x2af30,_0x337262,'right'),_0x2af30+=this[_0x5d3ac2(0x1e2)](),_0x4c1f4f++;break;case'JP':if(!Imported[_0x5d3ac2(0x34f)])continue;let _0x39bf36=VisuMZ['ClassChangeSystem'][_0x5d3ac2(0x2ba)][_0x5d3ac2(0xd8)];if(!_0x39bf36)continue;if(_0x39bf36[_0x5d3ac2(0x1fb)])continue;this[_0x5d3ac2(0x335)](this[_0x5d3ac2(0x180)],_0x553813,_0x5d0dc7['x'],_0x2af30,_0x337262,_0x5d3ac2(0x36a)),_0x2af30+=this[_0x5d3ac2(0x1e2)](),_0x4c1f4f++;break;case'SP':if(!Imported[_0x5d3ac2(0x10c)])continue;let _0x2ddef8=VisuMZ[_0x5d3ac2(0x157)][_0x5d3ac2(0x2ba)][_0x5d3ac2(0xe0)];if(!_0x2ddef8)continue;if(_0x2ddef8['SharedResource'])continue;this[_0x5d3ac2(0x1e7)](this['_actor'],_0x553813,_0x5d0dc7['x'],_0x2af30,_0x337262,_0x5d3ac2(0x36a)),_0x2af30+=this[_0x5d3ac2(0x1e2)](),_0x4c1f4f++;break;}}};function Window_ClassTier(){const _0x6564f6=_0x24e0d4;this[_0x6564f6(0x187)](...arguments);}Window_ClassTier[_0x24e0d4(0x13f)]=Object[_0x24e0d4(0xef)](Window_ClassCommand['prototype']),Window_ClassTier['prototype'][_0x24e0d4(0xd7)]=Window_ClassTier,Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x187)]=function(_0x386d3b){const _0x2288af=_0x24e0d4;Window_ClassCommand[_0x2288af(0x13f)][_0x2288af(0x187)][_0x2288af(0x146)](this,_0x386d3b);},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x36f)]=function(){const _0x121f22=_0x24e0d4;return this[_0x121f22(0xd9)];},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x1d5)]=function(){const _0x2d6828=_0x24e0d4;let _0xccd7d6=Window_ClassCommand[_0x2d6828(0x13f)][_0x2d6828(0x1d5)][_0x2d6828(0x146)](this);if(this['_actor']){const _0x3aa2b6=this['_actor'][_0x2d6828(0x162)]()||0x1;_0xccd7d6=Math[_0x2d6828(0x1f1)](_0xccd7d6,this[_0x2d6828(0x30f)]/_0x3aa2b6);}return _0xccd7d6;},Window_ClassTier['prototype']['updateHelp']=function(){const _0x5aea6c=_0x24e0d4;if(this[_0x5aea6c(0x249)]){if(this[_0x5aea6c(0x251)]()){const _0x596177=VisuMZ[_0x5aea6c(0x219)][_0x5aea6c(0x2ba)][_0x5aea6c(0x2d3)];if(!_0x596177)return;const _0x143be3=_0x596177[this[_0x5aea6c(0x251)]()-0x1];if(!_0x143be3)return;this['_helpWindow'][_0x5aea6c(0x231)](_0x143be3['HelpDescription']);}else this[_0x5aea6c(0x249)][_0x5aea6c(0x231)]('');}},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x1e3)]=function(){const _0x18c1a3=_0x24e0d4;if(!this['_actor'])return;const _0x3c12b4=this['_actor']['totalMulticlass'](),_0x34d7e7=VisuMZ[_0x18c1a3(0x219)]['Settings'][_0x18c1a3(0x2d3)];for(let _0x50dd20=0x0;_0x50dd20<_0x3c12b4;_0x50dd20++){const _0x174252=_0x34d7e7[_0x50dd20];if(!_0x174252)continue;const _0x1d405d=_0x174252[_0x18c1a3(0x2c3)],_0x271056=_0x50dd20+0x1,_0x5eb02b=this['isEnabled'](_0x271056);this[_0x18c1a3(0x186)](_0x1d405d,_0x18c1a3(0x282),_0x5eb02b,_0x271056);}},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x14d)]=function(_0x2d96a2){const _0x4c0f5a=_0x24e0d4;if(this[_0x4c0f5a(0x180)][_0x4c0f5a(0x13a)](_0x2d96a2))return![];return _0x2d96a2>0x0;},Window_ClassTier['prototype'][_0x24e0d4(0x371)]=function(_0x347851){const _0x1388ec=_0x24e0d4;if(!this[_0x1388ec(0x180)])return;const _0x471219=this[_0x1388ec(0xe5)](_0x347851),_0x343bc7=this[_0x1388ec(0x1b7)][_0x347851][_0x1388ec(0x1c0)]||0x1,_0x2f7d8a=this['_actor']['getMulticlassAtTier'](_0x343bc7),_0x5d5557=_0x2f7d8a?_0x2f7d8a['id']:0x0,_0x8fcaa=VisuMZ[_0x1388ec(0x219)][_0x1388ec(0x2ba)]['Multiclass'];if(!_0x8fcaa)return;const _0x438823=_0x8fcaa[_0x343bc7-0x1];if(!_0x438823)return;let _0x1ce43c=_0x471219['x'],_0x48616d=_0x471219['y'],_0x1e925e=_0x471219[_0x1388ec(0x347)]-this[_0x1388ec(0x2ca)]()*0x2,_0x53c9da=_0x471219['height'],_0x22e193=Math[_0x1388ec(0x283)](_0x1e925e,_0x53c9da,this[_0x1388ec(0x1e2)]()*0x3);_0x22e193=Math[_0x1388ec(0x2b4)](_0x22e193/ImageManager[_0x1388ec(0x29d)])*ImageManager[_0x1388ec(0x29d)],_0x1ce43c+=_0x22e193+this[_0x1388ec(0x2ca)]()*0x4,this[_0x1388ec(0x321)](),this[_0x1388ec(0x209)](),this['drawFadedItemBackground'](_0x471219),this['changePaintOpacity'](this[_0x1388ec(0x14d)](_0x343bc7)),this[_0x1388ec(0x1ca)](_0x347851,_0x2f7d8a,_0x471219),this[_0x1388ec(0x2b9)](ColorManager[_0x1388ec(0x28c)](_0x438823[_0x1388ec(0x11e)])),this[_0x1388ec(0x28f)](_0x438823[_0x1388ec(0x2c3)],_0x471219['x'],_0x471219['y'],_0x471219[_0x1388ec(0x347)],_0x1388ec(0x256)),this[_0x1388ec(0x209)]();if(!_0x2f7d8a){this[_0x1388ec(0x130)](![]);const _0x50aa3f=Math[_0x1388ec(0xb3)](_0x471219['y']+this[_0x1388ec(0x1e2)]()+(_0x471219['height']-this[_0x1388ec(0x1e2)]()*0x2)/0x2);this[_0x1388ec(0x28f)](TextManager[_0x1388ec(0xc6)],_0x471219['x'],_0x50aa3f,_0x471219['width'],_0x1388ec(0x256));return;}_0x48616d+=this[_0x1388ec(0x1e2)]();let _0x4ff143=_0x2f7d8a['name'];_0x4ff143=_0x4ff143['replace'](/\x1I\[(\d+)\]/gi,''),_0x4ff143=_0x4ff143[_0x1388ec(0x21a)](/\\I\[(\d+)\]/gi,''),this[_0x1388ec(0x28f)](_0x4ff143,_0x1ce43c,_0x48616d,_0x471219[_0x1388ec(0x347)]-_0x1ce43c),_0x48616d+=this['lineHeight'](),this[_0x1388ec(0x1d2)](this[_0x1388ec(0x180)],_0x5d5557,_0x1ce43c,_0x48616d-0x4),_0x48616d+=this[_0x1388ec(0x1e2)](),this[_0x1388ec(0x2a5)](_0x5d5557,_0x471219),this[_0x1388ec(0x2cb)](_0x5d5557,_0x343bc7,_0x438823,_0x471219);},Window_ClassTier['prototype'][_0x24e0d4(0x2cb)]=function(){const _0x32892d=_0x24e0d4,_0xfacfc1=VisuMZ[_0x32892d(0x219)]['Settings'][_0x32892d(0x273)][_0x32892d(0x2fc)];if(_0xfacfc1){_0xfacfc1[_0x32892d(0xe6)](this,arguments);return;}const _0x38d07f=arguments[0x0],_0x36b50a=arguments[0x1],_0x2e4a79=arguments[0x2],_0x326560=arguments[0x3],_0x264b01=$dataClasses[_0x38d07f],_0x1bf3c1=Imported[_0x32892d(0x107)],_0x59e799=!![],_0x9edced=0x16;let _0x3a3d0a=_0x326560['x']+this[_0x32892d(0x2ca)]()*0x4,_0x2e6d0b=_0x326560['y']+this[_0x32892d(0x1e2)]()*3.25,_0x36d443=_0x326560[_0x32892d(0x347)]-this['itemPadding']()*0x8;if(_0x2e4a79[_0x32892d(0x217)]&&_0x2e6d0b+this['lineHeight']()<=_0x326560['y']+_0x326560[_0x32892d(0x232)]){let _0x32ff20=_0x264b01[_0x32892d(0x19d)]['filter'](_0x242f92=>_0x242f92['code']===Game_BattlerBase[_0x32892d(0x342)])[_0x32892d(0x1f0)](_0x3701f8=>$dataSystem[_0x32892d(0x2fb)][_0x3701f8['dataId']])['join'](',\x20'),_0x3e5a17=_0x32892d(0x18f)[_0x32892d(0x369)](TextManager[_0x32892d(0x2b3)],_0x32ff20,_0x9edced||0x16);if(_0x59e799)_0x3e5a17=_0x3e5a17[_0x32892d(0x21a)](/\\I\[(\d+)\]/gi,'');if(_0x1bf3c1)_0x3e5a17=_0x32892d(0x30a)+_0x3e5a17;this[_0x32892d(0x374)](_0x3e5a17,_0x3a3d0a,_0x2e6d0b,_0x36d443),_0x2e6d0b+=this[_0x32892d(0x1e2)]();}if(_0x2e4a79['EquipWeapons']&&_0x2e6d0b+this[_0x32892d(0x1e2)]()<=_0x326560['y']+_0x326560[_0x32892d(0x232)]){let _0x55466a=_0x264b01['traits'][_0x32892d(0x240)](_0x4bdeae=>_0x4bdeae[_0x32892d(0x254)]===Game_BattlerBase[_0x32892d(0x185)])['map'](_0x2cad5c=>$dataSystem['weaponTypes'][_0x2cad5c[_0x32892d(0x1f2)]])[_0x32892d(0x131)](',\x20'),_0x4a29a7=_0x32892d(0x18f)[_0x32892d(0x369)](TextManager[_0x32892d(0x294)],_0x55466a,_0x9edced||0x16);if(_0x59e799)_0x4a29a7=_0x4a29a7[_0x32892d(0x21a)](/\\I\[(\d+)\]/gi,'');if(_0x1bf3c1)_0x4a29a7='<WordWrap>'+_0x4a29a7;this['drawTextEx'](_0x4a29a7,_0x3a3d0a,_0x2e6d0b,_0x36d443),_0x2e6d0b+=this[_0x32892d(0x1e2)]();}if(_0x2e4a79[_0x32892d(0x10b)]&&_0x2e6d0b+this[_0x32892d(0x1e2)]()<=_0x326560['y']+_0x326560[_0x32892d(0x232)]){let _0x5bf001=_0x264b01[_0x32892d(0x19d)][_0x32892d(0x240)](_0x395d89=>_0x395d89['code']===Game_BattlerBase[_0x32892d(0xd0)])[_0x32892d(0x1f0)](_0x42d7dd=>$dataSystem[_0x32892d(0x247)][_0x42d7dd[_0x32892d(0x1f2)]])[_0x32892d(0x131)](',\x20'),_0x3e014d=_0x32892d(0x18f)[_0x32892d(0x369)](TextManager[_0x32892d(0x12f)],_0x5bf001,_0x9edced||0x16);if(_0x59e799)_0x3e014d=_0x3e014d['replace'](/\\I\[(\d+)\]/gi,'');if(_0x1bf3c1)_0x3e014d='<WordWrap>'+_0x3e014d;this[_0x32892d(0x374)](_0x3e014d,_0x3a3d0a,_0x2e6d0b,_0x36d443),_0x2e6d0b+=this['lineHeight']();}},Window_ClassTier[_0x24e0d4(0x13f)]['processCursorMove']=function(){const _0x1778f3=_0x24e0d4;Window_ClassCommand['prototype']['processCursorMove']['call'](this),this[_0x1778f3(0x1e6)]();},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x1e6)]=function(){const _0x26f0a4=_0x24e0d4;if(!this[_0x26f0a4(0x141)]())return;if(!this['_actor'])return;Input[_0x26f0a4(0x140)](_0x26f0a4(0x109))&&(this['_actor']&&(this[_0x26f0a4(0xc1)](this['index']())?(this['processShiftRemoveShortcut'](),this[_0x26f0a4(0x350)]()):this[_0x26f0a4(0x348)]()));},Window_ClassTier['prototype'][_0x24e0d4(0x141)]=function(){const _0x4ad1a4=_0x24e0d4;if(!this[_0x4ad1a4(0x32d)])return![];if(!VisuMZ[_0x4ad1a4(0x219)][_0x4ad1a4(0x2ba)][_0x4ad1a4(0x273)][_0x4ad1a4(0x16e)])return![];return!![];},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0xc1)]=function(_0x4608a3){const _0x531500=_0x24e0d4;if(!this[_0x531500(0x180)])return;const _0x4eb15f=this[_0x531500(0x2cf)]()+0x1;if(_0x4eb15f<=0x1)return![];if(this[_0x531500(0x180)][_0x531500(0x13a)](_0x4eb15f))return![];if(!this[_0x531500(0x180)][_0x531500(0x18c)](_0x4eb15f))return![];return!![];;},Window_ClassTier[_0x24e0d4(0x13f)][_0x24e0d4(0x288)]=function(){const _0x158ab8=_0x24e0d4;SoundManager['playClassChange'](),this[_0x158ab8(0x180)]['changeMulticlass'](0x0,this[_0x158ab8(0x2cf)]()+0x1),this[_0x158ab8(0x33d)](),SceneManager[_0x158ab8(0x277)][_0x158ab8(0x201)]['refresh']();};function _0x556f(_0x532289,_0x39f05a){const _0x5cea09=_0x5cea();return _0x556f=function(_0x556f6f,_0x5363d0){_0x556f6f=_0x556f6f-0xae;let _0x3228a2=_0x5cea09[_0x556f6f];return _0x3228a2;},_0x556f(_0x532289,_0x39f05a);}function Window_ClassList(){const _0x415a8f=_0x24e0d4;this[_0x415a8f(0x187)](...arguments);}Window_ClassList[_0x24e0d4(0x13f)]=Object[_0x24e0d4(0xef)](Window_ClassCommand[_0x24e0d4(0x13f)]),Window_ClassList['prototype'][_0x24e0d4(0xd7)]=Window_ClassList,Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x187)]=function(_0xea935f){const _0x3118c0=_0x24e0d4;this[_0x3118c0(0x10f)]=0x1,Window_ClassCommand['prototype'][_0x3118c0(0x187)][_0x3118c0(0x146)](this,_0xea935f);},Window_ClassList[_0x24e0d4(0x13f)]['playOkSound']=function(){const _0x273de6=_0x24e0d4;SoundManager[_0x273de6(0x133)]();},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x1f6)]=function(_0xf5b3a8){const _0x3fafee=_0x24e0d4;this[_0x3fafee(0x201)]=_0xf5b3a8,this[_0x3fafee(0x1a5)]();},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x350)]=function(){const _0x1eb317=_0x24e0d4;this[_0x1eb317(0x249)]&&(this[_0x1eb317(0x251)]()?this['_helpWindow']['setItem'](this[_0x1eb317(0x251)]()):this[_0x1eb317(0x249)][_0x1eb317(0x231)](TextManager[_0x1eb317(0x245)])),this[_0x1eb317(0x180)]&&this[_0x1eb317(0x201)]&&this[_0x1eb317(0x112)]();},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x112)]=function(){const _0x30a79e=_0x24e0d4,_0x2dc0af=this['currentExt'](),_0x3e245a=JsonEx[_0x30a79e(0x1c5)](this[_0x30a79e(0x180)]);_0x3e245a['_tempActor']=!![],_0x2dc0af!==this['_actor'][_0x30a79e(0x1d0)]()&&(_0x2dc0af?_0x3e245a['changeMulticlass'](_0x2dc0af['id'],this[_0x30a79e(0x10f)]):_0x3e245a[_0x30a79e(0xc7)](0x0,this['_tier'])),this[_0x30a79e(0x201)][_0x30a79e(0x2ff)](_0x3e245a);},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x315)]=function(_0x354601){const _0x38f772=_0x24e0d4;this[_0x38f772(0x10f)]!==_0x354601&&(this[_0x38f772(0x10f)]=_0x354601,this[_0x38f772(0x33d)]());},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x1e3)]=function(){const _0x49e3af=_0x24e0d4;if(!this['_actor'])return;if(this['_tier']<=0x0)return;const _0x5f0ec2=DataManager[_0x49e3af(0x121)](this[_0x49e3af(0x180)]);for(const _0x34358b of _0x5f0ec2){if(!_0x34358b)continue;let _0x27c7ea=_0x34358b[_0x49e3af(0x2c5)];_0x27c7ea=_0x27c7ea[_0x49e3af(0x21a)](/\x1I\[(\d+)\]/gi,''),_0x27c7ea=_0x27c7ea[_0x49e3af(0x21a)](/\\I\[(\d+)\]/gi,'');const _0x10d14f=this[_0x49e3af(0x14d)](_0x34358b);this[_0x49e3af(0x186)](_0x27c7ea,_0x49e3af(0x2c1),_0x10d14f,_0x34358b);}this[_0x49e3af(0x10f)]>0x1&&this['addCommand']('','classChange',!![],null);},Window_ClassList[_0x24e0d4(0x2bf)]=VisuMZ[_0x24e0d4(0x219)][_0x24e0d4(0x2ba)][_0x24e0d4(0x2bc)][_0x24e0d4(0x2d2)]??!![],Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x14d)]=function(_0x23d46b){const _0x5ae647=_0x24e0d4;if(this['_actor']['isClassChangeTierRestricted'](this[_0x5ae647(0x10f)]))return![];if(this[_0x5ae647(0x10f)]>0x1&&_0x23d46b===this['_actor'][_0x5ae647(0x1d0)]())return![];if(_0x23d46b){const _0x2984ae=this[_0x5ae647(0x180)][_0x5ae647(0x235)](_0x23d46b['id']);if(_0x2984ae>0x0&&this[_0x5ae647(0x180)][_0x5ae647(0x13a)](_0x2984ae))return![];const _0x1c58c3=DataManager[_0x5ae647(0x31a)](_0x23d46b);if(!_0x1c58c3[_0x5ae647(0xe9)](this[_0x5ae647(0x10f)]))return![];if(!Window_ClassList[_0x5ae647(0x2bf)]){const _0x2252b7=this['_actor']['getMulticlassAtTier'](this[_0x5ae647(0x10f)]);if(_0x2252b7===_0x23d46b)return![];}}return this[_0x5ae647(0x10f)]>0x0;},Window_ClassList[_0x24e0d4(0x13f)][_0x24e0d4(0x371)]=function(_0x2a7843){const _0x45da2a=_0x24e0d4;if(!this[_0x45da2a(0x180)])return;const _0x26a29d=this[_0x45da2a(0xe5)](_0x2a7843),_0x1d2fca=this['_tier'],_0x4d4f7c=this[_0x45da2a(0x1b7)][_0x2a7843][_0x45da2a(0x1c0)],_0x4fcd30=_0x4d4f7c?_0x4d4f7c['id']:0x0,_0x382ac0=VisuMZ[_0x45da2a(0x219)][_0x45da2a(0x2ba)][_0x45da2a(0x2d3)];if(!_0x382ac0)return;const _0x238d86=_0x382ac0[_0x1d2fca-0x1];if(!_0x238d86)return;let _0x3201d7=_0x26a29d['x'],_0x4adb33=_0x26a29d['y'],_0x2dac98=_0x26a29d['width']-this['itemPadding']()*0x2,_0x1b41fc=_0x26a29d[_0x45da2a(0x232)],_0x5ea853=Math[_0x45da2a(0x283)](_0x2dac98,_0x1b41fc,this['lineHeight']()*0x3);_0x5ea853=Math['floor'](_0x5ea853/ImageManager[_0x45da2a(0x29d)])*ImageManager[_0x45da2a(0x29d)],_0x3201d7+=_0x5ea853+this[_0x45da2a(0x2ca)]()*0x4,this['resetFontSettings'](),this[_0x45da2a(0x209)](),this[_0x45da2a(0x19c)](_0x26a29d),this[_0x45da2a(0x130)](this[_0x45da2a(0x14d)](_0x4d4f7c));if(!_0x4d4f7c){this[_0x45da2a(0x130)](![]);const _0x24e98d=Math[_0x45da2a(0xb3)](_0x26a29d['y']+this['lineHeight']()+(_0x26a29d[_0x45da2a(0x232)]-this[_0x45da2a(0x1e2)]()*0x2)/0x2);this[_0x45da2a(0x28f)](TextManager[_0x45da2a(0x237)],_0x26a29d['x'],_0x24e98d,_0x26a29d[_0x45da2a(0x347)],'center');return;}this[_0x45da2a(0x1ca)](_0x2a7843,_0x4d4f7c,_0x26a29d);const _0x4e95f8=this[_0x45da2a(0x180)][_0x45da2a(0x235)](_0x4fcd30);if(_0x4e95f8>0x0){const _0x344caf=_0x382ac0[_0x4e95f8-0x1];_0x344caf&&(this[_0x45da2a(0x2b9)](ColorManager['getColor'](_0x344caf[_0x45da2a(0x11e)])),this[_0x45da2a(0x28f)](_0x344caf[_0x45da2a(0x2c3)],_0x26a29d['x'],_0x26a29d['y'],_0x26a29d[_0x45da2a(0x347)],_0x45da2a(0x256)),this[_0x45da2a(0x209)]());}this[_0x45da2a(0x130)](this['isEnabled'](_0x4d4f7c)),_0x4adb33+=this[_0x45da2a(0x1e2)]();let _0x47356d=_0x4d4f7c['name'];_0x47356d=_0x47356d[_0x45da2a(0x21a)](/\x1I\[(\d+)\]/gi,''),_0x47356d=_0x47356d[_0x45da2a(0x21a)](/\\I\[(\d+)\]/gi,''),this[_0x45da2a(0x28f)](_0x47356d,_0x3201d7,_0x4adb33,_0x26a29d[_0x45da2a(0x347)]-_0x3201d7),_0x4adb33+=this[_0x45da2a(0x1e2)](),this[_0x45da2a(0x1d2)](this[_0x45da2a(0x180)],_0x4fcd30,_0x3201d7,_0x4adb33-0x4),_0x4adb33+=this['lineHeight'](),this[_0x45da2a(0x2a5)](_0x4fcd30,_0x26a29d);};