// app/api/stripe/webhook/route.ts
// Stripe webhook: on payment, marks customer as Lifetime Access in Redis,
// then adds them to the MailerLite "Lifetime Access" group with their magic link
// stored in the magic_link custom field. A MailerLite automation emails the link.
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
      await redis.set(`magic:${token}`, norm, { ex: 604800 });
      const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(norm)}`;
      const mlKey = process.env.MAILERLITE_API_KEY;
      const groupId = process.env.LIFETIME_GROUP_ID;
      if (mlKey && groupId) {
        const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${mlKey}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            email: norm,
            fields: { magic_link: link },
            groups: [groupId],
          }),
        });
        if (!mlRes.ok) {
          const errText = await mlRes.text();
          console.error("MailerLite subscriber upsert failed:", mlRes.status, errText);
        }
      } else {
        console.error("MAILERLITE_API_KEY or LIFETIME_GROUP_ID not set — magic link not sent for:", norm);
      }
    }
  }
  return new Response("ok", { status: 200 });
}
