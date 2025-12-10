

const WEBHOOK_CONFIG = {
    url: "",
    label: "taskWebhook",
    type: "taskActivity",
    options: {
        scored: true,
        created: false,
        updated: false,
        deleted: false
    }
};


function initWebHook() {
    creerWebHookGetStatsPlayer(WEBHOOK_CONFIG)
}

function creerWebHookGetStatsPlayer(data) {
    const response = JSON.parse(UrlFetchApp.fetch("https://habitica.com/api/v3/user/webhook", {
        method: "get",
        headers: config.HEADERS,
        muteHttpExceptions: true
    }).getContentText()).data;

    const previous = response.find(e => e.label === data.label);
    if (previous) {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/webhook/" + previous._id, {
            method: "delete",
            headers: config.HEADERS,
            muteHttpExceptions: true
        });
    }
    UrlFetchApp.fetch("https://habitica.com/api/v3/user/webhook", {
        method: "post",
        headers: config.HEADERS,
        contentType: "application/json",
        payload: JSON.stringify(data),
        muteHttpExceptions: true
    });
}

