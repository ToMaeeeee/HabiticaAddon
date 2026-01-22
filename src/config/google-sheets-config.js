//ICI LES IDENTIFIANTS DU SHEET AVEC LES OBJETS DU SHOP → IMPORTATION À PARTIR DU SHEET EXCEL
const SHEET_ID = "1CrdO11yIIyNK2QFnQQsH-o6gGIiQpxNF1uxQKhzgTpU";
const ITEMS_SHEET_NAME = "Items"
const CHEST_SHEET_NAME = "chest"
const SPECIAL_EQUIPMENT_SHEET_NAME = "SpecialEquipment"
const LOGS_SHEET_NAME = "logger"


//ICI LES IDENTIFIANTS DU SHEET AVEC LES MONSTRES DU SHOP → IMPORTATION À PARTIR DU SHEET EXCEL
const MONSTERS_SHEET_NAME = "Monstres"

//Utile pour le moment dans dealEstimatedDamage
const RATE_LIMIT_CONFIG = {
    REQUESTS_PER_BATCH: 20,    // 20 requêtes par batch
    PAUSE_BETWEEN_BATCHES: 5000 // 5 secondes de pause entre chaque batch
};