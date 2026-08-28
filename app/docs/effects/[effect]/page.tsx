import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CodeBlock } from "@/components/code-block";
import { JsonLd } from "@/components/json-ld";
import { LiveDemo } from "@/components/live-demo";
import { effects, getEffect } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { DocPagination } from "@/components/doc-pagination";

export function generateStaticParams() { return effects.map((effect) => ({ effect: effect.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ effect: string }> }): Promise<Metadata> {
  const { effect: slug } = await params;
  const doc = getEffect(slug);
  if (!doc) return {};
  return pageMetadata({ title: `${doc.title} Effect`, description: doc.description, path: `/docs/effects/${slug}` });
}

export default async function EffectPage({ params }: { params: Promise<{ effect: string }> }) {
  const { effect: slug } = await params;
  const effect = getEffect(slug);
  if (!effect) notFound();
  const path = `/docs/effects/${effect.slug}`;
  const subpath = effect.slug;
  return (
    <main id="main-content" className="docs-article reference-page">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Docs", path: "/docs" }, { name: "Effects", path: "/docs/effects" }, { name: effect.title, path }]), articleJsonLd({ title: `${effect.title} Effect`, description: effect.description, path })]} />
      <Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Effects", href: "/docs/effects" }, { label: effect.title, href: path }]} />
      <header className="article-header"><p className="eyebrow">Effect · {effect.defaultLayer} layer</p><h1>{effect.title} effect</h1><p>{effect.description}</p></header>
      <LiveDemo effect={effect.slug} label={effect.title} />
      <div className="article-columns">
        <article className="prose">
          <section id="imports"><h2>Installation and imports</h2><p>Install Zeenat once, then use the aggregate effects entry or the smallest explicit subpath. Both paths are exported by package version 0.2.1.</p><CodeBlock language="bash" label="Install" code="npm install zeenat" /><CodeBlock language="ts" label="Imports" code={`import { ${effect.exportName} } from "zeenat/effects";\n// or\nimport { ${effect.exportName} } from "zeenat/effects/${subpath}";`} /></section>
          <section id="usage"><h2>Basic usage</h2><CodeBlock {...effect.examples[0]!} /></section>
          <section id="api"><h2>{effect.exportName}() options</h2><p>Properties marked required have no factory default. Every other value below is taken from the current TypeScript source.</p><div className="api-table-wrap"><table className="api-table"><thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody>{effect.options.map((option) => <tr key={option.name}><th scope="row"><code>{option.name}</code></th><td><code>{option.type}</code></td><td>{option.required ? "Yes" : "No"}</td><td><code>{option.default}</code></td><td>{option.description}</td></tr>)}</tbody></table></div></section>
          <section id="examples"><h2>Examples</h2>{effect.examples.slice(1).map((example) => <div className="example" key={example.label}><h3>{example.label}</h3><CodeBlock {...example} /></div>)}</section>
          <section id="motion"><h2>Reduced motion</h2><p>{effect.reducedMotion}</p><Link className="inline-doc-link" href="/docs/accessibility">Read the complete reduced-motion contract <ArrowRight size={14} /></Link></section>
          <section id="performance"><h2>Performance notes</h2><p>{effect.performance}</p><Link className="inline-doc-link" href="/docs/performance">Zeenat performance architecture <ArrowRight size={14} /></Link></section>
          <section id="related"><h2>Related effects and presets</h2><div className="related-links">{effect.related.map((related) => <Link key={related} href={`/docs/effects/${related}`}>{getEffect(related)?.title ?? related}<ArrowRight size={14} /></Link>)}{slug === "snow" && <Link href="/docs/presets/winter">Winter preset <ArrowRight size={14} /></Link>}{slug === "petals" && <Link href="/docs/presets/spring">Spring preset <ArrowRight size={14} /></Link>}{slug === "falling-leaves" && <Link href="/docs/presets/autumn">Autumn preset <ArrowRight size={14} /></Link>}</div></section>
        </article>
        <aside className="toc" aria-label="On this page"><strong>On this page</strong>{["imports", "usage", "api", "examples", "motion", "performance", "related"].map((id) => <a href={`#${id}`} key={id}>{id[0]!.toUpperCase() + id.slice(1)}</a>)}</aside>
      </div>
      <DocPagination currentPath={path} />
    </main>
  );
}
