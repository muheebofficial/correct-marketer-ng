import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading, Section } from "@/components/ui/Section";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getGroup, getNextGroup, getServicesByGroup, serviceGroups } from "@/lib/services-taxonomy";

export function groupMetadata(slug: string) {
  const g = getGroup(slug);
  if (!g) return {};
  return buildMetadata({ title: g.metaTitle, description: g.metaDescription, path: `/services/${g.slug}` });
}

export function GroupHubPage({ slug }: { slug: string }) {
  const g = getGroup(slug);
  if (!g) notFound();
  const list = getServicesByGroup(g.slug);
  const next = getNextGroup(g.slug);
  const path = `/services/${g.slug}`;
  const crumbs = [{ name: "Services", path: "/services" }, { name: g.name, path }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }, ...crumbs]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: g.hubH1,
            description: g.metaDescription,
            url: absoluteUrl(path),
            mainEntity: { "@type": "ItemList", itemListElement: list.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: absoluteUrl(s.path) })) },
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={`Stage ${g.stage} of ${serviceGroups.length} · ${g.name}`} title={g.hubH1} sub={g.summary} cta="Start a Growth Conversation" source={`service_group_${g.slug}`} />

      <Section labelledBy="services-h">
        <Heading id="services-h">{list.length} services in {g.name}</Heading>
        <p className="mt-3 max-w-2xl text-lg text-mute">{g.tagline}</p>
        <ul className="mt-10 grid gap-px border border-stone-light bg-stone-light md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li key={s.slug} className="bg-ivory">
              <Link href={s.path} className="group flex h-full flex-col p-7 transition-colors hover:bg-forest hover:text-ivory focus-visible:bg-forest focus-visible:text-ivory">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-forest group-hover:text-ivory group-focus-visible:text-ivory">{s.name}</h3>
                <p className="mt-3 text-[15px] text-mute group-hover:text-ivory/90 group-focus-visible:text-ivory/90">{s.snippet}</p>
                <span className="mt-auto pt-5 font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-[6px] group-hover:text-gold-soft group-focus-visible:text-gold-soft">Explore {s.menuLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="together-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading id="together-h">How these services work together</Heading>
          <p className="text-lg">{g.howTheyWorkTogether}</p>
        </div>
      </Section>

      <Section labelledBy="journey-h">
        <h2 id="journey-h" className="font-display text-3xl font-extrabold text-forest">The growth path</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">
          {serviceGroups.map((x) => (
            <li key={x.slug} className={`border-t-4 p-4 ${x.slug === g.slug ? "border-gold bg-white" : "border-stone-light"}`}>
              <p className="font-display text-2xl font-extrabold text-forest">{String(x.stage).padStart(2, "0")}</p>
              <Link href={`/services/${x.slug}`} aria-current={x.slug === g.slug ? "page" : undefined} className="font-sub font-bold underline-offset-4 hover:underline">{x.name}</Link>
              <p className="mt-1 text-sm text-mute">{x.tagline}</p>
            </li>
          ))}
        </ol>
        {next && <p className="mt-8 text-lg">Ready for the next stage? <Link href={`/services/${next.slug}`} className="font-semibold text-forest underline decoration-gold underline-offset-4">{next.hubH1}</Link></p>}
      </Section>

      <FooterCTA source={`service_group_${g.slug}`} />
    </>
  );
}
