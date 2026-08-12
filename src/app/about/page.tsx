import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Fresh Start Life Skills",
  description: `Founded by ${site.founder.name} in Alexandria, Louisiana, ${site.legalName} is a 501(c)(3) nonprofit teaching practical life and vocational skills to young people across central Louisiana.`,
  path: "/about",
  keywords: [
    "Dorothy Jackson Fresh Start Life Skills",
    "nonprofit Alexandria Louisiana",
    "youth nonprofit central Louisiana",
  ],
});

const values = [
  {
    title: "Hands before theory",
    body: "Nobody learns a skill from a worksheet. Students touch the machine, hold the camera, mix the frosting — on day one.",
  },
  {
    title: "Nobody is turned away",
    body: "Programs are low or no cost and materials are provided. If money is the obstacle, we will find a way around it.",
  },
  {
    title: "Skills that pay",
    body: "Sewing, media production, baking, apparel, budgeting — these are trades and habits with a market value, taught seriously.",
  },
  {
    title: "Local by design",
    body: "Fresh Start is central Louisiana's, run from Alexandria for the families around it. We stay small enough to know our students' names.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="Our story"
        title="Built for the children of central Louisiana."
        intro={`${site.legalName} began with one person noticing what her community was missing — and deciding to build it herself.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink-soft">
              <p className="font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
                {site.mission}
              </p>
              <p>
                Fresh Start Life Skills Inc. is a 501(c)(3) nonprofit based at{" "}
                {site.address.street} in {site.address.city}, {site.address.region}.
                We run an after-school program and a set of free open-enrollment
                classes that teach young people ages 8 to 17 the practical,
                creative and financial skills a school day rarely has room for.
              </p>
              <p>
                The programs look different from one another — a sewing machine
                here, a camera there, a piping bag, a budget worksheet — but they
                are all the same idea. Put a real tool in a young person&apos;s
                hands. Stay with them until they can use it. Let them walk out
                with something they made.
              </p>
              <p>
                Founder {site.founder.name} started this work because the
                afternoon hours in our community were going to waste, and because
                enrichment programs that do exist are usually priced out of reach.
                Fresh Start is the answer to both problems: open doors, low or no
                cost, and adults who take these kids seriously.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/programs">
                See the programs
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="secondary">
                Get involved
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              {/* TODO(assets): portrait of Dorothy Jackson, and a room shot. */}
              <PhotoPlaceholder
                label="Portrait of founder Dorothy Jackson at the Fresh Start workshop space."
                aspect="4/5"
              />
              <div className="rounded-[1.5rem] bg-white p-7 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05]">
                <h2 className="text-xl text-ink">Leadership</h2>
                <div className="mt-4 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sun-100 font-display text-xl font-semibold text-sun-700"
                  >
                    DJ
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {site.founder.name}
                    </span>
                    <span className="block text-sm text-ink-muted">
                      {site.founder.role}
                    </span>
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                  {/* TODO(Dorothy): add a short bio, plus board members and
                      instructors as the organization grows. */}
                  A short biography goes here — background, why Fresh Start was
                  founded, and what she is building next.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="What we believe"
          tone="leaf"
          title="Four commitments we do not bend on."
          align="center"
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.09}>
          {values.map((value, index) => (
            <RevealChild key={value.title}>
              <article className="h-full rounded-[1.5rem] bg-cream p-8 ring-1 ring-ink/[0.06] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
                <span className="font-display text-sm font-bold text-sun-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl text-ink">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{value.body}</p>
              </article>
            </RevealChild>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Where we work"
          title="Serving central and north Louisiana."
          intro="Fresh Start is headquartered in Alexandria and reaches families across the region."
        />
        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {site.serviceAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-leaf-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                <span className="font-medium text-ink">
                  {area}, {site.address.region}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
