/**
 * Upcoming sessions.
 *
 * Intentionally EMPTY. Publishing invented dates would send families to a
 * building on a day nothing is happening, so the /events page renders a
 * designed empty state until real dates exist.
 *
 * TODO(Dorothy): add real sessions here and they appear on /events immediately,
 * with Event structured data attached so they can surface in Google's event
 * results. Example of the shape:
 *
 *   {
 *     slug: "fall-creative-sewing",
 *     title: "Kids Creative Sewing — Fall Session",
 *     programSlug: "kids-creative-sewing",
 *     startDate: "2026-09-08T16:00:00-05:00",
 *     endDate: "2026-09-08T17:30:00-05:00",
 *     recurrence: "Tuesdays for 6 weeks",
 *     seats: 12,
 *     cost: "Free",
 *     registrationNote: "Call to reserve a seat.",
 *   }
 */

export type SessionEvent = {
  slug: string;
  title: string;
  /** Links the session back to a program in `programs.ts`. */
  programSlug: string;
  /** ISO 8601 with timezone offset. */
  startDate: string;
  endDate: string;
  recurrence?: string;
  seats?: number;
  cost: string;
  registrationNote?: string;
};

export const upcomingSessions: SessionEvent[] = [];

/** How the after-school program is structured week to week. */
export const scheduleShape = [
  {
    label: "Weekday afternoons",
    body: "After-school workshops run in the hours right after dismissal, when students need somewhere to be.",
  },
  {
    label: "Small groups",
    body: "Class sizes stay small enough that every student gets hands-on time with the instructor and the equipment.",
  },
  {
    label: "Rolling enrollment",
    body: "Students can join between cycles rather than waiting for a semester to start.",
  },
  {
    label: "Everything provided",
    body: "Fabric, wax, film gear, ingredients — students bring nothing but themselves.",
  },
];
