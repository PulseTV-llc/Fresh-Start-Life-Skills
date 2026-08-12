import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { DonateCTA } from "@/components/home/DonateCTA";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { donationsConfigured } from "@/lib/donations";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Donate",
  description: `Support ${site.legalName}, a 501(c)(3) nonprofit in Alexandria, Louisiana. Your tax-deductible gift puts tools, materials and instruction into the hands of young people ages 8–17.`,
  path: "/donate",
  keywords: ["donate nonprofit Alexandria Louisiana", "support youth programs Louisiana"],
});

const otherWays = [
  {
    title: "Mail a check",
    body: `Make it payable to ${site.legalName} and mail to ${site.address.full}. We will send a written acknowledgment for your records.`,
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
      "Yes. Fresh Start Life Skills Inc. is a 501(c)(3) tax-exempt nonprofit organization, and gifts are tax-deductible to the extent allowed by law.",
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
  const amount = typeof params.amount === "string" ? params.amount : null;
  const frequency = typeof params.frequency === "string" ? params.frequency : null;

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
        title="Put a tool in a child's hands."
        intro="Fresh Start runs on gifts from people who believe these young people are worth the investment. Every dollar becomes materials, equipment and instruction."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Donate", href: "/donate" },
        ]}
      >
        {/* Carries the visitor's choice across from the homepage CTA so the
            selection is never lost while online giving is being set up. */}
        {amount && !donationsConfigured ? (
          <p className="rounded-2xl bg-white px-5 py-4 text-ink shadow-[var(--shadow-soft)]">
            You selected a{" "}
            <strong className="font-semibold">
              ${amount}
              {frequency === "monthly" ? " monthly" : ""}
            </strong>{" "}
            gift. Online giving is not live yet — call{" "}
            <a
              href={site.contact.phoneHref}
              className="font-semibold underline decoration-sun-400 decoration-2 underline-offset-2"
            >
              {site.contact.phone}
            </a>{" "}
            and we will take it from there.
          </p>
        ) : null}
      </PageHero>

      <DonateCTA />

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
