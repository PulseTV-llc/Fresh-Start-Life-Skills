"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { eventPhotos, type EventPhoto } from "@/lib/eventPhotos";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { cn } from "@/lib/utils";

/**
 * The session photography wall.
 *
 * A CSS multi-column masonry, the same idiom as the studio gallery: every
 * photograph keeps its own aspect ratio, so nothing is cropped and the columns
 * cannot leave a hole the way a fixed grid does with mixed tile spans.
 *
 * WHY NOT `RevealGroup` HERE — this matters, it was a real bug.
 * `RevealGroup` gates its children on `whileInView` with `viewport.amount`, a
 * fraction of the CONTAINER that has to be on screen before anything animates
 * in. With fifteen photographs that container was short enough to clear the
 * threshold. At thirty-eight it is roughly six thousand pixels tall, and no
 * tablet viewport can ever show twenty per cent of that at once — so the
 * observer never fired, the children stayed at `opacity: 0`, and the section
 * rendered as a heading above a tall blank space. Every tile now runs its own
 * `whileInView` instead: a tile is a few hundred pixels tall, so the threshold
 * is always reachable no matter how long the wall grows.
 */

const categoryLabel: Record<EventPhoto["category"], string> = {
  baking: "Cake Club",
  sewing: "Sewing & Textiles",
  craft: "Workshop",
};

function Tile({
  photo,
  index,
  onOpen,
}: {
  photo: EventPhoto;
  index: number;
  onOpen: (index: number) => void;
}) {
  const reduceMotion = useBrandMotion();

  return (
    <motion.div
      className="mb-4 break-inside-avoid sm:mb-5"
      // Transform-only on purpose. A tile must never be able to end up
      // invisible: if the observer never fires — reduced-motion shims,
      // throttled rAF in a background tab, a hydration failure — an
      // opacity-gated tile stays at zero and the wall renders as blank space,
      // which is exactly how this section broke before. The worst case here is
      // a tile sitting 22px low, which nobody will ever notice.
      initial={reduceMotion ? false : { y: 22 }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photograph: ${photo.alt}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-[1.5rem] bg-cream text-left",
          "ring-1 ring-ink/[0.07] shadow-[var(--shadow-soft)]",
          "transition-all duration-500 ease-[var(--ease-out-expo)]",
          "hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] hover:ring-sun-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.wide ? 1600 : 1200}
          height={photo.wide ? 1200 : 1600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />

        {/* Caption panel — hidden until hover or keyboard focus. */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 p-5 pt-14",
            "bg-gradient-to-t from-navy-900/90 via-navy-900/45 to-transparent",
            "opacity-0 transition-opacity duration-500",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-sun-300">
            {categoryLabel[photo.category]}
          </span>
          <span className="mt-1.5 block font-display text-sm leading-snug text-white">
            {photo.alt}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;
  const photo = open ? eventPhotos[index] : null;
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useBrandMotion();

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + eventPhotos.length) % eventPhotos.length);
    },
    [index, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key !== "Tab") return;

      // Trap focus inside the panel.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close photograph"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy-900/85 backdrop-blur-md"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            tabIndex={-1}
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col items-center gap-4 focus:outline-none"
          >
            <motion.div
              key={photo.src}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[var(--shadow-lift)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.wide ? 1600 : 1200}
                height={photo.wide ? 1200 : 1600}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="max-h-[72vh] w-full object-contain"
                priority
              />
            </motion.div>

            <p className="max-w-2xl text-center text-sm leading-relaxed text-cream/85">
              {photo.alt}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className="flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/25 transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-300"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="min-w-20 text-center text-sm font-medium text-cream/70">
                {index + 1} / {eventPhotos.length}
              </span>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className="flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/25 transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-300"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close photograph"
                className="ml-2 flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/25 transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-300"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function EventGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4">
        {eventPhotos.map((photo, index) => (
          <Tile
            key={photo.src}
            photo={photo}
            index={index}
            onOpen={setOpenIndex}
          />
        ))}
      </div>

      <Lightbox
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
