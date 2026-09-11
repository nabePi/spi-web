import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/** All public routes, relative to the site origin. */
const routes = [
  "/",
  "/about-v1",
  "/blog-three-column",
  "/blog-details-standard",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
