//EN UTILISANT LA CLASS DEFINE DANS LE DOMAIN

function dealEstimatedDamage(damageTarget) {
    const processor = new DamageProcessor(getUserFromHabiticaUser, new HabiticaAPI())
    processor.handle(damageTarget);
}

function processAsyncDamage() {
    const processor = new DamageProcessor(
        getUserFromHabiticaUser,
        new HabiticaAPI()
    );
    processor.processAsync();
}




//ESSAI EN ASYNCHRONE pour voir
//--------------------------------------------------------------------------------------------------------------------
//  EN DESSOUS LA VERSION ASYNCHRONE INITIALE DU 22/01/2026 16h48
//--------------------------------------------------------------------------------------------------------------------
/*
function dealEstimatedDamage(damageTarget) {
    loggerGgsheetGas("⚔️ DEBUT dealEstimatedDamage");

    try {
        const scriptProperties = PropertiesService.getScriptProperties();

        const damageData = {
            damage: damageTarget,
            timestamp: new Date().getTime(),
            status: 'pending'
        };

        scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));
        loggerGgsheetGas(`📦 Dégâts de ${damageTarget} mis en file d'attente`);

        //trigger
        ScriptApp.newTrigger('processAsyncDamage')
            .timeBased()
            .after(5000) // 5 secondes
            .create();
        loggerGgsheetGas("⏰ Trigger créé pour traiter les dégâts");

    } catch (error) {
        loggerGgsheetGas(`❌ ERREUR dans dealEstimatedDamage: ${error.toString()}`);
        throw error;
    }

    loggerGgsheetGas("⚔️ FIN dealEstimatedDamage (délégué)");
}


function processAsyncDamage() {
    loggerGgsheetGas("🔄 === DÉBUT processAsynchDamage ===");
    const scriptProperties = PropertiesService.getScriptProperties();
    const damageDataStr = scriptProperties.getProperty('pendingDamage');

    if (!damageDataStr) return; //aucun dégats en attente

    const damageData = JSON.parse(damageDataStr);
    if (damageData.status !== 'pending') return;

    loggerGgsheetGas(`⚔️ Traitement de ${damageData.damage} dégâts...`);


    let damageTaskID = null;


    try {
        damageData.status = 'processing'
        const API = new HabiticaAPI()
        const strength = getUserFromHabiticaUser().getStats().str
        const clicksNeeded = estimateDamageClicks(damageData.damage, strength)
        loggerGgsheetGas(`⚔️ ${clicksNeeded} clics nécessaires pour ${damageData.damage} dégâts`);

        const tempDaily = new Daily("temp-damage", "Dégâts temporaires", "Daily technique", 0.1);
        const damageTask = API.createNewDaily(tempDaily);
        const damageTaskID = damageTask.id;

        loggerGgsheetGas(`📝 Daily créée: ${damageTaskID}`);
        Utilities.sleep(800);

        //utilisation de la fonction avec rate limiting
        performClicksWithRateLimiting(API, damageTaskID, clicksNeeded);

        loggerGgsheetGas("✅ Tous les clics effectués");
        Utilities.sleep(800);
        deleteTask(damageTaskID);
        loggerGgsheetGas("🗑️ Daily temporaire supprimée");

        const message = `**Dégâts infligés au boss** ${damageData.damage} points de dégâts !`;
        sendMessage(message);
        loggerGgsheetGas("📨 Message de confirmation envoyé");

        // Marquer comme "terminé"
        damageData.status = 'completed';
        scriptProperties.setProperty('pendingDamage', JSON.stringify(damageData));
    }


    catch (error) {
        loggerGgsheetGas(`❌ ERREUR: ${error.toString()}`)
        loggerGgsheetGas(`📋 Stack: ${error.stack}`);
    };

    deleteOldTriggers('processAsyncDamage');
    loggerGgsheetGas("🔄 === FIN processAsyncDamage ===");
}



function performClicksWithRateLimiting(API, taskID, totalClicks) {
    const batchSize = RATE_LIMIT_CONFIG.REQUESTS_PER_BATCH / 2; // Divisé par 2 car 1 clic = up + down
    const totalBatches = Math.ceil(totalClicks / batchSize);
    loggerGgsheetGas(`📊 ${totalBatches} batch(s) de ${batchSize} clics chacun`);
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batchStart = batchIndex * batchSize;
        const batchEnd = Math.min((batchIndex + 1) * batchSize, totalClicks);
        const clicksInBatch = batchEnd - batchStart;

        loggerGgsheetGas(`📦 Batch ${batchIndex + 1}/${totalBatches} : ${clicksInBatch} clics`);

        // Effectuer les clics du batch
        for (let i = 0; i < clicksInBatch; i++) {
            API.validateTaskHabitica(taskID);
            API.unvalidateTaskHabitica(taskID);
            Utilities.sleep(400); // 400ms entre chaque paire
        }

        loggerGgsheetGas(`  ✅ Batch ${batchIndex + 1} terminé (${batchEnd}/${totalClicks} total)`);

        // Pause ENTRE les batches (sauf après le dernier)
        if (batchIndex < totalBatches - 1) {
            loggerGgsheetGas(`  ⏸️ Pause de ${RATE_LIMIT_CONFIG.PAUSE_BETWEEN_BATCHES}ms avant le prochain batch...`);
            Utilities.sleep(RATE_LIMIT_CONFIG.PAUSE_BETWEEN_BATCHES);
        }
    }
}

function estimateDamageClicks(damageTarget, strength) {
    const damagePerClick = 1 + strength * 0.005;
    let clicksNeeded = Math.ceil(damageTarget / damagePerClick);
    return clicksNeeded;
}




function deleteOldTriggers(functionName) {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
        if (trigger.getHandlerFunction() === functionName) {
            ScriptApp.deleteTrigger(trigger);
        }
    });
}



*/


