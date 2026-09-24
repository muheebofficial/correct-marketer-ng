"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { parseFieldErrors } from "./fields";

export function NewsletterForm({ tone = "dark", idPrefix = "nl" }: { tone?: "light" | "dark"; idPrefix?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const dark = tone === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      first_name: String(fd.get("first_name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      consent: fd.get("consent") === "on",
      fax: String(fd.get("fax") ?? ""),
      attribution: getAttribution(),
    };
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        track("newsletter_signup");
        setStatus("done");
        return;
      }
      const fields = res.status === 422 ? Object.values(parseFieldErrors(data.detail)) : [];
      setMessage(fields[0] || (res.status === 429 ? "Too many attempts. Please try again in a few minutes." : "That didn't go through. Please try again."));
      setStatus("error");
    } catch {
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p role="status" className="font-sub font-bold">You're in. Look out for practical growth ideas in your inbox.</p>;
  }

  const input = `min-h-[46px] w-full rounded-[3px] border px-3 py-2 text-base text-obsidian ${dark ? "border-ivory/40 bg-white" : "border-obsidian/40 bg-white"}`;
  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="mb-1 block text-sm font-semibold">First name</label>
          <input id={`${idPrefix}-name`} name="first_name" required maxLength={80} autoComplete="given-name" className={input} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1 block text-sm font-semibold">Email</label>
          <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" className={input} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave empty<input name="fax" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#C8850A]" />
        <span>
          Yes, send me practical marketing and growth emails. I can unsubscribe at any time. See the <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </span>
      </label>
      {status === "error" && <p role="alert" className="text-sm font-semibold text-[#FFB4B4]">{message}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[48px] w-full rounded-[3px] bg-gold px-6 font-sub font-bold text-obsidian hover:bg-[#DB9410] disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === "sending" ? "Signing you up…" : "Get Smarter About Growth"}
      </button>
    </form>
  );
}
