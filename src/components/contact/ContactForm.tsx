"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Contact / enrollment form.
 *
 * There is no backend yet, so submitting composes a pre-filled email to the
 * organization's inbox. That means the form works on day one without a server,
 * and nothing is silently dropped.
 *
 * TODO(Darius): swap `handleSubmit` for a real endpoint when a provider is
 * chosen. The cheapest good options for a nonprofit:
 *   • A Next.js server action + Resend (free tier covers this volume)
 *   • Formspree / Basin — no code, spam filtering included
 * Whatever is chosen: add a honeypot + rate limit, and never log the message
 * body anywhere public.
 */

const interests = [
  "Enrolling a child",
  "Volunteering",
  "Donating or sponsoring",
  "Partnering with us",
  "Something else",
];

const fieldClass =
  "w-full rounded-2xl border-2 border-ink/10 bg-white px-4 py-3.5 text-ink transition-colors placeholder:text-ink-muted/60 focus:border-sun-400 focus:outline-none";

export function ContactForm() {
  const [interest, setInterest] = useState(interests[0]);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot — real people never fill a hidden field.
    if (form.get("company")) return;

    const body = [
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Phone: ${form.get("phone") || "—"}`,
      `I'm interested in: ${interest}`,
      "",
      String(form.get("message") ?? ""),
    ].join("\n");

    // Handing off to the OS mail client, not navigating the app — so this goes
    // through an anchor rather than the router.
    const mailto = `${site.contact.emailHref}?subject=${encodeURIComponent(
      `Website enquiry — ${interest}`,
    )}&body=${encodeURIComponent(body)}`;
    const link = document.createElement("a");
    link.href = mailto;
    link.rel = "noopener";
    link.click();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            Your name <span className="text-sun-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={cn(fieldClass, "mt-2")}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email <span className="text-sun-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(fieldClass, "mt-2")}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-ink">
          Phone <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={cn(fieldClass, "mt-2")}
          placeholder="(318) 000-0000"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          What can we help with?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={interest === option}
              onClick={() => setInterest(option)}
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-300",
                interest === option
                  ? "border-sun-500 bg-sun-50 text-sun-800"
                  : "border-ink/10 text-ink-soft hover:border-sun-300",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message <span className="text-sun-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClass, "mt-2 resize-y")}
          placeholder="Tell us a little about your child, or how you'd like to help."
        />
      </div>

      {/* Honeypot: visually and semantically hidden from real users */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Send message
          <ArrowIcon />
        </Button>
        <p aria-live="polite" className="text-sm text-ink-muted">
          {sent
            ? "Your email app should have opened with the message ready to send."
            : "This opens your email app with the message pre-filled."}
        </p>
      </div>
    </form>
  );
}
