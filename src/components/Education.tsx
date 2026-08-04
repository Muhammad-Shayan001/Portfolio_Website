"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink, Check } from "lucide-react";

const EDUCATION_ITEMS = [
  {
    title: "Software Engineering",
    type: "Academic CS Track",
    institution: "Academic CS Foundation",
    description:
      "Comprehensive study of computer science fundamentals, data structures, algorithms, object-oriented programming, software architecture, and full-stack web application development.",
    link: null,
  },
  {
    title: "Dars-e-Nizami Degree",
    type: "Islamic Studies Academic Degree",
    institution: "Traditional Academic Institution",
    description:
      "Rigorous traditional academic degree instilling deep analytical reasoning, linguistic mastery, logic, ethics, and structured problem-solving discipline.",
    link: null,
  },
  {
    title: "Kaggle AI & Data Science Mastery (17 Certifications)",
    type: "17 Verified Certificates",
    institution: "Kaggle / Google",
    description:
      "Completed 17 intensive Kaggle certifications spanning Python programming, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing (NLP), Pandas, Data Visualization, and SQL.",
    link: "https://drive.google.com/file/d/1jnnItxeZ08YMamkRjWKgTCQm3zXhfUbh/view?usp=sharing",
    linkText: "View All 17 Certificates (Google Drive)",
  },
  {
    title: "SMIT Web Development & Official Volunteer",
    type: "Certification & Community Service",
    institution: "Saylani Welfare International Trust",
    description:
      "Certified in Web & Mobile App Development. Recognized as an official IT volunteer for contributing to community technical programs and hackathons at Zaitoon Ashraf IT Park.",
    link: "https://drive.google.com/file/d/15VvP0E64HRd8stXG1mL6fNq8-Mcq7mWp/view?usp=sharing",
    linkText: "View Official Volunteer Certificate (Google Drive)",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden">
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
            05 // Academic & Credentials
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-16"
        >
          Education & <span className="text-gold">Certifications</span>
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#E10600] p-[1px] flex items-center justify-center">
                      <div className="w-full h-full bg-[#0A0A0E] rounded-[11px] flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-[#F5D577]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#F5D577] uppercase tracking-wider block">
                        {item.type}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F5D577] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline self-start px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Check className="w-4 h-4 text-[#FF2C2C]" />
                  <span>Verified Credentials</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
