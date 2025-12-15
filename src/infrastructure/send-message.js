// Cette fonction envoie un message privé à soi-même sur Habitica
// rajouté un try et catch pour la faire fonctionner. 
//ATTENTION ELLE N'ENVOIE PAS UN TABLEAU MAIS UN MESSAGE, D'OU L'INTÉRÊT DU FORMATTAGE
function sendMessage(texte) {
    const payload = {
        message: texte,
        toUserId: config.USER_ID
    };

    const options = {
        method: "post",
        headers: config.HEADERS,
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };
    try {
        const response = UrlFetchApp.fetch("https://habitica.com/api/v3/members/send-private-message", options);
        const resultTry = JSON.parse(response.getContentText());
        if (resultTry.success) {
            Logger.log("✅ Message envoyé avec succès !");
        } else {
            Logger.log("❌ Échec envoi message : " + JSON.stringify(resultTry));
        }
    }

    catch (error) {
        Logger.log("❌ Erreur envoi message : " + error.toString())
    }

}