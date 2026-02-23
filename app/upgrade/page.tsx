"use client";

export default function UpgradePage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 20 }}>
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
        <h2 style={{ marginTop: 0 }}>Lifetime Includes:</h2>

        <ul style={{ lineHeight: 1.7, color: "#222" }}>
          <li><b>Full Book Access</b> — Success Secrets of Solomon (inside the app)</li>
          <li><b>Unlimited Wisdom Cards</b> — encouragement, prayer, and insight</li>
          <li><b>Favorites</b> — save what speaks to you (coming next)</li>
          <li><b>Daily Wisdom Mode</b> — guided daily reflection (coming)</li>
          <li><b>Future Premium Features</b> — included forever</li>
        </ul>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #eee" }}>
  <h3 style={{ margin: 0 }}>Founding Member Lifetime Access</h3>

<p style={{ marginTop: 8, color: "#555" }}>
  <span style={{ textDecoration: "line-through", marginRight: 8 }}>$39</span>
  <b>$29 Founding Price</b>
</p>

<p style={{ marginTop: 6, color: "#555" }}>
  One-time payment. Lifetime access. Early supporters receive all future premium features.
</p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Stripe checkout will be connected next.");
            }}
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "14px 18px",
              borderRadius: 14,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            Unlock Lifetime
          </a>

          <p style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
            Founding access — early supporters receive all future upgrades.
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
