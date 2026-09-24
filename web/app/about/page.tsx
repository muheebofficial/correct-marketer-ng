import { JsonLd } from "@/components/seo/JsonLd";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { PageHero } from "@/components/sections/PageHero";
import { TrustPillars } from "@/components/sections/TrustPillars";
import { Heading, Section } from "@/components/ui/Section";
import { personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Correct Marketer NG | Lagos Digital Growth Agency",
  description:
    "Correct Marketer NG was founded in 2021 by Muheeb Sulaiman to give ambitious Nigerian businesses access to world-class, AI-powered marketing. Meet the team behind the system.",
  path: "/about",
});

const philosophy = [
  { t: "Smart", b: "We use AI and data to build marketing that thinks, not just marketing that looks good." },
  { t: "Results-driven", b: "Every campaign, page and automation has one job: grow your revenue." },
  { t: "Local first", b: "We understand Lagos and Nigerian business. No copy-paste playbooks from other markets." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        title="Most businesses don't have a marketing problem. They have a systems problem."
        sub={`Correct Marketer NG started in ${site.founded} in Lagos, with one belief: Nigerian businesses deserve marketing that's measured, connected and honest about what it costs and what it returns.`}
        cta="Let's Talk Growth"
        source="about"
      />

      <Section labelledBy="why-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Heading id="why-h">Why we exist</Heading>
          <div className="space-y-4 text-lg">
            <p>Too many good businesses pay for a website, a few ads and some social posts, and then can't tell what any of it produced. The pieces don't connect. Leads go cold. Reports are full of numbers that don't mean anything.</p>
            <p>We build the connected version: search, ads, a website that converts, WhatsApp and CRM follow-up, and reporting that ties it back to customers. AI makes it faster and smarter, and Nigerian market knowledge keeps it relevant.</p>
          </div>
        </div>
      </Section>

      <Section tone="forest" labelledBy="mv-h" className="on-dark adire">
        <h2 id="mv-h" className="sr-only">Mission and vision</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-sub text-sm font-bold text-gold-soft">Mission</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-tight">
              To give every ambitious Nigerian business access to world-class, AI-powered marketing, and turn online visibility into real, measurable growth.
            </p>
          </div>
          <div>
            <p className="font-sub text-sm font-bold text-gold-soft">Vision</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-tight">
              To be the most trusted digital growth partner for Nigerian entrepreneurs, the agency that actually moves the needle.
            </p>
          </div>
        </div>
        <p className="mt-14 max-w-3xl border-l-4 border-gold pl-5 font-accent text-xl italic">
          "Your competitor is already running AI marketing. Are you waiting for them to get even further ahead?"
        </p>
      </Section>

      <Section labelledBy="phil-h">
        <Heading id="phil-h">How we think</Heading>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {philosophy.map((p) => (
            <div key={p.t} className="border-t-4 border-gold pt-4">
              <h3 className="font-sub text-2xl font-bold">{p.t}</h3>
              <p className="mt-2 text-mute">{p.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 max-w-3xl space-y-4 text-lg">
          <p><strong className="font-sub">AI plus marketing.</strong> We use AI to move faster on research, content, analysis and customer conversations. Strategy, judgement and accountability stay with people.</p>
          <p><strong className="font-sub">Nigerian market expertise.</strong> WhatsApp-first buying, mobile-first browsing, price sensitivity and trust dynamics shape every recommendation we make.</p>
        </div>
      </Section>

      <FounderBlock />
      <TrustPillars />
      <FooterCTA source="about" heading="Ready to stop guessing and start engineering growth?" />
    </>
  );
}
