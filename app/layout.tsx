import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://windowprime.windowpro-begmail-com.chatgpt.site"),
  title: {
    default: "Windowprime | Ramen & deuren op maat",
    template: "%s | Windowprime",
  },
  description:
    "Hoogwaardige ramen en deuren op maat, professioneel geplaatst in heel België.",
  openGraph: {
    title: "Windowprime | Meer licht. Meer karakter.",
    description: "Ramen en deuren op maat, professioneel geplaatst in heel België.",
    type: "website",
    locale: "nl_BE",
    images: [{ url: "/og.png", width: 1536, height: 896, alt: "Windowprime ramen en deuren op maat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Windowprime | Meer licht. Meer karakter.",
    description: "Ramen en deuren op maat, professioneel geplaatst in heel België.",
    images: ["/og.png"],
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
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
