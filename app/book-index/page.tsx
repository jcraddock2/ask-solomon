"use client";

import { useRouter } from "next/navigation";

type Topic = {
  topic: string;
  label: string;
  pages: string;
  chapters: string[];
  summary: string;
};

const TOPIC_INDEX: Topic[] = [
  {
    topic: "leadership",
    label: "Leadership",
    pages: "42–46",
    chapters: ["The Power of Counsel", "Leading with Wisdom"],
    summary: "Solomon teaches that wise leaders seek counsel and lead with humility rather than ego.",
  },
  {
    topic: "discipline",
    label: "Discipline",
    pages: "54–58",
    chapters: ["The Path of Discipline"],
    summary: "Discipline creates the structure that allows wisdom and success to grow.",
  },
  {
    topic: "wealth",
    label: "Wealth",
    pages: "88–92",
    chapters: ["Wealth and Stewardship"],
    summary: "Wealth follows diligence, wisdom, and integrity—not shortcuts.",
  },
  {
    topic: "speech",
    label: "Speech",
    pages: "120–124",
    chapters: ["The Power of Words"],
    summary: "Solomon warns that words can build life or destroy it.",
  },
  {
    topic: "integrity",
    label: "Integrity",
    pages: "66–70",
    chapters: ["The Integrity Advantage"],
    summary: "Integrity protects your future even when no one is watching.",
  },
];

export default function BookIndex() {
  const router = useRouter();

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Book Topic Index</h1>

      <p style={{ color: "#555", marginBottom: 24 }}>
        Find where wisdom topics appear inside <b>Success Secrets of Solomon</b>.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        {TOPIC_INDEX.map((t) => (
          <div
            key={t.topic}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18 }}>{t.label}</div>

            <div style={{ marginTop: 8, color: "#444", fontWeight: 600 }}>
              {t.summary}
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#64748b",
                fontWeight: 800,
              }}
            >
              Pages: {t.pages}
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                color: "#64748b",
                fontWeight: 800,
              }}
            >
              Chapters: {t.chapters.join(" • ")}
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => router.push("/book")}
                style={{
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Open Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
