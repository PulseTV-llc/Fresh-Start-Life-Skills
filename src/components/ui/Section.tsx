import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Small all-caps label that sits above every section headline. */
export function Eyebrow({
  children,
  className,
  tone = "sun",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "sun" | "leaf" | "sky" | "inverse";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em]",
        tone === "sun" && "text-sun-700",
        tone === "leaf" && "text-leaf-700",
        tone === "sky" && "text-sky-brand-700",
        tone === "inverse" && "text-sun-200",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6",
          tone === "sun" && "bg-sun-400",
          tone === "leaf" && "bg-leaf-400",
          tone === "sky" && "bg-sky-brand-400",
          tone === "inverse" && "bg-sun-300/70",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "sun",
  className,
  inverse = false,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "sun" | "leaf" | "sky" | "inverse";
  className?: string;
  inverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        align === "center" && "mx-auto max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed sm:text-[1.18rem]",
            inverse ? "text-cream/80" : "text-ink-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  size = "default",
  ariaLabel,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "narrow" | "default" | "wide";
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative py-20 sm:py-28 lg:py-32", className)}
      // Offset so the sticky header never covers an anchored heading.
      style={{ scrollMarginTop: "6rem" }}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
