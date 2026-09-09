import type { BuiltInPresetName } from "zeenat";
import zeenatPackage from "zeenat/package.json";

export const SITE_URL = "https://zeenat.xinuty.com";
export const GITHUB_URL = "https://github.com/Talha-Naveed/Zeenat";
export const NPM_URL = "https://www.npmjs.com/package/zeenat";
export const VERSION = zeenatPackage.version;

export type ApiOption = {
  name: string;
  type: string;
  required?: boolean;
  default: string;
  description: string;
};

export type CodeExample = {
  label: string;
  code: string;
  language?: "ts" | "tsx" | "js" | "bash";
  filename?: string;
};

export type EffectDoc = {
  slug: string;
  exportName: string;
  title: string;
  summary: string;
  description: string;
  defaultLayer: string;
  colors: readonly string[];
  options: readonly ApiOption[];
  reducedMotion: string;
  performance: string;
  related: readonly string[];
  examples: readonly CodeExample[];
};

const placementOptions = (layer: string): ApiOption[] => [
  { name: "layer", type: '"background" | "ambient" | "foreground" | "top"', default: `"${layer}"`, description: "Semantic layer used to order the effect inside the Zeenat scene." },
  { name: "order", type: "number", default: "—", description: "Optional ordering value among effects in the same semantic layer." },
];

const basicEffectExample = (exportName: string, args = "") => `import { ZeenatScene } from "zeenat";
import { ${exportName} } from "zeenat/effects/${exportName === "fallingLeaves" ? "falling-leaves" : exportName === "stringLights" ? "string-lights" : exportName}";

const effects = [${exportName}(${args})];

export function Decoration() {
  return <ZeenatScene effects={effects} />;
}`;

