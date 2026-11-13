/** Pure analysis of a page's HTML for conversion basics. No network, so it is easy to test. */

export type CheckStatus = "pass" | "warn" | "fail";
export type Check = { id: string; label: string; status: CheckStatus; weight: number; detail: string; fix: string };
export type PageFacts = { finalUrl: string; status: number; ms: number; bytes: number; truncated: boolean };
export type SiteCheckResult = { score: number; verdict: string; checks: Check[]; topFixes: Check[]; facts: { title: string | null; url: string } };

const text = (s: string) => s.replace(/\s+/g, " ").trim();
const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))?.slice(2).find((v) => v !== undefined) ?? null;

export function analyzeHtml(html: string, facts: PageFacts): SiteCheckResult {
  const head = html.slice(0, 200_000);
  const title = text(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "") || null;
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const metaByName = (n: string) => { const t = metas.find((m) => attr(m, "name")?.toLowerCase() === n); return t ? attr(t, "content") : null; };
  const description = metaByName("description");
  const viewport = metaByName("viewport");
  const hasOg = metas.some((m) => attr(m, "property")?.toLowerCase() === "og:title");
  const canonical = /<link\b[^>]*rel\s*=\s*["']?canonical/i.test(html);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1].replace(/<[^>]+>/g, ""))).filter(Boolean);
  const links = [...html.matchAll(/<a\b[^>]*>/gi)].map((m) => attr(m[0], "href") ?? "");
  const whatsapp = links.some((h) => /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\/|web\.whatsapp\.com\/send/i.test(h));
  const tel = links.some((h) => /^tel:/i.test(h.trim()));
  const forms = [...html.matchAll(/<form\b[\s\S]*?<\/form>/gi)].map((m) => m[0]);
  const hasForm = forms.some((f) => /<input\b(?![^>]*type\s*=\s*["']?(hidden|search)["']?)/i.test(f) || /<textarea/i.test(f));
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsWithAlt = imgs.filter((i) => (attr(i, "alt") ?? "").trim().length > 0).length;
  const tracking = /googletagmanager\.com|gtag\(|google-analytics\.com|connect\.facebook\.net\/[^"']*fbevents|fbq\(|analytics\.tiktok|ttq\./i.test(html);
  const proof = /testimonial|reviews?\b|rated \d|trusted by|clients?\b.*(?:served|worked)|case stud/i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ""));
  const scripts = (html.match(/<script\b[^>]*\bsrc=/gi) ?? []).length;
  const https = facts.finalUrl.startsWith("https://");

  const checks: Check[] = [];
  const add = (c: Check) => checks.push(c);

  add({ id: "https", label: "Secure connection (HTTPS)", weight: 8, status: https ? "pass" : "fail", detail: https ? "Your page loads over HTTPS." : "Your page loads without HTTPS. Browsers may warn visitors it is not secure.", fix: "Install an SSL certificate and redirect all http addresses to https." });
  add({ id: "whatsapp", label: "WhatsApp chat button or link", weight: 14, status: whatsapp ? "pass" : "fail", detail: whatsapp ? "A WhatsApp link was found." : "No WhatsApp link found on this page. In Nigeria most enquiries start there.", fix: "Add a clear WhatsApp button near the top of the page with a pre-filled message." });
  add({ id: "contact", label: "Another easy way to reach you (call or form)", weight: 10, status: tel || hasForm ? "pass" : "fail", detail: tel || hasForm ? `Found${tel ? " a tap-to-call link" : ""}${tel && hasForm ? " and" : ""}${hasForm ? " an enquiry form" : ""}.` : "No tap-to-call link or enquiry form found.", fix: "Add a tap-to-call number and a short enquiry form (name, phone, need)." });
  add({ id: "viewport", label: "Set up for mobile phones", weight: 10, status: viewport && /width\s*=\s*device-width/i.test(viewport) ? "pass" : "fail", detail: viewport ? "Mobile viewport is set." : "No mobile viewport tag. Phones may show a tiny desktop page.", fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and make sure the layout is responsive.' });
  const tl = title?.length ?? 0;
  add({ id: "title", label: "Clear page title", weight: 8, status: !title ? "fail" : tl >= 20 && tl <= 65 ? "pass" : "warn", detail: !title ? "No page title found." : `Title is ${tl} characters: "${title!.slice(0, 80)}".`, fix: "Write a title of 20 to 65 characters that says what you do and where, for example 'Real Estate Agents in Lekki | Brand'." });
  const dl = description?.length ?? 0;
  add({ id: "description", label: "Search description", weight: 6, status: !description ? "fail" : dl >= 70 && dl <= 170 ? "pass" : "warn", detail: !description ? "No meta description found." : `Description is ${dl} characters.`, fix: "Write a 70 to 170 character description with your offer and a reason to click." });
  add({ id: "h1", label: "One clear main headline", weight: 8, status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn", detail: h1s.length === 1 ? `Headline: "${h1s[0].slice(0, 80)}".` : h1s.length === 0 ? "No main headline (H1) found." : `${h1s.length} main headlines found. One is clearer.`, fix: "Use exactly one H1 that states the outcome the visitor gets." });
  add({ id: "speed", label: "Page responds quickly", weight: 8, status: facts.ms <= 1500 ? "pass" : facts.ms <= 3000 ? "warn" : "fail", detail: `The page came back in ${(facts.ms / 1000).toFixed(1)}s from our test server.`, fix: "Use caching, a faster host and compressed images. Slow pages lose visitors on mobile data." });
  add({ id: "weight", label: "Page is not too heavy", weight: 4, status: facts.bytes <= 300_000 ? "pass" : facts.bytes <= 700_000 ? "warn" : "fail", detail: `The page HTML is ${(facts.bytes / 1024).toFixed(0)} KB${facts.truncated ? " or more" : ""}, before images and scripts.`, fix: "Trim page builders, inline styles and unused sections." });
  add({ id: "tracking", label: "Tracking installed", weight: 8, status: tracking ? "pass" : "fail", detail: tracking ? "Analytics or an ad pixel was found." : "No analytics or ad pixel found. You cannot tell which ads bring enquiries.", fix: "Install Google Analytics and the Meta pixel, and track WhatsApp clicks and form submits as conversions." });
  add({ id: "proof", label: "Proof and trust signals", weight: 8, status: proof ? "pass" : "warn", detail: proof ? "Reviews, testimonials or case studies are mentioned." : "No reviews, testimonials or case studies spotted on this page.", fix: "Add customer reviews, results, photos of past work or logos of clients near the call to action." });
  add({ id: "alt", label: "Images have descriptions", weight: 4, status: imgs.length === 0 ? "warn" : imgsWithAlt / imgs.length >= 0.8 ? "pass" : "warn", detail: imgs.length === 0 ? "No images found in the page HTML." : `${imgsWithAlt} of ${imgs.length} images have alt text.`, fix: "Add short descriptive alt text to every meaningful image." });
  add({ id: "share", label: "Looks right when shared", weight: 2, status: hasOg && canonical ? "pass" : hasOg || canonical ? "warn" : "fail", detail: `Share preview tags: ${hasOg ? "yes" : "missing"}. Canonical link: ${canonical ? "yes" : "missing"}.`, fix: "Add Open Graph tags and a canonical link so shared links look professional." });
  void scripts;

  const total = checks.reduce((n, c) => n + c.weight, 0);
  const earned = checks.reduce((n, c) => n + (c.status === "pass" ? c.weight : c.status === "warn" ? c.weight * 0.5 : 0), 0);
  const score = Math.round((earned / total) * 100);
  const impact = (c: Check) => (c.status === "fail" ? c.weight : c.status === "warn" ? c.weight * 0.5 : 0);
  const topFixes = [...checks].filter((c) => c.status !== "pass").sort((a, b) => impact(b) - impact(a)).slice(0, 5);
  const verdict = score >= 85 ? "Strong basics. Now test your offer and follow-up." : score >= 65 ? "Decent foundation with clear gaps costing you enquiries." : score >= 40 ? "Several basics are missing. Visitors are likely leaving without contacting you." : "Your page is making it hard to enquire. Fix the top items first.";
  return { score, verdict, checks, topFixes, facts: { title, url: facts.finalUrl } };
}
