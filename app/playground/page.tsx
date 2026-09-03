import type { Metadata } from "next";
import Link from "next/link";
import { Playground } from "@/components/playground";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Interactive Playground", description: "Preview eight Zeenat.js presets and nine effects, choose from 249 country flags, adjust orientation and motion, and copy React or vanilla code.", path: "/playground", type: "website" });

export default function PlaygroundPage() {
  return (
    <main id="main-content" className="shell playground-page">
      <header className="article-header playground-header"><p className="eyebrow">Real Zeenat runtime</p><h1>Build a decoration, then copy the code.</h1><p>Choose a built-in preset or isolated effect. Adjust the real public options, preview reduced motion, pause or restart the engine, and copy an integration that uses Zeenat’s exported API.</p></header>
      <Playground />
      <section className="playground-notes"><div><h2>What the preview demonstrates</h2><p>The playground runs the published Zeenat package. It does not reproduce effects with site CSS or duplicate engine internals.</p></div><div><h2>Use motion responsibly</h2><p>System motion is the production default. The reduced preview shows how high-motion effects disappear or become sparse static compositions.</p></div><div><h2>Read the contracts</h2><p><Link href="/docs/configuration">Configuration reference</Link> · <Link href="/docs/accessibility">Accessibility</Link> · <Link href="/docs/performance">Performance</Link></p></div></section>
    </main>
  );
}
