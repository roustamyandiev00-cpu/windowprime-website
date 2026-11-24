import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DEFAULT_SITE_SETTINGS, seoKeywordList } from "@/lib/site-settings";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windowprime.be"),
  title: {
    default: DEFAULT_SITE_SETTINGS.seoTitle,
    template: "%s | Windowprime",
  },
  description: DEFAULT_SITE_SETTINGS.seoDescription,
  keywords: seoKeywordList(DEFAULT_SITE_SETTINGS.seoKeywords),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: DEFAULT_SITE_SETTINGS.seoTitle,
    description: DEFAULT_SITE_SETTINGS.seoDescription,
    type: "website",
    locale: "nl_BE",
    siteName: DEFAULT_SITE_SETTINGS.companyName,
    images: [{
      url: "/images/windowprime-hero.png",
      width: 1536,
      height: 896,
      alt: "Windowprime ramen en deuren op maat",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SITE_SETTINGS.seoTitle,
    description: DEFAULT_SITE_SETTINGS.seoDescription,
    images: ["/images/windowprime-hero.png"],
  },
  icons: {
    icon: "/images/windowprime-logo.png",
    shortcut: "/images/windowprime-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#101318",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
