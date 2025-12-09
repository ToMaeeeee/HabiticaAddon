//Une fonction qui enlève

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
function publishNewShop(items) {
    removeOldShop()
    items.forEach(k => {
        habiticaApi.createNewItemsShop(k)
    })
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