export const effects: readonly EffectDoc[] = [
  {
    slug: "bunting",
    exportName: "bunting",
    title: "Bunting",
    summary: "Responsive country flags or classic pennants, anchored to a curved SVG cord.",
    description: "Hang country flags, custom flag artwork or classic pennants along the top or bottom of a website. Top bunting clears visible navigation by default, while the cord follows the viewport in pixels, keeps each item tangent to its curve and preserves flag proportions as the screen resizes.",
    defaultLayer: "top",
    colors: ["#0d3b35", "#f7f3e8", "#df745d"],
    options: [
      { name: "colors", type: "readonly string[]", default: "required in pennant mode", description: "Solid pennant colors. Choose colors or flags; they cannot be combined." },
      { name: "flags", type: "readonly BuntingFlagDesign[]", default: "required in flag mode", description: "Reusable country or custom flag designs. Cannot be combined with colors or shape." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Flag mode only. Vertical rotates the complete artwork 90° clockwise without stretching it." },
      { name: "count", type: "number", default: "14", description: "Base item count before intensity and viewport scaling." },
      { name: "position", type: '"top" | "bottom"', default: '"top"', description: "Edge of the viewport used for the cable." },
      { name: "height", type: "number", default: "74 small / 108 large", description: "Rendered SVG height in CSS pixels." },
      { name: "shape", type: '"pennant" | "swallowtail"', default: '"pennant"', description: "Classic pennant mode only; unavailable when flags is supplied." },
      { name: "cableColor", type: "string", default: '"rgba(30, 35, 40, 0.68)"', description: "CSS color used for the cable." },
      ...placementOptions("top"),
    ],
    reducedMotion: "All flags remain visible as a quiet static composition; their subtle alternating sway is omitted.",
    performance: "Flag artwork is drawn once per design into an SVG symbol and reused along the cord. Catalog geometry loads on demand from local package chunks. Aborted or replaced scenes ignore late loads, and rejected loads are handled without an unhandled rejection.",
    related: ["sparkles", "string-lights", "aircraft"],
    examples: [
      { label: "Basic", filename: "Decoration.tsx", code: 'import { ZeenatScene } from "zeenat";\nimport { bunting, pakistanFlag } from "zeenat/effects/bunting";\n\nconst effects = [bunting({ flags: [pakistanFlag], count: 14 })];\n\nexport function Decoration() {\n  return <ZeenatScene effects={effects} />;\n}' },
      { label: "Country flags and orientation", code: 'import { bunting } from "zeenat/effects/bunting";\nimport { countryFlag } from "zeenat/flags";\n\nconst flags = bunting({\n  flags: [countryFlag("PK"), countryFlag("japan")],\n  orientation: "vertical",\n  count: 12,\n});', language: "ts" },
      { label: "Classic pennants", code: 'import { bunting } from "zeenat/effects/bunting";\n\nconst pennants = bunting({ colors: ["#173f5f", "#f8fafc"], count: 8 });\nconst swallowtails = bunting({\n  colors: ["#dc2626", "#f8fafc", "#2563eb"],\n  shape: "swallowtail",\n});', language: "ts" },
      { label: "Combined", code: 'import { bunting, sparkles } from "zeenat/effects";\nimport { unitedStatesFlag } from "zeenat/effects/bunting";\n\nconst effects = [\n  sparkles({ colors: ["#fbbf24"], count: 10 }),\n  bunting({ flags: [unitedStatesFlag] }),\n];', language: "ts" },
    ],
  },
  {
    slug: "aircraft",
    exportName: "aircraft",
    title: "Aircraft",
    summary: "Original fighter-jet silhouettes with a restrained, configurable flyover.",
    description: "The Zeenat aircraft effect sends original SVG fighter jets across a foreground layer, oriented in their direction of travel. Pakistan Defence Day uses a right-to-left flyover. Flight endpoints follow viewport resizing, including changes within the same breakpoint.",
    defaultLayer: "foreground",
    colors: ["#40566d", "#d9e4ec"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#315c4a", "#edf4ef"]', description: "CSS colors used for aircraft bodies and accents." },
      { name: "count", type: "number", default: "2", description: "Base aircraft count before responsive intensity scaling." },
      { name: "direction", type: '"ltr" | "rtl"', default: '"ltr"', description: "Direction of travel across the viewport." },
      { name: "altitude", type: "readonly [number, number]", default: "[0.16, 0.48]", description: "Minimum and maximum vertical position as viewport fractions." },
      ...placementOptions("foreground"),
    ],
    reducedMotion: "The effect mounts no aircraft when effective motion is reduced.",
    performance: "Each aircraft is a small inline SVG animated with transforms and opacity through the Web Animations API.",
    related: ["bunting", "sparkles"],
    examples: [
      { label: "Basic", code: basicEffectExample("aircraft"), filename: "Flyover.tsx" },
      { label: "Subtle", code: 'aircraft({ count: 1, altitude: [0.2, 0.32] })', language: "ts" },
      { label: "Intense", code: 'aircraft({ count: 4, direction: "rtl", colors: ["#334155", "#e2e8f0"] })', language: "ts" },
      { label: "Combined", code: 'definePreset({ id: "flyover", name: "Flyover", effects: [\n  aircraft({ count: 2 }),\n  bunting({ colors: ["#166534", "#ffffff"] }),\n] })', language: "ts" },
    ],
  },
  {
    slug: "sparkles",
    exportName: "sparkles",
    title: "Sparkles",
    summary: "Bounded CSS circles, diamonds or stars with a soft WAAPI shimmer.",
    description: "The Zeenat sparkles effect places small CSS shapes across a configurable portion of the viewport. Seeded positioning makes the scene repeatable, while the animation stays outside React's render cycle.",
    defaultLayer: "ambient",
    colors: ["#d9aa55", "#f8efd5", "#74a49a"],
    options: [
      { name: "colors", type: "readonly string[]", required: true, default: "required", description: "One or more CSS colors used across sparkle marks." },
      { name: "count", type: "number", default: "24", description: "Base mark count before intensity, viewport and motion scaling." },
      { name: "shape", type: '"circle" | "diamond" | "star"', default: '"diamond"', description: "CSS geometry used for each sparkle." },
      { name: "maxY", type: "number", default: "0.9", description: "Maximum vertical placement as a clamped viewport fraction." },
      { name: "opacity", type: "number", default: "0.62", description: "Peak sparkle opacity during full motion." },
      ...placementOptions("ambient"),
    ],
    reducedMotion: "A sparse, static set of marks remains visible at opacity 0.34.",
    performance: "Uses bounded spans animated only with transform and opacity. Reduced motion and small screens lower density.",
    related: ["fireworks", "snow", "petals"],
    examples: [
      { label: "Basic", code: basicEffectExample("sparkles", '{ colors: ["#fbbf24", "#ffffff"] }'), filename: "Sparkles.tsx" },
      { label: "Subtle", code: 'sparkles({ colors: ["#fde68a"], count: 8, opacity: 0.25, shape: "circle" })', language: "ts" },
      { label: "Intense", code: 'sparkles({ colors: ["#f43f5e", "#fbbf24", "#38bdf8"], count: 42, shape: "star" })', language: "ts" },
      { label: "Combined", code: 'const effects = [petals({ count: 14 }), sparkles({ colors: ["#f9a8d4"], count: 9 })];', language: "ts" },
    ],
  },
  {
    slug: "fireworks",
    exportName: "fireworks",
    title: "Fireworks",
    summary: "Modest repeating bursts built from small, transform-animated DOM particles.",
    description: "The Zeenat fireworks effect creates bounded celebratory bursts in the background layer. Each burst uses small DOM particles, seeded placement and compositor-friendly transforms.",
    defaultLayer: "background",
    colors: ["#df745d", "#f5d08a", "#79a9be"],
    options: [
      { name: "colors", type: "readonly string[]", required: true, default: "required", description: "One or more CSS colors cycled across burst particles." },
      { name: "count", type: "number", default: "3", description: "Base number of repeating bursts." },
      { name: "maxY", type: "number", default: "0.52", description: "Maximum vertical origin, clamped from 0.16 to 0.72." },
      { name: "particlesPerBurst", type: "number", default: "10 (minimum 6)", description: "Particle count for every burst." },
      ...placementOptions("background"),
    ],
    reducedMotion: "Fireworks are omitted entirely when effective motion is reduced.",
    performance: "Burst and particle counts are bounded. Transform and opacity animations run through WAAPI and counts shrink on small screens.",
    related: ["sparkles", "bunting", "string-lights"],
    examples: [
      { label: "Basic", code: basicEffectExample("fireworks", '{ colors: ["#dc2626", "#f8fafc", "#2563eb"] }'), filename: "Fireworks.tsx" },
      { label: "Subtle", code: 'fireworks({ colors: ["#fbbf24", "#fff7ed"], count: 1, particlesPerBurst: 7 })', language: "ts" },
      { label: "Intense", code: 'fireworks({ colors: ["#ec4899", "#22d3ee", "#facc15"], count: 5, particlesPerBurst: 14 })', language: "ts" },
      { label: "Combined", code: 'const effects = [fireworks({ colors: ["#f43f5e", "#f8fafc"] }), sparkles({ colors: ["#fbbf24"], shape: "star" })];', language: "ts" },
    ],
  },
  {
    slug: "snow",
    exportName: "snow",
    title: "Snow",
    summary: "Bounded, seeded snowfall with configurable size, speed and drift.",
    description: "The Zeenat snow effect adds bounded animated snowfall to a website using Zeenat's framework-neutral effect engine. It can be imported individually or used as part of the built-in Winter preset.",
    defaultLayer: "ambient",
    colors: ["#ffffff", "#dbeafe"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#ffffff", "#dbeafe"]', description: "CSS colors used for snowflakes." },
      { name: "count", type: "number", default: "34", description: "Base flake count before density scaling; the effect keeps a small minimum." },
      { name: "size", type: "readonly [number, number]", default: "[3, 8]", description: "Minimum and maximum flake diameter in CSS pixels." },
      { name: "opacity", type: "number", default: "0.72", description: "Maximum flake opacity." },
      { name: "speed", type: '"slow" | "medium" | "fast"', default: '"medium"', description: "Fall-duration range: slow 13–20s, medium 9–15s, fast 6–10s." },
      { name: "drift", type: "number", default: "34", description: "Horizontal travel in CSS pixels." },
      ...placementOptions("ambient"),
    ],
    reducedMotion: "The shared falling-element renderer keeps a sparse, static distribution instead of animating flakes across the viewport.",
    performance: "Counts are bounded and scaled for intensity and small screens. Flakes animate with transform and opacity; visibility changes pause the scene scheduler.",
    related: ["sparkles", "string-lights"],
    examples: [
      { label: "Basic", code: basicEffectExample("snow"), filename: "Snowfall.tsx" },
      { label: "Subtle", code: 'snow({ count: 14, speed: "slow", drift: 20, opacity: 0.48 })', language: "ts" },
      { label: "Intense", code: 'snow({ count: 58, speed: "fast", size: [3, 10], drift: 52 })', language: "ts" },
      { label: "Combined", code: 'const effects = [\n  snow({ count: 26 }),\n  stringLights({ colors: ["#fef3c7", "#bfdbfe"] }),\n];', language: "ts" },
    ],
  },
  {
    slug: "petals",
    exportName: "petals",
    title: "Petals",
    summary: "Soft CSS petal forms with configurable fall, drift and rotation.",
    description: "The Zeenat petals effect drifts bounded, seeded petal forms across a website. The effect is framework-neutral and is also used by the built-in Spring preset.",
    defaultLayer: "ambient",
    colors: ["#f9a8d4", "#fecdd3", "#bbf7d0"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#f9a8d4", "#fecdd3", "#fdf2f8"]', description: "CSS colors used for petal forms." },
      { name: "count", type: "number", default: "22", description: "Base petal count before density scaling." },
      { name: "opacity", type: "number", default: "0.62", description: "Maximum petal opacity." },
      { name: "size", type: "readonly [number, number]", default: "[8, 15]", description: "Minimum and maximum petal size in CSS pixels." },
      { name: "drift", type: "number", default: "60", description: "Horizontal travel in CSS pixels." },
      { name: "rotation", type: "number", default: "600", description: "Maximum rotation per fall cycle in degrees." },
      { name: "fallSpeed", type: "number", default: "1", description: "Duration multiplier; values below 1 fall faster, clamped to at least 0.2." },
      ...placementOptions("ambient"),
    ],
    reducedMotion: "A sparse static arrangement remains, with no falling or rotation animation.",
    performance: "The shared falling-element renderer bounds counts, scales for viewport and animates only transform and opacity.",
    related: ["sparkles", "falling-leaves"],
    examples: [
      { label: "Basic", code: basicEffectExample("petals"), filename: "Petals.tsx" },
      { label: "Subtle", code: 'petals({ count: 10, opacity: 0.35, drift: 24, fallSpeed: 1.25 })', language: "ts" },
      { label: "Intense", code: 'petals({ count: 40, size: [8, 19], drift: 90, rotation: 900 })', language: "ts" },
      { label: "Combined", code: 'const effects = [petals({ count: 18 }), sparkles({ colors: ["#f472b6", "#86efac"], opacity: 0.28 })];', language: "ts" },
    ],
  },
  {
    slug: "falling-leaves",
    exportName: "fallingLeaves",
    title: "Falling Leaves",
    summary: "Detailed CSS leaf forms with seeded drift, rotation and fall speed.",
    description: "The Zeenat falling leaves effect adds an autumnal layer of bounded leaf forms with simple vein detail. It can be used alone or through the built-in Autumn preset.",
    defaultLayer: "ambient",
    colors: ["#b45309", "#d97706", "#92400e"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#b45309", "#d97706", "#92400e", "#a16207"]', description: "CSS colors used for leaves." },
      { name: "count", type: "number", default: "20", description: "Base leaf count before density scaling." },
      { name: "opacity", type: "number", default: "0.7", description: "Maximum leaf opacity." },
      { name: "size", type: "readonly [number, number]", default: "[10, 19]", description: "Minimum and maximum leaf size in CSS pixels." },
      { name: "drift", type: "number", default: "72", description: "Horizontal travel in CSS pixels." },
      { name: "rotation", type: "number", default: "720", description: "Maximum rotation per fall cycle in degrees." },
      { name: "fallSpeed", type: "number", default: "1", description: "Duration multiplier; values below 1 fall faster, clamped to at least 0.2." },
      ...placementOptions("ambient"),
    ],
    reducedMotion: "A low-density static leaf composition remains visible without falling or spinning.",
    performance: "Leaf counts are bounded and the shared renderer uses transforms, opacity and responsive density scaling.",
    related: ["petals", "sparkles"],
    examples: [
      { label: "Basic", code: basicEffectExample("fallingLeaves"), filename: "AutumnLeaves.tsx" },
      { label: "Subtle", code: 'fallingLeaves({ count: 9, opacity: 0.45, drift: 32, fallSpeed: 1.3 })', language: "ts" },
      { label: "Intense", code: 'fallingLeaves({ count: 36, size: [11, 22], rotation: 960, fallSpeed: 0.75 })', language: "ts" },
      { label: "Combined", code: 'const effects = [fallingLeaves(), sparkles({ colors: ["#f59e0b", "#fcd34d"], count: 8 })];', language: "ts" },
    ],
  },
  {
    slug: "lanterns",
    exportName: "lanterns",
    title: "Lanterns",
    summary: "Generic inline SVG lanterns with optional glow and restrained sway.",
    description: "The Zeenat lanterns effect decorates a page with generic inline SVG lantern forms. It uses no cultural emblems or external images and supports top or side placement.",
    defaultLayer: "top",
    colors: ["#f59e0b", "#dc2626", "#fef3c7"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#f59e0b", "#dc2626"]', description: "CSS colors cycled across lantern bodies." },
      { name: "count", type: "number", default: "7", description: "Base lantern count before density scaling." },
      { name: "position", type: '"top" | "sides"', default: '"top"', description: "Whether lanterns hang across the top or alternate down the sides." },
      { name: "glow", type: "boolean", default: "true", description: "Adds an SVG drop-shadow based on each lantern color." },
      { name: "sway", type: "boolean", default: "true", description: "Enables a small alternating rotation during full motion." },
      ...placementOptions("top"),
    ],
    reducedMotion: "Lanterns remain visible at lower opacity, but sway is removed.",
    performance: "Each lantern is a compact inline SVG. Count is bounded and scales with intensity, viewport and motion preference.",
    related: ["string-lights", "sparkles"],
    examples: [
      { label: "Basic", code: basicEffectExample("lanterns"), filename: "Lanterns.tsx" },
      { label: "Subtle", code: 'lanterns({ count: 3, colors: ["#d97706"], glow: false, sway: false })', language: "ts" },
      { label: "Intense", code: 'lanterns({ count: 10, position: "sides", colors: ["#dc2626", "#f59e0b", "#0f766e"] })', language: "ts" },
      { label: "Combined", code: 'const effects = [lanterns({ count: 5 }), stringLights({ colors: ["#fbbf24", "#fff7ed"] })];', language: "ts" },
    ],
  },
  {
    slug: "string-lights",
    exportName: "stringLights",
    title: "String Lights",
    summary: "A responsive SVG cable and bulbs with optional twinkle.",
    description: "The Zeenat string lights effect hangs a responsive SVG cable with bounded, colored bulbs along the top or bottom of a website. It is part of the Winter and Festive Lights presets.",
    defaultLayer: "top",
    colors: ["#fbbf24", "#fef3c7", "#fb7185"],
    options: [
      { name: "colors", type: "readonly string[]", default: '["#fbbf24", "#fef3c7", "#f97316"]', description: "CSS colors cycled across bulbs." },
      { name: "count", type: "number", default: "derived from width", description: "Explicit base bulb count. When omitted, spacing and viewport width determine it." },
      { name: "spacing", type: "number", default: "78", description: "Approximate bulb spacing in CSS pixels when count is omitted; minimum 30." },
      { name: "position", type: '"top" | "bottom"', default: '"top"', description: "Viewport edge used for the cable." },
      { name: "depth", type: "number", default: "54 small / 72 large", description: "Cable SVG height in CSS pixels; minimum 28." },
      { name: "twinkle", type: "boolean", default: "true", description: "Enables alternating bulb opacity and scale during full motion." },
      ...placementOptions("top"),
    ],
    reducedMotion: "The cable and bulbs remain visible as a static decoration; twinkle is omitted.",
    performance: "Uses one responsive SVG. Bulb count is bounded, scaled for viewport and animated through WAAPI only when full motion is active.",
    related: ["lanterns", "sparkles", "snow"],
    examples: [
      { label: "Basic", code: basicEffectExample("stringLights"), filename: "Lights.tsx" },
      { label: "Subtle", code: 'stringLights({ count: 9, depth: 46, colors: ["#fef3c7"], twinkle: false })', language: "ts" },
      { label: "Intense", code: 'stringLights({ count: 26, colors: ["#fbbf24", "#fb7185", "#38bdf8"], depth: 88 })', language: "ts" },
      { label: "Combined", code: 'const effects = [stringLights(), lanterns({ count: 4 }), sparkles({ colors: ["#fbbf24"], count: 8 })];', language: "ts" },
    ],
  },
];

export type PresetDoc = {
  slug: BuiltInPresetName;
  title: string;
  summary: string;
  description: string;
  occasion: string;
  effects: readonly string[];
  colors: readonly string[];
  factory: string;
  factoryExample?: string;
  schedule?: readonly [string, string];
  factoryOptions: readonly ApiOption[];
  reducedMotion: string;
  related: readonly string[];
};

const orientationOption: ApiOption = { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Rotate flag artwork 90° clockwise for vertical hanging, preserving its proportions." };

export const presets: readonly PresetDoc[] = [
  {
    slug: "bunting",
    title: "Country Flag Bunting",
    summary: "A responsive cord of country flags for any occasion, with no additional effects.",
    description: "Choose an English country slug or two-letter code from the locally packaged 249-entry catalog. The bunting preset requires flag, supports horizontal or vertical artwork and works independently of a national day or season.",
    occasion: "Any occasion",
    effects: ["bunting"],
    colors: ["#01411c", "#ffffff"],
    factory: "createBuntingPreset",
    factoryExample: 'flag: "PK",\n  orientation: "vertical"',
    factoryOptions: [
      { name: "flag", type: "CountryFlag", required: true, default: "required", description: "Country slug such as pakistan or a code such as PK or JP from zeenat/flags." },
      orientationOption,
    ],
    reducedMotion: "The flag cord stays visible with its sway disabled.",
    related: ["pakistan-independence-day", "pakistan-defence-day", "us-independence-day"],
  },
  {
    slug: "pakistan-independence-day",
    title: "Pakistan Independence Day",
    summary: "Pakistani flag bunting, green-and-white star accents and modest fireworks for 14 August.",
    description: "Celebrate Pakistan Independence Day on 14 August with reusable Pakistani flag artwork and restrained green-and-white effects. The preset combines flag bunting, star-shaped sparkles and small background fireworks.",
    occasion: "14 August · Pakistan",
    effects: ["sparkles", "fireworks", "bunting"],
    colors: ["#01411c", "#ffffff"],
    factory: "createPakistanIndependenceDayPreset",
    factoryExample: 'orientation: "vertical"',
    factoryOptions: [orientationOption],
    schedule: ["2026-08-14T00:00:00+05:00", "2026-08-15T00:00:00+05:00"],
    reducedMotion: "Fireworks are omitted; static Pakistani flags and sparse star accents remain.",
    related: ["bunting", "pakistan-defence-day", "us-independence-day"],
  },
  {
    slug: "pakistan-defence-day",
    title: "Pakistan Defence Day",
    summary: "Pakistani flag bunting, subtle accents and correctly oriented fighter jets flying right to left.",
    description: "A restrained composition for Pakistan Defence Day on 6 September, with reusable Pakistani flag artwork, green-and-white accents and an original right-to-left fighter-jet flyover.",
    occasion: "6 September · Pakistan",
    effects: ["sparkles", "aircraft", "bunting"],
    colors: ["#01411c", "#ffffff", "#315f4b"],
    factory: "createPakistanDefenceDayPreset",
    factoryExample: 'orientation: "vertical"',
    factoryOptions: [orientationOption],
    schedule: ["2026-09-06T00:00:00+05:00", "2026-09-07T00:00:00+05:00"],
    reducedMotion: "Aircraft are omitted; static bunting and sparse sparkle accents remain.",
    related: ["pakistan-independence-day", "bunting", "us-independence-day"],
  },
  {
    slug: "us-independence-day",
    title: "US Independence Day",
    summary: "American flag bunting with star accents and modest fireworks.",
    description: "A national-day composition for United States Independence Day on 4 July, combining reusable American flag artwork with star-shaped sparkles and small background fireworks.",
    occasion: "4 July · United States",
    effects: ["sparkles", "fireworks", "bunting"],
    colors: ["#b22234", "#ffffff", "#3c3b6e"],
    factory: "createUsIndependenceDayPreset",
    factoryExample: 'orientation: "vertical"',
    factoryOptions: [orientationOption],
    schedule: ["2026-07-04T00:00:00-04:00", "2026-07-05T00:00:00-04:00"],
    reducedMotion: "Fireworks are omitted; static bunting and sparse star accents remain.",
    related: ["pakistan-defence-day", "festive-lights"],
  },
  {
    slug: "winter",
    title: "Winter",
    summary: "Quiet snowfall, cool sparkles and a warm line of string lights.",
    description: "The built-in Winter preset is a seasonal website decoration composed from Snow, Sparkles and String Lights. Its typed factory lets each layer be configured or removed.",
    occasion: "Winter season",
    effects: ["snow", "sparkles", "string-lights"],
    colors: ["#ffffff", "#bfdbfe", "#fef3c7"],
    factory: "createWinterPreset",
    factoryOptions: [
      { name: "snow", type: "SnowOptions | false", default: "built-in Snow config", description: "Override Snow options or disable snowfall." },
      { name: "sparkles", type: "SparklesOptions | false", default: "built-in cool accents", description: "Override Sparkles options or remove the accent layer." },
      { name: "lights", type: "StringLightsOptions | false", default: "built-in warm lights", description: "Override String Lights options or disable the cable." },
    ],
    reducedMotion: "Sparse static snow, cool accents and a non-twinkling line of lights remain.",
    related: ["spring", "autumn", "festive-lights"],
  },
  {
    slug: "autumn",
    title: "Autumn",
    summary: "Slowly drifting leaves with restrained amber accents.",
    description: "The built-in Autumn preset combines Falling Leaves with low-density amber Sparkles. Its typed factory supports replacing or disabling either effect.",
    occasion: "Autumn season",
    effects: ["falling-leaves", "sparkles"],
    colors: ["#b45309", "#d97706", "#fcd34d"],
    factory: "createAutumnPreset",
    factoryOptions: [
      { name: "leaves", type: "FallingLeavesOptions | false", default: "built-in leaf config", description: "Override Falling Leaves options or disable leaves." },
      { name: "accents", type: "SparklesOptions | false", default: "built-in amber accents", description: "Override Sparkles options or disable accents." },
    ],
    reducedMotion: "Sparse static leaves and amber accents remain without falling or shimmer motion.",
    related: ["winter", "spring"],
  },
  {
    slug: "spring",
    title: "Spring",
    summary: "Soft drifting petals and fresh, low-density color accents.",
    description: "The built-in Spring preset composes Petals with restrained Sparkles. Its typed factory can tune or remove each layer without an untyped universal options bag.",
    occasion: "Spring season",
    effects: ["petals", "sparkles"],
    colors: ["#f9a8d4", "#fecdd3", "#bbf7d0"],
    factory: "createSpringPreset",
    factoryOptions: [
      { name: "petals", type: "PetalsOptions | false", default: "built-in petal config", description: "Override Petals options or disable petals." },
      { name: "accents", type: "SparklesOptions | false", default: "built-in fresh accents", description: "Override Sparkles options or disable accents." },
    ],
    reducedMotion: "A sparse static arrangement of petals and accents remains.",
    related: ["autumn", "winter"],
  },
  {
    slug: "festive-lights",
    title: "Festive Lights",
    summary: "Warm string lights, neutral lantern forms and subtle gold accents.",
    description: "The built-in Festive Lights preset is a general celebration composition of String Lights, Lanterns and Sparkles. It avoids occasion-specific symbols so it can support a range of events.",
    occasion: "General celebration",
    effects: ["sparkles", "lanterns", "string-lights"],
    colors: ["#fbbf24", "#d97706", "#fb7185"],
    factory: "createFestiveLightsPreset",
    factoryOptions: [
      { name: "lights", type: "StringLightsOptions | false", default: "built-in string lights", description: "Override String Lights options or disable them." },
      { name: "lanterns", type: "LanternsOptions | false", default: "built-in lanterns", description: "Override Lantern options or disable them." },
      { name: "accents", type: "SparklesOptions | false", default: "built-in gold accents", description: "Override Sparkles options or disable them." },
    ],
    reducedMotion: "Static lanterns, lights and sparse gold accents remain; sway and twinkle stop.",
    related: ["winter", "pakistan-defence-day", "us-independence-day"],
  },
];

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  code?: CodeExample;
  links?: readonly { label: string; href: string }[];
};

export type ArticleDoc = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  sections: readonly ArticleSection[];
};

