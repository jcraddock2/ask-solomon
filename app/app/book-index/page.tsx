"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TOPICS } from "../lib/verses";

export default function BookIndexPage() {
  const router = useRouter();

  const pageStyle: React.CSSProperties = {
    maxWidth: 980,
    margin: "0 auto",
    padding: 20,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 18,
    boxShadow: "0 18px 48px rgba(0,0,0,0.08)",
    padding: 16,
  };

  const btn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 14,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
  };

  const primary: React.CSSProperties = {
    ...btn,
    background: "rgba(17,24,39,0.92)",
    color: "#fff",
    border: "1px solid rgba(0,0,0,0.16)",
  };

  return (
    <main style={pageStyle}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 34, letterSpacing: -0.5 }}>Book Topics Index</h1>
        <p style={{ marginTop: 8, marginBottom: 0, color: "#334155", fontWeight: 700 }}>
          Tap a topic to instantly search in Ask Solomon. (This is the foundation for “find it in the book.”)
        </p>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={btn} onClick={() => router.push("/")}>
            Back to App
          </button>
          <button style={primary} onClick={() => router.push("/book")}>
            Open Book
          </button>
        </div>
      </header>

      <section style={{ display: "grid", gap: 12 }}>
        {TOPICS.map((t) => (
          <div key={t.key} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 16 }}>{t.label}</div>
                <div style={{ marginTop: 6, color: "#64748b", fontWeight: 700, fontSize: 13 }}>{t.hint}</div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={btn} onClick={() => router.push(`/?q=${encodeURIComponent(t.query)}`)}>
                  Search Verses
                </button>
                <button style={primary} onClick={() => router.push(`/book`)}>
                  Find in Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div style={{ marginTop: 16, color: "#64748b", fontWeight: 800, fontSize: 12 }}>
        Next upgrade: we’ll map each topic to “recommended chapters/pages” so Pro users can jump straight to the right section.
      </div>
    </main>
  );
}
