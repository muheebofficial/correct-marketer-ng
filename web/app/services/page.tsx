import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

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
        sub="From the best SEO agency in Nigeria to the best Google Ads agency in Lagos, our team helps businesses grow with AI automation, websites, lead generation and brand strategy built for results.",
        cta="Start a Growth Conversation"
        source="services_index"
      />
      <Section>
        <ServiceGrid />
      </Section>
      <FooterCTA source="services_index" />
    </>
  );
}
