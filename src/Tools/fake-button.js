const popUptest = new Item("Rocher", "C", "Test pour rocher", 0);
//PopUp(id, title, description)


function creationFakeButton() {
    const payload = popUptest
    new HabiticaAPI().createNewItemsShop(payload);
}