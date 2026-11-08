import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { profile, socials } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import { ContactProvider } from "@/components/ui/ContactModal";
import { faqs, starx } from "@/data/v2";

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
  "Afshal Amir — digital marketing & brand growth manager, AI automation specialist and Marketing Director at Star X Marketing in Lahore. Branding, websites, SEO/GEO, content, ads and AI agents that grow businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: "Afshal Amir — Marketing, Branding, Websites & AI Automation", template: `%s — ${profile.short}` },
  description,
  keywords: ["Afshal Amir", "Muhammad Afshal Amir", "Star X Marketing", "digital marketing Lahore", "brand growth manager", "AI automation", "AI chatbot", "website development", "SEO GEO", "social media marketing Pakistan", "influencer marketing", "Marketing Director"],
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} — Portfolio`, description, url: profile.site, siteName: profile.short },
  twitter: { card: "summary_large_image", title: `${profile.name} — Portfolio`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#060608", width: "device-width", initialScale: 1 };

const GA = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@type": "Person",
    "@id": `${profile.site}/#person`,
    name: profile.name,
    alternateName: profile.short,
    jobTitle: [profile.role, "Marketing Director"],
    description,
    url: profile.site,
    image: `${profile.site}/img/hero.webp`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    sameAs: socials.filter((s) => s.url).map((s) => s.url),
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Superior University" }, { "@type": "CollegeOrUniversity", name: "Lahore University of Management Sciences" }],
    worksFor: { "@id": `${profile.site}/#starx` },
    award: ["Best Performance Award — Jolta Electric (2025)", "Employee of the Year — SA Corporation", "Final Project Excellence Award — LUMS"],
    knowsAbout: ["Digital marketing", "Brand development", "Social media marketing", "Website development", "WordPress", "SEO", "Generative engine optimization", "AI automation", "Influencer marketing", "Content creation"],
  };
  const org = {
    "@type": "ProfessionalService",
    "@id": `${profile.site}/#starx`,
    name: starx.name,
    url: starx.site,
    sameAs: [starx.instagram],
    logo: `${profile.site}/work/logo-starx.webp`,
    areaServed: ["PK", "GB", "CA", "Worldwide"],
    employee: { "@id": `${profile.site}/#person` },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Digital growth services", itemListElement: starx.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })) },
  };
  const faq = { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const site = { "@type": "WebSite", "@id": `${profile.site}/#website`, url: profile.site, name: "Afshal Portfolio", publisher: { "@id": `${profile.site}/#person` } };
  const jsonLd = { "@context": "https://schema.org", "@graph": [person, org, site, faq] };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <body className="grain bg-bg text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <Cursor />
        <ContactProvider>
          <Nav />
          {children}
        </ContactProvider>
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
