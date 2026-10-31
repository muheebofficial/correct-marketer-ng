import Link from "next/link";
import type { ReactNode } from "react";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessStepper } from "@/components/sections/ProcessStepper";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import {
  getGroup,
  getNextGroup,
  getRelatedServices,
  getServicesByGroup,
  serviceGroups,
  type Service,
  type ServiceGroup,
} from "@/lib/services-taxonomy";
import { serviceSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

const stageNotes: Record<string, string> = {
  "attract-customers": "Make the right audience aware of your offer before they need to enquire.",
  "generate-leads": "Give interested people a useful destination and a clear way to raise their hand.",
  "nurture-prospects": "Keep the conversation useful and consistent after a prospect makes contact.",
  "convert-leads": "Make the offer, trust signals and next action clear when a buyer is deciding.",
  "retain-and-scale": "Learn from customers and build the operating rhythm for repeatable growth.",
};

const stageFlows: Record<string, string> = {
  "best-seo-agency-in-nigeria": "SEO earns visibility for existing search intent, then sends visitors to a useful page where they can enquire.",
  "local-seo-google-business-profile-nigeria": "Local listings connect nearby searches to accurate location details, calls and a next step on your site.",
  "best-google-ads-agency-in-nigeria": "Paid search and social campaigns put a relevant offer in front of a chosen audience and direct each click to a matching destination.",
  "social-media-advertising-agency-in-nigeria": "Platform-specific creative introduces the offer, then campaign links bring interested people to a lead path.",
  "click-to-whatsapp-ads-nigeria": "A conversation-first ad starts the enquiry in chat, while source tags and a response workflow keep the handoff clear.",
  "content-video-marketing-agency-in-nigeria": "Useful video and content build familiarity, then direct each audience toward a page or conversation that can capture interest.",
  "influencer-marketing-agency-in-nigeria": "A trusted creator introduces your offer; tracked links make the route from recommendation to enquiry easier to understand.",
  "marketplace-optimisation-nigeria": "Clear, relevant listings help shoppers discover products and give them a route from comparison to purchase.",
  "digital-pr-thought-leadership-nigeria": "Credible coverage and founder expertise make a business easier to recognise before prospective customers explore its offer.",
  "best-brand-strategy-agency-in-nigeria": "Consistent positioning helps every channel present a recognisable promise that buyers can understand and trust.",
  "best-lead-generation-agency-in-nigeria": "A connected landing, contact and capture path turns the attention earned in Attract into a record the team can follow up.",
  "best-web-development-company-in-nigeria": "A clear, fast website gives searchers and campaign visitors a useful place to understand the offer and make contact.",
  "landing-pages-lead-magnets-nigeria": "A focused offer gives visitors a reason to share details, then delivers the resource through a clear follow-up path.",
  "marketing-tracking-attribution-nigeria": "Consistent event and source tracking records which channels and pages started the conversations the team follows up.",
  "best-ai-automation-agency-in-nigeria": "Automation handles suitable first responses and qualification, then passes context to a person when judgement is needed.",
  "whatsapp-business-setup-nigeria": "A well-organised WhatsApp profile and quick replies make the first human or automated follow-up easier to manage.",
  "ai-whatsapp-sales-agent-nigeria": "The agent answers routine questions, gathers relevant context and hands qualified or sensitive conversations to a person.",
  "crm-setup-automation-nigeria": "A shared pipeline keeps contact details, conversation context and follow-up ownership together.",
  "follow-up-sequences-email-sms-whatsapp-nigeria": "Relevant, consent-aware reminders bring a prospect back to the conversation without losing their previous context.",
  "conversion-rate-optimisation-nigeria": "A focused review identifies friction in the path to enquire or buy, then prioritises changes the team can test.",
  "sales-funnel-offer-design-nigeria": "A clear offer and channel sequence guide a prospect from initial interest toward a decision.",
  "trust-social-proof-building-nigeria": "Verified reviews and clear business details answer buyer concerns before they commit.",
  "payment-checkout-integration-nigeria": "Familiar payment options and a clear confirmation process remove avoidable effort at the moment of purchase.",
  "booking-appointment-automation-nigeria": "Self-serve booking and reminders let a customer choose a time and give the team a reliable appointment record.",
  "whatsapp-sales-team-training-nigeria": "Shared chat practices help the sales team respond consistently and handle questions with the right context.",
  "retargeting-cart-recovery-nigeria": "Careful reminders reconnect with people who showed intent but did not finish the next step.",
  "customer-retention-loyalty-referral-nigeria": "Useful post-sale contact gives satisfied customers a reason to return and a simple way to refer someone.",
  "marketing-reporting-dashboards-nigeria": "A shared view of agreed measures gives the team a basis for practical growth reviews.",
  "growth-scaling-ab-testing-nigeria": "Structured tests and budget guardrails help the team expand channels based on observed performance.",
  "market-expansion-diaspora-marketing-nigeria": "Market research shapes a localised offer and the delivery or payment route needed for a new audience.",
  "business-process-automation-nigeria": "Clear workflow rules reduce repetitive admin while keeping important approvals with the people responsible.",
  "custom-web-apps-dashboards-nigeria": "Purpose-built tools connect the systems and information a growing operation needs in one usable workflow.",
  "ai-training-workshops-nigeria": "Shared skills and practical exercises help the team use AI consistently in day-to-day work.",
  "fractional-cmo-growth-retainer-nigeria": "Senior planning links the team's work to clear priorities and keeps execution aligned as the business grows.",
};

const hubGuidance: Record<
  string,
  { bridge: string; scenarios: string[]; faqs: { q: string; a: string }[] }
> = {
  "attract-customers": {
    bridge:
      "Choose channels based on how customers discover and assess your offer. Search is useful when people already know what they need; advertising can introduce an offer to a defined audience; content and trusted voices build familiarity. Keep the message consistent, and route every visit into a destination that can capture interest.",
    scenarios: [
      "If people already search for your service but find competitors first, start with SEO or Local SEO & Google Business Profile.",
      "If you need to put a specific offer in front of a defined audience, start with Google & Meta Ads or Social Media Advertising.",
      "If buyers need to understand and trust your point of view before enquiring, start with Content & Video Marketing, Digital PR & Thought Leadership, or Brand Strategy.",
    ],
    faqs: [
      {
        q: "Which Attract service should a business start with?",
        a: "Start with the way your buyers currently discover and compare options. Search and local visibility suit existing intent; advertising can test a defined offer; content, creators and PR build familiarity. Brand strategy helps keep the message consistent across those choices.",
      },
      {
        q: "Do I need every channel in this stage?",
        a: "No. Pick the channels that match your audience, offer and available follow-up capacity. A focused combination is easier to measure and improve than a long list of disconnected activities. Each channel should point to a clear page or conversation path.",
      },
      {
        q: "How does Attract connect to lead generation?",
        a: "Attract creates discovery and interest. Generate Leads gives that interest somewhere useful to go: a relevant website page, a focused offer, a form or a WhatsApp conversation. Connecting the stages makes it easier to capture context and respond.",
      },
    ],
  },
  "generate-leads": {
    bridge:
      "A lead path works when each element answers the next question. The website explains the business; a focused landing page makes one offer easy to understand; a lead magnet gives a visitor a reason to share details; contact options make it simple to reply. Attribution then records the source so the team can follow up with context.",
    scenarios: [
      "If you have traffic but visitors do not take a clear next step, start with Web Development or Landing Pages & Lead Magnets.",
      "If enquiries arrive through several channels but details are scattered, start with Lead Generation.",
      "If the team cannot tell which campaign or page started an enquiry, start with Tracking & Attribution Setup.",
    ],
    faqs: [
      {
        q: "What counts as a lead for my business?",
        a: "A lead is a potential customer who has taken a useful, trackable action, such as submitting a form, starting a WhatsApp chat or requesting a call. Agree on what counts before configuring forms and measurement so the team records meaningful enquiries consistently.",
      },
      {
        q: "Do I need a full website before I can generate leads?",
        a: "Not always. A focused landing page or a well-managed WhatsApp path may be an appropriate starting point. The right destination depends on the offer, the questions customers need answered and how your team will respond after contact.",
      },
      {
        q: "How does tracking support follow-up?",
        a: "Tracking records the channel, campaign or page associated with an enquiry. When that context is passed into the team's CRM or lead sheet, follow-up can be more relevant and future decisions can be based on observed lead sources.",
      },
    ],
  },
  "nurture-prospects": {
    bridge:
      "Prospects need different kinds of attention at different moments. WhatsApp Business gives the team an organised starting point; an AI agent can handle defined routine questions; the CRM stores context and ownership; and follow-up sequences make sure a useful next message is not forgotten. Human handover and consent rules remain part of the design.",
    scenarios: [
      "If customer chats are hard to organise or the team repeats the same answers, start with WhatsApp Business Setup.",
      "If leads are missed outside working hours, start with AI Automation or an AI WhatsApp Sales Agent.",
      "If follow-up depends on memory or contact histories are scattered, start with CRM Setup & Automation or Follow-Up Sequences.",
    ],
    faqs: [
      {
        q: "Does nurturing mean sending more messages?",
        a: "Not necessarily. Nurturing means sending relevant information at a useful time, respecting channel preferences and making it easy to stop messages. A thoughtful sequence can be brief; its purpose is to help a prospect decide, not to fill their inbox.",
      },
      {
        q: "Can automation replace a person in every conversation?",
        a: "No. Automation should handle clearly defined tasks and hand off requests that need judgement, sensitive context or a human decision. We define escalation paths alongside the conversation flow so the team knows when and how to take over.",
      },
      {
        q: "What should a CRM capture?",
        a: "Begin with the information needed to respond: contact details, source, current stage, conversation context and a clear next action. Collect only what the business needs, and agree who can access and update each record.",
      },
    ],
  },
  "convert-leads": {
    bridge:
      "People decide when the offer is understandable, the business feels credible and the next action is convenient. Conversion optimisation finds friction; funnel design improves the path; social proof addresses doubt; payments and bookings complete the action; sales training supports human conversations; and retargeting can bring back visitors who paused.",
    scenarios: [
      "If visitors reach your site but hesitate before enquiring, start with Conversion Rate Optimisation or Offer & Sales Funnel Design.",
      "If buyers ask for reassurance before they commit, start with Trust & Social Proof.",
      "If customers struggle to pay, book or get a reply in chat, start with Payment & Checkout Integration, Booking Automation or Sales Team Training.",
    ],
    faqs: [
      {
        q: "What should I fix first if leads are not buying?",
        a: "Look for the point where people stop moving forward. Review the offer, page, questions buyers ask, payment or booking steps and response process. Prioritise the clearest friction rather than changing several parts of the journey at once.",
      },
      {
        q: "Can retargeting recover every visitor?",
        a: "No channel can guarantee that a visitor will return or buy. Retargeting is one way to share a relevant reminder with people who showed interest. Audience rules, frequency and consent should be considered along with the message and destination.",
      },
      {
        q: "Why do trust signals matter in conversion?",
        a: "Buyers need to understand who they are dealing with and what will happen after they take action. Accurate business details, genuine reviews and clear payment or booking steps can answer practical concerns without relying on unsupported claims.",
      },
    ],
  },
  "retain-and-scale": {
    bridge:
      "Growth does not end at the first sale. Retention and referrals keep customer relationships active; dashboards help the team understand its work; tests and guardrails guide careful expansion; and automation, custom tools, training or senior direction can address the constraints that appear as operations grow.",
    scenarios: [
      "If customers buy once and the relationship goes quiet, start with Customer Retention, Loyalty & Referral.",
      "If performance information is spread across tools, start with Reporting Dashboards & Growth Reviews.",
      "If the business is ready for a new market or its processes have become a bottleneck, start with Market Expansion, Business Process Automation or Custom Web Apps.",
    ],
    faqs: [
      {
        q: "When should a business focus on retention?",
        a: "Retention is worth reviewing once you have customers and can identify what happens after their first purchase. Start with a useful post-sale experience and clear customer segments before adding loyalty mechanics or more complex campaigns.",
      },
      {
        q: "How do we know when it is safe to scale?",
        a: "Agree on the measures that matter, check whether the current process can handle more demand and use controlled tests. A dashboard and clear guardrails help the team spot issues and make deliberate decisions rather than assuming past performance will continue.",
      },
      {
        q: "Do we need custom software to improve operations?",
        a: "Not always. Map the process first and see whether a better workflow, existing tool or automation is enough. Custom software is most useful when a specific operational need cannot be handled well by the tools and processes already available.",
      },
    ],
  },
};

const itemListSchema = (group: ServiceGroup, groupServices: Service[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: group.name,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: groupServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(service.path),
    })),
  },
});

