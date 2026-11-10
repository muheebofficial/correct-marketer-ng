export const site = {
  name: "Correct Marketer NG",
  tagline: "Attract, Nurture, Convert and Scale",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://correctmarketer.com.ng").replace(/\/$/, ""),
  email: "muheeb@correctmarketer.com.ng",
  whatsappNumber: "2349110172901",
  founded: 2021,
  location: { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  founder: {
    name: "Muheeb Sulaiman",
    title: "Founder & Lead Strategist",
    slug: "muheeb-sulaiman",
  },
  social: [] as { label: string; href: string }[],
};

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
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
