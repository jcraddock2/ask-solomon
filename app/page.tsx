// app/page.tsx
"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isProUser } from "./lib/access";
import { searchProverbsScored } from "./lib/proverbs";
import { getWisdomResponse, type WisdomResponse } from "./lib/wisdomResponse";
import {
  smartSearch,
  interpretQueryAdvanced,
  expandSmartTerms,
} from "./lib/intent";
import {
  DATA,
  MODES,
  SUBS,
  TOPICS,
  subCommentary,
  findBookMatches,
  searchVerseItemsScored,
  type BookMatch,
  type Mode,
  type Sub,
  type VerseItem,
} from "./lib/verses";
function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const SITUATION_PRESETS = [
  { label: "⚡ I’m Angry", value: "anger" },
  { label: "😟 I’m Overwhelmed", value: "overwhelmed" },
  { label: "🧭 Need Direction", value: "guidance" },
  { label: "💰 Money Stress", value: "money" },
  { label: "💔 Relationship Conflict", value: "relationship conflict" },
  { label: "🌧 Feeling Discouraged", value: "discouraged" },
] as const;

type ShareTemplate = "classic" | "dark" | "gold" | "daily" | "gradientModern";

type ProverbMatch = {
  ref: string;
  text: string;
  topics: string[];
  score: number;
  why: string[];
};

function asArray<T = any>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function getModeKey(m: any): Mode {
  return (m?.key ?? m?.value ?? "encouragement") as Mode;
}

function getModeLabel(m: any): string {
  return String(m?.label ?? m?.name ?? m?.key ?? m?.value ?? "Mode");
}

function getSubKey(s: any): Sub {
  return (s?.key ?? s?.value ?? "all") as Sub;
}

function getSubLabel(s: any): string {
  return String(s?.label ?? s?.name ?? s?.key ?? s?.value ?? "Sub");
}

function getTopicKey(t: any): string {
  return String(t?.key ?? t?.query ?? t?.label ?? "");
}

function getTopicLabel(t: any): string {
  return String(t?.label ?? t?.query ?? t?.key ?? "Topic");
}

function getTopicQuery(t: any): string {
  return String(t?.query ?? t?.label ?? t?.key ?? "");
}

function getTopicHint(t: any): string {
  return String(t?.hint ?? t?.query ?? t?.label ?? "");
}

