# Correct Marketer NG website

**We engineer your growth.** Next.js (App Router, TypeScript, Tailwind) front end, Python (FastAPI) API, Astra DB (DataStax) for leads and CMS content.

```
web/   Next.js site: pages, components, SEO, schema, analytics hooks
api/   FastAPI service: lead capture, newsletter, content CMS, rate limiting, Astra DB storage
```

## How the pieces fit

- Browser -> Next.js route handlers (`/api/lead`, `/api/newsletter`) -> Python API (server to server, shared secret) -> Astra DB.
- The Python API URL and secrets never reach the browser.
- Content ships with sensible defaults in `web/lib/content/`. Documents published in Astra (via the API) override defaults with the same slug and add new ones, so the team can manage posts, case studies, services, industries, FAQs, testimonials, authors and lead magnets without touching source. The site refreshes CMS content every 5 minutes.
- If the API is offline, the site still renders from the defaults; forms show a WhatsApp fallback.

## Run it locally

```bash
# 1. API (no Astra needed for local dev)
cd api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # set DEV_MEMORY_DB=1, API_SHARED_SECRET, ADMIN_API_KEY
uvicorn app.main:app --reload --port 8000     # docs at http://localhost:8000/docs

# 2. Web
cd ../web
npm install
cp .env.example .env.local  # API_URL=http://localhost:8000, same API_SHARED_SECRET
npm run dev
```

## Connect Astra DB

1. Create a database in Astra and copy its **API endpoint** and an **application token**.
2. Put them in `api/.env` (`ASTRA_DB_API_ENDPOINT`, `ASTRA_DB_APPLICATION_TOKEN`), set `DEV_MEMORY_DB=0`.
3. `python -m scripts.seed` creates the collections: `leads`, `subscribers`, `posts`, `case_studies`, `services`, `industries`, `faqs`, `testimonials`, `authors`, `lead_magnets`.

## Managing content (CMS)

Endpoints under `/v1/admin/*` need the `X-Admin-Key` header. Swagger UI at `/docs` lets you try them. Example, publishing a verified case study:

```bash
curl -X PUT http://localhost:8000/v1/admin/content/case_studies/acme-lead-gen \
  -H "X-Admin-Key: $ADMIN_API_KEY" -H "Content-Type: application/json" \
  -d '{"title":"...","status":"published","client":"...","industry":"...","isPlaceholder":false,
       "problem":"...","strategy":"...","execution":["..."],"channels":["SEO"],
       "metrics":[{"label":"Leads per month","value":"48"}],"before":"...","after":"...","lessons":["..."]}'
```

- `status: draft` keeps it hidden; `published` makes it live within ~5 minutes.
- Same slug as a default = override. New slug = new page.
- `GET /v1/admin/leads` lists submissions, newest first, with UTM and landing-page attribution.
- Set `LEAD_WEBHOOK_URL` (n8n, Zapier, Slack) to be notified of every new lead.

## Analytics

Set the IDs in `web/.env.local` (GA4, Meta Pixel, LinkedIn, Google Ads). Tags load only after a visitor accepts the cookie banner. Events fired through `track()`: `whatsapp_click`, `contact_form_submit`, `audit_request`, `newsletter_signup`, `service_cta_click`, `case_study_view`, `scroll_depth` (`phone_click` is defined; use `event="phone_click"` on a `tel:` link when you add a phone number).
UTM parameters, landing page and referrer are captured per visit and stored with every lead.

## Things only you can supply

1. **Real case studies.** Both case studies are labelled samples (noindex, hidden from the sitemap). Replace via the CMS.
2. **Photography and an Open Graph image.** None is bundled. Use real Lagos and Nigerian founder imagery, then add `web/app/opengraph-image.jpg` (1200x630).
3. **Social profile URLs** in `web/lib/site.ts` (`social`). Empty means nothing is rendered or put in schema.
4. **Legal review** of Privacy, Terms and Cookie pages. They're sensible drafts, not legal advice.
5. **Testimonials, awards, client logos:** none exist on the site and none should be added unless they're real.

## Deploying

- Web: Vercel or any Node host. Set the env vars from `web/.env.example`.
- API: any container or Python host (Render, Railway, Fly, a VPS): `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. The rate limiter is in-memory per process; if you run more than one instance, move it to Redis.
- After launch: submit `/sitemap.xml` in Search Console and set `NEXT_PUBLIC_GSC_VERIFICATION`.

## Status and honest limits

- The build environment had no network, so `npm install`, `next build`, `tsc` and the FastAPI server were **not run here**. Python files compile; all TypeScript imports and exports were cross-checked statically. Expect to fix a small number of type or lint errors on first `npm run build`, and run Lighthouse yourself.
- No visual admin UI yet. Content is managed through the API/Swagger. A small admin dashboard is the natural next build.
- `SearchAction` schema is intentionally omitted because the site has no search page.
