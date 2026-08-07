import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getFeaturedLiveProjects,
  filterArchiveProjects,
} from "@/components/project-stack-data";
import {
  getFallbackLiveProjects,
  splitProjects,
} from "@/components/githubProjects";

// Data is fully static — resolved at build time, no per-request network call.
// This lets Next.js render the page as a static route on Vercel, so first
// paint is instant on every visit. The dynamic GitHub repo list is fetched
// client-side from /api/github-repos by AllRepositoriesMarquee so the build
// worker is never asked to hold the remote payload in memory. The fallback
// below is a tiny, hand-curated list of 16 repos — it's the seed the marquee
// shows while /api/github-repos warms up on the client.
const liveProjects = getFeaturedLiveProjects();
const fallbackArchive = filterArchiveProjects(
  splitProjects(getFallbackLiveProjects()).archiveProjects
);

export default function Home() {
  return (
    <main className="relative bg-[#08080A] min-h-screen text-[#F1F1F3] overflow-x-hidden">
      {/* Background Subtle Radial Glow Texture — defined in globals.css so
          the long data: URL isn't embedded in the JS module graph that the
          Webpack build worker has to hold in memory. */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-noise" />

      {/* Hero Section with Video Background */}
      <Hero />

      {/* About Section & Stats */}
      <About />

      {/* Skills / Technical Arsenal */}
      <Skills />

      {/* Scroll-Driven Projects Stack */}
      <Projects
        liveProjects={liveProjects}
        archiveProjects={fallbackArchive}
      />

      {/* Education & Certifications */}
      <Education />

      {/* Experience Timeline */}
      {/* <Experience /> */}

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

