//Ce qu'il fait : Route les webhooks vers la bonne action
class BuyableDispatcher {
    constructor(app) {
        this.app = app
    }


    dispatch(data) {
        const alias = data?.task?.alias
        if (!alias) return

        const action = DAILY_BUYABLE_ACTIONS[alias]
        if (action) {
            action({ data, app: this.app })
        }
    }

}
