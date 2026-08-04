"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, Folder, Globe, ArrowRight } from "lucide-react";
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
  isLive: boolean;
}

const PINNED_REPOS = [
  "Portfolio_Website",
  "Accounting-App",
  "Invoice_App",
  "Online_Store",
  "CV-2.0",
  "school-management-system",
  "App",
];

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "Portfolio_Website": "Cinematic developer portfolio with shiny luxury dark design, full-bleed video hero, live GitHub integration, and scroll-driven animations. Currently live and deployed.",
  "Accounting-App": "Comprehensive double-entry financial accounting system built with TypeScript and modern web technologies.",
  "Invoice_App": "Professional automated invoice generator and payment tracker app with client management features.",
  "Online_Store": "Full-stack e-commerce store with product catalog, cart persistence, and secure checkout workflows.",
  "CV-2.0": "Interactive, highly customizable modern web resume builder with real-time preview and export.",
  "App": "Web development learning journey repository containing interactive full-stack code experiments.",
  "school-management-system": "Production-grade backend system for managing multi-role administrative workflows, students, and grading.",
};

const LIVE_URLS: Record<string, string> = {
  "Portfolio_Website": "https://muhammad-shayan001.github.io/Portfolio_Website",
  "Invoice_App": "https://drive.google.com/file/d/1T7IoJa66f_dW5s6iiZGGWGm3IB4NUweZ/view",
  "Online_Store": "https://drive.google.com/file/d/1QN7xIrpRTnZpaptaXDAQAK5olipr0b06/view",
};

const CARD_GRADIENTS = [
  "from-[#E10600]/20 to-[#D4AF37]/10",
  "from-[#D4AF37]/20 to-[#8B0000]/10",
  "from-[#8B0000]/20 to-[#E10600]/10",
  "from-[#E10600]/15 to-[#D4AF37]/15",
  "from-[#D4AF37]/15 to-[#8B0000]/15",
  "from-[#8B0000]/15 to-[#E10600]/15",
  "from-[#E10600]/10 to-[#D4AF37]/20",
];

function getCachedRepos(): Repo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem("gh_repos_cache");
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > 3600000) return null; // 1hr TTL
    return data;
  } catch { return null; }
}

function setCachedRepos(data: Repo[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("gh_repos_cache", JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedRepos();
    if (cached && cached.length > 0) {
      setRepos(cached);
      setLoading(false);
      return;
    }

    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/users/Muhammad-Shayan001/repos?sort=updated&per_page=100"
        );
        if (!res.ok) throw new Error("GitHub API error");
        const data = await res.json();

        const filtered: Repo[] = data
          .filter((r: any) => !r.fork || r.stargazers_count > 0)
          .map((r: any) => ({
            id: r.id,
            name: r.name,
            formattedTitle: r.name.replace(/[-_]/g, " "),
            description: r.description || FALLBACK_DESCRIPTIONS[r.name] || "Full-stack web application.",
            html_url: r.html_url,
            homepage: r.homepage || LIVE_URLS[r.name] || null,
            language: r.language || "TypeScript",
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            fork: r.fork,
            isLive: r.name === "Portfolio_Website",
          }));

        filtered.sort((a, b) => {
          const ai = PINNED_REPOS.indexOf(a.name);
          const bi = PINNED_REPOS.indexOf(b.name);
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return 0;
        });

        const topRepos = filtered.slice(0, 7);
        setCachedRepos(topRepos);
        setRepos(topRepos);
      } catch {
        const fallback: Repo[] = PINNED_REPOS.map((name, i) => ({
          id: i + 1, name,
          formattedTitle: name.replace(/[-_]/g, " "),
          description: FALLBACK_DESCRIPTIONS[name] || "Full-stack web application.",
          html_url: `https://github.com/Muhammad-Shayan001/${name}`,
          homepage: LIVE_URLS[name] || null,
          language: "TypeScript", stargazers_count: 0, forks_count: 0, fork: false,
          isLive: name === "Portfolio_Website",
        }));
        setRepos(fallback);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const displayRepos = repos.slice(0, 7);

  return (
    <section id="projects" className="relative bg-[#08080A] border-t border-white/5">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-4"
        >
          Featured <span className="text-gold">Projects</span>
        </motion.h2>
        <p className="text-zinc-400 font-light text-base max-w-xl">
          Live repositories fetched from GitHub. Scroll to explore each project in detail.
        </p>
      </div>

      {/* Stacked Card Scroll Container */}
      {loading ? (
        <div className="flex items-center justify-center py-40">
          <div className="w-10 h-10 rounded-full border-2 border-t-[#E10600] border-white/10 animate-spin" />
        </div>
      ) : (
        <div className="relative" style={{ height: `${displayRepos.length * 100}vh` }}>
          {displayRepos.map((repo, idx) => (
            <div
              key={repo.id}
              className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6"
              style={{ zIndex: idx + 10 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-gradient-to-br ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]}`}
                style={{ backdropFilter: "blur(20px)" }}
              >
                {/* Card inner background */}
                <div className="absolute inset-0 bg-[#0C0C10]/85 rounded-3xl" />

                <div className="relative z-10 p-8 sm:p-12 md:p-16">
                  {/* Top Row: badges */}
                  <div className="flex items-center gap-3 flex-wrap mb-8">
                    {repo.isLive && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E10600]/20 border border-[#FF2C2C]/50 text-[#FF2C2C] text-xs font-bold uppercase tracking-widest">
                        <Globe className="w-3.5 h-3.5" />
                        Live Project
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F5D577]">
                      {repo.language}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 ml-auto">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#F5D577]" />{repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" />{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Project Number */}
                  <div className="text-[120px] sm:text-[160px] font-black text-white/[0.03] absolute top-4 right-8 leading-none pointer-events-none select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-metallic capitalize tracking-tight mb-6 leading-tight">
                    {repo.formattedTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl mb-10">
                    {repo.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-red-gradient inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg shadow-red-900/40"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      {/* GitHub Profile CTA */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <a
          href="https://github.com/Muhammad-Shayan001"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red-gradient inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl shadow-red-900/40"
        >
          <FaGithub className="w-5 h-5 text-white" />
          <span>View All Repositories on GitHub</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </a>
      </div>
    </section>
  );
}