function ServiceIcon({ name }: { name: string }) {
  const common = {
    "aria-hidden": true as const,
    className: "h-7 w-7 text-forest",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    "map-pin": <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
    megaphone: <><path d="m4 13 13 5V6L4 11v2Z" /><path d="m7 14 2 6h4l-2-4M17 9h2a2 2 0 0 1 0 4h-2" /></>,
    "message-circle": <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-4-.9L4 20l1.4-4.1a7.4 7.4 0 1 1 14.6-4.4Z" /><path d="M8 11h8M8 14h5" /></>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5" /></>,
    store: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 20v-6h6v6" /></>,
    newspaper: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M8 8h8M8 12h4M8 16h8m-1-4h1" /></>,
    sparkles: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    funnel: <><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" /></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21h8m-4-4v4" /></>,
    "file-text": <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 12h6m-6 4h6" /></>,
    chart: <><path d="M4 20V5m0 15h17M8 16l4-5 3 2 5-7" /></>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M12 3v4M8 12h.1M16 12h.1M8 16h8" /><circle cx="12" cy="3" r="1" /></>,
    phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M10 6h4m-3 12h2" /></>,
    "bot-message": <><path d="M5 7h14v11H9l-4 3V7Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M9 15h6M12 4v3" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="white" /><circle cx="15" cy="12" r="2" fill="white" /><circle cx="8" cy="18" r="2" fill="white" /></>,
    route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h5a4 4 0 0 1 4 4v6" /></>,
    "shield-check": <><path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    "credit-card": <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4m8-4v4M4 10h16m-11 4h.1m4 0h.1m-4 3h.1" /></>,
    "users-check": <><circle cx="8" cy="8" r="3" /><path d="M2 20a6 6 0 0 1 12 0m2-8 2 2 4-4M16 5a3 3 0 0 1 0 6" /></>,
    repeat: <><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" /></>,
    "heart-handshake": <><path d="M12 20s-8-4.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 10-8 10Z" /><path d="m8 12 2 2 2-2 2 2 2-2" /></>,
    "chart-no-axes": <><path d="M4 20h16M5 17l5-5 3 2 6-8" /><path d="M16 6h3v3" /></>,
    "trending-up": <><path d="m3 17 6-6 4 3 7-8" /><path d="M14 6h6v6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" /></>,
    workflow: <><rect x="3" y="4" width="7" height="6" rx="1" /><rect x="14" y="14" width="7" height="6" rx="1" /><path d="M10 7h4a3 3 0 0 1 3 3v4M7 10v5h7" /></>,
    panels: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M9 10h12" /></>,
    graduation: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c4 3 8 3 12 0v-5m4-2v6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  };
  return <svg {...common}>{paths[name] ?? paths.sparkles}</svg>;
}

