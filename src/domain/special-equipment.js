class SpecialEquipement {
    constructor(list) {
        //faire une map pour les sets d'équipement ensemble. 
        //[set de truc : {}, set de truc2 : {}]
        this.list = new Map() // {}
        this.list.set(setName, equipment)  // { "kroll" : { name: "Heaume de Kroll-Dur", weight: 5, set: "kroll" } }
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
        //pour chaque item de la liste
        const equipmentDescriptors = []
        for (const equipment in this.list) {
            equipmentDescriptors.push(equipment.description)
        }
        return "Pleurs de sang et autre truc swag"
    }
}