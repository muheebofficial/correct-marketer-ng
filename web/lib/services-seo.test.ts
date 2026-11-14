import assert from "node:assert/strict";
import { serviceCopy } from "./content/serviceCopy";
import { services as flagship } from "./content/services";
import { serviceGroups, services, validateTaxonomy } from "./services-taxonomy";
import { serviceSeo } from "./services-seo";

validateTaxonomy();
const flagshipSlugs = new Set(flagship.map((s) => s.slug));
for (const s of services) {
  assert.match(s.slug, /lagos-nigeria/, `slug not localised: ${s.slug}`);
  assert.ok(!/-in-nigeria$|-nigeria$/.test(s.slug.replace("lagos-nigeria", "")), s.slug);
  if (!flagshipSlugs.has(s.slug)) {
    const seo = serviceSeo[s.slug];
    assert.ok(seo, `missing seo ${s.slug}`);
    assert.ok(serviceCopy[s.slug], `missing copy ${s.slug}`);
    assert.ok(seo.title.length <= 62, `title too long (${seo.title.length}): ${seo.title}`);
    assert.ok(seo.description.length <= 165 && seo.description.length >= 90, `description length ${seo.description.length}: ${s.slug}`);
    assert.match(seo.title + seo.description, /Lagos/, s.slug);
    assert.match(seo.title + seo.description, /Nigeria/, s.slug);
  }
}
for (const slug of Object.keys(serviceSeo)) assert.ok(services.some((s) => s.slug === slug), `orphan seo ${slug}`);
for (const f of flagship) {
  assert.ok(f.seoTitle.includes("Lagos, Nigeria"), f.slug);
  assert.ok(f.seoDescription.length <= 165, `${f.slug} desc ${f.seoDescription.length}`);
  assert.ok(f.relatedServices.every((r) => !r.endsWith("-in-nigeria")), f.slug);
}
for (const g of serviceGroups) { assert.match(g.slug, /lagos-nigeria/); assert.match(g.metaDescription, /Lagos/); }
console.log("services seo ok", services.length);
