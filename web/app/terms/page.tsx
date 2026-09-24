import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms of Use", description: "Terms for using the Correct Marketer NG website.", path: "/terms" });

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated="September 2026"
      sections={[
        { h: "Using this site", p: ["This website is provided for general information about Correct Marketer NG and its services. By using it you agree to these terms."] },
        { h: "No guarantee of results", p: ["Marketing outcomes depend on many factors. Articles and pages on this site are general guidance and are not a promise of specific results for your business."] },
        { h: "Client work", p: ["Paid services are governed by a separate written agreement or proposal, which takes priority over these terms."] },
        { h: "Intellectual property", p: ["Content on this site belongs to Correct Marketer NG unless stated otherwise. Please don't copy it without permission."] },
        { h: "Liability", p: ["To the extent the law allows, we are not liable for losses arising from your use of this site or reliance on its content."] },
        { h: "Governing law", p: ["These terms are governed by the laws of the Federal Republic of Nigeria."] },
      ]}
    />
  );
}
