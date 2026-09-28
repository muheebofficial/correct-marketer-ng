import { TrackedLink } from "@/components/tracking/TrackedLink";
import { getCollection } from "@/lib/api";
import { services } from "@/lib/content/services";
import type { Service } from "@/lib/content/types";

export async function ServiceGrid({ headingId }: { headingId?: string }) {
  const allServices = await getCollection<Service>("services", services);
  return (
    <ul aria-labelledby={headingId} className="grid gap-px border border-stone-light bg-stone-light md:grid-cols-2 lg:grid-cols-3">
      {allServices.map((s) => (
        <li key={s.slug} className="bg-ivory">
          <TrackedLink
            href={`/services/${s.slug}`}
            event="service_cta_click"
            params={{ source: "service_grid", service: s.slug }}
            className="group flex h-full flex-col p-7 transition-colors hover:bg-forest hover:text-ivory focus-visible:bg-forest focus-visible:text-ivory"
          >
            <h3 className="font-sub text-sm font-bold text-gold-ink group-hover:text-gold-soft group-focus-visible:text-gold-soft">{s.name}</h3>
            <p className="mt-3 font-display text-[2rem] font-extrabold leading-[1.05] text-forest group-hover:text-ivory group-focus-visible:text-ivory">
              {s.outcome}
            </p>
            <p className="mt-4 text-[15px] text-mute group-hover:text-ivory/90 group-focus-visible:text-ivory/90">{s.summary}</p>
            <p className="mt-4 text-sm text-mute group-hover:text-ivory/80 group-focus-visible:text-ivory/80">{s.tags.join(" · ")}</p>
            <span className="mt-auto pt-6 font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-[6px] group-hover:text-gold-soft group-focus-visible:text-gold-soft">
              {s.cta}
            </span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
