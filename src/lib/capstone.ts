/**
 * The AI Builder Lab — the capstone program.
 *
 * Every other program teaches a craft. This one teaches students to turn the
 * thing they made into something real on the internet: a website, an app for
 * both phones, a way to sign in, somewhere to keep the data and the photos, a
 * way to take payment, and a live deployment anyone can visit.
 *
 * All copy here is forward-looking on purpose — "you will build", never "our
 * students have built". No cohort has run yet, and this page must not imply one
 * has. Swap to past tense with real outcomes once the first group ships.
 */

import { studioCategories, type StudioCategory } from "./studio";

export const capstone = {
  slug: "ai-builder-lab",
  name: "AI Builder Lab",
  /** The fourth verb, after Learn, Explore & Grow. */
  motto: "Build & Launch",
  ages: "Ages 12–17",
  cost: "Low or no cost",
  length: "8 weeks, after the craft programs",
  /** The line the whole program hangs on. */
  thesis:
    "AI is taking over. Every young person should know how to use it properly.",
  summary:
    "The capstone that ties every other program together. Students take something they already made by hand — a candle, a shirt, a cake, a film — and use AI to build and launch the real business around it: a website, an app for iPhone and Android, sign-in, a database, payments, and a live deployment anyone in the world can open.",
} as const;

/* ---------------------------------------------------------------------------
 * What students build, in the order they build it.
 * ------------------------------------------------------------------------ */

export type BuildModule = {
  id: string;
  /** Week label — sequence matters more than exact dates. */
  step: string;
  title: string;
  /** One line a 13-year-old would understand. */
  plain: string;
  detail: string;
  /** Concrete artifacts a student walks away with. */
  outputs: string[];
  accent: "sun" | "green" | "teal" | "navy";
  glyph:
    | "website"
    | "mobile"
    | "auth"
    | "database"
    | "code"
    | "payments"
    | "deploy";
};

export const buildModules: BuildModule[] = [
  {
    id: "website",
    step: "Week 1–2",
    title: "Build the website",
    plain: "Your work gets an address on the internet.",
    detail:
      "Students describe the site they want, then work with AI to build it — a home page, a gallery of what they make, an about page, a way to get in touch. They learn to read what the AI produced, to say precisely what is wrong with it, and to ask for the fix.",
    outputs: ["A real multi-page website", "Product photography and copy", "A brand and colour palette"],
    accent: "teal",
    glyph: "website",
  },
  {
    id: "code",
    step: "Week 2–3",
    title: "HTML, CSS & JavaScript — with AI as the tutor",
    plain: "Understand what the code is actually doing.",
    detail:
      "The point is not to memorise syntax. It is to stop the website being magic. Students learn what HTML, CSS and JavaScript each do, read the code AI wrote for them, change it by hand, break it, and fix it. A builder who cannot read their own code cannot debug it, and cannot tell when the AI is wrong.",
    outputs: ["Reading and editing real code", "Debugging with AI as a pair", "Knowing when the AI is wrong"],
    accent: "sun",
    glyph: "code",
  },
  {
    id: "auth",
    step: "Week 3–4",
    title: "Authentication",
    plain: "Customers get accounts. Only you get the keys.",
    detail:
      "Sign-up, sign-in, password resets, and the difference between a customer account and an owner account. Students learn why you never store a password as plain text and what it means to keep somebody else's data safe.",
    outputs: ["Customer sign-in", "An owner-only dashboard", "Account safety basics"],
    accent: "navy",
    glyph: "auth",
  },
  {
    id: "database",
    step: "Week 4–5",
    title: "Databases & storage",
    plain: "Somewhere for your products, orders and photos to live.",
    detail:
      "Every product, price, order and photograph has to be kept somewhere. Students design a small database with AI's help, learn what a row and a table are, and wire up file storage so their product photos load fast from anywhere.",
    outputs: ["A products and orders database", "Image storage that scales", "Their own admin screen"],
    accent: "green",
    glyph: "database",
  },
  {
    id: "payments",
    step: "Week 5–6",
    title: "Payments",
    plain: "Somebody in another state buys the thing you made.",
    detail:
      "Connecting a real payment provider, building a checkout, handling a receipt, and understanding the fee that comes off each sale. This is where the budgeting program comes back: cost of materials, price, fee, margin — with their own product as the worked example.",
    outputs: ["A working checkout", "Receipts and order records", "Unit economics they can explain"],
    accent: "sun",
    glyph: "payments",
  },
  {
    id: "mobile",
    step: "Week 6–7",
    title: "iOS and Android apps",
    plain: "The same shop, in your pocket and theirs.",
    detail:
      "Students extend the project into an app that runs on both iPhone and Android — the storefront, the account, the orders — and learn what actually differs between a website and an app, and what it takes to get one in front of people.",
    outputs: ["An app running on both platforms", "Shared design across web and mobile", "What shipping an app involves"],
    accent: "teal",
    glyph: "mobile",
  },
  {
    id: "deploy",
    step: "Week 8",
    title: "Deploy it live on Vercel",
    plain: "A link you can send to anybody in the world.",
    detail:
      "The project goes on the internet for real: deployed on Vercel, on a live URL, on a phone that is not theirs. Students learn what deploying means, how to ship a change safely, and how to read what is happening once other people are using it.",
    outputs: ["A live URL", "Shipping updates with confidence", "A finished thing to show anyone"],
    accent: "navy",
    glyph: "deploy",
  },
];

/* ---------------------------------------------------------------------------
 * The tie-in: each craft becomes a venture.
 * ------------------------------------------------------------------------ */

