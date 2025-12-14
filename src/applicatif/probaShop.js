

//CECI EST MIS DANS APPLICATIF CAR C'EST UN USER-STORY
//c'est le pélo moyen qui dit "je vais faire une app et elle va faire ça !"
//**En l'occurrence ici: je rentre dans mon shop, et il génère 4 items**

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

//Explication mémo PID en bas du sheet




class GenerateDailyShop {

  constructor(loadItems, pidLoadSpecialEquipement, pidGetUser, pidPublishNewShop) {
    this.loadItems = loadItems
    this.pidLoadSpecialEquipement = pidLoadSpecialEquipement
    this.pidGetUser = pidGetUser
    this.pidPublishNewShop = pidPublishNewShop
  }

  handle() {

    //DEFINITION DU TABLEAU QUI VA CONTENIR ITEMS
    // 
    // ÇA ça ne fonctionne pas pour l'inversion de dépendance
    //const itemsLibrary = loadItemsFromSheet()
    const itemsLibrary = this.loadItems()
    //à dégager
    console.log({ library: itemsLibrary["A"] })
    const rarityMatrix = rarityTable
    //const ownedItems = ITEM_OWNED
    const ownedItems = this.pidLoadSpecialEquipement().getOwnedList()
    const user = this.pidGetUser()
    const loot = generateLootForUser2(user, itemsLibrary, rarityMatrix, ownedItems, numberLoot);
    this.pidPublishNewShop(loot)
    return loot
  }


  // === Test / affichage ===
  testLootForUser2() {

    // Affichage des noms et effets
    loot.forEach((item, index) => {
      if (item) {
        Logger.log(`#${index + 1} : [${item.rarity}] ${item.name} — ${item.effect}`);
      } else {
        Logger.log(`#${index + 1} : Rien trouvé`);
      }
    });

    return loot; // renvoie le tableau d'objets
  }


  // Logger.log(JSON.stringify({ user }, null, 2))
  // Logger.log(JSON.stringify({ stat: user.stats }, null, 2))


  envoyerMessage10h() {
    const payload = this.testLootForUser2()
    const messageFormate = formatLootMessage(payload);
    sendTestMessage(messageFormate)
    Logger.log(messageFormate)
  }


}




//ÇA C'EST A METTRE !!!!! (INFRA)

//FORMATTAGE
function formatLootMessage(loot) {
  let message = "🎲 **Loot du jour** 🎲\n\n";
  loot.forEach((item, index) => {
    if (item) {
      // Emoji selon la rareté
      const emoji = {
        "C": "⚪",
        "B": "🔵",
        "A": "🟣",
        "S": "🟡",
        "S+": "🔴"
      }[item.rarity] || "⚪";

      message += `${emoji} **#${index + 1} : [${item.rarity}] ${item.name}**\n`;
      message += `   └─ ${item.effect}\n\n`;
    } else {
      message += `❌ #${index + 1} : Rien trouvé\n\n`;
    }
  });

  return message;
}


// Cette fonction envoie un message privé à soi-même sur Habitica
// rajouté un try et catch pour la faire fonctionner. 
//ATTENTION ELLE N'ENVOIE PAS UN TABLEAU MAIS UN MESSAGE, D'OU L'INTÉRÊT DU FORMATTAGE
function sendTestMessage(texte) {
  const payload = {
    message: texte,
    toUserId: USER_ID
  };

  const options = {
    method: "post",
    headers: HEADERS,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  try {
    const response = UrlFetchApp.fetch("https://habitica.com/api/v3/members/send-private-message", options);
    const resultTry = JSON.parse(response.getContentText());
    if (resultTry.success) {
      Logger.log("✅ Message envoyé avec succès !");
    } else {
      Logger.log("❌ Échec envoi message : " + JSON.stringify(resultTry));
    }
  }

  catch (error) {
    Logger.log("❌ Erreur envoi message : " + error.toString())
  }

}





//====================================================================
//====================================================================
//====================================================================



// TRANSFORMABLE EN REDUCE (pas facile cependant)
function getRarityChances(level, rarityTable) {
  let closest = rarityTable[0][1];
  for (let i = 0; i < rarityTable.length; i++) {
    const [lvl, table] = rarityTable[i];
    if (level >= lvl) closest = table;
    else break;
  }
  return closest;
}




function weightedRoll2(chances) {
  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const [rarity, prob] of Object.entries(chances)) {
    cumulative += prob;

    if (roll < cumulative) {
      return rarity;
    }
  }


  throw new Error("Aucun resultat");
}






