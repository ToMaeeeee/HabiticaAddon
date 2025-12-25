

class ScoredEventHandler {
    constructor(data) {
        this.data = data;
        this.task = data.task;
        this.app = null //on monte l'app seulement après avoir vérifié que ce n'est pas un clic sur la daily de degats
    }


    handle() {
        loggerGgsheetGas(`🎮 ScoredEventHandler.handle - Type: ${this.task.type}, Alias: ${this.task.alias || 'N/A'}`);

        if (this.shouldIgnoreTask()) return;
        // ÉTAPE 2 : Monter l'app seulement maintenant
        this.app = mountApplication();
        loggerGgsheetGas("📱 Application montée");


        // if (this.isDuplicate()) return;
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
        //Les clics sur la temp de dégats sont gérés par shouldIgnoreTask()

    }

    shouldIgnoreTask() {
        // Ignorer temp-damage
        if (this.task.alias === "temp-damage") {
            loggerGgsheetGas("⏭️ temp-damage ignoré (tâche technique)");
            return true;

            // A noter : on peut faire quelque chose de similaire pour toutes les tâches temp si on les nommes en commençant par temp : 

        }

        // Ignorer les dailies techniques futures si besoin
        // if (this.task.type === "daily" && this.task.alias?.startsWith("temp-")) {
        //     loggerGgsheetGas("⏭️ Tâche temporaire ignorée");
        //     return true;
        // }

        return false;
    }



    // isDuplicate() {
    //     const cache = CacheService.getScriptCache();

    //     const key = [
    //         this.data.type,
    //         this.task.id,
    //         this.data.timestamp || "",
    //         this.task.value || ""
    //     ].join("|");

    //     if (cache.get(key)) {
    //         loggerGgsheetGas("⛔ Event dupliqué ignoré");
    //         return true;
    //     }

    //     cache.put(key, "1", 5); // 5 secondes
    //     return false;
    // }
}
