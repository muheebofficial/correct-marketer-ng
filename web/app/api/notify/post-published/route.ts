import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyPost } from "@/lib/notify-post";

export const runtime = "nodejs";

function secretsMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes);
}

export async function POST(request: Request) {
  if (!secretsMatch(request.headers.get("x-notify-secret"), process.env.NOTIFY_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (
    typeof body !== "object" ||
    body === null ||
    !("slug" in body) ||
    typeof body.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)
  ) {
    return NextResponse.json({ error: "A valid slug is required" }, { status: 400 });
  }

  const status = await notifyPost(body.slug);
  return NextResponse.json({ status });
}