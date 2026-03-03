"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// If your access file path differs, adjust this import.
// Common alternatives:
//   import { isProUser } from "../lib/access";
//   import { isProUser } from "./lib/access";
import { isProUser } from "./lib/access";

type Mode = "encouragement" | "wisdom" | "success";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

type VerseItem = {
  title: string;
  body: string;
  ref: string;
  mode: Mode;
  sub?: Sub; // only for encouragement
};

const MODES: { key: Mode; label: string }[] = [
  { key: "encouragement", label: "Encourage Me" },
  { key: "wisdom", label: "Wisdom" },
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
    "Peace isn’t the absence of trouble—it’s the presence of order in your mind. Slow down. Let wisdom settle your spirit before you act.",
  strength:
    "Strength isn’t hype. It’s quiet endurance. Take the next right step—God builds courage through consistency.",
  direction:
    "Direction often comes after alignment. Choose what’s wise, true, and clean—then move. God steers a moving ship.",
  confidence:
    "Confidence is obedience with your shoulders back. You don’t need permission to do what’s right—just courage to begin.",
  hope:
    "Hope is a decision to see beyond the moment. Today is not the whole story. Keep sowing—harvest comes.",
};

/**
 * ✅ Replace this DATA with your full list later if you already have one.
 * I made this intentionally “bigger” so your screen doesn’t look like it has fewer verses.
 */
