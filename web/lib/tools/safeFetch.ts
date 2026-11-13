import "server-only";
import dns from "node:dns";
import http from "node:http";
import https from "node:https";
import net from "node:net";

/** True for addresses a public website visitor should never make our server reach. */
export function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) || // CGNAT
      (a === 169 && b === 254) || // link-local, cloud metadata
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) || (a === 198 && (b === 18 || b === 19))
    );
  }
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === "::" || v === "::1") return true;
    const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isBlockedIp(mapped[1]);
    return v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb") || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("ff");
  }
  return true;
}

export type NormalizedUrl = { ok: true; url: URL } | { ok: false; error: string };

/** Accepts "example.com" or a full URL. Only plain http(s) on standard ports, no credentials. */
export function normalizeUrl(input: string): NormalizedUrl {
  const raw = input.trim();
  if (!raw || raw.length > 300) return { ok: false, error: "Enter your website address, for example yourbusiness.com.ng." };
  let url: URL;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { ok: false, error: "That does not look like a website address." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false, error: "Only http and https addresses can be checked." };
  if (url.username || url.password) return { ok: false, error: "Remove any username or password from the address." };
  if (url.port && url.port !== "80" && url.port !== "443") return { ok: false, error: "Only standard web ports can be checked." };
  const host = url.hostname.toLowerCase();
  if (net.isIP(host.replace(/^\[|\]$/g, ""))) return { ok: false, error: "Use your website name rather than an IP address." };
  if (!host.includes(".") || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return { ok: false, error: "Enter a public website address." };
  return { ok: true, url };
}

export type FetchedPage = { html: string; finalUrl: string; status: number; ms: number; bytes: number; truncated: boolean; redirects: number };

type Opts = { allowPrivate?: boolean; timeoutMs?: number; maxBytes?: number; maxRedirects?: number };

/** DNS lookup that refuses private targets at connect time, so DNS rebinding cannot slip past an earlier check. */
function guardedLookup(allowPrivate: boolean): net.LookupFunction {
  return (hostname, options, callback) => {
    dns.lookup(hostname, { all: true, verbatim: true }, (err, addrs) => {
      if (err) return callback(err, "", 4);
      const ok = addrs.filter((a) => allowPrivate || !isBlockedIp(a.address));
      if (!ok.length) return callback(Object.assign(new Error("Blocked address"), { code: "EBLOCKED" }), "", 4);
      if ((options as { all?: boolean }).all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, ok);
      callback(null, ok[0].address, ok[0].family);
    });
  };
}

function once(url: URL, o: Required<Opts>): Promise<{ status: number; headers: http.IncomingHttpHeaders; html: string; bytes: number; truncated: boolean }> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(
      url,
      { method: "GET", lookup: guardedLookup(o.allowPrivate), timeout: o.timeoutMs, headers: { "user-agent": "CorrectMarketerSiteChecker/1.0 (+https://correctmarketer.com.ng/tools)", accept: "text/html,application/xhtml+xml", "accept-encoding": "identity" } },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400) { res.resume(); return resolve({ status, headers: res.headers, html: "", bytes: 0, truncated: false }); }
        const type = String(res.headers["content-type"] ?? "");
        if (!/text\/html|application\/xhtml/i.test(type)) { res.resume(); return reject(Object.assign(new Error("Not a web page"), { code: "ENOTHTML" })); }
        const chunks: Buffer[] = [];
        let bytes = 0;
        let truncated = false;
        res.on("data", (c: Buffer) => {
          bytes += c.length;
          if (bytes > o.maxBytes) { truncated = true; res.destroy(); return; }
          chunks.push(c);
        });
        const done = () => resolve({ status, headers: res.headers, html: Buffer.concat(chunks).toString("utf8"), bytes, truncated });
        res.on("end", done);
        res.on("close", done);
        res.on("error", reject);
      },
    );
    req.on("timeout", () => req.destroy(Object.assign(new Error("Timed out"), { code: "ETIMEDOUT" })));
    req.on("error", reject);
    req.end();
  });
}

export async function fetchPage(start: URL, opts: Opts = {}): Promise<FetchedPage> {
  const o: Required<Opts> = { allowPrivate: false, timeoutMs: 8000, maxBytes: 1_000_000, maxRedirects: 3, ...opts };
  const t0 = Date.now();
  let url = start;
  for (let hop = 0; hop <= o.maxRedirects; hop++) {
    const r = await once(url, o);
    if (r.status >= 300 && r.status < 400 && r.headers.location) {
      const next = normalizeUrl(new URL(String(r.headers.location), url).toString());
      if (!next.ok) throw Object.assign(new Error(next.error), { code: "EBADREDIRECT" });
      url = next.url;
      continue;
    }
    return { html: r.html, finalUrl: url.toString(), status: r.status, ms: Date.now() - t0, bytes: r.bytes, truncated: r.truncated, redirects: hop };
  }
  throw Object.assign(new Error("Too many redirects"), { code: "EREDIRECTS" });
}
