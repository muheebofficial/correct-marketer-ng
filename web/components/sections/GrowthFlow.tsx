"use client";

import { useState } from "react";
import { flow } from "@/lib/content/home";

/** Interactive version of the growth system: pick a stage to see what happens there. */
export function GrowthFlow() {
  const [active, setActive] = useState(0);
  const stage = flow[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14">
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-ivory/30" />
        {flow.map((f, i) => (
          <li key={f.name}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className="relative flex min-h-[48px] w-full items-center gap-4 py-1.5 text-left"
            >
              <span
                aria-hidden="true"
                className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-sub text-sm font-bold transition-colors ${
                  i === active ? "border-gold bg-gold text-obsidian" : i < active ? "border-gold bg-forest text-gold-soft" : "border-ivory/40 bg-forest text-ivory"
                }`}
              >
                {i + 1}
              </span>
              <span className={`font-sub text-lg font-bold ${i === active ? "text-gold-soft" : "text-ivory"}`}>{f.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="flex min-h-[220px] flex-col justify-center border-l-4 border-gold bg-ivory/5 p-6 sm:p-10">
        <p className="font-sub text-sm font-bold text-gold-soft">Stage {active + 1} of {flow.length}</p>
        <p className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none">{stage.name}</p>
        <p className="mt-4 max-w-xl text-lg text-ivory/90">{stage.body}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="min-h-[44px] rounded-[3px] border border-ivory/50 px-4 font-sub text-sm font-bold disabled:opacity-40"
          >
            Previous stage
          </button>
          <button
            type="button"
            onClick={() => setActive((a) => Math.min(flow.length - 1, a + 1))}
            disabled={active === flow.length - 1}
            className="min-h-[44px] rounded-[3px] bg-gold px-4 font-sub text-sm font-bold text-obsidian disabled:opacity-40"
          >
            Next stage
          </button>
        </div>
      </div>
    </div>
  );
}
