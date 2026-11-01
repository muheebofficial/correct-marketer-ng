import { LeadForm } from "@/components/forms/LeadForm";

export function ServiceLeadForm({
  pageType,
  serviceSlug,
  serviceName,
  groupSlug,
  groupName,
  heading,
  intro,
  ctaLabel,
  anchorId = "start",
}: {
  pageType: "service" | "hub";
  serviceSlug?: string;
  serviceName?: string;
  groupSlug?: string;
  groupName?: string;
  heading: string;
  intro?: string;
  ctaLabel: string;
  anchorId?: string;
}) {
  const source = pageType === "service" ? "service-page" : "hub-page";
  const serviceContext = {
    source,
    serviceSlug,
    serviceName,
    serviceGroup: groupName ?? groupSlug,
    groupName,
  };

  return (
    <section id={anchorId} className="mx-auto max-w-page px-5 py-10 sm:px-8 lg:py-14">
      <div className="grid gap-10 rounded-[3px] border border-obsidian/15 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <div>
          <p className="font-sub text-sm font-bold uppercase tracking-wide text-gold-ink">Let’s talk</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none text-forest">{heading}</h2>
          {intro && <p className="mt-4 max-w-xl text-lg text-mute">{intro}</p>}
        </div>
        <LeadForm
          intent="contact"
          submitLabel={ctaLabel}
          context={serviceContext}
        />
      </div>
    </section>
  );
}
