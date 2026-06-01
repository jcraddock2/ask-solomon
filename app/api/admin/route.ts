// app/api/admin/route.ts
// Admin endpoint: manually grant Pro access + send magic link.
// Protected by ADMIN_SECRET env var. POST { secret, email }
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
    token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
  });

export async function POST(req: Request) {
    const { secret, email } = await req.json();
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || secret !== adminSecret) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
    if (!email || !email.includes("@")) {
          return Response.json({ error: "Invalid email" }, { status: 400 });
        }
    const norm = email.toLowerCase().trim();
    // Set Pro flag in Redis permanently
    await redis.set(`pro:${norm}`, "1");
    // Generate magic link token (15 min)
    const token = randomBytes(32).toString("hex");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
    await redis.set(`magic:${token}`, norm, { ex: 900 });
    const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
    // Send magic link email via MailerLite
    const mlKey = process.env.MAILERLITE_API_KEY;
    let emailSent = false;
    if (mlKey) {
          const res = await fetch("https://connect.mailerlite.com/api/emails", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${mlKey}` },
                  body: JSON.stringify({
                            from: { email: "hello@asksolomon.app", name: "Ask Solomon" },
                            to: [{ email: norm }],
                            subject: "Your Ask Solomon access link",
                            html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0d1b2a;color:#fff;border-radius:8px"><div style="font-size:22px;font-weight:800;color:#d4af37;margin-bottom:8px">Ask Solomon</div><h2 style="color:#fff;margin-bottom:8px">Welcome to Pro!</h2><p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;margin-bottom:24px">Your access is confirmed. Click below to activate Pro on any device — no password needed.</p><a href="${link}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#d4af37,#f5e06e);color:#0d1b2a;font-weight:800;font-size:15px;border-radius:6px;text-decoration:none">Access Ask Solomon</a><p style="margin-top:20px;font-size:12px;color:rgba(255,255,255,0.4)">This link expires in 15 minutes. After clicking, your browser remembers you for 10 years.</p></div>`,
                          }),
                });
          emailSent = res.ok;
        }
    return Response.json({ ok: true, proSet: true, emailSent, link });
  }
