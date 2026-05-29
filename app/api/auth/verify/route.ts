// app/api/auth/verify/route.ts
// Validates a magic link token and sets a Pro cookie valid for 1 year.
// Token format: base64(email):base64(timestamp:secret_hash)
// GET /api/auth/verify?token=xxx&email=yyy

import { kv } from "@vercel/kv";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";

  if (!token || !email) {
        return Response.redirect(`${baseUrl}/login?error=invalid`);
  }

  // Look up token in KV store
  const storedEmail = await kv.get<string>(`magic:${token}`);

  if (!storedEmail || storedEmail.toLowerCase() !== email.toLowerCase()) {
        return Response.redirect(`${baseUrl}/login?error=expired`);
  }

  // Verify this email is a Pro user
  const isPro = await kv.get<string>(`pro:${email.toLowerCase()}`);

  if (!isPro) {
        return Response.redirect(`${baseUrl}/login?error=notpro`);
  }

  // Delete token so it can't be reused
  await kv.del(`magic:${token}`);

  // Set Pro cookie for 1 year
  const oneYear = 60 * 60 * 24 * 365;
    const response = Response.redirect(`${baseUrl}/`);
    response.headers.set(
          "Set-Cookie",
          `asksolomon_pro=1; Path=/; Max-Age=${oneYear}; SameSite=Lax; Secure`
        );

  return response;
}
