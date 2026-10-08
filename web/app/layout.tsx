import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Bricolage_Grotesque, Lora, Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/tracking/Analytics";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { OneSignalInit } from "@/components/tracking/OneSignalInit";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const display = Big_Shoulders_Display({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const sub = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-sub", display: "swap" });
const body = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const accent = Lora({ subsets: ["latin"], style: ["italic"], weight: ["400"], variable: "--font-accent", display: "swap" });

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
    <html lang="en-NG" className={`${display.variable} ${sub.variable} ${body.variable} ${accent.variable}`}>
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
