import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@/components/tracking/Analytics";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { OneSignalInit } from "@/components/tracking/OneSignalInit";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Self-hosted variable fonts (Fraunces and Manrope, SIL Open Font License). Bundling them means the
// build never depends on fonts.googleapis.com, which was breaking Vercel builds.
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const frauncesAccent = localFont({
  src: [{ path: "./fonts/fraunces-latin-wght-italic.woff2", weight: "100 900", style: "italic" }],
  variable: "--font-accent",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const manrope = localFont({
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-sub",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const manropeBody = localFont({
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-MMRD9FB9V2";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Correct Marketer NG | AI-Powered Digital Growth Agency in Lagos",
    template: "%s | Correct Marketer NG",
  },
  description:
    "Correct Marketer NG helps Nigerian businesses turn online visibility into measurable growth with AI-powered marketing, SEO, paid advertising, conversion-focused websites and automation.",
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  alternates: { canonical: site.url },
  icons: {
    icon: "/logo-color.svg",
    shortcut: "/logo-color.svg",
    apple: "/logo-color.svg",
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_NG", url: site.url },
  twitter: { card: "summary_large_image" },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: "#0B4D2C", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${fraunces.variable} ${manrope.variable} ${manropeBody.variable} ${frauncesAccent.variable}`}>
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="beforeInteractive" />
        <Script id="gtag-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
        `}</Script>
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
        <OneSignalInit />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
