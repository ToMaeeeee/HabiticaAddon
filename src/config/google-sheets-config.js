//ICI LES IDENTIFIANTS DU SHEET AVEC LES OBJETS DU SHOP → IMPORTATION À PARTIR DU SHEET EXCEL
const SHEET_ID = "1CrdO11yIIyNK2QFnQQsH-o6gGIiQpxNF1uxQKhzgTpU";
const ITEMS_SHEET_NAME = "Items"
const CHEST_SHEET_NAME = "chest"
const SPECIAL_EQUIPMENT_SHEET_NAME = "SpecialEquipment"
const LOGS_SHEET_NAME = "logger"


//ICI LES IDENTIFIANTS DU SHEET AVEC LES MONSTRES DU SHOP → IMPORTATION À PARTIR DU SHEET EXCEL
const MONSTERS_SHEET_NAME = "Monstres"

//Utile pour le moment dans dealEstimatedDamage
const DAMAGE_CONFIG = {
    CLICKS_PER_BATCH: 10,        // 10 clics par batch
    PAUSE_BETWEEN_CLICKS: 1000,   // 🔥 entre deux séries de clic/unclic
    PAUSE_BETWEEN_BATCHES: 8000, // 🔥 8 secondes entre batches (au lieu de 8s)
    PAUSE_BETWEEN_VALIDATE_UNVALIDATE: 800
};