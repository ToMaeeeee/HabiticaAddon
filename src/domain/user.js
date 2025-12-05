class User {
    constructor(nom, niveau, baseStats, gears, playerClass, buffs) {
        this.nom = nom
        this.niveau = niveau
        this.baseStats = baseStats
        this.gears = gears
        this.playerClass = playerClass
        this.buffs = buffs
    }

    get stats() {
        const gearBonus = this.calculateEquipmentStats();
        const buffBonus = this.getActiveBuffs();
        return {
            str: this.baseStats.str + gearBonus.str,
            con: this.baseStats.con + gearBonus.con,
            int: this.baseStats.int + gearBonus.int,
            per: this.baseStats.per + gearBonus.per
        }
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
            console.log({ gear, bonus: this.calculateGearBonusV2(gear, 'str') });
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

