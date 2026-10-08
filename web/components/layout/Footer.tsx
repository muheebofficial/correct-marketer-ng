import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getCollection } from "@/lib/api";
import { services } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";
import { site, waLink } from "@/lib/site";

const company = [
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];
const resources = [
  { label: "Insights", href: "/insights" },
  { label: "Free Audits", href: "/audits" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-sub text-base font-bold text-gold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ivory/90 underline-offset-4 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const allServices = await getCollection<Service>("services", services);
  return (
    <footer className="on-dark bg-obsidian text-ivory">
      <div className="mx-auto max-w-page px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo-white.svg" alt="Correct Marketer NG logo" width={52} height={26} className="h-[26px] w-[52px]" />
              <p className="font-sub text-lg font-bold leading-tight">
                Correct Marketer NG
              </p>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-gold">{site.tagline}</p>
            <div className="mt-8 max-w-md">
              <h2 className="font-sub text-base font-bold">Get Smarter About Growth</h2>
              <p className="mb-4 mt-1 text-sm text-ivory/85">
                Practical marketing, SEO, AI and growth strategies for Nigerian businesses, without the jargon.
              </p>
              <NewsletterForm tone="dark" idPrefix="footer-nl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Col title="Services" links={allServices.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
            <Col title="Company" links={company} />
            <Col title="Resources" links={resources} />
            <div>
              <h2 className="font-sub text-base font-bold text-gold">Contact</h2>
              <ul className="mt-3 space-y-2 text-ivory/90">
                <li>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">WhatsApp</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="break-all underline-offset-4 hover:underline">{site.email}</a>
                </li>
                <li>Lagos, Nigeria</li>
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/20 pt-6 text-sm text-ivory/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Correct Marketer NG. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
