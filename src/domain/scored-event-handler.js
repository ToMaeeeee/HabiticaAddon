

class ScoredEventHandler {
    constructor(data) {
        this.data = data;
        this.task = data.task;
        this.app = mountApplication();
        loggerGgsheetGas("📱 Application montée");
    }


    handle() {
        loggerGgsheetGas("🎮 ScoredEventHandler.handle");
        if (this.isDuplicate()) return;
        switch (this.task.type) {
            case "reward":
                this.handleReward();
                break;
            case "habit":
                this.handleHabit();
                break;
            case "todo":
                this.handleTodo();
                break;
            case "daily":
                this.handleDaily();
                break;
            default:
                loggerGgsheetGas("⏭️ Type ignoré: " + this.task.type);
        }
    }


    handleReward() {
        loggerGgsheetGas("💰 handleReward");
        const alias = this.task.alias;
        if (!alias) return;
        if (alias.startsWith("item-")) {
            this.handleItemReward();
            return;
        }
        this.handleNonItemReward();
    }

    handleItemReward() {
        loggerGgsheetGas("📦 Dispatch item reward");
        const dispatcher = new BuyableDispatcher(this.app);
        dispatcher.dispatch(this.data);
    }

    handleNonItemReward() {
        this.app.updateDiceStatsPopUp.handle();
        loggerGgsheetGas("✅ DiceStats mis à jour");
    }


    handleHabit() {
        // futur
    }

    handleTodo() {
        // futur
    }

    handleDaily() {
        // ATTTENTION : PENSER AU CAS OU CE SONT DES CLICS SUR LA DAILY DE DEGATS !!!
        //IL FAUDRA LES IGNORER !!!!
        if (this.task.alias === "temp-damage") loggerGgsheetGas("clic sur Temp damage");
    }



    isDuplicate() {
        const cache = CacheService.getScriptCache();

        const key = [
            this.data.type,
            this.task.id,
            this.data.timestamp || "",
            this.task.value || ""
        ].join("|");

        if (cache.get(key)) {
            loggerGgsheetGas("⛔ Event dupliqué ignoré");
            return true;
        }

        cache.put(key, "1", 5); // 5 secondes
        return false;
    }
}
