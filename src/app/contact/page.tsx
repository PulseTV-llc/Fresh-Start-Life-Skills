import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Fresh Start Life Skills",
  description: `Call (318) 704-2808 or send a message to ${site.legalName} at ${site.address.full}. Enrollment, volunteering, donations and partnerships.`,
  path: "/contact",
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
    hint: "Good for details, documents and partnership enquiries.",
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

      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        intro="Whether you are enrolling a child, offering to teach, or want to support the work — start here. We answer everything."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ul className="flex flex-col gap-4">
              {details.map((detail) => (
                <li key={detail.label}>
                  <a
                    href={detail.href}
                    {...(detail.label === "Visit"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-4 rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun-100 text-sun-700 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
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
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                        {detail.label}
                      </span>
                      <span className="mt-1 block break-words font-display text-lg font-semibold text-ink">
                        {detail.value}
                      </span>
                      <span className="mt-1 block text-sm text-ink-muted">
                        {detail.hint}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-[1.5rem] bg-leaf-50 p-6 ring-1 ring-leaf-200/70">
              <h2 className="font-display text-lg font-semibold text-leaf-900">
                Communities we serve
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-leaf-800/80">
                {site.serviceAreas.join(" · ")}
              </p>
            </div>

            {/* TODO(Darius): embed a Google Map here once the Business Profile
                is verified — it also strengthens the local SEO signal. */}
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-white p-7 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05] sm:p-10">
              <h2 className="text-3xl text-ink">Send us a message</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Tell us what you need and we will get back to you.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
