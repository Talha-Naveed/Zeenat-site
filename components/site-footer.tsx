import Link from "next/link";
import { Github } from "lucide-react";
import { GITHUB_URL, NPM_URL } from "@/lib/content";

const groups = [
  { title: "Product", links: [["Effects", "/docs/effects"], ["Presets", "/docs/presets"], ["Playground", "/playground"]] },
  { title: "Developers", links: [["Documentation", "/docs"], ["API", "/docs/api"], ["npm", NPM_URL], ["Changelog", "/changelog"]] },
  { title: "Project", links: [["Contributing", `${GITHUB_URL}/blob/main/CONTRIBUTING.md`], ["Issues", `${GITHUB_URL}/issues`], ["License", `${GITHUB_URL}/blob/main/LICENSE`]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">Z</span><span>Zeenat.js</span></Link>
          <p>Adorn the web.</p>
          <small>Open source under the MIT License. An open-source project by Talha.</small>
        </div>
        {groups.map((group) => (
          <div key={group.title} className="footer-group">
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
        ))}
        <a href={GITHUB_URL} className="footer-github"><Github size={18} /> Star Zeenat on GitHub</a>
      </div>
    </footer>
  );
}
