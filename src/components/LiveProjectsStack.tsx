"use client";

import { ExternalLink, Star, GitFork, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectRepo } from "./githubProjects";

export default function LiveProjectsStack({ liveProjects }: { liveProjects: ProjectRepo[] }) {
  if (liveProjects.length === 0) {
    return <div className="mx-auto max-w-7xl px-6 py-16 text-zinc-400">No live GitHub projects were found.</div>;
  }

  return (
    <section className="relative">
      {liveProjects.map((project, index) => (
        <div
          key={project.id}
          className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6"
          style={{ zIndex: index + 1 }}
        >
          <article className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#12090A] via-[#0B0B0F] to-[#1A1308] border border-white/10 shadow-2xl shadow-black/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,6,0,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,213,119,0.14),transparent_28%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.16)_0%,rgba(8,8,10,0.55)_60%,rgba(8,8,10,0.94)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2C2C]/50 bg-[#E10600]/18 px-4 py-1.5 shadow-lg shadow-red-950/35">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2C2C] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF2C2C]" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF2C2C]">Live Project</span>
                </div>

                <div className="flex items-center gap-4 rounded-full border border-white/5 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-[#F5D577]" />
                    {project.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GitFork className="h-3.5 w-3.5 text-zinc-400" />
                    {project.forks_count}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-center py-10">
                <div className="pointer-events-none absolute right-0 top-0 select-none text-[clamp(5rem,16vw,12rem)] font-black leading-none text-white/[0.04]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="mb-4 text-xs uppercase tracking-[0.45em] text-zinc-400">
                  Project {index + 1} of {liveProjects.length}
                </p>

                <h3 className="max-w-4xl text-4xl font-black tracking-tight text-metallic sm:text-6xl lg:text-7xl">
                  {project.formattedTitle}
                </h3>

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {(project.language ? [project.language, "Live project", "Featured case study"] : ["Live project", "Featured case study"]).map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-200"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-red-gradient inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-950/60"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Visit Live Site</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <FaGithub className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </div>

                <div className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">Sticky stack</div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
