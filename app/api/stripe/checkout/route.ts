import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
console.log("Stripe key prefix:", (process.env.STRIPE_SECRET_KEY || "").slice(0, 7));
export async function POST(_req: Request) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });
    }
    if (!priceId) {
      return new Response("Missing STRIPE_PRICE_ID", { status: 500 });
    }
    if (!baseUrl) {
      return new Response("Missing NEXT_PUBLIC_BASE_URL", { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/upgrade`,
    });

    return Response.json({ url: session.url });
 } catch (err: any) {
  console.error("Stripe error (full):", err);

  const msg =
    err?.raw?.message ||
    err?.message ||
    "Stripe error";

  return new Response(msg, { status: 500 });
}
}
