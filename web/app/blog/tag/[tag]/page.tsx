import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { slugify, tagsOf } from "@/lib/insights";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

async function load(slug: string) {
  const posts = await getBlogPosts();
  const name = tagsOf(posts).find((tag) => slugify(tag) === slug);
  return { name, posts: posts.filter((post) => name && post.tags.includes(name)) };
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const { name } = await load(tag);
  if (!name) return {};
  return buildMetadata({
    title: `${name}: Blog Articles and Guides`,
    description: `Articles tagged ${name} from Correct Marketer NG.`,
    path: `/blog/tag/${tag}`,
    noindex: true,
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const { name, posts } = await load(tag);
  if (!name) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }, { name: `#${name}`, path: `/blog/tag/${tag}` }]}
        title={`Tagged: ${name}`}
        source="blog_tag"
      />
      <Section><PostList posts={posts} /></Section>
      <FooterCTA source="blog_tag" />
    </>
  );
}
