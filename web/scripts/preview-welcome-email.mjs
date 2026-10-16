// Preview the website welcome email on your computer without sending anything.
// Run:  node scripts/preview-welcome-email.mjs   (writes welcome-preview.html and opens it)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import path from 'node:path';
const require = createRequire(import.meta.url);
if (!process.env.WHATSAPP_NUMBER) process.env.WHATSAPP_NUMBER = '2348012345678'; // sample number, preview only
const lib = ['lib/website-leads', 'src/lib/website-leads'].find((p) => fs.existsSync(p + '/email.js'));
if (!lib) { console.error('Could not find lib/website-leads/email.js. Run this from the repo root.'); process.exit(1); }
const { buildWelcome } = require(path.resolve(lib, 'email.js'));
const mail = buildWelcome({ firstName: 'Ada', lastName: 'Obi', email: 'ada@example.com', phone: '+2348031234567', source: process.argv[2] || 'website', page: '/' });
fs.writeFileSync('welcome-preview.html', '<!doctype html><meta charset="utf-8"><title>Welcome email preview</title><div style="background:#e9e9ec;padding:20px"><p style="font:14px Arial;max-width:620px;margin:0 auto 10px"><b>Subject:</b> ' + mail.subject + '</p><div style="background:#fff;max-width:620px;margin:auto">' + mail.html + '</div></div>');
console.log('Subject: ' + mail.subject + '\nPreview written to welcome-preview.html');
exec((process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open') + ' welcome-preview.html');
