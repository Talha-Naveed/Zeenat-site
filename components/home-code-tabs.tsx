"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const examples = {
  React: 'import { Zeenat } from "zeenat";\n\nexport function App() {\n  return <Zeenat preset="winter" />;\n}',
  "Next.js": 'import { Zeenat } from "zeenat";\n\nexport default function RootLayout({ children }) {\n  return <body><Zeenat preset="winter" />{children}</body>;\n}',
  Vanilla: 'import { zeenat } from "zeenat/vanilla";\n\nconst decoration = zeenat({ preset: "winter" });\n// decoration.destroy();',
} as const;

export function HomeCodeTabs() {
  const [tab, setTab] = useState<keyof typeof examples>("React");
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(examples[tab]); setCopied(true); window.setTimeout(() => setCopied(false), 1400); }
  return (
    <div className="home-code-tabs">
      <div className="home-code-tablist" role="tablist" aria-label="Integration example">
        {(Object.keys(examples) as (keyof typeof examples)[]).map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)}>{name}</button>)}
        <button type="button" className="code-tab-copy" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre><code>{examples[tab]}</code></pre>
    </div>
  );
}
