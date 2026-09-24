"use client";

export type TrackEvent =
  | "whatsapp_click"
  | "contact_form_submit"
  | "audit_request"
  | "newsletter_signup"
  | "service_cta_click"
  | "case_study_view"
  | "phone_click"
  | "scroll_depth";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
  }
}

/** Send one event to every analytics tool that is loaded. Safe to call when none are. */
export function track(event: TrackEvent, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_path: window.location.pathname };
  window.gtag?.("event", event, payload);
  window.dataLayer?.push({ event, ...payload });
  if (event === "contact_form_submit" || event === "audit_request") window.fbq?.("track", "Lead", payload);
  if (event === "whatsapp_click") window.fbq?.("track", "Contact", payload);
}
