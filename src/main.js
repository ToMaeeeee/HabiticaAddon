function mountApplication() {
    const application = {
        generateDailyShop: new GenerateDailyShop(loadItemsFromSheet, loadSpecialEquipmentFromSheet, getUserFromHabiticaUser, publishNewShopOnHabitica),
        updateDiceStatsPopUp: new UpdateDiceStatsPopUp(loadSpecialEquipmentFromSheet, getUserFromHabiticaUser, updateDiceBonusPopUpOnHabitica),
        updateSpecialEquipPopUp: new UpdateSpecialEquipPopUp(loadSpecialEquipmentFromSheet, updateSpecialEquipPopUpOnHabitica),
        actionCatalog: new ActionCatalog(getUserFromHabiticaUser, loadSpecialEquipmentFromSheet)
    }
    return application
}