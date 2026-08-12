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
 */

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

export type Curriculum = {
  /** Two sentences on the shape of the course. */
  overview: string;
  /** The tangible thing they walk away holding. */
  outcome: string;
  /** e.g. "6 sessions". Drives the heading and the schema. */
  cadence: string;
  sessions: Session[];
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
