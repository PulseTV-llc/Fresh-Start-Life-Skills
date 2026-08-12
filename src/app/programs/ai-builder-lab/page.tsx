import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { BuildStack } from "@/components/capstone/BuildStack";
import { LaunchPreview } from "@/components/capstone/LaunchPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, capstoneSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import {
  capstone,
  buildModules,
  principles,
  capstoneFaqs,
  capstoneKeywords,
} from "@/lib/capstone";
import { capstoneProgram, programs } from "@/lib/programs";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AI Builder Lab — Kids Learn to Build & Launch Real Apps with AI",
  description:
    "The capstone at Fresh Start Life Skills: students ages 12–17 use AI to build and launch a real website, iPhone and Android apps, sign-in, a database, payments and a live Vercel deployment — around something they made by hand. Alexandria, Louisiana.",
  path: `/programs/${capstone.slug}`,
  keywords: capstoneKeywords,
});

/**
 * What each program turns into once it reaches the capstone. Budgeting is not a
 * craft that becomes a product, but it is the module the payments week leans
 * on — so it gets its own phrase rather than a generic one that would not be
 * true of it.
 */
const becomes: Record<string, string> = {
  "financing-and-budgeting": "prices the whole thing",
};

const feederPrograms = programs.filter((program) => program.track !== "free-class");

