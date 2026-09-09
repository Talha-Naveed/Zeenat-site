"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, Pause, Play, RotateCcw, Undo2 } from "lucide-react";
import {
  Zeenat,
  ZeenatScene,
  type BuiltInPresetName,
  type ZeenatEffect,
  type ZeenatHandle,
  type ZeenatIntensity,
  type ZeenatMotionMode,
} from "zeenat";
import { aircraft, bunting, fallingLeaves, fireworks, lanterns, petals, snow, sparkles, stringLights } from "zeenat/effects";
import type { FlagOrientation } from "zeenat/effects/bunting";
import { countryFlag, flagCatalog, type CountryFlag } from "zeenat/flags";

const presetChoices = ["bunting", "pakistan-independence-day", "pakistan-defence-day", "us-independence-day", "winter", "spring", "autumn", "festive-lights"] as const;
const countries = [...flagCatalog].sort((a, b) => a.name.localeCompare(b.name, "en"));
const effectChoices = ["snow", "petals", "falling-leaves", "sparkles", "fireworks", "bunting", "aircraft", "lanterns", "string-lights"] as const;
type EffectChoice = (typeof effectChoices)[number];
type Choice = BuiltInPresetName | `effect:${EffectChoice}`;

function effectCodeName(effect: EffectChoice) { return effect === "falling-leaves" ? "fallingLeaves" : effect === "string-lights" ? "stringLights" : effect; }

function supportsFlagOrientation(choice: Choice) {
  return choice === "bunting" || choice === "pakistan-independence-day" || choice === "pakistan-defence-day" || choice === "us-independence-day";
}

function variantConfig(effect: EffectChoice, variant: string) {
  if (effect === "snow") return `speed: "${variant}"`;
  if (effect === "sparkles") return `shape: "${variant}"`;
  if (effect === "bunting") return `shape: "${variant}"`;
  if (effect === "aircraft") return `direction: "${variant}"`;
  if (effect === "lanterns") return `position: "${variant}"`;
  if (effect === "string-lights") return `position: "${variant}"`;
  if (effect === "petals" || effect === "falling-leaves") return `fallSpeed: ${variant}`;
  if (effect === "fireworks") return `particlesPerBurst: ${variant}`;
  return "";
}

export function playgroundCode(input: { choice: Choice; intensity: ZeenatIntensity; motion: ZeenatMotionMode; seed: number; count: number; color: string; variant: string; flag?: CountryFlag; orientation?: FlagOrientation }) {
  const { choice, intensity, motion, seed, count, color, variant, flag = "PK", orientation = "horizontal" } = input;
  if (!choice.startsWith("effect:")) {
    const reactFlags = `${choice === "bunting" ? `\n  flag="${flag}"` : ""}${supportsFlagOrientation(choice) ? `\n  orientation="${orientation}"` : ""}`;
    const vanillaFlags = `${choice === "bunting" ? `\n  flag: "${flag}",` : ""}${supportsFlagOrientation(choice) ? `\n  orientation: "${orientation}",` : ""}`;
    return {
      react: `import { Zeenat } from "zeenat";\n\n<Zeenat\n  preset="${choice}"${reactFlags}\n  intensity="${intensity}"\n  motion="${motion}"\n  seed={${seed}}\n/>;`,
      vanilla: `import { zeenat } from "zeenat/vanilla";\n\nconst decoration = zeenat({\n  preset: "${choice}",${vanillaFlags}\n  intensity: "${intensity}",\n  motion: "${motion}",\n  seed: ${seed},\n});`,
    };
  }
  const effect = choice.slice(7) as EffectChoice;
  const factory = effectCodeName(effect);
  const flagMode = effect === "bunting" && variant === "flags";
  const flagImport = flagMode ? '\nimport { countryFlag } from "zeenat/flags";' : "";
  const args = flagMode
    ? `flags: [countryFlag("${flag}")], orientation: "${orientation}", count: ${count}`
    : [`colors: ["${color}"]`, `count: ${effect === "fireworks" ? Math.min(count, 8) : effect === "aircraft" ? Math.min(count, 6) : count}`, variantConfig(effect, variant)].filter(Boolean).join(", ");
  return {
    react: `import { ZeenatScene } from "zeenat";\nimport { ${factory} } from "zeenat/effects/${effect}";${flagImport}\n\nconst effects = [${factory}({ ${args} })];\n\n<ZeenatScene effects={effects} intensity="${intensity}" motion="${motion}" seed={${seed}} />;`,
    vanilla: `import { definePreset } from "zeenat/core";\nimport { ${factory} } from "zeenat/effects/${effect}";\nimport { zeenat } from "zeenat/vanilla";${flagImport}\n\nconst preset = definePreset({\n  id: "custom-${effect}",\n  name: "Custom ${effect}",\n  effects: [${factory}({ ${args} })],\n});\n\nconst decoration = zeenat({ preset, intensity: "${intensity}", motion: "${motion}", seed: ${seed} });`,
  };
}

