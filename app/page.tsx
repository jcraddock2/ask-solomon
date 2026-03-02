"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "encouragement" | "wisdom" | "wealth" | "success";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

type Item = {
  title: string;
  body: string;
  ref: string;
  mode: Mode;
  sub?: Sub; // only used for encouragement sub-topics
};

const MODES: { key: Mode; label: string }[] = [
  { key: "encouragement", label: "Encourage Me" },
  { key: "wisdom", label: "Wisdom" },
  { key: "wealth", label: "Wealth" },
  { key: "success", label: "Success" },
];

const SUBS: { key: Sub; label: string }[] = [
  { key: "peace", label: "Peace" },
  { key: "strength", label: "Strength" },
  { key: "direction", label: "Direction" },
  { key: "confidence", label: "Confidence" },
  { key: "hope", label: "Hope" },
];

const subCommentary: Record<Sub, string> = {
  peace:
    "Peace isn’t the absence of trouble—it’s the presence of God’s order in your mind. Slow down. Let wisdom settle your spirit before you act.",
  strength:
    "Strength isn’t hype. It’s quiet endurance. Take the next right step, even if it’s small—God builds giants one faithful choice at a time.",
  direction:
    "Direction comes after alignment. Ask: what is wise, what is true, what is pure—and then move. God steers a moving ship.",
  confidence:
    "Confidence is obedience with your shoulders back. You don’t need permission to do what’s right—just courage to begin.",
  hope:
    "Hope is a decision to see beyond the moment. Lift your eyes: today is not the whole story. Keep sowing—harvest comes.",
};

