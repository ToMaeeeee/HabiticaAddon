
function foo() {
    const loot = new GenerateDailyShop(loadItemsInMemory).handle()
    if (loot.length !== numberLoot) throw new Error("Test failed, local storage not updated")
    console.log("Test passed")
    return
}