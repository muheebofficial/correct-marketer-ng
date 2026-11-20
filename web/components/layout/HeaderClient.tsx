"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavDropdown, type DropItem } from "@/components/layout/NavDropdown";
import { ServicesMegaMenu, type MegaGroup } from "@/components/layout/ServicesMegaMenu";
import { nav, waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { waMessageFor } from "@/lib/waContext";

export function HeaderClient({ menus, serviceGroups }: { menus: Record<string, { items: DropItem[]; allLabel: string }>; serviceGroups: MegaGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => { setOpen(false); setExpanded(null); setOpenGroup(null); }, [pathname]);
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
    <>
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
            {nav.map((n) =>
              n.href === "/services" ? (
                <ServicesMegaMenu key={n.href} label={n.label} href={n.href} groups={serviceGroups} active={isActive(n.href)} pathname={pathname} />
              ) : menus[n.href] ? (
                <NavDropdown key={n.href} label={n.label} href={n.href} items={menus[n.href].items} allLabel={menus[n.href].allLabel} active={isActive(n.href)} pathname={pathname} />
              ) : (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`font-sub text-[15px] font-bold underline-offset-[10px] hover:underline ${isActive(n.href) ? "text-forest underline decoration-gold decoration-2" : "text-obsidian"}`}
                >
                  {n.label}
                </Link>
              ),
            )}
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
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto bg-forest text-ivory on-dark adire lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-6">
            {nav.map((n) => {
              const menu = menus[n.href];
              const isServices = n.href === "/services";
              return (
                <div key={n.href} className="border-b border-ivory/15">
                  <div className="flex items-center justify-between">
                    <Link href={n.href} className="flex-1 py-4 font-display text-4xl font-extrabold" aria-current={isActive(n.href) ? "page" : undefined}>
                      {n.label}
                    </Link>
                    {(menu || isServices) && (
                      <button
                        type="button"
                        aria-expanded={expanded === n.href}
                        aria-controls={`m-${n.label}`}
                        onClick={() => setExpanded(expanded === n.href ? null : n.href)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-ivory/30"
                      >
                        <span className="sr-only">{expanded === n.href ? `Collapse ${n.label}` : `Expand ${n.label}`}</span>
                        <svg width="16" height="16" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={expanded === n.href ? "rotate-180" : ""}>
                          <path d="M2 4.5l4 4 4-4" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {isServices && expanded === n.href && (
                    <ul id={`m-${n.label}`} className="mb-4 space-y-1 border-l-2 border-gold pl-4">
                      {serviceGroups.map((g) => (
                        <li key={g.slug}>
                          <div className="flex items-center justify-between">
                            <Link href={`/services/${g.slug}`} className="flex-1 py-2 font-sub text-lg font-bold text-gold-soft">{g.name}</Link>
                            <button type="button" aria-expanded={openGroup === g.slug} onClick={() => setOpenGroup(openGroup === g.slug ? null : g.slug)} className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-ivory/30">
                              <span className="sr-only">{openGroup === g.slug ? `Collapse ${g.name}` : `Expand ${g.name}`}</span>
                              <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={openGroup === g.slug ? "rotate-180" : ""}><path d="M2 4.5l4 4 4-4" /></svg>
                            </button>
                          </div>
                          {openGroup === g.slug && (
                            <ul className="mb-2 space-y-0.5 pl-3">
                              {g.items.map((it) => (
                                <li key={it.href}><Link href={it.href} className="block py-1.5 text-base font-semibold text-ivory/90">{it.label}</Link></li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {menu && expanded === n.href && (
                    <ul id={`m-${n.label}`} className="mb-4 space-y-1 border-l-2 border-gold pl-4">
                      {menu.items.map((it) => (
                        <li key={it.href}><Link href={it.href} className="block py-2 font-sub text-lg font-bold">{it.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
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
    </>
  );
}
