"use client";

import { motion, useReducedMotion } from "motion/react";
import { SunriseScene } from "@/components/brand/SunriseScene";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { RevealWords } from "@/components/ui/Reveal";
import { buildDonateUrl, donateLinkRel, donateLinkTarget } from "@/lib/donations";
import { site } from "@/lib/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    /* The landscape lives in the bottom third, so the copy is anchored to the
       top rather than centered — that keeps the sun and the running children
       above the fold on a 720px laptop screen, where centering would bury them. */
    <section
      className="relative isolate flex min-h-[44rem] flex-col overflow-hidden pb-[18vh] pt-24 sm:min-h-svh sm:pb-[16vh] sm:pt-28"
      aria-labelledby="hero-heading"
    >
      <SunriseScene />

      <Container size="wide" className="relative">
        <div className="max-w-2xl">
          <motion.p
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/70 py-2 pl-2.5 pr-4 text-[0.78rem] font-semibold text-ink-soft ring-1 ring-ink/[0.07] backdrop-blur-sm"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-sun-500/15">
              <span className="size-2 rounded-full bg-sun-500" />
            </span>
            501(c)(3) nonprofit · Alexandria, Louisiana
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.7rem] leading-[1.03] text-ink sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4.1rem]"
          >
            <RevealWords
              text="Every child deserves a"
              delay={0.15}
              className="block"
            />
            <RevealWords
              text="fresh start."
              delay={0.42}
              highlight={["fresh", "start"]}
              className="block"
            />
          </h1>

          <motion.p
            {...fadeUp(0.62)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            A nonprofit teaching young people in central Louisiana the practical,
            creative and financial skills that classrooms leave out — at little or
            no cost to their families.
          </motion.p>

          <motion.div {...fadeUp(0.74)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/programs" size="lg">
              Explore our programs
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href={buildDonateUrl({ source: "hero" })}
              target={donateLinkTarget}
              rel={donateLinkRel}
              variant="secondary"
              size="lg"
            >
              Donate
            </ButtonLink>
          </motion.div>

        </div>
      </Container>

      {/* Scroll affordance — decorative, so it stays out of the a11y tree */}
      <motion.div
        aria-hidden="true"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.6, duration: 1 },
            })}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cream/70">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-cream/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-cream/80"
            animate={reduceMotion ? undefined : { y: ["-100%", "260%"] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      <span className="sr-only">
        {site.legalName} serves {site.serviceAreas.join(", ")} in{" "}
        {site.address.regionName}.
      </span>
    </section>
  );
}
