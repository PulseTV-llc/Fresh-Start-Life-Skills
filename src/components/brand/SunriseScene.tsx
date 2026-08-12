"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { RunningChild, type Stride } from "./RunningChild";
import { cn } from "@/lib/utils";

/**
 * The hero landscape: dawn sky, a rising sun, three ridges of hills and a line
 * of children running toward the light.
 *
 * Layers are separate DOM nodes so each can move at its own rate — hills barely
 * budge, the sun drifts, the motes float — which is what sells depth. All of it
 * collapses to a static composition under `prefers-reduced-motion`.
 *
 * Positioning note: every hill SVG uses `preserveAspectRatio="none"` and a fixed
 * height percentage of the hero, so a point at path-y sits at a *stable*
 * percentage from the bottom regardless of viewport size:
 *     bottom% = hillHeight% × (1 − y / viewBoxHeight)
 * The children's `bottom` values below are derived from the mid-ridge crest that
 * way, which is why they stay planted on the hill at every breakpoint.
 */

const MID_RIDGE =
  "M0 250 C 200 250 260 122 520 120 C 760 118 880 202 1080 190 C 1260 180 1340 150 1440 120 L1440 320 L0 320 Z";

const FAR_RIDGE =
  "M0 210 C 160 150 300 196 480 178 C 700 156 820 96 1010 108 C 1200 120 1320 176 1440 168 L1440 320 L0 320 Z";

const FRONT_RIDGE =
  "M0 168 C 220 96 420 150 640 140 C 900 128 1080 74 1440 122 L1440 320 L0 320 Z";

/**
 * Children on the mid ridge. `bottom` is derived from the crest formula above
 * against MID_RIDGE at a 26% layer height — change one and recompute the other.
 */
const RUNNERS: {
  left: string;
  bottom: string;
  height: string;
  stride: Stride;
  delay: number;
  hideOnMobile?: boolean;
}[] = [
  { left: "23%", bottom: "13.4%", height: "4.6vh", stride: "stride", delay: 0.1 },
  { left: "32%", bottom: "15.5%", height: "5.4vh", stride: "sprint", delay: 0.32 },
  { left: "41%", bottom: "15.6%", height: "6.2vh", stride: "leap", delay: 0.5 },
  {
    left: "50.5%",
    bottom: "14.1%",
    height: "5vh",
    stride: "cheer",
    delay: 0.7,
    hideOnMobile: true,
  },
  {
    left: "58%",
    bottom: "12.2%",
    height: "4.3vh",
    stride: "sprint",
    delay: 0.86,
    hideOnMobile: true,
  },
];

/** Dandelion seeds / light motes drifting up through the scene. */
const MOTES = [
  { left: "12%", top: "38%", size: 7, duration: 13, delay: 0 },
  { left: "22%", top: "62%", size: 5, duration: 17, delay: 2.4 },
  { left: "37%", top: "30%", size: 9, duration: 15, delay: 1.1 },
  { left: "55%", top: "52%", size: 6, duration: 19, delay: 3.6 },
  { left: "68%", top: "34%", size: 8, duration: 14, delay: 0.7 },
  { left: "78%", top: "58%", size: 5, duration: 18, delay: 2.9 },
  { left: "88%", top: "42%", size: 7, duration: 16, delay: 1.8 },
];

function useParallax(target: React.RefObject<HTMLDivElement | null>) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    // Pointer parallax is a desktop nicety — skip it on touch, where it would
    // only fire on tap and read as a glitch.
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY, reduceMotion]);

  return { scrollYProgress, smoothX, smoothY, reduceMotion };
}

