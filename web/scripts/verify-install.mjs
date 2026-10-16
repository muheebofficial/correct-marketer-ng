// scripts/verify-install.mjs -- checks that every installed file is byte-for-byte the original. Run: node scripts/verify-install.mjs
import fs from 'node:fs';
import crypto from 'node:crypto';
const E = {
    'lib/website-leads/config.js|src/lib/website-leads/config.js': '2f44bed1c32ac4f814fc3a9a9bd3adaf214b87597183c8cb27c4480bc7168c4e',
    'lib/website-leads/monday.js|src/lib/website-leads/monday.js': '17fb4cc7f7a9450cdd0726284ff0be1f54f4c8c9080496e5b842861e2c64292b',
    'lib/website-leads/email-copy.js|src/lib/website-leads/email-copy.js': '56782a70a86469e87ba19d522fc0f2831709ae5b31fde17b26f4c197da368528',
    'lib/website-leads/email.js|src/lib/website-leads/email.js': 'e1f5fdea2b8c62706870ac656e9dd309d292abece8e54026e8ab352122485543',
    'lib/website-leads/handle.js|src/lib/website-leads/handle.js': 'eccf1020e117506d27e069f48cd327de76e2fb8c62731bc771c3224506d02115',
    'scripts/preview-welcome-email.mjs': '903b062c91b93b45acd47b34536f58d5627e99c913ad828f0c0eef9d55dc326b',
};
let bad = 0;
for (const [files, hash] of Object.entries(E)) {
    const f = files.split('|').find((p) => fs.existsSync(p));
    const got = f ? crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex') : null;
    const ok = got === hash;
    console.log((ok ? 'OK       ' : 'MISMATCH ') + (f || files.split('|')[0] + ' (missing)'));
    if (!ok) { bad++; if (got) console.log('   expected ' + hash + '\n   got      ' + got); }
}
console.log(bad ? '\n' + bad + ' file(s) differ from the original.' : '\nAll files match the original.');
process.exit(bad ? 1 : 0);
