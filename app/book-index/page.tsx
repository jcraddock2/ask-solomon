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

{ topic:"leadership", label:"Leadership", pages:"42–46", chapters:["The Power of Counsel","Leading with Wisdom"], summary:"Great leadership begins with humility, wisdom, and seeking counsel."},

{ topic:"counsel", label:"Seeking Counsel", pages:"42–46", chapters:["The Power of Counsel"], summary:"Solomon teaches that wise people seek many counselors before major decisions."},

{ topic:"discipline", label:"Discipline", pages:"54–58", chapters:["The Path of Discipline"], summary:"Discipline builds the structure that allows wisdom and success to grow."},

{ topic:"decision", label:"Decision Making", pages:"60–64", chapters:["Wisdom in Decisions"], summary:"Wise decisions require patience, counsel, and clarity of purpose."},

{ topic:"integrity", label:"Integrity", pages:"66–70", chapters:["The Integrity Advantage"], summary:"Integrity protects your reputation and future."},

{ topic:"diligence", label:"Diligence", pages:"72–76", chapters:["The Diligent Path"], summary:"Consistent effort produces success over time."},

{ topic:"fear", label:"Overcoming Fear", pages:"77–80", chapters:["Courage Over Fear"], summary:"Fear shrinks when wisdom and faith grow."},

{ topic:"confidence", label:"Confidence", pages:"80–82", chapters:["Confidence Through Wisdom"], summary:"Confidence grows from wisdom, not arrogance."},

{ topic:"speech", label:"Power of Words", pages:"120–124", chapters:["The Power of Words"], summary:"Words can build lives or destroy them."},

{ topic:"anger", label:"Managing Anger", pages:"126–128", chapters:["Slow to Anger"], summary:"Solomon teaches that self-control is a mark of wisdom."},

{ topic:"money", label:"Money & Wealth", pages:"88–92", chapters:["Wealth and Stewardship"], summary:"Wealth grows through diligence and stewardship."},

{ topic:"stewardship", label:"Stewardship", pages:"92–96", chapters:["Managing Resources"], summary:"Success requires responsible stewardship of resources."},

{ topic:"work", label:"Work Ethic", pages:"96–100", chapters:["The Reward of Work"], summary:"Hard work produces results that laziness never will."},

{ topic:"planning", label:"Planning", pages:"102–104", chapters:["Planning with Wisdom"], summary:"Plans succeed through wise counsel."},

{ topic:"pride", label:"Pride vs Humility", pages:"106–110", chapters:["The Danger of Pride"], summary:"Pride leads to downfall while humility opens doors."},

{ topic:"humility", label:"Humility", pages:"110–114", chapters:["The Strength of Humility"], summary:"Humility attracts wisdom and favor."},

{ topic:"relationships", label:"Relationships", pages:"130–134", chapters:["Healthy Relationships"], summary:"Healthy relationships require wisdom, patience, and honesty."},

{ topic:"friendship", label:"Friendship", pages:"134–136", chapters:["True Friends"], summary:"Choose friends who sharpen and strengthen you."},

{ topic:"conflict", label:"Conflict Resolution", pages:"138–140", chapters:["Resolving Conflict"], summary:"Wise people calm conflict rather than inflame it."},

{ topic:"patience", label:"Patience", pages:"140–142", chapters:["The Power of Patience"], summary:"Patience produces long-term success."},

{ topic:"focus", label:"Focus", pages:"144–146", chapters:["Focused Wisdom"], summary:"Wisdom helps eliminate distraction and pursue purpose."},

{ topic:"purpose", label:"Purpose", pages:"146–150", chapters:["Walking in Purpose"], summary:"Purpose clarifies decisions and direction."},

{ topic:"wisdom", label:"Wisdom", pages:"1–10", chapters:["The Foundation of Wisdom"], summary:"Wisdom is the principal thing."},

{ topic:"foolishness", label:"Avoiding Foolishness", pages:"10–14", chapters:["The Path of Folly"], summary:"Solomon warns that foolish choices destroy opportunity."},

{ topic:"justice", label:"Justice", pages:"150–154", chapters:["Justice and Leadership"], summary:"Leaders must pursue justice and fairness."},

{ topic:"influence", label:"Influence", pages:"154–158", chapters:["Influence with Wisdom"], summary:"Influence grows when wisdom guides actions."},

{ topic:"mentorship", label:"Mentorship", pages:"158–162", chapters:["Learning from the Wise"], summary:"Wise mentors accelerate growth."},

{ topic:"character", label:"Character", pages:"162–166", chapters:["Building Character"], summary:"Character determines the trajectory of success."},

{ topic:"reputation", label:"Reputation", pages:"166–170", chapters:["Guard Your Reputation"], summary:"A good name is more valuable than riches."},

{ topic:"success", label:"Success Principles", pages:"170–176", chapters:["Secrets of Success"], summary:"Success is the product of wisdom, diligence, and integrity."}

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
