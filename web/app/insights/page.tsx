import Link from "next/link";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { OneSignalSubscribeButton } from "@/components/tracking/OneSignalSubscribeButton";
import { categoriesOf, getPosts, slugify } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Insights: SEO, AI & Growth Strategy for Nigerian Businesses",
  description:
    "Practical articles on SEO, paid advertising, AI automation, websites and lead generation for Nigerian business owners, without the jargon.",
  path: "/insights",
});

export default async function InsightsPage() {
  const posts = await getPosts();
  const categories = categoriesOf(posts);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        title="Get smarter about growth."
        sub="Practical marketing, SEO, AI and growth strategy for Nigerian businesses, without the jargon."
        source="insights_index"
      />
      <Section>
        <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c} href={`/insights/category/${slugify(c)}`} className="min-h-[40px] rounded-full border border-obsidian/30 px-4 py-2 font-sub text-sm font-bold hover:bg-forest hover:text-ivory">
              {c}
            </Link>
          ))}
        </nav>
        <div className="mb-8">
          <OneSignalSubscribeButton />
        </div>
        <PostList posts={posts} />
      </Section>
      <FooterCTA source="insights_index" />
    </>
  );
}
