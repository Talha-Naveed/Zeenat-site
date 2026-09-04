import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { DocsSearch } from "@/components/docs-search";
import { searchIndex } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href="/" className="brand brand-logo-link" aria-label="Zeenat.js home">
          <BrandLogo className="header-brand-logo" priority />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/docs">Docs</Link>
          <Link href="/docs/effects">Effects</Link>
          <Link href="/docs/presets">Presets</Link>
          <Link href="/playground">Playground</Link>
          <Link href="/changelog">Changelog</Link>
        </nav>
        <DocsSearch items={searchIndex} compact />
        <a className="github-link" href="https://github.com/Talha-Naveed/Zeenat" target="_blank" rel="noreferrer">
          <Github size={17} aria-hidden="true" /> <span>GitHub</span>
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={19} /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/docs">Docs</Link>
            <Link href="/docs/effects">Effects</Link>
            <Link href="/docs/presets">Presets</Link>
            <Link href="/playground">Playground</Link>
            <Link href="/changelog">Changelog</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
