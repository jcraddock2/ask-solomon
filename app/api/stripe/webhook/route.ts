// app/api/stripe/webhook/route.ts
// Stripe webhook: saves customer email to Upstash Redis as Pro on payment.
import Stripe from "stripe";
import { Redis } from "@upstash/redis";

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
              if (email) await redis.set(`pro:${email.toLowerCase()}`, "1");
      }
      return new Response("ok", { status: 200 });
}
