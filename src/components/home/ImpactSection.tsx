import Image from "next/image";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { programs, programBySlug } from "@/lib/programs";
import { site } from "@/lib/site";

/**
 * Every figure below is something Fresh Start can substantiate today — program
 * counts, age range, communities served.
 *
 * TODO(Dorothy): once attendance records exist, add the numbers donors care
 * most about — students served to date, projects completed, volunteer hours —
 * and put them first. Do not publish an outcome number the org cannot back up;
 * grantmakers check.
 */
const stats = [
  {
    value: programs.length,
    suffix: "",
    label: "hands-on workshops",
    detail: "Sewing, film, music, baking, apparel, candles and money skills.",
  },
  {
    value: site.serviceAreas.length,
    suffix: "",
    label: "Louisiana communities",
    detail: "From Alexandria and Pineville up through Ruston and Monroe.",
  },
  {
    value: 10,
    suffix: "",
    label: "years of childhood reached",
    detail: "Programs are built for ages 8 through 17, start to finish.",
  },
  {
    value: 0,
    prefix: "$",
    suffix: "",
    label: "cost for our free classes",
    detail: "Kids Creative Sewing is free, and no family is turned away for cost.",
  },
];

const reasons = [
  {
    title: "The hours after school are the ones that decide things",
    body: "Between the last bell and dinner, a child is either building something or drifting. Fresh Start makes that window productive — with tools in their hands and an adult in the room.",
  },
  {
    title: "These are skills, not crafts",
    body: "A student who can operate a sewing machine, run a camera, price a product or hold a budget has something the labor market actually wants. We teach hobbies like they are trades, because for some of these kids they will be.",
  },
  {
    title: "Cost keeps too many children out",
    body: "Enrichment in central Louisiana usually comes with a fee that puts it out of reach. Our programs are low or no cost by design, and materials are always provided.",
  },
];

const filmProgram = programBySlug("film-recording-and-directing");

export function ImpactSection() {
  return (
    <Section id="impact" className="bg-cream">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* --- Numbers ------------------------------------------------------ */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow tone="green">Why it matters</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.1] text-ink sm:text-5xl">
              Small program. <br />
              Outsized consequence.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Fresh Start is not trying to be everything. We are trying to be the
              place a child in central Louisiana can walk into and leave knowing
              how to do something they could not do that morning.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter
                      to={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className="block font-display text-5xl font-semibold text-gradient-sunrise sm:text-6xl"
                    />
                    <span className="mt-2 block font-semibold text-ink">
                      {stat.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                      {stat.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <ButtonLink href="/about" variant="secondary" className="mt-10">
              Read our story
              <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>

        {/* --- Argument + imagery ------------------------------------------- */}
        <div className="lg:col-span-7">
          <RevealGroup className="flex flex-col gap-8" stagger={0.12}>
            <RevealChild>
              {/* A real session, so this slot no longer needs a placeholder.
                  Caption stays generic: the people in it are real, and no
                  invented name or story gets attached to them. */}
              <figure>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[1.5rem] bg-cream-100 ring-1 ring-ink/[0.06]">
                  <Image
                    src={filmProgram?.photo ?? ""}
                    alt={filmProgram?.photoAlt ?? ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-muted">
                  In the studio — Film &amp; Directing, one of eight workshops.
                </figcaption>
              </figure>
            </RevealChild>

            {reasons.map((reason, index) => (
              <RevealChild key={reason.title}>
                <article className="group relative rounded-[1.5rem] bg-white p-7 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-9">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm font-bold text-sun-500"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl leading-snug text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">
                    {reason.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-sun-400 to-sun-600 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-9"
                  />
                </article>
              </RevealChild>
            ))}

            <RevealChild className="grid gap-5 sm:grid-cols-2">
              {/* TODO(assets): two detail shots — hands at work, finished projects. */}
              <PhotoPlaceholder
                label="Close-up of a student's hands guiding fabric through a sewing machine."
                aspect="1/1"
                tone="sun"
              />
              <PhotoPlaceholder
                label="Finished student projects lined up — candles, decorated cakes, printed shirts."
                aspect="1/1"
                tone="teal"
              />
            </RevealChild>
          </RevealGroup>
        </div>
      </div>

      <Reveal className="mt-16">
        <SectionHeading
          align="center"
          title={
            <span className="text-[1.6rem] font-normal leading-snug text-ink-soft sm:text-[1.9rem]">
              &ldquo;{site.mission}&rdquo;
            </span>
          }
        />
      </Reveal>
    </Section>
  );
}
