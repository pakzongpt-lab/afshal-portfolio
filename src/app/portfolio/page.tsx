import Loader from "@/components/Loader";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import { Journey, Clients } from "@/components/sections/Journey";
import { StarX, Influencers, Awards } from "@/components/sections/Agency";
import StairsGame from "@/components/sections/StairsGame";
import { Automation } from "@/components/sections/SalesAI";
import { ContentEngine } from "@/components/sections/Content";
import Creative from "@/components/sections/Creative";
import Websites from "@/components/sections/Websites";
import Services from "@/components/sections/DevServices";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Afshal Amir — Portfolio: Websites, Marketing & Branding Work" },
  description: "Portfolio of Afshal Amir, digital marketer and web developer in Lahore: 50+ websites, branding, social media, influencer campaigns and AI automation for brands in Pakistan, the UK, the US, the UAE and Canada.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <>
      <Loader />
      <main id="main">
        <Hero />
        <Websites />
        <Clients />
        <About />
        <Journey />
        <Services />
        <Proof />
        <Influencers />
        <StarX />
        <Creative />
        <ContentEngine />
        <Automation />
        <StairsGame />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
