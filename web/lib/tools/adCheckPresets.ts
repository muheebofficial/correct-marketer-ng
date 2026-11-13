import type { AdCheckInput } from "./adCheck";

export type IndustryPreset = {
  slug: string;
  name: string;
  intro: string;
  example: Pick<AdCheckInput, "monthlyBudget" | "enquiries" | "sales" | "averageSale" | "marginPercent">;
  tip: string;
};

// Starting values are illustrative and meant to be overwritten with the visitor's own numbers.
export const presets: IndustryPreset[] = [
  { slug: "real-estate", name: "Real Estate", intro: "Check whether your property ads fail at lead cost or at inspections and closing.", example: { monthlyBudget: 150_000, enquiries: 60, sales: 1, averageSale: 3_000_000, marginPercent: 5 }, tip: "Use the commission or margin per sale, not the property price." },
  { slug: "food-business", name: "Food Business", intro: "See whether your orders cover ad spend after ingredients and delivery.", example: { monthlyBudget: 80_000, enquiries: 120, sales: 40, averageSale: 6_500, marginPercent: 30 }, tip: "Use margin after ingredients, packaging and delivery." },
  { slug: "international-education", name: "International Education", intro: "Work out whether student enquiries turn into paying applicants at a cost that works.", example: { monthlyBudget: 200_000, enquiries: 80, sales: 3, averageSale: 400_000, marginPercent: 40 }, tip: "Use the service fee or commission you earn per enrolled student." },
  { slug: "ecommerce", name: "E-commerce", intro: "Test whether your store's ad spend returns more than the margin it needs.", example: { monthlyBudget: 120_000, enquiries: 150, sales: 25, averageSale: 18_000, marginPercent: 35 }, tip: "Remember delivery and returns when you set margin." },
  { slug: "professional-services", name: "Professional Services", intro: "Check whether leads from ads become clients at a cost your fees can support.", example: { monthlyBudget: 100_000, enquiries: 30, sales: 3, averageSale: 150_000, marginPercent: 60 }, tip: "Use average first-project value and your real margin." },
];

export const getPreset = (slug: string) => presets.find((p) => p.slug === slug);
