// app/api/admin/route.ts
// Admin endpoint: manually grant Lifetime Access + send magic link via Resend.
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
    await redis.set(`pro:${norm}`, "1");
    const token = randomBytes(32).toString("hex");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
    await redis.set(`magic:${token}`, norm, { ex: 604800 });
    const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
    let emailSent = false;
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
        const from = process.env.RESEND_FROM || "Ask Solomon <onboarding@resend.dev>";
        const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a1a;">
        <h2 style="color:#1a1a1a;">Your Ask Solomon access link</h2>
        <p>Click the button below to access your Lifetime Access on this device. This link is valid for 7 days.</p>
        <p style="text-align:center;margin:32px 0;">
        <a href="${link}" style="background:#6b46c1;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;display:inline-block;font-weight:bold;">Access Ask Solomon</a>
        </p>
        <p style="font-size:13px;color:#666;word-break:break-all;">${link}</p>
        </div>`;
        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from,
                    to: norm,
                    subject: "Your Ask Solomon access link",
                    html,
                }),
            });
            emailSent = res.ok;
            if (!res.ok) console.error("Resend send failed:", res.status, await res.text());
        } catch (err) {
            console.error("Resend send threw:", err);
        }
    }
    return Response.json({ ok: true, proSet: true, emailSent, link });
}
