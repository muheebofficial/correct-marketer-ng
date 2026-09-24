import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ReactNode } from "react";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  sub,
  cta,
  ctaHref = "/contact",
  waMessage,
  source,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  sub?: string;
  cta?: string;
  ctaHref?: string;
  waMessage?: string;
  source: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="on-dark adire bg-forest text-ivory">
      <div className="mx-auto max-w-page px-5 py-12 sm:px-8 md:py-20">
        <Breadcrumbs items={crumbs} tone="dark" />
        {eyebrow && <p className="mt-8 font-sub text-sm font-bold text-gold-soft">{eyebrow}</p>}
        <h1 id="page-heading" className={`${eyebrow ? "mt-3" : "mt-8"} max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[0.98] tracking-tight`}>
          {title}
        </h1>
        {sub && <p className="mt-5 max-w-2xl text-lg text-ivory/90 md:text-xl">{sub}</p>}
        {cta && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={ctaHref} variant="gold" event="service_cta_click" params={{ source, cta }}>{cta}</Button>
            <WhatsAppButton message={waMessage} source={source} />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
