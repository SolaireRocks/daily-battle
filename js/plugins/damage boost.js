/*:
 * @plugindesc v1.0 [Test] Variable Damage Boost - ALL (No Params)
 * @author Your Name / AI Assistant
 * @target MZ
 * @help VariableDamageBoost_All_Test.js
 *
 * Increases HP damage dealt BY ACTORS AND ENEMIES based on the
 * "seconds" portion of Game Variable 1.
 * Formula: Base * (100 + (Variable#1 % 60)) / 100
 * This plugin has NO parameters for testing purposes.
 * It only affects skills/items with Damage Type: HP Damage.
 *
 */

(() => {
    const pluginName = "VariableDamageBoost_All_Test";
    const variableId = 1; // HARDCODED: The ID of the game variable to use.

    console.log(`[${pluginName}] Initialized. Boosting Actor/Enemy HP Damage based on Variable ID: ${variableId}`);

    // --- Alias makeDamageValue ---
    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        // --- Get Base Value ---
        let value = _Game_Action_makeDamageValue.call(this, target, critical);

        // --- Apply Boost Only Under Specific Conditions ---

        // 1. Only in battle
        if (!$gameParty.inBattle()) {
            return value;
        }

        // 2. Subject (user) must exist
        const subject = this.subject();
        if (!subject) {
            return value;
        }

        // 3. Action must have an item/skill associated
        const item = this.item();
        if (!item) {
            return value;
        }

        // 4. Action must be HP Damage type (Type 1 in editor)
        if (item.damage.type !== 1) {
            // If you wanted this to ALSO apply to HP Healing (Type 3), change this line to:
            // if (item.damage.type !== 1 && item.damage.type !== 3) { return value; }
            // If you wanted to include MP Damage (Type 2) AND MP Healing (Type 4/Effect),
            // you'd need more complex checks like in the original plugin.
            // For now, we stick to HP Damage only as requested.
            return value;
        }

        // 5. Don't modify if base damage is zero or less
        if (value <= 0) {
            return value;
        }

        // --- Calculate and Apply Multiplier from Variable ---
        const counterValue = $gameVariables.value(variableId) || 0;
        let secondsPart = counterValue % 60;
        // Ensure secondsPart is non-negative (JS % can return negative)
        if (secondsPart < 0) {
            secondsPart += 60;
        }

        // Avoid division by zero or nonsensical multipliers if secondsPart is huge somehow
        if (secondsPart < 0) secondsPart = 0; // Clamp minimum

        const multiplier = (100 + secondsPart) / 100.0;
        const originalValue = value; // Store original for logging

        // Only apply if multiplier actually changes the value
        if (multiplier === 1.0) {
            return value;
        }

        value = Math.round(value * multiplier);

        // --- Debugging Log ---
        const userType = subject.isActor() ? "Actor" : (subject.isEnemy() ? "Enemy" : "Unknown");
        console.log(
            `[${pluginName}] ${userType} Boost: ${subject.name()} | Var${variableId}:${counterValue} (Sec:${secondsPart}) | ` +
            `Action: ${item.name} | ` +
            `Original Val: ${originalValue} | Multiplier: ${multiplier.toFixed(2)} | Modified Val: ${value}`
        );

        return value;
    };

    console.log(`[${pluginName}] Game_Action.makeDamageValue aliased successfully.`);

})();