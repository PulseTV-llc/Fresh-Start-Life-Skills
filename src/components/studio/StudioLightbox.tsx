"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { StudioArtwork } from "./StudioArtwork";
import { ArrowIcon } from "@/components/ui/Button";
import {
  studioCategories,
  programForCategory,
  type StudioPiece,
} from "@/lib/studio";

/**
 * Full-screen view of one piece.
 *
 * Hand-rolled rather than `<dialog>` because it needs to animate in and out and
 * to swap contents while open. That means owning the accessibility contract:
 * `aria-modal` + a labelled dialog role, a focus trap on Tab, Escape to close,
 * arrow keys to move between pieces, background scroll locked, and focus
 * returned to the card that opened it (handled by the gallery).
 */
export function StudioLightbox({
  pieces,
  index,
  onClose,
  onNavigate,
}: {
  pieces: StudioPiece[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const open = index !== null;
  const piece = open ? pieces[index] : null;
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useBrandMotion();

  const step = useCallback(
    (delta: number) => {
      if (index === null || pieces.length === 0) return;
      onNavigate((index + delta + pieces.length) % pieces.length);
    },
    [index, pieces.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
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
    // Move focus into the dialog so a screen reader lands on the title.
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, step]);

  const category = piece
    ? studioCategories.find((c) => c.id === piece.category)
    : null;
  const program = piece ? programForCategory(piece.category) : null;

  return (
    <AnimatePresence>
      {open && piece ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy-900/80 backdrop-blur-md"
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="studio-lightbox-title"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-full w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] outline-none md:grid-cols-[1.15fr_1fr]"
          >
            {/* --- The work ------------------------------------------------ */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-cream-100 md:aspect-auto md:h-full md:min-h-[26rem]">
              {piece.image ? (
                <Image
                  src={piece.image}
                  alt={piece.alt ?? piece.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
              ) : (
                <StudioArtwork
                          category={piece.category}
                          seed={piece.id}
                          variant={piece.variant}
                        />
              )}
            </div>

            {/* --- Caption panel --------------------------------------------- */}
            <div className="flex max-h-[70vh] flex-col overflow-y-auto p-7 sm:p-9">
              {category ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-teal-800">
                  {category.label}
                </span>
              ) : null}

              <h2
                id="studio-lightbox-title"
                className="mt-4 text-3xl leading-tight text-ink sm:text-4xl"
              >
                {piece.title}
              </h2>

              <p className="mt-2 font-medium text-ink-soft">
                {piece.student}, age {piece.age}
                <span className="text-ink-muted"> · {piece.season}</span>
              </p>

              <p className="mt-1 text-sm text-ink-muted">{piece.medium}</p>

              {program ? (
                <Link
                  href={`/programs/${program.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
                >
                  Made in {program.title}
                  <ArrowIcon className="size-3.5" />
                </Link>
              ) : null}

              <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                <p className="text-sm text-ink-muted">
                  {index + 1} of {pieces.length}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex size-11 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/[0.12]"
                  >
                    <span className="sr-only">Previous piece</span>
                    <ArrowIcon className="size-4 rotate-180 group-hover:translate-x-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex size-11 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition hover:bg-ink/[0.12]"
                  >
                    <span className="sr-only">Next piece</span>
                    <ArrowIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-cream/90 text-ink shadow-[var(--shadow-soft)] backdrop-blur transition hover:bg-white"
            >
              <span className="sr-only">Close</span>
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
