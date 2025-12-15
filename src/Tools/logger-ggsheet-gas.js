function loggerGgsheetGas(message) {

    // Pour les webhooks, on utilise Logger.log au lieu du Sheet
    // car SpreadsheetApp peut avoir des problèmes de permissions
    Logger.log(message);
    // On tente quand même d'écrire dans le sheet, mais sans bloquer si ça échoue

    try {
        const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(LOGS_SHEET_NAME);
        const last = sheet.getLastRow();
        const nextRow = last + 1;
        sheet.getRange(nextRow, 1).setValue(message);
    } catch (e) {
        // Si ça échoue, on log l'erreur mais on continue
        Logger.log("⚠️ Impossible d'écrire dans le sheet: " + e.toString());
    }
}