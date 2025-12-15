const ACTION_DETAILS = {
    // Actions physiques
    caillou: {
        types: { damage: { dice: 6 } },
        characteristic: "STR",
        successThreshold: 2
    },
    rocher: {
        types: { damage: { dice: 10 } },
        characteristic: "STR",
        successThreshold: 4
    },
    montagne: {
        types: { damage: { dice: 20 } },
        characteristic: "STR",
        successThreshold: 8
    },
    atlas: {
        types: { damage: { dice: 100 } },
        characteristic: "STR",
        successThreshold: 12
    },

    // Actions magiques avec consommation de mana
    flammeche: {
        types: {
            damage: { dice: 6 },
            consume: { resource: "mana", amount: 10 }
        },
        characteristic: "INT",
        successThreshold: 2
    },
    bouleDeFeu: {
        types: {
            damage: { dice: 10 },
            consume: { resource: "mana", amount: 15 }
        },
        characteristic: "INT",
        successThreshold: 4
    },
    explosionArcanique: {
        types: {
            damage: { dice: 20 },
            consume: { resource: "mana", amount: 25 }
        },
        characteristic: "INT",
        successThreshold: 8
    },
    tempeteDeFlammes: {
        types: {
            damage: { dice: 100 },
            consume: { resource: "mana", amount: 45 }
        },
        characteristic: "INT",
        successThreshold: 12
    },

    // Potions / soins
    potionSoin: {
        types: { heal: { resource: "HP", amount: 15 } },
        characteristic: "CST",
        successThreshold: 10
    }
};