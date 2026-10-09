// Prints your board's group IDs and column IDs.  Run:  node --env-file=.env scripts/list-columns.js
const T = process.env.MONDAY_API_TOKEN, B = process.env.MONDAY_BOARD_ID, V = process.env.MONDAY_API_VERSION || '2026-07';
if (!T || !B) { console.error('Set MONDAY_API_TOKEN and MONDAY_BOARD_ID in .env first.'); process.exit(1); }
(async () => {
    const r = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: T, 'API-Version': V },
        body: JSON.stringify({ query: 'query { boards(ids: [' + B + ']) { name groups { id title } columns { id title type } } }' }),
    });
    const j = await r.json();
    if (j.errors || j.error_message) { console.error(JSON.stringify(j.errors || j.error_message, null, 2)); process.exit(1); }
    const b = j.data.boards[0];
    if (!b) { console.error('Board not found. Check MONDAY_BOARD_ID and that your token can access it.'); process.exit(1); }
    console.log('Board:', b.name, '\n\nGroups (optional MONDAY_GROUP_ID):');
    b.groups.forEach((g) => console.log('  ' + g.id.padEnd(26) + g.title));
    console.log('\nColumns (copy the id values into api/_config.js):');
    b.columns.forEach((c) => console.log('  ' + c.id.padEnd(26) + c.type.padEnd(14) + c.title));
})();
