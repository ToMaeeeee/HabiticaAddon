// Fonction pour lire le Sheet et créer le tableau ITEMS
function loadSpecialEquipmentFromSheet() {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SPECIAL_EQUIPMENT_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // récupère la première ligne comme entêtes
    const itemsBySet = new Map();


    data.forEach(row => {
        if (row.every(cell => !cell)) return;

        const obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        if (!obj.owned) return
        const item = new ItemSpecialEquipment(
            obj.name,
            obj.rarity,
            obj.syng1,
            obj.syng2,
            obj.syng3,
            obj.price || 0,
            obj.levelReq,
            obj.weight,
            obj.nomSet || null //Charger le set s'il existe
        );
        //NOTATION TERNAIRE
        !itemsBySet.has(item.nomSet) //if (condittion)
            ? itemsBySet.set(item.nomSet, [item]) //itemsBySet[item.nomSet] = []; //if yes →
            : itemsBySet.get(item.nomSet).push(item); //if non → 
    });

    console.log({ itemsBySet })
    Logger.log("Chargement des items spéciaux du Sheet réussi");
    return new SpecialEquipement(itemsBySet);
}
