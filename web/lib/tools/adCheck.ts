/** Pure maths for the Naira Ad Reality Check. No React, no I/O, so it can be tested on its own. */

export const VAT = 0.075;
export const BUDGET_FLOOR = 60_000; // monthly naira below which Meta/Google cannot learn much
export const LEAD_COST_RANGE = { low: 500, high: 3_000 }; // typical cost per lead/enquiry, naira (illustrative)

export type ReplyTime = "under-5-min" | "within-1-hour" | "same-day" | "next-day";
export type Tracking = "full" | "partial" | "none";

export type AdCheckInput = {
  monthlyBudget: number; // naira, before VAT
  enquiries: number; // enquiries / leads per month
  sales: number; // sales closed per month from those enquiries
  averageSale: number; // naira per sale
  marginPercent: number; // 1-100, profit margin on a sale
  replyTime: ReplyTime;
  tracking: Tracking;
};

export type Verdict = "healthy" | "ads-side" | "follow-up-side" | "both-sides" | "tracking-blind" | "budget-too-small" | "no-enquiries";

export type Fix = { title: string; why: string; leak: string };

export type AdCheckResult = {
  valid: boolean;
  errors: string[];
  spendWithVat: number;
  costPerEnquiry: number | null;
  closeRate: number | null; // 0-1
  costPerSale: number | null;
  marginPerSale: number;
  profit: number; // monthly, after VAT on spend
  roas: number | null;
  breakEvenRoas: number;
  breakEvenCloseRate: number | null; // 0-1, close rate needed at current cost per enquiry
  doubledProfit: number | null; // profit if budget doubles and nothing else changes
  verdict: Verdict;
  headline: string;
  fixes: Fix[];
};

const clampInt = (n: number) => (Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0);

export function runAdCheck(input: AdCheckInput): AdCheckResult {
  const errors: string[] = [];
  const budget = clampInt(input.monthlyBudget);
  const enquiries = clampInt(input.enquiries);
  const sales = clampInt(input.sales);
  const averageSale = clampInt(input.averageSale);
  const margin = Number.isFinite(input.marginPercent) ? input.marginPercent / 100 : 0;

  if (budget <= 0) errors.push("Enter your monthly ad budget.");
  if (averageSale <= 0) errors.push("Enter what a typical sale is worth.");
  if (!(margin > 0 && margin <= 1)) errors.push("Enter your profit margin between 1 and 100 percent.");
  if (sales > enquiries) errors.push("Sales cannot be more than enquiries.");

  const spendWithVat = budget * (1 + VAT);
  const marginPerSale = averageSale * (margin > 0 && margin <= 1 ? margin : 0);
  const costPerEnquiry = enquiries > 0 ? spendWithVat / enquiries : null;
  const closeRate = enquiries > 0 ? sales / enquiries : null;
  const costPerSale = sales > 0 ? spendWithVat / sales : null;
  const profit = sales * marginPerSale - spendWithVat;
  const roas = spendWithVat > 0 ? (sales * averageSale) / spendWithVat : null;
  const breakEvenRoas = margin > 0 ? 1 / margin : Infinity;
  const breakEvenCloseRate = costPerEnquiry !== null && marginPerSale > 0 ? costPerEnquiry / marginPerSale : null;
  const doubledProfit = enquiries > 0 ? 2 * profit : null;

  const base = { spendWithVat, costPerEnquiry, closeRate, costPerSale, marginPerSale, profit, roas, breakEvenRoas, breakEvenCloseRate, doubledProfit };
  if (errors.length) return { valid: false, errors, ...base, verdict: "healthy", headline: "", fixes: [] };

  const slowReply = input.replyTime === "same-day" || input.replyTime === "next-day";
  const adsExpensive = costPerEnquiry !== null && costPerEnquiry > LEAD_COST_RANGE.high;
  const closeTooLow = closeRate !== null && breakEvenCloseRate !== null && closeRate < breakEvenCloseRate;

  let verdict: Verdict;
  if (enquiries === 0) verdict = "no-enquiries";
  else if (budget < BUDGET_FLOOR) verdict = "budget-too-small";
  else if (input.tracking === "none" && profit < 0) verdict = "tracking-blind";
  else if (profit >= 0 && !slowReply) verdict = "healthy";
  else if (adsExpensive && (closeTooLow || slowReply)) verdict = "both-sides";
  else if (adsExpensive) verdict = "ads-side";
  else if (closeTooLow || slowReply) verdict = "follow-up-side";
  else verdict = "healthy";

  const headlines: Record<Verdict, string> = {
    healthy: "Your numbers hold up. Scaling the budget is a fair next step, carefully.",
    "ads-side": "Your enquiries cost too much. The leak is in the ads, offer or landing page.",
    "follow-up-side": "Your ads bring enquiries at a fair price. The leak is after the click: follow-up and closing.",
    "both-sides": "You are leaking on both sides: enquiries cost too much and too few turn into sales.",
    "tracking-blind": "You are losing money and cannot see where. Fix tracking before you touch the budget.",
    "budget-too-small": "Your budget is too small for the platform to learn. Fix the basics before expecting results.",
    "no-enquiries": "No enquiries means the problem starts before budget: offer, audience, tracking or the page.",
  };

  const fixes: Fix[] = [];
  const add = (f: Fix) => fixes.length < 3 && !fixes.some((x) => x.title === f.title) && fixes.push(f);
  if (input.tracking !== "full") add({ title: "Track every enquiry back to its ad", why: "Without WhatsApp, form and sale tracking you are guessing which ad earns money.", leak: "Tracking" });
  if (slowReply) add({ title: "Reply to every enquiry within minutes", why: "Enquiries that wait until the next day are already cold. Use saved replies or WhatsApp automation.", leak: "Follow-up speed" });
  if (verdict === "ads-side" || verdict === "both-sides" || verdict === "no-enquiries") {
    add({ title: "Rework the offer and the first two seconds of the ad", why: "A clear price, a reason to act now and a real photo or video lowers cost per enquiry faster than more budget.", leak: "Offer and creative" });
    add({ title: "Shorten the path from click to WhatsApp", why: "One page, one action, a visible WhatsApp button, and fast loading on mobile data.", leak: "Landing path" });
  }
  if (closeTooLow) add({ title: "Qualify and follow up in a script", why: `At your cost per enquiry you need roughly ${Math.round((breakEvenCloseRate ?? 0) * 100)}% of enquiries to buy just to break even. A follow-up script and a reminder routine raise that.`, leak: "Follow-up and trust" });
  if (verdict === "budget-too-small") add({ title: "Run one simple campaign at a workable budget", why: `Under about ₦${BUDGET_FLOOR.toLocaleString("en-NG")} a month, split across several ads, nothing gets enough data. Pick one offer and one audience.`, leak: "Budget structure" });
  if (verdict === "healthy") add({ title: "Raise budget in steps of 20 to 30 percent", why: "Increase gradually and watch cost per enquiry. Stop if it climbs and your close rate falls.", leak: "Scaling" });
  add({ title: "Add proof near the ad and the page", why: "Reviews, past work and customer photos make a stranger hesitate less.", leak: "Trust and brand" });

  return { valid: true, errors: [], ...base, verdict, headline: headlines[verdict], fixes };
}

export const naira = (n: number) => `${n < 0 ? "-" : ""}₦${Math.abs(Math.round(n)).toLocaleString("en-NG")}`;
