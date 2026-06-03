// app/api/auth/send-link/route.ts
// Sends a fresh magic link to an existing Lifetime Access subscriber for cross-device access.
// Updates the magic_link field and assigns the "Lifetime Access" group, which triggers the
// MailerLite automation to email the link.
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
        token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
});

async function sendMagicLink(norm: string, link: string): Promise<boolean> {
        const mlKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.LIFETIME_GROUP_ID;
        if (!mlKey || !groupId) {
                console.error("MAILERLITE_API_KEY or LIFETIME_GROUP_ID not set — link not sent for:", norm);
                return false;
        }
        const headers = {
                "Authorization": `Bearer ${mlKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
        };
        const upsertRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
                method: "POST",
                headers,
                body: JSON.stringify({ email: norm, fields: { magic_link: link } }),
        });
        if (!upsertRes.ok) {
                console.error("MailerLite upsert failed:", upsertRes.status, await upsertRes.text());
                return false;
        }
        const data = await upsertRes.json();
        const subscriberId = data?.data?.id;
        if (!subscriberId) {
                console.error("MailerLite upsert returned no subscriber id for:", norm);
                return false;
        }
        const groupRes = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${groupId}`, {
                method: "POST",
                headers,
        });
        if (!groupRes.ok) {
                console.error("MailerLite group assign failed:", groupRes.status, await groupRes.text());
                return false;
        }
        return true;
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
        await redis.set(`magic:${token}`, norm, { ex: 604800 });
        const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
        const sent = await sendMagicLink(norm, link);
        if (!sent) return Response.json({ error: "Email send failed" }, { status: 500 });
        return Response.json({ ok: true });
}
