const SHEET_NAME = "RSVP";
const SPREADSHEET_ID = "";
const HEADERS = [
  "Timestamp",
  "Event Name",
  "Full Name",
  "Phone",
  "Email",
  "Attendance",
  "Guests",
  "Relationship",
  "Message",
  "Submitted At",
];

function doPost(e) {
  const sheet = getRsvpSheet();
  const data = e.parameter;

  sheet.appendRow([
    new Date(),
    data.eventName || "",
    data.fullName || "",
    data.phone || "",
    data.email || "",
    data.attendance || "",
    data.guests || "",
    data.relationship || "",
    data.message || "",
    data.submittedAt || "",
  ]);

  return jsonResponse({ success: true });
}

function getRsvpSheet() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
