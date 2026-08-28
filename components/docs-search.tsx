"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

type SearchItem = { title: string; description: string; href: string; section: string; keywords: string };

export function DocsSearch({ items, compact = false }: { items: readonly SearchItem[]; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.slice(0, 8);
    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    }).slice(0, 12);
  }, [items, query]);

  return (
    <>
      <button type="button" className={compact ? "search-trigger compact" : "search-trigger"} onClick={() => setOpen(true)}>
        <Search size={15} aria-hidden="true" /><span>Search docs</span><kbd>⌘ K</kbd>
      </button>
      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search Zeenat documentation">
            <div className="search-field">
              <Search size={18} aria-hidden="true" />
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search effects, presets, guides and API…" aria-label="Search documentation" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search"><X size={18} /></button>
            </div>
            <div className="search-results" aria-live="polite">
              {results.length ? results.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span className="search-result-section">{item.section}</span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </Link>
              )) : <p>No documentation matched “{query}”.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
