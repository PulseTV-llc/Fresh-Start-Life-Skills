/**
 * The Business Seminar — financial and business literacy, taught as a standalone
 * series rather than one of the numbered workshops.
 *
 * Deliberately kept out of `programs.ts`. Everything in that array gets a detail
 * page, a sitemap entry and a Course JSON-LD block generated from a
 * session-by-session curriculum; the seminar has no curriculum written yet and
 * would publish a thin, broken-looking page if it were listed there. It renders
 * as one section on /programs instead, next to the workshops it complements.
 *
 * Related but separate: the `financing-and-budgeting` workshop covers personal
 * money skills for every age group. The seminar carries that into the ground
 * adults ask about most — business taxes, and registering a business.
 */

export type SeminarSubject = {
  title: string;
  /** One line, in plain language: what a student walks out able to do. */
  description: string;
};

export const seminarSubjects: SeminarSubject[] = [
  {
    title: "Budgeting",
    description:
      "Tracking income and splitting expenses into needs, wants, and savings.",
  },
  {
    title: "Credit and Debt",
    description:
      "Learning how credit scores work and how to safely manage loans.",
  },
  {
    title: "Investing",
    description:
      "Understanding the basics of compound growth, stocks, and retirement accounts.",
  },
  {
    title: "Taxes and Banking",
    description:
      "Knowing how to use checking accounts and file yearly taxes.",
  },
  {
    title: "Individual & Business Taxes",
    description:
      "Knowing how to file business taxes correctly along with your personal taxes.",
  },
  {
    title: "New Business Setup & Registration",
    description:
      "Understanding the process of creating and registering a new business.",
  },
];

export type SeminarInstructor = {
  name: string;
  role: string;
  bio?: string;
  /** Path under `public/`, e.g. `/team/her-name.jpg`. */
  photo?: string;
};

/**
 * Who teaches the seminar.
 *
 * `null` until her details arrive. The section renders a short
 * "Instructor to be announced" note in place of the card while this is null,
 * so no invented name, biography or face is ever published.
 *
 * To publish her, replace `null` with the object below — same shape as a board
 * seat in `site.ts` — and the card renders itself:
 *
 *   export const seminarInstructor: SeminarInstructor | null = {
 *     name: "Her Name",
 *     role: "Finance & Business Instructor",
 *     bio: "Two or three sentences on her background and what students leave able to do.",
 *     photo: "/team/her-name.jpg",
 *   };
 *
 * `photo` is optional: drop a square JPEG (~1000px, quality 75) in
 * `public/team/` and point at it, or leave it off and the card falls back to a
 * sun-100 initials avatar, matching the unfilled board seats.
 */
export const seminarInstructor: SeminarInstructor | null = null;
