"use client";

import { useMemo, useState } from "react";
import { Zeenat } from "zeenat";
import { createWinterPreset } from "zeenat/presets/winter";

export function CustomizeDemo() {
  const [snowCount, setSnowCount] = useState(14);
  const [lights, setLights] = useState(true);
  const [sparkles, setSparkles] = useState(false);
  const preset = useMemo(() => createWinterPreset({ snow: { count: snowCount, speed: "slow", drift: 20 }, lights: lights ? { count: 12 } : false, sparkles: sparkles ? { count: 9, colors: ["#bfdbfe", "#ffffff"] } : false }), [snowCount, lights, sparkles]);
  return (
    <div className="customize-demo">
      <Zeenat preset={preset} intensity="medium" seed={114} zIndex={1} />
      <div className="customize-demo-copy" aria-hidden="true"><span>Quiet winter</span><strong>Your interface stays the focus.</strong></div>
      <div className="customize-controls">
        <label><span>Snow · {snowCount}</span><input type="range" min="6" max="42" value={snowCount} onChange={(event) => setSnowCount(Number(event.target.value))} /></label>
        <label className="switch"><input type="checkbox" checked={lights} onChange={(event) => setLights(event.target.checked)} /><span>Lights</span></label>
        <label className="switch"><input type="checkbox" checked={sparkles} onChange={(event) => setSparkles(event.target.checked)} /><span>Sparkles</span></label>
      </div>
    </div>
  );
}
