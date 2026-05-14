"use client";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const text = await res.text();
      if (!res.ok) { alert(text || "Checkout failed. Please try again."); return; }
      const data = JSON.parse(text);
      if (!data?.url) { alert("Checkout created, but no URL returned."); return; }
      window.location.href = data.url;
    } catch (err: any) {
      alert(err?.message || "Unexpected error starting checkout.");
    }
  };

  return (
    <main style={{
      maxWidth: 680,
      margin: "0 auto",
      padding: "24px 20px 48px",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    }}>

      {/* Back link */}
      <button
        type="button"
        onClick={() => router.push("/")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, fontWeight: 800, color: "#64748b",
          marginBottom: 24, padding: 0, display: "flex", alignItems: "center", gap: 4,
        }}
      >
        ← Back to Ask Solomon
      </button>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 50%, #0d1b2a 100%)",
        borderRadius: 22,
        padding: "36px 28px",
        textAlign: "center",
        marginBottom: 28,
        boxShadow: "0 30px 60px rgba(15,12,41,0.3)",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 900, letterSpacing: 2.5,
          color: "#d4af37", textTransform: "uppercase", marginBottom: 12,
        }}>
          Lifetime Access · One Payment · No Subscription
        </div>
        <h1 style={{
          margin: "0 0 14px",
          fontSize: "clamp(24px, 5vw, 36px)",
          fontWeight: 900, lineHeight: 1.1, color: "#fff",
        }}>
          The app shows you what Proverbs says.<br />
          <span style={{ color: "#f5e06e" }}>The book gives you the principles for success.</span>
        </h1>
        <p style={{
          margin: "0 auto 28px",
          maxWidth: 480,
          fontSize: 15, fontWeight: 600,
          color: "rgba(220,220,240,0.78)",
          lineHeight: 1.65,
        }}>
          <em>Success Secrets of Solomon</em> is a 247-page devotional connecting
          every major life challenge — money, fear, anger, purpose, relationships —
          to the principles Solomon actually lived by. Written by John Craddock.
        </p>

        {/* Price block */}
        <div style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 24,
          display: "inline-block",
          minWidth: 260,
        }}>
          <div style={{ fontSize: 12, color: "rgba(212,175,55,0.8)", fontWeight: 800, marginBottom: 6 }}>
            FOUNDING MEMBER PRICE
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>$39</span>
            <span style={{ fontSize: 42, fontWeight: 900, color: "#f5e06e", lineHeight: 1 }}>$29</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
            One-time · Lifetime access · No renewal ever
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 360,
            margin: "0 auto",
            padding: "16px 20px",
            borderRadius: 14,
            background: "#d4af37",
            color: "#1a1040",
            fontWeight: 900,
            fontSize: 17,
            border: "none",
            cursor: "pointer",
            letterSpacing: 0.3,
          }}
        >
          📖 Unlock Lifetime Access — $29
        </button>

        <p style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
          Secure checkout via Stripe. Book unlocks instantly after purchase.
        </p>
      </div>

      {/* What you get */}
      <div style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 18,
        padding: "24px 24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
          What you unlock
        </div>

        {[
          {
            icon: "📖",
            title: "The full book — inside the app",
            body: "All 247 pages of Success Secrets of Solomon, readable anytime on any device. No PDF download required.",
          },
          {
            icon: "🔍",
            title: "Book Matches for every search",
            body: "Every wisdom search now shows which chapter and page speaks directly to what you typed. The app becomes a living index to the book.",
          },
          {
            icon: "✦",
            title: "Same price as the hardcover",
            body: "The hardcover retails for $29. For the same price you get the digital version plus the search tool, forever.",
          },
          {
            icon: "🔒",
            title: "All future features, included",
            body: "Founding members receive every premium feature added to Ask Solomon going forward — at no extra cost.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{
            display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start",
          }}>
            <div style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 14, color: "#111", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#475569", fontWeight: 600, lineHeight: 1.55 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={handleCheckout}
          style={{
            padding: "15px 32px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #1a1040 0%, #0d1b2a 100%)",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#f5e06e",
            fontWeight: 900,
            fontSize: 16,
            cursor: "pointer",
            letterSpacing: 0.3,
            marginBottom: 12,
          }}
        >
          📖 Get Lifetime Access — $29
        </button>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
          Same price as the hardcover. Instant access. No subscription ever.
        </div>
      </div>

    </main>
  );
}
