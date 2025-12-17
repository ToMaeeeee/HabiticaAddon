
function dealEstimatedDamage(damageTarget) {

    try {
        const API = new HabiticaAPI()
        //const habiticaUser = API.getHabiticaUser()
        //const pendingDamageInitial = getPendingDamage(habiticaUser);
        //if (pendingDamageInitial === undefined) return;
        const strength = getUserFromHabiticaUser().getStats().str
        const clicksNeeded = estimateDamageClicks(damageTarget, strength)
        loggerGgsheetGas(`⚔️ ${clicksNeeded} clics nécessaires pour ${damageTarget} dégâts`);

        const tempDaily = new Daily("temp-damage", "Dégâts temporaires", "Daily technique pour infliger des dégâts", 0.1)
        const damageTask = API.createNewDaily(tempDaily)
        const damageTaskID = damageTask.id

        for (let i = 0; i < clicksNeeded; i++) {
            API.validateTaskHabitica(damageTaskID)
            API.unvalidateTaskHabitica(damageTaskID)
            Utilities.sleep(600); // 600ms entre chaque hit
        }
        deleteTask(damageTaskID);

        // 7. Vérifier les dégâts réellement infligés
        //const pendingDamageFinal = getPendingDamage();
        //const actualDamage = pendingDamageFinal - pendingDamageInitial;
        //loggerGgsheetGas(`✅ Dégâts infligés: ${actualDamage} (cible: ${damageTarget})`);
    }
    catch (error) {
        loggerGgsheetGas(`❌ ERREUR dans dealEstimatedDamage: ${error.toString()}`);
        throw error;
    }

}

function estimateDamageClicks(damageTarget, strength) {
    const damagePerClick = 1 + strength * 0.005;
    let clicksNeeded = Math.ceil(damageTarget / damagePerClick);
    return clicksNeeded;
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



