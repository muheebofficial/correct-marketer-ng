import type { Post } from "./types";

export const websiteNotShowingPost: Post = {
  slug: "why-your-website-is-not-showing-on-google-nigeria",
  title: "Why Your Website Isn’t Showing on Google in Nigeria (And How to Fix It)",
  description:
    "You have a beautiful website but customers can’t find it. 14 reasons Nigerian business websites don’t show on Google, ChatGPT or AI Overviews, and a 90-day plan to fix each one.",
  category: "SEO",
  tags: ["SEO", "Local SEO", "GEO", "Google Business Profile", "AI Overviews", "Nigeria", "Schema"],
  keywords: [
    "why is my website not showing on Google",
    "website not showing on Google Nigeria",
    "how to rank on Google Nigeria",
    "local SEO Nigeria",
    "SEO for restaurants in Lagos",
    "Google Business Profile Nigeria",
    "how to get found on Google",
    "get recommended by AI Overviews",
    "SEO GEO AIO Nigeria",
  ],
  author: "Muheeb Sulaiman",
  published: "2026-11-19",
  updated: "2026-11-19",
  readingMinutes: 24,
  image: "/blog/why-your-website-is-not-showing-on-google-nigeria.png",
  imageAlt:
    "A search bar reading affordable restaurant in Lekki with results listed and your website missing on page nine, beside the headline Beautiful website, no customers?",
  service: "best-seo-agency-in-nigeria",
  intro:
    "You spent real money on your website. The design is clean, the colours are right, and it looks premium. So let me ask you something: how many customers have actually found it through Google? For a lot of Nigerian business owners, the honest answer is almost none. Not because the website is bad, but because nobody told them a website and being found are two different jobs. A website gives your business a home on the internet. SEO helps people find the address. Without it, you are running a beautiful shop in the middle of nowhere.",
  quickAnswer:
    "A website usually does not show on Google for one of three reasons: Google cannot find or index it, Google does not think it is the best answer for what people are searching, or Google cannot tell where your business is or whether to trust it. Fix them in this order: first confirm your pages are indexed (search “site:yourwebsite.com” and check Google Search Console), then give every service and area its own page that answers real questions in plain text with naira prices, then claim and complete your Google Business Profile, keep your name, address and phone identical everywhere, make the site fast on mobile data, and earn reviews and mentions from other people. The same foundations help you appear in Google’s AI Overviews, ChatGPT and other AI tools. Google says no special optimisation is required for its AI features, and nobody can guarantee a ranking.",
  sections: [
    {
      heading: "Your website is the home. SEO is the address.",
      paragraphs: [
        "Picture a restaurant owner in Lagos. Somebody opens Google and types “best restaurant near me” or “affordable restaurant in Lekki”. If your website does not appear for those searches, how exactly are those people supposed to discover you? They will not scroll to page nine. They will tap one of the first few results, and most of those taps go to a business that did the work you did not know you had to do.",
        "Here is the part nobody explains. Google does not rank websites because they have beautiful colours or expensive animations. It ranks pages that it can find, understand and trust, and that answer what the searcher actually wants. Your design matters to the customer who has already arrived. It does nothing for the customer who never gets there.",
        "SEO, short for Search Engine Optimisation, is the work of closing that gap. It is not about stuffing keywords into your site and hoping. It is about making your business discoverable when potential customers are actively looking for what you offer. If you are new to the idea, our guides on [SEO vs AEO vs GEO](/blog/seo-vs-aeo-vs-geo-nigeria) and the [SEO, GEO and AEO starter guide](/blog/seo-geo-aeo-starter-guide-nigerian-businesses) explain the three layers. This article is the practical fix list.",
      ],
    },
    {
      heading: "How Google decides who to show: find, understand, rank",
      paragraphs: [
        "Before you fix anything, understand the three things Google does, because every reason your site is invisible lives in one of them.",
      ],
      table: {
        headers: ["Stage", "What Google does", "How it goes wrong for Nigerian sites"],
        rows: [
          ["1. Find (crawling)", "Follows links from pages it already knows to discover new ones.", "No other site links to you, the site was never submitted or linked, robots.txt or a firewall blocks Google, or key pages sit behind a menu Google cannot follow."],
          ["2. Understand (indexing)", "Reads the page, works out what it is about and stores it so it can be shown.", "A “noindex” tag left on from development, text locked inside images or PDFs, content that loads only through heavy scripts, or pages so similar Google keeps one."],
          ["3. Rank (serving)", "Picks the pages that best answer a search, using many signals including relevance, quality, location and usability.", "Vague pages, no service or area pages, slow mobile experience, no local signals, no reviews, no proof, and competitors who simply did more."],
        ],
      },
      after: [
        "Google’s own SEO starter guide is reassuring on one point: most pages are found automatically, and you usually do not need to do anything except publish. It also says you do not need to hire an SEO, and that Google does not use the meta keywords tag. So this is not a secret code. It is a checklist, and most of it is within your reach.",
      ],
    },
    {
      heading: "Step zero: check whether your website is on Google at all",
      paragraphs: [
        "Many owners skip this and spend months “doing SEO” on pages Google has never indexed. It takes ten minutes.",
      ],
      list: {
        ordered: true,
        items: [
          "**Search your own address.** In Google, type site:yourwebsite.com.ng (use your own domain). If results appear, those pages are indexed. If nothing appears, Google has not indexed your site yet, or something is blocking it.",
          "**Search your business name.** Type your exact business name plus your city. Do you appear, and is the information right?",
          "**Open Google Search Console.** It is free. Add your website, verify you own it, and look at the Pages report. It lists which pages are indexed and the reason others are not.",
          "**Inspect your most important page.** Paste your homepage into the URL Inspection tool in Search Console. It tells you whether Google can crawl and index it, and shows the page as Google sees it.",
          "**Check for a hidden block.** Ask your developer to confirm there is no “noindex” tag on your pages and that robots.txt, your hosting security or your CDN is not blocking Google’s crawler.",
        ],
      },
      after: [
        "If your site is indexed but still invisible for the searches that matter, move on to the fourteen reasons below. If it is not indexed, fix that first, because nothing else counts until it is.",
      ],
    },
    {
      heading: "14 reasons your website is not showing, and how to fix each one",
      paragraphs: ["If your site is indexed but still invisible for the searches that matter, one or more of these fourteen problems is almost always the cause. Each comes with the fix, so you can work down the list in order."],
    },
    {
      heading: "1. Google cannot find or index your pages",
      paragraphs: [
        "This is the silent killer. A “noindex” setting left on after the site was built, a robots.txt file that blocks everything, a new site with no links pointing to it, or a security plugin that turns crawlers away. Any of these can keep a good site out of Google entirely.",
        "**Fix:** use Search Console’s Pages report to see what is excluded and why. Remove accidental blocks, link to important pages from your menu and homepage, and submit a sitemap. Google says a sitemap is optional, but it helps, particularly on a new site.",
      ],
    },
    {
      heading: "2. You have one page that tries to say everything",
      paragraphs: [
        "A single homepage that says “we offer quality services” ranks for almost nothing. Google matches searches to pages, and one page cannot be the best answer to ten different questions.",
        "**Fix:** give every main service its own page, and every area you serve its own page where it makes sense, such as “office cleaning in Lekki” or “wedding catering in Ikeja”. Each page should open with a direct answer, then give detail, prices, proof and a clear next step.",
      ],
    },
    {
      heading: "3. Your pages do not match what people actually search",
      paragraphs: [
        "Nigerian customers search the way they talk: “affordable restaurant in Lekki”, “price of AC installation in Lagos”, “best salon near me”, “how much to build a website in Nigeria”. If your page says “culinary excellence” and the searcher types “cheap lunch near Yaba”, there is no match.",
        "**Fix:** write down the ten questions customers ask you on WhatsApp, in their own words, and make each the heading of a section or page. Use the words, areas and price language your customers use. Google’s language systems can handle variations, so write naturally, not like a keyword list.",
      ],
    },
    {
      heading: "4. You have no Google Business Profile, or it is half empty",
      paragraphs: [
        "For “near me” and area searches, the map results often matter more than your website. Google says local results rely mainly on relevance, distance and prominence, that businesses with complete and accurate information are more likely to show up, and that there is no way to request or pay for a better local ranking.",
        "**Fix:** claim and verify your profile. Choose the most accurate primary category, add every relevant service, upload real photos, keep hours and special hours current, link to the right page on your site, and reply to every review. For a restaurant, add your menu, price range and delivery options.",
      ],
    },
    {
      heading: "5. Your name, address and phone number do not match everywhere",
      paragraphs: [
        "One version on your website, another on Instagram, an old address on a directory, a different phone number on Facebook. Google and AI tools weigh consistency when deciding which details to believe. Mismatches make them less sure of any of them.",
        "**Fix:** pick one exact business name, one address format, one phone number and one website address, then update them everywhere: website, Google Business Profile, social pages, directories, WhatsApp Business and any ChatGPT business profile. Our guide to [listing your business on ChatGPT](/blog/list-your-business-on-chatgpt-nigeria) covers the OpenAI side.",
      ],
    },
    {
      heading: "6. Your site is slow or clumsy on a phone",
      paragraphs: [
        "DataReportal counted about 165 million cellular connections in Nigeria at the end of 2025, and many of your customers will meet your website on a phone, often on mobile data. Heavy images, bloated page builders and cheap hosting far from your audience make pages crawl, and visitors leave before the page appears.",
        "Google recommends good Core Web Vitals for success in Search. Its targets are the main content loading within 2.5 seconds, responding to taps in under 200 milliseconds, and no jumping layout. Google does not describe these as a single ranking factor, but they match what its systems aim to reward, and they decide whether visitors stay.",
        "**Fix:** compress images, remove unused plugins, choose reliable hosting with a CDN, and test on mobile data, not office Wi-Fi. Our [Website Conversion Checker](/tools/website-conversion-checker) gives you a quick read, and our [web development team](/services/best-web-development-company-in-nigeria) can fix what it finds.",
      ],
    },
    {
      heading: "7. Your important information is trapped in images or PDFs",
      paragraphs: [
        "A beautiful menu photo, a price list saved as an image, a brochure PDF: customers can see them, but search engines and AI tools often cannot read them well. Google’s own guidance says to make sure important content is available in text.",
        "**Fix:** put menus, prices, services, opening hours and delivery areas on the page as real text. Keep the pretty image too, and add descriptive alt text so people using screen readers and search engines understand it.",
      ],
    },
    {
      heading: "8. Your titles and headings say nothing",
      paragraphs: [
        "Your title tag is the blue headline people see in results. “Home” or “Welcome to ABC Ltd” wastes it. Google says a good title is unique to the page, clear and concise, and accurately describes it. A good meta description is short, unique and includes the most relevant points, though Google may write its own snippet.",
        "**Fix:** give every page a unique title with what you offer, where, and your name, for example “Affordable Lunch in Lekki | ABC Kitchen”. Use one clear main heading per page and descriptive subheadings so readers can scan.",
      ],
    },
    {
      heading: "9. Your content is thin, copied or written for machines",
      paragraphs: [
        "Pages with two vague sentences, text copied from competitors, or AI-generated filler give Google no reason to prefer you. Google’s guidance asks whether content offers original information, whether you are mainly summarising what others say, and whether it was made to help people or to attract search visits.",
        "**Fix:** add what only you can say: your real prices, photos of your own work, answers to the awkward questions, the named person behind the business, and examples from real customers. If AI helps you draft, edit it with facts it could not know. Google also suggests being clear about who created the content and how.",
      ],
    },
    {
      heading: "10. Nobody else mentions or links to you",
      paragraphs: [
        "Links and mentions from other sites are part of how Google, and AI tools, judge whether a business is real and well known. Google lists links from other websites as part of what makes a local business prominent.",
        "**Fix:** earn them honestly. Get listed with the right business associations and chambers, ask suppliers and partners to link to you, offer expert comments to Nigerian business and tech publications, sponsor or speak at local events that publish sponsor pages, and ask customers who blog or post to mention you. Do not buy links in bulk or join link schemes, because that breaks Google’s rules and can hurt you.",
      ],
    },
    {
      heading: "11. You have few or no reviews, and you ignore the ones you have",
      paragraphs: [
        "Reviews help people choose, and Google says the number and rating of reviews are part of prominence. A profile with three reviews from two years ago looks abandoned next to a competitor with two hundred recent ones.",
        "**Fix:** ask every happy customer, at the moment they are happiest, and give them the direct link. Reply to every review, kindly and specifically, including the bad ones. Never buy or invent reviews. Fake reviews break platform rules and can get your listing removed.",
      ],
    },
    {
      heading: "12. You are not clear where you operate",
      paragraphs: [
        "If your site never says which city, areas or states you serve, Google has to guess. A Lagos business that does not mention Lagos, Lekki or Ikeja will lose to one that does.",
        "**Fix:** state your address, service areas and landmarks on your contact page and key service pages. Add a Google map. Mention real neighbourhoods naturally. If you serve more than one city, build a proper page for each, with real local detail, not copy-and-paste with the name swapped.",
      ],
    },
    {
      heading: "13. You have no trust signals",
      paragraphs: [
        "A site with no About page, no named person, no real address, no CAC registration, no reviews and no contact details gives neither people nor machines a reason to trust it. Google says E-E-A-T, which stands for experience, expertise, authoritativeness and trust, is not itself a ranking factor, but its systems use signals that can identify content with strong trust, and trust matters most.",
        "**Fix:** show who runs the business, show your CAC registration and real address, publish real project examples, add customer testimonials with permission, and make sure your site uses HTTPS. If you sell online, state delivery and return policies clearly.",
      ],
    },
    {
      heading: "14. You are not measuring, so you cannot improve",
      paragraphs: [
        "Without data you cannot tell whether SEO is working, and you cannot tell which fix mattered. Many Nigerian sites have no analytics at all.",
        "**Fix:** set up Search Console and Google Analytics. Track WhatsApp button clicks, calls and form submissions as goals, because for most Nigerian businesses that is where the sale starts. Check your Business Profile performance too. We cover what to track in the measurement section below.",
      ],
    },
    {
      heading: "The restaurant walkthrough: from invisible to the map pack",
      paragraphs: [
        "Take the restaurant in Lekki from the start of this article. Here is exactly what we would do, because the same pattern works for most local businesses.",
      ],
      list: {
        ordered: true,
        items: [
          "**Claim and complete the Google Business Profile.** Primary category “Restaurant” or the more specific type, such as Nigerian restaurant. Add dishes, price range, opening hours, delivery or takeaway options, photos taken at the actual restaurant, and a link to the menu page.",
          "**Build a real menu page in text.** Dish names, descriptions and prices in naira, not a photo of a menu. Update it when prices change, and add the date.",
          "**Create area and intent pages.** “Affordable restaurant in Lekki”, “Lunch near Lekki Phase 1”, “Event catering in Lekki”, each with real details: address, landmarks, how to get there, parking, hours and what makes you different.",
          "**Add structured data.** Restaurant markup with name, address, phone, opening hours, price range, cuisine and menu link, matching exactly what is visible on the page.",
          "**Collect reviews continuously.** A card on every table or a message on every delivery with the review link. Reply to all of them.",
          "**Add WhatsApp ordering and track it.** A visible button beside the menu and prices, with click tracking.",
          "**Earn local mentions.** Food bloggers, event pages, neighbouring businesses and local publications.",
          "**Answer the questions.** A short FAQ: do you deliver to Ajah, can you cater 100 guests, do you take pre-orders, what are your prices for events.",
        ],
      },
      after: [
        "Other sectors follow the same pattern. See how it applies to [restaurants and food](/industries/restaurants-food), [ecommerce](/industries/ecommerce), [professional services](/industries/professional-services), [real estate](/industries/real-estate), [education](/industries/education) and [Nigerian SMEs](/industries/nigerian-smes).",
      ],
    },
    {
      heading: "Local SEO in plain English: relevance, distance, prominence",
      paragraphs: [
        "When someone searches “near me” or includes an area, Google’s local results work mainly on three ideas, according to Google’s own help pages.",
      ],
      list: {
        items: [
          "**Relevance:** how well your profile matches what the person searched for. Complete, detailed information, with the right category and services, helps Google match you.",
          "**Distance:** how far you are from the searcher, or from the place they named. You cannot change where you are, but you can make sure Google knows exactly where that is.",
          "**Prominence:** how well known you are, based on signals such as links from other websites, and the number and rating of your reviews.",
        ],
      },
      after: [
        "That is why reviews, accurate details and mentions from other sites matter, and why nobody can sell you a guaranteed spot on the map. Google states there is no way to request or pay for a better local ranking.",
      ],
    },
    {
      heading: "On-page SEO: the checklist for every page you want ranked",
      paragraphs: [],
      table: {
        headers: ["Element", "What to do", "Example"],
        rows: [
          ["Title tag", "Unique, clear, describes the page, includes your service and area.", "Affordable Lunch in Lekki | ABC Kitchen"],
          ["Meta description", "Short, unique, the page’s main points and a reason to click.", "Hot Nigerian lunch from ₦3,500 in Lekki Phase 1. See the menu, delivery areas and order on WhatsApp."],
          ["Main heading", "One clear heading that says what the page is.", "Affordable Restaurant in Lekki"],
          ["Opening answer", "Answer the main question in the first two sentences.", "ABC Kitchen serves lunch from ₦3,500 in Lekki Phase 1, open 10am to 10pm daily."],
          ["Subheadings", "Use customers’ questions as headings.", "Do you deliver to Ajah?"],
          ["Body content", "Real facts: prices in naira, what is included, who it is for, proof.", "Prices, photos, named people, real examples."],
          ["Images", "Sharp, relevant, close to related text, with descriptive alt text.", "Alt text: “Jollof rice and grilled chicken plate at ABC Kitchen, Lekki”"],
          ["Internal links", "Link related pages with descriptive wording.", "Link your menu page to your event catering page with the words “event catering in Lagos”"],
          ["Contact and action", "Clear next step: WhatsApp, call, order or book.", "Order on WhatsApp"],
          ["FAQ", "Answer real questions in plain text.", "Delivery areas, payment methods, bulk orders"],
        ],
      },
    },
    {
      heading: "Technical SEO, made simple",
      paragraphs: ["You do not need to be technical, but you do need to know what to ask your developer to check."],
      list: {
        items: [
          "**Mobile-friendly design** that works on small screens and slow connections.",
          "**Speed:** good Core Web Vitals, compressed images, lean code and decent hosting.",
          "**HTTPS** across the whole site.",
          "**Crawlable:** robots.txt, firewalls and CDNs are not blocking Google or other legitimate search crawlers.",
          "**Indexable:** no accidental noindex tags, and one preferred version of each page.",
          "**Clean structure:** logical menus, short readable web addresses, working links and no broken pages.",
          "**A sitemap** submitted in Search Console, as a helpful extra.",
          "**Content in text,** not locked in images, PDFs or scripts that fail to load.",
          "**Structured data** that matches what is visible on the page.",
        ],
      },
    },
    {
      heading: "Schema markup: which types matter, and what to avoid",
      paragraphs: [
        "Schema markup, also called structured data, is a set of labels in your page’s code that tells machines what the page contains: a business, a menu, an article, a question and its answer. Done honestly, it removes guesswork. It is housekeeping, not a ranking trick.",
        "Two rules from Google worth remembering. Structured data must match the visible text on the page, and Google says there is no special schema you need to add to appear in AI Overviews or AI Mode. It helps machines understand your content, but it does not guarantee a feature or a ranking. Here are the types that make sense for most Nigerian businesses.",
      ],
      table: {
        headers: ["Schema type", "Use it for", "Notes"],
        rows: [
          ["Organization or LocalBusiness (use the most specific subtype, such as Restaurant)", "Your homepage and contact page: name, address, phone, hours, website, social profiles, price range.", "Google’s local business guidance says to use the most specific subtype possible, and it lists name and address as required, with opening hours, phone, price range, geo coordinates and, for food businesses, menu and cuisine as recommended."],
          ["Service or Product", "Individual service or product pages.", "Include real prices only if they are shown on the page."],
          ["Article or BlogPosting", "Blog posts and guides.", "Include author, dates and image."],
          ["FAQPage", "Pages with genuine question-and-answer sections.", "Since 2023 Google shows FAQ rich results for only a narrow set of sites, but the markup still describes your content clearly to machines. Only mark up questions visible on the page."],
          ["BreadcrumbList", "Navigation paths.", "Helps search engines understand site structure."],
          ["HowTo", "Pages that teach real ordered steps.", "Use only when the page genuinely teaches steps."],
          ["Person", "Named authors and founders.", "Supports trust and entity understanding."],
        ],
      },
      after: [
        "**What to avoid:** do not mark up reviews of your own business on your own website to get star ratings. Google’s local business documentation says review and rating markup is only for sites that capture reviews about other local businesses, and breaking the guidelines can lead to a manual action. Do not mark up content that is not visible on the page. And do not copy a competitor’s markup without checking that every detail is true for you. This very article carries BlogPosting, HowTo, FAQPage and BreadcrumbList markup that matches what you can read on the page.",
      ],
    },
    {
      heading: "Getting recommended in AI Overviews, ChatGPT, Claude and other AI tools",
      paragraphs: [
        "Customers now ask AI tools instead of, or as well as, searching. The good news is that there is no separate secret system. The bad news is that nobody can guarantee a mention. Here is what we know, and what we do not.",
      ],
      list: {
        items: [
          "**Google AI Overviews and AI Mode.** Google says a page must be indexed and eligible to show in Search with a snippet, and that there are no additional requirements or special optimisations. It also says you do not need new machine-readable files, AI text files or special schema. Its best practices are the fundamentals: allow crawling, keep important content in text, keep structured data matching the page, and keep your Business Profile up to date. Indexing and serving is never guaranteed. Our guide to [Google AI Overviews and SEO in Nigeria](/blog/google-ai-overviews-seo-nigeria) goes deeper.",
          "**ChatGPT.** OpenAI’s crawler documentation says OAI-SearchBot surfaces sites in ChatGPT search, that opting out removes you from search answers, and that OpenAI recommends allowing it. OpenAI also launched Business Hub in beta in November 2026 for claiming a business profile, with eligibility limits. We explain what Nigerian businesses can and cannot do in our [guide to listing your business on ChatGPT](/blog/list-your-business-on-chatgpt-nigeria).",
          "**Claude and other assistants.** Anthropic’s assistant can search the web, and third-party analyses report that its search relies on an outside search index such as Brave. We could not verify that from Anthropic, so treat it as unconfirmed. The safe approach is the same for every tool: be indexable across major search engines, keep Bing Webmaster Tools set up as well as Google Search Console, and make sure the facts that matter are clear on your own site.",
          "**What actually earns mentions in all of them.** A clear identity, consistent details, pages that answer questions directly, real prices and facts, independent reviews and mentions from credible places, and recent, accurate updates. These are the same foundations as good SEO.",
          "**What does not work.** Hidden text, invented “AI-optimised” files sold as magic, fake reviews, mass-produced filler pages, and promises of guaranteed AI rankings.",
        ],
      },
      after: [
        "For the bigger picture, see our guide to what [Google’s research on AI that keeps learning](/blog/google-sleep-framework-ai-knowledge-nigerian-businesses) could mean for what AI knows about your business, and the concept guide on [SEO vs AEO vs GEO](/blog/seo-vs-aeo-vs-geo-nigeria).",
      ],
    },
    {
      heading: "Content that ranks and gets quoted: the Nigerian playbook",
      paragraphs: [
        "Ranking content has three jobs: match what the searcher wants, answer it better than the next page, and prove you can be trusted. These habits do all three.",
      ],
      list: {
        items: [
          "**Match intent.** Some searches want a price (“how much does… cost in Lagos”), some want a comparison (“best… in Abuja”), some want a place (“…near me”), and some want a how-to. Build the right kind of page for each.",
          "**Lead with the answer.** The first two sentences should give the main answer. This helps readers, featured snippets, AI Overviews and voice assistants.",
          "**Show real prices or ranges in naira,** and what changes them. Pages that hide prices lose to pages that explain them.",
          "**Use proof.** Real photos, named people, dated examples, customer comments with permission.",
          "**Build topic clusters.** One main guide plus supporting posts, all linked together. This post, for instance, links to guides on cost, ads versus SEO, local setup and AI visibility.",
          "**Keep it fresh and honest.** Update prices, hours and facts, and show the date. Do not change dates to look fresh when nothing changed.",
          "**Write for Nigerian searchers.** Area names, naira, local terms and, where your customers need them, the languages they use. Google added Yorùbá and Hausa to AI Overviews and AI Mode in 2026, so customers can now ask in the language they speak at home.",
          "**Add an FAQ in customers’ words,** including the awkward questions about price, delivery and refunds.",
        ],
      },
    },
    {
      heading: "How to measure whether it is working",
      paragraphs: [],
      list: {
        items: [
          "**Google Search Console:** impressions, clicks and the searches that bring people to you. Google says traffic from its AI features is included in the Web search type in the Performance report.",
          "**Google Business Profile performance:** calls, direction requests, website clicks and the searches that triggered your listing.",
          "**Google Analytics:** which pages bring visitors and which visits become WhatsApp clicks, calls or form submissions.",
          "**Your own question:** add “How did you hear about us?” with Google, a friend, Instagram and an AI assistant as options.",
          "**An AI check every month.** Ask ChatGPT, Gemini and Perplexity the same five questions a customer would ask about your service in your city, and note who is named and whether it is accurate. Look for patterns, not single results, because AI answers vary from run to run.",
          "**The number that matters most:** qualified enquiries and sales, not just visits.",
        ],
      },
      after: [
        "Be realistic on timing. Fixing indexing problems and a Business Profile can show results within weeks. New pages and reputation usually take months. It depends on your competition, your starting point and how much you do.",
      ],
    },
    {
      heading: "Your 90-day plan to become visible",
      paragraphs: [],
      table: {
        headers: ["When", "What to do", "Done when"],
        rows: [
          ["Days 1 to 14: Diagnose and unblock", "Run the “site:” check, set up Search Console and Analytics, fix noindex or crawl blocks, check speed on mobile data, audit your name, address and phone across the web.", "Your key pages are indexed and your details agree everywhere."],
          ["Days 15 to 30: Local foundation", "Claim and complete your Google Business Profile, add real photos and services, add WhatsApp tracking, start collecting reviews.", "Profile 100% complete, review routine in place."],
          ["Days 31 to 60: Build the pages", "One page per main service and area, rewritten titles and headings, prices in naira, FAQs, text-based menus or price lists, internal links, schema that matches the page.", "Every main service and area has a page worth ranking."],
          ["Days 61 to 90: Earn trust and AI visibility", "Get mentions and links from credible local sources, keep reviews coming, allow OAI-SearchBot, set up Bing Webmaster Tools, run your first monthly AI check, claim a ChatGPT profile if available to you.", "First mentions earned, baseline AI check recorded."],
          ["Then every month", "Update facts and prices, publish one useful page or post, repeat the AI check, review Search Console, fix the weakest point.", "A written record of what changed and what it did."],
        ],
      },
    },
    {
      heading: "Common mistakes and myths that waste Nigerian business money",
      paragraphs: [],
      list: {
        items: [
          "**“A beautiful website will bring customers.”** Design helps the people who arrive. It does not bring them.",
          "**“I will get on page one in seven days.”** Be wary of anyone who promises this. Nobody outside Google controls rankings.",
          "**“More keywords means more rankings.”** Stuffing keywords makes pages worse for readers and does not help you.",
          "**“I just need to list on 500 directories.”** A handful of credible, relevant listings beat hundreds of low-quality ones.",
          "**“Buying backlinks is a shortcut.”** Link schemes break Google’s rules and can cost you your visibility.",
          "**“Instagram is my website.”** You do not own it, and search engines cannot use it the way they use a website.",
          "**“I need a special file or schema for AI.”** Google says you do not for its AI features. Clear, indexable, accurate pages are what count.",
          "**“SEO is one-off.”** Competitors, prices and AI answers change. Visibility is a habit.",
        ],
      },
    },
    {
      heading: "Quick wins by business type",
      paragraphs: [],
      table: {
        headers: ["Business", "Biggest first win", "Page or asset to build"],
        rows: [
          ["Restaurant or food brand", "Complete Business Profile with real menu, photos and reviews", "Text menu page, area pages, event catering page"],
          ["Salon or spa", "Profile with services, prices, photos and reviews", "A page per service with prices, booking link"],
          ["Clinic or health provider", "Verified profile, named professionals, clear credentials", "Service pages with named experts and honest information"],
          ["Real estate", "Location pages with real listings and trust proof", "Area guides, price ranges, buying process FAQ"],
          ["School or training provider", "Programme pages with fees, dates and requirements", "FAQ for parents and students, accreditation proof"],
          ["Online store", "Product pages with clear prices, delivery and returns", "Category pages, reviews, product feed where available"],
          ["Professional services", "Named expert pages and case examples", "Service pages and answers to client questions"],
        ],
      },
    },
    {
      heading: "Business no be by mouth. Na by system.",
      paragraphs: [
        "Here is the point. A beautiful website is not a system. It is a shop. A system is a shop people can find, trust and buy from, again and again, even while you sleep. That means a website Google can read, pages that answer real questions, a Business Profile that is complete, details that agree everywhere, reviews and mentions that prove you are real, and numbers that tell you what is working.",
        "Nobody builds that by accident. Work smart. Build systems. Collect your money.",
        "This is what Correct Marketer NG does. We start with a **visibility audit**: is your site indexed, what stops it ranking, how you appear on the map, where your details disagree, and what ChatGPT, Gemini and Perplexity say about you. Then we build the fix, in order: technical foundations, service and area pages, Google Business Profile, schema, reviews and mentions, and monthly reporting tied to real enquiries, not vanity numbers. We do not promise page one or guaranteed AI mentions, because nobody honest can. We promise a clear plan and reporting you can understand.",
        "**Send “VISIBLE” on WhatsApp** at [+234 911 017 2901](https://wa.me/2349110172901?text=VISIBLE) and we will show you how visible your business really is, and what to fix first. You can also [request your free SEO visibility audit](/audits#seo-visibility-audit), explore our [SEO services](/services/best-seo-agency-in-nigeria), see our [web development](/services/best-web-development-company-in-nigeria) work, or [contact the team](/contact). Once the enquiries start arriving, make sure you can answer them fast with [WhatsApp AI automation](/blog/whatsapp-ai-automation-nigeria-spend-less-sell-more) and [business automation](/blog/automate-your-business-in-nigeria).",
      ],
    },
    {
      heading: "Sources and further reading",
      paragraphs: [],
      list: {
        items: [
          "[Google Search Central: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)",
          "[Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)",
          "[Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)",
          "[Google Search Central: Understanding Core Web Vitals and Google Search results](https://developers.google.com/search/docs/appearance/core-web-vitals)",
          "[Google Search Central: Local business structured data](https://developers.google.com/structured-data/local-businesses/)",
          "[Google Business Profile Help: Improve your local ranking on Google](https://support.google.com/business/answer/7091?hl=en)",
          "[DataReportal: Digital 2026, Nigeria](https://datareportal.com/reports/digital-2026-nigeria)",
          "[OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)",
          "[TechCabal: Google’s AI search now works in Yoruba and Hausa for Nigerian users](https://techcabal.com/?p=183038)",
          "[SurfaceLocal: How Claude web search finds and cites local businesses](https://www.surfacelocal.com/blog/how-claude-web-search-finds-local-businesses) (vendor blog, claims unverified)",
        ],
      },
    },
  ],
  related: [
    "why-your-website-is-not-generating-customers",
    "seo-vs-aeo-vs-geo-nigeria",
    "seo-geo-aeo-starter-guide-nigerian-businesses",
    "how-much-does-seo-cost-in-nigeria",
  ],
  howTo: {
    name: "How to check whether your website is showing on Google",
    description:
      "A ten-minute check any Nigerian business owner can run to see whether Google has indexed their website and what is holding it back.",
    steps: [
      { name: "Search your website address", text: "In Google, type site: followed by your domain, for example site:yourwebsite.com.ng. If pages appear, Google has indexed them. If nothing appears, your site is not indexed yet or something is blocking it." },
      { name: "Search your business name and city", text: "Type your exact business name with your city and check whether you appear and whether the details shown are correct." },
      { name: "Set up Google Search Console", text: "Add and verify your website in the free Google Search Console and open the Pages report to see which pages are indexed and why others are not." },
      { name: "Inspect your key pages", text: "Paste your homepage and main service pages into the URL Inspection tool to see whether Google can crawl and index them." },
      { name: "Check for blocks", text: "Ask your developer to confirm there is no noindex tag and that robots.txt, your firewall or your CDN is not blocking Google’s crawler." },
      { name: "Check your Google Business Profile", text: "Make sure it is claimed, verified and complete, with accurate details that match your website." },
    ],
  },
  faq: [
    {
      q: "Why is my website not showing on Google in Nigeria?",
      a: "Usually because Google cannot find or index it, because your pages do not match what people search, or because Google cannot tell where you operate or whether to trust you. Check whether you are indexed with a site: search and Google Search Console, then fix your service and area pages, Google Business Profile, speed on mobile and consistency of your business details.",
    },
    {
      q: "How long does it take for a new website to show on Google?",
      a: "Google can index a new page within days to weeks, but ranking for competitive searches usually takes months. Google says there is no guarantee that any page will be indexed or shown. You can speed discovery by linking to your pages, submitting a sitemap and requesting indexing in Search Console.",
    },
    {
      q: "How do I know whether Google has indexed my website?",
      a: "Search site:yourwebsite.com in Google, or open the Pages report and URL Inspection tool in Google Search Console. They show which pages are indexed and why others are not.",
    },
    {
      q: "Is Google Business Profile enough, or do I need a website?",
      a: "Google Business Profile helps you appear in local and map results and is often the biggest single lever for local businesses. A website still matters because it lets you explain services, prices and proof in detail, supports your profile, and gives AI tools a source to read and cite.",
    },
    {
      q: "Does my website design affect where I rank on Google?",
      a: "Design affects whether visitors stay and act once they arrive. Google ranks pages by how well they answer a search and by many other signals including quality, usability and location, not by how attractive the colours or animations are. A slow or confusing design can hurt, though.",
    },
    {
      q: "How do I show up for “near me” searches in Nigeria?",
      a: "Claim and complete your Google Business Profile, keep your address, hours and categories accurate, build reviews, and make your website clear about the areas you serve. Google says local results rely on relevance, distance and prominence, and that there is no way to pay for a better local ranking.",
    },
    {
      q: "How do I get my business recommended in Google AI Overviews?",
      a: "Google says a page must be indexed and eligible to show in Search with a snippet, and that there are no additional requirements or special optimisations for AI Overviews and AI Mode. Strong SEO fundamentals, clear text content and accurate business information are what count, and appearance is never guaranteed.",
    },
    {
      q: "How do I get ChatGPT or Claude to mention my business?",
      a: "Nobody can guarantee it. Make sure your site can be crawled, including OAI-SearchBot for ChatGPT search, keep your details consistent everywhere, publish clear pages with real prices and facts, earn reviews and mentions from credible sources, and check monthly what the tools say about you.",
    },
    {
      q: "Do I need schema markup to rank on Google?",
      a: "No. Schema helps machines understand your content but is not required to rank, and Google says no special schema is needed for its AI features. Use accurate markup such as LocalBusiness or Restaurant, Article, FAQPage and BreadcrumbList where it matches visible content.",
    },
    {
      q: "Can I rank on Google without backlinks?",
      a: "For low-competition local searches you can rank without many backlinks if your pages, profile and reviews are strong. In competitive markets, links and mentions from credible sites help show prominence. Earn them honestly, and avoid buying links.",
    },
    {
      q: "How much does SEO cost in Nigeria?",
      a: "It depends on how much needs fixing, how competitive your market is and how much content is needed. Our guide to SEO pricing in Nigeria explains the main cost drivers, and an audit lets us quote against the real work.",
    },
    {
      q: "Can Correct Marketer NG guarantee page one on Google?",
      a: "No honest agency can, because Google controls rankings. We audit what is holding you back, fix it in order, and report on enquiries, not just rankings, so you can see what the work is doing for the business.",
    },
  ],
  cta: "Is your beautiful website actually bringing customers? Send “VISIBLE” on WhatsApp at [+234 911 017 2901](https://wa.me/2349110172901?text=VISIBLE) and we will show you how visible your business really is, and what to fix first.",
};
