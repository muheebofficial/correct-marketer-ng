// Run with: npx tsx lib/tools/siteCheck.test.ts
import assert from "node:assert/strict";
import http from "node:http";
import { analyzeHtml } from "./siteCheck";

const facts = { finalUrl: "https://example.com.ng/", status: 200, ms: 800, bytes: 40_000, truncated: false };
const good = `<!doctype html><html><head><title>Real Estate Agents in Lekki | Brand Homes</title>
<meta name="description" content="Verified land and apartments in Lekki and Ajah. Chat on WhatsApp for inspection dates, prices and payment plans today.">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta property="og:title" content="x"><link rel="canonical" href="/">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1"></script></head>
<body><h1>Own land in Lekki</h1><a href="https://wa.me/2349110172901?text=Hi">Chat</a><a href="tel:+2349110172901">Call</a>
<form><input name="n"><input name="p"></form><p>See our testimonials and case studies.</p><img src="a.jpg" alt="Estate gate"></body></html>`;
let r = analyzeHtml(good, facts);
assert.ok(r.score >= 90, `good page score ${r.score}`);
assert.equal(r.topFixes.length <= 5, true);

const bad = `<html><body><h1>A</h1><h1>B</h1><img src="a.jpg"></body></html>`;
r = analyzeHtml(bad, { ...facts, finalUrl: "http://x.com/", ms: 4000, bytes: 900_000 });
assert.ok(r.score < 25, `bad page score ${r.score}`);
assert.equal(r.checks.find((c) => c.id === "whatsapp")!.status, "fail");
assert.equal(r.checks.find((c) => c.id === "https")!.status, "fail");
assert.equal(r.checks.find((c) => c.id === "h1")!.status, "warn");
assert.ok(r.topFixes[0].weight >= r.topFixes[r.topFixes.length - 1].weight);
assert.equal(analyzeHtml("", facts).facts.title, null, "empty html does not throw");
assert.equal(analyzeHtml(good.replace("wa.me", "example.org"), facts).checks.find((c) => c.id === "whatsapp")!.status, "fail");
assert.ok(r.score >= 0 && r.score <= 100);

(async () => {
  // safeFetch needs "server-only" stubbed outside Next
  const Module = await import("node:module");
  const orig = (Module as any).default._load;
  (Module as any).default._load = function (req: string, ...rest: unknown[]) { return req === "server-only" ? {} : orig.call(this, req, ...rest); };
  const { isBlockedIp, normalizeUrl, fetchPage } = await import("./safeFetch");

  for (const ip of ["127.0.0.1", "10.0.0.5", "192.168.1.1", "172.16.0.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fe80::1", "fd00::1", "::ffff:10.0.0.1"]) assert.equal(isBlockedIp(ip), true, ip);
  for (const ip of ["8.8.8.8", "1.1.1.1", "172.32.0.1", "2606:4700:4700::1111"]) assert.equal(isBlockedIp(ip), false, ip);

  assert.equal(normalizeUrl("yourbusiness.com.ng").ok, true);
  for (const bad of ["", "localhost", "http://127.0.0.1", "ftp://x.com", "https://user:pw@x.com", "https://x.com:8080", "http://[::1]/", "intranet", "foo.internal", "javascript:alert(1)"]) assert.equal(normalizeUrl(bad).ok, false, bad);

  // loopback is refused by default, even when it is a real listening server
  const srv = http.createServer((req, res) => {
    if (req.url === "/r") { res.writeHead(302, { location: "http://169.254.169.254/latest" }); return res.end(); }
    if (req.url === "/json") { res.writeHead(200, { "content-type": "application/json" }); return res.end("{}"); }
    res.writeHead(200, { "content-type": "text/html" }); res.end(good);
  }).listen(0);
  const port = (srv.address() as any).port;
  const u = new URL(`http://localhost:${port}/`);
  await assert.rejects(fetchPage(u), /Blocked|EBLOCKED/, "loopback must be blocked");
  const ok = await fetchPage(u, { allowPrivate: true });
  assert.equal(ok.status, 200);
  assert.ok(ok.html.includes("Own land in Lekki"));
  await assert.rejects(fetchPage(new URL(`http://localhost:${port}/json`), { allowPrivate: true }), /Not a web page/);
  await assert.rejects(fetchPage(new URL(`http://localhost:${port}/r`), { allowPrivate: true }), /Enter a public|Use your website/, "redirect to metadata IP re-validated");
  srv.close();
  console.log("siteCheck + safeFetch tests passed");
})().catch((e) => { console.error(e); process.exit(1); });
