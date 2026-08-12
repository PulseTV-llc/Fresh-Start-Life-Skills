import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { ConvergenceDiagram } from "@/components/capstone/ConvergenceDiagram";
import { capstone, buildModules } from "@/lib/capstone";

/**
 * The capstone band.
 *
 * Deliberately the heaviest section on the page: full-bleed navy with a summit
 * of amber light behind the diagram. Everything above it on the homepage is a
 * craft; this is the peak those crafts are running toward, which is the same
 * gesture the logo makes.
 */
export function CapstoneSection() {
  return (
    <section
      id="capstone"
      aria-labelledby="capstone-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(168deg,#012f38_0%,#01414d_38%,#0a5054_72%,#013f4a_100%)] py-20 text-white sm:py-28"
      style={{ scrollMarginTop: "6rem" }}
    >
      {/* The summit: light breaking over the ridge the whole site climbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-[46rem] bg-[radial-gradient(60%_50%_at_50%_100%,rgba(242,166,41,0.34)_0%,rgba(242,166,41,0.08)_42%,rgba(242,166,41,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg at 50% 118%, #f2a629 0deg 2.2deg, transparent 2.2deg 9deg)",
        }}
      />

      <Container size="wide" className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="inverse" className="justify-center text-sun-300">
            {capstone.motto} · The capstone
          </Eyebrow>
          <h2
            id="capstone-heading"
            className="mt-5 text-4xl leading-[1.06] text-white sm:text-5xl lg:text-[3.6rem]"
          >
            Where a skill becomes{" "}
            <span className="text-sun-300">a business.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/85 sm:text-xl">
            Learn, Explore &amp; Grow gets a fourth verb. In the{" "}
            {capstone.name}, students take something they made with their own
            hands and use AI to build the real thing around it — a website, an
            app for both phones, sign-in, a database, payments, and a live
            deployment anyone in the world can open.
          </p>
        </Reveal>

        {/* --- The thesis ------------------------------------------------- */}
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
          <blockquote className="relative rounded-[1.5rem] border-l-2 border-sun-400 bg-cream/[0.06] py-6 pl-7 pr-6 ring-1 ring-cream/10 backdrop-blur-sm">
            <p className="font-display text-2xl leading-snug text-white sm:text-[1.75rem]">
              &ldquo;{capstone.thesis}&rdquo;
            </p>
            <footer className="mt-3 text-sm text-cream/60">
              Why this program exists
            </footer>
          </blockquote>
        </Reveal>

        {/* --- The convergence -------------------------------------------- */}
        <div className="mt-16">
          <ConvergenceDiagram />
        </div>

        {/* --- The stack --------------------------------------------------- */}
        <Reveal delay={0.1} className="mt-16">
          <p className="text-center text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/50">
            What they learn to build with AI
          </p>
          <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {buildModules.map((module) => (
              <li
                key={module.id}
                className="rounded-full bg-cream/[0.07] px-4 py-2 text-sm font-medium text-cream/90 ring-1 ring-cream/15"
              >
                {module.title}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={`/programs/${capstone.slug}`} variant="accent" size="lg">
            Explore the {capstone.name}
            <ArrowIcon />
          </ButtonLink>
          <p className="text-sm text-cream/70">
            {capstone.ages} · {capstone.cost} · {capstone.length}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
