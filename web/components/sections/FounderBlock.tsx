import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export function FounderBlock({ compact = false }: { compact?: boolean }) {
  return (
    <Section tone="white" labelledBy="founder-heading">
      <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-14">
        <div className="adire grid aspect-square w-40 place-items-center bg-forest md:w-full">
          <Image src="/logo-white.svg" alt="Correct Marketer NG logo mark" width={120} height={59} className="h-auto w-[120px]" />
        </div>
        <div>
          <Heading id="founder-heading">{site.founder.name}</Heading>
          <p className="mt-2 font-sub text-lg font-bold text-gold-ink">{site.founder.title}</p>
          <p className="mt-5 max-w-2xl text-lg">
            An agentic AI workflow architect, web developer and digital marketing strategist specialising in SEO and paid advertising. Muheeb founded Correct Marketer NG to fix what he sees as most businesses' real problem: not a marketing problem, but a systems problem.
          </p>
          {!compact && (
            <p className="mt-4 max-w-2xl text-mute">
              He builds integrated growth systems across SEO, paid media, automation and AI that compound and scale, and works with clients across Nigeria and internationally, including the UAE and UK.
            </p>
          )}
          <div className="mt-7">
            <Button href="/contact" variant="forest" event="service_cta_click" params={{ source: "founder_block", cta: "Work With Muheeb" }}>
              Work With Muheeb
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
