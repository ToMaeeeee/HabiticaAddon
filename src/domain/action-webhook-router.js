//Ce qu'il fait : Route les webhooks vers la bonne action


// 📋 MAPPING DES ACTIONS
// Ce dictionnaire fait le lien entre l'alias de la tâche et l'action à exécuter
const DAILY_BUYABLE_ACTIONS = {
    'rocher': (params) => params.app.actionCatalog.rocher(),
    'caillou': (params) => params.app.actionCatalog.caillou(),
    'montagne': (params) => params.app.actionCatalog.montagne(),
    'atlas': (params) => params.app.actionCatalog.atlas(),
    'flammeche': (params) => params.app.actionCatalog.flammeche(),
    'bouledefeu': (params) => params.app.actionCatalog.bouledefeu(),
    'explosionarcanique': (params) => params.app.actionCatalog.explosionarcanique(),
    'tempetedeflammes': (params) => params.app.actionCatalog.tempetedeflammes(),
    'potiondesoin': (params) => params.app.actionCatalog.potiondesoin(),
    'trefle': (params) => params.app.actionCatalog.trefle(params),
    'xppotion': (params) => params.app.actionCatalog.xppotion(params),
    'coffrec': (params) => params.app.actionCatalog.coffrec(params),
    'coffreb': (params) => params.app.actionCatalog.coffreb(params),
    'coffrea': (params) => params.app.actionCatalog.coffrea(params),
    'coffres': (params) => params.app.actionCatalog.coffres(params),
    'coffress': (params) => params.app.actionCatalog.coffress(params)

};



class BuyableDispatcher {
    constructor(app, isTest = false) { //version pour test
        this.app = app
        this.isTest = isTest
    }


    dispatch(data) {
        const alias = data?.task?.alias
        if (!alias) {
            console.log("⚠️ Aucun alias trouvé dans les données")
            return
        }

        // Reçoit un alias qui commence par "item" → déclenche une action
        if (alias.startsWith("item-")) {
            const actionName = alias.replace("item-", "");
            const action = DAILY_BUYABLE_ACTIONS[actionName]
            if (action) {
                action({ data, app: this.app })
            }
        }

    }

}
