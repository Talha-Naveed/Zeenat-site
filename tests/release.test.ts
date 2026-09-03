import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { flagCatalog } from "zeenat/flags";
import { parseChangelog } from "@/lib/changelog-parser";
import { allIndexablePaths, searchIndex, VERSION } from "@/lib/content";
import { playgroundCode } from "@/components/playground";

const options = { intensity: "medium", motion: "system", seed: 42, count: 12, color: "#ffffff", variant: "flags", flag: "JP", orientation: "vertical" } as const;

describe("0.3.0 release integration", () => {
  it("indexes the new documentation and uses the installed package version", () => {
    expect(VERSION).toBe("0.3.0");
    for (const path of ["/docs/flags", "/docs/presets/bunting", "/docs/presets/pakistan-independence-day"]) {
      expect(allIndexablePaths).toContain(path);
      expect(searchIndex.some((item) => item.href === path)).toBe(true);
    }
    expect(flagCatalog).toHaveLength(249);
    expect(flagCatalog.some(({ code }) => String(code) === "IL")).toBe(false);
    expect(flagCatalog.some(({ code }) => code === "XK")).toBe(true);
  });

  it("preserves wrapped release notes and does not treat Unreleased as a date", () => {
    const releases = parseChangelog(readFileSync("node_modules/zeenat/CHANGELOG.md", "utf8"));
    expect(releases[0]?.version).toBe(VERSION);
    expect(releases[0]?.date).toBeUndefined();
    expect(releases[1]?.date).toBe("2026-08-25");
    const added = releases[0]?.groups.find((group) => group.title === "Added")?.items;
    expect(added).toContain("A locally packaged 249-entry country/territory catalog (excluding IL, plus XK), lazy SVG geometry, `zeenat/flags`, and `createBuntingPreset`.");
    expect(releases[0]?.groups.find((group) => group.title === "Fixed")?.items).toContain("Bunting recalculates in viewport pixels on resize, keeps each item tangent to the cord, and preserves country-flag proportions across responsive screens.");
  });
});

describe("flag integration snippets", () => {
  it("includes the required country and orientation for generic bunting", () => {
    const code = playgroundCode({ ...options, choice: "bunting" });
    expect(code.react).toContain('flag="JP"');
    expect(code.react).toContain('orientation="vertical"');
    expect(code.vanilla).toContain('flag: "JP"');
    expect(code.vanilla).toContain('orientation: "vertical"');
  });

  it.each(["pakistan-independence-day", "pakistan-defence-day", "us-independence-day"] as const)("includes orientation without a country override for %s", (choice) => {
    const code = playgroundCode({ ...options, choice });
    expect(code.react).toContain('orientation="vertical"');
    expect(code.vanilla).toContain('orientation: "vertical"');
    expect(code.react).not.toContain("flag=");
    expect(code.vanilla).not.toContain("flag:");
  });

  it("omits unsupported flag options from seasonal presets", () => {
    const code = playgroundCode({ ...options, choice: "winter" });
    expect(code.react).not.toMatch(/flag=|orientation=/);
    expect(code.vanilla).not.toMatch(/flag:|orientation:/);
  });

  it("keeps country artwork and classic pennant options mutually exclusive", () => {
    const flags = playgroundCode({ ...options, choice: "effect:bunting" });
    for (const code of Object.values(flags)) {
      expect(code).toContain('import { countryFlag } from "zeenat/flags"');
      expect(code).toContain('flags: [countryFlag("JP")]');
      expect(code).toContain('orientation: "vertical"');
      expect(code).not.toMatch(/colors:|shape:/);
    }
    for (const variant of ["pennant", "swallowtail"]) {
      const classic = playgroundCode({ ...options, choice: "effect:bunting", variant });
      for (const code of Object.values(classic)) {
        expect(code).toContain(`shape: "${variant}"`);
        expect(code).toContain('colors: ["#ffffff"]');
        expect(code).not.toMatch(/countryFlag|flags:|orientation:/);
      }
    }
  });
});
