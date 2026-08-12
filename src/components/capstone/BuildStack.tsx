import { buildModules, type BuildModule } from "@/lib/capstone";
import { RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The eight-week build, as a climb.
 *
 * Every module's detail is rendered in the DOM rather than hidden behind a
 * disclosure — this is the page's substance and the text search engines will
 * weigh, so collapsing it would be trading real reach for a little tidiness.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const glyphs: Record<BuildModule["glyph"], React.ReactNode> = {
  website: (
    <>
      <rect {...stroke} x="4" y="6" width="24" height="20" rx="3" />
      <path {...stroke} d="M4 12h24" />
      <circle cx="8" cy="9" r="1" fill="currentColor" />
      <circle cx="11.5" cy="9" r="1" fill="currentColor" />
      <path {...stroke} d="M9 17h8M9 21h13" opacity="0.6" />
    </>
  ),
  mobile: (
    <>
      <rect {...stroke} x="6" y="3" width="13" height="26" rx="3" />
      <path {...stroke} d="M11 6.5h3" />
      <rect {...stroke} x="19" y="11" width="8" height="15" rx="2.4" opacity="0.55" />
    </>
  ),
  auth: (
    <>
      <rect {...stroke} x="6" y="14" width="20" height="14" rx="3" />
      <path {...stroke} d="M10.5 14v-4a5.5 5.5 0 0 1 11 0v4" />
      <circle {...stroke} cx="16" cy="21" r="2" />
    </>
  ),
  database: (
    <>
      <ellipse {...stroke} cx="16" cy="8" rx="10" ry="4" />
      <path {...stroke} d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
      <path {...stroke} d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" />
    </>
  ),
  code: (
    <>
      <path {...stroke} d="m11 10-7 6 7 6" />
      <path {...stroke} d="m21 10 7 6-7 6" />
      <path {...stroke} d="m18.5 7-5 18" opacity="0.65" />
    </>
  ),
  payments: (
    <>
      <rect {...stroke} x="3" y="7" width="26" height="18" rx="3" />
      <path {...stroke} d="M3 13h26" />
      <path {...stroke} d="M7 19h5" />
      <circle {...stroke} cx="23" cy="19" r="2.4" opacity="0.7" />
    </>
  ),
  deploy: (
    <>
      <path
        {...stroke}
        d="M16 3c4.5 3.4 6.8 8 6.8 13.8L16 22l-6.8-5.2C9.2 11 11.5 6.4 16 3Z"
      />
      <circle {...stroke} cx="16" cy="12.5" r="2.6" />
      <path {...stroke} d="m11.5 23-2.5 5 5-2M20.5 23l2.5 5-5-2" opacity="0.7" />
    </>
  ),
};

const accents: Record<
  BuildModule["accent"],
  { node: string; chip: string; glow: string }
> = {
  sun: { node: "bg-sun-400 text-ink", chip: "bg-sun-400/15 text-sun-200", glow: "bg-sun-400/20" },
  green: { node: "bg-green-400 text-green-900", chip: "bg-green-400/15 text-green-200", glow: "bg-green-400/20" },
  teal: { node: "bg-teal-400 text-teal-900", chip: "bg-teal-400/15 text-teal-100", glow: "bg-teal-400/20" },
  navy: { node: "bg-navy-300 text-navy-900", chip: "bg-navy-300/15 text-navy-100", glow: "bg-navy-300/20" },
};

export function BuildStack() {
  return (
    <RevealGroup className="relative" stagger={0.07}>
      {/* The spine — the climb from first page to live deployment */}
      <span
        aria-hidden="true"
        className="absolute bottom-10 left-[1.4rem] top-10 w-px bg-gradient-to-b from-teal-400/50 via-cream/20 to-sun-400/60 sm:left-[1.65rem]"
      />

      <ol className="flex flex-col gap-4">
        {buildModules.map((module, index) => {
          const accent = accents[module.accent];
          return (
            <RevealChild key={module.id} as="li">
              <div className="group relative flex gap-5 sm:gap-6">
                <span
                  className={cn(
                    "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] sm:size-[3.3rem]",
                    accent.node,
                  )}
                >
                  <svg viewBox="0 0 32 32" className="size-5 sm:size-6" aria-hidden="true">
                    {glyphs[module.glyph]}
                  </svg>
                </span>

                <div className="flex-1 rounded-[1.25rem] bg-cream/[0.055] p-6 ring-1 ring-cream/12 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-cream/[0.09] group-hover:ring-cream/25 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em]",
                        accent.chip,
                      )}
                    >
                      {module.step}
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/40">
                      Step {index + 1} of {buildModules.length}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl leading-snug text-white">
                    {module.title}
                  </h3>
                  <p className="mt-1.5 font-display text-lg text-sun-200/90">
                    {module.plain}
                  </p>
                  <p className="mt-3 leading-relaxed text-cream/75">{module.detail}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {module.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-center gap-2 rounded-full bg-cream/[0.08] px-3 py-1.5 text-[0.8rem] text-cream/85"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="size-3.5 shrink-0 text-teal-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden="true"
                        >
                          <path
                            d="m4 10.4 3.2 3.2L16 5.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealChild>
          );
        })}
      </ol>
    </RevealGroup>
  );
}
