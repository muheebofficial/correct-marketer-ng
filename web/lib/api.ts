import "server-only";

/**
 * Content comes from two places and is merged by slug:
 *   1. Defaults shipped in /lib/content (always available, so the site works without the API).
 *   2. Published documents from the Python API / Astra DB. These override defaults with the same
 *      slug and add new ones. That is how the team manages content without touching source code.
 */
const API_URL = process.env.API_URL;
const SECRET = process.env.API_SHARED_SECRET || "";

async function fetchRemote<T extends { slug: string }>(collection: string): Promise<T[]> {
  if (!API_URL) return [];
  if (!SECRET) {
    console.warn("API_SHARED_SECRET is not set; skipping content sync for collection:", collection);
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/v1/content/${collection}`, {
      headers: { "X-Api-Secret": SECRET },
      next: { revalidate: 300, tags: [`content:${collection}`] },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: T[] };
    return data.items ?? [];
  } catch (error) {
    console.warn(`Failed to fetch remote content for ${collection}:`, error);
    return [];
  }
}

export async function getCollection<T extends { slug: string }>(collection: string, defaults: T[]): Promise<T[]> {
  const remote = await fetchRemote<T>(collection);
  const bySlug = new Map<string, T>(defaults.map((d) => [d.slug, d]));
  remote.forEach((r) => bySlug.set(r.slug, { ...(bySlug.get(r.slug) ?? {}), ...r } as T));
  return Array.from(bySlug.values());
}

/** Forward a form submission to the Python API. Used only by our own route handlers. */
export async function postToApi(path: string, body: unknown, clientIp: string): Promise<Response> {
  if (!API_URL) {
    return new Response(JSON.stringify({ detail: "Form service is not configured." }), { status: 503 });
  }
  if (!SECRET) {
    return new Response(JSON.stringify({ detail: "API_SHARED_SECRET is not configured." }), { status: 503 });
  }

  try {
    return await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Secret": SECRET, "X-Client-IP": clientIp },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (error) {
    console.error(`Failed to call API path ${path}:`, error);
    return new Response(JSON.stringify({ detail: "Form service is temporarily unavailable." }), { status: 503 });
  }
}
