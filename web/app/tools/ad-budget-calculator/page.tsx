import { AdCheckPage } from "@/components/tools/AdCheckPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Naira Ad Reality Check: Is More Ad Budget the Fix?",
  description: "Free calculator for Nigerian businesses. Enter your ad spend, enquiries and sales to see your cost per sale, break-even close rate and what to fix before raising your budget.",
  path: "/tools/ad-budget-calculator",
});

export default function Page() {
  return <AdCheckPage />;
}
