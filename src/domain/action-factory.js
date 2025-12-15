//Ce qu'il fait : Crée et lance les actions spécifiques (rocher, caillou, etc.)
class ActionCatalog {
    constructor(pidGetUser, pidLoadSpecialEquipement) {
        this.pidGetUser = pidGetUser
        this.pidLoadSpecialEquipement = pidLoadSpecialEquipement
    }


    //Methode génériques

    executeDamageAction(actionName) {
        const user = this.pidGetUser()                              // ✅ Une seule fois
        const specialEquipement = this.pidLoadSpecialEquipement()   // ✅ Une seule fois
        const sendMessageLogs = [];

        new PerformAction(user, specialEquipement, ACTION_DETAILS[actionName], sendMessageLogs).Damage()
    }

    // Actions physiques
    rocher() { this.executeDamageAction("rocher") }
    caillou() { this.executeDamageAction("caillou") }
    montagne() { this.executeDamageAction("montagne") }
    atlas() { this.executeDamageAction("atlas") }


    // Actions magiques
    flammeche() { this.executeDamageAction("flammeche") }
    bouleDeFeu() { this.executeDamageAction("bouleDeFeu") }
    explosionArcanique() { this.executeDamageAction("explosionArcanique") }
    tempeteDeFlammes() { this.executeDamageAction("tempeteDeFlammes") }


    // Actions spéciales (à implémenter plus tard)
    potionSoin({ data, app }) {
        // logique métier
    }

    trefle({ data, app }) {
        // logique métier
        //ICI ON A BESOIN DE APP
    }



}