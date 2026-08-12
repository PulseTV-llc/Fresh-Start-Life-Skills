import { site } from "./site";

/**
 * Is indexing allowed for this deployment?
 *
 * A brand-new Vercel project answers on `*.vercel.app`, and that host is
 * crawlable. Letting it get indexed would be actively harmful twice over:
 *
 *   1. It creates a duplicate of the whole site competing with the real
 *      domain in search results.
 *   2. Right now the site still carries placeholder testimonials and
 *      placeholder Studio students. Those are clearly flagged in the source and
 *      show a warning banner in development, but that banner does not render in
 *      production — so indexed pages would present invented children's stories
 *      as real ones under a real nonprofit's name.
 *
 * So indexing is allowed only when the deployed host actually matches
 * `site.url`. Nothing to remember at launch: point the domain at the project,
 * set NEXT_PUBLIC_SITE_URL, and indexing switches itself on.
 */
export function isCanonicalDeployment(): boolean {
  const canonicalHost = new URL(site.url).host;

  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    try {
      return new URL(explicit).host === canonicalHost;
    } catch {
      return false;
    }
  }

  // Vercel exposes the project's production domain, preferring a custom one.
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return productionHost === canonicalHost;

  // Local development: robots.txt is not being crawled here anyway.
  return !process.env.VERCEL;
}

/**
 * The deliberate switch.
 *
 * Matching the canonical host is now *necessary but not sufficient*. Indexing
 * also requires NEXT_PUBLIC_ALLOW_INDEX=true, set by hand when the site is
 * genuinely ready — which today it is not: the placeholder Studio students and
 * placeholder testimonials are still live, and their warning banners only
 * render in development.
 *
 * Without this flag, correcting the canonical domain would silently open the
 * site to crawlers as a side effect. Two unrelated decisions, two switches.
 *
 * TODO(Darius): flip NEXT_PUBLIC_ALLOW_INDEX to "true" in the Vercel project
 * once real students and real testimonials have replaced the placeholders.
 */
export const indexingAllowed =
  process.env.NEXT_PUBLIC_ALLOW_INDEX === "true" && isCanonicalDeployment();
