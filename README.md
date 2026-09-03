# Zeenat.js website

The official website and documentation portal for [Zeenat.js](https://github.com/Talha-Naveed/Zeenat), built with Next.js App Router and deployed to Vercel at [zeenat.xinuty.com](https://zeenat.xinuty.com).

## Local development

```bash
npm install
npm run dev
```

The site consumes the published `zeenat@0.3.0` package. The docs and playground cover nine effects, eight preset IDs, the 249-entry country flag catalog, horizontal and vertical flags, and custom artwork contracts. The displayed version comes from the installed package. The central registry in `lib/content.ts` drives routes, documentation search, internal links, sitemap entries and the LLM discovery indexes.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run validate:seo
npm run build
```

Production setup and search-engine verification steps are in [`SEO_DEPLOYMENT.md`](SEO_DEPLOYMENT.md).