function buildEffect(effect: EffectChoice, count: number, color: string, variant: string, flag: CountryFlag, orientation: FlagOrientation): ZeenatEffect {
  const colors = [color];
  switch (effect) {
    case "snow": return snow({ colors, count, speed: variant as "slow" | "medium" | "fast" });
    case "petals": return petals({ colors, count, fallSpeed: Number(variant) });
    case "falling-leaves": return fallingLeaves({ colors, count, fallSpeed: Number(variant) });
    case "sparkles": return sparkles({ colors, count, shape: variant as "circle" | "diamond" | "star" });
    case "fireworks": return fireworks({ colors, count: Math.min(count, 8), particlesPerBurst: Number(variant) });
    case "bunting": return variant === "flags" ? bunting({ flags: [countryFlag(flag)], orientation, count }) : bunting({ colors, count, shape: variant as "pennant" | "swallowtail" });
    case "aircraft": return aircraft({ colors, count: Math.min(count, 6), direction: variant as "ltr" | "rtl" });
    case "lanterns": return lanterns({ colors, count, position: variant as "top" | "sides" });
    case "string-lights": return stringLights({ colors, count, position: variant as "top" | "bottom" });
  }
}

const variants: Record<EffectChoice, readonly [string, string][]> = {
  snow: [["slow", "Slow"], ["medium", "Medium"], ["fast", "Fast"]],
  petals: [["1.3", "Slow"], ["1", "Medium"], ["0.7", "Fast"]],
  "falling-leaves": [["1.3", "Slow"], ["1", "Medium"], ["0.7", "Fast"]],
  sparkles: [["circle", "Circle"], ["diamond", "Diamond"], ["star", "Star"]],
  fireworks: [["7", "7 particles"], ["10", "10 particles"], ["14", "14 particles"]],
  bunting: [["flags", "Country flags"], ["pennant", "Pennant"], ["swallowtail", "Swallowtail"]],
  aircraft: [["ltr", "Left to right"], ["rtl", "Right to left"]],
  lanterns: [["top", "Top"], ["sides", "Sides"]],
  "string-lights": [["top", "Top"], ["bottom", "Bottom"]],
};

function label(value: string) { return value.split("-").map((part) => part[0]!.toUpperCase() + part.slice(1)).join(" "); }

