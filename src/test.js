
function foo() {
    dealDamageBossHabitica(3)

}


function foo1() {
    // récupère directement les vrais objets
    const user = getUserFromHabiticaUser()
    const specialEquipement = loadSpecialEquipmentFromSheet()

    // calcule le bonus total
    const specialEquipementBonus = specialEquipement.getDiceBonus()
    const totalDiceBonus = user.getDiceBonus(specialEquipementBonus)

    // log le résultat
    console.log(totalDiceBonus)   // ou loggerLog(totalDiceBonus) si tu veux utiliser ton logger
}





function testActionRocher() {
    actionRocher();
}
