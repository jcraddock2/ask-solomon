import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proverbs for Marriage — Biblical Wisdom for Relationships",
  description: "Solomon wrote about marriage, conflict, and love with unmatched honesty. Find biblical wisdom for marriage struggles, divorce, and rebuilding — search what you are facing right now.",
  keywords: ["proverbs for marriage", "biblical wisdom for marriage", "scripture for marriage problems", "proverbs about relationships", "Solomon wisdom marriage"],
  openGraph: {
    title: "Proverbs for Marriage — Ask Solomon",
    description: "Biblical wisdom for marriage struggles, conflict, and rebuilding. Search Proverbs for what you are facing.",
    url: "https://asksolomon.app/proverbs-for-marriage",
  },
};

export default function ProverbsForMarriagePage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Proverbs for Marriage
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Solomon wrote more about the quality of relationships than almost any other subject. He understood that trust, honesty, and wisdom are what hold a marriage together — and what pulls it apart when they are missing.
        </p>
        <Link
          href="/?q=my+marriage+is+struggling"
          style={{
            display: "inline-block",
            background: "#c9a227",
            color: "#0d1b2a",
            padding: "14px 28px",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          Search wisdom for your marriage now
        </Link>
      </section>

      {/* Wisdom Section */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon said about relationships</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "A wise woman builds her house, but with her own hands the foolish one tears hers down." — Proverbs 14:1
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon did not romanticize marriage. He described it honestly — the beauty of a trustworthy partner, the pain of conflict, the danger of pride. His wisdom does not tell you who is wrong. It asks you who you want to be.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Ask Solomon does</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Ask Solomon is a free search tool built on the Book of Proverbs. You type what you are feeling — "my marriage is falling apart," "we keep fighting," "I am thinking about divorce" — and it responds with emotionally intelligent wisdom. It meets you in the complexity of it and asks the right question back.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"my marriage is falling apart"</li>
            <li>"I am thinking about divorce"</li>
            <li>"we keep fighting about everything"</li>
            <li>"my spouse hurt me deeply"</li>
            <li>"I want to rebuild my marriage"</li>
          </ul>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#c9a227",
            color: "#0d1b2a",
            padding: "14px 28px",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          Search Proverbs for what you are facing
        </Link>
      </section>

    </main>
  );
}
