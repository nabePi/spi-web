import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5f2",
    theme_color: "#0065b5",
    icons: [
      {
        src: "/assets/imgs/favicon.webp",
        sizes: "102x102",
        type: "image/webp",
      },
    ],
  };
}
