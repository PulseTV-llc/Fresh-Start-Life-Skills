/**
 * The contact questionnaire, as data.
 *
 * The whole flow — including every branch — is derived by `buildSteps(answers)`.
 * Keeping it declarative means the component never hard-codes "if intent is
 * volunteer, skip two steps": it just re-derives the list whenever an answer
 * changes, which also makes the progress indicator honest (it always reflects
 * the path this person is actually on, not a fixed maximum).
 */

import { ageBands } from "./ageBands";
import { programs, capstoneProgram, programAges } from "./programs";

export type Answers = Record<string, string>;

export type Option = {
  value: string;
  label: string;
  description?: string;
  /** Key into the glyph set in ChoiceField. */
  icon?: "enroll" | "volunteer" | "donate" | "partner" | "hello";
};

export type Step =
  | {
      kind: "choice";
      id: string;
      question: string;
      help?: string;
      options: Option[];
      /** Renders as a compact two-column list rather than large cards. */
      compact?: boolean;
    }
  | {
      kind: "text" | "email" | "tel";
      id: string;
      question: string;
      help?: string;
      placeholder: string;
      optional?: boolean;
      autoComplete?: string;
    }
  | {
      kind: "textarea";
      id: string;
      question: string;
      help?: string;
      placeholder: string;
      optional?: boolean;
    }
  | { kind: "review"; id: "review"; question: string; help?: string };

export const INTENTS: Option[] = [
  {
    value: "enroll",
    label: "Enroll a child",
    description: "Find the right workshop and get on the list",
    icon: "enroll",
  },
  {
    value: "volunteer",
    label: "Volunteer or mentor",
    description: "Teach a skill, or just show up consistently",
    icon: "volunteer",
  },
  {
    value: "donate",
    label: "Donate or sponsor",
    description: "Fund materials, gear or a whole workshop",
    icon: "donate",
  },
  {
    value: "partner",
    label: "Partner with us",
    description: "Schools, churches, employers, civic groups",
    icon: "partner",
  },
  {
    value: "hello",
    label: "Just saying hello",
    description: "A question, an idea, or something else",
    icon: "hello",
  },
];

const programOptions: Option[] = [
  ...programs.map((program) => ({
    value: program.slug,
    label: program.title,
    description: `${programAges(program)} · ${program.cost}`,
  })),
  {
    value: capstoneProgram.slug,
    label: `${capstoneProgram.title} (the capstone)`,
    description: `${programAges(capstoneProgram)} · build & launch with AI`,
  },
  {
    value: "unsure",
    label: "Not sure yet — help me choose",
    description: "Tell us a little about the student and we will suggest one",
  },
];

/**
 * The four groups, plus an escape hatch. Derived from `ageBands` so the
 * questionnaire can never offer a group the programs do not actually run.
 *
 * Deliberately phrased for whoever is filling the form — an adult enrolling
 * themselves and a parent enrolling a child both answer this one question.
 */
const ageOptions: Option[] = [
  ...ageBands.map((band) => ({
    value: band.id,
    label: `${band.label} · ${band.range}`,
  })),
  { value: "other", label: "Another age" },
];

const helpOptions: Option[] = [
  { value: "teach", label: "Teach or co-lead a workshop" },
  { value: "assist", label: "Help in the room" },
  { value: "shop", label: "Shop, studio and supplies" },
  { value: "behind", label: "Grants, books, photos, social" },
  { value: "unsure", label: "Not sure — put me where I am useful" },
];

const supportOptions: Option[] = [
  { value: "one-time", label: "A one-time gift" },
  { value: "monthly", label: "A monthly gift" },
  { value: "materials", label: "Materials or equipment" },
  { value: "sponsor", label: "Sponsor a whole workshop" },
];

