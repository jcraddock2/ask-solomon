// app/api/stripe/webhook/route.ts
// Stripe webhook: on checkout.session.completed, saves customer email to KV as Pro.
// Requires STRIPE_WEBHOOK_SECRET env var.

import Stripe from "stripe";
import { kv } from "@vercel/kv";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") || "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
        return new Response("Missing webhook secret", { status: 500 });
  }

  let event: Stripe.Event;
    try {
          event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
          return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

  if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email || session.customer_email;
        if (email) {
                await kv.set(`pro:${email.toLowerCase()}`, "1");
        }
  }

  return new Response("ok", { status: 200 });
}
