import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Cookie Policy", description: "How Correct Marketer NG uses cookies and similar technologies.", path: "/cookies" });

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookies"
      updated="September 2026"
      sections={[
        { h: "What we use", p: [
          "Essential storage: we remember your cookie choice and, for the length of your visit, the marketing source that brought you here so we can attribute an enquiry if you send one.",
          "Analytics and advertising cookies (only if you accept): Google Analytics, Google Ads, Meta Pixel and LinkedIn Insight Tag, used to measure visits, campaign results and enquiries.",
        ] },
        { h: "Your choice", p: ["Nothing from analytics or advertising providers loads until you click Accept. You can clear your browser storage at any time to see the choice again."] },
      ]}
    />
  );
}
