"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";


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

export default function Page() { 
 const router = useRouter();
const searchParams = useSearchParams();
 
  const [mode, setMode] = useState<"all" | "encouragement" | "finances" | "wisdom">("encouragement");
 const [sub, setSub] = useState<Sub | "all">("all");
  const [q, setQ] = useState(""); 
  useEffect(() => {
  const urlMode = (searchParams.get("mode") ?? "encouragement") as typeof mode;
  const urlSub = (searchParams.get("sub") ?? "all") as typeof sub;
  const urlQ = searchParams.get("q") ?? "";

  const validModes: Array<typeof mode> = ["all", "encouragement", "finances", "wisdom"];
  const validSubs: Array<typeof sub> = ["all", "peace", "strength", "direction", "confidence", "hope"];

  const nextMode = validModes.includes(urlMode) ? urlMode : "encouragement";
  const nextSub = validSubs.includes(urlSub) ? urlSub : "all";

  setMode(nextMode);
  setSub(nextMode === "encouragement" ? nextSub : "all");
  setQ(urlQ);
}, [searchParams]);
const setUrl = (next: { mode?: typeof mode; sub?: typeof sub; q?: string }) => {
  const nextMode = next.mode ?? mode;
  const nextSub = next.sub ?? sub;
  const nextQ = next.q ?? q;

  const params = new URLSearchParams();

  if (nextMode !== "encouragement") params.set("mode", nextMode);
  if (nextMode === "encouragement" && nextSub !== "all") params.set("sub", nextSub);
  if (nextQ.trim().length > 0) params.set("q", nextQ.trim());

  const qs = params.toString();
  router.replace(qs ? `/?${qs}` : `/`);
};

const pickMode = (m: typeof mode) => {
  setMode(m);
  setSub("all");
  setUrl({ mode: m, sub: "all" });
};

const pickMode = (m: typeof mode) => {
  setMode(m);
  setSub("all");
};

const filtered = useMemo(() => {
  const query = q.trim().toLowerCase();

  return VERSES.filter((v) => {
    const matchesMode = mode === "all" ? true : v.tags.includes(mode);

  const matchesSub = sub === "all" ? true : v.sub === sub;
 
    

    const matchesQuery =
      query.length === 0
        ? true
        : (v.ref + " " + v.text).toLowerCase().includes(query);

    return matchesMode && matchesSub && matchesQuery;
  });
}, [mode, sub, q]);
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

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 34 }}>Ask Solomon</h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Encouragement first—wisdom from Proverbs for what you’re facing right now.
        </p>
      </header>

  <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
  <button
    onClick={() => pickMode("encouragement")}
    style={mode === "encouragement" ? pillActive : pillBase}
  >
    Encourage Me
  </button>

  <button
    onClick={() => pickMode("finances")}
    style={mode === "finances" ? pillActive : pillBase}
  >
    Help Me Financially
  </button>

  <button
    onClick={() => pickMode("wisdom")}
    style={mode === "wisdom" ? pillActive : pillBase}
  >
    Give Me Wisdom
  </button>

  <button
    onClick={() => pickMode("all")}
    style={mode === "all" ? pillActive : pillBase}
  >
    Show All
  </button>
</section>

{mode === "encouragement" && sub !== "all" && (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={() => {
        setSub("all");
        setUrl({ mode, sub: "all" });
      }}
      style={pillBase}
    >
      Clear: {sub}
    </button>
  </div>
)}


    Give Me Wisdom
  </button>

  <button
    onClick={() => pickMode("all")}
    style={mode === "all" ? pillActive : pillBase}
  >
    Show All
  </button>
</section>

{mode === "encouragement" && sub !== "all" && (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={() => {
        setSub("all");
        setUrl({ mode, sub: "all" });
      }}
      style={pillBase}
    >
      Clear: {sub}
    </button>
  </div>
)}
{mode === "encouragement" && (
  <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
    <button
      onClick={() => {
        setSub("all");
        setUrl({ mode, sub: "all" });
      }}
      style={sub === "all" ? pillActive : pillBase}
    >
      All Encouragement
    </button>

    <button
      onClick={() => {
        setSub("peace");
        setUrl({ mode, sub: "peace" });
      }}
      style={sub === "peace" ? pillActive : pillBase}
    >
      Peace
    </button>

    <button
      onClick={() => {
        setSub("strength");
        setUrl({ mode, sub: "strength" });
      }}
      style={sub === "strength" ? pillActive : pillBase}
    >
      Strength
    </button>

    <button
      onClick={() => {
        setSub("direction");
        setUrl({ mode, sub: "direction" });
      }}
      style={sub === "direction" ? pillActive : pillBase}
    >
      Direction
    </button>

    <button
      onClick={() => {
        setSub("confidence");
        setUrl({ mode, sub: "confidence" });
      }}
      style={sub === "confidence" ? pillActive : pillBase}
    >
      Confidence
    </button>

    <button
      onClick={() => {
        setSub("hope");
        setUrl({ mode, sub: "hope" });
      }}
      style={sub === "hope" ? pillActive : pillBase}
    >
      Hope
    </button>
  </section>
)}

<section style={{ display: "grid", gap: 12 }}>
  {filtered.map((v) => (
    <article
      key={v.ref}
      style={{ padding: 16, borderRadius: 16, border: "1px solid #eee", background: "#fff" }}
    >
      <strong style={{ fontSize: 14 }}>{v.ref}</strong>
      <p style={{ marginTop: 10, marginBottom: 0, lineHeight: 1.55, fontSize: 16 }}>
        {v.text}
      </p>
    </article>
  ))}
</section>

         

        {filtered.length === 0 && (
          <div style={{ padding: 16, border: "1px dashed #bbb", borderRadius: 12, color: "#444" }}>
            No matches. Try a different word.
          </div>
        )}
      </section>
    </main>
  );
}
