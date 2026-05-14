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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics — privacy-first, no cookies, GDPR compliant */}
        {/* Register your domain at plausible.io to activate tracking */}
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