function normalizeText(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function itemMode(item: any): string {
  return String(item?.mode ?? "encouragement");
}

function itemSubs(item: any): string[] {
  const subs: string[] = [];

  if (typeof item?.sub === "string" && item.sub.trim()) subs.push(item.sub);
  if (Array.isArray(item?.subs)) {
    for (const s of item.subs) {
      if (typeof s === "string" && s.trim()) subs.push(s);
    }
  }

  return subs;
}

function renderBookMatchLine(match: any): string {
  if (typeof match?.blurb === "string" && match.blurb.trim()) return match.blurb;
  if (typeof match?.body === "string" && match.body.trim()) return match.body;
  if (typeof match?.description === "string" && match.description.trim()) return match.description;
  if (typeof match?.preview === "string" && match.preview.trim()) return match.preview;
  return "";
}

function renderBookMatchTitle(match: any): string {
  if (typeof match?.label === "string" && match.label.trim()) return match.label;
  if (typeof match?.title === "string" && match.title.trim()) return match.title;
  if (typeof match?.topic === "string" && match.topic.trim()) return match.topic;
  if (typeof match?.heading === "string" && match.heading.trim()) return match.heading;
  return "Book Match";
}

function renderBookMatchMeta(match: any): string {
  const parts: string[] = [];

  if (match?.pages) parts.push(String(match.pages));
  if (Array.isArray(match?.chapters) && match.chapters.length > 0) {
    parts.push(match.chapters.join(" • "));
  } else if (match?.chapter) {
    parts.push(String(match.chapter));
  }

  return parts.join(" • ");
}

function tokenizeQuery(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((t) => t.trim())
    .filter(Boolean);
}

// NOTE: expandSmartTerms is now imported from ./lib/intent
// DO NOT redefine it here

function scoreProverbMatch(
  proverb: { ref: string; text: string; topics: string[] },
  q: string,
  expandedTerms: string[]
): ProverbMatch {
  const query = normalizeText(q);
  const text = normalizeText(proverb.text);
  const ref = normalizeText(proverb.ref);
  const topics = proverb.topics.map((t) => normalizeText(t));

  let score = 0;
  const why: string[] = [];

  if (query && text.includes(query)) {
    score += 10;
    why.push("Direct phrase match");
  }

  if (query && topics.some((t) => t.includes(query))) {
    score += 12;
    why.push("Topic match");
  }

  if (query && ref.includes(query)) {
    score += 4;
    why.push("Reference match");
  }

  for (const term of expandedTerms) {
    if (!term) continue;

    if (topics.some((t) => t.includes(term))) {
      score += 6;
      if (!why.includes("Related topic")) why.push("Related topic");
    }

    if (text.includes(term)) {
      score += 3;
      if (!why.includes("Related keyword")) why.push("Related keyword");
    }
  }

  if (topics.length > 0) {
    score += Math.min(3, topics.length);
  }

  return {
    ref: proverb.ref,
    text: proverb.text,
    topics: proverb.topics,
    score,
    why,
  };
}

function PageInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const rawUrlMode = (sp.get("mode") as Mode) || "encouragement";
  const rawUrlSub = (sp.get("sub") as Sub | "all") || "all";
  const urlQ = sp.get("q") || "";

  const [mode, setMode] = useState<Mode>(rawUrlMode);
  const [sub, setSub] = useState<Sub | "all">(rawUrlSub);
  const [q, setQ] = useState<string>(urlQ);

  const [isPro, setIsPro] = useState(false);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState<Record<string, boolean>>({});

  const [copiedKey, setCopiedKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string>("");
  const [favPulse, setFavPulse] = useState(false);

  const [todayFocusOn, setTodayFocusOn] = useState(false);
  const [todayFocusKey, setTodayFocusKey] = useState<string>("");

  const [searchFocused, setSearchFocused] = useState(false);
  const [promotedProverbRef, setPromotedProverbRef] = useState<string>("");

  const [shareTemplate, setShareTemplate] =
    useState<ShareTemplate>("gradientModern");
  const [wisdomCard, setWisdomCard] = useState<WisdomResponse | null>(null);
  const [emailInput, setEmailInput] = React.useState('')
   const [shareCopied, setShareCopied] = useState(false);
  const [emailStatus, setEmailStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const outerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.14), rgba(255,255,255,0)), radial-gradient(900px 500px at 80% 0%, rgba(16,185,129,0.12), rgba(255,255,255,0)), #f8fafc",
    padding: 18,
  };
  const pageStyle: React.CSSProperties = {
    maxWidth: 920,
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  };

  const badgeStyle = (pro: boolean): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.10)",
    background: pro ? "rgba(16,185,129,0.16)" : "rgba(99,102,241,0.14)",
    color: "#111",
  });

  const headerBtn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 14,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    userSelect: "none",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 22,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 26px 80px rgba(0,0,0,0.10)",
    padding: 18,
    height: "72vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  };

  const softCardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 16,
    transition: "transform 160ms ease, box-shadow 160ms ease",
  };

  const pillBtn = (active: boolean): React.CSSProperties => ({
    border: "1px solid rgba(0,0,0,0.10)",
    background: active ? "rgba(17,24,39,0.92)" : "rgba(255,255,255,0.92)",
    color: active ? "#fff" : "#111",
    borderRadius: 999,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 13,
    boxShadow: active
      ? "0 14px 30px rgba(0,0,0,0.16)"
      : "0 10px 24px rgba(0,0,0,0.06)",
    whiteSpace: "nowrap",
    userSelect: "none",
  });

  const topicPill = (active: boolean): React.CSSProperties => ({
    border: "1px solid rgba(0,0,0,0.10)",
    background: active ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.92)",
    borderRadius: 999,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
    color: "#111",
    whiteSpace: "nowrap",
    userSelect: "none",
  });

  const miniBtn: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
    userSelect: "none",
  };

  const selectStyle: React.CSSProperties = {
    ...miniBtn,
    padding: "8px 10px",
    fontSize: 12,
    fontWeight: 900,
    outline: "none",
    maxWidth: 230,
  };

  useEffect(() => {
    try {
      setIsPro(isProUser());
    } catch {
      setIsPro(false);
    }
  }, []);

  // Update wisdom response whenever q changes
  useEffect(() => {
    setWisdomCard(q.trim() ? getWisdomResponse(q) : null);
  }, [q]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = safeParse<Record<string, boolean>>(
      localStorage.getItem("asksolomon:favorites"),
      {}
    );
    setFavoriteKeys(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("asksolomon:favorites", JSON.stringify(favoriteKeys));
  }, [favoriteKeys]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTemplate = safeParse<ShareTemplate>(
      localStorage.getItem("asksolomon:shareTemplate"),
      "gradientModern"
    );
    setShareTemplate(savedTemplate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      "asksolomon:shareTemplate",
      JSON.stringify(shareTemplate)
    );
  }, [shareTemplate]);

  useEffect(() => {
    setPromotedProverbRef("");
  }, [q, mode, sub]);

  const setUrl = (next: { mode?: Mode; sub?: Sub | "all"; q?: string }) => {
    const nextMode = next.mode ?? mode;
    const nextSub = next.sub ?? sub;
    const nextQ = next.q ?? q;

    const params = new URLSearchParams();
    if (nextMode !== "encouragement") params.set("mode", nextMode);
    if (nextMode === "encouragement" && nextSub !== "all") {
      params.set("sub", nextSub);
    }
    if (nextQ.trim().length > 0) params.set("q", nextQ.trim());

    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/");
  };

  useEffect(() => {
    setMode(rawUrlMode);
    setSub(rawUrlSub);
    setQ(urlQ);
  }, [rawUrlMode, rawUrlSub, urlQ]);

  const favoritesCount = useMemo(
    () => Object.keys(favoriteKeys).filter((k) => favoriteKeys[k]).length,
    [favoriteKeys]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setFavPulse(true);
    const t = window.setTimeout(() => setFavPulse(false), 260);
    return () => window.clearTimeout(t);
  }, [favoritesCount]);

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((prev) => {
      const next = { ...prev };
      const alreadySaved = !!next[key];

      if (alreadySaved) {
        delete next[key];
      } else {
        next[key] = true;
        setSavedKey(key);
        window.setTimeout(() => setSavedKey(""), 900);
      }

      return next;
    });
  };

  useEffect(() => {
    if (favoritesOnly && favoritesCount === 0) {
      setFavoritesOnly(false);
    }
  }, [favoritesOnly, favoritesCount]);

  const handleCopy = async (
    item: Pick<VerseItem, "title" | "body" | "ref">,
    key: string
  ) => {
    const text = `${item.title}\n\n${item.body}\n\n${item.ref}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(""), 900);
    } catch {
      // silent
    }
  };

  const buildShareText = (item: Pick<VerseItem, "title" | "body" | "ref">) => {
    const link = "https://asksolomon.app";

    return `Ask Solomon

${item.title}

${item.body}

${item.ref}

Save this. Sit with it. Apply it today.

Get daily wisdom:
${link}`;
  };

  const handleShare = async (
    item: Pick<VerseItem, "title" | "body" | "ref">,
    keyForUi?: string
  ) => {
    const text = buildShareText(item);

    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (
          navigator as Navigator & {
            share: (data: ShareData) => Promise<void>;
          }
        ).share({
          title: "Ask Solomon",
          text,
        });
        return;
      }
    } catch {
      // ignore and fall back
    }

    try {
      await navigator.clipboard.writeText(text);
      if (keyForUi) {
        setCopiedKey(keyForUi);
        window.setTimeout(() => setCopiedKey(""), 900);
      }
    } catch {
      // silent
    }
  };
  const handleWisdomShare = async () => {
    if (!wisdomCard) return;
    const text = wisdomCard.headline + "\n\n" + wisdomCard.insight + "\n\n\u2014 Ask Solomon \u00b7 asksolomon.app";
    if (typeof navigator.share !== "undefined") {
      try { await navigator.share({ title: "Ask Solomon", text }); } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      } catch (_) { alert("Could not copy. Please try again."); }
    }
  };


  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(/\s+/).filter(Boolean);
    let line = "";
    const lines: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line ? `${line} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }

    if (line) lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * lineHeight);
    }

    return lines.length;
  };

  const measureWrappedLines = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return 0;

    let lines = 1;
    let line = words[0];

    for (let i = 1; i < words.length; i++) {
      const test = `${line} ${words[i]}`;
      if (ctx.measureText(test).width > maxWidth) {
        lines++;
        line = words[i];
      } else {
        line = test;
      }
    }

    return lines;
  };

  const roundRectPath = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  };

  const drawRoundedPanel = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: string,
    shadow = true
  ) => {
    ctx.save();
    if (shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.22)";
      ctx.shadowBlur = 26;
      ctx.shadowOffsetY = 14;
    }
    ctx.fillStyle = fill;
    roundRectPath(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.restore();
  };

  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const getTemplateStyle = (t: ShareTemplate) => {
    switch (t) {
      case "classic":
        return {
          bgA: "#f8fafc",
          bgB: "#e2e8f0",
          panelFill: "rgba(255,255,255,0.92)",
          headerText: "#0f172a",
          subHeaderText: "rgba(15,23,42,0.65)",
          verseText: "#0f172a",
          refText: "#0f172a",
          footerText: "rgba(15,23,42,0.75)",
          accent: "#0f172a",
        };
      case "dark":
        return {
          bgA: "#0b1220",
          bgB: "#111827",
          panelFill: "rgba(255,255,255,0.10)",
          headerText: "rgba(255,255,255,0.92)",
          subHeaderText: "rgba(255,255,255,0.72)",
          verseText: "rgba(255,255,255,0.94)",
          refText: "rgba(255,255,255,0.86)",
          footerText: "rgba(255,255,255,0.78)",
          accent: "rgba(255,255,255,0.90)",
        };
      case "gold":
        return {
          bgA: "#0b1020",
          bgB: "#1f2937",
          panelFill: "rgba(17,24,39,0.76)",
          headerText: "rgba(255,255,255,0.92)",
          subHeaderText: "rgba(255,255,255,0.72)",
          verseText: "rgba(255,255,255,0.95)",
          refText: "rgba(255,255,255,0.86)",
          footerText: "rgba(255,255,255,0.78)",
          accent: "#fbbf24",
        };
      case "daily":
        return {
          bgA: "#fff7ed",
          bgB: "#ffedd5",
          panelFill: "rgba(255,255,255,0.94)",
          headerText: "#7c2d12",
          subHeaderText: "rgba(124,45,18,0.70)",
          verseText: "#0f172a",
          refText: "#7c2d12",
          footerText: "rgba(124,45,18,0.85)",
          accent: "#ea580c",
        };
      case "gradientModern":
      default:
        return {
          bgA: "#0f172a",
          bgB: "#1d4ed8",
          panelFill: "rgba(255,255,255,0.92)",
          headerText: "rgba(255,255,255,0.92)",
          subHeaderText: "rgba(255,255,255,0.76)",
          verseText: "#0f172a",
          refText: "#0f172a",
          footerText: "rgba(255,255,255,0.88)",
          accent: "rgba(255,255,255,0.90)",
        };
    }
  };

  const formatTemplateLabel = (t: ShareTemplate) => {
    switch (t) {
      case "classic":
        return "Classic";
      case "dark":
        return "Dark Mode";
      case "gold":
        return "Gold Wisdom";
      case "daily":
        return "Daily Verse";
      case "gradientModern":
      default:
        return "Gradient Modern";
    }
  };

  const handleImage = async (item: Pick<VerseItem, "title" | "body" | "ref">) => {
    try {
      const W = 1080;
      const H = 1350;

      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const style = getTemplateStyle(shareTemplate);

      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, style.bgA);
      grad.addColorStop(1, style.bgB);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const padX = 96;
      const topPad = 86;
      const bottomPad = 80;
      const cardW = W - padX * 2;

      ctx.textBaseline = "top";
      ctx.fillStyle = style.headerText;
      ctx.font = "900 60px system-ui";
      ctx.fillText("Ask Solomon", padX, topPad);

      ctx.fillStyle = style.subHeaderText;
      ctx.font = "800 30px system-ui";
      ctx.fillText("Wisdom for the moment", padX, topPad + 74);

      ctx.save();
      ctx.globalAlpha = shareTemplate === "gold" ? 1 : 0.85;
      ctx.fillStyle = style.accent;
      ctx.fillRect(padX, topPad + 122, 240, 6);
      ctx.restore();

      const verse = (item.body || "").trim();
      const ref = `${item.ref}${item.title ? ` — ${item.title}` : ""}`.trim();

      const verseFont = "700 46px system-ui";
      const lineHeight = 60;
      const innerPad = 56;
      const radius = 34;

      ctx.font = verseFont;
      ctx.fillStyle = style.verseText;

      const maxTextWidth = cardW - innerPad * 2;
      const lines = Math.max(1, measureWrappedLines(ctx, verse, maxTextWidth));
      const verseBlockH = lines * lineHeight;
      const gapAfterVerse = 26;

      const refFont = "900 34px system-ui";
      const refLineH = 44;

      const panelH = innerPad + verseBlockH + gapAfterVerse + refLineH + innerPad;

      const headerBottom = topPad + 150;
      const footerTop = H - bottomPad - 90;
      const available = footerTop - headerBottom;
      const panelY = headerBottom + Math.max(24, Math.floor((available - panelH) / 2));
      const panelX = padX;

      drawRoundedPanel(ctx, panelX, panelY, cardW, panelH, radius, style.panelFill, true);

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.lineWidth = 2;
      roundRectPath(ctx, panelX, panelY, cardW, panelH, radius);
      ctx.stroke();
      ctx.restore();

      let y = panelY + innerPad;

      ctx.fillStyle = style.verseText;
      ctx.font = verseFont;

      const used = wrapText(ctx, verse, panelX + innerPad, y, maxTextWidth, lineHeight);
      y += used * lineHeight + gapAfterVerse;

      ctx.fillStyle = style.refText;
      ctx.font = refFont;
      ctx.fillText(ref, panelX + innerPad, y);

      const footerY = H - bottomPad;
      ctx.fillStyle = style.footerText;
      ctx.font = "900 30px system-ui";
      ctx.fillText("Success Secrets of Solomon", padX, footerY - 44);

      ctx.font = "800 24px system-ui";
      ctx.globalAlpha = 0.95;
      ctx.fillText("AskSolomon.app", padX, footerY);
      ctx.globalAlpha = 1;

      const safeRef = (item.ref || "verse").replace(/[^\w\-]+/g, "_");
      const filename = `ask-solomon-${safeRef}.png`;

      if (typeof navigator !== "undefined" && "share" in navigator && canvas.toBlob) {
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png")
        );

        if (blob) {
          const file = new File([blob], filename, { type: "image/png" });
          const nav = navigator as Navigator & {
            canShare?: (data?: ShareData) => boolean;
            share: (data: ShareData) => Promise<void>;
          };

          const shareData: ShareData = {
            title: "Ask Solomon",
            text: `${item.title}\n\n${item.ref}\n\nAskSolomon.app`,
            files: [file],
          };

          try {
            if (!nav.canShare || nav.canShare(shareData)) {
              await nav.share(shareData);
              return;
            }
          } catch {
            // fall through
          }
        }
      }

      const dataUrl = canvas.toDataURL("image/png");
      downloadDataUrl(dataUrl, filename);
    } catch {
      // silent
    }
  };

