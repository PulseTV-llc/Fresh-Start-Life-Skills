import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ContactQuestionnaire } from "@/components/contact/ContactQuestionnaire";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Reach ${site.legalName} in Alexandria, Louisiana. Enroll a child, volunteer, donate or partner with us — answer a few quick questions and we will get back to you. Call (318) 704-2808.`,
  path: "/contact",
  keywords: [
    "contact Fresh Start Life Skills",
    "enroll child after school program Alexandria LA",
    "volunteer nonprofit central Louisiana",
  ],
});

const details = [
  {
    label: "Call",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    hint: "Fastest way to reach us about enrollment.",
    glyph: (
      <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
    ),
  },
  {
    label: "Email",
    value: site.contact.email,
    href: site.contact.emailHref,
    hint: "Good for details, documents and partnerships.",
    glyph: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  },
  {
    label: "Visit",
    value: site.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`,
    hint: "Our workshop space in Alexandria, Louisiana.",
    glyph: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* ================= The questionnaire ================= */}
      <section
        data-hero="dark"
        aria-labelledby="contact-heading"
        className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-[linear-gradient(165deg,#012f38_0%,#01414d_42%,#0a5054_78%,#013f4a_100%)] px-0 pb-20 pt-32 text-white sm:pb-24 sm:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-40 h-[40rem] bg-[radial-gradient(55%_50%_at_50%_100%,rgba(242,166,41,0.26)_0%,rgba(242,166,41,0.06)_42%,rgba(242,166,41,0)_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 118%, #f2a629 0deg 2.2deg, transparent 2.2deg 9deg)",
          }}
        />

        <Container className="relative">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow tone="inverse" className="text-sun-300">
              Contact
            </Eyebrow>
            <h1
              id="contact-heading"
              className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl"
            >
              Let&apos;s talk.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-cream/75">
              A few quick questions — under a minute — and we will come back to
              you with something useful rather than a form letter.
            </p>
          </Reveal>

          <ContactQuestionnaire />
        </Container>
      </section>

      {/* ================= Direct contact ================= */}
      <Section size="wide" className="bg-cream">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Would rather just call?
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Completely fine. Dorothy and the team answer everything that comes
            in — by phone, by email, or at the door.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-3">
            {details.map((detail) => (
              <li key={detail.label}>
                <a
                  href={detail.href}
                  {...(detail.label === "Visit"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {detail.glyph}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                      {detail.label}
                    </span>
                    <span className="mt-1.5 block break-words font-display text-lg font-semibold text-ink">
                      {detail.value}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink-muted">
                      {detail.hint}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[1.5rem] bg-teal-50 p-6 ring-1 ring-teal-200/70">
            <h3 className="font-display text-lg font-semibold text-teal-900">
              Communities we serve
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-teal-900/80">
              {site.serviceAreas.join(" · ")}
            </p>
          </div>

          {/* TODO(Darius): embed a Google Map here once the Business Profile is
              verified — it also strengthens the local SEO signal. */}
        </Reveal>
      </Section>
    </>
  );
}
