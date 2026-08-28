import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { readChangelog, versionAnchor } from "@/lib/changelog";
import { GITHUB_URL } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Changelog", description: "Versioned release history for Zeenat.js, synchronized at build time from the CHANGELOG.md shipped with the npm package.", path: "/changelog" });

export default function ChangelogPage() {
  const releases = readChangelog();
  return (
    <main id="main-content" className="shell changelog-page">
      <header className="article-header changelog-header"><p className="eyebrow">Release history</p><h1>Changelog</h1><p>This index is read from the <code>CHANGELOG.md</code> shipped with the installed Zeenat package, so the website does not maintain a second release history.</p></header>
      <div className="changelog-layout">
        <nav aria-label="Release versions"><strong>Versions</strong>{releases.map((release) => <a key={release.version} href={`#${versionAnchor(release.version)}`}>v{release.version}</a>)}</nav>
        <div className="release-list">{releases.map((release, index) => <article key={release.version} id={versionAnchor(release.version)}><header><div><span>{index === 0 ? "Latest" : "Release"}</span><h2>v{release.version}</h2></div>{release.date && <time dateTime={release.date}>{release.date}</time>}<a href={`${GITHUB_URL}/releases/tag/v${release.version}`}>GitHub release <ExternalLink size={13} /></a></header>{release.groups.map((group) => <section key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</article>)}</div>
      </div>
      <p className="changelog-foot">See the <Link href="/docs/getting-started">current documentation</Link> or review every change in the <a href={`${GITHUB_URL}/commits/main/CHANGELOG.md`}>source changelog</a>.</p>
    </main>
  );
}
