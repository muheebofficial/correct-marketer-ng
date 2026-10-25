// scripts/verify-install.mjs -- checks that every installed file is byte-for-byte the original. Run: node scripts/verify-install.mjs
import fs from 'node:fs';
import crypto from 'node:crypto';
const E = {
    'lib/website-leads/config.js|src/lib/website-leads/config.js': '421f3a5cb226d058a151b3274962bd6a0a29b479418c3e222aaf85a79c83fe3e',
    'lib/website-leads/email-copy.js|src/lib/website-leads/email-copy.js': '56782a70a86469e87ba19d522fc0f2831709ae5b31fde17b26f4c197da368528',
    'lib/website-leads/email.js|src/lib/website-leads/email.js': '7821ef8b5adc5bbb5bf9604b0a34a961c3becce369a9d48f8c57aef2a86b845e',
    'lib/website-leads/handle.js|src/lib/website-leads/handle.js': 'f45773c55f8944a8afcc6dfa7f8ef5748c6361e4ac882bb458abff9823437f86',
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
