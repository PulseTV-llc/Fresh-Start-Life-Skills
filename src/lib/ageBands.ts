/**
 * Age bands.
 *
 * Fresh Start is open to individuals of all ages, but a room of ten-year-olds
 * and a room of thirty-year-olds are not the same room. Every program declares
 * which bands it serves; each band meets as its own group, and the two adult
 * bands additionally run the advanced sessions in `curriculum.ts`.
 *
 * This is the single source of truth for anything age-shaped: the label on a
 * card, the `typicalAgeRange` in the Course schema, the options in the contact
 * questionnaire. Changing a band here changes it everywhere.
 */

export type AgeBandId = "kids" | "teens" | "young-adults" | "adults";

export type AgeBand = {
  id: AgeBandId;
  /** What we call the group. */
  label: string;
  /** Bare range, e.g. "8–12" or "25+". */
  range: string;
  /** Inclusive lower bound. */
  from: number;
  /** Inclusive upper bound, or null where the band is open-ended. */
  to: number | null;
  /** Whether this band runs the advanced sessions. */
  advanced: boolean;
  /** One line on who the group is for. */
  blurb: string;
  /** How the group's sessions differ. Never invents a clock time. */
  sessions: string;
};

export const ageBands: AgeBand[] = [
  {
    id: "kids",
    label: "Kids",
    range: "8–12",
    from: 8,
    to: 12,
    advanced: false,
    blurb:
      "A first real go at making something. Short sessions, small groups, and an adult within arm's reach the whole time.",
    sessions:
      "Weekday after-school sessions, kept small enough for one-on-one attention.",
  },
  {
    id: "teens",
    label: "Teens",
    range: "13–17",
    from: 13,
    to: 17,
    advanced: false,
    blurb:
      "The craft taught properly, with the machines, the tools and the responsibility that come with them — plus the first business lessons.",
    sessions:
      "Weekday after-school sessions, separate from the younger group so the pace can pick up.",
  },
  {
    id: "young-adults",
    label: "Young Adults",
    range: "18–24",
    from: 18,
    to: 24,
    advanced: true,
    blurb:
      "For the years right after school. The craft plus the paperwork, pricing and portfolio that turn a skill into income.",
    sessions:
      "Evening and weekend sessions, separate from the youth groups, including the advanced material.",
  },
  {
    id: "adults",
    label: "Adults",
    range: "25+",
    from: 25,
    to: null,
    advanced: true,
    blurb:
      "For a career change, a side business, or a skill you always meant to learn. Taught at an adult pace, with the business end included.",
    sessions:
      "Evening and weekend sessions, separate from the youth groups, including the advanced material.",
  },
];

export const bandById = (id: AgeBandId) =>
  ageBands.find((band) => band.id === id);

/** The bands that run the advanced sessions. */
export const advancedBands = ageBands.filter((band) => band.advanced);

export const advancedBandIds = advancedBands.map((band) => band.id);

/** Preserves the order declared above, whatever order a program lists. */
export const bandsFor = (ids: AgeBandId[]) =>
  ageBands.filter((band) => ids.includes(band.id));

const lowest = (ids: AgeBandId[]) =>
  Math.min(...bandsFor(ids).map((band) => band.from));

/** null when any of the bands is open-ended. */
const highest = (ids: AgeBandId[]) => {
  const bands = bandsFor(ids);
  return bands.some((band) => band.to === null)
    ? null
    : Math.max(...bands.map((band) => band.to as number));
};

/**
 * The bare range across a set of bands — "8–12", "13 & up", "8 & up".
 *
 * Bands are contiguous by construction, so the span between the lowest floor
 * and the highest ceiling is the honest summary and stays readable on a card.
 */
export function ageRange(ids: AgeBandId[]): string {
  const from = lowest(ids);
  const to = highest(ids);
  return to === null ? `${from} & up` : `${from}–${to}`;
}

/** The same, prefixed — "Ages 8 & up". */
export const ageLabel = (ids: AgeBandId[]) => `Ages ${ageRange(ids)}`;

/**
 * schema.org `typicalAgeRange`, which wants hyphens and an open upper bound
 * written as a trailing hyphen ("18-"), not the typographic dash we display.
 */
export function typicalAgeRange(ids: AgeBandId[]): string {
  const from = lowest(ids);
  const to = highest(ids);
  return to === null ? `${from}-` : `${from}-${to}`;
}

/** Does this program run the advanced sessions for anyone? */
export const servesAdults = (ids: AgeBandId[]) =>
  bandsFor(ids).some((band) => band.advanced);

/** e.g. "Young Adults and Adults" — for prose, not chips. */
export function bandNames(ids: AgeBandId[]): string {
  const labels = bandsFor(ids).map((band) => band.label);
  if (labels.length <= 1) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}
