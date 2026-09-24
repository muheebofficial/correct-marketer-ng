import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Correct Marketer NG | Lagos Digital Marketing Agency",
  description: "Talk to Correct Marketer NG about SEO, ads, websites, AI automation and lead generation. WhatsApp, email or a short form. Based in Lagos, Nigeria.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Correct Marketer NG",
          url: `${site.url}/contact`,
        }}
      />
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Let's Talk About Growth."
        sub="Tell us what you're trying to grow and where it's stuck. We'll come back with an honest view and a suggested first step. No pressure, no jargon."
        source="contact"
      />
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <h2 className="mb-6 font-display text-4xl font-extrabold text-forest">Let's Talk Growth</h2>
            <LeadForm intent="contact" submitLabel="Start My Growth Conversation" />
          </div>
          <aside aria-label="Other ways to reach us" className="space-y-8">
            <div>
              <h2 className="font-sub text-xl font-bold">Fastest: WhatsApp</h2>
              <p className="mb-4 mt-1 text-mute">Message us any time. We reply during working hours.</p>
              <WhatsAppButton source="contact_sidebar" variant="gold" />
            </div>
            <div>
              <h2 className="font-sub text-xl font-bold">Email</h2>
              <a href={`mailto:${site.email}`} className="break-all text-forest underline decoration-gold underline-offset-4">{site.email}</a>
            </div>
            <div>
              <h2 className="font-sub text-xl font-bold">Where we are</h2>
              <p className="text-mute">Lagos, Nigeria. We work with clients across Nigeria and internationally.</p>
            </div>
            <div className="border-l-4 border-gold bg-ivory p-5">
              <h2 className="font-sub text-lg font-bold">What happens next</h2>
              <p className="mt-1 text-mute">We usually reply within one business day. If we're a good fit, we'll suggest a short call. If we're not, we'll say so and point you in a better direction.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
