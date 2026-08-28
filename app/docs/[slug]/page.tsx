import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { docArticles, getDocArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return docArticles.map((doc) => ({ slug: doc.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocArticle(slug);
  if (!article) return {};
  return pageMetadata({ title: article.title, description: article.description, path: `/docs/${slug}` });
}

export default async function DocArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getDocArticle(slug);
  if (!article) notFound();
  return <ArticlePage article={article} path={`/docs/${slug}`} />;
}
