import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/adminAuth";
import { proxyAdminApi } from "@/lib/adminApi";

export async function GET() {
    if (!isAdminSessionValid()) {
        return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
