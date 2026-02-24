"use client";
import { useEffect } from "react";
export default function SuccessPage() {
useEffect(() => {
  localStorage.setItem("asksolomon_pro", "1");
}, []);
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 34, margin: 0 }}>You’re In ✅</h1>

      <p style={{ marginTop: 10, fontSize: 16, color: "#333", lineHeight: 1.5 }}>
        Your purchase was successful. Thank you for supporting Ask Solomon.
      </p>

      <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            textDecoration: "none",
            color: "#111",
            fontWeight: 800,
          }}
        >
          Go to Ask Solomon →
        </a>

        <a
          href="/book"
          style={{
            display: "inline-block",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            textDecoration: "none",
            color: "#111",
            fontWeight: 800,
          }}
        >
          Read the Book →
        </a>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        If you don’t see changes right away, refresh once.
      </p>
    </main>
  );
}
