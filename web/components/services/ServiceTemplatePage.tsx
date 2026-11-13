import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessStepper } from "@/components/sections/ProcessStepper";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading, Section } from "@/components/ui/Section";
import { serviceCopy } from "@/lib/content/serviceCopy";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getGroup, getNextGroup, getRelatedServices, getService, getServicesByGroup } from "@/lib/services-taxonomy";
import { waLink } from "@/lib/site";

export function templateMetadata(slug: string) {
  const s = getService(slug);
  if (!s) return {};
  const full = `${s.name} in Nigeria | Correct Marketer NG`;
  const title = full.length <= 70 ? full : `${s.menuLabel} in Nigeria | Correct Marketer NG`;
  const description = `${s.snippet} ${s.nigeriaAngle}`.slice(0, 158).replace(/\s+\S*$/, "") + (`${s.snippet} ${s.nigeriaAngle}`.length > 158 ? "…" : "");
  return buildMetadata({ title, description, path: s.path });
}

export function ServiceTemplatePage({ slug }: { slug: string }) {
  const s = getService(slug);
  const copy = serviceCopy[slug];
  if (!s || !copy) notFound();
  const group = getGroup(s.groupSlug)!;
  const siblings = getServicesByGroup(s.groupSlug).filter((x) => x.slug !== s.slug);
  const related = getRelatedServices(s.slug);
  const next = getNextGroup(s.groupSlug);
  const waMessage = `Hi Correct Marketer NG, I'm interested in ${s.name}. Can we talk?`;
  const crumbs = [{ name: "Services", path: "/services" }, { name: group.name, path: `/services/${group.slug}` }, { name: s.menuLabel, path: s.path }];

  return (
    <>
      <JsonLd data={[serviceSchema({ name: s.name, description: s.snippet, path: s.path }), breadcrumbSchema([{ name: "Home", path: "/" }, ...crumbs])]} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${group.name} · Digital growth in Nigeria`}
        title={s.name}
        sub={s.snippet}
        cta="Talk to us about this"
        ctaHref="#start"
        waMessage={waMessage}
        source={`service_${s.slug}_hero`}
      />

      <Section labelledBy="problem-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading id="problem-h">The problem we solve</Heading>
          <p className="text-lg">{copy.problem}</p>
        </div>
      </Section>

      <Section tone="white" labelledBy="deliver-h">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading id="deliver-h">What you get</Heading>
            <ul className="mt-6 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-forest">Who it&apos;s for</h2>
            <ul className="mt-6 space-y-3">
              {copy.forWho.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-forest" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="obsidian" labelledBy="ng-h">
        <Heading id="ng-h" tone="dark">Why this matters in Nigeria</Heading>
        <p className="mt-6 max-w-3xl text-xl text-ivory/90">{s.nigeriaAngle}</p>
      </Section>

      <Section labelledBy="process-h">
        <Heading id="process-h" className="mb-10">Our process, applied to {s.menuLabel.toLowerCase()}</Heading>
        <ProcessStepper />
      </Section>

      <Section tone="white" labelledBy="group-h">
        <h2 id="group-h" className="font-display text-3xl font-extrabold text-forest">
          Part of <Link href={`/services/${group.slug}`} className="underline decoration-gold decoration-2 underline-offset-4">{group.name}</Link>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-mute">{group.tagline}</p>
        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="font-sub text-lg font-bold text-forest">Works well with</h3>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="border border-stone-light p-4">
                  <Link href={r.path} className="font-sub font-bold text-forest underline-offset-4 hover:underline">{r.menuLabel}</Link>
                  <p className="mt-1 text-sm text-mute">{r.snippet}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 border-t border-stone-light pt-6">
          <h3 className="font-sub text-lg font-bold text-forest">More in {group.name}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {siblings.map((x) => (
              <li key={x.slug}><Link href={x.path} className="font-semibold text-forest underline decoration-gold underline-offset-4">{x.menuLabel}</Link></li>
            ))}
          </ul>
          {next && <p className="mt-6 text-mute">Next stage: <Link href={`/services/${next.slug}`} className="font-semibold text-forest underline decoration-gold underline-offset-4">{next.name}</Link>. {next.tagline}</p>}
        </div>
      </Section>

      <Section labelledBy="faq-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Heading id="faq-h">Questions we hear about {s.menuLabel.toLowerCase()}</Heading>
          <FAQ faqs={copy.faqs} />
        </div>
      </Section>

      <Section tone="white" id="start" labelledBy="start-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Heading id="start-h">Talk to us about {s.menuLabel}</Heading>
            <p className="mt-4 text-lg text-mute">Tell us a little about your business. We&apos;ll come back with an honest view of where you stand and what to do first.</p>
            <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-[6px]">
              Prefer WhatsApp? Message us directly
            </a>
          </div>
          <LeadForm intent="contact" submitLabel="Start the conversation" successWaMessage={waMessage} />
        </div>
      </Section>

      <FooterCTA source={`service_${s.slug}`} waMessage={waMessage} />
    </>
  );
}
