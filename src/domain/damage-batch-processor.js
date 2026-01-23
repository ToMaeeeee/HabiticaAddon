//ESSAI AVEC UNE CLASS POUR VOIR 22/01/2026 21h30
//--------------------------------------------------------------------------------------------------------------------
class DamageProcessor {
    constructor(getUser, habiticaAPI) {
        this.getUser = getUser;
        this.habiticaAPI = habiticaAPI
    }

    handle(damageTarget) {
        loggerGgsheetGas("⚔️ DEBUT DamageProcessor.handle");

        const scriptProperties = PropertiesService.getScriptProperties();

        const damageData = {
            damage: damageTarget,
            timestamp: new Date().getTime(),
            status: 'pending'
        };

        scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));
        loggerGgsheetGas(`📦 Dégâts de ${damageTarget} mis en file d'attente`);

        // Créer le trigger
        ScriptApp.newTrigger('processAsyncDamage')
            .timeBased()
            .after(5000) // 5 secondes
            .create();

        loggerGgsheetGas("⏰ Trigger créé pour traiter les dégâts");
        loggerGgsheetGas("⚔️ FIN DamageProcessor.handle (délégué)");
    }

    //--------------------------------------------------------------------------------------------------------------------

    processAsync() {
        loggerGgsheetGas("🔄 === DÉBUT processAsync ===");
        const scriptProperties = PropertiesService.getScriptProperties();
        const damageDataStr = scriptProperties.getProperty('pendingDamage');

        if (!damageDataStr) {
            loggerGgsheetGas("⚠️ Aucun dégât en attente");
            return;
        }

        const damageData = JSON.parse(damageDataStr);

        if (damageData.status !== 'pending') {
            loggerGgsheetGas(`⏭️ Dégâts déjà traités (status: ${damageData.status})`);
            return;
        }

        loggerGgsheetGas(`⚔️ Traitement de ${damageData.damage} dégâts...`);

        let damageTaskID = null;

        try {
            // Marquer comme "en cours"
            damageData.status = 'processing';
            scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));

            // Créer la daily temporaire
            damageTaskID = this.createTempDaily();

            // Calculer les clics nécessaires
            const user = this.getUser();
            const strength = user.getStats().str;
            const totalClicks = this.estimateClicks(damageData.damage, strength);

            loggerGgsheetGas(`⚔️ ${totalClicks} clics nécessaires pour ${damageData.damage} dégâts`);

            // 🔥 Effectuer les clics avec des pauses longues
            this.performClicks(damageTaskID, totalClicks);

            loggerGgsheetGas("✅ Tous les clics effectués");
            Utilities.sleep(800);

            // Supprimer la daily
            deleteTask(damageTaskID);
            loggerGgsheetGas("🗑️ Daily temporaire supprimée");

            // Envoyer le message
            const message = `⚔️ **Dégâts infligés au boss**\n\n${damageData.damage} points de dégâts !`;
            sendMessage(message);
            loggerGgsheetGas("📨 Message de confirmation envoyé");

            // Marquer comme terminé
            damageData.status = 'completed';
            scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));

        } catch (error) {
            loggerGgsheetGas(`❌ ERREUR: ${error.toString()}`);
            loggerGgsheetGas(`📋 Stack: ${error.stack}`);

            // Marquer comme failed
            damageData.status = 'failed';
            damageData.error = error.toString();
            scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));

            // Nettoyer la daily si elle existe
            if (damageTaskID) {
                try {
                    deleteTask(damageTaskID);
                    loggerGgsheetGas("🗑️ Daily nettoyée après erreur");
                } catch (cleanupError) {
                    loggerGgsheetGas(`⚠️ Impossible de nettoyer: ${cleanupError.toString()}`);
                }
            }

        } finally {
            this.cleanupTriggers();
        }

        loggerGgsheetGas("🔄 === FIN processAsync ===");
    }


    performClicks(taskID, totalClicks) {
        const batchSize = DAMAGE_CONFIG.CLICKS_PER_BATCH;
        const totalBatches = Math.ceil(totalClicks / batchSize);

        loggerGgsheetGas(`📊 ${totalBatches} batch(s) de ${batchSize} clics chacun`);

        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
            const batchStart = batchIndex * batchSize;
            const batchEnd = Math.min((batchIndex + 1) * batchSize, totalClicks);
            const clicksInBatch = batchEnd - batchStart;

            loggerGgsheetGas(`📦 Batch ${batchIndex + 1}/${totalBatches} : ${clicksInBatch} clics`);

            // Effectuer les clics du batch
            for (let i = 0; i < clicksInBatch; i++) {
                this.habiticaAPI.validateTaskHabitica(taskID);
                this.habiticaAPI.unvalidateTaskHabitica(taskID);
                Utilities.sleep(DAMAGE_CONFIG.PAUSE_BETWEEN_CLICKS);
            }

            loggerGgsheetGas(`  ✅ Batch ${batchIndex + 1} terminé (${batchEnd}/${totalClicks} total)`);

            // 🔥 PAUSE LONGUE entre les batches (sauf après le dernier)
            if (batchIndex < totalBatches - 1) {
                loggerGgsheetGas(`  ⏸️ Pause de ${DAMAGE_CONFIG.PAUSE_BETWEEN_BATCHES}ms...`);
                Utilities.sleep(DAMAGE_CONFIG.PAUSE_BETWEEN_BATCHES);
            }
        }
    }

    estimateClicks(damageTarget, strength) {
        const damagePerClick = 1 + strength * 0.005;
        return Math.ceil(damageTarget / damagePerClick);
    }

    createTempDaily() {
        const tempDaily = new Daily("temp-damage", "Dégâts temporaires", "Daily technique", 0.1);
        const damageTask = this.habiticaAPI.createNewDaily(tempDaily);
        loggerGgsheetGas(`📝 Daily créée: ${damageTask.id}`);
        return damageTask.id;
    }


    cleanupTriggers() {
        const triggers = ScriptApp.getProjectTriggers();
        let deletedCount = 0;

        triggers.forEach(trigger => {
            if (trigger.getHandlerFunction() === 'processAsyncDamage') {
                ScriptApp.deleteTrigger(trigger);
                deletedCount++;
            }
        });

        if (deletedCount > 0) {
            loggerGgsheetGas(`🗑️ ${deletedCount} trigger(s) nettoyé(s)`);
        }

    }

}