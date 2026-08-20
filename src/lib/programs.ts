/**
 * Program catalog.
 *
 * This is the content spine of the site: the homepage showcase, the /programs
 * index, each program detail page, the sitemap and the Course JSON-LD all read
 * from this one array. Adding a program here publishes it everywhere.
 */

import { ageLabel, type AgeBandId } from "./ageBands";

export type ProgramTrack = "after-school" | "free-class" | "capstone";

export type Program = {
  slug: string;
  title: string;
  /** Short line used on cards and in meta descriptions. */
  tagline: string;
  description: string;
  /** Longer copy for the detail page. */
  body: string[];
  track: ProgramTrack;
  /**
   * Which age groups run this program. Each band meets separately, and the
   * adult bands additionally run the advanced sessions in `curriculum.ts`.
   * The displayed range is derived from this — never written out by hand.
   */
  bands: AgeBandId[];
  /** Skills a student walks away with — rendered as chips. */
  skills: string[];
  cost: string;
  /** Illustration key — maps to a hand-drawn SVG in ProgramGlyph. */
  glyph:
    | "sewing"
    | "candle"
    | "budget"
    | "cake"
    | "tshirt"
    | "music"
    | "film"
    | "creative-sewing"
    | "ai-builder";
  /** Card accent, chosen from the brand palette. */
  accent: "sun" | "green" | "teal" | "navy";
  featured?: boolean;
  /**
   * The capstone renders its own bespoke page and its own elevated treatment in
   * every listing, so it is deliberately excluded from the ordinary grids.
   */
  capstone?: boolean;
  /**
   * A real photograph of the workshop, in `public/programs/`. Programs without
   * one fall back to a branded placeholder that names the shot still needed.
   *
   * Only ever a real photo of a real session — never a stock image, and never
   * captioned with an invented student. A signed media release must be on file
   * for anyone identifiable.
   */
  photo?: string;
  /** Required whenever `photo` is set. Describes the scene, names nobody. */
  photoAlt?: string;
  /** Shown under the photo. Deliberately generic — no names, no stories. */
  photoCaption?: string;
  /** Natural aspect of `photo`, so the feature slot never crops it. */
  photoAspect?: string;
};

