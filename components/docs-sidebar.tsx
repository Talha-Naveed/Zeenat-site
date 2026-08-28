import Link from "next/link";
import { docsNav, searchIndex } from "@/lib/content";
import { DocsSearch } from "@/components/docs-search";

export function DocsSidebar() {
  const navigation = <nav>
    {docsNav.map((section) => (
      <div className="docs-nav-group" key={section.title}>
        <h2>{section.title}</h2>
        <ul>{section.items.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
      </div>
    ))}
  </nav>;
  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      <DocsSearch items={searchIndex} />
      <div className="desktop-docs-nav">{navigation}</div>
      <details className="mobile-docs-nav"><summary>Documentation menu</summary>{navigation}</details>
    </aside>
  );
}
