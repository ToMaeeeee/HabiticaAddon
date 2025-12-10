class SpecialEquipement {
    constructor(specialEquipementsBySets) {
        //faire une map pour les sets d'équipement ensemble. 
        //[set de truc : {}, set de truc2 : {}]
        this.specialEquipementsBySets = specialEquipementsBySets // {}

        // { 

        //  "kroll" : [ {...item},{} ]; 

        //  "sangin" : [{},{}] };

        // }
    }



    getDiceBonus() {

        let buffs = []
        this.specialEquipementsBySets.forEach((items, _) => {
            switch (items.length) {
                case 1:
                    buffs.push(items[0].syng1.split("|").map(e => e.trim()))
                    break

                case 2:
                    buffs.push(items[0].syng2.split("|").map(e => e.trim()))
                    break

                case 3:
                    buffs.push(items[0].syng3.split("|").map(e => e.trim()))
                    break
            }

        })


        const diceBonuses = new Map([["STR", 0], ["INT", 0], ["PER", 0], ["CST", 0]]);
        const flatbuffs = buffs.flatMap(e => e)
        flatbuffs.forEach(buff => {
            const temp = ["STR", "INT", "PER", "CST"];
            for (const stat of temp) {
                if (buff.startsWith(stat)) {
                    const bonus = parseInt(buff.replace(stat, "").replace("+", ""));
                    diceBonuses.set(stat, diceBonuses.get(stat) + bonus);
                }
            }
        })
        //logMap(diceBonuses)
        //[STR+1, INT+1 | Sorts : 50% mana, peut lancer un sort de n’importe quelle autre classe, CST+1, PER+1]
        //[[STR+1], [INT+1 ,  Sorts : 50% mana, peut lancer un sort de n’importe quelle autre classe], [CST+1], [PER+1]]
        //[[STR+1], [INT+1, Sorts : 50% mana, peut lancer un sort de n’importe quelle autre classe], [CST+1], [PER+1]]
        //[STR+1, INT+1, "Sorts : 50% mana, peut lancer un sort de n’importe quelle autre classe" , CST+1, PER+1]
        return diceBonuses
    }


    getDescription() {
        let description = "";

        this.specialEquipementsBySets.forEach((items, setName) => {
            const synergisticEffects =
                items.length === 3 ? items[0].syng3 :
                    items.length === 2 ? items[0].syng2 :
                        items[0].syng1;

            description += `### **${setName}**\n`;
            description += `**Equipment:** _${items.map(item => item.name).join(" | ")}_\n\n`;

            synergisticEffects.split('|').map(e => e.trim()).forEach(effect => {
                description += `- **${effect}**\n`;
            })

            description += "\n"; // spacing between sets
        });

        return description.trim();
    }

    //méthode pour obtenir la liste des objets spéciaux possédés pour remplacer ITEM_OWNED qui était pas fou.
    getOwnedList() {
        return Object.entries(this.specialEquipementsBySets).map(([_, items]) => {
            return items.map(item => item.name)
        }).flatMap(e => e)
    }

    logSpecialEquipment() {
        logMap(this.specialEquipementsBySets)
    }
}


