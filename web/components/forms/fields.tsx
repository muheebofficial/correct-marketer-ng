import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-[48px] rounded-[3px] border border-obsidian/40 bg-white px-3.5 py-2.5 font-body text-base text-obsidian placeholder:text-mute/70";

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-sub text-[15px] font-bold">
        {label}
        {required ? <span className="text-[#9B1C1C]"> *</span> : <span className="font-body text-sm font-normal text-mute"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-sm text-mute">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-[#9B1C1C]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Turn a FastAPI 422 response into { field: message }. */
export function parseFieldErrors(detail: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (Array.isArray(detail)) {
    for (const d of detail as { loc?: (string | number)[]; msg?: string }[]) {
      const field = d.loc?.[d.loc.length - 1];
      if (typeof field === "string" && d.msg) out[field] = d.msg.replace(/^Value error, /, "");
    }
  }
  return out;
}
