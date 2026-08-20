import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealChild, Reveal } from "@/components/ui/Reveal";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, programListSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { programs, tracks, capstoneProgram, programAges } from "@/lib/programs";
import { ageRange } from "@/lib/ageBands";
import { AgeGroupsSection } from "@/components/programs/AgeGroupsSection";
import { capstone } from "@/lib/capstone";
import { site, mailto } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Programs — Hands-On Workshops for Ages 8 & Up",
  description:
    "Sewing, candle making, budgeting, cake decorating, t-shirt design, music and filmmaking — hands-on workshops for kids, teens and adults in Alexandria, Louisiana, at low or no cost. Adult groups run advanced sessions on top.",
  path: "/programs",
  keywords: [
    "after school program Alexandria LA",
    "adult education classes Alexandria LA",
    "free sewing classes for kids Louisiana",
    "adult sewing classes Louisiana",
    "youth filmmaking class Louisiana",
    "kids financial literacy class",
    "adult financial literacy class Louisiana",
    "vocational training for adults central Louisiana",
  ],
});

const accents = {
  sun: "bg-sun-100 text-sun-700 group-hover:ring-sun-300",
  green: "bg-green-100 text-green-700 group-hover:ring-green-300",
  teal: "bg-teal-100 text-teal-700 group-hover:ring-teal-300",
  navy: "bg-navy-100 text-navy-700 group-hover:ring-navy-300",
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
        intro="A rotating set of hands-on workshops for kids, teens and adults — each age group in its own session, with the 18+ groups carrying on into the advanced material. Materials are always provided."
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

      {/* --- The capstone, lifted out of the ordinary grid ---------------- */}
      <Section size="wide" className="pb-0 pt-14 sm:pt-16">
        <Reveal>
          <Link
            href={`/programs/${capstone.slug}`}
            className="group relative block overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#012f38_0%,#01414d_45%,#0a5054_100%)] p-8 text-cream shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-12"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-40 h-[32rem] bg-[radial-gradient(55%_50%_at_50%_100%,rgba(242,166,41,0.32)_0%,rgba(242,166,41,0)_66%)]"
            />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-sun-400 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink">
                  {capstone.motto} · The capstone
                </span>
                <h2 className="mt-5 text-3xl leading-[1.1] text-white sm:text-[2.6rem]">
                  {capstone.name}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/80">
                  {capstoneProgram.tagline} Students use AI to build a website,
                  iPhone and Android apps, sign-in, a database, payments — and
                  deploy the whole thing live.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {capstoneProgram.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-cream/10 px-3 py-1.5 text-sm text-cream/85"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 font-semibold text-sun-300">
                  Explore the capstone
                  <ArrowIcon className="size-4" />
                </span>
              </div>

              <div className="lg:col-span-4">
                <span className="flex size-20 items-center justify-center rounded-3xl bg-sun-400 text-ink transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 lg:ml-auto lg:size-24">
                  <ProgramGlyph glyph="ai-builder" className="size-11 lg:size-14" />
                </span>
                <dl className="mt-6 flex gap-8 lg:justify-end">
                  <div>
                    <dt className="text-xs text-cream/55">Ages</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">
                      {ageRange(capstone.bands)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-cream/55">Length</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">
                      8 weeks
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Link>
        </Reveal>
      </Section>

      <AgeGroupsSection />

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
                      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream p-7 ring-1 ring-ink/[0.06] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-lift)]"
                    >
                      {program.photo ? (
                        <div className="relative -mx-7 -mt-7 aspect-16/10 overflow-hidden">
                          <Image
                            src={program.photo}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                          />
                        </div>
                      ) : null}

                      <span
                        className={cn(
                          "flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110",
                          accents[program.accent],
                          program.photo &&
                            "relative z-10 -mt-8 shadow-[var(--shadow-soft)] ring-4 ring-cream group-hover:ring-white",
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
                          {programAges(program)}
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
            Not sure which program fits?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/75">
            Call and tell us what you — or your child — are drawn to, and which
            group you would be joining. We will point you at the workshop and the
            session that fit. You can also email{" "}
            <a
              href={mailto(site.emails.support)}
              className="font-semibold text-sun-300 underline-offset-4 hover:underline"
            >
              {site.emails.support}
            </a>
            .
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
