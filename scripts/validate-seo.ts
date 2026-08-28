import { allIndexablePaths, docArticles, docsNav, effects, guides, presets, searchIndex, SITE_URL } from "../lib/content";

const errors: string[] = [];
const known = new Set(allIndexablePaths);

function checkUnique(values: readonly string[], label: string) {
  if (new Set(values).size !== values.length) errors.push(`${label} contains duplicates.`);
}

checkUnique(allIndexablePaths, "Sitemap paths");
checkUnique(effects.map((effect) => effect.slug), "Effect slugs");
checkUnique(presets.map((preset) => preset.slug), "Preset slugs");
checkUnique(docArticles.map((doc) => doc.slug), "Documentation slugs");
checkUnique(guides.map((guide) => guide.path), "Guide paths");

for (const path of allIndexablePaths) {
  if (!path.startsWith("/") || path.includes("//") || (path !== "/" && path.endsWith("/"))) errors.push(`Malformed canonical path: ${path}`);
  try { new URL(path, SITE_URL); } catch { errors.push(`Invalid canonical URL: ${path}`); }
}

for (const effect of effects) {
  if (!effect.summary || !effect.description || !effect.reducedMotion || !effect.performance) errors.push(`Effect ${effect.slug} is missing required documentation.`);
  if (effect.options.some((option) => !option.name || !option.type || !option.default || !option.description)) errors.push(`Effect ${effect.slug} has an incomplete API option.`);
}
for (const item of [...docArticles, ...guides]) {
  if (!item.title || !item.description || item.description.length < 50) errors.push(`${item.slug} has weak or missing metadata.`);
}
for (const section of docsNav) {
  for (const [, href] of section.items) if (!known.has(href)) errors.push(`Docs navigation target is absent from sitemap: ${href}`);
}
for (const item of searchIndex) if (!known.has(item.href)) errors.push(`Search target is absent from sitemap: ${item.href}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`SEO registry valid: ${allIndexablePaths.length} canonical routes, ${effects.length} effects, ${presets.length} presets, ${guides.length} guides.`);