export const docArticles: readonly ArticleDoc[] = [
  {
    slug: "what-is-zeenat",
    title: "What is Zeenat.js?",
    description: "A clear explanation of Zeenat.js, its effect engine, presets, framework support, accessibility behavior and intended use.",
    eyebrow: "Core concept",
    sections: [
      { id: "definition", title: "A decoration layer for an existing website", paragraphs: ["Zeenat.js is an open-source TypeScript library for adding decorative, seasonal and occasion-aware visual effects to React, Next.js and vanilla JavaScript websites. It mounts a fixed, clipped overlay, so an application does not need to restructure its page or move content into a special component.", "It is not only a confetti package. Zeenat provides reusable visual primitives such as snow, petals, falling leaves, bunting, fireworks, lanterns and string lights, plus presets that compose those primitives for a season or occasion."] },
      { id: "effects-and-presets", title: "Effects and presets", paragraphs: ["An Effect is a framework-neutral factory that mounts one visual primitive into an engine-owned semantic layer. A Preset is a named composition of effects. Presets reuse effect implementations instead of copying their animation code."], links: [{ label: "Browse all effects", href: "/docs/effects" }, { label: "Browse built-in presets", href: "/docs/presets" }] },
      { id: "frameworks", title: "React, Next.js and vanilla JavaScript", paragraphs: ["React applications use the Zeenat component or ZeenatScene. Next.js App Router layouts can remain Server Components because Zeenat contains its own client boundary and server-renders a stable empty decoration root. Non-React applications call zeenat() from the zeenat/vanilla entry and receive a pause, resume, restart and destroy controller."], links: [{ label: "React integration", href: "/docs/react" }, { label: "Next.js integration", href: "/docs/nextjs" }, { label: "Vanilla JavaScript integration", href: "/docs/vanilla" }] },
      { id: "layout-and-input", title: "Layout and pointer behavior", paragraphs: ["The root and layers are fixed or absolute, clipped, layout-contained, aria-hidden and pointer-inert. Zeenat changes no host class, stylesheet, custom property or layout node, and its decorative geometry cannot receive pointer or keyboard input."] },
      { id: "accessibility", title: "Motion and accessibility", paragraphs: ["prefers-reduced-motion is honored by default. High-motion effects disappear or become sparse static compositions, while semantic event content stays in the host application. Applications can preview or explicitly override the effective motion mode when needed."], links: [{ label: "Accessibility and reduced motion", href: "/docs/accessibility" }] },
      { id: "custom", title: "Custom effects and presets", paragraphs: ["Developers can define custom effects with a scoped scheduler, seeded randomness, animation ownership, resize hooks and cleanup signals. Custom presets compose those effects with built-in effects through definePreset."], links: [{ label: "Create a custom effect", href: "/docs/custom-effects" }, { label: "Create a custom preset", href: "/docs/custom-presets" }] },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Install Zeenat.js and add a seasonal website decoration to React, Next.js or vanilla JavaScript in a few lines.",
    eyebrow: "Start here",
    sections: [
      { id: "install", title: "Install Zeenat", paragraphs: ["Zeenat requires Node.js 20.19 or newer for its development toolchain. React and React DOM are peer dependencies; the framework-neutral engine has zero runtime dependencies."], code: { label: "Install", language: "bash", code: "npm install zeenat" } },
      { id: "first-decoration", title: "Render a preset", paragraphs: ["Choose one of eight built-in preset IDs. Country Flag Bunting also requires a flag; the other seven are ready-to-use seasonal or national-day compositions. Every scene is decorative, fixed, pointer-inert and cleaned up automatically when it unmounts."], code: { label: "React", filename: "App.tsx", code: 'import { Zeenat } from "zeenat";\n\nexport function App() {\n  return <Zeenat preset="bunting" flag="pakistan" />;\n}' } },
      { id: "control", title: "Choose intensity and duration", paragraphs: ["Intensity scales effect density. Duration is infinite by default; provide milliseconds for a finite scene. The seed stabilizes generated positions and timing."], code: { label: "Options", filename: "App.tsx", code: '<Zeenat\n  preset="spring"\n  intensity="low"\n  duration={8_000}\n  seed={2026}\n/>' } },
      { id: "next", title: "Choose your integration", paragraphs: ["Continue with the integration guide for your framework or open the playground to explore presets, individual effects and lifecycle controls."], links: [{ label: "React", href: "/docs/react" }, { label: "Next.js App Router", href: "/docs/nextjs" }, { label: "Vanilla JavaScript", href: "/docs/vanilla" }, { label: "Open playground", href: "/playground" }] },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Package requirements, imports, ESM and CJS output, React peer dependencies and supported Zeenat.js subpath exports.",
    eyebrow: "Setup",
    sections: [
      { id: "package", title: "Install the package", paragraphs: [`The npm package name is zeenat. Version ${VERSION} ships ESM, CommonJS, declarations and sourcemaps. Optional flag geometry is split into on-demand chunks in both builds; keep the complete package output when deploying.`], code: { label: "npm", language: "bash", code: "npm install zeenat" } },
      { id: "entry-points", title: "Choose the smallest entry point", paragraphs: ["The main entry exports React adapters and core definitions. Framework-neutral consumers can use zeenat/core or zeenat/vanilla. Effects and configurable presets have aggregate and individual subpath exports for tree shaking."], code: { label: "Imports", language: "ts", code: 'import { Zeenat } from "zeenat";\nimport { zeenat } from "zeenat/vanilla";\nimport { snow } from "zeenat/effects/snow";\nimport { createWinterPreset } from "zeenat/presets/winter";' } },
      { id: "peers", title: "React peer dependencies", paragraphs: ["React 18.2 or newer is supported. React DOM is an optional peer for framework integration, while framework-neutral entries do not depend on React at runtime."] },
      { id: "flags", title: "Optional country flags", paragraphs: ["zeenat/flags exports flagCatalog, resolveFlag and countryFlag. Country metadata is synchronous; selected artwork loads from local package chunks when a flag scene mounts."], code: { label: "Flag imports", language: "ts", code: 'import { flagCatalog, countryFlag, resolveFlag } from "zeenat/flags";\nimport { createBuntingPreset } from "zeenat/presets/bunting";' }, links: [{ label: "Country flags and custom artwork", href: "/docs/flags" }] },
    ],
  },
  {
    slug: "react",
    title: "Using Zeenat.js with React",
    description: "Use the Zeenat React component, ZeenatScene, typed props and controller ref in a React application.",
    eyebrow: "Integration",
    sections: [
      { id: "component", title: "Add Zeenat to an existing React tree", paragraphs: ["Zeenat renders one stable decoration root. Scene animations run outside React's render cycle; scene-level prop changes rebuild only owned effect layers."], code: { label: "React", filename: "App.tsx", code: 'import { Zeenat } from "zeenat";\n\nexport function App() {\n  return (\n    <>\n      <Zeenat preset="winter" intensity="medium" />\n      <main>Your existing application</main>\n    </>\n  );\n}' } },
      { id: "scene", title: "Compose individual effects", paragraphs: ["ZeenatScene creates a typed custom preset from an effect array. Keep the array stable outside the component or memoize it to avoid unnecessary scene rebuilds."], code: { label: "ZeenatScene", filename: "Decoration.tsx", code: 'import { ZeenatScene } from "zeenat";\nimport { snow, stringLights } from "zeenat/effects";\n\nconst effects = [snow({ count: 20 }), stringLights()];\n\nexport function Decoration() {\n  return <ZeenatScene effects={effects} intensity="low" />;\n}' } },
      { id: "ref", title: "Use the controller ref", paragraphs: ["A ZeenatHandle exposes pause, resume, restart, destroy, setIntensity, diagnostics snapshots and diagnostics subscriptions."], code: { label: "Controller", filename: "Controls.tsx", code: 'const ref = useRef<ZeenatHandle>(null);\n\n<Zeenat ref={ref} preset="spring" />;\n<button onClick={() => ref.current?.pause()}>Pause</button>' } },
    ],
  },
  {
    slug: "nextjs",
    title: "Using Zeenat.js with Next.js",
    description: "Add Zeenat.js to a Next.js App Router layout while keeping the layout a Server Component and preserving SSR safety.",
    eyebrow: "Integration",
    sections: [
      { id: "app-router", title: "Keep the root layout on the server", paragraphs: ["The Zeenat component contains its own client boundary, so importing it in an App Router layout does not turn the layout into a Client Component. Server output is a stable, empty decoration root."], code: { label: "Next.js", filename: "app/layout.tsx", code: 'import { Zeenat } from "zeenat";\nimport type { ReactNode } from "react";\n\nexport default function RootLayout({ children }: { children: ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <Zeenat preset="winter" />\n        {children}\n      </body>\n    </html>\n  );\n}' } },
      { id: "ssr", title: "Why the import is SSR safe", paragraphs: ["Zeenat accesses no window, document, navigator or matchMedia during module evaluation. Browser work begins in the component's client effect. The vanilla entry is also safe to import during SSR, but zeenat() itself must be called in a browser."] },
      { id: "route-scoped", title: "Decorate one route", paragraphs: ["Place Zeenat in a nested layout or a page-specific Client Component when a decoration should only exist in one route segment. React unmount cleanup removes the root, animations, timers and scoped listeners."] },
    ],
  },
  {
    slug: "vanilla",
    title: "Using Zeenat.js without React",
    description: "Use the framework-neutral Zeenat.js browser controller from vanilla JavaScript or TypeScript.",
    eyebrow: "Integration",
    sections: [
      { id: "start", title: "Create a decoration", paragraphs: ["Call zeenat() in a browser. By default the engine mounts under document.body; provide mount to place the root under another element."], code: { label: "Vanilla", filename: "main.ts", language: "ts", code: 'import { zeenat } from "zeenat/vanilla";\n\nconst decoration = zeenat({\n  preset: "us-independence-day",\n  intensity: "medium",\n});' } },
      { id: "lifecycle", title: "Control and destroy it", paragraphs: ["The controller supports pause, resume, restart, setIntensity and idempotent destroy. Always destroy long-lived page decorations when the hosting view is removed."], code: { label: "Controller", filename: "main.ts", language: "ts", code: 'decoration.pause();\ndecoration.resume();\ndecoration.setIntensity("low");\ndecoration.restart();\ndecoration.destroy();' } },
      { id: "ssr", title: "Importing during SSR", paragraphs: ["Importing zeenat/vanilla on the server is safe. Calling zeenat() without a browser document throws a clear error, so invoke it only after the client mounts."] },
    ],
  },
  {
    slug: "flags",
    title: "Country flags and custom artwork",
    description: "Use Zeenat's 249-entry country flag catalog, horizontal or vertical bunting, reusable flag designs and custom SVG artwork contracts.",
    eyebrow: "New in 0.3.0",
    sections: [
      { id: "simple", title: "Flags for any occasion", paragraphs: ["Use preset=\"bunting\" with a country flag to hang flags without fireworks, sparkles or an occasion-specific composition. The flag option accepts English slugs such as pakistan or japan and case-insensitive two-letter codes such as PK or JP."], code: { label: "React / Next.js", code: 'import { Zeenat } from "zeenat";\n\n<Zeenat preset="bunting" flag="pakistan" />;\n<Zeenat preset="bunting" flag="JP" orientation="vertical" />;' } },
      { id: "vanilla", title: "Vanilla JavaScript", paragraphs: ["The framework-neutral API uses the same flag and orientation options. Destroy the decoration when its hosting view is removed."], code: { label: "Vanilla", language: "ts", code: 'import { zeenat } from "zeenat/vanilla";\n\nconst decoration = zeenat({\n  preset: "bunting",\n  flag: "pakistan",\n  orientation: "vertical",\n});\n\n// When the view is removed:\ndecoration.destroy();' } },
      { id: "catalog", title: "The packaged country catalog", paragraphs: ["flagCatalog contains 249 country and territory entries, each with code, name and slug. The catalog excludes IL and includes XK. Use these entries as the source for a country picker; unsupported names and codes are rejected.", "resolveFlag resolves a supported name or code to metadata. countryFlag returns a reusable design synchronously, without browser globals; its optional geometry is loaded only when mounted. The playground's country selector uses this same catalog."], code: { label: "Catalog helpers", language: "ts", code: 'import { flagCatalog, resolveFlag, countryFlag } from "zeenat/flags";\n\nconst countries = flagCatalog; // { code, name, slug }[]\nconst japan = resolveFlag("JP");\nconst japanArtwork = countryFlag("japan");' }, links: [{ label: "Try the country picker", href: "/playground" }, { label: "Full country catalog", href: `${GITHUB_URL}/blob/v0.3.0/docs/flags-catalog.md` }] },
      { id: "orientation", title: "Horizontal and vertical flags", paragraphs: ["Horizontal is the default. Vertical rotates the complete artwork 90° clockwise without stretching it; country-specific ceremonial vertical variants are not represented. Items remain tangent to the curved cord and keep their proportions when the viewport resizes.", "The simple API supports orientation on bunting, pakistan-independence-day, pakistan-defence-day and us-independence-day. Their typed factories expose orientation too. Set flag only on the generic bunting preset."], code: { label: "Typed preset", language: "ts", code: 'import { createBuntingPreset } from "zeenat/presets/bunting";\nimport { createPakistanIndependenceDayPreset } from "zeenat/presets/pakistan-independence-day";\n\nconst japan = createBuntingPreset({ flag: "JP", orientation: "vertical" });\nconst independenceDay = createPakistanIndependenceDayPreset({\n  orientation: "vertical",\n});' } },
      { id: "primitive", title: "Reusable designs and mixed flags", paragraphs: ["pakistanFlag and unitedStatesFlag are original reusable designs exported by zeenat/effects/bunting. Pass one or more designs through flags to repeat them along a cord. Use countryFlag for any supported catalog entry.", "BuntingOptions is a union: flag mode takes flags and optional orientation; classic pennant mode takes colors and optional shape. Do not combine flags with colors or shape. Both modes support count, position, height, cableColor, layer and order."], code: { label: "Custom composition", language: "ts", code: 'import { bunting, pakistanFlag, unitedStatesFlag } from "zeenat/effects/bunting";\nimport { countryFlag } from "zeenat/flags";\n\nconst international = bunting({\n  flags: [pakistanFlag, unitedStatesFlag, countryFlag("JP")],\n  orientation: "horizontal",\n  count: 12,\n});\n\nconst classic = bunting({\n  colors: ["#01411c", "#ffffff"],\n  shape: "swallowtail",\n});' }, links: [{ label: "Complete bunting options", href: "/docs/effects/bunting" }] },
      { id: "custom-artwork", title: "Custom flag artwork contracts", paragraphs: ["Import BuntingFlagDesign and BuntingFlagRenderContext from zeenat/effects/bunting. A design provides a stable id, an aspectRatio and a render function. Artwork is drawn into a normalized SVG symbol once and reused by the flags on the cord.", "Use the supplied document and container, keep SVG complexity bounded and prefix internal SVG IDs with container.id. The normalized viewBox is 0 0 width 1. If render awaits work, check signal.aborted before appending geometry. The owning effect aborts when removed, restarted or rebuilt across a breakpoint. Rejected renders mark the symbol as failed and are handled without an unhandled rejection."], code: { label: "Public contracts", language: "ts", code: 'interface BuntingFlagDesign {\n  readonly id: string;\n  readonly aspectRatio: number;\n  render(context: BuntingFlagRenderContext): void | Promise<void>;\n}\n\ninterface BuntingFlagRenderContext {\n  readonly document: Document;\n  readonly container: SVGSymbolElement;\n  readonly width: number;\n  readonly height: number;\n  readonly signal: AbortSignal;\n}' } },
      { id: "loading-and-license", title: "Local loading and artwork licensing", paragraphs: ["Country metadata ships with the package. Optional artwork geometry is split into on-demand ESM and CJS chunks, so selecting a country does not eagerly load every flag. Keep the complete generated dist directory when deploying. No remote image host or flag runtime dependency is required.", "Pakistan and United States artwork is original CSS/SVG. Other artwork is adapted from the MIT-licensed country-flag-icons project. The package includes artwork licensing, and the source repository includes a reproducible development-only generator pinned to country-flag-icons@1.6.20."], links: [{ label: "Package source and licensing", href: `${GITHUB_URL}/tree/v0.3.1` }, { label: "Performance and loading", href: "/docs/performance" }] },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration reference",
    description: "Reference for Zeenat preset, bunting navigation placement, intensity, duration, motion, scheduling, seed, z-index, enabled and diagnostics options.",
    eyebrow: "Reference",
    sections: [
      { id: "options", title: "Scene options", paragraphs: ["React ZeenatProps extends ZeenatOptions and adds className. The vanilla adapter adds an optional mount target and className."], code: { label: "TypeScript", language: "ts", code: 'type ZeenatOptions = {\n  preset: BuiltInPresetName | ZeenatPreset;\n  flag?: CountryFlag; // required for preset="bunting" only\n  orientation?: "horizontal" | "vertical"; // flag-bunting presets only\n  navbar?: string | false; // "auto" by default\n  intensity?: "low" | "medium" | "high"; // medium\n  duration?: number | "infinite"; // infinite\n  zIndex?: number; // 1000\n  respectReducedMotion?: boolean; // true\n  motion?: "system" | "full" | "reduced"; // system\n  enabled?: boolean; // true\n  seed?: number;\n  activeFrom?: string | Date;\n  activeUntil?: string | Date;\n  debug?: boolean; // false\n};' } },
      { id: "flags", title: "Flag and orientation", paragraphs: ["flag is required for the bunting string preset and invalid on other presets. orientation defaults to horizontal and is accepted by bunting, pakistan-independence-day, pakistan-defence-day and us-independence-day. For a custom preset object, configure orientation inside its factory or bunting effect instead of passing it at the scene level."], code: { label: "Flag options", code: '<Zeenat preset="bunting" flag="JP" orientation="vertical" />;\n<Zeenat preset="pakistan-independence-day" orientation="horizontal" />;' }, links: [{ label: "Country flags", href: "/docs/flags" }] },
      { id: "navbar", title: "Keep top bunting clear of navigation", paragraphs: ["Top bunting starts below the visible bottom edge of site navigation without inserting space or changing host styles. The default navbar=\"auto\" detects common header, nav, banner and navigation regions near the viewport top. It follows fixed or sticky headers, scrolling and sliding headers, resizes, and late-mounted or replaced navigation.", "For non-semantic, unusually tall or narrow navigation, pass a CSS selector. If several regions match, bunting clears the lowest visible edge. Pass false to retain the original viewport-top placement. The setting affects top bunting in built-in and custom presets; bottom bunting and every other effect stay in their existing position."], code: { label: "Navbar placement", language: "tsx", filename: "Decoration.tsx", code: 'import { Zeenat } from "zeenat";\nimport { zeenat } from "zeenat/vanilla";\n\n// A selector for a custom header. "auto" is the default.\n<Zeenat preset="bunting" flag="pakistan" navbar="#site-header" />;\n\n// Opt out and keep top bunting at the viewport edge.\nzeenat({ preset: "bunting", flag: "pakistan", navbar: false });' } },
      { id: "seed", title: "Deterministic seed", paragraphs: ["A normalized scene seed derives one stable random stream for every preset effect index. Restarting with the same seed replays the same generated geometry."] },
      { id: "motion", title: "Motion override", paragraphs: ["Use system for normal applications. full and reduced are explicit overrides intended for user-controlled motion settings and preview tools. respectReducedMotion is true by default."] },
      { id: "z-index", title: "Host z-index", paragraphs: ["zIndex controls the root's relationship with the host application. Individual effects use background, ambient, foreground and top bands inside that root and cannot escape the scene."] },
    ],
  },
  {
    slug: "scheduling",
    title: "Scheduling decorations",
    description: "Schedule Zeenat.js decorations with timezone-safe active windows and finite durations.",
    eyebrow: "Configuration",
    sections: [
      { id: "window", title: "Set an activation window", paragraphs: ["Use activeFrom and activeUntil for seasonal campaigns and special occasions. Strings require Z or an explicit UTC offset, which prevents server and browser timezone differences."], code: { label: "Schedule", filename: "Decoration.tsx", code: '<Zeenat\n  preset="pakistan-defence-day"\n  activeFrom="2026-09-05T00:00:00+05:00"\n  activeUntil="2026-09-07T00:00:00+05:00"\n/>' } },
      { id: "duration", title: "Stop after a duration", paragraphs: ["duration accepts milliseconds or infinite. Long activation and duration timers are chunked around browser timer limits."] },
      { id: "dates", title: "Date objects", paragraphs: ["Date objects are supported, but serialized strings with explicit offsets make deployments and code review easier to reason about. Invalid or ambiguous schedule values fail validation."] },
    ],
  },
  {
    slug: "customization",
    title: "Customizing Zeenat.js",
    description: "Customize Zeenat scenes with intensity, seeds, typed preset factories and individually imported effects.",
    eyebrow: "Customization",
    sections: [
      { id: "simple", title: "Start with scene-level controls", paragraphs: ["Intensity adjusts density across the scene, while seed stabilizes geometry. These options are the smallest way to tune a built-in preset."], code: { label: "Scene options", code: '<Zeenat preset="winter" intensity="low" seed={42} />' } },
      { id: "factory", title: "Use a typed preset factory", paragraphs: ["All eight preset IDs have typed factories. Winter, Autumn, Spring and Festive Lights let you configure or disable individual layers. The three national-day factories accept orientation; createBuntingPreset requires flag and optionally accepts orientation."], code: { label: "Typed factory", filename: "Decoration.tsx", code: 'import { Zeenat } from "zeenat";\nimport { createWinterPreset } from "zeenat/presets/winter";\n\nconst quietWinter = createWinterPreset({\n  snow: { count: 14, speed: "slow", drift: 20 },\n  sparkles: false,\n});\n\nexport function Decoration() {\n  return <Zeenat preset={quietWinter} />;\n}' } },
      { id: "compose", title: "Compose your own preset", paragraphs: ["For brand events and campaigns, define a named preset from individually imported effects. This keeps reusable visual primitives separate from occasion meaning."], links: [{ label: "Custom preset guide", href: "/docs/custom-presets" }, { label: "Build a custom Zeenat preset", href: "/guides/build-custom-zeenat-preset" }] },
    ],
  },
  {
    slug: "custom-effects",
    title: "Creating custom effects",
    description: "Author a Zeenat.js effect with scoped DOM ownership, seeded randomness, reduced motion and deterministic cleanup.",
    eyebrow: "Authoring",
    sections: [
      { id: "contract", title: "Use the effect context", paragraphs: ["An effect is a culturally neutral visual primitive. It receives one owned layer, a seeded random source, viewport snapshot, effective motion, scheduler, animation registry, resize hook and abort signal. It should not know about React, routing or the host application."], code: { label: "Custom effect", filename: "falling-hearts.ts", language: "ts", code: 'import { defineEffect } from "zeenat/core";\n\nexport function fallingHearts(color: string) {\n  return defineEffect({\n    id: "falling-hearts",\n    layer: "ambient",\n    mount(context) {\n      const heart = context.layer.ownerDocument.createElement("span");\n      heart.textContent = "♥";\n      heart.style.color = color;\n      heart.style.position = "absolute";\n      heart.style.left = `${context.randomBetween(5, 95)}%`;\n      context.layer.append(heart);\n\n      if (context.motion === "full") {\n        context.animate(heart, [{ opacity: 0 }, { opacity: 0.7 }], {\n          duration: 3000, iterations: Infinity, direction: "alternate",\n        });\n      }\n    },\n  });\n}' } },
      { id: "requirements", title: "Resource and accessibility requirements", paragraphs: ["Bound node, animation, timer and RAF counts. Reduce density on small screens. Provide a deliberate static or absent reduced-motion mode. Do not inject global CSS, fetch remote assets, add focusable nodes or capture pointer events."] },
      { id: "cleanup", title: "Let the scope own resources", paragraphs: ["Nodes inside context.layer, animations created with context.animate, scheduler callbacks and resize callbacks are owned by the effect scope. Return a cleanup function for any observer, worker or external resource created directly."] },
    ],
  },
  {
    slug: "custom-presets",
    title: "Creating custom presets",
    description: "Compose built-in or custom Zeenat effects into a typed, reusable website decoration preset.",
    eyebrow: "Authoring",
    sections: [
      { id: "compose", title: "Compose effects; do not copy them", paragraphs: ["A preset gives reusable effects a shared occasion, season or campaign meaning. IDs must use lowercase kebab case and the preset must contain at least one valid effect."], code: { label: "Preset", filename: "company-anniversary.ts", language: "ts", code: 'import { definePreset } from "zeenat/core";\nimport { bunting, sparkles } from "zeenat/effects";\n\nexport const companyAnniversary = definePreset({\n  id: "company-anniversary",\n  name: "Company anniversary",\n  description: "Brand-colored bunting with restrained gold accents.",\n  tags: ["company", "anniversary"],\n  effects: [\n    sparkles({ colors: ["#d6a84b", "#ffffff"], count: 12 }),\n    bunting({ colors: ["#173f5f", "#ffffff"] }),\n  ],\n});' } },
      { id: "metadata", title: "Preset metadata", paragraphs: ["description and tags make presets easier to understand. region, occasion, season and author are optional. Cultural metadata should be specific only when accurate and useful; dates belong in the caller's scheduling options."] },
      { id: "validate", title: "Validate contributed presets", paragraphs: ["The library repository exposes validatePresetDefinition, validatePresetCollection and a preset validation script. Validation checks IDs, metadata, effects, repeated effect IDs and duplicate preset IDs."] },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility and reduced motion",
    description: "How Zeenat.js keeps decoration non-semantic, pointer-inert and responsive to reduced-motion preferences.",
    eyebrow: "Engineering",
    sections: [
      { id: "decorative", title: "Decoration stays outside the accessibility tree", paragraphs: ["The root, semantic layers and generated geometry are aria-hidden. They cannot receive pointer or keyboard input. Never put meaningful text, status or controls inside a custom effect; render that content in the host application."] },
      { id: "reduced-motion", title: "Reduced motion is a design mode", paragraphs: ["prefers-reduced-motion: reduce is honored by default. Aircraft and fireworks disappear. Falling effects become sparse static arrangements. Bunting, lanterns and string lights remain visible without sway or twinkle. Sparkles become a sparse static set."] },
      { id: "override", title: "Preview or override motion", paragraphs: ["motion=system is the normal setting. Use motion=reduced in a preview or expose a user-facing control when the application has its own motion setting. Do not use motion=full to override a user's preference without an explicit application reason."], code: { label: "Reduced preview", code: '<Zeenat preset="winter" motion="reduced" />' } },
    ],
  },
  {
    slug: "performance",
    title: "Performance",
    description: "Zeenat.js performance architecture: bounded DOM and SVG, shared scheduling, visibility pausing and bundle-size budgets.",
    eyebrow: "Engineering",
    sections: [
      { id: "runtime", title: "Bounded resources", paragraphs: ["Effects use bounded DOM or SVG geometry and Web Animations. The library's representative browser budget is at most 180 DOM nodes, 100 animations, 10 timers and two RAF loops, with a conservative 50 ms average frame ceiling used as a regression tripwire rather than a benchmark claim."] },
      { id: "scheduler", title: "One scheduler, isolated scopes", paragraphs: ["One scene scheduler multiplexes RAF work and pause-aware timers. Every effect has a scoped scheduler, animation registry, abort signal and cleanup ownership, so a failing effect rolls back without stopping healthy siblings."] },
      { id: "visibility", title: "Responsive density and visibility pausing", paragraphs: ["Counts scale by intensity, small-screen status and motion preference. Visibility changes pause scheduler work, and crossing the small-screen breakpoint rebuilds with the same deterministic seed."] },
      { id: "bundles", title: "Tree shaking and package budgets", paragraphs: ["The package has zero runtime dependencies, marks sideEffects false, keeps React as a peer and ships aggregate plus individual effect and preset subpaths. Automated gzip ceilings cover the React, vanilla, core, catalog and individual effect entries."] },
      { id: "flag-chunks", title: "Load only selected flag artwork", paragraphs: ["The 249-entry country catalog is packaged locally. Its optional artwork index and selected SVG geometry load on demand in both ESM and CJS builds. Server-rendered, disabled and future-scheduled scenes request no flag geometry. Preserve the entire generated dist directory so dynamic imports remain available.", "Late flag loads cannot repopulate destroyed or replaced scenes. Rejected renders are handled by the effect. Bunting recomputes cord positions, tangents and flag proportions in viewport pixels on resize; aircraft flight endpoints also update within the same breakpoint."] },
    ],
  },
  {
    slug: "csp",
    title: "Content Security Policy",
    description: "Use Zeenat.js under a strict CSP without unsafe-eval, injected style sheets, remote assets or data URLs.",
    eyebrow: "Security",
    sections: [
      { id: "runtime", title: "CSP-friendly runtime", paragraphs: ["Zeenat.js uses no eval, generated style elements, inline script, remote assets or data URLs. Effects create DOM and SVG nodes, set element style properties and use the Web Animations API. Optional flag chunks are served with your application, so allow their origin in your script policy. A nonce prop is unnecessary because the library injects no style or script element."], code: { label: "Representative policy", language: "bash", code: "default-src 'self';\nscript-src 'self';\nstyle-src 'self';\nimg-src 'self';\nconnect-src 'self' ws:;\nfont-src 'self';\nobject-src 'none';\nbase-uri 'none'" } },
      { id: "custom", title: "Custom effect responsibility", paragraphs: ["Custom effects preserve this behavior only when they avoid injected stylesheets, inline scripts, eval, data URLs and remote assets. Prefer element style properties, SVG attributes and registered Web Animations."] },
    ],
  },
  {
    slug: "browser-support",
    title: "Browser support",
    description: "Modern browser requirements and progressive fallback behavior for Zeenat.js.",
    eyebrow: "Compatibility",
    sections: [
      { id: "targets", title: "Modern evergreen browsers", paragraphs: ["Zeenat targets ES2020, SVG, CSS transforms, requestAnimationFrame, AbortController and Web Animations. Functional browser coverage runs in Chromium, Firefox and WebKit. Internet Explorer is not supported."] },
      { id: "fallback", title: "Static fallback without Element.animate", paragraphs: ["If Element.animate is unavailable, effects keep their mounted static DOM or SVG state. Core module imports remain SSR safe because browser globals are not accessed during module evaluation."] },
    ],
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    description: "Inspect Zeenat.js scene state, resource counts, effective motion and isolated effect failures.",
    eyebrow: "Engineering",
    sections: [
      { id: "snapshot", title: "Read a scene snapshot", paragraphs: ["Diagnostics include the preset, engine state, intensity, effective motion, viewport, seed, DOM nodes, animations, timers, RAF loops, mounted effects, semantic layers and isolated errors."], code: { label: "React diagnostics", filename: "DebugScene.tsx", code: 'const ref = useRef<ZeenatHandle>(null);\n\n<Zeenat ref={ref} preset="spring" debug />;\n\nconst snapshot = ref.current?.getDiagnostics();\nconst unsubscribe = ref.current?.subscribeDiagnostics(console.log);' } },
      { id: "debug", title: "Debug mode", paragraphs: ["debug enables diagnostic DOM state but does not render a production panel. A development tool or playground can subscribe to snapshots and display them separately."] },
      { id: "failures", title: "Effect isolation", paragraphs: ["A mount failure aborts the failing effect's scope, cancels its scheduler work and animations, removes its layer, records diagnostics and reports a prefixed console error. Healthy sibling effects continue."] },
    ],
  },
  {
    slug: "api",
    title: "API reference",
    description: "Reference for the Zeenat React component, ZeenatScene, vanilla controller, core definitions, effects and presets.",
    eyebrow: "Reference",
    sections: [
      { id: "react", title: "React exports", paragraphs: ["The zeenat entry exports Zeenat, ZeenatScene, ZeenatHandle, ZeenatProps and ZeenatSceneProps. It also re-exports core definition, validation and public engine types."], links: [{ label: "React usage", href: "/docs/react" }, { label: "Configuration reference", href: "/docs/configuration" }] },
      { id: "controller", title: "Controller", paragraphs: ["ZeenatController exposes state plus pause(), resume(), restart(), destroy(), setIntensity(), getDiagnostics() and subscribeDiagnostics(). destroy() is idempotent."] },
      { id: "core", title: "Core authoring exports", paragraphs: ["zeenat/core exports defineEffect, definePreset, preset validation functions and framework-neutral authoring types including EffectContext, ZeenatEffect, ZeenatPreset, ZeenatScheduler and ZeenatLayer."] },
      { id: "catalogs", title: "Effects and presets", paragraphs: ["zeenat/effects exports all nine neutral effect factories and their option types. zeenat/presets exports seven ready-to-use preset objects, the registry, resolver and eight typed factories. The configurable bunting ID requires flag and is resolved separately from builtInPresets through createBuntingPreset."], links: [{ label: "Effect API pages", href: "/docs/effects" }, { label: "Preset API pages", href: "/docs/presets" }] },
      { id: "flags", title: "Country catalog and artwork contracts", paragraphs: ["zeenat/flags exports flagCatalog, resolveFlag, countryFlag, CountryFlag, CountryFlagCode and CountryFlagName. zeenat/effects/bunting exports pakistanFlag, unitedStatesFlag, BuntingFlagDesign, BuntingFlagRenderContext, FlagOrientation, FlagBuntingOptions and PennantBuntingOptions."], links: [{ label: "Country flags and custom artwork", href: "/docs/flags" }] },
    ],
  },
];

export type GuideDoc = ArticleDoc & { path: string };

export const guides: readonly GuideDoc[] = [
  {
    path: "/guides/decorate-react-website", slug: "decorate-react-website", title: "How to decorate a React website", eyebrow: "Guide",
    description: "Add seasonal or occasion-aware website decorations to an existing React application with Zeenat.js.",
    sections: [
      { id: "answer", title: "Add a decoration overlay, not a new layout", paragraphs: ["To decorate a React website for a holiday, event or campaign, mount Zeenat once near the application root and choose a preset. The fixed overlay sits above the existing application without taking layout space or intercepting pointer events."] },
      { id: "install", title: "Install and render", paragraphs: ["Install the package, then render the component alongside existing application content."], code: { label: "React", filename: "App.tsx", code: 'import { Zeenat } from "zeenat";\n\nexport function App() {\n  return (\n    <>\n      <Zeenat preset="spring" intensity="low" />\n      <main>{/* Existing application */}</main>\n    </>\n  );\n}' } },
      { id: "accessibility", title: "Keep motion optional", paragraphs: ["Zeenat honors reduced motion by default and keeps decoration outside the accessibility tree. Put event names, dates and calls to action in the React application, not in the effect layer."], links: [{ label: "React API", href: "/docs/react" }, { label: "Accessibility behavior", href: "/docs/accessibility" }] },
    ],
  },
  {
    path: "/guides/decorate-nextjs-website", slug: "decorate-nextjs-website", title: "How to decorate a Next.js website", eyebrow: "Guide",
    description: "Add seasonal website effects to a Next.js App Router project without turning the root layout into a Client Component.",
    sections: [
      { id: "answer", title: "Import the client boundary into a Server Component", paragraphs: ["Zeenat contains its own client boundary. A Next.js App Router layout can remain a Server Component while it renders a seasonal decoration across every route."] },
      { id: "layout", title: "Add the component to a layout", paragraphs: ["Use the root layout for a site-wide scene or a nested layout for one route group."], code: { label: "Next.js", filename: "app/layout.tsx", code: 'import { Zeenat } from "zeenat";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html lang="en"><body><Zeenat preset="festive-lights" />{children}</body></html>;\n}' } },
      { id: "production", title: "Ship indexable content beneath the overlay", paragraphs: ["Zeenat's decorative client work does not replace server-rendered page content. Keep headings, descriptions and links in Server Components, and let the overlay remain non-semantic."], links: [{ label: "Next.js integration", href: "/docs/nextjs" }, { label: "Performance", href: "/docs/performance" }] },
    ],
  },
  {
    path: "/guides/add-snow-to-website", slug: "add-snow-to-website", title: "How to add snow to a website", eyebrow: "Guide",
    description: "Add a reduced-motion-aware snowfall effect to React, Next.js or vanilla JavaScript with Zeenat.js.",
    sections: [
      { id: "answer", title: "Use the Snow effect or Winter preset", paragraphs: ["For a complete winter decoration, use preset=winter. For snowfall alone, import snow from zeenat/effects/snow and render it with ZeenatScene. Both options use bounded, seeded geometry and responsive density."] },
      { id: "snow-only", title: "Render snowfall only", paragraphs: ["The individual subpath is the smallest explicit import for the effect."], code: { label: "Snow effect", filename: "Snowfall.tsx", code: 'import { ZeenatScene } from "zeenat";\nimport { snow } from "zeenat/effects/snow";\n\nconst effects = [snow({ count: 24, speed: "slow", drift: 26 })];\nexport function Snowfall() { return <ZeenatScene effects={effects} />; }' } },
      { id: "motion", title: "Respect reduced motion", paragraphs: ["With reduced motion active, Snow becomes a sparse static distribution instead of falling continuously. The scene remains aria-hidden and pointer-inert."], links: [{ label: "Snow effect documentation", href: "/docs/effects/snow" }, { label: "Winter preset documentation", href: "/docs/presets/winter" }] },
    ],
  },
  {
    path: "/guides/seasonal-website-effects", slug: "seasonal-website-effects", title: "Seasonal website effects", eyebrow: "Guide",
    description: "Choose and schedule winter snow, autumn leaves, spring petals and other seasonal website effects with Zeenat.js.",
    sections: [
      { id: "choose", title: "Choose a composition that supports the page", paragraphs: ["Seasonal website effects should remain secondary to content. Zeenat's Winter, Autumn and Spring presets use two or three complementary effects at bounded density, so they can decorate an existing page without forcing a redesign."] },
      { id: "seasonal", title: "Available seasonal presets", paragraphs: ["Winter combines Snow, Sparkles and String Lights. Autumn combines Falling Leaves and amber Sparkles. Spring combines Petals and fresh Sparkles."], links: [{ label: "Winter preset", href: "/docs/presets/winter" }, { label: "Autumn preset", href: "/docs/presets/autumn" }, { label: "Spring preset", href: "/docs/presets/spring" }] },
      { id: "schedule", title: "Schedule the season", paragraphs: ["Use activeFrom and activeUntil strings with explicit time-zone offsets so server and browser activation agree."], code: { label: "Seasonal schedule", code: '<Zeenat preset="winter" activeFrom="2026-12-01T00:00:00Z" activeUntil="2027-02-28T23:59:59Z" />' } },
    ],
  },
  {
    path: "/guides/holiday-website-decorations", slug: "holiday-website-decorations", title: "Holiday website decorations", eyebrow: "Guide",
    description: "Add tasteful festive lights, bunting, fireworks and other holiday website decorations without rebuilding a site.",
    sections: [
      { id: "answer", title: "Decorate the existing application", paragraphs: ["Zeenat.js adds festive website decorations as an inert overlay. Choose a built-in preset when its meaning fits the occasion, or compose culturally neutral effects such as lights, lanterns, bunting and sparkles into a custom preset."] },
      { id: "generic", title: "Use neutral effects for general celebrations", paragraphs: ["Festive Lights is a general composition of String Lights, Lanterns and Sparkles. For company anniversaries, product launches and campaigns, create a branded preset instead of repurposing a national-day preset."] },
      { id: "care", title: "Keep cultural meaning deliberate", paragraphs: ["Effects are neutral visual primitives; presets add occasion meaning. Avoid stereotypes, contested symbols and assumptions about a visitor's identity. Keep meaningful holiday copy in the page itself."], links: [{ label: "Festive Lights preset", href: "/docs/presets/festive-lights" }, { label: "Create a custom preset", href: "/docs/custom-presets" }] },
    ],
  },
  {
    path: "/guides/build-custom-zeenat-preset", slug: "build-custom-zeenat-preset", title: "Build a custom Zeenat preset", eyebrow: "Guide",
    description: "Compose Zeenat.js effects into a reusable, typed decoration for a campaign, launch or company event.",
    sections: [
      { id: "purpose", title: "Give neutral effects one clear purpose", paragraphs: ["A custom preset is the right place to connect reusable effect geometry to a company anniversary, product launch, event or campaign. Keep the composition restrained and use two or three complementary effects where possible."] },
      { id: "code", title: "Define and render the preset", paragraphs: ["Use individual effect imports for a small, explicit bundle and pass the frozen preset object to Zeenat."], code: { label: "Custom preset", filename: "launch-preset.tsx", code: 'import { definePreset, Zeenat } from "zeenat";\nimport { bunting } from "zeenat/effects/bunting";\nimport { sparkles } from "zeenat/effects/sparkles";\n\nconst launch = definePreset({\n  id: "product-launch",\n  name: "Product launch",\n  tags: ["product", "launch"],\n  effects: [\n    sparkles({ colors: ["#d9aa55", "#ffffff"], count: 10 }),\n    bunting({ colors: ["#0d3b35", "#f7f3e8"] }),\n  ],\n});\n\nexport function LaunchDecoration() {\n  return <Zeenat preset={launch} intensity="low" />;\n}' } },
      { id: "verify", title: "Verify accessibility and cleanup", paragraphs: ["Test full and reduced motion, small viewports, light and dark hosts, deterministic seeds and repeated mount/unmount. Custom effects should use engine-owned animation and scheduler APIs."], links: [{ label: "Custom presets", href: "/docs/custom-presets" }, { label: "Custom effects", href: "/docs/custom-effects" }] },
    ],
  },
];

export const docsNav = [
  { title: "Overview", items: [["What is Zeenat?", "/docs/what-is-zeenat"], ["Getting started", "/docs/getting-started"], ["Installation", "/docs/installation"]] },
  { title: "Integrations", items: [["React", "/docs/react"], ["Next.js", "/docs/nextjs"], ["Vanilla JavaScript", "/docs/vanilla"]] },
  { title: "Reference", items: [["Configuration", "/docs/configuration"], ["Scheduling", "/docs/scheduling"], ["Effects", "/docs/effects"], ["Presets", "/docs/presets"], ["Country flags", "/docs/flags"], ["API", "/docs/api"]] },
  { title: "Authoring", items: [["Customization", "/docs/customization"], ["Custom effects", "/docs/custom-effects"], ["Custom presets", "/docs/custom-presets"]] },
  { title: "Engineering", items: [["Accessibility", "/docs/accessibility"], ["Performance", "/docs/performance"], ["CSP", "/docs/csp"], ["Browser support", "/docs/browser-support"], ["Diagnostics", "/docs/diagnostics"]] },
] as const;

export const allIndexablePaths = [
  "/",
  "/docs",
  ...docArticles.map((doc) => `/docs/${doc.slug}`),
  "/docs/effects",
  ...effects.map((effect) => `/docs/effects/${effect.slug}`),
  "/docs/presets",
  ...presets.map((preset) => `/docs/presets/${preset.slug}`),
  ...guides.map((guide) => guide.path),
  "/playground",
  "/changelog",
] as const;

export const searchIndex = [
  ...docArticles.map((doc) => ({ title: doc.title, description: doc.description, href: `/docs/${doc.slug}`, section: "Documentation", keywords: doc.sections.flatMap((section) => [section.title, ...section.paragraphs]).join(" ") })),
  ...effects.map((effect) => ({ title: `${effect.title} effect`, description: effect.summary, href: `/docs/effects/${effect.slug}`, section: "Effects", keywords: `${effect.exportName} ${effect.options.map((option) => option.name).join(" ")}` })),
  ...presets.map((preset) => ({ title: `${preset.title} preset`, description: preset.summary, href: `/docs/presets/${preset.slug}`, section: "Presets", keywords: `${preset.effects.join(" ")} ${preset.factory ?? ""}` })),
  ...guides.map((guide) => ({ title: guide.title, description: guide.description, href: guide.path, section: "Guides", keywords: guide.sections.map((section) => section.title).join(" ") })),
  { title: "Interactive playground", description: "Preview presets and effects, adjust motion and intensity, and copy React or vanilla code.", href: "/playground", section: "Tool", keywords: "preview seed pause resume restart reduced motion code" },
  { title: "Changelog", description: "All notable Zeenat.js releases from the package changelog.", href: "/changelog", section: "Project", keywords: "versions releases added changed fixed" },
];

export const docsSequence = [
  ...docArticles.map((doc) => ({ title: doc.title, href: `/docs/${doc.slug}` })),
  { title: "Effects", href: "/docs/effects" },
  ...effects.map((effect) => ({ title: `${effect.title} effect`, href: `/docs/effects/${effect.slug}` })),
  { title: "Presets", href: "/docs/presets" },
  ...presets.map((preset) => ({ title: `${preset.title} preset`, href: `/docs/presets/${preset.slug}` })),
] as const;

export function getEffect(slug: string) { return effects.find((effect) => effect.slug === slug); }
export function getPreset(slug: string) { return presets.find((preset) => preset.slug === slug); }
export function getDocArticle(slug: string) { return docArticles.find((doc) => doc.slug === slug); }
export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
