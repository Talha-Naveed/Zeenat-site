import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { effects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LiveDemo } from "@/components/live-demo";

export const metadata: Metadata = pageMetadata({
  title: "Website Decoration Effects",
  description: "Explore all nine Zeenat.js website effects: bunting, aircraft, sparkles, fireworks, snow, petals, falling leaves, lanterns and string lights.",
  path: "/docs/effects",
});

export default function EffectsPage() {
  return (
    <main id="main-content" className="docs-index catalog-index">
      <Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Effects", href: "/docs/effects" }]} />
      <header className="article-header"><p className="eyebrow">Reusable primitives</p><h1>Website decoration effects</h1><p>An Effect is a framework-neutral visual primitive. Import one from the aggregate catalog or its smallest explicit subpath, then render it with ZeenatScene or compose it into a Preset.</p></header>
      <div className="catalog-grid">
        {effects.map((effect) => (
          <Link href={`/docs/effects/${effect.slug}`} className="catalog-card" key={effect.slug}>
            <LiveDemo compact effect={effect.slug} label={effect.title} />
            <div className="catalog-card-copy"><span className="factory-name">{effect.exportName}()</span><h2>{effect.title}</h2><p>{effect.summary}</p><strong>View effect API <ArrowRight size={14} /></strong></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
