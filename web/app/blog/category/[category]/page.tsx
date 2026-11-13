import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { categoriesOf, slugify } from "@/lib/insights";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

async function load(slug: string) {
  const posts = await getBlogPosts();
  const name = categoriesOf(posts).find((category) => slugify(category) === slug);
  return { name, posts: posts.filter((post) => post.category === name) };
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const { name } = await load(category);
  if (!name) return {};
  return buildMetadata({
    title: `${name} Articles for Nigerian Businesses`,
    description: `Practical ${name} guides and strategy for Nigerian business owners from Correct Marketer NG.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const { name, posts } = await load(category);
  if (!name) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }, { name, path: `/blog/category/${category}` }]}
        title={name}
        sub={`Articles on ${name.toLowerCase()} for Nigerian business owners.`}
        source="blog_category"
      />
      <Section><PostList posts={posts} /></Section>
      <FooterCTA source="blog_category" />
    </>
  );
}
