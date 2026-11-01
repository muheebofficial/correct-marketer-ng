# Google Sheets webhook update

The website lead handler already sends the fields used by the existing intake form. To keep the same pipeline while supporting service and hub page context, append the incoming keys below to the Google Sheet row and map them by column name.

```javascript
function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  const secret = payload.secret;
  const sheetName = payload.sheet || 'website_leads';
  const lead = payload.lead || {};

  if (secret !== PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET')) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' })).setMimeType(ContentService.MimeType.JSON);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName) || ss.getSheetByName('website_leads');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'sheet_not_found' })).setMimeType(ContentService.MimeType.JSON);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = [];
  const appendValue = (name, fallback = '') => {
    const idx = headers.findIndex((header) => String(header).trim() === String(name).trim());
    if (idx === -1) return;
    row[idx] = lead[name] ?? fallback;
  };

  appendValue('Lead ID');
  appendValue('Name');
  appendValue('First name');
  appendValue('Last name');
  appendValue('Email');
  appendValue('Phone');
  appendValue('Form source');
  appendValue('Page');
  appendValue('Submitted');
  appendValue('Lead status');
  appendValue('Consent');
  appendValue('Owner');
  appendValue('Business');
  appendValue('Website');
  appendValue('Business type');
  appendValue('Challenge');
  appendValue('Budget');
  appendValue('Preferred contact');
  appendValue('Message');
  appendValue('Attribution');

  appendValue('service_slug');
  appendValue('service_name');
  appendValue('service_group');
  appendValue('page_url');
  appendValue('page_title');
  appendValue('page_path');
  appendValue('referrer');
  appendValue('utm_source');
  appendValue('utm_medium');
  appendValue('utm_campaign');
  appendValue('utm_term');
  appendValue('utm_content');

  const nextRow = headers.map((_, i) => row[i] ?? '');
  sheet.appendRow(nextRow);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

If the sheet already has fixed columns, add the new headers at the end and keep the original row mapping intact. Unknown keys are ignored by design, but the service-page context is still preserved in the `message` field and the standard `Form source` / `Page` values.
