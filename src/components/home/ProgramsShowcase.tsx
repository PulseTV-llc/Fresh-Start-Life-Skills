"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { programs, tracks, type Program, type ProgramTrack } from "@/lib/programs";
import { cn } from "@/lib/utils";

const accents = {
  sun: {
    wash: "from-sun-50 to-white",
    ring: "ring-sun-200/60 group-hover:ring-sun-300",
    glyph: "bg-sun-100 text-sun-700",
    chip: "bg-sun-50 text-sun-800",
    spot: "rgba(242,166,41,0.20)",
    badge: "bg-sun-500 text-ink",
  },
  green: {
    wash: "from-green-50 to-white",
    ring: "ring-green-200/60 group-hover:ring-green-300",
    glyph: "bg-green-100 text-green-700",
    chip: "bg-green-50 text-green-800",
    spot: "rgba(108,160,47,0.18)",
    badge: "bg-green-600 text-white",
  },
  teal: {
    wash: "from-teal-50 to-white",
    ring: "ring-teal-200/60 group-hover:ring-teal-300",
    glyph: "bg-teal-100 text-teal-700",
    chip: "bg-teal-50 text-teal-800",
    spot: "rgba(15,156,150,0.18)",
    badge: "bg-teal-600 text-white",
  },
} as const;

/**
 * A program card that lights up under the cursor.
 *
 * The spotlight is a radial gradient driven by two motion values rather than
 * React state, so tracking the pointer never triggers a re-render.
 */
function ProgramCard({ program, featured }: { program: Program; featured?: boolean }) {
  const accent = accents[program.accent];
  const reduceMotion = useBrandMotion();
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, ${accent.spot}, transparent 72%)`;

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(featured && "sm:col-span-2")}
    >
      <Link
        href={`/programs/${program.slug}`}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          mouseX.set(event.clientX - bounds.left);
          mouseY.set(event.clientY - bounds.top);
        }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-7 ring-1 transition-all duration-500 ease-[var(--ease-out-expo)]",
          "shadow-[var(--shadow-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
          accent.wash,
          accent.ring,
          featured && "sm:flex-row sm:items-center sm:gap-10 sm:p-10",
        )}
      >
        {/* Cursor spotlight */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className={cn("relative", featured && "sm:shrink-0")}>
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-2xl transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110",
              accent.glyph,
              featured && "sm:size-24",
            )}
          >
            <ProgramGlyph
              glyph={program.glyph}
              className={cn("size-9", featured && "sm:size-14")}
            />
          </div>
        </div>

        <div className="relative mt-6 flex flex-1 flex-col sm:mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {program.cost === "Free" ? (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]",
                  accent.badge,
                )}
              >
                Free class
              </span>
            ) : null}
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {program.ages}
            </span>
          </div>

          <h3
            className={cn(
              "mt-3 text-[1.35rem] leading-snug text-ink",
              featured && "sm:text-[2rem]",
            )}
          >
            {program.title}
          </h3>

          <p
            className={cn(
              "mt-2.5 text-[0.97rem] leading-relaxed text-ink-muted",
              featured && "sm:max-w-xl sm:text-lg",
            )}
          >
            {featured ? program.description : program.tagline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {program.skills.slice(0, featured ? 4 : 3).map((skill) => (
              <li
                key={skill}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.74rem] font-medium",
                  accent.chip,
                )}
              >
                {skill}
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
            Learn more
            <ArrowIcon className="size-3.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProgramsShowcase() {
  const [track, setTrack] = useState<ProgramTrack | "all">("all");
  const visible = programs.filter(
    (program) => track === "all" || program.track === track,
  );
  const activeTrack = tracks.find((item) => item.id === track);

  return (
    <Section
      id="programs"
      size="wide"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#fdfcf8_100%)]"
    >
      <SectionHeading
        eyebrow="Learn, Explore & Grow"
        title={
          <>
            Eight ways to find out
            <br className="hidden sm:block" /> what you&apos;re good at.
          </>
        }
        intro="Our after-school program runs hands-on workshops for ages 8–17, plus free open-enrollment classes. Every material is provided — students bring nothing but curiosity."
      />

      {/* --- Track filter -------------------------------------------------- */}
      <Reveal delay={0.1} className="mt-10">
        <div
          role="tablist"
          aria-label="Filter programs by track"
          className="inline-flex flex-wrap gap-1 rounded-full bg-ink/[0.045] p-1.5"
        >
          {tracks.map((item) => {
            const selected = track === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTrack(item.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                  selected ? "text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="track-pill"
                    className="absolute inset-0 rounded-full bg-ink shadow-[var(--shadow-soft)]"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>
        {activeTrack ? (
          <p
            aria-live="polite"
            className="mt-4 text-sm text-ink-muted"
          >
            {activeTrack.blurb}{" "}
            <span className="font-semibold text-ink">
              {visible.length} {visible.length === 1 ? "program" : "programs"}
            </span>
          </p>
        ) : null}
      </Reveal>

      {/* --- Cards --------------------------------------------------------- */}
      <motion.div
        layout
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {visible.map((program) => (
            <ProgramCard
              key={program.slug}
              program={program}
              featured={program.featured && track !== "free-class"}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-4">
        <ButtonLink href="/programs" variant="secondary" size="lg">
          See all programs and schedules
          <ArrowIcon />
        </ButtonLink>
        <p className="text-sm text-ink-muted">
          Enrollment is rolling — call{" "}
          <a
            href="tel:+13187042808"
            className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
          >
            (318) 704-2808
          </a>{" "}
          to reserve a seat.
        </p>
      </Reveal>
    </Section>
  );
}
