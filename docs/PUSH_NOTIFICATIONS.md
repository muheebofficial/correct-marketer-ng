# Web Push Notifications

## OneSignal setup

1. Create a OneSignal app and enable the Web platform with the **Custom Code** integration.
2. Set the site URL to the production origin used by the site, including its canonical host (for example, `https://correctmarketer.com.ng`). Web push requires HTTPS and the site URL must match the browser origin.
3. Add the root worker file at `web/public/OneSignalSDKWorker.js`. It must remain publicly available at `/OneSignalSDKWorker.js`; the worker uses the official OneSignal v16 import.
4. Copy the OneSignal App ID and REST API key from **Settings > Keys & IDs**. Create a separate OneSignal app for localhost testing.

The integration initializes once in the root layout, enables OneSignal's subscription bell, and disables automatic permission prompts. Visitors can request push only by clicking **Get notified of new posts** on an Insights index or post page. The site hides that control after the browser permission is denied or the visitor is subscribed.

## Environment variables

Set these in Vercel for the Next.js project:

- `NEXT_PUBLIC_ONESIGNAL_APP_ID`: OneSignal Web App ID.
- `ONESIGNAL_REST_API_KEY`: OneSignal REST API key; server-side only.
- `NOTIFY_SECRET`: long random shared secret used by the Python publish hook and Next.js endpoint.
- `CRON_SECRET`: long random secret for the Vercel cron endpoint.
- `SITE_URL`: canonical site origin, with no trailing slash.

The existing Vercel settings `API_URL` and `API_SHARED_SECRET` are also needed so Next.js can access the Python/Astra notification operations. Set `SITE_URL` and the same `NOTIFY_SECRET` in the Python API environment as well. Do not put secrets in `NEXT_PUBLIC_*` variables. `web/.gitignore` excludes `.env.local`.

## Publish-time flow

The active CMS publishing endpoint is `PUT /v1/admin/content/posts/{slug}` in the Python API. On a new post or a real transition from draft to published, FastAPI queues a best-effort POST to `/api/notify/post-published`; the CMS response does not wait for the network call. Editing a post that is already published does not trigger another notification.

The Node route authenticates `x-notify-secret`, then `lib/notify-post.ts` asks the Python service to atomically claim the Astra post. Only published posts that are not already notified and are not currently sending can be claimed. Future-dated posts are returned to pending. The notifier revalidates `/insights` and `/insights/{slug}`, confirms the post URL returns HTTP 200 (up to three checks, two seconds apart), and sends an English push to the OneSignal **Subscribed Users** segment. The notification opens `/insights/{slug}`. Astra fields support `excerpt` or the current `description`, `publishedAt` or the current `published`, and an optional `coverImage`/`cover_image`.

Delivery success records `notified`, `notifiedAt`, and `notifyState: "sent"`; a failure releases the claim to `pending` and logs the error. The daily cron checks pending published posts as a safety net. It runs at 09:00 UTC. Vercel Pro allows more frequent cron runs; adjust the schedule in `web/vercel.json` if the project plan supports it.

## Existing posts and commands

Before enabling notifications in production, point `API_URL` and `API_SHARED_SECRET` at the production API and run this once to avoid notifying existing content:

```bash
cd web
npm run mark-notified
```

To manually test one post while the Next.js site and Python API are running:

```bash
cd web
npm run notify -- <published-post-slug>
```

The scripts require the environment values from `.env.local` or the shell. The manual notifier uses the same transition-safe claim as the publish hook and cron.

## Test checklist

- Subscribe from an Insights index or article; verify the subscription appears in OneSignal's audience.
- Publish a draft through the CMS and confirm a push arrives within seconds.
- Click the push and confirm it opens the matching `/insights/{slug}` page.
- Edit an already-published post and confirm no second push is sent.
- Set a published post's `publishedAt` (or `published`) to a future time and confirm it is skipped until due; the daily cron will retry it.
- Deny the browser permission and confirm the branded opt-in control is hidden.
- Run the cron route with a valid `Authorization: Bearer <CRON_SECRET>` header and confirm one failed post does not stop other pending posts.
