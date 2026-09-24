import { NextRequest, NextResponse } from "next/server";
import { postToApi } from "@/lib/api";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin form posts from some browsers omit it
  try {
    const host = new URL(origin).host;
    return host === new URL(site.url).host || host.startsWith("localhost");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return NextResponse.json({ detail: "Forbidden." }, { status: 403 });
  const raw = await req.text();
  if (raw.length > 20_000) return NextResponse.json({ detail: "Request too large." }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ detail: "Invalid request." }, { status: 400 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const res = await postToApi("/v1/leads", body, ip);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
