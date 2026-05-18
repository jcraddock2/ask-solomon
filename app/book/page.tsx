"use client";
import { useEffect, useState } from "react";
import { isProUser } from "../lib/access";

export default function BookPage() {

  // ✅ Local hosted mobile-optimized PDF
  const pdfUrl = "/sss-wisdom-book-jc2024.pdf";

  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  // Free sample (short preview only)
  const sample = [
    {
      title: "Wisdom is the main thing",
      body:
        "If you’re unsure what to do next—choose wisdom first. It will shape every other decision you’re about to make.",
      ref: "Proverbs 4:7",
    },
    {
      title: "Trust and direction",
      body:
        "When you acknowledge God and stay teachable, your steps get clearer. Wisdom often arrives as steady conviction, not sudden noise.",
      ref: "Proverbs 3:5–6",
    },
    {
      title: "Guard your heart",
      body:
        "Your inner life steers your outer life. What you allow in will eventually show up in your decisions and outcomes.",
      ref: "Proverbs 4:23",
    },
  ];

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 20,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>
          Success Secrets of Solomon
        </h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Read the full book inside the app with Lifetime unlock.
        </p>

        {/* Navigation buttons */}
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

          {!isPro && (
            <a
              href="/upgrade"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Unlock Lifetime
            </a>
          )}

          {isPro && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #ddd",
                textDecoration: "none",
                color: "#111",
                fontWeight: 700,
              }}
            >
              Open PDF in New Tab
            </a>
          )}
        </div>
      </header>

      {isPro ? (
        <>
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 16,
              overflow: "hidden",
              height: "80vh",
              background: "#fff",
            }}
          >
            <iframe
              src={pdfUrl}
              title="Success Secrets of Solomon (PDF)"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>

          <p style={{ marginTop: 10, color: "#666", fontSize: 12 }}>
            If the PDF doesn’t display on mobile, tap “Open PDF in New Tab.”
          </p>
        </>
      ) : (
        <section
          style={{
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 16,
            background: "#fff",
            boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Free Sample</h2>
          <p style={{ marginTop: 6, color: "#555" }}>
            Here’s a preview. Unlock Lifetime to read the full book inside the app.
          </p>

          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {sample.map((s, idx) => (
              <article
                key={idx}
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: 14,
                  padding: 14,
                  background: "#fff",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 16 }}>{s.title}</h3>
                <p
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    lineHeight: 1.45,
                    color: "#222",
                  }}
                >
                  {s.body}
                </p>
                <div style={{ color: "#666", fontSize: 12 }}>{s.ref}</div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <a
              href="/upgrade"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 800,
                display: "inline-block",
              }}
            >
              Unlock Lifetime to Read Full Book →
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
