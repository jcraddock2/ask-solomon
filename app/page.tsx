"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "encouragement" | "wisdom" | "success";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";
type SubOrAll = Sub | "all";

type Item = {
  title: string;
  body: string;
  ref: string;
  mode: Mode;
  sub?: Sub;
};

const DATA: Item[] = [
  // Encouragement (with subs)
  {
    title: "Peace in anxious moments",
    body: "When your mind is racing, choose the calm path—wisdom steadies the heart.",
    ref: "Proverbs 12:25",
    mode: "encouragement",
    sub: "peace",
  },
  {
    title: "Strength for the day",
    body: "Don’t quit in the pressure—steady courage grows quietly and wins later.",
    ref: "Proverbs 24:10",
    mode: "encouragement",
    sub: "strength",
  },
  {
    title: "Direction when unsure",
    body: "Seek counsel and walk the next right step—clarity comes with motion.",
    ref: "Proverbs 11:14",
    mode: "encouragement",
    sub: "direction",
  },
  {
    title: "Confidence without arrogance",
    body: "Confidence is built on truth and discipline, not applause.",
    ref: "Proverbs 3:5–6",
    mode: "encouragement",
    sub: "confidence",
  },
  {
    title: "Hope for the long road",
    body: "Delay doesn’t mean denial—keep sowing and stay faithful in small steps.",
    ref: "Proverbs 13:12",
    mode: "encouragement",
    sub: "hope",
  },

  // Wisdom
  {
    title: "Wisdom is the main thing",
    body: "If you’re unsure what to do next—choose wisdom first. It will shape every other decision.",
    ref: "Proverbs 4:7",
    mode: "wisdom",
  },
  {
    title: "Guard your heart",
    body: "Your inner life drives your outer life—protect what influences you most.",
    ref: "Proverbs 4:23",
    mode: "wisdom",
  },

  // Success
  {
    title: "Diligence wins",
    body: "Consistency beats intensity. Small disciplined actions create real outcomes.",
    ref: "Proverbs 10:4",
    mode: "success",
  },
  {
    title: "Plans + counsel",
    body: "Strong results come from strong planning—wisdom multiplies when tested by counsel.",
    ref: "Proverbs 15:22",
    mode: "success",
  },
];

const subCommentary: Record<Sub, string> = {
  peace: "When your mind is loud and the pressure is real, peace begins with trust—not control.",
  strength: "Real strength isn’t noise or force—it’s steadiness under pressure.",
  direction: "Clarity comes when you stop chasing options and start seeking wisdom.",
  confidence: "Confidence grows when identity is anchored deeper than circumstances.",
  hope: "Hope is not denial—it’s the decision to believe tomorrow can still improve.",
};

function clampMode(v: string | null): Mode {
  if (v === "wisdom" || v === "success" || v === "encouragement") return v;
  return "encouragement";
}

function clampSub(v: string | null): SubOrAll {
  if (v === "peace" || v === "strength" || v === "direction" || v === "confidence" || v === "hope") return v;
  return "all";
}

