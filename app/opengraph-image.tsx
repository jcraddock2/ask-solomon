import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ask Solomon - Biblical Wisdom for Life's Real Moments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1628 0%, #0d1b2a 50%, #1a2e42 100%)",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold border top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#d4af37", display: "flex" }} />
        {/* Gold border bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: "#d4af37", display: "flex" }} />

        {/* Star of David symbol */}
        <div
          style={{
            width: "90px",
            height: "90px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(212,175,55,0.5)",
            borderRadius: "50%",
            color: "rgba(212,175,55,0.6)",
            fontSize: "48px",
          }}
        >
          ✡
        </div>

        {/* App name */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: "900",
            color: "#d4af37",
            letterSpacing: "-2px",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          Ask Solomon
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#f5e06e",
            fontStyle: "italic",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          Biblical Wisdom for Life&apos;s Real Moments
        </div>

        {/* Divider */}
        <div style={{ width: "120px", height: "2px", background: "#d4af37", marginBottom: "20px", display: "flex" }} />

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(245,224,110,0.75)",
            letterSpacing: "1px",
            marginBottom: "32px",
            display: "flex",
          }}
        >
          Powered by the Book of Proverbs  ·  Paired with Success Secrets of Solomon
        </div>

        {/* URL pill */}
        <div
          style={{
            background: "rgba(212,175,55,0.15)",
            border: "1px solid rgba(212,175,55,0.5)",
            borderRadius: "999px",
            padding: "10px 32px",
            fontSize: "22px",
            color: "#d4af37",
            letterSpacing: "1px",
            display: "flex",
          }}
        >
          asksolomon.app
        </div>
      </div>
    ),
    { ...size }
  );
}
