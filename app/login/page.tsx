"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ERRORS: Record<string, string> = {
    invalid: "Invalid link. Please request a new one.",
    expired: "Link expired. Please request a new one.",
    notpro: "That email does not have Pro access. Did you use a different email at checkout?",
};

function LoginForm() {
    const err = useSearchParams().get("error");
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/auth/send-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
        setLoading(false);
        setSent(true);
  }

  const card: React.CSSProperties = { maxWidth: 420, width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12, padding: "40px 32px" };
    const page: React.CSSProperties = { minHeight: "100vh", background: "linear-gradient(160deg,#0f0c29 0%,#1a1040 50%,#0d1b2a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,Arial,sans-serif", padding: 24 };

  return (
        <main style={page}>
                <div style={card}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: "#d4af37", marginBottom: 6 }}>Ask Solomon</div>
                          <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Access your Pro account</div>
                          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Enter the email you used at checkout. We will send a link to activate Pro on this device.</div>
                  {err && <div style={{ background: "rgba(220,50,50,0.15)", border: "1px solid rgba(220,50,50,0.4)", borderRadius: 6, padding: "11px 14px", marginBottom: 18, color: "#ff9999", fontSize: 13 }}>{ERRORS[err] || "Something went wrong."}</div>}
                  {sent ? (
                    <div style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 6, padding: "20px", textAlign: "center" }}>
                                  <div style={{ fontSize: 26, marginBottom: 6 }}>📬</div>
                                  <div style={{ color: "#f5e06e", fontWeight: 700, marginBottom: 6 }}>Check your email</div>
                                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>If {email} has Pro access, a login link is on its way. Expires in 15 minutes.</div>
                    </div>
                  ) : (
                    <form onSubmit={submit}>
                                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,175,55,0.35)", borderRadius: 6, color: "#fff", fontSize: 15, marginBottom: 14, boxSizing: "border-box" }} />
                                  <button type="submit" disabled={loading} style={{ width: "100%", padding: 13, background: "linear-gradient(135deg,#d4af37,#f5e06e)", color: "#0d1b2a", fontWeight: 800, fontSize: 15, border: "none", borderRadius: 6, cursor: "pointer" }}>{loading ? "Sending..." : "Send my login link"}</button>
                    </form>
                                                                                           )}
                          <div style={{ marginTop: 22, textAlign: "center" }}><a href="/" style={{ color: "rgba(212,175,55,0.6)", fontSize: 13, textDecoration: "none" }}>Back to Ask Solomon</a></div>
                </div>
        </main>
      );
}

export default function LoginPage() {
    return <Suspense fallback={null}><LoginForm /></Suspense>Suspense>;
}
