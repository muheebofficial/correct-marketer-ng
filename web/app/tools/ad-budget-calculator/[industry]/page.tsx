import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdCheckPage } from "@/components/tools/AdCheckPage";
import { buildMetadata } from "@/lib/seo";
import { getPreset, presets } from "@/lib/tools/adCheckPresets";

export const dynamicParams = false;

export function generateStaticParams() {
  return presets.map((p) => ({ industry: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const p = getPreset(industry);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} Ad Budget Calculator for Nigeria | Ad Reality Check`,
    description: `${p.intro} Free, instant and in Naira.`,
    path: `/tools/ad-budget-calculator/${p.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const p = getPreset(industry);
  if (!p) notFound();
  return <AdCheckPage preset={p} />;
}