const DATA: VerseItem[] = [
  // ENCOURAGEMENT — Peace
  {
    mode: "encouragement",
    sub: "peace",
    title: "Peace in anxious moments",
    body: "When your mind is racing, choose the calm path—wisdom steadies the heart.",
    ref: "Proverbs 12:25",
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Guard your heart",
    body: "Protect what you allow into your mind. Peace is built by boundaries—what you focus on grows.",
    ref: "Proverbs 4:23",
  },
  {
    mode: "encouragement",
    sub: "peace",
    title: "Gentle words soften pressure",
    body: "When tension rises, lower your voice—wisdom turns down the fire.",
    ref: "Proverbs 15:1",
  },

  // ENCOURAGEMENT — Strength
  {
    mode: "encouragement",
    sub: "strength",
    title: "Strength for the day",
    body: "Don’t quit in the pressure—steady courage grows quietly and wins later.",
    ref: "Proverbs 24:10",
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Endurance over impulse",
    body: "Strong people don’t react fast—they respond wisely and finish well.",
    ref: "Proverbs 16:32",
  },
  {
    mode: "encouragement",
    sub: "strength",
    title: "Keep your footing",
    body: "Your steps are established when your decisions are clean and consistent.",
    ref: "Proverbs 4:26",
  },

  // ENCOURAGEMENT — Direction
  {
    mode: "encouragement",
    sub: "direction",
    title: "Direction when unsure",
    body: "Seek counsel and walk the next right step—clarity comes with motion.",
    ref: "Proverbs 11:14",
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "He will make your paths straight",
    body: "Trust beyond your understanding. Guidance often comes one step at a time—move in faith.",
    ref: "Proverbs 3:5–6",
  },
  {
    mode: "encouragement",
    sub: "direction",
    title: "Commit your plans",
    body: "Submit your work, then execute with discipline—momentum follows obedience.",
    ref: "Proverbs 16:3",
  },

  // ENCOURAGEMENT — Confidence
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Confidence without arrogance",
    body: "Quiet confidence comes from integrity—stand firm without showing off.",
    ref: "Proverbs 3:5–6",
  },
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Boldness follows righteousness",
    body: "Fear shrinks when your conscience is clear—do what’s right and walk tall.",
    ref: "Proverbs 28:1",
  },
  {
    mode: "encouragement",
    sub: "confidence",
    title: "Speak with clarity",
    body: "Let your words be clean and direct—confidence is felt in simplicity.",
    ref: "Proverbs 10:19",
  },

  // ENCOURAGEMENT — Hope
  {
    mode: "encouragement",
    sub: "hope",
    title: "Your hope will not be cut off",
    body: "Keep doing what’s wise and right. God protects the long-term outcome of faithful people.",
    ref: "Proverbs 23:18",
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Light rises",
    body: "Even if it’s dim right now—keep walking. Wisdom brings morning.",
    ref: "Proverbs 4:18",
  },
  {
    mode: "encouragement",
    sub: "hope",
    title: "Don’t envy evil",
    body: "Stay your course. Shortcuts fade—wisdom outlasts the moment.",
    ref: "Proverbs 24:1",
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
  {
    mode: "wisdom",
    title: "Counsel strengthens plans",
    body: "Plans succeed with the right voices—wisdom loves feedback.",
    ref: "Proverbs 15:22",
  },
  {
    mode: "wisdom",
    title: "Listen first",
    body: "Quick answers create mistakes—wisdom listens before speaking.",
    ref: "Proverbs 18:13",
  },
  {
    mode: "wisdom",
    title: "Choose your words",
    body: "Words can build your life or burn it—wisdom uses restraint.",
    ref: "Proverbs 12:18",
  },

  // SUCCESS
  {
    mode: "success",
    title: "Diligence wins",
    body: "Success is often the reward of consistency. Do the work you don’t feel like doing.",
    ref: "Proverbs 10:4",
  },
  {
    mode: "success",
    title: "Prepare and execute",
    body: "Order your steps—clear plans multiply your results.",
    ref: "Proverbs 21:5",
  },
  {
    mode: "success",
    title: "Steady progress beats haste",
    body: "Fast decisions can wreck outcomes—wisdom builds success one day at a time.",
    ref: "Proverbs 19:2",
  },
  {
    mode: "success",
    title: "Skill creates opportunity",
    body: "Excellence opens doors—become so prepared your work speaks for you.",
    ref: "Proverbs 22:29",
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

  // URL -> initial state
  const urlMode = (sp.get("mode") as Mode) || "encouragement";
  const urlSub = (sp.get("sub") as Sub) || "all";
  const urlQ = sp.get("q") || "";

  const [mode, setMode] = useState<Mode>(urlMode);
  const [sub, setSub] = useState<Sub | "all">(urlSub);
  const [q, setQ] = useState<string>(urlQ);

  const [isPro, setIsPro] = useState(false);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string>("");

  const [todayFocusOn, setTodayFocusOn] = useState(false);
  const [todayFocusKey, setTodayFocusKey] = useState<string>("");

  const [hoverKey, setHoverKey] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState(false);

  // ---- styles (matched to your “best screenshot” look)
  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 680px at 22% 8%, rgba(99,102,241,0.20), transparent 58%), radial-gradient(1000px 560px at 82% 22%, rgba(16,185,129,0.15), transparent 60%), linear-gradient(180deg, #f8fafc, #ffffff)",
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  };

  const badgeStyle = (pro: boolean): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.10)",
    background: pro ? "rgba(16,185,129,0.16)" : "rgba(99,102,241,0.14)",
    color: "#111",
  });

  const headerBtn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 14,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 22,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 26px 80px rgba(0,0,0,0.10)",
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
    transition: "transform 160ms ease, box-shadow 160ms ease",
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
    boxShadow: active ? "0 14px 30px rgba(0,0,0,0.16)" : "0 10px 24px rgba(0,0,0,0.06)",
    whiteSpace: "nowrap",
  });

  const miniBtn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
  };

  // ---- PRO detection
  useEffect(() => {
    try {
      setIsPro(isProUser());
    } catch {
      setIsPro(false);
    }
  }, []);

  // ---- favorites load/save
  useEffect(() => {
    const saved = safeParse<Record<string, boolean>>(localStorage.getItem("asksolomon:favorites"), {});
    setFavoriteKeys(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("asksolomon:favorites", JSON.stringify(favoriteKeys));
  }, [favoriteKeys]);

  // ---- url sync helper (shareable / refresh-safe)
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

  // keep state aligned when back/forward/refresh changes search params
  useEffect(() => {
    setMode(urlMode);
    setSub(urlSub);
    setQ(urlQ);
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

  const handleCopy = async (item: VerseItem, key: string) => {
    const text = `${item.title}\n\n${item.body}\n\n${item.ref}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(""), 900);
    } catch {
      // silent fail
    }
  };

  // Build pool from current filters (no Today’s Focus applied)
  const buildFilteredPool = () => {
    const query = q.trim().toLowerCase();

    let pool = DATA.filter((d) => d.mode === mode);

    if (mode === "encouragement" && sub !== "all") {
      pool = pool.filter((d) => d.sub === sub);
    }

    if (query.length > 0) {
      pool = pool.filter((d) => {
        const hay = `${d.title} ${d.body} ${d.ref}`.toLowerCase();
        return hay.includes(query);
      });
    }

    if (favoritesOnly) {
      pool = pool.filter((d) => {
        const k = `${d.ref}-${d.title}`;
        return !!favoriteKeys[k];
      });
    }

    return pool;
  };

  // ---- results pipeline (mode/sub/search/favorites + today focus)
  const results = useMemo(() => {
    let list = buildFilteredPool();

    // ✅ Today’s Focus: show only the selected verse
    if (todayFocusOn) {
      if (!todayFocusKey) return [];
      return list.filter((d) => `${d.ref}-${d.title}` === todayFocusKey);
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, sub, q, favoritesOnly, favoriteKeys, todayFocusOn, todayFocusKey]);

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        {/* HEADER */}
        <header style={{ marginBottom: 16 }}>
          <div style={headerRow}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 40, letterSpacing: -0.8 }}>Ask Solomon</h1>
              <span style={badgeStyle(isPro)}>{isPro ? "PRO" : "FREE"}</span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button type="button" style={headerBtn} onClick={() => router.push("/book")}>
                Book
              </button>

              {!isPro && (
                <button
                  type="button"
                  style={{
                    ...headerBtn,
                    background: "rgba(17,24,39,0.92)",
                    color: "#fff",
                    border: "1px solid rgba(0,0,0,0.16)",
                  }}
                  onClick={() => router.push("/upgrade")}
                >
                  Upgrade (Lifetime)
                </button>
              )}
            </div>
          </div>

          <p style={{ marginTop: 8, marginBottom: 0, color: "#334155", fontWeight: 800 }}>
            Encouragement first—wisdom from Proverbs for what you’re facing right now.
          </p>
        </header>

        {/* MAIN CARD */}
        <section style={cardStyle}>
          {/* STICKY CONTROLS */}
          <div
            style={{
              position: "sticky",
              top: 10,
              zIndex: 10,
              background: "rgba(248,250,252,0.88)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 18,
              padding: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              marginBottom: 14,
            }}
          >
            {/* TOP ROW: MODE + FAVORITES + TODAY’S FOCUS (match screenshot) */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {MODES.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    setMode(m.key);
                    setSub("all");
                    setFavoritesOnly(false);
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
                    setUrl({ mode: m.key, sub: "all" });
                  }}
                  style={pillBtn(mode === m.key)}
                >
                  {m.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setFavoritesOnly((v) => !v);
                  setTodayFocusOn(false);
                  setTodayFocusKey("");
                }}
                style={{
                  ...pillBtn(favoritesOnly),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
                title="Show only saved favorites"
              >
                <span>⭐</span>
                <span>Favorites</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (todayFocusOn) {
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
                    return;
                  }

                  const pool = buildFilteredPool();
                  if (pool.length === 0) {
                    setTodayFocusOn(true);
                    setTodayFocusKey("");
                    return;
                  }

                  const choice = pool[Math.floor(Math.random() * pool.length)];
                  const key = `${choice.ref}-${choice.title}`;
                  setTodayFocusKey(key);
                  setTodayFocusOn(true);
                }}
                style={{
                  ...pillBtn(todayFocusOn),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
                title="Show one random verse from the current filter"
              >
                <span>✨</span>
                <span>Today’s Focus</span>
              </button>
            </div>

            {/* SUB ROW (Encouragement only) */}
            {mode === "encouragement" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    setSub("all");
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
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
                      setTodayFocusOn(false);
                      setTodayFocusKey("");
                      setUrl({ sub: s.key });
                    }}
                    style={pillBtn(sub === s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* SEARCH (with glow like screenshot) */}
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={q}
                onChange={(e) => {
                  const val = e.target.value;
                  setQ(val);
                  setTodayFocusOn(false);
                  setTodayFocusKey("");
                  setUrl({ q: val });
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search a keyword (e.g., fear, diligence, counsel)…"
                style={{
                  flex: 1,
                  minWidth: 260,
                  border: searchFocused ? "1px solid rgba(99,102,241,0.55)" : "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  fontWeight: 800,
                  outline: "none",
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: searchFocused ? "0 0 0 5px rgba(99,102,241,0.18), 0 12px 28px rgba(0,0,0,0.08)" : "none",
                  transition: "box-shadow 140ms ease, border 140ms ease",
                }}
              />

              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setTodayFocusOn(false);
                  setTodayFocusKey("");
                  setUrl({ q: "" });
                }}
                style={headerBtn}
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
              <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 6 }}>Solomon’s note</div>
              <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>{subCommentary[sub as Sub]}</div>
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
                  ? "You haven’t saved any favorites yet. Tap ⭐ on a verse to save it."
                  : todayFocusOn && !todayFocusKey
                    ? "No matches for Today’s Focus. Try turning off Favorites or clearing search."
                    : "No matches. Try a different keyword."}
              </div>
            ) : (
              results.map((item) => {
                const key = `${item.ref}-${item.title}`;
                const isFav = !!favoriteKeys[key];
                const isCopied = copiedKey === key;
                const hovered = hoverKey === key;

                return (
                  <div
                    key={key}
                    style={{
                      ...softCardStyle,
                      transform: hovered ? "translateY(-2px)" : "translateY(0px)",
                      boxShadow: hovered ? "0 18px 44px rgba(0,0,0,0.12)" : (softCardStyle.boxShadow as string),
                    }}
                    onMouseEnter={() => setHoverKey(key)}
                    onMouseLeave={() => setHoverKey("")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 900, fontSize: 18, color: "#111" }}>{item.title}</div>

                        <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, color: "#111", fontWeight: 650 }}>
                          {item.body}
                        </div>

                        <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontWeight: 900 }}>
                          {item.ref}
                        </div>
                      </div>

                      {/* RIGHT ACTIONS */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(key)}
                          style={miniBtn}
                          title={isFav ? "Remove favorite" : "Save favorite"}
                        >
                          {isFav ? "★" : "☆"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(item, key)}
                          style={{ ...miniBtn, fontSize: 12 }}
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* MICRO PROMPT */}
                    <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontWeight: 800 }}>
                      Save this. Sit with it. Apply it today.
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ marginTop: 14, fontSize: 12, color: "#64748b", fontWeight: 800 }}>
            Tip: Star what you love, then tap Favorites to see only saved items.
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
