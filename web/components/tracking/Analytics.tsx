"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Consent banner + analytics loader.
 * - UTM / landing page / referrer are captured for lead attribution regardless (first-party, only sent when a visitor submits a form).
 * - Third-party tags (GA4, Meta Pixel, LinkedIn, Google Ads) load only after the visitor accepts.
 */
export function Analytics() {
  const [consent, setConsent] = useState<"unknown" | "granted" | "denied">("unknown");

  useEffect(() => {
    captureAttribution();
    try {
      const saved = localStorage.getItem("cm_consent");
      if (saved === "granted" || saved === "denied") setConsent(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    const marks = [25, 50, 75, 90];
    const fired = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      marks.forEach((m) => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { percent: m });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [consent]);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem("cm_consent", value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "granted" && (
        <>
          {(GA4 || ADS) && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4 || ADS}`} strategy="afterInteractive" />
              <Script id="gtag-init" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${GA4 ? `gtag('config', '${GA4}');` : ""}
                ${ADS ? `gtag('config', '${ADS}');` : ""}
              `}</Script>
            </>
          )}
          {META && (
            <Script id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${META}');fbq('track','PageView');
            `}</Script>
          )}
          {LINKEDIN && (
            <Script id="linkedin-insight" strategy="afterInteractive">{`
              _linkedin_partner_id = "${LINKEDIN}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
              var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");
              b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);
            `}</Script>
          )}
        </>
      )}

      {consent === "unknown" && (
        <div role="region" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-[4px] border border-stone-light bg-white p-4 shadow-xl sm:bottom-5 sm:left-5 sm:right-auto">
          <p className="text-sm">
            We use cookies to understand which pages and campaigns bring in enquiries. Nothing is loaded until you choose.{" "}
            <Link href="/cookies" className="font-semibold text-forest underline">Cookie Policy</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => choose("granted")} className="min-h-[44px] rounded-[3px] bg-forest px-4 font-sub text-sm font-bold text-ivory">Accept</button>
            <button onClick={() => choose("denied")} className="min-h-[44px] rounded-[3px] border border-obsidian/40 px-4 font-sub text-sm font-bold">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