/** Steps shared by every branch, after the branch-specific questions. */
const tail: Step[] = [
  {
    kind: "text",
    id: "name",
    question: "And your name?",
    placeholder: "Jane Doe",
    autoComplete: "name",
  },
  {
    kind: "email",
    id: "email",
    question: "Where can we reach you?",
    help: "We will only use this to reply. No lists, ever.",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    kind: "tel",
    id: "phone",
    question: "A phone number, if you'd rather we call.",
    help: "Optional — skip it if you prefer email.",
    placeholder: "(318) 000-0000",
    optional: true,
    autoComplete: "tel",
  },
  {
    kind: "textarea",
    id: "message",
    question: "Anything else we should know?",
    help: "Optional. Whatever helps us give you a useful answer.",
    placeholder: "Tell us a little more…",
    optional: true,
  },
  {
    kind: "review",
    id: "review",
    question: "Look right?",
    help: "Change anything before it comes to us.",
  },
];

const intentStep: Step = {
  kind: "choice",
  id: "intent",
  question: "How can we help?",
  help: "Pick the one that fits best — we will take it from there.",
  options: INTENTS,
};

/**
 * The ordered steps for a given set of answers.
 *
 * Branch questions are deliberately shallow — at most two before the flow
 * rejoins the shared tail. A questionnaire that keeps going stops getting
 * finished.
 */
export function buildSteps(answers: Answers): Step[] {
  const branch: Step[] = [];

  switch (answers.intent) {
    case "enroll":
      branch.push(
        {
          kind: "choice",
          id: "program",
          question: "Which program are you curious about?",
          help: "You can change your mind later — this just helps us prepare.",
          options: programOptions,
          compact: true,
        },
        {
          kind: "choice",
          id: "ageGroup",
          question: "Which group would the student be in?",
          help: "Yours or your child's — every group meets separately, and the 18+ groups run the advanced sessions.",
          options: ageOptions,
          compact: true,
        },
      );
      break;

    case "volunteer":
      branch.push({
        kind: "choice",
        id: "helpWith",
        question: "What would you love to help with?",
        help: "Every one of these is genuinely needed.",
        options: helpOptions,
        compact: true,
      });
      break;

    case "donate":
      branch.push({
        kind: "choice",
        id: "support",
        question: "What kind of support did you have in mind?",
        options: supportOptions,
        compact: true,
      });
      break;

    case "partner":
      branch.push({
        kind: "text",
        id: "organization",
        question: "Who are you with?",
        help: "The school, church, business or group you represent.",
        placeholder: "Organization name",
        autoComplete: "organization",
      });
      break;

    default:
      break;
  }

  return [intentStep, ...branch, ...tail];
}

/* ---------------------------------------------------------------------------
 * Labels — used by the review step, the success screen and the email.
 * ------------------------------------------------------------------------ */

const allOptions = [
  ...INTENTS,
  ...programOptions,
  ...ageOptions,
  ...helpOptions,
  ...supportOptions,
];

export function labelFor(value: string): string {
  return allOptions.find((option) => option.value === value)?.label ?? value;
}

export const FIELD_LABELS: Record<string, string> = {
  intent: "Reason for reaching out",
  program: "Program of interest",
  ageGroup: "Age group",
  helpWith: "Would like to help with",
  support: "Kind of support",
  organization: "Organization",
  name: "Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
};

/** Longest possible path, used only for reassuring copy on the first screen. */
export const MAX_STEPS = 7;

/* ---------------------------------------------------------------------------
 * Validation — shared by the client (instant feedback) and the API route
 * (the part that actually matters).
 * ------------------------------------------------------------------------ */

// Deliberately permissive: the goal is to catch typos, not to adjudicate RFC
// 5322. Anything stricter rejects real addresses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateStep(step: Step, value: string): string | null {
  const trimmed = (value ?? "").trim();

  if (step.kind === "review") return null;
  if (step.kind !== "choice" && step.optional && !trimmed) return null;

  if (!trimmed) {
    if (step.kind === "choice") return "Pick one to continue.";
    return "This one we do need.";
  }

  if (step.kind === "email" && !EMAIL.test(trimmed)) {
    return "That email does not look quite right.";
  }

  if (step.kind === "tel") {
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length < 7) return "That phone number looks too short.";
  }

  if (step.kind === "text" && trimmed.length < 2) {
    return "A little more than that.";
  }

  return null;
}

export function isEmail(value: string) {
  return EMAIL.test(value.trim());
}
