//déclenché quand clic sur boutton d'un nouvel équipement 
class UpdateSpecialEquipPopUp {
    constructor(pidLoadSpecialEquipement) {
        this.pidLoadSpecialEquipement = pidLoadSpecialEquipement
        //vide pour le moment
    }
    handle() {
        const specialEquipement = this.pidLoadSpecialEquipement()
        const popUp = new PopUp("id", "titre", "description")
        //détuire (sauf si on joue avec le même id)

        //construire (push)


    }
}

