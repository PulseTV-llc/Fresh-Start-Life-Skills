"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import {
  buildDonateUrl,
  donateLinkRel,
  donateLinkTarget,
  donationTiers,
  defaultTierIndex,
  donationsConfigured,
  type DonationFrequency,
} from "@/lib/donations";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The giving block.
 *
 * Amount and frequency are chosen here and handed to `buildDonateUrl()`, which
 * is the only thing in the app that knows about a payment provider. Until one is
 * configured, the button lands on /donate with the selection preserved in the
 * query string — so this never becomes a dead end mid-build.
 */
export function DonateCTA() {
  const [tierIndex, setTierIndex] = useState(defaultTierIndex);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<DonationFrequency>("once");
  const reduceMotion = useBrandMotion();

  const customAmount = Number.parseInt(custom, 10);
  const amount =
    custom && Number.isFinite(customAmount) && customAmount > 0
      ? customAmount
      : donationTiers[tierIndex].amount;
  const impact = custom ? null : donationTiers[tierIndex].impact;

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(140deg,#0a5054_0%,#013f4a_46%,#012f38_100%)] py-20 text-white sm:py-28"
    >
      {/* Sun rays breaking over the navy — texture, not decoration you notice */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg at 22% 112%, #f2a629 0deg 2.6deg, transparent 2.6deg 9deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-[22%] size-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.55)_0%,rgba(242,166,41,0.12)_42%,rgba(242,166,41,0)_68%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="inverse" className="text-white">
              Give
            </Eyebrow>
            <h2
              id="donate-heading"
              className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Fund a child&apos;s afternoon.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white">
              Fresh Start runs on donated materials, donated time and gifts from
              people who believe these kids are worth the investment. Every dollar
              goes into a young person&apos;s hands.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-white">
              {[
                "Tax-deductible — we are a registered 501(c)(3)",
                "Materials are provided free to every student",
                "Gifts stay local to central Louisiana",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 size-5 shrink-0 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="10" cy="10" r="8.5" opacity="0.4" />
                    <path d="m6 10.4 2.8 2.6L14 7.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* --- Gift builder ---------------------------------------------- */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-white p-7 text-ink shadow-[0_40px_80px_-30px_rgba(80,30,0,0.55)] sm:p-10">
              {/* Frequency */}
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
                        layoutId="freq-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : null}
                    <span className="relative">
                      {option === "once" ? "One-time" : "Monthly"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Amounts */}
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
                        }}
                        className={cn(
                          "rounded-2xl border-2 py-4 font-display text-xl font-semibold transition-all duration-300 ease-[var(--ease-out-expo)]",
                          selected
                            ? "-translate-y-0.5 border-sun-500 bg-sun-50 text-sun-700 shadow-[var(--shadow-soft)]"
                            : "border-ink/10 text-ink hover:border-sun-300 hover:bg-sun-50/50",
                        )}
                      >
                        ${tier.amount}
                      </button>
                    );
                  })}
                </div>

                <label className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-ink/10 px-4 py-3 transition-colors focus-within:border-sun-400">
                  <span className="text-sm font-semibold text-ink-soft">
                    Other
                  </span>
                  <span className="font-display text-lg text-ink-muted">$</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={custom}
                    onChange={(event) => setCustom(event.target.value)}
                    placeholder="Enter an amount"
                    className="w-full bg-transparent font-display text-lg font-semibold text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink-muted/70"
                  />
                </label>
              </fieldset>

              {/* Impact readout */}
              <div className="mt-6 min-h-[3.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={impact ?? "custom"}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 rounded-2xl bg-green-50 px-4 py-3.5 text-[0.95rem] leading-relaxed text-green-800"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 size-5 shrink-0 text-green-600"
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
                          covers {impact.charAt(0).toLowerCase() + impact.slice(1)}.
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

              <ButtonLink
                href={buildDonateUrl({ amount, frequency, source: "home-cta" })}
                target={donateLinkTarget}
                rel={donateLinkRel}
                variant="accent"
                size="lg"
                className="mt-5 w-full"
              >
                {frequency === "monthly"
                  ? `Give $${amount} every month`
                  : `Donate $${amount}`}
                <ArrowIcon />
              </ButtonLink>

              <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-ink-muted">
                {donationsConfigured ? (
                  <>Secure checkout. You will receive a receipt by email.</>
                ) : (
                  <>
                    Online giving is being set up. In the meantime, call{" "}
                    <a
                      href={site.contact.phoneHref}
                      className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-2"
                    >
                      {site.contact.phone}
                    </a>{" "}
                    or mail a check to {site.address.full}.
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
