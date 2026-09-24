import type { ReactNode } from "react";

type Tone = "ivory" | "white" | "forest" | "obsidian";
const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-obsidian",
  white: "bg-white text-obsidian",
  forest: "bg-forest text-ivory on-dark",
  obsidian: "bg-obsidian text-ivory on-dark",
};

export function Section({
  tone = "ivory",
  children,
  className = "",
  id,
  labelledBy,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-page px-5 py-16 sm:px-8 md:py-24">{children}</div>
    </section>
  );
}

export function Heading({
  id,
  children,
  tone = "light",
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.02] tracking-tight ${
        tone === "dark" ? "text-ivory" : "text-forest"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
