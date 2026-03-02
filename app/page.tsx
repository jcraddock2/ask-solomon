"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isProUser } from "./lib/access";
const [favoritesOnly, setFavoritesOnly] = useState(false);
const [favoriteKeys, setFavoriteKeys] = useState<Record<string, true>>({});
/** ---------------- TYPES ---------------- */
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

/** ---------------- DATA ---------------- */
const DATA: Item[] = [
  // Encouragement
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
  {
    title: "The wise listen",
    body: "Wisdom doesn’t need to win the moment—wisdom wants to win the outcome.",
    ref: "Proverbs 12:15",
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
  {
    title: "Build slowly, build strong",
    body: "Real success is a system. Keep showing up—faithful work compounds.",
    ref: "Proverbs 13:11",
    mode: "success",
  },
];

const subCommentary = {
  peace: "When your mind is loud and the pressure is real, peace begins with trust—not control.",
  strength: "Real strength isn’t noise or force—it’s steadiness under pressure.",
  direction: "Clarity comes when you stop chasing options and start seeking wisdom.",
  confidence: "Confidence grows when identity is anchored deeper than circumstances.",
  hope: "Hope is not denial—it’s the decision to believe tomorrow can still improve.",
} as const;

const subButtons: { label: string; value: Sub }[] = [
  { label: "Peace", value: "peace" },
  { label: "Strength", value: "strength" },
  { label: "Direction", value: "direction" },
  { label: "Confidence", value: "confidence" },
  { label: "Hope", value: "hope" },
];

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

  const [mode, setMode] = useState<Mode>("encouragement");
  const [sub, setSub] = useState<SubOrAll>("all");
  const [q, setQ] = useState<string>("");
  const [isPro, setIsPro] = useState<boolean>(false);

  // Copy button state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Brand accent (matches your glow vibe)
  const ACCENT = "#2563eb";
  const ACCENT_SOFT = "rgba(37,99,235,0.28)";

  // Hydrate state from URL + Pro from localStorage
  useEffect(() => {
    const nextMode = clampMode(params.get("mode"));
    const nextSub = clampSub(params.get("sub"));
    const nextQ = params.get("q") ?? "";
try {
  const raw = localStorage.getItem("asksolomon:favorites");
  if (raw) setFavoriteKeys(JSON.parse(raw));
} catch {}
    setMode(nextMode);
    setSub(nextSub);
    setQ(nextQ);

    // Pro status
    try {
      setIsPro(isProUser());
    } catch {
      setIsPro(false);
    }
  }, [params]);

  const setUrl = (next: { mode?: Mode; sub?: SubOrAll; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const sp = new URLSearchParams();
    if (nextMode !== "encouragement") sp.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") sp.set("sub", nextSub);
    if (nextQ.trim().length) sp.set("q", nextQ.trim());

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
 }, [mode, sub, q, favoritesOnly, favoriteKeys]);
const key = `${item.ref}-${item.title}`;
if (favoritesOnly && !favoriteKeys[key]) return false;
  const <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(key);
  }}
  style={{
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.10)",
    background: favoriteKeys[key] ? "#0f172a" : "rgba(255,255,255,0.75)",
    color: favoriteKeys[key] ? "#fff" : "#0f172a",
    fontSize: 12,
    fontWeight: 900,
    cursor: "pointer",
  }}
  title={favoriteKeys[key] ? "Remove from Favorites" : "Save to Favorites"}
>
  {favoriteKeys[key] ? "★" : "☆"}
