import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlagshipServicePage, flagshipMetadata, loadFlagshipService } from "@/components/services/FlagshipServicePage";
import { GroupHubPage, groupMetadata } from "@/components/services/GroupHubPage";
import { ServiceTemplatePage, templateMetadata } from "@/components/services/ServiceTemplatePage";
import { serviceCopy } from "@/lib/content/serviceCopy";
import { services as flagship } from "@/lib/content/services";
import { getGroup, getService, serviceGroups, services, validateTaxonomy } from "@/lib/services-taxonomy";

export const revalidate = 300;

type Props = { params: { slug: string } };
const isFlagship = (slug: string) => flagship.some((s) => s.slug === slug);

export function generateStaticParams() {
  validateTaxonomy(); // fails the build if a group or service is broken
  for (const s of services) if (!isFlagship(s.slug) && !serviceCopy[s.slug]) throw new Error(`Missing page copy for ${s.slug}`);
  return [...serviceGroups.map((g) => ({ slug: g.slug })), ...services.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  if (getGroup(slug)) return groupMetadata(slug);
  if (getService(slug) && !isFlagship(slug)) return templateMetadata(slug);
  return flagshipMetadata(slug);
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = params;
  if (getGroup(slug)) return <GroupHubPage slug={slug} />;
  if (getService(slug) && !isFlagship(slug)) return <ServiceTemplatePage slug={slug} />;
  if (await loadFlagshipService(slug)) return <FlagshipServicePage slug={slug} />;
  notFound();
}
