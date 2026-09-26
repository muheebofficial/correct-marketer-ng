import { NextRequest, NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/adminAuth";
import { proxyAdminApi } from "@/lib/adminApi";

export async function GET(_request: NextRequest, { params }: { params: { leadId: string } }) {
    if (!isAdminSessionValid()) {
        return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
    }

    const res = await proxyAdminApi(`/v1/admin/leads/${params.leadId}`);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

export async function PATCH(request: NextRequest, { params }: { params: { leadId: string } }) {
    if (!isAdminSessionValid()) {
        return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const stageBody = typeof body?.stage === "string" ? { stage: body.stage, owner: body.owner || undefined } : body;
    const res = await proxyAdminApi(`/v1/admin/leads/${params.leadId}/stage`, {
        method: "PATCH",
        body: JSON.stringify(stageBody),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
