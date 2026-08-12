import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The official Fresh Start Life Skills mark.
 *
 * `public/brand/logo.png` is the supplied artwork with its white background
 * un-composited to transparency (see the note in the asset pipeline) and the
 * padding trimmed, so the mark optically fills whatever box it is given.
 *
 * On dark ground the mark loses itself — its deepest figure is nearly the same
 * navy as our dark sections, and the negative-space path reads as a hole. So
 * `onDark` sets it on a warm-white coin, which is the intended treatment rather
 * than a workaround.
 */
export function LogoMark({
  className,
  onDark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
}) {
  const image = (
    <Image
      src="/brand/logo.png"
      alt=""
      width={512}
      height={512}
      priority={priority}
      className={cn("size-full object-contain", onDark && "p-[14%]")}
      sizes="(max-width: 640px) 48px, 64px"
    />
  );

  return (
    <span
      role="img"
      aria-label={`${site.legalName} logo`}
      className={cn(
        "relative block size-11 shrink-0",
        onDark && "rounded-full bg-cream shadow-[0_6px_18px_-6px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {image}
    </span>
  );
}

export function Logo({
  className,
  onDark = false,
  showTagline = true,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  showTagline?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark onDark={onDark} priority={priority} className="size-12" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.06rem] font-semibold tracking-tight",
            onDark ? "text-white" : "text-ink",
          )}
        >
          Fresh Start
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em]",
              onDark ? "text-sun-300" : "text-teal-700",
            )}
          >
            Life Skills
          </span>
        ) : null}
      </span>
    </span>
  );
}
