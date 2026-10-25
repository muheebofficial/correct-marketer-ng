// @ts-ignore -- plain JavaScript module (no type declarations needed)
import * as mod from "../../../lib/website-leads/handle.js";
import { submitLeadToSheet } from "@/lib/lead-sink";

type Handler = (a: { body: unknown; ip: string; submitLeadToSheet: typeof submitLeadToSheet }) => Promise<{ status: number; json: unknown }>;
const m = mod as unknown as { default?: { handleSubscribe?: Handler }; handleSubscribe?: Handler };
const handleSubscribe = (m.default && m.default.handleSubscribe ? m.default.handleSubscribe : m.handleSubscribe) as Handler;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    let body: unknown = {};
    try {
        body = await request.json();
    } catch {
        body = {};
    }
    const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const r = await handleSubscribe({ body, ip, submitLeadToSheet });
    return Response.json(r.json, { status: r.status });
}

export async function GET() {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
}
