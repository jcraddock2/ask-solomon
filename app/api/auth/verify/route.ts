// app/api/auth/verify/route.ts
// Validates magic link token, sets Pro cookie 10 years.
import { Redis } from "@upstash/redis";
export const runtime = "nodejs";
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "", token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "" });
export async function GET(req: Request) {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        const email = searchParams.get("email");
        const base = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
        if (!token || !email) return Response.redirect(`${base}/login?error=invalid`);
        const stored = await redis.get(`magic:${token}`);
        if (!stored || String(stored).toLowerCase() !== email.toLowerCase()) return Response.redirect(`${base}/login?error=expired`);
        const isPro = await redis.get(`pro:${email.toLowerCase()}`);
        if (!isPro) return Response.redirect(`${base}/login?error=notpro`);
        await redis.del(`magic:${token}`);
        const res = Response.redirect(`${base}/`);
        res.headers.set("Set-Cookie", `asksolomon_pro=1; Path=/; Max-Age=${60*60*24*365*10}; SameSite=Lax; Secure`);
        return res;
}
