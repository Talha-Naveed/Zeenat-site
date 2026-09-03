import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseChangelog, type ChangelogRelease } from "@/lib/changelog-parser";

export function readChangelog(): ChangelogRelease[] {
  const markdown = readFileSync(join(process.cwd(), "node_modules", "zeenat", "CHANGELOG.md"), "utf8");
  return parseChangelog(markdown);
}

export function versionAnchor(version: string) { return `v${version.replace(/\./g, "-")}`; }
