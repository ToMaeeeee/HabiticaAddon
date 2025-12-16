//version de claude du 17/12
function doPost(event) {
    loggerGgsheetGas("🎯 === WEBHOOK REÇU ===");

    try {
        const data = JSON.parse(event.postData.contents);
        loggerGgsheetGas(`📦 Type: ${data.type} | Task: ${data.task?.alias || 'N/A'}`);

        // ⚡ RÉPONSE IMMÉDIATE à Habitica (< 1 seconde)
        const response = HtmlService.createHtmlOutput("OK");

        // 🔄 Traitement APRÈS avoir répondu
        if (data.type === "scored") {
            // Lance le traitement en arrière-plan
            processWebhookAsync(data);
        }

        loggerGgsheetGas("✅ Réponse envoyée à Habitica");
        return response;

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR parsing webhook: " + e.toString());
        // Même en cas d'erreur, on répond pour éviter les retries
        return HtmlService.createHtmlOutput("ERROR");
    }
}


// 🔄 Traitement asynchrone (après avoir répondu)
function processWebhookAsync(data) {
    try {
        loggerGgsheetGas("🔄 Début traitement asynchrone");

        if (data.task.type === "reward") {
            handleScoredReward(data);
        }
        if (data.task.type === "todo") {
            handleScoredToDo(data);
        }

        loggerGgsheetGas("✅ Traitement asynchrone terminé");

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR traitement async: " + e.toString());
        loggerGgsheetGas("📋 Stack: " + e.stack);
    }
}


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

function handleScoredEvent(data) {
    loggerGgsheetGas("🎮 handleScoredEvent appelée");

    if (data.task.type === "reward") {
        loggerGgsheetGas("🎁 Type: reward");
        handleScoredReward(data)
    }
    if (data.task.type === "todo") {
        loggerGgsheetGas("✓ Type: todo");
        handleScoredToDo(data)
    }
}

function handleScoredReward(data) {
    loggerGgsheetGas("💰 handleScoredReward - début");

    try {
        const app = mountApplication()
        loggerGgsheetGas("📱 Application montée");

        const dispatcher = new BuyableDispatcher(app)
        loggerGgsheetGas("🔀 Dispatcher créé");

        dispatcher.dispatch(data)
        loggerGgsheetGas("✅ Action dispatchée");

        app.updateDiceStatsPopUp.handle()
        loggerGgsheetGas("✅ DiceStats mis à jour");

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR dans handleScoredReward: " + e.toString());
        loggerGgsheetGas("📋 Stack: " + e.stack);
        throw e;
    }
}

function handleScoredToDo(data) {
    //Ici on peut mettre ce que l'on souhaite faire en cas de "todo"
}



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