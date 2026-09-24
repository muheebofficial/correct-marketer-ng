"use client";

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page: string;
  referrer: string;
};

const KEY = "cm_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Save first-touch attribution for the session. Call once on load. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {
      utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "",
      landing_page: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
    };
    UTM_KEYS.forEach((k) => (data[k] = (params.get(k) || "").slice(0, 200)));
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable: attribution is simply skipped */
  }
}

export function getAttribution(): Attribution {
  const empty: Attribution = {
    utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "",
    landing_page: "", referrer: "",
  };
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
