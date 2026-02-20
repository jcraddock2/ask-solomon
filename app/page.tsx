"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "all" | "encouragement" | "finances" | "wisdom";
type Sub = "peace" | "strength" | "direction" | "confidence" | "hope";

type Verse = {
  ref: string;
  text: string;
  tags: Array<"encouragement" | "finances" | "wisdom">;
  sub?: Sub;
};

const VERSES: Verse[] = [
  // ENCOURAGEMENT
  {
    ref: "Proverbs 3:5–6",
    text:
      "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight.",
    tags: ["encouragement"],
    sub: "direction",
  },
  {
    ref: "Proverbs 18:10",
    text: "The name of the LORD is a strong tower; the righteous run to it and are safe.",
    tags: ["encouragement"],
    sub: "strength",
  },
  {
    ref: "Proverbs 16:24",
    text: "Gracious words are a honeycomb, sweet to the soul and healing to the bones.",
    tags: ["encouragement"],
    sub: "peace",
  },
  {
    ref: "Proverbs 12:25",
    text: "Anxiety weighs down the heart, but a kind word cheers it up.",
    tags: ["encouragement"],
    sub: "peace",
  },
  {
    ref: "Proverbs 4:23",
    text: "Above all else, guard your heart, for everything you do flows from it.",
    tags: ["encouragement"],
    sub: "confidence",
  },

  // FINANCES
  {
    ref: "Proverbs 21:5",
    text:
      "The plans of the diligent lead surely to profit, but everyone who is hasty comes only to poverty.",
    tags: ["finances"],
  },
  {
    ref: "Proverbs 10:4",
    text: "Lazy hands make for poverty, but diligent hands bring wealth.",
    tags: ["finances"],
  },

  // WISDOM
  {
    ref: "Proverbs 15:1",
    text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    tags: ["wisdom"],
  },
];

const VALID_MODES: Mode[] = ["all", "encouragement", "finances", "wisdom"];
const VALID_SUBS: Array<Sub | "all"> = ["all", "peace", "strength", "direction", "confidence", "hope"];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<Mode>("encouragement");
  const [sub, setSub] = useState<Sub | "all">("all");
  const [q, setQ] = useState("");

  // Button styles
  const pillBase: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#f2f2f2",
    color: "#111",
    cursor: "pointer",
  };

  const pillActive: React.CSSProperties = {
    ...pillBase,
    background: "#111",
    color: "#fff",
    border: "1px solid #111",
  };

  // Write state -> URL (shareable)
  const setUrl = (next: { mode?: Mode; sub?: Sub | "all"; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const params = new URLSearchParams();

    // keep URL short: only write non-defaults
    if (nextMode !== "encouragement") params.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") params.set("sub", nextSub);
    if (nextQ.trim().length > 0) params.set("q", nextQ.trim());

    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : `/`);
  };

  // Read URL -> state (refresh/share loads same filters)
  useEffect(() => {
    const rawMode = (searchParams.get("mode") ?? "encouragement") as Mode;
    const rawSub = (searchParams.get("sub") ?? "all") as Sub | "all";
    const rawQ = searchParams.get("q") ?? "";

    const nextMode: Mode = VALID_MODES.includes(rawMode) ? rawMode : "encouragement";
    const nextSub: Sub | "all" = VALID_SUBS.includes(rawSub) ? rawSub : "all";

    setMode(nextMode);
    setSub(nextMode === "encouragement" ? nextSub : "all");
    setQ(rawQ);
  }, [searchParams]);

  const pickMode = (m: Mode) => {
    setMode(m);
    setSub("all");
    setUrl({ mode: m, sub: "all" });
  };

  const pickSub = (s: Sub | "all") => {
    setSub(s);
    setUrl({ mode, sub: s });
  };

  const onQueryChange = (val: string) => {
    setQ(val);
    setUrl({ q: val });
  };

 const filtered = useMemo(() => {
  const query = q.trim().toLowerCase();

  return VERSES.filter((v) => {
    const modeOk = mode === "all" ? true : v.tags.includes(mode);

    const subOk =
      mode !== "encouragement" || sub === "all"
        ? true
        : v.sub === sub;

    const queryOk =
      query.length === 0
        ? true
        : (v.ref + " " + v.text).toLowerCase().includes(query);

    return modeOk && subOk && queryOk;
  });
}, [mode, sub, q]);


  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 34 }}>Ask Solomon</h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Encouragement first—wisdom from Proverbs for what you’re facing right now.
        </p>
      </header>

      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <input
          value={q}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by word or reference..."
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 14,
            border: "1px solid #ddd",
            fontSize: 16,
            outline: "none",
          }}
        />
      </div>

      {/* Mode buttons */}
      <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <button onClick={() => pickMode("encouragement")} style={mode === "encouragement" ? pillActive : pillBase}>
          Encourage Me
        </button>
        <button onClick={() => pickMode("finances")} style={mode === "finances" ? pillActive : pillBase}>
          Help Me Financially
        </button>
        <button onClick={() => pickMode("wisdom")} style={mode === "wisdom" ? pillActive : pillBase}>
          Give Me Wisdom
        </button>
        <button onClick={() => pickMode("all")} style={mode === "all" ? pillActive : pillBase}>
          Show All
        </button>
      </section>

      {/* Clear sub pill */}
      {mode === "encouragement" && sub !== "all" && (
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => pickSub("all")} style={pillBase}>
            Clear: {sub}
          </button>
        </div>
      )}

      {/* Sub buttons */}
      {mode === "encouragement" && (
        <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <button onClick={() => pickSub("all")} style={sub === "all" ? pillActive : pillBase}>
            All Encouragement
          </button>
          <button onClick={() => pickSub("peace")} style={sub === "peace" ? pillActive : pillBase}>
            Peace
          </button>
          <button onClick={() => pickSub("strength")} style={sub === "strength" ? pillActive : pillBase}>
            Strength
          </button>
          <button onClick={() => pickSub("direction")} style={sub === "direction" ? pillActive : pillBase}>
            Direction
          </button>
          <button onClick={() => pickSub("confidence")} style={sub === "confidence" ? pillActive : pillBase}>
            Confidence
          </button>
          <button onClick={() => pickSub("hope")} style={sub === "hope" ? pillActive : pillBase}>
            Hope
          </button>
        </section>
      )}

      {/* Results */}
      <section style={{ display: "grid", gap: 12 }}>
        {filtered.map((v) => (
          <article
            key={v.ref}
            style={{
              padding: 16,
              borderRadius: 16,
              border: "1px solid #eee",
              background: "#fff",
            }}
          >
            <strong style={{ fontSize: 14 }}>{v.ref}</strong>
            <p style={{ marginTop: 10, marginBottom: 0, lineHeight: 1.55, fontSize: 16 }}>
              {v.text}
            </p>
          </article>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: 16, border: "1px dashed #bbb", borderRadius: 12, color: "#444" }}>
            No matches. Try a different word.
          </div>
        )}
      </section>
    </main>
  );
}
