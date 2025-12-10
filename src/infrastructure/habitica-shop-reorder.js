function reorderShopHabitica() {
    const rewards = getAllRewards()
    const shopItems = rewards.filter(t => t.alias && t.alias.startsWith("item-"))
    const specialEquipementPopUp = rewards.find(t => t.alias === "specialequipementeffectpopup")
    const diceBonusPopUp = rewards.find(t => t.alias === "diceBonusPopUp")
    pushRewardOnTop(specialEquipementPopUp)
    shopItems.forEach(pushRewardOnTop) //equivalent à shopItems.forEach(item => pushRewardOnTop(item))
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
    console.log(json)
    return json;
}