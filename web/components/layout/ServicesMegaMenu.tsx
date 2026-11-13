"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type MegaGroup = { slug: string; name: string; stage: number; tagline: string; items: { label: string; href: string }[] };

/** Wide Services menu: every stage of the customer journey and every service, open on hover, focus or click. */
export function ServicesMegaMenu({ label, href, groups, active, pathname }: { label: string; href: string; groups: MegaGroup[]; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div
      ref={ref}
      className="flex h-[68px] items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false); }}
    >
      <div className="flex items-center gap-1">
        <Link href={href} aria-current={active ? "page" : undefined} className={`font-sub text-[15px] font-bold underline-offset-[10px] hover:underline ${active ? "text-forest underline decoration-gold decoration-2" : "text-obsidian"}`}>
          {label}
        </Link>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)} className="inline-flex h-8 w-6 items-center justify-center rounded-[3px] text-obsidian hover:text-forest">
          <span className="sr-only">{open ? `Close ${label} menu` : `Open ${label} menu`}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M2 4.5l4 4 4-4" />
          </svg>
        </button>
      </div>

      {open && (
        <div id={panelId} className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-68px)] overflow-y-auto border-b border-t-4 border-stone-light border-t-gold bg-white shadow-xl">
          <div className="mx-auto max-w-page px-5 py-8 sm:px-8">
            <div className="grid gap-x-8 gap-y-8 lg:grid-cols-5">
              {groups.map((g) => (
                <div key={g.slug}>
                  <Link href={`/services/${g.slug}`} className="group block border-b-2 border-gold pb-3">
                    <span className="block font-sub text-xs font-bold uppercase tracking-[0.12em] text-gold-ink">Stage {g.stage}</span>
                    <span className="block font-display text-2xl font-extrabold leading-tight text-forest group-hover:underline">{g.name}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-mute">{g.tagline}</span>
                  </Link>
                  <ul className="mt-3 space-y-0.5">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="block rounded-[3px] px-2 py-1.5 text-[14px] font-semibold leading-snug text-obsidian hover:bg-ivory hover:text-forest focus:bg-ivory focus:text-forest">{it.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-light pt-5">
              <Link href={href} className="font-sub text-sm font-bold text-forest hover:underline">View all {total} services <span aria-hidden="true">→</span></Link>
              <Link href="/contact" className="inline-flex min-h-[40px] items-center rounded-[3px] bg-forest px-4 font-sub text-sm font-bold text-ivory hover:bg-[#0E6236]">Start a Growth Conversation</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
