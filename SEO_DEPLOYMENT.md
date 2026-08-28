# Zeenat.js SEO deployment checklist

The canonical production origin is `https://zeenat.xinuty.com`. Vercel preview URLs must remain outside the canonical host and should not be submitted for indexing.

## Production and DNS

1. Deploy the site to the Zeenat Vercel project.
2. Add `zeenat.xinuty.com` as the Vercel custom domain.
3. Add the DNS record Vercel supplies, wait for TLS issuance, and confirm HTTPS.
4. Configure one canonical hostname. Do not redirect the subdomain to `xinuty.com/zeenat`.
5. Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/opengraph-image`, and important HTML routes return `200` on the production hostname.
6. Check CDN or WAF rules do not block Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, or user-triggered Claude-User retrieval.

## Google Search Console

1. Deploy production.
2. Verify `https://zeenat.xinuty.com` using the preferred Search Console property type.
3. If using an HTML verification token, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel and redeploy. Do not commit the token.
4. Submit `https://zeenat.xinuty.com/sitemap.xml`.
5. Inspect the homepage.
6. Inspect `/docs/getting-started`.
7. Inspect representative pages such as `/docs/effects/snow`, `/docs/presets/winter`, and `/guides/decorate-nextjs-website`.
8. Request indexing for the most important pages where appropriate.
9. Monitor indexing, selected canonical URLs, rich-result warnings, search performance, and Core Web Vitals.

## Bing Webmaster Tools

1. Add and verify `https://zeenat.xinuty.com` in Bing Webmaster Tools.
2. If using a meta verification token, set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel and redeploy.
3. Submit `/sitemap.xml` and inspect the homepage plus key documentation routes.
4. Use Bing URL submission for meaningful new or updated documentation when appropriate. This site does not add IndexNow infrastructure because static documentation releases do not justify another secret and submission pipeline yet.

## Entity consistency

1. Set the GitHub repository **About** website field to `https://zeenat.xinuty.com`.
2. In the library repository, add `"homepage": "https://zeenat.xinuty.com"` to `package.json` in the next package release. The website is a separate repository, so it does not mutate the library package metadata itself.
3. Add these prominent links to the library README while keeping its quick start intact:
   - Website: `https://zeenat.xinuty.com`
   - Documentation: `https://zeenat.xinuty.com/docs`
   - Playground: `https://zeenat.xinuty.com/playground`
4. Publish the next npm version so npm reflects the homepage metadata.
5. Keep the project name `Zeenat.js`, npm package `zeenat`, tagline `Adorn the web.`, and factual description consistent across the site, GitHub and npm.
