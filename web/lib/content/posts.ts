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
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
