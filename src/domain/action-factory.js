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

        new PerformAction(user, specialEquipement, ACTION_DETAILS[actionName], sendMessageLogs).damage()
    }

    executeModifyStats(actionName) {
        const sendMessageLogs = [];  // ✅ Créer le tableau
        new PerformAction(this.pidGetUser(), this.pidLoadSpecialEquipement(), ACTION_DETAILS[actionName], sendMessageLogs).modifyStats()
    }

    executeOpenAction(actionName) {
        new PerformAction(this.pidGetUser(), this.pidLoadSpecialEquipement(), ACTION_DETAILS[actionName]).Open()
    }




    // Actions physiques
    rocher() { this.executeDamageAction("rocher") }
    caillou() { this.executeDamageAction("caillou") }
    montagne() { this.executeDamageAction("montagne") }
    atlas() { this.executeDamageAction("atlas") }


    // Actions magiques
    flammeche() { this.executeDamageAction("flammeche") }
    bouledefeu() { this.executeDamageAction("bouledefeu") }
    explosionacanique() { this.executeDamageAction("explosionarcanique") }
    tempetedeflammes() { this.executeDamageAction("tempetedeflammes") }


    // ========================================
    // POTIONS / SOINS
    // ========================================
    potiondesoin() { this.executeModifyStats("potiondesoin") }
    xppotion() { this.executeModifyStats("xppotion") }

    trefle({ data, app }) {
        // logique métier
        //ICI ON A BESOIN DE APP
    }

    // ========================================
    // COFFRES
    // ========================================
    coffrec() { this.executeOpenAction("coffrec") }
    coffreb() { this.executeOpenAction("coffreb") }
    coffrea() { this.executeOpenAction("coffrea") }
    coffres() { this.executeOpenAction("coffres") }
    coffress() { this.executeOpenAction("coffress") }


}