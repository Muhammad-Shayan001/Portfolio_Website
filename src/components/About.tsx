"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap } from "lucide-react";

const STATS = [
  { label: "Years Experience", value: "2+", desc: "Full Stack & Web Engineering" },
  { label: "Projects Completed", value: "15+", desc: "Web Apps & Admin Systems" },
  { label: "Kaggle Certifications", value: "17", desc: "AI, ML, SQL & Data Science" },
  { label: "GitHub Repositories", value: "20+", desc: "Open Source Codebases" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-[#08080A] overflow-hidden border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-slate-900/70 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-16"
        >
          Crafting Digital Solutions With <span className="text-gold">Precision & Purpose</span>
        </motion.h2>

        {/* Main Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Profile Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#F5D577]/40 via-slate-900/30 to-transparent shadow-2xl shadow-slate-950/40">
              <div className="glass-card rounded-[28px] overflow-hidden border border-white/10 bg-[#09090E]/80 shadow-2xl shadow-black/30">
                <div className="relative h-[28rem] sm:h-[32rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"
                    alt="Developer working on a modern web app"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-8 border-t border-white/10 bg-[#020205]/85">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Profile</p>
                      <h3 className="mt-3 text-xl font-black text-white">Muhammad Shayan</h3>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-zinc-300">
                      Karachi, PK
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    Full Stack Developer blending modern web engineering with thoughtful UI craft and data-driven problem solving.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
              I am a dedicated Full-Stack Developer with a solid foundation in Software Engineering principles combined with rigorous analytical training from my Dars-e-Nizami academic background.
            </p>
            <p className="text-base text-zinc-400 font-light leading-relaxed">
              Whether architecting backend REST APIs or building responsive front-end user interfaces, I focus on performance, clarity, and user satisfaction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#FF2C2C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-white block">MERN & Next.js Stack</span>
                  <span className="text-xs text-zinc-400">Modern frontend & backend architectures</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <GraduationCap className="w-5 h-5 text-[#F5D577] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-white block">Academic Excellence</span>
                  <span className="text-xs text-zinc-400">Software Engineering + Dars-e-Nizami</span>
                </div>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-8 border-t border-white/10">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-3xl md:text-4xl font-extrabold text-gold font-mono">{stat.value}</span>
                  <span className="text-xs font-semibold text-white mt-1">{stat.label}</span>
                  <span className="text-[11px] text-zinc-500 font-mono mt-0.5">{stat.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
