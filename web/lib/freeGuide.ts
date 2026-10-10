import "server-only";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const PDF_NAME = "The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf";
const PDF_PATH = path.join(process.cwd(), "private", PDF_NAME);
const MONDAY_API = "https://api.monday.com/v2";
const RESEND_API = "https://api.resend.com/emails";

export interface FreeGuideLead {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    business: string;
    budget: string;
    problem: string;
    description: string;
    social: string;
    website: string;
    submittedAt: string;
}

const columns = {
    firstName: "text_mm7zrfyv",
    email: "lead_email",
    phone: "lead_phone",
    business: "lead_company",
    budget: "dropdown_mm7z83wy",
    description: "long_text_mm7zmnkr",
    problem: "long_text_mm7zg9a8",
    social: "text_mm7z9j73",
    website: "link_mm7zj6by",
    consent: "boolean_mm7z3fa7",
    submitted: "date__1",
    source: "color_mkyb8krc",
    status: "lead_status",
    owner: "lead_owner",
};

const phoneCountries: [string, string][] = [
    ["+234", "NG"], ["+233", "GH"], ["+254", "KE"], ["+27", "ZA"],
    ["+44", "GB"], ["+971", "AE"], ["+1", "US"],
];

export async function freeGuideReadiness(): Promise<"ready" | "configuration" | "pdf"> {
    const required = ["MONDAY_API_TOKEN", "RESEND_API_KEY", "FROM_EMAIL"];
    if (required.some((key) => !process.env[key])) return "configuration";
    try {
        await access(PDF_PATH);
        return "ready";
    } catch {
        return "pdf";
    }
}

function mondayConfig() {
    return {
        apiVersion: process.env.MONDAY_API_VERSION || "2026-07",
        boardId: process.env.MONDAY_BOARD_ID || "5105685497",
        groupId: process.env.MONDAY_GROUP_ID || "topics",
        ownerId: process.env.MONDAY_OWNER_USER_ID || "118911616",
    };
}

async function mondayRequest<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await fetch(MONDAY_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: process.env.MONDAY_API_TOKEN || "",
            "API-Version": mondayConfig().apiVersion,
        },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(8000),
    });
    const payload = await response.json().catch(() => ({})) as {
        data?: T;
        errors?: unknown[];
        error_message?: string;
    };
    if (!response.ok || payload.errors || payload.error_message || !payload.data) {
        throw new Error(`Monday request failed (${response.status})`);
    }
    return payload.data;
}

function normalizedPhone(raw: string): { phone: string; countryShortName: string } | null {
    let phone = raw.replace(/[^\d+]/g, "");
    if (phone.startsWith("00")) phone = `+${phone.slice(2)}`;
    if (phone.startsWith("0")) phone = `+234${phone.slice(1)}`;
    else if (!phone.startsWith("+")) phone = `+${phone}`;
    const country = phoneCountries.find(([prefix]) => phone.startsWith(prefix));
    return country ? { phone, countryShortName: country[1] } : null;
}

function columnValues(lead: FreeGuideLead): Record<string, unknown> {
    const now = new Date().toISOString();
    const phone = normalizedPhone(lead.phone);
    const values: Record<string, unknown> = {
        [columns.firstName]: lead.firstName,
        [columns.email]: { email: lead.email, text: lead.email },
        [columns.business]: lead.business,
        [columns.budget]: { labels: [lead.budget] },
        [columns.description]: { text: lead.description },
        [columns.problem]: { text: lead.problem },
        [columns.consent]: { checked: "true" },
        [columns.submitted]: { date: now.slice(0, 10), time: now.slice(11, 19) },
        [columns.source]: { label: "Ebook landing page" },
        [columns.status]: { label: "New Lead" },
    };
    if (phone) values[columns.phone] = phone;
    if (lead.social) values[columns.social] = lead.social;
    if (lead.website) values[columns.website] = { url: lead.website, text: lead.website };
    const ownerId = Number(mondayConfig().ownerId);
    if (Number.isFinite(ownerId) && ownerId > 0) {
        values[columns.owner] = { personsAndTeams: [{ id: ownerId, kind: "person" }] };
    }
    return values;
}

const FIND_LEAD = `query ($board: ID!, $column: String!, $email: String!) {
  items_page_by_column_values(board_id: $board, columns: [{column_id: $column, column_values: [$email]}], limit: 1) { items { id } }
}`;
const CREATE_LEAD = `mutation ($board: ID!, $group: String, $name: String!, $values: JSON!) {
  create_item(board_id: $board, group_id: $group, item_name: $name, column_values: $values, create_labels_if_missing: true) { id }
}`;
const UPDATE_LEAD = `mutation ($board: ID!, $item: ID!, $values: JSON!) {
  change_multiple_column_values(board_id: $board, item_id: $item, column_values: $values, create_labels_if_missing: true) { id }
}`;
const ADD_NOTE = `mutation ($item: ID!, $body: String!) { create_update(item_id: $item, body: $body) { id } }`;

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character] || character);
}

