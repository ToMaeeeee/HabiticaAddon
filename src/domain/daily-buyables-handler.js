function actionRocher({ data, app }) {
    // logique métier
    const user = getUserFromHabiticaUser()

    //Dans le futur : fonction rollDice(caractéristique, requirement, avantage)
    //DD (STR) > 4, Un dé 10 de dégats
    //Il faut récupérer la valeur de la force. 
    //
}




function actionCaillou({ data, app }) {
    // logique métier
}

function actionMontagne({ data, app }) {
    // logique métier
}


function actionPotionSoin({ data, app }) {
    // logique métier
}

function actionTrefle({ data, app }) {
    // logique métier
    //ICI ON A BESOIN DE APP
}



function actionRocher({ data, app }) {
    const damage = rollDice()
    dealDamageBossHabitica(damage)

    app.updateSpecialEquipPopUp.handle()
}

const DAILY_BUYABLES_ACTIONS = {
    rocher: actionRocher,
    soin: actionPotionSoin,
    degats: actionDegats
}