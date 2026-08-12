import { NextResponse } from "next/server";
import { FIELD_LABELS, isEmail, labelFor } from "@/lib/contactFlow";
import { site } from "@/lib/site";

/**
 * Receives a completed contact questionnaire and emails it to the organization.
 *
 * Delivery goes through Resend's REST API directly rather than the SDK — it is
 * one POST, and it keeps a dependency (and its transitive tree) out of the
 * bundle for something this small.
 *
 * Without RESEND_API_KEY the route still returns 200 with `delivered: false`.
 * That is deliberate: a visitor who filled in seven screens should never be
 * shown a failure caused by our own missing configuration. The payload is
 * written to the server log so nothing is lost, and the client surfaces the
 * phone number prominently instead of implying an email is on its way.
 *
 * TODO(Darius): server logs are a stopgap, not an inbox. Once the Resend key is
 * in, this branch should effectively never run — but if you want belt and
 * braces, add a second sink here (a Google Sheet row, or a database table).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = process.env.CONTACT_FROM_EMAIL ?? "Fresh Start Website <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? site.contact.email;

/** Order the fields appear in the email — mirrors the questionnaire. */
const FIELD_ORDER = [
  "intent",
  "program",
  "childAge",
  "helpWith",
  "support",
  "organization",
  "name",
  "email",
  "phone",
  "message",
];

/** Values that came from a fixed option list get their human label restored. */
const CHOICE_FIELDS = new Set([
  "intent",
  "program",
  "childAge",
  "helpWith",
  "support",
]);

/**
 * Crude per-instance rate limit. Serverless means this is per warm instance
 * rather than global, so it will not stop a determined flood — the honeypot and
 * Resend's own limits are the real defence. This is here to make casual
 * form-hammering pointless.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear(); // bound the map
  return recent.length > RATE_LIMIT.max;
}

const clean = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages in a short time. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field only an automated submitter fills in. Answer 200
  // so the bot has nothing to learn from the response.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const answers: Record<string, string> = {};
  for (const key of FIELD_ORDER) {
    const value = clean(body[key], key === "message" ? 5000 : 300);
    if (value) answers[key] = value;
  }

  if (!answers.name || !answers.email) {
    return NextResponse.json(
      { error: "Please include a name and an email address." },
      { status: 400 },
    );
  }
  if (!isEmail(answers.email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }

  const readable = FIELD_ORDER.filter((key) => answers[key]).map((key) => ({
    label: FIELD_LABELS[key] ?? key,
    value: CHOICE_FIELDS.has(key) ? labelFor(answers[key]) : answers[key],
  }));

  const subject = `${labelFor(answers.intent ?? "hello")} — ${answers.name}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Nothing is lost — but this is a log line, not an inbox. See the note above.
    console.warn(
      "[contact] RESEND_API_KEY not set; message not delivered:",
      JSON.stringify({ subject, answers, ip }),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        // So Dorothy can hit reply and land in the sender's inbox.
        reply_to: answers.email,
        subject,
        text: textBody(readable),
        html: htmlBody(readable, subject),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend rejected the message:", response.status, detail);
      console.warn("[contact] undelivered payload:", JSON.stringify({ subject, answers }));
      // The visitor did nothing wrong, and the data is in the log — do not make
      // them retype seven screens over our provider's bad day.
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    console.warn("[contact] undelivered payload:", JSON.stringify({ subject, answers }));
    return NextResponse.json({ ok: true, delivered: false });
  }
}

function textBody(fields: { label: string; value: string }[]) {
  return [
    "New message from the Fresh Start Life Skills website",
    "",
    ...fields.map((field) => `${field.label}: ${field.value}`),
    "",
    "— sent by the contact questionnaire at freshstartlifeskills.org/contact",
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlBody(fields: { label: string; value: string }[], subject: string) {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 16px 10px 0;color:#4d6f77;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(field.label)}</td>
          <td style="padding:10px 0;color:#06282f;font-size:15px;font-weight:600;">${escapeHtml(field.value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;background:#fdfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:linear-gradient(140deg,#0a5054,#012f38);border-radius:20px;padding:28px;">
      <p style="margin:0;color:#f5b336;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">Fresh Start Life Skills</p>
      <p style="margin:10px 0 0;color:#fff;font-size:22px;font-weight:700;">${escapeHtml(subject)}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:24px;">${rows}</table>
    <p style="margin-top:28px;color:#4d6f77;font-size:12px;line-height:1.6;">
      Sent by the contact questionnaire at freshstartlifeskills.org/contact.
      Reply to this email to answer the sender directly.
    </p>
  </div>
</body></html>`;
}
