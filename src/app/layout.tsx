import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { profile, socials } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

// Self-hosted variable fonts (no request to Google at runtime).
const display = localFont({ src: "../fonts/archivo-latin-wdth-normal.woff2", variable: "--font-display", weight: "100 900", display: "swap" });
const body = localFont({ src: "../fonts/geist-latin-wght-normal.woff2", variable: "--font-body", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../fonts/geist-mono-latin-wght-normal.woff2", variable: "--font-mono", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Muhammad Afshal Amir — Digital Marketing & Brand Growth Manager and AI-driven marketing strategist. Software engineer, brand builder and creative director with 5+ years across EV, fashion, IT, e-commerce, retail and corporate brands.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: `${profile.name} — Brand, Marketing, Web & AI`, template: `%s — ${profile.short}` },
  description,
  keywords: ["Afshal Amir", "Muhammad Afshal Amir", "digital marketing", "brand manager", "AI marketing", "WordPress developer", "graphic designer", "Lahore", "Pakistan"],
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} — Portfolio`, description, url: profile.site, siteName: profile.short },
  twitter: { card: "summary_large_image", title: `${profile.name} — Portfolio`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#060608", width: "device-width", initialScale: 1 };

const GA = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.short,
    jobTitle: profile.role,
    url: profile.site,
    sameAs: socials.filter((s) => s.url).map((s) => s.url),
    alumniOf: ["Superior University", "LUMS"],
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <body className="grain bg-bg text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        {GA ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');`}</Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
