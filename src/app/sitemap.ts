import type { MetadataRoute } from "next";
import { programs } from "@/lib/programs";
import { site } from "@/lib/site";

/**
 * XML sitemap, generated from the same data that renders the pages — so a new
 * program is submitted to search engines the moment it is added to the catalog.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/programs", priority: 0.9, changeFrequency: "weekly" },
    { path: "/donate", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/get-involved", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, site.url).toString(),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: new URL(`/programs/${program.slug}`, site.url).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
