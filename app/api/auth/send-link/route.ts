// app/api/auth/send-link/route.ts
// Sends a fresh magic link to an existing Lifetime Access subscriber for cross-device access.
// Uses Resend for reliable transactional delivery. Token TTL is 10 years (effectively permanent for Lifetime).
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
        token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
});

async function sendMagicLink(norm: string, link: string): Promise<boolean> {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
                console.error("RESEND_API_KEY not set - link not sent for:", norm);
                return false;
        }
        const from = process.env.RESEND_FROM || "Ask Solomon <onboarding@resend.dev>";
        const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a1a;">
        <h2 style="color:#1a1a1a;">Your Ask Solomon access link</h2>
        <p>Click the button below to access your Lifetime Access on this device.</p>
        <p style="text-align:center;margin:32px 0;">
        <a href="${link}" style="background:#6b46c1;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;display:inline-block;font-weight:bold;">Access Ask Solomon</a>
        </p>
        <p style="font-size:13px;color:#666;">If the button does not work, copy and paste this link into your browser:</p>
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
                if (!res.ok) {
                        console.error("Resend send failed:", res.status, await res.text());
                        return false;
                }
                return true;
        } catch (err) {
                console.error("Resend send threw:", err);
                return false;
        }
}

export async function POST(req: Request) {
        const { email } = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
        if (!email || !email.includes("@")) {
                return Response.json({ error: "Invalid email" }, { status: 400 });
        }
        const norm = email.toLowerCase().trim();
        const isPro = await redis.get(`pro:${norm}`);
        if (!isPro) return Response.json({ ok: true });
        const token = randomBytes(32).toString("hex");
        await redis.set(`magic:${token}`, norm, { ex: 315360000 });
        const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
        const sent = await sendMagicLink(norm, link);
        if (!sent) return Response.json({ error: "Email send failed" }, { status: 500 });
        return Response.json({ ok: true });
}
