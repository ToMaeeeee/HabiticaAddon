//------------------------------FONCTION DE CLAUDE--------------------------------------------------


function updateDiceBonusPopUpOnHabitica(popUp) {
    try {
        loggerGgsheetGas("🎲 updateDiceBonusPopUpOnHabitica appelée");
        new HabiticaAPI().createNewPopupifAlreadyExist(popUp);
        loggerGgsheetGas("✅ PopUp créée");

        reorderShopHabitica();
        loggerGgsheetGas("✅ Shop réorganisé");
    } catch (e) {
        // Si ça échoue, on log mais on ne bloque pas l'exécution
        loggerGgsheetGas("⚠️ Erreur dans updateDiceBonusPopUp (non bloquante): " + e.toString());
    }
}



/*
function updateDiceBonusPopUpOnHabitica(popUp) {
    new HabiticaAPI().createNewPopupifAlreadyExist(popUp)
    reorderShopHabitica()
}
    */