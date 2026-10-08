import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const [slug] = process.argv.slice(2);
const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const secret = process.env.NOTIFY_SECRET;

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run notify -- <slug>");
  process.exit(1);
}
if (!secret) {
  console.error("NOTIFY_SECRET is required.");
  process.exit(1);
}

const response = await fetch(`${siteUrl}/api/notify/post-published`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-notify-secret": secret },
  body: JSON.stringify({ slug }),
});
const result = await response.json();
if (!response.ok) {
  console.error(`Notification request failed (${response.status}):`, result);
  process.exit(1);
}
console.log(`Notification for ${slug}: ${result.status}`);