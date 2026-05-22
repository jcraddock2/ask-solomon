import type { Metadata } from "next";
import Link from "next/link";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Biblical Wisdom for Job Loss — Proverbs When You Lose Your Job",
  description: "Losing a job shakes your identity, not just your income. Find biblical wisdom from Proverbs for job loss, unemployment, and starting over — and search what you are facing.",
  keywords: ["biblical wisdom for job loss", "proverbs for unemployment", "scripture when you lose your job", "bible verses job loss", "Solomon wisdom work"],
  openGraph: {
    title: "Biblical Wisdom for Job Loss — Ask Solomon",
    description: "Proverbs speaks directly to job loss. Search for wisdom about what you are facing right now.",
    url: "https://asksolomon.app/biblical-wisdom-for-job-loss",
  },
};

export default function BiblicalWisdomForJobLossPage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Biblical Wisdom for Job Loss
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Losing a job does not just take your income. It can take your identity, your routine, and your sense of worth all at once. Solomon understood that kind of loss — and he left us something real to hold onto.
        </p>
        <Link
          href="/?q=I+just+lost+my+job"
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
          Search wisdom for job loss now
        </Link>
      </section>

      {/* Wisdom Section */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>Your value was never your title</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "A good name is more desirable than great riches." — Proverbs 22:1
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Proverbs does not define your identity by your employment. Your worth precedes your work. What Solomon builds toward is this: character and diligence outlast any single job, any single season of loss.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Ask Solomon does</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Ask Solomon is a free search tool built on the Book of Proverbs. You type what you are feeling — "I just got fired," "I am unemployed and scared," "I hate my job and feel stuck" — and it responds with emotionally intelligent biblical wisdom. Not platitudes. Real guidance from the wisest book ever written about work.
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I just got fired today"</li>
            <li>"I lost my job and feel lost"</li>
            <li>"I hate my job and feel stuck"</li>
            <li>"I am unemployed and scared"</li>
            <li>"I need direction about my career"</li>
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


      <SevenDaysOptIn topic="Job Loss & Work Struggles" />

    </main>
  );
}
