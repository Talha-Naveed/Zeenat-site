"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import {
  Zeenat,
  ZeenatScene,
  type BuiltInPresetName,
  type ZeenatEffect,
  type ZeenatHandle,
  type ZeenatIntensity,
  type ZeenatMotionMode,
} from "zeenat";
import {
  aircraft,
  bunting,
  fallingLeaves,
  fireworks,
  lanterns,
  petals,
  snow,
  sparkles,
  stringLights,
} from "zeenat/effects";

const effectScenes: Record<string, readonly ZeenatEffect[]> = {
  aircraft: [aircraft({ colors: ["#dbe8e2", "#789f95"], count: 2 })],
  bunting: [bunting({ colors: ["#df745d", "#f7f3e8", "#d9aa55"], count: 12 })],
  "falling-leaves": [fallingLeaves({ count: 16 })],
  fireworks: [fireworks({ colors: ["#df745d", "#f5d08a", "#79a9be"], count: 2 })],
  lanterns: [lanterns({ count: 5, colors: ["#d97706", "#df745d", "#f5d08a"] })],
  petals: [petals({ count: 16 })],
  snow: [snow({ count: 22 })],
  sparkles: [sparkles({ colors: ["#d9aa55", "#f8efd5", "#79a99e"], count: 18, shape: "star" })],
  "string-lights": [stringLights({ count: 14 })],
};

export function LiveDemo({
  effect,
  preset,
  compact = false,
  label,
  intensity = "medium",
}: {
  effect?: string;
  preset?: BuiltInPresetName;
  compact?: boolean;
  label: string;
  intensity?: ZeenatIntensity;
}) {
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [instance, setInstance] = useState(0);
  const [motion, setMotion] = useState<ZeenatMotionMode>("system");
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ZeenatHandle>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin: "180px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const effects = useMemo(() => effect ? effectScenes[effect] : undefined, [effect]);

  function toggle() {
    if (paused) sceneRef.current?.resume(); else sceneRef.current?.pause();
    setPaused((value) => !value);
  }

  return (
    <div ref={containerRef} className={compact ? "embedded-demo compact" : "embedded-demo"} aria-label={`${label} live preview`}>
      {visible && (preset ? (
        <Zeenat key={instance} ref={sceneRef} preset={preset} intensity={intensity} motion={motion} seed={2468} zIndex={1} />
      ) : effects ? (
        <ZeenatScene key={instance} ref={sceneRef} effects={effects} id={`demo-${effect}`} name={`${label} demo`} intensity={intensity} motion={motion} seed={2468} zIndex={1} />
      ) : null)}
      <div className="demo-backdrop" aria-hidden="true"><span>Adorn</span><small>the web.</small></div>
      {!compact && (
        <div className="demo-controls">
          <label>Motion
            <select value={motion} onChange={(event) => setMotion(event.target.value as ZeenatMotionMode)}>
              <option value="system">System</option><option value="full">Full</option><option value="reduced">Reduced</option>
            </select>
          </label>
          <button type="button" onClick={toggle} aria-label={paused ? "Resume preview" : "Pause preview"}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
          <button type="button" onClick={() => { setPaused(false); setInstance((value) => value + 1); }} aria-label="Restart preview"><RotateCcw size={15} /></button>
        </div>
      )}
    </div>
  );
}
