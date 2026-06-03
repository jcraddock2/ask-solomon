// app/api/stripe/webhook/route.ts
// Stripe webhook: on payment, marks customer as Lifetime Access in Redis,
// stores their magic link in the MailerLite magic_link custom field, and
// assigns them to the "Lifetime Access" group (which triggers the email automation).
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
  const mlKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.LIFETIME_GROUP_ID;
  if (!mlKey || !groupId) {
    console.error("MAILERLITE_API_KEY or LIFETIME_GROUP_ID not set — magic link not sent for:", norm);
    return;
  }
  const headers = {
    "Authorization": `Bearer ${mlKey}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
  // Step 1: upsert subscriber and set the magic_link field (creates if new, updates if existing).
const upsertRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
  method: "POST",
  headers,
  body: JSON.stringify({ email: norm, fields: { magic_link: link } }),
});
  if (!upsertRes.ok) {
    console.error("MailerLite upsert failed:", upsertRes.status, await upsertRes.text());
    return;
  }
  const data = await upsertRes.json();
  const subscriberId = data?.data?.id;
  if (!subscriberId) {
    console.error("MailerLite upsert returned no subscriber id for:", norm);
    return;
  }
  // Step 2: assign to the Lifetime Access group (reliable for new AND existing subscribers).
const groupRes = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${groupId}`, {
  method: "POST",
  headers,
});
  if (!groupRes.ok) {
    console.error("MailerLite group assign failed:", groupRes.status, await groupRes.text());
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
      await redis.set(`magic:${token}`, norm, { ex: 604800 });
      const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
      await sendMagicLink(norm, link);
    }
  }
  return new Response("ok", { status: 200 });
}
