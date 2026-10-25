import "server-only";

export type WebsiteLeadSheetRow = {
    "Lead ID": string;
    Name: string;
    "First name"?: string;
    "Last name"?: string;
    Email?: string;
    Phone?: string;
    "Form source"?: string;
    Page?: string;
    Submitted?: string;
    "Lead status"?: string;
    Consent?: boolean;
    Owner?: string;
    Business?: string;
    Website?: string;
    "Business type"?: string;
    Challenge?: string;
    Budget?: string;
    "Preferred contact"?: string;
    Message?: string;
    Attribution?: string;
};

export type EbookLeadSheetRow = {
    "Lead ID": string;
    Name: string;
    "First name"?: string;
    Company?: string;
    Title?: string;
    Email?: string;
    Phone?: string;
    "Lead Source"?: string;
    Status?: string;
    "Last interaction"?: string;
    Owner?: string;
    "Monthly budget"?: string;
    "Problem to solve"?: string;
    "About the business"?: string;
    "Social handle"?: string;
    Website?: string;
    "Consent to contact"?: boolean;
};

export type LeadSheet = "website_leads" | "ebook_leads";

function readWebhookSecret(): string | undefined {
    const envName = Object.keys(process.env).find(
        (key) => key.replaceAll("_", "") === "GOOGLESHEETSWEBHOOKSECRET",
    );
    return envName ? process.env[envName] : undefined;
}

export function formatLagosTimestamp(date = new Date()): string {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
}

type Attempt = { ok: boolean; retry: boolean; reason: string };

async function postLead(url: string, secret: string, sheet: LeadSheet, lead: WebsiteLeadSheetRow | EbookLeadSheetRow): Promise<Attempt> {
    let response: Response;
    try {
        response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ secret, sheet, lead }),
            redirect: "follow",
            signal: AbortSignal.timeout(10_000),
        });
    } catch {
        return { ok: false, retry: true, reason: "network_error" };
    }

    if (response.status >= 500) return { ok: false, retry: true, reason: `http_${response.status}` };

    let payload: unknown;
    try {
        payload = JSON.parse(await response.text());
    } catch {
        return { ok: false, retry: true, reason: "non_json" };
    }

    if (!payload || typeof payload !== "object" || !("ok" in payload)) {
        return { ok: false, retry: true, reason: "non_json" };
    }
    if (!response.ok) return { ok: false, retry: false, reason: `http_${response.status}` };
    if ((payload as { ok?: unknown }).ok === true) return { ok: true, retry: false, reason: "saved" };
    return { ok: false, retry: false, reason: "webhook_rejected" };
}

export async function submitLeadToSheet(
    sheet: LeadSheet,
    lead: WebsiteLeadSheetRow | EbookLeadSheetRow,
): Promise<{ ok: boolean }> {
    const leadId = lead["Lead ID"];
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const secret = readWebhookSecret();
    if (!url || !secret) {
        console.error(`[lead-sink] ${sheet} ${leadId} failed missing_env`);
        return { ok: false };
    }

    let attempt = await postLead(url, secret, sheet, lead);
    if (!attempt.ok && attempt.retry) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempt = await postLead(url, secret, sheet, lead);
    }
    console[attempt.ok ? "info" : "error"](`[lead-sink] ${sheet} ${leadId} ${attempt.ok ? "ok" : "failed"} ${attempt.reason}`);
    return { ok: attempt.ok };
}
