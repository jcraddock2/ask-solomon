"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Owner test page -- allows John to verify Pro access on any device without payment
// Secret token prevents public access
// Usage: asksolomon.app/test-access?token=solomon2026

const SECRET = "solomon2026";

function TestAccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"checking" | "granted" | "denied" | "cleared">("checking");

  useEffect(() => {
    const token = searchParams.get("token");
    const action = searchParams.get("action");

    if (action === "clear") {
      localStorage.removeItem("asksolomon_pro");
      setStatus("cleared");
      return;
    }

    if (token === SECRET) {
      localStorage.setItem("asksolomon_pro", "1");
      setStatus("granted");
    } else {
      setStatus("denied");
    }
  }, [searchParams]);

  if (status === "checking") return null;

  if (status === "cleared") {
    return (
      <main style={{ minHeight: "100vh", background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ fontSize: "48px" }}>🔓</div>
        <h1 style={{ color: "#f5e06e", fontSize: "28px", fontWeight: 900, textAlign: "center", margin: 0 }}>Pro Access Cleared</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", textAlign: "center", margin: 0 }}>This browser is now in FREE mode. The banner will show again.</p>
        <a href="/" style={{ background: "#d4af37", color: "#0d1b2a", fontWeight: 700, padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "15px" }}>Go to App (Free Mode)</a>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textAlign: "center" }}>To restore Pro: visit asksolomon.app/test-access?token=solomon2026</p>
      </main>
    );
  }

  if (status === "denied") {
    return (
      <main style={{ minHeight: "100vh", background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ fontSize: "48px" }}>🚫</div>
        <h1 style={{ color: "#ff6b6b", fontSize: "24px", fontWeight: 700, textAlign: "center", margin: 0 }}>Access Denied</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", textAlign: "center" }}>Invalid or missing token.</p>
        <a href="/" style={{ color: "#d4af37", fontSize: "14px" }}>Return to app</a>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontSize: "56px" }}>✅</div>
      <h1 style={{ color: "#f5e06e", fontSize: "32px", fontWeight: 900, textAlign: "center", margin: 0 }}>Pro Access Activated</h1>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", textAlign: "center", maxWidth: "380px", lineHeight: "1.6", margin: 0 }}>
        This browser is now in <b style={{ color: "#d4af37" }}>Pro mode</b>. The founding banner is gone. Book Matches, Full Book, and Book Index are all unlocked.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" style={{ background: "#d4af37", color: "#0d1b2a", fontWeight: 700, padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "15px" }}>Test the App</a>
        <a href="/book" style={{ background: "transparent", color: "#d4af37", fontWeight: 700, padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "15px", border: "1px solid #d4af37" }}>Open the Book</a>
      </div>
      <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "16px 24px", maxWidth: "400px", width: "100%" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "1px" }}>What to check</p>
        <ul style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: "1.8", margin: 0, paddingLeft: "18px" }}>
          <li>Banner is gone from the top</li>
          <li>Header shows PRO badge</li>
          <li>Book and Book Index links visible</li>
          <li>Search a phrase -- Book Matches section appears</li>
          <li>Click Read the Book -- full PDF loads</li>
        </ul>
      </div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", marginTop: "8px" }}>
        To reset to free mode: <a href="/test-access?action=clear" style={{ color: "#d4af37" }}>click here</a>
      </p>
    </main>
  );
}

export default function TestAccessPage() {
  return (
    <Suspense>
      <TestAccessContent />
    </Suspense>
  );
}
