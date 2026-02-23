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
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Unlock Lifetime</h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Lifetime access includes the full book and premium features that turn Ask Solomon into your personal guide.
        </p>
      </header>

      <section
        style={{
          border: "1px solid #eee",
          borderRadius: 16,
          padding: 16,
          background: "#fff",
          boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 18 }}>What you get</h2>
        <ul style={{ marginTop: 8, marginBottom: 0, color: "#222", lineHeight: 1.6 }}>
          <li><b>Full book access</b> inside the app (Success Secrets of Solomon)</li>
          <li><b>Favorites</b> — save your best wisdom (next)</li>
          <li><b>Daily Wisdom</b> mode + streak (next)</li>
          <li><b>Premium prompts</b> and deeper guidance (next)</li>
        </ul>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a
            href="/"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
            }}
          >
            ← Back to Ask Solomon
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Stripe checkout will be connected next.");
            }}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Unlock Lifetime
          </a>
        </div>

        <p style={{ marginTop: 12, color: "#666", fontSize: 12 }}>
          Checkout is a placeholder right now. Next step: connect Stripe lifetime purchase + unlock access.
        </p>
      </section>
    </main>
  );
}
