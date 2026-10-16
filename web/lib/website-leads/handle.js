/* eslint-disable */
// lib/website-leads/handle.js -- the core of the website lead forms. One call does two things at the same time:
// sends the welcome email AND saves the lead to monday.com. Called by the Next.js API route.
const { saveWebLead } = require('./monday');
const { sendWelcome, sendOwnerAlert } = require('./email');
const { limits } = require('./config');

const ENV = ['MONDAY_API_TOKEN', 'RESEND_API_KEY', 'FROM_EMAIL'];
const hits = new Map(); // ip -> [timestamps]  (best-effort brake; resets when the server instance restarts)

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);

async function handleSubscribe({ body, ip }) {
    let b = body || {};
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

    // Spam trap: real visitors never fill this hidden field (named hp or fax). Pretend it worked, store nothing.
    if (b.hp || b.fax) return { status: 200, json: { ok: true, emailed: true, saved: true } };

    const key = String(ip || 'unknown');
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < 60000);
    if (recent.length >= ((limits && limits.perMinutePerIp) || 5)) return { status: 429, json: { error: 'too_many' } };
    hits.set(key, [...recent, now]);

    const lead = {
        firstName: clean(b.firstName, 80), lastName: clean(b.lastName, 80),
        email: clean(b.email, 120).toLowerCase(), phone: clean(b.phone, 30),
        source: clean(b.source || b.intent, 60).replace(/[^A-Za-z0-9_-]/g, '') || 'website',
        page: clean(b.page, 200), message: clean(b.message, 1000), business: clean(b.business, 120),
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

    const missingEnv = ENV.filter((k) => !process.env[k]);
    if (missingEnv.length) {
        console.error('Missing environment variables:', missingEnv.join(', '));
        return { status: 500, json: { error: 'not_configured' } };
    }

    const [crm, mail] = await Promise.allSettled([saveWebLead(lead), sendWelcome(lead)]);

    if (crm.status === 'rejected') {
        console.error('monday.com failed:', crm.reason && crm.reason.message);
        await sendOwnerAlert(lead, crm.reason && crm.reason.message).catch((e) => console.error('owner alert failed:', e.message));
    }
    if (mail.status === 'rejected') {
        console.error('email failed:', mail.reason && mail.reason.message);
        return { status: 502, json: { error: 'email_failed', saved: crm.status === 'fulfilled' } };
    }
    return { status: 200, json: { ok: true, emailed: true, saved: crm.status === 'fulfilled' } };
}

module.exports = { handleSubscribe };
