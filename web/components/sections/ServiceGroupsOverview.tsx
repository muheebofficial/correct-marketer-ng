import Link from "next/link";
import { getServicesByGroup, serviceGroups } from "@/lib/services-taxonomy";

/** /services index: every service, organised by the stage of the customer journey it supports. */
export function ServiceGroupsOverview() {
  return (
    <div className="space-y-16">
      {serviceGroups.map((g) => {
        const list = getServicesByGroup(g.slug);
        return (
          <section key={g.slug} aria-labelledby={`g-${g.slug}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-sub text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">Stage {g.stage}</p>
                <h2 id={`g-${g.slug}`} className="font-display text-4xl font-extrabold text-forest">
                  <Link href={`/services/${g.slug}`} className="underline-offset-4 hover:underline">{g.name}</Link>
                </h2>
                <p className="mt-2 max-w-2xl text-lg text-mute">{g.tagline}</p>
              </div>
              <Link href={`/services/${g.slug}`} className="font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-[6px]">See all {g.name} services</Link>
            </div>
            <ul className="mt-6 grid gap-px border border-stone-light bg-stone-light md:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <li key={s.slug} className="bg-ivory">
                  <Link href={s.path} className="group flex h-full flex-col p-6 transition-colors hover:bg-forest hover:text-ivory focus-visible:bg-forest focus-visible:text-ivory">
                    <h3 className="font-sub text-lg font-bold text-forest group-hover:text-ivory group-focus-visible:text-ivory">{s.name}</h3>
                    <p className="mt-2 text-[15px] text-mute group-hover:text-ivory/90 group-focus-visible:text-ivory/90">{s.snippet}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
