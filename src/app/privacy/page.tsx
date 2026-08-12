import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} handles the information you share with us.`,
  path: "/privacy",
});

/**
 * TODO(Darius): have this reviewed before launch, and revise it the moment a
 * donation provider, analytics or an email tool is added — each one changes
 * what data is collected and who processes it. If children ever create accounts,
 * COPPA obligations attach and this needs proper legal review.
 */
const sections = [
  {
    heading: "What we collect",
    body: [
      "If you contact us through this website, we receive whatever you choose to send: your name, email address, phone number and the content of your message. We collect this only so that we can reply to you.",
      "We do not require an account to browse this site, and children do not create accounts here.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "To answer your question, process an enrollment enquiry, coordinate volunteering, or acknowledge a donation. That is all.",
      "We do not sell, rent or trade your information, and we do not share it with anyone outside the organization except where a service provider is needed to deliver something you asked for.",
    ],
  },
  {
    heading: "Children's information",
    body: [
      "Program enrollment information about a child is provided by a parent or guardian and is used only to run the program. We do not publish a child's name, image or work without written permission from a parent or guardian.",
    ],
  },
  {
    heading: "Donations",
    body: [
      "When online giving is available, payments will be handled by a third-party payment processor. Card details are entered on the processor's systems and are never stored by Fresh Start Life Skills.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This site does not set advertising cookies or track you across other websites. If website analytics are added in the future, this policy will be updated first to say what is measured.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask us at any time to correct or delete the information we hold about you. Email ${site.contact.email} or call ${site.contact.phone} and we will take care of it.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro="We keep this short because our practice is simple: we only collect what we need to answer you, and we do not share it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />

      <Section size="narrow">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl text-ink">{section.heading}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="mt-3 leading-relaxed text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="text-2xl text-ink">Contact</h2>
            <address className="mt-3 not-italic leading-relaxed text-ink-muted">
              {site.legalName}
              <br />
              {site.address.full}
              <br />
              <a href={site.contact.emailHref} className="text-ink underline decoration-sun-400 decoration-2 underline-offset-4">
                {site.contact.email}
              </a>
              <br />
              <a href={site.contact.phoneHref} className="text-ink underline decoration-sun-400 decoration-2 underline-offset-4">
                {site.contact.phone}
              </a>
            </address>
          </section>
        </div>
      </Section>
    </>
  );
}
