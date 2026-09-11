import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

interface PageMetadataInput {
  title: string;
  description?: string;
  path?: string;
  absoluteTitle?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "/",
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const desc = description ?? siteConfig.description;
  const ogTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: ogTitle,
      description: desc,
      url: path,
      locale: siteConfig.locale,
      images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [siteConfig.ogImage],
    },
  };
}
