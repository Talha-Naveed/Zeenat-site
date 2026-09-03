import { docArticles, effects, GITHUB_URL, guides, NPM_URL, presets, SITE_URL, VERSION } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const sections = [
    "# Zeenat.js — Full documentation index",
    "",
    "Zeenat.js is the open-source TypeScript website decoration and effects library at zeenat.xinuty.com. Package: zeenat. Tagline: Adorn the web.",
    "",
    `Canonical: ${SITE_URL}`,
    `Source: ${GITHUB_URL}`,
    `npm: ${NPM_URL}`,
    `Version: ${VERSION}`,
    "Install: npm install zeenat",
    "",
    "## Documentation",
    ...docArticles.map((doc) => `- [${doc.title}](${SITE_URL}/docs/${doc.slug}): ${doc.description}`),
    "",
    "## Effects",
    ...effects.map((effect) => `- [${effect.title}](${SITE_URL}/docs/effects/${effect.slug}): ${effect.description}`),
    "",
    "## Presets",
    ...presets.map((preset) => `- [${preset.title}](${SITE_URL}/docs/presets/${preset.slug}): ${preset.description}`),
    "",
    "## Guides",
    ...guides.map((guide) => `- [${guide.title}](${SITE_URL}${guide.path}): ${guide.description}`),
    "",
    "## Project",
    `- [Playground](${SITE_URL}/playground)`,
    `- [Changelog](${SITE_URL}/changelog)`,
    `- [Contributing](${GITHUB_URL}/blob/main/CONTRIBUTING.md)`,
    `- [MIT License](${GITHUB_URL}/blob/main/LICENSE)`,
    "",
  ];
  return new Response(sections.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
