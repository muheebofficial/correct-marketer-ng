import "server-only";
import { getCollection } from "./api";
import { budgetArticleMeta, budgetArticleReadingMinutes } from "./content/budgetArticle";
import { posts as defaultPosts } from "./content/posts";
import type { Post } from "./content/types";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** The long-form ad budget article has its own layout; it joins the blog as a list entry. */
export const budgetArticlePost: Post = {
  slug: budgetArticleMeta.slug,
  title: budgetArticleMeta.title,
  description: budgetArticleMeta.excerpt,
  category: budgetArticleMeta.category,
  tags: budgetArticleMeta.tags,
  author: budgetArticleMeta.author,
  published: budgetArticleMeta.published,
  updated: budgetArticleMeta.published,
  readingMinutes: budgetArticleReadingMinutes,
  service: "",
  intro: "",
  sections: [],
  related: [],
};

export const isBudgetArticle = (slug: string) => slug === budgetArticleMeta.slug;

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection<Post>("posts", defaultPosts);
  return [...all.filter((p) => p.slug !== budgetArticlePost.slug), budgetArticlePost].sort((a, b) => b.published.localeCompare(a.published));
}

export const categoriesOf = (posts: Post[]) => Array.from(new Set(posts.map((p) => p.category))).sort();
export const tagsOf = (posts: Post[]) => Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
