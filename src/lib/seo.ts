import type { Metadata } from "next";
import { site } from "./site";
import { indexingAllowed } from "./deployment";

/**
 * Per-page metadata builder.
 *
 * Guarantees every route ships a canonical URL, an OG image and a Twitter card
 * without each page having to remember. Titles are templated in the root layout,
 * so `title` here should be the bare page title ("Programs", not "Programs | ...").
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  type = "website",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex || !indexingAllowed
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.legalName,
      title: `${title} | ${site.name}`,
      description,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}
