import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import Link from "next/link";
import { ServiceSnippetCard } from "@/components/services/ServiceContent";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { getServicesByGroup, serviceGroups } from "@/lib/services-taxonomy";

export const metadata = buildMetadata({
  title: "Best Digital Marketing Agency in Lagos, Nigeria | SEO, Ads, AI & Web",
  description:
    "Looking for the best digital marketing agency in Lagos or the best digital marketing services in Nigeria? Correct Marketer NG helps businesses grow with SEO, paid ads, AI automation, websites, lead generation and branding that drive measurable results for Nigerian companies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="The best digital marketing services in Lagos, Nigeria for businesses that want real growth."
        sub="From the best SEO agency in Nigeria to the best Google Ads agency in Lagos, our team helps businesses grow with AI automation, websites, lead generation and brand strategy built for results."
        cta="Start a Growth Conversation"
        source="services_index"
      />
      <Section>
        <div className="space-y-16">
          {serviceGroups.map((group) => (
            <section key={group.slug} aria-labelledby={`${group.slug}-index`}>
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-sub text-sm font-bold uppercase tracking-wide text-gold-ink">Stage {group.stage} of 5</p>
                  <h2 id={`${group.slug}-index`} className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-forest">
                    {group.name}
                  </h2>
                  <p className="mt-2 text-mute">{group.tagline}</p>
                </div>
                <Link
                  href={`/services/${group.slug}`}
                  className="font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-4"
                >
                  Explore {group.name}
                </Link>
              </div>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {getServicesByGroup(group.slug).map((service) => (
                  <ServiceSnippetCard key={service.slug} service={service} />
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mt-16 border-t border-stone-light pt-8">
          <h2 className="font-display text-3xl font-bold text-forest">Not sure where to start?</h2>
          <p className="mt-3 max-w-2xl text-mute">
            Tell us what is getting in the way of growth. We can help you choose a sensible first step for your business.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/contact" className="font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-4">
              Start a Growth Conversation
            </Link>
            <Link href="/audits" className="font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-4">
              Explore our free audits
            </Link>
          </div>
        </div>
      </Section>
      <FooterCTA source="services_index" />
    </>
  );
}
