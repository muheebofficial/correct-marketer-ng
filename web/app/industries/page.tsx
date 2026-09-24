import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Digital Marketing for Nigerian Industries | SMEs, E-commerce, Real Estate",
  description:
    "Growth systems for Nigerian SMEs, e-commerce, professional services, education, hospitality, restaurants, technology, real estate, personal brands and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        title="Every industry has its own growth problem. Here's how we solve yours."
        sub="Different customers, different buying habits, different bottlenecks. For each industry below: the problem we usually find, the opportunity, and the system we'd build."
        cta="Start a Growth Conversation"
        source="industries_index"
      />
      <Section>
        <nav aria-label="Industries" className="mb-14 flex flex-wrap gap-2">
          {industries.map((i) => (
            <a key={i.slug} href={`#${i.slug}`} className="min-h-[40px] rounded-full border border-obsidian/30 px-4 py-2 font-sub text-sm font-bold hover:bg-forest hover:text-ivory">{i.name}</a>
          ))}
        </nav>
        <div className="divide-y divide-obsidian/20 border-y border-obsidian/20">
          {industries.map((i) => (
            <article key={i.slug} id={i.slug} className="grid scroll-mt-24 gap-8 py-12 lg:grid-cols-[1fr_2fr] lg:gap-14">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-forest">{i.name}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-sub text-sm font-bold text-gold-ink">The problem</h3>
                  <p className="mt-1">{i.problem}</p>
                </div>
                <div>
                  <h3 className="font-sub text-sm font-bold text-gold-ink">The opportunity</h3>
                  <p className="mt-1">{i.opportunity}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-sub text-sm font-bold text-gold-ink">The growth system we'd build</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {i.system.map((s) => (
                      <li key={s} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />{s}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-mute">
                    Services involved:{" "}
                    {i.services.map((sv, idx) => {
                      const s = services.find((x) => x.slug === sv);
                      return s ? (
                        <span key={sv}>
                          <Link href={`/services/${sv}`} className="font-semibold text-forest underline decoration-gold underline-offset-4">{s.name}</Link>
                          {idx < i.services.length - 1 ? ", " : ""}
                        </span>
                      ) : null;
                    })}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <Button href="/contact" variant="forest" event="service_cta_click" params={{ source: "industries", industry: i.slug }}>{i.cta}</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <FooterCTA source="industries" />
    </>
  );
}
