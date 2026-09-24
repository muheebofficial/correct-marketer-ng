import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PostList } from "@/components/sections/PostList";
import { Section } from "@/components/ui/Section";
import { getPosts, slugify, tagsOf } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

async function load(slug: string) {
  const posts = await getPosts();
  const name = tagsOf(posts).find((t) => slugify(t) === slug);
  return { name, posts: posts.filter((p) => name && p.tags.includes(name)) };
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const { name } = await load(params.tag);
  if (!name) return {};
  return buildMetadata({
    title: `${name}: Articles and Guides`,
    description: `Articles tagged ${name} from Correct Marketer NG.`,
    path: `/insights/tag/${params.tag}`,
    noindex: true, // thin tag archives stay out of the index
  });
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { name, posts } = await load(params.tag);
  if (!name) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }, { name: `#${name}`, path: `/insights/tag/${params.tag}` }]}
        title={`Tagged: ${name}`}
        source="insights_tag"
      />
      <Section><PostList posts={posts} /></Section>
      <FooterCTA source="insights_tag" />
    </>
  );
}
