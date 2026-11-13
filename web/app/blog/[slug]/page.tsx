import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BudgetArticleView, budgetArticleMetadata } from "@/components/blog/BudgetArticleView";
import { PostView, postMetadata } from "@/components/blog/PostView";
import { getPosts, isBudgetArticle } from "@/lib/blog";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isBudgetArticle(slug)) return budgetArticleMetadata();
  return postMetadata(slug);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (isBudgetArticle(slug)) return <BudgetArticleView />;
  const exists = (await getPosts()).some((p) => p.slug === slug);
  if (!exists) notFound();
  return <PostView slug={slug} />;
}
