"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { ChoiceField, TextField, TextAreaField } from "./QuestionFields";
import {
  buildSteps,
  validateStep,
  labelFor,
  FIELD_LABELS,
  type Answers,
} from "@/lib/contactFlow";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "asking" | "sending" | "done";

/**
 * The contact questionnaire: one question per screen.
 *
 * Three things drive the design:
 *
 *  • The step list is *derived* from the answers, so branching needs no special
 *    cases here and the progress bar always reflects the real remaining path.
 *  • Keyboard first. Enter advances, number keys pick options, Escape goes back,
 *    and focus is moved to the field on every step change — a questionnaire you
 *    have to reach for the mouse to complete is a slower questionnaire.
 *  • Every step change is announced to screen readers through a live region,
 *    because visually the change is obvious and aurally it is silent.
 */
export function ContactQuestionnaire() {
  const reduceMotion = useBrandMotion();
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("asking");
  const [delivered, setDelivered] = useState(true);
  // Honeypot. A person never sees this, so anything in it is a bot.
  const [company, setCompany] = useState("");

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = step.kind === "review";
  const progress = steps.length > 1 ? index / (steps.length - 1) : 0;

  const choiceRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  // Focus lives in the field components: with AnimatePresence mode="wait" the
  // incoming panel is not mounted when a parent effect keyed on the index runs,
  // so focusing from here lands on <body> and every shortcut dies silently.
  //
  // The review step is the exception — it has no field to take focus — so the
  // submit button claims it, and Enter is handled at the document level.
  useEffect(() => {
    if (status !== "asking" || !isLast) return;
    const frame = requestAnimationFrame(() =>
      submitRef.current?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [isLast, status]);

  // Escape steps back — the fastest undo on a keyboard.
  useEffect(() => {
    if (status !== "asking") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && index > 0) {
        event.preventDefault();
        goBack();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, status]);

  function setAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setError(null);
  }

  function goBack() {
    if (index === 0) return;
    setDirection(-1);
    setError(null);
    setIndex((current) => current - 1);
  }

  function goNext() {
    const problem = validateStep(step, answers[step.id] ?? "");
    if (problem) {
      setError(problem);
      return;
    }
    if (isLast) {
      void submit();
      return;
    }
    setDirection(1);
    setError(null);
    setIndex((current) => current + 1);
  }

  /** A committed choice: record it and move on in one gesture. */
  function commitChoice(value: string) {
    setAnswers((current) => ({ ...current, [step.id]: value }));
    setError(null);
    setDirection(1);
    // A short beat so the selected state is visible before the panel leaves.
    window.setTimeout(() => setIndex((current) => current + 1), reduceMotion ? 0 : 260);
  }

  async function submit() {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, company }),
      });
      const data = (await response.json()) as { ok?: boolean; delivered?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? "Something went wrong sending that. Please try again.");
        setStatus("asking");
        return;
      }
      setDelivered(data.delivered !== false);
      setStatus("done");
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
      setStatus("asking");
    }
  }

  /* ---------------------------------------------------------------- done -- */
  if (status === "done") {
    return <SuccessPanel answers={answers} delivered={delivered} />;
  }

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: direction * 48 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -48 },
        transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Progress ------------------------------------------------------- */}
      <div className="flex items-center gap-4">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={index + 1}
          aria-label="Questionnaire progress"
          className="h-1 flex-1 overflow-hidden rounded-full bg-cream/15"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-300 to-sun-400"
            animate={{ width: `${Math.max(progress, 0.04) * 100}%` }}
            initial={false}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-cream/50">
          {index + 1} / {steps.length}
        </span>
      </div>

      {/* Announce every step change to assistive tech ------------------- */}
      <p aria-live="polite" className="sr-only">
        {`Step ${index + 1} of ${steps.length}. ${step.question}`}
      </p>

      {/* The question --------------------------------------------------- */}
      <div className="relative mt-10 min-h-[26rem] sm:min-h-[24rem]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step.id} {...slide}>
            <h2
              id={`q-${step.id}`}
              className="text-3xl leading-[1.15] text-white sm:text-[2.6rem]"
            >
              {step.question}
            </h2>
            <p
              id={`q-help-${step.id}`}
              className={cn("mt-3 text-cream/60", !step.help && "sr-only")}
            >
              {step.help ??
                (step.kind === "review"
                  ? "Review your answers."
                  : "Answer and press Enter.")}
            </p>

            <div className="mt-8">
              {step.kind === "choice" ? (
                <ChoiceField
                  step={step}
                  value={answers[step.id] ?? ""}
                  onSelect={(value) => setAnswer(step.id, value)}
                  onCommit={commitChoice}
                  containerRef={choiceRef}
                />
              ) : null}

              {step.kind === "text" || step.kind === "email" || step.kind === "tel" ? (
                <TextField
                  key={step.id}
                  step={step}
                  value={answers[step.id] ?? ""}
                  onChange={(value) => setAnswer(step.id, value)}
                  onEnter={goNext}
                  invalid={Boolean(error)}
                />
              ) : null}

              {step.kind === "textarea" ? (
                <TextAreaField
                  key={step.id}
                  step={step}
                  value={answers[step.id] ?? ""}
                  onChange={(value) => setAnswer(step.id, value)}
                  onEnter={goNext}
                />
              ) : null}

              {step.kind === "review" ? (
                <ReviewList
                  answers={answers}
                  steps={steps}
                  onEdit={(target) => {
                    setDirection(-1);
                    setIndex(target);
                  }}
                />
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error ----------------------------------------------------------- */}
      <p
        aria-live="assertive"
        className={cn(
          "mt-1 text-sm font-medium text-red-300",
          !error && "sr-only",
        )}
      >
        {error ?? ""}
      </p>

      {/* Controls -------------------------------------------------------- */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          ref={submitRef}
          type="button"
          onClick={goNext}
          disabled={status === "sending"}
          className={cn(
            "group inline-flex h-13 items-center gap-2.5 rounded-full bg-sun-400 px-7 py-3.5 font-semibold text-ink shadow-[var(--shadow-glow)]",
            "transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-sun-300 disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {status === "sending"
            ? "Sending…"
            : isLast
              ? "Send it"
              : step.kind === "choice"
                ? "Continue"
                : "OK"}
          <ArrowIcon />
        </button>

        <span aria-hidden="true" className="hidden text-sm text-cream/45 sm:inline">
          press{" "}
          <kbd className="rounded-md bg-cream/10 px-1.5 py-0.5 font-sans text-xs font-semibold text-cream/70">
            Enter
          </kbd>
          {step.kind === "choice" ? " · or a number key" : ""}
          {step.kind === "textarea" ? " · Shift + Enter for a new line" : ""}
        </span>

        {index > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="ml-auto text-sm font-medium text-cream/55 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            ← Back
            <span className="sr-only"> to the previous question</span>
          </button>
        ) : null}
      </div>

      {/* Honeypot: off-screen, hidden from assistive tech, never autofilled */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>
    </div>
  );
}

/* ========================================================================== */

function ReviewList({
  answers,
  steps,
  onEdit,
}: {
  answers: Answers;
  steps: ReturnType<typeof buildSteps>;
  onEdit: (index: number) => void;
}) {
  const rows = steps
    .map((step, stepIndex) => ({ step, stepIndex }))
    .filter(({ step }) => step.kind !== "review" && answers[step.id]);

  return (
    <dl className="divide-y divide-cream/10 overflow-hidden rounded-2xl bg-cream/[0.045] ring-1 ring-cream/12">
      {rows.map(({ step, stepIndex }) => (
        <div key={step.id} className="flex items-start gap-4 px-5 py-4">
          <dt className="w-32 shrink-0 pt-0.5 text-sm text-cream/50">
            {FIELD_LABELS[step.id] ?? step.id}
          </dt>
          <dd className="min-w-0 flex-1 font-medium text-white">
            {step.kind === "choice" ? labelFor(answers[step.id]) : answers[step.id]}
          </dd>
          <button
            type="button"
            onClick={() => onEdit(stepIndex)}
            className="shrink-0 text-sm font-semibold text-sun-300 underline-offset-4 hover:underline"
          >
            Edit
            <span className="sr-only">
              {" "}
              {FIELD_LABELS[step.id] ?? step.id}
            </span>
          </button>
        </div>
      ))}
    </dl>
  );
}

/* ========================================================================== */

/**
 * The reward. Deliberately the sunrise: the same gesture as the logo and the
 * hero, closing the loop at the moment somebody reaches out.
 */
function SuccessPanel({
  answers,
  delivered,
}: {
  answers: Answers;
  delivered: boolean;
}) {
  const reduceMotion = useBrandMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstName = (answers.name ?? "").trim().split(" ")[0];

  // The questionnaire sits below a page intro, so the reward can land off
  // screen on a short viewport. Bring it to the middle.
  useEffect(() => {
    panelRef.current?.scrollIntoView({
      block: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  const rise = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <motion.div
      ref={panelRef}
      className="relative mx-auto w-full max-w-2xl text-center"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      role="status"
    >
      {/* Sunrise. The sun is clipped by the container's bottom edge rather
          than covered by a painted band — a solid horizon rectangle shows its
          own corners against the section's gradient. */}
      <div className="relative mx-auto h-24 w-full max-w-sm overflow-hidden">
        <motion.div
          {...rise}
          className="absolute -bottom-16 left-1/2 size-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_38%_32%,#fff8e6_0%,#ffdc93_30%,#f5b336_64%,#dd8f12_100%)] shadow-[0_0_80px_24px_rgba(242,166,41,0.4)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-sm bg-[linear-gradient(to_right,transparent,rgba(242,166,41,0.55),transparent)]"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="-mt-10 flex justify-center"
      >
        <LogoMark onDark className="size-20" />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7"
      >
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sun-300">
          Message received
        </p>
        <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">
          {firstName ? `Thank you, ${firstName}.` : "Thank you."}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-cream/80">
          {delivered
            ? "That has landed with us. Somebody from Fresh Start will get back to you — usually within a day or two."
            : "We have your answers. Our email delivery is still being connected, so the very fastest way to reach us right now is a phone call."}
        </p>

        <div className="mx-auto mt-9 max-w-md rounded-2xl bg-cream/[0.06] p-6 text-left ring-1 ring-cream/12">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-cream/45">
            What you told us
          </p>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            {answers.intent ? (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-cream/50">About</dt>
                <dd className="font-medium text-white">{labelFor(answers.intent)}</dd>
              </div>
            ) : null}
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-cream/50">Email</dt>
              <dd className="min-w-0 break-all font-medium text-white">{answers.email}</dd>
            </div>
            {answers.phone ? (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-cream/50">Phone</dt>
                <dd className="font-medium text-white">{answers.phone}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={site.contact.phoneHref} variant="accent" size="lg">
            {site.contact.phone}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/programs" variant="inverse" size="lg">
            Explore the programs
          </ButtonLink>
        </div>

        <p className="mt-8 text-sm text-cream/50">
          While you wait — the{" "}
          <a
            href="/studio"
            className="font-semibold text-sun-300 underline-offset-4 hover:underline"
          >
            Studio
          </a>{" "}
          is where our students&apos; work lives.
        </p>
      </motion.div>
    </motion.div>
  );
}
