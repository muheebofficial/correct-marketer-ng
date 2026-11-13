// Run with: npx tsx lib/tools/adCheck.test.ts
import assert from "node:assert/strict";
import { runAdCheck, type AdCheckInput } from "./adCheck";

const base: AdCheckInput = { monthlyBudget: 100_000, enquiries: 10, sales: 1, averageSale: 100_000, marginPercent: 60, replyTime: "under-5-min", tracking: "full" };

let r = runAdCheck(base);
assert.equal(Math.round(r.spendWithVat), 107_500, "VAT 7.5% on spend");
assert.equal(Math.round(r.costPerSale!), 107_500);
assert.equal(Math.round(r.profit), 60_000 - 107_500);
assert.equal(Math.round(r.doubledProfit!), 2 * (60_000 - 107_500), "doubling budget doubles a loss");
assert.equal(r.verdict, "both-sides", "expensive enquiries and close rate below break-even");

// cheap enquiries, weak closing, slow reply -> follow-up side
r = runAdCheck({ ...base, monthlyBudget: 100_000, enquiries: 100, sales: 2, averageSale: 50_000, marginPercent: 40, replyTime: "next-day" });
assert.equal(r.verdict, "follow-up-side");
assert.ok(r.fixes.some((f) => f.leak === "Follow-up speed"));

// profitable and fast -> healthy
r = runAdCheck({ ...base, enquiries: 100, sales: 10, averageSale: 100_000, marginPercent: 50 });
assert.equal(r.verdict, "healthy");
assert.ok(r.profit > 0);

// tiny budget
assert.equal(runAdCheck({ ...base, monthlyBudget: 30_000 }).verdict, "budget-too-small");
// no tracking and losing money
assert.equal(runAdCheck({ ...base, enquiries: 100, sales: 1, tracking: "none" }).verdict, "tracking-blind");
// zero enquiries
r = runAdCheck({ ...base, enquiries: 0, sales: 0 });
assert.equal(r.verdict, "no-enquiries");
assert.equal(r.costPerEnquiry, null);
// validation
assert.equal(runAdCheck({ ...base, sales: 20 }).valid, false, "sales > enquiries");
assert.equal(runAdCheck({ ...base, monthlyBudget: 0 }).valid, false);
assert.equal(runAdCheck({ ...base, marginPercent: 0 }).valid, false);
assert.equal(runAdCheck({ ...base, monthlyBudget: NaN }).valid, false);
// always at most 3 fixes
assert.ok(runAdCheck({ ...base, tracking: "none", replyTime: "next-day" }).fixes.length <= 3);
console.log("adCheck tests passed");
