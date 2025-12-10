
function foo() {
    const loot = new GenerateDailyShop(loadItemsInMemory).handle()
    const specialEquipement = loadSpecialEquipmentFromSheet()
    console.log({ specialEquipement: specialEquipement.list })
    if (loot.length !== numberLoot) throw new Error("Test failed, local storage not updated")
    console.log("Test passed")
    return
}


function foo2() {
    /*
    const specialEquipement = loadSpecialEquipmentFromSheet()
    const a = specialEquipement.getDescription()
    console.log({ a })
    //console.log({ specialEquipement: specialEquipement.list.get("Set des Reliques d’Azuraël") })
    return
    */

    new UpdateSpecialEquipPopUp(
        loadSpecialEquipmentFromSheet,
        updateSpecialEquipPopUpOnHabitica,
    ).handle()

    return
}

function foo3() {
    const specialEquipement = loadSpecialEquipmentFromSheet()
    specialEquipement.getBonus()
}

function foo4() {
    const user = getHabiticaUser()
    const SE = loadSpecialEquipmentFromSheet().getDiceBonus()

    logMap(user.getDiceBonus(SE))
}

function foo5() {
    const a = new UpdateDiceStatsPopUp(loadSpecialEquipmentFromSheet, getHabiticaUser, new HabiticaApi().createNewPopupifAlreadyExist)
    a.handle()
}

function foo6() {
    const app = mountApplication()
    app.generateDailyShop.handle()
}


function foo7() {

    loggerGgsheetGas({ connard: "salut" })
}

function foo8() {
    reorderShopHabitica()
}