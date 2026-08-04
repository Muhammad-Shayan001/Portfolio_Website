"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Star, GitFork, Globe, ArrowRight, Folder } from "lucide-react";
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
  "from-[#E10600]/25 via-[#0A0A0E] to-[#D4AF37]/15",
  "from-[#D4AF37]/25 via-[#0A0A0E] to-[#8B0000]/15",
  "from-[#8B0000]/25 via-[#0A0A0E] to-[#E10600]/15",
  "from-[#E10600]/20 via-[#0A0A0E] to-[#D4AF37]/20",
  "from-[#D4AF37]/20 via-[#0A0A0E] to-[#8B0000]/20",
  "from-[#8B0000]/20 via-[#0A0A0E] to-[#E10600]/20",
  "from-[#E10600]/15 via-[#0A0A0E] to-[#D4AF37]/25",
];

function getCachedRepos(): Repo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem("gh_repos_cache_v2");
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > 3600000) return null; // 1hr TTL
    return data;
  } catch {
    return null;
  }
}

function setCachedRepos(data: Repo[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("gh_repos_cache_v2", JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

// Single Stacked Card Component with Scroll Scrubbed Scale & Dim
function StackedCard({
  repo,
  index,
  totalCards,
  scrollYProgress,
}: {
  repo: Repo;
  index: number;
  totalCards: number;
  scrollYProgress: any;
}) {
  // Calculate scroll range for this card
  const step = 1 / totalCards;
  const start = index * step;
  const nextStart = (index + 1) * step;

  // Scale down and dim when covered by next card
  const scale = useTransform(scrollYProgress, [start, nextStart], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [start, nextStart], [1, 0.55]);

  return (
    <div
      className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-8"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale: index === totalCards - 1 ? 1 : scale,
          opacity: index === totalCards - 1 ? 1 : opacity,
          willChange: "transform, opacity",
        }}
        className={`relative w-full max-w-6xl h-[82vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-gradient-to-br ${
          CARD_GRADIENTS[index % CARD_GRADIENTS.length]
        } flex flex-col justify-between`}
      >
        {/* Dark Glass Inner Backdrop */}
        <div className="absolute inset-0 bg-[#0C0C10]/90 backdrop-blur-2xl rounded-3xl z-0" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E10600]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Card Content Header */}
        <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-between h-full">
          {/* Top Row Badges */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {repo.isLive ? (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E10600]/20 border border-[#FF2C2C]/50 shadow-lg shadow-red-950/40">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2C2C] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF2C2C]"></span>
                  </span>
                  <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#FF2C2C]">
                    🔴 Live Project
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Folder className="w-3.5 h-3.5 text-[#F5D577]" />
                  <span className="text-xs font-mono text-zinc-300">Featured Repository</span>
                </div>
              )}

              {repo.language && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F5D577]">
                  {repo.language}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/5">
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#F5D577]" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {/* Card Body & Title */}
          <div className="my-auto py-6">
            {/* Background Decorative Card Number */}
            <div className="text-[120px] sm:text-[180px] font-black text-white/[0.03] absolute top-6 right-10 leading-none pointer-events-none select-none">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-metallic capitalize tracking-tight leading-tight mb-6 max-w-4xl">
              {repo.formattedTitle}
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl mb-8">
              {repo.description}
            </p>
          </div>

          {/* Card Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red-gradient inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-950/60"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <FaGithub className="w-4 h-4" />
                <span>View Code</span>
              </a>
            </div>

            <div className="text-xs font-mono text-zinc-500">
              Project {index + 1} of {totalCards}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

        // 1. Identify repos with live homepage URL
        const filtered: Repo[] = data
          .filter((r: any) => !r.fork || r.stargazers_count > 0)
          .map((r: any) => {
            const liveUrl = r.homepage || LIVE_URLS[r.name] || null;
            return {
              id: r.id,
              name: r.name,
              formattedTitle: r.name.replace(/[-_]/g, " "),
              description: r.description || FALLBACK_DESCRIPTIONS[r.name] || "Full-stack web application built with modern architecture.",
              html_url: r.html_url,
              homepage: liveUrl,
              language: r.language || "TypeScript",
              stargazers_count: r.stargazers_count,
              forks_count: r.forks_count,
              fork: r.fork,
              isLive: Boolean(liveUrl),
            };
          });

        // TODO: No live-deployed repo found via GitHub API homepage field — confirm which project should be marked Live and add its deployed URL manually
        // Prioritize live-deployed repos, then pinned repos
        filtered.sort((a, b) => {
          if (a.name === "Portfolio_Website") return -1;
          if (b.name === "Portfolio_Website") return 1;
          const ai = PINNED_REPOS.indexOf(a.name);
          const bi = PINNED_REPOS.indexOf(b.name);
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return 0;
        });

        const topRepos = filtered.slice(0, 6);
        setCachedRepos(topRepos);
        setRepos(topRepos);
      } catch {
        const fallback: Repo[] = PINNED_REPOS.slice(0, 6).map((name, i) => ({
          id: i + 1,
          name,
          formattedTitle: name.replace(/[-_]/g, " "),
          description: FALLBACK_DESCRIPTIONS[name] || "Full-stack web application.",
          html_url: `https://github.com/Muhammad-Shayan001/${name}`,
          homepage: LIVE_URLS[name] || null,
          language: "TypeScript",
          stargazers_count: 5,
          forks_count: 2,
          fork: false,
          isLive: Boolean(LIVE_URLS[name]),
        }));
        setRepos(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const displayRepos = repos.slice(0, 6);

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
          Featured <span className="text-gold">Projects & Live Codebases</span>
        </motion.h2>

        <p className="text-zinc-400 font-light text-base max-w-xl">
          Scroll down to explore stacked case studies. Card #1 highlights live deployed applications.
        </p>
      </div>

      {/* Pinned Stacking-Cards Container */}
      {loading ? (
        <div className="flex items-center justify-center py-40">
          <div className="w-10 h-10 rounded-full border-2 border-t-[#E10600] border-white/10 animate-spin" />
        </div>
      ) : (
        <div ref={containerRef} className="relative" style={{ height: `${displayRepos.length * 100}vh` }}>
          {displayRepos.map((repo, idx) => (
            <StackedCard
              key={repo.id}
              repo={repo}
              index={idx}
              totalCards={displayRepos.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      )}

      {/* GitHub Profile CTA */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <a
          href="https://github.com/Muhammad-Shayan001"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red-gradient inline-flex items-center gap-3 px-9 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl shadow-red-950/60"
        >
          <FaGithub className="w-5 h-5 text-white" />
          <span>View All Repositories on GitHub</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </a>
      </div>
    </section>
  );
}