const buildFilteredPool = () => {
  let list = [...DATA] as VerseItem[];

  list = list.filter((item: any) => itemMode(item) === mode);

  if (mode === "encouragement" && sub !== "all") {
    list = list.filter((item: any) => itemSubs(item).includes(sub));
  }

  if (favoritesOnly) {
    list = list.filter((item) => favoriteKeys[`${item.ref}-${item.title}`]);
  }

  return list;
};

const baseResults = useMemo(() => {
  // Smart Proverbs search when user types
  if (q.trim().length > 0) {
    let found = searchProverbsScored(expandSmartTerms(q).join(" ")).map((r) => ({
      ...r.item,
      score: r.score,
      why: r.why,
    }));

    if (favoritesOnly) {
      found = found.filter((item) => favoriteKeys[`${item.ref}-${item.title}`]);
    }

    return found;
  }

  // Fallback when no query is typed
  let found = DATA.filter((item) => {
    if (item.mode !== mode) return false;
    if (sub !== "all" && item.sub !== sub) return false;
    return true;
  });

  if (favoritesOnly) {
    found = found.filter((item) => favoriteKeys[`${item.ref}-${item.title}`]);
  }

  return found;
}, [q, mode, sub, favoritesOnly, favoriteKeys]);
  const results = useMemo(() => {
    if (!todayFocusOn) return baseResults;
    if (!todayFocusKey) return [];
    return baseResults.filter((item) => `${item.ref}-${item.title}` === todayFocusKey);
  }, [baseResults, todayFocusOn, todayFocusKey]);
