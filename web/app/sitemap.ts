import type { MetadataRoute } from "next";
import { getCollection } from "@/lib/api";
import { caseStudies } from "@/lib/content/caseStudies";
import { services } from "@/lib/content/services";
import type { CaseStudy, Service } from "@/lib/content/types";
import { categoriesOf, getPosts, slugify } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allServices, allCaseStudies, posts] = await Promise.all([
    getCollection<Service>("services", services),
    getCollection<CaseStudy>("case_studies", caseStudies),
    getPosts(),
  ]);
  const now = new Date();
  const fixed = ["/", "/services", "/industries", "/case-studies", "/about", "/insights", "/audits", "/contact", "/privacy", "/terms", "/cookies"];
  return [
    ...fixed.map((p) => ({ url: absoluteUrl(p), lastModified: now, priority: p === "/" ? 1 : 0.7 })),
    ...allServices.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, priority: 0.9 })),
    // Sample (placeholder) case studies are excluded until real ones replace them.
    ...allCaseStudies.filter((c) => !c.isPlaceholder).map((c) => ({ url: absoluteUrl(`/case-studies/${c.slug}`), lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: new Date(p.updated), priority: 0.7 })),
    ...categoriesOf(posts).map((category) => ({ url: absoluteUrl(`/insights/category/${slugify(category)}`), lastModified: now, priority: 0.5 })),
  ];
}
