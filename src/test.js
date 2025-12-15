
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



//--------------------------------------------------------------------------------------------------------------------
//Penser à enlever les logs sur :
// get-habitica-user.js
// action-performer.js
// dialogue habiica api .js
// webhook entry . js