import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ask Solomon — Biblical Wisdom for What You're Facing Right Now",
  description:
    "Search for wisdom from Proverbs based on what you're feeling or going through. Ask Solomon gives you personalized, emotionally intelligent responses rooted in Scripture — and connected to the book Success Secrets of Solomon.",
  keywords: [
    "biblical wisdom",
    "Proverbs",
    "wisdom for anxiety",
    "Solomon wisdom",
    "Scripture for hard times",
    "biblical advice",
    "Proverbs for money",
    "wisdom for anger",
    "Success Secrets of Solomon",
    "Christian wisdom app",
  ],
  openGraph: {
    title: "Ask Solomon — Biblical Wisdom for What You're Facing Right Now",
    description:
      "Search Proverbs for wisdom based on what you're feeling. Personalized, emotionally intelligent responses rooted in Scripture.",
    url: "https://asksolomon.app",
    siteName: "Ask Solomon",
    type: "website",
    images: [
      {
        url: "https://asksolomon.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ask Solomon — Biblical Wisdom App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Solomon — Biblical Wisdom for What You're Facing Right Now",
    description:
      "Search Proverbs for wisdom based on what you're feeling. Personalized responses rooted in Scripture.",
    images: ["https://asksolomon.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://asksolomon.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://asksolomon.app/#app",
      name: "Ask Solomon",
      url: "https://asksolomon.app",
      description:
        "A biblical wisdom search tool built around the Book of Proverbs. Type what you are facing and receive personalized, Scripture-rooted guidance.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free to use. Optional lifetime unlock for $29.",
      },
      author: {
        "@id": "https://asksolomon.app/#author",
      },
    },
    {
      "@type": "Person",
      "@id": "https://asksolomon.app/#author",
      name: "John Craddock",
      url: "https://asksolomon.app",
      knowsAbout: ["Biblical wisdom", "Proverbs", "Christian living", "Leadership"],
    },
    {
      "@type": "Book",
      name: "Success Secrets of Solomon",
      author: {
        "@id": "https://asksolomon.app/#author",
      },
      numberOfPages: 247,
      description:
        "A 247-page devotional connecting every major life challenge to the principles Solomon actually lived by.",
      url: "https://asksolomon.app/book",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics — privacy-first, no cookies, GDPR compliant */}
        <Script
          defer
          data-domain="asksolomon.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
