/**
 * Session-by-session curricula, one per program.
 *
 * This is the substance of the program pages, and it is written to be credible
 * to somebody who already knows the craft: real technique names, real materials,
 * real order of operations. A parent who sews should recognise the progression
 * from running stitch to seam allowance to pattern reading; a parent who bakes
 * should recognise crumb coat before final coat.
 *
 * Framing rule: always forward-looking — "you will learn", "you will leave
 * with". Never a student outcome that has not happened, never a name.
 *
 * Ages and cost are NOT repeated here. They live on the program in
 * `programs.ts` so that changing an age band is one edit in one place.
 *
 * Every program runs the same core sessions for every group it serves — the
 * craft does not change with the student's birthday. What changes is what comes
 * after: the 18+ groups continue into `advanced`, which is where the fitting,
 * the compliance, the costing and the paperwork live. That split is deliberate.
 * A fourteen-year-old does not need to know what a W-4 is; a thirty-year-old
 * retraining does, and that is the whole reason the adult groups exist.
 */

import { advancedBandIds, bandNames, type AgeBandId } from "./ageBands";

export type Session = {
  /** Short, plain, and specific — not "Week 3". */
  title: string;
  /** One line a twelve-year-old and their parent both understand. */
  plain: string;
  /** The teachable objectives. Real technique names belong here. */
  objectives: string[];
  /** The tangible thing done or made in this session. */
  make: string;
};

/**
 * The sessions that only the adult groups run, continuing straight on from the
 * core ones. Omitted where a program has no adult group at all.
 */
export type AdvancedTrack = {
  /** Which bands run these. Always the advanced bands today, but stated. */
  bands: AgeBandId[];
  /** e.g. "3 further sessions". */
  cadence: string;
  /** One or two sentences on what these sessions add and why. */
  note: string;
  /** The tangible thing the adult groups walk away with on top. */
  outcome: string;
  sessions: Session[];
};

export type Curriculum = {
  /** Two sentences on the shape of the course. */
  overview: string;
  /** The tangible thing they walk away holding. */
  outcome: string;
  /** e.g. "6 sessions". Drives the heading and the schema. */
  cadence: string;
  /** The core sessions — every group runs these, whatever their age. */
  sessions: Session[];
  advanced?: AdvancedTrack;
  /** Everything provided, so no family has to buy anything. */
  materials: string[];
  /** Omitted where a program genuinely has no hazards. */
  safety?: string[];
  /** Why the skill is worth having once the program ends. */
  skills: { skill: string; value: string }[];
};

