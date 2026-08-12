import { allPrograms, capstoneProgram, type Program } from "./programs";
import { capstone, buildModules } from "./capstone";
import { site } from "./site";

/**
 * Schema.org structured data.
 *
 * Search engines use these graphs to render the knowledge panel, the local pack
 * entry and program rich results. The NGO node is given a stable `@id` so every
 * other node can reference it instead of duplicating the organization.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/brand/logo-1024.png`,
      width: 1024,
      height: 1024,
    },
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    foundingDate: site.nonprofit.founded,
    nonprofitStatus: "Nonprofit501c3",
    ...(site.nonprofit.ein ? { taxID: site.nonprofit.ein } : {}),
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    areaServed: site.serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, ${site.address.regionName}`,
    })),
    knowsAbout: [
      "life skills training",
      "vocational education",
      "youth after-school programs",
      "financial literacy for kids",
      "sewing classes",
      "film and media production for youth",
    ],
    sameAs: Object.values(site.socials).filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Program enrollment",
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: "US-LA",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.legalName,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function programSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description,
    url: `${site.url}/programs/${program.slug}`,
    provider: { "@id": ORG_ID },
    isAccessibleForFree: program.cost.toLowerCase() === "free",
    typicalAgeRange: program.ages.replace("Ages ", ""),
    teaches: program.skills,
    educationalLevel: "Beginner",
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      category: program.cost.toLowerCase() === "free" ? "Free" : "Low cost",
      price: program.cost.toLowerCase() === "free" ? 0 : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: site.legalName,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
        },
      },
    },
  };
}

/**
 * The capstone gets richer markup than the craft programs: `Course` is what
 * Google renders course results from, and `EducationalOccupationalProgram`
 * carries the vocational framing (what it prepares a student to do) that a
 * single Course node has nowhere to put. Emitted as two nodes rather than one
 * multi-typed node, which search engines parse more reliably.
 */
export function capstoneSchema() {
  const url = `${site.url}/programs/${capstone.slug}`;
  const teaches = buildModules.flatMap((module) => [
    module.title,
    ...module.outputs,
  ]);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${url}#course`,
      name: `${capstone.name} — build and launch with AI`,
      description: capstone.summary,
      url,
      provider: { "@id": ORG_ID },
      isAccessibleForFree: false,
      offers: {
        "@type": "Offer",
        category: "Low cost",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      typicalAgeRange: capstone.ages.replace("Ages ", ""),
      educationalLevel: "Beginner",
      inLanguage: "en-US",
      teaches,
      about: [
        "Artificial intelligence",
        "Web development",
        "Mobile app development",
        "Entrepreneurship",
      ],
      coursePrerequisites:
        "Completion of one Fresh Start craft program, so the student has work of their own to build around.",
      timeRequired: "P8W",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "onsite",
        courseWorkload: "P8W",
        location: {
          "@type": "Place",
          name: site.legalName,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
          },
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "@id": `${url}#program`,
      name: capstone.name,
      description: capstone.summary,
      url,
      provider: { "@id": ORG_ID },
      programType: "Capstone",
      educationalProgramMode: "full-time",
      timeToComplete: "P8W",
      typicalAgeRange: capstone.ages.replace("Ages ", ""),
      occupationalCategory: [
        "Web Developer",
        "Mobile Application Developer",
        "Small Business Owner",
      ],
      teaches: capstoneProgram.skills,
      applicationDeadline: undefined,
      offers: {
        "@type": "Offer",
        category: "Low cost",
        priceCurrency: "USD",
      },
    },
  ];
}

export function programListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} programs`,
    itemListElement: allPrograms.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/programs/${program.slug}`,
      name: program.title,
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).toString(),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