export const programs: Program[] = [
  {
    slug: "kids-creative-sewing",
    title: "Kids Creative Sewing",
    tagline: "A free introduction to needle, thread and imagination.",
    description:
      "Our free creative sewing class gives children ages 8–12 their first taste of making something with their own two hands — from threading a needle to finishing a project they can take home.",
    body: [
      "Sewing is where a lot of Fresh Start students discover they are makers. In this free class, children ages 8–12 learn to thread a needle, measure and cut fabric, sew a straight seam and finish a small project of their own design.",
      "Every material is provided. Students work at their own pace with hands-on coaching, and each class ends with something finished — a pillow, a tote, a patch — that goes home with them that day.",
      "No experience is needed, and there is no cost to families. Space is limited to keep the group small enough for real one-on-one attention.",
    ],
    track: "free-class",
    bands: ["kids"],
    skills: ["Hand sewing", "Measuring", "Pattern basics", "Finishing a project"],
    cost: "Free",
    glyph: "creative-sewing",
    photo: "/events/sewing-instructor-machine.jpg",
    photoAlt:
      "An instructor sitting alongside a young student guiding fabric through a sewing machine.",
    photoCaption: "First seams, one-to-one at the machine.",
    photoAspect: "1200 / 1600",
    accent: "sun",
    featured: true,
  },
  {
    slug: "beginners-sewing",
    title: "Beginners Sewing Classes",
    tagline: "From first stitch to finished garment.",
    description:
      "A structured sewing course covering machine safety, seams, hems and simple garment construction — a genuine vocational skill, taught to kids, teens and adults alike.",
    body: [
      "Our beginners sewing course takes students beyond hand stitching and onto the machine. They learn threading, tension, seam allowances, hems and how to read a simple pattern.",
      "Sewing is a life skill and a livelihood. Students who finish this course can repair their own clothes, alter a hem for somebody in the house, and — for some — take the first step toward tailoring or textile work.",
      "The adult groups keep going: fitting a real body, finishes that survive a wash cycle, and what it takes to charge for an alteration.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Machine operation", "Seams & hems", "Pattern reading", "Garment repair"],
    cost: "Low or no cost",
    glyph: "sewing",
    photo: "/events/sewing-marking-pattern.jpg",
    photoAlt:
      "A student marking out a pattern piece at a sewing station, machine ready beside her.",
    photoCaption: "Marking a pattern before the first cut.",
    photoAspect: "1200 / 1600",
    accent: "sun",
  },
  {
    slug: "candle-making",
    title: "Candle Making Workshop",
    tagline: "Chemistry, craft and a small business in a jar.",
    description:
      "Students learn wax types, wick sizing, fragrance blending and safe pouring — and leave understanding how a handmade product becomes something you can sell.",
    body: [
      "Candle making is equal parts science and craft. Students learn how different waxes behave, how to size a wick to a vessel, how fragrance load affects burn, and how to pour safely and cleanly.",
      "We finish by talking about cost per unit and pricing — the first business lesson many of our students ever get, taught with something they made themselves. The adult groups go on to burn testing, batch production and what it takes to sell wholesale.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Wax & wick science", "Fragrance blending", "Safe pouring", "Unit pricing"],
    cost: "Low or no cost",
    glyph: "candle",
    photo: "/events/candle-making-pouring-wax.jpg",
    photoAlt:
      "A student pouring scented wax into a jar at a Fresh Start candle-making workshop.",
    photoCaption: "Pouring a batch, fragrance oils to hand.",
    photoAspect: "1448 / 1086",
    accent: "green",
  },
  {
    slug: "financing-and-budgeting",
    title: "Financing & Budgeting",
    tagline: "Money skills school never got around to teaching.",
    description:
      "Financial literacy pitched to the group in the room: needs versus wants and a first savings goal for the younger students; pay stubs, credit and a household budget for the adults.",
    body: [
      "Most people leave school without ever having built a budget. This program fixes that with plain language and real scenarios: what things cost, how saving toward a goal works, what a bank account does, and how credit can help or hurt.",
      "Everyone works through a simulated month — income, fixed costs, an unexpected expense — and comes out the other side with a budget they wrote themselves. The adult groups then take it further: a real pay stub, an amortization schedule, and a household that can absorb a bad month.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Budgeting", "Saving goals", "Banking basics", "Needs vs. wants"],
    cost: "Low or no cost",
    glyph: "budget",
    accent: "teal",
  },
  {
    slug: "cake-decorating",
    title: "Cake Decorating Basics",
    tagline: "Buttercream, piping bags and a whole lot of patience.",
    description:
      "Kitchen fundamentals meet artistry: leveling and crumb coats, piping techniques, color theory in frosting, and the food-safety habits every kitchen requires.",
    body: [
      "Students learn to level a cake, apply a crumb coat, mix colors and control a piping bag — the fundamentals that separate a homemade cake from a professional one.",
      "Alongside the artistry we teach kitchen discipline: clean stations, food safety, timing and working to someone else's spec. These are the habits that make somebody hireable in a kitchen.",
      "Adults carry on into tiered structure, allergen handling and what Louisiana's cottage food law does and does not let you sell from a home kitchen.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Icing & crumb coats", "Piping techniques", "Color mixing", "Food safety"],
    cost: "Low or no cost",
    glyph: "cake",
    photo: "/events/cake-club-students-group-aprons.jpg",
    photoAlt:
      "Students in aprons and chef hats standing behind the trays of cupcakes they decorated.",
    photoCaption: "Cake Club — the end of a decorating session.",
    photoAspect: "1600 / 1200",
    accent: "sun",
  },
  {
    slug: "t-shirt-designing",
    title: "T-Shirt Designing",
    tagline: "Design it, press it, wear it out the door.",
    description:
      "From sketch to finished garment: layout and typography basics, working with a cutter and heat press, and building a small apparel line around an idea.",
    body: [
      "Students take an idea from sketch to a shirt they can wear the same afternoon. Along the way they learn layout, typography, color contrast and how a design behaves on fabric.",
      "The back half of the program is entrepreneurial: naming a line, pricing a shirt, and understanding what it takes to fill an order for someone else.",
      "The adult sessions add print-ready artwork, garment and ink compatibility, and quoting a run of a hundred shirts without losing money on it.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Graphic layout", "Typography", "Heat press", "Small-batch production"],
    cost: "Low or no cost",
    glyph: "tshirt",
    accent: "teal",
  },
  {
    slug: "musical-workshop",
    title: "Musical Workshop",
    tagline: "Rhythm, voice and the confidence to perform.",
    description:
      "Group music-making that builds ear, rhythm and stage presence — plus the teamwork that only comes from playing a part in something bigger than yourself.",
    body: [
      "Our musical workshop meets students wherever they are: rhythm and ear training, singing together, learning parts, and building toward a performance.",
      "The real curriculum is confidence. Standing up in front of people and being heard changes how somebody carries themselves everywhere else.",
      "Adults go further into arranging for a small ensemble, tracking and mixing a recording, and the practical side of playing for pay.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Rhythm & ear training", "Ensemble playing", "Vocal basics", "Performance"],
    cost: "Low or no cost",
    glyph: "music",
    photo: "/events/music-workshop-production-lab.jpg",
    photoAlt:
      "Students in headphones producing music on MIDI keyboards and Macs at a Fresh Start musical workshop.",
    photoCaption: "Building a track in the production lab.",
    photoAspect: "1447 / 1087",
    accent: "green",
  },
  {
    slug: "film-recording-and-directing",
    title: "Film Recording & Directing",
    tagline: "Tell your story — and learn the gear that tells it.",
    description:
      "Camera framing, sound, lighting and directing, taught by making an actual short film from first idea to final cut.",
    body: [
      "Students learn how a story is built on screen: framing and shot sizes, capturing clean audio, lighting a scene, and directing people with clarity and kindness.",
      "Everyone rotates through the roles — camera, sound, director, editor — and the group finishes an actual short film together. Media production is a real career pathway, and this is where it starts.",
      "The adult sessions cover the parts that make it a job: call sheets and releases, manual exposure and monitored audio, colour, and delivering paid work to a client's spec.",
    ],
    track: "after-school",
    bands: ["kids", "teens", "young-adults", "adults"],
    skills: ["Camera & framing", "Audio capture", "Lighting", "Directing & editing"],
    cost: "Low or no cost",
    glyph: "film",
    accent: "teal",
    photo: "/programs/film-directing.jpg",
    photoAlt:
      "A student behind a professional cinema camera wearing headphones, lit by a softbox, with an instructor watching the shot alongside him.",
    photoCaption: "In the studio — Film & Directing",
    photoAspect: "1320 / 1084",
  },
];

