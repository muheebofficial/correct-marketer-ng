// api/_monday.js -- saves (or updates) the lead on your monday.com board
const { monday: M } = require('./_config');

const colId = (k) => {
    const v = M.columns[k];
    return v && !String(v).startsWith('REPLACE') ? v : null;
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

async function gql(query, variables) {
    const r = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: process.env.MONDAY_API_TOKEN, 'API-Version': M.apiVersion },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(8000),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.errors || j.error_message) {
        throw new Error('monday ' + r.status + ': ' + JSON.stringify(j.errors || j.error_message || j));
    }
    return j.data;
}

function toPhone(raw) {
    let p = String(raw || '').replace(/[^\d+]/g, '');
    if (!p) return null;
    if (p.startsWith('00')) p = '+' + p.slice(2);
    if (p.startsWith('0')) {
        const dc = (M.phoneCountries.find(([, c]) => c === M.defaultCountry) || ['+234'])[0];
        p = dc + p.slice(1);
    } else if (!p.startsWith('+')) p = '+' + p;
    const hit = M.phoneCountries.find(([prefix]) => p.startsWith(prefix));
    return hit ? { phone: p, countryShortName: hit[1] } : null;
}

function buildColumns(lead) {
    const cv = {};
    const set = (key, val) => { const id = colId(key); if (id && val !== undefined && val !== '') cv[id] = val; };
    const now = new Date().toISOString();
    set('firstName', lead.firstName);
    set('surname', lead.surname);
    set('email', { email: lead.email, text: lead.email });
    set('phone', toPhone(lead.phone) || undefined);
    set('business', lead.business);
    set('budget', M.budgetAs === 'dropdown' ? { labels: [lead.budget] } : M.budgetAs === 'status' ? { label: lead.budget } : lead.budget);
    set('description', { text: lead.description });
    set('problem', { text: lead.problem });
    set('social', lead.social);
    set('website', lead.website ? { url: lead.website, text: lead.website } : undefined);
    set('consent', { checked: 'true' });
    set('submitted', { date: now.slice(0, 10), time: now.slice(11, 19) });
    set('source', M.sourceAs === 'status' ? { label: M.sourceLabel } : lead.source);
    if (M.ownerUserId) set('owner', { personsAndTeams: [{ id: Number(M.ownerUserId), kind: 'person' }] });
    set('status', { label: M.newLeadStatus });
    return cv;
}

const FIND = `query ($b: ID!, $c: String!, $v: String!) {
  items_page_by_column_values(board_id: $b, columns: [{column_id: $c, column_values: [$v]}], limit: 1) { items { id } } }`;
const CREATE = `mutation ($b: ID!, $g: String, $n: String!, $v: JSON!) {
  create_item(board_id: $b, group_id: $g, item_name: $n, column_values: $v, create_labels_if_missing: true) { id } }`;
const CHANGE = `mutation ($b: ID!, $i: ID!, $v: JSON!) {
  change_multiple_column_values(board_id: $b, item_id: $i, column_values: $v, create_labels_if_missing: true) { id } }`;
const NOTE = `mutation ($i: ID!, $t: String!) { create_update(item_id: $i, body: $t) { id } }`;

async function findExisting(email) {
    const id = colId('email');
    if (!id) return null;
    const d = await gql(FIND, { b: M.boardId, c: id, v: email });
    const items = d.items_page_by_column_values.items;
    return items.length ? items[0].id : null;
}

async function saveToMonday(lead) {
    const name = (lead.firstName + ' ' + lead.surname).trim();
    let existing = null;
    try { existing = await findExisting(lead.email); }
    catch (e) { console.error('monday lookup failed, creating a new item:', e.message); }

    const cv = buildColumns(lead);
    if (existing) { for (const k of ['status', 'owner']) if (colId(k)) delete cv[colId(k)]; } // never reset a lead already being worked

    const write = (values) => existing
        ? gql(CHANGE, { b: M.boardId, i: existing, v: JSON.stringify(values) }).then(() => existing)
        : gql(CREATE, { b: M.boardId, g: M.groupId, n: name, v: JSON.stringify(values) }).then((d) => d.create_item.id);

    let itemId;
    try { itemId = await write(cv); }
    catch (e) {
        const pc = colId('phone');
        if (pc && cv[pc] && /phone/i.test(e.message)) { // invalid phone: save everything else, phone goes in the note
            const rest = { ...cv }; delete rest[pc];
            itemId = await write(rest);
        } else throw e;
    }

    const note = '<b>' + (existing ? 'Form resubmitted' : 'New ebook lead') + '</b><br>' +
        ['Name: ' + name, 'Problem to solve: ' + lead.problem, 'Email: ' + lead.email, 'Phone / WhatsApp: ' + lead.phone, 'Business: ' + lead.business,
        'Budget: ' + lead.budget, 'About: ' + lead.description, 'Social: ' + (lead.social || '-'),
        'Website: ' + (lead.website || '-'), 'Consent: yes', 'Submitted: ' + lead.submittedAt].map(esc).join('<br>');
    await gql(NOTE, { i: itemId, t: note }).catch((e) => console.error('monday note failed:', e.message));
    return itemId;
}

module.exports = { saveToMonday };
