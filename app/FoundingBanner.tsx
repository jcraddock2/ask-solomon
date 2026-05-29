"use client";
import { useState, useEffect } from "react";

const END = new Date("2026-06-04T23:59:59Z").getTime();
const P = (n: number) => String(n).padStart(2, "0");

function checkPro(): boolean {
    if (typeof window === "undefined") return false;
    const cookie = document.cookie.match(/(?:^|;\s*)asksolomon_pro=([^;]*)/);
    if (cookie && cookie[1] === "1") return true;
    return localStorage.getItem("asksolomon_pro") === "1";
}

export default function FoundingBanner() {
    const [tl, setTl] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [show, setShow] = useState(true);
    const [fl, setFl] = useState(true);
    const [isPro, setIsPro] = useState(false);
    useEffect(() => { setIsPro(checkPro()); }, []);
    useEffect(() => {
          const tick = () => {
                  const diff = END - Date.now();
                  if (diff <= 0) return setShow(false);
                  setTl({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) });
          };
          tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
    }, []);
    useEffect(() => { const t = setInterval(() => setFl(f => !f), 1500); return () => clearInterval(t); }, []);
    if (!show) return null;
    if (isPro) return null;
    return (
          <div onClick={() => window.location.href="/upgrade"} style={{ position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"linear-gradient(90deg,#0d1b2a,#1a2e42,#0d1b2a)",borderBottom:"2px solid #d4af37",padding:"6px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",cursor:"pointer",flexWrap:"wrap" }}>
                  <b style={{ background:"#d4af37",color:"#0d1b2a",fontWeight:900,fontSize:13,padding:"3px 10px",borderRadius:20,opacity:fl?1:0.4,transition:"opacity 0.6s",whiteSpace:"nowrap" }}>FOUNDING MEMBER: $19</b>b>
                  <span style={{ color:"#f5e06e",fontWeight:700,fontSize:13,whiteSpace:"nowrap" }}>Lifetime access</span>span>
                  <span style={{ color:"rgba(255,255,255,0.45)",textDecoration:"line-through",fontSize:13 }}>$29</span>span>
                  <span style={{ color:"#d4af37",fontSize:12,fontWeight:600,fontFamily:"monospace",whiteSpace:"nowrap" }}>
                    {`Expires: ${tl.d}d ${P(tl.h)}h ${P(tl.m)}m ${P(tl.s)}s`}
                  </span>span>
                  <b style={{ color:"#d4af37",fontSize:13,fontWeight:900,whiteSpace:"nowrap" }}>Unlock Now</b>b>
              </div>div>
        );
}