/**
 * The capstone. Lives in this array so it appears in the sitemap, the footer and
 * the Course structured data alongside everything else, but `capstone: true`
 * lifts it out of the ordinary card grids.
 */
export const capstoneProgram: Program = {
  slug: "ai-builder-lab",
  title: "AI Builder Lab",
  tagline: "Turn what you made into a business that runs on the internet.",
  description:
    "The capstone that ties every other program together. Students use AI to build and launch the real business around something they made by hand — a website, iPhone and Android apps, sign-in, a database, payments, and a live deployment.",
  body: [
    "Every other Fresh Start program ends with something a student made: a candle, a shirt, a cake, a short film. The AI Builder Lab is where that object becomes a business that anyone in the world can find and buy from.",
    "Students learn to direct AI properly — to describe what they want, read what it produced, spot what is wrong and ask for the fix. Along the way they pick up the basics of HTML, CSS and JavaScript, because a builder who cannot read their own code cannot debug it or tell when the AI is wrong.",
    "By the end they have shipped: a live website, an app running on both iPhone and Android, customer sign-in, a database and file storage, a working checkout, and a URL they can send to anybody.",
  ],
  track: "capstone",
  bands: ["teens", "young-adults", "adults"],
  skills: [
    "Building with AI",
    "HTML, CSS & JavaScript",
    "Authentication",
    "Databases & storage",
    "Payments",
    "iOS & Android apps",
    "Deploying on Vercel",
  ],
  cost: "Low or no cost",
  glyph: "ai-builder",
  accent: "navy",
  capstone: true,
};

/**
 * Everything, including the capstone — for the sitemap, the footer and the
 * ItemList schema. `programs` above stays the craft catalogue, which is what
 * the card grids and the [slug] route should enumerate: the capstone has its
 * own bespoke page at /programs/ai-builder-lab.
 */
export const allPrograms: Program[] = [...programs, capstoneProgram];

export const programBySlug = (slug: string) =>
  programs.find((program) => program.slug === slug);

export const featuredPrograms = programs.filter((program) => program.featured);

/**
 * The displayed age line for a program — "Ages 8 & up", "Ages 8–12".
 *
 * Always derived from `bands`, so a program can never advertise a range it does
 * not actually run a group for.
 */
export const programAges = (program: Program) => ageLabel(program.bands);

export const tracks: { id: ProgramTrack | "all"; label: string; blurb: string }[] = [
  {
    id: "all",
    label: "All programs",
    blurb: "Every workshop Fresh Start currently offers.",
  },
  {
    id: "after-school",
    label: "After-School & Evening Workshops",
    blurb:
      "Learn, Explore & Grow — after school for kids and teens, evenings and weekends for adults, with the advanced sessions added for the 18+ groups.",
  },
  {
    id: "free-class",
    label: "Free classes",
    blurb: "Open enrollment classes offered at no cost to families.",
  },
];
