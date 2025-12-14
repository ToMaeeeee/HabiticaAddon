function dealDamageBossHabitica(damage) {
    const API = new HabiticaAPI()
    //récupérer les pending damage. 
    const pendingDamageInitial = getPendingDamage()
    //checker s'il y a un boss en cours
    if (pendingDamageInitial === undefined) return
    const damageTaskID = createTempDamageTask()
    let updatedPendingDamage = undefined
    //récup hp mp et mana et gp
    const lifeStatsBeforeDamage = getLifeStats()
    //tant que dégats finaux - dégats intiaux ≤ damage, do
    while (updatedPendingDamage === undefined || updatedPendingDamage - pendingDamageInitial < damage) {
        //lancer le script de RAWDamage
        //DO → cliquer décliquer sur task avec Id = damageTaskID
        API.validateTaskHabitica(damageTaskID)
        updatedPendingDamage = getPendingDamage()
    };
    //remettre les stats à inital
    restorePreviousLifeStats(lifeStatsBeforeDamage)
    //detruire la task
    deleteTask(damageTaskID)
}



function createTempDamageTask() {
    const payload = {
        type: "habit",
        text: "Damage Temp",
        notes: "",
        priority: 0.1,
        //value: 30,
    }
    const params = {
        "method": "post",
        "headers": config.HEADERS,
        "contentType": "application/json",
        "payload": JSON.stringify(payload), // Rightmost button goes on top
        "muteHttpExceptions": true,
    }
    const url = config.HABITICA_BASE_URL + config.TASK_URL
    const response = UrlFetchApp.fetch(url, params)
    const responseID = JSON.parse(response.getContentText()).data._id
    //'edaf8029-89f8-47b0-a063-544cd41fda33'
    return responseID

}



function getPendingDamage() {
    const habiticaUser = new HabiticaAPI().getHabiticaUser()
    const pendingDamage = habiticaUser?.party?.quest?.progress?.up
    return pendingDamage
    //201.456468$ ou undefined s'il n'y a pas de boss
}

function getLifeStats() {
    const userBeforeDamage = new HabiticaAPI().getHabiticaUser()
    // UTILISER LA NOTATION PAR POINTS comme Mike the Monk
    const lifeStats = {
        "stats.hp": userBeforeDamage.stats.hp,
        "stats.mp": userBeforeDamage.stats.mp,
        "stats.exp": userBeforeDamage.stats.exp,
        "stats.gp": userBeforeDamage.stats.gp
    };
    return lifeStats
}

function restorePreviousLifeStats(previousLifeStats) {
    UrlFetchApp.fetch(`${config.HABITICA_BASE_URL}/user`, {
        method: "put",
        headers: config.HEADERS,
        contentType: "application/json",
        payload: JSON.stringify(previousLifeStats),
        muteHttpExceptions: false
    });
}

