import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ArticleDoc } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CodeBlock } from "@/components/code-block";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { DocPagination } from "@/components/doc-pagination";

export function ArticlePage({
  article,
  path,
  breadcrumbRoot = { label: "Docs", href: "/docs" },
}: {
  article: ArticleDoc;
  path: string;
  breadcrumbRoot?: { label: string; href: string };
}) {
  const breadcrumbItems = [breadcrumbRoot, { label: article.title, href: path }];
  return (
    <main id="main-content" className="docs-article">
      <JsonLd data={[
        breadcrumbJsonLd(breadcrumbItems.map((item) => ({ name: item.label, path: item.href }))),
        articleJsonLd({ title: article.title, description: article.description, path }),
      ]} />
      <Breadcrumbs items={breadcrumbItems} />
      <header className="article-header">
        <p className="eyebrow">{article.eyebrow}</p>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
      </header>
      <div className="article-columns">
        <article className="prose">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.code && <CodeBlock {...section.code} />}
              {section.links && <div className="related-links">{section.links.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowRight size={15} /></Link>)}</div>}
            </section>
          ))}
        </article>
        <aside className="toc" aria-label="On this page">
          <strong>On this page</strong>
          {article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
        </aside>
      </div>
      {path.startsWith("/docs/") && <DocPagination currentPath={path} />}
      <nav className="article-end-nav" aria-label="Documentation navigation">
        <Link href={breadcrumbRoot.href}><ArrowLeft size={16} /> Back to {breadcrumbRoot.label}</Link>
        <Link href="/playground">Try the playground <ArrowRight size={16} /></Link>
      </nav>
    </main>
  );
}
