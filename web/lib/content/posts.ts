import type { Post } from "./types";

const AUTHOR = "Muheeb Sulaiman";

export const posts: Post[] = [
  {
    slug: "why-your-website-is-not-generating-customers",
    title: "Why Your Website Isn't Generating Customers (and How to Fix It)",
    description:
      "Slow loading, unclear messaging, no next step, weak visibility and no tracking: the five reasons Nigerian business websites don't bring in enquiries, and what to do about each.",
    category: "Web Development",
    tags: ["website", "conversion", "CRO", "lead generation"],
    author: AUTHOR,
    published: "2026-09-01",
    updated: "2026-09-01",
    readingMinutes: 4,
    service: "web-development",
    intro:
      "If your website looks fine but the phone and WhatsApp stay quiet, the problem is rarely the design. It's usually one of five things that stand between a visitor and an enquiry.",
    sections: [
      {
        heading: "1. It loads too slowly on mobile",
        paragraphs: [
          "Most of your visitors are on phones and often on inconsistent connections. Large images, heavy scripts and cheap hosting can make a page take long enough that people leave before it appears.",
          "Test your site on mobile data, not office Wi-Fi. Compress images, remove plugins you don't use and choose hosting close to your audience.",
        ],
      },
      {
        heading: "2. Visitors can't tell what you do in five seconds",
        paragraphs: [
          "A vague headline like a welcome message wastes your best space. A visitor should learn what you do, who it's for and why you're a good choice before scrolling.",
          "Write your top headline as a promise to a specific customer, then support it with a line of proof.",
        ],
      },
      {
        heading: "3. There is no obvious next step",
        paragraphs: [
          "If a page ends without a clear action, most people will simply leave. Every page should have one primary action, such as messaging you on WhatsApp, booking a call or requesting an audit.",
          "Keep forms short. Name, contact number and a single question are often enough to start a conversation.",
        ],
      },
      {
        heading: "4. Nobody can find the site",
        paragraphs: [
          "A good site nobody visits produces nothing. Search engines need clear service pages, location information and content that answers the questions your customers ask.",
          "Start with one page per service and one page per location you serve, each written for the way people actually search.",
        ],
      },
      {
        heading: "5. You aren't measuring what happens",
        paragraphs: [
          "Without tracking on WhatsApp clicks, form submissions and calls, you can't tell what's working. Set up analytics and record where each enquiry came from.",
          "Once you can see the path from visit to enquiry, you can fix the weakest point instead of guessing.",
        ],
      },
    ],
    related: ["seo-vs-google-ads-nigeria", "how-much-does-seo-cost-in-nigeria", "can-ai-automate-whatsapp-customer-support"],
  },
  {
    slug: "seo-vs-google-ads-nigeria",
    title: "SEO vs Google Ads: Which Should a Nigerian Business Start With?",
    description:
      "SEO and Google Ads solve different problems. Here is how they differ, when each makes sense and how to combine them without wasting budget.",
    category: "Digital Strategy",
    tags: ["SEO", "Google Ads", "paid advertising", "strategy"],
    author: AUTHOR,
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 4,
    service: "seo",
    intro:
      "Both channels put you in front of people searching for what you sell. They differ in speed, cost structure and what you own at the end.",
    sections: [
      {
        heading: "How Google Ads work",
        paragraphs: [
          "You pay each time someone clicks your ad. Results can start within days, and you can control the budget, location and keywords.",
          "The catch is that visibility stops when spending stops, and competitive keywords can be expensive.",
        ],
      },
      {
        heading: "How SEO works",
        paragraphs: [
          "SEO earns organic visibility through a well-built site, useful content and trust signals. It takes longer to build but keeps delivering visits without a per-click cost.",
          "It also builds the credibility of being found through search rather than being an advert.",
        ],
      },
      {
        heading: "When to start with ads",
        paragraphs: [
          "Ads suit businesses that need enquiries quickly, are launching something new or want to test which offers and keywords convert before investing in content.",
        ],
      },
      {
        heading: "When to start with SEO",
        paragraphs: [
          "SEO suits businesses that can invest for the medium term, sell in a market where people search before buying, or want to reduce their dependence on paid traffic.",
        ],
      },
      {
        heading: "Using both",
        paragraphs: [
          "Many businesses run ads for immediate demand while building SEO. Keyword data from ads shows what converts and informs which pages to build for organic search.",
          "Whichever you start with, make sure the website and follow-up process are ready. Traffic sent to a weak page is wasted either way.",
        ],
      },
    ],
    related: ["how-much-does-seo-cost-in-nigeria", "why-your-website-is-not-generating-customers"],
  },
  {
    slug: "how-much-does-seo-cost-in-nigeria",
    title: "How Much Does SEO Cost in Nigeria? What Actually Drives the Price",
    description:
      "There's no single price for SEO in Nigeria. Here are the factors that change the cost, what to ask an agency and the warning signs to avoid.",
    category: "SEO",
    tags: ["SEO", "pricing", "Nigeria", "agency"],
    author: AUTHOR,
    published: "2026-09-12",
    updated: "2026-09-12",
    readingMinutes: 4,
    service: "seo",
    intro:
      "Searching for a fixed SEO price usually returns wide ranges that don't help. That's because the work varies a great deal between businesses.",
    sections: [
      {
        heading: "What changes the price",
        paragraphs: [
          "The main factors are the size and condition of your website, how competitive your market is, how many pages and articles you need, and whether local search, e-commerce or technical fixes are involved.",
          "A local service business with a clean site needs a different plan from a national e-commerce store with thousands of products.",
        ],
      },
      {
        heading: "What you should get",
        paragraphs: [
          "A proper SEO engagement starts with an audit, then a prioritised plan covering technical fixes, on-page work, content and local signals. You should receive reporting tied to enquiries and leads, not just rankings.",
        ],
      },
      {
        heading: "Warning signs",
        paragraphs: [
          "Be careful with guaranteed page-one rankings, unusually cheap packages that use the same template for everyone, and agencies that can't explain what they will actually do each month.",
          "Also avoid link schemes. They can bring short-term movement and long-term penalties.",
        ],
      },
      {
        heading: "Questions to ask any agency",
        paragraphs: [
          "Ask what the audit will cover, who does the work, how progress is measured, what happens to the content and access if you leave, and how they'll connect SEO to your leads.",
        ],
      },
    ],
    related: ["seo-vs-google-ads-nigeria", "why-your-website-is-not-generating-customers"],
  },
  {
    slug: "can-ai-automate-whatsapp-customer-support",
    title: "Can AI Automate WhatsApp Customer Support for Your Business?",
    description:
      "AI can handle routine WhatsApp questions, qualify leads and follow up. Here's what it does well, where it needs a human and how to start safely.",
    category: "AI",
    tags: ["AI", "WhatsApp", "automation", "customer support"],
    author: AUTHOR,
    published: "2026-09-16",
    updated: "2026-09-16",
    readingMinutes: 4,
    service: "ai-marketing-automation",
    intro:
      "If your team answers the same WhatsApp questions all day, an AI assistant can take much of that load. The trick is knowing what to hand over and what to keep human.",
    sections: [
      {
        heading: "What AI handles well",
        paragraphs: [
          "Routine questions about prices, services, opening hours, location and delivery. Booking requests. Collecting details from new enquiries. Sending reminders and follow-ups.",
          "It also replies at any hour, so an enquiry at night doesn't wait until morning.",
        ],
      },
      {
        heading: "What should stay human",
        paragraphs: [
          "Negotiations, complaints, sensitive situations and anything where a mistake would cost the customer or you. A well-built system recognises these and passes them to a person with the conversation attached.",
        ],
      },
      {
        heading: "How to start safely",
        paragraphs: [
          "Begin with the ten most common questions and a clear handover rule. Review real conversations weekly and expand what the assistant covers as it proves reliable.",
          "Be open with customers that they're talking to an automated assistant and make it easy to reach a person.",
        ],
      },
      {
        heading: "What it can do beyond replies",
        paragraphs: [
          "The same system can tag leads, record them in a CRM, score their likelihood to buy and trigger follow-up messages, so your team knows who to call first.",
        ],
      },
    ],
    related: ["why-your-website-is-not-generating-customers"],
  },
  {
    slug: "claude-duet-proactive-ai-agents-nigerian-business",
    title: "Claude Duet Is Here: What Proactive AI Agents Mean for Nigerian Business Owners",
    description:
      "Anthropic's Claude Duet is an AI agent that starts work before you ask. What it means for Nigerian business owners and what to do now.",
    category: "AI Automation",
    tags: ["AI automation", "Claude Duet", "proactive AI agents", "WhatsApp sales automation", "lead follow-up"],
    author: AUTHOR,
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 4,
    service: "best-ai-automation-agency-in-nigeria",
    intro:
      "Let me say the quiet part loud: the AI conversation is changing, and most business owners are still stuck on the old one.",
    sections: [
      {
        heading: "What is Claude Duet?",
        paragraphs: [
          "Duet is an AI assistant that watches the apps you connect to it, works out what needs your attention, and carries out tasks in the background. You don't have to open a chat and type a prompt every time.",
          "According to the report, it can: Build a daily briefing from your connected accounts; check those accounts every few hours and notify you when something needs attention; chase unpaid invoices and draft customer follow-ups; build financial forecasts and simple web apps; and keep working in the cloud after you close your laptop or lock your phone.",
          "It runs through a mobile app (iOS and Android) and claude.ai, and you talk to it by text or voice.",
        ],
      },
      {
        heading: "The part that matters: it starts work, it doesn't just answer",
        paragraphs: [
          "Think about what actually kills small businesses. It's rarely a lack of tools. It's the email that sat unread for two days, the invoice nobody followed up, the customer who went cold because nobody replied in time.",
          "Duet is built around catching exactly those moments. That's the shift: from AI that waits for instructions to AI that notices work that needs doing.",
          "And before you panic about an AI going rogue with your money, here's the sensible part. Per the report, Duet shows you what it plans to do and asks for approval before sending a message, paying for something, signing an agreement, or deleting anything. Some actions, like securities trades and transfers between financial accounts, are off the table entirely.",
        ],
      },
      {
        heading: "Straight talk: can you use it in Nigeria today?",
        paragraphs: [
          "No, not yet, and I won't pretend otherwise.",
          "Duet is a research preview, open to U.S. subscribers on Claude's Pro and Max plans through a waitlist. It also isn't available for Team or Enterprise plans at launch. Anthropic has admitted it can misread a conversation or get the urgency of an issue wrong, and the checks happen every few hours, not in real time.",
          "So why am I writing about it? Because the direction is the story, not the launch date.",
        ],
      },
      {
        heading: "It's not alone: the race is on",
        paragraphs: [
          "Duet is entering a market that's already moving fast. Meta launched its own proactive agent, Muse, in September, and it works through WhatsApp. Sensor Tower estimates, as reported in the VentureBeat piece, put Muse at about 10.9 million downloads in its first six weeks. OpenAI has its own competing agents too.",
          "When Meta, Anthropic, and OpenAI all build toward the same idea inside a single month, that's not a trend. That's a direction of travel.",
          "And notice Meta's choice: WhatsApp. In Nigeria, WhatsApp is where business actually happens. Orders, enquiries, price negotiations, payment confirmations. If the world's biggest platforms see WhatsApp as the place for AI agents to work, you should too.",
        ],
      },
      {
        heading: "5 things Nigerian business owners should do right now",
        paragraphs: [
          "Get your leads and data in order first. An agent can only act on what it can see. If your customer list lives in your head, your DMs, and three notebooks, no AI will fix that. Put your customers, orders, and follow-ups in one place.",
          "Fix your process before you automate it. Automation doesn't repair a messy sales process. It runs it faster. Write down how a lead becomes a paying customer in your business. Every step.",
          "Start with the repetitive stuff. Follow-up messages, order confirmations, FAQs, invoice reminders. These are low-risk, easy to check, and eat hours every week. Start there, not with payroll.",
          "Keep a human in the approval loop. Even the most advanced agents ask before doing anything consequential. Build the same rule into your own systems: AI drafts and prepares, you approve what matters.",
          "Don't wait for the perfect tool. You don't need Duet to start. Automation that works for Nigerian businesses today, like AI-powered WhatsApp sales and follow-up systems, is available now. The businesses that build the habit early will be ready when tools like Duet arrive.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Claude Duet is not for most Nigerian businesses today. But it's a clear preview of how business will run in the next few years: AI that watches, flags, prepares, and acts, with you making the final call.",
          "The question isn't whether this reaches Nigeria. It's whether your business will be organised enough to use it when it does.",
          "At Correct Marketer NG, we help Nigerian businesses get lead flow, follow-up, and sales automation working now, so you're not scrambling later. We bring in the leads, automate the follow-up, and leave you talking only to customers who are ready to buy.",
        ],
      },
    ],
    related: ["why-your-website-is-not-generating-customers", "can-ai-automate-whatsapp-customer-support"],
    faq: [
      { q: "What is Claude Duet?", a: "An AI assistant from Anthropic that monitors your connected apps, surfaces what needs attention, and completes tasks in the background, asking for your approval before consequential actions." },
      { q: "Is Claude Duet available in Nigeria?", a: "Not at launch. It's a research preview for U.S. Pro and Max subscribers via a waitlist." },
      { q: "What's the difference between Duet and a normal chatbot?", a: "A chatbot answers when you ask. Duet is designed to check your accounts periodically and flag or start work without being prompted." },
      { q: "Can a Nigerian business use AI automation today?", a: "Yes. WhatsApp sales automation, AI follow-up systems, and automated lead handling are available now, without waiting for Duet." },
    ],
    source: 'VentureBeat, "Anthropic\'s answer to Muse is here: Claude Duet", October 21, 2026.',
    cta: "Want to start? Message us on WhatsApp: +234 911 017 2901 or visit correctmarketer.com.ng.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
