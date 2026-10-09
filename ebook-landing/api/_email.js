// api/_email.js -- emails the ebook (PDF attached) through Resend
const fs = require('fs');
const path = require('path');
const { email: E } = require('./_config');

const esc = (s) => String(s).replace(/[&<>\"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const from = () => E.fromName + ' <' + process.env.FROM_EMAIL + '>';

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

async function sendGuide(lead) {
    const file = fs.readFileSync(path.join(process.cwd(), 'private', E.attachmentName)).toString('base64');
    const n = esc(lead.firstName);
    const html = '<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#17171B;line-height:1.6">' +
        '<div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div>' +
        '<div style="padding:26px"><p>Hi ' + n + ',</p>' +
        '<p>Thank you for requesting <b>The Nigerian Business Guide to Agentic AI Automation</b>. Your copy is attached to this email as a PDF.</p>' +
        '<p><b>Start here:</b></p><ol><li>Take the 7 Principles Readiness Scorecard to see where you stand.</li>' +
        '<li>Pick the one process that costs you the most leads or time.</li>' +
        '<li>Follow the 30-day roadmap to launch one narrow, working system.</li></ol>' +
        '<p>Not sure which WhatsApp conversation is costing you the most sales? Just reply to this email and tell me about it.</p>' +
        '<p>Muheeb Sulaiman<br>AI Growth Architect, Correct Marketer NG<br>muheebsulaiman.com</p></div></div>';
    const text = 'Hi ' + lead.firstName + ',\n\nThank you for requesting The Nigerian Business Guide to Agentic AI Automation. Your copy is attached as a PDF.\n\n' +
        'Start here:\n1. Take the 7 Principles Readiness Scorecard.\n2. Pick the one process that costs you the most leads or time.\n3. Follow the 30-day roadmap.\n\n' +
        'Not sure which WhatsApp conversation is costing you the most sales? Reply to this email and tell me about it.\n\nMuheeb Sulaiman\nAI Growth Architect, Correct Marketer NG\nmuheebsulaiman.com\n';
    return resend({
        from: from(), to: [lead.email], subject: E.subject, html, text,
        reply_to: process.env.REPLY_TO_EMAIL || undefined,
        attachments: [{ filename: E.attachmentName, content: file }],
    });
}

// If monday.com fails, email the lead's details to you so nothing is lost.
async function sendOwnerAlert(lead, reason) {
    if (!process.env.NOTIFY_EMAIL) return;
    return resend({
        from: from(), to: [process.env.NOTIFY_EMAIL],
        subject: '[Action needed] Lead not saved to monday.com: ' + lead.email,
        text: 'The guide was emailed, but saving to monday.com failed.\nReason: ' + reason + '\n\n' + JSON.stringify(lead, null, 2),
    });
}

module.exports = { sendGuide, sendOwnerAlert };
