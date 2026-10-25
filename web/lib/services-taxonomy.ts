export type ServiceGroup = {
  slug: string;
  name: string;
  menuLabel: string;
  stage: 1 | 2 | 3 | 4 | 5;
  tagline: string;
  hubH1: string;
  summary: string;
  howTheyWorkTogether: string;
  metaTitle: string;
  metaDescription: string;
};

export type Service = {
  slug: string;
  path: string;
  name: string;
  menuLabel: string;
  groupSlug: string;
  order: number;
  status: "existing" | "new";
  snippet: string;
  primaryKeyword: string;
  deliverables: string[];
  nigeriaAngle: string;
  relatedSlugs: string[];
  icon: string;
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "attract-customers",
    name: "Attract",
    menuLabel: "Attract",
    stage: 1,
    tagline: "Get found by people already looking for what you sell.",
    hubH1: "Attract more of the right customers",
    summary:
      "Attract is the first stage of a growth system: make the right people notice your business, then give them a clear reason to trust what they find.",
    howTheyWorkTogether:
      "Search (SEO, local SEO) captures people with intent. Paid and social ads create demand on demand. Content, creators and PR build the familiarity that makes people choose you. Brand strategy keeps it all consistent so attention turns into trust. Every channel in this stage should point to a page or WhatsApp path built in Generate Leads.",
    metaTitle: "Attract Customers in Nigeria | Correct Marketer NG",
    metaDescription:
      "Get found by Nigerian buyers through search, advertising, content and brand strategy. Explore the channels that bring the right people to your business.",
  },
  {
    slug: "generate-leads",
    name: "Generate Leads",
    menuLabel: "Generate Leads",
    stage: 2,
    tagline: "Turn attention into conversations you can follow up.",
    hubH1: "Turn attention into leads you can follow up",
    summary:
      "Generate Leads gives interested visitors a useful next step, captures their details and records how each conversation began.",
    howTheyWorkTogether:
      "Attention is worth nothing until someone raises a hand. This stage builds where visitors land (website, landing pages), why they share their details (lead magnets and offers), how they get in touch (forms and WhatsApp), and the tracking that records where every lead came from.",
    metaTitle: "Generate Leads in Nigeria | Correct Marketer NG",
    metaDescription:
      "Turn website visits and campaign attention into leads you can follow up. Build clearer landing pages, contact paths and attribution for your business.",
  },
  {
    slug: "nurture-prospects",
    name: "Nurture",
    menuLabel: "Nurture",
    stage: 3,
    tagline: "Follow up fast, stay helpful, keep warm leads warm.",
    hubH1: "Keep every prospect warm until they're ready to buy",
    summary:
      "Nurture keeps useful conversations moving after the first enquiry, with timely replies and a shared record of each prospect's needs.",
    howTheyWorkTogether:
      "Most leads are not ready on day one. A configured WhatsApp Business account and AI agents reply instantly, a CRM remembers every conversation and stage, and follow-up sequences keep the lead warm until they decide.",
    metaTitle: "Nurture Prospects in Nigeria | Correct Marketer NG",
    metaDescription:
      "Respond promptly and follow up consistently with WhatsApp, AI, CRM and email or SMS sequences designed around how Nigerian customers buy.",
  },
  {
    slug: "convert-leads",
    name: "Convert",
    menuLabel: "Convert",
    stage: 4,
    tagline: "Remove the doubts between 'interested' and 'paid'.",
    hubH1: "Turn interested leads into paying customers",
    summary:
      "Convert removes avoidable friction between interest and action: explain the offer clearly, answer buyer concerns and make the next step easy.",
    howTheyWorkTogether:
      "Conversion is clarity, trust and ease. Optimisation and funnel design sharpen the pitch, social proof builds trust, payment and booking make acting easy, sales training makes chat conversations close, and retargeting recovers people who drifted away.",
    metaTitle: "Convert More Leads in Nigeria | Correct Marketer NG",
    metaDescription:
      "Help interested buyers take the next step with clearer offers, trust signals, easier payments and bookings, stronger sales conversations and retargeting.",
  },
  {
    slug: "retain-and-scale",
    name: "Retain & Scale",
    menuLabel: "Retain & Scale",
    stage: 5,
    tagline: "Grow revenue from the customers and systems you already have.",
    hubH1: "Keep customers coming back and scale what works",
    summary:
      "Retain & Scale helps a business learn from customers, repeat what works and strengthen the systems needed for its next phase.",
    howTheyWorkTogether:
      "Retention and referrals compound revenue. Dashboards show what is working. Controlled scaling and testing grow it safely. Market expansion, process automation and custom tools remove ceilings, and training or a fractional CMO adds senior direction.",
    metaTitle: "Retain & Scale Your Business | Correct Marketer NG",
    metaDescription:
      "Build repeat business, see what is working and scale carefully with dashboards, automation, market expansion, practical AI training and senior direction.",
  },
];

