import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { getCollection } from "@/lib/api";
import { caseStudies } from "@/lib/content/caseStudies";
import type { CaseStudy } from "@/lib/content/types";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Case Studies | Marketing Results for Nigerian Businesses",
  description: "How Correct Marketer NG diagnoses, builds and measures growth systems for Nigerian businesses, with verified metrics.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const all = await getCollection<CaseStudy>("case_studies", caseStudies);
  const real = all.filter((c) => !c.isPlaceholder);
  const samples = all.filter((c) => c.isPlaceholder);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Case Studies", path: "/case-studies" }]}
        title="Proof, told plainly."
        sub="Every case study follows the same format: the problem, the strategy, what we built and the numbers that changed. We only publish results we can verify."
        cta="Build Something Like This"
        source="case_studies_index"
      />
      <Section>
        {real.length > 0 && (
          <ul className="grid gap-6 md:grid-cols-2">
            {real.map((c) => (
              <li key={c.slug} className="border border-stone-light bg-white p-7">
                <p className="font-sub text-sm font-bold text-gold-ink">{c.industry}</p>
                <h2 className="mt-1 font-sub text-2xl font-bold text-forest"><Link href={`/case-studies/${c.slug}`} className="underline-offset-4 hover:underline">{c.title}</Link></h2>
                <p className="mt-3 text-mute">{c.problem}</p>
              </li>
            ))}
          </ul>
        )}
        {samples.length > 0 && (
          <div className={real.length ? "mt-16" : ""}>
            <h2 className="font-display text-3xl font-extrabold text-forest">The format you'll see on every case study</h2>
            <p className="mt-2 max-w-2xl text-mute">These are layout samples with no real client or results. They show how verified case studies will be presented.</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {samples.map((c) => (
                <li key={c.slug} className="border border-dashed border-obsidian/40 p-7">
                  <p className="inline-block bg-gold px-2 py-0.5 font-sub text-xs font-bold text-obsidian">Sample layout, not a real client</p>
                  <h3 className="mt-3 font-sub text-xl font-bold"><Link href={`/case-studies/${c.slug}`} className="underline-offset-4 hover:underline">{c.title}</Link></h3>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
      <FooterCTA source="case_studies_index" cta="Build Something Like This" />
    </>
  );
}
