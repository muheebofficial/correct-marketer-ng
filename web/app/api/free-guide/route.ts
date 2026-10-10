import { NextRequest, NextResponse } from "next/server";
import {
  freeGuideReadiness,
  saveFreeGuideLead,
  sendFreeGuide,
  sendFreeGuideOwnerAlert,
  type FreeGuideLead,
} from "@/lib/freeGuide";

export const runtime = "nodejs";

const budgetOptions = new Set([
  "Under ₦100,000",
  "₦100,000 – ₦300,000",
  "₦300,000 – ₦750,000",
  "₦750,000 – ₦2,000,000",
  "Above ₦2,000,000",
]);

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

function stringField(body: Record<string, unknown>, key: string, maxLength: number): string {
  return typeof body[key] === "string" ? body[key].trim().slice(0, maxLength) : "";
}

function parseLead(body: unknown): FreeGuideLead | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const data = body as Record<string, unknown>;
  const lead: FreeGuideLead = {
    firstName: stringField(data, "firstName", 100),
    surname: stringField(data, "surname", 100),
    email: stringField(data, "email", 254).toLowerCase(),
    phone: stringField(data, "phone", 40),
    business: stringField(data, "business", 200),
    budget: stringField(data, "budget", 80),
    problem: stringField(data, "problem", 300),
    description: stringField(data, "description", 2000),
    social: stringField(data, "social", 100),
    website: stringField(data, "website", 500),
    submittedAt: new Date().toISOString(),
  };
  if (
    !lead.firstName || !lead.surname || !lead.phone || !lead.business ||
    !lead.problem || !lead.description || !budgetOptions.has(lead.budget) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || data.consent !== true
  ) return null;
  if (lead.website) {
    try {
      const website = new URL(lead.website);
      if (website.protocol !== "http:" && website.protocol !== "https:") return null;
    } catch {
      return null;
    }
  }
  return lead;
}

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = await req.text();
  if (raw.length > 20_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const readiness = await freeGuideReadiness();
  if (readiness !== "ready") {
    console.error(`Free guide delivery is unavailable: ${readiness}`);
    return NextResponse.json({ error: "Guide delivery is not configured" }, { status: 503 });
  }

  const [crm, mail] = await Promise.allSettled([
    saveFreeGuideLead(lead),
    sendFreeGuide(lead),
  ]);

  if (crm.status === "rejected") {
    console.error("monday.com failed:", crm.reason);
    await sendFreeGuideOwnerAlert(lead, "Lead save failed").catch((error) => {
      console.error("Owner alert failed:", error);
    });
  }
  if (mail.status === "rejected") {
    console.error("Guide email failed:", mail.reason);
    return NextResponse.json({ error: "email_failed", saved: crm.status === "fulfilled" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed: true, saved: crm.status === "fulfilled" });
}