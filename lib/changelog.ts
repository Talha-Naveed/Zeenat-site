import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ChangelogGroup = { title: string; items: string[] };
export type ChangelogRelease = { version: string; date?: string; groups: ChangelogGroup[] };

export function readChangelog(): ChangelogRelease[] {
  const markdown = readFileSync(join(process.cwd(), "node_modules", "zeenat", "CHANGELOG.md"), "utf8");
  const releases: ChangelogRelease[] = [];
  let release: ChangelogRelease | undefined;
  let group: ChangelogGroup | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const releaseMatch = /^##\s+([^\s]+)(?:\s+-\s+(.+))?$/.exec(line);
    if (releaseMatch) {
      release = { version: releaseMatch[1]!, ...(releaseMatch[2] ? { date: releaseMatch[2] } : {}), groups: [] };
      releases.push(release);
      group = undefined;
      continue;
    }
    const groupMatch = /^###\s+(.+)$/.exec(line);
    if (groupMatch && release) {
      group = { title: groupMatch[1]!, items: [] };
      release.groups.push(group);
      continue;
    }
    const itemMatch = /^-\s+(.+)$/.exec(line);
    if (itemMatch && release) {
      if (!group) { group = { title: "Changes", items: [] }; release.groups.push(group); }
      group.items.push(itemMatch[1]!);
    }
  }
  return releases;
}

export function versionAnchor(version: string) { return `v${version.replace(/\./g, "-")}`; }
