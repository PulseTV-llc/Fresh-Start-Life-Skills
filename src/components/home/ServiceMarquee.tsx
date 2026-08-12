import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/**
 * The band directly beneath the hero: the three facts a visitor needs before
 * anything else (who it's for, where, what it costs), over a continuous strip of
 * the communities Fresh Start serves.
 *
 * The marquee list is duplicated so the -50% keyframe loops seamlessly; the
 * whole strip is decorative because the same list is announced properly in the
 * hero's screen-reader summary and again in the footer.
 */

const facts = [
  { value: "Ages 8–17", label: "Open to youth across the region" },
  { value: "8 workshops", label: "Sewing to filmmaking, all hands-on" },
  { value: "Low or no cost", label: "Materials always provided" },
];

export function ServiceMarquee() {
  const areas = [...site.serviceAreas, "and your community next"];

  return (
    <div className="relative border-b border-ink/[0.07] bg-cream-100">
      <Container size="wide">
        <dl className="grid gap-6 py-10 sm:grid-cols-3 sm:gap-10">
          {facts.map((fact) => (
            <div key={fact.value} className="flex items-baseline gap-3 sm:block">
              <dt className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {fact.value}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-muted sm:mt-1">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div
        aria-hidden="true"
        className="relative overflow-hidden border-t border-ink/[0.07] py-3.5"
      >
        {/* Feathered edges so words dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream-100 to-transparent" />

        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {areas.map((area) => (
                <li
                  key={`${copy}-${area}`}
                  className="flex items-center gap-8 px-8 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted"
                >
                  {area}
                  <span className="size-1.5 rounded-full bg-sun-400" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
