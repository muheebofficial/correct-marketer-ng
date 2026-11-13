import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { OneSignalSubscribeButton } from "@/components/tracking/OneSignalSubscribeButton";
import { categoriesOf, getPosts, slugify } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Blog: SEO, Ads, AI & Growth Strategy for Nigerian Businesses",
  description:
    "Practical articles on SEO, paid advertising, AI automation, websites and lead generation for Nigerian business owners, without the jargon.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const categories = categoriesOf(posts);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        title="Get smarter about growth."
        sub="Practical marketing, SEO, AI and growth strategy for Nigerian businesses, without the jargon."
        source="blog_index"
      />
      <Section>
        <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c} href={`/blog/category/${slugify(c)}`} className="min-h-[40px] rounded-full border border-obsidian/30 px-4 py-2 font-sub text-sm font-bold hover:bg-forest hover:text-ivory">
              {c}
            </Link>
          ))}
        </nav>
        <div className="mb-8">
          <OneSignalSubscribeButton />
        </div>
        <PostList posts={posts} />
      </Section>
      <FooterCTA source="blog_index" />
    </>
  );
}
