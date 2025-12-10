function updateDiceBonusPopUpOnHabitica(popUp) {
    new HabiticaAPI().createNewPopupifAlreadyExist(popUp)
    reorderShopHabitica()
}