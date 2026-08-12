# Fresh Start Life Skills — Website

Marketing and program site for **Fresh Start Life Skills Inc.**, a 501(c)(3)
nonprofit in Alexandria, Louisiana offering vocational and life-skills training
to young people ages 8–17.

> Mission: *"Fresh Start Life Skills Inc. is a non-profit organization dedicated
> to empowering individuals of all ages."*

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also type-checks)
npm start            # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # types only
```

Node 20+ recommended (built and tested on Node 22).

---

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16, App Router | Static generation per route → fast, crawlable, cheap to host |
| Language | TypeScript (strict) | Content models are typed, so a bad program entry fails the build |
| Styling | Tailwind CSS v4 | Design tokens live in `globals.css` under `@theme` |
| Motion | `motion` (Framer Motion) | Scroll reveals, parallax, layout animations — all reduced-motion aware |
| Payments | Stripe Checkout | Card data never touches this origin, so PCI scope stays at SAQ-A |
| Fonts | Fraunces + Plus Jakarta Sans | Self-hosted via `next/font`, zero layout shift |

Everything is statically prerendered except `/donate` and `/donate/thank-you`,
which read query params, and the two API routes.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, metadata, org JSON-LD, header/footer
│   ├── page.tsx                Homepage (composes the sections below)
│   ├── globals.css             Design system — colors, type, motion, tokens
│   ├── icon.png                Favicon, generated from the official mark
│   ├── apple-icon.png          iOS touch icon (opaque, warm white)
│   ├── opengraph-image.tsx     Social share card, built around the mark
│   ├── sitemap.ts / robots.ts  Generated from the content models
│   ├── not-found.tsx           Branded 404 (reuses the hero landscape)
│   ├── api/
│   │   ├── donate/route.ts     Creates the Stripe Checkout Session
│   │   └── stripe/webhook/     Signature-verified gift record
│   ├── studio/page.tsx         ★ Fresh Start Studio — student work gallery
│   ├── donate/
│   │   ├── page.tsx            Giving page
│   │   └── thank-you/page.tsx  Stripe-confirmed receipt state
│   ├── about/ contact/ events/ get-involved/ privacy/
│   └── programs/
│       ├── page.tsx            Program index, grouped by track
│       └── [slug]/page.tsx     One prerendered page per program
│
├── components/
│   ├── brand/
│   │   ├── Logo.tsx            The official mark, with the on-dark coin treatment
│   │   ├── SunriseScene.tsx    The animated hero landscape (sky, sun, 3 ridges, runners)
│   │   ├── RunningChild.tsx    Child silhouette, four stride variants
│   │   └── ProgramGlyph.tsx    Hand-drawn icon per program
│   ├── studio/                 StudioGallery, StudioLightbox, StudioArtwork
│   ├── donate/GiftBuilder.tsx  Stripe-backed giving form
│   ├── home/                   Hero, ServiceMarquee, Mission, ProgramsShowcase,
│   │                           StudioTeaser, Impact, Stories, Pathways, DonateCTA
│   ├── layout/                 SiteHeader, SiteFooter, PageHero
│   ├── contact/                ContactQuestionnaire, QuestionFields
│   ├── seo/JsonLd.tsx
│   └── ui/                     Button, Container, Section, Reveal, Counter,
│                               PhotoPlaceholder
└── lib/
    ├── site.ts                 ⭐ Org facts: name, address, phone, service areas
    ├── programs.ts             ⭐ Program catalog (drives pages + sitemap + schema)
    ├── events.ts               Session dates (intentionally empty — see file)
    ├── studio.ts               ⭐ ⚠️ Studio pieces (PLACEHOLDER students)
    ├── stories.ts              ⚠️ PLACEHOLDER testimonials
    ├── contactFlow.ts          ⭐ The contact questionnaire, as data
    ├── donations.ts            ⭐ Tiers + validation, shared client/server
    ├── stripe.ts               server-only Stripe client
    ├── useBrandMotion.ts       Hydration-safe reduced-motion hook
    ├── jsonld.ts               Schema.org graphs
    ├── seo.ts                  Per-page metadata builder
    └── utils.ts                cn()
```

The ⭐ files are where almost all real edits happen. Adding a program to
`lib/programs.ts` publishes a detail page, a homepage card, a footer link, a
sitemap entry and `Course` structured data — no other file needs touching.

---

## Design system

Every hue is sampled from the official logo, and tokens are defined once in
`src/app/globals.css`:

| Token | Value | Where it comes from | Role |
| --- | --- | --- | --- |
| `teal-500` | `#0f9c96` | the bright figure | highlights, accents |
| `navy-700` | `#01535b` | the centre figure & enclosing hand | primary actions, dark ground, body ink |
| `green-500` | `#6ca02f` | the right figures | growth, hills |
| `sun-500` | `#f2a629` | the rising sun | the accent, reserved for giving |

Navy carries the weight and amber is used sparingly — the same hierarchy the
mark itself uses. **Amber buttons pair with ink text, never white**: white on
`#f2a629` measures 2.1:1, ink measures 7.7:1.

Warm neutrals: `cream`, `cream-100`, `mist`, `sand`, `ink`, `ink-soft`,
`ink-muted`.

### Logo assets

`public/brand/logo.png` is the supplied artwork with its white background
un-composited to transparency (alpha recovered from the darkest channel, so the
edges stay clean on any ground) and the padding trimmed.

On dark backgrounds the mark is set on a warm-white coin (`<LogoMark onDark />`)
— its deepest figure is nearly the same navy as our dark sections and the
negative-space path reads as a hole otherwise. That is the intended treatment,
not a workaround.

