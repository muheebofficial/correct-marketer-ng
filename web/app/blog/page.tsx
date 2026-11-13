import Link from "next/link";
import { PostList } from "@/components/sections/PostList";
import { budgetArticleMeta } from "@/lib/content/budgetArticle";
import { categoriesOf, slugify } from "@/lib/insights";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Blog: SEO, AI & Growth Strategy for Nigerian Businesses",
  description: "Practical articles on SEO, paid advertising, AI automation, websites and lead generation for Nigerian business owners, without the jargon.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const categories = categoriesOf(posts);
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-forest text-ivory">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-4 font-sub text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Correct Marketer NG / Blog</p>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">Ideas that move your business forward.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/85">Practical guidance to attract, nurture, convert and scale in Nigeria.</p>
        </div>
      </section>
      <section className="mx-auto max-w-page px-5 py-12 sm:px-8 sm:py-16" aria-label="All articles">
        <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${slugify(category)}`} className="min-h-[40px] rounded-full border border-obsidian/30 px-4 py-2 font-sub text-sm font-bold hover:bg-forest hover:text-ivory">{category}</Link>
          ))}
        </nav>
        <PostList posts={posts} />
        <p className="mt-12 text-sm text-mute">Published by {site.name}. All articles are part of one growing library.</p>
      </section>
    </div>
  );
}
