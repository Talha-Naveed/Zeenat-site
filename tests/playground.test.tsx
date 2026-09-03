import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ZeenatProps } from "zeenat";
import { Playground } from "@/components/playground";

vi.mock("zeenat", async (importOriginal) => ({
  ...await importOriginal<typeof import("zeenat")>(),
  Zeenat: ({ preset, flag, orientation }: ZeenatProps) => <output data-testid="scene-options">{JSON.stringify({ preset, flag, orientation })}</output>,
  ZeenatScene: () => <output data-testid="custom-scene">Custom scene</output>,
}));

afterEach(cleanup);

describe("playground flag controls", () => {
  it("passes the selected country and orientation to the preview, clears unsupported options and resets", () => {
    render(<Playground />);
    const country = screen.getByLabelText("Country or territory · 249");
    expect(within(country).getAllByRole("option")).toHaveLength(249);
    fireEvent.change(country, { target: { value: "JP" } });
    fireEvent.change(screen.getByLabelText("Flag orientation"), { target: { value: "vertical" } });
    expect(JSON.parse(screen.getByTestId("scene-options").textContent!)).toEqual({ preset: "bunting", flag: "JP", orientation: "vertical" });
    const code = screen.getByRole("region", { name: "Generated integration code" });
    expect(code).toHaveTextContent('flag="JP"');
    fireEvent.click(screen.getByRole("tab", { name: "Vanilla" }));
    expect(code).toHaveTextContent('flag: "JP"');

    fireEvent.change(screen.getByLabelText("Preset or effect"), { target: { value: "pakistan-independence-day" } });
    expect(screen.queryByLabelText("Country or territory · 249")).not.toBeInTheDocument();
    expect(JSON.parse(screen.getByTestId("scene-options").textContent!)).toEqual({ preset: "pakistan-independence-day", orientation: "vertical" });
    fireEvent.change(screen.getByLabelText("Preset or effect"), { target: { value: "winter" } });
    expect(screen.queryByLabelText("Flag orientation")).not.toBeInTheDocument();
    expect(JSON.parse(screen.getByTestId("scene-options").textContent!)).toEqual({ preset: "winter" });

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByLabelText("Country or territory · 249")).toHaveValue("PK");
    expect(screen.getByLabelText("Flag orientation")).toHaveValue("horizontal");
  });

  it("switches the bunting primitive between flags and both classic shapes", () => {
    render(<Playground />);
    fireEvent.change(screen.getByLabelText("Preset or effect"), { target: { value: "effect:bunting" } });
    expect(screen.getByTestId("custom-scene")).toBeInTheDocument();
    expect(screen.queryByLabelText("Color")).not.toBeInTheDocument();
    for (const variant of ["pennant", "swallowtail"]) {
      fireEvent.change(screen.getByLabelText("Bunting style"), { target: { value: variant } });
      expect(screen.getByLabelText("Color")).toBeInTheDocument();
      expect(screen.queryByLabelText("Country or territory · 249")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Flag orientation")).not.toBeInTheDocument();
      expect(screen.getByRole("region", { name: "Generated integration code" })).toHaveTextContent(`shape: "${variant}"`);
    }
    fireEvent.change(screen.getByLabelText("Bunting style"), { target: { value: "flags" } });
    expect(screen.getByLabelText("Country or territory · 249")).toBeInTheDocument();
    expect(screen.getByLabelText("Flag orientation")).toBeInTheDocument();
  });
});
