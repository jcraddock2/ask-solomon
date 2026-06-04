// app/api/stripe/webhook/route.ts
// Stripe webhook: on payment, marks customer as Lifetime Access in Redis,
// then emails them a magic link via Resend for cross-device access.
import Stripe from "stripe";
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
});

async function sendMagicLink(norm: string, link: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not set - magic link not sent for:", norm);
    return;
  }
  const from = process.env.RESEND_FROM || "Ask Solomon <onboarding@resend.dev>";
  const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a1a;">
  <h2 style="color:#1a1a1a;">Welcome to Ask Solomon Lifetime Access</h2>
                      <p>Thank you for your purchase. Click the button below to access Ask Solomon on this or any device. This link gives you permanent Lifetime Access - it does not expire.</p>
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
        subject: "Welcome to Ask Solomon - Your Access Link",
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend send failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Resend send threw:", err);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Missing secret", { status: 500 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, secret); }
  catch (err: any) { return new Response(`Error: ${err.message}`, { status: 400 }); }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const email = s.customer_details?.email || s.customer_email;
    if (email) {
      const norm = email.toLowerCase().trim();
      await redis.set(`pro:${norm}`, "1");
      const token = randomBytes(32).toString("hex");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://asksolomon.app";
      await redis.set(`magic:${token}`, norm, { ex: 315360000 });
      const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
      await sendMagicLink(norm, link);
    }
  }
  return new Response("ok", { status: 200 });
}
