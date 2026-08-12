"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { StudioArtwork } from "@/components/studio/StudioArtwork";
import { ventures, craftLabel } from "@/lib/capstone";
import { studioPieces } from "@/lib/studio";
import { cn } from "@/lib/utils";

/**
 * "Pick what you make. See what you'd launch."
 *
 * The one interaction that makes the capstone concrete: choose a craft and the
 * mocked storefront and app rebuild around it. Product imagery reuses the
 * Studio's generated artwork, so the whole site tells one story — the thing on
 * the Studio wall is the thing in the shop.
 *
 * These are illustrative business types, not real student shops. No invented
 * student is named anywhere in here.
 */
export function LaunchPreview() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useBrandMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const venture = ventures[index];

  /** Products to show, drawn from the Studio pieces for this craft. */
  const products = studioPieces
    .filter((piece) => piece.category === venture.category)
    .slice(0, 3);

  // Roving tabindex + arrow keys: the WAI-ARIA tabs pattern.
  function onKeyDown(event: React.KeyboardEvent) {
    const last = ventures.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      {/* --- Craft picker ------------------------------------------------- */}
      <div
        role="tablist"
        aria-label="Choose a craft to preview the business it becomes"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {ventures.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.category}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              role="tab"
              type="button"
              id={`launch-tab-${item.category}`}
              aria-selected={selected}
              aria-controls={`launch-panel-${item.category}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-[var(--ease-out-expo)]",
                selected
                  ? "-translate-y-0.5 border-sun-400 bg-sun-400 text-ink shadow-[var(--shadow-glow)]"
                  : "border-cream/20 text-cream/75 hover:border-cream/40 hover:text-white",
              )}
            >
              {craftLabel(item.category)}
            </button>
          );
        })}
      </div>

      {/* --- The mock build ----------------------------------------------- */}
      <div
        role="tabpanel"
        id={`launch-panel-${venture.category}`}
        aria-labelledby={`launch-tab-${venture.category}`}
        className="mt-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={venture.category}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-end"
          >
            {/* ---- Browser ---- */}
            <div className="overflow-hidden rounded-[1.25rem] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-cream/20">
              <div
                aria-hidden="true"
                className="flex items-center gap-2 border-b border-ink/10 bg-cream-100 px-4 py-3"
              >
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-ink/15" />
                  <span className="size-2.5 rounded-full bg-ink/15" />
                  <span className="size-2.5 rounded-full bg-ink/15" />
                </span>
                <span className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1.5 text-[0.7rem] text-ink-muted ring-1 ring-ink/[0.06]">
                  {venture.domain}
                </span>
                <span className="rounded-md bg-green-100 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-green-800">
                  Live
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display text-lg font-semibold text-ink">
                    {venture.storefrontTitle}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden gap-4 text-[0.72rem] font-medium text-ink-muted sm:flex"
                  >
                    <span>Shop</span>
                    <span>About</span>
                    <span className="text-ink">Cart (1)</span>
                  </span>
                </div>

                <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
                  {venture.storefrontLine}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {products.map((piece) => (
                    <div key={piece.id} className="overflow-hidden rounded-xl ring-1 ring-ink/[0.07]">
                      <div className="aspect-square">
                        <StudioArtwork
                          category={piece.category}
                          seed={piece.id}
                          variant={piece.variant}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2">
                        <span className="truncate text-[0.66rem] font-medium text-ink">
                          {piece.title}
                        </span>
                        <span className="shrink-0 text-[0.66rem] font-bold text-ink-muted">
                          $—
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-navy-700 px-4 py-2 text-[0.72rem] font-semibold text-white"
                  >
                    Add to cart
                  </span>
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-sun-400 px-4 py-2 text-[0.72rem] font-semibold text-ink"
                  >
                    Checkout
                  </span>
                  <span className="ml-auto text-[0.66rem] text-ink-muted">
                    Deployed on Vercel
                  </span>
                </div>
              </div>
            </div>

            {/* ---- Phone + the standout feature ---- */}
            <div className="flex flex-col gap-5">
              <div className="mx-auto w-full max-w-[15rem] overflow-hidden rounded-[1.75rem] bg-cream p-2.5 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] ring-1 ring-cream/20">
                <div className="overflow-hidden rounded-[1.25rem] bg-white">
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center bg-navy-800 py-2"
                  >
                    <span className="h-1 w-10 rounded-full bg-cream/30" />
                  </div>
                  <div className="p-3.5">
                    <p className="font-display text-sm font-semibold text-ink">
                      {venture.storefrontTitle}
                    </p>
                    {products[0] ? (
                      <div className="mt-2.5 overflow-hidden rounded-lg ring-1 ring-ink/[0.07]">
                        <div className="aspect-4/3">
                          <StudioArtwork
                            category={products[0].category}
                            seed={products[0].id}
                            variant={products[0].variant}
                          />
                        </div>
                      </div>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="mt-3 block rounded-full bg-sun-400 py-2 text-center text-[0.68rem] font-bold text-ink"
                    >
                      Buy now
                    </span>
                    <p className="mt-2 text-center text-[0.6rem] text-ink-muted">
                      iPhone &amp; Android
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-cream/[0.07] p-5 ring-1 ring-cream/15">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-sun-300">
                  {venture.venture}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/85">
                  {venture.standout}
                </p>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {venture.sells.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-cream/10 px-2.5 py-1 text-[0.7rem] text-cream/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-sm text-cream/55">
          Illustrative examples of the kind of business each craft becomes — not
          real student shops. Real ones land here once the first cohort ships.
        </p>
      </div>
    </div>
  );
}
