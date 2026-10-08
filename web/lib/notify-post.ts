import "server-only";

import { revalidatePath } from "next/cache";
import { site } from "@/lib/site";

type PostRecord = {
  slug: string;
  title?: string;
  excerpt?: string;
  description?: string;
  publishedAt?: string;
  published?: string;
  coverImage?: string;
  cover_image?: string;
};

type ClaimResponse = { post: PostRecord | null };
type NotificationState = "sent" | "pending";
type NotifyResult = "sent" | "skipped" | "failed";

const apiUrl = process.env.API_URL;
const apiSecret = process.env.API_SHARED_SECRET;
const siteUrl = (process.env.SITE_URL || site.url).replace(/\/$/, "");

async function updateNotification(slug: string, state: NotificationState): Promise<void> {
  if (!apiUrl || !apiSecret) return;
  const response = await fetch(`${apiUrl}/v1/notifications/posts/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Secret": apiSecret,
    },
    body: JSON.stringify({ state }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`Could not set notification state for ${slug}: ${response.status}`);
  }
}

const pause = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export async function notifyPost(slug: string): Promise<NotifyResult> {
  if (!apiUrl || !apiSecret) {
    console.error("Post notifications require API_URL and API_SHARED_SECRET.");
    return "failed";
  }

  let claimed = false;
  try {
    const claimResponse = await fetch(`${apiUrl}/v1/notifications/posts/${slug}/claim`, {
      method: "POST",
      headers: { "X-Api-Secret": apiSecret },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!claimResponse.ok) {
      throw new Error(`Could not claim ${slug}: ${claimResponse.status}`);
    }
    const { post } = (await claimResponse.json()) as ClaimResponse;
    if (!post) return "skipped";
    claimed = true;

    const publishedAt = post.publishedAt ?? post.published;
    if (publishedAt && Number.isFinite(Date.parse(publishedAt)) && Date.parse(publishedAt) > Date.now()) {
      await updateNotification(slug, "pending");
      return "skipped";
    }

    revalidatePath("/insights");
    revalidatePath(`/insights/${slug}`);
    const postUrl = `${siteUrl}/insights/${encodeURIComponent(slug)}`;
    let postIsLive = false;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(postUrl, {
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });
        if (response.status === 200) {
          postIsLive = true;
          break;
        }
      } catch (error) {
        if (attempt === 2) console.warn(`Post URL check failed for ${slug}:`, error);
      }
      if (attempt < 2) await pause(2000);
    }
    if (!postIsLive) {
      await updateNotification(slug, "pending");
      return "skipped";
    }

    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    const restApiKey = process.env.ONESIGNAL_REST_API_KEY;
    if (!appId || !restApiKey) {
      throw new Error("OneSignal app ID or REST API key is not configured.");
    }

    const title = post.title?.trim();
    if (!title) throw new Error(`Post ${slug} has no title.`);
    const excerpt = (post.excerpt ?? post.description ?? title).trim().slice(0, 120);
    const coverImage = post.coverImage ?? post.cover_image;
    const payload: Record<string, unknown> = {
      app_id: appId,
      target_channel: "push",
      included_segments: ["Subscribed Users"],
      headings: { en: title },
      contents: { en: excerpt },
      url: postUrl,
    };
    if (coverImage) payload.chrome_web_image = new URL(coverImage, `${siteUrl}/`).toString();

    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        Authorization: `Key ${restApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      throw new Error(`OneSignal rejected ${slug}: ${response.status} ${await response.text()}`);
    }

    await updateNotification(slug, "sent");
    return "sent";
  } catch (error) {
    console.error(`Notification failed for ${slug}:`, error);
    if (claimed) {
      try {
        await updateNotification(slug, "pending");
      } catch (releaseError) {
        console.error(`Could not release notification claim for ${slug}:`, releaseError);
      }
    }
    return "failed";
  }
}