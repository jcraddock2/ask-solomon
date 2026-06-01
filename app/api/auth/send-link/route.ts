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
        await redis.set(`magic:${token}`, norm, { ex: 604800 });
        const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
        const mlKey = process.env.MAILERLITE_API_KEY;
        if (mlKey) {
                  const emailRes = await fetch("https://connect.mailerlite.com/api/transactional-emails", {
                              method: "POST",
                              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${mlKey}` },
                              body: JSON.stringify({
                                            from: { email: "hello@asksolomon.app", name: "Ask Solomon" },
                                            to: [{ email: norm }],
                                            subject: "Your Ask Solomon login link",
                                            html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:8px"><h2 style="color:#1a1a1a;margin-bottom:8px">Your Ask Solomon access link</h2><p style="color:#444;font-size:16px;line-height:1.6">Click the button below to sign in on any device — no password needed.</p><a href="${link}" style="display:inline-block;margin:24px 0;padding:14px 28px;background:#b8860b;color:#fff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold">Access Ask Solomon</a><p style="color:#888;font-size:13px">This link expires in 7 days.</p></div>`,
                              }),
                  });
                  if (!emailRes.ok) {
                              const errText = await emailRes.text();
                              console.error("MailerLite send-link email failed:", emailRes.status, errText);
                              return Response.json({ error: "Email send failed" }, { status: 500 });
                  }
        } else {
                  console.error("MAILERLITE_API_KEY is not set — magic link email not sent for:", norm);
        }
        return Response.json({ ok: true });
}