const topResult = useMemo(() => {
  const query = q.toLowerCase().trim();

  if (query.length === 0) return null;
  if (!results || results.length === 0) return null;

  const isBehindQuery =
    query.includes("behind") ||
    query.includes("falling behind") ||
    query.includes("comparison") ||
    query.includes("comparing") ||
    query.includes("everyone else") ||
    query.includes("not enough");

  const isDifficultPeopleQuery =
    query.includes("boss") ||
    query.includes("manager") ||
    query.includes("supervisor") ||
    query.includes("difficult") ||
    query.includes("toxic") ||
    query.includes("conflict");

  const scored = results
    .map((item) => {
      const title = item.title.toLowerCase();
      const body = item.body.toLowerCase();
      const ref = item.ref.toLowerCase();

      const tags =
        "tags" in item && Array.isArray(item.tags)
          ? item.tags.map((t) => t.toLowerCase())
          : [];

      const keywords =
        "keywords" in item && Array.isArray(item.keywords)
          ? item.keywords.map((k) => k.toLowerCase())
          : [];

      const topics =
        "topics" in item && Array.isArray(item.topics)
          ? item.topics.map((t) => t.toLowerCase())
          : [];

      const intentTags =
        "intentTags" in item && Array.isArray(item.intentTags)
          ? item.intentTags.map((t) => t.toLowerCase())
          : [];

      const moodTags =
        "moodTags" in item && Array.isArray(item.moodTags)
          ? item.moodTags.map((t) => t.toLowerCase())
          : [];

      const searchable = [
        title,
        body,
        ref,
        ...tags,
        ...keywords,
        ...topics,
        ...intentTags,
        ...moodTags,
      ].join(" ");

      let score = 0;

      for (const word of query.split(/[^a-z0-9]+/i).filter(Boolean)) {
        if (title.includes(word)) score += 10;
        if (keywords.some((k) => k.includes(word))) score += 8;
        if (tags.some((t) => t.includes(word))) score += 6;
        if (topics.some((t) => t.includes(word))) score += 6;
        if (intentTags.some((t) => t.includes(word))) score += 8;
        if (moodTags.some((t) => t.includes(word))) score += 8;
        if (body.includes(word)) score += 3;
        if (searchable.includes(word)) score += 1;
      }

      if (isBehindQuery) {
        if (
          tags.includes("discouraged") ||
          tags.includes("hope") ||
          tags.includes("direction") ||
          topics.includes("discouraged") ||
          topics.includes("hope") ||
          topics.includes("direction") ||
          intentTags.includes("discouraged") ||
          intentTags.includes("direction") ||
          moodTags.includes("discouraged") ||
          keywords.includes("discouraged") ||
          keywords.includes("keep going") ||
          keywords.includes("future") ||
          keywords.includes("not enough")
        ) {
          score += 40;
        }

        if (
          title.includes("compare") ||
          title.includes("comparison") ||
          body.includes("compare")
        ) {
          score -= 20;
        }
      }

      if (isDifficultPeopleQuery) {
        if (
          tags.includes("relationships") ||
          tags.includes("anger") ||
          tags.includes("leadership") ||
          topics.includes("relationships") ||
          topics.includes("anger") ||
          topics.includes("leadership") ||
          intentTags.includes("relationships") ||
          intentTags.includes("leadership") ||
          keywords.includes("conflict") ||
          keywords.includes("relationship conflict") ||
          keywords.includes("anger")
        ) {
          score += 35;
        }
      }

      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.item ?? results[0];
}, [q, results]);
const smartExpandedTerms = useMemo(() => {
  if (q.trim().length === 0) return [];

  const advanced = interpretQueryAdvanced(q);
  const expanded = expandSmartTerms(q);

  if (!advanced.lane) return expanded;

  return Array.from(new Set([advanced.lane, ...expanded]));
}, [q]);

const proverbMatches = useMemo<ProverbMatch[]>(() => {
  const query = q.trim();
  if (!query) return [];

  try {
    const found = asArray(searchProverbsScored(query)).slice(0, 8);

    return found
      .map((entry: any) => {
        const p = entry?.item ?? {};
        const ref = String(p?.ref ?? "");
        const text = String(p?.text ?? p?.body ?? "");
        const topics = Array.isArray(p?.topics)
          ? p.topics.map((t: any) => String(t))
          : [];

        const fallback = scoreProverbMatch(
          { ref, text, topics },
          query,
          smartExpandedTerms
        );

          const rawScore = Number(entry?.score ?? fallback.score ?? 0);

          const why =
            Array.isArray(entry?.why) && entry.why.length > 0
              ? entry.why.map((w: any) => String(w))
              : fallback.why.length > 0
              ? fallback.why
              : topics.length > 0
              ? [`Matched topics: ${topics.slice(0, 3).join(", ")}`]
              : ["Matched by Ask Solomon search"];

          return {
            ref,
            text,
            topics,
            score: rawScore,
            why,
          };
        })
        .filter((p) => p.ref && p.text)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
    } catch {
      return [];
    }
  }, [q, smartExpandedTerms]);

  const promotedProverb = useMemo<ProverbMatch | null>(() => {
    return proverbMatches.find((p) => p.ref === promotedProverbRef) || null;
  }, [proverbMatches, promotedProverbRef]);

  const relatedPromotedProverbs = useMemo<ProverbMatch[]>(() => {
    if (!promotedProverb) return [];

    const promotedTopics = new Set(
      promotedProverb.topics.map((t) => normalizeText(t))
    );

    return proverbMatches
      .filter((p) => p.ref !== promotedProverb.ref)
      .filter((p) => p.topics.some((t) => promotedTopics.has(normalizeText(t))))
      .slice(0, 3);
  }, [promotedProverb, proverbMatches]);

  const bookMatches = useMemo<BookMatch[]>(() => {
    const query = expandSmartTerms(q).join(" ");
    if (!query) return [];

    try {
      return asArray<BookMatch>(findBookMatches(query));
    } catch {
      return [];
    }
  }, [q]);

 const toggleTodaysFocus = () => {
  if (todayFocusOn) {
    setTodayFocusOn(false);
    setTodayFocusKey("");
    return;
  }

  const pool = buildFilteredPool();
  if (pool.length === 0) {
    setTodayFocusOn(true);
    setTodayFocusKey("");
    return;
  }

  const choice = pool[Math.floor(Math.random() * pool.length)];
  setTodayFocusOn(true);
  setTodayFocusKey(`${choice.ref}-${choice.title}`);
};

const rerollTodaysFocus = () => {
  const pool = buildFilteredPool();
  if (pool.length === 0) {
    setTodayFocusKey("");
    return;
  }

  const choice = pool[Math.floor(Math.random() * pool.length)];
  setTodayFocusKey(`${choice.ref}-${choice.title}`);
};

const clearAllFilters = () => {
  setQ("");
  setMode("encouragement");
  setSub("all");
  setFavoritesOnly(false);
  setTodayFocusOn(false);
  setTodayFocusKey("");
  setPromotedProverbRef("");
  setUrl({ q: "" });
};

const applyTopic = (topicQuery: string) => {
  setQ(topicQuery);
  setFavoritesOnly(false);
  setTodayFocusOn(false);
  setTodayFocusKey("");
  setPromotedProverbRef("");
  setUrl({ q: topicQuery });
};

const applySituation = (situationQuery: string) => {
  setQ(situationQuery);
  setFavoritesOnly(false);
  setTodayFocusOn(false);
  setTodayFocusKey("");
  setPromotedProverbRef("");
  setUrl({ q: situationQuery });
};
  const renderEmptyState = () => {
    if (favoritesOnly && favoritesCount === 0) {
      return (
        <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
          You haven’t saved any favorites yet. Tap ☆ on a verse to save it.
        </div>
      );
    }

    return (
      <div style={{ color: "#64748b", fontSize: 14, padding: 8, fontWeight: 800 }}>
        No matches. Try a different keyword.
      </div>
    );
  };

  return (
    <div style={outerStyle}>
      <main style={pageStyle}>
        <header style={{ marginBottom: 18 }}>
          <div style={headerRow}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 0.6,
                  color: "#64748b",
                  textTransform: "uppercase",
                }}
              >
                Ask Solomon
              </div>
              <h1
                style={{
                  margin: "6px 0 0 0",
                  fontSize: 34,
                  lineHeight: 1.05,
                  color: "#111827",
                }}
              >
                Wisdom for what you’re facing right now
              </h1>
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  color: "#334155",
                  fontWeight: 800,
                }}
              >
                Encouragement first—wisdom from Proverbs for what you’re facing right now.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={badgeStyle(isPro)}>{isPro ? "PRO" : "FREE"}</span>
              <button
                type="button"
                onClick={() => router.push("/book")}
                style={headerBtn}
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => router.push("/book-index")}
                style={headerBtn}
              >
                Book Index
              </button>
              {!isPro && (
                <button
                  type="button"
                  onClick={() => router.push("/upgrade")}
                  style={headerBtn}
                >
                  Upgrade (Lifetime)
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── HERO SECTION — shows only on empty search state ── */}
        {q.trim() === "" && (
          <div style={{
            background: 'linear-gradient(160deg, #0f0c29 0%, #1a1040 50%, #0d1b2a 100%)',
            borderRadius: 22,
            padding: '44px 32px 36px',
            marginBottom: 18,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(15,12,41,0.35)',
          }}>
            {/* Subtle glow accent */}
            <div style={{
              position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
              width: 500, height: 200,
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Eyebrow */}
            <div style={{
              fontSize: 11, fontWeight: 900, letterSpacing: 2.5,
              color: '#d4af37', textTransform: 'uppercase', marginBottom: 14,
            }}>
              Biblical Wisdom · Proverbs · Book of Solomon
            </div>

            {/* Headline */}
            <h2 style={{
              margin: '0 0 14px',
              fontSize: 'clamp(26px, 5vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: -0.5,
            }}>
              Whatever you're facing right now —<br />
              <span style={{ color: '#f5e06e' }}>Proverbs has something to say about it.</span>
            </h2>

            {/* Subheadline */}
            <p style={{
              margin: '0 auto 28px',
              maxWidth: 540,
              fontSize: 16,
              fontWeight: 600,
              color: 'rgba(220,220,240,0.78)',
              lineHeight: 1.65,
            }}>
              Type what you're feeling or going through. Ask Solomon responds with
              emotionally intelligent wisdom — rooted in Scripture, connected to real life.
            </p>

            {/* Example chips */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 10,
              justifyContent: 'center', marginBottom: 28,
            }}>
              {[
                { label: '😔 I feel like a failure', q: 'I feel like a failure' },
                { label: "😤 I can't control my anger", q: "I can't control my anger" },
                { label: "💸 I'm stressed about money", q: "I'm stressed about money" },
                { label: '💔 My marriage is struggling', q: 'My marriage is struggling' },
                { label: "😰 I'm overwhelmed", q: "I'm overwhelmed" },
                { label: '🙏 I need direction from God', q: 'I need direction from God' },
              ].map(({ label, q: chipQ }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    router.push('/?q=' + encodeURIComponent(chipQ));
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.09)',
                    border: '1px solid rgba(212,175,55,0.35)',
                    borderRadius: 999,
                    padding: '9px 16px',
                    color: 'rgba(255,255,255,0.90)',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 150ms',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Testimonials */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              marginBottom: 24,
            }}>
              {[
                { quote: "I typed \"I feel like a failure\" and could not believe how seen I felt.", name: "Marcus T." },
                { quote: "My marriage was struggling. The wisdom I got was exactly what I needed.", name: "James C." },
                { quote: "I have read a lot of devotionals. This one hits different.", name: "Renee W." },
                { quote: "I searched \"I am overwhelmed\" at 11pm and it gave me peace to sleep.", name: "DeShawn M." },
              ].map(({ quote, name }) => (
                <div key={name} style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  color: 'rgba(245,224,110,0.75)',
                  textAlign: 'center',
                  maxWidth: 420,
                  lineHeight: 1.55,
                }}>
                  &ldquo;{quote}&rdquo; <span style={{ fontStyle: 'normal', fontWeight: 800, opacity: 0.9 }}>— {name}</span>
                </div>
              ))}
            </div>


            {/* Proof bar */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap',
              marginBottom: 24,
              fontSize: 12, fontWeight: 800,
              color: 'rgba(212,175,55,0.75)',
              letterSpacing: 0.4,
            }}>
              <span>👥 1,200+ wisdom searches</span>
              <span>📖 25+ life scenarios</span>
              <span>✦ Rooted in Proverbs</span>
              <span>📚 Connected to the book</span>
              <span>⚡ Free to use</span>
            </div>

            {/* CTA arrow */}
            <div style={{
              fontSize: 13, fontWeight: 800,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 1,
            }}>
              ↓ Type what you're facing in the search below
            </div>
          </div>
        )}

        <section style={cardStyle}>
          <div
            style={{
              position: "sticky",
              top: 10,
              zIndex: 10,
              background: "rgba(248,250,252,0.88)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 18,
              padding: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {asArray(MODES).map((m: any) => {
                const modeKey = getModeKey(m);
                return (
                  <button
                    key={modeKey}
                    type="button"
                    onClick={() => {
                      setMode(modeKey);
                      setSub("all");
                      setFavoritesOnly(false);
                      setTodayFocusOn(false);
                      setTodayFocusKey("");
                      setUrl({ mode: modeKey, sub: "all" });
                    }}
                    style={pillBtn(mode === modeKey)}
                  >
                    {getModeLabel(m)}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setFavoritesOnly((v) => !v);
                  setTodayFocusOn(false);
                  setTodayFocusKey("");
                }}
                style={{
                  ...pillBtn(favoritesOnly),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  transform: favPulse ? "scale(1.05)" : "scale(1)",
                  transition: "transform 160ms ease",
                }}
                title="Show only saved favorites"
              >
                <span>⭐</span>
                <span>
                  {favoritesOnly
                    ? `Showing Favorites (${favoritesCount})`
                    : `Favorites (${favoritesCount})`}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTodaysFocus}
                style={{
                  ...pillBtn(todayFocusOn),
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  animation: todayFocusOn
                    ? "pulseGlow 1.8s ease-in-out infinite"
                    : undefined,
                }}
                title="Show one random verse from the current filter"
              >
                <span>✨</span>
                <span>{todayFocusOn ? "Today’s Focus (On)" : "Today’s Focus"}</span>
              </button>

              {todayFocusOn && (
                <button
                  type="button"
                  onClick={() => {
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
                  }}
                  style={{ ...pillBtn(false), display: "flex", gap: 8, alignItems: "center" }}
                  title="Return to normal results"
                >
                  <span>↩️</span>
                  <span>Clear Focus</span>
                </button>
              )}

              {todayFocusOn && (
                <button
                  type="button"
                  onClick={rerollTodaysFocus}
                  style={{ ...pillBtn(false), display: "flex", gap: 8, alignItems: "center" }}
                  title="Pick a different verse"
                >
                  <span>🔄</span>
                  <span>Re-roll</span>
                </button>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: "auto",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 900, color: "#334155" }}>
                  Image Template
                </span>
                <select
                  value={shareTemplate}
                  onChange={(e) => setShareTemplate(e.target.value as ShareTemplate)}
                  style={selectStyle}
                  aria-label="Select share image template"
                  title="Choose the style for Image share cards"
                >
                  <option value="gradientModern">
                    {formatTemplateLabel("gradientModern")}
                  </option>
                  <option value="classic">{formatTemplateLabel("classic")}</option>
                  <option value="dark">{formatTemplateLabel("dark")}</option>
                  <option value="gold">{formatTemplateLabel("gold")}</option>
                  <option value="daily">{formatTemplateLabel("daily")}</option>
                </select>
              </div>
            </div>

            {mode === "encouragement" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    setSub("all");
                    setTodayFocusOn(false);
                    setTodayFocusKey("");
                    setUrl({ sub: "all" });
                  }}
                  style={pillBtn(sub === "all")}
                >
                  All
                </button>

                {asArray(SUBS).map((s: any) => {
                  const subKey = getSubKey(s);
                  return (
                    <button
                      key={subKey}
                      type="button"
                      onClick={() => {
                        setSub(subKey);
                        setTodayFocusOn(false);
                        setTodayFocusKey("");
                        setUrl({ sub: subKey });
                      }}
                      style={pillBtn(sub === subKey)}
                    >
                      {getSubLabel(s)}
                    </button>
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {asArray(TOPICS).map((t: any) => {
                const topicQuery = getTopicQuery(t);
                const active = normalizeText(q) === normalizeText(topicQuery);
                return (
                  <button
                    key={getTopicKey(t)}
                    type="button"
                    onClick={() => applyTopic(topicQuery)}
                    style={topicPill(active)}
                    title={getTopicHint(t)}
                  >
                    {getTopicLabel(t)}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 0.4,
                    color: "#64748b",
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Situation Mode
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {SITUATION_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applySituation(preset.value)}
                      style={{
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "#ffffff",
                        color: "#0f172a",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                value={q}
                onChange={(e) => {
                  const val = e.target.value;
                  setQ(val);
                  setTodayFocusOn(false);
                  setTodayFocusKey("");
                  setUrl({ q: val });
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search a keyword (e.g., fear, diligence, counsel)…"
                style={{
                  flex: 1,
                  minWidth: 260,
                  border: searchFocused
                    ? "1px solid rgba(99,102,241,0.55)"
                    : "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  fontWeight: 800,
                  outline: "none",
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: searchFocused
                    ? "0 0 0 5px rgba(99,102,241,0.18), 0 12px 28px rgba(0,0,0,0.08)"
                    : "none",
                  transition: "box-shadow 140ms ease, border 140ms ease",
                }}
              />
<button
  type="button"
  onClick={clearAllFilters}
  style={{
    ...headerBtn,
    background: "rgba(99,102,241,0.10)",
    border: "1px solid rgba(99,102,241,0.18)",
    color: "#4338ca",
    fontWeight: 900,
  }}
>
  Clear Filters
</button>
</div>

{q.trim().length > 0 && (
  <div
    style={{
      marginBottom: 16,
      padding: "12px 14px",
      borderRadius: 12,
      background: wisdomCard ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
      border: "1px solid rgba(99,102,241,0.15)",
      fontSize: 14,
      color: "#4338ca",
    }}
  >
    <div style={{ fontWeight: 800, marginBottom: 4 }}>
      {wisdomCard ? "What wisdom hears in your search" : "Wisdom for this moment"}
    </div>
    <div style={{ fontWeight: 600 }}>
      {wisdomCard
        ? `I hear that you\'re feeling ${wisdomCard.emotionalState}.`
        : interpretQueryAdvanced(q).message}
    </div>
  </div>
)}

            {wisdomCard && (
              <div
                style={{
                  marginBottom: 20,
                  padding: "20px 22px",
                  borderRadius: 18,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(16,185,129,0.06) 100%)",
                  border: "1px solid rgba(99,102,241,0.18)",
                  boxShadow: "0 4px 18px rgba(99,102,241,0.08)",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 0.8, color: "#6366f1", textTransform: "uppercase", marginBottom: 10 }}>
                  What wisdom hears
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 8 }}>
                  {wisdomCard.headline}
                </div>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 12, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color: "#4338ca" }}>What I hear: </span>
                  {wisdomCard.emotionalState}
                </div>
                <div style={{ fontSize: 14, color: "#1f2937", marginBottom: 12, lineHeight: 1.7, fontStyle: "italic" }}>
                  {wisdomCard.insight}
                </div>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 10, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>Reflect: </span>
                  {wisdomCard.reflection}
                </div>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: wisdomCard.bookConnection ? 12 : 0, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>One step: </span>
                  {wisdomCard.nextStep}
                </div>
{wisdomCard.bookConnection && (
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(99,102,241,0.15)",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 900, color: "#6366f1", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
                  📖 In the Book
                </div>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 10, lineHeight: 1.5 }}>
                  {wisdomCard.bookConnection}
                </div>
                <a
                  href="/book-index"
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6366f1",
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    textDecoration: "none",
                  }}
                >
                  Explore Topic in Book Index →
                </a>
              </div>
            )}
              </div>
            )}

{/* Email Capture — show for free users, after search results */}
{!isProUser() && q.trim().length > 0 && (
  <div style={{
    background: 'linear-gradient(135deg, #1a1040 0%, #0d1b2a 100%)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '12px',
    padding: '24px 28px',
    marginTop: '20px',
    marginBottom: '24px',
    textAlign: 'center',
  }}>
    <div style={{ fontSize: '20px', marginBottom: '6px' }}>📖
                  {/* Share this wisdom */}
                  <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    <button
                      type="button"
                      onClick={handleWisdomShare}
                      style={{
                        background: "none",
                        border: "1px solid rgba(212,175,55,0.5)",
                        borderRadius: 20,
                        padding: "8px 18px",
                        color: "#d4af37",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {shareCopied ? "\u2713 Copied!" : "\uD83D\uDCE4 Share this wisdom"}
                    </button>
                  </div>
</div>
    <div style={{ color: '#f5e06e', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
      Get a free weekly wisdom verse
    </div>
    <div style={{ color: 'rgba(220,200,140,0.8)', fontSize: '13px', marginBottom: '16px' }}>
      One verse. One insight. Delivered every week from Proverbs.
    </div>
    {emailStatus === 'success' ? (
      <div style={{ color: '#6ee7b7', fontWeight: 600, fontSize: '15px' }}>
        ✓ You're on the list! Check your inbox.
      </div>
    ) : (
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setEmailStatus('sending')
          try {
            const res = await fetch('/api/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({ email: emailInput }),
            })
            if (res.ok) { setEmailStatus('success') }
            else { setEmailStatus('error') }
          } catch { setEmailStatus('error') }
        }}
        style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(212,175,55,0.4)',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontSize: '14px',
            minWidth: '220px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={emailStatus === 'sending'}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: emailStatus === 'sending' ? '#888' : '#d4af37',
            color: '#1a1040',
            fontWeight: 700,
            fontSize: '14px',
            border: 'none',
            cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
          }}
        >
          {emailStatus === 'sending' ? 'Sending…' : 'Subscribe Free'}
        </button>
      </form>
    )}
    {emailStatus === 'error' && (
      <div style={{ color: '#f87171', fontSize: '13px', marginTop: '8px' }}>
        Something went wrong. Please try again.
      </div>
    )}
  </div>
)}

{q.trim().length > 0 && smartExpandedTerms.length > 1 && (
  <div style={{ marginTop: 10 }}>
    <div style={{ fontSize: 11, fontWeight: 900, color: "#64748b", marginBottom: 6 }}>
            Smart Topic Mapping
    </div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {smartExpandedTerms.slice(0, 8).map((term) => (
        <button
          key={term}
          type="button"
          onClick={() => applyTopic(term)}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(99,102,241,0.14)",
            background: "rgba(99,102,241,0.08)",
            fontWeight: 800,
            fontSize: 11,
            cursor: "pointer",
            color: "#312e81",
          }}
        >
          {term}
        </button>
      ))}
    </div>
  </div>
)}
            {mode === "encouragement" && sub !== "all" && subCommentary[sub as Sub] && (
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "rgba(255,255,255,0.75)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 6 }}>
                  Solomon’s note
                </div>
                <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>
                  {subCommentary[sub as Sub]}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 10, fontSize: 12, color: "#64748b", fontWeight: 900 }}>
              Showing {results.length} result{results.length === 1 ? "" : "s"}
            </div>
{topResult && (
  <div
    style={{
      marginBottom: 16,
      padding: "14px 16px",
      borderRadius: 16,
      background: "rgba(0,0,0,0.04)",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 900,
        color: "#64748b",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      This may speak to you
    </div>

    <div
      style={{
        fontSize: 17,
        fontWeight: 900,
        color: "#111827",
        marginBottom: 8,
      }}
    >
      {topResult.title || "A word for you"}
    </div>

    <div
      style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: "#334155",
        fontWeight: 700,
        marginBottom: 8,
      }}
    >
    {topResult.body || ("text" in topResult ? topResult.text : "")}
    </div>

    <div
      style={{
        fontSize: 12,
        color: "#64748b",
        fontWeight: 900,
      }}
    >
      {topResult.ref}
    </div>
  </div>
)}
            {q.trim().length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 8 }}>
                  Book Matches
                </div>

                {isPro ? (
                  bookMatches.length === 0 ? (
                    <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800 }}>
                      No book matches yet for “{q.trim()}”.
                    </div>
                  ) : (
                    <div style={{ display: "grid", gap: 10 }}>
                      {bookMatches.map((m: any, idx: number) => (
                        <div
                          key={`${renderBookMatchTitle(m)}-${idx}`}
                          style={{
                            background: "rgba(255,255,255,0.85)",
                            border: "1px solid rgba(0,0,0,0.08)",
                            borderRadius: 16,
                            padding: 14,
                            boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                          }}
                        >
                          <div style={{ fontWeight: 900, fontSize: 15, color: "#111" }}>
                            {renderBookMatchTitle(m)}
                          </div>

                          {renderBookMatchLine(m) ? (
                            <div
                              style={{
                                marginTop: 6,
                                color: "#334155",
                                fontWeight: 800,
                                fontSize: 13,
                              }}
                            >
                              {renderBookMatchLine(m)}
                            </div>
                          ) : null}

                          {renderBookMatchMeta(m) ? (
                            <div
                              style={{
                                marginTop: 8,
                                color: "#64748b",
                                fontWeight: 900,
                                fontSize: 12,
                              }}
                            >
                              {renderBookMatchMeta(m)}
                            </div>
                          ) : null}

                          <div style={{ marginTop: 10 }}>
                            <button
                              type="button"
                              onClick={() => router.push("/book")}
                              style={{
                                border: "1px solid rgba(0,0,0,0.10)",
                                background: "rgba(17,24,39,0.92)",
                                color: "#fff",
                                borderRadius: 14,
                                padding: "10px 12px",
                                cursor: "pointer",
                                fontWeight: 900,
                                fontSize: 13,
                              }}
                            >
                              Open Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  /* Free user: tease the book match — show title/chapter/excerpt blurred, then CTA */
                  <div style={{ display: "grid", gap: 10 }}>
                    {bookMatches.length === 0 ? (
                      <div style={{
                        background: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(212,175,55,0.25)",
                        borderRadius: 16,
                        padding: 18,
                        boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 22, marginBottom: 8 }}>📚</div>
                        <div style={{ fontWeight: 900, fontSize: 14, color: "#111", marginBottom: 6 }}>
                          Solomon wrote about this
                        </div>
                        <div style={{ fontSize: 13, color: "#475569", fontWeight: 600, marginBottom: 14, lineHeight: 1.5 }}>
                          Unlock <em>Success Secrets of Solomon</em> to read the exact chapters that speak to what you&apos;re facing.
                        </div>
                        <button
                          type="button"
                          onClick={() => router.push("/upgrade")}
                          style={{
                            background: "linear-gradient(135deg, #1a1040 0%, #0d1b2a 100%)",
                            border: "1px solid rgba(212,175,55,0.4)",
                            color: "#f5e06e",
                            borderRadius: 12,
                            padding: "11px 20px",
                            cursor: "pointer",
                            fontWeight: 900,
                            fontSize: 13,
                            letterSpacing: 0.3,
                          }}
                        >
                          📖 Unlock the Book — $29 Lifetime
                        </button>
                      </div>
                    ) : bookMatches.slice(0, 2).map((m: any, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          border: "1px solid rgba(212,175,55,0.3)",
                          borderRadius: 16,
                          overflow: "hidden",
                          boxShadow: "0 10px 26px rgba(0,0,0,0.07)",
                          position: "relative",
                        }}
                      >
                        {/* Visible header — chapter + title */}
                        <div style={{ padding: "14px 14px 10px" }}>
                          <div style={{
                            fontSize: 11, fontWeight: 900, color: "#d4af37",
                            textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4,
                          }}>
                            📖 {renderBookMatchMeta(m) || "In the Book"}
                          </div>
                          <div style={{ fontWeight: 900, fontSize: 15, color: "#111", marginBottom: 8 }}>
                            {renderBookMatchTitle(m)}
                          </div>

                          {/* Blurred excerpt tease */}
                          {renderBookMatchLine(m) && (
                            <div style={{ position: "relative" }}>
                              <div style={{
                                fontSize: 13, color: "#334155", lineHeight: 1.6,
                                fontStyle: "italic", fontWeight: 600,
                                filter: "blur(4px)",
                                userSelect: "none",
                                pointerEvents: "none",
                              }}>
                                {renderBookMatchLine(m)}
                              </div>
                              <div style={{
                                position: "absolute", inset: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <span style={{
                                  background: "rgba(255,255,255,0.9)",
                                  border: "1px solid rgba(212,175,55,0.35)",
                                  borderRadius: 8,
                                  padding: "3px 10px",
                                  fontSize: 11, fontWeight: 900, color: "#92400e",
                                  letterSpacing: 0.5,
                                }}>
                                  🔒 Unlock to read
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* CTA strip */}
                        <div style={{
                          background: "linear-gradient(135deg, #1a1040 0%, #0d1b2a 100%)",
                          padding: "12px 14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                          flexWrap: "wrap",
                        }}>
                          <div style={{ fontSize: 12, color: "rgba(245,224,110,0.85)", fontWeight: 700, lineHeight: 1.4 }}>
                            Read the full chapter inside the book
                          </div>
                          <button
                            type="button"
                            onClick={() => router.push("/upgrade?ref=book-match")}
                            style={{
                              background: "#d4af37",
                              border: "none",
                              color: "#1a1040",
                              borderRadius: 10,
                              padding: "8px 14px",
                              cursor: "pointer",
                              fontWeight: 900,
                              fontSize: 12,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Unlock — $29 Lifetime
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {q.trim().length > 0 && proverbMatches.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 8 }}>
                  Proverbs Insight
                </div>

                <div
                  style={{
                    marginBottom: 10,
                    fontSize: 12,
                    color: "#64748b",
                    fontWeight: 800,
                  }}
                >
                  A stronger Proverbs match for what you searched.
                </div>

                {(() => {
                  const featured = proverbMatches[0];
                  const featuredKey = `proverb-${featured.ref}`;
                  const featuredFav = !!favoriteKeys[featuredKey];
                  const featuredCopied = copiedKey === featuredKey;

                  const featuredTitle =
                    featured.topics && featured.topics.length > 0
                      ? featured.topics[0].charAt(0).toUpperCase() +
                        featured.topics[0].slice(1)
                      : "Proverbs Insight";

                  const featuredItem = {
                    title: featuredTitle,
                    body: featured.text,
                    ref: featured.ref,
                  } as VerseItem;

                  return (
                    <div
                      style={{
                        ...softCardStyle,
                        border: "1px solid rgba(99,102,241,0.20)",
                        boxShadow: "0 18px 44px rgba(0,0,0,0.10)",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,0.96))",
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "6px 10px",
                              borderRadius: 999,
                              background: "rgba(99,102,241,0.08)",
                              color: "#4338ca",
                              fontWeight: 900,
                              fontSize: 11,
                              marginBottom: 10,
                            }}
                          >
                            Best Proverbs Match
                          </div>

                          <div style={{ fontWeight: 900, fontSize: 18, color: "#111" }}>
                            {featuredTitle}
                          </div>

                          <div
                            style={{
                              marginTop: 8,
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "#111",
                              fontWeight: 650,
                            }}
                          >
                            {featured.text}
                          </div>

                          <div
                            style={{
                              marginTop: 10,
                              fontSize: 12,
                              color: "#64748b",
                              fontWeight: 700,
                            }}
                          >
                            Save this. Sit with it. Apply it today.
                          </div>

                          <div
                            style={{
                              marginTop: 10,
                              fontSize: 12,
                              color: "#64748b",
                              fontWeight: 900,
                            }}
                          >
                            {featured.ref}
                          </div>

                          {featured.why?.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 900,
                                  color: "#64748b",
                                  marginBottom: 6,
                                }}
                              >
                                Why this matched
                              </div>
                              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {featured.why.map((reason) => (
                                  <span
                                    key={reason}
                                    style={{
                                      padding: "6px 10px",
                                      borderRadius: 999,
                                      border: "1px solid rgba(0,0,0,0.08)",
                                      background: "rgba(255,255,255,0.92)",
                                      fontWeight: 800,
                                      fontSize: 11,
                                      color: "#334155",
                                    }}
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            alignItems: "flex-end",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFavorite(featuredKey)}
                            style={miniBtn}
                            title={featuredFav ? "Saved" : "Save this verse"}
                            aria-label={featuredFav ? "Saved" : "Save this verse"}
                          >
                            {featuredFav ? "★" : "☆"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(featuredItem, featuredKey)}
                            style={{ ...miniBtn, fontSize: 12 }}
                            title="Copy verse"
                          >
                            {featuredCopied ? "Copied" : "Copy"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShare(featuredItem, featuredKey)}
                            style={{ ...miniBtn, fontSize: 12 }}
                            title="Share this verse"
                          >
                            Share
                          </button>

                          <button
                            type="button"
                            onClick={() => handleImage(featuredItem)}
                            style={{
                              ...miniBtn,
                              fontSize: 12,
                              background: "rgba(99,102,241,0.10)",
                              border: "1px solid rgba(99,102,241,0.18)",
                            }}
                            title="Create a share image"
                          >
                            Image
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setPromotedProverbRef(
                                promotedProverbRef === featured.ref ? "" : featured.ref
                              )
                            }
                            style={{
                              ...miniBtn,
                              fontSize: 12,
                              background: "rgba(99,102,241,0.10)",
                              border: "1px solid rgba(99,102,241,0.18)",
                              color: "#4338ca",
                            }}
                            title="Open full card"
                          >
                            {promotedProverbRef === featured.ref ? "Close" : "Open"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {proverbMatches.length > 1 && (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 900, color: "#111", marginBottom: 8 }}>
                      More Proverbs
                    </div>

                    <div style={{ display: "grid", gap: 10 }}>
                      {proverbMatches.slice(1).map((p) => {
                        const proverbKey = `proverb-${p.ref}`;
                        const isFav = !!favoriteKeys[proverbKey];
                        const isCopied = copiedKey === proverbKey;
                        const isPromoted = promotedProverbRef === p.ref;

                        const proverbTitle =
                          p.topics && p.topics.length > 0
                            ? p.topics[0].charAt(0).toUpperCase() + p.topics[0].slice(1)
                            : "More Proverbs";

                        const proverbItem = {
                          title: proverbTitle,
                          body: p.text,
                          ref: p.ref,
                        } as VerseItem;

                        if (isPromoted) {
                          return (
                            <div
                              key={p.ref}
                              style={{
                                ...softCardStyle,
                                border: "1px solid rgba(99,102,241,0.18)",
                                boxShadow: "0 18px 44px rgba(0,0,0,0.10)",
                                background:
                                  "linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,0.96))",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: 10,
                                }}
                              >
                                <div style={{ flex: 1 }}>
                                  <div
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 8,
                                      padding: "6px 10px",
                                      borderRadius: 999,
                                      background: "rgba(99,102,241,0.08)",
                                      color: "#4338ca",
                                      fontWeight: 900,
                                      fontSize: 11,
                                      marginBottom: 10,
                                    }}
                                  >
                                    From Proverbs Search
                                  </div>

                                  <div style={{ fontWeight: 900, fontSize: 18, color: "#111" }}>
                                    {proverbTitle}
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 8,
                                      fontSize: 15,
                                      lineHeight: 1.6,
                                      color: "#111",
                                      fontWeight: 650,
                                    }}
                                  >
                                    {p.text}
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 10,
                                      fontSize: 12,
                                      color: "#64748b",
                                      fontWeight: 700,
                                    }}
                                  >
                                    Save this. Sit with it. Apply it today.
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 10,
                                      fontSize: 12,
                                      color: "#64748b",
                                      fontWeight: 900,
                                    }}
                                  >
                                    {p.ref}
                                  </div>

                                  {p.why?.length > 0 && (
                                    <div style={{ marginTop: 10 }}>
                                      <div
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 900,
                                          color: "#64748b",
                                          marginBottom: 6,
                                        }}
                                      >
                                        Why this matched
                                      </div>
                                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {p.why.map((reason) => (
                                          <span
                                            key={reason}
                                            style={{
                                              padding: "6px 10px",
                                              borderRadius: 999,
                                              border: "1px solid rgba(0,0,0,0.08)",
                                              background: "rgba(255,255,255,0.92)",
                                              fontWeight: 800,
                                              fontSize: 11,
                                              color: "#334155",
                                            }}
                                          >
                                            {reason}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleFavorite(proverbKey)}
                                    style={miniBtn}
                                    title={isFav ? "Saved" : "Save this verse"}
                                    aria-label={isFav ? "Saved" : "Save this verse"}
                                  >
                                    {isFav ? "★" : "☆"}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleCopy(proverbItem, proverbKey)}
                                    style={{ ...miniBtn, fontSize: 12 }}
                                    title="Copy verse"
                                  >
                                    {isCopied ? "Copied" : "Copy"}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleShare(proverbItem, proverbKey)}
                                    style={{ ...miniBtn, fontSize: 12 }}
                                    title="Share this verse"
                                  >
                                    Share
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleImage(proverbItem)}
                                    style={{
                                      ...miniBtn,
                                      fontSize: 12,
                                      background: "rgba(99,102,241,0.10)",
                                      border: "1px solid rgba(99,102,241,0.18)",
                                    }}
                                    title="Create a share image"
                                  >
                                    Image
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setPromotedProverbRef("")}
                                    style={{
                                      ...miniBtn,
                                      fontSize: 12,
                                      background: "rgba(99,102,241,0.10)",
                                      border: "1px solid rgba(99,102,241,0.18)",
                                      color: "#4338ca",
                                    }}
                                    title="Collapse full card"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>

                              {relatedPromotedProverbs.length > 0 && (
                                <div style={{ marginTop: 14 }}>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 900,
                                      color: "#64748b",
                                      marginBottom: 8,
                                    }}
                                  >
                                    Related Proverbs
                                  </div>

                                  <div style={{ display: "grid", gap: 8 }}>
                                    {relatedPromotedProverbs.map((related) => (
                                      <button
                                        key={related.ref}
                                        type="button"
                                        onClick={() => setPromotedProverbRef(related.ref)}
                                        style={{
                                          textAlign: "left",
                                          border: "1px solid rgba(0,0,0,0.08)",
                                          background: "rgba(255,255,255,0.92)",
                                          borderRadius: 14,
                                          padding: 12,
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontWeight: 900,
                                            fontSize: 13,
                                            color: "#111",
                                          }}
                                        >
                                          {related.ref}
                                        </div>
                                        <div
                                          style={{
                                            marginTop: 6,
                                            color: "#334155",
                                            fontWeight: 800,
                                            fontSize: 13,
                                            lineHeight: 1.5,
                                          }}
                                        >
                                          {related.text}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div
                            key={p.ref}
                            className="verseCard"
                            style={softCardStyle}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 900, fontSize: 15, color: "#111" }}>
                                  {proverbTitle}
                                </div>
                                <div
                                  style={{
                                    marginTop: 8,
                                    color: "#334155",
                                    fontWeight: 800,
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {p.text}
                                </div>
                                <div
                                  style={{
                                    marginTop: 8,
                                    fontSize: 12,
                                    color: "#64748b",
                                    fontWeight: 900,
                                  }}
                                >
                                  {p.ref}
                                </div>

                                {p.why?.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 6,
                                      flexWrap: "wrap",
                                      marginTop: 8,
                                    }}
                                  >
                                    {p.why.slice(0, 3).map((reason) => (
                                      <span
                                        key={reason}
                                        style={{
                                          padding: "5px 8px",
                                          borderRadius: 999,
                                          background: "rgba(99,102,241,0.08)",
                                          color: "#4338ca",
                                          fontWeight: 800,
                                          fontSize: 11,
                                          border: "1px solid rgba(99,102,241,0.14)",
                                        }}
                                      >
                                        {reason}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 8,
                                  alignItems: "flex-end",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => setPromotedProverbRef(p.ref)}
                                  style={{
                                    ...miniBtn,
                                    background: "rgba(99,102,241,0.10)",
                                    border: "1px solid rgba(99,102,241,0.18)",
                                    color: "#4338ca",
                                  }}
                                  title="Open full card"
                                >
                                  Open
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleFavorite(proverbKey)}
                                  style={miniBtn}
                                  title={isFav ? "Saved" : "Save this verse"}
                                  aria-label={isFav ? "Saved" : "Save this verse"}
                                >
                                  {isFav ? "★" : "☆"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleCopy(proverbItem, proverbKey)}
                                  style={{ ...miniBtn, fontSize: 12 }}
                                  title="Copy verse"
                                >
                                  {isCopied ? "Copied" : "Copy"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            <div style={{ display: "grid", gap: 12 }}>
              {results.length === 0
                ? renderEmptyState()
                : results.map((item) => {
                    const key = `${item.ref}-${item.title}`;
                    const isFav = !!favoriteKeys[key];
                    const isCopied = copiedKey === key;
                    const isSavedFlash = savedKey === key;

                    return (
                      <div
                        key={key}
                        className="verseCard"
                        style={{
                          ...softCardStyle,
                          transform: isSavedFlash ? "scale(1.01)" : "scale(1)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 900, fontSize: 18, color: "#111" }}>
                              {item.title}
                            </div>

                            <div
                              style={{
                                marginTop: 8,
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "#111827",
                                fontWeight: 650,
                              }}
                            >
                              {item.body}
                            </div>

                            <div
                              style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: "#64748b",
                                fontWeight: 700,
                              }}
                            >
                              Save this. Sit with it. Apply it today.
                            </div>

                            <div
                              style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: "#64748b",
                                fontWeight: 900,
                              }}
                            >
                              {item.ref}
                            </div>

                            {Array.isArray((item as any).topics) &&
                              (item as any).topics.length > 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap",
                                    marginTop: 10,
                                  }}
                                >
                                  {(item as any).topics.slice(0, 6).map((topic: string) => (
                                    <button
                                      key={topic}
                                      type="button"
                                      onClick={() => applyTopic(topic)}
                                      style={{
                                        padding: "6px 10px",
                                        borderRadius: 999,
                                        border: "1px solid rgba(0,0,0,0.08)",
                                        background: "rgba(255,255,255,0.92)",
                                        fontWeight: 800,
                                        fontSize: 11,
                                        color: "#334155",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {topic}
                                    </button>
                                  ))}
                                </div>
                              )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                              alignItems: "flex-end",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => toggleFavorite(key)}
                              style={miniBtn}
                              title={isFav ? "Saved" : "Save this verse"}
                            >
                              {isFav ? "★" : "☆"}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopy(item, key)}
                              style={{ ...miniBtn, fontSize: 12 }}
                              title="Copy verse"
                            >
                              {isCopied ? "Copied" : "Copy"}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleShare(item, key)}
                              style={{ ...miniBtn, fontSize: 12 }}
                              title="Share this verse"
                            >
                              Share
                            </button>

                            <button
                              type="button"
                              onClick={() => handleImage(item)}
                              style={{
                                ...miniBtn,
                                fontSize: 12,
                                background: "rgba(99,102,241,0.10)",
                                border: "1px solid rgba(99,102,241,0.18)",
                              }}
                              title="Create a share image"
                            >
                              Image
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>

                {/* Book callout — connects app to physical book for book readers */}
        <section style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 16px 48px",
        }}>
          <div style={{
            background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 60%, #0d1b2a 100%)",
            borderRadius: 20,
            padding: "32px 28px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(15,12,41,0.25)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 900, letterSpacing: 2.5,
              color: "#d4af37", textTransform: "uppercase", marginBottom: 10,
            }}>
              Already have the book?
            </div>
            <h2 style={{
              margin: "0 0 12px",
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 900, lineHeight: 1.15, color: "#fff",
            }}>
              <em>Success Secrets of Solomon</em> and this app were built together.
            </h2>
            <p style={{
              margin: "0 auto 24px",
              maxWidth: 460,
              fontSize: 14, fontWeight: 600,
              color: "rgba(220,220,240,0.75)",
              lineHeight: 1.65,
            }}>
              The app is the living index to the book. Every search shows you exactly which
              devotional and page speaks to what you&apos;re facing &mdash; so you can go
              straight to the wisdom, not just read about it.
            </p>
            <div style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: 10, marginBottom: 24,
            }}>
              {[
                "Anger → pp. 126–128",
                "Purpose → pp. 146–150",
                "Money → pp. 88–92",
                "Fear → pp. 77–80",
                "Relationships → pp. 130–134",
              ].map((tag) => (
                <span key={tag} style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  borderRadius: 20,
                  padding: "5px 12px",
                  fontSize: 12, fontWeight: 700,
                  color: "rgba(245,224,110,0.85)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push("/upgrade")}
              style={{
                display: "inline-block",
                padding: "13px 28px",
                borderRadius: 12,
                background: "#d4af37",
                color: "#1a1040",
                fontWeight: 900,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              Unlock the book inside the app &mdash; $29
            </button>
            <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
              Same price as the hardcover. Instant access. One-time payment.
            </div>
          </div>
        </section>

<style jsx global>{`
          @keyframes pulseGlow {
            0% {
              box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
            }
            50% {
              box-shadow: 0 18px 44px rgba(99, 102, 241, 0.18);
            }
            100% {
              box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
            }
          }

          .verseCard {
            animation: fadeInUp 180ms ease both;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}</style>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <PageInner />
    </Suspense>
  );
}
