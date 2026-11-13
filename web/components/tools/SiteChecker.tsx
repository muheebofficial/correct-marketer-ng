"use client";

import { useState } from "react";
import { Field, inputClass } from "@/components/forms/fields";
import type { Check, SiteCheckResult } from "@/lib/tools/siteCheck";
import { site, waLink } from "@/lib/site";
import { track } from "@/lib/track";

const icon: Record<Check["status"], { t: string; c: string; s: string }> = {
  pass: { t: "✓", c: "bg-forest text-ivory", s: "Pass" },
  warn: { t: "!", c: "bg-gold text-obsidian", s: "Needs work" },
  fail: { t: "✕", c: "bg-[#9B1C1C] text-white", s: "Missing" },
};

export function SiteChecker() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<SiteCheckResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/site-check", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.result) { setError(data.error ?? "Something went wrong. Please try again."); setState("error"); return; }
      setResult(data.result);
      setState("done");
      track("tool_complete", { tool: "website_conversion_checker", score: data.result.score });
    } catch {
      setError("We could not reach the checker. Check your connection and try again.");
      setState("error");
    }
  }

  const tone = result ? (result.score >= 75 ? "border-forest bg-forest/5" : result.score >= 45 ? "border-gold bg-gold/10" : "border-[#9B1C1C] bg-[#9B1C1C]/5") : "";
  const message = result
    ? `Hi Correct Marketer NG, I ran the Website Conversion Checker on ${result.facts.url}.\nScore: ${result.score}/100.\nTop issues: ${result.topFixes.slice(0, 3).map((f) => f.label).join("; ") || "none"}.\nCan you help me fix these?`
    : "";

  return (
    <div className="space-y-10">
      <form onSubmit={submit} className="max-w-2xl space-y-4" aria-label="Website Conversion Checker">
        <Field id="site-url" label="Your website address" required hint="For example: yourbusiness.com.ng. We check the page you enter, not the whole site.">
          <input id="site-url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="yourbusiness.com.ng" className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} required aria-describedby="site-url-hint" />
        </Field>
        <button type="submit" disabled={state === "loading"} className="inline-flex min-h-[52px] items-center justify-center rounded-[3px] bg-gold px-6 py-3 font-sub text-base font-bold text-obsidian hover:bg-[#DB9410] disabled:opacity-60">
          {state === "loading" ? "Checking your page…" : "Check my website"}
        </button>
        <p className="text-sm text-mute">We read your public page once and keep nothing. Only public websites can be checked.</p>
        <div aria-live="polite">{state === "error" && <p role="alert" className="border-l-4 border-[#9B1C1C] bg-white p-4 font-medium">{error}</p>}</div>
      </form>

      {state === "done" && result && (
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className={`h-fit border-l-4 p-6 ${tone}`}>
            <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-mute">Conversion score</p>
            <p className="mt-2 font-display text-7xl font-extrabold leading-none">{result.score}<span className="text-3xl text-mute">/100</span></p>
            <p className="mt-4 text-lg font-semibold">{result.verdict}</p>
            <p className="mt-3 break-all text-sm text-mute">{result.facts.url}</p>
          </div>

          <div className="space-y-8">
            {result.topFixes.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-extrabold">Fix these first</h2>
                <ol className="mt-3 space-y-3">
                  {result.topFixes.map((f) => (
                    <li key={f.id} className="border border-stone-light bg-white p-4">
                      <p className="font-sub font-bold text-forest">{f.label}</p>
                      <p className="mt-1">{f.fix}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div>
              <h2 className="font-display text-2xl font-extrabold">Every check</h2>
              <ul className="mt-3 divide-y divide-stone-light border border-stone-light bg-white">
                {result.checks.map((c) => (
                  <li key={c.id} className="flex gap-3 p-4">
                    <span aria-hidden="true" className={`mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${icon[c.status].c}`}>{icon[c.status].t}</span>
                    <div>
                      <p className="font-sub font-bold">{c.label} <span className="ml-1 text-sm font-normal text-mute">{icon[c.status].s}</span></p>
                      <p className="text-base">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-mute">This is an automated check of one page for conversion basics. It does not replace a full audit of your offer, traffic and follow-up.</p>
            </div>
            <div className="on-dark bg-forest p-5 text-ivory">
              <p className="font-sub text-lg font-bold">Want {site.name} to fix these for you?</p>
              <p className="mt-1 text-ivory/90">Send this result on WhatsApp and we will reply with a plan. It is optional.</p>
              <a href={waLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("tool_whatsapp_send", { tool: "website_conversion_checker", score: result.score })} className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-[3px] bg-gold px-6 py-3 font-sub font-bold text-obsidian hover:bg-[#DB9410]">
                Send my result to WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
