import Link from "next/link";
import { Github } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { GITHUB_URL, NPM_URL } from "@/lib/content";

const groups = [
  { title: "Product", links: [["Effects", "/docs/effects"], ["Presets", "/docs/presets"], ["Playground", "/playground"]] },
  { title: "Developers", links: [["Documentation", "/docs"], ["API", "/docs/api"], ["npm", NPM_URL], ["Changelog", "/changelog"]] },
  { title: "Project", links: [["Contributing", `${GITHUB_URL}/blob/main/CONTRIBUTING.md`], ["Issues", `${GITHUB_URL}/issues`], ["License", `${GITHUB_URL}/blob/main/LICENSE`]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand brand-logo-link" aria-label="Zeenat.js home">
            <BrandLogo className="footer-brand-logo" />
          </Link>
          <p>Adorn the web.</p>
          <span>Website decorations and seasonal effects for React, Next.js and JavaScript.</span>
        </div>

        <nav className="footer-sitemap" aria-labelledby="footer-sitemap-title">
          <h2 id="footer-sitemap-title">Sitemap</h2>
          <div className="footer-link-grid">
            {groups.map((group) => (
              <div key={group.title} className="footer-group">
                <h3>{group.title}</h3>
                {group.links.map(([label, href]) => (
                  href.startsWith("/")
                    ? <Link key={href} href={href}>{label}</Link>
                    : <a key={href} href={href}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className="shell footer-bottom">
        <small>Open source under the MIT License. A project by Talha.</small>
        <a href={GITHUB_URL} className="footer-github"><Github size={18} /> Star Zeenat on GitHub</a>
      </div>
    </footer>
  );
}
