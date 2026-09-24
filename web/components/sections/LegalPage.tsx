import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function LegalPage({ title, path, updated, sections }: { title: string; path: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="mt-8 font-display text-5xl font-extrabold text-forest">{title}</h1>
      <p className="mt-2 text-sm text-mute">Last updated: {updated}</p>
      <div className="prose-cm mt-8">
        {sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="mb-2 font-sub text-xl font-bold">{s.h}</h2>
            {s.p.map((t) => <p key={t}>{t}</p>)}
          </section>
        ))}
      </div>
    </div>
  );
}
