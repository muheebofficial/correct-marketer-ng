/* eslint-disable */
// lib/website-leads/email-copy.js
// >>> EDIT THIS FILE TO CHANGE THE WORDS OF THE WELCOME EMAIL SENT AFTER ANY WEBSITE FORM <<<
//
// RULES:
//   1. Only change the text between the quote marks. Keep the quotes and the commas.
//   2. Do not use a plain apostrophe (') inside a sentence. Use the curly one: don’t, let’s, we’ll
//   3. Placeholders: {firstName}  {lastName}  {business}
// PREVIEW:  node scripts/preview-welcome-email.mjs        PUBLISH:  git add -A && git commit -m "Update welcome email" && git push

module.exports = {
    subject: 'Welcome, {firstName}. Here is what happens next',
    preheader: 'Thanks for connecting with Correct Marketer NG.',
    headline: 'Welcome, {firstName}.',
    intro: 'Thank you for connecting with Correct Marketer NG. We help Nigerian businesses get more customers and stop losing the ones they already have.',
    // ----- Shown only when the visitor wrote a challenge in the form (the "challenge" field) -----
    challengeLabel: 'You told us your biggest challenge:',
    challengeNote: 'We will keep it in mind when we get back to you.',
    nextTitle: 'What happens next:',
    nextSteps: [
        ['We review your details.', 'So we can point you to the right next step.'],
        ['You hear from us.', 'Expect a message from our team on the phone number or email you gave us.'],
    ],
    pitchTitle: 'What we build for businesses like yours:',
    pitchList: [
        'WhatsApp and CRM follow-up automation',
        'Websites and landing pages that convert',
        'SEO and paid ads that bring in qualified leads',
    ],
    // ----- Free guide cross-promotion (set guideTitle to '' to remove this block) -----
    guideTitle: 'While you wait: grab our free guide',
    guideText: 'The Nigerian Business Guide to Agentic AI Automation shows the 7 principles for automation that scales, with a scorecard and a 30-day roadmap.',
    guideButton: 'Get the free guide',
    guideUrl: 'https://correctmarketer.com.ng/free-guide',
    // ----- WhatsApp button (needs WHATSAPP_NUMBER in Vercel) -----
    askLine: 'Have a question right now? Message us on WhatsApp.',
    buttonLabel: 'Chat with us on WhatsApp',
    waMessage: 'Hi, I am {firstName}. I just filled in a form on your website.',
    replyOnly: 'Have a question? Just reply to this email.',
    // ----- Signature and footer -----
    signatureName: 'Muheeb Sulaiman',
    signatureTitle: 'AI Growth Architect, Correct Marketer NG',
    siteLabel: 'correctmarketer.com.ng',
    siteUrl: 'https://correctmarketer.com.ng',
    optOut: 'To stop hearing from us, reply with “unsubscribe”.',

    // ----- Optional: different wording for a specific form. The key is the form name (data-lead-form). -----
    // Any field you leave out falls back to the text above. 'attachment' is a file inside the private/ folder.
    sources: {
        // The key is the form's "intent" value. "contact" is the contact form; "audit" is used for audit requests.
        // If your audit form uses a different intent value, rename the key below to match it.
        contact: {
            subject: 'We got your message, {firstName}',
            headline: 'Thanks for reaching out, {firstName}.',
            intro: 'We received your message and our team will get back to you. While you wait, here is a little about what we do.',
        },
        audit: {
            subject: 'We got your audit request, {firstName}',
            headline: 'Your audit request is in, {firstName}.',
            intro: 'Thank you for requesting an audit with Correct Marketer NG. We will review the details you shared and come back to you with next steps.',
        },
        // 'pricing-guide': { subject: 'Your pricing guide', intro: 'Your guide is attached.', attachment: 'pricing-guide.pdf' },
    },
};
