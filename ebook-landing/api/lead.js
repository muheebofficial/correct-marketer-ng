// api/lead.js -- one click does two things: emails the guide AND saves the lead to monday.com
const { saveToMonday } = require('./_monday');
const { sendGuide, sendOwnerAlert } = require('./_email');

const REQUIRED = ['firstName', 'surname', 'email', 'phone', 'business', 'budget', 'description', 'problem'];
const ENV = ['MONDAY_API_TOKEN', 'RESEND_API_KEY', 'FROM_EMAIL'];

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let b = req.body || {};
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

    const missing = REQUIRED.filter((k) => !String(b[k] || '').trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(b.email || ''));
    if (missing.length || !emailOk || !b.consent) {
        return res.status(400).json({ error: 'Invalid submission', missing });
    }

    const missingEnv = ENV.filter((k) => !process.env[k]);
    if (missingEnv.length) {
        console.error('Missing environment variables:', missingEnv.join(', '));
        return res.status(500).json({ error: 'Server not configured' });
    }

    const lead = {
        firstName: String(b.firstName).trim(), surname: String(b.surname).trim(),
        email: String(b.email).trim().toLowerCase(), phone: String(b.phone).trim(),
        business: String(b.business).trim(), budget: String(b.budget).trim(),
        description: String(b.description).trim(), problem: String(b.problem).trim().slice(0, 300), social: String(b.social || '').trim(),
        website: String(b.website || '').trim(), consent: true,
        source: b.source || 'ebook-landing', submittedAt: b.submittedAt || new Date().toISOString(),
    };

    // Both actions start at the same time.
    const [crm, mail] = await Promise.allSettled([saveToMonday(lead), sendGuide(lead)]);

    if (crm.status === 'rejected') {
        console.error('monday.com failed:', crm.reason && crm.reason.message);
        await sendOwnerAlert(lead, crm.reason && crm.reason.message).catch((e) => console.error('owner alert failed:', e.message));
    }
    if (mail.status === 'rejected') {
        console.error('email failed:', mail.reason && mail.reason.message);
        return res.status(502).json({ error: 'email_failed', saved: crm.status === 'fulfilled' });
    }
    return res.status(200).json({ ok: true, emailed: true, saved: crm.status === 'fulfilled' });
};
