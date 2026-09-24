import { absoluteUrl, site } from "./site";

type Crumb = { name: string; path: string };
type Faq = { q: string; a: string };

const orgId = `${site.url}/#organization`;
const personId = `${site.url}/#founder`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        url: site.url,
        slogan: site.tagline,
        description:
          "AI-powered digital growth agency in Lagos, Nigeria: SEO, paid advertising, AI marketing automation, web development, lead generation and brand strategy.",
        foundingDate: String(site.founded),
        email: site.email,
        telephone: `+${site.whatsappNumber}`,
        address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
        areaServed: [
          { "@type": "Country", name: "Nigeria" },
          { "@type": "City", name: "Lagos" },
          { "@type": "City", name: "Abuja" },
        ],
        founder: { "@id": personId },
        ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en-NG",
      },
    ],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.founder.name,
    jobTitle: site.founder.title,
    url: absoluteUrl("/about"),
    worksFor: { "@id": orgId },
    knowsAbout: ["SEO", "Paid advertising", "Web development", "AI automation", "Conversion rate optimization", "Digital marketing"],
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Nigeria" },
  };
}

export function articleSchema(a: { title: string; description: string; path: string; published: string; updated: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.path),
    datePublished: a.published,
    dateModified: a.updated,
    author: { "@type": "Person", name: a.author, "@id": personId },
    publisher: { "@id": orgId },
    inLanguage: "en-NG",
  };
}
