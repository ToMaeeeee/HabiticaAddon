class PerformAction {
    constructor(user, specialEquipement, config, sendMessageLogs, isTest = false) {
        this.config = config;
        this.user = user;
        this.specialEquipement = specialEquipement;
        this.sendMessageLogs = sendMessageLogs;
        this.isTest = isTest;
        this.statsManager = new StatsManager();
        this.modifications = this.config.types?.stats ?? null; //important de gérer le cas où vide pour damage par exemple

        loggerGgsheetGas("📋 sendMessageLogs reçu: " + JSON.stringify(this.sendMessageLogs));
    }

    damage() {
        loggerGgsheetGas("🎯 DEBUT damage()");
        const config = this.config;
        const diceTest = config.successThreshold
        if (!config) throw new Error(`Action inconnue`);
        //Echec du test de touche : on return (sans consommer de ressources)
        if (diceTest !== 0 && !this.diceSuccess()) return
        loggerGgsheetGas("✅ Test de touche réussi, calcul des dégâts...");
        // Vérifier qu'assez de ressources
        if (this.modifications) {
            if (!this.hasEnoughResources(this.modifications)) return;
            this.statsManager.handle(this.modifications);
        }

        //Effectuer dégats
        const damage = rollDice(config.types.damage.dice);

        loggerGgsheetGas(`🎲 Dégâts calculés: ${damage}`);
        loggerGgsheetGas("⚔️ AVANT dealEstimatedDamage");

        dealEstimatedDamage(damage);
        loggerGgsheetGas("⚔️ APRÈS dealEstimatedDamage");
        this.sendMessageLogs.push(`Succès ! Dégâts infligés : ${damage}`);
        loggerGgsheetGas("✅ Succès ajouté, damage: " + damage);


        loggerGgsheetGas("📤 AVANT formatage message final");
        const finalMessage = this.sendMessageLogs.join("\n");
        loggerGgsheetGas("📤 Message formaté: " + finalMessage);

        // ✅ Vérifier que le message n'est pas vide
        if (finalMessage.trim() === "") {
            loggerGgsheetGas("⚠️ ATTENTION: Message vide, on n'envoie rien");
            return;
        }
        loggerGgsheetGas("📨 AVANT sendMessage");
        sendMessage(finalMessage);
        loggerGgsheetGas("✅ sendMessage() a été appelé");
    }

    modifyStats() {
        const config = this.config;
        const diceTest = config.successThreshold
        if (!this.modifications) return; //normalement toujours une modification pour modifyStats, mais si jamais...
        if (diceTest !== 0 && !this.diceSuccess()) return

        loggerGgsheetGas("💊 ModifyStats avec: " + JSON.stringify(this.modifications));

        if (!this.hasEnoughResources(this.modifications)) return;
        this.statsManager.handle(this.modifications);
    }


    hasEnoughResources(statsModifications) {
        const currentStats = this.statsManager.getCurrentStats();
        for (const [stat, amount] of Object.entries(statsModifications)) {
            if (amount > 0) continue
            if (stat === "hp") continue
            if (currentStats.get(stat) + amount < 0) {
                loggerGgsheetGas(`❌ ${stat} insuffisant: ${currentStats.get(stat)} + (${amount}) < 0`);
                return false;
            }
        }
        return true
    }

    diceSuccess() {
        const config = this.config;
        const userDiceStats = new UserDiceStats(
            () => this.user,
            () => this.specialEquipement
        ).calculeTotal();

        const characteristicBonus = userDiceStats.get(config.characteristic);
        const totalRoll = rollDice(20) + characteristicBonus;

        // ✅ Ajout avec log de vérification
        this.sendMessageLogs.push(`Roll total: ${totalRoll} (${config.characteristic} bonus: ${characteristicBonus})`);
        loggerGgsheetGas("📝 Après 1er push: " + JSON.stringify(this.sendMessageLogs));

        if (totalRoll < config.successThreshold) {
            this.sendMessageLogs.push(`Échec du test de ${config.characteristic}`);
            loggerGgsheetGas("❌ Échec ajouté");
            return false
        }

        return true

    }


    Open() {
        const config = this.config;
        const diceTest = config.successThreshold
        if (diceTest !== 0 && !this.diceSuccess()) return
        const mapdescoffres = {
            "SS": { "10": "faire ça", "20": "faire çou", "30": "faire ci" },
            "S": { "10": "faire cela", "20": "faire cela", "30": "faire cela" },
            "A": { "10": "faire cela", "20": "faire cela", "30": "faire cela" }
        }

        loggerGgsheetGas("🔓 Ouverture de coffre réussie, ");
        const indexRecompense = rollDice(100);

        mapdescoffres.get(config).forEach((key, value) => {
            const keyNumber = parseInt(key, 10);
            if (indexRecompense <= keyNumber) return
            return value;


        })



    }
}






