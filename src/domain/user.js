class User {
    constructor(nom, niveau, baseStats, gears, playerClass, buffs) {
        this.nom = nom
        this.niveau = niveau
        this.baseStats = baseStats
        this.gears = gears
        this.playerClass = playerClass
        this.buffs = buffs
    }

    getStats() {
        const gearBonus = this.calculateEquipmentStats();
        const buffBonus = this.getActiveBuffs();
        return {
            str: this.baseStats.str + gearBonus.str + buffBonus.str,
            con: this.baseStats.con + gearBonus.con + buffBonus.con,
            int: this.baseStats.int + gearBonus.int + buffBonus.int,
            per: this.baseStats.per + gearBonus.per + buffBonus.per
        }
    }



    getDiceBonus(additionalDiceBonus) {
        const stats = this.getStats()
        return new Map([
            ["STR", this.convertStatToDiceBonus(stats.str) + additionalDiceBonus.get("STR")],
            ["INT", this.convertStatToDiceBonus(stats.int) + additionalDiceBonus.get("INT")],
            ["PER", this.convertStatToDiceBonus(stats.per) + additionalDiceBonus.get("PER")],
            ["CST", this.convertStatToDiceBonus(stats.con) + additionalDiceBonus.get("CST")],
        ]);
        //Infos{ STR: 0, INT: 3, PER: 1, CST: -3 } (sans les special equipement)
    }


    convertStatToDiceBonus(value) {
        if (value <= 19) return -5;
        if (value <= 39) return -4;
        if (value <= 59) return -3;
        if (value <= 79) return -2;
        if (value <= 99) return -1;
        if (value <= 109) return 0;
        if (value <= 129) return +1;
        if (value <= 149) return +2;
        if (value <= 169) return +3;
        if (value <= 189) return +4;
        if (value <= 209) return +5;
        if (value <= 229) return +6;
        if (value <= 249) return +7;
        if (value <= 269) return +8;
        if (value <= 289) return +9;
        return +10;
    }


    //calculateGearBonusV2(gear, playerClass, stat) {
    //ON n'a plus besoin de gear etc ici, car on peut les avoir avec this !!

    calculateGearBonusV2(gear, statToEvaluate) {
        const baseBonus = gear[statToEvaluate];
        // Si ce n'est pas un équipement de ta classe, pas de bonus
        const isNotSamePlayerClass = !gear.klass || gear.klass !== this.playerClass
        if (isNotSamePlayerClass) {
            // Exception : certains équipements "special" donnent des bonus
            if (gear.klass === "special") {
                const set = gear.set || '';

                // Règle 1 : Les équipements spéciaux numérotés (special-1, special-2, etc.) 
                //           NE donnent PAS de bonus
                if (set.match(/^special-\d+$/)) {
                    return baseBonus; // Pas de bonus
                }

                // Règle 2 : Les équipements saisonniers DONNENT des bonus
                if (set.match(/fall|winter|spring|summer/i)) {
                    const isCorrectKlass = set.includes(this.playerClass);
                    return isCorrectKlass ? Math.floor(baseBonus * 1.5) : basebonus;
                }


            }
            // Pas de bonus pour les équipements d'autres classes
            return baseBonus;
        }

        // C'est un équipement de ta classe : +50%
        return Math.floor(baseBonus * 1.5);
    }



    calculateEquipmentStats() {
        const stats = { str: 0, con: 0, int: 0, per: 0 };
        this.gears.forEach(gear => {
            stats.str += this.calculateGearBonusV2(gear, 'str');
            stats.con += this.calculateGearBonusV2(gear, 'con');
            stats.int += this.calculateGearBonusV2(gear, 'int');
            stats.per += this.calculateGearBonusV2(gear, 'per');
        });
        return stats;
        // {"str":34,"con":22,"int":19,"per":18} Ce qui correspond à la réalité, c'est très bien ! 
    }





    // Récupère les buffs actifs
    getActiveBuffs() {
        const buffs = this.buffs || {};

        return {
            str: buffs.str || 0,
            con: buffs.con || 0,
            int: buffs.int || 0,
            per: buffs.per || 0,
            streaks: buffs.streaks || 0 // Bonus de perfect day
        };
    }

}

