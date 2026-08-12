import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { SunriseScene } from "@/components/brand/SunriseScene";
import { primaryNav } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Reuses the homepage landscape rather than a bespoke illustration — a lost
 * visitor should still land somewhere that feels like Fresh Start, and it keeps
 * one scene to maintain instead of two.
 */
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[40rem] flex-col overflow-hidden pb-[18vh] pt-28 sm:min-h-svh sm:pb-[16vh]">
      <SunriseScene />

      <Container size="wide" className="relative">
        <div className="max-w-2xl">
          <p className="font-display text-6xl font-semibold text-gradient-sunrise sm:text-7xl">
            404
          </p>
          <h1 className="mt-3 text-[2.5rem] leading-tight text-ink sm:text-5xl">
            This one ran off over the hill.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            The page you were looking for is not here. Let&apos;s get you back to
            something useful.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/programs" variant="secondary" size="lg">
              See our programs
            </ButtonLink>
          </div>

          <nav aria-label="Helpful links" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-ink-soft underline decoration-sun-400/60 decoration-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
