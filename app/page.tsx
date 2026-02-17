"use client";

import { useMemo, useState } from "react";

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
  const [mode, setMode] = useState<"all" | "encouragement" | "finances" | "wisdom">("encouragement");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return VERSES.filter((v) => {
      const matchesMode = mode === "all" ? true : v.tags.includes(mode);
      const matchesQuery =
        query.length === 0 ? true : (v.ref + " " + v.text).toLowerCase().includes(query);
      return matchesMode && matchesQuery;
    });
  }, [mode, q]);

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 34 }}>Ask Solomon</h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Encouragement first—wisdom from Proverbs for what you’re facing right now.
        </p>
      </header>

      <section style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <button onClick={() => setMode("encouragement")}>Encourage Me</button>
        <button onClick={() => setMode("finances")}>Help Me Financially</button>
        <button onClick={() => setMode("wisdom")}>Give Me Wisdom</button>
        <button onClick={() => setMode("all")}>Show All</button>
      </section>

      <section style={{ marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search… (fear, anxiety, money, discipline, plans)"
          style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd", fontSize: 16 }}
        />
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        {filtered.map((v) => (
          <article key={v.ref} style={{ padding: 16, borderRadius: 16, border: "1px solid #eee", background: "#fff" }}>
            <strong style={{ fontSize: 14 }}>{v.ref}</strong>
            <p style={{ marginTop: 10, marginBottom: 0, lineHeight: 1.55, fontSize: 16 }}>{v.text}</p>
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
