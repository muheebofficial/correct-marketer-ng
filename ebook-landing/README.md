# Ebook Landing Page

This project serves the ebook landing page and its serverless API. The API sends the existing guide email with its PDF attachment and stores each lead in Google Sheets.

## Project structure

- `public/index.html` and `public/guide/index.html` – landing pages and forms
- `private/The-Nigerian-Business-Guide-to-Agentic-AI-Automation.pdf` – PDF attached by email
- `api/lead.js` – form handler
- `api/_lead-sink.js` – server-side Google Sheets webhook client
- `api/_email.js` – Resend email delivery and owner alert

## Setup

Copy `.env.example` to `.env` and configure the Google Sheets webhook and email variables before running locally or deploying.

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

Set the same environment variables in Vercel Project Settings.
