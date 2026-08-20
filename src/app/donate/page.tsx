import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { DonateCTA } from "@/components/home/DonateCTA";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { isFrequency, stripeConfigured, validateAmount } from "@/lib/donations";
import { site, mailto } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Donate",
  description: `Support ${site.legalName}, a 501(c)(3) nonprofit in Alexandria, Louisiana. Your tax-deductible gift puts tools, materials and instruction into the hands of students of every age — kids, teens and adults.`,
  path: "/donate",
  keywords: [
    "donate nonprofit Alexandria Louisiana",
    "support youth programs Louisiana",
    "support adult education Louisiana",
  ],
});

const otherWays = [
  {
    title: "Mail a check",
    body: `Make it payable to ${site.legalName} and mail to ${site.address.full}. We will send a written acknowledgment for your records — email ${site.emails.billing} if you need it sooner.`,
  },
  {
    title: "Give materials",
    body: "Fabric, thread, sewing machines, wax and wicks, baking supplies, blank shirts, cameras, lights, audio gear. If it goes into a workshop, we can use it.",
  },
  {
    title: "Sponsor a workshop",
    body: "Cover the materials and instruction for one full program cycle, and we will keep you posted on exactly what your students made.",
  },
  {
    title: "Employer matching",
    body: "Many employers match charitable gifts dollar for dollar. Ask your HR team — it is the easiest way to double what you give.",
  },
];

const faqs = [
  {
    question: "Is my donation to Fresh Start Life Skills tax-deductible?",
    answer:
      `Yes. Fresh Start Life Skills Inc. is a 501(c)(3) tax-exempt nonprofit organization, and gifts are tax-deductible to the extent allowed by law. For a receipt or any question about a gift, email ${site.emails.billing}.`,
  },
  {
    question: "Where does my donation go?",
    answer:
      "Directly into programming: materials for workshops, tools and equipment, and the cost of keeping classes low or no cost for families in central Louisiana.",
  },
  {
    question: "Can I donate supplies instead of money?",
    answer:
      "Absolutely. Fabric, sewing machines, baking supplies, blank apparel, candle-making materials and camera gear are all put straight to use. Call (318) 704-2808 to arrange a drop-off.",
  },
];

export default async function DonatePage({ searchParams }: PageProps<"/donate">) {
  const params = await searchParams;
  // A selection made in the homepage band is carried across so the visitor does
  // not have to choose an amount twice.
  const amount = validateAmount(params.amount) ?? undefined;
  const frequency = isFrequency(params.frequency) ? params.frequency : "once";
  const canceled = params.status === "canceled";

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Donate", path: "/donate" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Give"
        title="Put a real tool in somebody's hands."
        intro="Fresh Start runs on gifts from people who believe our students — kids, teens and adults alike — are worth the investment. Every dollar becomes materials, equipment and instruction."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Donate", href: "/donate" },
        ]}
      >
        {canceled ? (
          <p className="rounded-2xl bg-white px-5 py-4 text-ink shadow-[var(--shadow-soft)]">
            No charge was made — your checkout was cancelled. Pick an amount
            below whenever you are ready, or call{" "}
            <a
              href={site.contact.phoneHref}
              className="font-semibold underline decoration-sun-400 decoration-2 underline-offset-2"
            >
              {site.contact.phone}
            </a>
            .
          </p>
        ) : !stripeConfigured ? (
          <p className="rounded-2xl bg-white px-5 py-4 text-ink shadow-[var(--shadow-soft)]">
            Online giving is being connected right now. To give today, call{" "}
            <a
              href={site.contact.phoneHref}
              className="font-semibold underline decoration-sun-400 decoration-2 underline-offset-2"
            >
              {site.contact.phone}
            </a>{" "}
            or mail a check to {site.address.full}.
          </p>
        ) : null}
      </PageHero>

      <DonateCTA
        initialAmount={amount}
        initialFrequency={frequency}
        source="donate-page"
      />

      <Section>
        <SectionHeading
          eyebrow="Other ways to give"
          title="Not everything valuable comes as a card number."
          intro="Materials, equipment, matched gifts and sponsorships all move this work forward."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.09}>
          {otherWays.map((way) => (
            <RevealChild key={way.title}>
              <article className="h-full rounded-[1.5rem] bg-white p-8 shadow-[var(--shadow-soft)] ring-1 ring-ink/[0.05]">
                <h3 className="text-2xl text-ink">{way.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{way.body}</p>
              </article>
            </RevealChild>
          ))}
        </RevealGroup>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Questions"
          tone="green"
          title="What donors ask us."
          align="center"
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <dl className="flex flex-col divide-y divide-ink/[0.08]">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-7">
                <dt className="font-display text-xl font-semibold text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-3 leading-relaxed text-ink-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-ink-muted">
            Questions about a gift, a receipt or sponsorship?{" "}
            <a
              href={mailto(site.emails.billing)}
              className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
            >
              {site.emails.billing}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">
              Ask us anything
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/programs" variant="secondary">
              See what you are funding
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
