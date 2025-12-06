class SpecialEquipement {
    constructor(list) {
        this.list
    }

    getBonus() {
        logger.log("+1 de STR")
        return {
            str: 1,
            con: 0,
            int: 0,
            per: 0
        }
    }
}