//--------------------------------------------------------------------------------------------------------------------
//  EN DESSOUS LA VERSION NON ASYNCHRONE DU 22/01/2026 15H11
//--------------------------------------------------------------------------------------------------------------------




/*
function dealEstimatedDamage(damageTarget) {
    loggerGgsheetGas("⚔️ DEBUT dealEstimatedDamage");
    let damageTaskID = null; // On stocke l'ID ici pour le cleanup

    try {
        const API = new HabiticaAPI()
        const strength = getUserFromHabiticaUser().getStats().str
        const clicksNeeded = estimateDamageClicks(damageTarget, strength)
        loggerGgsheetGas(`⚔️ ${clicksNeeded} clics nécessaires pour ${damageTarget} dégâts`);

        const tempDaily = new Daily("temp-damage", "Dégâts temporaires", "Daily technique pour infliger des dégâts", 0.1)
        const damageTask = API.createNewDaily(tempDaily)

        damageTaskID = damageTask.id
        //atteindre que la tâche soit bien créee
        Utilities.sleep(800);

        for (let i = 0; i < clicksNeeded; i++) {
            API.validateTaskHabitica(damageTaskID)
            API.unvalidateTaskHabitica(damageTaskID)
            Utilities.sleep(400); // 600ms entre chaque hit → Avant c'était 600ms, on est passés à 50ms, mais claude me l'a remis à 600ms
        }

        loggerGgsheetGas("✅ Tous les clics effectués");
        Utilities.sleep(800);

        deleteTask(damageTaskID);
        loggerGgsheetGas("🗑️ Daily temporaire supprimée");

        // Si nécessaire : Vérifier les dégâts réellement infligés
        //const pendingDamageFinal = getPendingDamage();
        //const actualDamage = pendingDamageFinal - pendingDamageInitial;
        //loggerGgsheetGas(`✅ Dégâts infligés: ${actualDamage} (cible: ${damageTarget})`);
    }
    catch (error) {
        loggerGgsheetGas(`❌ ERREUR dans dealEstimatedDamage: ${error.toString()}`);
        throw error;
    }

    loggerGgsheetGas("⚔️ FIN dealEstimatedDamage");

}

function estimateDamageClicks(damageTarget, strength) {
    const damagePerClick = 1 + strength * 0.005;
    let clicksNeeded = Math.ceil(damageTarget / damagePerClick);
    return clicksNeeded;
}

function processAsynchDamage() {
    loggerGgsheetGas("🔄 === DÉBUT processPendingDamage ===");
    const scriptProperties = PropertiesService.getScriptProperties();
    const damageDataStr = scriptProperties.getProperty('pendingDamage');

    if (!damageDataStr) return; //aucun dégats en attente

    const damageData = JSON.parse(damageDataStr);

    try {

    }





}

function getPendingDamage(habiticaUser) {
    // Si on a déjà les données, on les utilise
    if (habiticaUser) {
        return habiticaUser?.party?.quest?.progress?.up;
    }

    // Sinon, on fait l'appel API (rétrocompatibilité)
    const userData = new HabiticaAPI().getHabiticaUser();
    return userData?.party?.quest?.progress?.up;
}
*/

