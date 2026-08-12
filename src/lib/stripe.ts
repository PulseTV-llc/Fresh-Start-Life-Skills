import "server-only";
import Stripe from "stripe";

/**
 * Server-side Stripe client.
 *
 * `server-only` makes it a build error to import this from a Client Component,
 * which is the guardrail that keeps the secret key out of the browser bundle.
 *
 * The client is created lazily so the app still builds and runs with no Stripe
 * keys at all — the donation UI degrades to "call us / mail a check" instead of
 * crashing. See `donationsEnabled()`.
 */

let client: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }
  if (!client) {
    client = new Stripe(key, {
      // Pinning the version means a Stripe API release can never silently
      // change behaviour under us.
      apiVersion: "2026-07-29.dahlia",
      appInfo: {
        name: "Fresh Start Life Skills",
        url: "https://freshstartlifeskills.com",
      },
      typescript: true,
    });
  }
  return client;
}

/** True once the secret key is present — checked before touching Stripe. */
export function donationsEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Guard against a live secret key being paired with a test publishable key (or
 * vice versa), which fails confusingly at checkout rather than at boot.
 */
export function keysAreConsistent(): boolean {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  if (!secret || !publishable) return true;
  return secret.startsWith("sk_live") === publishable.startsWith("pk_live");
}
