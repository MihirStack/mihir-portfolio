import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://mihirborsaniya.dev/sitemap.xml",
    host: "https://mihirborsaniya.dev",
  };
}
