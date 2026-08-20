/**
 * Fresh Start Studio — the student work gallery.
 *
 * ⚠️  PLACEHOLDER CONTENT — DO NOT LAUNCH AS-IS  ⚠️
 * ----------------------------------------------------------------------------
 * The pieces below are written to build and demonstrate the gallery. The
 * students are NOT real and none of these projects exist yet.
 *
 * Replacing them is a straight swap — keep the shape, change the values:
 *   1. Photograph the real work (see the shot list in `photoBrief` below).
 *   2. Drop the files in `public/studio/` and set `image` on each piece.
 *   3. Use the student's FIRST NAME ONLY, with a signed media release on file
 *      for every child whose name or work appears. Never a full name, never a
 *      school, never a face without written permission from a guardian.
 *   4. Delete `placeholder: true` — a dev-only banner watches that flag.
 *
 * When `image` is set the gallery renders the photograph; until then it renders
 * generated artwork keyed to the program, so the gallery looks finished rather
 * than broken while Dorothy collects the real thing.
 */

import { programs } from "./programs";

export type StudioCategory =
  | "sewing"
  | "candle-making"
  | "cake-decorating"
  | "t-shirt-design"
  | "film"
  | "music";

export type StudioPiece = {
  id: string;
  title: string;
  /** First name only. Never a surname. */
  student: string;
  age: number;
  category: StudioCategory;
  /** What they made, in their own terms — one or two sentences. */
  story: string;
  /** Short line shown on the card before the lightbox opens. */
  medium: string;
  /**
   * Card proportions in the masonry. Mixed ratios are what make the wall feel
   * like a gallery rather than a spreadsheet.
   */
  ratio: "portrait" | "square" | "landscape" | "tall";
  season: string;
  /**
   * Pins which generated composition this piece gets (0 or 1). Only worth
   * setting where the title implies one — "Rosette Practice Board" should not
   * come out as a two-tier cake. Ignored once `image` is set.
   */
  variant?: 0 | 1;
  /** TODO(assets): `/studio/<file>.jpg` once real photography exists. */
  image?: string;
  /** Required whenever `image` is set. */
  alt?: string;
  placeholder?: boolean;
};

export const studioCategories: {
  id: StudioCategory;
  label: string;
  /** Links a category back to the program that teaches it. */
  programSlug: string;
  accent: "sun" | "green" | "teal" | "navy";
  blurb: string;
}[] = [
  {
    id: "sewing",
    label: "Sewing",
    programSlug: "beginners-sewing",
    accent: "sun",
    blurb: "First stitches, first seams, first things worn out of the building.",
  },
  {
    id: "candle-making",
    label: "Candle Making",
    programSlug: "candle-making",
    accent: "green",
    blurb: "Wax, wick and fragrance — chemistry you can put on a shelf.",
  },
  {
    id: "cake-decorating",
    label: "Cake Decorating",
    programSlug: "cake-decorating",
    accent: "sun",
    blurb: "Buttercream, piping bags, and a steady hand learned the hard way.",
  },
  {
    id: "t-shirt-design",
    label: "T-Shirt Design",
    programSlug: "t-shirt-designing",
    accent: "teal",
    blurb: "An idea, a heat press, and something you can wear the same day.",
  },
  {
    id: "film",
    label: "Film & Directing",
    programSlug: "film-recording-and-directing",
    accent: "navy",
    blurb: "Framing, sound, light — stories told by the people they belong to.",
  },
  {
    id: "music",
    label: "Music",
    programSlug: "musical-workshop",
    accent: "green",
    blurb: "Rhythm, voice, and the nerve to be heard in a room.",
  },
];

