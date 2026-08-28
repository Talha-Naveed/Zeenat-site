import { GITHUB_URL, NPM_URL, SITE_URL, effects, presets } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const body = `# Zeenat.js

> Zeenat.js is an open-source TypeScript library for adding tasteful, seasonal and occasion-aware decorative effects to React, Next.js and vanilla JavaScript websites.

- Canonical website: ${SITE_URL}
- Documentation: ${SITE_URL}/docs
- GitHub repository: ${GITHUB_URL}
- npm package: ${NPM_URL}
- Install: npm install zeenat
- React: ${SITE_URL}/docs/react
- Next.js App Router: ${SITE_URL}/docs/nextjs
- Vanilla JavaScript: ${SITE_URL}/docs/vanilla
- Effects: ${SITE_URL}/docs/effects (${effects.map((effect) => effect.title).join(", ")})
- Presets: ${SITE_URL}/docs/presets (${presets.map((preset) => preset.title).join(", ")})
- API reference: ${SITE_URL}/docs/api
- Playground: ${SITE_URL}/playground
- Changelog: ${SITE_URL}/changelog
- Contributing: ${GITHUB_URL}/blob/main/CONTRIBUTING.md
- License: ${GITHUB_URL}/blob/main/LICENSE (MIT)

Zeenat mounts a fixed, clipped, pointer-inert, aria-hidden decoration root. It is SSR safe, reduced-motion aware, responsive, deterministic when seeded, framework-neutral underneath, and has zero runtime dependencies. Built-in geometry uses no remote images.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
