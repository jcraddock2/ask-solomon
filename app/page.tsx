"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "encouragement" | "wisdom" | "prayer";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

type Item = {
  id: string;
  mode: Mode;
  sub?: Sub; // only used for encouragement items
  title: string;
  body: string;
  ref?: string;
};

// ✅ Replace/expand this list with your real Solomon content.
// The filtering + URL wiring will work regardless.
const ITEMS: Item[] = [
  {
    id: "e1",
    mode: "encouragement",
    sub: "peace",
    title: "Peace in the storm",
    body: "You don’t need to carry tomorrow’s weight today. Breathe. Be still. Trust the next step will be shown.",
    ref: "Proverbs 3:5–6",
  },
  {
    id: "e2",
    mode: "encouragement",
    sub: "strength",
    title: "Strength for the grind",
    body: "You’re not weak because you feel pressure—you’re being trained. Keep showing up.",
    ref: "Proverbs 24:10",
  },
  {
    id: "e3",
    mode: "encouragement",
    sub: "direction",
    title: "Direction when you feel stuck",
    body: "Clarity often comes after movement. Do the next right thing, and your path will widen.",
    ref: "Proverbs 16:9",
  },
  {
    id: "e4",
    mode: "encouragement",
    sub: "confidence",
    title: "Confidence without arrogance",
    body: "You can be humble and certain. Your identity is stable even when circumstances aren’t.",
    ref: "Proverbs 28:1",
  },
  {
    id: "e5",
    mode: "encouragement",
    sub: "hope",
    title: "Hope that holds",
    body: "Even delay is not denial. Keep building. Keep believing. Keep moving forward.",
    ref: "Proverbs 23:18",
  },
  {
    id: "w1",
    mode: "wisdom",
    title: "A gentle answer",
    body: "Strength isn’t volume. It’s control. A calm response can disarm conflict faster than force.",
    ref: "Proverbs 15:1",
  },
  {
    id: "p1",
    mode: "prayer",
    title: "Prayer for today",
    body: "Lord, give me clarity, courage, and peace. Help me do the next right thing with a clean heart.",
  },
];

const SUBS: { key: Sub; label: string }[] = [
  { key: "peace", label: "Peace" },
  { key: "strength", label: "Strength" },
  { key: "direction", label: "Direction" },
  { key: "confidence", label: "Confidence" },
  { key: "hope", label: "Hope" },
];

function safeMode(v: string | null): Mode {
  if (v === "wisdom" || v === "prayer" || v === "encouragement") return v;
  return "encouragement";
}

function safeSub(v: string | null): Sub | "all" {
  if (v === "all") return "all";
  if (v === "peace" || v === "strength" || v === "direction" || v === "confidence" || v === "hope") return v;
  return "all";
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <PageInner />
    </Suspense>
  );
}

function PageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  // ---- Read current URL state (source of truth) ----
  const urlMode = safeMode(params.get("mode"));
  const urlSub = safeSub(params.get("sub"));
  const urlQ = (params.get("q") ?? "").toString();

  // ---- Local UI state (prevents laggy typing & avoids jitter) ----
  const [mode, setMode] = useState<Mode>(urlMode);
  const [sub, setSub] = useState<Sub | "all">(urlSub);
  const [q, setQ] = useState<string>(urlQ);

  // Keep local state synced when user navigates back/forward or URL changes externally.
  useEffect(() => {
    setMode(urlMode);
    setSub(urlSub);
    setQ(urlQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlMode, urlSub, urlQ]);

  // ✅ Critical: URL setter that does NOT cause loops/freezing.
  // - builds query string
  // - only calls router.replace if the URL would actually change
  const setUrl = useCallback(
    (next: { mode?: Mode; sub?: Sub | "all"; q?: string }) => {
      const nextMode = next.mode ?? mode;
      const nextSub = next.sub ?? sub;
      const nextQ = (next.q ?? q) ?? "";

      const sp = new URLSearchParams();

      // keep URL short: only write non-defaults
      if (nextMode !== "encouragement") sp.set("mode", nextMode);
      if (nextMode === "encouragement" && nextSub !== "all") sp.set("sub", nextSub);
      if (nextQ.trim().length > 0) sp.set("q", nextQ.trim());

      const nextQuery = sp.toString();
      const currentQuery = params.toString();

      if (nextQuery === currentQuery) return; // ✅ prevents unnecessary replaces (common freeze cause)

      startTransition(() => {
        router.replace(nextQuery ? `?${nextQuery}` : "?", { scroll: false });
      });
    },
    [mode, sub, q, params, router, startTransition]
  );

  // ---- UI handlers ----
  const onSetMode = (m: Mode) => {
    // Update UI immediately
    setMode(m);

    // If leaving encouragement, sub becomes irrelevant (reset to all)
    if (m !== "encouragement") {
      setSub("all");
      setUrl({ mode: m, sub: "all" });
      return;
    }

    // Going to encouragement: keep existing sub (or default)
    setUrl({ mode: m });
  };

  const onSetSub = (s: Sub | "all") => {
    setSub(s);
    setUrl({ sub: s, mode: "encouragement" });
  };

  const onChangeQ = (value: string) => {
    setQ(value);
    // (Optional) you can debounce this later; this immediate version is still safe
    setUrl({ q: value });
  };

  // ---- Filtering (fast + stable) ----
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return ITEMS.filter((item) => {
      if (item.mode !== mode) return false;

      if (mode === "encouragement") {
        if (sub !== "all" && item.sub !== sub) return false;
      }

      if (!query) return true;

      const hay = `${item.title} ${item.body} ${item.ref ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [mode, sub, q]);

  // ---- Styles ----
  const container: React.CSSProperties = {
    maxWidth: 820,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const pill: React.CSSProperties = {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  };

  const pillOn: React.CSSProperties = {
    ...pill,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
  };

  const subPill: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  };

  const subPillOn: React.CSSProperties = {
    ...subPill,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
  };

  const card: React.CSSProperties = {
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 14,
    background: "#fff",
    boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
  };

  return (
    <main style={container}>
      <header style={{ marginBottom: 16 }}>
  <h1 style={{ margin: 0, fontSize: 34 }}>Ask Solomon</h1>
  <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
    Encouragement first—wisdom from Proverbs for what you’re facing right now.
  </p>

  <a
    href="/book"
    style={{
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid #ddd",
      textDecoration: "none",
      color: "#111",
      fontWeight: 700,
      display: "inline-block",
      marginTop: 12,
    }}
  >
    Read the Book →
  </a>
</header>

      {/* Top mode buttons */}
      <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => onSetMode("encouragement")}
          style={mode === "encouragement" ? pillOn : pill}
        >
          Encourage Me
        </button>
        <button type="button" onClick={() => onSetMode("wisdom")} style={mode === "wisdom" ? pillOn : pill}>
          Wisdom
        </button>
        <button type="button" onClick={() => onSetMode("prayer")} style={mode === "prayer" ? pillOn : pill}>
          Prayer
        </button>
      </section>

      {/* Encouragement sub-buttons */}
      {mode === "encouragement" && (
        <section style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <button type="button" onClick={() => onSetSub("all")} style={sub === "all" ? subPillOn : subPill}>
            All
          </button>
          {SUBS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => onSetSub(s.key)}
              style={sub === s.key ? subPillOn : subPill}
            >
              {s.label}
            </button>
          ))}
        </section>
      )}

      {/* Search */}
      <section style={{ marginBottom: 14 }}>
        <input
          value={q}
          onChange={(e) => onChangeQ(e.target.value)}
          placeholder="Search…"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 12,
            border: "1px solid #ddd",
            outline: "none",
            fontSize: 14,
          }}
        />
        <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
          Tip: Use the buttons to narrow first, then search.
        </div>
      </section>

      {/* Results */}
      <section style={{ display: "grid", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 14, border: "1px dashed #ddd", borderRadius: 16, color: "#555" }}>
            No matches. Try a different filter or search.
          </div>
        ) : (
          filtered.map((item) => (
            <article key={item.id} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{item.title}</h3>
                <span style={{ color: "#666", fontSize: 12 }}>
                  {item.mode === "encouragement" ? (item.sub ? item.sub.toUpperCase() : "ENCOURAGEMENT") : item.mode.toUpperCase()}
                </span>
              </div>
              <p style={{ marginTop: 10, marginBottom: 10, lineHeight: 1.45, color: "#222" }}>{item.body}</p>
              {item.ref ? <div style={{ color: "#555", fontSize: 12 }}>{item.ref}</div> : null}
            </article>
          ))
        )}
      </section>

      <footer style={{ marginTop: 18, color: "#777", fontSize: 12 }}>
        URL state is enabled (mode/sub/q). Use back/forward safely—no freezing loops.
      </footer>
    </main>
  );
}
