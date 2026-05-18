"use client";
import { useEffect, useState } from "react";
import { isProUser } from "../lib/access";

export default function GiantPage() {
  const [isPro, setIsPro] = useState(false);
  const [pdfToken, setPdfToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  useEffect(() => {
    if (!isPro) return;
    setTokenLoading(true);
    fetch("/api/giant/token", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        setPdfToken(data.token);
        setTokenLoading(false);
      })
      .catch(() => setTokenLoading(false));
  }, [isPro]);

  const securePdfUrl = pdfToken ? "/api/giant/pdf?token=" + pdfToken : null;

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>
          Lessons from a Giant Killer
        </h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#444" }}>
          Your exclusive bonus book included with Lifetime Access.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a
            href="/book"
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #ddd",
              textDecoration: "none",
              color: "#111",
              fontWeight: 700,
            }}
          >
            Back to Success Secrets
          </a>

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
            Ask Solomon
          </a>

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
                title="Lessons from a Giant Killer"
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
              {tokenLoading
                ? "Preparing your secure book link..."
                : "Unable to load book. Please refresh the page."}
            </div>
          )}
        </>
      ) : (
        <section>
          <div
            style={{
              padding: "32px 28px",
              background: "#0a1628",
              borderRadius: 20,
              color: "#fff",
              textAlign: "center",
              marginTop: 32,
            }}
          >
            <p style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#d4a017" }}>
              Bonus Book for Lifetime Members
            </p>
            <p style={{ margin: "0 0 24px", color: "#aac", fontSize: 16, lineHeight: 1.6 }}>
              Lessons from a Giant Killer is included free when you unlock lifetime access to Ask Solomon.
            </p>
            <a
              href="/upgrade"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: "#d4a017",
                color: "#fff",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 17,
              }}
            >
              Unlock Lifetime Access — $29
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
