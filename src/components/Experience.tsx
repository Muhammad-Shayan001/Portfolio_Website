"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Award, CheckCircle2, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Full Stack Developer & Software Engineer",
    company: "Freelance / Open Source Engineering",
    period: "2023 - Present",
    location: "Karachi, Pakistan",
    achievements: [
      "Architected and deployed full-stack web applications using React, Next.js (App Router), Node.js, Express, and MongoDB.",
      "Engineered open-source financial apps including double-entry Accounting-App, Invoice_App, and Online_Store e-commerce platform.",
      "Implemented RESTful backend APIs featuring JWT authentication, role-based access control, and payment gateway integrations.",
    ],
  },
  {
    role: "Official IT Volunteer & Hackathon Developer",
    company: "Saylani Welfare International Trust (SMIT)",
    period: "2023 - 2024",
    location: "Karachi, Pakistan",
    achievements: [
      "Recognized as an official community IT volunteer for supporting web development workshops and hackathons.",
      "Active participant in the 12-Month SMIT Web Development curriculum and Coding Night at Zaitoon Ashraf IT Park.",
      "Collaborated with peer developers to build responsive web applications under tight sprint deadlines.",
    ],
  },
  {
    role: "AI & Data Science Scholar",
    company: "Kaggle Learning Platform",
    period: "2023 - 2024",
    location: "Online / Remote",
    achievements: [
      "Completed 17 verified course certifications covering Python, Machine Learning, Deep Learning, SQL, Computer Vision, and NLP.",
      "Applied predictive modeling and dataset analysis to real-world datasets and Kaggle competitive notebooks.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden">
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
            04 // Work & Engineering Track
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-16"
        >
          Professional <span className="text-gold">Experience Timeline</span>
        </motion.h2>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-gradient-to-b border-[#8B0000] space-y-12">
          {/* Vertical Connecting Glow Line */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[3px] bg-gradient-to-b from-[#E10600] via-[#D4AF37] to-transparent pointer-events-none" />

          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.role + idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Gold Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0A0A0E] border-2 border-[#D4AF37] flex items-center justify-center group-hover:scale-125 group-hover:border-[#FF2C2C] transition-transform shadow-lg shadow-red-950/50">
                <div className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse"></div>
              </div>

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F5D577] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#FF2C2C] mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5 text-[#F5D577] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-3">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-sm text-zinc-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#F5D577] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
