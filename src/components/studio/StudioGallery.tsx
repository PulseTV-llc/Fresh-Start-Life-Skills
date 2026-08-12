"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { StudioArtwork, StudioArtworkDefs } from "./StudioArtwork";
import { StudioLightbox } from "./StudioLightbox";
import {
  studioCategories,
  studioPieces,
  categoryCount,
  type StudioCategory,
  type StudioPiece,
} from "@/lib/studio";
import { cn } from "@/lib/utils";

const ratioClass: Record<StudioPiece["ratio"], string> = {
  square: "aspect-square",
  portrait: "aspect-4/5",
  landscape: "aspect-4/3",
  tall: "aspect-2/3",
};

const accentRing: Record<string, string> = {
  sun: "group-hover:ring-sun-300",
  green: "group-hover:ring-green-300",
  teal: "group-hover:ring-teal-300",
  navy: "group-hover:ring-navy-300",
};

/**
 * The Studio wall.
 *
 * A CSS multi-column masonry rather than a grid: mixed card ratios are the
 * whole point, and columns keep the DOM order (and therefore the tab order)
 * exactly as authored. Filtering animates opacity and scale instead of layout,
 * because column reflow cannot be interpolated smoothly.
 */
export function StudioGallery() {
  const [filter, setFilter] = useState<StudioCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useBrandMotion();
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const visible =
    filter === "all"
      ? studioPieces
      : studioPieces.filter((piece) => piece.category === filter);

  const activeCategory = studioCategories.find((c) => c.id === filter);

  function close() {
    const piece = openIndex !== null ? visible[openIndex] : null;
    setOpenIndex(null);
    // Return focus to the card that opened the dialog. WCAG 2.4.3.
    if (piece) {
      requestAnimationFrame(() => triggerRefs.current.get(piece.id)?.focus());
    }
  }

  return (
    <>
      <StudioArtworkDefs />

      {/* --- Filter ---------------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <div
          role="group"
          aria-label="Filter student work by program"
          className="flex flex-wrap gap-2"
        >
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Everything"
            count={studioPieces.length}
          />
          {studioCategories.map((category) => (
            <FilterChip
              key={category.id}
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
              label={category.label}
              count={categoryCount(category.id)}
            />
          ))}
        </div>

        <p aria-live="polite" className="text-sm text-ink-muted">
          {activeCategory ? `${activeCategory.blurb} ` : "Every piece on the wall. "}
          <span className="font-semibold text-ink">
            Showing {visible.length}{" "}
            {visible.length === 1 ? "piece" : "pieces"}
          </span>
        </p>
      </div>

      {/* --- The wall -------------------------------------------------------- */}
      <div className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        <AnimatePresence>
          {visible.map((piece, index) => {
            const category = studioCategories.find((c) => c.id === piece.category);
            return (
              <motion.div
                key={piece.id}
                layout={false}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.42,
                  delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  type="button"
                  ref={(node) => {
                    if (node) triggerRefs.current.set(piece.id, node);
                    else triggerRefs.current.delete(piece.id);
                  }}
                  onClick={() => setOpenIndex(index)}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[1.5rem] text-left ring-1 ring-ink/[0.07] transition-all duration-500 ease-[var(--ease-out-expo)]",
                    "shadow-[var(--shadow-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
                    accentRing[category?.accent ?? "teal"],
                  )}
                >
                  <div className={cn("relative w-full overflow-hidden", ratioClass[piece.ratio])}>
                    {piece.image ? (
                      <Image
                        src={piece.image}
                        alt={piece.alt ?? piece.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="size-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105">
                        <StudioArtwork
                          category={piece.category}
                          seed={piece.id}
                          variant={piece.variant}
                        />
                      </div>
                    )}

                    {/* Caption panel: always readable, lifts on hover/focus */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 via-navy-900/55 to-transparent p-5 pt-14">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-sun-300">
                        {category?.label}
                      </p>
                      <p className="mt-1.5 font-display text-xl font-semibold leading-tight text-white">
                        {piece.title}
                      </p>
                      <p className="mt-1 text-sm text-cream/80">
                        {piece.student}, age {piece.age}
                      </p>

                      <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-focus-visible:opacity-100">
                        Read the story
                        <svg
                          viewBox="0 0 20 20"
                          className="size-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* The accessible name carries everything the visuals convey */}
                  <span className="sr-only">
                    {piece.title} by {piece.student}, age {piece.age} —{" "}
                    {category?.label}. Open the full story.
                  </span>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <StudioLightbox
        pieces={visible}
        index={openIndex}
        onClose={close}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-[var(--ease-out-expo)]",
        active
          ? "-translate-y-0.5 border-navy-700 bg-navy-700 text-white shadow-[var(--shadow-soft)]"
          : "border-ink/10 text-ink-soft hover:border-navy-300 hover:text-ink",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[0.68rem] font-bold tabular-nums",
          active ? "bg-white/20 text-white" : "bg-ink/[0.06] text-ink-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}
