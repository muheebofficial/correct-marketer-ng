import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteChecker } from "@/components/tools/SiteChecker";
import { Section } from "@/components/ui/Section";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Conversion Checker for Nigerian Businesses",
  description: "Free instant scan of your website. See whether visitors can easily WhatsApp, call or enquire, and get a score with the top fixes ranked by impact.",
  path: "/tools/website-conversion-checker",
});

const faqs = [
  { q: "What does the Website Conversion Checker look at?", a: "It reads one public page and checks the basics that turn visits into enquiries: WhatsApp and call options, enquiry form, mobile setup, HTTPS, headline, title and description, response time, tracking, proof, image descriptions and share tags." },
  { q: "Does a high score mean my website converts well?", a: "No. It means the basics are in place. Conversion also depends on your offer, traffic quality, page content and how fast you follow up. Use the score to find obvious gaps, not as a guarantee." },
  { q: "Do you store my website or result?", a: "No. We fetch the page once to run the check and do not save it. Nothing is sent to us unless you choose to share your result on WhatsApp." },
  { q: "Why can it not check my website?", a: "Some sites block automated visitors, need a login, or load their content only with JavaScript. Try your homepage address, or send us the link on WhatsApp and we will look at it manually." },
];

export default function Page() {
  const crumbs = [{ name: "Tools", path: "/tools" }, { name: "Website Conversion Checker", path: "/tools/website-conversion-checker" }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, ...crumbs]), faqSchema(faqs)]} />
      <PageHero crumbs={crumbs} eyebrow="Free tool" title="Website Conversion Checker" sub="Paste your website address and see what stops visitors from messaging, calling or enquiring. Free, instant, no sign-up." source="site_checker" />
      <Section><SiteChecker /></Section>
      <Section tone="white">
        <h2 className="font-display text-3xl font-extrabold">Already spending on ads?</h2>
        <p className="mt-3 max-w-2xl text-lg">A weak page wastes ad money. Run the <Link href="/tools/ad-budget-calculator" className="font-semibold text-forest underline decoration-gold underline-offset-4">Naira Ad Reality Check</Link> too, then read <Link href="/blog/more-ad-budget-is-not-the-fix" className="font-semibold text-forest underline decoration-gold underline-offset-4">why more budget is not the fix</Link>.</p>
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
      <FooterCTA source="site_checker" />
    </>
  );
}
