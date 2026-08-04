import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#08080A] min-h-screen text-[#F1F1F3] overflow-x-hidden">
      {/* Background Subtle Radial Glow Texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      ></div>

      {/* Fixed Blurred Glass Navbar */}
      <Navbar />

      {/* Hero Section with Video Background */}
      <Hero />

      {/* About Section & Stats */}
      <About />

      {/* Skills / Technical Arsenal */}
      <Skills />

      {/* GitHub-Powered Horizontal Moving Projects Marquee */}
      <Projects />

      {/* Experience Timeline */}
      <Experience />

      {/* Education & Certifications */}
      <Education />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