export async function saveFreeGuideLead(lead: FreeGuideLead): Promise<void> {
    const config = mondayConfig();
    type FindResult = { items_page_by_column_values: { items: { id: string }[] } };
    let existingId: string | null = null;
    try {
        const found = await mondayRequest<FindResult>(FIND_LEAD, {
            board: config.boardId, column: columns.email, email: lead.email,
        });
        existingId = found.items_page_by_column_values.items[0]?.id || null;
    } catch (error) {
        console.error("Monday lookup failed; creating a new guide lead:", error);
    }

    const values = columnValues(lead);
    const wasExisting = Boolean(existingId);
    if (existingId) {
        delete values[columns.status];
        delete values[columns.owner];
    }
    const name = `${lead.firstName} ${lead.surname}`.trim();
    if (existingId) {
        await mondayRequest(UPDATE_LEAD, {
            board: config.boardId, item: existingId, values: JSON.stringify(values),
        });
    } else {
        const created = await mondayRequest<{ create_item: { id: string } }>(CREATE_LEAD, {
            board: config.boardId, group: config.groupId, name, values: JSON.stringify(values),
        });
        existingId = created.create_item.id;
    }

    const note = [
        `<b>${wasExisting ? "Guide request" : "New ebook lead"}</b>`,
        `Name: ${name}`, `Problem to solve: ${lead.problem}`, `Email: ${lead.email}`,
        `Phone / WhatsApp: ${lead.phone}`, `Business: ${lead.business}`, `Budget: ${lead.budget}`,
        `About: ${lead.description}`, `Social: ${lead.social || "-"}`, `Website: ${lead.website || "-"}`,
        "Consent: yes", `Submitted: ${lead.submittedAt}`,
    ].map(escapeHtml).join("<br>");
    await mondayRequest(ADD_NOTE, { item: existingId, body: note }).catch((error) => {
        console.error("Monday note failed:", error);
    });
}

async function sendResend(payload: Record<string, unknown>): Promise<void> {
    const response = await fetch(RESEND_API, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Resend request failed (${response.status})`);
}

export async function sendFreeGuide(lead: FreeGuideLead): Promise<void> {
    const pdf = await readFile(PDF_PATH);
    const firstName = escapeHtml(lead.firstName);
    const text = `Hi ${lead.firstName},\n\nThank you for requesting The Nigerian Business Guide to Agentic AI Automation. Your copy is attached as a PDF.\n\nStart here:\n1. Take the 7 Principles Readiness Scorecard.\n2. Pick the one process that costs you the most leads or time.\n3. Follow the 30-day roadmap.\n\nNot sure which WhatsApp conversation is costing you the most sales? Reply to this email and tell me about it.\n\nMuheeb Sulaiman\nAI Growth Architect, Correct Marketer NG\nmuheebsulaiman.com`;
    await sendResend({
        from: `Muheeb Sulaiman <${process.env.FROM_EMAIL}>`,
        to: [lead.email],
        subject: "Your free guide: The Nigerian Business Guide to Agentic AI Automation",
        reply_to: process.env.REPLY_TO_EMAIL || undefined,
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#17171B;line-height:1.6"><div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div><div style="padding:26px"><p>Hi ${firstName},</p><p>Thank you for requesting <b>The Nigerian Business Guide to Agentic AI Automation</b>. Your copy is attached to this email as a PDF.</p><p><b>Start here:</b></p><ol><li>Take the 7 Principles Readiness Scorecard to see where you stand.</li><li>Pick the one process that costs you the most leads or time.</li><li>Follow the 30-day roadmap to launch one narrow, working system.</li></ol><p>Not sure which WhatsApp conversation is costing you the most sales? Just reply to this email and tell me about it.</p><p>Muheeb Sulaiman<br>AI Growth Architect, Correct Marketer NG<br>muheebsulaiman.com</p></div></div>`,
        text,
        attachments: [{ filename: PDF_NAME, content: pdf.toString("base64") }],
    });
}

export async function sendFreeGuideOwnerAlert(lead: FreeGuideLead, reason: string): Promise<void> {
    if (!process.env.NOTIFY_EMAIL) return;
    await sendResend({
        from: `Muheeb Sulaiman <${process.env.FROM_EMAIL}>`,
        to: [process.env.NOTIFY_EMAIL],
        subject: `[Action needed] Guide lead not saved to monday.com: ${lead.email}`,
        text: `The guide was emailed, but saving to monday.com failed.\nReason: ${reason}\n\n${JSON.stringify(lead, null, 2)}`,
    });
}