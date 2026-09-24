import { Heading, Section } from "@/components/ui/Section";
import { problems } from "@/lib/content/home";

export function ProblemSection() {
  return (
    <Section labelledBy="problem-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading id="problem-heading">Your marketing shouldn't feel like gambling.</Heading>
          <p className="mt-5 max-w-md text-lg text-mute">
            Most businesses don't have a marketing problem. They have a system problem: pieces that don't connect, and money going in without a clear line to what comes out.
          </p>
        </div>
        <ul className="border-t border-obsidian/20">
          {problems.map((p) => (
            <li key={p.title} className="grid gap-1 border-b border-obsidian/20 py-5 sm:grid-cols-[1fr_1.1fr] sm:gap-8">
              <h3 className="font-sub text-xl font-bold text-obsidian">{p.title}</h3>
              <p className="text-mute">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
