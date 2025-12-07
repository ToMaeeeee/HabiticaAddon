function loadItemsInMemory() {
    return {
        /*************  ✨ Windsurf Command 🌟  *************/
        A: [
            {
                name: 'Montagne',
                rarity: 'A',
                effect: 'DD STR 8, Un dé 20 de dégats',
                price: 20,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-montagne'
            },
            {
                name: 'Pierre Aiguisage Majeure',
                rarity: 'A',
                effect: 'Jet de d20, valable jusqu\'à atteinte du vert, cum. vamp etc image : https://i.ytimg.com/vi/_QcuKdIQsO8/maxresdefault.jpg',
                price: 30,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreaiguisagemajeure'
            },
            {
                name: 'Cigue de Platon',
                rarity: 'A',
                effect: 'WIP',
                price: 10,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-ciguedeplaton'
            },
            {
                name: 'Pierre de l\'Eternité',
                rarity: 'A',
                effect: '+1d20 aux dés de combat',
                price: 25,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreeternite'
            },
            {
                name: 'Pierre de l\'Invincibilité',
                rarity: 'A',
                effect: 'Invincibilité pendant 1 minute',
                price: 50,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreetinvincibilite'
            },
        ],
        B: [
            {
                name: 'Pierre de la Force',
                rarity: 'B',
                effect: 'DD VIT 4, Un dé 20 de dégats',
                price: 15,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreforce'
            },
            {
                name: 'Pierre de la Résistance',
                rarity: 'B',
                effect: 'DD CON 4, Un dé 20 de dégats',
                price: 15,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierderesistance'
            },
            {
                name: 'Pierre de la Vitalité',
                rarity: 'B',
                effect: 'DD VIE 4, Un dé 20 de dégats',
                price: 15,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierdevitalite'
            },
            {
                name: 'Pierre de l\'Intelligence',
                rarity: 'B',
                effect: 'DD INT 4, Un dé 20 de dégats',
                price: 15,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierredelintelligence'
            },
            {
                name: 'Pierre de la Force Supérieure',
                rarity: 'B',
                effect: 'DD VIT 8, Un dé 20 de dégats',
                price: 30,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreforcesup'
            },
        ],
        C: [
            {
                name: 'Pierre de la Vitalité Supérieure',
                rarity: 'C',
                effect: 'DD VIE 8, Un dé 20 de dégats',
                price: 30,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierdevitalitesup'
            },
            {
                name: 'Pierre de l\'Intelligence Supérieure',
                rarity: 'C',
                effect: 'DD INT 8, Un dé 20 de dégats',
                price: 30,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierredelintelligencesup'
            },
            {
                name: 'Pierre de la Résistance Supérieure',
                rarity: 'C',
                effect: 'DD CON 8, Un dé 20 de dégats',
                price: 30,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierderesistancesup'
            },
            {
                name: 'Pierre de la Force Divine',
                rarity: 'C',
                effect: 'DD VIT 12, Un dé 20 de dégats',
                price: 45,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreforcedivine'
            },
            {
                name: 'Pierre de la Vitalité Divine',
                rarity: 'C',
                effect: 'DD VIE 12, Un dé 20 de dégats',
                price: 45,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierdevitalitedivine'
            },
        ],
        S: [
            {
                name: 'Pierre de la Force Divine Supérieure',
                rarity: 'S',
                effect: 'DD VIT 16, Un dé 20 de dégats',
                price: 60,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreforcedivinesup'
            },
            {
                name: 'Pierre de la Vitalité Divine Supérieure',
                rarity: 'S',
                effect: 'DD VIE 16, Un dé 20 de dégats',
                price: 60,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierdevitalitedivinesup'
            },
            {
                name: 'Pierre de l\'Intelligence Divine Supérieure',
                rarity: 'S',
                effect: 'DD INT 16, Un dé 20 de dégats',
                price: 60,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierredelintelligencedivinesup'
            },
            {
                name: 'Pierre de la Résistance Divine Supérieure',
                rarity: 'S',
                effect: 'DD CON 16, Un dé 20 de dégats',
                price: 60,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierderesistancedivinesup'
            },
            {
                name: 'Pierre de la Force Divine Supérieure Supérieure',
                rarity: 'S+',
                effect: 'DD VIT 20, Un dé 20 de dégats',
                price: 75,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierreforcedivinesupsup'
            },
        ],
        'S+': [
            {
                name: 'Pierre de la Vitalité Divine Supérieure Supérieure',
                rarity: 'S+',
                effect: 'DD VIE 20, Un dé 20 de dégats',
                price: 75,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierdevitalitedivinesupsup'
            },
            {
                name: 'Pierre de l\'Intelligence Divine Supérieure Supérieure',
                rarity: 'S+',
                effect: 'DD INT 20, Un dé 20 de dégats',
                price: 75,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierredelintelligencedivinesupsup'
            },
            {
                name: 'Pierre de la Résistance Divine Supérieure Supérieure',
                rarity: 'S+',
                effect: 'DD CON 20, Un dé 20 de dégats',
                price: 75,
                levelReq: '',
                weight: '',
                baseWeight: '',
                nomSet: null,
                alias: 'item-pierderesistancedivinesupsup'
            }
        ],
    }
    /*******  ac5a8fbe-a38e-4fde-8a5b-dd6c22eea36f  *******/

}