import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Layout, Server, Database, Globe, Cpu, 
  Code2, Rocket, Zap, Terminal, Layers,
  Workflow, ShieldCheck, Box, Palette,
  Code
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number; // skill level 0-100
}

const techStack: TechItem[][] = [
  [
    { name: 'React', icon: <Layout size={22} />, color: '#61DAFB', level: 90 },
    { name: 'Next JS', icon: <Rocket size={22} />, color: '#ffffff', level: 85 },
    { name: 'TypeScript', icon: <Code2 size={22} />, color: '#3178C6', level: 80 },
    { name: 'Tailwind', icon: <Zap size={22} />, color: '#06B6D4', level: 95 },
    { name: 'HTML/CSS', icon: <Palette size={22} />, color: '#E34F26', level: 95 },
  ],
  [
    { name: 'Node JS', icon: <Terminal size={22} />, color: '#339933', level: 82 },
    { name: 'Express', icon: <Server size={22} />, color: '#ffffff', level: 78 },
    { name: 'Rest API', icon: <Database size={22} />, color: '#4169E1', level: 70 },
    { name: 'MongoDB', icon: <Layers size={22} />, color: '#47A248', level: 80 },
    { name: 'Java', icon: <Code size={22} />, color: '#339933', level: 82 },
  ],
  [
    { name: 'Firebase', icon: <Globe size={22} />, color: '#FFCA28', level: 72 },
    { name: 'Git', icon: <Workflow size={22} />, color: '#F05032', level: 88 },
    { name: 'Docker', icon: <Box size={22} />, color: '#2496ED', level: 65 },
    { name: 'AWS', icon: <ShieldCheck size={22} />, color: '#FF9900', level: 60 },
  ]
];

function Key({ item, index }: { item: TechItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { 
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, perspective: 800 }}
      className="relative group cursor-pointer"
    >
      {/* 3D Key Base */}
      <div 
        className="absolute inset-0 rounded-2xl translate-y-2 group-hover:translate-y-1 transition-transform duration-200"
        style={{ 
          background: 'rgba(255,255,255,0.02)',
          filter: 'brightness(0.4)',
        }}
      />
      
      {/* Key Cap */}
      <div className="relative w-[88px] h-[88px] sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: `1px solid ${isHovered ? `${item.color}40` : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isHovered 
            ? `0 0 25px ${item.color}20, 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)` 
            : '0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* RGB Glow */}
        <motion.div 
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className="absolute inset-0 rounded-2xl blur-xl"
          style={{ backgroundColor: item.color }}
        />
        
        <motion.div 
          animate={{ scale: isHovered ? 1.15 : 1, color: isHovered ? item.color : '#94a3b8' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative z-10"
        >
          {item.icon}
        </motion.div>
        
        <span className="relative z-10 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
          {item.name}
        </span>
        
        {/* Skill Level Dot */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[7px] font-black"
          style={{
            background: `${item.color}30`,
            color: item.color,
          }}
        >
          {item.level}%
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TechKeyboard() {
  return (
    <section id="tech-stack" className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b10] px-5 py-8 shadow-[0_25px_110px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 overflow-hidden rounded-[36px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,79,224,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.1),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
        <svg viewBox="0 0 600 600" className="absolute left-[-10%] top-[6%] h-[620px] w-[620px] rotate-6 opacity-[0.16] blur-3xl" aria-hidden="true">
          <path d="M304 66C394 79 455 138 458 221C461 305 406 379 326 406C248 432 155 412 101 350C48 289 47 200 98 138C150 75 216 56 304 66Z" fill="rgba(255,255,255,0.7)" />
          <path d="M300 134C357 145 405 181 411 235C417 289 386 340 338 363C291 386 228 382 186 348C144 314 129 253 146 199C162 145 229 122 300 134Z" fill="rgba(255,255,255,0.34)" />
        </svg>
        <div className="absolute left-[8%] top-[16%] h-[220px] w-[220px] rounded-full border border-white/10" />
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -8, 0], rotate: [12, 20, 12] }} transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[10%] top-[14%] h-12 w-12 rounded-[16px] shadow-[0_0_24px_rgba(236,72,153,0.16)]" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.42), rgba(34,211,238,0.16))', clipPath: 'polygon(50% 0%, 100% 35%, 70% 100%, 30% 100%, 0% 35%)' }} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            <Cpu size={14} />
            <span className="glow-text">The Setup</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl"
          >
            Mechanical <span className="text-gradient">Tech Stack</span>
          </motion.h2>
          <svg viewBox="0 0 180 20" className="mx-auto mb-6 h-6 w-32" aria-hidden="true">
            <path d="M4 10C24 2 43 2 64 10C82 17 102 17 122 10C139 4 159 4 176 10" stroke="url(#techSquiggle)" strokeWidth="2.7" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="techSquiggle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg"
          >
            Press the keys to explore my core development arsenal. 
            Each key represents a technology I use to build amazing products.
          </motion.p>
        </div>

        {/* Keyboard Container */}
        <div className="relative perspective-1000 flex flex-col items-center gap-4 sm:gap-6">
          {techStack.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, x: rowIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: rowIndex * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 sm:gap-5"
              style={{ paddingLeft: rowIndex * 24 }}
            >
              {row.map((item, i) => (
                <Key key={item.name} item={item} index={rowIndex * 4 + i} />
              ))}
            </motion.div>
          ))}
          
          {/* Keyboard Base Plate Glow */}
          <div className="absolute -inset-16 -z-10 rounded-[80px] bg-white/[0.02] blur-3xl" />
          
          {/* Row labels */}
          <div className="absolute -left-4 sm:-left-16 top-0 bottom-0 flex flex-col justify-around">
            {['Frontend', 'Backend', 'DevOps'].map((label, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="hidden lg:block text-[9px] font-black uppercase tracking-[0.2em] text-slate-700 -rotate-90"
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 -right-20 w-40 h-1 bg-gradient-to-r from-primary/20 to-transparent blur-sm rotate-45" />
        <div className="absolute bottom-1/2 -left-20 w-40 h-1 bg-gradient-to-l from-secondary/20 to-transparent blur-sm -rotate-45" />
      </div>
    </section>
  );
}
