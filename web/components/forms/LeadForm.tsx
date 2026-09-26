"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { Field, inputClass, parseFieldErrors } from "./fields";

export type LeadIntent =
  | "contact"
  | "growth-audit"
  | "website-conversion-audit"
  | "seo-visibility-audit"
  | "ai-automation-assessment";

const businessTypes = [
  "Nigerian SME", "E-commerce", "Professional services", "Education", "Hospitality",
  "Restaurant / food", "Technology", "Real estate", "Personal brand", "Startup", "Other",
];
const challenges = [
  "Not enough leads", "Ads aren't working", "Website doesn't convert", "Not showing up on Google",
  "Too much manual follow-up", "Unclear brand / positioning", "Not sure yet",
];
const budgets = ["Under ₦200,000 / month", "₦200,000 – ₦500,000 / month", "₦500,000 – ₦1,000,000 / month", "Above ₦1,000,000 / month", "Not sure yet"];

export function LeadForm({
  intent = "contact",
  submitLabel = "Start My Growth Conversation",
  successWaMessage,
  tone = "light",
}: {
  intent?: LeadIntent;
  submitLabel?: string;
  successWaMessage?: string;
  tone?: "light" | "dark";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setFormError("");
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const payload = {
      intent,
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      business: get("business"),
      website: get("website"),
      business_type: get("business_type"),
      challenge: get("challenge"),
      budget: get("budget"),
      preferred_contact: get("preferred_contact"),
      message: get("message"),
      consent: true,
      fax: get("fax"),
      attribution: getAttribution(),
    };

    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        track(intent === "contact" ? "contact_form_submit" : "audit_request", { intent, stage: data.stage || "new_lead" });
        setStatus("done");
        return;
      }
      if (res.status === 422) {
        setErrors(parseFieldErrors(data.detail));
        setFormError("Please check the highlighted fields.");
      } else if (res.status === 429) {
        setFormError("You've sent a few requests in a short time. Please wait a few minutes, or message us on WhatsApp.");
      } else {
        setFormError("Something went wrong on our side. Your details weren't sent. Please message us on WhatsApp instead.");
      }
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Check your connection, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className={`rounded-[3px] border p-6 ${tone === "dark" ? "border-ivory/30" : "border-forest/30 bg-white"}`}>
        <h3 className="font-display text-3xl font-extrabold">Thanks. We've got your details.</h3>
        <p className="mt-2 max-w-prose">
          We’ll follow up within 24 hours. If you’d prefer to reach us immediately, message us on WhatsApp and we’ll take it from there.
        </p>
        <a
          href={waLink(successWaMessage || "Hi Correct Marketer NG, I’ve submitted my enquiry and would like to continue on WhatsApp.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { source: "form_success" })}
          className="mt-5 inline-flex min-h-[48px] items-center rounded-[3px] bg-gold px-6 font-sub font-bold text-obsidian"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate={false} className={`grid gap-5 ${tone === "dark" ? "text-obsidian" : ""}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={errors.name}>
          <input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} {...err("name")} />
        </Field>
        <Field id="phone" label="WhatsApp / phone number" required error={errors.phone}>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="0803 000 0000" className={inputClass} {...err("phone")} />
        </Field>
      </div>
      <Field id="email" label="Email" required error={errors.email}>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} {...err("email")} />
      </Field>
      <Field id="challenge" label="Your biggest marketing challenge" error={errors.challenge}>
        <select id="challenge" name="challenge" defaultValue="" className={inputClass}>
          <option value="">Choose one</option>
          {challenges.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>

      <details className="rounded-[3px] border border-obsidian/20 bg-white/60 p-4">
        <summary className="font-sub font-bold text-forest">Add more detail (optional)</summary>
        <div className="mt-4 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="business" label="Business name" error={errors.business}>
              <input id="business" name="business" maxLength={150} autoComplete="organization" className={inputClass} />
            </Field>
            <Field id="website" label="Website" error={errors.website}>
              <input id="website" name="website" maxLength={300} inputMode="url" placeholder="yourbusiness.com" className={inputClass} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="business_type" label="Business type">
              <select id="business_type" name="business_type" defaultValue="" className={inputClass}>
                <option value="">Choose one</option>
                {businessTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field id="budget" label="Monthly marketing budget">
              <select id="budget" name="budget" defaultValue="" className={inputClass}>
                <option value="">Prefer not to say</option>
                {budgets.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field id="preferred_contact" label="Best way to reach you">
            <select id="preferred_contact" name="preferred_contact" defaultValue="" className={inputClass}>
              <option value="">No preference</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="phone">Phone call</option>
            </select>
          </Field>
          <Field id="message" label="Anything else we should know?" error={errors.message}>
            <textarea id="message" name="message" rows={4} maxLength={2000} className={inputClass} />
          </Field>
        </div>
      </details>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {formError && (
        <p role="alert" className="rounded-[3px] border border-[#9B1C1C]/40 bg-[#FDECEC] p-3 text-sm font-medium text-[#7A1414]">
          {formError}
        </p>
      )}

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#C8850A]" />
        <span>
          By submitting this form you agree to be contacted by Correct Marketer NG via WhatsApp and/or email regarding your enquiry, in line with our <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </span>
      </label>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[52px] items-center justify-center rounded-[3px] bg-forest px-7 font-sub text-base font-bold text-ivory hover:bg-[#0E6236] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className={`mt-3 max-w-prose text-sm ${tone === "dark" ? "text-ivory/85" : "text-mute"}`}>
          We’ll use your details only to reply to this request. Read our <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
