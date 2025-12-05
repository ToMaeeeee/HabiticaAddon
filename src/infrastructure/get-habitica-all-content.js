function getHabiticaAllContent() { //FONCTION UTILE POUR GET PLAYER GEAR
    const response = UrlFetchApp.fetch(`${config.HABITICA_BASE_URL}/${config.CONTENT_URL}`, {
        method: "get",
        headers: config.HEADERS,
        muteHttpExceptions: true
    });
    const result = JSON.parse(response.getContentText());
    return result.data
}

