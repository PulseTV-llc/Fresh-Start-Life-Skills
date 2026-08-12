import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { buildMetadata } from "@/lib/seo";
import { getStripe, donationsEnabled } from "@/lib/stripe";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Thank you",
  description: "Thank you for supporting Fresh Start Life Skills.",
  path: "/donate/thank-you",
  // A confirmation page has nothing to offer search, and indexing it would let
  // someone else's receipt surface in results.
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Confirmed = {
  amount: number;
  recurring: boolean;
  email: string | null;
  name: string | null;
};

/**
 * Confirms the gift against Stripe rather than trusting the query string —
 * anyone can type `?session_id=…`, and a donor should only ever see "thank you,
 * your gift went through" when it actually did.
 *
 * This is the donor's confirmation. The organization's record comes from the
 * webhook, because a donor can close this tab before it ever loads.
 */
async function confirmSession(sessionId: string | null): Promise<Confirmed | null> {
  if (!sessionId || !donationsEnabled()) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" || session.status === "complete";
    if (!paid) return null;
    return {
      amount: (session.amount_total ?? 0) / 100,
      recurring: session.mode === "subscription",
      email: session.customer_details?.email ?? null,
      name: session.customer_details?.name ?? null,
    };
  } catch {
    // An unknown or expired session is not an error worth showing a donor.
    return null;
  }
}

export default async function ThankYouPage({
  searchParams,
}: PageProps<"/donate/thank-you">) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : null;
  const gift = await confirmSession(sessionId);
  const firstName = gift?.name?.split(" ")[0];

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(178deg,#9fd9de_0%,#bce7e8_20%,#dcf1ef_42%,#f6f2e2_66%,#ffeccb_88%,#ffe2b4_100%)] pb-24 pt-32 sm:pt-40">
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] w-full"
      >
        <defs>
          <linearGradient id="ty-hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ecb5c" />
            <stop offset="100%" stopColor="#6ca02f" />
          </linearGradient>
        </defs>
        <path
          d="M0 250C200 250 260 122 520 120s360 82 560 70 260-40 360-70v200H0V250Z"
          fill="url(#ty-hill)"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[11%] w-full"
      >
        <defs>
          <linearGradient id="ty-hill-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d5560" />
            <stop offset="100%" stopColor="#013640" />
          </linearGradient>
        </defs>
        <path
          d="M0 168C220 96 420 150 640 140s440-66 800-18v198H0V168Z"
          fill="url(#ty-hill-near)"
        />
      </svg>

      <Container size="narrow" className="relative">
        <div className="rounded-[2rem] bg-white/85 p-8 text-center shadow-[var(--shadow-lift)] backdrop-blur-sm sm:p-12">
          <LogoMark className="mx-auto size-20" />

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            {gift ? "Gift confirmed" : "Thank you"}
          </p>

          <h1 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">
            {firstName ? `Thank you, ${firstName}.` : "Thank you."}
          </h1>

          {gift ? (
            <>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Your{" "}
                <strong className="font-semibold text-ink">
                  ${gift.amount.toLocaleString()}
                  {gift.recurring ? " monthly" : ""}
                </strong>{" "}
                gift to {site.legalName} went through
                {gift.recurring ? " and will renew each month" : ""}.
              </p>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A receipt is on its way
                {gift.email ? ` to ${gift.email}` : ""}. Keep it — {site.legalName}{" "}
                is a {site.nonprofit.status}, and your gift is tax-deductible to
                the extent allowed by law.
                {gift.recurring
                  ? " You can change or cancel your monthly gift at any time by replying to that email or calling us."
                  : ""}
              </p>
            </>
          ) : (
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Thank you for supporting Fresh Start Life Skills. If you have just
              completed a gift, your receipt will arrive by email shortly. If
              anything looks wrong, call us at{" "}
              <a
                href={site.contact.phoneHref}
                className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
              >
                {site.contact.phone}
              </a>{" "}
              and we will sort it out.
            </p>
          )}

          <div className="mt-8 rounded-2xl bg-teal-50 px-6 py-5 text-left">
            <h2 className="font-display text-lg font-semibold text-teal-900">
              What happens next
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-teal-900/80">
              Your gift goes straight into the room: fabric and thread, wax and
              wicks, baking supplies, camera batteries — and the instruction time
              that turns them into a skill a young person keeps.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/programs">
              See what you funded
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Want to do more?{" "}
            <Link
              href="/get-involved"
              className="font-semibold text-ink underline decoration-sun-400 decoration-2 underline-offset-4"
            >
              Volunteer an afternoon
            </Link>{" "}
            or tell a friend.
          </p>
        </div>
      </Container>

      {/* Keeps the hills from colliding with the card on short viewports. */}
      <Section className="py-0" aria-hidden>
        <span className="sr-only">End of confirmation</span>
      </Section>
    </section>
  );
}
