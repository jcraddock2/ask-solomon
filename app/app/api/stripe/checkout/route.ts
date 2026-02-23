import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  return Response.json({
    ok: true,
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasPriceId: !!process.env.STRIPE_PRICE_ID,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
  });
}

export async function POST() {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!priceId) return new Response("Missing STRIPE_PRICE_ID", { status: 500 });
    if (!baseUrl) return new Response("Missing NEXT_PUBLIC_BASE_URL", { status: 500 });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/upgrade`,
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return new Response(err?.message ?? "Stripe error", { status: 500 });
  }
}
