//déclenché quand clic sur boutton d'un nouvel équipement 
class UpdateSpecialEquipPopUp {
    constructor(pidLoadSpecialEquipement, pidUpdateSpecialEquipPopUpOnHabitica) {
        this.pidLoadSpecialEquipement = pidLoadSpecialEquipement
        this.pidUpdateSpecialEquipPopUpOnHabitica = pidUpdateSpecialEquipPopUpOnHabitica
        //vide pour le moment
    }
    handle() {
        const specialEquipement = this.pidLoadSpecialEquipement()
        const popUp = new PopUp("specialequipementeffectpopup", "**Votre Equipement Spécial**", specialEquipement.getDescription())
        //détuire (sauf si on joue avec le même id)

        //construire (push)
        //new HabiticaAPI().createNewPopup(popUp)
        this.pidUpdateSpecialEquipPopUpOnHabitica(popUp)
        //HabiticaAPI().createNewPopupifAlreadyExist(popUp)

    }
}

