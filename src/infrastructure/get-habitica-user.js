// === Fonction d'appel API pour avoir les infos des stats et niveau etc ===
function getUserFromHabiticaUser() {

    const habiticaUser = new HabiticaAPI().getHabiticaUser()
    const stats = getPlayerBaseStats(habiticaUser)
    const gears = getPlayerGears(habiticaUser)
    const buffs = habiticaUser.stats.buffs
    const playerClass = habiticaUser.stats.class

    //Logger.log(result.data);// Juste pour vérifier que ça marche. A noter que .stats renvoie plein de stats intéressantes, dont les buffs etc
    //stats.buffs nous renvoie les buff
    // A noter que .gear.equipped nous donne l'équipement
    return new User(habiticaUser.auth.local.username, habiticaUser.stats.lvl, stats, gears, playerClass, buffs);
}


function getPlayerGears(habiticaUser) {
    const equipmentsNames = habiticaUser.items.gear.equipped

    //{weapon : "weapon_name", armor : "armor_name"}

    const gearLibrary = getHabiticaAllContent().gear

    const allGears = Object.keys(gearLibrary.flat).reduce((acc, gearKey) => [...acc, gearLibrary.flat[gearKey]], [])
    //EQUIVALENT Fonction arrow
    //const equippedGears = Object.keys(equipmentsNames).map((key) => allGears.find((gear)=> equipmentsNames[key].key === gear.key) 
    const equippedGears = Object.keys(equipmentsNames).map((key) => {
        const equipmentname = equipmentsNames[key]
        return allGears.find((gear) =>
            equipmentname === gear.key
        )
    })

    return equippedGears
}

function getPlayerBaseStats(habiticaUser) {
    //stats sans gear et sans buffs
    const levelBonus = Math.floor(habiticaUser.stats.lvl / 2);
    const allocated = {
        str: habiticaUser.stats.str || 0,
        int: habiticaUser.stats.int || 0,
        con: habiticaUser.stats.con || 0,
        per: habiticaUser.stats.per || 0
    };
    return new BaseStat(
        allocated.str + levelBonus,
        allocated.int + levelBonus,
        allocated.con + levelBonus,
        allocated.per + levelBonus
    )
}


