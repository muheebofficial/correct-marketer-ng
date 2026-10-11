// Preview the email on your computer without sending anything.
// Run:  node scripts/preview-email.mjs     (writes email-preview.html and opens it)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { exec } from 'node:child_process';

const require = createRequire(import.meta.url);
if (!process.env.WHATSAPP_NUMBER) process.env.WHATSAPP_NUMBER = '2348012345678'; // sample number, preview only
const { buildEmail } = require('../api/_email.js');

const mail = buildEmail({
  firstName: 'Ada', surname: 'Obi', email: 'ada@example.com', phone: '+2348031234567', business: 'Obi Furniture',
  budget: '₦100,000 – ₦300,000', description: 'We sell furniture online.',
  problem: 'My ads bring enquiries but nobody follows up fast enough.',
});
const page = '<!doctype html><meta charset="utf-8"><title>Email preview</title>' +
  '<div style="background:#e9e9ec;padding:20px"><p style="font:14px Arial;max-width:620px;margin:0 auto 10px"><b>Subject:</b> ' + mail.subject + '</p>' +
  '<div style="background:#fff;max-width:620px;margin:auto">' + mail.html + '</div></div>';
fs.writeFileSync('email-preview.html', page);
fs.writeFileSync('email-preview.txt', mail.text);
console.log('Subject: ' + mail.subject + '\nPreview written to email-preview.html (plain-text version: email-preview.txt)');
const open = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open';
exec(open + ' email-preview.html');
