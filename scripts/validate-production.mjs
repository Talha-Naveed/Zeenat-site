const base = process.argv[2] ?? "http://localhost:3100";
const canonicalOrigin = "https://zeenat.xinuty.com";
const failures = [];

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemapText = await sitemapResponse.text();
const canonicalUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const canonicalPaths = new Set(canonicalUrls.map((url) => new URL(url).pathname));

if (canonicalUrls.length !== 44) failures.push(`Expected 44 sitemap URLs, found ${canonicalUrls.length}.`);

const pages = await Promise.all(canonicalUrls.map(async (canonicalUrl) => {
  const path = new URL(canonicalUrl).pathname;
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  return { canonicalUrl, path, response, html };
}));

for (const { canonicalUrl, path, response, html } of pages) {
  if (response.status !== 200) failures.push(`${path} returned ${response.status}.`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${path} has no title.`);
  if (!/<meta name="description" content="[^"]+"\s*\/>/.test(html)) failures.push(`${path} has no meta description.`);
  const canonical = /<link rel="canonical" href="([^"]+)"\s*\/>/.exec(html)?.[1];
  if (canonical !== canonicalUrl && !(path === "/" && (canonical === canonicalOrigin || canonical === `${canonicalOrigin}/`))) failures.push(`${path} canonical is ${canonical ?? "missing"}.`);
  if (/noindex/i.test(html)) failures.push(`${path} is unexpectedly noindex.`);
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1) failures.push(`${path} has ${h1Count} H1 elements.`);
  if (!/<meta property="og:title" content="[^"]+"\s*\/>/.test(html)) failures.push(`${path} has no Open Graph title.`);
  if (!/<meta property="og:description" content="[^"]+"\s*\/>/.test(html)) failures.push(`${path} has no Open Graph description.`);
  if (!/<meta property="og:url" content="[^"]+"\s*\/>/.test(html)) failures.push(`${path} has no Open Graph URL.`);
  if (!/<meta name="twitter:title" content="[^"]+"\s*\/>/.test(html)) failures.push(`${path} has no X/Twitter title.`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { failures.push(`${path} contains malformed JSON-LD.`); }
  }
  for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = href.split("#")[0].split("?")[0] || path;
    if (!canonicalPaths.has(target) && target !== "/") failures.push(`${path} links to a non-canonical internal route: ${href}`);
  }
}

const robots = await fetch(`${base}/robots.txt`).then((response) => response.text());
for (const required of ["OAI-SearchBot", "Claude-SearchBot", "Claude-User", `Sitemap: ${canonicalOrigin}/sitemap.xml`]) {
  if (!robots.includes(required)) failures.push(`robots.txt is missing ${required}.`);
}

for (const path of ["/llms.txt", "/llms-full.txt", "/opengraph-image", "/icon", "/manifest.webmanifest"]) {
  const response = await fetch(`${base}${path}`);
  if (!response.ok) failures.push(`${path} returned ${response.status}.`);
}

if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exit(1);
}
console.log(`Production validation passed for ${canonicalUrls.length} canonical HTML routes plus robots, LLM indexes, social image, icon, and manifest.`);
