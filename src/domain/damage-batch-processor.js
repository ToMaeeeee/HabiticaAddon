//ESSAI AVEC UNE CLASS POUR VOIR 22/01/2026 21h30
//--------------------------------------------------------------------------------------------------------------------
// Version avec triggers chaînés 23/01/26 21:21

class DamageProcessor {
    constructor(getUser, habiticaAPI) {
        this.getUser = getUser;
        this.habiticaAPI = habiticaAPI
        this.scriptProperties = PropertiesService.getScriptProperties();
    }

    handle(damageTarget) {
        loggerGgsheetGas("⚔️ DEBUT DamageProcessor.handle");

        const user = this.getUser();
        const strength = user.getStats().str;
        const totalClicks = this.estimateClicks(damageTarget, strength);

        loggerGgsheetGas(`📊 ${totalClicks} clics nécessaires pour ${damageTarget} dégâts`);

        const dailyId = this.createTempDaily();

        const damageData = {
            damage: damageTarget,
            totalClicks: totalClicks,
            clicksDone: 0,
            dailyId: dailyId,
            timestamp: new Date().getTime(),
            status: 'pending'
        };

        this.saveDamageData(damageData);
        const batchCount = Math.ceil(totalClicks / DAMAGE_CONFIG.CLICKS_PER_BATCH);
        loggerGgsheetGas(`📦 Processus initialisé (${batchCount} trigger(s) nécessaire(s))`);
        // Créer le premier trigger
        this.scheduleNextBatch(); //le temps est défini dans config
        loggerGgsheetGas("FIN DamageProcessor.handle (premier trigger créé)");
    }

    processNextBatch() {
        loggerGgsheetGas("🔄 DEBUT processNextBatch");
        const damageData = this.loadDamageData()
        if (!damageData) {
            loggerGgsheetGas("⚠️ Aucune donnée");
            return
        }
        const clicksDone = damageData.clicksDone
        const remainingClics = damageData.totalClicks - damageData.clicksDone
        loggerGgsheetGas(`Status: ${damageData.status}, Clics: ${clicksDone}/${damageData.totalClicks}`);


        try {
            switch (damageData.status) {
                case 'finished':
                    loggerGgsheetGas("Finalisation");
                    this.finalize(damageData);
                    return;

                case 'failed':
                    loggerGgsheetGas("❌ Échec détecté, nettoyage");
                    this.cleanupTriggers()
                    this.cleanupDaily(damageData.dailyId)
                    return
                case 'processing':
                    loggerGgsheetGas("Déjà en cours");
                    return
            }

            if (remainingClics <= DAMAGE_CONFIG.CLICKS_PER_BATCH) {
                //log
                loggerGgsheetGas(`Dernier batch: ${remainingClics} clics`);
                damageData.status = 'processing'
                this.saveDamageData(damageData)
                this.performClicks(damageData.dailyId, remainingClics)
                damageData.clicksDone = damageData.totalClicks
                damageData.status = 'finished'
                this.saveDamageData(damageData)
                //log
                loggerGgsheetGas("Dernier batch terminé");
                this.scheduleNextBatch();
                return
            }
            //log
            loggerGgsheetGas(`Batch: ${DAMAGE_CONFIG.CLICKS_PER_BATCH} clics`);
            damageData.status = 'processing'
            this.saveDamageData(damageData)
            this.performClicks(damageData.dailyId, DAMAGE_CONFIG.CLICKS_PER_BATCH)
            damageData.clicksDone = clicksDone + DAMAGE_CONFIG.CLICKS_PER_BATCH
            damageData.status = 'pending'
            this.saveDamageData(damageData)
            //log
            loggerGgsheetGas(`Batch terminé (${damageData.clicksDone}/${damageData.totalClicks})`);
            //creer le batch suivant
            this.scheduleNextBatch();
        }

        catch (error) {
            loggerGgsheetGas(`ERREUR: ${error.toString()}`);
            damageData.status = 'failed'
            this.saveDamageData(damageData)
            this.cleanupTriggers()
            this.cleanupDaily(damageData.dailyId)
            return
        }

        loggerGgsheetGas("FIN processNextBatch");

    }


    scheduleNextBatch() {
        this.cleanupTriggers()
        ScriptApp.newTrigger('processNextDamageBatchTrigger').timeBased().after(DAMAGE_CONFIG.PAUSE_BETWEEN_BATCHES).create();
    }


    performClicks(dailyId, clicks) {
        loggerGgsheetGas(`Début ${clicks} clics`);
        for (let i = 0; i < clicks; i++) {
            this.habiticaAPI.validateTaskHabitica(dailyId);
            Utilities.sleep(DAMAGE_CONFIG.PAUSE_BETWEEN_VALIDATE_UNVALIDATE)
            this.habiticaAPI.unvalidateTaskHabitica(dailyId);
            Utilities.sleep(DAMAGE_CONFIG.PAUSE_BETWEEN_CLICKS)
        }
    }

    estimateClicks(damageTarget, strength) {
        const damagePerClick = 1 + strength * 0.005;
        return Math.ceil(damageTarget / damagePerClick);
    }

    finalize(damageData) {
        loggerGgsheetGas("Finalisation des dégâts et envoie du message");
        const message = `**Dégâts infligés au boss**\n\n${damageData.damage} points de dégâts !\n\n✅ ${damageData.totalClicks} clics effectués`;
        sendMessage(message);
        loggerGgsheetGas("Message envoyé");
        this.cleanupDaily(this.loadDamageData().dailyId)
        this.cleanupTriggers();
        this.scriptProperties.deleteProperty('pendingDamage');
        loggerGgsheetGas("✅ Processus terminé");
    }

    createTempDaily() {
        const tempDaily = new Daily("temp-damage", "Dégâts temporaires", "Daily technique", 0.1);
        const damageTask = this.habiticaAPI.createNewDaily(tempDaily);
        return damageTask.id;
    }

    cleanupTriggers() {
        const triggers = ScriptApp.getProjectTriggers();
        triggers.forEach(trigger => {
            if (trigger.getHandlerFunction() === 'processNextDamageBatchTrigger') {
                ScriptApp.deleteTrigger(trigger);
            }
        });
    }

    cleanupDaily(dailyId) {
        deleteTask(dailyId);
    }


    saveDamageData(damageData) {
        this.scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));
    }

    loadDamageData() {
        const dataStr = this.scriptProperties.getProperty('pendingDamage');
        return dataStr ? JSON.parse(dataStr) : null;
    }


}

//fonction standalone qui gère l'interface entre la classe et les triggers
function processNextDamageBatchTrigger() {
    const damageProcessor = new DamageProcessor(getUserFromHabiticaUser, new HabiticaAPI());
    damageProcessor.processNextBatch()
}