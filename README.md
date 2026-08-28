# Zeenat.js website

The official website and documentation portal for [Zeenat.js](https://github.com/Talha-Naveed/Zeenat), built with Next.js App Router and deployed to Vercel at [zeenat.xinuty.com](https://zeenat.xinuty.com).

## Local development

```bash
npm install
npm run dev
```

The site consumes the published `zeenat` package. Effect options, preset composition, framework examples and engineering claims were audited against Zeenat.js v0.2.1 source. The central registry in `lib/content.ts` drives routes, documentation search, internal links, sitemap entries and the LLM discovery indexes.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run validate:seo
npm run build
```

Production setup and search-engine verification steps are in [`SEO_DEPLOYMENT.md`](SEO_DEPLOYMENT.md).
