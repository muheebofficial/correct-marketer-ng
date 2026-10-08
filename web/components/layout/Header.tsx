"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { waMessageFor } from "@/lib/waContext";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = waLink(waMessageFor(pathname));
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-light bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-page items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Correct Marketer NG, home">
          <Image src="/logo-color.svg" alt="Correct Marketer NG logo" width={48} height={24} priority className="h-6 w-12" />
          <span className="font-sub text-[15px] font-bold leading-[1.1] text-forest">
            CORRECT
            <span className="block text-gold-ink">MARKETER NG</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`font-sub text-[15px] font-bold underline-offset-[10px] hover:underline ${isActive(n.href) ? "text-forest underline decoration-gold decoration-2" : "text-obsidian"
                }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded-[3px] bg-forest px-5 font-sub text-[15px] font-bold text-ivory hover:bg-[#0E6236]"
          >
            Start a Growth Conversation
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "header_mobile" })}
            className="inline-flex min-h-[44px] items-center rounded-[3px] bg-gold px-4 font-sub text-sm font-bold text-obsidian"
          >
            WhatsApp
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-obsidian/30"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[68px] z-30 overflow-y-auto bg-forest text-ivory on-dark adire lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-6">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-ivory/15 py-4 font-display text-4xl font-extrabold"
                aria-current={isActive(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[3px] bg-gold px-6 font-sub font-bold text-obsidian"
            >
              Start a Growth Conversation
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "mobile_menu" })}
              className="mt-3 inline-flex min-h-[52px] items-center justify-center rounded-[3px] border border-ivory/50 px-6 font-sub font-bold"
            >
              Chat on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
