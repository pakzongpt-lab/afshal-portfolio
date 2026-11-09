import Loader from "@/components/Loader";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import { Journey, Clients } from "@/components/sections/Journey";
import { StarX, Influencers, Awards } from "@/components/sections/Agency";
import StairsGame from "@/components/sections/StairsGame";
import { Automation } from "@/components/sections/SalesAI";
import WebsiteCheck from "@/components/sections/WebsiteCheck";
import { ContentEngine } from "@/components/sections/Content";
import Creative from "@/components/sections/Creative";
import Websites from "@/components/sections/Websites";
import Services from "@/components/sections/DevServices";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
        <WebsiteCheck />
        <StairsGame />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
