import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { StudioGallery } from "@/components/studio/StudioGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import {
  studioCategories,
  studioPieces,
  hasPlaceholders,
  photoBrief,
} from "@/lib/studio";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Fresh Start Studio — Student Work Gallery",
  description:
    "A gallery of what students make at Fresh Start Life Skills — kids, teens and adults alike: sewing, candles, cake decorating, t-shirt design, film and music.",
  path: "/studio",
  keywords: [
    "student art gallery Alexandria Louisiana",
    "youth creative programs Louisiana",
    "adult creative classes Louisiana",
    "student sewing projects",
    "youth film projects Louisiana",
  ],
});

/**
 * Structured data for the gallery. `CollectionPage` + `ImageGallery` is the
 * pairing Google recognises for a curated set of works.
 */
function gallerySchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "ImageGallery"],
    name: "Fresh Start Studio",
    description:
      "Student work from the Fresh Start Life Skills after-school program in Alexandria, Louisiana.",
    url: `${site.url}/studio`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    numberOfItems: studioPieces.length,
  };
}

export default function StudioPage() {
  return (
    <>
      <JsonLd
        data={[
          gallerySchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Studio", path: "/studio" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Fresh Start Studio"
        tone="teal"
        title="What they made."
        intro="Every piece on this wall was made by a young person in central Louisiana who, a few weeks earlier, did not know how. Open any one of them to hear about it in their own words."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Studio", href: "/studio" },
        ]}
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="text-sm text-ink-muted">Pieces on the wall</dt>
            <dd className="font-display text-2xl font-semibold text-ink">
              {studioPieces.length}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">Programs represented</dt>
            <dd className="font-display text-2xl font-semibold text-ink">
              {studioCategories.length}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">Ages</dt>
            <dd className="font-display text-2xl font-semibold text-ink">
              8 &amp; up
            </dd>
          </div>
        </dl>
      </PageHero>

      <Section size="wide" className="pt-14 sm:pt-16">
        <StudioGallery />
      </Section>

      {/* --- Contribute ------------------------------------------------------ */}
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="Add to the wall"
              tone="teal"
              title="Every student leaves with something finished."
              intro="That is the whole design of the program: not a worksheet, not a certificate — an object you made, that works, that you can hand to somebody. The Studio is where those objects live."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/events">
                Enroll a child
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/donate" variant="accent">
                Fund the materials
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <ul className="flex flex-col divide-y divide-ink/[0.08] rounded-[1.5rem] bg-cream p-2 ring-1 ring-ink/[0.06]">
              {studioCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/programs/${category.programSlug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-colors hover:bg-white"
                  >
                    <span>
                      <span className="block font-semibold text-ink">
                        {category.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {category.blurb}
                      </span>
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Loud, dev-only guard so invented students never quietly ship. */}
      {hasPlaceholders && process.env.NODE_ENV !== "production" ? (
        <Section className="py-8">
          <p className="rounded-xl bg-sun-100 px-5 py-4 text-sm font-semibold leading-relaxed text-sun-900 ring-1 ring-sun-300">
            Dev note: every piece in <code>src/lib/studio.ts</code> is a
            placeholder — these students are not real. Replace with photographed
            work and consented, first-name-only stories before launch.
            <br />
            <span className="font-normal">
              Shot list: {photoBrief.setup} {photoBrief.specs} {photoBrief.rules}
            </span>
          </p>
        </Section>
      ) : null}
    </>
  );
}
