import { cn } from "@/lib/utils";
import type { Program } from "@/lib/programs";

/**
 * Hand-drawn glyph for each program.
 *
 * Custom line art rather than a generic icon set — every workshop gets a mark
 * that actually depicts the thing (a sewing machine, a clapperboard, a piping
 * bag) so the Programs grid reads at a glance. Drawn on a 48×48 grid at a 2.2px
 * stroke so the whole set stays optically consistent.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const glyphs: Record<Program["glyph"], React.ReactNode> = {
  // Machine profile: base, column, over-arm, needle head, spool, handwheel.
  sewing: (
    <>
      <rect {...stroke} x="6" y="34.5" width="36" height="6.5" rx="1.8" />
      <path {...stroke} d="M12 15h24a3 3 0 0 1 3 3v16.5" />
      <path {...stroke} d="M12 15v9" />
      <path {...stroke} d="M12 24v5.5" />
      <path {...stroke} d="M9.2 29.5h5.6" />
      <path {...stroke} d="M17 15v-4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v4" />
      <circle {...stroke} cx="39" cy="26" r="3" />
    </>
  ),
  candle: (
    <>
      <path
        {...stroke}
        d="M14 24h20a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V26a2 2 0 0 1 2-2Z"
      />
      <path {...stroke} d="M24 24v-4" />
      <path
        {...stroke}
        d="M24 20c3.2-2.1 4.6-4.6 4-7.6-.4-2-1.8-3.6-4-4.4-2 1.7-3 3.4-3 5.2 0 1.4.5 2.4 1 3.2-1.4.1-2.4-.5-3-1.8-.8 2.2-.1 4.1 2 5.4"
      />
      <path {...stroke} d="M17 31h6" opacity="0.5" />
    </>
  ),
  // Savings growing: a stack of coins beside a rising arrow.
  budget: (
    <>
      <ellipse {...stroke} cx="17" cy="17" rx="9.5" ry="3.8" />
      <path {...stroke} d="M7.5 17v7c0 2.1 4.3 3.8 9.5 3.8s9.5-1.7 9.5-3.8v-7" />
      <path {...stroke} d="M7.5 24v7c0 2.1 4.3 3.8 9.5 3.8s9.5-1.7 9.5-3.8v-7" />
      <path {...stroke} d="M36 39V23" />
      <path {...stroke} d="m31.5 27 4.5-4.5 4.5 4.5" />
    </>
  ),
  cake: (
    <>
      <path
        {...stroke}
        d="M10 41V29c0-1.7 1.3-3 3-3h22c1.7 0 3 1.3 3 3v12"
      />
      <path {...stroke} d="M7 41h34" />
      <path {...stroke} d="M14 26v-5c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v5" />
      <path {...stroke} d="M10 33c3 0 3 2.6 6 2.6S19 33 22 33s3 2.6 6 2.6S31 33 34 33" />
      <path {...stroke} d="M24 18v-4" />
      <path {...stroke} d="M24 12.5c1.6-1.2 1.8-2.6 0-4.5-1.8 1.9-1.6 3.3 0 4.5Z" />
    </>
  ),
  tshirt: (
    <>
      <path
        {...stroke}
        d="M19 8h10l10 5-3 8-4-1.6V40a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1V19.4L12 21l-3-8 10-5Z"
      />
      <path {...stroke} d="M19 8c0 2.8 2.2 5 5 5s5-2.2 5-5" />
      <path
        {...stroke}
        d="m24 24 1.8 3.7 4.2.6-3 2.9.7 4-3.7-1.9-3.7 1.9.7-4-3-2.9 4.2-.6L24 24Z"
        opacity="0.65"
      />
    </>
  ),
  music: (
    <>
      <path {...stroke} d="M20 34V13l17-4v21" />
      <circle {...stroke} cx="15" cy="34" r="5" />
      <circle {...stroke} cx="32" cy="30" r="5" />
      <path {...stroke} d="M20 20l17-4" />
    </>
  ),
  film: (
    <>
      <path
        {...stroke}
        d="M8 22h24a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V24a2 2 0 0 1 2-2Z"
      />
      <path {...stroke} d="m34 29 7-4v12l-7-4v-4Z" />
      <path {...stroke} d="m9 22 3-6 5 6" opacity="0.85" />
      <path {...stroke} d="m19 22 3-6 5 6" opacity="0.85" />
      <path {...stroke} d="m29 22 3-6" opacity="0.85" />
      <path {...stroke} d="M6 16 33 11" />
    </>
  ),
  // Nodes resolving into a rising launch arrow — build, then launch.
  "ai-builder": (
    <>
      <path {...stroke} d="M24 41V22" />
      <path {...stroke} d="m16.5 29.5 7.5-7.5 7.5 7.5" />
      <circle {...stroke} cx="10" cy="14" r="3.4" />
      <circle {...stroke} cx="24" cy="8" r="3.4" />
      <circle {...stroke} cx="38" cy="14" r="3.4" />
      <circle {...stroke} cx="12" cy="30" r="3.2" />
      <circle {...stroke} cx="36" cy="30" r="3.2" />
      <path {...stroke} d="M12.8 16.6 20.9 9.9" opacity="0.75" />
      <path {...stroke} d="M35.2 16.6 27.1 9.9" opacity="0.75" />
      <path {...stroke} d="M10.4 17.4 11.6 26.8" opacity="0.55" />
      <path {...stroke} d="M37.6 17.4 36.4 26.8" opacity="0.55" />
    </>
  ),
  "creative-sewing": (
    <>
      <path {...stroke} d="M34 12 15 31" />
      <path {...stroke} d="m34 12 3 3-19 19-4 1 1-4" />
      <circle {...stroke} cx="35.5" cy="13.5" r="0.6" />
      <path
        {...stroke}
        d="M31 27c-6 1.5-9 4.5-9 8 0 2.5 2 4.5 4.5 4.5 2 0 3.5-1.3 3.5-3 0-1.5-1.2-2.5-2.5-2.5-1 0-1.8.6-2 1.4"
      />
      <path
        {...stroke}
        d="M13 16c1.6-1.9 4-1.9 5 0 1-1.9 3.4-1.9 5 0 1.2 1.5-.4 4-5 6.5C13.4 20 11.8 17.5 13 16Z"
      />
    </>
  ),
};

export function ProgramGlyph({
  glyph,
  className,
}: {
  glyph: Program["glyph"];
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-12", className)} aria-hidden="true">
      {glyphs[glyph]}
    </svg>
  );
}
