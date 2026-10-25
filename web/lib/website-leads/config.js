/* eslint-disable */
// lib/website-leads/config.js -- settings for the website lead forms.
module.exports = {
    phone: {
        phoneCountries: [['+234', 'NG'], ['+233', 'GH'], ['+254', 'KE'], ['+27', 'ZA'], ['+44', 'GB'], ['+971', 'AE'], ['+1', 'US']],
        defaultCountry: 'NG', // numbers starting with 0 are treated as this country
    },
    email: {
        fromName: 'Muheeb Sulaiman',
    },
    limits: { perMinutePerIp: 5 }, // simple spam brake (per server instance)
};
