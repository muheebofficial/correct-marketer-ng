import { NextRequest, NextResponse } from "next/server";
import { access, readdir, stat } from "node:fs/promises";
import path from "node:path";

const PDF_NAME = "The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf";
const PDF_PATH = path.join(process.cwd(), "private", PDF_NAME);
const REQUIRED_ENV = ["MONDAY_API_TOKEN", "RESEND_API_KEY", "FROM_EMAIL"];
const OPTIONAL_ENV = ["REPLY_TO_EMAIL", "NOTIFY_EMAIL"];
const FREE_MAIL = /@(gmail|googlemail|yahoo|outlook|hotmail|live|icloud|proton|protonmail)\./i;

function addCheck(checks: Record<string, { pass: boolean; detail: string }>, name: string, pass: boolean, detail: string) {
    checks[name] = { pass: Boolean(pass), detail };
}

function isFreeMail(value: string | undefined): boolean {
    return Boolean(value && FREE_MAIL.test(value));
}

export async function GET(req: NextRequest) {
    const expected = process.env.HEALTH_TOKEN;
    const provided = req.nextUrl.searchParams.get("token");

    if (!expected || provided !== expected) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const checks: Record<string, { pass: boolean; detail: string }> = {};

    for (const key of REQUIRED_ENV) {
        addCheck(checks, `env ${key}`, Boolean(process.env[key]), process.env[key] ? "set" : "MISSING: add it in Vercel (Production) and redeploy");
    }

    for (const key of OPTIONAL_ENV) {
        addCheck(checks, `env ${key} (optional)`, true, process.env[key] ? "set" : "not set");
    }

    try {
        const stats = await stat(PDF_PATH);
        addCheck(checks, "PDF bundled with the function", true, `${stats.size} bytes`);
    } catch {
        let detail = "private/ folder not found";
        try {
            const files = await readdir(path.join(process.cwd(), "private"));
            detail = `private/ contains: ${files.join(", ") || "(empty)"}`;
        } catch { }
        addCheck(checks, "PDF bundled with the function", false, `Missing ${PDF_NAME}. ${detail}. Add the PDF and keep it in the deployment output.`);
    }

    const from = process.env.FROM_EMAIL || "";
    if (isFreeMail(from)) {
        addCheck(checks, "FROM_EMAIL is on a verified domain", false, `${from} is a free-mail address. Resend only sends from a domain you verified, e.g. guide@yourdomain.com`);
    } else if (process.env.RESEND_API_KEY && from) {
        try {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: `Correct Marketer NG <${from}>`,
                    to: ["delivered@resend.dev"],
                    subject: "Health check",
                    text: "Health check from the guide landing page.",
                }),
                signal: AbortSignal.timeout(8000),
            });
            const body = await response.text();
            addCheck(checks, "Resend accepts mail from FROM_EMAIL", response.ok, response.ok ? "OK" : `Resend ${response.status}: ${body.slice(0, 300)}`);
            if (response.ok && /@resend\.dev$/i.test(from)) {
                addCheck(checks, "Sender is a test address", false, "onboarding@resend.dev only delivers to your own Resend account email. Verify your domain to email visitors");
            }
        } catch (error: any) {
            addCheck(checks, "Resend accepts mail from FROM_EMAIL", false, `Request failed: ${error?.message || String(error)}`);
        }
    }

    if (process.env.MONDAY_API_TOKEN) {
        try {
            const response = await fetch("https://api.monday.com/v2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.MONDAY_API_TOKEN,
                    "API-Version": process.env.MONDAY_API_VERSION || "2026-07",
                },
                body: JSON.stringify({
                    query: "query ($board: [ID!]) { me { name } boards(ids: $board) { name columns { id } } }",
                    variables: { board: [process.env.MONDAY_BOARD_ID || "5105685497"] },
                }),
                signal: AbortSignal.timeout(8000),
            });
            const payload = await response.json().catch(() => ({})) as { data?: { me?: { name?: string }; boards?: Array<{ name?: string; columns?: Array<{ id: string }> }> }; errors?: Array<{ message?: string }> };
            const board = payload.data?.boards?.[0];
            if (payload.errors || !board) {
                addCheck(checks, "monday.com token and board", false, `monday ${response.status}: ${JSON.stringify(payload.errors || payload).slice(0, 300)}`);
            } else {
                addCheck(checks, "monday.com token and board", true, `Connected as ${payload.data?.me?.name || "unknown"}, board "${board.name || "unknown"}"`);
            }
        } catch (error: any) {
            addCheck(checks, "monday.com token and board", false, `Request failed: ${error?.message || String(error)}`);
        }
    }

    const allPass = Object.values(checks).every((check) => check.pass);

    return NextResponse.json({
        allPass,
        node: process.version,
        checks,
    });
}
