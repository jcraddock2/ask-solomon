// app/api/auth/send-link/route.ts
// Sends a magic link email so a Pro subscriber can activate any device.
// POST { email: string }

import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const { email } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";

  if (!email || !email.includes("@")) {
        return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();
    const isPro = await kv.get<string>(`pro:${normalizedEmail}`);

  // Always return ok to prevent email enumeration
  if (!isPro) return Response.json({ ok: true });

  const token = randomBytes(32).toString("hex");
    await kv.set(`magic:${token}`, normalizedEmail, { ex: 900 }); // 15min TTL

  const magicLink = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(normalizedEmail)}`;

  const mlApiKey = process.env.MAILERLITE_API_KEY;
    if (mlApiKey) {
          await fetch("https://connect.mailerlite.com/api/emails", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${mlApiKey}` },
                  body: JSON.stringify({
                            from: { email: "hello@asksolomon.app", name: "Ask Solomon" },
                            to: [{ email: normalizedEmail }],
                            subject: "Your Ask Solomon login link",
                            html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0d1b2a;color:#fff;border-radius:8px"><div style="font-size:22px;font-weight:800;color:#d4af37;margin-bottom:8px">Ask Solomon</div><div style="font-size:16px;color:rgba(255,255,255,0.85);margin-bottom:24px">Click below to activate your Pro access on this device. Link expires in 15 minutes.</div><a href="${magicLink}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#f5e06e);color:#0d1b2a;font-weight:800;font-size:16px;border-radius:6px;text-decoration:none">Activate Pro Access</a><div style="margin-top:24px;font-size:12px;color:rgba(255,255,255,0.4)">If you did not request this, ignore this email. Link is single-use.</div></div>`,
                  }),
          });
    }

  return Response.json({ ok: true });
}
