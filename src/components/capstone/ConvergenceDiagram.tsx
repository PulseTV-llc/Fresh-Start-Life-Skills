"use client";

import { motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { studioCategories } from "@/lib/studio";
import { capstone } from "@/lib/capstone";

/**
 * Six crafts converging into the capstone, and out the other side as a live
 * business.
 *
 * The connectors are one SVG stretched behind a CSS grid with
 * `preserveAspectRatio="none"`. That means no measuring the DOM and no resize
 * observer: the left column is six equal rows, so row *i* is always centred at
 * `(i + 0.5) / 6` of the height, and the curve endpoints can be written as
 * constants. `vector-effect="non-scaling-stroke"` keeps the line weight even
 * once the box is stretched.
 *
 * The diagram is decorative — every label in it is real text in the grid above,
 * so screen readers get the list, not the drawing.
 */

const OUTPUTS = [
  "A live website",
  "iPhone & Android apps",
  "Sign-in & a database",
  "Payments that work",
];

export function ConvergenceDiagram() {
  const reduceMotion = useBrandMotion();

  const draw = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: {
            pathLength: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
            opacity: { duration: 0.3, delay },
          },
        };

  const pop = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative">
      {/* --- Connectors (desktop only) ---------------------------------- */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block"
      >
        {studioCategories.map((_, i) => {
          const y = ((i + 0.5) / 6) * 100;
          return (
            <motion.path
              key={i}
              d={`M 31.5 ${y} C 40 ${y}, 42 50, 50 50`}
              fill="none"
              stroke="#f2a629"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              vectorEffect="non-scaling-stroke"
              {...draw(0.1 + i * 0.07)}
            />
          );
        })}
        {OUTPUTS.map((_, i) => {
          const y = ((i + 0.5) / 4) * 100;
          return (
            <motion.path
              key={i}
              d={`M 50 50 C 58 50, 60 ${y}, 68.5 ${y}`}
              fill="none"
              stroke="#6ed2cb"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              vectorEffect="non-scaling-stroke"
              {...draw(0.7 + i * 0.09)}
            />
          );
        })}
      </svg>

      <div className="relative grid items-center gap-8 lg:grid-cols-3 lg:gap-10">
        {/* --- The crafts ------------------------------------------------ */}
        <div>
          <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/50 lg:mb-3">
            What they already make
          </p>
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-1 lg:grid-rows-6 lg:gap-0">
            {studioCategories.map((category, i) => (
              <motion.li
                key={category.id}
                {...pop(0.05 + i * 0.05)}
                className="flex items-center lg:h-full"
              >
                <span className="flex w-full items-center gap-2.5 rounded-full bg-cream/[0.08] px-4 py-2.5 text-sm font-medium text-cream ring-1 ring-cream/15">
                  <span className="size-1.5 shrink-0 rounded-full bg-sun-400" />
                  {category.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* --- The lab --------------------------------------------------- */}
        <motion.div {...pop(0.42)} className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle,rgba(242,166,41,0.28)_0%,rgba(242,166,41,0)_68%)]"
          />
          <div className="relative rounded-[1.75rem] bg-gradient-to-br from-cream to-cream-100 p-7 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-sun-300/40 sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-sun-300">
              The capstone
            </span>
            <p className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.9rem]">
              {capstone.name}
            </p>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
              Eight weeks using AI to build the real business around the thing
              you made.
            </p>
          </div>
        </motion.div>

        {/* --- What ships ------------------------------------------------ */}
        <div>
          <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/50 lg:mb-3">
            What they launch
          </p>
          <ul className="grid gap-2.5 lg:grid-rows-4 lg:gap-0">
            {OUTPUTS.map((output, i) => (
              <motion.li
                key={output}
                {...pop(0.75 + i * 0.07)}
                className="flex items-center lg:h-full"
              >
                <span className="flex w-full items-center gap-2.5 rounded-full bg-teal-500/15 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-teal-300/30">
                  <svg
                    viewBox="0 0 20 20"
                    className="size-4 shrink-0 text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path
                      d="m4 10.4 3.2 3.2L16 5.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {output}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
