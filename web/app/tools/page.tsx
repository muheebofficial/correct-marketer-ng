import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools/registry";

export const metadata = buildMetadata({
  title: "Free Marketing Tools for Nigerian Business Owners",
  description: "Free, instant tools built for Nigerian businesses: check your ad budget in naira and scan your website for what stops enquiries. No sign-up needed.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }])} />
      <PageHero crumbs={[{ name: "Tools", path: "/tools" }]} eyebrow="Free tools" title="Free tools that give you answers now." sub="No forms to wait on. Enter your details, see what is holding your marketing back, and know what to fix first." source="tools_index" />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <li key={t.slug} className="flex flex-col border-t-4 border-gold bg-white p-6 sm:p-8">
              <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">{t.tag} · {t.time}</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-forest"><Link href={t.href} className="hover:underline">{t.name}</Link></h2>
              <p className="mt-3 text-lg">{t.description}</p>
              <p className="mt-5 font-sub text-sm font-bold">What you get</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {t.gets.map((g) => <li key={g}>{g}</li>)}
              </ul>
              <Link href={t.href} className="mt-auto inline-flex min-h-[48px] w-fit items-center rounded-[3px] bg-forest px-6 font-sub font-bold text-ivory hover:bg-[#0E6236]" style={{ marginTop: "1.75rem" }}>
                Open {t.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-3xl border-l-4 border-gold bg-white p-6">
          <h2 className="font-display text-2xl font-extrabold">Want a person to look at it?</h2>
          <p className="mt-2 text-lg">Tools show you where to look. If you want us to fix it with you, <Link href="/audits" className="font-semibold text-forest underline decoration-gold underline-offset-4">request a free audit</Link> or <Link href="/contact" className="font-semibold text-forest underline decoration-gold underline-offset-4">talk to us</Link>.</p>
        </div>
      </Section>
      <FooterCTA source="tools_index" />
    </>
  );
}
