// app/api/auth/send-link/route.ts
// Sends magic link email to Pro subscriber for cross-device access.
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
      token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
});

export async function POST(req: Request) {
      const { email } = await req.json();
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
      if (!email || !email.includes("@")) return Response.json({ error: "Invalid email" }, { status: 400 });
      const norm = email.toLowerCase().trim();
      const isPro = await redis.get(`pro:${norm}`);
      if (!isPro) return Response.json({ ok: true });
      const token = randomBytes(32).toString("hex");
      await redis.set(`magic:${token}`, norm, { ex: 900 });
      const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
      const mlKey = process.env.MAILERLITE_API_KEY;
      if (mlKey) {
              await fetch("https://connect.mailerlite.com/api/emails", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${mlKey}` },
                        body: JSON.stringify({
                                    from: { email: "hello@asksolomon.app", name: "Ask Solomon" },
                                    to: [{ email: norm }],
                                    subject: "Your Ask Solomon login link",
                                    html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0d1b2a;color:#fff;border-radius:8px"><div style="font-size:22px;font-weight:800;color:#d4af37;margin-bottom:8px">Ask Solomon</div><div style="font-size:15px;color:rgba(255,255,255,0.85);margin-bottom:24px">Click below to activate Pro on this device. Expires in 15 minutes.</div><a href="${link}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#d4af37,#f5e06e);color:#0d1b2a;font-weight:800;font-size:15px;border-radius:6px;text-decoration:none">Activate Pro Access</a><div style="margin-top:20px;font-size:12px;color:rgba(255,255,255,0.4)">Single-use link. Ignore if you did not request this.</div></div>`,
                        }),
              });
      }
      return Response.json({ ok: true });
}
