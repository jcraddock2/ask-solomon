"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Topic = {
  topic: string;
  label: string;
  pages: string;
  chapters: string[];
  summary: string;
};

const TOPIC_INDEX: Topic[] = [
  { topic: "wisdom", label: "Wisdom", pages: "1–10", chapters: ["The Foundation of Wisdom"], summary: "Wisdom is the principal thing — get it above all else." },
  { topic: "foolishness", label: "Avoiding Foolishness", pages: "10–14", chapters: ["The Path of Folly"], summary: "Solomon warns that foolish choices destroy opportunity and reputation." },
  { topic: "leadership", label: "Leadership", pages: "42–46", chapters: ["The Power of Counsel", "Leading with Wisdom"], summary: "Great leadership begins with humility, wisdom, and seeking counsel." },
  { topic: "counsel", label: "Seeking Counsel", pages: "42–46", chapters: ["The Power of Counsel"], summary: "Wise people seek many counselors before major decisions." },
  { topic: "discipline", label: "Discipline", pages: "54–58", chapters: ["The Path of Discipline"], summary: "Discipline builds the structure that allows wisdom and success to grow." },
  { topic: "decision", label: "Decision Making", pages: "60–64", chapters: ["Wisdom in Decisions"], summary: "Wise decisions require patience, counsel, and clarity of purpose." },
  { topic: "integrity", label: "Integrity", pages: "66–70", chapters: ["The Integrity Advantage"], summary: "Integrity protects your reputation and future — nothing replaces it." },
  { topic: "diligence", label: "Diligence", pages: "72–76", chapters: ["The Diligent Path"], summary: "Consistent effort produces success over time. Laziness leads nowhere." },
  { topic: "fear", label: "Overcoming Fear", pages: "77–80", chapters: ["Courage Over Fear"], summary: "Fear shrinks when wisdom and faith grow. Courage is a choice." },
  { topic: "confidence", label: "Confidence", pages: "80–82", chapters: ["Confidence Through Wisdom"], summary: "Confidence grows from wisdom and faithful action, not from waiting to feel ready." },
  { topic: "money", label: "Money & Wealth", pages: "88–92", chapters: ["Wealth and Stewardship"], summary: "Wealth grows through diligence, stewardship, and integrity — not shortcuts." },
  { topic: "stewardship", label: "Stewardship", pages: "92–96", chapters: ["Managing Resources"], summary: "Success requires responsible stewardship of what you have been given." },
  { topic: "work", label: "Work Ethic", pages: "96–100", chapters: ["The Reward of Work"], summary: "Hard work produces results that laziness never will." },
  { topic: "planning", label: "Planning", pages: "102–104", chapters: ["Planning with Wisdom"], summary: "Plans succeed when rooted in wise counsel and honest preparation." },
  { topic: "pride", label: "Pride vs Humility", pages: "106–114", chapters: ["The Danger of Pride", "The Strength of Humility"], summary: "Pride leads to downfall while humility opens doors and attracts wisdom." },
  { topic: "humility", label: "Humility", pages: "110–114", chapters: ["The Strength of Humility"], summary: "Humility is not weakness — it is the posture that allows favor to flow." },
  { topic: "speech", label: "Power of Words", pages: "120–124", chapters: ["The Power of Words"], summary: "Words can build lives or destroy them. Guard your tongue carefully." },
  { topic: "anger", label: "Managing Anger", pages: "126–128", chapters: ["Slow to Anger"], summary: "Self-control in anger is one of the clearest marks of wisdom." },
  { topic: "relationships", label: "Relationships", pages: "130–134", chapters: ["Healthy Relationships"], summary: "Healthy relationships require wisdom, patience, honesty, and boundaries." },
  { topic: "friendship", label: "Friendship", pages: "134–136", chapters: ["True Friends"], summary: "Choose friends who sharpen and strengthen you — not those who drain you." },
  { topic: "conflict", label: "Conflict Resolution", pages: "138–140", chapters: ["Resolving Conflict"], summary: "Wise people calm conflict rather than inflame it." },
  { topic: "patience", label: "Patience", pages: "140–142", chapters: ["The Power of Patience"], summary: "Patience produces long-term success that impatience destroys." },
  { topic: "focus", label: "Focus", pages: "144–146", chapters: ["Focused Wisdom"], summary: "Wisdom helps eliminate distraction and keeps you on the right path." },
  { topic: "purpose", label: "Purpose", pages: "146–150", chapters: ["Walking in Purpose"], summary: "Purpose clarifies decisions, motivates sacrifice, and gives life direction." },
  { topic: "justice", label: "Justice", pages: "150–154", chapters: ["Justice and Leadership"], summary: "Leaders who pursue justice earn lasting respect and influence." },
  { topic: "influence", label: "Influence", pages: "154–158", chapters: ["Influence with Wisdom"], summary: "Influence grows when wisdom guides your actions and relationships." },
  { topic: "mentorship", label: "Mentorship", pages: "158–162", chapters: ["Learning from the Wise"], summary: "Wise mentors accelerate growth and help you avoid costly mistakes." },
  { topic: "character", label: "Character", pages: "162–166", chapters: ["Building Character"], summary: "Character is the foundation everything else rests on — protect it." },
  { topic: "reputation", label: "Reputation", pages: "166–170", chapters: ["Guard Your Reputation"], summary: "A good name is more valuable than great riches." },
  { topic: "success", label: "Success Principles", pages: "170–176", chapters: ["Secrets of Success"], summary: "Success built on wisdom, diligence, and integrity is lasting." },
  { topic: "vision", label: "Vision & Purpose", pages: "57–67", chapters: ["Living by Design vs. Default", "Why People Fail"], summary: "Where there is no vision the people perish — Proverbs 29:18. A deliberate mental picture of your future changes every decision you make." },
  { topic: "why-people-fail", label: "Why People Fail", pages: "54–60", chapters: ["Why People Fail"], summary: "People fail because of drifting, desire without diligence, refusing correction, or fear. Every cause is fixable." },
  { topic: "contentment", label: "Contentment and Lack", pages: "224–230", chapters: ["Contentment and Balance"], summary: "The eye is never satisfied with seeing. Emptiness is a signal pointing toward what possessions were never designed to fill." },
  { topic: "unmet-needs", label: "Unmet Needs", pages: "210–218", chapters: ["The Hungry Soul"], summary: "To the hungry soul even bitter things are sweet. Unmet needs drive decisions that bypass wisdom." },
];

