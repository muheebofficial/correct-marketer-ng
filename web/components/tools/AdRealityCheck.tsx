"use client";

import { useMemo, useState } from "react";
import { Field, inputClass } from "@/components/forms/fields";
import { naira, runAdCheck, type AdCheckInput, type ReplyTime, type Tracking } from "@/lib/tools/adCheck";
import { site, waLink } from "@/lib/site";
import { track } from "@/lib/track";

type Props = { initial: Pick<AdCheckInput, "monthlyBudget" | "enquiries" | "sales" | "averageSale" | "marginPercent">; industry?: string; tip?: string };

const replyOptions: { value: ReplyTime; label: string }[] = [
  { value: "under-5-min", label: "Within 5 minutes" },
  { value: "within-1-hour", label: "Within an hour" },
  { value: "same-day", label: "Later the same day" },
  { value: "next-day", label: "The next day or later" },
];
const trackingOptions: { value: Tracking; label: string }[] = [
  { value: "full", label: "Yes, I can tell which ad brought each enquiry and sale" },
  { value: "partial", label: "Partly, I track enquiries but not sales" },
  { value: "none", label: "No, I am guessing" },
];

const verdictTone: Record<string, string> = {
  healthy: "border-forest bg-forest/5",
  "follow-up-side": "border-gold bg-gold/10",
  "ads-side": "border-gold bg-gold/10",
  "both-sides": "border-[#9B1C1C] bg-[#9B1C1C]/5",
  "tracking-blind": "border-[#9B1C1C] bg-[#9B1C1C]/5",
  "budget-too-small": "border-gold bg-gold/10",
  "no-enquiries": "border-[#9B1C1C] bg-[#9B1C1C]/5",
};

