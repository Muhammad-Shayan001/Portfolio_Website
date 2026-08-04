"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ArrowRight, GitFork, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectRepo } from "./githubProjects";

const MARQUEE_SPEED = 35;

function ArchiveRepoCard({ project }: { project: ProjectRepo }) {
  return (
    <article className="group relative h-full min-w-[320px] max-w-[360px] flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B0B0F]/90 p-5 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-transparent hover:shadow-red-950/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,6,0,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,213,119,0.12),transparent_30%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%,rgba(255,255,255,0.01))]" />
      <div className="absolute inset-0 rounded-[1.75rem] border border-white/5 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#E10600]/70 group-hover:via-[#D4AF37]/40 group-hover:to-[#8B0000]/70" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300">
              {project.language || "Code"}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
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

          <h3 className="mt-5 text-2xl font-black tracking-tight text-metallic">
            {project.formattedTitle}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider"
          >
            <FaGithub className="h-4 w-4" />
            <span>View Code</span>
          </a>

          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Archive</span>
        </div>
      </div>
    </article>
  );
}

export default function AllRepositoriesMarquee({ archiveProjects }: { archiveProjects: ProjectRepo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [singleTrackWidth, setSingleTrackWidth] = useState(0);

  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    const updateWidth = () => {
      setSingleTrackWidth(element.scrollWidth / 2);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, [archiveProjects]);

  useAnimationFrame((_, delta) => {
    if (isDragging || singleTrackWidth === 0) return;

    const moveBy = (MARQUEE_SPEED * delta) / 1000;
    const next = x.get() - moveBy;

    if (Math.abs(next) >= singleTrackWidth) {
      x.set(next + singleTrackWidth);
      return;
    }

    x.set(next);
  });

  if (archiveProjects.length === 0) {
    return <div className="mx-auto max-w-7xl px-6 py-16 text-zinc-400">No archived repositories were found.</div>;
  }

  const repeatedProjects = [...archiveProjects, ...archiveProjects];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,6,0,0.06),transparent_30%)] pointer-events-none" />

      <div className="px-6 pb-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0E]/80 p-4 shadow-2xl shadow-black/30">
          <motion.div
            ref={trackRef}
            drag="x"
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              if (singleTrackWidth === 0) return;

              let current = x.get();
              while (current <= -singleTrackWidth) current += singleTrackWidth;
              while (current > 0) current -= singleTrackWidth;
              x.set(current);
            }}
            style={{ x, cursor: isDragging ? "grabbing" : "grab" }}
            className="flex w-max items-stretch gap-5 select-none"
          >
            {repeatedProjects.map((project, index) => (
              <div key={`${project.id}-${index}`} className="w-[340px] shrink-0">
                <ArchiveRepoCard project={project} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-14 text-center">
        <a
          href="https://github.com/Muhammad-Shayan001"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red-gradient inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-wider shadow-xl shadow-red-950/60"
        >
          <FaGithub className="h-5 w-5 text-white" />
          <span>View Full GitHub Profile</span>
          <ArrowRight className="h-4 w-4 text-white" />
        </a>
      </div>
    </section>
  );
}
