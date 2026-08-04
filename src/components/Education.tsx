"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, ExternalLink, Check, Award } from "lucide-react";

const EDUCATION_ITEMS = [
  {
    title: "Software Engineering",
    type: "Academic CS Track",
    institution: "Computer Science Foundation",
    description: "Comprehensive study of data structures, algorithms, OOP, software architecture, and full-stack web application development.",
    side: "left" as const,
    link: null,
    linkText: "",
  },
  {
    title: "Dars-e-Nizami Degree",
    type: "Islamic Studies",
    institution: "Traditional Academic Institution",
    description: "Rigorous traditional degree instilling deep analytical reasoning, linguistic mastery, logic, ethics, and structured problem-solving.",
    side: "right" as const,
    link: null,
    linkText: "",
  },
  {
    title: "Kaggle AI & Data Science Mastery",
    type: "17 Verified Certificates",
    institution: "Kaggle / Google",
    description: "17 intensive certifications spanning Python, ML, Deep Learning, Computer Vision, NLP, Pandas, Data Visualization, and SQL.",
    side: "left" as const,
    link: "https://drive.google.com/file/d/1jnnItxeZ08YMamkRjWKgTCQm3zXhfUbh/view?usp=sharing",
    linkText: "View All 17 Certificates",
  },
  {
    title: "SMIT Web Dev & Official Volunteer",
    type: "Certification & Community",
    institution: "Saylani Welfare International Trust",
    description: "Certified in Web & Mobile App Development. Official IT volunteer for community technical programs and hackathons.",
    side: "right" as const,
    link: "https://drive.google.com/file/d/15VvP0E64HRd8stXG1mL6fNq8-Mcq7mWp/view?usp=sharing",
    linkText: "View Volunteer Certificate",
  },
];

// S-curve SVG path for desktop (connects 4 nodes in zig-zag)
const CURVE_PATH = "M 400,40 C 200,40 200,200 400,200 C 600,200 600,360 400,360 C 200,360 200,520 400,520";
const NODE_POSITIONS = [
  { cx: 400, cy: 40 },
  { cx: 400, cy: 200 },
  { cx: 400, cy: 360 },
  { cx: 400, cy: 520 },
];

// Mobile: single-side vertical curve
const MOBILE_PATH = "M 40,30 C 60,100 20,170 40,240 C 60,310 20,380 40,450 C 60,520 20,590 40,650";
const MOBILE_NODES = [
  { cx: 40, cy: 30 },
  { cx: 40, cy: 240 },
  { cx: 40, cy: 450 },
  { cx: 40, cy: 650 },
];

const PATH_LENGTH = 1400;
const MOBILE_PATH_LENGTH = 900;

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [PATH_LENGTH, 0]);
  const mobileDashOffset = useTransform(scrollYProgress, [0, 1], [MOBILE_PATH_LENGTH, 0]);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-28 bg-[#08080A] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-metallic mb-20 text-center"
        >
          Education & <span className="text-gold">Certifications</span>
        </motion.h2>

        {/* ══════ DESKTOP: Curved SVG Path + Zig-zag Cards ══════ */}
        <div className="hidden md:block relative" style={{ minHeight: 600 }}>
          {/* SVG Curved Path */}
          <svg
            viewBox="0 0 800 560"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#E10600" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background dim path */}
            <path d={CURVE_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />

            {/* Animated drawing path */}
            <motion.path
              d={CURVE_PATH}
              stroke="url(#pathGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              style={{
                strokeDasharray: PATH_LENGTH,
                strokeDashoffset: dashOffset,
              }}
            />

            {/* Glowing Node Dots */}
            {NODE_POSITIONS.map((pos, i) => (
              <motion.circle
                key={i}
                cx={pos.cx}
                cy={pos.cy}
                r="8"
                fill="#0A0A0E"
                stroke="#D4AF37"
                strokeWidth="2.5"
                filter="url(#glowFilter)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.3 }}
              />
            ))}
            {NODE_POSITIONS.map((pos, i) => (
              <motion.circle
                key={`inner-${i}`}
                cx={pos.cx}
                cy={pos.cy}
                r="3"
                fill="#E10600"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.3 + 0.2 }}
              />
            ))}
          </svg>

          {/* Education Cards positioned alongside the curve */}
          <div className="relative" style={{ minHeight: 560 }}>
            {EDUCATION_ITEMS.map((item, idx) => {
              const isLeft = item.side === "left";
              const topPercent = (NODE_POSITIONS[idx].cy / 560) * 100;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`absolute w-[42%] ${isLeft ? "left-0" : "right-0"}`}
                  style={{ top: `${topPercent - 5}%` }}
                >
                  <div className="glass-card rounded-2xl p-6 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#E10600] p-[1px] flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-[#0A0A0E] rounded-[10px] flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-[#F5D577]" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#F5D577] uppercase tracking-wider block">{item.type}</span>
                        <h3 className="text-base font-bold text-white group-hover:text-[#F5D577] transition-colors leading-tight">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">{item.description}</p>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-gold-outline self-start px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                        <span>{item.linkText}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                        <Check className="w-3.5 h-3.5 text-[#FF2C2C]" />
                        <span>Verified Credentials</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════ MOBILE: Simplified curved layout ══════ */}
        <div className="md:hidden relative">
          <svg
            viewBox="0 0 80 680"
            fill="none"
            className="absolute left-4 top-0 h-full pointer-events-none"
            style={{ width: 80, minHeight: "100%" }}
            preserveAspectRatio="xMidYMin meet"
          >
            <defs>
              <linearGradient id="mobilePathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#E10600" />
              </linearGradient>
            </defs>
            <path d={MOBILE_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
            <motion.path
              d={MOBILE_PATH}
              stroke="url(#mobilePathGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ strokeDasharray: MOBILE_PATH_LENGTH, strokeDashoffset: mobileDashOffset }}
            />
            {MOBILE_NODES.map((pos, i) => (
              <motion.circle key={i} cx={pos.cx} cy={pos.cy} r="6" fill="#0A0A0E" stroke="#D4AF37" strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              />
            ))}
          </svg>

          <div className="flex flex-col gap-8 pl-20">
            {EDUCATION_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#E10600] p-[1px] flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[#0A0A0E] rounded-[10px] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-[#F5D577]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#F5D577] uppercase tracking-wider block">{item.type}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#F5D577] transition-colors leading-tight">{item.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">{item.description}</p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-gold-outline self-start px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                    <Check className="w-3.5 h-3.5 text-[#FF2C2C]" />
                    <span>Verified Credentials</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
