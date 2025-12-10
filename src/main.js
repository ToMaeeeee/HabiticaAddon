function mountApplication() {
    const application = {
        generateDailyShop: new GenerateDailyShop(loadItemsFromSheet, loadSpecialEquipmentFromSheet, getHabiticaUser, publishNewShopOnHabitica),
        updateDiceStatsPopUp: new UpdateDiceStatsPopUp(loadSpecialEquipmentFromSheet, getHabiticaUser, updateDiceBonusPopUpOnHabitica),
        updateSpecialEquipPopUp: new UpdateSpecialEquipPopUp(loadSpecialEquipmentFromSheet, updateSpecialEquipPopUpOnHabitica)
    }
    return application
}



