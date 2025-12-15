class UserDiceStats {
    constructor(pidGetUser, pidGetSpecialEquipement) {
        this.pidGetSpecialEquipement = pidGetSpecialEquipement
        this.pidGetUser = pidGetUser
    }

    calculeTotal() {
        const user = this.pidGetUser()
        const specialEquipement = this.pidGetSpecialEquipement()
        const specialEquipementBonus = specialEquipement.getDiceBonus()
        return user.getDiceBonus(specialEquipementBonus)

    }
}
