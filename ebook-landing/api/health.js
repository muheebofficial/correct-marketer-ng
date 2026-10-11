// api/health.js -- private diagnostics. Open:  /api/health?token=YOUR_HEALTH_TOKEN
// Returns 404 unless HEALTH_TOKEN is set in Vercel and matches. Delete this file when you no longer need it.
const fs = require('fs');
const path = require('path');
const { monday: M, email: E } = require('./_config');

module.exports = async (req, res) => {
    const token = process.env.HEALTH_TOKEN;
    if (!token || (req.query && req.query.token) !== token) return res.status(404).json({ error: 'Not found' });

    const checks = {};
    const add = (name, pass, detail) => { checks[name] = { pass: !!pass, detail }; };

    // 1. environment variables (values are never shown)
    for (const k of ['MONDAY_API_TOKEN', 'RESEND_API_KEY', 'FROM_EMAIL']) add('env ' + k, process.env[k], process.env[k] ? 'set' : 'MISSING: add it in Vercel (Production) and redeploy');
    for (const k of ['REPLY_TO_EMAIL', 'NOTIFY_EMAIL', 'WHATSAPP_NUMBER']) add('env ' + k + ' (optional)', true, process.env[k] ? 'set' : (k === 'WHATSAPP_NUMBER' ? 'not set: the WhatsApp button will be left out of the email' : 'not set'));

    // 2. the PDF that gets attached
    const pdf = path.join(process.cwd(), 'private', E.attachmentName);
    if (fs.existsSync(pdf)) add('PDF bundled with the function', true, fs.statSync(pdf).size + ' bytes');
    else {
        let listing = 'private/ folder not found';
        try { listing = 'private/ contains: ' + (fs.readdirSync(path.join(process.cwd(), 'private')).join(', ') || '(empty)'); } catch (e) { /* ignore */ }
        add('PDF bundled with the function', false, 'Missing ' + E.attachmentName + '. ' + listing + '. Commit the PDF (check .gitignore) and keep includeFiles "private/**" for api/lead.js in vercel.json');
    }

    // 3. email sender: a real send to Resend's test inbox (no real person is emailed)
    const from = process.env.FROM_EMAIL || '';
    if (/@(gmail|googlemail|yahoo|outlook|hotmail|live|icloud|proton|protonmail)\./i.test(from)) {
        add('FROM_EMAIL is on a verified domain', false, from + ' is a free-mail address. Resend only sends from a domain you verified, e.g. guide@yourdomain.com');
    } else if (process.env.RESEND_API_KEY && from) {
        try {
            const r = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: E.fromName + ' <' + from + '>', to: ['delivered@resend.dev'], subject: 'Health check', text: 'Health check from the landing page.' }),
                signal: AbortSignal.timeout(8000),
            });
            const body = await r.text();
            add('Resend accepts mail from FROM_EMAIL', r.ok, r.ok ? 'OK' : 'Resend ' + r.status + ': ' + body.slice(0, 300));
            if (r.ok && /@resend\.dev$/i.test(from)) add('Sender is a test address', false, 'onboarding@resend.dev only delivers to your own Resend account email. Verify your domain to email visitors');
        } catch (e) { add('Resend accepts mail from FROM_EMAIL', false, 'Request failed: ' + e.message); }
    }

    // 4. monday.com: token, board, and that every configured column ID exists
    if (process.env.MONDAY_API_TOKEN) {
        try {
            const r = await fetch('https://api.monday.com/v2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: String(process.env.MONDAY_API_TOKEN || '').trim().replace(/^['"]+|['"]+$/g, '').trim().replace(/^bearer\s+/i, ''), 'API-Version': M.apiVersion },
                body: JSON.stringify({ query: 'query ($b: [ID!]) { me { name } boards(ids: $b) { name columns { id } groups { id } } }', variables: { b: [M.boardId] } }),
                signal: AbortSignal.timeout(8000),
            });
            const j = await r.json().catch(() => ({}));
            const board = j.data && j.data.boards && j.data.boards[0];
            if (j.errors || !board) add('monday.com token and board', false, 'monday ' + r.status + ': ' + JSON.stringify(j.errors || j.error_message || 'board not found or no access').slice(0, 300));
            else {
                add('monday.com token and board', true, 'Connected as ' + j.data.me.name + ', board "' + board.name + '"');
                const have = new Set(board.columns.map((c) => c.id).concat('name'));
                const missing = Object.entries(M.columns).filter(([, id]) => id && !have.has(id)).map(([k, id]) => k + '=' + id);
                add('monday.com column IDs in _config.js exist', !missing.length, missing.length ? 'Not found on the board: ' + missing.join(', ') : 'all found');
                const gid = M.groupId; add('monday.com group "' + gid + '" exists', board.groups.some((g) => g.id === gid), board.groups.some((g) => g.id === gid) ? 'found' : 'Not found. Groups on the board: ' + board.groups.map((g) => g.id).join(', '));
            }
        } catch (e) { add('monday.com token and board', false, 'Request failed: ' + e.message); }
    }

    const allPass = Object.values(checks).every((c) => c.pass);
    return res.status(200).json({ allPass, node: process.version, checks });
};
