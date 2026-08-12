"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance.
 *
 * Everything animates *in* once and stays put — no re-triggering on scroll-up,
 * which reads as jitter. When the OS asks for reduced motion we render the
 * final state immediately rather than a faster animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "header" | "article";
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its `RevealChild` descendants. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export const revealChildVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealChild({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={revealChildVariants}>
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word headline reveal. Each word gets its own span so the mask is
 * clean; the whole line still reads as one string to screen readers because the
 * wrapper carries the plain text in `aria-label`.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  highlight,
  highlightClassName = "text-gradient-sunrise",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** Words (case-insensitive, punctuation-stripped) to paint with the accent. */
  highlight?: string[];
  highlightClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const shouldHighlight = (word: string) =>
    highlight?.some(
      (h) => h.toLowerCase() === word.toLowerCase().replace(/[.,!?—]/g, ""),
    );

  if (reduceMotion) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn(shouldHighlight(word) && highlightClassName)}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={cn("inline-block", wordClassName, shouldHighlight(word) && highlightClassName)}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
