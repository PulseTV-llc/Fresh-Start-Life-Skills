import { cn } from "@/lib/utils";

/**
 * Branded stand-in for a photograph that does not exist yet.
 *
 * Rather than shipping a stock image that will never be replaced, each frame
 * states exactly which photo belongs in it. Swap the whole component for
 * `next/image` when Dorothy sends real photography — the aspect ratio and
 * rounding are already correct.
 *
 * Shooting notes for the real photos:
 *   • Natural light, students' hands and finished work in frame.
 *   • Landscape 3:2 at 2400px on the long edge, JPEG quality 80.
 *   • Signed media release on file for every identifiable child.
 */
export function PhotoPlaceholder({
  label,
  className,
  tone = "sun",
  aspect = "4/3",
}: {
  /** What photograph belongs here. Shown on the frame. */
  label: string;
  className?: string;
  tone?: "sun" | "leaf" | "sky";
  aspect?: string;
}) {
  const tones = {
    sun: "from-sun-100 via-sun-50 to-cream text-sun-800/70 ring-sun-200/70",
    leaf: "from-leaf-100 via-leaf-50 to-cream text-leaf-800/70 ring-leaf-200/70",
    sky: "from-sky-brand-100 via-sky-brand-50 to-cream text-sky-brand-800/70 ring-sky-brand-200/70",
  };

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative flex w-full items-end overflow-hidden rounded-[1.5rem] bg-gradient-to-br ring-1",
        tones[tone],
        className,
      )}
    >
      {/* Hill + sun motif keeps empty frames on-brand instead of looking broken */}
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="absolute inset-0 size-full opacity-45"
        fill="none"
      >
        <circle cx="272" cy="150" r="46" fill="currentColor" opacity="0.35" />
        <path
          d="M0 214c60-40 120-16 180-6s120-22 220-52v144H0V214Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M0 258c80-34 150-8 230 2s130-10 170-30v70H0v-42Z"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>

      <div className="relative flex items-center gap-2.5 p-5">
        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="3" y="5.5" width="18" height="14" rx="2.5" />
          <circle cx="8.5" cy="10.5" r="1.6" />
          <path d="m4 17 5-4.5 4.5 4 3-2.5L21 18" strokeLinecap="round" />
        </svg>
        <span className="text-[0.8rem] font-medium leading-snug">{label}</span>
      </div>
    </div>
  );
}
