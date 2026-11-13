import "server-only";
import type { Post } from "@/lib/content/types";
import { budgetArticleMeta, budgetArticleReadingMinutes } from "@/lib/content/budgetArticle";
import { getPosts } from "@/lib/insights";

export async function getBlogPosts(): Promise<Post[]> {
  const posts = await getPosts();
  const budgetPost: Post = {
    slug: budgetArticleMeta.slug,
    title: budgetArticleMeta.title,
    description: budgetArticleMeta.description,
    category: budgetArticleMeta.category,
    tags: budgetArticleMeta.tags,
    author: budgetArticleMeta.author,
    published: budgetArticleMeta.published,
    updated: budgetArticleMeta.published,
    readingMinutes: budgetArticleReadingMinutes,
    service: "paid-ads",
    intro: budgetArticleMeta.excerpt,
    sections: [],
    related: ["seo-vs-google-ads-nigeria", "why-your-website-is-not-generating-customers"],
  };
  return [...posts.filter((post) => post.slug !== budgetPost.slug), budgetPost]
    .sort((a, b) => b.published.localeCompare(a.published));
}
