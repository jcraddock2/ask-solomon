// app/api/stripe/webhook/route.ts
// Stripe webhook: saves customer email to Upstash Redis as Pro on payment, then sends magic link.
import Stripe from "stripe";
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || "",
        token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || "",
});

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
                              await redis.set(`magic:${token}`, norm, { ex: 900 });
                              const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
                              const mlKey = process.env.MAILERLITE_API_KEY;
                              if (mlKey) {
                                            await fetch("https://connect.mailerlite.com/api/emails", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${mlKey}` },
                                                            body: JSON.stringify({
                                                                              from: { email: "hello@asksolomon.app", name: "Ask Solomon" },
                                                                              to: [{ email: norm }],
                                                                              subject: "Your Ask Solomon access link",
                                                                              html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:8px"><h2 style="color:#1a1a1a;margin-bottom:8px">Welcome to Ask Solomon!</h2><p style="color:#444;font-size:16px;line-height:1.6">Thank you for your purchase. Click the button below to access the app — no password needed.</p><a href="${link}" style="display:inline-block;margin:24px 0;padding:14px 28px;background:#b8860b;color:#fff;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold">Access Ask Solomon</a><p style="color:#888;font-size:13px">This link expires in 15 minutes. After signing in, your browser will remember you for 10 years.</p></div>`,
                                                            }),
                                            });
                              }
                  }
        }
        return new Response("ok", { status: 200 });
}
