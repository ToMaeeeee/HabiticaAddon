//------------------------VERSION DE CLAUDE--------------------------------------------------------------------------
const habiticaApi = new HabiticaAPI()

function removeOldShop() {
    const rewards = getAllRewards()
    const shopItems = rewards.filter(t => t.alias && t.alias.startsWith("item-"))
    shopItems.forEach(k => deleteTask(k._id))
    console.log("old shop removed")
}

function deleteTask(taskId) {
    const url = `${config.HABITICA_BASE_URL}/tasks/${taskId}`;

    const response = UrlFetchApp.fetch(url, {
        method: "delete",
        headers: config.HEADERS,
        muteHttpExceptions: true
    });

    return JSON.parse(response.getContentText());
}

function publishNewShopOnHabitica(items) {
    removeOldShop()
    items.forEach(k => {
        habiticaApi.createNewItemsShop(k)
    })
    reorderShopHabitica()
}

function getUserTasks() {
    loggerGgsheetGas("🔍 getUserTasks appelée");

    try {
        const url = `${config.HABITICA_BASE_URL}/tasks/user`;

        const response = UrlFetchApp.fetch(url, {
            method: "get",
            headers: config.HEADERS,
            muteHttpExceptions: true
        });

        const responseText = response.getContentText();
        loggerGgsheetGas("📡 getUserTasks réponse reçue");

        const json = JSON.parse(responseText);

        // ✅ Vérification de sécurité
        if (!json.data) {
            loggerGgsheetGas("❌ getUserTasks: json.data est undefined");
            loggerGgsheetGas("📋 Réponse complète: " + responseText.substring(0, 200));
            return []; // Retourne un tableau vide au lieu de undefined
        }

        loggerGgsheetGas("✅ getUserTasks: " + json.data.length + " tâches trouvées");
        return json.data;

    } catch (e) {
        loggerGgsheetGas("❌ ERREUR dans getUserTasks: " + e.toString());
        return []; // En cas d'erreur, retourne un tableau vide
    }
}

function getAllRewards() {
    loggerGgsheetGas("🎁 getAllRewards appelée");

    const tasks = getUserTasks();

    // ✅ Vérification de sécurité
    if (!tasks || !Array.isArray(tasks)) {
        loggerGgsheetGas("⚠️ getAllRewards: tasks n'est pas un tableau valide");
        return []; // Retourne un tableau vide
    }

    const rewards = tasks.filter(t => t.type === "reward");
    loggerGgsheetGas("✅ getAllRewards: " + rewards.length + " rewards trouvées");

    return rewards;
}

/*
const habiticaApi = new HabiticaAPI()

function removeOldShop() {
    //récup la liste des id des reward
    const rewards = getAllRewards()
    const shopItems = rewards.filter(t => t.alias && t.alias.startsWith("item-"))
    //suppress ceux ci
    shopItems.forEach(k => deleteTask(k._id))
    console.log("old shop removed")
}


function deleteTask(taskId) {
    const url = `${config.HABITICA_BASE_URL}/tasks/${taskId}`;

    const response = UrlFetchApp.fetch(url, {
        method: "delete",
        headers: config.HEADERS,
        muteHttpExceptions: true
    });

    return JSON.parse(response.getContentText());
}





//une fonction qui push les 4 items
function publishNewShopOnHabitica(items) {
    removeOldShop()
    items.forEach(k => {
        habiticaApi.createNewItemsShop(k)
    })
    reorderShopHabitica()
}




function getUserTasks() {
    const url = `${config.HABITICA_BASE_URL}/tasks/user`;

    const response = UrlFetchApp.fetch(url, {
        method: "get",
        headers: config.HEADERS,
        muteHttpExceptions: true
    });

    const json = JSON.parse(response.getContentText());
    return json.data; // contient habits, dailies, todos, rewards
}

function getAllRewards() {
    const tasks = getUserTasks();
    const rewards = tasks.filter(t => t.type === "reward");
    return rewards
}
*/