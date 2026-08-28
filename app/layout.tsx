import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = "https://zeenat.xinuty.com";
const title = "Zeenat.js | Website Decorations for React, Next.js & JavaScript";
const description =
  "Add tasteful seasonal and occasion-aware decorations to React, Next.js and vanilla JavaScript websites with the open-source Zeenat.js library.";
const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Zeenat.js" },
  description,
  applicationName: "Zeenat.js",
  authors: [{ name: "Talha", url: "https://github.com/Talha-Naveed" }],
  creator: "Talha",
  keywords: ["Zeenat.js", "website decoration library", "React seasonal effects", "Next.js website effects", "JavaScript holiday decorations", "TypeScript animation effects"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zeenat.js",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zeenat.js — Adorn the web." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: !isPreview, follow: !isPreview },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071d1a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
