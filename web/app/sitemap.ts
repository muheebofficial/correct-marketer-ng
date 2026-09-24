import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content/caseStudies";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { getPosts } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const now = new Date();
  const fixed = ["/", "/services", "/industries", "/case-studies", "/about", "/insights", "/audits", "/contact", "/privacy", "/terms", "/cookies"];
  return [
    ...fixed.map((p) => ({ url: absoluteUrl(p), lastModified: now, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, priority: 0.9 })),
    // Sample (placeholder) case studies are excluded until real ones replace them.
    ...caseStudies.filter((c) => !c.isPlaceholder).map((c) => ({ url: absoluteUrl(`/case-studies/${c.slug}`), lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: new Date(p.updated), priority: 0.7 })),
  ];
}
