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













//Plus besoin normalement de ce qu'il y a en dessous car c'est fait maintenant avec la class ScoredEventHandler dans scored-event-handler.js

//ma version antérieure (qui fonctionnait bien jusqu'à ce qu'on fasse les multiples appels sur caillou)
/* function doPost(event) {
    loggerGgsheetGas("🎯 === WEBHOOK REÇU ===");

    try {
        const data = JSON.parse(event.postData.contents);

        loggerGgsheetGas("📦 Type d'événement: " + data.type);

        if (data.type === "scored") {
            handleScoredEvent(data);
        }

        loggerGgsheetGas("✅ Webhook traité avec succès");
        return HtmlService.createHtmlOutput();

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR dans doPost: " + e.toString());
        loggerGgsheetGas("📋 Stack trace: " + e.stack);
        return HtmlService.createHtmlOutput();
    }
}

*/



/*
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
    // 🎯 Utilise le dispatcher pour router vers la bonne action
    const dispatcher = new BuyableDispatcher(app)
    dispatcher.dispatch(data)
    app.updateDiceStatsPopUp.handle()
}

function handleScoredToDo(data) {
    //Ici on peut mettre ce que l'on souhaite faire en cas de "todo"
}

*/