class Item {
    constructor(name, rarity, effect, price, levelReq = 1, weight = 1, nomSet = null) {
        this.name = name;
        this.rarity = rarity; // "Common", "Rare", etc.
        this.effect = effect;
        this.price = price;
        this.levelReq = levelReq;
        this.weight = weight;  // ← Lu depuis le Sheet
        this.baseWeight = weight; // ← Copie automatique du weight
        this.nomSet = nomSet
        this.alias = 'item-' + name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/ /g, ''); // suppression des accents et des espaces et des caractères spéciaux

    }
}