export const curricula: Record<string, Curriculum> = {
  /* ===================================================================== */
  "kids-creative-sewing": {
    overview:
      "A first course in sewing by hand, built so that a child who has never held a needle finishes something real. Everything is hand-stitched — no machines — so the pace stays slow enough to actually learn the stitch.",
    outcome: "A finished hand-sewn pouch or small pillow, made start to finish.",
    cadence: "4 sessions",
    sessions: [
      {
        title: "Meet the needle",
        plain: "How to thread it, how to knot it, and how to make a stitch that holds.",
        objectives: [
          "Threading a needle and tying a quilter's knot",
          "Running stitch and backstitch",
          "Passing scissors and storing pins safely",
        ],
        make: "A stitched sampler card showing both stitches.",
      },
      {
        title: "Straight lines and corners",
        plain: "Measuring, marking and cutting so the pieces actually fit together.",
        objectives: [
          "Measuring with a ruler and marking with tailor's chalk",
          "Cutting fabric with fabric-only scissors",
          "Pinning two pieces with the right sides together",
        ],
        make: "Two cut and pinned panels, ready to sew.",
      },
      {
        title: "Sewing it up",
        plain: "Turning two flat pieces into something with an inside.",
        objectives: [
          "Keeping an even seam allowance",
          "Clipping corners so they turn out sharp",
          "Turning right side out and pressing",
        ],
        make: "The body of the pouch or pillow, turned and pressed.",
      },
      {
        title: "Make it yours",
        plain: "Closing it up neatly and adding the part that makes it yours.",
        objectives: [
          "Ladder stitch for an invisible closure",
          "Sewing on a button",
          "Simple appliqué or a stitched initial",
        ],
        make: "The finished piece — decorated, closed and going home that day.",
      },
    ],
    materials: [
      "Cotton fabric and felt",
      "Embroidery floss and thread",
      "Blunt-tip needles and thimbles",
      "Fabric scissors, chalk and a ruler",
      "Large-head pins and a pin tin",
      "Stuffing, buttons and trims",
    ],
    safety: [
      "Needles and pins are counted out and counted back in at the end of every session.",
      "Scissors are passed handle-first and only ever used on fabric.",
      "Instructors work with a small group so every child has an adult within arm's reach.",
    ],
    skills: [
      { skill: "Hand sewing", value: "Fixing a seam or a hem instead of throwing the garment away." },
      { skill: "Measuring and marking", value: "The same care that makes any build come out square." },
      { skill: "Finishing what you start", value: "A completed object is the point — and the habit." },
    ],
  },

  /* ===================================================================== */
  "beginners-sewing": {
    overview:
      "A structured course on the machine, from winding a bobbin to finishing a garment. Students leave able to sew a straight seam, read a simple pattern and repair their own clothes.",
    outcome:
      "A finished tote or apron they constructed from a pattern, plus the ability to hem and mend their own clothes.",
    cadence: "6 sessions",
    sessions: [
      {
        title: "The machine, demystified",
        plain: "What every part does, and how to thread it without help.",
        objectives: [
          "Winding a bobbin and threading the upper path",
          "Presser foot, feed dogs, needle position and stitch length",
          "Sewing straight and curved lines on paper, unthreaded",
        ],
        make: "A control sheet of paper drills — the fastest way to learn steering.",
      },
      {
        title: "Straight seams and tension",
        plain: "Making the stitch look the same on both sides of the fabric.",
        objectives: [
          "Diagnosing and adjusting thread tension",
          "Locking a seam with a backstitch",
          "Sewing an accurate seam allowance against the plate guide",
        ],
        make: "A seam sampler at three allowances, pressed open.",
      },
      {
        title: "Corners, curves and hems",
        plain: "The three moves that turn flat fabric into a shaped object.",
        objectives: [
          "Pivoting with the needle down",
          "Clipping and notching curves so they lie flat",
          "A double-fold hem and a clean topstitch",
        ],
        make: "A lined drawstring bag.",
      },
      {
        title: "Reading a pattern",
        plain: "Pattern paper stops being confusing once you know six symbols.",
        objectives: [
          "Grainline, notches, darts and cutting layout",
          "Laying out to save fabric",
          "Transferring markings accurately",
        ],
        make: "All the cut pieces for the main project.",
      },
      {
        title: "Construction",
        plain: "Putting the pieces together in the order that makes sense.",
        objectives: [
          "Order of construction and pressing as you go",
          "Finishing raw edges with a zigzag or French seam",
          "Attaching straps, ties and boxed corners",
        ],
        make: "The project assembled and pressed.",
      },
      {
        title: "Repair clinic",
        plain: "The session that saves your family money for the rest of your life.",
        objectives: [
          "Replacing a button and re-securing a seam",
          "Hemming trousers to length",
          "Patching a tear and using a seam ripper without damage",
        ],
        make: "The finished project — plus a repair on a garment they bring from home.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core six sessions teach you to sew. These three teach you to sew for a body that is not a mannequin, to finish work so it survives a wash cycle, and to charge somebody for it.",
      outcome:
        "A garment made from a pattern you adjusted to fit, plus your own alteration price list.",
      sessions: [
        {
          title: "Fitting a real body",
          plain:
            "Patterns are drafted for an average nobody actually is. This is how you change one to fit the person in front of you.",
          objectives: [
            "Taking and recording a full set of body measurements",
            "Choosing a size by the largest measurement, then adjusting the rest",
            "Full bust, sway back and shoulder-slope adjustments",
            "Sewing a muslin toile and marking the corrections on it",
          ],
          make: "A corrected paper pattern and the muslin it was fitted on.",
        },
        {
          title: "Finishes that survive a wash cycle",
          plain:
            "The difference between something homemade and something that lasts is almost entirely in the seam finishes.",
          objectives: [
            "French seams, flat-felled seams and bias binding",
            "Choosing and applying fusible interfacing",
            "Inserting an invisible zipper",
            "Machine buttonholes and a hand-worked bar tack",
          ],
          make: "A finishing sampler showing each seam and closure, kept for reference.",
        },
        {
          title: "Charging for alterations",
          plain:
            "Hemming, taking in and letting out — the three jobs people will actually pay you for, and what to charge for them.",
          objectives: [
            "Hemming trousers while keeping the original hem",
            "Taking in a side seam and letting out a waistband",
            "Timing a job so you can price it by the hour rather than by feel",
            "Writing a price list and quoting an honest turnaround",
          ],
          make: "Two altered garments and an alteration price list in your own handwriting.",
        },
      ],
    },
    materials: [
      "Sewing machines, universal needles and pre-wound bobbins",
      "Cotton, canvas and lining fabric",
      "Thread, pins, seam gauge and seam ripper",
      "Rotary cutters, mats and shears",
      "Iron and pressing station",
      "Printed beginner patterns",
    ],
    safety: [
      "Fingers stay behind the presser foot; the needle-down rule is taught before the machine is threaded.",
      "The iron lives at a supervised station and is never left face-down.",
      "Machines are unplugged before any needle change and at the end of every session.",
    ],
    skills: [
      { skill: "Machine operation", value: "A genuine vocational skill — alterations and tailoring start here." },
      { skill: "Pattern reading", value: "The ability to follow a technical document and produce the thing it describes." },
      { skill: "Garment repair", value: "Clothes last years longer when somebody in the house can mend them." },
    ],
  },

  /* ===================================================================== */
  "candle-making": {
    overview:
      "Equal parts chemistry and craft. Students learn why a candle burns badly before they learn to make one that burns well, then cost and price what they made.",
    outcome: "A cured, labelled set of three candles and a costed price sheet for them.",
    cadence: "5 sessions",
    sessions: [
      {
        title: "Wax and wick",
        plain: "Why the wrong wick ruins a good candle.",
        objectives: [
          "How soy, paraffin and coconut waxes differ in melt point and finish",
          "Matching wick size to vessel diameter",
          "Reading a wick chart and recording a test",
        ],
        make: "Three test tealights, each with a different wick size.",
      },
      {
        title: "Melt, measure, pour",
        plain: "Temperature is the whole craft. Everything else is tidiness.",
        objectives: [
          "Double-boiler melting and thermometer discipline",
          "Pour temperature and why it changes the surface",
          "Prepping a vessel: wick sticker, centring, warming",
        ],
        make: "A single-colour jar candle, poured clean.",
      },
      {
        title: "Fragrance and colour",
        plain: "How much scent is enough, and when to add it.",
        objectives: [
          "Fragrance load as a percentage of wax weight",
          "Adding fragrance at the right temperature so it binds",
          "Dye blocks versus liquid dye, and testing colour when cool",
        ],
        make: "A scented, coloured jar of their own blend.",
      },
      {
        title: "What went wrong",
        plain: "Frosting, sinkholes, wet spots and tunnelling — and the fix for each.",
        objectives: [
          "Diagnosing common pour faults",
          "Why cure time matters before a burn test",
          "Running and recording a proper burn test",
        ],
        make: "A written burn-test log for their own candles.",
      },
      {
        title: "Label it, price it",
        plain: "Turning three jars into something you could actually sell.",
        objectives: [
          "Required safety wording on a candle label",
          "Cost per unit: wax, wick, vessel, fragrance, label",
          "Setting a price that leaves a margin",
        ],
        make: "A finished, labelled three-jar set with a price sheet.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core five sessions get you a candle that burns well. These three get you a product: tested, labelled, costed and ready to sell to a shop.",
      outcome:
        "A burn-tested formulation with a written log, a compliant label, and a wholesale and retail price you can defend.",
      sessions: [
        {
          title: "Formulation and burn testing",
          plain:
            "Why a candle tunnels, mushrooms or throws no scent at all — and how to test your way out of it.",
          objectives: [
            "Fragrance load by weight, and how much the wax will actually hold",
            "Cure time, and why a fresh candle smells like nothing",
            "Reading a melt pool: tunnelling, hangup, sooting and mushrooming",
            "Keeping a burn log that changes one variable at a time",
          ],
          make: "A burn log covering three wick sizes in the same vessel, with a chosen winner.",
        },
        {
          title: "Batch production",
          plain:
            "Making one good candle and making sixty identical ones are different skills.",
          objectives: [
            "Scaling a recipe by weight rather than by volume",
            "Pour temperature control, and why it decides the surface",
            "Batch records and lot numbers, so a bad batch can be traced",
            "Setting up a pour line and cutting your handling time per unit",
          ],
          make: "A dozen candles poured to one record sheet, cured and inspected.",
        },
        {
          title: "Labels, costs and wholesale",
          plain:
            "What has to be on the label, what a jar actually costs you, and what happens to the price when a shop buys twelve.",
          objectives: [
            "The fire-safety warning label candles are expected to carry (ASTM F2417)",
            "Net weight and fragrance disclosure, and where they belong on the jar",
            "Cost per unit: wax, wick, vessel, fragrance, label, box — and your hour",
            "Wholesale, retail and keystone pricing, and the margin you need to survive both",
          ],
          make: "A finished label and a costing sheet carrying your wholesale and retail price.",
        },
      ],
    },
    materials: [
      "Soy wax, wicks, wick stickers and centring tools",
      "Glass vessels and tins",
      "Digital scale, thermometer and pouring pitcher",
      "Fragrance oils and candle dye",
      "Heat gun, labels and packaging",
    ],
    safety: [
      "All melting is done by an instructor on a supervised heat source; students pour under direct supervision.",
      "Melting wax is never left unattended, and water is never used on a wax fire.",
      "Burn tests are run at the workshop, on a heat-safe surface, never taken home mid-test.",
    ],
    skills: [
      { skill: "Following a process precisely", value: "Temperature, weight and timing — the discipline behind any lab or kitchen job." },
      { skill: "Diagnosing a fault", value: "Working backwards from a bad result to its cause." },
      { skill: "Unit costing", value: "The first real business lesson most students ever get." },
    ],
  },

  /* ===================================================================== */
  "financing-and-budgeting": {
    overview:
      "Practical money skills taught with real numbers and real scenarios, at an age where the habits still form easily. Students finish with a budget they wrote themselves and can defend.",
    outcome: "Their own written monthly budget and savings plan, built from a simulated income.",
    cadence: "6 sessions",
    sessions: [
      {
        title: "Where money actually goes",
        plain: "You cannot manage what you have never counted.",
        objectives: [
          "Needs versus wants, argued rather than recited",
          "Tracking a week of real spending",
          "Unit price, and why the bigger box is not always cheaper",
        ],
        make: "A one-week spending log and a first look at the pattern in it.",
      },
      {
        title: "Getting paid",
        plain: "Why the number on the offer is not the number in your account.",
        objectives: [
          "Gross versus net pay",
          "Reading a pay stub line by line",
          "Hourly versus salary, and what overtime really pays",
        ],
        make: "A marked-up sample pay stub they can explain.",
      },
      {
        title: "Building a budget",
        plain: "Give every dollar a job before the month starts.",
        objectives: [
          "Fixed versus variable expenses",
          "The 50/30/20 split and zero-based budgeting",
          "Building a monthly budget from a set income",
        ],
        make: "A complete first draft of a monthly budget.",
      },
      {
        title: "Saving toward something",
        plain: "A goal with a number and a date is a plan. Everything else is a wish.",
        objectives: [
          "Goal amount divided by timeline",
          "Why an emergency fund comes before everything fun",
          "Compound interest, demonstrated rather than described",
        ],
        make: "A savings plan with a target, a date and a monthly amount.",
      },
      {
        title: "Banks, cards and credit",
        plain: "What the bank is actually doing with your money — and charging you for.",
        objectives: [
          "Checking versus savings; debit versus credit",
          "Interest, APR and how a balance grows when unpaid",
          "Overdraft fees and how to never pay one",
        ],
        make: "A comparison of two accounts, with a reasoned choice.",
      },
      {
        title: "The month that goes wrong",
        plain: "A surprise bill arrives. Now what?",
        objectives: [
          "Adjusting a budget under pressure",
          "Deciding what gets cut and defending it",
          "Presenting a plan clearly to somebody else",
        ],
        make: "A revised budget, presented and defended to the group.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core six sessions build a budget. These three deal with the things that break one: a paycheck smaller than you expected, debt that compounds, and a month that goes wrong.",
      outcome:
        "A household budget built from your own pay stub, a debt payoff plan with an end date, and an emergency fund target.",
      sessions: [
        {
          title: "Reading your own paycheck",
          plain:
            "Gross is not what lands in the account. This is every line in between.",
          objectives: [
            "Reading a pay stub line by line: gross, FICA, federal and state withholding, deductions",
            "How a W-4 decides whether you get a refund or a bill",
            "Employer benefits: health premiums, an HSA, and a 401(k) match you should not leave on the table",
            "1099 versus W-2, and the self-employment tax nobody warns you about",
          ],
          make: "A net-pay worksheet built from a real pay stub.",
        },
        {
          title: "Debt, credit and what borrowing costs",
          plain:
            "The same loan at two interest rates is two completely different loans. Here is the arithmetic.",
          objectives: [
            "What is on a credit report, what moves a score, and how to pull yours for free",
            "APR versus interest rate, and reading an amortization schedule",
            "Revolving versus installment debt, and the minimum-payment trap",
            "Costing a payday or title loan out to its true annual rate",
            "Avalanche against snowball payoff, compared on your own numbers",
          ],
          make: "A payoff plan for a real debt, with the month it ends written on it.",
        },
        {
          title: "A household that survives a bad month",
          plain:
            "Cover, a cushion and a filed return are the three things that stop one bad month becoming a bad year.",
          objectives: [
            "Sizing an emergency fund against your own fixed costs",
            "Renters, auto and health cover: premium, deductible, and what a claim actually pays",
            "Filing a return, standard versus itemised, and the credits people miss",
            "Retirement: the employer match first, then a Roth IRA, and why starting early is the whole game",
          ],
          make: "A one-page household plan: fund target, cover in place, and a savings rate.",
        },
      ],
    },
    materials: [
      "Budget workbooks and printed templates",
      "Sample pay stubs and bank statements (fictional)",
      "Calculators",
      "Scenario cards for the simulated month",
    ],
    safety: [
      "No student is ever asked to share their family's real finances. Every figure used in class is fictional.",
    ],
    skills: [
      { skill: "Budgeting", value: "The single skill most correlated with staying out of debt as an adult." },
      { skill: "Reading financial documents", value: "Pay stubs, statements and contracts stop being intimidating." },
      { skill: "Defending a decision with numbers", value: "Useful in every job there is." },
    ],
  },

  /* ===================================================================== */
  "cake-decorating": {
    overview:
      "Kitchen discipline and cake artistry, taught in the order a professional learns them. Students bake, fill, coat and decorate a cake to a brief.",
    outcome: "A finished decorated cake and a piping practice board of their own work.",
    cadence: "6 sessions",
    sessions: [
      {
        title: "The kitchen rules",
        plain: "Everything good in a kitchen starts with a clean station.",
        objectives: [
          "Handwashing, cross-contamination and allergen awareness",
          "Setting up a station and cleaning as you go",
          "Measuring by weight instead of by cup, and why it matters",
        ],
        make: "A prepared station and a first weighed batter.",
      },
      {
        title: "Bake and level",
        plain: "A decorated cake is only as good as the cake under the frosting.",
        objectives: [
          "Testing for doneness without guessing",
          "Cooling properly so layers do not tear",
          "Levelling and torting with a serrated knife",
        ],
        make: "Two levelled, cooled cake layers ready to fill.",
      },
      {
        title: "Buttercream",
        plain: "One frosting, three consistencies, completely different jobs.",
        objectives: [
          "American versus Swiss meringue buttercream",
          "Stiff, medium and thin consistency and what each is for",
          "Colouring with gel, and rescuing a split batch",
        ],
        make: "A batch of buttercream in three working consistencies.",
      },
      {
        title: "Crumb coat and smooth finish",
        plain: "The step that separates a homemade cake from a professional one.",
        objectives: [
          "Piping a dam and filling without bulging",
          "A proper crumb coat, then chilling",
          "Bench scraper technique for sharp sides and a clean top edge",
        ],
        make: "A filled, crumb-coated and smoothly finished cake.",
      },
      {
        title: "Piping",
        plain: "Bag control first. Pretty comes after.",
        objectives: [
          "Bags, couplers and tips 1M, 2D, 104 and round",
          "Stars, shells, rosettes and a clean border",
          "Writing legibly in buttercream",
        ],
        make: "A practice board of every technique, done well enough to repeat.",
      },
      {
        title: "Decorate to a brief",
        plain: "Somebody else's cake, somebody else's colours, a real deadline.",
        objectives: [
          "Colour theory and balance on a round surface",
          "Working to a client brief instead of your own taste",
          "Timing a decoration so it is finished when it is due",
        ],
        make: "A finished cake decorated to a given brief, and presented.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core six sessions teach the decorating. These three cover what changes when a cake has to survive a car journey, feed sixty people, and be handed to somebody who paid a deposit for it.",
      outcome:
        "A stacked tiered cake, an allergen sheet for it, and a cake price you costed rather than guessed.",
      sessions: [
        {
          title: "Structure and scale",
          plain:
            "A tall cake is an engineering problem before it is a decorating one.",
          objectives: [
            "Dowelling, centre rods, boards and internal supports",
            "Stacking tiers, and chilling between stages so nothing slumps",
            "Covering in fondant against holding a sharp buttercream edge",
            "Boxing and transporting a finished cake without losing it on the drive",
          ],
          make: "A stacked two-tier cake, dowelled, covered and boxed for transport.",
        },
        {
          title: "Working like a kitchen",
          plain:
            "Temperature, allergens and cross-contact — the parts of the job an inspector cares about.",
          objectives: [
            "Time and temperature control for cream, ganache and filled cakes",
            "The major allergens, cross-contact, and how to answer a customer who asks",
            "Cleaning and sanitising to a schedule, and keeping the record that proves it",
            "What Louisiana's cottage food law lets you sell from a home kitchen, and where it stops",
          ],
          make: "An ingredient and allergen sheet for one of your own cakes.",
        },
        {
          title: "Taking orders and getting paid",
          plain:
            "Costing by the serving, taking a deposit, and never having two cakes due the same Saturday.",
          objectives: [
            "Costing a cake: ingredients, board and box, overhead, and your hours",
            "Pricing per serving and quoting from a tier chart",
            "Deposits, cancellation terms and a written order confirmation",
            "Running an order calendar backwards from the delivery date",
          ],
          make: "A costed price list and a completed order form for a real enquiry.",
        },
      ],
    },
    materials: [
      "Pans, turntables, offset spatulas and bench scrapers",
      "Stand mixers and mixing bowls",
      "Piping bags, couplers and a full tip set",
      "Gel colours and cake boards",
      "All baking ingredients",
    ],
    safety: [
      "Ovens and stand mixers are operated with an instructor present.",
      "Allergens are declared at enrollment; every session is run with that list in the room.",
      "Hair tied back, no tasting from shared tools, no bare hands on finished product.",
    ],
    skills: [
      { skill: "Food safety and station discipline", value: "The first thing any commercial kitchen tests you on." },
      { skill: "Piping and finishing", value: "A genuinely marketable skill — custom cakes sell." },
      { skill: "Working to a brief and a deadline", value: "Making what was asked for, on time, is most of professional work." },
    ],
  },

  /* ===================================================================== */
  "t-shirt-designing": {
    overview:
      "From a sketch on paper to a finished garment somebody would actually wear, then to the numbers behind a small run.",
    outcome: "At least one finished shirt of their own design, plus a costed price for a run of twenty.",
    cadence: "5 sessions",
    sessions: [
      {
        title: "Idea to sketch",
        plain: "What makes a design somebody puts on their body.",
        objectives: [
          "Thumbnail sketching to explore fast",
          "One idea per shirt, and finding the focal point",
          "Looking critically at designs that work and saying why",
        ],
        make: "A page of thumbnails and one chosen direction.",
      },
      {
        title: "Type and layout",
        plain: "Most bad shirts are bad because of the words, not the picture.",
        objectives: [
          "Legibility at conversation distance",
          "Hierarchy, spacing and letter spacing",
          "Print placement: centre chest, left chest, back",
        ],
        make: "A finished layout inside a real print area.",
      },
      {
        title: "Colour and contrast",
        plain: "The garment colour is part of the design, not the background.",
        objectives: [
          "Limiting a palette and why fewer colours print better",
          "Contrast between ink and garment",
          "Building a mockup to check before cutting anything",
        ],
        make: "A colour-locked mockup on the actual garment colour.",
      },
      {
        title: "Cut and weed",
        plain: "The machine does the cutting. The patience is yours.",
        objectives: [
          "Preparing artwork and mirroring for heat transfer vinyl",
          "Cutter settings by material and a test cut",
          "Weeding fine detail without lifting the design",
        ],
        make: "A cut and fully weeded transfer, ready to press.",
      },
      {
        title: "Press and produce",
        plain: "Heat, time and pressure — get one wrong and it peels in the wash.",
        objectives: [
          "Time, temperature and pressure by vinyl type",
          "Layering colours and applying care instructions",
          "Costing a run of twenty and setting a price",
        ],
        make: "The finished shirt and a price sheet for a small run.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core five sessions get a shirt onto a body. These three get artwork a printer will accept, a garment that survives fifty washes, and a quote for a hundred shirts that still makes money.",
      outcome:
        "A print-ready artwork file, a wash-tested sample board, and a costed quote for a hundred-shirt run.",
      sessions: [
        {
          title: "Artwork a printer will accept",
          plain:
            "Most designs are sent back before they ever reach a press. This is why.",
          objectives: [
            "Vector against raster, and why a logo should never be a JPEG",
            "Resolution at print size, and what 300 DPI actually means on a 12-inch chest print",
            "Spot colour against process, and separating a design into its colours",
            "Underbase on dark garments, trapping, and exporting a print-ready file",
          ],
          make: "One design supplied as a separated, print-ready file with a spec sheet.",
        },
        {
          title: "Garments, inks and wash testing",
          plain:
            "The same design behaves differently on cotton and on a poly blend. Find out before a customer does.",
          objectives: [
            "Cotton, polyester and tri-blend, and what each does to a print",
            "Heat transfer vinyl, DTF and screen printing compared on cost and durability",
            "Dye migration on polyester, and how to block it",
            "Running a wash test and recording what fifty cycles do to the print",
          ],
          make: "A wash-tested sample board across three garment types.",
        },
        {
          title: "Quoting a real run",
          plain:
            "A hundred shirts, six sizes, two colours, due in a fortnight. What do you charge?",
          objectives: [
            "Sourcing blanks and reading a size curve so you do not overbuy smalls",
            "Setup cost against per-unit cost, and where the break-even sits",
            "Quoting with a deposit, a lead time and a spoilage allowance",
            "Trademarks and licensing — what you cannot legally print, whoever is asking",
          ],
          make: "A written quote for a hundred-shirt order, costed line by line.",
        },
      ],
    },
    materials: [
      "Blank shirts in several colours and sizes",
      "Heat transfer vinyl and a vinyl cutter",
      "Weeding tools and a heat press",
      "Teflon sheets and heat tape",
      "Design software on workshop computers",
    ],
    safety: [
      "The heat press reaches temperatures that burn instantly; it is operated with an instructor at the student's shoulder.",
      "Cutter blades are changed by staff only.",
      "The press area is ventilated and kept clear.",
    ],
    skills: [
      { skill: "Graphic layout and typography", value: "Transfers directly to posters, social posts and any design work." },
      { skill: "Operating production equipment", value: "Cutter and press skills are hireable in any print shop." },
      { skill: "Costing a small run", value: "Understanding margin before you promise somebody a price." },
    ],
  },

  /* ===================================================================== */
  "musical-workshop": {
    overview:
      "Group music-making that starts with pulse and ends with a performance. No prior training and no instrument of your own required.",
    outcome: "A group piece they helped arrange, rehearsed and performed in front of an audience.",
    cadence: "6 sessions",
    sessions: [
      {
        title: "Pulse and time",
        plain: "Before anything else: everybody together on the beat.",
        objectives: [
          "Holding a steady pulse and clapping subdivisions",
          "Counting in 4/4 and finding beat one",
          "Call-and-response as a group",
        ],
        make: "A group groove the whole room can hold without a click.",
      },
      {
        title: "Ear and voice",
        plain: "Matching a pitch is a skill, not a talent you are born with.",
        objectives: [
          "Warm-ups and breath support",
          "Matching pitch and singing in unison",
          "A first simple two-part harmony",
        ],
        make: "A short passage sung in two parts.",
      },
      {
        title: "The rhythm section",
        plain: "Playing your one part and holding it while everything else moves.",
        objectives: [
          "Hand percussion technique and found-object percussion",
          "Locking to the groove instead of rushing",
          "Listening across the room while you play",
        ],
        make: "A layered percussion arrangement built from parts.",
      },
      {
        title: "Melody and words",
        plain: "Where a song comes from when nobody hands you one.",
        objectives: [
          "Verse and chorus, and what a hook does",
          "Writing a lyric line that scans",
          "Shaping a melody that a group can sing",
        ],
        make: "An original verse and chorus written together.",
      },
      {
        title: "Arranging",
        plain: "Deciding who plays when — the difference between noise and a piece.",
        objectives: [
          "Intro, build, breakdown and ending",
          "Dynamics, and the power of getting quieter",
          "Counting the group in and cueing a change",
        ],
        make: "A written arrangement chart for the full piece.",
      },
      {
        title: "Performance",
        plain: "Standing up in front of people and being heard.",
        objectives: [
          "Microphone technique and stage positioning",
          "Handling nerves and recovering from a mistake mid-piece",
          "Performing the piece start to finish",
        ],
        make: "The finished performance, recorded for the group to keep.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core six sessions get a group performing together. These three cover leading the rehearsal, capturing a recording that holds up, and the practical business of being paid to play.",
      outcome:
        "An arrangement you wrote and led, a mixed recording of it, and a stage plot and rate sheet you could send to a venue tomorrow.",
      sessions: [
        {
          title: "Arranging and leading a rehearsal",
          plain:
            "Being the person who decides what everybody plays, and getting a room to follow you.",
          objectives: [
            "Chord charts and the Nashville number system, so a chart transposes on the spot",
            "Arranging for a small ensemble: voicing, register, and who takes the melody",
            "Structuring ninety minutes of rehearsal so that it changes something",
            "Counting in, cueing, and calling a stop without killing the room",
          ],
          make: "A written chart of your own arrangement, rehearsed with the group.",
        },
        {
          title: "Recording it properly",
          plain:
            "A good performance recorded badly is a bad recording. Placement, gain and headroom.",
          objectives: [
            "Microphone types and placement for voice, acoustic instrument and amp",
            "Gain staging and headroom — why you never record hard against zero",
            "Tracking to a DAW, playing to a click, and comping the best takes together",
            "A rough mix: levels, panning, EQ and a little compression",
          ],
          make: "A mixed rough of one song, bounced and checked on two different systems.",
        },
        {
          title: "Playing for pay",
          plain:
            "Set lists, load-in, what to charge, and how the money gets split without ending the band.",
          objectives: [
            "Building a set to a running time, with a stage plot and an input list",
            "Load-in, line check, and behaving like somebody a venue rebooks",
            "Quoting a rate, taking a deposit, and what a venue owes you if it cancels",
            "Splitting money in writing, and what a performing rights organisation and a distributor each do with a released song",
          ],
          make: "A stage plot, an input list and a rate sheet ready to send.",
        },
      ],
    },
    materials: [
      "Keyboard and hand percussion",
      "Microphones, stands and a PA",
      "Music stands and printed charts",
      "A recorder for rehearsals and the final performance",
    ],
    safety: [
      "Monitor and PA levels are capped to protect hearing.",
      "Cables are taped down and gear is moved by staff.",
    ],
    skills: [
      { skill: "Ensemble playing", value: "Doing your part reliably while other people do theirs." },
      { skill: "Performing under pressure", value: "Changes how a young person carries themselves everywhere else." },
      { skill: "Arranging and structure", value: "Composition, and the habit of shaping something for an audience." },
    ],
  },

  /* ===================================================================== */
  "film-recording-and-directing": {
    overview:
      "A full production course: story, camera, sound, light, directing and edit. Students rotate through every role and finish an actual short film.",
    outcome: "A finished short film they wrote, shot, directed and cut as a crew.",
    cadence: "7 sessions",
    sessions: [
      {
        title: "The story first",
        plain: "Gear cannot save a film that has nothing to say.",
        objectives: [
          "A premise in one sentence",
          "Beginning, middle and end — and what changes",
          "Storyboarding a scene in simple frames",
        ],
        make: "A one-page premise and a storyboard for the opening scene.",
      },
      {
        title: "Camera and framing",
        plain: "Where you put the camera is a decision about what matters.",
        objectives: [
          "Shot sizes: wide, medium, close, and when each is right",
          "Rule of thirds, headroom and lead room",
          "The 180-degree rule and why crossing it confuses an audience",
        ],
        make: "A shot-size exercise: the same moment told five ways.",
      },
      {
        title: "Exposure and focus",
        plain: "The three settings that decide whether the shot is usable.",
        objectives: [
          "Aperture, shutter and ISO in plain language",
          "Pulling focus and holding it on a moving subject",
          "White balance and matching shots to each other",
        ],
        make: "A correctly exposed, sharp shot repeated under three lighting conditions.",
      },
      {
        title: "Sound",
        plain: "Audiences forgive a soft picture. They switch off bad audio.",
        objectives: [
          "Why on-camera sound fails and what to use instead",
          "Boom placement and lavalier mic technique",
          "Monitoring on headphones and recording room tone",
        ],
        make: "A clean dialogue recording with room tone captured.",
      },
      {
        title: "Lighting",
        plain: "Light shapes a face. You can do a lot with one source.",
        objectives: [
          "Key, fill and back light",
          "Softbox versus bounce, and shaping window light",
          "Matching light between shots so a scene cuts together",
        ],
        make: "A lit interview setup built from scratch.",
      },
      {
        title: "Directing",
        plain: "Getting a performance, and getting the coverage you need.",
        objectives: [
          "Blocking a scene and working to a shot list",
          "Talking to actors with clarity and kindness",
          "Coverage: making sure the edit has options",
        ],
        make: "The scene shot, with full coverage, on schedule.",
      },
      {
        title: "Edit and finish",
        plain: "The film is made twice — once on set, once in the edit.",
        objectives: [
          "Assembly, then cutting on action",
          "J and L cuts, and pacing a scene",
          "Music, levels and exporting a deliverable",
        ],
        make: "The finished short, exported and screened for the group.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further sessions",
      note:
        "The core seven sessions make a short film. These three cover the paperwork that stops a shoot falling apart, full manual control of camera and sound, and delivering work somebody is paying for.",
      outcome:
        "A scene shot with signed releases and call sheets behind it, graded and delivered to a client's spec.",
      sessions: [
        {
          title: "Pre-production that saves the shoot",
          plain:
            "Almost everything that goes wrong on a shoot day was decided a week earlier.",
          objectives: [
            "Breaking a script down into a shot list and a shooting schedule",
            "Scouting a location for light, sound, power and access",
            "Call sheets: who is where, at what time, bringing what",
            "Appearance and location releases, and when a permit or insurance is required",
          ],
          make: "A full shoot package: shot list, schedule, call sheet and releases.",
        },
        {
          title: "Manual control: exposure, sound and colour",
          plain:
            "Off the automatic settings. You decide the exposure, and you can hear exactly what you are recording.",
          objectives: [
            "ISO, shutter and aperture as one exposure triangle, plus ND filters",
            "Reading a waveform and false colour instead of trusting the screen",
            "Shooting log, and why the footage looks grey until it is graded",
            "Boom against lav, monitoring your levels, and recording clean room tone",
            "A grade in three passes: balance, contrast, then look",
          ],
          make: "A correctly exposed, properly monitored and graded test scene.",
        },
        {
          title: "Delivering paid work",
          plain:
            "A client is not an audience. They have a brief, a deadline and an opinion.",
          objectives: [
            "Taking a brief and writing it back as a scope they sign off on",
            "Day rates, deposits, and how many revision rounds are included",
            "Deliverable specs: resolution, codec, aspect ratios, and captions for social",
            "Backing up on the day — two copies before a card is ever formatted",
          ],
          make: "A finished deliverable package, plus the quote and scope that would have preceded it.",
        },
      ],
    },
    materials: [
      "Cinema camera, lenses and tripod",
      "Boom pole, shotgun and lavalier microphones",
      "Headphones and an audio recorder",
      "LED panels, softbox and bounce boards",
      "Editing workstations and software",
    ],
    safety: [
      "Lights get hot and stands get top-heavy; rigging is done with staff.",
      "Cable runs are taped and walkways kept clear on every shoot.",
      "Nobody is filmed without permission, and no footage of a minor leaves the workshop without a signed release.",
    ],
    skills: [
      { skill: "Camera, sound and lighting", value: "Directly employable on any local production, event or wedding crew." },
      { skill: "Directing and communication", value: "Getting a group of people to deliver something together, on time." },
      { skill: "Editing", value: "The most in-demand freelance skill in media right now." },
    ],
  },

  /* ===================================================================== */
  "ai-builder-lab": {
    overview:
      "The capstone. Students take something they already made by hand and use AI to build the real business around it — then ship it to the internet.",
    outcome:
      "A live website, apps for iPhone and Android, sign-in, a database, working payments, and a URL they can send to anybody.",
    cadence: "7 modules over 8 weeks",
    sessions: [
      {
        title: "Build the website",
        plain: "Your work gets an address on the internet.",
        objectives: [
          "Describing what you want precisely enough to get it",
          "Reading what the AI produced and saying what is wrong with it",
          "Product photography and writing your own copy",
        ],
        make: "A real multi-page website for your own product.",
      },
      {
        title: "HTML, CSS & JavaScript — with AI as the tutor",
        plain: "Understand what the code is actually doing.",
        objectives: [
          "What HTML, CSS and JavaScript each do",
          "Editing code by hand, breaking it and fixing it",
          "Recognising when the AI is confidently wrong",
        ],
        make: "A change to your own site made without asking the AI.",
      },
      {
        title: "Authentication",
        plain: "Customers get accounts. Only you get the keys.",
        objectives: [
          "Sign-up, sign-in and password reset flows",
          "Customer accounts versus an owner account",
          "Why a password is never stored as plain text",
        ],
        make: "Working sign-in and an owner-only dashboard.",
      },
      {
        title: "Databases & storage",
        plain: "Somewhere for your products, orders and photos to live.",
        objectives: [
          "Tables, rows and how a database is shaped",
          "Wiring up file storage for product images",
          "Reading and writing real data from the site",
        ],
        make: "A products and orders database with an admin screen.",
      },
      {
        title: "Payments",
        plain: "Somebody in another state buys the thing you made.",
        objectives: [
          "Connecting a payment provider and building a checkout",
          "Receipts and order records",
          "Cost, price, fee and margin — with your own product as the example",
        ],
        make: "A working checkout you can explain the economics of.",
      },
      {
        title: "iOS and Android apps",
        plain: "The same shop, in your pocket and theirs.",
        objectives: [
          "What actually differs between a website and an app",
          "Sharing a design across web and mobile",
          "What it takes to get an app in front of people",
        ],
        make: "The storefront running as an app on both platforms.",
      },
      {
        title: "Deploy it live on Vercel",
        plain: "A link you can send to anybody in the world.",
        objectives: [
          "What deploying means and what happens when you do it",
          "Shipping a change safely once people are using it",
          "Reading what is happening on a live site",
        ],
        make: "The finished project, live on a real URL.",
      },
    ],
    advanced: {
      bands: advancedBandIds,
      cadence: "3 further modules",
      note:
        "The core seven modules get the product live. These three are the difference between a live site and a business: registering it, getting found, and still running it in six months.",
      outcome:
        "A registered business with a bank account, a search and analytics setup that brings people in, and a written runbook for keeping it alive.",
      sessions: [
        {
          title: "Registering the business",
          plain:
            "The paperwork behind the checkout — what has to be true before you take somebody's money.",
          objectives: [
            "Sole proprietor against an LLC in Louisiana, and what registering actually involves",
            "Getting an EIN and opening a business bank account",
            "Sales tax: when you owe it, and letting the processor collect it for you",
            "Bookkeeping from day one, and what your payment processor will ask you to prove",
          ],
          make: "A registration checklist worked all the way through for your own venture.",
        },
        {
          title: "Getting found and getting paid",
          plain:
            "A shop nobody can find is a hobby. Search, analytics, and the arithmetic behind paid ads.",
          objectives: [
            "On-page SEO, structured data, and a Google Business Profile that matches your site",
            "Installing analytics and reading it without fooling yourself",
            "An email list, and why it is the only audience you actually own",
            "Customer acquisition cost against gross margin — the number that decides whether an ad is worth running",
            "Refunds, chargebacks and disputes, handled before the first one arrives",
          ],
          make: "A live analytics dashboard and a one-page acquisition plan with real numbers in it.",
        },
        {
          title: "Running it after launch",
          plain:
            "Launch is the easy day. This module is about month six.",
          objectives: [
            "Monitoring and error tracking, so you know the site is down before a customer tells you",
            "Backups, and a restore you have actually tested",
            "What your own stack costs per month, and what to cut first when it grows",
            "Privacy: what data you hold, how long you keep it, and what your policy has to say",
            "When a job is worth paying somebody else to do",
          ],
          make: "A runbook for your own product: what to check, how often, and what it costs to run.",
        },
      ],
    },
    materials: [
      "Workstations with the AI tools and editors set up",
      "Accounts managed by Fresh Start, not by students",
      "Hosting and deployment covered by the program",
      "Camera and lighting for product photography",
    ],
    safety: [
      "Sessions are supervised and all tool accounts are managed by Fresh Start rather than by students.",
      "Students are taught to check what AI produces and to describe their products honestly.",
      "Once a shop has customers it holds their data — what that obligates you to do is taught before any order is taken.",
    ],
    skills: [
      { skill: "Directing AI with judgment", value: "The gap between people who can do this well and people who cannot is opening now." },
      { skill: "Reading and debugging code", value: "You cannot ship what you cannot read." },
      { skill: "Shipping something real", value: "A live product with your name on it is worth more than any certificate." },
    ],
  },
};

export const curriculumFor = (slug: string): Curriculum | undefined =>
  curricula[slug];

/**
 * Core plus advanced, in the order they are taught.
 *
 * The schema should describe the whole syllabus rather than only the part a
 * child would sit through — a search result for the adult course that stopped
 * at session six would be understating what is on offer.
 */
export const allSessions = (curriculum: Curriculum): Session[] => [
  ...curriculum.sessions,
  ...(curriculum.advanced?.sessions ?? []),
];

/** e.g. "Young Adults and Adults only" — the gate on the advanced block. */
export const advancedAudience = (track: AdvancedTrack) =>
  `${bandNames(track.bands)} only`;
