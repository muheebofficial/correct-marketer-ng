import type { ReactNode } from "react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import type { TrackEvent } from "@/lib/track";

type Variant = "gold" | "forest" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-obsidian hover:bg-[#DB9410]",
  forest: "bg-forest text-ivory hover:bg-[#0E6236]",
  "ghost-light": "border border-ivory/50 text-ivory hover:bg-ivory/10",
  "ghost-dark": "border border-obsidian/40 text-obsidian hover:bg-obsidian/5",
};

type Props = {
  href: string;
  variant?: Variant;
  event?: TrackEvent;
  params?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "gold", event, params, className = "", children }: Props) {
  return (
    <TrackedLink
      href={href}
      event={event}
      params={params}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-[3px] px-6 py-3 font-sub text-[15px] font-bold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </TrackedLink>
  );
}