export function AdRealityCheck({ initial, industry, tip }: Props) {
  const [v, setV] = useState({
    monthlyBudget: String(initial.monthlyBudget),
    enquiries: String(initial.enquiries),
    sales: String(initial.sales),
    averageSale: String(initial.averageSale),
    marginPercent: String(initial.marginPercent),
  });
  const [replyTime, setReplyTime] = useState<ReplyTime>("same-day");
  const [tracking, setTracking] = useState<Tracking>("partial");
  const [shown, setShown] = useState(false);

  const input: AdCheckInput = useMemo(
    () => ({ monthlyBudget: Number(v.monthlyBudget), enquiries: Number(v.enquiries), sales: Number(v.sales), averageSale: Number(v.averageSale), marginPercent: Number(v.marginPercent), replyTime, tracking }),
    [v, replyTime, tracking],
  );
  const result = useMemo(() => runAdCheck(input), [input]);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => { setV({ ...v, [k]: e.target.value.replace(/[^0-9.]/g, "") }); setShown(false); };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setShown(true);
    if (result.valid) track("tool_complete", { tool: "ad_reality_check", verdict: result.verdict, industry: industry ?? "general" });
  }

  const message = result.valid
    ? `Hi Correct Marketer NG, I used your Ad Reality Check${industry ? ` (${industry})` : ""}.\n` +
      `Monthly ad budget: ${naira(input.monthlyBudget)} (+7.5% VAT)\nEnquiries: ${input.enquiries}, sales: ${input.sales}\n` +
      `Cost per enquiry: ${result.costPerEnquiry === null ? "n/a" : naira(result.costPerEnquiry)}\n` +
      `Monthly result after ad spend: ${naira(result.profit)}\nVerdict: ${result.headline}\nCan you help me fix this?`
    : "";

  const num = (id: string, label: string, key: keyof typeof v, hint?: string, prefix?: string) => (
    <Field id={id} label={label} required hint={hint}>
      <div className="flex items-center gap-2">
        {prefix && <span className="font-sub font-bold" aria-hidden="true">{prefix}</span>}
        <input id={id} inputMode="decimal" className={inputClass} value={v[key]} onChange={set(key)} aria-describedby={hint ? `${id}-hint` : undefined} />
      </div>
    </Field>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submit} className="space-y-5" aria-label="Ad Reality Check inputs">
        {num("budget", "Monthly ad budget (before VAT)", "monthlyBudget", "What you spend on Meta, Google or TikTok each month.", "₦")}
        {num("enq", "Enquiries from ads each month", "enquiries", "WhatsApp chats, calls and forms from ads.")}
        {num("sales", "Sales closed from those enquiries", "sales")}
        {num("avg", "Average sale value", "averageSale", tip, "₦")}
        {num("margin", "Profit margin on a sale", "marginPercent", "Percent left after the cost of delivering it.", "%")}
        <Field id="reply" label="How fast do you usually reply to an enquiry?" required>
          <select id="reply" className={inputClass} value={replyTime} onChange={(e) => { setReplyTime(e.target.value as ReplyTime); setShown(false); }}>
            {replyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field id="tracking" label="Can you tell which ad produced which sale?" required>
          <select id="tracking" className={inputClass} value={tracking} onChange={(e) => { setTracking(e.target.value as Tracking); setShown(false); }}>
            {trackingOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <button type="submit" className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[3px] bg-gold px-6 py-3 font-sub text-base font-bold text-obsidian hover:bg-[#DB9410] sm:w-auto">
          Show my reality check
        </button>
        <p className="text-sm text-mute">Nothing is saved or sent unless you choose to send your result on WhatsApp. Example numbers are illustrative: replace them with yours.</p>
      </form>

      <div aria-live="polite">
        {shown && !result.valid && (
          <div role="alert" className="border-l-4 border-[#9B1C1C] bg-white p-5">
            <p className="font-sub font-bold">Check these first:</p>
            <ul className="mt-2 list-disc pl-5">{result.errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
        {shown && result.valid && (
          <div className="space-y-6">
            <div className={`border-l-4 p-5 ${verdictTone[result.verdict]}`}>
              <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-mute">Your verdict</p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{result.headline}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {[
                ["Spend with 7.5% VAT", naira(result.spendWithVat)],
                ["Cost per enquiry", result.costPerEnquiry === null ? "n/a" : naira(result.costPerEnquiry)],
                ["Close rate", result.closeRate === null ? "n/a" : `${(result.closeRate * 100).toFixed(1)}%`],
                ["Cost per sale", result.costPerSale === null ? "No sales yet" : naira(result.costPerSale)],
                ["Profit per sale", naira(result.marginPerSale)],
                ["Result after ad spend", naira(result.profit)],
              ].map(([k, val]) => (
                <div key={k} className="border border-stone-light bg-white p-3">
                  <dt className="text-sm text-mute">{k}</dt>
                  <dd className="mt-1 font-sub text-lg font-bold">{val}</dd>
                </div>
              ))}
            </dl>
            {result.breakEvenCloseRate !== null && (
              <p className="text-base">At this cost per enquiry you need about <strong>{Math.min(100, Math.round(result.breakEvenCloseRate * 100))}%</strong> of enquiries to buy just to break even. You are at <strong>{result.closeRate === null ? "0" : (result.closeRate * 100).toFixed(1)}%</strong>.</p>
            )}
            {result.doubledProfit !== null && (
              <p className="border-l-4 border-gold bg-white p-4 text-base">
                <strong>If you doubled the budget</strong> and nothing else changed, your monthly result would go from {naira(result.profit)} to {naira(result.doubledProfit)}. More budget multiplies what is already happening, including the waste.
              </p>
            )}
            <div>
              <h2 className="font-display text-2xl font-extrabold">Fix these first</h2>
              <ol className="mt-3 space-y-3">
                {result.fixes.map((f) => (
                  <li key={f.title} className="border border-stone-light bg-white p-4">
                    <p className="font-sub font-bold text-forest">{f.title}</p>
                    <p className="mt-1 text-base">{f.why}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-gold-ink">Leak: {f.leak}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="on-dark bg-forest p-5 text-ivory">
              <p className="font-sub text-lg font-bold">Want us to fix it with you?</p>
              <p className="mt-1 text-ivory/90">Send this result to {site.name} on WhatsApp and we will reply with a plan. It is optional. Your result stays on this page otherwise.</p>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("tool_whatsapp_send", { tool: "ad_reality_check", verdict: result.verdict })}
                className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-[3px] bg-gold px-6 py-3 font-sub font-bold text-obsidian hover:bg-[#DB9410]"
              >
                Send my plan to WhatsApp
              </a>
            </div>
          </div>
        )}
        {!shown && <p className="border border-dashed border-stone-light p-6 text-mute">Your verdict, break-even numbers and top three fixes will appear here.</p>}
      </div>
    </div>
  );
}
