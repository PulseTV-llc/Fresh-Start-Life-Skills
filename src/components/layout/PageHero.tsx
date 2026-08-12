import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Compact page header shared by every route below the homepage.
 *
 * Keeps the sunrise motif going — dawn gradient, a hill silhouette at the base —
 * without re-running the full animated hero scene on secondary pages, which
 * would cost layout work nobody asked for.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
  tone = "sun",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
  tone?: "sun" | "leaf" | "sky";
}) {
  const washes = {
    sun: "from-sun-100 via-cream-100 to-cream",
    leaf: "from-leaf-100 via-cream-100 to-cream",
    sky: "from-sky-brand-100 via-cream-100 to-cream",
  };

  return (
    <section className={cn("relative isolate overflow-hidden bg-gradient-to-b pb-16 pt-32 sm:pb-24 sm:pt-40", washes[tone])}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,158,44,0.28)_0%,rgba(255,158,44,0)_66%)]"
      />
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 w-full text-cream"
        fill="currentColor"
      >
        <path d="M0 62c220-52 420 12 700-6s520-58 740-6v70H0V62Z" />
      </svg>

      <Container size="wide" className="relative">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-ink-muted/50">
                      /
                    </span>
                  ) : null}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ink"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-5 text-[2.7rem] leading-[1.06] text-ink sm:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
