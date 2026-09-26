import { NextRequest, NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/adminAuth";
import { proxyAdminApi } from "@/lib/adminApi";

export async function PATCH(request: NextRequest, { params }: { params: { leadId: string } }) {
    if (!isAdminSessionValid()) {
        return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
    }

    const res = await proxyAdminApi(`/v1/admin/leads/${params.leadId}/lost`, {
        method: "PATCH",
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
