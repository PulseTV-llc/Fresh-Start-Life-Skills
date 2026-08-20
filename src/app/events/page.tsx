import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { upcomingSessions, scheduleShape } from "@/lib/events";
import { programs, programBySlug, programAges } from "@/lib/programs";
import { site, mailto } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sessions & Registration",
  description: `Upcoming sessions and free classes at ${site.legalName} in Alexandria, Louisiana. Rolling enrollment for ages 8 and up, with separate groups for kids, teens, young adults and adults — call (318) 704-2808 to reserve a seat.`,
  path: "/events",
  keywords: [
    "after school registration Alexandria LA",
    "kids classes Alexandria Louisiana",
    "adult classes Alexandria Louisiana",
    "evening classes central Louisiana",
  ],
});

const steps = [
  {
    title: "Call or message us",
    body: "Tell us which group you are asking about — yours or your child's — and what you are curious about. We will point you at the right workshop.",
  },
  {
    title: "Pick a session",
    body: "Kids and teens meet after school; young adults and adults meet evenings and weekends. We will tell you what is running for your group and whether there is a seat open right now.",
  },
  {
    title: "Show up",
    body: "Bring yourself, or your child, and nothing else. Materials, tools and instruction are all provided.",
  },
];

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ])}
      />

      <PageHero
        eyebrow="Sessions & registration"
        title="Find a seat."
        intro="Enrollment is rolling and class sizes stay small. Every age group meets separately, so the first thing to tell us is which one you are asking about. Here is how registration works, and how to find out what is running next."
        tone="teal"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Events", href: "/events" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={site.contact.phoneHref} size="lg">
            Call {site.contact.phone}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Message us
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Upcoming"
          title="Next sessions"
          intro="Dates are confirmed by phone as each cycle fills."
        />

        {upcomingSessions.length === 0 ? (
          /* Designed empty state — see the note in src/lib/events.ts about why
             this page never invents dates. */
          <Reveal delay={0.1} className="mt-10">
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#edfaf8_0%,#fdfcf8_100%)] p-9 ring-1 ring-teal-200/70 sm:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(255,158,44,0.22)_0%,rgba(255,158,44,0)_68%)]"
              />
              <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-800 shadow-[var(--shadow-soft)]">
                  <span className="size-2 rounded-full bg-teal-500" />
                  Dates being finalized
                </span>
                <h3 className="mt-6 text-3xl leading-snug text-ink sm:text-4xl">
                  The next session dates are being set right now.
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Call {site.contact.phone} or send a message and we will add you
                  to the list — you will be the first to hear when the next cycle
                  opens, before seats are gone.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={site.contact.phoneHref} size="lg">
                    Get on the list
                    <ArrowIcon />
                  </ButtonLink>
                  <ButtonLink href="/programs" variant="secondary" size="lg">
                    Browse programs
                  </ButtonLink>
                </div>
                <p className="mt-5 text-sm text-ink-muted">
                  Prefer email? Registration questions go to{" "}
                  <a
                    href={mailto(site.emails.support)}
                    className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
                  >
                    {site.emails.support}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        ) : (
          <RevealGroup className="mt-10 flex flex-col gap-4" stagger={0.08}>
            {upcomingSessions.map((session) => {
              const program = programBySlug(session.programSlug);
              const start = new Date(session.startDate);
              return (
                <RevealChild key={session.slug}>
                  <article className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-7 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] sm:flex-row sm:items-center">
                    <time
                      dateTime={session.startDate}
                      className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-sun-100 text-sun-800"
                    >
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em]">
                        {start.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="font-display text-2xl font-semibold">
                        {start.getDate()}
                      </span>
                    </time>
                    <div className="flex-1">
                      <h3 className="text-2xl text-ink">{session.title}</h3>
                      <p className="mt-2 text-ink-muted">
                        {session.recurrence ? `${session.recurrence} · ` : ""}
                        {session.cost}
                        {session.seats ? ` · ${session.seats} seats` : ""}
                      </p>
                    </div>
                    {program ? (
                      <ButtonLink
                        href={`/programs/${program.slug}`}
                        variant="secondary"
                      >
                        Program details
                        <ArrowIcon />
                      </ButtonLink>
                    ) : null}
                  </article>
                </RevealChild>
              );
            })}
          </RevealGroup>
        )}
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="How it works"
          tone="green"
          title="Three steps, no paperwork mountain."
          align="center"
        />
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {steps.map((step, index) => (
            <RevealChild key={step.title}>
              <article className="h-full rounded-[1.5rem] bg-cream p-8 ring-1 ring-ink/[0.06]">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-cream">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
              </article>
            </RevealChild>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="What to expect"
              title="How a Fresh Start week is built."
            />
            <dl className="mt-8 flex flex-col divide-y divide-ink/[0.08]">
              {scheduleShape.map((item) => (
                <div key={item.label} className="py-5">
                  <dt className="font-display text-lg font-semibold text-ink">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-muted">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
            {/* TODO(Dorothy): confirm the exact weekdays and times so this can
                become a precise schedule table. */}
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <h2 className="text-2xl text-ink">Workshops in the rotation</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cream text-ink-soft">
                      <ProgramGlyph glyph={program.glyph} className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">
                        {program.title}
                      </span>
                      <span className="block text-sm text-ink-muted">
                        {programAges(program)} · {program.cost}
                      </span>
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
