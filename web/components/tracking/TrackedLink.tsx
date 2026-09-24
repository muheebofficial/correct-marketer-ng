"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";

type Props = {
  href: string;
  event?: TrackEvent;
  params?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** A link that reports clicks (WhatsApp, phone, service CTAs) to analytics. */
export function TrackedLink({ href, event, params, className, children, ...rest }: Props) {
  const onClick = event ? () => track(event, params) : undefined;
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    const opensTab = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
