import { LeadForm } from "@/components/forms/LeadForm";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Heading, Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { audits } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Marketing, Website & SEO Audits for Nigerian Businesses",
  description:
    "Request a free marketing growth audit, website conversion audit, SEO visibility audit or AI automation opportunity assessment from Correct Marketer NG.",
  path: "/audits",
});

export default function AuditsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Free Audits", path: "/audits" }]}
        title="See what's holding your growth back. Free."
        sub="Pick the audit that matches your biggest worry. Each one ends with a short list of what to fix first."
        source="audits_index"
      />
      <Section>
        <div className="divide-y divide-obsidian/20 border-y border-obsidian/20">
          {audits.map((a) => (
            <article key={a.slug} id={a.slug} className="grid scroll-mt-24 gap-8 py-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <Heading as="h2">{a.title}</Heading>
                <p className="mt-4 text-lg text-mute">{a.body}</p>
                <div className="mt-6"><WhatsAppButton message={a.waMessage} source={`audit_${a.slug}`} variant="ghost-dark" label="Ask on WhatsApp instead" /></div>
              </div>
              <LeadForm intent={a.intent} submitLabel={`Request My ${a.title.replace("Free ", "")}`} successWaMessage={a.waMessage} />
            </article>
          ))}
        </div>
      </Section>
      <FooterCTA source="audits" />
    </>
  );
}
