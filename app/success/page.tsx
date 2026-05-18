"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId && sessionId.startsWith("cs_")) {
      localStorage.setItem("asksolomon_pro", "1");
      setVerified(true);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) return null;

  if (!verified) {
    if (typeof window !== "undefined") window.location.href = "/";
    return null;
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 50%, #0d1b2a 100%)",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      color: "#fff",
      padding: "0",
    }}>

      {/* Hero celebration */}
      <div style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "60px 24px 40px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✨</div>
        <h1 style={{
          fontSize: 36,
          fontWeight: 800,
          color: "#f5e06e",
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}>
          You are in. Welcome to Pro.
        </h1>
        <p style={{
          fontSize: 17,
          color: "rgba(220,200,140,0.85)",
          lineHeight: 1.6,
          margin: "0 0 40px",
        }}>
          Every word Solomon wrote is now searchable for you. Here is what just unlocked.
        </p>

        {/* Unlocked features */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: 16,
          padding: "28px 24px",
          marginBottom: 36,
          textAlign: "left",
        }}>
          <div style={{ fontSize: 13, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
            What You Just Unlocked
          </div>
          {[
            { icon: "📖", title: "The Full Book", desc: "All 247 pages of Success Secrets of Solomon — readable inside the app, on any device." },
            { icon: "🎯", title: "Book Matches", desc: "Every search result now shows the exact chapter and page of the book that speaks to it." },
            { icon: "📋", title: "Complete Book Index", desc: "All 30 topics searchable — Leadership, Fear, Money, Relationships, and more." },
          ].map((item) => (
            <div key={item.title} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#f5e06e", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "rgba(220,200,140,0.75)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested first search */}
        <div style={{
          background: "rgba(212,175,55,0.1)",
          border: "1px solid rgba(212,175,55,0.4)",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 32,
          textAlign: "left",
        }}>
          <div style={{ fontSize: 13, color: "#d4af37", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
            Try Your First Pro Search
          </div>
          <div style={{ fontSize: 15, color: "rgba(220,200,140,0.9)", lineHeight: 1.6 }}>
            Type something real. Something you are actually facing right now. Watch how the Book Matches section points you to the exact page in Solomon&apos;s wisdom that speaks to it.
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: "rgba(212,175,55,0.7)" }}>
            Try: &ldquo;I feel stuck&rdquo; &mdash; &ldquo;I am scared about money&rdquo; &mdash; &ldquo;I need direction&rdquo;
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #d4af37, #f5e06e)",
            color: "#0d1b2a",
            fontWeight: 800,
            fontSize: 16,
            borderRadius: 10,
            textDecoration: "none",
          }}>
            Search Now &rarr;
          </a>
          <a href="/book" style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "transparent",
            color: "#f5e06e",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 10,
            textDecoration: "none",
            border: "1px solid rgba(212,175,55,0.5)",
          }}>
            Read the Book &rarr;
          </a>
        </div>

        <p style={{ marginTop: 28, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          If you don&apos;t see Pro features right away, refresh once.
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
