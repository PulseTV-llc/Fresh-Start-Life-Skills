import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The Fresh Start mark: a rising sun over green hills with two children running
 * toward it, inside a soft-edged badge.
 *
 * Drawn as vector rather than dropped in as a raster so it stays crisp at every
 * size and can be recolored for the dark footer.
 *
 * TODO(assets): if Dorothy has the original logo artwork (AI/EPS/SVG), swap this
 * for the authentic mark — this is a faithful reconstruction of the motif.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = "fsl-logo";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-10", className)}
      role="img"
      aria-label={`${site.name} logo`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7acfff" />
          <stop offset="55%" stopColor="#cfeaff" />
          <stop offset="100%" stopColor="#ffe9d2" />
        </linearGradient>
        <linearGradient id={`${id}-sun`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb870" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id={`${id}-hill-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#45b26b" />
          <stop offset="100%" stopColor="#22964c" />
        </linearGradient>
        <linearGradient id={`${id}-hill-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16783c" />
          <stop offset="100%" stopColor="#103f25" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#${id}-sky)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {/* Sun rays */}
        <g stroke="#ffb870" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
          <path d="M32 8v5" />
          <path d="M18.5 13.5l3 4" />
          <path d="M45.5 13.5l-3 4" />
          <path d="M9 26h5" />
          <path d="M55 26h-5" />
        </g>

        {/* Rising sun */}
        <circle cx="32" cy="31" r="10" fill={`url(#${id}-sun)`} />

        {/* Back hill */}
        <path
          d="M-4 44c10-9 20-11 30-6s22 3 42-6v36H-4z"
          fill={`url(#${id}-hill-back)`}
        />

        {/* Children running toward the sun, on the crest of the front hill */}
        <g fill="#0d3520" transform="translate(20 32.5) scale(0.42)">
          <g stroke="#0d3520" strokeWidth="4.6" strokeLinecap="round" fill="none">
            <path d="M12 9.5 L10 18" />
            <path d="M10 18 L4.5 25 L5 30" />
            <path d="M10 18 L16 22 L17.5 29.5" />
            <path d="M11.2 12 L17 9.5" />
            <path d="M11 12.5 L5 15.5" />
          </g>
          <circle cx="12.8" cy="5.6" r="4.1" />
        </g>
        <g fill="#0d3520" transform="translate(32 30) scale(0.5)">
          <g stroke="#0d3520" strokeWidth="4.6" strokeLinecap="round" fill="none">
            <path d="M12.5 9 L10 17" />
            <path d="M10 17 L3.5 21.5 L2.5 26" />
            <path d="M10 17 L17 19.5 L20 24.5" />
            <path d="M11.6 11.5 L18 8" />
            <path d="M11.2 12 L5 10" />
          </g>
          <circle cx="13.2" cy="5.2" r="4.1" />
        </g>

        {/* Front hill */}
        <path
          d="M-4 52c12-10 24-12 36-6s18 5 36-8v30H-4z"
          fill={`url(#${id}-hill-front)`}
        />
      </g>

      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Logo({
  className,
  inverse = false,
  showTagline = true,
}: {
  className?: string;
  inverse?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="size-11 shrink-0 text-ink" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.06rem] font-semibold tracking-tight",
            inverse ? "text-white" : "text-ink",
          )}
        >
          Fresh Start
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em]",
              inverse ? "text-sun-200" : "text-sun-700",
            )}
          >
            Life Skills
          </span>
        ) : null}
      </span>
    </span>
  );
}
