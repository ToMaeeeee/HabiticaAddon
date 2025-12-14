function reorderShopHabitica() {
    const rewards = getAllRewards()

    const shopItems = rewards.filter(t => t.alias && t.alias.startsWith("item-"))
    const shopSeparators = rewards.filter(t => t.alias && t.alias.startsWith("separator"))
    const specialEquipementPopUp = rewards.find(t => t.alias === "specialequipementeffectpopup")
    const diceBonusPopUp = rewards.find(t => t.alias === "diceBonusPopUp")

    pushSeparatorOnTop(shopSeparators[0])
    pushRewardOnTop(specialEquipementPopUp)
    pushSeparatorOnTop(shopSeparators[1])
    shopItems.forEach(pushRewardOnTop) //equivalent à shopItems.forEach(item => pushRewardOnTop(item))
    pushSeparatorOnTop(shopSeparators[2])
    pushRewardOnTop(diceBonusPopUp)

}



function pushRewardOnTop(reward) {
    const url = `${config.HABITICA_BASE_URL}/tasks/${reward.id}/move/to/0`

    const res = UrlFetchApp.fetch(url, {
        method: "post",
        headers: config.HEADERS,
        payload: JSON.stringify({ position: 0 }),
        muteHttpExceptions: true
    });
    const json = JSON.parse(res.getContentText());
    return json;
}

function pushSeparatorOnTop(separator) {
    if (separator) {
        pushRewardOnTop(separator)
        return
    }
    const popUpSeparator = new PopUp(`separator-${Math.round(Math.random() * 10000)}`, "**≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈**", "")
    new HabiticaAPI().createNewPopup(popUpSeparator)
}