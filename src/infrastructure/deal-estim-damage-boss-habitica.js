// 🎯 OPTIMISATION : Au lieu d'une boucle, on calcule combien de hits sont nécessaires
// Chaque validation de task inflige environ 1.5 dégâts en moyenne (dépend du boss)
// Pour être sûr, on fait damage × 1 validations



//Celle aau-dessus ça devra avoir un PID et aller dans la domaien




function dealEstimatedDamage(damageTarget) {
    const API = new HabiticaAPI()
    const strength = getUserFromHabiticaUser().getStats().str
    const clicksNeeded = estimateDamageDailyClicks(damageTarget, strength)
    const damageTaskID = API.createNewDaily()
    for (let i = 0; i < clicksNeeded; i++) {
        API.validateTaskHabitica(damageTaskID)
        API.unvalidateTaskHabitica(damageTaskID)
        Utilities.sleep(600); // 600ms entre chaque hit
    }

    //a faire avec une daily en clic et DECLIC par contre


}


function estimateDamageClicks(damageTarget, strength) {
    const API = new HabiticaAPI()
    //récupérer la force
    //const strength = getUserFromHabiticaUser().getStats().str
    const damagePerClick = 1 + strength * 0.005;
    let clicksNeeded = Math.ceil(damageTarget / damagePerClick);
    return clicksNeeded;
}



