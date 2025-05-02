/*:
 * @plugindesc v1.1 [Test] Variable Damage Boost (0-99) - ALL (No Params)
 * @author Your Name / AI Assistant
 * @target MZ
 * @help VariableDamageBoost_All_Test.js
 *
 * Increases HP damage dealt BY ACTORS AND ENEMIES based on the
 * last two digits (00-99) of Game Variable 1.
 * Formula: Base * (100 + (Variable#1 % 100)) / 100
 * This plugin has NO parameters for testing purposes.
 * It only affects skills/items with Damage Type: HP Damage.
 *
 */

(() => {
    const pluginName = "VariableDamageBoost_All_Test";
    const variableId = 1; // HARDCODED: The ID of the game variable to use.

    console.log(`[${pluginName}] Initialized. Boosting Actor/Enemy HP Damage based on Variable ID ${variableId} % 100.`);

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
            return value;
        }

        // 5. Don't modify if base damage is zero or less
        if (value <= 0) {
            return value;
        }

        // --- Calculate and Apply Multiplier from Variable ---
        const counterValue = $gameVariables.value(variableId) || 0;

        // *** CHANGE: Use modulo 100 instead of 60 ***
        let boostPercent = counterValue % 100;

        // Ensure boostPercent is non-negative (JS % can return negative with negative inputs)
        // Although game variables are usually positive, this is safer.
        if (boostPercent < 0) {
            boostPercent += 100;
        }
        // Clamp minimum just in case (shouldn't be needed if % 100 handled negative correctly above)
        if (boostPercent < 0) boostPercent = 0;
        // Clamp maximum just in case (though % 100 should already handle this)
        if (boostPercent > 99) boostPercent = 99;


        // *** CHANGE: Use boostPercent (0-99) in the multiplier calculation ***
        const multiplier = (100 + boostPercent) / 100.0;
        const originalValue = value; // Store original for logging

        // Only apply if multiplier actually changes the value
        if (multiplier === 1.0) {
            return value; // No boost if boostPercent is 0
        }

        value = Math.round(value * multiplier);

        // --- Debugging Log (Updated) ---
        const userType = subject.isActor() ? "Actor" : (subject.isEnemy() ? "Enemy" : "Unknown");
        console.log(
            `[${pluginName}] ${userType} Boost: ${subject.name()} | Var${variableId}:${counterValue} (Boost:${boostPercent}%) | ` + // Show boost %
            `Action: ${item.name} | ` +
            `Original Val: ${originalValue} | Multiplier: ${multiplier.toFixed(2)} | Modified Val: ${value}`
        );

        return value;
    };

    console.log(`[${pluginName}] Game_Action.makeDamageValue aliased successfully.`);

})();