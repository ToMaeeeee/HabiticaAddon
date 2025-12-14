//CECI EST MIS DANS L'INFRA PARCE QUE L'INFRA, c'est ce qui deal avec l'EXTERIEUR
//====================================================================
//====================================================================
//====================================================================

class HabiticaAPI {


  getHabiticaUser() {
    const response = UrlFetchApp.fetch(`${config.HABITICA_BASE_URL}/user`, {
      method: "get",
      headers: config.HEADERS,
      muteHttpExceptions: true
    });

    const habiticaUser = JSON.parse(response.getContentText()).data;

    return habiticaUser
  }

  createNewTaskForUser(task) { //Cest une méthode
    const habiticaTask = this.taskMapperMoivsHabitica(task)
    const params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaTask), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    const url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }

  //fonction qui affiche nos infos dans le shop

  createNewPopupifAlreadyExist(popUp) {
    const habiticaPopUp = this.popUpMapperMoivsHabitica(popUp)
    const params = {
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

    //créer : 
    const url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }



  createNewPopup(popUp) {
    const habiticaPopUp = this.popUpMapperMoivsHabitica(popUp)
    const params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaPopUp), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    const url = config.HABITICA_BASE_URL + config.TASK_URL
    UrlFetchApp.fetch(url, params)
  }


  createNewItemsShop(item) {
    const habiticaReward = this.itemMapperMoivsHabiticaReward(item)
    const params = {
      "method": "post",
      "headers": config.HEADERS,
      "contentType": "application/json",
      "payload": JSON.stringify(habiticaReward), // Rightmost button goes on top
      "muteHttpExceptions": true,
    }

    const url = config.HABITICA_BASE_URL + config.TASK_URL
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



  validateTaskHabitica(taskID) {
    UrlFetchApp.fetch(`https://habitica.com/api/v3/tasks/${taskID}/score/up`, {
      method: "post",
      headers: config.HEADERS,
      muteHttpExceptions: true
    })
  }

  unvalidateTaskHabitica(taskID) {
    UrlFetchApp.fetch(`https://habitica.com/api/v3/tasks/${taskID}/score/down`, {
      method: "post",
      headers: config.HEADERS,
      muteHttpExceptions: true
    })
  }

}