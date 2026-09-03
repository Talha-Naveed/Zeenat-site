import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, Braces, Flower2, Gauge, Laptop } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Documentation",
  description: "Learn Zeenat.js with accurate React, Next.js, vanilla JavaScript, effect, preset, accessibility and performance documentation.",
  path: "/docs",
});

const cards = [
  { icon: BookOpen, title: "Getting started", copy: "Install Zeenat and render your first preset.", href: "/docs/getting-started" },
  { icon: Flower2, title: "Effects", copy: "Nine reusable visual primitives with complete option tables.", href: "/docs/effects" },
  { icon: Boxes, title: "Presets", copy: "Eight compositions for country flags, national days, seasons and celebrations.", href: "/docs/presets" },
  { icon: Laptop, title: "Framework guides", copy: "React, Next.js App Router and vanilla JavaScript.", href: "/docs/react" },
  { icon: Braces, title: "Customization", copy: "Typed preset factories, custom effects and compositions.", href: "/docs/customization" },
  { icon: Gauge, title: "Engineering", copy: "Accessibility, performance, CSP and diagnostics.", href: "/docs/performance" },
];

export default function DocsPage() {
  return (
    <main id="main-content" className="docs-index">
      <header className="article-header docs-hero">
        <p className="eyebrow">Zeenat.js documentation</p>
        <h1>Decorations with an engineering contract.</h1>
        <p>Accurate, example-led documentation for adding tasteful website decorations to React, Next.js and vanilla JavaScript—without changing the host layout.</p>
        <div className="hero-actions"><Link className="button primary" href="/docs/getting-started">Get started <ArrowRight size={16} /></Link><Link className="button secondary" href="/docs/what-is-zeenat">What is Zeenat?</Link></div>
      </header>
      <section className="docs-card-grid" aria-label="Documentation sections">
        {cards.map(({ icon: Icon, ...card }) => <Link key={card.href} href={card.href} className="docs-card"><Icon size={20} /><h2>{card.title}</h2><p>{card.copy}</p><span>Open section <ArrowRight size={14} /></span></Link>)}
      </section>
    </main>
  );
}
