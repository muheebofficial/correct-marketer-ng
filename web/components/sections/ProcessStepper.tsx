"use client";

import { useState } from "react";
import { process } from "@/lib/content/home";

/** The Correct Marketer Growth Process. This one is a real sequence, so numbering is meaningful. */
export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const step = process[active];

  return (
    <div>
      <div role="group" aria-label="Growth process steps" className="grid grid-cols-7 gap-1.5">
        {process.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`Step ${i + 1}: ${p.name}`}
            className="group flex min-h-[64px] flex-col items-start justify-between border-t-4 px-1 pt-2 text-left transition-colors sm:px-2"
            style={{ borderColor: i <= active ? "#C8850A" : "#D8D4C8" }}
          >
            <span className={`font-display text-2xl font-extrabold ${i === active ? "text-forest" : "text-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={`hidden font-sub text-[13px] font-bold lg:block ${i === active ? "text-forest" : "text-mute"}`}>{p.name}</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-8 max-w-2xl">
        <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none text-forest">{step.name}</p>
        <p className="mt-3 text-lg text-mute">{step.body}</p>
      </div>
    </div>
  );
}
