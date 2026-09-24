import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/content/types";

export function FAQ({ faqs, id = "faq-heading" }: { faqs: Faq[]; id?: string }) {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <div className="divide-y divide-obsidian/15 border-y border-obsidian/15">
        {faqs.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex min-h-[56px] items-center justify-between gap-6 py-3 font-sub text-lg font-bold text-obsidian">
              <span>{f.q}</span>
              <span aria-hidden="true" className="faq-plus shrink-0 text-2xl leading-none text-gold-ink transition-transform">+</span>
            </summary>
            <p className="max-w-3xl pb-5 pr-8 text-mute">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
