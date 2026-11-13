import type { Faq } from "./types";

/** Page copy for services that use the shared service template (the six flagship services have their own longer pages). */
export type ServiceCopy = { problem: string; forWho: string[]; faqs: Faq[] };

const c = (problem: string, forWho: string[], f1: [string, string], f2: [string, string]): ServiceCopy => ({
  problem,
  forWho,
  faqs: [{ q: f1[0], a: f1[1] }, { q: f2[0], a: f2[1] }],
});

export const serviceCopy: Record<string, ServiceCopy> = {
  "answer-engine-optimisation-geo-nigeria": c(
    "People now ask ChatGPT, Claude, Perplexity and Google's AI features for recommendations before they ever open a results page. If your business information is thin, inconsistent or hard to read, those answers can skip you or describe you wrongly.",
    ["Businesses that already rank or want to be found for local services", "Brands whose category is increasingly researched through AI assistants", "Teams with good content that is not structured for answers"],
    ["Can you guarantee my business will be mentioned by ChatGPT?", "No. No agency controls what an AI assistant says. We improve the clarity, structure and consistency of the information those systems rely on, then monitor how your brand appears and adjust."],
    ["How is AEO different from SEO?", "SEO helps pages rank in search results. AEO focuses on being the clear, trustworthy source an assistant can quote. The work overlaps, so we build on your SEO foundation instead of replacing it."],
  ),
  "local-seo-google-business-profile-nigeria": c(
    "Customers search by neighbourhood and city. A missing or inconsistent Google Business Profile means they cannot confirm your address, hours or reviews, so they call the competitor who appears first on the map.",
    ["Shops, clinics, restaurants, schools and service businesses with a physical location", "Businesses serving several areas such as Lagos, Abuja or Port Harcourt", "Owners whose listing information is outdated or duplicated"],
    ["How long does local SEO take to show results?", "Profile fixes can be reflected within days or weeks, while review growth and local ranking changes build over months. We report what moved and what is still in progress."],
    ["Do I need a website for local SEO?", "A Business Profile can work without one, but a clear location or service page helps customers and search engines. We will tell you which is worth doing first."],
  ),
  "social-media-advertising-agency-in-nigeria": c(
    "Boosting posts without a clear audience, offer and next step spends money on attention that never turns into enquiries. Many pages also run ads they cannot properly measure.",
    ["Brands selling on Instagram, Facebook, TikTok or LinkedIn", "Businesses with a clear offer that needs a wider audience", "Teams that tried boosting posts and could not see results"],
    ["Which platform should I advertise on?", "It depends on where your buyers spend time and what you can fulfil. We recommend one or two platforms to start instead of spreading a small budget thin."],
    ["What budget do I need?", "Enough to gather useful data over a few weeks. We set a starting range after looking at your offer, audience and capacity to respond, and we do not promise specific returns."],
  ),
  "click-to-whatsapp-ads-nigeria": c(
    "Many buyers would rather ask a question in chat than fill a form. If your ad sends them to a slow page, you lose them. If the chat opens but nobody replies promptly, the ad spend is wasted.",
    ["Businesses that close sales in WhatsApp conversations", "Brands with enquiries that need quick answers about price or availability", "Teams that can reply within minutes during business hours"],
    ["Do I need the WhatsApp Business API?", "Not always. Many campaigns start with a WhatsApp Business app number. We advise on the API when volume or automation needs justify it."],
    ["How do I know which ad produced a chat?", "We set up source tagging and a simple lead log so each conversation can be traced back to a campaign where the platform allows it."],
  ),
  "ai-content-marketing-agency-in-nigeria": c(
    "Most businesses need content every week across blog, social, email and ads but lack time, and generic AI output sounds like everyone else. Posting without a plan wastes effort and weakens trust.",
    ["Businesses that need steady content without a full in-house team", "Brands that tried AI tools and got bland or inaccurate drafts", "Teams that need one consistent voice across channels"],
    ["Will my content sound like AI?", "We build a brand-voice guide first, then edit every piece with a person. AI speeds up drafting, but people check facts, tone and fit."],
    ["Who owns the content?", "You do. We agree usage and ownership in writing before work starts, and we flag any third-party material that needs permission."],
  ),
  "ai-video-visual-content-nigeria": c(
    "Video builds trust faster than text, but traditional production is slow and costly, so many businesses publish little or nothing. Fast AI videos made without review can look off-brand or contain errors.",
    ["Brands that need explainers, product demos or short ads", "Businesses with products or services that are easier to show than describe", "Teams that want to test several creative angles quickly"],
    ["Can you make videos with a spokesperson avatar?", "Yes, where it suits your brand, and we make clear to viewers when synthetic presenters are used. We also use real footage and voiceovers when that is the better choice."],
    ["Do I own the finished videos?", "Yes under the agreed licence terms. We check tool licences and any stock or likeness rights before we deliver."],
  ),
  "multilingual-content-yoruba-igbo-hausa-nigeria": c(
    "English-only marketing leaves out customers who trust and buy more readily in Yoruba, Igbo, Hausa or Pidgin. Machine translation alone can get tone and meaning wrong.",
    ["Brands selling to audiences in specific regions or language groups", "Community-facing businesses such as retail, health, education and finance", "Teams that want ads or WhatsApp messages in more than one language"],
    ["Is AI translation good enough?", "AI can draft quickly, but we always have a native speaker review for meaning, tone and local expressions before anything is published."],
    ["Which languages do you cover?", "We focus on Yoruba, Igbo, Hausa and Nigerian Pidgin, alongside English. We will confirm reviewer availability for your specific dialect before we start."],
  ),
  "influencer-marketing-agency-in-nigeria": c(
    "Choosing creators by follower count alone leads to posts that look good but do not reach the right buyers. Without tracked links or clear deliverables you cannot tell what the campaign produced.",
    ["Consumer brands launching products or promotions", "Businesses that want authentic recommendations from relevant creators", "Teams that want measurable creator campaigns instead of one-off posts"],
    ["How do you pick creators?", "We start with your audience and goals, then review audience fit, content quality and past partnerships before shortlisting."],
    ["How do you measure results?", "Through tracked links, codes and agreed measures such as enquiries and sales where possible, not only likes and views."],
  ),
  "marketplace-optimisation-nigeria": c(
    "On a crowded marketplace, weak titles, poor images and missing details push your products down and send buyers elsewhere.",
    ["Sellers on Jumia, Konga, Amazon or similar marketplaces", "Brands launching new products on marketplaces", "Stores with listings but little marketplace traffic"],
    ["Which marketplaces should I use?", "We recommend marketplaces by where your customers shop and which delivery and return promises you can reliably keep."],
    ["Can you manage my listings too?", "Yes, as an ongoing service or a one-time clean-up. We agree the scope and reporting before we start."],
  ),
  "digital-pr-thought-leadership-nigeria": c(
    "Buyers check who is behind a business before they commit. Without credible mentions, expert commentary or founder visibility, a strong offer can still feel unproven.",
    ["Founders and leaders building credibility in their field", "Businesses entering a new market or launching a new offer", "Brands with real expertise that is not visible publicly"],
    ["Can you guarantee press coverage?", "No. Editors decide what they publish. We build strong angles, target relevant outlets and report honestly on responses and coverage."],
    ["What do I need to provide?", "Access to your expertise, examples and results you are allowed to share. We handle angles, drafting and outreach with your approval."],
  ),
  "landing-pages-lead-magnets-nigeria": c(
    "Sending ad or social traffic to a general homepage makes visitors search for what they came for. Without a useful offer, most people leave without leaving their contact details.",
    ["Businesses running ads or campaigns for a specific offer", "Brands that want to build a list of interested prospects", "Teams whose forms get visits but few submissions"],
    ["What is a lead magnet?", "A useful free resource such as a checklist, guide, quote or audit offered in exchange for contact details. It should match what your buyers need right before they enquire."],
    ["Should the page collect an email or a WhatsApp number?", "It depends on how you follow up. We recommend the channel your team will actually answer on, and ask only for the details you need."],
  ),
  "marketing-tracking-attribution-nigeria": c(
    "Without tracking, you cannot tell which channel or campaign brings enquiries. WhatsApp chats and calls are often missing from reports, so budget decisions rest on guesses.",
    ["Businesses spending on ads or SEO without clear reporting", "Teams whose leads arrive by WhatsApp, calls and forms", "Owners who want to see which spend leads to sales"],
    ["Can you track WhatsApp and phone enquiries?", "Yes, to a practical degree. We set up click and call events, tagged links and a simple lead log, and explain what cannot be measured exactly."],
    ["Do I need Google Analytics?", "Most businesses benefit from analytics. We confirm what is installed, fix gaps and agree a short list of measures that matter to you."],
  ),
  "whatsapp-business-setup-nigeria": c(
    "A personal-style WhatsApp number with no catalogue, quick replies or labels makes busy teams slow and inconsistent, and enquiries get lost in the chat list.",
    ["Small businesses that sell or support customers through WhatsApp", "Teams that share one number between several staff", "Owners who want a tidier, more professional chat setup"],
    ["Should I use the WhatsApp Business app or API?", "The app is a good start for small teams. We recommend the API when you need several agents, automation or CRM links."],
    ["Do you help with opt-ins and consent?", "Yes. We set up clear opt-in wording and opt-out handling so your messages respect customer preferences."],
  ),
  "ai-whatsapp-sales-agent-nigeria": c(
    "Prospects message at night or while your team is busy, and slow replies lose them. Answering the same questions repeatedly also uses time your team could spend closing.",
    ["Businesses with high WhatsApp enquiry volume", "Teams that answer similar product, price and availability questions", "Sales teams that need qualified leads handed over with context"],
    ["Will the AI agent say something wrong?", "We limit the agent to approved information, add rules for what it should not answer, and route unclear or sensitive questions to a person. We review conversations after launch."],
    ["Does the customer know they are chatting with AI?", "We recommend being transparent about this and giving customers an easy way to reach a person."],
  ),
  "crm-setup-automation-nigeria": c(
    "When leads live in phones, notebooks and chat threads, follow-ups are missed and nobody knows what stage each customer is at.",
    ["Sales teams juggling many enquiries", "Businesses that lose track of follow-ups", "Owners who want to see their pipeline in one place"],
    ["Which CRM should I use?", "We recommend based on your team size, channels and budget, and sometimes a well-structured spreadsheet is the right first step."],
    ["Can the CRM connect to WhatsApp and forms?", "Often yes, using native integrations or automation tools. We confirm what is possible with your chosen tools before we build."],
  ),
  "follow-up-sequences-email-sms-whatsapp-nigeria": c(
    "Most leads do not buy on the first contact. Without planned follow-up, interested people go quiet and your earlier marketing spend is wasted.",
    ["Businesses with enquiries that need more than one conversation", "Brands with email, SMS or WhatsApp lists", "Teams that follow up inconsistently"],
    ["How many follow-ups are right?", "It depends on the offer and buying cycle. We map the sequence by enquiry type, test timing and stop when people ask us to."],
    ["Do you use consent and opt-out rules?", "Yes. We check consent for each channel and make opting out simple."],
  ),
  "ai-chatbot-customer-service-automation-nigeria": c(
    "Customers expect fast answers at any hour. A small team cannot reply instantly to every question, and slow responses cost enquiries and trust.",
    ["Restaurants, clinics, schools, law firms and online stores with repeat questions", "Teams that want to book appointments and qualify leads automatically", "Businesses that need after-hours support"],
    ["What can the chatbot handle?", "Frequently asked questions, appointment requests, simple order or availability queries and lead qualification. It passes complex or sensitive matters to a person."],
    ["Where can the chatbot be placed?", "On your website, WhatsApp or other chat channels, depending on your customers and the tools you use."],
  ),
  "social-media-management-agency-in-nigeria": c(
    "Inconsistent posting, slow replies and unclear goals make a social page look inactive and stop followers from becoming customers.",
    ["Businesses that want steady social presence without a full-time hire", "Brands that post irregularly or without a content plan", "Teams that want analytics-led improvements"],
    ["Which platforms do you manage?", "We recommend a small number of platforms that suit your audience, such as Instagram, Facebook, TikTok or LinkedIn, and manage them well."],
    ["How is AI used in social media management?", "For drafts, repurposing, scheduling and reporting. A person reviews content, replies to sensitive messages and decides strategy changes."],
  ),
  "whatsapp-marketing-automation-nigeria": c(
    "Sending the same message to everyone makes customers ignore or block you. Relevant, well-timed, opt-in messages keep people engaged without annoying them.",
    ["Businesses with a customer or prospect list on WhatsApp", "Brands running promotions, reminders or product updates", "Teams that want to personalise messages by customer type"],
    ["Is bulk WhatsApp messaging allowed?", "WhatsApp has rules for business messaging. We use approved templates, opt-in lists and the official tools so you stay within platform policies."],
    ["How is it personalised?", "By segment, such as past purchase, interest or stage, using the details you have permission to use."],
  ),
  "conversion-rate-optimisation-nigeria": c(
    "You may already get visitors but too few enquiries or sales. Small frictions such as slow pages, unclear offers and hidden contact options quietly cost you customers.",
    ["Businesses with website traffic but low enquiries", "Stores with many visits and few purchases", "Teams about to increase ad spend"],
    ["What do you change first?", "We start with an evidence-based review of the enquiry path and prioritise the fixes most likely to help, such as clarity, speed, trust and contact options."],
    ["Do you run A/B tests?", "When there is enough traffic to learn from. Otherwise we make clear improvements and measure before and after."],
  ),
  "sales-funnel-offer-design-nigeria": c(
    "A strong product can still sell poorly when the offer is unclear or the path from first click to payment has missing steps.",
    ["Businesses launching or relaunching an offer", "Brands with several products but no clear entry offer", "Teams whose campaigns bring interest that stalls"],
    ["What is included in a funnel map?", "The steps from first interaction to purchase for each channel, the message at each step and where follow-up happens."],
    ["Can you build the funnel too?", "Yes, or we hand the plan to your team. We agree the scope before we start."],
  ),
  "trust-social-proof-building-nigeria": c(
    "Many Nigerian buyers worry about scams or poor delivery. If they cannot verify who you are, they hesitate or choose a brand that looks safer.",
    ["Newer businesses or brands selling online", "Businesses with happy customers but no visible proof", "Teams whose leads ask for references before buying"],
    ["Do you write fake reviews?", "No. We help you collect genuine reviews and permissioned testimonials, and present them clearly."],
    ["What counts as proof?", "Reviews, results you can verify, photos of real work, certifications, business details and clear policies."],
  ),
  "payment-checkout-integration-nigeria": c(
    "Confusing payment steps, failed transactions or manual transfer confirmations make customers abandon purchases or delay payment.",
    ["Online stores and service businesses taking payments", "Businesses relying on manual bank transfers", "Teams that want clearer payment confirmation"],
    ["Which payment providers do you work with?", "Providers such as Paystack and Flutterwave, depending on what suits your business and customers. We confirm fees and terms with you before setup."],
    ["Can customers pay through WhatsApp?", "Often yes, using payment links and confirmation flows. We design this around your process."],
  ),
  "booking-appointment-automation-nigeria": c(
    "Scheduling by message takes time, and missed or forgotten appointments waste your day.",
    ["Clinics, salons, consultants, schools and service providers", "Businesses that book by DM or phone", "Teams with many no-shows"],
    ["Can customers book through WhatsApp or the website?", "Yes. We set up the channel your customers prefer and connect it to your calendar."],
    ["Do reminders really reduce no-shows?", "They often help by keeping the appointment top of mind. We track attendance and adjust timing and wording."],
  ),
  "whatsapp-sales-team-training-nigeria": c(
    "Even good leads are lost when staff reply slowly, differ in tone or forget to follow up.",
    ["Sales and customer service teams that work in WhatsApp", "Businesses that want consistent replies across staff", "Owners handing chats to new team members"],
    ["What does the training cover?", "Reply speed and ownership, scripts and objection handling, qualification questions and chat etiquette, with practice exercises."],
    ["Is training in person or online?", "Either, depending on your team. We agree format and length after reviewing how your team works today."],
  ),
  "retargeting-cart-recovery-nigeria": c(
    "Most visitors leave without buying. Without a reminder, many never return, even when they were interested.",
    ["Online stores with abandoned carts", "Businesses with website visitors who did not enquire", "Teams that already run ads"],
    ["Is retargeting creepy?", "It can be if it is overused. We cap frequency, use relevant messages and respect privacy and consent rules."],
    ["Can you promise recovered sales?", "No. Results vary. We set up tracking so you can see what retargeting contributes."],
  ),
  "ecommerce-optimisation-ai-nigeria": c(
    "Large catalogues with thin product descriptions, no upsell and no cart recovery leave sales on the table.",
    ["Online stores with a growing catalogue", "Fintech and online services with product-style funnels", "Teams that want better product content at scale"],
    ["How is AI used for product descriptions?", "To draft descriptions faster from your product data, with a person checking accuracy, tone and any claims before publishing."],
    ["Can you recover abandoned carts?", "Yes, using email, WhatsApp or ads where you have permission, with reminders timed to the buying cycle."],
  ),
  "customer-retention-loyalty-referral-nigeria": c(
    "Winning a customer costs money. When nobody follows up after the sale, repeat purchases and referrals depend on chance.",
    ["Businesses with repeat or seasonal customers", "Brands that want more word-of-mouth referrals", "Teams that rarely contact past customers"],
    ["How do referrals work?", "We design a simple, genuine referral offer that fits your business, then track and reward it clearly."],
    ["Which channels do you use?", "The ones your customers prefer, with their permission, such as WhatsApp, email or SMS."],
  ),
  "marketing-reporting-dashboards-nigeria": c(
    "Reports full of impressions do not tell you which spend produced enquiries or revenue, so decisions are slow or based on feelings.",
    ["Owners and managers who want one clear picture", "Businesses spending across several channels", "Teams preparing monthly or quarterly reviews"],
    ["What goes on the dashboard?", "A short list of agreed measures such as spend, enquiries, cost per enquiry, sales and source, plus notes on what to do next."],
    ["Do you use AI for reporting?", "AI can help summarise trends and spot unusual changes. A person checks the numbers and conclusions."],
  ),
  "growth-scaling-ab-testing-nigeria": c(
    "Raising budgets or launching new channels without a testing plan can multiply waste and strain cash flow.",
    ["Businesses with a campaign that already works", "Teams planning to increase marketing spend", "Owners who want to test improvements safely"],
    ["How do you decide when to scale?", "We look at cost per enquiry, close rate, margin and your capacity, then increase budget in steps with clear stop rules."],
    ["What do you A/B test?", "Offers, creatives, landing pages and messages, one change at a time where traffic allows."],
  ),
  "market-expansion-diaspora-marketing-nigeria": c(
    "What works in Lagos may not work in Abuja, Kano or among Nigerians abroad. Buying habits, logistics and payments differ.",
    ["Businesses opening in a new Nigerian city", "Brands serving the diaspora", "Exporters or online sellers shipping to new regions"],
    ["How do you choose a new market?", "By researching demand, competitors, delivery options and payment preferences, then running a small pilot."],
    ["Do you handle logistics?", "No, but we plan marketing around the delivery and payment options you can reliably offer."],
  ),
  "business-process-automation-nigeria": c(
    "Teams lose hours each week on repeat tasks such as invoices, reports and onboarding, and manual steps cause delays and mistakes.",
    ["Businesses with repetitive admin work", "Teams that copy data between tools", "Owners who want to free staff for higher-value work"],
    ["Which tools do you use?", "Tools such as Make, Zapier and n8n, chosen to fit your systems, security needs and budget."],
    ["Will automation replace my staff?", "The aim is to remove repetitive work. We keep people in charge of decisions that affect customers or money."],
  ),
  "custom-web-apps-dashboards-nigeria": c(
    "Off-the-shelf tools sometimes do not fit how your business works, and workarounds in spreadsheets become fragile.",
    ["Businesses with a defined internal workflow", "Teams that need a client portal or custom dashboard", "Companies outgrowing spreadsheets"],
    ["How do you scope a custom tool?", "We run a requirements and user-flow session, agree a first version and build in stages so you see progress early."],
    ["Who owns the code?", "We agree ownership and hosting terms in writing before development starts."],
  ),
  "ai-training-workshops-nigeria": c(
    "Teams use AI tools without guidance, which leads to inconsistent quality, privacy mistakes and wasted time.",
    ["Business owners and teams new to AI tools", "Marketing, sales and operations staff", "Companies that want an AI readiness assessment"],
    ["Is the training technical?", "No. It is practical and tied to your daily tasks, with exercises on your own examples."],
    ["Can you start with an assessment?", "Yes. An AI readiness assessment helps us choose the right topics and priorities for your team."],
  ),
  "fractional-cmo-growth-retainer-nigeria": c(
    "Many businesses need senior marketing direction but cannot justify a full-time executive, so priorities shift and campaigns lack ownership.",
    ["Founders handling marketing alone", "Businesses with an in-house team but no senior lead", "Companies planning a growth push"],
    ["What does a retainer include?", "Quarterly priorities, regular reviews, vendor and team coordination, and leadership reporting, agreed in advance."],
    ["How long is the commitment?", "We agree a term that suits you and review it regularly, so you are not locked in without value."],
  ),
};
