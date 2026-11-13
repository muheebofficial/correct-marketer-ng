"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type DropItem = { label: string; href: string; hint?: string };

type Props = {
  label: string;
  href: string;
  items: DropItem[];
  active: boolean;
  allLabel: string;
  pathname: string;
};

/** Desktop nav item with a hover/focus/click dropdown. The label itself still links to the section page. */
export function NavDropdown({ label, href, items, active, allLabel, pathname }: Props) {
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

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false); }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`font-sub text-[15px] font-bold underline-offset-[10px] hover:underline ${active ? "text-forest underline decoration-gold decoration-2" : "text-obsidian"}`}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-8 w-6 items-center justify-center rounded-[3px] text-obsidian hover:text-forest"
        >
          <span className="sr-only">{open ? `Close ${label} menu` : `Open ${label} menu`}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <path d="M2 4.5l4 4 4-4" />
          </svg>
        </button>
      </div>

      {open && (
        <div id={panelId} className="absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-3">
          <div className="border border-stone-light border-t-4 border-t-gold bg-white p-2 shadow-xl">
            <ul>
              {items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="block rounded-[3px] px-3 py-2.5 hover:bg-ivory focus:bg-ivory">
                    <span className="block font-sub text-[15px] font-bold text-forest">{it.label}</span>
                    {it.hint && <span className="mt-0.5 block text-sm leading-snug text-mute">{it.hint}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={href} className="mt-1 block border-t border-stone-light px-3 py-3 font-sub text-sm font-bold text-forest hover:underline">
              {allLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
