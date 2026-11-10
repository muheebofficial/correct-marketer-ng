import Link from "next/link";
import { budgetArticleMeta, budgetArticleReadingMinutes } from "@/lib/content/budgetArticle";
import { formatDate } from "@/lib/insights";
import { site } from "@/lib/site";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-forest text-ivory">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-4 font-sub text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Correct Marketer NG / Blog</p>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">Ideas that move your business forward.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/85">Practical guidance to attract, nurture, convert and scale in Nigeria.</p>
        </div>
      </section>
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8 sm:py-16" aria-label="Latest articles">
        <article className="max-w-4xl overflow-hidden rounded-sm border border-stone-light bg-white shadow-sm">
          <div className="h-2 bg-gold" />
          <div className="p-6 sm:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-sub text-sm font-bold text-mute">
              <span className="rounded-full bg-forest/10 px-3 py-1 text-forest">{budgetArticleMeta.category}</span>
              <time dateTime={budgetArticleMeta.published}>{formatDate(budgetArticleMeta.published)}</time>
              <span>{budgetArticleReadingMinutes} min read</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-obsidian sm:text-4xl">
              <Link className="hover:text-forest" href={`/blog/${budgetArticleMeta.slug}`}>{budgetArticleMeta.title}</Link>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-mute">{budgetArticleMeta.excerpt}</p>
            <Link href={`/blog/${budgetArticleMeta.slug}`} className="mt-7 inline-flex min-h-12 items-center rounded-sm bg-forest px-6 font-sub font-bold text-ivory hover:bg-[#0E6236]">
              Read the article <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
        <p className="mt-12 text-sm text-mute">Published by {site.name}</p>
      </section>
    </div>
  );
}
