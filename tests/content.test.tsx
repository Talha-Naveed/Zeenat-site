import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import { buildSitemap } from "@/app/sitemap";
import { CopyButton } from "@/components/copy-button";
import { DocsSearch } from "@/components/docs-search";
import { playgroundCode } from "@/components/playground";
import { SiteHeader } from "@/components/site-header";
import { HomeCodeTabs } from "@/components/home-code-tabs";
import { allIndexablePaths, effects, presets, searchIndex, SITE_URL } from "@/lib/content";

describe("source-driven content registry", () => {
  it("documents every verified effect and preset exactly once", () => {
    expect(effects.map((effect) => effect.slug)).toEqual([
      "bunting", "aircraft", "sparkles", "fireworks", "snow", "petals", "falling-leaves", "lanterns", "string-lights",
    ]);
    expect(presets.map((preset) => preset.slug)).toEqual([
      "pakistan-defence-day", "us-independence-day", "winter", "autumn", "spring", "festive-lights",
    ]);
    for (const effect of effects) {
      expect(effect.options.length).toBeGreaterThan(3);
      expect(effect.examples).toHaveLength(4);
      expect(effect.options.every((option) => option.type && option.default && option.description)).toBe(true);
    }
  });

  it("keeps canonical sitemap paths complete and unique", () => {
    expect(new Set(allIndexablePaths).size).toBe(allIndexablePaths.length);
    const sitemap = buildSitemap();
    expect(sitemap).toHaveLength(allIndexablePaths.length);
    expect(sitemap.map((entry) => entry.url)).toContain(`${SITE_URL}/docs/effects/snow`);
    expect(sitemap.map((entry) => entry.url)).toContain(`${SITE_URL}/docs/presets/winter`);
    expect(sitemap.every((entry) => entry.url.startsWith(SITE_URL))).toBe(true);
  });

  it("allows production crawlers and declares the canonical sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(JSON.stringify(result.rules)).toContain("OAI-SearchBot");
    expect(JSON.stringify(result.rules)).toContain("Claude-SearchBot");
  });
});

describe("interactive utilities", () => {
  it("generates working React and vanilla code for presets and effects", () => {
    const preset = playgroundCode({ choice: "winter", intensity: "low", motion: "reduced", seed: 12, count: 20, color: "#fff", variant: "slow" });
    expect(preset.react).toContain('preset="winter"');
    expect(preset.vanilla).toContain('from "zeenat/vanilla"');
    const effect = playgroundCode({ choice: "effect:snow", intensity: "high", motion: "full", seed: 42, count: 30, color: "#ffffff", variant: "fast" });
    expect(effect.react).toContain('from "zeenat/effects/snow"');
    expect(effect.react).toContain('speed: "fast"');
  });

  it("copies code and reports completion", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<CopyButton value="npm install zeenat" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("npm install zeenat"));
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("opens documentation search with Ctrl+K and filters API properties", () => {
    render(<DocsSearch items={searchIndex} />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const input = screen.getByRole("textbox", { name: "Search documentation" });
    fireEvent.change(input, { target: { value: "particlesPerBurst" } });
    expect(screen.getByText("Fireworks effect")).toBeInTheDocument();
  });

  it("renders an accessible mobile navigation with every primary destination", () => {
    render(<SiteHeader />);
    expect(screen.getByLabelText("Open navigation").closest("details")).toBeInTheDocument();
    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(mobileNavigation.querySelector('a[href="/docs"]')).toBeInTheDocument();
    expect(mobileNavigation.querySelector('a[href="/playground"]')).toBeInTheDocument();
  });

  it("hydrates the interactive code tabs without a mismatch", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<HomeCodeTabs />);
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => { root = hydrateRoot(container, <HomeCodeTabs />); });
    expect(error).not.toHaveBeenCalled();
    await act(async () => root?.unmount());
    error.mockRestore();
  });
});
