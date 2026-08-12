import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

/** Warm, characterful serif for headlines — hopeful rather than institutional. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

/** Humanist sans with open counters — highly legible at small sizes. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Vocational & Life Skills Training in Alexandria, LA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Nonprofit",
  keywords: [
    "Fresh Start Life Skills",
    "nonprofit Alexandria Louisiana",
    "after school program Alexandria LA",
    "life skills training for kids",
    "vocational training youth Louisiana",
    "free sewing classes for kids",
    "financial literacy for children",
    "youth programs Pineville LA",
    "501c3 nonprofit central Louisiana",
  ],
  alternates: { canonical: site.url },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.legalName,
    title: `${site.name} — Learn, Explore & Grow`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Learn, Explore & Grow`,
    description: site.description,
  },
  // Favicons are auto-wired from src/app/icon.svg and src/app/apple-icon.tsx.
  // TODO(Darius): drop in the Search Console token once the property is claimed.
  // verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfcf8" },
    { media: "(prefers-color-scheme: dark)", color: "#012f38" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