type ServiceInput = Omit<Service, "path" | "relatedSlugs">;

const serviceInputs: ServiceInput[] = [
  {
    slug: "best-seo-agency-in-nigeria",
    name: "SEO",
    menuLabel: "SEO",
    groupSlug: "attract-customers",
    order: 1,
    status: "existing",
    snippet: "Rank for the searches that create customers, on Google and in AI-powered search.",
    primaryKeyword: "SEO agency Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "search",
  },
  {
    slug: "local-seo-google-business-profile-nigeria",
    name: "Local SEO & Google Business Profile",
    menuLabel: "Local SEO & Google Maps",
    groupSlug: "attract-customers",
    order: 2,
    status: "new",
    snippet: "Show up on Google Maps and \"near me\" searches in Lagos, Abuja, Port Harcourt and beyond.",
    primaryKeyword: "local SEO Nigeria",
    deliverables: [
      "Google Business Profile setup and optimisation",
      "Area-specific landing pages",
      "Review-generation system",
      "Listing and contact-detail consistency clean-up",
    ],
    nigeriaAngle: "Customers search by area name (Lekki, Ikeja, Wuse, GRA); map listings drive calls and WhatsApp taps.",
    icon: "map-pin",
  },
  {
    slug: "best-google-ads-agency-in-nigeria",
    name: "Google & Meta Ads",
    menuLabel: "Google & Meta Ads",
    groupSlug: "attract-customers",
    order: 3,
    status: "existing",
    snippet: "Turn ad spend into real enquiries with the right audience, offer and landing page.",
    primaryKeyword: "Google Ads agency Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "target",
  },
  {
    slug: "social-media-advertising-agency-in-nigeria",
    name: "Social Media Advertising",
    menuLabel: "Social Media Ads",
    groupSlug: "attract-customers",
    order: 4,
    status: "new",
    snippet: "Reach buyers on TikTok, Instagram, YouTube and LinkedIn with ads built for each platform.",
    primaryKeyword: "social media advertising Nigeria",
    deliverables: [
      "Platform and audience strategy",
      "Creative concepts and ad copy",
      "Campaign setup and optimisation",
      "Weekly performance review",
    ],
    nigeriaAngle: "Nigerian audiences are mobile-first and heavy on Instagram, TikTok and YouTube; creative must work on slow connections and with sound off.",
    icon: "megaphone",
  },
  {
    slug: "click-to-whatsapp-ads-nigeria",
    name: "Click-to-WhatsApp Ads",
    menuLabel: "Click-to-WhatsApp Ads",
    groupSlug: "attract-customers",
    order: 5,
    status: "new",
    snippet: "Ads that open a WhatsApp chat instead of a form, so leads start talking to you immediately.",
    primaryKeyword: "click to WhatsApp ads Nigeria",
    deliverables: [
      "Meta click-to-WhatsApp campaigns",
      "Greeting message and quick replies",
      "Source tagging so each chat is traced to its ad",
      "Response-time workflow",
    ],
    nigeriaAngle: "Many Nigerian buyers prefer to message before they buy; WhatsApp is where trust gets built.",
    icon: "message-circle",
  },
  {
    slug: "content-video-marketing-agency-in-nigeria",
    name: "Content & Video Marketing",
    menuLabel: "Content & Video",
    groupSlug: "attract-customers",
    order: 6,
    status: "new",
    snippet: "Short-form video and useful content that builds familiarity before the buying decision.",
    primaryKeyword: "content marketing agency Nigeria",
    deliverables: [
      "Content pillars and calendar",
      "Short-form video scripts and production support",
      "Articles and insights",
      "Repurposing across platforms, including Pidgin and local-language options",
    ],
    nigeriaAngle: "Pidgin, Yoruba, Hausa and Igbo content can connect where polished English does not.",
    icon: "video",
  },
  {
    slug: "influencer-marketing-agency-in-nigeria",
    name: "Influencer & Creator Partnerships",
    menuLabel: "Influencer & Creators",
    groupSlug: "attract-customers",
    order: 7,
    status: "new",
    snippet: "Partner with creators your customers already trust, with tracking so you know what it earned.",
    primaryKeyword: "influencer marketing Nigeria",
    deliverables: [
      "Creator shortlisting and audience-quality vetting",
      "Briefs and deliverable agreements",
      "Tracked links and codes",
      "Results reporting",
    ],
    nigeriaAngle: "Creator reach is high but quality varies; vetting authenticity and tracking sales matters.",
    icon: "users",
  },
  {
    slug: "marketplace-optimisation-nigeria",
    name: "Marketplace Optimisation",
    menuLabel: "Marketplace Optimisation",
    groupSlug: "attract-customers",
    order: 8,
    status: "new",
    snippet: "Get more visibility and sales from Jumia, Jiji, Instagram and WhatsApp shops.",
    primaryKeyword: "marketplace marketing Nigeria",
    deliverables: [
      "Listing titles, descriptions and image guidance",
      "Category and keyword optimisation",
      "In-platform promotion and ad setup",
      "Routing repeat buyers to your own channels where platform rules allow",
    ],
    nigeriaAngle: "Marketplaces are where many Nigerians start shopping; ranking there is its own skill.",
    icon: "store",
  },
  {
    slug: "digital-pr-thought-leadership-nigeria",
    name: "Digital PR & Thought Leadership",
    menuLabel: "Digital PR & Authority",
    groupSlug: "attract-customers",
    order: 9,
    status: "new",
    snippet: "Build authority through press, guest features and founder-led content that people quote and share.",
    primaryKeyword: "digital PR Nigeria",
    deliverables: [
      "Positioning and story angles",
      "Media and publication outreach list",
      "Founder LinkedIn and article support",
      "Mention tracking",
    ],
    nigeriaAngle: "Features in credible Nigerian publications and podcasts build trust and strengthen search credibility.",
    icon: "newspaper",
  },
  {
    slug: "best-brand-strategy-agency-in-nigeria",
    name: "Brand Strategy",
    menuLabel: "Brand Strategy",
    groupSlug: "attract-customers",
    order: 10,
    status: "existing",
    snippet: "Become easier to trust, remember and choose with sharper positioning and expert content.",
    primaryKeyword: "brand strategy agency Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "sparkles",
  },
  {
    slug: "best-lead-generation-agency-in-nigeria",
    name: "Lead Generation",
    menuLabel: "Lead Generation",
    groupSlug: "generate-leads",
    order: 1,
    status: "existing",
    snippet: "A full system from first click to first conversation: landing pages, WhatsApp funnels, CRM capture and follow-up.",
    primaryKeyword: "lead generation agency Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "funnel",
  },
  {
    slug: "best-web-development-company-in-nigeria",
    name: "Web Development",
    menuLabel: "Website Development",
    groupSlug: "generate-leads",
    order: 2,
    status: "existing",
    snippet: "Premium, fast websites that rank in search and guide visitors to enquire or buy.",
    primaryKeyword: "web development company Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "monitor",
  },
  {
    slug: "landing-pages-lead-magnets-nigeria",
    name: "Landing Pages & Lead Magnets",
    menuLabel: "Landing Pages & Lead Magnets",
    groupSlug: "generate-leads",
    order: 3,
    status: "new",
    snippet: "Focused pages and valuable offers that make a visitor leave their details.",
    primaryKeyword: "landing page design Nigeria",
    deliverables: [
      "Offer and lead-magnet concept (ebook, checklist, quote, audit)",
      "Focused landing page",
      "Delivery flow by email and WhatsApp",
      "A/B test plan",
    ],
    nigeriaAngle: "Nigerian visitors are cautious with their details; clear value, few fields and a WhatsApp option help.",
    icon: "file-text",
  },
  {
    slug: "marketing-tracking-attribution-nigeria",
    name: "Tracking & Attribution Setup",
    menuLabel: "Tracking & Attribution",
    groupSlug: "generate-leads",
    order: 4,
    status: "new",
    snippet: "Know exactly which channel, ad or page produced each lead and customer.",
    primaryKeyword: "marketing analytics setup Nigeria",
    deliverables: [
      "GA4 and Tag Manager setup",
      "Meta pixel and conversions API",
      "WhatsApp-click and form tracking",
      "Lead source recorded in your CRM or sheet",
    ],
    nigeriaAngle: "With so many leads arriving by WhatsApp and phone calls, attribution gaps are common; this closes them.",
    icon: "chart",
  },
  {
    slug: "best-ai-automation-agency-in-nigeria",
    name: "AI Automation",
    menuLabel: "AI Automation",
    groupSlug: "nurture-prospects",
    order: 1,
    status: "existing",
    snippet: "WhatsApp and CRM automation that replies faster, qualifies leads and recovers lost sales.",
    primaryKeyword: "AI automation agency Nigeria",
    deliverables: [],
    nigeriaAngle: "",
    icon: "bot",
  },
  {
    slug: "whatsapp-business-setup-nigeria",
    name: "WhatsApp Business Setup",
    menuLabel: "WhatsApp Business Setup",
    groupSlug: "nurture-prospects",
    order: 2,
    status: "new",
    snippet: "A properly configured WhatsApp Business account with catalogue, labels and quick replies.",
    primaryKeyword: "WhatsApp Business setup Nigeria",
    deliverables: [
      "Profile, catalogue and business hours",
      "Labels mapped to pipeline stages",
      "Quick replies and away messages",
      "Broadcast opt-in practice",
      "Guidance on moving to the Cloud API as volume grows",
    ],
    nigeriaAngle: "For most Nigerian businesses WhatsApp is the sales desk; setup quality decides response speed.",
    icon: "phone",
  },
  {
    slug: "ai-whatsapp-sales-agent-nigeria",
    name: "AI WhatsApp Sales Agent",
    menuLabel: "AI WhatsApp Sales Agent",
    groupSlug: "nurture-prospects",
    order: 3,
    status: "new",
    snippet: "An AI agent that answers, qualifies and books leads on WhatsApp around the clock, then hands over to a human.",
    primaryKeyword: "AI WhatsApp chatbot Nigeria",
    deliverables: [
      "Conversation design in your brand voice",
      "Lead qualification and scoring",
      "Every chat logged to your CRM",
      "Human handover and safety rules",
      "Automatic follow-up reminders",
    ],
    nigeriaAngle: "Late-night and weekend enquiries are common and instant replies win them; handover rules keep sensitive chats with people.",
    icon: "bot-message",
  },
  {
    slug: "crm-setup-automation-nigeria",
    name: "CRM Setup & Automation",
    menuLabel: "CRM Setup & Automation",
    groupSlug: "nurture-prospects",
    order: 4,
    status: "new",
    snippet: "One place where every lead, conversation and deal stage lives, with follow-up reminders built in.",
    primaryKeyword: "CRM setup Nigeria",
    deliverables: [
      "Tool selection sized to your business (structured Google Sheet up to HubSpot or Zoho)",
      "Pipeline stages and fields",
      "Automatic capture from forms, ads and WhatsApp",
      "Reminders and task assignment",
      "Team onboarding",
    ],
    nigeriaAngle: "Many SMEs run on chat history and memory; even a well-structured sheet is a big step up.",
    icon: "database",
  },
  {
    slug: "follow-up-sequences-email-sms-whatsapp-nigeria",
    name: "Follow-Up Sequences",
    menuLabel: "Follow-Up Sequences",
    groupSlug: "nurture-prospects",
    order: 5,
    status: "new",
    snippet: "Timely email, SMS and WhatsApp follow-ups that keep warm leads moving toward a decision.",
    primaryKeyword: "email and SMS marketing Nigeria",
    deliverables: [
      "Sequence map by lead type",
      "Message copy per channel",
      "Send timing plus opt-in and opt-out handling",
      "Performance review",
    ],
    nigeriaAngle: "Bulk SMS still gets read in Nigeria; email and WhatsApp serve different moments; consent matters under the Nigeria Data Protection Act 2023.",
    icon: "mail",
  },
  {
    slug: "conversion-rate-optimisation-nigeria",
    name: "Conversion Rate Optimisation",
    menuLabel: "Conversion Optimisation",
    groupSlug: "convert-leads",
    order: 1,
    status: "new",
    snippet: "Find why visitors don't enquire or buy, then fix the pages, messages and steps in the way.",
    primaryKeyword: "conversion rate optimisation Nigeria",
    deliverables: [
      "Website conversion audit",
      "Session and behaviour review",
      "Prioritised fix list with implementation",
      "Test plan",
    ],
    nigeriaAngle: "Slow mobile loading, unclear next steps and missing WhatsApp options are common blockers on Nigerian sites.",
    icon: "sliders",
  },
  {
    slug: "sales-funnel-offer-design-nigeria",
    name: "Offer & Sales Funnel Design",
    menuLabel: "Offer & Funnel Design",
    groupSlug: "convert-leads",
    order: 2,
    status: "new",
    snippet: "Sharpen what you sell and map the path from first click to paid, step by step.",
    primaryKeyword: "sales funnel design Nigeria",
    deliverables: [
      "Offer positioning",
      "Funnel map by channel",
      "Page and message briefs",
      "Promotion calendar",
    ],
    nigeriaAngle: "Seasonal peaks (festive season, Ramadan, back-to-school, Black Friday) reward planned offers.",
    icon: "route",
  },
  {
    slug: "trust-social-proof-building-nigeria",
    name: "Trust & Social Proof",
    menuLabel: "Trust & Social Proof",
    groupSlug: "convert-leads",
    order: 3,
    status: "new",
    snippet: "Reviews, testimonials, case studies and credibility signals that calm buyer doubt.",
    primaryKeyword: "social proof marketing Nigeria",
    deliverables: [
      "Testimonial and review collection system",
      "Case study production",
      "Credential and registration signals (for example CAC registration, verified contacts)",
      "Reputation monitoring",
    ],
    nigeriaAngle: "Online scams make Nigerian buyers cautious; visible proof of who you are and who you have served builds confidence.",
    icon: "shield-check",
  },
  {
    slug: "payment-checkout-integration-nigeria",
    name: "Payment & Checkout Integration",
    menuLabel: "Payments & Checkout",
    groupSlug: "convert-leads",
    order: 4,
    status: "new",
    snippet: "Make paying you easy with Paystack, Flutterwave, bank transfer and payment links in chat.",
    primaryKeyword: "Paystack integration Nigeria",
    deliverables: [
      "Paystack or Flutterwave integration on your site",
      "Payment links for WhatsApp orders",
      "Transfer-confirmation flow",
      "Order notifications",
    ],
    nigeriaAngle: "Card, bank transfer and USSD preferences vary; offering the right mix reduces drop-off.",
    icon: "credit-card",
  },
  {
    slug: "booking-appointment-automation-nigeria",
    name: "Booking & Appointment Automation",
    menuLabel: "Booking Automation",
    groupSlug: "convert-leads",
    order: 5,
    status: "new",
    snippet: "Let customers book, get reminders and reschedule without back-and-forth messages.",
    primaryKeyword: "online booking system Nigeria",
    deliverables: [
      "Booking page and calendar setup",
      "WhatsApp and SMS reminders",
      "Deposit collection",
      "No-show follow-up",
    ],
    nigeriaAngle: "Clinics, salons, consultants and schools lose hours to scheduling chats and no-shows.",
    icon: "calendar",
  },
  {
    slug: "whatsapp-sales-team-training-nigeria",
    name: "WhatsApp Sales Team Training",
    menuLabel: "Sales Team Training",
    groupSlug: "convert-leads",
    order: 6,
    status: "new",
    snippet: "Train your team to reply fast, handle objections and close sales in chat.",
    primaryKeyword: "WhatsApp sales training Nigeria",
    deliverables: [
      "Response-time standard",
      "Scripts and objection handling",
      "Role-play sessions",
      "Scorecard and review",
    ],
    nigeriaAngle: "Speed and tone in chat decide many Nigerian sales; a shared playbook fixes uneven replies.",
    icon: "users-check",
  },
  {
    slug: "retargeting-cart-recovery-nigeria",
    name: "Retargeting & Cart Recovery",
    menuLabel: "Retargeting & Cart Recovery",
    groupSlug: "convert-leads",
    order: 7,
    status: "new",
    snippet: "Bring back visitors and abandoned carts with timely ads and messages.",
    primaryKeyword: "retargeting ads Nigeria",
    deliverables: [
      "Pixel and audience setup",
      "Retargeting ads by intent",
      "Abandoned-cart email and WhatsApp messages",
      "Frequency control and reporting",
    ],
    nigeriaAngle: "Buyers compare across tabs, chats and marketplaces before paying; staying visible wins the return visit.",
    icon: "repeat",
  },
  {
    slug: "customer-retention-loyalty-referral-nigeria",
    name: "Customer Retention, Loyalty & Referral",
    menuLabel: "Retention & Loyalty",
    groupSlug: "retain-and-scale",
    order: 1,
    status: "new",
    snippet: "Turn first-time buyers into repeat customers and referrers.",
    primaryKeyword: "customer retention Nigeria",
    deliverables: [
      "Repeat-purchase and win-back campaigns",
      "Loyalty and referral offers",
      "Customer segmentation",
      "Post-sale check-ins",
    ],
    nigeriaAngle: "Word of mouth is powerful in Nigeria; structured referrals amplify it.",
    icon: "heart-handshake",
  },
  {
    slug: "marketing-reporting-dashboards-nigeria",
    name: "Reporting Dashboards & Growth Reviews",
    menuLabel: "Reporting & Growth Reviews",
    groupSlug: "retain-and-scale",
    order: 2,
    status: "new",
    snippet: "Clear dashboards and monthly reviews that tie marketing spend to leads and sales.",
    primaryKeyword: "marketing dashboard Nigeria",
    deliverables: [
      "Looker Studio dashboard",
      "KPI definitions",
      "Monthly growth review",
      "Action plan",
    ],
    nigeriaAngle: "Owners often see numbers in five different places; one plain-language view builds confidence.",
    icon: "chart-no-axes",
  },
  {
    slug: "growth-scaling-ab-testing-nigeria",
    name: "Growth Scaling & A/B Testing",
    menuLabel: "Scaling & Testing",
    groupSlug: "retain-and-scale",
    order: 3,
    status: "new",
    snippet: "Scale what already works with controlled budget increases and structured tests.",
    primaryKeyword: "scale digital marketing Nigeria",
    deliverables: [
      "Identify winning channels and offers",
      "Scaling plan with guardrails",
      "A/B test roadmap",
      "Budget allocation across channels",
    ],
    nigeriaAngle: "Currency swings and rising ad costs make disciplined budget scaling important.",
    icon: "trending-up",
  },
  {
    slug: "market-expansion-diaspora-marketing-nigeria",
    name: "Market Expansion & Diaspora Marketing",
    menuLabel: "Market Expansion",
    groupSlug: "retain-and-scale",
    order: 4,
    status: "new",
    snippet: "Reach new cities and Nigerians abroad with localised campaigns and delivery or payment paths.",
    primaryKeyword: "diaspora marketing Nigeria",
    deliverables: [
      "City prioritisation and research",
      "Localised ads and landing pages",
      "Cross-border payment and delivery path",
      "Diaspora audience campaigns",
    ],
    nigeriaAngle: "Buying habits differ between Lagos, Abuja and Port Harcourt, and many Nigerians abroad buy for family back home.",
    icon: "globe",
  },
  {
    slug: "business-process-automation-nigeria",
    name: "Business Process Automation",
    menuLabel: "Process Automation",
    groupSlug: "retain-and-scale",
    order: 5,
    status: "new",
    snippet: "Automate invoicing, reminders, support triage and internal workflows with agentic AI.",
    primaryKeyword: "business process automation Nigeria",
    deliverables: [
      "Workflow audit and priority list",
      "Automations for invoicing and payment reminders, support triage and inventory alerts",
      "Human-approval checkpoints",
      "Documentation and handover",
    ],
    nigeriaAngle: "Owner-run businesses lose hours to repeat admin; automation gives that time back to selling.",
    icon: "workflow",
  },
  {
    slug: "custom-web-apps-dashboards-nigeria",
    name: "Custom Web Apps & Dashboards",
    menuLabel: "Custom Web Apps",
    groupSlug: "retain-and-scale",
    order: 6,
    status: "new",
    snippet: "Portals, internal tools and dashboards built around how your business actually works.",
    primaryKeyword: "custom web application development Nigeria",
    deliverables: [
      "Requirements workshop",
      "Design and build",
      "Integrations with payments, WhatsApp and CRM",
      "Training and support",
    ],
    nigeriaAngle: "Many SMEs outgrow spreadsheets long before they can justify enterprise software.",
    icon: "panels",
  },
  {
    slug: "ai-training-workshops-nigeria",
    name: "AI Training Workshops",
    menuLabel: "AI Training Workshops",
    groupSlug: "retain-and-scale",
    order: 7,
    status: "new",
    snippet: "Practical sessions that teach your team to use AI in daily marketing, sales and operations.",
    primaryKeyword: "AI training for businesses Nigeria",
    deliverables: [
      "Tailored half-day or full-day workshop",
      "Hands-on exercises using your own tasks",
      "Prompt and workflow library",
      "Follow-up Q&A",
    ],
    nigeriaAngle: "Teams often experiment with AI unevenly; shared practices bring consistency.",
    icon: "graduation",
  },
  {
    slug: "fractional-cmo-growth-retainer-nigeria",
    name: "Fractional CMO & Growth Retainer",
    menuLabel: "Fractional CMO / Retainer",
    groupSlug: "retain-and-scale",
    order: 8,
    status: "new",
    snippet: "Senior marketing leadership and ongoing execution without a full-time hire.",
    primaryKeyword: "fractional CMO Nigeria",
    deliverables: [
      "Quarterly growth plan",
      "Regular strategy sessions",
      "Oversight of vendors and team",
      "Leadership reporting",
    ],
    nigeriaAngle: "Growing businesses need senior direction before they can justify a full-time CMO.",
    icon: "compass",
  },
];

