import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealChild, Reveal } from "@/components/ui/Reveal";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, programListSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { programs, tracks } from "@/lib/programs";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Programs — After-School Workshops for Ages 8–17",
  description:
    "Sewing, candle making, budgeting, cake decorating, t-shirt design, music and filmmaking — hands-on workshops for youth ages 8–17 in Alexandria, Louisiana, at low or no cost.",
  path: "/programs",
  keywords: [
    "after school program Alexandria LA",
    "free sewing classes for kids Louisiana",
    "youth filmmaking class Louisiana",
    "kids financial literacy class",
  ],
});

const accents = {
  sun: "bg-sun-100 text-sun-700 group-hover:ring-sun-300",
  green: "bg-green-100 text-green-700 group-hover:ring-green-300",
  teal: "bg-teal-100 text-teal-700 group-hover:ring-teal-300",
};

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={[
          programListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Learn, Explore & Grow"
        title="Every workshop we run."
        intro="Our after-school program gives young people ages 8–17 a rotating set of hands-on workshops, plus free open-enrollment classes. Materials are always provided."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Programs", href: "/programs" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/events">
            Sessions & registration
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href={site.contact.phoneHref} variant="secondary">
            Call {site.contact.phone}
          </ButtonLink>
        </div>
      </PageHero>

      {tracks
        .filter((track) => track.id !== "all")
        .map((track, trackIndex) => {
          const list = programs.filter((program) => program.track === track.id);
          if (list.length === 0) return null;

          return (
            <Section
              key={track.id}
              id={track.id}
              size="wide"
              className={trackIndex % 2 === 1 ? "bg-white" : undefined}
            >
              <SectionHeading
                eyebrow={track.id === "free-class" ? "No cost" : "Weekday sessions"}
                tone={track.id === "free-class" ? "green" : "sun"}
                title={track.label}
                intro={track.blurb}
              />

              <RevealGroup
                className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.08}
              >
                {list.map((program) => (
                  <RevealChild key={program.slug}>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-ink/[0.06] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-lift)]"
                    >
                      <span
                        className={cn(
                          "flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110",
                          accents[program.accent],
                        )}
                      >
                        <ProgramGlyph glyph={program.glyph} className="size-8" />
                      </span>

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {program.cost === "Free" ? (
                          <span className="rounded-full bg-green-600 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white">
                            Free
                          </span>
                        ) : null}
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                          {program.ages}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl leading-snug text-ink">
                        {program.title}
                      </h3>
                      <p className="mt-2.5 flex-1 leading-relaxed text-ink-muted">
                        {program.tagline}
                      </p>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-ink">
                        Program details
                        <ArrowIcon className="size-4" />
                      </span>
                    </Link>
                  </RevealChild>
                ))}

                {/* A one-card track would leave two dead columns; this fills the
                    row with something useful instead of whitespace. */}
                {list.length < 3 ? (
                  <RevealChild className="sm:col-span-1 lg:col-span-2">
                    <div className="flex h-full flex-col justify-center rounded-[1.75rem] border-2 border-dashed border-ink/15 p-8">
                      <h3 className="text-2xl text-ink">
                        More free classes are coming.
                      </h3>
                      <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
                        We add open-enrollment classes as volunteers and materials
                        allow. Tell us what you would like to see offered next —
                        parent requests genuinely shape the schedule.
                      </p>
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink"
                      >
                        Suggest a class
                        <ArrowIcon className="size-4" />
                      </Link>
                    </div>
                  </RevealChild>
                ) : null}
              </RevealGroup>
            </Section>
          );
        })}

      <Section className="bg-white">
        <Reveal className="rounded-[2rem] bg-[linear-gradient(150deg,#0a5054_0%,#012f38_100%)] p-9 text-cream sm:p-14">
          <h2 className="max-w-2xl text-3xl text-white sm:text-4xl">
            Not sure which program fits your child?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/75">
            Call and tell us what they like. We have put enough kids through
            enough workshops to have a good guess about where they will thrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.contact.phoneHref} size="lg">
              {site.contact.phone}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/contact" variant="inverse" size="lg">
              Send a message
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
