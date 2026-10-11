// api/_email.js -- emails the ebook (PDF attached) through Resend
const fs = require('fs');
const path = require('path');
const { email: E } = require('./_config');

const esc = (s) => String(s).replace(/[&<>\"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const from = () => E.fromName + ' <' + process.env.FROM_EMAIL + '>';
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

// WhatsApp link with a pre-filled message. Set WHATSAPP_NUMBER (digits, with country code) in Vercel.
function waLink(lead) {
    let n = String(process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    if (!n) return null;
    if (n.startsWith('0')) n = '234' + n.slice(1);
    const msg = 'Hi, I just downloaded your guide. I am ' + lead.firstName + ' from ' + lead.business + '. My biggest challenge: ' + String(lead.problem || '').slice(0, 200);
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg);
}

function buildEmail(lead) {
    const n = esc(lead.firstName);
    const wa = waLink(lead);
    const site = E.siteLabel;
    const subject = E.subject.replace('{firstName}', lead.firstName);

    const button = wa
        ? '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:18px 0 6px"><tr><td style="background:#168A47;border-radius:8px"><a href="' + esc(wa) + '" style="display:inline-block;padding:15px 28px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none">Chat with us on WhatsApp &rarr;</a></td></tr></table>'
        : '<p style="margin:16px 0"><b>Simply reply to this email</b> with your biggest challenge.</p>';

    const html =
        '<div style="display:none;max-height:0;overflow:hidden;opacity:0">Your guide is attached. Here is the fastest way to use it.</div>' +
        '<div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#17171B;line-height:1.6;font-size:16px">' +
        '<div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div>' +
        '<div style="padding:26px">' +
        '<h1 style="font-size:24px;line-height:1.25;margin:0 0 14px;color:#0B4D2C">Your guide is attached, ' + n + '.</h1>' +
        '<p>Thank you for requesting <b>The Nigerian Business Guide to Agentic AI Automation</b>. Open the PDF attached to this email.</p>' +
        '<div style="background:#F7F4EC;border-left:4px solid #C8850A;padding:14px 16px;margin:18px 0"><b>You told us your biggest challenge:</b><br><i>&ldquo;' + esc(lead.problem) + '&rdquo;</i><br><span style="color:#55555C;font-size:14px">Keep it in mind as you read. The 7 principles are built to fix problems like this.</span></div>' +
        '<p>Here is why this matters: <b>67% of Nigerian MSMEs saw demand fall over two years</b> (PwC, 2024). The businesses that win are the ones that convert more of the leads they already pay for.</p>' +
        '<p style="margin-bottom:6px"><b>Read it in this order (about 15 minutes):</b></p>' +
        '<ol style="margin-top:0;padding-left:22px"><li><b>The Readiness Scorecard.</b> See where you stand in 2 minutes.</li><li><b>Principles 1 and 3.</b> Pick the one process worth fixing first, and see how Nigerian customers actually buy.</li><li><b>The 30-Day Roadmap.</b> Your week-by-week plan.</li></ol>' +
        '<hr style="border:0;border-top:1px solid #DDD6C3;margin:26px 0">' +
        '<h2 style="font-size:19px;margin:0 0 8px;color:#0B4D2C">Want us to look at it with you?</h2>' +
        '<p>Knowing the problem is the easy part. Building the system that fixes it, without lost leads or wasted ad spend, is where most businesses get stuck. We build exactly that:</p>' +
        '<ul style="padding-left:22px"><li>WhatsApp and CRM follow-up automation</li><li>Websites and landing pages that convert</li><li>SEO and paid ads that bring in qualified leads</li></ul>' +
        '<p><b>Message us your biggest challenge and we will tell you the first thing we would fix.</b></p>' +
        button +
        (wa ? '<p style="font-size:14px;color:#55555C;margin-top:8px">Or just reply to this email.</p>' : '') +
        '<p style="margin-top:24px">Muheeb Sulaiman<br>AI Growth Architect, Correct Marketer NG<br><a href="' + esc(E.siteUrl) + '" style="color:#0B4D2C">' + esc(site) + '</a></p>' +
        '<p style="margin-top:18px"><b>P.S.</b> Every day a lead waits for a reply, it gets colder. Message us today and let&rsquo;s fix your follow-up first.</p>' +
        '<p style="font-size:12px;color:#8A8A92;border-top:1px solid #DDD6C3;padding-top:14px;margin-top:26px">You received this email because you requested the guide at ' + esc(E.pageUrl) + '. To stop hearing from us, reply with &ldquo;unsubscribe&rdquo;.<br>&copy; Correct Marketer NG &middot; ' + esc(site) + '</p>' +
        '</div></div>';

    const text = 'Hi ' + lead.firstName + ',\n\n' +
        'Thank you for requesting The Nigerian Business Guide to Agentic AI Automation. Your copy is attached as a PDF.\n\n' +
        'You told us your biggest challenge: "' + lead.problem + '"\nKeep it in mind as you read. The 7 principles are built to fix problems like this.\n\n' +
        '67% of Nigerian MSMEs saw demand fall over two years (PwC, 2024). The businesses that win convert more of the leads they already pay for.\n\n' +
        'Read it in this order (about 15 minutes):\n1. The Readiness Scorecard\n2. Principles 1 and 3\n3. The 30-Day Roadmap\n\n' +
        'Want us to look at it with you? We build WhatsApp and CRM follow-up automation, websites and landing pages that convert, and SEO and paid ads that bring in qualified leads.\n' +
        'Message us your biggest challenge and we will tell you the first thing we would fix.\n' +
        (wa ? 'WhatsApp: ' + wa + '\n' : 'Just reply to this email.\n') +
        '\nMuheeb Sulaiman\nAI Growth Architect, Correct Marketer NG\n' + E.siteUrl + '\n\n' +
        'P.S. Every day a lead waits for a reply, it gets colder. Message us today and let\'s fix your follow-up first.\n\n' +
        '--\nYou received this email because you requested the guide at ' + E.pageUrl + '. To stop hearing from us, reply with "unsubscribe".\n';
    return { subject, html, text };
}

async function sendGuide(lead) {
    if (FREE_MAIL.test(process.env.FROM_EMAIL || '')) {
        throw new Error('FROM_EMAIL (' + process.env.FROM_EMAIL + ') is a free-mail address. Resend only sends from a domain you verified in Resend, e.g. guide@yourdomain.com');
    }
    const pdfPath = path.join(process.cwd(), 'private', E.attachmentName);
    if (!fs.existsSync(pdfPath)) {
        throw new Error('PDF not found at ' + pdfPath + '. Commit private/' + E.attachmentName + ' and keep includeFiles "private/**" for api/lead.js in vercel.json');
    }
    const mail = buildEmail(lead);
    return resend({
        from: from(), to: [lead.email], subject: mail.subject, html: mail.html, text: mail.text,
        reply_to: process.env.REPLY_TO_EMAIL || undefined,
        attachments: [{ filename: E.attachmentName, content: fs.readFileSync(pdfPath).toString('base64') }],
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

module.exports = { sendGuide, sendOwnerAlert, buildEmail };
