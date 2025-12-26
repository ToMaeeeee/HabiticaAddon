//Ce qu'il fait : Contient la configuration des actions (dés, caractéristiques, seuils)

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
            stats: { mp: -10 }
        },
        characteristic: "INT",
        successThreshold: 2
    },
    bouledefeu: {
        types: {
            damage: { dice: 10 },
            stats: { mp: -15 }
        },
        characteristic: "INT",
        successThreshold: 4
    },
    explosionarcanique: {
        types: {
            damage: { dice: 20 },
            stats: { mp: -25 }
        },
        characteristic: "INT",
        successThreshold: 8
    },
    tempetedeflammes: {
        types: {
            damage: { dice: 100 },
            stats: { mp: -45 }
        },
        characteristic: "INT",
        successThreshold: 12
    },

    // Potions / soins
    potiondesoin: {
        types: { stats: { hp: 15 } },
        characteristic: "CST",
        successThreshold: 10 //Test requis potion de soin
    },

    xppotion: {
        types: { stats: { exp: 150 } },
        characteristic: "CST", //je ne sais pas si on peut laisser vide
        successThreshold: 0 // Pas de test requis pour une potion de XP
    },

    potionmana: {
        types: {
            stats: { mp: 30 }
        },
        characteristic: "CST",
        successThreshold: 0
    },
    // Enlevé pour le moment car ça fait péter un câble au déploiement de GAS

    // coffrec: {
    //     types: {
    //         openable
    //     },
    //     characteristic: "PER",
    //     successThreshold: 8
    // },

    // coffreb: {
    //     types: {
    //         openable
    //     },
    //     characteristic: "PER",
    //     successThreshold: 12
    // },

    // coffrea: {
    //     types: {
    //         openable
    //     },
    //     characteristic: "PER",
    //     successThreshold: 16
    // },

    // coffres: {
    //     types: {
    //         openable
    //     },
    //     characteristic: "PER",
    //     successThreshold: 20
    // },

    // coffress: {
    //     types: {
    //         openable
    //     },
    //     characteristic: "PER",
    //     successThreshold: 24
    // }
};