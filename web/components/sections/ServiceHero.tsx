import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function ServiceHero({
    name,
    title,
    sub,
    journey,
    cta,
    waMessage,
    source,
    path,
}: {
    name: string;
    title: string;
    sub: string;
    journey: [string, string, string];
    cta: string;
    waMessage: string;
    source: string;
    path: string;
}) {
    return (
        <section aria-labelledby="service-heading" className="on-dark adire overflow-hidden bg-forest text-ivory">
            <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-12 sm:px-8 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
                <div>
                    <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name, path }]} tone="dark" />
                    <p className="mt-8 font-sub text-sm font-bold text-gold-soft">DIGITAL GROWTH · NIGERIA</p>
                    <h1 id="service-heading" className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl xl:text-6xl">
                        {title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg text-ivory/90 md:text-xl">{sub}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button href="#start" variant="gold" event="service_cta_click" params={{ source, cta }}>{cta}</Button>
                        <WhatsAppButton message={waMessage} source={source} />
                    </div>
                </div>

                <figure className="service-journey relative mx-auto w-full max-w-xl lg:ml-auto">
                    <figcaption className="mb-7 font-sub text-xs font-bold uppercase tracking-[0.12em] text-gold-soft">
                        The path from problem to progress
                    </figcaption>
                    <div className="service-journey-track" aria-hidden="true" />
                    <ol className="relative space-y-7">
                        {journey.map((step, index) => (
                            <li key={step} className="service-journey-step grid grid-cols-[2.5rem_1fr] items-center gap-4" style={{ animationDelay: `${index * 180}ms` }}>
                                <span aria-hidden="true" className="service-journey-node flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-forest font-sub text-sm font-bold text-gold-soft">
                                    0{index + 1}
                                </span>
                                <span className="border-b border-ivory/20 pb-4 font-sub text-lg font-bold text-ivory sm:text-xl">{step}</span>
                            </li>
                        ))}
                    </ol>
                </figure>
            </div>
        </section>
    );
}