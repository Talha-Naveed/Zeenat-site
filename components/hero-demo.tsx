"use client";

import { useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Zeenat, type ZeenatHandle, type ZeenatIntensity, type ZeenatMotionMode } from "zeenat";

const presets = [
  ["bunting", "Country flag bunting"],
  ["pakistan-independence-day", "Pakistan Independence Day"],
  ["winter", "Winter"],
  ["spring", "Spring"],
  ["autumn", "Autumn"],
  ["festive-lights", "Festive lights"],
  ["pakistan-defence-day", "Pakistan Defence Day"],
  ["us-independence-day", "US Independence Day"],
] as const;

export function HeroDemo() {
  const [preset, setPreset] = useState<(typeof presets)[number][0]>("bunting");
  const [intensity, setIntensity] = useState<ZeenatIntensity>("medium");
  const [motion, setMotion] = useState<ZeenatMotionMode>("system");
  const [paused, setPaused] = useState(false);
  const [instance, setInstance] = useState(0);
  const ref = useRef<ZeenatHandle>(null);

  const togglePause = () => {
    if (paused) ref.current?.resume();
    else ref.current?.pause();
    setPaused((value) => !value);
  };

  return (
    <div className="hero-stage">
      <Zeenat
        key={`${preset}-${instance}`}
        ref={ref}
        preset={preset}
        {...(preset === "bunting" ? { flag: "pakistan" as const } : {})}
        intensity={intensity}
        motion={motion}
        seed={271828}
        zIndex={1}
        className="hero-zeenat"
      />
      <div className="hero-stage-note">
        <span className="live-dot" aria-hidden="true" /> Live Zeenat scene
      </div>
      <div className="hero-controls" aria-label="Hero decoration controls">
        <label>
          <span>Preset</span>
          <select value={preset} onChange={(event) => setPreset(event.target.value as typeof preset)}>
            {presets.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>
          <span>Intensity</span>
          <select value={intensity} onChange={(event) => setIntensity(event.target.value as ZeenatIntensity)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          <span>Motion</span>
          <select value={motion} onChange={(event) => setMotion(event.target.value as ZeenatMotionMode)}>
            <option value="system">System</option>
            <option value="full">Full</option>
            <option value="reduced">Reduced</option>
          </select>
        </label>
        <button type="button" className="icon-button" onClick={togglePause} aria-label={paused ? "Resume decoration" : "Pause decoration"}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button type="button" className="icon-button" onClick={() => { setPaused(false); setInstance((value) => value + 1); }} aria-label="Restart decoration">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
