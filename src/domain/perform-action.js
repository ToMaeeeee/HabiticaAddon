class PerformAction {
    constructor(user, specialEquipement, config, sendMessageLogs) {

        //const user = getUserFromHabiticaUser(); on va donc faire du PID ici
        //const specialEquipement = loadSpecialEquipmentFromSheet();
        this.config = config;
        this.user = user;
        this.specialEquipement = specialEquipement;
        this.sendMessageLogs = sendMessageLogs;
    }


    Damage() {
        const config = this.config
        if (!config) throw new Error(`Action inconnue: ${actionName}`);


        const sendMessageLogs = [];

        const userDiceStats = new UserDiceStats(
            () => this.user,
            () => this.specialEquipement
        ).calculeTotal();

        const characteristicBonus = userDiceStats.get(config.characteristic);
        const totalRoll = rollDice(20) + characteristicBonus;
        this.sendMessageLogs.push(`Roll total: ${totalRoll} (${config.characteristic} bonus: ${characteristicBonus})`);

        if (totalRoll < config.successThreshold) {
            this.sendMessageLogs.push(`Échec du test de ${config.characteristic}`);
        } else {
            const damage = rollDice(config.damageDice);
            dealDamageBossHabitica(damage);
            this.sendMessageLogs.push(`Succès ! Dégâts infligés : ${damage}`);

        }

        sendMessage(this.sendMessageLogs.join("\n"));
    }




    Heal() {
        config = this.config
        const amount = config.types.heal.amount;
        const resource = config.types.heal.resource;
        //EFFECTUER SOINS //healResource(resource, amount);
        logs.push(`Récupération de ${amount} ${resource}`);
    }

    Consume() {

        const config = this.config; {
            for (const [resource, amount] of Object.entries(config.types.consume)) {
                //EFFECTUER CONSOMMATION // consumeResource(resource, amount);
                logs.push(`Consommation de ${amount} ${resource}`);
            }
        }
    }
}