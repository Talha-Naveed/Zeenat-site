import type { MetadataRoute } from "next";
import { allIndexablePaths, SITE_URL } from "@/lib/content";

export function buildSitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-25T00:00:00.000Z");
  return allIndexablePaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/changelog" ? "weekly" : path === "/" ? "monthly" : "monthly",
    priority: path === "/" ? 1 : path === "/docs" || path === "/docs/getting-started" ? 0.9 : path.startsWith("/docs/effects/") || path.startsWith("/docs/presets/") ? 0.8 : 0.7,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap { return buildSitemap(); }
