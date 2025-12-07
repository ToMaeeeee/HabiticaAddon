// Fonction pour lire le Sheet et créer le tableau ITEMS
function loadItemsFromSheet() {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(ITEMS_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // récupère la première ligne comme entêtes
    const itemsByRarity = {};

    data.forEach(row => {
        if (row.every(cell => !cell)) return;
        const obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        const item = new Item(
            obj.name,
            obj.rarity,
            obj.effect,
            obj.price || 0,
            obj.levelReq,
            obj.weight,
            obj.nomSet || null //Charger le set s'il existe
        );

        if (!itemsByRarity[item.rarity]) itemsByRarity[item.rarity] = [];
        itemsByRarity[item.rarity].push(item);
    });

    Logger.log("Chargement des items du Sheet réussi");
    return itemsByRarity;
}
