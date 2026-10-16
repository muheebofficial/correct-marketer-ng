/* eslint-disable */
// lib/website-leads/email.js -- sends the welcome email after a website form. Wording lives in lib/website-leads/email-copy.js
const fs = require('fs');
const path = require('path');
const BASE = require('./email-copy');
const cfg = require('./config').email || {};

const FROM_NAME = cfg.fromName || 'Muheeb Sulaiman';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const from = () => FROM_NAME + ' <' + process.env.FROM_EMAIL + '>';
const FREE_MAIL = /@(gmail|googlemail|yahoo|outlook|hotmail|live|icloud|proton|protonmail)\./i;

async function resend(payload) {
    const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error('resend ' + r.status + ': ' + (await r.text()));
    return r.json();
}

const copyFor = (lead) => ({ ...BASE, ...((BASE.sources || {})[lead.source] || {}) });
const fill = (t, lead) => String(t).replace(/\{firstName\}/g, lead.firstName).replace(/\{lastName\}/g, lead.lastName).replace(/\{business\}/g, lead.business || '');

function waLink(lead, C) {
    let n = String(process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    if (!n) return null;
    if (n.startsWith('0')) n = '234' + n.slice(1);
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(fill(C.waMessage, lead));
}

function buildWelcome(lead) {
    const C = copyFor(lead);
    const f = (t) => esc(fill(t, lead));
    const wa = waLink(lead, C);
    const btn = (href, label, bg) => '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:14px 0 6px"><tr><td style="background:' + bg + ';border-radius:8px"><a href="' + esc(href) + '" style="display:inline-block;padding:14px 26px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none">' + f(label) + ' &rarr;</a></td></tr></table>';
    const guide = C.guideTitle ? '<div style="background:#F7F4EC;border-left:4px solid #C8850A;padding:14px 16px;margin:22px 0"><b>' + f(C.guideTitle) + '</b><br>' + f(C.guideText) + btn(C.guideUrl, C.guideButton, '#0B4D2C') + '</div>' : '';
    const whatsapp = wa
        ? '<p style="margin:22px 0 0"><b>' + f(C.askLine) + '</b></p>' + btn(wa, C.buttonLabel, '#168A47')
        : '<p style="margin:22px 0"><b>' + f(C.replyOnly) + '</b></p>';

    const html =
        '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' + f(C.preheader) + '</div>' +
        '<div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#17171B;line-height:1.6;font-size:16px">' +
        '<div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div>' +
        '<div style="padding:26px"><h1 style="font-size:24px;line-height:1.25;margin:0 0 14px;color:#0B4D2C">' + f(C.headline) + '</h1>' +
        '<p>' + f(C.intro) + '</p>' +
        (lead.challenge && C.challengeLabel ? '<div style="background:#F7F4EC;border-left:4px solid #C8850A;padding:14px 16px;margin:18px 0"><b>' + f(C.challengeLabel) + '</b><br><i>&ldquo;' + esc(lead.challenge) + '&rdquo;</i><br><span style="color:#55555C;font-size:14px">' + f(C.challengeNote) + '</span></div>' : '') +
        '<p style="margin-bottom:6px"><b>' + f(C.nextTitle) + '</b></p><ol style="margin-top:0;padding-left:22px">' + C.nextSteps.map((s) => '<li><b>' + f(s[0]) + '</b> ' + f(s[1]) + '</li>').join('') + '</ol>' +
        '<p style="margin-bottom:6px"><b>' + f(C.pitchTitle) + '</b></p><ul style="margin-top:0;padding-left:22px">' + C.pitchList.map((i) => '<li>' + f(i) + '</li>').join('') + '</ul>' +
        guide + whatsapp +
        '<p style="margin-top:24px">' + f(C.signatureName) + '<br>' + f(C.signatureTitle) + '<br><a href="' + esc(C.siteUrl) + '" style="color:#0B4D2C">' + f(C.siteLabel) + '</a></p>' +
        '<p style="font-size:12px;color:#8A8A92;border-top:1px solid #DDD6C3;padding-top:14px;margin-top:26px">You received this email because you filled in a form at ' + f(C.siteLabel) + '. ' + f(C.optOut) + '<br>&copy; Correct Marketer NG &middot; ' + f(C.siteLabel) + '</p>' +
        '</div></div>';

    const text = [
        'Hi ' + lead.firstName + ',', '', fill(C.intro, lead), '',
        ...(lead.challenge && C.challengeLabel ? [fill(C.challengeLabel, lead) + ' "' + lead.challenge + '"', fill(C.challengeNote, lead), ''] : []),
        fill(C.nextTitle, lead), ...C.nextSteps.map((s, i) => (i + 1) + '. ' + fill(s[0], lead) + ' ' + fill(s[1], lead)), '',
        fill(C.pitchTitle, lead), ...C.pitchList.map((i) => '- ' + fill(i, lead)), '',
        ...(C.guideTitle ? [fill(C.guideTitle, lead), fill(C.guideText, lead), C.guideUrl, ''] : []),
        wa ? fill(C.askLine, lead) + ' ' + wa : fill(C.replyOnly, lead), '',
        fill(C.signatureName, lead), fill(C.signatureTitle, lead), C.siteUrl, '',
        '--', 'You received this email because you filled in a form at ' + C.siteLabel + '. ' + fill(C.optOut, lead),
    ].join('\n');
    return { subject: fill(C.subject, lead), html, text, attachment: C.attachment };
}

async function sendWelcome(lead) {
    if (FREE_MAIL.test(process.env.FROM_EMAIL || '')) {
        throw new Error('FROM_EMAIL (' + process.env.FROM_EMAIL + ') is a free-mail address. Resend only sends from a domain you verified in Resend, e.g. hello@yourdomain.com');
    }
    const mail = buildWelcome(lead);
    const payload = { from: from(), to: [lead.email], subject: mail.subject, html: mail.html, text: mail.text, reply_to: process.env.REPLY_TO_EMAIL || undefined };
    if (mail.attachment) {
        const safe = path.basename(mail.attachment); // files must sit directly inside private/
        const p = path.join(process.cwd(), 'private', safe);
        if (!fs.existsSync(p)) throw new Error('Attachment not found: private/' + safe + '. Attachments are optional. To use one in Next.js, commit it in private/ and add outputFileTracingIncludes for /api/subscribe in next.config so private/** is bundled');
        payload.attachments = [{ filename: safe, content: fs.readFileSync(p).toString('base64') }];
    }
    return resend(payload);
}

async function sendOwnerAlert(lead, reason) {
    if (!process.env.NOTIFY_EMAIL) return;
    return resend({
        from: from(), to: [process.env.NOTIFY_EMAIL],
        subject: '[Action needed] Website lead not saved to monday.com: ' + lead.email,
        text: 'The welcome email was sent, but saving to monday.com failed.\nReason: ' + reason + '\n\n' + JSON.stringify(lead, null, 2),
    });
}

module.exports = { sendWelcome, sendOwnerAlert, buildWelcome };
