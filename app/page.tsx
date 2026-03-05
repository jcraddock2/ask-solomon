// app/page.tsx
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

  // URL → initial state
  const urlMode = (sp.get("mode") as Mode) || "encouragement";
  const urlSub = ((sp.get("sub") as Sub) || "all") as Sub | "all";
  const urlQ = sp.get("q") || "";

  const [mode, setMode] = useState<Mode>(urlMode);
  const [sub, setSub] = useState<Sub | "all">(urlSub);
  const [q, setQ] = useState<string>(urlQ);

  const [isPro, setIsPro] = useState(false);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState<Record<string, boolean>>({});

  const [copiedKey, setCopiedKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");
  const [favPulse, setFavPulse] = useState(false);

  const [todayFocusOn, setTodayFocusOn] = useState(false);
  const [todayFocusKey, setTodayFocusKey] = useState<string>("");

  const [hoverKey, setHoverKey] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState(false);

  // ----- STYLES -----
  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.20), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(16,185,129,0.12), transparent 55%), #f8fafc",
    padding: 18,
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
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
    userSelect: "none",
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
    userSelect: "none",
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
    userSelect: "none",
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

  // ----- PRO detection -----
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
    const m = (sp.get("mode") as Mode) || "encouragement";
    const s = ((sp.get("sub") as Sub) || "all") as Sub | "all";
    const qq = sp.get("q") || "";

    setMode(m);
    setSub(s);
    setQ(qq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const favoritesCount = useMemo(
    () => Object.keys(favoriteKeys).filter((k) => favoriteKeys[k]).length,
    [favoriteKeys]
  );

  // Favorites count "pop"
  useEffect(() => {
    setFavPulse(true);
    const t = window.setTimeout(() => setFavPulse(false), 260);
    return () => window.clearTimeout(t);
  }, [favoritesCount]);

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((prev) => {
      const next = { ...prev };
      const wasSaved = !!next[key];

      if (wasSaved) {
        delete next[key];

        // ✅ If user is in Favorites-only view and this was the last favorite, auto-exit
        const remaining = Object.keys(next).filter((k) => next[k]).length;
        if (favoritesOnly && remaining === 0) {
          setFavoritesOnly(false);
        }
      } else {
        next[key] = true;
        setSavedKey(key);
        window.setTimeout(() => setSavedKey(""), 900);
      }

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
      // silent
    }
  };

  const buildShareText = (item: VerseItem) => {
    const link = typeof window !== "undefined" ? window.location.href : "";
    return `${item.title}\n\n${item.body}\n\n${item.ref}\n\n— Ask Solomon\n${link}`;
  };

  const handleShare = async (item: VerseItem, keyForUi?: string) => {
    const text = buildShareText(item);

    // Try native share first (mobile)
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
  
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(/\s+/);
    let line = "";
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line ? `${line} ${words[n]}` : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }

    if (line) lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * lineHeight);
    }

    return lines.length;
  };

  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImage = async (item: VerseItem) => {
    try {
      const W = 1080;
      const H = 1350;

      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      const pad = 90;
      const maxWidth = W - pad * 2;

      ctx.fillStyle = "#111";
      ctx.font = "900 54px system-ui";
      ctx.fillText("Ask Solomon", pad, 150);

      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fillRect(pad, 190, maxWidth, 2);

      ctx.fillStyle = "#111";
      ctx.font = "650 44px system-ui";

      const verse = item.body.trim();

      let y = 310;

      const linesUsed = wrapText(ctx, verse, pad, y, maxWidth, 60);

      y += linesUsed * 60 + 40;

      ctx.fillStyle = "#334155";
      ctx.font = "900 38px system-ui";
      ctx.fillText(item.ref, pad, y);

      ctx.fillStyle = "#111";
      ctx.font = "900 32px system-ui";
      ctx.fillText("Success Secrets of Solomon", pad, H - 120);

      const dataUrl = canvas.toDataURL("image/png");

      downloadDataUrl(dataUrl, "ask-solomon.png");
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

  // ✅ FIX: reliable toggle + auto pick
  const toggleTodaysFocus = () => {
    const next = !todayFocusOn;
    setTodayFocusOn(next);

    if (!next) {
      setTodayFocusKey("");
      return;
    }

    // turning ON → pick immediately
    setTimeout(() => rerollTodaysFocus(), 0);
  };

  // ✅ FIX: safety reroll when filters change (prevents blank focus)
  useEffect(() => {
    if (!todayFocusOn) return;

    const pool = buildFilteredPool();

    if (pool.length === 0) {
      setTodayFocusKey("");
      return;
    }

    if (!todayFocusKey) {
      rerollTodaysFocus();
      return;
    }

    const exists = pool.some((d) => `${d.ref}-${d.title}` === todayFocusKey);
    if (!exists) rerollTodaysFocus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayFocusOn, mode, sub, q, favoritesOnly, favoriteKeys]);

  const renderEmptyState = () => {
    if (favoritesOnly && favoritesCount === 0) {
      return (
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 16,
            padding: 14,
            boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 14, color: "#111" }}>⭐ Build your Favorites Library</div>

          <div style={{ marginTop: 6, color: "#334155", fontWeight: 800, fontSize: 13 }}>
            Tap ☆ on any verse to save it. Then you can switch to Favorites anytime.
          </div>

          <div style={{ marginTop: 10, color: "#64748b", fontWeight: 900, fontSize: 12 }}>
            Tip: Save the verses you want to read again tomorrow.
          </div>
        </div>
      );
    }

    if (todayFocusOn && !todayFocusKey) {
      return (
        <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
          No matches for Today’s Focus. Try turning off Favorites or clearing search.
        </div>
      );
    }

    return (
      <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
        No matches. Try a different keyword.
      </div>
    );
  };

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
                style={{
                  ...pillBtn(favoritesOnly),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  transform: favPulse ? "scale(1.05)" : "scale(1)",
                  transition: "transform 160ms ease",
                }}
                title="Show only saved favorites"
              >
                <span>⭐</span>
                <span>
                  {favoritesOnly ? `Showing Favorites (${favoritesCount})` : `Favorites (${favoritesCount})`}
                </span>
              </button>

              {/* TODAY'S FOCUS */}
              <button
                type="button"
                onClick={toggleTodaysFocus}
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
                <span>{todayFocusOn ? "Today’s Focus (On)" : "Today’s Focus"}</span>
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
                  onClick={() => rerollTodaysFocus()}
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

          {/* SOLOMON'S NOTE */}
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

          {/* TODAY'S FOCUS HEADLINE */}
          {todayFocusOn && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 900,
                marginBottom: 8,
                color: "#6366f1",
                letterSpacing: ".02em",
              }}
            >
              ✨ Today’s Focus
            </div>
          )}

          {/* RESULTS GRID */}
          <div style={{ display: "grid", gap: 12 }}>
            {results.length === 0 ? (
              renderEmptyState()
            ) : (
              results.map((item) => {
                const key = `${item.ref}-${item.title}`;
                const isFav = !!favoriteKeys[key];
                const isCopied = copiedKey === key;
                const isSavedFlash = savedKey === key;
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

                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 12,
                            color: "#64748b",
                            fontWeight: 700,
                          }}
                        >
                          Save this. Sit with it. Apply it today.
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
                          onClick={() => handleCopy(item, key)}
                          style={{ ...miniBtn, fontSize: 12 }}
                          title="Copy verse"
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(item, key)}
                          style={{ ...miniBtn, fontSize: 12 }}
                          title="Share this verse"
                        >
                          Share
                        </button>
                        <button
  type="button"
  onClick={() => handleImage(item)}
  style={{ ...miniBtn, fontSize: 12 }}
  title="Create share image"
>
  Image
</button>
                      </div>
                    </div>

                    {isSavedFlash && (
                      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 900, color: "#111" }}>
                        ✅ Saved to Favorites
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Premium micro-animation */}
          <style jsx global>{`
            @keyframes pulseGlow {
              0% { box-shadow: 0 14px 30px rgba(0,0,0,0.16); }
              50% { box-shadow: 0 18px 44px rgba(99,102,241,0.18); }
              100% { box-shadow: 0 14px 30px rgba(0,0,0,0.16); }
            }
            .verseCard {
              animation: fadeInUp 180ms ease both;
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0px); }
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
