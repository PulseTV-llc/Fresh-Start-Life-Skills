/**
 * Donation provider adapter.
 * ----------------------------------------------------------------------------
 * Nothing here talks to a payment processor yet — that is deliberate. The whole
 * site routes donations through `buildDonateUrl()` and `donationTiers`, so when
 * Darius picks a provider the change is confined to this one file.
 *
 * Wiring checklist for whichever provider is chosen:
 *
 *  • Stripe Payment Links / Checkout
 *      Set NEXT_PUBLIC_DONATE_PROVIDER=stripe and
 *      NEXT_PUBLIC_DONATE_URL=https://donate.stripe.com/xxxx
 *      Amount + frequency are appended as query params Stripe prefills.
 *      For full Checkout Sessions, add a POST route at /api/donate that calls
 *      stripe.checkout.sessions.create() with STRIPE_SECRET_KEY (server-only).
 *
 *  • Givebutter / Donorbox / Classy (recommended for a small 501(c)(3):
 *      no server code, built-in recurring giving, auto receipts, DAF support)
 *      Set NEXT_PUBLIC_DONATE_PROVIDER=givebutter and
 *      NEXT_PUBLIC_DONATE_URL=https://givebutter.com/<campaign>
 *
 *  • PayPal Giving Fund — zero fees for verified 501(c)(3)s.
 *      Set NEXT_PUBLIC_DONATE_PROVIDER=paypal and NEXT_PUBLIC_DONATE_URL to the
 *      hosted donate button URL.
 *
 * NEVER commit a secret key. Only NEXT_PUBLIC_* values belong in client code.
 */

export type DonationFrequency = "once" | "monthly";

export type DonationTier = {
  amount: number;
  /** What the gift concretely provides — donors give to outcomes, not budgets. */
  impact: string;
  /** TODO(Dorothy): confirm these against real per-student material costs. */
  estimated?: boolean;
};

export const donationTiers: DonationTier[] = [
  { amount: 25, impact: "Materials for one child in a sewing class", estimated: true },
  { amount: 50, impact: "A full candle-making kit for two students", estimated: true },
  { amount: 100, impact: "A month of after-school programming for one child", estimated: true },
  { amount: 250, impact: "Camera and audio gear time for a student film crew", estimated: true },
];

export const defaultTierIndex = 2;

const PROVIDER = process.env.NEXT_PUBLIC_DONATE_PROVIDER ?? "";
const PROVIDER_URL = process.env.NEXT_PUBLIC_DONATE_URL ?? "";

/** True once a provider has been configured via env vars. */
export const donationsConfigured = Boolean(PROVIDER && PROVIDER_URL);

/**
 * Where the Donate button should send the visitor.
 *
 * Until a provider is configured this returns the on-site /donate page, which
 * explains how to give by check or phone — so the CTA is never a dead end.
 */
export function buildDonateUrl(options?: {
  amount?: number;
  frequency?: DonationFrequency;
  source?: string;
}): string {
  const { amount, frequency = "once", source } = options ?? {};

  if (!donationsConfigured) {
    const params = new URLSearchParams();
    if (amount) params.set("amount", String(amount));
    if (frequency) params.set("frequency", frequency);
    if (source) params.set("source", source);
    const query = params.toString();
    return query ? `/donate?${query}` : "/donate";
  }

  const url = new URL(PROVIDER_URL);
  if (amount) url.searchParams.set("amount", String(amount));
  if (frequency === "monthly") url.searchParams.set("frequency", "monthly");
  if (source) url.searchParams.set("utm_content", source);
  url.searchParams.set("utm_source", "website");
  return url.toString();
}

/** External provider links open in a new tab; internal ones must not. */
export const donateLinkTarget = donationsConfigured ? "_blank" : undefined;
export const donateLinkRel = donationsConfigured ? "noopener noreferrer" : undefined;