const crossGroupChoices: Record<string, string> = {
  "best-seo-agency-in-nigeria": "best-web-development-company-in-nigeria",
  "local-seo-google-business-profile-nigeria": "best-web-development-company-in-nigeria",
  "best-google-ads-agency-in-nigeria": "landing-pages-lead-magnets-nigeria",
  "social-media-advertising-agency-in-nigeria": "best-lead-generation-agency-in-nigeria",
  "click-to-whatsapp-ads-nigeria": "best-lead-generation-agency-in-nigeria",
  "content-video-marketing-agency-in-nigeria": "landing-pages-lead-magnets-nigeria",
  "influencer-marketing-agency-in-nigeria": "landing-pages-lead-magnets-nigeria",
  "marketplace-optimisation-nigeria": "best-web-development-company-in-nigeria",
  "digital-pr-thought-leadership-nigeria": "landing-pages-lead-magnets-nigeria",
  "best-brand-strategy-agency-in-nigeria": "best-lead-generation-agency-in-nigeria",
  "best-lead-generation-agency-in-nigeria": "crm-setup-automation-nigeria",
  "best-web-development-company-in-nigeria": "crm-setup-automation-nigeria",
  "landing-pages-lead-magnets-nigeria": "follow-up-sequences-email-sms-whatsapp-nigeria",
  "marketing-tracking-attribution-nigeria": "crm-setup-automation-nigeria",
  "best-ai-automation-agency-in-nigeria": "conversion-rate-optimisation-nigeria",
  "whatsapp-business-setup-nigeria": "payment-checkout-integration-nigeria",
  "ai-whatsapp-sales-agent-nigeria": "conversion-rate-optimisation-nigeria",
  "crm-setup-automation-nigeria": "customer-retention-loyalty-referral-nigeria",
  "follow-up-sequences-email-sms-whatsapp-nigeria": "retargeting-cart-recovery-nigeria",
  "conversion-rate-optimisation-nigeria": "growth-scaling-ab-testing-nigeria",
  "sales-funnel-offer-design-nigeria": "market-expansion-diaspora-marketing-nigeria",
  "trust-social-proof-building-nigeria": "customer-retention-loyalty-referral-nigeria",
  "payment-checkout-integration-nigeria": "customer-retention-loyalty-referral-nigeria",
  "booking-appointment-automation-nigeria": "customer-retention-loyalty-referral-nigeria",
  "whatsapp-sales-team-training-nigeria": "ai-training-workshops-nigeria",
  "retargeting-cart-recovery-nigeria": "marketing-reporting-dashboards-nigeria",
  "customer-retention-loyalty-referral-nigeria": "best-brand-strategy-agency-in-nigeria",
  "marketing-reporting-dashboards-nigeria": "marketing-tracking-attribution-nigeria",
  "growth-scaling-ab-testing-nigeria": "best-google-ads-agency-in-nigeria",
  "market-expansion-diaspora-marketing-nigeria": "social-media-advertising-agency-in-nigeria",
  "business-process-automation-nigeria": "best-ai-automation-agency-in-nigeria",
  "custom-web-apps-dashboards-nigeria": "best-web-development-company-in-nigeria",
  "ai-training-workshops-nigeria": "ai-whatsapp-sales-agent-nigeria",
  "fractional-cmo-growth-retainer-nigeria": "best-seo-agency-in-nigeria",
};

