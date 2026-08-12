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
| Fonts | Fraunces + Plus Jakarta Sans | Self-hosted via `next/font`, zero layout shift |

Everything except `/donate` is statically prerendered. `/donate` is dynamic only
because it reads `?amount=` from the homepage CTA.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, metadata, org JSON-LD, header/footer
│   ├── page.tsx                Homepage (composes the sections below)
│   ├── globals.css             Design system — colors, type, motion, tokens
│   ├── icon.svg                Favicon (the Fresh Start mark)
│   ├── opengraph-image.tsx     Social share card, generated at request time
│   ├── sitemap.ts / robots.ts  Generated from the content models
│   ├── not-found.tsx           Branded 404 (reuses the hero landscape)
│   ├── about/ contact/ donate/ events/ get-involved/ privacy/
│   └── programs/
│       ├── page.tsx            Program index, grouped by track
│       └── [slug]/page.tsx     One prerendered page per program
│
├── components/
│   ├── brand/
│   │   ├── Logo.tsx            Vector reconstruction of the Fresh Start mark
│   │   ├── SunriseScene.tsx    The animated hero landscape (sky, sun, 3 ridges, runners)
│   │   ├── RunningChild.tsx    Child silhouette, four stride variants
│   │   └── ProgramGlyph.tsx    Hand-drawn icon per program
│   ├── home/                   Hero, ServiceMarquee, Mission, ProgramsShowcase,
│   │                           Impact, Stories, Pathways, DonateCTA
│   ├── layout/                 SiteHeader, SiteFooter, PageHero
│   ├── contact/ContactForm.tsx
│   ├── seo/JsonLd.tsx
│   └── ui/                     Button, Container, Section, Reveal, Counter,
│                               PhotoPlaceholder
└── lib/
    ├── site.ts                 ⭐ Org facts: name, address, phone, service areas
    ├── programs.ts             ⭐ Program catalog (drives pages + sitemap + schema)
    ├── events.ts               Session dates (intentionally empty — see file)
    ├── stories.ts              ⚠️ PLACEHOLDER testimonials
    ├── donations.ts            ⭐ Payment provider adapter (no keys, by design)
    ├── jsonld.ts               Schema.org graphs
    ├── seo.ts                  Per-page metadata builder
    └── utils.ts                cn()
```

The three ⭐ files are where almost all real edits happen. Adding a program to
`lib/programs.ts` publishes a detail page, a homepage card, a footer link, a
sitemap entry and `Course` structured data — no other file needs touching.

---

## Design system

Tokens are defined once in `src/app/globals.css`:

- **Sunrise** `sun-50…900` — the rising sun; primary actions and accents
- **Leaf** `leaf-50…900` — the hills; growth, trust, dark sections
- **Sky** `sky-brand-50…900` — the sky; secondary accents
- **Warm neutrals** `cream`, `sand`, `ink`, `ink-soft`, `ink-muted`

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
  `Course` per program, `ItemList`, `BreadcrumbList`, `FAQPage`
- `sitemap.xml` and `robots.txt` generated from the content models
- Name/address/phone comes from one source (`lib/site.ts`) so local citations
  stay byte-identical

**Before launch:** claim Google Search Console and add the token in
`app/layout.tsx`; create/verify the Google Business Profile and replace the
approximate `latitude`/`longitude` in `lib/site.ts` with the exact pin.

---

## Wiring up donations

Nothing here talks to a payment processor yet — that is deliberate, and it is
all confined to `src/lib/donations.ts`. Until a provider is configured, every
Donate button routes to `/donate`, which explains how to give by phone or check,
so the CTA is never a dead end.

To go live, set two env vars (see `.env.example`):

```bash
NEXT_PUBLIC_DONATE_PROVIDER=givebutter
NEXT_PUBLIC_DONATE_URL=https://givebutter.com/your-campaign
```

Amount, frequency and a UTM source are appended automatically. Never commit a
secret key; only `NEXT_PUBLIC_*` values belong in client code.

---

## Before this can go live

Search the codebase for `TODO(` — every open item is tagged there. The
significant ones:

| Item | Where |
| --- | --- |
| ⚠️ Replace placeholder testimonials with real, consented quotes | `lib/stories.ts` |
| Real photography (every `PhotoPlaceholder` states the shot needed) | throughout |
| Original logo artwork, if it exists | `components/brand/Logo.tsx` |
| EIN from the IRS determination letter | `lib/site.ts` |
| Real social media handles | `lib/site.ts` |
| Dorothy's bio, board and instructors | `app/about/page.tsx` |
| Confirmed session days/times, then real dates | `lib/events.ts` |
| Verify the donation impact amounts against real material costs | `lib/donations.ts` |
| Contact form endpoint (currently composes a mailto:) | `components/contact/ContactForm.tsx` |
| Legal review of the privacy policy | `app/privacy/page.tsx` |

A dev-only banner renders on the homepage while placeholder testimonials are
still in place, so they cannot ship silently.

---

## Deploying

Not deployed yet — deliberately. When ready, Vercel is the path of least
resistance (`vercel --prod`); the site is static enough for Netlify or
Cloudflare Pages too. Point `freshstartlifeskills.com` at the host and set
`site.url` in `lib/site.ts` to the final origin.