export default function BookIndex() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? TOPIC_INDEX.filter((t) => {
        const s = search.toLowerCase();
        return (
          t.label.toLowerCase().includes(s) ||
          t.topic.toLowerCase().includes(s) ||
          t.summary.toLowerCase().includes(s) ||
          t.chapters.some((c) => c.toLowerCase().includes(s))
        );
      })
    : TOPIC_INDEX;

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 13,
            color: "#374151",
            marginBottom: 16,
          }}
        >
          ← Back to Ask Solomon
        </button>
      </div>

      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 6, color: "#0f172a" }}>
        📖 Book Topic Index
      </h1>
      <p style={{ color: "#64748b", marginBottom: 20, fontSize: 15 }}>
        Find where wisdom topics appear in{" "}
        <strong>Success Secrets of Solomon</strong>.
      </p>

      {/* Search Filter */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search topics, e.g. anger, money, leadership..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: 15,
            borderRadius: 12,
            border: "1px solid rgba(99,102,241,0.3)",
            outline: "none",
            boxSizing: "border-box",
            background: "rgba(99,102,241,0.04)",
            color: "#1e293b",
            fontFamily: "inherit",
          }}
        />
        {search.trim() && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#6366f1", fontWeight: 700 }}>
            {filtered.length === 0
              ? "No topics match that search."
              : `${filtered.length} topic${filtered.length === 1 ? "" : "s"} found`}
          </div>
        )}
      </div>

      {/* Topic Cards */}
      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map((t) => (
          <div
            key={t.topic}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 16,
              padding: "16px 20px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900, fontSize: 17, color: "#0f172a" }}>{t.label}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#6366f1",
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: 8,
                  padding: "3px 10px",
                  whiteSpace: "nowrap",
                }}
              >
                pp. {t.pages}
              </div>
            </div>

            <div style={{ marginTop: 8, color: "#374151", fontSize: 14, lineHeight: 1.55 }}>
              {t.summary}
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
              {t.chapters.join(" · ")}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && search.trim() && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#94a3b8",
            fontSize: 15,
          }}
        >
          No topics found for "{search}". Try a different keyword.
        </div>
      )}
    </main>
  );
}
