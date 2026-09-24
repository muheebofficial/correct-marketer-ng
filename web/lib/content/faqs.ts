import type { Faq } from "./types";

export const generalFaqs: Faq[] = [
  {
    q: "What does a digital marketing agency do?",
    a: "A digital marketing agency helps a business get found online and turn visitors into customers. That usually includes SEO, paid ads, websites, content, lead capture and follow-up. At Correct Marketer NG we also build AI automation and connect these parts into one measurable growth system.",
  },
  {
    q: "How much does digital marketing cost in Nigeria?",
    a: "Costs vary widely with your goals, industry, competition and what already exists, such as a website and tracking. We scope work after a short conversation or audit so you know what is included and what you're paying for. Ad spend is separate from agency fees.",
  },
  {
    q: "How much does SEO cost in Nigeria?",
    a: "SEO pricing depends on the size of your site, competition and content needed. We recommend an audit first, then a plan and quote based on the work your business requires. Avoid anyone who guarantees rankings.",
  },
  {
    q: "How much does Google Ads cost?",
    a: "You pay Google per click, so cost depends on your industry and competition. You choose the ad budget, and we charge a management fee on top. We help you set a starting budget based on what a customer is worth to your business.",
  },
  {
    q: "How can AI help my business?",
    a: "AI can answer routine customer questions, qualify leads, draft and personalise follow-ups, and speed up reporting. The best starting point is a repetitive task that costs your team time every week.",
  },
  {
    q: "Can AI automate WhatsApp customer support?",
    a: "Yes, for routine questions, bookings and lead qualification. A good setup hands complex or sensitive conversations to a person quickly.",
  },
  {
    q: "How can I generate more leads online?",
    a: "Get in front of people already looking for what you sell, send them to a page with a clear offer, make it easy to contact you on WhatsApp or a short form, and follow up fast. Fix the weakest step first.",
  },
  {
    q: "Why is my website not generating customers?",
    a: "Common causes are slow mobile loading, unclear messaging, no obvious next step, weak search visibility and missing tracking. A website conversion audit shows which is holding you back.",
  },
  {
    q: "What is the difference between SEO and paid advertising?",
    a: "Paid advertising buys visits immediately and stops when the budget stops. SEO builds visibility that keeps working after the effort. Many businesses use both.",
  },
  {
    q: "How soon will I get a response after contacting you?",
    a: "We reply as quickly as we can during working hours, usually within one business day. WhatsApp is the fastest way to reach us.",
  },
];

export const homeFaqs = generalFaqs.filter((f) =>
  [
    "What does a digital marketing agency do?",
    "How much does digital marketing cost in Nigeria?",
    "Why is my website not generating customers?",
    "Can AI automate WhatsApp customer support?",
    "What is the difference between SEO and paid advertising?",
  ].includes(f.q),
);