export function Playground() {
  const [choice, setChoice] = useState<Choice>("bunting");
  const [flag, setFlag] = useState<CountryFlag>("PK");
  const [orientation, setOrientation] = useState<FlagOrientation>("horizontal");
  const [intensity, setIntensity] = useState<ZeenatIntensity>("medium");
  const [motion, setMotion] = useState<ZeenatMotionMode>("system");
  const [seed, setSeed] = useState(2026);
  const [count, setCount] = useState(20);
  const [color, setColor] = useState("#f7f3e8");
  const [variant, setVariant] = useState("slow");
  const [paused, setPaused] = useState(false);
  const [instance, setInstance] = useState(0);
  const [tab, setTab] = useState<"react" | "vanilla">("react");
  const [copied, setCopied] = useState(false);
  const ref = useRef<ZeenatHandle>(null);
  const effectChoice = choice.startsWith("effect:") ? choice.slice(7) as EffectChoice : null;
  const flagEffect = effectChoice === "bunting" && variant === "flags";
  const showCountry = choice === "bunting" || flagEffect;
  const showOrientation = supportsFlagOrientation(choice) || flagEffect;
  const sceneEffects = useMemo(() => effectChoice ? [buildEffect(effectChoice, count, color, variant, flag, orientation)] : undefined, [effectChoice, count, color, variant, flag, orientation]);
  const code = playgroundCode({ choice, intensity, motion, seed, count, color, variant, flag, orientation });

  function choose(value: Choice) {
    setChoice(value);
    const effect = value.startsWith("effect:") ? value.slice(7) as EffectChoice : null;
    if (effect) setVariant(variants[effect][0]![0]);
    if (effect === "aircraft") setCount(2);
    else if (effect === "fireworks") setCount(3);
    else setCount(20);
    setPaused(false);
  }
  function reset() { setChoice("bunting"); setFlag("PK"); setOrientation("horizontal"); setIntensity("medium"); setMotion("system"); setSeed(2026); setCount(20); setColor("#f7f3e8"); setVariant("slow"); setPaused(false); setInstance((v) => v + 1); }
  function togglePause() { if (paused) ref.current?.resume(); else ref.current?.pause(); setPaused((value) => !value); }
  async function copy() { await navigator.clipboard.writeText(code[tab]); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="playground-app">
      <section className="playground-preview" aria-label="Decoration preview">
        {effectChoice && sceneEffects ? <ZeenatScene key={instance} ref={ref} effects={sceneEffects} id={`playground-${effectChoice}`} name="Playground scene" intensity={intensity} motion={motion} seed={seed} zIndex={1} navbar=".preview-nav" /> : <Zeenat key={instance} ref={ref} preset={choice as BuiltInPresetName} {...(choice === "bunting" ? { flag } : {})} {...(supportsFlagOrientation(choice) ? { orientation } : {})} intensity={intensity} motion={motion} seed={seed} zIndex={1} navbar=".preview-nav" />}
        <div className="preview-page" aria-hidden="true"><div className="preview-nav"><span className="preview-logo">Z</span><span /><span /></div><div className="preview-copy"><small>Live composition</small><strong>Adorn the web.</strong><p>Decoration should complement an interface, never compete with it.</p><span className="preview-button">Explore</span></div></div>
        <div className="preview-actions"><button type="button" onClick={togglePause}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? "Resume" : "Pause"}</button><button type="button" onClick={() => { ref.current?.restart(); setPaused(false); }}><RotateCcw size={15} /> Restart</button></div>
      </section>
      <div className="playground-workbench">
        <section className="playground-controls" aria-label="Playground controls">
          <div className="control-heading"><div><span className="eyebrow">Scene controls</span><h2>Compose</h2></div><button type="button" className="reset-button" onClick={reset}><Undo2 size={14} /> Reset</button></div>
          <label><span>Preset or effect</span><select value={choice} onChange={(event) => choose(event.target.value as Choice)}><optgroup label="Presets">{presetChoices.map((value) => <option value={value} key={value}>{label(value)}</option>)}</optgroup><optgroup label="Individual effects">{effectChoices.map((value) => <option value={`effect:${value}`} key={value}>{label(value)}</option>)}</optgroup></select></label>
          {showCountry && <label><span>Country or territory · {flagCatalog.length}</span><select value={flag} onChange={(event) => { setFlag(event.target.value as CountryFlag); setPaused(false); }}>{countries.map((country) => <option value={country.code} key={country.code}>{country.name} ({country.code})</option>)}</select></label>}
          {showOrientation && <label><span>Flag orientation</span><select value={orientation} onChange={(event) => { setOrientation(event.target.value as FlagOrientation); setPaused(false); }}><option value="horizontal">Horizontal</option><option value="vertical">Vertical · 90° clockwise</option></select></label>}
          <div className="control-row"><label><span>Intensity</span><select value={intensity} onChange={(event) => setIntensity(event.target.value as ZeenatIntensity)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label><label><span>Motion</span><select value={motion} onChange={(event) => setMotion(event.target.value as ZeenatMotionMode)}><option value="system">System</option><option value="full">Full</option><option value="reduced">Reduced preview</option></select></label></div>
          <label><span>Deterministic seed</span><input type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value) || 1)} /></label>
          {effectChoice && <fieldset className="effect-options"><legend>{label(effectChoice)} options</legend><label><span>Count · {count}</span><input type="range" min={effectChoice === "fireworks" || effectChoice === "aircraft" ? 1 : 4} max={effectChoice === "aircraft" ? 6 : effectChoice === "fireworks" ? 8 : 60} value={count} onChange={(event) => setCount(Number(event.target.value))} /></label><div className="control-row">{!flagEffect && <label><span>Color</span><input className="color-input" type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label>}<label><span>{effectChoice === "bunting" ? "Bunting style" : "Variant"}</span><select value={variant} onChange={(event) => { setVariant(event.target.value); setPaused(false); }}>{variants[effectChoice].map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label></div></fieldset>}
        </section>
        <section className="playground-code" aria-label="Generated integration code">
          <div className="code-tabs" role="tablist" aria-label="Code target"><button type="button" role="tab" aria-selected={tab === "react"} onClick={() => setTab("react")}>React / Next.js</button><button type="button" role="tab" aria-selected={tab === "vanilla"} onClick={() => setTab("vanilla")}>Vanilla</button><button className="playground-copy" type="button" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy code"}</button></div><pre><code>{code[tab]}</code></pre>
        </section>
      </div>
    </div>
  );
}
