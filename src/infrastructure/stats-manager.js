/**
 * Gestionnaire des statistiques utilisateur dans Habitica
 * Gère hp, mp, exp, gp de manière orientée objet
 */

class StatsManager {
    constructor() {
        this.habiticaAPI = new HabiticaAPI();
    }

    handle(modifications) {
        const newStats = this.applyChangements(modifications);
        this.pushNewStats(newStats);
    }


    getCurrentStats() {
        const userBeforeDamage = this.habiticaAPI.getHabiticaUser()

        return new Map([
            ["hp", userBeforeDamage.stats.hp],
            ["mp", userBeforeDamage.stats.mp],
            ["exp", userBeforeDamage.stats.exp],
            ["gp", userBeforeDamage.stats.gp]
        ]);
    }

    applyChangements(modifications) {
        const currentStats = this.getCurrentStats();
        loggerGgsheetGas("📊 Stats actuelles: " + JSON.stringify(Object.fromEntries(currentStats)));
        loggerGgsheetGas("🔄 Modifications à appliquer: " + JSON.stringify(modifications));

        Object.entries(modifications).forEach(([stat, delta]) => {
            if (currentStats.has(stat)) {
                const currentValue = currentStats.get(stat);
                const newValue = currentValue + delta;
                currentStats.set(stat, newValue);
                loggerGgsheetGas(`  ${stat}: ${currentValue} + (${delta}) = ${newValue}`);
            }

        });
        return currentStats;
    }


    mapToObject(statsMap) {
        return Object.fromEntries(statsMap);
    }

    //construit l'objet avec la notation de Mike the Monk
    buildPayload(statsToUpdate) {
        return Object.fromEntries(
            Object.entries(statsToUpdate).map(([key, value]) => [`stats.${key}`, value])
        );
    }

    pushNewStats(newStatsMap) {
        const statsObject = this.mapToObject(newStatsMap);
        const payload = this.buildPayload(statsObject);

        UrlFetchApp.fetch(`${config.HABITICA_BASE_URL}/user`, {
            method: "put",
            headers: config.HEADERS,
            contentType: "application/json",
            payload: JSON.stringify(payload),
            muteHttpExceptions: false
        });
    }



}