export default function AiBuilderLabPage() {
  return (
    <>
      <JsonLd
        data={[
          ...capstoneSchema(),
          faqSchema(capstoneFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: capstone.name, path: `/programs/${capstone.slug}` },
          ]),
        ]}
      />

      {/* ================= Hero ================= */}
      <section
        data-hero="dark"
        className="relative isolate overflow-hidden bg-[linear-gradient(168deg,#012f38_0%,#01414d_40%,#0a5054_75%,#013f4a_100%)] pb-24 pt-32 text-white sm:pb-28 sm:pt-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-32 h-[42rem] bg-[radial-gradient(58%_52%_at_50%_100%,rgba(242,166,41,0.38)_0%,rgba(242,166,41,0.1)_40%,rgba(242,166,41,0)_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 116%, #f2a629 0deg 2.2deg, transparent 2.2deg 9deg)",
          }}
        />

        <Container size="wide" className="relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-cream/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-cream/30">
                /
              </li>
              <li>
                <Link href="/programs" className="transition-colors hover:text-white">
                  Programs
                </Link>
              </li>
              <li aria-hidden="true" className="text-cream/30">
                /
              </li>
              <li aria-current="page" className="font-medium text-white">
                {capstone.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <Eyebrow tone="inverse" className="text-sun-300">
                {capstone.motto} · The capstone
              </Eyebrow>
              <h1 className="mt-5 text-[2.9rem] leading-[1.03] text-white sm:text-6xl lg:text-[4.1rem]">
                {capstone.name}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-cream/85 sm:text-2xl">
                Learn to use AI properly — and turn the thing you made by hand
                into a real business on the internet.
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-cream/70">
                {capstone.summary}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={site.contact.phoneHref} variant="accent" size="lg">
                  Call {site.contact.phone}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/contact" variant="inverse" size="lg">
                  Ask about the capstone
                </ButtonLink>
              </div>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-cream/15 pt-7">
                {[
                  ["Ages", capstone.ages.replace("Ages ", "")],
                  ["Cost", capstone.cost],
                  ["Length", capstone.length],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-sm text-cream/55">{label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle,rgba(242,166,41,0.24)_0%,rgba(242,166,41,0)_70%)]"
                />
                <blockquote className="relative rounded-[1.75rem] bg-cream/[0.07] p-8 ring-1 ring-cream/15 backdrop-blur-sm sm:p-10">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-sun-400 text-ink">
                    <ProgramGlyph glyph="ai-builder" className="size-8" />
                  </span>
                  <p className="mt-6 font-display text-[1.7rem] leading-[1.28] text-white sm:text-[2rem]">
                    &ldquo;{capstone.thesis}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-cream/15 pt-5 text-sm leading-relaxed text-cream/65">
                    The young people who can direct these tools well will have an
                    enormous advantage over the ones who cannot. That gap is
                    opening now — so we teach it now.
                  </footer>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= The tie-in ================= */}
      <Section size="wide" className="bg-cream">
        <SectionHeading
          eyebrow="How it ties together"
          tone="teal"
          title="Every other program ends with something you made. This one puts it on the internet."
          intro="Sewing, candles, cakes, shirts, film, music — each program leaves a student holding something real. The AI Builder Lab is where that object becomes a business anyone in the world can find, browse and buy from."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {feederPrograms.map((program) => (
            <RevealChild key={program.slug}>
              <Link
                href={`/programs/${program.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cream text-ink-soft">
                  <ProgramGlyph glyph={program.glyph} className="size-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{program.title}</span>
                  <span className="mt-0.5 block text-sm text-ink-muted">
                    {becomes[program.slug] ?? "becomes a business"}
                  </span>
                </span>
                <ArrowIcon className="size-4 shrink-0 text-ink-muted" />
              </Link>
            </RevealChild>
          ))}
        </RevealGroup>
      </Section>

      {/* ================= Interactive preview ================= */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#0a5054_0%,#013f4a_50%,#012f38_100%)] py-20 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.2)_0%,rgba(242,166,41,0)_66%)]"
        />
        <Container size="wide" className="relative">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="inverse" className="text-sun-300">
              See it
            </Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl">
              Pick what you make. See what you&apos;d launch.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Same eight weeks, six very different businesses. Choose a craft and
              the storefront, the app and the feature that matters most rebuild
              around it.
            </p>
          </Reveal>

          <div className="mt-10">
            <LaunchPreview />
          </div>
        </Container>
      </section>

      {/* ================= The build ================= */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(178deg,#012f38_0%,#01414d_60%,#0a5054_100%)] py-20 text-white sm:py-28">
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="inverse" className="text-sun-300">
              The eight weeks
            </Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl">
              What they build, in the order they build it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Each week adds one real capability. Nothing is a toy exercise —
              every piece stays in the project the student ships at the end.
            </p>
          </Reveal>

          <div className="mt-12">
            <BuildStack />
          </div>
        </Container>
      </section>

      {/* ================= How AI is taught ================= */}
      <Section className="bg-white">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="How we teach it"
              tone="teal"
              title="Using AI properly is the actual curriculum."
              intro="Anyone can type a prompt. The skill worth having is judgment — knowing what to ask for, checking what comes back, and staying responsible for what you ship."
            />
            <div className="mt-8">
              <ButtonLink href="/contact" variant="secondary">
                Questions from parents welcome
                <ArrowIcon />
              </ButtonLink>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7" stagger={0.08}>
            {principles.map((principle, index) => (
              <RevealChild key={principle.title}>
                <article className="h-full rounded-[1.5rem] bg-cream p-7 ring-1 ring-ink/[0.06]">
                  <span className="font-display text-sm font-bold text-sun-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-xl leading-snug text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                </article>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ================= What they walk out with ================= */}
      <Section size="wide" className="bg-cream">
        <SectionHeading
          align="center"
          eyebrow="At the end"
          title="A link they can send to anybody."
          intro="Not a certificate. A live thing on the internet with their name on it, that they can explain line by line."
        />
        <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {buildModules
            .flatMap((module) => module.outputs.slice(0, 1))
            .concat(["A URL that works on any phone"])
            .slice(0, 8)
            .map((output) => (
              <RevealChild key={output}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05]">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 size-5 shrink-0 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <path d="m4 10.4 3.2 3.2L16 5.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium text-ink">{output}</span>
                </div>
              </RevealChild>
            ))}
        </RevealGroup>
      </Section>

      {/* ================= FAQ ================= */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="Questions"
          tone="teal"
          title="What parents ask about the AI class."
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <dl className="flex flex-col divide-y divide-ink/[0.08]">
            {capstoneFaqs.map((faq) => (
              <div key={faq.question} className="py-7">
                <dt className="font-display text-xl font-semibold text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-3 leading-relaxed text-ink-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ================= Enroll ================= */}
      <Section size="wide" className="bg-cream pb-24">
        <Reveal className="overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#0a5054_0%,#012f38_100%)] p-9 text-cream sm:p-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="max-w-2xl text-3xl text-white sm:text-4xl">
                The capstone runs after the craft programs.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-cream/75">
                Start your child in a workshop — sewing, candles, cakes, shirts,
                film or music — and the {capstone.name} is where it leads. Call
                and we will map out the path.
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
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <ButtonLink href={site.contact.phoneHref} variant="accent" size="lg">
                {site.contact.phone}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/programs" variant="inverse" size="lg">
                See all programs
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
