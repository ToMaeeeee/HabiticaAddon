//function actionRocher({ data, app }) {
function actionRocher() {
    const sendMessageLogs = [];
    const user = getUserFromHabiticaUser();
    const specialEquipement = loadSpecialEquipmentFromSheet();

    const action = new PerformAction(ACTION_DETAILS["rocher"], user, specialEquipement, sendMessageLogs);
    action.Damage(); // rocher est seulement un damage
}





function actionCaillou({ data, app }) {
    performDamageAction("caillou");
}

function actionMontagne({ data, app }) {
    performDamageAction("montagne");
}


function actionPotionSoin({ data, app }) {
    // logique métier
}

function actionTrefle({ data, app }) {
    // logique métier
    //ICI ON A BESOIN DE APP
}



