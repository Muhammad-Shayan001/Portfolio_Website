"use client";

import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Database,
  Server,
  Terminal,
  Cpu,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiPython,
  SiVercel,
  SiPostman,
} from "react-icons/si";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    icon: Globe,
    skills: [
      { name: "React.js", level: "92%", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js (App Router)", level: "90%", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", level: "88%", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", level: "95%", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript (ES6+)", level: "94%", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "Backend & Systems",
    icon: Server,
    skills: [
      { name: "Node.js", level: "90%", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", level: "92%", icon: SiExpress, color: "#FFFFFF" },
      { name: "RESTful APIs", level: "95%", icon: Code, color: "#FF2C2C" },
      { name: "Authentication (JWT)", level: "88%", icon: Layers, color: "#F5D577" },
    ],
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: [
      { name: "MongoDB", level: "90%", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL / SQL", level: "85%", icon: SiPostgresql, color: "#4169E1" },
      { name: "Mongoose ODM", level: "92%", icon: Database, color: "#D4AF37" },
    ],
  },
  {
    title: "DevOps & AI Tools",
    icon: Cpu,
    skills: [
      { name: "Docker", level: "78%", icon: SiDocker, color: "#2496ED" },
      { name: "Git & GitHub", level: "92%", icon: SiGithub, color: "#FFFFFF" },
      { name: "Python (ML/AI)", level: "85%", icon: SiPython, color: "#3776AB" },
      { name: "Vercel & Cloud", level: "90%", icon: SiVercel, color: "#FFFFFF" },
      { name: "Postman API", level: "92%", icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Tag Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#E10600] to-transparent"></span>
          <span className="text-xs font-mono tracking-widest text-[#F5D577] uppercase">
            Technical Arsenal
          </span>
        </motion.div>

        {/* Main Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic max-w-2xl"
          >
            Technologies & Tools <span className="text-gold">I Master</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 max-w-md font-light text-sm leading-relaxed"
          >
            Engineered for scalability, speed, and real-world efficiency. Every tool is selected to build production-grade web applications.
          </motion.p>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-5 mb-6 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B0000]/60 to-[#E10600]/80 p-[1px] flex items-center justify-center shadow-lg shadow-red-950/40">
                      <div className="w-full h-full bg-[#0A0A0E] rounded-[11px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#F5D577]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-base tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skill Items */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div key={skill.name} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <SkillIcon className="w-4 h-4 text-zinc-300 group-hover:scale-110 transition-transform" />
                              <span className="font-mono text-zinc-200">{skill.name}</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#F5D577]">{skill.level}</span>
                          </div>

                          {/* Skill Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: skill.level }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#8B0000] via-[#E10600] to-[#D4AF37]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Category {catIdx + 1}/4</span>
                  <span className="text-[#FF2C2C]">Verified Stack</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
