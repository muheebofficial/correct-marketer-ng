import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroSystem } from "./HeroSystem";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark adire bg-forest text-ivory">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <p className="mb-5 font-sub text-[13px] font-bold tracking-[0.08em] text-gold-soft">
            AI-POWERED MARKETING · DIGITAL GROWTH · WEB DEVELOPMENT
          </p>
          <h1 id="hero-heading" className="font-display text-[clamp(2.75rem,7.6vw,6.25rem)] font-extrabold leading-[0.95] tracking-tight">
            Your business doesn't need more marketing noise. It needs a growth system.
          </h1>
          <div className="gold-rule my-7" />
          <p className="max-w-xl text-lg text-ivory/90 md:text-xl">
            We engineer AI-powered marketing systems that turn attention into qualified leads, customers and measurable growth.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="gold" event="service_cta_click" params={{ source: "home_hero", cta: "Start a Growth Conversation" }}>
              Start a Growth Conversation
            </Button>
            <Button href="/services" variant="ghost-light">Explore Our Services</Button>
          </div>
          <div className="mt-4">
            <WhatsAppButton source="home_hero" label="Or chat with us on WhatsApp" variant="ghost-light" className="w-full sm:w-auto" />
          </div>
          <p className="mt-6 text-sm text-ivory/80">SEO · Paid Ads · AI Automation · Websites · Conversion</p>
        </div>
        <HeroSystem />
      </div>
    </section>
  );
}
