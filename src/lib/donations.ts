/**
 * Donation model — shared by the server route and the client gift builder.
 *
 * No Stripe import here on purpose: this file is pulled into Client Components,
 * and the Stripe secret must never be reachable from the browser bundle. The
 * only thing the client learns is whether a publishable key exists.
 */

export type DonationFrequency = "once" | "monthly";

export type DonationTier = {
  amount: number;
  /** What the gift concretely provides — donors give to outcomes, not budgets. */
  impact: string;
  /** TODO(Dorothy): confirm each against real per-student material costs. */
  estimated?: boolean;
};

export const donationTiers: DonationTier[] = [
  { amount: 25, impact: "materials for one child in a sewing class", estimated: true },
  { amount: 50, impact: "a full candle-making kit for two students", estimated: true },
  { amount: 100, impact: "a month of after-school programming for one child", estimated: true },
  { amount: 250, impact: "camera and audio gear time for a student film crew", estimated: true },
];

export const defaultTierIndex = 2;

/** Guard rails applied on BOTH sides — the client for UX, the server for real. */
export const MIN_DONATION = 5;
export const MAX_DONATION = 50_000;

export function validateAmount(value: unknown): number | null {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
  if (!Number.isFinite(amount)) return null;
  // Whole dollars only: it keeps the copy honest ("$25 covers…") and sidesteps
  // float-cent rounding on the way to Stripe's integer minor units.
  const whole = Math.floor(amount);
  if (whole < MIN_DONATION || whole > MAX_DONATION) return null;
  return whole;
}

export function isFrequency(value: unknown): value is DonationFrequency {
  return value === "once" || value === "monthly";
}

/**
 * Whether online giving is live in this environment.
 *
 * Reads the *publishable* key, which is safe in client code. The secret key is
 * what actually authorises charges and is checked separately on the server.
 */
export const stripeConfigured = Boolean(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

/**
 * Where a Donate button should point.
 *
 * Always the on-site /donate page — the gift builder there (and in the homepage
 * band) posts to /api/donate and forwards to Stripe Checkout. Keeping the
 * amount in the query string means a selection made on the homepage survives
 * the navigation.
 */
export function buildDonateUrl(options?: {
  amount?: number;
  frequency?: DonationFrequency;
  source?: string;
}): string {
  const { amount, frequency, source } = options ?? {};
  const params = new URLSearchParams();
  if (amount) params.set("amount", String(amount));
  if (frequency && frequency !== "once") params.set("frequency", frequency);
  if (source) params.set("source", source);
  const query = params.toString();
  return query ? `/donate?${query}` : "/donate";
}

/** Donate links are internal now, so they never open in a new tab. */
export const donateLinkTarget = undefined;
export const donateLinkRel = undefined;
