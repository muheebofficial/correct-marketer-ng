import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { ProcessStepper } from "@/components/sections/ProcessStepper";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { Heading, Section } from "@/components/ui/Section";
import { getCollection } from "@/lib/api";
import { caseStudies } from "@/lib/content/caseStudies";
import { industries } from "@/lib/content/industries";
import { posts as defaultPosts } from "@/lib/content/posts";
import { services } from "@/lib/content/services";
import type { CaseStudy, Post, Service } from "@/lib/content/types";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { waLink } from "@/lib/site";

export const revalidate = 300;

async function load(slug: string) {
  const all = await getCollection<Service>("services", services);
  return all.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await load(params.slug);
  if (!s) return {};
  return buildMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const s = await load(params.slug);
  if (!s) notFound();

  const [allCases, allPosts, allServices] = await Promise.all([
    getCollection<CaseStudy>("case_studies", caseStudies),
    getCollection<Post>("posts", defaultPosts),
    getCollection<Service>("services", services),
  ]);
  const proof = allCases.filter((c) => !c.isPlaceholder).slice(0, 2);
  const relatedPosts = allPosts.filter((p) => s.posts.includes(p.slug));
  const relatedIndustries = industries.filter((i) => s.industries.includes(i.slug));
  const relatedServices = allServices.filter((candidate) => s.relatedServices.includes(candidate.slug));
  const path = `/services/${s.slug}`;

  return (
    <>
      <JsonLd data={serviceSchema({ name: s.name, description: s.seoDescription, path })} />
      <ServiceHero
        name={s.name}
        title={s.heroHeadline}
        sub={s.heroSub}
        journey={s.heroJourney}
        cta={s.heroCta}
        waMessage={s.waMessage}
        source={`service_${s.slug}_hero`}
        path={path}
      />

      <Section labelledBy="problem-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading id="problem-h">{s.problem.title}</Heading>
          <ul className="border-t border-obsidian/20">
            {s.problem.points.map((p) => (
              <li key={p} className="border-b border-obsidian/20 py-4 text-lg">{p}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" labelledBy="solution-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Heading id="solution-h">How we solve it</Heading>
          <div className="space-y-4 text-lg">
            {s.solution.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {s.how.map((h, i) => (
            <li key={h.title} className="border-t-4 border-gold pt-4">
              <p className="font-display text-3xl font-extrabold text-forest">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-sub text-xl font-bold">{h.title}</h3>
              <p className="mt-2 text-mute">{h.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="why-h">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Heading id="why-h">Why choose Correct Marketer NG?</Heading>
            <p className="mt-4 text-lg text-mute">A practical partner for {s.name.toLowerCase()} work, focused on clear decisions and measurable progress.</p>
          </div>
          <ul className="divide-y divide-obsidian/20 border-y border-obsidian/20">
            {s.whyChoose.map((reason) => (
              <li key={reason.title} className="py-5">
                <h3 className="font-sub text-xl font-bold text-forest">{reason.title}</h3>
                <p className="mt-2 text-mute">{reason.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="deliver-h">
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
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-forest">Who it's for</h2>
            <ul className="mt-6 space-y-3">
              {s.whoFor.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-forest" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="obsidian" labelledBy="benefits-h">
        <Heading id="benefits-h" tone="dark">What changes for your business</Heading>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {s.benefits.map((b) => (
            <div key={b.title} className="border-t-2 border-gold pt-4">
              <h3 className="font-sub text-xl font-bold">{b.title}</h3>
              <p className="mt-1 text-ivory/85">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="process-h">
        <Heading id="process-h" className="mb-10">Our process, applied to {s.name.toLowerCase()}</Heading>
        <ProcessStepper />
      </Section>

      <Section tone="white" labelledBy="proof-h">
        <Heading id="proof-h">Proof</Heading>
        {proof.length > 0 ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {proof.map((c) => (
              <li key={c.slug} className="border border-stone-light p-6">
                <p className="font-sub text-sm font-bold text-gold-ink">{c.industry}</p>
                <Link href={`/case-studies/${c.slug}`} className="mt-1 block font-sub text-xl font-bold text-forest underline-offset-4 hover:underline">{c.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-2xl text-lg text-mute">
            We only publish results we can verify. Read how we report on outcomes in our{" "}
            <Link href="/case-studies" className="font-semibold text-forest underline decoration-gold underline-offset-4">case study format</Link>, or ask us to walk you through relevant work on a call.
          </p>
        )}
        {relatedIndustries.length > 0 && (
          <p className="mt-8 text-mute">
            Industries we build this for:{" "}
            {relatedIndustries.map((i, idx) => (
              <span key={i.slug}>
                <Link href={`/industries#${i.slug}`} className="font-semibold text-forest underline decoration-gold underline-offset-4">{i.name}</Link>
                {idx < relatedIndustries.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
        {relatedServices.length > 0 && (
          <div className="mt-8 border-t border-stone-light pt-6">
            <h3 className="font-sub text-lg font-bold text-forest">Related services</h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-semibold text-forest underline decoration-gold underline-offset-4">{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {relatedPosts.length > 0 && (
          <div className="mt-6">
            <p className="font-sub font-bold">Read next</p>
            <ul className="mt-2 space-y-1">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/insights/${p.slug}`} className="text-forest underline decoration-gold underline-offset-4">{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section labelledBy="faq-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Heading id="faq-h">Questions we hear about {s.name.toLowerCase()}</Heading>
          <FAQ faqs={s.faqs} />
        </div>
      </Section>

      <Section tone="white" id="start" labelledBy="start-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Heading id="start-h">{s.heroCta}</Heading>
            <p className="mt-4 text-lg text-mute">
              Tell us a little about your business. We'll come back with an honest view of where you stand and what to do first.
            </p>
            <a href={waLink(s.waMessage)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-sub font-bold text-forest underline decoration-gold decoration-2 underline-offset-[6px]">
              Prefer WhatsApp? Message us directly
            </a>
          </div>
          <LeadForm intent={s.intent} submitLabel={s.cta} successWaMessage={s.waMessage} />
        </div>
      </Section>

      <FooterCTA source={`service_${s.slug}`} waMessage={s.waMessage} />
    </>
  );
}
