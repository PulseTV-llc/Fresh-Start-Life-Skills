import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealChild, Reveal } from "@/components/ui/Reveal";
import { ageBands } from "@/lib/ageBands";
import { site } from "@/lib/site";

/**
 * The four age groups, explained once.
 *
 * The thing a visitor most needs to know is that "all ages" does not mean an
 * eight-year-old and a thirty-five-year-old in the same room. Every group meets
 * separately, and the two adult groups carry on into the advanced sessions.
 *
 * Deliberately states no clock times — the schedule moves, and the phone number
 * is the honest answer to "when?".
 */

const tones = [
  "bg-sun-100 text-sun-800 ring-sun-200",
  "bg-teal-100 text-teal-800 ring-teal-200",
  "bg-green-100 text-green-800 ring-green-200",
  "bg-navy-100 text-navy-800 ring-navy-200",
];

export function AgeGroupsSection() {
  return (
    <Section id="age-groups" size="wide" className="bg-white">
      <SectionHeading
        eyebrow="Who these are for"
        tone="teal"
        title="Four groups, taught separately."
        intro="Fresh Start is open to individuals of all ages — but a room of ten-year-olds and a room of thirty-year-olds are not the same room. Each group meets on its own, and the two adult groups carry on into the advanced sessions of every workshop."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {ageBands.map((band, index) => (
          <RevealChild key={band.id}>
            <div className="flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-ink/[0.06]">
              <span
                className={`self-start rounded-full px-3.5 py-1.5 font-display text-lg font-bold ring-1 ${tones[index % tones.length]}`}
              >
                {band.range}
              </span>
              <h3 className="mt-5 text-2xl leading-snug text-ink">{band.label}</h3>
              <p className="mt-2.5 flex-1 leading-relaxed text-ink-muted">
                {band.blurb}
              </p>
              <p className="mt-5 border-t border-ink/[0.08] pt-4 text-sm leading-relaxed text-ink-muted">
                {band.sessions}
              </p>
              {band.advanced ? (
                <p className="mt-4 rounded-xl bg-teal-100 px-4 py-2.5 text-sm font-semibold text-teal-900">
                  Runs the advanced sessions
                </p>
              ) : null}
            </div>
          </RevealChild>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-8">
        <p className="text-ink-muted">
          Session times shift with the season and with what the room can hold.
          Call{" "}
          <a
            href={site.contact.phoneHref}
            className="font-semibold text-ink underline-offset-4 hover:underline"
          >
            {site.contact.phone}
          </a>{" "}
          for the current schedule for your group.
        </p>
      </Reveal>
    </Section>
  );
}
