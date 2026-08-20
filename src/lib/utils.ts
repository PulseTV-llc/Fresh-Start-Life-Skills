import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * "Jane Smith" -> "JS". Skips punctuation-only tokens so a placeholder like
 * "Board Member — Name TBD" still yields clean initials rather than an em dash.
 *
 * Used for the avatar fallback wherever a person is listed without a headshot.
 */
export function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
