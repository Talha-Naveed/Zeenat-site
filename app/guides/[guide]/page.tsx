import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getGuide, guides } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return guides.map((guide) => ({ guide: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }): Promise<Metadata> {
  const { guide: slug } = await params; const guide = getGuide(slug); if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.description, path: guide.path });
}

export default async function GuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const { guide: slug } = await params; const guide = getGuide(slug); if (!guide) notFound();
  return <ArticlePage article={guide} path={guide.path} breadcrumbRoot={{ label: "Docs", href: "/docs" }} />;
}