`src/app/icon.png` and `src/app/apple-icon.png` are generated from the same
source; `public/brand/logo-og.png` is an opaque copy for the share card, because
Satori's image decoder drops alpha.

Type is Fraunces (display) over Plus Jakarta Sans (UI). Motion easing and
shadows are tokens too — no ad-hoc `cubic-bezier` or gray drop shadows.

### Accessibility

- Semantic landmarks, one `<h1>` per page, skip-to-content link
- Every interactive element has a visible focus ring
- Colors were checked against WCAG **AA** (4.5:1 body, 3:1 large)
- `prefers-reduced-motion` is honored globally *and* per component — the hero
  parallax, counters, carousels and reveals all render final state instead of
  animating
- The mobile menu traps scroll, closes on Escape and restores focus

---

## SEO

- Per-page `title` / `description` / canonical via `lib/seo.ts`
- Open Graph + Twitter cards, with a generated 1200×630 share image
- JSON-LD: `NGO` + `LocalBusiness` (with `geo` and `areaServed`), `WebSite`,
  `Course` per program, `ItemList`, `BreadcrumbList`, `FAQPage`,
  `CollectionPage` + `ImageGallery` for the Studio
- `sitemap.xml` and `robots.txt` generated from the content models
- Name/address/phone comes from one source (`lib/site.ts`) so local citations
  stay byte-identical

**Before launch:** claim Google Search Console and add the token in
`app/layout.tsx`; create/verify the Google Business Profile and replace the
approximate `latitude`/`longitude` in `lib/site.ts` with the exact pin.

---

## Donations (Stripe)

The flow is complete and needs only keys.

```
GiftBuilder (client)  →  POST /api/donate  →  Stripe Checkout  →  /donate/thank-you
                                                     ↓
                                         POST /api/stripe/webhook
```

- `src/components/donate/GiftBuilder.tsx` — preset tiers, custom amount,
  one-time / monthly toggle, live impact readout, loading and error states.
  Used by both the homepage band and `/donate`.
- `src/app/api/donate/route.ts` — creates the Checkout Session. One-time gifts
  use `mode: "payment"` with Stripe's Donate button; monthly uses
  `mode: "subscription"` with a monthly recurring price. **The amount is
  re-validated server-side** — the request is JSON from the internet, not
  something the form controls.
- `src/app/donate/thank-you/page.tsx` — retrieves the session from Stripe and
  only says "thank you, it went through" when `payment_status` says so. Anyone
  can type a `session_id`. `noindex`.
- `src/app/api/stripe/webhook/route.ts` — signature-verified. This is the
  organization's record of a gift, because a donor can close the tab before the
  thank-you page loads.

**What Darius needs to provide** — all documented inline in `.env.example`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...   # safe in the browser
STRIPE_SECRET_KEY=sk_test_...                    # server only, never committed
STRIPE_WEBHOOK_SECRET=whsec_...                  # from `stripe listen` or the Dashboard
```

Until both keys exist the page still works — it shows the phone/check
instructions instead of a checkout button, and the API returns 503. Test with
card `4242 4242 4242 4242`, then swap in the live pair.

`src/lib/stripe.ts` is marked `server-only`, so importing it from a Client
Component is a build error — that is the guardrail keeping the secret key out of
the browser bundle.

---

## Before this can go live

Search the codebase for `TODO(` — every open item is tagged there. The
significant ones:

| Item | Where |
| --- | --- |
| ⚠️ Replace placeholder testimonials with real, consented quotes | `lib/stories.ts` |
| ⚠️ Replace placeholder Studio pieces — those students are not real | `lib/studio.ts` |
| Stripe keys (test first, then live) | `.env.example` |
| Real photography (every `PhotoPlaceholder` states the shot needed) | throughout |
| Original logo artwork, if it exists | `components/brand/Logo.tsx` |
| EIN from the IRS determination letter | `lib/site.ts` |
| Real social media handles | `lib/site.ts` |
| Dorothy's bio, board and instructors | `app/about/page.tsx` |
| Confirmed session days/times, then real dates | `lib/events.ts` |
| Verify the donation impact amounts against real material costs | `lib/donations.ts` |
| Resend API key so the contact questionnaire actually emails | `.env.example` |
| Legal review of the privacy policy | `app/privacy/page.tsx` |

Dev-only banners render on the homepage and in the Studio while placeholder
content is still in place, so invented quotes and invented students cannot ship
silently.

---

## Fresh Start Studio

`/studio` is the flagship interactive piece: a gallery of student work, filtered
by craft, with a lightbox that carries each student's own words.

- **Data** — `src/lib/studio.ts`. Add a piece and it appears on the wall, in the
  filter counts and in the homepage teaser.
- **Artwork** — until a piece has a photograph, `StudioArtwork` draws a
  composition from that craft (woven thread, glow rings, piped rosettes, a
  clapperboard). Two arrangements per craft, chosen by a hash of the piece id —
  never `Math.random()`, because the server and client must draw the same thing
  or React throws a hydration mismatch. Set `image` on a piece and the
  photograph replaces the drawing.
- **Accessibility** — the wall is CSS multi-column so tab order follows DOM
  order; each card is a button whose accessible name carries everything the
  visuals convey; the lightbox is a labelled `aria-modal` dialog with a focus
  trap, Escape to close, arrow keys to move between pieces, locked background
  scroll, and focus returned to the card that opened it.

---

## Deploying

Not deployed yet — deliberately. When ready, Vercel is the path of least
resistance (`vercel --prod`); the site is static enough for Netlify or
Cloudflare Pages too. Point `freshstartlifeskills.com` at the host and set
`site.url` in `lib/site.ts` to the final origin.
