// app/api/auth/verify/route.ts
// Validates magic link token, sets Lifetime Access cookie for 10 years.
// NOTE: token is NOT deleted on verify, so email-client link pre-scanning
// (Yahoo/Outlook security scanners) does not burn the token before the user clicks.
// The token expires naturally via its Redis TTL.
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
          // Build the redirect manually so we can attach Set-Cookie.
  // Response.redirect() returns immutable headers, so we cannot call headers.set() on it.
  return new Response(null, {
              status: 302,
              headers: {
                            Location: `${base}/`,
                            "Set-Cookie": `asksolomon_pro=1; Path=/; Max-Age=${60*60*24*365*10}; SameSite=Lax; Secure`,
              },
  });
}
