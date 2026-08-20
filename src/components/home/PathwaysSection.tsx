import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const pathways = [
  {
    title: "Enroll",
    body: "Rolling enrollment for ages 8 and up — yourself or your child. Call or send a message and we will walk you through the next open session for your group.",
    href: "/events",
    cta: "See sessions & register",
    tone: "sun" as const,
    glyph: (
      <>
        <path d="M24 26c5.5 0 10-4.5 10-10S29.5 6 24 6 14 10.5 14 16s4.5 10 10 10Z" />
        <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Volunteer an afternoon",
    body: "If you can sew, bake, run a camera, balance a checkbook or simply show up consistently, you can teach here.",
    href: "/get-involved",
    cta: "Ways to help",
    tone: "green" as const,
    glyph: (
      <>
        <path d="M24 41S8 31.5 8 20.5A9.5 9.5 0 0 1 24 14a9.5 9.5 0 0 1 16 6.5C40 31.5 24 41 24 41Z" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Give materials or funds",
    body: "Fabric, film gear, baking supplies, wax — or a gift that lets us buy exactly what the next workshop needs.",
    href: "/donate",
    cta: "Donate",
    tone: "teal" as const,
    glyph: (
      <>
        <path d="M6 20h36v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V20Z" />
        <path d="M4 13h40v7H4z" />
        <path d="M24 13v29" />
        <path d="M24 13s-2.5-7-7.5-7A4.5 4.5 0 0 0 16 13h8Zm0 0s2.5-7 7.5-7A4.5 4.5 0 0 1 32 13h-8Z" strokeLinejoin="round" />
      </>
    ),
  },
];

const tones = {
  sun: {
    card: "hover:border-sun-300 hover:bg-sun-50/60",
    glyph: "bg-sun-100 text-sun-700",
    glow: "from-sun-200/60",
  },
  green: {
    card: "hover:border-green-300 hover:bg-green-50/60",
    glyph: "bg-green-100 text-green-700",
    glow: "from-green-200/60",
  },
  teal: {
    card: "hover:border-teal-300 hover:bg-teal-50/60",
    glyph: "bg-teal-100 text-teal-700",
    glow: "from-teal-200/60",
  },
};

export function PathwaysSection() {
  return (
    <Section id="get-involved" className="bg-white">
      <SectionHeading
        align="center"
        eyebrow="Get involved"
        tone="green"
        title="Three doors into this work."
        intro="Fresh Start is small on purpose and community-run by necessity. Pick the door that fits what you have to give."
      />

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {pathways.map((pathway) => {
          const tone = tones[pathway.tone];
          return (
            <RevealChild key={pathway.title}>
              <Link
                href={pathway.href}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink/[0.07] bg-white p-8 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
                  tone.card,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-gradient-to-br to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100",
                    tone.glow,
                  )}
                />

                <span
                  className={cn(
                    "relative flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110",
                    tone.glyph,
                  )}
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    {pathway.glyph}
                  </svg>
                </span>

                <h3 className="relative mt-6 text-2xl text-ink">{pathway.title}</h3>
                <p className="relative mt-3 flex-1 leading-relaxed text-ink-muted">
                  {pathway.body}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-ink">
                  {pathway.cta}
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </RevealChild>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
