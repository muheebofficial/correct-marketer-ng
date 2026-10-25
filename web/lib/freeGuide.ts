import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PDF_NAME = "The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf";
const PDF_PATH = path.join(process.cwd(), "private", PDF_NAME);
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
    consent: boolean;
    submittedAt: string;
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character] || character);
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
    const text = `Hi ${lead.firstName},\n\nThank you for requesting The Nigerian Business Guide to Agentic AI Automation. Your copy is attached as a PDF.\n\nStart here:\n1. Take the 7 Principles Readiness Scorecard.\n2. Pick the one process that costs you the most leads or time.\n3. Follow the 30-day roadmap.\n\nNot sure which WhatsApp conversation is costing you the most sales? Reply to this email and tell me about it.\n\nMuheeb Sulaiman\nAI Growth Architect, Correct Marketer NG\ncorrectmarketer.com.ng`;
    // Free-guide form: deliver the existing ebook email with its PDF attachment.
    await sendResend({
        from: `Muheeb Sulaiman <${process.env.FROM_EMAIL}>`,
        to: [lead.email],
        subject: "Your free guide: The Nigerian Business Guide to Agentic AI Automation",
        reply_to: process.env.REPLY_TO_EMAIL || undefined,
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#17171B;line-height:1.6"><div style="background:#0B4D2C;padding:22px 26px;border-bottom:4px solid #C8850A"><span style="color:#F0B646;font-weight:700;letter-spacing:1px;font-size:13px">CORRECT MARKETER NG</span></div><div style="padding:26px"><p>Hi ${firstName},</p><p>Thank you for requesting <b>The Nigerian Business Guide to Agentic AI Automation</b>. Your copy is attached to this email as a PDF.</p><p><b>Start here:</b></p><ol><li>Take the 7 Principles Readiness Scorecard to see where you stand.</li><li>Pick the one process that costs you the most leads or time.</li><li>Follow the 30-day roadmap to launch one narrow, working system.</li></ol><p>Not sure which WhatsApp conversation is costing you the most sales? Just reply to this email and tell me about it.</p><p>Muheeb Sulaiman<br>AI Growth Architect, Correct Marketer NG<br>correctmarketer.com.ng</p></div></div>`,
        text,
        attachments: [{ filename: PDF_NAME, content: pdf.toString("base64") }],
    });
}

export async function sendFreeGuideOwnerAlert(lead: FreeGuideLead, reason: string): Promise<void> {
    if (!process.env.NOTIFY_EMAIL) throw new Error("NOTIFY_EMAIL is not configured");
    // Web free-guide form: alert the owner that a sheet write failed.
    await sendResend({
        from: `Muheeb Sulaiman <${process.env.FROM_EMAIL}>`,
        to: [process.env.NOTIFY_EMAIL],
        subject: "Lead not saved to sheet",
        text: `An ebook lead could not be saved to Google Sheets.\nReason: ${reason}\n\n${JSON.stringify(lead, null, 2)}`,
    });
}