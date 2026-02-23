"use client";

export default function UpgradePage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 34 }}>Unlock Lifetime Access</h1>

        <p style={{ marginTop: 10, fontSize: 18, color: "#444", lineHeight: 1.5 }}>
          Ask Solomon is your personal source of wisdom, encouragement, and direction —
          rooted in Proverbs and designed for real life.
        </p>
      </header>

      <section
        style={{
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 20,
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 10 }}>Lifetime Includes:</h2>

        <ul style={{ lineHeight: 1.7, color: "#222", marginTop: 0 }}>
          <li>
            <b>Full Book Access</b> — <i>Success Secrets of Solomon</i> (inside the app)
          </li>
          <li>
            <b>Unlimited Wisdom Cards</b> — encouragement, prayer, and insight
          </li>
          <li>
            <b>Favorites</b> — save what speaks to you (coming next)
          </li>
          <li>
            <b>Daily Wisdom Mode</b> — guided daily reflection (coming)
          </li>
          <li>
            <b>Future Premium Features</b> — included forever
          </li>
        </ul>

        <div
          style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px solid #eee",
          }}
        >
          <h3 style={{ margin: 0 }}>Founding Member Lifetime Access</h3>

          <p style={{ marginTop: 8, color: "#555" }}>
            <span style={{ textDecoration: "line-through", marginRight: 8 }}>
              $39
            </span>
            <b>$29 Founding Price</b>
          </p>

          <p style={{ marginTop: 6, color: "#555", lineHeight: 1.5 }}>
            One-time payment. Lifetime access. Early supporters receive all future
            premium features.
          </p>

          <button
            type="button"
           onClick={async () => {
  try {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const text = await res.text();

    if (!res.ok) {
      alert(text || "Checkout failed. Please try again.");
      return;
    }

    const data = JSON.parse(text);
    if (!data?.url) {
      alert("Checkout created, but no URL returned.");
      return;
    }

    window.location.href = data.url;
  } catch (err: any) {
    alert(err?.message || "Unexpected error starting checkout.");
  }
}}
            
            style={{
              marginTop: 14,
              display: "inline-block",
              padding: "14px 18px",
              borderRadius: 14,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
            }}
          >
            Unlock Lifetime
          </button>

          <p style={{ marginTop: 12, fontSize: 12, color: "#666", lineHeight: 1.4 }}>
            You’ll be taken to secure checkout. After purchase, the full book unlocks
            instantly inside Ask Solomon.
          </p>
        </div>
      </section>

      <div style={{ marginTop: 18 }}>
        <a
          href="/"
          style={{
            color: "#555",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← Back to Ask Solomon
        </a>
      </div>
    </main>
  );
}
