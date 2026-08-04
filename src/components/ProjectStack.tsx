"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { FaGithub } from "react-icons/fa6";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { ProjectCardData } from "./project-stack-data";

let scrollTriggerRegistered = false;

function ensureScrollTriggerRegistered() {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
}

function ProjectGallery({ project, onImageLoad }: { project: ProjectCardData; onImageLoad?: () => void }) {
  if (project.images.length === 0) {
    return (
      <div className="flex h-full min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-zinc-400 sm:min-h-[24rem]">
        Add screenshots for this project to show the image gallery here.
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
      {project.images.slice(0, 4).map((src, index) => (
        <div
          key={`${project.id}-${src}`}
          className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 ${index === 0 ? "sm:col-span-2 sm:h-[24rem]" : "h-48 sm:h-auto"}`}
        >
          <Image
            src={src}
            alt={`${project.name} screenshot ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onLoad={onImageLoad}
          />
        </div>
      ))}
    </div>
  );
}

export default function ProjectStack({ projects }: { projects: ProjectCardData[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [disableMotion, setDisableMotion] = useState(false);

  const totalImages = useMemo(() => projects.reduce((count, project) => count + project.images.length, 0), [projects]);
  const stackReady = disableMotion || totalImages === 0 || loadedImages >= totalImages;

  useEffect(() => {
    const updatePreference = () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      setDisableMotion(reduceMotion || mobile);
    };

    updatePreference();
    window.addEventListener("resize", updatePreference);
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionQuery.addEventListener("change", updatePreference);

    return () => {
      window.removeEventListener("resize", updatePreference);
      reduceMotionQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (disableMotion || projects.length <= 1) {
      return;
    }

    ensureScrollTriggerRegistered();

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.08,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: nextCard || card,
          end: nextCard ? "bottom top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        });

        if (nextCard) {
          gsap.fromTo(
            card,
            { scale: 1, filter: "brightness(1)", y: 0 },
            {
              scale: 0.96,
              filter: "brightness(0.78)",
              y: -34,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top top",
                endTrigger: nextCard,
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );

          gsap.fromTo(
            nextCard,
            { opacity: 0.74, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top top",
                endTrigger: nextCard,
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      window.clearTimeout(refreshTimer);
      context.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [disableMotion, projects]);

  useEffect(() => {
    if (disableMotion) return;
    if (loadedImages >= totalImages) {
      ScrollTrigger.refresh();
    }
  }, [disableMotion, loadedImages, totalImages]);

  if (projects.length === 0) {
    return <div className="mx-auto max-w-7xl px-6 py-16 text-zinc-400">No live projects were found.</div>;
  }

  if (disableMotion) {
    return (
      <section ref={containerRef} className="relative">
        {projects.map((project, index) => (
          <div key={project.id} className="min-h-screen w-full border-t border-white/5 px-4 py-6 sm:px-6">
            <article className="mx-auto flex h-full min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0B0F] shadow-2xl shadow-black/60 lg:flex-row">
              <div className="flex-1 p-6 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.45em] text-zinc-400">Project {index + 1} of {projects.length}</p>
                <h3 className="mt-4 text-4xl font-black tracking-tight text-metallic sm:text-5xl">{project.name}</h3>
                <p className="mt-4 max-w-2xl text-lg text-zinc-300">{project.tagline}</p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.stack.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-red-gradient inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider">
                      <ExternalLink className="h-4 w-4" />
                      <span>Visit Live Site</span>
                    </a>
                  )}
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider">
                    <FaGithub className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
              <div className="flex-1 p-6 sm:p-10 lg:p-12">
                <ProjectGallery project={project} />
              </div>
            </article>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative">
      {projects.map((project, index) => {
        const depth = projects.length - index - 1;
        const transformStyle = {
          zIndex: index + 1,
          transform: `translateY(${depth * 9}px) scale(${0.96 + index * 0.01})`,
        };

        return (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="project-card h-screen w-full flex items-center justify-center relative"
            style={{ zIndex: index + 1 }}
          >
            <article className="relative h-full w-full overflow-hidden border-t border-white/5 bg-black px-4 py-6 sm:px-6"
              style={transformStyle}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,213,119,0.06),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.58)_58%,rgba(0,0,0,0.95)_100%)]" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] shadow-2xl shadow-black/80 lg:flex-row">
                <div className="flex flex-1 flex-col justify-between gap-8 p-6 sm:p-10 lg:p-12">
                  <div>
                    <p className="text-xs uppercase tracking-[0.45em] text-zinc-400">Project {index + 1} of {projects.length}</p>
                    <h3 className="mt-4 text-4xl font-black tracking-tight text-metallic sm:text-5xl lg:text-6xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-2xl text-lg text-zinc-300">{project.tagline}</p>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">{project.description}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.stack.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/25">
                        <ExternalLink className="h-4 w-4" />
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      <FaGithub className="h-4 w-4" />
                      <span>View Code</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-10 lg:p-12">
                  <ProjectGallery project={project} onImageLoad={() => setLoadedImages((count) => count + 1)} />
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-500">
                    <span>Stacked case study</span>
                    <span>{stackReady ? "Ready" : "Loading"}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </section>
  );
}
