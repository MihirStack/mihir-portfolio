import CursorGlow from "@/components/shared/CursorGlow";
import ParticleField from "@/components/shared/ParticleField";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import DevOps from "@/components/sections/DevOps";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <CursorGlow />
      <ParticleField />
      <ScrollProgress />
      <Navbar />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <CaseStudies />
      <DevOps />
      <GitHub />
      <Contact />

      <Footer />
    </main>
  );
}