//===============================================
// === FONCTION HELPER : TROUVER UN OBJET PAR NOM ===
function trouverObjetParNomDansITEMS(nom, itemsLibrary) {
  for (const rarete in itemsLibrary) {
    const trouve = itemsLibrary[rarete].find(item => item.name === nom);
    if (trouve) return trouve;
  }
  return null;
}

//===============================================
//===============================================
//PENALITES POUR LES SETS
function calculerPenalitesPoidsSet(item, alreadyOwn, itemsLibrary) { //On passera ITEM_OWN dans already Own
  if (!item.nomSet) {
    return item.baseWeight || item.weight || 1;
  }



  // 1. Filtrer les objets possédés (TRUE uniquement dans AlreadyOwn) //[gants de truc, robe de truc, voile de truc]

  // 2. Récupérer les objets complets //On ne peut pas faire find car ITEMS ce n'est pas un tableau mais un objet !!!
  //const objetsPossedes = nomsPossedes.map(gantsTruc => ITEMS.find(e => e.nom === gantsTruc))
  // ✅ Solution : créer la fonction helper
  /* // ELLE EST DEFINIE EN DEHORS CAR ON S'EN RESSERT
  function trouverObjetParNomDansITEMS(nom) {
    for (const rarete in ITEMS) {
      const trouve = ITEMS[rarete].find(item => item.name === nom);
      if (trouve) return trouve;
    }
    return null;
  }
  */

  const objetsPossedes = alreadyOwn.map(e => trouverObjetParNomDansITEMS(e, itemsLibrary))

  /*objetsPossedes = [
    { nom: "gants_poison", set: "empoisonneur", weight: 5 },
    { nom: "robe_poison", set: "empoisonneur", weight: 7 },
    { nom: "voile_poison", set: "empoisonneur", weight: 3 }
  ];
  */

  // 3. Compter combien d'objets possédés appartiennent au même set
  let nombreObjetsDuSetPossedes = 0;

  objetsPossedes.forEach(i => {
    if (i.nomSet === item.nomSet) {
      nombreObjetsDuSetPossedes += 1
    }

  }
  )

  // 4. Appliquer la pénalité

  const poidsDeBase = item.baseWeight || item.weight || 1;

  switch (nombreObjetsDuSetPossedes) {
    case 0:
      return poidsDeBase; // 100%
    case 1:
      return poidsDeBase * 0.5; // 50%
    default:
      return poidsDeBase * 0.1; // 10% (2 ou plus)
  }


}



//===============================================
//===============================================
//===============================================


