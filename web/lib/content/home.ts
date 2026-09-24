export const problems = [
  { title: "Ads that bring the wrong people", body: "Budget goes to clicks from people who were never going to buy." },
  { title: "Traffic that doesn't convert", body: "Visitors arrive, look around and leave without a word." },
  { title: "Invisible on Google", body: "Customers search for what you sell and find your competitor." },
  { title: "Follow-up that depends on memory", body: "Leads go cold because replying takes too long or gets forgotten." },
  { title: "Marketing without attribution", body: "You can't say which channel produced which customer." },
  { title: "Too many disconnected tools", body: "A website here, ads there, WhatsApp somewhere else, nothing talking to anything." },
  { title: "Social media dependence", body: "Your whole pipeline lives on a platform you don't control." },
];

export const flow = [
  { name: "Traffic", body: "Search, ads and referrals bring the right people in. The channel matters less than who arrives." },
  { name: "Attention", body: "A clear message shows them within seconds that you solve their problem." },
  { name: "Website", body: "A fast, mobile-first page explains what you do and why to trust you." },
  { name: "Conversion", body: "One obvious next step: message on WhatsApp, book a call or ask for an audit." },
  { name: "Lead capture", body: "Every enquiry is recorded with its source, so nothing is lost or guessed." },
  { name: "WhatsApp / CRM", body: "Leads land where your team already works, with the context they need." },
  { name: "Follow-up", body: "Fast replies and reminders keep warm leads warm until they decide." },
  { name: "Sale", body: "Your team spends time on people who are ready to buy." },
  { name: "Retention", body: "Past customers hear from you again, refer others and buy again." },
];

export const pillars = [
  { title: "Local-first", body: "We understand Nigerian customers, businesses and buying behaviour." },
  { title: "Results-driven", body: "Marketing should connect to business outcomes." },
  { title: "AI-powered", body: "We use AI to improve speed, intelligence and execution." },
  { title: "Transparent", body: "No mystery reports. No jargon. No disappearing after payment." },
];

export const process = [
  { name: "Diagnose", body: "Understand your business, audience and current marketing." },
  { name: "Strategize", body: "Identify the highest-impact opportunities." },
  { name: "Build", body: "Create the website, campaign, funnel, content or automation." },
  { name: "Launch", body: "Put the system into the market." },
  { name: "Measure", body: "Track meaningful business metrics." },
  { name: "Optimise", body: "Improve based on real performance." },
  { name: "Scale", body: "Double down on what works." },
];

export const audits = [
  {
    intent: "growth-audit",
    slug: "growth-audit",
    title: "Free Marketing Growth Audit",
    body: "A review of how you're attracting and converting customers today, with the three biggest opportunities to fix first.",
    waMessage: "Hi Correct Marketer NG, I'd like a free marketing growth audit.",
  },
  {
    intent: "website-conversion-audit",
    slug: "website-conversion-audit",
    title: "Free Website Conversion Audit",
    body: "We look at your site the way a first-time visitor does and show you what's stopping them from contacting you.",
    waMessage: "Hi Correct Marketer NG, I'd like a free website conversion audit.",
  },
  {
    intent: "seo-visibility-audit",
    slug: "seo-visibility-audit",
    title: "Free SEO Visibility Audit",
    body: "Where you show up on Google today, who's ahead of you and the quickest wins to close the gap.",
    waMessage: "Hi Correct Marketer NG, I'd like a free SEO visibility audit.",
  },
  {
    intent: "ai-automation-assessment",
    slug: "ai-automation-assessment",
    title: "AI Automation Opportunity Assessment",
    body: "We find the repetitive work in your business that AI could take on, and what it would save you.",
    waMessage: "Hi Correct Marketer NG, I'd like an AI automation opportunity assessment.",
  },
] as const;
