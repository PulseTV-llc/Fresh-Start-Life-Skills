import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { indexingAllowed } from "@/lib/deployment";

export default function robots(): MetadataRoute.Robots {
  // Preview hosts (*.vercel.app) are closed off entirely — see lib/deployment.ts.
  if (!indexingAllowed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing sensitive lives here yet; keep API routes out of the index.
        disallow: ["/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