const DATA: Item[] = [
  // ENCOURAGEMENT
  {
    mode: "encouragement",
    sub: "peace",
    title: "Guard your heart",
    body: "Protect what you allow into your mind. Peace is built by boundaries—what you focus on grows.",
    ref: "Proverbs 4:23",
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Do not fear sudden terror",
    body: "When fear tries to rush you, refuse it. Wisdom steadies you when emotions spike.",
    ref: "Proverbs 3:25–26",
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "He will make your paths straight",
    body: "Acknowledge God in your decisions. Guidance often comes one step at a time—move in faith.",
    ref: "Proverbs 3:5–6",
  },
  {
    mode: "encouragement",
    sub: "confidence",
    title: "The righteous are bold",
    body: "Confidence grows when you live clean and decisive. Integrity gives you a backbone.",
    ref: "Proverbs 28:1",
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Your hope will not be cut off",
    body: "Keep doing what’s wise and right. God protects the long-term outcome of faithful people.",
    ref: "Proverbs 23:18",
  },

  // WISDOM
  {
    mode: "wisdom",
    title: "Wisdom is the main thing",
    body: "If you’re unsure what to do next—choose wisdom first. It will shape every other decision.",
    ref: "Proverbs 4:7",
  },
  {
    mode: "wisdom",
    title: "Get understanding",
    body: "Don’t just collect information—seek understanding. It saves time, money, and pain.",
    ref: "Proverbs 4:5",
  },

  // WEALTH
  {
    mode: "wealth",
    title: "Diligent hands bring wealth",
    body: "Wealth is often the reward of consistency. Do the work you don’t feel like doing.",
    ref: "Proverbs 10:4",
  },
  {
    mode: "wealth",
    title: "Honor the Lord with your wealth",
    body: "Put God first in your resources. Trust changes how you spend, save, and give.",
    ref: "Proverbs 3:9–10",
  },

  // SUCCESS
  {
    mode: "success",
    title: "Commit your work",
    body: "Give God your plans, then execute with discipline. Consistency turns prayers into progress.",
    ref: "Proverbs 16:3",
  },
  {
    mode: "success",
    title: "Plans succeed with counsel",
    body: "Don’t isolate. The right feedback protects you from blind spots and speeds your results.",
    ref: "Proverbs 15:22",
  },
];

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function PageInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const modeFromUrl = (sp.get("mode") as Mode) || "encouragement";
  const subFromUrl = (sp.get("sub") as Sub) || "all";
  const qFromUrl = sp.get("q") || "";

  const [mode, setMode] = useState<Mode>(modeFromUrl);
  const [sub, setSub] = useState<Sub | "all">(subFromUrl);
  const [q, setQ] = useState<string>(qFromUrl);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string>("");

  // ---- styles
  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 30% 10%, rgba(99,102,241,0.14), transparent 60%), radial-gradient(900px 500px at 80% 25%, rgba(16,185,129,0.12), transparent 60%), linear-gradient(180deg, #f8fafc, #ffffff)",
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
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
    background: "#fff",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 16,
    transition: "transform 140ms ease, box-shadow 140ms ease",
  };

  const pillBtn = (active: boolean): React.CSSProperties => ({
    border: "1px solid rgba(0,0,0,0.10)",
    background: active ? "rgba(17,24,39,0.92)" : "rgba(255,255,255,0.92)",
    color: active ? "#fff" : "#111",
    borderRadius: 999,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
  });

  const smallBtn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 14,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
  };

  // ---- load favorites
  useEffect(() => {
    const saved = safeParse<Record<string, boolean>>(localStorage.getItem("asksolomon:favorites"), {});
    setFavoriteKeys(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("asksolomon:favorites", JSON.stringify(favoriteKeys));
  }, [favoriteKeys]);

  // ---- url sync helper
  const setUrl = (next: { mode?: Mode; sub?: Sub | "all"; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const params = new URLSearchParams();
    if (nextMode !== "encouragement") params.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") params.set("sub", nextSub);
    if (nextQ.trim().length > 0) params.set("q", nextQ.trim());

    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  };

  // keep state aligned when URL changes (refresh/back buttons)
  useEffect(() => {
    setMode(modeFromUrl);
    setSub(subFromUrl);
    setQ(qFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const favoritesCount = useMemo(() => Object.keys(favoriteKeys).length, [favoriteKeys]);

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  const handleCopy = async (item: Item, key: string) => {
    const text = `${item.title}\n\n${item.body}\n\n${item.ref}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 900);
    } catch {
      // fallback: do nothing (still safe)
    }
  };

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = DATA.filter((d) => d.mode === mode);

    if (mode === "encouragement" && sub !== "all") {
      list = list.filter((d) => d.sub === sub);
    }

    if (query.length > 0) {
      list = list.filter((d) => {
        const hay = `${d.title} ${d.body} ${d.ref}`.toLowerCase();
        return hay.includes(query);
      });
    }

    // favorites filter is based on computed keys
    if (favoritesOnly) {
      list = list.filter((d) => {
        const key = `${d.ref}-${d.title}`;
        return !!favoriteKeys[key];
      });
    }

    return list;
  }, [mode, sub, q, favoritesOnly, favoriteKeys]);

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        <header style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 34, letterSpacing: -0.5 }}>Ask Solomon</h1>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#334155" }}>
              Favorites: {favoritesCount}
            </div>
          </div>

          <p style={{ marginTop: 8, marginBottom: 0, color: "#334155", fontWeight: 700 }}>
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
              background: "rgba(248,250,252,0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 18,
              padding: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              marginBottom: 14,
            }}
          >
            {/* MODE BUTTONS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {MODES.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    setMode(m.key);
                    const nextSub: Sub | "all" = m.key === "encouragement" ? "all" : "all";
                    setSub(nextSub);
                    setUrl({ mode: m.key, sub: "all" });
                  }}
                  style={pillBtn(mode === m.key)}
                >
                  {m.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setFavoritesOnly((v) => !v)}
                style={{
                  ...pillBtn(favoritesOnly),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
                title="Show only saved favorites"
              >
                <span>☆</span>
                <span>Favorites</span>
              </button>
            </div>

            {/* SUB BUTTONS (only for encouragement) */}
            {mode === "encouragement" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    setSub("all");
                    setUrl({ sub: "all" });
                  }}
                  style={pillBtn(sub === "all")}
                >
                  All
                </button>

                {SUBS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      setSub(s.key);
                      setUrl({ sub: s.key });
                    }}
                    style={pillBtn(sub === s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* SEARCH */}
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setUrl({ q: e.target.value });
                }}
                placeholder="Search keyword (e.g., fear, counsel, diligence)…"
                style={{
                  flex: 1,
                  minWidth: 240,
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  fontWeight: 700,
                  outline: "none",
                }}
              />

              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setUrl({ q: "" });
                }}
                style={smallBtn}
              >
                Clear
              </button>
            </div>
          </div>

          {/* SOLOMON’S NOTE */}
          {mode === "encouragement" && sub !== "all" && subCommentary[sub as Sub] && (
            <div
              style={{
                marginTop: 10,
                marginBottom: 12,
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.75)",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 6 }}>
                Solomon’s note
              </div>
              <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>
                {subCommentary[sub as Sub]}
              </div>
            </div>
          )}

          {/* RESULTS COUNT */}
          <div style={{ marginBottom: 10, fontSize: 12, color: "#64748b", fontWeight: 900 }}>
            Showing {results.length} result{results.length === 1 ? "" : "s"}
          </div>

          {/* RESULTS GRID */}
          <div style={{ display: "grid", gap: 12 }}>
            {results.length === 0 ? (
              <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
                {favoritesOnly && favoritesCount === 0
                  ? "You haven’t saved any favorites yet. Tap ☆ on a verse to save it."
                  : "No matches. Try a different keyword."}
              </div>
            ) : (
              results.map((item) => {
                const key = `${item.ref}-${item.title}`;
                const isFav = !!favoriteKeys[key];
                const isCopied = copiedKey === key;

                return (
                  <div
                    key={key}
                    style={{
                      ...softCardStyle,
                      transform: "translateY(0px)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 900, fontSize: 15, color: "#111" }}>
                          {item.title}
                        </div>

                        <div style={{ marginTop: 6, fontSize: 16, lineHeight: 1.6, color: "#222" }}>
                          {item.body}
                        </div>

                        <div style={{ marginTop: 10, fontSize: 13, color: "#64748b", fontWeight: 700 }}>
                          {item.ref}
                        </div>
                      </div>

                      {/* RIGHT ACTIONS */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(key)}
                          style={{
                            border: "1px solid rgba(0,0,0,0.10)",
                            background: "rgba(255,255,255,0.85)",
                            borderRadius: 12,
                            padding: "8px 10px",
                            cursor: "pointer",
                            fontWeight: 900,
                          }}
                          title={isFav ? "Remove favorite" : "Save favorite"}
                        >
                          {isFav ? "★" : "☆"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(item, key)}
                          style={{
                            border: "1px solid rgba(0,0,0,0.10)",
                            background: "rgba(255,255,255,0.85)",
                            borderRadius: 12,
                            padding: "8px 10px",
                            cursor: "pointer",
                            fontWeight: 900,
                            fontSize: 12,
                          }}
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* MICRO PROMPT (premium feel) */}
                    <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontWeight: 800 }}>
                      Save this. Sit with it. Apply it today.
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
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
