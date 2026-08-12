/**
 * ⚠️  PLACEHOLDER CONTENT — DO NOT LAUNCH AS-IS  ⚠️
 * ----------------------------------------------------------------------------
 * These quotes are written to demonstrate the layout and typography of the
 * Voices section. They are NOT real testimonials and no real person said them.
 *
 * Before launch, Dorothy should collect real quotes from parents, students and
 * partners, with a signed media release for each, and replace this array
 * wholesale. Keep the same shape and the section will render unchanged.
 *
 * The `placeholder: true` flag drives a visible dev-mode ribbon so nobody
 * accidentally ships fictional quotes to production.
 */

export type Story = {
  quote: string;
  attribution: string;
  role: string;
  /** Accent used for the quote mark and card wash. */
  accent: "sun" | "green" | "teal";
  placeholder?: boolean;
  /** TODO(assets): portrait photo, 400×400, with a signed release on file. */
  photo?: string;
};

export const stories: Story[] = [
  {
    quote:
      "She came home the first week with a pillow she sewed herself and she has not stopped making things since. It changed how she sees what she is capable of.",
    attribution: "Parent",
    role: "Alexandria, LA",
    accent: "sun",
    placeholder: true,
  },
  {
    quote:
      "I did not know how to save money before. Now I write down what I spend and I have a goal I am working toward.",
    attribution: "Student, age 14",
    role: "After-School Program",
    accent: "teal",
    placeholder: true,
  },
  {
    quote:
      "What Fresh Start does is give young people a place to be after three o'clock where somebody expects something good of them.",
    attribution: "Community partner",
    role: "Central Louisiana",
    accent: "green",
    placeholder: true,
  },
];

/** Simple pull-quote used in the mission section. */
export const founderQuote = {
  quote:
    "Every child has something in them worth bringing out. We just give them the tools, the time and somebody who believes they can.",
  attribution: "Dorothy Jackson",
  role: "Founder, Fresh Start Life Skills Inc.",
  placeholder: true,
};
