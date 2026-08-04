"use client";

import { motion } from "framer-motion";
import { Cpu, CheckCircle2, GraduationCap } from "lucide-react";

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
          {/* Left Column: Code Terminal Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37]/30 via-red-950/30 to-transparent shadow-2xl shadow-red-950/20">
              <div className="glass-card rounded-[23px] p-8 overflow-hidden relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF2C2C]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#F5D577]"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">developer_bio.ts</span>
                </div>
                <div className="font-mono text-xs text-zinc-300 space-y-2 leading-relaxed">
                  <p className="text-zinc-500">{'// Personal Stack & Ethos'}</p>
                  <p><span className="text-[#FF2C2C]">const</span> <span className="text-[#F5D577]">developer</span> = &#123;</p>
                  <p className="pl-4">name: <span className="text-emerald-400">&quot;Muhammad Shayan&quot;</span>,</p>
                  <p className="pl-4">location: <span className="text-emerald-400">&quot;Karachi, Pakistan&quot;</span>,</p>
                  <p className="pl-4">role: <span className="text-[#F5D577]">&quot;Full Stack Developer&quot;</span>,</p>
                  <p className="pl-4">academics: <span className="text-emerald-400">&quot;Software Engineering &amp; Dars-e-Nizami&quot;</span>,</p>
                  <p className="pl-4">motto: <span className="text-emerald-400">&quot;Clean Code. Real Results.&quot;</span></p>
                  <p>&#125;;</p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#E10600] p-[1px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#0A0A0E] rounded-[15px] flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-[#F5D577]" />
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white">Continuous Learner</span>
                    <span className="text-xs text-zinc-400 font-mono">17 Kaggle AI Certifications</span>
                  </div>
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