function PageInner() {
  const router = useRouter();
  const params = useSearchParams();

  // Read URL params
  const initialMode = clampMode(params.get("mode"));
  const initialSub = clampSub(params.get("sub"));
  const initialQ = params.get("q") ?? "";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [sub, setSub] = useState<SubOrAll>(initialSub);
  const [q, setQ] = useState<string>(initialQ);

  // Keep state in sync if user uses back/forward buttons
  useEffect(() => {
    const nextMode = clampMode(params.get("mode"));
    const nextSub = clampSub(params.get("sub"));
    const nextQ = params.get("q") ?? "";

    setMode(nextMode);
    setSub(nextSub);
    setQ(nextQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setUrl = (next: { mode?: Mode; sub?: SubOrAll; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const sp = new URLSearchParams();

    // Keep URL short: only write non-defaults
    if (nextMode !== "encouragement") sp.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") sp.set("sub", nextSub);
    if (nextQ.trim().length > 0) sp.set("q", nextQ.trim());

    const qs = sp.toString();
    router.push(qs ? `/?${qs}` : `/`);
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return DATA.filter((item) => {
      if (item.mode !== mode) return false;
      if (mode === "encouragement" && sub !== "all") {
        if (item.sub !== sub) return false;
      }
      if (!needle) return true;

      const hay = `${item.title} ${item.body} ${item.ref}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [mode, sub, q]);

  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f8fb 0%, #ffffff 55%)",
    padding: 16,
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 920,
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#111",
  };

  // Internal scroll panel (fixes mobile scroll weirdness)
  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.10)",
    padding: 18,
    height: "72vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  };

  const softCardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 16,
    transition: "transform 140ms ease, box-shadow 140ms ease",
    cursor: "default",
  };

  const pillBtn: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    fontSize: 14,
    cursor: "pointer",
  };

  const pillBtnActive: React.CSSProperties = {
    ...pillBtn,
    border: "1px solid rgba(0,0,0,0.18)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
    fontWeight: 700,
  };

  const subBtn: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    fontSize: 13,
    cursor: "pointer",
  };

  const subBtnActive: React.CSSProperties = {
    ...subBtn,
    border: "1px solid rgba(0,0,0,0.18)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
    fontWeight: 700,
  };

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 34, letterSpacing: -0.4 }}>Ask Solomon</h1>
          <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
            Encouragement first—wisdom from Proverbs for what you’re facing right now.
          </p>
        </header>

        <section style={cardStyle}>
          {/* STICKY CONTROLS */}
          <div
            style={{
              position: "sticky",
              top: 10,
              zIndex: 10,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: 16,
              padding: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 14px 40px rgba(0,0,0,0.06)",
              marginBottom: 14,
            }}
          >
            {/* MODE BUTTONS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                style={mode === "encouragement" ? pillBtnActive : pillBtn}
                onClick={() => {
                  setMode("encouragement");
                  setSub("all");
                  setQ("");
                  setUrl({ mode: "encouragement", sub: "all", q: "" });
                }}
              >
                Encourage Me
              </button>

              <button
                style={mode === "wisdom" ? pillBtnActive : pillBtn}
                onClick={() => {
                  setMode("wisdom");
                  setSub("all");
                  setQ("");
                  setUrl({ mode: "wisdom", sub: "all", q: "" });
                }}
              >
                Wisdom
              </button>

              <button
                style={mode === "success" ? pillBtnActive : pillBtn}
                onClick={() => {
                  setMode("success");
                  setSub("all");
                  setQ("");
                  setUrl({ mode: "success", sub: "all", q: "" });
                }}
              >
                Success
              </button>
            </div>

            {/* SUB TOPICS */}
            {mode === "encouragement" && (
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  style={sub === "all" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("all");
                    setUrl({ sub: "all" });
                  }}
                >
                  All
                </button>
                <button
                  style={sub === "peace" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("peace");
                    setUrl({ sub: "peace" });
                  }}
                >
                  Peace
                </button>
                <button
                  style={sub === "strength" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("strength");
                    setUrl({ sub: "strength" });
                  }}
                >
                  Strength
                </button>
                <button
                  style={sub === "direction" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("direction");
                    setUrl({ sub: "direction" });
                  }}
                >
                  Direction
                </button>
                <button
                  style={sub === "confidence" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("confidence");
                    setUrl({ sub: "confidence" });
                  }}
                >
                  Confidence
                </button>
                <button
                  style={sub === "hope" ? subBtnActive : subBtn}
                  onClick={() => {
                    setSub("hope");
                    setUrl({ sub: "hope" });
                  }}
                >
                  Hope
                </button>
              </div>
            )}

            {/* SEARCH */}
            <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input
                value={q}
                onChange={(e) => {
                  const next = e.target.value;
                  setQ(next);
                  setUrl({ q: next });
                }}
                placeholder="Search a keyword (e.g., fear, diligence, counsel)…"
                style={{
                  flex: 1,
                  minWidth: 240,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  outline: "none",
                  fontSize: 14,
                }}
              />

              <button
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  background: q.trim().length ? "#111" : "#ddd",
                  color: q.trim().length ? "#fff" : "#555",
                  fontSize: 14,
                  cursor: q.trim().length ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (!q.trim().length) return;
                  setQ("");
                  setUrl({ q: "" });
                }}
                disabled={!q.trim().length}
              >
                Clear
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {mode === "encouragement" && sub !== "all" && (
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: "#f8fafc",
                borderRadius: 12,
                fontSize: 15,
                color: "#444",
              }}
            >
              {subCommentary[sub as Sub]}
            </div>
          )}

          <div style={{ display: "grid", gap: 12 }}>
            {results.length === 0 ? (
              <div style={{ color: "#666", fontSize: 14, padding: 8 }}>
                No matches. Try a different keyword.
              </div>
            ) : (
              results.map((item, idx) => (
                <article
                  key={`${item.ref}-${idx}`}
                  style={softCardStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as any).style.transform = "translateY(-1px)";
                    (e.currentTarget as any).style.boxShadow = "0 14px 34px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as any).style.transform = "translateY(0px)";
                    (e.currentTarget as any).style.boxShadow = "0 10px 26px rgba(0,0,0,0.06)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{item.title}</h3>
                    <span style={{ color: "#666", fontSize: 13, whiteSpace: "nowrap" }}>{item.ref}</span>
                  </div>
                  <p style={{ marginTop: 10, marginBottom: 0, color: "#333", lineHeight: 1.45 }}>{item.body}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <footer style={{ marginTop: 14, color: "#777", fontSize: 12 }}>
          <span>Tip: Use “Encourage Me” first, then narrow down by a sub-topic.</span>
        </footer>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <PageInner />
    </Suspense>
  );
}
