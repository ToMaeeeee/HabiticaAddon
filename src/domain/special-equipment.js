class SpecialEquipement {
    constructor(specialEquipementsBySets) {
        //faire une map pour les sets d'équipement ensemble. 
        //[set de truc : {}, set de truc2 : {}]
        this.specialEquipementsBySets = specialEquipementsBySets // {}
        // this.list.set(setName, equipment)  // { "kroll" : { name: "Heaume de Kroll-Dur", weight: 5, set: "kroll" } }
    }

    getBonus() {
        return {
            str: 1,
            con: 0,
            int: 0,
            per: 0
        }
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
}