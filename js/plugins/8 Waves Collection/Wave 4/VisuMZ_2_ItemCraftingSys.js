//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
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
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 * 
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *     - Items CANNOT add themselves!
 *     - ie. Item #8 must not give Item #8.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *     - Items CANNOT add themselves!
 *     - ie. Item 'Super Potion' must not give Item 'Super Potion'.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
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
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 * 
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
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
 * Version 1.22: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Added extra clarity to <Craft Batch>
 * *** Items CANNOT add themselves!
 * *** ie. Item 'Super Potion' must not give Item 'Super Potion'.
 * * Feature Update!
 * ** Add fail safes to prevent items from having batch entries add themselves.
 *    Added by Arisu.
 * 
 * Version 1.21: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Items and Equips Core features!
 * 
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with related non-crafting
 *    scenes. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
 * 
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
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
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
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
 * @param ItemCraftingSys
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
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
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
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
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
 * @default Skill2
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
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x164ac2=_0x4529;(function(_0x13bd55,_0x1e1d90){const _0xd2c7fb=_0x4529,_0x255f20=_0x13bd55();while(!![]){try{const _0x494d1e=parseInt(_0xd2c7fb(0x2ab))/0x1+parseInt(_0xd2c7fb(0x111))/0x2+-parseInt(_0xd2c7fb(0x2a5))/0x3+parseInt(_0xd2c7fb(0x177))/0x4+-parseInt(_0xd2c7fb(0x318))/0x5*(-parseInt(_0xd2c7fb(0x257))/0x6)+-parseInt(_0xd2c7fb(0x179))/0x7+-parseInt(_0xd2c7fb(0x303))/0x8;if(_0x494d1e===_0x1e1d90)break;else _0x255f20['push'](_0x255f20['shift']());}catch(_0x3e3c5a){_0x255f20['push'](_0x255f20['shift']());}}}(_0x3e9b,0xde57e));var label=_0x164ac2(0x2d2),tier=tier||0x0,dependencies=['VisuMZ_1_ItemsEquipsCore'],pluginData=$plugins['filter'](function(_0x238db6){const _0x302972=_0x164ac2;return _0x238db6[_0x302972(0x21a)]&&_0x238db6[_0x302972(0x278)][_0x302972(0x2f3)]('['+label+']');})[0x0];function _0x4529(_0x39cafb,_0xa6930c){const _0x3e9b76=_0x3e9b();return _0x4529=function(_0x4529ac,_0x4ba53f){_0x4529ac=_0x4529ac-0xfb;let _0x4c0d6a=_0x3e9b76[_0x4529ac];return _0x4c0d6a;},_0x4529(_0x39cafb,_0xa6930c);}VisuMZ[label]['Settings']=VisuMZ[label][_0x164ac2(0x2cc)]||{},VisuMZ['ConvertParams']=function(_0x329ca1,_0x202fc9){const _0x260a2a=_0x164ac2;for(const _0x3d2dc0 in _0x202fc9){if(_0x3d2dc0[_0x260a2a(0x116)](/(.*):(.*)/i)){const _0x1b2d81=String(RegExp['$1']),_0x480c46=String(RegExp['$2'])[_0x260a2a(0x178)]()[_0x260a2a(0x2f6)]();let _0x2f603f,_0x405a0d,_0xf3efa9;switch(_0x480c46){case _0x260a2a(0x20c):_0x2f603f=_0x202fc9[_0x3d2dc0]!==''?Number(_0x202fc9[_0x3d2dc0]):0x0;break;case _0x260a2a(0x2ff):_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON['parse'](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d['map'](_0x4f5acf=>Number(_0x4f5acf));break;case _0x260a2a(0x24a):_0x2f603f=_0x202fc9[_0x3d2dc0]!==''?eval(_0x202fc9[_0x3d2dc0]):null;break;case'ARRAYEVAL':_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON['parse'](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d[_0x260a2a(0x1be)](_0x2a4765=>eval(_0x2a4765));break;case _0x260a2a(0xfb):_0x2f603f=_0x202fc9[_0x3d2dc0]!==''?JSON[_0x260a2a(0x1f3)](_0x202fc9[_0x3d2dc0]):'';break;case _0x260a2a(0x1a9):_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON[_0x260a2a(0x1f3)](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d[_0x260a2a(0x1be)](_0x230319=>JSON['parse'](_0x230319));break;case _0x260a2a(0x32e):_0x2f603f=_0x202fc9[_0x3d2dc0]!==''?new Function(JSON[_0x260a2a(0x1f3)](_0x202fc9[_0x3d2dc0])):new Function(_0x260a2a(0x12a));break;case'ARRAYFUNC':_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON[_0x260a2a(0x1f3)](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d['map'](_0x48035b=>new Function(JSON[_0x260a2a(0x1f3)](_0x48035b)));break;case _0x260a2a(0x107):_0x2f603f=_0x202fc9[_0x3d2dc0]!==''?String(_0x202fc9[_0x3d2dc0]):'';break;case _0x260a2a(0x297):_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON[_0x260a2a(0x1f3)](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d[_0x260a2a(0x1be)](_0x17430c=>String(_0x17430c));break;case _0x260a2a(0x2d4):_0xf3efa9=_0x202fc9[_0x3d2dc0]!==''?JSON['parse'](_0x202fc9[_0x3d2dc0]):{},_0x2f603f=VisuMZ[_0x260a2a(0x22c)]({},_0xf3efa9);break;case _0x260a2a(0x24f):_0x405a0d=_0x202fc9[_0x3d2dc0]!==''?JSON['parse'](_0x202fc9[_0x3d2dc0]):[],_0x2f603f=_0x405a0d[_0x260a2a(0x1be)](_0x2eef03=>VisuMZ[_0x260a2a(0x22c)]({},JSON[_0x260a2a(0x1f3)](_0x2eef03)));break;default:continue;}_0x329ca1[_0x1b2d81]=_0x2f603f;}}return _0x329ca1;},(_0x4b20cc=>{const _0x2bd693=_0x164ac2,_0xc8ca13=_0x4b20cc['name'];for(const _0xc82229 of dependencies){if(!Imported[_0xc82229]){alert(_0x2bd693(0x209)[_0x2bd693(0x188)](_0xc8ca13,_0xc82229)),SceneManager[_0x2bd693(0x2c6)]();break;}}const _0x464dec=_0x4b20cc[_0x2bd693(0x278)];if(_0x464dec[_0x2bd693(0x116)](/\[Version[ ](.*?)\]/i)){const _0x3a0676=Number(RegExp['$1']);_0x3a0676!==VisuMZ[label][_0x2bd693(0x2e2)]&&(alert(_0x2bd693(0x159)[_0x2bd693(0x188)](_0xc8ca13,_0x3a0676)),SceneManager[_0x2bd693(0x2c6)]());}if(_0x464dec[_0x2bd693(0x116)](/\[Tier[ ](\d+)\]/i)){const _0x462906=Number(RegExp['$1']);_0x462906<tier?(alert(_0x2bd693(0x15e)[_0x2bd693(0x188)](_0xc8ca13,_0x462906,tier)),SceneManager[_0x2bd693(0x2c6)]()):tier=Math[_0x2bd693(0x1d6)](_0x462906,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2bd693(0x2cc)],_0x4b20cc[_0x2bd693(0x237)]);})(pluginData);if(VisuMZ['ItemsEquipsCore'][_0x164ac2(0x2e2)]<1.38){let text='';text+=_0x164ac2(0x12b),text+='in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.',alert(text),SceneManager[_0x164ac2(0x2c6)]();}VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x230)]=_0x164ac2(0x255),PluginManager[_0x164ac2(0x1f5)](pluginData[_0x164ac2(0x32d)],_0x164ac2(0x17c),_0x14c2e6=>{const _0x5f479c=_0x164ac2;if(SceneManager['isSceneBattle']())return;if(SceneManager['isSceneItemCrafting']())return;if($gameSystem[_0x5f479c(0x2fd)])return;if(DataManager[_0x5f479c(0x1a7)]()[_0x5f479c(0x225)]<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ['ItemCraftingSys']['WarningMsg']);return;}SceneManager[_0x5f479c(0x16b)](Scene_ItemCrafting);}),PluginManager[_0x164ac2(0x1f5)](pluginData[_0x164ac2(0x32d)],_0x164ac2(0x246),_0x783d38=>{const _0x413ab7=_0x164ac2;if(SceneManager[_0x413ab7(0x31a)]())return;if(SceneManager['isSceneItemCrafting']())return;if($gameSystem[_0x413ab7(0x2fd)])return;VisuMZ[_0x413ab7(0x22c)](_0x783d38,_0x783d38);const _0x466992={'items':_0x783d38['Items']['map'](_0x37086b=>$dataItems[_0x37086b])[_0x413ab7(0x11b)](_0x4f5cf9=>DataManager[_0x413ab7(0x174)]()[_0x413ab7(0x2f3)](_0x4f5cf9)),'weapons':_0x783d38[_0x413ab7(0x2bc)][_0x413ab7(0x1be)](_0x4356a0=>$dataWeapons[_0x4356a0])[_0x413ab7(0x11b)](_0x25e8cb=>DataManager[_0x413ab7(0x101)]()['includes'](_0x25e8cb)),'armors':_0x783d38[_0x413ab7(0x1d7)][_0x413ab7(0x1be)](_0x42ebb1=>$dataArmors[_0x42ebb1])[_0x413ab7(0x11b)](_0x11a732=>DataManager[_0x413ab7(0x14d)]()[_0x413ab7(0x2f3)](_0x11a732)),'BypassSwitches':_0x783d38['BypassSwitches'],'BypassMasks':_0x783d38[_0x413ab7(0x2bf)]};_0x466992['all']=_0x466992[_0x413ab7(0x268)][_0x413ab7(0x17a)](_0x466992[_0x413ab7(0x157)],_0x466992['armors']);if(_0x466992[_0x413ab7(0x204)][_0x413ab7(0x225)]<=0x0){$gameTemp[_0x413ab7(0x1ed)]()&&alert(VisuMZ[_0x413ab7(0x2d2)][_0x413ab7(0x230)]);return;}$gameTemp['setCustomItemCraftingSettings'](_0x466992),SceneManager[_0x413ab7(0x16b)](Scene_ItemCrafting);}),PluginManager[_0x164ac2(0x1f5)](pluginData[_0x164ac2(0x32d)],'ReturnToLastCrafting',_0x4e4aeb=>{const _0x5e08e4=_0x164ac2;if(!SceneManager[_0x5e08e4(0x1a8)]())return;if(!$gameSystem[_0x5e08e4(0x2fd)])return;$gameSystem[_0x5e08e4(0x2fd)]=undefined,SceneManager[_0x5e08e4(0x16b)](Scene_ItemCrafting);}),PluginManager[_0x164ac2(0x1f5)](pluginData[_0x164ac2(0x32d)],_0x164ac2(0x27b),_0x506bbd=>{const _0xe43352=_0x164ac2;VisuMZ[_0xe43352(0x22c)](_0x506bbd,_0x506bbd),$gameSystem[_0xe43352(0x132)](_0x506bbd[_0xe43352(0x27e)]);}),PluginManager[_0x164ac2(0x1f5)](pluginData[_0x164ac2(0x32d)],'SystemShowItemCraftingMenu',_0x50337b=>{const _0x472f0d=_0x164ac2;VisuMZ['ConvertParams'](_0x50337b,_0x50337b),$gameSystem['setMainMenuItemCraftingVisible'](_0x50337b[_0x472f0d(0x26f)]);}),VisuMZ['ItemCraftingSys']['RegExp']={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ[_0x164ac2(0x2d2)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x164ac2(0x2da)][_0x164ac2(0x313)],Scene_Boot[_0x164ac2(0x2da)][_0x164ac2(0x313)]=function(){const _0x7a80d1=_0x164ac2;VisuMZ[_0x7a80d1(0x2d2)][_0x7a80d1(0x2d8)]['call'](this),this[_0x7a80d1(0x283)]();},Scene_Boot['prototype']['process_VisuMZ_ItemCraftingSys_Notetags']=function(){const _0x47ed11=_0x164ac2;this[_0x47ed11(0x2b2)]();},Scene_Boot['prototype']['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']=function(){const _0x1a0c2e=_0x164ac2;if(VisuMZ[_0x1a0c2e(0x325)])return;const _0x41c8e0=$dataItems[_0x1a0c2e(0x17a)]($dataWeapons,$dataArmors);for(const _0x55f878 of _0x41c8e0){if(!_0x55f878)continue;VisuMZ['ItemCraftingSys'][_0x1a0c2e(0x29d)](_0x55f878);}},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x134)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x357ccd){const _0x17aa5d=_0x164ac2;VisuMZ['ItemCraftingSys'][_0x17aa5d(0x134)][_0x17aa5d(0x24d)](this,_0x357ccd),VisuMZ[_0x17aa5d(0x2d2)][_0x17aa5d(0x29d)](_0x357ccd);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x327)]=VisuMZ[_0x164ac2(0x327)],VisuMZ[_0x164ac2(0x327)]=function(_0x3fb905){const _0x10be65=_0x164ac2;VisuMZ[_0x10be65(0x2d2)][_0x10be65(0x327)][_0x10be65(0x24d)](this,_0x3fb905),VisuMZ[_0x10be65(0x2d2)][_0x10be65(0x29d)](_0x3fb905);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x129)]=VisuMZ[_0x164ac2(0x129)],VisuMZ[_0x164ac2(0x129)]=function(_0x1adec8){const _0x3e3d1b=_0x164ac2;VisuMZ[_0x3e3d1b(0x2d2)][_0x3e3d1b(0x129)][_0x3e3d1b(0x24d)](this,_0x1adec8),VisuMZ['ItemCraftingSys'][_0x3e3d1b(0x29d)](_0x1adec8);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x29d)]=function(_0x2d8eb2){const _0x46e9a4=_0x164ac2;_0x2d8eb2[_0x46e9a4(0x309)][_0x46e9a4(0x116)](VisuMZ['ItemCraftingSys'][_0x46e9a4(0x11c)][_0x46e9a4(0x22d)])&&VisuMZ[_0x46e9a4(0x2d2)][_0x46e9a4(0x1fe)](_0x2d8eb2,RegExp['$1']);},VisuMZ[_0x164ac2(0x2d2)]['JS']={},VisuMZ['ItemCraftingSys'][_0x164ac2(0x1fe)]=function(_0x4869ac,_0x31db11){const _0x36b553=_0x164ac2,_0x4214a4=_0x36b553(0x322)[_0x36b553(0x188)](_0x31db11),_0x8fbb82=DataManager[_0x36b553(0x146)](_0x4869ac);VisuMZ[_0x36b553(0x2d2)]['JS'][_0x8fbb82]=new Function(_0x4214a4);},DataManager[_0x164ac2(0x302)]=function(_0x445713){const _0x3201c9=_0x164ac2;if(!_0x445713)return![];if(DataManager['getCraftingIngredients'](_0x445713)['length']<=0x0)return![];if(_0x445713[_0x3201c9(0x309)][_0x3201c9(0x116)](VisuMZ[_0x3201c9(0x2d2)]['RegExp'][_0x3201c9(0x11f)])){if(!$gameTemp[_0x3201c9(0x242)]())return![];}if(!VisuMZ[_0x3201c9(0x2d2)]['Settings']['General']['jsGlobalListing'][_0x3201c9(0x24d)](this,_0x445713))return![];if(!VisuMZ[_0x3201c9(0x2d2)][_0x3201c9(0x1ef)](_0x445713))return![];if(!VisuMZ['ItemCraftingSys']['CheckAnySwitches'](_0x445713))return![];return!![];},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x1ef)]=function(_0x520b5d){const _0x525dfa=_0x164ac2,_0x42e376=$gameTemp[_0x525dfa(0x242)]();if(_0x42e376&&_0x42e376[_0x525dfa(0x126)])return!![];const _0x243535=VisuMZ['ItemCraftingSys']['RegExp'][_0x525dfa(0x17d)],_0x3765d1=_0x520b5d[_0x525dfa(0x309)][_0x525dfa(0x116)](_0x243535);if(_0x3765d1)for(const _0x32446d of _0x3765d1){if(!_0x32446d)continue;_0x32446d[_0x525dfa(0x116)](_0x243535);const _0x10a5cb=JSON[_0x525dfa(0x1f3)]('['+RegExp['$1'][_0x525dfa(0x116)](/\d+/g)+']');for(const _0x2407b5 of _0x10a5cb){if(!$gameSwitches[_0x525dfa(0x200)](_0x2407b5))return![];}}return!![];},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x1f2)]=function(_0x579295){const _0x5e188c=_0x164ac2,_0x3de41c=$gameTemp[_0x5e188c(0x242)]();if(_0x3de41c&&_0x3de41c[_0x5e188c(0x126)])return!![];const _0x38ebae=VisuMZ[_0x5e188c(0x2d2)][_0x5e188c(0x11c)][_0x5e188c(0x1b7)],_0x220204=_0x579295[_0x5e188c(0x309)][_0x5e188c(0x116)](_0x38ebae);if(_0x220204){for(const _0x34e4eb of _0x220204){if(!_0x34e4eb)continue;_0x34e4eb[_0x5e188c(0x116)](_0x38ebae);const _0x33124f=JSON[_0x5e188c(0x1f3)]('['+RegExp['$1'][_0x5e188c(0x116)](/\d+/g)+']');for(const _0x1f25d0 of _0x33124f){if($gameSwitches[_0x5e188c(0x200)](_0x1f25d0))return!![];}}return![];}return!![];},DataManager[_0x164ac2(0x1a7)]=function(){const _0x5d5f87=_0x164ac2,_0x1a2f16=$gameTemp['getCustomItemCraftingSettings']();if(_0x1a2f16)return _0x1a2f16[_0x5d5f87(0x204)][_0x5d5f87(0x11b)](_0x3a9d85=>this['isCraftItemListed'](_0x3a9d85));const _0x212e69=this[_0x5d5f87(0x1aa)](),_0x40e483=this[_0x5d5f87(0x1fc)](),_0x961a4=this[_0x5d5f87(0x2b3)]();return _0x212e69[_0x5d5f87(0x17a)](_0x40e483,_0x961a4);},DataManager[_0x164ac2(0x1aa)]=function(){const _0x237e49=_0x164ac2;let _0x29ea9d=this[_0x237e49(0x174)]()[_0x237e49(0x11b)](_0x1503a6=>this[_0x237e49(0x302)](_0x1503a6));if(VisuMZ[_0x237e49(0x1e8)][_0x237e49(0x1a6)])VisuMZ[_0x237e49(0x1e8)][_0x237e49(0x1a6)](_0x29ea9d);return _0x29ea9d;},DataManager[_0x164ac2(0x174)]=function(){const _0x4cf2b9=_0x164ac2;if(this[_0x4cf2b9(0x266)]!==undefined)return this[_0x4cf2b9(0x266)];this['_allCraftableItems']=[];for(const _0x5a4173 of $dataItems){if(!_0x5a4173)continue;_0x5a4173[_0x4cf2b9(0x309)][_0x4cf2b9(0x116)](VisuMZ[_0x4cf2b9(0x2d2)][_0x4cf2b9(0x11c)][_0x4cf2b9(0x27c)])&&this['_allCraftableItems'][_0x4cf2b9(0x16b)](_0x5a4173);}return this[_0x4cf2b9(0x266)];},DataManager[_0x164ac2(0x1fc)]=function(){const _0x17bc4c=_0x164ac2;let _0x4f2439=this[_0x17bc4c(0x101)]()[_0x17bc4c(0x11b)](_0x1e0f00=>this[_0x17bc4c(0x302)](_0x1e0f00));if(VisuMZ[_0x17bc4c(0x1e8)][_0x17bc4c(0x1a6)])VisuMZ[_0x17bc4c(0x1e8)][_0x17bc4c(0x1a6)](_0x4f2439);return _0x4f2439;},DataManager[_0x164ac2(0x101)]=function(){const _0x339513=_0x164ac2;if(this['_allCraftableWeapons']!==undefined)return this[_0x339513(0x31c)];this[_0x339513(0x31c)]=[];for(const _0x1499fe of $dataWeapons){if(!_0x1499fe)continue;_0x1499fe[_0x339513(0x309)][_0x339513(0x116)](VisuMZ[_0x339513(0x2d2)][_0x339513(0x11c)][_0x339513(0x27c)])&&this['_allCraftableWeapons'][_0x339513(0x16b)](_0x1499fe);}return this[_0x339513(0x31c)];},DataManager[_0x164ac2(0x2b3)]=function(){const _0x11073a=_0x164ac2;let _0x115218=this['allCraftableArmors']()[_0x11073a(0x11b)](_0x4990fe=>this[_0x11073a(0x302)](_0x4990fe));if(VisuMZ[_0x11073a(0x1e8)]['SortByIDandPriority'])VisuMZ[_0x11073a(0x1e8)][_0x11073a(0x1a6)](_0x115218);return _0x115218;},DataManager[_0x164ac2(0x14d)]=function(){const _0x4c976a=_0x164ac2;if(this[_0x4c976a(0x183)]!==undefined)return this[_0x4c976a(0x183)];this['_allCraftableArmors']=[];for(const _0x5a67c6 of $dataArmors){if(!_0x5a67c6)continue;_0x5a67c6[_0x4c976a(0x309)]['match'](VisuMZ[_0x4c976a(0x2d2)][_0x4c976a(0x11c)][_0x4c976a(0x27c)])&&this[_0x4c976a(0x183)][_0x4c976a(0x16b)](_0x5a67c6);}return this[_0x4c976a(0x183)];},DataManager[_0x164ac2(0x234)]=function(_0x28c4b7){const _0x4a8d75=_0x164ac2;if(!_0x28c4b7)return[];const _0x4a6bc0=this[_0x4a8d75(0x146)](_0x28c4b7);return this[_0x4a8d75(0x182)]===undefined&&this[_0x4a8d75(0x2aa)](),this[_0x4a8d75(0x182)][_0x4a6bc0]||[];},DataManager[_0x164ac2(0x146)]=function(_0x53ac8d){const _0x5402bf=_0x164ac2;let _0x1fa561=_0x5402bf(0x280);if(this[_0x5402bf(0x2c0)](_0x53ac8d))return _0x1fa561[_0x5402bf(0x188)](_0x5402bf(0x2cf),_0x53ac8d['id']);if(this[_0x5402bf(0x240)](_0x53ac8d))return _0x1fa561[_0x5402bf(0x188)](_0x5402bf(0x292),_0x53ac8d['id']);if(this[_0x5402bf(0x2ca)](_0x53ac8d))return _0x1fa561[_0x5402bf(0x188)](_0x5402bf(0x307),_0x53ac8d['id']);return'';},DataManager[_0x164ac2(0x2aa)]=function(){const _0x548383=_0x164ac2;this[_0x548383(0x182)]={};const _0x2f5c31=$dataItems[_0x548383(0x17a)]($dataWeapons,$dataArmors);for(const _0x320904 of _0x2f5c31){if(!_0x320904)continue;if(_0x320904[_0x548383(0x309)][_0x548383(0x116)](VisuMZ[_0x548383(0x2d2)][_0x548383(0x11c)][_0x548383(0x27c)])){const _0xef46a7=String(RegExp['$1'])[_0x548383(0x106)](/[\r\n]+/),_0x92f40c=this[_0x548383(0x17e)](_0x320904,_0xef46a7);if(_0x92f40c[_0x548383(0x225)]<=0x0)continue;const _0xacf9d6=this[_0x548383(0x146)](_0x320904);this[_0x548383(0x182)][_0xacf9d6]=_0x92f40c;}}},DataManager[_0x164ac2(0x17e)]=function(_0x258fe6,_0x13259c){const _0xd22b61=_0x164ac2;let _0x4b109c=[];for(let _0x2c5ca4 of _0x13259c){_0x2c5ca4=_0x2c5ca4[_0xd22b61(0x2f6)]();if(_0x2c5ca4[_0xd22b61(0x116)](/GOLD:[ ](\d+)/i))_0x4b109c[_0xd22b61(0x16b)]([_0xd22b61(0x213),Number(RegExp['$1'])]);else{if(_0x2c5ca4['match'](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x55a79a=String(RegExp['$1'])['trim'](),_0x2e5a5b=Number(RegExp['$2'])||0x1,_0x3d91c1=_0xd22b61(0x2db)[_0xd22b61(0x188)](_0x55a79a);_0x4b109c[_0xd22b61(0x16b)]([_0x3d91c1,_0x2e5a5b]);}else{if(_0x2c5ca4[_0xd22b61(0x116)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x170c98=RegExp['$1']['toLowerCase']()[_0xd22b61(0x2f6)](),_0x1e0cd3=Number(RegExp['$2'])||0x0,_0x5bfcb5=Number(RegExp['$3'])||0x1;let _0x12be73=null;if([_0xd22b61(0x23e),'items'][_0xd22b61(0x2f3)](_0x170c98))_0x12be73=$dataItems;if([_0xd22b61(0x110),_0xd22b61(0x157)][_0xd22b61(0x2f3)](_0x170c98))_0x12be73=$dataWeapons;if([_0xd22b61(0x1c9),_0xd22b61(0x2be)][_0xd22b61(0x2f3)](_0x170c98))_0x12be73=$dataArmors;this[_0xd22b61(0x30a)](_0x258fe6,_0x12be73,_0x1e0cd3,_0x4b109c)&&_0x4b109c['push']([_0x12be73[_0x1e0cd3],_0x5bfcb5]);}else{if(_0x2c5ca4[_0xd22b61(0x116)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x582dc1=RegExp['$1'][_0xd22b61(0x1e7)]()[_0xd22b61(0x2f6)](),_0x33febe=RegExp['$2'][_0xd22b61(0x2f6)](),_0x56cb1e=Number(RegExp['$3'])||0x1;let _0x5060cf=null,_0x509ee7=0x0;[_0xd22b61(0x23e),_0xd22b61(0x268)][_0xd22b61(0x2f3)](_0x582dc1)&&(_0x5060cf=$dataItems,_0x509ee7=this[_0xd22b61(0x279)](_0x33febe)),[_0xd22b61(0x110),_0xd22b61(0x157)][_0xd22b61(0x2f3)](_0x582dc1)&&(_0x5060cf=$dataWeapons,_0x509ee7=this[_0xd22b61(0x219)](_0x33febe)),[_0xd22b61(0x1c9),_0xd22b61(0x2be)][_0xd22b61(0x2f3)](_0x582dc1)&&(_0x5060cf=$dataArmors,_0x509ee7=this['getArmorIdWithName'](_0x33febe)),this['checkItemCraftingResultsValid'](_0x258fe6,_0x5060cf,_0x509ee7,_0x4b109c)&&_0x4b109c[_0xd22b61(0x16b)]([_0x5060cf[_0x509ee7],_0x56cb1e]);}}}}}return _0x4b109c;},DataManager[_0x164ac2(0x30a)]=function(_0x2439ad,_0x280833,_0x1b95e5,_0x29009c){if(!_0x280833)return![];if(!_0x280833[_0x1b95e5])return![];const _0x5ec83d=_0x280833[_0x1b95e5];if(_0x5ec83d===_0x2439ad)return![];for(const _0x2b2590 of _0x29009c){if(!_0x2b2590)continue;if(_0x2b2590[0x0]===_0x5ec83d)return![];}return!![];},DataManager[_0x164ac2(0x279)]=function(_0x405d51){const _0x43bed2=_0x164ac2;_0x405d51=_0x405d51[_0x43bed2(0x178)]()[_0x43bed2(0x2f6)](),this[_0x43bed2(0x29c)]=this['_itemIDs']||{};if(this[_0x43bed2(0x29c)][_0x405d51])return this['_itemIDs'][_0x405d51];for(const _0x3c8110 of $dataItems){if(!_0x3c8110)continue;this[_0x43bed2(0x29c)][_0x3c8110[_0x43bed2(0x32d)][_0x43bed2(0x178)]()['trim']()]=_0x3c8110['id'];}return this[_0x43bed2(0x29c)][_0x405d51]||0x0;},DataManager[_0x164ac2(0x219)]=function(_0xf7fb6f){const _0x1eb52b=_0x164ac2;_0xf7fb6f=_0xf7fb6f[_0x1eb52b(0x178)]()[_0x1eb52b(0x2f6)](),this[_0x1eb52b(0x28d)]=this[_0x1eb52b(0x28d)]||{};if(this['_weaponIDs'][_0xf7fb6f])return this[_0x1eb52b(0x28d)][_0xf7fb6f];for(const _0x2cf345 of $dataWeapons){if(!_0x2cf345)continue;this['_weaponIDs'][_0x2cf345['name'][_0x1eb52b(0x178)]()[_0x1eb52b(0x2f6)]()]=_0x2cf345['id'];}return this[_0x1eb52b(0x28d)][_0xf7fb6f]||0x0;},DataManager[_0x164ac2(0x1df)]=function(_0x52e8ac){const _0x2dcacd=_0x164ac2;_0x52e8ac=_0x52e8ac[_0x2dcacd(0x178)]()[_0x2dcacd(0x2f6)](),this[_0x2dcacd(0x263)]=this[_0x2dcacd(0x263)]||{};if(this['_armorIDs'][_0x52e8ac])return this['_armorIDs'][_0x52e8ac];for(const _0x44969f of $dataArmors){if(!_0x44969f)continue;this[_0x2dcacd(0x263)][_0x44969f[_0x2dcacd(0x32d)]['toUpperCase']()[_0x2dcacd(0x2f6)]()]=_0x44969f['id'];}return this['_armorIDs'][_0x52e8ac]||0x0;},DataManager[_0x164ac2(0x293)]=function(_0x4567fa){const _0x33f3a1=_0x164ac2;if(!_0x4567fa)return![];if(DataManager['hasCraftBatchItems'](_0x4567fa))return![];if(!VisuMZ[_0x33f3a1(0x2d2)]['Settings'][_0x33f3a1(0x18c)]['Enable'])return![];DataManager[_0x33f3a1(0x170)]&&(_0x4567fa=DataManager[_0x33f3a1(0x170)](_0x4567fa));const _0x455c82=$gameTemp[_0x33f3a1(0x242)]();if(_0x455c82&&_0x455c82[_0x33f3a1(0x2bf)])return![];if(_0x4567fa['note'][_0x33f3a1(0x116)](VisuMZ['ItemCraftingSys'][_0x33f3a1(0x11c)][_0x33f3a1(0x1d0)]))return![];return!$gameSystem[_0x33f3a1(0x1c4)](_0x4567fa);},DataManager['hasCraftBatchItems']=function(_0x13c765){const _0x219fe7=_0x164ac2;if(!Imported['VisuMZ_3_ShopBatches'])return![];return this[_0x219fe7(0x282)](_0x13c765)!==null;},DataManager[_0x164ac2(0x282)]=function(_0x943c4){const _0x155327=_0x164ac2;if(!_0x943c4)return null;if(this['isSkill'](_0x943c4))return null;if(this['isProxyItem'](_0x943c4))return null;if(!Imported[_0x155327(0x148)])return null;let _0x3e8ab3='';if(DataManager[_0x155327(0x2c0)](_0x943c4))_0x3e8ab3='item-%1'[_0x155327(0x188)](_0x943c4['id']);else{if(DataManager[_0x155327(0x240)](_0x943c4))_0x3e8ab3=_0x155327(0x11e)[_0x155327(0x188)](_0x943c4['id']);else{if(DataManager[_0x155327(0x2ca)](_0x943c4))_0x3e8ab3='armor-%1'[_0x155327(0x188)](_0x943c4['id']);else return null;}}DataManager['_cache_getCraftBatchItems']=DataManager[_0x155327(0x165)]||{};if(DataManager[_0x155327(0x165)][_0x3e8ab3]!==undefined)return DataManager[_0x155327(0x165)][_0x3e8ab3];let _0x32df13=![],_0x1b3189={};const _0x1af840=VisuMZ[_0x155327(0x2d2)][_0x155327(0x11c)],_0x5292e0=_0x943c4[_0x155327(0x309)]||'';if(_0x5292e0[_0x155327(0x116)](_0x1af840['CraftBatchWrap'])){const _0x17b53b=String(RegExp['$1'])[_0x155327(0x106)](/[\r\n]+/)[_0x155327(0x1b9)]('');_0x1b3189={'items':{},'weapons':{},'armors':{}};for(const _0x20447f of _0x17b53b){if(_0x20447f['match'](/ITEM[ ](.*):[ ](\d+)/i)){const _0x4b90e8=String(RegExp['$1']),_0x5b2fa6=Math['max'](0x1,Number(RegExp['$2'])),_0x14405d=/^\d+$/['test'](_0x4b90e8),_0x5a60cc=_0x14405d?Number(_0x4b90e8):this[_0x155327(0x279)](_0x4b90e8);if(DataManager[_0x155327(0x2c0)](_0x943c4)&&_0x5a60cc===_0x943c4['id']){let _0xf63985='';_0xf63985+=_0x155327(0x1a4)[_0x155327(0x188)](_0x943c4['name']),_0xf63985+=_0x155327(0x15a),alert(_0xf63985),SceneManager[_0x155327(0x2c6)]();}_0x1b3189[_0x155327(0x268)][_0x5a60cc]=_0x5b2fa6,_0x32df13=!![];}else{if(_0x20447f['match'](/ITEM[ ](.*)/i)){const _0x310631=String(RegExp['$1']),_0x4e3032=/^\d+$/[_0x155327(0x1af)](_0x310631),_0x1e24ae=_0x4e3032?Number(_0x310631):this[_0x155327(0x279)](_0x310631);if(DataManager[_0x155327(0x2c0)](_0x943c4)&&_0x1e24ae===_0x943c4['id']){let _0x2d22ed='';_0x2d22ed+=_0x155327(0x1a4)['format'](_0x943c4[_0x155327(0x32d)]),_0x2d22ed+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x2d22ed),SceneManager[_0x155327(0x2c6)]();}_0x1b3189['items'][_0x1e24ae]=0x1,_0x32df13=!![];}}if(_0x20447f[_0x155327(0x116)](/WEAPON[ ](.*):[ ](\d+)/i)){const _0x3bea96=String(RegExp['$1']),_0x1edc26=Math[_0x155327(0x1d6)](0x1,Number(RegExp['$2'])),_0x420d22=/^\d+$/[_0x155327(0x1af)](_0x3bea96),_0x5b15c6=_0x420d22?Number(_0x3bea96):this[_0x155327(0x219)](_0x3bea96);if(DataManager[_0x155327(0x240)](_0x943c4)&&_0x5b15c6===_0x943c4['id']){let _0x3987ec='';_0x3987ec+=_0x155327(0x1a4)[_0x155327(0x188)](_0x943c4[_0x155327(0x32d)]),_0x3987ec+=_0x155327(0x15a),alert(_0x3987ec),SceneManager[_0x155327(0x2c6)]();}_0x1b3189[_0x155327(0x157)][_0x5b15c6]=_0x1edc26,_0x32df13=!![];}else{if(_0x20447f[_0x155327(0x116)](/WEAPON[ ](.*)/i)){const _0x3d69a9=String(RegExp['$1']),_0x874492=/^\d+$/[_0x155327(0x1af)](_0x3d69a9),_0x39b3fd=_0x874492?Number(_0x3d69a9):this[_0x155327(0x219)](_0x3d69a9);if(DataManager[_0x155327(0x240)](_0x943c4)&&_0x39b3fd===_0x943c4['id']){let _0x46eabf='';_0x46eabf+=_0x155327(0x1a4)[_0x155327(0x188)](_0x943c4[_0x155327(0x32d)]),_0x46eabf+=_0x155327(0x15a),alert(_0x46eabf),SceneManager[_0x155327(0x2c6)]();}_0x1b3189['weapons'][_0x39b3fd]=0x1,_0x32df13=!![];}}if(_0x20447f[_0x155327(0x116)](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x100d50=String(RegExp['$1']),_0x4835ec=Math[_0x155327(0x1d6)](0x1,Number(RegExp['$2'])),_0x19cc04=/^\d+$/[_0x155327(0x1af)](_0x100d50),_0x256cc1=_0x19cc04?Number(_0x100d50):this['getArmorIdWithName'](_0x100d50);if(DataManager[_0x155327(0x2ca)](_0x943c4)&&_0x256cc1===_0x943c4['id']){let _0x6647b4='';_0x6647b4+=_0x155327(0x1a4)[_0x155327(0x188)](_0x943c4[_0x155327(0x32d)]),_0x6647b4+=_0x155327(0x15a),alert(_0x6647b4),SceneManager[_0x155327(0x2c6)]();}_0x1b3189['armors'][_0x256cc1]=_0x4835ec,_0x32df13=!![];}else{if(_0x20447f['match'](/ARMOR[ ](.*)/i)){const _0x40a76b=String(RegExp['$1']),_0xe6c009=/^\d+$/['test'](_0x40a76b),_0x3b2b8f=_0xe6c009?Number(_0x40a76b):this[_0x155327(0x1df)](_0x40a76b);if(DataManager[_0x155327(0x2ca)](_0x943c4)&&_0x3b2b8f===_0x943c4['id']){let _0x5961df='';_0x5961df+=_0x155327(0x1a4)[_0x155327(0x188)](_0x943c4['name']),_0x5961df+=_0x155327(0x15a),alert(_0x5961df),SceneManager[_0x155327(0x2c6)]();}_0x1b3189[_0x155327(0x2be)][_0x3b2b8f]=0x1,_0x32df13=!![];}}}}if(!_0x32df13)_0x1b3189=null;return DataManager[_0x155327(0x165)][_0x3e8ab3]=_0x1b3189,DataManager[_0x155327(0x165)][_0x3e8ab3];},ImageManager[_0x164ac2(0x2b5)]=VisuMZ['ItemCraftingSys'][_0x164ac2(0x2cc)][_0x164ac2(0x194)]['CraftedIcon'],SoundManager['playItemCrafting']=function(_0x193b6a){const _0x2b3278=_0x164ac2;AudioManager['playStaticSe'](VisuMZ[_0x2b3278(0x2d2)][_0x2b3278(0x2cc)][_0x2b3278(0x329)]);},TextManager[_0x164ac2(0x20b)]=VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2cc)][_0x164ac2(0x194)][_0x164ac2(0x26e)],TextManager[_0x164ac2(0x319)]=VisuMZ[_0x164ac2(0x2d2)]['Settings']['General'][_0x164ac2(0x16d)],TextManager[_0x164ac2(0x1e5)]=VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2cc)][_0x164ac2(0x18c)]['MaskLetter'],TextManager[_0x164ac2(0x210)]=VisuMZ[_0x164ac2(0x2d2)]['Settings'][_0x164ac2(0x2b7)][_0x164ac2(0x2e0)],TextManager['ItemCraftingNumberWindow']={'owned':VisuMZ['ItemCraftingSys'][_0x164ac2(0x2cc)][_0x164ac2(0x194)]['NumWindowOwned']||_0x164ac2(0x1c6),'shift':VisuMZ[_0x164ac2(0x2d2)]['Settings'][_0x164ac2(0x194)][_0x164ac2(0x1bd)]||_0x164ac2(0x277),'net':VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2cc)][_0x164ac2(0x194)][_0x164ac2(0x15f)]||_0x164ac2(0x232)},ColorManager[_0x164ac2(0x1cc)]=function(_0x12fc3f){const _0x357e98=_0x164ac2;return _0x12fc3f=String(_0x12fc3f),_0x12fc3f[_0x357e98(0x116)](/#(.*)/i)?'#%1'[_0x357e98(0x188)](String(RegExp['$1'])):this[_0x357e98(0x135)](Number(_0x12fc3f));},SceneManager[_0x164ac2(0x31a)]=function(){const _0x285262=_0x164ac2;return this[_0x285262(0x2e4)]&&this[_0x285262(0x2e4)]['constructor']===Scene_Battle;},SceneManager[_0x164ac2(0x20d)]=function(){const _0x3b3a13=_0x164ac2;return this[_0x3b3a13(0x2e4)]&&this[_0x3b3a13(0x2e4)]['constructor']===Scene_ItemCrafting;},Game_Temp[_0x164ac2(0x2da)][_0x164ac2(0x242)]=function(){const _0x2ac3c5=_0x164ac2;return this[_0x2ac3c5(0x2bd)];},Game_Temp[_0x164ac2(0x2da)][_0x164ac2(0x2f8)]=function(){const _0x219b89=_0x164ac2;this[_0x219b89(0x2bd)]=undefined;},Game_Temp[_0x164ac2(0x2da)][_0x164ac2(0x316)]=function(_0x2b2b47){const _0x1c6271=_0x164ac2;this[_0x1c6271(0x2bd)]=_0x2b2b47;},VisuMZ[_0x164ac2(0x2d2)]['Game_System_initialize']=Game_System[_0x164ac2(0x2da)][_0x164ac2(0x115)],Game_System['prototype'][_0x164ac2(0x115)]=function(){const _0xc359dc=_0x164ac2;VisuMZ[_0xc359dc(0x2d2)]['Game_System_initialize'][_0xc359dc(0x24d)](this),this['initItemCraftingMainMenu'](),this[_0xc359dc(0x168)](),this[_0xc359dc(0x19b)]();},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x1b3)]=function(){const _0x1bf158=_0x164ac2;this[_0x1bf158(0x202)]={'shown':VisuMZ[_0x1bf158(0x2d2)][_0x1bf158(0x2cc)][_0x1bf158(0x2b7)]['ShowMainMenu'],'enabled':VisuMZ[_0x1bf158(0x2d2)][_0x1bf158(0x2cc)][_0x1bf158(0x2b7)][_0x1bf158(0x1a0)]};},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x118)]=function(){const _0x36b92a=_0x164ac2;if(this[_0x36b92a(0x202)]===undefined)this['initItemCraftingMainMenu']();return this[_0x36b92a(0x202)]['shown'];},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x16f)]=function(_0x2b0ebe){const _0x513a5c=_0x164ac2;if(this[_0x513a5c(0x202)]===undefined)this[_0x513a5c(0x1b3)]();this['_ItemCrafting_MainMenu'][_0x513a5c(0x2ef)]=_0x2b0ebe;},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x166)]=function(){const _0x241503=_0x164ac2;if(this[_0x241503(0x202)]===undefined)this['initItemCraftingMainMenu']();return this[_0x241503(0x202)]['enabled'];},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x132)]=function(_0x20732f){const _0x1b684a=_0x164ac2;if(this[_0x1b684a(0x202)]===undefined)this[_0x1b684a(0x1b3)]();this[_0x1b684a(0x202)][_0x1b684a(0x2e3)]=_0x20732f;},Game_System[_0x164ac2(0x2da)]['initItemCraftingSys']=function(){const _0x2e987d=_0x164ac2;this[_0x2e987d(0x19e)]={'items':{},'weapons':{},'armors':{}};},Game_System['prototype']['isItemCrafted']=function(_0x569d7a){const _0x557f71=_0x164ac2;return!!this[_0x557f71(0xfd)](_0x569d7a);},Game_System[_0x164ac2(0x2da)]['getItemCraftedTimes']=function(_0x2bc820){const _0x208925=_0x164ac2;if(!_0x2bc820)return![];if(this[_0x208925(0x19e)]===undefined)this['initItemCraftingSys']();let _0x58d760={};if(DataManager['isItem'](_0x2bc820))_0x58d760=this['_itemsCrafted'][_0x208925(0x268)];if(DataManager['isWeapon'](_0x2bc820))_0x58d760=this['_itemsCrafted']['weapons'];if(DataManager['isArmor'](_0x2bc820))_0x58d760=this['_itemsCrafted'][_0x208925(0x2be)];return _0x58d760[_0x2bc820['id']]||0x0;},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x310)]=function(_0x3c0adb,_0x1f7add){const _0x4347f4=_0x164ac2;if(!_0x3c0adb)return![];if(this[_0x4347f4(0x19e)]===undefined)this[_0x4347f4(0x168)]();_0x1f7add=_0x1f7add||0x1;let _0x5a8976={};if(DataManager['isItem'](_0x3c0adb))_0x5a8976=this[_0x4347f4(0x19e)]['items'];if(DataManager[_0x4347f4(0x240)](_0x3c0adb))_0x5a8976=this['_itemsCrafted'][_0x4347f4(0x157)];if(DataManager[_0x4347f4(0x2ca)](_0x3c0adb))_0x5a8976=this['_itemsCrafted'][_0x4347f4(0x2be)];_0x5a8976[_0x3c0adb['id']]=_0x5a8976[_0x3c0adb['id']]||0x0,_0x5a8976[_0x3c0adb['id']]+=_0x1f7add;},Game_System['prototype'][_0x164ac2(0x19b)]=function(){this['_craftingEvents']={'items':[],'weapons':[],'armors':[]};},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x1d5)]=function(_0x2c6b6c){const _0x59762c=_0x164ac2;if(this[_0x59762c(0x2b6)]===undefined)this['initItemCraftingEvents']();let _0x1edd14=[];if(DataManager['isItem'](_0x2c6b6c))_0x1edd14=this['_craftingEvents'][_0x59762c(0x268)];else{if(DataManager['isWeapon'](_0x2c6b6c))_0x1edd14=this[_0x59762c(0x2b6)][_0x59762c(0x157)];else DataManager['isArmor'](_0x2c6b6c)&&(_0x1edd14=this[_0x59762c(0x2b6)]['armors']);}!_0x1edd14[_0x59762c(0x2f3)](_0x2c6b6c['id'])&&_0x1edd14[_0x59762c(0x16b)](_0x2c6b6c['id']);},Game_System[_0x164ac2(0x2da)][_0x164ac2(0x27d)]=function(_0x269ea1){const _0x36ff05=_0x164ac2;if(this[_0x36ff05(0x2b6)]===undefined)this[_0x36ff05(0x19b)]();let _0x29de9a=[];if(DataManager[_0x36ff05(0x2c0)](_0x269ea1))_0x29de9a=this[_0x36ff05(0x2b6)][_0x36ff05(0x268)];else{if(DataManager[_0x36ff05(0x240)](_0x269ea1))_0x29de9a=this[_0x36ff05(0x2b6)][_0x36ff05(0x157)];else DataManager[_0x36ff05(0x2ca)](_0x269ea1)&&(_0x29de9a=this[_0x36ff05(0x2b6)][_0x36ff05(0x2be)]);}return _0x29de9a[_0x36ff05(0x2f3)](_0x269ea1['id']);},VisuMZ['ItemCraftingSys']['Game_Party_numItems']=Game_Party[_0x164ac2(0x2da)]['numItems'],Game_Party[_0x164ac2(0x2da)][_0x164ac2(0x180)]=function(_0x341829){const _0x16ea8d=_0x164ac2;if(DataManager[_0x16ea8d(0x1de)](_0x341829))return 0x0;return VisuMZ['ItemCraftingSys'][_0x16ea8d(0x25b)][_0x16ea8d(0x24d)](this,_0x341829);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x28c)]=Game_Party[_0x164ac2(0x2da)][_0x164ac2(0x299)],Game_Party[_0x164ac2(0x2da)][_0x164ac2(0x299)]=function(_0x299c0d,_0x342ca4,_0x1c8579){const _0x525b0b=_0x164ac2;DataManager[_0x525b0b(0x1de)](_0x299c0d)&&_0x342ca4>0x0?this[_0x525b0b(0x222)](_0x299c0d,_0x342ca4):VisuMZ[_0x525b0b(0x2d2)][_0x525b0b(0x28c)][_0x525b0b(0x24d)](this,_0x299c0d,_0x342ca4,_0x1c8579);},Game_Party['prototype'][_0x164ac2(0x222)]=function(_0x4fcf28,_0x4085ec){const _0x26026f=_0x164ac2,_0x3906f4=DataManager[_0x26026f(0x282)](_0x4fcf28),_0x1e5395=['items',_0x26026f(0x157),_0x26026f(0x2be)];for(const _0xd77d of _0x1e5395){const _0x1a67a0=_0x3906f4[_0xd77d];for(const _0x310ae3 in _0x1a67a0){const _0x5b08f7=Number(_0x310ae3),_0x5e5d91=(_0x1a67a0[_0x310ae3]||0x1)*_0x4085ec;let _0x2a1b8e=null;if(_0xd77d===_0x26026f(0x268))_0x2a1b8e=$dataItems[_0x5b08f7];if(_0xd77d===_0x26026f(0x157))_0x2a1b8e=$dataWeapons[_0x5b08f7];if(_0xd77d==='armors')_0x2a1b8e=$dataArmors[_0x5b08f7];if(DataManager[_0x26026f(0x1ab)](_0x2a1b8e))continue;_0x2a1b8e&&(this[_0x26026f(0x299)](_0x2a1b8e,_0x5e5d91),![]&&console[_0x26026f(0x205)](_0x2a1b8e['name']+'\x20x'+_0x5e5d91));}}},Game_Party[_0x164ac2(0x2da)][_0x164ac2(0x14a)]=function(_0x5ee500){const _0x257e68=_0x164ac2,_0x54321e=DataManager[_0x257e68(0x282)](_0x5ee500),_0x18af39=[_0x257e68(0x268),'weapons','armors'];for(const _0x5ea4c0 of _0x18af39){const _0x1a249a=_0x54321e[_0x5ea4c0];for(const _0x24dddd in _0x1a249a){const _0x1d5aac=Number(_0x24dddd);let _0x39040b=null;if(_0x5ea4c0==='items')_0x39040b=$dataItems[_0x1d5aac];if(_0x5ea4c0===_0x257e68(0x157))_0x39040b=$dataWeapons[_0x1d5aac];if(_0x5ea4c0===_0x257e68(0x2be))_0x39040b=$dataArmors[_0x1d5aac];if(DataManager[_0x257e68(0x1ab)](_0x39040b))continue;if(_0x39040b&&!this[_0x257e68(0x10d)](_0x39040b))return![];}}return!![];},Game_Party[_0x164ac2(0x2da)][_0x164ac2(0x312)]=function(_0x4496f0){const _0x1d6120=_0x164ac2;let _0x8dc596=0x0;const _0x2baeaf=DataManager[_0x1d6120(0x282)](_0x4496f0),_0x2f10be=[_0x1d6120(0x268),_0x1d6120(0x157),'armors'];for(const _0x195bb1 of _0x2f10be){const _0x3e4ed2=_0x2baeaf[_0x195bb1];for(const _0x4e7ea2 in _0x3e4ed2){const _0x26e193=Number(_0x4e7ea2),_0x4fe45c=_0x3e4ed2[_0x4e7ea2]||0x1;let _0x53f3e6=null;if(_0x195bb1===_0x1d6120(0x268))_0x53f3e6=$dataItems[_0x26e193];if(_0x195bb1===_0x1d6120(0x157))_0x53f3e6=$dataWeapons[_0x26e193];if(_0x195bb1===_0x1d6120(0x2be))_0x53f3e6=$dataArmors[_0x26e193];if(DataManager[_0x1d6120(0x1ab)](_0x53f3e6))continue;if(_0x53f3e6){const _0x1de9b1=this[_0x1d6120(0x1c5)](_0x53f3e6),_0x1ca3a6=this[_0x1d6120(0x180)](_0x53f3e6),_0x1d9f54=_0x1de9b1-_0x1ca3a6;if(_0x1d9f54>0x0){let _0x2bd219=_0x1d9f54/_0x4fe45c;_0x2bd219=Math[_0x1d6120(0x102)](_0x2bd219),_0x8dc596=Math[_0x1d6120(0x1d6)](_0x8dc596,_0x2bd219);}}}}return _0x8dc596;},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x274)]=Scene_Menu['prototype'][_0x164ac2(0x120)],Scene_Menu['prototype']['createCommandWindow']=function(){const _0x9752e4=_0x164ac2;VisuMZ['ItemCraftingSys']['Scene_Menu_createCommandWindow'][_0x9752e4(0x24d)](this);const _0x3edcc3=this[_0x9752e4(0x221)];_0x3edcc3[_0x9752e4(0x211)]('itemCrafting',this[_0x9752e4(0x315)][_0x9752e4(0x1e2)](this));},Scene_Menu[_0x164ac2(0x2da)][_0x164ac2(0x315)]=function(){const _0x43d3c9=_0x164ac2;SceneManager[_0x43d3c9(0x16b)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x58307a=_0x164ac2;this[_0x58307a(0x115)](...arguments);}Scene_ItemCrafting[_0x164ac2(0x2da)]=Object[_0x164ac2(0x167)](Scene_Item[_0x164ac2(0x2da)]),Scene_ItemCrafting[_0x164ac2(0x2da)]['constructor']=Scene_ItemCrafting,Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x115)]=function(){const _0x49903a=_0x164ac2;Scene_Item['prototype'][_0x49903a(0x115)][_0x49903a(0x24d)](this),$gameSystem[_0x49903a(0x2fd)]=undefined;},Scene_ItemCrafting[_0x164ac2(0x2da)]['update']=function(){const _0x462aab=_0x164ac2;Scene_Item['prototype']['update'][_0x462aab(0x24d)](this),this['updateCraftingAnimation']();},Scene_ItemCrafting[_0x164ac2(0x2da)]['create']=function(){const _0xcd145=_0x164ac2;Scene_Item[_0xcd145(0x2da)][_0xcd145(0x167)][_0xcd145(0x24d)](this),this[_0xcd145(0x321)](),this['createNumberWindow'](),this[_0xcd145(0x20e)](),this[_0xcd145(0x31e)](),this['isUseModernControls']()&&this[_0xcd145(0x286)](),this['setWindowBackgroundTypes'](),this['resetCraftingSwitches']();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x21e)]=function(){const _0x50b9d9=_0x164ac2,_0x1be789=VisuMZ['ItemCraftingSys']['Settings'][_0x50b9d9(0x10a)];this['_helpWindow']&&this[_0x50b9d9(0x13c)]['setBackgroundType'](_0x1be789['HelpBgType']),this[_0x50b9d9(0x1d4)]&&this[_0x50b9d9(0x1d4)][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x21d)]),this[_0x50b9d9(0x285)]&&this['_goldWindow'][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x2f7)]),this[_0x50b9d9(0x11d)]&&this['_itemWindow']['setBackgroundType'](_0x1be789[_0x50b9d9(0x214)]),this[_0x50b9d9(0x144)]&&this[_0x50b9d9(0x144)][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x1ee)]),this[_0x50b9d9(0x1f7)]&&this[_0x50b9d9(0x1f7)]['setBackgroundType'](_0x1be789[_0x50b9d9(0x298)]),this[_0x50b9d9(0x14f)]&&this[_0x50b9d9(0x14f)][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x18d)]),this[_0x50b9d9(0x326)]&&this[_0x50b9d9(0x326)][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x258)]),this[_0x50b9d9(0x2a7)]&&this[_0x50b9d9(0x2a7)][_0x50b9d9(0x27f)](_0x1be789[_0x50b9d9(0x2ee)]);},Scene_ItemCrafting[_0x164ac2(0x2da)]['helpWindowRect']=function(){const _0x1cc466=_0x164ac2;return Scene_Shop[_0x1cc466(0x2da)]['helpWindowRectItemsEquipsCore'][_0x1cc466(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x321)]=function(){const _0x3ce6ff=_0x164ac2,_0x47ece4=this[_0x3ce6ff(0x169)]();this['_goldWindow']=new Window_Gold(_0x47ece4),this[_0x3ce6ff(0x181)](this['_goldWindow']);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x169)]=function(){const _0x259e7b=_0x164ac2;return Scene_Shop[_0x259e7b(0x2da)][_0x259e7b(0x2df)][_0x259e7b(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x288)]=function(){const _0x1c617f=_0x164ac2;return Scene_Shop[_0x1c617f(0x2da)][_0x1c617f(0x1e3)]['call'](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2eb)]=function(){const _0x597ade=_0x164ac2;this[_0x597ade(0x2ad)](),this[_0x597ade(0x103)]()&&this['postCreateItemWindowModernControls'](),this['allowCreateStatusWindow']()&&(this[_0x597ade(0x260)](),this[_0x597ade(0x181)](this[_0x597ade(0x11d)]));},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2ad)]=function(){const _0x246c73=_0x164ac2,_0x4c09db=this[_0x246c73(0x2c7)]();this['_itemWindow']=new Window_ItemCraftingList(_0x4c09db),this[_0x246c73(0x11d)][_0x246c73(0x1a5)](this[_0x246c73(0x13c)]),this[_0x246c73(0x11d)][_0x246c73(0x211)]('ok',this[_0x246c73(0x18f)][_0x246c73(0x1e2)](this)),this[_0x246c73(0x11d)]['setHandler'](_0x246c73(0x190),this[_0x246c73(0x152)][_0x246c73(0x1e2)](this)),this['addWindow'](this[_0x246c73(0x11d)]),this[_0x246c73(0x1d4)][_0x246c73(0x317)](this[_0x246c73(0x11d)]),!this[_0x246c73(0x1d4)][_0x246c73(0x1c1)]()&&(this[_0x246c73(0x11d)]['y']-=this[_0x246c73(0x1d4)]['height'],this['_itemWindow'][_0x246c73(0x1e9)]+=this[_0x246c73(0x1d4)][_0x246c73(0x1e9)],this[_0x246c73(0x1d4)][_0x246c73(0x173)](),this[_0x246c73(0x1d4)][_0x246c73(0x216)](),this['onCategoryOk']());},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2c7)]=function(){const _0x1d1792=_0x164ac2;return this[_0x1d1792(0x221)]=this[_0x1d1792(0x1d4)],Scene_Shop['prototype'][_0x1d1792(0x19c)][_0x1d1792(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x289)]=function(){const _0x47d524=_0x164ac2;return Scene_Shop[_0x47d524(0x2da)][_0x47d524(0x1d8)][_0x47d524(0x24d)](this);},Scene_ItemCrafting['prototype'][_0x164ac2(0x1cb)]=function(){const _0x268c15=_0x164ac2,_0x16b48a=this[_0x268c15(0x2c7)]();this['_numberWindow']=new Window_ItemCraftingNumber(_0x16b48a),this[_0x268c15(0x326)][_0x268c15(0x173)](),this['_numberWindow']['setHandler']('ok',this['onNumberOk'][_0x268c15(0x1e2)](this)),this[_0x268c15(0x326)][_0x268c15(0x211)]('cancel',this[_0x268c15(0x1bf)][_0x268c15(0x1e2)](this)),this[_0x268c15(0x181)](this['_numberWindow']);},Scene_ItemCrafting[_0x164ac2(0x2da)]['createIngredientSelectionTitle']=function(){const _0x921977=_0x164ac2,_0x42ac60=this['categoryWindowRect']();this[_0x921977(0x1f7)]=new Window_Selectable(_0x42ac60),this[_0x921977(0x1f7)][_0x921977(0x173)](),this['addWindow'](this[_0x921977(0x1f7)]);},Scene_ItemCrafting['prototype'][_0x164ac2(0x31e)]=function(){const _0x596972=_0x164ac2,_0x4503f4=this[_0x596972(0x2c7)](),_0x5aaf2b=new Window_ItemCraftingIngredient(_0x4503f4);_0x5aaf2b[_0x596972(0x173)](),_0x5aaf2b[_0x596972(0x1a5)](this[_0x596972(0x13c)]),_0x5aaf2b[_0x596972(0x228)](this[_0x596972(0x144)]),_0x5aaf2b[_0x596972(0x211)]('ok',this['onIngredientListOk']['bind'](this)),_0x5aaf2b[_0x596972(0x211)]('cancel',this[_0x596972(0x22b)][_0x596972(0x1e2)](this)),this['_ingredientSelectList']=_0x5aaf2b,this['addWindow'](this[_0x596972(0x14f)]);},Scene_ItemCrafting[_0x164ac2(0x2da)]['isCustomLayout']=function(){const _0x4bf7f1=_0x164ac2;return VisuMZ[_0x4bf7f1(0x2d2)][_0x4bf7f1(0x2cc)][_0x4bf7f1(0x10a)][_0x4bf7f1(0x117)];},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1d1)]=function(){const _0x857b9c=_0x164ac2;return this['isCustomLayout']()?this['helpWindowRectJS']():Scene_Shop[_0x857b9c(0x2da)]['helpWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x23d)]=function(){const _0x1f5160=_0x164ac2;if(VisuMZ['ItemCraftingSys'][_0x1f5160(0x2cc)][_0x1f5160(0x10a)][_0x1f5160(0x1e4)])return VisuMZ[_0x1f5160(0x2d2)][_0x1f5160(0x2cc)][_0x1f5160(0x10a)][_0x1f5160(0x1e4)][_0x1f5160(0x24d)](this);const _0xfeb2d0=0x0,_0xd9ddff=this[_0x1f5160(0x2fc)](),_0x16d55d=Graphics[_0x1f5160(0x21f)],_0xd4e3e2=this[_0x1f5160(0x1f0)]();return new Rectangle(_0xfeb2d0,_0xd9ddff,_0x16d55d,_0xd4e3e2);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x288)]=function(){const _0xf83eed=_0x164ac2;return this[_0xf83eed(0x29a)]()?this['categoryWindowRectJS']():Scene_Shop[_0xf83eed(0x2da)]['commandWindowRectItemsEquipsCore'][_0xf83eed(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1e0)]=function(){const _0x3d7254=_0x164ac2;if(VisuMZ[_0x3d7254(0x2d2)]['Settings']['Window']['CategoryWindow_RectJS'])return VisuMZ[_0x3d7254(0x2d2)][_0x3d7254(0x2cc)][_0x3d7254(0x10a)][_0x3d7254(0x2ec)][_0x3d7254(0x24d)](this);const _0x3b5991=this[_0x3d7254(0x305)]()?this[_0x3d7254(0x19a)]():0x0,_0x10d62c=this[_0x3d7254(0x25a)](),_0x2529b4=Graphics[_0x3d7254(0x21f)]-this[_0x3d7254(0x19a)](),_0x5ceee2=this[_0x3d7254(0x2f2)](0x1,!![]);return new Rectangle(_0x3b5991,_0x10d62c,_0x2529b4,_0x5ceee2);},Scene_ItemCrafting[_0x164ac2(0x2da)]['goldWindowRect']=function(){const _0x556b67=_0x164ac2;return this[_0x556b67(0x29a)]()?this[_0x556b67(0x100)]():Scene_Shop[_0x556b67(0x2da)]['goldWindowRectItemsEquipsCore'][_0x556b67(0x24d)](this);},Scene_ItemCrafting['prototype'][_0x164ac2(0x100)]=function(){const _0x1653e7=_0x164ac2;if(VisuMZ[_0x1653e7(0x2d2)][_0x1653e7(0x2cc)][_0x1653e7(0x10a)][_0x1653e7(0x196)])return VisuMZ[_0x1653e7(0x2d2)][_0x1653e7(0x2cc)][_0x1653e7(0x10a)][_0x1653e7(0x196)][_0x1653e7(0x24d)](this);const _0x45c39a=this[_0x1653e7(0x19a)](),_0x4796ea=this[_0x1653e7(0x2f2)](0x1,!![]),_0x50c14d=this[_0x1653e7(0x305)]()?0x0:Graphics[_0x1653e7(0x21f)]-_0x45c39a,_0x59932b=this[_0x1653e7(0x25a)]();return new Rectangle(_0x50c14d,_0x59932b,_0x45c39a,_0x4796ea);},Scene_ItemCrafting['prototype'][_0x164ac2(0x2c7)]=function(){const _0x3eff73=_0x164ac2;return this['_commandWindow']=this[_0x3eff73(0x1d4)],this[_0x3eff73(0x29a)]()?this[_0x3eff73(0x1fb)]():Scene_Shop[_0x3eff73(0x2da)][_0x3eff73(0x19c)]['call'](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1fb)]=function(){const _0x4112bf=_0x164ac2;if(VisuMZ[_0x4112bf(0x2d2)][_0x4112bf(0x2cc)][_0x4112bf(0x10a)][_0x4112bf(0x1b5)])return VisuMZ[_0x4112bf(0x2d2)][_0x4112bf(0x2cc)]['Window']['ItemWindow_RectJS'][_0x4112bf(0x24d)](this);const _0x3fe40a=this[_0x4112bf(0x221)]['y']+this['_commandWindow'][_0x4112bf(0x1e9)],_0x1e36d7=Graphics[_0x4112bf(0x21f)]-this['statusWidth'](),_0x14c362=this[_0x4112bf(0x199)]()-this['_commandWindow'][_0x4112bf(0x1e9)],_0x3b0de9=this[_0x4112bf(0x305)]()?Graphics[_0x4112bf(0x21f)]-_0x1e36d7:0x0;return new Rectangle(_0x3b0de9,_0x3fe40a,_0x1e36d7,_0x14c362);},Scene_ItemCrafting['prototype'][_0x164ac2(0xff)]=function(){const _0x4e3734=_0x164ac2;if(this[_0x4e3734(0x29a)]())return!![];return Scene_Item[_0x4e3734(0x2da)][_0x4e3734(0xff)][_0x4e3734(0x24d)](this);},Scene_ItemCrafting['prototype']['statusWindowRect']=function(){const _0x150e4a=_0x164ac2;return this[_0x150e4a(0x29a)]()?this[_0x150e4a(0x2e7)]():Scene_Shop[_0x150e4a(0x2da)][_0x150e4a(0x1d8)][_0x150e4a(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2e7)]=function(){const _0x5ed3d9=_0x164ac2;if(VisuMZ[_0x5ed3d9(0x2d2)][_0x5ed3d9(0x2cc)][_0x5ed3d9(0x10a)][_0x5ed3d9(0x25c)])return VisuMZ[_0x5ed3d9(0x2d2)][_0x5ed3d9(0x2cc)][_0x5ed3d9(0x10a)]['StatusWindow_RectJS']['call'](this);const _0x51b3f4=this[_0x5ed3d9(0x32b)](),_0x57c979=this[_0x5ed3d9(0x199)]()-this['_commandWindow'][_0x5ed3d9(0x1e9)],_0x3fc1d7=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x51b3f4,_0x4ebb3d=this['_commandWindow']['y']+this[_0x5ed3d9(0x221)][_0x5ed3d9(0x1e9)];return new Rectangle(_0x3fc1d7,_0x4ebb3d,_0x51b3f4,_0x57c979);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x286)]=function(){const _0x32e965=_0x164ac2;this[_0x32e965(0x11d)][_0x32e965(0x16e)](),this[_0x32e965(0x11d)]['smoothSelect'](0x0);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x18f)]=function(){const _0x28194a=_0x164ac2;$gameTemp[_0x28194a(0x2e8)]=!![],this['_item']=this[_0x28194a(0x11d)][_0x28194a(0x23e)](),this[_0x28194a(0x11d)][_0x28194a(0x173)](),this[_0x28194a(0x184)](),this[_0x28194a(0x256)]()?this[_0x28194a(0x26b)]():this[_0x28194a(0x18a)](),$gameTemp[_0x28194a(0x2e8)]=![],this[_0x28194a(0x1dd)]=this[_0x28194a(0x11d)][_0x28194a(0x23e)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x18a)]=function(){const _0x4a3f01=_0x164ac2;this[_0x4a3f01(0x1f7)][_0x4a3f01(0x173)](),this[_0x4a3f01(0x14f)][_0x4a3f01(0x173)](),this['_categoryWindow'][_0x4a3f01(0x218)](),$gameTemp['_bypassProxy']=!![],this[_0x4a3f01(0x326)]['setup'](this[_0x4a3f01(0x11d)]['item']()),$gameTemp['_bypassProxy']=![],this[_0x4a3f01(0x326)][_0x4a3f01(0x218)](),this['_numberWindow']['activate']();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1cd)]=function(){const _0x54015c=_0x164ac2;this['_numberWindow'][_0x54015c(0x173)](),this['_ingredientSelectTitle'][_0x54015c(0x173)](),this[_0x54015c(0x14f)][_0x54015c(0x173)](),this['_categoryWindow']['show'](),this[_0x54015c(0x11d)][_0x54015c(0x218)](),this[_0x54015c(0x11d)][_0x54015c(0x16e)](),this[_0x54015c(0x11d)][_0x54015c(0x241)]();},Scene_ItemCrafting['prototype'][_0x164ac2(0x227)]=function(){const _0x18f2ff=_0x164ac2;VisuMZ[_0x18f2ff(0x2d2)][_0x18f2ff(0x2cc)][_0x18f2ff(0x2cd)]['ShowAnimations']?this[_0x18f2ff(0x290)]():this['finishAnimation']();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x273)]=function(){const _0x208a47=_0x164ac2;this[_0x208a47(0x1d2)]['visible']=!![],this[_0x208a47(0x128)]=![],this[_0x208a47(0x306)](),this[_0x208a47(0x2c2)](),this[_0x208a47(0x2fe)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2fe)]=function(){const _0x16369b=_0x164ac2;this[_0x16369b(0x13f)]()?this[_0x16369b(0x2dd)]():this[_0x16369b(0x2fa)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2fa)]=function(){const _0x12238f=_0x164ac2;this[_0x12238f(0x1cd)](),this[_0x12238f(0x11d)][_0x12238f(0x1ae)](),this[_0x12238f(0x1d4)][_0x12238f(0x1ae)](),this[_0x12238f(0x1d4)][_0x12238f(0x12d)](),this['_categoryWindow'][_0x12238f(0x1dc)](),this[_0x12238f(0x285)][_0x12238f(0x1ae)](),this[_0x12238f(0x11d)]['updateHelp']();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x306)]=function(){const _0x49eb4d=_0x164ac2;$gameTemp[_0x49eb4d(0x2e8)]=!![];let _0x45bd29=this['_itemWindow'][_0x49eb4d(0x23e)]();$gameTemp[_0x49eb4d(0x2e8)]=![];const _0x5548f7=this['_numberWindow'][_0x49eb4d(0x17b)](),_0x491b70=DataManager[_0x49eb4d(0x234)](_0x45bd29);let _0x967ca2=0x0;for(const _0xbda3c7 of _0x491b70){if(!_0xbda3c7)continue;let _0xf92b78=_0xbda3c7[0x0];const _0x4c6324=_0xbda3c7[0x1]*_0x5548f7;_0xf92b78===_0x49eb4d(0x213)?$gameParty[_0x49eb4d(0x133)](_0x4c6324):(typeof _0xf92b78===_0x49eb4d(0x29f)&&_0xf92b78[_0x49eb4d(0x116)](/CATEGORY/i)&&(_0xf92b78=this['_ingredientsList'][_0x967ca2],_0x967ca2+=0x1),$gameParty[_0x49eb4d(0x2ba)](_0xf92b78,_0x4c6324,![]));}_0x45bd29=this[_0x49eb4d(0x11d)][_0x49eb4d(0x23e)](),$gameParty['gainItem'](_0x45bd29,_0x5548f7),this[_0x49eb4d(0x326)][_0x49eb4d(0x17b)]()>0x0?SoundManager[_0x49eb4d(0x1a1)]():SoundManager[_0x49eb4d(0x27a)](),$gameSystem[_0x49eb4d(0x310)](_0x45bd29,_0x5548f7);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2c2)]=function(){const _0x32980a=_0x164ac2,_0x57427b=this[_0x32980a(0x1dd)],_0x577a0c=this[_0x32980a(0x326)][_0x32980a(0x17b)]();VisuMZ['ItemCraftingSys'][_0x32980a(0x191)](_0x57427b,!![]),VisuMZ[_0x32980a(0x2d2)][_0x32980a(0x191)](_0x57427b,![]),this[_0x32980a(0x14b)]();const _0x310517=DataManager[_0x32980a(0x146)](_0x57427b);VisuMZ[_0x32980a(0x2d2)]['JS'][_0x310517]&&VisuMZ['ItemCraftingSys']['JS'][_0x310517][_0x32980a(0x24d)](this,_0x57427b,_0x577a0c),VisuMZ[_0x32980a(0x2d2)][_0x32980a(0x2cc)][_0x32980a(0x194)][_0x32980a(0x254)][_0x32980a(0x24d)](this,_0x57427b,_0x577a0c);},VisuMZ[_0x164ac2(0x2d2)]['TurnSwitches']=function(_0x366728,_0x2dabf9){const _0x3c2222=_0x164ac2,_0x27d946=_0x2dabf9?VisuMZ[_0x3c2222(0x2d2)][_0x3c2222(0x11c)][_0x3c2222(0x29e)]:VisuMZ[_0x3c2222(0x2d2)][_0x3c2222(0x11c)][_0x3c2222(0x154)],_0x2626bd=_0x366728[_0x3c2222(0x309)][_0x3c2222(0x116)](_0x27d946);if(_0x2626bd)for(const _0x2eb96f of _0x2626bd){if(!_0x2eb96f)continue;_0x2eb96f[_0x3c2222(0x116)](_0x27d946);const _0x5c0b69=JSON[_0x3c2222(0x1f3)]('['+RegExp['$1'][_0x3c2222(0x116)](/\d+/g)+']');for(const _0x26acb5 of _0x5c0b69){$gameSwitches['setValue'](_0x26acb5,_0x2dabf9);}}},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1bf)]=function(){const _0x596334=_0x164ac2;SoundManager[_0x596334(0x27a)](),this[_0x596334(0x22b)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x265)]=function(){const _0x5939bf=_0x164ac2,_0x3d831e=this[_0x5939bf(0x14f)]['item']();this[_0x5939bf(0x328)][this[_0x5939bf(0x1d9)]]=_0x3d831e,this['_ingredientIndex']++,this[_0x5939bf(0x26b)]();},Scene_ItemCrafting['prototype'][_0x164ac2(0x22b)]=function(){const _0x10adc8=_0x164ac2;this[_0x10adc8(0x328)]['pop'](),this[_0x10adc8(0x1d9)]--,this['_ingredientIndex']<0x0?this['activateItemWindow']():this[_0x10adc8(0x26b)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x184)]=function(){const _0xf3dcb2=_0x164ac2;this[_0xf3dcb2(0x31f)]=[],this[_0xf3dcb2(0x17f)]=[],this[_0xf3dcb2(0x328)]=[],this[_0xf3dcb2(0x1d9)]=0x0;},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x256)]=function(){const _0x2d3366=_0x164ac2;if(!this[_0x2d3366(0x1dd)])return![];const _0x1021e7=DataManager[_0x2d3366(0x234)](this[_0x2d3366(0x1dd)]);for(const _0x396b8d of _0x1021e7){if(!_0x396b8d)continue;const _0x599f6b=_0x396b8d[0x0];if(!_0x599f6b)continue;if(typeof _0x599f6b===_0x2d3366(0x29f)&&_0x599f6b['match'](/CATEGORY/i)){_0x599f6b[_0x2d3366(0x116)](/CATEGORY: (.*)/i);const _0x55ddc5=String(RegExp['$1'])[_0x2d3366(0x2f6)]();this['_ingredientCategories'][_0x2d3366(0x16b)](_0x55ddc5),this[_0x2d3366(0x17f)][_0x2d3366(0x16b)](_0x396b8d[0x1]||0x1);}}return this['_ingredientCategories'][_0x2d3366(0x225)]>0x0;},Scene_ItemCrafting['prototype'][_0x164ac2(0x26b)]=function(){const _0x134508=_0x164ac2;if(this[_0x134508(0x1d9)]>=this[_0x134508(0x31f)][_0x134508(0x225)])return this['setupNumberWindow']();this['_categoryWindow'][_0x134508(0x173)](),this['_numberWindow'][_0x134508(0x173)]();const _0x11f304=this[_0x134508(0x31f)][this[_0x134508(0x1d9)]],_0x7c5eb=this['_ingredientAmounts'][this[_0x134508(0x1d9)]];this['_ingredientSelectTitle']['show'](),this['_ingredientSelectList']['show'](),this[_0x134508(0x1f7)][_0x134508(0x161)]['clear']();const _0x2c5be0=VisuMZ[_0x134508(0x2d2)][_0x134508(0x2cc)][_0x134508(0x194)][_0x134508(0x304)],_0x116871=VisuMZ[_0x134508(0x1e8)][_0x134508(0x2cc)][_0x134508(0x1db)][_0x134508(0x15c)],_0x118eb6=_0x2c5be0[_0x134508(0x188)](_0x11f304,_0x116871[_0x134508(0x188)](_0x7c5eb)),_0x5a5f99=this['_ingredientSelectTitle'][_0x134508(0x131)](0x0);this[_0x134508(0x1f7)][_0x134508(0x2b9)](_0x118eb6,_0x5a5f99['x'],_0x5a5f99['y']),this[_0x134508(0x14f)][_0x134508(0x1da)](_0x11f304,_0x7c5eb);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x201)]=function(){const _0x2e49eb=_0x164ac2;if(this[_0x2e49eb(0x326)]&&this[_0x2e49eb(0x326)][_0x2e49eb(0x13e)])return TextManager[_0x2e49eb(0x2f4)](_0x2e49eb(0x206),_0x2e49eb(0x1a2));return Scene_Item['prototype'][_0x2e49eb(0x201)][_0x2e49eb(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2d3)]=function(){const _0x1d0d85=_0x164ac2;if(this[_0x1d0d85(0x326)]&&this[_0x1d0d85(0x326)][_0x1d0d85(0x13e)])return TextManager['getInputMultiButtonStrings']('up',_0x1d0d85(0x1d3));return Scene_Item[_0x1d0d85(0x2da)][_0x1d0d85(0x2d3)][_0x1d0d85(0x24d)](this);},Scene_ItemCrafting['prototype'][_0x164ac2(0x2a0)]=function(){const _0x306d4a=_0x164ac2;if(this['buttonAssistItemListRequirement']())return VisuMZ['ItemsEquipsCore']['Settings'][_0x306d4a(0x1db)][_0x306d4a(0x139)];else{if(this['_numberWindow']&&this[_0x306d4a(0x326)][_0x306d4a(0x13e)])return VisuMZ[_0x306d4a(0x1e8)]['Settings'][_0x306d4a(0x2cb)][_0x306d4a(0x19d)];}return Scene_Item[_0x306d4a(0x2da)][_0x306d4a(0x2a0)][_0x306d4a(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1c7)]=function(){const _0x1c3430=_0x164ac2;if(this[_0x1c3430(0x326)]&&this[_0x1c3430(0x326)][_0x1c3430(0x13e)])return VisuMZ[_0x1c3430(0x1e8)]['Settings'][_0x1c3430(0x2cb)]['buttonAssistLargeIncrement'];return Scene_Item[_0x1c3430(0x2da)][_0x1c3430(0x1c7)][_0x1c3430(0x24d)](this);},Scene_ItemCrafting['prototype'][_0x164ac2(0x193)]=function(){const _0x20367e=_0x164ac2;return this[_0x20367e(0x326)]&&this[_0x20367e(0x326)][_0x20367e(0x13e)]?TextManager[_0x20367e(0x319)]:Scene_Item[_0x20367e(0x2da)]['buttonAssistText4'][_0x20367e(0x24d)](this);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2fb)]=function(){const _0x1acadf=_0x164ac2;Scene_MenuBase[_0x1acadf(0x2da)]['createBackground'][_0x1acadf(0x24d)](this),this[_0x1acadf(0x2ea)](this[_0x1acadf(0x160)]()),this['createCustomBackgroundImages']();},Scene_ItemCrafting['prototype'][_0x164ac2(0x160)]=function(){const _0x1f2810=_0x164ac2;return VisuMZ['ItemCraftingSys'][_0x1f2810(0x2cc)]['BgSettings'][_0x1f2810(0x138)];},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x30e)]=function(){const _0x30078f=_0x164ac2,_0x27c9e7={'BgFilename1':VisuMZ[_0x30078f(0x2d2)][_0x30078f(0x2cc)][_0x30078f(0x1f8)][_0x30078f(0x2b1)],'BgFilename2':VisuMZ['ItemCraftingSys'][_0x30078f(0x2cc)][_0x30078f(0x1f8)]['BgFilename2']};_0x27c9e7&&(_0x27c9e7[_0x30078f(0x2b1)]!==''||_0x27c9e7[_0x30078f(0x2e1)]!=='')&&(this[_0x30078f(0x231)]=new Sprite(ImageManager[_0x30078f(0x19f)](_0x27c9e7[_0x30078f(0x2b1)])),this[_0x30078f(0x1e1)]=new Sprite(ImageManager[_0x30078f(0x1f1)](_0x27c9e7['BgFilename2'])),this[_0x30078f(0x32a)](this['_backSprite1']),this[_0x30078f(0x32a)](this[_0x30078f(0x1e1)]),this[_0x30078f(0x231)][_0x30078f(0x2c9)][_0x30078f(0x1f4)](this[_0x30078f(0x2d0)][_0x30078f(0x1e2)](this,this[_0x30078f(0x231)])),this['_backSprite2'][_0x30078f(0x2c9)]['addLoadListener'](this['adjustSprite'][_0x30078f(0x1e2)](this,this[_0x30078f(0x1e1)])));},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2d0)]=function(_0x3ac523){const _0x1918b3=_0x164ac2;this['scaleSprite'](_0x3ac523),this[_0x1918b3(0x203)](_0x3ac523);},Scene_ItemCrafting[_0x164ac2(0x2da)]['startAnimation']=function(){const _0x46a148=_0x164ac2;this['_animationPlaying']=!![],this[_0x46a148(0x1c3)]=0x14,this[_0x46a148(0x1d2)][_0x46a148(0x14e)]=VisuMZ['ItemCraftingSys'][_0x46a148(0x2cc)][_0x46a148(0x2cd)][_0x46a148(0x226)]||![],this[_0x46a148(0x1c2)]();},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x1c2)]=function(){const _0x21f77a=_0x164ac2;this[_0x21f77a(0x2b4)]=new Sprite(),this[_0x21f77a(0x32a)](this[_0x21f77a(0x2b4)]),this[_0x21f77a(0x2d9)](),this['setItemSpriteFrame'](),this[_0x21f77a(0x23f)](),this['setItemSpriteOpacity'](),this[_0x21f77a(0x24e)](),this['createAnimation'](this[_0x21f77a(0x197)]['shift']());},Scene_ItemCrafting['prototype'][_0x164ac2(0x2d9)]=function(){const _0x329b2b=_0x164ac2,_0x4fca5d=VisuMZ[_0x329b2b(0x2d2)]['RegExp'],_0x40e1ab=this[_0x329b2b(0x1dd)][_0x329b2b(0x309)];this[_0x329b2b(0x14c)]='';if(_0x40e1ab[_0x329b2b(0x116)](_0x4fca5d['craftPicture']))this[_0x329b2b(0x14c)]=String(RegExp['$1']);else _0x40e1ab[_0x329b2b(0x116)](_0x4fca5d[_0x329b2b(0x2c3)])&&(this[_0x329b2b(0x14c)]=String(RegExp['$1']));this[_0x329b2b(0xfe)]=new Sprite();this[_0x329b2b(0x14c)]?this[_0x329b2b(0xfe)]['bitmap']=ImageManager[_0x329b2b(0x2d5)](this[_0x329b2b(0x14c)]):(this[_0x329b2b(0xfe)][_0x329b2b(0x2c9)]=ImageManager['loadSystem'](_0x329b2b(0x296)),this[_0x329b2b(0xfe)]['bitmap']['smooth']=![]);this[_0x329b2b(0xfe)][_0x329b2b(0x252)]['x']=0.5,this['_iconSprite'][_0x329b2b(0x252)]['y']=0.5;if(!this[_0x329b2b(0x14c)]){const _0x2ed9f0=VisuMZ[_0x329b2b(0x2d2)][_0x329b2b(0x2cc)][_0x329b2b(0x2cd)]['Scale']||0x8;this['_iconSprite'][_0x329b2b(0x207)]['x']=_0x2ed9f0,this[_0x329b2b(0xfe)][_0x329b2b(0x207)]['y']=_0x2ed9f0;}this[_0x329b2b(0x2b4)][_0x329b2b(0x32a)](this[_0x329b2b(0xfe)]);},Scene_ItemCrafting['prototype']['setItemSpriteFrame']=function(){const _0x2bc691=_0x164ac2;if(this[_0x2bc691(0x14c)])return;const _0x6ac7e=this[_0x2bc691(0x1dd)],_0x44ecb5=_0x6ac7e[_0x2bc691(0x269)],_0x54ed53=ImageManager[_0x2bc691(0x195)],_0x187dd0=ImageManager[_0x2bc691(0x294)],_0x26d6b4=_0x44ecb5%0x10*_0x54ed53,_0x4c4b38=Math[_0x2bc691(0x244)](_0x44ecb5/0x10)*_0x187dd0;this[_0x2bc691(0xfe)][_0x2bc691(0x21b)](_0x26d6b4,_0x4c4b38,_0x54ed53,_0x187dd0);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x23f)]=function(){const _0x203b08=_0x164ac2;this['_itemSprite']['x']=Math[_0x203b08(0x1bb)](Graphics[_0x203b08(0x249)]/0x2);const _0x5e4aae=Math[_0x203b08(0x1bb)](ImageManager[_0x203b08(0x294)]*this[_0x203b08(0x2b4)]['scale']['y']);this[_0x203b08(0x2b4)]['y']=Math[_0x203b08(0x1bb)]((Graphics[_0x203b08(0x1e9)]+_0x5e4aae)/0x2);},Scene_ItemCrafting['prototype']['setItemSpriteOpacity']=function(){const _0x1ef75c=_0x164ac2;this[_0x1ef75c(0x2a2)]=VisuMZ[_0x1ef75c(0x2d2)][_0x1ef75c(0x2cc)][_0x1ef75c(0x2cd)]['FadeSpeed']||0x1,this['_item'][_0x1ef75c(0x309)][_0x1ef75c(0x116)](VisuMZ[_0x1ef75c(0x2d2)][_0x1ef75c(0x11c)][_0x1ef75c(0x171)])&&(this[_0x1ef75c(0x2a2)]=Math['max'](Number(RegExp['$1']),0x1)),this['_itemSprite'][_0x1ef75c(0x261)]=0x0;},Scene_ItemCrafting[_0x164ac2(0x2da)]['createAnimationIDs']=function(){const _0xd9d5e9=_0x164ac2;this['_animationIDs']=[],this[_0xd9d5e9(0x1dd)]['note'][_0xd9d5e9(0x116)](VisuMZ[_0xd9d5e9(0x2d2)][_0xd9d5e9(0x11c)][_0xd9d5e9(0x198)])?this[_0xd9d5e9(0x197)]=RegExp['$1']['split'](',')[_0xd9d5e9(0x1be)](_0x262ea5=>Number(_0x262ea5)):this[_0xd9d5e9(0x197)]=this[_0xd9d5e9(0x197)][_0xd9d5e9(0x17a)](VisuMZ[_0xd9d5e9(0x2d2)][_0xd9d5e9(0x2cc)][_0xd9d5e9(0x2cd)][_0xd9d5e9(0x1b1)]);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x300)]=function(_0x5e4a1f){const _0x4dbc8e=_0x164ac2,_0x2c36dc=$dataAnimations[_0x5e4a1f];if(!_0x2c36dc)return;const _0x8d518e=this['isMVAnimation'](_0x2c36dc);this[_0x4dbc8e(0x15d)]=new(_0x8d518e?Sprite_AnimationMV:Sprite_Animation)();const _0x3e4a77=[this[_0x4dbc8e(0x2b4)]],_0x18799e=0x0;this['_animationSprite'][_0x4dbc8e(0x1da)](_0x3e4a77,_0x2c36dc,![],_0x18799e,null),this[_0x4dbc8e(0x32a)](this[_0x4dbc8e(0x15d)]);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x324)]=function(_0x206944){return!!_0x206944['frames'];},Scene_ItemCrafting['prototype'][_0x164ac2(0x1c0)]=function(){const _0x56a83f=_0x164ac2;if(!this[_0x56a83f(0x128)])return;this[_0x56a83f(0x1ff)](),this[_0x56a83f(0x2c4)](),this[_0x56a83f(0x259)]()&&this[_0x56a83f(0x22e)]();},Scene_ItemCrafting[_0x164ac2(0x2da)]['updateItemSpriteOpacity']=function(){const _0x136e8e=_0x164ac2;this['_itemSprite'][_0x136e8e(0x261)]+=this[_0x136e8e(0x2a2)];},Scene_ItemCrafting['prototype'][_0x164ac2(0x2c4)]=function(){const _0x486bf8=_0x164ac2;if(!this[_0x486bf8(0x15d)])return;if(this['_animationSprite']['isPlaying']())return;this['destroyAnimationSprite'](),this[_0x486bf8(0x300)](this[_0x486bf8(0x197)][_0x486bf8(0x12f)]());},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x112)]=function(){const _0x2d63e4=_0x164ac2;if(!this[_0x2d63e4(0x15d)])return;this[_0x2d63e4(0x155)](this[_0x2d63e4(0x15d)]),this['_animationSprite'][_0x2d63e4(0x137)](),this[_0x2d63e4(0x15d)]=undefined;},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2ce)]=function(){const _0x3952b0=_0x164ac2;if(!this[_0x3952b0(0x2b4)])return;this[_0x3952b0(0x155)](this[_0x3952b0(0x2b4)]),this['_itemSprite'][_0x3952b0(0x137)](),this['_itemSprite']=undefined;},Scene_ItemCrafting['prototype'][_0x164ac2(0x259)]=function(){const _0x2eb07d=_0x164ac2;if(TouchInput[_0x2eb07d(0x20f)]())return!![];if(Input[_0x2eb07d(0x25d)]('ok'))return!![];if(Input[_0x2eb07d(0x25d)](_0x2eb07d(0x190)))return!![];if(this['_itemSprite']['opacity']<0xff)return![];if(this['_animationSprite'])return![];return this['_animationWait']--<=0x0;},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x22e)]=function(){const _0x1e89d2=_0x164ac2;this['destroyAnimationSprite'](),this[_0x1e89d2(0x2ce)](),this[_0x1e89d2(0x273)](),TouchInput[_0x1e89d2(0x2de)](),Input['clear']();},Scene_ItemCrafting['prototype'][_0x164ac2(0x16c)]=function(){const _0x55a557=_0x164ac2;Scene_Item[_0x55a557(0x2da)][_0x55a557(0x16c)][_0x55a557(0x24d)](this);if($gameSystem['_craftingCommonEventScene'])return;$gameTemp[_0x55a557(0x2f8)]();},Scene_ItemCrafting['prototype']['resetCraftingSwitches']=function(){const _0x2fd03c=_0x164ac2;if(!SceneManager[_0x2fd03c(0x20d)]())return;const _0x42e7e1=VisuMZ['ItemCraftingSys'][_0x2fd03c(0x2cc)][_0x2fd03c(0x194)];_0x42e7e1[_0x2fd03c(0x275)]&&$gameSwitches[_0x2fd03c(0x1b8)](_0x42e7e1[_0x2fd03c(0x275)],![]);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x14b)]=function(){const _0xce04a3=_0x164ac2;if(!SceneManager[_0xce04a3(0x20d)]())return;const _0x4267aa=VisuMZ[_0xce04a3(0x2d2)]['Settings']['General'];_0x4267aa[_0xce04a3(0x275)]&&$gameSwitches[_0xce04a3(0x1b8)](_0x4267aa['SwitchCraft'],!![]);},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x13f)]=function(){const _0xc6e9aa=_0x164ac2;if(!Imported['VisuMZ_2_ShopCommonEvents'])return![];const _0x41d247=this[_0xc6e9aa(0x1dd)]?this['_item'][_0xc6e9aa(0x309)]||'':'',_0x1999a7=VisuMZ[_0xc6e9aa(0x2d2)]['RegExp'];if(_0x41d247[_0xc6e9aa(0x116)](_0x1999a7[_0xc6e9aa(0x13a)])&&!$gameSystem[_0xc6e9aa(0x27d)](this[_0xc6e9aa(0x1dd)])&&this['meetsCraftingCommonEventSwitches'](!![]))return!![];else{if(_0x41d247['match'](_0x1999a7[_0xc6e9aa(0x224)])&&this[_0xc6e9aa(0x262)](![]))return!![];}return![];},Scene_ItemCrafting['prototype'][_0x164ac2(0x262)]=function(_0x554796){const _0x104f65=_0x164ac2,_0x1809d5=this[_0x104f65(0x1dd)]?this[_0x104f65(0x1dd)][_0x104f65(0x309)]:'',_0x11d3a4=VisuMZ[_0x104f65(0x2d2)][_0x104f65(0x11c)],_0x1c4cb5=_0x554796?_0x104f65(0x2b0):_0x104f65(0x147);if(_0x1809d5[_0x104f65(0x116)](_0x11d3a4[_0x1c4cb5+_0x104f65(0x1fa)])){const _0x659875=RegExp['$1'][_0x104f65(0x106)](',')[_0x104f65(0x1be)](_0x271d8f=>Number(_0x271d8f));for(const _0x53a3a7 of _0x659875){if($gameSwitches['value'](_0x53a3a7)===![])return![];}}if(_0x1809d5[_0x104f65(0x116)](_0x11d3a4[_0x1c4cb5+_0x104f65(0x250)])){const _0x42b90a=RegExp['$1'][_0x104f65(0x106)](',')[_0x104f65(0x1be)](_0x453282=>Number(_0x453282));for(const _0x18086c of _0x42b90a){if($gameSwitches[_0x104f65(0x200)](_0x18086c)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting[_0x164ac2(0x2da)][_0x164ac2(0x2dd)]=function(){const _0x5ba80d=_0x164ac2,_0x4a255c=this['_item']?this[_0x5ba80d(0x1dd)][_0x5ba80d(0x309)]:'',_0x8f8505=VisuMZ[_0x5ba80d(0x2d2)][_0x5ba80d(0x11c)];let _0x12a5f9=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0x4a255c[_0x5ba80d(0x116)](_0x8f8505['CraftEventOnce'])&&!$gameSystem[_0x5ba80d(0x27d)](this[_0x5ba80d(0x1dd)]))_0x12a5f9=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this[_0x5ba80d(0x1dd)]);else this['meetsCraftingCommonEventSwitches'](![])&&_0x4a255c[_0x5ba80d(0x116)](_0x8f8505[_0x5ba80d(0x224)])&&(_0x12a5f9=Number(RegExp['$1'])||0x1);if(_0x12a5f9<=0x0){this[_0x5ba80d(0x2fa)]();return;}$gameSystem[_0x5ba80d(0x2fd)]=!![],$gameTemp[_0x5ba80d(0x125)](_0x12a5f9),SceneManager['goto'](Scene_Map);},VisuMZ[_0x164ac2(0x2d2)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x164ac2(0x2da)][_0x164ac2(0x2a8)],Window_MenuCommand[_0x164ac2(0x2da)][_0x164ac2(0x2a8)]=function(){const _0x208acc=_0x164ac2;VisuMZ[_0x208acc(0x2d2)][_0x208acc(0x20a)][_0x208acc(0x24d)](this),this[_0x208acc(0x2f0)]();},Window_MenuCommand[_0x164ac2(0x2da)][_0x164ac2(0x2f0)]=function(){const _0xac4dcb=_0x164ac2;if(!this[_0xac4dcb(0x136)]())return;if(!this[_0xac4dcb(0x18b)]())return;const _0x3f7355=TextManager[_0xac4dcb(0x210)],_0x4654e0=this[_0xac4dcb(0x23a)]();this['addCommand'](_0x3f7355,_0xac4dcb(0x22f),_0x4654e0);},Window_MenuCommand[_0x164ac2(0x2da)]['addItemCraftingCommandAutomatically']=function(){const _0x4211c6=_0x164ac2;return Imported[_0x4211c6(0x276)]?![]:!![];},Window_MenuCommand[_0x164ac2(0x2da)]['isItemCraftingCommandVisible']=function(){const _0x1b6171=_0x164ac2;return $gameSystem[_0x1b6171(0x118)]();},Window_MenuCommand[_0x164ac2(0x2da)][_0x164ac2(0x23a)]=function(){const _0x4b5923=_0x164ac2;if(DataManager[_0x4b5923(0x1a7)]()[_0x4b5923(0x225)]<=0x0)return![];return $gameSystem[_0x4b5923(0x166)]();},VisuMZ['ItemCraftingSys'][_0x164ac2(0x2d1)]=Window_ItemCategory[_0x164ac2(0x2da)]['makeCommandList'],Window_ItemCategory[_0x164ac2(0x2da)][_0x164ac2(0x29b)]=function(){const _0x237b55=_0x164ac2;if(SceneManager[_0x237b55(0x20d)]()){this[_0x237b55(0x23c)]();if(this[_0x237b55(0x113)]['length']<=0x0){this['addUncategorizedItemCategory'](),SceneManager[_0x237b55(0x2e4)]['popScene']();return;}this[_0x237b55(0x2d7)]();let _0xf21895=this[_0x237b55(0x2b8)]();if(this['_lastCraftingExt']){const _0x14749c=this[_0x237b55(0x175)](this['_lastCraftingExt']);if(_0x14749c>=0x0)_0xf21895=_0x14749c;}_0xf21895=_0xf21895>=this[_0x237b55(0x113)][_0x237b55(0x225)]?0x0:_0xf21895,this[_0x237b55(0x187)](_0xf21895);}else VisuMZ[_0x237b55(0x2d2)][_0x237b55(0x2d1)]['call'](this);},Window_ItemCategory[_0x164ac2(0x2da)]['createUncategorizedItemCategory']=function(){const _0x59ef33=_0x164ac2,_0x4cc1cb=Window_ItemCategory['categoryList'],_0x1ddfcb=DataManager[_0x59ef33(0x1a7)]()[_0x59ef33(0x108)](),_0x5e36b9=[];for(const _0x2f3999 of _0x4cc1cb){this[_0x59ef33(0x32c)]=_0x2f3999[_0x59ef33(0x2f9)];for(const _0x2a5956 of _0x1ddfcb){Window_ItemList[_0x59ef33(0x2da)][_0x59ef33(0x2f3)][_0x59ef33(0x24d)](this,_0x2a5956)&&_0x5e36b9['push'](_0x2a5956);}}this[_0x59ef33(0x32c)]=null;for(const _0x1c5776 of _0x5e36b9){_0x1ddfcb[_0x59ef33(0x1b9)](_0x1c5776);}_0x1ddfcb[_0x59ef33(0x225)]>0x0&&this['addUncategorizedItemCategory'](),this[_0x59ef33(0x192)]=_0x1ddfcb;},Window_ItemCategory['prototype'][_0x164ac2(0x16a)]=function(){const _0x58868f=_0x164ac2,_0x192bb0=VisuMZ[_0x58868f(0x2d2)]['Settings'][_0x58868f(0x194)];let _0x46136b=_0x192bb0['Uncategorized']||_0x58868f(0x2a6),_0x5f3472=_0x192bb0[_0x58868f(0x124)]||0xa0;_0x46136b=_0x58868f(0x2a4)[_0x58868f(0x188)](_0x5f3472,_0x46136b),this[_0x58868f(0x223)](_0x46136b,_0x58868f(0x314),!![],_0x58868f(0x142));},VisuMZ[_0x164ac2(0x2d2)]['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x164ac2(0x2da)][_0x164ac2(0x176)],Window_ItemCategory['prototype']['addItemCategory']=function(_0xf23ea4){const _0x13e273=_0x164ac2;if(SceneManager[_0x13e273(0x20d)]()&&!this[_0x13e273(0x163)](_0xf23ea4))return;VisuMZ['ItemCraftingSys']['Window_ItemCategory_addItemCategory'][_0x13e273(0x24d)](this,_0xf23ea4);},Window_ItemCategory[_0x164ac2(0x2da)][_0x164ac2(0x163)]=function(_0x4a64be){const _0x30db70=_0x164ac2,_0x4d6adf=DataManager[_0x30db70(0x1a7)](),_0x4f8833=_0x4a64be['Type'],_0x36dd82=_0x4a64be[_0x30db70(0x121)];this[_0x30db70(0x32c)]=_0x4f8833;for(const _0x10926b of _0x4d6adf){if(!_0x10926b)continue;if(Window_ItemList['prototype'][_0x30db70(0x2f3)][_0x30db70(0x24d)](this,_0x10926b))return this[_0x30db70(0x32c)]=null,!![];}return this[_0x30db70(0x32c)]=null,![];},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x150)]=Window_ItemCategory[_0x164ac2(0x2da)][_0x164ac2(0x1c1)],Window_ItemCategory[_0x164ac2(0x2da)][_0x164ac2(0x1c1)]=function(){const _0x27eb99=_0x164ac2;if(SceneManager['isSceneItemCrafting']())return!![];return VisuMZ[_0x27eb99(0x2d2)][_0x27eb99(0x150)]['call'](this);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2a1)]=Window_Selectable['prototype'][_0x164ac2(0x187)],Window_Selectable[_0x164ac2(0x2da)][_0x164ac2(0x187)]=function(_0x36feb7){const _0x135acc=_0x164ac2;VisuMZ[_0x135acc(0x2d2)][_0x135acc(0x2a1)][_0x135acc(0x24d)](this,_0x36feb7),this[_0x135acc(0x2a3)]===Window_ItemCategory&&SceneManager[_0x135acc(0x20d)]()&&_0x36feb7>=0x0&&(this[_0x135acc(0x140)]=this[_0x135acc(0x162)]()||'');};function Window_ItemCraftingList(){this['initialize'](...arguments);}Window_ItemCraftingList[_0x164ac2(0x2da)]=Object['create'](Window_ItemList[_0x164ac2(0x2da)]),Window_ItemCraftingList['prototype'][_0x164ac2(0x2a3)]=Window_ItemCraftingList,Window_ItemCraftingList['quantityFontSize']=VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2cc)]['Window'][_0x164ac2(0x1ea)],Window_ItemCraftingList[_0x164ac2(0x28e)]=VisuMZ['ItemCraftingSys'][_0x164ac2(0x2cc)]['Mask'][_0x164ac2(0x2c5)],Window_ItemCraftingList[_0x164ac2(0x2da)]['initialize']=function(_0x26ee0d){const _0x4ca24d=_0x164ac2;Window_ItemList[_0x4ca24d(0x2da)]['initialize'][_0x4ca24d(0x24d)](this,_0x26ee0d),this[_0x4ca24d(0x1b4)]();},Window_ItemCraftingList['prototype'][_0x164ac2(0x122)]=function(){return 0x1;},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x141)]=function(){const _0x2fc6a7=_0x164ac2;return Window_Scrollable['prototype'][_0x2fc6a7(0x141)]['call'](this)*0x3+0x8;},Window_ItemCraftingList[_0x164ac2(0x2da)]['isEnabled']=function(_0x223993){return!![];},Window_ItemCraftingList[_0x164ac2(0x2da)]['makeItemList']=function(){const _0x1be06e=_0x164ac2;this[_0x1be06e(0x1c8)]=DataManager['currentCraftableItems']()[_0x1be06e(0x11b)](_0x51ab60=>this[_0x1be06e(0x2f3)](_0x51ab60));const _0x7dd0b8=this['_data'][_0x1be06e(0x1be)](_0x39f70b=>DataManager[_0x1be06e(0x234)](_0x39f70b)['length']);this[_0x1be06e(0x1ca)]=Math[_0x1be06e(0x1d6)](..._0x7dd0b8)+0x1;},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x2f3)]=function(_0x39b97b){const _0x835eee=_0x164ac2;if(this[_0x835eee(0x32c)]===_0x835eee(0x142)){const _0x109297=SceneManager[_0x835eee(0x2e4)];if(_0x109297&&_0x109297['_categoryWindow']&&_0x109297[_0x835eee(0x1d4)][_0x835eee(0x192)])return _0x109297[_0x835eee(0x1d4)][_0x835eee(0x192)][_0x835eee(0x2f3)](_0x39b97b);}return Window_ItemList[_0x835eee(0x2da)]['includes'][_0x835eee(0x24d)](this,_0x39b97b);},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x229)]=function(){},Window_ItemCraftingList['prototype']['drawItem']=function(_0x3e62fb){const _0xe7ea59=_0x164ac2,_0x434c00=this['itemAt'](_0x3e62fb);if(!_0x434c00)return;const _0xd0c2f4=this[_0xe7ea59(0x22a)](_0x3e62fb);this[_0xe7ea59(0x2c8)](),this[_0xe7ea59(0x25f)](_0xd0c2f4,0x2),this[_0xe7ea59(0x295)](_0x3e62fb,_0x434c00,_0xd0c2f4),this['drawCraftedIcon'](_0x434c00,_0xd0c2f4),this[_0xe7ea59(0x127)](_0x434c00,_0xd0c2f4),this[_0xe7ea59(0x186)](_0x434c00,_0xd0c2f4);},Window_ItemCraftingList['prototype'][_0x164ac2(0x25f)]=function(_0x16d80c,_0x17497c){const _0x404e0f=_0x164ac2;_0x17497c=_0x17497c||0x1,this[_0x404e0f(0x238)](![]);const _0x313695=ColorManager[_0x404e0f(0x1eb)](),_0x53c77a=ColorManager[_0x404e0f(0x12c)](),_0xd19664=_0x16d80c['width']/0x2,_0x3959b0=this[_0x404e0f(0x114)]();while(_0x17497c--){this[_0x404e0f(0x161)]['gradientFillRect'](_0x16d80c['x'],_0x16d80c['y'],_0xd19664,_0x3959b0,_0x53c77a,_0x313695),this[_0x404e0f(0x161)][_0x404e0f(0x123)](_0x16d80c['x']+_0xd19664,_0x16d80c['y'],_0xd19664,_0x3959b0,_0x313695,_0x53c77a);}this[_0x404e0f(0x238)](!![]);},Window_Base[_0x164ac2(0x2da)][_0x164ac2(0x127)]=function(_0x5601d2,_0x35fd08){const _0x348b90=_0x164ac2;let _0x14a1e5=_0x5601d2[_0x348b90(0x32d)],_0x35b8e8=_0x35fd08[_0x348b90(0x1e9)]+this[_0x348b90(0x130)]()*0x2,_0x467cbd=_0x35fd08['y'],_0x4ad071=_0x35fd08['width']-_0x35b8e8-this[_0x348b90(0x130)]()-ImageManager[_0x348b90(0x195)];DataManager[_0x348b90(0x293)](_0x5601d2)&&(_0x14a1e5=VisuMZ[_0x348b90(0x2d2)]['maskItemName'](_0x5601d2),this[_0x348b90(0x161)][_0x348b90(0x10e)]=Window_ItemCraftingList[_0x348b90(0x28e)]),this['drawText'](_0x14a1e5,_0x35b8e8,_0x467cbd,_0x4ad071,'left'),this[_0x348b90(0x161)][_0x348b90(0x10e)]=![];},VisuMZ[_0x164ac2(0x2d2)]['maskItemName']=function(_0x49ef76){const _0x2c9230=_0x164ac2;DataManager[_0x2c9230(0x170)]&&(_0x49ef76=DataManager['getProxyItem'](_0x49ef76));if(_0x49ef76[_0x2c9230(0x309)]['match'](VisuMZ[_0x2c9230(0x2d2)][_0x2c9230(0x11c)][_0x2c9230(0x1cf)]))return String(RegExp['$1']);else{const _0xf4a5df=TextManager[_0x2c9230(0x1e5)];return Array(_0x49ef76[_0x2c9230(0x32d)][_0x2c9230(0x225)]+0x1)['join'](_0xf4a5df);}},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x295)]=function(_0x48acf3,_0x19436b,_0x52f11a){const _0x41f538=_0x164ac2,_0x287acb=VisuMZ[_0x41f538(0x2d2)][_0x41f538(0x11c)],_0xe8c5a1=_0x19436b[_0x41f538(0x309)];let _0x1b7699='';if(_0xe8c5a1[_0x41f538(0x116)](_0x287acb[_0x41f538(0x1f9)]))_0x1b7699=String(RegExp['$1']);else _0xe8c5a1[_0x41f538(0x116)](_0x287acb[_0x41f538(0x2c3)])&&(_0x1b7699=String(RegExp['$1']));if(_0x1b7699){const _0x2cf62e=ImageManager[_0x41f538(0x2d5)](_0x1b7699);_0x2cf62e['addLoadListener'](this['drawPicture'][_0x41f538(0x1e2)](this,_0x48acf3,_0x2cf62e));}else this[_0x41f538(0x28b)](_0x19436b,_0x52f11a);},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x119)]=function(_0x1f84c1,_0x573681){const _0x17fb38=_0x164ac2,_0x252cb2=this['itemRectWithPadding'](_0x1f84c1);let _0x157db7=_0x252cb2['x']+this['itemPadding'](),_0x2560a4=_0x252cb2['y']+0x4,_0x2919d3=_0x252cb2['width']-this[_0x17fb38(0x130)]()*0x2,_0x4cb070=_0x252cb2[_0x17fb38(0x1e9)]-0x8,_0x593b4d=Math[_0x17fb38(0x267)](_0x2919d3,_0x4cb070);const _0x771260=_0x593b4d/_0x573681['width'],_0x23c4a5=_0x593b4d/_0x573681['height'],_0x57164a=Math[_0x17fb38(0x267)](_0x771260,_0x23c4a5,0x1);let _0x201ca5=Math[_0x17fb38(0x1bb)](_0x573681[_0x17fb38(0x249)]*_0x57164a),_0x454b7f=Math[_0x17fb38(0x1bb)](_0x573681['height']*_0x57164a);_0x157db7+=Math[_0x17fb38(0x1bb)]((_0x593b4d-_0x201ca5)/0x2),_0x2560a4+=Math[_0x17fb38(0x1bb)]((_0x593b4d-_0x454b7f)/0x2);const _0x169356=_0x573681[_0x17fb38(0x249)],_0x286bb6=_0x573681[_0x17fb38(0x1e9)];this[_0x17fb38(0x161)][_0x17fb38(0x2ae)][_0x17fb38(0x291)]=!![],this['contents'][_0x17fb38(0x308)](_0x573681,0x0,0x0,_0x169356,_0x286bb6,_0x157db7,_0x2560a4,_0x201ca5,_0x454b7f),this[_0x17fb38(0x161)][_0x17fb38(0x2ae)][_0x17fb38(0x291)]=!![];},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x28b)]=function(_0x267e2e,_0x50de91){const _0x295629=_0x164ac2,_0x517509=_0x267e2e[_0x295629(0x269)];let _0x476d73=_0x50de91['x']+this['itemPadding'](),_0x7c7294=_0x50de91['y']+0x4,_0x54b569=_0x50de91[_0x295629(0x249)]-this['itemPadding']()*0x2,_0x11c0d8=_0x50de91[_0x295629(0x1e9)]-0x8,_0x124ee=Math['min'](_0x54b569,_0x11c0d8);_0x124ee=Math[_0x295629(0x244)](_0x124ee/ImageManager['iconWidth'])*ImageManager[_0x295629(0x195)],_0x7c7294+=(_0x11c0d8-_0x124ee)/0x2;const _0xb1e0fc=ImageManager[_0x295629(0x253)]('IconSet'),_0xdcb5f6=ImageManager[_0x295629(0x195)],_0x2d02f0=ImageManager[_0x295629(0x294)],_0xa25f61=_0x517509%0x10*_0xdcb5f6,_0x109858=Math[_0x295629(0x244)](_0x517509/0x10)*_0x2d02f0;this['contents'][_0x295629(0x2ae)]['imageSmoothingEnabled']=![],this[_0x295629(0x161)][_0x295629(0x308)](_0xb1e0fc,_0xa25f61,_0x109858,_0xdcb5f6,_0x2d02f0,_0x476d73,_0x7c7294,_0x124ee,_0x124ee),this[_0x295629(0x161)][_0x295629(0x2ae)][_0x295629(0x291)]=!![];},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x1ce)]=function(_0x6cc18,_0x55bcfc){const _0x578677=_0x164ac2;if(!$gameSystem[_0x578677(0x1c4)](_0x6cc18))return;const _0x4cf460=ImageManager[_0x578677(0x2b5)];let _0x174a0f=_0x55bcfc['x']+_0x55bcfc[_0x578677(0x249)]-ImageManager['iconWidth'],_0x325884=_0x55bcfc['y']+0x2;this[_0x578677(0x172)](_0x4cf460,_0x174a0f,_0x325884);},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x186)]=function(_0x97ac22,_0x31ed64){const _0x2ba404=_0x164ac2,_0x939375=DataManager['getCraftingIngredients'](_0x97ac22);let _0x36028c=_0x31ed64[_0x2ba404(0x1e9)]+this[_0x2ba404(0x130)]()*0x2,_0x2dc8c5=_0x31ed64['y']+Math['round'](this['lineHeight']()*1.2),_0x95a783=_0x31ed64[_0x2ba404(0x249)]-_0x36028c-this[_0x2ba404(0x130)](),_0x4ce26d=Math['floor'](_0x95a783/this[_0x2ba404(0x1ca)]),_0x526b98=!![];for(const _0x245a00 of _0x939375){if(!_0x526b98){let _0x32c38a=TextManager[_0x2ba404(0x20b)],_0x2eb8b0=_0x31ed64['y']+(_0x31ed64[_0x2ba404(0x1e9)]-this[_0x2ba404(0x114)]()*1.5);this[_0x2ba404(0x239)](_0x32c38a,_0x36028c,_0x2eb8b0,_0x4ce26d,_0x2ba404(0x1b6));}_0x36028c+=_0x4ce26d;const _0x139b9a=_0x245a00[0x0],_0x1dd019=_0x245a00[0x1],_0x4d3288=_0x139b9a===_0x2ba404(0x213)?$gameParty['gold']():$gameParty['numItems'](_0x139b9a);if(_0x139b9a===_0x2ba404(0x213))this[_0x2ba404(0x1fd)](_0x1dd019,_0x4d3288,_0x36028c,_0x2dc8c5,_0x4ce26d);else typeof _0x139b9a===_0x2ba404(0x29f)&&_0x139b9a['match'](/CATEGORY/i)?this[_0x2ba404(0x10c)](_0x139b9a,_0x1dd019,_0x36028c,_0x2dc8c5,_0x4ce26d):this[_0x2ba404(0x272)](_0x139b9a,_0x1dd019,_0x4d3288,_0x36028c,_0x2dc8c5,_0x4ce26d);this[_0x2ba404(0x2c8)](),_0x526b98=![];}},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x1fd)]=function(_0x531124,_0x504d89,_0x342ca8,_0x1a7280,_0x1b64c2){const _0x3a04c5=_0x164ac2;if(Imported[_0x3a04c5(0x212)]){let _0x1db6c2=_0x342ca8-Math[_0x3a04c5(0x1bb)](ImageManager[_0x3a04c5(0x195)]/0x2),_0xa2701d=_0x1a7280+Math[_0x3a04c5(0x1bb)]((this['lineHeight']()-ImageManager['iconHeight'])/0x2);const _0x53bb25=VisuMZ[_0x3a04c5(0x1ec)]?VisuMZ[_0x3a04c5(0x1ec)]['Settings'][_0x3a04c5(0x189)][_0x3a04c5(0x2e6)]:0x0;this['drawIcon'](_0x53bb25,_0x1db6c2,_0xa2701d);}else{let _0x477362=_0x342ca8-Math[_0x3a04c5(0x1bb)](_0x1b64c2/0x2),_0xb81cf4=_0x1a7280+Math['round']((this[_0x3a04c5(0x114)]()-ImageManager[_0x3a04c5(0x294)])/0x2);this['changeTextColor'](ColorManager[_0x3a04c5(0x2a9)]()),this['makeFontBigger'](),this[_0x3a04c5(0x239)](TextManager[_0x3a04c5(0x1a3)],_0x477362,_0xb81cf4,_0x1b64c2,'center'),this[_0x3a04c5(0x2c8)]();}let _0x5b3170=_0x342ca8-Math[_0x3a04c5(0x1bb)](_0x1b64c2/0x2),_0x3c9a54=_0x1a7280+this['lineHeight']();const _0x5cad06=VisuMZ[_0x3a04c5(0x1e8)][_0x3a04c5(0x2cc)][_0x3a04c5(0x1db)][_0x3a04c5(0x15c)];let _0x3ef796=_0x5cad06[_0x3a04c5(0x188)](_0x531124);_0x531124>_0x504d89&&this[_0x3a04c5(0x156)](ColorManager[_0x3a04c5(0x245)]()),this[_0x3a04c5(0x161)][_0x3a04c5(0x145)]=Window_ItemCraftingList[_0x3a04c5(0x2f5)],this['drawText'](_0x3ef796,_0x5b3170,_0x3c9a54,_0x1b64c2,_0x3a04c5(0x1b6));},Window_ItemCraftingList[_0x164ac2(0x2da)]['drawIngredientCategory']=function(_0x1ea6c4,_0xfb0a87,_0xb0f942,_0x79f237,_0x34a937){const _0xb4a669=_0x164ac2,_0x1793ac=VisuMZ[_0xb4a669(0x2d2)][_0xb4a669(0x2cc)][_0xb4a669(0x194)];let _0x3ecdd6=_0xb0f942-Math[_0xb4a669(0x1bb)](ImageManager['iconWidth']/0x2),_0x34f2a2=_0x79f237+Math[_0xb4a669(0x1bb)]((this['lineHeight']()-ImageManager[_0xb4a669(0x294)])/0x2);this[_0xb4a669(0x172)](_0x1793ac[_0xb4a669(0x1ad)],_0x3ecdd6,_0x34f2a2),_0x1ea6c4['match'](/CATEGORY: (.*)/i);const _0x52fa5b=String(RegExp['$1'])[_0xb4a669(0x2f6)]();let _0x2917a1=_0xb0f942-Math[_0xb4a669(0x1bb)](_0x34a937/0x2),_0x4b220e=_0x79f237;this[_0xb4a669(0x161)][_0xb4a669(0x145)]=Window_ItemCraftingList[_0xb4a669(0x2f5)],this['drawText'](_0x52fa5b,_0x2917a1,_0x4b220e,_0x34a937,'center');let _0x59af42=_0xb0f942-Math[_0xb4a669(0x1bb)](_0x34a937/0x2),_0x43d220=_0x79f237+this[_0xb4a669(0x114)]();const _0x579721=VisuMZ[_0xb4a669(0x1e8)][_0xb4a669(0x2cc)][_0xb4a669(0x1db)]['ItemQuantityFmt'];let _0x40da41=_0x579721[_0xb4a669(0x188)](_0xfb0a87);this[_0xb4a669(0x161)][_0xb4a669(0x145)]=Window_ItemCraftingList[_0xb4a669(0x2f5)],this[_0xb4a669(0x239)](_0x40da41,_0x59af42,_0x43d220,_0x34a937,_0xb4a669(0x1b6));},Window_ItemCraftingList['prototype'][_0x164ac2(0x272)]=function(_0x1e4a71,_0x2cfc65,_0x3f972f,_0x54a002,_0x5ab61c,_0x35b018){const _0x1869ee=_0x164ac2;let _0x33c6ca=_0x54a002-Math['round'](ImageManager[_0x1869ee(0x195)]/0x2),_0xbfac80=_0x5ab61c+Math[_0x1869ee(0x1bb)]((this['lineHeight']()-ImageManager[_0x1869ee(0x294)])/0x2);this[_0x1869ee(0x172)](_0x1e4a71['iconIndex'],_0x33c6ca,_0xbfac80);let _0x1eead3=_0x54a002-Math[_0x1869ee(0x1bb)](_0x35b018/0x2),_0x3fe42c=_0x5ab61c+this[_0x1869ee(0x114)]();const _0x3abaa1=VisuMZ[_0x1869ee(0x1e8)]['Settings'][_0x1869ee(0x1db)][_0x1869ee(0x15c)];let _0xe5f663=_0x3abaa1['format'](_0x1869ee(0x11a)[_0x1869ee(0x188)](_0x3f972f,_0x2cfc65));_0x2cfc65>_0x3f972f&&this[_0x1869ee(0x156)](ColorManager[_0x1869ee(0x245)]()),this[_0x1869ee(0x161)]['fontSize']=Window_ItemCraftingList[_0x1869ee(0x2f5)],this[_0x1869ee(0x239)](_0xe5f663,_0x1eead3,_0x3fe42c,_0x35b018,'center');},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x1b4)]=function(){const _0x2ae67a=_0x164ac2;if(!VisuMZ[_0x2ae67a(0x2d2)][_0x2ae67a(0x2cc)][_0x2ae67a(0x10a)][_0x2ae67a(0x31b)])return;const _0x3ed167=new Rectangle(0x0,0x0,Graphics[_0x2ae67a(0x21f)],Window_Base[_0x2ae67a(0x2da)][_0x2ae67a(0x1b2)](0x1));this[_0x2ae67a(0x215)]=new Window_ItemCraftingTooltip(_0x3ed167),this['addChild'](this[_0x2ae67a(0x215)]);},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x104)]=function(){const _0xf777a4=_0x164ac2;Window_ItemList[_0xf777a4(0x2da)]['update']['call'](this),this['updateTooltipWindow']();},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x31d)]=function(){const _0x3256c4=_0x164ac2;if(!this[_0x3256c4(0x215)])return;this[_0x3256c4(0x24c)]()?this['setTooltipWindowText']():this[_0x3256c4(0x215)][_0x3256c4(0x26a)]('');const _0x260498=new Point(TouchInput['x'],TouchInput['y']),_0x48891a=this['worldTransform'][_0x3256c4(0x26c)](_0x260498);this[_0x3256c4(0x215)]['x']=_0x48891a['x']-this[_0x3256c4(0x215)]['width']/0x2,this[_0x3256c4(0x215)]['y']=_0x48891a['y']-this[_0x3256c4(0x215)]['height'];},Window_ItemCraftingList[_0x164ac2(0x2da)]['tooltipFrameCheckRequirements']=function(){const _0x2345ab=_0x164ac2;if(!this[_0x2345ab(0x13e)])return![];if(!this['item']())return![];if(!this[_0x2345ab(0x1ac)]())return![];if(this[_0x2345ab(0x153)]()!==this[_0x2345ab(0x2b8)]())return![];return!![];},Window_ItemCraftingList[_0x164ac2(0x2da)]['setTooltipWindowText']=function(){const _0x3fb9d8=_0x164ac2,_0x2893d6=this['itemRectWithPadding'](this[_0x3fb9d8(0x2b8)]());$gameTemp[_0x3fb9d8(0x2e8)]=!![];const _0x5ca0ca=DataManager['getCraftingIngredients'](this['item']());$gameTemp[_0x3fb9d8(0x2e8)]=![];const _0x3c1cf9=new Point(TouchInput['x'],TouchInput['y']),_0x1abce4=this[_0x3fb9d8(0x10b)][_0x3fb9d8(0x26c)](_0x3c1cf9);let _0xc60869=_0x2893d6[_0x3fb9d8(0x1e9)]+this[_0x3fb9d8(0x130)]()*0x2,_0xb5bcb9=_0x2893d6['y']+this['lineHeight'](),_0x3aa8b2=_0x2893d6[_0x3fb9d8(0x249)]-_0xc60869-this[_0x3fb9d8(0x130)](),_0x24a1ec=Math[_0x3fb9d8(0x244)](_0x3aa8b2/this['_maxIngredientsSize']);for(const _0x8e0593 of _0x5ca0ca){_0xc60869+=_0x24a1ec;const _0x558ebc=new Rectangle(_0xc60869-ImageManager[_0x3fb9d8(0x195)],0x0,ImageManager[_0x3fb9d8(0x195)]*0x2,Graphics['boxHeight']);if(_0x558ebc[_0x3fb9d8(0x13b)](_0x1abce4['x'],_0x1abce4['y'])){let _0x375507=_0x8e0593[0x0],_0xd581fb='';if(_0x375507==='gold')_0xd581fb=TextManager[_0x3fb9d8(0x1a3)];else typeof _0x375507===_0x3fb9d8(0x29f)&&_0x375507[_0x3fb9d8(0x116)](/CATEGORY/i)?(_0x375507[_0x3fb9d8(0x116)](/CATEGORY: (.*)/i),_0xd581fb=String(RegExp['$1'])[_0x3fb9d8(0x2f6)]()):_0xd581fb=_0x375507['name'];this[_0x3fb9d8(0x215)][_0x3fb9d8(0x26a)](_0xd581fb[_0x3fb9d8(0x2f6)]());return;}}this['_tooltipWindow'][_0x3fb9d8(0x26a)]('');},Window_ItemCraftingList[_0x164ac2(0x2da)][_0x164ac2(0x241)]=function(){const _0x8246d9=_0x164ac2,_0x1834e9=this[_0x8246d9(0x23e)]()&&DataManager[_0x8246d9(0x293)](this[_0x8246d9(0x23e)]())?null:this[_0x8246d9(0x23e)]();this[_0x8246d9(0x13d)](_0x1834e9),this['_statusWindow']&&this[_0x8246d9(0x144)][_0x8246d9(0x2a3)]===Window_ShopStatus&&this[_0x8246d9(0x144)][_0x8246d9(0x2c1)](_0x1834e9);};function _0x3e9b(){const _0x263235=['getProxyItem','opacitySpeed','drawIcon','hide','allCraftableItems','findExt','addItemCategory','7007752sWEbAI','toUpperCase','2661512sFCBmi','concat','number','ItemCraftingSceneOpen','AllSwitches','parseCraftingIngredientsData','_ingredientAmounts','numItems','addWindow','_craftingIngredients','_allCraftableArmors','clearUserSelectedIngredients','totalPriceY','drawCraftingIngredients','select','format','Gold','setupNumberWindow','isItemCraftingCommandVisible','Mask','IngredientList','_buttons','onItemOk','cancel','TurnSwitches','_nonCategoryItemCraftingItems','buttonAssistText4','General','iconWidth','GoldWindow_RectJS','_animationIDs','animationIDs','mainAreaHeight','mainCommandWidth','initItemCraftingEvents','buyWindowRectItemsEquipsCore','buttonAssistSmallIncrement','_itemsCrafted','loadTitle1','EnableMainMenu','playItemCrafting','right','currencyUnit','%1\x20has\x20illegal\x20batch\x20contents:\x0a','setHelpWindow','SortByIDandPriority','currentCraftableItems','isSceneMap','ARRAYJSON','craftableItems','isProxyItem','isTouchedInsideFrame','CategoryIcon','refresh','test','innerWidth','Animations','fittingHeight','initItemCraftingMainMenu','createTooltipWindow','ItemWindow_RectJS','center','AnySwitches','setValue','remove','_number','round','_categoryIndex','NumWindowShift','map','onNumberCancel','updateCraftingAnimation','needsSelection','createItemSprite','_animationWait','isItemCrafted','maxItems','Owned','buttonAssistText2','_data','armor','_maxIngredientsSize','createNumberWindow','getColor','activateItemWindow','drawCraftedIcon','MaskText','NoMask','helpWindowRect','_windowLayer','down','_categoryWindow','registerCraftingEvent','max','Armors','statusWindowRectItemsEquipsCore','_ingredientIndex','setup','ItemScene','callUpdateHelp','_item','hasCraftBatchItems','getArmorIdWithName','categoryWindowRectJS','_backSprite2','bind','commandWindowRectItemsEquipsCore','HelpWindow_RectJS','itemCraftingMask','drawShopBatchContentsItem','toLowerCase','ItemsEquipsCore','height','ReqQuantityFontSize','dimColor1','CoreEngine','isPlaytest','StatusBgType','CheckAllSwitches','helpAreaHeight','loadTitle2','CheckAnySwitches','parse','addLoadListener','registerCommand','smoothSelect','_ingredientSelectTitle','BgSettings','craftPicture','AllSw','itemWindowRectJS','craftableWeapons','drawIngredientGold','createJS','updateItemSpriteOpacity','value','buttonAssistKey1','_ItemCrafting_MainMenu','centerSprite','all','log','left','scale','\x20+\x20','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_MenuCommand_addOriginalCommands','itemCraftingIngredientsBridge','NUM','isSceneItemCrafting','createIngredientSelectionTitle','isReleased','ItemCraftingMenuCommand','setHandler','VisuMZ_0_CoreEngine','gold','ListBgType','_tooltipWindow','deactivate','tooltipSkin','show','getWeaponIdWithName','status','setFrame','SelectedText','CategoryBgType','setWindowBackgroundTypes','boxWidth','drawItemBackground','_commandWindow','gainCraftBatchItems','addCommand','CraftEventRepeat','length','ShowWindows','onNumberOk','setStatusWindow','selectLast','itemRectWithPadding','onIngredientListCancel','ConvertParams','jsOnCraft','processFinishAnimation','itemCrafting','WarningMsg','_backSprite1','Net','drawShopBatchContentsRemaining','getCraftingIngredients','isTouchOkEnabled','windowskin','parameters','changePaintOpacity','drawText','isItemCraftingCommandEnabled','drawTotalPrice','addItemCategories','helpWindowRectJS','item','setItemSpritePosition','isWeapon','updateHelp','getCustomItemCraftingSettings','hasCustomWindowSkin','floor','powerDownColor','CustomItemCraftingSceneOpen','owned','createContents','width','EVAL','onButtonOk','tooltipFrameCheckRequirements','call','createAnimationIDs','ARRAYSTRUCT','AnySw','selectedIngredientList','anchor','loadSystem','jsGlobalCraftEffect','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','doesItemHaveOpenCategories','2934nCAsAn','NumberBgType','isFinishedAnimating','mainAreaTop','Game_Party_numItems','StatusWindow_RectJS','isTriggered','makeItemList','drawFadedItemBackground','createStatusWindow','opacity','meetsCraftingCommonEventSwitches','_armorIDs','cursorWidth','onIngredientListOk','_allCraftableItems','min','items','iconIndex','setText','setupSelectIngredientWindow','applyInverse','_alreadySelected','IngredientBridge','Show','setItemForCraftBatchContents','contentsBack','drawIngredientItem','finishAnimation','Scene_Menu_createCommandWindow','SwitchCraft','VisuMZ_1_MainMenuCore','Change','description','getItemIdWithName','playCancel','SystemEnableItemCraftingMenu','Ingredients','hasCraftingEventOccurred','Enable','setBackgroundType','%1%2','loadWindowskin','getCraftBatchItems','process_VisuMZ_ItemCraftingSys_Notetags','allItems','_goldWindow','onCategoryOk','innerHeight','categoryWindowRect','statusWindowRect','drawItemIngredient','drawBigItemIcon','Game_Party_gainItem','_weaponIDs','maskItalics','\x20=\x20','startAnimation','imageSmoothingEnabled','Weapon','isCraftingItemMasked','iconHeight','drawBigItemImage','IconSet','ARRAYSTR','IngredientTitle','gainItem','isCustomLayout','makeCommandList','_itemIDs','Parse_Notetags_CreateJS','OnSwitches','string','buttonAssistText1','Window_Selectable_select','_itemSpriteOpacitySpeed','constructor','\x5cI[%1]%2','987375FDVrDx','Uncategorized','_buttonAssistWindow','addOriginalCommands','systemColor','createCraftingIngredientsLists','119777tpFzbI','drawCraftBatchContents','createItemWindowBase','_context','Window_ShopStatus_refresh','CraftOnce','BgFilename1','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','craftableArmors','_itemSprite','itemCraftedIcon','_craftingEvents','MainMenu','index','drawTextEx','loseItem','standardIconWidth','Weapons','_customItemCraftingSettings','armors','BypassMasks','isItem','setItem','onItemCrafted','bigPicture','updateAnimationSprite','MaskItalics','exit','itemWindowRect','resetFontSettings','bitmap','isArmor','ShopScene','Settings','Animation','destroyItemSprite','Item','adjustSprite','Window_ItemCategory_makeCommandList','ItemCraftingSys','buttonAssistKey2','STRUCT','loadPicture','drawGoldIngredient','createUncategorizedItemCategory','Scene_Boot_onDatabaseLoaded','setItemSpriteBitmap','prototype','category:\x20%1','itemNameY','processCraftCommonEvent','clear','goldWindowRectItemsEquipsCore','Name','BgFilename2','version','enabled','_scene','_max','GoldIcon','statusWindowRectJS','_bypassProxy','drawCurrentItemName','setBackgroundOpacity','createItemWindow','CategoryWindow_RectJS','windowPadding','ButtonAssistBgType','shown','addItemCraftingCommand','drawIngredients','calcWindowHeight','includes','getInputMultiButtonStrings','quantityFontSize','trim','GoldBgType','clearCustomItemCraftingSettings','Type','returnBackToItemWindow','createBackground','helpAreaTop','_craftingCommonEventScene','onAnimationFinish','ARRAYNUM','createAnimation','drawTooltipBackground','isCraftItemListed','21709600CDzfsp','CategoryTitle','isRightInputMode','processItemCrafting','Armor','blt','note','checkItemCraftingResultsValid','changeOkButtonEnable','_clickHandler','_text','createCustomBackgroundImages','isOkEnabled','registerCraftedItem','showBatchContents','calcCraftBatchItemsMax','onDatabaseLoaded','category','commandItemCrafting','setCustomItemCraftingSettings','setItemWindow','14255vmwdrz','itemCraftingNumberWindowOk','isSceneBattle','ToolTips','_allCraftableWeapons','updateTooltipWindow','createIngredientSelectionList','_ingredientCategories','_amount','createGoldWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','setClickHandler','isMVAnimation','ParseAllNotetags','_numberWindow','ParseWeaponNotetags','_ingredientsList','Sound','addChild','statusWidth','_category','name','FUNC','JSON','drawCurrencyValue','getItemCraftedTimes','_iconSprite','allowCreateStatusWindow','goldWindowRectJS','allCraftableWeapons','ceil','isUseModernControls','update','BATCH_CONTENTS','split','STR','clone','categories','Window','worldTransform','drawIngredientCategory','hasMaxItems','fontItalic','shouldDrawCraftBatchContents','weapon','2135810WudFZK','destroyAnimationSprite','_list','lineHeight','initialize','match','EnableCustomLayout','isMainMenuItemCraftingVisible','drawPicture','%1/%2','filter','RegExp','_itemWindow','weapon-%1','customCraftingOnly','createCommandWindow','Icon','maxCols','gradientFillRect','NoCategoryIcon','reserveCommonEvent','BypassSwitches','drawCraftingItemName','_animationPlaying','ParseArmorNotetags','return\x200','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','dimColor2','refreshCursor','drawItemName','shift','itemPadding','itemLineRect','setMainMenuItemCraftingEnabled','loseGold','ParseItemNotetags','textColor','addItemCraftingCommandAutomatically','destroy','SnapshotOpacity','buttonAssistCategory','CraftEventOnce','contains','_helpWindow','setHelpWindowItem','active','itemHasCraftCommonEvent','_lastCraftingExt','itemHeight','ItemCraftingNoCategory','textWidth','_statusWindow','fontSize','createCraftingItemKey','CraftRepeat','VisuMZ_3_ShopBatches','drawMathMarks','allOfCraftBatchItemsMax','enableCraftingSwitches','_craftPicture','allCraftableArmors','visible','_ingredientSelectList','Window_ItemCategory_needsSelection','Window_ShopStatus_setItem','onItemCancel','hitIndex','OffSwitches','removeChild','changeTextColor','weapons','SelectedColor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','-\x20Items\x20must\x20never\x20give\x20themselves!','placeButtons','ItemQuantityFmt','_animationSprite','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','NumWindowNet','getBackgroundOpacity','contents','currentExt','isItemCraftingCategoryValid','drawCategories','_cache_getCraftBatchItems','isMainMenuItemCraftingEnabled','create','initItemCraftingSys','goldWindowRect','addUncategorizedItemCategory','push','terminate','CraftAssistButton','activate','setMainMenuItemCraftingVisible'];_0x3e9b=function(){return _0x263235;};return _0x3e9b();}function Window_ItemCraftingTooltip(){const _0x4ed600=_0x164ac2;this[_0x4ed600(0x115)](...arguments);}Window_ItemCraftingTooltip[_0x164ac2(0x2da)]=Object[_0x164ac2(0x167)](Window_Base[_0x164ac2(0x2da)]),Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x2a3)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x164ac2(0x217)]=VisuMZ[_0x164ac2(0x2d2)]['Settings'][_0x164ac2(0x10a)][_0x164ac2(0x32d)],Window_ItemCraftingTooltip['prototype'][_0x164ac2(0x115)]=function(_0x3f03ac){const _0x32f5f1=_0x164ac2;Window_Base[_0x32f5f1(0x2da)][_0x32f5f1(0x115)]['call'](this,_0x3f03ac),this['setBackgroundType'](this[_0x32f5f1(0x243)]()?0x0:0x2),this[_0x32f5f1(0x26a)]('');},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x243)]=function(){const _0x50d7f6=_0x164ac2;return Window_ItemCraftingTooltip[_0x50d7f6(0x217)]!=='';},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x281)]=function(){const _0x4893e1=_0x164ac2;Window_ItemCraftingTooltip[_0x4893e1(0x217)]!==''?this[_0x4893e1(0x236)]=ImageManager[_0x4893e1(0x253)](Window_ItemCraftingTooltip['tooltipSkin']):Window_Base[_0x4893e1(0x2da)][_0x4893e1(0x281)][_0x4893e1(0x24d)](this);},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x26a)]=function(_0x5e68a5){const _0x188a42=_0x164ac2;this[_0x188a42(0x30d)]!==_0x5e68a5&&(this[_0x188a42(0x30d)]=_0x5e68a5,this[_0x188a42(0x1ae)]());},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x2de)]=function(){const _0x106144=_0x164ac2;this[_0x106144(0x26a)]('');},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x2c1)]=function(_0x406c39){const _0x302cbf=_0x164ac2;this[_0x302cbf(0x26a)](_0x406c39?_0x406c39[_0x302cbf(0x32d)]:'');},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x1ae)]=function(){const _0x7b54b8=_0x164ac2,_0x4c9d86=this['baseTextRect']();this['drawTooltipBackground'](),this[_0x7b54b8(0x239)](this[_0x7b54b8(0x30d)],0x0,0x0,this['innerWidth'],'center');},Window_ItemCraftingTooltip[_0x164ac2(0x2da)][_0x164ac2(0x301)]=function(){const _0x404836=_0x164ac2;if(this[_0x404836(0x30d)]==='')this[_0x404836(0x161)][_0x404836(0x2de)](),this['width']=0x0;else{let _0x2ed01c=this[_0x404836(0x143)](this[_0x404836(0x30d)])+this[_0x404836(0x130)]()*0x4;this[_0x404836(0x249)]=_0x2ed01c+$gameSystem[_0x404836(0x2ed)]()*0x2,this[_0x404836(0x248)]();if(this[_0x404836(0x243)]())return;const _0x45918a=ColorManager[_0x404836(0x1eb)]();this[_0x404836(0x161)]['fillRect'](0x0,0x0,this[_0x404836(0x1b0)],this[_0x404836(0x287)],_0x45918a);}};function Window_ItemCraftingNumber(){const _0x103e13=_0x164ac2;this[_0x103e13(0x115)](...arguments);}Window_ItemCraftingNumber[_0x164ac2(0x2da)]=Object[_0x164ac2(0x167)](Window_ShopNumber['prototype']),Window_ItemCraftingNumber['prototype'][_0x164ac2(0x2a3)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber['prototype'][_0x164ac2(0x115)]=function(_0x503b1c){const _0x252f43=_0x164ac2;Window_ShopNumber[_0x252f43(0x2da)]['initialize'][_0x252f43(0x24d)](this,_0x503b1c);},Window_ItemCraftingNumber['prototype'][_0x164ac2(0x1da)]=function(_0x30df24){const _0x3b13cc=_0x164ac2;this[_0x3b13cc(0x1dd)]=_0x30df24,this[_0x3b13cc(0x2e5)]=this['determineMax'](),this[_0x3b13cc(0x1ba)]=Math[_0x3b13cc(0x267)](0x1,this[_0x3b13cc(0x2e5)]),this[_0x3b13cc(0x15b)](),this['refresh']();},Window_ItemCraftingNumber[_0x164ac2(0x2da)]['determineMax']=function(){const _0x18630f=_0x164ac2;if(DataManager[_0x18630f(0x1de)](this[_0x18630f(0x1dd)]))return $gameParty[_0x18630f(0x312)](this[_0x18630f(0x1dd)]);const _0x851f48=[],_0x1fdf3a=this[_0x18630f(0x1dd)],_0x2361e0=DataManager[_0x18630f(0x234)](_0x1fdf3a);let _0x4194b7=0x0;for(const _0x18f39c of _0x2361e0){if(!_0x18f39c)continue;let _0x4b7add=_0x18f39c[0x0];const _0x2cbe12=_0x18f39c[0x1];_0x4b7add==='gold'?_0x851f48[_0x18630f(0x16b)](Math[_0x18630f(0x244)]($gameParty[_0x18630f(0x213)]()/_0x2cbe12)):(typeof _0x4b7add===_0x18630f(0x29f)&&_0x4b7add['match'](/CATEGORY/i)&&(_0x4b7add=SceneManager[_0x18630f(0x2e4)][_0x18630f(0x328)][_0x4194b7],_0x4194b7+=0x1),_0x851f48[_0x18630f(0x16b)](Math['floor']($gameParty[_0x18630f(0x180)](_0x4b7add)/_0x2cbe12)));}if(_0x851f48[_0x18630f(0x225)]<=0x0)_0x851f48[_0x18630f(0x16b)](0x0);return _0x851f48['push']($gameParty[_0x18630f(0x1c5)](_0x1fdf3a)-$gameParty[_0x18630f(0x180)](_0x1fdf3a)),Math[_0x18630f(0x267)](..._0x851f48);},Window_ItemCraftingNumber['prototype'][_0x164ac2(0x1ae)]=function(){const _0x3f1f3e=_0x164ac2;Window_Selectable[_0x3f1f3e(0x2da)]['refresh']['call'](this),this[_0x3f1f3e(0x30b)](),this[_0x3f1f3e(0x220)](0x0),this[_0x3f1f3e(0x23b)](),this['drawHorzLine'](),this[_0x3f1f3e(0x2e9)]();},Window_ItemCraftingNumber[_0x164ac2(0x2da)]['changeOkButtonEnable']=function(){const _0x94f4cf=_0x164ac2,_0x22ac69=this[_0x94f4cf(0x18e)][0x4];if(!_0x22ac69)return;this['isOkEnabled']()?_0x22ac69[_0x94f4cf(0x323)](this[_0x94f4cf(0x24b)][_0x94f4cf(0x1e2)](this)):_0x22ac69[_0x94f4cf(0x30c)]=null;},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x2dc)]=function(){const _0x4c1a61=_0x164ac2;return Math['floor'](this[_0x4c1a61(0x185)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x185)]=function(){const _0x45678f=_0x164ac2;return Math[_0x45678f(0x244)](this[_0x45678f(0x287)]-this['lineHeight']()*6.5);},Window_ItemCraftingNumber['prototype']['buttonY']=function(){const _0xdd092d=_0x164ac2;return Math['floor'](this[_0xdd092d(0x2dc)]()+this[_0xdd092d(0x114)]()*0x2);},Window_ItemCraftingNumber[_0x164ac2(0x2da)]['isOkEnabled']=function(){const _0x2e1d04=_0x164ac2;if((this[_0x2e1d04(0x1ba)]||0x0)<=0x0)return![];return Window_ShopNumber[_0x2e1d04(0x2da)][_0x2e1d04(0x30f)][_0x2e1d04(0x24d)](this);},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x235)]=function(){const _0x49e993=_0x164ac2;return this[_0x49e993(0x30f)]();},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x23b)]=function(){const _0x697ca3=_0x164ac2,_0x403263=DataManager[_0x697ca3(0x234)](this['_item']);let _0x2ade5d=this[_0x697ca3(0x185)]();_0x2ade5d-=this['lineHeight']()*_0x403263[_0x697ca3(0x225)],this['_categoryIndex']=0x0,this[_0x697ca3(0x164)](_0x2ade5d);for(const _0x3e5abd of _0x403263){_0x2ade5d+=this['lineHeight']();if(!_0x3e5abd)continue;this[_0x697ca3(0x2f1)](_0x3e5abd,_0x2ade5d);};},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x164)]=function(_0x5e6d03){const _0x10ebac=_0x164ac2,_0x36469d=this[_0x10ebac(0x130)]();let _0x585359=_0x36469d*0x2;const _0x5849c6=this[_0x10ebac(0x1b0)]-_0x585359-_0x36469d*0x3,_0x543818=_0x585359+Math[_0x10ebac(0x102)](_0x5849c6/0x3),_0x12284c=Math['floor'](_0x5849c6*0x2/0x3/0x3),_0x379b7d=Math[_0x10ebac(0x1d6)](this[_0x10ebac(0x143)](_0x10ebac(0x208)),this[_0x10ebac(0x143)](_0x10ebac(0x28f)));this[_0x10ebac(0x2c8)](),this[_0x10ebac(0x156)](ColorManager[_0x10ebac(0x2a9)]());const _0x595c76=[_0x10ebac(0x247),_0x10ebac(0x12f),'net'];for(let _0xf84eac=0x0;_0xf84eac<0x3;_0xf84eac++){const _0x231d10=_0x595c76[_0xf84eac],_0xfc7be7=TextManager['ItemCraftingNumberWindow'][_0x231d10];this[_0x10ebac(0x239)](_0xfc7be7,_0x543818+_0x12284c*_0xf84eac+_0x379b7d,_0x5e6d03,_0x12284c-_0x379b7d,_0x10ebac(0x1b6));}},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x149)]=function(_0xb70dbd,_0x344a94){const _0x3e529a=_0x164ac2,_0x4200fb=this[_0x3e529a(0x130)]();let _0x108c37=_0x4200fb*0x2;const _0x570af0=this['innerWidth']-_0x108c37-_0x4200fb*0x3,_0x490b24=_0x108c37+Math[_0x3e529a(0x102)](_0x570af0/0x3),_0x18b2bb=Math[_0x3e529a(0x244)](_0x570af0*0x2/0x3/0x3);_0x344a94='\x20%1'[_0x3e529a(0x188)](_0x344a94),this[_0x3e529a(0x239)](_0x344a94,_0x490b24+_0x18b2bb*0x1,_0xb70dbd,_0x18b2bb,_0x3e529a(0x206)),this['drawText']('\x20=',_0x490b24+_0x18b2bb*0x2,_0xb70dbd,_0x18b2bb,_0x3e529a(0x206));},Window_ItemCraftingNumber['prototype'][_0x164ac2(0x2f1)]=function(_0x3b5a01,_0x374903){const _0x3ac009=_0x164ac2;let _0x5cd9b9=_0x3b5a01[0x0];this[_0x3ac009(0x2c8)](),this[_0x3ac009(0x149)](_0x374903,'-'),_0x5cd9b9===_0x3ac009(0x213)?this[_0x3ac009(0x2d6)](_0x3b5a01,_0x374903,!![]):this[_0x3ac009(0x28a)](_0x3b5a01,_0x374903,!![],![]);},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x2e9)]=function(){const _0xa99571=_0x164ac2,_0x45d124=[this[_0xa99571(0x1dd)],0x1],_0x28ee0e=this['itemNameY'](),_0x264161=DataManager[_0xa99571(0x293)](this[_0xa99571(0x1dd)]);this[_0xa99571(0x28a)](_0x45d124,_0x28ee0e,![],_0x264161),this[_0xa99571(0x149)](_0x28ee0e,'+');},Window_ItemCraftingNumber[_0x164ac2(0x2da)]['visualGoldDisplayAutosize']=function(){return!![];},Window_ItemCraftingNumber['prototype']['visualGoldDisplayNoCost']=function(){return![];},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x2d6)]=function(_0xd3248a,_0x49eec7,_0x308158){const _0x1e8e9d=_0x164ac2,_0x9756bf=this[_0x1e8e9d(0x130)]();let _0x32e6cb=_0x9756bf*0x2;const _0x2f6fc7=this[_0x1e8e9d(0x1b0)]-_0x32e6cb-_0x9756bf*0x3,_0x5e01f2=_0x32e6cb+Math['ceil'](_0x2f6fc7/0x3),_0x1c7a59=Math[_0x1e8e9d(0x244)](_0x2f6fc7*0x2/0x3/0x3),_0x4ffe5d=Math[_0x1e8e9d(0x1d6)](this[_0x1e8e9d(0x143)](_0x1e8e9d(0x208)),this['textWidth'](_0x1e8e9d(0x28f))),_0x52960a=_0xd3248a[0x0],_0x178cb2=_0xd3248a[0x1],_0x41133a=_0x178cb2*this[_0x1e8e9d(0x1ba)],_0x589935=VisuMZ['CoreEngine']?VisuMZ[_0x1e8e9d(0x1ec)]['Settings'][_0x1e8e9d(0x189)]['GoldIcon']:0x0;if(_0x589935>0x0){const _0x370697=ImageManager[_0x1e8e9d(0x2bb)]||0x20,_0x24d432=_0x370697-ImageManager[_0x1e8e9d(0x195)],_0x964925=_0x370697+0x4,_0x506428=_0x49eec7+(this[_0x1e8e9d(0x114)]()-ImageManager[_0x1e8e9d(0x294)])/0x2;this[_0x1e8e9d(0x172)](_0x589935+Math[_0x1e8e9d(0x102)](_0x24d432/0x2),_0x32e6cb,_0x506428),_0x32e6cb+=_0x964925;}this['changeTextColor'](ColorManager['systemColor']()),this[_0x1e8e9d(0x239)](TextManager[_0x1e8e9d(0x1a3)],_0x32e6cb,_0x49eec7,_0x1c7a59,_0x1e8e9d(0x206));const _0xc7a593=$gameParty[_0x1e8e9d(0x213)]();this['drawCurrencyValue'](_0xc7a593,TextManager[_0x1e8e9d(0x1a3)],_0x5e01f2,_0x49eec7,_0x1c7a59);const _0x40b061=_0x5e01f2+_0x1c7a59*0x1+_0x4ffe5d,_0x4a03b2=_0x1c7a59-_0x4ffe5d;this['drawCurrencyValue'](_0x41133a,TextManager[_0x1e8e9d(0x1a3)],_0x40b061,_0x49eec7,_0x4a03b2);const _0x5768db=_0x5e01f2+_0x1c7a59*0x2+_0x4ffe5d,_0x572d68=_0x1c7a59-_0x4ffe5d,_0x13f232=Math['min'](_0xc7a593+_0x41133a*(_0x308158?-0x1:0x1),$gameParty['maxGold']());this[_0x1e8e9d(0xfc)](_0x13f232,TextManager[_0x1e8e9d(0x1a3)],_0x5768db,_0x49eec7,_0x572d68);},Window_ItemCraftingNumber[_0x164ac2(0x2da)][_0x164ac2(0x28a)]=function(_0x2ecb74,_0x2aa0a1,_0x4aae91,_0x195bee){const _0x41f103=_0x164ac2,_0x1f9603=this[_0x41f103(0x130)]();let _0x839104=_0x1f9603*0x2;const _0x40b7ac=this[_0x41f103(0x1b0)]-_0x839104-_0x1f9603*0x3,_0x1a9304=_0x839104+Math[_0x41f103(0x102)](_0x40b7ac/0x3),_0x1ec8c3=Math[_0x41f103(0x244)](_0x40b7ac*0x2/0x3/0x3),_0x2f878f=Math[_0x41f103(0x1d6)](this[_0x41f103(0x143)](_0x41f103(0x208)),this['textWidth'](_0x41f103(0x28f)));let _0x3e5ec5=_0x2ecb74[0x0];typeof _0x3e5ec5===_0x41f103(0x29f)&&_0x3e5ec5[_0x41f103(0x116)](/CATEGORY/i)&&(_0x3e5ec5=SceneManager[_0x41f103(0x2e4)][_0x41f103(0x328)][this[_0x41f103(0x1bc)]],this[_0x41f103(0x1bc)]+=0x1);const _0xc1686=_0x2ecb74[0x1],_0x374812=_0xc1686*this[_0x41f103(0x1ba)];let _0x4799da=_0x3e5ec5[_0x41f103(0x269)];const _0x4ea394=_0x4799da>0x0?ImageManager['iconWidth']+0x4:0x0;if(_0x195bee){const _0x4ab493=new Rectangle(_0x839104,_0x2aa0a1,_0x40b7ac,this[_0x41f103(0x114)]());this[_0x41f103(0x127)](_0x3e5ec5,_0x4ab493),this[_0x41f103(0x172)](_0x3e5ec5[_0x41f103(0x269)],_0x4ab493['x'],_0x4ab493['y']);}else this[_0x41f103(0x12e)](_0x3e5ec5,_0x839104,_0x2aa0a1,_0x40b7ac);const _0x59a491=_0x1a9304+_0x1ec8c3*0x0,_0x40f2cd=_0x1ec8c3-_0x4ea394,_0x397190=$gameParty[_0x41f103(0x180)](_0x3e5ec5);this[_0x41f103(0x239)](_0x397190,_0x59a491,_0x2aa0a1,_0x40f2cd,'right'),this[_0x41f103(0x172)](_0x4799da,_0x59a491+_0x40f2cd+0x4,_0x2aa0a1);const _0x6a95a1=_0x1a9304+_0x1ec8c3*0x1+_0x2f878f,_0x215a75=_0x1ec8c3-_0x2f878f-_0x4ea394;this[_0x41f103(0x239)](_0x374812,_0x6a95a1,_0x2aa0a1,_0x215a75,_0x41f103(0x1a2)),this[_0x41f103(0x172)](_0x4799da,_0x6a95a1+_0x215a75+0x4,_0x2aa0a1);const _0x506572=_0x1a9304+_0x1ec8c3*0x2+_0x2f878f,_0x19889d=_0x1ec8c3-_0x2f878f-_0x4ea394,_0x112834=_0x397190+_0x374812*(_0x4aae91?-0x1:0x1);this[_0x41f103(0x239)](_0x112834,_0x506572,_0x2aa0a1,_0x19889d,_0x41f103(0x1a2)),this[_0x41f103(0x172)](_0x4799da,_0x506572+_0x19889d+0x4,_0x2aa0a1);},Window_ItemCraftingNumber[_0x164ac2(0x2da)]['itemRect']=function(){const _0x1af01d=_0x164ac2,_0x3b5b70=this[_0x1af01d(0x130)]();let _0xa232cc=_0x3b5b70*0x2;const _0x347bff=this[_0x1af01d(0x1b0)]-_0xa232cc-_0x3b5b70*0x3,_0x1e6ec7=_0xa232cc+Math[_0x1af01d(0x102)](_0x347bff/0x3),_0x1eb2bf=this['itemNameY'](),_0x236819=Math[_0x1af01d(0x244)](_0x347bff*0x2/0x3/0x3),_0x23d3e0=Math['max'](this['textWidth']('\x20+\x20'),this[_0x1af01d(0x143)](_0x1af01d(0x28f))),_0x2729c0=this[_0x1af01d(0x1dd)]?.[_0x1af01d(0x269)]>0x0?ImageManager[_0x1af01d(0x195)]:0x0,_0x459b73=this[_0x1af01d(0x264)](),_0x5693c8=new Rectangle(Math[_0x1af01d(0x244)](_0x1e6ec7+_0x236819*0x2-this[_0x1af01d(0x264)]()-_0x2729c0+this['itemPadding']()/0x2-0x2),_0x1eb2bf,this[_0x1af01d(0x264)](),this[_0x1af01d(0x114)]());return _0x5693c8;};function Window_ItemCraftingIngredient(){this['initialize'](...arguments);}Window_ItemCraftingIngredient[_0x164ac2(0x2da)]=Object[_0x164ac2(0x167)](Window_ItemList['prototype']),Window_ItemCraftingIngredient[_0x164ac2(0x2da)][_0x164ac2(0x2a3)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['initialize']=function(_0x229f2d){const _0xd6c017=_0x164ac2;Window_Selectable[_0xd6c017(0x2da)][_0xd6c017(0x115)][_0xd6c017(0x24d)](this,_0x229f2d),this[_0xd6c017(0x320)]=0x0;},Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['isShowNew']=function(){return![];},Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['setup']=function(_0x313c68,_0x7c3031){const _0x497a57=_0x164ac2;this[_0x497a57(0x32c)]=_0x313c68,this[_0x497a57(0x320)]=_0x7c3031||0x1,this['refresh'](),this['scrollTo'](0x0,0x0),this[_0x497a57(0x16e)](),this[_0x497a57(0x1f6)](0x0);},Window_ItemCraftingIngredient[_0x164ac2(0x2da)][_0x164ac2(0x25e)]=function(){const _0x5df461=_0x164ac2;this['_data']=$gameParty[_0x5df461(0x284)]()[_0x5df461(0x11b)](_0x22f5d8=>this[_0x5df461(0x2f3)](_0x22f5d8));},Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['includes']=function(_0x826274){const _0xa39b8a=_0x164ac2;if(!_0x826274)return![];if(_0x826274===SceneManager[_0xa39b8a(0x2e4)]['_item'])return![];return _0x826274[_0xa39b8a(0x109)][_0xa39b8a(0x2f3)](this[_0xa39b8a(0x32c)][_0xa39b8a(0x178)]()['trim']());},Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['isEnabled']=function(_0x3b3f64){const _0x136aae=_0x164ac2;if(!_0x3b3f64)return![];if(this[_0x136aae(0x251)]()[_0x136aae(0x2f3)](_0x3b3f64))return![];return $gameParty['numItems'](_0x3b3f64)>=this['_amount'];},Window_ItemCraftingIngredient[_0x164ac2(0x2da)]['selectedIngredientList']=function(){const _0x216e43=_0x164ac2,_0x5133c1=[],_0x5d5027=DataManager['getCraftingIngredients'](SceneManager['_scene'][_0x216e43(0x1dd)]);for(const _0x18dac8 of _0x5d5027){if(!_0x18dac8)continue;const _0x4fb6b9=_0x18dac8[0x0];(DataManager[_0x216e43(0x2c0)](_0x4fb6b9)||DataManager[_0x216e43(0x240)](_0x4fb6b9)||DataManager[_0x216e43(0x2ca)](_0x4fb6b9))&&_0x5133c1[_0x216e43(0x16b)](_0x4fb6b9);}return _0x5133c1[_0x216e43(0x17a)](SceneManager[_0x216e43(0x2e4)]['_ingredientsList']);},Window_ItemCraftingIngredient[_0x164ac2(0x2da)][_0x164ac2(0x12e)]=function(_0x47e56f,_0x2d55e6,_0x193212,_0x41928d){const _0x3c2bbb=_0x164ac2;_0x47e56f&&this[_0x3c2bbb(0x251)]()[_0x3c2bbb(0x2f3)](_0x47e56f)&&(this['_alreadySelected']=!![]),Window_ItemList['prototype'][_0x3c2bbb(0x12e)][_0x3c2bbb(0x24d)](this,_0x47e56f,_0x2d55e6,_0x193212,_0x41928d),this[_0x3c2bbb(0x26d)]=![];},Window_ItemCraftingIngredient[_0x164ac2(0x2da)][_0x164ac2(0x239)]=function(_0x5679b9,_0x2acb39,_0xa7f6bc,_0x2a047e,_0x395809){const _0x4712e3=_0x164ac2;if(this[_0x4712e3(0x26d)]){const _0x5a332b=VisuMZ['ItemCraftingSys'][_0x4712e3(0x2cc)][_0x4712e3(0x194)];this[_0x4712e3(0x161)][_0x4712e3(0x135)]=ColorManager[_0x4712e3(0x1cc)](_0x5a332b[_0x4712e3(0x158)]),_0x5679b9+=_0x5a332b[_0x4712e3(0x21c)];}Window_Base[_0x4712e3(0x2da)][_0x4712e3(0x239)][_0x4712e3(0x24d)](this,_0x5679b9,_0x2acb39,_0xa7f6bc,_0x2a047e,_0x395809);},VisuMZ[_0x164ac2(0x2d2)][_0x164ac2(0x2af)]=Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x1ae)],Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x1ae)]=function(){const _0x32c3e8=_0x164ac2;this[_0x32c3e8(0x10f)](this['_item'])?this['setItemForCraftBatchContents'](this[_0x32c3e8(0x1dd)]):VisuMZ[_0x32c3e8(0x2d2)][_0x32c3e8(0x2af)][_0x32c3e8(0x24d)](this);},VisuMZ[_0x164ac2(0x2d2)]['Window_ShopStatus_setItem']=Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x2c1)],Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x2c1)]=function(_0x5ea7ac){const _0x40312=_0x164ac2;this[_0x40312(0x10f)](_0x5ea7ac)?this[_0x40312(0x270)](_0x5ea7ac):VisuMZ[_0x40312(0x2d2)][_0x40312(0x151)][_0x40312(0x24d)](this,_0x5ea7ac);},Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x10f)]=function(_0x4a0c55){const _0xe4ac73=_0x164ac2;if(!_0x4a0c55)return![];if(!SceneManager['isSceneItemCrafting']())return![];if(Imported['VisuMZ_3_ShopBatches']){if(!Window_ShopStatus[_0xe4ac73(0x105)][_0xe4ac73(0x311)])return![];}return DataManager['hasCraftBatchItems'](_0x4a0c55);},Window_ShopStatus[_0x164ac2(0x2da)][_0x164ac2(0x270)]=function(_0x446b04){const _0x421c30=_0x164ac2;this[_0x421c30(0x1dd)]=_0x446b04,this[_0x421c30(0x161)][_0x421c30(0x2de)](),this[_0x421c30(0x271)][_0x421c30(0x2de)](),this['drawCraftBatchContents'](_0x446b04);},Window_ShopStatus['prototype'][_0x164ac2(0x2ac)]=function(_0xabc182){const _0xf1c622=_0x164ac2;let _0x3d176d=this['drawShopBatchContentsTitle']();_0x3d176d=this['drawCraftBatchContentsList'](_0x3d176d,_0xabc182),this[_0xf1c622(0x233)](_0x3d176d);},Window_ShopStatus[_0x164ac2(0x2da)]['drawCraftBatchContentsList']=function(_0x13e105,_0x3a3966){const _0x4c363f=_0x164ac2,_0x1cb84e=DataManager[_0x4c363f(0x282)](_0x3a3966),_0x207383=[_0x4c363f(0x268),_0x4c363f(0x157),_0x4c363f(0x2be)];for(const _0x78595a of _0x207383){const _0x761ae6=_0x1cb84e[_0x78595a];for(const _0x37050b in _0x761ae6){const _0x314776=Number(_0x37050b),_0x35c632=_0x761ae6[_0x37050b]||0x0;let _0x9bbec1=null;if(_0x78595a==='items')_0x9bbec1=$dataItems[_0x314776];if(_0x78595a===_0x4c363f(0x157))_0x9bbec1=$dataWeapons[_0x314776];if(_0x78595a===_0x4c363f(0x2be))_0x9bbec1=$dataArmors[_0x314776];if(DataManager[_0x4c363f(0x1ab)](_0x9bbec1))continue;_0x9bbec1&&(this[_0x4c363f(0x2c8)](),this[_0x4c363f(0x1e6)](_0x13e105,_0x9bbec1,_0x35c632),_0x13e105+=this[_0x4c363f(0x114)]());}}return _0x13e105;};