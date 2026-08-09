import { SiteChrome } from "@/components/layout/SiteChrome";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { CyberCity } from "@/components/three/hero/CyberCity";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* One shared deep-space backdrop behind the whole page — the hero's
          atmosphere on every section. Fixed so it's painted once and stays put
          during scroll; lives outside <main> because <main> is transformed
          (camera-shake), which would otherwise break `position: fixed`. */}
      <AuroraBackground moonlight fixed />
      {/* The hero's animated energy-network, promoted to a shared layer so its
          drifting nodes + travelling pulses sit behind every section. Fixed and
          above the aurora (−z-[5] vs −z-10) but behind all content. */}
      <CyberCity className="pointer-events-none fixed inset-0 -z-[5] h-full w-full opacity-60" />
      <SiteChrome />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
