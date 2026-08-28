import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Zeenat } from "zeenat";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <Zeenat preset="autumn" intensity="low" motion="system" seed={404} />
      <p className="eyebrow">404 · Not found</p>
      <h1>Looks like this decoration drifted away.</h1>
      <p>The page may have moved, but the effects, presets and integration guides are still close by.</p>
      <div className="hero-actions"><Link className="button primary" href="/"><Home size={16} /> Home</Link><Link className="button secondary" href="/docs">Documentation <ArrowRight size={16} /></Link><Link className="text-link" href="/docs/effects">Browse effects</Link></div>
    </main>
  );
}
