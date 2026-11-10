"use client";

import { track } from "@/lib/track";
import { site } from "@/lib/site";

const message = "Hi Correct Marketer NG, I'd like a campaign audit.";
const href = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message).replace(/'/g, "%27")}`;

export function BlogCTA({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={compact ? "blog-cta blog-cta-compact" : "blog-cta"} aria-label="Free campaign audit">
      <div>
        <p className="font-sub text-sm font-bold uppercase tracking-[0.15em] text-gold-soft">Find the leak before you spend more</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-ivory">Get a clear plan for better results.</h2>
        {!compact && <p className="mt-3 max-w-2xl text-ivory/85">We will review your campaign and tell you plainly what to fix first.</p>}
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: compact ? "blog_mid_article_audit" : "blog_campaign_audit" })} className="blog-cta-button">
        Get my free campaign audit <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