export function ServiceSnippetCard({ service }: { service: Service }) {
  return (
    <li className="min-w-0">
      <Link
        href={service.path}
        aria-label={`Learn more about ${service.name}`}
        className="group flex h-full min-h-[220px] flex-col border border-stone-light bg-ivory p-6 transition-colors hover:border-forest hover:bg-forest hover:text-ivory focus-visible:border-forest focus-visible:bg-forest focus-visible:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <ServiceIcon name={service.icon} />
        <h3 className="mt-4 font-sub text-xl font-bold text-forest group-hover:text-ivory group-focus-visible:text-ivory">
          {service.name}
        </h3>
        <p className="mt-2 text-mute group-hover:text-ivory/90 group-focus-visible:text-ivory/90">
          {service.snippet}
        </p>
        <span className="mt-auto pt-5 font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-4 group-hover:text-gold-soft group-focus-visible:text-gold-soft">
          Learn more
        </span>
      </Link>
    </li>
  );
}

export function ServiceFitBlock({ service }: { service: Service }) {
  const group = getGroup(service.groupSlug);
  if (!group) return null;
  const related = getRelatedServices(service.slug).slice(0, 3);
  return (
    <section aria-labelledby={`service-fit-${service.slug}`} className="mx-auto max-w-page px-5 py-7 sm:px-8">
      <div className="flex flex-col gap-5 border-y border-obsidian/15 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-mute">
            <Link href="/" className="underline decoration-gold underline-offset-4">Home</Link>
            {" / "}
            <Link href="/services" className="underline decoration-gold underline-offset-4">Services</Link>
            {" / "}
            <Link href={`/services/${group.slug}`} className="underline decoration-gold underline-offset-4">{group.name}</Link>
            {" / "}
            <span aria-current="page">{service.name}</span>
          </p>
          <h2 id={`service-fit-${service.slug}`} className="mt-2 font-sub text-lg font-bold text-forest">
            Part of {group.name} —{" "}
            <Link href={`/services/${group.slug}`} className="underline decoration-gold underline-offset-4">
              view all {group.name} services
            </Link>
          </h2>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={item.path} className="font-semibold text-forest underline decoration-gold underline-offset-4">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GroupHub({ group }: { group: ServiceGroup }) {
  const items = getServicesByGroup(group.slug);
  const nextGroup = getNextGroup(group.slug);
  const content = hubGuidance[group.slug];
  return (
    <>
      <JsonLd data={itemListSchema(group, items)} />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: group.name, path: `/services/${group.slug}` },
        ]}
        eyebrow={`Stage ${group.stage} of 5`}
        title={group.hubH1}
        sub={group.tagline}
        cta="Start a Growth Conversation"
        waMessage={`Hi Correct Marketer NG, I want to discuss the ${group.name} stage of growth for my business.`}
        source={`services_group_${group.slug}`}
      />
      <Section labelledBy={`${group.slug}-purpose`}>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Heading id={`${group.slug}-purpose`}>What this stage is for</Heading>
          <div className="space-y-5 text-lg text-mute">
            <p>{group.summary}</p>
            <p>{group.howTheyWorkTogether}</p>
            <p>{content.bridge}</p>
          </div>
        </div>
      </Section>
      <Section tone="white" labelledBy={`${group.slug}-flow`}>
        <Heading id={`${group.slug}-flow`}>How these services work together</Heading>
        <p className="mt-4 max-w-3xl text-lg text-mute">
          Each service has a role in the same customer journey. The order below shows how a business can connect the work instead of treating every channel as a separate project.
        </p>
        <ol className="mt-10 space-y-0 border-l-2 border-gold pl-6">
          {items.map((service, index) => (
            <li key={service.slug} className="relative border-b border-stone-light py-5 last:border-0">
              <span aria-hidden="true" className="absolute -left-[2.05rem] top-6 h-3 w-3 rounded-full bg-forest ring-4 ring-white" />
              <p className="font-sub text-sm font-bold text-gold-ink">Step {index + 1}</p>
              <p className="mt-1 text-lg">
                <Link href={service.path} className="font-bold text-forest underline decoration-gold underline-offset-4">
                  {service.name}
                </Link>
                {" — "}
                {stageFlows[service.slug]}
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section labelledBy={`${group.slug}-services`}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sub text-sm font-bold uppercase tracking-wide text-gold-ink">Stage {group.stage}</p>
            <Heading id={`${group.slug}-services`} className="mt-2">Services in this stage</Heading>
          </div>
          <p className="max-w-xl text-mute">
            Start with the service that addresses the clearest need. Each can be scoped on its own and connected to the rest of your growth system.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => <ServiceSnippetCard key={service.slug} service={service} />)}
        </ul>
      </Section>
      <Section tone="white" labelledBy={`${group.slug}-start`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id={`${group.slug}-start`}>Where to start</Heading>
            <p className="mt-4 text-mute">
              Choose a starting point based on the issue you can see today. You do not need to take on every channel at once.
            </p>
          </div>
          <ul className="space-y-4">
            {content.scenarios.map((scenario) => (
              <li key={scenario} className="border-l-4 border-gold py-2 pl-5 text-lg">{scenario}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section labelledBy={`${group.slug}-faq`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id={`${group.slug}-faq`}>Questions about {group.name}</Heading>
            <p className="mt-4 text-mute">
              The right mix depends on your audience, offer and ability to follow up. These answers explain how to choose a practical starting point.
            </p>
          </div>
          <FAQ faqs={content.faqs} />
        </div>
      </Section>
      {nextGroup && (
        <Section tone="forest" labelledBy={`${group.slug}-next`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-sub text-sm font-bold text-gold-soft">Next stage · Stage {nextGroup.stage} of 5</p>
              <Heading id={`${group.slug}-next`} tone="dark" className="mt-2">{nextGroup.name}</Heading>
              <p className="mt-3 max-w-2xl text-ivory/85">{nextGroup.tagline}</p>
            </div>
            <Button href={`/services/${nextGroup.slug}`} variant="gold">
              Explore {nextGroup.name}
            </Button>
          </div>
        </Section>
      )}
      <FooterCTA source={`services_group_${group.slug}`} waMessage={`Hi Correct Marketer NG, I want to discuss the ${group.name} stage of growth for my business.`} />
    </>
  );
}

function deliverableExplanation(service: Service, deliverable: string, index: number): string {
  const endings = [
    `We shape this around ${service.primaryKeyword} and your current way of working, so the output is useful to the people who will use it.`,
    `The detail is agreed with your team before implementation, including the handoff and information needed for the next step.`,
    `This is planned against your offer and audience, with a clear owner for keeping the work accurate after handover.`,
    `We keep the scope practical for your tools and team, then document how the deliverable supports the wider customer journey.`,
    `The setup reflects the way your customers currently enquire and the actions your team can reliably support.`,
  ];
  return `${deliverable}. ${endings[index % endings.length]}`;
}

function pageFaqs(service: Service, group: ServiceGroup) {
  const sibling = getRelatedServices(service.slug).find((item) => item.groupSlug === service.groupSlug);
  const nextGroup = getNextGroup(service.groupSlug);
  return [
    {
      q: `What does ${service.name} include?`,
      a: `${service.name} is scoped around the work your business needs rather than a fixed checklist. It can include ${service.deliverables.slice(0, 3).join(", ").toLowerCase()}${service.deliverables.length > 3 ? `, and ${service.deliverables[3].toLowerCase()}` : ""}. We confirm priorities, access and ownership before work begins.`,
    },
    {
      q: `Who is ${service.name} right for?`,
      a: `It can suit a business that ${service.nigeriaAngle.charAt(0).toLowerCase()}${service.nigeriaAngle.slice(1)} It is most useful when the team can agree what a good enquiry or customer action looks like and who will respond when it happens.`,
    },
    {
      q: `How do we get started with ${service.name}?`,
      a: `We begin by understanding your offer, current tools and customer journey, then agree a practical scope and the information needed to do the work. For ${service.name.toLowerCase()}, the first discussion also covers ${service.deliverables[0]?.toLowerCase() ?? "your current priorities"} and how your team will maintain it.`,
    },
    {
      q: `How does ${service.name} connect to other growth services?`,
      a: `${service.snippet} That places it in ${group.name}, where the work should support the customer journey described above. It can connect with ${sibling?.name ?? "a related service"} in the same stage${nextGroup ? ` and feed into ${nextGroup.name} when a prospect is ready for the next step` : " and inform the next cycle of customer acquisition"}.`,
    },
  ];
}

function audienceBullets(service: Service): string[] {
  return [
    `Businesses that need to address this issue: ${service.nigeriaAngle}`,
    `Teams looking for a practical way to apply ${service.primaryKeyword} to an existing offer.`,
    `Owners who can identify the next action they want a prospect or customer to take.`,
  ];
}

export function NewServicePage({ service }: { service: Service }) {
  const group = getGroup(service.groupSlug);
  if (!group) return null;
  const related = getRelatedServices(service.slug);
  const nextGroup = getNextGroup(group.slug);
  const faqs = pageFaqs(service, group);
  const path = service.path;
  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: service.snippet, path })} />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: group.name, path: `/services/${group.slug}` },
          { name: service.name, path },
        ]}
        title={`Best ${service.name} in Lagos, Nigeria`}
        sub={service.snippet}
        cta="Start a Growth Conversation"
        waMessage={`Hi Correct Marketer NG, I want to discuss ${service.name} for my business.`}
        source={`service_${service.slug}`}
      />
      <Section labelledBy="who-for">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id="who-for">Who this is for</Heading>
            <p className="mt-4 text-mute">
              This service is for teams ready to improve a specific part of how customers discover, consider or buy from them.
            </p>
          </div>
          <ul className="space-y-3">
            {audienceBullets(service).map((item) => (
              <li key={item} className="flex gap-3 border-b border-stone-light pb-3 text-lg">
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="white" labelledBy="problem">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Heading id="problem">The problem we usually see</Heading>
          <div className="space-y-5 text-lg text-mute">
            <p>
              Many businesses invest effort in {service.primaryKeyword} without a clear owner, a shared process or a record of what happens after a customer responds. The result is often disconnected activity: useful work is done, but the next person in the journey cannot see what changed or what to do next.
            </p>
            <p>
              In this case, {service.nigeriaAngle.charAt(0).toLowerCase()}{service.nigeriaAngle.slice(1)} When that context is not built into the plan, a generic setup can create extra work instead of making it easier for people to enquire, decide or return.
            </p>
          </div>
        </div>
      </Section>
      <Section labelledBy="what-we-do">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id="what-we-do">What we do</Heading>
            <p className="mt-4 text-mute">
              Work is scoped to the goal, current tools and people responsible for the customer journey. The deliverables below are starting points for that discussion.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((deliverable, index) => (
              <li key={deliverable} className="border-t-4 border-gold bg-white p-5">
                <p className="font-display text-2xl font-extrabold text-forest">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-sub text-lg font-bold text-forest">{deliverable}</h3>
                <p className="mt-2 text-mute">{deliverableExplanation(service, deliverable, index)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section tone="forest" labelledBy="growth-system">
        <Heading id="growth-system" tone="dark">How it fits your growth system</Heading>
        <p className="mt-4 max-w-3xl text-ivory/85">
          {service.name} supports Stage {group.stage}, {group.name}. {stageFlows[service.slug]} {nextGroup ? `The next connection is ${nextGroup.name}: ${nextGroup.summary}` : "The next cycle uses what you learn to improve how the business attracts and serves customers."}
        </p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {serviceGroups.map((stage) => (
            <li key={stage.slug}>
              <Link
                href={`/services/${stage.slug}`}
                aria-current={stage.slug === group.slug ? "step" : undefined}
                className={`flex h-full min-h-[100px] flex-col justify-between border p-4 transition-colors ${stage.slug === group.slug ? "border-gold bg-gold text-obsidian" : "border-ivory/30 text-ivory hover:border-gold"}`}
              >
                <span className="font-sub text-xs font-bold uppercase">Stage {stage.stage}</span>
                <span className="mt-3 font-sub font-bold">{stage.name}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-ivory/85">
          A connected growth system gives each activity a clear handoff. If the next stage is not ready yet, capture the useful information now and agree who owns the next action.
        </p>
      </Section>
      <Section labelledBy="nigeria">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Heading id="nigeria">Built for Nigerian businesses</Heading>
          <div className="space-y-4 text-lg text-mute">
            <p>{service.nigeriaAngle}</p>
            <p>
              We plan around the customer channels, operating conditions and tools that matter for your business. For {service.name.toLowerCase()}, that means using local context where it affects the work, while confirming the details with your team rather than assuming every customer or company behaves the same way.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="white" labelledBy="how-we-work">
        <div className="mb-10 max-w-3xl">
          <Heading id="how-we-work">How we work</Heading>
          <p className="mt-4 text-lg text-mute">
            We use the same seven-step process to keep decisions and responsibilities clear while applying it to the needs of {service.name.toLowerCase()}.
          </p>
        </div>
        <ProcessStepper />
      </Section>
      <Section labelledBy="service-faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id="service-faq">Questions about {service.name}</Heading>
            <p className="mt-4 text-mute">
              A good scope starts with your business context. These answers cover the first things teams usually need to decide.
            </p>
          </div>
          <FAQ faqs={faqs} />
        </div>
      </Section>
      <Section tone="white" labelledBy="related">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sub text-sm font-bold text-gold-ink">{group.name}</p>
            <Heading id="related" className="mt-2">Related services</Heading>
          </div>
          <Link href={`/services/${group.slug}`} className="font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-4">
            Explore all {group.name} services
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {related.slice(0, 3).map((item) => <ServiceSnippetCard key={item.slug} service={item} />)}
        </ul>
      </Section>
      <FooterCTA source={`service_${service.slug}`} waMessage={`Hi Correct Marketer NG, I want to discuss ${service.name} for my business.`} />
    </>
  );
}
