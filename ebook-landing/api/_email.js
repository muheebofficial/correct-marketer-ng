// api/_email.js -- builds and sends the guide email (PDF attached) through Resend.
// To change the WORDS of the email, edit api/_email-copy.js. You rarely need to touch this file.
const fs = require('fs');
const path = require('path');
const C = require('./_email-copy');
const cfg = require('./_config').email || {};

const FROM_NAME = cfg.fromName || 'Muheeb Sulaiman';
const ATTACHMENT = cfg.attachmentName || 'The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf';
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

// Replace {firstName} and {business} in a piece of copy.
const fill = (t, lead) => String(t).replace(/\{firstName\}/g, lead.firstName).replace(/\{business\}/g, lead.business);

// WhatsApp link with a pre-filled message. Set WHATSAPP_NUMBER (digits, with country code) in Vercel.
function waLink(lead) {
  let n = String(process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (!n) return null;
  if (n.startsWith('0')) n = '234' + n.slice(1);
  const msg = fill(C.waMessage, lead) + ' ' + String(lead.problem || '').slice(0, 200);
  return 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg);
}

function buildEmail(lead) {
  const f = (t) => esc(fill(t, lead));
  const wa = waLink(lead);
  const subject = fill(C.subject, lead);

  const button = wa
    ? '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:18px 0 6px"><tr><td style="background:#168A47;border-radius:8px"><a href="' + esc(wa) + '" style="display:inline-block;padding:15px 28px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none">' + f(C.buttonLabel) + ' &rarr;</a></td></tr></table>'
    : '<p style="margin:16px 0"><b>' + f(C.replyOnly) + '</b></p>';

  const html =
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' + f(C.preheader) + '</div>' +
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;color:#17171B;line-height:1.6;font-size:16px">' +
    '<div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div>' +
    '<div style="padding:26px">' +
    '<h1 style="font-size:24px;line-height:1.25;margin:0 0 14px;color:#0B4D2C">' + f(C.headline) + '</h1>' +
    '<p>' + f(C.intro) + '</p>' +
    '<div style="background:#F7F4EC;border-left:4px solid #C8850A;padding:14px 16px;margin:18px 0"><b>' + f(C.problemLabel) + '</b><br><i>&ldquo;' + esc(lead.problem) + '&rdquo;</i><br><span style="color:#55555C;font-size:14px">' + f(C.problemNote) + '</span></div>' +
    '<p>' + f(C.proof) + '</p>' +
    '<p style="margin-bottom:6px"><b>' + f(C.readTitle) + '</b></p>' +
    '<ol style="margin-top:0;padding-left:22px">' + C.readSteps.map((s) => '<li><b>' + f(s[0]) + '</b> ' + f(s[1]) + '</li>').join('') + '</ol>' +
    '<hr style="border:0;border-top:1px solid #DDD6C3;margin:26px 0">' +
    '<h2 style="font-size:19px;margin:0 0 8px;color:#0B4D2C">' + f(C.pitchTitle) + '</h2>' +
    '<p>' + f(C.pitchIntro) + '</p>' +
    '<ul style="padding-left:22px">' + C.pitchList.map((i) => '<li>' + f(i) + '</li>').join('') + '</ul>' +
    '<p><b>' + f(C.pitchAsk) + '</b></p>' +
    button +
    (wa ? '<p style="font-size:14px;color:#55555C;margin-top:8px">' + f(C.replyNote) + '</p>' : '') +
    '<p style="margin-top:24px">' + f(C.signatureName) + '<br>' + f(C.signatureTitle) + '<br><a href="' + esc(C.siteUrl) + '" style="color:#0B4D2C">' + f(C.siteLabel) + '</a></p>' +
    '<p style="margin-top:18px"><b>P.S.</b> ' + f(C.ps) + '</p>' +
    '<p style="font-size:12px;color:#8A8A92;border-top:1px solid #DDD6C3;padding-top:14px;margin-top:26px">You received this email because you requested the guide at ' + f(C.pageUrl) + '. ' + f(C.optOut) + '<br>&copy; Correct Marketer NG &middot; ' + f(C.siteLabel) + '</p>' +
    '</div></div>';

  const text = [
    'Hi ' + lead.firstName + ',', '',
    fill(C.intro, lead), '',
    fill(C.problemLabel, lead) + ' "' + lead.problem + '"', fill(C.problemNote, lead), '',
    fill(C.proof, lead), '',
    fill(C.readTitle, lead), ...C.readSteps.map((s, i) => (i + 1) + '. ' + fill(s[0], lead) + ' ' + fill(s[1], lead)), '',
    fill(C.pitchTitle, lead), fill(C.pitchIntro, lead), ...C.pitchList.map((i) => '- ' + fill(i, lead)), '',
    fill(C.pitchAsk, lead), wa ? fill(C.buttonLabel, lead) + ': ' + wa : fill(C.replyOnly, lead), '',
    fill(C.signatureName, lead), fill(C.signatureTitle, lead), C.siteUrl, '',
    'P.S. ' + fill(C.ps, lead), '',
    '--', 'You received this email because you requested the guide at ' + C.pageUrl + '. ' + fill(C.optOut, lead),
  ].join('\n');

  return { subject, html, text };
}

async function sendGuide(lead) {
  if (FREE_MAIL.test(process.env.FROM_EMAIL || '')) {
    throw new Error('FROM_EMAIL (' + process.env.FROM_EMAIL + ') is a free-mail address. Resend only sends from a domain you verified in Resend, e.g. guide@yourdomain.com');
  }
  const pdfPath = path.join(process.cwd(), 'private', ATTACHMENT);
  if (!fs.existsSync(pdfPath)) {
    throw new Error('PDF not found at ' + pdfPath + '. Commit private/' + ATTACHMENT + ' and keep includeFiles "private/**" for api/lead.js in vercel.json');
  }
  const mail = buildEmail(lead);
  return resend({
    from: from(), to: [lead.email], subject: mail.subject, html: mail.html, text: mail.text,
    reply_to: process.env.REPLY_TO_EMAIL || undefined,
    attachments: [{ filename: ATTACHMENT, content: fs.readFileSync(pdfPath).toString('base64') }],
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
