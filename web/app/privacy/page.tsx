import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How Correct Marketer NG collects, uses and protects your personal information.", path: "/privacy" });

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="September 2026"
      sections={[
        { h: "Who we are", p: [`Correct Marketer NG is a digital marketing agency based in Lagos, Nigeria. You can reach us at ${site.email}.`] },
        { h: "What we collect", p: [
          "Details you give us in our forms: name, email, phone or WhatsApp number, business name, website, business type, your marketing challenge, budget range, preferred contact method and any message you write.",
          "Marketing source details saved for your visit and sent with a form you submit: UTM parameters, the page you landed on and the referring website.",
          "If you accept cookies: analytics data about how you use the site, collected by tools such as Google Analytics, Meta Pixel and LinkedIn Insight Tag.",
        ] },
        { h: "How we use it", p: ["To reply to your request, prepare audits and proposals, understand which channels bring enquiries, send newsletters you signed up for, and improve the site. We do not sell your personal data."] },
        { h: "Sharing", p: ["We use service providers to host the site, store enquiries and send email. They may process your data on our behalf. We may disclose information where the law requires it."] },
        { h: "Your rights", p: ["Under the Nigeria Data Protection Act 2023 you may ask to access, correct or delete your personal data, or withdraw consent. Email us and we'll respond."] },
        { h: "Retention and security", p: ["We keep enquiry data for as long as needed to deal with your request and our legitimate business records. We use access controls and encrypted connections to protect it."] },
        { h: "Changes", p: ["We'll update this page if our practices change."] },
      ]}
    />
  );
}
