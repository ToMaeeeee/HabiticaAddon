function loggerGgsheetGas(message) {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(LOGS_SHEET_NAME);

    const last = sheet.getLastRow();     // last row containing data
    const nextRow = last + 1;            // first empty row

    sheet.getRange(nextRow, 1).setValue(message);
}