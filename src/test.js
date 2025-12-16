
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



// === TEST : Créer une Daily simple ===
function testCreerDaily() {
    const api = new HabiticaAPI();

    // Créer une daily avec ta classe
    const daily = new Daily("test-degats", "Dégats", "pour test")

    // La créer dans Habitica
    const result = api.createNewDaily(daily);
    Logger.log("✅ Daily créée avec ID: " + result.id);
    api.validateTaskHabitica(result.id)
    return result.id

}

//--------------------------------------------------------------------------------------------------------------------
//Penser à enlever les logs sur :
// get-habitica-user.js
// action-performer.js
// dialogue habiica api .js
// webhook entry . js
//Penser à changer dans proba-shop-habitica
//update-dice-bonus-pop-up