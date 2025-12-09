
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

