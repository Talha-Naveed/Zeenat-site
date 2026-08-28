import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zeenat.js",
    short_name: "Zeenat",
    description: "Adorn the web with tasteful, occasion-aware decorations.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3e8",
    theme_color: "#071d1a",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
