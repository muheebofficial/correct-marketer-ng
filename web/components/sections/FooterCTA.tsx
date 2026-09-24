import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function FooterCTA({
  heading = "Ready to stop guessing and start engineering growth?",
  body = "Let's build the system behind your next stage of growth.",
  cta = "Start a Growth Conversation",
  href = "/contact",
  waMessage,
  source,
}: {
  heading?: string;
  body?: string;
  cta?: string;
  href?: string;
  waMessage?: string;
  source: string;
}) {
  return (
    <section aria-label="Next step" className="on-dark adire bg-forest text-ivory">
      <div className="mx-auto max-w-page px-5 py-16 sm:px-8 md:py-24">
        <div className="gold-rule mb-6" />
        <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.02]">{heading}</h2>
        <p className="mt-4 max-w-xl text-lg text-ivory/90">{body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={href} variant="gold" event="service_cta_click" params={{ source, cta }}>{cta}</Button>
          <WhatsAppButton message={waMessage} source={`${source}_footer_cta`} />
        </div>
      </div>
    </section>
  );
}
