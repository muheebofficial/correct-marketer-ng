"use client";

import { usePathname } from "next/navigation";
import { waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { waMessageFor } from "@/lib/waContext";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  return (
    <a
      href={waLink(waMessageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-gold px-5 font-sub text-[15px] font-bold text-obsidian shadow-lg shadow-black/20 hover:bg-[#DB9410] sm:bottom-6 sm:right-6"
      aria-label="Chat with Correct Marketer NG on WhatsApp"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z" /></svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
