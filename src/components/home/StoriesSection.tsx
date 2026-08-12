"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { stories } from "@/lib/stories";
import { cn } from "@/lib/utils";

const accents = {
  sun: "text-sun-400",
  green: "text-green-400",
  teal: "text-teal-400",
} as const;

/**
 * Voices carousel.
 *
 * One quote at a time, with real prev/next buttons rather than a drag-only
 * affordance — donors and grant reviewers often browse with a keyboard, and the
 * live region announces each new quote.
 */
export function StoriesSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useBrandMotion();
  const story = stories[index];
  const hasPlaceholders = stories.some((item) => item.placeholder);

  const go = (next: number) => {
    setDirection(next > index || (index === stories.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + stories.length) % stories.length);
  };

  return (
    <Section
      id="stories"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#0a5054_0%,#013f4a_48%,#012f38_100%)]"
    >
      {/* Sunrise bloom behind the quote */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.32)_0%,rgba(242,166,41,0)_68%)]"
      />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <Eyebrow tone="inverse">Voices</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.1] text-white sm:text-5xl">
            What a fresh start sounds like.
          </h2>
          <p className="mt-5 leading-relaxed text-cream/70">
            The clearest measure of this work is not a chart. It is a parent
            noticing their child sitting differently at the dinner table.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex size-12 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
            >
              <span className="sr-only">Previous story</span>
              <ArrowIcon className="size-4 rotate-180 group-hover:translate-x-0" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex size-12 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
            >
              <span className="sr-only">Next story</span>
              <ArrowIcon className="size-4" />
            </button>

            <ul className="ml-3 flex items-center gap-2">
              {stories.map((item, dotIndex) => (
                <li key={item.attribution + dotIndex}>
                  <button
                    type="button"
                    onClick={() => go(dotIndex)}
                    aria-current={dotIndex === index ? "true" : undefined}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      dotIndex === index
                        ? "w-8 bg-sun-400"
                        : "w-1.5 bg-cream/30 hover:bg-cream/60",
                    )}
                  >
                    <span className="sr-only">Go to story {dotIndex + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div
            aria-live="polite"
            className="relative min-h-[22rem] sm:min-h-[20rem]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={reduceMotion ? false : { opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[2rem] bg-cream/[0.06] p-8 ring-1 ring-cream/15 backdrop-blur-sm sm:p-12"
              >
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className={cn("size-10", accents[story.accent])}
                  fill="currentColor"
                >
                  <path d="M20 10v10c0 8-4.5 14-13 18l-3-5c5-2.4 7.6-5.5 8-9H4V10h16Zm24 0v10c0 8-4.5 14-13 18l-3-5c5-2.4 7.6-5.5 8-9h-8V10h16Z" />
                </svg>

                <blockquote className="mt-6">
                  <p className="font-display text-2xl leading-[1.38] text-white sm:text-[2rem] sm:leading-[1.34]">
                    {story.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-cream/15 pt-6">
                  {/* TODO(assets): portrait, 400×400, with a signed release. */}
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream/10 ring-1 ring-cream/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6 text-cream/50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="8.5" r="3.8" />
                      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {story.attribution}
                    </span>
                    <span className="block text-sm text-cream/60">{story.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" variant="inverse">
              Share your Fresh Start story
              <ArrowIcon />
            </ButtonLink>
            <p className="text-sm text-cream/70">
              We would love to feature your family.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Loud, dev-only guard so placeholder quotes never quietly ship. */}
      {hasPlaceholders && process.env.NODE_ENV !== "production" ? (
        <p className="relative mt-10 rounded-xl bg-sun-500/20 px-4 py-3 text-sm font-semibold text-sun-100 ring-1 ring-sun-400/40">
          Dev note: these quotes are placeholders in <code>src/lib/stories.ts</code>.
          Replace them with real, consented testimonials before launch.
        </p>
      ) : null}
    </Section>
  );
}
