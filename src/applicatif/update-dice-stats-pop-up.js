class UpdateDiceStatsPopUp {

    constructor(pidloadSpecialEquipement, pidGetUser, pidUpdateDiceStatsPopUp) {
        this.pidloadSpecialEquipement = pidloadSpecialEquipement
        this.pidGetUser = pidGetUser
        this.pidUpdateDiceStatsPopUp = pidUpdateDiceStatsPopUp
    }
    handle() {
        const user = this.pidGetUser() //PID A FAIRE ENSUITE
        const specialEquipement = this.pidloadSpecialEquipement()

        const specialEquipementDiceBonus = specialEquipement.getDiceBonus()
        // logMap(specialEquipementDiceBonus)
        // { STR: 1, INT: 1, PER: 1, CST: 1 }
        const totalDiceBonus = user.getDiceBonus(specialEquipementDiceBonus)
        //logMap(totalDiceBonus)
        //{ STR: 1, INT: 4, PER: 2, CST: -2 }
        const totalDiceBonusformated = this.formatPopupTitle(totalDiceBonus)
        // console.log("totalDiceBonusformated", totalDiceBonusformated)
        // 🗡️ +1 | 🛡️ +1 | 🧙🏻‍♂️ +1 | 🗝️ +1
        const popUpDiceBonuses = new PopUp("diceBonusPopUp", totalDiceBonusformated, "")
        this.pidUpdateDiceStatsPopUp(popUpDiceBonuses)

    }

    formatPopupTitle(diceBonus) {
        return `${this.formatStatPositier("STR", diceBonus)} | ${this.formatStatPositier("CST", diceBonus)} | ${this.formatStatPositier("INT", diceBonus)} | ${this.formatStatPositier("PER", diceBonus)}`
    }

    formatStatPositier(stat, diceBonus) {
        const value = diceBonus.get(stat)
        const emojiList = new Map([["STR", "🗡️"], ["CST", "🛡️"], ["INT", "🧙🏻‍♂️"], ["PER", "🗝️"]]);
        return `${emojiList.get(stat)} ${value > 0 ? "+" : ""}${value}`
    }


}
