"use client";

import { useMemo, useState } from "react";

type Verse = {
  ref: string;
  text: string;
  tags: Array<"encouragement" | "finances" | "wisdom">;
};

const VERSES: Verse[] = [
  {
    ref: "Proverbs 3:5–6",
    text:
      "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight.",
    tags: ["encouragement", "wisdom"],
  },
  {
    ref: "Proverbs 16:3",
    text: "Commit to the LORD whatever you do, and He will establish your plans.",
    tags: ["encouragement", "wisdom"],
  },
  {
    ref: "Proverbs 10:4",
    text: "Lazy hands make for poverty, but diligent hands bring wealth.",
    tags: ["finances", "wisdom"],
  },
  {
    ref: "Proverbs 21:5",
    text:
      "The plans of the diligent lead surely to profit, but everyone who is hasty comes only to poverty.",
    tags: ["finances", "wisdom"],
  },
  {
    ref: "Proverbs 15:1",
    text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    tags: ["wisdom"],
  },
];

export default function Page() {
  const [mode, setMode] = useState<"all" | "encouragement" | "finances" | "wisdom">("all");
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
    <main style={{ maxWidth: 820, margin: "0 auto", padding: 20 }}>
      <h1>Ask Solomon</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={() => setMode("encouragement")}>Encourage Me</button>
        <button onClick={() => setMode("finances")}>Help Me Financially</button>
        <button onClick={() => setMode("wisdom")}>Give Me Wisdom</button>
        <button onClick={() => setMode("all")}>Show All</button>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        style={{ width: "100%", padding: 10, marginBottom: 16 }}
      />

      {filtered.map((v) => (
        <div key={v.ref} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <strong>{v.ref}</strong>
          <p>{v.text}</p>
        </div>
      ))}
    </main>
  );
}
