/**
 * Single source of truth for organization facts (NAP, contact, socials).
 *
 * Every surface that shows an address, phone number or email reads from here so
 * that the name/address/phone stays byte-identical across the site, the JSON-LD
 * and any future directory listings — which is what local SEO actually rewards.
 */

export const site = {
  name: "Fresh Start Life Skills",
  legalName: "Fresh Start Life Skills Inc.",
  shortName: "Fresh Start",
  tagline: "Learn, Explore & Grow",
  description:
    "Fresh Start Life Skills Inc. is a 501(c)(3) nonprofit in Alexandria, Louisiana dedicated to empowering individuals of all ages through hands-on vocational and life-skills training.",
  mission:
    "Fresh Start Life Skills Inc. is a non-profit organization dedicated to empowering individuals of all ages.",

  /**
   * Canonical origin. The apex 308-redirects to www on Vercel, so www is the
   * primary and every canonical URL, OG tag and sitemap entry must match it —
   * pointing them at the apex would send crawlers through a redirect on every
   * single URL.
   */
  url: "https://www.freshstartlifeskills.org",

  founder: {
    name: "Dorothy Jackson",
    role: "Founder & Executive Director",
  },

  /**
   * Departmental mailboxes.
   *
   * Routing enquiries to the right inbox is the difference between a message
   * being answered and a message sitting in a shared account. `general` is the
   * public default and appears in the footer, the header and the schema.
   *
   * There is deliberately no board-member address here: board members are not a
   * public contact channel, and publishing one invites mail the org then has to
   * forward internally anyway.
   */
  emails: {
    /** Everything with no better home. The default public address. */
    general: "info@freshstartlifeskills.org",
    /** Programs, enrollment, "I have a question" help. */
    support: "support@freshstartlifeskills.org",
    /** Gifts, receipts, sponsorship, anything with money attached. */
    billing: "billing@freshstartlifeskills.org",
    /** The president. Press, official and leadership correspondence. */
    leadership: "dorothy@freshstartlifeskills.org",
  },

  contact: {
    phone: "(318) 704-2808",
    phoneHref: "tel:+13187042808",
    /** The public default — kept in sync with `emails.general`. */
    email: "info@freshstartlifeskills.org",
    emailHref: "mailto:info@freshstartlifeskills.org",
  },

  address: {
    street: "3210 N Bolton Ave",
    city: "Alexandria",
    region: "LA",
    regionName: "Louisiana",
    postalCode: "71303",
    country: "US",
    full: "3210 N Bolton Ave, Alexandria, LA 71303",
    // Approximate — replace with the exact pin from Google Business Profile.
    latitude: 31.3403,
    longitude: -92.4451,
  },

  /** Communities served across central and north Louisiana. */
  serviceAreas: [
    "Alexandria",
    "Pineville",
    "Shongaloo",
    "Springhill",
    "Ruston",
    "Natchitoches",
    "Jennings",
    "Monroe",
  ],

  // TODO(Darius): confirm real handles; unused entries are filtered out in the footer.
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "",
    linkedin: "",
  },

  /** 501(c)(3) determination details — shown in the footer for donor trust. */
  nonprofit: {
    status: "501(c)(3) tax-exempt nonprofit organization",
    // TODO(Darius): add the EIN from the IRS determination letter.
    ein: "",
    founded: "2023",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About", description: "Our story, mission and team" },
  {
    href: "/programs",
    label: "Programs",
    description: "Hands-on workshops for ages 8–17",
  },
  {
    href: "/programs/ai-builder-lab",
    label: "AI Lab",
    description: "The capstone — build & launch with AI",
  },
  {
    href: "/studio",
    label: "Studio",
    description: "Gallery of what our students make",
  },
  {
    href: "/events",
    label: "Events",
    description: "Upcoming sessions and registration",
  },
  {
    href: "/get-involved",
    label: "Get Involved",
    description: "Volunteer, partner or donate goods",
  },
  { href: "/contact", label: "Contact", description: "Reach the Fresh Start team" },
];

/** `mailto:` for any of the departmental mailboxes. */
export const mailto = (address: string) => `mailto:${address}`;
