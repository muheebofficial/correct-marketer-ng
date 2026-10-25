import { NextRequest, NextResponse } from "next/server";
import {
  sendFreeGuide,
  sendFreeGuideOwnerAlert,
  type FreeGuideLead,
} from "@/lib/freeGuide";
import { randomUUID } from "node:crypto";
import { formatLagosTimestamp, submitLeadToSheet, type EbookLeadSheetRow } from "@/lib/lead-sink";

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

function toE164(raw: string): string | undefined {
  let phone = raw.replace(/[^\d+]/g, "");
  if (!phone) return undefined;
  if (phone.startsWith("00")) phone = `+${phone.slice(2)}`;
  if (phone.startsWith("0")) phone = `+234${phone.slice(1)}`;
  else if (!phone.startsWith("+")) phone = `+${phone}`;
  return ["+234", "+233", "+254", "+27", "+44", "+971", "+1"].some((prefix) => phone.startsWith(prefix))
    ? phone
    : undefined;
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
    consent: data.consent === true,
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

  const sheetLead: EbookLeadSheetRow = {
    "Lead ID": randomUUID(),
    Name: `${lead.firstName} ${lead.surname}`.trim(),
    "First name": lead.firstName,
    Company: lead.business,
    Email: lead.email,
    ...(toE164(lead.phone) ? { Phone: toE164(lead.phone) } : {}),
    "Lead Source": "Ebook landing page",
    Status: "New Lead",
    "Last interaction": formatLagosTimestamp(),
    Owner: "Muheeb Sulaiman",
    "Monthly budget": lead.budget,
    "Problem to solve": lead.problem,
    "About the business": lead.description,
    "Social handle": lead.social,
    Website: lead.website,
    "Consent to contact": lead.consent,
  };
  const [sheet, mail] = await Promise.allSettled([
    submitLeadToSheet("ebook_leads", sheetLead),
    // Web free-guide form: deliver the existing ebook email with its PDF attachment.
    sendFreeGuide(lead),
  ]);

  const saved = sheet.status === "fulfilled" && sheet.value.ok;
  if (!saved) {
    await sendFreeGuideOwnerAlert(lead, "Sheet submission failed after retry").catch((error) => {
      console.error("Owner alert failed:", error);
    });
  }
  if (mail.status === "rejected") {
    console.error("Guide email failed:", mail.reason);
  }
  return NextResponse.json({ ok: true, emailed: mail.status === "fulfilled", saved });
}