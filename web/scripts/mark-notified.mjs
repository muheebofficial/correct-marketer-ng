import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const apiUrl = process.env.API_URL;
const apiSecret = process.env.API_SHARED_SECRET;

if (!apiUrl || !apiSecret) {
  console.error("API_URL and API_SHARED_SECRET are required.");
  process.exit(1);
}

const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/notifications/posts/mark-notified`, {
  method: "POST",
  headers: { "X-Api-Secret": apiSecret },
});
const result = await response.json();
if (!response.ok || typeof result.updated !== "number") {
  console.error(`Could not mark existing posts as notified (${response.status}):`, result);
  process.exit(1);
}
console.log(`Marked ${result.updated} published posts as already notified.`);