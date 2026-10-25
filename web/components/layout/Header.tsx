"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { nav, waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { waMessageFor } from "@/lib/waContext";
import { serviceGroups, getServicesByGroup } from "@/lib/services-taxonomy";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIntentTimer = () => {
    if (intentTimer.current) clearTimeout(intentTimer.current);
    intentTimer.current = null;
  };
  const scheduleMegaOpen = () => {
    clearIntentTimer();
    intentTimer.current = setTimeout(() => setMegaOpen(true), 150);
  };
  const scheduleMegaClose = () => {
    clearIntentTimer();
    intentTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
    setMegaOpen(false);
    clearIntentTimer();
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setOpenGroup(null);
      if (megaOpen) {
        setMegaOpen(false);
        servicesToggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, megaOpen]);
  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [megaOpen]);
  useEffect(() => () => clearIntentTimer(), []);

  const wa = waLink(waMessageFor(pathname));
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const desktopLinks = nav.filter((item) => item.href !== "/services");
  const onHeaderBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      clearIntentTimer();
      setMegaOpen(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        onBlur={onHeaderBlur}
        className="sticky top-0 z-40 border-b border-stone-light bg-ivory/95 backdrop-blur"
      >
        <div className="mx-auto flex h-[68px] max-w-page items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Correct Marketer NG, home">
            <Image src="/logo-color.svg" alt="Correct Marketer NG logo" width={48} height={24} priority className="h-6 w-12" />
            <span className="font-sub text-[15px] font-bold leading-[1.1] text-forest">
              CORRECT
              <span className="block text-gold-ink">MARKETER NG</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            <div
              className="flex items-center gap-1"
              onMouseEnter={scheduleMegaOpen}
              onMouseLeave={scheduleMegaClose}
              onFocus={scheduleMegaOpen}
            >
              <Link
                href="/services"
                aria-current={isActive("/services") ? "page" : undefined}
                className={`font-sub text-[15px] font-bold underline-offset-[10px] hover:underline ${isActive("/services") ? "text-forest underline decoration-gold decoration-2" : "text-obsidian"}`}
              >
                Services
              </Link>
              <button
                ref={servicesToggleRef}
                type="button"
                aria-label="Toggle services navigation"
                aria-expanded={megaOpen}
                aria-controls="services-mega-menu"
                onClick={() => {
                  clearIntentTimer();
                  setMegaOpen((value) => !value);
                }}
                className="inline-flex h-11 w-8 items-center justify-center rounded-sm text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest motion-reduce:transition-none"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 transition-transform motion-reduce:transition-none ${megaOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m4 7 6 6 6-6" />
                </svg>
              </button>
            </div>
            {desktopLinks.map((n) => (
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

        <div
          id="services-mega-menu"
          hidden={!megaOpen}
          onMouseEnter={clearIntentTimer}
          onMouseLeave={scheduleMegaClose}
          className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-68px)] overflow-y-auto border-t border-stone-light bg-ivory shadow-xl"
        >
          <nav aria-label="Services by growth stage" className="mx-auto max-w-page px-5 py-7 sm:px-8">
            <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {serviceGroups.map((group) => (
                <section key={group.slug} className="min-w-0">
                  <Link
                    href={`/services/${group.slug}`}
                    className="font-sub text-lg font-bold text-forest underline decoration-gold underline-offset-4"
                  >
                    <span className="mr-2 text-sm text-gold-ink">0{group.stage}</span>
                    {group.name}
                  </Link>
                  <p className="mt-2 text-sm text-mute">{group.tagline}</p>
                  <ul className="mt-3 space-y-1">
                    {getServicesByGroup(group.slug).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={service.path}
                          className="block min-h-[40px] py-2 text-sm text-obsidian underline-offset-4 hover:text-forest hover:underline focus-visible:text-forest focus-visible:underline motion-reduce:transition-none"
                        >
                          {service.menuLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-stone-light pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/services" className="font-sub font-bold text-forest underline decoration-gold underline-offset-4">
                View all services
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[3px] bg-forest px-5 font-sub text-sm font-bold text-ivory hover:bg-[#0E6236]"
              >
                Start a Growth Conversation
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto bg-forest text-ivory on-dark adire lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-page flex-col px-5 py-6">
            {nav.map((n) => (
              n.href === "/services" ? (
                <div key={n.href} className="border-b border-ivory/15 py-4">
                  <h2 className="font-display text-4xl font-extrabold">{n.label}</h2>
                  <Link href="/services" className="mt-4 flex min-h-[44px] items-center font-sub font-bold text-gold underline underline-offset-4">
                    All services
                  </Link>
                  <div className="mt-1">
                    {serviceGroups.map((group) => {
                      const expanded = openGroup === group.slug;
                      const panelId = `mobile-services-${group.slug}`;
                      return (
                        <section key={group.slug} className="border-t border-ivory/15">
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            onClick={() => setOpenGroup(expanded ? null : group.slug)}
                            className="flex min-h-[48px] w-full items-center justify-between gap-3 py-2 text-left font-sub text-lg font-bold"
                          >
                            <span><span className="mr-2 text-sm text-gold-soft">0{group.stage}</span>{group.name}</span>
                            <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="m4 7 6 6 6-6" />
                            </svg>
                          </button>
                          <div id={panelId} hidden={!expanded} className="pb-3 pl-3">
                            <Link
                              href={`/services/${group.slug}`}
                              className="flex min-h-[44px] items-center font-semibold text-gold underline underline-offset-4"
                            >
                              All {group.name} services
                            </Link>
                            <ul className="border-l border-ivory/25 pl-4">
                              {getServicesByGroup(group.slug).map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={service.path}
                                    className="flex min-h-[44px] items-center py-2 text-[15px] text-ivory/90 underline-offset-4 hover:underline"
                                  >
                                    {service.menuLabel}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={n.href}
                  href={n.href}
                  className="border-b border-ivory/15 py-4 font-display text-4xl font-extrabold"
                  aria-current={isActive(n.href) ? "page" : undefined}
                >
                  {n.label}
                </Link>
              )
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
    </>
  );
}