export const studioPieces: StudioPiece[] = [
  {
    id: "quilted-tote",
    title: "The Everything Tote",
    student: "Aaliyah",
    age: 11,
    category: "sewing",
    medium: "Cotton canvas, machine-pieced",
    story:
      "I wanted a bag big enough for my books and my sketchpad at the same time. The handles took me three tries because I kept sewing them on inside out.",
    ratio: "portrait",
    season: "Spring session",
    placeholder: true,
  },
  {
    id: "first-pillow",
    title: "First Pillow",
    student: "Marcus",
    age: 9,
    category: "sewing",
    medium: "Hand-stitched cotton",
    story:
      "This is the first thing I ever made by myself. I picked the fabric because it looked like a basketball court.",
    ratio: "square",
    season: "Free class",
    placeholder: true,
  },
  {
    id: "patchwork-jacket",
    title: "Patchwork Jacket",
    student: "Kiara",
    age: 15,
    category: "sewing",
    medium: "Reclaimed denim, appliqué",
    story:
      "Every patch is from something somebody in my family wore out. My grandmother gave me the blue piece on the shoulder.",
    ratio: "tall",
    season: "Fall session",
    variant: 1,
    placeholder: true,
  },
  {
    id: "citrus-candles",
    title: "Sunrise Citrus, Set of Three",
    student: "Devon",
    age: 13,
    category: "candle-making",
    medium: "Soy wax, cotton wick, orange & cedar",
    story:
      "We had to test three wick sizes before one burned all the way to the edge. I priced these at eight dollars and figured out I would make two-fifty on each one.",
    ratio: "landscape",
    season: "Spring session",
    image: "/studio/studio-sunrise-citrus.jpg",
    alt: "A hand-poured soy candle labelled Sunrise Citrus, beside a halved orange.",
    placeholder: true,
  },
  {
    id: "layered-pour",
    title: "Layered Pour",
    student: "Simone",
    age: 12,
    category: "candle-making",
    medium: "Soy wax, three-stage pour",
    story:
      "You have to wait for each layer to set or the colors run together. Waiting was the hardest part.",
    ratio: "square",
    season: "Summer session",
    placeholder: true,
  },
  {
    id: "birthday-tier",
    title: "Two-Tier Birthday",
    student: "Jaylen",
    age: 14,
    category: "cake-decorating",
    medium: "Buttercream, hand-piped",
    story:
      "This was for my little sister. I did the crumb coat twice because the first one had crumbs in it, which is the whole thing you are trying to stop.",
    ratio: "portrait",
    season: "Fall session",
    variant: 0,
    image: "/studio/studio-two-tier-birthday.jpg",
    alt: "A two-tier celebration cake finished in buttercream with piped rosettes and sprinkles, on a cake stand.",
    placeholder: true,
  },
  {
    id: "rosette-practice",
    title: "Rosette Practice Board",
    student: "Trinity",
    age: 10,
    category: "cake-decorating",
    medium: "Buttercream on board",
    story:
      "Miss Dorothy said do fifty before you do one on a cake. I did about seventy.",
    ratio: "landscape",
    season: "Spring session",
    variant: 1,
    placeholder: true,
  },
  {
    id: "bloom-tee",
    title: "Bloom",
    student: "Amara",
    age: 12,
    category: "t-shirt-design",
    medium: "Heat transfer vinyl on cotton",
    story:
      "I drew it on paper first, then we cut it on the machine. I made four for my cousins and one for me.",
    ratio: "square",
    season: "Summer session",
    image: "/studio/studio-bloom.jpg",
    alt: "A white t-shirt printed with a green Bloom floral design, laid out on a cutting mat.",
    placeholder: true,
  },
  {
    id: "alexandria-tee",
    title: "Alexandria, Louisiana",
    student: "Isaiah",
    age: 16,
    category: "t-shirt-design",
    medium: "Two-color press, small run",
    story:
      "I wanted something people from here would actually wear. We priced a run of twenty and worked out what we would have to charge.",
    ratio: "tall",
    season: "Fall session",
    placeholder: true,
  },
  {
    id: "after-three",
    title: "After Three O'Clock",
    student: "Naomi",
    age: 15,
    category: "film",
    medium: "Short film, 4 min — director & editor",
    story:
      "It is about what our street looks like between school and dinner. I directed it and cut it. Getting clean sound outside was harder than any of the camera stuff.",
    ratio: "landscape",
    season: "Fall session",
    image: "/studio/studio-after-three-oclock.jpg",
    alt: "A film clapperboard marked with the production title After Three O'Clock, held up on a street at dusk.",
    placeholder: true,
  },
  {
    id: "the-shop",
    title: "The Shop",
    student: "Terrell",
    age: 17,
    category: "film",
    medium: "Documentary short — camera & lighting",
    story:
      "I interviewed my uncle in his barbershop. I lit it with two lamps and a bounce card we made out of poster board.",
    ratio: "portrait",
    season: "Summer session",
    placeholder: true,
  },
  {
    id: "hands-up-song",
    title: "Hands Up (Ensemble Piece)",
    student: "Zaria",
    age: 13,
    category: "music",
    medium: "Group performance — lead vocal",
    story:
      "Eight of us wrote it together over four weeks. I had never sung in front of anybody before this.",
    ratio: "square",
    season: "Spring session",
    placeholder: true,
  },
  {
    id: "porch-rhythm",
    title: "Porch Rhythm",
    student: "Elijah",
    age: 11,
    category: "music",
    medium: "Percussion, original arrangement",
    story:
      "We made the whole beat out of things that were already in the room. A bucket, a chair and two spoons.",
    ratio: "landscape",
    season: "Summer session",
    placeholder: true,
  },
  {
    id: "quilt-square",
    title: "Nine-Patch Square",
    student: "Camille",
    age: 10,
    category: "sewing",
    medium: "Cotton, machine-pieced",
    story:
      "Nine squares sounds easy until the corners do not line up. Mine line up now.",
    ratio: "square",
    season: "Free class",
    variant: 1,
    placeholder: true,
  },
  {
    id: "lavender-jar",
    title: "Lavender, Small Batch",
    student: "Nia",
    age: 9,
    category: "candle-making",
    medium: "Soy wax, lavender",
    story: "My mom likes lavender so that is what I picked. It burns for a long time.",
    ratio: "portrait",
    season: "Free class",
    placeholder: true,
  },
];

/** Photography brief for whoever shoots the real work. */
export const photoBrief = {
  setup:
    "Natural window light, plain warm-white or wood surface, shoot slightly above eye level.",
  specs: "3:4 / 1:1 / 4:3 mixed, 2400px long edge, JPEG quality 80.",
  rules:
    "The work is the subject. Hands in frame are welcome; faces only with a signed media release on file.",
};

export const pieceCount = studioPieces.length;

export const categoryCount = (category: StudioCategory) =>
  studioPieces.filter((piece) => piece.category === category).length;

/** The program page a category should link out to. */
export const programForCategory = (category: StudioCategory) => {
  const slug = studioCategories.find((c) => c.id === category)?.programSlug;
  return programs.find((program) => program.slug === slug);
};

export const hasPlaceholders = studioPieces.some((piece) => piece.placeholder);
