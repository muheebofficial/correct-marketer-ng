import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Tools for Nigerian Business Owners",
  description: "Free, instant tools built for Nigerian businesses. Start with the Naira Ad Reality Check to see whether more ad budget will help.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Free Tools", path: "/tools" }]} title="Free tools that give you answers now." sub="No forms to wait on. Enter your numbers and see what to fix." source="tools_index" />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="border-t-4 border-gold bg-white p-6">
            <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">Paid ads</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-forest"><Link href="/tools/ad-budget-calculator" className="hover:underline">Naira Ad Reality Check</Link></h2>
            <p className="mt-3 text-lg">See your cost per sale, your break-even close rate and the three leaks to fix before you raise your ad budget.</p>
            <Link href="/tools/ad-budget-calculator" className="mt-5 inline-flex min-h-[48px] items-center rounded-[3px] bg-forest px-6 font-sub font-bold text-ivory hover:bg-[#0E6236]">Open the tool</Link>
          </li>
        </ul>
        <p className="mt-10 text-mute">More tools are on the way. Prefer a person to look at your setup? <Link href="/audits" className="font-semibold text-forest underline decoration-gold underline-offset-4">Request a free audit</Link>.</p>
      </Section>
      <FooterCTA source="tools_index" />
    </>
  );
}
