import type { Metadata } from "next";
import Link from "next/link";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Proverbs for Leadership — Solomon on What It Really Takes to Lead",
  description: "Solomon was the greatest leader of his era. Proverbs contains his most direct wisdom on leadership, influence, and leading people well. Search what you are facing as a leader right now.",
  keywords: ["proverbs for leadership", "biblical wisdom for leadership", "Solomon leadership", "scripture for leaders", "proverbs about leadership", "bible verse leadership", "biblical leadership wisdom"],
  openGraph: {
    title: "Proverbs for Leadership — Ask Solomon",
    description: "Solomon led an empire. Find his most direct wisdom on leadership, influence, and what it takes to lead people well.",
    url: "https://asksolomon.app/proverbs-for-leadership",
  },
};

export default function ProverbsForLeadershipPage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Proverbs for Leadership
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Solomon led one of the most complex kingdoms in history. Proverbs is, among other things, his leadership journal. He wrote about how to handle difficult people, how to earn respect, how to speak with authority, and how to lead from the inside out.
        </p>
        <Link
          href="/?q=I+am+struggling+with+leadership+and+leading+people+well"
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
          Search wisdom for leadership now
        </Link>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon said about leadership</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "Where there is no guidance, a people falls, but in an abundance of counselors there is safety." — Proverbs 11:14
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon understood something most leadership books miss: the best leaders are not the loudest — they are the most honest about what they do not know. His entire approach to leadership was rooted in the pursuit of wisdom, not the performance of confidence.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>Leadership starts within</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon did not separate personal character from public leadership. In Proverbs, who you are in private determines the quality of what you build in public. Leadership is not primarily a skill — it is a condition of the heart that shapes everything else. That is why the wisdom in Proverbs is still the most transferable leadership teaching available.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I am struggling to lead my team well"</li>
            <li>"I do not feel like a real leader"</li>
            <li>"People do not respect my leadership"</li>
            <li>"I am overwhelmed by the responsibility of leading others"</li>
            <li>"I need wisdom on how to handle a difficult person on my team"</li>
          </ul>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>From the book: leadership as Solomon lived it</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            <em>Success Secrets of Solomon</em> has two chapters dedicated to leadership: chapter 5 (page 66) on what it means to lead from the inside out, and chapter 6 (page 78) on how to handle the weight of responsibility without losing yourself. Solomon did not just theorize about leadership — he practiced it at a scale few people ever experience. The book translates those lessons into language you can use this week.
          </p>
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


      <SevenDaysOptIn topic="Leadership & Influence" />

    </main>
  );
}
