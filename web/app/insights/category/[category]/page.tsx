import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { categoriesOf, getPosts, slugify } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

async function load(slug: string) {
  const posts = await getPosts();
  const name = categoriesOf(posts).find((c) => slugify(c) === slug);
  return { name, posts: posts.filter((p) => p.category === name) };
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { name } = await load(params.category);
  if (!name) return {};
  return buildMetadata({
    title: `${name} Articles for Nigerian Businesses`,
    description: `Practical ${name} guides and strategy for Nigerian business owners from Correct Marketer NG.`,
    path: `/insights/category/${params.category}`,
  });
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { name, posts } = await load(params.category);
  if (!name) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }, { name, path: `/insights/category/${params.category}` }]}
        title={name}
        sub={`Articles on ${name.toLowerCase()} for Nigerian business owners.`}
        source="insights_category"
      />
      <Section><PostList posts={posts} /></Section>
      <FooterCTA source="insights_category" />
    </>
  );
}
