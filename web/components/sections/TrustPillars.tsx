import { Heading, Section } from "@/components/ui/Section";
import { pillars } from "@/lib/content/home";

export function TrustPillars() {
  return (
    <Section tone="obsidian" labelledBy="trust-heading">
      <Heading id="trust-heading" tone="dark">Why businesses work with Correct Marketer</Heading>
      <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.title} className="border-t-2 border-gold pt-5">
            <h3 className="font-sub text-2xl font-bold">{p.title}</h3>
            <p className="mt-2 text-ivory/85">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
