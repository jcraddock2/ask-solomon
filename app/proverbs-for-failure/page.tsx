import type { Metadata } from "next";
import Link from "next/link";
import SevenDaysOptIn from '../SevenDaysOptIn'

export const metadata: Metadata = {
  title: "Proverbs for Failure — Biblical Wisdom When You Feel Like You Failed",
  description: "Failure does not mean finished. Solomon wrote about falling, rising, and starting over in ways that still apply today. Find biblical wisdom for failure, setbacks, and starting again.",
  keywords: ["proverbs for failure", "biblical wisdom for failure", "Solomon failure", "scripture for failure", "proverbs about starting over", "bible verse failure", "biblical wisdom starting over"],
  openGraph: {
    title: "Proverbs for Failure — Ask Solomon",
    description: "Failure does not mean finished. Find what Solomon wrote about falling, rising, and starting again.",
    url: "https://asksolomon.app/proverbs-for-failure",
  },
};

export default function ProverbsForFailurePage() {
  return (
    <main style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8dcc8", fontFamily: "Georgia, serif", padding: "0" }}>

      {/* Hero */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Ask Solomon</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#f0e6cc", lineHeight: "1.2", marginBottom: "20px" }}>
          Proverbs for Failure
        </h1>
        <p style={{ fontSize: "18px", color: "#b8a898", lineHeight: "1.7", marginBottom: "32px" }}>
          Solomon did not write for people who had it all figured out. He wrote for people who had fallen — and needed wisdom to get back up. Proverbs has a lot to say about failure, starting over, and what it means to rise after a real loss.
        </p>
        <Link
          href="/?q=I+feel+like+a+failure+and+I+do+not+know+how+to+get+back+up"
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
          Search wisdom for failure now
        </Link>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "740px", margin: "0 auto", padding: "0 24px 60px" }}>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>What Solomon said about failure</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8", marginBottom: "16px" }}>
            "For a just man falls seven times and rises again." — Proverbs 24:16
          </p>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            Notice what Solomon did not say. He did not say a righteous man never falls. He said a righteous man falls seven times — and gets back up. The rising is the point. The failure is not the defining moment. What you do after it is.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>Failure does not mean finished</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            The most dangerous thing about failure is not the failure itself — it is what you decide failure means about you. Proverbs addresses the narrative you tell yourself after a setback. Wisdom does not pretend the fall did not happen. It gives you a new question: what do you build from here?
          </p>
        </div>

        <div style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.3)", borderRadius: "8px", padding: "28px", marginBottom: "40px" }}>
          <p style={{ color: "#c9a227", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Try searching</p>
          <ul style={{ color: "#e8dcc8", lineHeight: "2.2", paddingLeft: "20px" }}>
            <li>"I feel like a failure"</li>
            <li>"I failed and I do not know how to start over"</li>
            <li>"I made a big mistake and I cannot move past it"</li>
            <li>"I keep failing at the same thing"</li>
            <li>"I am starting over and I am scared"</li>
          </ul>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,162,39,0.3)", paddingTop: "40px", marginBottom: "40px" }}>
          <h2 style={{ color: "#c9a227", fontSize: "22px", marginBottom: "12px" }}>From the book: failure and what comes after</h2>
          <p style={{ color: "#b8a898", lineHeight: "1.8" }}>
            <em>Success Secrets of Solomon</em> has two chapters that speak directly to failure: chapter 13 (page 171) on why failure does not mean finished, and chapter 14 (page 183) on the courage required to start over. Solomon knew what it felt like to inherit everything and still have things go wrong. The book shows what he did — and what that looks like today.
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


      <SevenDaysOptIn topic="Failure & Resilience" />

    </main>
  );
}
