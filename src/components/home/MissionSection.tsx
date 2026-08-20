import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { founderQuote } from "@/lib/stories";
import { site } from "@/lib/site";

/** The three words on every Fresh Start flyer, given room to breathe. */
const pillars = [
  {
    word: "Learn",
    body: "Real skills taught by hand: threading a machine, balancing a budget, framing a shot, leveling a cake.",
    tone: "sun" as const,
    glyph: (
      <>
        <path d="M6 14 24 7l18 7-18 7L6 14Z" />
        <path d="M14 17.5V27c0 2.8 4.5 5 10 5s10-2.2 10-5v-9.5" />
        <path d="M42 14v10" />
      </>
    ),
  },
  {
    word: "Explore",
    body: "Eight workshops under one roof, so a young person can try things until something catches fire.",
    tone: "teal" as const,
    glyph: (
      <>
        <circle cx="24" cy="24" r="17" />
        <path d="m30.5 17.5-4 9-9 4 4-9 9-4Z" />
      </>
    ),
  },
  {
    word: "Grow",
    body: "Confidence compounds. A finished project becomes a skill, a skill becomes a path, a path becomes a future.",
    tone: "green" as const,
    glyph: (
      <>
        <path d="M24 42V20" />
        <path d="M24 26c-8 0-12-4-12-12 8 0 12 4 12 12Z" />
        <path d="M24 22c7 0 11-3.5 11-10.5-7 0-11 3.5-11 10.5Z" />
        <path d="M14 42h20" />
      </>
    ),
  },
];

const toneClasses = {
  sun: "bg-sun-50 text-sun-700 ring-sun-200/70",
  teal: "bg-teal-50 text-teal-700 ring-teal-200/70",
  green: "bg-green-50 text-green-700 ring-green-200/70",
};

export function MissionSection() {
  return (
    <Section id="mission" className="bg-cream">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>Our mission</Eyebrow>
            <p className="font-display text-[2rem] leading-[1.24] text-ink sm:text-[2.6rem] sm:leading-[1.18]">
              Fresh Start Life Skills Inc. is a non-profit organization dedicated
              to{" "}
              <span className="text-gradient-sunrise">
                empowering individuals of all ages
              </span>{" "}
              — from eight years old to no upper limit, right here in central
              Louisiana.
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
              Founded by {site.founder.name}, Fresh Start began with a simple
              observation: plenty of people have talent and almost none of them
              have somewhere to put it — a child after three o&apos;clock, an
              adult after a shift. So we built a place. Sewing machines, cameras,
              mixing bowls, budget worksheets — and instructors who expect
              something good of everyone who walks in.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3" stagger={0.1}>
            {pillars.map((pillar) => (
              <RevealChild key={pillar.word} className="group">
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl ring-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${toneClasses[pillar.tone]}`}
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {pillar.glyph}
                  </svg>
                </div>
                <h3 className="mt-5 text-xl text-ink">{pillar.word}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-muted">
                  {pillar.body}
                </p>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>

        {/* --- Founder pull-quote ------------------------------------------ */}
        <Reveal delay={0.15} className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(155deg,#0a5054_0%,#012f38_100%)] p-9 text-cream shadow-[var(--shadow-lift)] sm:p-11">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.44)_0%,rgba(242,166,41,0)_70%)]"
            />
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="relative size-12 text-sun-400"
              fill="currentColor"
            >
              <path d="M20 10v10c0 8-4.5 14-13 18l-3-5c5-2.4 7.6-5.5 8-9H4V10h16Zm24 0v10c0 8-4.5 14-13 18l-3-5c5-2.4 7.6-5.5 8-9h-8V10h16Z" />
            </svg>

            <blockquote className="relative mt-7">
              <p className="font-display text-[1.55rem] leading-[1.36] text-white sm:text-[1.75rem]">
                {founderQuote.quote}
              </p>
            </blockquote>

            <figcaption className="relative mt-8 flex items-center gap-4 border-t border-cream/20 pt-6">
              <Image
                src={site.founder.photo}
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover object-top ring-1 ring-sun-300/40"
              />
              <span>
                <span className="block font-semibold text-white">
                  {founderQuote.attribution}
                </span>
                <span className="block text-sm text-cream/60">
                  {founderQuote.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
