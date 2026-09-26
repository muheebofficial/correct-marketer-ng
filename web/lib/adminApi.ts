import "server-only";

const API_URL = process.env.API_URL;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || process.env.API_ADMIN_KEY || "";

export async function proxyAdminApi(path: string, init: RequestInit = {}): Promise<Response> {
    if (!API_URL) {
        return new Response(JSON.stringify({ detail: "API_URL is not configured." }), {
            status: 503,
            headers: { "content-type": "application/json" },
        });
    }

    if (!ADMIN_API_KEY) {
        return new Response(JSON.stringify({ detail: "ADMIN_API_KEY is not configured." }), {
            status: 503,
            headers: { "content-type": "application/json" },
        });
    }

    const headers = new Headers(init.headers);
    headers.set("X-Admin-Key", ADMIN_API_KEY);
    if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_URL}${path}`, {
        ...init,
        headers,
        cache: "no-store",
    });
}
