export const site = {
  name: "Correct Marketer NG",
  tagline: "We engineer your growth.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://correctmarketer.com.ng").replace(/\/$/, ""),
  email: "muheeb@muheebsulaiman.com",
  whatsappNumber: "2349110172901",
  founded: 2021,
  location: { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  founder: {
    name: "Muheeb Sulaiman",
    title: "Founder & Lead Strategist",
    slug: "muheeb-sulaiman",
  },
  // Add real profile URLs here. Empty entries are simply not rendered, so nothing fake ships.
  social: [] as { label: string; href: string }[],
};

/** Build a WhatsApp deep link with a pre-filled message. */
export function waLink(message: string = "Hi Correct Marketer NG, I want to discuss growing my business."): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
