// Stable UI restore – baseline confirmed working
"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isProUser } from "./lib/access";
import {
  DATA,
  MODES,
  SUBS,
  TOPICS,
  subCommentary,
  BOOK_INDEX,
  findBookMatches,
  type BookMatch,
  type Mode,
  type Sub,
  type VerseItem,
} from "./lib/verses";

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

  // styles
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

  const topicPill = (active: boolean): React.CSSProperties => ({
    border: "1px solid rgba(0,0,0,0.10)",
    background: active ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.92)",
    borderRadius: 999,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
    color: "#111",
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
   userSelect: "none", 
  };

  // PRO detection
  useEffect(() => {
    try {
      setIsPro(isProUser());
    } catch {
      setIsPro(false);
    }
  }, []);

  // favorites load/save
  useEffect(() => {
    const saved = safeParse<Record<string, boolean>>(localStorage.getItem("asksolomon:favorites"), {});
    setFavoriteKeys(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("asksolomon:favorites", JSON.stringify(favoriteKeys));
  }, [favoriteKeys]);

  // URL sync helper
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

  // keep state aligned with URL changes
  useEffect(() => {
    setMode(urlMode);
    setSub(urlSub);
    setQ(urlQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  // ✅ count only saved keys
  const favoritesCount = useMemo(() => Object.keys(favoriteKeys).length, [favoriteKeys]);

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

const buildShareText = (item: VerseItem) => {
  const link = typeof window !== "undefined" ? window.location.href : "";
  return `${item.title}\n\n${item.body}\n\n${item.ref}\n\n— Ask Solomon\n${link}`;
};

const handleCopy = async (item: VerseItem, key: string) => {
  const text = `${item.title}\n\n${item.body}\n\n${item.ref}`;
  try {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(""), 900);
  } catch {
    // silent
  }
};

const buildShareText = (item: VerseItem) => {
  const link = typeof window !== "undefined" ? window.location.href : "";
  return `${item.title}\n\n${item.body}\n\n${item.ref}\n\n— Ask Solomon\n${link}`;
};

const handleShare = async (item: VerseItem, keyForUi?: string) => {
  const text = buildShareText(item);

  // Try native share first (best on mobile)
  try {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      // @ts-ignore
      await navigator.share({ title: "Ask Solomon", text });
      return;
    }
  } catch {
    // ignore
  }

  // Fallback: copy
  try {
    await navigator.clipboard.writeText(text);
    if (keyForUi) {
      setCopiedKey(keyForUi);
      window.setTimeout(() => setCopiedKey(""), 900);
    }
  } catch {
    // silent
  }
};
  try {
    await navigator.clipboard.writeText(text);
    setCopiedKey(`${item.ref}-${item.title}`); // optional feedback
    window.setTimeout(() => setCopiedKey(""), 900);
  } catch {
    // silent
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
        const hay = `${d.title} ${d.body} ${d.ref} ${(d.tags || []).join(" ")}`.toLowerCase();
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

  const results = useMemo(() => {
    const list = buildFilteredPool();

    if (todayFocusOn) {
      if (!todayFocusKey) return [];
      return list.filter((d) => `${d.ref}-${d.title}` === todayFocusKey);
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, sub, q, favoritesOnly, favoriteKeys, todayFocusOn, todayFocusKey]);

  // ✅ Pro-only: book matches for current search
  const bookMatches = useMemo<BookMatch[]>(() => {
    if (q.trim().length === 0) return [];
    return findBookMatches(q);
  }, [q]);

  const applyTopic = (topicQuery: string) => {
    setQ(topicQuery);
    setTodayFocusOn(false);
    setTodayFocusKey("");
    setUrl({ q: topicQuery });
  };

  const rerollTodaysFocus = () => {
    const pool = buildFilteredPool();
    if (pool.length === 0) {
      setTodayFocusKey("");
      return;
    }

    const choice = pool[Math.floor(Math.random() * pool.length)];
    setTodayFocusKey(`${choice.ref}-${choice.title}`);
  };

  // ✅ THE REAL JSX RETURN (this was broken in your pasted file)
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

              <button type="button" style={headerBtn} onClick={() => router.push("/book-index")}>
                Topics Index
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
            {/* TOP ROW */}
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
                style={{ ...pillBtn(favoritesOnly), display: "flex", gap: 8, alignItems: "center" }}
                title="Show only saved favorites"
              >
                <span>⭐</span>
                <span>
                  {favoritesOnly
                    ? `Showing Favorites (${favoritesCount})`
                    : `Favorites (${favoritesCount})`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  // If already ON, re-roll (premium feel)
                  if (todayFocusOn) {
                    rerollTodaysFocus();
                    return;
                  }

                  const pool = buildFilteredPool();
                  if (pool.length === 0) {
                    setTodayFocusOn(true);
                    setTodayFocusKey("");
                    return;
                  }

                  const choice = pool[Math.floor(Math.random() * pool.length)];
                  setTodayFocusKey(`${choice.ref}-${choice.title}`);
                  setTodayFocusOn(true);
                }}
                style={{
                  ...pillBtn(todayFocusOn),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  animation: todayFocusOn ? "pulseGlow 1.8s ease-in-out infinite" : undefined,
                }}
                title="Show one random verse from the current filter"
              >
                <span>✨</span>
                <span>Today’s Focus</span>
              </button>

              {todayFocusOn && (
                <button
                  type="button"
                  onClick={() => {
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
                  }}
                  style={{ ...pillBtn(false), display: "flex", gap: 8, alignItems: "center" }}
                  title="Return to normal results"
                >
                  <span>↩️</span>
                  <span>Clear Focus</span>
                </button>
              )}
              {todayFocusOn && (
  <button
    type="button"
    onClick={() => {
      rerollTodaysFocus();
    }}
    style={{ ...pillBtn(false), display: "flex", gap: 8, alignItems: "center" }}
    title="Pick a different verse"
  >
    <span>🔄</span>
    <span>Re-roll</span>
  </button>
)}
            </div>

            {/* SUB ROW */}
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

            {/* TOPICS ROW */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {TOPICS.map((t) => {
                const active = q.trim().toLowerCase() === t.query.trim().toLowerCase();
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => applyTopic(t.query)}
                    style={topicPill(active)}
                    title={t.hint}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}
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
                  boxShadow: searchFocused
                    ? "0 0 0 5px rgba(99,102,241,0.18), 0 12px 28px rgba(0,0,0,0.08)"
                    : "none",
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

          {/* BOOK MATCHES (Pro-only) */}
          {q.trim().length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 8 }}>Book Matches</div>

              {isPro ? (
                bookMatches.length === 0 ? (
                  <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800 }}>
                    No book matches yet for “{q.trim()}”.
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 10 }}>
                    {bookMatches.map((m) => (
                      <div
                        key={m.topic}
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: "1px solid rgba(0,0,0,0.08)",
                          borderRadius: 16,
                          padding: 14,
                          boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                        }}
                      >
                        <div style={{ fontWeight: 900, fontSize: 15, color: "#111" }}>{m.label}</div>

                        <div style={{ marginTop: 6, color: "#334155", fontWeight: 800, fontSize: 13 }}>{m.blurb}</div>

                        <div style={{ marginTop: 8, color: "#64748b", fontWeight: 900, fontSize: 12 }}>
                          Recommended: {m.pages} • {m.chapters.join(" • ")}
                        </div>

                        <div style={{ marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => router.push("/book")}
                            style={{
                              border: "1px solid rgba(0,0,0,0.10)",
                              background: "rgba(17,24,39,0.92)",
                              color: "#fff",
                              borderRadius: 14,
                              padding: "10px 12px",
                              cursor: "pointer",
                              fontWeight: 900,
                              fontSize: 13,
                            }}
                          >
                            Open Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 16,
                    padding: 14,
                    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 14, color: "#111" }}>🔒 Book Matches are a Lifetime feature</div>

                  <div style={{ marginTop: 6, color: "#334155", fontWeight: 800, fontSize: 13 }}>
                    Upgrade to see exactly where to read this in the book.
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => router.push("/upgrade")}
                      style={{
                        border: "1px solid rgba(0,0,0,0.10)",
                        background: "rgba(17,24,39,0.92)",
                        color: "#fff",
                        borderRadius: 14,
                        padding: "10px 12px",
                        cursor: "pointer",
                        fontWeight: 900,
                        fontSize: 13,
                      }}
                    >
                      Upgrade (Lifetime)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

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
                    className="verseCard"
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

                        <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontWeight: 900 }}>{item.ref}</div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                       <button
  type="button"
  onClick={() => toggleFavorite(key)}
  style={miniBtn}
  title={isFav ? "Saved" : "Save this verse"}
  aria-label={isFav ? "Saved" : "Save this verse"}
>
  {isFav ? "★" : "☆"}
</button>

                        <button
                          type="button"
                          onClick={() => handleCopy(item as VerseItem, key)}
                          style={{ ...miniBtn, fontSize: 12 }}
                          title="Copy verse"
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
<button
  type="button"
  onClick={() => handleShare(item, key)
  style={{ ...miniBtn, fontSize: 12 }}
  title="Share this verse"
>
  Share
</button>
                    {/* Micro-prompt */}
                    <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontWeight: 800 }}>
                      Save this. Sit with it. Apply it today.
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Premium micro-animation */}
          <style jsx global>{`
            @keyframes pulseGlow {
              0% {
                box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
              }
              50% {
                box-shadow: 0 18px 44px rgba(99, 102, 241, 0.18);
              }
              100% {
                box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
              }
            }
            .verseCard {
              animation: fadeInUp 180ms ease both;
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(6px);
              }
              to {
                opacity: 1;
                transform: translateY(0px);
              }
            }
          `}</style>
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
