import dynamic from "next/dynamic";
import type { ProjectCardData } from "./project-stack-data";
import type { ProjectRepo } from "./githubProjects";

// ProjectStack and AllRepositoriesMarquee use browser-only APIs (GSAP,
// Lenis, framer-motion runtime), so they are dynamically imported and the
// wrapper renders lightweight loading fallbacks while the chunks download.
const ProjectStack = dynamic(() => import("./ProjectStack"), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center text-zinc-400">
      Loading featured projects...
    </div>
  ),
});

const AllRepositoriesMarquee = dynamic(() => import("./AllRepositoriesMarquee"), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center text-zinc-400">
      Loading archived repositories...
    </div>
  ),
});

export default function Projects({
  liveProjects,
  archiveProjects,
}: {
  liveProjects: ProjectCardData[];
  archiveProjects: ProjectRepo[];
}) {
  return (
    <section id="projects" className="relative bg-[#08080A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-4">
          Featured <span className="text-gold">Projects</span>
        </h2>
        <p className="text-zinc-400 font-light text-base max-w-2xl">
          Scroll-driven case studies with pinned full-screen cards. Screenshots can be wired in per project.
        </p>
      </div>

      <ProjectStack projects={liveProjects} />

      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Archive</p>
          <h3 className="mt-3 text-3xl font-extrabold text-metallic sm:text-4xl">Past repositories and side projects</h3>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            A continuously updated showcase of archived GitHub repos, available as a scrollable marquee for quick browsing.
          </p>
        </div>
      </div>

      <AllRepositoriesMarquee archiveProjects={archiveProjects} />
    </section>
  );
}
