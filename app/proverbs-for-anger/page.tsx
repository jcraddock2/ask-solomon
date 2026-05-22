import type { Metadata } from "next";
import Link from "next/link";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Proverbs for Anger — What Solomon Said About Controlling Your Temper",
  description: "Solomon wrote more about anger in Proverbs than almost any other emotion. Find biblical wisdom for anger, rage, and losing your temper — and search what you are facing right now.",
  keywords: ["proverbs for anger", "biblical wisdom for anger", "Solomon anger", "scripture for anger", "proverbs about temper", "bible verse anger", "controlling anger biblical"],
  openGraph: {
    title: "Proverbs for Anger — Ask Solomon",
    description: "Solomon had a lot to say about anger. Find biblical wisdom for what you are feeling right now.",
    url: "https://asksolomon.app/proverbs-for-anger",
  },
};

export default function ProverbsForAngerPage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Proverbs for Anger
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Solomon did not tell people to stop feeling angry. He understood that anger is often legitimate — and that what matters is what you do with it. Proverbs has more to say about anger than almost any other emotion in the Bible.
        </p>
        <Link
          href="/?q=I+feel+angry+and+I+cannot+control+it"
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
          Search wisdom for anger now
        </Link>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon said about anger</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "A soft answer turns away wrath, but a harsh word stirs up anger." — Proverbs 15:1
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon wrote about anger not as a character defect but as a force that must be directed wisely. He distinguished between the person who masters their anger and the one who is mastered by it — and he was clear about which one has real power. Anger managed becomes authority.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>The wisdom angle on anger</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Most anger is not really about what it appears to be about. Behind the rage is usually something deeper — a wound, a boundary that was crossed, a value that was violated. Proverbs gives you language for the deeper thing, not just a rule about keeping quiet. Wisdom does not suppress anger. It channels it.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I feel angry and I cannot control it"</li>
            <li>"I said something in anger and I regret it"</li>
            <li>"Someone treated me unfairly and I am furious"</li>
            <li>"I have a short temper and I hate it"</li>
            <li>"I am so angry at God right now"</li>
          </ul>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>From the book: anger managed becomes authority</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            In <em>Success Secrets of Solomon</em>, the chapter on anger (page 126) makes the case that the person who can control their anger in a high-pressure moment holds more power than the person who lets it loose. Solomon lived this — he ruled a kingdom where one wrong outburst could spark a political crisis. The book shows how he navigated it, and what that principle looks like in your life today.
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


      <SevenDaysOptIn topic="Anger & Conflict" />

    </main>
  );
}
