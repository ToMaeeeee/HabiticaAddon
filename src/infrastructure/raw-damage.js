//RECUPERE DE GAS, POUR L'INSTANT PAS D'UTILITE

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