"use client";

import { useEffect, useState } from "react";
import { ArrowRight, GitFork, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { ProjectRepo } from "./githubProjects";

// Cap the rendered marquee to keep both initial render and drag animation cheap.
// The full GitHub list (potentially hundreds of repos) is filtered server-side
// and trimmed here before it ever reaches the React tree. The most recently
// updated repos surface first because the route sorts by `updated_at`.
const MAX_VISIBLE_REPOS = 30;

function ArchiveRepoCard({ project }: { project: ProjectRepo }) {
  return (
    <article className="group relative h-full min-w-[320px] max-w-[360px] flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B0B0F]/90 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-transparent hover:shadow-red-950/30">
      {project.imageUrl ? (
        <div className="relative h-44 overflow-hidden rounded-t-[1.75rem]">
          <img
            src={project.imageUrl}
            alt={`${project.formattedTitle} preview`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      ) : (
        <div className="relative h-44 rounded-t-[1.75rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,6,0,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,213,119,0.12),transparent_30%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%,rgba(255,255,255,0.01))]" />
      <div className="absolute inset-0 rounded-[1.75rem] border border-white/5 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#E10600]/70 group-hover:via-[#D4AF37]/40 group-hover:to-[#8B0000]/70" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-5 pt-6">
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

export default function AllRepositoriesMarquee({
  initialArchiveProjects,
}: {
  // Server-rendered fallback used until the client fetch resolves. The
  // marquee is intentionally lightweight on first paint so the Webpack build
  // worker never has to compile the live GitHub payload.
  initialArchiveProjects?: ProjectRepo[];
}) {
  const [archiveProjects, setArchiveProjects] = useState<ProjectRepo[]>(
    () => initialArchiveProjects ?? []
  );

  // Fetch the live repo list from the local route handler after mount so the
  // build worker is never asked to hold the GitHub payload. The route handler
  // caps pagination and caches responses for an hour.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-repos", { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<ProjectRepo[]>;
      })
      .then((repos) => {
        if (cancelled) return;
        if (Array.isArray(repos) && repos.length > 0) {
          setArchiveProjects(repos);
        }
      })
      .catch(() => {
        // Silent fallback: keep the server-rendered list (or empty) so the
        // page never breaks if the route handler is rate-limited.
        if (cancelled) return;
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Cap the rendered list so the marquee can't blow up if the GitHub account
  // grows. The route already sorts by `updated_at`, so the head is the most
  // recent work.
  const visibleProjects = archiveProjects.slice(0, MAX_VISIBLE_REPOS);

  if (visibleProjects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-zinc-400">
        No archived repositories were found.
      </div>
    );
  }

  // Render the visible list once inside a CSS-animated track. The CSS
  // `marquee` keyframe duplicates the strip via the `attr` trick below (a
  // second copy of the children lives inside a `aria-hidden` slot) so the
  // loop is visually seamless without forcing the React tree to duplicate the
  // entire DOM. Hovering pauses the animation, matching the existing
  // `.animate-marquee:hover` rule.
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,6,0,0.06),transparent_30%)] pointer-events-none" />

      <div className="px-6 pb-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0E]/80 p-4 shadow-2xl shadow-black/30">
          <div
            className="flex w-max items-stretch gap-5 select-none animate-marquee"
            role="list"
            aria-label="All GitHub repositories"
          >
            {visibleProjects.map((project, index) => (
              <div
                key={`a-${project.id}-${index}`}
                className="w-[340px] shrink-0"
                role="listitem"
              >
                <ArchiveRepoCard project={project} />
              </div>
            ))}
            {/* Second copy for the seamless CSS loop. Marked aria-hidden so
                screen readers don't announce duplicates. */}
            {visibleProjects.map((project, index) => (
              <div
                key={`b-${project.id}-${index}`}
                className="w-[340px] shrink-0"
                aria-hidden
              >
                <ArchiveRepoCard project={project} />
              </div>
            ))}
          </div>
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
