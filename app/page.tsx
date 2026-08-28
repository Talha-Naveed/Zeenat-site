import Link from "next/link";
import { ArrowRight, Check, Github, Package, ShieldCheck, Sparkles, TimerReset, TreePine, Workflow, Zap } from "lucide-react";
import { HeroDemo } from "@/components/hero-demo";
import { CopyButton } from "@/components/copy-button";
import { HomeCodeTabs } from "@/components/home-code-tabs";
import { LiveDemo } from "@/components/live-demo";
import { CustomizeDemo } from "@/components/customize-demo";
import { JsonLd } from "@/components/json-ld";
import { effects, GITHUB_URL, NPM_URL, presets, SITE_URL, VERSION } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="main-content">
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebSite", name: "Zeenat.js", alternateName: "Zeenat", url: SITE_URL, description: "Open-source TypeScript website decoration and effects library for React, Next.js and vanilla JavaScript." },
        { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Zeenat.js", alternateName: "zeenat", url: SITE_URL, applicationCategory: "DeveloperApplication", operatingSystem: "Web", description: "An open-source TypeScript library for adding tasteful seasonal and occasion-aware decorations to websites.", softwareVersion: VERSION, programmingLanguage: "TypeScript", license: "https://opensource.org/license/mit", codeRepository: GITHUB_URL, author: { "@type": "Person", name: "Talha", url: "https://github.com/Talha-Naveed" }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, sameAs: [GITHUB_URL, NPM_URL] },
        { "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: "Zeenat.js", codeRepository: GITHUB_URL, programmingLanguage: "TypeScript", license: "https://opensource.org/license/mit", runtimePlatform: ["React", "Next.js", "Web browser"] },
      ]} />
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow"><span>v{VERSION}</span> TypeScript-first decoration engine</p>
            <h1><span>Zeenat.js</span>Adorn the web.</h1>
            <p className="hero-lede">
              Add tasteful seasonal and occasion-aware decorations to an existing React,
              Next.js or vanilla JavaScript site with one component or function call.
            </p>
            <div className="install-command">
              <Package size={17} aria-hidden="true" />
              <code>npm install zeenat</code>
              <CopyButton value="npm install zeenat" label="Copy npm install command" compact />
            </div>
            <div className="hero-actions">
              <Link href="/docs/getting-started" className="button primary">Get started <ArrowRight size={17} /></Link>
              <Link href="/docs/effects" className="button secondary">Explore effects</Link>
              <a href="https://github.com/Talha-Naveed/Zeenat" className="text-link"><Github size={17} /> GitHub</a>
            </div>
            <ul className="proof-list" aria-label="Library qualities">
              <li><Check size={15} /> SSR safe</li>
              <li><Check size={15} /> Reduced-motion aware</li>
              <li><Check size={15} /> Zero runtime dependencies</li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="ornament-corner ornament-a" aria-hidden="true" />
            <HeroDemo />
            <div className="code-card" aria-label="React code example">
              <div className="code-card-head"><span>app/layout.tsx</span><span>React · Next.js</span></div>
              <pre><code><span className="code-key">import</span> {`{ Zeenat }`} <span className="code-key">from</span> <span className="code-string">&quot;zeenat&quot;</span>;{"\n\n"}&lt;<span className="code-tag">Zeenat</span> preset=<span className="code-string">&quot;winter&quot;</span> /&gt;</code></pre>
            </div>
          </div>
        </section>
        <section className="home-section shell one-line-section">
          <div className="section-heading split-heading"><div><p className="eyebrow">One component. Existing application.</p><h2>A decoration layer, not a redesign.</h2></div><p>Zeenat mounts a fixed, clipped overlay above the page. Your layout, routes, content and controls stay exactly where they are.</p></div>
          <HomeCodeTabs />
          <div className="integration-notes"><span><strong>React</strong> A typed component and scene API.</span><span><strong>Next.js</strong> App Router layouts stay Server Components.</span><span><strong>Vanilla</strong> A framework-neutral controller with full cleanup.</span></div>
        </section>
        <section className="home-section showcase-section">
          <div className="shell">
            <div className="section-heading"><p className="eyebrow">Reusable effects</p><h2>Nine ways to add a little ceremony.</h2><p>Use an effect on its own or compose it into a reusable preset. Every card below runs the published Zeenat package only when it approaches the viewport.</p></div>
            <div className="home-effect-grid">{effects.map((effect) => <Link href={`/docs/effects/${effect.slug}`} key={effect.slug} className="home-effect-card"><LiveDemo compact effect={effect.slug} label={effect.title} /><div><span>{effect.exportName}()</span><h3>{effect.title}</h3><p>{effect.summary}</p><strong>Effect documentation <ArrowRight size={14} /></strong></div></Link>)}</div>
            <div className="section-cta"><Link href="/docs/effects" className="button secondary">Explore every effect <ArrowRight size={16} /></Link></div>
          </div>
        </section>
        <section className="home-section shell presets-section">
          <div className="section-heading split-heading"><div><p className="eyebrow">Built-in presets</p><h2>Effects compose. Presets give them meaning.</h2></div><p>An Effect is one neutral visual primitive. A Preset combines effects for a season or occasion, while typed factories keep advanced customization explicit.</p></div>
          <div className="preset-strip">{presets.map((preset) => <Link href={`/docs/presets/${preset.slug}`} key={preset.slug} className="preset-tile"><LiveDemo compact preset={preset.slug as never} label={preset.title} /><div><span>{preset.occasion}</span><h3>{preset.title}</h3><small>{preset.effects.map((effect) => effect.replaceAll("-", " ")).join(" · ")}</small></div></Link>)}</div>
          <div className="section-cta"><Link href="/docs/presets" className="button secondary">Compare all presets <ArrowRight size={16} /></Link></div>
        </section>
        <section className="home-section engineering-section">
          <div className="shell">
            <div className="section-heading light"><p className="eyebrow">Built for real websites</p><h2>Decoration with a strict runtime contract.</h2><p>Every claim below is grounded in the library’s tests, types or implementation—not a generic feature badge.</p></div>
            <div className="engineering-grid">
              <Link href="/docs/accessibility"><ShieldCheck /><h3>Inert by design</h3><p>Fixed, clipped, aria-hidden and unable to receive pointer or keyboard input.</p><span>Accessibility contract <ArrowRight /></span></Link>
              <Link href="/docs/performance"><Zap /><h3>Bounded resources</h3><p>DOM and SVG counts, animations, timers and RAF loops have explicit browser-test budgets.</p><span>Performance details <ArrowRight /></span></Link>
              <Link href="/docs/nextjs"><Workflow /><h3>SSR safe</h3><p>No browser global is accessed during module evaluation; Next.js layouts remain Server Components.</p><span>Next.js integration <ArrowRight /></span></Link>
              <Link href="/docs/accessibility"><Sparkles /><h3>Reduced-motion aware</h3><p>High-motion effects disappear or become sparse static compositions by default.</p><span>Motion behavior <ArrowRight /></span></Link>
              <Link href="/docs/performance"><TreePine /><h3>Tree-shakeable</h3><p>Zero runtime dependencies, sideEffects false and individual effect and preset subpaths.</p><span>Package architecture <ArrowRight /></span></Link>
              <Link href="/docs/diagnostics"><TimerReset /><h3>Lifecycle ownership</h3><p>Scoped cleanup, visibility pausing, deterministic restarts and isolated effect failures.</p><span>Diagnostics API <ArrowRight /></span></Link>
            </div>
          </div>
        </section>
        <section className="home-section shell customize-section">
          <div className="customize-copy"><p className="eyebrow">Typed customization</p><h2>Turn a preset down. Keep the types.</h2><p>Seasonal factories expose only the options relevant to their composition. Disable an effect with <code>false</code>, or pass that effect’s public option type.</p><pre><code><span>import</span> {`{ createWinterPreset }`} <span>from</span> &quot;zeenat/presets/winter&quot;;{"\n\n"}const quietWinter = createWinterPreset({`{\n  snow: { count: 14, speed: "slow" },\n  sparkles: false,\n}`});</code></pre><Link href="/docs/customization" className="inline-doc-link">Customization guide <ArrowRight size={14} /></Link></div>
          <CustomizeDemo />
        </section>
        <section className="home-section use-cases-section">
          <div className="shell use-cases-grid">
            <div className="section-heading"><p className="eyebrow">How do I decorate a website for an event?</p><h2>Add the occasion without rebuilding the interface.</h2><p>Zeenat.js adds a decorative overlay to an existing React, Next.js or vanilla JavaScript application. Choose a preset for a matching season or occasion, or compose individual effects for a campaign with its own visual language.</p><p>That makes it useful for holiday website decorations, seasonal effects, company anniversaries, product launches, national days and short-lived event campaigns—while keeping meaningful content in the host page.</p><Link href="/guides/holiday-website-decorations" className="button primary">Read the practical guide <ArrowRight size={16} /></Link></div>
            <div className="use-case-list">
              <Link href="/guides/add-snow-to-website"><span>01</span><div><strong>Snowfall and winter effects</strong><small>Add snow alone or use the full Winter preset.</small></div><ArrowRight /></Link>
              <Link href="/guides/seasonal-website-effects"><span>02</span><div><strong>Seasonal website decoration</strong><small>Winter snow, autumn leaves and spring petals.</small></div><ArrowRight /></Link>
              <Link href="/guides/decorate-react-website"><span>03</span><div><strong>React celebration effects</strong><small>Decorate an existing component tree in one call.</small></div><ArrowRight /></Link>
              <Link href="/guides/decorate-nextjs-website"><span>04</span><div><strong>Next.js holiday effects</strong><small>Keep App Router layouts server-rendered.</small></div><ArrowRight /></Link>
              <Link href="/guides/build-custom-zeenat-preset"><span>05</span><div><strong>Campaign and launch presets</strong><small>Compose bunting, lights, sparkles and more.</small></div><ArrowRight /></Link>
            </div>
          </div>
        </section>
        <section className="home-section shell open-source-section">
          <div className="open-source-card"><div><p className="eyebrow">Open source · MIT</p><h2>Inspect every effect. Shape what comes next.</h2><p>Zeenat.js is maintained in public by Talha and Zeenat.js contributors. Read the source, report an issue, propose an effect, or review every release.</p><div className="hero-actions"><a className="button primary" href={GITHUB_URL}><Github size={17} /> Star Zeenat on GitHub</a><a className="button secondary" href={NPM_URL}>View npm package</a></div></div><div className="project-links"><a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}>Contributing <ArrowRight /></a><a href={`${GITHUB_URL}/issues`}>Issues <ArrowRight /></a><Link href="/changelog">Changelog <ArrowRight /></Link><a href={`${GITHUB_URL}/blob/main/LICENSE`}>MIT License <ArrowRight /></a></div></div>
        </section>
    </main>
  );
}
