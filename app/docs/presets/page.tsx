import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LiveDemo } from "@/components/live-demo";
import { presets } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Built-in Presets", description: "Explore eight Zeenat.js presets: country flag bunting, Pakistan Independence Day, Defence Day, US Independence Day and four seasonal or festive compositions.", path: "/docs/presets" });

export default function PresetsPage() {
  return <main id="main-content" className="docs-index catalog-index"><Breadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Presets", href: "/docs/presets" }]} /><header className="article-header"><p className="eyebrow">Eight compositions</p><h1>Built-in presets</h1><p>Choose country flag bunting for any occasion or a ready-to-use national-day, seasonal or festive composition. Every preset has a typed factory. The bunting preset requires a country through its flag option.</p></header><div className="catalog-grid">{presets.map((preset) => <Link href={`/docs/presets/${preset.slug}`} className="catalog-card" key={preset.slug}><LiveDemo compact preset={preset.slug} label={preset.title} /><div className="catalog-card-copy"><span className="factory-name">preset=&quot;{preset.slug}&quot;</span><h2>{preset.title}</h2><p>{preset.summary}</p><strong>View preset docs <ArrowRight size={14} /></strong></div></Link>)}</div></main>;
}
