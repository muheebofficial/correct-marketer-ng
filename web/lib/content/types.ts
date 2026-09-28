export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  outcome: string; // outcome-led card headline
  summary: string;
  tags: string[];
  cta: string; // card CTA
  heroCta: string; // page-specific primary CTA
  waMessage: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline: string;
  heroSub: string;
  heroJourney: [string, string, string];
  whyChoose: { title: string; body: string }[];
  relatedServices: string[];
  problem: { title: string; points: string[] };
  solution: string[];
  how: { title: string; body: string }[];
  deliverables: string[];
  whoFor: string[];
  benefits: { title: string; body: string }[];
  faqs: Faq[];
  industries: string[];
  posts: string[];
  intent: "growth-audit" | "website-conversion-audit" | "seo-visibility-audit" | "ai-automation-assessment";
};

export type Industry = {
  slug: string;
  name: string;
  problem: string;
  opportunity: string;
  system: string[];
  services: string[];
  cta: string;
};

export type Metric = { label: string; value: string; note?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  isPlaceholder: boolean; // true = layout sample only; renders a visible "Sample layout" label
  problem: string;
  strategy: string;
  execution: string[];
  channels: string[];
  metrics: Metric[];
  before: string;
  after: string;
  lessons: string[];
  published?: string;
};

export type PostSection = { heading: string; paragraphs: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  published: string; // ISO date
  updated: string; // ISO date
  readingMinutes: number;
  service: string; // related service slug
  intro: string;
  sections: PostSection[];
  related: string[];
};
