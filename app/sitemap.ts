import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://asksolomon.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://asksolomon.app/upgrade",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://asksolomon.app/book",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/book-index",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://asksolomon.app/giant",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://asksolomon.app/proverbs-for-anxiety",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/biblical-wisdom-for-job-loss",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-marriage",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  
    {
      url: "https://asksolomon.app/biblical-wisdom-for-loneliness",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-anger",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-failure",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-leadership",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
      {
      url: "https://asksolomon.app/biblical-wisdom-for-laziness-and-procrastination",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-relationships",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://asksolomon.app/proverbs-for-diligence",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
];
}
