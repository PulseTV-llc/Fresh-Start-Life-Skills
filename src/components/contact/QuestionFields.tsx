"use client";

import { useEffect, useRef } from "react";
import type { Option, Step } from "@/lib/contactFlow";
import { cn } from "@/lib/utils";

/**
 * The three input types the questionnaire uses.
 *
 * Every one of them is keyboard-first: Enter advances, and choices can be
 * picked with a number key without ever touching the mouse.
 */

const glyphs: Record<NonNullable<Option["icon"]>, React.ReactNode> = {
  enroll: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
    </>
  ),
  volunteer: (
    <path
      d="M12 20.5S4.5 15.5 4.5 10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.8c0 5.3-7.5 10.3-7.5 10.3Z"
      strokeLinejoin="round"
    />
  ),
  donate: (
    <>
      <path d="M3.5 10.5h17v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
      <path d="M2.5 6.5h19v4h-19z" />
      <path d="M12 6.5v15" />
      <path d="M12 6.5S10.7 3 8.2 3a2.2 2.2 0 0 0-.2 3.5H12Zm0 0S13.3 3 15.8 3a2.2 2.2 0 0 1 .2 3.5H12Z" strokeLinejoin="round" />
    </>
  ),
  partner: (
    <>
      <path d="M3 21V7l7-4 7 4v14" />
      <path d="M17 11h4v10" />
      <path d="M7 21v-5h6v5" />
    </>
  ),
  hello: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 1-4.3-7.4" />
      <path d="M8.5 13s1.3 1.8 3.5 1.8S15.5 13 15.5 13" strokeLinecap="round" />
      <circle cx="9" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
};

/* ========================================================================== */

export function ChoiceField({
  step,
  value,
  onSelect,
  onCommit,
  containerRef,
}: {
  step: Extract<Step, { kind: "choice" }>;
  value: string;
  /** Selection changed but the visitor is still deciding (arrow keys). */
  onSelect: (value: string) => void;
  /** A deliberate pick — advance the flow. */
  onCommit: (value: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    step.options.findIndex((option) => option.value === value),
  );

  // Each field takes its own focus on mount rather than the parent reaching in.
  // With AnimatePresence mode="wait" the incoming panel does not exist until
  // the outgoing one has finished leaving, so a parent effect keyed on the step
  // index fires against a node that is not there yet — and focus lands on
  // <body>, which silently kills every keyboard shortcut.
  useEffect(() => {
    optionRefs.current[selectedIndex]?.focus({ preventScroll: true });
    // Mount only: re-focusing on selection change would fight the arrow keys.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = step.options.length - 1;

    // Number keys jump straight to an option and commit — the fastest path,
    // and the one the hint text advertises.
    const digit = Number.parseInt(event.key, 10);
    if (!Number.isNaN(digit) && digit >= 1 && digit <= step.options.length) {
      event.preventDefault();
      onCommit(step.options[digit - 1].value);
      return;
    }

    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = selectedIndex === last ? 0 : selectedIndex + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = selectedIndex === 0 ? last : selectedIndex - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    // Arrows move the selection but never advance: auto-advancing on arrow
    // would make it impossible to browse the options with a keyboard.
    onSelect(step.options[next].value);
    optionRefs.current[next]?.focus();
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-labelledby={`q-${step.id}`}
      onKeyDown={onKeyDown}
      className={cn(
        "grid gap-2.5",
        step.compact ? "sm:grid-cols-2" : "sm:gap-3",
      )}
    >
      {step.options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              optionRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => onCommit(option.value)}
            className={cn(
              "group flex items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-300 ease-[var(--ease-out-expo)] sm:px-5 sm:py-4",
              selected
                ? "-translate-y-0.5 border-sun-400 bg-sun-400/15 shadow-[0_18px_40px_-16px_rgba(242,166,41,0.5)]"
                : "border-cream/15 bg-cream/[0.045] hover:-translate-y-0.5 hover:border-cream/35 hover:bg-cream/[0.09]",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-300",
                selected
                  ? "bg-sun-400 text-ink"
                  : "bg-cream/10 text-cream/70 group-hover:bg-cream/20",
              )}
            >
              {option.icon ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {glyphs[option.icon]}
                </svg>
              ) : (
                index + 1
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "block font-display text-lg font-semibold leading-snug transition-colors sm:text-xl",
                  selected ? "text-white" : "text-cream/90",
                )}
              >
                {option.label}
              </span>
              {option.description ? (
                <span className="mt-0.5 block text-sm leading-snug text-cream/55">
                  {option.description}
                </span>
              ) : null}
            </span>

            <span
              aria-hidden="true"
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                selected ? "border-sun-400 bg-sun-400" : "border-cream/25",
              )}
            >
              {selected ? (
                <svg viewBox="0 0 20 20" className="size-3.5 text-ink" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m4 10.4 3.2 3.2L16 5.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ========================================================================== */

export function TextField({
  step,
  value,
  onChange,
  onEnter,
  invalid,
}: {
  step: Extract<Step, { kind: "text" | "email" | "tel" }>;
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  invalid: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <input
      ref={ref}
      id={`field-${step.id}`}
      type={step.kind === "text" ? "text" : step.kind}
      inputMode={step.kind === "tel" ? "tel" : undefined}
      autoComplete={step.autoComplete}
      autoCapitalize={step.kind === "email" ? "off" : undefined}
      spellCheck={step.kind === "email" ? false : undefined}
      value={value}
      aria-describedby={`q-help-${step.id}`}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onEnter();
        }
      }}
      placeholder={step.placeholder}
      className={cn(
        "w-full border-b-2 bg-transparent pb-3 font-display text-2xl text-white outline-none transition-colors duration-300 placeholder:text-cream/25 sm:text-3xl",
        invalid ? "border-red-400" : "border-cream/25 focus:border-sun-400",
      )}
    />
  );
}

/* ========================================================================== */

export function TextAreaField({
  step,
  value,
  onChange,
  onEnter,
}: {
  step: Extract<Step, { kind: "textarea" }>;
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <textarea
      ref={ref}
      id={`field-${step.id}`}
      value={value}
      rows={4}
      aria-describedby={`q-help-${step.id}`}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        // Enter advances; Shift+Enter (and ⌘/Ctrl+Enter) write a newline. This
        // is the one field where Enter is ambiguous, so the hint says so.
        if (event.key === "Enter" && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
          event.preventDefault();
          onEnter();
        }
      }}
      placeholder={step.placeholder}
      className="w-full resize-none rounded-2xl border-2 border-cream/20 bg-cream/[0.045] px-5 py-4 text-lg leading-relaxed text-white outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-sun-400 sm:text-xl"
    />
  );
}
