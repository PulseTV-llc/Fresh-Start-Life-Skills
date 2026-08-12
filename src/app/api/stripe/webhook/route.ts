import { NextResponse } from "next/server";
import { getStripe, donationsEnabled } from "@/lib/stripe";

/**
 * Stripe webhook receiver.
 *
 * The thank-you page confirms a gift for the *donor*, but the donor can close
 * the tab before it loads — so the organization's record of a donation has to
 * come from here, which Stripe retries until it gets a 2xx.
 *
 * Setup:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook   (development)
 *   Dashboard → Developers → Webhooks → add endpoint                (production)
 *   Events: checkout.session.completed, invoice.paid,
 *           customer.subscription.deleted
 *   Copy the signing secret into STRIPE_WEBHOOK_SECRET.
 *
 * TODO(Darius): decide where a recorded gift should go. Options, cheapest first:
 *   • Email Dorothy via Resend (no database, works immediately)
 *   • Append a row to a Google Sheet
 *   • A real donors table once there is a database
 * Until one is wired up this route verifies and logs, which is enough to prove
 * the integration end to end but is NOT a donor record.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!donationsEnabled() || !secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Signature verification needs the exact bytes Stripe signed, so the body is
  // read as raw text — parsing it first would invalidate the check.
  const payload = await request.text();

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.info("[stripe] donation completed", {
          id: session.id,
          amountTotal: session.amount_total,
          currency: session.currency,
          mode: session.mode,
          email: session.customer_details?.email,
          source: session.metadata?.source,
        });
        // TODO(Darius): record the gift / send the acknowledgment here.
        break;
      }

      case "invoice.paid": {
        // A monthly gift renewed.
        const invoice = event.data.object;
        console.info("[stripe] recurring gift paid", {
          id: invoice.id,
          amountPaid: invoice.amount_paid,
        });
        break;
      }

      case "customer.subscription.deleted": {
        console.info("[stripe] monthly gift cancelled", {
          id: event.data.object.id,
        });
        break;
      }

      default:
        // Everything else is acknowledged so Stripe stops retrying it.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    // A bad signature is the expected failure for a forged request.
    console.error("[stripe] webhook verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
