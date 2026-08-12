import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button hierarchy mirrors the logo's own: deep navy carries the weight, the
 * amber sun is the accent that only ever appears on the ask.
 *
 * `accent` is reserved for giving CTAs. It pairs amber with ink rather than
 * white text — white on #f2a629 measures 2.1:1, ink measures 7.7:1.
 */
type Variant = "primary" | "accent" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-[var(--ease-out-expo)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white shadow-[var(--shadow-deep)] hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(1,83,91,0.2),0_24px_50px_-14px_rgba(1,63,74,0.5)]",
  accent:
    "bg-sun-500 text-ink shadow-[var(--shadow-glow)] hover:bg-sun-400 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(242,166,41,0.28),0_24px_50px_-14px_rgba(207,127,16,0.55)]",
  secondary:
    "bg-white text-ink ring-1 ring-ink/10 shadow-[var(--shadow-soft)] hover:ring-ink/20 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
  ghost:
    "text-ink-soft hover:text-ink hover:bg-ink/[0.04]",
  inverse:
    "bg-white text-navy-800 hover:bg-cream hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** Right-pointing arrow that nudges on hover — used inside buttons and links. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
