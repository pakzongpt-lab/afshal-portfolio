import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { profile, socials } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import TestSiteFloat from "@/components/TestSiteFloat";
import Nav from "@/components/Nav";
import { ContactProvider } from "@/components/ui/ContactModal";
import { starx } from "@/data/v2";

// Self-hosted variable fonts (no request to Google at runtime).
const display = localFont({ src: "../fonts/bricolage-grotesque-latin-standard-normal.woff2", variable: "--font-display", weight: "200 800", display: "swap" });
const body = localFont({ src: "../fonts/source-sans-3-latin-wght-normal.woff2", variable: "--font-body", weight: "200 900", display: "swap" });
const mono = localFont({ src: "../fonts/geist-mono-latin-wght-normal.woff2", variable: "--font-mono", weight: "100 900", display: "swap" });

const description =
  "Afshal Amir is a digital marketer and web developer in Lahore, Pakistan. Websites, Shopify stores, branding, social media, SEO, ads and AI automation for brands in Pakistan, the UK, the US, the UAE and Canada.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: "Afshal Amir — Digital Marketer & Web Developer in Lahore, Pakistan", template: `%s — ${profile.short}` },
  description,
  applicationName: "Afshal Amir Portfolio",
  keywords: [
    "Afshal Amir", "Muhammad Afshal Amir", "Afshal Amir Lahore", "Afshal Amir portfolio", "Star X Marketing",
    "digital marketing expert Lahore", "digital marketer Pakistan", "web developer Lahore", "website designer Lahore",
    "WordPress developer Lahore", "Elementor developer", "Shopify developer Pakistan", "e-commerce website Pakistan",
    "SEO expert Lahore", "GEO generative engine optimization", "social media marketing Lahore", "social media manager Pakistan",
    "branding and logo design Lahore", "influencer marketing Pakistan", "Meta ads expert Pakistan", "Google Ads Pakistan",
    "AI automation Pakistan", "AI chatbot for business", "WhatsApp automation", "n8n automation", "marketing director Lahore",
    "freelance web developer Pakistan", "website for business UK", "remote marketing consultant",
  ],
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  publisher: profile.name,
  category: "Marketing and web development",
  formatDetection: { telephone: true, email: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
  openGraph: { type: "profile", firstName: "Afshal", lastName: "Amir", locale: "en_US", title: "Afshal Amir — Digital Marketer & Web Developer", description, url: profile.site, siteName: "Afshal Amir" },
  twitter: { card: "summary_large_image", title: "Afshal Amir — Digital Marketer & Web Developer", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0f0f0f", width: "device-width", initialScale: 1 };

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
    image: `${profile.site}/img/me-suit.webp`,
    email: `mailto:${profile.email}`,
    telephone: "+92 342 0757848",
    hasCredential: ["BS Software Engineering — Superior University, Lahore", "Digital Marketing — LUMS", "Google certification", "AWS Certified AI Practitioner (Foundational)"],
    hasOccupation: [{ "@type": "Occupation", name: "Digital Marketing Manager", occupationLocation: { "@type": "City", name: "Lahore" } }, { "@type": "Occupation", name: "Web Developer", occupationLocation: { "@type": "City", name: "Lahore" } }],
    nationality: { "@type": "Country", name: "Pakistan" },
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    sameAs: socials.filter((s) => s.url).map((s) => s.url),
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Superior University" }, { "@type": "CollegeOrUniversity", name: "Lahore University of Management Sciences" }],
    worksFor: { "@id": `${profile.site}/#starx` },
    award: ["Best Performance Award — Jolta Electric (2025)", "Employee of the Year — SA Corporation", "Final Project Excellence Award — LUMS"],
    knowsAbout: ["Digital marketing", "Brand development", "Logo design", "Social media marketing", "Website development", "WordPress", "Elementor", "Shopify", "WooCommerce", "E-commerce", "SEO", "Generative engine optimization", "Meta Ads", "Google Ads", "TikTok Ads", "AI automation", "AI chatbots", "n8n", "Influencer marketing", "Content creation", "Video editing"],
  };
  const org = {
    "@type": "ProfessionalService",
    "@id": `${profile.site}/#starx`,
    name: starx.name,
    url: starx.site,
    sameAs: [starx.instagram],
    logo: `${profile.site}/work/logo-starx.webp`,
    areaServed: ["PK", "GB", "US", "AE", "CA", "Worldwide"],
    employee: { "@id": `${profile.site}/#person` },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Digital growth services", itemListElement: starx.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })) },
  };
  const site = { "@type": "WebSite", "@id": `${profile.site}/#website`, url: profile.site, name: "Afshal Amir", alternateName: "Afshal Portfolio", inLanguage: "en", publisher: { "@id": `${profile.site}/#person` } };
  const page = { "@type": "ProfilePage", "@id": `${profile.site}/#page`, url: profile.site, name: "Afshal Amir — Digital Marketer & Web Developer in Lahore", isPartOf: { "@id": `${profile.site}/#website` }, mainEntity: { "@id": `${profile.site}/#person` }, primaryImageOfPage: `${profile.site}/img/me-suit.webp`, dateModified: "2026-11-10" };
  const serviceList = ["Website design and development", "Shopify and WooCommerce stores", "Web portals, dashboards and CRMs", "SaaS products and mobile apps", "Branding and logo design", "Social media marketing", "SEO and GEO", "Meta, Google and TikTok ads", "Influencer marketing", "Content creation and video", "AI chatbots and automation"];
  const services = { "@type": "ItemList", "@id": `${profile.site}/#services`, name: "Services by Afshal Amir", itemListElement: serviceList.map((name, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name, provider: { "@id": `${profile.site}/#person` }, areaServed: ["Pakistan", "United Kingdom", "United States", "United Arab Emirates", "Canada"] } })) };
  const jsonLd = { "@context": "https://schema.org", "@graph": [person, org, site, page, services] };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain bg-bg text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <CursorGlow />
        <ContactProvider>
          <Nav />
          {children}
        </ContactProvider>
        <WhatsAppFloat />
        <TestSiteFloat />
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
