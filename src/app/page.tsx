import { Hero } from "@/components/home/Hero";
import { ServiceMarquee } from "@/components/home/ServiceMarquee";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsShowcase } from "@/components/home/ProgramsShowcase";
import { ImpactSection } from "@/components/home/ImpactSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { PathwaysSection } from "@/components/home/PathwaysSection";
import { DonateCTA } from "@/components/home/DonateCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { programListSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Vocational & Life Skills Training for Youth in Alexandria, LA",
  description: `${site.legalName} is a 501(c)(3) nonprofit teaching ages 8–17 practical life and vocational skills — sewing, budgeting, filmmaking, baking and more — at little or no cost. Serving Alexandria, Pineville and central Louisiana.`,
  path: "/",
});

/**
 * Homepage FAQ.
 *
 * These are the questions Dorothy actually gets on the phone, which makes them
 * the right ones to answer in a rich result too.
 */
const faqs = [
  {
    question: "What ages does Fresh Start Life Skills serve?",
    answer:
      "Our after-school program serves youth ages 8 through 17. The free Kids Creative Sewing class is designed for children ages 8 to 12.",
  },
  {
    question: "How much do the programs cost?",
    answer:
      "Programs are offered at low or no cost, and all materials are provided. Kids Creative Sewing is completely free. No family is turned away because of cost — call (318) 704-2808 to talk it through.",
  },
  {
    question: "Where is Fresh Start Life Skills located?",
    answer:
      "We are located at 3210 N Bolton Ave, Alexandria, LA 71303, and serve families across Alexandria, Pineville, Shongaloo, Springhill, Ruston, Natchitoches, Jennings and Monroe.",
  },
  {
    question: "Is Fresh Start Life Skills a registered nonprofit?",
    answer:
      "Yes. Fresh Start Life Skills Inc. is a 501(c)(3) tax-exempt nonprofit organization, and donations are tax-deductible to the extent allowed by law.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[programListSchema(), faqSchema(faqs)]} />
      <Hero />
      <ServiceMarquee />
      <MissionSection />
      <ProgramsShowcase />
      <ImpactSection />
      <StoriesSection />
      <PathwaysSection />
      <DonateCTA />
    </>
  );
}
