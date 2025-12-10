
function doPost(event) {
    // // Logger.log("=== WEBHOOK REÇU ===");
    try {
        const data = JSON.parse(event.postData.contents);
        if (data.type === "scored") {
            handleScoredEvent(data);
        }
        return HtmlService.createHtmlOutput();
    } catch (e) {
        loggerGgsheetGas(e);
        return HtmlService.createHtmlOutput();
    }
}


function handleScoredEvent(data) {
    if (data.task.type === "reward") {
        handleScoredReward(data)
    }
    if (data.task.type === "todo") {
        handleScoredToDo(data)
    }

}


function handleScoredReward(data) {
    const app = mountApplication()
    app.updateDiceStatsPopUp.handle()
}

function handleScoredToDo(data) {
    //Ici on peut mettre ce que l'on souhaite faire en cas de "todo"
}