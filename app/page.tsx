"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isProUser } from "./lib/access"; // adjust ONLY if your path differs

type Mode = "encouragement" | "wisdom" | "success";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

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

function PageInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [mode, setMode] = useState<Mode>("encouragement");
  const [sub, setSub] = useState<Sub | "all">("all");
  const [q, setQ] = useState("");
  const [isPro, setIsPro] = useState(false);

  // ---- styles (design v1 live + app-like cards) ----
  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f4f5f7",
    padding: 18,
  };

  const pageStyle: React.CSSProperties = {
    maxWidth: 860,
    margin: "0 auto",
    padding: 18,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 16px 44px rgba(0,0,0,0.07)",
    padding: 18,
  };

  const softCardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 16,
  };

const pillBtnBase: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 650,
  fontSize: 14,
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  transition: "all 140ms ease",
}; 

  const premiumBtnStyle: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#111",
    color: "#fff",
    fontWeight: 800,
    boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
    cursor: "pointer",
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
  };

  // ---- URL helper (safe) ----
  const setUrl = (next: { mode?: Mode; sub?: Sub | "all"; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const p = new URLSearchParams();

    if (nextMode !== "encouragement") p.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") p.set("sub", nextSub);
    if (nextQ.trim().length > 0) p.set("q", nextQ.trim());

    const qs = p.toString();
    router.replace(qs ? `/?${qs}` : `/`);
  };

  // ---- init from URL + pro state ----
  useEffect(() => {
    setIsPro(isProUser());

    const m = (params.get("mode") as Mode) || "encouragement";
    const s = (params.get("sub") as Sub) || "all";
    const qq = params.get("q") || "";

    const safeMode: Mode =
      m === "encouragement" || m === "wisdom" || m === "success" ? m : "encouragement";

    const safeSub: Sub | "all" =
      s === "peace" || s === "strength" || s === "direction" || s === "confidence" || s === "hope"
        ? s
        : "all";

    setMode(safeMode);
    setSub(safeMode === "encouragement" ? safeSub : "all");
    setQ(qq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- filtered results ----
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return DATA.filter((item) => {
      if (item.mode !== mode) return false;
      if (mode === "encouragement" && sub !== "all" && item.sub !== sub) return false;

      if (!needle) return true;
      const hay = `${item.title} ${item.body} ${item.ref}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [mode, sub, q]);

  const subButtons: { label: string; value: Sub }[] = [
    { label: "Peace", value: "peace" },
    { label: "Strength", value: "strength" },
    { label: "Direction", value: "direction" },
    { label: "Confidence", value: "confidence" },
    { label: "Hope", value: "hope" },
  ];

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        {/* HEADER */}
        <header style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div>
            <h1
  style={{
    margin: 0,
    fontSize: 38,
    letterSpacing: "-0.8px",
    lineHeight: 1.05,
    fontWeight: 800,
  }}
>
  Ask Solomon
</h1> 
              <p
               style={{
  marginTop: 8,
  marginBottom: 0,
  color: "#555",
  fontSize: 16,
  lineHeight: 1.55,
  maxWidth: 620,
}}
              >
                Encouragement first—wisdom from Proverbs for what you’re facing right now.
              </p>
            </div>

            {!isPro ? (
              <button
                style={premiumBtnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.transform = "translateY(-1px)";
                  (e.currentTarget as any).style.boxShadow = "0 10px 24px rgba(0,0,0,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.transform = "translateY(0px)";
                  (e.currentTarget as any).style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
                }}
                onClick={() => router.push("/upgrade")}
              >
                Premium
              </button>
            ) : (
              <div style={{ fontSize: 13, fontWeight: 750, color: "#111", paddingTop: 6 }}>
                ✅ Pro Active
              </div>
            )}
          </div>
        </header>

        {/* MAIN CARD */}
        <section style={cardStyle}>
          {/* MODE BUTTONS */}
 <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
  <button
    style={{
      ...pillBtnBase,
      background: mode === "encouragement" ? "#111" : "#fff",
      color: mode === "encouragement" ? "#fff" : "#111",
      boxShadow:
        mode === "encouragement"
          ? "0 6px 16px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.04)",
    }}
    onClick={() => {
      setMode("encouragement");
      setSub("all");
      setUrl({ mode: "encouragement", sub: "all" });
    }}
  >
    Encourage Me
  </button>

  <button
    style={{
      ...pillBtnBase,
      background: mode === "wisdom" ? "#111" : "#fff",
      color: mode === "wisdom" ? "#fff" : "#111",
      boxShadow:
        mode === "wisdom"
          ? "0 6px 16px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.04)",
    }}
    onClick={() => {
      setMode("wisdom");
      setSub("all");
      setUrl({ mode: "wisdom", sub: "all" });
    }}
  >
    Wisdom
  </button>

  <button
    style={{
      ...pillBtnBase,
      background: mode === "success" ? "#111" : "#fff",
      color: mode === "success" ? "#fff" : "#111",
      boxShadow:
        mode === "success"
          ? "0 6px 16px rgba(0,0,0,0.15)"
          : "0 2px 6px rgba(0,0,0,0.04)",
    }}
    onClick={() => {
      setMode("success");
      setSub("all");
      setUrl({ mode: "success", sub: "all" });
    }}
  >
    Success
  </button>

  <button
    style={{ ...pillBtnBase, marginLeft: "auto" }}
    onClick={() => router.push("/book")}
    title="Book page"
  >
    Book
  </button>
</div>

          {/* SUB BUTTONS */}
          {mode === "encouragement" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <button
                style={{
                  ...pillBtnBase,
                  background: sub === "all" ? "#111" : "#fff",
                  color: sub === "all" ? "#fff" : "#111",
                }}
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
                  style={{
                    ...pillBtnBase,
                    background: sub === b.value ? "#111" : "#fff",
                    color: sub === b.value ? "#fff" : "#111",
                  }}
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
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setUrl({ q });
              }}
              placeholder="Search keywords (press Enter)…"
              style={{
                flex: "1 1 320px",
                padding: "12px 12px",
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.12)",
                outline: "none",
                fontSize: 14,
              }}
            />

            <button
              style={{
                ...pillBtnBase,
                padding: "12px 14px",
                borderRadius: 14,
              }}
              onClick={() => setUrl({ q })}
            >
              Search
            </button>

            <button
              style={{
                ...pillBtnBase,
                padding: "12px 14px",
                borderRadius: 14,
                opacity: q.trim().length ? 1 : 0.6,
              }}
              onClick={() => {
                setQ("");
                setUrl({ q: "" });
              }}
              disabled={!q.trim().length}
            >
              Clear
            </button>
          </div>

          {/* RESULTS */}
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
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.2px" }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#666", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                      {item.ref}
                    </div>
                  </div>
                  <p style={{ marginTop: 8, marginBottom: 0, color: "#333", lineHeight: 1.55, fontSize: 14 }}>
                    {item.body}
                  </p>
                </article>
              ))
            )}
          </div>

          <div style={{ marginTop: 14, color: "#777", fontSize: 12, lineHeight: 1.4 }}>
            Tip: Use the mode buttons + sub-buttons, then search within that view.
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
