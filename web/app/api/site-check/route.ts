import { NextRequest, NextResponse } from "next/server";
import { fetchPage, normalizeUrl } from "@/lib/tools/safeFetch";
import { analyzeHtml } from "@/lib/tools/siteCheck";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 20;

// Best-effort limiter: per server instance, so it slows abuse but is not a hard global cap.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 8;
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return host === new URL(site.url).host || host === `www.${new URL(site.url).host}` || host.startsWith("localhost") || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

const messages: Record<string, string> = {
  ENOTFOUND: "We could not find that website. Check the spelling.",
  EAI_AGAIN: "We could not find that website. Check the spelling.",
  ETIMEDOUT: "The website took too long to respond.",
  ECONNREFUSED: "The website refused the connection.",
  ECONNRESET: "The website closed the connection.",
  EBLOCKED: "We can only check public websites.",
  ENOTHTML: "That address did not return a web page.",
  EREDIRECTS: "That address redirects too many times.",
  EBADREDIRECT: "That address redirects somewhere we cannot check.",
};

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many checks. Please try again in a few minutes." }, { status: 429 });

  const raw = await req.text();
  if (raw.length > 2000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
  let url = "";
  try { url = String(JSON.parse(raw).url ?? ""); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const n = normalizeUrl(url);
  if (!n.ok) return NextResponse.json({ error: n.error }, { status: 400 });

  try {
    const page = await fetchPage(n.url);
    if (page.status >= 400) return NextResponse.json({ error: `The website answered with an error (${page.status}).` }, { status: 422 });
    return NextResponse.json({ result: analyzeHtml(page.html, page) }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    const code = (e as { code?: string }).code ?? "";
    return NextResponse.json({ error: messages[code] ?? "We could not check that website. Try again or send us the address on WhatsApp." }, { status: 422 });
  }
}
