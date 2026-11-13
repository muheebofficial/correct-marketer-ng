import Link from "next/link";
import { AdRealityCheck } from "@/components/tools/AdRealityCheck";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { presets, type IndustryPreset } from "@/lib/tools/adCheckPresets";

const faqs = [
  { q: "Does more ad budget fix a campaign that is not working?", a: "Usually not. Budget multiplies what the campaign already does, including the waste. If each sale already costs more than it earns, doubling spend doubles the loss. Fix the offer, tracking and follow-up first." },
  { q: "Is VAT included?", a: "The calculator adds 7.5% VAT to your ad spend, because Meta and Google charge it on Nigerian accounts. Enter your budget before VAT." },
  { q: "What is a good cost per enquiry in Nigeria?", a: "It depends on the industry, but many advertisers see roughly ₦500 to ₦3,000 per lead and about ₦200 to ₦1,000 per WhatsApp conversation. Treat these as rough ranges, not promises." },
  { q: "Is my data stored?", a: "No. The maths runs in your browser. Nothing is saved or sent unless you choose to send your result to us on WhatsApp." },
];

export function AdCheckPage({ preset }: { preset?: IndustryPreset }) {
  const base = preset ?? { slug: "", name: "", intro: "", tip: "", example: { monthlyBudget: 100_000, enquiries: 40, sales: 4, averageSale: 50_000, marginPercent: 40 } };
  const path = preset ? `/tools/ad-budget-calculator/${preset.slug}` : "/tools/ad-budget-calculator";
  const crumbs = [{ name: "Free Tools", path: "/tools" }, { name: "Naira Ad Reality Check", path: "/tools/ad-budget-calculator" }, ...(preset ? [{ name: preset.name, path }] : [])];
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, ...crumbs]), faqSchema(faqs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Free tool"
        title={preset ? `Ad Reality Check for ${preset.name}` : "Naira Ad Reality Check"}
        sub={preset?.intro ?? "Before you raise your ad budget, see whether the problem is your ads, your follow-up or your tracking. Free, instant, in Naira."}
        source={preset ? `ad_check_${preset.slug}` : "ad_check"}
      />
      <Section>
        <AdRealityCheck initial={base.example} industry={preset?.name} tip={preset?.tip} />
      </Section>
      <Section tone="white">
        <h2 className="font-display text-3xl font-extrabold">Check it for your industry</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {presets.map((p) => (
            <li key={p.slug}><Link href={`/tools/ad-budget-calculator/${p.slug}`} className="inline-flex min-h-[40px] items-center rounded-full border border-obsidian/30 px-4 py-2 font-sub text-sm font-bold hover:bg-forest hover:text-ivory">{p.name}</Link></li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-lg">Want the full story? Read <Link href="/blog/more-ad-budget-is-not-the-fix" className="font-semibold text-forest underline decoration-gold underline-offset-4">why more ad budget is not the fix</Link>.</p>
      </Section>
      <Section>
        <h2 className="font-display text-3xl font-extrabold">Questions</h2>
        <div className="mt-6 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q} className="mb-6 border-b border-stone-light pb-5">
              <h3 className="font-sub text-xl font-bold text-forest">{f.q}</h3>
              <p className="mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
      <FooterCTA source="ad_check" />
    </>
  );
}
