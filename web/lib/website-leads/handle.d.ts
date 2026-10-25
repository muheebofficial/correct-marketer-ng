import type { LeadSheet, WebsiteLeadSheetRow } from "../lead-sink";

export function handleSubscribe(args: {
    body: unknown;
    ip: string;
    submitLeadToSheet: (sheet: LeadSheet, lead: WebsiteLeadSheetRow) => Promise<{ ok: boolean }>;
}): Promise<{ status: number; json: unknown }>;