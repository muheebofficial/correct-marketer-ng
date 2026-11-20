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
          "Start with one page per service and one page per location you serve, each written for the way people actually search. Our full guide on [why your website is not showing on Google in Nigeria](/blog/why-your-website-is-not-showing-on-google-nigeria) walks through every fix.",
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
    related: ["seo-vs-google-ads-nigeria", "how-much-does-seo-cost-in-nigeria", "can-ai-automate-whatsapp-customer-support", "seo-vs-aeo-vs-geo-nigeria", "why-your-website-is-not-showing-on-google-nigeria"],
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
    related: ["how-much-does-seo-cost-in-nigeria", "why-your-website-is-not-generating-customers", "seo-vs-aeo-vs-geo-nigeria", "why-your-website-is-not-showing-on-google-nigeria"],
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
    related: ["seo-vs-google-ads-nigeria", "why-your-website-is-not-generating-customers", "seo-vs-aeo-vs-geo-nigeria", "why-your-website-is-not-showing-on-google-nigeria"],
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
    readingMinutes: 7,
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
  {
    "slug": "google-ai-overviews-seo-nigeria",
    "title": "Google AI Overviews and SEO in Nigeria: What Businesses Must Do in 2026",
    "description": "Google is changing how people discover businesses. Learn what AI Overviews mean for Nigerian SEO, brand visibility, local search and customer acquisition.",
    "category": "SEO",
    "tags": [
      "Google AI Overviews",
      "SEO Nigeria",
      "AI search",
      "AEO",
      "GEO",
      "local SEO",
      "Google Business Profile"
    ],
    "author": "Muheeb Sulaiman",
    "published": "2026-11-13",
    "updated": "2026-11-13",
    "readingMinutes": 9,
    "service": "seo",
    "intro": "Let me ask you a question: if Google can answer your customer's question before they visit your website, what exactly are you doing to make sure your business is still part of that decision? Search is changing. And Nigerian businesses that still measure SEO only by blue links and rankings are looking at only part of the picture. New to the terms? Our plain-English guide to [SEO vs AEO vs GEO](/blog/seo-vs-aeo-vs-geo-nigeria) explains how they differ.",
    "sections": [
      {
        "heading": "Google is changing where people see AI answers",
        "paragraphs": [
          "In early November 2026, SEO professionals reported a notable desktop Search layout change: for many brand-name searches, Google's AI Overview appeared in the right-hand column, in the area traditionally associated with a Knowledge Panel. Search Engine Roundtable documented examples involving searches for brands such as Apple, Zillow and Coca-Cola.",
          "Here is the important qualification: this is an observed change reported across selected searches, not proof that Google has permanently moved every AI Overview to the right side of every results page. The reports were based on desktop examples, Google had not announced a universal rollout, and search layouts can vary by query, location, device and user.",
          "So, should Nigerian business owners panic? No. But should they pay attention? Absolutely. The bigger development is not the position of one box. It is that Google is increasingly answering questions directly on the results page and shaping what people understand about a business before they click."
        ]
      },
      {
        "heading": "The real SEO issue is not the box. It is the customer journey.",
        "paragraphs": [
          "For years, the familiar SEO journey was straightforward: someone searched, Google displayed links, the user clicked a website, and the business tried to convert that visitor. AI-powered search can change that journey. A person may get a useful summary, compare options, learn basic facts or form an opinion without visiting several websites.",
          "That does not mean websites are dead. Google says AI Overviews and AI Mode can surface links that help people explore topics and discover sources. But it does mean a business should stop treating a website visit as the only valuable outcome of search visibility.",
          "Your brand may influence a decision even when the searcher does not click immediately. Your website, reviews, business profile, third-party mentions, social presence and the clarity of your published information all contribute to what a potential customer can find and verify."
        ]
      },
      {
        "heading": "Will AI Overviews reduce organic traffic?",
        "paragraphs": [
          "They can reduce clicks for some searches, particularly when the AI answer satisfies the user's immediate need. In a February 2026 study, Ahrefs reported that the presence of an AI Overview correlated with a 58% lower average click-through rate for the number-one result in its analysis of informational keywords.",
          "That figure needs context. It is a study result, not a universal prediction that every website will lose 58% of its traffic. The impact varies by query intent, industry, ranking, the usefulness of the AI answer and whether the searcher still needs to visit a source to take action.",
          "A person asking for a simple definition may be satisfied on the results page. Someone comparing a school, choosing a property lawyer, checking a supplier's credibility or looking for a business that can deliver to Ikeja may still need a website, reviews, prices, proof and a direct way to contact the business.",
          "The practical lesson is to separate visibility from clicks, and clicks from revenue. Monitor the full journey: search impressions, qualified visits, calls, WhatsApp enquiries, form submissions, booked consultations and sales."
        ]
      },
      {
        "heading": "Does traditional SEO still matter in the age of AI search?",
        "paragraphs": [
          "Yes. Google's own guidance for AI features says the fundamentals of SEO remain relevant. It says there are no additional technical requirements or special optimisations required to appear in AI Overviews or AI Mode. A page must be indexed and eligible to appear in Google Search with a snippet, and inclusion is never guaranteed.",
          "That is a useful correction to the flood of online advice suggesting that businesses need a secret AI schema, a special file or a completely separate SEO strategy to be considered by Google's AI features. Technical health, helpful content, clear site structure and people-first information still matter.",
          "This does not mean you should ignore answer-focused content or how AI systems interpret information. It means you should build those practices on top of sound SEO rather than replacing the fundamentals with shortcuts."
        ]
      },
      {
        "heading": "What Nigerian businesses should do now",
        "paragraphs": [
          "1. Build a website you actually own. Your Instagram page, Facebook page and WhatsApp account are useful channels, but they are not a substitute for a website you control. Your site should clearly explain what you sell, who you serve, where you operate, how customers can buy and why they should trust you.",
          "2. Make your brand information consistent. Use the same business name, address, phone number, website and service descriptions across your website, Google Business Profile and credible directories. Conflicting details make it harder for customers to verify you and can weaken local search clarity.",
          "3. Optimise your Google Business Profile. Complete the relevant fields, choose accurate categories, add real photos, keep opening hours current, list services and respond to reviews. Google's local results are primarily shaped by relevance, distance and prominence. You cannot control distance, but you can make your business information more complete and trustworthy.",
          "4. Answer the questions customers actually ask. Do not publish generic articles simply to insert keywords. Explain pricing factors, delivery areas, timelines, requirements, comparisons, risks and what a customer should expect. A Nigerian logistics company, for example, should explain its coverage areas and delivery process rather than publish another vague article about excellent service.",
          "5. Show evidence, not just claims. Add real project examples, product images, team expertise, customer feedback, certifications where applicable and detailed explanations of how you work. If you say you are experienced, give people something concrete they can use to assess that claim.",
          "6. Make every important page useful on mobile. Many customers will discover you on a phone, often while multitasking or using mobile data. Keep pages fast, readable and easy to navigate. Make the WhatsApp, call, booking or enquiry action obvious.",
          "7. Measure actions that matter. Track organic search performance in Google Search Console, website behaviour in analytics, and interactions and enquiries from your business profile. Connect those numbers to your lead records and sales process. Ranking first for a keyword is not a business result if the right customers never contact you."
        ]
      },
      {
        "heading": "SEO, AEO and GEO: do Nigerian businesses need all three?",
        "paragraphs": [
          "SEO is the established practice of improving a website's visibility in search engines. AEO, or Answer Engine Optimisation, is commonly used to describe making information easy for answer-focused systems to understand and use. GEO, or Generative Engine Optimisation, generally refers to improving how a brand and its information can be discovered, understood and referenced in generative AI experiences.",
          "The terms are useful ways to discuss changing discovery behaviour, but they are not magic switches or official Google ranking products. In practice, much of the work overlaps: publish accurate information, make it accessible to crawlers, organise it clearly, demonstrate first-hand experience, earn genuine reputation and keep your business details consistent.",
          "Do not let a new acronym convince you to abandon the work that helps customers and search engines understand your business. A well-built website with useful, verifiable information is still a strong foundation."
        ]
      },
      {
        "heading": "A small lesson from our own Search Console data",
        "paragraphs": [
          "I have been watching the performance of my own website, muheebsulaiman.com, in Google Search Console. Across the 28-day period ending 10 November 2026, the site recorded 546 impressions, 7 clicks, a 1.28% click-through rate and an average position of 14.85.",
          "One guide on the site moved from 79 impressions, zero clicks and an average position of 14.62 in the preceding 28-day period to 97 impressions, 4 clicks and an average position of 8.04 in the latest 28-day period. That is encouraging early movement, but it is not proof of sustained growth, and Search Console does not tell me whether those impressions appeared alongside an AI Overview.",
          "I am sharing the numbers because SEO should be discussed with evidence, not screenshots of rankings presented as guaranteed business growth. We still need to connect visibility to qualified enquiries and revenue, and we need more time before drawing stronger conclusions."
        ]
      },
      {
        "heading": "The bottom line: don't optimise only to be clicked",
        "paragraphs": [
          "Google's AI features are changing how people encounter information, but the business objective has not changed: be discoverable, be credible, answer the customer's questions and make it easy to take the next step.",
          "If a potential customer searches for your business and finds outdated details, thin pages, no meaningful reviews or no clear explanation of what you do, an AI Overview is not your biggest problem. Your digital presence needs work.",
          "At Correct Marketer NG, we approach SEO as part of customer acquisition: helping businesses improve search visibility, build useful websites and turn qualified attention into enquiries. The goal is not simply to collect impressions. It is to help the right people find you, trust you and choose you."
        ]
      }
    ],
    "related": [
      "google-sleep-framework-ai-knowledge-nigerian-businesses",
      "list-your-business-on-chatgpt-nigeria",
      "seo-vs-aeo-vs-geo-nigeria",
      "seo-vs-google-ads-nigeria",
      "why-your-website-is-not-generating-customers",
      "how-much-does-seo-cost-in-nigeria"
    ],
    "faq": [
      {
        "q": "Has Google permanently moved AI Overviews to the right side of desktop search?",
        "a": "No universal permanent move has been confirmed. In November 2026, SEO observers reported right-column AI Overviews for many brand searches on desktop. The examples do not establish that the layout applies to every query, country or device."
      },
      {
        "q": "Will Google AI Overviews reduce traffic to Nigerian websites?",
        "a": "They may reduce clicks for some informational searches when the summary satisfies the user's need. The impact varies by query and industry, so businesses should measure their own impressions, clicks, enquiries and sales rather than assume a fixed traffic loss."
      },
      {
        "q": "Can a Nigerian business appear in Google AI Overviews?",
        "a": "Potentially. Google says pages must be indexed and eligible to appear in Search with a snippet. Meeting the requirements does not guarantee inclusion."
      },
      {
        "q": "Is traditional SEO still important?",
        "a": "Yes. Google says the same foundational SEO best practices remain relevant to AI Overviews and AI Mode, with no separate special optimisation requirement."
      },
      {
        "q": "What is the difference between SEO, AEO and GEO?",
        "a": "SEO improves visibility in search engines. AEO focuses on making information useful to answer engines. GEO focuses on discoverability and representation in generative AI experiences. Their practical work overlaps considerably."
      },
      {
        "q": "Does a Google Business Profile help local SEO?",
        "a": "A complete, accurate and actively maintained profile can support local visibility. Google says local results are mainly based on relevance, distance and prominence."
      },
      {
        "q": "Does my website need special AI schema markup to appear in AI Overviews?",
        "a": "Google says there are no additional technical requirements or special optimisations for AI Overviews. Use structured data when it accurately describes your page, not as a supposed AI ranking shortcut."
      },
      {
        "q": "How should I measure SEO performance in 2026?",
        "a": "Track impressions, clicks, query visibility, qualified organic visits, calls, WhatsApp enquiries, form submissions, booked appointments and sales. Connect search reporting to your lead and sales records wherever possible."
      }
    ],
    "source": "Sources: Google Search Central, “AI features and your website” — https://developers.google.com/search/docs/appearance/ai-features ; Google Business Profile Help, “Tips to improve your local ranking on Google” — https://support.google.com/business/answer/7091 ; Ahrefs, “Update: AI Overviews Reduce Clicks by 58%” (4 February 2026) — https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/ ; Search Engine Roundtable, “Google AI Overviews For Brands Moved To Right Column” (2 November 2026) — https://www.seroundtable.com/google-ai-overviews-brands-right-42440.html",
    "cta": "Need a clearer SEO plan for your business? Talk to Correct Marketer NG about improving your website, search visibility and lead generation."
  },
  {
    "slug": "seo-geo-aeo-starter-guide-nigerian-businesses",
    "title": "SEO, GEO and AEO Starter Guide for Nigerian Businesses",
    "description": "A plain-English guide to SEO, GEO and AEO for Nigerian businesses: how to rank on Google and get named by ChatGPT, Gemini, Claude and Perplexity.",
    "category": "SEO",
    "tags": [
      "SEO",
      "GEO",
      "AEO",
      "AI search",
      "Nigeria"
    ],
    "author": "Muheeb Sulaiman",
    "published": "2026-11-16",
    "updated": "2026-11-16",
    "readingMinutes": 13,
    "service": "seo",
    "image": "/blog/seo-geo-aeo-starter-guide.png",
    "imageAlt": "Search result for 'best logistics company in Lagos' with an AI answer naming one business, beside the headline SEO. GEO. AEO.",
    "intro": "A customer in Lagos types “best accountant in Ikeja” into Google and reads the answer Google writes at the top of the page. Then they ask ChatGPT or Perplexity the same question. Each one gives a short list of businesses. If yours is not on those lists, that customer never reaches you, and you never find out they looked. Not sure how SEO, AEO and GEO differ? Start with our [plain-English comparison](/blog/seo-vs-aeo-vs-geo-nigeria), then come back for the step-by-step plan. Want to claim your profile in ChatGPT? See our [ChatGPT Business Hub guide for Nigeria](/blog/list-your-business-on-chatgpt-nigeria).",
    "sections": [
      {
        "heading": "What are SEO, GEO and AEO?",
        "paragraphs": [
          "SEO, GEO and AEO are three names for one job: making sure the right customers find your business and believe what they find. They differ in where that discovery happens.",
          "SEO, or Search Engine Optimisation, is the work of getting your pages found and ranked in search engines such as Google and Bing. It covers your website's technical health, the pages you publish, your Google Business Profile and the trust signals around your brand.",
          "AEO, or Answer Engine Optimisation, is the habit of writing and structuring content so that a system can lift a clear answer from it. That includes featured snippets, Google's AI Overviews and voice assistants.",
          "GEO, or Generative Engine Optimisation, is about how generative AI tools such as ChatGPT, Gemini, Claude and Perplexity describe your business when they write an answer. The goal is that they know who you are, trust what your pages say and mention you by name.",
          "These labels come from the marketing industry. They are not official Google products, and the work overlaps heavily. Google itself says there are no extra technical requirements or special optimisations needed to appear in AI Overviews and AI Mode. Pages need to be indexed and eligible to show in Search with a snippet, and inclusion is never guaranteed. In practice, one strong foundation serves all three."
        ]
      },
      {
        "heading": "Why Nigerian businesses need this now",
        "paragraphs": [
          "Nigeria's online audience is large and still growing. DataReportal counted 109 million internet users in Nigeria at the end of 2025, which is 45.5% of the population, alongside 165 million cellular mobile connections. Most of those people reach the internet on a phone. The gap between connections and users suggests the audience will keep growing, and the businesses that show up clearly now are the ones new users will meet first.",
          "AI answers are already mainstream. In March 2026 Google said AI Overviews has more than 2 billion monthly users and is available in over 200 countries and territories and 40 languages. ChatGPT, Gemini, Claude and Perplexity answer the same questions without sending anyone to Google at all.",
          "This changes what a search is worth. In a study published in February 2026, Ahrefs found that when an AI Overview appeared, the average click-through rate for the number-one result was 58% lower on the informational keywords it analysed. That is one study of one type of query, not a forecast for your website. Simple questions get answered on the results page. Questions that lead to a purchase still need a website, prices, proof and a way to contact you.",
          "Here is why moving early matters. A page of search results has ten places. An AI answer usually names far fewer businesses, and the ones it names are the ones whose details are clear, consistent and easy to check. How crowded those slots are in your industry is something you can test in five minutes. Search for what you sell with Lagos, Abuja or Port Harcourt after it, then see who appears and who is missing."
        ]
      },
      {
        "heading": "How Nigerians search, and what that means for your content",
        "paragraphs": [
          "Searches in Nigeria tend to be local, price-aware and mobile. People type “how much is…”, “price of … in Lagos” and “… near me”, often with an area such as Lekki, Ikeja, Surulere or Ikorodu. They also compare options on WhatsApp and Instagram before they buy.",
          "Write for those questions. A page that says “Our prices start from ₦150,000, and these three things change the cost” gives Google and an AI tool something concrete to quote. A page that says “Contact us for a quote” gives them nothing.",
          "Mind the data cost. A page that crawls on mobile data loses the visitor and weakens your search performance. Compress images, remove plugins you do not use and keep your key information in plain text instead of inside images or PDFs.",
          "Match the next step to the market. For most Nigerian businesses, the sale starts on WhatsApp. Put a clear WhatsApp button next to your prices and track the clicks, so you can connect visibility to enquiries."
        ]
      },
      {
        "heading": "How SEO, AEO and GEO fit together",
        "paragraphs": [
          "SEO makes you findable. AEO makes you quotable. GEO makes you trusted enough to be named.",
          "Do them in that order. If your site cannot be crawled or loads slowly, no amount of AI-friendly writing will help. If your pages are findable but vague, an AI tool has nothing clear to quote. And if your business details disagree across the web, neither Google nor an AI model can be sure which version is true."
        ]
      },
      {
        "heading": "Step 1: Build the SEO foundation",
        "paragraphs": [
          "Start here, because everything else sits on top of it.",
          "1. Own a website. Instagram and WhatsApp are good for sales conversations, but you do not control them and search engines cannot read them the way they read a website. Your site should say what you sell, who it is for, where you operate and how to buy.",
          "2. Give each service and each location its own page. One page that says “we do everything” ranks for nothing. A page on “office cleaning in Lekki” can rank for exactly that. Write each page for a real customer question, not for a keyword list.",
          "3. Fix the basics. Make sure the site is indexed, loads fast on a phone, uses clear titles and descriptions and runs on HTTPS. Set up Google Search Console and Google Analytics 4 on day one so you can see what is happening.",
          "4. Claim and complete your Google Business Profile. Choose accurate categories, add real photos, keep opening hours current, list your services and reply to reviews. Google says local results are mainly shaped by relevance, distance and prominence. You cannot change distance, but you can improve the other two.",
          "5. Keep your business details identical everywhere. Use the same name, address, phone number and website on your site, Google profile, social pages and any directory. Small differences confuse people and machines."
        ]
      },
      {
        "heading": "Step 2: Write answers, not just pages (AEO)",
        "paragraphs": [
          "Answer engines pull from content that gets to the point. Use a question as a heading, answer it in the first two sentences, then add the detail. Readers get what they need quickly, and a system gets a clean passage to quote.",
          "Cover the questions customers actually ask: what it costs, how long it takes, what is included, what can go wrong and how you compare with the alternatives. Where you can, give real figures in naira along with the factors that move them. If you cannot publish exact prices, publish ranges and explain what changes them.",
          "Add an FAQ to your key pages, written in the words customers use, including the awkward questions. Use structured data (schema) only where it accurately describes what is on the page. Google says you do not need special markup to appear in its AI features, so treat schema as good housekeeping rather than a shortcut.",
          "Keep paragraphs short, explain terms the first time you use them and date the pages whose facts change, such as prices and policies. Then update them. Out-of-date prices and policies mislead customers and make your pages less useful to quote."
        ]
      },
      {
        "heading": "Step 3: Become a source AI tools trust (GEO)",
        "paragraphs": [
          "Generative tools build answers from what they can find and from what other sources say about you. Your job is to make sure what they find is accurate, easy to read and backed up elsewhere.",
          "1. Let the right crawlers in. Check your robots.txt file and your hosting or security settings, because some setups block automated visitors by accident. Search-focused crawlers such as OpenAI's OAI-SearchBot and PerplexityBot need access if you want to appear in those tools' results. Each provider documents its own crawlers and the names change, so check their current guidance before deciding what to allow.",
          "2. Put your key content in plain text on the page. If your prices, services and contact details appear only inside images, sliders or scripts that need JavaScript to load, many crawlers will not see them.",
          "3. Build a clear identity. Have an About page that says who runs the business, when it started, your CAC registration, your address and what you are known for. Link it to your Google Business Profile and LinkedIn page, and describe yourself the same way in each place.",
          "4. Earn mentions beyond your own site. Google reviews, features in Nigerian business and tech publications, listings in credible directories and industry bodies, and partners who link to you all tell search engines and AI tools that you are real. Nobody can guarantee a citation, so be wary of anyone who does.",
          "5. Publish what only you can publish. Your own data, project examples, pricing and lessons give a model a reason to quote you instead of a generic page.",
          "6. Treat llms.txt as optional. It is a proposed file that lists your key pages for AI tools. We have not seen a major AI provider say it relies on the file, so do the work above first.",
          "Then run a simple test today. Ask ChatGPT, Gemini, Claude and Perplexity five questions a customer would ask about your industry in your city, such as “who are the best … in Lagos?” and “how much does … cost in Abuja?”. Write down which businesses each tool names, what it says about them and which sources it cites. Repeat monthly with the same questions. It is not a ranking report, because AI answers vary from one run to the next, but it shows you whom the tools currently trust and what they get wrong about you."
        ]
      },
      {
        "heading": "How to show Experience, Expertise, Authoritativeness and Trust (E-E-A-T)",
        "paragraphs": [
          "E-E-A-T stands for Experience, Expertise, Authoritativeness and Trustworthiness. Google describes it as a framework its human quality raters use to judge whether content is helpful and reliable. It is not a switch you turn on, and Google's guidelines treat trust as the most important part. It is still the best checklist for what belongs on your pages, and the tools that choose sources for AI answers face the same problem of deciding whom to believe.",
          "Experience. Show that you have actually done the thing. Use your own photos, project examples, before-and-after results shared with the client's permission, and lessons from real jobs. A restaurant that writes about its own kitchen says more than a page of generic food facts.",
          "Expertise. Say who wrote the page and why they are qualified. Add an author name, a short bio and the relevant credentials or years of practice. Explain things accurately and say what you do not know.",
          "Authoritativeness. Other people should vouch for you: reviews, press mentions, partners, professional memberships, talks and links from respected sites. You earn these over time by being useful in public.",
          "Trustworthiness. Make it easy to check you out. Show your registered business name and CAC details, a real address, working phone and WhatsApp numbers, clear prices, refund and delivery policies, and a privacy page that reflects the Nigeria Data Protection Act. Use HTTPS, cite your sources and date your updates."
        ]
      },
      {
        "heading": "Common mistakes Nigerian businesses make",
        "paragraphs": [
          "Relying only on Instagram or WhatsApp. They are valuable channels, but a business that exists only there is invisible to search and hard for AI tools to verify.",
          "Stuffing pages with “best … in Lagos”. Repeating the phrase does not make a page useful. Write for the customer first.",
          "Buying cheap links or believing guarantees. Anyone promising a number-one ranking or a guaranteed AI citation is selling something nobody controls. Link schemes can bring short-term movement and long-term penalties.",
          "Publishing bulk AI-written filler. AI can help you draft, but pages with no first-hand detail, no real prices and no named author add little for a reader and little for a search engine. Add your own experience before you publish.",
          "Letting details drift. A new phone number on your website and an old one on your Google profile quietly costs you enquiries and trust.",
          "Not measuring. If you cannot say how many enquiries came from search, you cannot tell what is working."
        ]
      },
      {
        "heading": "A 30-day starter plan",
        "paragraphs": [
          "Week 1, audit and fix. Check that your site is indexed, fast on mobile and secure. Set up Search Console and Analytics. Write down your business details and make them identical everywhere.",
          "Week 2, local presence. Complete your Google Business Profile, ask five recent customers for honest reviews, and build one page for your main service and one for your main location.",
          "Week 3, answer content. Rewrite your three most important pages so each answers its main question in the first two sentences, includes real prices or ranges in naira and ends with an FAQ.",
          "Week 4, authority and baseline. Add an About page with your credentials, get listed in two credible directories, pitch one article or mention to a relevant publication, then run the five-question AI test and save the results as your baseline."
        ]
      },
      {
        "heading": "How to measure progress honestly",
        "paragraphs": [
          "Use Google Search Console for impressions, clicks and the queries that bring people to you. Use Google Analytics 4 to see which visits turn into WhatsApp clicks, calls and form submissions. Check referral traffic from sources such as chatgpt.com and perplexity.ai, which can show when AI tools send visitors. Keep a monthly record of your AI test answers.",
          "Here is what that looks like in practice. On my own site, muheebsulaiman.com, Search Console recorded 546 impressions, 7 clicks, a 1.28% click-through rate and an average position of 14.85 over the 28 days to 10 November 2026. One guide on the site went from 79 impressions and no clicks to 97 impressions and 4 clicks against the previous 28 days, and its average position improved from 14.62 to 8.04. Those are small numbers and early movement, not proof of sustained growth. I share them because visibility figures should come with their context, and because the real goal is to connect them to qualified enquiries.",
          "Set realistic expectations. Fixing crawl problems and improving a Google Business Profile can show results within weeks. Rankings and enquiries from new content usually take months."
        ]
      },
      {
        "heading": "How Correct Marketer NG can help",
        "paragraphs": [
          "Correct Marketer NG is a Lagos digital growth agency founded in 2021, and I am Muheeb Sulaiman, its founder. We help Nigerian businesses with SEO, AI search visibility, websites that convert and WhatsApp sales automation.",
          "A good first step is an SEO and AI visibility review of your site: what search engines and AI tools can currently see, where your business details disagree and what to fix first, in order. We do not promise rankings or AI citations. We give you a clear plan, reporting tied to enquiries and work that follows Google's own guidance."
        ]
      }
    ],
    "related": [
      "why-your-website-is-not-showing-on-google-nigeria",
      "list-your-business-on-chatgpt-nigeria",
      "seo-vs-aeo-vs-geo-nigeria",
      "google-ai-overviews-seo-nigeria",
      "how-much-does-seo-cost-in-nigeria",
      "seo-vs-google-ads-nigeria"
    ],
    "faq": [
      {
        "q": "What is the difference between SEO, GEO and AEO?",
        "a": "SEO helps your pages rank in search engines. AEO makes your content easy to quote as a direct answer. GEO improves how generative AI tools such as ChatGPT, Gemini, Claude and Perplexity understand and mention your brand. They overlap, and one strong foundation supports all three."
      },
      {
        "q": "Do I need SEO if customers already find me on Instagram and WhatsApp?",
        "a": "Yes, if you want customers who do not know you yet. Social channels mostly reach people who follow you or are referred to you. Search and AI tools reach people who are actively looking for what you sell, and a website you own is something they can read and verify."
      },
      {
        "q": "Can a Nigerian business appear in ChatGPT, Gemini, Claude or Perplexity answers?",
        "a": "It is possible, but nobody can guarantee it. These tools draw on what they can find about your business and what other sources say about it. Clear, accurate pages, consistent details and independent mentions give you the best chance."
      },
      {
        "q": "Do I need a special AI file or schema to show up in Google's AI Overviews?",
        "a": "No. Google says there are no extra technical requirements or special optimisations for AI Overviews and AI Mode. Pages must be indexed and eligible to appear in Search with a snippet. Use structured data where it accurately describes the page."
      },
      {
        "q": "How long does SEO take to work in Nigeria?",
        "a": "Technical fixes and Google Business Profile improvements can show results within weeks. Meaningful growth in rankings and enquiries usually takes several months and depends on your competition, your current site and how much content is needed."
      },
      {
        "q": "How do I check whether AI tools mention my business?",
        "a": "Ask each tool the questions a customer would ask about your industry and city, record which businesses and sources appear, and repeat every month. Answers vary between runs, so look for patterns rather than single results."
      },
      {
        "q": "What is E-E-A-T and does it affect rankings?",
        "a": "E-E-A-T stands for Experience, Expertise, Authoritativeness and Trustworthiness. Google uses it as a framework for judging content quality, not as a single ranking score. Real experience, named authors, independent mentions and clear business details all support it."
      },
      {
        "q": "How much does SEO cost in Nigeria?",
        "a": "It depends on the size and condition of your site, how competitive your market is and how much content is needed. We quote after an audit so the price matches the work. Our guide to what drives SEO pricing in Nigeria explains the factors."
      }
    ],
    "source": "DataReportal, “Digital 2026: Nigeria” (https://datareportal.com/reports/digital-2026-nigeria); Nairametrics, “Google says AI Overviews has hit 2 billion users globally”, 17 March 2026 (https://nairametrics.com/2026/03/17/google-says-ai-overviews-has-hit-2-billion-users-globally/); Google Search Central, “AI features and your website” (https://developers.google.com/search/docs/appearance/ai-features); Google Business Profile Help, “Tips to improve your local ranking on Google” (https://support.google.com/business/answer/7091); Ahrefs, “Update: AI Overviews Reduce Clicks by 58%”, February 2026 (https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/); Search Console data for muheebsulaiman.com, 28 days to 10 November 2026.",
    "cta": "Want to know where your business stands? Message Correct Marketer NG on WhatsApp at +234 911 017 2901 and ask for an SEO and AI visibility review."
  },
  {
    "slug": "cac-free-ng-domain-email-website-nigerian-businesses",
    "title": "CAC's Free .ng Website Plan: What to Do Before It Launches",
    "description": "CAC plans to give registered businesses free .ng domains, emails and websites. Here is what is confirmed, what is not, and how to get ready.",
    "category": "Web Development",
    "tags": [
      "CAC",
      "Free website",
      ".ng domain",
      "Web development",
      "SEO",
      "Google Ads"
    ],
    "author": "Muheeb Sulaiman",
    "published": "2026-11-17",
    "updated": "2026-11-17",
    "readingMinutes": 9,
    "service": "web-development",
    "image": "/blog/cac-free-ng-website-plan.png",
    "imageAlt": "Browser window showing yourbusiness.ng with a WhatsApp button and hello@yourbusiness.ng email, beside the headline Free .ng websites? Get ready.",
    "intro": "Nigerian business owners are sharing a headline this week: the Corporate Affairs Commission plans to give registered businesses a free .ng domain, business email and website. It sounds like the end of the “I cannot afford a website” excuse. It also raises a bigger question. If every registered business has a website, what makes a customer choose yours?",
    "sections": [
      {
        "heading": "What CAC has announced, and what it has not",
        "paragraphs": [
          "Here is what has been reported. Nigerian news outlets, including Legit.ng and MSME Africa, say CAC plans to provide free .ng domain names, business email addresses and websites to registered businesses, to help them build an online presence. MSME Africa, in a report dated 14 November 2026, says the announcement came in a teaser video on CAC's official social media channel.",
          "Here is what has not been announced. On 17 November 2026, the reports we reviewed say the services are not yet available to apply for. No launch date has been given, no partners have been named (CAC is described as finalising partnerships), and no eligibility rules have been published. We have not seen an official application portal or a full official statement.",
          "So treat this as a plan, not a product. Prepare for it, but do not wait for it."
        ]
      },
      {
        "heading": "How we checked this story",
        "paragraphs": [
          "Stories like this attract scammers, so here is how we checked it. We read two independent reports, from MSME Africa and NPowerDG, and both trace back to the same CAC social media teaser instead of a detailed official document. Legit.ng carries the story under the headline “After Registration, CAC Set to Give Nigerian Business Owners Free Websites, Domains, Emails”.",
          "This is also not the first time a free domain through CAC has been proposed. In November 2020, NITDA and NIRA said they wanted newly registered companies to get a free .com.ng domain through CAC registration. The report we read describes a proposed integration and does not confirm that it launched. Plans like this can take time or stall, which is another reason to prepare without waiting.",
          "We have not been able to review the original teaser ourselves. Before you act on anything you read about this, check CAC's official website and verified social media accounts for the latest information. We will update this article when CAC publishes details."
        ]
      },
      {
        "heading": "Why this could be good news for Nigerian businesses",
        "paragraphs": [
          "A domain name, a business email and a website each cost money, and setting them up takes time. For many small businesses, that cost is the reason they stay on Instagram and WhatsApp alone. A free starting point removes that barrier.",
          "The .ng domain is Nigeria's country-code domain, managed by the Nigeria Internet Registration Association (NiRA). A .ng address tells customers, and Google, that your business is Nigerian. An email on your own domain, such as hello@yourbusiness.ng, also looks more credible than a free Gmail or Yahoo address when you send a quotation or invoice."
        ]
      },
      {
        "heading": "The catch: a free website will not set you apart",
        "paragraphs": [
          "When every registered business can have a website, having one stops being an advantage. Customers will compare you with competitors who also have a site, a .ng address and a business email. What decides who gets the call is what is on the site, how fast it loads, whether it shows up on Google and how easy it is to buy.",
          "We do not yet know what CAC's websites will include. If they are standard templates, expect many businesses to end up with similar pages that say very little. A page with a logo, one paragraph about the company and a phone number gives Google little to rank and gives customers little reason to act.",
          "There are also questions nobody has answered. Will you own the domain and be able to move it? How long is it free, and what happens afterwards? Who hosts the site and the email? Can you edit the pages, add service pages and connect Google Analytics and Search Console? Can you point the domain to a different website later? Ask these before you build your business on it."
        ]
      },
      {
        "heading": "A free website is the starting line: what actually brings customers",
        "paragraphs": [
          "Website quality. A site that wins business loads fast on a phone, says what you sell in the first few seconds, shows prices or price ranges in naira and makes the next step obvious, usually a WhatsApp button. It also shows proof: real photos, customer reviews and your CAC registration details. This is web development work, and it is the part most worth planning for yourself.",
          "Search visibility. A website only brings customers if people can find it. That means one page for each service and location, clear page titles, a completed Google Business Profile and content that answers the questions customers ask. A .ng domain helps Google see that you target Nigeria, but it does not rank you by itself. Our SEO, GEO and AEO starter guide explains how to be found on Google and in AI answers.",
          "Paid advertising. Once the site can convert visitors, Google Ads and Meta ads can send people to it on purpose. Ads pointed at a thin page waste money, so fix the page first, set up tracking for WhatsApp clicks and calls, and start with a small test budget. Ads also give quick feedback on which offers and keywords bring enquiries, and that feedback guides your SEO."
        ]
      },
      {
        "heading": "How to get ready before it launches",
        "paragraphs": [
          "1. Make sure your CAC registration is complete and your details are consistent. Use the same business name, address, phone number and registration number everywhere. Mismatched details are an avoidable problem.",
          "2. Pick your domain name now. Choose a short, easy-to-spell name that matches your business name, and have two or three alternatives ready in case your first choice is taken. If you already own a .com or .com.ng domain, keep it and do not let it lapse while you wait.",
          "3. Gather your content. You need your logo, photos of your products or work, a list of services with prices or price ranges in naira, your address, opening hours, WhatsApp number, customer reviews and short answers to the ten questions customers ask most.",
          "4. Write your key pages in advance. Prepare a home page, one page for each main service, an About page and a Contact page. With the words ready, you can launch properly in a day instead of weeks.",
          "5. Set up your Google Business Profile. It is free, it works with or without a website, and it helps you appear in local searches and on Maps. Add accurate categories, photos and opening hours.",
          "6. Decide how customers will contact you. For most Nigerian businesses, that is WhatsApp. Set up a WhatsApp Business profile with a greeting message and a catalogue, so the button on your site leads somewhere useful.",
          "7. Decide who will manage it. Someone has to update prices, publish new content and answer enquiries. A site nobody maintains loses customers' trust."
        ]
      },
      {
        "heading": "Free site or custom site: how to decide",
        "paragraphs": [
          "A free site is probably enough if you are just starting, need a simple online identity and get most customers through referrals or social media. Treat it as a digital business card.",
          "You will likely want a custom site if you depend on Google or ads for customers, sell products online, take bookings, need to connect payment or CRM tools, or compete in a crowded market where presentation and speed matter.",
          "A third route may exist. You could use the free .ng domain and email, and build the website separately, if the scheme lets you point the domain to your own site. Whether that is allowed has not been announced."
        ]
      },
      {
        "heading": "Watch out for “claim your free website” scams",
        "paragraphs": [
          "Offers that mention a government scheme attract fraud. Until CAC publishes official instructions, do not pay anyone to “reserve” or “claim” a free domain or website. Do not share your CAC certificate, NIN, BVN or bank details with unofficial pages or WhatsApp groups.",
          "Be careful with forwarded posts too. Many overstate the plan and describe it as live. Check CAC's official website and verified accounts before you act on a link."
        ]
      },
      {
        "heading": "Do not confuse it with CAC's free registration offer",
        "paragraphs": [
          "Separately, CAC and SMEDAN signed an agreement in September 2025 to offer free business registration to 250,000 micro, small and medium enterprises. SMEDAN says registration normally costs about ₦11,000. Reports in November 2026 say CAC has reopened free registration. That is a different programme from the free website plan. Check the official CAC and SMEDAN channels for current rules before you apply."
        ]
      },
      {
        "heading": "How Correct Marketer NG can help",
        "paragraphs": [
          "We are an independent agency, and we are not part of the CAC programme. What we can do is help you get ready and get more from whatever you receive.",
          "Website readiness review: we check what you have, what you will need and what to ask before you commit to a free setup. Web development: if a standard site is not enough, we build fast, mobile-first websites with clear service pages, WhatsApp buttons and tracking. SEO: we set up service and location pages, your Google Business Profile and content that answers customer questions. Paid ads: we run Google and Meta campaigns that send traffic to pages built to convert, with reporting tied to enquiries.",
          "If you want a plain-language view of where your business stands, message us on WhatsApp and ask for a website and visibility review."
        ]
      }
    ],
    "related": [
      "list-your-business-on-chatgpt-nigeria",
      "why-your-website-is-not-generating-customers",
      "seo-geo-aeo-starter-guide-nigerian-businesses",
      "seo-vs-google-ads-nigeria"
    ],
    "faq": [
      {
        "q": "Is CAC giving free websites to Nigerian businesses now?",
        "a": "Not yet. Reports dated 12 to 14 November 2026 say CAC plans to provide free .ng domains, business emails and websites to registered businesses, but the services are not yet available to apply for, and no launch date has been announced."
      },
      {
        "q": "Who will qualify for the free .ng domain, email and website?",
        "a": "Eligibility has not been published. Reports refer to registered businesses, but no rules, documents or application steps have been announced. Check CAC's official channels for updates."
      },
      {
        "q": "What is a .ng domain?",
        "a": ".ng is Nigeria's country-code top-level domain, managed by the Nigeria Internet Registration Association (NiRA). It signals that a website belongs to Nigeria, for example yourbusiness.ng."
      },
      {
        "q": "Can I keep my existing domain and website?",
        "a": "Yes. Nothing in the reports requires you to give up a domain or site you already own. Keep it active while the details of the CAC plan are finalised."
      },
      {
        "q": "Will a free website rank on Google?",
        "a": "A website can rank if Google can find and index it and it has useful, original content that answers what customers search for. A free domain and site do not guarantee rankings, and no one can promise them. Page content, speed, local signals and reputation still decide the result."
      },
      {
        "q": "Do I still need a custom website if I get a free one?",
        "a": "It depends on your goals. A free site may be enough as a simple online identity. If you rely on Google, ads or online sales, you will probably need more control over content, speed, tracking and design than a standard setup offers."
      },
      {
        "q": "How do I avoid scams about the free website offer?",
        "a": "Do not pay anyone to reserve or claim a free domain or website, and do not share your CAC certificate, NIN, BVN or bank details with unofficial pages. Check CAC's official website and verified social media accounts for instructions."
      },
      {
        "q": "Is this the same as CAC's free business registration for 250,000 businesses?",
        "a": "No. The free registration offer is a separate programme, announced by CAC and SMEDAN in September 2025, that covers registration fees for eligible MSMEs. The free domain, email and website plan is a newer announcement that has not yet launched."
      }
    ],
    "source": "MSME Africa, “CAC Plans Free .ng Domains, Business Emails and Websites for Registered Nigerian Businesses”, 14 November 2026 (https://msmeafricaonline.com/cac-plans-free-ng-domains-business-emails-and-websites-for-registered-nigerian-businesses/); NPowerDG, “FG To Provide Free NG Domain, Email And Website To Registered Business In Nigeria”, 12 November 2026 (https://www.npowerdg.com/2026/11/fg-to-provide-free-ng-domain-email-and.html); Legit.ng, “After Registration, CAC Set to Give Nigerian Business Owners Free Websites, Domains, Emails” (https://www.legit.ng/business-economy/industry/1741623-after-registration-cac-set-give-nigerian-business-owners-free-websites-domains-emails/); The Sun, “NITDA, NIRA to give free ‘.com.ng’ domain name to newly registered companies”, 19 November 2020 (https://thesun.ng/nitda-nira-to-give-free-com-ng-domain-name-to-newly-registered-companies/); SMEDAN, “SMEDAN and CAC Partner to Provide Free Business Registration for 250,000 MSMEs”, 27 September 2025 (https://smedan.gov.ng/smedan-cac-free-registration-for-msmes/).",
    "cta": "Want a plain-language view of where your business stands online? Message Correct Marketer NG on WhatsApp at +234 911 017 2901 and ask for a website and visibility review."
  },
  {
    "slug": "whatsapp-ai-automation-nigeria-spend-less-sell-more",
    "title": "WhatsApp AI Automation in Nigeria: Spend Less, Sell More",
    "description": "How Nigerian businesses can cut WhatsApp AI costs, hand big buyers to humans and build checkout trust, plus the risks and rules to watch.",
    "category": "AI Automation",
    "tags": [
      "WhatsApp automation",
      "AI automation",
      "Lead qualification",
      "Checkout conversion",
      "Nigeria"
    ],
    "author": "Muheeb Sulaiman",
    "published": "2026-11-17",
    "updated": "2026-11-17",
    "readingMinutes": 14,
    "service": "ai-marketing-automation",
    "image": "/blog/whatsapp-ai-automation-nigeria-checkout.png",
    "imageAlt": "Diagram: WhatsApp messages pass a filter before the paid AI call, routine questions get a bot reply, high-ticket buyers go to a human, then a checkout showing card, bank transfer and USSD.",
    "intro": "A customer sends “Good afternoon” to your business on WhatsApp. Ten seconds later: “Hello?” Then: “How much is the 5kg?” If your AI bot treats those as three separate jobs, you pay for three AI calls, the customer gets three replies, and nobody has bought anything yet. Now imagine a buyer asking for a ₦2 million bulk order and getting the same bot. This guide looks closely at three popular pieces of advice for Nigerian businesses: filter messages before they reach a paid AI model, hand high-value enquiries to a human, and show trusted payment names on your checkout. Some of it holds up. Some of it needs correcting.",
    "sections": [
      {
        "heading": "Does this advice hold up? Our verdict on the three claims",
        "paragraphs": [
          "The advice we reviewed says: add a deduplication or filtering step before calling a paid language model to cut token spend, build explicit human-escalation triggers for high-ticket enquiries, and feature trusted, bank-backed Nigerian payment processors (Squad, Paystack, Flutterwave, Moniepoint) above the fold to lift checkout conversion.",
          "**Filtering before the AI call: mostly right.** It is sound practice, with two cautions. It is one cost lever among several, and repeated messages can be a sign of frustration, so log them instead of throwing them away.",
          "**Human escalation: right, and the most valuable of the three.** It only works if you define “high-ticket” from your own order data and a real person is ready to pick up.",
          "**Payment names above the fold: the idea is right, the wording and placement need work.** Trust does affect checkout, but research shows surprise costs matter more. The phrase “bank-backed” is only partly accurate for these four companies, and the very top of a page is rarely the best place for payment logos.",
          "The rest of this guide explains each verdict, the opportunities and risks for Nigerian businesses, and how to put it into practice."
        ]
      },
      {
        "heading": "Why do WhatsApp AI bots waste money in the first place?",
        "paragraphs": [
          "Most chatbot tutorials assume one message equals one AI call. Real WhatsApp conversations do not work that way.",
          "**Customers send one thought in pieces.** A greeting, the question, then “please reply me”. Add “ok”, “thanks” and a thumbs-up, and every fragment can trigger a paid call.",
          "**Messages arrive twice.** WhatsApp resends a message if your server does not confirm receipt quickly. If your workflow only responds after the AI has finished thinking, the duplicate triggers a second run.",
          "**The same questions repeat all day.** Price, delivery area, opening hours. The answers rarely change, yet the model is asked every time.",
          "**The whole chat history is resent on every turn.** Long conversations make each call bigger than the last.",
          "There is a bigger point to keep in view. At small-business volumes, the AI bill is often modest compared with the cost of a slow reply or a lost order. Cutting waste is worthwhile, but never at the expense of answering customers well. Measure cost per qualified lead, not tokens alone."
        ]
      },
      {
        "heading": "How can you cut WhatsApp AI costs without hurting the conversation?",
        "paragraphs": [
          "Put cheap steps in front of the expensive one. In our own build of a WhatsApp sales agent in n8n, the first loop we got working was a trigger, an If filter, the AI agent, then the WhatsApp reply. That filter step is where most of the savings and most of the safety live. This is the order we recommend:",
          "1. **Confirm receipt immediately.** Return a success response to WhatsApp straight away, then process the message. This stops most duplicate deliveries.",
          "2. **Ignore repeats of the same message.** Check the WhatsApp message ID against a short-lived record and skip anything you have already handled.",
          "3. **Wait a few seconds and merge.** Collect everything the same customer sends in a short window and treat it as one message. Keep the wait short. A few seconds feels like thinking, while half a minute feels like being ignored.",
          "4. **Answer routine messages with rules.** Greetings, “ok”, emoji-only replies and fixed facts such as price lists, delivery areas and opening hours can be handled from a sheet or database with no AI call.",
          "5. **Send only what the model needs.** Pass the merged message and the last few turns, not the whole history, and use a smaller, cheaper model for simple sorting tasks. Many providers also discount repeated prompt text, so check your provider's current pricing page.",
          "6. **Measure before and after.** Count AI calls per conversation and cost per qualified lead for a week before the change and a week after. For illustration only, if merging and rules removed 40% of calls from 6,000 monthly messages, you would make 3,600 calls instead of 6,000. Your own logs will give your real number.",
          "One caution matters more than the rest. Do not delete repeated messages silently. A customer who sends the same question three times may be telling you the bot is failing. Log repeats and let them feed your escalation rules."
        ]
      },
      {
        "heading": "When should a WhatsApp bot hand over to a human?",
        "paragraphs": [
          "A bot can answer “do you deliver to Ikorodu?” perfectly and still lose a catering order worth millions of naira by haggling like a bot. Nigerian buyers negotiate, ask for the last price and want to know a real person is accountable. Write your handover rules down before launch.",
          "**Set the trigger from your own data.** “High-ticket” has no universal meaning. A ₦150,000 order is routine for a furniture seller and enormous for a snack vendor. Look at your last six months of orders and choose a naira threshold, then add keywords such as wholesale, bulk, event, contract, instalment and invoice.",
          "**Add emotion and failure triggers.** Escalate when a customer says they have paid or been debited, asks for a refund, repeats the same question, writes in anger or asks for a person. Escalate when the bot has failed to answer twice in a row.",
          "**Make the handover useful.** The bot should stop replying, flag the thread, and send your team a short summary: who the customer is, what they want, the order value and what has been said. Tell the customer plainly that a person will reply and roughly when.",
          "**Plan for after hours.** If nobody is awake at 2 a.m., the bot should capture the details, say when a person will respond and put the thread at the top of the morning queue. Also check Meta's current rules on free-form replies after the 24-hour customer service window, because they affect how your team can reply to a thread that has gone quiet.",
          "**Be honest that it is a bot.** Customers forgive automation faster than they forgive being misled."
        ]
      },
      {
        "heading": "What does WhatsApp's AI chatbot policy mean for your business?",
        "paragraphs": [
          "This is the risk most Nigerian guides skip. WhatsApp changed its Business Solution terms to ban general-purpose AI chatbots. [TechCrunch reports](https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/) that the update took effect on 15 January 2026 and was aimed at AI providers offering open-ended assistants, not at businesses using AI to serve their own customers. Meta said, for example, that a travel company running a customer service bot would not be barred.",
          "[respond.io's summary](https://respond.io/blog/whatsapp-chatbot-policy-2026) describes the allowed uses as business-focused bots for customer support, FAQs, bookings, order tracking, notifications and lead qualification, and says the bot's role must support a legitimate business service. respond.io sells messaging software, so treat its interpretation as guidance and read Meta's own terms for the final word.",
          "In practice, build a bot with a clear job for your business, keep it from answering anything and everything, and give customers a route to a human. A bot designed around lead qualification, order enquiries and support sits on the right side of that line."
        ]
      },
      {
        "heading": "Is your WhatsApp automation compliant with Nigeria's data protection law?",
        "paragraphs": [
          "A WhatsApp bot collects names, phone numbers, addresses and purchase intent. That is personal data under the Nigeria Data Protection Act 2023, and the NDPC's 2025 implementation directive (GAID) adds detail. This is general information, not legal advice, so ask a qualified Nigerian data protection practitioner to review your setup.",
          "A [Pavestones Legal overview](https://www.mondaq.com/nigeria/privacy-protection/1733800/use-of-emerging-technologies-in-data-processing-legal-and-regulatory-considerations-in-nigeria) highlights points that matter for AI tools: have a lawful basis such as consent or contractual necessity, be transparent about automated decisions, carry out a risk assessment before using higher-risk technology, and remember that you stay responsible for compliance when a foreign provider processes the data.",
          "Practical steps: tell customers they are chatting with an AI assistant, link to a privacy notice, collect only what you need, keep a record of which vendors see customer data, include data protection terms in vendor contracts, and give people a way to reach a human and ask for their data to be corrected or deleted."
        ]
      },
      {
        "heading": "Do payment logos above the fold really raise checkout conversion?",
        "paragraphs": [
          "Partly. Trust is a real barrier, but it is not the biggest one. [Baymard Institute](https://baymard.com/blog/cart-abandonment-rate) puts the average documented cart abandonment rate at 70.22% across 50 studies. In its study of US online shoppers who left a cart for a reason other than browsing, 40% said extra costs such as shipping, tax and fees were too high, 19% did not trust the site with their card details, 18% were forced to create an account, and 9% said there were not enough payment methods.",
          "Those are US figures, so treat them as a pattern to test, not a Nigerian benchmark. The pattern is still useful. In Nigeria, delivery fees that appear only at the last step are a classic way to lose a sale, and no logo fixes that.",
          "On placement, a row of four payment logos above your headline pushes your offer down on a phone and asks for a payment decision before the visitor cares about the product. Put a slim strip of accepted methods next to your price and buy button, and show it again at checkout, where the payment decision happens. Then test it: compare checkout starts to completed payments across two layouts. No honest source can promise you a fixed lift.",
          "Trust comes from more than logos. Show the total in naira with delivery before checkout, real contact details and a WhatsApp number for payment problems, clear refund and delivery policies, your CAC registration, genuine reviews and a secure page. Keep payment on the processor's own secure page, so customers learn that a payment page should look the same every time."
        ]
      },
      {
        "heading": "Which Nigerian payment processors can you name, and what can you truthfully say?",
        "paragraphs": [
          "“Bank-backed” needs care. The picture has been changing quickly, so check each claim before you print it on a payment page.",
          "**Squad** was built by GTCO, the holding company behind GTBank, according to [GTBank's Squad page](https://gtbank.com/squad).",
          "**Paystack** is owned by Stripe. [African Business](https://african.business/2026/05/long-reads/nigerian-fintechs-march-into-banks-territory) reports that Paystack has acquired a microfinance bank, now called Paystack Microfinance Bank, while its payment service runs independently of the bank.",
          "**Flutterwave** announced a CBN microfinance banking licence in April 2026, [WeeTracker reports](https://weetracker.com/?p=87883), which lets it hold deposits and lend directly. That means older descriptions of Flutterwave as “not a bank” are out of date, although it remains a microfinance bank and not a commercial bank.",
          "**Moniepoint** took the microfinance route to banking, and [Nairametrics reported](https://nairametrics.com/2026/01/26/cbn-upgrades-opay-moniepoint-other-major-fintechs-mfbs-to-national-status) that the CBN upgraded its microfinance bank to national status in January 2026.",
          "So three of the four now have a CBN-licensed microfinance bank in their story, and Squad sits inside a bank-owned group. “Backed by a licensed financial institution” is closer to the truth than a flat “bank-backed”, and the safest wording is the plain one: “Pay securely with Paystack” or “Pay with Squad”. Never claim a licence or approval you cannot show.",
          "One more reason to avoid depending on a single provider. A [TechCabal report](https://techcabal.com/?p=190329) says a new CBN rule, effective 31 December 2026, limits a firm with more than 25% of merchant acquiring to no more than 15% of consumer issuing. It binds the institutions and not merchants, but the report says acquirers may need to restructure, which could affect the providers merchants use. Offer at least two payment routes, and keep your integration flexible."
        ]
      },
      {
        "heading": "What are the opportunities for Nigerian businesses?",
        "paragraphs": [
          "**Reply at any hour.** An enquiry at 11 p.m. gets an answer and a captured lead instead of a cold morning.",
          "**Spend human time where it earns money.** The bot handles routine questions and qualification, and your best people spend their time on high-value buyers.",
          "**Turn ad clicks into conversations.** Meta and Google ads that send people to a WhatsApp flow with qualifying questions waste fewer clicks on people who will never buy.",
          "**Build trust at the moment of payment.** A clear, honest payment section on a fast page can recover customers who would otherwise leave.",
          "**Use a fast-moving payments market.** Processors are moving into accounts and lending, so shop around on fees, settlement time and support, and treat bundled offers critically."
        ]
      },
      {
        "heading": "What are the challenges and risks to plan for?",
        "paragraphs": [
          "**Platform rules.** WhatsApp's policy on AI chatbots can change again, so build a bot with a clear business purpose and keep an eye on Meta's terms.",
          "**Data protection.** Customer data passing through AI tools and foreign vendors needs a lawful basis, a notice and vendor controls.",
          "**People.** Escalation fails if nobody picks up. Decide who is on duty, how quickly they respond and what happens at night and on weekends.",
          "**Content quality.** A bot is only as good as its prices, policies and product facts. Out-of-date information damages trust faster than a slow reply.",
          "**Provider concentration.** Relying on one payment processor leaves you exposed when a gateway has downtime or its business changes.",
          "**Fake payment pages.** Scammers copy checkout pages. Keep your payment flow consistent, tell customers which accounts and links are genuine, and never ask for card details in WhatsApp chat.",
          "**Measuring the wrong thing.** Tokens saved mean little if qualified leads fall. Track enquiries, handovers, completed payments and revenue."
        ]
      },
      {
        "heading": "How can your business position itself to win?",
        "paragraphs": [
          "Customers in Nigeria are used to haggling, delays and doubts about who is on the other end. The businesses that stand out remove those doubts.",
          "Publish clear prices or price ranges in naira. Answer the first question quickly, in plain language. Say when a person will take over. Show who you are with your CAC registration, address, working numbers and real reviews. Offer more than one way to pay. Keep your information the same on your website, Google Business Profile and WhatsApp.",
          "These habits also help you get found. Pages that state facts clearly and consistently are easier for Google and for AI tools to understand and quote, which is why we link this work to SEO. Our [SEO, GEO and AEO starter guide](/blog/seo-geo-aeo-starter-guide-nigerian-businesses) explains how."
        ]
      },
      {
        "heading": "A 30-day roadmap for putting this into practice",
        "paragraphs": [
          "**Week 1, measure and map.** Export a month of WhatsApp conversations. Count how many messages are greetings, repeats or standard questions, list your top ten questions, and set your high-ticket threshold from real orders.",
          "**Week 2, build the filter and the facts.** Set up quick acknowledgement, duplicate checks, merging and rule-based answers, and put your prices, policies and FAQs in one maintained source.",
          "**Week 3, build the handover.** Create the escalation triggers, the summary your team will see, the after-hours reply and the owner for each shift. Add the AI disclosure and privacy notice.",
          "**Week 4, fix the checkout and test.** Show your total and delivery cost early, place the accepted-payment strip beside the price and at checkout, add a second payment route, and run a small test with real customers. Compare calls per conversation, handover speed and completed payments against your week 1 baseline."
        ]
      },
      {
        "heading": "How we checked this guide",
        "paragraphs": [
          "This guide was written by Muheeb Sulaiman, founder of Correct Marketer NG, a Lagos digital growth agency founded in 2021. We work on WhatsApp sales automation, websites, SEO and paid advertising for Nigerian businesses, and we are building and testing our own WhatsApp sales agent in n8n, which is where the workflow lessons above come from.",
          "We checked the claims against the sources linked in the text on 17 November 2026. We could not open the Anthropic and Meta developer documentation directly, so the notes on prompt savings and the 24-hour window tell you to confirm current terms with the provider. Payment processor licensing and CBN rules change, so verify them before you publish any claim. We will update this article when the facts change."
        ]
      },
      {
        "heading": "How can Correct Marketer NG help you implement this?",
        "paragraphs": [
          "We are an independent agency. We do not process payments and we do not promise rankings or sales. We design, build and connect the systems around them.",
          "**WhatsApp AI automation.** We map your conversations, build the filter, qualification and handover flow, connect it to your CRM and review real chats with you so the bot improves. See our [AI automation service](/services/best-ai-automation-agency-in-nigeria).",
          "**Websites and checkout.** We build fast, mobile-first landing pages and product pages with clear pricing, an honest payment section and at least two payment routes through the gateways you choose. See our [web development service](/services/best-web-development-company-in-nigeria).",
          "**SEO.** We make sure the right customers find you through Google and AI answers. See our [SEO service](/services/best-seo-agency-in-nigeria).",
          "**Paid ads and lead generation.** We run Google and Meta campaigns that send traffic to pages and WhatsApp flows built to convert, with tracking tied to enquiries and completed payments. See our [Google Ads service](/services/best-google-ads-agency-in-nigeria) and [lead generation service](/services/best-lead-generation-agency-in-nigeria).",
          "If you want to start small, ask for a review. We look at your WhatsApp conversations, your checkout and your tracking, and tell you plainly what to fix first. Our [AI automation service](/services/best-ai-automation-agency-in-nigeria) page explains how we scope the work."
        ]
      }
    ],
    "related": [
      "can-ai-automate-whatsapp-customer-support",
      "why-your-website-is-not-generating-customers",
      "claude-duet-proactive-ai-agents-nigerian-business"
    ],
    "faq": [
      {
        "q": "How do I reduce AI costs in a WhatsApp chatbot?",
        "a": "Confirm receipt of each message immediately, skip duplicates by message ID, merge messages that arrive within a few seconds, answer routine questions with rules, send only recent context to the model and use a smaller model for simple tasks. Measure AI calls per conversation and cost per qualified lead before and after."
      },
      {
        "q": "When should a WhatsApp AI chatbot transfer to a human?",
        "a": "Transfer when the order value passes a naira threshold you set from your own sales data, when the customer asks for a bulk or negotiated deal, reports a payment problem, asks for a refund, shows frustration or asks for a person, or when the bot has failed to answer twice in a row."
      },
      {
        "q": "Does WhatsApp allow AI chatbots for Nigerian businesses?",
        "a": "WhatsApp bans general-purpose AI chatbots from its Business platform from 15 January 2026, but reports say businesses can use AI bots to serve their own customers, for example for support, bookings, order tracking and lead qualification. Read Meta's current terms before you build."
      },
      {
        "q": "Is it legal to use an AI chatbot with customer data in Nigeria?",
        "a": "It can be, if you follow the Nigeria Data Protection Act 2023 and the NDPC's 2025 directive: have a lawful basis, be transparent, assess risks, control vendors and respect people's rights. This is general information, so get advice from a qualified Nigerian data protection practitioner."
      },
      {
        "q": "Do payment processor logos increase checkout conversion?",
        "a": "They can reduce hesitation, but they are one factor among many. Baymard's research on US shoppers found surprise costs were the most common reason for abandoning a cart, ahead of distrust of card security. Show accepted payment methods near your price and at checkout, show the full cost early and test the result."
      },
      {
        "q": "Are Paystack, Flutterwave, Moniepoint and Squad banks?",
        "a": "Not in the same way as a commercial bank. Reports say Flutterwave announced a CBN microfinance banking licence in April 2026, Paystack has acquired a microfinance bank, and Moniepoint operates through a microfinance bank. Squad was built by GTCO, the group behind GTBank. Use plain wording on your site and verify any licence claim."
      },
      {
        "q": "Which payment gateway is best for my Nigerian online store?",
        "a": "It depends on your fees, settlement speed, supported payment methods, customer support and integration needs. Compare at least two providers, test them with real transactions and offer a second route in case one has downtime."
      },
      {
        "q": "How much does WhatsApp AI automation cost in Nigeria?",
        "a": "Cost depends on how many systems the assistant connects to, your conversation volume and the model you use. There is a one-time build cost and a monthly running cost. Message us with your conversation volume and the systems you use, and we will give you a scoped quote."
      }
    ],
    "source": "TechCrunch, “WhatsApp changes its terms to bar general-purpose chatbots from its platform” (https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/); respond.io, “WhatsApp chatbot policy 2026” (https://respond.io/blog/whatsapp-chatbot-policy-2026); Baymard Institute, “Cart abandonment rate statistics” (https://baymard.com/blog/cart-abandonment-rate); Pavestones Legal via Mondaq, “Use of emerging technologies in data processing: legal and regulatory considerations in Nigeria” (https://www.mondaq.com/nigeria/privacy-protection/1733800/use-of-emerging-technologies-in-data-processing-legal-and-regulatory-considerations-in-nigeria); WeeTracker, Flutterwave banking licence, April 2026 (https://weetracker.com/?p=87883); African Business, “Nigerian fintechs march into banks' territory”, May 2026 (https://african.business/2026/05/long-reads/nigerian-fintechs-march-into-banks-territory); Nairametrics, “CBN upgrades Opay, Moniepoint, other major fintechs' MFBs to national status”, 26 January 2026 (https://nairametrics.com/2026/01/26/cbn-upgrades-opay-moniepoint-other-major-fintechs-mfbs-to-national-status); GTBank, Squad (https://gtbank.com/squad); TechCabal, CBN market-share rule for payment firms (https://techcabal.com/?p=190329).",
    "cta": "Want your WhatsApp AI and checkout reviewed? Message Correct Marketer NG on WhatsApp at +234 911 017 2901 and ask for an AI automation and checkout review."
  }
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
