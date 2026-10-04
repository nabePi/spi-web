import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getAllAlbumSlugs } from "@/lib/getGallery";

/** All public routes, relative to the site origin. */
const routes = [
  "/",
  "/about-v1",
  "/about-v1/sejarah",
  "/about-v1/visi-misi-pemikiran",
  "/about-v1/pengajar",
  "/alumni",
  "/courses-v1",
  "/course-details-classic-v1",
  "/kursus-singkat",
  "/komik-intensif",
  "/tuesdays-special",
  "/blog-three-column",
  "/events",
  "/papers",
  "/galeri",
  "/pengajar",
  "/cabang",
  "/blog-details-standard",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const albumSlugs = await getAllAlbumSlugs();
  return [...routes, ...albumSlugs.map((slug) => `/galeri/${slug}`)].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
