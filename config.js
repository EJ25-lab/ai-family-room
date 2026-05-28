/* ============================================================
   AI FAMILY ROOM — config.js
   EdJustice Collective

   SETUP INSTRUCTIONS:
   1. Deploy your Google Apps Script web app (see README)
   2. Replace SCRIPT_URL with your deployed /exec URL
   3. Replace TOKEN with your chosen shared secret string
   4. Never commit real credentials to a public repo —
      keep this file's TOKEN value simple and rotate if abused.
   ============================================================ */

window.AFR_CONFIG = {

  // Google Apps Script web app URL
  // Deployed: AFR v3 — recovery + welcome emails
  scriptUrl: 'https://script.google.com/macros/s/AKfycbwrSIWcwwL4AiYyOWlUduchszym-hiXTqcePogiQx7d4oqjym66_9voDQBXG6ZCDgkuug/exec',

  // Shared secret — must match the token in doPost() exactly
  token: 'afr-2026-ejc',

  // Site name (used in Sheet rows for source tracking)
  site: 'ai-family-room',

  // Version — increment when you redeploy Apps Script
  version: '1.0.0',

};

/*
  ================================================================
  GOOGLE APPS SCRIPT — paste this into script.google.com
  Deploy as: Execute as ME / Who has access: ANYONE
  ================================================================

  function doPost(e) {
    try {
      var data = JSON.parse(e.postData.contents);

      // Validate token
      if (data.token !== 'afr-placeholder-token') {
        return ContentService.createTextOutput(JSON.stringify({ok:false,err:'invalid token'}))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Reject honeypot
      if (data.honeypot && data.honeypot !== '') {
        return ContentService.createTextOutput(JSON.stringify({ok:false,err:'bot detected'}))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Get sheet
      var ss = SpreadsheetApp.openById('YOUR_GOOGLE_SHEET_ID');

      // Route by type
      if (data.type === 'signup') {
        var sheet = ss.getSheetByName('Signups');
        sheet.appendRow([
          new Date(),
          data.name || '',
          data.email || '',
          data.installation || '',
          data.source || '',
          data.interest || ''
        ]);
      }

      if (data.type === 'mission_complete') {
        var sheet = ss.getSheetByName('MissionsCompleted');
        sheet.appendRow([
          new Date(),
          data.email || '',
          data.missionId || '',
          data.missionTitle || '',
          data.badgeEarned || '',
          data.xpTotal || 0
        ]);

        if (data.badgeEarned) {
          var bsheet = ss.getSheetByName('BadgesEarned');
          bsheet.appendRow([
            new Date(),
            data.email || '',
            data.badgeEarned,
            data.name || '',
            data.installation || ''
          ]);
        }
      }

      if (data.type === 'future_interest') {
        var sheet = ss.getSheetByName('FutureInterest');
        sheet.appendRow([
          new Date(),
          data.email || '',
          data.installation || '',
          data.interest || '',
          data.name || ''
        ]);
      }

      return ContentService.createTextOutput(JSON.stringify({ok:true}))
        .setMimeType(ContentService.MimeType.JSON);

    } catch(err) {
      // Log errors to a separate sheet — never return error details to client
      try {
        var errSheet = SpreadsheetApp.openById('YOUR_GOOGLE_SHEET_ID').getSheetByName('Errors');
        if (errSheet) errSheet.appendRow([new Date(), err.message]);
      } catch(e2) {}

      return ContentService.createTextOutput(JSON.stringify({ok:false}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  ================================================================
  GOOGLE SHEET SETUP — create these 5 tabs:
  ================================================================

  Tab: Signups
  Headers: Timestamp | Name | Email | Installation | Source | SessionInterest

  Tab: MissionsCompleted
  Headers: Timestamp | Email | MissionID | MissionTitle | BadgeEarned | XPTotal

  Tab: BadgesEarned
  Headers: Timestamp | Email | BadgeName | Name | Installation

  Tab: FutureInterest
  Headers: Timestamp | Email | Installation | Interest | Name

  Tab: Errors
  Headers: Timestamp | Error

  ================================================================
*/
