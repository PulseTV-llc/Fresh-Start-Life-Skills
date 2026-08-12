import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProgramGlyph } from "@/components/brand/ProgramGlyph";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, programSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { programs, programBySlug } from "@/lib/programs";
import { capstone } from "@/lib/capstone";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Pre-render every program at build time — these pages are pure content. */
export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) return buildMetadata({ title: "Program not found", description: "", noIndex: true });

  return buildMetadata({
    title: program.title,
    description: program.description,
    path: `/programs/${program.slug}`,
    keywords: [
      `${program.title} Alexandria LA`,
      ...program.skills.map((skill) => `${skill} class for kids`),
    ],
  });
}

const accents = {
  sun: { chip: "bg-sun-100 text-sun-800", glyph: "bg-sun-100 text-sun-700", tone: "sun" as const },
  green: { chip: "bg-green-100 text-green-800", glyph: "bg-green-100 text-green-700", tone: "green" as const },
  teal: { chip: "bg-teal-100 text-teal-800", glyph: "bg-teal-100 text-teal-700", tone: "teal" as const },
  navy: { chip: "bg-navy-100 text-navy-800", glyph: "bg-navy-100 text-navy-700", tone: "teal" as const },
};

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  const accent = accents[program.accent];
  const related = programs.filter((item) => item.slug !== program.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          programSchema(program),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: program.title, path: `/programs/${program.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={program.track === "free-class" ? "Free class" : "After-school program"}
        title={program.title}
        intro={program.description}
        tone={accent.tone}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Programs", href: "/programs" },
          { name: program.title, href: `/programs/${program.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl",
              accent.glyph,
            )}
          >
            <ProgramGlyph glyph={program.glyph} className="size-8" />
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-soft)]">
            {program.ages}
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-soft)]">
            {program.cost}
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-soft)]">
            Materials provided
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink-soft">
              {program.body.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    index === 0 &&
                      "font-display text-2xl leading-snug text-ink sm:text-[1.7rem]",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl text-ink">What students learn</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {program.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05]"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="size-5 shrink-0 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    aria-hidden="true"
                  >
                    <path d="m4 10.4 3.2 3.2L16 5.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-medium text-ink">{skill}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              {program.photo ? (
                /* Rendered at the photograph's own aspect ratio so nothing is
                   cropped — this is the program's feature image. */
                <figure>
                  <div
                    className="relative w-full overflow-hidden rounded-[1.5rem] bg-cream-100 ring-1 ring-ink/[0.06]"
                    style={{ aspectRatio: program.photoAspect ?? "4 / 3" }}
                  >
                    <Image
                      src={program.photo}
                      alt={program.photoAlt ?? `${program.title} in session.`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {program.photoCaption ? (
                    <figcaption className="mt-3 text-sm text-ink-muted">
                      {program.photoCaption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : (
                /* TODO(assets): photograph of this specific workshop in progress. */
                <PhotoPlaceholder
                  label={`${program.title} in session — students at work, instructor coaching.`}
                  aspect="16/10"
                  tone={accent.tone}
                />
              )}
            </div>
          </Reveal>

          {/* --- Enrollment rail ---------------------------------------------- */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[1.75rem] bg-[linear-gradient(155deg,#0a5054_0%,#012f38_100%)] p-8 text-cream shadow-[var(--shadow-lift)]">
                <h2 className="text-2xl text-white">Reserve a seat</h2>
                <p className="mt-3 leading-relaxed text-cream/75">
                  Enrollment is rolling and class sizes are kept small. Call or
                  send a message and we will tell you when the next session opens.
                </p>
                <dl className="mt-6 flex flex-col gap-3 border-y border-cream/15 py-6 text-sm">
                  {[
                    ["Ages", program.ages.replace("Ages ", "")],
                    ["Cost", program.cost],
                    ["Location", site.address.full],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6">
                      <dt className="text-cream/60">{label}</dt>
                      <dd className="text-right font-medium text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href={site.contact.phoneHref} size="lg">
                    {site.contact.phone}
                    <ArrowIcon />
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="inverse" size="lg">
                    Send a message
                  </ButtonLink>
                </div>
              </div>

              {/* Every craft program points at the capstone it feeds. */}
              <Link
                href={`/programs/${capstone.slug}`}
                className="group mt-6 block overflow-hidden rounded-[1.75rem] bg-[linear-gradient(140deg,#012f38_0%,#0a5054_100%)] p-7 text-cream transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
              >
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-sun-300">
                  Where this leads
                </span>
                <span className="mt-3 block font-display text-xl font-semibold text-white">
                  {capstone.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-cream/75">
                  The capstone: use AI to build the website, the app and the
                  checkout around what you made here — and deploy it live.
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sun-300">
                  See the capstone
                  <ArrowIcon className="size-3.5" />
                </span>
              </Link>

              <div className="mt-6 rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/[0.06]">
                <h2 className="text-lg text-ink">Other programs</h2>
                <ul className="mt-4 flex flex-col divide-y divide-ink/[0.07]">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/programs/${item.slug}`}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="font-medium text-ink">{item.title}</span>
                        <ArrowIcon className="size-4 shrink-0 text-ink-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/programs"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                >
                  All programs
                  <ArrowIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
