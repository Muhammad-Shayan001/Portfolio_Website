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

function ProjectGallery({
  project,
  priority,
  onImageLoad,
}: {
  project: ProjectCardData;
  priority: boolean;
  onImageLoad?: () => void;
}) {
  if (project.images.length === 0) {
    return (
      <div className="flex h-full min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-zinc-400 sm:min-h-[24rem]">
        Add screenshots for this project to show the image gallery here.
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
      {project.images.slice(0, 4).map((src, index) => {
        const isFeature = index === 0;
        return (
          <div
            key={`${project.id}-${src}`}
            className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 ${
              isFeature ? "sm:col-span-2 sm:h-[24rem]" : "h-48 sm:h-auto"
            }`}
          >
            <Image
              src={src}
              alt={`${project.name} screenshot ${index + 1}`}
              fill
              sizes={isFeature ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
              priority={priority && isFeature}
              className="object-cover"
              onLoad={onImageLoad}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectStack({ projects }: { projects: ProjectCardData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [disableMotion, setDisableMotion] = useState(false);

  const totalImages = useMemo(
    () => projects.reduce((count, project) => count + project.images.length, 0),
    [projects]
  );
  const stackReady = disableMotion || totalImages === 0 || loadedImages >= totalImages;

  // Honor prefers-reduced-motion and small screens.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const update = () => setDisableMotion(mq.matches || small.matches);
    update();
    mq.addEventListener("change", update);
    small.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      small.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // The actual GSAP + ScrollTrigger + Lenis setup. Lives in its own effect so
  // cleanup always tears down everything cleanly (Strict Mode safe).
  useEffect(() => {
    if (disableMotion) return;
    if (projects.length <= 1) return;

    ensureScrollTriggerRegistered();

    // Smooth scrolling powered by Lenis, wired into GSAP's ticker so the
    // ScrollTriggers stay perfectly in sync with the smoothed scroll value.
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const lastCard = cards[cards.length - 1];
      if (!lastCard) return;

      // Pin every card except the last one for the entire remaining distance
      // through the stack — pinSpacing:false is what lets the next card's
      // document flow overlap the pinned card, instead of pushing it down.
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: lastCard,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Subtle "getting buried" polish: as the next card slides over the
        // current one, this one recedes with scale + brightness. Scrub is
        // fine here because we're animating a property, not pinning.
        gsap.to(card, {
          scale: 0.92,
          filter: "brightness(0.7)",
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    // Refresh once after images settle, since images can push layout around
    // after the effect first measured the page.
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [disableMotion, projects]);

  // Re-measure scroll positions once images finish loading.
  useEffect(() => {
    if (disableMotion) return;
    if (loadedImages < totalImages) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(id);
  }, [disableMotion, loadedImages, totalImages]);

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-zinc-400">No live projects were found.</div>
    );
  }

  // Reduced-motion / mobile fallback: plain stacked scroll, no pinning.
  if (disableMotion) {
    return (
      <section ref={sectionRef} className="relative">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="min-h-screen w-full border-t border-white/5 px-4 py-6 sm:px-6"
          >
            <article className="mx-auto flex h-full min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0B0F] shadow-2xl shadow-black/60 lg:flex-row">
              <div className="flex-1 p-6 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.45em] text-zinc-400">
                  Project {index + 1} of {projects.length}
                </p>
                <h3 className="mt-4 text-4xl font-black tracking-tight text-metallic sm:text-5xl">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-2xl text-lg text-zinc-300">{project.tagline}</p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
                  {project.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-red-gradient inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Visit Live Site</span>
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <FaGithub className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
              <div className="flex-1 p-6 sm:p-10 lg:p-12">
                <ProjectGallery project={project} priority={index === 0} />
              </div>
            </article>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative">
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="project-card relative flex h-screen w-full items-center justify-center px-4 sm:px-6"
          style={{ zIndex: index + 1 }}
        >
          <article className="relative h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] shadow-2xl shadow-black/80">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,213,119,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(225,6,0,0.10),transparent_32%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.95)_100%)]" />

            <div className="relative z-10 flex h-full flex-col overflow-hidden lg:flex-row">
              <div className="flex flex-1 flex-col justify-between gap-8 p-6 sm:p-10 lg:p-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-zinc-400">
                    Project {index + 1} of {projects.length}
                  </p>
                  <h3 className="mt-4 text-4xl font-black tracking-tight text-metallic sm:text-5xl lg:text-6xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-2xl text-lg text-zinc-300">{project.tagline}</p>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.features.length > 0 && (
                    <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5D577]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-red-gradient inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/25"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    <FaGithub className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-10 lg:p-12">
                <ProjectGallery
                  project={project}
                  priority={index === 0}
                  onImageLoad={() => setLoadedImages((count) => count + 1)}
                />
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-500">
                  <span>Stacked case study</span>
                  <span>{stackReady ? "Ready" : "Loading"}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
