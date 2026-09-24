import type { CaseStudy } from "./types";

/**
 * IMPORTANT: these are clearly labelled layout samples. They contain no real client, no real
 * results. Replace them from the CMS (PUT /v1/admin/content/case_studies/<slug>) with verified
 * work and set isPlaceholder to false. The site never presents a placeholder as real proof.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-lead-generation-case-study",
    title: "Sample layout: lead generation for a professional services firm",
    client: "[Client name goes here]",
    industry: "Professional Services",
    isPlaceholder: true,
    problem: "[Describe the client's situation before working with you: what wasn't working, what it was costing them.]",
    strategy: "[Explain the thinking: what you decided to do and why.]",
    execution: ["[What was built or launched first]", "[What was tested]", "[What was improved]"],
    channels: ["SEO", "Google Ads", "Website"],
    metrics: [
      { label: "Leads per month", value: "[--]", note: "Replace with verified figure" },
      { label: "Cost per lead", value: "[--]", note: "Replace with verified figure" },
      { label: "Organic traffic", value: "[--]", note: "Replace with verified figure" },
      { label: "Conversion rate", value: "[--]", note: "Replace with verified figure" },
    ],
    before: "[State of the business before: verified numbers only.]",
    after: "[State after: verified numbers only.]",
    lessons: ["[What you learned that others can use]", "[What you'd do differently]"],
  },
  {
    slug: "sample-ecommerce-case-study",
    title: "Sample layout: e-commerce sales growth",
    client: "[Client name goes here]",
    industry: "E-commerce",
    isPlaceholder: true,
    problem: "[Describe the problem: traffic without sales, high ad costs, support overload.]",
    strategy: "[Explain the strategy.]",
    execution: ["[Step one]", "[Step two]", "[Step three]"],
    channels: ["Meta Ads", "Retargeting", "WhatsApp automation"],
    metrics: [
      { label: "ROAS", value: "[--]", note: "Replace with verified figure" },
      { label: "Revenue", value: "[--]", note: "Replace with verified figure" },
      { label: "Conversion rate", value: "[--]", note: "Replace with verified figure" },
    ],
    before: "[Before: verified numbers only.]",
    after: "[After: verified numbers only.]",
    lessons: ["[Lesson one]", "[Lesson two]"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
