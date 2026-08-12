"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "motion/react";

/**
 * Number that counts up the first time it scrolls into view.
 *
 * Writes through a motion value instead of React state so a 1.6s count is one
 * animation rather than ~90 re-renders. Reduced motion gets the final value with
 * no animation at all.
 */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? to : 0);
  const rounded = useTransform(count, (value) => Math.round(value).toLocaleString());

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, count, to, duration]);

  return (
    <span ref={ref} className={className}>
      {/* The live value is decorative; the accessible name carries the total. */}
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
