import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CodeBlock } from "@/components/code-block";
import { JsonLd } from "@/components/json-ld";
import { LiveDemo } from "@/components/live-demo";
import { getEffect, getPreset, presets } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { DocPagination } from "@/components/doc-pagination";

export function generateStaticParams() { return presets.map((preset) => ({ preset: preset.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ preset: string }> }): Promise<Metadata> {
  const { preset: slug } = await params; const doc = getPreset(slug); if (!doc) return {};
  return pageMetadata({ title: `${doc.title} Preset`, description: doc.description, path: `/docs/presets/${slug}` });
}

export default async function PresetPage({ params }: { params: Promise<{ preset: string }> }) {
  const { preset: slug } = await params; const preset = getPreset(slug); if (!preset) notFound();
  const path = `/docs/presets/${preset.slug}`;
  const factoryCode = `import { Zeenat } from "zeenat";\nimport { ${preset.factory} } from "zeenat/presets/${preset.slug}";\n\nconst customized = ${preset.factory}({\n  ${preset.factoryExample ?? `${preset.factoryOptions[0]?.name}: false`},\n});\n\n<Zeenat preset={customized} />;`;
  const flagProp = preset.slug === "bunting" ? ' flag="pakistan"' : "";
  const flagOption = preset.slug === "bunting" ? ', flag: "pakistan"' : "";
  const schedule = preset.schedule ?? ["2026-12-01T00:00:00Z", "2027-01-01T00:00:00Z"];
  return (
    <main id="main-content" className="docs-article reference-page">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Docs", path: "/docs" }, { name: "Presets", path: "/docs/presets" }, { name: preset.title, path }]), articleJsonLd({ title: `${preset.title} Preset`, description: preset.description, path })]} />
      <Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Presets", href: "/docs/presets" }, { label: preset.title, href: path }]} />
      <header className="article-header"><p className="eyebrow">Preset · {preset.occasion}</p><h1>{preset.title} preset</h1><p>{preset.description}</p></header>
      <LiveDemo preset={preset.slug} label={preset.title} />
      <div className="article-columns"><article className="prose">
        <section id="composition"><h2>Composition</h2><p>{preset.summary}</p><div className="composition-list">{preset.effects.map((effect) => <Link key={effect} href={`/docs/effects/${effect}`}><span className="color-swatch" style={{ background: preset.colors[preset.effects.indexOf(effect) % preset.colors.length] }} /><span><strong>{getEffect(effect)?.title ?? effect}</strong><small>{getEffect(effect)?.summary}</small></span><ArrowRight size={15} /></Link>)}</div></section>
        <section id="usage"><h2>React usage</h2>{preset.slug === "bunting" && <p>The <code>flag</code> option is required. Use an English country slug or two-letter code from the <Link href="/docs/flags">249-entry country catalog</Link>.</p>}<CodeBlock filename="Decoration.tsx" code={`import { Zeenat } from "zeenat";\n\nexport function Decoration() {\n  return <Zeenat preset="${preset.slug}"${flagProp} intensity="medium" />;\n}`} /><h3>Next.js App Router</h3><CodeBlock filename="app/layout.tsx" code={`import { Zeenat } from "zeenat";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html><body><Zeenat preset="${preset.slug}"${flagProp} />{children}</body></html>;\n}`} /><h3>Vanilla JavaScript</h3><CodeBlock language="ts" filename="main.ts" code={`import { zeenat } from "zeenat/vanilla";\n\nconst decoration = zeenat({ preset: "${preset.slug}"${flagOption}, intensity: "medium" });\n// Later: decoration.destroy();`} /></section>
        <section id="customization"><h2>Typed customization</h2><p>The {preset.title} subpath exports <code>{preset.factory}</code>. Its supported options are listed below.</p>{preset.factoryOptions.some((option) => option.name === "orientation") && <p>Choose horizontal or vertical flag artwork. You can also pass <code>orientation</code> directly with this string preset in React or vanilla JavaScript. Vertical rotates the full design 90° clockwise and preserves its proportions.</p>}<CodeBlock language="tsx" code={factoryCode} /><div className="api-table-wrap"><table className="api-table"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>{preset.factoryOptions.map((option) => <tr key={option.name}><th scope="row"><code>{option.name}</code></th><td><code>{option.type}</code></td><td>{option.default}</td><td>{option.description}</td></tr>)}</tbody></table></div></section>
        <section id="intensity"><h2>Intensity and seed</h2><p>Scene intensity scales effect counts without changing the preset API. A seed makes generated positions and timing deterministic across restarts.</p><CodeBlock code={`<Zeenat preset="${preset.slug}"${flagProp} intensity="low" seed={2026} />`} /></section>
        <section id="motion"><h2>Reduced motion</h2><p>{preset.reducedMotion}</p><Link className="inline-doc-link" href="/docs/accessibility">Accessibility and reduced motion <ArrowRight size={14} /></Link></section>
        <section id="scheduling"><h2>Scheduling</h2><p>Keep dates out of preset definitions. Schedule the scene at the call site with explicit time-zone offsets. Set the year and local offset for your event.</p><CodeBlock code={`<Zeenat\n  preset="${preset.slug}"${flagProp ? `\n ${flagProp}` : ""}\n  activeFrom="${schedule[0]}"\n  activeUntil="${schedule[1]}"\n/>`} /></section>
        <section id="related"><h2>Related presets</h2><div className="related-links">{preset.related.map((related) => <Link href={`/docs/presets/${related}`} key={related}>{getPreset(related)?.title}<ArrowRight size={14} /></Link>)}<Link href="/playground">Open in playground <ArrowRight size={14} /></Link></div></section>
      </article><aside className="toc"><strong>On this page</strong>{["composition","usage","customization","intensity","motion","scheduling","related"].map((id) => <a href={`#${id}`} key={id}>{id[0]!.toUpperCase() + id.slice(1)}</a>)}</aside></div>
      <DocPagination currentPath={path} />
    </main>
  );
}
