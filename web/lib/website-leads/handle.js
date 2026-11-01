/* eslint-disable */
// lib/website-leads/handle.js -- validates website leads and coordinates sheet and email delivery.
const { randomUUID } = require('crypto');
const { sendWelcome, sendOwnerAlert } = require('./email');
const { limits, phone } = require('./config');

const hits = new Map(); // ip -> [timestamps]  (best-effort brake; resets when the server instance restarts)

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);

function toE164(raw) {
    let value = String(raw || '').replace(/[^\d+]/g, '');
    if (!value) return null;
    if (value.startsWith('00')) value = '+' + value.slice(2);
    if (value.startsWith('0')) {
        const countryCode = (phone.phoneCountries.find(([, country]) => country === phone.defaultCountry) || ['+234'])[0];
        value = countryCode + value.slice(1);
    } else if (!value.startsWith('+')) value = '+' + value;
    return phone.phoneCountries.some(([prefix]) => value.startsWith(prefix)) ? value : null;
}

function lagosTimestamp() {
    const parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
}

async function handleSubscribe({ body, ip, submitLeadToSheet }) {
    let b = body || {};
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

    // Spam trap: real visitors never fill this hidden field (named hp or fax). Pretend it worked, store nothing.
    if (b.hp || b.fax) return { status: 200, json: { ok: true, emailed: true, saved: true } };

    const key = String(ip || 'unknown');
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < 60000);
    if (recent.length >= ((limits && limits.perMinutePerIp) || 5)) return { status: 429, json: { error: 'too_many' } };
    hits.set(key, [...recent, now]);

    const page = clean(b.page || b.page_path || b.page_url, 200);
    const contextBits = [];
    if (b.service_name) contextBits.push(`Service: ${clean(b.service_name, 120)}`);
    if (b.service_group) contextBits.push(`Group: ${clean(b.service_group, 120)}`);
    if (b.service_slug) contextBits.push(`Slug: ${clean(b.service_slug, 120)}`);
    if (b.page_title) contextBits.push(`Page title: ${clean(b.page_title, 200)}`);
    if (b.referrer) contextBits.push(`Referrer: ${clean(b.referrer, 200)}`);
    const utmValues = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
        .map((key) => [key, clean(b[key], 120)])
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value}`);
    if (utmValues.length) contextBits.push(`UTM: ${utmValues.join(' | ')}`);

    const lead = {
        firstName: clean(b.firstName, 80), lastName: clean(b.lastName, 80),
        email: clean(b.email, 120).toLowerCase(), phone: clean(b.phone, 30),
        source: clean(b.source || b.intent, 60).replace(/[^A-Za-z0-9_-]/g, '') || 'website',
        page,
        message: clean([b.message, contextBits.join(' | ')].filter(Boolean).join(' | '), 1000),
        business: clean(b.business, 120),
        website: clean(b.website, 200), businessType: clean(b.business_type || b.businessType, 100),
        challenge: clean(b.challenge, 1000), budget: clean(b.budget, 100),
        preferredContact: clean(b.preferred_contact || b.preferredContact, 60),
        attribution: b.attribution ? clean(typeof b.attribution === 'string' ? b.attribution : JSON.stringify(b.attribution), 1500) : '',
        consent: b.consent === true || b.consent === 'on', submittedAt: new Date().toISOString(),
    };

    const bad = [];
    if (!lead.firstName) bad.push('firstName');
    if (!lead.lastName) bad.push('lastName');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) bad.push('email');
    const digitCount = lead.phone.replace(/\D/g, '').length;
    if (digitCount < 7 || digitCount > 15) bad.push('phone');
    if (bad.length) return { status: 400, json: { error: 'invalid', fields: bad } };

    const sheetLead = {
        'Lead ID': randomUUID(),
        Name: `${lead.firstName} ${lead.lastName}`.trim(),
        'First name': lead.firstName,
        'Last name': lead.lastName,
        Email: lead.email,
        ...(toE164(lead.phone) ? { Phone: toE164(lead.phone) } : {}),
        'Form source': lead.source,
        Page: lead.page,
        Submitted: lagosTimestamp(),
        'Lead status': 'New',
        Consent: lead.consent,
        Owner: 'Muheeb Sulaiman',
        Business: lead.business,
        Website: lead.website,
        'Business type': lead.businessType,
        Challenge: lead.challenge,
        Budget: lead.budget,
        'Preferred contact': lead.preferredContact,
        Message: lead.message,
        Attribution: lead.attribution,
    };
    const [sheet, mail] = await Promise.allSettled([
        submitLeadToSheet('website_leads', sheetLead),
        // Website contact and audit forms: send the existing welcome email.
        sendWelcome(lead),
    ]);
    const saved = sheet.status === 'fulfilled' && sheet.value.ok;

    if (!saved) {
        const reason = sheet.status === 'rejected' ? 'Sheet submission failed' : 'Sheet submission failed after retry';
        await sendOwnerAlert(lead, reason).catch((e) => console.error('owner alert failed:', e.message));
    }
    if (mail.status === 'rejected') {
        console.error('email failed:', mail.reason && mail.reason.message);
    }
    return { status: 200, json: { ok: true, emailed: mail.status === 'fulfilled', saved } };
}

module.exports = { handleSubscribe };
