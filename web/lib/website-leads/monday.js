/* eslint-disable */
// lib/website-leads/monday.js -- saves (or updates) a website lead on the "Website Leads" board
const { monday: M } = require('./config');

const colId = (k) => {
    const v = M.columns[k];
    return v && !String(v).startsWith('REPLACE') ? v : null;
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const token = () => String(process.env.MONDAY_API_TOKEN || '').trim().replace(/^["']+|["']+$/g, '').trim().replace(/^bearer\s+/i, '');

async function gql(query, variables) {
    const r = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token(), 'API-Version': M.apiVersion },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(8000),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.errors || j.error_message) throw new Error('monday ' + r.status + ': ' + JSON.stringify(j.errors || j.error_message || j));
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
    set('lastName', lead.lastName);
    set('email', { email: lead.email, text: lead.email });
    set('phone', toPhone(lead.phone) || undefined);
    set('source', lead.source);
    set('page', lead.page);
    set('submitted', { date: now.slice(0, 10), time: now.slice(11, 19) });
    set('status', { label: M.newLeadStatus });
    set('business', lead.business);
    set('businessType', lead.businessType);
    set('budget', lead.budget);
    set('preferredContact', lead.preferredContact);
    set('challenge', lead.challenge ? { text: lead.challenge } : undefined);
    set('message', lead.message ? { text: lead.message } : undefined);
    set('attribution', lead.attribution ? { text: lead.attribution } : undefined);
    if (lead.website) { const url = /^https?:\/\//i.test(lead.website) ? lead.website : 'https://' + lead.website; set('website', { url, text: lead.website }); }
    if (lead.consent) set('consent', { checked: 'true' });
    if (M.ownerUserId) set('owner', { personsAndTeams: [{ id: Number(M.ownerUserId), kind: 'person' }] });
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

async function saveWebLead(lead) {
    if (!/^\d+$/.test(String(M.boardId))) throw new Error('Website Leads board ID is not set. Run scripts/create-web-leads-board.mjs or set MONDAY_WEB_BOARD_ID');
    const name = (lead.firstName + ' ' + lead.lastName).trim();
    let existing = null;
    try { existing = await findExisting(lead.email); }
    catch (e) { console.error('monday lookup failed, creating a new item:', e.message); }

    const cv = buildColumns(lead);
    if (existing) { for (const k of ['status', 'owner']) if (colId(k)) delete cv[colId(k)]; } // never reset a lead already being worked

    const without = (obj, id) => { const c = { ...obj }; if (id) delete c[id]; return c; };
    const keep = (obj, ids) => Object.fromEntries(Object.entries(obj).filter(([k]) => ids.filter(Boolean).includes(k)));
    const noPhone = without(cv, colId('phone'));
    const minimal = keep(cv, [colId('email'), colId('status'), colId('source')]);
    const attempts = [{ cv, group: M.groupId }, { cv: noPhone, group: M.groupId }, { cv: noPhone, group: null }, { cv: minimal, group: null }]
        .filter((a, i, arr) => arr.findIndex((b) => JSON.stringify(b) === JSON.stringify(a)) === i);

    const write = (a) => existing
        ? gql(CHANGE, { b: M.boardId, i: existing, v: JSON.stringify(a.cv) }).then(() => existing)
        : gql(CREATE, { b: M.boardId, g: a.group, n: name, v: JSON.stringify(a.cv) }).then((d) => d.create_item.id);

    let itemId = null, used = 0;
    const errors = [];
    for (const [i, a] of attempts.entries()) {
        try { itemId = await write(a); used = i; break; }
        catch (e) { errors.push(e.message); if (/401|not authenticated|unauthori[sz]ed/i.test(e.message)) break; }
    }
    if (!itemId) throw new Error(errors.join(' || '));
    if (used > 0) console.warn('monday: saved with reduced fields after errors:', errors.join(' || '));

    const note = '<b>' + (existing ? 'Form submitted again' : 'New website lead') + '</b><br>' +
        ['Name: ' + name, 'Challenge: ' + (lead.challenge || '-'), 'Email: ' + lead.email, 'Phone: ' + lead.phone, 'Business: ' + (lead.business || '-'), 'Website: ' + (lead.website || '-'),
        'Business type: ' + (lead.businessType || '-'), 'Budget: ' + (lead.budget || '-'), 'Preferred contact: ' + (lead.preferredContact || '-'), 'Form: ' + lead.source, 'Page: ' + lead.page,
        lead.message ? 'Message: ' + lead.message : null, lead.attribution ? 'Attribution: ' + lead.attribution : null, 'Submitted: ' + lead.submittedAt].filter(Boolean).map(esc).join('<br>') +
        (used > 0 ? '<br><i>Saved with reduced fields because monday rejected some values. Every detail is in this note.</i>' : '');
    await gql(NOTE, { i: itemId, t: note }).catch((e) => console.error('monday note failed:', e.message));
    return itemId;
}

module.exports = { saveWebLead };
