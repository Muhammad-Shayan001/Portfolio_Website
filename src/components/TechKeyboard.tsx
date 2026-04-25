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
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            <Cpu size={14} />
            <span className="glow-text">The Setup</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-6"
          >
            Mechanical <span className="text-gradient">Tech Stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg"
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
          <div className="absolute -inset-16 bg-white/[0.02] rounded-[80px] blur-3xl -z-10" />
          
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
