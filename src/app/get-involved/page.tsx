import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get Involved — Volunteer & Partner",
  description: `Volunteer, teach a workshop, donate supplies or partner with ${site.legalName} in Alexandria, Louisiana. Every skill you have is one a young person here would like to learn.`,
  path: "/get-involved",
  keywords: [
    "volunteer Alexandria Louisiana",
    "nonprofit volunteer opportunities central Louisiana",
  ],
});

const roles = [
  {
    title: "Workshop instructor",
    commitment: "2–3 hours a week",
    body: "Lead or co-lead a session in something you already know how to do — sewing, baking, music, video, money management.",
  },
  {
    title: "Classroom helper",
    commitment: "One afternoon a week",
    body: "Sit with students, thread needles, hold the light, keep the room moving. No expertise needed, only reliability.",
  },
  {
    title: "Studio & shop support",
    commitment: "Flexible",
    body: "Maintain machines, organize supplies, set up and break down for sessions. Deeply useful, rarely glamorous.",
  },
  {
    title: "Behind the scenes",
    commitment: "Remote, flexible",
    body: "Grant research and writing, bookkeeping, photography, social media. The unpaid infrastructure every small nonprofit runs on.",
  },
];

const wishlist = [
  "Sewing machines & sergers",
  "Fabric, thread, notions",
  "Soy wax, wicks, jars",
  "Blank t-shirts & heat transfer vinyl",
  "Baking pans, piping tips, food color",
  "Cameras, tripods, lights, microphones",
  "Instruments & keyboards",
  "Folding tables & storage bins",
];

export default function GetInvolvedPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get Involved", path: "/get-involved" },
        ])}
      />

      <PageHero
        eyebrow="Get involved"
        title="You already know something worth teaching."
        intro="Fresh Start is run by people from this community who give an afternoon a week. If you can do a thing, you can teach a young person to do it."
        tone="green"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Get Involved", href: "/get-involved" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">
            Volunteer with us
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/donate" variant="secondary">
            Donate instead
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Volunteer roles"
          title="Where we need people."
          intro="Every role below is real and currently open. Tell us which one sounds like you."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.09}>
          {roles.map((role) => (
            <RevealChild key={role.title}>
              <article className="group h-full rounded-[1.5rem] bg-white p-8 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-green-700">
                  {role.commitment}
                </span>
                <h3 className="mt-4 text-2xl text-ink">{role.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{role.body}</p>
              </article>
            </RevealChild>
          ))}
        </RevealGroup>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="Wish list"
              tone="teal"
              title="Supplies we can always use."
              intro="Gently used is fine. If you are clearing out a craft room, a garage or a studio, call before you donate it elsewhere."
            />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {wishlist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 ring-1 ring-ink/[0.06]"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-sun-500" />
                  <span className="text-[0.95rem] text-ink">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.contact.phoneHref}>
                Call {site.contact.phone}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Arrange a drop-off
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="flex flex-col gap-5">
              {/* TODO(assets): photo of volunteers working with students. */}
              <PhotoPlaceholder
                label="A volunteer instructor helping a student at the sewing table."
                aspect="4/3"
                tone="green"
              />
              <div className="rounded-[1.5rem] bg-[linear-gradient(150deg,#0f9c96_0%,#036075_100%)] p-8 text-white">
                <h3 className="text-2xl text-white">Partner with us</h3>
                <p className="mt-3 leading-relaxed text-white/85">
                  Schools, churches, libraries, employers and civic groups —
                  if you serve young people in {site.address.regionName}, there is
                  probably something we can build together.
                </p>
                <ButtonLink href="/contact" variant="inverse" className="mt-6">
                  Start a conversation
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
