"use client";
import { useEffect, useState } from "react";
import { isProUser } from "../lib/access";

export default function BookPage() {
  const [isPro, setIsPro] = useState(false);
  const [pdfToken, setPdfToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  // When user is confirmed pro, fetch a short-lived signed token
  useEffect(() => {
    if (!isPro) return;
    setTokenLoading(true);
    fetch("/api/book/token", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        setPdfToken(data.token);
        setTokenLoading(false);
      })
      .catch(() => setTokenLoading(false));
  }, [isPro]);

  const securePdfUrl = pdfToken ? "/api/book/pdf?token=" + pdfToken : null;

  // Free sample (short preview only)
  const sample = [
    {
      title: "Wisdom is the main thing",
      body:
        "If you are unsure what to do next choose wisdom first. It will shape every other decision you are about to make.",
      ref: "Proverbs 4:7",
    },
    {
      title: "Trust and direction",
      body:
        "When you acknowledge God and stay teachable, your steps get clearer. Wisdom often arrives as steady conviction, not sudden noise.",
      ref: "Proverbs 3:5-6",
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
            Back to Ask Solomon
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

          {isPro && securePdfUrl && (
            <a
              href={securePdfUrl}
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

          {isPro && securePdfUrl && (
            <a
              href="/giant"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #d4a017",
                background: "#d4a017",
                textDecoration: "none",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Bonus Book: Giant Killer
            </a>
          )}

          {isPro && tokenLoading && (
            <span style={{ padding: "10px 12px", color: "#888" }}>
              Loading secure link...
            </span>
          )}
        </div>
      </header>

      {isPro ? (
        <>
          {securePdfUrl ? (
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
                src={securePdfUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Success Secrets of Solomon"
              />
            </div>
          ) : (
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 16,
                padding: 40,
                textAlign: "center",
                color: "#888",
              }}
            >
              {tokenLoading ? "Preparing your secure book link..." : "Unable to load book. Please refresh the page."}
            </div>
          )}
        </>
      ) : (
        <section>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>Free Preview</h2>
          <p style={{ color: "#666", marginTop: 0, marginBottom: 20 }}>
            Unlock the full book with lifetime access.
          </p>
          {sample.map((card, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eee",
                borderRadius: 16,
                padding: "18px 20px",
                marginBottom: 16,
                background: "#fafafa",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{card.title}</h3>
              <p style={{ margin: "0 0 8px", color: "#333", lineHeight: 1.6 }}>
                {card.body}
              </p>
              <p style={{ margin: 0, color: "#888", fontSize: 13 }}>
                {card.ref}
              </p>
            </div>
          ))}

          <div
            style={{
              marginTop: 28,
              padding: "24px 28px",
              background: "#111",
              borderRadius: 20,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>
              Get the full 200+ page book
            </p>
            <a
              href="/upgrade"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "#d4a017",
                color: "#fff",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Unlock Lifetime Access
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
