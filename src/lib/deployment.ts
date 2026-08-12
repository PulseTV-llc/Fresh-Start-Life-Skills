import { site } from "./site";

/**
 * Is this deployment serving the canonical domain?
 *
 * A brand-new Vercel project answers on `*.vercel.app`, and that host is
 * crawlable. Letting it get indexed would be actively harmful twice over:
 *
 *   1. It creates a duplicate of the whole site competing with
 *      freshstartlifeskills.com in search results.
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

export const indexingAllowed = isCanonicalDeployment();
