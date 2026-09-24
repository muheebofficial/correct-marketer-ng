import Link from "next/link";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { GrowthFlow } from "@/components/sections/GrowthFlow";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessStepper } from "@/components/sections/ProcessStepper";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustPillars } from "@/components/sections/TrustPillars";
import { Heading, Section } from "@/components/ui/Section";
import { audits } from "@/lib/content/home";
import { homeFaqs } from "@/lib/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Digital Marketing Agency Nigeria | AI-Powered Growth in Lagos",
  description:
    "Correct Marketer NG is a Lagos digital growth agency. We build AI-powered marketing systems, SEO, paid ads, conversion-focused websites and automation that turn attention into customers.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />

      <Section tone="forest" labelledBy="difference-heading" className="on-dark adire">
        <Heading id="difference-heading" tone="dark" className="max-w-4xl">
          We don't just market businesses. We engineer growth systems.
        </Heading>
        <p className="mb-12 mt-5 max-w-2xl text-lg text-ivory/90">
          Every stage below is connected to the next. That's the difference between buying marketing services and owning a system that produces customers. Pick a stage to see what happens there.
        </p>
        <GrowthFlow />
      </Section>

      <Section labelledBy="services-heading">
        <div className="mb-12 max-w-3xl">
          <Heading id="services-heading">Start with the problem. We'll bring the right tools.</Heading>
          <p className="mt-5 text-lg text-mute">
            Six services, one goal: more qualified customers for your business. Most clients begin with one and add others as the system grows.
          </p>
        </div>
        <ServiceGrid headingId="services-heading" />
      </Section>

      <TrustPillars />

      <Section labelledBy="process-heading">
        <div className="mb-10 max-w-3xl">
          <Heading id="process-heading">The Correct Marketer Growth Process</Heading>
          <p className="mt-5 text-lg text-mute">Seven steps, the same every time, so you always know where you are and what happens next.</p>
        </div>
        <ProcessStepper />
      </Section>

      <FounderBlock compact />

      <Section tone="white" labelledBy="audits-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <Heading id="audits-heading">Not ready to talk? Start with an audit.</Heading>
            <p className="mt-5 text-lg text-mute">
              Four free reviews that show you where you're losing customers and what to fix first. No pitch deck, just findings.
            </p>
          </div>
          <ul className="divide-y divide-obsidian/15 border-y border-obsidian/15">
            {audits.map((a) => (
              <li key={a.slug}>
                <Link href={`/audits#${a.slug}`} className="group flex min-h-[64px] items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-sub text-lg font-bold text-forest">{a.title}</span>
                    <span className="block text-sm text-mute">{a.body}</span>
                  </span>
                  <span aria-hidden="true" className="font-sub text-xl font-bold text-gold-ink transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Heading id="faq-heading">Straight answers to what business owners ask</Heading>
            <p className="mt-5 text-mute">
              More in our <Link href="/insights" className="font-semibold text-forest underline decoration-gold underline-offset-4">Insights</Link>.
            </p>
          </div>
          <FAQ faqs={homeFaqs} />
        </div>
      </Section>

      <FooterCTA source="home" />
    </>
  );
}
