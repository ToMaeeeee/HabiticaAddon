class PerformAction {
    constructor(user, specialEquipement, config, sendMessageLogs, isTest = false) {
        this.config = config;
        this.user = user;
        this.specialEquipement = specialEquipement;
        this.sendMessageLogs = sendMessageLogs;
        this.isTest = isTest;

        loggerGgsheetGas("📋 sendMessageLogs reçu: " + JSON.stringify(this.sendMessageLogs));
    }

    Damage() {
        const config = this.config;
        if (!config) throw new Error(`Action inconnue`);

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
        } else {
            const damage = rollDice(config.types.damage.dice);
            dealEstimatedDamage(damage);
            this.sendMessageLogs.push(`Succès ! Dégâts infligés : ${damage}`);
            loggerGgsheetGas("✅ Succès ajouté, damage: " + damage);
        }

        loggerGgsheetGas("📤 Avant sendMessage, logs: " + JSON.stringify(this.sendMessageLogs));
        const finalMessage = this.sendMessageLogs.join("\n");
        loggerGgsheetGas("📤 Message à envoyer: " + finalMessage);

        // ✅ Vérifier que le message n'est pas vide
        if (finalMessage.trim() === "") {
            loggerGgsheetGas("⚠️ ATTENTION: Message vide, on n'envoie rien");
            return;
        }

        sendMessage(finalMessage);
        loggerGgsheetGas("✅ sendMessage() a été appelé");
    }

    Heal() {
        const config = this.config;
        const amount = config.types.heal.amount;
        const resource = config.types.heal.resource;
        this.sendMessageLogs.push(`Récupération de ${amount} ${resource}`);
    }

    Consume() {
        const config = this.config;

        for (const [resource, amount] of Object.entries(config.types.consume)) {
            this.sendMessageLogs.push(`Consommation de ${amount} ${resource}`);
        }
    }

    Open() {

    }
}


//--------------------------------REMETTRE CELLE EN DESSOUS UNE FOIS RESOLUE--------------------------------------------------

/*
class PerformAction {
    constructor(user, specialEquipement, config, sendMessageLogs, isTest = false) { //On pourra envelver plus tard isTest, mais c'est parceq ue habtiica limite le nmobre de requetes

        //const user = getUserFromHabiticaUser(); on va donc faire du PID ici
        //const specialEquipement = loadSpecialEquipmentFromSheet();
        this.config = config;
        this.user = user;
        this.specialEquipement = specialEquipement;
        this.sendMessageLogs = sendMessageLogs;
        this.isTest = isTest

        loggerGgsheetGas("📋 sendMessageLogs reçu:", this.sendMessageLogs);
    }


    Damage() {
        const config = this.config
        if (!config) throw new Error(`Action inconnue: ${actionName}`);


        //const sendMessageLogs = [];

        const userDiceStats = new UserDiceStats(
            () => this.user,
            () => this.specialEquipement
        ).calculeTotal();

        const characteristicBonus = userDiceStats.get(config.characteristic);
        const totalRoll = rollDice(20) + characteristicBonus;

        this.sendMessageLogs.push(`Roll total: ${totalRoll} (${config.characteristic} bonus: ${characteristicBonus})`);

        loggerGgsheetGas("📝 Message ajouté, tableau contient:", this.sendMessageLogs);

        if (totalRoll < config.successThreshold) {
            this.sendMessageLogs.push(`Échec du test de ${config.characteristic}`);
        } else {
            const damage = rollDice(config.types.damage.dice);
            dealDamageBossHabitica(damage);
            this.sendMessageLogs.push(`Succès ! Dégâts infligés : ${damage}`);

        }

        loggerGgsheetGas("📤 Avant sendMessage, logs:", this.sendMessageLogs);
        loggerGgsheetGas("📤 Message à envoyer:", this.sendMessageLogs.join("\n"));

        sendMessage(this.sendMessageLogs.join("\n"));

        // 🔍 LOG 4 : Confirmer que sendMessage a été appelé
        loggerGgsheetGas("✅ sendMessage() a été appelé");
    }




    Heal() {
        config = this.config
        const amount = config.types.heal.amount;
        const resource = config.types.heal.resource;
        //EFFECTUER SOINS //healResource(resource, amount);
        sendMessageLogs.push(`Récupération de ${amount} ${resource}`);
    }

    Consume() {

        const config = this.config;

        for (const [resource, amount] of Object.entries(config.types.consume)) {
            //EFFECTUER CONSOMMATION // consumeResource(resource, amount);
            sendMessageLogs.push(`Consommation de ${amount} ${resource}`);
        }
    }


    Open() {

    }
}
*/