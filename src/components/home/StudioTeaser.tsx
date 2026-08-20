import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import {
  StudioArtwork,
  StudioArtworkDefs,
} from "@/components/studio/StudioArtwork";
import { studioPieces, studioCategories, studioCategories as cats } from "@/lib/studio";

/**
 * Homepage doorway into Fresh Start Studio.
 *
 * Shows a hand-picked spread rather than the newest six — the point is to prove
 * the range of the programs in one glance, so the sample deliberately covers a
 * different craft in each tile.
 */
const featured = ["patchwork-jacket", "citrus-candles", "after-three", "bloom-tee", "birthday-tier"]
  .map((id) => studioPieces.find((piece) => piece.id === id))
  .filter((piece): piece is NonNullable<typeof piece> => Boolean(piece));

export function StudioTeaser() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(155deg,#012f38_0%,#013f4a_45%,#0a5054_100%)] py-20 text-white sm:py-28"
      style={{ scrollMarginTop: "6rem" }}
    >
      <StudioArtworkDefs />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.22)_0%,rgba(242,166,41,0)_66%)]"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="inverse" className="text-sun-300">
              Fresh Start Studio
            </Eyebrow>
            <h2
              id="studio-heading"
              className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Come see what they made.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              A jacket pieced from a grandmother&apos;s worn-out denim. A
              four-minute film about what a street looks like after three
              o&apos;clock. Every piece in the Studio comes with the story of the
              young person who made it.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/studio" variant="inverse" size="lg">
              Enter the Studio
              <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>

        {/* --- Sample wall --------------------------------------------------- */}
        <RevealGroup
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          stagger={0.07}
        >
          {featured.map((piece, index) => {
            const category = cats.find((c) => c.id === piece.category);
            return (
              <RevealChild
                key={piece.id}
                className={
                  // The first tile runs tall so the row reads as a wall, not a filmstrip.
                  index === 0 ? "col-span-2 sm:col-span-1 lg:col-span-2" : ""
                }
              >
                <Link
                  href="/studio"
                  className="group relative block overflow-hidden rounded-[1.25rem] ring-1 ring-white/15 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:ring-sun-300/60"
                >
                  <div
                    className={
                      index === 0
                        ? "relative aspect-4/3 w-full lg:aspect-16/10"
                        : "relative aspect-4/5 w-full"
                    }
                  >
                    {/* Real photography where it exists; the generated artwork
                        keeps the wall looking finished where it does not. */}
                    {piece.image ? (
                      <Image
                        src={piece.image}
                        alt={piece.alt ?? piece.title}
                        fill
                        sizes={
                          index === 0
                            ? "(max-width: 640px) 100vw, 50vw"
                            : "(max-width: 640px) 50vw, 25vw"
                        }
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="size-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105">
                        <StudioArtwork
                          category={piece.category}
                          seed={piece.id}
                          variant={piece.variant}
                        />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-4 pt-12">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-sun-300">
                        {category?.label}
                      </p>
                      <p className="mt-1 font-display text-base font-semibold leading-tight text-white">
                        {piece.title}
                      </p>
                      <p className="text-xs text-cream/75">
                        {piece.student}, {piece.age}
                      </p>
                    </div>
                  </div>
                </Link>
              </RevealChild>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-cream/70">
            {studioPieces.length} pieces across {studioCategories.length} programs
            — filter by craft, open any piece for the full story.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
