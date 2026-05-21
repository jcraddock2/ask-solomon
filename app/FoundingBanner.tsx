"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// FOUNDING MEMBER BANNER
// Launch end date: set to 11 days from May 21, 2026 = June 1, 2026 at midnight UTC
const FOUNDING_END = new Date("2026-06-01T23:59:59Z").getTime();

function pad(n: number) {
    return String(n).padStart(2, "0");
}

export default function FoundingBanner() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [visible, setVisible] = useState(true);
    const [flash, setFlash] = useState(true);

  useEffect(() => {
        function calc() {
                const now = Date.now();
                const diff = FOUNDING_END - now;
                if (diff <= 0) {
                          setVisible(false);
                          return;
                }
                const d = Math.floor(diff / 86400000);
                const h = Math.floor((diff % 86400000) / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                setTimeLeft({ d, h, m, s });
        }
        calc();
        const timer = setInterval(calc, 1000);
        return () => clearInterval(timer);
  }, []);

  // Flash effect: alternates opacity every 1.5s on the price badge
  useEffect(() => {
        const flashTimer = setInterval(() => setFlash(f => !f), 1500);
        return () => clearInterval(flashTimer);
  }, []);

  if (!visible) return null;

  return (
        <div
                onClick={() => router.push("/upgrade")}
                style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          zIndex: 9999,
                          background: "linear-gradient(90deg, #0d1b2a 0%, #1a2e42 50%, #0d1b2a 100%)",
                          borderBottom: "2px solid #d4af37",
                          padding: "8px 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          cursor: "pointer",
                          flexWrap: "wrap",
                          minHeight: 44,
                }}
              >
          {/* Flashing price badge */}
              <span
                        style={{
                                    background: "#d4af37",
                                    color: "#0d1b2a",
                                    fontWeight: 900,
                                    fontSize: 13,
                                    padding: "3px 10px",
                                    borderRadius: 20,
                                    letterSpacing: 0.5,
                                    opacity: flash ? 1 : 0.45,
                                    transition: "opacity 0.6s ease",
                                    whiteSpace: "nowrap",
                        }}
                      >
                      FOUNDING MEMBER: $19
              </span>span>
        
          {/* Message */}
              <span style={{
                        color: "#f5e06e",
                        fontWeight: 700,
                        fontSize: 13,
                        whiteSpace: "nowrap",
              }}>
                      Lifetime access —{" "}
                      <span style={{
                          color: "rgba(255,255,255,0.5)",
                          textDecoration: "line-through",
                          fontWeight: 400,
              }}>$29</span>span>
              </span>span>
        
          {/* Countdown */}
              <span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: "rgba(255,255,255,0.85)",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
              }}>
                      <span style={{ color: "#d4af37", marginRight: 2 }}>Expires in</span>span>
                      <span style={{ background: "rgba(212,175,55,0.15)", borderRadius: 4, padding: "1px 5px" }}>
                        {timeLeft.d}d
                      </span>span>
                      <span style={{ background: "rgba(212,175,55,0.15)", borderRadius: 4, padding: "1px 5px" }}>
                        {pad(timeLeft.h)}h
                      </span>span>
                      <span style={{ background: "rgba(212,175,55,0.15)", borderRadius: 4, padding: "1px 5px" }}>
                        {pad(timeLeft.m)}m
                      </span>span>
                      <span style={{ background: "rgba(212,175,55,0.15)", borderRadius: 4, padding: "1px 5px" }}>
                        {pad(timeLeft.s)}s
                      </span>span>
              </span>span>
        
          {/* CTA arrow */}
              <span style={{
                        color: "#d4af37",
                        fontSize: 13,
                        fontWeight: 800,
                        whiteSpace: "nowrap",
              }}>
                      Unlock Now →
              </span>span>
        </div>div>
      );
}</div>
