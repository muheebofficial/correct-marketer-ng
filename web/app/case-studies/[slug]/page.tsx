import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/tracking/TrackView";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Heading, Section } from "@/components/ui/Section";
import { getCollection } from "@/lib/api";
import { caseStudies } from "@/lib/content/caseStudies";
import type { CaseStudy } from "@/lib/content/types";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

async function load(slug: string) {
  return (await getCollection<CaseStudy>("case_studies", caseStudies)).find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await load(params.slug);
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: c.isPlaceholder ? "Sample case study layout." : c.problem.slice(0, 155),
    path: `/case-studies/${c.slug}`,
    noindex: c.isPlaceholder,
  });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = await load(params.slug);
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const max = Math.max(...c.metrics.map((m) => Number(m.value.replace(/[^0-9.]/g, "")) || 0), 0);

  return (
    <>
      <TrackView event="case_study_view" params={{ case_study: c.slug }} />
      <PageHero
        crumbs={[{ name: "Case Studies", path: "/case-studies" }, { name: c.title, path }]}
        eyebrow={`${c.industry} · ${c.client}`}
        title={c.title}
        source="case_study_hero"
      >
        {c.isPlaceholder && (
          <p role="note" className="mt-6 inline-block bg-gold px-3 py-1.5 font-sub text-sm font-bold text-obsidian">
            Sample layout. No real client or results. Replace via the CMS with verified work.
          </p>
        )}
      </PageHero>

      <Section labelledBy="metrics-h">
        <Heading id="metrics-h">Key metrics</Heading>
        <dl className="mt-8 grid gap-px border border-stone-light bg-stone-light sm:grid-cols-2 lg:grid-cols-4">
          {c.metrics.map((m) => {
            const n = Number(m.value.replace(/[^0-9.]/g, ""));
            const pct = max > 0 && n > 0 ? Math.round((n / max) * 100) : 0;
            return (
              <div key={m.label} className="bg-white p-6">
                <dt className="font-sub text-sm font-bold text-mute">{m.label}</dt>
                <dd className="mt-1 font-display text-5xl font-extrabold text-forest">{m.value}</dd>
                {pct > 0 && (
                  <div aria-hidden="true" className="mt-3 h-1.5 bg-stone-light"><div className="h-full bg-gold" style={{ width: `${pct}%` }} /></div>
                )}
                {m.note && <p className="mt-2 text-xs text-mute">{m.note}</p>}
              </div>
            );
          })}
        </dl>
      </Section>

      <Section tone="white" labelledBy="story-h">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="story-h" className="font-display text-3xl font-extrabold text-forest">The problem</h2>
            <p className="mt-3 text-lg">{c.problem}</p>
            <h2 className="mt-10 font-display text-3xl font-extrabold text-forest">The strategy</h2>
            <p className="mt-3 text-lg">{c.strategy}</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold text-forest">What we did</h2>
            <ol className="mt-3 space-y-3">
              {c.execution.map((e, i) => (
                <li key={e} className="flex gap-4"><span className="font-display text-2xl font-extrabold text-gold-ink">{String(i + 1).padStart(2, "0")}</span><span className="pt-1">{e}</span></li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-mute">Channels: {c.channels.join(", ")}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="ba-h">
        <h2 id="ba-h" className="sr-only">Before and after</h2>
        <div className="grid gap-px border border-stone-light bg-stone-light md:grid-cols-2">
          <div className="bg-ivory p-7"><p className="font-sub text-sm font-bold text-mute">Before</p><p className="mt-2 text-lg">{c.before}</p></div>
          <div className="bg-forest p-7 text-ivory"><p className="font-sub text-sm font-bold text-gold-soft">After</p><p className="mt-2 text-lg">{c.after}</p></div>
        </div>
        <h2 className="mt-14 font-display text-3xl font-extrabold text-forest">Lessons</h2>
        <ul className="mt-4 space-y-2">
          {c.lessons.map((l) => <li key={l} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />{l}</li>)}
        </ul>
      </Section>

      <FooterCTA source="case_study" heading="Want a result like this?" body="Tell us where growth is stuck and we'll show you where to start." cta="Build Something Like This" />
    </>
  );
}
