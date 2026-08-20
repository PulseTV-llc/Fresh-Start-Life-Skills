/**
 * Single source of truth for organization facts (NAP, contact, socials).
 *
 * Every surface that shows an address, phone number or email reads from here so
 * that the name/address/phone stays byte-identical across the site, the JSON-LD
 * and any future directory listings — which is what local SEO actually rewards.
 */

/**
 * One member of the Board of Directors.
 *
 * `bio` and `photo` are both optional so a member can be listed the moment
 * their name and seat are confirmed, without waiting on a headshot or a
 * written biography. The card renders correctly with either one missing.
 */
export type BoardMember = {
  name: string;
  role: string;
  /** One or two sentences. Omit until there is something real to say. */
  bio?: string;
  /** Path under `public/`, e.g. `/team/jane-smith.jpg`. */
  photo?: string;
};

/**
 * Board of Directors — the single source of truth for the /about roster.
 *
 * ⚠️ EVERY ENTRY BELOW IS A PLACEHOLDER, not a real person. Replace them
 * before this page goes in front of donors, grant reviewers or the state.
 *
 * To fill in a real member:
 *   1. Replace `name` and `role`, and write a one- or two-sentence `bio`
 *      (or drop the `bio` line entirely until you have one).
 *   2. Optional headshot — put the file in `public/team/`, matching the
 *      treatment used for `dorothy-jackson.jpg` (square JPEG, ~1000px,
 *      quality 75), then set `photo: "/team/their-name.jpg"`.
 *   3. Leave `photo` off and the card falls back to a sun-100 initials
 *      avatar, so a member with no photograph still looks deliberate.
 *
 * Adding or removing a seat is just adding or removing an entry — the grid
 * on /about reflows on its own.
 */
const board: BoardMember[] = [
  {
    name: "Daztia L. Henry",
    role: "Board Chair",
    photo: "/team/daztia-henry.jpg",
    bio: "Daztia L. Henry is a gifted herbalist and wellness advocate who grows her own herbs and turns healthy, from-scratch cooking and baking into a way of caring for her community. A sharp, results-driven entrepreneur, she is also co-owner of Auddix Cleaning Solutions, where her business instincts and standard of excellence have fueled real growth. As Board Chair, Daztia pairs a nurturing heart with serious business savvy to help every child at Fresh Start Life Skills get the strong start they deserve.",
  },
  {
    name: "Board Member — Name TBD",
    role: "Vice Chair",
    bio: "Placeholder entry. Replace with a short note on this member's background and what they bring to the board.",
  },
  {
    name: "Board Member — Name TBD",
    role: "Treasurer",
    bio: "Placeholder entry. Replace with a short note on this member's background and what they bring to the board.",
  },
  {
    name: "Board Member — Name TBD",
    role: "Secretary",
    bio: "Placeholder entry. Replace with a short note on this member's background and what they bring to the board.",
  },
];

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
    /**
     * Her headshot, in `public/team/`. Single source of truth so the about
     * page portrait, the leadership card and the home-page pull-quote all
     * move together if the photograph is ever re-shot.
     */
    photo: "/team/dorothy-jackson.jpg",
    /**
     * Her biography, one string per paragraph, rendered in full on /about.
     *
     * Deliberately not reused in the small places: the leadership card and the
     * home-page pull-quote stay short, because six paragraphs in a 56px avatar
     * card is not a biography, it is a wall. Those surfaces link here instead.
     */
    bio: [
      "Dorothy Jackson is a dedicated community leader, mentor, teacher, and entrepreneur who has spent more than 30 years serving and empowering young people. Her passion is helping children, teenagers, and young adults discover who they are, recognize their God-given gifts, and develop the confidence and skills needed to become successful in life.",
      "Through Fresh Start Life Skills, Dorothy provides hands-on training in sewing, cake decorating, computer skills, entrepreneurship, and other practical life skills. She believes that when young people are given knowledge, encouragement, and opportunities, they can overcome obstacles and create a positive future for themselves.",
      "Dorothy's commitment to teaching has taken her to various states, where she has shared her talents and trained children, teens, and young adults. Her love for youth and her desire to see them succeed continue to drive her mission.",
      "As a proud mother of two successful sons who own their own companies, Dorothy has witnessed firsthand the importance of teaching young people responsibility, determination, creativity, and entrepreneurship.",
      "Her vision through Fresh Start Life Skills is to make a lasting difference in the lives of young people by helping them become self-aware, build confidence, develop valuable skills, discover their purpose, and prepare for success.",
      "Dorothy Jackson believes every young person has potential—and sometimes all they need is someone to believe in them, teach them, and give them a fresh start.",
    ],
  },

  /** Board of Directors. Defined above — see the notes on adding a member. */
  board,

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
    description: "Hands-on workshops for ages 8 & up",
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
