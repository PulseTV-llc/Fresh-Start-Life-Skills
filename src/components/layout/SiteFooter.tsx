import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { primaryNav, site } from "@/lib/site";
import { programs } from "@/lib/programs";
import { buildDonateUrl, donateLinkRel, donateLinkTarget } from "@/lib/donations";

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

const socialPaths: Record<string, string> = {
  facebook:
    "M14 8.5h2.2V5.3c-.4 0-1.6-.2-3.1-.2-3 0-5 1.9-5 5.3V13H5.3v3.6h2.8V26h3.5v-9.4h2.8l.4-3.6h-3.2v-2.2c0-1.1.3-1.8 1.4-1.8Z",
  instagram:
    "M15.5 5.5c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.3.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.4.3.9.3 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.1-.9.3-1.9.3-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.3a3.3 3.3 0 0 1-1.2-.8 3.3 3.3 0 0 1-.8-1.2c-.1-.4-.3-.9-.3-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.1.9-.3 1.9-.3 1.1-.1 1.4-.1 4.1-.1Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  youtube:
    "M25.6 10.2c-.3-1-1-1.8-2-2.1C21.8 7.6 15.5 7.6 15.5 7.6s-6.3 0-8.1.5c-1 .3-1.8 1.1-2 2.1-.5 1.8-.5 5.6-.5 5.6s0 3.8.5 5.6c.3 1 1 1.8 2 2 1.8.5 8.1.5 8.1.5s6.3 0 8.1-.5c1-.2 1.7-1 2-2 .5-1.8.5-5.6.5-5.6s0-3.8-.5-5.6ZM13.4 19.2v-6.9l5.6 3.5-5.6 3.4Z",
  linkedin:
    "M9.4 25H5.9V12.6h3.5V25ZM7.6 11a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM25 25h-3.5v-6c0-1.5 0-3.4-2-3.4s-2.4 1.6-2.4 3.3V25h-3.4V12.6h3.3v1.7h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.4V25Z",
};

export function SiteFooter() {
  const socials = Object.entries(site.socials).filter(([, url]) => Boolean(url));
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-leaf-900 text-cream/75">
      {/* Hill silhouette carries the brand motif into the footer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 w-full -translate-y-px text-cream"
        fill="currentColor"
      >
        <path d="M0 0h1440v42c-260 62-460-14-720 6S250 104 0 58V0Z" />
      </svg>

      <div className="relative pt-32">
        <Container size="wide">
          {/* --- Closing call to action ----------------------------------- */}
          <div className="flex flex-col gap-8 border-b border-cream/15 pb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl text-white sm:text-4xl">
                A fresh start begins with someone who shows up.
              </h2>
              <p className="mt-4 text-cream/70">
                Give a gift, volunteer an afternoon, or enroll a child. Every one
                of those is the same thing: a door opening for a young person in
                central Louisiana.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={buildDonateUrl({ source: "footer" })}
                target={donateLinkTarget}
                rel={donateLinkRel}
                size="lg"
              >
                Donate
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="inverse" size="lg">
                Volunteer
              </ButtonLink>
            </div>
          </div>

          {/* --- Directory ------------------------------------------------- */}
          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <LogoMark className="size-12 text-cream" />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-lg font-semibold text-white">
                    Fresh Start
                  </span>
                  <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-sun-300">
                    Life Skills
                  </span>
                </span>
              </Link>

              <address className="mt-6 not-italic leading-relaxed">
                <p className="text-cream/70">{site.address.street}</p>
                <p className="text-cream/70">
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </p>
                <p className="mt-4">
                  <a
                    href={site.contact.phoneHref}
                    className="text-lg font-semibold text-white transition-colors hover:text-sun-300"
                  >
                    {site.contact.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={site.contact.emailHref}
                    className="break-all text-cream/70 transition-colors hover:text-sun-300"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </address>

              {socials.length > 0 ? (
                <ul className="mt-6 flex gap-2">
                  {socials.map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-sun-500 hover:text-white"
                      >
                        <span className="sr-only">
                          {site.name} on {socialLabels[key]}
                        </span>
                        <svg viewBox="0 0 31 31" className="size-5" fill="currentColor" aria-hidden="true">
                          <path d={socialPaths[key]} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <nav aria-label="Footer" className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-sun-300">
                Explore
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-cream/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/donate"
                    className="text-cream/70 transition-colors hover:text-white"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-sun-300">
                Programs
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {programs.map((program) => (
                  <li key={program.slug}>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="text-cream/70 transition-colors hover:text-white"
                    >
                      {program.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-sun-300">
                Communities we serve
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {site.serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-cream/10 px-3 py-1.5 text-sm text-cream/75"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-cream/70">
                Serving central and north Louisiana. If your community is not on
                this list, reach out — we want to hear from you.
              </p>
            </div>
          </div>

          {/* --- Legal ----------------------------------------------------- */}
          <div className="flex flex-col gap-4 border-t border-cream/15 py-8 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName} · {site.nonprofit.status}.
              {site.nonprofit.ein ? ` EIN ${site.nonprofit.ein}.` : ""} Donations
              are tax-deductible to the extent allowed by law.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-cream">
                Privacy
              </Link>
              <Link href="/contact" className="transition-colors hover:text-cream">
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
