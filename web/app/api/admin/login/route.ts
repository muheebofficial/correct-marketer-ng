import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, isAdminLoginAttemptValid } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => ({}));
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");

    if (!isAdminLoginAttemptValid(username, password)) {
        return NextResponse.json({ detail: "Invalid username or password." }, { status: 401 });
    }

    createAdminSession(username);
    return NextResponse.json({ ok: true });
}
