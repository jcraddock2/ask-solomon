import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Biblical Wisdom for Loneliness — Solomon on Feeling Alone",
  description: "You are not forgotten. Solomon wrote more about isolation and belonging than almost any other subject. Find biblical wisdom for loneliness, feeling alone, and disconnection.",
  keywords: ["biblical wisdom for loneliness", "proverbs for loneliness", "Solomon loneliness", "feeling alone bible", "scripture for loneliness", "bible verse for feeling forgotten"],
  openGraph: {
    title: "Biblical Wisdom for Loneliness — Ask Solomon",
    description: "You are not forgotten. Find what Solomon wrote about isolation, belonging, and the season of feeling alone.",
    url: "https://asksolomon.app/biblical-wisdom-for-loneliness",
  },
};

export default function BiblicalWisdomForLonelinessPage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Biblical Wisdom for Loneliness
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Loneliness is one of the most honest human experiences. And Solomon — who had everything — wrote about it with unusual clarity. He understood that being surrounded by people does not protect you from feeling invisible.
        </p>
        <Link
          href="/?q=I+feel+alone+and+no+one+understands"
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
          Search wisdom for loneliness now
        </Link>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon wrote about isolation</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "Two are better than one, because they have a good reward for their labor." — Proverbs 4:9 (Ecclesiastes 4:9)
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Solomon did not romanticize loneliness. He called it what it is: a real disadvantage, a hard season, and a condition that calls for wisdom — not just comfort. The book of Proverbs addresses community, trustworthy friendship, and the danger of isolation with more weight than most people realize.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>The lie loneliness tells</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Loneliness tells you that your current season is permanent. That nobody sees you. That you are too much — or not enough — to be known. Wisdom says something different: your season of isolation does not define your worth. And it does not have to define your future.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I feel alone and no one understands"</li>
            <li>"I feel invisible to everyone around me"</li>
            <li>"I have no real friends"</li>
            <li>"I feel forgotten by God"</li>
            <li>"I am isolated and it is breaking me"</li>
          </ul>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>From the book: what Solomon learned</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            In <em>Success Secrets of Solomon</em>, chapter 8 (starting at page 105) addresses loneliness directly — not as a character flaw, but as a season that carries a specific invitation. Solomon built an empire and still wrote about the weight of being misunderstood. That chapter connects his experience to yours in a way that most devotionals do not attempt.
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

    </main>
  );
}
