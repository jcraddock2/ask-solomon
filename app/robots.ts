import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/book", "/giant", "/upgrade"],
        disallow: ["/success", "/api/"],
      },
    ],
    sitemap: "https://asksolomon.app/sitemap.xml",
  };
}
