"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { Button, ArrowIcon } from "@/components/ui/Button";
import {
  donationTiers,
  defaultTierIndex,
  stripeConfigured,
  validateAmount,
  MIN_DONATION,
  type DonationFrequency,
} from "@/lib/donations";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The gift builder.
 *
 * Amount + frequency are chosen here, POSTed to /api/donate, and the visitor is
 * forwarded to Stripe Checkout. No card details are ever entered on this
 * origin, so the site stays out of PCI scope.
 *
 * With no Stripe keys configured the same UI renders but the submit turns into
 * the offline instructions — the page is never a dead end mid-build.
 */
export function GiftBuilder({
  source = "gift-builder",
  initialAmount,
  initialFrequency = "once",
  className,
}: {
  source?: string;
  initialAmount?: number;
  initialFrequency?: DonationFrequency;
  className?: string;
}) {
  const reduceMotion = useBrandMotion();
  const fieldId = useId();

  // A preselected amount from the homepage may not match a tier — in that case
  // it belongs in the custom field so the visitor sees their own number.
  const matchedTier = initialAmount
    ? donationTiers.findIndex((tier) => tier.amount === initialAmount)
    : -1;

  const [tierIndex, setTierIndex] = useState(
    matchedTier >= 0 ? matchedTier : defaultTierIndex,
  );
  const [custom, setCustom] = useState(
    initialAmount && matchedTier < 0 ? String(initialAmount) : "",
  );
  const [frequency, setFrequency] = useState<DonationFrequency>(initialFrequency);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customAmount = custom ? validateAmount(custom) : null;
  const amount = custom
    ? (customAmount ?? 0)
    : donationTiers[tierIndex].amount;
  const impact = custom ? null : donationTiers[tierIndex].impact;
  const customInvalid = custom.length > 0 && customAmount === null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripeConfigured || pending) return;

    if (customInvalid || amount < MIN_DONATION) {
      setError(`Please enter a whole dollar amount of $${MIN_DONATION} or more.`);
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency, source }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(
          data.error ??
            "We could not start the checkout. Please try again in a moment.",
        );
        setPending(false);
        return;
      }

      // Full navigation to Stripe's domain — deliberately not the Next router.
      window.location.assign(data.url);
    } catch {
      setError(
        "We could not reach the payment service. Please check your connection and try again.",
      );
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[2rem] bg-white p-7 text-ink shadow-[0_40px_80px_-30px_rgba(1,47,56,0.55)] sm:p-10",
        className,
      )}
    >
      {/* --- Frequency ---------------------------------------------------- */}
      <div
        role="radiogroup"
        aria-label="Giving frequency"
        className="inline-flex rounded-full bg-ink/[0.05] p-1.5"
      >
        {(["once", "monthly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={frequency === option}
            onClick={() => setFrequency(option)}
            className={cn(
              "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300",
              frequency === option ? "text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {frequency === option ? (
              <motion.span
                layoutId={`freq-pill-${source}`}
                className="absolute inset-0 rounded-full bg-navy-700"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
            <span className="relative">
              {option === "once" ? "One-time" : "Monthly"}
            </span>
          </button>
        ))}
      </div>

      {/* --- Amount ------------------------------------------------------- */}
      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-ink-soft">
          Choose an amount
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {donationTiers.map((tier, index) => {
            const selected = !custom && tierIndex === index;
            return (
              <button
                key={tier.amount}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setTierIndex(index);
                  setCustom("");
                  setError(null);
                }}
                className={cn(
                  "rounded-2xl border-2 py-4 font-display text-xl font-semibold transition-all duration-300 ease-[var(--ease-out-expo)]",
                  selected
                    ? "-translate-y-0.5 border-sun-500 bg-sun-50 text-sun-800 shadow-[var(--shadow-soft)]"
                    : "border-ink/10 text-ink hover:border-sun-300 hover:bg-sun-50/50",
                )}
              >
                ${tier.amount}
              </button>
            );
          })}
        </div>

        <label
          htmlFor={`${fieldId}-custom`}
          className={cn(
            "mt-3 flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-colors",
            customInvalid
              ? "border-red-400"
              : "border-ink/10 focus-within:border-sun-400",
          )}
        >
          <span className="text-sm font-semibold text-ink-soft">Other</span>
          <span className="font-display text-lg text-ink-muted">$</span>
          <input
            id={`${fieldId}-custom`}
            name="custom-amount"
            type="number"
            inputMode="numeric"
            min={MIN_DONATION}
            step={1}
            value={custom}
            aria-invalid={customInvalid || undefined}
            aria-describedby={customInvalid ? `${fieldId}-error` : undefined}
            onChange={(event) => {
              setCustom(event.target.value);
              setError(null);
            }}
            placeholder="Enter an amount"
            className="w-full bg-transparent font-display text-lg font-semibold text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink-muted/70"
          />
        </label>
      </fieldset>

      {/* --- Impact readout ------------------------------------------------ */}
      <div className="mt-6 min-h-[3.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={impact ?? "custom"}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 rounded-2xl bg-teal-50 px-4 py-3.5 text-[0.95rem] leading-relaxed text-teal-900"
          >
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 size-5 shrink-0 text-teal-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              aria-hidden="true"
            >
              <path
                d="M12 20.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.8c0 5.3-7.5 9.7-7.5 9.7Z"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              {impact ? (
                <>
                  <strong className="font-semibold">
                    ${amount}
                    {frequency === "monthly" ? " a month" : ""}
                  </strong>{" "}
                  covers {impact}.
                </>
              ) : (
                <>
                  Thank you — every amount goes directly into materials and
                  instruction for students.
                </>
              )}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* --- Submit -------------------------------------------------------- */}
      {stripeConfigured ? (
        <>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="mt-5 w-full"
            disabled={pending || customInvalid}
          >
            {pending ? (
              <>
                <Spinner />
                Taking you to checkout…
              </>
            ) : (
              <>
                {frequency === "monthly"
                  ? `Give $${amount || 0} every month`
                  : `Donate $${amount || 0}`}
                <ArrowIcon />
              </>
            )}
          </Button>

          <p
            id={`${fieldId}-error`}
            aria-live="polite"
            className={cn(
              "mt-3 text-center text-sm font-medium text-red-700",
              !error && !customInvalid && "sr-only",
            )}
          >
            {error ??
              (customInvalid
                ? `Please enter a whole dollar amount of $${MIN_DONATION} or more.`
                : "")}
          </p>

          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.82rem] leading-relaxed text-ink-muted">
            <LockIcon />
            Secure checkout by Stripe · a receipt is emailed to you
          </p>
          <p className="mt-2 text-center text-[0.82rem] leading-relaxed text-ink-muted">
            {site.legalName} is a {site.nonprofit.status}. Your gift is
            tax-deductible to the extent allowed by law.
          </p>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border-2 border-dashed border-ink/15 px-5 py-6 text-center">
          <p className="font-semibold text-ink">
            Online giving is being set up right now.
          </p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">
            To give today, call{" "}
            <a
              href={site.contact.phoneHref}
              className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-2"
            >
              {site.contact.phone}
            </a>{" "}
            or mail a check payable to {site.legalName} at {site.address.full}.
          </p>
        </div>
      )}
    </form>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="inline size-4 text-ink-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}
