import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import type { Curriculum } from "@/lib/curriculum";
import type { Program } from "@/lib/programs";
import { cn } from "@/lib/utils";

/**
 * The curriculum block. One component, every program page — including the
 * capstone, so the AI Builder Lab and Kids Creative Sewing read as the same
 * document with different content rather than two different websites.
 *
 * It runs on a dark band on every page. Craft pages are otherwise light, and
 * that contrast is doing a job: the curriculum is the part a parent came to
 * read, so it gets the weight.
 *
 * Every session's detail sits in the DOM rather than behind a disclosure. This
 * is the substance search engines will weigh, and collapsing it would trade
 * real reach for a little tidiness.
 */

const accents = [
  { node: "bg-teal-400 text-teal-900", chip: "bg-teal-400/15 text-teal-100" },
  { node: "bg-sun-400 text-ink", chip: "bg-sun-400/15 text-sun-200" },
  { node: "bg-green-400 text-green-900", chip: "bg-green-400/15 text-green-200" },
  { node: "bg-navy-300 text-navy-900", chip: "bg-navy-300/15 text-navy-100" },
];

export function CurriculumSection({
  program,
  curriculum,
}: {
  program: Program;
  curriculum: Curriculum;
}) {
  const { overview, outcome, cadence, sessions, materials, safety, skills } =
    curriculum;

  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(172deg,#012f38_0%,#01414d_52%,#0a5054_100%)] py-20 text-white sm:py-28"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-48 h-[38rem] bg-[radial-gradient(55%_50%_at_50%_100%,rgba(242,166,41,0.2)_0%,rgba(242,166,41,0)_68%)]"
      />

      <Container className="relative">
        {/* --- Heading + outcome ---------------------------------------- */}
        <Reveal className="max-w-3xl">
          <Eyebrow tone="inverse" className="text-sun-300">
            The curriculum
          </Eyebrow>
          <h2
            id="curriculum-heading"
            className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl"
          >
            What you&apos;ll learn, session by session.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/80">{overview}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <div className="flex flex-col gap-5 rounded-[1.5rem] border-l-2 border-sun-400 bg-cream/[0.06] p-6 ring-1 ring-cream/12 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
            <div className="flex-1">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-sun-300">
                You&apos;ll leave with
              </p>
              <p className="mt-2 font-display text-xl leading-snug text-white sm:text-2xl">
                {outcome}
              </p>
            </div>
            <dl className="flex shrink-0 gap-8">
              <div>
                <dt className="text-xs text-cream/50">Length</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-white">
                  {cadence}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-cream/50">Ages</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-white">
                  {program.ages.replace("Ages ", "")}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-cream/50">Cost</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-white">
                  {program.cost}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* --- The sessions ---------------------------------------------- */}
        <RevealGroup className="relative mt-12" stagger={0.06}>
          {/* The spine: fundamentals at the bottom, finished thing at the top */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[1.4rem] top-10 w-px bg-gradient-to-b from-teal-400/50 via-cream/20 to-sun-400/60 sm:left-[1.65rem]"
          />

          <ol className="flex flex-col gap-4">
            {sessions.map((session, index) => {
              const accent = accents[index % accents.length];
              return (
                <RevealChild key={session.title} as="li">
                  <div className="group relative flex gap-5 sm:gap-6">
                    <span
                      className={cn(
                        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full font-display text-base font-bold shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] sm:size-[3.3rem] sm:text-lg",
                        accent.node,
                      )}
                    >
                      {index + 1}
                    </span>

                    <div className="flex-1 rounded-[1.25rem] bg-cream/[0.055] p-6 ring-1 ring-cream/12 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-cream/[0.09] group-hover:ring-cream/25 sm:p-7">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/40">
                        Session {index + 1} of {sessions.length}
                      </p>

                      <h3 className="mt-2 text-2xl leading-snug text-white">
                        {session.title}
                      </h3>
                      <p className="mt-1.5 font-display text-lg text-sun-200/90">
                        {session.plain}
                      </p>

                      <p className="mt-5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream/40">
                        What you&apos;ll learn
                      </p>
                      <ul className="mt-2.5 flex flex-col gap-2">
                        {session.objectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex items-start gap-2.5 leading-relaxed text-cream/80"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              className="mt-[0.4rem] size-3.5 shrink-0 text-teal-300"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.6"
                              aria-hidden="true"
                            >
                              <path
                                d="m4 10.4 3.2 3.2L16 5.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {objective}
                          </li>
                        ))}
                      </ul>

                      <p
                        className={cn(
                          "mt-5 rounded-xl px-4 py-3 text-[0.95rem] leading-relaxed",
                          accent.chip,
                        )}
                      >
                        <span className="font-semibold">You&apos;ll make: </span>
                        {session.make}
                      </p>
                    </div>
                  </div>
                </RevealChild>
              );
            })}
          </ol>
        </RevealGroup>

        {/* --- Provided + safety ------------------------------------------ */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] bg-cream/[0.055] p-7 ring-1 ring-cream/12">
              <h3 className="text-xl text-white">Everything is provided</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                Students bring themselves. Nothing on this list is a cost to your
                family.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {materials.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-cream/[0.08] px-3 py-1.5 text-[0.85rem] text-cream/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {safety ? (
            <Reveal delay={0.08}>
              <div className="h-full rounded-[1.25rem] bg-cream/[0.055] p-7 ring-1 ring-cream/12">
                <h3 className="flex items-center gap-2.5 text-xl text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 shrink-0 text-sun-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    aria-hidden="true"
                  >
                    <path d="M12 3.5 4.5 6.5v5.2c0 4.6 3.1 8.1 7.5 9.3 4.4-1.2 7.5-4.7 7.5-9.3V6.5L12 3.5Z" />
                  </svg>
                  How we keep it safe
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {safety.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-cream/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sun-300"
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* --- Skills kept ------------------------------------------------ */}
        <Reveal delay={0.06} className="mt-12">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/50">
            What the skill is worth afterwards
          </p>
        </Reveal>
        <RevealGroup className="mt-5 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {skills.map((entry) => (
            <RevealChild key={entry.skill}>
              <div className="h-full rounded-[1.25rem] bg-cream/[0.055] p-6 ring-1 ring-cream/12">
                <h3 className="font-display text-lg font-semibold text-white">
                  {entry.skill}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/75">
                  {entry.value}
                </p>
              </div>
            </RevealChild>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
