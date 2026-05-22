import type { Metadata } from "next";
import Link from "next/link";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Proverbs for Anxiety — Biblical Wisdom When You Are Afraid",
  description: "Solomon wrote about fear, worry, and anxiety in Proverbs. Find biblical wisdom for anxiety, panic, and overwhelm — and search what you are facing right now.",
  keywords: ["proverbs for anxiety", "biblical wisdom for anxiety", "scripture for fear", "proverbs about worry", "Solomon wisdom anxiety"],
  openGraph: {
    title: "Proverbs for Anxiety — Ask Solomon",
    description: "Find biblical wisdom for what you are feeling anxious about. Search Proverbs by what you are facing.",
    url: "https://asksolomon.app/proverbs-for-anxiety",
  },
};

export default function ProverbsForAnxietyPage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Proverbs for Anxiety
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Solomon wrote more about fear and anxiety than almost any other subject in Proverbs. He knew what it felt like to carry impossible weight — and he left us a way through it.
        </p>
        <Link
          href="/?q=I+am+anxious+and+afraid"
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
          Search wisdom for anxiety now
        </Link>
      </section>

      {/* Wisdom Section */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon said about fear</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "The fear of the LORD is the beginning of wisdom." — Proverbs 9:10
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon distinguished between two kinds of fear. The fear that paralyzes you — and the fear that reorients you. Anxiety about tomorrow is a signal. Wisdom turns that signal into a question: what does this fear reveal about where I am placing my trust?
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Ask Solomon does</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Ask Solomon is a free search tool built on the Book of Proverbs. You type what you are feeling — "I am anxious," "I cannot stop worrying," "I am afraid of what comes next" — and it responds with emotionally intelligent wisdom rooted in Scripture. Not generic. Not preachy. Real.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I am anxious about the future"</li>
            <li>"I cannot stop worrying"</li>
            <li>"I am afraid to make a move"</li>
            <li>"I feel overwhelmed and scared"</li>
            <li>"I have panic attacks"</li>
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


      <SevenDaysOptIn topic="Anxiety & Worry" />

    </main>
  );
}
