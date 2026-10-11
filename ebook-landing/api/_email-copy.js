// api/_email-copy.js
// >>> THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE WORDS OF THE EMAIL <<<
//
// RULES (they keep the file from breaking):
//   1. Only change the text between the quote marks. Keep the quotes and the commas.
//   2. Do not use a plain apostrophe (') inside a sentence. Use the curly one instead: don’t, let’s, we’ll
//   3. Placeholders you can use anywhere: {firstName} and {business}
//
// TO TRY YOUR CHANGES:  node scripts/preview-email.mjs      (opens email-preview.html on your computer)
// TO PUBLISH THEM:      git add -A && git commit -m "Update email copy" && git push

module.exports = {
  // ----- Subject line and inbox preview -----
  subject: 'Your free guide is attached, {firstName}',
  preheader: 'Your guide is attached. Here is the fastest way to use it.',

  // ----- Opening -----
  headline: 'Your guide is attached, {firstName}.',
  intro: 'Thank you for requesting The Nigerian Business Guide to Agentic AI Automation. Open the PDF attached to this email.',

  // ----- Their own words (the "problem" field) appear between these two lines -----
  problemLabel: 'You told us your biggest challenge:',
  problemNote: 'Keep it in mind as you read. The 7 principles are built to fix problems like this.',

  // ----- Proof point -----
  proof: '67% of Nigerian MSMEs saw demand fall over two years (PwC, 2024). The businesses that win are the ones that convert more of the leads they already pay for.',

  // ----- Reading order: each item is [bold part, normal part] -----
  readTitle: 'Read it in this order (about 15 minutes):',
  readSteps: [
    ['The Readiness Scorecard.', 'See where you stand in 2 minutes.'],
    ['Principles 1 and 3.', 'Pick the one process worth fixing first, and see how Nigerian customers actually buy.'],
    ['The 30-Day Roadmap.', 'Your week-by-week plan.'],
  ],

  // ----- The sales pitch -----
  pitchTitle: 'Want us to look at it with you?',
  pitchIntro: 'Knowing the problem is the easy part. Building the system that fixes it, without lost leads or wasted ad spend, is where most businesses get stuck. We build exactly that:',
  pitchList: [
    'WhatsApp and CRM follow-up automation',
    'Websites and landing pages that convert',
    'SEO and paid ads that bring in qualified leads',
  ],
  pitchAsk: 'Message us your biggest challenge and we will tell you the first thing we would fix.',

  // ----- WhatsApp button (needs WHATSAPP_NUMBER in Vercel) -----
  buttonLabel: 'Chat with us on WhatsApp',
  waMessage: 'Hi, I just downloaded your guide. I am {firstName} from {business}. My biggest challenge:',
  replyNote: 'Or just reply to this email.',
  replyOnly: 'Simply reply to this email with your biggest challenge.',

  // ----- Signature and footer -----
  signatureName: 'Muheeb Sulaiman',
  signatureTitle: 'AI Growth Architect, Correct Marketer NG',
  siteLabel: 'correctmarketer.com.ng',
  siteUrl: 'https://correctmarketer.com.ng',
  pageUrl: 'correctmarketer.com.ng/free-guide',
  ps: 'Every day a lead waits for a reply, it gets colder. Message us today and let’s fix your follow-up first.',
  optOut: 'To stop hearing from us, reply with “unsubscribe”.',
};