export type Venture = {
  category: StudioCategory;
  /** The kind of business, not a specific student's business. */
  venture: string;
  /** Example domain shown in the mocked browser frame. */
  domain: string;
  storefrontTitle: string;
  storefrontLine: string;
  sells: string[];
  /** The one feature that matters most for this kind of shop. */
  standout: string;
};

export const ventures: Venture[] = [
  {
    category: "sewing",
    venture: "A small-batch apparel and goods label",
    domain: "stitch-and-story.example",
    storefrontTitle: "Stitch & Story",
    storefrontLine: "Handmade totes, patches and mended things.",
    sells: ["Tote bags", "Patches", "Repairs & alterations"],
    standout: "A made-to-order form, because every piece is one of one.",
  },
  {
    category: "candle-making",
    venture: "A home-fragrance line",
    domain: "smallbatch-candles.example",
    storefrontTitle: "Small Batch",
    storefrontLine: "Soy candles poured by hand in Alexandria, Louisiana.",
    sells: ["Single candles", "Three-jar sets", "Refill service"],
    standout: "Subscriptions — the same customer, every month.",
  },
  {
    category: "cake-decorating",
    venture: "A custom-order bakery",
    domain: "order-a-cake.example",
    storefrontTitle: "Two Tier",
    storefrontLine: "Birthday cakes, decorated to order.",
    sells: ["Custom cakes", "Cupcake boxes", "Decorating classes"],
    standout: "A booking calendar, so two cakes are never due the same day.",
  },
  {
    category: "t-shirt-design",
    venture: "An apparel drop",
    domain: "louisiana-press.example",
    storefrontTitle: "Bolton Ave Press",
    storefrontLine: "Screen and vinyl tees, printed locally.",
    sells: ["Tees", "Hoodies", "Custom runs"],
    standout: "Size and colour options, which is the first real database lesson.",
  },
  {
    category: "film",
    venture: "A media service",
    domain: "afterthree-films.example",
    storefrontTitle: "After Three",
    storefrontLine: "Short films, event coverage and edits.",
    sells: ["Event filming", "Editing", "Portrait video"],
    standout: "A booking enquiry form and a reel that streams fast.",
  },
  {
    category: "music",
    venture: "A performing group and label",
    domain: "porch-rhythm.example",
    storefrontTitle: "Porch Rhythm",
    storefrontLine: "Original music, made after school.",
    sells: ["Tracks", "Live bookings", "Merch"],
    standout: "Audio hosting, and a tip jar that actually pays out.",
  },
];

export const ventureFor = (category: StudioCategory) =>
  ventures.find((venture) => venture.category === category);

export const craftLabel = (category: StudioCategory) =>
  studioCategories.find((c) => c.id === category)?.label ?? category;

/* ---------------------------------------------------------------------------
 * How AI is taught here. Written for the parent reading over a shoulder.
 * ------------------------------------------------------------------------ */

export const principles = [
  {
    title: "AI is a tool, not the worker",
    body: "Students direct it, review what it produces, and stay responsible for the result. A prompt is an instruction, not an outsourcing.",
  },
  {
    title: "You have to be able to read it",
    body: "Nobody ships code they do not understand. Every student learns enough HTML, CSS and JavaScript to read what the AI wrote and know when it is wrong.",
  },
  {
    title: "Say what is true",
    body: "AI makes it trivially easy to overstate. Students write their own product copy and are held to it — describe what you actually made.",
  },
  {
    title: "Other people's data is a responsibility",
    body: "Once a shop has customers, it has their names, addresses and card details. Students learn what that obligates them to do before they take a single order.",
  },
];

/* ---------------------------------------------------------------------------
 * FAQ — also feeds FAQPage structured data.
 * ------------------------------------------------------------------------ */

export const capstoneFaqs = [
  {
    question: "Does my child need to know how to code to take the AI class?",
    answer:
      "No. The AI Builder Lab starts from zero. Students learn the basics of HTML, CSS and JavaScript as they go, with AI acting as a tutor that never gets tired of the question. What they need is to have finished one of our craft programs, so they have something real to build around.",
  },
  {
    question: "What will my child actually have at the end?",
    answer:
      "A live website on the internet, an app that runs on iPhone and Android, customer sign-in, a database of their products and orders, working payments, and a link they can send to anybody. They will also be able to explain how every piece of it works.",
  },
  {
    question: "Is it safe for children to use AI this way?",
    answer:
      "Sessions are supervised, accounts are managed by Fresh Start rather than by students, and the first lesson is about judgment: AI is a tool you direct and check, not an answer machine you trust. Students are taught to read the code they ship and to describe their products honestly.",
  },
  {
    question: "Why teach children to build with AI at all?",
    answer:
      "Because the young people who can direct these tools well will have an enormous advantage over the ones who cannot, and that gap is opening now. Teaching a child to use AI properly — with judgment, and with enough underlying knowledge to check it — is one of the most practical things we can do for their future.",
  },
  {
    question: "What ages is the AI Builder Lab for?",
    answer:
      "Ages 12 to 17. The capstone asks for more reading and independence than our other workshops, so it sits at the end of the program rather than the beginning.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Low or no cost, like every Fresh Start program, and all equipment is provided. No family is turned away because of cost — call (318) 704-2808.",
  },
];

/** High-intent search terms this page is written to answer. */
export const capstoneKeywords = [
  "AI class for kids",
  "teaching kids AI",
  "AI education for youth",
  "learn to build apps with AI",
  "kids coding with AI",
  "build a website with AI for beginners",
  "no-code app building for teens",
  "teen entrepreneurship program",
  "youth coding class Alexandria Louisiana",
  "learn HTML CSS JavaScript with AI",
  "deploy a website with Vercel",
  "kids build and sell online",
  "AI summer program for teenagers",
  "after school technology program Louisiana",
];
