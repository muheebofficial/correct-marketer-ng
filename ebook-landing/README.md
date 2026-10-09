# Ebook Landing Page

This project delivers a single-page ebook landing page and serverless API that sends the guide by email and saves the lead to monday.com in one request.

## Project structure

- `public/index.html` – marketing page and form
- `public/assets/cover.jpg` – ebook cover image
- `private/The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf` – PDF attached by email
- `api/lead.js` – form handler
- `api/_config.js` – monday and email configuration
- `api/_monday.js` – monday.com insert/update logic
- `api/_email.js` – Resend email sending and owner alert
- `scripts/list-columns.js` – prints board and column IDs for monday

## Setup

Copy `.env.example` to `.env` and fill in your values before running locally or deploying.

## monday board mapping

| Form field | monday column | Column ID |
| --- | --- | --- |
| First name + Surname | Name (item name) | name |
| First name | First name (Text) | text_mm7zrfyv |
| Email address | Email | lead_email |
| Phone / WhatsApp | Phone | lead_phone |
| Business name | Company | lead_company |
| Monthly budget | Monthly budget (Dropdown) | dropdown_mm7z83wy |
| What problem do you want us to solve? | Problem to solve (Long text) | long_text_mm7zg9a8 |
| About your business | About the business (Long text) | long_text_mm7zmnkr |
| Social media handle | Social handle (Text) | text_mm7z9j73 |
| Website URL | Website (Link) | link_mm7zj6by |
| Consent | Consent to contact (Checkbox) | boolean_mm7z3fa7 |
| Submission time | Last interaction (Date) | date__1 |
| Lead Source | EBook landing page | color_mkyb8krc |
| Status | New Lead | lead_status |
| Owner | Assigned owner | lead_owner |

## Local development

Run the app with:

```bash
npm i -g vercel
vercel dev
```

## Deployment

Deploy with:

```bash
vercel --prod
```

Then add the same environment variables in Vercel Project Settings.

## monday column IDs

If your monday board is ever changed or rebuilt, run:

```bash
node --env-file=.env scripts/list-columns.js
```

This prints the board group IDs and column IDs so you can update `api/_config.js`.
