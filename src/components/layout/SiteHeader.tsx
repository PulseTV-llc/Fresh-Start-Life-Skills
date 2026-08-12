"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useBrandMotion } from "@/lib/useBrandMotion";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav, site } from "@/lib/site";
import { buildDonateUrl, donateLinkRel, donateLinkTarget } from "@/lib/donations";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useBrandMotion();

  // Frost the bar the moment the page leaves the very top. The rAF pass catches
  // a page restored mid-scroll (refresh, back navigation) without a synchronous
  // setState in the effect body.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Navigating closes the mobile overlay. Derived during render rather than in
  // an effect, so the menu is already gone on the frame the new route paints.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  // While the overlay is open: freeze the page behind it and wire up Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to main content
      </a>

      <header
        // Read by the `body:has([data-hero="dark"])` rules in globals.css.
        data-at-top={scrolled ? "false" : "true"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-ink/[0.07] bg-cream/85 backdrop-blur-xl supports-[backdrop-filter]:bg-cream/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container size="wide">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-expo)]",
              scrolled ? "h-16" : "h-20 sm:h-24",
            )}
          >
            <Link
              href="/"
              className="rounded-lg transition-transform duration-300 hover:-translate-y-px"
              aria-label={`${site.name} — home`}
            >
              <Logo priority />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "fsl-nav-link relative rounded-full px-4 py-2.5 text-[0.94rem] font-medium transition-colors duration-300",
                        isActive(item.href)
                          ? "text-ink"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-sun-500"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={site.contact.phoneHref}
                className="fsl-nav-link hidden rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink xl:inline-flex"
              >
                {site.contact.phone}
              </a>
              <ButtonLink
                href={buildDonateUrl({ source: "header" })}
                target={donateLinkTarget}
                rel={donateLinkRel}
                variant="accent"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Donate
                <ArrowIcon />
              </ButtonLink>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="fsl-menu-toggle relative z-50 flex size-11 items-center justify-center rounded-full bg-white/70 ring-1 ring-ink/10 backdrop-blur transition hover:bg-white lg:hidden"
              >
                <span className="sr-only">
                  {menuOpen ? "Close menu" : "Open menu"}
                </span>
                <span aria-hidden="true" className="relative block h-3.5 w-5">
                  <span
                    className={cn(
                      "fsl-menu-bar absolute inset-x-0 top-0 h-0.5 rounded-full bg-ink transition-all duration-300 ease-[var(--ease-out-expo)]",
                      menuOpen && "top-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "fsl-menu-bar absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink transition-all duration-300 ease-[var(--ease-out-expo)]",
                      menuOpen && "bottom-1.5 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(170deg,#fdfcf8_0%,#eff6f6_54%,#d7eeec_100%)]" />

            <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {primaryNav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 + index * 0.05,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-baseline justify-between gap-4 border-b border-ink/10 py-4"
                      >
                        <span className="font-display text-3xl text-ink">
                          {item.label}
                        </span>
                        <span className="max-w-[52%] text-right text-xs text-ink-muted">
                          {item.description}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="mt-8 flex flex-col gap-3"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <ButtonLink
                  href={buildDonateUrl({ source: "mobile-menu" })}
                  target={donateLinkTarget}
                  rel={donateLinkRel}
                  variant="accent"
                  size="lg"
                >
                  Donate
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/programs" variant="secondary" size="lg">
                  Explore programs
                </ButtonLink>
              </motion.div>

              <div className="mt-auto pt-10 text-sm text-ink-muted">
                <a
                  href={site.contact.phoneHref}
                  className="block font-semibold text-ink"
                >
                  {site.contact.phone}
                </a>
                <a href={site.contact.emailHref} className="block">
                  {site.contact.email}
                </a>
                <p className="mt-2">{site.address.full}</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