export function SunriseScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, smoothX, smoothY, reduceMotion } = useParallax(ref);

  /** Hand the layer a live motion value, or a frozen one under reduced motion. */
  const still = <T extends string | number>(value: MotionValue<T>, fallback: T) =>
    reduceMotion ? fallback : value;

  // Depth ordering: sky drifts most, front ridge least — the inverse of how far
  // away each layer reads.
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const cloudY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const sunX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const sunDriftY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const cloudX = useTransform(smoothX, [-0.5, 0.5], [34, -34]);
  const frontX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* ---- Sky ---------------------------------------------------------- */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[120%]"
        style={{ y: still(skyY, "0%") }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(178deg,#a8ddff_0%,#cbeaff_26%,#e6f4ff_46%,#fff2dd_70%,#ffe3bd_88%,#ffd9ab_100%)]" />
        {/* Warm bloom around the sun, painted onto the sky itself */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_46%_at_69%_74%,rgba(255,177,90,0.72)_0%,rgba(255,205,140,0.35)_38%,rgba(255,255,255,0)_72%)]" />
      </motion.div>

      {/* ---- Clouds ------------------------------------------------------- */}
      <motion.div
        className="absolute inset-0"
        style={{ y: still(cloudY, "0%"), x: still(cloudX, 0) }}
      >
        <Cloud className="absolute left-[3%] top-[6%] w-[20vw] min-w-[150px] text-white/70 animate-drift" />
        <Cloud
          className="absolute right-[8%] top-[9%] w-[19vw] min-w-[140px] text-white/65 animate-drift"
          style={{ animationDelay: "-12s", animationDuration: "46s" }}
        />
        <Cloud
          className="absolute left-[58%] top-[24%] hidden w-[15vw] text-white/55 animate-drift sm:block"
          style={{ animationDelay: "-24s", animationDuration: "54s" }}
        />
      </motion.div>

      {/* ---- Sun ---------------------------------------------------------- */}
      <motion.div
        className="absolute bottom-[15%] left-[70%] -translate-x-1/2"
        style={{
          y: still(sunY, "0%"),
          x: still(sunX, 0),
          opacity: still(sunOpacity, 1),
        }}
      >
        <motion.div style={{ y: still(sunDriftY, 0) }} className="relative">
          {/* Halo rings, breathing */}
          <div className="absolute left-1/2 top-1/2 size-[46vh] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,168,66,0.42)_0%,rgba(255,196,120,0.16)_46%,rgba(255,255,255,0)_70%)] animate-sun-pulse" />
          <div
            className="absolute left-1/2 top-1/2 size-[30vh] max-h-[340px] max-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,148,32,0.5)_0%,rgba(255,255,255,0)_68%)] animate-sun-pulse"
            style={{ animationDelay: "-3.5s" }}
          />
          {/* Disc */}
          <div className="relative size-[16vh] max-h-[178px] min-h-[96px] min-w-[96px] max-w-[178px] rounded-full bg-[radial-gradient(circle_at_38%_32%,#fff4dc_0%,#ffcf85_34%,#ff9a3d_70%,#f97316_100%)] shadow-[0_0_90px_28px_rgba(255,159,64,0.42)]" />
        </motion.div>
      </motion.div>

      {/* ---- Far ridge ---------------------------------------------------- */}
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[38%] w-full"
        style={{ y: still(farY, "0%") }}
      >
        <defs>
          <linearGradient id="fsl-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c2e9cf" />
            <stop offset="100%" stopColor="#8ed3a8" />
          </linearGradient>
        </defs>
        <path d={FAR_RIDGE} fill="url(#fsl-far)" />
      </motion.svg>

      {/* ---- Mid ridge + the runners -------------------------------------- */}
      <motion.div
        className="absolute inset-0"
        style={{ y: still(midY, "0%") }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[26%] w-full"
        >
          <defs>
            <linearGradient id="fsl-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4fba77" />
              <stop offset="100%" stopColor="#1c8442" />
            </linearGradient>
          </defs>
          <path d={MID_RIDGE} fill="url(#fsl-mid)" />
        </svg>

        {RUNNERS.map((runner, index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute text-leaf-900",
              runner.hideOnMobile && "hidden md:block",
            )}
            style={{ left: runner.left, bottom: runner.bottom, height: runner.height }}
            initial={reduceMotion ? false : { opacity: 0, x: -28, y: 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.45 + runner.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="h-full animate-bob"
              style={{
                animationDelay: `${-runner.delay * 4}s`,
                animationDuration: `${5.5 + index * 0.6}s`,
              }}
            >
              <RunningChild stride={runner.stride} className="h-full w-auto" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ---- Front ridge -------------------------------------------------- */}
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[15%] w-full"
        style={{ y: still(frontY, "0%"), x: still(frontX, 0) }}
      >
        <defs>
          <linearGradient id="fsl-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f5a2c" />
            <stop offset="100%" stopColor="#072114" />
          </linearGradient>
        </defs>
        <path d={FRONT_RIDGE} fill="url(#fsl-front)" />
      </motion.svg>

      {/* ---- Motes -------------------------------------------------------- */}
      {!reduceMotion &&
        MOTES.map((mote, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,220,160,0.9)]"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.9, 0.6, 0],
              y: [0, -90, -180, -260],
              x: [0, 14, -10, 8],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

    </div>
  );
}

function Cloud({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 200 70" className={className} style={style} fill="currentColor">
      <path d="M42 62c-16 0-28-10-28-23S26 16 42 16c4-9 13-15 24-15 13 0 24 8 28 20 3-2 7-3 11-3 12 0 21 9 21 20 0 1 0 2-.2 3 10 2 17 10 17 19 0 1 0 1-.1 2H42z" />
    </svg>
  );
}
