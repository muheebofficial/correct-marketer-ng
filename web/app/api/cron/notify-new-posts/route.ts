import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyPost } from "@/lib/notify-post";

export const runtime = "nodejs";

type PendingPostsResponse = { items: { slug: string }[] };

function secretsMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes);
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || !secretsMatch(request.headers.get("authorization"), `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiUrl = process.env.API_URL;
  const apiSecret = process.env.API_SHARED_SECRET;
  if (!apiUrl || !apiSecret) {
    return NextResponse.json({ error: "Content API is not configured" }, { status: 503 });
  }

  try {
    const response = await fetch(`${apiUrl}/v1/notifications/posts`, {
      headers: { "X-Api-Secret": apiSecret },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Could not list pending posts" }, { status: 502 });
    }

    const { items } = (await response.json()) as PendingPostsResponse;
    const results: { slug: string; status: "sent" | "skipped" | "failed" }[] = [];
    for (const post of items) {
      try {
        results.push({ slug: post.slug, status: await notifyPost(post.slug) });
      } catch (error) {
        console.error(`Cron notification failed for ${post.slug}:`, error);
        results.push({ slug: post.slug, status: "failed" });
      }
    }
    return NextResponse.json({ processed: results.length, results });
  } catch (error) {
    console.error("Could not scan for pending post notifications:", error);
    return NextResponse.json({ error: "Could not scan pending posts" }, { status: 502 });
  }
}