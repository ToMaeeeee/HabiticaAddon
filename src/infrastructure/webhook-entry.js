//version de claude du 17/12
function doPost(event) {
    loggerGgsheetGas("🎯 === WEBHOOK REÇU ===");
    try {
        const data = JSON.parse(event.postData.contents);

        if (data.type === "scored") {
            new ScoredEventHandler(data).handle();
        }
        return HtmlService.createHtmlOutput("OK");

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR dans doPost: " + e.toString());
        loggerGgsheetGas("📋 Stack: " + e.stack);
        return HtmlService.createHtmlOutput("ERROR");
    }
}