export const services: Service[] = serviceInputs.map((input) => {
  const groupServices = serviceInputs.filter(
    (candidate) => candidate.groupSlug === input.groupSlug,
  );
  const index = groupServices.findIndex((candidate) => candidate.slug === input.slug);
  const previous = groupServices[(index - 1 + groupServices.length) % groupServices.length];
  const next = groupServices[(index + 1) % groupServices.length];
  const crossGroup = crossGroupChoices[input.slug];
  return {
    ...input,
    path: `/services/${input.slug}`,
    relatedSlugs: [previous.slug, next.slug, crossGroup].filter(
      (slug, i, all) => slug !== input.slug && all.indexOf(slug) === i,
    ),
  };
});

export function getGroup(slug: string): ServiceGroup | undefined {
  return serviceGroups.find((group) => group.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByGroup(groupSlug: string): Service[] {
  return services
    .filter((service) => service.groupSlug === groupSlug)
    .sort((a, b) => a.order - b.order);
}

export function getNextGroup(groupSlug: string): ServiceGroup | undefined {
  const group = getGroup(groupSlug);
  return group ? serviceGroups[group.stage] : undefined;
}

export function getRelatedServices(slug: string): Service[] {
  const service = getService(slug);
  return service
    ? service.relatedSlugs.map((relatedSlug) => getService(relatedSlug)).filter(
        (related): related is Service => Boolean(related),
      )
    : [];
}

export function validateTaxonomy(): void {
  const slugs = new Set<string>();
  const groupSlugs = new Set<string>();
  for (const group of serviceGroups) {
    if (slugs.has(group.slug)) {
      throw new Error(`Duplicate taxonomy slug: ${group.slug}`);
    }
    slugs.add(group.slug);
    groupSlugs.add(group.slug);
  }

  const serviceSlugs = new Set<string>();
  for (const service of services) {
    if (slugs.has(service.slug)) {
      throw new Error(`Duplicate taxonomy slug: ${service.slug}`);
    }
    slugs.add(service.slug);
    serviceSlugs.add(service.slug);
    if (!groupSlugs.has(service.groupSlug)) {
      throw new Error(`Unknown group "${service.groupSlug}" for service "${service.slug}"`);
    }
  }

  for (const group of serviceGroups) {
    if (!services.some((service) => service.groupSlug === group.slug)) {
      throw new Error(`Service group "${group.slug}" has no services`);
    }
  }

  for (const service of services) {
    for (const relatedSlug of service.relatedSlugs) {
      if (!serviceSlugs.has(relatedSlug)) {
        throw new Error(`Unknown related service "${relatedSlug}" on "${service.slug}"`);
      }
    }
  }
}
