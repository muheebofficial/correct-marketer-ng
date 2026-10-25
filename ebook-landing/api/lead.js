// api/lead.js -- emails the guide and saves the lead to Google Sheets.
const { randomUUID } = require('crypto');
const { submitLeadToSheet } = require('./_lead-sink');
const { sendGuide, sendOwnerAlert } = require('./_email');

const REQUIRED = ['firstName', 'surname', 'email', 'phone', 'business', 'budget', 'description', 'problem'];
const PHONE_PREFIXES = ['+234', '+233', '+254', '+27', '+44', '+971', '+1'];

function toE164(raw) {
    let phone = String(raw || '').replace(/[^\d+]/g, '');
    if (!phone) return undefined;
    if (phone.startsWith('00')) phone = '+' + phone.slice(2);
    if (phone.startsWith('0')) phone = '+234' + phone.slice(1);
    else if (!phone.startsWith('+')) phone = '+' + phone;
    return PHONE_PREFIXES.some((prefix) => phone.startsWith(prefix)) ? phone : undefined;
}

function lagosTimestamp() {
    const parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let b = req.body || {};
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

    const missing = REQUIRED.filter((k) => !String(b[k] || '').trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email || ''));
    if (missing.length || !emailOk || !b.consent) {
        return res.status(400).json({ error: 'Invalid submission', missing });
    }

    const lead = {
        firstName: String(b.firstName).trim(), surname: String(b.surname).trim(),
        email: String(b.email).trim().toLowerCase(), phone: String(b.phone).trim(),
        business: String(b.business).trim(), budget: String(b.budget).trim(),
        description: String(b.description).trim(), problem: String(b.problem).trim().slice(0, 300), social: String(b.social || '').trim(),
        website: String(b.website || '').trim(), consent: true,
        source: b.source || 'ebook-landing', submittedAt: b.submittedAt || new Date().toISOString(),
    };

    const sheetLead = {
        'Lead ID': randomUUID(),
        Name: `${lead.firstName} ${lead.surname}`.trim(),
        'First name': lead.firstName,
        Company: lead.business,
        Email: lead.email,
        ...(toE164(lead.phone) ? { Phone: toE164(lead.phone) } : {}),
        'Lead Source': 'Ebook landing page',
        Status: 'New Lead',
        'Last interaction': lagosTimestamp(),
        Owner: 'Muheeb Sulaiman',
        'Monthly budget': lead.budget,
        'Problem to solve': lead.problem,
        'About the business': lead.description,
        'Social handle': lead.social,
        Website: lead.website,
        'Consent to contact': lead.consent,
    };

    const [sheet, mail] = await Promise.allSettled([
        submitLeadToSheet('ebook_leads', sheetLead),
        // Ebook landing page form: deliver the existing guide email with PDF attachment.
        sendGuide(lead),
    ]);
    const saved = sheet.status === 'fulfilled' && sheet.value.ok;

    if (!saved) {
        await sendOwnerAlert(lead, 'Sheet submission failed after retry').catch((e) => console.error('owner alert failed:', e.message));
    }
    if (mail.status === 'rejected') {
        console.error('email failed:', mail.reason && mail.reason.message);
    }
    return res.status(200).json({ ok: true, emailed: mail.status === 'fulfilled', saved });
};
