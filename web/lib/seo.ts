import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

/** One place to build unique title, description, canonical, Open Graph and Twitter metadata. */
export function buildMetadata({ title, description, path, type = "website", publishedTime, modifiedTime, noindex }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_NG",
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