// === Génération de loot pour un utilisateur ===
//===============================================
//===============================================
function generateLootForUser2(user, itemsLibrary, rarityTable, itemOwned, count) {
  const rarityChances = getRarityChances(user.niveau, rarityTable);
  const drops = [];

  for (let i = 0; i < count; i++) {
    const rarity = weightedRoll2(rarityChances);
    if (!rarity) {
      throw new Error("Rarity not found");
    }

    const pool = (itemsLibrary[rarity] || []).filter(e => {
      //FONCTION DE FILTRAGE POUR ENLEVER LES OBJETS POSSEDES OU NON DEBLOQUES

      // Si l'objet déjà acheté → exclu

      //INCLUDES RENVOIE UN BOOLEEN, ALORS QUE FIND RENVOIE LE NOM DE L'OBJET
      //SI ON AVAIT UTILISE UN FIND ALORS ÇA AURAIT RENVOYE QUELQUE CHOSE ET ÇA AURAIT ETE TRUE
      if (itemOwned.includes(e.name)) {
        return false;
      }
      //Si l'objet est déjà tiré dans le tirage
      //if (alreadyDropped.some(item => item === e.name)) { //identique mais pour les cas simple includes fonctionne mieux, moins verbeux et optimisé
      if (drops.map(e => e.name).includes(e.name)) {
        return false
      }
      //alreadyDropped = ["robe_poison", "amulette_feu", "cape_glace"];
      if (e.nomSet) { //si l'objet possède un set
        //Si le même set set déjà tiré, exclusion
        const objetsdeSetDejaTires = drops.map(drop => trouverObjetParNomDansITEMS(drop, itemsLibrary))
          .filter(obj => obj !== null && obj.nomSet !== null) //on rajoute pour pas avoir d'erreurs
        const setsdejatiresUniquement = objetsdeSetDejaTires.map(e => e.nomSet)
        //if (item.nomSet === setsdejatiresUniquement.some(e => e ===item.nomSet)) {// VERBEUX, on refait avec includes
        if (setsdejatiresUniquement.includes(e.nomSet)) {
          return false
        }
      }
      return true;
    });

    // Tirage pondéré
    if (pool.length === 0) {
      throw new Error("Pool is empty, not enough items available for this rarity :" + rarity);
    }
    /*//DONC LA POUR EXEMLE DE RESULTAT QU'ON AURAIT, ÇA SERAIT ÇA : 
    [
  { nom: "robe_poison", set: "empoisonneur", weight: 1, rarity: "A"},
  { nom: "amulette_feu", set: null, weight: 1, rarity: "A"},
  { nom: "cape_glace", set: null, weight: 1, rarity: "A"}
]
*/
    //On refait un tableau avec les weights pré-modifiées : 
    const poolWithModifiedWeights = pool.map(item => ({
      item: item,
      weight: calculerPenalitesPoidsSet(item, itemOwned, itemsLibrary)
    }));
    // poolWithWeights = [
    //   { item: Heaume, weight: 1 },
    //   { item: Cœur, weight: 0.5 },
    //   { item: Diadème, weight: 1 }
    // ]

    // Somme des poids
    //const totalWeight = pool.reduce((sum, item) => sum + (item.weight || 1), 0); //avant qu'on introduise la fonction, donc avant que l'on introduise les fonctions de set
    //const totalWeight = pool.reduce((sum, item) => sum + calculerPenalitesPoidsSet(item, ITEM_OWNED), 0); //plus nécessaire maintenant
    const totalWeight = poolWithModifiedWeights.reduce((sum, entry) => sum + entry.weight, 0)

    let rollItem = Math.random() * totalWeight;
    let chosen = null;

    for (const entry of poolWithModifiedWeights) {
      rollItem -= (entry.weight || 1);
      if (rollItem <= 0) {
        chosen = entry.item;
        break;
      }
    }

    // ✅ vérifie que chosen existe
    if (chosen) {
      drops.push(chosen);
    }

    else {
      drops.push(null);
    }
  }



  return drops;
}



















































/*


//Principe d'inversion de dépendance. PID 
// j'ai une fonction 

function calculatestuff() {

  const truc = loadfromGGsheet()
  const resultat = calcule(truc)

  return resultat
}

function calcule() { }

//

function calculatestuff(load) {

  const truc = load()
  const resultat = calcule(truc)

  return resultat
}

function calcule() { }

// AVEC un constructor, c'est identique identique

class Calculatestuff {
  constructor() {
  //A NOTER QUE CE QUE L'ON MET LA, CE SONT LES PARAMETRES DE LA FONCTION EQUIVALENTE

  }
  handle() {
    const truc = loadfromGGsheet()
    const resultat = calcule(truc)

    return resultat
  }
}

function calcule() { }

//

class Calculatestuff {
  constructor(load) {
    this.load = load

  }
  handle() {
    const truc = this.load()
    const resultat = calcule(truc)

    return resultat
  }
}
*/