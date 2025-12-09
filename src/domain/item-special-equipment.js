class ItemSpecialEquipment {
    constructor(name, rarity, syng1, syng2, syng3, price, levelReq = 1, weight = 1, nomSet = null) {
        this.name = name;
        this.rarity = rarity || "S+"; // "Common", "Rare", etc.
        this.syng1 = syng1;
        this.syng2 = syng2;
        this.syng3 = syng3;
        this.price = price;
        this.levelReq = levelReq;
        this.weight = weight;  // ← Lu depuis le Sheet
        this.baseWeight = weight; // ← Copie automatique du weight
        this.nomSet = nomSet
        this.alias = 'item-' + name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/ /g, ''); // suppression des accents et des espaces et des caractères spéciaux

    }
}
