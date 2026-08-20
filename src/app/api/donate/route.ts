import { NextResponse } from "next/server";
import { getStripe, donationsEnabled, keysAreConsistent } from "@/lib/stripe";
import {
  validateAmount,
  isFrequency,
  type DonationFrequency,
} from "@/lib/donations";
import { site } from "@/lib/site";

/**
 * Creates a Stripe Checkout Session for a donation and returns its URL.
 *
 * Checkout (rather than an on-site Payment Element) is the right call for a
 * small nonprofit: card data never touches this origin, so PCI scope stays at
 * SAQ-A, and Stripe handles Apple/Google Pay, receipts, 3-D Secure and the
 * recurring-billing UI for free.
 *
 * The amount is re-validated here even though the UI constrains it — a request
 * to this route is just JSON from the internet, not something the form controls.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  amount?: unknown;
  frequency?: unknown;
  source?: unknown;
};

export async function POST(request: Request) {
  if (!donationsEnabled()) {
    return NextResponse.json(
      {
        error:
          "Online giving is not configured yet. Please call us or mail a check.",
        code: "not_configured",
      },
      { status: 503 },
    );
  }

  if (!keysAreConsistent()) {
    // Mismatched live/test keys fail deep inside Checkout with an opaque error.
    console.error("[donate] STRIPE_SECRET_KEY and publishable key disagree on mode");
    return NextResponse.json(
      { error: "Payment configuration error.", code: "key_mismatch" },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "Invalid request.", code: "bad_json" },
      { status: 400 },
    );
  }

  const amount = validateAmount(body.amount);
  if (amount === null) {
    return NextResponse.json(
      { error: "Please enter a whole dollar amount of $5 or more.", code: "bad_amount" },
      { status: 400 },
    );
  }

  const frequency: DonationFrequency = isFrequency(body.frequency)
    ? body.frequency
    : "once";

  // Only ever used for attribution, so keep it short and boring.
  const source =
    typeof body.source === "string" ? body.source.slice(0, 64) : "website";

  // Build absolute URLs from the request so this works on localhost, previews
  // and production without another env var to forget.
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  const productName =
    frequency === "monthly"
      ? `Monthly donation to ${site.legalName}`
      : `Donation to ${site.legalName}`;

  const description =
    "Supports hands-on life and vocational skills programs for kids, teens and adults in central Louisiana.";

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      // Stripe relabels the confirm button "Donate" for one-time gifts.
      ...(frequency === "once" ? { submit_type: "donate" as const } : {}),
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: { name: productName, description },
            ...(frequency === "monthly"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
        },
      ],
      // A receipt needs an email address, and donors expect one for their taxes.
      billing_address_collection: "auto",
      ...(frequency === "once" ? { customer_creation: "always" as const } : {}),
      metadata: {
        source,
        frequency,
        amount_usd: String(amount),
        organization: site.legalName,
      },
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?status=canceled`,
    });

    if (!session.url) {
      throw new Error("Stripe returned a session without a redirect URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Never surface Stripe's raw message: it can leak account configuration.
    console.error("[donate] checkout session failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not start the checkout. Please try again, or call us and we will take your gift by phone.",
        code: "stripe_error",
      },
      { status: 502 },
    );
  }
}
