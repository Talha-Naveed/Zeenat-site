import type { Metadata } from "next";
import { SITE_URL } from "@/lib/content";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const { title, description, path, type = "article" } = input;
  const isPreview = process.env.VERCEL_ENV === "preview";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: "Zeenat.js",
      title: `${title} | Zeenat.js`,
      description,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${title} | Zeenat.js`,
      description,
      images: [],
    },
    robots: { index: !isPreview, follow: !isPreview },
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleJsonLd(input: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    isPartOf: { "@type": "WebSite", name: "Zeenat.js", url: SITE_URL },
    about: { "@type": "SoftwareApplication", name: "Zeenat.js", applicationCategory: "DeveloperApplication" },
    inLanguage: "en",
  };
}
