"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroSystem } from "./HeroSystem";

export function Hero() {
  const [parallax, setParallax] = useState({ enabled: false, offset: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateParallax = () => {
      const enabled = window.innerWidth >= 1024 && !reducedMotion.matches;
      setParallax({
        enabled,
        offset: enabled ? Math.min(window.scrollY * 0.12, 28) : 0,
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    reducedMotion.addEventListener("change", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
      reducedMotion.removeEventListener("change", updateParallax);
    };
  }, []);

  return (
    <section aria-labelledby="hero-heading" className="on-dark adire bg-forest text-ivory">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:py-28 xl:grid-cols-[2.2fr_1fr] 2xl:grid-cols-[2.6fr_1fr]">
        <div>
          <p className="mb-5 font-sub text-[13px] font-bold tracking-[0.08em] text-gold-soft">
            AI-POWERED MARKETING · DIGITAL GROWTH · WEB DEVELOPMENT
          </p>
          <h1 id="hero-heading" className="font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.08] tracking-normal">
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

        <div className="relative isolate overflow-x-clip">
          <span
            aria-hidden="true"
            className="parallax-orb parallax-orb--one"
            style={parallax.enabled ? { transform: `translate3d(0, ${parallax.offset * 0.15}px, 0)` } : undefined}
          />
          <span
            aria-hidden="true"
            className="parallax-orb parallax-orb--two"
            style={parallax.enabled ? { transform: `translate3d(0, ${parallax.offset * 0.25}px, 0)` } : undefined}
          />
          <span
            aria-hidden="true"
            className="parallax-orb parallax-orb--three"
            style={parallax.enabled ? { transform: `translate3d(0, ${parallax.offset * 0.35}px, 0)` } : undefined}
          />

          <div className="parallax-panel">
            <HeroSystem />
          </div>
        </div>
      </div>
    </section>
  );
}
