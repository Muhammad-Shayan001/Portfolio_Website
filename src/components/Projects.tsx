"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  GitFork,
  ArrowLeft,
  ArrowRight,
  Folder,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Repo {
  id: number;
  name: string;
  formattedTitle: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  topics: string[];
}

const PINNED_REPOS = [
  "Accounting-App",
  "Invoice_App",
  "Online_Store",
  "CV-2.0",
  "Portfolio_Website",
  "App",
  "school-management-system",
];

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "Accounting-App": "Comprehensive double-entry financial accounting system built with TypeScript and modern web tech.",
  "Invoice_App": "Professional automated invoice generator and payment tracker app with client management features.",
  "Online_Store": "Full-stack e-commerce store with product catalog, cart persistence, and secure checkout workflows.",
  "CV-2.0": "Interactive, highly customizable modern web resume builder with real-time preview and export.",
  "Portfolio_Website": "Cinematic developer portfolio featuring shiny luxury dark design, video hero, and live GitHub integration.",
  "App": "Web development learning journey repository containing interactive full-stack code experiments.",
  "school-management-system": "Production-grade backend system for managing multi-role administrative workflows, students, and grading.",
};

const DEMO_URLS: Record<string, string> = {
  "Invoice_App": "https://drive.google.com/file/d/1T7IoJa66f_dW5s6iiZGGWGm3IB4NUweZ/view?usp=drive_link",
  "Online_Store": "https://drive.google.com/file/d/1QN7xIrpRTnZpaptaXDAQAK5olipr0b06/view?usp=drive_link",
  "Portfolio_Website": "https://github.com/Muhammad-Shayan001/Portfolio_Website",
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/users/Muhammad-Shayan001/repos?sort=updated&per_page=100"
        );

        if (!res.ok) throw new Error("Failed to fetch GitHub repos");
        const data = await res.json();

        const filtered = data
          .filter((repo: any) => !repo.fork || repo.stargazers_count > 0)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            formattedTitle: repo.name.replace(/[-_]/g, " "),
            description:
              repo.description ||
              FALLBACK_DESCRIPTIONS[repo.name] ||
              "Full-stack web application built with clean architecture and modern tools.",
            html_url: repo.html_url,
            homepage: repo.homepage || DEMO_URLS[repo.name] || null,
            language: repo.language || "TypeScript",
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            fork: repo.fork,
            topics: repo.topics || [],
          }));

        // Sort to bring pinned repos first
        filtered.sort((a: Repo, b: Repo) => {
          const aIndex = PINNED_REPOS.indexOf(a.name);
          const bIndex = PINNED_REPOS.indexOf(b.name);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });

        setRepos(filtered);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        const fallbackList: Repo[] = PINNED_REPOS.map((name, i) => ({
          id: i + 1,
          name,
          formattedTitle: name.replace(/[-_]/g, " "),
          description: FALLBACK_DESCRIPTIONS[name] || "Full Stack web application codebase.",
          html_url: `https://github.com/Muhammad-Shayan001/${name}`,
          homepage: DEMO_URLS[name] || null,
          language: "TypeScript",
          stargazers_count: 5,
          forks_count: 2,
          fork: false,
          topics: ["full-stack", "typescript"],
        }));
        setRepos(fallbackList);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const handleManualScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden">
      {/* Background Red Ambient Glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#E10600] to-transparent"></span>
          <span className="text-xs font-mono tracking-widest text-[#F5D577] uppercase">
            03 // Featured Case Studies
          </span>
        </motion.div>

        {/* Section Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic"
            >
              GitHub Powered <span className="text-gold">Live Codebases</span>
            </motion.h2>
            <p className="text-zinc-400 font-light text-sm mt-2 max-w-xl">
              Continuously auto-scrolling repository showcase fetched live from my GitHub account.
            </p>
          </div>

          {/* Marquee Manual Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleManualScroll("left")}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#8B0000]/40 hover:border-[#FF2C2C] text-white transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll("right")}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#8B0000]/40 hover:border-[#FF2C2C] text-white transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Moving Marquee Container */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-t-[#E10600] border-white/10 animate-spin"></div>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide py-4 px-6 relative cursor-grab active:cursor-grabbing"
        >
          <div className="animate-marquee flex items-center gap-6">
            {/* Repeat list twice for seamless continuous loop */}
            {[...repos, ...repos].map((repo, idx) => (
              <div
                key={`${repo.id}-${idx}`}
                className="w-[350px] sm:w-[420px] shrink-0 glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-300"
              >
                {/* Card Header & Language Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-[#F5D577] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#FF2C2C] border border-red-900/30">
                        {repo.language}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#F5D577]" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>

                  {/* Repo Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F5D577] transition-colors capitalize tracking-tight mb-3">
                    {repo.formattedTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 font-light line-clamp-3 leading-relaxed mb-6">
                    {repo.description}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-4 h-4 text-[#FF2C2C]" />
                    <span>View Code</span>
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold-outline px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Profile CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-12 text-center relative z-10">
        <a
          href="https://github.com/Muhammad-Shayan001"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red-gradient inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl shadow-red-900/40"
        >
          <FaGithub className="w-5 h-5 text-white" />
          <span>View All Repositories on GitHub</span>
          <ExternalLink className="w-4 h-4 text-white" />
        </a>
      </div>
    </section>
  );
}
