import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marquee-app.example.com"),
  title: "Marquee — Movie & TV Show Tracker for iPhone",
  description:
    "Marquee is a beautiful movie and TV show tracker for iPhone. Mark episodes watched, follow every series, sync privately over iCloud, and always know what to watch next.",
  keywords: [
    "movie tracker",
    "TV show tracker",
    "watchlist",
    "episode tracker",
    "iPhone app",
    "cinema",
  ],
  authors: [{ name: "Marquee" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marquee-app.example.com",
    siteName: "Marquee",
    title: "Marquee — Movie & TV Show Tracker for iPhone",
    description:
      "Keep everything you're watching in one beautiful place. Discover your next favorite, track every episode, and never lose your place again.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Marquee — Movie & TV Show Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marquee — Movie & TV Show Tracker for iPhone",
    description:
      "Keep everything you're watching in one beautiful place. Track every episode and never lose your place again.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
