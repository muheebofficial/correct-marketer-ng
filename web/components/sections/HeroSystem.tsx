const stages = [
  { label: "Someone searches or sees your ad", note: "The right person, at the right moment" },
  { label: "Your website makes the case", note: "Fast on mobile, clear in five seconds" },
  { label: "They message you on WhatsApp", note: "One tap, with the source recorded" },
  { label: "Follow-up runs without chasing", note: "Answers, reminders and lead scoring" },
  { label: "A customer, traced to the first click", note: "You know what worked" },
];

/** The hero's single orchestrated moment: a growth system drawing itself, stage by stage. */
export function HeroSystem() {
  return (
    <figure aria-label="How a growth system works, from first click to customer" className="relative pl-8">
      <div aria-hidden="true" className="hero-line absolute bottom-3 left-[7px] top-3 w-[3px] rounded bg-gold" />
      <ol className="space-y-6">
        {stages.map((s, i) => (
          <li key={s.label} className="hero-stage relative" style={{ animationDelay: `${0.5 + i * 0.28}s` }}>
            <span
              aria-hidden="true"
              className={`absolute -left-[33px] top-1.5 h-[17px] w-[17px] rounded-full border-[3px] border-forest ${
                i === stages.length - 1 ? "hero-dot bg-gold" : "bg-ivory"
              }`}
            />
            <p className="font-sub text-xl font-bold leading-snug text-ivory">{s.label}</p>
            <p className="text-sm text-ivory/80">{s.note}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-8 border-t border-ivory/25 pt-4 font-accent text-lg italic text-ivory/90">
        One connected system, not five separate tools.
      </figcaption>
    </figure>
  );
}
