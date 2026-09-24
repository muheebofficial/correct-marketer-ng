import "server-only";
import { getCollection } from "./api";
import { posts as defaultPosts } from "./content/posts";
import type { Post } from "./content/types";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection<Post>("posts", defaultPosts);
  return all.sort((a, b) => b.published.localeCompare(a.published));
}

export const categoriesOf = (posts: Post[]) => Array.from(new Set(posts.map((p) => p.category))).sort();
export const tagsOf = (posts: Post[]) => Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
