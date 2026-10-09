// api/_config.js  -- the one file you edit to match your monday.com board and email wording.
module.exports = {
    monday: {
        apiVersion: process.env.MONDAY_API_VERSION || '2026-07',
        boardId: process.env.MONDAY_BOARD_ID || '5105685497', // your "Leads" board
        groupId: process.env.MONDAY_GROUP_ID || 'topics', // "New Leads" group

        // Map each form field to the column ID on YOUR board.
        // Find the IDs by running:  node --env-file=.env scripts/list-columns.js
        // Set a field to null to skip it.
        columns: {
            firstName: 'text_mm7zrfyv',       // First name (Text)
            surname: null,                    // not stored separately: the item name holds first name + surname
            email: 'lead_email',              // Email (also used to avoid duplicate leads)
            phone: 'lead_phone',              // Phone
            business: 'lead_company',         // Company
            budget: 'dropdown_mm7z83wy',      // Monthly budget (Dropdown)
            description: 'long_text_mm7zmnkr',// About the business (Long text)
            problem: 'long_text_mm7zg9a8',    // Problem to solve, in the prospect's own words (Long text)
            social: 'text_mm7z9j73',          // Social handle (Text)
            website: 'link_mm7zj6by',         // Website (Link)
            consent: 'boolean_mm7z3fa7',      // Consent to contact (Checkbox)
            submitted: 'date__1',             // Last interaction (Date)
            source: 'color_mkyb8krc',         // Lead Source (Status)
            status: 'lead_status',            // Status (Status)
            owner: 'lead_owner',              // Owner (People)
        },
        budgetAs: 'dropdown',        // 'dropdown' | 'status' | 'text'
        newLeadStatus: 'New Lead',   // status label applied to every new lead
        sourceAs: 'status',          // 'status' | 'text'
        sourceLabel: 'Ebook landing page',
        ownerUserId: 118911616,      // new leads are assigned to this monday user (Muheeb); set null to skip

        // Phone columns need a country code. Prefix -> ISO-2 country.
        phoneCountries: [['+234', 'NG'], ['+233', 'GH'], ['+254', 'KE'], ['+27', 'ZA'], ['+44', 'GB'], ['+971', 'AE'], ['+1', 'US']],
        defaultCountry: 'NG',        // numbers starting with 0 are treated as this country
    },
    email: {
        fromName: 'Muheeb Sulaiman',
        subject: 'Your free guide: The Nigerian Business Guide to Agentic AI Automation',
        attachmentName: 'The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf',
    },
};
