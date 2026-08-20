import { Hero } from "@/components/home/Hero";
import { ServiceMarquee } from "@/components/home/ServiceMarquee";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsShowcase } from "@/components/home/ProgramsShowcase";
import { ImpactSection } from "@/components/home/ImpactSection";
import { CapstoneSection } from "@/components/home/CapstoneSection";
import { StudioTeaser } from "@/components/home/StudioTeaser";
import { StoriesSection } from "@/components/home/StoriesSection";
import { PathwaysSection } from "@/components/home/PathwaysSection";
import { DonateCTA } from "@/components/home/DonateCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { programListSchema, faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Vocational & Life Skills Training for All Ages in Alexandria, LA",
  description: `${site.legalName} is a 501(c)(3) nonprofit teaching practical life and vocational skills — sewing, budgeting, filmmaking, baking and more — to kids, teens and adults at little or no cost. Serving Alexandria, Pineville and central Louisiana.`,
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
      "Ages 8 and up, in four groups that meet separately: Kids 8 to 12, Teens 13 to 17, Young Adults 18 to 24, and Adults 25 and over. Kids and teens meet after school; the adult groups meet evenings and weekends and run three further advanced sessions in every workshop. The free Kids Creative Sewing class is for children 8 to 12.",
  },
  {
    question: "How much do the programs cost?",
    answer:
      "Programs are offered at low or no cost, and all materials are provided. Kids Creative Sewing is completely free. Nobody is turned away because of cost — call (318) 704-2808 to talk it through.",
  },
  {
    question: "Where is Fresh Start Life Skills located?",
    answer:
      "We are located at 3210 N Bolton Ave, Alexandria, LA 71303, and serve Alexandria, Pineville, Shongaloo, Springhill, Ruston, Natchitoches, Jennings and Monroe.",
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
      <CapstoneSection />
      <StudioTeaser />
      <ImpactSection />
      <StoriesSection />
      <PathwaysSection />
      <DonateCTA />
    </>
  );
}
