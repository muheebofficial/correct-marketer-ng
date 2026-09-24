import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Digital Marketing Services in Nigeria | SEO, Ads, AI, Web",
  description:
    "SEO, paid advertising, AI marketing automation, web development, lead generation and brand strategy for Nigerian businesses, built as one connected growth system.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Six ways we help your business grow. One system behind all of them."
        sub="You don't need every service on day one. Tell us where growth is stuck and we'll start with the piece that moves it."
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
