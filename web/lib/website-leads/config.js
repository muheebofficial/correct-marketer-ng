/* eslint-disable */
// lib/website-leads/config.js -- settings for the WEBSITE lead forms (everything except the ebook landing page).
// The board and column IDs below are your real "Website Leads" board (already created in monday.com).

const digits = (v) => (/^\d+$/.test(String(v || '').trim()) ? String(v).trim() : null);
const slug = (v) => (/^[A-Za-z0-9_]+$/.test(String(v || '').trim()) ? String(v).trim() : null);

module.exports = {
    monday: {
        apiVersion: process.env.MONDAY_API_VERSION || '2026-07',
        boardId: digits(process.env.MONDAY_WEB_BOARD_ID) || '5106155048', // the "Website Leads" board
        groupId: slug(process.env.MONDAY_WEB_GROUP_ID) || null,           // optional

        // Map each field to the column ID on the Website Leads board. null or REPLACE_ME = skip that field.
        columns: {
            firstName: 'text_mm854tj8',   // Text
            lastName: 'text_mm85cmrs',    // Text
            email: 'email_mm854re9',      // Email (also used to avoid duplicates)
            phone: 'phone_mm85tekq',      // Phone
            source: 'text_mm85b9mm',      // Text: which form the lead used (the form "intent"), e.g. "contact"
            page: 'text_mm8559h2',        // Text: the page the form was on, e.g. "/contact"
            submitted: 'date_mm85t0aa',   // Date
            status: 'color_mm851rba',     // Status
            consent: 'boolean_mm85aza9',  // Checkbox
            owner: 'multiple_person_mm85gr3w', // People
            business: 'text_mm8637j5',    // Text
            website: 'link_mm862ac7',     // Link
            businessType: 'text_mm865gcc',// Text
            challenge: 'long_text_mm86qd8', // Long text: the problem they want solved, in their own words
            budget: 'text_mm864s0f',      // Text
            preferredContact: 'text_mm86tgwv', // Text
            message: 'long_text_mm86hta0',// Long text
            attribution: 'long_text_mm86gmaa', // Long text: where the visitor came from (UTM data)
        },
        newLeadStatus: 'New',
        ownerUserId: 118911616, // new leads are assigned to this monday user; set null to skip
        phoneCountries: [['+234', 'NG'], ['+233', 'GH'], ['+254', 'KE'], ['+27', 'ZA'], ['+44', 'GB'], ['+971', 'AE'], ['+1', 'US']],
        defaultCountry: 'NG', // numbers starting with 0 are treated as this country
    },
    email: {
        fromName: 'Muheeb Sulaiman',
    },
    limits: { perMinutePerIp: 5 }, // simple spam brake (per server instance)
};