</button>copyItem = async (item: { title: string; body: string; ref: string }, key: string) => {
    const text = `${item.title}\n${item.body}\n— ${item.ref}`;
const toggleFavorite = (key: string) => {
  setFavoriteKeys((prev) => {
    const next = { ...prev };
    if (next[key]) delete next[key];
    else next[key] = true;

    try {
      localStorage.setItem("asksolomon:favorites", JSON.stringify(next));
    } catch {}

    return next;
  });
};
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 900);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);

      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 900);
    }
  };

  /** ---------------- STYLES ---------------- */
  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    padding: 16,
    background: `radial-gradient(900px 500px at 15% 0%, ${ACCENT_SOFT} 0%, rgba(255,255,255,0) 60%),
                 linear-gradient(180deg, #f6f8fb 0%, #ffffff 60%)`,
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 920,
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#0f172a",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.10)",
    padding: 18,
    height: "72vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  };

  const softCardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.90)",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 16,
    transition: "transform 140ms ease, box-shadow 140ms ease",
  };

  const stickyStyle: React.CSSProperties = {
    position: "sticky",
    top: 10,
    zIndex: 10,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    padding: 12,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: `0 18px 60px rgba(0,0,0,0.07)`,
    marginBottom: 14,
  };

  const pillBase: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
  };

  const pillActive: React.CSSProperties = {
    ...pillBase,
    border: `1px solid ${ACCENT_SOFT}`,
    boxShadow: `0 18px 40px ${ACCENT_SOFT}`,
  };

  const subPillBase: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.70)",
    fontSize: 13,
    fontWeight: 900,
    cursor: "pointer",
  };

  const subPillActive: React.CSSProperties = {
    ...subPillBase,
    border: `1px solid ${ACCENT_SOFT}`,
    boxShadow: `0 16px 34px ${ACCENT_SOFT}`,
  };

  const glowDivider: React.CSSProperties = {
    height: 1,
    background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${ACCENT_SOFT} 25%, rgba(0,0,0,0.10) 50%, ${ACCENT_SOFT} 75%, rgba(0,0,0,0) 100%)`,
    margin: "10px 0 2px",
  };

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        {/* HEADER */}
        <header style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 38, letterSpacing: "-0.8px", lineHeight: 1.05, fontWeight: 900 }}>
                Ask Solomon
              </h1>
              <p style={{ marginTop: 8, marginBottom: 0, color: "#334155", fontWeight: 650 }}>
                Encouragement first—wisdom from Proverbs for what you’re facing right now.
              </p>
            </div>

            {/* RESTORED HEADER ACTIONS */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  padding: "7px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "rgba(255,255,255,0.75)",
                  color: "#111",
                  fontWeight: 900,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
                title={isPro ? "Pro Enabled" : "Free Mode"}
              >
                {isPro ? "PRO" : "FREE"}
              </div>

              <button
                onClick={() => router.push("/book")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.80)",
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Book
              </button>

              {!isPro && (
                <button
                  onClick={() => router.push("/upgrade")}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "#0f172a",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 900,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Upgrade (Lifetime)
                </button>
              )}
            </div>
          </div>

          <div style={glowDivider} />
        </header>

        <section style={cardStyle}>
          {/* STICKY CONTROLS */}
          <div style={stickyStyle}>
            {/* MODE BUTTONS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                style={mode === "encouragement" ? pillActive : pillBase}
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
                style={mode === "wisdom" ? pillActive : pillBase}
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
                style={mode === "success" ? pillActive : pillBase}
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
                  style={sub === "all" ? subPillActive : subPillBase}
                  onClick={() => {
                    setSub("all");
                    setUrl({ sub: "all" });
                  }}
                >
                  All
                </button>

                {subButtons.map((b) => (
                  <button
                    key={b.value}
                    style={sub === b.value ? subPillActive : subPillBase}
                    onClick={() => {
                      setSub(b.value);
                      setUrl({ sub: b.value });
                    }}
                  >
                    {b.label}
                  </button>
                ))}
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
                  padding: "11px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.14)",
                  outline: "none",
                  fontSize: 14,
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: `0 0 0 6px rgba(37,99,235,0.12)`,
                }}
              />

              <button
                onClick={() => {
                  if (!q.trim()) return;
                  setQ("");
                  setUrl({ q: "" });
                }}
                disabled={!q.trim()}
                style={{
                  padding: "11px 14px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.14)",
                  background: q.trim() ? "#0f172a" : "rgba(0,0,0,0.08)",
                  color: q.trim() ? "#fff" : "#334155",
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: q.trim() ? "pointer" : "not-allowed",
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* SUB COMMENTARY */}
          {mode === "encouragement" && sub !== "all" && (
            <div
              style={{
                marginBottom: 12,
                padding: 14,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
                color: "#1f2937",
                fontSize: 15,
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6, letterSpacing: 0.2, fontWeight: 900 }}>
                Solomon’s note
              </div>
              {subCommentary[sub as keyof typeof subCommentary]}
            </div>
          )}

          <div style={{ marginBottom: 10, fontSize: 12, color: "#64748b", fontWeight: 900 }}>
            Showing {results.length} result{results.length === 1 ? "" : "s"}
          </div>

          {/* RESULTS GRID */}
          <div style={{ display: "grid", gap: 12 }}>
            {results.length === 0 ? (
              <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
                No matches. Try a different keyword.
              </div>
            ) : (
              results.map((item, idx) => {
                const key = `${item.ref}-${idx}`;
                return (
                  <article
                    key={key}
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
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.2px", lineHeight: 1.2 }}>
                        {item.title}
                      </div>

                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div
                          style={{
                            color: "#111",
                            fontSize: 12,
                            fontWeight: 900,
                            whiteSpace: "nowrap",
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(0,0,0,0.10)",
                            background: "rgba(255,255,255,0.75)",
                          }}
                        >
                          {item.ref}
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyItem(item, key);
                          }}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(0,0,0,0.10)",
                            background: copiedKey === key ? "#0f172a" : "rgba(255,255,255,0.75)",
                            color: copiedKey === key ? "#fff" : "#0f172a",
                            fontSize: 12,
                            fontWeight: 900,
                            cursor: "pointer",
                          }}
                        >
                          {copiedKey === key ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: 10, color: "#0f172a", fontSize: 14, lineHeight: 1.5, fontWeight: 650 }}>
                      {item.body}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <footer style={{ marginTop: 14, color: "#64748b", fontSize: 12, fontWeight: 800 }}>
          Tip: Use “Encourage Me” first, then narrow down by a sub-topic.
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
