const SHEETS = new Set(['website_leads', 'ebook_leads']);

async function postLead(sheet, lead) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return { ok: false, retry: false, reason: 'missing_env' };

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, sheet, lead }),
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });
  } catch (_) {
    return { ok: false, retry: true, reason: 'network_error' };
  }

  if (response.status >= 500) return { ok: false, retry: true, reason: `http_${response.status}` };
  let payload;
  try {
    payload = JSON.parse(await response.text());
  } catch (_) {
    return { ok: false, retry: true, reason: 'non_json' };
  }
  if (!payload || typeof payload !== 'object' || !('ok' in payload)) {
    return { ok: false, retry: true, reason: 'non_json' };
  }
  if (!response.ok) return { ok: false, retry: false, reason: `http_${response.status}` };
  if (payload.ok === true) return { ok: true, retry: false, reason: 'saved' };
  return { ok: false, retry: false, reason: 'webhook_rejected' };
}

async function submitLeadToSheet(sheet, lead) {
  const leadId = lead && lead['Lead ID'] ? String(lead['Lead ID']) : 'missing_id';
  if (!SHEETS.has(sheet)) {
    console.error(`[lead-sink] ${sheet} ${leadId} failed invalid_sheet`);
    return { ok: false };
  }

  let attempt = await postLead(sheet, lead);
  if (!attempt.ok && attempt.retry) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    attempt = await postLead(sheet, lead);
  }
  console[attempt.ok ? 'info' : 'error'](`[lead-sink] ${sheet} ${leadId} ${attempt.ok ? 'ok' : 'failed'} ${attempt.reason}`);
  return { ok: attempt.ok };
}

module.exports = { submitLeadToSheet };
