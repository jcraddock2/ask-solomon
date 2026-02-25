import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

function getBaseUrl(req: Request) {
  // Prefer explicit env var if you have it
  const envBase = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (envBase) return envBase.replace(/\/+$/, "");

  // Otherwise infer from request (works great on Vercel)
  const origin = new URL(req.url).origin;
  return origin;
}

export async function GET(req: Request) {
  return Response.json({
    ok: true,
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasLifetimePrice: !!process.env.STRIPE_PRICE_LIFETIME,
    baseUrl: getBaseUrl(req),
  });
}

export async function POST(req: Request) {
  try {
    const priceId = process.env.STRIPE_PRICE_LIFETIME;
    if (!priceId) return new Response("Missing STRIPE_PRICE_LIFETIME", { status: 500 });

    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/upgrade`,
      // Optional: makes Stripe show a clear label in dashboard
      metadata: { product: "ask-solomon-lifetime" },
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return new Response(err?.message ?? "Stripe error", { status: 500 });
  }
}
