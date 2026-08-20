import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { GiftBuilder } from "@/components/donate/GiftBuilder";
import type { DonationFrequency } from "@/lib/donations";

const assurances = [
  "Tax-deductible — we are a registered 501(c)(3)",
  "Materials are provided free to every student",
  "Gifts stay local to central Louisiana",
];

/**
 * The giving band.
 *
 * Deep navy with an amber sunrise breaking over it — the logo's own gesture.
 * A full-bleed amber band was the first instinct, but white body copy on
 * #f2a629 measures 2.1:1, so the warmth is carried by the light and the CTA
 * rather than by the ground.
 *
 * The band itself is a Server Component; only the gift builder inside it needs
 * to be interactive.
 */
export function DonateCTA({
  initialAmount,
  initialFrequency,
  source = "home-cta",
}: {
  initialAmount?: number;
  initialFrequency?: DonationFrequency;
  source?: string;
}) {
  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(140deg,#0a5054_0%,#013f4a_46%,#012f38_100%)] py-20 text-white sm:py-28"
    >
      {/* Sun rays breaking over the navy — texture, not decoration you notice */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg at 22% 112%, #f2a629 0deg 2.6deg, transparent 2.6deg 9deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-[22%] size-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,166,41,0.55)_0%,rgba(242,166,41,0.12)_42%,rgba(242,166,41,0)_68%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="inverse" className="text-sun-300">
              Give
            </Eyebrow>
            <h2
              id="donate-heading"
              className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Fund somebody&apos;s next skill.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white">
              Fresh Start runs on donated materials, donated time and gifts from
              people who believe our students are worth the investment — the
              ten-year-old at the sewing machine and the adult retraining beside
              her. Every dollar goes into somebody&apos;s hands.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-white">
              {assurances.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 size-5 shrink-0 text-sun-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="10" cy="10" r="8.5" opacity="0.45" />
                    <path
                      d="m6 10.4 2.8 2.6L14 7.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <GiftBuilder
              source={source}
              initialAmount={initialAmount}
              initialFrequency={initialFrequency}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
