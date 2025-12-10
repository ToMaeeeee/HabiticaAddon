//CECI EST MIS DANS L'INFRA PARCE QUE L'INFRA, c'est ce qui deal avec l'EXTERIEUR
//====================================================================
//====================================================================
//====================================================================

class HabiticaAPI {

  createNewTaskForUser(task) { //Cest une méthode
    const habiticaTask = this.taskMapperMoivsHabitica(task)
    var params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaTask), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    var url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }

  //fonction qui affiche nos infos dans le shop

  createNewPopupifAlreadyExist(popUp) {
    const habiticaPopUp = this.popUpMapperMoivsHabitica(popUp)
    var params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaPopUp), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    const rewards = getAllRewards()
    const previousPopUp = rewards.find(t => t.alias === popUp.id)
    //[]

    //detruire :
    if (previousPopUp) deleteTask(previousPopUp.id)


    var url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }



  createNewPopup(popUp) {
    const habiticaPopUp = this.popUpMapperMoivsHabitica(popUp)
    var params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaPopUp), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    var url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }


  createNewItemsShop(item) {
    const habiticaReward = this.itemMapperMoivsHabiticaReward(item)
    var params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaReward), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    var url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }



  //-----------------------MAPPERS----MOI VERS HABITICA-----------------------------------------------------------------

  taskMapperMoivsHabitica(task) {
    //doit renvoyer la forme que habitica doit avoir
    return {
      alias: task.id,
      type: "habit",
      text: task.title,
      notes: task.subtitle,
      priority: 1,
      //value: 30,
    }
  }

  popUpMapperMoivsHabitica(popUp) {
    return {
      alias: popUp.id,
      type: "reward",
      text: popUp.title,
      notes: popUp.description,
      value: 0  // facultatif, Habitica l'utilise comme prix en pièces d'or si "price" n'est pas fourni
    }
  }

  itemMapperMoivsHabiticaReward(item) {
    return {
      alias: item.alias,
      type: "reward",
      text: "**" + item.name + " (" + item.rarity + ")" + "**",
      notes: item.effect,
      value: item.price  // facultatif, Habitica l'utilise comme prix en pièces d'or si "price" n'est pas fourni
    }
  }

}