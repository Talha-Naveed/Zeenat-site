export type ChangelogGroup = { title: string; items: string[] };
export type ChangelogRelease = { version: string; date?: string; groups: ChangelogGroup[] };

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let release: ChangelogRelease | undefined;
  let group: ChangelogGroup | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const releaseMatch = /^##\s+(\d+\.\d+\.\d+(?:-[\w.-]+)?)(?:\s+-\s+(.+))?$/.exec(line);
    if (releaseMatch) {
      // Some published packages retain an "Unreleased" heading; it is not a date.
      const date = /^\d{4}-\d{2}-\d{2}$/.test(releaseMatch[2] ?? "") ? releaseMatch[2] : undefined;
      release = { version: releaseMatch[1]!, ...(date ? { date } : {}), groups: [] };
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
    } else if (/^\s+\S/.test(line) && group?.items.length) {
      group.items[group.items.length - 1] += ` ${line.trim()}`;
    }
  }
  return releases;
}
